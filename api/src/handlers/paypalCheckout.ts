/**
 * PayPal Checkout Handlers (Security Hardened)
 * 
 * Lambda handlers for PayPal checkout operations:
 * - createPayPalOrder: Creates a PayPal order for the selected plan
 * - capturePayPalOrder: Captures payment after buyer approval and upgrades user
 * 
 * Security Features:
 * - Order status verification before capture
 * - Idempotency protection against double-capture attacks
 * - Amount verification against expected prices
 * - Rate limiting on order creation
 * - CORS restricted to production domain
 * - Sanitized error responses
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import * as paypalService from '../services/paypalService';
import { PLAN_PRICES } from '../services/paypalService';
import { upgradeUserToPremium, getUserById } from '../services/dynamodb';
import { sendPremiumWelcomeEmail } from '../services/emailService';

// DynamoDB client for rate limiting and idempotency
const client = new DynamoDBClient({
  region: process.env.REGION || 'us-east-1',
  endpoint: process.env.DYNAMODB_ENDPOINT || undefined,
});
const dynamodb = DynamoDBDocumentClient.from(client);
const RATE_LIMITS_TABLE = process.env.RATE_LIMITS_TABLE || 'getquickresume-api-rate-limits-dev';

// CORS headers - restricted to production domain
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const corsHeaders = {
  'Access-Control-Allow-Origin': FRONTEND_URL,
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Content-Type': 'application/json',
};

// Rate limit configuration for order creation
const ORDER_CREATION_RATE_LIMIT = {
  maxRequests: 5,      // 5 orders per window
  windowMs: 300000,    // 5 minutes window
};

/**
 * Extract user ID from the Lambda authorizer context
 */
function getUserIdFromEvent(event: APIGatewayProxyEvent): string | null {
  try {
    const authorizer = event.requestContext.authorizer;
    if (authorizer && authorizer.userId) {
      return authorizer.userId;
    }
    return null;
  } catch (error) {
    console.error('[PayPal] Error extracting userId from event');
    return null;
  }
}

/**
 * Check rate limit for order creation
 * Prevents abuse by limiting how many orders a user can create
 */
async function checkOrderCreationRateLimit(
  userId: string
): Promise<{ allowed: boolean; remaining: number }> {
  const key = `paypal-order:${userId}`;
  const now = Date.now();

  try {
    const result = await dynamodb.send(new GetCommand({
      TableName: RATE_LIMITS_TABLE,
      Key: { key },
    }));

    const record = result.Item;

    // If no record or window expired, create new window
    if (!record || now - record.windowStart > ORDER_CREATION_RATE_LIMIT.windowMs) {
      await dynamodb.send(new PutCommand({
        TableName: RATE_LIMITS_TABLE,
        Item: {
          key,
          requestCount: 1,
          windowStart: now,
          ttl: Math.floor(now / 1000) + 3600, // 1 hour TTL
        },
      }));
      return { allowed: true, remaining: ORDER_CREATION_RATE_LIMIT.maxRequests - 1 };
    }

    // Check if limit exceeded
    if (record.requestCount >= ORDER_CREATION_RATE_LIMIT.maxRequests) {
      return { allowed: false, remaining: 0 };
    }

    // Increment counter
    await dynamodb.send(new PutCommand({
      TableName: RATE_LIMITS_TABLE,
      Item: {
        ...record,
        requestCount: record.requestCount + 1,
      },
    }));

    return { allowed: true, remaining: ORDER_CREATION_RATE_LIMIT.maxRequests - record.requestCount - 1 };
  } catch (error) {
    console.error('[PayPal] Rate limit check failed');
    // Fail open to prevent blocking legitimate users
    return { allowed: true, remaining: ORDER_CREATION_RATE_LIMIT.maxRequests };
  }
}

/**
 * Check if an order has already been processed (idempotency)
 * Prevents double-capture attacks
 */
async function isOrderAlreadyProcessed(orderId: string): Promise<boolean> {
  const key = `paypal-processed:${orderId}`;

  try {
    const result = await dynamodb.send(new GetCommand({
      TableName: RATE_LIMITS_TABLE,
      Key: { key },
    }));

    return !!result.Item;
  } catch (error) {
    console.error('[PayPal] Error checking processed order');
    return false;
  }
}

