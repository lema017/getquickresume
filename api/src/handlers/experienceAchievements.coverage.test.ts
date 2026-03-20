import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { User } from '../types';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';

const getUserById = vi.hoisted(() => vi.fn());
const checkRateLimit = vi.hoisted(() => vi.fn());
const refundRateLimit = vi.hoisted(() => vi.fn());
const verifyResumeOwnership = vi.hoisted(() => vi.fn());
const getAchievementsByJobTitle = vi.hoisted(() => vi.fn());

vi.mock('../services/dynamodb', () => ({ getUserById }));
vi.mock('../middleware/rateLimiter', () => ({ checkRateLimit, refundRateLimit }));
vi.mock('../services/resumeService', () => ({ verifyResumeOwnership }));
vi.mock('../services/jobTitleAchievementsService', () => ({
  jobTitleAchievementsService: { getAchievementsByJobTitle },
}));

import {
  getJobTitleAchievements,
  getJobTitleAchievementsOptions,
} from './experienceAchievements';

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

function post(body: object, extra: Partial<Parameters<typeof makeAuthorizedEvent>[0]> = {}) {
  return makeAuthorizedEvent({
    httpMethod: 'POST',
    body: JSON.stringify(body),
    ...extra,
  });
}

describe('getJobTitleAchievements', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 9,
      resetTime: Date.now() + 60000,
    });
    getAchievementsByJobTitle.mockResolvedValue({
      suggestions: ['a', 'b', 'c'],
      fromCache: false,
    });
  });

  it('returns 401 without authorizer', async () => {
    const ev = makeAuthorizedEvent();
    (ev as { requestContext: { authorizer?: unknown } }).requestContext.authorizer = undefined;
    const res = await getJobTitleAchievements(ev);
    expect(res.statusCode).toBe(401);
  });

  it('returns 404 when user missing', async () => {
    getUserById.mockResolvedValueOnce(null);
    const res = await getJobTitleAchievements(post({ jobTitle: 'Dev' }));
    expect(res.statusCode).toBe(404);
  });

  it('returns 403 when free user exhausted quota', async () => {
    getUserById.mockResolvedValueOnce(user({ isPremium: false, freeResumeUsed: true }));
    const res = await getJobTitleAchievements(post({ jobTitle: 'Dev' }));
    expect(res.statusCode).toBe(403);
    expect(JSON.parse(res.body || '{}').code).toBe('PREMIUM_REQUIRED');
  });

  it('returns 429 when rate limited', async () => {
    getUserById.mockResolvedValueOnce(user());
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: 111,
    });
    const res = await getJobTitleAchievements(post({ jobTitle: 'Dev' }));
    expect(res.statusCode).toBe(429);
  });

  it('returns 400 when body missing', async () => {
    getUserById.mockResolvedValueOnce(user());
    const res = await getJobTitleAchievements(
      makeAuthorizedEvent({ httpMethod: 'POST', body: null })
    );
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 on invalid JSON', async () => {
    getUserById.mockResolvedValueOnce(user());
    const res = await getJobTitleAchievements(
      makeAuthorizedEvent({ httpMethod: 'POST', body: 'not-json' })
    );
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when job title empty', async () => {
    getUserById.mockResolvedValueOnce(user());
    const res = await getJobTitleAchievements(post({ jobTitle: '   ' }));
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 for invalid language', async () => {
    getUserById.mockResolvedValueOnce(user());
    const res = await getJobTitleAchievements(post({ jobTitle: 'Dev', language: 'fr' }));
    expect(res.statusCode).toBe(400);
  });

  it('returns 403 when resumeId not owned', async () => {
    getUserById.mockResolvedValueOnce(user());
    verifyResumeOwnership.mockResolvedValueOnce(false);
    const res = await getJobTitleAchievements(
      post({ jobTitle: 'Dev', resumeId: 'r1' })
    );
    expect(res.statusCode).toBe(403);
  });

  it('returns 200 with suggestions', async () => {
    getUserById.mockResolvedValueOnce(user({ isPremium: false, freeResumeUsed: false }));
    const res = await getJobTitleAchievements(post({ jobTitle: ' Engineer ', language: 'en' }));
    expect(res.statusCode).toBe(200);
    const b = JSON.parse(res.body || '{}');
    expect(b.success).toBe(true);
    expect(b.data).toEqual(['a', 'b', 'c']);
    expect(checkRateLimit).toHaveBeenCalledWith(
      expect.any(String),
      'experience-achievements',
      1,
      60000
    );
  });

  it('uses premium rate limit when isPremium', async () => {
    getUserById.mockResolvedValueOnce(user({ isPremium: true }));
    await getJobTitleAchievements(post({ jobTitle: 'Dev' }));
    expect(checkRateLimit).toHaveBeenCalledWith(
      expect.any(String),
      'experience-achievements',
      10,
      60000
    );
  });

  it('returns 500 and refunds on service throw', async () => {
    getUserById.mockResolvedValueOnce(user());
    getAchievementsByJobTitle.mockRejectedValueOnce(new Error('boom'));
    const res = await getJobTitleAchievements(post({ jobTitle: 'Dev' }));
    expect(res.statusCode).toBe(500);
    expect(refundRateLimit).toHaveBeenCalled();
  });
});

describe('getJobTitleAchievementsOptions', () => {
  it('returns CORS preflight', async () => {
    const res = await getJobTitleAchievementsOptions();
    expect(res.statusCode).toBe(200);
    expect(res.headers['Access-Control-Allow-Methods']).toContain('POST');
  });
});
