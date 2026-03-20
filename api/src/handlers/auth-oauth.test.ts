import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { setTestJwtEnv, makeAuthorizedEvent } from '../test-utils/apiGateway';
import type { User } from '../types';

const verifyGoogleToken = vi.hoisted(() => vi.fn());
const getUserByEmail = vi.hoisted(() => vi.fn());
const createUser = vi.hoisted(() => vi.fn());
const updateUser = vi.hoisted(() => vi.fn());
const getUserById = vi.hoisted(() => vi.fn());
const exchangeCodeForToken = vi.hoisted(() => vi.fn());
const verifyLinkedInToken = vi.hoisted(() => vi.fn());
const parseLinkedInProfile = vi.hoisted(() => vi.fn());

vi.mock('../services/googleAuth', () => ({
  verifyGoogleToken,
  parseLocation: () => ({ city: 'Testville', country: 'TC' }),
}));

vi.mock('../services/linkedinAuth', () => ({
  exchangeCodeForToken,
  verifyLinkedInToken,
  parseLinkedInProfile,
}));

vi.mock('../services/dynamodb', () => ({
  getUserByEmail,
  createUser,
  updateUser,
  getUserById,
}));

import { googleAuth, linkedinAuth, validateToken, getMe } from './auth';

beforeAll(() => {
  setTestJwtEnv();
});

function mockUser(over: Partial<User> = {}): User {
  const now = new Date().toISOString();
  return {
    id: 'usr_1',
    email: 'oauth@test.com',
    firstName: 'O',
    lastName: 'Auth',
    provider: 'google',
    isPremium: false,
    freeResumeUsed: false,
    premiumResumeCount: 0,
    premiumResumeMonth: '2026-01',
    freeDownloadUsed: false,
    totalDownloads: 0,
    freeCoverLetterUsed: false,
    premiumCoverLetterCount: 0,
    premiumCoverLetterMonth: '2026-01',
    createdAt: now,
    updatedAt: now,
    ...over,
  };
}

describe('googleAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 when body missing', async () => {
    const res = await googleAuth({
      body: null,
    } as Parameters<typeof googleAuth>[0]);
    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res.body || '{}');
    expect(body.success).toBe(false);
  });

  it('returns 400 when token missing', async () => {
    const res = await googleAuth({
      body: JSON.stringify({}),
    } as Parameters<typeof googleAuth>[0]);
    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res.body || '{}');
    expect(body.error).toBe('Google token is required');
  });

  it('returns 401 when Google token invalid', async () => {
    verifyGoogleToken.mockRejectedValueOnce(new Error('Invalid Google token'));
    const res = await googleAuth({
      body: JSON.stringify({ token: 'bad' }),
    } as Parameters<typeof googleAuth>[0]);
    expect(res.statusCode).toBe(401);
    const body = JSON.parse(res.body || '{}');
    expect(body.error).toBe('Invalid or expired Google token');
  });

  it('returns 200 with JWT for new user', async () => {
    verifyGoogleToken.mockResolvedValueOnce({
      sub: 'g1',
      email: 'oauth@test.com',
      name: 'O Auth',
      given_name: 'O',
      family_name: 'Auth',
      picture: 'https://example.com/p.png',
      locale: 'en-US',
      email_verified: true,
    });
    getUserByEmail.mockResolvedValueOnce(undefined);
    createUser.mockResolvedValueOnce(mockUser());

    const res = await googleAuth({
      body: JSON.stringify({ token: 'google-jwt' }),
    } as Parameters<typeof googleAuth>[0]);

    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body || '{}');
    expect(body.success).toBe(true);
    expect(typeof body.token).toBe('string');
    expect(body.user.email).toBe('oauth@test.com');
  });

  it('returns 200 for existing user and calls updateUser', async () => {
    verifyGoogleToken.mockResolvedValueOnce({
      email: 'exist@test.com',
      name: 'Pat Smith',
      given_name: 'Pat',
      family_name: 'Smith',
      picture: 'https://example.com/a.png',
      locale: 'en-US',
    });
    const existing = mockUser({ id: 'ex1', email: 'exist@test.com', city: 'Old', country: 'OldC' });
    getUserByEmail.mockResolvedValueOnce(existing);
    updateUser.mockResolvedValueOnce({ ...existing, firstName: 'Pat' });

    const res = await googleAuth({
      body: JSON.stringify({ token: 'tok' }),
    } as Parameters<typeof googleAuth>[0]);

    expect(res.statusCode).toBe(200);
    expect(updateUser).toHaveBeenCalledWith('ex1', expect.objectContaining({ firstName: 'Pat' }));
  });

  it('strips invalid avatar URL', async () => {
    verifyGoogleToken.mockResolvedValueOnce({
      email: 'av@test.com',
      name: 'A V',
      given_name: 'A',
      family_name: 'V',
      picture: 'not-a-valid-url',
    });
    getUserByEmail.mockResolvedValueOnce(undefined);
    createUser.mockResolvedValueOnce(mockUser({ email: 'av@test.com' }));

    await googleAuth({
      body: JSON.stringify({ token: 't' }),
    } as Parameters<typeof googleAuth>[0]);

    expect(createUser).toHaveBeenCalledWith(
      expect.objectContaining({ avatarUrl: undefined })
    );
  });

  it('parses name from single name field when given_name missing', async () => {
    verifyGoogleToken.mockResolvedValueOnce({
      email: 'one@test.com',
      name: 'Firsty Lasty',
    });
    getUserByEmail.mockResolvedValueOnce(undefined);
    createUser.mockResolvedValueOnce(mockUser({ email: 'one@test.com' }));

    await googleAuth({
      body: JSON.stringify({ token: 't' }),
    } as Parameters<typeof googleAuth>[0]);

    expect(createUser).toHaveBeenCalledWith(
      expect.objectContaining({ firstName: 'Firsty', lastName: 'Lasty' })
    );
  });

  it('returns 500 on unexpected errors after token ok', async () => {
    verifyGoogleToken.mockResolvedValueOnce({
      email: 'x@test.com',
      name: 'X',
    });
    getUserByEmail.mockRejectedValueOnce(new Error('ddb down'));

    const res = await googleAuth({
      body: JSON.stringify({ token: 't' }),
    } as Parameters<typeof googleAuth>[0]);

    expect(res.statusCode).toBe(500);
  });

  it('maps Token expired to 401', async () => {
    verifyGoogleToken.mockRejectedValueOnce(new Error('Token expired'));
    const res = await googleAuth({
      body: JSON.stringify({ token: 't' }),
    } as Parameters<typeof googleAuth>[0]);
    expect(res.statusCode).toBe(401);
  });
});

