import { create } from 'zustand';
import { ResumeData, WizardState, WorkExperience, Education, Certification, Project, Language, GeneratedResume, ResumeScore } from '@/types';
import { resumeService } from '@/services/resumeService';
import { resumeScoringService } from '@/services/resumeScoringService';

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

  // Actions
  updateResumeData: (updates: Partial<ResumeData>) => void;
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
  calculateCharacters: () => number;
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
  
  // Section Update Actions
  updateResumeSection: (sectionType: string, enhancedText: string, sectionId?: string) => GeneratedResume | null;
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
                // Update existing resume
                await resumeService.updateResume(currentResumeId, {
                  resumeData: resumeDataToSave,
                  updatedAt: new Date(),
                });
                set({ isDirty: false, lastSaved: new Date() });
              } else {
                // Create new resume on first save
                const newResume = await resumeService.createResume(resumeDataToSave);
                set({ 
                  currentResumeId: newResume.id,
                  isDirty: false,
                  lastSaved: new Date(),
                });
              }
            } catch (error) {
              console.error('Error auto-saving resume:', error);
              // Keep isDirty as true if save failed
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

      // Load complete resume data without triggering auto-save
      // Used when loading an existing resume from the API
      loadResumeData: (resumeData) => {
        console.log('🔧 Store - loadResumeData called with:', resumeData);
        console.log('🔧 Store - profession in resumeData:', resumeData?.profession);
        
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

      calculateCharacters: () => {
        const state = get();
        const data = state.resumeData;
        
        let total = 0;
        total += data.summary.length;
        total += data.jobDescription.length;
        total += data.skillsRaw.join(' ').length;
        
        data.experience.forEach(exp => {
          total += exp.title.length + exp.company.length;
          total += exp.achievements.join(' ').length;
          total += exp.responsibilities.join(' ').length;
        });
        
        data.education.forEach(edu => {
          total += edu.institution.length + edu.degree.length + edu.field.length;
        });
        
        data.certifications.forEach(cert => {
          total += cert.name.length + cert.issuer.length;
        });
        
        data.projects.forEach(proj => {
          total += proj.name.length + proj.description.length;
          total += proj.technologies.join(' ').length;
        });
        
        data.languages.forEach(lang => {
          total += lang.name.length;
        });
        
        return total;
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
          set({ isScoring: true, scoreError: null });
          const score = await resumeScoringService.scoreResume(resumeId);
          set({ currentScore: score, isScoring: false });
        } catch (error) {
          console.error('Error scoring resume:', error);
          set({ 
            isScoring: false,
            scoreError: error instanceof Error ? error.message : 'Failed to score resume'
          });
          throw error;
        }
      },

      setScore: (score) => set({ currentScore: score }),

      clearScore: () => set({ currentScore: null, scoreError: null }),

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
            // Otherwise, update the first experience entry's description
            if (sectionId && updatedResume.experience) {
              const expIndex = parseInt(sectionId, 10);
              if (!isNaN(expIndex) && updatedResume.experience[expIndex]) {
                updatedResume.experience[expIndex] = {
                  ...updatedResume.experience[expIndex],
                  description: enhancedText
                };
              }
            } else if (updatedResume.experience && updatedResume.experience.length > 0) {
              // Update first experience entry
              updatedResume.experience[0] = {
                ...updatedResume.experience[0],
                description: enhancedText
              };
            }
            break;
          
          case 'education':
            if (sectionId && updatedResume.education) {
              const eduIndex = parseInt(sectionId, 10);
              if (!isNaN(eduIndex) && updatedResume.education[eduIndex]) {
                // For education, we might need to update multiple fields
                // For now, we'll update the degree field or create a combined text
                updatedResume.education[eduIndex] = {
                  ...updatedResume.education[eduIndex],
                  // Store enhanced text in a way that makes sense
                };
              }
            }
            break;
          
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
          
          case 'achievements':
            // Achievements are typically part of experience entries
            // Split enhanced text by newlines to create achievement array
            if (updatedResume.experience && updatedResume.experience.length > 0) {
              const achievements = enhancedText.split('\n').filter(a => a.trim().length > 0);
              updatedResume.experience[0] = {
                ...updatedResume.experience[0],
                achievements: achievements
              };
            }
            break;
          
          case 'skills':
            // Split enhanced text by commas to create skills array
            const skills = enhancedText.split(',').map(s => s.trim()).filter(s => s.length > 0);
            updatedResume.skills = {
              technical: skills,
              soft: updatedResume.skills?.soft || [],
              tools: updatedResume.skills?.tools || []
            };
            break;
          
          case 'languages':
            if (sectionId && updatedResume.languages) {
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
    })
);
