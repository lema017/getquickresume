/**
 * PayPal Payment Service
 * 
 * Handles PayPal Orders API integration for one-time payments.
 * Uses OAuth 2.0 for authentication with PayPal's REST API.
 * 
 * Environment Variables Required:
 * - PAYPAL_CLIENT_ID: PayPal API client ID
 * - PAYPAL_CLIENT_SECRET: PayPal API client secret
 * - PAYPAL_ENVIRONMENT: 'sandbox' or 'live'
 */

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || '';
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || '';
const PAYPAL_ENVIRONMENT = process.env.PAYPAL_ENVIRONMENT || 'sandbox';

// PayPal API base URLs
const PAYPAL_API_URL = PAYPAL_ENVIRONMENT === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

// Plan pricing configuration
export const PLAN_PRICES = {
  monthly: {
    amount: '10.00',
    currency: 'USD',
    description: 'GetQuickResume Premium - Monthly',
    itemName: '1 Month Premium Subscription',
    itemDescription: 'GetQuickResume Premium - Full access to AI resume builder, unlimited downloads, and all templates',
    durationMonths: 1,
  },
  yearly: {
    amount: '60.00',
    currency: 'USD',
    description: 'GetQuickResume Premium - Yearly',
    itemName: '1 Year Premium Subscription',
    itemDescription: 'GetQuickResume Premium - Full access to AI resume builder, unlimited downloads, and all templates (Save 50%!)',
    durationMonths: 12,
  },
} as const;

export type PlanType = keyof typeof PLAN_PRICES;

// PayPal API response types
export interface PayPalAccessTokenResponse {
  access_token: string;
  token_type: string;
  app_id: string;
  expires_in: number;
  nonce: string;
}

export interface PayPalOrderResponse {
  id: string;
  status: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

export interface PayPalCaptureResponse {
  id: string;
  status: string;
  purchase_units: Array<{
    reference_id: string;
    payments: {
      captures: Array<{
        id: string;
        status: string;
        amount: {
          currency_code: string;
          value: string;
        };
        custom_id?: string;
      }>;
    };
  }>;
  payer: {
    email_address: string;
    payer_id: string;
    name?: {
      given_name: string;
      surname: string;
    };
  };
}

// Cache for access token
let cachedAccessToken: string | null = null;
let tokenExpiresAt: number = 0;

/**
 * Get OAuth 2.0 access token from PayPal
 * Caches token until expiration
 */
export async function getAccessToken(): Promise<string> {
  // Return cached token if still valid (with 60s buffer)
  if (cachedAccessToken && Date.now() < tokenExpiresAt - 60000) {
    return cachedAccessToken;
  }

  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error('PayPal credentials not configured');
  }

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');

  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PayPal OAuth error:', errorText);
    throw new Error(`Failed to get PayPal access token: ${response.status}`);
  }

  const data = await response.json() as PayPalAccessTokenResponse;
  
  // Cache the token
  cachedAccessToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in * 1000);

  return data.access_token;
}

/**
 * Create a PayPal order for the specified plan
 * 
 * @param planType - 'monthly' or 'yearly'
 * @param userId - User ID to associate with the order
 * @returns PayPal order details including order ID
 */
export async function createOrder(
  planType: PlanType,
  userId: string
): Promise<PayPalOrderResponse> {
  const accessToken = await getAccessToken();
  const plan = PLAN_PRICES[planType];

  if (!plan) {
    throw new Error(`Invalid plan type: ${planType}`);
  }

  const orderPayload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: `${userId}_${planType}_${Date.now()}`,
        description: plan.description,
        custom_id: JSON.stringify({ userId, planType }),
        amount: {
          currency_code: plan.currency,
          value: plan.amount,
          breakdown: {
            item_total: {
              currency_code: plan.currency,
              value: plan.amount,
            },
          },
        },
        items: [
          {
            name: plan.itemName,
            description: plan.itemDescription,
            quantity: '1',
            unit_amount: {
              currency_code: plan.currency,
              value: plan.amount,
            },
            category: 'DIGITAL_GOODS',
          },
        ],
      },
    ],
    application_context: {
      brand_name: 'GetQuickResume',
      landing_page: 'NO_PREFERENCE',
      shipping_preference: 'NO_SHIPPING',
      user_action: 'PAY_NOW',
      return_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/thank-you`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/premium`,
    },
  };

  const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'PayPal-Request-Id': `order_${userId}_${Date.now()}`,
    },
    body: JSON.stringify(orderPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PayPal create order error:', errorText);
    throw new Error(`Failed to create PayPal order: ${response.status}`);
  }

  const orderData = await response.json() as PayPalOrderResponse;
  
  console.log(`PayPal order created: ${orderData.id} for user ${userId} (${planType})`);
  
  return orderData;
}

/**
 * Capture a PayPal order after buyer approval
 * 
 * @param orderId - PayPal order ID to capture
 * @returns Capture details including payment info
 */
export async function captureOrder(orderId: string): Promise<PayPalCaptureResponse> {
  const accessToken = await getAccessToken();

  const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'PayPal-Request-Id': `capture_${orderId}_${Date.now()}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PayPal capture order error:', errorText);
    throw new Error(`Failed to capture PayPal order: ${response.status}`);
  }

  const captureData = await response.json() as PayPalCaptureResponse;
  
  console.log(`PayPal order captured: ${orderId}, status: ${captureData.status}`);
  
  return captureData;
}

/**
 * Get order details from PayPal
 * 
 * @param orderId - PayPal order ID
 * @returns Order details
 */
export async function getOrderDetails(orderId: string): Promise<PayPalOrderResponse> {
  const accessToken = await getAccessToken();

  const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PayPal get order error:', errorText);
    throw new Error(`Failed to get PayPal order: ${response.status}`);
  }

  return await response.json() as PayPalOrderResponse;
}

/**
 * Extract custom data from a captured order
 * 
 * @param captureResponse - PayPal capture response
 * @returns Parsed custom data with userId and planType
 */
export function extractCustomData(
  captureResponse: PayPalCaptureResponse
): { userId: string; planType: PlanType } | null {
  try {
    const customId = captureResponse.purchase_units?.[0]?.payments?.captures?.[0]?.custom_id;
    if (customId) {
      return JSON.parse(customId);
    }
  } catch (error) {
    console.error('Error extracting custom data from PayPal response:', error);
  }
  return null;
}
