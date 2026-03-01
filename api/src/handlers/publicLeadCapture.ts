import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { checkIpRateLimit, logPublicSuspiciousActivity } from '../middleware/ipRateLimiter';
import { validateLeadCaptureInput } from '../utils/inputSanitizer';

const client = new DynamoDBClient({
  region: process.env.REGION || 'us-east-1',
  ...(process.env.DYNAMODB_ENDPOINT && {
    endpoint: process.env.DYNAMODB_ENDPOINT,
    credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
  }),
});
const dynamodb = DynamoDBDocumentClient.from(client);
const LEADS_TABLE = process.env.MARKETING_LEADS_TABLE || 'marketing-leads';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  const ip = event.requestContext?.identity?.sourceIp || event.headers['X-Forwarded-For']?.split(',')[0]?.trim() || 'unknown';

  try {
    const rateLimitResult = await checkIpRateLimit(ip, 'lead-capture', 5, 24 * 60 * 60 * 1000);
    if (!rateLimitResult.allowed) {
      logPublicSuspiciousActivity(ip, 'lead-capture', 'Rate limited');
      return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ ok: true }) };
    }

    const validation = validateLeadCaptureInput(event.body, event.headers['content-type'] || event.headers['Content-Type']);
    if (!validation.isValid) {
      logPublicSuspiciousActivity(ip, 'lead-capture', `Validation failed: ${validation.reason}`);
      return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ ok: true }) };
    }

    const now = new Date().toISOString();
    const ttl = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;

    await dynamodb.send(new UpdateCommand({
      TableName: LEADS_TABLE,
      Key: { email: validation.sanitizedEmail },
      UpdateExpression: 'SET phone = :phone, country = :country, ip = :ip, updatedAt = :now, createdAt = if_not_exists(createdAt, :now), #ttl = :ttl',
      ExpressionAttributeNames: { '#ttl': 'ttl' },
      ExpressionAttributeValues: {
        ':phone': validation.sanitizedPhone,
        ':country': validation.sanitizedCountry,
        ':ip': ip,
        ':now': now,
        ':ttl': ttl,
      },
    }));

    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ ok: true }) };
  } catch (error) {
    console.error('Lead capture error:', error);
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ ok: false }) };
  }
};
