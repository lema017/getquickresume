import { buildResumeData } from './_helpers';
import type { ProfessionPageData } from './index';

export const professions: ProfessionPageData[] = [
  // ─── TRADES (templateStyle: 'regular') ───

  {
    slug: 'automotive-technician',
    title: 'Automotive Technician',
    templateStyle: 'regular',
    keywords: [
      'automotive technician resume example',
      'auto mechanic resume template',
      'certified automotive technician resume',
      'car mechanic CV sample',
    ],
    searchIntents: [
      'automotive technician resume sample',
      'how to write a mechanic resume',
      'ASE certified technician resume',
    ],
    totalMonthlySearches: 3200,
    topSkills: [
      'Diagnostics & Troubleshooting',
      'Engine Repair & Overhaul',
      'Brake Systems',
      'Electrical Systems',
      'ASE Certifications',
      'OBD-II Scanning',
      'Preventive Maintenance',
      'Transmission Service',
      'Hybrid & EV Systems',
      'Customer Communication',
    ],
    atsKeywords: [
      'automotive repair',
      'diagnostics',
      'ASE certified',
      'engine repair',
      'brake systems',
      'electrical systems',
      'OBD-II',
      'preventive maintenance',
      'transmission',
      'hybrid vehicles',
      'alignment',
      'suspension',
      'HVAC systems',
      'fleet maintenance',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Carlos',
      lastName: 'Mendez',
      profession: 'Automotive Technician',
      summary:
        'ASE-certified automotive technician with 6+ years of experience diagnosing and repairing domestic and import vehicles. Proven ability to handle complex engine, transmission, and electrical repairs while maintaining high customer satisfaction.',
      skills: [
        'Diagnostics & Troubleshooting',
        'Engine Repair',
        'Brake Systems',
        'Electrical Systems',
        'ASE Certifications',
        'OBD-II Scanning',
        'Preventive Maintenance',
        'Transmission Service',
        'Hybrid & EV Systems',
        'Customer Communication',
      ],
      experience: [
        {
          title: 'Lead Automotive Technician',
          company: 'Pep Boys',
          startDate: '2021-03',
          isCurrent: true,
          achievements: [
            'Diagnose and repair an average of 12 vehicles per day across engine, brake, electrical, and HVAC systems',
            'Maintain a 97% first-time fix rate, reducing comebacks and boosting shop efficiency by 15%',
            'Train and mentor 3 junior technicians on advanced diagnostic procedures and scan tool operation',
          ],
        },
        {
          title: 'Automotive Technician',
          company: 'Firestone Complete Auto Care',
          startDate: '2018-05',
          endDate: '2021-02',
          achievements: [
            'Performed brake, suspension, and alignment services on 8-10 vehicles daily',
            'Upsold preventive maintenance packages contributing an additional $3K monthly in shop revenue',
            'Achieved ASE Master Technician status by passing all 8 core certification exams',
          ],
        },
      ],
      education: [
        {
          institution: 'Universal Technical Institute',
          degree: 'Diploma',
          field: 'Automotive Technology',
          startDate: '2016-09',
          endDate: '2018-03',
        },
      ],
      certifications: [
        { name: 'ASE Master Technician', issuer: 'National Institute for Automotive Service Excellence', date: '2021-06' },
        { name: 'EPA Section 608 Certification', issuer: 'EPA', date: '2019-04' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications should an automotive technician list?',
        answer:
          'ASE certifications are the industry standard. List each area you are certified in (brakes, electrical, engine repair, etc.) and highlight Master Technician status if achieved.',
      },
      {
        question: 'How do I write a mechanic resume with no formal education?',
        answer:
          'Focus on hands-on experience, certifications, and specific repair competencies. Include the types of vehicles and systems you have worked on and any shop metrics.',
      },
      {
        question: 'What metrics should a mechanic include on a resume?',
        answer:
          'Mention vehicles serviced per day, first-time fix rates, revenue generated from upsells, and customer satisfaction scores.',
      },
    ],
  },

  {
    slug: 'banquet-manager',
    title: 'Banquet Manager',
    templateStyle: 'regular',
    keywords: [
      'banquet manager resume example',
      'banquet captain resume template',
      'event banquet manager CV',
      'hotel banquet manager resume',
    ],
    searchIntents: [
      'banquet manager resume sample',
      'how to write a banquet manager resume',
      'banquet operations manager resume tips',
    ],
    totalMonthlySearches: 1100,
    topSkills: [
      'Event Coordination',
      'Banquet Operations',
      'Staff Scheduling',
      'F&B Cost Control',
      'Client Relations',
      'Menu Planning',
      'Vendor Negotiation',
      'Health & Safety Compliance',
      'Upselling Packages',
      'POS & Catering Software',
    ],
    atsKeywords: [
      'banquet operations',
      'event coordination',
      'food and beverage',
      'staff scheduling',
      'catering',
      'client relations',
      'menu planning',
      'cost control',
      'vendor management',
      'health and safety',
      'banquet setup',
      'hotel hospitality',
      'upselling',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Andre',
      lastName: 'Williams',
      profession: 'Banquet Manager',
      summary:
        'Experienced banquet manager with 5+ years overseeing large-scale events at 4- and 5-star hotels. Skilled in team leadership, F&B cost management, and delivering exceptional guest experiences for weddings, corporate events, and galas.',
      skills: [
        'Event Coordination',
        'Banquet Operations',
        'Staff Scheduling',
        'F&B Cost Control',
        'Client Relations',
        'Menu Planning',
        'Vendor Negotiation',
        'Health & Safety Compliance',
        'Upselling',
        'POS & Catering Software',
      ],
      experience: [
        {
          title: 'Banquet Manager',
          company: 'Marriott International',
          startDate: '2021-06',
          isCurrent: true,
          achievements: [
            'Oversee banquet operations for a 500-seat ballroom, managing 200+ events annually with budgets up to $150K per event',
            'Lead a team of 25 banquet servers and captains, maintaining a 96% client satisfaction score',
            'Reduced food waste by 18% by implementing portion control standards and accurate BEO forecasting',
          ],
        },
        {
          title: 'Assistant Banquet Manager',
          company: 'Hilton Hotels & Resorts',
          startDate: '2019-02',
          endDate: '2021-05',
          achievements: [
            'Coordinated setup and service for 150+ events per year, including weddings, corporate dinners, and charity galas',
            'Managed vendor relationships for floral, AV, and entertainment services, negotiating cost savings of 12%',
            'Trained 15+ new hires on service standards, table settings, and safety protocols',
          ],
        },
      ],
      education: [
        {
          institution: 'Johnson & Wales University',
          degree: 'Bachelor of Science',
          field: 'Hospitality Management',
          startDate: '2015-09',
          endDate: '2019-05',
        },
      ],
      certifications: [
        { name: 'ServSafe Manager Certification', issuer: 'National Restaurant Association', date: '2020-03' },
      ],
    }),
    faqs: [
      {
        question: 'What should a banquet manager highlight on their resume?',
        answer:
          'Emphasize event volume, team size managed, guest satisfaction scores, revenue generated, and cost-saving initiatives in food and beverage operations.',
      },
      {
        question: 'Is hospitality management degree required for banquet managers?',
        answer:
          'Not strictly, but a degree in hospitality or culinary management is preferred. Extensive hands-on experience in banquets or catering can substitute.',
      },
      {
        question: 'How do banquet managers quantify achievements?',
        answer:
          'Use numbers for events managed per year, team size, budget responsibility, guest satisfaction percentages, and food cost reduction metrics.',
      },
    ],
  },

  {
    slug: 'barista',
    title: 'Barista',
    templateStyle: 'regular',
    keywords: [
      'barista resume example',
      'barista resume template',
      'Starbucks barista resume sample',
      'coffee shop barista CV',
    ],
    searchIntents: [
      'barista resume sample',
      'how to write a barista resume with no experience',
      'barista resume skills and description',
    ],
    totalMonthlySearches: 5400,
    topSkills: [
      'Espresso Preparation',
      'Latte Art',
      'Customer Service',
      'Cash Handling',
      'POS Systems',
      'Inventory Restocking',
      'Speed & Multitasking',
      'Food Safety & Hygiene',
      'Menu Knowledge',
      'Team Collaboration',
    ],
    atsKeywords: [
      'barista',
      'espresso',
      'coffee preparation',
      'customer service',
      'cash handling',
      'POS system',
      'food safety',
      'latte art',
      'inventory',
      'upselling',
      'opening and closing duties',
      'beverage preparation',
      'fast-paced environment',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Taylor',
      lastName: 'Reeves',
      profession: 'Barista',
      summary:
        'Friendly and efficient barista with 3 years of experience in high-traffic specialty coffee shops. Skilled in espresso preparation, latte art, and delivering outstanding customer experiences in fast-paced environments.',
      skills: [
        'Espresso Preparation',
        'Latte Art',
        'Customer Service',
        'Cash Handling',
        'POS Systems',
        'Inventory Restocking',
        'Speed & Multitasking',
        'Food Safety',
        'Menu Knowledge',
        'Team Collaboration',
      ],
      experience: [
        {
          title: 'Barista',
          company: 'Blue Bottle Coffee',
          startDate: '2022-08',
          isCurrent: true,
          achievements: [
            'Prepare 150+ handcrafted beverages per shift while maintaining brand quality standards and sub-3-minute wait times',
            'Consistently upsell seasonal specials and pastry pairings, increasing average ticket by 12%',
            'Train 5 new baristas on espresso machine operation, milk steaming techniques, and customer engagement',
          ],
        },
        {
          title: 'Barista',
          company: 'Starbucks',
          startDate: '2021-01',
          endDate: '2022-07',
          achievements: [
            'Served 200+ customers per shift in a drive-through and walk-in location, earning "Partner of the Quarter" recognition',
            'Maintained a clean and organized bar area, passing all health inspections with zero violations',
            'Memorized and prepared 80+ beverages from the standard and secret menu with consistent accuracy',
          ],
        },
      ],
      education: [
        {
          institution: 'Seattle Central College',
          degree: 'Associate of Arts',
          field: 'General Studies',
          startDate: '2019-09',
          endDate: '2021-06',
        },
      ],
      certifications: [
        { name: 'Food Handler Permit', issuer: 'King County Public Health', date: '2021-02' },
      ],
    }),
    faqs: [
      {
        question: 'What should I put on a barista resume?',
        answer:
          'Include espresso and coffee preparation skills, customer service experience, POS proficiency, and any speed or upselling achievements. Mention food safety certifications.',
      },
      {
        question: 'How do I write a barista resume with no experience?',
        answer:
          'Highlight transferable skills like customer service, cash handling, multitasking, and teamwork from other roles. Mention any coffee training courses or food handler permits.',
      },
      {
        question: 'What are good action verbs for a barista resume?',
        answer:
          'Use verbs like "prepared," "served," "trained," "maintained," "upsold," "operated," and "coordinated" to describe your barista duties and accomplishments.',
      },
    ],
  },

  {
    slug: 'carpenter',
    title: 'Carpenter',
    templateStyle: 'regular',
    keywords: [
      'carpenter resume example',
      'journeyman carpenter resume',
      'construction carpenter resume template',
      'finish carpenter CV sample',
    ],
    searchIntents: [
      'carpenter resume sample',
      'how to write a carpenter resume',
      'construction carpenter resume tips',
    ],
    totalMonthlySearches: 3600,
    topSkills: [
      'Framing & Rough Carpentry',
      'Finish Carpentry',
      'Blueprint Reading',
      'Power & Hand Tool Proficiency',
      'Cabinet Installation',
      'Drywall & Trim Work',
      'OSHA Safety Compliance',
      'Measuring & Layout',
      'Project Estimation',
      'Team Leadership',
    ],
    atsKeywords: [
      'carpentry',
      'framing',
      'finish carpentry',
      'blueprint reading',
      'power tools',
      'cabinet installation',
      'drywall',
      'trim work',
      'OSHA',
      'construction',
      'remodeling',
      'wood framing',
      'concrete forming',
      'building codes',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Bryce',
      lastName: 'Olsen',
      profession: 'Carpenter',
      summary:
        'Skilled carpenter with 8 years of experience in residential and commercial construction. Proficient in framing, finish carpentry, cabinet installation, and remodeling with a strong record of on-time, on-budget project delivery.',
      skills: [
        'Framing & Rough Carpentry',
        'Finish Carpentry',
        'Blueprint Reading',
        'Power & Hand Tools',
        'Cabinet Installation',
        'Drywall & Trim Work',
        'OSHA Safety Compliance',
        'Measuring & Layout',
        'Project Estimation',
        'Team Leadership',
      ],
      experience: [
        {
          title: 'Lead Carpenter',
          company: 'Turner Construction',
          startDate: '2020-04',
          isCurrent: true,
          achievements: [
            'Lead a crew of 6 carpenters on commercial build-outs and tenant improvements valued at $2M-$10M',
            'Complete framing, drywall, and finish work on schedule, maintaining a 98% on-time delivery rate',
            'Implement daily safety toolbox talks, contributing to 1,200+ consecutive days without a lost-time incident',
          ],
        },
        {
          title: 'Journeyman Carpenter',
          company: 'Hensel Phelps',
          startDate: '2016-06',
          endDate: '2020-03',
          achievements: [
            'Performed rough and finish carpentry for hospitals, schools, and office buildings ranging from $5M to $50M',
            'Interpreted architectural blueprints and shop drawings to accurately layout walls, doors, and hardware',
            'Mentored 4 apprentice carpenters, guiding them through the union apprenticeship program requirements',
          ],
        },
      ],
      education: [
        {
          institution: 'Carpenters Training Center – UBC Local 22',
          degree: 'Apprenticeship Certificate',
          field: 'Carpentry',
          startDate: '2014-09',
          endDate: '2016-05',
        },
      ],
      certifications: [
        { name: 'OSHA 30-Hour Construction Safety', issuer: 'OSHA', date: '2017-03' },
        { name: 'First Aid & CPR', issuer: 'American Red Cross', date: '2023-01' },
      ],
    }),
    faqs: [
      {
        question: 'What should a carpenter include on a resume?',
        answer:
          'Highlight specific carpentry skills (framing, finish, cabinetry), project types and values, safety record, and any certifications like OSHA 30 or union journeyman card.',
      },
      {
        question: 'How do carpenters show career progression?',
        answer:
          'Show progression from apprentice to journeyman to lead carpenter. Mention crew size managed, project scope increases, and mentoring responsibilities.',
      },
      {
        question: 'Do carpenters need certifications for a resume?',
        answer:
          'OSHA 10 or 30-hour certification is highly valued. Union journeyman certification and first aid/CPR are also strong additions.',
      },
    ],
  },

  {
    slug: 'cashier',
    title: 'Cashier',
    templateStyle: 'regular',
    keywords: [
      'cashier resume example',
      'cashier resume template',
      'grocery store cashier resume',
      'retail cashier resume sample',
    ],
    searchIntents: [
      'cashier resume sample',
      'how to write a cashier resume with no experience',
      'cashier resume skills and duties',
    ],
    totalMonthlySearches: 9800,
    topSkills: [
      'POS Operation',
      'Cash Handling',
      'Customer Service',
      'Bagging & Packaging',
      'Product Scanning',
      'Returns & Exchanges',
      'Upselling',
      'Speed & Accuracy',
      'Basic Math',
      'Team Collaboration',
    ],
    atsKeywords: [
      'cashier',
      'POS system',
      'cash handling',
      'customer service',
      'register operation',
      'retail sales',
      'returns and exchanges',
      'upselling',
      'inventory',
      'bagging',
      'transaction processing',
      'loss prevention',
      'opening and closing',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Jordan',
      lastName: 'Price',
      profession: 'Cashier',
      summary:
        'Dependable cashier with 3 years of retail experience handling high-volume transactions accurately and efficiently. Recognized for friendly customer engagement, upselling skills, and maintaining a balanced cash drawer.',
      skills: [
        'POS Operation',
        'Cash Handling',
        'Customer Service',
        'Bagging & Packaging',
        'Product Scanning',
        'Returns & Exchanges',
        'Upselling',
        'Speed & Accuracy',
        'Basic Math',
        'Team Collaboration',
      ],
      experience: [
        {
          title: 'Cashier',
          company: 'Target',
          startDate: '2022-06',
          isCurrent: true,
          achievements: [
            'Process 150+ transactions per shift with a 99.8% accuracy rate and zero cash drawer discrepancies over 12 months',
            'Promote Target Circle loyalty sign-ups, enrolling 20+ new members weekly—top performer in the store',
            'Assist with front-end merchandising and inventory restocking during low-traffic periods',
          ],
        },
        {
          title: 'Cashier / Sales Associate',
          company: 'Kroger',
          startDate: '2021-01',
          endDate: '2022-05',
          achievements: [
            'Operated POS and self-checkout registers, assisting an average of 200 customers per shift',
            'Handled returns, exchanges, and price adjustments in accordance with store policies',
            'Earned Employee of the Month twice for outstanding customer feedback scores',
          ],
        },
      ],
      education: [
        {
          institution: 'Columbus State Community College',
          degree: 'Associate of Arts',
          field: 'Business Administration',
          startDate: '2020-08',
          endDate: '2022-05',
        },
      ],
    }),
    faqs: [
      {
        question: 'How do I write a cashier resume with no experience?',
        answer:
          'Focus on transferable skills: customer interaction, basic math, attention to detail, and teamwork. Include volunteer work, school projects, or any part-time roles involving people.',
      },
      {
        question: 'What skills should a cashier list on a resume?',
        answer:
          'POS operation, cash handling, customer service, speed and accuracy, upselling, returns processing, and basic inventory tasks.',
      },
      {
        question: 'How should I describe cashier duties on a resume?',
        answer:
          'Use numbers: transactions processed per shift, accuracy rates, loyalty sign-up stats, and any recognition received. Avoid generic descriptions.',
      },
    ],
  },

  {
    slug: 'chef',
    title: 'Chef',
    templateStyle: 'regular',
    keywords: [
      'chef resume example',
      'executive chef resume template',
      'line cook chef resume',
      'head chef CV sample',
      'sous chef resume',
    ],
    searchIntents: [
      'chef resume sample',
      'how to write a chef resume',
      'executive chef resume with achievements',
    ],
    totalMonthlySearches: 5800,
    topSkills: [
      'Menu Development',
      'Kitchen Management',
      'Food Cost Control',
      'Inventory Management',
      'Staff Training & Supervision',
      'Food Safety & HACCP',
      'Plating & Presentation',
      'Vendor Sourcing',
      'High-Volume Cooking',
      'Culinary Creativity',
    ],
    atsKeywords: [
      'menu development',
      'kitchen management',
      'food cost control',
      'HACCP',
      'inventory management',
      'culinary arts',
      'line cooking',
      'banquet catering',
      'food safety',
      'staff training',
      'vendor relations',
      'plating',
      'recipe development',
      'fine dining',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Marco',
      lastName: 'Rossi',
      profession: 'Chef',
      summary:
        'Passionate executive chef with 10 years of culinary experience spanning fine dining, farm-to-table, and high-volume catering. Proven leader in menu innovation, cost management, and building cohesive kitchen brigades.',
      skills: [
        'Menu Development',
        'Kitchen Management',
        'Food Cost Control',
        'Inventory Management',
        'Staff Training & Supervision',
        'Food Safety & HACCP',
        'Plating & Presentation',
        'Vendor Sourcing',
        'High-Volume Cooking',
        'Culinary Creativity',
      ],
      experience: [
        {
          title: 'Executive Chef',
          company: 'The Harvest Table',
          startDate: '2020-09',
          isCurrent: true,
          achievements: [
            'Oversee all kitchen operations for a 180-seat farm-to-table restaurant generating $3.5M in annual revenue',
            'Reduced food costs from 34% to 28% through seasonal menu engineering and waste-reduction programs',
            'Hire, train, and manage a brigade of 18 line cooks, prep cooks, and dishwashers',
          ],
        },
        {
          title: 'Sous Chef',
          company: 'Le Bernardin',
          startDate: '2016-05',
          endDate: '2020-08',
          achievements: [
            'Directed daily kitchen operations for lunch and dinner services averaging 250 covers per night',
            'Developed 12+ seasonal tasting menus that received consistent Michelin Guide commendations',
            'Implemented a FIFO inventory system that reduced spoilage by 20% and saved $40K annually',
          ],
        },
      ],
      education: [
        {
          institution: 'Culinary Institute of America',
          degree: 'Associate of Occupational Studies',
          field: 'Culinary Arts',
          startDate: '2013-09',
          endDate: '2015-05',
        },
      ],
      certifications: [
        { name: 'ServSafe Manager Certification', issuer: 'National Restaurant Association', date: '2019-07' },
        { name: 'HACCP Certification', issuer: 'FDA', date: '2020-01' },
      ],
    }),
    faqs: [
      {
        question: 'What should a chef include on their resume?',
        answer:
          'Include cuisine types, kitchen size managed, covers per service, food cost percentages, menu development accomplishments, and certifications like ServSafe or HACCP.',
      },
      {
        question: 'How do chefs show progression on a resume?',
        answer:
          'Show your path from line cook to sous chef to executive chef. Each role should demonstrate increasing responsibility in menu planning, staff management, and budget control.',
      },
      {
        question: 'Is culinary school necessary to include on a chef resume?',
        answer:
          'If you attended culinary school, include it. If not, emphasize apprenticeships, stages, and on-the-job training. Experience and skills matter most in the culinary industry.',
      },
    ],
  },

  {
    slug: 'concierge',
    title: 'Concierge',
    templateStyle: 'regular',
    keywords: [
      'concierge resume example',
      'hotel concierge resume template',
      'luxury concierge resume sample',
      'residential concierge CV',
    ],
    searchIntents: [
      'concierge resume sample',
      'how to write a concierge resume',
      'hotel concierge resume tips',
    ],
    totalMonthlySearches: 1800,
    topSkills: [
      'Guest Relations',
      'Local Area Knowledge',
      'Reservation Management',
      'Problem Solving',
      'Multitasking',
      'Communication Skills',
      'VIP & Loyalty Guest Handling',
      'Travel & Itinerary Planning',
      'CRM & PMS Software',
      'Multilingual Abilities',
    ],
    atsKeywords: [
      'concierge services',
      'guest relations',
      'reservation management',
      'hospitality',
      'VIP guests',
      'itinerary planning',
      'local area knowledge',
      'customer service',
      'PMS systems',
      'Opera',
      'luxury hospitality',
      'problem resolution',
      'front office',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Elise',
      lastName: 'Fontaine',
      profession: 'Concierge',
      summary:
        'Polished hotel concierge with 5 years of experience delivering personalized guest services at luxury properties. Expert in curating bespoke experiences, managing VIP relationships, and resolving complex guest requests with grace.',
      skills: [
        'Guest Relations',
        'Local Area Knowledge',
        'Reservation Management',
        'Problem Solving',
        'Multitasking',
        'Communication Skills',
        'VIP Guest Handling',
        'Travel & Itinerary Planning',
        'Opera PMS',
        'Multilingual (English, French)',
      ],
      experience: [
        {
          title: 'Head Concierge',
          company: 'Four Seasons Hotel New York',
          startDate: '2022-01',
          isCurrent: true,
          achievements: [
            'Serve as the primary point of contact for 300+ rooms, handling 50+ guest requests daily with a 99% resolution rate',
            'Curate dining, entertainment, and travel itineraries for VIP and loyalty-tier guests, driving a 4.9/5 satisfaction score',
            'Lead a team of 4 concierge associates, overseeing scheduling and professional development',
          ],
        },
        {
          title: 'Concierge Associate',
          company: 'The Ritz-Carlton, Washington D.C.',
          startDate: '2019-05',
          endDate: '2021-12',
          achievements: [
            'Managed restaurant reservations, theater bookings, and transportation arrangements for an average of 40 guests per day',
            'Built a curated network of 100+ local vendor contacts, enabling exclusive guest experiences',
            'Resolved guest complaints within 15 minutes on average, maintaining the hotel\'s Forbes Five-Star rating',
          ],
        },
      ],
      education: [
        {
          institution: 'Cornell University – School of Hotel Administration',
          degree: 'Bachelor of Science',
          field: 'Hotel Administration',
          startDate: '2015-08',
          endDate: '2019-05',
        },
      ],
      languages: [
        { name: 'English', level: 'native' },
        { name: 'French', level: 'advanced' },
        { name: 'Spanish', level: 'intermediate' },
      ],
    }),
    faqs: [
      {
        question: 'What makes a good concierge resume?',
        answer:
          'Highlight guest satisfaction scores, request resolution speed, VIP handling experience, and your network of local contacts. Language skills are a strong bonus.',
      },
      {
        question: 'Do concierges need certifications?',
        answer:
          'A Les Clefs d\'Or membership is the gold standard but not required. Certifications from the American Hotel & Lodging Association can also add value.',
      },
      {
        question: 'How should I list multilingual skills on a concierge resume?',
        answer:
          'Create a dedicated languages section listing each language and proficiency level. This is especially valued in luxury and international hotel settings.',
      },
    ],
  },

  {
    slug: 'cook',
    title: 'Cook',
    templateStyle: 'regular',
    keywords: [
      'cook resume example',
      'line cook resume template',
      'prep cook resume sample',
      'restaurant cook CV',
    ],
    searchIntents: [
      'cook resume sample',
      'how to write a cook resume',
      'line cook resume for beginners',
    ],
    totalMonthlySearches: 7200,
    topSkills: [
      'Food Preparation',
      'Line Cooking',
      'Knife Skills',
      'Grill & Sauté Stations',
      'Food Safety & Sanitation',
      'Inventory Rotation (FIFO)',
      'Recipe Execution',
      'Time Management',
      'Team Collaboration',
      'High-Volume Service',
    ],
    atsKeywords: [
      'food preparation',
      'line cook',
      'prep cook',
      'grill',
      'sauté',
      'food safety',
      'sanitation',
      'FIFO',
      'recipe execution',
      'high-volume kitchen',
      'plating',
      'ServSafe',
      'kitchen equipment',
      'catering',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Miguel',
      lastName: 'Santos',
      profession: 'Cook',
      summary:
        'Hardworking line cook with 4 years of experience in fast-paced restaurant kitchens. Proficient in grill, sauté, and prep stations with a focus on food quality, consistency, and safety.',
      skills: [
        'Food Preparation',
        'Line Cooking',
        'Knife Skills',
        'Grill & Sauté',
        'Food Safety',
        'Inventory Rotation',
        'Recipe Execution',
        'Time Management',
        'Team Collaboration',
        'High-Volume Service',
      ],
      experience: [
        {
          title: 'Line Cook',
          company: 'Olive Garden',
          startDate: '2022-04',
          isCurrent: true,
          achievements: [
            'Manage the grill and sauté stations during dinner service, preparing 80+ entrées per shift with consistent quality',
            'Maintain kitchen cleanliness and food safety standards, passing all quarterly health inspections at 95%+',
            'Assist with daily prep including stock making, sauce production, and vegetable processing for 200+ covers',
          ],
        },
        {
          title: 'Prep Cook',
          company: 'Chili\'s Grill & Bar',
          startDate: '2020-06',
          endDate: '2022-03',
          achievements: [
            'Prepared ingredients for all stations, processing 100+ lbs of produce and proteins daily',
            'Implemented a labeling and dating system that improved FIFO compliance and reduced spoilage by 15%',
            'Cross-trained on fry, grill, and expo stations to provide shift coverage as needed',
          ],
        },
      ],
      education: [
        {
          institution: 'Houston Community College',
          degree: 'Certificate',
          field: 'Culinary Arts',
          startDate: '2019-09',
          endDate: '2020-05',
        },
      ],
      certifications: [
        { name: 'ServSafe Food Handler', issuer: 'National Restaurant Association', date: '2020-08' },
      ],
    }),
    faqs: [
      {
        question: 'How do I write a cook resume with no experience?',
        answer:
          'Include any home cooking, culinary classes, or food service volunteer work. Emphasize knife skills, safety knowledge, and willingness to learn multiple stations.',
      },
      {
        question: 'What is the difference between a cook and a chef on a resume?',
        answer:
          'A cook typically executes recipes on specific stations, while a chef designs menus and manages the kitchen. Tailor your title and descriptions to match your actual role.',
      },
      {
        question: 'Should a cook get ServSafe certified?',
        answer:
          'Yes. A ServSafe Food Handler or Manager certification shows employers you understand food safety regulations and is often a job requirement.',
      },
    ],
  },

  {
    slug: 'delivery-driver',
    title: 'Delivery Driver',
    templateStyle: 'regular',
    keywords: [
      'delivery driver resume example',
      'delivery driver resume template',
      'Amazon delivery driver resume',
      'courier resume sample',
    ],
    searchIntents: [
      'delivery driver resume sample',
      'how to write a delivery driver resume',
      'delivery driver resume with no experience',
    ],
    totalMonthlySearches: 6200,
    topSkills: [
      'Route Navigation (GPS)',
      'Safe Driving Record',
      'Time Management',
      'Package Handling',
      'Customer Interaction',
      'Vehicle Inspection',
      'DOT Compliance',
      'Delivery Tracking Systems',
      'Physical Stamina',
      'Problem Solving',
    ],
    atsKeywords: [
      'delivery driver',
      'route planning',
      'GPS navigation',
      'CDL',
      'DOT compliance',
      'package delivery',
      'vehicle inspection',
      'safe driving',
      'last-mile delivery',
      'logistics',
      'customer service',
      'on-time delivery',
      'warehouse',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Darius',
      lastName: 'King',
      profession: 'Delivery Driver',
      summary:
        'Reliable delivery driver with 4 years of experience in last-mile and route-based delivery. Clean driving record with a 99%+ on-time delivery rate. Committed to safe vehicle operation and excellent customer service.',
      skills: [
        'Route Navigation',
        'Safe Driving',
        'Time Management',
        'Package Handling',
        'Customer Interaction',
        'Vehicle Inspection',
        'DOT Compliance',
        'Delivery Tracking Systems',
        'Physical Stamina',
        'Problem Solving',
      ],
      experience: [
        {
          title: 'Delivery Driver',
          company: 'Amazon DSP – Quick Route Logistics',
          startDate: '2022-03',
          isCurrent: true,
          achievements: [
            'Deliver 180-220 packages daily across residential and commercial routes, maintaining a 99.5% on-time delivery rate',
            'Complete daily pre-trip and post-trip vehicle inspections, reporting zero preventable accidents over 2+ years',
            'Navigate optimized routes using Flex app, covering 120+ stops per shift in urban and suburban areas',
          ],
        },
        {
          title: 'Route Driver',
          company: 'FedEx Ground',
          startDate: '2020-05',
          endDate: '2022-02',
          achievements: [
            'Handled 150+ stops per day on assigned routes, achieving a 98.7% customer satisfaction rating',
            'Loaded and secured packages up to 75 lbs, following safe lifting and vehicle loading protocols',
            'Resolved delivery exceptions (wrong address, restricted access) proactively, reducing failed deliveries by 12%',
          ],
        },
      ],
      education: [
        {
          institution: 'Georgia State University',
          degree: 'High School Diploma',
          field: 'General Studies',
          startDate: '2016-08',
          endDate: '2020-05',
        },
      ],
      certifications: [
        { name: 'Class C Commercial Driver License', issuer: 'Georgia DDS', date: '2020-04' },
      ],
    }),
    faqs: [
      {
        question: 'What should a delivery driver put on a resume?',
        answer:
          'Include your driving record, packages delivered per day, on-time delivery rate, customer satisfaction scores, and any relevant licenses (CDL, DOT medical card).',
      },
      {
        question: 'Do delivery drivers need a CDL?',
        answer:
          'Most last-mile delivery roles do not require a CDL, but having one opens up higher-paying opportunities with larger vehicles. Always check the job posting requirements.',
      },
      {
        question: 'How do I describe delivery driver experience on a resume?',
        answer:
          'Focus on volume (packages/stops per day), on-time rates, safety record, and customer feedback. Mention specific delivery platforms or tools you have used.',
      },
    ],
  },

  {
    slug: 'delivery-manager',
    title: 'Delivery Manager',
    templateStyle: 'regular',
    keywords: [
      'delivery manager resume example',
      'IT delivery manager resume template',
      'project delivery manager CV',
      'agile delivery manager resume sample',
    ],
    searchIntents: [
      'delivery manager resume sample',
      'how to write a delivery manager resume',
      'agile delivery manager resume tips',
    ],
    totalMonthlySearches: 1500,
    topSkills: [
      'Project Delivery',
      'Agile & Scrum',
      'Stakeholder Management',
      'Team Leadership',
      'Risk Management',
      'Budget Oversight',
      'Roadmap Planning',
      'Vendor Management',
      'JIRA / Confluence',
      'KPI Reporting',
    ],
    atsKeywords: [
      'delivery management',
      'agile',
      'scrum',
      'project delivery',
      'stakeholder management',
      'risk management',
      'budget management',
      'roadmap planning',
      'JIRA',
      'sprint planning',
      'cross-functional teams',
      'KPI tracking',
      'release management',
      'continuous improvement',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Samantha',
      lastName: 'Rhodes',
      profession: 'Delivery Manager',
      summary:
        'Results-oriented delivery manager with 7 years of experience overseeing end-to-end project delivery in IT and software development environments. Skilled in Agile frameworks, stakeholder alignment, and driving cross-functional teams to deliver on time and within budget.',
      skills: [
        'Project Delivery',
        'Agile & Scrum',
        'Stakeholder Management',
        'Team Leadership',
        'Risk Management',
        'Budget Oversight',
        'Roadmap Planning',
        'Vendor Management',
        'JIRA & Confluence',
        'KPI Reporting',
      ],
      experience: [
        {
          title: 'Senior Delivery Manager',
          company: 'ThoughtWorks',
          startDate: '2021-02',
          isCurrent: true,
          achievements: [
            'Manage delivery of 4 concurrent client engagements with combined contract value of $8M, achieving 100% on-time delivery',
            'Lead cross-functional teams of 15-25 engineers, designers, and QA analysts across 3 time zones',
            'Introduced delivery health dashboards in JIRA that improved sprint velocity predictability by 30%',
          ],
        },
        {
          title: 'Delivery Manager',
          company: 'Accenture',
          startDate: '2017-09',
          endDate: '2021-01',
          achievements: [
            'Delivered 10+ digital transformation projects for financial services clients with budgets ranging from $500K to $3M',
            'Reduced project overrun rates from 25% to 8% by implementing risk registers and bi-weekly retrospectives',
            'Managed vendor relationships and SOW negotiations, achieving cost savings of 15% across outsourced work streams',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Pennsylvania',
          degree: 'Bachelor of Science',
          field: 'Information Systems',
          startDate: '2013-09',
          endDate: '2017-05',
        },
      ],
      certifications: [
        { name: 'Certified ScrumMaster (CSM)', issuer: 'Scrum Alliance', date: '2018-05' },
        { name: 'PMP', issuer: 'Project Management Institute', date: '2020-11' },
      ],
    }),
    faqs: [
      {
        question: 'What is a delivery manager in IT?',
        answer:
          'A delivery manager ensures software projects are delivered on time, within scope, and on budget. They facilitate Agile ceremonies, manage risks, and align teams with stakeholder expectations.',
      },
      {
        question: 'What certifications help a delivery manager resume?',
        answer:
          'CSM (Certified ScrumMaster), PMP, SAFe Agilist, and PMI-ACP are all highly regarded for delivery management roles.',
      },
      {
        question: 'How should a delivery manager quantify results?',
        answer:
          'Cite on-time delivery rates, budget adherence, team sizes managed, project values, velocity improvements, and risk reduction metrics.',
      },
    ],
  },

  {
    slug: 'electrician',
    title: 'Electrician',
    templateStyle: 'regular',
    keywords: [
      'electrician resume example',
      'journeyman electrician resume template',
      'commercial electrician resume',
      'master electrician CV sample',
    ],
    searchIntents: [
      'electrician resume sample',
      'how to write an electrician resume',
      'journeyman electrician resume tips',
    ],
    totalMonthlySearches: 4500,
    topSkills: [
      'Electrical Wiring & Installation',
      'NEC Code Compliance',
      'Blueprint & Schematic Reading',
      'Troubleshooting & Diagnostics',
      'Panel Upgrades',
      'Conduit Bending',
      'Motor Controls',
      'OSHA Safety Standards',
      'PLC Programming Basics',
      'Residential & Commercial Systems',
    ],
    atsKeywords: [
      'electrical wiring',
      'NEC code',
      'blueprint reading',
      'troubleshooting',
      'panel installation',
      'conduit bending',
      'motor controls',
      'OSHA',
      'journeyman electrician',
      'commercial electrical',
      'residential electrical',
      'PLC',
      'circuit breaker',
      'load calculation',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Ryan',
      lastName: 'O\'Brien',
      profession: 'Electrician',
      summary:
        'Licensed journeyman electrician with 7 years of experience in commercial and residential electrical installation, maintenance, and troubleshooting. Strong knowledge of NEC code, OSHA regulations, and energy-efficient systems.',
      skills: [
        'Electrical Wiring & Installation',
        'NEC Code Compliance',
        'Blueprint Reading',
        'Troubleshooting & Diagnostics',
        'Panel Upgrades',
        'Conduit Bending',
        'Motor Controls',
        'OSHA Safety',
        'PLC Programming Basics',
        'Residential & Commercial Systems',
      ],
      experience: [
        {
          title: 'Journeyman Electrician',
          company: 'EMCOR Group',
          startDate: '2020-06',
          isCurrent: true,
          achievements: [
            'Install and maintain electrical systems for commercial projects valued at $1M-$20M, including office buildings and data centers',
            'Read and interpret blueprints, schematics, and specifications to ensure NEC-compliant installations',
            'Lead a crew of 4 apprentices, providing hands-on training in conduit bending, wire pulling, and panel terminations',
          ],
        },
        {
          title: 'Apprentice Electrician',
          company: 'IBEW Local 134',
          startDate: '2017-09',
          endDate: '2020-05',
          achievements: [
            'Completed 8,000+ hours of on-the-job training alongside classroom instruction in electrical theory and code',
            'Performed residential rough-in and trim-out wiring for 50+ single-family homes',
            'Assisted in troubleshooting motor control circuits and fire alarm systems in commercial settings',
          ],
        },
      ],
      education: [
        {
          institution: 'IBEW-NECA Apprenticeship Program',
          degree: 'Journeyman Certificate',
          field: 'Electrical Technology',
          startDate: '2017-09',
          endDate: '2020-05',
        },
      ],
      certifications: [
        { name: 'Journeyman Electrician License', issuer: 'State of Illinois', date: '2020-06' },
        { name: 'OSHA 30-Hour Construction', issuer: 'OSHA', date: '2018-11' },
      ],
    }),
    faqs: [
      {
        question: 'What should an electrician put on their resume?',
        answer:
          'List your license type (apprentice, journeyman, master), specialties (commercial, residential, industrial), project types, and safety certifications like OSHA 30.',
      },
      {
        question: 'How important is NEC knowledge on an electrician resume?',
        answer:
          'Very important. NEC compliance is fundamental to electrical work. Mention the code edition you are trained in and any continuing education in code updates.',
      },
      {
        question: 'Do electricians need a resume or just a license?',
        answer:
          'Both. While a license is essential, a well-written resume helps you stand out, especially when moving to new employers or transitioning to supervisory roles.',
      },
    ],
  },

  {
    slug: 'field-service-technician',
    title: 'Field Service Technician',
    templateStyle: 'regular',
    keywords: [
      'field service technician resume example',
      'field service engineer resume template',
      'HVAC field technician resume',
      'field service tech CV sample',
    ],
    searchIntents: [
      'field service technician resume sample',
      'how to write a field service technician resume',
      'field tech resume skills and certifications',
    ],
    totalMonthlySearches: 2100,
    topSkills: [
      'Equipment Installation & Repair',
      'Preventive Maintenance',
      'Troubleshooting & Diagnostics',
      'Technical Documentation',
      'Customer Communication',
      'Safety Compliance',
      'Electrical & Mechanical Systems',
      'Work Order Management',
      'Inventory & Parts Management',
      'Travel Flexibility',
    ],
    atsKeywords: [
      'field service',
      'equipment installation',
      'preventive maintenance',
      'troubleshooting',
      'technical support',
      'work orders',
      'customer service',
      'safety compliance',
      'electrical systems',
      'mechanical systems',
      'HVAC',
      'calibration',
      'service reports',
      'on-site repair',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Jason',
      lastName: 'Wells',
      profession: 'Field Service Technician',
      summary:
        'Skilled field service technician with 5 years of experience installing, maintaining, and repairing commercial and industrial equipment. Strong diagnostic abilities with a commitment to first-call resolution and customer satisfaction.',
      skills: [
        'Equipment Installation & Repair',
        'Preventive Maintenance',
        'Troubleshooting',
        'Technical Documentation',
        'Customer Communication',
        'Safety Compliance',
        'Electrical & Mechanical Systems',
        'Work Order Management',
        'Inventory & Parts Management',
        'Travel Flexibility',
      ],
      experience: [
        {
          title: 'Field Service Technician II',
          company: 'Siemens',
          startDate: '2021-08',
          isCurrent: true,
          achievements: [
            'Perform on-site installation, commissioning, and repair of building automation and HVAC control systems across a 5-state territory',
            'Achieve a 92% first-call resolution rate, minimizing customer downtime and repeat service visits',
            'Document all service activities in SAP, maintaining 100% compliance with SLA reporting requirements',
          ],
        },
        {
          title: 'Field Service Technician',
          company: 'Trane Technologies',
          startDate: '2019-03',
          endDate: '2021-07',
          achievements: [
            'Serviced 15-20 commercial HVAC units weekly, performing diagnostics, refrigerant recovery, and component replacements',
            'Reduced average repair time by 18% by developing a mobile parts kit for the most common failure modes',
            'Trained 3 new technicians on troubleshooting procedures and safety protocols',
          ],
        },
      ],
      education: [
        {
          institution: 'Nashville State Community College',
          degree: 'Associate of Applied Science',
          field: 'Industrial Maintenance Technology',
          startDate: '2017-08',
          endDate: '2019-05',
        },
      ],
      certifications: [
        { name: 'EPA Section 608 Universal', issuer: 'EPA', date: '2019-06' },
        { name: 'OSHA 10-Hour General Industry', issuer: 'OSHA', date: '2019-09' },
      ],
    }),
    faqs: [
      {
        question: 'What does a field service technician do on a resume?',
        answer:
          'Describe on-site equipment installation, maintenance, diagnostics, and repair. Include territory size, resolution rates, and customer satisfaction metrics.',
      },
      {
        question: 'What certifications help a field service technician resume?',
        answer:
          'EPA 608, OSHA 10/30, manufacturer-specific certifications, and CompTIA A+ (for IT-related field service) are all strong additions.',
      },
      {
        question: 'How do I show travel on a field service technician resume?',
        answer:
          'Mention your territory (number of states or mile radius), willingness to travel, and any travel percentage (e.g., 75% travel).',
      },
    ],
  },

  {
    slug: 'firefighter',
    title: 'Firefighter',
    templateStyle: 'regular',
    keywords: [
      'firefighter resume example',
      'firefighter resume template',
      'entry level firefighter resume',
      'firefighter paramedic resume sample',
    ],
    searchIntents: [
      'firefighter resume sample',
      'how to write a firefighter resume',
      'firefighter resume for beginners',
    ],
    totalMonthlySearches: 4100,
    topSkills: [
      'Fire Suppression',
      'Emergency Medical Response',
      'Hazmat Operations',
      'Search & Rescue',
      'Equipment Operation',
      'Physical Fitness',
      'Incident Command System',
      'Fire Prevention & Inspection',
      'Public Education',
      'Teamwork Under Pressure',
    ],
    atsKeywords: [
      'fire suppression',
      'emergency medical services',
      'hazmat',
      'search and rescue',
      'EMT',
      'paramedic',
      'incident command system',
      'fire prevention',
      'NFPA',
      'SCBA',
      'ladder operations',
      'CPR',
      'fire inspection',
      'physical fitness',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Daniel',
      lastName: 'Reyes',
      profession: 'Firefighter',
      summary:
        'Dedicated firefighter/EMT with 5 years of front-line experience in fire suppression, emergency medical response, and hazmat operations. Committed to community safety, continuous training, and exemplary teamwork under high-pressure conditions.',
      skills: [
        'Fire Suppression',
        'Emergency Medical Response',
        'Hazmat Operations',
        'Search & Rescue',
        'Equipment Operation',
        'Physical Fitness',
        'Incident Command System',
        'Fire Prevention',
        'Public Education',
        'Teamwork Under Pressure',
      ],
      experience: [
        {
          title: 'Firefighter / EMT',
          company: 'City of Austin Fire Department',
          startDate: '2021-01',
          isCurrent: true,
          achievements: [
            'Respond to 200+ emergency calls per month including structure fires, vehicle accidents, and medical emergencies',
            'Operate pumper apparatus and aerial ladder trucks, ensuring water supply and suppression coverage',
            'Conduct 50+ fire prevention inspections annually for commercial and multi-family properties',
          ],
        },
        {
          title: 'Volunteer Firefighter / EMT-B',
          company: 'Round Rock Volunteer Fire Department',
          startDate: '2019-06',
          endDate: '2020-12',
          achievements: [
            'Completed 600+ volunteer hours responding to fire, medical, and hazmat calls',
            'Performed search and rescue operations in low-visibility environments using SCBA and thermal imaging cameras',
            'Participated in community outreach events, educating 500+ residents on fire safety and CPR',
          ],
        },
      ],
      education: [
        {
          institution: 'Texas A&M Engineering Extension Service',
          degree: 'Certificate',
          field: 'Fire Academy (TCFP Certified)',
          startDate: '2018-09',
          endDate: '2019-05',
        },
        {
          institution: 'Austin Community College',
          degree: 'Associate of Applied Science',
          field: 'Fire Science',
          startDate: '2016-08',
          endDate: '2018-05',
        },
      ],
      certifications: [
        { name: 'EMT-Basic', issuer: 'NREMT', date: '2019-05' },
        { name: 'Hazmat Operations', issuer: 'TCFP', date: '2019-07' },
        { name: 'NFPA Firefighter I & II', issuer: 'TCFP', date: '2019-05' },
      ],
    }),
    faqs: [
      {
        question: 'What should a firefighter resume include?',
        answer:
          'Include your certifications (FF I/II, EMT, Hazmat), call volume, apparatus experience, special team assignments, and any community outreach activities.',
      },
      {
        question: 'How do I write a firefighter resume with no experience?',
        answer:
          'Highlight volunteer firefighting, fire academy training, EMT certification, physical fitness scores (CPAT), and any related community service.',
      },
      {
        question: 'Is an EMT certification important on a firefighter resume?',
        answer:
          'Yes, most fire departments require at least EMT-B. Paramedic certification is even more competitive and should be prominently featured.',
      },
    ],
  },

  {
    slug: 'flight-attendant',
    title: 'Flight Attendant',
    templateStyle: 'regular',
    keywords: [
      'flight attendant resume example',
      'flight attendant resume template',
      'cabin crew resume sample',
      'airline flight attendant CV',
    ],
    searchIntents: [
      'flight attendant resume sample',
      'how to write a flight attendant resume',
      'flight attendant resume no experience',
    ],
    totalMonthlySearches: 5100,
    topSkills: [
      'Passenger Safety & Emergency Procedures',
      'Customer Service Excellence',
      'Conflict Resolution',
      'Multilingual Communication',
      'First Aid & CPR',
      'Cabin Service Delivery',
      'Teamwork & Adaptability',
      'Cultural Sensitivity',
      'In-Flight Sales',
      'Regulatory Compliance (FAA/EASA)',
    ],
    atsKeywords: [
      'flight attendant',
      'cabin crew',
      'passenger safety',
      'emergency procedures',
      'customer service',
      'in-flight service',
      'FAA regulations',
      'first aid',
      'CPR',
      'conflict resolution',
      'safety demonstration',
      'beverage service',
      'multilingual',
      'aviation',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Natasha',
      lastName: 'Levin',
      profession: 'Flight Attendant',
      summary:
        'Professional flight attendant with 4 years of experience delivering exceptional in-flight service on domestic and international routes. Trained in emergency procedures, first aid, and conflict de-escalation with fluency in English and Portuguese.',
      skills: [
        'Passenger Safety',
        'Emergency Procedures',
        'Customer Service',
        'Conflict Resolution',
        'Multilingual Communication',
        'First Aid & CPR',
        'Cabin Service Delivery',
        'Teamwork & Adaptability',
        'In-Flight Sales',
        'FAA Compliance',
      ],
      experience: [
        {
          title: 'Flight Attendant',
          company: 'Delta Air Lines',
          startDate: '2022-03',
          isCurrent: true,
          achievements: [
            'Serve 100-200 passengers per flight on domestic and transatlantic routes, consistently receiving commendations for service quality',
            'Conduct safety briefings and emergency drills, maintaining 100% compliance with FAA regulations',
            'Selected as part of the premium cabin crew for first-class international service based on performance reviews',
          ],
        },
        {
          title: 'Flight Attendant',
          company: 'JetBlue Airways',
          startDate: '2020-08',
          endDate: '2022-02',
          achievements: [
            'Delivered in-flight beverage and snack service while managing passenger inquiries and special assistance requests',
            'De-escalated 10+ in-flight disturbances calmly and professionally, earning a safety recognition award',
            'Achieved top 10% crew member rating in quarterly passenger satisfaction surveys',
          ],
        },
      ],
      education: [
        {
          institution: 'Florida International University',
          degree: 'Bachelor of Arts',
          field: 'Hospitality & Tourism Management',
          startDate: '2016-08',
          endDate: '2020-05',
        },
      ],
      certifications: [
        { name: 'FAA Certificate of Demonstrated Proficiency', issuer: 'Federal Aviation Administration', date: '2020-08' },
        { name: 'CPR & First Aid', issuer: 'American Red Cross', date: '2023-02' },
      ],
      languages: [
        { name: 'English', level: 'native' },
        { name: 'Portuguese', level: 'advanced' },
        { name: 'Spanish', level: 'intermediate' },
      ],
    }),
    faqs: [
      {
        question: 'What should a flight attendant resume include?',
        answer:
          'Highlight safety training, customer service skills, language abilities, in-flight experience, and any awards or recognitions. Airlines value adaptability and professionalism.',
      },
      {
        question: 'How do I write a flight attendant resume with no experience?',
        answer:
          'Focus on customer-facing roles (retail, hospitality), language skills, CPR/first aid certifications, and personal qualities like adaptability, teamwork, and poise.',
      },
      {
        question: 'Do airlines care about languages on a flight attendant resume?',
        answer:
          'Absolutely. Multilingual candidates are highly sought after, especially for international routes. List each language with proficiency level prominently.',
      },
    ],
  },

  {
    slug: 'forklift-operator',
    title: 'Forklift Operator',
    templateStyle: 'regular',
    keywords: [
      'forklift operator resume example',
      'warehouse forklift driver resume',
      'forklift operator resume template',
      'certified forklift operator CV',
    ],
    searchIntents: [
      'forklift operator resume sample',
      'how to write a forklift operator resume',
      'forklift resume with no experience',
    ],
    totalMonthlySearches: 3400,
    topSkills: [
      'Forklift Operation (Sit-down, Stand-up, Reach)',
      'Warehouse Safety',
      'Loading & Unloading',
      'Inventory Management',
      'RF Scanner Operation',
      'OSHA Compliance',
      'Order Picking',
      'Pallet Stacking',
      'Pre-Shift Equipment Inspection',
      'Team Collaboration',
    ],
    atsKeywords: [
      'forklift operation',
      'warehouse',
      'loading and unloading',
      'OSHA',
      'inventory management',
      'RF scanner',
      'order picking',
      'pallet jack',
      'shipping and receiving',
      'safety compliance',
      'material handling',
      'reach truck',
      'sit-down forklift',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Terrence',
      lastName: 'Hayes',
      profession: 'Forklift Operator',
      summary:
        'OSHA-certified forklift operator with 4 years of experience in high-volume warehouse environments. Proficient in sit-down, stand-up, and reach truck operation with an accident-free record and strong commitment to safety.',
      skills: [
        'Forklift Operation',
        'Warehouse Safety',
        'Loading & Unloading',
        'Inventory Management',
        'RF Scanner Operation',
        'OSHA Compliance',
        'Order Picking',
        'Pallet Stacking',
        'Equipment Inspection',
        'Team Collaboration',
      ],
      experience: [
        {
          title: 'Forklift Operator',
          company: 'Amazon Fulfillment Center',
          startDate: '2022-05',
          isCurrent: true,
          achievements: [
            'Operate sit-down and reach forklifts to move 300+ pallets per shift in a 500,000 sq ft distribution center',
            'Maintain a zero-incident safety record over 2+ years, adhering to all OSHA and company safety protocols',
            'Load and unload 10-15 trailers daily, ensuring proper weight distribution and securement',
          ],
        },
        {
          title: 'Warehouse Associate / Forklift Operator',
          company: 'Sysco Foods',
          startDate: '2020-07',
          endDate: '2022-04',
          achievements: [
            'Picked and staged orders using RF scanners with 99.7% accuracy across dry, refrigerated, and frozen zones',
            'Performed daily pre-shift forklift inspections and reported maintenance needs, keeping equipment availability at 98%',
            'Assisted in quarterly physical inventory counts, reconciling discrepancies for 5,000+ SKUs',
          ],
        },
      ],
      education: [
        {
          institution: 'Memphis Job Corps Center',
          degree: 'Certificate',
          field: 'Warehouse & Logistics Operations',
          startDate: '2019-09',
          endDate: '2020-06',
        },
      ],
      certifications: [
        { name: 'OSHA Forklift Certification', issuer: 'OSHA', date: '2020-07' },
      ],
    }),
    faqs: [
      {
        question: 'What should a forklift operator include on a resume?',
        answer:
          'List forklift types operated (sit-down, reach, order picker), certifications, pallets moved per shift, safety record, and warehouse systems used (WMS, RF scanner).',
      },
      {
        question: 'Is OSHA forklift certification required?',
        answer:
          'Yes, OSHA requires all forklift operators to be trained and certified. This certification must be renewed every three years and should always appear on your resume.',
      },
      {
        question: 'How do I write a forklift operator resume with no experience?',
        answer:
          'Get your OSHA forklift certification, then highlight warehouse skills, physical abilities, safety awareness, and any related manual labor experience.',
      },
    ],
  },

  {
    slug: 'front-desk-agent',
    title: 'Front Desk Agent',
    templateStyle: 'regular',
    keywords: [
      'front desk agent resume example',
      'hotel front desk resume template',
      'front desk receptionist resume',
      'guest services agent CV sample',
    ],
    searchIntents: [
      'front desk agent resume sample',
      'how to write a front desk resume',
      'hotel front desk agent resume tips',
    ],
    totalMonthlySearches: 3000,
    topSkills: [
      'Guest Check-In & Check-Out',
      'Reservation Systems (Opera, Fosse)',
      'Customer Service',
      'Cash & Credit Card Handling',
      'Problem Resolution',
      'Phone Etiquette',
      'Upselling Rooms & Packages',
      'Multitasking',
      'Data Entry',
      'Bilingual Communication',
    ],
    atsKeywords: [
      'front desk',
      'guest services',
      'check-in',
      'check-out',
      'reservation system',
      'Opera PMS',
      'customer service',
      'cash handling',
      'upselling',
      'hospitality',
      'phone etiquette',
      'concierge duties',
      'night audit',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Isabelle',
      lastName: 'Cooper',
      profession: 'Front Desk Agent',
      summary:
        'Personable front desk agent with 3+ years of experience in hotel guest services. Skilled in reservation management, upselling, and delivering seamless check-in/check-out experiences in fast-paced hospitality environments.',
      skills: [
        'Guest Check-In & Check-Out',
        'Opera PMS',
        'Customer Service',
        'Cash & Credit Card Handling',
        'Problem Resolution',
        'Phone Etiquette',
        'Upselling',
        'Multitasking',
        'Data Entry',
        'Bilingual (English/Spanish)',
      ],
      experience: [
        {
          title: 'Front Desk Agent',
          company: 'Hyatt Regency',
          startDate: '2022-09',
          isCurrent: true,
          achievements: [
            'Process 80+ guest check-ins and check-outs daily using Opera PMS, maintaining an average wait time under 3 minutes',
            'Upsell room upgrades and resort packages, generating an additional $5K monthly in ancillary revenue',
            'Resolve guest complaints promptly, achieving a 4.7/5 guest satisfaction score on post-stay surveys',
          ],
        },
        {
          title: 'Front Desk Associate',
          company: 'Holiday Inn Express',
          startDate: '2021-01',
          endDate: '2022-08',
          achievements: [
            'Managed reservations, walk-ins, and phone inquiries for a 150-room property with 85%+ average occupancy',
            'Handled nightly audit procedures including reconciling cash drawers, posting charges, and generating reports',
            'Trained 4 new front desk associates on PMS operations, brand standards, and guest interaction protocols',
          ],
        },
      ],
      education: [
        {
          institution: 'Miami Dade College',
          degree: 'Associate of Science',
          field: 'Hospitality & Tourism Management',
          startDate: '2019-08',
          endDate: '2021-05',
        },
      ],
      languages: [
        { name: 'English', level: 'native' },
        { name: 'Spanish', level: 'advanced' },
      ],
    }),
    faqs: [
      {
        question: 'What should a front desk agent put on a resume?',
        answer:
          'Include PMS software experience, guest volume handled, satisfaction scores, upselling results, and language skills. Mention night audit experience if applicable.',
      },
      {
        question: 'How do I describe front desk duties on a resume?',
        answer:
          'Use action verbs and numbers: "Processed 80+ check-ins daily," "Achieved 4.7/5 satisfaction score," "Generated $5K monthly in upsell revenue."',
      },
      {
        question: 'Do front desk agents need hotel experience?',
        answer:
          'Not always. Customer service experience in retail, restaurants, or call centers is transferable. Familiarity with PMS software is a plus but can be learned on the job.',
      },
    ],
  },

  // ─── EDUCATION (templateStyle: 'professional') ───

  {
    slug: 'bilingual-teacher',
    title: 'Bilingual Teacher',
    templateStyle: 'professional',
    keywords: [
      'bilingual teacher resume example',
      'bilingual education resume template',
      'dual language teacher resume',
      'Spanish bilingual teacher CV',
    ],
    searchIntents: [
      'bilingual teacher resume sample',
      'how to write a bilingual teacher resume',
      'dual language teacher resume tips',
    ],
    totalMonthlySearches: 1800,
    topSkills: [
      'Bilingual Instruction (English/Spanish)',
      'Dual Language Curriculum Design',
      'Differentiated Instruction',
      'Classroom Management',
      'Culturally Responsive Teaching',
      'Assessment & Progress Monitoring',
      'Parent Communication',
      'ELL Strategies',
      'Lesson Planning',
      'State Standards Alignment',
    ],
    atsKeywords: [
      'bilingual education',
      'dual language',
      'ESL',
      'ELL',
      'Spanish instruction',
      'curriculum design',
      'differentiated instruction',
      'classroom management',
      'lesson planning',
      'state standards',
      'cultural responsiveness',
      'assessment',
      'parent engagement',
      'language proficiency',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Carmen',
      lastName: 'Delgado',
      profession: 'Bilingual Teacher',
      summary:
        'Certified bilingual teacher with 6 years of experience delivering dual-language instruction in English and Spanish to K-5 students. Passionate about culturally responsive pedagogy and closing achievement gaps for English language learners.',
      skills: [
        'Bilingual Instruction',
        'Dual Language Curriculum Design',
        'Differentiated Instruction',
        'Classroom Management',
        'Culturally Responsive Teaching',
        'Assessment & Progress Monitoring',
        'Parent Communication',
        'ELL Strategies',
        'Lesson Planning',
        'State Standards Alignment',
      ],
      experience: [
        {
          title: 'Bilingual Teacher (Grade 3)',
          company: 'Dallas Independent School District',
          startDate: '2021-08',
          isCurrent: true,
          achievements: [
            'Deliver content instruction in English and Spanish to a class of 24 students in a 50/50 dual-language program',
            'Increased student reading proficiency by 28% as measured by TELPAS and STAAR benchmarks',
            'Design cross-curricular thematic units that integrate language objectives with math, science, and social studies content',
          ],
        },
        {
          title: 'Bilingual Teacher (Grade 1)',
          company: 'Houston ISD',
          startDate: '2018-08',
          endDate: '2021-06',
          achievements: [
            'Taught foundational literacy and numeracy in both languages to a class of 22 students, 90% ELL-classified',
            'Facilitated parent workshops in Spanish to increase family engagement, achieving 85% attendance at conferences',
            'Collaborated with the campus ESL coordinator to develop intervention plans for students below grade-level benchmarks',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Texas at San Antonio',
          degree: 'Bachelor of Science',
          field: 'Bilingual Education',
          startDate: '2014-08',
          endDate: '2018-05',
        },
      ],
      certifications: [
        { name: 'Texas Bilingual Education Certification (EC-6)', issuer: 'Texas Education Agency', date: '2018-07' },
        { name: 'ESL Supplemental Certification', issuer: 'Texas Education Agency', date: '2019-03' },
      ],
      languages: [
        { name: 'English', level: 'native' },
        { name: 'Spanish', level: 'native' },
      ],
    }),
    faqs: [
      {
        question: 'What should a bilingual teacher include on their resume?',
        answer:
          'Highlight your language certifications, dual-language program experience, student growth data (TELPAS, STAAR), and culturally responsive teaching strategies.',
      },
      {
        question: 'Do bilingual teachers need a special certification?',
        answer:
          'Yes, most states require a bilingual education or ESL certification in addition to a standard teaching license. Check your state\'s specific requirements.',
      },
      {
        question: 'How do I show student outcomes on a bilingual teacher resume?',
        answer:
          'Reference standardized test score improvements, reading level gains, TELPAS proficiency advances, and reclassification rates from ELL to English-proficient.',
      },
    ],
  },

  {
    slug: 'english-teacher',
    title: 'English Teacher',
    templateStyle: 'professional',
    keywords: [
      'English teacher resume example',
      'high school English teacher resume',
      'English teacher resume template',
      'ELA teacher resume sample',
    ],
    searchIntents: [
      'English teacher resume sample',
      'how to write an English teacher resume',
      'English language arts teacher resume tips',
    ],
    totalMonthlySearches: 3600,
    topSkills: [
      'Curriculum Development',
      'Lesson Planning',
      'Literary Analysis Instruction',
      'Writing Workshop Facilitation',
      'Classroom Management',
      'Differentiated Instruction',
      'Formative & Summative Assessment',
      'Technology Integration (Google Classroom)',
      'Student Mentoring',
      'AP English Preparation',
    ],
    atsKeywords: [
      'English language arts',
      'ELA',
      'curriculum development',
      'lesson planning',
      'literary analysis',
      'writing instruction',
      'classroom management',
      'differentiated instruction',
      'assessment',
      'AP English',
      'Common Core',
      'Google Classroom',
      'student engagement',
      'reading comprehension',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Sarah',
      lastName: 'Mitchell',
      profession: 'English Teacher',
      summary:
        'Passionate English teacher with 7 years of experience teaching ELA to grades 9-12. Skilled in curriculum design, writing workshop instruction, and fostering a love of literature through student-centered teaching methods.',
      skills: [
        'Curriculum Development',
        'Lesson Planning',
        'Literary Analysis Instruction',
        'Writing Workshop Facilitation',
        'Classroom Management',
        'Differentiated Instruction',
        'Formative & Summative Assessment',
        'Google Classroom',
        'Student Mentoring',
        'AP English Preparation',
      ],
      experience: [
        {
          title: 'English Teacher (Grades 10-12)',
          company: 'Lincoln High School',
          startDate: '2020-08',
          isCurrent: true,
          achievements: [
            'Teach 5 sections of English including AP Language & Composition, with an 88% AP exam pass rate',
            'Designed a school-wide writing rubric adopted by the English department, improving grading consistency across 12 teachers',
            'Advise the school literary magazine and speech & debate club, leading the debate team to state semifinals',
          ],
        },
        {
          title: 'English Teacher (Grades 9-10)',
          company: 'Westside Preparatory Academy',
          startDate: '2017-08',
          endDate: '2020-06',
          achievements: [
            'Taught English 9 and English 10 to 130+ students per year, achieving a 15% increase in standardized reading scores',
            'Implemented a reading workshop model with independent choice novels that increased student reading volume by 60%',
            'Collaborated with the special education team to co-teach inclusive ELA classes, supporting 20+ IEP students',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Illinois at Urbana-Champaign',
          degree: 'Master of Education',
          field: 'Curriculum & Instruction',
          startDate: '2019-06',
          endDate: '2021-05',
        },
        {
          institution: 'University of Michigan',
          degree: 'Bachelor of Arts',
          field: 'English',
          startDate: '2013-09',
          endDate: '2017-05',
        },
      ],
      certifications: [
        { name: 'Illinois Professional Educator License (ELA 9-12)', issuer: 'ISBE', date: '2017-08' },
        { name: 'AP English Language & Composition Certified', issuer: 'College Board', date: '2020-07' },
      ],
    }),
    faqs: [
      {
        question: 'What should an English teacher put on a resume?',
        answer:
          'Include grade levels and courses taught, student achievement data, curriculum initiatives, extracurricular involvement, and relevant certifications like AP endorsement.',
      },
      {
        question: 'How do English teachers show student growth on a resume?',
        answer:
          'Reference standardized test score improvements, AP pass rates, reading level gains, and writing proficiency benchmarks. Use specific percentages whenever possible.',
      },
      {
        question: 'Is a master\'s degree important for an English teacher resume?',
        answer:
          'A master\'s degree is valued and often leads to higher pay scales. It is required for permanent licensure in many states.',
      },
    ],
  },

  {
    slug: 'esl-teacher',
    title: 'ESL Teacher',
    templateStyle: 'professional',
    keywords: [
      'ESL teacher resume example',
      'ESL teacher resume template',
      'TESOL teacher resume sample',
      'English as a second language teacher CV',
    ],
    searchIntents: [
      'ESL teacher resume sample',
      'how to write an ESL teacher resume',
      'ESL teacher resume for abroad',
    ],
    totalMonthlySearches: 2900,
    topSkills: [
      'TESOL / TEFL Methodology',
      'Lesson Planning for ELLs',
      'Language Proficiency Assessment',
      'Differentiated Instruction',
      'Classroom Management',
      'Curriculum Adaptation',
      'Cultural Sensitivity',
      'Small Group Instruction',
      'Technology in Language Learning',
      'Parent & Community Engagement',
    ],
    atsKeywords: [
      'ESL',
      'ELL',
      'TESOL',
      'TEFL',
      'English language learners',
      'language proficiency',
      'WIDA',
      'TELPAS',
      'differentiated instruction',
      'lesson planning',
      'curriculum adaptation',
      'classroom management',
      'sheltered instruction',
      'SIOP model',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Mei',
      lastName: 'Tanaka',
      profession: 'ESL Teacher',
      summary:
        'TESOL-certified ESL teacher with 5 years of experience teaching English to diverse adult and K-12 learner populations. Expertise in communicative language teaching, WIDA standards, and differentiated instruction for multilingual classrooms.',
      skills: [
        'TESOL Methodology',
        'Lesson Planning for ELLs',
        'Language Proficiency Assessment',
        'Differentiated Instruction',
        'Classroom Management',
        'Curriculum Adaptation',
        'Cultural Sensitivity',
        'Small Group Instruction',
        'EdTech Integration',
        'Parent & Community Engagement',
      ],
      experience: [
        {
          title: 'ESL Teacher (Grades K-5)',
          company: 'Chicago Public Schools',
          startDate: '2022-08',
          isCurrent: true,
          achievements: [
            'Provide pull-out and push-in ESL instruction to 60+ English learners across 5 grade levels, representing 12 home languages',
            'Increased WIDA ACCESS scores by an average of 1.2 proficiency levels across all students within one academic year',
            'Develop culturally responsive lesson plans integrating students\' heritage languages to accelerate English acquisition',
          ],
        },
        {
          title: 'ESL Instructor',
          company: 'Berlitz Language Center',
          startDate: '2019-09',
          endDate: '2022-06',
          achievements: [
            'Taught 20+ weekly classes for adult learners at beginner to advanced levels, achieving 90% student retention',
            'Created original materials and assessments aligned with CEFR proficiency levels (A1-C1)',
            'Facilitated conversation clubs and pronunciation workshops that improved student speaking confidence scores by 35%',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Southern California',
          degree: 'Master of Arts',
          field: 'Teaching English to Speakers of Other Languages (TESOL)',
          startDate: '2017-08',
          endDate: '2019-05',
        },
        {
          institution: 'University of Washington',
          degree: 'Bachelor of Arts',
          field: 'Linguistics',
          startDate: '2013-09',
          endDate: '2017-06',
        },
      ],
      certifications: [
        { name: 'Illinois ESL Endorsement', issuer: 'ISBE', date: '2022-08' },
        { name: 'CELTA', issuer: 'Cambridge University Press & Assessment', date: '2019-06' },
      ],
      languages: [
        { name: 'English', level: 'native' },
        { name: 'Japanese', level: 'advanced' },
        { name: 'Spanish', level: 'intermediate' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications do ESL teachers need?',
        answer:
          'TESOL/TEFL certification is standard. For public schools, a state ESL endorsement is typically required. CELTA from Cambridge is valued for international and adult education settings.',
      },
      {
        question: 'How should an ESL teacher show student progress?',
        answer:
          'Reference WIDA ACCESS, TELPAS, or CEFR level improvements. Include reclassification rates and any student retention or satisfaction metrics.',
      },
      {
        question: 'Should I list languages spoken on an ESL teacher resume?',
        answer:
          'Yes, listing your language abilities demonstrates cultural competency and the ability to support students who share those languages.',
      },
    ],
  },

  {
    slug: 'history-teacher',
    title: 'History Teacher',
    templateStyle: 'professional',
    keywords: [
      'history teacher resume example',
      'social studies teacher resume template',
      'high school history teacher resume',
      'AP history teacher CV sample',
    ],
    searchIntents: [
      'history teacher resume sample',
      'how to write a history teacher resume',
      'social studies teacher resume tips',
    ],
    totalMonthlySearches: 2200,
    topSkills: [
      'U.S. & World History Instruction',
      'Curriculum Development',
      'Primary Source Analysis',
      'Socratic Seminars',
      'Classroom Management',
      'Assessment Design',
      'Differentiated Instruction',
      'Technology Integration',
      'AP History Preparation',
      'Student Engagement Strategies',
    ],
    atsKeywords: [
      'history teacher',
      'social studies',
      'U.S. history',
      'world history',
      'curriculum development',
      'primary source analysis',
      'AP history',
      'lesson planning',
      'assessment',
      'differentiated instruction',
      'classroom management',
      'Common Core',
      'civic education',
      'DBQ writing',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'James',
      lastName: 'Thornton',
      profession: 'History Teacher',
      summary:
        'Engaging history teacher with 8 years of experience teaching U.S. History, World History, and AP U.S. History to grades 9-12. Known for bringing history to life through primary source analysis, Socratic seminars, and project-based learning.',
      skills: [
        'U.S. & World History Instruction',
        'Curriculum Development',
        'Primary Source Analysis',
        'Socratic Seminars',
        'Classroom Management',
        'Assessment Design',
        'Differentiated Instruction',
        'Technology Integration',
        'AP History Preparation',
        'Student Engagement',
      ],
      experience: [
        {
          title: 'History Teacher / Department Chair',
          company: 'Jefferson High School',
          startDate: '2020-08',
          isCurrent: true,
          achievements: [
            'Teach 4 sections of AP U.S. History and 1 section of World History, achieving a 92% AP exam pass rate (3+)',
            'Lead a department of 8 social studies teachers, coordinating curriculum alignment and professional development sessions',
            'Developed a project-based learning unit on civil rights that was recognized as a district model curriculum',
          ],
        },
        {
          title: 'History Teacher',
          company: 'Roosevelt Middle School',
          startDate: '2016-08',
          endDate: '2020-06',
          achievements: [
            'Taught U.S. History and Civics to 150+ 8th graders annually, with 80% of students scoring proficient or above on state assessments',
            'Integrated Google Classroom and interactive simulations to boost student engagement and digital literacy',
            'Organized an annual "History Fair" where students presented original research projects to the school community',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Virginia',
          degree: 'Master of Arts',
          field: 'History',
          startDate: '2018-06',
          endDate: '2020-05',
        },
        {
          institution: 'College of William & Mary',
          degree: 'Bachelor of Arts',
          field: 'History & Secondary Education',
          startDate: '2012-08',
          endDate: '2016-05',
        },
      ],
      certifications: [
        { name: 'Virginia Teaching License (History/Social Studies 6-12)', issuer: 'VDOE', date: '2016-07' },
        { name: 'AP U.S. History Certified', issuer: 'College Board', date: '2020-06' },
      ],
    }),
    faqs: [
      {
        question: 'What should a history teacher include on their resume?',
        answer:
          'Include courses taught (AP, honors, general), student achievement data, curriculum leadership, extracurricular advising, and any innovative teaching methods.',
      },
      {
        question: 'How do history teachers demonstrate impact on a resume?',
        answer:
          'Reference AP pass rates, standardized test scores, student project outcomes, and any curriculum you developed that was adopted at the department or district level.',
      },
      {
        question: 'Is AP certification important for a history teacher resume?',
        answer:
          'Yes, AP certification from the College Board shows you are qualified to teach advanced coursework and is a significant differentiator for competitive positions.',
      },
    ],
  },
  {
    slug: 'beauty-therapist',
    title: 'Beauty Therapist',
    templateStyle: 'creative',
    keywords: ['beauty therapist resume example', 'beauty therapist resume sample', 'beauty therapist resume template'],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 210,
    topSkills: ['Facial Treatments', 'Waxing', 'Skin Analysis', 'Microdermabrasion', 'Chemical Peels', 'Client Consultation', 'Retail Sales', 'Sanitation Protocols', 'Lash Extensions', 'Aromatherapy'],
    atsKeywords: ['beauty therapy', 'esthetician', 'skin care', 'facial treatments', 'client retention', 'sanitation', 'product knowledge', 'waxing', 'anti-aging', 'consultation', 'upselling', 'CIDESCO', 'salon management'],
    sampleResumeData: buildResumeData({
      firstName: 'Mia',
      lastName: 'Torres',
      profession: 'Beauty Therapist',
      summary: 'Licensed beauty therapist with 6+ years of experience providing facial treatments, body therapies, and advanced skin care in high-end spa environments. Consistently exceeded retail sales targets by 30% while maintaining a 95% client retention rate.',
      skills: ['Facial Treatments', 'Chemical Peels', 'Microdermabrasion', 'Waxing', 'Lash Extensions', 'Skin Analysis', 'Retail Sales', 'Client Consultation'],
      experience: [
        {
          title: 'Senior Beauty Therapist',
          company: 'Serenity Day Spa',
          startDate: '2021-03',
          isCurrent: true,
          achievements: [
            'Perform 25+ treatments per week including facials, peels, and body wraps with a 4.9/5 client satisfaction rating',
            'Increased retail product sales by 35% through personalized skin care recommendations',
            'Trained 4 junior therapists on advanced facial techniques and sanitation protocols',
          ],
        },
        {
          title: 'Beauty Therapist',
          company: 'Glow Aesthetics Clinic',
          startDate: '2018-06',
          endDate: '2021-02',
          achievements: [
            'Built a personal client book of 150+ recurring clients within 18 months',
            'Introduced microdermabrasion services that generated $45K in annual revenue',
            'Maintained 100% compliance with state health and safety regulations',
          ],
        },
      ],
      education: [{ institution: 'Aveda Institute', degree: 'Diploma', field: 'Esthetics', startDate: '2017-01', endDate: '2018-05' }],
      certifications: [{ name: 'Licensed Esthetician', issuer: 'State Board of Cosmetology', date: '2018-05' }],
    }),
    faqs: [
      { question: 'What skills should a beauty therapist highlight on a resume?', answer: 'Focus on facial treatments, skin analysis, product knowledge, client consultation, and any advanced certifications like chemical peels or microdermabrasion.' },
      { question: 'How do I make my beauty therapist resume stand out?', answer: 'Include specific metrics such as client retention rates, retail sales performance, and the number of treatments performed weekly. Certifications and specialized training also help.' },
      { question: 'What certifications are valuable for beauty therapists?', answer: 'Key certifications include a state esthetics license, CIDESCO diploma, and specialized training in chemical peels, microneedling, or laser treatments.' },
    ],
  },
  {
    slug: 'curriculum-developer',
    title: 'Curriculum Developer',
    templateStyle: 'professional',
    keywords: ['curriculum developer resume example', 'curriculum developer resume sample', 'curriculum developer resume template'],
    searchIntents: ['Example', 'Template'],
    totalMonthlySearches: 170,
    topSkills: ['Curriculum Design', 'Instructional Design', 'Learning Management Systems', 'Standards Alignment', 'Assessment Development', 'Backward Design', 'Differentiated Instruction', 'Educational Technology', 'Data-Driven Instruction', 'Stakeholder Collaboration'],
    atsKeywords: ['curriculum development', 'instructional design', 'learning objectives', 'standards alignment', 'assessment', 'LMS', 'backward design', 'K-12', 'higher education', 'professional development', 'educational technology', 'scope and sequence', 'differentiation'],
    sampleResumeData: buildResumeData({
      firstName: 'David',
      lastName: 'Nguyen',
      profession: 'Curriculum Developer',
      summary: 'Curriculum developer with 8 years of experience designing K-12 and corporate training programs aligned to state and national standards. Led the redesign of a district-wide STEM curriculum adopted by 45 schools, improving student assessment scores by 18%.',
      skills: ['Curriculum Design', 'Instructional Design', 'Standards Alignment', 'LMS Administration', 'Assessment Development', 'Backward Design', 'Data Analysis', 'Stakeholder Collaboration'],
      experience: [
        {
          title: 'Senior Curriculum Developer',
          company: 'Bright Horizons Education',
          startDate: '2020-08',
          isCurrent: true,
          achievements: [
            'Designed and implemented K-8 STEM curriculum adopted across 45 schools serving 28,000 students',
            'Improved standardized test scores by 18% through data-driven curriculum revisions',
            'Led a team of 6 curriculum writers to produce 200+ lesson plans per academic year',
          ],
        },
        {
          title: 'Curriculum Specialist',
          company: 'Lakewood Unified School District',
          startDate: '2016-09',
          endDate: '2020-07',
          achievements: [
            'Aligned ELA and math curricula to Common Core standards across 12 elementary schools',
            'Created professional development workshops attended by 150+ teachers annually',
            'Reduced curriculum development costs by 25% through open educational resource integration',
          ],
        },
      ],
      education: [{ institution: 'University of Virginia', degree: 'Master of Education', field: 'Curriculum and Instruction', startDate: '2014-09', endDate: '2016-05' }],
      certifications: [{ name: 'Certified Instructional Designer', issuer: 'ATD', date: '2019-03' }],
    }),
    faqs: [
      { question: 'What should a curriculum developer resume include?', answer: 'Highlight curriculum design experience, standards alignment expertise, learning management system proficiency, and measurable outcomes like improved test scores or adoption rates.' },
      { question: 'What qualifications do curriculum developers need?', answer: 'Most positions require a master\'s degree in education or instructional design, plus experience in curriculum development. Certifications from ATD or ISTE are valuable additions.' },
      { question: 'How do I quantify curriculum development achievements?', answer: 'Include metrics such as the number of schools or students served, percentage improvements in assessment scores, volume of materials produced, and training participation rates.' },
    ],
  },
];
