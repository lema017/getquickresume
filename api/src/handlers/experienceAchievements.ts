import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { jobTitleAchievementsService } from '../services/jobTitleAchievementsService';
import { JobTitleAchievementsRequest, JobTitleAchievementsResponse } from '../types';
import { checkRateLimit, refundRateLimit } from '../middleware/rateLimiter';
import { getUserById } from '../services/dynamodb';
import { verifyResumeOwnership } from '../services/resumeService';

export const getJobTitleAchievements = async (
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
        } as JobTitleAchievementsResponse)
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
        } as JobTitleAchievementsResponse)
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
          code: 'PREMIUM_REQUIRED',
          fromCache: false
        } as JobTitleAchievementsResponse)
      };
    }

    // Rate limiting: 1 request/minute for free users, 10 requests/minute for premium users
    const maxRequests = user.isPremium ? 10 : 1;
    const rateLimitResult = await checkRateLimit(userId, 'experience-achievements', maxRequests, 60000);
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
          message: 'Too many experience achievement requests. Please wait before trying again.',
          resetTime: rateLimitResult.resetTime
        } as JobTitleAchievementsResponse)
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
          message: 'Please provide job title and language'
        } as JobTitleAchievementsResponse)
      };
    }

    let requestData: JobTitleAchievementsRequest;
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
        } as JobTitleAchievementsResponse)
      };
    }

    // Validate required fields
    if (!requestData.jobTitle || requestData.jobTitle.trim() === '') {
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
          error: 'Job title is required',
          message: 'Please provide a job title'
        } as JobTitleAchievementsResponse)
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
        } as JobTitleAchievementsResponse)
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
            message: 'Resume not found or access denied',
            fromCache: false
          } as JobTitleAchievementsResponse)
        };
      }
    }

    // Extract requestContext to pass to service (contains userId from JWT token)
    // Cast to match the expected type structure
    const requestContext = {
      authorizer: event.requestContext.authorizer as { userId: string }
    };

    // Get achievement suggestions
    const result = await jobTitleAchievementsService.getAchievementsByJobTitle(
      requestData.jobTitle.trim(),
      language,
      requestContext,
      requestData.resumeId
    );

    const response: JobTitleAchievementsResponse = {
      success: true,
      data: result.suggestions,
      fromCache: result.fromCache,
      message: `Generated ${result.suggestions.length} achievement suggestions for ${requestData.jobTitle}`,
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
    console.error('Error in getJobTitleAchievements handler:', error);
    
    // Refund rate limit on server error - user shouldn't be penalized
    const userId = event.requestContext.authorizer?.userId;
    if (userId) {
      await refundRateLimit(userId, 'experience-achievements');
    }
    
    const errorResponse: JobTitleAchievementsResponse = {
      success: false,
      fromCache: false,
      error: 'Internal server error',
      message: 'Failed to get achievement suggestions'
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
export const getJobTitleAchievementsOptions = async (): Promise<APIGatewayProxyResult> => {
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
