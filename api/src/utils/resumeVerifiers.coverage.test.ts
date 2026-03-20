import { describe, it, expect } from 'vitest';
import type { GeneratedResume } from '../types';
import * as rv from './resumeVerifiers';

function minimalResume(over?: Partial<GeneratedResume>): GeneratedResume {
  const base: GeneratedResume = {
    professionalSummary:
      'Results-driven software engineer with 5+ years building scalable systems and increasing revenue by 25%.',
    experience: [
      {
        title: 'Senior Engineer',
        company: 'Acme Corp',
        duration: '2020 — Present',
        description: 'Led platform work and improved latency by 30%.',
        achievements: ['Shipped core API handling 1M requests daily'],
        skills: ['TypeScript', 'AWS'],
        impact: ['Reduced costs'],
      },
    ],
    education: [
      {
        degree: 'BS Computer Science',
        institution: 'State University',
        field: 'CS',
        duration: '2014 — 2018',
      },
    ],
    skills: {
      technical: ['Python', 'Kubernetes'],
      soft: ['Communication', 'Leadership'],
      tools: ['Docker', 'Git'],
    },
    projects: [
      {
        name: 'Data Pipeline',
        description: 'Built ETL increasing throughput 40%.',
        technologies: ['Spark'],
        duration: '2021',
        achievements: [],
        impact: 'High reliability',
      },
    ],
    certifications: [],
    achievements: ['Awarded top performer with 15% efficiency gain'],
    languages: [{ language: 'English', level: 'Native' }],
    contactInfo: {
      fullName: 'Jane Doe',
      email: 'jane@company.com',
      phone: '+15551234567',
      location: 'Austin, TX',
      linkedin: 'linkedin.com/in/janedoe',
    },
    metadata: {
      generatedAt: new Date().toISOString(),
      tokensUsed: 100,
      aiProvider: 'openai',
      model: 'gpt-4',
    },
  };
  return { ...base, ...over, metadata: { ...base.metadata, ...over?.metadata } };
}

describe('resumeVerifiers coverage', () => {
  it('runs summary and keyword verifiers', () => {
    expect(rv.verifySummaryHasAdequateLength('x').passed).toBeDefined();
    expect(rv.verifySummaryNoFirstPerson('I am great').passed).toBeDefined();
    expect(rv.verifySummaryHasMetrics('Increased revenue 10%').passed).toBeDefined();
    expect(rv.verifySummaryHasATSKeywords('Java engineer with AWS', 'engineer').passed).toBeDefined();
    expect(rv.verifyATSKeywordDensity(null).passed).toBeDefined();
    expect(
      rv.verifyATSKeywordDensity({
        totalKeywordsFound: 10,
        hardSkills: ['Python', 'AWS'],
        softSkills: ['Leadership'],
        actionVerbs: ['Led'],
        industryTerms: [],
        atsScore: 'good',
        scoreValue: 70,
        tierLabel: 'Good',
        breakdown: 'ok',
      }).passed
    ).toBe(true);
  });

  it('runs experience verifiers', () => {
    const r = minimalResume();
    expect(rv.verifyExperienceHasMetrics(r.experience).passed).toBeDefined();
    expect(rv.verifyExperienceHasActionVerbs(r.experience).passed).toBeDefined();
    expect(rv.verifyExperienceHasAchievements(r.experience).passed).toBeDefined();
    expect(rv.verifyExperienceShowsProgression(r.experience).passed).toBeDefined();
    expect(rv.verifyExperienceDataQuality(r.experience).passed).toBeDefined();
  });

  it('runs skills and education verifiers', () => {
    const r = minimalResume();
    expect(rv.verifySkillsOrganized(r.skills).passed).toBeDefined();
    expect(rv.verifyHasTechnicalSkills(r.skills).passed).toBeDefined();
    expect(rv.verifyHasSoftSkills(r.skills).passed).toBeDefined();
    expect(rv.verifyHasTools(r.skills).passed).toBeDefined();
    expect(rv.verifySkillsDataQuality(r.skills).passed).toBeDefined();
    expect(rv.verifyEducationHasDates(r.education).passed).toBeDefined();
    expect(rv.verifyEducationHasInstitution(r.education).passed).toBeDefined();
    expect(rv.verifyEducationHasDegreeField(r.education).passed).toBeDefined();
    expect(rv.verifyEducationDataQuality(r.education).passed).toBeDefined();
  });

  it('runs project, achievement, language, contact verifiers', () => {
    const r = minimalResume();
    expect(rv.verifyProjectsHaveDescriptions(r.projects).passed).toBeDefined();
    expect(rv.verifyProjectsHaveTechnologies(r.projects).passed).toBeDefined();
    expect(rv.verifyProjectsHaveImpact(r.projects).passed).toBeDefined();
    expect(rv.verifyAchievementsHaveMetrics(r.achievements).passed).toBeDefined();
    expect(rv.verifyAchievementsAreQuantifiable(r.achievements).passed).toBeDefined();
    expect(rv.verifyLanguagesHaveLevels(r.languages).passed).toBeDefined();
    expect(rv.verifyLanguagesDataQuality(r.languages).passed).toBeDefined();
    expect(rv.verifyContactHasLinkedIn(r.contactInfo).passed).toBeDefined();
    expect(rv.verifyContactHasProfessionalEmail(r.contactInfo).passed).toBeDefined();
    expect(rv.verifyContactHasPhone(r.contactInfo).passed).toBeDefined();
  });

  it('runs aggregate data quality verifiers', () => {
    const r = minimalResume();
    expect(rv.verifyProfileDataQuality(r).passed).toBeDefined();
    expect(rv.verifyCertificationsDataQuality([]).passed).toBeDefined();
    expect(rv.verifyOverallDataQuality(r).passed).toBeDefined();
  });
});
