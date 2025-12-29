import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { verifyPaddleWebhookSignature } from '../services/paddleService';
import { getUserById, upgradeUserToPremium, updateUser } from '../services/dynamodb';
import { sendPremiumWelcomeEmail, sendSubscriptionCanceledEmail } from '../services/emailService';
import { PaddleWebhookPayload } from '../types';

// Track processed events to prevent duplicate processing (idempotency)
const processedEvents = new Set<string>();

/**
 * Paddle Webhook Handler
 * 
 * Critical security requirements:
 * 1. ALWAYS verify webhook signature before processing
 * 2. Use raw request body for signature verification
 * 3. Return 200 immediately, process async
 * 4. Implement idempotency checks
 */
export const handlePaddleWebhook = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Paddle webhook received');

  // Get raw body for signature verification
  // Note: API Gateway may base64 encode the body
  let rawBody: string;
  if (event.isBase64Encoded) {
    rawBody = Buffer.from(event.body || '', 'base64').toString('utf-8');
  } else {
    rawBody = event.body || '';
  }

  if (!rawBody) {
    console.error('Webhook body is empty');
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Empty request body',
      }),
    };
  }

  // Get signature from headers
  const signature = event.headers['paddle-signature'] || 
                   event.headers['Paddle-Signature'] ||
                   event.headers['paddle-signature']?.toLowerCase();

  if (!signature) {
    console.error('Webhook signature header is missing');
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Missing signature',
      }),
    };
  }

  // Verify webhook signature - CRITICAL SECURITY STEP
  const isValidSignature = verifyPaddleWebhookSignature(rawBody, signature as string);
  
  if (!isValidSignature) {
    console.error('Webhook signature verification failed');
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Invalid signature',
      }),
    };
  }

  // Parse webhook payload
  let webhookData: PaddleWebhookPayload;
  try {
    webhookData = JSON.parse(rawBody);
  } catch (error) {
    console.error('Error parsing webhook payload:', error);
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Invalid JSON payload',
      }),
    };
  }

  // Idempotency check - prevent duplicate processing
  if (processedEvents.has(webhookData.event_id)) {
    console.log(`Event ${webhookData.event_id} already processed, skipping`);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Event already processed',
      }),
    };
  }

  // Mark event as processed (in production, use DynamoDB for persistence)
  processedEvents.add(webhookData.event_id);

  // Process webhook event synchronously before returning
  // This ensures the processing completes before Lambda terminates
  try {
    await processWebhookEvent(webhookData);
  } catch (error) {
    console.error('Error processing webhook event:', error);
    // Still return 200 to prevent Paddle retries for handled events
    // The error is logged for investigation
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      success: true,
      message: 'Webhook processed',
    }),
  };
};

/**
 * Process webhook event asynchronously
 */
async function processWebhookEvent(webhookData: PaddleWebhookPayload): Promise<void> {
  console.log(`Processing webhook event: ${webhookData.event_type} (${webhookData.event_id})`);

  try {
    switch (webhookData.event_type) {
      case 'transaction.completed':
        await handleTransactionCompleted(webhookData);
        break;
      
      case 'subscription.canceled':
        await handleSubscriptionCanceled(webhookData);
        break;
      
      case 'subscription.updated':
        await handleSubscriptionUpdated(webhookData);
        break;
      
      default:
        console.log(`Unhandled event type: ${webhookData.event_type}`);
    }
  } catch (error) {
    console.error(`Error processing ${webhookData.event_type}:`, error);
    throw error;
  }
}

/**
 * Handle transaction.completed event
 * Upgrades user to premium and sends welcome email
 */
async function handleTransactionCompleted(webhookData: PaddleWebhookPayload): Promise<void> {
  const transactionData = webhookData.data;
  
  // Extract user ID from custom_data
  const userId = transactionData.custom_data?.userId;
  
  if (!userId) {
    console.error('User ID not found in transaction custom_data');
    throw new Error('User ID missing from transaction');
  }

  // Get user
  const user = await getUserById(userId);
  if (!user) {
    console.error(`User not found: ${userId}`);
    throw new Error(`User not found: ${userId}`);
  }

  // Determine plan type from price_id
  const priceId = transactionData.items?.[0]?.price_id;
  const planType = determinePlanType(priceId);

  if (!planType) {
    console.error(`Unable to determine plan type from price_id: ${priceId}`);
    throw new Error('Invalid plan type');
  }

  // Check if user is already premium (idempotency)
  if (user.isPremium && user.paddleTransactionId === transactionData.id) {
    console.log(`User ${userId} already upgraded via transaction ${transactionData.id}`);
    return;
  }

  // Upgrade user to premium
  const updatedUser = await upgradeUserToPremium(
    userId,
    planType,
    transactionData.customer_id,
    transactionData.subscription_id,
    transactionData.id
  );

  console.log(`User ${userId} upgraded to premium (${planType})`);

  // Send welcome email (non-blocking)
  sendPremiumWelcomeEmail(updatedUser, planType).catch((error) => {
    console.error('Error sending welcome email:', error);
    // Don't throw - email failure shouldn't break the upgrade
  });
}

/**
 * Handle subscription.canceled event
 */
async function handleSubscriptionCanceled(webhookData: PaddleWebhookPayload): Promise<void> {
  const subscriptionData = webhookData.data;
  
  // Find user by subscription ID
  // Note: In production, you might want to maintain an index for this
  // For now, we'll need to search or store subscription_id -> user_id mapping
  
  // For simplicity, we'll update based on subscription_id if we can find the user
  // In a real implementation, you'd query by paddleSubscriptionId
  
  console.log(`Subscription canceled: ${subscriptionData.subscription_id}`);
  
  // TODO: Implement user lookup by subscription_id
  // This might require a GSI or separate lookup table
}

/**
 * Handle subscription.updated event
 */
async function handleSubscriptionUpdated(webhookData: PaddleWebhookPayload): Promise<void> {
  const subscriptionData = webhookData.data;
  
  console.log(`Subscription updated: ${subscriptionData.subscription_id}`);
  
  // TODO: Implement subscription update logic
  // This might include plan changes, renewal dates, etc.
}

/**
 * Determine plan type from Paddle price ID
 */
function determinePlanType(priceId: string | undefined): 'monthly' | 'yearly' | null {
  if (!priceId) {
    return null;
  }

  const monthlyPriceId = process.env.PADDLE_MONTHLY_PRICE_ID;
  const yearlyPriceId = process.env.PADDLE_YEARLY_PRICE_ID;

  if (priceId === monthlyPriceId) {
    return 'monthly';
  }
  
  if (priceId === yearlyPriceId) {
    return 'yearly';
  }

  return null;
}

