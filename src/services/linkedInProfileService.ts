import { ResumeData } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

export interface LinkedInImportRequest {
  url?: string; // Para import por URL
}

export interface LinkedInImportResponse {
  success: boolean;
  data?: Partial<ResumeData>;
  error?: string;
}

export interface LinkedInDataRequest {
  profession: string;
  about: string;
  experience: string;
  education: string;
  certifications?: string;
  projects?: string;
  skills?: string;
  recommendations?: string;
  targetLanguage?: 'es' | 'en';
}

export interface LinkedInDataResponse {
  success: boolean;
  data?: Partial<ResumeData>;
  error?: string;
}

class LinkedInProfileService {
  private async makeRequest(endpoint: string, data: any): Promise<LinkedInImportResponse> {
    const token = localStorage.getItem('auth-token');
    
    console.log('🔧 LinkedIn Service - Token found:', !!token);
    console.log('🔧 LinkedIn Service - Endpoint:', endpoint);
    console.log('🔧 LinkedIn Service - Data:', data);
    
    // TODO: Re-enable authentication in production
    // For now, allow requests without authentication for testing
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Import LinkedIn profile data using OAuth (for users who logged in with LinkedIn)
   */
  async importLinkedInProfileOAuth(): Promise<LinkedInImportResponse> {
    try {
      return await this.makeRequest('/api/linkedin/import-auth', {});
    } catch (error) {
      console.error('Error importing LinkedIn profile via OAuth:', error);
      throw error;
    }
  }

  /**
   * Import LinkedIn profile data using public URL (for users who logged in with Google)
   */
  async importLinkedInProfileByUrl(url: string): Promise<LinkedInImportResponse> {
    try {
      return await this.makeRequest('/api/linkedin/import-url', { url });
    } catch (error) {
      console.error('Error importing LinkedIn profile via URL:', error);
      throw error;
    }
  }

  /**
   * Parse LinkedIn data from wizard input using AI
   */
  async parseLinkedInData(data: LinkedInDataRequest): Promise<LinkedInDataResponse> {
    try {
      const token = localStorage.getItem('auth-token');
      
      console.log('🔧 LinkedIn Data Service - Token found:', !!token);
      console.log('🔧 LinkedIn Data Service - Data:', data);
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/linkedInData`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error parsing LinkedIn data:', error);
      throw error;
    }
  }
}

export const linkedInProfileService = new LinkedInProfileService();
