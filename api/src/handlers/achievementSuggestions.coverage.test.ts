import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { User } from '../types';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';

const getUserById = vi.hoisted(() => vi.fn());
const checkRateLimit = vi.hoisted(() => vi.fn());
const refundRateLimit = vi.hoisted(() => vi.fn());
const verifyResumeOwnership = vi.hoisted(() => vi.fn());
const generateAchievementSuggestions = vi.hoisted(() => vi.fn());

vi.mock('../services/dynamodb', () => ({ getUserById }));
vi.mock('../middleware/rateLimiter', () => ({ checkRateLimit, refundRateLimit }));
vi.mock('../services/resumeService', () => ({ verifyResumeOwnership }));
vi.mock('../services/aiService', () => ({
  aiService: { generateAchievementSuggestions },
}));

import { generateSuggestions, generateSuggestionsOptions } from './achievementSuggestions';

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

function post(body: object) {
  return makeAuthorizedEvent({
    httpMethod: 'POST',
    body: JSON.stringify(body),
  });
}

describe('generateSuggestions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 9,
      resetTime: Date.now() + 60000,
    });
    generateAchievementSuggestions.mockResolvedValue(['s1']);
  });

  it('returns 401 without authorizer', async () => {
    const ev = makeAuthorizedEvent();
    (ev as { requestContext: { authorizer?: unknown } }).requestContext.authorizer = undefined;
    expect((await generateSuggestions(ev)).statusCode).toBe(401);
  });

  it('returns 404 when user missing', async () => {
    getUserById.mockResolvedValueOnce(null);
    expect((await generateSuggestions(post({ profession: 'p', projects: [] }))).statusCode).toBe(
      404
    );
  });

  it('returns 403 when free quota used', async () => {
    getUserById.mockResolvedValueOnce(user({ isPremium: false, freeResumeUsed: true }));
    expect((await generateSuggestions(post({ profession: 'p', projects: [] }))).statusCode).toBe(
      403
    );
  });

  it('returns 429 when rate limited', async () => {
    getUserById.mockResolvedValueOnce(user());
    checkRateLimit.mockResolvedValueOnce({ allowed: false, remaining: 0, resetTime: 1 });
    expect((await generateSuggestions(post({ profession: 'p', projects: [] }))).statusCode).toBe(
      429
    );
  });

  it('returns 400 when body missing', async () => {
    getUserById.mockResolvedValueOnce(user());
    const res = await generateSuggestions(
      makeAuthorizedEvent({ httpMethod: 'POST', body: null })
    );
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 on bad JSON', async () => {
    getUserById.mockResolvedValueOnce(user());
    const res = await generateSuggestions(
      makeAuthorizedEvent({ httpMethod: 'POST', body: '{' })
    );
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 without profession', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect((await generateSuggestions(post({ projects: [] }))).statusCode).toBe(400);
  });

  it('returns 400 when projects not array', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect((await generateSuggestions(post({ profession: 'p', projects: {} }))).statusCode).toBe(
      400
    );
  });

  it('returns 400 for invalid language', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect(
      (await generateSuggestions(post({ profession: 'p', projects: [], language: 'xx' })))
        .statusCode
    ).toBe(400);
  });

  it('returns 400 when project name empty', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect(
      (
        await generateSuggestions(
          post({ profession: 'p', projects: [{ name: '', description: '', technologies: [] }] })
        )
      ).statusCode
    ).toBe(400);
  });

  it('returns 400 when description not string', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect(
      (
        await generateSuggestions(
          post({
            profession: 'p',
            projects: [{ name: 'n', description: null, technologies: [] }],
          })
        )
      ).statusCode
    ).toBe(400);
  });

  it('returns 400 when technologies not array', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect(
      (
        await generateSuggestions(
          post({
            profession: 'p',
            projects: [{ name: 'n', description: '', technologies: 'x' }],
          })
        )
      ).statusCode
    ).toBe(400);
  });

  it('returns 403 when resume not owned', async () => {
    getUserById.mockResolvedValueOnce(user());
    verifyResumeOwnership.mockResolvedValueOnce(false);
    expect(
      (
        await generateSuggestions(
          post({ profession: 'p', projects: [], resumeId: 'r' })
        )
      ).statusCode
    ).toBe(403);
  });

  it('returns 200', async () => {
    getUserById.mockResolvedValueOnce(user());
    const res = await generateSuggestions(
      post({
        profession: 'Dev',
        projects: [{ name: 'P', description: 'd', technologies: ['t'] }],
        language: 'en',
      })
    );
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body || '{}').data).toEqual(['s1']);
  });

  it('returns 500 and refunds on AI error', async () => {
    getUserById.mockResolvedValueOnce(user());
    generateAchievementSuggestions.mockRejectedValueOnce(new Error('ai'));
    const res = await generateSuggestions(post({ profession: 'p', projects: [] }));
    expect(res.statusCode).toBe(500);
    expect(refundRateLimit).toHaveBeenCalled();
  });
});

describe('generateSuggestionsOptions', () => {
  it('returns CORS', async () => {
    const r = await generateSuggestionsOptions();
    expect(r.statusCode).toBe(200);
  });
});
