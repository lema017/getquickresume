import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { APIGatewayProxyEvent } from 'aws-lambda';

vi.mock('../services/dynamodb', () => ({
  getUserById: vi.fn(),
  markFreeCoverLetterUsed: vi.fn(),
  incrementPremiumCoverLetterCount: vi.fn(),
}));

vi.mock('../services/coverLetterService', () => ({
  createCoverLetter: vi.fn(),
  getCoverLettersByUserId: vi.fn(),
  getCoverLetterById: vi.fn(),
  updateCoverLetter: vi.fn(),
  deleteCoverLetter: vi.fn(),
  updateCoverLetterWithGenerated: vi.fn(),
}));

const checkRateLimit = vi.hoisted(() =>
  vi.fn().mockResolvedValue({ allowed: true, remaining: 4, resetTime: Date.now() + 60000 })
);

vi.mock('../middleware/rateLimiter', () => ({
  checkRateLimit,
}));

import { getUserById, incrementPremiumCoverLetterCount } from '../services/dynamodb';
import {
  createCoverLetter,
  getCoverLetterById,
  getCoverLettersByUserId,
  updateCoverLetter,
  deleteCoverLetter,
  updateCoverLetterWithGenerated,
} from '../services/coverLetterService';
import {
  generateCoverLetterHandler,
  coverLetterOptions,
  regenerateParagraphHandler,
  listCoverLettersHandler,
  getCoverLetterHandler,
  createCoverLetterHandler,
  updateCoverLetterHandler,
  deleteCoverLetterHandler,
  suggestWhyCompanyHandler,
  enhanceAchievementHandler,
} from './coverLetter';

const premiumUser = {
  id: 'u1',
  email: 'e@e.com',
  firstName: 'A',
  lastName: 'B',
  provider: 'google' as const,
  isPremium: true,
  freeResumeUsed: false,
  premiumResumeCount: 0,
  premiumResumeMonth: new Date().toISOString().slice(0, 7),
  freeDownloadUsed: false,
  totalDownloads: 0,
  freeCoverLetterUsed: false,
  premiumCoverLetterCount: 0,
  premiumCoverLetterMonth: new Date().toISOString().slice(0, 7),
  createdAt: 't',
  updatedAt: 't',
};

const baseData = {
  companyName: 'Acme',
  jobTitle: 'Engineer',
  fullName: 'Jane Doe',
  language: 'en' as const,
  tone: 'professional' as const,
  length: 'concise' as const,
};

function authEvent(body: object, pathParameters?: APIGatewayProxyEvent['pathParameters']): APIGatewayProxyEvent {
  return {
    body: JSON.stringify(body),
    pathParameters: pathParameters ?? null,
    requestContext: {
      authorizer: { userId: 'u1' },
    } as any,
    headers: {},
  } as APIGatewayProxyEvent;
}

