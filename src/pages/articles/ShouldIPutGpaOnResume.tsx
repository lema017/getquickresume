import { Link } from 'react-router-dom';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { ArticleCTA } from '@/components/blog/ArticleCTA';
import { SectionDivider } from '@/components/blog/SectionDivider';
import { getArticleBySlug, getRelatedArticles } from '@/data/articles';
import { CheckCircle, XCircle, GraduationCap, Calculator, Award, HelpCircle, AlertTriangle } from 'lucide-react';

export function ShouldIPutGpaOnResume() {
  const article = getArticleBySlug('should-i-put-gpa-on-resume', 'en')!;
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
        One of the most debated resume questions is whether to include your Grade Point Average (GPA). 
        The short answer: <strong>it depends</strong>. Your GPA can either strengthen your candidacy or 
        hurt your chances, depending on when you include it and what it reveals about your qualifications.
      </p>

      <p>
        This guide provides clear, definitive rules for when to list your GPA, when to leave it off, 
        and what alternatives to use when your GPA doesn't tell your full story.
      </p>

      <SectionDivider icon={GraduationCap}>When to Include Your GPA</SectionDivider>

      <p>
        Including your GPA makes sense in specific situations where it adds value to your candidacy:
      </p>

      <h3>Scenario 1: You're a Recent Graduate (Within 2-3 Years)</h3>

      <p>
        If you graduated within the last 2-3 years, your GPA is still relevant to employers. 
        At this stage, you likely have limited professional experience, and academic performance 
        serves as a proxy for your capabilities.
      </p>

      <div className="my-6 p-6 bg-green-50 border border-green-200 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h4 className="font-bold text-green-800">Include Your GPA If:</h4>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span>You graduated within the last 2-3 years</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span>Your GPA is 3.5 or higher on a 4.0 scale</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span>You're applying to your first or second professional role</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span>The employer specifically requests academic credentials</span>
          </li>
        </ul>
      </div>

      <h3>Scenario 2: You Have an Exceptional GPA</h3>

      <p>
        A GPA of 3.5 or above is generally considered worth highlighting. Here's the breakdown:
      </p>

      <div className="my-6 grid grid-cols-2 md:grid-cols-4 gap-3 not-prose">
        <div className="p-4 bg-green-100 border border-green-200 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-700 mb-1">3.8+</div>
          <p className="text-xs text-green-800 font-semibold">Definitely Include</p>
          <p className="text-xs text-gray-600 mt-1">Summa/Magna Cum Laude</p>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
          <div className="text-2xl font-bold text-emerald-700 mb-1">3.5-3.7</div>
          <p className="text-xs text-emerald-800 font-semibold">Include</p>
          <p className="text-xs text-gray-600 mt-1">Cum Laude</p>
        </div>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
          <div className="text-2xl font-bold text-amber-700 mb-1">3.0-3.4</div>
          <p className="text-xs text-amber-800 font-semibold">Optional</p>
          <p className="text-xs text-gray-600 mt-1">Consider Major GPA</p>
        </div>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-700 mb-1">Below 3.0</div>
          <p className="text-xs text-red-800 font-semibold">Omit</p>
          <p className="text-xs text-gray-600 mt-1">Use Alternatives</p>
        </div>
      </div>

      <h3>Scenario 3: You're Applying to Academia or Research</h3>

      <p>
        For graduate school applications, research positions, or academic roles, GPA carries 
        significantly more weight. Include it regardless of years of experience unless you 
        have substantial professional accomplishments that overshadow academic metrics.
      </p>

      <h3>Scenario 4: The Job Listing Requests It</h3>

      <p>
        Some employers, particularly consulting firms, investment banks, and competitive 
        entry-level programs, specifically request GPA information. Always include it when 
        explicitly asked — omitting it may disqualify you.
      </p>

      <ArticleCTA 
        variant="inline"
        description="Unsure whether to include your GPA? GetQuickResume's AI analyzes your situation and recommends the best approach for your specific career stage and target role."
      />

      <SectionDivider icon={XCircle}>When to Leave Your GPA Off</SectionDivider>

      <p>
        Sometimes including your GPA does more harm than good. Here's when to exclude it:
      </p>

      <h3>Scenario 1: You Graduated More Than 3 Years Ago</h3>

      <div className="my-6 p-6 bg-red-50 border border-red-200 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <XCircle className="w-6 h-6 text-red-600" />
          <h4 className="font-bold text-red-800">Omit Your GPA When:</h4>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">•</span>
            <span>More than 3 years have passed since graduation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">•</span>
            <span>You have substantial professional experience (5+ years)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">•</span>
            <span>Your GPA is below 3.0 on a 4.0 scale</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">•</span>
            <span>Your work achievements tell a stronger story than grades</span>
          </li>
        </ul>
      </div>

      <p>
        After 3 years in the workforce, your professional accomplishments matter far more than 
        your college grades. Recruiters care about what you've achieved in real-world settings 
        more than how you performed in academic settings years ago.
      </p>

      <h3>Scenario 2: Your GPA Is Below 3.0</h3>

      <p>
        A GPA below 3.0 raises red flags without adding value. Unless you're applying to a 
        field where GPA is mandatory (like some consulting firms), leave it off and focus on 
        other strengths.
      </p>

      <div className="my-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            <strong>Important:</strong> Some online application systems require GPA input. 
            You may need to enter it in forms even if it doesn't appear on your resume document. 
            Always answer application questions honestly.
          </p>
        </div>
      </div>

      <h3>Scenario 3: You Have a Strong Professional Track Record</h3>

      <p>
        If you have impressive work achievements, promotions, or measurable impact, let those 
        speak for you. Professional success trumps academic performance in almost every industry 
        after your first few years.
      </p>

      <h3>Scenario 4: You're Changing Careers</h3>

      <p>
        If your GPA relates to a field you're leaving, it may not be relevant to your new direction. 
        Focus on transferable skills and relevant experience instead.
      </p>

      <SectionDivider icon={Calculator}>Major GPA vs. Cumulative GPA</SectionDivider>

      <p>
        Did you excel in your major courses but struggled with general education requirements? 
        You may have the option to list your <strong>Major GPA</strong> instead of your cumulative GPA.
      </p>

      <h3>When to Use Major GPA</h3>

      <div className="my-6 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start gap-3 mb-4">
          <Calculator className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <h4 className="font-bold text-blue-900">Consider Major GPA If:</h4>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span>Your major GPA is significantly higher than your cumulative GPA (0.3+ difference)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span>The job directly relates to your field of study</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span>You want to highlight your expertise in your specific discipline</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span>Your general education grades don't reflect your professional capabilities</span>
          </li>
        </ul>
      </div>

      <h3>How to List Major GPA</h3>

      <p>
        If you choose to list your Major GPA, be transparent and specific:
      </p>

      <div className="my-6 p-5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm text-gray-700 space-y-3">
        <p><strong>Bachelor of Science in Computer Science</strong><br />
        University of California, Berkeley<br />
        Major GPA: 3.7/4.0 | Overall GPA: 3.2/4.0</p>
      </div>

      <div className="my-6 p-4 bg-red-50 border border-red-200 rounded-xl">
        <div className="flex items-start gap-2">
          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-700 font-semibold mb-1">Don't:</p>
            <p className="text-sm text-gray-600">
              List only your Major GPA without indicating it's not your cumulative GPA. 
              This can be misleading and may come up in background checks.
            </p>
          </div>
        </div>
      </div>

      <ArticleCTA 
        variant="inline"
        description="Need help deciding between cumulative and major GPA? GetQuickResume guides you through the best approach based on your academic record and career goals."
      />

      <SectionDivider icon={Award}>Alternatives to Listing Your GPA</SectionDivider>

      <p>
        If your GPA doesn't tell your full story — or if you simply don't want to include it — 
        you have several alternatives to demonstrate your capabilities:
      </p>

      <h3>Option 1: Latin Honors (Dean's List, Cum Laude, etc.)</h3>

      <p>
        Academic honors provide context without specific numbers:
      </p>

      <ul>
        <li><strong>Summa Cum Laude</strong> — "With highest honors" (typically top 1-5%)</li>
        <li><strong>Magna Cum Laude</strong> — "With great honors" (typically top 10-15%)</li>
        <li><strong>Cum Laude</strong> — "With honors" (typically top 20-30%)</li>
        <li><strong>Dean's List</strong> — Semester or year recognition for high achievement</li>
      </ul>

      <div className="my-6 p-5 bg-gray-50 border border-gray-200 rounded-xl">
        <p className="text-sm text-gray-700 font-mono">
          <strong>Bachelor of Arts in Economics</strong><br />
          Boston University<br />
          Graduated Magna Cum Laude | Dean's List (6 semesters)
        </p>
      </div>

      <h3>Option 2: Relevant Coursework or Projects</h3>

      <p>
        Highlight specific courses or academic projects that demonstrate skills relevant to 
        your target role:
      </p>

      <div className="my-6 p-5 bg-gray-50 border border-gray-200 rounded-xl">
        <p className="text-sm text-gray-700 font-mono">
          <strong>Bachelor of Science in Marketing</strong><br />
          University of Texas at Austin<br />
          <em>Capstone Project:</em> Developed comprehensive marketing campaign for local nonprofit, 
          increasing donations by 40%<br />
          <em>Relevant Coursework:</em> Digital Marketing Analytics, Consumer Behavior, Brand Strategy
        </p>
      </div>

      <h3>Option 3: Certifications and Additional Credentials</h3>

      <p>
        Professional certifications, licenses, and continuing education can demonstrate 
        expertise more effectively than GPA:
      </p>

      <ul>
        <li>Industry certifications (PMP, CPA, AWS, Google Analytics, etc.)</li>
        <li>Professional licenses</li>
        <li>Online course certificates from recognized platforms</li>
        <li>Workshops and specialized training</li>
      </ul>

      <h3>Option 4: Academic Achievements Without Numbers</h3>

      <p>
        Highlight accomplishments that show dedication and capability:
      </p>

      <ul>
        <li>Scholarships or academic awards</li>
        <li>Research assistant positions</li>
        <li>Teaching assistant roles</li>
        <li>Leadership in academic organizations</li>
        <li>Published papers or conference presentations</li>
      </ul>

      <SectionDivider icon={HelpCircle}>Common GPA Questions Answered</SectionDivider>

      <div className="my-8 space-y-4">
        <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl">
          <h4 className="font-bold text-gray-900 mb-2">What if I have a different GPA scale?</h4>
          <p className="text-gray-700 text-sm">
            International students or those from schools using different scales (5.0, 10.0, percentage) 
            should convert to the 4.0 scale or clearly indicate their scale: "GPA: 8.5/10.0" or 
            "First Class Honors (equivalent to 3.7/4.0 GPA)".
          </p>
        </div>

        <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl">
          <h4 className="font-bold text-gray-900 mb-2">Should I round my GPA?</h4>
          <p className="text-gray-700 text-sm">
            Standard rounding rules apply: 3.47 rounds to 3.5, but 3.43 stays at 3.4. Some advisors 
            recommend against rounding at all to maintain accuracy. If your GPA is 3.98, list it as 
            3.98 — not 4.0.
          </p>
        </div>

        <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl">
          <h4 className="font-bold text-gray-900 mb-2">What if I went back to school for a second degree?</h4>
          <p className="text-gray-700 text-sm">
            Treat each degree separately. If your recent degree (relevant to your target role) has 
            a strong GPA but your older degree doesn't, include the recent GPA and omit the older one 
            if it's not relevant.
          </p>
        </div>

        <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl">
          <h4 className="font-bold text-gray-900 mb-2">Does community college GPA matter?</h4>
          <p className="text-gray-700 text-sm">
            If you transferred from community college to a four-year university, your university 
            GPA is what matters most. Include it if it's strong; otherwise, focus on your degree and 
            the university name.
          </p>
        </div>

        <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl">
          <h4 className="font-bold text-gray-900 mb-2">What if my GPA improved significantly over time?</h4>
          <p className="text-gray-700 text-sm">
            You can note an upward trend: "GPA: 3.4/4.0 (3.6 average in final 60 credits)" or 
            highlight your strong finish. This demonstrates growth and resilience.
          </p>
        </div>
      </div>

      <SectionDivider icon={CheckCircle}>The Decision Framework</SectionDivider>

      <div className="my-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
        <h4 className="font-bold text-blue-900 mb-4">Quick Decision Guide</h4>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
              ✓
            </div>
            <div>
              <p className="font-semibold text-gray-900">Include Your GPA If:</p>
              <p className="text-sm text-gray-600">Graduated within 2-3 years AND GPA is 3.5+</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
              ?
            </div>
            <div>
              <p className="font-semibold text-gray-900">Consider Major GPA If:</p>
              <p className="text-sm text-gray-600">Major GPA is 3.5+ and significantly higher than cumulative</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
              ★
            </div>
            <div>
              <p className="font-semibold text-gray-900">Use Alternatives If:</p>
              <p className="text-sm text-gray-600">You have honors, relevant coursework, or certifications</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
              ✕
            </div>
            <div>
              <p className="font-semibold text-gray-900">Omit Your GPA If:</p>
              <p className="text-sm text-gray-600">Graduated 3+ years ago OR GPA is below 3.0</p>
            </div>
          </div>
        </div>
      </div>

      <SectionDivider icon={CheckCircle}>Key Takeaways</SectionDivider>

      <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl not-prose shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">GPA Decision Checklist</h3>
        </div>
        <ul className="space-y-3">
          {[
            'Include GPA if you graduated within 2-3 years and have 3.5+ on 4.0 scale',
            'Omit GPA if you graduated more than 3 years ago',
            'Never include GPA below 3.0 unless specifically required',
            'Consider Major GPA if it\'s significantly stronger than cumulative',
            'Use Latin honors (Cum Laude) as an alternative to specific numbers',
            'Highlight relevant coursework, projects, or certifications instead',
            'Remember: professional experience eventually outweighs academic metrics',
            'Be honest in applications even if you omit GPA from your resume'
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p>
        Deciding whether to include your GPA is about strategic communication. The goal is to 
        present the most compelling evidence of your qualifications while being honest and transparent.
      </p>

      <p>
        Your GPA is just one data point in a much larger story. For recent graduates, it can 
        demonstrate academic capability when professional experience is limited. For experienced 
        professionals, work achievements speak louder than grades ever could.
      </p>

      <p>
        Ready to build a resume that showcases your strengths? GetQuickResume helps you make 
        the right decisions about what to include — from GPA to work experience — and creates 
        a professional, ATS-optimized resume that highlights your best qualifications.{' '}
        <Link to="/login" className="text-blue-600 hover:underline font-medium">
          Start building your resume today
        </Link>.
      </p>
    </BlogLayout>
  );
}
