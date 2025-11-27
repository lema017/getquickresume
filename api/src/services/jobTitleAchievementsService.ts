import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { JobTitleAchievementSuggestion, JobTitleAchievementsRequest } from '../types';
import { aiService } from './aiService';
import { getUserById } from './dynamodb';

class JobTitleAchievementsService {
  private docClient: DynamoDBDocumentClient;
  private tableName: string;

  constructor() {
    const client = new DynamoDBClient({
      region: process.env.REGION || 'us-east-1',
      endpoint: process.env.DYNAMODB_ENDPOINT,
    });
    
    this.docClient = DynamoDBDocumentClient.from(client);
    this.tableName = process.env.JOB_TITLE_ACHIEVEMENTS_TABLE || 'getquickresume-api-job-title-achievements-dev';
  }

  async getAchievementsByJobTitle(
    jobTitle: string, 
    language: 'es' | 'en',
    requestContext: { authorizer: { userId: string } }
  ): Promise<{ suggestions: string[]; fromCache: boolean }> {
    try {
      // Normalizar jobTitle
      const normalizedJobTitle = this.normalizeJobTitle(jobTitle);
      
      // Extract userId from requestContext and look up user to check premium status
      const userId = requestContext.authorizer.userId;
      const user = await getUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      const isPremium = user.isPremium;

      // Premium users: Skip cache, always generate fresh suggestions
      if (isPremium) {
        const aiSuggestions = await aiService.generateJobTitleAchievements(normalizedJobTitle, language, requestContext);
        
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
      const aiSuggestions = await aiService.generateJobTitleAchievements(normalizedJobTitle, language, requestContext);
      
      // Guardar en DynamoDB para cache
      await this.saveSuggestionsToCache(normalizedJobTitle, aiSuggestions, language);
      
      // Retornar 3 sugerencias aleatorias
      const randomSuggestions = this.getRandomSuggestions(aiSuggestions, 3);
      return {
        suggestions: randomSuggestions,
        fromCache: false
      };

    } catch (error) {
      console.error('Error getting achievements by job title:', error);
      throw new Error('Failed to get achievement suggestions');
    }
  }

  private normalizeJobTitle(jobTitle: string): string {
    return jobTitle.toLowerCase().trim();
  }

  private async getCachedSuggestions(
    normalizedJobTitle: string, 
    language: 'es' | 'en'
  ): Promise<JobTitleAchievementSuggestion | null> {
    try {
      const command = new GetCommand({
        TableName: this.tableName,
        Key: {
          jobTitle: normalizedJobTitle
        }
      });

      const result = await this.docClient.send(command);
      
      if (result.Item && result.Item.language === language) {
        return result.Item as JobTitleAchievementSuggestion;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting cached suggestions:', error);
      return null;
    }
  }

  private async saveSuggestionsToCache(
    normalizedJobTitle: string,
    achievements: string[],
    language: 'es' | 'en'
  ): Promise<void> {
    try {
      const now = new Date().toISOString();
      
      const command = new PutCommand({
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
    } catch (error) {
      console.error('Error saving suggestions to cache:', error);
      // No lanzar error para no interrumpir el flujo principal
    }
  }

  private getRandomSuggestions(suggestions: string[], count: number): string[] {
    if (suggestions.length <= count) {
      return suggestions;
    }

    // Mezclar array y tomar los primeros 'count' elementos
    const shuffled = [...suggestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
}

export const jobTitleAchievementsService = new JobTitleAchievementsService();
