(function() {
  'use strict';

  class GQRResumeOakV1 extends HTMLElement {
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
      const attrLang = this.getAttribute('language');
      const dataLang = this._data && this._data.language;
      const lang = attrLang || dataLang || 'en';
      return lang === 'es' ? 'es' : 'en';
    }

    getI18n(lang) {
      return {
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
      }[lang];
    }

    safeStr(v) {
      return v == null ? '' : String(v);
    }

    safeArr(v) {
      return Array.isArray(v) ? v : [];
    }

    escapeHtml(t) {
      return this.safeStr(t)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    formatDateShort(value, lang) {
      if (!value) return '';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return this.escapeHtml(value);
      return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
        month: 'short',
        year: 'numeric'
      }).format(date);
    }

    formatDateRange(startDate, endDate, lang, options) {
      const i18n = this.getI18n(lang);
      const start = this.formatDateShort(startDate, lang);
      const isCurrent = !!(options && options.isCurrent);
      const educationIncomplete = !!(options && options.educationIncomplete);

      let end = '';
      if (isCurrent || educationIncomplete) {
        end = i18n.present;
      } else {
        end = this.formatDateShort(endDate, lang);
      }

      if (start && end) return `${start} — ${end}`;
      return start || end || '';
    }

    renderSectionTitle(title) {
      return `<h2 class="section-title">${this.escapeHtml(title)}</h2>`;
    }

    renderHeader(data) {
      const firstName = this.safeStr(data.firstName);
      const lastName = this.safeStr(data.lastName);
      const profession = this.safeStr(data.profession);
      const email = this.safeStr(data.email);
      const phone = this.safeStr(data.phone);
      const country = this.safeStr(data.country);
      const linkedin = this.safeStr(data.linkedin);

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      const contactItems = [
        email ? `✉ ${this.escapeHtml(email)}` : '',
        phone ? `☎ ${this.escapeHtml(phone)}` : '',
        country ? `⚲ ${this.escapeHtml(country)}` : '',
        linkedin ? `🔗 ${this.escapeHtml(linkedin)}` : ''
      ].filter(Boolean);

      if (!fullName && !profession && contactItems.length === 0) return '';

      return `
        <section class="header" data-section="header">
          <div class="header-band">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
          ${contactItems.length ? `
            <div class="contact-row" data-section="contact">
              ${contactItems.map((item, index) => `
                <span class="contact-pill" data-entry-id="contact-${index}">${item}</span>
              `).join('')}
            </div>
          ` : ''}
        </section>
      `;
    }

    renderProfile(data, i18n) {
      const summary = this.safeStr(data.summary).trim();
      if (!summary) return '';
      return `
        <section class="section" data-section="profile">
          ${this.renderSectionTitle(i18n.profile)}
          <div class="section-body prose">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderSkills(data, i18n) {
      const skillsRaw = this.safeArr(data.skillsRaw).map(v => this.safeStr(v).trim()).filter(Boolean);
      const toolsRaw = this.safeArr(data.toolsRaw).map(v => this.safeStr(v).trim()).filter(Boolean);
      const merged = Array.from(new Set([...skillsRaw, ...toolsRaw].map(v => v.toLowerCase())))
        .map(lower => {
          const original = [...skillsRaw, ...toolsRaw].find(item => item.toLowerCase() === lower);
          return original || lower;
        });

      if (!merged.length) return '';

      return `
        <section class="section" data-section="skills">
          ${this.renderSectionTitle(i18n.skills)}
          <div class="section-body">
            <div class="badge-grid">
              ${merged.map((skill, index) => `
                <span class="badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(data, i18n, lang) {
      const items = this.safeArr(data.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          ${this.renderSectionTitle(i18n.experience)}
          <div class="section-body timeline">
            ${items.map((item, index) => {
              const title = this.safeStr(item.title);
              const company = this.safeStr(item.company);
              const location = this.safeStr(item.location);
              const range = this.formatDateRange(item.startDate, item.endDate, lang, { isCurrent: !!item.isCurrent });
              const bullets = [...this.safeArr(item.achievements), ...this.safeArr(item.responsibilities)]
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);

              if (!title && !company && !location && !range && !bullets.length) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || `experience-${index}`)}">
                  <div class="entry-top">
                    <div class="entry-head">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-meta">
                          ${company ? `<span>${this.escapeHtml(company)}</span>` : ''}
                          ${company && location ? `<span class="sep">·</span>` : ''}
                          ${location ? `<span>${this.escapeHtml(location)}</span>` : ''}
                        </div>
                      ` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${bullets.length ? `
                    <ul class="bullet-list">
                      ${bullets.map(b => `<li>${this.escapeHtml(b)}</li>`).join('')}
                    </ul>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjects(data, i18n) {
      const items = this.safeArr(data.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          ${this.renderSectionTitle(i18n.projects)}
          <div class="section-body stack">
            ${items.map((item, index) => {
              const name = this.safeStr(item.name);
              const description = this.safeStr(item.description);
              const technologies = this.safeArr(item.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const url = this.safeStr(item.url);

              if (!name && !description && !technologies.length && !url) return '';

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || `project-${index}`)}">
                  ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map((tech, techIndex) => `
                        <span class="mini-tag" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || `project-${index}`)}-tech-${techIndex}">${this.escapeHtml(tech)}</span>
                      `).join('')}
                    </div>
                  ` : ''}
                  ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements(data, i18n) {
      const items = this.safeArr(data.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          ${this.renderSectionTitle(i18n.achievements)}
          <div class="section-body stack">
            ${items.map((item, index) => {
              const title = this.safeStr(item.title);
              const description = this.safeStr(item.description);
              const year = this.safeStr(item.year);

              if (!title && !description && !year) return '';

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || `achievement-${index}`)}">
                  <div class="entry-top">
                    ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : '<div></div>'}
                    ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducation(data, i18n, lang) {
      const items = this.safeArr(data.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          ${this.renderSectionTitle(i18n.education)}
          <div class="section-body timeline">
            ${items.map((item, index) => {
              const degree = this.safeStr(item.degree);
              const field = this.safeStr(item.field);
              const institution = this.safeStr(item.institution);
              const gpa = this.safeStr(item.gpa);
              const range = this.formatDateRange(item.startDate, item.endDate, lang, {
                educationIncomplete: item.isCompleted === false
              });

              if (!degree && !field && !institution && !gpa && !range) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || `education-${index}`)}">
                  <div class="entry-top">
                    <div class="entry-head">
                      ${(degree || field) ? `
                        <h3 class="entry-title">
                          ${this.escapeHtml([degree, field].filter(Boolean).join(degree && field ? ' — ' : ''))}
                        </h3>
                      ` : ''}
                      ${institution ? `<div class="entry-meta"><span>${this.escapeHtml(institution)}</span></div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${gpa ? `<div class="entry-text">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(data, i18n, lang) {
      const items = this.safeArr(data.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          ${this.renderSectionTitle(i18n.certifications)}
          <div class="section-body stack">
            ${items.map((item, index) => {
              const name = this.safeStr(item.name);
              const issuer = this.safeStr(item.issuer);
              const date = this.formatDateShort(item.date, lang);

              if (!name && !issuer && !date) return '';

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || `certification-${index}`)}">
                  <div class="entry-top">
                    <div class="entry-head">
                      ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                      ${issuer ? `<div class="entry-meta"><span>${this.escapeHtml(issuer)}</span></div>` : ''}
                    </div>
                    ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderLanguages(data, i18n) {
      const items = this.safeArr(data.languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          ${this.renderSectionTitle(i18n.languages)}
          <div class="section-body">
            <div class="language-list">
              ${items.map((item, index) => {
                const name = this.safeStr(item.name);
                const levelKey = this.safeStr(item.level).toLowerCase();
                const level = i18n.levelMap[levelKey] || this.safeStr(item.level);

                if (!name && !level) return '';

                return `
                  <div class="language-item" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || `language-${index}`)}">
                    <span class="language-name">${this.escapeHtml(name)}</span>
                    <span class="language-level">${this.escapeHtml(level)}</span>
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
      const i18n = this.getI18n(lang);

      this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');

          :host {
            display: block;
            color: #1f2627;
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
            background: #ffffff;
            padding: 0;
            font-family: "Inter", Arial, sans-serif;
            color: #1f2627;
            line-height: 1.45;
          }

          .inner {
            padding: 0 34px 34px;
          }

          .header {
            margin: 0 0 26px;
          }

          .header-band {
            background: #aebfc0;
            color: #ffffff;
            padding: 34px 34px 28px;
            border-bottom: 6px solid #202427;
          }

          .name {
            margin: 0;
            font-family: "Barlow Condensed", Arial, sans-serif;
            font-size: 30px;
            line-height: 0.95;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            font-weight: 700;
          }

          .profession {
            margin-top: 10px;
            font-family: "Barlow Condensed", Arial, sans-serif;
            font-size: 16px;
            line-height: 1;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            font-style: italic;
            opacity: 0.96;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            padding: 14px 34px 0;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 6px 10px;
            background: #eef2f1;
            border: 1px solid #d7dfde;
            color: #293133;
            border-radius: 999px;
            font-size: 12px;
            line-height: 1.2;
          }

          .section {
            margin: 0 0 20px;
          }

          .section-title {
            margin: 0 0 10px;
            display: inline-block;
            position: relative;
            font-family: "Barlow Condensed", Arial, sans-serif;
            font-size: 22px;
            line-height: 1;
            letter-spacing: 0.03em;
            text-transform: uppercase;
            color: #243032;
            font-weight: 700;
            background: linear-gradient(transparent 62%, #dfe7e5 62%);
            padding-right: 8px;
          }

          .section-body {
            font-size: 13px;
            color: #273032;
          }

          .prose {
            white-space: pre-wrap;
          }

          .badge-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .badge {
            display: inline-block;
            padding: 6px 10px;
            border-radius: 999px;
            background: #f3f6f5;
            border: 1px solid #d7dfde;
            font-size: 12px;
            color: #2b3436;
          }

          .timeline,
          .stack {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            padding-bottom: 12px;
            border-bottom: 1px solid #e4e9e8;
          }

          .entry:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .entry.compact {
            padding-bottom: 10px;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            align-items: flex-start;
          }

          .entry-head {
            min-width: 0;
            flex: 1 1 auto;
          }

          .entry-title {
            margin: 0;
            font-size: 15px;
            line-height: 1.25;
            font-weight: 700;
            color: #1f2627;
          }

          .entry-meta {
            margin-top: 3px;
            color: #607072;
            font-size: 12px;
          }

          .sep {
            margin: 0 6px;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 12px;
            color: #4f6264;
            font-weight: 600;
            white-space: nowrap;
            padding-top: 1px;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 0 0 4px;
          }

          .entry-text {
            margin-top: 6px;
            font-size: 13px;
            color: #2a3435;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
          }

          .mini-tag {
            display: inline-block;
            padding: 4px 8px;
            background: #e8efee;
            color: #314244;
            border-radius: 999px;
            font-size: 11px;
            border: 1px solid #d4dddb;
          }

          .entry-link {
            margin-top: 7px;
            font-size: 12px;
            color: #4b6163;
            word-break: break-word;
          }

          .language-list {
            display: grid;
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .language-item {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            padding: 8px 10px;
            background: #f7f9f8;
            border: 1px solid #e2e8e6;
            border-radius: 8px;
          }

          .language-name {
            font-weight: 600;
            color: #233032;
          }

          .language-level {
            color: #5a6c6e;
            font-size: 12px;
            white-space: nowrap;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${this.renderHeader(data)}
          <div class="inner">
            ${this.renderProfile(data, i18n)}
            ${this.renderSkills(data, i18n)}
            ${this.renderExperience(data, i18n, lang)}
            ${this.renderProjects(data, i18n)}
            ${this.renderAchievements(data, i18n)}
            ${this.renderEducation(data, i18n, lang)}
            ${this.renderCertifications(data, i18n, lang)}
            ${this.renderLanguages(data, i18n)}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-oak-v1')) {
    customElements.define('gqr-resume-oak-v1', GQRResumeOakV1);
  }
})();