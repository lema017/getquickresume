import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { APIGatewayProxyEvent } from 'aws-lambda';
import { makeAuthorizerContext, makeAuthorizedEvent } from '../test-utils/apiGateway';

const getResumeById = vi.hoisted(() => vi.fn());
const updateResume = vi.hoisted(() => vi.fn());
const getResumeByShareToken = vi.hoisted(() => vi.fn());
const getUserById = vi.hoisted(() => vi.fn());
const getAnalytics = vi.hoisted(() => vi.fn());
const getRecentViewers = vi.hoisted(() => vi.fn());
const checkRateLimit = vi.hoisted(() => vi.fn());
const getClientIP = vi.hoisted(() => vi.fn());

vi.mock('../services/resumeService', () => ({
  getResumeById,
  updateResume,
  getResumeByShareToken,
}));
vi.mock('../services/dynamodb', () => ({ getUserById }));
vi.mock('../services/analyticsService', () => ({ getAnalytics, getRecentViewers }));
vi.mock('../utils/rateLimiter', () => ({ checkRateLimit, getClientIP }));

import {
  enableSharing,
  disableSharing,
  getSharingAnalytics,
  getPublicRecentViewers,
} from './resumeSharing';

const now = new Date().toISOString();
const premiumUser = {
  id: 'u1',
  email: 'p@test.com',
  firstName: 'P',
  lastName: 'R',
  provider: 'google' as const,
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
};

function authEv(over: Partial<APIGatewayProxyEvent> = {}): APIGatewayProxyEvent {
  return {
    ...makeAuthorizedEvent({ authorizer: makeAuthorizerContext('u1', 'p@test.com') }),
    pathParameters: { id: 'rid' },
    ...over,
  } as APIGatewayProxyEvent;
}

const genResume = {
  id: 'rid',
  generatedResume: '<html>x</html>',
  shareToken: undefined as string | undefined,
  shareCreatedAt: undefined as string | undefined,
  isPubliclyShared: false,
};

