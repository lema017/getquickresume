import { Resume } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

export interface PublicResumeResponse {
  success: boolean;
  data?: Resume;
  error?: string;
}

class PublicResumeService {
  async getPublicResume(shareToken: string): Promise<PublicResumeResponse> {
    const response = await fetch(`${API_BASE_URL}/api/public/resume/${shareToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async recordView(shareToken: string): Promise<void> {
    // Fire and forget - don't wait for response
    fetch(`${API_BASE_URL}/api/public/resume/${shareToken}/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(err => {
      console.error('Error recording view:', err);
      // Silently fail - analytics shouldn't break the user experience
    });
  }
}

export const publicResumeService = new PublicResumeService();

