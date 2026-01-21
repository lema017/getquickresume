export interface AIUsageStats {
    totalInputTokens: number;
    totalOutputTokens: number;
    totalCostUSD: number;
    totalAICalls: number;
    lastAICallAt: string;
    monthlyStats: {
        month: string;
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
    premiumResumeMonth: string;
    freeDownloadUsed: boolean;
    totalDownloads: number;
    freeCoverLetterUsed: boolean;
    premiumCoverLetterCount: number;
    premiumCoverLetterMonth: string;
    subscriptionExpiration?: string;
    planType?: 'monthly' | 'yearly';
    subscriptionStartDate?: string;
    paymentProvider?: 'paypal' | 'stripe' | 'other';
    paymentCustomerId?: string;
    paymentSubscriptionId?: string;
    paymentTransactionId?: string;
    aiUsageStats?: AIUsageStats;
    jobTailoringUsage?: {
        totalUsed: number;
        monthlyUsed: number;
        currentMonth: string;
        lastTailoredAt?: string;
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
    language: 'en' | 'es' | 'zh' | 'hi' | 'fr' | 'ar' | 'bn' | 'pt' | 'ru' | 'ja';
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
    totalScore: number;
    maxPossibleScore: number;
    completionPercentage: number;
    isOptimized: boolean;
    breakdown: Record<string, number>;
    checklist: Record<string, SectionChecklist>;
    enhancementHistory: EnhancementRecord[];
    keywordAnalysis?: KeywordAnalysisData;
    strengths: string[];
    improvements: string[];
    improvementHints?: string[];
    generatedAt: string;
    scoringVersion: string;
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
    shareToken?: string;
    isPubliclyShared: boolean;
    shareCreatedAt?: string;
    aiCost?: ResumeAICost;
    isTailored?: boolean;
    tailoringMetadata?: TailoredResumeMetadata;
    createdAt: string;
    updatedAt: string;
}
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
    matchScore: number;
    matchingSkills: string[];
    missingSkills: string[];
    keywordMatches: {
        keyword: string;
        found: boolean;
        context?: string;
    }[];
    suggestions: string[];
}
export interface ClarificationQuestion {
    id: string;
    question: string;
    context: string;
    type: 'text' | 'textarea' | 'select';
    required: boolean;
    suggestedAnswer?: string;
    options?: string[];
    relatedSkill?: string;
}
export interface ClarificationAnswer {
    questionId: string;
    question: string;
    answer: string;
}
export interface ResumeChange {
    section: 'summary' | 'experience' | 'skills' | 'education' | 'projects' | 'achievements';
    sectionIndex?: number;
    fieldName?: string;
    originalValue: string;
    newValue: string;
    changeType: 'added' | 'modified' | 'removed' | 'enhanced';
    reason: string;
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
    suggestions?: string[];
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
    answers: ClarificationAnswer[];
    language: 'en' | 'es';
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
export interface GenerateResumeResponse {
    success: boolean;
    data?: GeneratedResume;
    error?: string;
    message?: string;
    tokensUsed?: number;
    resumeId?: string;
    remainingRequests?: number;
    resetTime?: number;
    score?: ResumeScore;
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
    resumeId?: string;
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
    resumeId?: string;
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
    resumeId?: string;
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
    resumeId?: string;
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
    resumeId?: string;
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
export type CoverLetterTone = 'professional' | 'friendly' | 'confident' | 'creative';
export type CoverLetterLength = 'concise' | 'standard' | 'detailed';
export type CoverLetterTemplate = 'classic' | 'modern' | 'minimal' | 'creative';
export interface CoverLetterParagraph {
    id: string;
    type: 'greeting' | 'opening' | 'body' | 'skills' | 'closing' | 'signature';
    content: string;
}
export interface ResumeContext {
    profession?: string;
    skills?: string[];
    experienceSummary?: string;
    summary?: string;
    achievements?: string[];
}
export interface CoverLetterData {
    sourceResumeId?: string;
    resumeContext?: ResumeContext;
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    hiringManagerName?: string;
    whyThisCompany?: string;
    keyAchievement?: string;
    fullName: string;
    email: string;
    phone?: string;
    linkedin?: string;
    tone: CoverLetterTone;
    length: CoverLetterLength;
    template: CoverLetterTemplate;
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
export interface GenerateCoverLetterRequest {
    data: CoverLetterData;
    coverLetterId?: string;
}
export interface GenerateCoverLetterResponse {
    success: boolean;
    data?: GeneratedCoverLetter;
    coverLetterId?: string;
    error?: string;
    code?: string;
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
    data?: string;
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
//# sourceMappingURL=types.d.ts.map