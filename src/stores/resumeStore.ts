import { create } from 'zustand';
import { ResumeData, WizardState, WorkExperience, Education, Certification, Project, Language, GeneratedResume, ResumeScore, EnhancedEducation, EnhancedExperience, EnhancedProject, EnhancedCertification, LanguageProficiency } from '@/types';
import { resumeService } from '@/services/resumeService';
import { resumeScoringService, RateLimitError } from '@/services/resumeScoringService';

// Rate limit info for UI countdown
export interface RateLimitInfo {
  resetTime: number;
  maxRequests: number;
}

interface ResumeStore {
  // State
  resumeData: ResumeData;
  wizardState: WizardState;
  selectedTemplateId?: string;
  selectedTemplateCategory?: 'free' | 'premium';
  isDirty: boolean;
  lastSaved: Date | null;
  generatedResume: GeneratedResume | null;
  isGenerating: boolean;
  isEditingResume: boolean;
  editedResume: GeneratedResume | null;
  currentResumeId: string | null;
  hasLoadedExistingResume: boolean;
  currentScore: ResumeScore | null;
  isScoring: boolean;
  scoreError: string | null;
  isPollingScore: boolean;
  rateLimitInfo: RateLimitInfo | null;
  isOverSaveLimit: boolean;

  // Actions
  updateResumeData: (updates: Partial<ResumeData>) => void;
  saveResumeDataImmediately: () => Promise<void>; // Save resume data immediately without debounce
  loadResumeData: (resumeData: ResumeData) => void; // Load complete resume data without auto-save
  updateWizardState: (updates: Partial<WizardState>) => void;
  setSelectedTemplate: (templateId: string, category: 'free' | 'premium') => void;
  setCurrentStep: (step: number) => void;
  markStepCompleted: (step: number) => void;
  markStepSkipped: (step: number) => void;
  setWizardMode: (mode: 'manual' | 'guided') => void;
  addWorkExperience: (experience: WorkExperience) => void;
  updateWorkExperience: (id: string, updates: Partial<WorkExperience>) => void;
  removeWorkExperience: (id: string) => void;
  addEducation: (education: Education) => void;
  updateEducation: (id: string, updates: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addCertification: (certification: Certification) => void;
  updateCertification: (id: string, updates: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addLanguage: (language: Language) => void;
  updateLanguage: (id: string, updates: Partial<Language>) => void;
  removeLanguage: (id: string) => void;
  resetResume: () => void;
  setDirty: (dirty: boolean) => void;
  
  // Generated Resume Actions
  setGeneratedResume: (resume: GeneratedResume | null) => void;
  setIsGenerating: (generating: boolean) => void;
  clearGeneratedResume: () => void;
  setCurrentResumeId: (resumeId: string | null) => void;
  
  // Resume Editing Actions
  startEditingResume: () => void;
  stopEditingResume: () => void;
  updateEditedResume: (updates: Partial<GeneratedResume>) => void;
  saveEditedResume: () => void;
  cancelEditingResume: () => void;
  
  // Edit Mode Actions
  setHasLoadedExistingResume: (value: boolean) => void;
  
  // Score Actions
  fetchResumeScore: (resumeId: string) => Promise<void>;
  scoreResume: (resumeId: string) => Promise<void>;
  setScore: (score: ResumeScore | null) => void;
  clearScore: () => void;
  pollForScore: (resumeId: string, maxAttempts?: number, intervalMs?: number) => Promise<void>;
  clearRateLimitInfo: () => void;
  
  // Section Update Actions
  updateResumeSection: (sectionType: string, enhancedText: string, sectionId?: string) => GeneratedResume | null;
  
  // Resume Data Sync Actions
  // Syncs only contact info from resumeData to generatedResume
  syncContactInfoToGeneratedResume: () => GeneratedResume | null;
  // Reverse sync: generatedResume to resumeData (for Step 9 in-place edits)
  syncGeneratedResumeToResumeData: () => void;
  // Combined update for DataEditModal: updates both stores, saves to API, re-scores
  updateSectionAndSync: (
    generatedResumeUpdates: Partial<GeneratedResume>,
    resumeDataUpdates: Partial<ResumeData>
  ) => Promise<void>;
  // Persist generatedResume to API without re-scoring (for Step 8 enhancements)
  persistGeneratedResume: () => Promise<void>;
  // Resume save limit
  setIsOverSaveLimit: (value: boolean) => void;
}

const initialResumeData: ResumeData = {
  firstName: '',
  lastName: '',
  country: '',
  linkedin: '',
  language: 'es',
  targetLevel: 'mid',
  profession: '',
  tone: 'professional',
  phone: '',
  email: '',
  skillsRaw: [],
  experience: [],
  education: [],
  certifications: [],
  projects: [],
  languages: [],
  achievements: [],
  summary: '',
  jobDescription: '',
  completedSteps: [],
  currentStep: 1,
  totalCharacters: 0,
  lastSaved: new Date(),
  // Pagination fields - all default to null, calculated in step 9
  firstNamePageNumber: null,
  lastNamePageNumber: null,
  countryPageNumber: null,
  linkedinPageNumber: null,
  languagePageNumber: null,
  targetLevelPageNumber: null,
  professionPageNumber: null,
  tonePageNumber: null,
  phonePageNumber: null,
  emailPageNumber: null,
  summaryPageNumber: null,
  jobDescriptionPageNumber: null,
  skillsPagination: null,
};

const initialWizardState: WizardState = {
  currentStep: 1,
  completedSteps: [],
  mode: 'guided',
  isCompleted: false,
};

// Debounce helper for auto-save
let saveTimeout: NodeJS.Timeout | null = null;
let isSaving = false; // Flag to prevent concurrent saves

export const useResumeStore = create<ResumeStore>((set, get) => ({
      resumeData: initialResumeData,
      wizardState: initialWizardState,
      selectedTemplateId: undefined,
      selectedTemplateCategory: undefined,
      isDirty: false,
      lastSaved: null,
      generatedResume: null,
      isGenerating: false,
      isEditingResume: false,
      editedResume: null,
      currentResumeId: null,
      hasLoadedExistingResume: false,
      currentScore: null,
      isScoring: false,
      scoreError: null,
      isPollingScore: false,
      rateLimitInfo: null,
      isOverSaveLimit: false,

      updateResumeData: (updates) => {
        set((state) => {
          const newResumeData = { ...state.resumeData, ...updates };
          
          // Clear existing timeout
          if (saveTimeout) {
            clearTimeout(saveTimeout);
          }
          
          // Auto-save to API after 1 second of inactivity (debounce)
          saveTimeout = setTimeout(async () => {
            // Prevent concurrent saves
            if (isSaving) {
              return;
            }
            
            const currentState = get();
            const { currentResumeId, resumeData } = currentState;
            
            // Skip if no data to save
            if (!resumeData || Object.keys(resumeData).length === 0) {
              return;
            }
            
            try {
              isSaving = true;
              
              // Sync wizardState.completedSteps and currentStep to resumeData before saving
              const currentState = get();
              const resumeDataToSave = {
                ...resumeData,
                completedSteps: currentState.wizardState.completedSteps,
                currentStep: currentState.wizardState.currentStep,
              };
              
              if (currentResumeId) {
                await resumeService.updateResume(currentResumeId, {
                  resumeData: resumeDataToSave,
                  updatedAt: new Date(),
                });
                set({ isDirty: false, lastSaved: new Date() });
              } else {
                // Skip API create if already flagged as over limit
                if (get().isOverSaveLimit) {
                  return;
                }
                const newResume = await resumeService.createResume(resumeDataToSave);
                set({ 
                  currentResumeId: newResume.id,
                  isDirty: false,
                  lastSaved: new Date(),
                });
              }
            } catch (error: any) {
              if (error?.code === 'RESUME_LIMIT_REACHED') {
                set({ isOverSaveLimit: true });
              } else {
                console.error('Error auto-saving resume:', error);
              }
            } finally {
              isSaving = false;
            }
          }, 1000);
          
          return {
            resumeData: newResumeData,
            isDirty: true,
            lastSaved: new Date(),
          };
        });
      },

      // Save resume data immediately without debounce
      // Used when user clicks "Next" to ensure data is saved before navigation
      saveResumeDataImmediately: async () => {
        // Clear any pending debounced save
        if (saveTimeout) {
          clearTimeout(saveTimeout);
          saveTimeout = null;
        }
        
        // Prevent concurrent saves
        if (isSaving) {
          // Wait for current save to complete
          while (isSaving) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
        
        const currentState = get();
        const { currentResumeId, resumeData } = currentState;
        
        // Skip if no data to save
        if (!resumeData || Object.keys(resumeData).length === 0) {
          return;
        }
        
        try {
          isSaving = true;
          
          // Sync wizardState.completedSteps and currentStep to resumeData before saving
          const state = get();
          const resumeDataToSave = {
            ...resumeData,
            completedSteps: state.wizardState.completedSteps,
            currentStep: state.wizardState.currentStep,
          };
          
          if (currentResumeId) {
            await resumeService.updateResume(currentResumeId, {
              resumeData: resumeDataToSave,
              updatedAt: new Date(),
            });
            set({ isDirty: false, lastSaved: new Date() });
          } else {
            if (get().isOverSaveLimit) {
              return;
            }
            const newResume = await resumeService.createResume(resumeDataToSave);
            set({ 
              currentResumeId: newResume.id,
              isDirty: false,
              lastSaved: new Date(),
            });
          }
        } catch (error: any) {
          if (error?.code === 'RESUME_LIMIT_REACHED') {
            set({ isOverSaveLimit: true });
            return;
          }
          console.error('Error saving resume immediately:', error);
          throw error;
        } finally {
          isSaving = false;
        }
      },

      // Load complete resume data without triggering auto-save
      // Used when loading an existing resume from the API
      loadResumeData: (resumeData) => {
        // Clear any pending auto-save
        if (saveTimeout) {
          clearTimeout(saveTimeout);
          saveTimeout = null;
        }
        
        // Helper function to infer completed steps from resume data
        // Used as fallback when completedSteps array is empty
        const inferCompletedSteps = (data: ResumeData): number[] => {
          const steps: number[] = [];
          
          // Step 1: Profile - check if basic profile data exists
          if (data.firstName && data.lastName && data.profession) {
            steps.push(1);
          }
          
          // Step 2: Skills
          if (data.skillsRaw && data.skillsRaw.length > 0) {
            steps.push(2);
          }
          
          // Step 3: Experience
          if (data.experience && data.experience.length > 0) {
            steps.push(3);
          }
          
          // Step 4: Education
          if (data.education && data.education.length > 0) {
            steps.push(4);
          }
          
          // Step 5: Projects
          if (data.projects && data.projects.length > 0) {
            steps.push(5);
          }
          
          // Step 6: Achievements
          if (data.achievements && data.achievements.length > 0) {
            steps.push(6);
          }
          
          // Step 7: Summary
          if (data.summary && data.summary.trim().length > 0) {
            steps.push(7);
          }
          
          // Step 8: Generate (if generatedResume exists, this step was completed)
          // This will be handled separately as it's not in resumeData
          
          return steps;
        };
        
        // Sync wizardState with resumeData when loading an existing resume
        // Use completedSteps from resumeData, or infer from data if empty
        let completedSteps = resumeData.completedSteps || [];
        
        // If completedSteps is empty, try to infer from the data
        if (completedSteps.length === 0) {
          completedSteps = inferCompletedSteps(resumeData);
          console.log('🔧 Store - Inferred completedSteps from data:', completedSteps);
        }
        
        const maxCompletedStep = completedSteps.length > 0 ? Math.max(...completedSteps) : 0;
        const currentStep = resumeData.currentStep && resumeData.currentStep > 0 
          ? resumeData.currentStep 
          : (maxCompletedStep > 0 ? maxCompletedStep : 1);
        
        set({
          resumeData: {
            ...resumeData,
            completedSteps, // Update resumeData with inferred steps if needed
            currentStep,
          },
          wizardState: {
            currentStep,
            completedSteps,
            mode: 'manual',
            isCompleted: completedSteps.length >= 10,
          },
          isDirty: false,
          lastSaved: new Date(),
        });
        
        console.log('🔧 Store - resumeData updated in store');
        console.log('🔧 Store - wizardState synced:', { currentStep, completedSteps });
      },

      updateWizardState: (updates) => {
        set((state) => ({
          wizardState: { ...state.wizardState, ...updates },
          isDirty: true,
        }));
      },

      setSelectedTemplate: (templateId, category) => {
        set({ selectedTemplateId: templateId, selectedTemplateCategory: category });
      },

      setCurrentStep: (step) => {
        set((state) => ({
          wizardState: { ...state.wizardState, currentStep: step },
          // Also sync currentStep to resumeData
          resumeData: {
            ...state.resumeData,
            currentStep: step,
          },
        }));
      },

      markStepCompleted: (step) => {
        set((state) => {
          const completedSteps = [...state.wizardState.completedSteps];
          if (!completedSteps.includes(step)) {
            completedSteps.push(step);
          }
          return {
            wizardState: {
              ...state.wizardState,
              completedSteps,
            },
            // Also sync completedSteps to resumeData so it gets saved
            resumeData: {
              ...state.resumeData,
              completedSteps,
              currentStep: Math.max(state.resumeData.currentStep || 1, step),
            },
            isDirty: true,
          };
        });
      },

      markStepSkipped: (step) => {
        set((state) => {
          const completedSteps = [...state.wizardState.completedSteps];
          if (!completedSteps.includes(step)) {
            completedSteps.push(step);
          }
          return {
            wizardState: {
              ...state.wizardState,
              completedSteps,
            },
            // Also sync completedSteps to resumeData so it gets saved
            resumeData: {
              ...state.resumeData,
              completedSteps,
              currentStep: Math.max(state.resumeData.currentStep || 1, step),
            },
            isDirty: true,
          };
        });
      },

      setWizardMode: (mode) => {
        set((state) => ({
          wizardState: { ...state.wizardState, mode },
          isDirty: true,
        }));
      },

      addWorkExperience: (experience) => {
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [...state.resumeData.experience, { ...experience, pageNumber: experience.pageNumber ?? null }],
          },
          isDirty: true,
        }));
      },

      updateWorkExperience: (id, updates) => {
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((exp) =>
              exp.id === id ? { ...exp, ...updates } : exp
            ),
          },
          isDirty: true,
        }));
      },

      removeWorkExperience: (id) => {
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((exp) => exp.id !== id),
          },
          isDirty: true,
        }));
      },

      addEducation: (education) => {
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [...state.resumeData.education, { ...education, pageNumber: education.pageNumber ?? null }],
          },
          isDirty: true,
        }));
      },

      updateEducation: (id, updates) => {
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) =>
              edu.id === id ? { ...edu, ...updates } : edu
            ),
          },
          isDirty: true,
        }));
      },

      removeEducation: (id) => {
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id),
          },
          isDirty: true,
        }));
      },

      addCertification: (certification) => {
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: [...state.resumeData.certifications, { ...certification, pageNumber: certification.pageNumber ?? null }],
          },
          isDirty: true,
        }));
      },

      updateCertification: (id, updates) => {
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications.map((cert) =>
              cert.id === id ? { ...cert, ...updates } : cert
            ),
          },
          isDirty: true,
        }));
      },

      removeCertification: (id) => {
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications.filter((cert) => cert.id !== id),
          },
          isDirty: true,
        }));
      },

      addProject: (project) => {
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: [...state.resumeData.projects, { ...project, pageNumber: project.pageNumber ?? null }],
          },
          isDirty: true,
        }));
      },

      updateProject: (id, updates) => {
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.map((proj) =>
              proj.id === id ? { ...proj, ...updates } : proj
            ),
          },
          isDirty: true,
        }));
      },

      removeProject: (id) => {
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.filter((proj) => proj.id !== id),
          },
          isDirty: true,
        }));
      },

      addLanguage: (language) => {
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            languages: [...state.resumeData.languages, { ...language, pageNumber: language.pageNumber ?? null }],
          },
          isDirty: true,
        }));
      },

      updateLanguage: (id, updates) => {
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            languages: state.resumeData.languages.map((lang) =>
              lang.id === id ? { ...lang, ...updates } : lang
            ),
          },
          isDirty: true,
        }));
      },

      removeLanguage: (id) => {
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            languages: state.resumeData.languages.filter((lang) => lang.id !== id),
          },
          isDirty: true,
        }));
      },

      resetResume: () => {
        // Clear any pending save
        if (saveTimeout) {
          clearTimeout(saveTimeout);
          saveTimeout = null;
        }
        isSaving = false;
        
        set({
          resumeData: initialResumeData,
          wizardState: initialWizardState,
          isDirty: false,
          lastSaved: null,
          generatedResume: null,
          isGenerating: false,
          currentResumeId: null,
          hasLoadedExistingResume: false,
          isOverSaveLimit: false,
        });
        
        // Clear localStorage entries related to resume
        localStorage.removeItem('resume_wizard_v1');
        localStorage.removeItem('generated-resume');
      },

      setDirty: (dirty) => set({ isDirty: dirty }),

      // Generated Resume Actions
      setGeneratedResume: (resume) => {
        set({ generatedResume: resume });
        // Note: generatedResume is now stored in the API with the resume, not localStorage
      },

      setIsGenerating: (generating) => set({ isGenerating: generating }),

      clearGeneratedResume: () => {
        set({ generatedResume: null });
      },

      setCurrentResumeId: (resumeId) => set({ currentResumeId: resumeId }),

      setIsOverSaveLimit: (value) => set({ isOverSaveLimit: value }),

      // Resume Editing Actions
      startEditingResume: () => {
        const { generatedResume } = get();
        if (generatedResume) {
          set({ 
            isEditingResume: true,
            editedResume: JSON.parse(JSON.stringify(generatedResume)) // Deep copy
          });
        }
      },

      stopEditingResume: () => {
        set({ 
          isEditingResume: false,
          editedResume: null
        });
      },

      updateEditedResume: (updates) => {
        const { editedResume } = get();
        if (editedResume) {
          set({ 
            editedResume: { ...editedResume, ...updates }
          });
        }
      },

      saveEditedResume: () => {
        const { editedResume, currentResumeId } = get();
        if (editedResume) {
          set({ 
            generatedResume: editedResume,
            isEditingResume: false,
            editedResume: null
          });
          
          // Save to API if we have a resumeId
          if (currentResumeId) {
            resumeService.updateResume(currentResumeId, {
              generatedResume: editedResume,
              updatedAt: new Date(),
            }).catch(error => {
              console.error('Error saving edited resume to API:', error);
            });
          }
        }
      },

      cancelEditingResume: () => {
        set({ 
          isEditingResume: false,
          editedResume: null
        });
      },

      // Edit Mode Actions
      setHasLoadedExistingResume: (value) => set({ hasLoadedExistingResume: value }),

      // Score Actions
      fetchResumeScore: async (resumeId) => {
        try {
          set({ scoreError: null });
          const score = await resumeScoringService.getResumeScore(resumeId);
          // Score can be null if it doesn't exist yet - this is normal, not an error
          set({ currentScore: score, scoreError: null });
        } catch (error) {
          // Only set error for actual failures, not when score doesn't exist
          console.error('Error fetching resume score:', error);
          set({ 
            scoreError: error instanceof Error ? error.message : 'Failed to fetch score',
            currentScore: null 
          });
        }
      },

      scoreResume: async (resumeId) => {
        try {
          set({ isScoring: true, scoreError: null, rateLimitInfo: null });
          const score = await resumeScoringService.scoreResume(resumeId);
          set({ currentScore: score, isScoring: false });
        } catch (error) {
          console.error('Error scoring resume:', error);
          
          // Handle rate limit error - set rateLimitInfo for modal display
          if (error instanceof RateLimitError) {
            set({ 
              isScoring: false,
              scoreError: null, // Don't show as generic error
              rateLimitInfo: {
                resetTime: error.resetTime,
                maxRequests: error.maxRequests
              }
            });
            throw error;
          }
          
          // Handle other errors
          set({ 
            isScoring: false,
            scoreError: error instanceof Error ? error.message : 'Failed to score resume'
          });
          throw error;
        }
      },

      setScore: (score) => set({ currentScore: score }),

      clearScore: () => set({ currentScore: null, scoreError: null }),

      clearRateLimitInfo: () => set({ rateLimitInfo: null }),

      // Poll for score after auto-scoring (background generation)
      pollForScore: async (resumeId, maxAttempts = 10, intervalMs = 2000) => {
        set({ isPollingScore: true, scoreError: null });
        
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
          try {
            const score = await resumeScoringService.getResumeScore(resumeId);
            
            if (score) {
              // Score is available!
              set({ currentScore: score, isPollingScore: false, scoreError: null });
              return;
            }
            
            // Score not ready yet, wait before next attempt
            if (attempt < maxAttempts - 1) {
              await new Promise(resolve => setTimeout(resolve, intervalMs));
            }
          } catch (error) {
            // Only log actual errors, not "score not found"
            if (error instanceof Error && !error.message.includes('Score not found')) {
              console.error('Error polling for score:', error);
            }
          }
        }
        
        // Max attempts reached, score still not available
        set({ 
          isPollingScore: false,
          currentScore: null,
          scoreError: null // Don't show error, score just isn't ready yet
        });
      },

      // Update a specific section in the generated resume
      updateResumeSection: (sectionType, enhancedText, sectionId) => {
        const { generatedResume } = get();
        if (!generatedResume) {
          console.warn('No generated resume to update');
          return null;
        }

        const updatedResume = { ...generatedResume };

        switch (sectionType) {
          case 'summary':
            updatedResume.professionalSummary = enhancedText;
            break;
          
          case 'experience':
            // If sectionId is provided, update specific experience entry
            // Otherwise, parse and distribute to all experiences
            if (sectionId && updatedResume.experience) {
              const expIndex = parseInt(sectionId, 10);
              if (!isNaN(expIndex) && updatedResume.experience[expIndex]) {
                updatedResume.experience[expIndex] = {
                  ...updatedResume.experience[expIndex],
                  description: enhancedText
                };
              }
            } else if (updatedResume.experience && updatedResume.experience.length > 0) {
              // Parse enhanced text by double-newlines and distribute to each experience
              const entries = enhancedText.split(/\n\s*\n/).filter(e => e.trim().length > 0);
              
              if (entries.length >= updatedResume.experience.length) {
                // Distribute each entry to its corresponding experience
                updatedResume.experience.forEach((exp, index) => {
                  if (entries[index]) {
                    // Extract description after "Title at Company:" pattern
                    const entry = entries[index];
                    const colonIndex = entry.indexOf(':');
                    const description = colonIndex !== -1 
                      ? entry.slice(colonIndex + 1).trim() 
                      : entry.trim();
                    
                    updatedResume.experience[index] = {
                      ...exp,
                      description
                    };
                  }
                });
              } else {
                // Fallback: fewer entries than experiences - update only what we have
                entries.forEach((entry, index) => {
                  if (updatedResume.experience[index]) {
                    const colonIndex = entry.indexOf(':');
                    const description = colonIndex !== -1 
                      ? entry.slice(colonIndex + 1).trim() 
                      : entry.trim();
                    
                    updatedResume.experience[index] = {
                      ...updatedResume.experience[index],
                      description
                    };
                  }
                });
                console.warn(`Enhanced text had ${entries.length} entries, but ${updatedResume.experience.length} experiences exist.`);
              }
            }
            break;
          
          case 'education':
            // Education entries are formatted as "degree in field from institution"
            // Handle both single education entry and multiple entries
            if (sectionId && updatedResume.education) {
              // Update specific education entry
              const eduIndex = parseInt(sectionId, 10);
              if (!isNaN(eduIndex) && updatedResume.education[eduIndex]) {
                // Try to parse enhanced text: "degree in field from institution"
                // Pattern: "Degree in Field from Institution"
                const text = enhancedText.trim();
                const inMatch = text.match(/^(.+?)\s+in\s+(.+?)\s+from\s+(.+)$/i);
                
                if (inMatch) {
                  // Successfully parsed format
                  updatedResume.education[eduIndex] = {
                    ...updatedResume.education[eduIndex],
                    degree: inMatch[1].trim(),
                    field: inMatch[2].trim(),
                    institution: inMatch[3].trim()
                  };
                } else {
                  // Couldn't parse - try simpler patterns or update degree field
                  // Check if it contains "from" to extract institution
                  const fromMatch = text.match(/^(.+?)\s+from\s+(.+)$/i);
                  if (fromMatch) {
                    updatedResume.education[eduIndex] = {
                      ...updatedResume.education[eduIndex],
                      degree: fromMatch[1].trim(),
                      institution: fromMatch[2].trim()
                    };
                  } else {
                    // Last resort: update degree field with enhanced text
                    updatedResume.education[eduIndex] = {
                      ...updatedResume.education[eduIndex],
                      degree: text
                    };
                  }
                }
              }
            } else if (updatedResume.education && updatedResume.education.length > 0) {
              // No sectionId - update first education entry
              // Try to parse enhanced text
              const text = enhancedText.trim();
              
              // Handle multiple education entries separated by newlines
              const entries = text.split('\n\n').filter(e => e.trim().length > 0);
              
              if (entries.length > 1) {
                // Multiple education entries - update all that exist
                entries.forEach((entry, index) => {
                  if (updatedResume.education[index]) {
                    const inMatch = entry.match(/^(.+?)\s+in\s+(.+?)\s+from\s+(.+)$/i);
                    if (inMatch) {
                      updatedResume.education[index] = {
                        ...updatedResume.education[index],
                        degree: inMatch[1].trim(),
                        field: inMatch[2].trim(),
                        institution: inMatch[3].trim()
                      };
                    }
                  }
                });
              } else if (entries.length === 1) {
                // Single education entry - update first
                const entry = entries[0];
                const inMatch = entry.match(/^(.+?)\s+in\s+(.+?)\s+from\s+(.+)$/i);
                
                if (inMatch) {
                  updatedResume.education[0] = {
                    ...updatedResume.education[0],
                    degree: inMatch[1].trim(),
                    field: inMatch[2].trim(),
                    institution: inMatch[3].trim()
                  };
                } else {
                  // Fallback: update degree field
                  updatedResume.education[0] = {
                    ...updatedResume.education[0],
                    degree: entry.trim()
                  };
                }
              }
            }
            break;
          
          case 'project':
          case 'projects':
            if (sectionId && updatedResume.projects) {
              const projIndex = parseInt(sectionId, 10);
              if (!isNaN(projIndex) && updatedResume.projects[projIndex]) {
                updatedResume.projects[projIndex] = {
                  ...updatedResume.projects[projIndex],
                  description: enhancedText
                };
              }
            } else if (updatedResume.projects && updatedResume.projects.length > 0) {
              updatedResume.projects[0] = {
                ...updatedResume.projects[0],
                description: enhancedText
              };
            }
            break;
          
          case 'achievement':
          case 'achievements':
            // Update the STANDALONE achievements array (generatedResume.achievements)
            // This is what the scoring verifier checks, not experience[].achievements
            {
              let achievements: string[] = [];
              
              // First, try splitting by newlines (preferred format)
              const newlineSplit = enhancedText.split('\n').filter(a => a.trim().length > 0);
              
              if (newlineSplit.length > 1) {
                // Multiple achievements separated by newlines - use as is
                achievements = newlineSplit;
              } else if (newlineSplit.length === 1) {
                // Single item - might be a combined paragraph, try to split by sentences
                const singleText = newlineSplit[0];
                
                // Try splitting by periods followed by capital letters or newlines
                // This handles cases where AI combined achievements into one paragraph
                const sentencePattern = /([^.!?]+[.!?])\s*(?=[A-Z]|$)/g;
                const sentences = singleText.match(sentencePattern);
                
                if (sentences && sentences.length > 1) {
                  // Successfully split into multiple sentences
                  achievements = sentences.map(s => s.trim()).filter(s => s.length > 0);
                } else {
                  // Fallback: try splitting by common achievement separators
                  const separators = ['; ', '. ', '.\n', '.\r\n'];
                  let foundSplit = false;
                  
                  for (const sep of separators) {
                    const split = singleText.split(sep).filter(a => a.trim().length > 0);
                    if (split.length > 1) {
                      achievements = split.map(s => s.trim());
                      foundSplit = true;
                      break;
                    }
                  }
                  
                  if (!foundSplit) {
                    // Last resort: use as single achievement
                    achievements = [singleText.trim()];
                    console.warn('Could not parse achievements into multiple items, using as single achievement');
                  }
                }
              } else {
                // Empty result - shouldn't happen, but handle gracefully
                achievements = [];
              }
              
              // Update the standalone achievements array (this is what the verifier checks)
              updatedResume.achievements = achievements;
            }
            break;
          
          case 'skills':
            // Intelligent parsing: handle comma-separated, newline-separated, and semicolon-separated formats
            let skills: string[] = [];
            
            // First, try splitting by commas (preferred format)
            const commaSplit = enhancedText.split(',').map(s => s.trim()).filter(s => s.length > 0);
            
            if (commaSplit.length > 1) {
              // Multiple skills separated by commas - use as is
              skills = commaSplit;
            } else if (commaSplit.length === 1) {
              // Single item - might be combined, try other separators
              const singleText = commaSplit[0];
              
              // Try newline-separated
              const newlineSplit = singleText.split('\n').filter(s => s.trim().length > 0);
              if (newlineSplit.length > 1) {
                skills = newlineSplit;
              } else {
                // Try semicolon-separated
                const semicolonSplit = singleText.split(';').map(s => s.trim()).filter(s => s.length > 0);
                if (semicolonSplit.length > 1) {
                  skills = semicolonSplit;
                } else {
                  // Last resort: use as single skill
                  skills = [singleText.trim()];
                  console.warn('Could not parse skills into multiple items, using as single skill');
                }
              }
            } else {
              skills = [];
            }
            
            // Validate: check against original skills count if available
            const originalSkills = [
              ...(updatedResume.skills?.technical || []),
              ...(updatedResume.skills?.soft || []),
              ...(updatedResume.skills?.tools || [])
            ];
            if (originalSkills.length > 1 && skills.length === 1) {
              console.warn('Skills were combined into single item during enhancement. Original had', originalSkills.length, 'items, enhanced has', skills.length);
            }
            
            updatedResume.skills = {
              technical: skills,
              soft: updatedResume.skills?.soft || [],
              tools: updatedResume.skills?.tools || []
            };
            break;
          
          case 'language':
          case 'languages':
            // Intelligent parsing: handle both single language and multiple languages
            // Format expected: "Language (Level)" or "Language1 (Level1), Language2 (Level2)" or one per line
            if (sectionId && updatedResume.languages) {
              // Update specific language entry
              const langIndex = parseInt(sectionId, 10);
              if (!isNaN(langIndex) && updatedResume.languages[langIndex]) {
                // Parse enhanced text to extract language and level
                const parts = enhancedText.split('(');
                if (parts.length >= 2) {
                  const language = parts[0].trim();
                  const level = parts[1].replace(')', '').trim();
                  updatedResume.languages[langIndex] = {
                    language,
                    level,
                    certifications: updatedResume.languages[langIndex].certifications || []
                  };
                }
              }
            } else {
              // No sectionId - parse multiple languages from enhanced text
              let languages: Array<{ language: string; level: string; certifications?: string[] }> = [];
              
              // First, try splitting by newlines
              const newlineSplit = enhancedText.split('\n').filter(l => l.trim().length > 0);
              
              if (newlineSplit.length > 1) {
                // Multiple languages separated by newlines
                languages = newlineSplit.map(langText => {
                  const parts = langText.trim().split('(');
                  if (parts.length >= 2) {
                    return {
                      language: parts[0].trim(),
                      level: parts[1].replace(')', '').trim(),
                      certifications: []
                    };
                  }
                  // Fallback: treat as language name only
                  return {
                    language: langText.trim(),
                    level: 'intermediate',
                    certifications: []
                  };
                }).filter(l => l.language.length > 0);
              } else if (newlineSplit.length === 1) {
                // Single item - might be comma-separated
                const singleText = newlineSplit[0];
                const commaSplit = singleText.split(',').map(s => s.trim()).filter(s => s.length > 0);
                
                if (commaSplit.length > 1) {
                  // Multiple languages separated by commas
                  languages = commaSplit.map(langText => {
                    const parts = langText.trim().split('(');
                    if (parts.length >= 2) {
                      return {
                        language: parts[0].trim(),
                        level: parts[1].replace(')', '').trim(),
                        certifications: []
                      };
                    }
                    return {
                      language: langText.trim(),
                      level: 'intermediate',
                      certifications: []
                    };
                  }).filter(l => l.language.length > 0);
                } else {
                  // Single language
                  const parts = singleText.trim().split('(');
                  if (parts.length >= 2) {
                    languages = [{
                      language: parts[0].trim(),
                      level: parts[1].replace(')', '').trim(),
                      certifications: []
                    }];
                  } else {
                    languages = [{
                      language: singleText.trim(),
                      level: 'intermediate',
                      certifications: []
                    }];
                  }
                }
              }
              
              // Validate: check against original languages count
              const originalLanguages = updatedResume.languages || [];
              if (originalLanguages.length > 1 && languages.length === 1) {
                console.warn('Languages were combined into single item during enhancement. Original had', originalLanguages.length, 'items, enhanced has', languages.length);
              }
              
              // Update languages array if we have valid parsed languages
              if (languages.length > 0) {
                updatedResume.languages = languages;
              }
            }
            break;
          
          default:
            console.warn(`Unknown section type: ${sectionType}`);
            return null;
        }

        // Update the store with the modified resume
        set({ generatedResume: updatedResume });
        return updatedResume;
      },

      // Sync contact info from resumeData to generatedResume
      // This is needed when user edits profile (Step 1) and returns to scoring (Step 9)
      syncContactInfoToGeneratedResume: () => {
        const { resumeData, generatedResume } = get();
        if (!generatedResume || !resumeData) return null;

        // Check if there are any differences to sync
        const currentContactInfo = generatedResume.contactInfo;
        const needsSync = 
          (resumeData.linkedin && resumeData.linkedin !== currentContactInfo.linkedin) ||
          (resumeData.email && resumeData.email !== currentContactInfo.email) ||
          (resumeData.phone && resumeData.phone !== currentContactInfo.phone) ||
          (resumeData.firstName && resumeData.lastName && 
           `${resumeData.firstName} ${resumeData.lastName}` !== currentContactInfo.fullName);

        if (!needsSync) {
          return null; // No changes needed
        }

        // Build updated contact info, preferring resumeData values
        const updatedResume: GeneratedResume = {
          ...generatedResume,
          contactInfo: {
            ...currentContactInfo,
            fullName: resumeData.firstName && resumeData.lastName 
              ? `${resumeData.firstName} ${resumeData.lastName}`
              : currentContactInfo.fullName,
            email: resumeData.email || currentContactInfo.email,
            phone: resumeData.phone || currentContactInfo.phone,
            linkedin: resumeData.linkedin || currentContactInfo.linkedin,
            location: resumeData.country || currentContactInfo.location,
          }
        };

        set({ generatedResume: updatedResume });
        return updatedResume;
      },

      // Note: syncResumeDataToGeneratedResume was removed.
      // Once AI generation happens in Step 8, the generatedResume is the source of truth.
      // All edits from Step 8 onwards happen directly on generatedResume via GeneratedResumeView.
      // Backward navigation to Steps 1-7 is locked after reaching Step 8.

      // Reverse sync: generatedResume to resumeData
      // Used when user makes edits in Step 9 DataEditModal
      syncGeneratedResumeToResumeData: () => {
        const { resumeData, generatedResume } = get();
        if (!generatedResume || !resumeData) return;

        // Helper to parse duration string back to dates
        const parseDuration = (duration: string): { startDate: string; endDate: string; isCurrent: boolean } => {
          if (!duration) return { startDate: '', endDate: '', isCurrent: false };
          const parts = duration.split(' - ').map(p => p.trim());
          const isCurrent = parts[1]?.toLowerCase() === 'present';
          return {
            startDate: parts[0] || '',
            endDate: isCurrent ? '' : (parts[1] || ''),
            isCurrent,
          };
        };

        // Parse fullName into firstName and lastName
        const nameParts = (generatedResume.contactInfo?.fullName || '').split(' ');
        const firstName = nameParts[0] || resumeData.firstName;
        const lastName = nameParts.slice(1).join(' ') || resumeData.lastName;

        // Map education back to resumeData format
        const mappedEducation = generatedResume.education?.map((edu, index) => {
          const existing = resumeData.education[index];
          const dates = parseDuration(edu.duration);
          return {
            id: existing?.id || Date.now().toString() + index,
            institution: edu.institution,
            degree: edu.degree,
            field: edu.field,
            startDate: dates.startDate,
            endDate: dates.endDate,
            isCompleted: !dates.isCurrent,
            gpa: edu.gpa || '',
            pageNumber: existing?.pageNumber || null,
          };
        }) || resumeData.education;

        // Map experience back to resumeData format
        const mappedExperience = generatedResume.experience?.map((exp, index) => {
          const existing = resumeData.experience[index];
          const dates = parseDuration(exp.duration);
          return {
            id: existing?.id || Date.now().toString() + index,
            title: exp.title,
            company: exp.company,
            startDate: dates.startDate,
            endDate: dates.endDate,
            isCurrent: dates.isCurrent,
            achievements: exp.achievements || [],
            responsibilities: existing?.responsibilities || [],
            pageNumber: existing?.pageNumber || null,
          };
        }) || resumeData.experience;

        // Map projects back to resumeData format
        const mappedProjects = generatedResume.projects?.map((proj, index) => {
          const existing = resumeData.projects[index];
          const dates = parseDuration(proj.duration);
          return {
            id: existing?.id || Date.now().toString() + index,
            name: proj.name,
            description: proj.description,
            technologies: proj.technologies || [],
            url: proj.url || '',
            startDate: dates.startDate,
            endDate: dates.endDate,
            isOngoing: dates.isCurrent,
            pageNumber: existing?.pageNumber || null,
          };
        }) || resumeData.projects;

        // Map languages back to resumeData format
        const mapLevelToResumeData = (level: string): 'basic' | 'intermediate' | 'advanced' | 'native' => {
          const lower = level.toLowerCase();
          if (lower.includes('native') || lower.includes('fluent')) return 'native';
          if (lower.includes('advanced') || lower.includes('professional')) return 'advanced';
          if (lower.includes('basic') || lower.includes('beginner') || lower.includes('elementary')) return 'basic';
          return 'intermediate';
        };

        const mappedLanguages = generatedResume.languages?.map((lang, index) => {
          const existing = resumeData.languages[index];
          return {
            id: existing?.id || Date.now().toString() + index,
            name: lang.language,
            level: mapLevelToResumeData(lang.level),
            pageNumber: existing?.pageNumber || null,
          };
        }) || resumeData.languages;

        // Map achievements back to resumeData format (generatedResume has string[], resumeData has Achievement[])
        const mappedAchievements = generatedResume.achievements?.map((ach, index) => {
          const existing = resumeData.achievements[index];
          return {
            id: existing?.id || Date.now().toString() + index,
            title: ach.split(':')[0] || ach,
            description: ach.split(':')[1]?.trim() || ach,
            year: existing?.year || new Date().getFullYear().toString(),
            pageNumber: existing?.pageNumber || null,
          };
        }) || resumeData.achievements;

        // Combine all skills from generatedResume
        const allSkills = [
          ...(generatedResume.skills?.technical || []),
          ...(generatedResume.skills?.soft || []),
          ...(generatedResume.skills?.tools || []),
        ];

        // Map certifications back to resumeData format
        const mappedCertifications = generatedResume.certifications?.map((cert, index) => {
          const existing = resumeData.certifications[index];
          return {
            id: existing?.id || Date.now().toString() + index,
            name: cert.name,
            issuer: cert.issuer,
            date: cert.date,
            credentialId: cert.credentialId || '',
            url: cert.url || '',
            pageNumber: existing?.pageNumber || null,
          };
        }) || resumeData.certifications;

        // Update resumeData with all mapped fields
        set({
          resumeData: {
            ...resumeData,
            firstName,
            lastName,
            email: generatedResume.contactInfo?.email || resumeData.email,
            phone: generatedResume.contactInfo?.phone || resumeData.phone,
            linkedin: generatedResume.contactInfo?.linkedin || resumeData.linkedin,
            country: generatedResume.contactInfo?.location || resumeData.country,
            summary: generatedResume.professionalSummary || resumeData.summary,
            skillsRaw: allSkills.length > 0 ? allSkills : resumeData.skillsRaw,
            education: mappedEducation,
            experience: mappedExperience,
            projects: mappedProjects,
            languages: mappedLanguages,
            achievements: mappedAchievements,
            certifications: mappedCertifications,
          },
        });

        console.log('syncGeneratedResumeToResumeData: Reverse synced from generatedResume to resumeData');
      },

      // Combined update for DataEditModal
      // Updates both stores, saves to API, and triggers re-score
      updateSectionAndSync: async (
        generatedResumeUpdates: Partial<GeneratedResume>,
        resumeDataUpdates: Partial<ResumeData>
      ) => {
        const { generatedResume, resumeData, currentResumeId, currentScore } = get();
        
        if (!currentResumeId) {
          throw new Error('No resume ID available');
        }

        // 1. Update generatedResume in store
        const updatedGeneratedResume = generatedResume 
          ? { ...generatedResume, ...generatedResumeUpdates }
          : null;
        
        // 2. Update resumeData in store
        const updatedResumeData = { ...resumeData, ...resumeDataUpdates };

        // Update both in store
        set({
          generatedResume: updatedGeneratedResume,
          resumeData: updatedResumeData,
          isDirty: true,
        });

        // 3. Save generatedResume to API
        if (updatedGeneratedResume) {
          await resumeService.updateResume(currentResumeId, {
            generatedResume: updatedGeneratedResume,
          });
        }

        // 4. Save resumeData to API
        await resumeService.updateResume(currentResumeId, {
          resumeData: updatedResumeData,
        });

        set({ isDirty: false, lastSaved: new Date() });

        // 5. Trigger re-score if user has a score already (premium)
        if (currentScore) {
          try {
            set({ isScoring: true, scoreError: null });
            const newScore = await resumeScoringService.scoreResume(currentResumeId);
            set({ currentScore: newScore, isScoring: false });
          } catch (error) {
            console.error('Error re-scoring resume:', error);
            set({ isScoring: false });
            // Don't throw - the save was successful, just the re-score failed
          }
        }

        console.log('updateSectionAndSync: Updated both stores, saved to API, and re-scored');
      },

      // Persist generatedResume to API without re-scoring
      // Used for Step 8 enhancements where we want to save changes but not trigger expensive re-scoring
      persistGeneratedResume: async () => {
        const { generatedResume, currentResumeId } = get();
        
        if (!currentResumeId) {
          console.warn('persistGeneratedResume: No resume ID available');
          return;
        }

        if (!generatedResume) {
          console.warn('persistGeneratedResume: No generated resume to persist');
          return;
        }

        try {
          await resumeService.updateResume(currentResumeId, {
            generatedResume,
          });
          set({ isDirty: false, lastSaved: new Date() });
          console.log('persistGeneratedResume: Saved generatedResume to API (no re-scoring)');
        } catch (error) {
          console.error('Error persisting generated resume:', error);
          throw error;
        }
      },
    })
);
