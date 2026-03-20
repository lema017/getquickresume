import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as san from './inputSanitizer';
import * as out from './outputValidator';
import {
  getAIConfigForUser,
  getPremiumProvider,
  isPremiumUsingGroq,
  GROQ_FREE_MODEL,
} from './aiProviderSelector';
import { toTitleCase, formatName, formatProfession } from './textFormatting';
import { extractProjectCandidates } from './projectExtractor';
import type { User } from '../types';

vi.mock('../services/dynamodb', () => ({
  updateUser: vi.fn().mockResolvedValue({ id: 'u1', isPremium: false }),
}));

import { checkPremiumStatus, validateAndUpdatePremiumStatus } from './premiumValidator';
import { updateUser } from '../services/dynamodb';

const longResume =
  'A'.repeat(60) +
  ' Professional software engineer with experience in building systems and leading teams responsibly. ';

describe('inputSanitizer coverage', () => {
  it('exports and core sanitizers', () => {
    expect(san.SECURITY_PREAMBLE.length).toBeGreaterThan(10);
    expect(san.SECURITY_PREAMBLE_SCOPED.length).toBeGreaterThan(10);
    expect(san.normalizeUnicode('')).toBe('');
    expect(san.normalizeUnicode('test')).toContain('test');
    expect(san.escapeDelimiters('"""')).toContain('\\"');
    expect(san.sanitizeForPrompt('<b>x</b>', 100)).toBeTruthy();
    expect(san.sanitizeUserInput('  hello  ')).toBeTruthy();
    expect(san.sanitizeUserMultiline('line\nline', 100)).toBeTruthy();
    expect(san.validateInputLarge('', 10).isValid).toBe(false);
    expect(san.validateInput('ok').isValid).toBe(true);
    expect(san.sanitizeSectionType('summary')).toBe('summary');
    expect(san.sanitizeSectionType('bad')).toBeNull();
    expect(san.sanitizeLanguage('es')).toBe('es');
    expect(san.sanitizeLanguage('xx')).toBe('es');
  });

  it('validatePublicTranslationInput branches', () => {
    expect(san.validatePublicTranslationInput(null, undefined).isValid).toBe(false);
    expect(san.validatePublicTranslationInput('{}', 'text/plain').isValid).toBe(false);
    expect(san.validatePublicTranslationInput('not-json', 'application/json').isValid).toBe(false);
    expect(
      san.validatePublicTranslationInput(JSON.stringify({ text: 'short' }), 'application/json').isValid
    ).toBe(false);
    const ok = san.validatePublicTranslationInput(
      JSON.stringify({ text: longResume, targetLanguage: 'es' }),
      'application/json'
    );
    expect(ok.isValid).toBe(true);
    expect(
      san.validatePublicTranslationInput(
        JSON.stringify({ text: longResume, targetLanguage: 'es', sourceLanguage: 'es' }),
        'application/json'
      ).isValid
    ).toBe(false);
  });

  it('validatePublicAtsCheckInput branches', () => {
    expect(san.validatePublicAtsCheckInput(null, undefined).isValid).toBe(false);
    const ok = san.validatePublicAtsCheckInput(
      JSON.stringify({ text: longResume, profession: 'Engineer' }),
      'application/json'
    );
    expect(ok.isValid).toBe(true);
  });

  it('validateLeadCaptureInput', () => {
    expect(san.validateLeadCaptureInput(null, undefined).isValid).toBe(false);
    expect(
      san.validateLeadCaptureInput(JSON.stringify({ email: 'a@b.co', _hp: 'x' }), 'application/json').isValid
    ).toBe(false);
    const ok = san.validateLeadCaptureInput(
      JSON.stringify({ email: 'user@example.com', phone: '+15551234567', country: 'US' }),
      'application/json'
    );
    expect(ok.isValid).toBe(true);
  });
});

