import { describe, it, expect, vi, beforeEach } from 'vitest';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';

const checkRateLimit = vi.hoisted(() => vi.fn());
const listAll = vi.hoisted(() => vi.fn());
const getCode = vi.hoisted(() => vi.fn());
const createTemplateSvc = vi.hoisted(() => vi.fn());

vi.mock('../middleware/rateLimiter', () => ({ checkRateLimit }));
vi.mock('../services/templateService', () => ({
  templateService: {
    listAll,
    getCode,
    createTemplate: createTemplateSvc,
  },
}));

import { listTemplates, createTemplate } from './templates';

const validJs =
  "customElements.define('resume-footest', class extends HTMLElement {})";

describe('templates.coverage branches', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 59,
      resetTime: Date.now() + 60000,
    });
  });

  it('listTemplates uses name and tagName fallbacks', async () => {
    listAll.mockResolvedValueOnce([
      {
        id: 'bare',
        name: '',
        description: 'd',
        category: 'free',
        tagName: '',
        s3Key: 'k.js',
        hash: 'h',
      },
    ]);
    getCode.mockResolvedValueOnce('export default {}');
    const res = await listTemplates(makeAuthorizedEvent());
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body || '{}');
    expect(body.templates[0].name).toBe('Template');
    expect(body.templates[0].tagName).toBe('bare');
  });

  it('listTemplates 500 when getCode throws', async () => {
    listAll.mockResolvedValueOnce([
      {
        id: 't1',
        name: 'N',
        description: 'd',
        category: 'free',
        tagName: 'resume-footest',
        s3Key: 'k.js',
        hash: 'h',
      },
    ]);
    getCode.mockRejectedValueOnce(new Error('S3 read failed'));
    const res = await listTemplates(makeAuthorizedEvent());
    expect(res.statusCode).toBe(500);
  });

  it('createTemplate 400 when jsCode empty string', async () => {
    createTemplateSvc.mockResolvedValue({});
    const res = await createTemplate({
      httpMethod: 'POST',
      body: JSON.stringify({
        id: 't1',
        name: 'N',
        category: 'free',
        tagName: 'resume-footest',
        jsCode: '   ',
      }),
      requestContext: { requestId: 'r1' },
    } as Parameters<typeof createTemplate>[0]);
    expect(res.statusCode).toBe(400);
  });

  it('createTemplate 400 when jsCode too large', async () => {
    const res = await createTemplate({
      httpMethod: 'POST',
      body: JSON.stringify({
        id: 't1',
        name: 'N',
        category: 'free',
        tagName: 'resume-footest',
        jsCode: `${validJs}${'x'.repeat(500 * 1024)}`,
      }),
      requestContext: { requestId: 'r1' },
    } as Parameters<typeof createTemplate>[0]);
    expect(res.statusCode).toBe(400);
  });

  it('createTemplate 400 when jsCode uses Function constructor', async () => {
    const res = await createTemplate({
      httpMethod: 'POST',
      body: JSON.stringify({
        id: 't1',
        name: 'N',
        category: 'free',
        tagName: 'resume-footest',
        jsCode: `${validJs}\nnew Function('return 1')`,
      }),
      requestContext: { requestId: 'r1' },
    } as Parameters<typeof createTemplate>[0]);
    expect(res.statusCode).toBe(400);
  });

  it('createTemplate 500 generic error includes message', async () => {
    const prev = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    createTemplateSvc.mockRejectedValueOnce(new Error('unexpected'));
    const res = await createTemplate({
      httpMethod: 'POST',
      body: JSON.stringify({
        id: 't1',
        name: 'N',
        category: 'free',
        tagName: 'resume-footest',
        jsCode: validJs,
      }),
      requestContext: { requestId: 'r1' },
    } as Parameters<typeof createTemplate>[0]);
    process.env.NODE_ENV = prev;
    expect(res.statusCode).toBe(500);
    const b = JSON.parse(res.body || '{}');
    expect(b.error).toMatch(/unexpected/);
  });
});
