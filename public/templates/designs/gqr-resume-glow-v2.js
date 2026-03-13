(function() {
  'use strict';

  const I18N = {
    en: {
      profile: 'Profile',
      experience: 'Work Experience',
      education: 'Education',
      projects: 'Projects',
      certifications: 'Certifications',
      languages: 'Languages',
      achievements: 'Achievements',
      skills: 'Skills',
      present: 'Present',
      levelMap: {
        basic: 'Basic',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        native: 'Native'
      }
    },
    es: {
      profile: 'Perfil',
      experience: 'Experiencia',
      education: 'Educación',
      projects: 'Proyectos',
      certifications: 'Certificaciones',
      languages: 'Idiomas',
      achievements: 'Logros',
      skills: 'Habilidades',
      present: 'Presente',
      levelMap: {
        basic: 'Básico',
        intermediate: 'Intermedio',
        advanced: 'Avanzado',
        native: 'Nativo'
      }
    }
  };

  function safeStr(v) {
    return v == null ? '' : String(v);
  }

  function safeArr(v) {
    return Array.isArray(v) ? v : [];
  }

  function escapeHtml(t) {
    return safeStr(t)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function parseDate(value) {
    if (!value) return null;
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d;

    const s = safeStr(value).trim();
    const m = s.match(/^(\d{4})-(\d{2})$/);
    if (m) {
      const d2 = new Date(Number(m[1]), Number(m[2]) - 1, 1);
      if (!isNaN(d2.getTime())) return d2;
    }

    const y = s.match(/^(\d{4})$/);
    if (y) {
      const d3 = new Date(Number(y[1]), 0, 1);
      if (!isNaN(d3.getTime())) return d3;
    }

    return null;
  }

  function formatShortDate(value, lang) {
    const d = parseDate(value);
    if (!d) return escapeHtml(value || '');
    return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      month: 'short',
      year: 'numeric'
    }).format(d);
  }

  function formatDateRange(startDate, endDate, lang, opts) {
    const t = I18N[lang] || I18N.en;
    const start = startDate ? formatShortDate(startDate, lang) : '';
    const usePresent = opts && opts.usePresent;
    const end = usePresent ? t.present : (endDate ? formatShortDate(endDate, lang) : '');

    if (start && end) return start + ' — ' + end;
    if (start) return start;
    if (end) return end;
    return '';
  }

  class GQRResumeGlowV2 extends HTMLElement {
    static get observedAttributes() {
      return ['language'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._data = {};
    }

    set data(value) {
      this._data = value && typeof value === 'object' ? value : {};
      this.render();
    }

    get data() {
      return this._data;
    }

    getLanguage() {
      const attr = this.getAttribute('language');
      const dataLang = this._data && this._data.language;
      const lang = attr || dataLang || 'en';
      return lang === 'es' ? 'es' : 'en';
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'language' && oldValue !== newValue) {
        this.render();
      }
    }

    renderHeader(data) {
      const firstName = safeStr(data.firstName);
      const lastName = safeStr(data.lastName);
      const profession = safeStr(data.profession);
      const email = safeStr(data.email);
      const phone = safeStr(data.phone);
      const country = safeStr(data.country);
      const linkedin = safeStr(data.linkedin);

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      const contacts = [
        email ? `✉ ${escapeHtml(email)}` : '',
        phone ? `☎ ${escapeHtml(phone)}` : '',
        country ? `⚲ ${escapeHtml(country)}` : '',
        linkedin ? `🔗 ${escapeHtml(linkedin)}` : ''
      ].filter(Boolean);

      if (!fullName && !profession && contacts.length === 0) return '';

      return `
        <section class="header" data-section="header">
          <div class="name-block">
            ${profession ? `<div class="eyebrow">${escapeHtml(profession)}</div>` : ''}
            ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
          </div>
          ${contacts.length ? `
            <div class="contact-row" data-section="contact">
              ${contacts.map((item, idx) => `<span class="contact-pill" data-entry-id="contact-${idx}">${item}</span>`).join('')}
            </div>
          ` : ''}
        </section>
      `;
    }

    renderProfile(data, t) {
      const summary = safeStr(data.summary);
      if (!summary) return '';
      return `
        <section class="section" data-section="profile">
          <div class="section-head">
            <h2>${escapeHtml(t.profile)}</h2>
          </div>
          <div class="section-body prose">
            <p>${escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(data, t) {
      const merged = Array.from(new Set(
        [...safeArr(data.skillsRaw), ...safeArr(data.toolsRaw)]
          .map(s => safeStr(s).trim())
          .filter(Boolean)
      ));

      if (!merged.length) return '';

      return `
        <section class="section" data-section="skills">
          <div class="section-head">
            <h2>${escapeHtml(t.skills)}</h2>
          </div>
          <div class="section-body">
            <div class="chips">
              ${merged.map((skill, idx) => `
                <span class="chip" data-entry-id="skill-${idx}">${escapeHtml(skill)}</span>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(data, t, lang) {
      const items = safeArr(data.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          <div class="section-head">
            <h2>${escapeHtml(t.experience)}</h2>
          </div>
          <div class="section-body entries">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `experience-${index}`;
              const title = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);
              const bullets = [...safeArr(item.achievements), ...safeArr(item.responsibilities)]
                .map(v => safeStr(v).trim())
                .filter(Boolean);

              const dateRange = formatDateRange(
                item.startDate,
                item.endDate,
                lang,
                { usePresent: !!item.isCurrent }
              );

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-meta">
                          ${company ? `<span>${escapeHtml(company)}</span>` : ''}
                          ${company && location ? `<span class="sep">•</span>` : ''}
                          ${location ? `<span>${escapeHtml(location)}</span>` : ''}
                        </div>
                      ` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${bullets.length ? `
                    <ul class="bullet-list">
                      ${bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
                    </ul>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjects(data, t) {
      const items = safeArr(data.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          <div class="section-head">
            <h2>${escapeHtml(t.projects)}</h2>
          </div>
          <div class="section-body entries">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `project-${index}`;
              const name = safeStr(item.name);
              const description = safeStr(item.description);
              const technologies = safeArr(item.technologies).map(v => safeStr(v).trim()).filter(Boolean);
              const url = safeStr(item.url);

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                      ${url ? `<div class="entry-link">${escapeHtml(url)}</div>` : ''}
                    </div>
                  </div>
                  ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="inline-tags">
                      ${technologies.map(tech => `<span class="mini-chip">${escapeHtml(tech)}</span>`).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements(data, t) {
      const items = safeArr(data.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          <div class="section-head">
            <h2>${escapeHtml(t.achievements)}</h2>
          </div>
          <div class="section-body entries">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `achievement-${index}`;
              const title = safeStr(item.title);
              const description = safeStr(item.description);
              const year = safeStr(item.year);

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                    </div>
                    ${year ? `<div class="entry-date">${escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducation(data, t, lang) {
      const items = safeArr(data.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          <div class="section-head">
            <h2>${escapeHtml(t.education)}</h2>
          </div>
          <div class="section-body entries">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `education-${index}`;
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);

              const dateRange = formatDateRange(
                item.startDate,
                item.endDate,
                lang,
                { usePresent: item.isCompleted === false }
              );

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${(degree || field) ? `
                        <h3 class="entry-title">
                          ${escapeHtml([degree, field].filter(Boolean).join(degree && field ? ' — ' : ''))}
                        </h3>
                      ` : ''}
                      ${institution ? `<div class="entry-meta"><span>${escapeHtml(institution)}</span></div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${gpa ? `<p class="entry-text">GPA: ${escapeHtml(gpa)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(data, t, lang) {
      const items = safeArr(data.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          <div class="section-head">
            <h2>${escapeHtml(t.certifications)}</h2>
          </div>
          <div class="section-body entries">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `certification-${index}`;
              const name = safeStr(item.name);
              const issuer = safeStr(item.issuer);
              const date = item.date ? formatShortDate(item.date, lang) : '';

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                      ${issuer ? `<div class="entry-meta"><span>${escapeHtml(issuer)}</span></div>` : ''}
                    </div>
                    ${date ? `<div class="entry-date">${escapeHtml(date)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderLanguages(data, t) {
      const items = safeArr(data.languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          <div class="section-head">
            <h2>${escapeHtml(t.languages)}</h2>
          </div>
          <div class="section-body">
            <div class="language-list">
              ${items.map((item, index) => {
                const id = safeStr(item.id) || `language-${index}`;
                const name = safeStr(item.name);
                const levelKey = safeStr(item.level).toLowerCase();
                const level = (t.levelMap && t.levelMap[levelKey]) ? t.levelMap[levelKey] : levelKey;
                return `
                  <div class="language-item" data-entry-id="${escapeHtml(id)}">
                    <span class="language-name">${escapeHtml(name)}</span>
                    <span class="language-level">${escapeHtml(level)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </section>
      `;
    }

    render() {
      const data = this._data || {};
      const lang = this.getLanguage();
      const t = I18N[lang] || I18N.en;

      this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

          :host {
            display: block;
            color: #1e1d1b;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          * {
            box-sizing: border-box;
          }

          .page {
            width: 210mm;
            min-height: 297mm;
            height: auto;
            overflow: visible;
            margin: 0 auto;
            background: #fbfaf8;
            padding: 18mm 16mm 18mm 16mm;
            font-family: 'Inter', Arial, sans-serif;
            color: #24211f;
            position: relative;
          }

          .page::before {
            content: '';
            position: absolute;
            inset: 0;
            pointer-events: none;
            background:
              linear-gradient(180deg, rgba(117,105,98,0.08) 0%, rgba(117,105,98,0.02) 18%, rgba(0,0,0,0) 38%),
              linear-gradient(90deg, rgba(52,48,45,0.045) 0, rgba(52,48,45,0.045) 18mm, transparent 18mm);
            z-index: 0;
          }

          .content {
            position: relative;
            z-index: 1;
          }

          .header {
            padding: 0 0 12px 0;
            margin-bottom: 18px;
            border-bottom: 1px solid #cfc7c1;
          }

          .eyebrow {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.22em;
            color: #756962;
            margin-bottom: 6px;
            font-weight: 600;
          }

          .name {
            margin: 0;
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 34px;
            line-height: 0.95;
            font-weight: 700;
            color: #11100f;
            letter-spacing: 0.01em;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 14px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 10px;
            border: 1px solid #d8d0ca;
            border-radius: 999px;
            background: #f4f1ee;
            color: #433d39;
            font-size: 11.5px;
            line-height: 1.2;
          }

          .section {
            margin-top: 18px;
          }

          .section-head {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
          }

          .section-head h2 {
            margin: 0;
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 24px;
            line-height: 1;
            font-weight: 700;
            color: #1b1917;
            letter-spacing: 0.02em;
          }

          .section-head::after {
            content: '';
            flex: 1;
            height: 1px;
            background: linear-gradient(90deg, #8b7d74, #d8d0ca);
          }

          .section-body {
            padding-left: 2px;
          }

          .prose p,
          .entry-text {
            margin: 0;
            font-size: 12.5px;
            line-height: 1.65;
            color: #34302d;
          }

          .chips {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .chip {
            display: inline-flex;
            align-items: center;
            padding: 7px 11px;
            border-radius: 999px;
            border: 1px solid #d5cdc6;
            background: #ffffff;
            font-size: 11.5px;
            color: #302c29;
          }

          .entries {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            padding: 0 0 10px 0;
            border-bottom: 1px solid #ece6e1;
          }

          .entry:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .entry.compact {
            padding-bottom: 8px;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 14px;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-size: 14px;
            line-height: 1.35;
            font-weight: 700;
            color: #181614;
          }

          .entry-meta {
            margin-top: 2px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 6px;
            color: #6a6059;
            font-size: 11.5px;
            line-height: 1.4;
          }

          .sep {
            color: #9a8d84;
          }

          .entry-date {
            white-space: nowrap;
            font-size: 11px;
            line-height: 1.4;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #756962;
            font-weight: 600;
            padding-top: 2px;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 0 0 4px 0;
            font-size: 12px;
            line-height: 1.6;
            color: #312e2b;
          }

          .entry-link {
            margin-top: 3px;
            font-size: 11.5px;
            color: #756962;
            word-break: break-word;
          }

          .inline-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
          }

          .mini-chip {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 999px;
            background: #f1ece8;
            color: #433d39;
            font-size: 10.5px;
            border: 1px solid #ddd4cd;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .language-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            padding: 8px 0;
            border-bottom: 1px solid #ece6e1;
          }

          .language-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .language-name {
            font-size: 12.5px;
            color: #221f1d;
            font-weight: 600;
          }

          .language-level {
            font-size: 11.5px;
            color: #756962;
            text-transform: uppercase;
            letter-spacing: 0.06em;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          <div class="content">
            ${this.renderHeader(data)}
            ${this.renderProfile(data, t)}
            ${this.renderSkills(data, t)}
            ${this.renderExperience(data, t, lang)}
            ${this.renderProjects(data, t)}
            ${this.renderAchievements(data, t)}
            ${this.renderEducation(data, t, lang)}
            ${this.renderCertifications(data, t, lang)}
            ${this.renderLanguages(data, t)}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-glow-v2')) {
    customElements.define('gqr-resume-glow-v2', GQRResumeGlowV2);
  }
})();