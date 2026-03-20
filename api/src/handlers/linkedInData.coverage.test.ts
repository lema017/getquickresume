import { describe, it, expect, vi, beforeEach } from 'vitest';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';

const getUserById = vi.hoisted(() => vi.fn());
const checkRateLimit = vi.hoisted(() => vi.fn());
const parseLinkedInTextToResumeData = vi.hoisted(() => vi.fn());
const createResume = vi.hoisted(() => vi.fn());

vi.mock('../services/dynamodb', () => ({ getUserById }));
vi.mock('../middleware/rateLimiter', () => ({ checkRateLimit }));
vi.mock('../services/aiService', () => ({
  aiService: { parseLinkedInTextToResumeData },
}));
vi.mock('../services/resumeService', () => ({ createResume }));

import { parseLinkedInData } from './linkedInData';

const premiumUser = {
  id: 'u1',
  email: 'e@test.com',
  firstName: 'A',
  lastName: 'B',
  provider: 'google' as const,
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
};

const about = 'a'.repeat(200);
const experience = 'e'.repeat(200);
const education = 'ed'.repeat(100);

describe('parseLinkedInData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    checkRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 4,
      resetTime: Date.now() + 60000,
    });
    getUserById.mockResolvedValue(premiumUser as any);
    parseLinkedInTextToResumeData.mockResolvedValue({
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
    });
    createResume.mockResolvedValue({ id: 'resume_li' } as any);
  });

  it('401 without authorizer', async () => {
    const ev = makeAuthorizedEvent();
    (ev as { requestContext: { authorizer?: unknown } }).requestContext.authorizer = undefined;
    expect((await parseLinkedInData(ev)).statusCode).toBe(401);
  });

  it('404 when user missing', async () => {
    getUserById.mockResolvedValueOnce(null);
    expect(
      (await parseLinkedInData(makeAuthorizedEvent({ httpMethod: 'POST', body: '{}' }))).statusCode
    ).toBe(404);
  });

  it('403 when not premium', async () => {
    getUserById.mockResolvedValueOnce({ ...premiumUser, isPremium: false } as any);
    expect(
      (await parseLinkedInData(makeAuthorizedEvent({ httpMethod: 'POST', body: '{}' }))).statusCode
    ).toBe(403);
  });

  it('403 when premium expired', async () => {
    getUserById.mockResolvedValueOnce({
      ...premiumUser,
      isPremium: true,
      subscriptionExpiration: '2000-01-01T00:00:00.000Z',
    } as any);
    expect(
      (await parseLinkedInData(makeAuthorizedEvent({ httpMethod: 'POST', body: '{}' }))).statusCode
    ).toBe(403);
  });

  it('429 when rate limited', async () => {
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 5000,
    });
    expect(
      (await parseLinkedInData(makeAuthorizedEvent({ httpMethod: 'POST', body: '{}' }))).statusCode
    ).toBe(429);
  });

  it('400 without body', async () => {
    expect(
      (await parseLinkedInData(makeAuthorizedEvent({ httpMethod: 'POST', body: null }))).statusCode
    ).toBe(400);
  });

  it('400 when required fields missing', async () => {
    expect(
      (
        await parseLinkedInData(
          makeAuthorizedEvent({
            httpMethod: 'POST',
            body: JSON.stringify({ about: 'x', experience: 'y' }),
          })
        )
      ).statusCode
    ).toBe(400);
  });

  it('200 creates resume', async () => {
    const res = await parseLinkedInData(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({
          profession: 'Dev',
          about,
          experience,
          education,
          targetLanguage: 'es',
        }),
      })
    );
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body || '{}').resumeId).toBe('resume_li');
  });

  it('500 on unexpected error', async () => {
    parseLinkedInTextToResumeData.mockRejectedValueOnce(new Error('ai'));
    const res = await parseLinkedInData(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        body: JSON.stringify({ profession: 'D', about, experience, education }),
      })
    );
    expect(res.statusCode).toBe(500);
  });
});
