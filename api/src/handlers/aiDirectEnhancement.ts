import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { aiService } from '../services/aiService';
import { checkRateLimit, refundRateLimit } from '../middleware/rateLimiter';
import { getUserById } from '../services/dynamodb';
import { verifyResumeOwnership } from '../services/resumeService';
import { checkPremiumStatus } from '../utils/premiumValidator';

interface DirectEnhanceRequest {
  checklistItemId: string;
  sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
  originalText: string;
  language: 'es' | 'en';
  resumeId?: string;
}

interface DirectEnhanceResponse {
  success: boolean;
  data?: string;
  error?: string;
  message?: string;
  remainingRequests?: number;
  resetTime?: number;
  code?: string;
}

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
};

// Valid mechanical fix checklist items that can be directly enhanced
const VALID_MECHANICAL_ITEMS = [
  'summary-no-first-person',
  'summary-ats-keywords',
  'experience-action-verbs',
  'skills-organized',
];

export const directEnhance = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // Verify authentication
    if (!event.requestContext?.authorizer) {
      return {
        statusCode: 401,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: 'Unauthorized',
          message: 'Authentication required'
        } as DirectEnhanceResponse)
      };
    }

    const userId = event.requestContext.authorizer.userId;

    // Check user premium status
    const user = await getUserById(userId);
    if (!user) {
      return {
        statusCode: 404,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: 'User not found',
          message: 'User account not found'
        } as DirectEnhanceResponse)
      };
    }

    // Premium check: Direct enhancement is a premium-only feature
    const premiumStatus = checkPremiumStatus(user);
    if (!premiumStatus.isPremium) {
      return {
        statusCode: 403,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: premiumStatus.isExpired ? 'Premium subscription expired' : 'Premium feature required',
          message: premiumStatus.isExpired 
            ? 'Your premium subscription has expired. Please renew to continue using this feature.'
            : 'Direct enhancement is only available for premium users.',
          code: premiumStatus.isExpired ? 'PREMIUM_EXPIRED' : 'PREMIUM_REQUIRED'
        } as DirectEnhanceResponse)
      };
    }

    // Rate limiting: 10 requests/minute for premium users
    const rateLimitResult = await checkRateLimit(userId, 'ai-direct-enhance', 10, 60000);
    if (!rateLimitResult.allowed) {
      return {
        statusCode: 429,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: 'Rate limit exceeded',
          message: 'You have reached the limit of 10 direct enhancement requests per minute. Please wait a moment before trying again.',
          resetTime: rateLimitResult.resetTime,
          code: 'RATE_LIMIT_EXCEEDED'
        } as DirectEnhanceResponse)
      };
    }

    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: 'Request body is required',
          message: 'Please provide checklistItemId, sectionType, originalText, and language'
        } as DirectEnhanceResponse)
      };
    }

    let requestData: DirectEnhanceRequest;
    try {
      requestData = JSON.parse(event.body);
    } catch (error) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: 'Invalid JSON in request body',
          message: 'Please provide valid JSON data'
        } as DirectEnhanceResponse)
      };
    }

    // Validate required fields
    if (!requestData.checklistItemId) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: 'checklistItemId is required',
          message: 'Please provide the checklist item ID to fix'
        } as DirectEnhanceResponse)
      };
    }

    // Validate checklist item is a mechanical fix
    if (!VALID_MECHANICAL_ITEMS.includes(requestData.checklistItemId)) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: 'Invalid checklist item',
          message: `This checklist item requires user context and cannot be directly enhanced. Valid items: ${VALID_MECHANICAL_ITEMS.join(', ')}`,
          code: 'CONTEXT_REQUIRED'
        } as DirectEnhanceResponse)
      };
    }

    if (!requestData.sectionType) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: 'sectionType is required',
          message: 'Please provide the section type (summary, experience, etc.)'
        } as DirectEnhanceResponse)
      };
    }

    // Validate section type
    const validSectionTypes = ['summary', 'experience', 'education', 'certification', 'project', 'achievement', 'language'];
    if (!validSectionTypes.includes(requestData.sectionType)) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: 'Invalid sectionType',
          message: `sectionType must be one of: ${validSectionTypes.join(', ')}`
        } as DirectEnhanceResponse)
      };
    }

    if (!requestData.originalText || requestData.originalText.trim() === '') {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: 'originalText is required',
          message: 'Please provide the original text to enhance'
        } as DirectEnhanceResponse)
      };
    }

    // Validate language parameter
    const language = requestData.language || 'es';
    if (!['es', 'en'].includes(language)) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: 'Invalid language parameter',
          message: 'Language must be "es" or "en"'
        } as DirectEnhanceResponse)
      };
    }

    // Validate resume ownership if resumeId is provided
    if (requestData.resumeId) {
      const isOwner = await verifyResumeOwnership(userId, requestData.resumeId);
      if (!isOwner) {
        return {
          statusCode: 403,
          headers: CORS_HEADERS,
          body: JSON.stringify({
            success: false,
            error: 'Access denied',
            message: 'Resume not found or access denied'
          } as DirectEnhanceResponse)
        };
      }
    }

    // Build request context
    const requestContext = {
      authorizer: event.requestContext.authorizer as { userId: string }
    };

    // Perform direct enhancement
    const enhancedText = await aiService.directEnhance(
      requestData.checklistItemId,
      requestData.sectionType,
      requestData.originalText.trim(),
      language as 'es' | 'en',
      requestContext,
      requestData.resumeId
    );

    const response: DirectEnhanceResponse = {
      success: true,
      data: enhancedText,
      message: `Section enhanced successfully for checklist item: ${requestData.checklistItemId}`,
      remainingRequests: rateLimitResult.remaining,
      resetTime: rateLimitResult.resetTime
    };

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify(response)
    };

  } catch (error) {
    console.error('Error in directEnhance handler:', error);
    
    // Refund rate limit on server error
    const userId = event.requestContext.authorizer?.userId;
    if (userId) {
      await refundRateLimit(userId, 'ai-direct-enhance');
    }
    
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: 'Failed to enhance section'
      } as DirectEnhanceResponse)
    };
  }
};

// Handler for OPTIONS (CORS preflight)
export const directEnhanceOptions = async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: ''
  };
};

