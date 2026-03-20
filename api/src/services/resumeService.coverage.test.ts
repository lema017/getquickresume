import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ResumeData, GeneratedResume, ResumeScore } from '../types';

const stubResumeData = {
  firstName: 'A',
  lastName: 'B',
} as ResumeData;

const sendMock = vi.hoisted(() => vi.fn());

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
  class QueryCommand {
    constructor(public input: unknown) {}
  }
  class UpdateCommand {
    constructor(public input: unknown) {}
  }
  class DeleteCommand {
    constructor(public input: unknown) {}
  }
  return {
    DynamoDBDocumentClient: {
      from: () => ({ send: sendMock }),
    },
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand,
    DeleteCommand,
  };
});

import {
  createResume,
  getResumesByUserId,
  getResumeById,
  verifyResumeOwnership,
  updateResume,
  deleteResume,
  updateResumeWithGenerated,
  updateResumeWithScore,
  getResumeScore,
  getResumeByShareToken,
} from './resumeService';

const minimalResumeData = stubResumeData;
const minimalGenerated = {
  metadata: { generatedAt: 'g', tokensUsed: 1, aiProvider: 'x', model: 'm' },
} as GeneratedResume;
const minimalScore = {
  totalScore: 8,
  maxPossibleScore: 10,
  completionPercentage: 80,
  isOptimized: true,
  breakdown: {},
  checklist: {},
  enhancementHistory: [],
  strengths: [],
  improvements: [],
  generatedAt: 'now',
  scoringVersion: '1.0',
} as ResumeScore;

