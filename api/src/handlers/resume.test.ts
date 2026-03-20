import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { User } from '../types';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';
import type { Resume } from '../types';

const getResumesByUserId = vi.hoisted(() => vi.fn());
const getResumeById = vi.hoisted(() => vi.fn());
const createResume = vi.hoisted(() => vi.fn());
const updateResume = vi.hoisted(() => vi.fn());
const deleteResume = vi.hoisted(() => vi.fn());
const updateResumeWithGenerated = vi.hoisted(() => vi.fn());
const updateResumeWithScore = vi.hoisted(() => vi.fn());
const getUserById = vi.hoisted(() => vi.fn());
const markFreeResumeUsed = vi.hoisted(() => vi.fn());
const incrementPremiumResumeCount = vi.hoisted(() => vi.fn());
const checkRateLimit = vi.hoisted(() => vi.fn());
const generateResumeAi = vi.hoisted(() => vi.fn());
const scoreResume = vi.hoisted(() => vi.fn());

vi.mock('../services/resumeService', () => ({
  getResumesByUserId,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  updateResumeWithGenerated,
  updateResumeWithScore,
  verifyResumeOwnership: vi.fn(),
}));

vi.mock('../services/dynamodb', () => ({
  getUserById,
  markFreeResumeUsed,
  incrementPremiumResumeCount,
}));

vi.mock('../middleware/rateLimiter', () => ({
  checkRateLimit,
}));

vi.mock('../services/aiService', () => ({
  aiService: {
    generateResume: generateResumeAi,
  },
}));

vi.mock('../services/resumeScoringService', () => ({
  resumeScoringService: {
    scoreResume,
  },
}));

import {
  listResumes,
  getResume,
  createResumeHandler,
  generateResume,
  updateResumeHandler,
  deleteResumeHandler,
  generateResumeOptions,
} from './resume';

function baseUser(over: Partial<User> = {}): User {
  const now = new Date().toISOString();
  return {
    id: 'user_1',
    email: 'u@test.com',
    firstName: 'A',
    lastName: 'B',
    provider: 'google',
    isPremium: false,
    freeResumeUsed: false,
    premiumResumeCount: 0,
    premiumResumeMonth: '2026-01',
    freeDownloadUsed: false,
    totalDownloads: 0,
    freeCoverLetterUsed: false,
    premiumCoverLetterCount: 0,
    premiumCoverLetterMonth: '2026-01',
    createdAt: now,
    updatedAt: now,
    ...over,
  };
}

