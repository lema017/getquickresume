import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  AuthorizedEvent,
  AnalyzeJobRequest,
  AnalyzeJobResponse,
  GenerateQuestionsRequest,
  GenerateQuestionsResponse,
  EnhanceAnswerRequest,
  EnhanceAnswerResponse,
  GenerateTailoredResumeRequest,
  GenerateTailoredResumeResponse,
  SaveTailoredResumeRequest,
  SaveTailoredResumeResponse,
  TailoringLimitsResponse,
  Resume,
  TailoredResumeMetadata,
} from '../types';
import { getUserById } from '../services/dynamodb';
import { getResumeById, createResume, updateResume } from '../services/resumeService';
import {
  analyzeJobPosting,
  generateClarificationQuestions,
  enhanceAnswer,
  generateTailoredResume,
  checkTailoringLimits,
  incrementTailoringUsage,
  extractJobFromUrl,
} from '../services/jobTailoringService';
import { checkRateLimit } from '../middleware/rateLimiter';

// ============================================================================
// CORS & Response Helpers
// ============================================================================

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
};

const errorResponse = (
  statusCode: number,
  error: string,
  message?: string,
  code?: string
): APIGatewayProxyResult => ({
  statusCode,
  headers: corsHeaders,
  body: JSON.stringify({ success: false, error, message, code }),
});

const successResponse = (data: any, statusCode: number = 200): APIGatewayProxyResult => ({
  statusCode,
  headers: corsHeaders,
  body: JSON.stringify(data),
});

// ============================================================================
// Rate Limit Constants
// ============================================================================

const RATE_LIMITS = {
  validateUrl: { free: 5, premium: 20, windowMs: 60000 },  // per minute
  analyze: { free: 5, premium: 20, windowMs: 60000 },
  questions: { free: 3, premium: 10, windowMs: 60000 },
  enhance: { free: 2, premium: 15, windowMs: 60000 },
  generate: { free: 2, premium: 10, windowMs: 60000 },
  save: { free: 5, premium: 20, windowMs: 60000 },
  limits: { free: 10, premium: 30, windowMs: 60000 },
};

// ============================================================================
// 0. POST /api/job-tailoring/validate-url
// ============================================================================

