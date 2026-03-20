import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { User } from '../types';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';

const getUserById = vi.hoisted(() => vi.fn());
const checkRateLimit = vi.hoisted(() => vi.fn());
const extractJobFromUrl = vi.hoisted(() => vi.fn());

vi.mock('../services/dynamodb', () => ({ getUserById }));

vi.mock('../middleware/rateLimiter', () => ({ checkRateLimit }));

vi.mock('../services/jobTailoringService', () => ({
  extractJobFromUrl,
}));

import { validateJobUrlHandler } from './jobTailoring';

function baseUser(over: Partial<User> = {}): User {
  const now = new Date().toISOString();
  return {
    id: 'u1',
    email: 'e@test.com',
    firstName: 'A',
    lastName: 'B',
    provider: 'google',
    isPremium: false,
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

describe('validateJobUrlHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getUserById.mockResolvedValue(baseUser());
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 4,
      resetTime: Date.now() + 60000,
    });
    extractJobFromUrl.mockResolvedValue({ title: 'Job', company: 'Co' });
  });

  it('returns 401 without userId in authorizer context', async () => {
    const ev = makeAuthorizedEvent({
      authorizer: { userId: '', email: 'e@test.com' },
    });
    const res = await validateJobUrlHandler(ev);
    expect(res.statusCode).toBe(401);
  });

  it('returns 429 with RATE_LIMIT code when rate limited', async () => {
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: 111,
    });
    const res = await validateJobUrlHandler(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({ url: 'https://example.com/job' }),
      })
    );
    expect(res.statusCode).toBe(429);
    const body = JSON.parse(res.body || '{}');
    expect(body.success).toBe(false);
    expect(body.code).toBe('RATE_LIMIT');
    expect(body.error).toBe('Rate limit exceeded');
  });

  it('returns 200 with data when url valid', async () => {
    const res = await validateJobUrlHandler(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({ url: 'https://example.com/job' }),
      })
    );
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body || '{}');
    expect(body.success).toBe(true);
    expect(body.data).toEqual({ title: 'Job', company: 'Co' });
  });
});
