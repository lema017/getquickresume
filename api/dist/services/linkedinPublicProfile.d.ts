import { ResumeData } from '../types';
/**
 * Extract LinkedIn profile data from public URL
 * Note: LinkedIn has anti-scraping protections, so this is a simplified implementation
 * In a real implementation, you would need to use LinkedIn's official API or
 * implement a more sophisticated scraping solution
 */
export declare const extractLinkedInDataFromUrl: (url: string) => Promise<Partial<ResumeData>>;
/**
 * Alternative approach: Ask users to paste their LinkedIn profile data as text
 * and use AI to structure it into ResumeData format
 */
export declare const parseLinkedInTextData: (profileText: string) => Promise<Partial<ResumeData>>;
//# sourceMappingURL=linkedinPublicProfile.d.ts.map