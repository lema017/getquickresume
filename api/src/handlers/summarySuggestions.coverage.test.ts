import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { User } from '../types';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';

const getUserById = vi.hoisted(() => vi.fn());
const checkRateLimit = vi.hoisted(() => vi.fn());
const refundRateLimit = vi.hoisted(() => vi.fn());
const verifyResumeOwnership = vi.hoisted(() => vi.fn());
const generateSummarySuggestions = vi.hoisted(() => vi.fn());

vi.mock('../services/dynamodb', () => ({ getUserById }));
vi.mock('../middleware/rateLimiter', () => ({ checkRateLimit, refundRateLimit }));
vi.mock('../services/resumeService', () => ({ verifyResumeOwnership }));
vi.mock('../services/aiService', () => ({
  aiService: { generateSummarySuggestions },
}));

import {
  generateSuggestions as genSummary,
  generateSuggestionsOptions as summaryOptions,
} from './summarySuggestions';

function user(over: Partial<User> = {}): User {
  const now = new Date().toISOString();
  return {
    id: 'u1',
    email: 'e@test.com',
    firstName: 'A',
    lastName: 'B',
    provider: 'google',
    isPremium: true,
    freeResumeUsed: false,
    premiumResumeCount: 0,
    premiumResumeMonth: '2026-01',
    freeDownloadUsed: false,
    totalDownloads: 0,
    freeCoverLetterUsed: false,
    premiumCoverLetterCount: 0,
    premiumCoverLetterMonth: '2026-01',
    createdAt: now,
    updatedAt: now,
    ...over,
  };
}

const validBody = {
  profession: 'Dev',
  achievements: ['a'],
  projectDescriptions: ['p'],
  type: 'experience' as const,
  language: 'en',
};

function post(body: object) {
  return makeAuthorizedEvent({ httpMethod: 'POST', body: JSON.stringify(body) });
}

describe('summarySuggestions generateSuggestions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 9,
      resetTime: Date.now() + 60000,
    });
    generateSummarySuggestions.mockResolvedValue(['x']);
  });

  it('401', async () => {
    const ev = makeAuthorizedEvent();
    (ev as { requestContext: { authorizer?: unknown } }).requestContext.authorizer = undefined;
    expect((await genSummary(ev)).statusCode).toBe(401);
  });

  it('404', async () => {
    getUserById.mockResolvedValueOnce(null);
    expect((await genSummary(post(validBody))).statusCode).toBe(404);
  });

  it('403 free exhausted', async () => {
    getUserById.mockResolvedValueOnce(user({ isPremium: false, freeResumeUsed: true }));
    expect((await genSummary(post(validBody))).statusCode).toBe(403);
  });

  it('429', async () => {
    getUserById.mockResolvedValueOnce(user());
    checkRateLimit.mockResolvedValueOnce({ allowed: false, remaining: 0, resetTime: 1 });
    expect((await genSummary(post(validBody))).statusCode).toBe(429);
  });

  it('400 no body', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect(
      (await genSummary(makeAuthorizedEvent({ httpMethod: 'POST', body: null }))).statusCode
    ).toBe(400);
  });

  it('400 bad json', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect(
      (await genSummary(makeAuthorizedEvent({ httpMethod: 'POST', body: '[' }))).statusCode
    ).toBe(400);
  });

  it('400 missing profession', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect((await genSummary(post({ ...validBody, profession: '' }))).statusCode).toBe(400);
  });

  it('400 achievements', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect((await genSummary(post({ ...validBody, achievements: 'x' }))).statusCode).toBe(400);
  });

  it('400 projectDescriptions', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect(
      (await genSummary(post({ ...validBody, projectDescriptions: null }))).statusCode
    ).toBe(400);
  });

  it('400 type', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect((await genSummary(post({ ...validBody, type: 'other' }))).statusCode).toBe(400);
  });

  it('400 language', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect((await genSummary(post({ ...validBody, language: 'de' }))).statusCode).toBe(400);
  });

  it('403 resume', async () => {
    getUserById.mockResolvedValueOnce(user());
    verifyResumeOwnership.mockResolvedValueOnce(false);
    expect((await genSummary(post({ ...validBody, resumeId: 'r' }))).statusCode).toBe(403);
  });

  it('200', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect((await genSummary(post(validBody))).statusCode).toBe(200);
  });

  it('500 refunds', async () => {
    getUserById.mockResolvedValueOnce(user());
    generateSummarySuggestions.mockRejectedValueOnce(new Error('x'));
    expect((await genSummary(post(validBody))).statusCode).toBe(500);
    expect(refundRateLimit).toHaveBeenCalled();
  });
});

describe('summary options', () => {
  it('cors', async () => {
    expect((await summaryOptions()).statusCode).toBe(200);
  });
});
