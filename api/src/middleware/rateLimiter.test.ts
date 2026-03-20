import { describe, it, expect, vi, beforeEach } from 'vitest';

const sendMock = vi.hoisted(() => vi.fn());

vi.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: class {
    constructor() {}
  },
}));

vi.mock('@aws-sdk/lib-dynamodb', () => {
  class GetCommand {
    constructor(public input: unknown) {}
  }
  class PutCommand {
    constructor(public input: unknown) {}
  }
  class UpdateCommand {
    constructor(public input: unknown) {}
  }
  return {
    DynamoDBDocumentClient: {
      from: () => ({ send: sendMock }),
    },
    GetCommand,
    PutCommand,
    UpdateCommand,
  };
});

import { checkRateLimit, refundRateLimit, logSuspiciousActivity } from './rateLimiter';

describe('checkRateLimit', () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it('returns not allowed when userId or endpoint missing', async () => {
    await expect(
      checkRateLimit('', 'ep', 5, 60000)
    ).resolves.toMatchObject({ allowed: false, remaining: 0 });
    await expect(
      checkRateLimit('u', '', 5, 60000)
    ).resolves.toMatchObject({ allowed: false, remaining: 0 });
  });

  it('first request in window: Put new record and allow', async () => {
    sendMock.mockResolvedValueOnce({});
    sendMock.mockResolvedValueOnce({});
    const r = await checkRateLimit('user1', 'gen', 5, 60000);
    expect(r.allowed).toBe(true);
    expect(r.remaining).toBe(4);
    expect(sendMock).toHaveBeenCalledTimes(2);
  });

  it('at cap within window: deny without Update', async () => {
    const windowStart = Date.now();
    sendMock.mockResolvedValueOnce({
      Item: {
        userId: 'user1',
        endpoint: 'gen',
        requestCount: 5,
        windowStart,
        ttl: 1,
      },
    });
    const r = await checkRateLimit('user1', 'gen', 5, 60000);
    expect(r.allowed).toBe(false);
    expect(r.remaining).toBe(0);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it('increments when under cap', async () => {
    const windowStart = Date.now();
    sendMock.mockResolvedValueOnce({
      Item: {
        userId: 'user1',
        endpoint: 'gen',
        requestCount: 2,
        windowStart,
        ttl: 1,
      },
    });
    sendMock.mockResolvedValueOnce({});
    const r = await checkRateLimit('user1', 'gen', 5, 60000);
    expect(r.allowed).toBe(true);
    expect(r.remaining).toBe(2);
    expect(sendMock).toHaveBeenCalledTimes(2);
  });

  it('resets window when expired', async () => {
    const oldStart = Date.now() - 120_000;
    sendMock.mockResolvedValueOnce({
      Item: {
        userId: 'user1',
        endpoint: 'gen',
        requestCount: 99,
        windowStart: oldStart,
        ttl: 1,
      },
    });
    sendMock.mockResolvedValueOnce({});
    const r = await checkRateLimit('user1', 'gen', 5, 60_000);
    expect(r.allowed).toBe(true);
    expect(r.remaining).toBe(4);
    expect(sendMock).toHaveBeenCalledTimes(2);
  });

  it('fails open when DynamoDB throws', async () => {
    sendMock.mockRejectedValueOnce(new Error('ddb down'));
    const r = await checkRateLimit('user1', 'gen', 5, 60000);
    expect(r.allowed).toBe(true);
    expect(r.remaining).toBe(5);
  });
});

describe('refundRateLimit', () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it('no-op when userId or endpoint missing', async () => {
    await refundRateLimit('', 'ep');
    await refundRateLimit('u', '');
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('decrements when record has requestCount > 0', async () => {
    sendMock.mockResolvedValueOnce({
      Item: { requestCount: 3 },
    });
    sendMock.mockResolvedValueOnce({});
    await refundRateLimit('user1', 'gen');
    expect(sendMock).toHaveBeenCalledTimes(2);
  });

  it('skips Update when requestCount is 0', async () => {
    sendMock.mockResolvedValueOnce({
      Item: { requestCount: 0 },
    });
    await refundRateLimit('user1', 'gen');
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it('swallows errors from Update', async () => {
    sendMock.mockResolvedValueOnce({ Item: { requestCount: 2 } });
    sendMock.mockRejectedValueOnce(new Error('conditional failed'));
    await expect(refundRateLimit('user1', 'gen')).resolves.toBeUndefined();
  });
});

describe('logSuspiciousActivity', () => {
  it('runs without throwing', async () => {
    await expect(
      logSuspiciousActivity('u1', 'ep', 'reason', 'input')
    ).resolves.toBeUndefined();
  });
});
