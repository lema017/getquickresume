import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { suggestionService } from '../services/suggestionService';
import { SuggestionsResponse } from '../types';
import { checkRateLimit, refundRateLimit } from '../middleware/rateLimiter';
import { getUserById } from '../services/dynamodb';
import { verifyResumeOwnership } from '../services/resumeService';

export const getSuggestions = async (
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
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
        },
        body: JSON.stringify({
          success: false,
          error: 'Unauthorized',
          message: 'Authentication required'
        } as SuggestionsResponse)
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
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
        },
        body: JSON.stringify({
          success: false,
          error: 'User not found',
          message: 'User account not found'
        } as SuggestionsResponse)
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
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
        },
        body: JSON.stringify({
          success: false,
          error: 'Premium feature required',
          message: 'AI suggestions are only available for premium users or free users who haven\'t used their free resume quota.',
          code: 'PREMIUM_REQUIRED',
          fromCache: false
        } as SuggestionsResponse)
      };
    }

    // Rate limiting: 1 request/minute for free users, 10 requests/minute for premium users
    const maxRequests = user.isPremium ? 10 : 1;
    const rateLimitResult = await checkRateLimit(userId, 'profession-suggestions', maxRequests, 60000);
    if (!rateLimitResult.allowed) {
      return {
        statusCode: 429,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
        },
        body: JSON.stringify({
          success: false,
          error: 'Rate limit exceeded',
          message: 'Too many suggestion requests. Please wait before trying again.',
          resetTime: rateLimitResult.resetTime,
          code: 'RATE_LIMIT_EXCEEDED',
          fromCache: false
        } as SuggestionsResponse)
      };
    }

    // Obtener la profesión de los parámetros de la ruta
    const profession = event.pathParameters?.profession;
    const language = event.queryStringParameters?.language || 'es'; // 'es' or 'en', default 'es'
    
    if (!profession) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
        },
        body: JSON.stringify({
          success: false,
          error: 'Profession parameter is required',
          message: 'Please provide a profession in the URL path'
        } as SuggestionsResponse)
      };
    }

    // Validate language parameter
    if (!['es', 'en'].includes(language)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
        },
        body: JSON.stringify({
          success: false,
          error: 'Invalid language parameter',
          message: 'Language parameter must be "es" or "en"'
        } as SuggestionsResponse)
      };
    }

    // Get optional resumeId for AI cost tracking
    const resumeId = event.queryStringParameters?.resumeId;

    // Validate resume ownership if resumeId is provided
    if (resumeId) {
      const isOwner = await verifyResumeOwnership(userId, resumeId);
      if (!isOwner) {
        return {
          statusCode: 403,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            'Access-Control-Allow-Methods': 'GET,OPTIONS',
          },
          body: JSON.stringify({
            success: false,
            error: 'Access denied',
            message: 'Resume not found or access denied',
            fromCache: false
          } as SuggestionsResponse)
        };
      }
    }

    // Decodificar la profesión (puede venir URL encoded)
    const decodedProfession = decodeURIComponent(profession);

    // Extract requestContext to pass to service (contains userId from JWT token)
    // Cast to match the expected type structure
    const requestContext = {
      authorizer: event.requestContext.authorizer as { userId: string }
    };

    // Obtener sugerencias para el idioma especificado (solo skills unificado)
    const suggestions = await suggestionService.getSuggestions(decodedProfession, language, requestContext, resumeId);

    const response: SuggestionsResponse = {
      success: true,
      data: {
        skills: suggestions.skills
      },
      fromCache: suggestions.fromCache,
      message: suggestions.fromCache 
        ? 'Suggestions retrieved from cache' 
        : 'Suggestions generated with AI and saved to cache',
      remainingRequests: rateLimitResult.remaining,
      resetTime: rateLimitResult.resetTime
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
      },
      body: JSON.stringify(response)
    };

  } catch (error: any) {
    console.error('Error in getSuggestions handler:', error);
    
    // Handle invalid profession error
    if (error?.code === 'INVALID_PROFESSION') {
      const errorResponse: SuggestionsResponse = {
        success: false,
        error: 'INVALID_PROFESSION',
        message: error.message || 'The provided text does not appear to be a valid profession or job title.',
        fromCache: false
      };

      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
        },
        body: JSON.stringify(errorResponse)
      };
    }
    
    // Refund rate limit on server error - user shouldn't be penalized
    const userId = event.requestContext.authorizer?.userId;
    if (userId) {
      await refundRateLimit(userId, 'profession-suggestions');
    }
    
    const errorResponse: SuggestionsResponse = {
      success: false,
      error: 'Internal server error',
      message: 'Failed to get profession suggestions',
      fromCache: false
    };

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
      },
      body: JSON.stringify(errorResponse)
    };
  }
};

// Handler para OPTIONS (CORS preflight)
export const getSuggestionsOptions = async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
    },
    body: ''
  };
};
