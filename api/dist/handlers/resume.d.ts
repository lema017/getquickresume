import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AuthorizedEvent } from '../types';
export declare const generateResume: (event: APIGatewayProxyEvent & AuthorizedEvent) => Promise<APIGatewayProxyResult>;
export declare const generateResumeOptions: () => Promise<APIGatewayProxyResult>;
export declare const listResumes: (event: APIGatewayProxyEvent & AuthorizedEvent) => Promise<APIGatewayProxyResult>;
export declare const getResume: (event: APIGatewayProxyEvent & AuthorizedEvent) => Promise<APIGatewayProxyResult>;
export declare const createResumeHandler: (event: APIGatewayProxyEvent & AuthorizedEvent) => Promise<APIGatewayProxyResult>;
export declare const updateResumeHandler: (event: APIGatewayProxyEvent & AuthorizedEvent) => Promise<APIGatewayProxyResult>;
export declare const deleteResumeHandler: (event: APIGatewayProxyEvent & AuthorizedEvent) => Promise<APIGatewayProxyResult>;
//# sourceMappingURL=resume.d.ts.map