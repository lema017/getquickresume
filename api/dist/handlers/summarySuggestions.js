"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSuggestionsOptions = exports.generateSuggestions = void 0;
const aiService_1 = require("../services/aiService");
const rateLimiter_1 = require("../middleware/rateLimiter");
const dynamodb_1 = require("../services/dynamodb");
const resumeService_1 = require("../services/resumeService");
const generateSuggestions = async (event) => {
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
        // Rate limiting: 1 request/minute for free users, 10 requests/minute for premium users
        const maxRequests = user.isPremium ? 10 : 1;
        const rateLimitResult = await (0, rateLimiter_1.checkRateLimit)(userId, 'summary-suggestions', maxRequests, 60000);
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
                    message: 'Too many summary suggestion requests. Please wait before trying again.',
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
                    message: 'Please provide profession, achievements, projects, and type data'
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
        if (!requestData.profession) {
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
                    error: 'Profession is required',
                    message: 'Please provide a profession'
                })
            };
        }
        if (!requestData.achievements || !Array.isArray(requestData.achievements)) {
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
                    error: 'Achievements array is required',
                    message: 'Please provide an array of achievements'
                })
            };
        }
        if (!requestData.projectDescriptions || !Array.isArray(requestData.projectDescriptions)) {
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
                    error: 'Project descriptions array is required',
                    message: 'Please provide an array of project descriptions'
                })
            };
        }
        if (!requestData.type || !['experience', 'differentiators'].includes(requestData.type)) {
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
                    error: 'Invalid type parameter',
                    message: 'Type must be "experience" or "differentiators"'
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
        // Cast to match the expected type structure
        const requestContext = {
            authorizer: event.requestContext.authorizer
        };
        // Generate summary suggestions using AI
        const suggestions = await aiService_1.aiService.generateSummarySuggestions(requestData.profession, requestData.achievements, requestData.projectDescriptions, language, requestData.type, requestContext, requestData.resumeId);
        const response = {
            success: true,
            data: suggestions,
            message: `Generated ${suggestions.length} ${requestData.type} suggestions for ${requestData.profession}`,
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
        console.error('Error in generateSuggestions handler:', error);
        // Refund rate limit on server error - user shouldn't be penalized
        const userId = event.requestContext.authorizer?.userId;
        if (userId) {
            await (0, rateLimiter_1.refundRateLimit)(userId, 'summary-suggestions');
        }
        const errorResponse = {
            success: false,
            error: 'Internal server error',
            message: 'Failed to generate summary suggestions'
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
exports.generateSuggestions = generateSuggestions;
// Handler para OPTIONS (CORS preflight)
const generateSuggestionsOptions = async () => {
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
exports.generateSuggestionsOptions = generateSuggestionsOptions;
//# sourceMappingURL=summarySuggestions.js.map