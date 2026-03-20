import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { GeneratedResume, ResumeData } from '../types';

const getAIConfigForUser = vi.hoisted(() => vi.fn());
const trackAIUsage = vi.hoisted(() => vi.fn());
const fetchMock = vi.hoisted(() => vi.fn());

vi.mock('../utils/aiProviderSelector', () => ({ getAIConfigForUser }));
vi.mock('./aiUsageService', () => ({ trackAIUsage }));

import { translationService } from './translationService';

function rd(): ResumeData {
  return {
    firstName: 'A',
    lastName: 'B',
    country: 'US',
    linkedin: 'x',
    language: 'en',
    targetLevel: 'mid',
    profession: 'Dev',
    tone: 'professional',
    phone: '1',
    email: 'a@b.com',
    skillsRaw: ['Go'],
    experience: [],
    education: [],
    certifications: [],
    projects: [],
    languages: [],
    achievements: [],
    summary: 'S',
    jobDescription: 'J',
    completedSteps: [],
    currentStep: 1,
    totalCharacters: 0,
    lastSaved: new Date().toISOString(),
    firstNamePageNumber: null,
    lastNamePageNumber: null,
    countryPageNumber: null,
    linkedinPageNumber: null,
    languagePageNumber: null,
    targetLevelPageNumber: null,
    professionPageNumber: null,
    tonePageNumber: null,
    phonePageNumber: null,
    emailPageNumber: null,
    summaryPageNumber: null,
    jobDescriptionPageNumber: null,
    skillsPagination: null,
  };
}

function gr(): GeneratedResume {
  return {
    professionalSummary: 'PS',
    experience: [],
    education: [],
    skills: { technical: ['Go'], soft: [], tools: [] },
    projects: [],
    certifications: [],
    achievements: [],
    languages: [],
    contactInfo: { fullName: 'A B', email: 'a@b.com', phone: '1', location: 'US' },
    metadata: {
      generatedAt: new Date().toISOString(),
      tokensUsed: 1,
      aiProvider: 'openai',
      model: 'gpt-4o',
    },
  };
}

function aiJson() {
  const t = {
    translatedResumeData: { ...rd(), summary: 'ES' },
    translatedGeneratedResume: { ...gr(), professionalSummary: 'ES' },
  };
  return JSON.stringify(t);
}

