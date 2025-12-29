import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getArticleBySlug, SupportedLanguage } from '@/data/articles';

// English articles
import { HowToMakeGoodResume } from './articles/HowToMakeGoodResume';
import { WhatIsATS } from './articles/WhatIsATS';

// Spanish articles
import { HowToMakeGoodResumeES } from './articles/HowToMakeGoodResume.es';
import { WhatIsATSES } from './articles/WhatIsATS.es';

// Article component map
const articleComponents: Record<SupportedLanguage, Record<string, React.ComponentType>> = {
  en: {
    'how-to-make-good-resume': HowToMakeGoodResume,
    'what-is-ats-system': WhatIsATS,
  },
  es: {
    'how-to-make-good-resume': HowToMakeGoodResumeES,
    'what-is-ats-system': WhatIsATSES,
  },
};

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  
  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  // Get current language, fallback to 'en'
  const currentLang = (i18n.language === 'es' ? 'es' : 'en') as SupportedLanguage;
  
  // Check if article exists in current language
  const article = getArticleBySlug(slug, currentLang);
  
  if (!article) {
    // Article not found, redirect to blog
    return <Navigate to="/blog" replace />;
  }

  // Get the component for this article and language
  const ArticleComponent = articleComponents[currentLang]?.[slug] || articleComponents.en?.[slug];

  if (!ArticleComponent) {
    // Component not found, redirect to blog
    return <Navigate to="/blog" replace />;
  }

  return <ArticleComponent />;
}

