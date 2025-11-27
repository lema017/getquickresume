import { 
  JobTitleAchievementsRequest, 
  JobTitleAchievementsResponse,
  EnhanceTextRequest,
  EnhanceTextResponse
} from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

class ExperienceAchievementService {
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

  async getAchievementsByJobTitle(
    jobTitle: string
  ): Promise<{ suggestions: string[]; fromCache: boolean }> {
    if (!jobTitle || jobTitle.trim() === '') {
      throw new Error('El título del puesto es requerido para generar sugerencias de logros.');
    }

    const language = this.getCurrentLanguage();

    const requestBody: JobTitleAchievementsRequest = {
      jobTitle: jobTitle.trim(),
      language
    };

    try {
      const response = await this.makeRequest<JobTitleAchievementsResponse>(
        'api/experience-achievements/suggestions',
        {
          method: 'POST',
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Error al generar sugerencias de logros');
      }

      return {
        suggestions: response.data,
        fromCache: response.fromCache
      };
    } catch (error) {
      console.error('Error fetching job title achievements:', error);
      throw error;
    }
  }

  async enhanceAchievement(
    text: string,
    jobTitle?: string
  ): Promise<string> {
    if (!text || text.trim() === '') {
      throw new Error('El texto es requerido para mejorar con IA.');
    }

    const language = this.getCurrentLanguage();

    const requestBody: EnhanceTextRequest = {
      context: 'achievement',
      text: text.trim(),
      language,
      jobTitle
    };

    try {
      const response = await this.makeRequest<EnhanceTextResponse>(
        'api/ai/enhance',
        {
          method: 'POST',
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Error al mejorar el texto con IA');
      }

      return response.data;
    } catch (error) {
      console.error('Error enhancing achievement text:', error);
      throw error;
    }
  }

  async enhanceProjectDescription(
    text: string,
    projectName?: string
  ): Promise<string> {
    if (!text || text.trim() === '') {
      throw new Error('El texto es requerido para mejorar con IA.');
    }

    const language = this.getCurrentLanguage();

    const requestBody: EnhanceTextRequest = {
      context: 'project',
      text: text.trim(),
      language,
      jobTitle: projectName // Using jobTitle field for project name context
    };

    try {
      const response = await this.makeRequest<EnhanceTextResponse>(
        'api/ai/enhance',
        {
          method: 'POST',
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Error al mejorar el texto con IA');
      }

      return response.data;
    } catch (error) {
      console.error('Error enhancing project description:', error);
      throw error;
    }
  }

  private getCurrentLanguage(): 'es' | 'en' {
    const storedLanguage = localStorage.getItem('i18nextLng');
    return (storedLanguage === 'en' || storedLanguage === 'es') ? storedLanguage : 'es';
  }
}

export const experienceAchievementService = new ExperienceAchievementService();
