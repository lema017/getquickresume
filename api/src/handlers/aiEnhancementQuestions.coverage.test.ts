import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { User } from '../types';
import { makeAuthorizerContext, makeAuthorizedEvent } from '../test-utils/apiGateway';

const getUserById = vi.hoisted(() => vi.fn());
const checkRateLimit = vi.hoisted(() => vi.fn());
const refundRateLimit = vi.hoisted(() => vi.fn());
const logSuspiciousActivity = vi.hoisted(() => vi.fn());
const verifyResumeOwnership = vi.hoisted(() => vi.fn());
const generateEnhancementQuestions = vi.hoisted(() => vi.fn());

vi.mock('../services/dynamodb', () => ({ getUserById }));
vi.mock('../middleware/rateLimiter', () => ({
  checkRateLimit,
  refundRateLimit,
  logSuspiciousActivity,
}));
vi.mock('../services/resumeService', () => ({ verifyResumeOwnership }));
vi.mock('../services/aiService', () => ({
  aiService: { generateEnhancementQuestions },
}));

import {
  generateEnhancementQuestions as handler,
  generateEnhancementQuestionsOptions,
} from './aiEnhancementQuestions';

function premiumUser(over: Partial<User> = {}): User {
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
  sectionType: 'summary',
  recommendation: 'Be clearer',
  originalText: 'I am a dev',
  language: 'en',
};

function post(body: object | null) {
  return makeAuthorizedEvent({
    authorizer: makeAuthorizerContext('u1', 'e@test.com'),
    httpMethod: 'POST',
    body: body === null ? null : JSON.stringify(body),
  });
}

describe('generateEnhancementQuestions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 9,
      resetTime: Date.now() + 60000,
    });
    getUserById.mockResolvedValue(premiumUser());
    generateEnhancementQuestions.mockResolvedValue([{ id: 'q1', question: 'Q?', category: 'c', required: true }]);
  });

  it('401 without authorizer', async () => {
    const ev = post(validBody);
    (ev as { requestContext: { authorizer?: unknown } }).requestContext.authorizer = undefined as never;
    expect((await handler(ev)).statusCode).toBe(401);
  });

  it('404 user not found', async () => {
    getUserById.mockResolvedValueOnce(undefined);
    expect((await handler(post(validBody))).statusCode).toBe(404);
  });

  it('403 not premium', async () => {
    getUserById.mockResolvedValueOnce(premiumUser({ isPremium: false }));
    expect((await handler(post(validBody))).statusCode).toBe(403);
  });

  it('403 premium expired', async () => {
    getUserById.mockResolvedValueOnce(
      premiumUser({
        isPremium: true,
        subscriptionExpiration: '2000-01-01T00:00:00.000Z',
      })
    );
    const r = await handler(post(validBody));
    expect(r.statusCode).toBe(403);
    expect(JSON.parse(r.body || '{}').error).toContain('expired');
  });

  it('429 rate limited', async () => {
    checkRateLimit.mockResolvedValueOnce({ allowed: false, remaining: 0, resetTime: 1 });
    expect((await handler(post(validBody))).statusCode).toBe(429);
  });

  it('400 no body', async () => {
    expect((await handler(post(null))).statusCode).toBe(400);
  });

  it('400 invalid JSON', async () => {
    const ev = makeAuthorizedEvent({
      authorizer: makeAuthorizerContext('u1', 'e@test.com'),
      httpMethod: 'POST',
      body: 'not-json',
    });
    expect((await handler(ev)).statusCode).toBe(400);
  });

  it('400 invalid section type', async () => {
    const r = await handler(post({ ...validBody, sectionType: 'nope' }));
    expect(r.statusCode).toBe(400);
    expect(logSuspiciousActivity).toHaveBeenCalled();
  });

  it('400 empty recommendation', async () => {
    expect((await handler(post({ ...validBody, recommendation: '   ' }))).statusCode).toBe(400);
  });

  it('400 empty original text', async () => {
    expect((await handler(post({ ...validBody, originalText: '' }))).statusCode).toBe(400);
  });

  it('403 resume ownership', async () => {
    verifyResumeOwnership.mockResolvedValueOnce(false);
    expect((await handler(post({ ...validBody, resumeId: 'r1' }))).statusCode).toBe(403);
  });

  it('200 success', async () => {
    verifyResumeOwnership.mockResolvedValueOnce(true);
    const r = await handler(post({ ...validBody, resumeId: 'r1' }));
    expect(r.statusCode).toBe(200);
    expect(JSON.parse(r.body || '{}').data.questions).toHaveLength(1);
  });

  it('500 AI error refunds', async () => {
    generateEnhancementQuestions.mockRejectedValueOnce(new Error('ai down'));
    const r = await handler(post(validBody));
    expect(r.statusCode).toBe(500);
    expect(refundRateLimit).toHaveBeenCalledWith('u1', 'generate-enhancement-questions');
  });

  it('500 outer catch refunds', async () => {
    getUserById.mockResolvedValueOnce(premiumUser());
    checkRateLimit.mockRejectedValueOnce(new Error('rl'));
    const r = await handler(post(validBody));
    expect(r.statusCode).toBe(500);
  });

  it('options', async () => {
    expect((await generateEnhancementQuestionsOptions()).statusCode).toBe(200);
  });
});
