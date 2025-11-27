"use strict";
/**
 * Middleware de rate limiting para prevenir abuso de APIs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRateLimit = checkRateLimit;
exports.logSuspiciousActivity = logSuspiciousActivity;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({
    region: process.env.REGION || 'us-east-1',
    endpoint: process.env.DYNAMODB_ENDPOINT || undefined,
});
const ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const RATE_LIMITS_TABLE = process.env.RATE_LIMITS_TABLE || 'getquickresume-api-rate-limits-dev';
async function checkRateLimit(userId, endpoint, maxRequests = 5, windowMs = 60000 // 1 minuto
) {
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
        const { Item } = await ddbDocClient.send(new lib_dynamodb_1.GetCommand(getParams));
        if (!Item) {
            // Primera request - crear registro
            const newRecord = {
                userId,
                endpoint,
                requestCount: 1,
                windowStart: now,
                ttl: Math.floor(now / 1000) + 3600 // 1 hora TTL
            };
            await ddbDocClient.send(new lib_dynamodb_1.PutCommand({
                TableName: RATE_LIMITS_TABLE,
                Item: { key, ...newRecord }
            }));
            return {
                allowed: true,
                remaining: maxRequests - 1,
                resetTime: now + windowMs
            };
        }
        const record = Item;
        // Verificar si la ventana ha expirado
        if (now - record.windowStart > windowMs) {
            // Nueva ventana - resetear contador
            const updatedRecord = {
                userId,
                endpoint,
                requestCount: 1,
                windowStart: now,
                ttl: Math.floor(now / 1000) + 3600
            };
            await ddbDocClient.send(new lib_dynamodb_1.PutCommand({
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
        await ddbDocClient.send(new lib_dynamodb_1.UpdateCommand({
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
    }
    catch (error) {
        console.error('Rate limit check failed:', error);
        // En caso de error, permitir la request pero loggear
        return { allowed: true, remaining: maxRequests, resetTime: now + windowMs };
    }
}
async function logSuspiciousActivity(userId, endpoint, reason, input) {
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
    }
    catch (error) {
        console.error('Failed to log suspicious activity:', error);
    }
}
//# sourceMappingURL=rateLimiter.js.map