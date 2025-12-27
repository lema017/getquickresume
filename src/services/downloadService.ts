const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

export interface TrackDownloadResponse {
  success: boolean;
  data?: {
    allowed: boolean;
    freeDownloadUsed: boolean;
    totalDownloads: number;
  };
  error?: string;
  message?: string;
}

export const downloadService = {
  /**
   * Tracks a resume download and checks if download is allowed
   * @param resumeId - The resume ID to download
   * @returns Download tracking result
   */
  async trackDownload(resumeId: string): Promise<{
    allowed: boolean;
    freeDownloadUsed: boolean;
    totalDownloads: number;
  }> {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_URL}/api/resumes/${resumeId}/download/track`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data: TrackDownloadResponse = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 403) {
          // Download limit reached
          return {
            allowed: false,
            freeDownloadUsed: data.data?.freeDownloadUsed || false,
            totalDownloads: data.data?.totalDownloads || 0,
          };
        }

        if (response.status === 404) {
          throw new Error('Resume not found');
        }

        if (response.status === 401) {
          throw new Error('Unauthorized - please log in again');
        }

        throw new Error(data.message || data.error || 'Failed to track download');
      }

      if (!data.success || !data.data) {
        throw new Error(data.message || 'Invalid response from server');
      }

      return {
        allowed: data.data.allowed,
        freeDownloadUsed: data.data.freeDownloadUsed,
        totalDownloads: data.data.totalDownloads,
      };
    } catch (error) {
      console.error('Error tracking download:', error);
      throw error;
    }
  },
};

