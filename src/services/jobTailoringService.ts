// Job Tailoring Service - Real API Implementation
// Makes API calls to the job tailoring backend endpoints

import {
  UrlValidationResult,
  JobPostingInfo,
  JobAnalysisResult,
  ClarificationQuestion,
  ClarificationAnswer,
  TailoringResult,
  TailoringLimits,
  GenerateTailoredResumeRequest,
  IncorporateKeywordRequest,
  IncorporateKeywordResponse,
} from '@/types/jobTailoring';
import { validateUrlFormat, isSupportedJobBoard, getJobBoardName, normalizeUrl } from '@/utils/urlValidation';
import { Resume, GeneratedResume, normalizeToApiLanguage, ApiLanguage } from '@/types';
import { handleAuthError } from '@/utils/authErrorHandler';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

// ============================================================================
// API Helper Functions
// ============================================================================

async function getAuthToken(): Promise<string> {
  const token = localStorage.getItem('auth-token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return token;
}

async function makeRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAuthToken();

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    // Handle premium required error (403) - do NOT logout
    if (response.status === 403 && data.code === 'PREMIUM_REQUIRED') {
      const error = new Error(data.message || 'Premium feature required');
      (error as any).code = 'PREMIUM_REQUIRED';
      (error as any).statusCode = 403;
      throw error;
    }

    // Handle rate limit error (429) - do NOT logout
    if (response.status === 429) {
      const error = new Error(data.message || 'Rate limit exceeded. Please wait before making another request.');
      (error as any).code = 'RATE_LIMIT';
      (error as any).statusCode = 429;
      (error as any).resetTime = data.resetTime;
      throw error;
    }

    // Handle auth errors (401/403) - logout and redirect
    if (response.status === 401 || response.status === 403) {
      handleAuthError();
      const error = new Error('Session expired. Please log in again.');
      (error as any).code = 'UNAUTHORIZED';
      (error as any).statusCode = response.status;
      throw error;
    }

    const error = new Error(data.error || data.message || `HTTP error! status: ${response.status}`);
    (error as any).code = data.code;
    (error as any).statusCode = response.status;
    throw error;
  }

  return data;
}

// ============================================================================
// URL Validation/Extraction API
// ============================================================================

interface ValidateUrlResponse {
  success: boolean;
  data?: UrlValidationResult;
  error?: {
    code: 'INVALID_FORMAT' | 'UNREACHABLE' | 'NOT_JOB_POSTING' | 'EXTRACTION_FAILED' | 'RATE_LIMIT';
    message: string;
  };
  remainingRequests?: number;
  resetTime?: number;
}

/**
 * Validate a job posting URL and extract job data using API
 * Does minimal client-side format validation, then calls API for extraction
 */
export async function validateJobUrl(url: string): Promise<UrlValidationResult> {
  // Minimal client-side format check first
  const formatValidation = validateUrlFormat(url);
  if (!formatValidation.isValid) {
    return {
      isValid: false,
      isReachable: false,
      hasJobContent: false,
      error: {
        code: 'INVALID_FORMAT',
        message: formatValidation.error || 'Invalid URL format'
      }
    };
  }

  // Call API for extraction
  try {
    const response = await makeRequest<ValidateUrlResponse>(
      'api/job-tailoring/validate-url',
      {
        method: 'POST',
        body: JSON.stringify({ url }),
      }
    );

    if (!response.success || !response.data) {
      return {
        isValid: true,
        isReachable: false,
        hasJobContent: false,
        error: response.error || {
          code: 'EXTRACTION_FAILED',
          message: 'Failed to extract job posting data'
        }
      };
    }

    return response.data;
  } catch (error: any) {
    // Handle API errors
    const errorCode = error.code || 'EXTRACTION_FAILED';
    return {
      isValid: true,
      isReachable: false,
      hasJobContent: false,
      error: {
        code: errorCode as NonNullable<UrlValidationResult['error']>['code'],
        message: error.message || 'Failed to validate URL'
      }
    };
  }
}

