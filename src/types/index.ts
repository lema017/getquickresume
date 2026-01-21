// User and Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string; // Mantener para compatibilidad
  avatarUrl?: string;
  city?: string;
  country?: string;
  location?: string; // Mantener para compatibilidad
  linkedin?: string;
  targetFunction?: string;
  profession?: string; // Nuevo campo para profesión
  provider: 'google' | 'facebook' | 'linkedin';
  isPremium: boolean;
  freeResumeUsed?: boolean;
  premiumResumeCount?: number;
  premiumResumeMonth?: string; // YYYY-MM format
  freeDownloadUsed?: boolean; // Tracks if free user used their 1 free download
  totalDownloads?: number; // Tracks total downloads for analytics
  // Cover letter tracking
  freeCoverLetterUsed?: boolean; // Free user lifetime limit (1 cover letter)
  premiumCoverLetterCount?: number; // Monthly count for premium users
  premiumCoverLetterMonth?: string; // YYYY-MM format for monthly reset
  subscriptionExpiration?: string; // ISO date
  planType?: 'monthly' | 'yearly';
  subscriptionStartDate?: string; // ISO date
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Pagination Types
export interface SkillPageRange {
  startIndex: number;
  endIndex: number;
  pageNumber: number;
}

// Resume Data Types
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
  lastSaved: Date;
  
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
  isCurrentlyStudying?: boolean;
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
  _suggestionTitle?: string; // Metadata para rastrear sugerencia original
  pageNumber: number | null;
}

// Wizard Types
export interface WizardStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isSkippable: boolean;
}

export interface WizardState {
  currentStep: number;
  completedSteps: number[];
  mode: 'manual' | 'guided';
  isCompleted: boolean;
}

// Premium and Monetization Types
export interface TokenPackage {
  id: string;
  name: string;
  tokens: number;
  price: number;
  currency: string;
  description: string;
  isPopular?: boolean;
  isLifetime?: boolean;
}

export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  tokenCost: number;
  isAvailable: boolean;
}

// Translation Types
export interface TranslationOptions {
  targetLanguage: 'en' | 'es' | 'ar' | 'zh' | 'hi';
  preserveFormat: boolean;
  professionalTone: boolean;
}

export interface TranslationResult {
  originalText: string;
  translatedText: string;
  language: string;
  tokensUsed: number;
  timestamp: Date;
}

// UI and Component Types
export interface HUDData {
  currentStep: number;
  totalSteps: number;
  charactersUsed: number;
  maxCharacters: number;
  progressPercentage: number;
  isNearLimit: boolean;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'multiselect' | 'date' | 'checkbox';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | undefined;
  };
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

// AI Generated Resume Types
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

// API Request/Response Types
export interface GenerateResumeRequest {
  resumeData: ResumeData;
  resumeId?: string;
}

export interface GenerateResumeResponse {
  success: boolean;
  data?: GeneratedResume;
  error?: string;
  message?: string;
  tokensUsed?: number;
  resumeId?: string;
  score?: ResumeScore;  // Score is now included synchronously from the API
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
}

// Job Tailoring Types
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

export interface ClarificationAnswer {
  questionId: string;
  question: string;
  answer: string;
}

export interface TailoringResult {
  originalResumeId: string;
  changes: any[];
  atsScoreBefore: number;
  atsScoreAfter: number;
  grammarCorrections: any[];
  keywordOptimizations: string[];
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
  isPubliclyShared?: boolean;  // Toggle for public visibility
  shareCreatedAt?: string;    // When sharing was enabled
  // Job Tailoring metadata (for tailored resumes)
  isTailored?: boolean;
  tailoringMetadata?: TailoredResumeMetadata;
  createdAt: Date | string;
  updatedAt: Date | string;
}


// Dashboard Types
export interface DashboardStats {
  totalResumes: number;
  tokensAvailable: number;
}

export interface DashboardState {
  resumes: Resume[];
  stats: DashboardStats;
  isLoading: boolean;
}

// Profession Suggestions Types
export interface ProfessionSuggestions {
  skills: string[];
}

export interface SuggestionsResponse {
  success: boolean;
  data?: ProfessionSuggestions;
  fromCache: boolean;
  error?: string;
  message?: string;
}

// Local Storage Keys
export const STORAGE_KEYS = {
  RESUME_WIZARD: 'resume_wizard_v1',
  USER_PREFERENCES: 'user_preferences',
  AUTH_TOKEN: 'auth_token',
  LANGUAGE: 'language',
} as const;

// Achievement Suggestions Types
export interface AchievementSuggestion {
  title: string;
  description: string;
}

export interface AchievementSuggestionResponse {
  success: boolean;
  data?: AchievementSuggestion[];
  error?: string;
  message?: string;
}

// Summary Suggestions Types
export interface SummarySuggestionRequest {
  profession: string;
  achievements: string[];
  projectDescriptions: string[];
  language: 'es' | 'en';
  type: 'experience' | 'differentiators';
}

export interface SummarySuggestionResponse {
  success: boolean;
  data?: string[];
  error?: string;
  message?: string;
}

// Job Title Achievement Suggestions Types
export interface JobTitleAchievementsRequest {
  jobTitle: string;
  language: 'es' | 'en';
}

export interface JobTitleAchievementsResponse {
  success: boolean;
  data?: string[]; // Array de 3 sugerencias máximo
  fromCache: boolean;
  error?: string;
  message?: string;
}

// AI Text Enhancement Types
export interface EnhanceTextRequest {
  context: 'achievement' | 'summary' | 'project' | 'responsibility' | 'differentiators';
  text: string;
  language: 'es' | 'en';
  jobTitle?: string;
}

export interface EnhanceTextResponse {
  success: boolean;
  data?: string; // Texto mejorado
  error?: string;
  message?: string;
}

// AI Section Improvement Types
export interface ImproveSectionRequest {
  sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
  originalText: string;
  userInstructions: string;
  language: 'es' | 'en';
  resumeId?: string; // Optional resume ID for AI usage tracking
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
  resumeId?: string;  // Cambiado de 'data'
  message?: string;
  error?: string;
  remainingRequests?: number;
  resetTime?: number;
}
