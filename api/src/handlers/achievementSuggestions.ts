import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { aiService } from '../services/aiService';
import { AchievementSuggestionRequest, AchievementSuggestionResponse } from '../types';
import { checkRateLimit } from '../middleware/rateLimiter';

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
        } as AchievementSuggestionResponse)
      };
    }

    const userId = event.requestContext.authorizer.userId;

    // Rate limiting: 5 requests por minuto
    const rateLimitResult = await checkRateLimit(userId, 'achievement-suggestions', 5, 60000);
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
          message: 'Too many achievement suggestion requests. Please wait before trying again.',
          resetTime: rateLimitResult.resetTime
        } as AchievementSuggestionResponse)
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
          message: 'Please provide profession and projects data'
        } as AchievementSuggestionResponse)
      };
    }

    let requestData: AchievementSuggestionRequest;
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
        } as AchievementSuggestionResponse)
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
        } as AchievementSuggestionResponse)
      };
    }

    if (!requestData.projects || !Array.isArray(requestData.projects) || requestData.projects.length === 0) {
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
          error: 'Projects are required',
          message: 'Please provide at least one project'
        } as AchievementSuggestionResponse)
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
        } as AchievementSuggestionResponse)
      };
    }

    // Validate project structure
    for (const project of requestData.projects) {
      // Name is required and must not be empty
      if (!project.name || typeof project.name !== 'string' || project.name.trim() === '') {
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
            error: 'Invalid project structure',
            message: 'Each project must have a non-empty name'
          } as AchievementSuggestionResponse)
        };
      }
      
      // Description must be a string (can be empty)
      if (project.description === undefined || project.description === null || typeof project.description !== 'string') {
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
            error: 'Invalid project structure',
            message: 'Each project must have a description field (can be empty string)'
          } as AchievementSuggestionResponse)
        };
      }
      
      // Technologies must be an array (can be empty)
      if (!Array.isArray(project.technologies)) {
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
            error: 'Invalid project structure',
            message: 'Each project must have a technologies array (can be empty)'
          } as AchievementSuggestionResponse)
        };
      }
    }

    // Extract requestContext to pass to AI service (contains userId from JWT token)
    // Cast to match the expected type structure
    const requestContext = {
      authorizer: event.requestContext.authorizer as { userId: string }
    };

    // Generate achievement suggestions using AI
    const suggestions = await aiService.generateAchievementSuggestions(
      requestData.profession,
      requestData.projects,
      language,
      requestContext
    );

    const response: AchievementSuggestionResponse = {
      success: true,
      data: suggestions,
      message: `Generated ${suggestions.length} achievement suggestions for ${requestData.profession}`,
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
    
    const errorResponse: AchievementSuggestionResponse = {
      success: false,
      error: 'Internal server error',
      message: 'Failed to generate achievement suggestions'
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
