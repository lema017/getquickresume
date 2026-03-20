import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { APIGatewayProxyEvent } from 'aws-lambda';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';

const getResumeByShareToken = vi.hoisted(() => vi.fn());
const recordView = vi.hoisted(() => vi.fn());
const parseUserAgent = vi.hoisted(() => vi.fn());

vi.mock('../services/resumeService', () => ({ getResumeByShareToken }));
vi.mock('../services/analyticsService', () => ({ recordView, parseUserAgent }));

import { getPublicResume, recordPublicView } from './publicResume';

const resume = {
  id: 'rid',
  title: 'T',
  resumeData: {},
  generatedResume: '',
  status: 'active',
  createdAt: 'a',
  updatedAt: 'b',
};

function baseEvent(over: Partial<APIGatewayProxyEvent> = {}): APIGatewayProxyEvent {
  const ev = makeAuthorizedEvent({
    path: '/public/tok',
    httpMethod: 'GET',
    pathParameters: { shareToken: 'tok' },
  });
  return { ...ev, ...over } as APIGatewayProxyEvent;
}

describe('getPublicResume', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    parseUserAgent.mockReturnValue({ device: 'd', browser: 'b', os: 'o' });
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'success', country: 'US', city: 'NYC' }),
    }) as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns 400 without share token', async () => {
    const ev = baseEvent({ pathParameters: null });
    const res = await getPublicResume(ev);
    expect(res.statusCode).toBe(400);
  });

  it('returns 404 when resume missing', async () => {
    getResumeByShareToken.mockResolvedValueOnce(null);
    const res = await getPublicResume(baseEvent());
    expect(res.statusCode).toBe(404);
  });

  it('returns 200 with resume payload', async () => {
    getResumeByShareToken.mockResolvedValueOnce(resume);
    const res = await getPublicResume(baseEvent());
    expect(res.statusCode).toBe(200);
    const b = JSON.parse(res.body || '{}');
    expect(b.success).toBe(true);
    expect(b.data.id).toBe('rid');
    expect(recordView).not.toHaveBeenCalled();
  });

  it('uses x-forwarded-for and skips geo for private IP', async () => {
    getResumeByShareToken.mockResolvedValueOnce(resume);
    const ev = baseEvent({
      headers: { 'x-forwarded-for': '203.0.113.9, 10.0.0.1' },
      requestContext: {
        ...baseEvent().requestContext,
        identity: { ...baseEvent().requestContext.identity, sourceIp: '127.0.0.1' },
      },
    });
    await getPublicResume(ev);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('uses X-Forwarded-For capitalized when lower missing', async () => {
    getResumeByShareToken.mockResolvedValueOnce(resume);
    const ev = baseEvent({
      headers: { 'X-Forwarded-For': '8.8.8.8' },
      requestContext: {
        ...baseEvent().requestContext,
        identity: { ...baseEvent().requestContext.identity, sourceIp: '' },
      },
    });
    await getPublicResume(ev);
    expect(globalThis.fetch).toHaveBeenCalled();
  });

  it('geo: non-ok response returns empty location', async () => {
    getResumeByShareToken.mockResolvedValueOnce(resume);
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });
    const ev = baseEvent({
      requestContext: {
        ...baseEvent().requestContext,
        identity: { ...baseEvent().requestContext.identity, sourceIp: '8.8.8.8' },
      },
    });
    const out = await getPublicResume(ev);
    expect(out.statusCode).toBe(200);
  });

  it('geo: fail status in JSON', async () => {
    getResumeByShareToken.mockResolvedValueOnce(resume);
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 'fail' }),
    });
    const ev = baseEvent({
      requestContext: {
        ...baseEvent().requestContext,
        identity: { ...baseEvent().requestContext.identity, sourceIp: '8.8.8.8' },
      },
    });
    const res = await getPublicResume(ev);
    expect(res.statusCode).toBe(200);
  });

  it('geo: fetch throws', async () => {
    getResumeByShareToken.mockResolvedValueOnce(resume);
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('net'));
    const ev = baseEvent({
      requestContext: {
        ...baseEvent().requestContext,
        identity: { ...baseEvent().requestContext.identity, sourceIp: '8.8.8.8' },
      },
    });
    const res = await getPublicResume(ev);
    expect(res.statusCode).toBe(200);
  });

  it('uses User-Agent header variant and referer', async () => {
    getResumeByShareToken.mockResolvedValueOnce(resume);
    const ev = baseEvent({
      headers: {
        'User-Agent': 'Mozilla/5.0',
        Referer: 'https://x.com',
      },
    });
    await getPublicResume(ev);
    expect(parseUserAgent).toHaveBeenCalledWith('Mozilla/5.0');
  });

  it('returns 500 on unexpected error', async () => {
    getResumeByShareToken.mockRejectedValueOnce(new Error('db'));
    const res = await getPublicResume(baseEvent());
    expect(res.statusCode).toBe(500);
  });
});

describe('recordPublicView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    parseUserAgent.mockReturnValue({ device: 'd', browser: 'b', os: 'o' });
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'success', country: 'US', city: 'NYC' }),
    }) as unknown as typeof fetch;
  });

  it('returns 400 without token', async () => {
    const res = await recordPublicView(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        pathParameters: null,
      }) as APIGatewayProxyEvent
    );
    expect(res.statusCode).toBe(400);
  });

  it('returns 404 when resume missing', async () => {
    getResumeByShareToken.mockResolvedValueOnce(null);
    const res = await recordPublicView(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        pathParameters: { shareToken: 't' },
      }) as APIGatewayProxyEvent
    );
    expect(res.statusCode).toBe(404);
  });

  it('records view and returns 200', async () => {
    getResumeByShareToken.mockResolvedValueOnce(resume);
    recordView.mockResolvedValueOnce(undefined);
    const res = await recordPublicView(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        pathParameters: { shareToken: 't' },
        headers: { 'user-agent': 'ua' },
      }) as APIGatewayProxyEvent
    );
    expect(res.statusCode).toBe(200);
    expect(recordView).toHaveBeenCalled();
  });

  it('returns 500 when recordView throws', async () => {
    getResumeByShareToken.mockResolvedValueOnce(resume);
    recordView.mockRejectedValueOnce(new Error('x'));
    const res = await recordPublicView(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        pathParameters: { shareToken: 't' },
      }) as APIGatewayProxyEvent
    );
    expect(res.statusCode).toBe(500);
  });
});
