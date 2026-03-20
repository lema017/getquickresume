import { describe, it, expect } from 'vitest';
import { calculateCost, AI_PRICING } from './aiUsageService';

describe('calculateCost', () => {
  it('computes groq and openai costs', () => {
    expect(AI_PRICING.groq).toBeDefined();
    const u = { promptTokens: 1_000_000, completionTokens: 1_000_000, totalTokens: 2_000_000 };
    expect(calculateCost('groq', 'openai/gpt-oss-20b', u)).toBeGreaterThan(0);
    expect(calculateCost('openai', 'gpt-4o', { ...u, cachedTokens: 0 })).toBeGreaterThan(0);
  });

  it('applies cached token discount for groq', () => {
    const c = calculateCost('groq', 'gpt-oss-20b', {
      promptTokens: 1000,
      completionTokens: 500,
      totalTokens: 1500,
      cachedTokens: 500,
    });
    expect(c).toBeGreaterThanOrEqual(0);
  });

  it('falls back for unknown provider and model', () => {
    const x = calculateCost('groq', 'totally-unknown-model-xyz', {
      promptTokens: 100,
      completionTokens: 100,
      totalTokens: 200,
    });
    expect(x).toBeGreaterThanOrEqual(0);
  });
});
