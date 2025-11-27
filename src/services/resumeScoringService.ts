import { ResumeScore, ScoreResumeResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ResumeScoringService {
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
      throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Score a resume on-demand (premium feature)
   */
  async scoreResume(resumeId: string): Promise<ResumeScore> {
    try {
      const response = await this.makeRequest<ScoreResumeResponse>(
        `api/resumes/${resumeId}/score`,
        {
          method: 'POST',
        }
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to score resume');
      }

      return response.data;
    } catch (error) {
      console.error('Error scoring resume:', error);
      throw error;
    }
  }

  /**
   * Get existing resume score
   */
  async getResumeScore(resumeId: string): Promise<ResumeScore | null> {
    try {
      const token = await this.getAuthToken();
      const response = await fetch(`${API_BASE_URL}/api/resumes/${resumeId}/score`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      // 404 means score doesn't exist yet - this is normal, not an error
      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as ScoreResumeResponse;
      if (!data.success || !data.data) {
        return null;
      }

      return data.data;
    } catch (error) {
      // Only log actual errors, not 404s (which are normal)
      if (error instanceof Error && !error.message.includes('Score not found')) {
        console.error('Error getting resume score:', error);
      }
      // Return null for any error - score just doesn't exist yet
      return null;
    }
  }
}

export const resumeScoringService = new ResumeScoringService();

