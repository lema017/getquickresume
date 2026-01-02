import { SummarySuggestionRequest, SummarySuggestionResponse } from '@/types';
import { handleAuthError } from '@/utils/authErrorHandler';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

class SummarySuggestionService {
  private async getAuthToken(): Promise<string | null> {
    const token = localStorage.getItem('auth-token');
    return token;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getAuthToken();
    
    if (!token) {
      throw new Error('Usuario no autenticado. Por favor, inicia sesión para usar las sugerencias de IA.');
    }
    
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Handle premium required error (403) - do NOT logout
      if (response.status === 403 && errorData.code === 'PREMIUM_REQUIRED') {
        const error = new Error(errorData.message || 'Premium feature required');
        (error as any).code = 'PREMIUM_REQUIRED';
        (error as any).status = 403;
        throw error;
      }
      
      // Handle auth errors (401/403) - logout and redirect
      if (response.status === 401 || response.status === 403) {
        handleAuthError();
        throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
      }
      
      // Handle rate limit exceeded error (429)
      if (response.status === 429) {
        const error = new Error(errorData.message || 'Too many requests. Please wait before trying again.');
        (error as any).code = 'RATE_LIMIT_EXCEEDED';
        (error as any).status = 429;
        throw error;
      }
      
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Obtiene sugerencias de resumen profesional personalizadas
   * No usa caché ya que las sugerencias son específicas del usuario
   * @param resumeId - Optional resume ID for AI cost tracking
   */
  async getSummarySuggestions(
    profession: string,
    achievements: string[],
    projects: Array<{ name: string; description: string; technologies: string[] }>,
    type: 'experience' | 'differentiators',
    language: 'es' | 'en' = 'es',
    resumeId?: string
  ): Promise<string[]> {
    try {
      // Extraer solo las descripciones de los proyectos
      const projectDescriptions = projects.map(project => project.description);

      const requestData: SummarySuggestionRequest & { resumeId?: string } = {
        profession,
        achievements,
        projectDescriptions,
        language,
        type
      };

      if (resumeId) {
        requestData.resumeId = resumeId;
      }

      const response = await this.makeRequest<SummarySuggestionResponse>(
        'api/summary/suggestions',
        {
          method: 'POST',
          body: JSON.stringify(requestData),
        }
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to get summary suggestions');
      }

      return response.data;
    } catch (error) {
      console.error('Error getting summary suggestions:', error);
      throw error;
    }
  }

  /**
   * Obtiene sugerencias de experiencia profesional
   * @param resumeId - Optional resume ID for AI cost tracking
   */
  async getExperienceSuggestions(
    profession: string,
    achievements: string[],
    projects: Array<{ name: string; description: string; technologies: string[] }>,
    language: 'es' | 'en' = 'es',
    resumeId?: string
  ): Promise<string[]> {
    return this.getSummarySuggestions(profession, achievements, projects, 'experience', language, resumeId);
  }

  /**
   * Obtiene sugerencias de diferenciadores profesionales
   * @param resumeId - Optional resume ID for AI cost tracking
   */
  async getDifferentiatorsSuggestions(
    profession: string,
    achievements: string[],
    projects: Array<{ name: string; description: string; technologies: string[] }>,
    language: 'es' | 'en' = 'es',
    resumeId?: string
  ): Promise<string[]> {
    return this.getSummarySuggestions(profession, achievements, projects, 'differentiators', language, resumeId);
  }

  /**
   * Obtiene el idioma actual del usuario
   */
  private getCurrentLanguage(): string {
    // Get language from i18next
    return localStorage.getItem('i18nextLng') || 'es';
  }
}

export const summarySuggestionService = new SummarySuggestionService();
