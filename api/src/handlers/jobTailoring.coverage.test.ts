import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { User } from '../types';
import type { Resume } from '../types';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';

const getUserById = vi.hoisted(() => vi.fn());
const checkRateLimit = vi.hoisted(() => vi.fn());
const getResumeById = vi.hoisted(() => vi.fn());
const createResume = vi.hoisted(() => vi.fn());
const updateResume = vi.hoisted(() => vi.fn());

const jobTailoringSvc = vi.hoisted(() => ({
  analyzeJobPosting: vi.fn(),
  generateClarificationQuestions: vi.fn(),
  enhanceAnswer: vi.fn(),
  generateTailoredResume: vi.fn(),
  checkTailoringLimits: vi.fn(),
  incrementTailoringUsage: vi.fn(),
  extractJobFromUrl: vi.fn(),
  incorporateKeyword: vi.fn(),
  generateAnswerOptions: vi.fn(),
}));

vi.mock('../services/dynamodb', () => ({ getUserById }));
vi.mock('../middleware/rateLimiter', () => ({ checkRateLimit }));
vi.mock('../services/resumeService', () => ({
  getResumeById,
  createResume,
  updateResume,
}));
vi.mock('../services/jobTailoringService', () => jobTailoringSvc);

import {
  validateJobUrlHandler,
  analyzeJob,
  generateQuestions,
  enhanceAnswerHandler,
  generateAnswerOptionsHandler,
  generateTailoredResumeHandler,
  saveTailoredResumeHandler,
  getTailoringLimitsHandler,
  incorporateKeywordHandler,
} from './jobTailoring';

function premiumUser(): User {
  const now = new Date().toISOString();
  return {
    id: 'u_prem',
    email: 'p@test.com',
    firstName: 'P',
    lastName: 'R',
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
    jobTailoringUsage: {
      totalUsed: 0,
      monthlyUsed: 0,
      currentMonth: '2026-03',
    },
    createdAt: now,
    updatedAt: now,
  };
}

const now = new Date().toISOString();

