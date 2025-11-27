"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLinkedInProfile = exports.verifyLinkedInToken = exports.verifyLinkedInAuthorizationCode = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID || '78gy4pl3ps34f0';
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET || 'WPL_AP1.YagQpPXuPPyKLZlv.UgHpfg==';
// LinkedIn OAuth configuration
const linkedinIssuer = {
    issuer: 'https://www.linkedin.com',
    authorization_endpoint: 'https://www.linkedin.com/oauth/v2/authorization',
    token_endpoint: 'https://www.linkedin.com/oauth/v2/accessToken',
    userinfo_endpoint: 'https://api.linkedin.com/v2/userinfo',
};
// Helper to validate URL
const isValidUrl = (url) => {
    if (!url)
        return false;
    try {
        new URL(url);
        return true;
    }
    catch (e) {
        return false;
    }
};
// Helper function to parse location from LinkedIn locale
const parseLocation = (locale) => {
    if (!locale)
        return {};
    // LinkedIn locale format is usually like "en_US" or "es_MX"
    const parts = locale.split('_');
    if (parts.length >= 2) {
        const countryCode = parts[1];
        const countryMap = {
            'US': 'United States',
            'MX': 'Mexico',
            'ES': 'Spain',
            'AR': 'Argentina',
            'CO': 'Colombia',
            'PE': 'Peru',
            'CL': 'Chile',
            'BR': 'Brazil',
            'CA': 'Canada',
            'GB': 'United Kingdom',
            'FR': 'France',
            'DE': 'Germany',
            'IT': 'Italy',
            'PT': 'Portugal',
        };
        return {
            country: countryMap[countryCode] || countryCode
        };
    }
    return {};
};
/**
 * Verify LinkedIn authorization code with PKCE
 * @param code - Authorization code from LinkedIn
 * @param codeVerifier - PKCE code verifier
 * @returns LinkedIn user profile
 */
const verifyLinkedInAuthorizationCode = async (code, codeVerifier) => {
    try {
        // Create OAuth client
        const client = {
            client_id: LINKEDIN_CLIENT_ID,
            client_secret: LINKEDIN_CLIENT_SECRET,
        };
        // Exchange authorization code for access token using PKCE
        const parameters = new URLSearchParams();
        parameters.set('code', code);
        parameters.set('code_verifier', codeVerifier);
        parameters.set('redirect_uri', 'http://localhost:3000/login');
        parameters.set('grant_type', 'authorization_code');
        const tokenResponse = await (0, node_fetch_1.default)(linkedinIssuer.token_endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: parameters.toString(),
        });
        if (!tokenResponse.ok) {
            const errorData = await tokenResponse.json();
            throw new Error(`LinkedIn token exchange failed: ${errorData.error_description || errorData.error}`);
        }
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;
        // Get user info from LinkedIn
        const userInfoResponse = await (0, node_fetch_1.default)(linkedinIssuer.userinfo_endpoint, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        if (!userInfoResponse.ok) {
            throw new Error(`LinkedIn API error: ${userInfoResponse.status} ${userInfoResponse.statusText}`);
        }
        const userInfo = await userInfoResponse.json();
        // Parse the OpenID Connect response
        const emailAddress = userInfo.email;
        const firstName = userInfo.given_name || '';
        const lastName = userInfo.family_name || '';
        const fullName = userInfo.name || `${firstName} ${lastName}`.trim();
        const profilePicture = userInfo.picture || '';
        // Validate and clean avatar URL
        let avatarUrl;
        if (profilePicture && isValidUrl(profilePicture)) {
            avatarUrl = profilePicture;
        }
        // Parse location from locale if available
        const locale = userInfo.locale || 'en_US';
        const { city, country } = parseLocation(locale);
        return {
            id: userInfo.sub || '',
            firstName,
            lastName,
            fullName,
            emailAddress,
            avatarUrl,
            city,
            country,
        };
    }
    catch (error) {
        console.error('Error verifying LinkedIn authorization code:', error);
        throw new Error('Invalid or expired LinkedIn authorization code');
    }
};
exports.verifyLinkedInAuthorizationCode = verifyLinkedInAuthorizationCode;
/**
 * Legacy function for backward compatibility
 * @deprecated Use verifyLinkedInAuthorizationCode instead
 */
const verifyLinkedInToken = async (accessToken) => {
    try {
        // Use LinkedIn's OpenID Connect userinfo endpoint
        const userInfoResponse = await (0, node_fetch_1.default)('https://api.linkedin.com/v2/userinfo', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        if (!userInfoResponse.ok) {
            throw new Error(`LinkedIn API error: ${userInfoResponse.status} ${userInfoResponse.statusText}`);
        }
        const userInfo = await userInfoResponse.json();
        // Parse the OpenID Connect response
        const emailAddress = userInfo.email;
        const firstName = userInfo.given_name || '';
        const lastName = userInfo.family_name || '';
        const fullName = userInfo.name || `${firstName} ${lastName}`.trim();
        const profilePicture = userInfo.picture || '';
        // Validate and clean avatar URL
        let avatarUrl;
        if (profilePicture && isValidUrl(profilePicture)) {
            avatarUrl = profilePicture;
        }
        // Parse location from locale if available
        const locale = userInfo.locale || 'en_US';
        const { city, country } = parseLocation(locale);
        return {
            id: userInfo.sub || '',
            firstName,
            lastName,
            fullName,
            emailAddress,
            avatarUrl,
            city,
            country,
        };
    }
    catch (error) {
        console.error('Error verifying LinkedIn token:', error);
        throw new Error('Invalid or expired LinkedIn token');
    }
};
exports.verifyLinkedInToken = verifyLinkedInToken;
/**
 * Parse LinkedIn profile for user creation
 */
const parseLinkedInProfile = (linkedinProfile) => {
    // Extract email - this is required for user creation
    if (!linkedinProfile.emailAddress) {
        throw new Error('LinkedIn profile does not include email address. Please ensure your LinkedIn account has a verified email.');
    }
    return {
        email: linkedinProfile.emailAddress,
        firstName: linkedinProfile.firstName || '',
        lastName: linkedinProfile.lastName || '',
        fullName: linkedinProfile.fullName || `${linkedinProfile.firstName || ''} ${linkedinProfile.lastName || ''}`.trim(),
        avatarUrl: linkedinProfile.avatarUrl,
        city: linkedinProfile.city,
        country: linkedinProfile.country,
    };
};
exports.parseLinkedInProfile = parseLinkedInProfile;