describe('resumeSharing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getClientIP.mockReturnValue('8.8.8.8');
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 59,
      resetAt: Math.floor(Date.now() / 1000) + 120,
    });
  });

  describe('enableSharing', () => {
    it('401 without authorizer', async () => {
      const ev = authEv();
      (ev as { requestContext: { authorizer?: unknown } }).requestContext.authorizer = undefined;
      const r = await enableSharing(ev as Parameters<typeof enableSharing>[0]);
      expect(r.statusCode).toBe(401);
    });

    it('400 without resume id', async () => {
      const r = await enableSharing(
        authEv({ pathParameters: null }) as Parameters<typeof enableSharing>[0]
      );
      expect(r.statusCode).toBe(400);
    });

    it('404 when user missing', async () => {
      getUserById.mockResolvedValueOnce(undefined);
      const r = await enableSharing(authEv() as Parameters<typeof enableSharing>[0]);
      expect(r.statusCode).toBe(404);
    });

    it('403 when not premium', async () => {
      getUserById.mockResolvedValueOnce({ ...premiumUser, isPremium: false });
      const r = await enableSharing(authEv() as Parameters<typeof enableSharing>[0]);
      expect(r.statusCode).toBe(403);
    });

    it('403 when premium expired', async () => {
      getUserById.mockResolvedValueOnce({
        ...premiumUser,
        subscriptionExpiration: '2000-01-01T00:00:00.000Z',
      });
      const r = await enableSharing(authEv() as Parameters<typeof enableSharing>[0]);
      expect(r.statusCode).toBe(403);
      const b = JSON.parse(r.body || '{}');
      expect(b.error).toContain('expired');
    });

    it('404 when resume missing', async () => {
      getUserById.mockResolvedValueOnce(premiumUser as never);
      getResumeById.mockResolvedValueOnce(null);
      const r = await enableSharing(authEv() as Parameters<typeof enableSharing>[0]);
      expect(r.statusCode).toBe(404);
    });

    it('400 when resume not generated', async () => {
      getUserById.mockResolvedValueOnce(premiumUser as never);
      getResumeById.mockResolvedValueOnce({ ...genResume, generatedResume: '' });
      const r = await enableSharing(authEv() as Parameters<typeof enableSharing>[0]);
      expect(r.statusCode).toBe(400);
    });

    it('200 enables sharing', async () => {
      getUserById.mockResolvedValueOnce(premiumUser as never);
      getResumeById.mockResolvedValueOnce({
        ...genResume,
        generatedResume: 'x',
        shareToken: undefined,
      });
      updateResume.mockResolvedValueOnce({
        shareToken: 'tok123456789',
        isPubliclyShared: true,
      });
      const r = await enableSharing(authEv() as Parameters<typeof enableSharing>[0]);
      expect(r.statusCode).toBe(200);
      const b = JSON.parse(r.body || '{}');
      expect(b.data.shareUrl).toContain('tok123456789');
    });

    it('200 reuses existing share token', async () => {
      getUserById.mockResolvedValueOnce(premiumUser as never);
      getResumeById.mockResolvedValueOnce({
        ...genResume,
        generatedResume: 'x',
        shareToken: 'existingtok12',
        shareCreatedAt: '2020-01-01',
      });
      updateResume.mockResolvedValueOnce({
        shareToken: 'existingtok12',
        isPubliclyShared: true,
      });
      const r = await enableSharing(authEv() as Parameters<typeof enableSharing>[0]);
      expect(r.statusCode).toBe(200);
    });
  });

  describe('disableSharing', () => {
    it('401 without authorizer', async () => {
      const ev = authEv();
      (ev as { requestContext: { authorizer?: unknown } }).requestContext.authorizer = undefined;
      expect((await disableSharing(ev as Parameters<typeof disableSharing>[0])).statusCode).toBe(401);
    });

    it('400 without resume id', async () => {
      const r = await disableSharing(
        authEv({ pathParameters: null }) as Parameters<typeof disableSharing>[0]
      );
      expect(r.statusCode).toBe(400);
    });

    it('404 when resume missing', async () => {
      getResumeById.mockResolvedValueOnce(null);
      const r = await disableSharing(authEv() as Parameters<typeof disableSharing>[0]);
      expect(r.statusCode).toBe(404);
    });

    it('200 disables', async () => {
      getResumeById.mockResolvedValueOnce({ id: 'rid' });
      const r = await disableSharing(authEv() as Parameters<typeof disableSharing>[0]);
      expect(r.statusCode).toBe(200);
      expect(updateResume).toHaveBeenCalledWith('u1', 'rid', { isPubliclyShared: false });
    });
  });

  describe('getSharingAnalytics', () => {
    it('401', async () => {
      const ev = authEv();
      (ev as { requestContext: { authorizer?: unknown } }).requestContext.authorizer = undefined;
      expect((await getSharingAnalytics(ev as Parameters<typeof getSharingAnalytics>[0])).statusCode).toBe(
        401
      );
    });

    it('400 without id', async () => {
      const r = await getSharingAnalytics(
        authEv({ pathParameters: null }) as Parameters<typeof getSharingAnalytics>[0]
      );
      expect(r.statusCode).toBe(400);
    });

    it('404 resume', async () => {
      getResumeById.mockResolvedValueOnce(null);
      const r = await getSharingAnalytics(authEv() as Parameters<typeof getSharingAnalytics>[0]);
      expect(r.statusCode).toBe(404);
    });

    it('400 not shared', async () => {
      getResumeById.mockResolvedValueOnce({
        id: 'rid',
        shareToken: undefined,
        isPubliclyShared: false,
      });
      const r = await getSharingAnalytics(authEv() as Parameters<typeof getSharingAnalytics>[0]);
      expect(r.statusCode).toBe(400);
    });

    it('200 with analytics', async () => {
      getResumeById.mockResolvedValueOnce({
        id: 'rid',
        shareToken: 'stok12345',
        isPubliclyShared: true,
      });
      getAnalytics.mockResolvedValueOnce({ totalViews: 3, uniqueViews: 2 } as never);
      const r = await getSharingAnalytics(authEv() as Parameters<typeof getSharingAnalytics>[0]);
      expect(r.statusCode).toBe(200);
    });

    it('500 when getAnalytics throws', async () => {
      getResumeById.mockResolvedValueOnce({
        id: 'rid',
        shareToken: 'stok12345',
        isPubliclyShared: true,
      });
      getAnalytics.mockRejectedValueOnce(new Error('ddb'));
      const r = await getSharingAnalytics(authEv() as Parameters<typeof getSharingAnalytics>[0]);
      expect(r.statusCode).toBe(500);
    });
  });

  describe('getPublicRecentViewers', () => {
    it('400 invalid token', async () => {
      const r = await getPublicRecentViewers({
        pathParameters: { shareToken: 'short' },
        queryStringParameters: null,
      } as APIGatewayProxyEvent);
      expect(r.statusCode).toBe(400);
    });

    it('429 when rate limited', async () => {
      checkRateLimit.mockResolvedValueOnce({
        allowed: false,
        remaining: 0,
        resetAt: Math.floor(Date.now() / 1000) + 30,
      });
      const r = await getPublicRecentViewers({
        pathParameters: { shareToken: 'longenough1' },
      } as APIGatewayProxyEvent);
      expect(r.statusCode).toBe(429);
    });

    it('404 unknown share', async () => {
      getResumeByShareToken.mockResolvedValueOnce(null);
      const r = await getPublicRecentViewers({
        pathParameters: { shareToken: 'longenough1' },
      } as APIGatewayProxyEvent);
      expect(r.statusCode).toBe(404);
    });

    it('200 caps limit', async () => {
      getResumeByShareToken.mockResolvedValueOnce({ id: 'r' });
      getRecentViewers.mockResolvedValueOnce([]);
      const r = await getPublicRecentViewers({
        pathParameters: { shareToken: 'longenough1' },
        queryStringParameters: { limit: '999' },
      } as APIGatewayProxyEvent);
      expect(r.statusCode).toBe(200);
      expect(getRecentViewers).toHaveBeenCalledWith('longenough1', 50);
    });

    it('500 on error', async () => {
      getResumeByShareToken.mockRejectedValueOnce(new Error('x'));
      const r = await getPublicRecentViewers({
        pathParameters: { shareToken: 'longenough1' },
      } as APIGatewayProxyEvent);
      expect(r.statusCode).toBe(500);
    });
  });
});
