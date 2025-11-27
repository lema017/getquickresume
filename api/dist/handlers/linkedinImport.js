"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importFromPublicUrl = exports.importFromAuth = void 0;
/**
 * Import LinkedIn profile data using OAuth (for users who logged in with LinkedIn)
 */
const importFromAuth = async (event) => {
    try {
        console.log('LinkedIn import from auth request received');
        // TODO: Re-enable authentication in production
        // For now, allow requests without authentication for testing
        // Mock data for testing
        const mockProfileData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '+1234567890',
            linkedin: 'https://linkedin.com/in/johndoe',
            country: 'United States',
            summary: 'Experienced software engineer with 5+ years of experience in full-stack development.',
            experience: [
                {
                    id: 'exp-oauth-1',
                    title: 'Senior Software Engineer',
                    company: 'Tech Corp',
                    startDate: '2020-01',
                    endDate: '2024-01',
                    isCurrent: false,
                    responsibilities: ['Led development team', 'Architected scalable solutions'],
                    achievements: ['Increased performance by 40%', 'Mentored 3 junior developers']
                }
            ],
            education: [
                {
                    id: 'edu-oauth-1',
                    degree: 'Bachelor of Science',
                    field: 'Computer Science',
                    institution: 'University of Technology',
                    startDate: '2016-09',
                    endDate: '2020-06',
                    isCompleted: true
                }
            ],
            skillsRaw: ['JavaScript', 'React', 'Node.js', 'Python'],
            toolsRaw: ['VS Code', 'Git', 'Docker', 'AWS']
        };
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
                data: mockProfileData
            })
        };
    }
    catch (error) {
        console.error('Error importing LinkedIn profile from OAuth:', error);
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
                error: 'Failed to import LinkedIn profile from OAuth.'
            })
        };
    }
};
exports.importFromAuth = importFromAuth;
/**
 * Import LinkedIn profile data using public URL (for users who logged in with Google)
 */
const importFromPublicUrl = async (event) => {
    try {
        console.log('LinkedIn import from URL request received');
        // TODO: Re-enable authentication in production
        // For now, allow requests without authentication for testing
        // Parsear el cuerpo de la petición
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
        const { url } = requestBody;
        if (!url) {
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
                    error: 'LinkedIn profile URL is required'
                })
            };
        }
        // Validar formato de URL de LinkedIn
        const linkedinUrlPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
        if (!linkedinUrlPattern.test(url)) {
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
                    error: 'Invalid LinkedIn profile URL format'
                })
            };
        }
        // TODO: Implement actual scraping logic here.
        // For now, return mock data
        const mockProfileData = {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            phone: '+1234567890',
            linkedin: url,
            country: 'United States',
            summary: 'Marketing professional with expertise in digital marketing and brand management.',
            experience: [
                {
                    id: 'exp-url-1',
                    title: 'Marketing Manager',
                    company: 'Digital Agency',
                    startDate: '2021-03',
                    endDate: '2024-01',
                    isCurrent: false,
                    responsibilities: ['Managed digital campaigns', 'Led brand strategy'],
                    achievements: ['Increased ROI by 35%', 'Grew social media following by 200%']
                }
            ],
            education: [
                {
                    id: 'edu-url-1',
                    degree: 'Master of Business Administration',
                    field: 'Marketing',
                    institution: 'Business School',
                    startDate: '2019-09',
                    endDate: '2021-06',
                    isCompleted: true
                }
            ],
            skillsRaw: ['Digital Marketing', 'Brand Management', 'Analytics'],
            toolsRaw: ['Google Analytics', 'HubSpot', 'Adobe Creative Suite']
        };
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
                data: mockProfileData
            })
        };
    }
    catch (error) {
        console.error('Error importing LinkedIn profile from public URL:', error);
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
                error: 'Failed to import LinkedIn profile from public URL.'
            })
        };
    }
};
exports.importFromPublicUrl = importFromPublicUrl;
//# sourceMappingURL=linkedinImport.js.map