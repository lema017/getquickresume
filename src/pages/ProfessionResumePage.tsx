import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Sparkles, Target, ArrowRight, Loader2 } from 'lucide-react';
import { LiveTemplateCarousel } from '@/components/templates/LiveTemplateCarousel';
import { getProfessionBySlug, getSpanishProfessionSlug } from '@/data/professions';
import type { ProfessionPageData } from '@/data/professions';
import { getAllSkillSlugs, getSpanishSkillSlug } from '@/data/skills';
import { getTemplatesByStyle } from '@/utils/templateCatalog';
import { getLanguageFromSlug, getEnglishSlug } from '@/data/slugMappings';
import {
  BASE_URL,
  generateProfessionPageSEO,
  generateProfessionWebPageSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/utils/seoConfig';
import { getTemplateStyleIntro } from '@/utils/templateStyleCopy';

function skillSlugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function ProfessionResumePage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [profession, setProfession] = useState<ProfessionPageData | undefined>();
  const [allSkillSlugsSet, setAllSkillSlugsSet] = useState<Set<string>>(new Set());

  const detectedLanguage = slug ? getLanguageFromSlug(slug, 'profession') : 'en';
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
      const [prof, skillSlugs] = await Promise.all([
        slug ? getProfessionBySlug(slug) : undefined,
        getAllSkillSlugs(),
      ]);

      if (cancelled) return;
      setProfession(prof);
      setAllSkillSlugsSet(new Set(skillSlugs));
      setIsLoading(false);
    })();

    return () => { cancelled = true; };
  }, [slug]);

  const templates = useMemo(() => {
    if (!profession) return [];
    return getTemplatesByStyle(profession.templateStyle);
  }, [profession]);

  const templateStyleIntro = useMemo(() => {
    if (!profession) return null;
    return getTemplateStyleIntro(profession.templateStyle, isSpanish ? 'es' : 'en');
  }, [profession, isSpanish]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!profession) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t('professionResumePage.notFoundTitle', { lng })}
        </h1>
        <p className="text-gray-600 mb-8">
          {t('professionResumePage.notFoundDescription', { lng })}
        </p>
        <Link to="/" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
          {t('professionResumePage.notFoundCta', { lng })}
        </Link>
      </div>
    );
  }

  const seo = generateProfessionPageSEO(profession, detectedLanguage);

  const englishSlug = isSpanish && slug ? getEnglishSlug(slug, 'profession') : slug;
  const spanishSlug = !isSpanish && slug ? getSpanishProfessionSlug(slug) : slug;
  const englishUrl = englishSlug ? `${BASE_URL}/resume/${englishSlug}` : seo.canonicalUrl;
  const spanishUrl = spanishSlug ? `${BASE_URL}/resume/${spanishSlug}` : null;

  const breadcrumbs = [
    { name: t('professionResumePage.breadcrumbHome', { lng }), url: BASE_URL },
    { name: t('professionResumePage.breadcrumbTemplates', { lng }), url: `${BASE_URL}/create` },
    {
      name: t('professionResumePage.breadcrumbCurrent', { title: profession.title, lng }),
      url: seo.canonicalUrl,
    },
  ];

  const getLocalizedSkillSlug = (skillTitle: string) => {
    const englishSkillSlug = skillSlugify(skillTitle);
    if (isSpanish) {
      const spanishSkill = getSpanishSkillSlug(englishSkillSlug);
      return spanishSkill || englishSkillSlug;
    }
    return englishSkillSlug;
  };

  const titleLower = profession.title.toLowerCase();

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
          {JSON.stringify(generateFAQSchema(profession.faqs))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateProfessionWebPageSchema(profession, detectedLanguage))}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Breadcrumbs */}
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2" aria-label={t('professionResumePage.breadcrumbNavAria', { lng })}>
          <ol className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
            <li><Link to="/" className="hover:text-blue-600 transition-colors">{t('professionResumePage.breadcrumbHome', { lng })}</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5" /></li>
            <li><Link to="/create" className="hover:text-blue-600 transition-colors">{t('professionResumePage.breadcrumbTemplates', { lng })}</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5" /></li>
            <li className="text-gray-900 font-medium">
              {t('professionResumePage.breadcrumbCurrent', { title: profession.title, lng })}
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            {t('professionResumePage.h1', { title: profession.title, lng })}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('professionResumePage.heroLead', { title: profession.title, titleLower, lng })}
          </p>
          {templateStyleIntro && (
            <div className="mt-8 max-w-2xl mx-auto text-left border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900">{templateStyleIntro.heading}</h2>
              <p className="mt-2 text-gray-600 text-base leading-relaxed">{templateStyleIntro.body}</p>
            </div>
          )}
        </header>

        {/* Template Carousel - CENTRAL FEATURE */}
        <section
          className="pb-12"
          aria-label={t('professionResumePage.sectionTemplatesAria', { title: profession.title, lng })}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              {t('professionResumePage.templatesHeading', { title: profession.title, lng })}
            </h2>
            <LiveTemplateCarousel
              templates={templates}
              resumeData={profession.sampleResumeData}
              getUseTemplateUrl={(tpl) => `/create?template=${tpl.id}`}
              useTemplateLabel={t('professionResumePage.createYourResume', { lng })}
            />
          </div>
        </section>

        {/* Top Skills Section */}
        <section className="py-12 bg-white" aria-label={t('professionResumePage.sectionTopSkillsAria', { lng })}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                {t('professionResumePage.topSkillsHeading', { title: profession.title, lng })}
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              {t('professionResumePage.topSkillsIntro', { title: profession.title, titleLower, lng })}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {profession.topSkills.map((skill) => {
                const localizedSkillSlug = getLocalizedSkillSlug(skill);
                const hasSkillPage = allSkillSlugsSet.has(skillSlugify(skill));
                return hasSkillPage ? (
                  <Link
                    key={skill}
                    to={`/resume-skills/${localizedSkillSlug}`}
                    className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-800 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    {skill}
                  </Link>
                ) : (
                  <div
                    key={skill}
                    className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-800 rounded-lg text-sm font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    {skill}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ATS Keywords Section */}
        <section className="py-12" aria-label={t('professionResumePage.sectionAtsAria', { lng })}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                {t('professionResumePage.atsHeading', { title: profession.title, lng })}
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              {t('professionResumePage.atsIntro', { title: profession.title, titleLower, lng })}
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
          <section className="py-12 bg-white" aria-label={t('professionResumePage.sectionFaqAria', { lng })}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {t('professionResumePage.faqHeading', { title: profession.title, lng })}
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
        <section className="py-16" aria-label={t('professionResumePage.sectionCtaAria', { lng })}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-12 text-center text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {t('professionResumePage.ctaTitle', { title: profession.title, lng })}
              </h2>
              <p className="text-blue-100 mb-8 max-w-lg mx-auto">
                {t('professionResumePage.ctaBody', { count: templates.length, lng })}
              </p>
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-lg"
              >
                {t('professionResumePage.ctaButton', { lng })}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
