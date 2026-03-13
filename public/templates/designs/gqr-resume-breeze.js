(function() {
  'use strict';

  class GQRResumeBreeze extends HTMLElement {
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
      const lang = (attrLang || dataLang || 'en').toLowerCase();
      return lang === 'es' ? 'es' : 'en';
    }

    safeStr(v) {
      return v == null ? '' : String(v).trim();
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
      if (isNaN(date.getTime())) return this.escapeHtml(value);
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };
      return months[lang][date.getMonth()] + ' ' + date.getFullYear();
    }

    formatDateRange(startDate, endDate, lang, currentFlag, isEducation) {
      const i18n = this.getI18n(lang);
      const start = this.formatShortDate(startDate, lang);
      let end = '';

      if (isEducation) {
        if (currentFlag === false) {
          end = i18n.present;
        } else {
          end = this.formatShortDate(endDate, lang);
        }
      } else {
        end = currentFlag ? i18n.present : this.formatShortDate(endDate, lang);
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
          education: 'Estudios',
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

    renderSectionTitle(title) {
      return `
        <div class="section-heading">
          <h2>${this.escapeHtml(title)}</h2>
        </div>
      `;
    }

    renderHeader(data) {
      const firstName = this.safeStr(data.firstName);
      const lastName = this.safeStr(data.lastName);
      const profession = this.safeStr(data.profession);
      const email = this.safeStr(data.email);
      const phone = this.safeStr(data.phone);
      const country = this.safeStr(data.country);
      const linkedin = this.safeStr(data.linkedin);

      const fullName = [firstName, lastName].filter(Boolean).join(' ');
      const contacts = [
        email ? `<span class="contact-pill">✉ ${this.escapeHtml(email)}</span>` : '',
        phone ? `<span class="contact-pill">☎ ${this.escapeHtml(phone)}</span>` : '',
        country ? `<span class="contact-pill">⚲ ${this.escapeHtml(country)}</span>` : '',
        linkedin ? `<span class="contact-pill">🔗 ${this.escapeHtml(linkedin)}</span>` : ''
      ].filter(Boolean).join('');

      if (!fullName && !profession && !contacts) return '';

      return `
        <section class="header" data-section="header">
          <div class="header-inner">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
            ${contacts ? `<div class="contact-row" data-section="contact">${contacts}</div>` : ''}
          </div>
        </section>
      `;
    }

    renderProfile(data, i18n) {
      const summary = this.safeStr(data.summary);
      if (!summary) return '';
      return `
        <section class="section" data-section="profile">
          ${this.renderSectionTitle(i18n.profile)}
          <div class="section-body">
            <p class="profile-text">${this.escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(data, i18n) {
      const skills = this.safeArr(data.skillsRaw);
      const tools = this.safeArr(data.toolsRaw);
      const combined = Array.from(new Set(
        skills.concat(tools).map((item) => this.safeStr(item)).filter(Boolean)
      ));

      if (!combined.length) return '';

      return `
        <section class="section" data-section="skills">
          ${this.renderSectionTitle(i18n.skills)}
          <div class="section-body">
            <div class="skills-grid">
              ${combined.map((skill, index) => `
                <span class="skill-chip" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
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
              const id = this.safeStr(item.id) || ('experience-' + index);
              const title = this.safeStr(item.title);
              const company = this.safeStr(item.company);
              const location = this.safeStr(item.location);
              const range = this.formatDateRange(item.startDate, item.endDate, lang, !!item.isCurrent, false);
              const bullets = this.safeArr(item.achievements)
                .concat(this.safeArr(item.responsibilities))
                .map((b) => this.safeStr(b))
                .filter(Boolean);

              const metaParts = [company, location].filter(Boolean);

              if (!title && !metaParts.length && !range && !bullets.length) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${metaParts.length ? `<div class="entry-subtitle">${this.escapeHtml(metaParts.join(' · '))}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${bullets.length ? `
                    <ul class="bullet-list">
                      ${bullets.map((bullet) => `<li>${this.escapeHtml(bullet)}</li>`).join('')}
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
          <div class="section-body stacked-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id) || ('project-' + index);
              const name = this.safeStr(item.name);
              const description = this.safeStr(item.description);
              const technologies = this.safeArr(item.technologies).map((t) => this.safeStr(t)).filter(Boolean);
              const url = this.safeStr(item.url);

              if (!name && !description && !technologies.length && !url) return '';

              return `
                <article class="entry project-entry" data-entry-id="${this.escapeHtml(id)}">
                  ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map((tech) => `<span class="mini-tag">${this.escapeHtml(tech)}</span>`).join('')}
                    </div>
                  ` : ''}
                  ${url ? `<div class="project-link">${this.escapeHtml(url)}</div>` : ''}
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
          <div class="section-body stacked-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id) || ('achievement-' + index);
              const title = this.safeStr(item.title);
              const description = this.safeStr(item.description);
              const year = this.safeStr(item.year);

              if (!title && !description && !year) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
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

    renderEducation(data, i18n, lang) {
      const items = this.safeArr(data.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          ${this.renderSectionTitle(i18n.education)}
          <div class="section-body timeline">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id) || ('education-' + index);
              const degree = this.safeStr(item.degree);
              const field = this.safeStr(item.field);
              const institution = this.safeStr(item.institution);
              const gpa = this.safeStr(item.gpa);
              const range = this.formatDateRange(item.startDate, item.endDate, lang, item.isCompleted, true);
              const title = [degree, field].filter(Boolean).join(' — ');

              if (!title && !institution && !gpa && !range) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${gpa ? `<p class="entry-text">GPA: ${this.escapeHtml(gpa)}</p>` : ''}
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
          <div class="section-body stacked-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id) || ('certification-' + index);
              const name = this.safeStr(item.name);
              const issuer = this.safeStr(item.issuer);
              const date = item.date ? this.formatShortDate(item.date, lang) : '';

              if (!name && !issuer && !date) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
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

    renderLanguages(data, i18n) {
      const items = this.safeArr(data.languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          ${this.renderSectionTitle(i18n.languages)}
          <div class="section-body">
            <div class="language-list">
              ${items.map((item, index) => {
                const id = this.safeStr(item.id) || ('language-' + index);
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
      const data = this._data || {};
      const lang = this.getLanguage();
      const i18n = this.getI18n(lang);

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #243234;
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
            color: #273537;
            line-height: 1.45;
          }

          .header {
            margin: -34px -36px 28px;
            background: #aec2c2;
            color: #ffffff;
            padding: 34px 36px 26px;
            border-bottom: 5px solid #7c9a9a;
          }

          .header-inner {
            display: block;
          }

          .name {
            margin: 0;
            font-size: 33px;
            line-height: 1.02;
            font-weight: 800;
            letter-spacing: 0.8px;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 8px;
            font-size: 15px;
            font-style: italic;
            font-weight: 700;
            letter-spacing: 0.4px;
            text-transform: uppercase;
            color: rgba(255,255,255,0.95);
          }

          .contact-row {
            margin-top: 18px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px 10px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            padding: 6px 10px;
            background: rgba(255,255,255,0.18);
            border: 1px solid rgba(255,255,255,0.28);
            border-radius: 999px;
            font-size: 12px;
            line-height: 1.2;
            color: #ffffff;
          }

          .section {
            margin-top: 22px;
          }

          .section:first-of-type {
            margin-top: 0;
          }

          .section-heading {
            margin-bottom: 12px;
          }

          .section-heading h2 {
            margin: 0;
            display: inline-block;
            font-size: 19px;
            line-height: 1.1;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            color: #2d4144;
            position: relative;
            padding-bottom: 6px;
          }

          .section-heading h2::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 54px;
            height: 6px;
            background: #d9e4e4;
            border-left: 4px solid #7c9a9a;
          }

          .section-body {
            font-size: 13px;
          }

          .profile-text,
          .entry-text {
            margin: 0;
            color: #3d4d50;
          }

          .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 9px 10px;
          }

          .skill-chip,
          .mini-tag {
            display: inline-block;
            padding: 6px 10px;
            border-radius: 999px;
            background: #eef3f3;
            border: 1px solid #d6e0e0;
            color: #314245;
            font-size: 12px;
            font-weight: 700;
          }

          .timeline,
          .stacked-list {
            display: block;
          }

          .entry {
            position: relative;
            padding: 0 0 14px 16px;
            margin: 0 0 14px 0;
            border-left: 2px solid #d7e2e2;
          }

          .entry::before {
            content: "";
            position: absolute;
            left: -5px;
            top: 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #7c9a9a;
          }

          .entry:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-size: 15px;
            line-height: 1.25;
            font-weight: 800;
            color: #243234;
          }

          .entry-subtitle {
            margin-top: 2px;
            font-size: 12px;
            color: #65777a;
            font-weight: 700;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 11px;
            line-height: 1.3;
            color: #6f8788;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.3px;
            text-align: right;
            white-space: nowrap;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
            color: #3a4a4d;
          }

          .bullet-list li {
            margin: 0 0 4px 0;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .tag-row {
            margin-top: 8px;
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
          }

          .project-link {
            margin-top: 8px;
            font-size: 12px;
            color: #5d7c7c;
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
            align-items: baseline;
            gap: 6px;
            font-size: 13px;
          }

          .language-name {
            font-weight: 800;
            color: #243234;
          }

          .language-sep,
          .language-level {
            color: #5d7073;
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
          ${this.renderProfile(data, i18n)}
          ${this.renderSkills(data, i18n)}
          ${this.renderExperience(data, i18n, lang)}
          ${this.renderProjects(data, i18n)}
          ${this.renderAchievements(data, i18n)}
          ${this.renderEducation(data, i18n, lang)}
          ${this.renderCertifications(data, i18n, lang)}
          ${this.renderLanguages(data, i18n)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-breeze')) {
    customElements.define('gqr-resume-breeze', GQRResumeBreeze);
  }
})();