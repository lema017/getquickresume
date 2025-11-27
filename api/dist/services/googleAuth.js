"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLocation = exports.verifyGoogleToken = void 0;
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const verifyGoogleToken = async (token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) {
            throw new Error('Invalid Google token');
        }
        return {
            email: payload.email || '',
            name: payload.name || '',
            picture: payload.picture || undefined, // Ensure it's undefined if not present
            given_name: payload.given_name,
            family_name: payload.family_name,
            locale: payload.locale,
        };
    }
    catch (error) {
        console.error('Error verifying Google token:', error);
        throw new Error('Invalid Google token');
    }
};
exports.verifyGoogleToken = verifyGoogleToken;
const parseLocation = (locale) => {
    if (!locale)
        return { city: '', country: '' };
    // Mapeo básico de locales a países
    const localeToCountry = {
        'es': 'España',
        'es-MX': 'México',
        'es-AR': 'Argentina',
        'es-CO': 'Colombia',
        'es-CL': 'Chile',
        'es-PE': 'Perú',
        'es-VE': 'Venezuela',
        'es-CR': 'Costa Rica',
        'en': 'Estados Unidos',
        'en-US': 'Estados Unidos',
        'en-CA': 'Canadá',
        'en-GB': 'Reino Unido',
        'en-AU': 'Australia',
        'pt': 'Brasil',
        'pt-BR': 'Brasil',
        'fr': 'Francia',
        'de': 'Alemania',
        'it': 'Italia',
    };
    const country = localeToCountry[locale] || '';
    const city = ''; // Google no proporciona ciudad por defecto
    return { city, country };
};
exports.parseLocation = parseLocation;
//# sourceMappingURL=googleAuth.js.map