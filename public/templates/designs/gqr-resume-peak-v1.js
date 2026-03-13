(function() {
  'use strict';

  class GQRResumePeakV1 extends HTMLElement {
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
      const dataLang = this._data && typeof this._data.language === 'string' ? this._data.language : '';
      const lang = (attrLang || dataLang || 'en').toLowerCase();
      return lang === 'es' ? 'es' : 'en';
    }

    safeStr(v) {
      return typeof v === 'string' ? v : (v == null ? '' : String(v));
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

    formatShortDate(value, lang) {
      if (!value) return '';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        return this.escapeHtml(this.safeStr(value));
      }
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };
      return months[lang][date.getMonth()] + ' ' + date.getFullYear();
    }

    formatDateRange(startDate, endDate, lang, isCurrent, isEducation, isCompleted) {
      const i18n = this.getI18n(lang);
      const start = this.formatShortDate(startDate, lang);
      let end = '';

      if (isEducation) {
        if (isCompleted === false) {
          end = i18n.present;
        } else {
          end = this.formatShortDate(endDate, lang);
        }
      } else {
        if (isCurrent) {
          end = i18n.present;
        } else {
          end = this.formatShortDate(endDate, lang);
        }
      }

      if (start && end) return start + ' — ' + end;
      return start || end || '';
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
        email ? `<span class="contact-pill">✉ ${this.escapeHtml(email)}</span>` : '',
        phone ? `<span class="contact-pill">☎ ${this.escapeHtml(phone)}</span>` : '',
        country ? `<span class="contact-pill">⚲ ${this.escapeHtml(country)}</span>` : '',
        linkedin ? `<span class="contact-pill">🔗 ${this.escapeHtml(linkedin)}</span>` : ''
      ].filter(Boolean).join('');

      if (!fullName && !profession && !contactItems) return '';

      return `
        <section class="header" data-section="header">
          <div class="header-inner">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
            ${contactItems ? `<div class="contact-row" data-section="contact">${contactItems}</div>` : ''}
          </div>
        </section>
      `;
    }

    renderProfile(summary, i18n) {
      const text = this.safeStr(summary).trim();
      if (!text) return '';
      return `
        <section class="section" data-section="profile">
          <h2 class="section-title">${this.escapeHtml(i18n.profile)}</h2>
          <div class="section-body">
            <p class="summary">${this.escapeHtml(text)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(skillsRaw, toolsRaw, i18n) {
      const merged = [];
      const seen = new Set();

      this.safeArr(skillsRaw).concat(this.safeArr(toolsRaw)).forEach(function(item) {
        const val = typeof item === 'string' ? item.trim() : '';
        const key = val.toLowerCase();
        if (val && !seen.has(key)) {
          seen.add(key);
          merged.push(val);
        }
      });

      if (!merged.length) return '';

      return `
        <section class="section" data-section="skills">
          <h2 class="section-title">${this.escapeHtml(i18n.skills)}</h2>
          <div class="section-body">
            <div class="skills-grid">
              ${merged.map((skill, index) => `
                <span class="skill-chip" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(experience, i18n, lang) {
      const items = this.safeArr(experience).filter(item => item && typeof item === 'object');
      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          <h2 class="section-title">${this.escapeHtml(i18n.experience)}</h2>
          <div class="section-body stack">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id) || `experience-${index}`;
              const title = this.safeStr(item.title);
              const company = this.safeStr(item.company);
              const location = this.safeStr(item.location);
              const dateRange = this.formatDateRange(item.startDate, item.endDate, lang, !!item.isCurrent, false, true);
              const bullets = this.safeArr(item.achievements).concat(this.safeArr(item.responsibilities))
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-heading">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-meta">
                          ${company ? `<span>${this.escapeHtml(company)}</span>` : ''}
                          ${(company && location) ? `<span class="sep">•</span>` : ''}
                          ${location ? `<span>${this.escapeHtml(location)}</span>` : ''}
                        </div>
                      ` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
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

    renderProjects(projects, i18n) {
      const items = this.safeArr(projects).filter(item => item && typeof item === 'object');
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          <h2 class="section-title">${this.escapeHtml(i18n.projects)}</h2>
          <div class="section-body stack">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id) || `project-${index}`;
              const name = this.safeStr(item.name);
              const description = this.safeStr(item.description);
              const technologies = this.safeArr(item.technologies).map(t => this.safeStr(t).trim()).filter(Boolean);
              const url = this.safeStr(item.url);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-heading">
                      ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                      ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map(tech => `<span class="mini-tag">${this.escapeHtml(tech)}</span>`).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements(achievements, i18n) {
      const items = this.safeArr(achievements).filter(item => item && typeof item === 'object');
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          <h2 class="section-title">${this.escapeHtml(i18n.achievements)}</h2>
          <div class="section-body stack">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id) || `achievement-${index}`;
              const title = this.safeStr(item.title);
              const description = this.safeStr(item.description);
              const year = this.safeStr(item.year);

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-heading">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                    </div>
                    ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducation(education, i18n, lang) {
      const items = this.safeArr(education).filter(item => item && typeof item === 'object');
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          <h2 class="section-title">${this.escapeHtml(i18n.education)}</h2>
          <div class="section-body stack">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id) || `education-${index}`;
              const degree = this.safeStr(item.degree);
              const field = this.safeStr(item.field);
              const institution = this.safeStr(item.institution);
              const gpa = this.safeStr(item.gpa);
              const dateRange = this.formatDateRange(item.startDate, item.endDate, lang, false, true, item.isCompleted);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-heading">
                      ${(degree || field) ? `
                        <h3 class="entry-title">
                          ${this.escapeHtml([degree, field].filter(Boolean).join(degree && field ? ' — ' : ''))}
                        </h3>
                      ` : ''}
                      ${institution ? `<div class="entry-meta"><span>${this.escapeHtml(institution)}</span></div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${gpa ? `<p class="entry-text">GPA: ${this.escapeHtml(gpa)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(certifications, i18n, lang) {
      const items = this.safeArr(certifications).filter(item => item && typeof item === 'object');
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          <h2 class="section-title">${this.escapeHtml(i18n.certifications)}</h2>
          <div class="section-body stack">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id) || `certification-${index}`;
              const name = this.safeStr(item.name);
              const issuer = this.safeStr(item.issuer);
              const date = this.formatShortDate(item.date, lang);

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-heading">
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

    renderLanguages(languages, i18n) {
      const items = this.safeArr(languages).filter(item => item && typeof item === 'object');
      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          <h2 class="section-title">${this.escapeHtml(i18n.languages)}</h2>
          <div class="section-body">
            <div class="language-list">
              ${items.map((item, index) => {
                const id = this.safeStr(item.id) || `language-${index}`;
                const name = this.safeStr(item.name);
                const levelKey = this.safeStr(item.level).toLowerCase();
                const levelLabel = i18n.levelMap[levelKey] || this.safeStr(item.level);

                return `
                  <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                    <span class="language-name">${this.escapeHtml(name)}</span>
                    <span class="language-level">${this.escapeHtml(levelLabel)}</span>
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
          :host {
            display: block;
            color: #2d2a2a;
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
            background: #fcfbf8;
            color: #2d2a2a;
            padding: 22mm 18mm 18mm;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.45;
          }

          .header {
            background: #2f2c2f;
            color: #f7f3ec;
            border-radius: 2px;
            padding: 18px 20px 16px;
            margin-bottom: 18px;
            border-top: 6px solid #c9b39b;
          }

          .header-inner {
            display: block;
          }

          .name {
            margin: 0;
            font-size: 30px;
            line-height: 1.05;
            font-weight: 800;
            letter-spacing: 0.06em;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 6px;
            font-size: 14px;
            font-weight: 500;
            color: #e5d9cb;
            letter-spacing: 0.03em;
          }

          .contact-row {
            margin-top: 14px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            padding: 5px 10px;
            border: 1px solid rgba(229, 217, 203, 0.35);
            background: rgba(255, 255, 255, 0.04);
            color: #f2ece4;
            font-size: 11px;
            border-radius: 999px;
            word-break: break-word;
          }

          .section {
            margin-top: 18px;
          }

          .section:first-of-type {
            margin-top: 0;
          }

          .section-title {
            margin: 0 0 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: #2f2c2f;
          }

          .section-title::before {
            content: "";
            display: inline-block;
            width: 12px;
            height: 12px;
            background: #c9b39b;
            transform: rotate(45deg);
            flex: 0 0 12px;
          }

          .section-title::after {
            content: "";
            height: 1px;
            background: #d8c8b7;
            flex: 1 1 auto;
          }

          .section-body {
            padding-left: 22px;
          }

          .summary,
          .entry-text {
            margin: 0;
            font-size: 12.5px;
            color: #464142;
          }

          .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-chip,
          .mini-tag {
            display: inline-flex;
            align-items: center;
            padding: 6px 10px;
            background: #f1e8de;
            border: 1px solid #dccab8;
            color: #3a3536;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 600;
          }

          .stack {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            border-left: 2px solid #d8c8b7;
            padding-left: 14px;
          }

          .entry.compact {
            padding-bottom: 0;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
          }

          .entry-heading {
            flex: 1 1 auto;
            min-width: 0;
          }

          .entry-title {
            margin: 0;
            font-size: 14px;
            line-height: 1.25;
            font-weight: 800;
            color: #2f2c2f;
          }

          .entry-meta {
            margin-top: 3px;
            font-size: 11.5px;
            color: #6d6461;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 11px;
            font-weight: 700;
            color: #8b7660;
            white-space: nowrap;
            padding-top: 1px;
          }

          .sep {
            margin: 0 5px;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 4px 0;
            font-size: 12px;
            color: #464142;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 9px;
          }

          .entry-link {
            margin-top: 4px;
            font-size: 11px;
            color: #8b7660;
            word-break: break-word;
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
            padding: 8px 10px;
            border: 1px solid #e1d5c7;
            background: #faf5ef;
            border-radius: 8px;
          }

          .language-name {
            font-size: 12.5px;
            font-weight: 700;
            color: #2f2c2f;
          }

          .language-level {
            font-size: 11px;
            font-weight: 700;
            color: #8b7660;
            text-transform: uppercase;
            letter-spacing: 0.05em;
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
          ${this.renderProfile(data.summary, i18n)}
          ${this.renderSkills(data.skillsRaw, data.toolsRaw, i18n)}
          ${this.renderExperience(data.experience, i18n, lang)}
          ${this.renderProjects(data.projects, i18n)}
          ${this.renderAchievements(data.achievements, i18n)}
          ${this.renderEducation(data.education, i18n, lang)}
          ${this.renderCertifications(data.certifications, i18n, lang)}
          ${this.renderLanguages(data.languages, i18n)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-peak-v1')) {
    customElements.define('gqr-resume-peak-v1', GQRResumePeakV1);
  }
})();