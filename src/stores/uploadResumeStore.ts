/**
 * Zustand store for Resume Upload flow state management
 */

import { create } from 'zustand';
import { ResumeData } from '@/types';
import { ExtractedResumeData, ValidationError } from '@/services/resumeExtractionService';

interface UploadResumeState {
  // File state
  selectedFile: File | null;
  extractedText: string | null;
  isExtractingText: boolean;
  textExtractionError: string | null;
  
  // AI extraction state
  extractedData: ExtractedResumeData | null;
  isExtractingData: boolean;
  dataExtractionError: string | null;
  
  // Validation
  validationErrors: ValidationError[];
  validationWarnings: ValidationError[];
  
  // UI state
  currentStep: 'upload' | 'extracting' | 'review' | 'creating';
  
  // Actions
  setFile: (file: File | null) => void;
  setExtractedText: (text: string | null) => void;
  setIsExtractingText: (isExtracting: boolean) => void;
  setTextExtractionError: (error: string | null) => void;
  
  setExtractedData: (data: ExtractedResumeData | null) => void;
  setIsExtractingData: (isExtracting: boolean) => void;
  setDataExtractionError: (error: string | null) => void;
  
  setValidationErrors: (errors: ValidationError[]) => void;
  setValidationWarnings: (warnings: ValidationError[]) => void;
  
  setCurrentStep: (step: 'upload' | 'extracting' | 'review' | 'creating') => void;
  
  // Field update for review/edit
  updateField: <K extends keyof ExtractedResumeData>(
    field: K, 
    value: ExtractedResumeData[K]
  ) => void;
  
  // Experience/Education/Project management
  updateExperience: (index: number, experience: any) => void;
  addExperience: () => void;
  removeExperience: (index: number) => void;
  
  updateEducation: (index: number, education: any) => void;
  addEducation: () => void;
  removeEducation: (index: number) => void;
  
  updateSkills: (skills: string[]) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
  
  // Projects management
  updateProject: (index: number, project: any) => void;
  addProject: () => void;
  removeProject: (index: number) => void;
  
  // Achievements management
  updateAchievement: (index: number, achievement: any) => void;
  addAchievement: () => void;
  removeAchievement: (index: number) => void;
  
  // Certifications management
  updateCertification: (index: number, certification: any) => void;
  addCertification: () => void;
  removeCertification: (index: number) => void;
  
  // Languages management
  updateLanguage: (index: number, language: any) => void;
  addLanguage: () => void;
  removeLanguage: (index: number) => void;
  
  // Reset
  resetUpload: () => void;
}

const initialState = {
  selectedFile: null,
  extractedText: null,
  isExtractingText: false,
  textExtractionError: null,
  extractedData: null,
  isExtractingData: false,
  dataExtractionError: null,
  validationErrors: [],
  validationWarnings: [],
  currentStep: 'upload' as const,
};

