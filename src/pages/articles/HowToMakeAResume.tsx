import { Link } from 'react-router-dom';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { ArticleCTA } from '@/components/blog/ArticleCTA';
import { StepHeading } from '@/components/blog/StepHeading';
import { SectionDivider } from '@/components/blog/SectionDivider';
import { getArticleBySlug, getRelatedArticles } from '@/data/articles';
import { CheckCircle, XCircle, FileText, Layout, Monitor, Download, Share2, FileCheck } from 'lucide-react';

export function HowToMakeAResume() {
  const article = getArticleBySlug('how-to-make-a-resume', 'en')!;
  const relatedArticles = getRelatedArticles(article.slug, 'en');

  return (
    <BlogLayout
      title={article.title}
      excerpt={article.excerpt}
      category={article.category}
      readTime={article.readTime}
      publishDate={article.publishDate}
      imageUrl={article.imageUrl}
      relatedArticles={relatedArticles}
    >
      {/* Introduction */}
      <p className="text-xl text-gray-600 leading-relaxed">
        Making a resume in 2026 is easier than ever — but making a resume that gets results still requires 
        knowing the right approach. With the right tools and methods, you can create a professional, ATS-optimized 
        resume in under 30 minutes, even if you've never made one before.
      </p>

      <p>
        This step-by-step guide covers everything from choosing your format to finalizing your document, 
        with practical examples and tool recommendations for every stage of the process.
      </p>

      <SectionDivider icon={Layout}>Step 1: Choose Your Resume Format</SectionDivider>

      <p>
        Before you start adding content, decide on the format that best showcases your experience. 
        The format you choose depends on your career level and the story you want to tell.
      </p>

      <h3>The Three Main Resume Formats</h3>

      <div className="my-8 space-y-4 not-prose">
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <span className="text-blue-700 font-bold">1</span>
            </div>
            <h4 className="font-bold text-gray-900">Chronological (Reverse-Chronological)</h4>
          </div>
          <p className="text-gray-700 mb-2">
            Lists work experience from most recent to oldest. This is the most common and ATS-friendly format.
          </p>
          <p className="text-sm text-gray-600">
            <strong>Best for:</strong> Most job seekers, especially those with steady career progression.
          </p>
        </div>

        <div className="p-6 bg-purple-50 border border-purple-200 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <span className="text-purple-700 font-bold">2</span>
            </div>
            <h4 className="font-bold text-gray-900">Functional (Skills-Based)</h4>
          </div>
          <p className="text-gray-700 mb-2">
            Highlights skills and abilities at the top, with work history minimized. Focuses on what you can do, 
            not where you worked.
          </p>
          <p className="text-sm text-gray-600">
            <strong>Best for:</strong> Career changers, those with employment gaps, or recent graduates.
          </p>
        </div>

        <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <span className="text-green-700 font-bold">3</span>
            </div>
            <h4 className="font-bold text-gray-900">Combination (Hybrid)</h4>
          </div>
          <p className="text-gray-700 mb-2">
            Merges chronological and functional elements, featuring both skills and detailed work history.
          </p>
          <p className="text-sm text-gray-600">
            <strong>Best for:</strong> Experienced professionals with diverse skill sets and notable achievements.
          </p>
        </div>
      </div>

      <p>
        For most job seekers, the <strong>chronological format is the safest choice</strong> — it's what recruiters 
        expect and what ATS systems parse most accurately.
      </p>

      <ArticleCTA 
        variant="inline"
        description="Not sure which format is right for you? GetQuickResume automatically recommends the best format based on your career history and goals."
      />

      <SectionDivider icon={FileText}>Step 2: Gather Your Information</SectionDivider>

      <p>
        Before you start building, collect all the information you'll need. Having everything ready 
        makes the process much faster and ensures you don't forget important details.
      </p>

      <StepHeading step={1}>Essential Information Checklist</StepHeading>

      <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl">
        <h4 className="font-bold text-gray-900 mb-4">What to Gather Before You Start</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-semibold text-blue-800 mb-2">Contact Information</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>Full name</li>
              <li>Professional email address</li>
              <li>Phone number</li>
              <li>City and state</li>
              <li>LinkedIn URL</li>
              <li>Portfolio or personal website (if applicable)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-blue-800 mb-2">Work Experience</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>Job titles</li>
              <li>Company names and locations</li>
              <li>Employment dates (month/year)</li>
              <li>Key achievements with numbers</li>
              <li>Responsibilities that match target role</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-blue-800 mb-2">Education</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>Degrees earned</li>
              <li>University names</li>
              <li>Graduation dates</li>
              <li>Relevant coursework (optional)</li>
              <li>GPA (if exceptional and recent)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-blue-800 mb-2">Skills & Certifications</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>Technical skills (software, tools)</li>
              <li>Industry-specific skills</li>
              <li>Certifications and licenses</li>
              <li>Languages</li>
              <li>Notable projects</li>
            </ul>
          </div>
        </div>
      </div>

      <StepHeading step={2}>Analyze the Job Description</StepHeading>

      <p>
        If you're targeting a specific role, review the job description and highlight:
      </p>

      <ul>
        <li><strong>Required skills</strong> — These must appear on your resume</li>
        <li><strong>Preferred qualifications</strong> — Include if you have them</li>
        <li><strong>Action verbs</strong> — Mirror their language when describing your experience</li>
        <li><strong>Key responsibilities</strong> — Emphasize similar accomplishments</li>
      </ul>

      <p>
        This analysis ensures your resume speaks directly to what the employer wants.
      </p>

      <SectionDivider icon={Monitor}>Step 3: Choose Your Resume Builder Tool</SectionDivider>

      <p>
        You have several options for actually creating your resume. Each has pros and cons:
      </p>

      <h3>Option A: AI-Powered Resume Builders (Recommended)</h3>

      <p>
        Modern AI resume builders like GetQuickResume offer significant advantages:
      </p>

      <ul>
        <li><strong>ATS-optimized templates</strong> — Tested to pass applicant tracking systems</li>
        <li><strong>Content suggestions</strong> — AI helps phrase your experience professionally</li>
        <li><strong>Formatting handled automatically</strong> — No design skills needed</li>
        <li><strong>Real-time feedback</strong> — Know immediately if something's missing</li>
        <li><strong>Multiple formats</strong> — Download as PDF, Word, or plain text</li>
      </ul>

      <h3>Option B: Word Processors (Google Docs, Microsoft Word)</h3>

      <p>
        Traditional but requires more effort:
      </p>

      <ul>
        <li><strong>Pros:</strong> Full control over every detail, widely accessible</li>
        <li><strong>Cons:</strong> Formatting can break, harder to ensure ATS compatibility, time-consuming</li>
      </ul>

      <h3>Option C: Professional Resume Writers</h3>

      <p>
        Best for executives or complex career situations:
      </p>

      <ul>
        <li><strong>Pros:</strong> Expert writing, strategic positioning, saves your time</li>
        <li><strong>Cons:</strong> Expensive ($200-$1,000+), requires multiple revisions</li>
      </ul>

      <ArticleCTA 
        variant="inline"
        description="For most job seekers, an AI-powered builder delivers professional results in minutes at no cost. Try GetQuickResume free and see the difference."
      />

      <SectionDivider icon={FileCheck}>Step 4: Build Each Section</SectionDivider>

      <p>
        Now it's time to actually create your content. Follow this order for the best workflow:
      </p>

      <StepHeading step={1}>Header and Contact Information</StepHeading>

      <p>
        Keep it simple and professional:
      </p>

      <ul>
        <li>Name in a larger font (18-24pt)</li>
        <li>Phone and professional email on one line</li>
        <li>Location (city, state) — full address not necessary</li>
        <li>LinkedIn URL if it's current and professional</li>
      </ul>

      <div className="my-6 p-4 bg-red-50 border border-red-200 rounded-xl">
        <div className="flex items-start gap-2">
          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            <strong>Avoid:</strong> Photos (in most countries), age, marital status, religious affiliations, 
            or unprofessional email addresses like "partyking99@email.com"
          </p>
        </div>
      </div>

      <StepHeading step={2}>Professional Summary</StepHeading>

      <p>
        Write 3-4 sentences that capture who you are and what you offer. This should be specific 
        and achievement-oriented, not generic.
      </p>

      <p>
        See our detailed guide on{' '}
        <Link to="/blog/how-to-write-a-resume" className="text-blue-600 hover:underline">
          how to write effective resume content
        </Link>{' '}
        for professional summary formulas and examples.
      </p>

      <StepHeading step={3}>Work Experience</StepHeading>

      <p>
        For each position, include:
      </p>

      <ul>
        <li><strong>Job title, Company, Location</strong> — Clear and prominent</li>
        <li><strong>Dates</strong> — Month/Year to Month/Year format</li>
        <li><strong>3-5 achievement bullets</strong> — Results-focused, quantified where possible</li>
      </ul>

      <p>
        If you're using GetQuickResume, the AI can help transform basic job descriptions into 
        compelling achievement statements automatically.
      </p>

      <StepHeading step={4}>Skills Section</StepHeading>

      <p>
        List 8-12 relevant skills, prioritizing those mentioned in the job description. 
        Categorize as technical vs. soft skills for clarity.
      </p>

      <StepHeading step={5}>Education</StepHeading>

      <p>
        Include degree, institution, location, and graduation year. Add GPA only if it's impressive 
        (3.5+) and you're within 3 years of graduation.
      </p>

      <p>
        Read more about{' '}
        <Link to="/blog/should-i-put-gpa-on-resume" className="text-blue-600 hover:underline">
          when to include your GPA on a resume
        </Link>{' '}
        for detailed guidance.
      </p>

      <SectionDivider icon={Download}>Step 5: Format, Export, and Save</SectionDivider>

      <p>
        Once your content is complete, ensure proper formatting and save in the right formats.
      </p>

      <h3>Formatting Best Practices</h3>

      <ul>
        <li><strong>Font:</strong> Clean, professional fonts like Arial, Calibri, or Georgia at 10-12pt</li>
        <li><strong>Margins:</strong> 0.5 to 1 inch on all sides</li>
        <li><strong>Length:</strong> 1 page for under 10 years experience, 2 pages max for senior professionals</li>
        <li><strong>White space:</strong> Don't overcrowd — breathing room improves readability</li>
        <li><strong>Consistency:</strong> Same formatting for dates, bullet points, and spacing throughout</li>
      </ul>

      <h3>File Formats to Save</h3>

      <div className="my-6 grid md:grid-cols-2 gap-4 not-prose">
        <div className="p-5 bg-green-50 border border-green-200 rounded-xl">
          <h4 className="font-bold text-green-800 mb-2">PDF (Primary)</h4>
          <p className="text-sm text-gray-700">
            Always submit as PDF unless specifically requested otherwise. PDFs preserve formatting 
            across all devices and operating systems.
          </p>
        </div>
        <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl">
          <h4 className="font-bold text-blue-800 mb-2">Word Doc (Backup)</h4>
          <p className="text-sm text-gray-700">
            Keep a .docx version for applications that require it, and for easy future editing.
          </p>
        </div>
      </div>

      <SectionDivider icon={Share2}>Step 6: Review and Optimize</SectionDivider>

      <p>
        Before sending your resume anywhere, complete this final checklist:
      </p>

      <div className="my-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
        <h4 className="font-bold text-amber-900 mb-4">Final Review Checklist</h4>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            'Proofread for typos and grammatical errors',
            'Verify all dates and company names are accurate',
            'Check that contact information is current',
            'Ensure formatting is consistent throughout',
            'Confirm file name is professional (FirstName_LastName_Resume.pdf)',
            'Test that links (LinkedIn, portfolio) work correctly',
            'Run through ATS checker if available',
            'Have a friend review for clarity and impact'
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <p>
        Use our{' '}
        <Link to="/ats-resume-checker" className="text-blue-600 hover:underline">
          free ATS resume checker
        </Link>{' '}
        to verify your resume will pass automated screening before you apply.
      </p>

      <SectionDivider icon={FileCheck}>Key Takeaways</SectionDivider>

      <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl not-prose shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Layout className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Resume Creation Summary</h3>
        </div>
        <ul className="space-y-3">
          {[
            'Choose chronological format for maximum ATS compatibility',
            'Gather all information before you start building',
            'Use an AI-powered builder for fastest, most professional results',
            'Follow the job description to match keywords and requirements',
            'Write achievement-focused bullets with quantified results',
            'Keep to 1-2 pages with clean, consistent formatting',
            'Always export and submit as PDF',
            'Review thoroughly before sending to employers'
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p>
        Making a professional resume doesn't have to be complicated or expensive. With the right approach 
        and tools, you can create a compelling document that opens doors to new opportunities.
      </p>

      <p>
        Ready to make your resume? GetQuickResume's AI-powered platform guides you through every step, 
        from choosing your format to writing compelling content. No design skills required — just answer 
        a few questions and get a professional, ATS-optimized resume in minutes.{' '}
        <Link to="/login" className="text-blue-600 hover:underline font-medium">
          Start building your resume free
        </Link>.
      </p>
    </BlogLayout>
  );
}
