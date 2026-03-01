import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, WizardState, WorkExperience } from '@/types';

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
  mode: 'manual',
  isCompleted: false,
};

interface PublicResumeStore {
  resumeData: ResumeData;
  wizardState: WizardState;
  currentResumeId: null;
  isDirty: boolean;
  selectedTemplateId?: string;
  selectedTemplateCategory?: 'free' | 'premium';

  updateResumeData: (updates: Partial<ResumeData>) => void;
  saveResumeDataImmediately: () => Promise<void>;
  loadResumeData: (data: ResumeData) => void;
  markStepCompleted: (step: number) => void;
  markStepSkipped: (step: number) => void;
  setCurrentStep: (step: number) => void;
  addWorkExperience: (experience: WorkExperience) => void;
  updateWorkExperience: (id: string, updates: Partial<WorkExperience>) => void;
  removeWorkExperience: (id: string) => void;
  setSelectedTemplate: (templateId: string, category: 'free' | 'premium') => void;
  resetResume: () => void;
  setDirty: (dirty: boolean) => void;
  updateWizardState: (updates: Partial<WizardState>) => void;
}

export const usePublicResumeStore = create<PublicResumeStore>()(
  persist(
    (set) => ({
      resumeData: initialResumeData,
      wizardState: initialWizardState,
      currentResumeId: null,
      isDirty: false,
      selectedTemplateId: undefined,
      selectedTemplateCategory: undefined,

      updateResumeData: (updates) => {
        set((state) => ({
          resumeData: { ...state.resumeData, ...updates },
          isDirty: true,
        }));
      },

      saveResumeDataImmediately: () => Promise.resolve(),

      loadResumeData: (data) => {
        const completedSteps = data.completedSteps || [];
        const maxCompletedStep = completedSteps.length > 0 ? Math.max(...completedSteps) : 0;
        const currentStep = data.currentStep && data.currentStep > 0
          ? data.currentStep
          : (maxCompletedStep > 0 ? maxCompletedStep : 1);

        set({
          resumeData: { ...data, completedSteps, currentStep },
          wizardState: {
            currentStep,
            completedSteps,
            mode: 'manual',
            isCompleted: false,
          },
          isDirty: false,
        });
      },

      markStepCompleted: (step) => {
        set((state) => {
          const completedSteps = [...state.wizardState.completedSteps];
          if (!completedSteps.includes(step)) {
            completedSteps.push(step);
          }
          return {
            wizardState: { ...state.wizardState, completedSteps },
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
            wizardState: { ...state.wizardState, completedSteps },
            resumeData: {
              ...state.resumeData,
              completedSteps,
              currentStep: Math.max(state.resumeData.currentStep || 1, step),
            },
            isDirty: true,
          };
        });
      },

      setCurrentStep: (step) => {
        set((state) => ({
          wizardState: { ...state.wizardState, currentStep: step },
          resumeData: { ...state.resumeData, currentStep: step },
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

      setSelectedTemplate: (templateId, category) => {
        set({ selectedTemplateId: templateId, selectedTemplateCategory: category });
      },

      resetResume: () => {
        set({
          resumeData: initialResumeData,
          wizardState: initialWizardState,
          isDirty: false,
          selectedTemplateId: undefined,
          selectedTemplateCategory: undefined,
        });
        localStorage.removeItem('public_selected_template');
      },

      setDirty: (dirty) => set({ isDirty: dirty }),

      updateWizardState: (updates) => {
        set((state) => ({
          wizardState: { ...state.wizardState, ...updates },
          isDirty: true,
        }));
      },
    }),
    {
      name: 'public_resume_draft',
      partialize: (state) => ({
        resumeData: state.resumeData,
        wizardState: state.wizardState,
        selectedTemplateId: state.selectedTemplateId,
        selectedTemplateCategory: state.selectedTemplateCategory,
      }),
    }
  )
);
