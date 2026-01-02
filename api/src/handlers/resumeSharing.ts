import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AuthorizedEvent } from '../types';
import { getResumeById, updateResume, getResumeByShareToken } from '../services/resumeService';
import { getUserById } from '../services/dynamodb';
import { getAnalytics, getRecentViewers } from '../services/analyticsService';
import { checkRateLimit, getClientIP } from '../utils/rateLimiter';

// Generate a secure 12-character alphanumeric token
const generateShareToken = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 12; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

export const enableSharing = async (
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> => {
  try {
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
          error: 'Unauthorized'
        })
      };
    }

    const userId = event.requestContext.authorizer.userId;
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
        })
      };
    }

    // Check if user is premium
    const user = await getUserById(userId);
    if (!user || !user.isPremium) {
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
          error: 'Premium subscription required',
          message: 'This feature is only available for premium users'
        })
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
        })
      };
    }

    // Check if resume is generated
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
          error: 'Resume must be generated before sharing'
        })
      };
    }

    // Generate share token if not exists
    const shareToken = resume.shareToken || generateShareToken();
    const now = new Date().toISOString();

    // Update resume with sharing enabled
    const updatedResume = await updateResume(userId, resumeId, {
      shareToken,
      isPubliclyShared: true,
      shareCreatedAt: resume.shareCreatedAt || now,
    });

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
        data: {
          shareToken: updatedResume.shareToken,
          shareUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/share/${updatedResume.shareToken}`,
          isPubliclyShared: updatedResume.isPubliclyShared,
        }
      })
    };
  } catch (error) {
    console.error('Error enabling sharing:', error);
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
        error: 'Internal server error'
      })
    };
  }
};

export const disableSharing = async (
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.requestContext?.authorizer) {
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'DELETE,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Unauthorized'
        })
      };
    }

    const userId = event.requestContext.authorizer.userId;
    const resumeId = event.pathParameters?.id;

    if (!resumeId) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'DELETE,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Resume ID is required'
        })
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
          'Access-Control-Allow-Methods': 'DELETE,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Resume not found'
        })
      };
    }

    // Disable sharing
    await updateResume(userId, resumeId, {
      isPubliclyShared: false,
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'DELETE,OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        message: 'Sharing disabled successfully'
      })
    };
  } catch (error) {
    console.error('Error disabling sharing:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'DELETE,OPTIONS'
      },
      body: JSON.stringify({
        success: false,
        error: 'Internal server error'
      })
    };
  }
};

export const getSharingAnalytics = async (
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> => {
  try {
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
          error: 'Unauthorized'
        })
      };
    }

    const userId = event.requestContext.authorizer.userId;
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
        })
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
        })
      };
    }

    if (!resume.shareToken || !resume.isPubliclyShared) {
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
          error: 'Resume is not publicly shared'
        })
      };
    }

    // Get analytics
    console.log('[ResumeSharing] Getting analytics for resume:', resumeId, 'shareToken:', resume.shareToken);
    const analytics = await getAnalytics(resume.shareToken);
    console.log('[ResumeSharing] Analytics retrieved successfully');

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
        data: analytics
      })
    };
  } catch (error) {
    console.error('[ResumeSharing] Error getting analytics:', error);
    console.error('[ResumeSharing] Error details:', {
      message: (error as Error).message,
      name: (error as Error).name,
      stack: (error as Error).stack,
    });
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
        message: (error as Error).message || 'Failed to retrieve analytics'
      })
    };
  }
};

/**
 * PUBLIC endpoint - Get recent viewers for a shared resume
 * No authentication required - uses shareToken for authorization
 * Rate limited by IP address
 */
export const getPublicRecentViewers = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,OPTIONS'
  };

  try {
    const shareToken = event.pathParameters?.shareToken;
    const limitParam = event.queryStringParameters?.limit;
    const limit = limitParam ? parseInt(limitParam, 10) : 10;

    // Validate shareToken format
    if (!shareToken || shareToken.length < 8) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Invalid share token'
        })
      };
    }

    // Rate limiting by IP address
    const clientIP = getClientIP(event);
    const rateLimit = await checkRateLimit(clientIP, 'recent-viewers', 60, 60);

    if (!rateLimit.allowed) {
      return {
        statusCode: 429,
        headers: {
          ...headers,
          'Retry-After': String(rateLimit.resetAt - Math.floor(Date.now() / 1000)),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rateLimit.resetAt)
        },
        body: JSON.stringify({
          success: false,
          error: 'Too many requests. Please try again later.'
        })
      };
    }

    // Validate shareToken exists and resume is publicly shared
    const resume = await getResumeByShareToken(shareToken);

    if (!resume) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Share link not found or has been disabled'
        })
      };
    }

    // Get recent viewers (anonymized)
    const viewers = await getRecentViewers(shareToken, Math.min(limit, 50));

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'X-RateLimit-Remaining': String(rateLimit.remaining),
        'X-RateLimit-Reset': String(rateLimit.resetAt),
        'Cache-Control': 'private, max-age=60' // Cache for 1 minute
      },
      body: JSON.stringify({
        success: true,
        data: viewers
      })
    };
  } catch (error) {
    console.error('[ResumeSharing] Error getting recent viewers:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Internal server error'
      })
    };
  }
};

