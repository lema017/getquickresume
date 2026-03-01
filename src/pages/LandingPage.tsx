import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  Check,
  LayoutTemplate,
  PenLine,
  Download,
} from 'lucide-react';
import {
  getPageSEO,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateSoftwareApplicationSchema,
  generateFAQSchema,
  commonFAQs,
  BASE_URL,
} from '@/utils/seoConfig';
import { startLandingEngagementTracking, trackLandingView, trackCtaClickStart } from '@/services/marketingAnalytics';
import { IconWrapper } from '@/components/IconWrapper';
import { WebComponentRenderer } from '@/components/wizard/WebComponentRenderer';
import type { ResumeData } from '@/types';

const HERO_TEMPLATE_ID = 'gqr-resume-mercury';

const heroResumeData: ResumeData = {
  firstName: 'John',
  lastName: 'Doe',
  country: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/johndoe',
  language: 'en',
  targetLevel: 'senior',
  profession: 'Senior Software Engineer',
  tone: 'professional',
  phone: '+1 (555) 123-4567',
  email: 'john.doe@example.com',
  skillsRaw: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Python', 'PostgreSQL'],
  experience: [
    {
      id: 'exp-1',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      startDate: '2020-01',
      isCurrent: true,
      achievements: [
        'Led development of microservices architecture serving 1M+ users',
        'Improved system performance by 40% through optimization',
        'Mentored team of 5 junior developers',
      ],
      responsibilities: [],
      pageNumber: null,
    },
    {
      id: 'exp-2',
      title: 'Software Engineer',
      company: 'StartupXYZ',
      startDate: '2017-06',
      endDate: '2020-01',
      isCurrent: false,
      achievements: [
        'Built React frontend for e-commerce platform',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
      ],
      responsibilities: [],
      pageNumber: null,
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2013-09',
      endDate: '2017-05',
      isCompleted: true,
      pageNumber: null,
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2022',
      pageNumber: null,
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration, serving 50K+ active users monthly.',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      startDate: '2021-01',
      isOngoing: false,
      pageNumber: null,
    },
  ],
  languages: [
    { id: 'lang-1', name: 'English', level: 'native', pageNumber: null },
    { id: 'lang-2', name: 'Spanish', level: 'intermediate', pageNumber: null },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Best Innovation Award',
      description: 'Recognized for developing an AI-powered code review tool',
      year: '2023',
      pageNumber: null,
    },
  ],
  summary: 'Experienced software engineer with 8+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable solutions.',
  jobDescription: '',
  completedSteps: [1, 2, 3, 4, 5, 6, 7],
  currentStep: 7,
  totalCharacters: 0,
  lastSaved: new Date(),
  firstNamePageNumber: null,
  lastNamePageNumber: null,
  countryPageNumber: null,
  linkedinPageNumber: null,
  languagePageNumber: null,
  targetLevelPageNumber: null,
  professionPageNumber: null,
  tonePageNumber: null,
  phonePageNumber: null,
  emailPageNumber: null,
  summaryPageNumber: null,
  jobDescriptionPageNumber: null,
  skillsPagination: null,
};

const stepIcons = [LayoutTemplate, PenLine, Download];

