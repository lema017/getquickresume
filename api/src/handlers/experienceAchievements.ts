import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { jobTitleAchievementsService } from '../services/jobTitleAchievementsService';
import { JobTitleAchievementsRequest, JobTitleAchievementsResponse } from '../types';
import { checkRateLimit } from '../middleware/rateLimiter';

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

    // Rate limiting: 5 requests por minuto
    const rateLimitResult = await checkRateLimit(userId, 'experience-achievements', 5, 60000);
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

    // Extract requestContext to pass to service (contains userId from JWT token)
    // Cast to match the expected type structure
    const requestContext = {
      authorizer: event.requestContext.authorizer as { userId: string }
    };

    // Get achievement suggestions
    const result = await jobTitleAchievementsService.getAchievementsByJobTitle(
      requestData.jobTitle.trim(),
      language,
      requestContext
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
