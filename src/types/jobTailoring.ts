// Job Tailoring Types
import { GeneratedResume } from '@/types';

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

// Job Analysis Result (Enhanced with ATS breakdown and keyword analysis)
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
  // NEW fields for Tailoring Summary page
  atsBreakdown: ATSBreakdown;           // Detailed ATS analysis
  keywordAnalysis: KeywordAnalysis;     // Comprehensive keyword analysis
  strengths: string[];                  // Resume strengths for this position
  weaknesses: string[];                 // Resume weaknesses/gaps
}

// Claimed Keyword - when user claims to have experience with a missing keyword
export interface ClaimedKeyword {
  keyword: string;
  importance: 'critical' | 'important' | 'nice_to_have';
  userContext: string;        // User's description of their experience
  enhancedContext?: string;   // AI-enhanced version
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
  missingNiceToHave?: KeywordItem[]; // Nice-to-have job keywords NOT in resume
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

// Wizard State Types - Now 4 steps instead of 5
// Flow: 1. Job Input -> 2. Tailoring Summary (NEW) -> 3. Review Changes -> 4. Save
export type TailoringWizardStep = 1 | 2 | 3 | 4;

export interface TailoringWizardState {
  currentStep: TailoringWizardStep;
  selectedResumeId: string | null;

  // Step 1: Job Input
  inputMode: 'url' | 'text';
  jobUrl: string;
  jobDescription: string;
  urlValidation: UrlValidationResult | null;
  isValidatingUrl: boolean;

  // Step 2: Tailoring Summary (combines Job Analysis + replaces Clarification Questions)
  jobAnalysis: JobAnalysisResult | null;
  isAnalyzing: boolean;
  editedJobInfo: JobPostingInfo | null;
  // Claimed keywords (user claims to have experience with missing keywords)
  claimedKeywords: ClaimedKeyword[];
  isEnhancingClaim: boolean;  // Loading state for AI enhancement of claim text

  // DEPRECATED: Clarification Questions (kept for backward compatibility during transition)
  questions: ClarificationQuestion[];
  answers: ClarificationAnswer[];
  isGeneratingQuestions: boolean;
  questionOptions: Map<string, string[]>;
  selectedOptions: Map<string, number>;
  generatingOptionsFor: string | null;

  // Step 3: Review Changes
  tailoringResult: TailoringResult | null;
  isGeneratingTailored: boolean;

  // Keyword incorporation
  isIncorporatingKeyword: boolean;

  // Step 4: Save
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
  language?: string;              // Accepts any language, normalized by service for API
  matchScoreBefore: number;       // Initial match score from job analysis
  matchingSkills?: string[];      // Skills already identified as matching in initial analysis
}

export interface EnhanceAnswerRequest {
  text: string;
  context: string;
  questionId: string;
  language?: string;              // Accepts any language, normalized by service for API
}

// Premium/Rate Limiting
export interface TailoringLimits {
  used: number;
  limit: number;
  resetDate?: string;
  isPremium: boolean;
}

// Incorporate Keyword Types
export interface IncorporateKeywordRequest {
  resumeId: string;            // The tailored resume being edited
  keyword: string;             // The keyword to incorporate
  userContext: string;         // User's brief description of their experience
  importance: 'critical' | 'important' | 'nice_to_have';
  language: 'en' | 'es';
  currentResume: GeneratedResume;  // Current state of tailored resume
  jobInfo: JobPostingInfo;     // Job context for better incorporation
}

export interface IncorporateKeywordResponse {
  success: boolean;
  data?: {
    updatedSections: {
      skills?: GeneratedResume['skills'];
      professionalSummary?: string;
      experience?: GeneratedResume['experience'];
    };
    changesSummary: string[];  // e.g., ["Added AWS to Technical Skills", "Updated summary to mention cloud experience"]
  };
  error?: string;
  code?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}


