/**
 * Development-only mock resume data generator
 * 
 * This file provides pre-filled resume data for testing the wizard flow.
 * It should NEVER be used in production - only accessible when import.meta.env.DEV is true.
 */

import type { 
  ResumeData, 
  WorkExperience, 
  Education, 
  Certification, 
  Project, 
  Language, 
  Achievement 
} from '@/types';

export type MockResumeSize = 'small' | 'medium' | 'large' | 'xlarge';

// Helper to generate unique IDs
const generateId = () => `dev-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// ============================================================================
// SMALL - Minimal data for quick testing
// ============================================================================
function generateSmallResume(): Partial<ResumeData> {
  return {
    // Step 1: Profile
    firstName: 'John',
    lastName: 'Developer',
    country: 'United States',
    linkedin: 'linkedin.com/in/johndev',
    language: 'en',
    targetLevel: 'mid',
    profession: 'Software Developer',
    tone: 'professional',
    phone: '+1 555 123 4567',
    email: 'john.developer@email.com',
    
    // Step 2: Skills
    skillsRaw: ['JavaScript', 'React', 'Node.js'],
    
    // Step 3: Experience
    experience: [
      {
        id: generateId(),
        title: 'Software Developer',
        company: 'Tech Startup Inc',
        startDate: '2022-01',
        endDate: '',
        isCurrent: true,
        achievements: ['Developed web applications using React'],
        responsibilities: ['Building and maintaining frontend applications'],
        pageNumber: null,
      },
    ],
    
    // Step 4: Education
    education: [
      {
        id: generateId(),
        institution: 'State University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2018-09',
        endDate: '2022-05',
        isCompleted: true,
        pageNumber: null,
      },
    ],
    certifications: [],
    
    // Step 5: Projects & Languages
    projects: [],
    languages: [
      {
        id: generateId(),
        name: 'English',
        level: 'native',
        pageNumber: null,
      },
    ],
    
    // Step 6: Achievements
    achievements: [],
    
    // Step 7: Summary
    summary: 'Software developer with experience in web technologies.',
    jobDescription: '',
    
    // Metadata
    completedSteps: [1, 2, 3, 4, 5, 6, 7],
    currentStep: 1,
    totalCharacters: 0,
    lastSaved: new Date(),
  };
}

// ============================================================================
// MEDIUM - Standard resume for typical testing
// ============================================================================
function generateMediumResume(): Partial<ResumeData> {
  return {
    // Step 1: Profile
    firstName: 'Sarah',
    lastName: 'Engineer',
    country: 'United Kingdom',
    linkedin: 'linkedin.com/in/sarahengineer',
    language: 'en',
    targetLevel: 'mid',
    profession: 'Full Stack Developer',
    tone: 'professional',
    phone: '+44 7911 123456',
    email: 'sarah.engineer@email.com',
    
    // Step 2: Skills
    skillsRaw: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    
    // Step 3: Experience
    experience: [
      {
        id: generateId(),
        title: 'Full Stack Developer',
        company: 'Digital Solutions Ltd',
        startDate: '2021-03',
        endDate: '',
        isCurrent: true,
        achievements: [
          'Increased application performance by 40% through code optimization',
          'Led migration of legacy system to microservices architecture',
        ],
        responsibilities: [
          'Developing and maintaining web applications',
          'Collaborating with cross-functional teams',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Junior Developer',
        company: 'StartUp Hub',
        startDate: '2019-06',
        endDate: '2021-02',
        isCurrent: false,
        achievements: [
          'Developed customer-facing features used by 10,000+ users',
        ],
        responsibilities: [
          'Writing clean, maintainable code',
          'Participating in code reviews',
        ],
        pageNumber: null,
      },
    ],
    
    // Step 4: Education
    education: [
      {
        id: generateId(),
        institution: 'University of London',
        degree: 'Master of Science',
        field: 'Software Engineering',
        startDate: '2017-09',
        endDate: '2019-06',
        isCompleted: true,
        pageNumber: null,
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: 'AWS Solutions Architect Associate',
        issuer: 'Amazon Web Services',
        date: '2023-01',
        pageNumber: null,
      },
    ],
    
    // Step 5: Projects & Languages
    projects: [
      {
        id: generateId(),
        name: 'E-Commerce Platform',
        description: 'Built a full-stack e-commerce platform with real-time inventory management',
        technologies: ['React', 'Node.js', 'MongoDB'],
        startDate: '2022-01',
        endDate: '2022-06',
        isOngoing: false,
        pageNumber: null,
      },
    ],
    languages: [
      {
        id: generateId(),
        name: 'English',
        level: 'native',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Spanish',
        level: 'intermediate',
        pageNumber: null,
      },
    ],
    
    // Step 6: Achievements
    achievements: [
      {
        id: generateId(),
        title: 'Employee of the Quarter',
        description: 'Recognized for exceptional performance and innovation',
        year: '2023',
        pageNumber: null,
      },
    ],
    
    // Step 7: Summary
    summary: 'Full Stack Developer with 4+ years of experience building scalable web applications. Proven track record of improving system performance and delivering high-quality software solutions. Strong expertise in React, Node.js, and cloud technologies.',
    jobDescription: '',
    
    // Metadata
    completedSteps: [1, 2, 3, 4, 5, 6, 7],
    currentStep: 1,
    totalCharacters: 0,
    lastSaved: new Date(),
  };
}

// ============================================================================
// LARGE - Comprehensive resume for thorough testing
// ============================================================================
function generateLargeResume(): Partial<ResumeData> {
  return {
    // Step 1: Profile
    firstName: 'Michael',
    lastName: 'Thompson',
    country: 'Germany',
    linkedin: 'linkedin.com/in/michaelthompson',
    language: 'en',
    targetLevel: 'senior',
    profession: 'Senior Software Engineer',
    tone: 'professional',
    phone: '+49 151 12345678',
    email: 'michael.thompson@email.com',
    
    // Step 2: Skills
    skillsRaw: [
      'TypeScript', 'JavaScript', 'Python', 'React', 'Vue.js',
      'Node.js', 'PostgreSQL', 'MongoDB', 'AWS', 'Kubernetes',
    ],
    
    // Step 3: Experience
    experience: [
      {
        id: generateId(),
        title: 'Senior Software Engineer',
        company: 'Global Tech Corp',
        startDate: '2020-01',
        endDate: '',
        isCurrent: true,
        achievements: [
          'Architected microservices platform serving 1M+ daily active users',
          'Reduced infrastructure costs by 35% through optimization',
          'Mentored team of 5 junior developers',
        ],
        responsibilities: [
          'Leading technical design and architecture decisions',
          'Conducting code reviews and ensuring code quality',
          'Collaborating with product managers on feature specifications',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Software Engineer',
        company: 'Innovation Labs',
        startDate: '2017-06',
        endDate: '2019-12',
        isCurrent: false,
        achievements: [
          'Developed real-time analytics dashboard used by 500+ enterprises',
          'Implemented CI/CD pipeline reducing deployment time by 60%',
        ],
        responsibilities: [
          'Building and maintaining backend services',
          'Implementing automated testing strategies',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Junior Developer',
        company: 'Digital Agency',
        startDate: '2015-03',
        endDate: '2017-05',
        isCurrent: false,
        achievements: [
          'Built 20+ client websites with custom CMS solutions',
        ],
        responsibilities: [
          'Developing responsive web applications',
          'Client communication and requirements gathering',
        ],
        pageNumber: null,
      },
    ],
    
    // Step 4: Education
    education: [
      {
        id: generateId(),
        institution: 'Technical University Munich',
        degree: 'Master of Science',
        field: 'Computer Science',
        startDate: '2013-10',
        endDate: '2015-02',
        isCompleted: true,
        gpa: '1.3',
        pageNumber: null,
      },
      {
        id: generateId(),
        institution: 'University of Hamburg',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2010-10',
        endDate: '2013-09',
        isCompleted: true,
        pageNumber: null,
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: 'AWS Solutions Architect Professional',
        issuer: 'Amazon Web Services',
        date: '2023-06',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Certified Kubernetes Administrator',
        issuer: 'CNCF',
        date: '2022-08',
        pageNumber: null,
      },
    ],
    
    // Step 5: Projects & Languages
    projects: [
      {
        id: generateId(),
        name: 'Open Source CLI Tool',
        description: 'Created a developer productivity CLI tool with 2,000+ GitHub stars',
        technologies: ['Node.js', 'TypeScript'],
        url: 'github.com/example/cli-tool',
        startDate: '2021-01',
        isOngoing: true,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Real-time Collaboration Platform',
        description: 'Built a collaborative document editing platform similar to Google Docs',
        technologies: ['React', 'WebSocket', 'Redis'],
        startDate: '2020-06',
        endDate: '2021-03',
        isOngoing: false,
        pageNumber: null,
      },
    ],
    languages: [
      {
        id: generateId(),
        name: 'English',
        level: 'native',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'German',
        level: 'advanced',
        pageNumber: null,
      },
    ],
    
    // Step 6: Achievements
    achievements: [
      {
        id: generateId(),
        title: 'Tech Innovation Award',
        description: 'Awarded for developing breakthrough real-time analytics system',
        year: '2022',
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Best Paper Award',
        description: 'Published research on distributed systems at ACM conference',
        year: '2019',
        pageNumber: null,
      },
    ],
    
    // Step 7: Summary
    summary: 'Senior Software Engineer with 8+ years of experience designing and implementing scalable distributed systems. Expert in cloud architecture (AWS), microservices, and modern JavaScript/TypeScript ecosystems. Proven leader who has mentored development teams and delivered enterprise solutions serving millions of users. Strong focus on code quality, performance optimization, and DevOps best practices.',
    jobDescription: '',
    
    // Metadata
    completedSteps: [1, 2, 3, 4, 5, 6, 7],
    currentStep: 1,
    totalCharacters: 0,
    lastSaved: new Date(),
  };
}

// ============================================================================
// XLARGE - Extensive resume for edge case and pagination testing
// ============================================================================
function generateXLargeResume(): Partial<ResumeData> {
  return {
    // Step 1: Profile
    firstName: 'Alexandra',
    lastName: 'Richardson',
    country: 'Canada',
    linkedin: 'linkedin.com/in/alexandrarichardson',
    language: 'en',
    targetLevel: 'executive',
    profession: 'VP of Engineering',
    tone: 'professional',
    phone: '+1 416 555 0199',
    email: 'alexandra.richardson@email.com',
    
    // Step 2: Skills (15 skills)
    skillsRaw: [
      'Strategic Planning', 'Team Leadership', 'Agile Methodologies',
      'Python', 'Java', 'Go', 'TypeScript',
      'AWS', 'GCP', 'Azure',
      'Kubernetes', 'Docker', 'Terraform',
      'System Design', 'Data Architecture',
    ],
    
    // Step 3: Experience (5 jobs)
    experience: [
      {
        id: generateId(),
        title: 'VP of Engineering',
        company: 'Fortune 500 Tech Company',
        startDate: '2021-01',
        endDate: '',
        isCurrent: true,
        achievements: [
          'Led engineering organization of 150+ engineers across 12 teams',
          'Drove digital transformation initiative saving $15M annually',
          'Increased engineering velocity by 45% through process improvements',
          'Established engineering centers in 3 new geographic locations',
        ],
        responsibilities: [
          'Setting technical vision and strategy for the organization',
          'Managing $50M annual engineering budget',
          'Building and developing high-performing leadership team',
          'Driving technical excellence and innovation culture',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Director of Engineering',
        company: 'ScaleUp Innovations',
        startDate: '2018-03',
        endDate: '2020-12',
        isCurrent: false,
        achievements: [
          'Scaled engineering team from 20 to 80 engineers',
          'Led successful migration to cloud-native architecture',
          'Reduced system downtime by 99.5% through reliability initiatives',
        ],
        responsibilities: [
          'Managing multiple engineering teams and tech leads',
          'Defining and executing product roadmap',
          'Establishing engineering best practices and standards',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Engineering Manager',
        company: 'Tech Unicorn Inc',
        startDate: '2015-06',
        endDate: '2018-02',
        isCurrent: false,
        achievements: [
          'Built and led team that delivered core platform serving 10M users',
          'Implemented OKR framework improving team alignment by 60%',
        ],
        responsibilities: [
          'Managing team of 12 engineers',
          'Conducting performance reviews and career development',
          'Coordinating cross-team technical initiatives',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Senior Software Engineer',
        company: 'Global Systems Corp',
        startDate: '2012-08',
        endDate: '2015-05',
        isCurrent: false,
        achievements: [
          'Architected payment processing system handling $1B+ transactions',
          'Received 2 spot bonuses for exceptional technical contributions',
        ],
        responsibilities: [
          'Designing and implementing critical backend systems',
          'Mentoring junior team members',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Software Engineer',
        company: 'StartUp Labs',
        startDate: '2010-01',
        endDate: '2012-07',
        isCurrent: false,
        achievements: [
          'First engineer hired; helped grow company to Series B',
          'Built entire initial product from ground up',
        ],
        responsibilities: [
          'Full-stack development and system administration',
          'Product feature development and customer support',
        ],
        pageNumber: null,
      },
    ],
    
    // Step 4: Education (3 degrees)
    education: [
      {
        id: generateId(),
        institution: 'MIT Sloan School of Management',
        degree: 'Executive MBA',
        field: 'Technology Management',
        startDate: '2019-09',
        endDate: '2021-05',
        isCompleted: true,
        pageNumber: null,
      },
      {
        id: generateId(),
        institution: 'Stanford University',
        degree: 'Master of Science',
        field: 'Computer Science',
        startDate: '2008-09',
        endDate: '2010-06',
        isCompleted: true,
        gpa: '3.9',
        pageNumber: null,
      },
      {
        id: generateId(),
        institution: 'University of Toronto',
        degree: 'Bachelor of Science',
        field: 'Computer Engineering',
        startDate: '2004-09',
        endDate: '2008-05',
        isCompleted: true,
        gpa: '3.8',
        pageNumber: null,
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: 'AWS Solutions Architect Professional',
        issuer: 'Amazon Web Services',
        date: '2023-01',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Google Cloud Professional Architect',
        issuer: 'Google Cloud',
        date: '2022-06',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Certified Scrum Master',
        issuer: 'Scrum Alliance',
        date: '2020-03',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'PMP - Project Management Professional',
        issuer: 'PMI',
        date: '2018-11',
        pageNumber: null,
      },
    ],
    
    // Step 5: Projects (4 projects) & Languages (3 languages)
    projects: [
      {
        id: generateId(),
        name: 'Enterprise Data Platform',
        description: 'Architected and led development of enterprise-wide data platform processing 50TB daily',
        technologies: ['Spark', 'Kafka', 'Kubernetes', 'Python'],
        startDate: '2022-01',
        isOngoing: true,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'AI-Powered Customer Service',
        description: 'Launched AI chatbot reducing support tickets by 40% across 5 product lines',
        technologies: ['Python', 'TensorFlow', 'AWS', 'React'],
        startDate: '2021-03',
        endDate: '2022-06',
        isOngoing: false,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Open Source Monitoring Suite',
        description: 'Created widely-adopted monitoring framework with 5,000+ GitHub stars',
        technologies: ['Go', 'Prometheus', 'Grafana'],
        url: 'github.com/example/monitoring',
        startDate: '2019-06',
        isOngoing: true,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Mobile Banking Platform',
        description: 'Led development of secure mobile banking app with 2M+ downloads',
        technologies: ['React Native', 'Node.js', 'PostgreSQL'],
        startDate: '2017-01',
        endDate: '2018-12',
        isOngoing: false,
        pageNumber: null,
      },
    ],
    languages: [
      {
        id: generateId(),
        name: 'English',
        level: 'native',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'French',
        level: 'advanced',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Mandarin',
        level: 'intermediate',
        pageNumber: null,
      },
    ],
    
    // Step 6: Achievements (4 achievements)
    achievements: [
      {
        id: generateId(),
        title: 'CTO 50 Award',
        description: 'Named to annual list of top 50 technology leaders in North America',
        year: '2023',
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Engineering Excellence Award',
        description: 'Company-wide recognition for outstanding technical leadership',
        year: '2022',
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Published Author',
        description: 'Co-authored "Scaling Engineering Teams" published by O\'Reilly Media',
        year: '2021',
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Patent Holder',
        description: 'Awarded 3 patents for distributed systems innovations',
        year: '2019',
        pageNumber: null,
      },
    ],
    
    // Step 7: Summary
    summary: 'Visionary VP of Engineering with 13+ years of experience building and scaling world-class engineering organizations. Proven track record of leading 150+ engineer teams, driving $15M+ in cost savings, and delivering enterprise solutions serving millions of users. Expert in cloud architecture, distributed systems, and engineering leadership. Combines deep technical expertise with strategic business acumen developed through MIT Executive MBA. Passionate about developing talent, fostering innovation culture, and delivering technology that creates measurable business impact.',
    jobDescription: '',
    
    // Metadata
    completedSteps: [1, 2, 3, 4, 5, 6, 7],
    currentStep: 1,
    totalCharacters: 0,
    lastSaved: new Date(),
  };
}

// ============================================================================
// MAIN EXPORT
// ============================================================================

/**
 * Generate mock resume data for development testing.
 * This function should only be used in development mode.
 */
export function generateDevMockResume(size: MockResumeSize): Partial<ResumeData> {
  switch (size) {
    case 'small':
      return generateSmallResume();
    case 'medium':
      return generateMediumResume();
    case 'large':
      return generateLargeResume();
    case 'xlarge':
      return generateXLargeResume();
    default:
      return generateSmallResume();
  }
}

/**
 * Size descriptions for the UI
 */
export const MOCK_RESUME_SIZE_INFO: Record<MockResumeSize, { label: string; description: string }> = {
  small: {
    label: 'Small',
    description: '1 job, 3 skills',
  },
  medium: {
    label: 'Medium',
    description: '2 jobs, 6 skills, 1 project',
  },
  large: {
    label: 'Large',
    description: '3 jobs, 10 skills, 2 projects',
  },
  xlarge: {
    label: 'XLarge',
    description: '5 jobs, 15 skills, 4 projects',
  },
};

