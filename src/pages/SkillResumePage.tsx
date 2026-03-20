import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Sparkles, Target, ArrowRight, BookOpen, Lightbulb, Briefcase, Link2, Loader2 } from 'lucide-react';
import { LiveTemplateCarousel } from '@/components/templates/LiveTemplateCarousel';
import { getSkillBySlug, getAllSkillSlugs, getSpanishSkillSlug } from '@/data/skills';
import type { SkillPageData } from '@/data/skills';
import { getProfessionBySlug, getSpanishProfessionSlug } from '@/data/professions';
import type { ProfessionPageData } from '@/data/professions';
import { getTemplatesByStyle } from '@/utils/templateCatalog';
import { getLanguageFromSlug, getEnglishSlug } from '@/data/slugMappings';
import {
  BASE_URL,
  generateSkillPageSEO,
  generateSkillWebPageSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/utils/seoConfig';

function skillSlugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function SkillResumePage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [skill, setSkill] = useState<SkillPageData | undefined>();
  const [allSkillSlugs, setAllSkillSlugs] = useState<string[]>([]);
  const [linkedProfessions, setLinkedProfessions] = useState<Array<{ slug: string; title: string }>>([]);
  const [firstProfession, setFirstProfession] = useState<ProfessionPageData | undefined>();

  const detectedLanguage = slug ? getLanguageFromSlug(slug, 'skill') : 'en';
  const isSpanish = detectedLanguage === 'es';
  const lng = detectedLanguage;

  useEffect(() => {
    if (detectedLanguage && detectedLanguage !== i18n.language) {
      i18n.changeLanguage(detectedLanguage);
    }
  }, [detectedLanguage, i18n]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    (async () => {
      const [loadedSkill, slugs] = await Promise.all([
        slug ? getSkillBySlug(slug) : undefined,
        getAllSkillSlugs(),
      ]);

      if (cancelled) return;

      setSkill(loadedSkill);
      setAllSkillSlugs(slugs);

      if (loadedSkill) {
        const profResults = await Promise.all(
          loadedSkill.professionSlugs.map(async (s) => {
            const prof = await getProfessionBySlug(s);
            const localizedSlug = isSpanish
              ? (getSpanishProfessionSlug(s) || s)
              : s;
            return prof ? { slug: localizedSlug, title: prof.title, data: prof } : null;
          })
        );

        if (cancelled) return;

        const validProfs = profResults.filter(Boolean) as Array<{ slug: string; title: string; data: ProfessionPageData }>;
        setLinkedProfessions(validProfs.map(p => ({ slug: p.slug, title: p.title })));
        setFirstProfession(validProfs[0]?.data);
      }

      setIsLoading(false);
    })();

    return () => { cancelled = true; };
  }, [slug, isSpanish]);

  const templates = useMemo(() => {
    if (!firstProfession) return [];
    return getTemplatesByStyle(firstProfession.templateStyle);
  }, [firstProfession]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t('skillResumePage.notFoundTitle', { lng })}
        </h1>
        <p className="text-gray-600 mb-8">
          {t('skillResumePage.notFoundDescription', { lng })}
        </p>
        <Link to="/" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
          {t('skillResumePage.notFoundCta', { lng })}
        </Link>
      </div>
    );
  }

  const seo = generateSkillPageSEO(skill, detectedLanguage);

  const englishSlug = isSpanish && slug ? getEnglishSlug(slug, 'skill') : slug;
  const spanishSlug = !isSpanish && slug ? getSpanishSkillSlug(slug) : slug;
  const englishUrl = englishSlug ? `${BASE_URL}/resume-skills/${englishSlug}` : seo.canonicalUrl;
  const spanishUrl = spanishSlug ? `${BASE_URL}/resume-skills/${spanishSlug}` : null;

  const breadcrumbs = [
    { name: t('skillResumePage.breadcrumbHome', { lng }), url: BASE_URL },
    { name: t('skillResumePage.breadcrumbHub', { lng }), url: `${BASE_URL}/resume-skills` },
    {
      name: t('skillResumePage.breadcrumbSchemaLeaf', { title: skill.title, lng }),
      url: seo.canonicalUrl,
    },
  ];

  const titleLower = skill.title.toLowerCase();

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
        <meta property="og:locale" content={isSpanish ? 'es_ES' : 'en_US'} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage} />

        {/* Hreflang tags for bilingual SEO */}
        <link rel="alternate" hrefLang="en" href={englishUrl} />
        {spanishUrl && <link rel="alternate" hrefLang="es" href={spanishUrl} />}
        <link rel="alternate" hrefLang="x-default" href={englishUrl} />

        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema(breadcrumbs))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema(skill.faqs))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateSkillWebPageSchema(skill, detectedLanguage))}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Breadcrumbs */}
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2" aria-label={t('skillResumePage.breadcrumbNavAria', { lng })}>
          <ol className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
            <li><Link to="/" className="hover:text-blue-600 transition-colors">{t('skillResumePage.breadcrumbHome', { lng })}</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5" /></li>
            <li><span className="text-gray-500">{t('skillResumePage.breadcrumbHub', { lng })}</span></li>
            <li><ChevronRight className="w-3.5 h-3.5" /></li>
            <li className="text-gray-900 font-medium">{skill.title}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            {t('skillResumePage.h1', { title: skill.title, lng })}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {skill.description.split('\n')[0] || skill.description.substring(0, 200)}
          </p>
        </header>

        {/* Why This Skill Matters */}
        <section className="py-12 bg-white" aria-label={t('skillResumePage.sectionWhyAria', { lng })}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-gray-900">
                {t('skillResumePage.whyHeading', { title: skill.title, lng })}
              </h2>
            </div>
            <div className="prose prose-gray max-w-none">
              {skill.whyImportant.split('\n').map((paragraph, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Template Carousel */}
        {firstProfession && templates.length > 0 && (
          <section
            className="pb-12"
            aria-label={t('skillResumePage.sectionTemplatesAria', { title: skill.title, lng })}
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
                {t('skillResumePage.templatesHeading', { title: skill.title, lng })}
              </h2>
              <LiveTemplateCarousel
                templates={templates}
                resumeData={firstProfession.sampleResumeData}
                getUseTemplateUrl={(tpl) => `/create?template=${tpl.id}`}
                useTemplateLabel={t('skillResumePage.createYourResume', { lng })}
              />
            </div>
          </section>
        )}

        {/* Description / Deep Dive */}
        <section className="py-12" aria-label={t('skillResumePage.sectionOverviewAria', { lng })}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                {t('skillResumePage.understandingHeading', { title: skill.title, lng })}
              </h2>
            </div>
            <div className="prose prose-gray max-w-none">
              {skill.description.split('\n').map((paragraph, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Related Skills & Sub-Skills */}
        <section className="py-12 bg-white" aria-label={t('skillResumePage.sectionRelatedAria', { lng })}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <Link2 className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                {t('skillResumePage.relatedHeading', { lng })}
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              {t('skillResumePage.relatedIntro', { title: skill.title, titleLower, lng })}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {skill.relatedSkills.map((related) => {
                const englishRelatedSlug = skillSlugify(related);
                const localizedRelatedSlug = isSpanish
                  ? (getSpanishSkillSlug(englishRelatedSlug) || englishRelatedSlug)
                  : englishRelatedSlug;
                const hasPage = allSkillSlugs.includes(englishRelatedSlug);
                return hasPage ? (
                  <Link
                    key={related}
                    to={`/resume-skills/${localizedRelatedSlug}`}
                    className="flex items-center gap-2 px-4 py-3 bg-purple-50 text-purple-800 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                    {related}
                  </Link>
                ) : (
                  <div
                    key={related}
                    className="flex items-center gap-2 px-4 py-3 bg-purple-50 text-purple-800 rounded-lg text-sm font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                    {related}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Resume Bullet Examples */}
        <section className="py-12" aria-label={t('skillResumePage.sectionBulletsAria', { lng })}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('skillResumePage.bulletsHeading', { title: skill.title, lng })}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('skillResumePage.bulletsIntro', { title: skill.title, titleLower, lng })}
            </p>
            <div className="space-y-3">
              {skill.exampleBullets.map((bullet, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips for Your Resume */}
        <section className="py-12 bg-white" aria-label={t('skillResumePage.sectionTipsAria', { lng })}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                {t('skillResumePage.tipsHeading', { title: skill.title, lng })}
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {skill.resumeTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white">
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Professions Where It Applies */}
        {linkedProfessions.length > 0 && (
          <section className="py-12" aria-label={t('skillResumePage.sectionProfessionsAria', { lng })}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('skillResumePage.professionsHeading', { title: skill.title, lng })}
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                {t('skillResumePage.professionsIntro', { title: skill.title, lng })}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {linkedProfessions.map((prof) => (
                  <Link
                    key={prof.slug}
                    to={`/resume/${prof.slug}`}
                    className="group flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                  >
                    <div>
                      <span className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                        {prof.title}
                      </span>
                      <span className="block text-sm text-gray-500 mt-0.5">
                        {t('skillResumePage.professionCardSubtitle', { title: prof.title, lng })}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ATS Keywords */}
        <section className="py-12 bg-white" aria-label={t('skillResumePage.sectionAtsAria', { lng })}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                {t('skillResumePage.atsHeading', { title: skill.title, lng })}
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              {t('skillResumePage.atsIntro', { title: skill.title, titleLower, lng })}
            </p>
            <div className="flex flex-wrap gap-2">
              {skill.atsKeywords.map((keyword) => (
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
        {skill.faqs.length > 0 && (
          <section className="py-12" aria-label={t('skillResumePage.sectionFaqAria', { lng })}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {t('skillResumePage.faqHeading', { title: skill.title, lng })}
              </h2>
              <div className="space-y-6">
                {skill.faqs.map((faq, i) => (
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

        {/* Primary CTA - Links to Homepage */}
        <section className="py-16" aria-label={t('skillResumePage.sectionCtaAria', { lng })}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-12 text-center text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {t('skillResumePage.ctaTitle', { title: skill.title, lng })}
              </h2>
              <p className="text-blue-100 mb-8 max-w-lg mx-auto">
                {t('skillResumePage.ctaBody', { title: skill.title, titleLower, lng })}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-lg"
                >
                  {t('skillResumePage.ctaPrimary', { lng })}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/create"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-lg border border-blue-400"
                >
                  {t('skillResumePage.ctaSecondary', { lng })}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
