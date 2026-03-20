import { describe, it, expect, beforeAll } from 'vitest';
import jwt from 'jsonwebtoken';
import {
  setTestJwtEnv,
  makeTokenAuthorizerEvent,
  TEST_JWT_SECRET,
} from '../test-utils/apiGateway';
import { authorize } from './authorizer';
import { generateToken } from '../services/jwt';

beforeAll(() => {
  setTestJwtEnv();
});

describe('authorize (Lambda token authorizer)', () => {
  const methodArn =
    'arn:aws:execute-api:us-east-1:123456789:abc/test/GET/api/resumes';

  it('Deny when authorizationToken is missing', async () => {
    const event = makeTokenAuthorizerEvent('');
    const result = await authorize(event);
    expect(result.policyDocument.Statement[0].Effect).toBe('Deny');
  });

  it('Deny when Bearer has no token after prefix', async () => {
    const event = makeTokenAuthorizerEvent('Bearer ');
    const result = await authorize(event);
    expect(result.policyDocument.Statement[0].Effect).toBe('Deny');
  });

  it('Allow with context for valid Bearer JWT', async () => {
    const token = generateToken({
      userId: 'user_abc',
      email: 'me@test.com',
      isPremium: true,
    });
    const event = makeTokenAuthorizerEvent(`Bearer ${token}`, methodArn);
    const result = await authorize(event);
    expect(result.policyDocument.Statement[0].Effect).toBe('Allow');
    expect(result.principalId).toBe('user_abc');
    expect(result.context?.userId).toBe('user_abc');
    expect(result.context?.email).toBe('me@test.com');
  });

  it('Allow with same JWT when Bearer prefix omitted', async () => {
    const token = generateToken({
      userId: 'user_xyz',
      email: 'x@test.com',
      isPremium: false,
    });
    const event = makeTokenAuthorizerEvent(token, methodArn);
    const result = await authorize(event);
    expect(result.policyDocument.Statement[0].Effect).toBe('Allow');
    expect(result.context?.userId).toBe('user_xyz');
  });

  it('Deny for expired JWT', async () => {
    const expired = jwt.sign(
      {
        userId: 'u',
        email: 'e@e.com',
        isPremium: false,
      },
      TEST_JWT_SECRET,
      {
        expiresIn: '-1s',
        issuer: 'getquickresume-api',
        audience: 'getquickresume-frontend',
      }
    );
    const event = makeTokenAuthorizerEvent(`Bearer ${expired}`, methodArn);
    const result = await authorize(event);
    expect(result.policyDocument.Statement[0].Effect).toBe('Deny');
  });

  it('Deny for wrong issuer', async () => {
    const bad = jwt.sign(
      { userId: 'u', email: 'e@e.com', isPremium: false },
      TEST_JWT_SECRET,
      {
        expiresIn: '1h',
        issuer: 'wrong-issuer',
        audience: 'getquickresume-frontend',
      }
    );
    const event = makeTokenAuthorizerEvent(`Bearer ${bad}`, methodArn);
    const result = await authorize(event);
    expect(result.policyDocument.Statement[0].Effect).toBe('Deny');
  });
});