/**
 * Mark an order as processed (for idempotency)
 * Uses conditional write to prevent race conditions
 */
async function markOrderAsProcessed(
  orderId: string,
  userId: string,
  transactionId: string
): Promise<boolean> {
  const key = `paypal-processed:${orderId}`;
  const now = Date.now();

  try {
    await dynamodb.send(new PutCommand({
      TableName: RATE_LIMITS_TABLE,
      Item: {
        key,
        orderId,
        userId,
        transactionId,
        processedAt: now,
        ttl: Math.floor(now / 1000) + (30 * 24 * 3600), // 30 days TTL
      },
      ConditionExpression: 'attribute_not_exists(#k)',
      ExpressionAttributeNames: {
        '#k': 'key',
      },
    }));
    return true;
  } catch (error: any) {
    if (error.name === 'ConditionalCheckFailedException') {
      // Order was already processed by another request (race condition prevented)
      console.warn(`[PayPal] Order ${orderId} already processed (race condition prevented)`);
      return false;
    }
    console.error('[PayPal] Error marking order as processed');
    throw error;
  }
}

/**
 * Create PayPal Order Handler
 * 
 * POST /api/paypal/create-order
 * 
 * Security features:
 * - Rate limiting (5 orders per 5 minutes)
 * - User authentication required
 * - Premium status check
 */
export async function createPayPalOrder(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    // Get user ID from authorizer
    const userId = getUserIdFromEvent(event);
    if (!userId) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Authentication required',
        }),
      };
    }

    // Check rate limit
    const rateLimit = await checkOrderCreationRateLimit(userId);
    if (!rateLimit.allowed) {
      return {
        statusCode: 429,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Too many order attempts. Please try again later.',
        }),
      };
    }

    // Verify user exists
    const user = await getUserById(userId);
    if (!user) {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'User not found',
        }),
      };
    }

    // Check if user is already premium
    if (user.isPremium && user.subscriptionExpiration) {
      const expirationDate = new Date(user.subscriptionExpiration);
      if (expirationDate > new Date()) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({
            success: false,
            error: 'You already have an active premium subscription',
          }),
        };
      }
    }

    // Parse and validate request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Missing request body',
        }),
      };
    }

    let body;
    try {
      body = JSON.parse(event.body);
    } catch {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Invalid request body',
        }),
      };
    }

    const { planType } = body;

    // Validate plan type (strict validation)
    if (!planType || !['monthly', 'yearly'].includes(planType)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Invalid plan type',
        }),
      };
    }

    // Create PayPal order
    const order = await paypalService.createOrder(planType, userId);

    // Find approval URL from order links
    const approvalLink = order.links?.find(link => link.rel === 'approve');
    const approvalUrl = approvalLink?.href || null;

    console.log(`[PayPal] Order created: ${order.id} for user: ${userId.substring(0, 8)}...`);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        orderId: order.id,
        approvalUrl,
        status: order.status,
      }),
    };
  } catch (error) {
    console.error('[PayPal] Order creation failed');

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'Failed to create order. Please try again.',
      }),
    };
  }
}

/**
 * Capture PayPal Order Handler
 * 
 * POST /api/paypal/capture-order
 * 
 * Security features:
 * - Order status verification (must be APPROVED)
 * - Idempotency protection (prevents double-capture)
 * - Amount verification (ensures correct price)
 * - User ID verification (prevents capture hijacking)
 */
