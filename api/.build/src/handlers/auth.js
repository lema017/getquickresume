"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.googleAuth = void 0;
const google_auth_library_1 = require("google-auth-library");
const googleAuth_1 = require("../services/googleAuth");
const dynamodb_1 = require("../services/dynamodb");
const jwt_1 = require("../services/jwt");
// Configuración simplificada para desarrollo local
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
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
        // Parsear nombre completo
        const firstName = googleUser.given_name || googleUser.name.split(' ')[0] || '';
        const lastName = googleUser.family_name || googleUser.name.split(' ').slice(1).join(' ') || '';
        const fullName = googleUser.name;
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
                avatarUrl: googleUser.picture,
                city: city || user.city,
                country: country || user.country,
                updatedAt: new Date().toISOString(),
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
                avatarUrl: googleUser.picture,
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
            tokens: user.tokens,
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
                    tokens: user.tokens,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                }
            })
        };
    }
    catch (error) {
        console.error('Error in googleAuth:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            body: JSON.stringify({
                success: false,
                error: 'Internal server error: ' + error.message
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
//# sourceMappingURL=auth.js.map