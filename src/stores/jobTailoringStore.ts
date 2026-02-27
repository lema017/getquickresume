import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  TailoringWizardState,
  TailoringWizardStep,
  UrlValidationResult,
  JobPostingInfo,
  JobAnalysisResult,
  ClarificationQuestion,
  ClarificationAnswer,
  TailoringResult,
  ClaimedKeyword,
} from '@/types/jobTailoring';
import { Resume, GeneratedResume } from '@/types';
import { jobTailoringService } from '@/services/jobTailoringService';

// Storage version for migrations
const STORAGE_VERSION = 1;
const STORAGE_KEY = 'job-tailoring-wizard';
const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

interface JobTailoringStore extends TailoringWizardState {
  // Source resume
  sourceResume: Resume | null;

  // Generated tailored resume
  tailoredResume: GeneratedResume | null;

  // Persistence metadata
  _persistedAt: number | null;

  // Actions
  setCurrentStep: (step: TailoringWizardStep) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Resume selection
  setSelectedResume: (resume: Resume) => void;
  clearSelectedResume: () => void;

  // Job input actions
  setInputMode: (mode: 'url' | 'text') => void;
  setJobUrl: (url: string) => void;
  setJobDescription: (description: string) => void;
  validateUrl: (url: string) => Promise<UrlValidationResult>;

  // Job analysis actions
  analyzeJob: () => Promise<void>;
  setEditedJobInfo: (jobInfo: JobPostingInfo) => void;

  // Claimed keywords actions (NEW - replaces clarification questions)
  addClaimedKeyword: (keyword: string, importance: 'critical' | 'important' | 'nice_to_have', userContext: string) => void;
  removeClaimedKeyword: (keyword: string) => void;
  updateClaimedKeyword: (keyword: string, updates: Partial<ClaimedKeyword>) => void;
  enhanceClaimText: (keyword: string, userContext: string) => Promise<string>;
  clearClaimedKeywords: () => void;

  // DEPRECATED: Clarification questions actions (kept for backward compatibility)
  generateQuestions: () => Promise<void>;
  setAnswer: (questionId: string, answer: string) => void;
  enhanceAnswerWithAI: (questionId: string, text: string) => Promise<string>;
  questionOptions: Map<string, string[]>;
  selectedOptions: Map<string, number>;
  generatingOptionsFor: string | null;
  generateAnswerOptions: (questionId: string) => Promise<void>;
  selectAnswerOption: (questionId: string, optionIndex: number) => void;
  clearAnswerOptions: (questionId: string) => void;

  // Tailored resume actions
  generateTailoredResume: () => Promise<void>;

  // Keyword incorporation actions
  incorporateKeyword: (keyword: string, context: string, importance: 'critical' | 'important' | 'nice_to_have') => Promise<void>;
  isIncorporatingKeyword: boolean;

  // Save actions
  setTailoredResumeTitle: (title: string) => void;
  saveTailoredResume: () => Promise<string | null>;

  // Reset
  reset: () => void;

  // Persistence helpers
  hasPersistedSession: () => boolean;
  clearPersistedState: () => void;
}

const initialState: TailoringWizardState & { _persistedAt: number | null } = {
  currentStep: 1,
  selectedResumeId: null,

  // Step 1: Job Input
  inputMode: 'text',
  jobUrl: '',
  jobDescription: '',
  urlValidation: null,
  isValidatingUrl: false,

  // Step 2: Tailoring Summary (combines analysis + keyword claiming)
  jobAnalysis: null,
  isAnalyzing: false,
  editedJobInfo: null,
  claimedKeywords: [],
  isEnhancingClaim: false,

  // DEPRECATED: Clarification Questions (kept for backward compatibility)
  questions: [],
  answers: [],
  isGeneratingQuestions: false,
  questionOptions: new Map(),
  selectedOptions: new Map(),
  generatingOptionsFor: null,

  // Step 3: Review Changes
  tailoringResult: null,
  isGeneratingTailored: false,

  // Keyword incorporation
  isIncorporatingKeyword: false,

  // Step 4: Save
  tailoredResumeTitle: '',
  isSaving: false,
  savedResumeId: null,

  // Persistence metadata
  _persistedAt: null,
};

