import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { aiService } from '../services/aiService';
import { checkRateLimit, logSuspiciousActivity, refundRateLimit } from '../middleware/rateLimiter';
import { sanitizeUserInput, sanitizeSectionType, sanitizeLanguage } from '../utils/inputSanitizer';
import { getUserById } from '../services/dynamodb';
import { verifyResumeOwnership } from '../services/resumeService';

export interface GenerateQuestionsRequest {
  sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
  recommendation: string;
  originalText: string;
  language: 'es' | 'en';
  resumeId?: string; // Optional resume ID for AI usage tracking
}

export interface Question {
  id: string;
  question: string;
  category: string;
  required: boolean;
}

export interface GenerateQuestionsResponse {
  success: boolean;
  data?: {
    questions: Question[];
  };
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

export const generateEnhancementQuestions = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // 1. Validate authentication
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
        } as GenerateQuestionsResponse)
      };
    }

    const userId = event.requestContext.authorizer.userId;
    const endpoint = 'generate-enhancement-questions';

    // 2. Verify premium status (this is a premium-only feature)
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
          message: 'User not found'
        } as GenerateQuestionsResponse)
      };
    }

    if (!user.isPremium) {
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
          error: 'Premium required',
          message: 'This feature is available only for premium users. Please upgrade to access guided enhancement.'
        } as GenerateQuestionsResponse)
      };
    }

    // 3. Rate limiting
    const rateLimitResult = await checkRateLimit(userId, endpoint, 10, 60000);
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
        } as GenerateQuestionsResponse)
      };
    }

    // 4. Validate request body
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
          message: 'Please provide sectionType, recommendation, originalText, and language'
        } as GenerateQuestionsResponse)
      };
    }

    let requestData: GenerateQuestionsRequest;
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
        } as GenerateQuestionsResponse)
      };
    }

    // 5. Sanitize and validate inputs
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
        } as GenerateQuestionsResponse)
      };
    }

    const sanitizedLanguage = sanitizeLanguage(requestData.language);
    const sanitizedRecommendation = sanitizeUserInput(requestData.recommendation);
    const sanitizedOriginalText = sanitizeUserInput(requestData.originalText);

    // 6. Validate required fields
    if (!sanitizedRecommendation || sanitizedRecommendation.trim().length === 0) {
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
          error: 'Recommendation is required',
          message: 'Please provide a recommendation'
        } as GenerateQuestionsResponse)
      };
    }

    if (!sanitizedOriginalText || sanitizedOriginalText.trim().length === 0) {
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
          message: 'Please provide the original text'
        } as GenerateQuestionsResponse)
      };
    }

    // 6.5 Validate resume ownership if resumeId is provided (for AI cost tracking)
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
          } as GenerateQuestionsResponse)
        };
      }
    }

    // 7. Generate questions using AI service
    try {
      const questions = await aiService.generateEnhancementQuestions(
        sanitizedSectionType as 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language',
        sanitizedRecommendation,
        sanitizedOriginalText,
        sanitizedLanguage,
        { authorizer: { userId } },
        requestData.resumeId
      );

      const response: GenerateQuestionsResponse = {
        success: true,
        data: {
          questions
        },
        message: 'Questions generated successfully',
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
      
      // Refund rate limit on server error - user shouldn't be penalized
      await refundRateLimit(userId, endpoint);
      
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({
          success: false,
          error: 'Failed to generate questions',
          message: aiError.message || 'Failed to generate questions with AI'
        } as GenerateQuestionsResponse)
      };
    }

  } catch (error) {
    console.error('Error in generateEnhancementQuestions handler:', error);
    
    // Refund rate limit on server error - user shouldn't be penalized
    const userId = event.requestContext.authorizer?.userId;
    if (userId) {
      await refundRateLimit(userId, 'generate-enhancement-questions');
    }
    
    const errorResponse: GenerateQuestionsResponse = {
      success: false,
      error: 'Internal server error',
      message: 'Failed to generate enhancement questions'
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

export const generateEnhancementQuestionsOptions = async (): Promise<APIGatewayProxyResult> => {
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

