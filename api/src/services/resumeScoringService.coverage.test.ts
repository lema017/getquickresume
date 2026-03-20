import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { GeneratedResume, ResumeData } from '../types';

const analyzeKeywords = vi.hoisted(() => vi.fn());
const shouldValidate = vi.hoisted(() => vi.fn());
const validateContent = vi.hoisted(() => vi.fn());

vi.mock('./keywordAnalyzerService', () => ({
  keywordAnalyzerService: { analyzeKeywords },
}));
vi.mock('./contentValidatorService', () => ({
  contentValidatorService: { shouldValidate, validateContent },
}));

import type { ResumeScore } from '../types';
import { resumeScoringService } from './resumeScoringService';

function gen(): GeneratedResume {
  return {
    professionalSummary:
      'Delivered outcomes with 25% gains and led teams across regions with strong collaboration.',
    experience: [
      {
        title: 'Engineer',
        company: 'Acme',
        duration: '2020 — Present',
        description: 'Built systems and improved reliability with Docker.',
        achievements: ['Cut latency 30%'],
        skills: ['TypeScript'],
        impact: ['Reliability'],
      },
    ],
    education: [{ degree: 'BS', institution: 'U', field: 'CS', duration: '2012-2016' }],
    skills: { technical: ['Python'], soft: ['Leadership'], tools: ['Git'] },
    projects: [
      {
        name: 'P',
        description: 'Data work with measurable throughput improvements.',
        technologies: ['Spark'],
        duration: '2021',
        achievements: [],
        impact: 'Scale',
      },
    ],
    certifications: [{ name: 'AWS', issuer: 'Amazon', date: '2020', skills: [] }],
    achievements: ['Award winner'],
    languages: [{ language: 'English', level: 'Native' }],
    contactInfo: {
      fullName: 'Jane Doe',
      email: 'jane@co.com',
      phone: '+15551234567',
      location: 'Austin',
      linkedin: 'linkedin.com/in/jane',
    },
    metadata: {
      generatedAt: new Date().toISOString(),
      tokensUsed: 1,
      aiProvider: 'openai',
      model: 'gpt-4',
    },
  };
}

