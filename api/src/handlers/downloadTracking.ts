import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { trackDownload } from '../services/downloadService';
import { AuthorizedEvent } from '../types';

/**
 * Handler to track resume downloads and enforce download limits
 * Protected by authorizer - requires authentication
 * 
 * POST /api/resumes/{id}/download/track
 */
export const trackResumeDownload = async (
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // Get user ID from authorizer context
    const userId = event.requestContext.authorizer?.userId;
    if (!userId) {
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: 'Unauthorized',
          message: 'User ID not found in request context',
        }),
      };
    }

    // Get resume ID from path parameters
    const resumeId = event.pathParameters?.id;
    if (!resumeId || typeof resumeId !== 'string' || resumeId.trim() === '') {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: 'Bad Request',
          message: 'Resume ID is required and must be a non-empty string',
        }),
      };
    }

    // Track the download
    const result = await trackDownload(userId, resumeId);

    // Return response based on whether download is allowed
    if (result.allowed) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: true,
          data: {
            allowed: result.allowed,
            freeDownloadUsed: result.freeDownloadUsed,
            totalDownloads: result.totalDownloads,
          },
          message: 'Download tracked successfully',
        }),
      };
    } else {
      // Download limit reached for free user
      return {
        statusCode: 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: 'Download Limit Reached',
          message: result.message || 'You have used your free download. Upgrade to Premium for unlimited downloads.',
          data: {
            allowed: false,
            freeDownloadUsed: result.freeDownloadUsed,
            totalDownloads: result.totalDownloads,
          },
        }),
      };
    }
  } catch (error) {
    console.error('Error tracking resume download:', error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return {
          statusCode: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            success: false,
            error: 'Not Found',
            message: error.message,
          }),
        };
      }

      if (error.message.includes('required')) {
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            success: false,
            error: 'Bad Request',
            message: error.message,
          }),
        };
      }
    }

    // Generic server error
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        error: 'Internal Server Error',
        message: 'An error occurred while tracking the download',
      }),
    };
  }
};

