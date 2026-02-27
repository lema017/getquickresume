// User and Authentication Types for API
// AI Usage Statistics for tracking costs
export interface AIUsageStats {
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCostUSD: number;
  totalAICalls: number;
  lastAICallAt: string;
  monthlyStats: {
    month: string;  // YYYY-MM
    inputTokens: number;
    outputTokens: number;
    costUSD: number;
    callCount: number;
  };
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  avatarUrl?: string;
  city?: string;
  country?: string;
  location?: string;
  linkedin?: string;
  targetFunction?: string;
  profession?: string;
  provider: 'google' | 'facebook' | 'linkedin';
  isPremium: boolean;
  freeResumeUsed: boolean;
  premiumResumeCount: number;
  premiumResumeMonth: string; // YYYY-MM format
  freeDownloadUsed: boolean; // Tracks if free user used their 1 free download
  totalDownloads: number; // Tracks total downloads for analytics
  // Cover letter tracking
  freeCoverLetterUsed: boolean; // Free user lifetime limit (1 cover letter)
  premiumCoverLetterCount: number; // Monthly count for premium users
  premiumCoverLetterMonth: string; // YYYY-MM format for monthly reset
  subscriptionExpiration?: string; // ISO date
  planType?: 'monthly' | 'yearly';
  subscriptionStartDate?: string; // ISO date
  // Payment provider fields (generic for PayPal or other providers)
  paymentProvider?: 'paypal' | 'stripe' | 'other';
  paymentCustomerId?: string;
  paymentSubscriptionId?: string;
  paymentTransactionId?: string;
  aiUsageStats?: AIUsageStats; // AI usage tracking for cost analysis
  // Job Tailoring usage tracking
  jobTailoringUsage?: {
    totalUsed: number;           // For free users (lifetime count)
    monthlyUsed: number;         // For premium users (monthly count)
    currentMonth: string;        // "YYYY-MM" format for monthly reset
    lastTailoredAt?: string;     // ISO timestamp of last tailoring
  };
  createdAt: string;
  updatedAt: string;
}

export interface GoogleUserInfo {
  sub: string;
  email: string;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
  email_verified: boolean;
}

export interface JWTPayload {
  userId: string;
  email: string;
  isPremium: boolean;
  iat?: number;
  exp?: number;
}

export interface AuthorizerContext {
  userId: string;
  email: string;
}

export interface AuthorizedEvent {
  requestContext: {
    authorizer: AuthorizerContext;
  };
}

// Pagination Types
export interface SkillPageRange {
  startIndex: number;
  endIndex: number;
  pageNumber: number;
}

// Resume Generation Types
export interface ResumeData {
  // Step 1: Professional Profile
  firstName: string;
  lastName: string;
  country: string;
  linkedin: string;
  language: 'en' | 'es' | 'zh' | 'hi' | 'fr' | 'ar' | 'bn' | 'pt' | 'ru' | 'ja';
  targetLevel: 'entry' | 'mid' | 'senior' | 'executive';
  profession: string;
  tone: 'professional' | 'creative' | 'technical' | 'friendly';
  phone: string;
  email: string;
  
  // Step 2: Skills (including tools)
  skillsRaw: string[];
  
  // Step 3: Work Experience
  experience: WorkExperience[];
  
  // Step 4: Education and Certifications
  education: Education[];
  certifications: Certification[];
  
  // Step 5: Projects and Languages
  projects: Project[];
  languages: Language[];
  
  // Step 6: Key Achievements
  achievements: Achievement[];
  
  // Step 7: Professional Summary
  summary: string;
  jobDescription: string;
  
  // Metadata
  completedSteps: number[];
  currentStep: number;
  totalCharacters: number;
  lastSaved: string;
  
