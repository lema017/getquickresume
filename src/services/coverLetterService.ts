import {
  CoverLetterData,
  GeneratedCoverLetter,
  CoverLetterParagraph,
  CoverLetter,
} from '@/types/coverLetter';
import { handleAuthError } from '@/utils/authErrorHandler';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

// API Response types
interface GenerateCoverLetterResponse {
  success: boolean;
  data?: GeneratedCoverLetter;
  coverLetterId?: string;
  error?: string;
  code?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

interface RegenerateParagraphResponse {
  success: boolean;
  data?: string;
  error?: string;
  code?: string;
  message?: string;
}

interface CoverLetterListResponse {
  success: boolean;
  data?: CoverLetter[];
  error?: string;
  message?: string;
}

interface CoverLetterResponse {
  success: boolean;
  data?: CoverLetter;
  error?: string;
  message?: string;
}

interface SuggestWhyCompanyResponse {
  success: boolean;
  data?: string[];
  error?: string;
  code?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

interface EnhanceAchievementResponse {
  success: boolean;
  data?: string;
  error?: string;
  code?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

class CoverLetterService {
  private async getAuthToken(): Promise<string> {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return token;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getAuthToken();
    
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
      
      // Handle authentication errors (401/403) - but check if it's a premium required error first
      if (response.status === 401 || response.status === 403) {
        // Only handle as auth error if it's not a premium required error
        if (errorData.code !== 'PREMIUM_REQUIRED') {
          handleAuthError();
        }
      }
      
      // Throw error with code for special handling
      const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
      (error as any).code = errorData.code;
      (error as any).response = errorData;
      throw error;
    }

    return response.json();
  }

  /**
   * Generate a cover letter using AI
   */
  async generateCoverLetter(data: CoverLetterData, coverLetterId?: string): Promise<GeneratedCoverLetter & { coverLetterId: string }> {
    try {
      const response = await this.makeRequest<GenerateCoverLetterResponse>(
        'api/cover-letters/generate',
        {
          method: 'POST',
          body: JSON.stringify({ data, coverLetterId }),
        }
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to generate cover letter');
      }

      return {
        ...response.data,
        coverLetterId: response.coverLetterId!,
      };
    } catch (error) {
      console.error('Error generating cover letter:', error);
      throw error;
    }
  }

  /**
   * Regenerate a specific paragraph (Premium only)
   */
  async regenerateParagraph(
    coverLetterId: string,
    paragraphType: CoverLetterParagraph['type'],
    data: CoverLetterData
  ): Promise<string> {
    try {
      const response = await this.makeRequest<RegenerateParagraphResponse>(
        `api/cover-letters/${coverLetterId}/regenerate`,
        {
          method: 'POST',
          body: JSON.stringify({ paragraphType, data }),
        }
      );

      if (!response.success || !response.data) {
        const error = new Error(response.error || 'Failed to regenerate paragraph');
        (error as any).code = response.code;
        throw error;
      }

      return response.data;
    } catch (error) {
      console.error('Error regenerating paragraph:', error);
      throw error;
    }
  }

  /**
   * List all cover letters for the current user
   */
  async listCoverLetters(): Promise<CoverLetter[]> {
    try {
      const response = await this.makeRequest<CoverLetterListResponse>('api/cover-letters');
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch cover letters');
      }
      
      return response.data || [];
    } catch (error) {
      console.error('Error listing cover letters:', error);
      throw error;
    }
  }

  /**
   * Get a specific cover letter
   */
  async getCoverLetter(id: string): Promise<CoverLetter> {
    try {
      const response = await this.makeRequest<CoverLetterResponse>(`api/cover-letters/${id}`);
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch cover letter');
      }
      
      return response.data;
    } catch (error) {
      console.error('Error getting cover letter:', error);
      throw error;
    }
  }

  /**
   * Create a new cover letter draft
   */
  async createCoverLetter(data: CoverLetterData, title?: string): Promise<CoverLetter> {
    try {
      const response = await this.makeRequest<CoverLetterResponse>(
        'api/cover-letters',
        {
          method: 'POST',
          body: JSON.stringify({ data, title }),
        }
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to create cover letter');
      }

      return response.data;
    } catch (error) {
      console.error('Error creating cover letter:', error);
      throw error;
    }
  }

  /**
   * Update an existing cover letter
   */
  async updateCoverLetter(id: string, updates: Partial<CoverLetter>): Promise<CoverLetter> {
    try {
      const response = await this.makeRequest<CoverLetterResponse>(
        `api/cover-letters/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify(updates),
        }
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to update cover letter');
      }

      return response.data;
    } catch (error) {
      console.error('Error updating cover letter:', error);
      throw error;
    }
  }

  /**
   * Delete a cover letter
   */
  async deleteCoverLetter(id: string): Promise<void> {
    try {
      await this.makeRequest(`api/cover-letters/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting cover letter:', error);
      throw error;
    }
  }

  /**
   * Save a generated cover letter (updates status to 'saved')
   */
  async saveCoverLetter(
    coverLetterId: string,
    data: CoverLetterData,
    generatedContent: GeneratedCoverLetter
  ): Promise<CoverLetter> {
    return this.updateCoverLetter(coverLetterId, {
      data,
      generatedContent,
      status: 'saved',
    });
  }

  /**
   * Get AI suggestions for "Why This Company" field (Premium only)
   */
  async suggestWhyCompany(
    companyName: string,
    jobTitle: string,
    jobDescription: string,
    language: 'en' | 'es'
  ): Promise<string[]> {
    try {
      const response = await this.makeRequest<SuggestWhyCompanyResponse>(
        'api/cover-letters/suggest-why-company',
        {
          method: 'POST',
          body: JSON.stringify({ companyName, jobTitle, jobDescription, language }),
        }
      );

      if (!response.success || !response.data) {
        const error = new Error(response.error || 'Failed to get suggestions');
        (error as any).code = response.code;
        throw error;
      }

      return response.data;
    } catch (error) {
      console.error('Error getting why company suggestions:', error);
      throw error;
    }
  }

  /**
   * Enhance achievement text with AI (Premium only)
   */
  async enhanceAchievement(
    achievement: string,
    context: { jobTitle?: string; companyName?: string; language: 'en' | 'es' }
  ): Promise<string> {
    try {
      const response = await this.makeRequest<EnhanceAchievementResponse>(
        'api/cover-letters/enhance-achievement',
        {
          method: 'POST',
          body: JSON.stringify({
            achievement,
            jobTitle: context.jobTitle,
            companyName: context.companyName,
            language: context.language,
          }),
        }
      );

      if (!response.success || !response.data) {
        const error = new Error(response.error || 'Failed to enhance achievement');
        (error as any).code = response.code;
        throw error;
      }

      return response.data;
    } catch (error) {
      console.error('Error enhancing achievement:', error);
      throw error;
    }
  }
}

export const coverLetterService = new CoverLetterService();
