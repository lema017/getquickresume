import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { User } from '../types';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';

const getUserById = vi.hoisted(() => vi.fn());
const checkRateLimit = vi.hoisted(() => vi.fn());
const validateProfessionAi = vi.hoisted(() => vi.fn());
const isValidProfessionCached = vi.hoisted(() => vi.fn());
const cacheValidProfession = vi.hoisted(() => vi.fn());

vi.mock('../services/dynamodb', () => ({ getUserById }));
vi.mock('../middleware/rateLimiter', () => ({ checkRateLimit }));
vi.mock('../services/aiService', () => ({
  aiService: { validateProfession: validateProfessionAi },
}));
vi.mock('../services/professionValidationService', () => ({
  isValidProfessionCached,
  cacheValidProfession,
}));

import { validateProfession } from './validateProfession';

function user(over: Partial<User> = {}): User {
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

function post(body: object) {
  return makeAuthorizedEvent({
    httpMethod: 'POST',
    body: JSON.stringify(body),
  });
}

describe('validateProfession handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 1,
      resetTime: Date.now() + 60000,
    });
    isValidProfessionCached.mockResolvedValue(false);
    validateProfessionAi.mockResolvedValue({ isValid: true, message: 'ok' });
  });

  it('401 without authorizer', async () => {
    const ev = makeAuthorizedEvent();
    (ev as { requestContext: { authorizer?: unknown } }).requestContext.authorizer = undefined;
    expect((await validateProfession(ev)).statusCode).toBe(401);
  });

  it('401 without userId on authorizer', async () => {
    const ev = makeAuthorizedEvent();
    (ev.requestContext.authorizer as { userId?: string }).userId = '';
    expect((await validateProfession(ev)).statusCode).toBe(401);
  });

  it('401 when user not in db', async () => {
    getUserById.mockResolvedValueOnce(null);
    expect((await validateProfession(post({ profession: 'x' }))).statusCode).toBe(401);
  });

  it('400 missing body', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect(
      (await validateProfession(makeAuthorizedEvent({ httpMethod: 'POST', body: null })))
        .statusCode
    ).toBe(400);
  });

  it('400 invalid JSON', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect(
      (await validateProfession(makeAuthorizedEvent({ httpMethod: 'POST', body: 'x' })))
        .statusCode
    ).toBe(400);
  });

  it('400 missing profession', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect((await validateProfession(post({}))).statusCode).toBe(400);
  });

  it('400 empty trimmed profession', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect((await validateProfession(post({ profession: '  ' }))).statusCode).toBe(400);
  });

  it('400 profession too long', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect((await validateProfession(post({ profession: 'a'.repeat(201) }))).statusCode).toBe(400);
  });

  it('returns cached valid without rate limit', async () => {
    getUserById.mockResolvedValueOnce(user());
    isValidProfessionCached.mockResolvedValueOnce(true);
    const res = await validateProfession(post({ profession: 'Nurse' }));
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body || '{}').cached).toBe(true);
    expect(checkRateLimit).not.toHaveBeenCalled();
  });

  it('429 when rate limited', async () => {
    getUserById.mockResolvedValueOnce(user());
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 5000,
    });
    expect((await validateProfession(post({ profession: 'Dev' }))).statusCode).toBe(429);
  });

  it('200 AI invalid skips cache', async () => {
    getUserById.mockResolvedValueOnce(user());
    validateProfessionAi.mockResolvedValueOnce({ isValid: false, message: 'nope' });
    const res = await validateProfession(post({ profession: 'Dev' }));
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body || '{}').isValid).toBe(false);
    expect(cacheValidProfession).not.toHaveBeenCalled();
  });

  it('200 AI valid caches', async () => {
    getUserById.mockResolvedValueOnce(user());
    const res = await validateProfession(post({ profession: 'Dev' }));
    expect(res.statusCode).toBe(200);
    expect(cacheValidProfession).toHaveBeenCalledWith('Dev');
  });

  it('500 on throw', async () => {
    getUserById.mockResolvedValueOnce(user());
    validateProfessionAi.mockRejectedValueOnce(new Error('e'));
    expect((await validateProfession(post({ profession: 'Dev' }))).statusCode).toBe(500);
  });
});
