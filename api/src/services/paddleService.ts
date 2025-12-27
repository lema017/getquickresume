import crypto from 'crypto';

const PADDLE_API_KEY = process.env.PADDLE_API_KEY || '';
const PADDLE_WEBHOOK_SECRET = process.env.PADDLE_WEBHOOK_SECRET || '';
const PADDLE_ENVIRONMENT = process.env.PADDLE_ENVIRONMENT || 'sandbox';
const PADDLE_BASE_URL = PADDLE_ENVIRONMENT === 'production' 
  ? 'https://api.paddle.com'
  : 'https://sandbox-api.paddle.com';

export interface PaddleTransactionRequest {
  items: Array<{
    price_id: string;
    quantity: number;
  }>;
  customer_id?: string;
  customer_email?: string;
  custom_data?: Record<string, string>;
  return_url?: string;
}

export interface PaddleTransactionResponse {
  id: string;
  status: string;
  customer_id: string;
  checkout: {
    url: string;
  };
}

export interface PaddleWebhookEvent {
  event_id: string;
  event_type: string;
  occurred_at: string;
  data: any;
}

/**
 * Verify Paddle webhook signature
 * Critical security function - must verify before processing any webhook data
 */
export function verifyPaddleWebhookSignature(
  rawBody: string,
  signature: string
): boolean {
  if (!PADDLE_WEBHOOK_SECRET) {
    console.error('PADDLE_WEBHOOK_SECRET is not configured');
    return false;
  }

  if (!signature) {
    console.error('Webhook signature is missing');
    return false;
  }

  try {
    // Paddle uses ts-verify-signature format: ts=<timestamp>;h1=<signature>
    const signatureParts = signature.split(';');
    const tsPart = signatureParts.find(part => part.startsWith('ts='));
    const h1Part = signatureParts.find(part => part.startsWith('h1='));
    
    if (!tsPart || !h1Part) {
      console.error('Invalid signature format - missing ts or h1');
      return false;
    }

    const timestamp = tsPart.replace('ts=', '');
    const receivedSignature = h1Part.replace('h1=', '');
    
    // Build signed payload: timestamp:body
    const signedPayload = `${timestamp}:${rawBody}`;
    
    // Create HMAC SHA256 signature over the signed payload
    const computedSignature = crypto
      .createHmac('sha256', PADDLE_WEBHOOK_SECRET)
      .update(signedPayload)
      .digest('hex');

    // Use constant-time comparison to prevent timing attacks
    const isValid = crypto.timingSafeEqual(
      Buffer.from(computedSignature),
      Buffer.from(receivedSignature)
    );

    if (!isValid) {
      console.error('Webhook signature verification failed');
      console.error('Expected:', computedSignature);
      console.error('Received:', receivedSignature);
    }

    return isValid;
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}

/**
 * Create a transaction in Paddle
 */
export async function createPaddleTransaction(
  request: PaddleTransactionRequest
): Promise<PaddleTransactionResponse> {
  if (!PADDLE_API_KEY) {
    throw new Error('PADDLE_API_KEY is not configured');
  }

  const url = `${PADDLE_BASE_URL}/transactions`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PADDLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Paddle API error:', errorText);
    throw new Error(`Paddle API error: ${response.status} ${errorText}`);
  }

  const responseData = await response.json() as { data: PaddleTransactionResponse };
  return responseData.data;
}

/**
 * Get transaction details from Paddle
 */
export async function getPaddleTransaction(
  transactionId: string
): Promise<any> {
  if (!PADDLE_API_KEY) {
    throw new Error('PADDLE_API_KEY is not configured');
  }

  const url = `${PADDLE_BASE_URL}/transactions/${transactionId}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${PADDLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Paddle API error:', errorText);
    throw new Error(`Paddle API error: ${response.status} ${errorText}`);
  }

  return await response.json();
}

/**
 * Create or get a Paddle customer
 */
export async function createOrGetPaddleCustomer(
  email: string,
  name?: string
): Promise<string> {
  if (!PADDLE_API_KEY) {
    throw new Error('PADDLE_API_KEY is not configured');
  }

  // First, try to find existing customer
  const searchUrl = `${PADDLE_BASE_URL}/customers?filter=email:${encodeURIComponent(email)}`;
  
  const searchResponse = await fetch(searchUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${PADDLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (searchResponse.ok) {
    const searchData = await searchResponse.json() as { data?: Array<{ id: string }> };
    if (searchData.data && searchData.data.length > 0) {
      return searchData.data[0].id;
    }
  }

  // Create new customer if not found
  const createUrl = `${PADDLE_BASE_URL}/customers`;
  const createResponse = await fetch(createUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PADDLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      name: name || email,
    }),
  });

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    console.error('Paddle customer creation error:', errorText);
    throw new Error(`Failed to create Paddle customer: ${createResponse.status} ${errorText}`);
  }

  const createResponseData = await createResponse.json() as { data: { id: string } };
  return createResponseData.data.id;
}

