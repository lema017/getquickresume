(function() {
  'use strict';

  class GQRResumeOakV3 extends HTMLElement {
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

    formatShortDate(dateInput, lang) {
      if (!dateInput) return '';
      const date = new Date(dateInput);
      if (Number.isNaN(date.getTime())) return this.escapeHtml(this.safeStr(dateInput));

      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };

      return months[lang][date.getMonth()] + ' ' + date.getFullYear();
    }

    formatDateRange(startDate, endDate, lang, isCurrentLike) {
      const i18n = this.getI18n(lang);
      const start = this.formatShortDate(startDate, lang);
      const end = isCurrentLike ? i18n.present : this.formatShortDate(endDate, lang);

      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
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

    renderHeader(d) {
      const firstName = this.escapeHtml(this.safeStr(d.firstName));
      const lastName = this.escapeHtml(this.safeStr(d.lastName));
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      const profession = this.escapeHtml(this.safeStr(d.profession));

      const contactItems = [
        d.email ? `✉ ${this.escapeHtml(this.safeStr(d.email))}` : '',
        d.phone ? `☎ ${this.escapeHtml(this.safeStr(d.phone))}` : '',
        d.country ? `⚲ ${this.escapeHtml(this.safeStr(d.country))}` : '',
        d.linkedin ? `🔗 ${this.escapeHtml(this.safeStr(d.linkedin))}` : ''
      ].filter(Boolean);

      if (!fullName && !profession && contactItems.length === 0) return '';

      return `
        <header class="header-card" data-section="header">
          <div class="header-top">
            ${fullName ? `<h1 class="name">${fullName}</h1>` : ''}
            ${profession ? `<div class="profession">${profession}</div>` : ''}
          </div>
          ${contactItems.length ? `
            <div class="contact-row" data-section="contact">
              ${contactItems.map((item, idx) => `<div class="contact-pill" data-entry-id="contact-${idx}">${item}</div>`).join('')}
            </div>
          ` : ''}
        </header>
      `;
    }

    renderProfile(summary, t) {
      const clean = this.escapeHtml(this.safeStr(summary)).trim();
      if (!clean) return '';
      return `
        <section class="section" data-section="profile">
          <h2 class="section-title">${this.escapeHtml(t.profile)}</h2>
          <div class="section-body">
            <p class="summary">${clean}</p>
          </div>
        </section>
      `;
    }

    renderSkills(skillsRaw, toolsRaw, t) {
      const merged = [...this.safeArr(skillsRaw), ...this.safeArr(toolsRaw)]
        .map((item) => this.safeStr(item).trim())
        .filter(Boolean);

      const unique = [];
      const seen = new Set();
      for (const item of merged) {
        const key = item.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(item);
        }
      }

      if (!unique.length) return '';

      return `
        <section class="section" data-section="skills">
          <h2 class="section-title">${this.escapeHtml(t.skills)}</h2>
          <div class="section-body">
            <div class="skills-grid">
              ${unique.map((skill, idx) => `
                <span class="skill-tag" data-entry-id="skill-${idx}">${this.escapeHtml(skill)}</span>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(items, t, lang) {
      const list = this.safeArr(items).filter(item => item && (
        this.safeStr(item.title) ||
        this.safeStr(item.company) ||
        this.safeStr(item.startDate) ||
        this.safeArr(item.achievements).length ||
        this.safeArr(item.responsibilities).length
      ));

      if (!list.length) return '';

      return `
        <section class="section" data-section="experience">
          <h2 class="section-title">${this.escapeHtml(t.experience)}</h2>
          <div class="section-body">
            ${list.map((item, idx) => {
              const id = this.escapeHtml(this.safeStr(item.id || ('experience-' + idx)));
              const title = this.escapeHtml(this.safeStr(item.title));
              const company = this.escapeHtml(this.safeStr(item.company));
              const location = this.escapeHtml(this.safeStr(item.location));
              const meta = [company, location].filter(Boolean).join(' · ');
              const bullets = [...this.safeArr(item.achievements), ...this.safeArr(item.responsibilities)]
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);
              const dateRange = this.formatDateRange(item.startDate, item.endDate, lang, !!item.isCurrent);

              return `
                <article class="entry" data-entry-id="${id}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${title}</h3>` : ''}
                      ${meta ? `<div class="entry-subtitle">${meta}</div>` : ''}
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

    renderProjects(items, t) {
      const list = this.safeArr(items).filter(item => item && (
        this.safeStr(item.name) ||
        this.safeStr(item.description) ||
        this.safeArr(item.technologies).length ||
        this.safeStr(item.url)
      ));

      if (!list.length) return '';

      return `
        <section class="section" data-section="projects">
          <h2 class="section-title">${this.escapeHtml(t.projects)}</h2>
          <div class="section-body">
            ${list.map((item, idx) => {
              const id = this.escapeHtml(this.safeStr(item.id || ('project-' + idx)));
              const name = this.escapeHtml(this.safeStr(item.name));
              const description = this.escapeHtml(this.safeStr(item.description));
              const technologies = this.safeArr(item.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const url = this.escapeHtml(this.safeStr(item.url));

              return `
                <article class="entry" data-entry-id="${id}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${name}</h3>` : ''}
                      ${url ? `<div class="entry-link">${url}</div>` : ''}
                    </div>
                  </div>
                  ${description ? `<p class="entry-text">${description}</p>` : ''}
                  ${technologies.length ? `
                    <div class="inline-tags">
                      ${technologies.map((tech, techIdx) => `
                        <span class="mini-tag" data-entry-id="${id}-tech-${techIdx}">${this.escapeHtml(tech)}</span>
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

    renderAchievements(items, t) {
      const list = this.safeArr(items).filter(item => item && (
        this.safeStr(item.title) ||
        this.safeStr(item.description) ||
        this.safeStr(item.year)
      ));

      if (!list.length) return '';

      return `
        <section class="section" data-section="achievements">
          <h2 class="section-title">${this.escapeHtml(t.achievements)}</h2>
          <div class="section-body">
            ${list.map((item, idx) => {
              const id = this.escapeHtml(this.safeStr(item.id || ('achievement-' + idx)));
              const title = this.escapeHtml(this.safeStr(item.title));
              const description = this.escapeHtml(this.safeStr(item.description));
              const year = this.escapeHtml(this.safeStr(item.year));

              return `
                <article class="entry compact" data-entry-id="${id}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${title}</h3>` : ''}
                    </div>
                    ${year ? `<div class="entry-date">${year}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${description}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducation(items, t, lang) {
      const list = this.safeArr(items).filter(item => item && (
        this.safeStr(item.degree) ||
        this.safeStr(item.field) ||
        this.safeStr(item.institution) ||
        this.safeStr(item.startDate)
      ));

      if (!list.length) return '';

      return `
        <section class="section" data-section="education">
          <h2 class="section-title">${this.escapeHtml(t.education)}</h2>
          <div class="section-body">
            ${list.map((item, idx) => {
              const id = this.escapeHtml(this.safeStr(item.id || ('education-' + idx)));
              const degree = this.escapeHtml(this.safeStr(item.degree));
              const field = this.escapeHtml(this.safeStr(item.field));
              const institution = this.escapeHtml(this.safeStr(item.institution));
              const gpa = this.escapeHtml(this.safeStr(item.gpa));
              const title = [degree, field].filter(Boolean).join(' — ');
              const dateRange = this.formatDateRange(item.startDate, item.endDate, lang, item.isCompleted === false);

              return `
                <article class="entry" data-entry-id="${id}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${title}</h3>` : ''}
                      ${institution ? `<div class="entry-subtitle">${institution}${gpa ? ` · GPA: ${gpa}` : ''}</div>` : (gpa ? `<div class="entry-subtitle">GPA: ${gpa}</div>` : '')}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(items, t, lang) {
      const list = this.safeArr(items).filter(item => item && (
        this.safeStr(item.name) ||
        this.safeStr(item.issuer) ||
        this.safeStr(item.date)
      ));

      if (!list.length) return '';

      return `
        <section class="section" data-section="certifications">
          <h2 class="section-title">${this.escapeHtml(t.certifications)}</h2>
          <div class="section-body">
            ${list.map((item, idx) => {
              const id = this.escapeHtml(this.safeStr(item.id || ('certification-' + idx)));
              const name = this.escapeHtml(this.safeStr(item.name));
              const issuer = this.escapeHtml(this.safeStr(item.issuer));
              const date = item.date ? this.formatShortDate(item.date, lang) : '';

              return `
                <article class="entry compact" data-entry-id="${id}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${name}</h3>` : ''}
                      ${issuer ? `<div class="entry-subtitle">${issuer}</div>` : ''}
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

    renderLanguages(items, t) {
      const list = this.safeArr(items).filter(item => item && (
        this.safeStr(item.name) || this.safeStr(item.level)
      ));

      if (!list.length) return '';

      return `
        <section class="section" data-section="languages">
          <h2 class="section-title">${this.escapeHtml(t.languages)}</h2>
          <div class="section-body">
            <div class="language-list">
              ${list.map((item, idx) => {
                const id = this.escapeHtml(this.safeStr(item.id || ('language-' + idx)));
                const name = this.escapeHtml(this.safeStr(item.name));
                const levelKey = this.safeStr(item.level).toLowerCase();
                const level = this.escapeHtml(this.safeStr(t.levelMap[levelKey] || item.level));
                return `
                  <div class="language-item" data-entry-id="${id}">
                    <span class="language-name">${name}</span>
                    <span class="language-sep">—</span>
                    <span class="language-level">${level}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </section>
      `;
    }

    render() {
      const d = this._data || {};
      const lang = this.getLanguage();
      const t = this.getI18n(lang);

      const html = `
        <style>
          :host {
            display: block;
            color: #243133;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-family: Arial, Helvetica, sans-serif;
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
            padding: 18mm 16mm 18mm 16mm;
            background: #f7f7f4;
            color: #243133;
          }

          .header-card {
            background: #aebfbd;
            color: #ffffff;
            padding: 22px 24px 18px;
            border-radius: 0;
            margin-bottom: 22px;
          }

          .header-top {
            display: block;
          }

          .name {
            margin: 0;
            font-size: 36px;
            line-height: 0.95;
            font-weight: 800;
            letter-spacing: 0.6px;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 10px;
            font-size: 14px;
            line-height: 1.3;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            opacity: 0.95;
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
            padding: 6px 10px;
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.3);
            font-size: 11px;
            line-height: 1.2;
            letter-spacing: 0.2px;
          }

          .section {
            margin-top: 18px;
            padding-top: 2px;
          }

          .section:first-of-type {
            margin-top: 0;
          }

          .section-title {
            position: relative;
            margin: 0 0 12px;
            color: #314849;
            font-size: 19px;
            line-height: 1.1;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.7px;
            display: inline-block;
            padding-bottom: 5px;
          }

          .section-title::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 54px;
            height: 4px;
            background: #aebfbd;
          }

          .section-body {
            background: #ffffff;
            padding: 14px 16px 12px;
            border-left: 4px solid #d6dfde;
          }

          .summary,
          .entry-text {
            margin: 0;
            font-size: 12.4px;
            line-height: 1.65;
            color: #334142;
          }

          .entry {
            padding: 2px 0 12px;
            border-bottom: 1px solid #e6eceb;
            margin-bottom: 12px;
          }

          .entry:last-child {
            border-bottom: 0;
            margin-bottom: 0;
            padding-bottom: 0;
          }

          .entry.compact {
            padding-bottom: 10px;
            margin-bottom: 10px;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 6px;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            color: #243133;
            font-size: 15px;
            line-height: 1.3;
            font-weight: 800;
          }

          .entry-subtitle,
          .entry-link {
            margin-top: 3px;
            color: #69807f;
            font-size: 11.5px;
            line-height: 1.45;
            font-weight: 600;
          }

          .entry-link {
            word-break: break-word;
          }

          .entry-date {
            white-space: nowrap;
            color: #516766;
            font-size: 11.5px;
            line-height: 1.3;
            font-weight: 700;
            padding-top: 1px;
          }

          .bullet-list {
            margin: 6px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 0 0 5px;
            color: #334142;
            font-size: 12.1px;
            line-height: 1.55;
          }

          .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-tag,
          .mini-tag {
            display: inline-block;
            background: #eef2f1;
            color: #314849;
            border: 1px solid #d6dfde;
            padding: 6px 10px;
            font-size: 11.5px;
            line-height: 1.2;
            font-weight: 700;
            letter-spacing: 0.2px;
          }

          .mini-tag {
            background: #f5f7f6;
            font-size: 10.8px;
            margin-right: 6px;
            margin-top: 6px;
          }

          .inline-tags {
            margin-top: 6px;
          }

          .language-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px 20px;
          }

          .language-item {
            font-size: 12.2px;
            line-height: 1.45;
            color: #334142;
          }

          .language-name {
            font-weight: 800;
            color: #243133;
          }

          .language-sep {
            margin: 0 6px;
            color: #8ca19f;
          }

          .language-level {
            font-weight: 600;
            color: #5d7271;
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
          ${this.renderProfile(d.summary, t)}
          ${this.renderSkills(d.skillsRaw, d.toolsRaw, t)}
          ${this.renderExperience(d.experience, t, lang)}
          ${this.renderProjects(d.projects, t)}
          ${this.renderAchievements(d.achievements, t)}
          ${this.renderEducation(d.education, t, lang)}
          ${this.renderCertifications(d.certifications, t, lang)}
          ${this.renderLanguages(d.languages, t)}
        </div>
      `;

      this.shadowRoot.innerHTML = html;
    }
  }

  if (!customElements.get('gqr-resume-oak-v3')) {
    customElements.define('gqr-resume-oak-v3', GQRResumeOakV3);
  }
})();