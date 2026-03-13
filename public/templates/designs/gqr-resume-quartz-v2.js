(function() {
  'use strict';

  class GQRResumeQuartzV2 extends HTMLElement {
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

    formatDateRange(startDate, endDate, lang, isPresentLike) {
      const start = this.formatShortDate(startDate, lang);
      const end = isPresentLike
        ? this.i18n[lang].present
        : this.formatShortDate(endDate, lang);

      if (start && end) return start + ' — ' + end;
      return start || end || '';
    }

    renderSectionTitle(title) {
      return `
        <div class="section-head">
          <h2 class="section-title">${this.escapeHtml(title)}</h2>
          <div class="section-rule"></div>
        </div>
      `;
    }

    render() {
      const lang = this.getLanguage();
      const t = this.i18n[lang];
      const d = this._data || {};

      const firstName = this.safeStr(d.firstName);
      const lastName = this.safeStr(d.lastName);
      const profession = this.safeStr(d.profession);
      const email = this.safeStr(d.email);
      const phone = this.safeStr(d.phone);
      const country = this.safeStr(d.country);
      const linkedin = this.safeStr(d.linkedin);
      const summary = this.safeStr(d.summary);

      const skillsCombined = Array.from(
        new Set(
          [...this.safeArr(d.skillsRaw), ...this.safeArr(d.toolsRaw)]
            .map((item) => this.safeStr(item).trim())
            .filter(Boolean)
        )
      );

      const experience = this.safeArr(d.experience);
      const projects = this.safeArr(d.projects);
      const achievements = this.safeArr(d.achievements);
      const education = this.safeArr(d.education);
      const certifications = this.safeArr(d.certifications);
      const languages = this.safeArr(d.languages);

      const contactItems = [
        email ? `✉ ${this.escapeHtml(email)}` : '',
        phone ? `☎ ${this.escapeHtml(phone)}` : '',
        country ? `⚲ ${this.escapeHtml(country)}` : '',
        linkedin ? `🔗 ${this.escapeHtml(linkedin)}` : ''
      ].filter(Boolean);

      const headerBlock = (firstName || lastName || profession || contactItems.length)
        ? `
          <section class="header" data-section="header">
            <div class="top-accent"></div>
            <div class="identity">
              <h1 class="name">${this.escapeHtml((firstName + ' ' + lastName).trim())}</h1>
              ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
            </div>
            ${contactItems.length ? `
              <div class="contact" data-section="contact">
                ${contactItems.map((item, index) => `
                  <div class="contact-item" data-entry-id="contact-${index}">${item}</div>
                `).join('')}
              </div>
            ` : ''}
          </section>
        `
        : '';

      const profileBlock = summary
        ? `
          <section class="section" data-section="profile">
            ${this.renderSectionTitle(t.profile)}
            <div class="profile-text">${this.escapeHtml(summary)}</div>
          </section>
        `
        : '';

      const skillsBlock = skillsCombined.length
        ? `
          <section class="section" data-section="skills">
            ${this.renderSectionTitle(t.skills)}
            <div class="skill-list">
              ${skillsCombined.map((skill, index) => `
                <span class="skill-pill" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
              `).join('')}
            </div>
          </section>
        `
        : '';

      const experienceBlock = experience.length
        ? `
          <section class="section" data-section="experience">
            ${this.renderSectionTitle(t.experience)}
            <div class="entry-list">
              ${experience.map((item, index) => {
                const id = this.safeStr(item.id) || `experience-${index}`;
                const bullets = [
                  ...this.safeArr(item.achievements),
                  ...this.safeArr(item.responsibilities)
                ]
                  .map((b) => this.safeStr(b).trim())
                  .filter(Boolean);

                const role = this.safeStr(item.title);
                const company = this.safeStr(item.company);
                const location = this.safeStr(item.location);
                const range = this.formatDateRange(item.startDate, item.endDate, lang, !!item.isCurrent);

                return `
                  <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                    <div class="entry-header">
                      <div class="entry-main">
                        <div class="entry-title">${this.escapeHtml(role)}</div>
                        <div class="entry-subtitle">
                          ${this.escapeHtml(company)}${location ? ` · ${this.escapeHtml(location)}` : ''}
                        </div>
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
        `
        : '';

      const projectsBlock = projects.length
        ? `
          <section class="section" data-section="projects">
            ${this.renderSectionTitle(t.projects)}
            <div class="entry-list">
              ${projects.map((item, index) => {
                const id = this.safeStr(item.id) || `project-${index}`;
                const name = this.safeStr(item.name);
                const description = this.safeStr(item.description);
                const technologies = this.safeArr(item.technologies)
                  .map((tech) => this.safeStr(tech).trim())
                  .filter(Boolean);
                const url = this.safeStr(item.url);

                return `
                  <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                    <div class="entry-header stack">
                      <div class="entry-main">
                        <div class="entry-title">${this.escapeHtml(name)}</div>
                        ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                      </div>
                    </div>
                    ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                    ${technologies.length ? `
                      <div class="meta-tags">
                        ${technologies.map((tech, techIndex) => `
                          <span class="meta-tag" data-entry-id="${this.escapeHtml(id)}-tech-${techIndex}">${this.escapeHtml(tech)}</span>
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

      const achievementsBlock = achievements.length
        ? `
          <section class="section" data-section="achievements">
            ${this.renderSectionTitle(t.achievements)}
            <div class="entry-list">
              ${achievements.map((item, index) => {
                const id = this.safeStr(item.id) || `achievement-${index}`;
                const title = this.safeStr(item.title);
                const description = this.safeStr(item.description);
                const year = this.safeStr(item.year);

                return `
                  <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                    <div class="entry-header">
                      <div class="entry-main">
                        <div class="entry-title">${this.escapeHtml(title)}</div>
                      </div>
                      ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                    </div>
                    ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      const educationBlock = education.length
        ? `
          <section class="section" data-section="education">
            ${this.renderSectionTitle(t.education)}
            <div class="entry-list">
              ${education.map((item, index) => {
                const id = this.safeStr(item.id) || `education-${index}`;
                const degree = this.safeStr(item.degree);
                const field = this.safeStr(item.field);
                const institution = this.safeStr(item.institution);
                const gpa = this.safeStr(item.gpa);
                const titleLine = [degree, field].filter(Boolean).join(' — ');
                const range = this.formatDateRange(
                  item.startDate,
                  item.endDate,
                  lang,
                  item.isCompleted === false
                );

                return `
                  <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                    <div class="entry-header">
                      <div class="entry-main">
                        <div class="entry-title">${this.escapeHtml(titleLine || degree || field)}</div>
                        ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                      </div>
                      ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                    </div>
                    ${gpa ? `<div class="entry-text">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      const certificationsBlock = certifications.length
        ? `
          <section class="section" data-section="certifications">
            ${this.renderSectionTitle(t.certifications)}
            <div class="entry-list">
              ${certifications.map((item, index) => {
                const id = this.safeStr(item.id) || `certification-${index}`;
                const name = this.safeStr(item.name);
                const issuer = this.safeStr(item.issuer);
                const date = this.formatShortDate(item.date, lang);

                return `
                  <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                    <div class="entry-header">
                      <div class="entry-main">
                        <div class="entry-title">${this.escapeHtml(name)}</div>
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

      const languagesBlock = languages.length
        ? `
          <section class="section" data-section="languages">
            ${this.renderSectionTitle(t.languages)}
            <div class="language-list">
              ${languages.map((item, index) => {
                const id = this.safeStr(item.id) || `language-${index}`;
                const name = this.safeStr(item.name);
                const levelKey = this.safeStr(item.level).toLowerCase();
                const translatedLevel = t.levelMap[levelKey] || levelKey;
                return `
                  <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                    <span class="language-name">${this.escapeHtml(name)}</span>
                    <span class="language-sep">—</span>
                    <span class="language-level">${this.escapeHtml(translatedLevel)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2f3133;
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
            padding: 34px 38px 38px;
            background: #ffffff;
            font-family: Arial, Helvetica, sans-serif;
            color: #2f3133;
            line-height: 1.45;
          }

          .header {
            margin-bottom: 22px;
          }

          .top-accent {
            width: 100%;
            height: 9px;
            background: linear-gradient(90deg, #b8bebd 0%, #d9dddc 55%, #f0f2f1 100%);
            border-radius: 999px;
            margin-bottom: 18px;
          }

          .identity {
            margin-bottom: 12px;
          }

          .name {
            margin: 0;
            font-size: 31px;
            line-height: 1.08;
            font-weight: 800;
            letter-spacing: 1.8px;
            text-transform: uppercase;
            color: #2f3133;
          }

          .profession {
            margin-top: 6px;
            font-size: 12px;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            color: #7c8383;
            font-weight: 600;
          }

          .contact {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 10px;
            padding-top: 10px;
            border-top: 1px solid #d6d9d8;
          }

          .contact-item {
            font-size: 11px;
            color: #4a4d50;
            background: #f4f5f5;
            border: 1px solid #d9dddc;
            border-radius: 999px;
            padding: 5px 10px;
          }

          .section {
            margin-top: 18px;
          }

          .section-head {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 10px;
          }

          .section-title {
            margin: 0;
            font-size: 16px;
            font-weight: 800;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            color: #34373a;
            white-space: nowrap;
          }

          .section-rule {
            height: 1px;
            flex: 1;
            background: #cfd4d3;
          }

          .profile-text,
          .entry-text {
            font-size: 12px;
            color: #43474a;
          }

          .skill-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-pill,
          .meta-tag {
            display: inline-flex;
            align-items: center;
            min-height: 24px;
            padding: 5px 10px;
            border-radius: 999px;
            background: #f2f4f3;
            border: 1px solid #d7dcdb;
            color: #3f4346;
            font-size: 11px;
            font-weight: 600;
          }

          .entry-list {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            padding-bottom: 12px;
            border-bottom: 1px solid #ecefee;
          }

          .entry.compact:last-child,
          .entry:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .entry-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 5px;
          }

          .entry-header.stack {
            display: block;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            font-size: 14px;
            font-weight: 700;
            color: #2f3133;
          }

          .entry-subtitle,
          .entry-link {
            margin-top: 2px;
            font-size: 11px;
            color: #707679;
          }

          .entry-link {
            word-break: break-word;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 11px;
            font-weight: 700;
            color: #5f6668;
            white-space: nowrap;
            letter-spacing: 0.2px;
          }

          .bullet-list {
            margin: 6px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 0 0 4px 0;
            font-size: 12px;
            color: #43474a;
          }

          .meta-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            margin-top: 8px;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .language-item {
            display: flex;
            align-items: baseline;
            gap: 8px;
            padding-bottom: 7px;
            border-bottom: 1px dashed #dde1e0;
            font-size: 12px;
          }

          .language-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .language-name {
            font-weight: 700;
            color: #303336;
          }

          .language-sep,
          .language-level {
            color: #666d70;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${headerBlock}
          ${profileBlock}
          ${skillsBlock}
          ${experienceBlock}
          ${projectsBlock}
          ${achievementsBlock}
          ${educationBlock}
          ${certificationsBlock}
          ${languagesBlock}
        </div>
      `;
    }
  }

  GQRResumeQuartzV2.prototype.i18n = {
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

  if (!customElements.get('gqr-resume-quartz-v2')) {
    customElements.define('gqr-resume-quartz-v2', GQRResumeQuartzV2);
  }
})();