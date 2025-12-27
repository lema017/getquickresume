import { Resume } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

export interface SharingResponse {
  success: boolean;
  data?: {
    shareToken: string;
    shareUrl: string;
    isPubliclyShared: boolean;
  };
  error?: string;
  message?: string;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueViews: number;
  viewsByDevice: {
    mobile: number;
    desktop: number;
    tablet: number;
    unknown: number;
  };
  viewsByBrowser: Record<string, number>;
  viewsByCountry: Record<string, number>;
  viewsByCity: Record<string, number>;
  viewsOverTime: Array<{
    date: string;
    count: number;
  }>;
}

export interface AnalyticsResponse {
  success: boolean;
  data?: AnalyticsSummary;
  error?: string;
}

class ResumeSharingService {
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
      throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async enableSharing(resumeId: string): Promise<SharingResponse> {
    return this.makeRequest<SharingResponse>(
      `api/resumes/${resumeId}/share`,
      {
        method: 'POST',
      }
    );
  }

  async disableSharing(resumeId: string): Promise<{ success: boolean; message?: string }> {
    return this.makeRequest<{ success: boolean; message?: string }>(
      `api/resumes/${resumeId}/share`,
      {
        method: 'DELETE',
      }
    );
  }

  async getAnalytics(resumeId: string): Promise<AnalyticsResponse> {
    return this.makeRequest<AnalyticsResponse>(
      `api/resumes/${resumeId}/share/analytics`,
      {
        method: 'GET',
      }
    );
  }
}

export const resumeSharingService = new ResumeSharingService();

