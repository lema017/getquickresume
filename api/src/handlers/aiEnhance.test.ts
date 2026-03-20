import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { User } from '../types';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';

const getUserById = vi.hoisted(() => vi.fn());
const checkRateLimit = vi.hoisted(() => vi.fn());
const refundRateLimit = vi.hoisted(() => vi.fn());
const verifyResumeOwnership = vi.hoisted(() => vi.fn());
const enhanceText = vi.hoisted(() => vi.fn());

vi.mock('../services/dynamodb', () => ({ getUserById }));

vi.mock('../middleware/rateLimiter', () => ({
  checkRateLimit,
  refundRateLimit,
}));

vi.mock('../services/resumeService', () => ({
  verifyResumeOwnership,
}));

vi.mock('../services/aiService', () => ({
  aiService: { enhanceText },
}));

import { enhanceTextWithAI, enhanceTextWithAIOptions } from './aiEnhance';

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

describe('enhanceTextWithAI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 9,
      resetTime: Date.now() + 60000,
    });
  });

  it('returns 401 without authorizer', async () => {
    const ev = makeAuthorizedEvent();
    (ev as { requestContext: { authorizer?: unknown } }).requestContext = {
      ...ev.requestContext,
      authorizer: undefined,
    };
    const res = await enhanceTextWithAI(ev);
    expect(res.statusCode).toBe(401);
    const body = JSON.parse(res.body || '{}');
    expect(body.success).toBe(false);
    expect(body.error).toBe('Unauthorized');
  });

  it('returns 429 when rate limited', async () => {
    getUserById.mockResolvedValueOnce(user());
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: 999,
    });
    const res = await enhanceTextWithAI(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({
          context: 'achievement',
          text: 'hello',
        }),
      })
    );
    expect(res.statusCode).toBe(429);
    const body = JSON.parse(res.body || '{}');
    expect(body.code).toBe('RATE_LIMIT_EXCEEDED');
    expect(body.resetTime).toBe(999);
  });

  it('returns 200 and enhanced text on success', async () => {
    getUserById.mockResolvedValueOnce(user());
    enhanceText.mockResolvedValueOnce('Enhanced copy');
    const res = await enhanceTextWithAI(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({
          context: 'achievement',
          text: '  hello  ',
          language: 'en',
        }),
      })
    );
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body || '{}');
    expect(body.success).toBe(true);
    expect(body.data).toBe('Enhanced copy');
    expect(body.remainingRequests).toBe(9);
  });

  it('returns 500 and refunds rate limit when AI throws', async () => {
    getUserById.mockResolvedValueOnce(user());
    enhanceText.mockRejectedValueOnce(new Error('openai down'));
    const res = await enhanceTextWithAI(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({
          context: 'summary',
          text: 'x',
          language: 'en',
        }),
      })
    );
    expect(res.statusCode).toBe(500);
    expect(refundRateLimit).toHaveBeenCalledWith('user_test_1', 'ai-enhance');
    const body = JSON.parse(res.body || '{}');
    expect(body.success).toBe(false);
    expect(body.error).toBe('Internal server error');
  });

  it('returns 404 when user not found', async () => {
    getUserById.mockResolvedValueOnce(undefined);
    const res = await enhanceTextWithAI(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({ context: 'achievement', text: 'x' }),
      })
    );
    expect(res.statusCode).toBe(404);
  });

  it('returns 403 for free user who used free resume', async () => {
    getUserById.mockResolvedValueOnce(
      user({ isPremium: false, freeResumeUsed: true })
    );
    const res = await enhanceTextWithAI(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({ context: 'achievement', text: 'x' }),
      })
    );
    expect(res.statusCode).toBe(403);
  });

  it('returns 400 without body', async () => {
    getUserById.mockResolvedValueOnce(user());
    const res = await enhanceTextWithAI(
      makeAuthorizedEvent({ httpMethod: 'POST', body: null })
    );
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 for invalid JSON', async () => {
    getUserById.mockResolvedValueOnce(user());
    const res = await enhanceTextWithAI(
      makeAuthorizedEvent({ httpMethod: 'POST', body: '{' })
    );
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when context missing', async () => {
    getUserById.mockResolvedValueOnce(user());
    const res = await enhanceTextWithAI(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({ text: 'x' }),
      })
    );
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when text empty', async () => {
    getUserById.mockResolvedValueOnce(user());
    const res = await enhanceTextWithAI(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({ context: 'achievement', text: '   ' }),
      })
    );
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 for invalid context', async () => {
    getUserById.mockResolvedValueOnce(user());
    const res = await enhanceTextWithAI(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({ context: 'nope', text: 'hello' }),
      })
    );
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 for invalid language', async () => {
    getUserById.mockResolvedValueOnce(user());
    const res = await enhanceTextWithAI(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({
          context: 'achievement',
          text: 'hello',
          language: 'de',
        }),
      })
    );
    expect(res.statusCode).toBe(400);
  });

  it('returns 403 when resumeId not owned', async () => {
    getUserById.mockResolvedValueOnce(user());
    verifyResumeOwnership.mockResolvedValueOnce(false);
    const res = await enhanceTextWithAI(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({
          context: 'achievement',
          text: 'hello',
          language: 'en',
          resumeId: 'rid',
        }),
      })
    );
    expect(res.statusCode).toBe(403);
  });
});

describe('enhanceTextWithAIOptions', () => {
  it('returns CORS preflight', async () => {
    const res = await enhanceTextWithAIOptions();
    expect(res.statusCode).toBe(200);
  });
});
