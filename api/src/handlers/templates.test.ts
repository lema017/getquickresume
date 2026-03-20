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

const validJsCode =
  "customElements.define('resume-footest', class extends HTMLElement {})";

describe('listTemplates', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 59,
      resetTime: Date.now() + 60000,
    });
    listAll.mockResolvedValue([
      {
        id: 't1',
        name: 'Classic',
        description: 'd',
        category: 'c',
        tagName: 'classic',
        s3Key: 'templates/t1.js',
        hash: 'abc',
      },
    ]);
    getCode.mockResolvedValue('export default {}');
  });

  it('returns 401 without userId in authorizer', async () => {
    const ev = makeAuthorizedEvent({
      authorizer: { userId: '', email: 'e@test.com' },
    });
    const res = await listTemplates(ev);
    expect(res.statusCode).toBe(401);
    const body = JSON.parse(res.body || '{}');
    expect(body.success).toBe(false);
  });

  it('returns 429 when rate limited', async () => {
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: 77,
    });
    const res = await listTemplates(makeAuthorizedEvent());
    expect(res.statusCode).toBe(429);
  });

  it('returns 200 with templates array', async () => {
    const res = await listTemplates(makeAuthorizedEvent());
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body || '{}');
    expect(body.templates).toHaveLength(1);
    expect(body.templates[0].id).toBe('t1');
    expect(body.templates[0].jsCode).toBe('export default {}');
  });

  it('returns 500 when templateService.listAll throws', async () => {
    listAll.mockRejectedValueOnce(new Error('S3 error'));
    const res = await listTemplates(makeAuthorizedEvent());
    expect(res.statusCode).toBe(500);
  });
});

describe('createTemplate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 29,
      resetTime: Date.now() + 60000,
    });
    createTemplateSvc.mockResolvedValue({
      id: 'new-t',
      name: 'N',
      description: 'd',
      category: 'free',
      tagName: 'resume-footest',
      s3Key: 'k',
      hash: 'h',
    });
  });

  function postEvt(body: unknown) {
    return {
      httpMethod: 'POST',
      body: typeof body === 'string' ? body : JSON.stringify(body),
      requestContext: { requestId: 'req-create-1' },
    } as Parameters<typeof createTemplate>[0];
  }

  it('returns 400 without body', async () => {
    const res = await createTemplate({
      ...postEvt(null),
      body: null,
    } as Parameters<typeof createTemplate>[0]);
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 for invalid JSON', async () => {
    const res = await createTemplate(postEvt('{not json'));
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when required fields missing', async () => {
    const res = await createTemplate(postEvt({ id: 'x' }));
    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res.body || '{}');
    expect(body.error).toMatch(/Missing required fields/);
  });

  it('returns 400 when category invalid', async () => {
    const res = await createTemplate(
      postEvt({
        id: 't1',
        name: 'N',
        category: 'gold',
        tagName: 'resume-footest',
        jsCode: validJsCode,
      })
    );
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when tagName invalid', async () => {
    const res = await createTemplate(
      postEvt({
        id: 't1',
        name: 'N',
        category: 'free',
        tagName: 'Invalid',
        jsCode: validJsCode,
      })
    );
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when jsCode missing customElements.define', async () => {
    const res = await createTemplate(
      postEvt({
        id: 't1',
        name: 'N',
        category: 'free',
        tagName: 'resume-footest',
        jsCode: 'console.log(1)',
      })
    );
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when jsCode contains eval', async () => {
    const res = await createTemplate(
      postEvt({
        id: 't1',
        name: 'N',
        category: 'free',
        tagName: 'resume-footest',
        jsCode: `${validJsCode}\neval('1')`,
      })
    );
    expect(res.statusCode).toBe(400);
  });

  it('returns 201 on success', async () => {
    const res = await createTemplate(
      postEvt({
        id: 't1',
        name: 'N',
        category: 'free',
        tagName: 'resume-footest',
        jsCode: validJsCode,
      })
    );
    expect(res.statusCode).toBe(201);
    const body = JSON.parse(res.body || '{}');
    expect(body.success).toBe(true);
    expect(body.data.id).toBe('new-t');
  });

  it('returns 429 when rate limited', async () => {
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: 1,
    });
    const res = await createTemplate(postEvt({}));
    expect(res.statusCode).toBe(429);
  });

  it('returns 409 when template already exists', async () => {
    createTemplateSvc.mockRejectedValueOnce(new Error('already exists'));
    const res = await createTemplate(
      postEvt({
        id: 't1',
        name: 'N',
        category: 'free',
        tagName: 'resume-footest',
        jsCode: validJsCode,
      })
    );
    expect(res.statusCode).toBe(409);
  });

  it('returns 503 when S3 bucket missing', async () => {
    createTemplateSvc.mockRejectedValueOnce({
      Code: 'NoSuchBucket',
      BucketName: 'missing-bucket',
    });
    const res = await createTemplate(
      postEvt({
        id: 't1',
        name: 'N',
        category: 'free',
        tagName: 'resume-footest',
        jsCode: validJsCode,
      })
    );
    expect(res.statusCode).toBe(503);
  });

  it('returns 503 when TEMPLATES_BUCKET not configured message', async () => {
    createTemplateSvc.mockRejectedValueOnce(
      new Error('TEMPLATES_BUCKET is not configured')
    );
    const res = await createTemplate(
      postEvt({
        id: 't1',
        name: 'N',
        category: 'free',
        tagName: 'resume-footest',
        jsCode: validJsCode,
      })
    );
    expect(res.statusCode).toBe(503);
  });
});
