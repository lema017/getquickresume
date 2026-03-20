import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { APIGatewayProxyEvent } from 'aws-lambda';

const checkIpRateLimit = vi.hoisted(() => vi.fn());
const extractClientIp = vi.hoisted(() => vi.fn());
const logPublicSuspiciousActivity = vi.hoisted(() => vi.fn());
const validatePublicAtsCheckInput = vi.hoisted(() => vi.fn());
const detectOutputInjection = vi.hoisted(() => vi.fn());
const trackAIUsage = vi.hoisted(() => vi.fn());

vi.mock('../middleware/ipRateLimiter', () => ({
  checkIpRateLimit,
  extractClientIp,
  logPublicSuspiciousActivity,
}));
vi.mock('../utils/inputSanitizer', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../utils/inputSanitizer')>();
  return {
    ...actual,
    validatePublicAtsCheckInput,
  };
});
vi.mock('../utils/outputValidator', () => ({ detectOutputInjection }));
vi.mock('../services/aiUsageService', () => ({ trackAIUsage }));

import { handler } from './publicAtsCheck';

function evt(over: Partial<APIGatewayProxyEvent> = {}): APIGatewayProxyEvent {
  return {
    httpMethod: 'POST',
    path: '/public/ats-check',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `experience education skills summary
      managed led developed created implemented designed
      john@company.com 555-123-4567 linkedin.com/in/x
      - bullet one with metrics 25% and $1,000
      - bullet two
      - bullet three
      - bullet four
      - bullet five
      ${'word '.repeat(350)}`,
      profession: 'Engineer',
    }),
    isBase64Encoded: false,
    requestContext: {
      identity: { sourceIp: '1.2.3.4' },
    } as APIGatewayProxyEvent['requestContext'],
    ...over,
  } as APIGatewayProxyEvent;
}

describe('publicAtsCheck handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    extractClientIp.mockReturnValue('1.2.3.4');
    checkIpRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 2,
      resetTime: Date.now() + 3600_000,
    });
    validatePublicAtsCheckInput.mockReturnValue({
      isValid: true,
      sanitizedText: 'sanitized resume text content',
    });
    detectOutputInjection.mockReturnValue({ isValid: true, reason: '' });
    trackAIUsage.mockResolvedValue(undefined);
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify({
                hardSkills: ['Python', 'AWS', 'Docker', 'K8s', 'SQL'],
                softSkills: ['Leadership', 'Communication'],
                actionVerbs: ['Led', 'Built', 'Shipped', 'Scaled', 'Owned'],
                industryTerms: ['SaaS', 'CI/CD', 'Microservices', 'Agile', 'DevOps', 'API', 'Cloud'],
              }),
            },
          },
        ],
        usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
      }),
    }) as unknown as typeof fetch;
  });

  it('OPTIONS returns 200', async () => {
    const r = await handler(evt({ httpMethod: 'OPTIONS', body: null }));
    expect(r.statusCode).toBe(200);
  });

  it('429 when IP rate limited', async () => {
    checkIpRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 60_000,
    });
    const r = await handler(evt());
    expect(r.statusCode).toBe(429);
  });

  it('400 when validation fails', async () => {
    validatePublicAtsCheckInput.mockReturnValueOnce({
      isValid: false,
      reason: 'too short',
    });
    const r = await handler(evt());
    expect(r.statusCode).toBe(400);
  });

  it('200 success path with AI keywords', async () => {
    const r = await handler(evt());
    expect(r.statusCode).toBe(200);
    expect(JSON.parse(r.body || '{}').success).toBe(true);
  });

  it('200 uses fallback when AI fails', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('groq'));
    const r = await handler(evt());
    expect(r.statusCode).toBe(200);
  });

  it('200 uses fallback when keyword output fails injection check', async () => {
    detectOutputInjection.mockReturnValueOnce({ isValid: false, reason: 'injection' });
    const r = await handler(evt());
    expect(r.statusCode).toBe(200);
  });

  it('500 on unexpected error after validation', async () => {
    validatePublicAtsCheckInput.mockImplementationOnce(() => {
      throw new Error('boom');
    });
    const r = await handler(evt());
    expect(r.statusCode).toBe(500);
  });

  it('trackAIUsage failure still returns 200', async () => {
    trackAIUsage.mockRejectedValueOnce(new Error('usage'));
    const r = await handler(evt());
    expect(r.statusCode).toBe(200);
  });

  it('Groq non-OK with JSON error body uses message', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 429,
      statusText: 'Too',
      text: async () => JSON.stringify({ error: { message: 'rate limited' } }),
    });
    const r = await handler(evt());
    expect(r.statusCode).toBe(200);
  });

  it('Groq non-OK with non-JSON body uses statusText', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'ServerErr',
      text: async () => 'plain error',
    });
    const r = await handler(evt());
    expect(r.statusCode).toBe(200);
  });

  it('AI empty content uses deterministic fallback', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '   ' } }],
        usage: { prompt_tokens: 1, completion_tokens: 0, total_tokens: 1 },
      }),
    });
    expect((await handler(evt())).statusCode).toBe(200);
  });

  it('AI invalid JSON content uses fallback', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'not json {' } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    expect((await handler(evt())).statusCode).toBe(200);
  });

  it('works without profession (infer path)', async () => {
    const body = JSON.parse(evt().body as string);
    delete (body as { profession?: string }).profession;
    const r = await handler(evt({ body: JSON.stringify(body) }));
    expect(r.statusCode).toBe(200);
  });

  it('uses lowercase content-type and user-agent headers', async () => {
    const base = evt();
    const r = await handler({
      ...base,
      headers: {
        'content-type': 'application/json',
        'user-agent': 'vitest',
      },
    });
    expect(r.statusCode).toBe(200);
  });

  it('short resume text exercises deterministic branches', async () => {
    validatePublicAtsCheckInput.mockReturnValueOnce({
      isValid: true,
      sanitizedText: 'x',
    });
    const r = await handler(
      evt({
        body: JSON.stringify({
          text: 'no sections here',
          profession: 'P',
        }),
      })
    );
    expect(r.statusCode).toBe(200);
  });

  it('keyword tier blends aiScoreBonus at 8–14 keywords', async () => {
    const kw = JSON.stringify({
      hardSkills: ['a1', 'b1', 'c1', 'd1'],
      softSkills: ['e1', 'f1'],
      actionVerbs: ['g1', 'h1'],
      industryTerms: ['i1', 'j1'],
    });
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: kw } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    expect((await handler(evt())).statusCode).toBe(200);
  });
});
