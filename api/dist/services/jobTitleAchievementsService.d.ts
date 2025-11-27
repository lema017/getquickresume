declare class JobTitleAchievementsService {
    private docClient;
    private tableName;
    constructor();
    getAchievementsByJobTitle(jobTitle: string, language: 'es' | 'en', requestContext: {
        authorizer: {
            userId: string;
        };
    }): Promise<{
        suggestions: string[];
        fromCache: boolean;
    }>;
    private normalizeJobTitle;
    private getCachedSuggestions;
    private saveSuggestionsToCache;
    private getRandomSuggestions;
}
export declare const jobTitleAchievementsService: JobTitleAchievementsService;
export {};
//# sourceMappingURL=jobTitleAchievementsService.d.ts.map