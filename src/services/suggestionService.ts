import { SuggestionsResponse, ProfessionSuggestions } from '@/types';
import { handleAuthError } from '@/utils/authErrorHandler';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

class SuggestionService {
  private cache = new Map<string, ProfessionSuggestions>();
  private loadingStates = new Map<string, boolean>();

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
      
      // Handle invalid profession error (400)
      if (response.status === 400 && errorData.error === 'INVALID_PROFESSION') {
        const error = new Error(errorData.message || 'The provided text does not appear to be a valid profession or job title.');
        (error as any).code = 'INVALID_PROFESSION';
        (error as any).status = 400;
        throw error;
      }
      
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Obtiene sugerencias para una profesión específica
   * Incluye cache en memoria para evitar llamadas repetidas
   */
  async getSuggestions(profession: string): Promise<ProfessionSuggestions> {
    // Normalizar profesión para el cache
    const normalizedProfession = profession.toLowerCase().trim();
    
    // Verificar cache primero
    if (this.cache.has(normalizedProfession)) {
      return this.cache.get(normalizedProfession)!;
    }

    // Verificar si ya está cargando
    if (this.loadingStates.get(normalizedProfession)) {
      // Esperar a que termine la carga actual
      return new Promise((resolve, reject) => {
        const checkLoading = () => {
          if (!this.loadingStates.get(normalizedProfession)) {
            if (this.cache.has(normalizedProfession)) {
              resolve(this.cache.get(normalizedProfession)!);
            } else {
              reject(new Error('Failed to load suggestions'));
            }
          } else {
            setTimeout(checkLoading, 100);
          }
        };
        checkLoading();
      });
    }

    try {
      // Marcar como cargando
      this.loadingStates.set(normalizedProfession, true);

      // Codificar la profesión para la URL
      const encodedProfession = encodeURIComponent(profession);
      
      const response = await this.makeRequest<SuggestionsResponse>(
        `api/suggestions/${encodedProfession}`,
        {
          method: 'GET',
        }
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to get suggestions');
      }

      // Guardar en cache
      this.cache.set(normalizedProfession, response.data);

      return response.data;
    } catch (error) {
      console.error('Error getting suggestions:', error);
      throw error;
    } finally {
      // Marcar como no cargando
      this.loadingStates.set(normalizedProfession, false);
    }
  }

  /**
   * Obtiene sugerencias de habilidades para una profesión específica
   * La API ya retorna solo skills unificado
   * @param profession - La profesión para la cual obtener sugerencias
   * @param language - El idioma del currículum ('es' | 'en'), por defecto 'es'
   * @param resumeId - Optional resume ID for AI cost tracking
   */
  async getSkillsSuggestions(profession: string, language: 'es' | 'en' = 'es', resumeId?: string): Promise<string[]> {
    const normalizedProfession = profession.toLowerCase().trim();
    
    // Verificar cache específico para habilidades con idioma
    const cacheKey = `${normalizedProfession}-${language}-skills`;
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      return cached.skills || [];
    }

    if (this.loadingStates.get(cacheKey)) {
      throw new Error('Skills suggestions are already being loaded for this profession.');
    }

    this.loadingStates.set(cacheKey, true);

    try {
      const encodedProfession = encodeURIComponent(profession);
      // Obtener sugerencias de la API (solo skills)
      let url = `api/suggestions/${encodedProfession}?language=${language}`;
      if (resumeId) {
        url += `&resumeId=${encodeURIComponent(resumeId)}`;
      }
      const response = await this.makeRequest<SuggestionsResponse>(url);

      if (!response.success || !response.data?.skills) {
        throw new Error(response.error || 'Failed to fetch suggestions');
      }

      // Cache con datos para futuras consultas
      this.cache.set(cacheKey, { 
        skills: response.data.skills || []
      });

      return response.data.skills;
    } catch (error) {
      console.error('Error fetching skills suggestions:', error);
      throw error;
    } finally {
      this.loadingStates.set(cacheKey, false);
    }
  }

  /**
   * Verifica si hay sugerencias en cache para una profesión
   */
  hasCachedSuggestions(profession: string): boolean {
    const normalizedProfession = profession.toLowerCase().trim();
    return this.cache.has(normalizedProfession);
  }

  /**
   * Verifica si una profesión está siendo cargada actualmente
   */
  isLoading(profession: string): boolean {
    const normalizedProfession = profession.toLowerCase().trim();
    return this.loadingStates.get(normalizedProfession) || false;
  }

  /**
   * Verifica si las habilidades están siendo cargadas para una profesión
   * @param profession - La profesión a verificar
   * @param language - El idioma del currículum ('es' | 'en'), por defecto 'es'
   */
  isLoadingSkills(profession: string, language: 'es' | 'en' = 'es'): boolean {
    const normalizedProfession = profession.toLowerCase().trim();
    return this.loadingStates.get(`${normalizedProfession}-${language}-skills`) || false;
  }

  /**
   * Verifica si las herramientas están siendo cargadas para una profesión
   */
  isLoadingTools(profession: string): boolean {
    const normalizedProfession = profession.toLowerCase().trim();
    const language = this.getCurrentLanguage();
    return this.loadingStates.get(`${normalizedProfession}-${language}-tools`) || false;
  }

  /**
   * Obtiene el idioma actual del usuario (UI language)
   * @deprecated Use resume language instead. This method is kept for backward compatibility only.
   */
  private getCurrentLanguage(): string {
    // Get language from i18next
    return localStorage.getItem('i18nextLng') || 'es';
  }

  /**
   * Limpia el cache de sugerencias
   */
  clearCache(): void {
    this.cache.clear();
    this.loadingStates.clear();
  }

  /**
   * Limpia el cache para una profesión específica
   */
  clearCacheForProfession(profession: string): void {
    const normalizedProfession = profession.toLowerCase().trim();
    this.cache.delete(normalizedProfession);
    this.loadingStates.delete(normalizedProfession);
  }
}

export const suggestionService = new SuggestionService();
