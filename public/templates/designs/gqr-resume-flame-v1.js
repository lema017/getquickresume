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

  function shortDate(dateValue, lang) {
    if (!dateValue) return '';
    const d = new Date(dateValue);
    if (Number.isNaN(d.getTime())) return escapeHtml(dateValue);
    return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      month: 'short',
      year: 'numeric'
    }).format(d);
  }

  function formatDateRange(startDate, endDate, isCurrent, lang, isEducation, isCompleted) {
    const start = shortDate(startDate, lang);
    let end = '';

    if (isEducation) {
      if (isCompleted === false) {
        end = I18N[lang].present;
      } else {
        end = shortDate(endDate, lang);
      }
    } else {
      end = isCurrent ? I18N[lang].present : shortDate(endDate, lang);
    }

    if (start && end) return `${start} — ${end}`;
    return start || end || '';
  }

  class GQRResumeFlameV1 extends HTMLElement {
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

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'language' && oldValue !== newValue) {
        this.render();
      }
    }

    getLanguage() {
      const attrLang = safeStr(this.getAttribute('language')).toLowerCase();
      const dataLang = safeStr(this._data && this._data.language).toLowerCase();
      const lang = attrLang || dataLang || 'en';
      return lang === 'es' ? 'es' : 'en';
    }

    renderHeader(d) {
      const firstName = safeStr(d.firstName);
      const lastName = safeStr(d.lastName);
      const fullName = `${firstName} ${lastName}`.trim();
      const profession = safeStr(d.profession);

      const contactItems = [
        d.email ? `✉ ${escapeHtml(d.email)}` : '',
        d.phone ? `☎ ${escapeHtml(d.phone)}` : '',
        d.country ? `⚲ ${escapeHtml(d.country)}` : '',
        d.linkedin ? `🔗 ${escapeHtml(d.linkedin)}` : ''
      ].filter(Boolean);

      if (!fullName && !profession && contactItems.length === 0) return '';

      return `
        <section class="header" data-section="header">
          <div class="header-inner">
            ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
            ${contactItems.length ? `
              <div class="contact-row" data-section="contact">
                ${contactItems.map((item, idx) => `
                  <span class="contact-pill" data-entry-id="contact-${idx}">${item}</span>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </section>
      `;
    }

    renderProfile(d, lang) {
      const summary = safeStr(d.summary);
      if (!summary) return '';
      return `
        <section class="section" data-section="profile">
          <h2 class="section-title">${escapeHtml(I18N[lang].profile)}</h2>
          <div class="section-body">
            <p class="summary">${escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(d, lang) {
      const combined = [...safeArr(d.skillsRaw), ...safeArr(d.toolsRaw)]
        .map(item => safeStr(item).trim())
        .filter(Boolean);

      const unique = [];
      const seen = new Set();

      combined.forEach(item => {
        const key = item.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(item);
        }
      });

      if (!unique.length) return '';

      return `
        <section class="section" data-section="skills">
          <h2 class="section-title">${escapeHtml(I18N[lang].skills)}</h2>
          <div class="section-body">
            <div class="pill-grid">
              ${unique.map((skill, idx) => `
                <span class="skill-pill" data-entry-id="skill-${idx}">${escapeHtml(skill)}</span>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(d, lang) {
      const items = safeArr(d.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          <h2 class="section-title">${escapeHtml(I18N[lang].experience)}</h2>
          <div class="section-body stack">
            ${items.map((item, idx) => {
              const bullets = [...safeArr(item.achievements), ...safeArr(item.responsibilities)]
                .map(v => safeStr(v).trim())
                .filter(Boolean);
              const dateRange = formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang, false, true);
              const title = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);
              const entryId = safeStr(item.id) || `experience-${idx}`;

              if (!title && !company && !location && !dateRange && !bullets.length) return '';

              return `
                <article class="entry" data-entry-id="${escapeHtml(entryId)}">
                  <div class="entry-head">
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

    renderProjects(d, lang) {
      const items = safeArr(d.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          <h2 class="section-title">${escapeHtml(I18N[lang].projects)}</h2>
          <div class="section-body stack">
            ${items.map((item, idx) => {
              const entryId = safeStr(item.id) || `project-${idx}`;
              const name = safeStr(item.name);
              const description = safeStr(item.description);
              const technologies = safeArr(item.technologies).map(t => safeStr(t).trim()).filter(Boolean);
              const url = safeStr(item.url);

              if (!name && !description && !technologies.length && !url) return '';

              return `
                <article class="entry" data-entry-id="${escapeHtml(entryId)}">
                  <div class="entry-head single-line">
                    ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                    ${url ? `<div class="entry-link">${escapeHtml(url)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="inline-tags">
                      ${technologies.map((tech, techIdx) => `
                        <span class="mini-pill" data-entry-id="${escapeHtml(entryId)}-tech-${techIdx}">${escapeHtml(tech)}</span>
                      `).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements(d, lang) {
      const items = safeArr(d.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          <h2 class="section-title">${escapeHtml(I18N[lang].achievements)}</h2>
          <div class="section-body stack">
            ${items.map((item, idx) => {
              const entryId = safeStr(item.id) || `achievement-${idx}`;
              const title = safeStr(item.title);
              const description = safeStr(item.description);
              const year = safeStr(item.year);

              if (!title && !description && !year) return '';

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(entryId)}">
                  <div class="entry-head">
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

    renderEducation(d, lang) {
      const items = safeArr(d.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          <h2 class="section-title">${escapeHtml(I18N[lang].education)}</h2>
          <div class="section-body stack">
            ${items.map((item, idx) => {
              const entryId = safeStr(item.id) || `education-${idx}`;
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);
              const dateRange = formatDateRange(item.startDate, item.endDate, false, lang, true, item.isCompleted);

              if (!degree && !field && !institution && !gpa && !dateRange) return '';

              return `
                <article class="entry" data-entry-id="${escapeHtml(entryId)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${(degree || field) ? `
                        <h3 class="entry-title">
                          ${escapeHtml([degree, field].filter(Boolean).join(' — '))}
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

    renderCertifications(d, lang) {
      const items = safeArr(d.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          <h2 class="section-title">${escapeHtml(I18N[lang].certifications)}</h2>
          <div class="section-body stack">
            ${items.map((item, idx) => {
              const entryId = safeStr(item.id) || `certification-${idx}`;
              const name = safeStr(item.name);
              const issuer = safeStr(item.issuer);
              const date = shortDate(item.date, lang);

              if (!name && !issuer && !date) return '';

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(entryId)}">
                  <div class="entry-head">
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

    renderLanguages(d, lang) {
      const items = safeArr(d.languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          <h2 class="section-title">${escapeHtml(I18N[lang].languages)}</h2>
          <div class="section-body stack">
            ${items.map((item, idx) => {
              const entryId = safeStr(item.id) || `language-${idx}`;
              const name = safeStr(item.name);
              const levelKey = safeStr(item.level).toLowerCase();
              const level = I18N[lang].levelMap[levelKey] || safeStr(item.level);

              if (!name && !level) return '';

              return `
                <article class="lang-row" data-entry-id="${escapeHtml(entryId)}">
                  <span class="lang-name">${escapeHtml(name)}</span>
                  <span class="lang-sep">—</span>
                  <span class="lang-level">${escapeHtml(level)}</span>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    render() {
      const d = this._data || {};
      const lang = this.getLanguage();

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #243447;
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
            padding: 34px 36px 38px;
            background: #ffffff;
            font-family: Arial, Helvetica, sans-serif;
            color: #243447;
            position: relative;
          }

          .page::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 14px;
            background: linear-gradient(90deg, #2f4057 0%, #40536e 100%);
          }

          .header {
            background: #314158;
            color: #ffffff;
            border-radius: 18px;
            padding: 28px 26px 22px;
            margin-bottom: 24px;
            position: relative;
            overflow: hidden;
          }

          .header::after {
            content: "";
            position: absolute;
            right: 18px;
            top: 16px;
            width: 74px;
            height: 74px;
            border: 1px solid rgba(255,255,255,0.14);
            border-radius: 16px;
            transform: rotate(12deg);
            opacity: 0.45;
          }

          .header-inner {
            position: relative;
            z-index: 1;
          }

          .name {
            margin: 0;
            font-size: 32px;
            line-height: 1.1;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            font-weight: 800;
          }

          .profession {
            margin-top: 8px;
            font-size: 15px;
            line-height: 1.35;
            color: rgba(255,255,255,0.88);
            font-weight: 500;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 16px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            padding: 7px 10px;
            border-radius: 999px;
            background: rgba(255,255,255,0.12);
            border: 1px solid rgba(255,255,255,0.18);
            font-size: 12px;
            line-height: 1.2;
            color: #ffffff;
          }

          .section {
            margin-bottom: 20px;
          }

          .section-title {
            margin: 0 0 12px;
            font-size: 16px;
            line-height: 1.2;
            text-transform: uppercase;
            font-weight: 800;
            letter-spacing: 0.7px;
            color: #314158;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .section-title::after {
            content: "";
            flex: 1;
            height: 2px;
            background: linear-gradient(90deg, #c7d0dc 0%, #eef2f6 100%);
            border-radius: 2px;
          }

          .section-body {
            padding-left: 2px;
          }

          .summary {
            margin: 0;
            font-size: 13.5px;
            line-height: 1.65;
            color: #425466;
          }

          .pill-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-pill,
          .mini-pill {
            display: inline-flex;
            align-items: center;
            border-radius: 999px;
            background: #edf1f5;
            color: #2f4057;
            border: 1px solid #d6dde6;
            font-size: 12px;
            line-height: 1.2;
            padding: 7px 11px;
          }

          .stack {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            padding: 0 0 12px;
            border-bottom: 1px solid #e5eaf0;
          }

          .entry:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .entry.compact {
            padding-bottom: 10px;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 14px;
          }

          .entry-head.single-line {
            align-items: baseline;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-size: 15px;
            line-height: 1.35;
            color: #253447;
            font-weight: 700;
          }

          .entry-meta {
            margin-top: 4px;
            font-size: 12.5px;
            line-height: 1.4;
            color: #667789;
          }

          .sep {
            margin: 0 6px;
          }

          .entry-date,
          .entry-link {
            flex: 0 0 auto;
            font-size: 12px;
            line-height: 1.35;
            color: #5a6b7f;
            background: #f3f6f9;
            border: 1px solid #dfe6ee;
            border-radius: 999px;
            padding: 5px 9px;
            white-space: nowrap;
          }

          .entry-text {
            margin: 8px 0 0;
            font-size: 13px;
            line-height: 1.6;
            color: #445668;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding: 0;
            list-style: none;
          }

          .bullet-list li {
            position: relative;
            margin: 0 0 6px 0;
            padding-left: 16px;
            font-size: 13px;
            line-height: 1.55;
            color: #445668;
          }

          .bullet-list li::before {
            content: "";
            position: absolute;
            left: 0;
            top: 8px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #314158;
          }

          .inline-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            margin-top: 10px;
          }

          .lang-row {
            display: flex;
            align-items: baseline;
            gap: 6px;
            padding: 0 0 6px;
            color: #445668;
            font-size: 13px;
            line-height: 1.5;
          }

          .lang-name {
            font-weight: 700;
            color: #253447;
          }

          .lang-level {
            color: #5a6b7f;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${this.renderHeader(d)}
          ${this.renderProfile(d, lang)}
          ${this.renderSkills(d, lang)}
          ${this.renderExperience(d, lang)}
          ${this.renderProjects(d, lang)}
          ${this.renderAchievements(d, lang)}
          ${this.renderEducation(d, lang)}
          ${this.renderCertifications(d, lang)}
          ${this.renderLanguages(d, lang)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-flame-v1')) {
    customElements.define('gqr-resume-flame-v1', GQRResumeFlameV1);
  }
})();