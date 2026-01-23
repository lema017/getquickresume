import { create } from 'zustand';
import {
  TailoringWizardState,
  TailoringWizardStep,
  UrlValidationResult,
  JobPostingInfo,
  JobAnalysisResult,
  ClarificationQuestion,
  ClarificationAnswer,
  TailoringResult,
} from '@/types/jobTailoring';
import { Resume, GeneratedResume } from '@/types';
import { jobTailoringService } from '@/services/jobTailoringService';

interface JobTailoringStore extends TailoringWizardState {
  // Source resume
  sourceResume: Resume | null;

  // Generated tailored resume
  tailoredResume: GeneratedResume | null;

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

  // Clarification questions actions
  generateQuestions: () => Promise<void>;
  setAnswer: (questionId: string, answer: string) => void;
  enhanceAnswerWithAI: (questionId: string, text: string) => Promise<string>;

  // Answer options actions (NEW)
  questionOptions: Map<string, string[]>; // questionId -> array of 3 options
  selectedOptions: Map<string, number>;   // questionId -> selected index
  generatingOptionsFor: string | null;    // questionId currently generating
  generateAnswerOptions: (questionId: string) => Promise<void>;
  selectAnswerOption: (questionId: string, optionIndex: number) => void;
  clearAnswerOptions: (questionId: string) => void;

  // Tailored resume actions
  generateTailoredResume: () => Promise<void>;

  // Save actions
  setTailoredResumeTitle: (title: string) => void;
  saveTailoredResume: () => Promise<string | null>;

  // Reset
  reset: () => void;
}

const initialState: TailoringWizardState = {
  currentStep: 1,
  selectedResumeId: null,

  // Step 1
  inputMode: 'text',
  jobUrl: '',
  jobDescription: '',
  urlValidation: null,
  isValidatingUrl: false,

  // Step 2
  jobAnalysis: null,
  isAnalyzing: false,
  editedJobInfo: null,

  // Step 3
  questions: [],
  answers: [],
  isGeneratingQuestions: false,

  // Answer options (NEW)
  questionOptions: new Map(),
  selectedOptions: new Map(),
  generatingOptionsFor: null,

  // Step 4
  tailoringResult: null,
  isGeneratingTailored: false,

  // Step 5
  tailoredResumeTitle: '',
  isSaving: false,
  savedResumeId: null,
};

export const useJobTailoringStore = create<JobTailoringStore>((set, get) => ({
  ...initialState,
  sourceResume: null,
  tailoredResume: null,

  // Navigation
  setCurrentStep: (step) => set({ currentStep: step }),

  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < 5) {
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
    }
  },

  setEditedJobInfo: (jobInfo) => set({ editedJobInfo: jobInfo }),

  // Clarification questions
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
      return text;
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
    const { selectedResumeId, editedJobInfo, jobAnalysis, answers, sourceResume } = get();
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

    set({ isGeneratingTailored: true });

    try {
      const { tailoredResume, result } = await jobTailoringService.generateTailoredResume(
        {
          resumeId: selectedResumeId,
          jobInfo,
          answers,
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
      return null;
    }
  },

  // Reset
  reset: () => set({
    ...initialState,
    sourceResume: null,
    tailoredResume: null,
  }),
}));

export default useJobTailoringStore;

