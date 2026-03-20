import type {
  APIGatewayProxyEvent,
  APIGatewayTokenAuthorizerEvent,
} from 'aws-lambda';
import type { AuthorizerContext } from '../types';

/** Use with `process.env.JWT_SECRET` before importing jwt / authorizer in tests. */
export const TEST_JWT_SECRET = 'test-jwt-secret-for-api-unit-tests-only';

export function setTestJwtEnv(): void {
  process.env.JWT_SECRET = TEST_JWT_SECRET;
}

export function makeAuthorizerContext(
  userId: string,
  email: string
): AuthorizerContext {
  return { userId, email };
}

/** Minimal API Gateway proxy event with Lambda authorizer context (string map). */
export function makeAuthorizedEvent(
  overrides: {
    authorizer?: AuthorizerContext;
    body?: string | null;
    httpMethod?: string;
    path?: string;
    pathParameters?: APIGatewayProxyEvent['pathParameters'];
    headers?: APIGatewayProxyEvent['headers'];
    queryStringParameters?: APIGatewayProxyEvent['queryStringParameters'];
  } = {}
): APIGatewayProxyEvent {
  const authorizer =
    overrides.authorizer ?? makeAuthorizerContext('user_test_1', 'u@test.local');
  return {
    resource: '/',
    path: overrides.path ?? '/',
    httpMethod: overrides.httpMethod ?? 'GET',
    headers: overrides.headers ?? {},
    multiValueHeaders: {},
    queryStringParameters: overrides.queryStringParameters ?? null,
    multiValueQueryStringParameters: null,
    pathParameters: overrides.pathParameters ?? null,
    stageVariables: null,
    requestContext: {
      accountId: '',
      apiId: '',
      protocol: 'HTTP/1.1',
      httpMethod: overrides.httpMethod ?? 'GET',
      path: overrides.path ?? '/',
      stage: 'test',
      requestId: 'test-req',
      requestTimeEpoch: Date.now(),
      resourceId: '',
      resourcePath: '/',
      identity: {
        accessKey: null,
        accountId: null,
        apiKey: null,
        apiKeyId: null,
        caller: null,
        cognitoAuthenticationProvider: null,
        cognitoAuthenticationType: null,
        cognitoIdentityId: null,
        cognitoIdentityPoolId: null,
        principalOrgId: null,
        sourceIp: '127.0.0.1',
        user: null,
        userAgent: null,
        userArn: null,
        clientCert: null,
      },
      authorizer: {
        userId: authorizer.userId,
        email: authorizer.email,
      } as APIGatewayProxyEvent['requestContext']['authorizer'],
    },
    body: overrides.body ?? null,
    isBase64Encoded: false,
  } as APIGatewayProxyEvent;
}

export function makeTokenAuthorizerEvent(
  authorizationToken: string | undefined,
  methodArn = 'arn:aws:execute-api:us-east-1:123456789:abc/test/GET/api/foo'
): APIGatewayTokenAuthorizerEvent {
  return {
    type: 'TOKEN',
    authorizationToken: authorizationToken ?? '',
    methodArn,
  };
}
