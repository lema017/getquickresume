import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { User } from '../types';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';

const getUserById = vi.hoisted(() => vi.fn());
const checkRateLimit = vi.hoisted(() => vi.fn());
const refundRateLimit = vi.hoisted(() => vi.fn());
const logSuspiciousActivity = vi.hoisted(() => vi.fn());
const verifyResumeOwnership = vi.hoisted(() => vi.fn());
const generateAnswerSuggestion = vi.hoisted(() => vi.fn());

vi.mock('../services/dynamodb', () => ({ getUserById }));
vi.mock('../middleware/rateLimiter', () => ({
  checkRateLimit,
  refundRateLimit,
  logSuspiciousActivity,
}));
vi.mock('../services/resumeService', () => ({ verifyResumeOwnership }));
vi.mock('../services/aiService', () => ({
  aiService: { generateAnswerSuggestion },
}));

import {
  generateAnswerSuggestion as handler,
  generateAnswerSuggestionOptions,
} from './aiAnswerSuggestion';

function premiumUser(): User {
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
  };
}

const basePayload = {
  question: 'Q?',
  questionCategory: 'cat',
  originalText: 'orig',
  recommendation: 'rec',
  sectionType: 'summary',
  language: 'en',
};

function post(body: object) {
  return makeAuthorizedEvent({ httpMethod: 'POST', body: JSON.stringify(body) });
}

describe('generateAnswerSuggestion', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 19,
      resetTime: Date.now() + 60000,
    });
    getUserById.mockResolvedValue(premiumUser());
    generateAnswerSuggestion.mockResolvedValue('suggested');
  });

  it('401', async () => {
    const ev = makeAuthorizedEvent();
    (ev as { requestContext: { authorizer?: unknown } }).requestContext.authorizer =
      undefined as never;
    expect((await handler(ev)).statusCode).toBe(401);
  });

  it('404', async () => {
    getUserById.mockResolvedValueOnce(null);
    expect((await handler(post(basePayload))).statusCode).toBe(404);
  });

  it('403 not premium', async () => {
    getUserById.mockResolvedValueOnce({ ...premiumUser(), isPremium: false });
    expect((await handler(post(basePayload))).statusCode).toBe(403);
  });

  it('403 expired premium', async () => {
    getUserById.mockResolvedValueOnce({
      ...premiumUser(),
      subscriptionExpiration: '2000-01-01T00:00:00.000Z',
    });
    const res = await handler(post(basePayload));
    expect(res.statusCode).toBe(403);
    expect(JSON.parse(res.body || '{}').error).toContain('expired');
  });

  it('429', async () => {
    checkRateLimit.mockResolvedValueOnce({ allowed: false, remaining: 0, resetTime: 1 });
    expect((await handler(post(basePayload))).statusCode).toBe(429);
  });

  it('400 no body', async () => {
    expect(
      (await handler(makeAuthorizedEvent({ httpMethod: 'POST', body: null }))).statusCode
    ).toBe(400);
  });

  it('400 bad json', async () => {
    expect(
      (await handler(makeAuthorizedEvent({ httpMethod: 'POST', body: '{' }))).statusCode
    ).toBe(400);
  });

  it('400 invalid section', async () => {
    const res = await handler(post({ ...basePayload, sectionType: 'nope' }));
    expect(res.statusCode).toBe(400);
    expect(logSuspiciousActivity).toHaveBeenCalled();
  });

  it('400 empty question after sanitize', async () => {
    expect((await handler(post({ ...basePayload, question: '   ' }))).statusCode).toBe(400);
  });

  it('403 resume', async () => {
    verifyResumeOwnership.mockResolvedValueOnce(false);
    expect((await handler(post({ ...basePayload, resumeId: 'r' }))).statusCode).toBe(403);
  });

  it('200', async () => {
    const res = await handler(post(basePayload));
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body || '{}').data.suggestion).toBe('suggested');
  });

  it('500 AI error refunds', async () => {
    generateAnswerSuggestion.mockRejectedValueOnce(new Error('ai down'));
    const res = await handler(post(basePayload));
    expect(res.statusCode).toBe(500);
    expect(refundRateLimit).toHaveBeenCalled();
  });
});

describe('generateAnswerSuggestionOptions', () => {
  it('cors', async () => {
    expect((await generateAnswerSuggestionOptions()).statusCode).toBe(200);
  });
});
