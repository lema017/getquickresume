import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AuthorizedEvent } from '../types';
export declare const listJobInterests: (event: APIGatewayProxyEvent & AuthorizedEvent) => Promise<APIGatewayProxyResult>;
export declare const getJobInterest: (event: APIGatewayProxyEvent & AuthorizedEvent) => Promise<APIGatewayProxyResult>;
export declare const createJobInterestHandler: (event: APIGatewayProxyEvent & AuthorizedEvent) => Promise<APIGatewayProxyResult>;
export declare const updateJobInterestHandler: (event: APIGatewayProxyEvent & AuthorizedEvent) => Promise<APIGatewayProxyResult>;
export declare const deleteJobInterestHandler: (event: APIGatewayProxyEvent & AuthorizedEvent) => Promise<APIGatewayProxyResult>;
export declare const optimizeForJob: (event: APIGatewayProxyEvent & AuthorizedEvent) => Promise<APIGatewayProxyResult>;
//# sourceMappingURL=jobInterest.d.ts.map