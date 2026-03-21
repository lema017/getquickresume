import { Link } from 'react-router-dom';
import {
  Sparkles,
  Target,
  ListChecks,
  Wrench,
  AlertTriangle,
  Award,
  Quote,
  Briefcase,
  Link2,
} from 'lucide-react';
import type { ProfessionContentBody } from '@/data/professions/types';

export interface ProfessionSeoSectionsProps {
  title: string;
  content: ProfessionContentBody;
  lng: 'en' | 'es';
  /** Localized skill slug for linking from skill name */
  getSkillHref: (skillTitle: string) => string | null;
  relatedProfessions: Array<{ slug: string; title: string }>;
  summaryExample: string;
  experienceExamples: Array<{ title: string; company: string; bullets: string[] }>;
}

const copy = {
  en: {
    overview: 'Role overview',
    responsibilities: (t: string) => `Top responsibilities for ${t}`,
    tools: 'Tools & stack signals',
    skillsContext: (t: string) => `Best skills for ${t} resumes (in context)`,
    ats: (t: string) => `ATS keywords for ${t}`,
    mistakes: (t: string) => `Common resume mistakes for ${t}`,
    certs: (t: string) => `Certifications for ${t}`,
    summaryEx: 'Professional summary example',
    expEx: 'Work experience examples',
    bullets: 'Suggested achievement bullets',
    related: 'Related resume guides',
  },
  es: {
    overview: 'Resumen del rol',
    responsibilities: (t: string) => `Responsabilidades clave para ${t}`,
    tools: 'Herramientas y stack',
    skillsContext: (t: string) => `Mejores habilidades para CV de ${t} (en contexto)`,
    ats: (t: string) => `Palabras clave ATS para ${t}`,
    mistakes: (t: string) => `Errores frecuentes en el CV de ${t}`,
    certs: (t: string) => `Certificaciones para ${t}`,
    summaryEx: 'Ejemplo de resumen profesional',
    expEx: 'Ejemplos de experiencia laboral',
    bullets: 'Logros sugeridos (viñetas)',
    related: 'Guías de CV relacionadas',
  },
};

export function ProfessionSeoSections({
  title,
  content,
  lng,
  getSkillHref,
  relatedProfessions,
  summaryExample,
  experienceExamples,
}: ProfessionSeoSectionsProps) {
  const c = copy[lng];

  return (
    <>
      <section className="py-10 border-t border-gray-200" aria-labelledby="prof-overview-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 id="prof-overview-heading" className="text-2xl font-bold text-gray-900 mb-4">
            {c.overview}
          </h2>
          <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">{content.overview}</p>
        </div>
      </section>

      <section className="py-10 bg-white" aria-labelledby="prof-resp-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <ListChecks className="w-6 h-6 text-blue-600" />
            <h2 id="prof-resp-heading" className="text-2xl font-bold text-gray-900">
              {c.responsibilities(title)}
            </h2>
          </div>
          <ul className="space-y-3 list-disc pl-5 text-gray-700">
            {content.responsibilities.map((line) => (
              <li key={line.slice(0, 80)}>{line}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-10" aria-labelledby="prof-tools-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <Wrench className="w-6 h-6 text-amber-600" />
            <h2 id="prof-tools-heading" className="text-2xl font-bold text-gray-900">
              {c.tools}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {content.tools.map((tool) => (
              <span
                key={tool}
                className="inline-flex px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-white" aria-labelledby="prof-skills-ctx-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h2 id="prof-skills-ctx-heading" className="text-2xl font-bold text-gray-900">
              {c.skillsContext(title)}
            </h2>
          </div>
          <ul className="space-y-4">
            {content.skillsInContext.map(({ name, context }) => {
              const href = getSkillHref(name);
              return (
                <li key={name} className="border border-gray-100 rounded-xl p-4 bg-slate-50/80">
                  {href ? (
                    <Link to={href} className="font-semibold text-blue-700 hover:underline">
                      {name}
                    </Link>
                  ) : (
                    <span className="font-semibold text-gray-900">{name}</span>
                  )}
                  <p className="mt-1 text-gray-600 text-sm leading-relaxed">{context}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="py-10" aria-labelledby="prof-ats-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-green-600" />
            <h2 id="prof-ats-heading" className="text-2xl font-bold text-gray-900">
              {c.ats(title)}
            </h2>
          </div>
          <div className="space-y-3">
            {content.atsKeywords.map(({ term, hint }) => (
              <div
                key={term}
                className="rounded-xl border border-green-100 bg-green-50/60 px-4 py-3"
              >
                <span className="font-semibold text-green-900">{term}</span>
                {hint ? <p className="mt-1 text-sm text-green-900/80">{hint}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-white" aria-labelledby="prof-mistakes-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            <h2 id="prof-mistakes-heading" className="text-2xl font-bold text-gray-900">
              {c.mistakes(title)}
            </h2>
          </div>
          <ul className="space-y-2 list-disc pl-5 text-gray-700">
            {content.resumeMistakes.map((m) => (
              <li key={m.slice(0, 60)}>{m}</li>
            ))}
          </ul>
        </div>
      </section>

      {content.certifications.length > 0 && (
        <section className="py-10" aria-labelledby="prof-cert-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-violet-600" />
              <h2 id="prof-cert-heading" className="text-2xl font-bold text-gray-900">
                {c.certs(title)}
              </h2>
            </div>
            <ul className="space-y-3">
              {content.certifications.map((cert) => (
                <li key={cert.name} className="rounded-xl border border-violet-100 bg-violet-50/50 px-4 py-3">
                  <span className="font-semibold text-violet-900">{cert.name}</span>
                  {cert.note ? <p className="text-sm text-violet-900/80 mt-1">{cert.note}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="py-10 bg-white" aria-labelledby="prof-sum-ex-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <Quote className="w-6 h-6 text-gray-700" />
            <h2 id="prof-sum-ex-heading" className="text-2xl font-bold text-gray-900">
              {c.summaryEx}
            </h2>
          </div>
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 leading-relaxed">
            {summaryExample}
          </blockquote>
        </div>
      </section>

      <section className="py-10" aria-labelledby="prof-exp-ex-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-gray-700" />
            <h2 id="prof-exp-ex-heading" className="text-2xl font-bold text-gray-900">
              {c.expEx}
            </h2>
          </div>
          <div className="space-y-8">
            {experienceExamples.map((ex) => (
              <div key={`${ex.company}-${ex.title}`} className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">
                  {ex.title}
                  <span className="text-gray-500 font-normal"> — {ex.company}</span>
                </h3>
                <ul className="mt-3 space-y-2 list-disc pl-5 text-gray-700 text-sm">
                  {ex.bullets.map((b) => (
                    <li key={b.slice(0, 72)}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-white" aria-labelledby="prof-sugg-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 id="prof-sugg-heading" className="text-2xl font-bold text-gray-900 mb-6">
            {c.bullets}
          </h2>
          <ul className="space-y-2 list-disc pl-5 text-gray-700">
            {content.suggestedBullets.map((b) => (
              <li key={b.slice(0, 80)}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      {relatedProfessions.length > 0 && (
        <section className="py-10" aria-labelledby="prof-related-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <Link2 className="w-6 h-6 text-blue-600" />
              <h2 id="prof-related-heading" className="text-2xl font-bold text-gray-900">
                {c.related}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {relatedProfessions.map((p) => (
                <Link
                  key={p.slug}
                  to={`/resume/${p.slug}`}
                  className="px-4 py-3 rounded-xl border border-gray-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 text-blue-800 font-medium text-sm transition-colors"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
