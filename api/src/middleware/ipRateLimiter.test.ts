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

import {
  extractClientIp,
  checkIpRateLimit,
  logPublicSuspiciousActivity,
} from './ipRateLimiter';
import type { APIGatewayProxyEvent } from 'aws-lambda';

describe('ipRateLimiter', () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it('extractClientIp prefers sourceIp and forwarded-for', () => {
    const e1 = {
      requestContext: { identity: { sourceIp: '1.2.3.4' } },
    } as unknown as APIGatewayProxyEvent;
    expect(extractClientIp(e1)).toBe('1.2.3.4');
    const e2 = {
      headers: { 'X-Forwarded-For': '9.9.9.9, 8.8.8.8' },
    } as unknown as APIGatewayProxyEvent;
    expect(extractClientIp(e2)).toBe('9.9.9.9');
    expect(extractClientIp({} as APIGatewayProxyEvent)).toBe('unknown');
  });

  it('checkIpRateLimit rejects unknown ip', async () => {
    const r = await checkIpRateLimit('', 'ep', 3, 1000);
    expect(r.allowed).toBe(false);
    const r2 = await checkIpRateLimit('unknown', 'ep', 3, 1000);
    expect(r2.allowed).toBe(false);
  });

  it('checkIpRateLimit first put allows', async () => {
    sendMock.mockResolvedValueOnce({});
    sendMock.mockResolvedValueOnce({});
    const r = await checkIpRateLimit('1.1.1.1', 't', 3, 60_000);
    expect(r.allowed).toBe(true);
    expect(r.remaining).toBe(2);
  });

  it('checkIpRateLimit increments within window', async () => {
    const now = Date.now();
    sendMock.mockResolvedValueOnce({
      Item: { requestCount: 1, windowStart: now },
    });
    sendMock.mockResolvedValueOnce({});
    const r = await checkIpRateLimit('2.2.2.2', 't', 3, 60_000);
    expect(r.allowed).toBe(true);
  });

  it('checkIpRateLimit blocks at cap', async () => {
    const now = Date.now();
    sendMock.mockResolvedValueOnce({
      Item: { requestCount: 3, windowStart: now },
    });
    const r = await checkIpRateLimit('3.3.3.3', 't', 3, 60_000);
    expect(r.allowed).toBe(false);
  });

  it('checkIpRateLimit fail-open on dynamo error', async () => {
    sendMock.mockRejectedValueOnce(new Error('ddb'));
    const r = await checkIpRateLimit('4.4.4.4', 't', 5, 60_000);
    expect(r.allowed).toBe(true);
  });

  it('logPublicSuspiciousActivity does not throw', () => {
    expect(() =>
      logPublicSuspiciousActivity('1.2.3.4', 'pub', 'reason', 'ua'.repeat(200))
    ).not.toThrow();
  });
});
