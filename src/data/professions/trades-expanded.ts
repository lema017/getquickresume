import { buildResumeData } from './_helpers';
import type { ProfessionPageData } from './index';

export const professions: ProfessionPageData[] = [
  {
    slug: 'plumber',
    title: 'Plumber',
    templateStyle: 'regular',
    keywords: ['plumber resume', 'plumbing resume', 'journeyman plumber resume', 'plumber CV'],
    searchIntents: ['plumber resume example', 'how to write a plumber resume', 'plumbing resume template'],
    totalMonthlySearches: 3600,
    topSkills: [
      'Pipe Installation & Repair',
      'Leak Detection',
      'Water Heater Systems',
      'Drain Cleaning',
      'Blueprint Reading',
      'Soldering & Brazing',
      'Backflow Prevention',
      'Code Compliance',
      'Gas Line Installation',
      'Customer Service',
    ],
    atsKeywords: [
      'plumbing systems',
      'water heater installation',
      'pipe fitting',
      'drain cleaning',
      'backflow prevention',
      'soldering',
      'code compliance',
      'leak detection',
      'gas lines',
      'residential plumbing',
      'commercial plumbing',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Derek',
      lastName: 'Sullivan',
      profession: 'Plumber',
      summary:
        'Licensed journeyman plumber with 8+ years of experience in residential and commercial plumbing. Completed over 1,200 service calls with a 98% customer satisfaction rating. Skilled in new construction rough-ins, fixture installation, and complex drain line repairs.',
      skills: [
        'Pipe Installation & Repair',
        'Leak Detection',
        'Water Heater Systems',
        'Drain Cleaning',
        'Blueprint Reading',
        'Soldering & Brazing',
        'Backflow Prevention',
        'Code Compliance',
        'Gas Line Installation',
        'Customer Service',
      ],
      experience: [
        {
          title: 'Journeyman Plumber',
          company: 'Roto-Rooter',
          startDate: '2021-01',
          isCurrent: true,
          achievements: [
            'Complete an average of 8 residential and commercial service calls per day, maintaining a 98% first-visit resolution rate',
            'Installed over 150 tankless water heaters in the past year, generating $420K in revenue for the branch',
            'Reduced callback rate by 22% by implementing a pre-departure quality checklist for all technicians on the team',
          ],
        },
        {
          title: 'Apprentice Plumber',
          company: 'ARS/Rescue Rooter',
          startDate: '2017-06',
          endDate: '2020-12',
          achievements: [
            'Assisted in the installation of plumbing systems for 35+ new construction residential projects',
            'Performed drain cleaning and camera inspections on over 600 service calls annually',
            'Earned Journeyman Plumber license within 3.5 years, 6 months ahead of the standard apprenticeship timeline',
          ],
        },
      ],
      education: [
        {
          institution: 'Tulsa Welding School & Technology Center',
          degree: 'Diploma',
          field: 'Plumbing Technology',
          startDate: '2016-01',
          endDate: '2017-05',
        },
      ],
      certifications: [
        { name: 'Journeyman Plumber License', issuer: 'State of Texas', date: '2020-11' },
        { name: 'Backflow Prevention Certification', issuer: 'ASSE', date: '2021-03' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications should a plumber include on a resume?',
        answer:
          'Include your Journeyman or Master Plumber license, backflow prevention certification, gas line certification, and any state-specific licenses. These demonstrate compliance with local codes and regulations.',
      },
      {
        question: 'How do I highlight experience on a plumbing resume?',
        answer:
          'Quantify your work with metrics such as service calls per day, first-visit resolution rates, revenue generated from installations, and callback reduction percentages.',
      },
      {
        question: 'Should I include apprenticeship experience on my plumber resume?',
        answer:
          'Yes. Apprenticeship is critical in the trades. Detail the types of systems you worked on, the number of projects completed, and when you earned your license.',
      },
    ],
  },

  {
    slug: 'welder',
    title: 'Welder',
    templateStyle: 'regular',
    keywords: ['welder resume', 'welding resume', 'certified welder resume', 'welder CV'],
    searchIntents: ['welder resume example', 'how to write a welding resume', 'certified welder resume template'],
    totalMonthlySearches: 4200,
    topSkills: [
      'MIG Welding',
      'TIG Welding',
      'Stick Welding',
      'Flux-Core Welding',
      'Blueprint Reading',
      'Metal Fabrication',
      'Plasma Cutting',
      'Structural Welding',
      'Quality Inspection',
      'OSHA Safety Compliance',
    ],
    atsKeywords: [
      'MIG',
      'TIG',
      'stick welding',
      'flux-core',
      'blueprint reading',
      'metal fabrication',
      'structural welding',
      'AWS certified',
      'plasma cutting',
      'weld inspection',
      'OSHA',
      'pipeline welding',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Travis',
      lastName: 'Kowalski',
      profession: 'Welder',
      summary:
        'AWS-certified welder with 7+ years of experience in structural and pipeline welding. Maintained a 99.5% weld pass rate across 3,000+ inspected joints. Proficient in MIG, TIG, stick, and flux-core processes on carbon steel, stainless steel, and aluminum.',
      skills: [
        'MIG Welding',
        'TIG Welding',
        'Stick Welding',
        'Flux-Core Welding',
        'Blueprint Reading',
        'Metal Fabrication',
        'Plasma Cutting',
        'Structural Welding',
        'Quality Inspection',
        'OSHA Safety Compliance',
      ],
      experience: [
        {
          title: 'Structural Welder',
          company: 'Turner Construction',
          startDate: '2021-04',
          isCurrent: true,
          achievements: [
            'Weld structural steel components for commercial projects valued at up to $50M, maintaining a 99.5% visual and X-ray inspection pass rate',
            'Trained 5 junior welders on proper TIG techniques, reducing rework rates across the crew by 30%',
            'Completed 12 critical path welds on a high-rise project ahead of schedule, saving 4 days of crane time',
          ],
        },
        {
          title: 'Combination Welder',
          company: 'Bechtel Corporation',
          startDate: '2017-08',
          endDate: '2021-03',
          achievements: [
            'Performed MIG, TIG, and stick welding on pipeline and refinery projects across 6 states',
            'Achieved a 98.7% first-pass weld acceptance rate on over 2,000 inspected joints',
            'Maintained zero lost-time incidents over 3.5 years by adhering to strict safety protocols',
          ],
        },
      ],
      education: [
        {
          institution: 'Hobart Institute of Welding Technology',
          degree: 'Certificate',
          field: 'Welding Technology',
          startDate: '2016-01',
          endDate: '2017-06',
        },
      ],
      certifications: [
        { name: 'AWS Certified Welder', issuer: 'American Welding Society', date: '2017-07' },
        { name: 'OSHA 30-Hour Construction', issuer: 'OSHA', date: '2018-02' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications matter most for a welder resume?',
        answer:
          'AWS Certified Welder is the gold standard. Also include any process-specific certifications (6G pipe, structural) and OSHA safety cards.',
      },
      {
        question: 'How should a welder quantify achievements on a resume?',
        answer:
          'Use weld pass rates, number of inspected joints, project values, rework reduction percentages, and safety records such as zero lost-time incidents.',
      },
      {
        question: 'Should I list welding processes on my resume?',
        answer:
          'Yes. Specify every process you are certified in (MIG, TIG, stick, flux-core) and the materials you work with (carbon steel, stainless, aluminum).',
      },
    ],
  },

  {
    slug: 'mason',
    title: 'Mason',
    templateStyle: 'regular',
    keywords: ['mason resume', 'bricklayer resume', 'masonry resume', 'mason CV'],
    searchIntents: ['mason resume example', 'how to write a masonry resume', 'bricklayer resume template'],
    totalMonthlySearches: 1400,
    topSkills: [
      'Brick & Block Laying',
      'Mortar Mixing',
      'Blueprint Reading',
      'Stone Masonry',
      'Concrete Finishing',
      'Scaffolding Setup',
      'Tuckpointing',
      'Restoration Work',
      'OSHA Safety',
    ],
    atsKeywords: [
      'brick laying',
      'block laying',
      'mortar',
      'stone masonry',
      'concrete finishing',
      'tuckpointing',
      'scaffolding',
      'restoration',
      'blueprint reading',
      'commercial masonry',
      'OSHA',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Marco',
      lastName: 'Vitale',
      profession: 'Mason',
      summary:
        'Experienced mason with 10+ years in commercial and residential brick, block, and stone construction. Completed masonry work on over 80 projects including schools, hospitals, and luxury residences. Skilled in restoration, tuckpointing, and decorative stonework.',
      skills: [
        'Brick & Block Laying',
        'Mortar Mixing',
        'Blueprint Reading',
        'Stone Masonry',
        'Concrete Finishing',
        'Scaffolding Setup',
        'Tuckpointing',
        'Restoration Work',
        'OSHA Safety',
        'Crew Leadership',
      ],
      experience: [
        {
          title: 'Lead Mason',
          company: 'Skanska USA',
          startDate: '2020-03',
          isCurrent: true,
          achievements: [
            'Lead a crew of 8 masons on commercial projects averaging $12M in value, completing all masonry scopes on time',
            'Laid over 3,500 bricks per day on a hospital expansion project, exceeding production targets by 18%',
            'Reduced material waste by 12% through improved mortar batching and brick cutting techniques',
          ],
        },
        {
          title: 'Journeyman Mason',
          company: 'Clark Construction Group',
          startDate: '2014-06',
          endDate: '2020-02',
          achievements: [
            'Performed brick, block, and stone installation on 45+ commercial and institutional projects',
            'Completed a historic church restoration project 2 weeks ahead of schedule while meeting strict preservation standards',
            'Maintained a zero-deficiency record across 12 consecutive quality inspections',
          ],
        },
      ],
      education: [
        {
          institution: 'International Masonry Institute',
          degree: 'Certificate',
          field: 'Masonry Technology',
          startDate: '2012-09',
          endDate: '2014-05',
        },
      ],
      certifications: [
        { name: 'OSHA 30-Hour Construction', issuer: 'OSHA', date: '2015-01' },
        { name: 'MCAA Certified Mason', issuer: 'Mason Contractors Association of America', date: '2016-04' },
      ],
    }),
    faqs: [
      {
        question: 'What should a mason highlight on a resume?',
        answer:
          'Emphasize the types of masonry you specialize in (brick, block, stone), the scale of projects, production rates, and any quality or safety records.',
      },
      {
        question: 'How do I show masonry experience without formal education?',
        answer:
          'List apprenticeship training, on-the-job experience, and any union certifications. Detail the number and types of projects you have completed.',
      },
      {
        question: 'Are certifications important for a mason resume?',
        answer:
          'Yes. OSHA safety certification is expected, and MCAA certification or union journeyman status demonstrates verified skill and professionalism.',
      },
    ],
  },

  {
    slug: 'heavy-equipment-operator',
    title: 'Heavy Equipment Operator',
    templateStyle: 'regular',
    keywords: ['heavy equipment operator resume', 'equipment operator resume', 'crane operator resume', 'heavy equipment operator CV'],
    searchIntents: ['heavy equipment operator resume example', 'how to write an equipment operator resume', 'heavy equipment resume template'],
    totalMonthlySearches: 2800,
    topSkills: [
      'Excavator Operation',
      'Bulldozer Operation',
      'Crane Operation',
      'Grading & Leveling',
      'GPS Machine Control',
      'Loader Operation',
      'Preventive Maintenance',
      'Safety Compliance',
      'Trenching',
      'Site Preparation',
    ],
    atsKeywords: [
      'excavator',
      'bulldozer',
      'crane',
      'grading',
      'GPS machine control',
      'loader',
      'backhoe',
      'preventive maintenance',
      'trenching',
      'site prep',
      'OSHA',
      'CDL',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Brent',
      lastName: 'Hargrove',
      profession: 'Heavy Equipment Operator',
      summary:
        'Certified heavy equipment operator with 9+ years of experience operating excavators, bulldozers, cranes, and loaders on highway, commercial, and residential projects. Logged over 8,000 equipment hours with zero recordable incidents.',
      skills: [
        'Excavator Operation',
        'Bulldozer Operation',
        'Crane Operation',
        'Grading & Leveling',
        'GPS Machine Control',
        'Loader Operation',
        'Preventive Maintenance',
        'Safety Compliance',
        'Trenching',
        'Site Preparation',
      ],
      experience: [
        {
          title: 'Senior Equipment Operator',
          company: 'Granite Construction',
          startDate: '2020-05',
          isCurrent: true,
          achievements: [
            'Operate excavators and bulldozers on highway projects valued at up to $85M, consistently meeting daily yardage targets',
            'Utilized GPS machine control to achieve finish grade accuracy within 0.05 ft, reducing rework by 25%',
            'Logged 2,400+ hours annually with zero equipment damage incidents through rigorous pre-shift inspections',
          ],
        },
        {
          title: 'Equipment Operator',
          company: 'Kiewit Corporation',
          startDate: '2015-08',
          endDate: '2020-04',
          achievements: [
            'Operated loaders, backhoes, and scrapers on 20+ commercial and infrastructure projects across 4 states',
            'Completed excavation for a 12-story foundation 3 days ahead of schedule, saving $45K in crane rental costs',
            'Performed daily preventive maintenance checks, contributing to a 98% equipment uptime rate for the fleet',
          ],
        },
      ],
      education: [
        {
          institution: 'Associated Training Services',
          degree: 'Certificate',
          field: 'Heavy Equipment Operation',
          startDate: '2014-06',
          endDate: '2015-06',
        },
      ],
      certifications: [
        { name: 'NCCCO Crane Operator Certification', issuer: 'National Commission for the Certification of Crane Operators', date: '2018-03' },
        { name: 'OSHA 30-Hour Construction', issuer: 'OSHA', date: '2016-01' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications should a heavy equipment operator include?',
        answer:
          'NCCCO crane certification, CDL if applicable, OSHA safety cards, and any manufacturer-specific training certificates are highly valued.',
      },
      {
        question: 'How do I quantify achievements as an equipment operator?',
        answer:
          'Include equipment hours logged, project values, yardage moved, grade accuracy tolerances, uptime percentages, and safety records.',
      },
      {
        question: 'Should I list every type of equipment I can operate?',
        answer:
          'Yes. Create a dedicated skills section listing each machine type (excavator, bulldozer, loader, crane, etc.) since employers often search for specific equipment experience.',
      },
    ],
  },

  {
    slug: 'hvac-technician',
    title: 'HVAC Technician',
    templateStyle: 'regular',
    keywords: ['HVAC technician resume', 'HVAC resume', 'heating and cooling resume', 'HVAC technician CV'],
    searchIntents: ['HVAC technician resume example', 'how to write an HVAC resume', 'HVAC service technician resume template'],
    totalMonthlySearches: 5400,
    topSkills: [
      'HVAC Installation',
      'Refrigerant Handling',
      'Electrical Troubleshooting',
      'Ductwork Fabrication',
      'Preventive Maintenance',
      'EPA 608 Compliance',
      'Load Calculations',
      'Commercial HVAC Systems',
      'Heat Pump Systems',
      'Customer Relations',
    ],
    atsKeywords: [
      'HVAC installation',
      'refrigerant',
      'EPA 608',
      'ductwork',
      'electrical troubleshooting',
      'preventive maintenance',
      'commercial HVAC',
      'residential HVAC',
      'heat pump',
      'load calculations',
      'thermostats',
      'compressors',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Dustin',
      lastName: 'Pratt',
      profession: 'HVAC Technician',
      summary:
        'EPA-certified HVAC technician with 7+ years of experience installing, maintaining, and repairing residential and commercial heating and cooling systems. Completed over 2,500 service calls with a 96% first-visit resolution rate.',
      skills: [
        'HVAC Installation',
        'Refrigerant Handling',
        'Electrical Troubleshooting',
        'Ductwork Fabrication',
        'Preventive Maintenance',
        'EPA 608 Compliance',
        'Load Calculations',
        'Commercial HVAC Systems',
        'Heat Pump Systems',
        'Customer Relations',
      ],
      experience: [
        {
          title: 'Senior HVAC Technician',
          company: 'Carrier Global',
          startDate: '2021-02',
          isCurrent: true,
          achievements: [
            'Service and maintain HVAC systems for 120+ commercial accounts, ensuring 99% uptime during peak seasons',
            'Install an average of 6 residential HVAC systems per week, generating $380K in quarterly revenue for the branch',
            'Reduced emergency callback rate by 28% through implementation of comprehensive preventive maintenance protocols',
          ],
        },
        {
          title: 'HVAC Service Technician',
          company: 'Trane Technologies',
          startDate: '2017-05',
          endDate: '2021-01',
          achievements: [
            'Completed 10-12 residential service calls per day including diagnostics, repairs, and system replacements',
            'Achieved 96% customer satisfaction rating across 1,800+ documented service visits',
            'Earned NATE certification in air conditioning and heat pump installation within first year of employment',
          ],
        },
      ],
      education: [
        {
          institution: 'Lincoln Technical Institute',
          degree: 'Diploma',
          field: 'HVAC-R Technology',
          startDate: '2015-09',
          endDate: '2017-04',
        },
      ],
      certifications: [
        { name: 'EPA Section 608 Universal Certification', issuer: 'EPA', date: '2017-05' },
        { name: 'NATE Certified Technician', issuer: 'North American Technician Excellence', date: '2018-06' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications are essential for an HVAC resume?',
        answer:
          'EPA Section 608 certification is mandatory. NATE certification, OSHA safety cards, and manufacturer-specific training (Carrier, Trane, Lennox) significantly boost your resume.',
      },
      {
        question: 'How should an HVAC technician describe daily work on a resume?',
        answer:
          'Focus on service calls per day, first-visit resolution rates, system types serviced, and customer satisfaction scores rather than generic task descriptions.',
      },
      {
        question: 'Is formal education required for an HVAC technician resume?',
        answer:
          'Trade school or an apprenticeship program is standard. If you learned on the job, emphasize years of experience, certifications, and specific systems you are qualified to service.',
      },
    ],
  },

  {
    slug: 'diesel-mechanic',
    title: 'Diesel Mechanic',
    templateStyle: 'regular',
    keywords: ['diesel mechanic resume', 'diesel technician resume', 'heavy duty mechanic resume', 'diesel mechanic CV'],
    searchIntents: ['diesel mechanic resume example', 'how to write a diesel technician resume', 'diesel mechanic resume template'],
    totalMonthlySearches: 3100,
    topSkills: [
      'Diesel Engine Diagnostics',
      'Fuel Injection Systems',
      'Hydraulic Systems',
      'Electrical Troubleshooting',
      'Preventive Maintenance',
      'Brake Systems',
      'Emissions Systems',
      'Fleet Maintenance',
      'Welding',
      'ASE Certification',
    ],
    atsKeywords: [
      'diesel engine',
      'fuel injection',
      'hydraulic systems',
      'electrical troubleshooting',
      'preventive maintenance',
      'fleet maintenance',
      'emissions',
      'brake systems',
      'ASE certified',
      'DOT inspection',
      'turbocharger',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Wayne',
      lastName: 'Beckett',
      profession: 'Diesel Mechanic',
      summary:
        'ASE-certified diesel mechanic with 8+ years of experience maintaining and repairing Class 6-8 trucks, heavy equipment, and fleet vehicles. Maintained a fleet of 200+ vehicles with 97% uptime through proactive diagnostics and preventive maintenance programs.',
      skills: [
        'Diesel Engine Diagnostics',
        'Fuel Injection Systems',
        'Hydraulic Systems',
        'Electrical Troubleshooting',
        'Preventive Maintenance',
        'Brake Systems',
        'Emissions Systems',
        'Fleet Maintenance',
        'Welding',
        'ASE Certification',
      ],
      experience: [
        {
          title: 'Senior Diesel Technician',
          company: 'Penske Truck Leasing',
          startDate: '2020-06',
          isCurrent: true,
          achievements: [
            'Diagnose and repair an average of 6 Class 8 trucks per day across engine, transmission, and electrical systems',
            'Maintain a fleet of 200+ leased vehicles at 97% uptime, exceeding the company target of 95%',
            'Reduced unscheduled breakdowns by 20% by implementing a predictive maintenance checklist based on telematics data',
          ],
        },
        {
          title: 'Diesel Mechanic',
          company: 'Rush Enterprises',
          startDate: '2016-03',
          endDate: '2020-05',
          achievements: [
            'Performed DOT inspections, engine overhauls, and aftertreatment system repairs on Peterbilt and Kenworth trucks',
            'Completed 40+ engine rebuilds with zero warranty returns over a 4-year period',
            'Earned ASE Master Heavy-Duty Truck Technician status by passing all 6 certification exams within 2 years',
          ],
        },
      ],
      education: [
        {
          institution: 'WyoTech',
          degree: 'Diploma',
          field: 'Diesel Technology',
          startDate: '2014-06',
          endDate: '2016-02',
        },
      ],
      certifications: [
        { name: 'ASE Master Heavy-Duty Truck Technician', issuer: 'National Institute for Automotive Service Excellence', date: '2019-08' },
        { name: 'DOT Brake Inspector Certification', issuer: 'FMCSA', date: '2017-04' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications should a diesel mechanic highlight?',
        answer:
          'ASE Heavy-Duty Truck certifications (T1-T8) are the industry standard. Also include DOT brake inspector certification and any manufacturer-specific training (Cummins, Detroit Diesel, Caterpillar).',
      },
      {
        question: 'How do I quantify diesel mechanic experience?',
        answer:
          'Include fleet size maintained, uptime percentages, vehicles repaired per day, engine rebuild counts, and safety records such as zero warranty returns.',
      },
      {
        question: 'Is a trade school diploma necessary for a diesel mechanic resume?',
        answer:
          'While not always required, it strengthens your resume. If you trained on the job, emphasize ASE certifications, years of hands-on experience, and the specific systems you specialize in.',
      },
    ],
  },

  {
    slug: 'motorcycle-mechanic',
    title: 'Motorcycle Mechanic',
    templateStyle: 'regular',
    keywords: ['motorcycle mechanic resume', 'motorcycle technician resume', 'powersports technician resume', 'motorcycle mechanic CV'],
    searchIntents: ['motorcycle mechanic resume example', 'how to write a motorcycle technician resume', 'powersports mechanic resume template'],
    totalMonthlySearches: 1200,
    topSkills: [
      'Engine Rebuilds',
      'Fuel Injection Tuning',
      'Electrical Diagnostics',
      'Suspension Setup',
      'Brake Service',
      'Carburetor Rebuilds',
      'Dyno Tuning',
      'Chain & Sprocket Service',
      'Customer Consultation',
      'Parts Ordering',
    ],
    atsKeywords: [
      'motorcycle repair',
      'engine rebuild',
      'fuel injection',
      'electrical diagnostics',
      'suspension',
      'brake service',
      'carburetor',
      'dyno tuning',
      'powersports',
      'Harley-Davidson',
      'Honda',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Jared',
      lastName: 'Nishimura',
      profession: 'Motorcycle Mechanic',
      summary:
        'Certified motorcycle technician with 6+ years of experience servicing Harley-Davidson, Honda, Yamaha, and Kawasaki motorcycles. Completed over 1,500 service orders with a 99% customer satisfaction rating. Skilled in engine rebuilds, fuel injection tuning, and performance upgrades.',
      skills: [
        'Engine Rebuilds',
        'Fuel Injection Tuning',
        'Electrical Diagnostics',
        'Suspension Setup',
        'Brake Service',
        'Carburetor Rebuilds',
        'Dyno Tuning',
        'Chain & Sprocket Service',
        'Customer Consultation',
        'Parts Ordering',
      ],
      experience: [
        {
          title: 'Lead Motorcycle Technician',
          company: 'Harley-Davidson of Scottsdale',
          startDate: '2021-03',
          isCurrent: true,
          achievements: [
            'Service an average of 7 motorcycles per day including scheduled maintenance, engine work, and electrical diagnostics',
            'Increased parts-and-accessories attachment rate by 35% through customer consultation on performance upgrades',
            'Trained 2 apprentice technicians on Harley-Davidson diagnostic software and service procedures',
          ],
        },
        {
          title: 'Motorcycle Technician',
          company: 'Cycle Gear / RevZilla Service Center',
          startDate: '2018-01',
          endDate: '2021-02',
          achievements: [
            'Performed engine rebuilds, suspension setups, and brake service on 800+ sport and touring motorcycles annually',
            'Maintained a 99% customer satisfaction rating across all documented service orders',
            'Completed Yamaha Star Technical Academy certification within first 6 months of employment',
          ],
        },
      ],
      education: [
        {
          institution: 'Motorcycle Mechanics Institute',
          degree: 'Diploma',
          field: 'Motorcycle Technology',
          startDate: '2016-06',
          endDate: '2017-12',
        },
      ],
      certifications: [
        { name: 'Harley-Davidson Certified Technician', issuer: 'Harley-Davidson Motor Company', date: '2021-05' },
        { name: 'Yamaha Star Technical Academy', issuer: 'Yamaha Motor Corporation', date: '2018-07' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications help a motorcycle mechanic resume stand out?',
        answer:
          'Manufacturer-specific certifications from Harley-Davidson, Honda, Yamaha, or BMW carry the most weight. MMI (Motorcycle Mechanics Institute) training is also well-regarded.',
      },
      {
        question: 'How should a motorcycle mechanic describe experience?',
        answer:
          'Mention the brands and types of motorcycles serviced, volume of service orders, customer satisfaction ratings, and any performance upgrade work.',
      },
      {
        question: 'Is dyno tuning experience worth including?',
        answer:
          'Absolutely. Dyno tuning and performance work differentiate you from general service technicians and appeal to high-performance shops and dealerships.',
      },
    ],
  },

  {
    slug: 'tool-and-die-maker',
    title: 'Tool and Die Maker',
    templateStyle: 'regular',
    keywords: ['tool and die maker resume', 'toolmaker resume', 'die maker resume', 'tool and die maker CV'],
    searchIntents: ['tool and die maker resume example', 'how to write a toolmaker resume', 'tool and die resume template'],
    totalMonthlySearches: 900,
    topSkills: [
      'Die Design & Construction',
      'CNC Programming',
      'EDM Operation',
      'Precision Grinding',
      'GD&T Interpretation',
      'Blueprint Reading',
      'Heat Treating',
      'Jig & Fixture Design',
      'Quality Inspection',
      'SolidWorks / CAD',
    ],
    atsKeywords: [
      'tool and die',
      'CNC programming',
      'EDM',
      'precision grinding',
      'GD&T',
      'blueprint reading',
      'heat treating',
      'jig and fixture',
      'stamping dies',
      'injection molds',
      'quality inspection',
      'SolidWorks',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Gerald',
      lastName: 'Voss',
      profession: 'Tool and Die Maker',
      summary:
        'Journeyman tool and die maker with 12+ years of experience designing, building, and maintaining progressive stamping dies and injection molds. Reduced die changeover time by 40% and maintained tolerances within ±0.0005 inches across all production tooling.',
      skills: [
        'Die Design & Construction',
        'CNC Programming',
        'EDM Operation',
        'Precision Grinding',
        'GD&T Interpretation',
        'Blueprint Reading',
        'Heat Treating',
        'Jig & Fixture Design',
        'Quality Inspection',
        'SolidWorks / CAD',
      ],
      experience: [
        {
          title: 'Senior Tool and Die Maker',
          company: 'Magna International',
          startDate: '2019-01',
          isCurrent: true,
          achievements: [
            'Design and build progressive stamping dies for automotive body panels, maintaining tolerances of ±0.0005 in across all tooling',
            'Reduced die changeover time by 40% by redesigning quick-change inserts, saving $120K annually in press downtime',
            'Mentor 4 apprentice toolmakers on CNC programming, EDM operation, and precision grinding techniques',
          ],
        },
        {
          title: 'Tool and Die Maker',
          company: 'Martinrea International',
          startDate: '2012-06',
          endDate: '2018-12',
          achievements: [
            'Built and maintained over 60 progressive and transfer dies for high-volume automotive stamping lines',
            'Programmed and operated CNC mills, lathes, and wire EDM machines to produce die components within specification',
            'Achieved a 99.2% first-article inspection pass rate on all new tooling builds over a 6-year period',
          ],
        },
      ],
      education: [
        {
          institution: 'Macomb Community College',
          degree: 'Associate Degree',
          field: 'Tool & Die Technology',
          startDate: '2008-09',
          endDate: '2012-05',
        },
      ],
      certifications: [
        { name: 'Journeyman Tool and Die Maker', issuer: 'U.S. Department of Labor', date: '2016-06' },
        { name: 'SolidWorks CSWA', issuer: 'Dassault Systèmes', date: '2017-09' },
      ],
    }),
    faqs: [
      {
        question: 'What technical skills should a tool and die maker list?',
        answer:
          'Include CNC programming, EDM operation, precision grinding, GD&T, blueprint reading, CAD/CAM software, and the types of tooling you specialize in (progressive dies, injection molds, jigs and fixtures).',
      },
      {
        question: 'How do I demonstrate precision on a toolmaker resume?',
        answer:
          'Specify tolerances you consistently hold (e.g., ±0.0005 in), first-article pass rates, and the complexity of tooling you have built.',
      },
      {
        question: 'Is an apprenticeship important to mention?',
        answer:
          'Yes. A completed journeyman apprenticeship is highly respected in this trade. Include the duration, the skills learned, and any Department of Labor credentials earned.',
      },
    ],
  },

  {
    slug: 'cnc-operator',
    title: 'CNC Operator',
    templateStyle: 'regular',
    keywords: ['CNC operator resume', 'CNC machinist resume', 'CNC programmer resume', 'CNC operator CV'],
    searchIntents: ['CNC operator resume example', 'how to write a CNC machinist resume', 'CNC operator resume template'],
    totalMonthlySearches: 2600,
    topSkills: [
      'CNC Mill Operation',
      'CNC Lathe Operation',
      'G-Code Programming',
      'Blueprint Reading',
      'GD&T',
      'Precision Measurement',
      'Tool Offsets & Setup',
      'Quality Control',
      'Mastercam / CAM Software',
      'Preventive Maintenance',
    ],
    atsKeywords: [
      'CNC mill',
      'CNC lathe',
      'G-code',
      'M-code',
      'blueprint reading',
      'GD&T',
      'precision measurement',
      'Mastercam',
      'tool offsets',
      'quality control',
      'first article inspection',
      'tight tolerances',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Keith',
      lastName: 'Olson',
      profession: 'CNC Operator',
      summary:
        'Skilled CNC operator with 6+ years of experience programming and operating 3-axis and 5-axis CNC mills and lathes. Consistently maintain tolerances within ±0.001 inches and a scrap rate below 0.5% across high-volume production runs.',
      skills: [
        'CNC Mill Operation',
        'CNC Lathe Operation',
        'G-Code Programming',
        'Blueprint Reading',
        'GD&T',
        'Precision Measurement',
        'Tool Offsets & Setup',
        'Quality Control',
        'Mastercam / CAM Software',
        'Preventive Maintenance',
      ],
      experience: [
        {
          title: 'CNC Operator / Programmer',
          company: 'SpaceX',
          startDate: '2022-01',
          isCurrent: true,
          achievements: [
            'Program and operate 5-axis CNC mills to produce aerospace-grade components with tolerances of ±0.0005 in',
            'Reduced cycle time by 15% on a high-volume rocket engine bracket by optimizing toolpaths in Mastercam',
            'Maintain a 99.8% first-article inspection pass rate across all new program setups',
          ],
        },
        {
          title: 'CNC Mill Operator',
          company: 'General Dynamics',
          startDate: '2018-04',
          endDate: '2021-12',
          achievements: [
            'Operated 3 CNC vertical mills simultaneously, producing 200+ precision parts per shift for defense contracts',
            'Achieved a scrap rate of 0.4%, well below the department average of 1.2%',
            'Trained 3 new operators on machine setup, tool offset adjustments, and first-article inspection procedures',
          ],
        },
      ],
      education: [
        {
          institution: 'Vincennes University',
          degree: 'Associate Degree',
          field: 'Computer Integrated Manufacturing',
          startDate: '2016-08',
          endDate: '2018-05',
        },
      ],
      certifications: [
        { name: 'NIMS CNC Milling Certification', issuer: 'National Institute for Metalworking Skills', date: '2018-06' },
        { name: 'Mastercam Certified Programmer', issuer: 'CNC Software / Mastercam', date: '2019-11' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications make a CNC operator resume competitive?',
        answer:
          'NIMS certifications in CNC milling or turning are the industry standard. Mastercam or other CAM software certifications also add value.',
      },
      {
        question: 'How should a CNC operator describe precision on a resume?',
        answer:
          'Specify the tolerances you hold (e.g., ±0.001 in or ±0.0005 in), scrap rates, first-article pass rates, and the types of materials you machine.',
      },
      {
        question: 'Is G-code programming worth highlighting?',
        answer:
          'Yes. Operators who can write and edit G-code are more valuable than those who only run pre-loaded programs. Mention any CAM software you use as well.',
      },
    ],
  },

  {
    slug: 'machinist',
    title: 'Machinist',
    templateStyle: 'regular',
    keywords: ['machinist resume', 'precision machinist resume', 'manual machinist resume', 'machinist CV'],
    searchIntents: ['machinist resume example', 'how to write a machinist resume', 'precision machinist resume template'],
    totalMonthlySearches: 2900,
    topSkills: [
      'Manual Milling',
      'Manual Lathe Operation',
      'CNC Operation',
      'Blueprint Reading',
      'GD&T',
      'Precision Measurement',
      'Surface Grinding',
      'Heat Treatment Knowledge',
      'Tool Sharpening',
      'Quality Assurance',
    ],
    atsKeywords: [
      'manual mill',
      'manual lathe',
      'CNC',
      'blueprint reading',
      'GD&T',
      'precision measurement',
      'surface grinding',
      'micrometer',
      'calipers',
      'CMM',
      'tight tolerances',
      'prototype machining',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Roland',
      lastName: 'Strasser',
      profession: 'Machinist',
      summary:
        'Precision machinist with 10+ years of experience in manual and CNC machining of aerospace and medical-grade components. Maintained tolerances of ±0.0002 inches on prototype and production parts. Proficient in reading complex blueprints with GD&T callouts.',
      skills: [
        'Manual Milling',
        'Manual Lathe Operation',
        'CNC Operation',
        'Blueprint Reading',
        'GD&T',
        'Precision Measurement',
        'Surface Grinding',
        'Heat Treatment Knowledge',
        'Tool Sharpening',
        'Quality Assurance',
      ],
      experience: [
        {
          title: 'Lead Machinist',
          company: 'Raytheon Technologies',
          startDate: '2020-02',
          isCurrent: true,
          achievements: [
            'Machine aerospace components to tolerances of ±0.0002 in on manual mills, lathes, and surface grinders',
            'Lead a team of 6 machinists producing flight-critical parts, achieving a 99.5% quality acceptance rate',
            'Reduced setup time by 20% by designing custom fixturing, saving an estimated $80K annually',
          ],
        },
        {
          title: 'Precision Machinist',
          company: 'Stryker Corporation',
          startDate: '2014-05',
          endDate: '2020-01',
          achievements: [
            'Machined over 5,000 medical device components annually from titanium, stainless steel, and PEEK materials',
            'Maintained a first-pass yield of 98.8% on FDA-regulated production parts',
            'Programmed and operated CNC lathes and mills for both prototype and production runs',
          ],
        },
      ],
      education: [
        {
          institution: 'Dunwoody College of Technology',
          degree: 'Associate Degree',
          field: 'Machine Tool Technology',
          startDate: '2012-09',
          endDate: '2014-05',
        },
      ],
      certifications: [
        { name: 'NIMS Machining Level II', issuer: 'National Institute for Metalworking Skills', date: '2015-03' },
        { name: 'AS9100 Internal Auditor', issuer: 'SAE International', date: '2021-06' },
      ],
    }),
    faqs: [
      {
        question: 'What skills are most important on a machinist resume?',
        answer:
          'Emphasize both manual and CNC capabilities, the tightest tolerances you can hold, materials you work with, and blueprint/GD&T reading skills.',
      },
      {
        question: 'How do I differentiate a machinist resume from a CNC operator resume?',
        answer:
          'Highlight manual machining skills, prototype work, custom fixturing, and the ability to interpret complex blueprints independently, which go beyond operating pre-programmed CNC machines.',
      },
      {
        question: 'Should I include measurement tools I use?',
        answer:
          'Yes. List micrometers, calipers, height gauges, CMM experience, and any optical comparators or precision instruments you are proficient with.',
      },
    ],
  },

  {
    slug: 'boiler-technician',
    title: 'Boiler Technician',
    templateStyle: 'regular',
    keywords: ['boiler technician resume', 'boiler operator resume', 'stationary engineer resume', 'boiler technician CV'],
    searchIntents: ['boiler technician resume example', 'how to write a boiler operator resume', 'stationary engineer resume template'],
    totalMonthlySearches: 800,
    topSkills: [
      'Boiler Operation & Maintenance',
      'Steam Systems',
      'Water Treatment',
      'Combustion Analysis',
      'Pressure Vessel Inspection',
      'Burner Tuning',
      'PLC Controls',
      'Safety Valve Testing',
      'ASME Code Compliance',
      'Preventive Maintenance',
    ],
    atsKeywords: [
      'boiler operation',
      'steam systems',
      'water treatment',
      'combustion analysis',
      'pressure vessel',
      'burner tuning',
      'PLC',
      'ASME code',
      'safety valves',
      'stationary engineer',
      'boiler license',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Harold',
      lastName: 'Pennington',
      profession: 'Boiler Technician',
      summary:
        'Licensed stationary engineer with 9+ years of experience operating and maintaining high-pressure boiler systems in hospital and industrial settings. Managed boiler plants producing up to 80,000 lbs/hr of steam with zero safety violations over 5 consecutive years.',
      skills: [
        'Boiler Operation & Maintenance',
        'Steam Systems',
        'Water Treatment',
        'Combustion Analysis',
        'Pressure Vessel Inspection',
        'Burner Tuning',
        'PLC Controls',
        'Safety Valve Testing',
        'ASME Code Compliance',
        'Preventive Maintenance',
      ],
      experience: [
        {
          title: 'Senior Boiler Technician',
          company: 'Johns Hopkins Hospital',
          startDate: '2020-04',
          isCurrent: true,
          achievements: [
            'Operate and maintain a 4-boiler plant producing 80,000 lbs/hr of steam for a 1,000-bed hospital campus',
            'Achieved zero safety violations and zero unplanned outages over 4 consecutive years through rigorous preventive maintenance',
            'Reduced fuel consumption by 8% by optimizing burner tuning and combustion air ratios',
          ],
        },
        {
          title: 'Boiler Operator',
          company: 'Siemens Energy',
          startDate: '2015-06',
          endDate: '2020-03',
          achievements: [
            'Operated high-pressure boilers and steam turbines at 3 industrial power plants across the Mid-Atlantic region',
            'Performed water treatment chemical testing and adjustments, maintaining water quality within ASME standards',
            'Completed over 200 safety valve tests and pressure vessel inspections with 100% compliance',
          ],
        },
      ],
      education: [
        {
          institution: 'SUNY Maritime College',
          degree: 'Certificate',
          field: 'Stationary Engineering',
          startDate: '2013-09',
          endDate: '2015-05',
        },
      ],
      certifications: [
        { name: 'Black Seal Stationary Engineer License', issuer: 'State of New Jersey', date: '2015-06' },
        { name: 'ASME Boiler Operator Certification', issuer: 'ASME', date: '2016-09' },
      ],
    }),
    faqs: [
      {
        question: 'What licenses should a boiler technician include on a resume?',
        answer:
          'Include your stationary engineer license grade (Black Seal, Blue Seal, etc.), ASME certifications, and any state-specific boiler operator licenses.',
      },
      {
        question: 'How do I describe boiler operations on a resume?',
        answer:
          'Specify the capacity of systems you operate (lbs/hr of steam), types of boilers, safety records, and any efficiency improvements you achieved.',
      },
      {
        question: 'Is water treatment experience important to mention?',
        answer:
          'Yes. Water treatment is a core competency for boiler technicians. Include chemical testing, treatment programs, and compliance with ASME water quality standards.',
      },
    ],
  },

  {
    slug: 'elevator-technician',
    title: 'Elevator Technician',
    templateStyle: 'regular',
    keywords: ['elevator technician resume', 'elevator mechanic resume', 'elevator installer resume', 'elevator technician CV'],
    searchIntents: ['elevator technician resume example', 'how to write an elevator mechanic resume', 'elevator installer resume template'],
    totalMonthlySearches: 1000,
    topSkills: [
      'Elevator Installation',
      'Elevator Maintenance',
      'Electrical Troubleshooting',
      'Hydraulic Systems',
      'Traction Systems',
      'PLC Programming',
      'Code Compliance',
      'Safety Testing',
      'Blueprint Reading',
      'Modernization Projects',
    ],
    atsKeywords: [
      'elevator installation',
      'elevator maintenance',
      'hydraulic elevator',
      'traction elevator',
      'PLC',
      'electrical troubleshooting',
      'code compliance',
      'safety testing',
      'modernization',
      'ASME A17.1',
      'escalator',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Tyrone',
      lastName: 'Blackwell',
      profession: 'Elevator Technician',
      summary:
        'Licensed elevator mechanic with 8+ years of experience installing, maintaining, and modernizing traction and hydraulic elevator systems. Maintained over 150 elevators across commercial and residential buildings with 99.7% uptime. Proficient in PLC diagnostics and ASME A17.1 code compliance.',
      skills: [
        'Elevator Installation',
        'Elevator Maintenance',
        'Electrical Troubleshooting',
        'Hydraulic Systems',
        'Traction Systems',
        'PLC Programming',
        'Code Compliance',
        'Safety Testing',
        'Blueprint Reading',
        'Modernization Projects',
      ],
      experience: [
        {
          title: 'Elevator Mechanic',
          company: 'Otis Elevator Company',
          startDate: '2020-08',
          isCurrent: true,
          achievements: [
            'Maintain a portfolio of 150+ traction and hydraulic elevators across 40 commercial buildings with 99.7% uptime',
            'Completed 12 full elevator modernization projects, upgrading controllers, drives, and safety systems valued at $200K+ each',
            'Reduced average service response time by 30% by implementing a predictive maintenance schedule based on IoT sensor data',
          ],
        },
        {
          title: 'Elevator Apprentice / Mechanic',
          company: 'ThyssenKrupp Elevator',
          startDate: '2016-03',
          endDate: '2020-07',
          achievements: [
            'Installed 25+ new traction and hydraulic elevator systems in high-rise residential and hospital buildings',
            'Performed monthly safety inspections and annual ASME A17.1 compliance tests on 80+ units',
            'Earned Certified Elevator Technician designation after completing a 4-year IUEC apprenticeship program',
          ],
        },
      ],
      education: [
        {
          institution: 'IUEC National Elevator Industry Educational Program',
          degree: 'Certificate',
          field: 'Elevator Technology',
          startDate: '2016-03',
          endDate: '2020-03',
        },
      ],
      certifications: [
        { name: 'Certified Elevator Technician (CET)', issuer: 'National Association of Elevator Contractors', date: '2020-04' },
        { name: 'OSHA 30-Hour Construction', issuer: 'OSHA', date: '2017-06' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications are important for an elevator technician?',
        answer:
          'The Certified Elevator Technician (CET) from NAEC is the most recognized. Also include your state elevator mechanic license, OSHA certifications, and union journeyman status.',
      },
      {
        question: 'How should an elevator technician showcase experience?',
        answer:
          'Describe the number of elevators maintained, uptime percentages, modernization projects completed, and safety inspection pass rates.',
      },
      {
        question: 'Is the IUEC apprenticeship worth mentioning?',
        answer:
          'Absolutely. The IUEC 4-year apprenticeship is the primary pathway into the trade and is highly respected by employers. Include it prominently in your education section.',
      },
    ],
  },

  {
    slug: 'maintenance-technician',
    title: 'Maintenance Technician',
    templateStyle: 'regular',
    keywords: ['maintenance technician resume', 'building maintenance resume', 'facilities maintenance resume', 'maintenance technician CV'],
    searchIntents: ['maintenance technician resume example', 'how to write a maintenance tech resume', 'building maintenance resume template'],
    totalMonthlySearches: 6800,
    topSkills: [
      'Preventive Maintenance',
      'Electrical Repair',
      'Plumbing Repair',
      'HVAC Basics',
      'Equipment Troubleshooting',
      'Work Order Management',
      'Building Systems',
      'Painting & Drywall',
      'Safety Compliance',
      'Vendor Coordination',
    ],
    atsKeywords: [
      'preventive maintenance',
      'electrical repair',
      'plumbing',
      'HVAC',
      'equipment troubleshooting',
      'work orders',
      'building systems',
      'CMMS',
      'facility maintenance',
      'safety compliance',
      'drywall',
      'painting',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Lonnie',
      lastName: 'Frazier',
      profession: 'Maintenance Technician',
      summary:
        'Versatile maintenance technician with 7+ years of experience maintaining commercial and industrial facilities. Completed over 4,000 work orders spanning electrical, plumbing, HVAC, and general building repairs with a 95% same-day resolution rate.',
      skills: [
        'Preventive Maintenance',
        'Electrical Repair',
        'Plumbing Repair',
        'HVAC Basics',
        'Equipment Troubleshooting',
        'Work Order Management',
        'Building Systems',
        'Painting & Drywall',
        'Safety Compliance',
        'Vendor Coordination',
      ],
      experience: [
        {
          title: 'Senior Maintenance Technician',
          company: 'CBRE Group',
          startDate: '2021-01',
          isCurrent: true,
          achievements: [
            'Maintain a 500,000 sq ft commercial office complex, resolving an average of 15 work orders per day across all building systems',
            'Achieved a 95% same-day work order resolution rate, exceeding the client SLA target of 85%',
            'Reduced emergency repair costs by 18% through implementation of a preventive maintenance program using CMMS software',
          ],
        },
        {
          title: 'Maintenance Technician',
          company: 'JLL (Jones Lang LaSalle)',
          startDate: '2017-04',
          endDate: '2020-12',
          achievements: [
            'Performed electrical, plumbing, and HVAC repairs across 3 managed properties totaling 1.2M sq ft',
            'Completed over 2,500 work orders with a 97% tenant satisfaction rating',
            'Coordinated with 12+ specialty vendors for fire alarm, elevator, and roofing repairs, ensuring all work met code requirements',
          ],
        },
      ],
      education: [
        {
          institution: 'Penn Foster College',
          degree: 'Diploma',
          field: 'Building Maintenance Technology',
          startDate: '2015-06',
          endDate: '2017-03',
        },
      ],
      certifications: [
        { name: 'EPA Section 608 Certification', issuer: 'EPA', date: '2017-08' },
        { name: 'OSHA 10-Hour General Industry', issuer: 'OSHA', date: '2018-01' },
      ],
    }),
    faqs: [
      {
        question: 'What should a maintenance technician emphasize on a resume?',
        answer:
          'Highlight the size of facilities maintained, work order volumes, resolution rates, tenant satisfaction scores, and the range of systems you can repair (electrical, plumbing, HVAC, general).',
      },
      {
        question: 'How important is CMMS experience for a maintenance resume?',
        answer:
          'Very important. Most employers use computerized maintenance management systems. Mention specific platforms you have used (Maximo, eMaint, Fiix) and how you use them to track preventive maintenance.',
      },
      {
        question: 'Do I need certifications as a maintenance technician?',
        answer:
          'EPA 608 for refrigerant handling is common. OSHA safety certification, boiler operator licenses, and any trade-specific credentials also add value.',
      },
    ],
  },

  {
    slug: 'truck-driver',
    title: 'Truck Driver',
    templateStyle: 'regular',
    keywords: ['truck driver resume', 'CDL driver resume', 'OTR truck driver resume', 'truck driver CV'],
    searchIntents: ['truck driver resume example', 'how to write a CDL driver resume', 'truck driver resume template'],
    totalMonthlySearches: 8500,
    topSkills: [
      'CDL Class A Operation',
      'Long-Haul Driving',
      'Load Securement',
      'DOT Compliance',
      'ELD / Electronic Logging',
      'Pre-Trip Inspections',
      'Route Planning',
      'Hazmat Handling',
      'Defensive Driving',
      'Fuel Efficiency',
    ],
    atsKeywords: [
      'CDL Class A',
      'OTR',
      'long haul',
      'load securement',
      'DOT compliance',
      'ELD',
      'pre-trip inspection',
      'hazmat',
      'tanker',
      'doubles/triples',
      'defensive driving',
      'fuel efficiency',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Russell',
      lastName: 'Haynes',
      profession: 'Truck Driver',
      summary:
        'CDL Class A truck driver with 10+ years of OTR and regional experience. Logged over 1.2 million safe miles with zero preventable accidents. Experienced in dry van, flatbed, and hazmat loads across 48 states.',
      skills: [
        'CDL Class A Operation',
        'Long-Haul Driving',
        'Load Securement',
        'DOT Compliance',
        'ELD / Electronic Logging',
        'Pre-Trip Inspections',
        'Route Planning',
        'Hazmat Handling',
        'Defensive Driving',
        'Fuel Efficiency',
      ],
      experience: [
        {
          title: 'OTR Truck Driver',
          company: 'Schneider National',
          startDate: '2019-03',
          isCurrent: true,
          achievements: [
            'Drive 2,500-3,000 miles per week hauling dry van and flatbed loads across 48 states with zero preventable accidents',
            'Maintain a fuel efficiency average of 7.2 MPG, 10% above fleet average, through eco-driving techniques',
            'Achieved Schneider Elite Driver status for 4 consecutive years based on safety, on-time delivery, and customer ratings',
          ],
        },
        {
          title: 'Regional Truck Driver',
          company: 'Werner Enterprises',
          startDate: '2014-06',
          endDate: '2019-02',
          achievements: [
            'Completed an average of 12 deliveries per week across a 7-state Midwest region with 99.4% on-time delivery rate',
            'Logged 500,000+ miles with zero DOT violations and a clean CSA score',
            'Trained 8 new drivers during ride-along orientation, reducing first-90-day incident rates by 25%',
          ],
        },
      ],
      education: [
        {
          institution: 'SAGE Truck Driving School',
          degree: 'Certificate',
          field: 'Commercial Truck Driving',
          startDate: '2014-01',
          endDate: '2014-05',
        },
      ],
      certifications: [
        { name: 'CDL Class A with Hazmat & Tanker Endorsements', issuer: 'State of Ohio', date: '2014-05' },
        { name: 'Smith System Defensive Driving', issuer: 'Smith System', date: '2019-06' },
      ],
    }),
    faqs: [
      {
        question: 'What should a truck driver include on a resume?',
        answer:
          'List your CDL class and endorsements, total safe miles, years of experience, types of freight hauled, and any safety awards or recognition.',
      },
      {
        question: 'How do I quantify truck driving experience?',
        answer:
          'Use total miles driven, on-time delivery rates, fuel efficiency averages, accident-free records, and CSA scores.',
      },
      {
        question: 'Should I list CDL endorsements on my resume?',
        answer:
          'Yes. Hazmat, tanker, doubles/triples, and passenger endorsements expand your job opportunities and should be prominently displayed.',
      },
    ],
  },

  {
    slug: 'bus-driver',
    title: 'Bus Driver',
    templateStyle: 'regular',
    keywords: ['bus driver resume', 'transit bus driver resume', 'school bus driver resume', 'bus driver CV'],
    searchIntents: ['bus driver resume example', 'how to write a bus driver resume', 'transit driver resume template'],
    totalMonthlySearches: 2400,
    topSkills: [
      'CDL Class B Operation',
      'Passenger Safety',
      'Route Navigation',
      'Pre-Trip Inspections',
      'ADA Compliance',
      'Defensive Driving',
      'Schedule Adherence',
      'Fare Collection Systems',
      'Emergency Procedures',
      'Customer Service',
    ],
    atsKeywords: [
      'CDL Class B',
      'passenger endorsement',
      'transit',
      'school bus',
      'route navigation',
      'pre-trip inspection',
      'ADA compliance',
      'defensive driving',
      'schedule adherence',
      'fare collection',
      'passenger safety',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Claudia',
      lastName: 'Torres',
      profession: 'Bus Driver',
      summary:
        'CDL Class B bus driver with 6+ years of experience in public transit and school bus operations. Safely transported over 150,000 passengers with zero at-fault accidents. Recognized for on-time performance and exceptional passenger service.',
      skills: [
        'CDL Class B Operation',
        'Passenger Safety',
        'Route Navigation',
        'Pre-Trip Inspections',
        'ADA Compliance',
        'Defensive Driving',
        'Schedule Adherence',
        'Fare Collection Systems',
        'Emergency Procedures',
        'Customer Service',
      ],
      experience: [
        {
          title: 'Transit Bus Operator',
          company: 'MTA New York City Transit',
          startDate: '2021-05',
          isCurrent: true,
          achievements: [
            'Operate a 40-foot transit bus on high-volume routes, safely transporting 300+ passengers per shift',
            'Maintain a 98.2% on-time performance rating, ranking in the top 5% of operators at the depot',
            'Completed 3 years with zero at-fault accidents and zero passenger complaints',
          ],
        },
        {
          title: 'School Bus Driver',
          company: 'First Student',
          startDate: '2018-08',
          endDate: '2021-04',
          achievements: [
            'Drove 2 daily routes transporting 65 students each, maintaining a perfect on-time pickup and drop-off record',
            'Passed all DOT inspections and random drug screenings with zero violations over 3 years',
            'Earned Driver of the Year award in 2020 for safety, reliability, and parent feedback scores',
          ],
        },
      ],
      education: [
        {
          institution: 'MTA Transit Training Center',
          degree: 'Certificate',
          field: 'Professional Bus Operations',
          startDate: '2021-03',
          endDate: '2021-05',
        },
      ],
      certifications: [
        { name: 'CDL Class B with Passenger & School Bus Endorsements', issuer: 'State of New York', date: '2018-07' },
        { name: 'Defensive Driving Certificate', issuer: 'National Safety Council', date: '2019-11' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications should a bus driver include on a resume?',
        answer:
          'Include your CDL Class B with passenger endorsement, school bus endorsement if applicable, defensive driving certificate, and any transit authority training certifications.',
      },
      {
        question: 'How do I quantify bus driver experience?',
        answer:
          'Use passengers transported, on-time performance percentages, years of accident-free driving, and any awards or recognition received.',
      },
      {
        question: 'Should I mention ADA compliance skills?',
        answer:
          'Yes. Experience with wheelchair ramps, securement systems, and accommodating passengers with disabilities is an important qualification for transit and school bus drivers.',
      },
    ],
  },

  {
    slug: 'pilot',
    title: 'Pilot',
    templateStyle: 'professional',
    keywords: ['pilot resume', 'airline pilot resume', 'commercial pilot resume', 'pilot CV'],
    searchIntents: ['pilot resume example', 'how to write an airline pilot resume', 'commercial pilot resume template'],
    totalMonthlySearches: 4600,
    topSkills: [
      'Aircraft Operation',
      'Instrument Flight Rules (IFR)',
      'Crew Resource Management',
      'Flight Planning',
      'Navigation Systems',
      'Emergency Procedures',
      'FAA Regulations',
      'Weather Analysis',
      'Multi-Engine Rating',
      'Aviation Safety',
    ],
    atsKeywords: [
      'ATP certificate',
      'instrument rating',
      'multi-engine',
      'crew resource management',
      'flight planning',
      'IFR',
      'VFR',
      'FAA regulations',
      'type rating',
      'Boeing',
      'Airbus',
      'flight hours',
      'PIC time',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Nathan',
      lastName: 'Prescott',
      profession: 'Airline Pilot',
      summary:
        'ATP-certified airline pilot with 8,500+ total flight hours including 5,200 hours as Pilot in Command. Type-rated in Boeing 737 and Airbus A320. Maintained a flawless safety record across 12 years of commercial aviation.',
      skills: [
        'Aircraft Operation',
        'Instrument Flight Rules (IFR)',
        'Crew Resource Management',
        'Flight Planning',
        'Navigation Systems',
        'Emergency Procedures',
        'FAA Regulations',
        'Weather Analysis',
        'Multi-Engine Rating',
        'Aviation Safety',
      ],
      experience: [
        {
          title: 'First Officer – Boeing 737',
          company: 'Delta Air Lines',
          startDate: '2020-06',
          isCurrent: true,
          achievements: [
            'Operate Boeing 737-800/900ER on domestic and international routes, logging 1,200+ flight hours annually',
            'Maintain 100% compliance with FAA regulations and company SOPs across 3,600+ revenue flights',
            'Completed advanced LOFT and CRM training, contributing to the fleet achieving a zero-incident safety record',
          ],
        },
        {
          title: 'Captain – Embraer 175',
          company: 'SkyWest Airlines',
          startDate: '2014-03',
          endDate: '2020-05',
          achievements: [
            'Served as Captain on the Embraer 175 with 3,800 PIC hours and a 99.6% on-time departure rate',
            'Mentored 15+ first officers during line training, with all trainees passing IOE on first attempt',
            'Recognized with Safety Award in 2018 for successful emergency diversion and passenger evacuation',
          ],
        },
      ],
      education: [
        {
          institution: 'Embry-Riddle Aeronautical University',
          degree: 'Bachelor of Science',
          field: 'Aeronautical Science',
          startDate: '2009-08',
          endDate: '2013-05',
        },
      ],
      certifications: [
        { name: 'ATP Certificate – Airplane Multi-Engine Land', issuer: 'FAA', date: '2016-02' },
        { name: 'Boeing 737 Type Rating', issuer: 'FAA', date: '2020-05' },
      ],
    }),
    faqs: [
      {
        question: 'How should a pilot format flight hours on a resume?',
        answer:
          'List total time, PIC time, multi-engine time, instrument time, and type-specific hours. Place these in a dedicated Flight Hours section for easy scanning by hiring managers.',
      },
      {
        question: 'What certifications should a pilot include?',
        answer:
          'ATP certificate, type ratings for each aircraft, instrument rating, multi-engine rating, and any instructor certificates (CFI, CFII, MEI).',
      },
      {
        question: 'How do airline pilots quantify experience on a resume?',
        answer:
          'Use total flight hours, PIC hours, annual hours logged, on-time departure rates, number of revenue flights, and any safety awards or recognition.',
      },
    ],
  },

  {
    slug: 'air-traffic-controller',
    title: 'Air Traffic Controller',
    templateStyle: 'professional',
    keywords: ['air traffic controller resume', 'ATC resume', 'FAA controller resume', 'air traffic controller CV'],
    searchIntents: ['air traffic controller resume example', 'how to write an ATC resume', 'air traffic controller resume template'],
    totalMonthlySearches: 1800,
    topSkills: [
      'Radar Separation',
      'Flight Sequencing',
      'Radio Communication',
      'Conflict Resolution',
      'Weather Assessment',
      'STARS / ERAM Systems',
      'Emergency Coordination',
      'Stress Management',
      'Team Coordination',
      'FAA Regulation Compliance',
    ],
    atsKeywords: [
      'air traffic control',
      'radar separation',
      'flight sequencing',
      'radio communication',
      'STARS',
      'ERAM',
      'FAA',
      'IFR clearances',
      'conflict resolution',
      'TRACON',
      'en route',
      'tower control',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Danielle',
      lastName: 'Kramer',
      profession: 'Air Traffic Controller',
      summary:
        'FAA-certified air traffic controller with 10+ years of experience managing high-density traffic at Level 12 TRACON facilities. Safely directed over 500,000 aircraft operations with zero operational errors in the last 7 years.',
      skills: [
        'Radar Separation',
        'Flight Sequencing',
        'Radio Communication',
        'Conflict Resolution',
        'Weather Assessment',
        'STARS / ERAM Systems',
        'Emergency Coordination',
        'Stress Management',
        'Team Coordination',
        'FAA Regulation Compliance',
      ],
      experience: [
        {
          title: 'Certified Professional Controller (CPC)',
          company: 'FAA – Southern California TRACON (SCT)',
          startDate: '2019-08',
          isCurrent: true,
          achievements: [
            'Direct an average of 180 aircraft operations per hour at a Level 12 TRACON, one of the busiest facilities in the U.S.',
            'Maintained zero operational errors over 5+ years while managing complex arrival and departure sequences',
            'Train and certify 6 developmental controllers, achieving a 100% certification pass rate for all trainees',
          ],
        },
        {
          title: 'Air Traffic Controller',
          company: 'FAA – Nashville International Airport (BNA)',
          startDate: '2014-06',
          endDate: '2019-07',
          achievements: [
            'Managed tower and approach control for 200,000+ annual aircraft operations at a Class C airport',
            'Coordinated emergency responses for 15+ in-flight emergencies, ensuring safe landings with zero incidents',
            'Received FAA Facility of the Year team recognition for operational excellence in 2017',
          ],
        },
      ],
      education: [
        {
          institution: 'Embry-Riddle Aeronautical University',
          degree: 'Bachelor of Science',
          field: 'Air Traffic Management',
          startDate: '2010-08',
          endDate: '2014-05',
        },
      ],
      certifications: [
        { name: 'FAA Control Tower Operator Certificate', issuer: 'FAA', date: '2015-03' },
        { name: 'Certified Professional Controller (CPC)', issuer: 'FAA', date: '2016-09' },
      ],
    }),
    faqs: [
      {
        question: 'What should an air traffic controller emphasize on a resume?',
        answer:
          'Highlight facility level, operations per hour, years without operational errors, and any training or mentoring responsibilities.',
      },
      {
        question: 'How important is the facility level for an ATC resume?',
        answer:
          'Very important. Higher-level facilities (Levels 7-12) indicate greater traffic complexity and are highly valued by hiring panels.',
      },
      {
        question: 'Should I include the FAA Academy on my resume?',
        answer:
          'Yes. Completion of the FAA Academy at Oklahoma City is a significant qualification. Also include your CPC certification date and any facility ratings held.',
      },
    ],
  },

  {
    slug: 'train-conductor',
    title: 'Train Conductor',
    templateStyle: 'regular',
    keywords: ['train conductor resume', 'railroad conductor resume', 'freight conductor resume', 'train conductor CV'],
    searchIntents: ['train conductor resume example', 'how to write a railroad conductor resume', 'train conductor resume template'],
    totalMonthlySearches: 1500,
    topSkills: [
      'Train Operations',
      'Air Brake Systems',
      'Switching Operations',
      'FRA Regulation Compliance',
      'Radio Communication',
      'Yard Operations',
      'Hazmat Transport',
      'Safety Inspections',
      'Crew Coordination',
      'Emergency Procedures',
    ],
    atsKeywords: [
      'train operations',
      'air brakes',
      'switching',
      'FRA compliance',
      'radio communication',
      'yard operations',
      'hazmat',
      'safety inspection',
      'freight railroad',
      'passenger rail',
      'conductor certification',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Curtis',
      lastName: 'Bowman',
      profession: 'Train Conductor',
      summary:
        'FRA-certified train conductor with 7+ years of freight and passenger rail experience. Operated and managed trains covering over 200,000 track miles with zero FRA violations. Skilled in switching operations, air brake systems, and hazmat transport compliance.',
      skills: [
        'Train Operations',
        'Air Brake Systems',
        'Switching Operations',
        'FRA Regulation Compliance',
        'Radio Communication',
        'Yard Operations',
        'Hazmat Transport',
        'Safety Inspections',
        'Crew Coordination',
        'Emergency Procedures',
      ],
      experience: [
        {
          title: 'Train Conductor',
          company: 'BNSF Railway',
          startDate: '2020-11',
          isCurrent: true,
          achievements: [
            'Conduct freight trains averaging 120 cars and 15,000 tons across a 350-mile territory in the Midwest',
            'Maintained zero FRA violations over 4+ years and logged 80,000+ safe track miles',
            'Coordinate switching operations in classification yards, accurately sorting 200+ cars per shift',
          ],
        },
        {
          title: 'Conductor Trainee / Conductor',
          company: 'Union Pacific Railroad',
          startDate: '2017-06',
          endDate: '2020-10',
          achievements: [
            'Completed an 18-month conductor training program with highest marks in air brake and operating rules exams',
            'Operated on 6 subdivisions across 3 states, gaining experience in mountain, desert, and urban territory',
            'Received the Harriman Safety Award in 2019 for achieving 2 years of injury-free operations',
          ],
        },
      ],
      education: [
        {
          institution: 'BNSF Railway Training Center',
          degree: 'Certificate',
          field: 'Railroad Operations',
          startDate: '2020-08',
          endDate: '2020-11',
        },
      ],
      certifications: [
        { name: 'FRA Conductor Certification', issuer: 'Federal Railroad Administration', date: '2018-12' },
        { name: 'Hazmat Transportation Certification', issuer: 'PHMSA / DOT', date: '2019-05' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications should a train conductor include?',
        answer:
          'FRA Conductor Certification is mandatory. Also include hazmat transportation certification, air brake qualifications, and any railroad-specific operating rules certifications.',
      },
      {
        question: 'How should a conductor describe railroad experience?',
        answer:
          'Mention track miles covered, train sizes (cars, tonnage), territory operated, safety records, and any awards such as the Harriman Safety Award.',
      },
      {
        question: 'Is the conductor training program important to mention?',
        answer:
          'Yes. Railroad training programs are intensive and highly valued. Include program duration, exam scores if strong, and the skills covered.',
      },
    ],
  },

  {
    slug: 'ship-captain',
    title: 'Ship Captain',
    templateStyle: 'professional',
    keywords: ['ship captain resume', 'master mariner resume', 'merchant marine captain resume', 'ship captain CV'],
    searchIntents: ['ship captain resume example', 'how to write a master mariner resume', 'merchant marine captain resume template'],
    totalMonthlySearches: 700,
    topSkills: [
      'Vessel Navigation',
      'Bridge Watchkeeping',
      'Cargo Operations',
      'Maritime Law',
      'Crew Management',
      'ECDIS / GPS Navigation',
      'Emergency Response',
      'Port Operations',
      'STCW Compliance',
      'Voyage Planning',
    ],
    atsKeywords: [
      'master mariner',
      'vessel navigation',
      'bridge watchkeeping',
      'cargo operations',
      'maritime law',
      'ECDIS',
      'STCW',
      'ISM code',
      'port operations',
      'USCG license',
      'voyage planning',
      'tonnage',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Henrik',
      lastName: 'Lindqvist',
      profession: 'Ship Captain',
      summary:
        'USCG-licensed Master Mariner with 15+ years of experience commanding container vessels and bulk carriers up to 75,000 DWT. Completed over 200 transoceanic voyages with zero maritime incidents. Expert in ECDIS navigation, cargo operations, and ISM Code compliance.',
      skills: [
        'Vessel Navigation',
        'Bridge Watchkeeping',
        'Cargo Operations',
        'Maritime Law',
        'Crew Management',
        'ECDIS / GPS Navigation',
        'Emergency Response',
        'Port Operations',
        'STCW Compliance',
        'Voyage Planning',
      ],
      experience: [
        {
          title: 'Master / Ship Captain',
          company: 'Maersk Line',
          startDate: '2018-01',
          isCurrent: true,
          achievements: [
            'Command Panamax container vessels up to 75,000 DWT on transpacific and transatlantic trade routes',
            'Completed 120+ international voyages with zero maritime incidents and zero port state detention findings',
            'Manage a crew of 25, conducting monthly safety drills and achieving a 100% STCW compliance rate',
          ],
        },
        {
          title: 'Chief Officer',
          company: 'Hapag-Lloyd',
          startDate: '2011-06',
          endDate: '2017-12',
          achievements: [
            'Supervised cargo operations for container vessels carrying 4,000+ TEU per voyage, ensuring zero cargo damage claims',
            'Oversaw bridge watchkeeping and navigation for 80+ voyages across Atlantic and Indian Ocean routes',
            'Led ISM Code internal audits, achieving zero non-conformities across 3 consecutive annual audits',
          ],
        },
      ],
      education: [
        {
          institution: 'SUNY Maritime College',
          degree: 'Bachelor of Science',
          field: 'Marine Transportation',
          startDate: '2006-08',
          endDate: '2010-05',
        },
      ],
      certifications: [
        { name: 'USCG Master Mariner License (Unlimited Tonnage)', issuer: 'U.S. Coast Guard', date: '2018-01' },
        { name: 'STCW Certificate of Competency', issuer: 'USCG / IMO', date: '2010-06' },
      ],
    }),
    faqs: [
      {
        question: 'What licenses should a ship captain list on a resume?',
        answer:
          'Include your USCG Master Mariner license with tonnage and route limits, STCW certificates, and any specialized endorsements (tankerman, dynamic positioning).',
      },
      {
        question: 'How do I describe command experience on a mariner resume?',
        answer:
          'Specify vessel types and sizes (DWT, TEU), trade routes sailed, number of voyages completed, crew size managed, and safety records.',
      },
      {
        question: 'Is ISM Code experience important to mention?',
        answer:
          'Yes. ISM Code compliance is a critical responsibility for ship captains. Include audit results, safety drill records, and non-conformity rates.',
      },
    ],
  },

  {
    slug: 'taxi-driver',
    title: 'Taxi Driver',
    templateStyle: 'regular',
    keywords: ['taxi driver resume', 'cab driver resume', 'rideshare driver resume', 'taxi driver CV'],
    searchIntents: ['taxi driver resume example', 'how to write a taxi driver resume', 'rideshare driver resume template'],
    totalMonthlySearches: 1100,
    topSkills: [
      'Defensive Driving',
      'City Navigation',
      'Customer Service',
      'Vehicle Maintenance',
      'GPS / Navigation Systems',
      'Cash & Card Handling',
      'Accessibility Assistance',
      'Route Optimization',
      'Safety Compliance',
      'Time Management',
    ],
    atsKeywords: [
      'taxi',
      'rideshare',
      'defensive driving',
      'city navigation',
      'customer service',
      'vehicle maintenance',
      'GPS',
      'cash handling',
      'accessibility',
      'TLC license',
      'chauffeur license',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Kwame',
      lastName: 'Asante',
      profession: 'Taxi Driver',
      summary:
        'Licensed taxi driver with 5+ years of experience providing safe and efficient transportation in the New York City metropolitan area. Completed over 25,000 trips with a 4.9/5.0 rider rating. Known for punctuality, navigation skills, and excellent customer service.',
      skills: [
        'Defensive Driving',
        'City Navigation',
        'Customer Service',
        'Vehicle Maintenance',
        'GPS / Navigation Systems',
        'Cash & Card Handling',
        'Accessibility Assistance',
        'Route Optimization',
        'Safety Compliance',
        'Time Management',
      ],
      experience: [
        {
          title: 'Licensed Taxi Driver',
          company: 'Yellow Cab NYC (Medallion Owner-Operator)',
          startDate: '2021-06',
          isCurrent: true,
          achievements: [
            'Complete an average of 30 trips per shift across all 5 boroughs, maintaining a 4.9/5.0 rider rating',
            'Generated $85K+ in annual gross revenue through efficient route planning and consistent shift scheduling',
            'Maintained zero moving violations and zero at-fault accidents over 3+ years of full-time operation',
          ],
        },
        {
          title: 'Rideshare Driver',
          company: 'Uber / Lyft',
          startDate: '2019-01',
          endDate: '2021-05',
          achievements: [
            'Completed over 8,000 rides across both platforms with a combined 4.95 rider rating',
            'Achieved Uber Diamond and Lyft Platinum driver status through high acceptance and satisfaction rates',
            'Earned top 3% driver ranking in the NYC market for on-time airport pickup performance',
          ],
        },
      ],
      education: [
        {
          institution: 'NYC Taxi and Limousine Commission',
          degree: 'Certificate',
          field: 'For-Hire Vehicle Driver Training',
          startDate: '2018-10',
          endDate: '2018-12',
        },
      ],
      certifications: [
        { name: 'TLC Driver License', issuer: 'NYC Taxi and Limousine Commission', date: '2019-01' },
        { name: 'Defensive Driving Certificate', issuer: 'National Safety Council', date: '2020-03' },
      ],
    }),
    faqs: [
      {
        question: 'What should a taxi driver include on a resume?',
        answer:
          'Include your TLC or chauffeur license, total trips completed, rider ratings, driving record, and customer service skills. Revenue generated is also a strong metric.',
      },
      {
        question: 'How do rideshare drivers present experience on a resume?',
        answer:
          'List total rides completed, platform ratings, driver tier status (Diamond, Platinum), and on-time performance metrics.',
      },
      {
        question: 'Is a clean driving record important to mention?',
        answer:
          'Absolutely. Zero violations and zero at-fault accidents are top qualifications. Include years of clean driving and any defensive driving certifications.',
      },
    ],
  },

  {
    slug: 'logistics-driver',
    title: 'Logistics Driver',
    templateStyle: 'regular',
    keywords: ['logistics driver resume', 'delivery driver resume', 'route driver resume', 'logistics driver CV'],
    searchIntents: ['logistics driver resume example', 'how to write a delivery driver resume', 'route driver resume template'],
    totalMonthlySearches: 2200,
    topSkills: [
      'Route Management',
      'Load Planning',
      'Delivery Verification',
      'Vehicle Inspection',
      'DOT Compliance',
      'Warehouse Coordination',
      'Electronic Logging',
      'Customer Interaction',
      'Time Management',
      'Inventory Handling',
    ],
    atsKeywords: [
      'route management',
      'load planning',
      'delivery verification',
      'vehicle inspection',
      'DOT compliance',
      'warehouse',
      'electronic logging',
      'last-mile delivery',
      'CDL',
      'on-time delivery',
      'inventory',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Andre',
      lastName: 'Mitchell',
      profession: 'Logistics Driver',
      summary:
        'CDL-licensed logistics driver with 5+ years of experience in last-mile and regional delivery for major carriers. Delivered over 180,000 packages with a 99.7% on-time delivery rate and zero cargo damage claims. Skilled in route optimization, load planning, and customer interaction.',
      skills: [
        'Route Management',
        'Load Planning',
        'Delivery Verification',
        'Vehicle Inspection',
        'DOT Compliance',
        'Warehouse Coordination',
        'Electronic Logging',
        'Customer Interaction',
        'Time Management',
        'Inventory Handling',
      ],
      experience: [
        {
          title: 'Delivery Driver – Ground Operations',
          company: 'FedEx Ground',
          startDate: '2022-02',
          isCurrent: true,
          achievements: [
            'Deliver 150-180 packages per day across a 90-stop residential and commercial route with 99.7% on-time delivery',
            'Maintain vehicle to company standards, passing all DOT inspections with zero violations over 2+ years',
            'Ranked in the top 10% of drivers at the terminal for customer satisfaction and delivery accuracy',
          ],
        },
        {
          title: 'Package Delivery Driver',
          company: 'UPS',
          startDate: '2019-06',
          endDate: '2022-01',
          achievements: [
            'Completed an average of 120 delivery stops per day on urban and suburban routes',
            'Achieved Circle of Honor recognition for 3 consecutive years of accident-free driving',
            'Trained 5 seasonal drivers on DIAD scanner usage, package handling, and route execution',
          ],
        },
      ],
      education: [
        {
          institution: 'Community College of Philadelphia',
          degree: 'Certificate',
          field: 'Logistics & Supply Chain Management',
          startDate: '2018-01',
          endDate: '2019-05',
        },
      ],
      certifications: [
        { name: 'CDL Class B License', issuer: 'State of Pennsylvania', date: '2019-05' },
        { name: 'Smith System Safe Driving', issuer: 'Smith System', date: '2020-02' },
      ],
    }),
    faqs: [
      {
        question: 'What metrics should a logistics driver include on a resume?',
        answer:
          'Include daily stop counts, packages delivered, on-time delivery rates, customer satisfaction rankings, and years of accident-free driving.',
      },
      {
        question: 'How do I present FedEx or UPS experience on a resume?',
        answer:
          'Emphasize volume handled, route efficiency, safety awards (Circle of Honor, Safe Driving), and any training responsibilities.',
      },
      {
        question: 'Is a CDL necessary for a logistics driver resume?',
        answer:
          'It depends on the vehicle. CDL Class B is required for larger delivery trucks. Even if not required, listing it shows versatility and opens more job opportunities.',
      },
    ],
  },

  {
    slug: 'solar-panel-installer',
    title: 'Solar Panel Installer',
    templateStyle: 'regular',
    keywords: ['solar panel installer resume', 'solar technician resume', 'PV installer resume', 'solar installer CV'],
    searchIntents: ['solar panel installer resume example', 'how to write a solar installer resume', 'solar technician resume template'],
    totalMonthlySearches: 1800,
    topSkills: [
      'PV System Installation',
      'Electrical Wiring',
      'Roof Mounting Systems',
      'Inverter Installation',
      'NEC Code Compliance',
      'Conduit Bending',
      'System Commissioning',
      'Safety Harness / Fall Protection',
      'Blueprint Reading',
      'Battery Storage Systems',
    ],
    atsKeywords: [
      'photovoltaic',
      'PV installation',
      'solar panel',
      'electrical wiring',
      'roof mount',
      'inverter',
      'NEC code',
      'conduit',
      'system commissioning',
      'fall protection',
      'NABCEP',
      'battery storage',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Elias',
      lastName: 'Nguyen',
      profession: 'Solar Panel Installer',
      summary:
        'NABCEP-certified solar PV installer with 5+ years of experience installing residential and commercial photovoltaic systems. Completed over 400 installations totaling 8 MW of solar capacity. Skilled in roof and ground mount systems, inverter configuration, and NEC code compliance.',
      skills: [
        'PV System Installation',
        'Electrical Wiring',
        'Roof Mounting Systems',
        'Inverter Installation',
        'NEC Code Compliance',
        'Conduit Bending',
        'System Commissioning',
        'Safety Harness / Fall Protection',
        'Blueprint Reading',
        'Battery Storage Systems',
      ],
      experience: [
        {
          title: 'Lead Solar Installer',
          company: 'SunPower Corporation',
          startDate: '2022-01',
          isCurrent: true,
          achievements: [
            'Lead a crew of 4 installers completing 3-4 residential PV installations per week averaging 8 kW per system',
            'Installed 180+ systems totaling 3.2 MW of solar capacity with zero safety incidents',
            'Reduced average installation time by 20% by standardizing crew workflows and pre-staging materials',
          ],
        },
        {
          title: 'Solar PV Installer',
          company: 'Vivint Solar (now SunRun)',
          startDate: '2019-03',
          endDate: '2021-12',
          achievements: [
            'Installed 220+ residential rooftop PV systems across the Southwest region totaling 4.8 MW of capacity',
            'Passed all municipal electrical inspections on first attempt for 98% of installations',
            'Earned NABCEP PV Installation Professional certification within 2 years of entering the solar industry',
          ],
        },
      ],
      education: [
        {
          institution: 'Ecotech Institute',
          degree: 'Associate Degree',
          field: 'Solar Energy Technology',
          startDate: '2017-01',
          endDate: '2019-01',
        },
      ],
      certifications: [
        { name: 'NABCEP PV Installation Professional', issuer: 'North American Board of Certified Energy Practitioners', date: '2021-04' },
        { name: 'OSHA 30-Hour Construction', issuer: 'OSHA', date: '2019-06' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications should a solar installer include?',
        answer:
          'NABCEP PV Installation Professional is the gold standard. Also include OSHA safety certification, state electrical licenses, and any manufacturer-specific training (SolarEdge, Enphase).',
      },
      {
        question: 'How do I quantify solar installation experience?',
        answer:
          'Include number of systems installed, total MW of capacity, average system size, inspection pass rates, and any efficiency improvements in installation time.',
      },
      {
        question: 'Is electrical experience important for a solar installer resume?',
        answer:
          'Yes. Electrical wiring, conduit work, and NEC code knowledge are fundamental. Highlight any journeyman or apprentice electrician experience if applicable.',
      },
    ],
  },

  {
    slug: 'wind-turbine-technician',
    title: 'Wind Turbine Technician',
    templateStyle: 'regular',
    keywords: ['wind turbine technician resume', 'wind energy technician resume', 'wind tech resume', 'wind turbine technician CV'],
    searchIntents: ['wind turbine technician resume example', 'how to write a wind tech resume', 'wind energy technician resume template'],
    totalMonthlySearches: 1300,
    topSkills: [
      'Turbine Maintenance',
      'Electrical Troubleshooting',
      'Hydraulic Systems',
      'Mechanical Repair',
      'SCADA Monitoring',
      'Safety at Heights',
      'Gearbox Service',
      'Blade Inspection',
      'Preventive Maintenance',
      'Lockout/Tagout (LOTO)',
    ],
    atsKeywords: [
      'wind turbine',
      'turbine maintenance',
      'electrical troubleshooting',
      'hydraulic systems',
      'SCADA',
      'gearbox',
      'blade inspection',
      'preventive maintenance',
      'LOTO',
      'GWO certification',
      'nacelle',
      'tower climbing',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Colton',
      lastName: 'Breeze',
      profession: 'Wind Turbine Technician',
      summary:
        'GWO-certified wind turbine technician with 5+ years of experience maintaining and repairing onshore wind turbines. Serviced over 300 turbines across 5 wind farms with 99% availability rate. Proficient in electrical systems, gearbox service, and SCADA diagnostics.',
      skills: [
        'Turbine Maintenance',
        'Electrical Troubleshooting',
        'Hydraulic Systems',
        'Mechanical Repair',
        'SCADA Monitoring',
        'Safety at Heights',
        'Gearbox Service',
        'Blade Inspection',
        'Preventive Maintenance',
        'Lockout/Tagout (LOTO)',
      ],
      experience: [
        {
          title: 'Wind Turbine Technician II',
          company: 'Vestas',
          startDate: '2022-04',
          isCurrent: true,
          achievements: [
            'Perform scheduled and unscheduled maintenance on 80+ Vestas V110 and V136 turbines at a 200 MW wind farm',
            'Maintained a 99.2% turbine availability rate, exceeding the contractual target of 97%',
            'Completed 15 gearbox up-tower repairs, saving an estimated $1.5M in crane-down replacement costs',
          ],
        },
        {
          title: 'Wind Turbine Technician I',
          company: 'GE Renewable Energy',
          startDate: '2019-06',
          endDate: '2022-03',
          achievements: [
            'Serviced 220+ GE 1.5 MW and 2.5 MW turbines across 4 wind farms in the Great Plains region',
            'Performed blade inspections and minor repairs at heights of 300+ feet with zero safety incidents',
            'Reduced average turbine downtime by 18% through improved diagnostic procedures and parts pre-staging',
          ],
        },
      ],
      education: [
        {
          institution: 'Texas State Technical College',
          degree: 'Associate Degree',
          field: 'Wind Energy Technology',
          startDate: '2017-08',
          endDate: '2019-05',
        },
      ],
      certifications: [
        { name: 'GWO Basic Safety Training (BST)', issuer: 'Global Wind Organisation', date: '2019-06' },
        { name: 'OSHA 30-Hour Construction', issuer: 'OSHA', date: '2019-08' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications does a wind turbine technician need?',
        answer:
          'GWO Basic Safety Training is the industry standard. Also include OSHA certification, manufacturer-specific training (Vestas, GE, Siemens Gamesa), and any electrical licenses.',
      },
      {
        question: 'How should a wind tech describe maintenance experience?',
        answer:
          'Mention the number of turbines serviced, turbine models, availability rates maintained, and specific repair types (gearbox, blade, electrical).',
      },
      {
        question: 'Is tower climbing experience important to list?',
        answer:
          'Yes. Working at heights is a defining aspect of the role. Include GWO height training, blade inspection experience, and years of incident-free tower climbing.',
      },
    ],
  },

  {
    slug: 'locksmith',
    title: 'Locksmith',
    templateStyle: 'regular',
    keywords: ['locksmith resume', 'locksmith technician resume', 'security locksmith resume', 'locksmith CV'],
    searchIntents: ['locksmith resume example', 'how to write a locksmith resume', 'locksmith technician resume template'],
    totalMonthlySearches: 800,
    topSkills: [
      'Lock Installation',
      'Lock Rekeying',
      'Key Cutting',
      'Electronic Access Systems',
      'Safe Manipulation',
      'Automotive Lockout',
      'Master Key Systems',
      'Security Assessments',
      'Customer Service',
      'Alarm Systems',
    ],
    atsKeywords: [
      'lock installation',
      'rekeying',
      'key cutting',
      'electronic access',
      'safe',
      'automotive lockout',
      'master key',
      'security assessment',
      'commercial locks',
      'residential locks',
      'ALOA',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Vincent',
      lastName: 'Delacruz',
      profession: 'Locksmith',
      summary:
        'ALOA-certified locksmith with 6+ years of experience in residential, commercial, and automotive lock services. Completed over 5,000 service calls with a 98% same-day resolution rate. Proficient in electronic access control, master key systems, and safe service.',
      skills: [
        'Lock Installation',
        'Lock Rekeying',
        'Key Cutting',
        'Electronic Access Systems',
        'Safe Manipulation',
        'Automotive Lockout',
        'Master Key Systems',
        'Security Assessments',
        'Customer Service',
        'Alarm Systems',
      ],
      experience: [
        {
          title: 'Lead Locksmith',
          company: 'Pop-A-Lock',
          startDate: '2021-09',
          isCurrent: true,
          achievements: [
            'Handle 8-12 service calls per day including lockouts, rekeying, and electronic access system installations',
            'Generated $320K in annual service revenue with a 98% same-day resolution rate',
            'Installed and programmed electronic access control systems for 40+ commercial clients',
          ],
        },
        {
          title: 'Locksmith Technician',
          company: 'ASSA ABLOY (authorized dealer)',
          startDate: '2018-04',
          endDate: '2021-08',
          achievements: [
            'Performed lock installation, rekeying, and master key system design for 200+ residential and commercial accounts',
            'Completed automotive key programming for 30+ vehicle makes using advanced transponder tools',
            'Achieved ALOA Certified Registered Locksmith (CRL) designation within 2 years',
          ],
        },
      ],
      education: [
        {
          institution: 'ALOA Security Professionals Association',
          degree: 'Certificate',
          field: 'Locksmithing Fundamentals',
          startDate: '2017-06',
          endDate: '2018-03',
        },
      ],
      certifications: [
        { name: 'Certified Registered Locksmith (CRL)', issuer: 'ALOA Security Professionals Association', date: '2020-05' },
        { name: 'Electronic Access Control Technician', issuer: 'ALOA', date: '2021-11' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications should a locksmith include?',
        answer:
          'ALOA Certified Registered Locksmith (CRL) is the most recognized. Also include electronic access control certifications, safe technician ratings, and any state-required locksmith licenses.',
      },
      {
        question: 'How do I describe locksmith experience on a resume?',
        answer:
          'Include service calls per day, revenue generated, types of services (residential, commercial, automotive), and customer satisfaction metrics.',
      },
      {
        question: 'Is electronic access control experience valuable?',
        answer:
          'Very valuable. The industry is shifting toward electronic systems. Highlight experience with key card systems, smart locks, and access control programming.',
      },
    ],
  },

  {
    slug: 'glazier',
    title: 'Glazier',
    templateStyle: 'regular',
    keywords: ['glazier resume', 'glass installer resume', 'commercial glazier resume', 'glazier CV'],
    searchIntents: ['glazier resume example', 'how to write a glazier resume', 'glass installer resume template'],
    totalMonthlySearches: 600,
    topSkills: [
      'Glass Cutting & Fabrication',
      'Curtain Wall Installation',
      'Storefront Systems',
      'Silicone Glazing',
      'Blueprint Reading',
      'Window Installation',
      'Tempered & Laminated Glass',
      'Safety Compliance',
      'Scaffolding & Rigging',
      'Measuring & Layout',
    ],
    atsKeywords: [
      'glass installation',
      'curtain wall',
      'storefront',
      'silicone glazing',
      'blueprint reading',
      'window installation',
      'tempered glass',
      'laminated glass',
      'commercial glazing',
      'scaffolding',
      'OSHA',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Stefan',
      lastName: 'Gruber',
      profession: 'Glazier',
      summary:
        'Journeyman glazier with 8+ years of experience installing curtain walls, storefronts, and architectural glass systems on commercial high-rise projects. Completed glazing work on over 50 projects valued at $5M-$100M. Skilled in silicone structural glazing and unitized curtain wall systems.',
      skills: [
        'Glass Cutting & Fabrication',
        'Curtain Wall Installation',
        'Storefront Systems',
        'Silicone Glazing',
        'Blueprint Reading',
        'Window Installation',
        'Tempered & Laminated Glass',
        'Safety Compliance',
        'Scaffolding & Rigging',
        'Measuring & Layout',
      ],
      experience: [
        {
          title: 'Lead Glazier',
          company: 'Permasteelisa Group',
          startDate: '2020-06',
          isCurrent: true,
          achievements: [
            'Lead a crew of 6 glaziers installing unitized curtain wall systems on high-rise projects up to 60 stories',
            'Installed 12,000+ sq ft of curtain wall glass on a $95M office tower, completing the scope 10 days ahead of schedule',
            'Maintained zero safety incidents across 4 consecutive years on high-rise construction sites',
          ],
        },
        {
          title: 'Glazier',
          company: 'Harmon Inc.',
          startDate: '2016-03',
          endDate: '2020-05',
          achievements: [
            'Installed storefront, curtain wall, and window systems on 35+ commercial projects across the Midwest',
            'Fabricated and installed custom glass railings and canopies for 10 luxury retail locations',
            'Completed IUPAT glazier apprenticeship and achieved journeyman status in 4 years',
          ],
        },
      ],
      education: [
        {
          institution: 'IUPAT District Council Apprenticeship Program',
          degree: 'Certificate',
          field: 'Glazier Apprenticeship',
          startDate: '2016-03',
          endDate: '2020-03',
        },
      ],
      certifications: [
        { name: 'Journeyman Glazier', issuer: 'IUPAT', date: '2020-03' },
        { name: 'OSHA 30-Hour Construction', issuer: 'OSHA', date: '2017-05' },
      ],
    }),
    faqs: [
      {
        question: 'What skills should a glazier highlight on a resume?',
        answer:
          'Emphasize curtain wall and storefront installation, glass types you work with (tempered, laminated, insulated), silicone glazing skills, and high-rise experience.',
      },
      {
        question: 'How do I quantify glazier experience?',
        answer:
          'Mention square footage of glass installed, project values, building heights, crew sizes led, and schedule performance metrics.',
      },
      {
        question: 'Is union apprenticeship experience important?',
        answer:
          'Yes. IUPAT journeyman status is the standard pathway in commercial glazing. Include your apprenticeship details and journeyman certification prominently.',
      },
    ],
  },

  {
    slug: 'roofer',
    title: 'Roofer',
    templateStyle: 'regular',
    keywords: ['roofer resume', 'roofing resume', 'commercial roofer resume', 'roofer CV'],
    searchIntents: ['roofer resume example', 'how to write a roofing resume', 'commercial roofer resume template'],
    totalMonthlySearches: 1600,
    topSkills: [
      'Shingle Installation',
      'Flat Roof Systems',
      'TPO / EPDM Membrane',
      'Roof Repairs & Patching',
      'Flashing Installation',
      'Tear-Off & Disposal',
      'Safety Harness / Fall Protection',
      'Blueprint Reading',
      'Crew Supervision',
      'Estimating & Material Takeoff',
    ],
    atsKeywords: [
      'roofing installation',
      'shingle',
      'flat roof',
      'TPO',
      'EPDM',
      'membrane roofing',
      'flashing',
      'tear-off',
      'fall protection',
      'commercial roofing',
      'residential roofing',
      'OSHA',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Dwayne',
      lastName: 'Carpenter',
      profession: 'Roofer',
      summary:
        'Experienced roofer with 9+ years in residential and commercial roofing including shingle, TPO, EPDM, and modified bitumen systems. Completed over 500 roofing projects with zero warranty callbacks in the last 3 years. Skilled in crew leadership and material estimation.',
      skills: [
        'Shingle Installation',
        'Flat Roof Systems',
        'TPO / EPDM Membrane',
        'Roof Repairs & Patching',
        'Flashing Installation',
        'Tear-Off & Disposal',
        'Safety Harness / Fall Protection',
        'Blueprint Reading',
        'Crew Supervision',
        'Estimating & Material Takeoff',
      ],
      experience: [
        {
          title: 'Roofing Foreman',
          company: 'CentiMark Corporation',
          startDate: '2020-04',
          isCurrent: true,
          achievements: [
            'Supervise a crew of 10 roofers on commercial TPO and EPDM projects ranging from 5,000 to 80,000 sq ft',
            'Completed 60+ commercial roofing projects with zero warranty callbacks over 4 years',
            'Reduced material waste by 15% through improved measurement and cutting techniques, saving $50K annually',
          ],
        },
        {
          title: 'Roofer',
          company: 'GAF Master Elite Contractor (local affiliate)',
          startDate: '2015-05',
          endDate: '2020-03',
          achievements: [
            'Installed asphalt shingle, metal, and flat roof systems on 400+ residential and small commercial projects',
            'Averaged 3 complete residential roof installations per week during peak season with a 4-person crew',
            'Achieved GAF Master Elite certification, qualifying the company for the top tier of manufacturer warranties',
          ],
        },
      ],
      education: [
        {
          institution: 'National Roofing Contractors Association (NRCA)',
          degree: 'Certificate',
          field: 'Roofing Technology',
          startDate: '2015-01',
          endDate: '2015-04',
        },
      ],
      certifications: [
        { name: 'OSHA 30-Hour Construction', issuer: 'OSHA', date: '2016-02' },
        { name: 'GAF Master Elite Certified Installer', issuer: 'GAF', date: '2018-06' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications help a roofer resume stand out?',
        answer:
          'Manufacturer certifications (GAF Master Elite, CertainTeed SELECT) are highly valued. Also include OSHA safety certification and any state contractor licenses.',
      },
      {
        question: 'How should a roofer describe project experience?',
        answer:
          'Include square footage installed, types of roofing systems, number of projects completed, warranty callback rates, and crew sizes managed.',
      },
      {
        question: 'Should I include both residential and commercial roofing experience?',
        answer:
          'Yes. Showing versatility across residential shingle work and commercial membrane systems makes you a more competitive candidate.',
      },
    ],
  },

  {
    slug: 'painter',
    title: 'Painter',
    templateStyle: 'regular',
    keywords: ['painter resume', 'house painter resume', 'commercial painter resume', 'painter CV'],
    searchIntents: ['painter resume example', 'how to write a painter resume', 'commercial painter resume template'],
    totalMonthlySearches: 2100,
    topSkills: [
      'Interior Painting',
      'Exterior Painting',
      'Surface Preparation',
      'Spray Application',
      'Color Matching',
      'Drywall Repair',
      'Wallpaper Removal',
      'Protective Coatings',
      'Safety Compliance',
      'Estimating',
    ],
    atsKeywords: [
      'interior painting',
      'exterior painting',
      'surface preparation',
      'spray painting',
      'color matching',
      'drywall repair',
      'protective coatings',
      'commercial painting',
      'residential painting',
      'OSHA',
      'lead abatement',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Reginald',
      lastName: 'Oakes',
      profession: 'Painter',
      summary:
        'Professional painter with 8+ years of experience in residential and commercial interior and exterior painting. Completed over 600 projects with a 99% client satisfaction rate. Proficient in brush, roller, and airless spray application with expertise in surface preparation and protective coatings.',
      skills: [
        'Interior Painting',
        'Exterior Painting',
        'Surface Preparation',
        'Spray Application',
        'Color Matching',
        'Drywall Repair',
        'Wallpaper Removal',
        'Protective Coatings',
        'Safety Compliance',
        'Estimating',
      ],
      experience: [
        {
          title: 'Lead Painter',
          company: 'Sherwin-Williams (commercial services division)',
          startDate: '2020-08',
          isCurrent: true,
          achievements: [
            'Lead a crew of 5 painters on commercial projects including offices, hospitals, and retail spaces up to 100,000 sq ft',
            'Completed 80+ commercial painting projects with zero punch list items related to paint quality',
            'Reduced paint waste by 12% by optimizing spray tip selection and application techniques',
          ],
        },
        {
          title: 'Painter',
          company: 'CertaPro Painters',
          startDate: '2016-03',
          endDate: '2020-07',
          achievements: [
            'Painted 500+ residential interiors and exteriors, maintaining a 99% customer satisfaction score on post-job surveys',
            'Applied protective coatings and industrial epoxies on 25 commercial flooring projects',
            'Earned IUPAT journeyman painter status after completing a 3-year apprenticeship',
          ],
        },
      ],
      education: [
        {
          institution: 'IUPAT District Council Apprenticeship Program',
          degree: 'Certificate',
          field: 'Painting & Decorating',
          startDate: '2016-03',
          endDate: '2019-03',
        },
      ],
      certifications: [
        { name: 'EPA Lead-Safe Certified Renovator', issuer: 'EPA', date: '2017-09' },
        { name: 'OSHA 10-Hour Construction', issuer: 'OSHA', date: '2016-06' },
      ],
    }),
    faqs: [
      {
        question: 'What should a painter include on a resume?',
        answer:
          'List the types of painting you specialize in (residential, commercial, industrial), application methods (brush, roller, spray), surface prep skills, and client satisfaction metrics.',
      },
      {
        question: 'Is the EPA Lead-Safe certification important?',
        answer:
          'Yes. It is legally required for work on pre-1978 buildings and demonstrates professionalism. Include it prominently on your resume.',
      },
      {
        question: 'How do I quantify painting experience?',
        answer:
          'Include the number of projects completed, square footage painted, crew sizes managed, punch list rates, and customer satisfaction percentages.',
      },
    ],
  },

  {
    slug: 'tile-setter',
    title: 'Tile Setter',
    templateStyle: 'regular',
    keywords: ['tile setter resume', 'tile installer resume', 'flooring installer resume', 'tile setter CV'],
    searchIntents: ['tile setter resume example', 'how to write a tile installer resume', 'tile setter resume template'],
    totalMonthlySearches: 900,
    topSkills: [
      'Tile Installation',
      'Surface Preparation',
      'Mortar & Thin-Set Application',
      'Grouting & Sealing',
      'Waterproofing',
      'Layout & Pattern Design',
      'Wet Saw Operation',
      'Natural Stone Installation',
      'Heated Floor Systems',
      'Blueprint Reading',
    ],
    atsKeywords: [
      'tile installation',
      'ceramic tile',
      'porcelain tile',
      'natural stone',
      'mortar',
      'thin-set',
      'grouting',
      'waterproofing',
      'wet saw',
      'backsplash',
      'shower tile',
      'CTEF certified',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Dominic',
      lastName: 'Pagano',
      profession: 'Tile Setter',
      summary:
        'CTEF-certified tile setter with 7+ years of experience installing ceramic, porcelain, and natural stone tile in residential and commercial settings. Completed over 350 projects with a 100% callback-free record in the last 2 years. Skilled in custom patterns, waterproofing, and large-format tile.',
      skills: [
        'Tile Installation',
        'Surface Preparation',
        'Mortar & Thin-Set Application',
        'Grouting & Sealing',
        'Waterproofing',
        'Layout & Pattern Design',
        'Wet Saw Operation',
        'Natural Stone Installation',
        'Heated Floor Systems',
        'Blueprint Reading',
      ],
      experience: [
        {
          title: 'Lead Tile Installer',
          company: 'Floor & Decor (commercial project division)',
          startDate: '2021-02',
          isCurrent: true,
          achievements: [
            'Install an average of 400 sq ft of tile per day on commercial projects including lobbies, restrooms, and kitchens',
            'Completed 120+ commercial tile projects with zero callbacks over 3 years',
            'Trained 3 apprentice tile setters on waterproofing systems, mortar mixing, and large-format tile handling',
          ],
        },
        {
          title: 'Tile Setter',
          company: 'Dal-Tile (Mohawk Industries)',
          startDate: '2017-05',
          endDate: '2021-01',
          achievements: [
            'Installed ceramic, porcelain, and marble tile on 230+ residential projects including bathrooms, kitchens, and entryways',
            'Specialized in custom shower installations with Schluter waterproofing systems, achieving 100% leak-free results',
            'Earned Certified Tile Installer (CTI) designation through the Ceramic Tile Education Foundation',
          ],
        },
      ],
      education: [
        {
          institution: 'Ceramic Tile Education Foundation (CTEF)',
          degree: 'Certificate',
          field: 'Tile Installation',
          startDate: '2017-01',
          endDate: '2017-04',
        },
      ],
      certifications: [
        { name: 'Certified Tile Installer (CTI)', issuer: 'Ceramic Tile Education Foundation', date: '2019-06' },
        { name: 'Schluter Certified Installer', issuer: 'Schluter Systems', date: '2018-11' },
      ],
    }),
    faqs: [
      {
        question: 'What certifications matter for a tile setter?',
        answer:
          'Certified Tile Installer (CTI) from CTEF is the most recognized. Schluter system certification is also valued for waterproofing expertise.',
      },
      {
        question: 'How do I describe tile setting experience?',
        answer:
          'Include square footage installed per day, number of projects, types of tile (ceramic, porcelain, stone), specialty work (showers, heated floors), and callback rates.',
      },
      {
        question: 'Should I include waterproofing skills?',
        answer:
          'Yes. Waterproofing is critical for wet areas. Mention specific systems you use (Schluter, Laticrete, RedGard) and your leak-free installation record.',
      },
    ],
  },

  {
    slug: 'ironworker',
    title: 'Ironworker',
    templateStyle: 'regular',
    keywords: ['ironworker resume', 'structural ironworker resume', 'iron worker resume', 'ironworker CV'],
    searchIntents: ['ironworker resume example', 'how to write an ironworker resume', 'structural ironworker resume template'],
    totalMonthlySearches: 1200,
    topSkills: [
      'Structural Steel Erection',
      'Welding (Stick, MIG)',
      'Rigging & Signaling',
      'Blueprint Reading',
      'Rebar Installation',
      'Bolt-Up & Torquing',
      'Crane Signaling',
      'Safety at Heights',
      'Metal Deck Installation',
      'OSHA Compliance',
    ],
    atsKeywords: [
      'structural steel',
      'ironwork',
      'welding',
      'rigging',
      'rebar',
      'bolt-up',
      'crane signaling',
      'metal deck',
      'erection',
      'blueprint reading',
      'OSHA',
      'fall protection',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Terrence',
      lastName: 'Callahan',
      profession: 'Ironworker',
      summary:
        'Journeyman ironworker with 10+ years of experience in structural steel erection, welding, and rigging on commercial and infrastructure projects. Erected steel on over 40 projects valued at up to $150M. Maintained a zero lost-time incident record across entire career.',
      skills: [
        'Structural Steel Erection',
        'Welding (Stick, MIG)',
        'Rigging & Signaling',
        'Blueprint Reading',
        'Rebar Installation',
        'Bolt-Up & Torquing',
        'Crane Signaling',
        'Safety at Heights',
        'Metal Deck Installation',
        'OSHA Compliance',
      ],
      experience: [
        {
          title: 'Journeyman Ironworker',
          company: 'W&W | AFCO Steel',
          startDate: '2019-09',
          isCurrent: true,
          achievements: [
            'Erect structural steel beams, columns, and connections on commercial projects valued at up to $150M',
            'Led a 6-person raising gang that set an average of 30 tons of steel per day on a 20-story high-rise',
            'Maintained zero lost-time incidents over 5+ years through strict adherence to fall protection and rigging protocols',
          ],
        },
        {
          title: 'Apprentice / Ironworker',
          company: 'Schuff Steel',
          startDate: '2014-03',
          endDate: '2019-08',
          achievements: [
            'Installed structural steel, metal deck, and rebar on 25+ commercial and bridge projects across the Southwest',
            'Performed field welding and bolt-up connections on moment frames and braced frames per AWS D1.1 standards',
            'Completed Ironworkers International 4-year apprenticeship and earned journeyman classification',
          ],
        },
      ],
      education: [
        {
          institution: 'Ironworkers Local Apprenticeship Program',
          degree: 'Certificate',
          field: 'Structural Ironwork',
          startDate: '2014-03',
          endDate: '2018-03',
        },
      ],
      certifications: [
        { name: 'AWS D1.1 Structural Welding Certification', issuer: 'American Welding Society', date: '2016-05' },
        { name: 'OSHA 30-Hour Construction', issuer: 'OSHA', date: '2015-01' },
      ],
    }),
    faqs: [
      {
        question: 'What should an ironworker emphasize on a resume?',
        answer:
          'Highlight structural steel tonnage erected, project values, welding certifications, rigging experience, and safety records including years without lost-time incidents.',
      },
      {
        question: 'Are welding certifications important for ironworkers?',
        answer:
          'Yes. AWS D1.1 structural welding certification is essential for field welding on steel structures. Include each process and position you are certified in.',
      },
      {
        question: 'Should I include the ironworkers apprenticeship?',
        answer:
          'Absolutely. The Ironworkers International apprenticeship is the primary pathway into the trade. Include the duration, journeyman status, and any specializations (structural, reinforcing, ornamental).',
      },
    ],
  },

  {
    slug: 'sheet-metal-worker',
    title: 'Sheet Metal Worker',
    templateStyle: 'regular',
    keywords: ['sheet metal worker resume', 'sheet metal mechanic resume', 'HVAC sheet metal resume', 'sheet metal worker CV'],
    searchIntents: ['sheet metal worker resume example', 'how to write a sheet metal worker resume', 'sheet metal mechanic resume template'],
    totalMonthlySearches: 1100,
    topSkills: [
      'Sheet Metal Fabrication',
      'Ductwork Installation',
      'Plasma & Laser Cutting',
      'Blueprint Reading',
      'TIG & MIG Welding',
      'Soldering & Brazing',
      'HVAC Systems',
      'CNC Brake Press Operation',
      'Architectural Metal Work',
      'OSHA Safety Compliance',
    ],
    atsKeywords: [
      'sheet metal fabrication',
      'ductwork',
      'plasma cutting',
      'laser cutting',
      'TIG welding',
      'MIG welding',
      'soldering',
      'HVAC ductwork',
      'CNC brake press',
      'architectural metal',
      'blueprint reading',
      'OSHA',
      'SMACNA',
    ],
    sampleResumeData: buildResumeData({
      firstName: 'Franklin',
      lastName: 'Watts',
      profession: 'Sheet Metal Worker',
      summary:
        'Journeyman sheet metal worker with 9+ years of experience in HVAC ductwork fabrication, installation, and architectural metalwork. Fabricated and installed ductwork on over 70 commercial projects with a 100% first-pass inspection rate. Proficient in CNC brake press, plasma cutting, and TIG welding.',
      skills: [
        'Sheet Metal Fabrication',
        'Ductwork Installation',
        'Plasma & Laser Cutting',
        'Blueprint Reading',
        'TIG & MIG Welding',
        'Soldering & Brazing',
        'HVAC Systems',
        'CNC Brake Press Operation',
        'Architectural Metal Work',
        'OSHA Safety Compliance',
      ],
      experience: [
        {
          title: 'Journeyman Sheet Metal Worker',
          company: 'Anning-Johnson Company',
          startDate: '2020-01',
          isCurrent: true,
          achievements: [
            'Fabricate and install HVAC ductwork systems for commercial projects averaging $15M, handling 2,000+ lbs of sheet metal per project',
            'Achieved a 100% first-pass inspection rate on all ductwork installations over 4+ years',
            'Mentor 3 apprentice sheet metal workers on layout, fabrication, and installation techniques',
          ],
        },
        {
          title: 'Sheet Metal Apprentice / Mechanic',
          company: 'Southland Industries',
          startDate: '2015-06',
          endDate: '2019-12',
          achievements: [
            'Fabricated ductwork, fittings, and transitions in a production shop processing 50,000 lbs of sheet metal monthly',
            'Installed ductwork and architectural metal panels on 40+ commercial and hospital projects',
            'Completed SMART Local Union 5-year apprenticeship program and earned journeyman classification',
          ],
        },
      ],
      education: [
        {
          institution: 'SMART (Sheet Metal Workers International) Apprenticeship',
          degree: 'Certificate',
          field: 'Sheet Metal Technology',
          startDate: '2015-06',
          endDate: '2020-06',
        },
      ],
      certifications: [
        { name: 'Journeyman Sheet Metal Worker', issuer: 'SMART International', date: '2020-06' },
        { name: 'OSHA 30-Hour Construction', issuer: 'OSHA', date: '2016-09' },
      ],
    }),
    faqs: [
      {
        question: 'What should a sheet metal worker highlight on a resume?',
        answer:
          'Emphasize fabrication methods (CNC, plasma, TIG welding), types of projects (HVAC ductwork, architectural), project values, and inspection pass rates.',
      },
      {
        question: 'Is the SMART apprenticeship important to include?',
        answer:
          'Yes. The SMART (Sheet Metal Workers International) apprenticeship is the standard pathway. Include program duration, journeyman status, and any specialization areas.',
      },
      {
        question: 'How do I quantify sheet metal work?',
        answer:
          'Include pounds or linear feet of metal fabricated, number of projects completed, inspection pass rates, and any efficiency or waste reduction improvements.',
      },
    ],
  },
];