export async function validateJobUrlHandler(
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> {
  try {
    const userId = event.requestContext.authorizer?.userId;
    if (!userId) {
      return errorResponse(401, 'Unauthorized', 'User not authenticated');
    }

    // Get user to check premium status
    const user = await getUserById(userId);
    if (!user) {
      return errorResponse(404, 'User not found');
    }

    // Rate limiting
    const rateLimit = user.isPremium ? RATE_LIMITS.validateUrl.premium : RATE_LIMITS.validateUrl.free;
    const rateLimitCheck = await checkRateLimit(userId, 'job-validate-url', rateLimit, RATE_LIMITS.validateUrl.windowMs);
    if (!rateLimitCheck.allowed) {
      return errorResponse(429, 'Rate limit exceeded', 'Please wait before making another request', 'RATE_LIMIT');
    }

    // Parse request body
    let body: { url: string };
    try {
      body = JSON.parse(event.body || '{}');
    } catch (e) {
      return errorResponse(400, 'Invalid request body');
    }

    const { url } = body;

    // Validate required fields
    if (!url || typeof url !== 'string') {
      return errorResponse(400, 'Missing required field', 'url is required');
    }

    if (url.length > 2048) {
      return errorResponse(400, 'URL too long', 'Maximum 2048 characters allowed');
    }

    // Extract job posting from URL
    const result = await extractJobFromUrl(url, userId, user.isPremium);

    const response = {
      success: true,
      data: result,
      remainingRequests: rateLimitCheck.remaining - 1,
      resetTime: rateLimitCheck.resetTime,
    };

    return successResponse(response);
  } catch (error: any) {
    console.error('Error in validateJobUrlHandler:', error);
    return errorResponse(500, 'Internal server error', error.message);
  }
}

// ============================================================================
// 1. POST /api/job-tailoring/analyze
// ============================================================================

export async function analyzeJob(
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> {
  try {
    const userId = event.requestContext.authorizer?.userId;
    if (!userId) {
      return errorResponse(401, 'Unauthorized', 'User not authenticated');
    }

    // Get user to check premium status
    const user = await getUserById(userId);
    if (!user) {
      return errorResponse(404, 'User not found');
    }

    // Rate limiting
    const rateLimit = user.isPremium ? RATE_LIMITS.analyze.premium : RATE_LIMITS.analyze.free;
    const rateLimitCheck = await checkRateLimit(userId, 'job-analyze', rateLimit, RATE_LIMITS.analyze.windowMs);
    if (!rateLimitCheck.allowed) {
      return errorResponse(429, 'Rate limit exceeded', `Please wait before making another request`, 'RATE_LIMIT');
    }

    // Parse request body
    let body: AnalyzeJobRequest;
    try {
      body = JSON.parse(event.body || '{}');
    } catch (e) {
      return errorResponse(400, 'Invalid request body');
    }

    const { resumeId, description, language } = body;

    // Validate required fields
    if (!resumeId || !description) {
      return errorResponse(400, 'Missing required fields', 'resumeId and description are required');
    }

    if (description.length > 30000) {
      return errorResponse(400, 'Job description too long', 'Maximum 30000 characters allowed');
    }

    // Get the resume
    const resume = await getResumeById(userId, resumeId);
    if (!resume) {
      return errorResponse(404, 'Resume not found');
    }

    // Analyze the job posting
    const analysisResult = await analyzeJobPosting(
      resume,
      description,
      language || 'en',
      userId,
      user.isPremium
    );

    const response: AnalyzeJobResponse = {
      success: true,
      data: analysisResult,
      remainingRequests: rateLimitCheck.remaining - 1,
      resetTime: rateLimitCheck.resetTime,
    };

    return successResponse(response);
  } catch (error: any) {
    console.error('Error in analyzeJob:', error);
    return errorResponse(500, 'Internal server error', error.message);
  }
}

// ============================================================================
// 2. POST /api/job-tailoring/questions
// ============================================================================

export async function generateQuestions(
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> {
  try {
    const userId = event.requestContext.authorizer?.userId;
    if (!userId) {
      return errorResponse(401, 'Unauthorized', 'User not authenticated');
    }

    const user = await getUserById(userId);
    if (!user) {
      return errorResponse(404, 'User not found');
    }

    // Rate limiting
    const rateLimit = user.isPremium ? RATE_LIMITS.questions.premium : RATE_LIMITS.questions.free;
    const rateLimitCheck = await checkRateLimit(userId, 'job-questions', rateLimit, RATE_LIMITS.questions.windowMs);
    if (!rateLimitCheck.allowed) {
      return errorResponse(429, 'Rate limit exceeded', 'Please wait before making another request', 'RATE_LIMIT');
    }

    // Parse request body
    let body: GenerateQuestionsRequest;
    try {
      body = JSON.parse(event.body || '{}');
    } catch (e) {
      return errorResponse(400, 'Invalid request body');
    }

    const { resumeId, jobInfo, language, suggestions } = body;

    if (!resumeId || !jobInfo) {
      return errorResponse(400, 'Missing required fields', 'resumeId and jobInfo are required');
    }

    // Get the resume
    const resume = await getResumeById(userId, resumeId);
    if (!resume) {
      return errorResponse(404, 'Resume not found');
    }

    // Generate questions (pass analysis suggestions if provided)
    const questions = await generateClarificationQuestions(
      resume,
      jobInfo,
      language || 'en',
      userId,
      user.isPremium,
      suggestions
    );

    const response: GenerateQuestionsResponse = {
      success: true,
      data: questions,
      remainingRequests: rateLimitCheck.remaining - 1,
      resetTime: rateLimitCheck.resetTime,
    };

    return successResponse(response);
  } catch (error: any) {
    console.error('Error in generateQuestions:', error);
    return errorResponse(500, 'Internal server error', error.message);
  }
}

// ============================================================================
// 3. POST /api/job-tailoring/enhance-answer
// ============================================================================

export async function enhanceAnswerHandler(
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> {
  try {
    const userId = event.requestContext.authorizer?.userId;
    if (!userId) {
      return errorResponse(401, 'Unauthorized', 'User not authenticated');
    }

    const user = await getUserById(userId);
    if (!user) {
      return errorResponse(404, 'User not found');
    }

    // Rate limiting
    const rateLimit = user.isPremium ? RATE_LIMITS.enhance.premium : RATE_LIMITS.enhance.free;
    const rateLimitCheck = await checkRateLimit(userId, 'job-enhance', rateLimit, RATE_LIMITS.enhance.windowMs);
    if (!rateLimitCheck.allowed) {
      return errorResponse(429, 'Rate limit exceeded', 'Please wait before making another request', 'RATE_LIMIT');
    }

    // Parse request body
    let body: EnhanceAnswerRequest;
    try {
      body = JSON.parse(event.body || '{}');
    } catch (e) {
      return errorResponse(400, 'Invalid request body');
    }

    const { text, context, questionId, language, resumeId, question, jobInfo } = body;

    if (!text || !context || !questionId) {
      return errorResponse(400, 'Missing required fields', 'text, context, and questionId are required');
    }

    if (text.length > 2000) {
      return errorResponse(400, 'Text too long', 'Maximum 2000 characters allowed');
    }

    // Enhance the answer with full context (question text and job info)
    const enhancedText = await enhanceAnswer(
      text,
      context,
      questionId,
      language || 'en',
      userId,
      user.isPremium,
      resumeId,
      question,
      jobInfo
    );

    const response: EnhanceAnswerResponse = {
      success: true,
      data: enhancedText,
      remainingRequests: rateLimitCheck.remaining - 1,
      resetTime: rateLimitCheck.resetTime,
    };

    return successResponse(response);
  } catch (error: any) {
    console.error('Error in enhanceAnswerHandler:', error);
    return errorResponse(500, 'Internal server error', error.message);
  }
}

// ============================================================================
// 3.5. POST /api/job-tailoring/generate-answer-options
// ============================================================================

export async function generateAnswerOptionsHandler(
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> {
  try {
    const userId = event.requestContext.authorizer?.userId;
    if (!userId) {
      return errorResponse(401, 'Unauthorized', 'User not authenticated');
    }

    const user = await getUserById(userId);
    if (!user) {
      return errorResponse(404, 'User not found');
    }

    // Rate limiting (same as enhance since it's similar AI usage)
    const rateLimit = user.isPremium ? RATE_LIMITS.enhance.premium : RATE_LIMITS.enhance.free;
    const rateLimitCheck = await checkRateLimit(userId, 'job-answer-options', rateLimit, RATE_LIMITS.enhance.windowMs);
    if (!rateLimitCheck.allowed) {
      return errorResponse(429, 'Rate limit exceeded', 'Please wait before making another request', 'RATE_LIMIT');
    }

    // Parse request body
    let body: {
      questionId: string;
      question: string;
      context: string;
      resumeId: string;
      jobInfo: any;
      language?: 'en' | 'es';
    };
    try {
      body = JSON.parse(event.body || '{}');
    } catch (e) {
      return errorResponse(400, 'Invalid request body');
    }

    const { questionId, question, context, resumeId, jobInfo, language } = body;

    if (!questionId || !question || !context || !resumeId || !jobInfo) {
      return errorResponse(400, 'Missing required fields', 'questionId, question, context, resumeId, and jobInfo are required');
    }

    // Get the resume
    const resume = await getResumeById(userId, resumeId);
    if (!resume) {
      return errorResponse(404, 'Resume not found');
    }

    // Generate 3 answer options using AI
    const { generateAnswerOptions } = await import('../services/jobTailoringService');
    const options = await generateAnswerOptions(
      resume,
      question,
      context,
      jobInfo,
      language || 'en',
      userId,
      user.isPremium
    );

    const response = {
      success: true,
      data: {
        questionId,
        options
      },
      remainingRequests: rateLimitCheck.remaining - 1,
      resetTime: rateLimitCheck.resetTime,
    };

    return successResponse(response);
  } catch (error: any) {
    console.error('Error in generateAnswerOptionsHandler:', error);
    return errorResponse(500, 'Internal server error', error.message);
  }
}

// ============================================================================
// 4. POST /api/job-tailoring/generate
// ============================================================================

export async function generateTailoredResumeHandler(
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> {
  try {
    const userId = event.requestContext.authorizer?.userId;
    if (!userId) {
      return errorResponse(401, 'Unauthorized', 'User not authenticated');
    }

    const user = await getUserById(userId);
    if (!user) {
      return errorResponse(404, 'User not found');
    }

    // Check tailoring usage limits FIRST
    const usageLimits = await checkTailoringLimits(user);
    if (!usageLimits.canCreate) {
      const limitMessage = user.isPremium
        ? `You have reached your monthly limit of ${usageLimits.limit} tailored resumes. Resets on ${new Date(usageLimits.resetDate!).toLocaleDateString()}.`
        : 'Free users can create 1 tailored resume. Upgrade to Premium for 40 per month.';

      return errorResponse(403, 'Usage limit reached', limitMessage, 'USAGE_LIMIT_REACHED');
    }

    // Rate limiting
    const rateLimit = user.isPremium ? RATE_LIMITS.generate.premium : RATE_LIMITS.generate.free;
    const rateLimitCheck = await checkRateLimit(userId, 'job-generate', rateLimit, RATE_LIMITS.generate.windowMs);
    if (!rateLimitCheck.allowed) {
      return errorResponse(429, 'Rate limit exceeded', 'Please wait before making another request', 'RATE_LIMIT');
    }

    // Parse request body
    let body: GenerateTailoredResumeRequest;
    try {
      body = JSON.parse(event.body || '{}');
    } catch (e) {
      return errorResponse(400, 'Invalid request body');
    }

    const { resumeId, jobInfo, answers, language, matchScoreBefore, matchingSkills } = body;

    if (!resumeId || !jobInfo || !answers) {
      return errorResponse(400, 'Missing required fields', 'resumeId, jobInfo, and answers are required');
    }

    // Get the resume
    const resume = await getResumeById(userId, resumeId);
    if (!resume) {
      return errorResponse(404, 'Resume not found');
    }

    // Generate the tailored resume (pass matchScoreBefore for score improvement tracking)
    // Also pass matchingSkills from initial analysis to prevent false-positive "missing" keywords
    const { tailoredResume, result } = await generateTailoredResume(
      resume,
      jobInfo,
      answers,
      language || 'en',
      userId,
      user.isPremium,
      matchScoreBefore || 60,  // Default to 60 if not provided
      matchingSkills || []     // Skills identified as matching in initial analysis
    );

    // Increment usage counter (but don't save yet - user needs to confirm save)
    // Usage will be incremented in the save endpoint

    const response: GenerateTailoredResumeResponse = {
      success: true,
      data: { tailoredResume, result },
      remainingRequests: rateLimitCheck.remaining - 1,
      resetTime: rateLimitCheck.resetTime,
    };

    return successResponse(response);
  } catch (error: any) {
    console.error('Error in generateTailoredResumeHandler:', error);
    return errorResponse(500, 'Internal server error', error.message);
  }
}

// ============================================================================
// 5. POST /api/job-tailoring/save
// ============================================================================

export async function saveTailoredResumeHandler(
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> {
  try {
    const userId = event.requestContext.authorizer?.userId;
    if (!userId) {
      return errorResponse(401, 'Unauthorized', 'User not authenticated');
    }

    const user = await getUserById(userId);
    if (!user) {
      return errorResponse(404, 'User not found');
    }

    // Check tailoring usage limits
    const usageLimits = await checkTailoringLimits(user);
    if (!usageLimits.canCreate) {
      return errorResponse(403, 'Usage limit reached', 'You have reached your tailored resume limit', 'USAGE_LIMIT_REACHED');
    }

    // Rate limiting
    const rateLimit = user.isPremium ? RATE_LIMITS.save.premium : RATE_LIMITS.save.free;
    const rateLimitCheck = await checkRateLimit(userId, 'job-save', rateLimit, RATE_LIMITS.save.windowMs);
    if (!rateLimitCheck.allowed) {
      return errorResponse(429, 'Rate limit exceeded', 'Please wait before making another request', 'RATE_LIMIT');
    }

    // Parse request body
    let body: SaveTailoredResumeRequest;
    try {
      body = JSON.parse(event.body || '{}');
    } catch (e) {
      return errorResponse(400, 'Invalid request body');
    }

    const { sourceResumeId, tailoredResume, tailoringResult, jobInfo, answers, matchScore, title } = body;

    if (!sourceResumeId || !tailoredResume || !tailoringResult || !jobInfo || !title) {
      return errorResponse(400, 'Missing required fields');
    }

    // Get the original resume to copy resumeData
    const originalResume = await getResumeById(userId, sourceResumeId);
    if (!originalResume) {
      return errorResponse(404, 'Source resume not found');
    }

    // Create tailoring metadata
    const tailoringMetadata: TailoredResumeMetadata = {
      isTailored: true,
      sourceResumeId,
      jobPosting: jobInfo,
      clarificationAnswers: answers || [],
      matchScore: matchScore || tailoringResult.atsScoreAfter,
      tailoringResult,
      createdAt: new Date().toISOString(),
    };

    // Create new resume with tailored content
    const newResume = await createResume(userId, originalResume.resumeData, title);

    // Update the resume with generated content and tailoring metadata
    await updateResume(userId, newResume.id, {
      generatedResume: tailoredResume,
      status: 'generated',
      isTailored: true,
      tailoringMetadata,
      score: {
        totalScore: Math.round(tailoringResult.atsScoreAfter / 10), // Convert 0-100 to 1-10
        maxPossibleScore: 10,
        completionPercentage: 85,
        isOptimized: true,
        breakdown: {
          summary: 8,
          experience: 8,
          skills: 8,
          education: 7,
          projects: 7,
          achievements: 7,
          languages: 7,
          contact: 9,
        },
        checklist: {}, // Job tailored resumes don't use checklist
        enhancementHistory: [],
        strengths: ['ATS optimized for target position', 'Keyword-rich content', 'Grammar-checked'],
        improvements: [],
        generatedAt: new Date().toISOString(),
        scoringVersion: '2.0.0',
        aiProvider: 'groq',
        model: 'openai/gpt-oss-20b',
      },
    });

    // Increment usage count after successful save
    await incrementTailoringUsage(userId);

    const response: SaveTailoredResumeResponse = {
      success: true,
      resumeId: newResume.id,
      message: 'Tailored resume saved successfully',
    };

    return successResponse(response, 201);
  } catch (error: any) {
    console.error('Error in saveTailoredResumeHandler:', error);
    return errorResponse(500, 'Internal server error', error.message);
  }
}

// ============================================================================
// 6. GET /api/job-tailoring/limits
// ============================================================================

export async function getTailoringLimitsHandler(
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> {
  try {
    const userId = event.requestContext.authorizer?.userId;
    if (!userId) {
      return errorResponse(401, 'Unauthorized', 'User not authenticated');
    }

    const user = await getUserById(userId);
    if (!user) {
      return errorResponse(404, 'User not found');
    }

    // Rate limiting (light for this read endpoint)
    const rateLimit = user.isPremium ? RATE_LIMITS.limits.premium : RATE_LIMITS.limits.free;
    const rateLimitCheck = await checkRateLimit(userId, 'job-limits', rateLimit, RATE_LIMITS.limits.windowMs);
    if (!rateLimitCheck.allowed) {
      return errorResponse(429, 'Rate limit exceeded', 'Please wait before making another request', 'RATE_LIMIT');
    }

    // Get current limits
    const limits = await checkTailoringLimits(user);

    const response: TailoringLimitsResponse = {
      success: true,
      data: {
        used: limits.used,
        limit: limits.limit,
        resetDate: limits.resetDate,
        isPremium: user.isPremium,
      },
    };

    return successResponse(response);
  } catch (error: any) {
    console.error('Error in getTailoringLimitsHandler:', error);
    return errorResponse(500, 'Internal server error', error.message);
  }
}

