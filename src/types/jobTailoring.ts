// Job Tailoring Types

// URL Validation Types
export interface UrlValidationResult {
  isValid: boolean;           // URL format is valid
  isReachable: boolean;       // URL was accessible
  hasJobContent: boolean;     // Content appears to be a job posting
  jobBoardName?: string;      // Name of detected job board
  extractedContent?: {
    title: string;
    company: string;
    snippet: string;          // First 200 chars of description
    fullDescription: string;  // Complete job description
  };
  error?: {
    code: 'INVALID_FORMAT' | 'UNREACHABLE' | 'NOT_JOB_POSTING' | 'BLOCKED' | 'EXTRACTION_FAILED' | 'RATE_LIMIT';
    message: string;
  };
}

// Supported job board domains (for better extraction)
export const SUPPORTED_DOMAINS = [
  'linkedin.com/jobs',
  'indeed.com',
  'glassdoor.com',
  'monster.com',
  'ziprecruiter.com',
  'greenhouse.io',
  'lever.co',
  'workday.com',
  'jobs.lever.co',
  'boards.greenhouse.io'
] as const;

// Job Posting Information
export interface JobPostingInfo {
  companyName: string;
  jobTitle: string;
  location?: string;
  description: string;
  url?: string;
  requirements: string[];
  keywords: string[];
  salary?: string;
  employmentType?: string;
}

// Job Analysis Result
export interface JobAnalysisResult {
  jobInfo: JobPostingInfo;
  matchScore: number;        // 0-100 percentage
  matchingSkills: string[];
  missingSkills: string[];
  keywordMatches: {
    keyword: string;
    found: boolean;
    context?: string;
  }[];
  suggestions: string[];
}

// Clarification Question Types
export interface ClarificationQuestion {
  id: string;
  question: string;
  context: string;           // Why this question is being asked
  type: 'text' | 'textarea' | 'select';
  required: boolean;
  suggestedAnswer?: string;  // AI-suggested answer from resume data
  options?: string[];        // For select type
  relatedSkill?: string;     // The skill/requirement this relates to
}

export interface ClarificationAnswer {
  questionId: string;
  question: string;
  answer: string;
}

// Resume Changes/Diff Types
export interface ResumeChange {
  section: 'summary' | 'experience' | 'skills' | 'education' | 'projects' | 'achievements';
  sectionIndex?: number;     // For arrays like experience
  fieldName?: string;
  originalValue: string;
  newValue: string;
  changeType: 'added' | 'modified' | 'removed' | 'enhanced';
  reason: string;           // Why this change was made
}

export interface TailoringResult {
  originalResumeId: string;
  changes: ResumeChange[];
  atsScoreBefore: number;
  atsScoreAfter: number;
  grammarCorrections: {
    original: string;
    corrected: string;
    location: string;
  }[];
  keywordOptimizations: string[];
}

// Tailored Resume Metadata (extends Resume)
export interface TailoredResumeMetadata {
  isTailored: true;
  sourceResumeId: string;
  jobPosting: JobPostingInfo;
  clarificationAnswers: ClarificationAnswer[];
  matchScore: number;
  tailoringResult?: TailoringResult;
  createdAt: string;
}

// Wizard State Types
export type TailoringWizardStep = 1 | 2 | 3 | 4 | 5;

export interface TailoringWizardState {
  currentStep: TailoringWizardStep;
  selectedResumeId: string | null;
  
  // Step 1: Job Input
  inputMode: 'url' | 'text';
  jobUrl: string;
  jobDescription: string;
  urlValidation: UrlValidationResult | null;
  isValidatingUrl: boolean;
  
  // Step 2: Job Analysis
  jobAnalysis: JobAnalysisResult | null;
  isAnalyzing: boolean;
  editedJobInfo: JobPostingInfo | null;
  
  // Step 3: Clarification Questions
  questions: ClarificationQuestion[];
  answers: ClarificationAnswer[];
  isGeneratingQuestions: boolean;
  
  // Step 4: Review Changes
  tailoringResult: TailoringResult | null;
  isGeneratingTailored: boolean;
  
  // Step 5: Save
  tailoredResumeTitle: string;
  isSaving: boolean;
  savedResumeId: string | null;
}

// Service Request/Response Types
export interface AnalyzeJobRequest {
  description: string;
  resumeId: string;
}

export interface GenerateQuestionsRequest {
  resumeId: string;
  jobInfo: JobPostingInfo;
}

export interface GenerateTailoredResumeRequest {
  resumeId: string;
  jobInfo: JobPostingInfo;
  answers: ClarificationAnswer[];
  language?: 'en' | 'es';
}

export interface EnhanceAnswerRequest {
  text: string;
  context: string;
  questionId: string;
  language: 'en' | 'es';
}

// Premium/Rate Limiting
export interface TailoringLimits {
  used: number;
  limit: number;
  resetDate?: string;
  isPremium: boolean;
}

