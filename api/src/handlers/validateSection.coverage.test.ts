import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { User } from '../types';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';

const getUserById = vi.hoisted(() => vi.fn());
const checkRateLimit = vi.hoisted(() => vi.fn());
const trackAIUsage = vi.hoisted(() => vi.fn());
const getAIConfigForUser = vi.hoisted(() => vi.fn());

vi.mock('../services/dynamodb', () => ({ getUserById }));
vi.mock('../middleware/rateLimiter', () => ({ checkRateLimit }));
vi.mock('../services/aiUsageService', () => ({ trackAIUsage }));
vi.mock('../utils/aiProviderSelector', () => ({ getAIConfigForUser }));

import { validateSection } from './validateSection';

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

function groqJsonResponse(content: string) {
  return {
    ok: true,
    json: async () => ({
      choices: [{ message: { content } }],
      usage: {
        prompt_tokens: 10,
        completion_tokens: 5,
        total_tokens: 15,
        prompt_tokens_details: { cached_tokens: 2 },
      },
    }),
  };
}

function post(body: object) {
  return makeAuthorizedEvent({ httpMethod: 'POST', body: JSON.stringify(body) });
}

describe('validateSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 9,
      resetTime: Date.now() + 60000,
    });
    getAIConfigForUser.mockReturnValue({ model: 'llama' });
    trackAIUsage.mockResolvedValue(undefined);
    globalThis.fetch = vi.fn().mockResolvedValue(
      groqJsonResponse('{"isValid":true,"errors":[]}')
    ) as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('401 no authorizer', async () => {
    const ev = makeAuthorizedEvent();
    (ev as { requestContext: { authorizer?: unknown } }).requestContext.authorizer = undefined;
    expect((await validateSection(ev)).statusCode).toBe(401);
  });

  it('401 no userId', async () => {
    const ev = makeAuthorizedEvent();
    (ev.requestContext.authorizer as { userId?: string }).userId = '';
    expect((await validateSection(ev)).statusCode).toBe(401);
  });

  it('401 user missing', async () => {
    getUserById.mockResolvedValueOnce(null);
    expect((await validateSection(post({ section: 'skills', data: ['x'] }))).statusCode).toBe(
      401
    );
  });

  it('429', async () => {
    getUserById.mockResolvedValueOnce(user());
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 5000,
    });
    expect((await validateSection(post({ section: 'skills', data: ['x'] }))).statusCode).toBe(
      429
    );
  });

  it('400 no body', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect(
      (await validateSection(makeAuthorizedEvent({ httpMethod: 'POST', body: null })))
        .statusCode
    ).toBe(400);
  });

  it('400 bad json', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect(
      (await validateSection(makeAuthorizedEvent({ httpMethod: 'POST', body: 'x' }))).statusCode
    ).toBe(400);
  });

  it('400 invalid section', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect((await validateSection(post({ section: 'work', data: {} }))).statusCode).toBe(400);
  });

  it('400 missing data', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect((await validateSection(post({ section: 'skills', data: null }))).statusCode).toBe(400);
  });

  it('400 data primitive', async () => {
    getUserById.mockResolvedValueOnce(user());
    expect((await validateSection(post({ section: 'skills', data: 'x' }))).statusCode).toBe(400);
  });

  it.each(['education', 'skills', 'languages', 'contact'] as const)(
    '200 for section %s',
    async (section) => {
      getUserById.mockResolvedValueOnce(user({ isPremium: section === 'contact' }));
      const data =
        section === 'education'
          ? [{ institution: 'MIT', degree: 'BS', field: 'CS' }]
          : section === 'skills'
            ? ['Python']
            : section === 'languages'
              ? [{ language: 'English', level: 'Native' }]
              : { fullName: 'Jane Doe', email: 'j@example.com', phone: '+15550001' };
      const res = await validateSection(post({ section, data }));
      expect(res.statusCode).toBe(200);
      const b = JSON.parse(res.body || '{}');
      expect(b.success).toBe(true);
      expect(b.isValid).toBe(true);
    }
  );

  it('parses markdown wrapped json from AI', async () => {
    getUserById.mockResolvedValueOnce(user());
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      groqJsonResponse('```json\n{"isValid":false,"errors":[{"index":0,"field":"f","value":"v","reason":"bad"}]}\n```')
    );
    const res = await validateSection(post({ section: 'skills', data: ['bad'] }));
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body || '{}').isValid).toBe(false);
  });

  it('500 when groq not ok', async () => {
    getUserById.mockResolvedValueOnce(user());
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => 'err',
    });
    expect((await validateSection(post({ section: 'skills', data: ['x'] }))).statusCode).toBe(
      500
    );
  });

  it('handles unparseable AI content', async () => {
    getUserById.mockResolvedValueOnce(user());
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      groqJsonResponse('not-json')
    );
    const res = await validateSection(post({ section: 'skills', data: ['x'] }));
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body || '{}').isValid).toBe(false);
  });

  it('parses ``` fenced json without json label', async () => {
    getUserById.mockResolvedValueOnce(user());
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      groqJsonResponse('```\n{"isValid":true,"errors":[]}\n```')
    );
    const res = await validateSection(post({ section: 'skills', data: ['ok'] }));
    expect(JSON.parse(res.body || '{}').isValid).toBe(true);
  });

  it('treats non-array errors as empty list', async () => {
    getUserById.mockResolvedValueOnce(user());
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      groqJsonResponse('{"isValid":true,"errors":"not-an-array"}')
    );
    const res = await validateSection(post({ section: 'skills', data: ['ok'] }));
    expect(JSON.parse(res.body || '{}').isValid).toBe(true);
  });
});
