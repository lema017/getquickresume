(function() {
  'use strict';

  class GQRResumeSurgeV1 extends HTMLElement {
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
          education: 'Formación',
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

    formatShortDate(value, lang) {
      const raw = this.safeStr(value).trim();
      if (!raw) return '';

      const date = new Date(raw);
      if (Number.isNaN(date.getTime())) {
        return this.escapeHtml(raw);
      }

      return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
        month: 'short',
        year: 'numeric'
      }).format(date);
    }

    formatDateRange(startDate, endDate, isCurrentLike, lang) {
      const t = this.getI18n()[lang];
      const start = this.formatShortDate(startDate, lang);
      const end = isCurrentLike ? t.present : this.formatShortDate(endDate, lang);

      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    buildContactItems(header) {
      const items = [];
      if (header.email) items.push(`✉ ${this.escapeHtml(header.email)}`);
      if (header.phone) items.push(`☎ ${this.escapeHtml(header.phone)}`);
      if (header.country) items.push(`⚲ ${this.escapeHtml(header.country)}`);
      if (header.linkedin) items.push(`🔗 ${this.escapeHtml(header.linkedin)}`);
      return items;
    }

    renderSectionTitle(title) {
      return `
        <div class="section-heading-wrap">
          <h2 class="section-title">${this.escapeHtml(title)}</h2>
          <div class="section-line"></div>
        </div>
      `;
    }

    render() {
      const lang = this.getLanguage();
      const i18n = this.getI18n()[lang];
      const data = this._data || {};

      const header = {
        firstName: this.safeStr(data.firstName),
        lastName: this.safeStr(data.lastName),
        profession: this.safeStr(data.profession),
        email: this.safeStr(data.email),
        phone: this.safeStr(data.phone),
        country: this.safeStr(data.country),
        linkedin: this.safeStr(data.linkedin)
      };

      const summary = this.safeStr(data.summary);

      const combinedSkills = Array.from(
        new Set(
          [...this.safeArr(data.skillsRaw), ...this.safeArr(data.toolsRaw)]
            .map(v => this.safeStr(v).trim())
            .filter(Boolean)
        )
      );

      const experience = this.safeArr(data.experience);
      const projects = this.safeArr(data.projects);
      const achievements = this.safeArr(data.achievements);
      const education = this.safeArr(data.education);
      const certifications = this.safeArr(data.certifications);
      const languages = this.safeArr(data.languages);

      const fullName = [header.firstName, header.lastName].filter(Boolean).join(' ').trim();
      const contactItems = this.buildContactItems(header);

      const hasHeader = !!(fullName || header.profession || contactItems.length);
      const hasProfile = !!summary;
      const hasSkills = combinedSkills.length > 0;
      const hasExperience = experience.length > 0;
      const hasProjects = projects.length > 0;
      const hasAchievements = achievements.length > 0;
      const hasEducation = education.length > 0;
      const hasCertifications = certifications.length > 0;
      const hasLanguages = languages.length > 0;

      const headerHtml = hasHeader ? `
        <section class="header" data-section="header">
          <div class="header-top">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${header.profession ? `<div class="profession">${this.escapeHtml(header.profession)}</div>` : ''}
          </div>
          ${contactItems.length ? `
            <div class="contact-row" data-section="contact">
              ${contactItems.map((item, idx) => `
                <div class="contact-pill" data-entry-id="contact-${idx}">${item}</div>
              `).join('')}
            </div>
          ` : ''}
        </section>
      ` : '';

      const profileHtml = hasProfile ? `
        <section class="section" data-section="profile">
          ${this.renderSectionTitle(i18n.profile)}
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      ` : '';

      const skillsHtml = hasSkills ? `
        <section class="section" data-section="skills">
          ${this.renderSectionTitle(i18n.skills)}
          <div class="skills-grid">
            ${combinedSkills.map((skill, idx) => `
              <div class="skill-chip" data-entry-id="skill-${idx}">${this.escapeHtml(skill)}</div>
            `).join('')}
          </div>
        </section>
      ` : '';

      const experienceHtml = hasExperience ? `
        <section class="section" data-section="experience">
          ${this.renderSectionTitle(i18n.experience)}
          <div class="stack-list">
            ${experience.map((item, idx) => {
              const entryId = this.safeStr(item && item.id) || `experience-${idx}`;
              const bullets = [
                ...this.safeArr(item && item.achievements),
                ...this.safeArr(item && item.responsibilities)
              ].map(v => this.safeStr(v).trim()).filter(Boolean);
              const dateRange = this.formatDateRange(
                item && item.startDate,
                item && item.endDate,
                !!(item && item.isCurrent),
                lang
              );
              const metaParts = [
                this.safeStr(item && item.company),
                this.safeStr(item && item.location)
              ].filter(Boolean);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${this.safeStr(item && item.title) ? `<h3 class="entry-title">${this.escapeHtml(item.title)}</h3>` : ''}
                      ${metaParts.length ? `<div class="entry-meta">${this.escapeHtml(metaParts.join(' · '))}</div>` : ''}
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
      ` : '';

      const projectsHtml = hasProjects ? `
        <section class="section" data-section="projects">
          ${this.renderSectionTitle(i18n.projects)}
          <div class="stack-list">
            ${projects.map((item, idx) => {
              const entryId = this.safeStr(item && item.id) || `project-${idx}`;
              const technologies = this.safeArr(item && item.technologies)
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${this.safeStr(item && item.name) ? `<h3 class="entry-title">${this.escapeHtml(item.name)}</h3>` : ''}
                    </div>
                  </div>
                  ${this.safeStr(item && item.description) ? `<div class="entry-text">${this.escapeHtml(item.description)}</div>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map((tech, techIdx) => `
                        <span class="mini-tag" data-entry-id="${this.escapeHtml(entryId)}-tech-${techIdx}">${this.escapeHtml(tech)}</span>
                      `).join('')}
                    </div>
                  ` : ''}
                  ${this.safeStr(item && item.url) ? `<div class="entry-link">${this.escapeHtml(item.url)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const achievementsHtml = hasAchievements ? `
        <section class="section" data-section="achievements">
          ${this.renderSectionTitle(i18n.achievements)}
          <div class="stack-list">
            ${achievements.map((item, idx) => {
              const entryId = this.safeStr(item && item.id) || `achievement-${idx}`;
              const year = this.safeStr(item && item.year);
              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${this.safeStr(item && item.title) ? `<h3 class="entry-title">${this.escapeHtml(item.title)}</h3>` : ''}
                    </div>
                    ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${this.safeStr(item && item.description) ? `<div class="entry-text">${this.escapeHtml(item.description)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const educationHtml = hasEducation ? `
        <section class="section" data-section="education">
          ${this.renderSectionTitle(i18n.education)}
          <div class="stack-list">
            ${education.map((item, idx) => {
              const entryId = this.safeStr(item && item.id) || `education-${idx}`;
              const titleParts = [this.safeStr(item && item.degree), this.safeStr(item && item.field)].filter(Boolean);
              const dateRange = this.formatDateRange(
                item && item.startDate,
                item && item.endDate,
                !!(item && item.isCompleted === false),
                lang
              );
              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${titleParts.length ? `<h3 class="entry-title">${this.escapeHtml(titleParts.join(' in '))}</h3>` : ''}
                      ${this.safeStr(item && item.institution) ? `<div class="entry-meta">${this.escapeHtml(item.institution)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${this.safeStr(item && item.gpa) ? `<div class="entry-text">GPA: ${this.escapeHtml(item.gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const certificationsHtml = hasCertifications ? `
        <section class="section" data-section="certifications">
          ${this.renderSectionTitle(i18n.certifications)}
          <div class="stack-list">
            ${certifications.map((item, idx) => {
              const entryId = this.safeStr(item && item.id) || `certification-${idx}`;
              const certDate = this.formatShortDate(item && item.date, lang);
              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${this.safeStr(item && item.name) ? `<h3 class="entry-title">${this.escapeHtml(item.name)}</h3>` : ''}
                      ${this.safeStr(item && item.issuer) ? `<div class="entry-meta">${this.escapeHtml(item.issuer)}</div>` : ''}
                    </div>
                    ${certDate ? `<div class="entry-date">${this.escapeHtml(certDate)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const languagesHtml = hasLanguages ? `
        <section class="section" data-section="languages">
          ${this.renderSectionTitle(i18n.languages)}
          <div class="language-list">
            ${languages.map((item, idx) => {
              const entryId = this.safeStr(item && item.id) || `language-${idx}`;
              const name = this.safeStr(item && item.name);
              const levelKey = this.safeStr(item && item.level).toLowerCase();
              const level = i18n.levelMap[levelKey] || this.safeStr(item && item.level);
              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(entryId)}">
                  <span class="language-name">${this.escapeHtml(name)}</span>
                  <span class="language-sep">—</span>
                  <span class="language-level">${this.escapeHtml(level)}</span>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

          :host {
            display: block;
            color: #3f3a37;
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
            background: #fffdfb;
            padding: 34px 36px 40px;
            font-family: 'Inter', Arial, sans-serif;
            color: #4a433f;
          }

          .header {
            position: relative;
            padding: 0 0 20px 0;
            margin-bottom: 18px;
            border-bottom: 1px solid #ead9d7;
          }

          .header::before {
            content: '';
            display: block;
            width: 72px;
            height: 8px;
            background: linear-gradient(90deg, #d8b8b3 0%, #eddcda 100%);
            border-radius: 999px;
            margin-bottom: 16px;
          }

          .name {
            margin: 0;
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 34px;
            line-height: 1;
            font-weight: 600;
            letter-spacing: 0.4px;
            color: #2f2a28;
          }

          .profession {
            margin-top: 6px;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #9a7d77;
            font-weight: 600;
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
            min-height: 28px;
            padding: 6px 10px;
            border: 1px solid #ead9d7;
            background: #f7eeec;
            border-radius: 999px;
            font-size: 11px;
            color: #5f5551;
          }

          .section {
            margin-top: 18px;
          }

          .section-heading-wrap {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
          }

          .section-title {
            margin: 0;
            white-space: nowrap;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #6c5a56;
          }

          .section-line {
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, #d8b8b3 0%, #f0e3e0 100%);
          }

          .profile-text,
          .entry-text,
          .entry-meta,
          .entry-link,
          .bullet-list li,
          .language-item {
            font-size: 12px;
            line-height: 1.6;
            color: #4d4642;
          }

          .profile-text {
            margin-top: 2px;
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
            background: #f4e8e6;
            border: 1px solid #e5d1cd;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 500;
            color: #5d4f4b;
          }

          .stack-list {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            padding: 0 0 12px 0;
            border-bottom: 1px solid #f0e4e1;
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
            gap: 12px;
            margin-bottom: 4px;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 24px;
            line-height: 1.05;
            font-weight: 600;
            color: #2f2a28;
          }

          .entry-meta {
            margin-top: 3px;
            color: #7b6d68;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 11px;
            line-height: 1.4;
            font-weight: 600;
            color: #9a7d77;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-align: right;
            padding-top: 3px;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 0 0 4px 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
          }

          .entry-link {
            margin-top: 6px;
            color: #8c6e68;
            word-break: break-word;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .language-name {
            font-weight: 600;
            color: #2f2a28;
          }

          .language-sep {
            margin: 0 6px;
            color: #b4948e;
          }

          .language-level {
            color: #7b6d68;
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
          ${profileHtml}
          ${skillsHtml}
          ${experienceHtml}
          ${projectsHtml}
          ${achievementsHtml}
          ${educationHtml}
          ${certificationsHtml}
          ${languagesHtml}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-surge-v1')) {
    customElements.define('gqr-resume-surge-v1', GQRResumeSurgeV1);
  }
})();