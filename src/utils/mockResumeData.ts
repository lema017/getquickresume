import { TemplateDataFormat } from './resumeDataToTemplateFormat';

/**
 * Generates minimal mock resume data in template format for gallery previews
 * This ensures fast rendering in template gallery cards
 */
export function generateSmallMockResumeData(): TemplateDataFormat {
  return {
    name: 'John Doe',
    title: 'Senior Software Engineer',
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'john.doe@example.com',
      website: 'johndoe.dev',
      location: 'San Francisco, CA',
    },
    profile: 'Experienced software engineer with 8+ years of expertise in full-stack development, cloud architecture, and team leadership.',
    profilePageNumber: 1,
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
    skillsPageNumbers: [1, 1, 1, 1, 1, 1],
    experience: [
      {
        position: 'Senior Software Engineer',
        company: 'Tech Corp',
        startDate: '2020',
        endDate: 'Present',
        description: [
          'Improved system performance by 40% through optimization',
          'Led team of 5 developers in agile environment',
        ],
        pageNumber: 1,
      },
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration, serving 50K+ active users.',
        pageNumber: 1,
      },
    ],
    education: [
      {
        institution: 'University of Technology',
        degree: 'Bachelor of Science in Computer Science',
        startDate: '2014',
        endDate: '2018',
        pageNumber: 1,
      },
    ],
    languages: ['English (native)', 'Spanish (advanced)'],
    languagesPageNumbers: [1, 1],
    achievements: ['Best Innovation Award - Tech Corp Annual Awards 2022'],
    achievementsPageNumbers: [1],
    certifications: ['AWS Certified Solutions Architect - 2021'],
    certificationsPageNumbers: [1],
  };
}

