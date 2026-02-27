import { AchievementSuggestion, AchievementSuggestionResponse, Project, normalizeToApiLanguage, ApiLanguage } from '@/types';
import { handleAuthError } from '@/utils/authErrorHandler';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

class AchievementSuggestionService {
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

  async getAchievementSuggestions(
    profession: string,
    projects: Project[],
    language?: string,
    resumeId?: string
  ): Promise<AchievementSuggestion[]> {
    if (!profession || profession.trim() === '') {
      throw new Error('La profesión es requerida para generar sugerencias de logros.');
    }

    const apiLanguage = normalizeToApiLanguage(language);
    const requestBody: {
      profession: string;
      projects: Array<{ name: string; description: string; technologies: string[] }>;
      language: ApiLanguage;
      resumeId?: string;
    } = {
      profession: profession.trim(),
      projects: (projects || []).map(project => ({
        name: project.name,
        description: project.description,
        technologies: project.technologies
      })),
      language: apiLanguage
    };

    if (resumeId) {
      requestBody.resumeId = resumeId;
    }

    try {
      const response = await this.makeRequest<AchievementSuggestionResponse>(
        'api/achievements/suggestions',
        {
          method: 'POST',
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Error al generar sugerencias de logros');
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching achievement suggestions:', error);
      throw error;
    }
  }

  /**
   * @deprecated Use resume language instead. This method is kept for backward compatibility only.
   */
  private getCurrentLanguage(): string {
    return localStorage.getItem('i18nextLng') || 'es';
  }
}

export const achievementSuggestionService = new AchievementSuggestionService();
