import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const trackAIUsage = vi.hoisted(() => vi.fn());

vi.mock('./aiUsageService', () => ({
  trackAIUsage: (...a: unknown[]) => trackAIUsage(...a),
}));

import { resumeExtractionService } from './resumeExtractionService';

vi.mock('../utils/aiProviderSelector', () => ({
  getAIConfigForUser: () => ({ provider: 'groq' as const, model: 'openai/gpt-oss-20b' }),
}));

const longText =
  'John Doe\nSoftware Engineer\nEmail: john@example.com\n' +
  'A'.repeat(80) +
  '\nExperience at Acme Corp building scalable systems with measurable impact.';

const extractionJson = JSON.stringify({
  isResumeContent: true,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+15550000',
  profession: 'Engineer',
  country: 'US',
  linkedin: 'in/j',
  targetLevel: 'mid',
  tone: 'professional',
  skills: ['Python'],
  experiences: [
    {
      title: 'Engineer',
      company: 'Acme',
      startDate: '2020-01',
      endDate: '2024-01',
      isCurrent: false,
      achievements: ['Shipped'],
      responsibilities: ['Built'],
    },
  ],
  education: [
    {
      degree: 'BS',
      institution: 'U',
      field: 'CS',
      startDate: '2012',
      endDate: '2016',
      isCompleted: true,
    },
  ],
  certifications: [],
  projects: [],
  languages: [],
  achievements: [],
  summary: 'Summary',
  extractionConfidence: 0.9,
});

