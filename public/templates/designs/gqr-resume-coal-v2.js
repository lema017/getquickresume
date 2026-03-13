(function() {
  'use strict';

  /**
   * name: gqr-resume-coal-v2
   * description: "Two-column resume with a warm stone sidebar, clean editorial main column, uppercase section headings, and refined serif/sans typography inspired by a minimalist CV layout."
   */

  class GQRResumeCoalV2 extends HTMLElement {
    static get observedAttributes() {
      return ['language'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._data = {};
      this.i18n = {
        en: {
          profile: 'Profile',
          experience: 'Work Experience',
          education: 'Education',
          projects: 'Projects',
          certifications: 'Certifications',
          languages: 'Languages',
          achievements: 'Achievements',
          skills: 'Skills',
          contact: 'Contact',
          present: 'Present'
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
          contact: 'Contacto',
          present: 'Presente'
        }
      };
      this.levelMap = {
        en: {
          basic: 'Basic',
          intermediate: 'Intermediate',
          advanced: 'Advanced',
          native: 'Native'
        },
        es: {
          basic: 'Básico',
          intermediate: 'Intermedio',
          advanced: 'Avanzado',
          native: 'Nativo'
        }
      };
    }

    get data() {
      return this._data;
    }

    set data(value) {
      this._data = value && typeof value === 'object' ? value : {};
      this.render();
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      this.render();
    }

    getLanguage() {
      return this.getAttribute('language') || this.data?.language || 'en';
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
      const raw = this.safeStr(value).trim();
      if (!raw) return '';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const ym = raw.match(/^(\d{4})-(\d{2})$/);
      if (ym) {
        const year = ym[1];
        const monthIndex = parseInt(ym[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return months[monthIndex] + ' ' + year;
        }
      }

      const ymd = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (ymd) {
        const year = ymd[1];
        const monthIndex = parseInt(ymd[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return months[monthIndex] + ' ' + year;
        }
      }

      return raw;
    }

    formatDateRange(startDate, endDate, isCurrentLike, lang) {
      const t = this.i18n[lang] || this.i18n.en;
      const start = this.formatShortDate(startDate, lang);
      const end = isCurrentLike ? t.present : this.formatShortDate(endDate, lang);

      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `<div class="section-title">${this.escapeHtml(title)}</div>`;
    }

    render() {
      const data = this.data || {};
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang] || this.i18n.en;
      const levels = this.levelMap[lang] || this.levelMap.en;

      const firstName = this.safeStr(data.firstName);
      const lastName = this.safeStr(data.lastName);
      const profession = this.safeStr(data.profession);
      const summary = this.safeStr(data.summary);
      const email = this.safeStr(data.email);
      const phone = this.safeStr(data.phone);
      const country = this.safeStr(data.country);
      const linkedin = this.safeStr(data.linkedin);

      const experience = this.safeArr(data.experience);
      const education = this.safeArr(data.education);
      const projects = this.safeArr(data.projects);
      const certifications = this.safeArr(data.certifications);
      const languages = this.safeArr(data.languages);
      const achievements = this.safeArr(data.achievements);

      const mergedSkills = Array.from(
        new Set(
          [...this.safeArr(data.skillsRaw), ...this.safeArr(data.toolsRaw)]
            .map((s) => this.safeStr(s).trim())
            .filter(Boolean)
        )
      );

      const contactItems = [];
      if (email) contactItems.push(`<div class="contact-item"><span class="contact-value">${this.escapeHtml(email)}</span></div>`);
      if (phone) contactItems.push(`<div class="contact-item"><span class="contact-value">${this.escapeHtml(phone)}</span></div>`);
      if (country) contactItems.push(`<div class="contact-item"><span class="contact-value">${this.escapeHtml(country)}</span></div>`);
      if (linkedin) contactItems.push(`<div class="contact-item"><span class="contact-value">${this.escapeHtml(linkedin)}</span></div>`);

      const hasContact = contactItems.length > 0;
      const hasLanguages = languages.length > 0;
      const hasSkills = mergedSkills.length > 0;
      const hasHeader = !!(firstName || lastName || profession);
      const hasProfile = !!summary;
      const hasExperience = experience.length > 0;
      const hasProjects = projects.length > 0;
      const hasAchievements = achievements.length > 0;
      const hasEducation = education.length > 0;
      const hasCertifications = certifications.length > 0;

      const languagesHtml = hasLanguages ? `
        <section class="section" data-section="languages">
          ${this.renderSectionTitle(t.languages)}
          <div class="language-list">
            ${languages.map((item) => {
              const id = this.safeStr(item && item.id);
              const name = this.safeStr(item && item.name);
              const levelKey = this.safeStr(item && item.level).toLowerCase();
              const levelLabel = levels[levelKey] || this.safeStr(item && item.level);
              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                  <div class="language-name">${this.escapeHtml(name)}</div>
                  <div class="language-level">${this.escapeHtml(levelLabel)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const skillsHtml = hasSkills ? `
        <section class="section" data-section="skills">
          ${this.renderSectionTitle(t.skills)}
          <div class="skills-wrap">
            ${mergedSkills.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      ` : '';

      const contactHtml = hasContact ? `
        <section class="section" data-section="contact">
          ${this.renderSectionTitle(t.contact)}
          <div class="contact-list">
            ${contactItems.join('')}
          </div>
        </section>
      ` : '';

      const headerHtml = hasHeader ? `
        <section class="hero" data-section="header">
          <div class="name-block">
            <h1 class="name">${this.escapeHtml((firstName + ' ' + lastName).trim())}</h1>
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
          <div class="hero-accent" aria-hidden="true"></div>
        </section>
      ` : '';

      const profileHtml = hasProfile ? `
        <section class="section main-section profile-box" data-section="profile">
          ${this.renderSectionTitle(t.profile)}
          <div class="summary">${this.escapeHtml(summary)}</div>
        </section>
      ` : '';

      const experienceHtml = hasExperience ? `
        <section class="section main-section" data-section="experience">
          ${this.renderSectionTitle(t.experience)}
          <div class="entry-list">
            ${experience.map((item) => {
              const id = this.safeStr(item && item.id);
              const title = this.safeStr(item && item.title);
              const company = this.safeStr(item && item.company);
              const location = this.safeStr(item && item.location);
              const dateRange = this.formatDateRange(
                this.safeStr(item && item.startDate),
                this.safeStr(item && item.endDate),
                !!(item && item.isCurrent),
                lang
              );
              const bullets = [
                ...this.safeArr(item && item.achievements),
                ...this.safeArr(item && item.responsibilities)
              ].map((b) => this.safeStr(b).trim()).filter(Boolean);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${this.escapeHtml([company, location].filter(Boolean).join(' · '))}
                        </div>
                      ` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${bullets.length ? `
                    <ul class="bullet-list">
                      ${bullets.map((b) => `<li>${this.escapeHtml(b)}</li>`).join('')}
                    </ul>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const projectsHtml = hasProjects ? `
        <section class="section main-section" data-section="projects">
          ${this.renderSectionTitle(t.projects)}
          <div class="entry-list">
            ${projects.map((item) => {
              const id = this.safeStr(item && item.id);
              const name = this.safeStr(item && item.name);
              const description = this.safeStr(item && item.description);
              const url = this.safeStr(item && item.url);
              const technologies = this.safeArr(item && item.technologies).map((x) => this.safeStr(x).trim()).filter(Boolean);
              const dateRange = this.formatDateRange(
                this.safeStr(item && item.startDate),
                this.safeStr(item && item.endDate),
                !!(item && item.isOngoing),
                lang
              );

              return `
                <article class="entry project-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
                      ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                      ${url ? `<div class="entry-subtitle">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map((tech) => `<span class="tag">${this.escapeHtml(tech)}</span>`).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const achievementsHtml = hasAchievements ? `
        <section class="section main-section" data-section="achievements">
          ${this.renderSectionTitle(t.achievements)}
          <div class="entry-list">
            ${achievements.map((item) => {
              const id = this.safeStr(item && item.id);
              const title = this.safeStr(item && item.title);
              const description = this.safeStr(item && item.description);
              const year = this.safeStr(item && item.year);

              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                    </div>
                    ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const educationHtml = hasEducation ? `
        <section class="section main-section" data-section="education">
          ${this.renderSectionTitle(t.education)}
          <div class="entry-list">
            ${education.map((item) => {
              const id = this.safeStr(item && item.id);
              const institution = this.safeStr(item && item.institution);
              const degree = this.safeStr(item && item.degree);
              const field = this.safeStr(item && item.field);
              const gpa = this.safeStr(item && item.gpa);
              const degreeLine = [degree, field].filter(Boolean).join(', ');
              const dateRange = this.formatDateRange(
                this.safeStr(item && item.startDate),
                this.safeStr(item && item.endDate),
                item && item.isCompleted === false,
                lang
              );

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
                      ${degreeLine ? `<div class="entry-title">${this.escapeHtml(degreeLine)}</div>` : ''}
                      ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${gpa ? `<div class="entry-text">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const certificationsHtml = hasCertifications ? `
        <section class="section main-section" data-section="certifications">
          ${this.renderSectionTitle(t.certifications)}
          <div class="entry-list">
            ${certifications.map((item) => {
              const id = this.safeStr(item && item.id);
              const name = this.safeStr(item && item.name);
              const issuer = this.safeStr(item && item.issuer);
              const date = this.safeStr(item && item.date);

              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
                      ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                      ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
                    </div>
                    ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2f2c29;
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
            background: #f8f6f1;
            display: grid;
            grid-template-columns: 34% 66%;
            font-family: Arial, Helvetica, sans-serif;
          }

          .sidebar {
            background: #e6e0d7;
            padding: 24mm 9mm 18mm 14mm;
            color: #3a3531;
            border-right: 1px solid rgba(58, 53, 49, 0.08);
          }

          .main {
            background: #f8f6f1;
            padding: 18mm 16mm 18mm 14mm;
          }

          .hero {
            margin-bottom: 12mm;
            padding-bottom: 7mm;
            border-bottom: 1px solid #d7d0c5;
          }

          .name {
            margin: 0;
            font-family: Georgia, "Times New Roman", serif;
            font-size: 16pt;
            line-height: 1.05;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: #25211e;
            max-width: 85%;
          }

          .profession {
            margin-top: 4mm;
            font-size: 10pt;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #6a6259;
          }

          .hero-accent {
            width: 44px;
            height: 3px;
            background: #8a7f71;
            margin-top: 6mm;
          }

          .section {
            margin-bottom: 9mm;
          }

          .main-section {
            margin-bottom: 8.5mm;
          }

          .section-title {
            font-size: 8pt;
            text-transform: uppercase;
            letter-spacing: 0.22em;
            color: #6f675e;
            margin: 0 0 4.5mm 0;
          }

          .profile-box {
            background: #e9e3d9;
            padding: 5mm 5mm 4.5mm 5mm;
          }

          .summary {
            font-size: 9pt;
            line-height: 1.6;
            color: #3c3732;
          }

          .contact-list,
          .language-list,
          .entry-list {
            display: block;
          }

          .contact-item {
            margin-bottom: 3.2mm;
            font-size: 8.8pt;
            line-height: 1.4;
            color: #3f3934;
            word-break: break-word;
          }

          .contact-item:last-child {
            margin-bottom: 0;
          }

          .contact-value {
            display: block;
          }

          .language-item {
            margin-bottom: 4mm;
            padding-bottom: 3.5mm;
            border-bottom: 1px solid rgba(63, 57, 52, 0.10);
          }

          .language-item:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }

          .language-name {
            font-size: 9pt;
            font-weight: 700;
            color: #2f2b27;
            margin-bottom: 1mm;
          }

          .language-level {
            font-size: 8.2pt;
            color: #72695f;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            padding: 5px 8px;
            border: 1px solid #c7beb2;
            background: #f4efe7;
            color: #3d3833;
            font-size: 7.8pt;
            line-height: 1.2;
            border-radius: 999px;
          }

          .entry {
            margin-bottom: 5.2mm;
          }

          .entry:last-child {
            margin-bottom: 0;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 5mm;
            margin-bottom: 2mm;
          }

          .entry-title-wrap {
            min-width: 0;
            flex: 1 1 auto;
          }

          .entry-title {
            font-family: Georgia, "Times New Roman", serif;
            font-size: 10.2pt;
            line-height: 1.3;
            font-weight: 700;
            color: #2a2622;
          }

          .entry-subtitle {
            margin-top: 0.8mm;
            font-size: 8.5pt;
            line-height: 1.4;
            color: #655d54;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 8pt;
            line-height: 1.3;
            color: #7b7267;
            text-align: right;
            white-space: nowrap;
            padding-top: 0.4mm;
          }

          .entry-text {
            font-size: 8.8pt;
            line-height: 1.55;
            color: #3f3934;
          }

          .bullet-list {
            margin: 2mm 0 0 0;
            padding-left: 4.2mm;
          }

          .bullet-list li {
            margin: 0 0 1.6mm 0;
            font-size: 8.8pt;
            line-height: 1.5;
            color: #3f3934;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2.2mm;
          }

          .tag {
            display: inline-block;
            padding: 4px 7px;
            font-size: 7.6pt;
            line-height: 1.2;
            border-radius: 3px;
            background: #ebe5dc;
            color: #4b443d;
          }

          .compact-entry .entry-head {
            margin-bottom: 1.4mm;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          <div class="sidebar">
            ${contactHtml}
            ${languagesHtml}
            ${skillsHtml}
          </div>

          <div class="main">
            ${headerHtml}
            ${profileHtml}
            ${experienceHtml}
            ${projectsHtml}
            ${achievementsHtml}
            ${educationHtml}
            ${certificationsHtml}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-coal-v2')) {
    customElements.define('gqr-resume-coal-v2', GQRResumeCoalV2);
  }
})();