  // Pagination fields - all default to null, calculated in step 9
  firstNamePageNumber: number | null;
  lastNamePageNumber: number | null;
  countryPageNumber: number | null;
  linkedinPageNumber: number | null;
  languagePageNumber: number | null;
  targetLevelPageNumber: number | null;
  professionPageNumber: number | null;
  tonePageNumber: number | null;
  phonePageNumber: number | null;
  emailPageNumber: number | null;
  summaryPageNumber: number | null;
  jobDescriptionPageNumber: number | null;
  skillsPagination: SkillPageRange[] | null;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  achievements: string[];
  responsibilities: string[];
  pageNumber: number | null;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  isCompleted: boolean;
  gpa?: string;
  pageNumber: number | null;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  pageNumber: number | null;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  startDate: string;
  endDate?: string;
  isOngoing: boolean;
  pageNumber: number | null;
}

export interface Language {
  id: string;
  name: string;
  level: 'basic' | 'intermediate' | 'advanced' | 'native';
  pageNumber: number | null;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  pageNumber: number | null;
}

// AI Generated Resume Types
export interface GenerateResumeRequest {
  resumeData: ResumeData;
  resumeId?: string;
}

export interface GeneratedResume {
  professionalSummary: string;
  experience: EnhancedExperience[];
  education: EnhancedEducation[];
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  projects: EnhancedProject[];
  certifications: EnhancedCertification[];
  achievements: string[];
  languages: LanguageProficiency[];
  contactInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
  };
  metadata: {
    generatedAt: string;
    tokensUsed: number;
    aiProvider: string;
    model: string;
  };
}

export interface EnhancedExperience {
  title: string;
  company: string;
  duration: string;
  location?: string;
  description: string;
  achievements: string[];
  skills: string[];
  impact: string[];
}

export interface EnhancedEducation {
  degree: string;
  institution: string;
  field: string;
  duration: string;
  gpa?: string;
  relevantCoursework?: string[];
  honors?: string[];
}

export interface EnhancedProject {
  name: string;
  description: string;
  technologies: string[];
  duration: string;
  url?: string;
  achievements: string[];
  impact: string;
}

export interface EnhancedCertification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  skills: string[];
}

export interface LanguageProficiency {
  language: string;
  level: string;
  certifications?: string[];
}

// Resume Scoring Types - Deterministic Checklist System
export type ChecklistItemPriority = 'required' | 'recommended' | 'optional';

export interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  isCompleted: boolean;
  completedAt?: string;
  priority: ChecklistItemPriority;
  verifierId: string;
  details?: string;
  evidence?: string;
}

export interface SectionChecklist {
    section: string;
  displayName: string;
  items: ChecklistItem[];
  completedCount: number;
  totalCount: number;
  requiredCount: number;
  requiredCompletedCount: number;
  maxPoints: number;
  earnedPoints: number;
}

export interface EnhancementRecord {
  id: string;
  checklistItemId: string;
  section: string;
  enhancedAt: string;
  previousValue?: string;
  newValue?: string;
}

// Keyword Analysis Data for ATS scoring
export interface KeywordAnalysisData {
  totalKeywordsFound: number;
  hardSkills: string[];
  softSkills: string[];
  actionVerbs: string[];
  industryTerms: string[];
  atsScore: 'excellent' | 'good' | 'fair' | 'needs-work';
  scoreValue: number;
  tierLabel: string;
  breakdown: string;
}

export interface ResumeScore {
  totalScore: number;  // 0-10 scale
  maxPossibleScore: number;  // 10.0
  completionPercentage: number;  // 0-100%
  isOptimized: boolean;  // True when all required items complete and score >= 8
  
  // Legacy breakdown for backward compatibility (now includes ATS)
  breakdown: Record<string, number>;
  
  // New deterministic checklist system
  checklist: Record<string, SectionChecklist>;
  enhancementHistory: EnhancementRecord[];
  
  // ATS keyword analysis (AI-powered)
  keywordAnalysis?: KeywordAnalysisData;
  
  strengths: string[];  // Auto-generated from completed items
  improvements: string[];  // Auto-generated from incomplete items (prioritized)
  improvementHints?: string[];  // High-level hints for free users (vague, no specific details)
  
  generatedAt: string;
  scoringVersion: string;  // Version of scoring algorithm
  
  // Legacy fields (deprecated)
  aiProvider?: string;
  model?: string;
}

