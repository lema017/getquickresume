"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullProfileData = exports.parseLinkedInProfile = exports.verifyLinkedInToken = exports.exchangeCodeForToken = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:3000/login';
if (!LINKEDIN_CLIENT_ID || !LINKEDIN_CLIENT_SECRET) {
    throw new Error('LinkedIn credentials not configured. Please set LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET environment variables.');
}
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
    let countryCode;
    // Handle both string format ("en_US") and object format ({country: "ES", language: "es"})
    if (typeof locale === 'string') {
        // LinkedIn locale format is usually like "en_US" or "es_MX"
        const parts = locale.split('_');
        if (parts.length >= 2) {
            countryCode = parts[1];
        }
    }
    else if (typeof locale === 'object' && locale.country) {
        // Handle object format from LinkedIn OpenID Connect
        countryCode = locale.country;
    }
    if (countryCode) {
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
 * Exchange LinkedIn authorization code for access token
 * @param code - Authorization code from LinkedIn
 * @returns LinkedIn access token
 */
const exchangeCodeForToken = async (code) => {
    try {
        console.log('Exchanging LinkedIn authorization code for access token...');
        const response = await (0, node_fetch_1.default)('https://www.linkedin.com/oauth/v2/accessToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: LINKEDIN_REDIRECT_URI,
                client_id: LINKEDIN_CLIENT_ID,
                client_secret: LINKEDIN_CLIENT_SECRET,
            }),
        });
        console.log('LinkedIn token exchange response status:', response.status);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`LinkedIn token exchange failed: ${errorData.error_description || errorData.error}`);
        }
        const data = await response.json();
        console.log('LinkedIn access token received successfully');
        return data.access_token;
    }
    catch (error) {
        console.error('Error exchanging LinkedIn code for token:', error);
        throw new Error('Failed to exchange LinkedIn authorization code for access token');
    }
};
exports.exchangeCodeForToken = exchangeCodeForToken;
/**
 * Verify LinkedIn access token and get user profile
 * @param accessToken - LinkedIn access token
 * @returns LinkedIn user profile
 */
const verifyLinkedInToken = async (accessToken) => {
    try {
        console.log('Verifying LinkedIn access token...');
        // Get user info from LinkedIn using the access token
        const userInfoResponse = await (0, node_fetch_1.default)('https://api.linkedin.com/v2/userinfo', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        console.log('LinkedIn userinfo response status:', userInfoResponse.status);
        if (!userInfoResponse.ok) {
            throw new Error(`LinkedIn API error: ${userInfoResponse.status} ${userInfoResponse.statusText}`);
        }
        const userInfo = await userInfoResponse.json();
        console.log('LinkedIn userinfo response:', JSON.stringify(userInfo, null, 2));
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
        // Note: LinkedIn OpenID Connect does not provide public profile URL directly
        // The user will need to enter their LinkedIn profile URL manually in the wizard
        const linkedinUrl = undefined;
        return {
            id: userInfo.sub || '',
            firstName,
            lastName,
            fullName,
            emailAddress,
            avatarUrl,
            city,
            country,
            linkedinUrl,
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
        linkedinUrl: linkedinProfile.linkedinUrl,
    };
};
exports.parseLinkedInProfile = parseLinkedInProfile;
/**
 * Get full LinkedIn profile data including experience, education, and skills
 * Note: This requires additional LinkedIn API permissions and may not be available
 * with the current OAuth scope. This is a placeholder for future implementation.
 */
const getFullProfileData = async (accessToken) => {
    try {
        console.log('Getting full LinkedIn profile data...');
        // TODO: Implement full LinkedIn profile data extraction
        // This would require additional LinkedIn API endpoints and permissions:
        // - /v2/people/{id} for basic profile info
        // - /v2/people/{id}/positions for work experience
        // - /v2/people/{id}/educations for education
        // - /v2/people/{id}/skills for skills
        // 
        // Note: These endpoints may require special LinkedIn partner access
        // and additional OAuth scopes beyond the current 'openid profile email'
        // For now, return mock data based on the basic profile info
        const mockData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '+1234567890',
            linkedin: 'https://linkedin.com/in/johndoe',
            country: 'United States',
            summary: 'Experienced software engineer with 5+ years of experience in full-stack development.',
            experience: [
                {
                    id: 'exp-auth-1',
                    title: 'Senior Software Engineer',
                    company: 'Tech Corp',
                    startDate: '2020-01',
                    endDate: '2024-01',
                    isCurrent: false,
                    responsibilities: ['Led development team', 'Architected scalable solutions'],
                    achievements: ['Increased performance by 40%', 'Mentored 3 junior developers'],
                    pageNumber: null
                }
            ],
            education: [
                {
                    id: 'edu-auth-1',
                    degree: 'Bachelor of Science',
                    field: 'Computer Science',
                    institution: 'University of Technology',
                    startDate: '2016-09',
                    endDate: '2020-06',
                    isCompleted: true,
                    pageNumber: null
                }
            ],
            skillsRaw: ['JavaScript', 'React', 'Node.js', 'Python', 'VS Code', 'Git', 'Docker', 'AWS']
        };
        return mockData;
    }
    catch (error) {
        console.error('Error getting full LinkedIn profile data:', error);
        throw new Error('Failed to get full LinkedIn profile data');
    }
};
exports.getFullProfileData = getFullProfileData;
//# sourceMappingURL=linkedinAuth.js.map