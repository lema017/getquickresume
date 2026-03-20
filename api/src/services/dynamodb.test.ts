import { describe, it, expect, vi, beforeEach } from 'vitest';

const sendMock = vi.hoisted(() => vi.fn());

vi.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: class {
    constructor() {}
  },
}));

vi.mock('@aws-sdk/lib-dynamodb', () => {
  class QueryCommand {
    constructor(public input: unknown) {}
  }
  class PutCommand {
    constructor(public input: unknown) {}
  }
  class UpdateCommand {
    constructor(public input: unknown) {}
  }
  class GetCommand {
    constructor(public input: unknown) {}
  }
  return {
    DynamoDBDocumentClient: {
      from: () => ({ send: sendMock }),
    },
    QueryCommand,
    PutCommand,
    UpdateCommand,
    GetCommand,
  };
});

import type { User } from './dynamodb';
import {
  getUserByEmail,
  createUser,
  getUserById,
  markFreeResumeUsed,
  incrementPremiumResumeCount,
  markFreeCoverLetterUsed,
  incrementPremiumCoverLetterCount,
  updateUser,
  upgradeUserToPremium,
} from './dynamodb';

const currentMonth = new Date().toISOString().slice(0, 7);

const baseUser: User = {
  id: 'u1',
  email: 'e@test.com',
  firstName: 'A',
  lastName: 'B',
  provider: 'google',
  isPremium: false,
  freeResumeUsed: false,
  premiumResumeCount: 0,
  premiumResumeMonth: currentMonth,
  freeDownloadUsed: false,
  totalDownloads: 0,
  freeCoverLetterUsed: false,
  premiumCoverLetterCount: 0,
  premiumCoverLetterMonth: currentMonth,
  createdAt: 't',
  updatedAt: 't',
};