export interface ScoreResumeResponse {
  success: boolean;
  data?: ResumeScore;
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
  isExistingScore?: boolean; // True if returning cached score (for free users)
}

// Resume AI Cost tracking for analytics
export interface ResumeAICost {
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCostUSD: number;
  callBreakdown: {
    generation: number;
    scoring: number;
    suggestions: number;
    enhancements: number;
    linkedInParsing: number;
    translation: number;
  };
}

// Resume Management Types
export interface Resume {
  id: string;
  userId: string;
  title: string;
  resumeData: ResumeData;
  generatedResume?: GeneratedResume;
  score?: ResumeScore;  // Stored score object
  scoreGeneratedAt?: string;  // ISO timestamp
  scoreVersion?: string;  // Version of scoring algorithm
  status: 'draft' | 'generated' | 'optimized';
  shareToken?: string;        // Unique public share token
  isPubliclyShared: boolean;  // Toggle for public visibility
  shareCreatedAt?: string;    // When sharing was enabled
  aiCost?: ResumeAICost;      // AI usage cost tracking for this resume
  // Job Tailoring metadata (for tailored resumes)
  isTailored?: boolean;
  tailoringMetadata?: TailoredResumeMetadata;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// Job Tailoring Types
// ============================================================================

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
  // NEW fields for enhanced Tailoring Summary page
  atsBreakdown: ATSBreakdown;           // Detailed ATS analysis
  keywordAnalysis: KeywordAnalysis;     // Comprehensive keyword analysis
  strengths: string[];                  // Resume strengths for this position
  weaknesses: string[];                 // Resume weaknesses/gaps
}

export interface ClarificationQuestion {
  id: string;
  question: string;
  context: string;
  type: 'text' | 'textarea' | 'select';
  required: boolean;
  hintText?: string;          // Hint text shown to guide the user (not pre-filled)
  suggestedAnswer?: string;   // DEPRECATED: Use hintText instead
  options?: string[];
  relatedSkill?: string;
}

export interface ClarificationAnswer {
  questionId: string;
  question: string;
  answer: string;
}

// Claimed Keyword - when user claims to have experience with a missing keyword
export interface ClaimedKeyword {
  keyword: string;
  importance: 'critical' | 'important' | 'nice_to_have';
  userContext: string;        // User's description of their experience
  enhancedContext?: string;   // AI-enhanced version
}