export function LandingPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'es';
  const seo = getPageSEO('home', lang);

  useEffect(() => {
    trackLandingView('home');
  }, []);

  useEffect(() => {
    return startLandingEngagementTracking('home');
  }, []);

  const [heroTemplateCode, setHeroTemplateCode] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch(`/templates/designs/${HERO_TEMPLATE_ID}.js?v=${Date.now()}`)
      .then((res) => (res.ok ? res.text() : null))
      .then((code) => { if (mounted && code) setHeroTemplateCode(code); })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const organizationSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();
  const softwareAppSchema = generateSoftwareApplicationSchema();
  const faqSchema = generateFAQSchema(commonFAQs[lang]);

  const steps = t('landing.howItWorks.steps', { returnObjects: true }) as {
    number: string;
    title: string;
    description: string;
    icon: string;
  }[];

  const freeFeatures = t('landing.freeTier.features', { returnObjects: true }) as string[];


  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={BASE_URL} />

        <link rel="alternate" hrefLang="en" href={BASE_URL} />
        <link rel="alternate" hrefLang="es" href={`${BASE_URL}?lang=es`} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={BASE_URL} />
        <meta property="og:site_name" content="GetQuickResume" />
        <meta property="og:image" content={`${BASE_URL}/images/og-default.png`} />
        <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={`${BASE_URL}/images/og-default.png`} />

        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={
            lang === 'es'
              ? 'creador de cv, currículum con ia, plantillas de cv, cv profesional, ats cv, crear cv gratis, carta de presentación, optimización ats'
              : 'resume builder, ai resume, cv templates, professional resume, ats resume, free resume maker, cover letter, ats optimization'
          }
        />

        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webSiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(softwareAppSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* ── Hero ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">
                {t('landing.hero.label')}
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                {t('landing.hero.title')}
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line mb-8">
                {t('landing.hero.subtitle')}
              </p>

              <Link
                to="/create"
                onClick={() => trackCtaClickStart('create', 'home')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-semibold text-lg hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
              >
                {t('landing.hero.ctaPrimary')}
                <ArrowRight className="w-5 h-5" />
              </Link>

            </div>

            {/* Right — Resume preview */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {heroTemplateCode ? (
                  <div
                    className="rounded-xl shadow-2xl border border-slate-200 overflow-hidden bg-white"
                    style={{ width: '100%', maxWidth: '28rem', aspectRatio: '210 / 297' }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '210mm',
                        height: '297mm',
                        transform: 'scale(var(--hero-scale))',
                        transformOrigin: 'top left',
                        pointerEvents: 'none',
                      }}
                      ref={(el) => {
                        if (el) {
                          const parent = el.parentElement;
                          if (parent) {
                            const s = parent.offsetWidth / el.offsetWidth;
                            el.style.setProperty('--hero-scale', String(s));
                          }
                        }
                      }}
                    >
                      <WebComponentRenderer
                        tagName={HERO_TEMPLATE_ID}
                        jsCode={heroTemplateCode}
                        data={heroResumeData}
                        language={lang}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="rounded-xl shadow-2xl border border-slate-200 bg-slate-50 flex items-center justify-center"
                    style={{ width: '100%', maxWidth: '28rem', aspectRatio: '210 / 297' }}
                  >
                    <div className="w-8 h-8 border-4 border-slate-300 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-50 rounded-2xl -z-10" />
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-slate-50 rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works — 3 Steps ── */}
        <section className="bg-slate-50 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                {t('landing.howItWorks.title')}
              </h2>
              <p className="text-lg text-slate-500">
                {t('landing.howItWorks.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
              {steps.map((step, index) => {
                const Icon = stepIcons[index];
                return (
                  <Link
                    key={index}
                    to="/create"
                    onClick={() => trackCtaClickStart('create', 'home')}
                    className="text-center group cursor-pointer"
                  >
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-5 shadow-lg group-hover:bg-slate-700 transition-colors">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                      {lang === 'es' ? 'Paso' : 'Step'} {step.number}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2 group-hover:text-blue-600 transition-colors">{step.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Core Features ── */}
        <section className="py-20 lg:py-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                {t('landing.coreFeatures.title')}
              </h2>
              <p className="text-lg text-slate-500">
                {t('landing.coreFeatures.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {(t('landing.coreFeatures.items', { returnObjects: true }) as { icon: string; title: string }[]).map((feature, index) => (
                <Link
                  key={index}
                  to="/create"
                  className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center mb-3 transition-colors">
                    <IconWrapper name={feature.icon} className="w-6 h-6 text-slate-700" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{feature.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Free Plan Features ── */}
        <section className="py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
              {t('landing.freeTier.title')}
            </h2>
            <p className="text-lg text-slate-500 mb-12">
              {t('landing.freeTier.subtitle')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
              {freeFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-5 py-4 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-slate-700 font-medium text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Link
              to="/create"
              onClick={() => trackCtaClickStart('create', 'home')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-semibold text-lg hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
            >
              {t('landing.freeTier.cta')}
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="mt-6 text-slate-400 text-sm">
              {t('landing.freeTier.upgradeHint')}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
