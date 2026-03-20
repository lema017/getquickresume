import { Link } from 'react-router-dom';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { ArticleCTA } from '@/components/blog/ArticleCTA';
import { StepHeading } from '@/components/blog/StepHeading';
import { SectionDivider } from '@/components/blog/SectionDivider';
import { getArticleBySlug, getRelatedArticles } from '@/data/articles';
import { CheckCircle, XCircle, FileText, PenTool, Target, Zap, Quote } from 'lucide-react';

export function HowToWriteAResume() {
  const article = getArticleBySlug('how-to-write-a-resume', 'en')!;
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
        Writing a resume is both an art and a science. With <strong>over 75% of resumes being rejected</strong> by ATS systems 
        before reaching human eyes, and recruiters spending an average of 7 seconds on initial scans, the words you choose 
        and how you structure them can make or break your job search.
      </p>

      <p>
        This comprehensive guide will teach you the proven writing techniques that transform average resumes into 
        compelling career stories that capture attention and generate interviews.
      </p>

      <SectionDivider icon={PenTool}>The Fundamentals of Resume Writing</SectionDivider>

      <p>
        Before diving into specific sections, understand these core principles that guide every successful resume:
      </p>

      <div className="my-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
        <h3 className="font-bold text-blue-900 mb-4 text-lg">The 5 Golden Rules of Resume Writing</h3>
        <ul className="space-y-3">
          {[
            'Be concise: Every word must earn its place on the page',
            'Lead with impact: Front-load achievements, not responsibilities',
            'Quantify results: Numbers provide credibility and context',
            'Use active voice: Strong verbs create dynamic, engaging content',
            'Tailor relentlessly: Customize for every application'
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <SectionDivider icon={Target}>Crafting Your Professional Summary</SectionDivider>

      <p>
        Your professional summary is the elevator pitch that determines whether recruiters continue reading. 
        Written well, it immediately establishes your value proposition and career trajectory.
      </p>

      <StepHeading step={1}>Write with Purpose, Not Generic Statements</StepHeading>

      <p>
        Generic summaries like "Hardworking professional seeking challenging opportunities" tell recruiters nothing. 
        Instead, answer three specific questions in 3-4 sentences:
      </p>

      <ul>
        <li><strong>Who are you professionally?</strong> — Your role and expertise area</li>
        <li><strong>What makes you valuable?</strong> — Key achievements and quantifiable results</li>
        <li><strong>What are you targeting?</strong> — The specific value you bring to this role</li>
      </ul>

      <div className="my-8 grid md:grid-cols-2 gap-4 not-prose">
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-red-700">
            <XCircle className="w-5 h-5" />
            <span className="font-semibold">Weak (Generic)</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed italic">
            "Results-driven professional with strong communication skills seeking a challenging position 
            where I can utilize my abilities and grow within the company."
          </p>
        </div>
        <div className="p-6 bg-green-50 border border-green-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-green-700">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Strong (Specific)</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            "Senior Product Manager with 8+ years launching B2B SaaS products that generated $50M+ in ARR. 
            Specialized in Agile transformation and cross-functional team leadership. Track record of reducing 
            time-to-market by 40% through process optimization."
          </p>
        </div>
      </div>

      <StepHeading step={2}>Incorporate Keywords Naturally</StepHeading>

      <p>
        ATS systems scan for keywords from the job description, but stuffing them randomly hurts readability. 
        Instead, weave them into your narrative naturally:
      </p>

      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg my-6">
        <div className="flex items-start gap-2">
              <Quote className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
            <p className="text-gray-700 italic">
              If the job requires "project management," "stakeholder communication," and "budget oversight," 
              write: "Led cross-functional initiatives through all phases of project management, maintaining 
              proactive stakeholder communication while exercising budget oversight of $2M annually."
            </p>
          </div>
            </div>
      </blockquote>

      <ArticleCTA 
        variant="inline"
        description="Struggling to write your professional summary? GetQuickResume's AI generates tailored summaries based on your experience and target role."
      />

      <SectionDivider icon={Zap}>Mastering Achievement Bullet Points</SectionDivider>

      <p>
        Your work experience bullets are where you prove your value. The difference between passive job descriptions 
        and compelling achievements can increase interview callbacks by 300%.
      </p>

      <StepHeading step={3}>The CAR Formula: Context, Action, Result</StepHeading>

      <p>
        Every strong bullet follows this structure, though the order may vary:
      </p>

      <ul>
        <li><strong>Context:</strong> The situation or challenge you faced</li>
        <li><strong>Action:</strong> What you specifically did (not what the team did)</li>
        <li><strong>Result:</strong> The measurable outcome, preferably with numbers</li>
      </ul>

      <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl">
        <h4 className="font-bold text-gray-900 mb-4">CAR Formula in Action</h4>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-semibold">Context</span>
            <p className="text-gray-700 text-sm">"Faced with declining customer retention and increasing churn rate..."</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">Action</span>
            <p className="text-gray-700 text-sm">"...I designed and implemented a proactive customer success program..."</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">Result</span>
            <p className="text-gray-700 text-sm">"...reducing churn by 35% and increasing annual contract renewals by $1.2M."</p>
          </div>
        </div>
      </div>

      <StepHeading step={4}>Power Verbs That Command Attention</StepHeading>

      <p>
        Start every bullet with an action verb that conveys leadership and initiative. Avoid weak openings 
        like "Responsible for," "Assisted with," or "Helped."
      </p>

      <div className="my-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl not-prose shadow-sm">
        <h4 className="font-bold text-indigo-900 mb-4 text-lg">High-Impact Action Verbs by Category</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <h5 className="font-semibold text-indigo-800 mb-2">Leadership</h5>
            {['Spearheaded', 'Directed', 'Orchestrated', 'Pioneered', 'Championed'].map(word => (
              <span key={word} className="block px-2 py-1 mb-1 bg-white rounded text-indigo-700 text-center font-medium shadow-sm border border-indigo-100">
                {word}
              </span>
            ))}
          </div>
          <div>
            <h5 className="font-semibold text-indigo-800 mb-2">Growth</h5>
            {['Accelerated', 'Amplified', 'Expanded', 'Scaled', 'Generated'].map(word => (
              <span key={word} className="block px-2 py-1 mb-1 bg-white rounded text-indigo-700 text-center font-medium shadow-sm border border-indigo-100">
                {word}
              </span>
            ))}
          </div>
          <div>
            <h5 className="font-semibold text-indigo-800 mb-2">Efficiency</h5>
            {['Streamlined', 'Optimized', 'Reduced', 'Consolidated', 'Automated'].map(word => (
              <span key={word} className="block px-2 py-1 mb-1 bg-white rounded text-indigo-700 text-center font-medium shadow-sm border border-indigo-100">
                {word}
              </span>
            ))}
          </div>
          <div>
            <h5 className="font-semibold text-indigo-800 mb-2">Creation</h5>
            {['Architected', 'Developed', 'Launched', 'Engineered', 'Designed'].map(word => (
              <span key={word} className="block px-2 py-1 mb-1 bg-white rounded text-indigo-700 text-center font-medium shadow-sm border border-indigo-100">
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      <StepHeading step={5}>Quantify Every Achievement Possible</StepHeading>

      <p>
        Numbers provide credibility and context. If you don't have exact figures, use reasonable estimates 
        or ranges. Consider quantifying:
      </p>

      <ul>
        <li><strong>Revenue impact:</strong> Dollar amounts, percentages of growth</li>
        <li><strong>Time savings:</strong> Hours reduced, processes accelerated</li>
        <li><strong>Scale:</strong> Team size managed, projects delivered, customers served</li>
        <li><strong>Quality:</strong> Error rates reduced, satisfaction scores improved</li>
        <li><strong>Recognition:</strong> Awards, promotions, special assignments</li>
      </ul>

      <div className="my-8 grid md:grid-cols-2 gap-4 not-prose">
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-red-700">
            <XCircle className="w-5 h-5" />
            <span className="font-semibold">Vague</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            "Managed social media accounts and improved engagement."
          </p>
        </div>
        <div className="p-6 bg-green-50 border border-green-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-green-700">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Quantified</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            "Grew LinkedIn following from 2K to 25K in 8 months, driving 40% increase in lead generation 
            and $150K in attributed pipeline revenue."
          </p>
        </div>
      </div>

      <ArticleCTA 
        variant="inline"
        description="Want help turning your job duties into compelling achievement bullets? Try our free ATS checker to see how your resume performs."
      />

      <SectionDivider icon={FileText}>Writing for ATS and Humans</SectionDivider>

      <p>
        Modern resumes must pass through Applicant Tracking Systems before reaching human recruiters. 
        Writing for both audiences requires strategic balance.
      </p>

      <h3>ATS-Friendly Writing Practices</h3>

      <ul>
        <li><strong>Use standard section headings:</strong> "Work Experience," "Education," "Skills" — not creative alternatives</li>
        <li><strong>Spell out acronyms:</strong> Write "Search Engine Optimization (SEO)" at first mention</li>
        <li><strong>Avoid tables and columns for key content:</strong> ATS may read them out of order</li>
        <li><strong>Use bullet points for achievements:</strong> They're ATS-friendly and scannable</li>
        <li><strong>Include the exact job title:</strong> Match the title in your summary if targeting a specific role</li>
      </ul>

      <p>
        Learn more about optimizing for ATS in our guide on{' '}
        <Link to="/blog/what-is-ats-system" className="text-blue-600 hover:underline">
          how ATS systems work and how to beat them
        </Link>.
      </p>

      <h3>Human-Readable Writing Practices</h3>

      <ul>
        <li><strong>Vary sentence structure:</strong> Mix short punchy bullets with more detailed ones</li>
        <li><strong>Use white space strategically:</strong> Dense text blocks discourage reading</li>
        <li><strong>Tell mini-stories:</strong> Your bullets should hint at the larger narrative of your career</li>
        <li><strong>Show progression:</strong> Demonstrate increasing responsibility and impact over time</li>
      </ul>

      <SectionDivider icon={Target}>Key Takeaways</SectionDivider>

      <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl not-prose shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <PenTool className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Resume Writing Checklist</h3>
        </div>
        <ul className="space-y-3">
          {[
            'Lead with specific achievements, not generic responsibilities',
            'Use the CAR formula: Context, Action, Result',
            'Start every bullet with a powerful action verb',
            'Quantify results with numbers whenever possible',
            'Customize keywords naturally from each job description',
            'Write a professional summary that answers: Who, What, and Why',
            'Balance ATS optimization with human readability',
            'Proofread relentlessly — errors destroy credibility'
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p>
        Writing an effective resume is a skill that improves with practice and feedback. The techniques in this 
        guide provide the framework — now it's time to put them into action.
      </p>

      <p>
        Ready to write your best resume yet? GetQuickResume's AI-powered platform guides you through every section, 
        suggests powerful action verbs, helps quantify your achievements, and ensures your resume is optimized 
        for both ATS and human reviewers.{' '}
        <Link to="/login" className="text-blue-600 hover:underline font-medium">
          Start building your resume for free
        </Link>.
      </p>
    </BlogLayout>
  );
}