export interface ResumeChange {
  section: 'summary' | 'experience' | 'skills' | 'education' | 'projects' | 'achievements';
  sectionIndex?: number;
  fieldName?: string;
  originalValue: string;
  newValue: string;
  changeType: 'added' | 'modified' | 'removed' | 'enhanced';
  reason: string;
  answerId?: string;  // Which question's answer drove this change
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

export interface TailoredResumeMetadata {
  isTailored: true;
  sourceResumeId: string;
  jobPosting: JobPostingInfo;
  clarificationAnswers: ClarificationAnswer[];
  matchScore: number;
  tailoringResult?: TailoringResult;
  createdAt: string;
}

export interface TailoringLimits {
  used: number;
  limit: number;
  resetDate?: string;
  isPremium: boolean;
}

// Job Tailoring API Request/Response Types
export interface AnalyzeJobRequest {
  resumeId: string;
  description: string;
  language: 'en' | 'es';
}

export interface AnalyzeJobResponse {
  success: boolean;
  data?: JobAnalysisResult;
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

export interface GenerateQuestionsRequest {
  resumeId: string;
  jobInfo: JobPostingInfo;
  language: 'en' | 'es';
  suggestions?: string[];  // Analysis suggestions to base questions on
}

export interface GenerateQuestionsResponse {
  success: boolean;
  data?: ClarificationQuestion[];
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

export interface EnhanceAnswerRequest {
  text: string;
  context: string;
  questionId: string;
  language: 'en' | 'es';
  resumeId?: string;
  question?: string;
  jobInfo?: JobPostingInfo;
}

export interface EnhanceAnswerResponse {
  success: boolean;
  data?: string;
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

export interface GenerateTailoredResumeRequest {
  resumeId: string;
  jobInfo: JobPostingInfo;
  answers?: ClarificationAnswer[];          // Legacy: clarification answers (optional for backward compatibility)
  claimedKeywords?: ClaimedKeyword[];       // NEW: claimed keywords from Tailoring Summary page
  language: 'en' | 'es';
  matchScoreBefore: number;       // Initial match score from job analysis
  matchingSkills?: string[];      // Skills already identified as matching in initial analysis
}

export interface GenerateTailoredResumeResponse {
  success: boolean;
  data?: {
    tailoredResume: GeneratedResume;
    result: TailoringResult;
  };
  error?: string;
  code?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

export interface SaveTailoredResumeRequest {
  sourceResumeId: string;
  tailoredResume: GeneratedResume;
  tailoringResult: TailoringResult;
  jobInfo: JobPostingInfo;
  answers: ClarificationAnswer[];
  matchScore: number;
  title: string;
}

export interface SaveTailoredResumeResponse {
  success: boolean;
  resumeId?: string;
  error?: string;
  message?: string;
}

export interface TailoringLimitsResponse {
  success: boolean;
  data?: TailoringLimits;
  error?: string;
  message?: string;
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


// API Response Types
export interface GenerateResumeResponse {
  success: boolean;
  data?: GeneratedResume;
  error?: string;
  message?: string;
  tokensUsed?: number;
  resumeId?: string;
  remainingRequests?: number;
  resetTime?: number;
  score?: ResumeScore;  // Score is now included synchronously
}

export interface ResumeListResponse {
  success: boolean;
  data?: Resume[];
  error?: string;
  message?: string;
}

export interface ResumeResponse {
  success: boolean;
  data?: Resume;
  error?: string;
  message?: string;
}


// Profession Suggestions Types
export interface ProfessionSuggestion {
  profession: string;
  suggestions: {
    es: {
      skills: string[];
    };
    en: {
      skills: string[];
    };
  };
  createdAt: string;
  updatedAt: string;
  generatedBy: 'ai' | 'manual';
}

export interface SuggestionsResponse {
  success: boolean;
  data?: {
    skills: string[];
  };
  fromCache: boolean;
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

// Achievement Suggestions Types
export interface AchievementSuggestionRequest {
  profession: string;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
  language: 'es' | 'en';
  resumeId?: string; // Optional resume ID for AI usage tracking
}

export interface AchievementSuggestionResponse {
  success: boolean;
  data?: Array<{
    title: string;
    description: string;
  }>;
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

// Summary Suggestions Types
export interface SummarySuggestionRequest {
  profession: string;
  achievements: string[]; // Solo texto de logros
  projectDescriptions: string[]; // Descripciones de proyectos
  language: 'es' | 'en';
  type: 'experience' | 'differentiators'; // Tipo de sugerencia
  resumeId?: string; // Optional resume ID for AI usage tracking
}

export interface SummarySuggestionResponse {
  success: boolean;
  data?: string[]; // Array de 3 sugerencias
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

// Job Title Achievement Suggestions Types
export interface JobTitleAchievementSuggestion {
  jobTitle: string;
  achievements: string[];
  language: 'es' | 'en';
  createdAt: string;
  updatedAt: string;
}

export interface JobTitleAchievementsRequest {
  jobTitle: string;
  language: 'es' | 'en';
  resumeId?: string; // Optional resume ID for AI usage tracking
}

export interface JobTitleAchievementsResponse {
  success: boolean;
  data?: string[]; // Array de 3 sugerencias máximo
  fromCache: boolean;
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

// AI Text Enhancement Types
export interface EnhanceTextRequest {
  context: 'achievement' | 'summary' | 'project' | 'responsibility' | 'differentiators';
  text: string;
  language: 'es' | 'en';
  jobTitle?: string;
  resumeId?: string; // Optional resume ID for AI usage tracking
}

export interface EnhanceTextResponse {
  success: boolean;
  data?: string; // Texto mejorado
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

// AI Section Improvement Types
export interface ImproveSectionRequest {
  sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
  originalText: string;
  userInstructions: string;
  language: 'es' | 'en';
  resumeId?: string; // Optional resume ID for AI usage tracking
  autoEnhance?: boolean; // If true, use automatic enhancement prompts instead of user instructions
  gatheredContext?: Array<{
    questionId: string;
    answer: string;
  }>;
}

export interface ImproveSectionResponse {
  success: boolean;
  data?: string; // Texto mejorado
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

// LinkedIn Import Types
export interface LinkedInImportRequest {
  url?: string; // Para import por URL
}

export interface LinkedInImportResponse {
  success: boolean;
  data?: Partial<ResumeData>;
  error?: string;
}

// LinkedIn Data Wizard Types
export interface LinkedInDataRequest {
  profession: string;
  about: string;
  experience: string;
  education: string;
  certifications?: string;
  projects?: string;
  skills?: string;
  recommendations?: string;
  targetLanguage?: 'es' | 'en';
}

export interface LinkedInDataResponse {
  success: boolean;
  resumeId?: string;  // Cambiado de 'data?: Partial<ResumeData>'
  message?: string;
  error?: string;
  remainingRequests?: number;
  resetTime?: number;
}

// ============================================================================
// Cover Letter Types
// ============================================================================

export type CoverLetterTone = 'professional' | 'friendly' | 'confident' | 'creative';
export type CoverLetterLength = 'concise' | 'standard' | 'detailed';
export type CoverLetterTemplate = 'classic' | 'modern' | 'minimal' | 'creative';

export interface CoverLetterParagraph {
  id: string;
  type: 'greeting' | 'opening' | 'body' | 'skills' | 'closing' | 'signature';
  content: string;
}

// Resume context for AI-powered cover letter generation
export interface ResumeContext {
  profession?: string;
  skills?: string[];
  experienceSummary?: string; // Condensed work history
  summary?: string; // Professional summary from resume
  achievements?: string[]; // Key achievements from resume
}

export interface CoverLetterData {
  // Source
  sourceResumeId?: string;
  resumeContext?: ResumeContext; // Rich context from selected resume
  
