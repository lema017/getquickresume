import { describe, it, expect, vi, beforeEach } from 'vitest';

const sendMock = vi.hoisted(() => vi.fn());
const generateJobTitleAchievements = vi.hoisted(() => vi.fn());
const getUserById = vi.hoisted(() => vi.fn());

vi.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: class {
    constructor() {}
  },
}));

vi.mock('@aws-sdk/lib-dynamodb', () => {
  class GetCommand {
    constructor(public input: unknown) {}
  }
  class PutCommand {
    constructor(public input: unknown) {}
  }
  return {
    DynamoDBDocumentClient: { from: () => ({ send: sendMock }) },
    GetCommand,
    PutCommand,
  };
});

vi.mock('./aiService', () => ({
  aiService: { generateJobTitleAchievements: (...a: unknown[]) => generateJobTitleAchievements(...a) },
}));

vi.mock('./dynamodb', () => ({ getUserById: (...a: unknown[]) => getUserById(...a) }));

import { jobTitleAchievementsService } from './jobTitleAchievementsService';

const ctx = { authorizer: { userId: 'u1' } };

const premiumUser = {
  id: 'u1',
  isPremium: true,
  email: 'e@test.com',
  firstName: 'A',
  lastName: 'B',
  provider: 'google' as const,
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

describe('jobTitleAchievementsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getUserById.mockResolvedValue(premiumUser);
    generateJobTitleAchievements.mockResolvedValue(['a', 'b', 'c', 'd']);
    sendMock.mockResolvedValue({});
  });

  it('premium skips cache and saves', async () => {
    const r = await jobTitleAchievementsService.getAchievementsByJobTitle(
      ' Engineer ',
      'en',
      ctx,
      undefined
    );
    expect(r.fromCache).toBe(false);
    expect(r.suggestions.length).toBeLessThanOrEqual(3);
    expect(generateJobTitleAchievements).toHaveBeenCalled();
    expect(sendMock).toHaveBeenCalled();
  });

  it('free user uses cache hit', async () => {
    getUserById.mockResolvedValue({ ...premiumUser, isPremium: false });
    sendMock.mockResolvedValueOnce({
      Item: {
        jobTitle: 'engineer',
        language: 'en',
        achievements: ['x', 'y', 'z', 'w'],
      },
    });
    const r = await jobTitleAchievementsService.getAchievementsByJobTitle('Engineer', 'en', ctx);
    expect(r.fromCache).toBe(true);
    expect(generateJobTitleAchievements).not.toHaveBeenCalled();
  });

  it('free user cache miss language mismatch', async () => {
    getUserById.mockResolvedValue({ ...premiumUser, isPremium: false });
    sendMock.mockResolvedValueOnce({
      Item: { jobTitle: 'engineer', language: 'es', achievements: ['a'] },
    });
    generateJobTitleAchievements.mockResolvedValueOnce(['n1', 'n2', 'n3', 'n4']);
    const r = await jobTitleAchievementsService.getAchievementsByJobTitle('Engineer', 'en', ctx);
    expect(r.fromCache).toBe(false);
    expect(generateJobTitleAchievements).toHaveBeenCalled();
  });

  it('getCachedSuggestions swallows dynamo error', async () => {
    getUserById.mockResolvedValue({ ...premiumUser, isPremium: false });
    sendMock.mockRejectedValueOnce(new Error('ddb'));
    sendMock.mockResolvedValueOnce({});
    generateJobTitleAchievements.mockResolvedValueOnce(['a', 'b', 'c', 'd']);
    const r = await jobTitleAchievementsService.getAchievementsByJobTitle('Dev', 'en', ctx);
    expect(r.fromCache).toBe(false);
  });

  it('saveSuggestionsToCache swallows error', async () => {
    getUserById.mockResolvedValue(premiumUser);
    sendMock.mockRejectedValueOnce(new Error('put fail'));
    const r = await jobTitleAchievementsService.getAchievementsByJobTitle('Dev', 'en', ctx);
    expect(r.suggestions.length).toBeGreaterThan(0);
  });

  it('throws when user missing', async () => {
    getUserById.mockResolvedValueOnce(null);
    await expect(
      jobTitleAchievementsService.getAchievementsByJobTitle('Dev', 'en', ctx)
    ).rejects.toThrow('Failed to get achievement suggestions');
  });

  it('suggestions length <= count returns all', async () => {
    getUserById.mockResolvedValue(premiumUser);
    generateJobTitleAchievements.mockResolvedValueOnce(['only', 'two']);
    const r = await jobTitleAchievementsService.getAchievementsByJobTitle('X', 'en', ctx);
    expect(r.suggestions).toEqual(['only', 'two']);
  });
});
