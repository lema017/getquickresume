import { JobInterest, JobInterestData, ApiResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

class JobInterestService {
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
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async listJobInterests(): Promise<JobInterest[]> {
    try {
      const response = await this.makeRequest<ApiResponse<JobInterest[]>>('api/job-interests');
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch job interests');
      }
      return response.data;
    } catch (error) {
      console.error('Error listing job interests:', error);
      throw error;
    }
  }

  async getJobInterest(id: string): Promise<JobInterest> {
    try {
      const response = await this.makeRequest<ApiResponse<JobInterest>>(`api/job-interests/${id}`);
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch job interest');
      }
      return response.data;
    } catch (error) {
      console.error('Error getting job interest:', error);
      throw error;
    }
  }

  async createJobInterest(jobData: JobInterestData): Promise<JobInterest> {
    try {
      const response = await this.makeRequest<ApiResponse<JobInterest>>('api/job-interests', {
        method: 'POST',
        body: JSON.stringify(jobData),
      });
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to create job interest');
      }
      return response.data;
    } catch (error) {
      console.error('Error creating job interest:', error);
      throw error;
    }
  }

  async updateJobInterest(id: string, updates: Partial<JobInterest>): Promise<JobInterest> {
    try {
      const response = await this.makeRequest<ApiResponse<JobInterest>>(`api/job-interests/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to update job interest');
      }
      return response.data;
    } catch (error) {
      console.error('Error updating job interest:', error);
      throw error;
    }
  }

  async deleteJobInterest(id: string): Promise<void> {
    try {
      await this.makeRequest<ApiResponse>(`api/job-interests/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting job interest:', error);
      throw error;
    }
  }

  async optimizeResumeForJob(jobId: string, resumeId: string): Promise<JobInterest> {
    try {
      const response = await this.makeRequest<ApiResponse<JobInterest>>(`api/job-interests/${jobId}/optimize`, {
        method: 'POST',
        body: JSON.stringify({ resumeId }),
      });
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to optimize resume for job');
      }
      return response.data;
    } catch (error) {
      console.error('Error optimizing resume for job:', error);
      throw error;
    }
  }

  // Helper methods
  getJobInterestStats(jobInterests: JobInterest[]): {
    total: number;
    active: number;
    applied: number;
    closed: number;
  } {
    return {
      total: jobInterests.length,
      active: jobInterests.filter(job => job.status === 'active').length,
      applied: jobInterests.filter(job => job.status === 'applied').length,
      closed: jobInterests.filter(job => job.status === 'closed').length,
    };
  }

  formatJobDescription(description: string, maxLength: number = 200): string {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength).trim() + '...';
  }

  extractCompanyFromUrl(url: string): string | null {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;
      
      // Extract company name from common job board domains
      if (hostname.includes('linkedin.com')) return 'LinkedIn';
      if (hostname.includes('indeed.com')) return 'Indeed';
      if (hostname.includes('glassdoor.com')) return 'Glassdoor';
      if (hostname.includes('monster.com')) return 'Monster';
      if (hostname.includes('ziprecruiter.com')) return 'ZipRecruiter';
      
      // For direct company websites, try to extract company name
      const parts = hostname.split('.');
      if (parts.length >= 2) {
        return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      }
      
      return null;
    } catch {
      return null;
    }
  }
}

export const jobInterestService = new JobInterestService();
