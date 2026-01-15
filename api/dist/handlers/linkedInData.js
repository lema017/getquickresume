"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLinkedInData = void 0;
const aiService_1 = require("../services/aiService");
const resumeService_1 = require("../services/resumeService");
const inputSanitizer_1 = require("../utils/inputSanitizer");
const rateLimiter_1 = require("../middleware/rateLimiter");
const dynamodb_1 = require("../services/dynamodb");
const textFormatting_1 = require("../utils/textFormatting");
const premiumValidator_1 = require("../utils/premiumValidator");
const parseLinkedInData = async (event) => {
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
                })
            };
        }
        const userId = event.requestContext.authorizer.userId;
        // Check if user is premium
        const user = await (0, dynamodb_1.getUserById)(userId);
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
                })
            };
        }
        const premiumStatus = (0, premiumValidator_1.checkPremiumStatus)(user);
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
                })
            };
        }
        // Rate limiting: 1 request/minute for free users, 5 requests/minute for premium users
        const maxRequests = user.isPremium ? 5 : 1;
        const rateLimitResult = await (0, rateLimiter_1.checkRateLimit)(userId, 'linkedin-data-parsing', maxRequests, 60000);
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
        const requestBody = JSON.parse(event.body);
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
        const sanitizedProfession = profession ? (0, inputSanitizer_1.sanitizeUserInput)(profession) : '';
        console.log('🔧 LinkedIn import - Profession after sanitization:', sanitizedProfession);
        console.log('🔧 LinkedIn import - Profession after sanitization length:', sanitizedProfession?.length || 0);
        const sanitizedData = {
            profession: sanitizedProfession,
            about: (0, inputSanitizer_1.sanitizeUserMultiline)(about),
            experience: (0, inputSanitizer_1.sanitizeUserMultiline)(experience),
            education: (0, inputSanitizer_1.sanitizeUserMultiline)(education),
            certifications: certifications ? (0, inputSanitizer_1.sanitizeUserMultiline)(certifications) : undefined,
            projects: projects ? (0, inputSanitizer_1.sanitizeUserMultiline)(projects) : undefined,
            skills: skills ? (0, inputSanitizer_1.sanitizeUserMultiline)(skills) : undefined,
            recommendations: recommendations ? (0, inputSanitizer_1.sanitizeUserMultiline)(recommendations) : undefined,
            targetLanguage: (targetLanguage === 'es' || targetLanguage === 'en') ? targetLanguage : undefined
        };
        // Validate input lengths
        const validation = (0, inputSanitizer_1.validateInputLarge)(sanitizedData.about);
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
            authorizer: event.requestContext.authorizer
        };
        const processedData = await aiService_1.aiService.parseLinkedInTextToResumeData(sanitizedData, requestContext);
        console.log('LinkedIn data processed successfully');
        console.log('🔧 LinkedIn import - Profession in processedData:', processedData.profession);
        // Format profession field to Title Case
        if (processedData.profession) {
            processedData.profession = (0, textFormatting_1.formatProfession)(processedData.profession);
        }
        // Create resume in database
        console.log('Creating resume in database...');
        const resume = await (0, resumeService_1.createResume)(userId, processedData, 'LinkedIn Import');
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
    }
    catch (error) {
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
exports.parseLinkedInData = parseLinkedInData;
//# sourceMappingURL=linkedInData.js.map