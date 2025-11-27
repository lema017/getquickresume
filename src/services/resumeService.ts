import { ResumeData, GenerateResumeRequest, GenerateResumeResponse, GeneratedResume, Resume, ApiResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

class ResumeService {
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

  async generateResume(resumeData: ResumeData, resumeId?: string): Promise<GenerateResumeResponse> {
    try {
      const request: GenerateResumeRequest = {
        resumeData,
        resumeId
      };
      

      const response = await this.makeRequest<GenerateResumeResponse>(
        'api/resume/generate',
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to generate resume');
      }

      return response;
    } catch (error) {
      console.error('Error generating resume:', error);
      throw error;
    }
  }


  // Método para obtener información del CV generado
  getGeneratedResumeFromStorage(): GeneratedResume | null {
    try {
      const stored = localStorage.getItem('generated-resume');
      if (stored) {
        return JSON.parse(stored);
      }
      return null;
    } catch (error) {
      console.error('Error loading generated resume from storage:', error);
      return null;
    }
  }

  // Método para guardar el CV generado en localStorage
  saveGeneratedResumeToStorage(resume: GeneratedResume): void {
    try {
      localStorage.setItem('generated-resume', JSON.stringify(resume));
    } catch (error) {
      console.error('Error saving generated resume to storage:', error);
    }
  }

  // Método para limpiar el CV generado del storage
  clearGeneratedResumeFromStorage(): void {
    try {
      localStorage.removeItem('generated-resume');
    } catch (error) {
      console.error('Error clearing generated resume from storage:', error);
    }
  }

  // Método para exportar el CV como PDF (placeholder)
  async exportToPDF(resume: GeneratedResume): Promise<Blob> {
    // Esta función sería implementada con una librería como jsPDF o Puppeteer
    // Por ahora, retornamos un placeholder
    throw new Error('PDF export not implemented yet');
  }

  // Método para obtener estadísticas del CV generado
  getResumeStats(resume: GeneratedResume): {
    totalWords: number;
    experienceCount: number;
    educationCount: number;
    projectCount: number;
    certificationCount: number;
    skillCount: number;
  } {
    const totalWords = resume.professionalSummary.split(' ').length +
      resume.experience.reduce((acc, exp) => 
        acc + exp.description.split(' ').length + 
        exp.achievements.join(' ').split(' ').length, 0) +
      resume.education.reduce((acc, edu) => 
        acc + edu.degree.split(' ').length + edu.field.split(' ').length, 0);

    return {
      totalWords,
      experienceCount: resume.experience.length,
      educationCount: resume.education.length,
      projectCount: resume.projects.length,
      certificationCount: resume.certifications.length,
      skillCount: resume.skills.technical.length + resume.skills.soft.length + resume.skills.tools.length
    };
  }

  // CRUD Operations for Resumes
  async listResumes(): Promise<Resume[]> {
    try {
      const response = await this.makeRequest<ApiResponse<Resume[]>>('api/resumes');
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch resumes');
      }
      return response.data;
    } catch (error) {
      console.error('Error listing resumes:', error);
      throw error;
    }
  }

  async getResume(id: string): Promise<Resume> {
    try {
      const response = await this.makeRequest<ApiResponse<Resume>>(`api/resumes/${id}`);
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch resume');
      }
      return response.data;
    } catch (error) {
      console.error('Error getting resume:', error);
      throw error;
    }
  }

  async createResume(resumeData: ResumeData, title?: string): Promise<Resume> {
    try {
      const response = await this.makeRequest<ApiResponse<Resume>>('api/resumes', {
        method: 'POST',
        body: JSON.stringify({ resumeData, title }),
      });
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to create resume');
      }
      return response.data;
    } catch (error) {
      console.error('Error creating resume:', error);
      throw error;
    }
  }

  async updateResume(id: string, updates: Partial<Resume>): Promise<Resume> {
    try {
      const response = await this.makeRequest<ApiResponse<Resume>>(`api/resumes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to update resume');
      }
      return response.data;
    } catch (error) {
      console.error('Error updating resume:', error);
      throw error;
    }
  }

  async deleteResume(id: string): Promise<void> {
    try {
      await this.makeRequest<ApiResponse>(`api/resumes/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw error;
    }
  }

  async downloadResume(id: string, format: 'pdf' | 'docx'): Promise<Blob> {
    try {
      const token = await this.getAuthToken();
      const response = await fetch(`${API_BASE_URL}/api/resumes/${id}/download?format=${format}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to download resume: ${response.statusText}`);
      }

      return response.blob();
    } catch (error) {
      console.error('Error downloading resume:', error);
      throw error;
    }
  }
}

export const resumeService = new ResumeService();
