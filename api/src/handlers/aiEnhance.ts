import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { aiService } from '../services/aiService';
import { EnhanceTextRequest, EnhanceTextResponse } from '../types';
import { checkRateLimit, refundRateLimit } from '../middleware/rateLimiter';
import { getUserById } from '../services/dynamodb';
import { verifyResumeOwnership } from '../services/resumeService';

export const enhanceTextWithAI = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // Verificar autenticación
    if (!event.requestContext?.authorizer) {
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({
          success: false,
          error: 'Unauthorized',
          message: 'Authentication required'
        } as EnhanceTextResponse)
      };
    }

    const userId = event.requestContext.authorizer.userId;

    // Check user premium status and free resume usage
    const user = await getUserById(userId);
    if (!user) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({
          success: false,
          error: 'User not found',
          message: 'User account not found'
        } as EnhanceTextResponse)
      };
    }

    // Premium check: AI suggestions are only available for premium users or free users who haven't used their quota
    if (!user.isPremium && user.freeResumeUsed) {
      return {
        statusCode: 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({
          success: false,
          error: 'Premium feature required',
          message: 'AI suggestions are only available for premium users or free users who haven\'t used their free resume quota.',
          code: 'PREMIUM_REQUIRED'
        } as EnhanceTextResponse)
      };
    }

    // Rate limiting: 3 requests/minute for free users, 10 requests/minute for premium users
    const maxRequests = user.isPremium ? 10 : 3;
    const rateLimitResult = await checkRateLimit(userId, 'ai-enhance', maxRequests, 60000);
    if (!rateLimitResult.allowed) {
      return {
        statusCode: 429,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({
          success: false,
          error: 'Rate limit exceeded',
          message: user.isPremium 
            ? 'You have reached the limit of 10 AI enhancement requests per minute. Please wait a moment before trying again.'
            : 'You have reached the limit of 3 AI enhancement requests per minute. Please wait a moment before trying again, or upgrade to Premium for 10 requests per minute.',
          resetTime: rateLimitResult.resetTime,
          code: 'RATE_LIMIT_EXCEEDED'
        } as EnhanceTextResponse)
      };
    }

    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({
          success: false,
          error: 'Request body is required',
          message: 'Please provide context, text, and language'
        } as EnhanceTextResponse)
      };
    }

    let requestData: EnhanceTextRequest;
    try {
      requestData = JSON.parse(event.body);
    } catch (error) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({
          success: false,
          error: 'Invalid JSON in request body',
          message: 'Please provide valid JSON data'
        } as EnhanceTextResponse)
      };
    }

    // Validate required fields
    if (!requestData.context) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({
          success: false,
          error: 'Context is required',
          message: 'Please provide a context (achievement, summary, project, responsibility, or differentiators)'
        } as EnhanceTextResponse)
      };
    }

    if (!requestData.text || requestData.text.trim() === '') {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({
          success: false,
          error: 'Text is required',
          message: 'Please provide text to enhance'
        } as EnhanceTextResponse)
      };
    }

    // Validate context parameter
    const validContexts = ['achievement', 'summary', 'project', 'responsibility', 'differentiators'];
    if (!validContexts.includes(requestData.context)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({
          success: false,
          error: 'Invalid context parameter',
          message: `Context must be one of: ${validContexts.join(', ')}`
        } as EnhanceTextResponse)
      };
    }

    // Validate language parameter
    const language = requestData.language || 'es';
    if (!['es', 'en'].includes(language)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({
          success: false,
          error: 'Invalid language parameter',
          message: 'Language must be "es" or "en"'
        } as EnhanceTextResponse)
      };
    }

    // Validate resume ownership if resumeId is provided (for AI cost tracking)
    if (requestData.resumeId) {
      const isOwner = await verifyResumeOwnership(userId, requestData.resumeId);
      if (!isOwner) {
        return {
          statusCode: 403,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            'Access-Control-Allow-Methods': 'POST,OPTIONS',
          },
          body: JSON.stringify({
            success: false,
            error: 'Access denied',
            message: 'Resume not found or access denied'
          } as EnhanceTextResponse)
        };
      }
    }

    // Extract requestContext to pass to AI service (contains userId from JWT token)
    const requestContext = {
      authorizer: event.requestContext.authorizer as { userId: string }
    };

    // Enhance text using AI
    const enhancedText = await aiService.enhanceText(
      requestData.context,
      requestData.text.trim(),
      language,
      requestContext,
      requestData.jobTitle,
      requestData.resumeId
    );

    const response: EnhanceTextResponse = {
      success: true,
      data: enhancedText,
      message: `Text enhanced successfully for context: ${requestData.context}`,
      remainingRequests: rateLimitResult.remaining,
      resetTime: rateLimitResult.resetTime
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
      },
      body: JSON.stringify(response)
    };

  } catch (error) {
    console.error('Error in enhanceTextWithAI handler:', error);
    
    // Refund rate limit on server error - user shouldn't be penalized
    const userId = event.requestContext.authorizer?.userId;
    if (userId) {
      await refundRateLimit(userId, 'ai-enhance');
    }
    
    const errorResponse: EnhanceTextResponse = {
      success: false,
      error: 'Internal server error',
      message: 'Failed to enhance text with AI'
    };

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
      },
      body: JSON.stringify(errorResponse)
    };
  }
};

// Handler para OPTIONS (CORS preflight)
export const enhanceTextWithAIOptions = async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
    },
    body: ''
  };
};
