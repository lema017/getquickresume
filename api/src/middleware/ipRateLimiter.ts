/**
 * IP-based rate limiting middleware for public endpoints.
 * Uses DynamoDB with TTL for automatic cleanup.
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent } from 'aws-lambda';

const client = new DynamoDBClient({
  region: process.env.REGION || 'us-east-1',
  endpoint: process.env.DYNAMODB_ENDPOINT || undefined,
});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const RATE_LIMITS_TABLE = process.env.RATE_LIMITS_TABLE || 'getquickresume-api-rate-limits-dev';

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

/**
 * Extract the client IP from an API Gateway event.
 * Prefers sourceIp from requestContext; falls back to X-Forwarded-For first entry.
 */
export function extractClientIp(event: APIGatewayProxyEvent): string {
  const sourceIp = event.requestContext?.identity?.sourceIp;
  if (sourceIp) return sourceIp;

  const forwarded = event.headers?.['X-Forwarded-For'] || event.headers?.['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return 'unknown';
}

export interface IpRateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

/**
 * Check and enforce IP-based rate limiting for public endpoints.
 *
 * @param ip - Client IP address
 * @param endpoint - Endpoint identifier (e.g., 'public-translate')
 * @param maxRequests - Max requests allowed in the window (default: 3)
 * @param windowMs - Time window in ms (default: 24 hours)
 */
export async function checkIpRateLimit(
  ip: string,
  endpoint: string,
  maxRequests: number = 3,
  windowMs: number = TWENTY_FOUR_HOURS_MS
): Promise<IpRateLimitResult> {
  if (!ip || ip === 'unknown') {
    return { allowed: false, remaining: 0, resetTime: Date.now() + windowMs };
  }

  const now = Date.now();
  const key = `ip-${endpoint}-${ip}`;
  const ttlSeconds = Math.floor(now / 1000) + Math.ceil(windowMs / 1000) + 3600;

  try {
    const { Item } = await ddbDocClient.send(new GetCommand({
      TableName: RATE_LIMITS_TABLE,
      Key: { key },
    }));

    if (!Item) {
      await ddbDocClient.send(new PutCommand({
        TableName: RATE_LIMITS_TABLE,
        Item: {
          key,
          requestCount: 1,
          windowStart: now,
          ttl: ttlSeconds,
        },
      }));
      return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs };
    }

    if (now - Item.windowStart > windowMs) {
      await ddbDocClient.send(new PutCommand({
        TableName: RATE_LIMITS_TABLE,
        Item: {
          key,
          requestCount: 1,
          windowStart: now,
          ttl: ttlSeconds,
        },
      }));
      return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs };
    }

    if (Item.requestCount >= maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: Item.windowStart + windowMs,
      };
    }

    const newCount = Item.requestCount + 1;
    await ddbDocClient.send(new UpdateCommand({
      TableName: RATE_LIMITS_TABLE,
      Key: { key },
      UpdateExpression: 'SET requestCount = :count',
      ExpressionAttributeValues: { ':count': newCount },
    }));

    return { allowed: true, remaining: maxRequests - newCount, resetTime: Item.windowStart + windowMs };
  } catch (error) {
    console.error('[IpRateLimiter] Rate limit check failed, allowing request:', error);
    return { allowed: true, remaining: maxRequests, resetTime: now + windowMs };
  }
}

/**
 * Log suspicious activity from a public endpoint for abuse analysis.
 */
export function logPublicSuspiciousActivity(
  ip: string,
  endpoint: string,
  reason: string,
  userAgent?: string
): void {
  console.warn('[PublicEndpoint] Suspicious activity:', {
    ip,
    endpoint,
    reason,
    userAgent: userAgent ? userAgent.slice(0, 200) : undefined,
    timestamp: new Date().toISOString(),
  });
}