describe('translationService', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    fetchMock.mockReset();
    trackAIUsage.mockReset();
    trackAIUsage.mockResolvedValue(undefined);
    getAIConfigForUser.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('translateResume uses Groq when configured', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'llama' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: aiJson() } }],
        usage: {
          prompt_tokens: 10,
          completion_tokens: 5,
          total_tokens: 15,
          prompt_tokens_details: { cached_tokens: 2 },
        },
      }),
    });
    const out = await translationService.translateResume(rd(), gr(), 'es', {
      userId: 'u1',
      resumeId: 'r1',
      isPremium: true,
    });
    expect(out.translatedResumeData.language).toBe('es');
    expect(trackAIUsage).toHaveBeenCalled();
  });

  it('OpenAI success with minimal usage object', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'openai', model: 'gpt-4o' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: aiJson() } }],
        usage: {},
      }),
    });
    const out = await translationService.translateResume(rd(), gr(), 'es');
    expect(out.translatedResumeData.language).toBe('es');
  });

  it('translateResume uses OpenAI branch', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'openai', model: 'gpt-4o' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: aiJson() } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const out = await translationService.translateResume(rd(), gr(), 'es');
    expect(out.translatedResumeData.language).toBe('es');
  });

  it('translateResume rewrite mode builds different prompt', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: aiJson() } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    await translationService.translateResume(rd(), gr(), 'en', undefined, 'rewrite');
    expect(fetchMock).toHaveBeenCalled();
  });

  it('translateResume handles Groq HTTP error with JSON body', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'llama' });
    fetchMock.mockResolvedValue({
      ok: false,
      status: 429,
      statusText: 'Too Many',
      text: async () => JSON.stringify({ error: { message: 'limit' } }),
    });
    await expect(translationService.translateResume(rd(), gr(), 'es')).rejects.toThrow(
      'Failed to translate resume'
    );
  });

  it('translateResume handles Groq HTTP error with plain text body', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'llama' });
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Err',
      text: async () => 'not-json',
    });
    await expect(translationService.translateResume(rd(), gr(), 'es')).rejects.toThrow(
      'Failed to translate resume'
    );
  });

  it('translateResume handles OpenAI HTTP error', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'openai', model: 'gpt-4o' });
    fetchMock.mockResolvedValue({
      ok: false,
      status: 401,
      text: async () => JSON.stringify({ error: { message: 'bad key' } }),
    });
    await expect(translationService.translateResume(rd(), gr(), 'es')).rejects.toThrow(
      'Failed to translate resume'
    );
  });

  it('OpenAI HTTP error JSON without message uses statusText', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'openai', model: 'gpt-4o' });
    fetchMock.mockResolvedValue({
      ok: false,
      status: 422,
      statusText: 'UnprocessableEntity',
      text: async () => JSON.stringify({ error: {} }),
    });
    await expect(translationService.translateResume(rd(), gr(), 'es')).rejects.toThrow(
      'Failed to translate resume'
    );
  });

  it('Groq HTTP error JSON without message uses statusText in translate path', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'llama' });
    fetchMock.mockResolvedValue({
      ok: false,
      status: 503,
      statusText: 'Service Unavailable',
      text: async () => JSON.stringify({ error: {} }),
    });
    await expect(translationService.translateResume(rd(), gr(), 'es')).rejects.toThrow(
      'Failed to translate resume'
    );
  });

  it('OpenAI HTTP error with non-JSON body uses statusText', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'openai', model: 'gpt-4o' });
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Bad Gateway',
      text: async () => 'not json',
    });
    await expect(translationService.translateResume(rd(), gr(), 'es')).rejects.toThrow(
      'Failed to translate resume'
    );
  });

  it('rejects when parsed JSON missing translatedResumeData only', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify({
                translatedGeneratedResume: gr(),
              }),
            },
          },
        ],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    await expect(translationService.translateResume(rd(), gr(), 'es')).rejects.toThrow(
      'Failed to translate resume'
    );
  });

  it('Groq success omits prompt_tokens_details cached branch', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: aiJson() } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const out = await translationService.translateResume(rd(), gr(), 'pt');
    expect(out.translatedResumeData.language).toBe('pt');
  });

  it('rejects when parsed JSON is not an object', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '"just a string"' } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    await expect(translationService.translateResume(rd(), gr(), 'es')).rejects.toThrow(
      'Failed to translate resume'
    );
  });

  it('rejects when parsed JSON missing translatedGeneratedResume', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: JSON.stringify({ translatedResumeData: rd() }) } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    await expect(translationService.translateResume(rd(), gr(), 'es')).rejects.toThrow(
      'Failed to translate resume'
    );
  });

  it('translateResume fails on parse errors', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '{"broken": true}' } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    await expect(
      translationService.translateResume(rd(), gr(), 'es', {
        userId: 'u',
        resumeId: 'r',
        isPremium: true,
      })
    ).rejects.toThrow('Failed to translate resume');
  });

  it('translateResume wraps failures', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '{"invalid":true}' } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    await expect(translationService.translateResume(rd(), gr(), 'es')).rejects.toThrow(
      'Failed to translate resume'
    );
  });

  it('Groq empty response body throws', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '' } }],
        usage: { prompt_tokens: 1, completion_tokens: 0, total_tokens: 1 },
      }),
    });
    await expect(translationService.translateResume(rd(), gr(), 'es')).rejects.toThrow(
      'Failed to translate resume'
    );
  });

  it('OpenAI empty response throws', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'openai', model: 'gpt-4o' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '  ' } }],
        usage: { prompt_tokens: 1, completion_tokens: 0, total_tokens: 1 },
      }),
    });
    await expect(translationService.translateResume(rd(), gr(), 'fr')).rejects.toThrow(
      'Failed to translate resume'
    );
  });

  it('unknown target language name falls back to code in prompt', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: aiJson() } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const out = await translationService.translateResume(rd(), gr(), 'ko');
    expect(out.translatedResumeData.language).toBe('ko');
  });

  it('sanitize maps string achievements on generated resume', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: aiJson() } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const g = { ...gr(), achievements: ['Award one', 'Award two'] } as GeneratedResume;
    await translationService.translateResume(rd(), g, 'it');
    expect(fetchMock).toHaveBeenCalled();
  });

  it('sanitize handles generated resume without contactInfo', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: aiJson() } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const g = { ...gr(), contactInfo: undefined } as unknown as GeneratedResume;
    await translationService.translateResume(rd(), g, 'de');
    expect(fetchMock).toHaveBeenCalled();
  });

  it('sanitize paths cover nested resumeData and generated resume', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: aiJson() } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const nestedRd = {
      ...rd(),
      experience: [
        {
          id: 'e1',
          title: 'T',
          company: 'C',
          startDate: '2020',
          endDate: '2021',
          isCurrent: false,
          responsibilities: ['a'],
          achievements: ['b'],
          pageNumber: null,
        },
      ],
      projects: [
        {
          id: 'p1',
          name: 'P',
          description: 'D',
          technologies: ['t'],
          achievements: ['x'],
          pageNumber: null,
        },
      ],
      certifications: [{ id: 'c1', name: 'N', issuer: 'I', date: '2020', pageNumber: null }],
      achievements: [{ id: 'a1', title: 'T', description: 'D', pageNumber: null }],
      languages: [{ id: 'l1', name: 'English', level: 'Native', pageNumber: null }],
    };
    const nestedGr = {
      ...gr(),
      experience: [
        {
          title: 'Dev',
          company: 'Co',
          duration: '2020-2024',
          description: 'Work',
          achievements: ['Shipped'],
          skills: ['Go'],
          impact: ['Fast'],
        },
      ],
      education: [
        {
          degree: 'BS',
          institution: 'U',
          field: 'CS',
          duration: '2010-2014',
          relevantCoursework: ['Algorithms'],
          honors: ['Dean'],
        },
      ],
      projects: [
        {
          name: 'Proj',
          description: 'Desc',
          technologies: ['AWS'],
          duration: '2021',
          achievements: ['A'],
          impact: 'Big',
        },
      ],
      certifications: [{ name: 'AWS', issuer: 'Amazon', date: '2020', skills: ['S3'] }],
      languages: [{ language: 'EN', level: 'Native', certifications: ['TEF'] }],
    };
    await translationService.translateResume(nestedRd as any, nestedGr as any, 'es');
    expect(fetchMock).toHaveBeenCalled();
  });
});