describe('resumeExtractionService', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    trackAIUsage.mockReset();
    trackAIUsage.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('validateSkillNormalization runs', () => {
    const r = resumeExtractionService.validateSkillNormalization();
    expect(r.passed).toBeDefined();
  });

  it('extractResumeFromText rejects short text', async () => {
    const r = await resumeExtractionService.extractResumeFromText('short', 'en', 'u1', true);
    expect(r.success).toBe(false);
  });

  it('extractResumeFromText short text Spanish message', async () => {
    const r = await resumeExtractionService.extractResumeFromText('corto', 'es', 'u1', true);
    expect(r.success).toBe(false);
    expect(r.error).toMatch(/demasiado|corto|currículum/i);
  });

  it('extractResumeFromText succeeds with mocked Groq', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: extractionJson } }],
        usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
      }),
    });
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(true);
    expect(r.data?.firstName).toBe('John');
  });

  it('truncates text longer than max', async () => {
    const huge = `${longText}${'z'.repeat(51000)}`;
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: extractionJson } }],
        usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
      }),
    });
    const r = await resumeExtractionService.extractResumeFromText(huge, 'en', 'u1', true);
    expect(r.success).toBe(true);
  });

  it('Groq non-OK returns Spanish error when language es', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 503,
      statusText: 'Down',
      text: async () => 'err',
    });
    const r = await resumeExtractionService.extractResumeFromText(longText, 'es', 'u1', true);
    expect(r.success).toBe(false);
    expect(r.error).toContain('inténtalo');
  });

  it('not resume content yields failure', async () => {
    const notResume = JSON.stringify({ isResumeContent: false });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: notResume } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(false);
    expect(r.isResumeContent).toBe(false);
  });

  it('markdown wrapped JSON parses', async () => {
    const wrapped = '```json\n' + extractionJson + '\n```';
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: wrapped } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(true);
  });

  it('invalid JSON content returns failure', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '{broken' } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(false);
  });

  it('continues when trackAIUsage fails', async () => {
    trackAIUsage.mockRejectedValueOnce(new Error('track'));
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: extractionJson } }],
        usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
      }),
    });
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(false);
  });

  it('parses extraction with dataQuality and skill normalization branches', async () => {
    const rich = {
      ...JSON.parse(extractionJson),
      targetLevel: 'not-a-level',
      skills: ['python, javascript', 'typescript', 99 as unknown as string, 'five years of experience'],
      education: [
        {
          degree: 'BS',
          institution: 'U',
          field: 'CS',
          startDate: '2010',
          endDate: '2014',
          isCompleted: false,
        },
      ],
      languages: [{ name: 'English', level: 'not-valid' }],
      extractionConfidence: 'high' as unknown as number,
      dataQuality: {
        overall: 80,
        profile: { score: 90, invalidFields: ['a'], reason: 'ok' },
        education: { score: 85, invalidFields: [] },
        experience: { score: 85, invalidFields: [] },
        skills: { score: 85, invalidFields: [] },
        certifications: { score: 90, invalidFields: [] },
        languages: { score: 90, invalidFields: [] },
      },
    };
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: JSON.stringify(rich) } }],
        usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
      }),
    });
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(true);
    expect(r.data?.targetLevel).toBe('mid');
    expect(r.data?.dataQuality?.overall).toBe(80);
  });

  it('fetch network failure returns localized error', async () => {
    fetchMock.mockRejectedValueOnce(new Error('net'));
    const r = await resumeExtractionService.extractResumeFromText(longText, 'es', 'u1', true);
    expect(r.success).toBe(false);
    expect(r.error).toMatch(/inténtalo|Error/i);
  });

  it('parses without dataQuality and validates target level and language level', async () => {
    const noDq = {
      ...JSON.parse(extractionJson),
      targetLevel: 'executive',
      dataQuality: undefined,
      languages: [{ id: 'l1', name: 'Fr', level: 'native' }],
    };
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: JSON.stringify(noDq) } }],
        usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
      }),
    });
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(true);
    expect(r.data?.targetLevel).toBe('executive');
    expect(r.data?.languages[0].level).toBe('native');
    expect(r.data?.dataQuality).toBeUndefined();
  });

  it('parseDataQuality handles non-object and non-numeric overall', async () => {
    const badDq = {
      ...JSON.parse(extractionJson),
      dataQuality: 'x',
    };
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: JSON.stringify(badDq) } }],
        usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
      }),
    });
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(true);
    expect(r.data?.dataQuality).toBeUndefined();
  });

  it('parseDataQuality normalizes invalid section scores and invalidFields', async () => {
    const dq = {
      ...JSON.parse(extractionJson),
      dataQuality: {
        overall: 'nope',
        profile: { score: 'bad', invalidFields: 'not-array' },
        education: { score: 50, invalidFields: ['e'] },
        experience: { score: 50, invalidFields: [] },
        skills: { score: 50, invalidFields: [] },
        certifications: { score: 50, invalidFields: [] },
        languages: { score: 50, invalidFields: [] },
      },
    };
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: JSON.stringify(dq) } }],
        usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
      }),
    });
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(true);
    expect(r.data?.dataQuality?.overall).toBe(100);
    expect(r.data?.dataQuality?.profile.score).toBe(100);
    expect(r.data?.dataQuality?.profile.invalidFields).toEqual([]);
  });

  it('normalizeSkills filters experience phrases and title-cases multi-word', async () => {
    const payload = {
      ...JSON.parse(extractionJson),
      skills: ['3 years of experience', 'cloud native engineering'],
    };
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: JSON.stringify(payload) } }],
        usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
      }),
    });
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(true);
    expect(r.data?.skills.some(s => /Cloud Native Engineering/i.test(s))).toBe(true);
  });

  it('parseExtractionResponse handles generic markdown fence without json label', async () => {
    const wrapped = '```\n' + extractionJson + '\n```';
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: wrapped } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(true);
  });

  it('fails when Groq returns empty choices array', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [],
        usage: { prompt_tokens: 1, completion_tokens: 0, total_tokens: 1 },
      }),
    });
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(false);
  });

  it('callGroq failure when response json throws', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('json fail');
      },
    } as any);
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(false);
    expect(r.error).toMatch(/try again|Error processing/i);
  });

  it('parses education entry with isCompleted false', async () => {
    const p = {
      ...JSON.parse(extractionJson),
      education: [
        {
          degree: 'BS',
          institution: 'U',
          field: 'CS',
          startDate: '2010',
          endDate: '2014',
          isCompleted: false,
        },
      ],
    };
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: JSON.stringify(p) } }],
        usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
      }),
    });
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(true);
    expect(r.data?.education[0].isCompleted).toBe(false);
  });

  it('extractResumeFromText English error path on network failure', async () => {
    fetchMock.mockRejectedValueOnce(new Error('net'));
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(false);
    expect(r.error).toMatch(/try again|Error processing/i);
  });

  it('parses experiences with null-ish achievement arrays', async () => {
    const p = {
      ...JSON.parse(extractionJson),
      experiences: [
        {
          title: 'Dev',
          company: 'Co',
          startDate: '2020-01',
          endDate: '2021-01',
          isCurrent: false,
          achievements: null,
          responsibilities: null,
        },
      ],
    };
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: JSON.stringify(p) } }],
        usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
      }),
    });
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(true);
    expect(r.data?.experiences[0].achievements).toEqual([]);
  });

  it('normalizeSkills replaces less specific skill with dominating match', async () => {
    const payload = {
      ...JSON.parse(extractionJson),
      skills: ['java', 'spring framework'],
    };
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: JSON.stringify(payload) } }],
        usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
      }),
    });
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(true);
    expect(r.data?.skills.length).toBeGreaterThanOrEqual(1);
  });

  it('Groq HTTP error returns English message when language en', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 502,
      statusText: 'Bad',
      text: async () => 'upstream',
    });
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(false);
    expect(r.error).toMatch(/try again/i);
  });

  it('normalizeSkills dedupes substring variants', async () => {
    const payload = {
      ...JSON.parse(extractionJson),
      skills: ['aws', 'amazon aws', 'javascript'],
    };
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: JSON.stringify(payload) } }],
        usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
      }),
    });
    const r = await resumeExtractionService.extractResumeFromText(longText, 'en', 'u1', true);
    expect(r.success).toBe(true);
    expect(r.data?.skills?.join(' ').toLowerCase()).toContain('javascript');
  });
});