describe('resumeService', () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it('createResume persists and returns resume', async () => {
    sendMock.mockResolvedValueOnce({});
    const r = await createResume('u1', minimalResumeData, 'My CV');
    expect(r.userId).toBe('u1');
    expect(r.title).toBe('My CV');
    expect(r.status).toBe('draft');
  });

  it('createResume uses default title', async () => {
    sendMock.mockResolvedValueOnce({});
    const r = await createResume('u1', minimalResumeData);
    expect(r.title).toContain('A');
  });

  it('createResume throws on db error', async () => {
    sendMock.mockRejectedValueOnce(new Error('ddb'));
    await expect(createResume('u1', minimalResumeData)).rejects.toThrow('Database error');
  });

  it('getResumesByUserId maps items', async () => {
    sendMock.mockResolvedValueOnce({
      Items: [{ resumeId: 'r1', userId: 'u1', title: 'T' }],
    });
    const list = await getResumesByUserId('u1');
    expect(list[0].id).toBe('r1');
  });

  it('getResumesByUserId empty', async () => {
    sendMock.mockResolvedValueOnce({});
    expect(await getResumesByUserId('u1')).toEqual([]);
  });

  it('getResumesByUserId throws', async () => {
    sendMock.mockRejectedValueOnce(new Error('x'));
    await expect(getResumesByUserId('u1')).rejects.toThrow('Database error');
  });

  it('getResumeById returns resume', async () => {
    sendMock.mockResolvedValueOnce({
      Item: { resumeId: 'r1', userId: 'u1', title: 'T' },
    });
    const r = await getResumeById('u1', 'r1');
    expect(r?.id).toBe('r1');
  });

  it('getResumeById null', async () => {
    sendMock.mockResolvedValueOnce({});
    expect(await getResumeById('u1', 'r1')).toBeNull();
  });

  it('getResumeById throws', async () => {
    sendMock.mockRejectedValueOnce(new Error('x'));
    await expect(getResumeById('u1', 'r1')).rejects.toThrow('Database error');
  });

  it('verifyResumeOwnership true/false', async () => {
    sendMock.mockResolvedValueOnce({
      Item: { resumeId: 'r1', userId: 'u1' },
    });
    expect(await verifyResumeOwnership('u1', 'r1')).toBe(true);
    sendMock.mockResolvedValueOnce({});
    expect(await verifyResumeOwnership('u1', 'r2')).toBe(false);
  });

  it('verifyResumeOwnership false on error', async () => {
    sendMock.mockRejectedValueOnce(new Error('x'));
    expect(await verifyResumeOwnership('u1', 'r1')).toBe(false);
  });

  it('updateResume applies dynamic fields', async () => {
    sendMock.mockResolvedValueOnce({
      Attributes: { resumeId: 'r1', userId: 'u1', title: 'New', updatedAt: 't' },
    });
    const r = await updateResume('u1', 'r1', { title: 'New' });
    expect(r.title).toBe('New');
  });

  it('updateResume throws when no fields (wrapped as database error)', async () => {
    await expect(updateResume('u1', 'r1', {})).rejects.toThrow('Database error');
  });

  it('updateResume throws on db', async () => {
    sendMock.mockRejectedValueOnce(new Error('x'));
    await expect(updateResume('u1', 'r1', { title: 'x' })).rejects.toThrow('Database error');
  });

  it('deleteResume', async () => {
    sendMock.mockResolvedValueOnce({});
    await deleteResume('u1', 'r1');
  });

  it('deleteResume throws', async () => {
    sendMock.mockRejectedValueOnce(new Error('x'));
    await expect(deleteResume('u1', 'r1')).rejects.toThrow('Database error');
  });

  it('updateResumeWithGenerated', async () => {
    sendMock.mockResolvedValueOnce({
      Attributes: {
        resumeId: 'r1',
        userId: 'u1',
        generatedResume: minimalGenerated,
        status: 'generated',
      },
    });
    const r = await updateResumeWithGenerated('u1', 'r1', minimalGenerated);
    expect(r.status).toBe('generated');
  });

  it('updateResumeWithGenerated rethrows', async () => {
    sendMock.mockRejectedValueOnce(Object.assign(new Error('e'), { name: 'E', code: 'C' }));
    await expect(updateResumeWithGenerated('u1', 'r1', minimalGenerated)).rejects.toThrow('e');
  });

  it('updateResumeWithScore', async () => {
    sendMock.mockResolvedValueOnce({
      Attributes: { resumeId: 'r1', userId: 'u1', score: minimalScore },
    });
    const r = await updateResumeWithScore('u1', 'r1', minimalScore);
    expect(r.score?.totalScore).toBe(8);
  });

  it('updateResumeWithScore rethrows', async () => {
    sendMock.mockRejectedValueOnce(new Error('z'));
    await expect(updateResumeWithScore('u1', 'r1', minimalScore)).rejects.toThrow('z');
  });

  it('getResumeScore returns null or score', async () => {
    sendMock.mockResolvedValueOnce({ Item: null });
    expect(await getResumeScore('u1', 'r1')).toBeNull();
    sendMock.mockResolvedValueOnce({
      Item: { resumeId: 'r1', score: minimalScore },
    });
    expect((await getResumeScore('u1', 'r1'))?.totalScore).toBe(8);
  });

  it('getResumeScore rethrows getResumeById failure as Database error', async () => {
    sendMock.mockRejectedValueOnce(new Error('q'));
    await expect(getResumeScore('u1', 'r1')).rejects.toThrow('Database error');
  });

  it('getResumeByShareToken', async () => {
    sendMock.mockResolvedValueOnce({
      Items: [{ resumeId: 'r1', shareToken: 't', isPubliclyShared: true }],
    });
    const r = await getResumeByShareToken('t');
    expect(r?.id).toBe('r1');
  });

  it('getResumeByShareToken empty', async () => {
    sendMock.mockResolvedValueOnce({ Items: [] });
    expect(await getResumeByShareToken('t')).toBeNull();
  });

  it('getResumeByShareToken throws', async () => {
    sendMock.mockRejectedValueOnce(new Error('x'));
    await expect(getResumeByShareToken('t')).rejects.toThrow('Database error');
  });
});
