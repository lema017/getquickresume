(function() {
  'use strict';

  class GQRResumeOakV2 extends HTMLElement {
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
      };
    }

    formatShortDate(dateValue, lang) {
      if (!dateValue) return '';
      const date = new Date(dateValue);
      if (Number.isNaN(date.getTime())) return this.escapeHtml(this.safeStr(dateValue));

      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };

      return months[lang][date.getMonth()] + ' ' + date.getFullYear();
    }

    formatDateRange(startDate, endDate, lang, flags) {
      const i18n = this.getI18n()[lang];
      const start = this.formatShortDate(startDate, lang);
      let end = '';

      if (flags && flags.type === 'education') {
        end = flags.isCompleted === false ? i18n.present : this.formatShortDate(endDate, lang);
      } else {
        end = flags && flags.isCurrent ? i18n.present : this.formatShortDate(endDate, lang);
      }

      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `
        <div class="section-heading">
          <span>${this.escapeHtml(title)}</span>
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

      const experience = this.safeArr(data.experience);
      const projects = this.safeArr(data.projects);
      const achievements = this.safeArr(data.achievements);
      const education = this.safeArr(data.education);
      const certifications = this.safeArr(data.certifications);
      const languages = this.safeArr(data.languages);
      const skillsRaw = this.safeArr(data.skillsRaw);
      const toolsRaw = this.safeArr(data.toolsRaw);

      const combinedSkills = Array.from(
        new Set(
          skillsRaw
            .concat(toolsRaw)
            .map((s) => this.safeStr(s).trim())
            .filter(Boolean)
        )
      );

      const contactItems = [
        email ? `✉ ${this.escapeHtml(email)}` : '',
        phone ? `☎ ${this.escapeHtml(phone)}` : '',
        country ? `⚲ ${this.escapeHtml(country)}` : '',
        linkedin ? `🔗 ${this.escapeHtml(linkedin)}` : ''
      ].filter(Boolean);

      const hasHeader = Boolean(firstName || lastName || profession || contactItems.length);
      const hasProfile = Boolean(summary);
      const hasSkills = combinedSkills.length > 0;
      const hasExperience = experience.length > 0;
      const hasProjects = projects.length > 0;
      const hasAchievements = achievements.length > 0;
      const hasEducation = education.length > 0;
      const hasCertifications = certifications.length > 0;
      const hasLanguages = languages.length > 0;

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
            background: #ffffff;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            color: #243234;
          }

          .inner {
            padding: 34px 36px 38px;
          }

          .header-card {
            background: #aebfc0;
            color: #ffffff;
            padding: 28px 30px 22px;
            margin-bottom: 24px;
          }

          .name {
            margin: 0;
            font-size: 34px;
            line-height: 0.96;
            font-weight: 800;
            letter-spacing: 0.6px;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 10px;
            font-size: 14px;
            line-height: 1.3;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            opacity: 0.95;
          }

          .contact-row {
            margin-top: 16px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px 10px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            padding: 6px 10px;
            background: rgba(255, 255, 255, 0.18);
            border: 1px solid rgba(255, 255, 255, 0.28);
            border-radius: 999px;
            font-size: 11.5px;
            line-height: 1.2;
            font-weight: 600;
            letter-spacing: 0.2px;
          }

          .section {
            margin-bottom: 20px;
          }

          .section-heading {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;
          }

          .section-heading span {
            display: inline-block;
            font-size: 19px;
            line-height: 1.1;
            font-weight: 800;
            color: #314749;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            position: relative;
          }

          .section-heading span::after {
            content: "";
            display: block;
            width: 54px;
            height: 5px;
            background: #cfd9da;
            margin-top: 4px;
          }

          .profile-text {
            font-size: 13px;
            line-height: 1.62;
            color: #354446;
          }

          .skills-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
          }

          .skill-chip {
            display: inline-flex;
            align-items: center;
            min-height: 34px;
            padding: 8px 12px;
            border: 1px solid #d6dfdf;
            background: #f7f9f9;
            color: #314749;
            border-radius: 18px;
            font-size: 12px;
            line-height: 1.25;
            font-weight: 700;
          }

          .entry {
            padding: 0 0 14px;
            margin-bottom: 14px;
            border-bottom: 1px solid #e5ebeb;
          }

          .entry:last-child {
            margin-bottom: 0;
            border-bottom: none;
            padding-bottom: 0;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 6px;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-size: 16px;
            line-height: 1.25;
            font-weight: 800;
            color: #223133;
          }

          .entry-subtitle {
            margin-top: 3px;
            font-size: 12.5px;
            line-height: 1.4;
            color: #6c8082;
            font-weight: 700;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 11.5px;
            line-height: 1.2;
            font-weight: 700;
            color: #6f8587;
            text-align: right;
            white-space: nowrap;
            padding-top: 2px;
          }

          .entry-desc {
            font-size: 12.5px;
            line-height: 1.58;
            color: #3b4b4d;
          }

          .bullets {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullets li {
            margin: 0 0 5px 0;
            font-size: 12.5px;
            line-height: 1.52;
            color: #334244;
          }

          .meta-line {
            margin-top: 6px;
            font-size: 12px;
            line-height: 1.45;
            color: #5d7174;
            font-weight: 700;
          }

          .lang-list {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px 18px;
          }

          .lang-item {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            padding: 9px 0;
            border-bottom: 1px solid #e5ebeb;
          }

          .lang-name {
            font-size: 12.5px;
            line-height: 1.3;
            font-weight: 800;
            color: #243234;
          }

          .lang-level {
            font-size: 12px;
            line-height: 1.3;
            color: #6b8082;
            font-weight: 700;
            text-align: right;
          }

          .muted-link {
            color: inherit;
            text-decoration: none;
            word-break: break-word;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${hasHeader ? `
            <section class="header-card" data-section="header">
              <h1 class="name">${this.escapeHtml((firstName + ' ' + lastName).trim())}</h1>
              ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
              ${contactItems.length ? `
                <div class="contact-row" data-section="contact">
                  ${contactItems.map((item, idx) => `
                    <div class="contact-pill" data-entry-id="contact-${idx}">${item}</div>
                  `).join('')}
                </div>
              ` : ''}
            </section>
          ` : ''}

          <div class="inner">
            ${hasProfile ? `
              <section class="section" data-section="profile">
                ${this.renderSectionTitle(i18n.profile)}
                <div class="profile-text">${this.escapeHtml(summary)}</div>
              </section>
            ` : ''}

            ${hasSkills ? `
              <section class="section" data-section="skills">
                ${this.renderSectionTitle(i18n.skills)}
                <div class="skills-grid">
                  ${combinedSkills.map((skill, idx) => `
                    <div class="skill-chip" data-entry-id="skill-${idx}">${this.escapeHtml(skill)}</div>
                  `).join('')}
                </div>
              </section>
            ` : ''}

            ${hasExperience ? `
              <section class="section" data-section="experience">
                ${this.renderSectionTitle(i18n.experience)}
                ${experience.map((item, idx) => {
                  const entryId = this.safeStr(item.id) || ('experience-' + idx);
                  const title = this.safeStr(item.title);
                  const company = this.safeStr(item.company);
                  const location = this.safeStr(item.location);
                  const bullets = this.safeArr(item.achievements).concat(this.safeArr(item.responsibilities)).filter(Boolean);
                  const dateRange = this.formatDateRange(item.startDate, item.endDate, lang, { isCurrent: !!item.isCurrent });

                  return `
                    <article class="entry" data-entry-id="${this.escapeHtml(entryId)}">
                      <div class="entry-top">
                        <div class="entry-main">
                          ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                          ${(company || location) ? `
                            <div class="entry-subtitle">
                              ${this.escapeHtml([company, location].filter(Boolean).join(' · '))}
                            </div>
                          ` : ''}
                        </div>
                        ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                      </div>
                      ${bullets.length ? `
                        <ul class="bullets">
                          ${bullets.map((bullet) => `<li>${this.escapeHtml(bullet)}</li>`).join('')}
                        </ul>
                      ` : ''}
                    </article>
                  `;
                }).join('')}
              </section>
            ` : ''}

            ${hasProjects ? `
              <section class="section" data-section="projects">
                ${this.renderSectionTitle(i18n.projects)}
                ${projects.map((item, idx) => {
                  const entryId = this.safeStr(item.id) || ('project-' + idx);
                  const name = this.safeStr(item.name);
                  const description = this.safeStr(item.description);
                  const technologies = this.safeArr(item.technologies).map((t) => this.safeStr(t).trim()).filter(Boolean);
                  const url = this.safeStr(item.url);

                  return `
                    <article class="entry" data-entry-id="${this.escapeHtml(entryId)}">
                      <div class="entry-top">
                        <div class="entry-main">
                          ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                        </div>
                      </div>
                      ${description ? `<div class="entry-desc">${this.escapeHtml(description)}</div>` : ''}
                      ${(technologies.length || url) ? `
                        <div class="meta-line">
                          ${technologies.length ? `${this.escapeHtml(technologies.join(' · '))}` : ''}
                          ${technologies.length && url ? ' — ' : ''}
                          ${url ? `<a class="muted-link" href="${this.escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${this.escapeHtml(url)}</a>` : ''}
                        </div>
                      ` : ''}
                    </article>
                  `;
                }).join('')}
              </section>
            ` : ''}

            ${hasAchievements ? `
              <section class="section" data-section="achievements">
                ${this.renderSectionTitle(i18n.achievements)}
                ${achievements.map((item, idx) => {
                  const entryId = this.safeStr(item.id) || ('achievement-' + idx);
                  const title = this.safeStr(item.title);
                  const description = this.safeStr(item.description);
                  const year = this.safeStr(item.year);

                  return `
                    <article class="entry" data-entry-id="${this.escapeHtml(entryId)}">
                      <div class="entry-top">
                        <div class="entry-main">
                          ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                        </div>
                        ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                      </div>
                      ${description ? `<div class="entry-desc">${this.escapeHtml(description)}</div>` : ''}
                    </article>
                  `;
                }).join('')}
              </section>
            ` : ''}

            ${hasEducation ? `
              <section class="section" data-section="education">
                ${this.renderSectionTitle(i18n.education)}
                ${education.map((item, idx) => {
                  const entryId = this.safeStr(item.id) || ('education-' + idx);
                  const degree = this.safeStr(item.degree);
                  const field = this.safeStr(item.field);
                  const institution = this.safeStr(item.institution);
                  const gpa = this.safeStr(item.gpa);
                  const dateRange = this.formatDateRange(item.startDate, item.endDate, lang, { type: 'education', isCompleted: item.isCompleted });

                  return `
                    <article class="entry" data-entry-id="${this.escapeHtml(entryId)}">
                      <div class="entry-top">
                        <div class="entry-main">
                          ${(degree || field) ? `<h3 class="entry-title">${this.escapeHtml([degree, field].filter(Boolean).join(' in '))}</h3>` : ''}
                          ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                        </div>
                        ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                      </div>
                      ${gpa ? `<div class="meta-line">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                    </article>
                  `;
                }).join('')}
              </section>
            ` : ''}

            ${hasCertifications ? `
              <section class="section" data-section="certifications">
                ${this.renderSectionTitle(i18n.certifications)}
                ${certifications.map((item, idx) => {
                  const entryId = this.safeStr(item.id) || ('certification-' + idx);
                  const name = this.safeStr(item.name);
                  const issuer = this.safeStr(item.issuer);
                  const date = this.formatShortDate(item.date, lang) || this.safeStr(item.date);

                  return `
                    <article class="entry" data-entry-id="${this.escapeHtml(entryId)}">
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
              </section>
            ` : ''}

            ${hasLanguages ? `
              <section class="section" data-section="languages">
                ${this.renderSectionTitle(i18n.languages)}
                <div class="lang-list">
                  ${languages.map((item, idx) => {
                    const entryId = this.safeStr(item.id) || ('language-' + idx);
                    const name = this.safeStr(item.name);
                    const levelKey = this.safeStr(item.level).toLowerCase();
                    const levelLabel = i18n.levelMap[levelKey] || this.escapeHtml(this.safeStr(item.level));

                    return `
                      <div class="lang-item" data-entry-id="${this.escapeHtml(entryId)}">
                        <div class="lang-name">${this.escapeHtml(name)}</div>
                        <div class="lang-level">${this.escapeHtml(levelLabel)}</div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </section>
            ` : ''}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-oak-v2')) {
    customElements.define('gqr-resume-oak-v2', GQRResumeOakV2);
  }
})();