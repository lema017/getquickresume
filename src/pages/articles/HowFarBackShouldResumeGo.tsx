import { Link } from 'react-router-dom';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { ArticleCTA } from '@/components/blog/ArticleCTA';
import { SectionDivider } from '@/components/blog/SectionDivider';
import { getArticleBySlug, getRelatedArticles } from '@/data/articles';
import { CheckCircle, XCircle, Calendar, Clock, Briefcase, Target, AlertCircle } from 'lucide-react';

export function HowFarBackShouldResumeGo() {
  const article = getArticleBySlug('how-far-back-should-a-resume-go', 'en')!;
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
        One of the most common resume dilemmas is determining how much work history to include. 
        Go too far back, and you risk overwhelming recruiters with outdated information. Cut too much, 
        and you might miss valuable experience that showcases your qualifications.
      </p>

      <p>
        The answer isn't one-size-fits-all. How far back your resume should go depends on your career 
        level, industry, and what you're trying to demonstrate. This guide provides clear guidelines 
        to help you make the right decision for your situation.
      </p>

      <SectionDivider icon={Clock}>The General Rule: 10-15 Years</SectionDivider>

      <p>
        For most professionals, including <strong>10 to 15 years of relevant work history</strong> is the sweet spot. 
        This timeframe typically provides:
      </p>

      <ul>
        <li>Enough experience to demonstrate career progression and expertise</li>
        <li>Recent, relevant skills that match current market demands</li>
        <li>A concise document that respects recruiters' time</li>
        <li>Avoidance of age discrimination triggers (in many countries)</li>
      </ul>

      <div className="my-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start gap-3">
          <Target className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-blue-900 mb-2">Why This Range Works</h4>
            <p className="text-gray-700">
              Technology, business practices, and industry standards evolve rapidly. Experience from 
              15+ years ago may not reflect current methodologies or demonstrate modern skills. 
              Recruiters are most interested in what you've accomplished recently and how relevant 
              your experience is to today's challenges.
            </p>
          </div>
        </div>
      </div>

      <ArticleCTA 
        variant="inline"
        description="Not sure if your resume length is right? GetQuickResume analyzes your experience and recommends the optimal timeline for your career level."
      />

      <SectionDivider icon={Briefcase}>Guidelines by Career Level</SectionDivider>

      <p>
        Your career stage is the primary factor in determining how far back to go. Here's how to 
        adjust the general rule based on where you are in your professional journey:
      </p>

      <div className="my-8 space-y-4 not-prose">
        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <span className="text-green-700 font-bold text-lg">1</span>
            </div>
            <h4 className="font-bold text-gray-900">Entry-Level (0-3 Years Experience)</h4>
          </div>
          <p className="text-gray-700 mb-3">
            <strong>Include everything relevant.</strong> Even internships, part-time jobs, and 
            significant academic projects should appear if they demonstrate skills applicable to 
            your target role.
          </p>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Internships and co-op positions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Part-time jobs that developed transferable skills</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Major academic projects or research</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Volunteer work with relevant responsibilities</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <span className="text-blue-700 font-bold text-lg">2</span>
            </div>
            <h4 className="font-bold text-gray-900">Mid-Level (3-10 Years Experience)</h4>
          </div>
          <p className="text-gray-700 mb-3">
            <strong>Focus on the most recent 10 years.</strong> At this stage, you should have 
            enough relevant professional experience to fill your resume without needing older entries. 
            Early internships and part-time jobs can be removed unless they're directly relevant 
            to your target role.
          </p>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <span>Professional roles that demonstrate growth</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <span>Positions with quantifiable achievements</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>Remove early internships unless highly prestigious</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>Part-time jobs unrelated to your career</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <span className="text-purple-700 font-bold text-lg">3</span>
            </div>
            <h4 className="font-bold text-gray-900">Senior-Level (10+ Years Experience)</h4>
          </div>
          <p className="text-gray-700 mb-3">
            <strong>Strategic selection of 10-15 years.</strong> Senior professionals can be more 
            selective. Include positions that demonstrate leadership, strategic impact, and 
            progression toward senior roles. Older positions can be summarized in an 
            "Earlier Career" section if they add value.
          </p>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
              <span>Leadership and management roles</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
              <span>Strategic initiatives with business impact</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
              <span>Earlier career summary if space allows</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <span className="text-amber-700 font-bold text-lg">4</span>
            </div>
            <h4 className="font-bold text-gray-900">Career Changers</h4>
          </div>
          <p className="text-gray-700 mb-3">
            <strong>Prioritize relevance over recency.</strong> If you're transitioning to a new 
            field, include any past experience that demonstrates transferable skills, even if it 
            means going back further. The key is showing applicable abilities, not just chronology.
          </p>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>Any role with transferable skills</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>Projects or responsibilities related to target field</span>
            </li>
            <li className="flex items-start gap-2">
              <Target className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>Consider functional format to highlight skills over timeline</span>
            </li>
          </ul>
        </div>
      </div>

      <p>
        Learn more about handling career transitions in our guide on{' '}
        <Link to="/blog/resume-tips-for-career-changers" className="text-blue-600 hover:underline">
          resume tips for career changers
        </Link>.
      </p>

      <SectionDivider icon={Calendar}>Exceptions to the Rule</SectionDivider>

      <p>
        While the 10-15 year guideline works for most situations, certain circumstances warrant 
        including older experience:
      </p>

      <h3>When to Go Back Further</h3>

      <div className="my-6 space-y-4">
        <div className="p-5 bg-green-50 border border-green-200 rounded-xl">
          <h4 className="font-bold text-green-800 mb-2">Highly Relevant Experience</h4>
          <p className="text-gray-700 text-sm">
            If you worked at a prestigious company or held a notable position 20 years ago 
            that's directly relevant to your target role, consider including it — especially 
            if it demonstrates expertise you haven't used recently.
          </p>
        </div>

        <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl">
          <h4 className="font-bold text-blue-800 mb-2">Industry-Specific Requirements</h4>
          <p className="text-gray-700 text-sm">
            Some industries value deep historical experience. Academia, certain government 
            positions, and specialized technical fields may expect comprehensive career 
            documentation. Research your specific industry's expectations.
          </p>
        </div>

        <div className="p-5 bg-purple-50 border border-purple-200 rounded-xl">
          <h4 className="font-bold text-purple-800 mb-2">Demonstrating Career Progression</h4>
          <p className="text-gray-700 text-sm">
            If removing older jobs creates gaps in your career story or hides the progression 
            that led to your current expertise, strategically including key earlier positions 
            may strengthen your narrative.
          </p>
        </div>

        <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl">
          <h4 className="font-bold text-amber-800 mb-2">Returning to Previous Field</h4>
          <p className="text-gray-700 text-sm">
            If you're returning to a field you worked in earlier in your career, those older 
            positions become highly relevant again and should be highlighted.
          </p>
        </div>
      </div>

      <h3>When to Cut Shorter</h3>

      <ul>
        <li><strong>Outdated skills:</strong> Positions using obsolete technology or methodologies</li>
        <li><strong>Junior roles at your level:</strong> Entry-level positions now that you're senior</li>
        <li><strong>Unrelated jobs:</strong> Early career work in completely different industries</li>
        <li><strong>Space constraints:</strong> If keeping it to one page is critical for your industry</li>
      </ul>

      <ArticleCTA 
        variant="inline"
        description="Need help deciding what to include? GetQuickResume analyzes your experience and suggests the optimal timeline based on your career goals and target role."
      />

      <SectionDivider icon={Target}>How to Handle Older Experience</SectionDivider>

      <p>
        When you have valuable older experience but don't want to date yourself or overwhelm 
        your resume, use these strategies:
      </p>

      <h3>Option 1: Earlier Career Summary Section</h3>

      <p>
        Create a separate section titled "Earlier Career" or "Additional Experience" that 
        lists older positions without dates:
      </p>

      <div className="my-6 p-5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm text-gray-700">
        <p className="font-bold mb-2">Earlier Career:</p>
        <p>Additional experience includes roles at Microsoft, IBM, and Deloitte in software 
        development and systems architecture positions.</p>
      </div>

      <h3>Option 2: Selected Highlights Approach</h3>

      <p>
        Include only the most impressive older position and summarize the rest:
      </p>

      <div className="my-6 p-5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm text-gray-700">
        <p className="font-bold mb-2">Previous Experience (1998-2008):</p>
        <p>Senior roles at Fortune 500 companies including General Electric and Procter & Gamble 
        in operations management and supply chain optimization.</p>
      </div>

      <h3>Option 3: Omit Dates for Older Roles</h3>

      <p>
        List the position and company but exclude dates for roles older than 15 years:
      </p>

      <div className="my-6 p-5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm text-gray-700">
        <p className="font-bold">Senior Consultant — McKinsey & Company</p>
        <p className="text-gray-500">New York, NY</p>
      </div>

      <div className="my-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> Some employers require complete work history in application 
            forms. The resume strategies above are for the document itself, not for hiding 
            information when explicitly requested.
          </p>
        </div>
      </div>

      <SectionDivider icon={CheckCircle}>The Relevance Filter</SectionDivider>

      <p>
        Beyond the timeline question, apply a <strong>relevance filter</strong> to every position 
        you consider including:
      </p>

      <div className="my-8 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl">
        <h4 className="font-bold text-indigo-900 mb-4">Ask These Questions for Each Position</h4>
        <div className="space-y-3">
          {[
            'Does this role demonstrate skills required for my target position?',
            'Does it show career progression or increasing responsibility?',
            'Will this experience resonate with hiring managers in my target industry?',
            'Does it fill a gap that would otherwise raise questions?',
            'Is this the best use of space on my resume?'
          ].map((question, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-gray-700">{question}</span>
            </div>
          ))}
        </div>
      </div>

      <p>
        If a position doesn't pass this filter, consider removing it regardless of how recent it is. 
        Every line on your resume should earn its place by contributing to your candidacy.
      </p>

      <SectionDivider icon={CheckCircle}>Key Takeaways</SectionDivider>

      <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl not-prose shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Resume Timeline Guidelines</h3>
        </div>
        <ul className="space-y-3">
          {[
            'General rule: Include 10-15 years of relevant work history',
            'Entry-level: Include all relevant experience including internships',
            'Mid-level: Focus on the most recent 10 years',
            'Senior-level: Be selective, prioritize leadership and impact',
            'Career changers: Prioritize relevance over recency',
            'Use "Earlier Career" section for valuable but dated experience',
            'Apply the relevance filter to every position you consider',
            'Remove outdated skills and unrelated early jobs'
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p>
        Determining how far back your resume should go is about balancing comprehensiveness with 
        relevance. The goal is to present the most compelling evidence of your qualifications 
        for the specific role you're targeting.
      </p>

      <p>
        Remember: recruiters spend an average of 7 seconds on initial resume scans. Make every 
        year of experience you include count toward making your case. When in doubt, prioritize 
        relevance and recency, and consider using an "Earlier Career" section for important 
        but dated experience.
      </p>

      <p>
        Ready to build a resume with the perfect timeline? GetQuickResume helps you determine 
        exactly how much experience to include based on your career level and target position, 
        ensuring your resume makes the strongest possible impression.{' '}
        <Link to="/login" className="text-blue-600 hover:underline font-medium">
          Start optimizing your resume today
        </Link>.
      </p>
    </BlogLayout>
  );
}
