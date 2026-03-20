import { describe, it, expect, vi, beforeEach } from 'vitest';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';

const getUserById = vi.hoisted(() => vi.fn());
const getResumeById = vi.hoisted(() => vi.fn());
const updateResumeWithScore = vi.hoisted(() => vi.fn());
const getResumeScore = vi.hoisted(() => vi.fn());
const checkRateLimit = vi.hoisted(() => vi.fn());
const refundRateLimit = vi.hoisted(() => vi.fn());
const scoreResumeSvc = vi.hoisted(() => vi.fn());

vi.mock('../services/dynamodb', () => ({ getUserById }));
vi.mock('../services/resumeService', () => ({
  getResumeById,
  updateResumeWithScore,
  getResumeScore,
}));
vi.mock('../middleware/rateLimiter', () => ({ checkRateLimit, refundRateLimit }));
vi.mock('../services/resumeScoringService', () => ({
  resumeScoringService: { scoreResume: scoreResumeSvc },
}));

import { scoreResume, getScore } from './resumeScoring';

const baseUser = (premium: boolean) =>
  ({
    id: 'u1',
    email: 'e@test.com',
    firstName: 'A',
    lastName: 'B',
    provider: 'google' as const,
    isPremium: premium,
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
  }) as any;

const sampleScore = {
  totalScore: 7,
  maxPossibleScore: 10,
  completionPercentage: 70,
  isOptimized: true,
  breakdown: { summary: 1 },
  checklist: {
    summary: {
      displayName: 'Summary',
      totalCount: 2,
      completedCount: 1,
      requiredCount: 1,
      requiredCompletedCount: 1,
      maxPoints: 1,
      earnedPoints: 0.5,
      items: [],
    },
  },
  enhancementHistory: [],
  strengths: ['S'],
  improvements: [],
  generatedAt: new Date().toISOString(),
  scoringVersion: '1.0.0',
};

const genResume = {
  professionalSummary: 'Summary text with enough content.',
  experience: [],
  education: [],
  skills: { technical: ['T'], soft: [], tools: [] },
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
  contactInfo: { fullName: 'A', email: 'a@b.com', phone: '1', location: 'US' },
  metadata: {
    generatedAt: new Date().toISOString(),
    tokensUsed: 1,
    aiProvider: 'openai',
    model: 'gpt-4o',
  },
};

const resumeRow = {
  id: 'r1',
  userId: 'u1',
  title: 'CV',
  resumeData: { language: 'en' },
  generatedResume: genResume,
  status: 'draft',
} as any;

