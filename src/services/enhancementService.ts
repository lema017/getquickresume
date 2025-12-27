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
  language: 'es' | 'en';
  resumeId?: string; // Optional resume ID for AI cost tracking
}

export interface GenerateQuestionsResponse {
  success: boolean;
  data?: {
    questions: Question[];
  };
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

export interface EnhanceWithContextRequest {
  sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
  originalText: string;
  userInstructions: string;
  language: 'es' | 'en';
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
  remainingRequests?: number;
  resetTime?: number;
}

export interface GenerateAnswerSuggestionRequest {
  question: string;
  questionCategory: string;
  originalText: string;
  recommendation: string;
  sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
  language: 'es' | 'en';
  resumeId?: string; // Optional resume ID for AI cost tracking
}

export interface GenerateAnswerSuggestionResponse {
  success: boolean;
  data?: {
    suggestion: string;
  };
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
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
      const response = await fetch(
        `${API_BASE_URL}/api/ai/generate-enhancement-questions`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }
      );

      const data: GenerateQuestionsResponse = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('This feature is available only for premium users. Please upgrade to access guided enhancement.');
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
        language: request.language,
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
        if (response.status === 403) {
          throw new Error('This feature is available only for premium users. Please upgrade to access guided enhancement.');
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
      const response = await fetch(
        `${API_BASE_URL}/api/ai/generate-answer-suggestion`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }
      );

      const data: GenerateAnswerSuggestionResponse = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('This feature is available only for premium users. Please upgrade to access AI suggestions.');
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
}

export const enhancementService = new EnhancementService();

