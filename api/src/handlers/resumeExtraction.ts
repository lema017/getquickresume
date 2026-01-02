/**
 * Resume Extraction Handler
 * Extracts structured resume data from plain text using AI
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { resumeExtractionService } from '../services/resumeExtractionService';
import { checkRateLimit } from '../middleware/rateLimiter';
import { getUserById } from '../services/dynamodb';
import { sanitizeUserMultiline, validateInputLarge } from '../utils/inputSanitizer';

// ============================================================================
// TYPES
// ============================================================================

interface AuthorizedEvent extends APIGatewayProxyEvent {
  requestContext: APIGatewayProxyEvent['requestContext'] & {
    authorizer?: {
      userId?: string;
    };
  };
}

interface ExtractResumeRequest {
  text: string;
  language?: 'en' | 'es';
}

// ============================================================================
// CORS & RESPONSE HELPERS
// ============================================================================

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
};

function successResponse(data: any): APIGatewayProxyResult {
  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ success: true, ...data }),
  };
}

function errorResponse(
  statusCode: number,
  message: string,
  details?: string,
  code?: string
): APIGatewayProxyResult {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify({
      success: false,
      error: message,
      details,
      code,
    }),
  };
}

// ============================================================================
// CONSTANTS
// ============================================================================

const MAX_TEXT_LENGTH = 50000; // 50k characters max
const RATE_LIMITS = {
  free: 1,      // 1 request per minute for free users
  premium: 5,   // 5 requests per minute for premium users
  windowMs: 60000, // 1 minute window
};

// ============================================================================
// HANDLER
// ============================================================================

/**
 * POST /api/resume-extraction/extract
 * Extracts structured resume data from plain text using AI
 */
export const extractResumeData = async (
  event: AuthorizedEvent
): Promise<APIGatewayProxyResult> => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  try {
    // ========================================================================
    // 1. Authentication
    // ========================================================================
    const userId = event.requestContext.authorizer?.userId;
    if (!userId) {
      return errorResponse(401, 'Unauthorized', 'User not authenticated', 'UNAUTHORIZED');
    }

    // ========================================================================
    // 2. Get user and verify permissions
    // ========================================================================
    const user = await getUserById(userId);
    if (!user) {
      return errorResponse(404, 'User not found', undefined, 'USER_NOT_FOUND');
    }

    // Check if user can use this feature
    // Only premium users OR free users who haven't used their free resume
    if (!user.isPremium && user.freeResumeUsed) {
      return errorResponse(
        403,
        'Free quota exceeded',
        'You have already used your free resume. Upgrade to premium to continue.',
        'QUOTA_EXCEEDED'
      );
    }

    // ========================================================================
    // 3. Rate limiting
    // ========================================================================
    const maxRequests = user.isPremium ? RATE_LIMITS.premium : RATE_LIMITS.free;
    const rateLimitResult = await checkRateLimit(
      userId,
      'resume-extraction',
      maxRequests,
      RATE_LIMITS.windowMs
    );

    if (!rateLimitResult.allowed) {
      return errorResponse(
        429,
        'Rate limit exceeded',
        `Too many requests. Please wait before trying again. (Limit: ${maxRequests} per minute)`,
        'RATE_LIMIT'
      );
    }

    // ========================================================================
    // 4. Parse and validate request body
    // ========================================================================
    if (!event.body) {
      return errorResponse(400, 'Missing request body', undefined, 'MISSING_BODY');
    }

    let requestBody: ExtractResumeRequest;
    try {
      requestBody = JSON.parse(event.body);
    } catch (e) {
      return errorResponse(400, 'Invalid JSON in request body', undefined, 'INVALID_JSON');
    }

    // Validate text field
    if (!requestBody.text || typeof requestBody.text !== 'string') {
      return errorResponse(400, 'Missing or invalid text field', undefined, 'MISSING_TEXT');
    }

    // Validate text length
    if (requestBody.text.length < 50) {
      return errorResponse(
        400,
        'Text too short',
        'The provided text is too short to be a resume (minimum 50 characters).',
        'TEXT_TOO_SHORT'
      );
    }

    if (requestBody.text.length > MAX_TEXT_LENGTH) {
      return errorResponse(
        400,
        'Text too long',
        `The provided text is too long (maximum ${MAX_TEXT_LENGTH} characters).`,
        'TEXT_TOO_LONG'
      );
    }

    // Validate language
    const language = requestBody.language === 'es' ? 'es' : 'en';

    // ========================================================================
    // 5. Sanitize input
    // ========================================================================
    // Sanitize the text to prevent injection attacks
    const sanitizedText = sanitizeUserMultiline(requestBody.text);
    
    // Validate the sanitized input
    const validation = validateInputLarge(sanitizedText);
    if (!validation.isValid) {
      return errorResponse(
        400,
        'Invalid input',
        validation.reason || 'The provided text contains invalid content.',
        'INVALID_INPUT'
      );
    }

    // ========================================================================
    // 6. Extract resume data using AI
    // ========================================================================
    const result = await resumeExtractionService.extractResumeFromText(
      sanitizedText,
      language,
      userId,
      user.isPremium
    );

    if (!result.success) {
      return errorResponse(
        400,
        result.error || 'Extraction failed',
        'Could not extract resume data from the provided text.',
        'EXTRACTION_FAILED'
      );
    }

    // ========================================================================
    // 7. Return extracted data
    // ========================================================================
    return successResponse({
      data: result.data,
      isResumeContent: result.isResumeContent,
    });

  } catch (error) {
    console.error('Error in extractResumeData handler:', error);
    return errorResponse(
      500,
      'Internal server error',
      'An unexpected error occurred while processing your request.',
      'INTERNAL_ERROR'
    );
  }
};

