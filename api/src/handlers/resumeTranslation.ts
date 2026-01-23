import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AuthorizedEvent, ResumeResponse } from '../types';
import { getUserById } from '../services/dynamodb';
import { getResumeById, createResume, updateResumeWithGenerated } from '../services/resumeService';
import { translationService } from '../services/translationService';
import { checkPremiumStatus } from '../utils/premiumValidator';

interface TranslateResumeRequest {
  targetLanguage: string;
  mode?: 'translate' | 'rewrite';
}

const SUPPORTED_LANGUAGES = ['en', 'zh', 'hi', 'es', 'fr', 'ar', 'bn', 'pt', 'ru', 'ja'];

export const translateResume = async (
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Translate Resume request received:', JSON.stringify(event, null, 2));

  try {
    // Verify authorization
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
          error: 'Bad Request: Missing resume ID'
        })
      };
    }

    // Get user to check premium status
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
        })
      };
    }

    // Premium-only feature
    const premiumStatus = checkPremiumStatus(user);
    if (!premiumStatus.isPremium) {
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
          error: premiumStatus.isExpired ? 'Premium subscription expired' : 'Premium feature',
          message: premiumStatus.isExpired 
            ? 'Your premium subscription has expired. Please renew to continue using this feature.'
            : 'Resume translation is a premium feature. Please upgrade to premium to use this feature.'
        })
      };
    }

    // Parse request body
    if (!event.body) {
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
          error: 'Request body is required'
        })
      };
    }

    const requestBody: TranslateResumeRequest = JSON.parse(event.body);
    const mode: 'translate' | 'rewrite' = requestBody.mode ?? 'translate';

    if (mode !== 'translate' && mode !== 'rewrite') {
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
          error: 'Invalid mode',
          message: "Mode must be either 'translate' or 'rewrite'"
        })
      };
    }

    // Validate target language
    if (!requestBody.targetLanguage || !SUPPORTED_LANGUAGES.includes(requestBody.targetLanguage)) {
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
          error: 'Invalid target language',
          message: `Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}`
        })
      };
    }

    // Get original resume
    const originalResume = await getResumeById(userId, resumeId);
    if (!originalResume) {
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

    // Check if resume has generated content
    if (!originalResume.generatedResume) {
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
          error: 'Resume must be generated before translation'
        })
      };
    }

    // Validate same-language rules based on mode
    const sourceLanguage = originalResume.resumeData.language;
    if (mode === 'translate' && sourceLanguage === requestBody.targetLanguage) {
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
          error: 'Resume is already in the target language'
        })
      };
    }

    if (mode === 'rewrite' && sourceLanguage !== requestBody.targetLanguage) {
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
          error: 'Rewrite mode requires targetLanguage to match the current resume language'
        })
      };
    }

    // Translate resume with AI usage tracking
    const { translatedResumeData, translatedGeneratedResume } = await translationService.translateResume(
      originalResume.resumeData,
      originalResume.generatedResume,
      requestBody.targetLanguage,
      {
        userId,
        resumeId: originalResume.id,
        isPremium: user.isPremium
      },
      mode
    );

    // Create new resume with translated content
    const languageNames: Record<string, string> = {
      'en': 'English',
      'zh': 'Chinese',
      'hi': 'Hindi',
      'es': 'Spanish',
      'fr': 'French',
      'ar': 'Arabic',
      'bn': 'Bengali',
      'pt': 'Portuguese',
      'ru': 'Russian',
      'ja': 'Japanese'
    };

    const languageName = languageNames[requestBody.targetLanguage] || requestBody.targetLanguage;
    const translatedTitle =
      mode === 'rewrite'
        ? `${originalResume.title} (Polished)`
        : `${originalResume.title} (${languageName})`;

    const translatedResume = await createResume(
      userId,
      translatedResumeData,
      translatedTitle
    );

    // Update with generated resume
    const finalResume = await updateResumeWithGenerated(
      userId,
      translatedResume.id,
      translatedGeneratedResume
    );

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
        message: 'Resume translated successfully',
        data: finalResume
      } as ResumeResponse)
    };
  } catch (error) {
    console.error('Error translating resume:', error);
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
        error: error instanceof Error ? error.message : 'Internal server error'
      })
    };
  }
};

