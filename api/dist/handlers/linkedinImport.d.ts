import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ResumeData } from '../types';
export interface LinkedInImportRequest {
    url?: string;
}
export interface LinkedInImportResponse {
    success: boolean;
    data?: Partial<ResumeData>;
    error?: string;
}
/**
 * Import LinkedIn profile data using OAuth (for users who logged in with LinkedIn)
 */
export declare const importFromAuth: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
/**
 * Import LinkedIn profile data using public URL (for users who logged in with Google)
 */
export declare const importFromPublicUrl: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
//# sourceMappingURL=linkedinImport.d.ts.map