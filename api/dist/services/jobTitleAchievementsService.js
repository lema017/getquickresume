"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobTitleAchievementsService = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const aiService_1 = require("./aiService");
const dynamodb_1 = require("./dynamodb");
class JobTitleAchievementsService {
    constructor() {
        const client = new client_dynamodb_1.DynamoDBClient({
            region: process.env.REGION || 'us-east-1',
            endpoint: process.env.DYNAMODB_ENDPOINT,
        });
        this.docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
        this.tableName = process.env.JOB_TITLE_ACHIEVEMENTS_TABLE || 'getquickresume-api-job-title-achievements-dev';
    }
    async getAchievementsByJobTitle(jobTitle, language, requestContext, resumeId) {
        try {
            // Normalizar jobTitle
            const normalizedJobTitle = this.normalizeJobTitle(jobTitle);
            // Extract userId from requestContext and look up user to check premium status
            const userId = requestContext.authorizer.userId;
            const user = await (0, dynamodb_1.getUserById)(userId);
            if (!user) {
                throw new Error('User not found');
            }
            const isPremium = user.isPremium;
            // Premium users: Skip cache, always generate fresh suggestions
            if (isPremium) {
                const aiSuggestions = await aiService_1.aiService.generateJobTitleAchievements(normalizedJobTitle, language, requestContext, resumeId);
                // Guardar en DynamoDB para cache (for future free users)
                await this.saveSuggestionsToCache(normalizedJobTitle, aiSuggestions, language);
                // Retornar 3 sugerencias aleatorias
                const randomSuggestions = this.getRandomSuggestions(aiSuggestions, 3);
                return {
                    suggestions: randomSuggestions,
                    fromCache: false
                };
            }
            // Free users: Check cache first
            const cachedSuggestions = await this.getCachedSuggestions(normalizedJobTitle, language);
            if (cachedSuggestions) {
                // Retornar 3 sugerencias aleatorias de las 5 almacenadas
                const randomSuggestions = this.getRandomSuggestions(cachedSuggestions.achievements, 3);
                return {
                    suggestions: randomSuggestions,
                    fromCache: true
                };
            }
            // Si no existe en cache, generar con AI
            const aiSuggestions = await aiService_1.aiService.generateJobTitleAchievements(normalizedJobTitle, language, requestContext, resumeId);
            // Guardar en DynamoDB para cache
            await this.saveSuggestionsToCache(normalizedJobTitle, aiSuggestions, language);
            // Retornar 3 sugerencias aleatorias
            const randomSuggestions = this.getRandomSuggestions(aiSuggestions, 3);
            return {
                suggestions: randomSuggestions,
                fromCache: false
            };
        }
        catch (error) {
            console.error('Error getting achievements by job title:', error);
            throw new Error('Failed to get achievement suggestions');
        }
    }
    normalizeJobTitle(jobTitle) {
        return jobTitle.toLowerCase().trim();
    }
    async getCachedSuggestions(normalizedJobTitle, language) {
        try {
            const command = new lib_dynamodb_1.GetCommand({
                TableName: this.tableName,
                Key: {
                    jobTitle: normalizedJobTitle
                }
            });
            const result = await this.docClient.send(command);
            if (result.Item && result.Item.language === language) {
                return result.Item;
            }
            return null;
        }
        catch (error) {
            console.error('Error getting cached suggestions:', error);
            return null;
        }
    }
    async saveSuggestionsToCache(normalizedJobTitle, achievements, language) {
        try {
            const now = new Date().toISOString();
            const command = new lib_dynamodb_1.PutCommand({
                TableName: this.tableName,
                Item: {
                    jobTitle: normalizedJobTitle,
                    achievements: achievements,
                    language: language,
                    createdAt: now,
                    updatedAt: now
                }
            });
            await this.docClient.send(command);
        }
        catch (error) {
            console.error('Error saving suggestions to cache:', error);
            // No lanzar error para no interrumpir el flujo principal
        }
    }
    getRandomSuggestions(suggestions, count) {
        if (suggestions.length <= count) {
            return suggestions;
        }
        // Mezclar array y tomar los primeros 'count' elementos
        const shuffled = [...suggestions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }
}
exports.jobTitleAchievementsService = new JobTitleAchievementsService();
//# sourceMappingURL=jobTitleAchievementsService.js.map