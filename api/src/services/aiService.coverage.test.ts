import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { ResumeData, LinkedInDataRequest } from '../types';

const getAIConfigForUserMock = vi.hoisted(() =>
  vi.fn(() => ({ provider: 'openai' as const, model: 'gpt-4' }))
);

vi.mock('../utils/aiProviderSelector', () => ({
  getAIConfigForUser: (...a: unknown[]) => getAIConfigForUserMock(...a),
  GROQ_FREE_MODEL: 'openai/gpt-oss-20b',
  GROQ_PREMIUM_MODEL: 'llama-3.3-70b-versatile',
  OPENAI_DEFAULT_MODEL: 'gpt-4o',
}));

const getUserByIdMock = vi.hoisted(() =>
  vi.fn().mockResolvedValue({
    id: 'u1',
    email: 'e@e.com',
    firstName: 'A',
    lastName: 'B',
    provider: 'google' as const,
    isPremium: true,
    freeResumeUsed: false,
    premiumResumeCount: 0,
    premiumResumeMonth: '2025-03',
    freeDownloadUsed: false,
    totalDownloads: 0,
    freeCoverLetterUsed: false,
    premiumCoverLetterCount: 0,
    premiumCoverLetterMonth: '2025-03',
    createdAt: 't',
    updatedAt: 't',
  })
);

vi.mock('./dynamodb', () => ({
  getUserById: (...a: unknown[]) => getUserByIdMock(...a),
}));

vi.mock('./aiUsageService', () => ({
  trackAIUsage: vi.fn().mockResolvedValue(undefined),
}));

import { aiService } from './aiService';

function openAiBody(content: string) {
  return {
    ok: true,
    status: 200,
    json: async () => ({
      choices: [{ message: { content }, finish_reason: 'stop' }],
      usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
    }),
    text: async () => '',
  };
}

function groqBody(content: string) {
  return openAiBody(content);
}

function anthropicBody(text: string) {
  return {
    ok: true,
    status: 200,
    json: async () => ({
      content: [{ text }],
      usage: { input_tokens: 1, output_tokens: 2 },
    }),
    text: async () => '',
  };
}

const generatedResumeJson = () =>
  JSON.stringify({
    professionalSummary: 'I am an engineer with proven delivery experience.',
    experience: [
      {
        title: 'Engineer',
        company: 'Co',
        duration: '2020-Present',
        description: 'Building systems.',
        achievements: ['Shipped product'],
        skills: ['TypeScript'],
        impact: ['Reliability'],
      },
    ],
    education: [
      {
        degree: 'BS',
        institution: 'University',
        field: 'CS',
        duration: '2012-2016',
      },
    ],
    skills: { technical: ['TS'], soft: ['Communication'], tools: ['Git'] },
    projects: [],
    certifications: [],
    achievements: [],
    languages: [],
    contactInfo: {
      fullName: 'A B',
      email: 'a@b.com',
      phone: '+15550000',
      location: 'US',
    },
  });

const resumeData = (): ResumeData => ({
  firstName: 'A',
  lastName: 'B',
  country: 'US',
  linkedin: 'in/x',
  language: 'en',
  targetLevel: 'mid',
  profession: 'Software Engineer',
  tone: 'professional',
  phone: '+15550000',
  email: 'a@b.com',
  skillsRaw: ['TypeScript'],
  experience: [
    {
      id: 'e1',
      title: 'Engineer',
      company: 'Co',
      startDate: '2020-01',
      endDate: '',
      isCurrent: true,
      achievements: ['Delivered features'],
      responsibilities: ['Built APIs'],
    },
  ],
  education: [
    {
      id: 'ed1',
      degree: 'BS',
      institution: 'Uni',
      field: 'CS',
      startDate: '2012-01',
      endDate: '2016-01',
      isCompleted: true,
    },
  ],
  certifications: [],
  projects: [],
  languages: [],
  achievements: [],
  summary: 'Summary text here for the candidate.',
  jobDescription: 'Unique value prop text.',
  completedSteps: [1, 2, 3],
  currentStep: 3,
  totalCharacters: 500,
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
});

