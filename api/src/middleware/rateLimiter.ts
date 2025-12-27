/**
 * Middleware de rate limiting para prevenir abuso de APIs
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: process.env.REGION || 'us-east-1',
  endpoint: process.env.DYNAMODB_ENDPOINT || undefined,
});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const RATE_LIMITS_TABLE = process.env.RATE_LIMITS_TABLE || 'getquickresume-api-rate-limits-dev';

interface RateLimitRecord {
  userId: string;
  endpoint: string;
  requestCount: number;
  windowStart: number;
  ttl: number;
}

export async function checkRateLimit(
  userId: string, 
  endpoint: string,
  maxRequests: number = 5,
  windowMs: number = 60000 // 1 minuto
): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  
  if (!userId || !endpoint) {
    return { allowed: false, remaining: 0, resetTime: 0 };
  }

  const now = Date.now();
  const key = `${userId}-${endpoint}`;
  
  try {
    // Obtener registro actual
    const getParams = {
      TableName: RATE_LIMITS_TABLE,
      Key: { key }
    };

    const { Item } = await ddbDocClient.send(new GetCommand(getParams));

    if (!Item) {
      // Primera request - crear registro
      const newRecord: RateLimitRecord = {
        userId,
        endpoint,
        requestCount: 1,
        windowStart: now,
        ttl: Math.floor(now / 1000) + 3600 // 1 hora TTL
      };

      await ddbDocClient.send(new PutCommand({
        TableName: RATE_LIMITS_TABLE,
        Item: { key, ...newRecord }
      }));

      return { 
        allowed: true, 
        remaining: maxRequests - 1, 
        resetTime: now + windowMs 
      };
    }

    const record = Item as RateLimitRecord;

    // Verificar si la ventana ha expirado
    if (now - record.windowStart > windowMs) {
      // Nueva ventana - resetear contador
      const updatedRecord: RateLimitRecord = {
        userId,
        endpoint,
        requestCount: 1,
        windowStart: now,
        ttl: Math.floor(now / 1000) + 3600
      };

      await ddbDocClient.send(new PutCommand({
        TableName: RATE_LIMITS_TABLE,
        Item: { key, ...updatedRecord }
      }));

      return { 
        allowed: true, 
        remaining: maxRequests - 1, 
        resetTime: now + windowMs 
      };
    }

    // Verificar si ha excedido el límite
    if (record.requestCount >= maxRequests) {
      return { 
        allowed: false, 
        remaining: 0, 
        resetTime: record.windowStart + windowMs 
      };
    }

    // Incrementar contador
    const newCount = record.requestCount + 1;
    await ddbDocClient.send(new UpdateCommand({
      TableName: RATE_LIMITS_TABLE,
      Key: { key },
      UpdateExpression: 'SET requestCount = :count',
      ExpressionAttributeValues: {
        ':count': newCount
      }
    }));

    return { 
      allowed: true, 
      remaining: maxRequests - newCount, 
      resetTime: record.windowStart + windowMs 
    };

  } catch (error) {
    console.error('Rate limit check failed:', error);
    // En caso de error, permitir la request pero loggear
    return { allowed: true, remaining: maxRequests, resetTime: now + windowMs };
  }
}

/**
 * Refund a rate limit credit when a request fails with a server error (500)
 * This ensures users aren't penalized for server-side failures
 */
export async function refundRateLimit(
  userId: string,
  endpoint: string
): Promise<void> {
  if (!userId || !endpoint) return;

  const key = `${userId}-${endpoint}`;
  
  try {
    const { Item } = await ddbDocClient.send(new GetCommand({
      TableName: RATE_LIMITS_TABLE,
      Key: { key }
    }));

    if (Item && Item.requestCount > 0) {
      await ddbDocClient.send(new UpdateCommand({
        TableName: RATE_LIMITS_TABLE,
        Key: { key },
        UpdateExpression: 'SET requestCount = requestCount - :dec',
        ConditionExpression: 'requestCount > :zero',
        ExpressionAttributeValues: {
          ':dec': 1,
          ':zero': 0
        }
      }));
      console.log(`Rate limit refunded for ${userId} on ${endpoint}`);
    }
  } catch (error) {
    console.error('Rate limit refund failed:', error);
  }
}

export async function logSuspiciousActivity(
  userId: string,
  endpoint: string,
  reason: string,
  input?: string
): Promise<void> {
  try {
    console.warn(`Suspicious activity detected:`, {
      userId,
      endpoint,
      reason,
      timestamp: new Date().toISOString(),
      input: input ? input.slice(0, 100) : undefined // Solo primeros 100 chars
    });

    // Aquí podrías enviar a un servicio de monitoreo como CloudWatch
    // o a un sistema de alertas
    
  } catch (error) {
    console.error('Failed to log suspicious activity:', error);
  }
}
