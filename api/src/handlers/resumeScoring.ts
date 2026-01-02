import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AuthorizedEvent, ScoreResumeResponse } from '../types';
import { resumeScoringService } from '../services/resumeScoringService';
import { getUserById } from '../services/dynamodb';
import { getResumeById, updateResumeWithScore, getResumeScore } from '../services/resumeService';
import { checkRateLimit, refundRateLimit } from '../middleware/rateLimiter';
/**
 * POST /api/resumes/{id}/score
 * On-demand scoring (premium feature)
 */
export const scoreResume = async (
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Score Resume request received:', JSON.stringify(event, null, 2));

  try {
    // Verify authorization context
    if (!event.requestContext?.authorizer) {
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Unauthorized: Missing authorization context'
        } as ScoreResumeResponse)
      };
    }

    const userId = event.requestContext.authorizer.userId;

    // Get user to verify premium status
    const user = await getUserById(userId);
    if (!user) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'User not found'
        } as ScoreResumeResponse)
      };
    }

    // Premium check - on-demand scoring is premium only
    if (!user.isPremium) {
      return {
        statusCode: 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Premium feature',
          message: 'On-demand resume scoring is a premium feature. Please upgrade to premium to use this feature.'
        } as ScoreResumeResponse)
      };
    }

    // Rate limiting: 10 requests per minute for premium users
    const rateLimitResult = await checkRateLimit(userId, 'score-resume', 10, 60000);
    if (!rateLimitResult.allowed) {
      return {
        statusCode: 429,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Rate limit exceeded',
          message: `Too many scoring requests. Please wait before trying again. (Limit: 10 per minute)`,
          resetTime: rateLimitResult.resetTime
        } as ScoreResumeResponse)
      };
    }

    // Get resumeId from path parameters
    const resumeId = event.pathParameters?.id;
    if (!resumeId) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Resume ID is required'
        } as ScoreResumeResponse)
      };
    }

    // Get resume and verify ownership
    const resume = await getResumeById(userId, resumeId);
    if (!resume) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Resume not found'
        } as ScoreResumeResponse)
      };
    }

    // Check if resume has generated content
    if (!resume.generatedResume) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Resume must be generated before scoring'
        } as ScoreResumeResponse)
      };
    }

    // NOTE: Previously we had logic to regenerate the resume if resumeData changed.
    // This caused a bug where enhancements to generatedResume were lost because:
    // 1. User enhances generatedResume.professionalSummary (e.g., removes "I am...")
    // 2. resumeData.summary still has old text ("I am...")
    // 3. hasResumeDataChanged() detected difference and regenerated from resumeData
    // 4. The regenerated resume overwrote the enhancement with old text
    //
    // FIX: Always score the generatedResume as-is. If the user wants to regenerate
    // from updated resumeData, they should use the "Regenerate" button, not "Re-score".
    const resumeToScore = resume;

    // Score the resume directly without regeneration
    const score = await resumeScoringService.scoreResume(
      resumeToScore.generatedResume!,
      resumeToScore.resumeData,
      user.isPremium
    );

    // Update resume with score
    await updateResumeWithScore(userId, resumeId, score);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'POST,OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        data: score,
        message: 'Resume scored successfully',
        remainingRequests: rateLimitResult.remaining,
        resetTime: rateLimitResult.resetTime
      } as ScoreResumeResponse)
    };

  } catch (error) {
    console.error('Error scoring resume:', error);
    
    // Refund rate limit on server error - user shouldn't be penalized
    const userId = event.requestContext.authorizer?.userId;
    if (userId) {
      await refundRateLimit(userId, 'score-resume');
    }
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'POST,OPTIONS'
      },
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: 'Failed to score resume'
      } as ScoreResumeResponse)
    };
  }
};

/**
 * GET /api/resumes/{id}/score
 * Retrieve existing score
 */
export const getScore = async (
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Get Resume Score request received:', JSON.stringify(event, null, 2));

  try {
    // Verify authorization context
    if (!event.requestContext?.authorizer) {
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'GET,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Unauthorized: Missing authorization context'
        } as ScoreResumeResponse)
      };
    }

    const userId = event.requestContext.authorizer.userId;

    // Get user to check premium status
    const user = await getUserById(userId);
    if (!user) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'GET,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'User not found'
        } as ScoreResumeResponse)
      };
    }

    // Get resumeId from path parameters
    const resumeId = event.pathParameters?.id;
    if (!resumeId) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'GET,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Resume ID is required'
        } as ScoreResumeResponse)
      };
    }

    // Get resume and verify ownership
    const resume = await getResumeById(userId, resumeId);
    if (!resume) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'GET,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Resume not found'
        } as ScoreResumeResponse)
      };
    }

    // Get score
    const score = await getResumeScore(userId, resumeId);
    if (!score) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'GET,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Score not found',
          message: 'This resume has not been scored yet'
        } as ScoreResumeResponse)
      };
    }

    // Filter score based on premium status
    // Free users get limited score (no checklist, no improvements)
    const filteredScore = user.isPremium ? score : {
      totalScore: score.totalScore,
      maxPossibleScore: score.maxPossibleScore || 10.0,
      completionPercentage: score.completionPercentage || 0,
      isOptimized: false, // Free users don't see optimization status
      breakdown: score.breakdown,
      checklist: {}, // Premium only - empty for free users
      enhancementHistory: [], // Premium only
      strengths: score.strengths,
      improvements: [], // Premium only
      generatedAt: score.generatedAt,
      scoringVersion: score.scoringVersion || '1.0.0',
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'GET,OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        data: filteredScore,
        message: 'Score retrieved successfully'
      } as ScoreResumeResponse)
    };

  } catch (error) {
    console.error('Error getting resume score:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'GET,OPTIONS'
      },
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: 'Failed to get resume score'
      } as ScoreResumeResponse)
    };
  }
};

