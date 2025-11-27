import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { suggestionService } from '../services/suggestionService';
import { SuggestionsResponse } from '../types';
import { checkRateLimit } from '../middleware/rateLimiter';

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

    // Rate limiting: 5 requests por minuto
    const rateLimitResult = await checkRateLimit(userId, 'profession-suggestions', 5, 60000);
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
          resetTime: rateLimitResult.resetTime
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

    // Decodificar la profesión (puede venir URL encoded)
    const decodedProfession = decodeURIComponent(profession);

    // Extract requestContext to pass to service (contains userId from JWT token)
    // Cast to match the expected type structure
    const requestContext = {
      authorizer: event.requestContext.authorizer as { userId: string }
    };

    // Obtener sugerencias para el idioma especificado (solo skills unificado)
    const suggestions = await suggestionService.getSuggestions(decodedProfession, language, requestContext);

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

  } catch (error) {
    console.error('Error in getSuggestions handler:', error);
    
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