export const useUploadResumeStore = create<UploadResumeState>((set, get) => ({
  ...initialState,

  setFile: (file) => set({ selectedFile: file }),
  
  setExtractedText: (text) => set({ extractedText: text }),
  
  setIsExtractingText: (isExtracting) => set({ isExtractingText: isExtracting }),
  
  setTextExtractionError: (error) => set({ textExtractionError: error }),
  
  setExtractedData: (data) => set({ extractedData: data }),
  
  setIsExtractingData: (isExtracting) => set({ isExtractingData: isExtracting }),
  
  setDataExtractionError: (error) => set({ dataExtractionError: error }),
  
  setValidationErrors: (errors) => set({ validationErrors: errors }),
  
  setValidationWarnings: (warnings) => set({ validationWarnings: warnings }),
  
  setCurrentStep: (step) => set({ currentStep: step }),

  updateField: (field, value) => {
    const { extractedData } = get();
    if (extractedData) {
      set({
        extractedData: {
          ...extractedData,
          [field]: value,
        },
      });
    }
  },

  updateExperience: (index, experience) => {
    const { extractedData } = get();
    if (extractedData) {
      const experiences = [...extractedData.experiences];
      experiences[index] = { ...experiences[index], ...experience };
      set({
        extractedData: {
          ...extractedData,
          experiences,
        },
      });
    }
  },

  addExperience: () => {
    const { extractedData } = get();
    if (extractedData) {
      const newExperience = {
        id: `exp-${Date.now()}`,
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        achievements: [''],
        responsibilities: [],
        pageNumber: null,
      };
      set({
        extractedData: {
          ...extractedData,
          experiences: [...extractedData.experiences, newExperience as any],
        },
      });
    }
  },

  removeExperience: (index) => {
    const { extractedData } = get();
    if (extractedData) {
      const experiences = extractedData.experiences.filter((_, i) => i !== index);
      set({
        extractedData: {
          ...extractedData,
          experiences,
        },
      });
    }
  },

  updateEducation: (index, education) => {
    const { extractedData } = get();
    if (extractedData) {
      const educationList = [...extractedData.education];
      educationList[index] = { ...educationList[index], ...education };
      set({
        extractedData: {
          ...extractedData,
          education: educationList,
        },
      });
    }
  },

  addEducation: () => {
    const { extractedData } = get();
    if (extractedData) {
      const newEducation = {
        id: `edu-${Date.now()}`,
        degree: '',
        institution: '',
        field: '',
        startDate: '',
        endDate: '',
        isCompleted: true,
        pageNumber: null,
      };
      set({
        extractedData: {
          ...extractedData,
          education: [...extractedData.education, newEducation as any],
        },
      });
    }
  },

  removeEducation: (index) => {
    const { extractedData } = get();
    if (extractedData) {
      const education = extractedData.education.filter((_, i) => i !== index);
      set({
        extractedData: {
          ...extractedData,
          education,
        },
      });
    }
  },

  updateSkills: (skills) => {
    const { extractedData } = get();
    if (extractedData) {
      set({
        extractedData: {
          ...extractedData,
          skills,
        },
      });
    }
  },

  addSkill: (skill) => {
    const { extractedData } = get();
    if (extractedData && skill.trim() && !extractedData.skills.includes(skill.trim())) {
      set({
        extractedData: {
          ...extractedData,
          skills: [...extractedData.skills, skill.trim()],
        },
      });
    }
  },

  removeSkill: (index) => {
    const { extractedData } = get();
    if (extractedData) {
      const skills = extractedData.skills.filter((_, i) => i !== index);
      set({
        extractedData: {
          ...extractedData,
          skills,
        },
      });
    }
  },

  // Projects management
  updateProject: (index, project) => {
    const { extractedData } = get();
    if (extractedData) {
      const projects = [...extractedData.projects];
      projects[index] = { ...projects[index], ...project };
      set({
        extractedData: {
          ...extractedData,
          projects,
        },
      });
    }
  },

  addProject: () => {
    const { extractedData } = get();
    if (extractedData) {
      const newProject = {
        id: `proj-${Date.now()}`,
        name: '',
        description: '',
        technologies: [],
        url: '',
        startDate: '',
        endDate: '',
        isOngoing: false,
        pageNumber: null,
      };
      set({
        extractedData: {
          ...extractedData,
          projects: [...extractedData.projects, newProject as any],
        },
      });
    }
  },

  removeProject: (index) => {
    const { extractedData } = get();
    if (extractedData) {
      const projects = extractedData.projects.filter((_, i) => i !== index);
      set({
        extractedData: {
          ...extractedData,
          projects,
        },
      });
    }
  },

  // Achievements management
  updateAchievement: (index, achievement) => {
    const { extractedData } = get();
    if (extractedData) {
      const achievements = [...extractedData.achievements];
      achievements[index] = { ...achievements[index], ...achievement };
      set({
        extractedData: {
          ...extractedData,
          achievements,
        },
      });
    }
  },

  addAchievement: () => {
    const { extractedData } = get();
    if (extractedData) {
      const newAchievement = {
        id: `ach-${Date.now()}`,
        title: '',
        description: '',
        year: '',
        pageNumber: null,
      };
      set({
        extractedData: {
          ...extractedData,
          achievements: [...extractedData.achievements, newAchievement as any],
        },
      });
    }
  },

  removeAchievement: (index) => {
    const { extractedData } = get();
    if (extractedData) {
      const achievements = extractedData.achievements.filter((_, i) => i !== index);
      set({
        extractedData: {
          ...extractedData,
          achievements,
        },
      });
    }
  },

  // Certifications management
  updateCertification: (index, certification) => {
    const { extractedData } = get();
    if (extractedData) {
      const certifications = [...extractedData.certifications];
      certifications[index] = { ...certifications[index], ...certification };
      set({
        extractedData: {
          ...extractedData,
          certifications,
        },
      });
    }
  },

  addCertification: () => {
    const { extractedData } = get();
    if (extractedData) {
      const newCertification = {
        id: `cert-${Date.now()}`,
        name: '',
        issuer: '',
        date: '',
        credentialId: '',
        url: '',
        pageNumber: null,
      };
      set({
        extractedData: {
          ...extractedData,
          certifications: [...extractedData.certifications, newCertification as any],
        },
      });
    }
  },

  removeCertification: (index) => {
    const { extractedData } = get();
    if (extractedData) {
      const certifications = extractedData.certifications.filter((_, i) => i !== index);
      set({
        extractedData: {
          ...extractedData,
          certifications,
        },
      });
    }
  },

  // Languages management
  updateLanguage: (index, language) => {
    const { extractedData } = get();
    if (extractedData) {
      const languages = [...extractedData.languages];
      languages[index] = { ...languages[index], ...language };
      set({
        extractedData: {
          ...extractedData,
          languages,
        },
      });
    }
  },

  addLanguage: () => {
    const { extractedData } = get();
    if (extractedData) {
      const newLanguage = {
        id: `lang-${Date.now()}`,
        name: '',
        level: 'intermediate' as const,
        pageNumber: null,
      };
      set({
        extractedData: {
          ...extractedData,
          languages: [...extractedData.languages, newLanguage as any],
        },
      });
    }
  },

  removeLanguage: (index) => {
    const { extractedData } = get();
    if (extractedData) {
      const languages = extractedData.languages.filter((_, i) => i !== index);
      set({
        extractedData: {
          ...extractedData,
          languages,
        },
      });
    }
  },

  resetUpload: () => set(initialState),
}));

