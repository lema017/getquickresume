(function() {
  'use strict';

  /**
   * name: gqr-resume-chart-v2
   * description: "Two-column resume with a dark slate sidebar, warm white main panel, rounded header card, and clean modern typography inspired by a corporate profile layout."
   */

  class GQRResumeChartV2 extends HTMLElement {
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
          experience: 'Experience',
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

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'language' && oldValue !== newValue) {
        this.render();
      }
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

    formatDate(value, lang) {
      const v = this.safeStr(value).trim();
      if (!v) return '';
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };
      const parts = v.split('-');
      if (parts.length >= 2) {
        const year = parts[0];
        const monthIndex = parseInt(parts[1], 10) - 1;
        if (!isNaN(monthIndex) && monthIndex >= 0 && monthIndex < 12) {
          return `${months[lang] || months.en[monthIndex]} ${year}`;
        }
      }
      return v;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const start = this.formatDate(startDate, lang);
      const end = isCurrentLike ? t.present : this.formatDate(endDate, lang);
      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderContactSection(t, d) {
      const email = this.safeStr(d.email).trim();
      const phone = this.safeStr(d.phone).trim();
      const country = this.safeStr(d.country).trim();
      const linkedin = this.safeStr(d.linkedin).trim();

      if (!email && !phone && !country && !linkedin) return '';

      const linkedinDisplay = linkedin
        ? this.escapeHtml(linkedin.replace(/^https?:\/\//i, '').replace(/^www\./i, ''))
        : '';

      return `
        <section class="section section-sidebar" data-section="contact">
          <h3 class="section-title section-title-sidebar">${this.escapeHtml(t.contact)}</h3>
          <div class="contact-list">
            ${email ? `
              <div class="contact-item">
                <span class="contact-icon">✉</span>
                <span class="contact-text">${this.escapeHtml(email)}</span>
              </div>` : ''}
            ${phone ? `
              <div class="contact-item">
                <span class="contact-icon">☎</span>
                <span class="contact-text">${this.escapeHtml(phone)}</span>
              </div>` : ''}
            ${country ? `
              <div class="contact-item">
                <span class="contact-icon">⌂</span>
                <span class="contact-text">${this.escapeHtml(country)}</span>
              </div>` : ''}
            ${linkedin ? `
              <div class="contact-item">
                <span class="contact-icon">in</span>
                <span class="contact-text">${linkedinDisplay}</span>
              </div>` : ''}
          </div>
        </section>
      `;
    }

    renderLanguagesSection(t, lang, languages) {
      if (!languages.length) return '';
      return `
        <section class="section section-sidebar" data-section="languages">
          <h3 class="section-title section-title-sidebar">${this.escapeHtml(t.languages)}</h3>
          <div class="language-list">
            ${languages.map((item) => {
              const id = this.safeStr(item.id).trim();
              const name = this.safeStr(item.name).trim();
              const levelKey = this.safeStr(item.level).trim().toLowerCase();
              const level = this.levelMap[lang]?.[levelKey] || this.safeStr(item.level);
              if (!name) return '';
              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                  <div class="language-name">${this.escapeHtml(name)}</div>
                  ${level ? `<div class="language-level">${this.escapeHtml(level)}</div>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderSkillsSection(t, skills) {
      if (!skills.length) return '';
      return `
        <section class="section section-sidebar" data-section="skills">
          <h3 class="section-title section-title-sidebar">${this.escapeHtml(t.skills)}</h3>
          <div class="skills-wrap">
            ${skills.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderHeaderSection(d) {
      const firstName = this.safeStr(d.firstName).trim();
      const lastName = this.safeStr(d.lastName).trim();
      const profession = this.safeStr(d.profession).trim();
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      if (!fullName && !profession) return '';

      return `
        <section class="hero-card" data-section="header">
          <div class="hero-accent"></div>
          <div class="hero-content">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
        </section>
      `;
    }

    renderProfileSection(t, d) {
      const summary = this.safeStr(d.summary).trim();
      if (!summary) return '';
      return `
        <section class="section section-main" data-section="profile">
          <h3 class="section-title section-title-main">${this.escapeHtml(t.profile)}</h3>
          <div class="body-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection(t, items) {
      if (!items.length) return '';
      return `
        <section class="section section-main" data-section="experience">
          <h3 class="section-title section-title-main">${this.escapeHtml(t.experience)}</h3>
          <div class="entries">
            ${items.map((item) => {
              const id = this.safeStr(item.id).trim();
              const title = this.safeStr(item.title).trim();
              const company = this.safeStr(item.company).trim();
              const location = this.safeStr(item.location).trim();
              const range = this.formatDateRange(item.startDate, item.endDate, !!item.isCurrent);
              const bullets = [...this.safeArr(item.achievements), ...this.safeArr(item.responsibilities)]
                .map((x) => this.safeStr(x).trim())
                .filter(Boolean);

              if (!title && !company && !location && !range && !bullets.length) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${this.escapeHtml([company, location].filter(Boolean).join(' • '))}
                        </div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
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
      `;
    }

    renderProjectsSection(t, items) {
      if (!items.length) return '';
      return `
        <section class="section section-main" data-section="projects">
          <h3 class="section-title section-title-main">${this.escapeHtml(t.projects)}</h3>
          <div class="entries">
            ${items.map((item) => {
              const id = this.safeStr(item.id).trim();
              const name = this.safeStr(item.name).trim();
              const description = this.safeStr(item.description).trim();
              const url = this.safeStr(item.url).trim();
              const technologies = this.safeArr(item.technologies).map((x) => this.safeStr(x).trim()).filter(Boolean);
              const range = this.formatDateRange(item.startDate, item.endDate, !!item.isOngoing);

              if (!name && !description && !url && !technologies.length && !range) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
                      ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                      ${url ? `<div class="entry-subtitle">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${description ? `<div class="body-text compact">${this.escapeHtml(description)}</div>` : ''}
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
      `;
    }

    renderAchievementsSection(t, items) {
      if (!items.length) return '';
      return `
        <section class="section section-main" data-section="achievements">
          <h3 class="section-title section-title-main">${this.escapeHtml(t.achievements)}</h3>
          <div class="entries">
            ${items.map((item) => {
              const id = this.safeStr(item.id).trim();
              const title = this.safeStr(item.title).trim();
              const description = this.safeStr(item.description).trim();
              const year = this.safeStr(item.year).trim();

              if (!title && !description && !year) return '';

              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                    </div>
                    ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<div class="body-text compact">${this.escapeHtml(description)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducationSection(t, items) {
      if (!items.length) return '';
      return `
        <section class="section section-main" data-section="education">
          <h3 class="section-title section-title-main">${this.escapeHtml(t.education)}</h3>
          <div class="entries">
            ${items.map((item) => {
              const id = this.safeStr(item.id).trim();
              const institution = this.safeStr(item.institution).trim();
              const degree = this.safeStr(item.degree).trim();
              const field = this.safeStr(item.field).trim();
              const gpa = this.safeStr(item.gpa).trim();
              const range = this.formatDateRange(item.startDate, item.endDate, item.isCompleted === false);

              const topLine = [degree, field].filter(Boolean).join(' — ');
              if (!institution && !topLine && !gpa && !range) return '';

              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
                      ${topLine ? `<div class="entry-title">${this.escapeHtml(topLine)}</div>` : ''}
                      ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                      ${gpa ? `<div class="entry-meta">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertificationsSection(t, items) {
      if (!items.length) return '';
      return `
        <section class="section section-main" data-section="certifications">
          <h3 class="section-title section-title-main">${this.escapeHtml(t.certifications)}</h3>
          <div class="entries">
            ${items.map((item) => {
              const id = this.safeStr(item.id).trim();
              const name = this.safeStr(item.name).trim();
              const issuer = this.safeStr(item.issuer).trim();
              const date = this.safeStr(item.date).trim();

              if (!name && !issuer && !date) return '';

              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
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
      `;
    }

    render() {
      if (!this.shadowRoot) return;

      const d = this.data || {};
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];

      const languages = this.safeArr(d.languages);
      const experience = this.safeArr(d.experience);
      const education = this.safeArr(d.education);
      const projects = this.safeArr(d.projects);
      const certifications = this.safeArr(d.certifications);
      const achievements = this.safeArr(d.achievements);

      const mergedSkills = Array.from(new Set(
        [...this.safeArr(d.skillsRaw), ...this.safeArr(d.toolsRaw)]
          .map((x) => this.safeStr(x).trim())
          .filter(Boolean)
      ));

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #1f2937;
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
            background: #f6f3ee;
            display: grid;
            grid-template-columns: 33% 67%;
            font-family: Arial, Helvetica, sans-serif;
            position: relative;
          }

          .sidebar {
            background: #8f949c;
            color: #ffffff;
            padding: 28mm 10mm 16mm 12mm;
            min-height: 297mm;
          }

          .main {
            background: #f6f3ee;
            color: #2f3136;
            padding: 14mm 14mm 16mm 14mm;
          }

          .hero-card {
            background: #2f3a4f;
            color: #ffffff;
            border-radius: 0 0 0 18px;
            margin: 0 0 12mm 0;
            min-height: 46mm;
            display: flex;
            align-items: stretch;
            overflow: hidden;
            box-shadow: 0 4px 18px rgba(25, 35, 55, 0.08);
          }

          .hero-accent {
            width: 8px;
            background: linear-gradient(180deg, #d9dde4 0%, #aab1bb 100%);
            flex: 0 0 8px;
          }

          .hero-content {
            padding: 12mm 10mm 10mm 11mm;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .name {
            margin: 0;
            font-size: 10mm;
            line-height: 1;
            font-weight: 800;
            letter-spacing: 0.4px;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 3mm;
            font-size: 4.2mm;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            color: #d8deea;
            font-weight: 700;
          }

          .section {
            margin-bottom: 9mm;
          }

          .section-title {
            margin: 0 0 4mm 0;
            font-size: 4.6mm;
            line-height: 1.2;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            position: relative;
            padding-bottom: 2.5mm;
          }

          .section-title-sidebar {
            color: #ffffff;
          }

          .section-title-main {
            color: #34363c;
          }

          .section-title::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            height: 0.5mm;
            width: 100%;
            max-width: 42mm;
            background: rgba(255,255,255,0.45);
          }

          .section-title-main::after {
            background: #b9b1aa;
          }

          .contact-list,
          .language-list,
          .entries {
            display: flex;
            flex-direction: column;
            gap: 3.2mm;
          }

          .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 2.5mm;
            font-size: 3.45mm;
            line-height: 1.45;
          }

          .contact-icon {
            width: 5mm;
            flex: 0 0 5mm;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 3.2mm;
            opacity: 0.95;
            font-weight: 700;
          }

          .contact-text {
            word-break: break-word;
          }

          .language-item {
            padding: 0;
          }

          .language-name {
            font-size: 3.7mm;
            font-weight: 700;
            line-height: 1.3;
          }

          .language-level {
            font-size: 3.2mm;
            line-height: 1.4;
            color: rgba(255,255,255,0.82);
            margin-top: 0.6mm;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            font-size: 3.05mm;
            line-height: 1.2;
            padding: 1.6mm 2.6mm;
            border-radius: 999px;
            background: rgba(255,255,255,0.16);
            color: #ffffff;
            border: 1px solid rgba(255,255,255,0.18);
          }

          .body-text {
            font-size: 3.45mm;
            line-height: 1.65;
            color: #4b4f58;
          }

          .body-text.compact {
            margin-top: 1.2mm;
            line-height: 1.55;
          }

          .entry {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .compact-entry {
            margin-bottom: 1mm;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4mm;
          }

          .entry-head-main {
            min-width: 0;
            flex: 1 1 auto;
          }

          .entry-title {
            font-size: 3.7mm;
            line-height: 1.35;
            font-weight: 800;
            color: #2e3138;
          }

          .entry-subtitle {
            margin-top: 0.7mm;
            font-size: 3.3mm;
            line-height: 1.45;
            color: #666b75;
            font-weight: 700;
          }

          .entry-meta {
            margin-top: 0.7mm;
            font-size: 3.1mm;
            color: #747982;
            line-height: 1.4;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 3.05mm;
            line-height: 1.35;
            color: #6f737c;
            font-weight: 700;
            text-align: right;
            white-space: nowrap;
          }

          .bullet-list {
            margin: 2mm 0 0 0;
            padding-left: 4.2mm;
            color: #4b4f58;
          }

          .bullet-list li {
            margin: 0 0 1.2mm 0;
            font-size: 3.25mm;
            line-height: 1.55;
          }

          .tag-row {
            margin-top: 2mm;
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
          }

          .tag {
            display: inline-block;
            white-space: nowrap;
            padding: 1.2mm 2.2mm;
            border-radius: 999px;
            background: #e1d9d1;
            color: #4a4641;
            font-size: 2.95mm;
            line-height: 1.2;
            font-weight: 700;
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
            ${this.renderContactSection(t, d)}
            ${this.renderLanguagesSection(t, lang, languages)}
            ${this.renderSkillsSection(t, mergedSkills)}
          </div>

          <div class="main">
            ${this.renderHeaderSection(d)}
            ${this.renderProfileSection(t, d)}
            ${this.renderExperienceSection(t, experience)}
            ${this.renderProjectsSection(t, projects)}
            ${this.renderAchievementsSection(t, achievements)}
            ${this.renderEducationSection(t, education)}
            ${this.renderCertificationsSection(t, certifications)}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-chart-v2')) {
    customElements.define('gqr-resume-chart-v2', GQRResumeChartV2);
  }
})();