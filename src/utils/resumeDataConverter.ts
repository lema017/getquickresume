import type {
  ResumeData,
  GeneratedResume,
  EnhancedExperience,
  EnhancedEducation,
  EnhancedProject,
  EnhancedCertification,
  LanguageProficiency,
} from '@/types';

/**
 * Builds a GeneratedResume object from raw ResumeData without any AI processing.
 * Used when a free user has exhausted their AI quota but should still be able
 * to preview and download their resume with the data they've entered.
 */
export function buildGeneratedResumeFromResumeData(resumeData: ResumeData): GeneratedResume {
  const formatDateRange = (startDate?: string, endDate?: string, isCurrent?: boolean): string => {
    const start = startDate || '';
    if (isCurrent) return start ? `${start} - Present` : 'Present';
    if (!start && !endDate) return '';
    if (!endDate) return start;
    return `${start} - ${endDate}`;
  };

  const experience: EnhancedExperience[] = (resumeData.experience || []).map((exp) => ({
    title: exp.title || '',
    company: exp.company || '',
    duration: formatDateRange(exp.startDate, exp.endDate, exp.isCurrent),
    location: '',
    description: exp.responsibilities?.join('. ') || '',
    achievements: exp.achievements || [],
    skills: [],
    impact: [],
    startDate: exp.startDate,
    endDate: exp.endDate,
    isCurrent: exp.isCurrent,
  }));

  const education: EnhancedEducation[] = (resumeData.education || []).map((edu) => ({
    degree: edu.degree || '',
    institution: edu.institution || '',
    field: edu.field || '',
    duration: formatDateRange(edu.startDate, edu.endDate, edu.isCurrentlyStudying),
    gpa: edu.gpa,
    relevantCoursework: [],
    honors: [],
    graduationYear: edu.endDate?.split('-')[0],
  }));

  const projects: EnhancedProject[] = (resumeData.projects || []).map((proj) => ({
    name: proj.name || '',
    description: proj.description || '',
    technologies: proj.technologies || [],
    duration: formatDateRange(proj.startDate, proj.endDate, proj.isOngoing),
    url: proj.url,
    achievements: [],
    impact: '',
    startDate: proj.startDate,
    endDate: proj.endDate,
    isOngoing: proj.isOngoing,
  }));

  const certifications: EnhancedCertification[] = (resumeData.certifications || []).map((cert) => ({
    name: cert.name || '',
    issuer: cert.issuer || '',
    date: cert.date || '',
    credentialId: cert.credentialId,
    url: cert.url,
    skills: [],
  }));

  const languages: LanguageProficiency[] = (resumeData.languages || []).map((lang) => ({
    language: lang.name || '',
    level: lang.level || 'basic',
    certifications: [],
  }));

  const achievements: string[] = (resumeData.achievements || [])
    .map((a) => [a.title, a.description].filter(Boolean).join(': '))
    .filter(Boolean);

  return {
    professionalSummary: resumeData.summary || '',
    experience,
    education,
    skills: {
      technical: resumeData.skillsRaw || [],
      soft: [],
      tools: [],
    },
    projects,
    certifications,
    achievements,
    languages,
    contactInfo: {
      fullName: [resumeData.firstName, resumeData.lastName].filter(Boolean).join(' '),
      email: resumeData.email || '',
      phone: resumeData.phone || '',
      location: resumeData.country || '',
      linkedin: resumeData.linkedin || undefined,
    },
    metadata: {
      generatedAt: new Date().toISOString(),
      tokensUsed: 0,
      aiProvider: 'none',
      model: 'none',
    },
  };
}