  // Company & Job Details
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  hiringManagerName?: string;
  
  // Personal Touch
  whyThisCompany?: string;
  keyAchievement?: string;
  
  // User Info (from resume or manual input)
  fullName: string;
  email: string;
  phone?: string;
  linkedin?: string;
  
  // Tone & Style
  tone: CoverLetterTone;
  length: CoverLetterLength;
  template: CoverLetterTemplate;
  
  // Language for AI output
  language?: 'en' | 'es';
}

export interface GeneratedCoverLetter {
  id: string;
  paragraphs: CoverLetterParagraph[];
  createdAt: string;
  updatedAt: string;
}

export interface CoverLetter {
  id: string;
  userId: string;
  title: string;
  data: CoverLetterData;
  generatedContent?: GeneratedCoverLetter;
  status: 'draft' | 'generated' | 'saved';
  aiCost?: {
    totalInputTokens: number;
    totalOutputTokens: number;
    totalCostUSD: number;
  };
  createdAt: string;
  updatedAt: string;
}

// Cover Letter API Request/Response Types
export interface GenerateCoverLetterRequest {
  data: CoverLetterData;
  coverLetterId?: string; // Optional: for regenerating existing
}

export interface GenerateCoverLetterResponse {
  success: boolean;
  data?: GeneratedCoverLetter;
  coverLetterId?: string;
  error?: string;
  code?: string; // e.g., 'PREMIUM_REQUIRED'
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

export interface RegenerateParagraphRequest {
  paragraphType: CoverLetterParagraph['type'];
  data: CoverLetterData;
}

export interface RegenerateParagraphResponse {
  success: boolean;
  data?: string; // New paragraph content
  error?: string;
  code?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

export interface CoverLetterListResponse {
  success: boolean;
  data?: CoverLetter[];
  error?: string;
  message?: string;
}

export interface CoverLetterResponse {
  success: boolean;
  data?: CoverLetter;
  error?: string;
  message?: string;
}
