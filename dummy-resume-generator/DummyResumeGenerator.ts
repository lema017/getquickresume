import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

/**
 * DummyResumeGenerator - Creates dummy resume PDFs with realistic content
 * for testing purposes with specific file sizes (1.5 MB, 3 MB, 5 MB, and 51 MB).
 */
export class DummyResumeGenerator {
  private readonly TARGET_1_5MB = 1.5 * 1024 * 1024; // 1.5 MB in bytes
  private readonly TARGET_3MB = 3 * 1024 * 1024; // 3 MB in bytes
  private readonly TARGET_5MB = 5 * 1024 * 1024; // 5 MB in bytes
  private readonly TARGET_51MB = 51 * 1024 * 1024; // 51 MB in bytes

  /**
   * Generates a resume PDF with approximately 1.5 MB file size
   */
  async generate1_5MBResume(outputPath: string): Promise<void> {
    return this.generateResume(outputPath, this.TARGET_1_5MB);
  }

  /**
   * Generates a resume PDF with approximately 3 MB file size
   */
  async generate3MBResume(outputPath: string): Promise<void> {
    return this.generateResume(outputPath, this.TARGET_3MB);
  }

  /**
   * Generates a resume PDF with approximately 5 MB file size
   */
  async generate5MBResume(outputPath: string): Promise<void> {
    return this.generateResume(outputPath, this.TARGET_5MB);
  }

  /**
   * Generates a resume PDF with approximately 51 MB file size
   */
  async generate51MBResume(outputPath: string): Promise<void> {
    return this.generateResume(outputPath, this.TARGET_51MB);
  }

