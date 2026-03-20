import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const trackAIUsage = vi.hoisted(() => vi.fn());

vi.mock('./aiUsageService', () => ({
  trackAIUsage: (...a: unknown[]) => trackAIUsage(...a),
}));

import { contentValidatorService } from './contentValidatorService';

vi.mock('../utils/aiProviderSelector', () => ({
  getAIConfigForUser: () => ({ provider: 'groq' as const, model: 'openai/gpt-oss-20b' }),
}));

const resume = {
  professionalSummary: 'Summary',
  experience: [
    {
      title: 'Dev',
      company: 'Co',
      duration: '2020-2024',
      description: 'Work',
      achievements: [],
      skills: [],
      impact: [],
    },
  ],
  education: [{ degree: 'BS', institution: 'U', field: 'CS', duration: '2010-2014' }],
  skills: { technical: ['Go'], soft: [], tools: [] },
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
  contactInfo: { fullName: 'A B', email: 'a@b.com', phone: '1', location: 'X' },
  metadata: {
    generatedAt: new Date().toISOString(),
    tokensUsed: 1,
    aiProvider: 'groq',
    model: 'm',
  },
} as const;

const validAi = JSON.stringify({
  overall: 88,
  sections: {
    profile: { score: 90, invalidFields: [] },
    education: { score: 85, invalidFields: [] },
    experience: { score: 85, invalidFields: [] },
    skills: { score: 85, invalidFields: [] },
    certifications: { score: 85, invalidFields: [] },
    languages: { score: 85, invalidFields: [] },
  },
  summary: 'Looks good',
});