export async function capturePayPalOrder(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    // Get user ID from authorizer
    const userId = getUserIdFromEvent(event);
    if (!userId) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Authentication required',
        }),
      };
    }

    // Parse and validate request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Missing request body',
        }),
      };
    }

    let body;
    try {
      body = JSON.parse(event.body);
    } catch {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Invalid request body',
        }),
      };
    }

    const { orderId } = body;

    if (!orderId || typeof orderId !== 'string') {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Invalid order ID',
        }),
      };
    }

    // SECURITY: Check if order was already processed (idempotency)
    const alreadyProcessed = await isOrderAlreadyProcessed(orderId);
    if (alreadyProcessed) {
      console.warn(`[PayPal] Duplicate capture attempt for order: ${orderId}`);
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          success: true,
          message: 'Payment was already processed',
          duplicate: true,
        }),
      };
    }

    // SECURITY: Verify order status before capture
    let orderDetails;
    try {
      orderDetails = await paypalService.getOrderDetails(orderId);
    } catch (error) {
      console.error(`[PayPal] Failed to get order details for: ${orderId}`);
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Invalid or expired order',
        }),
      };
    }

    // Order must be in APPROVED state to be captured
    if (orderDetails.status !== 'APPROVED') {
      console.warn(`[PayPal] Invalid order status: ${orderDetails.status} for order: ${orderId}`);
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Order is not ready for capture',
        }),
      };
    }

    // Capture the payment
    const captureResult = await paypalService.captureOrder(orderId);

    // Verify capture was successful
    if (captureResult.status !== 'COMPLETED') {
      console.error(`[PayPal] Capture not completed. Status: ${captureResult.status}`);
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Payment capture failed',
        }),
      };
    }

    // Extract custom data (userId and planType) from the capture response
    const customData = paypalService.extractCustomData(captureResult);
    
    if (!customData) {
      console.error('[PayPal] Could not extract custom data from capture response');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Payment processing error',
        }),
      };
    }

    // SECURITY: Verify the userId matches (prevents capture hijacking)
    if (customData.userId !== userId) {
      console.error(`[PayPal] User mismatch! JWT: ${userId.substring(0, 8)}..., Order: ${customData.userId.substring(0, 8)}...`);
      return {
        statusCode: 403,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Payment verification failed',
        }),
      };
    }

    // Get capture details
    const capture = captureResult.purchase_units?.[0]?.payments?.captures?.[0];
    const transactionId = capture?.id || orderId;
    const payerId = captureResult.payer?.payer_id || '';

    // SECURITY: Verify captured amount matches expected price
    const expectedPrice = PLAN_PRICES[customData.planType];
    const capturedAmount = capture?.amount?.value;
    const capturedCurrency = capture?.amount?.currency_code;

    if (
      capturedAmount !== expectedPrice.amount ||
      capturedCurrency !== expectedPrice.currency
    ) {
      console.error(`[PayPal] Amount mismatch! Expected: ${expectedPrice.amount} ${expectedPrice.currency}, Got: ${capturedAmount} ${capturedCurrency}`);
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Payment amount verification failed',
        }),
      };
    }

    // SECURITY: Mark order as processed BEFORE upgrading user (prevents race conditions)
    const markedProcessed = await markOrderAsProcessed(orderId, userId, transactionId);
    if (!markedProcessed) {
      // Another request already processed this order
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          success: true,
          message: 'Payment was already processed',
          duplicate: true,
        }),
      };
    }

    // Upgrade user to premium
    const updatedUser = await upgradeUserToPremium(
      userId,
      customData.planType,
      'paypal',
      payerId,
      undefined, // No subscription ID for one-time payments
      transactionId
    );

    console.log(`[PayPal] User upgraded: ${userId.substring(0, 8)}... to ${customData.planType}`);

    // Send welcome email with purchase invoice (non-blocking)
    sendPremiumWelcomeEmail(updatedUser, customData.planType, {
      transactionId,
      amount: capturedAmount || '',
      currency: capturedCurrency || 'USD',
      paymentDate: new Date().toISOString(),
      subscriptionExpiration: updatedUser.subscriptionExpiration || '',
    }).catch((emailError) => {
      // Log but don't fail the payment flow if email fails
      console.error('[PayPal] Failed to send welcome email:', emailError);
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        message: 'Payment completed successfully',
        transactionId,
        planType: customData.planType,
        subscriptionExpiration: updatedUser.subscriptionExpiration,
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          isPremium: updatedUser.isPremium,
          planType: updatedUser.planType,
          subscriptionExpiration: updatedUser.subscriptionExpiration,
        },
      }),
    };
  } catch (error) {
    console.error('[PayPal] Capture failed');

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'Payment processing failed. Please contact support.',
      }),
    };
  }
}