describe('getMe', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 401 without authorizer', async () => {
    const ev = makeAuthorizedEvent();
    (ev as { requestContext: { authorizer?: unknown } }).requestContext = {
      ...ev.requestContext,
      authorizer: undefined,
    };
    const res = await getMe(ev as Parameters<typeof getMe>[0]);
    expect(res.statusCode).toBe(401);
  });

  it('returns 404 when user missing in DB', async () => {
    getUserById.mockResolvedValueOnce(undefined);
    const res = await getMe(makeAuthorizedEvent() as Parameters<typeof getMe>[0]);
    expect(res.statusCode).toBe(404);
  });

  it('returns 500 when getUserById throws', async () => {
    getUserById.mockRejectedValueOnce(new Error('ddb'));
    const res = await getMe(makeAuthorizedEvent() as Parameters<typeof getMe>[0]);
    expect(res.statusCode).toBe(500);
  });

  it('returns 200 with user payload', async () => {
    getUserById.mockResolvedValueOnce(mockUser({ firstName: 'ann', email: 'me@test.com' }));
    const res = await getMe(makeAuthorizedEvent() as Parameters<typeof getMe>[0]);
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body || '{}');
    expect(body.success).toBe(true);
    expect(body.user.email).toBe('me@test.com');
  });

  it('formats names when firstName is empty', async () => {
    getUserById.mockResolvedValueOnce(
      mockUser({ firstName: '', lastName: 'solo', fullName: 'solo', email: 's@test.com' })
    );
    const res = await getMe(makeAuthorizedEvent() as Parameters<typeof getMe>[0]);
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body || '{}');
    expect(body.user.firstName).toBe('');
  });
});

describe('validateToken', () => {
  it('returns 401 without Bearer header', async () => {
    const res = await validateToken({ headers: {} } as Parameters<typeof validateToken>[0]);
    expect(res.statusCode).toBe(401);
    const body = JSON.parse(res.body || '{}');
    expect(body.success).toBe(false);
  });

  it('returns 200 when Authorization Bearer present (handler does not re-verify JWT)', async () => {
    const res = await validateToken({
      headers: { Authorization: 'Bearer any-opaque-string' },
    } as Parameters<typeof validateToken>[0]);
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body || '{}');
    expect(body.success).toBe(true);
    expect(body.message).toBe('Token is valid');
  });

  it('accepts lowercase authorization header', async () => {
    const res = await validateToken({
      headers: { authorization: 'Bearer lower' },
    } as Parameters<typeof validateToken>[0]);
    expect(res.statusCode).toBe(200);
  });
});