describe('contentValidatorService', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    trackAIUsage.mockReset();
    trackAIUsage.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('validateContent uses non-premium flag for AI config', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: validAi } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await contentValidatorService.validateContent(resume as any, 'u1', false);
    expect(r.isValid).toBe(true);
  });

  it('handles choice without message content', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{}],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await contentValidatorService.validateContent(resume as any);
    expect(r.overall).toBe(100);
  });

  it('handles Groq response without usage block', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: validAi } }],
      }),
    });
    const r = await contentValidatorService.validateContent(resume as any, 'u1', true);
    expect(r.overall).toBeGreaterThanOrEqual(60);
  });

  it('validateContent parses Groq JSON', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: validAi } }],
        usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3, prompt_tokens_details: {} },
      }),
    });
    const r = await contentValidatorService.validateContent(resume as any, 'u1', true);
    expect(r.overall).toBeGreaterThanOrEqual(60);
    expect(r.isValid).toBe(true);
  });

  it('validateContent returns default on API error', async () => {
    fetchMock.mockRejectedValue(new Error('network'));
    const r = await contentValidatorService.validateContent(resume as any);
    expect(r.overall).toBe(100);
  });

  it('validateContent handles non-Error rejection from fetch', async () => {
    fetchMock.mockRejectedValueOnce('plain string failure');
    const r = await contentValidatorService.validateContent(resume as any, 'u1', true);
    expect(r.overall).toBe(100);
  });

  it('validateContent handles non-Error from trackAIUsage', async () => {
    trackAIUsage.mockImplementationOnce(() => {
      throw 'quota';
    });
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: validAi } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await contentValidatorService.validateContent(resume as any, 'u1', true);
    expect(r.overall).toBe(100);
  });

  it('returns default when AI content is JSON null', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'null' } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await contentValidatorService.validateContent(resume as any);
    expect(r.overall).toBe(100);
  });

  it('shouldValidate', () => {
    expect(contentValidatorService.shouldValidate(resume as any)).toBe(true);
    expect(
      contentValidatorService.shouldValidate({
        ...resume,
        contactInfo: { ...resume.contactInfo, fullName: '' },
        education: [],
        experience: [],
        skills: { technical: [], soft: [], tools: [] },
      } as any)
    ).toBe(false);
  });

  it('validateContent handles Groq HTTP error', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 503,
      text: async () => 'unavailable',
    });
    const r = await contentValidatorService.validateContent(resume as any, 'u1', true);
    expect(r.overall).toBe(100);
    expect(r.summary).toBe('Validation not performed');
  });

  it('validateContent returns default when parse fails', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '{' } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await contentValidatorService.validateContent(resume as any);
    expect(r.overall).toBe(100);
  });

  it('validateContent skips usage tracking without userId', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: validAi } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    await contentValidatorService.validateContent(resume as any);
    expect(trackAIUsage).not.toHaveBeenCalled();
  });

  it('validateContent returns default when usage tracking fails', async () => {
    trackAIUsage.mockRejectedValueOnce(new Error('usage'));
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: validAi } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await contentValidatorService.validateContent(resume as any, 'u1', true);
    expect(r.overall).toBe(100);
  });

  it('validateContent parses markdown-wrapped JSON', async () => {
    const wrapped = '```json\n' + validAi + '\n```';
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: wrapped } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await contentValidatorService.validateContent(resume as any);
    expect(r.overall).toBeGreaterThanOrEqual(60);
  });

  it('validateContent normalizes odd section shapes', async () => {
    const weird = JSON.stringify({
      overall: 55,
      sections: {
        profile: {},
        education: { score: 'x' },
        experience: null,
        skills: { score: 70, invalidFields: [{ field: 'f', value: 'v', isValid: false, reason: 'r' }] },
        certifications: { score: 80 },
        languages: { score: 40, reason: 'issues' },
      },
      summary: 'mixed',
    });
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: weird } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await contentValidatorService.validateContent(resume as any);
    expect(r.sections.profile.score).toBe(100);
    expect(r.overall).toBe(55);
  });

  it('parseValidationResponse strips trailing markdown fence only', async () => {
    const fenced = validAi + '\n```';
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: fenced } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await contentValidatorService.validateContent(resume as any);
    expect(r.overall).toBeGreaterThanOrEqual(60);
  });

  it('parseValidationResponse strips generic markdown fence', async () => {
    const fenced = '```\n' + validAi + '\n```';
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: fenced } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await contentValidatorService.validateContent(resume as any);
    expect(r.overall).toBeGreaterThanOrEqual(60);
  });

  it('normalizes non-string summary to empty string', async () => {
    const badSummary = JSON.stringify({
      overall: 90,
      sections: JSON.parse(validAi).sections,
      summary: 123,
    });
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: badSummary } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await contentValidatorService.validateContent(resume as any);
    expect(r.summary).toBe('');
  });

  it('normalizes non-numeric overall to default bucket', async () => {
    const badOverall = JSON.stringify({
      overall: 'fifty',
      sections: JSON.parse(validAi).sections,
      summary: 'x',
    });
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: badOverall } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await contentValidatorService.validateContent(resume as any);
    expect(r.overall).toBe(100);
    expect(r.isValid).toBe(true);
  });

  it('callGroq maps non-JSON error bodies on HTTP failure', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 502,
      statusText: 'Bad',
      text: async () => 'plain-text-error-not-json',
    });
    const r = await contentValidatorService.validateContent(resume as any, 'u1', true);
    expect(r.summary).toBe('Validation not performed');
  });

  it('returns default when response.json throws', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('json');
      },
    });
    const r = await contentValidatorService.validateContent(resume as any, 'u1', true);
    expect(r.overall).toBe(100);
  });

  it('buildValidationPrompt covers optional resume branches', async () => {
    const rich = {
      ...resume,
      contactInfo: undefined,
      certifications: [{ name: 'AWS', issuer: 'Amazon', date: '2020', skills: [] }],
      languages: [{ language: 'English', level: 'Native' }],
      experience: [
        {
          title: 'Dev',
          company: 'Co',
          duration: '2020-2024',
          description: 'x'.repeat(250),
          achievements: [],
          skills: [],
          impact: [],
        },
      ],
      skills: { technical: ['Go'], soft: ['Leadership'], tools: ['Git'] },
    };
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: validAi } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await contentValidatorService.validateContent(rich as any);
    expect(r.overall).toBeGreaterThanOrEqual(60);
  });

  it('clamps overall score outside 0-100', async () => {
    const raw = JSON.stringify({
      overall: 999,
      sections: JSON.parse(validAi).sections,
      summary: 'ok',
    });
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: raw } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const hi = await contentValidatorService.validateContent(resume as any);
    expect(hi.overall).toBe(100);
    const rawLo = JSON.stringify({
      overall: -20,
      sections: JSON.parse(validAi).sections,
      summary: 'ok',
    });
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: rawLo } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const lo = await contentValidatorService.validateContent(resume as any);
    expect(lo.overall).toBe(0);
  });

  it('clamps section scores to 0-100 range', async () => {
    const raw = JSON.stringify({
      overall: 90,
      sections: {
        profile: { score: 200, invalidFields: [] },
        education: { score: -10, invalidFields: [] },
        experience: { score: 90, invalidFields: [] },
        skills: { score: 90, invalidFields: [] },
        certifications: { score: 90, invalidFields: [] },
        languages: { score: 90, invalidFields: [] },
      },
      summary: 'ok',
    });
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: raw } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await contentValidatorService.validateContent(resume as any);
    expect(r.sections.profile.score).toBe(100);
    expect(r.sections.education.score).toBe(0);
    expect(r.sections.education.isValid).toBe(false);
  });

  it('maps invalidFields with explicit isValid false', async () => {
    const withFields = JSON.stringify({
      overall: 90,
      sections: {
        profile: {
          score: 90,
          invalidFields: [
            { field: 'email', value: 'x', isValid: false, reason: 'bad' },
          ],
        },
        education: { score: 90, invalidFields: [] },
        experience: { score: 90, invalidFields: [] },
        skills: { score: 90, invalidFields: [] },
        certifications: { score: 90, invalidFields: [] },
        languages: { score: 90, invalidFields: [] },
      },
      summary: 'ok',
    });
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: withFields } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const r = await contentValidatorService.validateContent(resume as any);
    expect(r.sections.profile.invalidFields[0].isValid).toBe(false);
  });
});