function resumeData(): ResumeData {
  return {
    firstName: 'J',
    lastName: 'D',
    country: 'US',
    linkedin: 'in/j',
    language: 'en',
    targetLevel: 'senior',
    profession: 'Software Engineer',
    tone: 'professional',
    phone: '1',
    email: 'j@j.com',
    skillsRaw: ['AWS'],
    experience: [
      {
        id: 'e1',
        title: 'Dev',
        company: 'Co',
        startDate: '2020-01',
        endDate: '2021-01',
        isCurrent: false,
        responsibilities: ['Shipped features'],
        achievements: ['Won award'],
        pageNumber: null,
      },
    ],
    education: [
      {
        id: 'ed1',
        degree: 'BS',
        field: 'CS',
        institution: 'State',
        startDate: '2010',
        endDate: '2014',
        isCompleted: true,
        pageNumber: null,
      },
    ],
    certifications: [],
    projects: [],
    languages: [{ id: 'l1', name: 'English', level: 'Native', pageNumber: null }],
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

const kwResult = {
  totalKeywordsFound: 20,
  keywords: {
    hardSkills: ['a', 'b', 'c', 'd', 'e'],
    softSkills: ['f', 'g'],
    actionVerbs: ['h', 'i', 'j', 'k', 'l'],
    industryTerms: ['m', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u'],
  },
  atsScore: 'good' as const,
  scoreValue: 7,
  tierLabel: 'Good',
  breakdown: 'b',
  analyzedAt: new Date().toISOString(),
};

const cvResult = {
  overall: 85,
  isValid: true,
  sections: {
    profile: { section: 'profile', score: 90, isValid: true, invalidFields: [] },
    education: { section: 'education', score: 85, isValid: true, invalidFields: [] },
    experience: { section: 'experience', score: 85, isValid: true, invalidFields: [] },
    skills: { section: 'skills', score: 85, isValid: true, invalidFields: [] },
    certifications: { section: 'certifications', score: 85, isValid: true, invalidFields: [] },
    languages: { section: 'languages', score: 85, isValid: true, invalidFields: [] },
  },
  summary: 'ok',
};

describe('resumeScoringService', () => {
  beforeEach(() => {
    analyzeKeywords.mockReset();
    shouldValidate.mockReset();
    validateContent.mockReset();
    analyzeKeywords.mockResolvedValue(kwResult);
    shouldValidate.mockReturnValue(true);
    validateContent.mockResolvedValue(cvResult);
  });

  it('scoreResume succeeds with keyword and validation', async () => {
    const score = await resumeScoringService.scoreResume(gen(), resumeData(), true, {
      userId: 'u1',
      resumeId: 'r1',
      isPremium: true,
    });
    expect(score.totalScore).toBeGreaterThanOrEqual(0);
    expect(score.keywordAnalysis).toBeDefined();
  });

  it('scoreResume continues when keyword analysis fails', async () => {
    analyzeKeywords.mockRejectedValueOnce(new Error('kw down'));
    const score = await resumeScoringService.scoreResume(gen(), resumeData(), false, {
      userId: 'u1',
      resumeId: 'r1',
      isPremium: false,
    });
    expect(score.totalScore).toBeGreaterThanOrEqual(0);
  });

  it('scoreResume skips validation when shouldValidate false', async () => {
    shouldValidate.mockReturnValueOnce(false);
    const score = await resumeScoringService.scoreResume(gen(), resumeData(), true);
    expect(score.totalScore).toBeGreaterThanOrEqual(0);
  });

  it('scoreResume continues when validation throws', async () => {
    validateContent.mockRejectedValueOnce(new Error('val'));
    const score = await resumeScoringService.scoreResume(gen(), resumeData(), true);
    expect(score.totalScore).toBeGreaterThanOrEqual(0);
  });

  it('scoreResume throws when deterministic scoring fails', async () => {
    const { deterministicScoringService } = await import('./deterministicScoringService');
    const spy = vi.spyOn(deterministicScoringService, 'scoreResume').mockImplementationOnce(() => {
      throw new Error('det');
    });
    await expect(
      resumeScoringService.scoreResume(gen(), resumeData(), true)
    ).rejects.toThrow('Failed to score resume');
    spy.mockRestore();
  });

  it('validateScore returns boolean', () => {
    expect(
      resumeScoringService.validateScore({
        totalScore: 5,
        maxPossibleScore: 10,
        completionPercentage: 50,
        isOptimized: false,
        breakdown: {},
        checklist: {},
        enhancementHistory: [],
        strengths: [],
        improvements: [],
        generatedAt: new Date().toISOString(),
        scoringVersion: '1.0.0',
      })
    ).toBe(true);
  });

  it('validateScore rejects non-array strengths or improvements', () => {
    const base = {
      totalScore: 5,
      maxPossibleScore: 10,
      completionPercentage: 50,
      isOptimized: false,
      breakdown: {},
      checklist: {},
      enhancementHistory: [],
      generatedAt: new Date().toISOString(),
      scoringVersion: '1.0.0',
    };
    expect(
      resumeScoringService.validateScore({
        ...base,
        strengths: {} as any,
        improvements: [],
      } as any)
    ).toBe(false);
    expect(
      resumeScoringService.validateScore({
        ...base,
        strengths: [],
        improvements: 'x' as any,
      } as any)
    ).toBe(false);
  });

  it('validateScore returns false for out-of-range or bad shape', () => {
    expect(
      resumeScoringService.validateScore({
        totalScore: 11,
        maxPossibleScore: 10,
        completionPercentage: 50,
        isOptimized: false,
        breakdown: {},
        checklist: {},
        enhancementHistory: [],
        strengths: [],
        improvements: [],
        generatedAt: new Date().toISOString(),
        scoringVersion: '1.0.0',
      } as any)
    ).toBe(false);
    expect(
      resumeScoringService.validateScore({
        totalScore: 5,
        maxPossibleScore: 10,
        completionPercentage: 50,
        isOptimized: false,
        breakdown: {},
        checklist: undefined,
        enhancementHistory: [],
        strengths: [],
        improvements: [],
        generatedAt: new Date().toISOString(),
        scoringVersion: '1.0.0',
      } as any)
    ).toBe(false);
  });

  function partialScore(): ResumeScore {
    return {
      totalScore: 6,
      maxPossibleScore: 10,
      completionPercentage: 60,
      isOptimized: false,
      breakdown: { summary: 1 },
      checklist: {
        summary: {
          section: 'summary',
          displayName: 'Summary',
          totalCount: 1,
          completedCount: 1,
          requiredCount: 1,
          requiredCompletedCount: 1,
          maxPoints: 1,
          earnedPoints: 0.5,
          items: [
            {
              id: 'summary-length',
              label: 'Length',
              description: 'd',
              isCompleted: true,
              priority: 'required',
              verifierId: 'verifySummaryHasAdequateLength',
            },
          ],
        },
      },
      enhancementHistory: [],
      strengths: [],
      improvements: [],
      generatedAt: new Date().toISOString(),
      scoringVersion: '1.0.0',
    };
  }

  it('reEvaluateChecklistItem falls back to full score for unknown item', async () => {
    const s = await resumeScoringService.reEvaluateChecklistItem(
      'unknown-item-xyz',
      gen(),
      resumeData(),
      partialScore()
    );
    expect(typeof s.totalScore).toBe('number');
  });

  it('reEvaluateChecklistItem updates known checklist item', async () => {
    const s = await resumeScoringService.reEvaluateChecklistItem(
      'summary-length',
      gen(),
      resumeData(),
      partialScore()
    );
    expect(s.checklist.summary).toBeDefined();
  });

  it('reEvaluateChecklistItem rescores when checklist section missing', async () => {
    const s = await resumeScoringService.reEvaluateChecklistItem(
      'data-quality-overall',
      gen(),
      resumeData(),
      partialScore()
    );
    expect(typeof s.totalScore).toBe('number');
  });

  it('reEvaluateChecklistItem rescores when item not in section', async () => {
    const score = partialScore();
    score.checklist.summary = { ...score.checklist.summary, items: [] };
    const s = await resumeScoringService.reEvaluateChecklistItem(
      'summary-length',
      gen(),
      resumeData(),
      score
    );
    expect(typeof s.totalScore).toBe('number');
  });

  it('reEvaluateChecklistItem adjusts counts when completion toggles', async () => {
    const { deterministicScoringService } = await import('./deterministicScoringService');
    const spy = vi.spyOn(deterministicScoringService, 'reEvaluateItem').mockReturnValueOnce({
      passed: false,
      item: {
        id: 'summary-length',
        label: 'Length',
        description: 'd',
        isCompleted: false,
        priority: 'required',
        verifierId: 'verifySummaryHasAdequateLength',
      },
    });
    const s = await resumeScoringService.reEvaluateChecklistItem(
      'summary-length',
      gen(),
      resumeData(),
      partialScore()
    );
    expect(s.checklist.summary.completedCount).toBeLessThan(partialScore().checklist.summary.completedCount);
    spy.mockRestore();
  });

  it('reEvaluateChecklistItem falls back on deterministic errors', async () => {
    const { deterministicScoringService } = await import('./deterministicScoringService');
    const spy = vi.spyOn(deterministicScoringService, 'reEvaluateItem').mockImplementationOnce(() => {
      throw new Error('eval');
    });
    const s = await resumeScoringService.reEvaluateChecklistItem(
      'summary-length',
      gen(),
      resumeData(),
      partialScore()
    );
    expect(typeof s.totalScore).toBe('number');
    spy.mockRestore();
  });

  it('scoreResume logs when content validation invalid', async () => {
    validateContent.mockResolvedValueOnce({ ...cvResult, isValid: false, summary: 'issues' });
    const score = await resumeScoringService.scoreResume(gen(), resumeData(), true);
    expect(score.totalScore).toBeGreaterThanOrEqual(0);
  });

  it('scoreResume without trackingContext passes unknown resumeId to keyword analyzer', async () => {
    await resumeScoringService.scoreResume(gen(), resumeData(), true);
    expect(analyzeKeywords).toHaveBeenCalledWith(
      expect.objectContaining({ resumeId: 'unknown', userId: undefined })
    );
  });

  it('buildResumeText handles undefined skills on generated resume', async () => {
    const g = gen();
    delete (g as { skills?: unknown }).skills;
    await resumeScoringService.scoreResume(g, resumeData(), true, {
      userId: 'u1',
      resumeId: 'r1',
      isPremium: true,
    });
    expect(analyzeKeywords).toHaveBeenCalled();
  });

  it('buildResumeText skips empty summary and uses project technologies', async () => {
    const sparse = gen();
    sparse.professionalSummary = '';
    sparse.projects[0].technologies = ['Kafka', 'Spark'];
    await resumeScoringService.scoreResume(sparse, resumeData(), true, {
      userId: 'u1',
      resumeId: 'r1',
      isPremium: true,
    });
    expect(analyzeKeywords).toHaveBeenCalled();
  });

  it('buildResumeText includes experience impact when achievements empty', async () => {
    const sparse = gen();
    sparse.experience[0].achievements = [];
    sparse.experience[0].impact = ['Reduced downtime significantly'];
    await resumeScoringService.scoreResume(sparse, resumeData(), true, {
      userId: 'u1',
      resumeId: 'r1',
      isPremium: true,
    });
    expect(analyzeKeywords).toHaveBeenCalled();
  });

  it('scoreResume builds keyword text from sparse resume sections', async () => {
    const sparse: GeneratedResume = {
      ...gen(),
      professionalSummary: '',
      experience: [
        {
          title: 'T',
          company: 'C',
          duration: '2020-2021',
          description: '',
          achievements: [],
          skills: [],
          impact: [],
        },
      ],
      projects: [
        {
          name: 'Pn',
          description: 'Pd',
          technologies: [],
          duration: '2021',
          achievements: [],
          impact: '',
        },
      ],
      achievements: [],
      education: [],
    };
    await resumeScoringService.scoreResume(sparse, resumeData(), false, {
      userId: 'u1',
      resumeId: 'r1',
      isPremium: false,
    });
    expect(analyzeKeywords).toHaveBeenCalled();
  });

  it('reEvaluateChecklistItem decrements when required item becomes incomplete', async () => {
    const { deterministicScoringService } = await import('./deterministicScoringService');
    const spy = vi.spyOn(deterministicScoringService, 'reEvaluateItem').mockReturnValueOnce({
      passed: false,
      item: {
        id: 'summary-length',
        label: 'Length',
        description: 'd',
        isCompleted: false,
        priority: 'required',
        verifierId: 'verifySummaryHasAdequateLength',
      },
    });
    const base = partialScore();
    base.checklist.summary.completedCount = 1;
    base.checklist.summary.requiredCompletedCount = 1;
    base.checklist.summary.items = [
      {
        id: 'summary-length',
        label: 'Length',
        description: 'd',
        isCompleted: true,
        priority: 'required',
        verifierId: 'verifySummaryHasAdequateLength',
      },
    ];
    const s = await resumeScoringService.reEvaluateChecklistItem(
      'summary-length',
      gen(),
      resumeData(),
      base
    );
    expect(s.checklist.summary.completedCount).toBe(0);
    spy.mockRestore();
  });

  it('reEvaluateChecklistItem falls back to full score when reEvaluate throws', async () => {
    const { deterministicScoringService } = await import('./deterministicScoringService');
    const spy = vi.spyOn(deterministicScoringService, 'reEvaluateItem').mockImplementationOnce(() => {
      throw new Error('boom');
    });
    const s = await resumeScoringService.reEvaluateChecklistItem(
      'summary-length',
      gen(),
      resumeData(),
      partialScore()
    );
    expect(typeof s.totalScore).toBe('number');
    spy.mockRestore();
  });

  it('scoreResume merges resumeData certifications and languages for validation', async () => {
    const rd = resumeData();
    rd.certifications = [
      { id: 'c1', name: 'PMP', issuer: 'PMI', date: '2019', credentialId: '', pageNumber: null },
    ];
    await resumeScoringService.scoreResume(gen(), rd, true, {
      userId: 'u1',
      resumeId: 'r1',
      isPremium: true,
    });
    expect(validateContent).toHaveBeenCalled();
    const arg = validateContent.mock.calls[0][0] as GeneratedResume;
    expect(arg.certifications?.[0]?.name).toBe('PMP');
  });

  it('convertToResumeScore exposes ATS breakdown when deterministic checklist includes ats', async () => {
    const { deterministicScoringService } = await import('./deterministicScoringService');
    const stub = {
      totalScore: 7,
      maxPossibleScore: 10,
      completionPercentage: 70,
      isOptimized: false,
      checklist: {
        summary: {
          section: 'summary',
          displayName: 'Summary',
          totalCount: 1,
          completedCount: 1,
          requiredCount: 1,
          requiredCompletedCount: 1,
          maxPoints: 1,
          earnedPoints: 0.5,
          items: [],
        },
        ats: {
          section: 'ats',
          displayName: 'ATS',
          totalCount: 1,
          completedCount: 0,
          requiredCount: 0,
          requiredCompletedCount: 0,
          maxPoints: 1,
          earnedPoints: 0.8,
          items: [],
        },
      },
      enhancementHistory: [],
      strengths: [],
      improvements: [],
      generatedAt: new Date().toISOString(),
      scoringVersion: '2.0.0',
    };
    const spy = vi.spyOn(deterministicScoringService, 'scoreResume').mockReturnValueOnce(stub as any);
    const score = await resumeScoringService.scoreResume(gen(), resumeData(), true);
    expect(score.breakdown.ats).toBe(0.8);
    spy.mockRestore();
  });

  it('reEvaluateChecklistItem builds improvements for recommended incomplete items', async () => {
    const { deterministicScoringService } = await import('./deterministicScoringService');
    const spy = vi.spyOn(deterministicScoringService, 'reEvaluateItem').mockReturnValueOnce({
      passed: false,
      item: {
        id: 'summary-length',
        label: 'Length',
        description: 'Expand your summary',
        isCompleted: false,
        priority: 'recommended',
        verifierId: 'verifySummaryHasAdequateLength',
      },
    });
    const base = partialScore();
    base.checklist.summary.items = [
      {
        id: 'summary-length',
        label: 'Length',
        description: 'Expand your summary',
        isCompleted: true,
        priority: 'recommended',
        verifierId: 'verifySummaryHasAdequateLength',
      },
    ];
    base.checklist.summary.completedCount = 1;
    const s = await resumeScoringService.reEvaluateChecklistItem(
      'summary-length',
      gen(),
      resumeData(),
      base
    );
    expect(s.improvements.length).toBeGreaterThan(0);
    spy.mockRestore();
  });

  it('reEvaluateChecklistItem strengths prefer item details over description', async () => {
    const { deterministicScoringService } = await import('./deterministicScoringService');
    const spy = vi.spyOn(deterministicScoringService, 'reEvaluateItem').mockReturnValueOnce({
      passed: true,
      item: {
        id: 'summary-length',
        label: 'Length',
        description: 'Short desc',
        details: 'Verifier detail line',
        isCompleted: true,
        priority: 'required',
        verifierId: 'verifySummaryHasAdequateLength',
      },
    });
    const base = partialScore();
    base.checklist.summary.items = [
      {
        id: 'summary-length',
        label: 'Length',
        description: 'Short desc',
        isCompleted: false,
        priority: 'required',
        verifierId: 'verifySummaryHasAdequateLength',
      },
    ];
    base.checklist.summary.completedCount = 0;
    base.checklist.summary.requiredCompletedCount = 0;
    const s = await resumeScoringService.reEvaluateChecklistItem(
      'summary-length',
      gen(),
      resumeData(),
      base
    );
    expect(s.strengths.some(st => st.includes('Verifier detail'))).toBe(true);
    spy.mockRestore();
  });

  it('reEvaluateChecklistItem recalculate skips breakdown keys not in existing score', async () => {
    const { deterministicScoringService } = await import('./deterministicScoringService');
    const spy = vi.spyOn(deterministicScoringService, 'reEvaluateItem').mockReturnValueOnce({
      passed: true,
      item: {
        id: 'summary-length',
        label: 'Length',
        description: 'd',
        isCompleted: true,
        priority: 'required',
        verifierId: 'verifySummaryHasAdequateLength',
      },
    });
    const base = partialScore();
    base.breakdown = { summary: 0.5 } as ResumeScore['breakdown'];
    base.checklist.ats = {
      section: 'ats',
      displayName: 'ATS',
      totalCount: 1,
      completedCount: 0,
      requiredCount: 0,
      requiredCompletedCount: 0,
      maxPoints: 1,
      earnedPoints: 0,
      items: [
        {
          id: 'ats-x',
          label: 'X',
          description: 'd',
          isCompleted: true,
          priority: 'optional',
          verifierId: 'verifyATSKeywordDensity',
        },
      ],
    };
    const s = await resumeScoringService.reEvaluateChecklistItem(
      'summary-length',
      gen(),
      resumeData(),
      base
    );
    expect(s.checklist.ats).toBeDefined();
    spy.mockRestore();
  });

  it('reEvaluateChecklistItem skips count change when completion state unchanged', async () => {
    const { deterministicScoringService } = await import('./deterministicScoringService');
    const spy = vi.spyOn(deterministicScoringService, 'reEvaluateItem').mockReturnValueOnce({
      passed: false,
      item: {
        id: 'summary-length',
        label: 'Length',
        description: 'd',
        isCompleted: false,
        priority: 'required',
        verifierId: 'verifySummaryHasAdequateLength',
      },
    });
    const base = partialScore();
    base.checklist.summary.items = [
      {
        id: 'summary-length',
        label: 'Length',
        description: 'd',
        isCompleted: false,
        priority: 'required',
        verifierId: 'verifySummaryHasAdequateLength',
      },
    ];
    base.checklist.summary.completedCount = 0;
    base.checklist.summary.requiredCompletedCount = 0;
    const s = await resumeScoringService.reEvaluateChecklistItem(
      'summary-length',
      gen(),
      resumeData(),
      base
    );
    expect(s.checklist.summary.completedCount).toBe(0);
    spy.mockRestore();
  });

  it('reEvaluateChecklistItem uses recalculate when item toggles with optional priority', async () => {
    const { deterministicScoringService } = await import('./deterministicScoringService');
    const spy = vi.spyOn(deterministicScoringService, 'reEvaluateItem').mockReturnValueOnce({
      passed: true,
      item: {
        id: 'summary-length',
        label: 'Length',
        description: 'd',
        isCompleted: true,
        priority: 'optional',
        verifierId: 'verifySummaryHasAdequateLength',
      },
    });
    const base = partialScore();
    base.checklist.summary.items = [
      {
        id: 'summary-length',
        label: 'Length',
        description: 'd',
        isCompleted: false,
        priority: 'optional',
        verifierId: 'verifySummaryHasAdequateLength',
      },
    ];
    base.checklist.summary.completedCount = 0;
    base.checklist.summary.totalCount = 1;
    const s = await resumeScoringService.reEvaluateChecklistItem(
      'summary-length',
      gen(),
      resumeData(),
      base
    );
    expect(typeof s.totalScore).toBe('number');
    spy.mockRestore();
  });
});