  /**
   * Main method to generate a resume PDF with target file size
   */
  private async generateResume(outputPath: string, targetSize: number): Promise<void> {
    return new Promise((resolve, reject) => {
      // Ensure output directory exists
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
        bufferPages: true,
      });

      const writeStream = fs.createWriteStream(outputPath);
      doc.pipe(writeStream);

      // Add resume content
      this.addHeader(doc);
      this.addContactInfo(doc);
      this.addProfessionalSummary(doc);
      this.addWorkExperience(doc);
      this.addEducation(doc);
      this.addSkills(doc);
      this.addCertifications(doc);

      // Calculate how much padding content we need
      // PDFKit doesn't provide exact byte size during generation,
      // so we estimate and add extra content pages
      const estimatedBaseSize = 50000; // ~50KB for basic resume
      const remainingSize = targetSize - estimatedBaseSize;
      const pagesNeeded = Math.ceil(remainingSize / 15000); // ~15KB per text-heavy page

      this.addPaddingContent(doc, pagesNeeded, targetSize);

      doc.end();

      writeStream.on('finish', () => {
        // Verify and adjust file size if needed
        const stats = fs.statSync(outputPath);
        console.log(`Generated PDF: ${outputPath}`);
        console.log(`File size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
        resolve();
      });

      writeStream.on('error', reject);
    });
  }

  /**
   * Adds the resume header with name and title
   */
  private addHeader(doc: PDFKit.PDFDocument): void {
    doc
      .fontSize(28)
      .font('Helvetica-Bold')
      .text('JOHN ALEXANDER SMITH', { align: 'center' })
      .moveDown(0.3);

    doc
      .fontSize(14)
      .font('Helvetica')
      .fillColor('#555555')
      .text('Senior Software Engineer | Full Stack Developer | Tech Lead', { align: 'center' })
      .fillColor('#000000')
      .moveDown(1);
  }

  /**
   * Adds contact information section
   */
  private addContactInfo(doc: PDFKit.PDFDocument): void {
    doc
      .fontSize(10)
      .font('Helvetica')
      .text('Email: john.smith@email.com | Phone: +1 (555) 123-4567 | Location: San Francisco, CA', { align: 'center' })
      .text('LinkedIn: linkedin.com/in/johnsmith | GitHub: github.com/johnsmith | Portfolio: johnsmith.dev', { align: 'center' })
      .moveDown(1);

    // Add horizontal line
    doc
      .moveTo(50, doc.y)
      .lineTo(545, doc.y)
      .stroke()
      .moveDown(0.5);
  }

  /**
   * Adds professional summary section
   */
  private addProfessionalSummary(doc: PDFKit.PDFDocument): void {
    this.addSectionTitle(doc, 'PROFESSIONAL SUMMARY');

    const summary = `Results-driven Senior Software Engineer with over 10 years of experience in designing, developing, and deploying 
scalable web applications and distributed systems. Proven track record of leading cross-functional teams to deliver high-impact 
projects on time and within budget. Expert in modern JavaScript frameworks, cloud technologies, and agile methodologies. 
Passionate about code quality, mentoring junior developers, and driving technical innovation. Successfully architected and 
implemented systems serving millions of users with 99.99% uptime. Strong communicator with experience presenting technical 
concepts to both technical and non-technical stakeholders.`;

    doc
      .fontSize(10)
      .font('Helvetica')
      .text(summary, { align: 'justify', lineGap: 2 })
      .moveDown(1);
  }

  /**
   * Adds work experience section
   */
  private addWorkExperience(doc: PDFKit.PDFDocument): void {
    this.addSectionTitle(doc, 'PROFESSIONAL EXPERIENCE');

    const experiences = [
      {
        company: 'TechCorp Global Inc.',
        location: 'San Francisco, CA',
        title: 'Senior Software Engineer / Tech Lead',
        period: 'January 2020 - Present',
        achievements: [
          'Led a team of 8 engineers in redesigning the core platform architecture, resulting in 40% improvement in application performance and 60% reduction in infrastructure costs',
          'Architected and implemented a microservices-based backend using Node.js, TypeScript, and AWS Lambda, handling over 10 million daily API requests with sub-100ms response times',
          'Designed and deployed a real-time data processing pipeline using Apache Kafka and AWS Kinesis, processing 500,000+ events per minute',
          'Mentored 12 junior developers through code reviews, pair programming sessions, and technical workshops, contributing to 80% team retention rate',
          'Established engineering best practices including comprehensive testing strategies, CI/CD pipelines, and documentation standards',
        ],
      },
      {
        company: 'Innovation Labs LLC',
        location: 'New York, NY',
        title: 'Full Stack Developer',
        period: 'June 2016 - December 2019',
        achievements: [
          'Developed and maintained a SaaS platform serving 50,000+ active users, implementing features using React, Redux, and GraphQL',
          'Optimized database queries and implemented caching strategies, reducing average page load time from 3.5s to 0.8s',
          'Built RESTful APIs and WebSocket services using Node.js and Express, supporting real-time collaboration features',
          'Implemented comprehensive monitoring and alerting using Datadog and PagerDuty, reducing incident response time by 70%',
          'Collaborated with product and design teams to deliver user-centric features, resulting in 25% increase in user engagement',
        ],
      },
      {
        company: 'StartupXYZ',
        location: 'Austin, TX',
        title: 'Junior Software Developer',
        period: 'August 2014 - May 2016',
        achievements: [
          'Contributed to the development of a mobile-first web application using Angular and Ionic framework',
          'Implemented automated testing suites using Jest and Cypress, achieving 85% code coverage',
          'Participated in agile ceremonies and contributed to sprint planning and retrospectives',
          'Developed internal tools that automated repetitive tasks, saving the team 15+ hours per week',
        ],
      },
    ];

    for (const exp of experiences) {
      this.addExperienceEntry(doc, exp);
    }
  }

  /**
   * Adds a single experience entry
   */
  private addExperienceEntry(
    doc: PDFKit.PDFDocument,
    exp: { company: string; location: string; title: string; period: string; achievements: string[] }
  ): void {
    doc
      .fontSize(11)
      .font('Helvetica-Bold')
      .text(exp.company, { continued: true })
      .font('Helvetica')
      .text(` | ${exp.location}`, { align: 'left' });

    doc
      .fontSize(10)
      .font('Helvetica-Oblique')
      .text(exp.title, { continued: true })
      .font('Helvetica')
      .text(` | ${exp.period}`)
      .moveDown(0.3);

    for (const achievement of exp.achievements) {
      doc
        .fontSize(10)
        .font('Helvetica')
        .text(`• ${achievement}`, { indent: 15, align: 'justify', lineGap: 1 });
    }

    doc.moveDown(0.8);
  }

  /**
   * Adds education section
   */
  private addEducation(doc: PDFKit.PDFDocument): void {
    this.addSectionTitle(doc, 'EDUCATION');

    doc
      .fontSize(11)
      .font('Helvetica-Bold')
      .text('Master of Science in Computer Science')
      .fontSize(10)
      .font('Helvetica')
      .text('Stanford University, Stanford, CA | 2012 - 2014')
      .text('GPA: 3.9/4.0 | Specialization: Distributed Systems and Machine Learning')
      .moveDown(0.5);

    doc
      .fontSize(11)
      .font('Helvetica-Bold')
      .text('Bachelor of Science in Computer Engineering')
      .fontSize(10)
      .font('Helvetica')
      .text('University of California, Berkeley | 2008 - 2012')
      .text('GPA: 3.8/4.0 | Dean\'s List | Relevant Coursework: Data Structures, Algorithms, Operating Systems')
      .moveDown(1);
  }

  /**
   * Adds skills section
   */
  private addSkills(doc: PDFKit.PDFDocument): void {
    this.addSectionTitle(doc, 'TECHNICAL SKILLS');

    const skills = {
      'Programming Languages': 'JavaScript, TypeScript, Python, Java, Go, Rust, C++, SQL, GraphQL',
      'Frontend Technologies': 'React, Vue.js, Angular, Next.js, Redux, Tailwind CSS, SASS, HTML5, CSS3',
      'Backend Technologies': 'Node.js, Express, NestJS, Django, Spring Boot, FastAPI, gRPC',
      'Databases': 'PostgreSQL, MySQL, MongoDB, Redis, DynamoDB, Elasticsearch, Cassandra',
      'Cloud & DevOps': 'AWS, GCP, Azure, Docker, Kubernetes, Terraform, Jenkins, GitHub Actions, CircleCI',
      'Tools & Methodologies': 'Git, Jira, Agile/Scrum, TDD, CI/CD, Microservices, Event-Driven Architecture',
    };

    for (const [category, skillList] of Object.entries(skills)) {
      doc
        .fontSize(10)
        .font('Helvetica-Bold')
        .text(`${category}: `, { continued: true })
        .font('Helvetica')
        .text(skillList);
    }

    doc.moveDown(1);
  }

  /**
   * Adds certifications section
   */
  private addCertifications(doc: PDFKit.PDFDocument): void {
    this.addSectionTitle(doc, 'CERTIFICATIONS & AWARDS');

    const certifications = [
      'AWS Solutions Architect Professional (2023)',
      'Google Cloud Professional Cloud Architect (2022)',
      'Kubernetes Administrator (CKA) (2021)',
      'MongoDB Certified Developer (2020)',
      'Oracle Certified Java Professional (2019)',
    ];

    for (const cert of certifications) {
      doc.fontSize(10).font('Helvetica').text(`• ${cert}`);
    }

    doc.moveDown(1);
  }

  /**
   * Adds section title with styling
   */
  private addSectionTitle(doc: PDFKit.PDFDocument, title: string): void {
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .fillColor('#2c3e50')
      .text(title)
      .fillColor('#000000');

    // Add underline
    doc
      .moveTo(50, doc.y)
      .lineTo(545, doc.y)
      .stroke('#2c3e50')
      .moveDown(0.5);
  }

  /**
   * Adds padding content to reach target file size
   * Text-only PDFs are very efficient (~3-5KB per page of text)
   * We need many more pages than initially estimated
   */
  private addPaddingContent(doc: PDFKit.PDFDocument, _pagesNeeded: number, targetSize: number): void {
    // Based on testing: ~8KB per page with our dense content
    const bytesPerPage = 8500;
    const actualPagesNeeded = Math.ceil(targetSize / bytesPerPage);
    
    // Generate extensive additional content to reach target size
    const additionalSections = this.generateExtensiveContent(targetSize);

    for (let i = 0; i < actualPagesNeeded; i++) {
      doc.addPage();

      // Add page header
      doc
        .fontSize(14)
        .font('Helvetica-Bold')
        .text(`DETAILED PROJECT PORTFOLIO - SECTION ${i + 1}`, { align: 'center' })
        .moveDown(0.5);

      // Add horizontal line
      doc
        .moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke()
        .moveDown(0.5);

      // Add detailed project descriptions
      const projects = this.generateProjectDescriptions(i);
      for (const project of projects) {
        this.addProjectEntry(doc, project);
      }

      // Add technical deep dives - cycle through sections
      const sectionIndex = i % additionalSections.length;
      this.addTechnicalDeepDive(doc, additionalSections[sectionIndex]);

      // Add dense filler text to maximize content per page
      this.addDenseFillerContent(doc, i);

      // Add references and testimonials
      this.addTestimonials(doc, i);
    }
  }

  /**
   * Adds dense filler content to maximize bytes per page
   */
  private addDenseFillerContent(doc: PDFKit.PDFDocument, pageIndex: number): void {
    const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet sed, vulputate eget, feugiat sit amet, nunc. Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris ut lectus. Nunc tellus ante, mattis eget, gravida vitae, ultricies ac, leo. Integer leo pede, ornare a, lacinia eu, vulputate vel, nisl.`;

    const technicalContent = `
Advanced Technical Implementation Details - Page ${pageIndex + 1}:

System Architecture Overview:
The distributed system architecture implements a microservices-based approach with event-driven communication patterns. Each service is containerized using Docker and orchestrated through Kubernetes clusters deployed across multiple availability zones. The system leverages Apache Kafka for asynchronous message processing, enabling decoupled service communication and ensuring eventual consistency across the platform.

Database Layer Implementation:
The persistence layer utilizes a polyglot approach, selecting the optimal database technology for each domain. PostgreSQL serves as the primary relational database for transactional data, while MongoDB handles document-oriented workloads. Redis provides caching capabilities and session management, and Elasticsearch powers the full-text search functionality. Database sharding is implemented horizontally across multiple nodes to ensure linear scalability.

API Gateway and Service Mesh:
Kong API Gateway handles incoming traffic, providing rate limiting, authentication, and request routing. Istio service mesh manages inter-service communication, implementing mTLS for secure transport, circuit breakers for fault tolerance, and distributed tracing for observability. The gateway implements OAuth 2.0 and OpenID Connect for secure authentication flows.

Monitoring and Observability Stack:
Comprehensive monitoring is achieved through the combination of Prometheus for metrics collection, Grafana for visualization, and Jaeger for distributed tracing. Custom dashboards provide real-time visibility into system health, performance metrics, and business KPIs. Alerting rules trigger notifications through PagerDuty for critical incidents.

CI/CD Pipeline Architecture:
The continuous integration and deployment pipeline is built on GitHub Actions, with stages for code quality checks, automated testing, security scanning, and deployment. Infrastructure is managed as code using Terraform, enabling reproducible environments across development, staging, and production. Blue-green deployments minimize downtime during releases.

Security Implementation:
Multi-layered security controls include WAF rules, DDoS protection, encryption at rest and in transit, and regular penetration testing. Secrets management is handled through HashiCorp Vault, and all access is governed by role-based access control policies. Compliance with SOC 2 Type II and GDPR requirements is maintained through automated controls and regular audits.
`;

    doc
      .fontSize(8)
      .font('Helvetica')
      .text(loremIpsum, { align: 'justify', lineGap: 1 })
      .moveDown(0.3)
      .text(technicalContent, { align: 'justify', lineGap: 1 })
      .moveDown(0.3);
  }

  /**
   * Generates extensive content sections based on target size
   */
  private generateExtensiveContent(targetSize: number): string[] {
    const sections: string[] = [];
    const sectionCount = Math.ceil(targetSize / (1024 * 1024)); // Roughly one section per MB

    const technicalTopics = [
      'Microservices Architecture and Design Patterns',
      'Distributed Systems and Consensus Algorithms',
      'Real-time Data Processing and Stream Analytics',
      'Machine Learning Pipeline Development',
      'Security Best Practices and Implementation',
      'Performance Optimization Techniques',
      'Database Design and Query Optimization',
      'API Design and RESTful Best Practices',
      'Cloud Infrastructure and Scalability',
      'DevOps and Continuous Integration',
      'Frontend Performance and User Experience',
      'Testing Strategies and Quality Assurance',
      'Technical Leadership and Team Management',
      'Agile Methodologies and Project Management',
      'Code Review Practices and Standards',
    ];

    for (let i = 0; i < sectionCount; i++) {
      const topic = technicalTopics[i % technicalTopics.length];
      sections.push(this.generateTechnicalContent(topic, i));
    }

    return sections;
  }

  /**
   * Generates detailed technical content for a topic
   */
  private generateTechnicalContent(topic: string, index: number): string {
    const detailedContent = `
${topic} - In-Depth Analysis and Implementation Experience (Section ${index + 1})

Throughout my career, I have developed extensive expertise in ${topic.toLowerCase()}, implementing solutions that have 
significantly impacted business outcomes and technical excellence. This section provides a comprehensive overview of my 
experience, methodologies, and key achievements in this domain.

Background and Context:
The field of ${topic.toLowerCase()} has evolved significantly over the past decade, with new tools, frameworks, and 
best practices emerging to address the growing complexity of modern software systems. My journey in this area began 
during my graduate studies at Stanford, where I conducted research on distributed computing and system design.

Key Projects and Implementations:
One of my most significant contributions was the redesign of a legacy monolithic application into a modern 
microservices architecture. This project involved careful analysis of domain boundaries, implementation of event-driven 
communication patterns, and establishment of robust monitoring and observability practices. The resulting system 
demonstrated a 300% improvement in scalability and a 50% reduction in operational costs.

Technical Deep Dive:
The implementation leveraged several cutting-edge technologies including Docker containerization, Kubernetes 
orchestration, and service mesh architectures using Istio. We implemented circuit breakers, retry policies, and 
rate limiting to ensure system resilience. The API gateway pattern was used to handle cross-cutting concerns such as 
authentication, authorization, and request routing.

Lessons Learned and Best Practices:
Through this experience, I developed a comprehensive understanding of the challenges and opportunities in ${topic.toLowerCase()}. 
Key lessons include the importance of incremental migration strategies, the value of comprehensive testing at all levels 
(unit, integration, end-to-end), and the critical role of monitoring and observability in maintaining system health.

Future Directions:
I continue to stay at the forefront of developments in this field, actively participating in conferences, contributing 
to open-source projects, and mentoring other engineers. My current focus areas include exploring WebAssembly for 
edge computing, investigating new approaches to observability using eBPF, and evaluating the potential of AI-assisted 
development tools.
`;

    return detailedContent;
  }

  /**
   * Generates detailed project descriptions
   */
  private generateProjectDescriptions(
    pageIndex: number
  ): Array<{ name: string; description: string; technologies: string; impact: string }> {
    const projectTemplates = [
      {
        name: 'Enterprise Resource Planning System',
        description:
          'Led the development of a comprehensive ERP system handling inventory management, order processing, and financial reporting for a Fortune 500 retail company. The system integrates with multiple third-party services and processes over 1 million transactions daily.',
        technologies:
          'React, Node.js, PostgreSQL, Redis, AWS Lambda, SQS, SNS, Elasticsearch, Grafana, Prometheus',
        impact:
          'Reduced operational costs by 35%, improved order processing time by 60%, and enabled real-time inventory visibility across 500+ locations.',
      },
      {
        name: 'Real-time Analytics Dashboard',
        description:
          'Architected and implemented a real-time analytics platform processing streaming data from IoT devices, web applications, and mobile apps. The dashboard provides actionable insights to business stakeholders with sub-second latency.',
        technologies: 'Vue.js, D3.js, Apache Kafka, Apache Flink, ClickHouse, Kubernetes, Terraform',
        impact:
          'Enabled data-driven decision making for 200+ business users, reduced time-to-insight from days to seconds, and processed 10TB+ of data daily.',
      },
      {
        name: 'Customer Identity Platform',
        description:
          'Designed and built a centralized identity and access management platform supporting multiple authentication methods including SSO, MFA, and social login. The platform serves as the authentication backbone for a suite of 15+ applications.',
        technologies: 'TypeScript, NestJS, OAuth 2.0, OIDC, PostgreSQL, Redis, AWS Cognito, Auth0',
        impact:
          'Consolidated authentication for 2M+ users, reduced login-related support tickets by 75%, and achieved SOC 2 Type II compliance.',
      },
      {
        name: 'Machine Learning Pipeline Framework',
        description:
          'Created an end-to-end machine learning pipeline framework enabling data scientists to train, deploy, and monitor models at scale. The framework includes feature stores, model registries, and automated retraining capabilities.',
        technologies: 'Python, MLflow, Kubeflow, Apache Airflow, TensorFlow, PyTorch, S3, SageMaker',
        impact:
          'Reduced model deployment time from weeks to hours, enabled 50+ models in production, and improved model accuracy monitoring by 80%.',
      },
      {
        name: 'Global Content Delivery Network',
        description:
          'Implemented a custom content delivery solution optimizing media delivery for a streaming platform with users across 100+ countries. The system includes intelligent caching, adaptive bitrate streaming, and edge computing capabilities.',
        technologies: 'Go, Rust, Nginx, Varnish, CloudFront, Lambda@Edge, Redis, Prometheus',
        impact:
          'Reduced content delivery latency by 70%, improved video start time by 50%, and handled 500K+ concurrent streams.',
      },
    ];

    // Return different projects based on page index
    const startIndex = (pageIndex * 2) % projectTemplates.length;
    return [
      projectTemplates[startIndex],
      projectTemplates[(startIndex + 1) % projectTemplates.length],
    ];
  }

  /**
   * Adds a project entry to the document
   */
  private addProjectEntry(
    doc: PDFKit.PDFDocument,
    project: { name: string; description: string; technologies: string; impact: string }
  ): void {
    doc
      .fontSize(11)
      .font('Helvetica-Bold')
      .text(project.name)
      .moveDown(0.2);

    doc
      .fontSize(10)
      .font('Helvetica')
      .text(project.description, { align: 'justify', lineGap: 1 })
      .moveDown(0.3);

    doc
      .font('Helvetica-Bold')
      .text('Technologies: ', { continued: true })
      .font('Helvetica')
      .text(project.technologies)
      .moveDown(0.2);

    doc
      .font('Helvetica-Bold')
      .text('Business Impact: ', { continued: true })
      .font('Helvetica')
      .text(project.impact)
      .moveDown(0.8);
  }

  /**
   * Adds a technical deep dive section
   */
  private addTechnicalDeepDive(doc: PDFKit.PDFDocument, content: string): void {
    doc
      .fontSize(10)
      .font('Helvetica')
      .text(content, { align: 'justify', lineGap: 1 })
      .moveDown(0.5);
  }

  /**
   * Adds testimonials and references
   */
  private addTestimonials(doc: PDFKit.PDFDocument, pageIndex: number): void {
    const testimonials = [
      {
        quote:
          'John is an exceptional engineer who consistently delivers high-quality solutions. His technical expertise and leadership skills make him an invaluable asset to any team.',
        author: 'Sarah Johnson, VP of Engineering at TechCorp',
      },
      {
        quote:
          'Working with John was a transformative experience. He brought clarity to complex technical challenges and mentored our team to new heights of excellence.',
        author: 'Michael Chen, CTO at Innovation Labs',
      },
      {
        quote:
          'John\'s ability to balance technical excellence with business acumen sets him apart. He consistently delivered solutions that exceeded expectations.',
        author: 'Emily Rodriguez, Product Director at StartupXYZ',
      },
    ];

    const testimonial = testimonials[pageIndex % testimonials.length];

    doc
      .fontSize(9)
      .font('Helvetica-Oblique')
      .text(`"${testimonial.quote}"`, { align: 'center' })
      .font('Helvetica')
      .text(`- ${testimonial.author}`, { align: 'center' })
      .moveDown(0.5);
  }
}

// Main execution for testing
async function main() {
  const generator = new DummyResumeGenerator();
  const outputDir = './output';

  console.log('Starting resume generation...');

  try {
    await generator.generate1_5MBResume(`${outputDir}/resume-1.5mb.pdf`);
    await generator.generate3MBResume(`${outputDir}/resume-3mb.pdf`);
    await generator.generate5MBResume(`${outputDir}/resume-5mb.pdf`);
    await generator.generate51MBResume(`${outputDir}/resume-51mb.pdf`);
    console.log('Resume generation completed successfully!');
  } catch (error) {
    console.error('Error generating resumes:', error);
  }
}

// Run if executed directly
main();
