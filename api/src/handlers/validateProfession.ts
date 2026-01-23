/**
 * Profession Validation Handler
 * 
 * Dedicated endpoint for validating profession/job title input in the LinkedIn Import wizard.
 * Uses lightweight AI call for fast validation.
 * Implements JWT authentication and tiered rate limiting.
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { checkRateLimit } from '../middleware/rateLimiter';
import { getUserById } from '../services/dynamodb';
import { aiService } from '../services/aiService';
import { isValidProfessionCached, cacheValidProfession } from '../services/professionValidationService';

// ============================================================================
// Types
// ============================================================================

interface ValidateProfessionRequest {
  profession: string;
}

interface ValidateProfessionResponse {
  success: boolean;
  isValid?: boolean;
  message?: string;
  error?: string;
  remainingRequests?: number;
  resetTime?: number;
  code?: string;
  cached?: boolean;  // True if result came from cache (no AI call)
}

// ============================================================================
// Constants
// ============================================================================

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
};

// Rate limits: Premium users get more requests
const RATE_LIMITS = {
  free: 2,        // 2 requests per minute for free users
  premium: 5,     // 5 requests per minute for premium users
  windowMs: 60000 // 1 minute window
};

// Maximum profession length
const MAX_PROFESSION_LENGTH = 200;

// ============================================================================
// Helper Functions
// ============================================================================

function errorResponse(statusCode: number, error: string, message: string, code?: string): APIGatewayProxyResult {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      success: false,
      error,
      message,
      code
    } as ValidateProfessionResponse)
  };
}

function successResponse(data: ValidateProfessionResponse): APIGatewayProxyResult {
  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify(data)
  };
}

// ============================================================================
// Main Handler
// ============================================================================

export const validateProfession = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const requestId = event.requestContext?.requestId || 'unknown';
  const startTime = Date.now();

  console.log('[ValidateProfession] Request received', { requestId });

  try {
    // ========================================================================
    // 1. JWT Authentication
    // ========================================================================
    if (!event.requestContext?.authorizer) {
      console.warn('[ValidateProfession] Unauthorized - no authorizer', { requestId });
      return errorResponse(401, 'Unauthorized', 'Authentication required', 'AUTH_REQUIRED');
    }

    const userId = event.requestContext.authorizer.userId;
    if (!userId) {
      console.warn('[ValidateProfession] Unauthorized - no userId', { requestId });
      return errorResponse(401, 'Unauthorized', 'Authentication required', 'AUTH_REQUIRED');
    }

    // Verify user exists in database
    const user = await getUserById(userId);
    if (!user) {
      console.warn('[ValidateProfession] User not found', { requestId, userId });
      return errorResponse(401, 'Unauthorized', 'User not found', 'USER_NOT_FOUND');
    }

    console.log('[ValidateProfession] User authenticated', { 
      requestId, 
      userId, 
      isPremium: user.isPremium 
    });

    // ========================================================================
    // 2. Parse and Validate Request Body (before cache check)
    // ========================================================================
    if (!event.body) {
      return errorResponse(400, 'Bad Request', 'Request body is required', 'MISSING_BODY');
    }

    let requestData: ValidateProfessionRequest;
    try {
      requestData = JSON.parse(event.body);
    } catch (error) {
      return errorResponse(400, 'Bad Request', 'Invalid JSON in request body', 'INVALID_JSON');
    }

    const { profession } = requestData;

    // Validate profession is present
    if (!profession || typeof profession !== 'string') {
      return errorResponse(400, 'Bad Request', 'Profession is required', 'MISSING_PROFESSION');
    }

    const trimmedProfession = profession.trim();

    // Validate profession is not empty
    if (trimmedProfession.length === 0) {
      return errorResponse(400, 'Bad Request', 'Profession cannot be empty', 'EMPTY_PROFESSION');
    }

    // Validate profession length
    if (trimmedProfession.length > MAX_PROFESSION_LENGTH) {
      return errorResponse(400, 'Bad Request', 
        `Profession exceeds maximum length of ${MAX_PROFESSION_LENGTH} characters`, 
        'PROFESSION_TOO_LONG'
      );
    }

    console.log('[ValidateProfession] Validating profession', { 
      requestId, 
      profession: trimmedProfession.substring(0, 50),
      length: trimmedProfession.length
    });

    // ========================================================================
    // 3. Check Cache First (before rate limiting - cache hits are free)
    // ========================================================================
    const isCached = await isValidProfessionCached(trimmedProfession);
    
    if (isCached) {
      const duration = Date.now() - startTime;
      console.log('[ValidateProfession] Cache hit - returning valid', {
        requestId,
        userId,
        profession: trimmedProfession.substring(0, 50),
        durationMs: duration
      });

      return successResponse({
        success: true,
        isValid: true,
        cached: true
      });
    }

    // ========================================================================
    // 4. Rate Limiting (only for cache misses - AI calls)
    // ========================================================================
    const maxRequests = user.isPremium ? RATE_LIMITS.premium : RATE_LIMITS.free;
    const rateLimitResult = await checkRateLimit(
      userId, 
      'validate-profession', 
      maxRequests, 
      RATE_LIMITS.windowMs
    );

    if (!rateLimitResult.allowed) {
      console.warn('[ValidateProfession] Rate limit exceeded', { 
        requestId, 
        userId,
        isPremium: user.isPremium,
        remaining: rateLimitResult.remaining
      });
      return {
        statusCode: 429,
        headers: {
          ...CORS_HEADERS,
          'Retry-After': String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000))
        },
        body: JSON.stringify({
          success: false,
          error: 'Rate limit exceeded',
          message: `Too many validation requests. Please wait before trying again. (Limit: ${maxRequests}/min)`,
          resetTime: rateLimitResult.resetTime,
          code: 'RATE_LIMIT_EXCEEDED'
        } as ValidateProfessionResponse)
      };
    }

    // ========================================================================
    // 5. Call AI Service for Validation (cache miss)
    // ========================================================================
    const validationResult = await aiService.validateProfession(
      trimmedProfession,
      { authorizer: { userId } }
    );

    // ========================================================================
    // 6. Cache Valid Professions (only valid ones are cached)
    // ========================================================================
    if (validationResult.isValid) {
      await cacheValidProfession(trimmedProfession);
    }

    const duration = Date.now() - startTime;
    console.log('[ValidateProfession] Validation complete', {
      requestId,
      userId,
      isValid: validationResult.isValid,
      cached: false,
      durationMs: duration
    });

    return successResponse({
      success: true,
      isValid: validationResult.isValid,
      message: validationResult.message,
      remainingRequests: rateLimitResult.remaining,
      resetTime: rateLimitResult.resetTime,
      cached: false
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('[ValidateProfession] Error:', {
      requestId,
      error: error instanceof Error ? error.message : String(error),
      durationMs: duration
    });

    return errorResponse(500, 'Internal Server Error', 
      'An error occurred during validation. Please try again.',
      'INTERNAL_ERROR'
    );
  }
};