describe('coverLetter handlers (mocked services)', () => {
  const fetchMock = vi.fn();

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 4,
      resetTime: Date.now() + 60000,
    });
    vi.stubGlobal('fetch', fetchMock);
    vi.mocked(getUserById).mockResolvedValue(premiumUser as any);
    vi.mocked(createCoverLetter).mockResolvedValue({ id: 'cl1' } as any);
    vi.mocked(getCoverLetterById).mockResolvedValue({ id: 'cl1', userId: 'u1' } as any);
    vi.mocked(getCoverLettersByUserId).mockResolvedValue([{ id: 'cl1' }] as any);
    vi.mocked(updateCoverLetter).mockResolvedValue({ id: 'cl1' } as any);
    vi.mocked(deleteCoverLetter).mockResolvedValue(undefined as any);
    vi.mocked(updateCoverLetterWithGenerated).mockResolvedValue(undefined as any);
    vi.mocked(incrementPremiumCoverLetterCount).mockResolvedValue(premiumUser as any);
    const aiJson = JSON.stringify({
      paragraphs: [
        { type: 'greeting', content: 'Dear Team,' },
        { type: 'opening', content: 'I am interested.' },
        { type: 'body', content: 'I build systems.' },
        { type: 'skills', content: 'Strong fit.' },
        { type: 'closing', content: 'Thanks.' },
        { type: 'signature', content: 'Jane' },
      ],
    });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: aiJson } }],
      }),
    });
  });

  it('coverLetterOptions returns 200', async () => {
    const r = await coverLetterOptions();
    expect(r.statusCode).toBe(200);
  });

  it('generateCoverLetterHandler 200 for premium user', async () => {
    const r = await generateCoverLetterHandler(
      authEvent({ data: baseData }) as any
    );
    expect(r.statusCode).toBe(200);
    const body = JSON.parse(r.body || '{}');
    expect(body.success).toBe(true);
    expect(incrementPremiumCoverLetterCount).toHaveBeenCalled();
  });

  it('generateCoverLetterHandler uses existing cover letter when coverLetterId set', async () => {
    const r = await generateCoverLetterHandler(
      authEvent({ coverLetterId: 'cl1', data: baseData }) as any
    );
    expect(r.statusCode).toBe(200);
    expect(createCoverLetter).not.toHaveBeenCalled();
    expect(getCoverLetterById).toHaveBeenCalledWith('u1', 'cl1');
  });

  it('generateCoverLetterHandler 404 when coverLetterId not found', async () => {
    vi.mocked(getCoverLetterById).mockResolvedValueOnce(null);
    const r = await generateCoverLetterHandler(
      authEvent({ coverLetterId: 'missing', data: baseData }) as any
    );
    expect(r.statusCode).toBe(404);
  });

  it('generateCoverLetterHandler 403 when monthly cover letter limit reached', async () => {
    const month = new Date().toISOString().slice(0, 7);
    vi.mocked(getUserById).mockResolvedValueOnce({
      ...premiumUser,
      premiumCoverLetterMonth: month,
      premiumCoverLetterCount: 30,
    } as any);
    const r = await generateCoverLetterHandler(authEvent({ data: baseData }) as any);
    expect(r.statusCode).toBe(403);
  });

  it('generateCoverLetterHandler 401 without authorizer', async () => {
    const ev = authEvent({ data: baseData }) as any;
    ev.requestContext.authorizer = undefined;
    const r = await generateCoverLetterHandler(ev);
    expect(r.statusCode).toBe(401);
  });

  it('generateCoverLetterHandler 429 when rate limited', async () => {
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 1000,
    });
    const r = await generateCoverLetterHandler(authEvent({ data: baseData }) as any);
    expect(r.statusCode).toBe(429);
  });

  it('generateCoverLetterHandler validates body fields', async () => {
    const r = await generateCoverLetterHandler(
      authEvent({ data: { ...baseData, companyName: '  ' } }) as any
    );
    expect(r.statusCode).toBe(400);
  });

  it('generateCoverLetterHandler uses parse fallback on invalid AI json', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'not-json' } }],
      }),
    });
    const r = await generateCoverLetterHandler(
      authEvent({
        data: {
          ...baseData,
          resumeContext: {
            profession: 'Dev',
            skills: ['Go'],
            experienceSummary: 'Built APIs',
            summary: 'Eng',
            achievements: ['Shipped v1'],
          },
          hiringManagerName: 'Pat',
          jobDescription: 'Build things',
          whyThisCompany: 'Mission',
          keyAchievement: '10x',
          email: 'j@j.com',
          phone: '555',
          linkedin: 'https://li.com/in/x',
        },
      }) as any
    );
    expect(r.statusCode).toBe(200);
  });

  it('regenerateParagraphHandler 200', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ choices: [{ message: { content: '  New body  ' } }] }),
    });
    const r = await regenerateParagraphHandler(
      authEvent(
        { paragraphType: 'body', data: baseData },
        { id: 'cl1' }
      ) as any
    );
    expect(r.statusCode).toBe(200);
  });

  it('regenerateParagraphHandler uses fallback when AI throws', async () => {
    fetchMock.mockRejectedValueOnce(new Error('groq down'));
    const r = await regenerateParagraphHandler(
      authEvent(
        { paragraphType: 'opening', data: baseData },
        { id: 'cl1' }
      ) as any
    );
    expect(r.statusCode).toBe(200);
    const b = JSON.parse(r.body || '{}');
    expect(b.data.length).toBeGreaterThan(5);
  });

  it('regenerateParagraphHandler 400 invalid paragraph type', async () => {
    const r = await regenerateParagraphHandler(
      authEvent({ paragraphType: 'invalid', data: baseData }, { id: 'cl1' }) as any
    );
    expect(r.statusCode).toBe(400);
  });

  it('regenerateParagraphHandler 403 non-premium', async () => {
    vi.mocked(getUserById).mockResolvedValueOnce({ ...premiumUser, isPremium: false } as any);
    const r = await regenerateParagraphHandler(
      authEvent({ paragraphType: 'body', data: baseData }, { id: 'cl1' }) as any
    );
    expect(r.statusCode).toBe(403);
  });

  it('listCoverLettersHandler 200', async () => {
    const r = await listCoverLettersHandler(authEvent({}) as any);
    expect(r.statusCode).toBe(200);
  });

  it('getCoverLetterHandler 200 and 404', async () => {
    expect((await getCoverLetterHandler(authEvent({}, { id: 'cl1' }) as any)).statusCode).toBe(200);
    vi.mocked(getCoverLetterById).mockResolvedValueOnce(null);
    expect((await getCoverLetterHandler(authEvent({}, { id: 'x' }) as any)).statusCode).toBe(404);
  });

  it('createCoverLetterHandler 201', async () => {
    vi.mocked(createCoverLetter).mockResolvedValueOnce({ id: 'newcl', data: baseData } as any);
    const r = await createCoverLetterHandler(
      authEvent({ data: baseData, title: 'T' }) as any
    );
    expect(r.statusCode).toBe(201);
  });

  it('updateCoverLetterHandler 200', async () => {
    const r = await updateCoverLetterHandler(
      authEvent({ status: 'draft' }, { id: 'cl1' }) as any
    );
    expect(r.statusCode).toBe(200);
  });

  it('deleteCoverLetterHandler 200', async () => {
    const r = await deleteCoverLetterHandler(authEvent({}, { id: 'cl1' }) as any);
    expect(r.statusCode).toBe(200);
  });

  it('suggestWhyCompanyHandler parses array from AI', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: '["a long enough reason one","second reason here ok","third reason text ok"]',
            },
          },
        ],
      }),
    });
    const r = await suggestWhyCompanyHandler(
      authEvent({
        companyName: 'Acme',
        jobTitle: 'Eng',
        jobDescription: 'long enough job description text for validation rules',
        language: 'es',
      }) as any
    );
    expect(r.statusCode).toBe(200);
  });

  it('suggestWhyCompanyHandler newline fallback when no json array', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: 'line one is long enough here\nline two also long enough\nline three long enough',
            },
          },
        ],
      }),
    });
    const r = await suggestWhyCompanyHandler(
      authEvent({
        companyName: 'Acme',
        jobTitle: 'Eng',
        jobDescription: 'long enough job description text for validation rules',
      }) as any
    );
    expect(r.statusCode).toBe(200);
  });

  it('suggestWhyCompanyHandler parse catch uses line filter fallback', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '[invalid json' } }],
      }),
    });
    const r = await suggestWhyCompanyHandler(
      authEvent({
        companyName: 'Acme',
        jobTitle: 'Eng',
        jobDescription: 'long enough job description text for validation rules',
      }) as any
    );
    expect(r.statusCode).toBe(200);
  });

  it('generateCoverLetterHandler 403 for non-premium', async () => {
    vi.mocked(getUserById).mockResolvedValueOnce({ ...premiumUser, isPremium: false } as any);
    const r = await generateCoverLetterHandler(authEvent({ data: baseData }) as any);
    expect(r.statusCode).toBe(403);
  });

  it('generateCoverLetterHandler 500 on invalid JSON body', async () => {
    const ev = authEvent({ data: baseData }) as any;
    ev.body = 'not-json';
    const r = await generateCoverLetterHandler(ev);
    expect(r.statusCode).toBe(500);
  });

  it('listCoverLettersHandler 500 when service throws', async () => {
    vi.mocked(getCoverLettersByUserId).mockRejectedValueOnce(new Error('ddb'));
    const r = await listCoverLettersHandler(authEvent({}) as any);
    expect(r.statusCode).toBe(500);
  });

  it('suggestWhyCompanyHandler 500 when Groq errors', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false, status: 502, text: async () => 'err' });
    const r = await suggestWhyCompanyHandler(
      authEvent({
        companyName: 'Acme',
        jobTitle: 'Eng',
        jobDescription: 'long enough job description text for validation rules',
      }) as any
    );
    expect(r.statusCode).toBe(500);
  });

  it('enhanceAchievementHandler 500 when Groq errors', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false, status: 500, text: async () => 'e' });
    const r = await enhanceAchievementHandler(
      authEvent({ achievement: 'Did things well', language: 'en' }) as any
    );
    expect(r.statusCode).toBe(500);
  });

  it('enhanceAchievementHandler strips quotes', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '"Led team"' } }],
      }),
    });
    const r = await enhanceAchievementHandler(
      authEvent({
        achievement: 'Led team',
        jobTitle: 'PM',
        companyName: 'Co',
        language: 'en',
      }) as any
    );
    expect(r.statusCode).toBe(200);
    expect(JSON.parse(r.body || '{}').data).toBe('Led team');
  });

  it('regenerateParagraphHandler 400 when cover letter id missing', async () => {
    const r = await regenerateParagraphHandler(
      authEvent({ paragraphType: 'body', data: baseData }, undefined) as any
    );
    expect(r.statusCode).toBe(400);
  });

  it('regenerateParagraphHandler 404 when user not found', async () => {
    vi.mocked(getUserById).mockResolvedValueOnce(null);
    const r = await regenerateParagraphHandler(
      authEvent({ paragraphType: 'body', data: baseData }, { id: 'cl1' }) as any
    );
    expect(r.statusCode).toBe(404);
  });

  it('regenerateParagraphHandler 404 when cover letter missing', async () => {
    vi.mocked(getCoverLetterById).mockResolvedValueOnce(null);
    const r = await regenerateParagraphHandler(
      authEvent({ paragraphType: 'body', data: baseData }, { id: 'missing' }) as any
    );
    expect(r.statusCode).toBe(404);
  });

  it('regenerateParagraphHandler 400 when body missing', async () => {
    const ev = authEvent({ paragraphType: 'body', data: baseData }, { id: 'cl1' }) as any;
    ev.body = null;
    expect((await regenerateParagraphHandler(ev)).statusCode).toBe(400);
  });

  it('regenerateParagraphHandler 400 when paragraphType missing', async () => {
    const r = await regenerateParagraphHandler(
      authEvent({ data: baseData }, { id: 'cl1' }) as any
    );
    expect(r.statusCode).toBe(400);
  });

  it('regenerateParagraphHandler 429 when rate limited', async () => {
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 5000,
    });
    const r = await regenerateParagraphHandler(
      authEvent({ paragraphType: 'body', data: baseData }, { id: 'cl1' }) as any
    );
    expect(r.statusCode).toBe(429);
  });

  it('regenerateParagraphHandler 401', async () => {
    const ev = authEvent({ paragraphType: 'body', data: baseData }, { id: 'cl1' }) as any;
    ev.requestContext.authorizer = undefined;
    expect((await regenerateParagraphHandler(ev)).statusCode).toBe(401);
  });

  it('generateCoverLetterHandler 400 when body missing', async () => {
    const ev = authEvent({ data: baseData }) as any;
    ev.body = null;
    expect((await generateCoverLetterHandler(ev)).statusCode).toBe(400);
  });

  it('generateCoverLetterHandler 400 when data missing', async () => {
    expect((await generateCoverLetterHandler(authEvent({}) as any)).statusCode).toBe(400);
  });

  it('listCoverLettersHandler 401', async () => {
    const ev = authEvent({}) as any;
    ev.requestContext.authorizer = undefined;
    expect((await listCoverLettersHandler(ev)).statusCode).toBe(401);
  });

  it('getCoverLetterHandler 401 and 400', async () => {
    const ev = authEvent({}, { id: 'cl1' }) as any;
    ev.requestContext.authorizer = undefined;
    expect((await getCoverLetterHandler(ev)).statusCode).toBe(401);
    expect(
      (await getCoverLetterHandler(authEvent({}, null as any) as any)).statusCode
    ).toBe(400);
  });

  it('createCoverLetterHandler 401 and 400 variants', async () => {
    const ev = authEvent({ data: baseData }) as any;
    ev.requestContext.authorizer = undefined;
    expect((await createCoverLetterHandler(ev)).statusCode).toBe(401);
    const noBody = authEvent({}) as any;
    noBody.body = null;
    expect((await createCoverLetterHandler(noBody)).statusCode).toBe(400);
    expect((await createCoverLetterHandler(authEvent({ title: 'T' }) as any)).statusCode).toBe(400);
  });

  it('updateCoverLetterHandler 401 400 404', async () => {
    const ev = authEvent({ status: 'draft' }, { id: 'cl1' }) as any;
    ev.requestContext.authorizer = undefined;
    expect((await updateCoverLetterHandler(ev)).statusCode).toBe(401);
    expect(
      (await updateCoverLetterHandler(authEvent({ status: 'x' }, null as any) as any)).statusCode
    ).toBe(400);
    vi.mocked(getCoverLetterById).mockResolvedValueOnce(null);
    expect(
      (await updateCoverLetterHandler(authEvent({ status: 'draft' }, { id: 'x' }) as any)).statusCode
    ).toBe(404);
  });

  it('updateCoverLetterHandler 400 missing body', async () => {
    const ev = authEvent({ status: 'draft' }, { id: 'cl1' }) as any;
    ev.body = null;
    expect((await updateCoverLetterHandler(ev)).statusCode).toBe(400);
  });

  it('deleteCoverLetterHandler 401 400 404', async () => {
    const ev = authEvent({}, { id: 'cl1' }) as any;
    ev.requestContext.authorizer = undefined;
    expect((await deleteCoverLetterHandler(ev)).statusCode).toBe(401);
    expect((await deleteCoverLetterHandler(authEvent({}, null as any) as any)).statusCode).toBe(400);
    vi.mocked(getCoverLetterById).mockResolvedValueOnce(null);
    expect(
      (await deleteCoverLetterHandler(authEvent({}, { id: 'nope' }) as any)).statusCode
    ).toBe(404);
  });

  it('suggestWhyCompanyHandler 401 404 403 429 400', async () => {
    const body = {
      companyName: 'Acme',
      jobTitle: 'Eng',
      jobDescription: 'long enough job description text for validation rules',
    };
    const ev = authEvent(body) as any;
    ev.requestContext.authorizer = undefined;
    expect((await suggestWhyCompanyHandler(ev)).statusCode).toBe(401);
    vi.mocked(getUserById).mockResolvedValueOnce(null);
    expect((await suggestWhyCompanyHandler(authEvent(body) as any)).statusCode).toBe(404);
    vi.mocked(getUserById).mockResolvedValueOnce({ ...premiumUser, isPremium: false } as any);
    expect((await suggestWhyCompanyHandler(authEvent(body) as any)).statusCode).toBe(403);
    vi.mocked(getUserById).mockResolvedValueOnce(premiumUser as any);
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 1000,
    });
    expect((await suggestWhyCompanyHandler(authEvent(body) as any)).statusCode).toBe(429);
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 9,
      resetTime: Date.now() + 60000,
    });
    const noBody = authEvent(body) as any;
    noBody.body = null;
    expect((await suggestWhyCompanyHandler(noBody)).statusCode).toBe(400);
  });

  it('enhanceAchievementHandler 401 403 400', async () => {
    const ev = authEvent({ achievement: 'Did well with enough length here', language: 'en' }) as any;
    ev.requestContext.authorizer = undefined;
    expect((await enhanceAchievementHandler(ev)).statusCode).toBe(401);
    vi.mocked(getUserById).mockResolvedValueOnce({ ...premiumUser, isPremium: false } as any);
    expect(
      (await enhanceAchievementHandler(
        authEvent({ achievement: 'Did well with enough length here', language: 'en' }) as any
      )).statusCode
    ).toBe(403);
    vi.mocked(getUserById).mockResolvedValueOnce(premiumUser as any);
    expect(
      (await enhanceAchievementHandler(
        authEvent({ achievement: '   ', language: 'en' }) as any
      )).statusCode
    ).toBe(400);
  });
});
