import { Link } from 'react-router-dom';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { ArticleCTA } from '@/components/blog/ArticleCTA';
import { SectionDivider } from '@/components/blog/SectionDivider';
import { StepHeading } from '@/components/blog/StepHeading';
import { getArticleBySlug, getRelatedArticles } from '@/data/articles';
import { Globe, Search, AlertTriangle, Brain, MessageSquare, Sparkles, HelpCircle } from 'lucide-react';

export function BestResumeTranslator() {
  const article = getArticleBySlug('best-resume-translators', 'en');
  const title = article?.title || "Best Resume Translators in 2026: 8 Tools Compared";
  const excerpt = article?.excerpt || "A practical, side-by-side look at the best resume translation tools for applying abroad — with honest pros/cons, formatting notes, and when to choose AI vs human review.";
  const category = article?.category || "Career Advice";
  const readTime = article?.readTime || 14;
  const publishDate = article?.publishDate || "2026-02-17";
  const imageUrl = article?.imageUrl;

  const relatedArticles = article ? getRelatedArticles(article.slug, 'en') : [];

  return (
    <BlogLayout
      title={title}
      excerpt={excerpt}
      category={category}
      readTime={readTime}
      publishDate={publishDate}
      imageUrl={imageUrl}
      relatedArticles={relatedArticles}
    >
      {/* Introduction */}
      <p className="text-xl text-gray-600 leading-relaxed">
        One awkward translation can quietly tank an otherwise strong resume. If a hiring manager in Berlin reads a line that sounds unclear, overly casual, or simply “off,” you don’t get a chance to explain — you just don’t get the callback.
      </p>

      <p>
        The global job market is wide open right now. Between remote-first teams, cross-border recruiting, and talent shortages in parts of Europe and Asia-Pacific, it’s normal to apply outside your home country — sometimes to companies you’ll never visit in person. The catch: many employers still expect your resume (or CV) in their language, or at least in polished, locally appropriate English.
      </p>

      <p>
        Here’s the mistake most people make: they translate a resume the same way they’d translate a restaurant menu. A resume is closer to a sales pitch. It’s dense with role-specific terms, achievements, and subtle signals about seniority. A literal translation might be “correct,” but still sound unprofessional, vague, or culturally mismatched — which is exactly what recruiters react to.
      </p>

      <p>
        That’s why the tool you choose matters. Below, you’ll find the best resume translation tools in 2026 — including AI-native options built for job seekers and general translators that work well for quick drafts. I’ll show you what each one is good at, where it falls short, and which one to pick depending on your timeline and the stakes of the role.
      </p>

      <p>
        If you simply need to <Link to="/resume-translator" className="text-blue-600 hover:underline">translate your resume instantly</Link> and get a clean version you can review, that’s a solid starting point — especially when you’re applying across time zones and deadlines are tight.
      </p>

      {/* Comparison Table */}
      <div className="my-10 not-prose overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <th className="px-4 py-3 text-left font-semibold">Tool</th>
              <th className="px-4 py-3 text-left font-semibold">Best For</th>
              <th className="px-4 py-3 text-center font-semibold">AI-Powered</th>
              <th className="px-4 py-3 text-center font-semibold">Keeps Formatting</th>
              <th className="px-4 py-3 text-center font-semibold">Languages</th>
              <th className="px-4 py-3 text-center font-semibold">Free Option</th>
              <th className="px-4 py-3 text-left font-semibold">Starting Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="bg-blue-50/50">
              <td className="px-4 py-3 font-medium text-gray-900">GetQuickResume</td>
              <td className="px-4 py-3 text-gray-700">AI-native resume translation</td>
              <td className="px-4 py-3 text-center text-green-600">&#10003;</td>
              <td className="px-4 py-3 text-center text-green-600">&#10003;</td>
              <td className="px-4 py-3 text-center text-gray-700">30+</td>
              <td className="px-4 py-3 text-center text-green-600">&#10003;</td>
              <td className="px-4 py-3 text-gray-700">Free / $15/mo</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-gray-900">DeepL</td>
              <td className="px-4 py-3 text-gray-700">High-accuracy European languages</td>
              <td className="px-4 py-3 text-center text-green-600">&#10003;</td>
              <td className="px-4 py-3 text-center text-yellow-500">Partial</td>
              <td className="px-4 py-3 text-center text-gray-700">33</td>
              <td className="px-4 py-3 text-center text-green-600">&#10003;</td>
              <td className="px-4 py-3 text-gray-700">Free / $8.74/mo</td>
            </tr>
            <tr className="bg-gray-50/50">
              <td className="px-4 py-3 font-medium text-gray-900">Google Translate</td>
              <td className="px-4 py-3 text-gray-700">Quick drafts, broad language coverage</td>
              <td className="px-4 py-3 text-center text-green-600">&#10003;</td>
              <td className="px-4 py-3 text-center text-red-500">&#10007;</td>
              <td className="px-4 py-3 text-center text-gray-700">130+</td>
              <td className="px-4 py-3 text-center text-green-600">&#10003;</td>
              <td className="px-4 py-3 text-gray-700">Free</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-gray-900">Reverso</td>
              <td className="px-4 py-3 text-gray-700">Context-aware phrase translation</td>
              <td className="px-4 py-3 text-center text-green-600">&#10003;</td>
              <td className="px-4 py-3 text-center text-red-500">&#10007;</td>
              <td className="px-4 py-3 text-center text-gray-700">18</td>
              <td className="px-4 py-3 text-center text-green-600">&#10003;</td>
              <td className="px-4 py-3 text-gray-700">Free / $6.49/mo</td>
            </tr>
            <tr className="bg-gray-50/50">
              <td className="px-4 py-3 font-medium text-gray-900">Translated.net</td>
              <td className="px-4 py-3 text-gray-700">Professional human translation</td>
              <td className="px-4 py-3 text-center text-yellow-500">Hybrid</td>
              <td className="px-4 py-3 text-center text-green-600">&#10003;</td>
              <td className="px-4 py-3 text-center text-gray-700">200+</td>
              <td className="px-4 py-3 text-center text-red-500">&#10007;</td>
              <td className="px-4 py-3 text-gray-700">$0.10/word</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-gray-900">Smartcat</td>
              <td className="px-4 py-3 text-gray-700">Enterprise & team workflows</td>
              <td className="px-4 py-3 text-center text-green-600">&#10003;</td>
              <td className="px-4 py-3 text-center text-green-600">&#10003;</td>
              <td className="px-4 py-3 text-center text-gray-700">280+</td>
              <td className="px-4 py-3 text-center text-green-600">&#10003;</td>
              <td className="px-4 py-3 text-gray-700">Free / $120/mo</td>
            </tr>
            <tr className="bg-gray-50/50">
              <td className="px-4 py-3 font-medium text-gray-900">MateCat</td>
              <td className="px-4 py-3 text-gray-700">Open-source, budget-friendly</td>
              <td className="px-4 py-3 text-center text-green-600">&#10003;</td>
              <td className="px-4 py-3 text-center text-green-600">&#10003;</td>
              <td className="px-4 py-3 text-center text-gray-700">230+</td>
              <td className="px-4 py-3 text-center text-green-600">&#10003;</td>
              <td className="px-4 py-3 text-gray-700">Free</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-gray-900">Gengo</td>
              <td className="px-4 py-3 text-gray-700">Premium human translation</td>
              <td className="px-4 py-3 text-center text-red-500">&#10007;</td>
              <td className="px-4 py-3 text-center text-green-600">&#10003;</td>
              <td className="px-4 py-3 text-center text-gray-700">70+</td>
              <td className="px-4 py-3 text-center text-red-500">&#10007;</td>
              <td className="px-4 py-3 text-gray-700">$0.06/word</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionDivider icon={Globe}>Best Resume Translators in 2026</SectionDivider>

      <p>
        The tools below were evaluated on three practical things that matter in real applications: how natural the translation reads, whether your structure stays intact (headings, bullets, spacing), and whether the tool handles resume language well (job titles, skills, and common business phrasing).
      </p>

      {/* Tool 1: GetQuickResume */}
      <StepHeading step={1}>GetQuickResume Resume Translator</StepHeading>

      <div className="my-6 not-prose">
        <figure className="m-0">
          <img
            src="/images/blog/tools/getquickresume-translator-page.png"
            alt="GetQuickResume free AI resume translator with upload and language selection"
            className="w-full h-auto rounded-xl border border-gray-200 shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="mt-2 text-center text-sm text-gray-500">
            Upload or paste your resume and translate it instantly
          </figcaption>
        </figure>
      </div>

      <p>
        GetQuickResume is a resume platform with a translation flow designed for job seekers, not for generic documents. That matters because a resume isn’t just sentences — it’s sections, bullets, and signal words (like “Led,” “Owned,” “Delivered”) that need to sound right in the target language.
      </p>

      <p>
        As an <Link to="/resume-translator" className="text-blue-600 hover:underline">AI resume translator</Link>, it’s meant to help you move fast without turning your resume into a clunky, overly literal document you’d never actually submit.
      </p>

      <p>
        <strong>Best for:</strong> People who want a fast, clean translation that keeps the resume’s structure and reads like a professional wrote it — without copying and reformatting.
      </p>

      <p><strong>Key features:</strong></p>
      <ul>
        <li>Translates resumes across 30+ languages while keeping section structure and bullets intact</li>
        <li>Handles common resume phrasing (titles, responsibilities, achievements) in a more natural register</li>
        <li>Keeps a clean, ATS-readable layout — you can sanity-check it with the <Link to="/ats-resume-checker" className="text-blue-600 hover:underline">ATS resume checker</Link></li>
        <li>Simple workflow: paste or upload, choose your language, and get a translated version in seconds</li>
      </ul>

      <div className="my-6 not-prose border-l-4 border-blue-600 bg-white border border-gray-200 shadow-sm rounded-r-xl overflow-hidden">
        <div className="p-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Strengths</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Resume-first experience (sections and bullets behave the way you’d expect)</li>
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Output stays clean and easy to skim</li>
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Translation is free (up to 3 per day)</li>
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Fast enough to use mid-application without derailing your day</li>
          </ul>
        </div>
        <div className="border-t border-gray-100 p-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Limitations</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> Translation is free, but add-ons like job tailoring, cover letters, and deeper scoring live in Premium</li>
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> Smaller footprint than legacy translators like DeepL</li>
          </ul>
        </div>
      </div>

      <p>
        <strong>Pricing:</strong> Resume translation is free (up to 3/day). Premium is $15/month and adds the broader toolkit (unlimited resumes, tailoring flows, cover letters, and more).
      </p>

      {/* Tool 2: DeepL */}
      <StepHeading step={2}>DeepL Translator</StepHeading>

      <div className="my-6 not-prose">
        <figure className="m-0">
          <img
            src="/images/blog/tools/deepl-translator.png"
            alt="DeepL translator showing a resume translated from English to German with editing tools"
            className="w-full h-auto rounded-xl border border-gray-200 shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="mt-2 text-center text-sm text-gray-500">
            DeepL translating a resume from English to German
          </figcaption>
        </figure>
      </div>

      <p>
        DeepL has earned its reputation for a reason. For many European language pairs, it produces translations that sound noticeably more natural than most “free” alternatives. It’s still a general translator — not a resume tool — but the raw language quality can be excellent.
      </p>

      <p>
        <strong>Best for:</strong> Applications in Europe (especially German/French/Dutch/Polish) where you want strong translation quality and you’re comfortable doing a quick human pass afterward.
      </p>

      <p><strong>Key features:</strong></p>
      <ul>
        <li>Consistently strong output for many European languages</li>
        <li>Document translation for common formats (often with partial formatting kept)</li>
        <li>Glossary support so key terms stay consistent</li>
        <li>Tone options in languages where formality matters</li>
      </ul>

      <div className="my-6 not-prose border-l-4 border-blue-600 bg-white border border-gray-200 shadow-sm rounded-r-xl overflow-hidden">
        <div className="p-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Strengths</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Very natural output for many European language pairs</li>
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Glossary helps keep job titles and key terms consistent</li>
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Free tier is generous enough for a couple of resume drafts</li>
          </ul>
        </div>
        <div className="border-t border-gray-100 p-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Limitations</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> Not resume-specific — it won’t guide structure or conventions</li>
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> Complex layouts can still break on upload</li>
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> Coverage is narrower than Google Translate for some regions</li>
          </ul>
        </div>
      </div>

      <p>
        <strong>Pricing:</strong> Free tier available. DeepL Pro starts at $8.74/month.
      </p>

      {/* Tool 3: Google Translate */}
      <StepHeading step={3}>Google Translate</StepHeading>

      <div className="my-6 not-prose">
        <figure className="m-0">
          <img
            src="/images/blog/tools/google-translate.png"
            alt="Google Translate document translation with a resume PDF uploaded for Spanish to German translation"
            className="w-full h-auto rounded-xl border border-gray-200 shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="mt-2 text-center text-sm text-gray-500">
            Google Translate document mode with a resume PDF
          </figcaption>
        </figure>
      </div>

      <p>
        Google Translate is still the fastest way to get a rough translation in almost any language. It’s improved a lot — but it’s also the most likely to produce “technically correct” phrasing that doesn’t sound like a real professional would write.
      </p>

      <p>
        <strong>Best for:</strong> Fast first drafts, or translating into languages that other tools don’t support well.
      </p>

      <p><strong>Key features:</strong></p>
      <ul>
        <li>Massive language coverage (130+)</li>
        <li>Instant translation on web and mobile</li>
        <li>Document translation for common formats</li>
        <li>Good enough to get you “unstuck” when you need a baseline</li>
      </ul>

      <div className="my-6 not-prose border-l-4 border-blue-600 bg-white border border-gray-200 shadow-sm rounded-r-xl overflow-hidden">
        <div className="p-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Strengths</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Free and instantly accessible</li>
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> The broadest language coverage you’ll find</li>
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Convenient if you already live in Google Docs</li>
          </ul>
        </div>
        <div className="border-t border-gray-100 p-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Limitations</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> Awkward phrasing is common in professional writing</li>
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> Formatting often breaks — you may end up rebuilding the resume</li>
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> Not tuned for resume tone (it won’t “sound like a CV” by default)</li>
          </ul>
        </div>
      </div>

      <p>
        <strong>Pricing:</strong> Completely free for personal use.
      </p>

      {/* Tool 4: Reverso */}
      <StepHeading step={4}>Reverso</StepHeading>

      <div className="my-6 not-prose">
        <figure className="m-0">
          <img
            src="/images/blog/tools/reverso.png"
            alt="Reverso document translation showing a resume translated from English to French with download and review options"
            className="w-full h-auto rounded-xl border border-gray-200 shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="mt-2 text-center text-sm text-gray-500">
            Reverso translating a resume from English to French
          </figcaption>
        </figure>
      </div>

      <p>
        Reverso shines when you’re stuck on a specific phrase and you want to see how people actually translate it in the real world. Think of it less as a full resume translator and more as a “phrase debugger” for tricky bullets.
      </p>

      <p>
        <strong>Best for:</strong> Polishing a few important lines — especially achievements — where nuance matters.
      </p>

      <p><strong>Key features:</strong></p>
      <ul>
        <li>Context examples from bilingual sources (so you can sanity-check nuance)</li>
        <li>Alternative phrasing suggestions</li>
        <li>Helpful grammar signals for certain languages</li>
        <li>Handy for fixing “this doesn’t sound right” moments</li>
      </ul>

      <div className="my-6 not-prose border-l-4 border-blue-600 bg-white border border-gray-200 shadow-sm rounded-r-xl overflow-hidden">
        <div className="p-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Strengths</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Great for context and “what would a native say here?”</li>
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Example-driven approach is genuinely useful for resumes</li>
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Helpful for fine-tuning high-impact bullet points</li>
          </ul>
        </div>
        <div className="border-t border-gray-100 p-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Limitations</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> Not ideal for full-resume translation end-to-end</li>
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> Language list is limited compared to major engines</li>
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> No formatting preservation (it’s mostly text-level help)</li>
          </ul>
        </div>
      </div>

      <p>
        <strong>Pricing:</strong> Free basic access. Premium at $6.49/month removes ads and adds offline features.
      </p>

      {/* Tool 5: Translated.net */}
      <StepHeading step={5}>Translated.net (formerly MyGengo alternative)</StepHeading>

      <div className="my-6 not-prose">
        <figure className="m-0">
          <img
            src="/images/blog/tools/translated-net.png"
            alt="Translated.net homepage showing professional human translation services with instant quote option"
            className="w-full h-auto rounded-xl border border-gray-200 shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="mt-2 text-center text-sm text-gray-500">
            Translated.net: hybrid AI + human translation service
          </figcaption>
        </figure>
      </div>

      <p>
        Translated.net sits in the “high-stakes” category. The appeal is simple: you get the speed of machine translation plus a human editor who can make the final version read naturally — and avoid the little errors that can make you look sloppy.
      </p>

      <p>
        <strong>Best for:</strong> Senior roles, regulated industries, or situations where the resume will be closely scrutinized — and you’re willing to wait a day or two.
      </p>

      <p><strong>Key features:</strong></p>
      <ul>
        <li>Hybrid workflow (AI draft + human editing)</li>
        <li>Very broad language coverage</li>
        <li>Ability to match translators by domain</li>
        <li>Formatting support for uploaded documents</li>
      </ul>

      <div className="my-6 not-prose border-l-4 border-blue-600 bg-white border border-gray-200 shadow-sm rounded-r-xl overflow-hidden">
        <div className="p-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Strengths</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Human eyes on the final output</li>
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Better handling of nuance and professional register</li>
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> A safer choice for high-visibility applications</li>
          </ul>
        </div>
        <div className="border-t border-gray-100 p-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Limitations</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> Cost adds up quickly for multi-page resumes</li>
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> Not instant (expect 24–48 hours)</li>
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> Not a “try it free” experience</li>
          </ul>
        </div>
      </div>

      <p>
        <strong>Pricing:</strong> Starting at $0.10 per word. A typical one-page resume costs $30–$60.
      </p>

      {/* Tool 6: Smartcat */}
      <StepHeading step={6}>Smartcat</StepHeading>

      <div className="my-6 not-prose">
        <figure className="m-0">
          <img
            src="/images/blog/tools/smartcat.png"
            alt="Smartcat translation platform with file upload and language selection for document translation"
            className="w-full h-auto rounded-xl border border-gray-200 shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="mt-2 text-center text-sm text-gray-500">
            Smartcat: enterprise translation platform with file upload
          </figcaption>
        </figure>
      </div>

      <p>
        Smartcat is a translation management platform — the kind companies use when they’re translating lots of content across teams. For a single resume it can feel like bringing a power drill to hang one picture frame. But if you’re working across multiple markets (or collaborating with a translator), the workflow features are real.
      </p>

      <p>
        <strong>Best for:</strong> People who need a repeatable workflow for multiple documents or multiple target languages — especially with collaboration.
      </p>

      <p><strong>Key features:</strong></p>
      <ul>
        <li>Translation memory to reuse phrasing across versions</li>
        <li>Glossaries and consistency checks</li>
        <li>Huge language coverage</li>
        <li>Team workflows (useful if you’re working with a translator)</li>
      </ul>

      <div className="my-6 not-prose border-l-4 border-blue-600 bg-white border border-gray-200 shadow-sm rounded-r-xl overflow-hidden">
        <div className="p-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Strengths</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Built for consistency across many translations</li>
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Great if you’re translating multiple documents or versions</li>
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Collaboration features are strong</li>
          </ul>
        </div>
        <div className="border-t border-gray-100 p-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Limitations</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> More complex than most job seekers need</li>
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> Pricing can be hard to justify for a one-off resume</li>
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> You’ll spend time learning the interface</li>
          </ul>
        </div>
      </div>

      <p>
        <strong>Pricing:</strong> Free for individuals with basic AI translation. Team plans start at $120/month.
      </p>

      {/* Tool 7: MateCat */}
      <StepHeading step={7}>MateCat</StepHeading>

      <div className="my-6 not-prose">
        <figure className="m-0">
          <img
            src="/images/blog/tools/matecat.png"
            alt="MateCat CAT tool homepage with project setup, language selection, and file format support"
            className="w-full h-auto rounded-xl border border-gray-200 shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="mt-2 text-center text-sm text-gray-500">
            MateCat: free open-source translation tool
          </figcaption>
        </figure>
      </div>

      <p>
        MateCat is a free, web-based translation tool with surprisingly solid document handling for the price (which is… $0). It’s not polished like a consumer app, but it’s useful when you need translation plus structure — and you’re willing to do a careful review.
      </p>

      <p>
        <strong>Best for:</strong> Budget-conscious candidates who want to translate a resume while keeping the basic document structure.
      </p>

      <p><strong>Key features:</strong></p>
      <ul>
        <li>Free, open-source-friendly tooling</li>
        <li>Document upload with formatting preserved in many cases</li>
        <li>Multiple translation engines behind the scenes</li>
        <li>Translation memory support</li>
      </ul>

      <div className="my-6 not-prose border-l-4 border-blue-600 bg-white border border-gray-200 shadow-sm rounded-r-xl overflow-hidden">
        <div className="p-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Strengths</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Free and practical for real documents</li>
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Formatting preservation is often better than expected</li>
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Multiple engines can improve results on tricky pairs</li>
          </ul>
        </div>
        <div className="border-t border-gray-100 p-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Limitations</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> Not resume-aware — you provide the judgment</li>
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> Needs careful human review</li>
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> UI feels utilitarian compared to modern apps</li>
          </ul>
        </div>
      </div>

      <p>
        <strong>Pricing:</strong> Free.
      </p>

      {/* Tool 8: Gengo */}
      <StepHeading step={8}>Gengo</StepHeading>

      <div className="my-6 not-prose">
        <figure className="m-0">
          <img
            src="/images/blog/tools/gengo.png"
            alt="Gengo by Lionbridge order page showing language selection and per-word pricing for human translation"
            className="w-full h-auto rounded-xl border border-gray-200 shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="mt-2 text-center text-sm text-gray-500">
            Gengo: professional human translation with per-word pricing
          </figcaption>
        </figure>
      </div>

      <p>
        Gengo is a human translation service (part of the Lionbridge ecosystem) where your text is translated by a professional — not a model. It’s the most “traditional” option on this list, and it’s also the easiest to justify when accuracy and polish matter more than speed.
      </p>

      <p>
        <strong>Best for:</strong> Formal applications, regulated industries, or situations where you want a professional to own the final wording.
      </p>

      <p><strong>Key features:</strong></p>
      <ul>
        <li>Human translation by vetted professionals</li>
        <li>Multiple quality tiers</li>
        <li>Good fit for high-importance documents</li>
        <li>Broad language coverage</li>
      </ul>

      <div className="my-6 not-prose border-l-4 border-blue-600 bg-white border border-gray-200 shadow-sm rounded-r-xl overflow-hidden">
        <div className="p-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Strengths</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> A human owns the translation — not “best effort” machine output</li>
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> Better for formal contexts where nuance matters</li>
            <li className="flex items-start gap-2"><span className="font-bold text-blue-600 mt-px">+</span> You can request domain-appropriate translation</li>
          </ul>
        </div>
        <div className="border-t border-gray-100 p-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Limitations</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> Cost is higher than AI tools (sometimes much higher)</li>
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> Turnaround can take days</li>
            <li className="flex items-start gap-2"><span className="font-bold text-gray-400 mt-px">–</span> No free tier</li>
          </ul>
        </div>
      </div>

      <p>
        <strong>Pricing:</strong> Standard quality starts at $0.06/word. Pro tier at $0.12/word. A one-page resume typically runs $20–$50.
      </p>

      {/* How to Choose */}
      <SectionDivider icon={Search}>How to Choose the Best Resume Translator</SectionDivider>

      <p>
        “Best” depends on your situation. Use the checklist below to pick quickly, then do a fast quality pass before you send anything.
      </p>

      <div className="my-6 not-prose bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="text-sm font-semibold text-gray-900">Quick decision checklist</h4>
            <span className="text-xs text-slate-500">2 minutes to choose the right tool</span>
          </div>
        </div>
        <div className="p-5">
          <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="mt-px text-slate-400">•</span> Do you need a fast draft (AI) or a polished final (human review)?</li>
            <li className="flex items-start gap-2"><span className="mt-px text-slate-400">•</span> Will the tool preserve bullets, headings, and spacing?</li>
            <li className="flex items-start gap-2"><span className="mt-px text-slate-400">•</span> Does it understand your role’s vocabulary (titles, tools, deliverables)?</li>
            <li className="flex items-start gap-2"><span className="mt-px text-slate-400">•</span> Are you applying in a regulated/senior context where wording matters more?</li>
            <li className="flex items-start gap-2"><span className="mt-px text-slate-400">•</span> Do you need localization (conventions) — not just translation?</li>
            <li className="flex items-start gap-2"><span className="mt-px text-slate-400">•</span> After translating, can you validate structure with an <Link to="/ats-resume-checker" className="text-blue-600 hover:underline">ATS check</Link>?</li>
          </ul>
        </div>
      </div>

      <h3>AI Translation vs. Traditional Translation</h3>

      <p>
        AI translation is usually the right starting point: it’s fast, cheap (often free), and good enough for many common language pairs. Human translation — or even just a human review pass — makes sense when the role is high-stakes and the wording needs to be flawless.
      </p>

      <div className="my-5 not-prose border border-gray-200 rounded-xl bg-white">
        <div className="p-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">What to check</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Does the translated text read like a professional wrote it (not like a textbook)?</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Do your achievements keep the same meaning and numbers?</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Are job titles translated appropriately (or kept in English when that’s standard)?</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">When it matters most</h4>
              <p className="text-sm text-slate-700">
                Senior roles, regulated industries, or applications where the resume will be read by multiple stakeholders.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3>Formatting Preservation</h3>

      <p>
        Plenty of tools translate the words correctly, then wreck your layout. If your resume becomes a wall of text, you lose hours rebuilding it — and small mistakes creep in.
      </p>

      <div className="my-5 not-prose border border-gray-200 rounded-xl bg-white">
        <div className="p-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">What to check</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Bullet points stay as bullets (not merged into paragraphs)</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Section headers remain clear (Experience, Skills, Education)</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Spacing and line breaks look consistent in the final output</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">When it matters most</h4>
              <p className="text-sm text-slate-700">
                If you’re applying quickly and don’t want translation to turn into a reformatting project.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3>Context Understanding</h3>

      <p>
        Resumes are full of context. A good translation tool won’t just swap words — it will preserve the meaning behind role-specific terms and common business phrasing.
      </p>

      <div className="my-5 not-prose border border-gray-200 rounded-xl bg-white">
        <div className="p-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">What to check</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Key terms make sense in your industry (pipeline, sprint, stakeholder)</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> The translation keeps tense consistent across bullets</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Company names, tools, and technologies stay correct</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">When it matters most</h4>
              <p className="text-sm text-slate-700">
                Technical roles and niche industries where a mistranslated term changes the meaning.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3>Industry Terminology</h3>

      <p>
        In engineering, medicine, law, and finance, terminology is not optional — it’s the whole point. Before you send a translated resume, spot-check a handful of critical terms to make sure they match what professionals in the target market actually use.
      </p>

      <div className="my-5 not-prose border border-gray-200 rounded-xl bg-white">
        <div className="p-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">What to check</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Your job title is the right local equivalent (or left in English when common)</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Tools/technologies are unchanged (unless there’s a standard translated name)</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Core deliverables (reports, audits, architectures) are translated precisely</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">When it matters most</h4>
              <p className="text-sm text-slate-700">
                Any role where a recruiter expects exact terminology (and will notice if it’s off).
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3>Localization vs. Literal Translation</h3>

      <p>
        Translation changes language. Localization changes expectations. In some countries, even the “standard” CV structure is different — what you include, where you put it, and how formal it sounds.
      </p>

      <div className="my-5 not-prose border border-gray-200 rounded-xl bg-white">
        <div className="p-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">What to check</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Date format matches the local norm</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Section ordering feels natural for the target market</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> You’re following local conventions (photo expectations, CV length, etc.)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">When it matters most</h4>
              <p className="text-sm text-slate-700">
                When you’re applying outside the US/UK and the market has strong resume conventions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Common Mistakes */}
      <SectionDivider icon={AlertTriangle}>Common Resume Translation Mistakes That Hurt Your Job Chances</SectionDivider>

      <p>
        Even with the right tool, these mistakes show up constantly — and they’re exactly the kind of thing that makes a hiring manager hesitate.
      </p>

      <div className="my-6 not-prose bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="text-sm font-semibold text-gray-900">Fast self-check</h4>
            <span className="text-xs text-slate-500">Spot these before you submit</span>
          </div>
        </div>
        <div className="p-5">
          <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="mt-px text-slate-400">•</span> Do any bullets sound overly literal or “translated”?</li>
            <li className="flex items-start gap-2"><span className="mt-px text-slate-400">•</span> Are all numbers, dates, and currencies unchanged?</li>
            <li className="flex items-start gap-2"><span className="mt-px text-slate-400">•</span> Is the tone consistently formal and professional?</li>
            <li className="flex items-start gap-2"><span className="mt-px text-slate-400">•</span> Did you remove idioms and slang?</li>
            <li className="flex items-start gap-2"><span className="mt-px text-slate-400">•</span> Are you following local resume conventions?</li>
          </ul>
        </div>
      </div>

      <div className="space-y-5 not-prose">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Literal Translations That Sound Wrong</h3>
          </div>
          <div className="p-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">The mistake</h4>
                <p className="text-sm text-slate-700">
                  Translating idiomatic verbs and “resume phrases” word-for-word, so the sentence becomes awkward or unnatural in the target language.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Why it hurts</h4>
                <p className="text-sm text-slate-700">
                  It makes your resume feel low-effort — recruiters may assume the rest of the application is the same.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Fix</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Rewrite the bullet in plain English first (“Led”, “Built”, “Improved”).</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Translate the simplified version — not the idiom.</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> If a phrase feels strange, replace it with a local equivalent (not a literal translation).</li>
              </ul>
            </div>

            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Before (literal/weak)</div>
                  <div className="text-sm text-slate-700">“Spearheaded a cross-functional initiative.”</div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">After (natural/professional)</div>
                  <div className="text-sm text-slate-700">“Led a cross-functional initiative from planning to delivery.”</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Losing Measurable Achievements</h3>
          </div>
          <div className="p-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">The mistake</h4>
                <p className="text-sm text-slate-700">
                  Numbers, timeframes, and money amounts get altered, moved, or dropped in translation.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Why it hurts</h4>
                <p className="text-sm text-slate-700">
                  Metrics are what make your experience believable. If they disappear, your impact looks vague.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Fix</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> After translating, scan for digits and currency symbols.</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Keep units and meaning consistent (%, $, months, users).</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Normalize date format for the target market (but keep the same dates).</li>
              </ul>
            </div>

            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Before (literal/weak)</div>
                  <div className="text-sm text-slate-700">“Increased revenue significantly.”</div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">After (natural/professional)</div>
                  <div className="text-sm text-slate-700">“Increased revenue by 35% in Q3 by improving lead qualification.”</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Incorrect Tone and Register</h3>
          </div>
          <div className="p-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">The mistake</h4>
                <p className="text-sm text-slate-700">
                  The translation slips into casual wording, inconsistent formality, or “chatty” phrasing that doesn’t belong on a CV.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Why it hurts</h4>
                <p className="text-sm text-slate-700">
                  Tone is a credibility signal. If it’s off, you can sound junior — even with senior experience.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Fix</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Use formal register consistently (especially in French, German, Japanese, etc.).</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Prefer concise, action-led bullets over full paragraphs.</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Remove hedging and casual fillers (“pretty”, “kind of”, “a bit”).</li>
              </ul>
            </div>

            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Before (literal/weak)</div>
                  <div className="text-sm text-slate-700">“Helped out with reports and stuff.”</div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">After (natural/professional)</div>
                  <div className="text-sm text-slate-700">“Prepared weekly performance reports and presented insights to stakeholders.”</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Translating Idioms Word-for-Word</h3>
          </div>
          <div className="p-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">The mistake</h4>
                <p className="text-sm text-slate-700">
                  Idioms get translated literally (“hit the ground running”), which can read as nonsense in the target language.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Why it hurts</h4>
                <p className="text-sm text-slate-700">
                  It’s one of the easiest tells that a resume wasn’t reviewed — and it breaks trust fast.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Fix</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Replace idioms with direct language before translating.</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Use outcome-based phrasing instead of metaphors.</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> If you keep an expression, use a true local equivalent — not a literal version.</li>
              </ul>
            </div>

            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Before (literal/weak)</div>
                  <div className="text-sm text-slate-700">“Hit the ground running in a new role.”</div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">After (natural/professional)</div>
                  <div className="text-sm text-slate-700">“Delivered results quickly in the first 30 days.”</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Ignoring Local Resume Conventions</h3>
          </div>
          <div className="p-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">The mistake</h4>
                <p className="text-sm text-slate-700">
                  You translate the language, but keep a resume format that feels “foreign” in the target market.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Why it hurts</h4>
                <p className="text-sm text-slate-700">
                  Recruiters compare you to local candidates. If your format looks unfamiliar, it can create friction — even if the content is strong.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Fix</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Check local expectations (length, photo norms, section order).</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> Adjust dates, address format, and headings for the target country.</li>
                <li className="flex items-start gap-2"><span className="text-slate-400 mt-px">•</span> When in doubt, look at 2–3 local examples for your role.</li>
              </ul>
            </div>

            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Before (literal/weak)</div>
                  <div className="text-sm text-slate-700">“Resume” headings and US-style date formatting everywhere.</div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">After (natural/professional)</div>
                  <div className="text-sm text-slate-700">Localized headings and date format, with structure aligned to local norms.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI for Resume Translation */}
      <SectionDivider icon={Brain}>Is It Better to Use AI to Translate Your Resume?</SectionDivider>

      <p>
        AI translation has gotten good — good enough that it’s the practical choice for most applications. The real question is when you should stop at AI, and when you should bring in a human.
      </p>

      <h3>Speed</h3>
      <p>
        AI wins here, by a lot. If you’re working against a deadline, translating in seconds is the difference between applying today and applying “eventually.”
      </p>

      <h3>Accuracy</h3>
      <p>
        For common language pairs, accuracy is strong — but it’s not perfect. The more specialized your resume is (technical terms, niche job titles, regulated domains), the more you should expect to review and adjust.
      </p>

      <h3>Context Awareness</h3>
      <p>
        This is where resume-focused tools can pull ahead. They’re more likely to preserve the “feel” of a resume: concise bullets, consistent tense, and professional phrasing — instead of full sentences that read like an essay.
      </p>

      <h3>When Human Review Still Helps</h3>
      <p>
        If the role is senior, the market is competitive, or the company is strict about language, a human review is worth the money. You don’t necessarily need a full human translation — often a review pass is enough to fix tone, clarity, and any odd phrasing that gives away “machine translation.”
      </p>

      {/* ChatGPT Section */}
      <SectionDivider icon={MessageSquare}>Can You Use ChatGPT to Translate a Resume?</SectionDivider>

      <p>
        You can — and for a paragraph or two it can be surprisingly decent. But as your primary resume translator, a general chat model has a few predictable problems.
      </p>

      <p>
        <strong>You lose formatting.</strong> Chat tools are plain text first. Paste a resume in, and you get text back — no layout, no spacing, no consistent bullets. Then you spend time rebuilding.
      </p>

      <p>
        <strong>Output can vary.</strong> Run the same prompt twice and you may get different wording, tone, and even structure. That’s fine for brainstorming — less fine for a resume you’re sending to ten employers.
      </p>

      <p>
        <strong>It doesn’t think like a resume tool.</strong> It won’t reliably preserve standard section headers or consistent bullet structure — which matters if you want your resume to remain easy to parse. If ATS readability is a priority, it helps to run the result through an <Link to="/ats-resume-checker" className="text-blue-600 hover:underline">ATS resume checker</Link> or use a tool designed around resumes in the first place.
      </p>

      <p>
        <strong>Privacy is a real consideration.</strong> A resume contains personal data. Before pasting it into any chat tool, decide what you’re comfortable sharing — and consider removing contact details if you’re only translating content.
      </p>

      <p>
        Where ChatGPT can help: as a second opinion. Use it to rewrite a single awkward bullet, generate alternatives for a phrase that feels too literal, or check how a job title is commonly expressed. Just don’t make it your only step.
      </p>

      {/* Soft CTA */}
      <SectionDivider icon={Sparkles}>Try an AI Resume Translator in Seconds</SectionDivider>

      <p>
        If you’re applying abroad and you need a clean translation fast, GetQuickResume’s <Link to="/resume-translator" className="text-blue-600 hover:underline">resume translation tool</Link> is built for that workflow. Paste or upload your resume, choose your target language, and you’ll get a translated version that keeps your structure intact — so you’re not spending the next hour reformatting.
      </p>

      <p>
        If you’re also using the <Link to="/resume-builder" className="text-blue-600 hover:underline">resume builder</Link>, it’s even smoother — you can translate and iterate without juggling multiple tools. Either way, the goal is the same: faster applications, less busywork.
      </p>

      <ArticleCTA
        variant="inline"
        title="Translate Your Resume for Free"
        description="Translate your resume into 30+ languages while keeping your structure clean and professional — then review and send with confidence."
      />

      {/* FAQ Section */}
      <SectionDivider icon={HelpCircle}>Frequently Asked Questions</SectionDivider>

      <div className="space-y-6 not-prose">
        {/* FAQ 1 */}
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h3 className="font-bold text-gray-900 text-lg mb-3">What is the best resume translator?</h3>
          <p className="text-gray-700 leading-relaxed">
            It depends on what you’re optimizing for. If you want a fast, resume-first translation that keeps your structure clean, GetQuickResume is a strong pick. If you want raw translation quality for many European languages, DeepL is excellent. If you need the safest possible output for high-stakes roles, a human service like Gengo or a hybrid option like Translated.net is worth the cost.
          </p>
        </div>

        {/* FAQ 2 */}
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h3 className="font-bold text-gray-900 text-lg mb-3">How do I translate my resume for a job abroad?</h3>
          <p className="text-gray-700 leading-relaxed">
            Pick a tool that preserves structure (bullets and headings), translate the resume, then review it like a recruiter would. Double-check job titles, technical terms, and every metric. Finally, confirm local expectations in the target country — sometimes the “right” CV format changes what you include and where you put it. If you can, have a native speaker glance over the final version.
          </p>
        </div>

        {/* FAQ 3 */}
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h3 className="font-bold text-gray-900 text-lg mb-3">Should I translate my CV myself?</h3>
          <p className="text-gray-700 leading-relaxed">
            Only if you’re truly fluent and you’ve written professional documents in that language before. Most bilingual people can communicate — but writing a sharp, professional CV is a different skill. Using a translator (and doing a review pass) is usually the safer path.
          </p>
        </div>

        {/* FAQ 4 */}
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h3 className="font-bold text-gray-900 text-lg mb-3">Do employers accept translated resumes?</h3>
          <p className="text-gray-700 leading-relaxed">
            Yes. In many countries it’s expected, especially when the job posting is in the local language. The only common exception is when a company explicitly asks for English. For regulated roles or visa-related requirements, you may need a certified translation — that’s when a professional service makes sense.
          </p>
        </div>

        {/* FAQ 5 */}
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h3 className="font-bold text-gray-900 text-lg mb-3">Which AI is best for resume translation?</h3>
          <p className="text-gray-700 leading-relaxed">
            If you want a resume-focused workflow, use an AI tool built around resumes (like GetQuickResume) so your headings and bullet structure stay clean. For pure translation quality in many European languages, DeepL is hard to beat. ChatGPT can help for rewriting individual lines, but it won’t preserve formatting and it’s not designed as a resume workflow.
          </p>
        </div>
      </div>
    </BlogLayout>
  );
}
