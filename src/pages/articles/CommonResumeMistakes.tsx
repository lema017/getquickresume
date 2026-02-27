import { Link } from 'react-router-dom';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { ArticleCTA } from '@/components/blog/ArticleCTA';
import { StepHeading } from '@/components/blog/StepHeading';
import { SectionDivider } from '@/components/blog/SectionDivider';
import { getArticleBySlug, getRelatedArticles } from '@/data/articles';
import { AlertTriangle, CheckCircle, XCircle, FileSearch, Eye, Type, MousePointerClick } from 'lucide-react';

export function CommonResumeMistakes() {
  const article = getArticleBySlug('common-resume-mistakes', 'en');
  // Fallback if article data isn't ready
  const title = article?.title || "5 Common Resume Mistakes That Are Costing You Interviews";
  const excerpt = article?.excerpt || "Are you making these simple errors? Discover the top 5 resume mistakes candidates make and how to fix them immediately.";
  const category = article?.category || "Resume Tips";
  const readTime = article?.readTime || 5;
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
        You have the skills. You have the experience. But the phone isn't ringing. Why?
      </p>

      <p>
        Often, the difference between a rejection and an interview isn't your qualification—it's your presentation. 
        Recruiters and hiring managers look for specific red flags that can disqualify a candidate in seconds. 
        Here are the 5 most common resume mistakes and how to fix them.
      </p>

      <SectionDivider icon={AlertTriangle}>The Top 5 Resume Mistakes</SectionDivider>

      <StepHeading step={1}>Listing Duties Instead of Achievements</StepHeading>

      <p>
        <strong>The Mistake:</strong> Writing a laundry list of what you were <em>supposed</em> to do.
        <br/>
        <em>"Responsible for sales," "Managed a team," "Wrote reports."</em>
      </p>

      <p>
        <strong>The Fix:</strong> Focus on what you <em>accomplished</em>. Use numbers and results.
        <br/>
        <em>"Increased sales by 20% in Q3," "Led a team of 10 to complete project X ahead of schedule."</em>
      </p>

      <div className="my-6 p-5 bg-green-50 border border-green-200 rounded-xl not-prose">
        <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" /> Formula for Success
        </h4>
        <p className="text-green-800 font-medium">
          Action Verb + Task + Result (Quantified if possible)
        </p>
      </div>

      <StepHeading step={2}>Using a Generic Summary (or Objective)</StepHeading>

      <p>
        <strong>The Mistake:</strong> "Objective: To obtain a challenging position in a reputable company."
      </p>

      <p>
        <strong>The Fix:</strong> Replace the outdated "Objective" with a "Professional Summary." 
        Tell the employer what <em>you</em> can do for <em>them</em>, not what you want from them.
      </p>

      <StepHeading step={3}>Ignoring ATS Optimization</StepHeading>

      <p>
        <strong>The Mistake:</strong> Using creative layouts, graphics, or columns that confuse Applicant Tracking Systems (ATS).
      </p>

      <p>
        <strong>The Fix:</strong> Keep it clean. Use standard headings (Experience, Education, Skills). 
        Incorporate keywords from the job description naturally into your text.
        Not sure if your resume passes? Try our{' '}
        <Link to="/ats-resume-checker" className="text-blue-600 hover:underline">
          free ATS resume checker
        </Link>{' '}
        to find out instantly.
      </p>

      <ArticleCTA 
        variant="inline"
        description="Not sure if your resume is ATS-friendly? GetQuickResume builds resumes designed to pass these automated filters."
      />

      <StepHeading step={4}>Poor Formatting and Design</StepHeading>

      <p>
        <strong>The Mistake:</strong> Walls of text, tiny margins, inconsistent fonts, or clutter.
      </p>

      <p>
        <strong>The Fix:</strong> White space is your friend. 
        Use bullet points to break up text. Stick to one or two professional fonts. 
        Ensure your dates and locations are aligned consistently. A readable resume is a hired resume.
      </p>

      <StepHeading step={5}>Typos and Grammatical Errors</StepHeading>

      <p>
        <strong>The Mistake:</strong> "Detail-oriented profssional."
      </p>

      <p>
        <strong>The Fix:</strong> Spell check is not enough. Read your resume backward to catch spelling errors. 
        Have a friend review it. Tools like Grammarly or GetQuickResume's built-in checks can be lifesavers. 
        One typo can suggest a lack of attention to detail.
      </p>

      <SectionDivider icon={Eye}>Final Review Checklist</SectionDivider>

      <div className="space-y-3 not-prose">
        {[
          'Did I quantify my achievements with numbers?',
          'Is my contact info current and professional?',
          'Did I customize my summary for this specific role?',
          'Is the formatting consistent (fonts, dates, bullets)?',
          'Have I removed outdated references or high school info (if experienced)?'
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
              {index + 1}
            </div>
            <span className="text-gray-700">{item}</span>
          </div>
        ))}
      </div>

      <p className="mt-8">
        Avoiding these common pitfalls puts you ahead of the competition. 
        Take 10 minutes today to audit your resume against this list—it could be the difference between silence and an interview offer.
      </p>
    </BlogLayout>
  );
}
