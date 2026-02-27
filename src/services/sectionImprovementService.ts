import { ImproveSectionRequest, ImproveSectionResponse } from '@/types';
import { handleAuthError } from '@/utils/authErrorHandler';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

class SectionImprovementService {
  async improveSection(request: ImproveSectionRequest): Promise<ImproveSectionResponse> {
    const token = await this.getAuthToken();
    
    if (!token) {
      throw new Error('No autenticado');
    }
    
    // Sanitize input (frontend) - only if userInstructions is provided
    const sanitized = request.userInstructions ? this.sanitizeInput(request.userInstructions) : '';
    
    const response = await fetch(`${API_BASE_URL}/api/ai/improve-section`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...request,
        userInstructions: sanitized,
        autoEnhance: request.autoEnhance || false
      })
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
      
      throw new Error(errorData.message || 'Error al mejorar sección');
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