describe('resumeScoring handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 4,
      resetTime: Date.now() + 60000,
    });
    refundRateLimit.mockResolvedValue(undefined);
    scoreResumeSvc.mockResolvedValue(sampleScore);
    updateResumeWithScore.mockResolvedValue(undefined);
    getResumeScore.mockResolvedValue(null);
  });

  it('scoreResume 401', async () => {
    const ev = makeAuthorizedEvent({ pathParameters: { id: 'r1' } });
    (ev as any).requestContext.authorizer = undefined;
    expect((await scoreResume(ev as any)).statusCode).toBe(401);
  });

  it('scoreResume 404 user', async () => {
    getUserById.mockResolvedValueOnce(null);
    expect(
      (await scoreResume(makeAuthorizedEvent({ pathParameters: { id: 'r1' } }) as any)).statusCode
    ).toBe(404);
  });

  it('scoreResume 400 missing id', async () => {
    getUserById.mockResolvedValueOnce(baseUser(true));
    expect((await scoreResume(makeAuthorizedEvent({ pathParameters: null }) as any)).statusCode).toBe(
      400
    );
  });

  it('scoreResume 429 premium rate limited', async () => {
    getUserById.mockResolvedValueOnce(baseUser(true));
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 5000,
    });
    expect(
      (await scoreResume(makeAuthorizedEvent({ pathParameters: { id: 'r1' } }) as any)).statusCode
    ).toBe(429);
  });

  it('scoreResume 404 resume', async () => {
    getUserById.mockResolvedValueOnce(baseUser(true));
    getResumeById.mockResolvedValueOnce(null);
    expect(
      (await scoreResume(makeAuthorizedEvent({ pathParameters: { id: 'r1' } }) as any)).statusCode
    ).toBe(404);
  });

  it('scoreResume 400 no generated resume', async () => {
    getUserById.mockResolvedValueOnce(baseUser(true));
    getResumeById.mockResolvedValueOnce({ ...resumeRow, generatedResume: undefined });
    expect(
      (await scoreResume(makeAuthorizedEvent({ pathParameters: { id: 'r1' } }) as any)).statusCode
    ).toBe(400);
  });

  it('scoreResume 200 premium', async () => {
    getUserById.mockResolvedValueOnce(baseUser(true));
    getResumeById.mockResolvedValueOnce(resumeRow);
    const r = await scoreResume(makeAuthorizedEvent({ pathParameters: { id: 'r1' } }) as any);
    expect(r.statusCode).toBe(200);
    expect(JSON.parse(r.body || '{}').data.totalScore).toBe(7);
  });

  it('scoreResume 200 free first score', async () => {
    getUserById.mockResolvedValueOnce(baseUser(false));
    getResumeById.mockResolvedValueOnce(resumeRow);
    const r = await scoreResume(makeAuthorizedEvent({ pathParameters: { id: 'r1' } }) as any);
    expect(r.statusCode).toBe(200);
    expect(JSON.parse(r.body || '{}').data.checklist).toEqual({});
  });

  it('scoreResume 200 free returns existing score', async () => {
    getUserById.mockResolvedValueOnce(baseUser(false));
    getResumeScore.mockResolvedValueOnce({
      ...sampleScore,
      generatedAt: '2020-01-01T00:00:00.000Z',
    });
    const r = await scoreResume(makeAuthorizedEvent({ pathParameters: { id: 'r1' } }) as any);
    expect(r.statusCode).toBe(200);
    expect(JSON.parse(r.body || '{}').isExistingScore).toBe(true);
  });

  it('scoreResume 500 refunds rate limit', async () => {
    getUserById.mockResolvedValueOnce(baseUser(true));
    getResumeById.mockResolvedValueOnce(resumeRow);
    scoreResumeSvc.mockRejectedValueOnce(new Error('fail'));
    const r = await scoreResume(makeAuthorizedEvent({ pathParameters: { id: 'r1' } }) as any);
    expect(r.statusCode).toBe(500);
    expect(refundRateLimit).toHaveBeenCalledWith('user_test_1', 'score-resume');
  });

  it('getScore 401 when authorizer missing', async () => {
    const ev = makeAuthorizedEvent({ pathParameters: { id: 'r1' }, httpMethod: 'GET' });
    (ev as any).requestContext.authorizer = undefined;
    expect((await getScore(ev as any)).statusCode).toBe(401);
  });

  it('getScore 400 when resume id missing', async () => {
    getUserById.mockResolvedValueOnce(baseUser(true));
    expect(
      (await getScore(makeAuthorizedEvent({ pathParameters: null, httpMethod: 'GET' }) as any))
        .statusCode
    ).toBe(400);
  });

  it('getScore 404 when user not found', async () => {
    getUserById.mockResolvedValueOnce(null);
    expect(
      (await getScore(
        makeAuthorizedEvent({ pathParameters: { id: 'r1' }, httpMethod: 'GET' }) as any
      )).statusCode
    ).toBe(404);
  });

  it('getScore 200 premium full score', async () => {
    getUserById.mockResolvedValueOnce(baseUser(true));
    getResumeById.mockResolvedValueOnce(resumeRow);
    getResumeScore.mockResolvedValueOnce(sampleScore);
    const r = await getScore(
      makeAuthorizedEvent({ pathParameters: { id: 'r1' }, httpMethod: 'GET' }) as any
    );
    expect(r.statusCode).toBe(200);
    const b = JSON.parse(r.body || '{}');
    expect(b.data.checklist).toEqual(sampleScore.checklist);
  });

  it('getScore 200 free user filtered score', async () => {
    getUserById.mockResolvedValueOnce(baseUser(false));
    getResumeById.mockResolvedValueOnce(resumeRow);
    getResumeScore.mockResolvedValueOnce(sampleScore);
    const r = await getScore(
      makeAuthorizedEvent({ pathParameters: { id: 'r1' }, httpMethod: 'GET' }) as any
    );
    expect(r.statusCode).toBe(200);
    expect(JSON.parse(r.body || '{}').data.checklist).toEqual({});
  });

  it('getScore 404 resume', async () => {
    getUserById.mockResolvedValueOnce(baseUser(true));
    getResumeById.mockResolvedValueOnce(null);
    expect(
      (await getScore(
        makeAuthorizedEvent({ pathParameters: { id: 'r1' }, httpMethod: 'GET' }) as any
      )).statusCode
    ).toBe(404);
  });

  it('getScore 404 score missing', async () => {
    getUserById.mockResolvedValueOnce(baseUser(true));
    getResumeById.mockResolvedValueOnce(resumeRow);
    getResumeScore.mockResolvedValueOnce(null);
    expect(
      (await getScore(
        makeAuthorizedEvent({ pathParameters: { id: 'r1' }, httpMethod: 'GET' }) as any
      )).statusCode
    ).toBe(404);
  });

  it('getScore 500', async () => {
    getUserById.mockRejectedValueOnce(new Error('db'));
    expect(
      (await getScore(
        makeAuthorizedEvent({ pathParameters: { id: 'r1' }, httpMethod: 'GET' }) as any
      )).statusCode
    ).toBe(500);
  });

  it('getScore free user includes improvement hints from checklist branches', async () => {
    const item = (done: boolean) => ({
      id: 'i1',
      label: 'L',
      description: 'D',
      isCompleted: done,
      priority: 'required' as const,
      verifierId: 'v',
    });
    const sc = (sectionKey: string, partial: { completed: number; total: number; reqDone: number; req: number; items?: any[] }) => ({
      section: sectionKey,
      displayName: sectionKey,
      totalCount: partial.total,
      completedCount: partial.completed,
      requiredCount: partial.req,
      requiredCompletedCount: partial.reqDone,
      maxPoints: 1,
      earnedPoints: 0.5,
      items: partial.items ?? [item(false)],
    });
    const richScore = {
      ...sampleScore,
      totalScore: 5,
      checklist: {
        summary: sc('summary', { completed: 1, total: 2, reqDone: 1, req: 1 }),
        experience: sc('experience', { completed: 1, total: 3, reqDone: 1, req: 2 }),
        skills: sc('skills', { completed: 0, total: 2, reqDone: 0, req: 1 }),
        education: sc('education', { completed: 1, total: 2, reqDone: 0, req: 1 }),
        contact: sc('contact', { completed: 1, total: 2, reqDone: 0, req: 1 }),
        achievements: sc('achievements', { completed: 0, total: 1, reqDone: 0, req: 0, items: [] }),
        projects: sc('projects', { completed: 1, total: 2, reqDone: 1, req: 1 }),
        languages: sc('languages', { completed: 1, total: 3, reqDone: 1, req: 1 }),
        dataQuality: {
          section: 'dataQuality',
          displayName: 'DQ',
          totalCount: 2,
          completedCount: 1,
          requiredCount: 1,
          requiredCompletedCount: 1,
          maxPoints: 1,
          earnedPoints: 0.5,
          items: [
            { id: 'dq1', label: 'a', description: 'b', isCompleted: false, priority: 'required', verifierId: 'x' },
          ],
        },
        ats: sc('ats', { completed: 1, total: 4, reqDone: 1, req: 2 }),
      },
    };
    getUserById.mockResolvedValueOnce(baseUser(false));
    getResumeById.mockResolvedValueOnce(resumeRow);
    getResumeScore.mockResolvedValueOnce(richScore as any);
    const r = await getScore(
      makeAuthorizedEvent({ pathParameters: { id: 'r1' }, httpMethod: 'GET' }) as any
    );
    expect(r.statusCode).toBe(200);
    const hints = JSON.parse(r.body || '{}').data.improvementHints as string[];
    expect(Array.isArray(hints)).toBe(true);
    expect(hints.length).toBeGreaterThan(0);
  });
});
