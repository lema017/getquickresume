import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Sparkles, Target, ArrowRight } from 'lucide-react';
import { LiveTemplateCarousel } from '@/components/templates/LiveTemplateCarousel';
import { getProfessionBySlug } from '@/data/professions';
import { getTemplatesByStyle } from '@/utils/templateCatalog';
import {
  BASE_URL,
  generateProfessionPageSEO,
  generateProfessionWebPageSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/utils/seoConfig';

export function ProfessionResumePage() {
  const { slug } = useParams<{ slug: string }>();
  const profession = slug ? getProfessionBySlug(slug) : undefined;

  const templates = useMemo(() => {
    if (!profession) return [];
    return getTemplatesByStyle(profession.templateStyle);
  }, [profession]);

  if (!profession) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">The resume template page you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
          Go to Homepage
        </Link>
      </div>
    );
  }

  const seo = generateProfessionPageSEO(profession);
  const breadcrumbs = [
    { name: 'Home', url: BASE_URL },
    { name: 'Resume Templates', url: `${BASE_URL}/create` },
    { name: `${profession.title} Resume`, url: seo.canonicalUrl },
  ];

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.canonicalUrl} />
        <meta name="keywords" content={seo.keywords} />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content={seo.ogType} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.canonicalUrl} />
        <meta property="og:site_name" content="GetQuickResume" />
        <meta property="og:image" content={seo.ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage} />

        <link rel="alternate" hrefLang="en" href={seo.canonicalUrl} />
        <link rel="alternate" hrefLang="x-default" href={seo.canonicalUrl} />

        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema(breadcrumbs))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema(profession.faqs))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateProfessionWebPageSchema(profession))}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Breadcrumbs */}
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
            <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5" /></li>
            <li><Link to="/create" className="hover:text-blue-600 transition-colors">Resume Templates</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5" /></li>
            <li className="text-gray-900 font-medium">{profession.title} Resume</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            {profession.title} Resume
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Browse professionally designed {profession.title.toLowerCase()} resume templates, see real examples with
            industry-specific skills, and create your ATS-optimized resume in minutes.
          </p>
        </header>

        {/* Template Carousel - CENTRAL FEATURE */}
        <section className="pb-12" aria-label={`${profession.title} Resume Templates`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Best Resume Templates for {profession.title}s
            </h2>
            <LiveTemplateCarousel
              templates={templates}
              resumeData={profession.sampleResumeData}
              getUseTemplateUrl={(tpl) => `/create?template=${tpl.id}`}
              useTemplateLabel="Create Your Resume"
            />
          </div>
        </section>

        {/* Top Skills Section */}
        <section className="py-12 bg-white" aria-label="Top Skills">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Top Skills for {profession.title} Resumes
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Include these in-demand skills on your {profession.title.toLowerCase()} resume to stand out to recruiters and pass ATS filters.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {profession.topSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-800 rounded-lg text-sm font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ATS Keywords Section */}
        <section className="py-12" aria-label="ATS Keywords">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                ATS Keywords for {profession.title} Resumes
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              These keywords are commonly scanned by Applicant Tracking Systems for {profession.title.toLowerCase()} positions.
              Incorporate them naturally into your resume to increase your chances of getting past automated screening.
            </p>
            <div className="flex flex-wrap gap-2">
              {profession.atsKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex px-3 py-1.5 bg-green-50 text-green-800 border border-green-200 rounded-full text-sm font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {profession.faqs.length > 0 && (
          <section className="py-12 bg-white" aria-label="Frequently Asked Questions">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {profession.title} Resume FAQ
              </h2>
              <div className="space-y-6">
                {profession.faqs.map((faq, i) => (
                  <details key={i} className="group border border-gray-200 rounded-xl" open={i === 0}>
                    <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      {faq.question}
                      <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                    </summary>
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <section className="py-16" aria-label="Call to Action">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-12 text-center text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to Build Your {profession.title} Resume?
              </h2>
              <p className="text-blue-100 mb-8 max-w-lg mx-auto">
                Choose from {templates.length}+ professionally designed templates, get AI-powered content
                suggestions, and download your ATS-optimized resume in minutes. 100% free to start.
              </p>
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-lg"
              >
                Start Building Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
