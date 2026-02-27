import { Link } from 'react-router-dom';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { ArticleCTA } from '@/components/blog/ArticleCTA';
import { StepHeading } from '@/components/blog/StepHeading';
import { SectionDivider } from '@/components/blog/SectionDivider';
import { getArticleBySlug, getRelatedArticles } from '@/data/articles';
import { Compass, ArrowRightCircle, Layers, PenTool, Target, Briefcase, GraduationCap, Award } from 'lucide-react';

export function ResumeTipsForCareerChangers() {
  const article = getArticleBySlug('resume-tips-for-career-changers', 'en');
  // Fallback if article data isn't ready yet
  const title = article?.title || "Resume Tips for Career Changers: How to Pivot Successfully";
  const excerpt = article?.excerpt || "Changing careers? Learn how to highlight your transferable skills and write a resume that proves you're ready for the new role.";
  const category = article?.category || "Career Advice";
  const readTime = article?.readTime || 6;
  const publishDate = article?.publishDate || new Date().toISOString().split('T')[0];
  const imageUrl = article?.imageUrl;
  
  const relatedArticles = article ? getRelatedArticles(article.slug, 'en') : [];

  return (
    <BlogLayout
      title={title}
      excerpt={excerpt}
      category={category}
      readTime={readTime}
      publishDate={publishDate}
      imageUrl={imageUrl}
      relatedArticles={relatedArticles}
    >
      {/* Introduction */}
      <p className="text-xl text-gray-600 leading-relaxed">
        Changing careers is exciting, but it comes with a unique challenge: <strong>how do you prove you're qualified for a job you've never technically held?</strong>
      </p>

      <p>
        The traditional chronological resume often works against career changers because it highlights your <em>past</em> rather than your <em>potential</em>. 
        To pivot successfully, you need a resume strategy that bridges the gap between where you've been and where you want to go.
      </p>

      <SectionDivider icon={Compass}>The Challenge of Changing Careers</SectionDivider>

      <p>
        Recruiters spend an average of 7 seconds scanning a resume. If they don't immediately see relevant experience, they move on. 
        For career changers, this means you can't rely on job titles alone to tell your story. You need to translate your previous experience into the language of your new industry.
      </p>

      <StepHeading step={1}>Focus on Transferable Skills</StepHeading>

      <p>
        Transferable skills are the core of a career changer's resume. These are abilities you've developed in one context that are valuable in another.
      </p>

      <div className="my-6 grid md:grid-cols-2 gap-4 not-prose">
        <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl">
          <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Soft Skills
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Leadership & Team Management</li>
            <li>• Communication & Negotiation</li>
            <li>• Problem Solving</li>
            <li>• Time Management</li>
          </ul>
        </div>
        <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-xl">
          <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <Target className="w-4 h-4" /> Hard Skills
          </h4>
          <ul className="text-sm text-indigo-800 space-y-1">
            <li>• Data Analysis</li>
            <li>• Project Management</li>
            <li>• Research</li>
            <li>• Technical Writing</li>
          </ul>
        </div>
      </div>

      <p>
        <strong>Example:</strong> If you're moving from <em>Teaching</em> to <em>Corporate Training</em>:
      </p>
      <ul>
        <li>Instead of "Taught 30 students," say "Managed learning and development for a cohort of 30 individuals."</li>
        <li>Instead of "Graded papers," say "Evaluated performance metrics and provided actionable feedback."</li>
      </ul>

      <StepHeading step={2}>Choose the Right Format (Hybrid is Best)</StepHeading>

      <p>
        A strictly chronological resume might bury your relevant skills under irrelevant job titles. A functional resume (grouping by skill) is often disliked by recruiters because it hides work history.
      </p>
      
      <p>
        The solution? <strong>The Hybrid Resume.</strong>
      </p>

      <div className="my-6 p-6 bg-gray-50 border border-gray-200 rounded-xl not-prose">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" /> Structure of a Hybrid Resume
        </h4>
        <ol className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="font-bold text-blue-600">1.</span>
            <span><strong>Professional Summary:</strong> Connects the dots between your past and future.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold text-blue-600">2.</span>
            <span><strong>Key Skills / Core Competencies:</strong> A prominent section listing relevant skills at the top.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold text-blue-600">3.</span>
            <span><strong>Relevant Experience:</strong> Detailed bullet points for work that relates to the new field.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold text-blue-600">4.</span>
            <span><strong>Additional Experience:</strong> Brief summary of other roles to show work history without distraction.</span>
          </li>
        </ol>
      </div>

      <StepHeading step={3}>Write a Powerful Summary</StepHeading>

      <p>
        Your summary is your elevator pitch. It's the first thing a recruiter reads, so use it to explain <em>why</em> you're making the switch and <em>how</em> your background makes you unique.
      </p>

      <blockquote>
        "Marketing professional with 5+ years of experience in data analysis and consumer behavior, pivoting to UX Research. Proven ability to interpret complex data sets and translate findings into actionable user-centric strategies."
      </blockquote>

      <StepHeading step={4}>Address the Change Directly</StepHeading>

      <p>
        Don't make the recruiter guess. Use your cover letter and resume summary to frame your diverse background as an asset, not a liability. 
        Diverse experience often means you bring a fresh perspective and unique problem-solving abilities.
      </p>

      <ArticleCTA 
        variant="card"
        title="Need help rephrasing your experience?"
        description="GetQuickResume's AI can rewrite your bullet points to highlight transferable skills for your new career path."
        buttonText="Optimize My Resume Now"
      />

      <SectionDivider icon={ArrowRightCircle}>Key Takeaways for Career Changers</SectionDivider>

      <ul>
        <li><strong>Reframe your experience:</strong> Use the language of your <em>target</em> industry.</li>
        <li><strong>Highlight skills first:</strong> Use a hybrid format to showcase competencies before chronology.</li>
        <li><strong>Show, don't just tell:</strong> Use numbers and results to prove your transferable skills work.</li>
        <li><strong>Upskill:</strong> List relevant certifications or courses prominently to show commitment to the new field.</li>
      </ul>

      <p>
        If your career change involves working abroad, our{' '}
        <Link to="/resume-translator" className="text-blue-600 hover:underline">
          resume translator
        </Link>{' '}
        can help you adapt your resume for international markets.
      </p>

      <p>
        Pivoting careers takes courage, but with the right resume strategy, you can show employers exactly why your unique background is the asset they've been looking for.
      </p>
    </BlogLayout>
  );
}
