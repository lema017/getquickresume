(function() {
  'use strict';

  class GQRResumeFrostV1 extends HTMLElement {
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
      return (attrLang === 'es' || attrLang === 'en')
        ? attrLang
        : (dataLang === 'es' || dataLang === 'en' ? dataLang : 'en');
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

    formatDate(dateInput, lang) {
      if (!dateInput) return '';
      const date = new Date(dateInput);
      if (Number.isNaN(date.getTime())) {
        return this.escapeHtml(this.safeStr(dateInput));
      }
      return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
        month: 'short',
        year: 'numeric'
      }).format(date);
    }

    formatDateRange(startDate, endDate, lang, isCurrentLike) {
      const i18n = this.getI18n(lang);
      const start = this.formatDate(startDate, lang);
      const end = isCurrentLike ? i18n.present : this.formatDate(endDate, lang);
      if (start && end) return `${start} — ${end}`;
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
          experience: 'Experiencia Laboral',
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
      }[lang] || {
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
      };
    }

    renderHeader(d) {
      const firstName = this.safeStr(d.firstName);
      const lastName = this.safeStr(d.lastName);
      const fullName = `${firstName} ${lastName}`.trim();
      const profession = this.safeStr(d.profession);

      const contacts = [
        d.email ? `✉ ${this.escapeHtml(d.email)}` : '',
        d.phone ? `☎ ${this.escapeHtml(d.phone)}` : '',
        d.country ? `⚲ ${this.escapeHtml(d.country)}` : '',
        d.linkedin ? `🔗 ${this.escapeHtml(d.linkedin)}` : ''
      ].filter(Boolean);

      if (!fullName && !profession && !contacts.length) return '';

      return `
        <header class="header-block">
          <section class="section header-section" data-section="header">
            <div class="header-topline"></div>
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </section>
          ${contacts.length ? `
            <section class="section contact-section" data-section="contact">
              <div class="contact-row">
                ${contacts.map((item, index) => `
                  <span class="contact-item" data-entry-id="contact-${index}">${item}</span>
                `).join('')}
              </div>
            </section>
          ` : ''}
        </header>
      `;
    }

    renderProfile(summary, i18n) {
      const text = this.safeStr(summary).trim();
      if (!text) return '';
      return `
        <section class="section" data-section="profile">
          <h2 class="section-title">${this.escapeHtml(i18n.profile)}</h2>
          <div class="section-body">
            <p class="profile-text">${this.escapeHtml(text)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(skillsRaw, toolsRaw, i18n) {
      const combined = [...this.safeArr(skillsRaw), ...this.safeArr(toolsRaw)]
        .map(v => this.safeStr(v).trim())
        .filter(Boolean);

      const unique = Array.from(new Set(combined.map(v => v.toLowerCase())))
        .map(lower => combined.find(v => v.toLowerCase() === lower));

      if (!unique.length) return '';

      return `
        <section class="section" data-section="skills">
          <h2 class="section-title">${this.escapeHtml(i18n.skills)}</h2>
          <div class="section-body">
            <div class="skills-list">
              ${unique.map((skill, index) => `
                <span class="skill-pill" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
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
              const subtitleParts = [company, location].filter(Boolean);
              const dateRange = this.formatDateRange(item.startDate, item.endDate, lang, !!item.isCurrent);
              const bullets = [
                ...this.safeArr(item.achievements),
                ...this.safeArr(item.responsibilities)
              ].map(v => this.safeStr(v).trim()).filter(Boolean);

              if (!title && !subtitleParts.length && !dateRange && !bullets.length) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${subtitleParts.length ? `<div class="entry-subtitle">${this.escapeHtml(subtitleParts.join(' · '))}</div>` : ''}
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
              const technologies = this.safeArr(item.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const url = this.safeStr(item.url);

              if (!name && !description && !technologies.length && !url) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="meta-line">
                      <span class="meta-label">Tech:</span>
                      <span>${this.escapeHtml(technologies.join(', '))}</span>
                    </div>
                  ` : ''}
                  ${url ? `
                    <div class="meta-line">
                      <span class="meta-label">URL:</span>
                      <span class="link-text">${this.escapeHtml(url)}</span>
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

              if (!title && !description && !year) return '';

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
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
              const title = [degree, field].filter(Boolean).join(' — ');
              const dateRange = this.formatDateRange(
                item.startDate,
                item.endDate,
                lang,
                item.isCompleted === false
              );

              if (!title && !institution && !gpa && !dateRange) return '';

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${gpa ? `<div class="meta-line"><span class="meta-label">GPA:</span> <span>${this.escapeHtml(gpa)}</span></div>` : ''}
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
              const date = this.formatDate(item.date, lang);

              if (!name && !issuer && !date) return '';

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                      ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
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
                const level = i18n.levelMap[levelKey] || this.safeStr(item.level);

                if (!name && !level) return '';

                return `
                  <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                    <span class="language-name">${this.escapeHtml(name)}</span>
                    <span class="language-sep">—</span>
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
      const d = this._data || {};
      const lang = this.getLanguage();
      const i18n = this.getI18n(lang);

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2f312f;
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
            background: #fbfbf9;
            padding: 38px 40px 42px;
            margin: 0 auto;
          }

          .header-block {
            margin-bottom: 24px;
          }

          .header-section {
            padding-bottom: 6px;
          }

          .header-topline {
            width: 78px;
            height: 4px;
            background: #cfcac2;
            margin-bottom: 16px;
            border-radius: 2px;
          }

          .name {
            margin: 0;
            font-size: 34px;
            line-height: 1.05;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #2c2d2b;
          }

          .profession {
            margin-top: 8px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.22em;
            color: #6e706c;
          }

          .contact-section {
            margin-top: 10px;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 10px;
          }

          .contact-item {
            display: inline-flex;
            align-items: center;
            font-size: 12px;
            color: #4e514d;
            background: #efede8;
            border: 1px solid #e1ddd6;
            border-radius: 999px;
            padding: 6px 10px;
          }

          .section {
            margin-top: 20px;
          }

          .section-title {
            margin: 0 0 12px 0;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            color: #5f625d;
            position: relative;
            padding-bottom: 8px;
            border-bottom: 1px solid #dedad3;
          }

          .section-body {
            width: 100%;
          }

          .profile-text,
          .entry-text {
            margin: 0;
            font-size: 13px;
            line-height: 1.65;
            color: #3c3f3b;
          }

          .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-pill {
            display: inline-flex;
            align-items: center;
            padding: 7px 10px;
            border: 1px solid #dad6cf;
            background: #f3f1ec;
            color: #353733;
            border-radius: 4px;
            font-size: 12px;
            line-height: 1.2;
          }

          .stack {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .entry {
            padding: 0 0 12px 0;
            border-bottom: 1px solid #ece8e2;
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
            gap: 16px;
            margin-bottom: 6px;
          }

          .entry-main {
            flex: 1 1 auto;
            min-width: 0;
          }

          .entry-title {
            margin: 0;
            font-size: 15px;
            line-height: 1.35;
            font-weight: 700;
            color: #2d2f2c;
          }

          .entry-subtitle {
            margin-top: 3px;
            font-size: 12.5px;
            line-height: 1.45;
            color: #696c67;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 11.5px;
            line-height: 1.4;
            color: #7a7d77;
            white-space: nowrap;
            border: 1px solid #dfdbd4;
            background: #f4f2ee;
            border-radius: 999px;
            padding: 4px 9px;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding: 0 0 0 18px;
          }

          .bullet-list li {
            margin: 0 0 5px 0;
            font-size: 12.8px;
            line-height: 1.55;
            color: #3b3e3a;
          }

          .meta-line {
            margin-top: 6px;
            font-size: 12.5px;
            line-height: 1.55;
            color: #444743;
          }

          .meta-label {
            font-weight: 700;
            color: #5c5f5a;
          }

          .link-text {
            word-break: break-word;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .language-item {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            font-size: 13px;
            line-height: 1.5;
            color: #353834;
            padding-bottom: 6px;
            border-bottom: 1px dashed #e7e2db;
          }

          .language-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .language-name {
            font-weight: 700;
          }

          .language-sep,
          .language-level {
            color: #656863;
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
          ${this.renderProfile(d.summary, i18n)}
          ${this.renderSkills(d.skillsRaw, d.toolsRaw, i18n)}
          ${this.renderExperience(d.experience, i18n, lang)}
          ${this.renderProjects(d.projects, i18n)}
          ${this.renderAchievements(d.achievements, i18n)}
          ${this.renderEducation(d.education, i18n, lang)}
          ${this.renderCertifications(d.certifications, i18n, lang)}
          ${this.renderLanguages(d.languages, i18n)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-frost-v1')) {
    customElements.define('gqr-resume-frost-v1', GQRResumeFrostV1);
  }
})();