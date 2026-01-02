import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

// Configuration for local development and production
const client = new DynamoDBClient({
  region: process.env.REGION || 'us-east-1',
  ...(process.env.DYNAMODB_ENDPOINT && {
    endpoint: process.env.DYNAMODB_ENDPOINT,
    credentials: {
      accessKeyId: 'local',
      secretAccessKey: 'local'
    }
  })
});

const dynamodb = DynamoDBDocumentClient.from(client);
const tableName = process.env.RATE_LIMITS_TABLE || 'getquickresume-api-rate-limits-dev';

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Check rate limit for a given IP and endpoint
 * @param ip - Client IP address
 * @param endpoint - Endpoint identifier for scoping limits
 * @param maxRequests - Maximum requests allowed in the window (default: 60)
 * @param windowSeconds - Time window in seconds (default: 60)
 * @returns RateLimitResult with allowed status, remaining requests, and reset time
 */
export async function checkRateLimit(
  ip: string,
  endpoint: string,
  maxRequests: number = 60,
  windowSeconds: number = 60
): Promise<RateLimitResult> {
  const key = `ratelimit:${endpoint}:${ip}`;
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - windowSeconds;

  try {
    // Get current rate limit record
    const result = await dynamodb.send(new GetCommand({
      TableName: tableName,
      Key: { id: key }
    }));

    const record = result.Item;

    // If no record or window has expired, create new window
    if (!record || record.windowStart < windowStart) {
      await dynamodb.send(new PutCommand({
        TableName: tableName,
        Item: {
          id: key,
          count: 1,
          windowStart: now,
          ttl: now + (windowSeconds * 2) // Auto-cleanup after 2x window
        }
      }));
      return {
        allowed: true,
        remaining: maxRequests - 1,
        resetAt: now + windowSeconds
      };
    }

    // Check if limit exceeded
    if (record.count >= maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: record.windowStart + windowSeconds
      };
    }

    // Increment counter
    await dynamodb.send(new PutCommand({
      TableName: tableName,
      Item: {
        ...record,
        count: record.count + 1
      }
    }));

    return {
      allowed: true,
      remaining: maxRequests - record.count - 1,
      resetAt: record.windowStart + windowSeconds
    };
  } catch (error) {
    console.error('[RateLimiter] Error checking rate limit:', error);
    // Fail open to prevent blocking legitimate users on errors
    return {
      allowed: true,
      remaining: maxRequests,
      resetAt: now + windowSeconds
    };
  }
}

/**
 * Extract client IP from API Gateway event
 * @param event - API Gateway event object
 * @returns Client IP address or 'unknown'
 */
export function getClientIP(event: { 
  requestContext?: { identity?: { sourceIp?: string } };
  headers?: Record<string, string | undefined>;
}): string {
  // Check X-Forwarded-For header first (for requests through CloudFront/ALB)
  const forwardedFor = event.headers?.['X-Forwarded-For'] || event.headers?.['x-forwarded-for'];
  if (forwardedFor) {
    // X-Forwarded-For can contain multiple IPs, the first is the client
    return forwardedFor.split(',')[0].trim();
  }
  
  // Fall back to direct source IP
  return event.requestContext?.identity?.sourceIp || 'unknown';
}

