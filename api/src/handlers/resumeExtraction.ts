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

// File size limits for resume uploads
const FILE_SIZE_LIMITS = {
  FREE: 2 * 1024 * 1024,      // 2 MB for free users
  PREMIUM: 10 * 1024 * 1024,  // 10 MB for premium users
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
  const startTime = Date.now();
  const requestId = event.requestContext.requestId || `req-${Date.now()}`;
  
  console.log('[ResumeExtraction] Request started', {
    requestId,
    method: event.httpMethod,
    path: event.path,
    userAgent: event.headers['User-Agent'],
    ip: event.requestContext.identity?.sourceIp,
  });

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    console.log('[ResumeExtraction] CORS preflight request', { requestId });
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
    console.log('[ResumeExtraction] Authentication check', {
      requestId,
      userId: userId || 'missing',
    });
    
    if (!userId) {
      console.warn('[ResumeExtraction] Unauthorized request', { requestId });
      return errorResponse(401, 'Unauthorized', 'User not authenticated', 'UNAUTHORIZED');
    }

    // ========================================================================
    // 2. Get user and verify permissions
    // ========================================================================
    console.log('[ResumeExtraction] Fetching user data', { requestId, userId });
    const user = await getUserById(userId);
    
    if (!user) {
      console.warn('[ResumeExtraction] User not found', { requestId, userId });
      return errorResponse(404, 'User not found', undefined, 'USER_NOT_FOUND');
    }

    console.log('[ResumeExtraction] User data retrieved', {
      requestId,
      userId,
      isPremium: user.isPremium,
      freeResumeUsed: user.freeResumeUsed,
    });

    // Check if user can use this feature
    // Only premium users OR free users who haven't used their free resume
    if (!user.isPremium && user.freeResumeUsed) {
      console.warn('[ResumeExtraction] Free quota exceeded', {
        requestId,
        userId,
        isPremium: user.isPremium,
        freeResumeUsed: user.freeResumeUsed,
      });
      return errorResponse(
        403,
        'Free quota exceeded',
        'You have already used your free resume. Upgrade to premium to continue.',
        'QUOTA_EXCEEDED'
      );
    }

    // ========================================================================
    // 3. File size validation
    // ========================================================================
    const contentLength = parseInt(event.headers['content-length'] || event.headers['Content-Length'] || '0', 10);
    const requestBodySize = event.body ? Buffer.byteLength(event.body, 'utf8') : 0;
    const fileSize = contentLength || requestBodySize;
    
    const maxFileSize = user.isPremium ? FILE_SIZE_LIMITS.PREMIUM : FILE_SIZE_LIMITS.FREE;
    const maxFileSizeMB = maxFileSize / (1024 * 1024);
    const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);
    
    console.log('[ResumeExtraction] File size check', {
      requestId,
      userId,
      fileSize,
      fileSizeMB,
      maxFileSize,
      maxFileSizeMB,
      isPremium: user.isPremium,
    });
    
    if (fileSize > maxFileSize) {
      console.warn('[ResumeExtraction] File size exceeded', {
        requestId,
        userId,
        fileSize,
        maxFileSize,
        isPremium: user.isPremium,
      });
      
      const errorDetails = user.isPremium
        ? `Your file is ${fileSizeMB} MB but the maximum allowed is ${maxFileSizeMB} MB. Please reduce the file size.`
        : `Your file is ${fileSizeMB} MB but free users can only upload files up to ${maxFileSizeMB} MB.`;
      
      return {
        statusCode: 413,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'File too large',
          details: errorDetails,
          code: 'FILE_TOO_LARGE',
          // Additional data for frontend to show upgrade modal for free users
          fileSizeMB: parseFloat(fileSizeMB),
          maxFileSizeMB,
          isPremium: user.isPremium,
          showUpgradeModal: !user.isPremium,
        }),
      };
    }

    // ========================================================================
    // 4. Rate limiting
    // ========================================================================
    const maxRequests = user.isPremium ? RATE_LIMITS.premium : RATE_LIMITS.free;
    console.log('[ResumeExtraction] Checking rate limit', {
      requestId,
      userId,
      maxRequests,
      windowMs: RATE_LIMITS.windowMs,
    });
    
    const rateLimitResult = await checkRateLimit(
      userId,
      'resume-extraction',
      maxRequests,
      RATE_LIMITS.windowMs
    );

    console.log('[ResumeExtraction] Rate limit check result', {
      requestId,
      userId,
      allowed: rateLimitResult.allowed,
      remaining: rateLimitResult.remaining,
      resetTime: rateLimitResult.resetTime,
    });

    if (!rateLimitResult.allowed) {
      console.warn('[ResumeExtraction] Rate limit exceeded', {
        requestId,
        userId,
        remaining: rateLimitResult.remaining,
        resetTime: rateLimitResult.resetTime,
      });
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
      console.warn('[ResumeExtraction] Missing request body', { requestId, userId });
      return errorResponse(400, 'Missing request body', undefined, 'MISSING_BODY');
    }

    let requestBody: ExtractResumeRequest;
    try {
      requestBody = JSON.parse(event.body);
      console.log('[ResumeExtraction] Request body parsed', {
        requestId,
        userId,
        hasText: !!requestBody.text,
        textLength: requestBody.text?.length || 0,
        language: requestBody.language || 'en',
      });
    } catch (e) {
      console.error('[ResumeExtraction] Invalid JSON in request body', {
        requestId,
        userId,
        error: e instanceof Error ? e.message : String(e),
      });
      return errorResponse(400, 'Invalid JSON in request body', undefined, 'INVALID_JSON');
    }

    // Validate text field
    if (!requestBody.text || typeof requestBody.text !== 'string') {
      console.warn('[ResumeExtraction] Missing or invalid text field', {
        requestId,
        userId,
        hasText: !!requestBody.text,
        textType: typeof requestBody.text,
      });
      return errorResponse(400, 'Missing or invalid text field', undefined, 'MISSING_TEXT');
    }

    // Validate text length
    if (requestBody.text.length < 50) {
      console.warn('[ResumeExtraction] Text too short', {
        requestId,
        userId,
        textLength: requestBody.text.length,
        minLength: 50,
      });
      return errorResponse(
        400,
        'Text too short',
        'The provided text is too short to be a resume (minimum 50 characters).',
        'TEXT_TOO_SHORT'
      );
    }

    if (requestBody.text.length > MAX_TEXT_LENGTH) {
      console.warn('[ResumeExtraction] Text too long', {
        requestId,
        userId,
        textLength: requestBody.text.length,
        maxLength: MAX_TEXT_LENGTH,
      });
      return errorResponse(
        400,
        'Text too long',
        `The provided text is too long (maximum ${MAX_TEXT_LENGTH} characters).`,
        'TEXT_TOO_LONG'
      );
    }

    // Validate language
    const language = requestBody.language === 'es' ? 'es' : 'en';
    console.log('[ResumeExtraction] Input validation passed', {
      requestId,
      userId,
      textLength: requestBody.text.length,
      language,
    });

    // ========================================================================
    // 5. Sanitize input
    // ========================================================================
    console.log('[ResumeExtraction] Starting input sanitization', {
      requestId,
      userId,
      originalLength: requestBody.text.length,
    });
    
    // Sanitize the text to prevent injection attacks
    // Use 50k limit for resume extraction - resumes can be quite long in plain text format
    const sanitizedText = sanitizeUserMultiline(requestBody.text, 80000);
    const sanitizationDiff = requestBody.text.length - sanitizedText.length;
    
    console.log('[ResumeExtraction] Input sanitized', {
      requestId,
      userId,
      originalLength: requestBody.text.length,
      sanitizedLength: sanitizedText.length,
      charactersRemoved: sanitizationDiff,
    });
    
    // Validate the sanitized input (using same 50k limit as sanitization)
    const validation = validateInputLarge(sanitizedText, 80000);
    console.log('[ResumeExtraction] Input validation result', {
      requestId,
      userId,
      isValid: validation.isValid,
      reason: validation.reason || 'N/A',
    });
    
    if (!validation.isValid) {
      console.warn('[ResumeExtraction] Input validation failed', {
        requestId,
        userId,
        reason: validation.reason,
      });
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
    console.log('[ResumeExtraction] Starting AI extraction', {
      requestId,
      userId,
      textLength: sanitizedText.length,
      language,
      isPremium: user.isPremium,
    });
    
    const extractionStartTime = Date.now();
    const result = await resumeExtractionService.extractResumeFromText(
      sanitizedText,
      language,
      userId,
      user.isPremium
    );
    const extractionDuration = Date.now() - extractionStartTime;

    console.log('[ResumeExtraction] AI extraction completed', {
      requestId,
      userId,
      success: result.success,
      isResumeContent: result.isResumeContent,
      extractionDurationMs: extractionDuration,
      error: result.error || null,
    });

    if (!result.success) {
      console.warn('[ResumeExtraction] Extraction failed', {
        requestId,
        userId,
        error: result.error,
        isResumeContent: result.isResumeContent,
        extractionDurationMs: extractionDuration,
      });
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
    const totalDuration = Date.now() - startTime;
    const extractedDataSummary = {
      hasFirstName: !!result.data?.firstName,
      hasLastName: !!result.data?.lastName,
      hasEmail: !!result.data?.email,
      hasPhone: !!result.data?.phone,
      skillsCount: result.data?.skills?.length || 0,
      experiencesCount: result.data?.experiences?.length || 0,
      educationCount: result.data?.education?.length || 0,
      certificationsCount: result.data?.certifications?.length || 0,
      languagesCount: result.data?.languages?.length || 0,
      extractionConfidence: result.data?.extractionConfidence || 0,
    };

    console.log('[ResumeExtraction] Request completed successfully', {
      requestId,
      userId,
      totalDurationMs: totalDuration,
      extractionDurationMs: extractionDuration,
      extractedData: extractedDataSummary,
    });

    return successResponse({
      data: result.data,
      isResumeContent: result.isResumeContent,
    });

  } catch (error) {
    const totalDuration = Date.now() - startTime;
    console.error('[ResumeExtraction] Handler error', {
      requestId,
      userId: event.requestContext.authorizer?.userId || 'unknown',
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      totalDurationMs: totalDuration,
    });
    
    return errorResponse(
      500,
      'Internal server error',
      'An unexpected error occurred while processing your request.',
      'INTERNAL_ERROR'
    );
  }
};