const minimalResume: Resume = {
  id: 'resume_1',
  userId: 'user_1',
  title: 'A B - CV',
  resumeData: {} as Resume['resumeData'],
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
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('resume handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('listResumes', () => {
    it('returns 200 and list payload', async () => {
      getResumesByUserId.mockResolvedValueOnce([minimalResume]);
      const res = await listResumes(makeAuthorizedEvent());
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.body || '{}');
      expect(body.success).toBe(true);
      expect(body.data).toHaveLength(1);
      expect(body.message).toBe('Resumes retrieved successfully');
    });

    it('returns 500 when service throws', async () => {
      getResumesByUserId.mockRejectedValueOnce(new Error('db'));
      const res = await listResumes(makeAuthorizedEvent());
      expect(res.statusCode).toBe(500);
      const body = JSON.parse(res.body || '{}');
      expect(body.success).toBe(false);
      expect(body.error).toBe('Internal server error');
    });
  });

  describe('getResume', () => {
    it('returns 400 when id missing', async () => {
      const res = await getResume(makeAuthorizedEvent({ pathParameters: null }));
      expect(res.statusCode).toBe(400);
    });

    it('returns 404 when not found', async () => {
      getResumeById.mockResolvedValueOnce(null);
      const res = await getResume(
        makeAuthorizedEvent({ pathParameters: { id: 'missing' } })
      );
      expect(res.statusCode).toBe(404);
    });

    it('returns 200 when found', async () => {
      getResumeById.mockResolvedValueOnce(minimalResume);
      const res = await getResume(
        makeAuthorizedEvent({ pathParameters: { id: 'resume_1' } })
      );
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.body || '{}');
      expect(body.success).toBe(true);
      expect(body.data.id).toBe('resume_1');
    });
  });

  describe('createResumeHandler', () => {
    it('returns 400 without body', async () => {
      const res = await createResumeHandler(makeAuthorizedEvent({ body: null }));
      expect(res.statusCode).toBe(400);
    });

    it('returns 403 RESUME_LIMIT_REACHED for free user with one resume', async () => {
      getUserById.mockResolvedValueOnce(baseUser({ isPremium: false }));
      getResumesByUserId.mockResolvedValueOnce([minimalResume]);
      const res = await createResumeHandler(
        makeAuthorizedEvent({
          httpMethod: 'POST',
          body: JSON.stringify({
            resumeData: { profession: 'engineer', firstName: 'A', lastName: 'B' },
          }),
        })
      );
      expect(res.statusCode).toBe(403);
      const body = JSON.parse(res.body || '{}');
      expect(body.code).toBe('RESUME_LIMIT_REACHED');
      expect(body.success).toBe(false);
    });

    it('returns 201 on success', async () => {
      getUserById.mockResolvedValueOnce(baseUser({ isPremium: true }));
      createResume.mockResolvedValueOnce(minimalResume);
      const res = await createResumeHandler(
        makeAuthorizedEvent({
          httpMethod: 'POST',
          body: JSON.stringify({
            resumeData: {
              firstName: 'A',
              lastName: 'B',
              country: 'US',
              linkedin: 'x',
              language: 'en',
              targetLevel: 'mid',
              profession: 'developer',
              tone: 'professional',
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
            },
          }),
        })
      );
      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.body || '{}');
      expect(body.success).toBe(true);
      expect(body.message).toBe('Resume created successfully');
    });
  });

  describe('generateResume', () => {
    it('returns 401 without authorizer context', async () => {
      const ev = makeAuthorizedEvent();
      (ev as { requestContext: { authorizer?: unknown } }).requestContext = {
        ...ev.requestContext,
        authorizer: undefined,
      };
      const res = await generateResume(ev);
      expect(res.statusCode).toBe(401);
      const body = JSON.parse(res.body || '{}');
      expect(body.success).toBe(false);
    });

    it('returns 404 when user not found', async () => {
      getUserById.mockResolvedValueOnce(undefined);
      const res = await generateResume(
        makeAuthorizedEvent({ httpMethod: 'POST', body: '{}' })
      );
      expect(res.statusCode).toBe(404);
    });

    it('returns 429 when rate limited', async () => {
      getUserById.mockResolvedValueOnce(baseUser({ isPremium: true }));
      checkRateLimit.mockResolvedValueOnce({
        allowed: false,
        remaining: 0,
        resetTime: 123,
      });
      const res = await generateResume(
        makeAuthorizedEvent({
          httpMethod: 'POST',
          body: JSON.stringify({ resumeData: { profession: 'Dev' } }),
        })
      );
      expect(res.statusCode).toBe(429);
      const body = JSON.parse(res.body || '{}');
      expect(body.error).toBe('Rate limit exceeded');
      expect(body.resetTime).toBe(123);
    });

    it('returns 400 when body missing resumeData', async () => {
      getUserById.mockResolvedValueOnce(baseUser({ isPremium: true }));
      checkRateLimit.mockResolvedValueOnce({
        allowed: true,
        remaining: 1,
        resetTime: 1,
      });
      const res = await generateResume(
        makeAuthorizedEvent({
          httpMethod: 'POST',
          body: JSON.stringify({}),
        })
      );
      expect(res.statusCode).toBe(400);
    });

    it('returns 200 when generation succeeds (premium)', async () => {
      const month = new Date().toISOString().slice(0, 7);
      const premium = baseUser({
        isPremium: true,
        premiumResumeMonth: month,
        premiumResumeCount: 0,
      });
      getUserById.mockResolvedValue(premium);
      checkRateLimit.mockResolvedValue({
        allowed: true,
        remaining: 2,
        resetTime: Date.now() + 60_000,
      });
      createResume.mockResolvedValueOnce(minimalResume);
      const generated = {
        professionalSummary: 'Sum',
        experience: [],
        education: [],
        skills: { technical: [], soft: [], tools: [] },
        projects: [],
        certifications: [],
        achievements: [],
        languages: [],
        contactInfo: {
          fullName: 'A B',
          email: 'a@b.com',
          phone: '1',
          location: 'US',
        },
        metadata: {
          generatedAt: new Date().toISOString(),
          tokensUsed: 10,
          aiProvider: 'openai',
          model: 'gpt-4o',
        },
      };
      generateResumeAi.mockResolvedValueOnce(generated);
      incrementPremiumResumeCount.mockResolvedValueOnce(undefined);
      updateResumeWithGenerated.mockResolvedValueOnce(minimalResume);
      scoreResume.mockResolvedValueOnce({ totalScore: 72 });
      updateResumeWithScore.mockResolvedValueOnce(undefined);

      const resumeData = {
        firstName: 'A',
        lastName: 'B',
        country: 'US',
        linkedin: 'x',
        language: 'en',
        targetLevel: 'mid',
        profession: 'developer',
        tone: 'professional',
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

      const res = await generateResume(
        makeAuthorizedEvent({
          httpMethod: 'POST',
          body: JSON.stringify({ resumeData }),
        })
      );
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.body || '{}');
      expect(body.success).toBe(true);
      expect(body.resumeId).toBe('resume_1');
      expect(body.score?.totalScore).toBe(72);
    });

    it('returns 400 when body is missing', async () => {
      getUserById.mockResolvedValueOnce(baseUser({ isPremium: true }));
      checkRateLimit.mockResolvedValueOnce({
        allowed: true,
        remaining: 1,
        resetTime: 1,
      });
      const res = await generateResume(
        makeAuthorizedEvent({ httpMethod: 'POST', body: null })
      );
      expect(res.statusCode).toBe(400);
    });

    it('returns 403 when free user already used free resume', async () => {
      getUserById.mockResolvedValueOnce(baseUser({ isPremium: false, freeResumeUsed: true }));
      checkRateLimit.mockResolvedValueOnce({
        allowed: true,
        remaining: 1,
        resetTime: 1,
      });
      const res = await generateResume(
        makeAuthorizedEvent({
          httpMethod: 'POST',
          body: JSON.stringify({ resumeData: { profession: 'Dev' } }),
        })
      );
      expect(res.statusCode).toBe(403);
      expect(JSON.parse(res.body || '{}').code).toBe('PREMIUM_REQUIRED');
    });

    it('returns 403 when premium monthly resume limit reached', async () => {
      const month = new Date().toISOString().slice(0, 7);
      getUserById.mockResolvedValueOnce(
        baseUser({
          isPremium: true,
          premiumResumeMonth: month,
          premiumResumeCount: 30,
        })
      );
      checkRateLimit.mockResolvedValueOnce({
        allowed: true,
        remaining: 1,
        resetTime: 1,
      });
      const res = await generateResume(
        makeAuthorizedEvent({
          httpMethod: 'POST',
          body: JSON.stringify({ resumeData: { profession: 'Dev' } }),
        })
      );
      expect(res.statusCode).toBe(403);
    });

    it('returns 404 when resumeId does not exist', async () => {
      getUserById.mockResolvedValueOnce(baseUser({ isPremium: true }));
      checkRateLimit.mockResolvedValueOnce({
        allowed: true,
        remaining: 1,
        resetTime: 1,
      });
      getResumeById.mockResolvedValueOnce(null);
      const res = await generateResume(
        makeAuthorizedEvent({
          httpMethod: 'POST',
          body: JSON.stringify({
            resumeId: 'missing',
            resumeData: { profession: 'Dev' },
          }),
        })
      );
      expect(res.statusCode).toBe(404);
    });

    it('returns 200 when updating existing resume by resumeId', async () => {
      const month = new Date().toISOString().slice(0, 7);
      getUserById.mockResolvedValue(
        baseUser({ isPremium: true, premiumResumeMonth: month, premiumResumeCount: 0 })
      );
      checkRateLimit.mockResolvedValue({
        allowed: true,
        remaining: 2,
        resetTime: Date.now() + 60_000,
      });
      getResumeById.mockResolvedValueOnce({ ...minimalResume, userId: 'user_1' });
      const generated = {
        professionalSummary: 'S',
        experience: [],
        education: [],
        skills: { technical: [], soft: [], tools: [] },
        projects: [],
        certifications: [],
        achievements: [],
        languages: [],
        contactInfo: {
          fullName: 'A B',
          email: 'a@b.com',
          phone: '1',
          location: 'US',
        },
        metadata: {
          generatedAt: new Date().toISOString(),
          tokensUsed: 1,
          aiProvider: 'openai',
          model: 'gpt-4o',
        },
      };
      generateResumeAi.mockResolvedValueOnce(generated);
      incrementPremiumResumeCount.mockResolvedValue(undefined);
      updateResumeWithGenerated.mockResolvedValueOnce(minimalResume);
      scoreResume.mockRejectedValueOnce(new Error('score fail'));
      updateResumeWithScore.mockResolvedValueOnce(undefined);

      const resumeData = {
        firstName: 'A',
        lastName: 'B',
        country: 'US',
        linkedin: 'x',
        language: 'en',
        targetLevel: 'mid',
        profession: 'developer',
        tone: 'professional',
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

      const res = await generateResume(
        makeAuthorizedEvent({
          httpMethod: 'POST',
          body: JSON.stringify({ resumeId: 'resume_1', resumeData }),
        })
      );
      expect(res.statusCode).toBe(200);
      expect(createResume).not.toHaveBeenCalled();
    });

    it('formats profession in request body when present', async () => {
      const month = new Date().toISOString().slice(0, 7);
      getUserById.mockResolvedValue(
        baseUser({ isPremium: true, premiumResumeMonth: month, premiumResumeCount: 0 })
      );
      checkRateLimit.mockResolvedValue({
        allowed: true,
        remaining: 2,
        resetTime: Date.now() + 60_000,
      });
      createResume.mockResolvedValueOnce(minimalResume);
      generateResumeAi.mockResolvedValueOnce({
        professionalSummary: 'S',
        experience: [],
        education: [],
        skills: { technical: [], soft: [], tools: [] },
        projects: [],
        certifications: [],
        achievements: [],
        languages: [],
        contactInfo: {
          fullName: 'A B',
          email: 'a@b.com',
          phone: '1',
          location: 'US',
        },
        metadata: {
          generatedAt: new Date().toISOString(),
          tokensUsed: 1,
          aiProvider: 'openai',
          model: 'gpt-4o',
        },
      });
      incrementPremiumResumeCount.mockResolvedValue(undefined);
      updateResumeWithGenerated.mockResolvedValueOnce(minimalResume);
      scoreResume.mockResolvedValueOnce({ totalScore: 5 });
      updateResumeWithScore.mockResolvedValueOnce(undefined);

      await generateResume(
        makeAuthorizedEvent({
          httpMethod: 'POST',
          body: JSON.stringify({
            resumeData: {
              profession: 'software engineer',
              firstName: 'A',
              lastName: 'B',
              country: 'US',
              linkedin: 'x',
              language: 'en',
              targetLevel: 'mid',
              tone: 'professional',
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
            },
          }),
        })
      );
      expect(generateResumeAi).toHaveBeenCalled();
    });
  });

  describe('updateResumeHandler', () => {
    it('returns 400 without resume id', async () => {
      const res = await updateResumeHandler(
        makeAuthorizedEvent({
          httpMethod: 'PUT',
          pathParameters: null,
          body: '{}',
        })
      );
      expect(res.statusCode).toBe(400);
    });

    it('returns 200 on success', async () => {
      updateResume.mockResolvedValueOnce(minimalResume);
      const res = await updateResumeHandler(
        makeAuthorizedEvent({
          httpMethod: 'PUT',
          pathParameters: { id: 'resume_1' },
          body: JSON.stringify({ title: 'Updated' }),
        })
      );
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.body || '{}');
      expect(body.success).toBe(true);
    });

    it('returns 500 when update throws', async () => {
      updateResume.mockRejectedValueOnce(new Error('db'));
      const res = await updateResumeHandler(
        makeAuthorizedEvent({
          httpMethod: 'PUT',
          pathParameters: { id: 'resume_1' },
          body: JSON.stringify({ title: 'X' }),
        })
      );
      expect(res.statusCode).toBe(500);
    });
  });

  describe('deleteResumeHandler', () => {
    it('returns 400 without resume id', async () => {
      const res = await deleteResumeHandler(
        makeAuthorizedEvent({
          httpMethod: 'DELETE',
          pathParameters: null,
        })
      );
      expect(res.statusCode).toBe(400);
    });

    it('returns 200 on success', async () => {
      deleteResume.mockResolvedValueOnce(undefined);
      const res = await deleteResumeHandler(
        makeAuthorizedEvent({
          httpMethod: 'DELETE',
          pathParameters: { id: 'resume_1' },
        })
      );
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.body || '{}');
      expect(body.success).toBe(true);
    });

    it('returns 500 when delete throws', async () => {
      deleteResume.mockRejectedValueOnce(new Error('db'));
      const res = await deleteResumeHandler(
        makeAuthorizedEvent({
          httpMethod: 'DELETE',
          pathParameters: { id: 'resume_1' },
        })
      );
      expect(res.statusCode).toBe(500);
    });
  });

  describe('generateResumeOptions', () => {
    it('returns CORS preflight response', async () => {
      const res = await generateResumeOptions();
      expect(res.statusCode).toBe(200);
      expect(res.headers['Access-Control-Allow-Methods']).toContain('POST');
    });
  });
});