describe('aiService coverage (mocked fetch + dynamodb)', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    getAIConfigForUserMock.mockReset();
    getAIConfigForUserMock.mockImplementation(() => ({ provider: 'openai', model: 'gpt-4' }));
    getUserByIdMock.mockClear();
    vi.stubGlobal('fetch', fetchMock);
    fetchMock.mockImplementation((url: string) => {
      if (url.includes('api.openai.com')) return Promise.resolve(openAiBody(generatedResumeJson()) as any);
      if (url.includes('api.groq.com')) return Promise.resolve(groqBody('{"x":1}') as any);
      if (url.includes('api.anthropic.com')) return Promise.resolve(anthropicBody('hi') as any);
      return Promise.resolve(openAiBody('{}') as any);
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('generateResume returns parsed resume', async () => {
    fetchMock.mockImplementation((url: string) =>
      Promise.resolve((url.includes('openai') ? openAiBody(generatedResumeJson()) : openAiBody('{}')) as any)
    );
    const out = await aiService.generateResume(resumeData(), true, {
      userId: 'u1',
      isPremium: true,
    });
    expect(out.professionalSummary).toContain('engineer');
    expect(out.metadata?.aiProvider).toBeDefined();
  });

  it('generateProfessionSuggestions parses bilingual skills', async () => {
    const body = JSON.stringify({
      es: { skills: ['a', 'b'] },
      en: { skills: ['c', 'd'] },
    });
    fetchMock.mockImplementation((url: string) =>
      Promise.resolve((url.includes('openai') ? openAiBody(body) : openAiBody('{}')) as any)
    );
    const r = await aiService.generateProfessionSuggestions('Engineer', {
      authorizer: { userId: 'u1' },
    });
    expect(r.en.skills.length).toBeGreaterThan(0);
  });

  it('generateAchievementSuggestions parses array', async () => {
    const body = JSON.stringify([{ title: 'T', description: 'D' }]);
    fetchMock.mockImplementation((url: string) =>
      Promise.resolve((url.includes('openai') ? openAiBody(body) : openAiBody('{}')) as any)
    );
    const r = await aiService.generateAchievementSuggestions(
      'Dev',
      [{ name: 'P', description: 'D', technologies: ['T'] }],
      'en',
      { authorizer: { userId: 'u1' } }
    );
    expect(r[0].title).toBe('T');
  });

  it('generateSummarySuggestions and job title achievements', async () => {
    fetchMock.mockImplementation((url: string) =>
      Promise.resolve(
        (url.includes('openai')
          ? openAiBody(JSON.stringify(['one', 'two', 'three']))
          : openAiBody('{}')) as any
      )
    );
    const s = await aiService.generateSummarySuggestions(
      'Dev',
      ['a'],
      ['p'],
      'en',
      'experience',
      { authorizer: { userId: 'u1' } }
    );
    expect(s.length).toBeGreaterThanOrEqual(1);

    fetchMock.mockImplementation((url: string) =>
      Promise.resolve(
        (url.includes('openai')
          ? openAiBody(JSON.stringify(['a', 'b', 'c', 'd', 'e']))
          : openAiBody('{}')) as any
      )
    );
    const j = await aiService.generateJobTitleAchievements('Engineer', 'en', { authorizer: { userId: 'u1' } });
    expect(j.length).toBeGreaterThanOrEqual(1);
  });

  it('enhanceText for each context', async () => {
    fetchMock.mockImplementation((url: string) =>
      Promise.resolve((url.includes('openai') ? openAiBody('Enhanced line') : openAiBody('{}')) as any)
    );
    const ctxs = ['achievement', 'summary', 'project', 'responsibility', 'differentiators'] as const;
    for (const c of ctxs) {
      const t = await aiService.enhanceText(c, 'original line', 'en', { authorizer: { userId: 'u1' } });
      expect(t.length).toBeGreaterThan(0);
    }
  });

  it('improveSectionWithUserInstructions and autoEnhanceSection', async () => {
    fetchMock.mockImplementation((url: string) => {
      if (url.includes('groq.com')) return Promise.resolve(groqBody('Same summary with a tweak') as any);
      return Promise.resolve(openAiBody('Improved text for section') as any);
    });
    getAIConfigForUserMock.mockImplementation(() => ({ provider: 'groq', model: 'openai/gpt-oss-20b' }));

    const a = await aiService.improveSectionWithUserInstructions(
      'summary',
      'Original summary content here for testing.',
      'make concise',
      'en',
      undefined,
      { userId: 'u1', isPremium: true }
    );
    expect(typeof a).toBe('string');

    await expect(
      aiService.improveSectionWithUserInstructions(
        'summary',
        'Original summary content here for testing.',
        'make concise',
        'en',
        [{ questionId: 'q1', answer: 'Led team of five engineers on migration.' }],
        { userId: 'u1', isPremium: true }
      )
    ).resolves.toBeTruthy();

    await expect(
      aiService.autoEnhanceSection('summary', 'Some summary text for auto enhance.', 'en', {
        userId: 'u1',
        isPremium: true,
      })
    ).resolves.toBeTruthy();
  });

  it('generateEnhancementQuestions and generateAnswerSuggestion', async () => {
    getAIConfigForUserMock.mockImplementation(() => ({ provider: 'openai', model: 'gpt-4' }));
    const qBody = JSON.stringify({
      questions: [
        { id: '1', question: 'Q?', category: 'impact', required: true },
        { id: '2', question: 'Q2?', category: 'context', required: false },
      ],
    });
    fetchMock.mockImplementation((url: string) =>
      Promise.resolve((url.includes('openai') ? openAiBody(qBody) : openAiBody('{}')) as any)
    );
    const qs = await aiService.generateEnhancementQuestions(
      'summary',
      'add metrics',
      'Text',
      'en',
      { authorizer: { userId: 'u1' } }
    );
    expect(qs.length).toBe(2);

    fetchMock.mockImplementation((url: string) =>
      Promise.resolve((url.includes('openai') ? openAiBody('Ready answer text') : openAiBody('{}')) as any)
    );
    const ans = await aiService.generateAnswerSuggestion(
      'What metric?',
      'quantifiable-metrics',
      'Body',
      'rec',
      'summary',
      'en',
      { authorizer: { userId: 'u1' } }
    );
    expect(ans).toContain('answer');
  });

  it('parseLinkedInTextToResumeData', async () => {
    const li: LinkedInDataRequest = {
      profession: 'Engineer',
      about: 'About me',
      experience: 'Exp',
      education: 'Edu',
      certifications: '',
      projects: '',
      skills: 'JS',
      recommendations: '',
      targetLanguage: 'en',
    };
    const parsed = {
      firstName: 'A',
      lastName: 'B',
      email: 'a@b.com',
      phone: '',
      country: 'US',
      linkedin: '',
      language: 'en',
      targetLevel: 'mid',
      profession: 'Wrong',
      tone: 'professional',
      summary: 'S',
      jobDescription: '',
      skillsRaw: ['JS'],
      experience: [],
      education: [],
      certifications: [],
      projects: [],
      languages: [],
      achievements: [],
      completedSteps: [1],
      currentStep: 1,
      totalCharacters: 0,
      lastSaved: new Date().toISOString(),
    };
    fetchMock.mockImplementation((url: string) =>
      Promise.resolve((url.includes('openai') ? openAiBody(JSON.stringify(parsed)) : openAiBody('{}')) as any)
    );
    const out = await aiService.parseLinkedInTextToResumeData(li, { authorizer: { userId: 'u1' } });
    expect(out.profession).toBe('Engineer');
  });

  it('validateProfession via groq and openai', async () => {
    getAIConfigForUserMock.mockImplementation(() => ({ provider: 'groq', model: 'm' }));
    fetchMock.mockImplementation((url: string) =>
      Promise.resolve((url.includes('groq') ? groqBody(JSON.stringify({ isValid: true })) : openAiBody('{}')) as any)
    );
    await expect(
      aiService.validateProfession('Engineer', { authorizer: { userId: 'u1' } })
    ).resolves.toMatchObject({ isValid: true });

    getAIConfigForUserMock.mockImplementation(() => ({ provider: 'openai', model: 'gpt-4' }));
    fetchMock.mockImplementation((url: string) =>
      Promise.resolve(
        (url.includes('openai') ? openAiBody(JSON.stringify({ isValid: false, message: 'bad' })) : openAiBody('{}')) as any
      )
    );
    await expect(
      aiService.validateProfession('x', { authorizer: { userId: 'u1' } })
    ).resolves.toMatchObject({ isValid: false });
  });

  it('directEnhance with known checklist id', async () => {
    const orig =
      'Responsible for building APIs and collaborating with teams on delivery of software features.';
    fetchMock.mockImplementation((url: string) =>
      Promise.resolve(
        (url.includes('openai')
          ? openAiBody(
              'Spearheaded API development and collaborated with teams on delivery of software features.'
            )
          : openAiBody('{}')) as any
      )
    );
    const d = await aiService.directEnhance(
      'summary-no-first-person',
      'summary',
      orig,
      'en',
      { authorizer: { userId: 'u1' } }
    );
    expect(d.length).toBeGreaterThan(10);
  });

  it('throws on OpenAI error response', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Err',
      text: async () => JSON.stringify({ error: { message: 'bad' } }),
      json: async () => ({}),
    } as any);
    await expect(aiService.enhanceText('summary', 'x', 'en', { authorizer: { userId: 'u1' } })).rejects.toThrow();
  });

  it('anthropic branch for enhanceText', async () => {
    getAIConfigForUserMock.mockImplementation(() => ({ provider: 'anthropic', model: 'claude' }));
    fetchMock.mockImplementation((url: string) =>
      Promise.resolve(
        (url.includes('anthropic') ? anthropicBody('Anthropic enhanced') : openAiBody('{}')) as any
      )
    );
    const t = await aiService.enhanceText('summary', 'orig', 'en', { authorizer: { userId: 'u1' } });
    expect(t).toContain('Anthropic');
  });
});
