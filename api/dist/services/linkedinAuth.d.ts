import { ResumeData } from '../types';
export interface LinkedInUserProfile {
    id: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    emailAddress?: string;
    avatarUrl?: string;
    city?: string;
    country?: string;
    linkedinUrl?: string;
}
/**
 * Exchange LinkedIn authorization code for access token
 * @param code - Authorization code from LinkedIn
 * @returns LinkedIn access token
 */
export declare const exchangeCodeForToken: (code: string) => Promise<string>;
/**
 * Verify LinkedIn access token and get user profile
 * @param accessToken - LinkedIn access token
 * @returns LinkedIn user profile
 */
export declare const verifyLinkedInToken: (accessToken: string) => Promise<LinkedInUserProfile>;
/**
 * Parse LinkedIn profile for user creation
 */
export declare const parseLinkedInProfile: (linkedinProfile: LinkedInUserProfile) => {
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    avatarUrl?: string;
    city?: string;
    country?: string;
    linkedinUrl?: string;
};
/**
 * Get full LinkedIn profile data including experience, education, and skills
 * Note: This requires additional LinkedIn API permissions and may not be available
 * with the current OAuth scope. This is a placeholder for future implementation.
 */
export declare const getFullProfileData: (accessToken: string) => Promise<Partial<ResumeData>>;
//# sourceMappingURL=linkedinAuth.d.ts.map