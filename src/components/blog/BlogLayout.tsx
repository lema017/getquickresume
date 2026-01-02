import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Clock, Calendar, FileText } from 'lucide-react';
import { ShareButtons } from './ShareButtons';
import { AuthorBio } from './AuthorBio';
import { ArticleCTA } from './ArticleCTA';
import { ArticleCard, ArticleMeta } from './ArticleCard';
import { generateBreadcrumbSchema, generateArticleSchema, BASE_URL } from '@/utils/seoConfig';

interface BlogLayoutProps {
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  publishDate: string;
  imageUrl?: string;
  children: ReactNode;
  relatedArticles?: ArticleMeta[];
  // Optional HowTo schema data for tutorial articles
  howToSteps?: { name: string; text: string }[];
}

export function BlogLayout({
  title,
  excerpt,
  category,
  readTime,
  publishDate,
  imageUrl,
  children,
  relatedArticles = [],
  howToSteps
}: BlogLayoutProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'es';
  
  const formattedDate = new Date(publishDate).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const canonicalUrl = typeof window !== 'undefined' ? window.location.href.split('?')[0] : '';
  const slug = canonicalUrl.split('/').pop() || '';
  const absoluteImageUrl = imageUrl ? `${BASE_URL}${imageUrl}` : undefined;
  
  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: BASE_URL },
    { name: 'Blog', url: `${BASE_URL}/blog` },
    { name: title, url: canonicalUrl },
  ]);
  
  // Generate article schema
  const articleSchema = generateArticleSchema(title, excerpt, publishDate, publishDate, imageUrl) as Record<string, unknown>;
  articleSchema.mainEntityOfPage = { "@type": "WebPage", "@id": canonicalUrl };
  
  // Generate HowTo schema if steps are provided
  const howToSchema = howToSteps ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": excerpt,
    "totalTime": `PT${readTime}M`,
    "step": howToSteps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
    })),
  } : null;

  return (
    <>
      <Helmet>
        <title>{title} | GetQuickResume Blog</title>
        <meta name="description" content={excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* hreflang */}
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/blog/${slug}`} />
        <link rel="alternate" hrefLang="es" href={`${BASE_URL}/blog/${slug}?lang=es`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/blog/${slug}`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="GetQuickResume" />
        <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
        {absoluteImageUrl && <meta property="og:image" content={absoluteImageUrl} />}
        <meta property="article:published_time" content={publishDate} />
        <meta property="article:author" content="GetQuickResume Team" />
        <meta property="article:section" content={category} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={excerpt} />
        {absoluteImageUrl && <meta name="twitter:image" content={absoluteImageUrl} />}
        
        {/* Breadcrumb structured data */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        
        {/* Article structured data */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        
        {/* HowTo structured data (if applicable) */}
        {howToSchema && (
          <script type="application/ld+json">
            {JSON.stringify(howToSchema)}
          </script>
        )}
      </Helmet>

      <article className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-600" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-blue-600 transition-colors">
                {lang === 'es' ? 'Inicio' : 'Home'}
              </Link>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <span className="text-gray-900 font-medium truncate max-w-[200px]">{title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="max-w-5xl mx-auto">
            <div className="aspect-[21/9] relative">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <FileText className="w-16 h-16 mb-3" />
                  <span className="text-lg">
                    {lang === 'es' ? 'Imagen destacada próximamente' : 'Featured image coming soon'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <span className="px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
              {category}
            </span>
            <ShareButtons title={title} />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>

          <div className="flex items-center gap-4 text-gray-600 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">GQ</span>
              </div>
              <span className="font-medium">GetQuickResume Team</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readTime} {lang === 'es' ? 'min de lectura' : 'min read'}</span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <div className="prose prose-lg prose-blue max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200
            prose-h3:text-lg prose-h3:md:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-800
            prose-h4:text-base prose-h4:font-semibold prose-h4:text-gray-800 prose-h4:mt-6 prose-h4:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base prose-p:md:text-lg
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-ul:my-6 prose-ul:space-y-2
            prose-li:text-gray-700 prose-li:text-base prose-li:md:text-lg prose-li:leading-relaxed
            prose-blockquote:border-l-4 prose-blockquote:border-l-blue-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-blue-50 prose-blockquote:to-indigo-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:shadow-sm
            prose-em:text-gray-600
          ">
            {children}
          </div>

          {/* Footer CTA */}
          <ArticleCTA variant="banner" />

          {/* Author Bio */}
          <AuthorBio />

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 pt-12 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {lang === 'es' ? 'Artículos Relacionados' : 'Related Articles'}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}

