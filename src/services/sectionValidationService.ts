/**
 * Section Validation Service
 * 
 * Client for the secure /api/resume/validate-section endpoint.
 * Used for pre-save validation of resume section data.
 */

import { handleAuthError } from '@/utils/authErrorHandler';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

// ============================================================================
// Types
// ============================================================================

export interface FieldError {
  index?: number;     // Entry index (for arrays like education)
  field: string;      // Field name (e.g., "field", "institution")
  value: string;      // The invalid value
  reason: string;     // Why it's invalid
}

export type ValidatableSection = 'education' | 'skills' | 'languages' | 'contact';

interface ValidateSectionResponse {
  success: boolean;
  isValid?: boolean;
  errors?: FieldError[];
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
  code?: string;
}

// ============================================================================
// Service
// ============================================================================

class SectionValidationService {
  private async getAuthToken(): Promise<string> {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return token;
  }

  /**
   * Validate section data using AI before saving
   * 
   * @param section - The section type to validate
   * @param data - The section data to validate
   * @returns Validation result with any field errors
   */
  async validateSection(
    section: ValidatableSection,
    data: any
  ): Promise<{ isValid: boolean; errors: FieldError[] }> {
    const token = await this.getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api/resume/validate-section`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ section, data }),
    });

    if (!response.ok) {
      const errorData: ValidateSectionResponse = await response.json().catch(() => ({}));
      
      // Handle rate limit exceeded
      if (response.status === 429) {
        const error = new Error(errorData.message || 'Too many validation requests. Please wait.');
        (error as any).code = 'RATE_LIMIT_EXCEEDED';
        (error as any).resetTime = errorData.resetTime;
        throw error;
      }
      
      // Handle auth errors (401/403) - logout and redirect
      if (response.status === 401 || response.status === 403) {
        handleAuthError();
        throw new Error('Session expired. Please log in again.');
      }
      
      throw new Error(errorData.error || errorData.message || 'Validation failed');
    }

    const result: ValidateSectionResponse = await response.json();
    
    return {
      isValid: result.isValid ?? true,
      errors: result.errors ?? [],
    };
  }
}

export const sectionValidationService = new SectionValidationService();
