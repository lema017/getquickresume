import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { User } from '../types';
import { makeAuthorizerContext, makeAuthorizedEvent } from '../test-utils/apiGateway';

const getUserById = vi.hoisted(() => vi.fn());
const checkRateLimit = vi.hoisted(() => vi.fn());
const refundRateLimit = vi.hoisted(() => vi.fn());
const verifyResumeOwnership = vi.hoisted(() => vi.fn());
const directEnhanceAi = vi.hoisted(() => vi.fn());

vi.mock('../services/dynamodb', () => ({ getUserById }));
vi.mock('../middleware/rateLimiter', () => ({ checkRateLimit, refundRateLimit }));
vi.mock('../services/resumeService', () => ({ verifyResumeOwnership }));
vi.mock('../services/aiService', () => ({
  aiService: { directEnhance: directEnhanceAi },
}));

import { directEnhance as handler, directEnhanceOptions } from './aiDirectEnhancement';

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

const base = {
  checklistItemId: 'summary-no-first-person',
  sectionType: 'summary',
  originalText: '  I did things  ',
  language: 'en',
};

function post(body: object | null) {
  return makeAuthorizedEvent({
    authorizer: makeAuthorizerContext('u1', 'e@test.com'),
    httpMethod: 'POST',
    body: body === null ? null : JSON.stringify(body),
  });
}

describe('directEnhance', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 9,
      resetTime: Date.now() + 60000,
    });
    getUserById.mockResolvedValue(premiumUser());
    directEnhanceAi.mockResolvedValue('enhanced');
  });

  it('401', async () => {
    const ev = post(base);
    (ev as { requestContext: { authorizer?: unknown } }).requestContext.authorizer = undefined as never;
    expect((await handler(ev)).statusCode).toBe(401);
  });

  it('404', async () => {
    getUserById.mockResolvedValueOnce(undefined);
    expect((await handler(post(base))).statusCode).toBe(404);
  });

  it('403 not premium', async () => {
    getUserById.mockResolvedValueOnce(premiumUser({ isPremium: false }));
    expect((await handler(post(base))).statusCode).toBe(403);
  });

  it('403 expired', async () => {
    getUserById.mockResolvedValueOnce(
      premiumUser({ isPremium: true, subscriptionExpiration: '1999-01-01T00:00:00.000Z' })
    );
    const r = await handler(post(base));
    expect(r.statusCode).toBe(403);
    expect(JSON.parse(r.body || '{}').code).toBe('PREMIUM_EXPIRED');
  });

  it('429', async () => {
    checkRateLimit.mockResolvedValueOnce({ allowed: false, remaining: 0, resetTime: 1 });
    expect((await handler(post(base))).statusCode).toBe(429);
  });

  it('400 no body', async () => {
    expect((await handler(post(null))).statusCode).toBe(400);
  });

  it('400 bad JSON', async () => {
    expect(
      (
        await handler(
          makeAuthorizedEvent({
            authorizer: makeAuthorizerContext('u1', 'e@test.com'),
            httpMethod: 'POST',
            body: '{',
          })
        )
      ).statusCode
    ).toBe(400);
  });

  it('400 missing checklistItemId', async () => {
    const { checklistItemId: _, ...rest } = base;
    expect((await handler(post(rest as never))).statusCode).toBe(400);
  });

  it('400 invalid checklist item', async () => {
    expect((await handler(post({ ...base, checklistItemId: 'bad' }))).statusCode).toBe(400);
  });

  it('400 missing sectionType', async () => {
    const { sectionType: _, ...rest } = base;
    expect((await handler(post(rest as never))).statusCode).toBe(400);
  });

  it('400 invalid sectionType', async () => {
    expect((await handler(post({ ...base, sectionType: 'nope' }))).statusCode).toBe(400);
  });

  it('400 empty originalText', async () => {
    expect((await handler(post({ ...base, originalText: '  ' }))).statusCode).toBe(400);
  });

  it('400 invalid language', async () => {
    expect((await handler(post({ ...base, language: 'fr' }))).statusCode).toBe(400);
  });

  it('defaults language to es', async () => {
    const { language: _, ...noLang } = base;
    const r = await handler(post({ ...noLang, language: undefined } as never));
    expect(r.statusCode).toBe(200);
    expect(directEnhanceAi).toHaveBeenCalledWith(
      base.checklistItemId,
      base.sectionType,
      base.originalText.trim(),
      'es',
      expect.any(Object),
      undefined
    );
  });

  it('403 resume', async () => {
    verifyResumeOwnership.mockResolvedValueOnce(false);
    expect((await handler(post({ ...base, resumeId: 'r1' }))).statusCode).toBe(403);
  });

  it('200', async () => {
    verifyResumeOwnership.mockResolvedValueOnce(true);
    expect((await handler(post({ ...base, resumeId: 'r1' }))).statusCode).toBe(200);
  });

  it('500 refunds', async () => {
    directEnhanceAi.mockRejectedValueOnce(new Error('boom'));
    const r = await handler(post(base));
    expect(r.statusCode).toBe(500);
    expect(refundRateLimit).toHaveBeenCalledWith('u1', 'ai-direct-enhance');
  });

  it('options', async () => {
    expect((await directEnhanceOptions()).statusCode).toBe(200);
  });
});
