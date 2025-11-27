"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduceUserTokens = exports.getUserTokens = void 0;
const dynamodb_1 = require("../services/dynamodb");
const getUserTokens = async (event) => {
    try {
        console.log('getUserTokens called with event:', JSON.stringify(event, null, 2));
        // Extract userId from authorizer context
        const userId = event.requestContext.authorizer?.userId;
        if (!userId) {
            console.error('No userId found in authorizer context');
            return {
                statusCode: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'GET,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Unauthorized: No user context found'
                })
            };
        }
        console.log('Fetching tokens for user:', userId);
        // Get user from database
        const user = await (0, dynamodb_1.getUserById)(userId);
        if (!user) {
            console.error('User not found:', userId);
            return {
                statusCode: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'GET,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'User not found'
                })
            };
        }
        console.log('User found, tokens:', user.tokens);
        // Return only the tokens field
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            body: JSON.stringify({
                success: true,
                tokens: user.tokens
            })
        };
    }
    catch (error) {
        console.error('Error in getUserTokens:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            body: JSON.stringify({
                success: false,
                error: 'Internal server error'
            })
        };
    }
};
exports.getUserTokens = getUserTokens;
const reduceUserTokens = async (event) => {
    try {
        console.log('reduceUserTokens called with event:', JSON.stringify(event, null, 2));
        // Extract userId from authorizer context
        const userId = event.requestContext.authorizer?.userId;
        if (!userId) {
            console.error('No userId found in authorizer context');
            return {
                statusCode: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Unauthorized: No user context found'
                })
            };
        }
        // Parse and validate request body
        let body;
        try {
            body = JSON.parse(event.body || '{}');
        }
        catch (parseError) {
            console.error('Invalid JSON in request body:', parseError);
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Invalid JSON in request body'
                })
            };
        }
        const amount = body.amount;
        // Validate amount exists
        if (amount === undefined || amount === null) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Amount is required'
                })
            };
        }
        // Validate is number
        if (typeof amount !== 'number') {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Amount must be a number'
                })
            };
        }
        // Validate not NaN/Infinity
        if (isNaN(amount) || !isFinite(amount)) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Amount must be a valid number'
                })
            };
        }
        // Validate positive
        if (amount <= 0) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Amount must be positive'
                })
            };
        }
        // Validate integer
        if (!Number.isInteger(amount)) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Amount must be an integer'
                })
            };
        }
        // Validate max limit (10 tokens per request as per plan)
        if (amount > 10) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Amount cannot exceed 10 tokens per request'
                })
            };
        }
        console.log('Validating tokens for user:', userId, 'amount:', amount);
        // Get user from database
        const user = await (0, dynamodb_1.getUserById)(userId);
        if (!user) {
            console.error('User not found:', userId);
            return {
                statusCode: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'User not found'
                })
            };
        }
        // Check if user has sufficient tokens
        if (user.tokens < amount) {
            console.error('Insufficient tokens:', user.tokens, 'requested:', amount);
            return {
                statusCode: 409,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: `Insufficient tokens. You have ${user.tokens} token(s) but tried to reduce by ${amount}`
                })
            };
        }
        // Calculate new token count
        const newTokenCount = user.tokens - amount;
        console.log('Updating tokens for user:', userId, 'from', user.tokens, 'to', newTokenCount);
        // Update user tokens
        const updatedUser = await (0, dynamodb_1.updateUserTokens)(userId, newTokenCount);
        console.log('Tokens updated successfully for user:', userId);
        // Return success response
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            body: JSON.stringify({
                success: true,
                message: 'Tokens reduced successfully',
                tokensRemaining: updatedUser.tokens,
                tokensReduced: amount
            })
        };
    }
    catch (error) {
        console.error('Error in reduceUserTokens:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            body: JSON.stringify({
                success: false,
                error: 'Internal server error'
            })
        };
    }
};
exports.reduceUserTokens = reduceUserTokens;
//# sourceMappingURL=user.js.map