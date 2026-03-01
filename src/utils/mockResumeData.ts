import type { ResumeData } from '@/types';

/**
 * Generates minimal mock resume data in ResumeData format for gallery previews.
 * Kept small for fast rendering in template gallery cards.
 */
export function generateSmallMockResumeData(): ResumeData {
  return {
    firstName: 'John',
    lastName: 'Doe',
    country: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    language: 'en',
    targetLevel: 'senior',
    profession: 'Senior Software Engineer',
    tone: 'professional',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    skillsRaw: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
    experience: [
      {
        id: 'exp-1',
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        startDate: '2020-01',
        isCurrent: true,
        achievements: [
          'Improved system performance by 40% through optimization',
          'Led team of 5 developers in agile environment',
        ],
        responsibilities: [],
        pageNumber: null,
      },
    ],
    education: [
      {
        id: 'edu-1',
        institution: 'University of Technology',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2014-09',
        endDate: '2018-05',
        isCompleted: true,
        pageNumber: null,
      },
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration, serving 50K+ active users.',
        technologies: ['React', 'Node.js', 'PostgreSQL'],
        startDate: '2021-01',
        isOngoing: false,
        pageNumber: null,
      },
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2021',
        pageNumber: null,
      },
    ],
    languages: [
      { id: 'lang-1', name: 'English', level: 'native', pageNumber: null },
      { id: 'lang-2', name: 'Spanish', level: 'advanced', pageNumber: null },
    ],
    achievements: [
      {
        id: 'ach-1',
        title: 'Best Innovation Award',
        description: 'Tech Corp Annual Awards 2022',
        year: '2022',
        pageNumber: null,
      },
    ],
    summary: 'Experienced software engineer with 8+ years of expertise in full-stack development, cloud architecture, and team leadership.',
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
