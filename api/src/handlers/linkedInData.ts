import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { LinkedInDataRequest, LinkedInDataResponse, ResumeData } from '../types';
import { aiService } from '../services/aiService';
import { createResume } from '../services/resumeService';
import { sanitizeUserInput, validateInput, sanitizeUserMultiline, validateInputLarge } from '../utils/inputSanitizer';
import { checkRateLimit } from '../middleware/rateLimiter';
import { getUserById } from '../services/dynamodb';
import { formatProfession } from '../utils/textFormatting';
import { checkPremiumStatus } from '../utils/premiumValidator';

export const parseLinkedInData = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log('LinkedIn data parsing request received');

    // Verificar autenticación
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
          error: 'Unauthorized',
          message: 'Authentication required'
        } as LinkedInDataResponse)
      };
    }

    const userId = event.requestContext.authorizer.userId;

    // Check if user is premium
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
          error: 'User not found',
          message: 'User account not found'
        } as LinkedInDataResponse)
      };
    }

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
          error: premiumStatus.isExpired ? 'Premium subscription expired' : 'Premium subscription required',
          message: premiumStatus.isExpired 
            ? 'Your premium subscription has expired. Please renew to continue using this feature.'
            : 'LinkedIn import is a premium feature. Please upgrade to access this functionality.'
        } as LinkedInDataResponse)
      };
    }

    // Rate limiting: 1 request/minute for free users, 5 requests/minute for premium users
    const maxRequests = user.isPremium ? 5 : 1;
    const rateLimitResult = await checkRateLimit(userId, 'linkedin-data-parsing', maxRequests, 60000);
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
          message: `Too many LinkedIn data parsing requests. Please wait before trying again. (Limit: ${maxRequests} per minute)`,
          resetTime: rateLimitResult.resetTime
        } as LinkedInDataResponse)
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

    const requestBody: LinkedInDataRequest = JSON.parse(event.body);
    const { profession, about, experience, education, certifications, projects, skills, recommendations, targetLanguage } = requestBody;

    // Log profession received from frontend
    console.log('🔧 LinkedIn import - Profession received:', profession);
    console.log('🔧 LinkedIn import - Profession type:', typeof profession);
    console.log('🔧 LinkedIn import - Profession length:', profession?.length || 0);

    // Validate required fields
    if (!about || !experience || !education) {
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
          error: 'Required fields are missing. About, experience, and education are required.'
        })
      };
    }

    // Sanitize and validate inputs
    const sanitizedProfession = profession ? sanitizeUserInput(profession) : '';
    console.log('🔧 LinkedIn import - Profession after sanitization:', sanitizedProfession);
    console.log('🔧 LinkedIn import - Profession after sanitization length:', sanitizedProfession?.length || 0);
    
    const sanitizedData: LinkedInDataRequest = {
      profession: sanitizedProfession,
      about: sanitizeUserMultiline(about),
      experience: sanitizeUserMultiline(experience),
      education: sanitizeUserMultiline(education),
      certifications: certifications ? sanitizeUserMultiline(certifications) : undefined,
      projects: projects ? sanitizeUserMultiline(projects) : undefined,
      skills: skills ? sanitizeUserMultiline(skills) : undefined,
      recommendations: recommendations ? sanitizeUserMultiline(recommendations) : undefined,
      targetLanguage: (targetLanguage === 'es' || targetLanguage === 'en') ? targetLanguage : undefined
    };

    // Validate input lengths
    const validation = validateInputLarge(sanitizedData.about);
    if (!validation.isValid) {
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
          error: `Invalid input: ${validation.reason}`
        })
      };
    }

    // Process LinkedIn data with AI
    console.log('Processing LinkedIn data with AI...');
    console.log('🔧 LinkedIn import - Profession in sanitizedData:', sanitizedData.profession);
    
    // Extract requestContext to pass to AI service (contains userId from JWT token)
    const requestContext = {
      authorizer: event.requestContext.authorizer as { userId: string }
    };
    
    const processedData = await aiService.parseLinkedInTextToResumeData(sanitizedData, requestContext);

    console.log('LinkedIn data processed successfully');
    console.log('🔧 LinkedIn import - Profession in processedData:', processedData.profession);

    // Format profession field to Title Case
    if (processedData.profession) {
      processedData.profession = formatProfession(processedData.profession);
    }

    // Create resume in database
    console.log('Creating resume in database...');
    const resume = await createResume(userId, processedData as ResumeData, 'LinkedIn Import');
    
    console.log('Resume created successfully with ID:', resume.id);

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
        resumeId: resume.id,
        message: 'Resume created successfully from LinkedIn data',
        remainingRequests: rateLimitResult.remaining,
        resetTime: rateLimitResult.resetTime
      })
    };

  } catch (error) {
    console.error('Error parsing LinkedIn data:', error);
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
        error: 'Failed to parse LinkedIn data. Please try again.'
      })
    };
  }
};
