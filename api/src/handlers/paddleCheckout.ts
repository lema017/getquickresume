import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AuthorizedEvent } from '../types';
import { getUserById } from '../services/dynamodb';
import { 
  createOrGetPaddleCustomer, 
  createPaddleTransaction 
} from '../services/paddleService';
import { CreateCheckoutRequest, CreateCheckoutResponse } from '../types';

const PADDLE_MONTHLY_PRICE_ID = process.env.PADDLE_MONTHLY_PRICE_ID || '';
const PADDLE_YEARLY_PRICE_ID = process.env.PADDLE_YEARLY_PRICE_ID || '';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

/**
 * Create Paddle checkout transaction
 * POST /api/checkout/create-transaction
 */
export const createCheckoutTransaction = async (
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Create checkout transaction request received');

  try {
    // Verify authorization
    if (!event.requestContext?.authorizer) {
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Unauthorized: Missing authorization context'
        })
      };
    }

    const userId = event.requestContext.authorizer.userId;

    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Request body is required'
        })
      };
    }

    const requestBody: CreateCheckoutRequest = JSON.parse(event.body);
    const { planType } = requestBody;

    // Validate plan type
    if (!planType || (planType !== 'monthly' && planType !== 'yearly')) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Invalid plan type. Must be "monthly" or "yearly"'
        })
      };
    }

    // Get user
    const user = await getUserById(userId);
    if (!user) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'User not found'
        })
      };
    }

    // Check if user is already premium
    if (user.isPremium) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'User is already a premium subscriber'
        })
      };
    }

    // Get or create Paddle customer
    const customerName = user.fullName || `${user.firstName} ${user.lastName}`.trim() || user.email;
    const paddleCustomerId = await createOrGetPaddleCustomer(user.email, customerName);

    // Select price ID based on plan type
    const priceId = planType === 'monthly' ? PADDLE_MONTHLY_PRICE_ID : PADDLE_YEARLY_PRICE_ID;

    if (!priceId) {
      console.error(`Price ID not configured for ${planType} plan`);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Price configuration error'
        })
      };
    }

    // Create transaction in Paddle
    const transaction = await createPaddleTransaction({
      items: [
        {
          price_id: priceId,
          quantity: 1
        }
      ],
      customer_id: paddleCustomerId,
      customer_email: user.email,
      custom_data: {
        userId: userId,
        planType: planType
      },
      return_url: `${FRONTEND_URL}/thank-you?transaction_id={transaction_id}`
    });

    console.log(`Paddle transaction created: ${transaction.id} for user ${userId}`);

    const response: CreateCheckoutResponse = {
      success: true,
      checkoutUrl: transaction.checkout?.url,
      transactionId: transaction.id,
      message: 'Transaction created successfully'
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'POST,OPTIONS'
      },
      body: JSON.stringify(response)
    };
  } catch (error: any) {
    console.error('Error creating checkout transaction:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'POST,OPTIONS'
      },
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error.message || 'Failed to create checkout transaction'
      })
    };
  }
};

/**
 * OPTIONS handler for CORS preflight
 */
export const createCheckoutTransactionOptions = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'POST,OPTIONS'
    },
    body: ''
  };
};

