"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhanceTextWithAIOptions = exports.enhanceTextWithAI = void 0;
const aiService_1 = require("../services/aiService");
const rateLimiter_1 = require("../middleware/rateLimiter");
const dynamodb_1 = require("../services/dynamodb");
const resumeService_1 = require("../services/resumeService");
const enhanceTextWithAI = async (event) => {
    try {
        // Verificar autenticación
        if (!event.requestContext?.authorizer) {
            return {
                statusCode: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Unauthorized',
                    message: 'Authentication required'
                })
            };
        }
        const userId = event.requestContext.authorizer.userId;
        // Check user premium status and free resume usage
        const user = await (0, dynamodb_1.getUserById)(userId);
        if (!user) {
            return {
                statusCode: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'User not found',
                    message: 'User account not found'
                })
            };
        }
        // Premium check: AI suggestions are only available for premium users or free users who haven't used their quota
        if (!user.isPremium && user.freeResumeUsed) {
            return {
                statusCode: 403,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Premium feature required',
                    message: 'AI suggestions are only available for premium users or free users who haven\'t used their free resume quota.',
                    code: 'PREMIUM_REQUIRED'
                })
            };
        }
        // Rate limiting: 3 requests/minute for free users, 10 requests/minute for premium users
        const maxRequests = user.isPremium ? 10 : 3;
        const rateLimitResult = await (0, rateLimiter_1.checkRateLimit)(userId, 'ai-enhance', maxRequests, 60000);
        if (!rateLimitResult.allowed) {
            return {
                statusCode: 429,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Rate limit exceeded',
                    message: user.isPremium
                        ? 'You have reached the limit of 10 AI enhancement requests per minute. Please wait a moment before trying again.'
                        : 'You have reached the limit of 3 AI enhancement requests per minute. Please wait a moment before trying again, or upgrade to Premium for 10 requests per minute.',
                    resetTime: rateLimitResult.resetTime,
                    code: 'RATE_LIMIT_EXCEEDED'
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
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Request body is required',
                    message: 'Please provide context, text, and language'
                })
            };
        }
        let requestData;
        try {
            requestData = JSON.parse(event.body);
        }
        catch (error) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Invalid JSON in request body',
                    message: 'Please provide valid JSON data'
                })
            };
        }
        // Validate required fields
        if (!requestData.context) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Context is required',
                    message: 'Please provide a context (achievement, summary, project, or responsibility)'
                })
            };
        }
        if (!requestData.text || requestData.text.trim() === '') {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Text is required',
                    message: 'Please provide text to enhance'
                })
            };
        }
        // Validate context parameter
        const validContexts = ['achievement', 'summary', 'project', 'responsibility'];
        if (!validContexts.includes(requestData.context)) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Invalid context parameter',
                    message: `Context must be one of: ${validContexts.join(', ')}`
                })
            };
        }
        // Validate language parameter
        const language = requestData.language || 'es';
        if (!['es', 'en'].includes(language)) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Invalid language parameter',
                    message: 'Language must be "es" or "en"'
                })
            };
        }
        // Validate resume ownership if resumeId is provided (for AI cost tracking)
        if (requestData.resumeId) {
            const isOwner = await (0, resumeService_1.verifyResumeOwnership)(userId, requestData.resumeId);
            if (!isOwner) {
                return {
                    statusCode: 403,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                        'Access-Control-Allow-Methods': 'POST,OPTIONS',
                    },
                    body: JSON.stringify({
                        success: false,
                        error: 'Access denied',
                        message: 'Resume not found or access denied'
                    })
                };
            }
        }
        // Extract requestContext to pass to AI service (contains userId from JWT token)
        const requestContext = {
            authorizer: event.requestContext.authorizer
        };
        // Enhance text using AI
        const enhancedText = await aiService_1.aiService.enhanceText(requestData.context, requestData.text.trim(), language, requestContext, requestData.jobTitle, requestData.resumeId);
        const response = {
            success: true,
            data: enhancedText,
            message: `Text enhanced successfully for context: ${requestData.context}`,
            remainingRequests: rateLimitResult.remaining,
            resetTime: rateLimitResult.resetTime
        };
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'POST,OPTIONS',
            },
            body: JSON.stringify(response)
        };
    }
    catch (error) {
        console.error('Error in enhanceTextWithAI handler:', error);
        // Refund rate limit on server error - user shouldn't be penalized
        const userId = event.requestContext.authorizer?.userId;
        if (userId) {
            await (0, rateLimiter_1.refundRateLimit)(userId, 'ai-enhance');
        }
        const errorResponse = {
            success: false,
            error: 'Internal server error',
            message: 'Failed to enhance text with AI'
        };
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'POST,OPTIONS',
            },
            body: JSON.stringify(errorResponse)
        };
    }
};
exports.enhanceTextWithAI = enhanceTextWithAI;
// Handler para OPTIONS (CORS preflight)
const enhanceTextWithAIOptions = async () => {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: ''
    };
};
exports.enhanceTextWithAIOptions = enhanceTextWithAIOptions;
//# sourceMappingURL=aiEnhance.js.map