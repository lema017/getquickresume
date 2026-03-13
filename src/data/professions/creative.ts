import { buildResumeData } from './_helpers';
import type { ProfessionPageData } from './index';

export const professions: ProfessionPageData[] = [
  {
    slug: 'academic-advisor',
    title: 'Academic Advisor',
    templateStyle: 'professional',
    keywords: [
      'academic advisor resume example',
      'college academic advisor resume',
      'university advisor resume template',
      'student affairs advisor resume',
    ],
    searchIntents: [
      'create academic advisor resume',
      'academic advisor resume sample',
      'how to write an academic advisor CV',
    ],
    totalMonthlySearches: 1800,
    topSkills: [
      'Student Counseling',
      'Academic Planning',
      'Degree Auditing',
      'Conflict Resolution',
      'Data Analysis',
      'Retention Strategies',
      'Career Guidance',
      'Curriculum Knowledge',
      'CRM Systems (Banner, PeopleSoft)',
      'Multicultural Competency',
    ],
    atsKeywords: [
      'academic advising',
      'student retention',
      'degree audit',
      'enrollment management',
      'student success',
      'higher education',
      'FERPA compliance',
      'career counseling',
      'student development',
      'advising caseload',
      'graduation planning',
      'academic probation',
      'transfer credit evaluation',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Laura',
      lastName: 'Chambers',
      profession: 'Academic Advisor',
      summary:
        'Dedicated academic advisor with 6+ years of experience guiding diverse student populations through degree planning, course selection, and career preparation. Proven track record of improving retention rates and supporting first-generation college students.',
      skills: [
        'Student Counseling',
        'Academic Planning',
        'Degree Auditing',
        'Conflict Resolution',
        'Data Analysis',
        'Retention Strategies',
        'Career Guidance',
        'Curriculum Knowledge',
        'CRM Systems',
        'Multicultural Competency',
      ],
      experience: [
        {
          title: 'Senior Academic Advisor',
          company: 'University of Michigan',
          startDate: '2021-08',
          isCurrent: true,
          achievements: [
            'Manage a caseload of 350+ undergraduate students, providing individualized degree planning and registration support',
            'Increased student retention rate by 12% through proactive outreach and early-alert intervention programs',
            'Developed a peer-mentoring initiative pairing at-risk freshmen with upperclassmen, resulting in a 20% GPA improvement',
          ],
        },
        {
          title: 'Academic Advisor',
          company: 'Ohio State University',
          startDate: '2018-06',
          endDate: '2021-07',
          achievements: [
            'Advised 280 students per semester on course selection, major/minor declarations, and graduation requirements',
            'Facilitated orientation sessions for incoming students, achieving a 95% satisfaction rating',
            'Collaborated with faculty to resolve academic policy questions and student appeals',
          ],
        },
      ],
      education: [
        {
          institution: 'Indiana University Bloomington',
          degree: 'Master of Science',
          field: 'Higher Education & Student Affairs',
          startDate: '2016-08',
          endDate: '2018-05',
        },
        {
          institution: 'Purdue University',
          degree: 'Bachelor of Arts',
          field: 'Psychology',
          startDate: '2012-08',
          endDate: '2016-05',
        },
      ],
      certifications: [
        { name: 'Master Academic Advisor Certification', issuer: 'NACADA', date: '2022-04' },
      ],
    }),
    faqs: [
      {
        question: 'What should I include on an academic advisor resume?',
        answer:
          'Highlight your advising caseload size, student retention metrics, familiarity with student information systems like Banner or PeopleSoft, and any initiatives that improved student outcomes.',
      },
      {
        question: 'Do academic advisors need certifications?',
        answer:
          'While not always required, a NACADA certification or a master\'s degree in higher education or counseling can significantly strengthen your candidacy.',
      },
      {
        question: 'How do I quantify achievements as an academic advisor?',
        answer:
          'Use metrics such as retention rate improvements, caseload size, student satisfaction scores, and the number of successful degree completions you facilitated.',
      },
    ],
  },

  {
    slug: 'animator',
    title: 'Animator',
    templateStyle: 'creative',
    keywords: [
      'animator resume example',
      '3D animator resume template',
      'motion graphics artist resume',
      'animation portfolio resume',
    ],
    searchIntents: [
      'how to write an animator resume',
      'animator resume with portfolio',
      'entry level animator resume sample',
    ],
    totalMonthlySearches: 2400,
    topSkills: [
      'Character Animation',
      '2D & 3D Animation',
      'Storyboarding',
      'Adobe After Effects',
      'Maya / Blender',
      'Rigging & Skinning',
      'Motion Graphics',
      'Timing & Spacing',
      'Visual Storytelling',
      'Adobe Animate',
      'Unity / Unreal Engine',
    ],
    atsKeywords: [
      'character animation',
      '3D modeling',
      'storyboarding',
      'motion graphics',
      'rigging',
      'keyframe animation',
      'After Effects',
      'Maya',
      'Blender',
      'visual effects',
      'frame-by-frame',
      'animation pipeline',
      'rendering',
      'compositing',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Marcus',
      lastName: 'Vega',
      profession: 'Animator',
      summary:
        'Creative animator with 5 years of experience producing character animations and motion graphics for film, advertising, and gaming studios. Skilled in Maya, Blender, and After Effects with a strong eye for timing, weight, and visual storytelling.',
      skills: [
        'Character Animation',
        '2D & 3D Animation',
        'Storyboarding',
        'Adobe After Effects',
        'Maya',
        'Blender',
        'Rigging & Skinning',
        'Motion Graphics',
        'Timing & Spacing',
        'Visual Storytelling',
      ],
      experience: [
        {
          title: 'Senior Animator',
          company: 'Pixelworks Studios',
          startDate: '2022-03',
          isCurrent: true,
          achievements: [
            'Led character animation for a mobile game that reached 2M+ downloads in its first month',
            'Reduced animation production time by 25% by creating reusable rig templates and motion libraries',
            'Mentored 3 junior animators on principles of weight, anticipation, and follow-through',
          ],
        },
        {
          title: 'Motion Graphics Animator',
          company: 'BrightWave Media',
          startDate: '2019-06',
          endDate: '2022-02',
          achievements: [
            'Produced 60+ explainer videos and advertising spots for clients including Nike and Spotify',
            'Designed dynamic title sequences and lower-thirds for a nationally broadcast documentary series',
            'Collaborated with creative directors to translate storyboards into polished final animations',
          ],
        },
      ],
      education: [
        {
          institution: 'Savannah College of Art and Design',
          degree: 'Bachelor of Fine Arts',
          field: 'Animation',
          startDate: '2015-09',
          endDate: '2019-05',
        },
      ],
    }),
    faqs: [
      {
        question: 'Should I include a portfolio link on my animator resume?',
        answer:
          'Absolutely. Include a link to your demo reel or portfolio website prominently near your contact information. Hiring managers expect to see your work.',
      },
      {
        question: 'What software should an animator list on a resume?',
        answer:
          'List the tools you are proficient in, such as Maya, Blender, After Effects, Cinema 4D, or Toon Boom Harmony, depending on your specialization.',
      },
      {
        question: 'How do I make my animator resume stand out?',
        answer:
          'Focus on measurable outcomes—downloads, views, or awards—and demonstrate versatility across styles (2D, 3D, motion graphics). A strong demo reel paired with a clean resume is the best combination.',
      },
    ],
  },

  {
    slug: 'bartender',
    title: 'Bartender',
    templateStyle: 'regular',
    keywords: [
      'bartender resume example',
      'bartender resume template free',
      'experienced bartender resume',
      'cocktail bartender CV',
    ],
    searchIntents: [
      'bartender resume sample',
      'how to write a bartender resume with no experience',
      'bartender resume skills section',
    ],
    totalMonthlySearches: 6600,
    topSkills: [
      'Mixology',
      'Customer Service',
      'POS Systems',
      'Cash Handling',
      'Speed & Accuracy',
      'Menu Knowledge',
      'Inventory Management',
      'Conflict De-escalation',
      'Upselling Techniques',
      'Food Safety Compliance',
    ],
    atsKeywords: [
      'mixology',
      'cocktail preparation',
      'POS system',
      'cash handling',
      'customer service',
      'bar management',
      'inventory control',
      'upselling',
      'food safety',
      'liquor laws',
      'TIPS certified',
      'beverage program',
      'high-volume bar',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Jake',
      lastName: 'Morrison',
      profession: 'Bartender',
      summary:
        'High-energy bartender with 4+ years of experience in high-volume craft cocktail bars and upscale restaurants. Known for creative drink menus, exceptional guest rapport, and consistent upselling results.',
      skills: [
        'Mixology',
        'Customer Service',
        'POS Systems',
        'Cash Handling',
        'Speed & Accuracy',
        'Menu Knowledge',
        'Inventory Management',
        'Conflict De-escalation',
        'Upselling',
        'Food Safety',
      ],
      experience: [
        {
          title: 'Lead Bartender',
          company: 'The Copper Still',
          startDate: '2022-05',
          isCurrent: true,
          achievements: [
            'Serve 200+ guests per shift in a high-volume craft cocktail bar, maintaining an average pour cost of 18%',
            'Designed a seasonal cocktail menu that increased bar revenue by 15% quarter-over-quarter',
            'Train and supervise 4 bar-back staff, ensuring consistent service standards and inventory accuracy',
          ],
        },
        {
          title: 'Bartender',
          company: 'Riverside Bistro',
          startDate: '2020-03',
          endDate: '2022-04',
          achievements: [
            'Prepared classic and contemporary cocktails for a 120-seat upscale restaurant averaging 300 covers nightly',
            'Managed weekly liquor orders totaling $8K, reducing waste by 10% through precise portioning',
            'Earned a 4.9-star guest satisfaction rating on internal feedback surveys',
          ],
        },
      ],
      education: [
        {
          institution: 'Austin Community College',
          degree: 'Associate of Arts',
          field: 'Hospitality Management',
          startDate: '2018-08',
          endDate: '2020-05',
        },
      ],
      certifications: [
        { name: 'TIPS Certification', issuer: 'Health Communications, Inc.', date: '2020-06' },
        { name: 'ServSafe Food Handler', issuer: 'National Restaurant Association', date: '2020-04' },
      ],
    }),
    faqs: [
      {
        question: 'What skills should a bartender put on a resume?',
        answer:
          'Include mixology, POS system proficiency, cash handling, customer service, inventory management, and any relevant certifications like TIPS or ServSafe.',
      },
      {
        question: 'How do I describe bartending on a resume?',
        answer:
          'Use action verbs and numbers—mention the volume of guests served per shift, pour cost percentages, revenue increases from menu ideas, and any training responsibilities.',
      },
      {
        question: 'Is a bartending certification important for a resume?',
        answer:
          'Yes. Certifications such as TIPS, ServSafe, or state-specific alcohol service permits demonstrate professionalism and compliance knowledge to employers.',
      },
    ],
  },

  {
    slug: 'brand-manager',
    title: 'Brand Manager',
    templateStyle: 'creative',
    keywords: [
      'brand manager resume example',
      'brand management resume template',
      'senior brand manager CV',
      'CPG brand manager resume',
    ],
    searchIntents: [
      'brand manager resume sample',
      'how to write a brand manager resume',
      'brand manager resume with metrics',
    ],
    totalMonthlySearches: 2200,
    topSkills: [
      'Brand Strategy',
      'Market Research',
      'P&L Management',
      'Consumer Insights',
      'Product Launches',
      'Cross-Functional Leadership',
      'Digital Marketing',
      'Budget Management',
      'Competitive Analysis',
      'Creative Brief Development',
    ],
    atsKeywords: [
      'brand strategy',
      'market research',
      'P&L management',
      'product launch',
      'consumer insights',
      'brand equity',
      'market share',
      'go-to-market strategy',
      'CPG',
      'brand positioning',
      'marketing campaigns',
      'ROI analysis',
      'trade marketing',
      'category management',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Nicole',
      lastName: 'Rivera',
      profession: 'Brand Manager',
      summary:
        'Results-driven brand manager with 7 years of experience in CPG and lifestyle brands. Expertise in go-to-market strategy, consumer insights, and P&L ownership delivering consistent double-digit growth.',
      skills: [
        'Brand Strategy',
        'Market Research',
        'P&L Management',
        'Consumer Insights',
        'Product Launches',
        'Cross-Functional Leadership',
        'Digital Marketing',
        'Budget Management',
        'Competitive Analysis',
        'Creative Brief Development',
      ],
      experience: [
        {
          title: 'Senior Brand Manager',
          company: 'Procter & Gamble',
          startDate: '2021-01',
          isCurrent: true,
          achievements: [
            'Manage a $45M portfolio of personal care brands, delivering 14% year-over-year revenue growth',
            'Led a cross-functional product relaunch that captured 3 additional points of market share within 6 months',
            'Developed consumer segmentation strategies using syndicated data from Nielsen and IRI',
          ],
        },
        {
          title: 'Brand Manager',
          company: 'Unilever',
          startDate: '2017-09',
          endDate: '2020-12',
          achievements: [
            'Owned P&L for a $20M skincare line, hitting margin targets 8 consecutive quarters',
            'Launched 4 SKUs in 18 months, coordinating packaging, pricing, and retail distribution across 5,000+ doors',
            'Partnered with creative agencies to produce award-winning campaigns that increased aided brand awareness by 22%',
          ],
        },
      ],
      education: [
        {
          institution: 'Northwestern University – Kellogg School of Management',
          degree: 'Master of Business Administration',
          field: 'Marketing',
          startDate: '2015-09',
          endDate: '2017-06',
        },
        {
          institution: 'University of Florida',
          degree: 'Bachelor of Science',
          field: 'Business Administration',
          startDate: '2011-08',
          endDate: '2015-05',
        },
      ],
    }),
    faqs: [
      {
        question: 'What should a brand manager resume focus on?',
        answer:
          'Emphasize P&L ownership, market share growth, product launch outcomes, and data-driven decision making. Quantify revenue impact wherever possible.',
      },
      {
        question: 'Do brand managers need an MBA?',
        answer:
          'An MBA is common at top CPG companies but not strictly required. Strong results in brand growth and marketing analytics can compensate for the lack of an advanced degree.',
      },
      {
        question: 'How do I highlight leadership on a brand manager resume?',
        answer:
          'Describe cross-functional team leadership, agency management, and any direct reports. Mention collaboration with sales, R&D, supply chain, and creative teams.',
      },
    ],
  },

  {
    slug: 'brand-strategist',
    title: 'Brand Strategist',
    templateStyle: 'creative',
    keywords: [
      'brand strategist resume example',
      'brand strategy resume template',
      'creative strategist resume',
      'brand consultant CV',
    ],
    searchIntents: [
      'brand strategist resume sample',
      'how to write a brand strategist resume',
      'brand strategist job resume tips',
    ],
    totalMonthlySearches: 1400,
    topSkills: [
      'Brand Positioning',
      'Competitive Research',
      'Audience Segmentation',
      'Storytelling & Messaging',
      'Visual Identity Direction',
      'Market Trend Analysis',
      'Workshop Facilitation',
      'Stakeholder Presentations',
      'Creative Brief Writing',
      'Digital Brand Strategy',
    ],
    atsKeywords: [
      'brand positioning',
      'competitive analysis',
      'brand identity',
      'messaging framework',
      'tone of voice',
      'brand architecture',
      'market research',
      'audience persona',
      'brand guidelines',
      'rebranding',
      'brand audit',
      'visual identity',
      'go-to-market',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Ethan',
      lastName: 'Park',
      profession: 'Brand Strategist',
      summary:
        'Strategic brand thinker with 6 years of agency and in-house experience crafting brand platforms, messaging frameworks, and go-to-market strategies for B2B and DTC companies. Adept at translating consumer insights into compelling brand narratives.',
      skills: [
        'Brand Positioning',
        'Competitive Research',
        'Audience Segmentation',
        'Storytelling & Messaging',
        'Visual Identity Direction',
        'Market Trend Analysis',
        'Workshop Facilitation',
        'Stakeholder Presentations',
        'Creative Brief Writing',
        'Digital Brand Strategy',
      ],
      experience: [
        {
          title: 'Senior Brand Strategist',
          company: 'Landor & Fitch',
          startDate: '2022-01',
          isCurrent: true,
          achievements: [
            'Lead brand strategy engagements for Fortune 500 clients, delivering positioning platforms, naming conventions, and messaging architectures',
            'Directed a complete rebrand for a $300M SaaS company that contributed to a 40% increase in inbound leads within one quarter',
            'Facilitate cross-functional workshops with C-suite stakeholders to align brand vision with business objectives',
          ],
        },
        {
          title: 'Brand Strategist',
          company: 'R/GA',
          startDate: '2019-03',
          endDate: '2021-12',
          achievements: [
            'Developed brand identities and go-to-market strategies for 12+ product launches across tech and lifestyle sectors',
            'Conducted qualitative research (focus groups, interviews) and quantitative surveys to build audience personas',
            'Authored brand guidelines and tone-of-voice documents adopted by global marketing teams',
          ],
        },
      ],
      education: [
        {
          institution: 'New York University',
          degree: 'Bachelor of Arts',
          field: 'Communications & Media Studies',
          startDate: '2015-09',
          endDate: '2019-05',
        },
      ],
    }),
    faqs: [
      {
        question: 'What does a brand strategist resume look like?',
        answer:
          'It should showcase strategic thinking—brand audits, positioning frameworks, and measurable outcomes like awareness lifts or lead growth. Include both agency and in-house experience if applicable.',
      },
      {
        question: 'What is the difference between a brand manager and a brand strategist?',
        answer:
          'A brand manager typically owns P&L and day-to-day operations of a brand, while a brand strategist focuses on long-term positioning, messaging, and identity development.',
      },
      {
        question: 'Should I include case studies on my brand strategist resume?',
        answer:
          'Briefly reference key engagements and results on the resume, then link to a separate portfolio or case study page for deeper detail.',
      },
    ],
  },

  {
    slug: 'cad-designer',
    title: 'CAD Designer',
    templateStyle: 'creative',
    keywords: [
      'CAD designer resume example',
      'AutoCAD designer resume template',
      'mechanical CAD resume',
      'CAD drafter resume sample',
    ],
    searchIntents: [
      'CAD designer resume sample',
      'how to write a CAD designer resume',
      'CAD technician resume with software skills',
    ],
    totalMonthlySearches: 1600,
    topSkills: [
      'AutoCAD',
      'SolidWorks',
      'Revit',
      '3D Modeling',
      'Technical Drawing',
      'GD&T',
      'Blueprint Reading',
      'BIM Coordination',
      'Design Review',
      'Tolerance Analysis',
    ],
    atsKeywords: [
      'AutoCAD',
      'SolidWorks',
      'Revit',
      '3D modeling',
      'technical drafting',
      'GD&T',
      'blueprint',
      'BIM',
      'sheet metal design',
      'assembly drawing',
      'engineering drawings',
      'Inventor',
      'CATIA',
      'tolerance analysis',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Derek',
      lastName: 'Flynn',
      profession: 'CAD Designer',
      summary:
        'Detail-oriented CAD designer with 5+ years of experience creating precision 2D/3D models for mechanical and architectural projects. Proficient in AutoCAD, SolidWorks, and Revit with strong knowledge of GD&T and BIM workflows.',
      skills: [
        'AutoCAD',
        'SolidWorks',
        'Revit',
        '3D Modeling',
        'Technical Drawing',
        'GD&T',
        'Blueprint Reading',
        'BIM Coordination',
        'Design Review',
        'Tolerance Analysis',
      ],
      experience: [
        {
          title: 'CAD Designer II',
          company: 'Jacobs Engineering',
          startDate: '2021-04',
          isCurrent: true,
          achievements: [
            'Produce detailed 3D solid models and assembly drawings for industrial piping and HVAC systems across 10+ active projects',
            'Reduced design revision cycles by 30% by implementing standardized templates and layer management protocols',
            'Coordinate with structural and electrical teams to resolve BIM clashes, preventing $200K in potential rework',
          ],
        },
        {
          title: 'Junior CAD Technician',
          company: 'Smith & Associates Architects',
          startDate: '2018-07',
          endDate: '2021-03',
          achievements: [
            'Created construction documents and permit drawings for residential and commercial projects totaling $15M',
            'Converted legacy hand-drawn plans to digital AutoCAD format, archiving 500+ drawings for the firm',
            'Assisted senior designers with site surveys and as-built measurements to ensure model accuracy',
          ],
        },
      ],
      education: [
        {
          institution: 'Milwaukee School of Engineering',
          degree: 'Associate of Applied Science',
          field: 'Mechanical Design Technology',
          startDate: '2016-08',
          endDate: '2018-05',
        },
      ],
      certifications: [
        { name: 'Certified SolidWorks Associate (CSWA)', issuer: 'Dassault Systèmes', date: '2019-09' },
        { name: 'Autodesk Certified Professional: AutoCAD', issuer: 'Autodesk', date: '2020-03' },
      ],
    }),
    faqs: [
      {
        question: 'What software should a CAD designer list on their resume?',
        answer:
          'Include all CAD platforms you are proficient in—AutoCAD, SolidWorks, Revit, CATIA, Inventor, or Fusion 360. Specify version numbers if relevant to the job posting.',
      },
      {
        question: 'Do CAD designers need certifications?',
        answer:
          'Certifications like CSWA (SolidWorks) or Autodesk Certified Professional can differentiate you, especially if you lack a four-year degree.',
      },
      {
        question: 'How do I show accuracy on a CAD designer resume?',
        answer:
          'Reference reduced revision cycles, clash detection outcomes, or the number of drawings produced with zero-defect records. Precision is the currency of CAD work.',
      },
    ],
  },

  {
    slug: 'campaign-manager',
    title: 'Campaign Manager',
    templateStyle: 'creative',
    keywords: [
      'campaign manager resume example',
      'digital campaign manager resume',
      'marketing campaign manager CV',
      'political campaign manager resume',
    ],
    searchIntents: [
      'campaign manager resume sample',
      'how to write a campaign manager resume',
      'digital marketing campaign manager resume tips',
    ],
    totalMonthlySearches: 1900,
    topSkills: [
      'Campaign Strategy',
      'Media Planning & Buying',
      'Budget Management',
      'Google Ads',
      'Meta Ads Manager',
      'A/B Testing',
      'Marketing Automation',
      'Analytics & Reporting',
      'Cross-Channel Coordination',
      'Stakeholder Communication',
    ],
    atsKeywords: [
      'campaign management',
      'media planning',
      'digital advertising',
      'Google Ads',
      'Facebook Ads',
      'A/B testing',
      'conversion rate optimization',
      'marketing automation',
      'KPI tracking',
      'budget allocation',
      'lead generation',
      'ROI',
      'CRM integration',
      'HubSpot',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Priya',
      lastName: 'Nair',
      profession: 'Campaign Manager',
      summary:
        'Data-driven campaign manager with 5+ years of experience planning and executing multi-channel digital marketing campaigns. Managed $3M+ in annual ad spend across paid search, social, and programmatic, consistently exceeding ROAS targets.',
      skills: [
        'Campaign Strategy',
        'Media Planning & Buying',
        'Budget Management',
        'Google Ads',
        'Meta Ads Manager',
        'A/B Testing',
        'Marketing Automation',
        'Analytics & Reporting',
        'Cross-Channel Coordination',
        'Stakeholder Communication',
      ],
      experience: [
        {
          title: 'Senior Campaign Manager',
          company: 'HubSpot',
          startDate: '2022-06',
          isCurrent: true,
          achievements: [
            'Manage $1.5M quarterly ad budget across Google, LinkedIn, and Meta, achieving a 5.2x ROAS',
            'Launched an ABM campaign targeting enterprise accounts that generated $4M in pipeline within 90 days',
            'Built automated reporting dashboards in Looker Studio, reducing manual reporting time by 70%',
          ],
        },
        {
          title: 'Digital Campaign Manager',
          company: 'Dentsu International',
          startDate: '2019-04',
          endDate: '2022-05',
          achievements: [
            'Planned and executed paid media campaigns for clients in the fintech and healthcare sectors with combined budgets of $2M annually',
            'Improved client lead acquisition cost by 28% through landing page optimization and audience refinement',
            'Coordinated with creative, analytics, and account teams to deliver integrated campaigns on time and under budget',
          ],
        },
      ],
      education: [
        {
          institution: 'Boston University',
          degree: 'Bachelor of Science',
          field: 'Marketing',
          startDate: '2015-09',
          endDate: '2019-05',
        },
      ],
      certifications: [
        { name: 'Google Ads Certified', issuer: 'Google', date: '2023-01' },
        { name: 'HubSpot Inbound Marketing', issuer: 'HubSpot Academy', date: '2022-08' },
      ],
    }),
    faqs: [
      {
        question: 'What should a campaign manager put on their resume?',
        answer:
          'Highlight budget size managed, ROAS/ROI results, lead generation metrics, and the channels and platforms you are proficient in.',
      },
      {
        question: 'How do I quantify results as a campaign manager?',
        answer:
          'Use specific numbers: ad spend managed, cost per acquisition improvements, pipeline generated, conversion rate increases, and revenue attributed to campaigns.',
      },
      {
        question: 'Is Google Ads certification important for campaign managers?',
        answer:
          'Yes, it validates your technical proficiency and is often listed as a preferred qualification in job postings. Combine it with Meta Blueprint or HubSpot certifications for broader appeal.',
      },
    ],
  },

  {
    slug: 'content-strategist',
    title: 'Content Strategist',
    templateStyle: 'creative',
    keywords: [
      'content strategist resume example',
      'content strategy resume template',
      'senior content strategist CV',
      'digital content strategist resume',
    ],
    searchIntents: [
      'content strategist resume sample',
      'how to write a content strategist resume',
      'content strategy portfolio resume',
    ],
    totalMonthlySearches: 1700,
    topSkills: [
      'Content Strategy',
      'SEO & Keyword Research',
      'Editorial Calendar Management',
      'Content Audit',
      'UX Writing',
      'Analytics (GA4, SEMrush)',
      'Stakeholder Alignment',
      'Brand Voice Development',
      'CMS Management',
      'Cross-Functional Collaboration',
    ],
    atsKeywords: [
      'content strategy',
      'SEO',
      'editorial calendar',
      'content audit',
      'UX writing',
      'brand voice',
      'CMS',
      'Google Analytics',
      'content governance',
      'content marketing',
      'information architecture',
      'taxonomy',
      'user research',
      'A/B testing',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Jenna',
      lastName: 'Kowalski',
      profession: 'Content Strategist',
      summary:
        'Content strategist with 6 years of experience developing data-informed content ecosystems for SaaS and e-commerce brands. Expertise in SEO, editorial governance, and cross-channel content planning that drives organic growth.',
      skills: [
        'Content Strategy',
        'SEO & Keyword Research',
        'Editorial Calendar Management',
        'Content Audit',
        'UX Writing',
        'Analytics (GA4)',
        'Stakeholder Alignment',
        'Brand Voice Development',
        'CMS Management',
        'Cross-Functional Collaboration',
      ],
      experience: [
        {
          title: 'Senior Content Strategist',
          company: 'Shopify',
          startDate: '2022-02',
          isCurrent: true,
          achievements: [
            'Own the content strategy for the merchant education hub, growing organic traffic by 55% year-over-year',
            'Conducted a full-site content audit of 1,200+ pages, leading to a 30% reduction in low-performing content and improved crawl efficiency',
            'Defined brand voice guidelines and content governance frameworks adopted by 40+ contributors globally',
          ],
        },
        {
          title: 'Content Strategist',
          company: 'Mailchimp',
          startDate: '2019-01',
          endDate: '2022-01',
          achievements: [
            'Built and managed the editorial calendar for the company blog, publishing 8-10 optimized articles per month',
            'Partnered with product and UX teams to create in-app messaging and onboarding flows, improving activation rates by 18%',
            'Led keyword research initiatives that identified 200+ content gaps, resulting in 35% more ranking keywords',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Oregon',
          degree: 'Bachelor of Arts',
          field: 'Journalism',
          startDate: '2014-09',
          endDate: '2018-06',
        },
      ],
      certifications: [
        { name: 'Content Marketing Certification', issuer: 'HubSpot Academy', date: '2021-05' },
      ],
    }),
    faqs: [
      {
        question: 'What is the difference between a content strategist and a content marketer?',
        answer:
          'A content strategist focuses on planning, governance, and the overall content ecosystem, while a content marketer typically focuses on content creation and distribution to generate leads.',
      },
      {
        question: 'What metrics should a content strategist track?',
        answer:
          'Organic traffic growth, keyword rankings, engagement rates, content-driven conversions, and content health metrics like freshness and coverage gaps.',
      },
      {
        question: 'Should a content strategist resume include writing samples?',
        answer:
          'Link to a portfolio or case studies showing strategic impact rather than raw writing samples. Demonstrate how your content strategy delivered measurable business results.',
      },
    ],
  },

  {
    slug: 'content-writer',
    title: 'Content Writer',
    templateStyle: 'creative',
    keywords: [
      'content writer resume example',
      'freelance content writer resume',
      'content writer resume template',
      'SEO content writer resume sample',
      'blog writer resume',
    ],
    searchIntents: [
      'content writer resume sample',
      'how to write a content writer resume',
      'content writer resume for beginners',
    ],
    totalMonthlySearches: 4800,
    topSkills: [
      'SEO Writing',
      'Blog & Article Writing',
      'Research',
      'WordPress / CMS',
      'Copyediting',
      'Brand Voice Adaptation',
      'Content Calendar Execution',
      'Social Media Copy',
      'Keyword Optimization',
      'AP Style',
    ],
    atsKeywords: [
      'content writing',
      'SEO',
      'blog writing',
      'copywriting',
      'WordPress',
      'content management',
      'editorial',
      'keyword research',
      'AP style',
      'brand voice',
      'social media',
      'email marketing',
      'content calendar',
      'proofreading',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Amara',
      lastName: 'Hughes',
      profession: 'Content Writer',
      summary:
        'Versatile content writer with 4 years of experience crafting SEO-optimized blog posts, website copy, and email campaigns for B2B SaaS and lifestyle brands. Published 500+ articles with a track record of driving organic traffic growth.',
      skills: [
        'SEO Writing',
        'Blog & Article Writing',
        'Research',
        'WordPress',
        'Copyediting',
        'Brand Voice Adaptation',
        'Content Calendar Execution',
        'Social Media Copy',
        'Keyword Optimization',
        'AP Style',
      ],
      experience: [
        {
          title: 'Senior Content Writer',
          company: 'Drift',
          startDate: '2022-09',
          isCurrent: true,
          achievements: [
            'Write 12-15 long-form blog posts per month, contributing to a 40% increase in organic sessions year-over-year',
            'Collaborate with the SEO team to target high-intent keywords, ranking on page 1 for 30+ competitive terms',
            'Develop product-led content that supports sales enablement and drives free-trial signups',
          ],
        },
        {
          title: 'Content Writer',
          company: 'Contently',
          startDate: '2020-06',
          endDate: '2022-08',
          achievements: [
            'Produced 300+ articles for client brands spanning fintech, health, and travel verticals',
            'Maintained a 98% on-time delivery rate while managing simultaneous assignments for 5 accounts',
            'Achieved average engagement rates 25% above industry benchmarks based on time-on-page metrics',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Wisconsin-Madison',
          degree: 'Bachelor of Arts',
          field: 'English',
          startDate: '2016-09',
          endDate: '2020-05',
        },
      ],
    }),
    faqs: [
      {
        question: 'How do I write a content writer resume with no experience?',
        answer:
          'Include any freelance work, personal blog, guest posts, or academic writing. Highlight transferable skills like research, SEO knowledge, and writing speed.',
      },
      {
        question: 'Should a content writer resume include published links?',
        answer:
          'Yes, include 2-3 links to your best-published pieces or a portfolio website. This is often the most impactful element of a content writer resume.',
      },
      {
        question: 'What metrics matter on a content writer resume?',
        answer:
          'Articles published, organic traffic driven, keyword rankings achieved, engagement metrics, and any revenue or lead generation your content contributed to.',
      },
    ],
  },

  {
    slug: 'copy-editor',
    title: 'Copy Editor',
    templateStyle: 'creative',
    keywords: [
      'copy editor resume example',
      'copy editor resume template',
      'proofreader copy editor resume',
      'freelance copy editor CV',
    ],
    searchIntents: [
      'copy editor resume sample',
      'how to write a copy editor resume',
      'copy editor resume skills and experience',
    ],
    totalMonthlySearches: 1300,
    topSkills: [
      'AP / Chicago Style',
      'Grammar & Syntax',
      'Fact-Checking',
      'Proofreading',
      'Line Editing',
      'Content Management Systems',
      'Attention to Detail',
      'Deadline Management',
      'Brand Style Guide Compliance',
      'Track Changes & Markup',
    ],
    atsKeywords: [
      'copy editing',
      'proofreading',
      'AP style',
      'Chicago Manual of Style',
      'fact-checking',
      'line editing',
      'style guide',
      'grammar',
      'editorial workflow',
      'CMS',
      'publishing',
      'content review',
      'quality assurance',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Diana',
      lastName: 'Brooks',
      profession: 'Copy Editor',
      summary:
        'Meticulous copy editor with 5 years of experience refining content for digital publishers, magazines, and corporate communications. Expert in AP and Chicago style with a sharp eye for consistency, clarity, and factual accuracy.',
      skills: [
        'AP Style',
        'Chicago Manual of Style',
        'Grammar & Syntax',
        'Fact-Checking',
        'Proofreading',
        'Line Editing',
        'CMS Platforms',
        'Attention to Detail',
        'Deadline Management',
        'Brand Style Guide Compliance',
      ],
      experience: [
        {
          title: 'Senior Copy Editor',
          company: 'Condé Nast',
          startDate: '2021-09',
          isCurrent: true,
          achievements: [
            'Edit 25+ articles per week across Wired and Bon Appétit digital properties, ensuring brand voice and factual accuracy',
            'Developed an internal style guide addendum that reduced recurring style inconsistencies by 40%',
            'Mentor 2 junior editors and manage the editorial QA process for time-sensitive breaking news content',
          ],
        },
        {
          title: 'Copy Editor',
          company: 'The Atlantic',
          startDate: '2019-03',
          endDate: '2021-08',
          achievements: [
            'Edited longform features, opinion pieces, and newsletters for print and digital distribution',
            'Collaborated with writers to tighten prose and improve readability, reducing average revision rounds from 3 to 1.5',
            'Verified data, quotes, and sourcing for investigative articles, maintaining a zero-retraction record',
          ],
        },
      ],
      education: [
        {
          institution: 'Columbia University',
          degree: 'Master of Science',
          field: 'Journalism',
          startDate: '2017-09',
          endDate: '2019-05',
        },
        {
          institution: 'University of Virginia',
          degree: 'Bachelor of Arts',
          field: 'English Literature',
          startDate: '2013-08',
          endDate: '2017-05',
        },
      ],
    }),
    faqs: [
      {
        question: 'What skills should a copy editor highlight?',
        answer:
          'Emphasize proficiency in style guides (AP, Chicago), fact-checking ability, attention to detail, deadline management, and familiarity with CMS platforms.',
      },
      {
        question: 'Is a journalism degree required for copy editing jobs?',
        answer:
          'Not always. A degree in English, communications, or a related field combined with strong editing samples can be equally effective.',
      },
      {
        question: 'How do copy editors demonstrate value on a resume?',
        answer:
          'Reference the volume of content edited, error reduction rates, faster turnaround times, and any style guides you created or maintained.',
      },
    ],
  },

  {
    slug: 'copywriter',
    title: 'Copywriter',
    templateStyle: 'creative',
    keywords: [
      'copywriter resume example',
      'advertising copywriter resume',
      'junior copywriter resume template',
      'freelance copywriter CV',
      'creative copywriter resume sample',
    ],
    searchIntents: [
      'copywriter resume sample',
      'how to write a copywriter resume',
      'copywriter resume with portfolio link',
    ],
    totalMonthlySearches: 3800,
    topSkills: [
      'Persuasive Writing',
      'Brand Messaging',
      'Headline & Tagline Creation',
      'Email Copywriting',
      'Ad Copy (Print & Digital)',
      'SEO Copywriting',
      'A/B Testing Copy',
      'Creative Concepting',
      'Collaboration with Designers',
      'CMS Platforms',
    ],
    atsKeywords: [
      'copywriting',
      'brand messaging',
      'advertising copy',
      'headline writing',
      'email campaigns',
      'SEO copy',
      'landing page copy',
      'A/B testing',
      'creative concepting',
      'tone of voice',
      'direct response',
      'call to action',
      'content marketing',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Oliver',
      lastName: 'Grant',
      profession: 'Copywriter',
      summary:
        'Award-winning copywriter with 5 years of experience writing high-converting copy for digital ads, email campaigns, landing pages, and brand campaigns. Strong conceptual thinker who pairs data insights with creative storytelling.',
      skills: [
        'Persuasive Writing',
        'Brand Messaging',
        'Headline & Tagline Creation',
        'Email Copywriting',
        'Ad Copy',
        'SEO Copywriting',
        'A/B Testing Copy',
        'Creative Concepting',
        'Collaboration with Designers',
        'CMS Platforms',
      ],
      experience: [
        {
          title: 'Senior Copywriter',
          company: 'Wieden+Kennedy',
          startDate: '2022-01',
          isCurrent: true,
          achievements: [
            'Write integrated campaign copy for a global sportswear brand across TV, OOH, digital, and social channels',
            'Developed a tagline for a product launch campaign that was adopted as the brand\'s permanent slogan',
            'A/B tested email subject lines, improving open rates by 22% and click-through rates by 15%',
          ],
        },
        {
          title: 'Copywriter',
          company: 'VMLY&R',
          startDate: '2019-06',
          endDate: '2021-12',
          achievements: [
            'Created direct-response copy for PPC and social ads, reducing CPA by 20% for a financial services client',
            'Wrote landing page copy for 15+ product launches, contributing to a 30% increase in conversion rates',
            'Won a regional ADDY Award for a print campaign concept for a nonprofit client',
          ],
        },
      ],
      education: [
        {
          institution: 'Virginia Commonwealth University – Brandcenter',
          degree: 'Master of Science',
          field: 'Creative Brand Management',
          startDate: '2017-08',
          endDate: '2019-05',
        },
        {
          institution: 'University of Texas at Austin',
          degree: 'Bachelor of Science',
          field: 'Advertising',
          startDate: '2013-08',
          endDate: '2017-05',
        },
      ],
    }),
    faqs: [
      {
        question: 'How should a copywriter format their resume?',
        answer:
          'Keep it clean and scannable. Lead with a strong summary, include measurable results (conversion lifts, award wins), and link to your portfolio or book.',
      },
      {
        question: 'Should a copywriter resume be creative or traditional?',
        answer:
          'A creative layout is acceptable—especially for agency roles—as long as it remains ATS-readable. Prioritize clarity and results over decoration.',
      },
      {
        question: 'What metrics should a copywriter include?',
        answer:
          'Conversion rate improvements, open and click-through rates, CPA reductions, revenue driven, and any creative awards or recognitions.',
      },
    ],
  },

  {
    slug: 'drafter',
    title: 'Drafter',
    templateStyle: 'regular',
    keywords: [
      'drafter resume example',
      'architectural drafter resume',
      'mechanical drafter resume template',
      'CAD drafter resume sample',
    ],
    searchIntents: [
      'drafter resume sample',
      'how to write a drafter resume',
      'architectural drafter CV example',
    ],
    totalMonthlySearches: 1500,
    topSkills: [
      'AutoCAD',
      'Revit',
      'Technical Drawing',
      'Blueprint Reading',
      'Construction Documents',
      'Building Codes',
      'Dimensioning & Tolerancing',
      'Detail Drafting',
      'Redline Revisions',
      'MS Office Suite',
    ],
    atsKeywords: [
      'drafting',
      'AutoCAD',
      'Revit',
      'technical drawing',
      'construction documents',
      'blueprint',
      'building codes',
      'architectural drafting',
      'mechanical drafting',
      'redline revisions',
      'sheet setup',
      'title block',
      'permit drawings',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Kevin',
      lastName: 'Tran',
      profession: 'Drafter',
      summary:
        'Reliable drafter with 4 years of experience producing architectural and structural drawings for commercial and residential projects. Proficient in AutoCAD and Revit with thorough knowledge of building codes and construction document standards.',
      skills: [
        'AutoCAD',
        'Revit',
        'Technical Drawing',
        'Blueprint Reading',
        'Construction Documents',
        'Building Codes',
        'Dimensioning & Tolerancing',
        'Detail Drafting',
        'Redline Revisions',
        'MS Office Suite',
      ],
      experience: [
        {
          title: 'Architectural Drafter',
          company: 'Perkins & Will',
          startDate: '2021-06',
          isCurrent: true,
          achievements: [
            'Produce construction document sets for commercial projects ranging from $5M to $40M in value',
            'Draft floor plans, elevations, sections, and detail sheets in compliance with IBC and local jurisdiction codes',
            'Incorporate redline revisions from project architects within 24-hour turnaround, maintaining 99% accuracy rate',
          ],
        },
        {
          title: 'Junior Drafter',
          company: 'Thompson Design Group',
          startDate: '2019-09',
          endDate: '2021-05',
          achievements: [
            'Created permit-ready drawings for 30+ residential renovation and addition projects',
            'Assisted in transitioning the firm from AutoCAD to Revit, training 5 staff members on BIM workflows',
            'Maintained a digital drawing library of 200+ standard details, improving drafting efficiency by 20%',
          ],
        },
      ],
      education: [
        {
          institution: 'Portland Community College',
          degree: 'Associate of Applied Science',
          field: 'Architectural Drafting Technology',
          startDate: '2017-09',
          endDate: '2019-06',
        },
      ],
    }),
    faqs: [
      {
        question: 'What is the difference between a drafter and a CAD designer?',
        answer:
          'A drafter typically focuses on creating technical drawings from specifications provided by engineers or architects, while a CAD designer may have broader design responsibilities including 3D modeling and design decisions.',
      },
      {
        question: 'What should a drafter put on their resume?',
        answer:
          'List CAD software proficiency, types of drawings produced, project values, code knowledge, and turnaround speed. Certifications from Autodesk can also add credibility.',
      },
      {
        question: 'Do drafters need a degree?',
        answer:
          'An associate degree or certificate in drafting technology is common, but employers also value portfolio quality and software proficiency over formal education.',
      },
    ],
  },

  {
    slug: 'fashion-designer',
    title: 'Fashion Designer',
    templateStyle: 'creative',
    keywords: [
      'fashion designer resume example',
      'fashion designer resume template',
      'apparel designer resume',
      'fashion designer CV with portfolio',
    ],
    searchIntents: [
      'fashion designer resume sample',
      'how to write a fashion designer resume',
      'entry level fashion designer resume',
    ],
    totalMonthlySearches: 2800,
    topSkills: [
      'Fashion Illustration',
      'Adobe Illustrator & Photoshop',
      'Textile Knowledge',
      'Pattern Making',
      'Garment Construction',
      'Trend Forecasting',
      'CLO 3D / Browzwear',
      'Color Theory',
      'Tech Pack Creation',
      'Vendor Communication',
    ],
    atsKeywords: [
      'fashion design',
      'garment construction',
      'pattern making',
      'textile',
      'fashion illustration',
      'tech pack',
      'trend forecasting',
      'apparel',
      'Adobe Illustrator',
      'CLO 3D',
      'draping',
      'color story',
      'mood board',
      'sample development',
      'production coordination',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Sofia',
      lastName: 'Lin',
      profession: 'Fashion Designer',
      summary:
        'Innovative fashion designer with 5 years of experience in women\'s ready-to-wear and activewear categories. Skilled in the full design lifecycle from concept sketching and trend research to tech pack creation and production coordination.',
      skills: [
        'Fashion Illustration',
        'Adobe Illustrator',
        'Adobe Photoshop',
        'Textile Knowledge',
        'Pattern Making',
        'Garment Construction',
        'Trend Forecasting',
        'CLO 3D',
        'Color Theory',
        'Tech Pack Creation',
      ],
      experience: [
        {
          title: 'Associate Fashion Designer',
          company: 'Lululemon',
          startDate: '2022-03',
          isCurrent: true,
          achievements: [
            'Design 30+ styles per season for the women\'s training collection, contributing $18M in annual revenue',
            'Create detailed tech packs and collaborate with overseas factories to ensure fit, quality, and on-time delivery',
            'Introduced 3D prototyping via CLO 3D, reducing physical sample rounds by 40% and saving $120K annually',
          ],
        },
        {
          title: 'Junior Designer',
          company: 'Theory',
          startDate: '2019-07',
          endDate: '2022-02',
          achievements: [
            'Developed seasonal mood boards and color palettes aligned with global runway and street-style trends',
            'Produced flat sketches and technical illustrations for 20+ styles per delivery',
            'Coordinated fabric sourcing with suppliers in Italy and China, negotiating MOQs that reduced waste by 15%',
          ],
        },
      ],
      education: [
        {
          institution: 'Parsons School of Design',
          degree: 'Bachelor of Fine Arts',
          field: 'Fashion Design',
          startDate: '2015-09',
          endDate: '2019-05',
        },
      ],
    }),
    faqs: [
      {
        question: 'What should a fashion designer include on their resume?',
        answer:
          'Highlight your design software skills, number of styles designed per season, categories covered, any revenue impact, and a link to your design portfolio.',
      },
      {
        question: 'Do fashion designers need to know CLO 3D?',
        answer:
          '3D design tools like CLO 3D and Browzwear are increasingly expected, especially at brands focused on sustainability and speed-to-market.',
      },
      {
        question: 'How important is a portfolio for fashion designer job applications?',
        answer:
          'A portfolio is essential. Include mood boards, flat sketches, tech packs, and finished garment photos. Your resume should link directly to it.',
      },
    ],
  },

  {
    slug: 'grant-writer',
    title: 'Grant Writer',
    templateStyle: 'professional',
    keywords: [
      'grant writer resume example',
      'grant writer resume template',
      'nonprofit grant writer CV',
      'federal grant writer resume sample',
    ],
    searchIntents: [
      'grant writer resume sample',
      'how to write a grant writer resume',
      'grant writing resume with funding totals',
    ],
    totalMonthlySearches: 1600,
    topSkills: [
      'Grant Proposal Writing',
      'Federal & Foundation Research',
      'Budget Narrative Development',
      'Logic Model Creation',
      'Compliance & Reporting',
      'Prospect Research',
      'Donor Relations',
      'Data-Driven Storytelling',
      'Grants.gov Navigation',
      'Deadline Management',
    ],
    atsKeywords: [
      'grant writing',
      'proposal development',
      'federal grants',
      'foundation grants',
      'budget narrative',
      'logic model',
      'nonprofit fundraising',
      'compliance reporting',
      'Grants.gov',
      'RFP response',
      'funder research',
      'grant management',
      'award administration',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Rachel',
      lastName: 'Bennett',
      profession: 'Grant Writer',
      summary:
        'Accomplished grant writer with 7 years of experience securing $12M+ in federal, state, and private foundation funding for nonprofit and educational organizations. Expert in proposal development, compliance reporting, and funder relationship management.',
      skills: [
        'Grant Proposal Writing',
        'Federal & Foundation Research',
        'Budget Narrative Development',
        'Logic Model Creation',
        'Compliance & Reporting',
        'Prospect Research',
        'Donor Relations',
        'Data-Driven Storytelling',
        'Grants.gov Navigation',
        'Deadline Management',
      ],
      experience: [
        {
          title: 'Senior Grant Writer',
          company: 'United Way Worldwide',
          startDate: '2021-05',
          isCurrent: true,
          achievements: [
            'Write and submit 25+ grant proposals annually, securing an average of $2.5M per year in new funding',
            'Maintain an 80% win rate on competitive federal and state grant applications',
            'Develop budget narratives and logic models aligned with funder priorities and organizational strategic plans',
          ],
        },
        {
          title: 'Grant Writer',
          company: 'Teach For America',
          startDate: '2017-08',
          endDate: '2021-04',
          achievements: [
            'Secured $4.8M in multi-year grants from the Bill & Melinda Gates Foundation, Ford Foundation, and USDE',
            'Managed post-award compliance reporting for 15+ active grants, ensuring 100% on-time submission',
            'Conducted prospect research to build a pipeline of 50+ potential funders annually',
          ],
        },
      ],
      education: [
        {
          institution: 'Georgetown University',
          degree: 'Master of Public Policy',
          field: 'Nonprofit Management',
          startDate: '2015-08',
          endDate: '2017-05',
        },
        {
          institution: 'Emory University',
          degree: 'Bachelor of Arts',
          field: 'Political Science',
          startDate: '2011-08',
          endDate: '2015-05',
        },
      ],
      certifications: [
        { name: 'Grant Professional Certified (GPC)', issuer: 'Grant Professionals Certification Institute', date: '2020-06' },
      ],
    }),
    faqs: [
      {
        question: 'What makes a strong grant writer resume?',
        answer:
          'Lead with total funding secured, win rates, and the types of grants you have written (federal, foundation, corporate). Include compliance and reporting experience.',
      },
      {
        question: 'Is the GPC certification worth getting?',
        answer:
          'Yes, the Grant Professional Certified credential demonstrates mastery of ethical grant practices and is valued by employers in the nonprofit and education sectors.',
      },
      {
        question: 'How should a grant writer quantify their resume?',
        answer:
          'Include total dollars secured, number of proposals submitted, win percentage, and the number of active grants managed simultaneously.',
      },
    ],
  },

  {
    slug: 'graphic-designer',
    title: 'Graphic Designer',
    templateStyle: 'creative',
    keywords: [
      'graphic designer resume example',
      'graphic designer resume template',
      'freelance graphic designer CV',
      'senior graphic designer resume sample',
      'graphic design resume with portfolio',
    ],
    searchIntents: [
      'graphic designer resume sample',
      'how to write a graphic designer resume',
      'creative graphic designer resume tips',
    ],
    totalMonthlySearches: 8200,
    topSkills: [
      'Adobe Creative Suite (Photoshop, Illustrator, InDesign)',
      'Typography',
      'Layout & Composition',
      'Brand Identity Design',
      'UI/UX Fundamentals',
      'Print & Digital Design',
      'Figma',
      'Color Theory',
      'Packaging Design',
      'Motion Graphics Basics',
    ],
    atsKeywords: [
      'graphic design',
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Adobe InDesign',
      'Figma',
      'brand identity',
      'typography',
      'layout design',
      'print design',
      'digital design',
      'visual communication',
      'packaging',
      'UI design',
      'art direction',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Mia',
      lastName: 'Chen',
      profession: 'Graphic Designer',
      summary:
        'Creative graphic designer with 6 years of experience delivering compelling visual solutions for brands in tech, retail, and healthcare. Expert in Adobe Creative Suite and Figma with a strong foundation in typography, layout, and brand identity.',
      skills: [
        'Adobe Photoshop',
        'Adobe Illustrator',
        'Adobe InDesign',
        'Figma',
        'Typography',
        'Layout & Composition',
        'Brand Identity Design',
        'Print & Digital Design',
        'Color Theory',
        'Packaging Design',
      ],
      experience: [
        {
          title: 'Senior Graphic Designer',
          company: 'Spotify',
          startDate: '2022-04',
          isCurrent: true,
          achievements: [
            'Design marketing collateral, social media assets, and event materials for global campaigns reaching 50M+ users',
            'Led the visual identity refresh for the Spotify for Artists platform, improving brand consistency scores by 35%',
            'Manage a design system of 150+ reusable components, accelerating production timelines by 40%',
          ],
        },
        {
          title: 'Graphic Designer',
          company: 'Pentagram',
          startDate: '2018-09',
          endDate: '2022-03',
          achievements: [
            'Created brand identity packages (logo, typography, color systems, guidelines) for 20+ clients across industries',
            'Designed packaging for a DTC food brand that won a 2021 Dieline Award',
            'Produced print and digital layouts for annual reports, catalogs, and editorial publications',
          ],
        },
      ],
      education: [
        {
          institution: 'Rhode Island School of Design',
          degree: 'Bachelor of Fine Arts',
          field: 'Graphic Design',
          startDate: '2014-09',
          endDate: '2018-05',
        },
      ],
    }),
    faqs: [
      {
        question: 'Should a graphic designer resume be visually designed?',
        answer:
          'A visually polished resume can showcase your skills, but keep it ATS-friendly. Many designers maintain a clean resume for ATS and a designed version for direct submissions.',
      },
      {
        question: 'What is the most important section of a graphic designer resume?',
        answer:
          'Your portfolio link is paramount. The resume supports it with context—years of experience, software proficiency, industries served, and measurable outcomes.',
      },
      {
        question: 'How many projects should a graphic designer list?',
        answer:
          'Focus on 2-3 roles with 3-4 achievement bullets each. Reference portfolio case studies for specific project details rather than listing every project on the resume.',
      },
    ],
  },
];
