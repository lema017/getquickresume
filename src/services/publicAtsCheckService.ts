/**
 * Public ATS Check Service
 *
 * Calls the public (no auth) ATS check endpoint.
 * Handles rate limiting, validation errors, and response parsing.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

export interface AtsKeywordAnalysis {
  totalFound: number;
  categories: {
    hardSkills: number;
    softSkills: number;
    actionVerbs: number;
    industryTerms: number;
  };
  topKeywords: string[];
  atsLevel: 'excellent' | 'good' | 'fair' | 'needs-work';
}

export interface PublicAtsCheckResult {
  score: number;
  sections: {
    found: string[];
    missing: string[];
  };
  keywordAnalysis: AtsKeywordAnalysis;
  tips: string[];
  improvementCount: number;
  detailedImprovements: string[];
  remaining: number;
}

export interface PublicAtsCheckError {
  type: 'rate_limit' | 'validation' | 'server';
  message: string;
  remaining?: number;
  resetTime?: number;
}

export async function checkAtsPublic(
  text: string,
  profession?: string
): Promise<PublicAtsCheckResult> {
  const body: Record<string, string> = { text };
  if (profession) body.profession = profession;

  const response = await fetch(`${API_BASE_URL}/api/public/ats-check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    const error: PublicAtsCheckError = {
      type: response.status === 429 ? 'rate_limit' : response.status === 400 ? 'validation' : 'server',
      message: data.error || 'ATS check failed',
      remaining: data.remaining,
      resetTime: data.resetTime,
    };
    throw error;
  }

  if (!data.success || !data.data) {
    const error: PublicAtsCheckError = {
      type: 'server',
      message: data.error || 'Unexpected response from server',
    };
    throw error;
  }

  return {
    ...data.data,
    remaining: data.remaining ?? 0,
  };
}

/**
 * Check if an error is a PublicAtsCheckError
 */
export function isPublicAtsCheckError(error: unknown): error is PublicAtsCheckError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    'message' in error
  );
}
