import { buildResumeData } from './_helpers';
import type { ProfessionPageData } from './index';

export const professions: ProfessionPageData[] = [
  // ─── 1. Agricultural Engineer ───────────────────────────────────────
  {
    slug: 'agricultural-engineer',
    title: 'Agricultural Engineer',
    templateStyle: 'regular',
    keywords: [
      'agricultural engineer resume example',
      'agricultural engineer resume template',
      'agricultural engineering resume format',
      'agricultural engineer cv sample',
    ],
    searchIntents: ['Example', 'Template', 'Format'],
    totalMonthlySearches: 720,
    topSkills: [
      'Irrigation System Design',
      'Precision Agriculture',
      'Soil & Water Conservation',
      'CAD/AutoCAD',
      'GIS & Remote Sensing',
      'Environmental Compliance',
      'Farm Machinery Design',
      'Hydraulic Engineering',
      'Data Analysis',
      'Project Management',
    ],
    atsKeywords: [
      'agricultural engineering',
      'irrigation design',
      'precision agriculture',
      'soil conservation',
      'water resources',
      'environmental impact assessment',
      'USDA regulations',
      'AutoCAD',
      'GIS',
      'drainage systems',
      'crop yield optimization',
      'sustainable agriculture',
      'biosystems engineering',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Marcus',
      lastName: 'Holloway',
      profession: 'Agricultural Engineer',
      summary:
        'Agricultural Engineer with 7+ years of experience designing irrigation systems and implementing precision agriculture technologies. Proven track record of improving crop yields while reducing water usage through data-driven engineering solutions.',
      skills: [
        'Irrigation System Design',
        'Precision Agriculture',
        'AutoCAD',
        'GIS & Remote Sensing',
        'Soil & Water Conservation',
        'MATLAB',
        'Environmental Compliance',
        'Project Management',
      ],
      experience: [
        {
          title: 'Senior Agricultural Engineer',
          company: 'AgriTech Solutions Inc.',
          startDate: '2021-03',
          isCurrent: true,
          achievements: [
            'Designed drip irrigation systems for 12,000+ acres, reducing water consumption by 35% while maintaining crop yield targets',
            'Led a $2.4M precision agriculture initiative integrating IoT sensors and drone-based monitoring across 8 farms',
            'Developed soil conservation plans that reduced topsoil erosion by 28% across managed properties',
            'Managed cross-functional team of 6 engineers and 4 technicians on concurrent field projects',
          ],
        },
        {
          title: 'Agricultural Engineer',
          company: 'Green Valley Farms Corp.',
          startDate: '2018-06',
          endDate: '2021-02',
          achievements: [
            'Engineered automated fertigation systems that improved nutrient delivery efficiency by 22%',
            'Conducted environmental impact assessments for 15+ projects ensuring USDA compliance',
            'Optimized drainage systems for 5,000-acre operation, preventing $800K in annual flood damage',
          ],
        },
        {
          title: 'Junior Agricultural Engineer',
          company: 'Midwest Agricultural Consultants',
          startDate: '2016-01',
          endDate: '2018-05',
          achievements: [
            'Assisted in the design and installation of center-pivot irrigation systems for 3 large-scale farms',
            'Performed GIS analysis to identify optimal crop rotation patterns, increasing yield by 15%',
            'Created AutoCAD drawings for farm infrastructure projects valued at $1.2M',
          ],
        },
      ],
      education: [
        {
          institution: 'Iowa State University',
          degree: 'Bachelor of Science',
          field: 'Agricultural Engineering',
          startDate: '2012-08',
          endDate: '2016-05',
        },
      ],
      certifications: [
        { name: 'Professional Engineer (PE)', issuer: 'NCEES', date: '2020-06' },
        { name: 'Certified Crop Adviser (CCA)', issuer: 'ASA', date: '2019-03' },
      ],
    }),
    faqs: [
      {
        question: 'What should I highlight on an agricultural engineer resume?',
        answer:
          'Focus on technical design skills (irrigation, drainage, machinery), software proficiency (AutoCAD, GIS, MATLAB), and measurable impacts such as yield improvements, water savings, or cost reductions. Include any PE licensure and relevant certifications.',
      },
      {
        question: 'Is a PE license important for agricultural engineering resumes?',
        answer:
          'Yes. A Professional Engineer license significantly strengthens your resume, especially for senior roles. It demonstrates competency and allows you to sign off on engineering designs and reports.',
      },
      {
        question: 'How do I quantify achievements as an agricultural engineer?',
        answer:
          'Use metrics like percentage increase in crop yield, reduction in water usage, acres managed, project budgets, and cost savings from improved systems. For example, "Reduced water consumption by 35% across 12,000 acres through drip irrigation design."',
      },
    ],
  },

  // ─── 2. AI Engineer ─────────────────────────────────────────────────
  {
    slug: 'ai-engineer',
    title: 'AI Engineer',
    templateStyle: 'regular',
    keywords: [
      'ai engineer resume example',
      'artificial intelligence engineer resume',
      'ai engineer resume template',
      'machine learning engineer resume',
      'ai engineer cv sample',
    ],
    searchIntents: ['Example', 'Template', 'Skills'],
    totalMonthlySearches: 4800,
    topSkills: [
      'Python',
      'TensorFlow / PyTorch',
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision',
      'MLOps',
      'LLM Fine-Tuning',
      'Data Pipelines',
      'Cloud ML Services (AWS SageMaker, GCP Vertex AI)',
      'Model Optimization',
    ],
    atsKeywords: [
      'artificial intelligence',
      'machine learning',
      'deep learning',
      'neural networks',
      'NLP',
      'computer vision',
      'TensorFlow',
      'PyTorch',
      'MLOps',
      'model deployment',
      'LLM',
      'transformer models',
      'Python',
      'data pipelines',
      'model optimization',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Priya',
      lastName: 'Sharma',
      profession: 'AI Engineer',
      summary:
        'AI Engineer with 5+ years building production ML systems and deploying large-scale models. Experienced in NLP, computer vision, and LLM fine-tuning with a focus on delivering measurable business impact through AI-driven products.',
      skills: [
        'Python',
        'TensorFlow',
        'PyTorch',
        'NLP',
        'Computer Vision',
        'AWS SageMaker',
        'Docker',
        'MLflow',
        'SQL',
      ],
      experience: [
        {
          title: 'Senior AI Engineer',
          company: 'Nexus AI Labs',
          startDate: '2022-01',
          isCurrent: true,
          achievements: [
            'Architected and deployed a real-time NLP pipeline processing 2M+ documents daily with 94% accuracy',
            'Fine-tuned LLM models that reduced customer support ticket resolution time by 45%',
            'Built end-to-end MLOps infrastructure on AWS SageMaker, cutting model deployment time from 2 weeks to 4 hours',
            'Led a team of 4 ML engineers in developing a computer vision system for defect detection achieving 97.3% precision',
          ],
        },
        {
          title: 'Machine Learning Engineer',
          company: 'DataStream Technologies',
          startDate: '2019-06',
          endDate: '2021-12',
          achievements: [
            'Developed recommendation engine serving 8M+ users, increasing user engagement by 32%',
            'Implemented transformer-based text classification models improving accuracy from 78% to 92%',
            'Reduced model inference latency by 60% through TensorRT optimization and model quantization',
          ],
        },
      ],
      education: [
        {
          institution: 'Stanford University',
          degree: 'Master of Science',
          field: 'Computer Science — AI Track',
          startDate: '2017-09',
          endDate: '2019-06',
        },
        {
          institution: 'University of Michigan',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2013-09',
          endDate: '2017-05',
        },
      ],
      certifications: [
        { name: 'AWS Certified Machine Learning – Specialty', issuer: 'Amazon Web Services', date: '2022-08' },
        { name: 'TensorFlow Developer Certificate', issuer: 'Google', date: '2021-03' },
      ],
    }),
    faqs: [
      {
        question: 'What skills should an AI engineer highlight on their resume?',
        answer:
          'Emphasize programming languages (Python, C++), ML frameworks (TensorFlow, PyTorch), model types you have worked with (transformers, CNNs, GANs), deployment skills (MLOps, Docker, Kubernetes), and cloud ML platforms. Quantify model performance improvements wherever possible.',
      },
      {
        question: 'How do I stand out as an AI engineer candidate?',
        answer:
          'Include links to published papers, open-source contributions, or Kaggle competition rankings. Highlight production deployments rather than just research projects, and quantify impact with metrics like accuracy, latency, and business KPIs.',
      },
      {
        question: 'Should I include research publications on my AI engineer resume?',
        answer:
          'Yes, especially for roles at research-focused organizations. List publications in a dedicated section with conference or journal names. For industry roles, focus on how your research translated into production systems.',
      },
    ],
  },

  // ─── 3. Android Developer ──────────────────────────────────────────
  {
    slug: 'android-developer',
    title: 'Android Developer',
    templateStyle: 'regular',
    keywords: [
      'android developer resume example',
      'android developer resume template',
      'android app developer resume',
      'android developer cv sample',
    ],
    searchIntents: ['Example', 'Template', 'Format'],
    totalMonthlySearches: 5400,
    topSkills: [
      'Kotlin',
      'Java',
      'Jetpack Compose',
      'Android SDK',
      'MVVM / Clean Architecture',
      'REST APIs & Retrofit',
      'Room / SQLite',
      'Firebase',
      'Git & CI/CD',
      'Unit & UI Testing',
    ],
    atsKeywords: [
      'Android',
      'Kotlin',
      'Java',
      'Jetpack Compose',
      'Android SDK',
      'MVVM',
      'REST API',
      'Retrofit',
      'Room',
      'Firebase',
      'Google Play Store',
      'Material Design',
      'Coroutines',
      'Dagger/Hilt',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Daniel',
      lastName: 'Park',
      profession: 'Android Developer',
      summary:
        'Android Developer with 6 years of experience building high-performance mobile applications in Kotlin and Java. Skilled in Jetpack Compose, clean architecture patterns, and delivering polished apps with millions of downloads on the Google Play Store.',
      skills: [
        'Kotlin',
        'Java',
        'Jetpack Compose',
        'Android SDK',
        'Retrofit',
        'Room',
        'Firebase',
        'MVVM',
        'CI/CD',
      ],
      experience: [
        {
          title: 'Senior Android Developer',
          company: 'Finova Mobile',
          startDate: '2021-04',
          isCurrent: true,
          achievements: [
            'Led migration of legacy XML-based UI to Jetpack Compose, reducing UI code by 40% and improving developer velocity',
            'Architected offline-first banking app serving 1.2M+ active users with 99.7% crash-free rate',
            'Implemented biometric authentication and end-to-end encryption for payment transactions',
            'Mentored 3 junior developers and established code review guidelines adopted across the mobile team',
          ],
        },
        {
          title: 'Android Developer',
          company: 'TravelBee Inc.',
          startDate: '2018-09',
          endDate: '2021-03',
          achievements: [
            'Developed real-time booking features that increased mobile conversion rate by 28%',
            'Integrated Google Maps SDK and Places API for location-based hotel recommendations',
            'Reduced app startup time by 50% through lazy initialization and dependency injection with Hilt',
          ],
        },
      ],
      education: [
        {
          institution: 'Georgia Institute of Technology',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2014-08',
          endDate: '2018-05',
        },
      ],
      certifications: [
        { name: 'Associate Android Developer', issuer: 'Google', date: '2019-11' },
      ],
    }),
    faqs: [
      {
        question: 'What should an Android developer put on their resume?',
        answer:
          'Highlight Kotlin and/or Java proficiency, familiarity with Jetpack libraries (Compose, Navigation, Room), architecture patterns (MVVM, MVI), and any apps you have published on the Play Store. Include metrics like downloads, crash-free rates, and performance improvements.',
      },
      {
        question: 'Should I list personal Android projects on my resume?',
        answer:
          'Absolutely. Personal projects demonstrate initiative and passion. Include a link to the Play Store listing or GitHub repository, and mention key technical decisions you made.',
      },
      {
        question: 'How important is Jetpack Compose for an Android developer resume in 2025?',
        answer:
          'Very important. Most companies are migrating to Compose. Demonstrating Compose experience alongside knowledge of the legacy View system shows versatility and modern skill sets that employers value.',
      },
    ],
  },

  // ─── 4. Angular Developer ──────────────────────────────────────────
  {
    slug: 'angular-developer',
    title: 'Angular Developer',
    templateStyle: 'regular',
    keywords: [
      'angular developer resume example',
      'angular developer resume template',
      'angular frontend developer resume',
      'angular developer cv',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 3600,
    topSkills: [
      'Angular (v14+)',
      'TypeScript',
      'RxJS',
      'NgRx / State Management',
      'HTML5 & CSS3 / SCSS',
      'RESTful APIs',
      'Jasmine / Karma / Jest',
      'Angular Material',
      'Responsive Design',
      'CI/CD Pipelines',
    ],
    atsKeywords: [
      'Angular',
      'TypeScript',
      'RxJS',
      'NgRx',
      'HTML5',
      'CSS3',
      'SCSS',
      'REST API',
      'Jasmine',
      'Karma',
      'Angular Material',
      'responsive design',
      'SPA',
      'lazy loading',
      'dependency injection',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Elena',
      lastName: 'Vasquez',
      profession: 'Angular Developer',
      summary:
        'Angular Developer with 5+ years of experience building complex enterprise SPAs using Angular and TypeScript. Proficient in reactive programming with RxJS, state management with NgRx, and delivering accessible, high-performance web applications.',
      skills: [
        'Angular',
        'TypeScript',
        'RxJS',
        'NgRx',
        'HTML5/CSS3',
        'SCSS',
        'Angular Material',
        'Jasmine/Karma',
        'Git',
      ],
      experience: [
        {
          title: 'Senior Angular Developer',
          company: 'Apex Financial Systems',
          startDate: '2021-06',
          isCurrent: true,
          achievements: [
            'Led development of a regulatory compliance dashboard used by 500+ financial advisors, reducing report generation time by 65%',
            'Implemented lazy loading and code splitting strategies that decreased initial bundle size by 48%',
            'Established NgRx-based state management patterns adopted across 4 frontend teams',
            'Achieved 92% unit test coverage using Jasmine and Karma, reducing production bugs by 30%',
          ],
        },
        {
          title: 'Angular Developer',
          company: 'CloudBridge Solutions',
          startDate: '2019-01',
          endDate: '2021-05',
          achievements: [
            'Built reusable component library with 40+ Angular Material components used across 3 enterprise products',
            'Integrated OAuth 2.0 / OIDC authentication flows serving 10,000+ concurrent users',
            'Reduced page load time by 55% through server-side rendering with Angular Universal',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Texas at Austin',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2015-08',
          endDate: '2019-05',
        },
      ],
      certifications: [],
    }),
    faqs: [
      {
        question: 'What skills should I include on an Angular developer resume?',
        answer:
          'Prioritize Angular framework expertise, TypeScript, RxJS for reactive programming, state management (NgRx), testing frameworks (Jasmine, Karma, or Jest), and responsive design. Also mention experience with REST APIs and CI/CD.',
      },
      {
        question: 'Should I specify the Angular version on my resume?',
        answer:
          'Yes. Stating the specific versions (e.g., Angular 14–17) shows recency. Employers want to know if you are familiar with modern Angular features like standalone components, signals, and deferred loading.',
      },
      {
        question: 'How do I differentiate myself from other Angular developers?',
        answer:
          'Highlight performance optimizations, accessibility compliance, complex state management implementations, and contributions to shared component libraries. Quantify business impact and mention any role in architecture decisions.',
      },
    ],
  },

  // ─── 5. API Developer ──────────────────────────────────────────────
  {
    slug: 'api-developer',
    title: 'API Developer',
    templateStyle: 'regular',
    keywords: [
      'api developer resume example',
      'api developer resume template',
      'rest api developer resume',
      'api developer cv sample',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 1800,
    topSkills: [
      'RESTful API Design',
      'GraphQL',
      'OpenAPI / Swagger',
      'Node.js / Python / Java',
      'OAuth 2.0 & JWT',
      'API Gateway (Kong, Apigee)',
      'Rate Limiting & Caching',
      'Microservices Architecture',
      'Postman / Insomnia',
      'SQL & NoSQL Databases',
    ],
    atsKeywords: [
      'REST API',
      'GraphQL',
      'OpenAPI',
      'Swagger',
      'microservices',
      'API gateway',
      'OAuth',
      'JWT',
      'rate limiting',
      'caching',
      'API documentation',
      'versioning',
      'Node.js',
      'Python',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'James',
      lastName: 'Mitchell',
      profession: 'API Developer',
      summary:
        'API Developer with 6 years of experience designing, building, and maintaining scalable RESTful and GraphQL APIs. Adept at API gateway management, security best practices, and creating developer-friendly documentation that accelerates integration.',
      skills: [
        'REST API Design',
        'GraphQL',
        'Node.js',
        'Python',
        'OpenAPI/Swagger',
        'OAuth 2.0',
        'PostgreSQL',
        'Redis',
        'Docker',
      ],
      experience: [
        {
          title: 'Senior API Developer',
          company: 'IntegraPlatform Inc.',
          startDate: '2021-02',
          isCurrent: true,
          achievements: [
            'Designed and launched a public API platform serving 3,000+ third-party developers with 99.95% uptime',
            'Implemented rate limiting and caching strategies that reduced API response times by 70%',
            'Led migration from monolithic REST endpoints to GraphQL, reducing over-fetching and cutting average payload size by 55%',
            'Created comprehensive OpenAPI documentation that decreased partner onboarding time from 2 weeks to 3 days',
          ],
        },
        {
          title: 'API Developer',
          company: 'PayFlow Systems',
          startDate: '2018-05',
          endDate: '2021-01',
          achievements: [
            'Built payment processing APIs handling $15M+ in monthly transaction volume with PCI DSS compliance',
            'Developed OAuth 2.0 authentication service supporting 50,000+ active API consumers',
            'Automated API testing pipeline with Postman/Newman, achieving 95% endpoint coverage',
          ],
        },
      ],
      education: [
        {
          institution: 'Carnegie Mellon University',
          degree: 'Bachelor of Science',
          field: 'Information Systems',
          startDate: '2014-08',
          endDate: '2018-05',
        },
      ],
      certifications: [
        { name: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services', date: '2021-09' },
      ],
    }),
    faqs: [
      {
        question: 'What should an API developer resume emphasize?',
        answer:
          'Emphasize API design patterns (REST, GraphQL), security (OAuth, JWT), performance optimization (caching, rate limiting), documentation (OpenAPI/Swagger), and experience with API gateways. Include metrics like uptime, request volume, and integration timelines.',
      },
      {
        question: 'Is GraphQL experience important for API developers?',
        answer:
          'Increasingly yes. Many companies adopt GraphQL alongside REST. Showing proficiency in both demonstrates flexibility. Highlight specific benefits you achieved, such as reduced payload sizes or simplified client queries.',
      },
      {
        question: 'How do I show API security expertise on my resume?',
        answer:
          'Mention specific protocols and standards (OAuth 2.0, JWT, API keys, mTLS), compliance frameworks (PCI DSS, SOC 2), and tools you used. Describe implementations like rate limiting, input validation, and threat modeling.',
      },
    ],
  },

  // ─── 6. Application Engineer ───────────────────────────────────────
  {
    slug: 'application-engineer',
    title: 'Application Engineer',
    templateStyle: 'regular',
    keywords: [
      'application engineer resume example',
      'application engineer resume template',
      'application engineer resume format',
      'application engineer cv',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 2400,
    topSkills: [
      'Software Development',
      'Systems Integration',
      'Technical Troubleshooting',
      'Customer-Facing Communication',
      'Python / Java / C++',
      'SQL Databases',
      'REST APIs',
      'Requirements Analysis',
      'Technical Documentation',
      'Agile Methodologies',
    ],
    atsKeywords: [
      'application engineering',
      'systems integration',
      'troubleshooting',
      'customer support',
      'software development',
      'requirements gathering',
      'technical documentation',
      'API integration',
      'SQL',
      'Python',
      'Java',
      'Agile',
      'cross-functional collaboration',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Sara',
      lastName: 'Chen',
      profession: 'Application Engineer',
      summary:
        'Application Engineer with 5 years of experience bridging the gap between engineering teams and customers. Skilled at translating complex technical requirements into robust software solutions and providing hands-on support for enterprise integrations.',
      skills: [
        'Python',
        'Java',
        'SQL',
        'REST APIs',
        'Systems Integration',
        'Technical Documentation',
        'Agile/Scrum',
        'JIRA',
      ],
      experience: [
        {
          title: 'Senior Application Engineer',
          company: 'Veridian Technologies',
          startDate: '2022-01',
          isCurrent: true,
          achievements: [
            'Supported 40+ enterprise clients through complex API integrations, achieving 98% customer satisfaction score',
            'Developed custom integration scripts that reduced client onboarding time by 60%',
            'Identified and resolved 200+ technical issues in pre-sales and post-deployment phases',
            'Created technical knowledge base with 80+ articles, reducing repeat support tickets by 35%',
          ],
        },
        {
          title: 'Application Engineer',
          company: 'Optimus Software Group',
          startDate: '2019-07',
          endDate: '2021-12',
          achievements: [
            'Designed proof-of-concept implementations for prospective clients, contributing to $3.2M in closed deals',
            'Collaborated with product teams to translate 50+ customer feature requests into engineering specs',
            'Automated regression testing suite covering 85% of application workflows',
          ],
        },
      ],
      education: [
        {
          institution: 'Purdue University',
          degree: 'Bachelor of Science',
          field: 'Computer Engineering',
          startDate: '2015-08',
          endDate: '2019-05',
        },
      ],
      certifications: [
        { name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', date: '2022-05' },
      ],
    }),
    faqs: [
      {
        question: 'What makes a strong application engineer resume?',
        answer:
          'Combine technical depth (programming, debugging, systems integration) with customer-facing skills (communication, requirements gathering). Highlight how you solved client problems and contributed to sales or retention metrics.',
      },
      {
        question: 'Should I include customer metrics on my application engineer resume?',
        answer:
          'Yes. Metrics like customer satisfaction scores, onboarding time reductions, support ticket resolution rates, and revenue influenced by your technical demos all demonstrate value.',
      },
      {
        question: 'Is coding important for application engineers?',
        answer:
          'It depends on the role, but most application engineer positions require at least intermediate coding skills for scripting, prototyping, and troubleshooting. List the languages and tools you are comfortable with.',
      },
    ],
  },

  // ─── 7. Application Support Analyst ────────────────────────────────
  {
    slug: 'application-support-analyst',
    title: 'Application Support Analyst',
    templateStyle: 'regular',
    keywords: [
      'application support analyst resume example',
      'application support analyst resume template',
      'application support resume',
      'it support analyst resume',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 2100,
    topSkills: [
      'Incident Management',
      'ITIL Framework',
      'SQL Querying',
      'Application Monitoring',
      'ServiceNow / JIRA',
      'Troubleshooting & Root Cause Analysis',
      'SLA Management',
      'Scripting (PowerShell/Bash)',
      'Communication & Stakeholder Management',
      'Log Analysis',
    ],
    atsKeywords: [
      'application support',
      'incident management',
      'ITIL',
      'SQL',
      'ServiceNow',
      'JIRA',
      'root cause analysis',
      'SLA',
      'monitoring',
      'troubleshooting',
      'production support',
      'log analysis',
      'ticketing systems',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Kevin',
      lastName: 'Torres',
      profession: 'Application Support Analyst',
      summary:
        'Application Support Analyst with 4+ years of experience providing L2/L3 production support for enterprise applications. Proficient in incident management, SQL-based troubleshooting, and ITIL processes with a strong focus on minimizing downtime and meeting SLAs.',
      skills: [
        'Incident Management',
        'SQL',
        'ServiceNow',
        'JIRA',
        'ITIL',
        'Splunk',
        'PowerShell',
        'Linux',
        'Application Monitoring',
      ],
      experience: [
        {
          title: 'Senior Application Support Analyst',
          company: 'HealthFirst Systems',
          startDate: '2022-03',
          isCurrent: true,
          achievements: [
            'Managed L2/L3 support for 12 mission-critical healthcare applications serving 8,000+ users',
            'Reduced mean time to resolution (MTTR) by 40% through implementation of automated alerting and runbooks',
            'Maintained 99.5% SLA compliance across all supported applications over 18 consecutive months',
            'Led post-incident reviews for 30+ P1 incidents, implementing preventive measures that reduced recurring issues by 50%',
          ],
        },
        {
          title: 'Application Support Analyst',
          company: 'Pinnacle Financial Services',
          startDate: '2020-01',
          endDate: '2022-02',
          achievements: [
            'Resolved 150+ production incidents per month using SQL diagnostics and log analysis in Splunk',
            'Created automated monitoring dashboards that provided early detection for 80% of system anomalies',
            'Documented 60+ troubleshooting procedures reducing knowledge transfer time for new team members by 45%',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Central Florida',
          degree: 'Bachelor of Science',
          field: 'Information Technology',
          startDate: '2016-08',
          endDate: '2020-05',
        },
      ],
      certifications: [
        { name: 'ITIL 4 Foundation', issuer: 'PeopleCert', date: '2021-04' },
        { name: 'CompTIA A+', issuer: 'CompTIA', date: '2020-08' },
      ],
    }),
    faqs: [
      {
        question: 'What should I put on an application support analyst resume?',
        answer:
          'Highlight incident management experience, ITIL knowledge, SQL troubleshooting skills, monitoring tools (Splunk, Dynatrace, Datadog), and SLA compliance metrics. Show how you reduced downtime and improved support processes.',
      },
      {
        question: 'Is ITIL certification important for application support roles?',
        answer:
          'Yes, ITIL certification is highly valued and often required. It demonstrates your understanding of IT service management best practices, incident management workflows, and change management procedures.',
      },
      {
        question: 'How do I transition from helpdesk to application support?',
        answer:
          'Build SQL skills, learn application monitoring tools, gain exposure to production environments, and obtain ITIL certification. On your resume, emphasize any troubleshooting beyond basic desktop support and any scripting or database experience.',
      },
    ],
  },

  // ─── 8. Automation Engineer ────────────────────────────────────────
  {
    slug: 'automation-engineer',
    title: 'Automation Engineer',
    templateStyle: 'regular',
    keywords: [
      'automation engineer resume example',
      'automation engineer resume template',
      'test automation engineer resume',
      'automation engineer cv',
    ],
    searchIntents: ['Example', 'Template', 'Skills'],
    totalMonthlySearches: 3200,
    topSkills: [
      'Selenium / Cypress / Playwright',
      'Python / Java',
      'CI/CD (Jenkins, GitHub Actions)',
      'Test Framework Design',
      'API Testing (Postman, REST Assured)',
      'Docker & Kubernetes',
      'Performance Testing (JMeter, Gatling)',
      'BDD (Cucumber)',
      'SQL',
      'Agile/Scrum',
    ],
    atsKeywords: [
      'test automation',
      'Selenium',
      'Cypress',
      'Playwright',
      'CI/CD',
      'Jenkins',
      'Python',
      'Java',
      'API testing',
      'performance testing',
      'BDD',
      'Cucumber',
      'test framework',
      'regression testing',
      'Docker',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Anika',
      lastName: 'Patel',
      profession: 'Automation Engineer',
      summary:
        'Automation Engineer with 6 years of experience designing and implementing test automation frameworks across web, mobile, and API layers. Skilled in CI/CD integration, BDD practices, and reducing manual testing effort while improving software quality.',
      skills: [
        'Selenium',
        'Cypress',
        'Python',
        'Java',
        'Jenkins',
        'REST Assured',
        'Docker',
        'Cucumber',
        'JMeter',
        'SQL',
      ],
      experience: [
        {
          title: 'Senior Automation Engineer',
          company: 'Quantum Commerce',
          startDate: '2021-05',
          isCurrent: true,
          achievements: [
            'Built a Cypress-based E2E test framework covering 600+ test scenarios, reducing manual regression effort by 75%',
            'Integrated automated test suites into CI/CD pipelines (GitHub Actions), enabling continuous testing on every PR',
            'Developed API contract testing layer with REST Assured, catching 90% of integration defects before staging',
            'Mentored 5 QA engineers in test automation best practices and framework usage',
          ],
        },
        {
          title: 'Automation Engineer',
          company: 'NetSecure Solutions',
          startDate: '2018-08',
          endDate: '2021-04',
          achievements: [
            'Designed Selenium/Java test framework from scratch supporting 3 web applications with 400+ test cases',
            'Implemented BDD approach with Cucumber that improved collaboration between QA and product teams',
            'Reduced test execution time by 60% through parallel test execution and Docker-based test environments',
          ],
        },
      ],
      education: [
        {
          institution: 'Arizona State University',
          degree: 'Bachelor of Science',
          field: 'Software Engineering',
          startDate: '2014-08',
          endDate: '2018-05',
        },
      ],
      certifications: [
        { name: 'ISTQB Advanced Test Automation Engineer', issuer: 'ISTQB', date: '2021-07' },
      ],
    }),
    faqs: [
      {
        question: 'What tools should I mention on an automation engineer resume?',
        answer:
          'List the specific tools and frameworks you use: Selenium, Cypress, Playwright for UI; REST Assured, Postman for API; JMeter or Gatling for performance; and Jenkins, GitHub Actions, or GitLab CI for CI/CD. Employers want to see tool-specific experience.',
      },
      {
        question: 'How do I quantify my impact as an automation engineer?',
        answer:
          'Use metrics like percentage of manual testing reduced, number of automated test cases, test execution time savings, defect detection rates, and CI/CD pipeline improvements. For example, "Reduced regression testing time from 3 days to 4 hours."',
      },
      {
        question: 'Should I include manual testing experience on an automation engineer resume?',
        answer:
          'Briefly, yes. It shows a well-rounded QA background. However, the focus should be on your automation work. Mention manual testing experience in the context of what you helped automate.',
      },
    ],
  },

  // ─── 9. Automation Technician ──────────────────────────────────────
  {
    slug: 'automation-technician',
    title: 'Automation Technician',
    templateStyle: 'regular',
    keywords: [
      'automation technician resume example',
      'automation technician resume template',
      'industrial automation technician resume',
      'automation technician cv',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 1500,
    topSkills: [
      'PLC Programming (Allen-Bradley, Siemens)',
      'HMI/SCADA Systems',
      'Electrical Troubleshooting',
      'Industrial Networking',
      'Pneumatics & Hydraulics',
      'Motor Drives (VFD)',
      'Instrumentation Calibration',
      'Blueprint & Schematic Reading',
      'Preventive Maintenance',
      'Safety Standards (OSHA, NEC)',
    ],
    atsKeywords: [
      'PLC programming',
      'Allen-Bradley',
      'Siemens',
      'HMI',
      'SCADA',
      'VFD',
      'electrical troubleshooting',
      'instrumentation',
      'calibration',
      'industrial automation',
      'preventive maintenance',
      'ladder logic',
      'pneumatics',
      'control systems',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Robert',
      lastName: 'Jensen',
      profession: 'Automation Technician',
      summary:
        'Automation Technician with 8 years of hands-on experience in PLC programming, HMI/SCADA configuration, and electrical troubleshooting in manufacturing environments. Known for minimizing downtime through proactive maintenance and efficient root cause analysis.',
      skills: [
        'PLC Programming',
        'Allen-Bradley',
        'Siemens S7',
        'HMI/SCADA',
        'Electrical Troubleshooting',
        'VFD Configuration',
        'Instrumentation',
        'Industrial Networking',
      ],
      experience: [
        {
          title: 'Senior Automation Technician',
          company: 'Precision Manufacturing Co.',
          startDate: '2020-06',
          isCurrent: true,
          achievements: [
            'Programmed and maintained 50+ Allen-Bradley PLCs across 3 production lines, achieving 98.5% uptime',
            'Designed and implemented HMI screens for SCADA system monitoring 200+ process variables in real time',
            'Reduced unplanned downtime by 32% through implementation of predictive maintenance programs',
            'Trained 10 maintenance technicians on PLC troubleshooting and safety protocols',
          ],
        },
        {
          title: 'Automation Technician',
          company: 'Sterling Packaging Solutions',
          startDate: '2016-04',
          endDate: '2020-05',
          achievements: [
            'Installed and commissioned automated packaging lines handling 1,200 units per hour',
            'Troubleshot and repaired VFD drives, servo motors, and pneumatic systems, reducing mean repair time by 25%',
            'Calibrated 100+ instruments (pressure, temperature, flow) to maintain quality compliance',
          ],
        },
      ],
      education: [
        {
          institution: 'Milwaukee Area Technical College',
          degree: 'Associate of Applied Science',
          field: 'Industrial Automation Technology',
          startDate: '2013-08',
          endDate: '2015-12',
        },
      ],
      certifications: [
        { name: 'Certified Control Systems Technician (CCST)', issuer: 'ISA', date: '2019-09' },
        { name: 'OSHA 30-Hour General Industry', issuer: 'OSHA', date: '2018-03' },
      ],
    }),
    faqs: [
      {
        question: 'What should an automation technician highlight on their resume?',
        answer:
          'Emphasize PLC brands you work with (Allen-Bradley, Siemens), HMI/SCADA experience, types of equipment serviced, uptime improvements, and safety certifications. Include specific metrics like downtime reduction and units per hour.',
      },
      {
        question: 'Do I need a degree for an automation technician role?',
        answer:
          'Many positions accept an associate degree or technical diploma in industrial automation, electrical technology, or a related field. Hands-on experience and certifications (CCST, journeyman electrician) often carry equal weight.',
      },
      {
        question: 'How do I describe PLC programming experience on my resume?',
        answer:
          'Specify the PLC platforms (Allen-Bradley ControlLogix, Siemens S7-1500), programming languages (ladder logic, structured text, function block), and the scale of systems you worked on (number of I/O points, production lines).',
      },
    ],
  },

  // ─── 10. AWS Engineer ──────────────────────────────────────────────
  {
    slug: 'aws-engineer',
    title: 'AWS Engineer',
    templateStyle: 'regular',
    keywords: [
      'aws engineer resume example',
      'aws engineer resume template',
      'aws cloud engineer resume',
      'aws solutions architect resume',
    ],
    searchIntents: ['Example', 'Template', 'Skills'],
    totalMonthlySearches: 4200,
    topSkills: [
      'AWS (EC2, S3, Lambda, RDS, ECS)',
      'Infrastructure as Code (Terraform, CloudFormation)',
      'CI/CD (CodePipeline, GitHub Actions)',
      'Docker & Kubernetes (EKS)',
      'Networking (VPC, Route 53, CloudFront)',
      'Security (IAM, KMS, GuardDuty)',
      'Monitoring (CloudWatch, Datadog)',
      'Python / Bash Scripting',
      'Cost Optimization',
      'Serverless Architecture',
    ],
    atsKeywords: [
      'AWS',
      'EC2',
      'S3',
      'Lambda',
      'RDS',
      'ECS',
      'EKS',
      'Terraform',
      'CloudFormation',
      'VPC',
      'IAM',
      'CloudWatch',
      'serverless',
      'infrastructure as code',
      'CI/CD',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Michael',
      lastName: 'Nguyen',
      profession: 'AWS Engineer',
      summary:
        'AWS Engineer with 6+ years of experience architecting and managing cloud infrastructure on AWS. Expert in infrastructure as code, serverless design, and cost optimization with multiple AWS certifications and a track record of building highly available systems.',
      skills: [
        'AWS (EC2, S3, Lambda, RDS)',
        'Terraform',
        'CloudFormation',
        'Docker',
        'Kubernetes (EKS)',
        'Python',
        'Bash',
        'CI/CD',
        'CloudWatch',
      ],
      experience: [
        {
          title: 'Senior AWS Engineer',
          company: 'Stratos Cloud Services',
          startDate: '2021-08',
          isCurrent: true,
          achievements: [
            'Architected multi-region AWS infrastructure serving 5M+ daily active users with 99.99% availability',
            'Reduced monthly AWS spend by $180K (28%) through Reserved Instances, Savings Plans, and right-sizing',
            'Implemented Terraform-based IaC managing 400+ AWS resources across 12 accounts with automated drift detection',
            'Designed serverless event-driven architecture using Lambda and EventBridge processing 10M+ events daily',
          ],
        },
        {
          title: 'AWS Cloud Engineer',
          company: 'DataVault Analytics',
          startDate: '2018-05',
          endDate: '2021-07',
          achievements: [
            'Migrated 30+ on-premises applications to AWS, reducing infrastructure costs by 42%',
            'Built CI/CD pipelines with CodePipeline and CodeBuild deploying 50+ microservices to ECS Fargate',
            'Implemented security controls using IAM policies, KMS encryption, and GuardDuty, passing SOC 2 audit',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Washington',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2014-09',
          endDate: '2018-06',
        },
      ],
      certifications: [
        { name: 'AWS Certified Solutions Architect – Professional', issuer: 'Amazon Web Services', date: '2023-01' },
        { name: 'AWS Certified DevOps Engineer – Professional', issuer: 'Amazon Web Services', date: '2022-04' },
      ],
    }),
    faqs: [
      {
        question: 'Which AWS certifications should I list on my resume?',
        answer:
          'Start with Solutions Architect – Associate, then progress to Professional or specialty certs (Security, DevOps, Machine Learning). List the most relevant and recent certifications first. Multiple certifications demonstrate breadth of AWS knowledge.',
      },
      {
        question: 'How do I show AWS cost optimization skills?',
        answer:
          'Include specific dollar amounts or percentages saved through strategies like Reserved Instances, Savings Plans, right-sizing, spot instances, and architectural improvements. For example, "Reduced monthly AWS spend by $180K through Reserved Instances and right-sizing."',
      },
      {
        question: 'Should I list specific AWS services on my resume?',
        answer:
          'Yes. List the services most relevant to the job: compute (EC2, Lambda, ECS), storage (S3, EBS), databases (RDS, DynamoDB), networking (VPC, CloudFront), and monitoring (CloudWatch). Be specific rather than just saying "AWS."',
      },
    ],
  },

  // ─── 11. Backend Developer ─────────────────────────────────────────
  {
    slug: 'backend-developer',
    title: 'Backend Developer',
    templateStyle: 'regular',
    keywords: [
      'backend developer resume example',
      'backend developer resume template',
      'back end developer resume',
      'backend engineer resume',
    ],
    searchIntents: ['Example', 'Template', 'Skills'],
    totalMonthlySearches: 6200,
    topSkills: [
      'Node.js / Python / Java / Go',
      'REST & GraphQL APIs',
      'SQL & NoSQL Databases',
      'Microservices Architecture',
      'Docker & Kubernetes',
      'Message Queues (RabbitMQ, Kafka)',
      'Caching (Redis, Memcached)',
      'Authentication & Authorization',
      'CI/CD',
      'System Design',
    ],
    atsKeywords: [
      'backend development',
      'Node.js',
      'Python',
      'Java',
      'REST API',
      'GraphQL',
      'microservices',
      'SQL',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Docker',
      'Kubernetes',
      'Kafka',
      'CI/CD',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Alex',
      lastName: 'Rivera',
      profession: 'Backend Developer',
      summary:
        'Backend Developer with 7 years of experience building scalable APIs and distributed systems using Node.js and Python. Strong expertise in microservices, database design, and performance optimization for high-traffic applications.',
      skills: [
        'Node.js',
        'Python',
        'TypeScript',
        'PostgreSQL',
        'MongoDB',
        'Redis',
        'Docker',
        'Kubernetes',
        'Kafka',
        'GraphQL',
      ],
      experience: [
        {
          title: 'Senior Backend Developer',
          company: 'ScaleUp Commerce',
          startDate: '2021-01',
          isCurrent: true,
          achievements: [
            'Designed microservices architecture handling 50K+ requests per second with sub-100ms P99 latency',
            'Built event-driven order processing system using Kafka, improving throughput by 300%',
            'Optimized PostgreSQL queries and indexing strategy, reducing average query time from 800ms to 45ms',
            'Led migration from monolith to 15 microservices, enabling independent team deployments and reducing release cycle from 2 weeks to daily',
          ],
        },
        {
          title: 'Backend Developer',
          company: 'BrightPath Health',
          startDate: '2017-06',
          endDate: '2020-12',
          achievements: [
            'Developed HIPAA-compliant REST APIs serving 200K+ patient records with role-based access control',
            'Implemented Redis caching layer that reduced database load by 65% and improved API response time by 3x',
            'Built automated data pipeline processing 2M+ health records daily with 99.9% accuracy',
          ],
        },
      ],
      education: [
        {
          institution: 'University of California, Berkeley',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2013-08',
          endDate: '2017-05',
        },
      ],
      certifications: [
        { name: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services', date: '2021-11' },
      ],
    }),
    faqs: [
      {
        question: 'What should a backend developer highlight on their resume?',
        answer:
          'Focus on programming languages, frameworks, database expertise (both SQL and NoSQL), API design, system architecture, and performance metrics. Include specific throughput numbers, latency improvements, and scale of systems you built.',
      },
      {
        question: 'Should I include system design experience on my backend developer resume?',
        answer:
          'Absolutely. Describe architecture decisions you made, such as choosing microservices vs monolith, selecting databases, designing caching layers, and implementing message queues. This shows you think beyond just writing code.',
      },
      {
        question: 'How many programming languages should I list?',
        answer:
          'List 2-3 primary languages where you have strong production experience, plus additional languages you are familiar with. Quality of experience matters more than quantity. Match your top languages to the job description.',
      },
    ],
  },

  // ─── 12. BI Developer ─────────────────────────────────────────────
  {
    slug: 'bi-developer',
    title: 'BI Developer',
    templateStyle: 'regular',
    keywords: [
      'bi developer resume example',
      'business intelligence developer resume',
      'bi developer resume template',
      'bi analyst resume',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 2800,
    topSkills: [
      'Power BI / Tableau',
      'SQL & T-SQL',
      'Data Warehousing (Star/Snowflake Schema)',
      'ETL (SSIS, Informatica)',
      'DAX & M Language',
      'Python / R',
      'SSRS / SSAS',
      'Data Modeling',
      'Azure Data Services',
      'Stakeholder Communication',
    ],
    atsKeywords: [
      'business intelligence',
      'Power BI',
      'Tableau',
      'SQL',
      'data warehouse',
      'ETL',
      'SSIS',
      'DAX',
      'data modeling',
      'SSRS',
      'SSAS',
      'star schema',
      'KPI dashboards',
      'data visualization',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Rachel',
      lastName: 'Kim',
      profession: 'BI Developer',
      summary:
        'BI Developer with 5+ years of experience building data warehouses, ETL pipelines, and interactive dashboards. Expert in Power BI, SQL, and data modeling with a focus on translating complex data into actionable business insights.',
      skills: [
        'Power BI',
        'SQL/T-SQL',
        'SSIS',
        'DAX',
        'Data Warehousing',
        'Python',
        'Azure Data Factory',
        'SSRS',
        'Data Modeling',
      ],
      experience: [
        {
          title: 'Senior BI Developer',
          company: 'Atlas Retail Group',
          startDate: '2021-09',
          isCurrent: true,
          achievements: [
            'Designed and deployed 25+ Power BI dashboards used by C-suite executives to track $500M+ in annual revenue',
            'Built enterprise data warehouse with star schema design consolidating data from 8 source systems',
            'Developed ETL pipelines in SSIS processing 10M+ rows nightly with 99.8% data accuracy',
            'Reduced monthly reporting cycle from 5 days to real-time through automated Power BI data refresh',
          ],
        },
        {
          title: 'BI Developer',
          company: 'Meridian Insurance',
          startDate: '2019-03',
          endDate: '2021-08',
          achievements: [
            'Created claims analytics dashboard that identified $2.3M in fraud savings opportunities annually',
            'Optimized complex SQL queries reducing report generation time from 45 minutes to 3 minutes',
            'Implemented row-level security in Power BI for 200+ users across 15 departments',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Minnesota',
          degree: 'Bachelor of Science',
          field: 'Management Information Systems',
          startDate: '2015-09',
          endDate: '2019-05',
        },
      ],
      certifications: [
        { name: 'Microsoft Certified: Power BI Data Analyst Associate', issuer: 'Microsoft', date: '2022-02' },
        { name: 'Microsoft Certified: Azure Data Engineer Associate', issuer: 'Microsoft', date: '2023-05' },
      ],
    }),
    faqs: [
      {
        question: 'What tools should I feature on a BI developer resume?',
        answer:
          'Highlight your primary BI platform (Power BI, Tableau, Looker), SQL proficiency, ETL tools (SSIS, Informatica, Azure Data Factory), and any data warehouse experience. Also mention DAX, data modeling, and any cloud data services.',
      },
      {
        question: 'How do I demonstrate business impact as a BI developer?',
        answer:
          'Tie your dashboards and reports to business outcomes: revenue tracked, cost savings identified, decision-making speed improvements, and number of stakeholders served. Use concrete numbers and dollar amounts.',
      },
      {
        question: 'Should I include data visualization examples on my BI developer resume?',
        answer:
          'You cannot embed visuals in a resume, but you can link to an online portfolio or GitHub repository with sample dashboards. Describe the dashboards you built and their impact in your experience section.',
      },
    ],
  },

  // ─── 13. Blockchain Developer ──────────────────────────────────────
  {
    slug: 'blockchain-developer',
    title: 'Blockchain Developer',
    templateStyle: 'regular',
    keywords: [
      'blockchain developer resume example',
      'blockchain developer resume template',
      'smart contract developer resume',
      'web3 developer resume',
    ],
    searchIntents: ['Example', 'Template', 'Skills'],
    totalMonthlySearches: 3100,
    topSkills: [
      'Solidity',
      'Ethereum / EVM',
      'Smart Contract Development',
      'Web3.js / Ethers.js',
      'Hardhat / Foundry',
      'DeFi Protocols',
      'Rust (Solana)',
      'IPFS & Decentralized Storage',
      'Security Auditing',
      'TypeScript / JavaScript',
    ],
    atsKeywords: [
      'blockchain',
      'Solidity',
      'Ethereum',
      'smart contracts',
      'Web3',
      'DeFi',
      'NFT',
      'Hardhat',
      'Foundry',
      'EVM',
      'Rust',
      'Solana',
      'IPFS',
      'token standards',
      'security audit',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Dmitri',
      lastName: 'Volkov',
      profession: 'Blockchain Developer',
      summary:
        'Blockchain Developer with 4+ years of experience building decentralized applications and smart contracts on Ethereum and Solana. Skilled in Solidity, DeFi protocol development, and smart contract security with a portfolio of audited production deployments.',
      skills: [
        'Solidity',
        'Rust',
        'Ethereum',
        'Web3.js',
        'Ethers.js',
        'Hardhat',
        'Foundry',
        'TypeScript',
        'IPFS',
      ],
      experience: [
        {
          title: 'Senior Blockchain Developer',
          company: 'ChainForge Labs',
          startDate: '2022-02',
          isCurrent: true,
          achievements: [
            'Developed and deployed DeFi lending protocol with $45M+ Total Value Locked (TVL) across 3 chains',
            'Implemented gas-optimized smart contracts reducing transaction costs by 38% compared to initial design',
            'Led security review process integrating Slither and Mythril, catching 12 critical vulnerabilities before mainnet deployment',
            'Built cross-chain bridge enabling $10M+ in daily token transfers between Ethereum and Polygon',
          ],
        },
        {
          title: 'Blockchain Developer',
          company: 'NovaMint Digital',
          startDate: '2020-06',
          endDate: '2022-01',
          achievements: [
            'Created ERC-721 and ERC-1155 NFT marketplace smart contracts handling 50K+ minted tokens',
            'Developed Solana programs in Rust for a decentralized exchange processing 5K+ daily swaps',
            'Built dApp frontend with React and Ethers.js achieving 15K+ monthly active wallets connected',
          ],
        },
      ],
      education: [
        {
          institution: 'Massachusetts Institute of Technology',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2016-09',
          endDate: '2020-06',
        },
      ],
      certifications: [
        { name: 'Certified Blockchain Developer', issuer: 'Blockchain Council', date: '2021-05' },
      ],
    }),
    faqs: [
      {
        question: 'What should a blockchain developer include on their resume?',
        answer:
          'List smart contract languages (Solidity, Rust), blockchain platforms (Ethereum, Solana, Polygon), development tools (Hardhat, Foundry), and Web3 libraries. Include links to deployed contracts, audit reports, and TVL or transaction volume metrics.',
      },
      {
        question: 'How important is security experience for blockchain developer resumes?',
        answer:
          'Extremely important. Smart contract vulnerabilities can lead to millions in losses. Highlight security tools you use (Slither, Mythril, Echidna), any formal audits you led or participated in, and security best practices you follow.',
      },
      {
        question: 'Should I include links to deployed smart contracts?',
        answer:
          'Yes. Linking to verified contracts on Etherscan or block explorers is the blockchain equivalent of a portfolio. It provides verifiable proof of your work that hiring managers can inspect directly.',
      },
    ],
  },

  // ─── 14. Civil Engineer ────────────────────────────────────────────
  {
    slug: 'civil-engineer',
    title: 'Civil Engineer',
    templateStyle: 'regular',
    keywords: [
      'civil engineer resume example',
      'civil engineer resume template',
      'civil engineering resume format',
      'civil engineer cv sample',
    ],
    searchIntents: ['Example', 'Template', 'Format'],
    totalMonthlySearches: 8100,
    topSkills: [
      'Structural Analysis & Design',
      'AutoCAD / Civil 3D',
      'Project Management',
      'Geotechnical Engineering',
      'Hydrology & Drainage Design',
      'Construction Management',
      'Building Codes & Regulations',
      'Cost Estimation',
      'Environmental Compliance',
      'Revit / BIM',
    ],
    atsKeywords: [
      'civil engineering',
      'structural design',
      'AutoCAD',
      'Civil 3D',
      'project management',
      'geotechnical',
      'hydrology',
      'construction',
      'building codes',
      'cost estimation',
      'BIM',
      'Revit',
      'site development',
      'PE license',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'David',
      lastName: 'Morales',
      profession: 'Civil Engineer',
      summary:
        'Licensed Civil Engineer (PE) with 8+ years of experience in structural design, site development, and construction management. Proven ability to deliver complex infrastructure projects on time and within budget using AutoCAD, Civil 3D, and BIM technologies.',
      skills: [
        'Structural Design',
        'AutoCAD',
        'Civil 3D',
        'Revit/BIM',
        'Project Management',
        'Geotechnical Analysis',
        'Cost Estimation',
        'Construction Management',
      ],
      experience: [
        {
          title: 'Senior Civil Engineer',
          company: 'Titan Infrastructure Group',
          startDate: '2020-03',
          isCurrent: true,
          achievements: [
            'Managed design and construction oversight of $35M highway interchange project completed 2 months ahead of schedule',
            'Led structural analysis for 12 commercial buildings totaling 500,000+ sq ft using STAAD.Pro and ETABS',
            'Reduced project costs by 18% through value engineering and alternative material specifications',
            'Supervised team of 8 engineers and coordinated with contractors, permitting agencies, and clients',
          ],
        },
        {
          title: 'Civil Engineer',
          company: 'Crestview Engineering Associates',
          startDate: '2016-06',
          endDate: '2020-02',
          achievements: [
            'Designed stormwater management systems for 20+ residential and commercial developments',
            'Prepared construction drawings and specifications for projects valued at $50M+',
            'Conducted site inspections ensuring compliance with local building codes and environmental regulations',
          ],
        },
      ],
      education: [
        {
          institution: 'Virginia Tech',
          degree: 'Bachelor of Science',
          field: 'Civil Engineering',
          startDate: '2012-08',
          endDate: '2016-05',
        },
      ],
      certifications: [
        { name: 'Professional Engineer (PE) — Civil', issuer: 'NCEES', date: '2020-10' },
        { name: 'LEED Green Associate', issuer: 'USGBC', date: '2019-04' },
      ],
    }),
    faqs: [
      {
        question: 'Should I include my PE license prominently on my civil engineer resume?',
        answer:
          'Absolutely. A PE license is one of the most important credentials in civil engineering. Place it near your name or in a prominent credentials section. It is often a hard requirement for senior roles.',
      },
      {
        question: 'What software should I list on my civil engineering resume?',
        answer:
          'Include AutoCAD, Civil 3D, Revit (BIM), structural analysis software (STAAD.Pro, ETABS, SAP2000), GIS tools, and project management software. Match the tools to the job description.',
      },
      {
        question: 'How do I quantify civil engineering achievements?',
        answer:
          'Use project budgets, square footage, timeline achievements (ahead of schedule), cost savings from value engineering, number of projects managed, and team size. For example, "Delivered $35M highway project 2 months ahead of schedule."',
      },
    ],
  },

  // ─── 15. Cloud Engineer ────────────────────────────────────────────
  {
    slug: 'cloud-engineer',
    title: 'Cloud Engineer',
    templateStyle: 'regular',
    keywords: [
      'cloud engineer resume example',
      'cloud engineer resume template',
      'cloud infrastructure engineer resume',
      'cloud engineer cv',
    ],
    searchIntents: ['Example', 'Template', 'Skills'],
    totalMonthlySearches: 5600,
    topSkills: [
      'AWS / Azure / GCP',
      'Terraform / Pulumi',
      'Docker & Kubernetes',
      'CI/CD Pipelines',
      'Linux Administration',
      'Networking (DNS, VPN, Load Balancers)',
      'Security & Compliance',
      'Monitoring & Observability',
      'Python / Bash Scripting',
      'Cost Management',
    ],
    atsKeywords: [
      'cloud engineering',
      'AWS',
      'Azure',
      'GCP',
      'Terraform',
      'Kubernetes',
      'Docker',
      'CI/CD',
      'Linux',
      'infrastructure as code',
      'cloud security',
      'networking',
      'monitoring',
      'cost optimization',
      'high availability',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Jordan',
      lastName: 'Lee',
      profession: 'Cloud Engineer',
      summary:
        'Cloud Engineer with 6 years of experience designing and managing multi-cloud infrastructure across AWS and Azure. Skilled in IaC, container orchestration, and building resilient, cost-efficient architectures for high-traffic production workloads.',
      skills: [
        'AWS',
        'Azure',
        'Terraform',
        'Kubernetes',
        'Docker',
        'Python',
        'Bash',
        'Jenkins',
        'Prometheus/Grafana',
        'Linux',
      ],
      experience: [
        {
          title: 'Senior Cloud Engineer',
          company: 'Nimbus Technologies',
          startDate: '2021-04',
          isCurrent: true,
          achievements: [
            'Architected hybrid cloud infrastructure (AWS + Azure) supporting 3M+ users with 99.99% availability SLA',
            'Implemented Kubernetes clusters with auto-scaling policies reducing compute costs by 35%',
            'Developed Terraform modules managing 600+ cloud resources with automated compliance checking',
            'Led cloud security hardening initiative achieving SOC 2 Type II and ISO 27001 compliance',
          ],
        },
        {
          title: 'Cloud Engineer',
          company: 'Orion SaaS Platform',
          startDate: '2018-08',
          endDate: '2021-03',
          achievements: [
            'Migrated monolithic application to container-based microservices on EKS, improving deployment frequency 10x',
            'Built observability stack with Prometheus, Grafana, and PagerDuty reducing MTTR from 45 min to 8 min',
            'Automated infrastructure provisioning reducing environment setup time from 3 days to 20 minutes',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Illinois Urbana-Champaign',
          degree: 'Bachelor of Science',
          field: 'Computer Engineering',
          startDate: '2014-08',
          endDate: '2018-05',
        },
      ],
      certifications: [
        { name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', date: '2021-06' },
        { name: 'Certified Kubernetes Administrator (CKA)', issuer: 'CNCF', date: '2022-09' },
      ],
    }),
    faqs: [
      {
        question: 'What cloud certifications should I list on my resume?',
        answer:
          'List certifications relevant to the cloud platforms in the job description. AWS certifications (Solutions Architect, DevOps Engineer), Azure certifications (Administrator, Solutions Architect), GCP certifications, and CKA/CKAD for Kubernetes are all highly valued.',
      },
      {
        question: 'How do I show multi-cloud experience?',
        answer:
          'Clearly specify which cloud platform you used for each project. Describe cross-cloud architectures, migrations, and your reasoning for platform selection. Mentioning specific services from each cloud (e.g., AWS Lambda vs Azure Functions) adds credibility.',
      },
      {
        question: 'Is infrastructure as code experience essential for cloud engineers?',
        answer:
          'Yes. IaC (Terraform, CloudFormation, Pulumi) is a core competency. Describe the scale of resources managed, how you structured modules for reusability, and any compliance or drift detection you implemented.',
      },
    ],
  },

  // ─── 16. Controls Engineer ─────────────────────────────────────────
  {
    slug: 'controls-engineer',
    title: 'Controls Engineer',
    templateStyle: 'regular',
    keywords: [
      'controls engineer resume example',
      'controls engineer resume template',
      'control systems engineer resume',
      'controls engineer cv',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 2200,
    topSkills: [
      'PLC Programming (Rockwell, Siemens, Mitsubishi)',
      'SCADA & DCS Systems',
      'Control System Design',
      'HMI Development',
      'Industrial Networking (EtherNet/IP, Profinet)',
      'Process Instrumentation',
      'P&ID Reading',
      'Motion Control & Servo Systems',
      'Electrical Design (AutoCAD Electrical)',
      'Safety Systems (SIL/SIS)',
    ],
    atsKeywords: [
      'controls engineering',
      'PLC',
      'SCADA',
      'DCS',
      'HMI',
      'Rockwell',
      'Allen-Bradley',
      'Siemens',
      'control systems',
      'industrial networking',
      'process control',
      'ladder logic',
      'P&ID',
      'motion control',
      'safety systems',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Thomas',
      lastName: 'Kramer',
      profession: 'Controls Engineer',
      summary:
        'Controls Engineer with 7+ years of experience designing and commissioning PLC-based control systems for manufacturing and process industries. Expert in Rockwell and Siemens platforms with a strong background in SCADA, HMI development, and safety systems.',
      skills: [
        'PLC Programming',
        'Rockwell ControlLogix',
        'Siemens TIA Portal',
        'SCADA/HMI',
        'AutoCAD Electrical',
        'Industrial Networking',
        'P&ID',
        'Safety Systems',
      ],
      experience: [
        {
          title: 'Senior Controls Engineer',
          company: 'ProControl Systems Inc.',
          startDate: '2020-09',
          isCurrent: true,
          achievements: [
            'Designed PLC control systems for 5 automated production lines with a combined throughput of 10,000 units/hour',
            'Developed SCADA system monitoring 1,500+ I/O points with real-time alarming and historical trending',
            'Implemented SIL-2 rated safety systems reducing recordable safety incidents by 40%',
            'Led commissioning and startup of $8M packaging facility, achieving full production within 3 weeks of installation',
          ],
        },
        {
          title: 'Controls Engineer',
          company: 'Apex Process Engineering',
          startDate: '2017-03',
          endDate: '2020-08',
          achievements: [
            'Programmed and commissioned 25+ Allen-Bradley PLCs for chemical processing applications',
            'Designed HMI interfaces in FactoryTalk View that improved operator response time by 30%',
            'Migrated legacy relay-based systems to PLC control, reducing maintenance costs by 45%',
          ],
        },
      ],
      education: [
        {
          institution: 'Ohio State University',
          degree: 'Bachelor of Science',
          field: 'Electrical Engineering',
          startDate: '2013-08',
          endDate: '2017-05',
        },
      ],
      certifications: [
        { name: 'Professional Engineer (PE) — Electrical', issuer: 'NCEES', date: '2021-06' },
        { name: 'Rockwell Automation Certified', issuer: 'Rockwell Automation', date: '2019-11' },
      ],
    }),
    faqs: [
      {
        question: 'What PLC brands should I mention on my controls engineer resume?',
        answer:
          'List all PLC platforms you have experience with: Rockwell/Allen-Bradley, Siemens, Mitsubishi, Schneider, ABB, etc. Specify the specific product families (ControlLogix, CompactLogix, S7-1500) and programming environments (Studio 5000, TIA Portal).',
      },
      {
        question: 'Is a PE license valuable for controls engineers?',
        answer:
          'Yes, though it is less common than in civil or structural engineering. A PE license in electrical or control systems engineering adds credibility and may be required for roles involving engineering stamps on designs.',
      },
      {
        question: 'How do I describe control system projects on my resume?',
        answer:
          'Include the scope (I/O count, number of devices), industry (food & beverage, pharma, oil & gas), PLC platform, communication protocols, and results (throughput, uptime, safety improvements). Mention commissioning and startup experience.',
      },
    ],
  },

  // ─── 17. CRM Developer ────────────────────────────────────────────
  {
    slug: 'crm-developer',
    title: 'CRM Developer',
    templateStyle: 'regular',
    keywords: [
      'crm developer resume example',
      'salesforce developer resume',
      'crm developer resume template',
      'dynamics crm developer resume',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 1900,
    topSkills: [
      'Salesforce (Apex, Lightning, SOQL)',
      'Microsoft Dynamics 365',
      'CRM Customization & Configuration',
      'JavaScript / TypeScript',
      'Integration (REST/SOAP APIs)',
      'Workflow Automation',
      'Data Migration',
      'SQL',
      'Agile Methodologies',
      'Business Requirements Analysis',
    ],
    atsKeywords: [
      'CRM development',
      'Salesforce',
      'Apex',
      'Lightning',
      'Visualforce',
      'SOQL',
      'Dynamics 365',
      'CRM integration',
      'workflow automation',
      'data migration',
      'REST API',
      'SOAP',
      'customization',
      'configuration',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Laura',
      lastName: 'Bennett',
      profession: 'CRM Developer',
      summary:
        'CRM Developer with 5+ years of experience customizing and extending Salesforce and Dynamics 365 platforms. Adept at building Lightning components, Apex triggers, and integrations that streamline sales processes and improve customer relationship management.',
      skills: [
        'Salesforce (Apex, Lightning, SOQL)',
        'Dynamics 365',
        'JavaScript',
        'REST/SOAP APIs',
        'SQL',
        'Workflow Automation',
        'Data Migration',
        'Agile/Scrum',
      ],
      experience: [
        {
          title: 'Senior CRM Developer',
          company: 'Clearview CRM Consulting',
          startDate: '2021-07',
          isCurrent: true,
          achievements: [
            'Developed 30+ custom Lightning Web Components and Apex classes for enterprise Salesforce org with 2,000+ users',
            'Integrated Salesforce with ERP, marketing automation, and billing systems via REST APIs, automating 80% of manual data entry',
            'Led data migration of 5M+ records from legacy CRM to Salesforce with 99.7% accuracy using Data Loader and custom scripts',
            'Implemented automated lead scoring and routing that increased sales team conversion rate by 22%',
          ],
        },
        {
          title: 'CRM Developer',
          company: 'Nexus Business Solutions',
          startDate: '2019-02',
          endDate: '2021-06',
          achievements: [
            'Built custom Dynamics 365 plugins and workflows that automated quote generation, saving 15 hours/week for the sales team',
            'Created Power Automate flows connecting Dynamics 365 with SharePoint, Teams, and Outlook for unified customer view',
            'Developed 10+ SSRS reports and dashboards providing pipeline visibility to executive leadership',
          ],
        },
      ],
      education: [
        {
          institution: 'University of North Carolina',
          degree: 'Bachelor of Science',
          field: 'Information Systems',
          startDate: '2015-08',
          endDate: '2019-05',
        },
      ],
      certifications: [
        { name: 'Salesforce Certified Platform Developer I', issuer: 'Salesforce', date: '2020-08' },
        { name: 'Salesforce Certified Platform Developer II', issuer: 'Salesforce', date: '2022-03' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications matter most for CRM developers?',
        answer:
          'For Salesforce: Platform Developer I & II, Administrator, and Integration Architect. For Dynamics 365: Power Platform Developer Associate, Dynamics 365 Customer Engagement Developer. These certifications validate platform-specific expertise.',
      },
      {
        question: 'Should I specialize in Salesforce or Dynamics 365?',
        answer:
          'Specializing in one platform while having familiarity with the other is ideal. Salesforce has a larger market share, but Dynamics 365 is growing rapidly in enterprise. Choose based on your target market and existing experience.',
      },
      {
        question: 'How do I show business impact as a CRM developer?',
        answer:
          'Quantify how your customizations improved sales processes: conversion rate increases, time saved on manual tasks, data accuracy improvements, and user adoption rates. CRM development directly impacts revenue, so tie your work to business metrics.',
      },
    ],
  },

  // ─── 18. Cybersecurity Analyst ─────────────────────────────────────
  {
    slug: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    templateStyle: 'regular',
    keywords: [
      'cybersecurity analyst resume example',
      'cybersecurity analyst resume template',
      'information security analyst resume',
      'cyber security resume',
    ],
    searchIntents: ['Example', 'Template', 'Skills'],
    totalMonthlySearches: 6800,
    topSkills: [
      'SIEM (Splunk, QRadar, Sentinel)',
      'Threat Detection & Incident Response',
      'Vulnerability Assessment',
      'Network Security',
      'Firewalls & IDS/IPS',
      'NIST / ISO 27001 Frameworks',
      'Penetration Testing',
      'Security Operations Center (SOC)',
      'Python / PowerShell Scripting',
      'Risk Assessment',
    ],
    atsKeywords: [
      'cybersecurity',
      'SIEM',
      'Splunk',
      'incident response',
      'threat detection',
      'vulnerability assessment',
      'penetration testing',
      'NIST',
      'ISO 27001',
      'SOC',
      'firewall',
      'IDS/IPS',
      'risk assessment',
      'malware analysis',
      'security operations',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Natasha',
      lastName: 'Collins',
      profession: 'Cybersecurity Analyst',
      summary:
        'Cybersecurity Analyst with 5+ years of experience in threat detection, incident response, and vulnerability management within SOC environments. Proficient in SIEM platforms, NIST framework implementation, and security automation to protect critical enterprise assets.',
      skills: [
        'Splunk',
        'CrowdStrike',
        'Nessus',
        'NIST Framework',
        'Incident Response',
        'Python',
        'PowerShell',
        'Wireshark',
        'Firewalls',
      ],
      experience: [
        {
          title: 'Senior Cybersecurity Analyst',
          company: 'SecureNet Defense Corp.',
          startDate: '2022-01',
          isCurrent: true,
          achievements: [
            'Led incident response for 50+ security events including 3 critical breaches, containing threats within an average of 2 hours',
            'Developed SIEM correlation rules in Splunk that improved threat detection rate by 65%',
            'Conducted vulnerability assessments across 2,000+ endpoints, remediating 95% of critical findings within SLA',
            'Automated security reporting using Python, saving the SOC team 20 hours per week',
          ],
        },
        {
          title: 'Cybersecurity Analyst',
          company: 'Guardian Financial Group',
          startDate: '2019-06',
          endDate: '2021-12',
          achievements: [
            'Monitored and triaged 500+ daily security alerts in 24/7 SOC environment with 98% accuracy',
            'Performed penetration testing on web applications identifying 40+ vulnerabilities before production release',
            'Implemented NIST Cybersecurity Framework controls achieving compliance audit readiness in 6 months',
          ],
        },
      ],
      education: [
        {
          institution: 'George Mason University',
          degree: 'Bachelor of Science',
          field: 'Cybersecurity',
          startDate: '2015-08',
          endDate: '2019-05',
        },
      ],
      certifications: [
        { name: 'CompTIA Security+', issuer: 'CompTIA', date: '2019-09' },
        { name: 'Certified Information Systems Security Professional (CISSP)', issuer: 'ISC²', date: '2023-01' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications should a cybersecurity analyst have?',
        answer:
          'Start with CompTIA Security+, then pursue CISSP, CEH, or CySA+ depending on your specialization. For SOC roles, Splunk certifications are valuable. For penetration testing, consider OSCP. List certifications prominently on your resume.',
      },
      {
        question: 'How do I quantify cybersecurity achievements?',
        answer:
          'Use metrics like number of incidents responded to, threat detection improvement percentages, vulnerability remediation rates, time to containment, false positive reduction, and compliance audit results.',
      },
      {
        question: 'Should I include a home lab or CTF experience on my resume?',
        answer:
          'Yes, especially for entry-level to mid-level positions. Home labs demonstrate hands-on initiative, and CTF rankings show practical skills. Describe the technologies used and any notable achievements or projects.',
      },
    ],
  },

  // ─── 19. Data Analyst ──────────────────────────────────────────────
  {
    slug: 'data-analyst',
    title: 'Data Analyst',
    templateStyle: 'regular',
    keywords: [
      'data analyst resume example',
      'data analyst resume template',
      'data analyst resume format',
      'entry level data analyst resume',
      'data analyst cv sample',
    ],
    searchIntents: ['Example', 'Template', 'Format'],
    totalMonthlySearches: 12000,
    topSkills: [
      'SQL',
      'Python / R',
      'Excel (Advanced)',
      'Data Visualization (Tableau, Power BI)',
      'Statistical Analysis',
      'Data Cleaning & Wrangling',
      'A/B Testing',
      'ETL Processes',
      'Business Intelligence',
      'Stakeholder Communication',
    ],
    atsKeywords: [
      'data analysis',
      'SQL',
      'Python',
      'R',
      'Tableau',
      'Power BI',
      'Excel',
      'statistical analysis',
      'data visualization',
      'ETL',
      'A/B testing',
      'data cleaning',
      'business intelligence',
      'reporting',
      'dashboards',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Emily',
      lastName: 'Carter',
      profession: 'Data Analyst',
      summary:
        'Data Analyst with 4+ years of experience transforming raw data into actionable business insights. Proficient in SQL, Python, and Tableau with a strong track record of building dashboards and performing analyses that drive strategic decisions.',
      skills: [
        'SQL',
        'Python (pandas, NumPy)',
        'Tableau',
        'Power BI',
        'Excel',
        'Statistical Analysis',
        'A/B Testing',
        'ETL',
        'Google Analytics',
      ],
      experience: [
        {
          title: 'Senior Data Analyst',
          company: 'Horizon E-Commerce',
          startDate: '2022-04',
          isCurrent: true,
          achievements: [
            'Built 15+ Tableau dashboards tracking KPIs for $200M+ revenue business, used daily by 50+ stakeholders',
            'Conducted A/B tests on checkout flow resulting in 18% increase in conversion rate, adding $3.6M in annual revenue',
            'Developed automated Python data pipeline processing 5M+ daily transactions, replacing manual Excel reports',
            'Identified customer churn patterns through cohort analysis leading to retention strategy that reduced churn by 12%',
          ],
        },
        {
          title: 'Data Analyst',
          company: 'Metro Health Partners',
          startDate: '2020-01',
          endDate: '2022-03',
          achievements: [
            'Analyzed patient flow data across 8 clinics, identifying bottlenecks that reduced average wait time by 25%',
            'Created Power BI reports for executive team tracking $45M operational budget with drill-down capabilities',
            'Cleaned and standardized 3M+ patient records improving data accuracy from 82% to 97%',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Wisconsin-Madison',
          degree: 'Bachelor of Science',
          field: 'Statistics',
          startDate: '2016-09',
          endDate: '2020-05',
        },
      ],
      certifications: [
        { name: 'Google Data Analytics Professional Certificate', issuer: 'Google', date: '2021-06' },
        { name: 'Tableau Desktop Specialist', issuer: 'Tableau', date: '2022-01' },
      ],
    }),
    faqs: [
      {
        question: 'What are the most important skills for a data analyst resume?',
        answer:
          'SQL is the most essential skill, followed by a programming language (Python or R), visualization tools (Tableau, Power BI), Excel, and statistical knowledge. Tailor your skill list to match the specific tools mentioned in the job description.',
      },
      {
        question: 'How do I make my data analyst resume stand out?',
        answer:
          'Quantify your impact with business metrics: revenue influenced, cost savings identified, efficiency improvements. Describe specific analyses and their outcomes rather than listing generic responsibilities. Include a link to a portfolio with sample visualizations.',
      },
      {
        question: 'Is a data analyst portfolio necessary?',
        answer:
          'While not required, a portfolio with sample dashboards, analyses, or Jupyter notebooks significantly strengthens your application, especially for junior roles. Host it on GitHub, Tableau Public, or a personal website and link it on your resume.',
      },
    ],
  },

  // ─── 20. Data Engineer ─────────────────────────────────────────────
  {
    slug: 'data-engineer',
    title: 'Data Engineer',
    templateStyle: 'regular',
    keywords: [
      'data engineer resume example',
      'data engineer resume template',
      'data engineer resume format',
      'data engineer cv',
    ],
    searchIntents: ['Example', 'Template', 'Skills'],
    totalMonthlySearches: 7200,
    topSkills: [
      'Python / Scala',
      'SQL',
      'Apache Spark',
      'Apache Airflow',
      'AWS / GCP / Azure Data Services',
      'Data Warehousing (Snowflake, Redshift, BigQuery)',
      'ETL/ELT Pipeline Design',
      'Kafka / Event Streaming',
      'Data Modeling',
      'dbt',
    ],
    atsKeywords: [
      'data engineering',
      'Python',
      'SQL',
      'Spark',
      'Airflow',
      'Snowflake',
      'Redshift',
      'BigQuery',
      'ETL',
      'ELT',
      'Kafka',
      'data pipeline',
      'data warehouse',
      'data modeling',
      'dbt',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Ryan',
      lastName: 'Brooks',
      profession: 'Data Engineer',
      summary:
        'Data Engineer with 6 years of experience building and optimizing large-scale data pipelines and warehouses. Expert in Python, Spark, Airflow, and Snowflake with a focus on delivering reliable, cost-efficient data infrastructure for analytics and ML teams.',
      skills: [
        'Python',
        'SQL',
        'Apache Spark',
        'Apache Airflow',
        'Snowflake',
        'AWS (S3, Glue, Redshift)',
        'Kafka',
        'dbt',
        'Docker',
      ],
      experience: [
        {
          title: 'Senior Data Engineer',
          company: 'Luminary Analytics',
          startDate: '2021-06',
          isCurrent: true,
          achievements: [
            'Designed and maintained 50+ Airflow DAGs orchestrating ETL pipelines processing 2TB+ of data daily',
            'Built Snowflake data warehouse serving 100+ analysts and data scientists with sub-second query performance',
            'Implemented real-time streaming pipeline using Kafka and Spark Structured Streaming reducing data latency from 24 hours to 5 minutes',
            'Reduced Snowflake compute costs by 40% through query optimization, clustering, and warehouse scheduling',
          ],
        },
        {
          title: 'Data Engineer',
          company: 'Vantage Media Group',
          startDate: '2018-09',
          endDate: '2021-05',
          achievements: [
            'Built data lake on AWS S3 with Glue ETL jobs processing 500M+ ad impression records daily',
            'Developed dbt transformation layer with 200+ models, improving data team productivity by 3x',
            'Migrated legacy Oracle data warehouse to Redshift, reducing infrastructure costs by 55%',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Michigan',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2014-09',
          endDate: '2018-05',
        },
      ],
      certifications: [
        { name: 'AWS Certified Data Engineer – Associate', issuer: 'Amazon Web Services', date: '2023-04' },
        { name: 'Snowflake SnowPro Core Certification', issuer: 'Snowflake', date: '2022-08' },
      ],
    }),
    faqs: [
      {
        question: 'What should a data engineer resume focus on?',
        answer:
          'Emphasize pipeline design, data warehouse experience, the scale of data processed (rows, TB), technologies used (Spark, Airflow, Kafka, dbt), and cloud platforms. Quantify data freshness improvements, cost reductions, and reliability metrics.',
      },
      {
        question: 'How is a data engineer resume different from a data analyst resume?',
        answer:
          'Data engineers focus on building infrastructure: pipelines, warehouses, and data platforms. Emphasize engineering skills (Python, Spark, Airflow), system design, and data architecture rather than business analysis and visualization tools.',
      },
      {
        question: 'Which cloud platform should I highlight?',
        answer:
          'Highlight the platform(s) matching the job description. AWS (Redshift, Glue, S3), GCP (BigQuery, Dataflow), and Azure (Synapse, Data Factory) are all in demand. Experience with modern data stack tools like Snowflake and dbt is also highly valued.',
      },
    ],
  },

  // ─── 21. Data Scientist ────────────────────────────────────────────
  {
    slug: 'data-scientist',
    title: 'Data Scientist',
    templateStyle: 'regular',
    keywords: [
      'data scientist resume example',
      'data scientist resume template',
      'data science resume format',
      'data scientist cv',
    ],
    searchIntents: ['Example', 'Template', 'Skills'],
    totalMonthlySearches: 9500,
    topSkills: [
      'Python (pandas, scikit-learn)',
      'Machine Learning',
      'Statistical Modeling',
      'SQL',
      'Deep Learning (TensorFlow/PyTorch)',
      'Data Visualization',
      'A/B Testing & Experimentation',
      'Feature Engineering',
      'R',
      'Communication & Storytelling',
    ],
    atsKeywords: [
      'data science',
      'machine learning',
      'Python',
      'statistical modeling',
      'deep learning',
      'SQL',
      'R',
      'TensorFlow',
      'scikit-learn',
      'A/B testing',
      'feature engineering',
      'NLP',
      'predictive modeling',
      'data visualization',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Sophia',
      lastName: 'Zhang',
      profession: 'Data Scientist',
      summary:
        'Data Scientist with 5+ years of experience developing predictive models and running experiments that drive product and business decisions. Skilled in Python, machine learning, and statistical analysis with published research and production model deployments.',
      skills: [
        'Python',
        'scikit-learn',
        'TensorFlow',
        'SQL',
        'R',
        'Spark',
        'A/B Testing',
        'Feature Engineering',
        'Tableau',
      ],
      experience: [
        {
          title: 'Senior Data Scientist',
          company: 'Vertex Product Intelligence',
          startDate: '2022-03',
          isCurrent: true,
          achievements: [
            'Built customer lifetime value model that informed $25M annual marketing budget allocation with 89% accuracy',
            'Designed and analyzed 30+ A/B tests per quarter, driving product decisions affecting 5M+ users',
            'Developed NLP-based sentiment analysis pipeline processing 100K+ customer reviews monthly',
            'Created propensity-to-buy model increasing targeted campaign ROI by 35%',
          ],
        },
        {
          title: 'Data Scientist',
          company: 'Pulse Health Analytics',
          startDate: '2019-08',
          endDate: '2022-02',
          achievements: [
            'Built predictive model for hospital readmission risk with 0.87 AUC, helping reduce readmissions by 15%',
            'Developed feature engineering pipeline processing 200+ clinical variables for ML model training',
            'Deployed real-time scoring API on AWS SageMaker serving 10K+ predictions per hour',
          ],
        },
      ],
      education: [
        {
          institution: 'Columbia University',
          degree: 'Master of Science',
          field: 'Data Science',
          startDate: '2017-09',
          endDate: '2019-05',
        },
        {
          institution: 'UC San Diego',
          degree: 'Bachelor of Science',
          field: 'Mathematics',
          startDate: '2013-09',
          endDate: '2017-06',
        },
      ],
      certifications: [
        { name: 'AWS Certified Machine Learning – Specialty', issuer: 'Amazon Web Services', date: '2022-11' },
      ],
    }),
    faqs: [
      {
        question: 'What should a data scientist resume include?',
        answer:
          'Include programming languages (Python, R, SQL), ML frameworks, statistical methods, experiment design experience, and model deployment skills. Quantify model performance (AUC, accuracy, F1) and business impact (revenue, cost savings, user engagement).',
      },
      {
        question: 'Should I list Kaggle competitions on my data science resume?',
        answer:
          'Yes, especially top placements. Kaggle rankings demonstrate practical ML skills. For senior roles, prioritize production model deployments and business impact over competition results.',
      },
      {
        question: 'How do I balance technical and business skills on my resume?',
        answer:
          'Data scientists must communicate findings to non-technical stakeholders. Show both: technical skills in your skills section, and business impact in your achievement bullets. For example, "Built churn prediction model (0.91 AUC) that informed retention strategy reducing annual churn by 12%."',
      },
    ],
  },

  // ─── 22. Database Administrator ────────────────────────────────────
  {
    slug: 'database-administrator',
    title: 'Database Administrator',
    templateStyle: 'regular',
    keywords: [
      'database administrator resume example',
      'dba resume template',
      'database administrator resume format',
      'database admin cv',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 3800,
    topSkills: [
      'SQL Server / Oracle / PostgreSQL / MySQL',
      'Performance Tuning & Query Optimization',
      'Backup & Recovery',
      'High Availability (Always On, RAC)',
      'Database Security',
      'Replication & Clustering',
      'Monitoring & Alerting',
      'Scripting (T-SQL, PL/SQL, PowerShell)',
      'Cloud Databases (RDS, Azure SQL)',
      'Capacity Planning',
    ],
    atsKeywords: [
      'database administration',
      'SQL Server',
      'Oracle',
      'PostgreSQL',
      'MySQL',
      'performance tuning',
      'backup recovery',
      'high availability',
      'replication',
      'database security',
      'T-SQL',
      'PL/SQL',
      'monitoring',
      'capacity planning',
      'DBA',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Kenneth',
      lastName: 'Harper',
      profession: 'Database Administrator',
      summary:
        'Database Administrator with 8+ years managing enterprise database systems across SQL Server, Oracle, and PostgreSQL. Expert in performance tuning, high availability configurations, and disaster recovery with a proven record of maintaining 99.99% uptime.',
      skills: [
        'SQL Server',
        'Oracle 19c',
        'PostgreSQL',
        'T-SQL',
        'Performance Tuning',
        'Always On AG',
        'Backup/Recovery',
        'PowerShell',
        'AWS RDS',
      ],
      experience: [
        {
          title: 'Senior Database Administrator',
          company: 'Fortis Banking Systems',
          startDate: '2020-04',
          isCurrent: true,
          achievements: [
            'Managed 80+ production databases (SQL Server and Oracle) with combined storage of 50TB and 99.99% uptime',
            'Optimized critical stored procedures reducing execution time by 70%, supporting 10x increase in transaction volume',
            'Implemented Always On Availability Groups across 3 data centers achieving RPO of 0 and RTO under 30 seconds',
            'Automated routine DBA tasks with PowerShell scripts saving 25 hours per week in manual operations',
          ],
        },
        {
          title: 'Database Administrator',
          company: 'RetailMax Corporation',
          startDate: '2016-09',
          endDate: '2020-03',
          achievements: [
            'Administered 40+ PostgreSQL and MySQL databases supporting e-commerce platform handling 500K daily orders',
            'Designed and tested disaster recovery procedures, successfully completing 4 annual DR drills with zero data loss',
            'Migrated 15 on-premises databases to AWS RDS, reducing infrastructure costs by 38%',
          ],
        },
      ],
      education: [
        {
          institution: 'Penn State University',
          degree: 'Bachelor of Science',
          field: 'Information Sciences and Technology',
          startDate: '2012-08',
          endDate: '2016-05',
        },
      ],
      certifications: [
        { name: 'Oracle Certified Professional (OCP)', issuer: 'Oracle', date: '2019-07' },
        { name: 'Microsoft Certified: Azure Database Administrator Associate', issuer: 'Microsoft', date: '2022-03' },
      ],
    }),
    faqs: [
      {
        question: 'What database platforms should I list on my DBA resume?',
        answer:
          'List all platforms you have production experience with (SQL Server, Oracle, PostgreSQL, MySQL, MongoDB) and the versions. Specify which you are expert-level in versus working knowledge. Match your primary platform to the job requirements.',
      },
      {
        question: 'How do I demonstrate performance tuning skills?',
        answer:
          'Describe specific optimizations with before/after metrics: query execution time reductions, index strategies, execution plan analysis, and the business impact. For example, "Reduced critical report query time from 12 minutes to 8 seconds through index optimization and query rewrite."',
      },
      {
        question: 'Is cloud database experience important for DBAs?',
        answer:
          'Increasingly essential. Most organizations use or are migrating to cloud databases (AWS RDS, Azure SQL, Cloud SQL). Include cloud migration experience, managed service expertise, and cost optimization skills on your resume.',
      },
    ],
  },

  // ─── 23. Database Developer ────────────────────────────────────────
  {
    slug: 'database-developer',
    title: 'Database Developer',
    templateStyle: 'regular',
    keywords: [
      'database developer resume example',
      'database developer resume template',
      'sql developer resume',
      'database developer cv',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 2600,
    topSkills: [
      'SQL / T-SQL / PL/SQL',
      'Stored Procedures & Functions',
      'Database Design & Normalization',
      'ETL Development',
      'Performance Optimization',
      'Data Modeling (ERD)',
      'SSIS / SSRS / SSAS',
      'Version Control for Databases',
      'NoSQL (MongoDB, DynamoDB)',
      'Python / C#',
    ],
    atsKeywords: [
      'database development',
      'SQL',
      'T-SQL',
      'PL/SQL',
      'stored procedures',
      'database design',
      'ETL',
      'data modeling',
      'SSIS',
      'performance optimization',
      'normalization',
      'indexing',
      'NoSQL',
      'MongoDB',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Brian',
      lastName: 'Walker',
      profession: 'Database Developer',
      summary:
        'Database Developer with 6 years of experience designing databases, writing complex stored procedures, and building ETL pipelines. Proficient in SQL Server, Oracle, and data modeling with a focus on performance and data integrity.',
      skills: [
        'SQL Server',
        'T-SQL',
        'Oracle/PL/SQL',
        'SSIS',
        'Data Modeling',
        'ETL Development',
        'Python',
        'MongoDB',
        'Git',
      ],
      experience: [
        {
          title: 'Senior Database Developer',
          company: 'Meridian Data Solutions',
          startDate: '2021-03',
          isCurrent: true,
          achievements: [
            'Designed and maintained 200+ stored procedures and functions supporting critical business applications with 3M+ daily transactions',
            'Created normalized database schema for new product line handling 50M+ records with optimized indexing strategy',
            'Built SSIS packages automating data flows from 12 source systems, reducing manual processing by 90%',
            'Improved query performance by 60% through execution plan analysis, index tuning, and query refactoring',
          ],
        },
        {
          title: 'Database Developer',
          company: 'Lighthouse Insurance Group',
          startDate: '2018-06',
          endDate: '2021-02',
          achievements: [
            'Developed 100+ T-SQL stored procedures and views for claims processing system handling $200M+ annually',
            'Designed ETL processes in SSIS for nightly data loads of 10M+ records with error handling and auditing',
            'Migrated legacy Access databases to SQL Server, improving data reliability and enabling multi-user access',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Maryland',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2014-08',
          endDate: '2018-05',
        },
      ],
      certifications: [
        { name: 'Microsoft Certified: Azure Data Engineer Associate', issuer: 'Microsoft', date: '2022-06' },
      ],
    }),
    faqs: [
      {
        question: 'What is the difference between a DBA and database developer resume?',
        answer:
          'DBAs focus on administration (backup/recovery, security, performance monitoring), while database developers focus on designing schemas, writing stored procedures, building ETL processes, and developing database-driven applications. Tailor your resume accordingly.',
      },
      {
        question: 'Should I include database design skills on my resume?',
        answer:
          'Absolutely. Showcase normalization expertise, ER diagram creation, schema design decisions, and data modeling tools. Include the scale of databases you designed (number of tables, records, relationships).',
      },
      {
        question: 'How important is version control for database development?',
        answer:
          'Increasingly important. Mention tools like Git, Flyway, Liquibase, or SSDT for version-controlled database deployments. It shows modern practices and collaboration readiness.',
      },
    ],
  },

  // ─── 24. DevOps Engineer ───────────────────────────────────────────
  {
    slug: 'devops-engineer',
    title: 'DevOps Engineer',
    templateStyle: 'regular',
    keywords: [
      'devops engineer resume example',
      'devops engineer resume template',
      'devops resume format',
      'devops engineer cv',
    ],
    searchIntents: ['Example', 'Template', 'Skills'],
    totalMonthlySearches: 8400,
    topSkills: [
      'CI/CD (Jenkins, GitHub Actions, GitLab CI)',
      'Docker & Kubernetes',
      'Terraform / Ansible',
      'AWS / Azure / GCP',
      'Linux Administration',
      'Monitoring (Prometheus, Grafana, Datadog)',
      'Python / Bash Scripting',
      'GitOps (ArgoCD, Flux)',
      'Security (DevSecOps)',
      'Incident Management',
    ],
    atsKeywords: [
      'DevOps',
      'CI/CD',
      'Jenkins',
      'Docker',
      'Kubernetes',
      'Terraform',
      'Ansible',
      'AWS',
      'Linux',
      'monitoring',
      'Prometheus',
      'Grafana',
      'infrastructure as code',
      'GitOps',
      'automation',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Chris',
      lastName: 'Anderson',
      profession: 'DevOps Engineer',
      summary:
        'DevOps Engineer with 7 years of experience building CI/CD pipelines, managing Kubernetes clusters, and automating cloud infrastructure. Passionate about reliability, developer productivity, and bridging the gap between development and operations teams.',
      skills: [
        'Docker',
        'Kubernetes',
        'Terraform',
        'Jenkins',
        'GitHub Actions',
        'AWS',
        'Python',
        'Bash',
        'Prometheus/Grafana',
        'ArgoCD',
      ],
      experience: [
        {
          title: 'Senior DevOps Engineer',
          company: 'Velocity SaaS',
          startDate: '2021-02',
          isCurrent: true,
          achievements: [
            'Built CI/CD platform supporting 80+ microservices with 500+ daily deployments and zero-downtime releases',
            'Managed Kubernetes clusters (EKS) running 200+ pods across 3 environments with 99.99% availability',
            'Implemented GitOps workflow with ArgoCD reducing deployment errors by 85% and config drift to near zero',
            'Reduced infrastructure provisioning time from 2 days to 15 minutes using Terraform modules and self-service tooling',
          ],
        },
        {
          title: 'DevOps Engineer',
          company: 'Nexwave Digital',
          startDate: '2017-09',
          endDate: '2021-01',
          achievements: [
            'Designed Jenkins pipeline templates standardizing CI/CD across 12 development teams',
            'Containerized 30+ legacy applications with Docker, enabling consistent deployments across environments',
            'Built monitoring stack with Prometheus and Grafana providing real-time visibility into 100+ services',
          ],
        },
      ],
      education: [
        {
          institution: 'North Carolina State University',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2013-08',
          endDate: '2017-05',
        },
      ],
      certifications: [
        { name: 'Certified Kubernetes Administrator (CKA)', issuer: 'CNCF', date: '2021-10' },
        { name: 'AWS Certified DevOps Engineer – Professional', issuer: 'Amazon Web Services', date: '2022-06' },
      ],
    }),
    faqs: [
      {
        question: 'What should a DevOps engineer resume emphasize?',
        answer:
          'Focus on CI/CD pipeline design, container orchestration (Kubernetes), IaC tools (Terraform, Ansible), cloud platforms, and monitoring. Quantify deployment frequency, availability, incident reduction, and developer productivity improvements.',
      },
      {
        question: 'How do I show the impact of DevOps work?',
        answer:
          'Use DORA metrics where possible: deployment frequency, lead time for changes, MTTR, and change failure rate. Also quantify time savings, cost reductions, and availability improvements.',
      },
      {
        question: 'Should I list programming languages on a DevOps resume?',
        answer:
          'Yes. DevOps roles require scripting (Python, Bash, Go) and sometimes application development knowledge. List languages you use for automation, tooling, and pipeline development.',
      },
    ],
  },

  // ─── 25. Electrical Engineer ───────────────────────────────────────
  {
    slug: 'electrical-engineer',
    title: 'Electrical Engineer',
    templateStyle: 'regular',
    keywords: [
      'electrical engineer resume example',
      'electrical engineer resume template',
      'electrical engineering resume format',
      'electrical engineer cv',
    ],
    searchIntents: ['Example', 'Template', 'Format'],
    totalMonthlySearches: 7400,
    topSkills: [
      'Circuit Design & Analysis',
      'PCB Layout (Altium, KiCad)',
      'Power Systems',
      'MATLAB / Simulink',
      'Embedded Systems',
      'AutoCAD Electrical',
      'Signal Processing',
      'PLC/SCADA',
      'Testing & Validation',
      'Project Management',
    ],
    atsKeywords: [
      'electrical engineering',
      'circuit design',
      'PCB layout',
      'power systems',
      'Altium',
      'MATLAB',
      'Simulink',
      'embedded systems',
      'signal processing',
      'AutoCAD Electrical',
      'testing',
      'validation',
      'PE license',
      'NEC',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Andrew',
      lastName: 'Kim',
      profession: 'Electrical Engineer',
      summary:
        'Licensed Electrical Engineer (PE) with 7+ years of experience in circuit design, power systems, and PCB layout. Proven track record in taking products from concept through production with expertise in embedded systems and signal processing.',
      skills: [
        'Circuit Design',
        'Altium Designer',
        'MATLAB/Simulink',
        'Power Systems',
        'Embedded C',
        'AutoCAD Electrical',
        'Signal Processing',
        'Testing & Validation',
      ],
      experience: [
        {
          title: 'Senior Electrical Engineer',
          company: 'Voltarc Systems Inc.',
          startDate: '2021-01',
          isCurrent: true,
          achievements: [
            'Designed power electronics for 5 IoT product lines generating $12M+ in annual revenue',
            'Led PCB design and validation for multi-layer boards with mixed-signal circuits achieving first-pass success rate of 92%',
            'Reduced BOM cost by 20% through component optimization and design-for-manufacturing improvements',
            'Managed team of 4 engineers through full product lifecycle from prototype to mass production',
          ],
        },
        {
          title: 'Electrical Engineer',
          company: 'Beacon Defense Solutions',
          startDate: '2017-06',
          endDate: '2020-12',
          achievements: [
            'Designed embedded systems and power supplies for defense communication equipment meeting MIL-STD requirements',
            'Performed electromagnetic compatibility (EMC) testing and achieved compliance for 8 products',
            'Created MATLAB/Simulink models for signal processing algorithms reducing development time by 35%',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Michigan',
          degree: 'Bachelor of Science',
          field: 'Electrical Engineering',
          startDate: '2013-09',
          endDate: '2017-05',
        },
      ],
      certifications: [
        { name: 'Professional Engineer (PE) — Electrical', issuer: 'NCEES', date: '2021-08' },
      ],
    }),
    faqs: [
      {
        question: 'What should I highlight on an electrical engineer resume?',
        answer:
          'Emphasize design tools (Altium, KiCad, MATLAB), types of circuits/systems designed, testing and compliance experience, and the PE license if you have one. Include the scale and impact of products you contributed to.',
      },
      {
        question: 'How important is a PE license for electrical engineers?',
        answer:
          'Very important for roles involving power systems, building electrical design, and consulting. For roles in electronics/hardware product development, it is valued but less commonly required. It always strengthens your resume.',
      },
      {
        question: 'Should I include lab and testing experience?',
        answer:
          'Yes. Validation and testing are critical skills. Describe oscilloscope, spectrum analyzer, and EMC testing experience. Mention compliance standards met (FCC, CE, MIL-STD, UL) and first-pass success rates.',
      },
    ],
  },

  // ─── 26. Electronics Engineer ──────────────────────────────────────
  {
    slug: 'electronics-engineer',
    title: 'Electronics Engineer',
    templateStyle: 'regular',
    keywords: [
      'electronics engineer resume example',
      'electronics engineer resume template',
      'electronics engineer cv',
      'hardware engineer resume',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 2900,
    topSkills: [
      'Analog & Digital Circuit Design',
      'PCB Design (Altium, OrCAD)',
      'Microcontrollers (ARM, AVR)',
      'Firmware Development (C/C++)',
      'FPGA (Verilog/VHDL)',
      'Signal Integrity & EMC',
      'Schematic Capture',
      'Oscilloscope & Lab Equipment',
      'DFM/DFT',
      'Power Supply Design',
    ],
    atsKeywords: [
      'electronics engineering',
      'analog design',
      'digital design',
      'PCB layout',
      'Altium',
      'OrCAD',
      'microcontroller',
      'ARM',
      'firmware',
      'FPGA',
      'Verilog',
      'VHDL',
      'EMC',
      'signal integrity',
      'DFM',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Takeshi',
      lastName: 'Yamamoto',
      profession: 'Electronics Engineer',
      summary:
        'Electronics Engineer with 6 years of experience in analog/digital circuit design, PCB layout, and firmware development for consumer and industrial products. Strong background in EMC compliance, signal integrity, and design for manufacturing.',
      skills: [
        'Analog/Digital Design',
        'Altium Designer',
        'ARM Cortex-M',
        'Embedded C/C++',
        'FPGA (Verilog)',
        'Signal Integrity',
        'EMC Testing',
        'Power Supply Design',
      ],
      experience: [
        {
          title: 'Senior Electronics Engineer',
          company: 'NovaTech Electronics',
          startDate: '2021-05',
          isCurrent: true,
          achievements: [
            'Designed mixed-signal PCBs for wearable health monitoring devices achieving FDA Class II clearance',
            'Reduced power consumption by 45% through low-power circuit design, extending battery life from 5 to 9 days',
            'Led hardware team of 3 engineers bringing 4 products from concept to mass production in 18 months',
            'Achieved first-time EMC compliance (FCC/CE) for 6 out of 7 product designs',
          ],
        },
        {
          title: 'Electronics Engineer',
          company: 'Riviera Industrial Controls',
          startDate: '2018-08',
          endDate: '2021-04',
          achievements: [
            'Designed control boards with ARM Cortex-M4 MCUs for industrial sensor systems deployed in 500+ installations',
            'Developed FPGA-based signal processing modules in Verilog achieving 10x throughput improvement over MCU solution',
            'Created automated test fixtures reducing production testing time from 15 minutes to 3 minutes per unit',
          ],
        },
      ],
      education: [
        {
          institution: 'California Institute of Technology',
          degree: 'Bachelor of Science',
          field: 'Electrical Engineering',
          startDate: '2014-09',
          endDate: '2018-06',
        },
      ],
      certifications: [
        { name: 'IPC Certified Interconnect Designer (CID)', issuer: 'IPC', date: '2020-05' },
      ],
    }),
    faqs: [
      {
        question: 'How is an electronics engineer resume different from electrical engineer?',
        answer:
          'Electronics engineers focus on circuit-level design (analog, digital, mixed-signal, PCBs), while electrical engineers often work on larger-scale power systems and infrastructure. Emphasize PCB design, component selection, firmware integration, and testing on your resume.',
      },
      {
        question: 'Should I include firmware experience on my electronics engineer resume?',
        answer:
          'Yes, if you have it. Many hardware roles require firmware bring-up and driver development. Listing embedded C/C++ and microcontroller experience makes you a more versatile candidate.',
      },
      {
        question: 'What compliance standards should I mention?',
        answer:
          'Include FCC, CE, UL, IEC, and any industry-specific standards (MIL-STD for defense, FDA for medical devices, ISO for automotive). Employers value engineers who understand compliance requirements from the design phase.',
      },
    ],
  },

  // ─── 27. Embedded Developer ────────────────────────────────────────
  {
    slug: 'embedded-developer',
    title: 'Embedded Developer',
    templateStyle: 'regular',
    keywords: [
      'embedded developer resume example',
      'embedded software developer resume',
      'embedded developer resume template',
      'embedded programmer resume',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 2200,
    topSkills: [
      'C / C++',
      'RTOS (FreeRTOS, Zephyr)',
      'ARM Cortex-M / RISC-V',
      'Peripheral Drivers (SPI, I2C, UART)',
      'Debugging (JTAG, GDB)',
      'Linux Kernel / Device Drivers',
      'Wireless Protocols (BLE, Wi-Fi, LoRa)',
      'Hardware/Software Integration',
      'Git & CI/CD',
      'Power Optimization',
    ],
    atsKeywords: [
      'embedded software',
      'C',
      'C++',
      'RTOS',
      'FreeRTOS',
      'ARM',
      'microcontroller',
      'device drivers',
      'SPI',
      'I2C',
      'UART',
      'JTAG',
      'embedded Linux',
      'BLE',
      'firmware',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Viktor',
      lastName: 'Petrova',
      profession: 'Embedded Developer',
      summary:
        'Embedded Developer with 5+ years of experience writing firmware in C/C++ for ARM-based microcontrollers and embedded Linux platforms. Skilled in RTOS development, peripheral integration, and power optimization for IoT and consumer electronics products.',
      skills: [
        'C',
        'C++',
        'FreeRTOS',
        'ARM Cortex-M',
        'Embedded Linux',
        'SPI/I2C/UART',
        'BLE',
        'Git',
        'JTAG/GDB',
      ],
      experience: [
        {
          title: 'Senior Embedded Developer',
          company: 'Sensorium IoT',
          startDate: '2022-01',
          isCurrent: true,
          achievements: [
            'Developed FreeRTOS-based firmware for IoT sensor platform deployed in 100,000+ devices worldwide',
            'Optimized power management achieving 2-year battery life on a single CR2032 coin cell',
            'Implemented OTA firmware update system with rollback capability, reducing field update failures by 95%',
            'Wrote BLE stack integration and custom GATT profiles for mobile app connectivity',
          ],
        },
        {
          title: 'Embedded Software Engineer',
          company: 'AutoDrive Systems',
          startDate: '2019-06',
          endDate: '2021-12',
          achievements: [
            'Developed device drivers for automotive radar module (SPI, CAN bus) meeting ASIL-B functional safety requirements',
            'Built embedded Linux BSP with Yocto for ARM-based ECU, reducing boot time from 15s to 3s',
            'Implemented unit testing framework for embedded code achieving 80% code coverage on safety-critical modules',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Colorado Boulder',
          degree: 'Bachelor of Science',
          field: 'Electrical and Computer Engineering',
          startDate: '2015-08',
          endDate: '2019-05',
        },
      ],
      certifications: [
        { name: 'ARM Accredited Engineer', issuer: 'ARM', date: '2021-04' },
      ],
    }),
    faqs: [
      {
        question: 'What should an embedded developer highlight on their resume?',
        answer:
          'Focus on programming languages (C/C++), microcontroller families (ARM, RISC-V), RTOS experience, peripheral protocols (SPI, I2C, UART, CAN), and the types of products you developed firmware for. Include power optimization and memory constraints you worked within.',
      },
      {
        question: 'Is Linux experience important for embedded developers?',
        answer:
          'For many roles, yes. Embedded Linux development (Yocto, Buildroot, device drivers, kernel modules) is increasingly in demand for higher-end embedded systems. Specify your BSP, driver, and kernel development experience.',
      },
      {
        question: 'How do I show hardware interaction skills?',
        answer:
          'Describe specific peripherals and protocols you integrated (SPI, I2C, UART, CAN, USB), lab equipment you used (oscilloscopes, logic analyzers), and how you debugged hardware-software interfaces. Mention schematic reading ability.',
      },
    ],
  },

  // ─── 28. Embedded Engineer ─────────────────────────────────────────
  {
    slug: 'embedded-engineer',
    title: 'Embedded Engineer',
    templateStyle: 'regular',
    keywords: [
      'embedded engineer resume example',
      'embedded systems engineer resume',
      'embedded engineer resume template',
      'embedded engineer cv',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 2000,
    topSkills: [
      'C / C++ / Rust',
      'RTOS (FreeRTOS, Zephyr, VxWorks)',
      'Microprocessors & Microcontrollers',
      'Hardware/Software Co-Design',
      'Debugging & Testing',
      'Communication Protocols (CAN, SPI, I2C)',
      'FPGA (Verilog/VHDL)',
      'System Architecture',
      'Safety Standards (ISO 26262, DO-178)',
      'Version Control & CI',
    ],
    atsKeywords: [
      'embedded systems',
      'C',
      'C++',
      'Rust',
      'RTOS',
      'FreeRTOS',
      'VxWorks',
      'microprocessor',
      'FPGA',
      'hardware-software co-design',
      'CAN bus',
      'functional safety',
      'ISO 26262',
      'DO-178',
      'system architecture',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Martin',
      lastName: 'Fischer',
      profession: 'Embedded Engineer',
      summary:
        'Embedded Systems Engineer with 8 years of experience in hardware-software co-design for automotive and aerospace applications. Expert in real-time systems, functional safety standards, and bringing complex embedded products from prototype to production.',
      skills: [
        'C/C++',
        'Rust',
        'RTOS (FreeRTOS, VxWorks)',
        'ARM Cortex-A/R',
        'FPGA (VHDL)',
        'CAN/LIN',
        'ISO 26262',
        'Yocto',
        'Jenkins',
      ],
      experience: [
        {
          title: 'Lead Embedded Engineer',
          company: 'Apex Mobility Systems',
          startDate: '2020-08',
          isCurrent: true,
          achievements: [
            'Architected embedded platform for ADAS module processing 20+ sensor inputs with <10ms latency meeting ASIL-D requirements',
            'Led team of 6 embedded engineers through V-model development lifecycle for automotive ECU',
            'Implemented Rust-based safety-critical firmware reducing memory-related defects by 70% compared to legacy C codebase',
            'Established CI pipeline for embedded builds with hardware-in-the-loop testing, catching 60% of defects pre-integration',
          ],
        },
        {
          title: 'Embedded Systems Engineer',
          company: 'Stratos Avionics',
          startDate: '2016-09',
          endDate: '2020-07',
          achievements: [
            'Developed VxWorks-based flight control software certified to DO-178C DAL-B for UAV systems',
            'Designed FPGA modules in VHDL for high-speed data acquisition processing 500MB/s of sensor data',
            'Reduced boot time of embedded Linux platform from 25 seconds to 4 seconds through BSP optimization',
          ],
        },
      ],
      education: [
        {
          institution: 'Georgia Institute of Technology',
          degree: 'Master of Science',
          field: 'Electrical and Computer Engineering',
          startDate: '2014-08',
          endDate: '2016-08',
        },
        {
          institution: 'University of Wisconsin-Madison',
          degree: 'Bachelor of Science',
          field: 'Computer Engineering',
          startDate: '2010-09',
          endDate: '2014-05',
        },
      ],
      certifications: [
        { name: 'Certified Functional Safety Engineer (CFSE)', issuer: 'TÜV', date: '2021-11' },
      ],
    }),
    faqs: [
      {
        question: 'What is the difference between embedded developer and embedded engineer resumes?',
        answer:
          'Embedded engineers typically have broader responsibility including system architecture, hardware-software co-design, and safety standards. Their resumes emphasize systems-level thinking, while embedded developers focus more on firmware coding. Tailor accordingly.',
      },
      {
        question: 'How important are safety certifications for embedded engineers?',
        answer:
          'Very important in automotive (ISO 26262), aerospace (DO-178), medical (IEC 62304), and industrial (IEC 61508) domains. These certifications demonstrate your ability to develop safety-critical systems, which commands higher salaries.',
      },
      {
        question: 'Should I include FPGA experience on my embedded engineer resume?',
        answer:
          'Yes, if you have it. FPGA skills (Verilog, VHDL) complement embedded software expertise and make you a more versatile candidate, especially for roles involving custom hardware or high-speed data processing.',
      },
    ],
  },

  // ─── 29. Enterprise Architect ──────────────────────────────────────
  {
    slug: 'enterprise-architect',
    title: 'Enterprise Architect',
    templateStyle: 'regular',
    keywords: [
      'enterprise architect resume example',
      'enterprise architect resume template',
      'solutions architect resume',
      'enterprise architect cv',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 3400,
    topSkills: [
      'TOGAF / Zachman Framework',
      'Cloud Architecture (AWS, Azure, GCP)',
      'Microservices & API Strategy',
      'Enterprise Integration Patterns',
      'Technology Roadmapping',
      'Stakeholder Management',
      'Security Architecture',
      'Data Architecture',
      'Cost-Benefit Analysis',
      'Vendor Evaluation',
    ],
    atsKeywords: [
      'enterprise architecture',
      'TOGAF',
      'cloud architecture',
      'microservices',
      'API strategy',
      'technology roadmap',
      'solutions architecture',
      'digital transformation',
      'integration',
      'security architecture',
      'data architecture',
      'stakeholder management',
      'governance',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Richard',
      lastName: 'Thornton',
      profession: 'Enterprise Architect',
      summary:
        'Enterprise Architect with 12+ years of experience leading digital transformation initiatives and designing technology strategies for Fortune 500 organizations. TOGAF-certified with deep expertise in cloud migration, microservices adoption, and enterprise integration.',
      skills: [
        'TOGAF 9.2',
        'AWS/Azure Architecture',
        'Microservices',
        'API Strategy',
        'Technology Roadmapping',
        'Enterprise Integration',
        'Security Architecture',
        'Stakeholder Management',
      ],
      experience: [
        {
          title: 'Chief Enterprise Architect',
          company: 'GlobalTech Financial',
          startDate: '2020-01',
          isCurrent: true,
          achievements: [
            'Defined enterprise technology strategy and 3-year roadmap for organization with $2B+ annual IT spend',
            'Led cloud-first transformation migrating 200+ applications to AWS, reducing infrastructure costs by $15M annually',
            'Established microservices architecture standards adopted across 20 development teams, reducing time-to-market by 40%',
            'Created enterprise API governance framework supporting 500+ internal and external API consumers',
          ],
        },
        {
          title: 'Senior Solutions Architect',
          company: 'Accenture',
          startDate: '2015-06',
          endDate: '2019-12',
          achievements: [
            'Designed solutions architecture for 15+ enterprise clients across banking, insurance, and healthcare verticals',
            'Led $50M digital transformation program modernizing legacy mainframe systems to cloud-native architecture',
            'Evaluated and selected technology vendors for $30M+ enterprise platform investments',
          ],
        },
      ],
      education: [
        {
          institution: 'Cornell University',
          degree: 'Master of Engineering',
          field: 'Computer Science',
          startDate: '2011-08',
          endDate: '2013-05',
        },
        {
          institution: 'University of Virginia',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2007-08',
          endDate: '2011-05',
        },
      ],
      certifications: [
        { name: 'TOGAF 9 Certified', issuer: 'The Open Group', date: '2017-03' },
        { name: 'AWS Certified Solutions Architect – Professional', issuer: 'Amazon Web Services', date: '2021-09' },
      ],
    }),
    faqs: [
      {
        question: 'What should an enterprise architect resume emphasize?',
        answer:
          'Focus on strategic impact: technology roadmaps, digital transformation programs, cost savings, and organizational change. Highlight frameworks (TOGAF, Zachman), governance experience, and the scale of organizations you served. This is a leadership role, so emphasize business outcomes over just technical skills.',
      },
      {
        question: 'Is TOGAF certification necessary for enterprise architects?',
        answer:
          'TOGAF certification is the most recognized EA credential and is often listed as a requirement or strong preference. It demonstrates your understanding of enterprise architecture frameworks and methodology. It is highly recommended.',
      },
      {
        question: 'How do I show business value as an enterprise architect?',
        answer:
          'Use metrics like IT spend managed, cost savings from modernization, time-to-market improvements, number of applications migrated, and teams influenced. Enterprise architects are evaluated on business outcomes, not just technical elegance.',
      },
    ],
  },

  // ─── 30. Environmental Engineer ────────────────────────────────────
  {
    slug: 'environmental-engineer',
    title: 'Environmental Engineer',
    templateStyle: 'regular',
    keywords: [
      'environmental engineer resume example',
      'environmental engineer resume template',
      'environmental engineering resume',
      'environmental engineer cv',
    ],
    searchIntents: ['Example', 'Template', 'Format'],
    totalMonthlySearches: 3600,
    topSkills: [
      'Environmental Impact Assessment',
      'Water/Wastewater Treatment Design',
      'Air Quality Modeling',
      'Remediation Design',
      'Regulatory Compliance (EPA, NEPA)',
      'AutoCAD / GIS',
      'Soil & Groundwater Sampling',
      'Stormwater Management',
      'Environmental Permitting',
      'Project Management',
    ],
    atsKeywords: [
      'environmental engineering',
      'environmental impact assessment',
      'water treatment',
      'wastewater',
      'air quality',
      'remediation',
      'EPA',
      'NEPA',
      'RCRA',
      'permitting',
      'stormwater',
      'soil sampling',
      'GIS',
      'AutoCAD',
      'PE license',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Jessica',
      lastName: 'Owens',
      profession: 'Environmental Engineer',
      summary:
        'Licensed Environmental Engineer (PE) with 7 years of experience in water treatment design, environmental remediation, and regulatory compliance. Skilled at managing complex environmental projects while ensuring EPA, NEPA, and state regulatory compliance.',
      skills: [
        'Water/Wastewater Treatment',
        'Environmental Remediation',
        'AutoCAD',
        'GIS',
        'EPA Compliance',
        'NEPA',
        'Air Quality Modeling',
        'Project Management',
      ],
      experience: [
        {
          title: 'Senior Environmental Engineer',
          company: 'EcoVantage Consulting',
          startDate: '2021-02',
          isCurrent: true,
          achievements: [
            'Managed $12M remediation project for contaminated industrial site, achieving EPA closure ahead of schedule',
            'Designed wastewater treatment system reducing effluent BOD by 95% for food processing facility',
            'Prepared 20+ environmental impact assessments ensuring NEPA compliance for infrastructure projects',
            'Secured environmental permits for 10 construction projects with zero regulatory violations',
          ],
        },
        {
          title: 'Environmental Engineer',
          company: 'Clearwater Environmental Services',
          startDate: '2017-06',
          endDate: '2021-01',
          achievements: [
            'Conducted Phase I and Phase II environmental site assessments for 50+ commercial properties',
            'Designed stormwater management systems for 15 development projects meeting MS4 permit requirements',
            'Developed air quality dispersion models for 8 industrial clients ensuring Clean Air Act compliance',
          ],
        },
      ],
      education: [
        {
          institution: 'University of California, Davis',
          degree: 'Bachelor of Science',
          field: 'Environmental Engineering',
          startDate: '2013-09',
          endDate: '2017-06',
        },
      ],
      certifications: [
        { name: 'Professional Engineer (PE) — Environmental', issuer: 'NCEES', date: '2021-04' },
        { name: '40-Hour HAZWOPER', issuer: 'OSHA', date: '2017-09' },
      ],
    }),
    faqs: [
      {
        question: 'What should an environmental engineer emphasize on their resume?',
        answer:
          'Highlight PE licensure, specific regulations you work with (EPA, NEPA, RCRA, Clean Water Act), project types (remediation, water treatment, EIA), and design software. Quantify project budgets, pollutant reduction percentages, and compliance track records.',
      },
      {
        question: 'Is field work experience important for environmental engineering resumes?',
        answer:
          'Yes. Mention soil/groundwater sampling, site assessments, field investigations, and HAZWOPER certification. Employers value engineers who can combine office design work with field experience.',
      },
      {
        question: 'How do I show regulatory expertise on my resume?',
        answer:
          'List specific regulations and standards you have worked with (EPA, NEPA, RCRA, CWA, CAA). Describe permitting experience, compliance audits, and any enforcement actions you helped clients navigate or prevent.',
      },
    ],
  },

  // ─── 31. ERP Consultant ────────────────────────────────────────────
  {
    slug: 'erp-consultant',
    title: 'ERP Consultant',
    templateStyle: 'regular',
    keywords: [
      'erp consultant resume example',
      'sap consultant resume',
      'erp consultant resume template',
      'erp functional consultant resume',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 2400,
    topSkills: [
      'SAP / Oracle EBS / Microsoft Dynamics',
      'Business Process Analysis',
      'Requirements Gathering',
      'ERP Implementation & Configuration',
      'Data Migration',
      'User Training & Change Management',
      'Gap Analysis',
      'Integration Design',
      'Project Management',
      'SQL',
    ],
    atsKeywords: [
      'ERP',
      'SAP',
      'Oracle EBS',
      'Dynamics 365',
      'implementation',
      'configuration',
      'business process',
      'requirements gathering',
      'data migration',
      'change management',
      'gap analysis',
      'functional consultant',
      'integration',
      'user training',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Catherine',
      lastName: 'Dubois',
      profession: 'ERP Consultant',
      summary:
        'ERP Consultant with 8 years of experience leading SAP and Dynamics 365 implementations across manufacturing, distribution, and finance. Adept at translating business requirements into system configurations and managing full-lifecycle ERP deployments.',
      skills: [
        'SAP S/4HANA',
        'Dynamics 365 F&O',
        'Business Process Mapping',
        'Data Migration',
        'Requirements Gathering',
        'SQL',
        'Change Management',
        'Project Management',
      ],
      experience: [
        {
          title: 'Senior ERP Consultant',
          company: 'Deloitte Consulting',
          startDate: '2020-04',
          isCurrent: true,
          achievements: [
            'Led SAP S/4HANA implementation for $3B manufacturing company, delivering on-time with 98% user adoption within 3 months',
            'Configured and tested 150+ business processes across MM, PP, SD, and FI/CO modules',
            'Managed data migration of 8M+ master data records from legacy system with 99.6% accuracy',
            'Trained 400+ end users across 12 facilities through structured change management program',
          ],
        },
        {
          title: 'ERP Consultant',
          company: 'BlueRock Systems',
          startDate: '2016-09',
          endDate: '2020-03',
          achievements: [
            'Implemented Dynamics 365 Finance & Operations for 5 mid-market clients in distribution and retail',
            'Conducted gap analysis workshops resulting in 200+ requirements documents and solution designs',
            'Developed custom SSRS reports and Power BI dashboards for ERP analytics post-go-live',
          ],
        },
      ],
      education: [
        {
          institution: 'Boston University',
          degree: 'Bachelor of Science',
          field: 'Business Administration — Information Systems',
          startDate: '2012-09',
          endDate: '2016-05',
        },
      ],
      certifications: [
        { name: 'SAP Certified Application Associate — SAP S/4HANA', issuer: 'SAP', date: '2021-08' },
        { name: 'PMP', issuer: 'PMI', date: '2022-02' },
      ],
    }),
    faqs: [
      {
        question: 'What ERP platforms should I highlight on my resume?',
        answer:
          'Focus on the platforms relevant to your target roles: SAP (S/4HANA, ECC), Oracle (EBS, Cloud), Microsoft Dynamics (365 F&O, Business Central), or Workday. Specify modules, versions, and your role (functional, technical, or both).',
      },
      {
        question: 'How do I demonstrate implementation experience?',
        answer:
          'Describe the full lifecycle: requirements gathering, gap analysis, configuration, testing, data migration, training, and go-live. Include company size, number of users, modules implemented, and post-go-live adoption metrics.',
      },
      {
        question: 'Is project management important for ERP consultants?',
        answer:
          'Yes. ERP implementations are large, complex projects. PMP or PRINCE2 certification, combined with experience managing timelines, budgets, and stakeholders, significantly strengthens your resume.',
      },
    ],
  },

  // ─── 32. ERP Developer ────────────────────────────────────────────
  {
    slug: 'erp-developer',
    title: 'ERP Developer',
    templateStyle: 'regular',
    keywords: [
      'erp developer resume example',
      'sap abap developer resume',
      'erp developer resume template',
      'erp technical consultant resume',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 1600,
    topSkills: [
      'ABAP / X++ / PL/SQL',
      'SAP / Dynamics / Oracle EBS',
      'Custom Development & Extensions',
      'Integration (RFC, BAPI, IDoc, OData)',
      'SQL & Database Design',
      'Workflow & Business Rules',
      'API Development',
      'Unit Testing & Debugging',
      'Performance Optimization',
      'Agile / Scrum',
    ],
    atsKeywords: [
      'ERP development',
      'ABAP',
      'X++',
      'SAP',
      'Dynamics 365',
      'Oracle EBS',
      'BAPI',
      'RFC',
      'IDoc',
      'OData',
      'custom development',
      'integration',
      'workflow',
      'performance tuning',
      'Fiori',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Sanjay',
      lastName: 'Mehta',
      profession: 'ERP Developer',
      summary:
        'ERP Developer with 6 years of experience building custom extensions and integrations for SAP and Dynamics 365 platforms. Proficient in ABAP, X++, and API development with a strong focus on performance optimization and clean code practices.',
      skills: [
        'ABAP',
        'SAP S/4HANA',
        'X++',
        'Dynamics 365',
        'OData APIs',
        'BAPI/RFC/IDoc',
        'SQL',
        'SAP Fiori/UI5',
        'Git',
      ],
      experience: [
        {
          title: 'Senior ERP Developer',
          company: 'Synaptic ERP Solutions',
          startDate: '2021-06',
          isCurrent: true,
          achievements: [
            'Developed 40+ custom ABAP programs and enhancements for SAP S/4HANA deployment serving 2,000+ users',
            'Built OData services and SAP Fiori apps modernizing user interfaces for warehouse and procurement workflows',
            'Integrated SAP with 5 external systems via RFC/IDoc interfaces processing 500K+ messages daily',
            'Optimized critical ABAP programs reducing batch processing time from 8 hours to 45 minutes',
          ],
        },
        {
          title: 'ERP Developer',
          company: 'Keystone Manufacturing',
          startDate: '2018-09',
          endDate: '2021-05',
          achievements: [
            'Developed X++ customizations for Dynamics 365 Finance & Operations across 3 legal entities',
            'Created Power Automate and Logic Apps integrations connecting ERP with CRM and e-commerce platforms',
            'Built custom reporting solutions using SSRS and embedded Power BI reducing report development time by 50%',
          ],
        },
      ],
      education: [
        {
          institution: 'Rutgers University',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2014-09',
          endDate: '2018-05',
        },
      ],
      certifications: [
        { name: 'SAP Certified Development Associate — ABAP with SAP NetWeaver', issuer: 'SAP', date: '2020-11' },
      ],
    }),
    faqs: [
      {
        question: 'What programming languages should an ERP developer list?',
        answer:
          'For SAP: ABAP, ABAP OO, SAP UI5/Fiori (JavaScript). For Dynamics 365: X++, C#, TypeScript. For Oracle EBS: PL/SQL, Oracle Forms. List the languages specific to the ERP platform you target and any web development skills for modern UI extensions.',
      },
      {
        question: 'How do I show integration experience on an ERP developer resume?',
        answer:
          'Describe the systems integrated (CRM, e-commerce, WMS), technologies used (RFC, BAPI, IDoc, OData, REST APIs), message volumes, and business processes automated. Integration is a critical ERP development skill.',
      },
      {
        question: 'Should I get SAP certification as an ERP developer?',
        answer:
          'SAP certifications (ABAP, Fiori, integration) are valued and often expected. They validate your platform knowledge and can be the deciding factor between candidates. Keep certifications current as SAP updates its exam content regularly.',
      },
    ],
  },

  // ─── 33. ERP Manager ──────────────────────────────────────────────
  {
    slug: 'erp-manager',
    title: 'ERP Manager',
    templateStyle: 'regular',
    keywords: [
      'erp manager resume example',
      'erp manager resume template',
      'erp project manager resume',
      'erp manager cv',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 1400,
    topSkills: [
      'ERP Implementation Management',
      'SAP / Oracle / Dynamics 365',
      'Team Leadership',
      'Budget & Resource Management',
      'Stakeholder Communication',
      'Vendor Management',
      'Change Management',
      'Business Process Optimization',
      'Risk Management',
      'IT Strategy',
    ],
    atsKeywords: [
      'ERP management',
      'SAP',
      'Oracle',
      'Dynamics 365',
      'implementation',
      'project management',
      'team leadership',
      'budget management',
      'stakeholder communication',
      'vendor management',
      'change management',
      'business process',
      'IT governance',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Patricia',
      lastName: 'Gonzalez',
      profession: 'ERP Manager',
      summary:
        'ERP Manager with 10+ years of experience leading enterprise resource planning implementations and managing ERP operations teams. Expert in SAP and Dynamics 365 with a track record of delivering complex projects on time and under budget while driving user adoption.',
      skills: [
        'SAP S/4HANA',
        'Dynamics 365',
        'Project Management',
        'Team Leadership',
        'Budget Management',
        'Change Management',
        'Vendor Management',
        'Business Process Optimization',
      ],
      experience: [
        {
          title: 'ERP Manager',
          company: 'Summit Manufacturing Group',
          startDate: '2019-07',
          isCurrent: true,
          achievements: [
            'Managed SAP S/4HANA implementation across 8 plants with $18M budget, completing 10% under budget and on schedule',
            'Led ERP operations team of 15 functional and technical consultants supporting 3,500+ users globally',
            'Drove 95% user adoption within 6 months of go-live through comprehensive change management and training programs',
            'Reduced ERP-related support tickets by 45% through process standardization and self-service portal implementation',
          ],
        },
        {
          title: 'Senior ERP Project Manager',
          company: 'Accenture',
          startDate: '2014-03',
          endDate: '2019-06',
          achievements: [
            'Delivered 6 ERP implementations (SAP and Dynamics) for clients ranging from $500M to $5B in revenue',
            'Managed cross-functional teams of up to 40 consultants across onshore and offshore locations',
            'Negotiated vendor contracts saving clients an average of 15% on licensing and implementation costs',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Pennsylvania',
          degree: 'MBA',
          field: 'Information Technology Management',
          startDate: '2012-08',
          endDate: '2014-05',
        },
        {
          institution: 'Florida State University',
          degree: 'Bachelor of Science',
          field: 'Information Systems',
          startDate: '2006-08',
          endDate: '2010-05',
        },
      ],
      certifications: [
        { name: 'PMP', issuer: 'PMI', date: '2015-06' },
        { name: 'SAP Certified Project Manager', issuer: 'SAP', date: '2020-01' },
      ],
    }),
    faqs: [
      {
        question: 'What should an ERP manager resume emphasize?',
        answer:
          'Focus on leadership: team sizes managed, project budgets, go-live successes, user adoption rates, and business outcomes. Include ERP platforms (SAP, Oracle, Dynamics), methodology experience (Activate, Sure Step), and change management skills.',
      },
      {
        question: 'How do I show ROI from ERP projects on my resume?',
        answer:
          'Include budget adherence, cost savings from process optimization, reduction in operational costs, user productivity improvements, and time savings. For example, "Delivered $18M SAP implementation 10% under budget with 95% user adoption."',
      },
      {
        question: 'Is PMP certification important for ERP managers?',
        answer:
          'Highly recommended. PMP is the gold standard for project management certification. Combining PMP with ERP platform certifications demonstrates both management capability and technical understanding.',
      },
    ],
  },

  // ─── 34. ETL Developer ────────────────────────────────────────────
  {
    slug: 'etl-developer',
    title: 'ETL Developer',
    templateStyle: 'regular',
    keywords: [
      'etl developer resume example',
      'etl developer resume template',
      'etl developer resume format',
      'etl developer cv',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 2100,
    topSkills: [
      'SSIS / Informatica / Talend',
      'SQL (Advanced)',
      'Data Warehousing',
      'Python',
      'Apache Airflow / dbt',
      'Data Quality & Validation',
      'Cloud ETL (AWS Glue, Azure Data Factory)',
      'Scheduling & Orchestration',
      'Data Modeling',
      'Performance Tuning',
    ],
    atsKeywords: [
      'ETL',
      'SSIS',
      'Informatica',
      'Talend',
      'SQL',
      'data warehouse',
      'data pipeline',
      'Airflow',
      'dbt',
      'AWS Glue',
      'Azure Data Factory',
      'data quality',
      'data modeling',
      'scheduling',
      'performance tuning',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Nathan',
      lastName: 'Powell',
      profession: 'ETL Developer',
      summary:
        'ETL Developer with 5+ years of experience designing and maintaining data pipelines using SSIS, Informatica, and cloud-based tools. Skilled in SQL, data warehousing, and building reliable, high-performance data flows that power analytics and reporting.',
      skills: [
        'SSIS',
        'Informatica PowerCenter',
        'SQL',
        'Python',
        'Azure Data Factory',
        'Data Warehousing',
        'dbt',
        'Apache Airflow',
        'Data Quality',
      ],
      experience: [
        {
          title: 'Senior ETL Developer',
          company: 'DataBridge Analytics',
          startDate: '2021-08',
          isCurrent: true,
          achievements: [
            'Designed and maintained 100+ ETL packages in SSIS processing 50M+ records nightly with 99.9% success rate',
            'Migrated on-premises ETL workflows to Azure Data Factory, reducing processing time by 55% and infrastructure costs by 40%',
            'Implemented data quality framework catching 98% of data anomalies before they reached the warehouse',
            'Built incremental load patterns replacing full refreshes, reducing ETL window from 6 hours to 45 minutes',
          ],
        },
        {
          title: 'ETL Developer',
          company: 'National Healthcare Data Corp.',
          startDate: '2019-01',
          endDate: '2021-07',
          achievements: [
            'Developed Informatica PowerCenter mappings for HIPAA-compliant data warehouse loading 200+ source tables',
            'Created automated data validation scripts in Python identifying and flagging 15,000+ data quality issues monthly',
            'Optimized slow-running ETL jobs, achieving 70% improvement in nightly batch completion time',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Pittsburgh',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2015-08',
          endDate: '2019-05',
        },
      ],
      certifications: [
        { name: 'Microsoft Certified: Azure Data Engineer Associate', issuer: 'Microsoft', date: '2022-09' },
      ],
    }),
    faqs: [
      {
        question: 'What should an ETL developer highlight on their resume?',
        answer:
          'Emphasize ETL tools (SSIS, Informatica, Talend, ADF), SQL expertise, data volumes processed, performance optimizations, and data quality practices. Mention both traditional ETL and modern ELT approaches with cloud tools.',
      },
      {
        question: 'Is cloud ETL experience important?',
        answer:
          'Yes. Companies are migrating to cloud-based ETL tools (Azure Data Factory, AWS Glue, GCP Dataflow). Experience with both traditional (SSIS, Informatica) and modern cloud tools makes you more marketable.',
      },
      {
        question: 'How do I show ETL performance optimization skills?',
        answer:
          'Include before/after metrics: processing time reductions, record throughput improvements, incremental vs full load optimizations. For example, "Reduced nightly ETL window from 6 hours to 45 minutes through incremental loading patterns."',
      },
    ],
  },

  // ─── 35. Field Engineer ────────────────────────────────────────────
  {
    slug: 'field-engineer',
    title: 'Field Engineer',
    templateStyle: 'regular',
    keywords: [
      'field engineer resume example',
      'field engineer resume template',
      'field service engineer resume',
      'field engineer cv',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 2800,
    topSkills: [
      'Equipment Installation & Commissioning',
      'Troubleshooting & Repair',
      'Preventive Maintenance',
      'Technical Documentation',
      'Customer Communication',
      'Networking (TCP/IP, VPN)',
      'Electrical/Mechanical Systems',
      'Safety Compliance (OSHA)',
      'Inventory Management',
      'Travel & Time Management',
    ],
    atsKeywords: [
      'field engineering',
      'installation',
      'commissioning',
      'troubleshooting',
      'preventive maintenance',
      'customer service',
      'technical support',
      'networking',
      'OSHA',
      'safety compliance',
      'equipment repair',
      'documentation',
      'field service',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Brandon',
      lastName: 'Reeves',
      profession: 'Field Engineer',
      summary:
        'Field Engineer with 6 years of experience installing, commissioning, and maintaining complex equipment across industrial and commercial sites. Strong troubleshooting skills with a commitment to safety and customer satisfaction in high-pressure environments.',
      skills: [
        'Equipment Installation',
        'Troubleshooting',
        'Preventive Maintenance',
        'Networking (TCP/IP)',
        'Electrical Systems',
        'Technical Documentation',
        'OSHA Compliance',
        'Customer Service',
      ],
      experience: [
        {
          title: 'Senior Field Engineer',
          company: 'PrecisionTech Industrial',
          startDate: '2021-05',
          isCurrent: true,
          achievements: [
            'Installed and commissioned 200+ industrial equipment systems across 15 states with 99% first-time success rate',
            'Resolved critical equipment failures within 4-hour SLA, maintaining 98% customer satisfaction rating',
            'Trained 50+ customer technicians on equipment operation and preventive maintenance procedures',
            'Reduced return service calls by 30% through improved installation documentation and training materials',
          ],
        },
        {
          title: 'Field Service Engineer',
          company: 'Datacom Network Solutions',
          startDate: '2018-03',
          endDate: '2021-04',
          achievements: [
            'Performed installation and maintenance of enterprise networking equipment at 100+ customer sites annually',
            'Diagnosed and resolved network connectivity issues with average resolution time of 2.5 hours',
            'Maintained inventory of $500K+ in spare parts and test equipment with zero discrepancies',
          ],
        },
      ],
      education: [
        {
          institution: 'Texas A&M University',
          degree: 'Bachelor of Science',
          field: 'Electrical Engineering Technology',
          startDate: '2014-08',
          endDate: '2018-05',
        },
      ],
      certifications: [
        { name: 'CompTIA Network+', issuer: 'CompTIA', date: '2019-06' },
        { name: 'OSHA 10-Hour Construction Safety', issuer: 'OSHA', date: '2018-09' },
      ],
    }),
    faqs: [
      {
        question: 'What should a field engineer put on their resume?',
        answer:
          'Highlight equipment types serviced, installation success rates, troubleshooting skills, customer satisfaction metrics, and travel willingness. Include safety certifications and any technical certifications relevant to the equipment you work with.',
      },
      {
        question: 'How do I show customer service skills on a technical resume?',
        answer:
          'Include customer satisfaction scores, training delivered, communication of complex technical issues to non-technical audiences, and relationship management. Field engineers are the face of the company, so these skills matter.',
      },
      {
        question: 'Should I mention travel on my field engineer resume?',
        answer:
          'Yes. State your travel percentage and geographic coverage. Many field engineer roles require significant travel, and showing you are experienced with and willing to travel is a positive signal.',
      },
    ],
  },

  // ─── 36. FPGA Engineer ────────────────────────────────────────────
  {
    slug: 'fpga-engineer',
    title: 'FPGA Engineer',
    templateStyle: 'regular',
    keywords: [
      'fpga engineer resume example',
      'fpga engineer resume template',
      'fpga developer resume',
      'fpga design engineer resume',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 1200,
    topSkills: [
      'Verilog / SystemVerilog',
      'VHDL',
      'Xilinx Vivado / Intel Quartus',
      'RTL Design & Synthesis',
      'Timing Closure',
      'Simulation & Verification (UVM)',
      'High-Speed Interfaces (PCIe, DDR, Ethernet)',
      'Embedded Processors (MicroBlaze, NIOS)',
      'Signal Processing (DSP)',
      'Version Control & CI for Hardware',
    ],
    atsKeywords: [
      'FPGA',
      'Verilog',
      'SystemVerilog',
      'VHDL',
      'Xilinx',
      'Intel',
      'Vivado',
      'Quartus',
      'RTL design',
      'synthesis',
      'timing closure',
      'UVM',
      'PCIe',
      'DDR',
      'DSP',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Lucas',
      lastName: 'Grant',
      profession: 'FPGA Engineer',
      summary:
        'FPGA Engineer with 6 years of experience in RTL design, verification, and synthesis for high-performance applications in defense and telecommunications. Expert in Verilog/SystemVerilog, Xilinx Vivado, and UVM-based verification methodologies.',
      skills: [
        'Verilog',
        'SystemVerilog',
        'VHDL',
        'Xilinx Vivado',
        'Intel Quartus',
        'UVM',
        'RTL Design',
        'Timing Analysis',
        'PCIe',
        'DSP',
      ],
      experience: [
        {
          title: 'Senior FPGA Engineer',
          company: 'Spectra Defense Technologies',
          startDate: '2021-09',
          isCurrent: true,
          achievements: [
            'Designed high-throughput signal processing FPGA firmware processing 40 Gbps data streams on Xilinx UltraScale+',
            'Achieved timing closure at 500 MHz on complex designs with 85% resource utilization',
            'Built UVM verification environment with 95% functional coverage for PCIe Gen4 interface IP',
            'Led FPGA architecture reviews for 3 defense programs with combined budget of $25M',
          ],
        },
        {
          title: 'FPGA Design Engineer',
          company: 'Wavelink Communications',
          startDate: '2018-06',
          endDate: '2021-08',
          achievements: [
            'Developed FPGA-based 5G baseband processing modules handling 100 MHz carrier bandwidth',
            'Designed DDR4 memory controller interface achieving 2400 MT/s throughput',
            'Reduced design synthesis time by 40% through modular RTL architecture and parameterized IP blocks',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Southern California',
          degree: 'Master of Science',
          field: 'Electrical Engineering — VLSI Design',
          startDate: '2016-08',
          endDate: '2018-05',
        },
        {
          institution: 'UC Santa Barbara',
          degree: 'Bachelor of Science',
          field: 'Electrical Engineering',
          startDate: '2012-09',
          endDate: '2016-06',
        },
      ],
      certifications: [
        { name: 'Xilinx Certified FPGA Design Professional', issuer: 'AMD/Xilinx', date: '2022-04' },
      ],
    }),
    faqs: [
      {
        question: 'What should an FPGA engineer highlight on their resume?',
        answer:
          'Focus on HDL languages (Verilog, SystemVerilog, VHDL), FPGA families and tools (Xilinx Vivado, Intel Quartus), verification methodology (UVM), and high-speed interfaces (PCIe, DDR, Ethernet). Include clock speeds, data throughput, and resource utilization metrics.',
      },
      {
        question: 'How do I demonstrate verification skills?',
        answer:
          'Describe your verification methodology (UVM, constrained random, formal verification), coverage metrics achieved, and types of testbenches built. Verification is often the longest phase of FPGA development, so this skill is highly valued.',
      },
      {
        question: 'Is software experience useful on an FPGA engineer resume?',
        answer:
          'Yes. Embedded software (C/C++ for soft processors like MicroBlaze/NIOS), Python scripting for automation, and familiarity with CI/CD for hardware builds all add value. Many FPGA roles require hardware-software co-design.',
      },
    ],
  },

  // ─── 37. Frontend Developer ────────────────────────────────────────
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    templateStyle: 'regular',
    keywords: [
      'frontend developer resume example',
      'front end developer resume template',
      'frontend developer resume format',
      'frontend developer cv',
    ],
    searchIntents: ['Example', 'Template', 'Skills'],
    totalMonthlySearches: 8800,
    topSkills: [
      'React / Vue / Angular',
      'TypeScript',
      'HTML5 & CSS3',
      'Responsive Design',
      'State Management (Redux, Zustand)',
      'REST & GraphQL APIs',
      'Testing (Jest, Cypress)',
      'Webpack / Vite',
      'Accessibility (WCAG)',
      'Git & CI/CD',
    ],
    atsKeywords: [
      'frontend development',
      'React',
      'Vue',
      'Angular',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'responsive design',
      'REST API',
      'GraphQL',
      'testing',
      'webpack',
      'accessibility',
      'performance optimization',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Megan',
      lastName: 'Foster',
      profession: 'Frontend Developer',
      summary:
        'Frontend Developer with 6 years of experience building responsive, accessible web applications using React and TypeScript. Passionate about user experience, performance optimization, and creating component libraries that accelerate development across teams.',
      skills: [
        'React',
        'TypeScript',
        'Next.js',
        'HTML5/CSS3',
        'Tailwind CSS',
        'Redux',
        'Jest/Cypress',
        'GraphQL',
        'Vite',
        'Git',
      ],
      experience: [
        {
          title: 'Senior Frontend Developer',
          company: 'Petal Design Systems',
          startDate: '2021-03',
          isCurrent: true,
          achievements: [
            'Built and maintained design system library with 60+ React components used across 5 product teams, reducing UI development time by 50%',
            'Improved Core Web Vitals: LCP from 4.2s to 1.8s, CLS from 0.25 to 0.02, achieving "Good" rating on all pages',
            'Led migration from Create React App to Next.js with SSR, improving SEO organic traffic by 120%',
            'Achieved WCAG 2.1 AA compliance across the entire product suite, expanding accessible user base by 15%',
          ],
        },
        {
          title: 'Frontend Developer',
          company: 'RapidShop E-Commerce',
          startDate: '2018-06',
          endDate: '2021-02',
          achievements: [
            'Developed responsive product catalog and checkout flow handling 200K+ monthly visitors',
            'Implemented GraphQL client layer reducing API calls by 40% and improving page load performance',
            'Built real-time inventory dashboard with WebSockets displaying stock levels across 8 warehouses',
          ],
        },
      ],
      education: [
        {
          institution: 'University of California, Irvine',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2014-09',
          endDate: '2018-06',
        },
      ],
      certifications: [],
    }),
    faqs: [
      {
        question: 'What framework should I feature on my frontend developer resume?',
        answer:
          'Feature the framework(s) matching the job description. React dominates the market, but Vue and Angular have strong demand. List your primary framework prominently and mention familiarity with others. Framework-agnostic skills (TypeScript, testing, accessibility) are universally valued.',
      },
      {
        question: 'How do I demonstrate performance optimization skills?',
        answer:
          'Include Core Web Vitals improvements (LCP, FID, CLS), bundle size reductions, load time improvements, and specific techniques used (code splitting, lazy loading, SSR). Use before/after metrics.',
      },
      {
        question: 'Is accessibility experience important for frontend developers?',
        answer:
          'Increasingly essential. Many companies are required to meet WCAG standards. Highlight WCAG compliance, screen reader testing, keyboard navigation, and ARIA attribute expertise. It differentiates you from candidates who only focus on visual design.',
      },
    ],
  },

  // ─── 38. Full Stack Developer ──────────────────────────────────────
  {
    slug: 'full-stack-developer',
    title: 'Full Stack Developer',
    templateStyle: 'regular',
    keywords: [
      'full stack developer resume example',
      'full stack developer resume template',
      'fullstack developer resume',
      'full stack developer cv',
    ],
    searchIntents: ['Example', 'Template', 'Skills'],
    totalMonthlySearches: 9200,
    topSkills: [
      'React / Vue / Angular',
      'Node.js / Python / Java',
      'TypeScript',
      'SQL & NoSQL Databases',
      'REST & GraphQL APIs',
      'Docker & Cloud (AWS/Azure)',
      'CI/CD Pipelines',
      'Authentication & Security',
      'Testing (Unit, Integration, E2E)',
      'System Design',
    ],
    atsKeywords: [
      'full stack development',
      'React',
      'Node.js',
      'TypeScript',
      'JavaScript',
      'Python',
      'SQL',
      'MongoDB',
      'REST API',
      'GraphQL',
      'Docker',
      'AWS',
      'CI/CD',
      'responsive design',
      'microservices',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Jason',
      lastName: 'Huang',
      profession: 'Full Stack Developer',
      summary:
        'Full Stack Developer with 7 years of experience building end-to-end web applications with React, Node.js, and TypeScript. Adept at designing scalable architectures, optimizing database performance, and delivering features from concept to production deployment.',
      skills: [
        'React',
        'Node.js',
        'TypeScript',
        'PostgreSQL',
        'MongoDB',
        'GraphQL',
        'Docker',
        'AWS',
        'Jest/Cypress',
        'Redis',
      ],
      experience: [
        {
          title: 'Senior Full Stack Developer',
          company: 'Elevate SaaS Inc.',
          startDate: '2021-05',
          isCurrent: true,
          achievements: [
            'Architected and built SaaS platform from ground up serving 500+ B2B clients with $5M ARR',
            'Developed real-time collaboration features using WebSockets supporting 10K+ concurrent users',
            'Designed PostgreSQL schema and query layer handling 100M+ rows with sub-50ms response times',
            'Implemented multi-tenant architecture with row-level security and per-tenant customization engine',
          ],
        },
        {
          title: 'Full Stack Developer',
          company: 'Kinetic Marketing Technologies',
          startDate: '2017-09',
          endDate: '2021-04',
          achievements: [
            'Built marketing automation platform with React frontend and Node.js API serving 50K+ monthly active users',
            'Integrated with 15+ third-party APIs (Stripe, Twilio, SendGrid) for payments, messaging, and notifications',
            'Reduced page load time by 65% through SSR implementation, image optimization, and CDN configuration',
          ],
        },
      ],
      education: [
        {
          institution: 'University of California, Los Angeles',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2013-09',
          endDate: '2017-06',
        },
      ],
      certifications: [
        { name: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services', date: '2022-03' },
      ],
    }),
    faqs: [
      {
        question: 'Should I list both frontend and backend skills equally?',
        answer:
          'Tailor the emphasis based on the job description. Some "full stack" roles lean frontend, others backend. List your stronger stack first but ensure both sides are well-represented with specific technologies, not just general terms.',
      },
      {
        question: 'How do I show end-to-end ownership on my resume?',
        answer:
          'Describe projects where you handled the complete stack: UI development, API design, database architecture, deployment, and monitoring. Use phrases like "architected and built from ground up" and "delivered end-to-end."',
      },
      {
        question: 'Is DevOps experience valuable for full stack developers?',
        answer:
          'Yes. Modern full stack developers are expected to handle deployment, CI/CD, containerization, and basic cloud infrastructure. Including Docker, AWS/Azure, and CI/CD experience shows you can own the entire application lifecycle.',
      },
    ],
  },

  // ─── 39. Game Designer ─────────────────────────────────────────────
  {
    slug: 'game-designer',
    title: 'Game Designer',
    templateStyle: 'creative',
    keywords: [
      'game designer resume example',
      'game designer resume template',
      'video game designer resume',
      'game design resume format',
    ],
    searchIntents: ['Example', 'Template', 'Portfolio'],
    totalMonthlySearches: 3800,
    topSkills: [
      'Game Mechanics Design',
      'Level Design',
      'Narrative Design',
      'Unity / Unreal Engine',
      'Prototyping & Playtesting',
      'Balancing & Economy Systems',
      'Player Psychology & UX',
      'Documentation (GDD)',
      'Scripting (C#, Blueprints, Lua)',
      'Cross-Functional Collaboration',
    ],
    atsKeywords: [
      'game design',
      'game mechanics',
      'level design',
      'narrative design',
      'Unity',
      'Unreal Engine',
      'prototyping',
      'playtesting',
      'game balance',
      'economy design',
      'player experience',
      'GDD',
      'C#',
      'Blueprints',
      'Lua',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Zoe',
      lastName: 'Whitman',
      profession: 'Game Designer',
      summary:
        'Game Designer with 5+ years of experience creating engaging game mechanics, balanced economy systems, and compelling player experiences. Shipped 3 titles across mobile and PC platforms with combined downloads exceeding 10 million.',
      skills: [
        'Game Mechanics Design',
        'Level Design',
        'Unity (C#)',
        'Unreal Blueprints',
        'Prototyping',
        'Playtesting',
        'Game Balance',
        'Documentation (GDD)',
      ],
      experience: [
        {
          title: 'Senior Game Designer',
          company: 'Mythic Games Studio',
          startDate: '2022-01',
          isCurrent: true,
          achievements: [
            'Designed core gameplay loop and progression system for action RPG with 2M+ downloads in first month',
            'Created 40+ levels with dynamic difficulty adjustment that improved player retention by 28% at Day 7',
            'Led balancing for in-game economy with 50+ items, maintaining healthy monetization with 4.5+ app store rating',
            'Conducted 100+ playtesting sessions and iterated on designs based on quantitative player behavior data',
          ],
        },
        {
          title: 'Game Designer',
          company: 'PixelForge Interactive',
          startDate: '2019-04',
          endDate: '2021-12',
          achievements: [
            'Designed puzzle mechanics for mobile game achieving 8M+ lifetime downloads and Top 50 in Puzzle category',
            'Authored 200+ page Game Design Document with detailed systems, UI flows, and narrative branching',
            'Prototyped 15+ game concepts in Unity, leading to 3 green-lit productions',
          ],
        },
      ],
      education: [
        {
          institution: 'DigiPen Institute of Technology',
          degree: 'Bachelor of Arts',
          field: 'Game Design',
          startDate: '2015-09',
          endDate: '2019-05',
        },
      ],
      certifications: [],
    }),
    faqs: [
      {
        question: 'Should I include a portfolio link on my game designer resume?',
        answer:
          'Absolutely. A portfolio is essential for game designers. Include links to playable prototypes, design documents, gameplay videos, and shipped titles. Your portfolio often matters more than your resume in the games industry.',
      },
      {
        question: 'What metrics should game designers include on their resume?',
        answer:
          'Include download numbers, player retention rates (Day 1, Day 7, Day 30), session length, monetization metrics, app store ratings, and engagement data. These prove that your designs create positive player experiences.',
      },
      {
        question: 'Is coding experience important for game designers?',
        answer:
          'Scripting ability (C#, Lua, Blueprints) is highly valued as it lets you prototype independently. You do not need to be a programmer, but demonstrating enough technical skill to implement and test your own designs is a significant advantage.',
      },
    ],
  },

  // ─── 40. Game Developer ────────────────────────────────────────────
  {
    slug: 'game-developer',
    title: 'Game Developer',
    templateStyle: 'regular',
    keywords: [
      'game developer resume example',
      'game developer resume template',
      'game programmer resume',
      'video game developer resume',
    ],
    searchIntents: ['Example', 'Template', 'Skills'],
    totalMonthlySearches: 4600,
    topSkills: [
      'C++ / C#',
      'Unity / Unreal Engine',
      'Graphics Programming (OpenGL, Vulkan, DirectX)',
      'Physics Simulation',
      'Game AI',
      'Multiplayer Networking',
      'Performance Optimization',
      'Version Control (Git, Perforce)',
      'Shader Programming (HLSL, GLSL)',
      'Cross-Platform Development',
    ],
    atsKeywords: [
      'game development',
      'C++',
      'C#',
      'Unity',
      'Unreal Engine',
      'graphics programming',
      'OpenGL',
      'Vulkan',
      'DirectX',
      'game AI',
      'multiplayer',
      'networking',
      'physics',
      'shaders',
      'optimization',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Tyler',
      lastName: 'Nakamura',
      profession: 'Game Developer',
      summary:
        'Game Developer with 6 years of experience programming gameplay systems, graphics pipelines, and multiplayer networking in C++ and C#. Shipped 4 commercial titles across PC, console, and mobile platforms using Unity and Unreal Engine.',
      skills: [
        'C++',
        'C#',
        'Unreal Engine 5',
        'Unity',
        'DirectX 12',
        'Multiplayer Networking',
        'Game AI',
        'Shader Programming',
        'Perforce',
        'Git',
      ],
      experience: [
        {
          title: 'Senior Game Programmer',
          company: 'Iron Gate Studios',
          startDate: '2021-07',
          isCurrent: true,
          achievements: [
            'Developed core combat system in C++ for AAA action game with 500K+ copies sold in first quarter',
            'Optimized rendering pipeline achieving stable 60 FPS on PS5 and Xbox Series X with ray-traced global illumination',
            'Implemented authoritative multiplayer networking supporting 64-player sessions with <50ms latency',
            'Built procedural terrain generation system creating 100+ km² explorable environments',
          ],
        },
        {
          title: 'Game Developer',
          company: 'Starlight Interactive',
          startDate: '2018-09',
          endDate: '2021-06',
          achievements: [
            'Programmed AI behavior trees for 20+ enemy types with emergent combat tactics',
            'Developed custom physics system for vehicle simulation with realistic suspension and tire models',
            'Created shader effects (water, volumetric fog, dynamic weather) using HLSL in Unity URP pipeline',
          ],
        },
      ],
      education: [
        {
          institution: 'Rochester Institute of Technology',
          degree: 'Bachelor of Science',
          field: 'Game Design and Development',
          startDate: '2014-08',
          endDate: '2018-05',
        },
      ],
      certifications: [],
    }),
    faqs: [
      {
        question: 'What programming languages should game developers list?',
        answer:
          'C++ is the industry standard for console/PC game development. C# is essential for Unity. Also mention scripting languages (Lua, Python), shader languages (HLSL, GLSL), and any engine-specific languages (Blueprints for Unreal).',
      },
      {
        question: 'Should I include shipped titles on my game developer resume?',
        answer:
          'Yes. Shipped titles are the strongest proof of your ability to deliver. Include the title, platform, your role, and any sales or reception metrics. Link to store pages where possible.',
      },
      {
        question: 'How do I stand out as a game developer?',
        answer:
          'Specialize and demonstrate depth: graphics programming, AI, networking, physics, or tools development. Include a portfolio with code samples, technical blog posts, or game jam entries. Specificity beats generality in game development hiring.',
      },
    ],
  },

  // ─── 41. Geotechnical Engineer ─────────────────────────────────────
  {
    slug: 'geotechnical-engineer',
    title: 'Geotechnical Engineer',
    templateStyle: 'regular',
    keywords: [
      'geotechnical engineer resume example',
      'geotechnical engineer resume template',
      'geotech engineer resume',
      'geotechnical engineer cv',
    ],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 1800,
    topSkills: [
      'Geotechnical Investigations',
      'Foundation Design',
      'Slope Stability Analysis',
      'Soil Mechanics',
      'GeoStudio / PLAXIS / SLOPE/W',
      'Laboratory Testing',
      'Retaining Wall Design',
      'Seismic Analysis',
      'Report Writing',
      'AutoCAD / Civil 3D',
    ],
    atsKeywords: [
      'geotechnical engineering',
      'foundation design',
      'slope stability',
      'soil mechanics',
      'geotechnical investigation',
      'PLAXIS',
      'GeoStudio',
      'retaining wall',
      'seismic analysis',
      'laboratory testing',
      'boring logs',
      'SPT',
      'CPT',
      'PE license',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Angela',
      lastName: 'Reed',
      profession: 'Geotechnical Engineer',
      summary:
        'Licensed Geotechnical Engineer (PE) with 7 years of experience in subsurface investigations, foundation design, and slope stability analysis. Skilled in geotechnical software, laboratory testing, and providing engineering recommendations for construction projects.',
      skills: [
        'Foundation Design',
        'Slope Stability Analysis',
        'PLAXIS',
        'GeoStudio',
        'AutoCAD',
        'Soil Mechanics',
        'Laboratory Testing',
        'Seismic Analysis',
      ],
      experience: [
        {
          title: 'Senior Geotechnical Engineer',
          company: 'TerraFirm Engineering',
          startDate: '2021-01',
          isCurrent: true,
          achievements: [
            'Led geotechnical investigations for 25+ projects including high-rise foundations, bridges, and dam safety assessments',
            'Designed deep foundation systems (drilled shafts, driven piles) for structures with loads exceeding 5,000 kips',
            'Performed slope stability analyses using SLOPE/W and PLAXIS that informed $15M highway cut design',
            'Supervised field drilling operations and laboratory testing programs generating 200+ geotechnical reports',
          ],
        },
        {
          title: 'Geotechnical Engineer',
          company: 'Bedrock Geosciences',
          startDate: '2017-06',
          endDate: '2020-12',
          achievements: [
            'Conducted 100+ soil boring programs with SPT, CPT, and rock coring for commercial and residential projects',
            'Designed retaining walls and mechanically stabilized earth (MSE) structures saving clients 20% over traditional designs',
            'Performed seismic site classification analyses for 30+ projects in moderate-to-high seismic zones',
          ],
        },
      ],
      education: [
        {
          institution: 'University of California, Berkeley',
          degree: 'Master of Science',
          field: 'Geotechnical Engineering',
          startDate: '2015-08',
          endDate: '2017-05',
        },
        {
          institution: 'University of Arizona',
          degree: 'Bachelor of Science',
          field: 'Civil Engineering',
          startDate: '2011-08',
          endDate: '2015-05',
        },
      ],
      certifications: [
        { name: 'Professional Engineer (PE) — Civil/Geotechnical', issuer: 'NCEES', date: '2021-06' },
      ],
    }),
    faqs: [
      {
        question: 'What should a geotechnical engineer highlight on their resume?',
        answer:
          'Emphasize PE licensure, types of investigations performed (borings, CPT, lab testing), design experience (foundations, slope stability, retaining walls), software proficiency (PLAXIS, GeoStudio, LPILE), and project scale. Include both field and office design work.',
      },
      {
        question: 'Is a master\'s degree important for geotechnical engineering?',
        answer:
          'A master\'s degree in geotechnical engineering is common and often preferred for design-focused roles. It provides deeper knowledge of soil mechanics, foundation engineering, and numerical modeling that undergraduate programs may not cover sufficiently.',
      },
      {
        question: 'How do I describe field work on my geotechnical resume?',
        answer:
          'Describe the types of investigations supervised (SPT borings, CPT soundings, rock coring), laboratory testing (triaxial, consolidation, direct shear), and the scale of programs managed. Field experience is highly valued in geotechnical engineering.',
      },
    ],
  },

  // ─── 42. Google Cloud Engineer ─────────────────────────────────────
  {
    slug: 'google-cloud-engineer',
    title: 'Google Cloud Engineer',
    templateStyle: 'regular',
    keywords: [
      'google cloud engineer resume example',
      'gcp engineer resume template',
      'google cloud platform engineer resume',
      'gcp resume',
    ],
    searchIntents: ['Example', 'Template', 'Skills'],
    totalMonthlySearches: 2400,
    topSkills: [
      'GCP (Compute Engine, GKE, Cloud Functions)',
      'BigQuery',
      'Terraform / Deployment Manager',
      'Kubernetes (GKE)',
      'Cloud IAM & Security',
      'Pub/Sub & Dataflow',
      'Cloud SQL / Spanner / Firestore',
      'CI/CD (Cloud Build)',
      'Monitoring (Cloud Monitoring, Logging)',
      'Python / Go / Bash',
    ],
    atsKeywords: [
      'Google Cloud Platform',
      'GCP',
      'BigQuery',
      'GKE',
      'Kubernetes',
      'Terraform',
      'Cloud Functions',
      'Pub/Sub',
      'Dataflow',
      'Cloud IAM',
      'Cloud Build',
      'Cloud SQL',
      'Spanner',
      'monitoring',
      'infrastructure as code',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Amit',
      lastName: 'Patel',
      profession: 'Google Cloud Engineer',
      summary:
        'Google Cloud Engineer with 5+ years of experience architecting and managing production workloads on GCP. Certified Professional Cloud Architect with deep expertise in BigQuery, GKE, and serverless computing. Focused on cost optimization and reliability.',
      skills: [
        'GCP (Compute, GKE, Cloud Functions)',
        'BigQuery',
        'Terraform',
        'Kubernetes',
        'Pub/Sub',
        'Dataflow',
        'Cloud IAM',
        'Python',
        'Cloud Build',
      ],
      experience: [
        {
          title: 'Senior Google Cloud Engineer',
          company: 'Cloudwise Technologies',
          startDate: '2022-02',
          isCurrent: true,
          achievements: [
            'Architected multi-project GCP infrastructure serving 2M+ users with 99.95% availability SLA',
            'Designed BigQuery analytics platform processing 10TB+ daily with optimized partitioning reducing query costs by 60%',
            'Managed GKE clusters with 300+ pods and auto-scaling policies handling 50K+ requests per second',
            'Implemented infrastructure as code with Terraform managing 500+ GCP resources across 8 projects',
          ],
        },
        {
          title: 'Cloud Engineer',
          company: 'Beacon Data Systems',
          startDate: '2019-06',
          endDate: '2022-01',
          achievements: [
            'Built real-time data pipeline with Pub/Sub and Dataflow processing 5M+ events per hour',
            'Migrated 20+ applications from AWS to GCP, achieving 30% cost reduction and improved latency',
            'Implemented Cloud IAM policies and VPC Service Controls for SOC 2 compliance across the organization',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Texas at Dallas',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2015-08',
          endDate: '2019-05',
        },
      ],
      certifications: [
        { name: 'Google Cloud Professional Cloud Architect', issuer: 'Google Cloud', date: '2022-06' },
        { name: 'Google Cloud Professional Data Engineer', issuer: 'Google Cloud', date: '2023-01' },
      ],
    }),
    faqs: [
      {
        question: 'Which GCP certifications should I list on my resume?',
        answer:
          'Professional Cloud Architect is the most valued general certification. For data-focused roles, Professional Data Engineer is essential. Professional Cloud DevOps Engineer and Professional Cloud Security Engineer are valuable for specialized roles. List all relevant certifications.',
      },
      {
        question: 'How do I show GCP-specific expertise vs general cloud skills?',
        answer:
          'Use GCP service names (BigQuery, GKE, Pub/Sub, Dataflow, Cloud Build) rather than generic terms. Describe GCP-specific architecture patterns and optimizations. This shows you are not just a general cloud engineer relabeling AWS experience.',
      },
      {
        question: 'Is BigQuery experience important for GCP engineers?',
        answer:
          'Yes. BigQuery is one of GCP\'s most popular and powerful services. Experience with BigQuery architecture (partitioning, clustering, materialized views), cost optimization, and integration with other GCP services is highly valued.',
      },
    ],
  },
];
