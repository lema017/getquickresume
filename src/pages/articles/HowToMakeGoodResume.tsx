import { Link } from 'react-router-dom';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { ArticleCTA } from '@/components/blog/ArticleCTA';
import { StepHeading } from '@/components/blog/StepHeading';
import { SectionDivider } from '@/components/blog/SectionDivider';
import { getArticleBySlug, getRelatedArticles } from '@/data/articles';
import { CheckCircle, XCircle, FileText, Layout, Zap, AlertTriangle, ClipboardCheck } from 'lucide-react';

export function HowToMakeGoodResume() {
  const article = getArticleBySlug('how-to-make-good-resume', 'en')!;
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
        Your resume is often the first impression you make on a potential employer. In fact, 
        <strong> recruiters spend an average of just 7 seconds</strong> scanning a resume before 
        deciding whether to continue reading. That means every word, every format choice, and 
        every detail matters.
      </p>

      <p>
        Whether you're entering the job market for the first time or looking to advance your 
        career, this comprehensive guide will walk you through everything you need to know 
        to create a resume that stands out and gets you interviews.
      </p>

      <SectionDivider icon={FileText}>Essential Resume Sections</SectionDivider>

      <p>
        A well-structured resume makes it easy for recruiters to find the information they need 
        quickly. Here are the must-have sections every resume should include:
      </p>

      <StepHeading step={1}>Contact Information</StepHeading>

      <p>
        This seems obvious, but you'd be surprised how many candidates make mistakes here. 
        Your contact section should include:
      </p>

      <ul>
        <li><strong>Full name</strong> — Use your professional name, not nicknames</li>
        <li><strong>Phone number</strong> — Make sure your voicemail is professional</li>
        <li><strong>Professional email</strong> — Avoid addresses like "partyguy@email.com"</li>
        <li><strong>LinkedIn profile</strong> — Ensure it matches your resume</li>
        <li><strong>City and state</strong> — Full address is no longer necessary</li>
      </ul>

      <p>
        <strong>What to leave out:</strong> Date of birth, marital status, photo (in most Western 
        countries), and irrelevant social media profiles.
      </p>

      <StepHeading step={2}>Professional Summary</StepHeading>

      <p>
        Your professional summary is a 3-4 sentence pitch that sells your value proposition. 
        Think of it as your elevator pitch on paper. It should answer: <em>"Why should we hire you?"</em>
      </p>

      <blockquote>
        <strong>Example:</strong> "Results-driven marketing manager with 8+ years of experience 
        developing data-driven campaigns that increased customer acquisition by 150%. Expert in 
        SEO, content strategy, and marketing automation. Proven track record of managing $2M+ 
        annual budgets while exceeding ROI targets."
      </blockquote>

      <p>
        Notice how this example includes specific numbers and achievements? That's the key to a 
        compelling summary.
      </p>

      <StepHeading step={3}>Work Experience</StepHeading>

      <p>
        This is the heart of your resume. For each position, include:
      </p>

      <ul>
        <li>Job title</li>
        <li>Company name and location</li>
        <li>Dates of employment (month/year format)</li>
        <li>3-5 bullet points highlighting achievements</li>
      </ul>

      <p>
        <strong>Critical tip:</strong> Focus on achievements, not just responsibilities. Anyone 
        can list job duties — what makes you stand out is showing the impact you made.
      </p>

      {/* Before/After Example Box */}
      <div className="my-8 grid md:grid-cols-2 gap-4 not-prose">
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-red-700">
            <XCircle className="w-5 h-5" />
            <span className="font-semibold">Before (Weak)</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            "Responsible for managing social media accounts and creating content for the company."
          </p>
        </div>
        <div className="p-6 bg-green-50 border border-green-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-green-700">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">After (Strong)</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            "Grew Instagram following from 5K to 50K in 12 months, generating 200+ qualified 
            leads monthly through strategic content campaigns."
          </p>
        </div>
      </div>

      <StepHeading step={4}>Skills Section</StepHeading>

      <p>
        Your skills section should be a quick snapshot of your capabilities. Divide them into:
      </p>

      <ul>
        <li><strong>Hard skills:</strong> Technical abilities like programming languages, software 
        proficiency, certifications (Python, Salesforce, Project Management)</li>
        <li><strong>Soft skills:</strong> Interpersonal abilities like leadership, communication, 
        problem-solving (use sparingly — these are better demonstrated through achievements)</li>
      </ul>

      <p>
        <strong>Pro tip:</strong> Tailor your skills section to match the job description. If 
        the posting mentions "data analysis," make sure that skill is prominently featured.
      </p>

      <StepHeading step={5}>Education</StepHeading>

      <p>
        For most professionals with work experience, education comes after work history. Include:
      </p>

      <ul>
        <li>Degree and major</li>
        <li>University name and location</li>
        <li>Graduation year (optional if you've been working for 10+ years)</li>
        <li>Relevant coursework, honors, or GPA (only if exceptional and recent)</li>
      </ul>

      <StepHeading step={6}>Optional Sections</StepHeading>

      <p>
        Depending on your background and the job you're targeting, consider adding:
      </p>

      <ul>
        <li><strong>Certifications:</strong> Industry credentials that boost your qualifications</li>
        <li><strong>Projects:</strong> Especially valuable for tech roles or career changers</li>
        <li><strong>Languages:</strong> Increasingly valuable in global companies</li>
        <li><strong>Volunteer work:</strong> Shows character and can fill employment gaps</li>
      </ul>

      <p>
        If you're targeting international roles, you can{' '}
        <Link to="/resume-translator" className="text-blue-600 hover:underline">
          translate your resume into another language
        </Link>{' '}
        using specialized tools. See our list of the{' '}
        <Link to="/best-resume-translators" className="text-blue-600 hover:underline">
          best resume translators in 2026
        </Link>{' '}
        for recommendations.
      </p>

      <ArticleCTA 
        variant="inline"
        description="Need help structuring your resume? GetQuickResume's AI guides you through each section, ensuring you don't miss anything important."
      />

      <SectionDivider icon={Layout}>Formatting Best Practices</SectionDivider>

      <p>
        Even the best content can be undermined by poor formatting. Here's how to make your 
        resume visually appealing and easy to read:
      </p>

      <h3>One Page vs. Two Pages</h3>

      <p>
        The one-page resume isn't a hard rule anymore. Here's a simple guideline:
      </p>

      <ul>
        <li><strong>One page:</strong> If you have less than 10 years of experience</li>
        <li><strong>Two pages:</strong> If you're a senior professional with extensive relevant experience</li>
        <li><strong>Never:</strong> More than two pages (unless you're in academia or medicine)</li>
      </ul>

      <h3>Font and Typography</h3>

      <ul>
        <li>Use clean, professional fonts: Arial, Calibri, Helvetica, or Georgia</li>
        <li>Body text: 10-12 point size</li>
        <li>Headers: 14-16 point size</li>
        <li>Consistent formatting throughout</li>
      </ul>

      <h3>White Space and Margins</h3>

      <ul>
        <li>Margins: 0.5 to 1 inch on all sides</li>
        <li>Don't cram text — white space improves readability</li>
        <li>Use bullet points to break up dense text</li>
      </ul>

      <SectionDivider icon={Zap}>Power Words That Impress Recruiters</SectionDivider>

      <p>
        The verbs you use can dramatically impact how your achievements are perceived. 
        Start each bullet point with a strong action verb:
      </p>

      {/* Power Words Grid */}
      <div className="my-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl not-prose shadow-sm">
        <h4 className="font-bold text-blue-900 mb-4 text-lg">High-Impact Action Verbs</h4>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 text-sm">
          {['Achieved', 'Launched', 'Generated', 'Transformed', 'Spearheaded', 
            'Streamlined', 'Negotiated', 'Delivered', 'Pioneered', 'Orchestrated',
            'Increased', 'Reduced', 'Developed', 'Implemented', 'Optimized'].map((word) => (
            <span key={word} className="px-3 py-2 bg-white rounded-lg text-blue-700 text-center font-medium shadow-sm border border-blue-100">
              {word}
            </span>
          ))}
        </div>
      </div>

      <SectionDivider icon={AlertTriangle}>Common Resume Mistakes to Avoid</SectionDivider>

      <p>
        Even qualified candidates can sabotage their chances with these common errors:
      </p>

      <div className="my-6 space-y-4 not-prose">
        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <strong className="text-red-800 text-base">Typos and grammatical errors</strong>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">58% of resumes have typos. Always proofread multiple times and ask someone else to review.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <strong className="text-red-800 text-base">Generic objective statements</strong>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">"Seeking a challenging position..." tells employers nothing. Use a specific professional summary instead.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <strong className="text-red-800 text-base">Including irrelevant information</strong>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">That summer job from 15 years ago? The recruiter doesn't need to know. Keep it relevant.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <strong className="text-red-800 text-base">Using the same resume for every job</strong>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">Tailoring your resume to each position significantly increases your chances of getting an interview.</p>
          </div>
        </div>
      </div>

      <SectionDivider icon={ClipboardCheck}>Key Takeaways</SectionDivider>

      <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl not-prose shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Resume Checklist</h3>
        </div>
        <ul className="space-y-3">
          {[
            'Include all essential sections: contact, summary, experience, skills, education',
            'Focus on achievements with quantifiable results, not just responsibilities',
            'Use strong action verbs to start each bullet point',
            'Keep formatting clean, consistent, and easy to scan',
            'Tailor your resume to each specific job application',
            'Proofread multiple times — typos are deal-breakers',
            'Keep it to 1-2 pages maximum',
            'Save and send as PDF to preserve formatting'
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p>
        Creating an effective resume takes time and attention to detail, but it's an investment 
        that pays off. A well-crafted resume opens doors to opportunities and sets the stage 
        for successful interviews.
      </p>

      <p>
        Ready to put these tips into action? GetQuickResume's AI-powered builder helps you 
        create a professional resume in minutes, complete with optimized formatting and 
        achievement-focused content suggestions. No design skills required.
      </p>
    </BlogLayout>
  );
}
