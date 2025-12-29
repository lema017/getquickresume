"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.linkedinAuth = exports.validateToken = exports.googleAuth = void 0;
const google_auth_library_1 = require("google-auth-library");
const googleAuth_1 = require("../services/googleAuth");
const linkedinAuth_1 = require("../services/linkedinAuth");
const dynamodb_1 = require("../services/dynamodb");
const jwt_1 = require("../services/jwt");
const textFormatting_1 = require("../utils/textFormatting");
// Configuración simplificada para desarrollo local
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
// Helper function to validate URLs
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
};
const googleAuth = async (event) => {
    try {
        console.log('Google Auth function called');
        // Parsear el body de la request
        if (!event.body) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Request body is required'
                })
            };
        }
        const { token } = JSON.parse(event.body);
        if (!token) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Google token is required'
                })
            };
        }
        console.log('Token received:', token.substring(0, 20) + '...');
        // Verificar el token de Google
        const googleUser = await (0, googleAuth_1.verifyGoogleToken)(token);
        // Parsear nombre completo y aplicar formato Title Case
        const rawFirstName = googleUser.given_name || googleUser.name.split(' ')[0] || '';
        const rawLastName = googleUser.family_name || googleUser.name.split(' ').slice(1).join(' ') || '';
        const rawFullName = googleUser.name;
        console.log('[Google Auth] Raw names from Google:', { rawFirstName, rawLastName, rawFullName });
        const firstName = (0, textFormatting_1.formatName)(rawFirstName);
        const lastName = (0, textFormatting_1.formatName)(rawLastName);
        const fullName = (0, textFormatting_1.formatName)(rawFullName);
        console.log('[Google Auth] Formatted names:', { firstName, lastName, fullName });
        // Validar y limpiar avatarUrl
        let avatarUrl = googleUser.picture;
        if (avatarUrl && !isValidUrl(avatarUrl)) {
            console.warn('Invalid avatar URL from Google:', avatarUrl);
            avatarUrl = undefined;
        }
        // Parsear ubicación
        const { city, country } = (0, googleAuth_1.parseLocation)(googleUser.locale);
        // Buscar usuario existente por email
        let user = await (0, dynamodb_1.getUserByEmail)(googleUser.email);
        if (user) {
            // Usuario existe, actualizar información
            const updates = {
                firstName,
                lastName,
                fullName,
                avatarUrl: avatarUrl,
                city: city || user.city,
                country: country || user.country,
                // updatedAt is automatically set by updateUser function
            };
            user = await (0, dynamodb_1.updateUser)(user.id, updates);
        }
        else {
            // Usuario nuevo, crear
            const newUserData = {
                email: googleUser.email,
                firstName,
                lastName,
                fullName,
                avatarUrl: avatarUrl,
                city,
                country,
                provider: 'google',
            };
            user = await (0, dynamodb_1.createUser)(newUserData);
        }
        // Generar JWT
        const jwtToken = (0, jwt_1.generateToken)({
            userId: user.id,
            email: user.email,
            isPremium: user.isPremium,
        });
        console.log('JWT generated successfully for user:', user.email);
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            body: JSON.stringify({
                success: true,
                token: jwtToken,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    fullName: user.fullName,
                    avatarUrl: user.avatarUrl,
                    city: user.city,
                    country: user.country,
                    location: user.location,
                    linkedin: user.linkedin,
                    targetFunction: user.targetFunction,
                    profession: user.profession,
                    provider: user.provider,
                    isPremium: user.isPremium,
                    freeResumeUsed: user.freeResumeUsed,
                    freeDownloadUsed: user.freeDownloadUsed,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                }
            })
        };
    }
    catch (error) {
        console.error('Error in googleAuth:', error);
        // Determinar el tipo de error y el código de estado apropiado
        const errorMessage = error.message;
        let statusCode = 500;
        let errorResponse = 'Internal server error';
        // Si es un error de token de Google, devolver 401
        if (errorMessage.includes('Invalid Google token') ||
            errorMessage.includes('Wrong number of segments') ||
            errorMessage.includes('Token used too early') ||
            errorMessage.includes('Token used too late') ||
            errorMessage.includes('Invalid token signature') ||
            errorMessage.includes('Token expired')) {
            statusCode = 401;
            errorResponse = 'Invalid or expired Google token';
        }
        return {
            statusCode,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            body: JSON.stringify({
                success: false,
                error: errorResponse
            })
        };
    }
};
exports.googleAuth = googleAuth;
const validateToken = async (event) => {
    try {
        const authHeader = event.headers.Authorization || event.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return {
                statusCode: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
                    'Access-Control-Allow-Methods': 'GET,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Authorization header required'
                })
            };
        }
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        // Verificar el token (esto debería usar el servicio JWT, pero por simplicidad lo validamos aquí)
        // En producción, deberías verificar el token y obtener el usuario de la base de datos
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
                'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            body: JSON.stringify({
                success: true,
                message: 'Token is valid'
            })
        };
    }
    catch (error) {
        console.error('Error in validateToken:', error);
        return {
            statusCode: 401,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
                'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            body: JSON.stringify({
                success: false,
                error: 'Invalid token'
            })
        };
    }
};
exports.validateToken = validateToken;
const linkedinAuth = async (event) => {
    try {
        console.log('LinkedIn Auth function called');
        console.log('Event body:', event.body);
        // Parsear el body de la request
        if (!event.body) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Request body is required'
                })
            };
        }
        const { code } = JSON.parse(event.body);
        console.log('Parsed code:', code ? code.substring(0, 20) + '...' : 'undefined');
        if (!code) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'LinkedIn authorization code is required'
                })
            };
        }
        console.log('LinkedIn authorization code received:', code.substring(0, 20) + '...');
        try {
            // Exchange authorization code for access token
            console.log('Exchanging code for access token...');
            const accessToken = await (0, linkedinAuth_1.exchangeCodeForToken)(code);
            console.log('Access token received:', accessToken.substring(0, 20) + '...');
            // Verify the access token and get user profile
            console.log('Calling verifyLinkedInToken...');
            const linkedinProfile = await (0, linkedinAuth_1.verifyLinkedInToken)(accessToken);
            console.log('LinkedIn profile received:', JSON.stringify(linkedinProfile, null, 2));
            // Parsear datos del perfil de LinkedIn usando la nueva función
            const parsedProfile = (0, linkedinAuth_1.parseLinkedInProfile)(linkedinProfile);
            console.log('[LinkedIn Auth] Raw names from LinkedIn:', {
                firstName: parsedProfile.firstName,
                lastName: parsedProfile.lastName,
                fullName: parsedProfile.fullName
            });
            // Aplicar formato Title Case a los nombres
            const email = parsedProfile.email;
            const firstName = (0, textFormatting_1.formatName)(parsedProfile.firstName);
            const lastName = (0, textFormatting_1.formatName)(parsedProfile.lastName);
            const fullName = (0, textFormatting_1.formatName)(parsedProfile.fullName);
            const avatarUrl = parsedProfile.avatarUrl;
            const city = parsedProfile.city;
            const country = parsedProfile.country;
            const linkedinUrl = parsedProfile.linkedinUrl;
            console.log('[LinkedIn Auth] Formatted names:', { firstName, lastName, fullName });
            // Buscar usuario existente por email
            if (!email) {
                throw new Error('LinkedIn profile does not include email address');
            }
            let user = await (0, dynamodb_1.getUserByEmail)(email);
            if (user) {
                // Usuario existe, actualizar información
                const updates = {
                    firstName,
                    lastName,
                    fullName,
                    avatarUrl: avatarUrl,
                    city: city || user.city,
                    country: country || user.country,
                    linkedin: linkedinUrl || user.linkedin,
                    // updatedAt is automatically set by updateUser function
                };
                user = await (0, dynamodb_1.updateUser)(user.id, updates);
            }
            else {
                // Usuario nuevo, crear
                const newUserData = {
                    email: email,
                    firstName,
                    lastName,
                    fullName,
                    avatarUrl: avatarUrl,
                    city,
                    country,
                    linkedin: linkedinUrl,
                    provider: 'linkedin',
                };
                user = await (0, dynamodb_1.createUser)(newUserData);
            }
            // Generar JWT
            const jwtToken = (0, jwt_1.generateToken)({
                userId: user.id,
                email: user.email,
                isPremium: user.isPremium,
            });
            console.log('JWT generated successfully for LinkedIn user:', user.email);
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: true,
                    token: jwtToken,
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        fullName: user.fullName,
                        avatarUrl: user.avatarUrl,
                        city: user.city,
                        country: user.country,
                        location: user.location,
                        linkedin: user.linkedin,
                        targetFunction: user.targetFunction,
                        profession: user.profession,
                        provider: user.provider,
                        isPremium: user.isPremium,
                        freeResumeUsed: user.freeResumeUsed,
                        freeDownloadUsed: user.freeDownloadUsed,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                    }
                })
            };
        }
        catch (error) {
            console.error('Error in LinkedIn authentication:', error);
            throw error; // Re-throw to be caught by outer catch
        }
    }
    catch (error) {
        console.error('Error in linkedinAuth:', error);
        // Determinar el tipo de error y el código de estado apropiado
        const errorMessage = error.message;
        let statusCode = 500;
        let errorResponse = 'Internal server error';
        // Si es un error de token de LinkedIn, devolver 401
        if (errorMessage.includes('Invalid or expired LinkedIn token') ||
            errorMessage.includes('LinkedIn profile does not include email address') ||
            errorMessage.includes('LinkedIn API error')) {
            statusCode = 401;
            errorResponse = errorMessage; // Return specific LinkedIn error message
        }
        else if (errorMessage.includes('Request body is required') ||
            errorMessage.includes('LinkedIn authorization code is required')) {
            statusCode = 400;
            errorResponse = errorMessage;
        }
        return {
            statusCode,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            body: JSON.stringify({
                success: false,
                error: errorResponse
            })
        };
    }
};
exports.linkedinAuth = linkedinAuth;
const getMe = async (event) => {
    try {
        // Verify authorization context
        if (!event.requestContext?.authorizer) {
            return {
                statusCode: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
                    'Access-Control-Allow-Methods': 'GET,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Unauthorized: Missing authorization context'
                })
            };
        }
        const userId = event.requestContext.authorizer.userId;
        // Fetch fresh user data from database
        const user = await (0, dynamodb_1.getUserById)(userId);
        if (!user) {
            return {
                statusCode: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
                    'Access-Control-Allow-Methods': 'GET,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'User not found'
                })
            };
        }
        // Format names to Title Case (safety measure for existing users with lowercase names)
        const formattedFirstName = (0, textFormatting_1.formatName)(user.firstName || '');
        const formattedLastName = (0, textFormatting_1.formatName)(user.lastName || '');
        const formattedFullName = (0, textFormatting_1.formatName)(user.fullName || '');
        // Return user data (excluding sensitive fields if needed)
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
                'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            body: JSON.stringify({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: formattedFirstName,
                    lastName: formattedLastName,
                    fullName: formattedFullName,
                    avatarUrl: user.avatarUrl,
                    city: user.city,
                    country: user.country,
                    location: user.location,
                    linkedin: user.linkedin,
                    targetFunction: user.targetFunction,
                    profession: user.profession,
                    provider: user.provider,
                    isPremium: user.isPremium,
                    freeResumeUsed: user.freeResumeUsed,
                    freeDownloadUsed: user.freeDownloadUsed,
                    subscriptionExpiration: user.subscriptionExpiration,
                    planType: user.planType,
                    subscriptionStartDate: user.subscriptionStartDate,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                }
            })
        };
    }
    catch (error) {
        console.error('Error in getMe:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
                'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            body: JSON.stringify({
                success: false,
                error: 'Internal server error'
            })
        };
    }
};
exports.getMe = getMe;
//# sourceMappingURL=auth.js.map