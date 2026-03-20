import { describe, it, expect } from 'vitest';
import type { GeneratedResume, ResumeData } from '../types';
import { deterministicScoringService } from './deterministicScoringService';
import type { KeywordAnalysisData } from '../utils/resumeVerifiers';
import type { ContentValidationResult } from './contentValidatorService';

function gen(): GeneratedResume {
  return {
    professionalSummary:
      'I deliver measurable outcomes including 25% efficiency gains and lead cross-functional teams.',
    experience: [
      {
        title: 'Senior Engineer',
        company: 'Acme',
        duration: '2020 — Present',
        description: 'Built APIs and improved reliability.',
        achievements: ['Reduced latency 30% for core services'],
        skills: ['TypeScript', 'AWS'],
        impact: ['Customer satisfaction'],
      },
    ],
    education: [
      { degree: 'BS CS', institution: 'State U', field: 'CS', duration: '2012-2016' },
    ],
    skills: { technical: ['Python', 'Docker'], soft: ['Leadership'], tools: ['Git'] },
    projects: [
      {
        name: 'Data platform',
        description: 'ETL pipeline improving throughput.',
        technologies: ['Spark'],
        duration: '2021',
        achievements: [],
        impact: 'Reliability',
      },
    ],
    certifications: [{ name: 'AWS SA', issuer: 'AWS', date: '2020-01', skills: [] }],
    achievements: ['Top performer with quantified delivery'],
    languages: [{ language: 'English', level: 'Native' }],
    contactInfo: {
      fullName: 'Jane Doe',
      email: 'jane@company.com',
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

function rd(): ResumeData {
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

const kw: KeywordAnalysisData = {
  totalKeywordsFound: 12,
  hardSkills: ['Python', 'AWS', 'Docker'],
  softSkills: ['Communication'],
  actionVerbs: ['Led', 'Built'],
  industryTerms: ['SaaS'],
  atsScore: 'good',
  scoreValue: 72,
  tierLabel: 'Good',
  breakdown: 'solid',
};

const cv: ContentValidationResult = {
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

describe('deterministicScoringService', () => {
  it('scoreResume with keyword and content validation', () => {
    const s = deterministicScoringService.scoreResume(gen(), rd(), kw, cv);
    expect(s.totalScore).toBeGreaterThanOrEqual(0);
    expect(s.checklist.summary).toBeDefined();
    expect(s.checklist.ats).toBeDefined();
    expect(s.checklist.dataQuality).toBeDefined();
  });

  it('scoreResume minimal optional args', () => {
    const s = deterministicScoringService.scoreResume(gen());
    expect(s.completionPercentage).toBeGreaterThanOrEqual(0);
    expect(s.checklist.ats).toBeUndefined();
  });

  it('reEvaluateItem and helpers', () => {
    const r = deterministicScoringService.reEvaluateItem('summary-length', gen(), rd());
    expect(r).not.toBeNull();
    expect(deterministicScoringService.getSectionForItem('summary-length')).toBe('summary');
    expect(deterministicScoringService.getChecklistDefinitions().summary.length).toBeGreaterThan(0);
  });
});
