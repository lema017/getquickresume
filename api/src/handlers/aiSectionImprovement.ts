import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { aiService } from '../services/aiService';
import { ImproveSectionRequest, ImproveSectionResponse } from '../types';
import { checkRateLimit, logSuspiciousActivity, refundRateLimit } from '../middleware/rateLimiter';
import { sanitizeUserInput, validateInput, sanitizeSectionType, sanitizeLanguage } from '../utils/inputSanitizer';
import { getUserById } from '../services/dynamodb';
import { verifyResumeOwnership } from '../services/resumeService';

export const improveSectionWithAI = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // 1. Validar autenticación
    if (!event.requestContext.authorizer) {
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
        } as ImproveSectionResponse)
      };
    }

    const userId = event.requestContext.authorizer.userId;
    const endpoint = 'improve-section';

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
        } as ImproveSectionResponse)
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
        } as ImproveSectionResponse)
      };
    }

    // 2. Rate limiting: 1 request/minute for free users, 10 requests/minute for premium users
    const maxRequests = user.isPremium ? 10 : 1;
    const rateLimitResult = await checkRateLimit(userId, endpoint, maxRequests, 60000);
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
          message: 'Too many requests. Please wait before trying again.',
          resetTime: rateLimitResult.resetTime
        } as ImproveSectionResponse)
      };
    }

    // 3. Validar request body
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
          message: 'Please provide sectionType, originalText, userInstructions, and language'
        } as ImproveSectionResponse)
      };
    }

    let requestData: ImproveSectionRequest;
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
        } as ImproveSectionResponse)
      };
    }

    // 4. Sanitizar y validar inputs
    const sanitizedSectionType = sanitizeSectionType(requestData.sectionType);
    if (!sanitizedSectionType) {
      await logSuspiciousActivity(userId, endpoint, 'Invalid section type', requestData.sectionType);
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
          error: 'Invalid section type',
          message: 'Section type must be one of: summary, experience, education, certification, project, achievement, language'
        } as ImproveSectionResponse)
      };
    }

    const sanitizedLanguage = sanitizeLanguage(requestData.language);
    const sanitizedInstructions = sanitizeUserInput(requestData.userInstructions);

    // 5. Validar instrucciones del usuario
    const inputValidation = validateInput(sanitizedInstructions);
    if (!inputValidation.isValid) {
      await logSuspiciousActivity(userId, endpoint, `Invalid input: ${inputValidation.reason}`, sanitizedInstructions);
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
          error: 'Invalid input',
          message: inputValidation.reason || 'Input validation failed'
        } as ImproveSectionResponse)
      };
    }

    // 6. Validar texto original
    if (!requestData.originalText || requestData.originalText.trim().length === 0) {
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
          error: 'Original text is required',
          message: 'Please provide the original text to improve'
        } as ImproveSectionResponse)
      };
    }

    // 7. Sanitize gathered context if provided
    let sanitizedGatheredContext: Array<{ questionId: string; answer: string }> | undefined;
    if (requestData.gatheredContext && Array.isArray(requestData.gatheredContext)) {
      sanitizedGatheredContext = requestData.gatheredContext.map(ctx => ({
        questionId: sanitizeUserInput(ctx.questionId || ''),
        answer: sanitizeUserInput(ctx.answer || '')
      })).filter(ctx => ctx.questionId && ctx.answer);
    }

    // 7.5 Validate resume ownership if resumeId is provided (for AI cost tracking)
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
          } as ImproveSectionResponse)
        };
      }
    }

    // 8. Llamar AI service con inputs sanitizados
    try {
      const improvedText = await aiService.improveSectionWithUserInstructions(
        sanitizedSectionType as 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language',
        requestData.originalText,
        sanitizedInstructions,
        sanitizedLanguage,
        sanitizedGatheredContext,
        {
          userId,
          resumeId: requestData.resumeId,
          isPremium: user.isPremium
        }
      );

      const response: ImproveSectionResponse = {
        success: true,
        data: improvedText,
        message: 'Section improved successfully',
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

    } catch (aiError: any) {
      console.error('AI service error:', aiError);
      
      // Si es un error de validación del AI, devolver el texto original
      if (aiError.message.includes('validation failed') || aiError.message.includes('Invalid input')) {
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            'Access-Control-Allow-Methods': 'POST,OPTIONS',
          },
          body: JSON.stringify({
            success: true,
            data: requestData.originalText,
            message: 'Unable to improve text, returning original',
            remainingRequests: rateLimitResult.remaining,
            resetTime: rateLimitResult.resetTime
          } as ImproveSectionResponse)
        };
      }

      throw aiError;
    }

  } catch (error) {
    console.error('Error in improveSectionWithAI handler:', error);
    
    // Refund rate limit on server error - user shouldn't be penalized
    const userId = event.requestContext.authorizer?.userId;
    if (userId) {
      await refundRateLimit(userId, 'improve-section');
    }
    
    const errorResponse: ImproveSectionResponse = {
      success: false,
      error: 'Internal server error',
      message: 'Failed to improve section with AI'
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

export const improveSectionWithAIOptions = async (): Promise<APIGatewayProxyResult> => {
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
