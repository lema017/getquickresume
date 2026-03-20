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
  class DeleteCommand {
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
    DeleteCommand,
  };
});

import {
  createCoverLetter,
  getCoverLettersByUserId,
  getCoverLetterById,
  updateCoverLetter,
  deleteCoverLetter,
  updateCoverLetterWithGenerated,
  updateCoverLetterAICost,
} from './coverLetterService';

const data = {
  companyName: 'Acme',
  jobTitle: 'Eng',
  fullName: 'Jane',
  language: 'en' as const,
  tone: 'professional' as const,
  length: 'concise' as const,
};

describe('coverLetterService', () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it('createCoverLetter puts item', async () => {
    sendMock.mockResolvedValueOnce({});
    const cl = await createCoverLetter('u1', data, 'My title');
    expect(cl.userId).toBe('u1');
    expect(cl.title).toBe('My title');
  });

  it('createCoverLetter default title from company and job', async () => {
    sendMock.mockResolvedValueOnce({});
    const cl = await createCoverLetter('u1', data);
    expect(cl.title).toContain('Acme');
  });

  it('getCoverLettersByUserId maps items', async () => {
    sendMock.mockResolvedValueOnce({
      Items: [
        {
          userId: 'u1',
          coverLetterId: 'c1',
          data,
          status: 'draft',
          aiCost: { totalInputTokens: 0, totalOutputTokens: 0, totalCostUSD: 0 },
          createdAt: 't',
          updatedAt: 't',
        },
      ],
    });
    const list = await getCoverLettersByUserId('u1');
    expect(list[0].id).toBe('c1');
  });

  it('getCoverLettersByUserId empty Items', async () => {
    sendMock.mockResolvedValueOnce({});
    await expect(getCoverLettersByUserId('u1')).resolves.toEqual([]);
  });

  it('propagates database errors', async () => {
    sendMock.mockRejectedValueOnce(new Error('ddb'));
    await expect(createCoverLetter('u1', data)).rejects.toThrow('Database error');
    sendMock.mockRejectedValueOnce(new Error('ddb'));
    await expect(getCoverLettersByUserId('u1')).rejects.toThrow('Database error');
    sendMock.mockRejectedValueOnce(new Error('ddb'));
    await expect(getCoverLetterById('u1', 'c')).rejects.toThrow('Database error');
  });

  it('getCoverLetterById returns null or letter', async () => {
    sendMock.mockResolvedValueOnce({});
    await expect(getCoverLetterById('u1', 'x')).resolves.toBeNull();

    sendMock.mockResolvedValueOnce({
      Item: {
        userId: 'u1',
        coverLetterId: 'c2',
        data,
        status: 'draft',
        aiCost: { totalInputTokens: 0, totalOutputTokens: 0, totalCostUSD: 0 },
        createdAt: 't',
        updatedAt: 't',
      },
    });
    const one = await getCoverLetterById('u1', 'c2');
    expect(one?.id).toBe('c2');
  });

  it('updateCoverLetter updates fields', async () => {
    sendMock.mockResolvedValueOnce({
      Attributes: {
        userId: 'u1',
        coverLetterId: 'c3',
        data,
        status: 'draft',
        aiCost: { totalInputTokens: 0, totalOutputTokens: 0, totalCostUSD: 0 },
        createdAt: 't',
        updatedAt: 't',
      },
    });
    const u = await updateCoverLetter('u1', 'c3', { status: 'generated' });
    expect(u.id).toBe('c3');
  });

  it('updateCoverLetter throws when only updatedAt', async () => {
    await expect(updateCoverLetter('u1', 'c3', {})).rejects.toThrow('Database error');
  });

  it('deleteCoverLetter sends delete', async () => {
    sendMock.mockResolvedValueOnce({});
    await expect(deleteCoverLetter('u1', 'c1')).resolves.toBeUndefined();
  });

  it('updateCoverLetterWithGenerated', async () => {
    const gen = {
      id: 'g1',
      paragraphs: [],
      createdAt: 't',
      updatedAt: 't',
    };
    sendMock.mockResolvedValueOnce({
      Attributes: {
        userId: 'u1',
        coverLetterId: 'c4',
        data,
        generatedContent: gen,
        status: 'generated',
        aiCost: { totalInputTokens: 0, totalOutputTokens: 0, totalCostUSD: 0 },
        createdAt: 't',
        updatedAt: 't',
      },
    });
    const r = await updateCoverLetterWithGenerated('u1', 'c4', gen as any);
    expect(r.id).toBe('c4');
  });

  it('updateCoverLetterAICost is non-throwing', async () => {
    sendMock.mockResolvedValueOnce({
      Item: {
        userId: 'u1',
        coverLetterId: 'c5',
        aiCost: { totalInputTokens: 1, totalOutputTokens: 2, totalCostUSD: 0.01 },
      },
    });
    sendMock.mockResolvedValueOnce({});
    await expect(updateCoverLetterAICost('u1', 'c5', 10, 20, 0.02)).resolves.toBeUndefined();
  });

  it('updateCoverLetter maps dynamo failure to Database error', async () => {
    sendMock.mockRejectedValueOnce(new Error('ddb'));
    await expect(updateCoverLetter('u1', 'c9', { status: 'draft' })).rejects.toThrow('Database error');
  });

  it('deleteCoverLetter maps dynamo failure to Database error', async () => {
    sendMock.mockRejectedValueOnce(new Error('ddb'));
    await expect(deleteCoverLetter('u1', 'c9')).rejects.toThrow('Database error');
  });

  it('updateCoverLetterWithGenerated rethrows original error', async () => {
    sendMock.mockRejectedValueOnce(new Error('conditional'));
    await expect(
      updateCoverLetterWithGenerated('u1', 'c9', {
        id: 'g',
        paragraphs: [],
        createdAt: 't',
        updatedAt: 't',
      } as any)
    ).rejects.toThrow('conditional');
  });

  it('updateCoverLetterAICost swallows errors when letter missing', async () => {
    sendMock.mockResolvedValueOnce({});
    await expect(updateCoverLetterAICost('u1', 'missing', 1, 1, 0)).resolves.toBeUndefined();
  });

  it('updateCoverLetterAICost swallows update errors', async () => {
    sendMock.mockResolvedValueOnce({
      Item: {
        userId: 'u1',
        coverLetterId: 'c5',
        aiCost: { totalInputTokens: 0, totalOutputTokens: 0, totalCostUSD: 0 },
      },
    });
    sendMock.mockRejectedValueOnce(new Error('ddb'));
    await expect(updateCoverLetterAICost('u1', 'c5', 1, 1, 0)).resolves.toBeUndefined();
  });
});
