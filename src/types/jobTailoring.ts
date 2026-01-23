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
  hintText?: string;          // NEW: Separate hint text for display (not pre-filled)
  suggestedAnswer?: string;  // DEPRECATED: Kept for backward compatibility
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
  answerId?: string;        // Which question's answer drove this change
}

// ATS Breakdown Types
export interface ATSCategoryItem {
  item: string;           // e.g., "JavaScript" or "5+ years experience"
  found: boolean;         // Whether it was found in resume
  location?: string;      // Where it was found (e.g., "Skills section")
}

export interface ATSCategory {
  name: string;           // e.g., "Keyword Optimization"
  score: number;          // 0-100
  maxScore: number;       // Always 100
  weight: number;         // Percentage weight in overall score
  status: 'excellent' | 'good' | 'needs_improvement' | 'poor';
  details: string;        // Explanation of the score
  items?: ATSCategoryItem[];  // Specific items checked
}

export interface ATSBreakdown {
  overallScore: number;  // 0-100
  categories: ATSCategory[];
  recommendations: string[];  // Any remaining improvements
}

// Keyword Analysis Types
export interface KeywordItem {
  keyword: string;
  frequency: number;           // How many times it appears
  locations: string[];         // Where it appears (e.g., "Skills", "Experience #1")
  importance?: 'critical' | 'important' | 'nice_to_have';  // For job keywords
}

export interface CategorizedKeywords {
  technical: KeywordItem[];      // Programming languages, frameworks, tools
  softSkills: KeywordItem[];     // Leadership, communication, teamwork
  industry: KeywordItem[];       // Domain-specific terms (healthcare, finance, etc.)
  certifications: KeywordItem[]; // Certifications and qualifications
  methodologies: KeywordItem[];  // Agile, Scrum, Waterfall, etc.
  tools: KeywordItem[];          // Software, platforms, systems
  experience: KeywordItem[];     // Years of experience, seniority levels
}

export interface KeywordMatch {
  keyword: string;
  category: string;
  jobImportance: 'critical' | 'important' | 'nice_to_have';
  resumeFrequency: number;
  resumeLocations: string[];
}

export interface KeywordMatchAnalysis {
  totalJobKeywords: number;
  matchedKeywords: number;
  matchPercentage: number;
  
  matchedList: KeywordMatch[];      // Keywords found in both
  missingCritical: KeywordItem[];   // Critical job keywords NOT in resume
  missingImportant: KeywordItem[];  // Important job keywords NOT in resume
  extraResumeKeywords: KeywordItem[]; // Resume keywords not in job (may still be valuable)
}

export interface KeywordAnalysis {
  resumeKeywords: CategorizedKeywords;    // Keywords found in the tailored resume
  jobKeywords: CategorizedKeywords;        // Keywords required by the job
  matchAnalysis: KeywordMatchAnalysis;     // Comparison analysis
}

// Answer Incorporation Tracking
export interface AnswerIncorporation {
  questionId: string;
  usedInSection: string;
  changeIndex: number;
}

export interface TailoringResult {
  originalResumeId: string;
  changes: ResumeChange[];
  atsScoreBefore: number;
  atsScoreAfter: number;
  matchScoreBefore: number;  // Initial match score from analysis
  matchScoreAfter: number;   // Recalculated match score after tailoring
  grammarCorrections: {
    original: string;
    corrected: string;
    location: string;
  }[];
  keywordOptimizations: string[];
  answersIncorporated: AnswerIncorporation[];  // Track which answers were used
  atsBreakdown: ATSBreakdown;                   // Detailed ATS breakdown by category
  keywordAnalysis: KeywordAnalysis;             // Comprehensive keyword analysis
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

  // Answer options (NEW)
  questionOptions: Map<string, string[]>; // questionId -> array of 3 options
  selectedOptions: Map<string, number>;   // questionId -> selected index
  generatingOptionsFor: string | null;    // questionId currently generating

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
  matchScoreBefore: number;       // Initial match score from job analysis
  matchingSkills?: string[];      // Skills already identified as matching in initial analysis
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

