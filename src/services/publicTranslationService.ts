/**
 * Public Translation Service
 *
 * Calls the public (no auth) translation endpoint.
 * Handles rate limiting, validation errors, and response parsing.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

export interface PublicTranslationResult {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  scoreTeaser: {
    score: number;
    improvementCount: number;
  };
  remaining: number;
}

export interface PublicTranslationError {
  type: 'rate_limit' | 'validation' | 'server';
  message: string;
  remaining?: number;
  resetTime?: number;
}

export async function translateResumePublic(
  text: string,
  targetLanguage: string,
  sourceLanguage?: string
): Promise<PublicTranslationResult> {
  const body: Record<string, string> = { text, targetLanguage };
  if (sourceLanguage) body.sourceLanguage = sourceLanguage;

  const response = await fetch(`${API_BASE_URL}/api/public/translate-resume`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    const error: PublicTranslationError = {
      type: response.status === 429 ? 'rate_limit' : response.status === 400 ? 'validation' : 'server',
      message: data.error || 'Translation failed',
      remaining: data.remaining,
      resetTime: data.resetTime,
    };
    throw error;
  }

  if (!data.success || !data.data) {
    const error: PublicTranslationError = {
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
 * Check if an error is a PublicTranslationError
 */
export function isPublicTranslationError(error: unknown): error is PublicTranslationError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    'message' in error
  );
}
