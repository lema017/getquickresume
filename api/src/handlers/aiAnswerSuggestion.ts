import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { aiService } from '../services/aiService';
import { checkRateLimit, logSuspiciousActivity, refundRateLimit } from '../middleware/rateLimiter';
import { sanitizeUserInput, sanitizeSectionType, sanitizeLanguage } from '../utils/inputSanitizer';
import { getUserById } from '../services/dynamodb';
import { verifyResumeOwnership } from '../services/resumeService';
import { checkPremiumStatus } from '../utils/premiumValidator';

export interface GenerateAnswerSuggestionRequest {
  question: string;
  questionCategory: string;
  originalText: string;
  recommendation: string;
  sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
  language: 'es' | 'en';
  resumeId?: string; // Optional resume ID for AI usage tracking
}

export interface GenerateAnswerSuggestionResponse {
  success: boolean;
  data?: {
    suggestion: string;
  };
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
}

export const generateAnswerSuggestion = async (
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
        } as GenerateAnswerSuggestionResponse)
      };
    }

    const userId = event.requestContext.authorizer.userId;
    const endpoint = 'generate-answer-suggestion';

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
        } as GenerateAnswerSuggestionResponse)
      };
    }

    const premiumStatus = checkPremiumStatus(user);
    if (!premiumStatus.isPremium) {
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
          error: premiumStatus.isExpired ? 'Premium subscription expired' : 'Premium required',
          message: premiumStatus.isExpired 
            ? 'Your premium subscription has expired. Please renew to continue using this feature.'
            : 'This feature is available only for premium users. Please upgrade to access AI suggestions.'
        } as GenerateAnswerSuggestionResponse)
      };
    }

    // 3. Rate limiting
    const rateLimitResult = await checkRateLimit(userId, endpoint, 20, 60000);
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
        } as GenerateAnswerSuggestionResponse)
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
          message: 'Please provide question, questionCategory, originalText, recommendation, sectionType, and language'
        } as GenerateAnswerSuggestionResponse)
      };
    }

    let requestData: GenerateAnswerSuggestionRequest;
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
        } as GenerateAnswerSuggestionResponse)
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
        } as GenerateAnswerSuggestionResponse)
      };
    }

    const sanitizedLanguage = sanitizeLanguage(requestData.language);
    const sanitizedQuestion = sanitizeUserInput(requestData.question);
    const sanitizedCategory = sanitizeUserInput(requestData.questionCategory);
    const sanitizedOriginalText = sanitizeUserInput(requestData.originalText);
    const sanitizedRecommendation = sanitizeUserInput(requestData.recommendation);

    // 6. Validate required fields
    if (!sanitizedQuestion || sanitizedQuestion.trim().length === 0) {
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
          error: 'Question is required',
          message: 'Please provide a question'
        } as GenerateAnswerSuggestionResponse)
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
          } as GenerateAnswerSuggestionResponse)
        };
      }
    }

    // 7. Generate answer suggestion using AI service
    try {
      const suggestion = await aiService.generateAnswerSuggestion(
        sanitizedQuestion,
        sanitizedCategory,
        sanitizedOriginalText,
        sanitizedRecommendation,
        sanitizedSectionType as 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language',
        sanitizedLanguage,
        { authorizer: { userId } },
        requestData.resumeId
      );

      const response: GenerateAnswerSuggestionResponse = {
        success: true,
        data: {
          suggestion
        },
        message: 'Answer suggestion generated successfully',
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
          error: 'Failed to generate suggestion',
          message: aiError.message || 'Failed to generate answer suggestion with AI'
        } as GenerateAnswerSuggestionResponse)
      };
    }

  } catch (error) {
    console.error('Error in generateAnswerSuggestion handler:', error);
    
    // Refund rate limit on server error - user shouldn't be penalized
    const userId = event.requestContext.authorizer?.userId;
    if (userId) {
      await refundRateLimit(userId, 'generate-answer-suggestion');
    }
    
    const errorResponse: GenerateAnswerSuggestionResponse = {
      success: false,
      error: 'Internal server error',
      message: 'Failed to generate answer suggestion'
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

export const generateAnswerSuggestionOptions = async (): Promise<APIGatewayProxyResult> => {
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

