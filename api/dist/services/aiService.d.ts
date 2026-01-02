import { ResumeData, GeneratedResume, LinkedInDataRequest } from '../types';
export interface AITrackingContext {
    userId: string;
    resumeId?: string;
    isPremium: boolean;
}
declare class AIService {
    private config;
    constructor();
    generateResume(resumeData: ResumeData, isPremium?: boolean, trackingContext?: AITrackingContext): Promise<GeneratedResume>;
    private buildPrompt;
    generateProfessionSuggestions(profession: string, requestContext: {
        authorizer: {
            userId: string;
        };
    }, resumeId?: string): Promise<{
        es: {
            skills: string[];
        };
        en: {
            skills: string[];
        };
    }>;
    private buildBilingualProfessionSuggestionsPrompt;
    private parseBilingualProfessionSuggestionsResponse;
    generateAchievementSuggestions(profession: string, projects: Array<{
        name: string;
        description: string;
        technologies: string[];
    }>, language: 'es' | 'en', requestContext: {
        authorizer: {
            userId: string;
        };
    }, resumeId?: string): Promise<Array<{
        title: string;
        description: string;
    }>>;
    private buildAchievementSuggestionsPrompt;
    private parseAchievementSuggestionsResponse;
    generateSummarySuggestions(profession: string, achievements: string[], projectDescriptions: string[], language: 'es' | 'en', type: 'experience' | 'differentiators', requestContext: {
        authorizer: {
            userId: string;
        };
    }, resumeId?: string): Promise<string[]>;
    private buildSummarySuggestionsPrompt;
    private parseSummarySuggestionsResponse;
    generateJobTitleAchievements(jobTitle: string, language: 'es' | 'en', requestContext: {
        authorizer: {
            userId: string;
        };
    }, resumeId?: string): Promise<string[]>;
    private buildJobTitleAchievementsPrompt;
    private parseJobTitleAchievementsResponse;
    enhanceText(context: 'achievement' | 'summary' | 'project' | 'responsibility' | 'differentiators', text: string, language: 'es' | 'en', requestContext: {
        authorizer: {
            userId: string;
        };
    }, jobTitle?: string, resumeId?: string): Promise<string>;
    private buildEnhanceTextPrompt;
    private parseEnhanceTextResponse;
    private parseAIResponse;
    improveSectionWithUserInstructions(sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language', originalText: string, userInstructions: string, language: 'es' | 'en', gatheredContext?: Array<{
        questionId: string;
        answer: string;
    }>, trackingContext?: AITrackingContext): Promise<string>;
    /**
     * Generate contextual questions based on a recommendation for enhancing a resume section
     * Premium-only feature - uses configured AI provider
     */
    generateEnhancementQuestions(sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language', recommendation: string, originalText: string, language: 'es' | 'en', requestContext: {
        authorizer: {
            userId: string;
        };
    }, resumeId?: string): Promise<Array<{
        id: string;
        question: string;
        category: string;
        required: boolean;
    }>>;
    private buildEnhancementQuestionsPrompt;
    private parseEnhancementQuestionsResponse;
    /**
     * Generate AI-powered answer suggestion for an enhancement question
     * Premium-only feature - uses configured AI provider
     */
    generateAnswerSuggestion(question: string, questionCategory: string, originalText: string, recommendation: string, sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language', language: 'es' | 'en', requestContext: {
        authorizer: {
            userId: string;
        };
    }, resumeId?: string): Promise<string>;
    private buildAnswerSuggestionPrompt;
    private parseAnswerSuggestionResponse;
    private buildSecureSectionImprovementPrompt;
    private buildContextAwareSectionImprovementPrompt;
    private requiresMaxCompletionTokens;
    private getOpenAIModelLimit;
    private hasRestrictedParameters;
    private callOpenAI;
    private callOpenAIWithUsage;
    private callAnthropic;
    private callAnthropicWithUsage;
    private callGroq;
    private callGroqWithUsage;
    parseLinkedInTextToResumeData(linkedInData: LinkedInDataRequest, requestContext: {
        authorizer: {
            userId: string;
        };
    }, resumeId?: string): Promise<Partial<ResumeData>>;
    private buildLinkedInParsingPrompt;
    private parseLinkedInResponse;
    private generateDefaultJobDescription;
    /**
     * Direct enhancement for mechanical fixes that don't require user context.
     * Uses targeted prompts based on the checklist item type.
     * Premium-only feature.
     */
    directEnhance(checklistItemId: string, sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language', originalText: string, language: 'es' | 'en', requestContext: {
        authorizer: {
            userId: string;
        };
    }, resumeId?: string): Promise<string>;
    /**
     * Build targeted prompt for mechanical fixes based on checklist item type.
     */
    private buildDirectEnhancePrompt;
}
export declare const aiService: AIService;
export {};
//# sourceMappingURL=aiService.d.ts.map