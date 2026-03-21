import { ListChecks, AlertTriangle, Target } from 'lucide-react';
import type { SkillContentBody } from '@/data/skills/types';

const copy = {
  en: {
    overview: 'Skill playbook overview',
    howTo: 'How to show this skill on your resume',
    mistakes: 'Common resume mistakes',
    bullets: 'Resume bullet examples (expanded)',
    ats: 'ATS keywords (with context)',
  },
  es: {
    overview: 'Resumen de la habilidad',
    howTo: 'Cómo mostrar esta habilidad en el CV',
    mistakes: 'Errores frecuentes en el CV',
    bullets: 'Ejemplos de viñetas ampliados',
    ats: 'Palabras clave ATS (con contexto)',
  },
};

export function SkillSeoSections({ content, lng }: { content: SkillContentBody; lng: 'en' | 'es' }) {
  const c = copy[lng];
  return (
    <>
      <section className="py-12 border-t border-gray-200" aria-labelledby="sk-overview">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 id="sk-overview" className="text-2xl font-bold text-gray-900 mb-4">
            {c.overview}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{content.overview}</p>
        </div>
      </section>

      <section className="py-12 bg-white" aria-labelledby="sk-howto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <ListChecks className="w-6 h-6 text-blue-600" />
            <h2 id="sk-howto" className="text-2xl font-bold text-gray-900">
              {c.howTo}
            </h2>
          </div>
          <ul className="space-y-3 list-disc pl-5 text-gray-700">
            {content.howToShowOnResume.map((line) => (
              <li key={line.slice(0, 72)}>{line}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12" aria-labelledby="sk-mistakes">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            <h2 id="sk-mistakes" className="text-2xl font-bold text-gray-900">
              {c.mistakes}
            </h2>
          </div>
          <ul className="space-y-2 list-disc pl-5 text-gray-700">
            {content.commonMistakes.map((m) => (
              <li key={m.slice(0, 60)}>{m}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 bg-white" aria-labelledby="sk-bullets">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 id="sk-bullets" className="text-2xl font-bold text-gray-900 mb-6">
            {c.bullets}
          </h2>
          <div className="space-y-3">
            {content.expandedExampleBullets.map((bullet, i) => (
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

      <section className="py-12" aria-labelledby="sk-ats">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-green-600" />
            <h2 id="sk-ats" className="text-2xl font-bold text-gray-900">
              {c.ats}
            </h2>
          </div>
          <div className="space-y-3">
            {content.atsKeywords.map(({ term, hint }) => (
              <div key={term} className="rounded-xl border border-green-100 bg-green-50/60 px-4 py-3">
                <span className="font-semibold text-green-900">{term}</span>
                {hint ? <p className="mt-1 text-sm text-green-900/80">{hint}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