describe('outputValidator coverage', () => {
  it('validators', () => {
    expect(out.detectOutputInjection('ok').isValid).toBe(true);
    expect(out.validateImprovedText('b', 'a', 'summary').isValid).toBe(true);
    expect(out.validateMechanicalEnhancement('improved text here', 'original text here').isValid).toBe(true);
    expect(out.validateSectionType('summary')).toBe(true);
    expect(out.validateSectionType('nope')).toBe(false);
    expect(out.validateTextLength('x', 5)).toBe(true);
    expect(out.validateLanguage('en')).toBe(true);
    const score = {
      totalScore: 5,
      breakdown: {
        summary: 1,
        experience: 1,
        skills: 1,
        education: 1,
        projects: 1,
        achievements: 1,
        languages: 0.5,
        contact: 0.5,
      },
      completionPercentage: 50,
      isOptimized: false,
      checklist: { a: true },
      strengths: ['s'],
      weaknesses: ['w'],
      improvements: ['i'],
      generatedAt: new Date().toISOString(),
      scoringVersion: '1',
    };
    expect(out.validateResumeScore(score).isValid).toBe(true);
    expect(out.validateResumeScore(null).isValid).toBe(false);
  });
});

describe('aiProviderSelector', () => {
  it('returns configs', () => {
    expect(getAIConfigForUser(false).provider).toBe('groq');
    expect(getAIConfigForUser(false).model).toBe(GROQ_FREE_MODEL);
    expect(['openai', 'groq']).toContain(getPremiumProvider());
    expect(typeof isPremiumUsingGroq()).toBe('boolean');
  });
});

describe('textFormatting', () => {
  it('formats strings', () => {
    expect(toTitleCase('hello world')).toBeTruthy();
    expect(formatName("o'connor smith")).toBeTruthy();
    expect(formatProfession('software engineer')).toBeTruthy();
    expect(toTitleCase('')).toBe('');
  });
});

describe('projectExtractor', () => {
  it('extracts candidates', () => {
    const raw = `My Project\nJan 2020 - Present\nBuilt things\nTechnologies: Python, AWS`;
    expect(extractProjectCandidates(raw).length).toBeGreaterThanOrEqual(0);
    expect(extractProjectCandidates('')).toEqual([]);
  });
});

describe('premiumValidator', () => {
  beforeEach(() => {
    vi.mocked(updateUser).mockClear();
  });

  it('checkPremiumStatus', () => {
    const u: User = {
      id: '1',
      email: 'e@e.com',
      firstName: 'a',
      lastName: 'b',
      provider: 'google',
      isPremium: false,
      freeResumeUsed: false,
      premiumResumeCount: 0,
      premiumResumeMonth: '2025-01',
      freeDownloadUsed: false,
      totalDownloads: 0,
      freeCoverLetterUsed: false,
      premiumCoverLetterCount: 0,
      premiumCoverLetterMonth: '2025-01',
      createdAt: '',
      updatedAt: '',
    };
    expect(checkPremiumStatus(u).isPremium).toBe(false);
    const legacy: User = { ...u, isPremium: true };
    expect(checkPremiumStatus(legacy).isPremium).toBe(true);
  });

  it('validateAndUpdatePremiumStatus downgrades expired', async () => {
    const past = new Date(Date.now() - 86400000).toISOString();
    const u: User = {
      id: '1',
      email: 'e@e.com',
      firstName: 'a',
      lastName: 'b',
      provider: 'google',
      isPremium: true,
      subscriptionExpiration: past,
      freeResumeUsed: false,
      premiumResumeCount: 0,
      premiumResumeMonth: '2025-01',
      freeDownloadUsed: false,
      totalDownloads: 0,
      freeCoverLetterUsed: false,
      premiumCoverLetterCount: 0,
      premiumCoverLetterMonth: '2025-01',
      createdAt: '',
      updatedAt: '',
    };
    const r = await validateAndUpdatePremiumStatus(u);
    expect(r.isPremium).toBe(false);
    expect(updateUser).toHaveBeenCalled();
  });
});
