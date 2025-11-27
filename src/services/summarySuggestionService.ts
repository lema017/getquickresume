import { SummarySuggestionRequest, SummarySuggestionResponse } from '@/types';

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
      
      if (response.status === 401 || response.status === 403) {
        throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
      }
      
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Obtiene sugerencias de resumen profesional personalizadas
   * No usa caché ya que las sugerencias son específicas del usuario
   */
  async getSummarySuggestions(
    profession: string,
    achievements: string[],
    projects: Array<{ name: string; description: string; technologies: string[] }>,
    type: 'experience' | 'differentiators',
    language: 'es' | 'en' = 'es'
  ): Promise<string[]> {
    try {
      // Extraer solo las descripciones de los proyectos
      const projectDescriptions = projects.map(project => project.description);

      const requestData: SummarySuggestionRequest = {
        profession,
        achievements,
        projectDescriptions,
        language,
        type
      };

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
   */
  async getExperienceSuggestions(
    profession: string,
    achievements: string[],
    projects: Array<{ name: string; description: string; technologies: string[] }>,
    language: 'es' | 'en' = 'es'
  ): Promise<string[]> {
    return this.getSummarySuggestions(profession, achievements, projects, 'experience', language);
  }

  /**
   * Obtiene sugerencias de diferenciadores profesionales
   */
  async getDifferentiatorsSuggestions(
    profession: string,
    achievements: string[],
    projects: Array<{ name: string; description: string; technologies: string[] }>,
    language: 'es' | 'en' = 'es'
  ): Promise<string[]> {
    return this.getSummarySuggestions(profession, achievements, projects, 'differentiators', language);
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
