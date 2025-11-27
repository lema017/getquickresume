import { ImproveSectionRequest, ImproveSectionResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

class SectionImprovementService {
  async improveSection(request: ImproveSectionRequest): Promise<ImproveSectionResponse> {
    const token = await this.getAuthToken();
    
    if (!token) {
      throw new Error('No autenticado');
    }
    
    // Sanitize input (frontend)
    const sanitized = this.sanitizeInput(request.userInstructions);
    
    const response = await fetch(`${API_BASE_URL}/api/ai/improve-section`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...request,
        userInstructions: sanitized
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al mejorar sección');
    }
    
    return response.json();
  }
  
  private sanitizeInput(input: string): string {
    // Remove HTML tags
    let sanitized = input.replace(/<[^>]*>/g, '');
    // Remove dangerous patterns
    sanitized = sanitized.replace(/[<>]/g, '');
    // Limit length
    return sanitized.slice(0, 500);
  }
  
  private async getAuthToken(): Promise<string | null> {
    try {
      // Try to get token from localStorage or auth store
      const token = localStorage.getItem('auth-token');
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }
}

export const sectionImprovementService = new SectionImprovementService();