const stubResumeData = {
  firstName: 'A',
  lastName: 'B',
  country: 'US',
  linkedin: 'x',
  language: 'en' as const,
  targetLevel: 'mid' as const,
  profession: 'Dev',
  tone: 'professional' as const,
  phone: '1',
  email: 'a@b.com',
  skillsRaw: [],
  experience: [],
  education: [],
  certifications: [],
  projects: [],
  languages: [],
  achievements: [],
  summary: 's',
  jobDescription: 'j',
  completedSteps: [],
  currentStep: 1,
  totalCharacters: 0,
  lastSaved: now,
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

const minimalResume: Resume = {
  id: 'resume_1',
  userId: 'u_prem',
  title: 'CV',
  resumeData: stubResumeData as Resume['resumeData'],
  status: 'draft',
  isPubliclyShared: false,
  aiCost: {
    totalInputTokens: 0,
    totalOutputTokens: 0,
    totalCostUSD: 0,
    callBreakdown: {
      generation: 0,
      scoring: 0,
      suggestions: 0,
      enhancements: 0,
      linkedInParsing: 0,
      translation: 0,
    },
  },
  createdAt: now,
  updatedAt: now,
};

function authedPost(body: unknown) {
  return makeAuthorizedEvent({
    httpMethod: 'POST',
    authorizer: { userId: 'u_prem', email: 'p@test.com' },
    body: JSON.stringify(body),
  });
}

describe('jobTailoring handlers (success paths)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getUserById.mockResolvedValue(premiumUser());
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 4,
      resetTime: Date.now() + 60_000,
    });
    getResumeById.mockResolvedValue(minimalResume);
    jobTailoringSvc.analyzeJobPosting.mockResolvedValue({ match: 80 });
    jobTailoringSvc.generateClarificationQuestions.mockResolvedValue([
      { id: '1', text: 'Q1?' },
    ]);
    jobTailoringSvc.enhanceAnswer.mockResolvedValue('Enhanced answer');
    jobTailoringSvc.generateTailoredResume.mockResolvedValue({
      tailoredResume: { summary: 'T' },
      result: { atsScoreAfter: 77 },
    });
    jobTailoringSvc.checkTailoringLimits.mockResolvedValue({
      canCreate: true,
      used: 0,
      limit: 40,
      resetDate: '2026-12-31',
    });
    jobTailoringSvc.incrementTailoringUsage.mockResolvedValue(undefined);
    jobTailoringSvc.incorporateKeyword.mockResolvedValue({ patched: true });
    jobTailoringSvc.generateAnswerOptions.mockResolvedValue(['o1', 'o2', 'o3']);
    jobTailoringSvc.extractJobFromUrl.mockResolvedValue({
      title: 'Job',
      description: 'Desc',
    });
    createResume.mockResolvedValue({
      ...minimalResume,
      id: 'new_resume_id',
    });
    updateResume.mockResolvedValue(minimalResume);
  });

  it('validateJobUrlHandler returns 200', async () => {
    const res = await validateJobUrlHandler(
      authedPost({ url: 'https://jobs.example.com/123' }) as Parameters<
        typeof validateJobUrlHandler
      >[0]
    );
    expect(res.statusCode).toBe(200);
    expect(jobTailoringSvc.extractJobFromUrl).toHaveBeenCalled();
  });

  it('validateJobUrlHandler 401 without userId', async () => {
    const res = await validateJobUrlHandler(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        authorizer: { userId: '', email: 'p@test.com' },
        body: JSON.stringify({ url: 'https://x.com' }),
      }) as Parameters<typeof validateJobUrlHandler>[0]
    );
    expect(res.statusCode).toBe(401);
  });

  it('validateJobUrlHandler 400 invalid JSON body', async () => {
    const res = await validateJobUrlHandler(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        authorizer: { userId: 'u_prem', email: 'p@test.com' },
        body: '{',
      }) as Parameters<typeof validateJobUrlHandler>[0]
    );
    expect(res.statusCode).toBe(400);
  });

  it('validateJobUrlHandler 400 missing url', async () => {
    const res = await validateJobUrlHandler(
      authedPost({}) as Parameters<typeof validateJobUrlHandler>[0]
    );
    expect(res.statusCode).toBe(400);
  });

  it('validateJobUrlHandler 400 when url is not a string', async () => {
    const res = await validateJobUrlHandler(
      authedPost({ url: 123 }) as Parameters<typeof validateJobUrlHandler>[0]
    );
    expect(res.statusCode).toBe(400);
  });

  it('validateJobUrlHandler 400 url too long', async () => {
    const res = await validateJobUrlHandler(
      authedPost({ url: 'x'.repeat(2050) }) as Parameters<typeof validateJobUrlHandler>[0]
    );
    expect(res.statusCode).toBe(400);
  });

  it('validateJobUrlHandler 429 when rate limited', async () => {
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 5000,
    });
    const res = await validateJobUrlHandler(
      authedPost({ url: 'https://a.com' }) as Parameters<typeof validateJobUrlHandler>[0]
    );
    expect(res.statusCode).toBe(429);
  });

  it('validateJobUrlHandler uses free user rate limit tier', async () => {
    getUserById.mockResolvedValueOnce({ ...premiumUser(), isPremium: false });
    const res = await validateJobUrlHandler(
      authedPost({ url: 'https://b.com' }) as Parameters<typeof validateJobUrlHandler>[0]
    );
    expect(res.statusCode).toBe(200);
  });

  it('analyzeJob returns 200', async () => {
    const res = await analyzeJob(
      authedPost({
        resumeId: 'resume_1',
        description: 'We need a developer',
        language: 'en',
      }) as Parameters<typeof analyzeJob>[0]
    );
    expect(res.statusCode).toBe(200);
    const b = JSON.parse(res.body || '{}');
    expect(b.success).toBe(true);
  });

  it('analyzeJob defaults language when omitted', async () => {
    const res = await analyzeJob(
      authedPost({
        resumeId: 'resume_1',
        description: 'We need a developer',
      }) as Parameters<typeof analyzeJob>[0]
    );
    expect(res.statusCode).toBe(200);
    expect(jobTailoringSvc.analyzeJobPosting).toHaveBeenCalledWith(
      expect.anything(),
      'We need a developer',
      'en',
      expect.anything(),
      expect.anything()
    );
  });

  it('generateQuestions returns 200', async () => {
    const res = await generateQuestions(
      authedPost({
        resumeId: 'resume_1',
        jobInfo: { title: 'Eng' },
        language: 'en',
      }) as Parameters<typeof generateQuestions>[0]
    );
    expect(res.statusCode).toBe(200);
  });

  it('generateQuestions passes suggestions to service', async () => {
    const res = await generateQuestions(
      authedPost({
        resumeId: 'resume_1',
        jobInfo: { title: 'Eng' },
        language: 'en',
        suggestions: ['Add metrics'],
      }) as Parameters<typeof generateQuestions>[0]
    );
    expect(res.statusCode).toBe(200);
    expect(jobTailoringSvc.generateClarificationQuestions).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      'en',
      'u_prem',
      true,
      ['Add metrics']
    );
  });

  it('enhanceAnswerHandler returns 200', async () => {
    const res = await enhanceAnswerHandler(
      authedPost({
        text: 'My answer',
        context: 'ctx',
        questionId: 'q1',
        language: 'en',
        resumeId: 'resume_1',
      }) as Parameters<typeof enhanceAnswerHandler>[0]
    );
    expect(res.statusCode).toBe(200);
  });

  it('generateAnswerOptionsHandler returns 200', async () => {
    const res = await generateAnswerOptionsHandler(
      authedPost({
        questionId: 'q1',
        question: 'Why?',
        context: 'ctx',
        resumeId: 'resume_1',
        jobInfo: { title: 'J' },
        language: 'en',
      }) as Parameters<typeof generateAnswerOptionsHandler>[0]
    );
    expect(res.statusCode).toBe(200);
    const b = JSON.parse(res.body || '{}');
    expect(b.data.options).toEqual(['o1', 'o2', 'o3']);
  });

  it('generateAnswerOptionsHandler uses free tier rate limit', async () => {
    getUserById.mockResolvedValueOnce({ ...premiumUser(), isPremium: false });
    const res = await generateAnswerOptionsHandler(
      authedPost({
        questionId: 'q1',
        question: 'Why?',
        context: 'ctx',
        resumeId: 'resume_1',
        jobInfo: { title: 'J' },
      }) as Parameters<typeof generateAnswerOptionsHandler>[0]
    );
    expect(res.statusCode).toBe(200);
  });

  it('generateTailoredResumeHandler returns 200', async () => {
    const res = await generateTailoredResumeHandler(
      authedPost({
        resumeId: 'resume_1',
        jobInfo: { title: 'Role' },
        answers: [{ questionId: 'q1', question: 'Q', answer: 'A' }],
        language: 'en',
      }) as Parameters<typeof generateTailoredResumeHandler>[0]
    );
    expect(res.statusCode).toBe(200);
  });

  it('saveTailoredResumeHandler returns 201', async () => {
    const res = await saveTailoredResumeHandler(
      authedPost({
        sourceResumeId: 'resume_1',
        tailoredResume: { summary: 'Tailored' },
        tailoringResult: { atsScoreAfter: 80 },
        jobInfo: { title: 'Job' },
        answers: [],
        title: 'Tailored CV',
        matchScore: 8,
      }) as Parameters<typeof saveTailoredResumeHandler>[0]
    );
    expect(res.statusCode).toBe(201);
    const b = JSON.parse(res.body || '{}');
    expect(b.success).toBe(true);
    expect(b.resumeId).toBe('new_resume_id');
  });

  it('getTailoringLimitsHandler returns 200', async () => {
    const res = await getTailoringLimitsHandler(
      makeAuthorizedEvent({
        authorizer: { userId: 'u_prem', email: 'p@test.com' },
      }) as Parameters<typeof getTailoringLimitsHandler>[0]
    );
    expect(res.statusCode).toBe(200);
  });

  it('incorporateKeywordHandler returns 200 for premium', async () => {
    const res = await incorporateKeywordHandler(
      authedPost({
        keyword: 'Rust',
        userContext: '1234567890 experience',
        importance: 'high',
        language: 'en',
        currentResume: { summary: 'S' },
        jobInfo: { title: 'Job' },
      }) as Parameters<typeof incorporateKeywordHandler>[0]
    );
    expect(res.statusCode).toBe(200);
  });

  it('generateTailoredResumeHandler accepts claimedKeywords', async () => {
    const res = await generateTailoredResumeHandler(
      authedPost({
        resumeId: 'resume_1',
        jobInfo: { title: 'Role' },
        claimedKeywords: [
          { keyword: 'k8s', userContext: 'I used k8s', enhancedContext: 'K8s prod' },
        ],
        language: 'en',
      }) as Parameters<typeof generateTailoredResumeHandler>[0]
    );
    expect(res.statusCode).toBe(200);
  });

  it('analyzeJob returns 400 for invalid JSON', async () => {
    const res = await analyzeJob(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        authorizer: { userId: 'u_prem', email: 'p@test.com' },
        body: '{',
      }) as Parameters<typeof analyzeJob>[0]
    );
    expect(res.statusCode).toBe(400);
  });

  it('generateTailoredResumeHandler returns 403 when usage limit reached', async () => {
    jobTailoringSvc.checkTailoringLimits.mockResolvedValueOnce({
      canCreate: false,
      used: 99,
      limit: 1,
      resetDate: '2026-12-01',
    });
    const res = await generateTailoredResumeHandler(
      authedPost({
        resumeId: 'resume_1',
        jobInfo: { title: 'Role' },
        answers: [],
      }) as Parameters<typeof generateTailoredResumeHandler>[0]
    );
    expect(res.statusCode).toBe(403);
    const b = JSON.parse(res.body || '{}');
    expect(b.code).toBe('USAGE_LIMIT_REACHED');
  });

  it('incorporateKeywordHandler returns 403 for non-premium', async () => {
    getUserById.mockResolvedValueOnce({
      ...premiumUser(),
      isPremium: false,
    });
    const res = await incorporateKeywordHandler(
      authedPost({
        keyword: 'x',
        userContext: '1234567890 ok',
        importance: 'high',
        currentResume: {},
        jobInfo: {},
      }) as Parameters<typeof incorporateKeywordHandler>[0]
    );
    expect(res.statusCode).toBe(403);
  });

  it('incorporateKeywordHandler returns 400 when context too short', async () => {
    const res = await incorporateKeywordHandler(
      authedPost({
        keyword: 'x',
        userContext: 'short',
        importance: 'high',
        currentResume: {},
        jobInfo: {},
      }) as Parameters<typeof incorporateKeywordHandler>[0]
    );
    expect(res.statusCode).toBe(400);
  });

  it('analyzeJob 401 without userId', async () => {
    const ev = makeAuthorizedEvent({
      httpMethod: 'POST',
      authorizer: { userId: '', email: 'p@test.com' },
      body: JSON.stringify({ resumeId: 'resume_1', description: 'job' }),
    });
    expect((await analyzeJob(ev as Parameters<typeof analyzeJob>[0])).statusCode).toBe(401);
  });

  it('analyzeJob 404 user', async () => {
    getUserById.mockResolvedValueOnce(null);
    expect(
      (
        await analyzeJob(
          authedPost({ resumeId: 'resume_1', description: 'job' }) as Parameters<typeof analyzeJob>[0]
        )
      ).statusCode
    ).toBe(404);
  });

  it('analyzeJob 429', async () => {
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 1000,
    });
    expect(
      (
        await analyzeJob(
          authedPost({ resumeId: 'resume_1', description: 'job' }) as Parameters<typeof analyzeJob>[0]
        )
      ).statusCode
    ).toBe(429);
  });

  it('analyzeJob 400 missing fields', async () => {
    expect(
      (await analyzeJob(authedPost({ resumeId: '', description: '' }) as Parameters<typeof analyzeJob>[0]))
        .statusCode
    ).toBe(400);
  });

  it('analyzeJob 400 description too long', async () => {
    expect(
      (
        await analyzeJob(
          authedPost({ resumeId: 'resume_1', description: 'x'.repeat(30001) }) as Parameters<
            typeof analyzeJob
          >[0]
        )
      ).statusCode
    ).toBe(400);
  });

  it('analyzeJob 404 resume', async () => {
    getResumeById.mockResolvedValueOnce(null);
    expect(
      (
        await analyzeJob(
          authedPost({ resumeId: 'resume_1', description: 'job' }) as Parameters<typeof analyzeJob>[0]
        )
      ).statusCode
    ).toBe(404);
  });

  it('analyzeJob 500 on service error', async () => {
    jobTailoringSvc.analyzeJobPosting.mockRejectedValueOnce(new Error('svc'));
    expect(
      (
        await analyzeJob(
          authedPost({ resumeId: 'resume_1', description: 'job' }) as Parameters<typeof analyzeJob>[0]
        )
      ).statusCode
    ).toBe(500);
  });

  it('generateQuestions 401', async () => {
    const ev = makeAuthorizedEvent({
      httpMethod: 'POST',
      authorizer: { userId: '', email: 'p@test.com' },
      body: JSON.stringify({ resumeId: 'resume_1', jobInfo: { title: 'T' } }),
    });
    expect((await generateQuestions(ev as Parameters<typeof generateQuestions>[0])).statusCode).toBe(401);
  });

  it('generateQuestions 404 user', async () => {
    getUserById.mockResolvedValueOnce(null);
    expect(
      (
        await generateQuestions(
          authedPost({ resumeId: 'resume_1', jobInfo: { title: 'T' } }) as Parameters<
            typeof generateQuestions
          >[0]
        )
      ).statusCode
    ).toBe(404);
  });

  it('generateQuestions 429', async () => {
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 1000,
    });
    expect(
      (
        await generateQuestions(
          authedPost({ resumeId: 'resume_1', jobInfo: { title: 'T' } }) as Parameters<
            typeof generateQuestions
          >[0]
        )
      ).statusCode
    ).toBe(429);
  });

  it('generateQuestions 400 invalid json', async () => {
    expect(
      (
        await generateQuestions(
          makeAuthorizedEvent({
            httpMethod: 'POST',
            authorizer: { userId: 'u_prem', email: 'p@test.com' },
            body: '{',
          }) as Parameters<typeof generateQuestions>[0]
        )
      ).statusCode
    ).toBe(400);
  });

  it('generateQuestions 400 missing jobInfo', async () => {
    expect(
      (await generateQuestions(authedPost({ resumeId: 'resume_1' }) as Parameters<typeof generateQuestions>[0]))
        .statusCode
    ).toBe(400);
  });

  it('generateQuestions 404 resume', async () => {
    getResumeById.mockResolvedValueOnce(null);
    expect(
      (
        await generateQuestions(
          authedPost({ resumeId: 'resume_1', jobInfo: { title: 'T' } }) as Parameters<
            typeof generateQuestions
          >[0]
        )
      ).statusCode
    ).toBe(404);
  });

  it('generateQuestions 500', async () => {
    jobTailoringSvc.generateClarificationQuestions.mockRejectedValueOnce(new Error('x'));
    expect(
      (
        await generateQuestions(
          authedPost({ resumeId: 'resume_1', jobInfo: { title: 'T' } }) as Parameters<
            typeof generateQuestions
          >[0]
        )
      ).statusCode
    ).toBe(500);
  });

  it('enhanceAnswerHandler 400 missing required fields', async () => {
    const res = await enhanceAnswerHandler(
      authedPost({
        text: '',
        context: 'c',
        questionId: 'q1',
      }) as Parameters<typeof enhanceAnswerHandler>[0]
    );
    expect(res.statusCode).toBe(400);
  });

  it('enhanceAnswerHandler 400 text too long', async () => {
    const res = await enhanceAnswerHandler(
      authedPost({
        text: 'x'.repeat(2001),
        context: 'c',
        questionId: 'q1',
        language: 'en',
        resumeId: 'resume_1',
      }) as Parameters<typeof enhanceAnswerHandler>[0]
    );
    expect(res.statusCode).toBe(400);
  });

  it('enhanceAnswerHandler 500', async () => {
    jobTailoringSvc.enhanceAnswer.mockRejectedValueOnce(new Error('e'));
    const res = await enhanceAnswerHandler(
      authedPost({
        text: 'ok text',
        context: 'c',
        questionId: 'q1',
        language: 'en',
        resumeId: 'resume_1',
      }) as Parameters<typeof enhanceAnswerHandler>[0]
    );
    expect(res.statusCode).toBe(500);
  });

  it('validateJobUrlHandler 404 user', async () => {
    getUserById.mockResolvedValueOnce(null);
    const res = await validateJobUrlHandler(
      authedPost({ url: 'https://a.com' }) as Parameters<typeof validateJobUrlHandler>[0]
    );
    expect(res.statusCode).toBe(404);
  });

  it('validateJobUrlHandler 500', async () => {
    jobTailoringSvc.extractJobFromUrl.mockRejectedValueOnce(new Error('extract'));
    const res = await validateJobUrlHandler(
      authedPost({ url: 'https://a.com' }) as Parameters<typeof validateJobUrlHandler>[0]
    );
    expect(res.statusCode).toBe(500);
  });

  it('saveTailoredResumeHandler returns 403 when usage limit reached', async () => {
    jobTailoringSvc.checkTailoringLimits.mockResolvedValueOnce({
      canCreate: false,
      used: 99,
      limit: 40,
      resetDate: '2099-01-01',
    });
    const res = await saveTailoredResumeHandler(
      authedPost({
        sourceResumeId: 'resume_1',
        tailoredResume: { summary: 'T' },
        tailoringResult: { atsScoreAfter: 80 },
        jobInfo: { title: 'J' },
        answers: [],
        title: 'X',
        matchScore: 5,
      }) as Parameters<typeof saveTailoredResumeHandler>[0]
    );
    expect(res.statusCode).toBe(403);
  });

  it('saveTailoredResumeHandler 500', async () => {
    createResume.mockRejectedValueOnce(new Error('db'));
    const res = await saveTailoredResumeHandler(
      authedPost({
        sourceResumeId: 'resume_1',
        tailoredResume: { summary: 'T' },
        tailoringResult: { atsScoreAfter: 80 },
        jobInfo: { title: 'J' },
        answers: [],
        title: 'X',
        matchScore: 5,
      }) as Parameters<typeof saveTailoredResumeHandler>[0]
    );
    expect(res.statusCode).toBe(500);
  });

  it('generateTailoredResumeHandler 401 and 404 user', async () => {
    const ev = authedPost({
      resumeId: 'resume_1',
      jobInfo: { title: 'T' },
      answers: [],
    }) as any;
    delete ev.requestContext.authorizer;
    expect((await generateTailoredResumeHandler(ev)).statusCode).toBe(401);
    getUserById.mockResolvedValueOnce(null);
    expect(
      (
        await generateTailoredResumeHandler(
          authedPost({
            resumeId: 'resume_1',
            jobInfo: { title: 'T' },
            answers: [],
          }) as Parameters<typeof generateTailoredResumeHandler>[0]
        )
      ).statusCode
    ).toBe(404);
  });

  it('generateTailoredResumeHandler premium vs free limit messages', async () => {
    getUserById.mockResolvedValueOnce(premiumUser());
    jobTailoringSvc.checkTailoringLimits.mockResolvedValueOnce({
      canCreate: false,
      used: 40,
      limit: 40,
      resetDate: '2099-06-01T00:00:00.000Z',
    });
    let res = await generateTailoredResumeHandler(
      authedPost({ resumeId: 'resume_1', jobInfo: { title: 'T' }, answers: [] }) as any
    );
    expect(res.statusCode).toBe(403);
    expect(JSON.parse(res.body || '{}').message).toMatch(/monthly limit/i);

    getUserById.mockResolvedValueOnce({ ...premiumUser(), isPremium: false });
    jobTailoringSvc.checkTailoringLimits.mockResolvedValueOnce({
      canCreate: false,
      used: 1,
      limit: 1,
      resetDate: undefined,
    });
    res = await generateTailoredResumeHandler(
      authedPost({ resumeId: 'resume_1', jobInfo: { title: 'T' }, answers: [] }) as any
    );
    expect(res.statusCode).toBe(403);
    expect(JSON.parse(res.body || '{}').message).toMatch(/Free users/i);
  });

  it('generateTailoredResumeHandler 429 400 and 404 resume', async () => {
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 5000,
    });
    expect(
      (
        await generateTailoredResumeHandler(
          authedPost({ resumeId: 'resume_1', jobInfo: { title: 'T' }, answers: [] }) as any
        )
      ).statusCode
    ).toBe(429);
    expect(
      (
        await generateTailoredResumeHandler(
          makeAuthorizedEvent({
            httpMethod: 'POST',
            authorizer: { userId: 'u_prem', email: 'p@test.com' },
            body: '{',
          }) as any
        )
      ).statusCode
    ).toBe(400);
    expect(
      (
        await generateTailoredResumeHandler(
          authedPost({ jobInfo: { title: 'T' }, answers: [] }) as any
        )
      ).statusCode
    ).toBe(400);
    getResumeById.mockResolvedValueOnce(null);
    expect(
      (
        await generateTailoredResumeHandler(
          authedPost({ resumeId: 'resume_1', jobInfo: { title: 'T' }, answers: [] }) as any
        )
      ).statusCode
    ).toBe(404);
  });

  it('generateTailoredResumeHandler 500', async () => {
    jobTailoringSvc.generateTailoredResume.mockRejectedValueOnce(new Error('ai'));
    expect(
      (
        await generateTailoredResumeHandler(
          authedPost({ resumeId: 'resume_1', jobInfo: { title: 'T' }, answers: [] }) as any
        )
      ).statusCode
    ).toBe(500);
  });

  it('saveTailoredResumeHandler branches 401 400 404 429', async () => {
    const body = {
      sourceResumeId: 'resume_1',
      tailoredResume: { summary: 'T' },
      tailoringResult: { atsScoreAfter: 80 },
      jobInfo: { title: 'J' },
      answers: [],
      title: 'X',
    };
    const ev = authedPost(body) as any;
    delete ev.requestContext.authorizer;
    expect((await saveTailoredResumeHandler(ev)).statusCode).toBe(401);
    getUserById.mockResolvedValueOnce(null);
    expect((await saveTailoredResumeHandler(authedPost(body) as any)).statusCode).toBe(404);
    getUserById.mockResolvedValueOnce(premiumUser());
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 1000,
    });
    expect((await saveTailoredResumeHandler(authedPost(body) as any)).statusCode).toBe(429);
    checkRateLimit.mockResolvedValue({ allowed: true, remaining: 9, resetTime: Date.now() + 60000 });
    expect(
      (
        await saveTailoredResumeHandler(
          makeAuthorizedEvent({
            httpMethod: 'POST',
            authorizer: { userId: 'u_prem', email: 'p@test.com' },
            body: '{',
          }) as any
        )
      ).statusCode
    ).toBe(400);
    expect(
      (
        await saveTailoredResumeHandler(
          authedPost({
            ...body,
            title: '',
            sourceResumeId: 'resume_1',
          }) as any
        )
      ).statusCode
    ).toBe(400);
    getResumeById.mockResolvedValueOnce(null);
    expect((await saveTailoredResumeHandler(authedPost(body) as any)).statusCode).toBe(404);
  });

  it('getTailoringLimitsHandler 500 on unexpected error', async () => {
    jobTailoringSvc.checkTailoringLimits.mockRejectedValueOnce(new Error('limits'));
    const res = await getTailoringLimitsHandler(
      makeAuthorizedEvent({
        authorizer: { userId: 'u_prem', email: 'p@test.com' },
      }) as Parameters<typeof getTailoringLimitsHandler>[0]
    );
    expect(res.statusCode).toBe(500);
  });

  it('getTailoringLimitsHandler 401 404 429', async () => {
    const ev = makeAuthorizedEvent({
      authorizer: { userId: 'u_prem', email: 'p@test.com' },
    }) as any;
    delete ev.requestContext.authorizer;
    expect((await getTailoringLimitsHandler(ev)).statusCode).toBe(401);
    getUserById.mockResolvedValueOnce(null);
    expect(
      (
        await getTailoringLimitsHandler(
          makeAuthorizedEvent({ authorizer: { userId: 'u_prem', email: 'p@test.com' } }) as any
        )
      ).statusCode
    ).toBe(404);
    getUserById.mockResolvedValueOnce(premiumUser());
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 1000,
    });
    expect(
      (
        await getTailoringLimitsHandler(
          makeAuthorizedEvent({ authorizer: { userId: 'u_prem', email: 'p@test.com' } }) as any
        )
      ).statusCode
    ).toBe(429);
  });

  it('incorporateKeywordHandler 401 404 429 400 json and context length', async () => {
    const okBody = {
      keyword: 'K',
      userContext: '1234567890 long enough',
      importance: 'high',
      language: 'en',
      currentResume: { summary: 'S' },
      jobInfo: { title: 'J' },
    };
    const ev = authedPost(okBody) as any;
    delete ev.requestContext.authorizer;
    expect((await incorporateKeywordHandler(ev)).statusCode).toBe(401);
    getUserById.mockResolvedValueOnce(null);
    expect((await incorporateKeywordHandler(authedPost(okBody) as any)).statusCode).toBe(404);
    getUserById.mockResolvedValueOnce(premiumUser());
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 1000,
    });
    expect((await incorporateKeywordHandler(authedPost(okBody) as any)).statusCode).toBe(429);
    checkRateLimit.mockResolvedValue({ allowed: true, remaining: 4, resetTime: Date.now() + 60000 });
    expect(
      (
        await incorporateKeywordHandler(
          makeAuthorizedEvent({
            httpMethod: 'POST',
            authorizer: { userId: 'u_prem', email: 'p@test.com' },
            body: '{',
          }) as any
        )
      ).statusCode
    ).toBe(400);
    expect(
      (
        await incorporateKeywordHandler(
          authedPost({
            ...okBody,
            userContext: 'x'.repeat(2001),
          }) as any
        )
      ).statusCode
    ).toBe(400);
  });

  it('incorporateKeywordHandler 400 missing required fields', async () => {
    const res = await incorporateKeywordHandler(
      authedPost({
        keyword: '',
        userContext: '1234567890 enough',
        importance: 'high',
        currentResume: { summary: 'S' },
        jobInfo: { title: 'J' },
      }) as Parameters<typeof incorporateKeywordHandler>[0]
    );
    expect(res.statusCode).toBe(400);
  });

  it('incorporateKeywordHandler 500', async () => {
    jobTailoringSvc.incorporateKeyword.mockRejectedValueOnce(new Error('ai'));
    const res = await incorporateKeywordHandler(
      authedPost({
        keyword: 'K',
        userContext: '1234567890 ctx',
        importance: 'high',
        language: 'en',
        currentResume: { summary: 'S' },
        jobInfo: { title: 'J' },
      }) as any
    );
    expect(res.statusCode).toBe(500);
  });
});
