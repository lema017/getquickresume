(function() {
  'use strict';

  class GQRResumeGustV2 extends HTMLElement {
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

    getI18n() {
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
      };
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

    formatShortDate(dateValue, lang) {
      if (!dateValue) return '';
      const date = new Date(dateValue);
      if (Number.isNaN(date.getTime())) return this.escapeHtml(this.safeStr(dateValue));

      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      return months[date.getMonth()] + ' ' + date.getFullYear();
    }

    formatDateRange(startDate, endDate, isCurrentLike, lang) {
      const i18n = this.getI18n()[lang];
      const start = this.formatShortDate(startDate, lang);
      const end = isCurrentLike ? i18n.present : this.formatShortDate(endDate, lang);

      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `
        <div class="section-head">
          <h2>${this.escapeHtml(title)}</h2>
          <span class="section-line" aria-hidden="true"></span>
        </div>
      `;
    }

    render() {
      const data = this._data || {};
      const lang = this.getLanguage();
      const i18n = this.getI18n()[lang];

      const firstName = this.safeStr(data.firstName);
      const lastName = this.safeStr(data.lastName);
      const profession = this.safeStr(data.profession);
      const email = this.safeStr(data.email);
      const phone = this.safeStr(data.phone);
      const country = this.safeStr(data.country);
      const linkedin = this.safeStr(data.linkedin);
      const summary = this.safeStr(data.summary);

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      const skillsCombined = Array.from(
        new Set(
          [...this.safeArr(data.skillsRaw), ...this.safeArr(data.toolsRaw)]
            .map((item) => this.safeStr(item).trim())
            .filter(Boolean)
        )
      );

      const experience = this.safeArr(data.experience);
      const projects = this.safeArr(data.projects);
      const achievements = this.safeArr(data.achievements);
      const education = this.safeArr(data.education);
      const certifications = this.safeArr(data.certifications);
      const languages = this.safeArr(data.languages);

      const contactItems = [
        email ? `✉ ${this.escapeHtml(email)}` : '',
        phone ? `☎ ${this.escapeHtml(phone)}` : '',
        country ? `⚲ ${this.escapeHtml(country)}` : '',
        linkedin ? `🔗 ${this.escapeHtml(linkedin)}` : ''
      ].filter(Boolean);

      const headerHtml = (fullName || profession || contactItems.length)
        ? `
          <section class="hero" data-section="header">
            <div class="hero-inner">
              ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
              ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
              ${contactItems.length ? `
                <div class="contact-row" data-section="contact">
                  ${contactItems.map((item, idx) => `<span class="contact-chip" data-entry-id="contact-${idx}">${item}</span>`).join('')}
                </div>
              ` : ''}
            </div>
          </section>
        `
        : '';

      const profileHtml = summary
        ? `
          <section class="section" data-section="profile">
            ${this.renderSectionTitle(i18n.profile)}
            <div class="section-body">
              <p class="summary">${this.escapeHtml(summary)}</p>
            </div>
          </section>
        `
        : '';

      const skillsHtml = skillsCombined.length
        ? `
          <section class="section" data-section="skills">
            ${this.renderSectionTitle(i18n.skills)}
            <div class="section-body">
              <div class="pill-grid">
                ${skillsCombined.map((skill, idx) => `
                  <span class="pill" data-entry-id="skill-${idx}">${this.escapeHtml(skill)}</span>
                `).join('')}
              </div>
            </div>
          </section>
        `
        : '';

      const experienceHtml = experience.length
        ? `
          <section class="section" data-section="experience">
            ${this.renderSectionTitle(i18n.experience)}
            <div class="section-body timeline">
              ${experience.map((item, idx) => {
                const id = this.safeStr(item.id) || `experience-${idx}`;
                const title = this.safeStr(item.title);
                const company = this.safeStr(item.company);
                const location = this.safeStr(item.location);
                const bullets = [
                  ...this.safeArr(item.achievements),
                  ...this.safeArr(item.responsibilities)
                ].map((b) => this.safeStr(b).trim()).filter(Boolean);

                const dateRange = this.formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang);
                const metaParts = [company, location].filter(Boolean);

                return `
                  <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                    <div class="entry-top">
                      <div class="entry-main">
                        ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                        ${metaParts.length ? `<div class="entry-subtitle">${this.escapeHtml(metaParts.join(' · '))}</div>` : ''}
                      </div>
                      ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
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
        `
        : '';

      const projectsHtml = projects.length
        ? `
          <section class="section" data-section="projects">
            ${this.renderSectionTitle(i18n.projects)}
            <div class="section-body stack">
              ${projects.map((item, idx) => {
                const id = this.safeStr(item.id) || `project-${idx}`;
                const name = this.safeStr(item.name);
                const description = this.safeStr(item.description);
                const technologies = this.safeArr(item.technologies).map((t) => this.safeStr(t).trim()).filter(Boolean);
                const url = this.safeStr(item.url);

                return `
                  <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                    <div class="entry-top">
                      <div class="entry-main">
                        ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                        ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                      </div>
                    </div>
                    ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                    ${technologies.length ? `
                      <div class="tag-row">
                        ${technologies.map((tech, techIdx) => `
                          <span class="tag" data-entry-id="${this.escapeHtml(id)}-tech-${techIdx}">${this.escapeHtml(tech)}</span>
                        `).join('')}
                      </div>
                    ` : ''}
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      const achievementsHtml = achievements.length
        ? `
          <section class="section" data-section="achievements">
            ${this.renderSectionTitle(i18n.achievements)}
            <div class="section-body stack">
              ${achievements.map((item, idx) => {
                const id = this.safeStr(item.id) || `achievement-${idx}`;
                const title = this.safeStr(item.title);
                const description = this.safeStr(item.description);
                const year = this.safeStr(item.year);

                return `
                  <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
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
        `
        : '';

      const educationHtml = education.length
        ? `
          <section class="section" data-section="education">
            ${this.renderSectionTitle(i18n.education)}
            <div class="section-body stack">
              ${education.map((item, idx) => {
                const id = this.safeStr(item.id) || `education-${idx}`;
                const degree = this.safeStr(item.degree);
                const field = this.safeStr(item.field);
                const institution = this.safeStr(item.institution);
                const gpa = this.safeStr(item.gpa);
                const dateRange = this.formatDateRange(
                  item.startDate,
                  item.endDate,
                  item.isCompleted === false,
                  lang
                );

                const titleParts = [degree, field].filter(Boolean);
                return `
                  <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                    <div class="entry-top">
                      <div class="entry-main">
                        ${titleParts.length ? `<h3 class="entry-title">${this.escapeHtml(titleParts.join(' · '))}</h3>` : ''}
                        ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                      </div>
                      ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                    </div>
                    ${gpa ? `<p class="entry-text">GPA: ${this.escapeHtml(gpa)}</p>` : ''}
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      const certificationsHtml = certifications.length
        ? `
          <section class="section" data-section="certifications">
            ${this.renderSectionTitle(i18n.certifications)}
            <div class="section-body stack">
              ${certifications.map((item, idx) => {
                const id = this.safeStr(item.id) || `certification-${idx}`;
                const name = this.safeStr(item.name);
                const issuer = this.safeStr(item.issuer);
                const date = this.formatShortDate(item.date, lang) || this.safeStr(item.date);

                return `
                  <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
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
        `
        : '';

      const languagesHtml = languages.length
        ? `
          <section class="section" data-section="languages">
            ${this.renderSectionTitle(i18n.languages)}
            <div class="section-body">
              <div class="language-list">
                ${languages.map((item, idx) => {
                  const id = this.safeStr(item.id) || `language-${idx}`;
                  const name = this.safeStr(item.name);
                  const levelKey = this.safeStr(item.level).toLowerCase();
                  const levelLabel = (i18n.levelMap && i18n.levelMap[levelKey]) || this.safeStr(item.level);

                  return `
                    <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                      <span class="language-name">${this.escapeHtml(name)}</span>
                      <span class="language-sep">—</span>
                      <span class="language-level">${this.escapeHtml(levelLabel)}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </section>
        `
        : '';

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #1f2328;
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
            font-family: Arial, Helvetica, sans-serif;
            color: #23272d;
          }

          .hero {
            background: linear-gradient(135deg, #313b4d 0%, #3f4a5e 100%);
            color: #ffffff;
            padding: 36px 40px 30px;
            border-bottom: 6px solid #aeb4bc;
          }

          .hero-inner {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .name {
            margin: 0;
            font-size: 32px;
            line-height: 1.05;
            font-weight: 800;
            letter-spacing: 0.8px;
            text-transform: uppercase;
          }

          .profession {
            margin: 0;
            font-size: 14px;
            line-height: 1.4;
            color: #d9e0e7;
            font-weight: 700;
            letter-spacing: 1.1px;
            text-transform: uppercase;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 10px;
            margin-top: 4px;
          }

          .contact-chip {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 6px 10px;
            border: 1px solid rgba(255,255,255,0.18);
            background: rgba(255,255,255,0.1);
            border-radius: 999px;
            color: #f5f7fa;
            font-size: 12px;
            line-height: 1.2;
          }

          .content {
            padding: 28px 40px 34px;
          }

          .section {
            margin: 0 0 22px;
          }

          .section:last-child {
            margin-bottom: 0;
          }

          .section-head {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 10px;
          }

          .section-head h2 {
            margin: 0;
            color: #313b4d;
            font-size: 16px;
            line-height: 1.2;
            font-weight: 800;
            letter-spacing: 1px;
            text-transform: uppercase;
            white-space: nowrap;
          }

          .section-line {
            display: block;
            height: 1px;
            flex: 1;
            background: linear-gradient(90deg, #8e98a3 0%, #d9dde2 100%);
          }

          .section-body {
            display: block;
          }

          .summary,
          .entry-text {
            margin: 0;
            color: #3f4650;
            font-size: 13px;
            line-height: 1.6;
          }

          .pill-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .pill {
            display: inline-flex;
            align-items: center;
            padding: 7px 10px;
            border-radius: 999px;
            background: #eef1f4;
            border: 1px solid #d7dce2;
            color: #2f3846;
            font-size: 12px;
            line-height: 1.2;
            font-weight: 600;
          }

          .timeline,
          .stack {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            position: relative;
            padding: 0 0 0 14px;
            border-left: 2px solid #d2d7de;
          }

          .entry::before {
            content: '';
            position: absolute;
            left: -5px;
            top: 5px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #4b586f;
          }

          .entry.compact {
            padding-bottom: 2px;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 4px;
          }

          .entry-main {
            flex: 1;
            min-width: 0;
          }

          .entry-title {
            margin: 0;
            color: #1f2328;
            font-size: 14px;
            line-height: 1.35;
            font-weight: 800;
          }

          .entry-subtitle,
          .entry-link {
            margin: 2px 0 0;
            color: #5a6470;
            font-size: 12px;
            line-height: 1.45;
            word-break: break-word;
          }

          .entry-date {
            flex: 0 0 auto;
            color: #4b586f;
            font-size: 11px;
            line-height: 1.4;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            text-align: right;
            white-space: nowrap;
          }

          .bullet-list {
            margin: 6px 0 0 0;
            padding: 0 0 0 18px;
            color: #3f4650;
          }

          .bullet-list li {
            margin: 0 0 4px;
            font-size: 12.5px;
            line-height: 1.55;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
          }

          .tag {
            display: inline-flex;
            align-items: center;
            padding: 5px 8px;
            border-radius: 4px;
            background: #f4f6f8;
            color: #415065;
            border: 1px solid #d8dde4;
            font-size: 11px;
            line-height: 1.2;
            font-weight: 700;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .language-item {
            display: flex;
            align-items: baseline;
            flex-wrap: wrap;
            gap: 6px;
            padding-left: 2px;
          }

          .language-name {
            color: #1f2328;
            font-size: 13px;
            font-weight: 700;
          }

          .language-sep,
          .language-level {
            color: #5a6470;
            font-size: 12.5px;
            line-height: 1.4;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${headerHtml}
          <div class="content">
            ${profileHtml}
            ${skillsHtml}
            ${experienceHtml}
            ${projectsHtml}
            ${achievementsHtml}
            ${educationHtml}
            ${certificationsHtml}
            ${languagesHtml}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-gust-v2')) {
    customElements.define('gqr-resume-gust-v2', GQRResumeGustV2);
  }
})();