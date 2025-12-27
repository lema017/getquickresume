import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AuthorizedEvent, ScoreResumeResponse } from '../types';
import { resumeScoringService } from '../services/resumeScoringService';
import { getUserById } from '../services/dynamodb';
import { getResumeById, updateResumeWithScore, getResumeScore, updateResumeWithGenerated } from '../services/resumeService';
import { aiService } from '../services/aiService';
import { checkRateLimit, refundRateLimit } from '../middleware/rateLimiter';
import { ResumeData, GeneratedResume } from '../types';

/**
 * Check if resumeData has changed in ways that would affect scoring
 * Compares key fields that impact the generated resume content
 */
function hasResumeDataChanged(resumeData: ResumeData, generatedResume: GeneratedResume): boolean {
  // Check languages
  const currentLanguagesCount = resumeData.languages?.length || 0;
  const generatedLanguagesCount = generatedResume.languages?.length || 0;
  if (currentLanguagesCount !== generatedLanguagesCount) {
    return true;
  }

  // Check achievements
  const currentAchievementsCount = resumeData.achievements?.length || 0;
  const generatedAchievementsCount = generatedResume.achievements?.length || 0;
  if (currentAchievementsCount !== generatedAchievementsCount) {
    return true;
  }

  // Check projects (only count projects with name and description)
  const currentProjectsCount = resumeData.projects?.filter(p => p.name && p.description).length || 0;
  const generatedProjectsCount = generatedResume.projects?.length || 0;
  if (currentProjectsCount !== generatedProjectsCount) {
    return true;
  }

  // Check education
  const currentEducationCount = resumeData.education?.length || 0;
  const generatedEducationCount = generatedResume.education?.length || 0;
  if (currentEducationCount !== generatedEducationCount) {
    return true;
  }

  // Check experience count (major scoring factor)
  const currentExperienceCount = resumeData.experience?.length || 0;
  const generatedExperienceCount = generatedResume.experience?.length || 0;
  if (currentExperienceCount !== generatedExperienceCount) {
    return true;
  }

  // Check LinkedIn (affects contact score)
  const currentLinkedIn = resumeData.linkedin || '';
  const generatedLinkedIn = generatedResume.contactInfo?.linkedin || '';
  if (currentLinkedIn !== generatedLinkedIn) {
    return true;
  }

  // Check summary (if it was manually updated significantly)
  const currentSummary = resumeData.summary || '';
  const generatedSummary = generatedResume.professionalSummary || '';
  // Only check if summary length changed significantly (more than 20% difference)
  if (currentSummary.length > 0 && generatedSummary.length > 0 && 
      Math.abs(currentSummary.length - generatedSummary.length) > generatedSummary.length * 0.2) {
    return true;
  }

  return false;
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

    // For on-demand rescoring (manual user action), check if resumeData has changed
    // If changed, regenerate the resume first to ensure scoring uses the latest data
    let resumeToScore = resume;
    if (hasResumeDataChanged(resume.resumeData, resume.generatedResume)) {
      console.log('Resume data has changed, regenerating resume before scoring...');
      
      // Regenerate the resume with updated resumeData
      const regeneratedResume = await aiService.generateResume(resume.resumeData, user.isPremium);
      
      // Update the resume with the newly generated content
      const updatedResume = await updateResumeWithGenerated(userId, resumeId, regeneratedResume);
      
      // Use the updated resume for scoring
      resumeToScore = updatedResume;
      console.log('Resume regenerated successfully, proceeding to score...');
    }

    // Score the resume (using either existing or newly generated resume)
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
    // Free users get limited score (no improvements, no detailedFeedback)
    const filteredScore = user.isPremium ? score : {
      totalScore: score.totalScore,
      breakdown: score.breakdown,
      strengths: score.strengths,
      improvements: [], // Premium only
      detailedFeedback: [], // Premium only
      generatedAt: score.generatedAt,
      aiProvider: score.aiProvider,
      model: score.model,
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

