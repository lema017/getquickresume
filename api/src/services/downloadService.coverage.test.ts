import { describe, it, expect, vi, beforeEach } from 'vitest';

const getUserById = vi.hoisted(() => vi.fn());
const updateUser = vi.hoisted(() => vi.fn());
const getResumeById = vi.hoisted(() => vi.fn());

vi.mock('./dynamodb', () => ({ getUserById, updateUser }));
vi.mock('./resumeService', () => ({ getResumeById }));

import { trackDownload } from './downloadService';

const baseUser = {
  id: 'u1',
  email: 'e@test.com',
  firstName: 'A',
  lastName: 'B',
  provider: 'google' as const,
  isPremium: false,
  freeResumeUsed: false,
  premiumResumeCount: 0,
  premiumResumeMonth: '2026-01',
  freeDownloadUsed: false,
  totalDownloads: 0,
  freeCoverLetterUsed: false,
  premiumCoverLetterCount: 0,
  premiumCoverLetterMonth: '2026-01',
  createdAt: 't',
  updatedAt: 't',
};

describe('trackDownload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getResumeById.mockResolvedValue({ id: 'r1' } as never);
  });

  it('throws when ids missing', async () => {
    await expect(trackDownload('', 'r')).rejects.toThrow('required');
  });

  it('throws when user missing', async () => {
    getUserById.mockResolvedValueOnce(null);
    await expect(trackDownload('u1', 'r1')).rejects.toThrow('User not found');
  });

  it('throws when resume missing', async () => {
    getUserById.mockResolvedValueOnce(baseUser);
    getResumeById.mockResolvedValueOnce(null);
    await expect(trackDownload('u1', 'r1')).rejects.toThrow('Resume not found');
  });

  it('premium increments total', async () => {
    getUserById.mockResolvedValueOnce({ ...baseUser, isPremium: true, totalDownloads: 2 });
    updateUser.mockResolvedValueOnce({ ...baseUser, isPremium: true, totalDownloads: 3 });
    const r = await trackDownload('u1', 'r1');
    expect(r.allowed).toBe(true);
    expect(r.totalDownloads).toBe(3);
  });

  it('premium preserves freeDownloadUsed flag from user record', async () => {
    getUserById.mockResolvedValueOnce({
      ...baseUser,
      isPremium: true,
      freeDownloadUsed: true,
      totalDownloads: undefined,
    } as any);
    updateUser.mockResolvedValueOnce({
      ...baseUser,
      isPremium: true,
      totalDownloads: 1,
    } as any);
    const r = await trackDownload('u1', 'r1');
    expect(r.freeDownloadUsed).toBe(true);
    expect(r.totalDownloads).toBe(1);
  });

  it('free user blocked after used', async () => {
    getUserById.mockResolvedValueOnce({ ...baseUser, freeDownloadUsed: true, totalDownloads: 1 });
    const r = await trackDownload('u1', 'r1');
    expect(r.allowed).toBe(false);
    expect(r.message).toBeDefined();
  });

  it('free first download', async () => {
    getUserById.mockResolvedValueOnce({ ...baseUser, freeDownloadUsed: false, totalDownloads: 0 });
    updateUser.mockResolvedValueOnce({ ...baseUser, freeDownloadUsed: true, totalDownloads: 1 });
    const r = await trackDownload('u1', 'r1');
    expect(r.allowed).toBe(true);
    expect(r.freeDownloadUsed).toBe(true);
  });

  it('free first download clamps negative totalDownloads', async () => {
    getUserById.mockResolvedValueOnce({ ...baseUser, freeDownloadUsed: false, totalDownloads: 0 });
    updateUser.mockResolvedValueOnce({ ...baseUser, freeDownloadUsed: true, totalDownloads: -3 } as any);
    const r = await trackDownload('u1', 'r1');
    expect(r.totalDownloads).toBe(0);
  });
});
