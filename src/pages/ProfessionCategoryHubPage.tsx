import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Loader2 } from 'lucide-react';
import {
  getAllProfessions,
  getSpanishProfessionSlug,
  inferProfessionCategory,
} from '@/data/professions';
import {
  isProfessionCategoryHubId,
  PROFESSION_CATEGORY_HUB_COPY,
} from '@/data/professions/categoryHubMeta';
import type { ProfessionCategoryId } from '@/data/professions/types';
import {
  BASE_URL,
  buildCanonicalUrl,
  generateBreadcrumbSchema,
  generateProfessionCategoryHubCollectionSchema,
} from '@/utils/seoConfig';

export function ProfessionCategoryHubPage() {
  const { categoryId: rawId } = useParams<{ categoryId: string }>();
  const { i18n } = useTranslation();
  const lng: 'en' | 'es' = i18n.language === 'es' ? 'es' : 'en';

  const [loading, setLoading] = useState(true);
  const [professions, setProfessions] = useState<Awaited<ReturnType<typeof getAllProfessions>>>([]);

  const categoryId = rawId as ProfessionCategoryId | undefined;
  const valid = Boolean(rawId && isProfessionCategoryHubId(rawId));

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const all = await getAllProfessions();
      if (!cancelled) {
        setProfessions(all);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const copy = valid && categoryId ? PROFESSION_CATEGORY_HUB_COPY[categoryId] : null;

  const rows = useMemo(() => {
    if (!valid || !categoryId) return [];
    return professions
      .filter((p) => inferProfessionCategory(p) === categoryId)
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [professions, categoryId, valid]);

  const canonicalUrl = valid && rawId ? buildCanonicalUrl(`/resumes/${rawId}`) : BASE_URL;

  const structuredItems = useMemo(() => {
    return rows.map((p) => {
      const slug = lng === 'es' ? getSpanishProfessionSlug(p.slug) || p.slug : p.slug;
      return {
        name: p.title,
        url: buildCanonicalUrl(`/resume/${slug}`),
      };
    });
  }, [rows, lng]);

  const pageTitle = copy ? copy.pageTitle[lng] : 'GetQuickResume';
  const metaDescription = copy ? copy.metaDescription[lng] : '';
  const intro = copy ? copy.intro[lng] : '';
  const hubLabel = copy ? copy.label[lng] : '';

  const breadcrumbs = [
    { name: lng === 'es' ? 'Inicio' : 'Home', url: BASE_URL },
    { name: lng === 'es' ? 'Plantillas' : 'Templates', url: `${BASE_URL}/create` },
    { name: hubLabel, url: canonicalUrl },
  ];

  const ldCollection =
    valid && rawId && copy
      ? generateProfessionCategoryHubCollectionSchema(rawId, lng, pageTitle, metaDescription, structuredItems)
      : null;

  if (!valid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{lng === 'es' ? 'No encontrado' : 'Not found'}</h1>
        <Link to="/create" className="text-blue-600 hover:underline">
          {lng === 'es' ? 'Ver plantillas' : 'Browse templates'}
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(generateBreadcrumbSchema(breadcrumbs))}</script>
        {ldCollection && (
          <script type="application/ld+json">{JSON.stringify(ldCollection)}</script>
        )}
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors">
                {lng === 'es' ? 'Inicio' : 'Home'}
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li>
              <Link to="/create" className="hover:text-blue-600 transition-colors">
                {lng === 'es' ? 'Plantillas' : 'Templates'}
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li className="text-gray-900 font-medium">{hubLabel}</li>
          </ol>
        </nav>

        <main>
        <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">{hubLabel}</h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">{intro}</p>
          <p className="mt-2 text-sm text-gray-500">
            {lng === 'es'
              ? `${rows.length} guías de currículum en esta categoría.`
              : `${rows.length} resume guides in this category.`}
          </p>
        </header>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16" aria-labelledby="hub-grid-heading">
          <h2 id="hub-grid-heading" className="sr-only">
            {lng === 'es' ? 'Lista de profesiones' : 'Profession list'}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {rows.map((p) => {
              const hrefSlug = lng === 'es' ? getSpanishProfessionSlug(p.slug) || p.slug : p.slug;
              return (
                <li key={p.slug}>
                  <Link
                    to={`/resume/${hrefSlug}`}
                    className="block rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 font-medium hover:border-blue-300 hover:bg-blue-50/40 transition-colors"
                  >
                    {p.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
        </main>
      </div>
    </>
  );
}
