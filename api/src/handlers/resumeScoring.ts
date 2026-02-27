import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AuthorizedEvent, ScoreResumeResponse, SectionChecklist } from '../types';
import { resumeScoringService } from '../services/resumeScoringService';
import { getUserById } from '../services/dynamodb';
import { getResumeById, updateResumeWithScore, getResumeScore } from '../services/resumeService';
import { checkRateLimit, refundRateLimit } from '../middleware/rateLimiter';
import { checkPremiumStatus } from '../utils/premiumValidator';

/**
 * Generate high-level improvement hints for free users
 * These are vague enough to not give away detailed information
 * but specific enough to encourage upgrading to premium
 */
function generateImprovementHints(checklist: Record<string, SectionChecklist>, totalScore?: number): string[] {
  const hints: string[] = [];
  
  // Always show at least some hints for scores below 8
  // This ensures free users always see areas for improvement
  
  if (!checklist || Object.keys(checklist).length === 0) {
    // Even without checklist data, provide generic hints for low scores
    if (totalScore !== undefined && totalScore < 8) {
      hints.push('Your resume could score higher with optimization');
      hints.push('Professional enhancements available');
    }
    return hints;
  }

  // Check each section and generate vague hints based on completion
  // Using separate if statements (not else-if) to capture multiple issues
  for (const [sectionKey, section] of Object.entries(checklist)) {
    const completionRate = section.totalCount > 0 
      ? section.completedCount / section.totalCount 
      : 1;
    
    // Check for required items that are incomplete
    const hasIncompleteRequired = section.requiredCompletedCount < section.requiredCount;
    const hasIncompleteItems = section.completedCount < section.totalCount;
    
    // Generate hints for any section that's not 100% complete
    if (sectionKey === 'summary' && completionRate < 1.0) {
      hints.push('Summary could be stronger');
    }
    if (sectionKey === 'experience' && completionRate < 1.0) {
      hints.push('Experience details need attention');
    }
    if (sectionKey === 'skills' && completionRate < 1.0) {
      hints.push('Skills section could be enhanced');
    }
    if (sectionKey === 'education' && (hasIncompleteRequired || hasIncompleteItems)) {
      hints.push('Education information could be improved');
    }
    if (sectionKey === 'contact' && hasIncompleteRequired) {
      hints.push('Missing key contact information');
    }
    if (sectionKey === 'achievements' && (section.completedCount === 0 || completionRate < 1.0)) {
      hints.push('Consider adding more achievements');
    }
    if (sectionKey === 'projects' && completionRate < 1.0) {
      hints.push('Project details could be improved');
    }
    if (sectionKey === 'languages' && hasIncompleteItems) {
      hints.push('Language section needs review');
    }
    if (sectionKey === 'dataQuality' && !section.items?.every(i => i.isCompleted)) {
      hints.push('Some entries need corrections');
    }
    if (sectionKey === 'ats' && completionRate < 1.0) {
      hints.push('ATS compatibility could be better');
    }
  }

  // Always add generic hints for low scores if we don't have enough specific hints
  if (hints.length < 2 && totalScore !== undefined && totalScore < 8) {
    const totalItems = Object.values(checklist).reduce((sum, s) => sum + s.totalCount, 0);
    const completedItems = Object.values(checklist).reduce((sum, s) => sum + s.completedCount, 0);
    const overallRate = totalItems > 0 ? completedItems / totalItems : 1;
    
    if (overallRate < 1.0) {
      hints.push('Multiple areas can be optimized');
    }
    if (totalScore < 6) {
      hints.push('Significant improvements possible');
    } else if (totalScore < 8) {
      hints.push('A few enhancements could boost your score');
    }
  }

  // Limit to 5 hints maximum
  return hints.slice(0, 5);
}

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

    // Get resumeId from path parameters (moved up to enable free user score check)
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

    // Check user premium status
    const premiumStatus = checkPremiumStatus(user);
    
    // FREE USER SCORING STRATEGY:
    // - Free users get exactly ONE score per resume (lifetime limit)
    // - If they already have a score, return the existing score
    // - If they don't have a score, allow them to generate one
    if (!premiumStatus.isPremium) {
      // Check if this resume already has a score
      const existingScore = await getResumeScore(userId, resumeId);
      
      if (existingScore && existingScore.generatedAt) {
        // Free user already has a score - return existing score
        console.log(`Free user ${userId} already scored resume ${resumeId}, returning existing score`);
        
        // Filter score for free users (same logic as getScore)
        const filteredScore = {
          totalScore: existingScore.totalScore,
          maxPossibleScore: existingScore.maxPossibleScore || 10.0,
          completionPercentage: existingScore.completionPercentage || 0,
          isOptimized: false,
          breakdown: existingScore.breakdown,
          checklist: {},
          enhancementHistory: [],
          strengths: existingScore.strengths,
          improvements: [],
          improvementHints: generateImprovementHints(existingScore.checklist, existingScore.totalScore),
          generatedAt: existingScore.generatedAt,
          scoringVersion: existingScore.scoringVersion || '1.0.0',
        };
        
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
            data: filteredScore,
            message: 'Returning existing score (free users get one score per resume)',
            isExistingScore: true
          } as ScoreResumeResponse)
        };
      }
      // Free user doesn't have a score yet - allow them to generate one
      console.log(`Free user ${userId} scoring resume ${resumeId} for the first time`);
    }

    // PREMIUM USER: Apply rate limiting (they can re-score as often as rate limits allow)
    // FREE USER (first score): No rate limit for the first and only score
    let rateLimitResult: { allowed: boolean; remaining: number; resetTime: number } | null = null;
    if (premiumStatus.isPremium) {
      const maxRequests = 5; // 5 requests/minute for premium users
      rateLimitResult = await checkRateLimit(userId, 'score-resume', maxRequests, 60000);
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
            message: `Too many scoring requests. Please wait before trying again. (Limit: ${maxRequests} per minute)`,
            resetTime: rateLimitResult.resetTime
          } as ScoreResumeResponse)
        };
      }
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

    // Build response based on user type
    const responseBody: ScoreResumeResponse = {
      success: true,
      data: premiumStatus.isPremium ? score : {
        // Filter score for free users (same logic as getScore)
        totalScore: score.totalScore,
        maxPossibleScore: score.maxPossibleScore || 10.0,
        completionPercentage: score.completionPercentage || 0,
        isOptimized: false,
        breakdown: score.breakdown,
        checklist: {},
        enhancementHistory: [],
        strengths: score.strengths,
        improvements: [],
        improvementHints: generateImprovementHints(score.checklist, score.totalScore),
        generatedAt: score.generatedAt,
        scoringVersion: score.scoringVersion || '1.0.0',
      },
      message: premiumStatus.isPremium 
        ? 'Resume scored successfully' 
        : 'Resume scored successfully (free users get one score per resume)'
    };

    // Add rate limit info for premium users
    if (rateLimitResult) {
      responseBody.remainingRequests = rateLimitResult.remaining;
      responseBody.resetTime = rateLimitResult.resetTime;
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'POST,OPTIONS'
      },
      body: JSON.stringify(responseBody)
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
    // Free users get limited score (no checklist, no detailed improvements)
    // but they get high-level hints to encourage upgrading
    const filteredScore = user.isPremium ? score : {
      totalScore: score.totalScore,
      maxPossibleScore: score.maxPossibleScore || 10.0,
      completionPercentage: score.completionPercentage || 0,
      isOptimized: false, // Free users don't see optimization status
      breakdown: score.breakdown,
      checklist: {}, // Premium only - empty for free users
      enhancementHistory: [], // Premium only
      strengths: score.strengths,
      improvements: [], // Premium only - detailed improvements
      improvementHints: generateImprovementHints(score.checklist, score.totalScore), // High-level hints for free users
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

