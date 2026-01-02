import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { ProfessionSuggestion } from '../types';
import { aiService } from './aiService';
import { getUserById } from './dynamodb';

// Configuración para desarrollo local y producción
const client = new DynamoDBClient({
  region: process.env.REGION || 'us-east-1',
  // Para desarrollo local, usar endpoint local
  ...(process.env.DYNAMODB_ENDPOINT && {
    endpoint: process.env.DYNAMODB_ENDPOINT,
    credentials: {
      accessKeyId: 'local',
      secretAccessKey: 'local'
    }
  })
});

const dynamodb = DynamoDBDocumentClient.from(client);
const tableName = process.env.PROFESSION_SUGGESTIONS_TABLE || 'getquickresume-api-profession-suggestions-dev';

class SuggestionService {
  /**
   * Normaliza el nombre de la profesión para consistencia en la base de datos
   */
  private normalizeProfession(profession: string): string {
    return profession.toLowerCase().trim();
  }

  /**
   * Busca sugerencias existentes en la base de datos
   */
  async getSuggestionsByProfession(profession: string): Promise<ProfessionSuggestion | null> {
    try {
      const normalizedProfession = this.normalizeProfession(profession);
      
      const command = new GetCommand({
        TableName: tableName,
        Key: { profession: normalizedProfession },
      });

      const result = await dynamodb.send(command);
      
      if (result.Item) {
        return result.Item as ProfessionSuggestion;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting suggestions by profession:', error);
      throw new Error('Database error');
    }
  }

  /**
   * Genera sugerencias usando AI (ambos idiomas) y las guarda en la base de datos
   */
  async generateAndSaveSuggestions(
    profession: string,
    requestContext: { authorizer: { userId: string } },
    resumeId?: string
  ): Promise<ProfessionSuggestion> {
    try {
      const normalizedProfession = this.normalizeProfession(profession);
      
      // Generar sugerencias con AI (ambos idiomas) - ya vienen unificadas como skills
      const aiSuggestions = await aiService.generateProfessionSuggestions(profession, requestContext, resumeId);
      
      // Guardar en la base de datos
      await this.saveBilingualSuggestions(normalizedProfession, aiSuggestions);
      
      // Crear objeto para retornar
      const now = new Date().toISOString();
      const suggestion: ProfessionSuggestion = {
        profession: normalizedProfession,
        suggestions: {
          es: {
            skills: aiSuggestions.es.skills
          },
          en: {
            skills: aiSuggestions.en.skills
          }
        },
        createdAt: now,
        updatedAt: now,
        generatedBy: 'ai'
      };
      
      return suggestion;
    } catch (error: any) {
      console.error('Error generating and saving bilingual suggestions:', error);
      // Propagate INVALID_PROFESSION error without wrapping
      if (error?.code === 'INVALID_PROFESSION') {
        throw error;
      }
      throw new Error('Failed to generate bilingual suggestions');
    }
  }

  /**
   * Guarda sugerencias bilingües en la base de datos (solo skills)
   */
  async saveBilingualSuggestions(profession: string, suggestions: {
    es: { skills: string[] };
    en: { skills: string[] };
  }): Promise<ProfessionSuggestion> {
    try {
      const normalizedProfession = this.normalizeProfession(profession);
      const now = new Date().toISOString();
      
      const suggestion: ProfessionSuggestion = {
        profession: normalizedProfession,
        suggestions: {
          es: {
            skills: suggestions.es.skills
          },
          en: {
            skills: suggestions.en.skills
          }
        },
        createdAt: now,
        updatedAt: now,
        generatedBy: 'ai'
      };

      const command = new PutCommand({
        TableName: tableName,
        Item: suggestion,
      });

      await dynamodb.send(command);
      return suggestion;
    } catch (error) {
      console.error('Error saving bilingual suggestions:', error);
      throw new Error('Database error');
    }
  }

  /**
   * Guarda sugerencias en la base de datos (método legacy para compatibilidad)
   * Combina tools en skills antes de guardar
   */
  async saveSuggestions(profession: string, skills: string[], tools: string[]): Promise<ProfessionSuggestion> {
    try {
      const normalizedProfession = this.normalizeProfession(profession);
      const now = new Date().toISOString();
      
      // Combinar tools en skills
      const combinedSkills = [...skills, ...tools.filter(t => !skills.includes(t))];
      
      const suggestion: ProfessionSuggestion = {
        profession: normalizedProfession,
        suggestions: {
          es: {
            skills: combinedSkills
          },
          en: {
            skills: [] // Placeholder para compatibilidad
          }
        },
        createdAt: now,
        updatedAt: now,
        generatedBy: 'manual'
      };

      const command = new PutCommand({
        TableName: tableName,
        Item: suggestion,
      });

      await dynamodb.send(command);
      return suggestion;
    } catch (error) {
      console.error('Error saving suggestions:', error);
      throw new Error('Database error');
    }
  }

  /**
   * Obtiene sugerencias para una profesión en el idioma especificado (busca primero en cache, luego genera si no existe)
   * Retorna solo skills (unificado)
   * Premium users always get fresh suggestions (bypass cache)
   */
  async getSuggestions(
    profession: string,
    language: string,
    requestContext: { authorizer: { userId: string } },
    resumeId?: string
  ): Promise<{ skills: string[]; fromCache: boolean }> {
    try {
      // Validar idioma
      if (!['es', 'en'].includes(language)) {
        throw new Error('Language must be "es" or "en"');
      }

      // Extract userId from requestContext and look up user to check premium status
      const userId = requestContext.authorizer.userId;
      const user = await getUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      const isPremium = user.isPremium;

      // Premium users: Skip cache, always generate fresh suggestions
      if (isPremium) {
        const newSuggestions = await this.generateAndSaveSuggestions(profession, requestContext, resumeId);
        
        // Validar que la respuesta del AI tenga la estructura esperada
        if (!newSuggestions || !newSuggestions.suggestions) {
          throw new Error('AI service returned invalid response structure');
        }
        
        if (!newSuggestions.suggestions[language as 'es' | 'en']) {
          throw new Error(`AI service did not return suggestions for language: ${language}`);
        }
        
        return {
          skills: newSuggestions.suggestions[language as 'es' | 'en'].skills,
          fromCache: false
        };
      }

      // Free users: Check cache first
      const existingSuggestions = await this.getSuggestionsByProfession(profession);
      
      if (existingSuggestions) {
        const langSuggestions = existingSuggestions.suggestions[language as 'es' | 'en'];
        let skills = langSuggestions.skills || [];
        
        // Migración: si existe tools en datos antiguos (compatibilidad con registros antiguos), combinarlo
        const langSuggestionsAny = langSuggestions as any;
        if (langSuggestionsAny.tools && Array.isArray(langSuggestionsAny.tools) && langSuggestionsAny.tools.length > 0) {
          skills = [...skills, ...langSuggestionsAny.tools.filter((t: string) => !skills.includes(t))];
          
          // Actualizar el registro en BD para eliminar tools (migración automática)
          const existingAny = existingSuggestions as any;
          const esSkills = existingAny.suggestions?.es?.skills || [];
          const esTools = existingAny.suggestions?.es?.tools || [];
          const esCombined = [...esSkills, ...esTools.filter((t: string) => !esSkills.includes(t))];
          
          const enSkills = existingAny.suggestions?.en?.skills || [];
          const enTools = existingAny.suggestions?.en?.tools || [];
          const enCombined = [...enSkills, ...enTools.filter((t: string) => !enSkills.includes(t))];
          
          // Guardar actualización (sin esperar, no crítico)
          this.saveBilingualSuggestions(existingSuggestions.profession, {
            es: { skills: esCombined },
            en: { skills: enCombined }
          }).catch(err => console.warn('Failed to migrate suggestion:', err));
        }
        
        return {
          skills,
          fromCache: true
        };
      }

      // Si no existe en cache, generar con AI (ambos idiomas) y guardar
      const newSuggestions = await this.generateAndSaveSuggestions(profession, requestContext, resumeId);
      
      // Validar que la respuesta del AI tenga la estructura esperada
      if (!newSuggestions || !newSuggestions.suggestions) {
        throw new Error('AI service returned invalid response structure');
      }
      
      if (!newSuggestions.suggestions[language as 'es' | 'en']) {
        throw new Error(`AI service did not return suggestions for language: ${language}`);
      }
      
      return {
        skills: newSuggestions.suggestions[language as 'es' | 'en'].skills,
        fromCache: false
      };
    } catch (error: any) {
      console.error('Error getting suggestions:', error);
      // Propagate INVALID_PROFESSION error with its code
      if (error?.code === 'INVALID_PROFESSION') {
        throw error;
      }
      throw new Error('Failed to get suggestions');
    }
  }
}

export const suggestionService = new SuggestionService();
