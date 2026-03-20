import { describe, it, expect, vi, beforeEach } from 'vitest';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';

const getUserById = vi.hoisted(() => vi.fn());
const getResumeById = vi.hoisted(() => vi.fn());
const createResume = vi.hoisted(() => vi.fn());
const updateResumeWithGenerated = vi.hoisted(() => vi.fn());
const translateResume = vi.hoisted(() => vi.fn());

vi.mock('../services/dynamodb', () => ({ getUserById }));
vi.mock('../services/resumeService', () => ({
  getResumeById,
  createResume,
  updateResumeWithGenerated,
}));
vi.mock('../services/translationService', () => ({
  translationService: { translateResume },
}));

import { translateResume as translateResumeHandler } from './resumeTranslation';

const premiumUser = {
  id: 'u1',
  email: 'e@test.com',
  firstName: 'A',
  lastName: 'B',
  provider: 'google' as const,
  isPremium: true,
  subscriptionExpiration: '2099-01-01T00:00:00.000Z',
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

const rd = {
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

const gr = {
  professionalSummary: 'S',
  experience: [],
  education: [],
  skills: { technical: [], soft: [], tools: [] },
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

describe('translateResume handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getUserById.mockResolvedValue(premiumUser as any);
    getResumeById.mockResolvedValue({
      id: 'r1',
      userId: 'u1',
      title: 'My CV',
      resumeData: rd,
      generatedResume: gr,
    } as any);
    translateResume.mockResolvedValue({
      translatedResumeData: { ...rd, language: 'es' },
      translatedGeneratedResume: gr,
    });
    createResume.mockResolvedValue({ id: 'r2', userId: 'u1', title: 'T', resumeData: rd } as any);
    updateResumeWithGenerated.mockResolvedValue({ id: 'r2' } as any);
  });

  it('401', async () => {
    const ev = makeAuthorizedEvent({
      httpMethod: 'POST',
      pathParameters: { id: 'r1' },
      body: JSON.stringify({ targetLanguage: 'es' }),
    });
    (ev as any).requestContext.authorizer = undefined;
    expect((await translateResumeHandler(ev as any)).statusCode).toBe(401);
  });

  it('403 not premium', async () => {
    getUserById.mockResolvedValueOnce({ ...premiumUser, isPremium: false } as any);
    const r = await translateResumeHandler(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        pathParameters: { id: 'r1' },
        body: JSON.stringify({ targetLanguage: 'es' }),
      }) as any
    );
    expect(r.statusCode).toBe(403);
  });

  it('400 invalid mode', async () => {
    const r = await translateResumeHandler(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        pathParameters: { id: 'r1' },
        body: JSON.stringify({ targetLanguage: 'es', mode: 'bogus' }),
      }) as any
    );
    expect(r.statusCode).toBe(400);
  });

  it('400 invalid language', async () => {
    const r = await translateResumeHandler(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        pathParameters: { id: 'r1' },
        body: JSON.stringify({ targetLanguage: 'xx' }),
      }) as any
    );
    expect(r.statusCode).toBe(400);
  });

  it('400 same language translate mode', async () => {
    const r = await translateResumeHandler(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        pathParameters: { id: 'r1' },
        body: JSON.stringify({ targetLanguage: 'en', mode: 'translate' }),
      }) as any
    );
    expect(r.statusCode).toBe(400);
  });

  it('400 rewrite language mismatch', async () => {
    const r = await translateResumeHandler(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        pathParameters: { id: 'r1' },
        body: JSON.stringify({ targetLanguage: 'es', mode: 'rewrite' }),
      }) as any
    );
    expect(r.statusCode).toBe(400);
  });

  it('200 translate mode', async () => {
    const r = await translateResumeHandler(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        pathParameters: { id: 'r1' },
        body: JSON.stringify({ targetLanguage: 'es' }),
      }) as any
    );
    expect(r.statusCode).toBe(200);
    expect(translateResume).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Object),
      'es',
      expect.any(Object),
      'translate'
    );
  });

  it('200 rewrite mode', async () => {
    const r = await translateResumeHandler(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        pathParameters: { id: 'r1' },
        body: JSON.stringify({ targetLanguage: 'en', mode: 'rewrite' }),
      }) as any
    );
    expect(r.statusCode).toBe(200);
  });

  it('404 resume', async () => {
    getResumeById.mockResolvedValueOnce(null);
    const r = await translateResumeHandler(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        pathParameters: { id: 'missing' },
        body: JSON.stringify({ targetLanguage: 'es' }),
      }) as any
    );
    expect(r.statusCode).toBe(404);
  });

  it('400 without generated resume', async () => {
    getResumeById.mockResolvedValueOnce({
      id: 'r1',
      userId: 'user_test_1',
      title: 'T',
      resumeData: rd,
      generatedResume: undefined,
    } as any);
    const r = await translateResumeHandler(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        pathParameters: { id: 'r1' },
        body: JSON.stringify({ targetLanguage: 'es' }),
      }) as any
    );
    expect(r.statusCode).toBe(400);
  });

  it('500 when createResume fails', async () => {
    createResume.mockRejectedValueOnce(new Error('ddb'));
    const r = await translateResumeHandler(
      makeAuthorizedEvent({
        httpMethod: 'POST',
        pathParameters: { id: 'r1' },
        body: JSON.stringify({ targetLanguage: 'es' }),
      }) as any
    );
    expect(r.statusCode).toBe(500);
  });
});