export const useJobTailoringStore = create<JobTailoringStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      sourceResume: null,
      tailoredResume: null,

      // Navigation
      setCurrentStep: (step) => set({ currentStep: step }),

  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < 4) { // Now 4 steps instead of 5
      set({ currentStep: (currentStep + 1) as TailoringWizardStep });
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: (currentStep - 1) as TailoringWizardStep });
    }
  },

  // Resume selection
  setSelectedResume: (resume) => set({
    sourceResume: resume,
    selectedResumeId: resume.id,
    // Set default title
    tailoredResumeTitle: resume.title ? `${resume.title} - Tailored` : 'Tailored Resume'
  }),

  clearSelectedResume: () => set({
    sourceResume: null,
    selectedResumeId: null
  }),

  // Job input
  setInputMode: (mode) => set({
    inputMode: mode,
    // Clear validation when switching modes
    urlValidation: null,
  }),

  setJobUrl: (url) => set({
    jobUrl: url,
    // Clear previous validation when URL changes
    urlValidation: null,
  }),

  setJobDescription: (description) => set({ jobDescription: description }),

  validateUrl: async (url) => {
    set({ isValidatingUrl: true, urlValidation: null });

    try {
      const result = await jobTailoringService.validateJobUrl(url);

      set({
        urlValidation: result,
        isValidatingUrl: false,
        // If validation successful, also set the job description
        ...(result.hasJobContent && result.extractedContent ? {
          jobDescription: result.extractedContent.fullDescription,
        } : {})
      });

      return result;
    } catch (error) {
      const errorResult: UrlValidationResult = {
        isValid: false,
        isReachable: false,
        hasJobContent: false,
        error: {
          code: 'UNREACHABLE',
          message: 'Failed to validate URL. Please try again or paste the job description manually.'
        }
      };

      set({
        urlValidation: errorResult,
        isValidatingUrl: false,
      });

      return errorResult;
    }
  },

  // Job analysis
  analyzeJob: async () => {
    const { jobDescription, selectedResumeId, sourceResume } = get();

    if (!jobDescription || !selectedResumeId) {
      console.error('Missing job description or resume ID');
      return;
    }

    // Determine language from source resume
    const language = sourceResume?.resumeData?.language || 'en';

    set({ isAnalyzing: true });

    try {
      const analysis = await jobTailoringService.analyzeJobPosting(
        jobDescription,
        selectedResumeId,
        language
      );

      set({
        jobAnalysis: analysis,
        editedJobInfo: analysis.jobInfo,
        isAnalyzing: false,
      });
    } catch (error) {
      console.error('Error analyzing job:', error);
      set({ isAnalyzing: false });
      throw error; // Re-throw to allow component-level error handling
    }
  },

  setEditedJobInfo: (jobInfo) => set({ editedJobInfo: jobInfo }),

  // Claimed keywords actions (NEW)
  addClaimedKeyword: (keyword, importance, userContext) => {
    const { claimedKeywords } = get();
    // Check if keyword already claimed
    if (claimedKeywords.some(ck => ck.keyword.toLowerCase() === keyword.toLowerCase())) {
      return;
    }
    set({
      claimedKeywords: [...claimedKeywords, { keyword, importance, userContext }]
    });
  },

  removeClaimedKeyword: (keyword) => {
    const { claimedKeywords } = get();
    set({
      claimedKeywords: claimedKeywords.filter(ck => ck.keyword.toLowerCase() !== keyword.toLowerCase())
    });
  },

  updateClaimedKeyword: (keyword, updates) => {
    const { claimedKeywords } = get();
    set({
      claimedKeywords: claimedKeywords.map(ck =>
        ck.keyword.toLowerCase() === keyword.toLowerCase()
          ? { ...ck, ...updates }
          : ck
      )
    });
  },

  enhanceClaimText: async (keyword, userContext) => {
    const { sourceResume, editedJobInfo, jobAnalysis } = get();
    const jobInfo = editedJobInfo || jobAnalysis?.jobInfo;
    const language = sourceResume?.resumeData?.language || 'en';

    set({ isEnhancingClaim: true });

    try {
      // Use the existing enhance-answer API but with keyword-specific context
      const enhanced = await jobTailoringService.enhanceAnswer(
        userContext,
        `Enhance this description of experience with ${keyword} for a job application.`,
        `claim-${keyword}`,
        language,
        sourceResume?.id,
        `Describe your experience with ${keyword}`,
        jobInfo || undefined
      );

      // Update the claimed keyword with enhanced text
      get().updateClaimedKeyword(keyword, { enhancedContext: enhanced });

      set({ isEnhancingClaim: false });
      return enhanced;
    } catch (error) {
      console.error('Error enhancing claim text:', error);
      set({ isEnhancingClaim: false });
      throw error;
    }
  },

  clearClaimedKeywords: () => set({ claimedKeywords: [] }),

  // DEPRECATED: Clarification questions
  generateQuestions: async () => {
    const { selectedResumeId, editedJobInfo, jobAnalysis, sourceResume } = get();
    const jobInfo = editedJobInfo || jobAnalysis?.jobInfo;

    if (!selectedResumeId || !jobInfo) {
      console.error('Missing resume ID or job info');
      return;
    }

    // Determine language from source resume
    const language = sourceResume?.resumeData?.language || 'en';

    // Get suggestions from job analysis to generate targeted questions
    const suggestions = jobAnalysis?.suggestions;

    set({ isGeneratingQuestions: true });

    try {
      const questions = await jobTailoringService.generateClarificationQuestions(
        selectedResumeId,
        jobInfo,
        language,
        suggestions  // Pass analysis suggestions to generate targeted questions
      );

      // Initialize answers with empty values (hintText is shown as guidance, NOT pre-filled)
      // Map any legacy suggestedAnswer to hintText for backward compatibility
      const normalizedQuestions = questions.map(q => ({
        ...q,
        hintText: q.hintText || q.suggestedAnswer || undefined,
      }));

      const answers: ClarificationAnswer[] = normalizedQuestions.map(q => ({
        questionId: q.id,
        question: q.question,
        answer: '',
      }));

      set({
        questions: normalizedQuestions,
        answers,
        isGeneratingQuestions: false,
      });
    } catch (error) {
      console.error('Error generating questions:', error);
      set({ isGeneratingQuestions: false });
      throw error; // Re-throw to allow component-level error handling
    }
  },

  setAnswer: (questionId, answer) => {
    const { answers, questions } = get();
    const question = questions.find(q => q.id === questionId);

    const updatedAnswers = answers.map(a =>
      a.questionId === questionId
        ? { ...a, answer, question: question?.question || a.question }
        : a
    );

    // If answer doesn't exist yet, add it
    if (!answers.find(a => a.questionId === questionId)) {
      updatedAnswers.push({
        questionId,
        question: question?.question || '',
        answer,
      });
    }

    set({ answers: updatedAnswers });
  },

  enhanceAnswerWithAI: async (questionId, text) => {
    const { questions, selectedResumeId, sourceResume, editedJobInfo, jobAnalysis } = get();
    const question = questions.find(q => q.id === questionId);

    // Determine language from source resume
    const language = sourceResume?.resumeData?.language || 'en';

    // Get job info for context
    const jobInfo = editedJobInfo || jobAnalysis?.jobInfo;

    try {
      const enhanced = await jobTailoringService.enhanceAnswer(
        text,
        question?.context || '',
        questionId,
        language,
        selectedResumeId || undefined,
        question?.question,  // Pass the actual question text
        jobInfo              // Pass job posting info for context
      );

      // Update the answer in state
      get().setAnswer(questionId, enhanced);

      return enhanced;
    } catch (error) {
      console.error('Error enhancing answer:', error);
      throw error; // Re-throw to allow component-level error handling
    }
  },

  // Answer options actions
  generateAnswerOptions: async (questionId) => {
    const { questions, selectedResumeId, editedJobInfo, jobAnalysis, sourceResume } = get();
    const question = questions.find(q => q.id === questionId);
    const jobInfo = editedJobInfo || jobAnalysis?.jobInfo;

    if (!question || !selectedResumeId || !jobInfo) {
      console.error('Missing required data');
      return;
    }

    // Determine language from source resume
    const language = sourceResume?.resumeData?.language || 'en';

    set({ generatingOptionsFor: questionId });

    try {
      const options = await jobTailoringService.generateAnswerOptions(
        questionId,
        question.question,
        question.context,
        selectedResumeId,
        jobInfo,
        language
      );

      const { questionOptions } = get();
      const newOptions = new Map(questionOptions);
      newOptions.set(questionId, options);

      set({
        questionOptions: newOptions,
        generatingOptionsFor: null
      });
    } catch (error) {
      console.error('Error generating options:', error);
      set({ generatingOptionsFor: null });
      throw error; // Re-throw to allow component-level error handling
    }
  },

  selectAnswerOption: (questionId, optionIndex) => {
    const { questionOptions, selectedOptions } = get();
    const options = questionOptions.get(questionId);

    if (!options || optionIndex < 0 || optionIndex >= options.length) {
      return;
    }

    // Update selected option
    const newSelected = new Map(selectedOptions);
    newSelected.set(questionId, optionIndex);

    // Set the answer to the selected option
    get().setAnswer(questionId, options[optionIndex]);

    set({ selectedOptions: newSelected });
  },

  clearAnswerOptions: (questionId) => {
    const { questionOptions, selectedOptions } = get();

    const newOptions = new Map(questionOptions);
    newOptions.delete(questionId);

    const newSelected = new Map(selectedOptions);
    newSelected.delete(questionId);

    set({
      questionOptions: newOptions,
      selectedOptions: newSelected
    });
  },

  // Generate tailored resume
  generateTailoredResume: async () => {
    const { selectedResumeId, editedJobInfo, jobAnalysis, claimedKeywords, answers, sourceResume } = get();
    const jobInfo = editedJobInfo || jobAnalysis?.jobInfo;

    if (!selectedResumeId || !jobInfo || !sourceResume) {
      console.error('Missing required data for tailoring');
      return;
    }

    // Determine language from source resume
    const language = sourceResume?.resumeData?.language || 'en';

    // Get initial match score from job analysis for tracking improvement
    const matchScoreBefore = jobAnalysis?.matchScore || 60;
    
    // Get matching skills from initial analysis to prevent false-positive "missing" keywords
    const matchingSkills = jobAnalysis?.matchingSkills || [];

    // Convert claimed keywords to ClarificationAnswer format for backward compatibility with API
    // In the future, the API will accept claimedKeywords directly
    const answersFromClaims: ClarificationAnswer[] = claimedKeywords.map(ck => ({
      questionId: `claim-${ck.keyword}`,
      question: `Describe your experience with ${ck.keyword}`,
      answer: ck.enhancedContext || ck.userContext,
    }));

    // Combine with any legacy answers (for backward compatibility during transition)
    const combinedAnswers = [...answersFromClaims, ...answers];

    set({ isGeneratingTailored: true });

    try {
      const { tailoredResume, result } = await jobTailoringService.generateTailoredResume(
        {
          resumeId: selectedResumeId,
          jobInfo,
          answers: combinedAnswers,
          language,
          matchScoreBefore,  // Pass initial match score for improvement tracking
          matchingSkills,    // Pass matching skills from initial analysis
        },
        sourceResume
      );

      set({
        tailoredResume,
        tailoringResult: result,
        isGeneratingTailored: false,
        // Update title with company name
        tailoredResumeTitle: sourceResume.title
          ? `${sourceResume.title} - ${jobInfo.companyName}`
          : `Resume - ${jobInfo.companyName}`,
      });
    } catch (error) {
      console.error('Error generating tailored resume:', error);
      set({ isGeneratingTailored: false });
      throw error; // Re-throw to allow component-level error handling
    }
  },

  // Keyword incorporation
  isIncorporatingKeyword: false,

  incorporateKeyword: async (keyword, context, importance) => {
    const { tailoredResume, editedJobInfo, jobAnalysis, tailoringResult, sourceResume } = get();
    const jobInfo = editedJobInfo || jobAnalysis?.jobInfo;

    if (!tailoredResume || !jobInfo) {
      console.error('Missing required data for keyword incorporation');
      throw new Error('Missing tailored resume or job info');
    }

    // Determine language from source resume
    const language = sourceResume?.resumeData?.language || 'en';

    set({ isIncorporatingKeyword: true });

    try {
      const result = await jobTailoringService.incorporateKeyword({
        resumeId: sourceResume?.id || '',
        keyword,
        userContext: context,
        importance,
        language: language === 'es' ? 'es' : 'en',
        currentResume: tailoredResume,
        jobInfo,
      });

      if (result.updatedSections) {
        // Merge updated sections into the tailored resume
        const updatedResume = { ...tailoredResume };

        if (result.updatedSections.skills) {
          updatedResume.skills = result.updatedSections.skills;
        }
        if (result.updatedSections.professionalSummary) {
          updatedResume.professionalSummary = result.updatedSections.professionalSummary;
        }
        if (result.updatedSections.experience) {
          updatedResume.experience = result.updatedSections.experience;
        }

        // Update the tailoring result with the new keyword added to matched list
        // and remove it from missing lists
        let updatedTailoringResult = tailoringResult ? { ...tailoringResult } : null;
        if (updatedTailoringResult?.keywordAnalysis?.matchAnalysis) {
          const analysis = { ...updatedTailoringResult.keywordAnalysis };
          const matchAnalysis = { ...analysis.matchAnalysis };
          
          // Remove from missing lists
          matchAnalysis.missingCritical = matchAnalysis.missingCritical?.filter(
            k => k.keyword.toLowerCase() !== keyword.toLowerCase()
          ) || [];
          matchAnalysis.missingImportant = matchAnalysis.missingImportant?.filter(
            k => k.keyword.toLowerCase() !== keyword.toLowerCase()
          ) || [];
          
          // Add to matched list
          matchAnalysis.matchedList = [
            ...(matchAnalysis.matchedList || []),
            {
              keyword,
              category: 'technical', // Default category
              jobImportance: importance,
              resumeFrequency: 1,
              resumeLocations: ['Skills', 'Added via keyword incorporation'],
            }
          ];
          
          // Update counts
          matchAnalysis.matchedKeywords = matchAnalysis.matchedList.length;
          matchAnalysis.totalJobKeywords = matchAnalysis.matchedKeywords + 
            (matchAnalysis.missingCritical?.length || 0) + 
            (matchAnalysis.missingImportant?.length || 0);
          matchAnalysis.matchPercentage = matchAnalysis.totalJobKeywords > 0 
            ? Math.round((matchAnalysis.matchedKeywords / matchAnalysis.totalJobKeywords) * 100) 
            : 100;
          
          analysis.matchAnalysis = matchAnalysis;
          updatedTailoringResult.keywordAnalysis = analysis;
        }

        set({
          tailoredResume: updatedResume,
          tailoringResult: updatedTailoringResult,
          isIncorporatingKeyword: false,
        });
      } else {
        set({ isIncorporatingKeyword: false });
      }
    } catch (error) {
      console.error('Error incorporating keyword:', error);
      set({ isIncorporatingKeyword: false });
      throw error; // Re-throw to allow component-level error handling
    }
  },

  // Save
  setTailoredResumeTitle: (title) => set({ tailoredResumeTitle: title }),

  saveTailoredResume: async () => {
    const {
      selectedResumeId,
      tailoredResume,
      tailoringResult,
      editedJobInfo,
      jobAnalysis,
      answers,
      tailoredResumeTitle,
    } = get();

    const jobInfo = editedJobInfo || jobAnalysis?.jobInfo;

    if (!selectedResumeId || !tailoredResume || !jobInfo || !tailoringResult) {
      console.error('Missing required data for saving');
      return null;
    }

    set({ isSaving: true });

    try {
      const { resumeId } = await jobTailoringService.saveTailoredResume(
        selectedResumeId,
        tailoredResume,
        tailoringResult,
        jobInfo,
        answers,
        jobAnalysis?.matchScore || 0,
        tailoredResumeTitle
      );

      set({
        savedResumeId: resumeId,
        isSaving: false,
      });

      return resumeId;
    } catch (error) {
      console.error('Error saving tailored resume:', error);
      set({ isSaving: false });
      throw error; // Re-throw to allow component-level error handling
    }
  },

  // Reset
  reset: () => {
    // Clear persisted state from localStorage
    localStorage.removeItem(STORAGE_KEY);
    set({
      ...initialState,
      sourceResume: null,
      tailoredResume: null,
      claimedKeywords: [],
    });
  },

  // Persistence helpers
  hasPersistedSession: () => {
    const state = get();
    // Session is valid if: has step > 1 OR has meaningful job description, AND not expired
    const hasProgress = state.currentStep > 1 || state.jobDescription.trim().length > 50;
    const notExpired = state._persistedAt && (Date.now() - state._persistedAt) < SESSION_EXPIRY_MS;
    return hasProgress && !!notExpired;
  },

  clearPersistedState: () => {
    localStorage.removeItem(STORAGE_KEY);
  },
    }),
    {
      name: STORAGE_KEY,
      version: STORAGE_VERSION,
      storage: createJSONStorage(() => localStorage),

      // Only persist specific state - exclude loading flags
      partialize: (state) => ({
        // Persist progress data
        currentStep: state.currentStep,
        selectedResumeId: state.selectedResumeId,
        sourceResume: state.sourceResume,
        inputMode: state.inputMode,
        jobUrl: state.jobUrl,
        jobDescription: state.jobDescription,
        urlValidation: state.urlValidation,
        jobAnalysis: state.jobAnalysis,
        editedJobInfo: state.editedJobInfo,
        // NEW: Claimed keywords
        claimedKeywords: state.claimedKeywords,
        // DEPRECATED: Questions (kept for backward compatibility)
        questions: state.questions,
        answers: state.answers,
        tailoredResume: state.tailoredResume,
        tailoringResult: state.tailoringResult,
        tailoredResumeTitle: state.tailoredResumeTitle,

        // Convert Maps to arrays for JSON serialization
        questionOptions: Array.from(state.questionOptions.entries()),
        selectedOptions: Array.from(state.selectedOptions.entries()),

        // Timestamp for expiry check
        _persistedAt: Date.now(),

        // DO NOT persist loading flags:
        // - isValidatingUrl
        // - isAnalyzing  
        // - isGeneratingQuestions
        // - generatingOptionsFor
        // - isGeneratingTailored
        // - isEnhancingClaim
        // - isSaving
        // - savedResumeId (only set after successful save)
      }),

      // Handle rehydration and Map deserialization
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Error rehydrating job tailoring state:', error);
          // Clear corrupted storage
          localStorage.removeItem(STORAGE_KEY);
          return;
        }

        if (state) {
          // Convert arrays back to Maps
          if (Array.isArray(state.questionOptions)) {
            state.questionOptions = new Map(state.questionOptions as [string, string[]][]);
          } else if (!state.questionOptions) {
            state.questionOptions = new Map();
          }
          
          if (Array.isArray(state.selectedOptions)) {
            state.selectedOptions = new Map(state.selectedOptions as [string, number][]);
          } else if (!state.selectedOptions) {
            state.selectedOptions = new Map();
          }

          // Initialize claimedKeywords if not present
          if (!state.claimedKeywords) {
            state.claimedKeywords = [];
          }

          // Initialize isEnhancingClaim to false (loading state shouldn't persist)
          state.isEnhancingClaim = false;

          // Check for expired session
          if (state._persistedAt && (Date.now() - state._persistedAt) > SESSION_EXPIRY_MS) {
            console.log('Job tailoring session expired, clearing...');
            localStorage.removeItem(STORAGE_KEY);
            // State will be reset to initial on next access
          }
        }
      },

      // Version migration handler
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migration from version 0 to 1: add _persistedAt
          return {
            ...persistedState,
            _persistedAt: Date.now(),
          };
        }
        return persistedState;
      },
    }
  )
);

export default useJobTailoringStore;

