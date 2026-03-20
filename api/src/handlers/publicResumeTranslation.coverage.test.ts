import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { APIGatewayProxyEvent } from 'aws-lambda';

const checkIpRateLimit = vi.hoisted(() => vi.fn());
const extractClientIp = vi.hoisted(() => vi.fn());
const logPublicSuspiciousActivity = vi.hoisted(() => vi.fn());
const validatePublicTranslationInput = vi.hoisted(() => vi.fn());
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
    validatePublicTranslationInput,
  };
});
vi.mock('../utils/outputValidator', () => ({ detectOutputInjection }));
vi.mock('../services/aiUsageService', () => ({ trackAIUsage }));

import { handler } from './publicResumeTranslation';

const longText = `experience work history education skills summary profile
managed led developed created implemented designed achieved improved
john@work.com 555-123-4567
${'word '.repeat(200)}`;

function evt(over: Partial<APIGatewayProxyEvent> = {}): APIGatewayProxyEvent {
  return {
    httpMethod: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: longText,
      sourceLanguage: 'en',
      targetLanguage: 'es',
    }),
    isBase64Encoded: false,
    requestContext: {
      identity: { sourceIp: '9.9.9.9' },
    } as APIGatewayProxyEvent['requestContext'],
    ...over,
  } as APIGatewayProxyEvent;
}

describe('publicResumeTranslation handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    extractClientIp.mockReturnValue('9.9.9.9');
    checkIpRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 2,
      resetTime: Date.now() + 3600_000,
    });
    validatePublicTranslationInput.mockReturnValue({
      isValid: true,
      sanitizedText: longText,
    });
    detectOutputInjection.mockReturnValue({ isValid: true, reason: '' });
    trackAIUsage.mockResolvedValue(undefined);
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'Texto traducido profesional con experiencia.' } }],
        usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
      }),
    }) as unknown as typeof fetch;
  });

  it('OPTIONS', async () => {
    expect((await handler(evt({ httpMethod: 'OPTIONS', body: null }))).statusCode).toBe(200);
  });

  it('429', async () => {
    checkIpRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 10_000,
    });
    expect((await handler(evt())).statusCode).toBe(429);
  });

  it('400 validation', async () => {
    validatePublicTranslationInput.mockReturnValueOnce({ isValid: false, reason: 'bad' });
    expect((await handler(evt())).statusCode).toBe(400);
  });

  it('200 success', async () => {
    const r = await handler(evt());
    expect(r.statusCode).toBe(200);
    expect(JSON.parse(r.body || '{}').success).toBe(true);
  });

  it('500 output injection', async () => {
    detectOutputInjection.mockReturnValueOnce({ isValid: false, reason: 'injection' });
    expect((await handler(evt())).statusCode).toBe(500);
  });

  it('500 on translate error', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('api'));
    expect((await handler(evt())).statusCode).toBe(500);
  });

  it('500 when Groq returns non-OK with JSON error', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 429,
      statusText: 'Too Many',
      text: async () => JSON.stringify({ error: { message: 'Rate limit' } }),
    });
    expect((await handler(evt())).statusCode).toBe(500);
  });

  it('500 when Groq returns non-OK with plain text body', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Err',
      text: async () => 'not-json',
    });
    expect((await handler(evt())).statusCode).toBe(500);
  });

  it('200 tolerates trackAIUsage rejection', async () => {
    trackAIUsage.mockRejectedValueOnce(new Error('track'));
    expect((await handler(evt())).statusCode).toBe(200);
  });

  it('omits sourceLanguage (auto-detect branch)', async () => {
    const body = JSON.parse(evt().body as string);
    delete (body as { sourceLanguage?: string }).sourceLanguage;
    expect((await handler(evt({ body: JSON.stringify(body) }))).statusCode).toBe(200);
  });

  it('unknown targetLanguage falls back to raw code in prompt', async () => {
    const body = JSON.parse(evt().body as string);
    body.targetLanguage = 'ko';
    validatePublicTranslationInput.mockReturnValueOnce({
      isValid: true,
      sanitizedText: longText,
    });
    expect((await handler(evt({ body: JSON.stringify(body) }))).statusCode).toBe(200);
  });

  it('500 when translation content empty', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '' } }],
        usage: { prompt_tokens: 1, completion_tokens: 0, total_tokens: 1 },
      }),
    });
    expect((await handler(evt())).statusCode).toBe(500);
  });

  it('uses lowercase content-type and user-agent', async () => {
    const base = evt();
    expect(
      (
        await handler({
          ...base,
          headers: {
            'content-type': 'application/json',
            'user-agent': 'bot',
          },
        })
      ).statusCode
    ).toBe(200);
  });

  it('score teaser short text path', async () => {
    const short = 'hi';
    validatePublicTranslationInput.mockReturnValueOnce({ isValid: true, sanitizedText: short });
    expect(
      (
        await handler(
          evt({
            body: JSON.stringify({
              text: short,
              sourceLanguage: 'en',
              targetLanguage: 'es',
            }),
          })
        )
      ).statusCode
    ).toBe(200);
  });
});
