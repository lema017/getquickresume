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

export type MockResumeSize = 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge';

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
    country: 'Costa Rica',
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
    jobDescription: 'I bring a strong problem-solving mindset and a passion for writing clean, maintainable code that delivers real user value.',
    
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
    country: 'Costa Rica',
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
    jobDescription: 'I combine deep full-stack expertise with a user-centric mindset, consistently delivering features that improve both performance and user experience. My ability to bridge frontend and backend makes me highly effective at shipping end-to-end solutions independently.',
    
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
    country: 'Costa Rica',
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
    jobDescription: 'What sets me apart is my rare combination of deep systems architecture expertise and strong mentoring skills. I don\'t just build scalable platforms — I elevate entire teams by establishing engineering best practices and fostering a culture of continuous improvement. My published research on distributed systems demonstrates thought leadership beyond day-to-day delivery.',
    
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
    country: 'Costa Rica',
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
    jobDescription: 'I uniquely bridge the gap between executive business strategy and hands-on technical architecture. With an MIT Executive MBA and 13+ years of progressive engineering leadership, I bring a rare ability to translate board-level objectives into concrete technology roadmaps. My track record of scaling teams from 20 to 150+ engineers while maintaining engineering excellence and culture sets me apart from leaders who focus solely on either people or technology.',
    
    // Metadata
    completedSteps: [1, 2, 3, 4, 5, 6, 7],
    currentStep: 1,
    totalCharacters: 0,
    lastSaved: new Date(),
  };
}

