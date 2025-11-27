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
    premiumResumeMonth: string;
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
export interface SkillPageRange {
    startIndex: number;
    endIndex: number;
    pageNumber: number;
}
export interface ResumeData {
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
    skillsRaw: string[];
    experience: WorkExperience[];
    education: Education[];
    certifications: Certification[];
    projects: Project[];
    languages: Language[];
    achievements: Achievement[];
    summary: string;
    jobDescription: string;
    completedSteps: number[];
    currentStep: number;
    totalCharacters: number;
    lastSaved: string;
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
export interface ResumeScore {
    totalScore: number;
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
    strengths: string[];
    improvements: string[];
    detailedFeedback: {
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
export interface Resume {
    id: string;
    userId: string;
    title: string;
    resumeData: ResumeData;
    generatedResume?: GeneratedResume;
    score?: ResumeScore;
    scoreGeneratedAt?: string;
    scoreVersion?: string;
    status: 'draft' | 'generated' | 'optimized';
    createdAt: string;
    updatedAt: string;
}
export interface JobInterest {
    id: string;
    userId: string;
    jobTitle: string;
    company: string;
    jobDescription: string;
    jobUrl?: string;
    optimizedResumeId?: string;
    status: 'active' | 'applied' | 'closed';
    createdAt: string;
}
export interface JobInterestData {
    jobTitle: string;
    company: string;
    jobDescription: string;
    jobUrl?: string;
}
export interface GenerateResumeResponse {
    success: boolean;
    data?: GeneratedResume;
    error?: string;
    message?: string;
    tokensUsed?: number;
    resumeId?: string;
    remainingRequests?: number;
    resetTime?: number;
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
export interface JobInterestListResponse {
    success: boolean;
    data?: JobInterest[];
    error?: string;
    message?: string;
}
export interface JobInterestResponse {
    success: boolean;
    data?: JobInterest;
    error?: string;
    message?: string;
    tokensUsed?: number;
}
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
export interface AchievementSuggestionRequest {
    profession: string;
    projects: Array<{
        name: string;
        description: string;
        technologies: string[];
    }>;
    language: 'es' | 'en';
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
    remainingRequests?: number;
    resetTime?: number;
}
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
}
export interface JobTitleAchievementsResponse {
    success: boolean;
    data?: string[];
    fromCache: boolean;
    error?: string;
    message?: string;
    remainingRequests?: number;
    resetTime?: number;
}
export interface EnhanceTextRequest {
    context: 'achievement' | 'summary' | 'project' | 'responsibility';
    text: string;
    language: 'es' | 'en';
    jobTitle?: string;
}
export interface EnhanceTextResponse {
    success: boolean;
    data?: string;
    error?: string;
    message?: string;
    remainingRequests?: number;
    resetTime?: number;
}
export interface ImproveSectionRequest {
    sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
    originalText: string;
    userInstructions: string;
    language: 'es' | 'en';
    gatheredContext?: Array<{
        questionId: string;
        answer: string;
    }>;
}
export interface ImproveSectionResponse {
    success: boolean;
    data?: string;
    error?: string;
    message?: string;
    remainingRequests?: number;
    resetTime?: number;
}
export interface LinkedInImportRequest {
    url?: string;
}
export interface LinkedInImportResponse {
    success: boolean;
    data?: Partial<ResumeData>;
    error?: string;
}
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
    resumeId?: string;
    message?: string;
    error?: string;
    remainingRequests?: number;
    resetTime?: number;
}
//# sourceMappingURL=types.d.ts.map