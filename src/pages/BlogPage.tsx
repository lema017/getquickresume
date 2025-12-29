import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { articles } from '@/data/articles';
import { getPageSEO, generateBreadcrumbSchema, BASE_URL } from '@/utils/seoConfig';

export function BlogPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'es';
  const seo = getPageSEO('blog', lang);
  
  // Get articles for the current language
  const currentArticles = articles[lang] || articles.en;
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: BASE_URL },
    { name: 'Blog', url: `${BASE_URL}/blog` },
  ]);

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={`${BASE_URL}/blog`} />
        
        {/* hreflang */}
        <link rel="alternate" hreflang="en" href={`${BASE_URL}/blog`} />
        <link rel="alternate" hreflang="es" href={`${BASE_URL}/blog?lang=es`} />
        <link rel="alternate" hreflang="x-default" href={`${BASE_URL}/blog`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={`${BASE_URL}/blog`} />
        <meta property="og:site_name" content="GetQuickResume" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        
        {/* Structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": lang === 'es' ? "Blog de GetQuickResume" : "GetQuickResume Blog",
            "description": seo.description,
            "url": `${BASE_URL}/blog`,
            "inLanguage": lang,
            "publisher": {
              "@type": "Organization",
              "name": "GetQuickResume",
              "logo": {
                "@type": "ImageObject",
                "url": `${BASE_URL}/favicon.svg`
              }
            },
            "blogPost": currentArticles.map(article => ({
              "@type": "BlogPosting",
              "headline": article.title,
              "description": article.excerpt,
              "datePublished": article.publishDate,
              "url": `${BASE_URL}/blog/${article.slug}`,
              "image": article.imageUrl ? `${BASE_URL}${article.imageUrl}` : undefined
            }))
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-16 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <BookOpen className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-medium text-blue-100">
                {lang === 'es' ? 'Recursos de Carrera' : 'Career Resources'}
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
              {lang === 'es' ? 'Consejos de CV y Carrera' : 'Resume Tips & Career Advice'}
            </h1>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {lang === 'es' 
                ? 'Consejos expertos para crear currículums ganadores, navegar búsquedas de empleo y acelerar tu crecimiento profesional.'
                : 'Expert insights to help you create winning resumes, navigate job searches, and accelerate your career growth.'
              }
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            {currentArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {/* Coming Soon Note */}
          {currentArticles.length < 3 && (
            <div className="mt-12 text-center">
              <p className="text-gray-500">
                {lang === 'es' 
                  ? '¡Más artículos próximamente! Síguenos en redes sociales para actualizaciones.'
                  : 'More articles coming soon! Follow us on social media for updates.'
                }
              </p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12">
              {/* Background decoration */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span className="text-sm font-medium text-white">AI-Powered</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {lang === 'es' ? '¿Listo para Crear tu CV?' : 'Ready to Create Your Resume?'}
                  </h2>
                  
                  <p className="text-blue-100 text-lg max-w-xl">
                    {lang === 'es' 
                      ? 'Pon estos consejos en acción con GetQuickResume. Nuestra IA te ayuda a crear un currículum profesional y optimizado para ATS en minutos.'
                      : 'Put these tips into action with GetQuickResume. Our AI helps you build a professional, ATS-optimized resume in minutes.'
                    }
                  </p>
                </div>
                
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 whitespace-nowrap"
                >
                  {lang === 'es' ? 'Comenzar Gratis' : 'Start Free - No Credit Card'}
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

