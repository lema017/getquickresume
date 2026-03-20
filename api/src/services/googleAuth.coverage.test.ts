import { describe, it, expect, vi, beforeEach } from 'vitest';

const verifyIdToken = vi.hoisted(() => vi.fn());

vi.mock('google-auth-library', () => ({
  OAuth2Client: vi.fn().mockImplementation(() => ({
    verifyIdToken: (...a: unknown[]) => verifyIdToken(...a),
  })),
}));

import { verifyGoogleToken, parseLocation } from './googleAuth';

describe('googleAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GOOGLE_CLIENT_ID = 'test-client';
  });

  it('verifyGoogleToken returns payload', async () => {
    verifyIdToken.mockResolvedValueOnce({
      getPayload: () => ({
        email: 'a@b.com',
        name: 'A B',
        picture: 'https://x.com/p.png',
        given_name: 'A',
        family_name: 'B',
        locale: 'en-US',
      }),
    });
    const u = await verifyGoogleToken('tok');
    expect(u.email).toBe('a@b.com');
    expect(u.name).toBe('A B');
  });

  it('verifyGoogleToken uses empty string fallbacks and omits picture when absent', async () => {
    verifyIdToken.mockResolvedValueOnce({
      getPayload: () => ({
        email: undefined,
        name: undefined,
        given_name: 'G',
        family_name: 'H',
      }),
    });
    const u = await verifyGoogleToken('tok');
    expect(u.email).toBe('');
    expect(u.name).toBe('');
    expect(u.picture).toBeUndefined();
  });

  it('verifyGoogleToken throws when no payload', async () => {
    verifyIdToken.mockResolvedValueOnce({ getPayload: () => null });
    await expect(verifyGoogleToken('bad')).rejects.toThrow('Invalid Google token');
  });

  it('verifyGoogleToken wraps verify errors', async () => {
    verifyIdToken.mockRejectedValueOnce(new Error('net'));
    await expect(verifyGoogleToken('bad')).rejects.toThrow('Invalid Google token');
  });

  it('parseLocation empty', () => {
    expect(parseLocation()).toEqual({ city: '', country: '' });
  });

  it('parseLocation known locale', () => {
    expect(parseLocation('es-MX').country).toBe('México');
  });

  it('parseLocation unknown locale', () => {
    expect(parseLocation('xx-YY').country).toBe('');
  });

  it('parseLocation hits common locale map entries', () => {
    expect(parseLocation('es').country).toBe('España');
    expect(parseLocation('en').country).toBe('Estados Unidos');
    expect(parseLocation('pt-BR').country).toBe('Brasil');
    expect(parseLocation('fr').country).toBe('Francia');
    expect(parseLocation('de').country).toBe('Alemania');
    expect(parseLocation('it').country).toBe('Italia');
    expect(parseLocation('en-CA').country).toBe('Canadá');
    expect(parseLocation('en-GB').country).toBe('Reino Unido');
    expect(parseLocation('en-AU').country).toBe('Australia');
    expect(parseLocation('es-AR').country).toBe('Argentina');
    expect(parseLocation('es-CO').country).toBe('Colombia');
    expect(parseLocation('es-CL').country).toBe('Chile');
    expect(parseLocation('es-PE').country).toBe('Perú');
    expect(parseLocation('es-VE').country).toBe('Venezuela');
    expect(parseLocation('es-CR').country).toBe('Costa Rica');
  });
});