// ============================================================================
// Job Analysis API
// ============================================================================

interface AnalyzeJobResponse {
  success: boolean;
  data?: JobAnalysisResult;
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

/**
 * Analyze a job posting and extract structured information
 */
export async function analyzeJobPosting(
  description: string,
  resumeId: string,
  language?: string
): Promise<JobAnalysisResult> {
  try {
    const response = await makeRequest<AnalyzeJobResponse>(
      'api/job-tailoring/analyze',
      {
        method: 'POST',
        body: JSON.stringify({
          resumeId,
          description,
          language: normalizeToApiLanguage(language)
        }),
      }
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to analyze job posting');
    }

    return response.data;
  } catch (error) {
    console.error('Error analyzing job posting:', error);
    throw error;
  }
}

// ============================================================================
// Clarification Questions API
// ============================================================================

interface GenerateQuestionsResponse {
  success: boolean;
  data?: ClarificationQuestion[];
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

/**
 * Generate AI clarification questions based on job requirements and resume gaps
 * Optionally accepts analysis suggestions to generate targeted questions
 */
export async function generateClarificationQuestions(
  resumeId: string,
  jobInfo: JobPostingInfo,
  language?: string,
  suggestions?: string[]
): Promise<ClarificationQuestion[]> {
  try {
    const response = await makeRequest<GenerateQuestionsResponse>(
      'api/job-tailoring/questions',
      {
        method: 'POST',
        body: JSON.stringify({
          resumeId,
          jobInfo,
          language: normalizeToApiLanguage(language),
          suggestions
        }),
      }
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to generate questions');
    }

    return response.data;
  } catch (error) {
    console.error('Error generating clarification questions:', error);
    throw error;
  }
}

// ============================================================================
// Enhance Answer API
// ============================================================================

interface EnhanceAnswerResponse {
  success: boolean;
  data?: string;
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

/**
 * Enhance user's answer with AI suggestions
 */
export async function enhanceAnswer(
  text: string,
  context: string,
  questionId: string,
  language?: string,
  resumeId?: string,
  question?: string,
  jobInfo?: JobPostingInfo
): Promise<string> {
  try {
    const response = await makeRequest<EnhanceAnswerResponse>(
      'api/job-tailoring/enhance-answer',
      {
        method: 'POST',
        body: JSON.stringify({
          text,
          context,
          questionId,
          language: normalizeToApiLanguage(language),
          resumeId,
          question,
          jobInfo
        }),
      }
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to enhance answer');
    }

    return response.data;
  } catch (error) {
    console.error('Error enhancing answer:', error);
    throw error;
  }
}

// ============================================================================
// Generate Tailored Resume API
// ============================================================================

interface GenerateTailoredResumeResponse {
  success: boolean;
  data?: {
    tailoredResume: GeneratedResume;
    result: TailoringResult;
  };
  error?: string;
  code?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

/**
 * Generate tailored resume based on job info and user answers
 */
export async function generateTailoredResume(
  request: GenerateTailoredResumeRequest,
  originalResume: Resume
): Promise<{ tailoredResume: GeneratedResume; result: TailoringResult }> {
  try {
    const response = await makeRequest<GenerateTailoredResumeResponse>(
      'api/job-tailoring/generate',
      {
        method: 'POST',
        body: JSON.stringify({
          resumeId: request.resumeId,
          jobInfo: request.jobInfo,
          answers: request.answers,
          language: normalizeToApiLanguage(request.language),
          matchScoreBefore: request.matchScoreBefore || 60,  // Pass initial match score
          matchingSkills: request.matchingSkills || []       // Pass matching skills from initial analysis
        }),
      }
    );

    if (!response.success || !response.data) {
      const error = new Error(response.error || 'Failed to generate tailored resume');
      (error as any).code = response.code;
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Error generating tailored resume:', error);
    throw error;
  }
}

// ============================================================================
// Tailoring Limits API
// ============================================================================

interface TailoringLimitsResponse {
  success: boolean;
  data?: TailoringLimits;
  error?: string;
  message?: string;
}

/**
 * Get user's tailoring usage limits
 */
export async function getTailoringLimits(userId?: string, isPremium?: boolean): Promise<TailoringLimits> {
  try {
    const response = await makeRequest<TailoringLimitsResponse>(
      'api/job-tailoring/limits',
      {
        method: 'GET',
      }
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to get tailoring limits');
    }

    return response.data;
  } catch (error) {
    console.error('Error getting tailoring limits:', error);
    // Return default limits if API fails
    return {
      used: 0,
      limit: 1,
      isPremium: false
    };
  }
}

// ============================================================================
// Save Tailored Resume API
// ============================================================================

interface SaveTailoredResumeResponse {
  success: boolean;
  resumeId?: string;
  error?: string;
  message?: string;
}

/**
 * Save tailored resume
 */
export async function saveTailoredResume(
  originalResumeId: string,
  tailoredResume: GeneratedResume,
  tailoringResult: TailoringResult,
  jobInfo: JobPostingInfo,
  answers: ClarificationAnswer[],
  matchScore: number,
  title: string
): Promise<{ resumeId: string }> {
  try {
    const response = await makeRequest<SaveTailoredResumeResponse>(
      'api/job-tailoring/save',
      {
        method: 'POST',
        body: JSON.stringify({
          sourceResumeId: originalResumeId,
          tailoredResume,
          tailoringResult,
          jobInfo,
          answers,
          matchScore,
          title
        }),
      }
    );

    if (!response.success || !response.resumeId) {
      throw new Error(response.error || 'Failed to save tailored resume');
    }

    return { resumeId: response.resumeId };
  } catch (error) {
    console.error('Error saving tailored resume:', error);
    throw error;
  }
}

// ============================================================================
// Incorporate Keyword API
// ============================================================================

/**
 * Incorporate a missing keyword into the tailored resume
 */
export async function incorporateKeyword(
  request: IncorporateKeywordRequest
): Promise<{
  updatedSections: {
    skills?: any;
    professionalSummary?: string;
    experience?: any[];
  };
  changesSummary: string[];
}> {
  try {
    const response = await makeRequest<IncorporateKeywordResponse>(
      'api/job-tailoring/incorporate-keyword',
      {
        method: 'POST',
        body: JSON.stringify({
          ...request,
          language: normalizeToApiLanguage(request.language),
        }),
      }
    );

    if (!response.success || !response.data) {
      const error = new Error(response.error || 'Failed to incorporate keyword');
      (error as any).code = response.code;
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Error incorporating keyword:', error);
    throw error;
  }
}

// ============================================================================
// Export service object for convenience
// ============================================================================

export const jobTailoringService = {
  validateJobUrl,
  analyzeJobPosting,
  generateClarificationQuestions,
  enhanceAnswer,
  generateTailoredResume,
  getTailoringLimits,
  saveTailoredResume,
  generateAnswerOptions,
  incorporateKeyword,
};

export default jobTailoringService;

// ============================================================================
// Generate Answer Options
// ============================================================================

interface GenerateAnswerOptionsResponse {
  success: boolean;
  data?: {
    questionId: string;
    options: string[];
  };
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

/**
 * Generate 3 AI-powered answer options for a clarification question
 */
export async function generateAnswerOptions(
  questionId: string,
  question: string,
  context: string,
  resumeId: string,
  jobInfo: JobPostingInfo,
  language?: string
): Promise<string[]> {
  try {
    const response = await makeRequest<GenerateAnswerOptionsResponse>(
      'api/job-tailoring/generate-answer-options',
      {
        method: 'POST',
        body: JSON.stringify({
          questionId,
          question,
          context,
          resumeId,
          jobInfo,
          language: normalizeToApiLanguage(language)
        }),
      }
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to generate answer options');
    }

    return response.data.options;
  } catch (error) {
    console.error('Error generating answer options:', error);
    throw error;
  }
}

// Update service export
export const jobTailoringServiceWithOptions = {
  ...jobTailoringService,
  generateAnswerOptions,
};
