import { BlogLayout } from '@/components/blog/BlogLayout';
import { ArticleCTA } from '@/components/blog/ArticleCTA';
import { StepHeading } from '@/components/blog/StepHeading';
import { SectionDivider } from '@/components/blog/SectionDivider';
import { getArticleBySlug, getRelatedArticles } from '@/data/articles';
import { CheckCircle, XCircle, AlertTriangle, Search, FileCheck, BarChart3, Filter, Bot, ShieldAlert, Settings, ClipboardCheck } from 'lucide-react';

export function WhatIsATS() {
  const article = getArticleBySlug('what-is-ats-system', 'en')!;
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
        Here's a sobering fact: <strong>up to 75% of resumes are rejected before a human ever 
        sees them</strong>. The culprit? Applicant Tracking Systems (ATS) — the silent 
        gatekeepers of the modern job market.
      </p>

      <p>
        If you've ever applied for a job online and wondered why you never heard back despite 
        being qualified, there's a good chance an ATS filtered you out. Understanding how 
        these systems work — and how to optimize your resume for them — can dramatically 
        increase your chances of landing interviews.
      </p>

      <SectionDivider icon={Bot}>What is an Applicant Tracking System (ATS)?</SectionDivider>

      <p>
        An Applicant Tracking System is software that companies use to manage their recruitment 
        process. Think of it as a digital filing cabinet combined with a search engine. It 
        collects, sorts, scans, and ranks the resumes companies receive.
      </p>

      <p>
        For job seekers, the ATS is the first hurdle. Before a recruiter reviews your resume, 
        the ATS has already scanned it, extracted information, and determined if you're worth 
        a closer look.
      </p>

      <h3>Why Do Companies Use ATS?</h3>

      <p>
        The numbers tell the story:
      </p>

      <ul>
        <li>A single corporate job posting receives an average of <strong>250 resumes</strong></li>
        <li>Large companies may receive <strong>millions of applications per year</strong></li>
        <li>Recruiters spend only <strong>6-7 seconds</strong> reviewing a resume initially</li>
      </ul>

      <p>
        Without ATS software, it would be impossible for HR teams to manage this volume. 
        The ATS helps filter candidates efficiently, saving companies countless hours.
      </p>

      <h3>Popular ATS Systems</h3>

      <p>
        You've likely encountered these systems without knowing it:
      </p>

      <div className="my-6 grid grid-cols-2 md:grid-cols-4 gap-3 not-prose">
        {['Workday', 'Greenhouse', 'Lever', 'Taleo', 'iCIMS', 'Jobvite', 'BambooHR', 'SAP SuccessFactors'].map((ats) => (
          <div key={ats} className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl text-center text-sm font-medium text-gray-700 border border-gray-200 shadow-sm">
            {ats}
          </div>
        ))}
      </div>

      <SectionDivider icon={Search}>How ATS Scans and Ranks Your Resume</SectionDivider>

      <p>
        Understanding the ATS scanning process is crucial for optimization. Here's what 
        happens when you submit your resume:
      </p>

      {/* ATS Process Diagram */}
      <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl not-prose shadow-sm">
        <h4 className="font-bold text-gray-900 mb-6 text-center text-lg">How ATS Processes Your Resume</h4>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-3 shadow-sm">
              <Search className="w-7 h-7 text-blue-600" />
            </div>
            <span className="font-semibold text-gray-900">1. Parsing</span>
            <span className="text-sm text-gray-600">Extracts text & data</span>
          </div>
          <div className="hidden md:block text-blue-300 text-3xl font-light">→</div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-3 shadow-sm">
              <Filter className="w-7 h-7 text-blue-600" />
            </div>
            <span className="font-semibold text-gray-900">2. Filtering</span>
            <span className="text-sm text-gray-600">Checks requirements</span>
          </div>
          <div className="hidden md:block text-blue-300 text-3xl font-light">→</div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-3 shadow-sm">
              <BarChart3 className="w-7 h-7 text-blue-600" />
            </div>
            <span className="font-semibold text-gray-900">3. Ranking</span>
            <span className="text-sm text-gray-600">Scores candidates</span>
          </div>
          <div className="hidden md:block text-blue-300 text-3xl font-light">→</div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-3 shadow-sm">
              <FileCheck className="w-7 h-7 text-green-600" />
            </div>
            <span className="font-semibold text-gray-900">4. Review</span>
            <span className="text-sm text-gray-600">Human sees top matches</span>
          </div>
        </div>
      </div>

      <StepHeading step={1}>Parsing</StepHeading>

      <p>
        The ATS reads your resume and extracts information into structured fields: name, 
        contact info, work history, education, skills. If your formatting is too complex, 
        the parser may misread or miss information entirely.
      </p>

      <StepHeading step={2}>Keyword Matching</StepHeading>

      <p>
        The system compares your resume against the job description, looking for relevant 
        keywords. These might include:
      </p>

      <ul>
        <li>Job titles and role-specific terms</li>
        <li>Required skills and technologies</li>
        <li>Certifications and qualifications</li>
        <li>Industry-specific terminology</li>
      </ul>

      <StepHeading step={3}>Scoring and Ranking</StepHeading>

      <p>
        Based on keyword matches and other criteria, the ATS assigns your resume a score. 
        Candidates with higher scores rise to the top of the pile that recruiters actually see.
      </p>

      <ArticleCTA 
        variant="inline"
        description="GetQuickResume automatically optimizes your resume for ATS systems, ensuring your qualifications get seen by human recruiters."
      />

      <SectionDivider icon={ShieldAlert}>Why Resumes Get Rejected by ATS</SectionDivider>

      <p>
        Even qualified candidates get filtered out for reasons that have nothing to do with 
        their qualifications. Here are the most common ATS killers:
      </p>

      <div className="my-6 space-y-4 not-prose">
        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <strong className="text-red-800 text-base">Complex Formatting</strong>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
              Tables, columns, text boxes, and graphics confuse ATS parsers. What looks 
              beautiful to humans can be unreadable to software.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <strong className="text-red-800 text-base">Missing Keywords</strong>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
              If the job asks for "project management" and you only wrote "managed projects," 
              you might not match. Exact phrasing matters.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <strong className="text-red-800 text-base">Wrong File Format</strong>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
              Some older ATS systems struggle with certain file types. When in doubt, 
              PDF is generally safest, though some prefer .docx.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <strong className="text-red-800 text-base">Headers and Footers</strong>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
              Many ATS systems can't read content placed in document headers or footers. 
              Keep important information in the main body.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <strong className="text-red-800 text-base">Images and Icons</strong>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
              That creative icon-based skills section? The ATS sees nothing. All visual 
              elements are essentially invisible to the system.
            </p>
          </div>
        </div>
      </div>

      <SectionDivider icon={Settings}>How to Optimize Your Resume for ATS</SectionDivider>

      <p>
        Now for the good news: once you know the rules, it's not hard to play the game. 
        Here's how to make your resume ATS-friendly:
      </p>

      <StepHeading step={1}>Use Standard Section Headings</StepHeading>

      <p>
        Stick to conventional headings that ATS systems recognize:
      </p>

      <div className="my-6 grid md:grid-cols-2 gap-4 not-prose">
        <div className="p-5 bg-green-50 border border-green-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-green-700">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Good Headings</span>
          </div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>Work Experience</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>Education</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>Skills</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>Professional Summary</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>Certifications</li>
          </ul>
        </div>
        <div className="p-5 bg-red-50 border border-red-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-red-700">
            <XCircle className="w-5 h-5" />
            <span className="font-semibold">Avoid These</span>
          </div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Where I've Made an Impact</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>My Journey</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>What I Bring to the Table</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>The Toolbox</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Credentials & Accomplishments</li>
          </ul>
        </div>
      </div>

      <StepHeading step={2}>Mirror the Job Description</StepHeading>

      <p>
        This is perhaps the most important tip: <strong>use the same language the job 
        posting uses</strong>. If they say "customer relationship management," don't 
        just write "CRM." Include both versions.
      </p>

      <blockquote>
        <strong>Pro tip:</strong> Copy the job description into a word cloud generator 
        to identify the most frequently used terms. Then ensure those terms appear 
        naturally in your resume.
      </blockquote>

      <StepHeading step={3}>Keep Formatting Simple</StepHeading>

      <ul>
        <li>Use standard fonts (Arial, Calibri, Times New Roman)</li>
        <li>Avoid tables, columns, and text boxes</li>
        <li>Use simple bullet points (• or -)</li>
        <li>No images, logos, or graphics</li>
        <li>Left-align all text</li>
        <li>Use standard date formats (MM/YYYY or Month YYYY)</li>
      </ul>

      <StepHeading step={4}>Include Both Acronyms and Full Terms</StepHeading>

      <p>
        Don't assume the ATS knows what abbreviations mean. Write out terms fully 
        at least once, then you can use the acronym:
      </p>

      <ul>
        <li>"Search Engine Optimization (SEO)" not just "SEO"</li>
        <li>"Customer Relationship Management (CRM)" not just "CRM"</li>
        <li>"Project Management Professional (PMP)" not just "PMP"</li>
      </ul>

      <StepHeading step={5}>Save in the Right Format</StepHeading>

      <p>
        Unless the job posting specifies otherwise:
      </p>

      <ul>
        <li><strong>PDF</strong> is generally safest and preserves formatting</li>
        <li><strong>.docx</strong> is sometimes preferred by older ATS systems</li>
        <li><strong>Never</strong> submit as .jpg, .png, or other image formats</li>
      </ul>

      <SectionDivider icon={ClipboardCheck}>ATS-Friendly Resume Checklist</SectionDivider>

      <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl not-prose shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <FileCheck className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Before You Submit</h3>
        </div>
        <ul className="space-y-3">
          {[
            'Standard section headings (Experience, Education, Skills)',
            'Keywords from job description included naturally',
            'No tables, columns, or complex formatting',
            'No images, logos, or graphics',
            'Both acronyms and full terms for industry jargon',
            'Contact information in main body (not header/footer)',
            'Simple, ATS-readable fonts',
            'Saved as PDF or .docx',
            'File name includes your name (John_Smith_Resume.pdf)',
            'No special characters that might cause parsing errors'
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <SectionDivider>Key Takeaways</SectionDivider>

      <p>
        The ATS isn't your enemy — it's just a hurdle you need to clear. Here's what to remember:
      </p>

      <ul>
        <li><strong>Most resumes never reach human eyes</strong> due to ATS filtering</li>
        <li><strong>Keywords matter</strong> — mirror the language in job descriptions</li>
        <li><strong>Simple formatting wins</strong> — save creativity for the interview</li>
        <li><strong>Test your resume</strong> — parse it yourself to see what the ATS sees</li>
        <li><strong>Tailor each application</strong> — one-size-fits-all resumes score lower</li>
      </ul>

      <p>
        Understanding ATS is no longer optional in today's job market. But here's the 
        silver lining: once you know the rules, you have a significant advantage over 
        candidates who don't.
      </p>

      <p>
        GetQuickResume's AI-powered builder creates ATS-optimized resumes automatically. 
        No formatting headaches, no keyword guessing — just a professional resume that 
        gets past the gatekeepers and into human hands.
      </p>
    </BlogLayout>
  );
}
