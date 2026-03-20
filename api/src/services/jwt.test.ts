import { describe, it, expect, beforeAll, vi } from 'vitest';
import jwt from 'jsonwebtoken';
import { setTestJwtEnv, TEST_JWT_SECRET } from '../test-utils/apiGateway';
import { generateToken, verifyToken, decodeToken } from './jwt';

beforeAll(() => {
  setTestJwtEnv();
});

describe('jwt service', () => {
  it('generateToken and verifyToken round-trip with issuer and audience', () => {
    const token = generateToken({
      userId: 'u1',
      email: 'a@b.com',
      isPremium: false,
    });
    const decoded = verifyToken(token);
    expect(decoded.userId).toBe('u1');
    expect(decoded.email).toBe('a@b.com');
    expect(decoded.isPremium).toBe(false);
  });

  it('verifyToken throws for invalid token', () => {
    expect(() => verifyToken('not-a-jwt')).toThrow('Invalid token');
  });

  it('verifyToken throws for wrong signing secret', () => {
    const bad = jwt.sign(
      { userId: 'x', email: 'x@x.com', isPremium: true },
      'other-secret',
      {
        expiresIn: '1h',
        issuer: 'getquickresume-api',
        audience: 'getquickresume-frontend',
      }
    );
    expect(() => verifyToken(bad)).toThrow('Invalid token');
  });

  it('decodeToken returns payload for valid JWT string', () => {
    const t = generateToken({
      userId: 'd1',
      email: 'd@test.com',
      isPremium: false,
    });
    const d = decodeToken(t);
    expect(d?.userId).toBe('d1');
  });

  it('generateToken wraps sign failures', () => {
    const spy = vi.spyOn(jwt, 'sign').mockImplementation(() => {
      throw new Error('sign fail');
    });
    expect(() =>
      generateToken({ userId: 'x', email: 'x@x.com', isPremium: false })
    ).toThrow('Token generation failed');
    spy.mockRestore();
  });
});
