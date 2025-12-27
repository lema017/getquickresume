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
  subscriptionExpiration?: string; // ISO date
  planType?: 'monthly' | 'yearly';
  subscriptionStartDate?: string; // ISO date
  paddleCustomerId?: string;
  paddleSubscriptionId?: string;
  paddleTransactionId?: string;
  aiUsageStats?: AIUsageStats; // AI usage tracking for cost analysis
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
  language: 'es' | 'en';
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

// Resume Scoring Types
export interface ResumeScore {
  totalScore: number;  // 1-10 scale
  breakdown: {
    summary: number;
    experience: number;
    skills: number;
    education: number;
    projects: number;
    achievements: number;
    languages: number;
    contact: number;
  };
  strengths: string[];  // Always shown
  improvements: string[];  // Premium only
  detailedFeedback: {  // Premium only
    section: string;
    currentScore: number;
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
  }[];
  generatedAt: string;
  aiProvider: string;
  model: string;
}

export interface ScoreResumeResponse {
  success: boolean;
  data?: ResumeScore;
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
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
  createdAt: string;
  updatedAt: string;
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
  context: 'achievement' | 'summary' | 'project' | 'responsibility';
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

// Paddle Payment Types
export interface CreateCheckoutRequest {
  planType: 'monthly' | 'yearly';
}

export interface CreateCheckoutResponse {
  success: boolean;
  checkoutUrl?: string;
  transactionId?: string;
  error?: string;
  message?: string;
}

export interface PaddleWebhookPayload {
  event_id: string;
  event_type: string;
  occurred_at: string;
  data: {
    id: string;
    status: string;
    customer_id: string;
    subscription_id?: string;
    items: Array<{
      price_id: string;
      quantity: number;
    }>;
    custom_data?: Record<string, string>;
  };
}
