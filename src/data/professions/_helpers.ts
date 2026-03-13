import type { ResumeData } from '@/types';

export function buildResumeData(overrides: {
  firstName: string;
  lastName: string;
  profession: string;
  summary: string;
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    isCurrent?: boolean;
    achievements: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
  languages?: Array<{ name: string; level: 'basic' | 'intermediate' | 'advanced' | 'native' }>;
}): ResumeData {
  return {
    firstName: overrides.firstName,
    lastName: overrides.lastName,
    country: 'United States',
    linkedin: '',
    language: 'en',
    targetLevel: 'mid',
    profession: overrides.profession,
    tone: 'professional',
    phone: '(555) 123-4567',
    email: `${overrides.firstName.toLowerCase()}.${overrides.lastName.toLowerCase()}@email.com`,
    skillsRaw: overrides.skills,
    experience: overrides.experience.map((exp, i) => ({
      id: `exp-${i + 1}`,
      title: exp.title,
      company: exp.company,
      startDate: exp.startDate,
      endDate: exp.endDate,
      isCurrent: exp.isCurrent ?? false,
      achievements: exp.achievements,
      responsibilities: [],
      pageNumber: null,
    })),
    education: overrides.education.map((edu, i) => ({
      id: `edu-${i + 1}`,
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      startDate: edu.startDate,
      endDate: edu.endDate,
      isCompleted: true,
      pageNumber: null,
    })),
    certifications: (overrides.certifications ?? []).map((cert, i) => ({
      id: `cert-${i + 1}`,
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      pageNumber: null,
    })),
    projects: [],
    languages: (overrides.languages ?? [
      { name: 'English', level: 'native' as const },
      { name: 'Spanish', level: 'intermediate' as const },
    ]).map((lang, i) => ({
      id: `lang-${i + 1}`,
      name: lang.name,
      level: lang.level,
      pageNumber: null,
    })),
    achievements: [],
    summary: overrides.summary,
    jobDescription: '',
    completedSteps: [1, 2, 3, 4, 5, 6, 7],
    currentStep: 7,
    totalCharacters: 0,
    lastSaved: new Date(),
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
