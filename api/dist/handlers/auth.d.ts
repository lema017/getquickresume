import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AuthorizedEvent } from '../types';
export declare const googleAuth: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
export declare const validateToken: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
export declare const linkedinAuth: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
export declare const getMe: (event: APIGatewayProxyEvent & AuthorizedEvent) => Promise<APIGatewayProxyResult>;
//# sourceMappingURL=auth.d.ts.map