describe('linkedinAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 200 with JWT for new LinkedIn user', async () => {
    exchangeCodeForToken.mockResolvedValueOnce('linkedin-access-token');
    verifyLinkedInToken.mockResolvedValueOnce({ id: 'lid' });
    parseLinkedInProfile.mockReturnValueOnce({
      email: 'linkedin@test.com',
      firstName: 'Lin',
      lastName: 'Kedin',
      fullName: 'Lin Kedin',
      avatarUrl: undefined,
      city: 'Austin',
      country: 'US',
      linkedinUrl: 'https://linkedin.com/in/x',
    });
    getUserByEmail.mockResolvedValueOnce(undefined);
    createUser.mockResolvedValueOnce(
      mockUser({ id: 'li_new', email: 'linkedin@test.com', provider: 'linkedin' })
    );

    const res = await linkedinAuth({
      body: JSON.stringify({ code: 'auth-code-123' }),
    } as Parameters<typeof linkedinAuth>[0]);

    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body || '{}');
    expect(body.success).toBe(true);
    expect(typeof body.token).toBe('string');
    expect(body.user.email).toBe('linkedin@test.com');
  });

  it('returns 400 when body missing', async () => {
    const res = await linkedinAuth({
      body: null,
    } as Parameters<typeof linkedinAuth>[0]);
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when code missing', async () => {
    const res = await linkedinAuth({
      body: JSON.stringify({}),
    } as Parameters<typeof linkedinAuth>[0]);
    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res.body || '{}');
    expect(body.error).toBe('LinkedIn authorization code is required');
  });

  it('returns 401 when token exchange fails with LinkedIn message', async () => {
    exchangeCodeForToken.mockRejectedValueOnce(
      new Error('Invalid or expired LinkedIn token')
    );
    const res = await linkedinAuth({
      body: JSON.stringify({ code: 'abc' }),
    } as Parameters<typeof linkedinAuth>[0]);
    expect(res.statusCode).toBe(401);
    const body = JSON.parse(res.body || '{}');
    expect(body.error).toContain('LinkedIn');
  });

  it('returns 200 for existing LinkedIn user via updateUser', async () => {
    exchangeCodeForToken.mockResolvedValueOnce('at');
    verifyLinkedInToken.mockResolvedValueOnce({ id: 'l1' });
    parseLinkedInProfile.mockReturnValueOnce({
      email: 'li_exist@test.com',
      firstName: 'E',
      lastName: 'User',
      fullName: 'E User',
      city: 'NYC',
      country: 'US',
      linkedinUrl: 'https://linkedin.com/in/e',
    });
    const existing = mockUser({ id: 'u_li', email: 'li_exist@test.com', provider: 'linkedin' });
    getUserByEmail.mockResolvedValueOnce(existing);
    updateUser.mockResolvedValueOnce(existing);

    const res = await linkedinAuth({
      body: JSON.stringify({ code: 'c1' }),
    } as Parameters<typeof linkedinAuth>[0]);

    expect(res.statusCode).toBe(200);
    expect(updateUser).toHaveBeenCalled();
  });

  it('returns 401 when profile has no email', async () => {
    exchangeCodeForToken.mockResolvedValueOnce('at');
    verifyLinkedInToken.mockResolvedValueOnce({ id: 'x' });
    parseLinkedInProfile.mockReturnValueOnce({
      email: '',
      firstName: 'A',
      lastName: 'B',
      fullName: 'A B',
    });

    const res = await linkedinAuth({
      body: JSON.stringify({ code: 'c2' }),
    } as Parameters<typeof linkedinAuth>[0]);

    expect(res.statusCode).toBe(401);
  });

  it('returns 500 on generic LinkedIn flow errors', async () => {
    exchangeCodeForToken.mockResolvedValueOnce('at');
    verifyLinkedInToken.mockResolvedValueOnce({ id: 'x' });
    parseLinkedInProfile.mockReturnValueOnce({
      email: 'ok@test.com',
      firstName: 'O',
      lastName: 'K',
      fullName: 'O K',
    });
    getUserByEmail.mockRejectedValueOnce(new Error('ddb'));

    const res = await linkedinAuth({
      body: JSON.stringify({ code: 'c3' }),
    } as Parameters<typeof linkedinAuth>[0]);

    expect(res.statusCode).toBe(500);
  });
});