// ============================================================================
// XXLARGE - Massive resume for stress-testing pagination and layout limits
// ============================================================================
function generateXXLargeResume(): Partial<ResumeData> {
  return {
    // Step 1: Profile
    firstName: 'Maximilian',
    lastName: 'Worthington-Clarke',
    country: 'Costa Rica',
    linkedin: 'linkedin.com/in/maxworthingtonclarke',
    language: 'en',
    targetLevel: 'executive',
    profession: 'Chief Technology Officer & Co-Founder',
    tone: 'professional',
    phone: '+1 212 555 0342',
    email: 'maximilian.worthington-clarke@enterprise-solutions.com',

    // Step 2: Skills (30 skills)
    skillsRaw: [
      'Strategic Technology Leadership', 'Enterprise Architecture', 'Cloud-Native Development',
      'Artificial Intelligence & ML', 'DevOps & SRE', 'Agile & SAFe Methodologies',
      'Python', 'Java', 'Go', 'TypeScript', 'Rust', 'Scala',
      'React', 'Angular', 'Vue.js', 'Next.js',
      'AWS', 'Google Cloud Platform', 'Microsoft Azure', 'Kubernetes',
      'Docker', 'Terraform', 'Apache Kafka', 'Apache Spark',
      'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch',
      'System Design', 'Data Engineering',
    ],

    // Step 3: Experience (10 jobs)
    experience: [
      {
        id: generateId(),
        title: 'Chief Technology Officer & Co-Founder',
        company: 'NexGen Platforms Inc.',
        startDate: '2022-01',
        endDate: '',
        isCurrent: true,
        achievements: [
          'Co-founded AI-first enterprise platform valued at $250M within 18 months',
          'Recruited and scaled engineering organization from 5 to 200+ engineers across 4 continents',
          'Secured SOC 2 Type II, HIPAA, and ISO 27001 compliance within first year',
          'Architected multi-tenant SaaS platform processing 500M+ API requests daily',
        ],
        responsibilities: [
          'Defining company-wide technology vision, strategy, and multi-year roadmap',
          'Overseeing $80M annual technology budget and vendor relationships',
          'Presenting technology strategy to Board of Directors and investors quarterly',
          'Establishing engineering culture, hiring practices, and career frameworks',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Senior Vice President of Engineering',
        company: 'Meridian Financial Technologies',
        startDate: '2019-03',
        endDate: '2021-12',
        isCurrent: false,
        achievements: [
          'Led engineering division of 350+ engineers delivering core banking platform',
          'Drove cloud migration initiative reducing infrastructure costs by $22M annually',
          'Achieved 99.999% uptime for mission-critical transaction processing systems',
          'Launched mobile banking platform reaching 8M active users within first year',
        ],
        responsibilities: [
          'Managing 8 engineering directors and 25+ team leads',
          'Driving digital transformation across legacy banking systems',
          'Partnering with CISO on security architecture and regulatory compliance',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'VP of Engineering — Platform & Infrastructure',
        company: 'Hyperscale Cloud Solutions',
        startDate: '2016-06',
        endDate: '2019-02',
        isCurrent: false,
        achievements: [
          'Built and led platform engineering organization of 150 engineers',
          'Designed Kubernetes-based deployment platform serving 2,000+ microservices',
          'Reduced mean time to recovery (MTTR) from 4 hours to under 15 minutes',
        ],
        responsibilities: [
          'Owning infrastructure, platform, and developer experience engineering',
          'Driving adoption of site reliability engineering practices',
          'Managing $35M annual cloud infrastructure spend',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Director of Engineering — Data Platform',
        company: 'OmniData Analytics',
        startDate: '2014-01',
        endDate: '2016-05',
        isCurrent: false,
        achievements: [
          'Architected real-time data pipeline processing 100TB+ daily across 50+ data sources',
          'Built ML feature store adopted by 200+ data scientists company-wide',
          'Reduced data processing costs by 65% through Spark optimization',
        ],
        responsibilities: [
          'Leading data platform, data engineering, and ML infrastructure teams',
          'Defining data governance standards and data quality frameworks',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Engineering Manager — Backend Services',
        company: 'GlobalCommerce Corp',
        startDate: '2012-03',
        endDate: '2013-12',
        isCurrent: false,
        achievements: [
          'Led team that rebuilt checkout flow increasing conversion rate by 28%',
          'Implemented service mesh architecture reducing inter-service latency by 40%',
          'Mentored 4 engineers to senior and staff-level promotions',
        ],
        responsibilities: [
          'Managing 15-person backend engineering team',
          'Owning order management and payment processing services',
          'Running on-call rotations and incident response processes',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Senior Software Engineer',
        company: 'Apex Technology Partners',
        startDate: '2010-06',
        endDate: '2012-02',
        isCurrent: false,
        achievements: [
          'Designed event-driven architecture handling 50K events per second',
          'Created automated testing framework reducing QA cycle from 2 weeks to 2 days',
          'Received company-wide "Innovator of the Year" award',
        ],
        responsibilities: [
          'Designing and implementing high-throughput distributed systems',
          'Leading technical design reviews and architectural decisions',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Software Engineer II',
        company: 'CyberSecure Systems',
        startDate: '2008-09',
        endDate: '2010-05',
        isCurrent: false,
        achievements: [
          'Built real-time threat detection engine analyzing 10M+ network events per minute',
          'Received security clearance and contributed to 2 government defense contracts',
        ],
        responsibilities: [
          'Developing security monitoring and intrusion detection software',
          'Collaborating with threat intelligence analysts on detection algorithms',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Software Engineer',
        company: 'Velocity Web Studios',
        startDate: '2006-07',
        endDate: '2008-08',
        isCurrent: false,
        achievements: [
          'Developed content management platform serving 500+ enterprise clients',
          'Optimized database queries reducing page load times by 70%',
        ],
        responsibilities: [
          'Full-stack development of client web applications',
          'Database design and query optimization',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Junior Software Developer',
        company: 'Pixel Perfect Agency',
        startDate: '2005-01',
        endDate: '2006-06',
        isCurrent: false,
        achievements: [
          'Delivered 30+ client projects on time and within budget',
          'Built first automated deployment pipeline used by entire agency',
        ],
        responsibilities: [
          'Developing responsive websites and interactive web applications',
          'Client requirement gathering and technical documentation',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Software Development Intern',
        company: 'TechForward Labs',
        startDate: '2004-05',
        endDate: '2004-12',
        isCurrent: false,
        achievements: [
          'Prototyped mobile app feature that was included in the next major product release',
        ],
        responsibilities: [
          'Assisting senior developers with feature development and bug fixes',
          'Writing unit tests and integration tests',
        ],
        pageNumber: null,
      },
    ],

    // Step 4: Education (6 degrees)
    education: [
      {
        id: generateId(),
        institution: 'Harvard Business School',
        degree: 'Executive MBA',
        field: 'Technology & Operations Management',
        startDate: '2020-09',
        endDate: '2022-05',
        isCompleted: true,
        pageNumber: null,
      },
      {
        id: generateId(),
        institution: 'Massachusetts Institute of Technology',
        degree: 'Master of Science',
        field: 'Artificial Intelligence',
        startDate: '2003-09',
        endDate: '2005-06',
        isCompleted: true,
        gpa: '4.0',
        pageNumber: null,
      },
      {
        id: generateId(),
        institution: 'Carnegie Mellon University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '1999-09',
        endDate: '2003-05',
        isCompleted: true,
        gpa: '3.95',
        pageNumber: null,
      },
      {
        id: generateId(),
        institution: 'Stanford University — Online',
        degree: 'Graduate Certificate',
        field: 'Machine Learning & Data Mining',
        startDate: '2017-01',
        endDate: '2017-12',
        isCompleted: true,
        pageNumber: null,
      },
      {
        id: generateId(),
        institution: 'INSEAD',
        degree: 'Executive Education Program',
        field: 'Leading Digital Transformation',
        startDate: '2019-06',
        endDate: '2019-09',
        isCompleted: true,
        pageNumber: null,
      },
      {
        id: generateId(),
        institution: 'Wharton School — University of Pennsylvania',
        degree: 'Executive Certificate',
        field: 'FinTech & Blockchain Strategy',
        startDate: '2021-03',
        endDate: '2021-08',
        isCompleted: true,
        pageNumber: null,
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: 'AWS Solutions Architect Professional',
        issuer: 'Amazon Web Services',
        date: '2024-01',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Google Cloud Professional Cloud Architect',
        issuer: 'Google Cloud',
        date: '2023-06',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Microsoft Azure Solutions Architect Expert',
        issuer: 'Microsoft',
        date: '2023-03',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Certified Kubernetes Administrator (CKA)',
        issuer: 'CNCF',
        date: '2022-08',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Certified Information Systems Security Professional (CISSP)',
        issuer: 'ISC²',
        date: '2021-11',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'PMP — Project Management Professional',
        issuer: 'PMI',
        date: '2020-04',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'SAFe 5 Lean Portfolio Manager',
        issuer: 'Scaled Agile Inc.',
        date: '2019-09',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'TOGAF 9 Certified Enterprise Architect',
        issuer: 'The Open Group',
        date: '2018-05',
        pageNumber: null,
      },
    ],

    // Step 5: Projects (8 projects) & Languages (6 languages)
    projects: [
      {
        id: generateId(),
        name: 'Enterprise AI Orchestration Platform',
        description: 'Architected multi-model AI orchestration platform enabling enterprise customers to deploy, monitor, and scale LLM-powered workflows with built-in governance and compliance controls',
        technologies: ['Python', 'Kubernetes', 'Ray', 'FastAPI', 'PostgreSQL'],
        startDate: '2023-01',
        isOngoing: true,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Global Real-Time Payments Engine',
        description: 'Designed and led development of real-time cross-border payment processing engine supporting 40+ currencies with sub-second settlement times and PCI-DSS Level 1 compliance',
        technologies: ['Java', 'Apache Kafka', 'Cassandra', 'gRPC', 'Kubernetes'],
        startDate: '2019-06',
        endDate: '2021-12',
        isOngoing: false,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Open Source Service Mesh Framework',
        description: 'Created and maintain popular open-source service mesh framework with 12,000+ GitHub stars, adopted by Fortune 500 companies for microservices communication',
        technologies: ['Go', 'Envoy', 'gRPC', 'Prometheus'],
        url: 'github.com/example/mesh-framework',
        startDate: '2018-01',
        isOngoing: true,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Intelligent Infrastructure Auto-Scaler',
        description: 'Built ML-driven infrastructure auto-scaling system that predicts traffic patterns and pre-provisions resources, reducing cloud costs by 45% while maintaining SLA guarantees',
        technologies: ['Python', 'TensorFlow', 'Terraform', 'AWS', 'Kubernetes'],
        startDate: '2017-03',
        endDate: '2018-09',
        isOngoing: false,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Distributed Tracing & Observability Platform',
        description: 'Developed enterprise-grade distributed tracing platform integrating with 2,000+ microservices, providing end-to-end request visibility and automated anomaly detection',
        technologies: ['Go', 'OpenTelemetry', 'ClickHouse', 'Grafana', 'React'],
        startDate: '2016-01',
        endDate: '2017-06',
        isOngoing: false,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Zero-Trust Security Gateway',
        description: 'Architected zero-trust network security gateway handling 1M+ concurrent connections with real-time threat detection and automated incident response',
        technologies: ['Rust', 'eBPF', 'Redis', 'Elasticsearch'],
        startDate: '2014-06',
        endDate: '2016-03',
        isOngoing: false,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Mobile-First Banking Super App',
        description: 'Led architecture and development of mobile banking super-app integrating payments, investments, insurance, and lending with 8M+ active users across 12 countries',
        technologies: ['React Native', 'Node.js', 'GraphQL', 'PostgreSQL', 'Redis'],
        startDate: '2019-01',
        endDate: '2021-06',
        isOngoing: false,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Developer Productivity Platform',
        description: 'Created internal developer platform (IDP) with self-service infrastructure provisioning, CI/CD pipelines, and automated compliance checks, reducing new service onboarding from 2 weeks to 30 minutes',
        technologies: ['TypeScript', 'Backstage', 'Terraform', 'ArgoCD', 'Kubernetes'],
        startDate: '2020-01',
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
        name: 'French',
        level: 'advanced',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'German',
        level: 'advanced',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Mandarin Chinese',
        level: 'intermediate',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Japanese',
        level: 'basic',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Portuguese',
        level: 'intermediate',
        pageNumber: null,
      },
    ],

    // Step 6: Achievements (8 achievements)
    achievements: [
      {
        id: generateId(),
        title: 'Forbes CTO Next List',
        description: 'Named to Forbes inaugural "CTO Next" list recognizing the 50 most transformative technology leaders in enterprise',
        year: '2024',
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'CTO of the Year — FinTech Awards',
        description: 'Awarded CTO of the Year for leading digital transformation of $50B+ financial institution',
        year: '2021',
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Patent Portfolio — 7 Granted US Patents',
        description: 'Awarded 7 US patents spanning distributed systems, real-time data processing, and AI-driven infrastructure optimization',
        year: '2023',
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Published Author — O\'Reilly Media',
        description: 'Authored "Scaling Engineering Organizations" (2021) and "Cloud-Native Architecture Patterns" (2019), both industry bestsellers',
        year: '2021',
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Keynote Speaker — KubeCon & AWS re:Invent',
        description: 'Delivered keynote presentations on platform engineering and AI infrastructure at major industry conferences to 10,000+ attendees',
        year: '2023',
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Board Member — Open Source Foundation',
        description: 'Elected to the governing board of a major open source foundation, guiding strategy for projects used by millions of developers',
        year: '2022',
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Engineering Excellence Award — Global Systems Corp',
        description: 'Received company\'s highest engineering honor for designing payment system processing $1B+ in annual transactions',
        year: '2015',
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'MIT Technology Review Innovator Under 35',
        description: 'Recognized by MIT Technology Review as one of the top innovators under 35 for work in distributed computing',
        year: '2012',
        pageNumber: null,
      },
    ],

    // Step 7: Summary
    summary: 'Visionary Chief Technology Officer and Co-Founder with 20+ years of progressive experience building and scaling world-class engineering organizations from startup to enterprise. Proven track record leading 350+ engineer divisions, managing $80M+ technology budgets, and delivering platforms serving hundreds of millions of users across financial services, cloud infrastructure, and AI/ML domains. Deep expertise spanning cloud-native architecture (AWS, GCP, Azure), distributed systems, AI/ML infrastructure, and security engineering. Published author, 7x patent holder, and recognized industry thought leader. Harvard MBA with a passion for developing engineering talent, driving digital transformation, and turning technology into sustainable competitive advantage.',
    jobDescription: 'What truly differentiates me is the combination of co-founder entrepreneurial experience with Fortune 500 engineering leadership at scale. I have built companies from zero to $250M valuations while also managing 350+ engineer divisions at established enterprises — a dual perspective that very few technology leaders possess. My 7 granted patents and 2 published books demonstrate deep technical thought leadership, while my Harvard MBA and board-level presentation experience show I can communicate technology strategy to any audience. I thrive at the intersection of innovation and operational excellence.',

    // Metadata
    completedSteps: [1, 2, 3, 4, 5, 6, 7],
    currentStep: 1,
    totalCharacters: 0,
    lastSaved: new Date(),
  };
}

// ============================================================================
// XXXLARGE - Maximum content for extreme pagination and layout stress testing
// ============================================================================
function generateXXXLargeResume(): Partial<ResumeData> {
  return {
    // Step 1: Profile
    firstName: 'Dr. Constantine',
    lastName: 'Vasiliadis-Montgomery',
    country: 'Costa Rica',
    linkedin: 'linkedin.com/in/drvasiliadismontgomery',
    language: 'en',
    targetLevel: 'executive',
    profession: 'Global Chief Information & Technology Officer',
    tone: 'professional',
    phone: '+41 79 555 1234',
    email: 'constantine.vasiliadis-montgomery@globaltech-advisory.com',

    // Step 2: Skills (50 skills)
    skillsRaw: [
      'Executive Technology Leadership', 'Digital Transformation Strategy', 'Enterprise Architecture',
      'AI & Machine Learning Strategy', 'Cloud-Native Architecture', 'DevOps & Platform Engineering',
      'Cybersecurity & Risk Management', 'Data Governance & Analytics', 'Agile & SAFe at Scale',
      'Product Management', 'M&A Technology Due Diligence', 'Vendor & Contract Negotiation',
      'Python', 'Java', 'Go', 'TypeScript', 'Rust', 'Scala', 'C++', 'Kotlin',
      'React', 'Angular', 'Vue.js', 'Next.js', 'Svelte',
      'AWS', 'Google Cloud Platform', 'Microsoft Azure', 'Oracle Cloud', 'IBM Cloud',
      'Kubernetes', 'Docker', 'Terraform', 'Pulumi', 'Ansible',
      'Apache Kafka', 'Apache Spark', 'Apache Flink', 'Airflow',
      'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Cassandra', 'Neo4j',
      'TensorFlow', 'PyTorch', 'LangChain', 'MLflow',
      'GraphQL', 'gRPC',
    ],

    // Step 3: Experience (6 jobs)
    experience: [
      {
        id: generateId(),
        title: 'Global Chief Information & Technology Officer',
        company: 'Zenith Multinational Holdings',
        startDate: '2021-01',
        endDate: '',
        isCurrent: true,
        achievements: [
          'Consolidated technology operations across 45 countries under unified platform strategy, reducing redundant systems by 60%',
          'Led $200M digital transformation program delivering 340% ROI within 3 years',
          'Established global AI Center of Excellence with 80+ ML engineers shipping 25 production models per quarter',
          'Negotiated enterprise-wide cloud contracts saving $35M annually across AWS, Azure, and GCP',
          'Achieved ISO 27001, SOC 2 Type II, GDPR, and CCPA compliance across all business units within 18 months',
        ],
        responsibilities: [
          'Setting global technology vision and multi-year strategic roadmap for $12B revenue organization',
          'Managing $300M annual technology budget across infrastructure, engineering, and innovation divisions',
          'Leading 1,200+ member technology organization spanning engineering, data science, security, and IT operations',
          'Reporting to CEO and presenting quarterly technology updates to Board of Directors',
          'Driving strategic technology partnerships and evaluating acquisition targets for technology fit',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Senior Vice President of Engineering & Architecture',
        company: 'Pinnacle Financial Services Group',
        startDate: '2017-06',
        endDate: '2020-12',
        isCurrent: false,
        achievements: [
          'Orchestrated migration of 200+ legacy applications to cloud-native microservices architecture over 30 months',
          'Built and scaled engineering organization from 120 to 500+ engineers across 6 global offices',
          'Launched real-time fraud detection platform reducing financial losses by $180M annually',
          'Implemented platform engineering discipline reducing deployment frequency from monthly to 50+ deploys per day',
        ],
        responsibilities: [
          'Overseeing all software engineering, platform infrastructure, and enterprise architecture functions',
          'Managing $120M annual engineering and infrastructure budget',
          'Chairing Architecture Review Board for all enterprise technology decisions',
          'Driving adoption of SRE practices achieving 99.999% availability for core banking platform',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'VP of Engineering — Data & AI Platforms',
        company: 'Orion Analytics Corporation',
        startDate: '2014-03',
        endDate: '2017-05',
        isCurrent: false,
        achievements: [
          'Architected enterprise data lake processing 500TB+ daily from 200+ data sources with sub-minute latency',
          'Launched self-service ML platform used by 400+ data scientists to deploy 100+ production models',
          'Reduced data infrastructure costs by 55% through Spark optimization and intelligent tiered storage',
          'Won "Data Platform of the Year" award from industry publication for innovative real-time analytics architecture',
        ],
        responsibilities: [
          'Leading data engineering, ML infrastructure, and analytics platform teams of 90+ engineers',
          'Defining company-wide data strategy, governance standards, and data quality frameworks',
          'Building partnerships with hyperscaler cloud providers for co-development initiatives',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Director of Engineering — Core Platform',
        company: 'NovaTech Systems International',
        startDate: '2010-09',
        endDate: '2014-02',
        isCurrent: false,
        achievements: [
          'Designed and delivered event-driven platform processing 2M+ transactions per second with 99.99% reliability',
          'Led team that won company\'s annual "Innovation Challenge" with AI-powered capacity planning system',
          'Mentored 12 engineers to senior and staff-level promotions over 3 years',
        ],
        responsibilities: [
          'Managing 40-person platform engineering team across backend services, APIs, and developer tools',
          'Owning core transaction processing, messaging, and API gateway infrastructure',
          'Driving technical excellence through architecture reviews, coding standards, and automated quality gates',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Senior Software Engineer & Tech Lead',
        company: 'Quantum Research Labs',
        startDate: '2007-01',
        endDate: '2010-08',
        isCurrent: false,
        achievements: [
          'Architected distributed computing framework adopted by 3 Fortune 100 companies for scientific workloads',
          'Published 4 peer-reviewed papers on high-performance distributed systems at IEEE and ACM conferences',
          'Created open-source graph database query optimizer with 3,000+ GitHub stars',
        ],
        responsibilities: [
          'Leading technical design for high-performance computing and distributed systems projects',
          'Mentoring team of 8 engineers and conducting technical interviews',
          'Collaborating with research scientists on translating algorithms into production-grade software',
        ],
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Software Engineer',
        company: 'Athena Defense Technologies',
        startDate: '2004-06',
        endDate: '2006-12',
        isCurrent: false,
        achievements: [
          'Built real-time signal processing pipeline analyzing 50GB/s of sensor data for threat detection',
          'Received Top Secret security clearance and contributed to 3 classified defense programs',
          'Optimized embedded systems firmware reducing power consumption by 40% while maintaining throughput',
        ],
        responsibilities: [
          'Developing low-latency signal processing and data fusion software for defense applications',
          'Implementing secure communication protocols meeting FIPS 140-2 compliance requirements',
          'Writing comprehensive technical documentation for classified government deliverables',
        ],
        pageNumber: null,
      },
    ],

    // Step 4: Education (4 degrees)
    education: [
      {
        id: generateId(),
        institution: 'London Business School',
        degree: 'Executive MBA',
        field: 'Strategy & Digital Innovation',
        startDate: '2018-09',
        endDate: '2020-06',
        isCompleted: true,
        pageNumber: null,
      },
      {
        id: generateId(),
        institution: 'ETH Zurich',
        degree: 'Doctor of Science (PhD)',
        field: 'Distributed Computing Systems',
        startDate: '2001-09',
        endDate: '2004-05',
        isCompleted: true,
        gpa: 'Summa Cum Laude',
        pageNumber: null,
      },
      {
        id: generateId(),
        institution: 'Imperial College London',
        degree: 'Master of Engineering',
        field: 'Computer Science & Artificial Intelligence',
        startDate: '1999-09',
        endDate: '2001-06',
        isCompleted: true,
        gpa: 'First Class Honours',
        pageNumber: null,
      },
      {
        id: generateId(),
        institution: 'National Technical University of Athens',
        degree: 'Bachelor of Engineering',
        field: 'Electrical & Computer Engineering',
        startDate: '1994-09',
        endDate: '1999-06',
        isCompleted: true,
        gpa: '9.4/10',
        pageNumber: null,
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: 'AWS Solutions Architect Professional',
        issuer: 'Amazon Web Services',
        date: '2024-01',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Google Cloud Professional Cloud Architect',
        issuer: 'Google Cloud',
        date: '2023-06',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Microsoft Azure Solutions Architect Expert',
        issuer: 'Microsoft',
        date: '2023-03',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Certified Information Systems Security Professional (CISSP)',
        issuer: 'ISC²',
        date: '2022-08',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'TOGAF 10 Certified Enterprise Architect',
        issuer: 'The Open Group',
        date: '2021-11',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'SAFe 6 Lean Portfolio Manager',
        issuer: 'Scaled Agile Inc.',
        date: '2020-04',
        pageNumber: null,
      },
    ],

    // Step 5: Projects (10 projects) & Languages (5 languages)
    projects: [
      {
        id: generateId(),
        name: 'Enterprise GenAI Governance Platform',
        description: 'Designed enterprise-wide generative AI governance platform managing model lifecycle, prompt safety, cost attribution, and compliance across 25 business units deploying 50+ LLM-powered applications',
        technologies: ['Python', 'LangChain', 'Kubernetes', 'PostgreSQL', 'React'],
        startDate: '2024-01',
        isOngoing: true,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Global Multi-Cloud Orchestration Layer',
        description: 'Architected abstraction layer enabling seamless workload portability across AWS, Azure, and GCP with unified cost management, security policies, and observability, managing $200M+ annual cloud spend',
        technologies: ['Go', 'Terraform', 'Pulumi', 'Kubernetes', 'gRPC'],
        startDate: '2022-03',
        endDate: '2024-06',
        isOngoing: false,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Real-Time Fraud Detection & Prevention Engine',
        description: 'Built ML-powered fraud detection system analyzing 100K+ transactions per second across 40+ countries, reducing false positives by 70% while catching 99.8% of fraudulent activity',
        technologies: ['Python', 'Apache Flink', 'TensorFlow', 'Apache Kafka', 'Redis'],
        startDate: '2018-01',
        endDate: '2020-06',
        isOngoing: false,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Open Source Distributed Consensus Library',
        description: 'Created and maintain widely-adopted Raft consensus implementation with 15,000+ GitHub stars, used by major database vendors and distributed systems projects worldwide',
        technologies: ['Rust', 'Go', 'C++'],
        url: 'github.com/example/raft-consensus',
        startDate: '2015-01',
        isOngoing: true,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Autonomous Infrastructure Healing System',
        description: 'Developed self-healing infrastructure platform that automatically detects, diagnoses, and remediates production incidents, reducing MTTR from 45 minutes to under 3 minutes across 5,000+ services',
        technologies: ['Python', 'Kubernetes', 'Prometheus', 'OpenTelemetry', 'PagerDuty API'],
        startDate: '2019-06',
        endDate: '2021-12',
        isOngoing: false,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Enterprise Knowledge Graph Platform',
        description: 'Architected organization-wide knowledge graph connecting 500M+ entities across customer, product, and operational data domains, powering recommendation engines and intelligent search',
        technologies: ['Neo4j', 'Apache Spark', 'Python', 'GraphQL', 'Elasticsearch'],
        startDate: '2016-03',
        endDate: '2018-09',
        isOngoing: false,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Quantum-Resistant Cryptography Framework',
        description: 'Led research and development of post-quantum cryptographic libraries for securing financial transactions, preparing infrastructure for quantum computing threats with NIST-approved algorithms',
        technologies: ['Rust', 'C++', 'Python'],
        startDate: '2021-01',
        endDate: '2023-06',
        isOngoing: false,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Global Developer Productivity Suite',
        description: 'Created comprehensive internal developer platform with automated CI/CD, feature flags, A/B testing, infrastructure-as-code templates, and AI-powered code review, adopted by 1,200+ engineers globally',
        technologies: ['TypeScript', 'React', 'Backstage', 'ArgoCD', 'Terraform', 'Kubernetes'],
        startDate: '2020-06',
        endDate: '2022-12',
        isOngoing: false,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Edge Computing IoT Analytics Platform',
        description: 'Designed edge computing platform processing sensor data from 100,000+ IoT devices in real-time at the edge, with intelligent data aggregation and cloud sync for global analytics dashboards',
        technologies: ['Go', 'Rust', 'Apache Kafka', 'TimescaleDB', 'Grafana'],
        startDate: '2017-01',
        endDate: '2019-06',
        isOngoing: false,
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Regulatory Compliance Automation Engine',
        description: 'Built automated compliance verification system covering GDPR, CCPA, PCI-DSS, SOX, and HIPAA requirements, reducing manual audit preparation from 6 weeks to 3 days across 45 country operations',
        technologies: ['Python', 'Node.js', 'PostgreSQL', 'Apache Airflow', 'React'],
        startDate: '2022-06',
        endDate: '2024-03',
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
        name: 'Greek',
        level: 'native',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'German',
        level: 'advanced',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'French',
        level: 'intermediate',
        pageNumber: null,
      },
      {
        id: generateId(),
        name: 'Mandarin Chinese',
        level: 'basic',
        pageNumber: null,
      },
    ],

    // Step 6: Achievements (6 achievements)
    achievements: [
      {
        id: generateId(),
        title: 'World Economic Forum Technology Pioneer',
        description: 'Company selected as WEF Technology Pioneer for breakthrough AI governance platform enabling responsible enterprise AI adoption at scale',
        year: '2024',
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Forbes Global CTO 100 List',
        description: 'Named to Forbes annual list of the 100 most influential Chief Technology Officers globally for driving digital transformation',
        year: '2023',
        pageNumber: null,
      },
      {
        id: generateId(),
        title: '9 Granted US & European Patents',
        description: 'Awarded 9 patents spanning distributed consensus algorithms, real-time fraud detection, and quantum-resistant cryptographic protocols',
        year: '2023',
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Published Author — 2 Industry Bestsellers',
        description: 'Authored "Engineering at Global Scale" (Wiley, 2022) and "The AI-First Enterprise" (O\'Reilly, 2024), both reaching #1 in technology leadership categories',
        year: '2024',
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'Keynote Speaker — Davos, KubeCon, AWS re:Invent, Google Next',
        description: 'Delivered keynote presentations on enterprise AI strategy, platform engineering, and digital transformation to combined audiences of 50,000+ technology leaders',
        year: '2024',
        pageNumber: null,
      },
      {
        id: generateId(),
        title: 'ETH Zurich Distinguished Alumni Award',
        description: 'Recognized for exceptional contributions to distributed computing and for mentoring the next generation of technology leaders through university partnerships',
        year: '2020',
        pageNumber: null,
      },
    ],

    // Step 7: Summary
    summary: 'Global Chief Information & Technology Officer and board-level technology advisor with 20+ years of experience transforming enterprises through technology at massive scale. Proven track record leading 1,200+ member technology organizations across 45 countries, managing $300M+ annual budgets, and delivering platforms serving hundreds of millions of users in financial services, defense, and enterprise SaaS. Deep expertise spanning cloud-native architecture across all major hyperscalers, AI/ML infrastructure at scale, cybersecurity, and distributed systems. PhD in Distributed Computing from ETH Zurich combined with London Business School Executive MBA. Published author of 2 industry bestsellers, holder of 9 patents, and recognized thought leader at Davos, KubeCon, and AWS re:Invent. Passionate about building engineering cultures of excellence, driving responsible AI adoption, and turning technology into transformative business outcomes.',
    jobDescription: 'What fundamentally sets me apart is the convergence of world-class academic credentials, deep hands-on technical expertise, and proven executive leadership across 45 countries. A PhD in Distributed Computing from ETH Zurich gives me the scientific rigor to evaluate emerging technologies, while my London Business School MBA equips me to translate technology into board-level business strategy. I have led organizations of 1,200+ engineers and managed $300M+ budgets — but I remain deeply technical, with 9 patents and active open-source contributions. My experience spans defense-grade security systems, global financial platforms, and cutting-edge AI governance — a breadth that enables me to navigate complex regulatory environments while driving aggressive innovation agendas. Very few technology executives combine this depth of technical credibility with this scope of global operational leadership.',

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
    case 'xxlarge':
      return generateXXLargeResume();
    case 'xxxlarge':
      return generateXXXLargeResume();
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
  xxlarge: {
    label: 'XXLarge',
    description: '10 jobs, 30 skills, 8 projects',
  },
  xxxlarge: {
    label: 'XXXLarge',
    description: '6 jobs, 50 skills, 10 projects',
  },
};

