import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { APIGatewayProxyEvent } from 'aws-lambda';

type RC = APIGatewayProxyEvent['requestContext'];

const sendMock = vi.hoisted(() => vi.fn());
const checkIpRateLimit = vi.hoisted(() => vi.fn());
const logPublicSuspiciousActivity = vi.hoisted(() => vi.fn());

vi.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: class {
    constructor() {}
  },
}));

vi.mock('@aws-sdk/lib-dynamodb', () => {
  class UpdateCommand {
    constructor(public input: unknown) {}
  }
  return {
    DynamoDBDocumentClient: { from: () => ({ send: sendMock }) },
    UpdateCommand,
  };
});

vi.mock('../middleware/ipRateLimiter', () => ({
  checkIpRateLimit,
  logPublicSuspiciousActivity,
}));

import { handler } from './publicLeadCapture';

function event(over: Partial<APIGatewayProxyEvent> = {}): APIGatewayProxyEvent {
  return {
    httpMethod: 'POST',
    body: JSON.stringify({ email: 'a@b.com', phone: '+15551234567', country: 'US' }),
    headers: { 'content-type': 'application/json' },
    requestContext: {
      identity: { sourceIp: '1.2.3.4' },
    },
    ...over,
  } as APIGatewayProxyEvent;
}

describe('publicLeadCapture handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    checkIpRateLimit.mockResolvedValue({ allowed: true, remaining: 4, resetTime: 1 });
    sendMock.mockResolvedValue({});
  });

  it('OPTIONS', async () => {
    const res = await handler(event({ httpMethod: 'OPTIONS' }));
    expect(res.statusCode).toBe(200);
  });

  it('rate limited returns 200 ok', async () => {
    checkIpRateLimit.mockResolvedValueOnce({ allowed: false, remaining: 0, resetTime: 1 });
    const res = await handler(event());
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body || '{}').ok).toBe(true);
    expect(logPublicSuspiciousActivity).toHaveBeenCalled();
  });

  it('validation fail returns 200 ok', async () => {
    const res = await handler(
      event({ headers: { 'content-type': 'text/plain' }, body: '{}' })
    );
    expect(res.statusCode).toBe(200);
    expect(logPublicSuspiciousActivity).toHaveBeenCalled();
  });

  it('writes lead and returns ok', async () => {
    const res = await handler(
      event({
        requestContext: {
          identity: { sourceIp: '' },
        } as APIGatewayProxyEvent['requestContext'],
        headers: {
          'content-type': 'application/json',
          'X-Forwarded-For': '9.9.9.9, 1.1.1.1',
        },
      })
    );
    expect(res.statusCode).toBe(200);
    expect(sendMock).toHaveBeenCalled();
  });

  it('500 on dynamo error', async () => {
    sendMock.mockRejectedValueOnce(new Error('ddb'));
    const res = await handler(event());
    expect(res.statusCode).toBe(500);
  });

  it('uses unknown ip when headers missing', async () => {
    const res = await handler(
      event({
        requestContext: { identity: {} } as RC,
        headers: {},
      })
    );
    expect(res.statusCode).toBe(200);
  });
});
