import { handleAuthError } from '@/utils/authErrorHandler';
import { normalizeToApiLanguage, ApiLanguage } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

export interface Question {
  id: string;
  question: string;
  category: string;
  required: boolean;
}

export interface GenerateQuestionsRequest {
  sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
  recommendation: string;
  originalText: string;
  language?: string; // Accepts any language, normalized to 'es' | 'en' for API
  resumeId?: string; // Optional resume ID for AI cost tracking
}

export interface GenerateQuestionsResponse {
  success: boolean;
  data?: {
    questions: Question[];
  };
  error?: string;
  message?: string;
  code?: string;
  remainingRequests?: number;
  resetTime?: number;
}

export interface EnhanceWithContextRequest {
  sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
  originalText: string;
  userInstructions: string;
  language?: string; // Accepts any language, normalized to 'es' | 'en' for API
  gatheredContext: Array<{
    questionId: string;
    answer: string;
  }>;
  resumeId?: string; // Optional resume ID for AI cost tracking
}

export interface EnhanceWithContextResponse {
  success: boolean;
  data?: string;
  error?: string;
  message?: string;
  code?: string;
  remainingRequests?: number;
  resetTime?: number;
}

export interface GenerateAnswerSuggestionRequest {
  question: string;
  questionCategory: string;
  originalText: string;
  recommendation: string;
  sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
  language?: string; // Accepts any language, normalized to 'es' | 'en' for API
  resumeId?: string; // Optional resume ID for AI cost tracking
}

export interface GenerateAnswerSuggestionResponse {
  success: boolean;
  data?: {
    suggestion: string;
  };
  error?: string;
  message?: string;
  code?: string;
  remainingRequests?: number;
  resetTime?: number;
}

export interface DirectEnhanceRequest {
  checklistItemId: string;
  sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
  originalText: string;
  language?: string; // Accepts any language, normalized to 'es' | 'en' for API
  resumeId?: string;
}

export interface DirectEnhanceResponse {
  success: boolean;
  data?: string;
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
  code?: string;
}

class EnhancementService {
  private async getAuthToken(): Promise<string> {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return token;
  }

  /**
   * Generate contextual questions based on a recommendation
   */
  async generateQuestions(
    request: GenerateQuestionsRequest
  ): Promise<Question[]> {
    try {
      const token = await this.getAuthToken();
      const normalizedRequest = {
        ...request,
        language: normalizeToApiLanguage(request.language),
      };
      const response = await fetch(
        `${API_BASE_URL}/api/ai/generate-enhancement-questions`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(normalizedRequest),
        }
      );

      const data: GenerateQuestionsResponse = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Check if this is a premium feature restriction (not an auth error)
          if (data.code !== 'PREMIUM_REQUIRED') {
            handleAuthError();
          }
          throw new Error(data.message || 'This feature is available only for premium users. Please upgrade to access guided enhancement.');
        }
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait before trying again.');
        }
        throw new Error(data.message || 'Failed to generate questions');
      }

      if (!data.success || !data.data) {
        throw new Error(data.message || 'Failed to generate questions');
      }

      return data.data.questions;
    } catch (error: any) {
      if (error.message) {
        throw error;
      }
      throw new Error(error.message || 'Failed to generate questions');
    }
  }

  /**
   * Enhance a section with gathered context
   */
  async enhanceSectionWithContext(
    request: EnhanceWithContextRequest
  ): Promise<string> {
    try {
      const token = await this.getAuthToken();
      const requestBody: Record<string, unknown> = {
        sectionType: request.sectionType,
        originalText: request.originalText,
        userInstructions: request.userInstructions,
        language: normalizeToApiLanguage(request.language),
        gatheredContext: request.gatheredContext,
      };

      if (request.resumeId) {
        requestBody.resumeId = request.resumeId;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/ai/improve-section`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data: EnhanceWithContextResponse = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Check if this is a premium feature restriction (not an auth error)
          if (data.code !== 'PREMIUM_REQUIRED') {
            handleAuthError();
          }
          throw new Error(data.message || 'This feature is available only for premium users. Please upgrade to access guided enhancement.');
        }
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait before trying again.');
        }
        throw new Error(data.message || 'Failed to enhance section');
      }

      if (!data.success || !data.data) {
        throw new Error(data.message || 'Failed to enhance section');
      }

      return data.data;
    } catch (error: any) {
      if (error.message) {
        throw error;
      }
      throw new Error(error.message || 'Failed to enhance section');
    }
  }

  /**
   * Generate AI-powered answer suggestion for a question
   */
  async generateAnswerSuggestion(
    request: GenerateAnswerSuggestionRequest
  ): Promise<string> {
    try {
      const token = await this.getAuthToken();
      const normalizedRequest = {
        ...request,
        language: normalizeToApiLanguage(request.language),
      };
      const response = await fetch(
        `${API_BASE_URL}/api/ai/generate-answer-suggestion`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(normalizedRequest),
        }
      );

      const data: GenerateAnswerSuggestionResponse = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Check if this is a premium feature restriction (not an auth error)
          if (data.code !== 'PREMIUM_REQUIRED') {
            handleAuthError();
          }
          throw new Error(data.message || 'This feature is available only for premium users. Please upgrade to access AI suggestions.');
        }
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait before trying again.');
        }
        throw new Error(data.message || 'Failed to generate suggestion');
      }

      if (!data.success || !data.data) {
        throw new Error(data.message || 'Failed to generate suggestion');
      }

      return data.data.suggestion;
    } catch (error: any) {
      if (error.message) {
        throw error;
      }
      throw new Error(error.message || 'Failed to generate suggestion');
    }
  }

  /**
   * Direct enhancement for mechanical fixes that don't require user context.
   * Skips the question-gathering step and directly returns enhanced text.
   */
  async directEnhance(request: DirectEnhanceRequest): Promise<string> {
    try {
      const token = await this.getAuthToken();
      const normalizedRequest = {
        ...request,
        language: normalizeToApiLanguage(request.language),
      };
      const response = await fetch(
        `${API_BASE_URL}/api/ai/direct-enhance`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(normalizedRequest),
        }
      );

      const data: DirectEnhanceResponse = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Check if this is a premium feature restriction (not an auth error)
          if (data.code !== 'PREMIUM_REQUIRED') {
            handleAuthError();
          }
          throw new Error(data.message || 'This feature is available only for premium users. Please upgrade to access direct enhancement.');
        }
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait before trying again.');
        }
        // Handle case where item requires context
        if (data.code === 'CONTEXT_REQUIRED') {
          throw new Error('This fix requires additional context. Please use guided enhancement instead.');
        }
        throw new Error(data.message || 'Failed to enhance section');
      }

      if (!data.success || !data.data) {
        throw new Error(data.message || 'Failed to enhance section');
      }

      return data.data;
    } catch (error: any) {
      if (error.message) {
        throw error;
      }
      throw new Error(error.message || 'Failed to enhance section');
    }
  }
}

export const enhancementService = new EnhancementService();

