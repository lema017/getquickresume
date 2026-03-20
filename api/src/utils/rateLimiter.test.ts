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
  return {
    DynamoDBDocumentClient: {
      from: () => ({ send: sendMock }),
    },
    GetCommand,
    PutCommand,
  };
});

import { checkRateLimit, getClientIP } from './rateLimiter';

describe('utils/rateLimiter', () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it('getClientIP reads forwarded header', () => {
    expect(
      getClientIP({
        headers: { 'x-forwarded-for': '1.1.1.1, 2.2.2.2' },
      })
    ).toBe('1.1.1.1');
    expect(getClientIP({ requestContext: { identity: { sourceIp: '9.9.9.9' } } })).toBe('9.9.9.9');
    expect(getClientIP({})).toBe('unknown');
  });

  it('checkRateLimit creates window when empty', async () => {
    sendMock.mockResolvedValueOnce({});
    sendMock.mockResolvedValueOnce({});
    const r = await checkRateLimit('ip', 'ep', 10, 60);
    expect(r.allowed).toBe(true);
  });

  it('checkRateLimit denies when at cap', async () => {
    const now = Math.floor(Date.now() / 1000);
    sendMock.mockResolvedValueOnce({
      Item: { id: 'x', count: 10, windowStart: now },
    });
    const r = await checkRateLimit('ip', 'ep', 10, 3600);
    expect(r.allowed).toBe(false);
  });

  it('checkRateLimit fail-open', async () => {
    sendMock.mockRejectedValueOnce(new Error('err'));
    const r = await checkRateLimit('ip', 'ep', 5, 60);
    expect(r.allowed).toBe(true);
  });
});
