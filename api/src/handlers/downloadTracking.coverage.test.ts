import { describe, it, expect, vi, beforeEach } from 'vitest';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';

const trackDownload = vi.hoisted(() => vi.fn());
vi.mock('../services/downloadService', () => ({ trackDownload }));

import { trackResumeDownload } from './downloadTracking';

describe('trackResumeDownload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('401 without userId', async () => {
    const ev = makeAuthorizedEvent({ pathParameters: { id: 'r1' } });
    (ev.requestContext as { authorizer?: { userId?: string } }).authorizer = { userId: '' };
    expect((await trackResumeDownload(ev as never)).statusCode).toBe(401);
  });

  it('400 bad resume id', async () => {
    const ev = makeAuthorizedEvent({ pathParameters: { id: '  ' } });
    expect((await trackResumeDownload(ev as never)).statusCode).toBe(400);
  });

  it('200 allowed', async () => {
    trackDownload.mockResolvedValueOnce({
      allowed: true,
      freeDownloadUsed: false,
      totalDownloads: 1,
    });
    const ev = makeAuthorizedEvent({ pathParameters: { id: 'r1' } });
    expect((await trackResumeDownload(ev as never)).statusCode).toBe(200);
  });

  it('403 not allowed', async () => {
    trackDownload.mockResolvedValueOnce({
      allowed: false,
      freeDownloadUsed: true,
      totalDownloads: 1,
      message: 'limit',
    });
    const ev = makeAuthorizedEvent({ pathParameters: { id: 'r1' } });
    expect((await trackResumeDownload(ev as never)).statusCode).toBe(403);
  });

  it('404 not found message', async () => {
    trackDownload.mockRejectedValueOnce(new Error('Resume not found or access denied'));
    const ev = makeAuthorizedEvent({ pathParameters: { id: 'r1' } });
    expect((await trackResumeDownload(ev as never)).statusCode).toBe(404);
  });

  it('400 required message', async () => {
    trackDownload.mockRejectedValueOnce(new Error('User ID and Resume ID are required'));
    const ev = makeAuthorizedEvent({ pathParameters: { id: 'r1' } });
    expect((await trackResumeDownload(ev as never)).statusCode).toBe(400);
  });

  it('500 generic', async () => {
    trackDownload.mockRejectedValueOnce(new Error('other'));
    const ev = makeAuthorizedEvent({ pathParameters: { id: 'r1' } });
    expect((await trackResumeDownload(ev as never)).statusCode).toBe(500);
  });
});
