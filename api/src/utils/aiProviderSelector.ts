/**
 * AI Provider Selector Utility
 * 
 * Controls which AI provider (OpenAI or Groq) is used for premium users.
 * The selection is based on the PREMIUM_AI_PROVIDER environment variable.
 * 
 * - Free users: Always use Groq with openai/gpt-oss-20b
 * - Premium users: Use provider based on PREMIUM_AI_PROVIDER env var
 *   - 'openai': Use OpenAI with gpt-4o (or AI_MODEL env var)
 *   - 'groq': Use Groq with llama-3.3-70b-versatile
 */

import { AIProvider } from '../services/aiUsageService';

export interface AIModelConfig {
  provider: AIProvider;
  model: string;
}

// Read from environment once at module load time
const PREMIUM_PROVIDER = process.env.PREMIUM_AI_PROVIDER || 'openai';

// Model constants
export const GROQ_PREMIUM_MODEL = 'llama-3.3-70b-versatile';
export const GROQ_FREE_MODEL = 'openai/gpt-oss-20b';
export const OPENAI_DEFAULT_MODEL = process.env.AI_MODEL || 'gpt-4o';

/**
 * Get the AI configuration for a user based on their premium status.
 * 
 * @param isPremium - Whether the user has a premium subscription
 * @returns AIModelConfig with provider and model to use
 */
export function getAIConfigForUser(isPremium: boolean): AIModelConfig {
  // Free users always use Groq with the free model
  if (!isPremium) {
    return { 
      provider: 'groq', 
      model: GROQ_FREE_MODEL 
    };
  }
  
  // Premium users: check the feature flag
  if (PREMIUM_PROVIDER === 'groq') {
    return { 
      provider: 'groq', 
      model: GROQ_PREMIUM_MODEL 
    };
  }
  
  // Default: OpenAI for premium users
  return { 
    provider: 'openai', 
    model: OPENAI_DEFAULT_MODEL 
  };
}

/**
 * Get the current premium provider setting.
 * 
 * @returns The provider configured for premium users ('openai' or 'groq')
 */
export function getPremiumProvider(): 'openai' | 'groq' {
  return PREMIUM_PROVIDER as 'openai' | 'groq';
}

/**
 * Check if premium users are configured to use Groq.
 * 
 * @returns true if PREMIUM_AI_PROVIDER is set to 'groq'
 */
export function isPremiumUsingGroq(): boolean {
  return PREMIUM_PROVIDER === 'groq';
}

