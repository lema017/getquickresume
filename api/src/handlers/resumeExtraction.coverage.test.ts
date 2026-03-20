import { describe, it, expect, vi, beforeEach } from 'vitest';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';
import * as inputSanitizer from '../utils/inputSanitizer';

const getUserById = vi.hoisted(() => vi.fn());
const checkRateLimit = vi.hoisted(() => vi.fn());
const extractResumeFromText = vi.hoisted(() => vi.fn());

vi.mock('../services/dynamodb', () => ({ getUserById }));
vi.mock('../middleware/rateLimiter', () => ({ checkRateLimit }));
vi.mock('../services/resumeExtractionService', () => ({
  resumeExtractionService: { extractResumeFromText },
}));

import { extractResumeData } from './resumeExtraction';

const userPremium = {
  id: 'u1',
  email: 'e@test.com',
  firstName: 'A',
  lastName: 'B',
  provider: 'google' as const,
  isPremium: true,
  freeResumeUsed: false,
  premiumResumeCount: 0,
  premiumResumeMonth: '2026-03',
  freeDownloadUsed: false,
  totalDownloads: 0,
  freeCoverLetterUsed: false,
  premiumCoverLetterCount: 0,
  premiumCoverLetterMonth: '2026-03',
  createdAt: 't',
  updatedAt: 't',
};

const text = `${'Senior Engineer at Acme Corp building scalable systems. '.repeat(80)}managed led developed implemented Python AWS Kubernetes Docker TypeScript`;

describe('extractResumeData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 4,
      resetTime: Date.now() + 60000,
    });
    getUserById.mockResolvedValue(userPremium as any);
    extractResumeFromText.mockResolvedValue({
      success: true,
      isResumeContent: true,
      data: {
        firstName: 'A',
        lastName: 'B',
        email: 'a@b.com',
        phone: '555',
        skills: ['Go'],
        experiences: [],
        education: [],
        extractionConfidence: 0.9,
      },
    });
  });

  it('OPTIONS', async () => {
    const ev = makeAuthorizedEvent({ httpMethod: 'OPTIONS' });
    const r = await extractResumeData(ev as any);
    expect(r.statusCode).toBe(200);
  });

  it('401', async () => {
    const ev = makeAuthorizedEvent({ httpMethod: 'POST', body: '{}' });
    (ev as any).requestContext.authorizer = undefined;
    expect((await extractResumeData(ev as any)).statusCode).toBe(401);
  });

  it('404 user', async () => {
    getUserById.mockResolvedValueOnce(null);
    expect(
      (await extractResumeData(makeAuthorizedEvent({ httpMethod: 'POST', body: '{}' }) as any))
        .statusCode
    ).toBe(404);
  });

  it('403 free quota', async () => {
    getUserById.mockResolvedValueOnce({
      ...userPremium,
      isPremium: false,
      freeResumeUsed: true,
    } as any);
    expect(
      (await extractResumeData(makeAuthorizedEvent({ httpMethod: 'POST', body: '{}' }) as any))
        .statusCode
    ).toBe(403);
  });

  it('413 file too large for free user', async () => {
    getUserById.mockResolvedValueOnce({ ...userPremium, isPremium: false, freeResumeUsed: false } as any);
    const big = 'x'.repeat(3 * 1024 * 1024);
    const r = await extractResumeData(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        headers: { 'content-length': String(Buffer.byteLength(big, 'utf8')) },
        body: JSON.stringify({ text }),
      }) as any
    );
    expect(r.statusCode).toBe(413);
  });

  it('429 rate limit', async () => {
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 5000,
    });
    expect(
      (
        await extractResumeData(
          makeAuthorizedEvent({
            httpMethod: 'POST',
            body: JSON.stringify({ text }),
          }) as any
        )
      ).statusCode
    ).toBe(429);
  });

  it('400 missing body', async () => {
    expect(
      (await extractResumeData(makeAuthorizedEvent({ httpMethod: 'POST', body: null }) as any))
        .statusCode
    ).toBe(400);
  });

  it('400 invalid json', async () => {
    expect(
      (
        await extractResumeData(
          makeAuthorizedEvent({ httpMethod: 'POST', body: '{' }) as any
        )
      ).statusCode
    ).toBe(400);
  });

  it('400 text too short', async () => {
    expect(
      (
        await extractResumeData(
          makeAuthorizedEvent({
            httpMethod: 'POST',
            body: JSON.stringify({ text: 'short' }),
          }) as any
        )
      ).statusCode
    ).toBe(400);
  });

  it('200 success', async () => {
    const r = await extractResumeData(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({ text, language: 'es' }),
      }) as any
    );
    expect(r.statusCode).toBe(200);
  });

  it('400 text too long', async () => {
    const long = 'x'.repeat(50001);
    const r = await extractResumeData(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({ text: long }),
      }) as any
    );
    expect(r.statusCode).toBe(400);
  });

  it('500 on service error', async () => {
    extractResumeFromText.mockRejectedValueOnce(new Error('ai'));
    const r = await extractResumeData(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({ text }),
      }) as any
    );
    expect(r.statusCode).toBe(500);
  });

  it('413 for premium when body exceeds premium limit', async () => {
    getUserById.mockResolvedValueOnce({ ...userPremium, isPremium: true } as any);
    const big = 'x'.repeat(11 * 1024 * 1024);
    const r = await extractResumeData(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        headers: { 'content-length': String(Buffer.byteLength(big, 'utf8')) },
        body: JSON.stringify({ text }),
      }) as any
    );
    expect(r.statusCode).toBe(413);
    const b = JSON.parse(r.body || '{}');
    expect(b.isPremium).toBe(true);
  });

  it('400 when text field is not a string', async () => {
    const r = await extractResumeData(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({ text: 123 }),
      }) as any
    );
    expect(r.statusCode).toBe(400);
  });

  it('400 when sanitize validation fails', async () => {
    const spy = vi.spyOn(inputSanitizer, 'validateInputLarge').mockReturnValueOnce({
      isValid: false,
      reason: 'blocked',
    });
    const r = await extractResumeData(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({ text }),
      }) as any
    );
    spy.mockRestore();
    expect(r.statusCode).toBe(400);
  });

  it('400 when extraction returns success false', async () => {
    extractResumeFromText.mockResolvedValueOnce({
      success: false,
      isResumeContent: false,
      error: 'not a resume',
    });
    const r = await extractResumeData(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({ text, language: 'en' }),
      }) as any
    );
    expect(r.statusCode).toBe(400);
  });

  it('uses Content-Length casing fallback', async () => {
    getUserById.mockResolvedValueOnce({ ...userPremium, isPremium: false, freeResumeUsed: false } as any);
    const r = await extractResumeData(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        headers: { 'Content-Length': '100' },
        body: JSON.stringify({ text }),
      }) as any
    );
    expect(r.statusCode).toBe(200);
  });
});
