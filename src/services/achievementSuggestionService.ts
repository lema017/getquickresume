import { AchievementSuggestion, AchievementSuggestionResponse, Project } from '@/types';

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
      
      if (response.status === 401 || response.status === 403) {
        throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
      }
      
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getAchievementSuggestions(
    profession: string,
    projects: Project[]
  ): Promise<AchievementSuggestion[]> {
    if (!profession || profession.trim() === '') {
      throw new Error('La profesión es requerida para generar sugerencias de logros.');
    }

    if (!projects || projects.length === 0) {
      throw new Error('Se requiere al menos un proyecto para generar sugerencias de logros.');
    }

    const language = this.getCurrentLanguage();

    const requestBody = {
      profession: profession.trim(),
      projects: projects.map(project => ({
        name: project.name,
        description: project.description,
        technologies: project.technologies
      })),
      language
    };

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

  private getCurrentLanguage(): string {
    return localStorage.getItem('i18nextLng') || 'es';
  }
}

export const achievementSuggestionService = new AchievementSuggestionService();
