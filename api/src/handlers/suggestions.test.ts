import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { User } from '../types';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';

const getUserById = vi.hoisted(() => vi.fn());
const checkRateLimit = vi.hoisted(() => vi.fn());
const refundRateLimit = vi.hoisted(() => vi.fn());
const verifyResumeOwnership = vi.hoisted(() => vi.fn());
const getSuggestions = vi.hoisted(() => vi.fn());

vi.mock('../services/dynamodb', () => ({ getUserById }));

vi.mock('../middleware/rateLimiter', () => ({
  checkRateLimit,
  refundRateLimit,
}));

vi.mock('../services/resumeService', () => ({ verifyResumeOwnership }));

vi.mock('../services/suggestionService', () => ({
  suggestionService: { getSuggestions },
}));

import {
  getSuggestions as getSuggestionsHandler,
  getSuggestionsOptions,
} from './suggestions';

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

describe('getSuggestions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getUserById.mockResolvedValue(user());
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 9,
      resetTime: Date.now() + 60000,
    });
    getSuggestions.mockResolvedValue({
      skills: ['Skill A'],
      fromCache: true,
    });
  });

  it('returns 401 without authorizer', async () => {
    const ev = makeAuthorizedEvent();
    (ev as { requestContext: { authorizer?: unknown } }).requestContext = {
      ...ev.requestContext,
      authorizer: undefined,
    };
    const res = await getSuggestionsHandler(ev);
    expect(res.statusCode).toBe(401);
  });

  it('returns 404 when user not found', async () => {
    getUserById.mockResolvedValueOnce(undefined);
    const res = await getSuggestionsHandler(
      makeAuthorizedEvent({ pathParameters: { profession: 'dev' } })
    );
    expect(res.statusCode).toBe(404);
  });

  it('returns 403 when free user exhausted quota', async () => {
    getUserById.mockResolvedValueOnce(
      user({ isPremium: false, freeResumeUsed: true })
    );
    const res = await getSuggestionsHandler(
      makeAuthorizedEvent({ pathParameters: { profession: 'dev' } })
    );
    expect(res.statusCode).toBe(403);
    const body = JSON.parse(res.body || '{}');
    expect(body.code).toBe('PREMIUM_REQUIRED');
  });

  it('returns 400 when profession path param missing', async () => {
    const res = await getSuggestionsHandler(
      makeAuthorizedEvent({ pathParameters: null })
    );
    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res.body || '{}');
    expect(body.error).toBe('Profession parameter is required');
  });

  it('returns 400 for invalid language', async () => {
    const res = await getSuggestionsHandler(
      makeAuthorizedEvent({
        pathParameters: { profession: 'dev' },
        queryStringParameters: { language: 'fr' },
      })
    );
    expect(res.statusCode).toBe(400);
  });

  it('returns 429 when rate limited', async () => {
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: 42,
    });
    const res = await getSuggestionsHandler(
      makeAuthorizedEvent({
        pathParameters: { profession: 'engineer' },
      })
    );
    expect(res.statusCode).toBe(429);
    const body = JSON.parse(res.body || '{}');
    expect(body.code).toBe('RATE_LIMIT_EXCEEDED');
  });

  it('returns 403 when resumeId not owned', async () => {
    verifyResumeOwnership.mockResolvedValueOnce(false);
    const res = await getSuggestionsHandler(
      makeAuthorizedEvent({
        pathParameters: { profession: 'dev' },
        queryStringParameters: { resumeId: 'r_x' },
      })
    );
    expect(res.statusCode).toBe(403);
  });

  it('returns 200 with skills', async () => {
    const res = await getSuggestionsHandler(
      makeAuthorizedEvent({
        pathParameters: { profession: 'software-engineer' },
        queryStringParameters: { language: 'en' },
      })
    );
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body || '{}');
    expect(body.success).toBe(true);
    expect(body.data.skills).toEqual(['Skill A']);
    expect(body.fromCache).toBe(true);
  });

  it('returns 200 with resumeId when owner', async () => {
    verifyResumeOwnership.mockResolvedValueOnce(true);
    const res = await getSuggestionsHandler(
      makeAuthorizedEvent({
        pathParameters: { profession: 'dev' },
        queryStringParameters: { resumeId: 'r1', language: 'en' },
      })
    );
    expect(res.statusCode).toBe(200);
  });

  it('returns 400 for INVALID_PROFESSION from service', async () => {
    const err = Object.assign(new Error('not a job'), { code: 'INVALID_PROFESSION' });
    getSuggestions.mockRejectedValueOnce(err);
    const res = await getSuggestionsHandler(
      makeAuthorizedEvent({
        pathParameters: { profession: 'zzz' },
        queryStringParameters: { language: 'en' },
      })
    );
    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res.body || '{}');
    expect(body.error).toBe('INVALID_PROFESSION');
  });

  it('returns 500 and refunds rate limit on generic error', async () => {
    getSuggestions.mockRejectedValueOnce(new Error('AI down'));
    const res = await getSuggestionsHandler(
      makeAuthorizedEvent({
        pathParameters: { profession: 'dev' },
        queryStringParameters: { language: 'en' },
      })
    );
    expect(res.statusCode).toBe(500);
    expect(refundRateLimit).toHaveBeenCalledWith('user_test_1', 'profession-suggestions');
  });
});

describe('getSuggestionsOptions', () => {
  it('returns CORS preflight', async () => {
    const res = await getSuggestionsOptions();
    expect(res.statusCode).toBe(200);
  });
});