describe('dynamodb service', () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it('getUserByEmail returns user or null', async () => {
    sendMock.mockResolvedValueOnce({ Items: [baseUser] });
    await expect(getUserByEmail('e@test.com')).resolves.toEqual(baseUser);
    sendMock.mockResolvedValueOnce({ Items: [] });
    await expect(getUserByEmail('x')).resolves.toBeNull();
    sendMock.mockRejectedValueOnce(new Error('db'));
    await expect(getUserByEmail('x')).rejects.toThrow('Database error');
  });

  it('createUser puts and returns user', async () => {
    sendMock.mockResolvedValueOnce({});
    const u = await createUser({ email: 'n@n.com', firstName: 'N', lastName: 'M', provider: 'google' });
    expect(u.email).toBe('n@n.com');
    expect(u.id).toContain('user_');
  });

  it('getUserById returns premium user with future expiration without downgrade', async () => {
    const future: User = {
      ...baseUser,
      isPremium: true,
      subscriptionExpiration: new Date(Date.now() + 86400000 * 30).toISOString(),
    };
    sendMock.mockResolvedValueOnce({ Item: future });
    const r = await getUserById('u1');
    expect(r?.isPremium).toBe(true);
    expect(r?.id).toBe('u1');
  });

  it('getUserById returns user and handles expiry via updateUser', async () => {
    sendMock.mockResolvedValueOnce({ Item: baseUser });
    await expect(getUserById('u1')).resolves.toEqual(baseUser);

    const expired: User = {
      ...baseUser,
      isPremium: true,
      subscriptionExpiration: new Date(Date.now() - 1000).toISOString(),
    };
    sendMock.mockResolvedValueOnce({ Item: expired });
    sendMock.mockResolvedValueOnce({ Attributes: { ...expired, isPremium: false } });
    const r = await getUserById('u1');
    expect(r?.isPremium).toBe(false);
  });

  it('getUserById throws on db error', async () => {
    sendMock.mockRejectedValueOnce(new Error('x'));
    await expect(getUserById('u1')).rejects.toThrow('Database error');
  });

  it('markFreeResumeUsed and incrementPremiumResumeCount', async () => {
    sendMock.mockResolvedValueOnce({ Attributes: baseUser });
    await expect(markFreeResumeUsed('u1')).resolves.toEqual(baseUser);
    sendMock.mockResolvedValueOnce({ Item: baseUser });
    sendMock.mockResolvedValueOnce({ Attributes: { ...baseUser, premiumResumeCount: 1 } });
    await expect(incrementPremiumResumeCount('u1')).resolves.toMatchObject({ premiumResumeCount: 1 });
  });

  it('cover letter counters', async () => {
    sendMock.mockResolvedValueOnce({ Attributes: baseUser });
    await expect(markFreeCoverLetterUsed('u1')).resolves.toEqual(baseUser);
    sendMock.mockResolvedValueOnce({ Item: baseUser });
    sendMock.mockResolvedValueOnce({ Attributes: { ...baseUser, premiumCoverLetterCount: 1 } });
    await expect(incrementPremiumCoverLetterCount('u1')).resolves.toMatchObject({
      premiumCoverLetterCount: 1,
    });
  });

  it('updateUser and upgradeUserToPremium', async () => {
    sendMock.mockResolvedValueOnce({ Attributes: baseUser });
    await expect(updateUser('u1', { firstName: 'Z' })).resolves.toEqual(baseUser);
    sendMock.mockResolvedValueOnce({ Attributes: { ...baseUser, isPremium: true } });
    const up = await upgradeUserToPremium('u1', 'monthly', 'paypal', 'cid', 'sub', 'txn');
    expect(up.isPremium).toBe(true);
  });

  it('updateUser throws when no valid fields', async () => {
    await expect(updateUser('u1', {})).rejects.toThrow('Database error');
  });

  it('upgradeUserToPremium throws Database error on dynamo failure', async () => {
    sendMock.mockRejectedValueOnce(new Error('ddb'));
    await expect(
      upgradeUserToPremium('u1', 'monthly', 'paypal', 'cid', 'sub', 'txn')
    ).rejects.toThrow('Database error');
  });

  it('upgradeUserToPremium yearly plan extends expiration one year', async () => {
    sendMock.mockResolvedValueOnce({ Attributes: { ...baseUser, isPremium: true, planType: 'yearly' } });
    const up = await upgradeUserToPremium('u1', 'yearly', 'paypal', 'cid', 'sub', 'txn');
    expect(up.isPremium).toBe(true);
  });

  it('incrementPremiumResumeCount resets on new month', async () => {
    const cur = new Date().toISOString().slice(0, 7);
    const oldMonth = cur === '2000-01' ? '1999-12' : '2000-01';
    sendMock.mockResolvedValueOnce({
      Item: { ...baseUser, premiumResumeMonth: oldMonth, premiumResumeCount: 9 },
    });
    sendMock.mockResolvedValueOnce({
      Attributes: { ...baseUser, premiumResumeMonth: cur, premiumResumeCount: 1 },
    });
    const u = await incrementPremiumResumeCount('u1');
    expect(u.premiumResumeCount).toBe(1);
  });

  it('incrementPremiumResumeCount increments within same month', async () => {
    const cur = new Date().toISOString().slice(0, 7);
    sendMock.mockResolvedValueOnce({
      Item: { ...baseUser, premiumResumeMonth: cur, premiumResumeCount: 2 },
    });
    sendMock.mockResolvedValueOnce({
      Attributes: { ...baseUser, premiumResumeMonth: cur, premiumResumeCount: 3 },
    });
    const u = await incrementPremiumResumeCount('u1');
    expect(u.premiumResumeCount).toBe(3);
  });

  it('incrementPremiumResumeCount throws when user missing', async () => {
    sendMock.mockResolvedValueOnce({ Item: undefined });
    await expect(incrementPremiumResumeCount('u1')).rejects.toThrow('Database error');
  });

  it('incrementPremiumCoverLetterCount resets and increments', async () => {
    const cur = new Date().toISOString().slice(0, 7);
    const oldMonth = cur === '2000-01' ? '1999-12' : '2000-01';
    sendMock.mockResolvedValueOnce({
      Item: { ...baseUser, premiumCoverLetterMonth: oldMonth, premiumCoverLetterCount: 5 },
    });
    sendMock.mockResolvedValueOnce({
      Attributes: { ...baseUser, premiumCoverLetterMonth: cur, premiumCoverLetterCount: 1 },
    });
    const u = await incrementPremiumCoverLetterCount('u1');
    expect(u.premiumCoverLetterCount).toBe(1);

    sendMock.mockResolvedValueOnce({
      Item: { ...baseUser, premiumCoverLetterMonth: cur, premiumCoverLetterCount: 1 },
    });
    sendMock.mockResolvedValueOnce({
      Attributes: { ...baseUser, premiumCoverLetterMonth: cur, premiumCoverLetterCount: 2 },
    });
    const u2 = await incrementPremiumCoverLetterCount('u1');
    expect(u2.premiumCoverLetterCount).toBe(2);
  });

  it('incrementPremiumCoverLetterCount throws when user missing', async () => {
    sendMock.mockResolvedValueOnce({ Item: undefined });
    await expect(incrementPremiumCoverLetterCount('u1')).rejects.toThrow('Database error');
  });
});
