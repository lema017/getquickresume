import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { aiService } from '../services/aiService';
import { SummarySuggestionRequest, SummarySuggestionResponse } from '../types';
import { checkRateLimit, refundRateLimit } from '../middleware/rateLimiter';
import { getUserById } from '../services/dynamodb';
import { verifyResumeOwnership } from '../services/resumeService';

export const generateSuggestions = async (
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
        } as SummarySuggestionResponse)
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
        } as SummarySuggestionResponse)
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
        } as SummarySuggestionResponse)
      };
    }

    // Rate limiting: 1 request/minute for free users, 10 requests/minute for premium users
    const maxRequests = user.isPremium ? 10 : 1;
    const rateLimitResult = await checkRateLimit(userId, 'summary-suggestions', maxRequests, 60000);
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
          message: 'Too many summary suggestion requests. Please wait before trying again.',
          resetTime: rateLimitResult.resetTime,
          code: 'RATE_LIMIT_EXCEEDED'
        } as SummarySuggestionResponse)
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
          message: 'Please provide profession, achievements, projects, and type data'
        } as SummarySuggestionResponse)
      };
    }

    let requestData: SummarySuggestionRequest;
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
        } as SummarySuggestionResponse)
      };
    }

    // Validate required fields
    if (!requestData.profession) {
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
          error: 'Profession is required',
          message: 'Please provide a profession'
        } as SummarySuggestionResponse)
      };
    }

    if (!requestData.achievements || !Array.isArray(requestData.achievements)) {
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
          error: 'Achievements array is required',
          message: 'Please provide an array of achievements'
        } as SummarySuggestionResponse)
      };
    }

    if (!requestData.projectDescriptions || !Array.isArray(requestData.projectDescriptions)) {
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
          error: 'Project descriptions array is required',
          message: 'Please provide an array of project descriptions'
        } as SummarySuggestionResponse)
      };
    }

    if (!requestData.type || !['experience', 'differentiators'].includes(requestData.type)) {
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
          error: 'Invalid type parameter',
          message: 'Type must be "experience" or "differentiators"'
        } as SummarySuggestionResponse)
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
        } as SummarySuggestionResponse)
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
          } as SummarySuggestionResponse)
        };
      }
    }

    // Extract requestContext to pass to AI service (contains userId from JWT token)
    // Cast to match the expected type structure
    const requestContext = {
      authorizer: event.requestContext.authorizer as { userId: string }
    };

    // Generate summary suggestions using AI
    const suggestions = await aiService.generateSummarySuggestions(
      requestData.profession,
      requestData.achievements,
      requestData.projectDescriptions,
      language,
      requestData.type,
      requestContext,
      requestData.resumeId
    );

    const response: SummarySuggestionResponse = {
      success: true,
      data: suggestions,
      message: `Generated ${suggestions.length} ${requestData.type} suggestions for ${requestData.profession}`,
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
    console.error('Error in generateSuggestions handler:', error);
    
    // Refund rate limit on server error - user shouldn't be penalized
    const userId = event.requestContext.authorizer?.userId;
    if (userId) {
      await refundRateLimit(userId, 'summary-suggestions');
    }
    
    const errorResponse: SummarySuggestionResponse = {
      success: false,
      error: 'Internal server error',
      message: 'Failed to generate summary suggestions'
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
export const generateSuggestionsOptions = async (): Promise<APIGatewayProxyResult> => {
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
