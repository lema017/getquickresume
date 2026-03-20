import { describe, it, expect, vi, beforeEach } from 'vitest';

const sendMock = vi.hoisted(() => vi.fn());
const getUserById = vi.hoisted(() => vi.fn());
const generateProfessionSuggestions = vi.hoisted(() => vi.fn());

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
    DynamoDBDocumentClient: {
      from: () => ({ send: sendMock }),
    },
    GetCommand,
    PutCommand,
  };
});

vi.mock('./dynamodb', () => ({ getUserById }));
vi.mock('./aiService', () => ({
  aiService: { generateProfessionSuggestions },
}));

import { suggestionService } from './suggestionService';

const ctx = { authorizer: { userId: 'u1' } };

const aiPayload = {
  es: { skills: ['a', 'b'] },
  en: { skills: ['c', 'd'] },
};

describe('suggestionService', () => {
  beforeEach(() => {
    sendMock.mockReset();
    getUserById.mockReset();
    generateProfessionSuggestions.mockReset();
    getUserById.mockResolvedValue({
      id: 'u1',
      email: 'e@test.com',
      firstName: 'A',
      lastName: 'B',
      provider: 'google',
      isPremium: false,
      freeResumeUsed: false,
      premiumResumeCount: 0,
      premiumResumeMonth: '2026-03',
      freeDownloadUsed: false,
      totalDownloads: 0,
      freeCoverLetterUsed: false,
      premiumCoverLetterCount: 0,
      premiumCoverLetterMonth: '2026-03',
      createdAt: 't',
      updatedAt: 't',
    } as any);
    generateProfessionSuggestions.mockResolvedValue(aiPayload);
  });

  it('getSuggestionsByProfession returns null or item', async () => {
    sendMock.mockResolvedValueOnce({});
    await expect(suggestionService.getSuggestionsByProfession('  Dev  ')).resolves.toBeNull();

    sendMock.mockResolvedValueOnce({
      Item: {
        profession: 'dev',
        suggestions: { es: { skills: ['x'] }, en: { skills: ['y'] } },
        createdAt: 't',
        updatedAt: 't',
        generatedBy: 'ai',
      },
    });
    const row = await suggestionService.getSuggestionsByProfession('Dev');
    expect(row?.profession).toBe('dev');
  });

  it('generateAndSaveSuggestions saves and returns', async () => {
    sendMock.mockResolvedValueOnce({});
    const r = await suggestionService.generateAndSaveSuggestions('Nurse', ctx);
    expect(r.suggestions.en.skills.length).toBeGreaterThan(0);
  });

  it('generateAndSaveSuggestions propagates INVALID_PROFESSION', async () => {
    generateProfessionSuggestions.mockRejectedValueOnce(
      Object.assign(new Error('bad'), { code: 'INVALID_PROFESSION' })
    );
    await expect(suggestionService.generateAndSaveSuggestions('x', ctx)).rejects.toMatchObject({
      code: 'INVALID_PROFESSION',
    });
  });

  it('saveSuggestions merges tools', async () => {
    sendMock.mockResolvedValueOnce({});
    const r = await suggestionService.saveSuggestions('chef', ['knife'], ['pan']);
    expect(r.suggestions.es.skills).toContain('pan');
  });

  it('getSuggestions premium regenerates', async () => {
    getUserById.mockResolvedValueOnce({
      id: 'u1',
      email: 'e@test.com',
      firstName: 'A',
      lastName: 'B',
      provider: 'google',
      isPremium: true,
      freeResumeUsed: false,
      premiumResumeCount: 0,
      premiumResumeMonth: '2026-03',
      freeDownloadUsed: false,
      totalDownloads: 0,
      freeCoverLetterUsed: false,
      premiumCoverLetterCount: 0,
      premiumCoverLetterMonth: '2026-03',
      createdAt: 't',
      updatedAt: 't',
    } as any);
    sendMock.mockResolvedValueOnce({});
    const r = await suggestionService.getSuggestions('Teacher', 'en', ctx);
    expect(r.fromCache).toBe(false);
    expect(r.skills.length).toBeGreaterThan(0);
  });

  it('getSuggestions free uses cache when present', async () => {
    sendMock.mockResolvedValueOnce({
      Item: {
        profession: 'plumber',
        suggestions: { es: { skills: ['pipe'] }, en: { skills: ['wrench'] } },
        createdAt: 't',
        updatedAt: 't',
        generatedBy: 'ai',
      },
    });
    const r = await suggestionService.getSuggestions('Plumber', 'en', ctx);
    expect(r.fromCache).toBe(true);
    expect(r.skills).toContain('wrench');
  });

  it('getSuggestions free generates when cache miss', async () => {
    sendMock.mockResolvedValueOnce({});
    sendMock.mockResolvedValueOnce({});
    const r = await suggestionService.getSuggestions('Electrician', 'es', ctx);
    expect(r.fromCache).toBe(false);
  });

  it('getSuggestions invalid language', async () => {
    await expect(suggestionService.getSuggestions('x', 'fr', ctx)).rejects.toThrow();
  });

  it('getSuggestions throws when user missing', async () => {
    getUserById.mockResolvedValueOnce(null);
    await expect(suggestionService.getSuggestions('x', 'en', ctx)).rejects.toThrow();
  });

  it('getSuggestions throws when generateAndSaveSuggestions returns invalid shape', async () => {
    getUserById.mockResolvedValueOnce({
      id: 'u1',
      email: 'e@test.com',
      firstName: 'A',
      lastName: 'B',
      provider: 'google',
      isPremium: true,
      freeResumeUsed: false,
      premiumResumeCount: 0,
      premiumResumeMonth: '2026-03',
      freeDownloadUsed: false,
      totalDownloads: 0,
      freeCoverLetterUsed: false,
      premiumCoverLetterCount: 0,
      premiumCoverLetterMonth: '2026-03',
      createdAt: 't',
      updatedAt: 't',
    } as any);
    const spy = vi.spyOn(suggestionService as any, 'generateAndSaveSuggestions').mockResolvedValueOnce({
      profession: 'chef',
      suggestions: null,
      createdAt: 't',
      updatedAt: 't',
      generatedBy: 'ai',
    });
    await expect(suggestionService.getSuggestions('Chef', 'en', ctx)).rejects.toThrow('Failed to get suggestions');
    spy.mockRestore();
  });

  it('getSuggestions migrates legacy tools array from cache', async () => {
    sendMock.mockResolvedValueOnce({
      Item: {
        profession: 'cook',
        suggestions: {
          es: { skills: ['knife'], tools: ['oven'] },
          en: { skills: ['grill'], tools: ['timer'] },
        },
        createdAt: 't',
        updatedAt: 't',
        generatedBy: 'ai',
      },
    });
    const r = await suggestionService.getSuggestions('Cook', 'en', ctx);
    expect(r.fromCache).toBe(true);
    expect(r.skills.some((s) => s === 'timer' || s === 'grill')).toBe(true);
  });

  it('getSuggestionsByProfession throws on DynamoDB error', async () => {
    sendMock.mockRejectedValueOnce(new Error('ddb'));
    await expect(suggestionService.getSuggestionsByProfession('x')).rejects.toThrow('Database error');
  });

  it('generateAndSaveSuggestions wraps non INVALID_PROFESSION errors', async () => {
    generateProfessionSuggestions.mockRejectedValueOnce(new Error('ai down'));
    await expect(suggestionService.generateAndSaveSuggestions('Role', ctx)).rejects.toThrow(
      'Failed to generate bilingual suggestions'
    );
  });

  it('saveBilingualSuggestions throws on put failure', async () => {
    sendMock.mockRejectedValueOnce(new Error('put'));
    await expect(
      suggestionService.saveBilingualSuggestions('chef', { es: { skills: ['a'] }, en: { skills: ['b'] } })
    ).rejects.toThrow('Database error');
  });

  it('saveSuggestions throws on put failure', async () => {
    sendMock.mockRejectedValueOnce(new Error('put'));
    await expect(suggestionService.saveSuggestions('chef', ['a'], ['b'])).rejects.toThrow('Database error');
  });

  it('saveSuggestions skips duplicate tools already in skills', async () => {
    sendMock.mockResolvedValueOnce({});
    const r = await suggestionService.saveSuggestions('chef', ['pan', 'knife'], ['knife', 'pot']);
    expect(r.suggestions.es.skills).toEqual(['pan', 'knife', 'pot']);
  });

  it('getSuggestions premium throws when language missing in AI response', async () => {
    getUserById.mockResolvedValueOnce({
      id: 'u1',
      email: 'e@test.com',
      firstName: 'A',
      lastName: 'B',
      provider: 'google',
      isPremium: true,
      freeResumeUsed: false,
      premiumResumeCount: 0,
      premiumResumeMonth: '2026-03',
      freeDownloadUsed: false,
      totalDownloads: 0,
      freeCoverLetterUsed: false,
      premiumCoverLetterCount: 0,
      premiumCoverLetterMonth: '2026-03',
      createdAt: 't',
      updatedAt: 't',
    } as any);
    const spy = vi.spyOn(suggestionService as any, 'generateAndSaveSuggestions').mockResolvedValueOnce({
      profession: 'onlyes',
      suggestions: { es: { skills: ['a'] } },
      createdAt: 't',
      updatedAt: 't',
      generatedBy: 'ai',
    });
    await expect(suggestionService.getSuggestions('OnlyEs', 'en', ctx)).rejects.toThrow(
      'Failed to get suggestions'
    );
    spy.mockRestore();
  });

  it('getSuggestions propagates INVALID_PROFESSION', async () => {
    getUserById.mockResolvedValueOnce({
      id: 'u1',
      email: 'e@test.com',
      firstName: 'A',
      lastName: 'B',
      provider: 'google',
      isPremium: true,
      freeResumeUsed: false,
      premiumResumeCount: 0,
      premiumResumeMonth: '2026-03',
      freeDownloadUsed: false,
      totalDownloads: 0,
      freeCoverLetterUsed: false,
      premiumCoverLetterCount: 0,
      premiumCoverLetterMonth: '2026-03',
      createdAt: 't',
      updatedAt: 't',
    } as any);
    const spy = vi.spyOn(suggestionService as any, 'generateAndSaveSuggestions').mockRejectedValueOnce(
      Object.assign(new Error('bad'), { code: 'INVALID_PROFESSION' })
    );
    await expect(suggestionService.getSuggestions('Bad', 'en', ctx)).rejects.toMatchObject({
      code: 'INVALID_PROFESSION',
    });
    spy.mockRestore();
  });
});
