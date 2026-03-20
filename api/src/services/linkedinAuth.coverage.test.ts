import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.hoisted(() => {
  process.env.LINKEDIN_CLIENT_ID = 'test-li-id';
  process.env.LINKEDIN_CLIENT_SECRET = 'test-li-secret';
  process.env.LINKEDIN_REDIRECT_URI = 'http://localhost/cb';
  return null;
});

const fetchMock = vi.hoisted(() => vi.fn());

vi.mock('node-fetch', () => ({
  default: fetchMock,
}));

import {
  exchangeCodeForToken,
  verifyLinkedInToken,
  parseLinkedInProfile,
  getFullProfileData,
} from './linkedinAuth';

describe('linkedinAuth', () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it('exchangeCodeForToken returns access_token', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ access_token: 'at1' }),
    });
    await expect(exchangeCodeForToken('code')).resolves.toBe('at1');
  });

  it('exchangeCodeForToken throws on error response', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ error: 'invalid', error_description: 'bad' }),
    });
    await expect(exchangeCodeForToken('c')).rejects.toThrow('LinkedIn');
  });

  it('exchangeCodeForToken error uses error when no description', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ error: 'invalid_grant' }),
    });
    await expect(exchangeCodeForToken('c')).rejects.toThrow('Failed to exchange LinkedIn authorization code');
  });

  it('exchangeCodeForToken wraps network errors', async () => {
    fetchMock.mockRejectedValueOnce(new Error('net'));
    await expect(exchangeCodeForToken('c')).rejects.toThrow('Failed to exchange');
  });

  it('verifyLinkedInToken returns profile', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        sub: 'sub1',
        email: 'li@x.com',
        given_name: 'G',
        family_name: 'H',
        name: 'Full',
        picture: 'https://p.com/i.png',
        locale: 'es_MX',
      }),
    });
    const p = await verifyLinkedInToken('tok');
    expect(p.emailAddress).toBe('li@x.com');
    expect(p.firstName).toBe('G');
    expect(p.country).toBe('Mexico');
  });

  it('verifyLinkedInToken skips invalid picture URL and uses object locale country', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        sub: 's2',
        email: 'x@x.com',
        given_name: 'A',
        family_name: 'B',
        picture: 'not-a-url',
        locale: { country: 'DE', language: 'de' },
      }),
    });
    const p = await verifyLinkedInToken('tok');
    expect(p.avatarUrl).toBeUndefined();
    expect(p.country).toBe('Germany');
  });

  it('verifyLinkedInToken maps unknown country code to raw code', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        sub: 's3',
        email: 'y@y.com',
        picture: 'https://ok.com/p.png',
        locale: 'en_XX',
      }),
    });
    const p = await verifyLinkedInToken('tok');
    expect(p.country).toBe('XX');
  });

  it('verifyLinkedInToken handles object locale without country', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        sub: 's5',
        email: 'o@o.com',
        locale: { language: 'en' },
      }),
    });
    const p = await verifyLinkedInToken('tok');
    expect(p.country).toBeUndefined();
  });

  it('verifyLinkedInToken handles single-part locale string', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        sub: 's4',
        email: 'z@z.com',
        locale: 'english',
      }),
    });
    const p = await verifyLinkedInToken('tok');
    expect(p.country).toBeUndefined();
  });

  it('verifyLinkedInToken uses name fallback when name missing', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        sub: 's',
        email: 'n@x.com',
        given_name: 'Only',
        family_name: 'Parts',
        picture: '',
      }),
    });
    const p = await verifyLinkedInToken('tok');
    expect(p.fullName).toBe('Only Parts');
  });

  it('verifyLinkedInToken throws when userinfo not ok', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    });
    await expect(verifyLinkedInToken('bad')).rejects.toThrow('Invalid or expired LinkedIn token');
  });

  it('verifyLinkedInToken wraps errors as invalid token', async () => {
    fetchMock.mockRejectedValueOnce(new Error('network'));
    await expect(verifyLinkedInToken('x')).rejects.toThrow('Invalid or expired LinkedIn token');
  });

  it('parseLinkedInProfile maps fields', () => {
    const p = parseLinkedInProfile({
      id: '1',
      emailAddress: 'e@e.com',
      firstName: 'A',
      lastName: 'B',
      fullName: 'A B',
      avatarUrl: 'https://ok.com/a.png',
      city: 'C',
      country: 'Mexico',
      linkedinUrl: 'https://linkedin.com/in/x',
    });
    expect(p.email).toBe('e@e.com');
    expect(p.country).toBe('Mexico');
  });

  it('parseLinkedInProfile builds fullName from parts', () => {
    const p = parseLinkedInProfile({
      id: '1',
      emailAddress: 'e@e.com',
      firstName: 'F',
      lastName: 'L',
    });
    expect(p.fullName).toBe('F L');
  });

  it('parseLinkedInProfile throws without email', () => {
    expect(() =>
      parseLinkedInProfile({
        id: '1',
        firstName: 'A',
        lastName: 'B',
      })
    ).toThrow('email');
  });

  it('getFullProfileData returns placeholder resume data', async () => {
    const d = await getFullProfileData('tok');
    expect(d.firstName).toBe('John');
    expect(d.experience?.length).toBeGreaterThan(0);
  });

  it('getFullProfileData wraps errors from try body', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementationOnce(() => {
      throw new Error('boom');
    });
    await expect(getFullProfileData('tok')).rejects.toThrow('Failed to get full LinkedIn profile data');
    spy.mockRestore();
  });

  it('throws on import when LinkedIn credentials are missing', async () => {
    const id = process.env.LINKEDIN_CLIENT_ID;
    const sec = process.env.LINKEDIN_CLIENT_SECRET;
    vi.resetModules();
    delete process.env.LINKEDIN_CLIENT_ID;
    delete process.env.LINKEDIN_CLIENT_SECRET;
    await expect(import('./linkedinAuth')).rejects.toThrow('LinkedIn credentials');
    process.env.LINKEDIN_CLIENT_ID = id;
    process.env.LINKEDIN_CLIENT_SECRET = sec;
    vi.resetModules();
  });
});
