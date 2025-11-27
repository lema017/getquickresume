import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { aiService } from '../services/aiService';
import { EnhanceTextRequest, EnhanceTextResponse } from '../types';
import { checkRateLimit } from '../middleware/rateLimiter';

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

    // Rate limiting: 5 requests por minuto
    const rateLimitResult = await checkRateLimit(userId, 'ai-enhance', 5, 60000);
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
          message: 'Too many AI enhancement requests. Please wait before trying again.',
          resetTime: rateLimitResult.resetTime
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
          message: 'Please provide a context (achievement, summary, project, or responsibility)'
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
    const validContexts = ['achievement', 'summary', 'project', 'responsibility'];
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
      requestData.jobTitle
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
