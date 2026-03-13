(function() {
  'use strict';

  /**
   * name: gqr-resume-prism-v1
   * description: "Two-column resume with a deep charcoal sidebar, warm light main panel, geometric timeline accents, and clean modern typography inspired by editorial resume layouts."
   */

  class GQRResumePrismV1 extends HTMLElement {
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

    formatDate(dateStr, lang) {
      const value = this.safeStr(dateStr).trim();
      if (!value) return '';
      const match = value.match(/^(\d{4})(?:-(\d{2}))?/);
      if (!match) return this.escapeHtml(value);
      const year = match[1];
      const month = match[2];
      if (!month) return year;

      const monthIndex = Number(month) - 1;
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      if (monthIndex < 0 || monthIndex > 11) return year;
      return months[monthIndex] + ' ' + year;
    }

    formatDateRange(startDate, endDate, currentFlag, currentKey) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const labels = this.i18n[lang] || this.i18n.en;
      const start = this.formatDate(startDate, lang);
      const end = currentFlag ? labels.present : this.formatDate(endDate, lang);
      if (start && end) return this.escapeHtml(start + ' — ' + end);
      if (start) return this.escapeHtml(start);
      if (end) return this.escapeHtml(end);
      return '';
    }

    renderContactSection(t, d) {
      const email = this.safeStr(d.email).trim();
      const phone = this.safeStr(d.phone).trim();
      const country = this.safeStr(d.country).trim();
      const linkedin = this.safeStr(d.linkedin).trim();

      const items = [];
      if (email) {
        items.push(`
          <div class="contact-item">
            <span class="contact-label">Email</span>
            <span class="contact-value">${this.escapeHtml(email)}</span>
          </div>
        `);
      }
      if (phone) {
        items.push(`
          <div class="contact-item">
            <span class="contact-label">Phone</span>
            <span class="contact-value">${this.escapeHtml(phone)}</span>
          </div>
        `);
      }
      if (country) {
        items.push(`
          <div class="contact-item">
            <span class="contact-label">Location</span>
            <span class="contact-value">${this.escapeHtml(country)}</span>
          </div>
        `);
      }
      if (linkedin) {
        items.push(`
          <div class="contact-item">
            <span class="contact-label">LinkedIn</span>
            <span class="contact-value">${this.escapeHtml(linkedin)}</span>
          </div>
        `);
      }

      if (!items.length) return '';
      return `
        <section class="section sidebar-section" data-section="contact">
          <h3 class="sidebar-title">${this.escapeHtml(t.contact)}</h3>
          <div class="contact-list">
            ${items.join('')}
          </div>
        </section>
      `;
    }

    renderLanguagesSection(t, lang, languages) {
      const items = this.safeArr(languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section sidebar-section" data-section="languages">
          <h3 class="sidebar-title">${this.escapeHtml(t.languages)}</h3>
          <div class="stack-list">
            ${items.map((item) => {
              const id = this.safeStr(item.id).trim();
              const name = this.safeStr(item.name).trim();
              const levelRaw = this.safeStr(item.level).trim().toLowerCase();
              const level = (this.levelMap[lang] && this.levelMap[lang][levelRaw]) || levelRaw;
              if (!name) return '';
              return `
                <div class="lang-item" data-entry-id="${this.escapeHtml(id)}">
                  <div class="lang-name">${this.escapeHtml(name)}</div>
                  <div class="lang-level">${this.escapeHtml(level)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderSkillsSection(t, d) {
      const merged = [...this.safeArr(d.skillsRaw), ...this.safeArr(d.toolsRaw)]
        .map((s) => this.safeStr(s).trim())
        .filter(Boolean);

      const deduped = [];
      const seen = new Set();
      merged.forEach((skill) => {
        const key = skill.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          deduped.push(skill);
        }
      });

      if (!deduped.length) return '';

      return `
        <section class="section sidebar-section" data-section="skills">
          <h3 class="sidebar-title">${this.escapeHtml(t.skills)}</h3>
          <div class="skills-wrap">
            ${deduped.map((skill, index) => `
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

      const first = firstName ? `<span class="name-light">${this.escapeHtml(firstName)}</span>` : '';
      const last = lastName ? `<span class="name-bold">${this.escapeHtml(lastName)}</span>` : '';
      const fallbackName = !firstName && !lastName && fullName ? this.escapeHtml(fullName) : '';

      return `
        <section class="header-block section" data-section="header">
          <div class="header-accent"></div>
          <div class="header-copy">
            <h1 class="name">${first || fallbackName} ${last}</h1>
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
        </section>
      `;
    }

    renderProfileSection(t, d) {
      const summary = this.safeStr(d.summary).trim();
      if (!summary) return '';
      return `
        <section class="section main-section" data-section="profile">
          <h2 class="section-title">${this.escapeHtml(t.profile)}</h2>
          <div class="section-body">
            <p class="summary">${this.escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderExperienceSection(t, d) {
      const items = this.safeArr(d.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section timeline-section" data-section="experience">
          <h2 class="section-title">${this.escapeHtml(t.experience)}</h2>
          <div class="timeline">
            ${items.map((item) => {
              const id = this.safeStr(item.id).trim();
              const title = this.safeStr(item.title).trim();
              const company = this.safeStr(item.company).trim();
              const location = this.safeStr(item.location).trim();
              const dateRange = this.formatDateRange(
                item.startDate,
                item.endDate,
                !!item.isCurrent,
                'isCurrent'
              );

              const bullets = [...this.safeArr(item.achievements), ...this.safeArr(item.responsibilities)]
                .map((b) => this.safeStr(b).trim())
                .filter(Boolean);

              if (!title && !company && !dateRange && !bullets.length) return '';

              return `
                <article class="timeline-item entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title">${this.escapeHtml(title)}</div>
                    ${dateRange ? `<div class="entry-date">${dateRange}</div>` : ''}
                  </div>
                  <div class="entry-subtitle">
                    ${company ? `<span class="company">${this.escapeHtml(company)}</span>` : ''}
                    ${company && location ? `<span class="sep">•</span>` : ''}
                    ${location ? `<span class="location">${this.escapeHtml(location)}</span>` : ''}
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

    renderProjectsSection(t, d) {
      const items = this.safeArr(d.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          <h2 class="section-title">${this.escapeHtml(t.projects)}</h2>
          <div class="entry-list">
            ${items.map((item) => {
              const id = this.safeStr(item.id).trim();
              const name = this.safeStr(item.name).trim();
              const description = this.safeStr(item.description).trim();
              const url = this.safeStr(item.url).trim();
              const technologies = this.safeArr(item.technologies)
                .map((tech) => this.safeStr(tech).trim())
                .filter(Boolean);

              const dateRange = this.formatDateRange(
                item.startDate,
                item.endDate,
                !!item.isOngoing,
                'isOngoing'
              );

              if (!name && !description && !technologies.length && !url && !dateRange) return '';

              return `
                <article class="project-card entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title">${this.escapeHtml(name)}</div>
                    ${dateRange ? `<div class="entry-date">${dateRange}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map((tech) => `<span class="mini-tag">${this.escapeHtml(tech)}</span>`).join('')}
                    </div>
                  ` : ''}
                  ${url ? `<div class="project-url">${this.escapeHtml(url)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievementsSection(t, d) {
      const items = this.safeArr(d.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          <h2 class="section-title">${this.escapeHtml(t.achievements)}</h2>
          <div class="entry-list compact-list">
            ${items.map((item) => {
              const id = this.safeStr(item.id).trim();
              const title = this.safeStr(item.title).trim();
              const description = this.safeStr(item.description).trim();
              const year = this.safeStr(item.year).trim();

              if (!title && !description && !year) return '';

              return `
                <article class="compact-entry entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title">${this.escapeHtml(title)}</div>
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

    renderEducationSection(t, d) {
      const items = this.safeArr(d.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section timeline-section" data-section="education">
          <h2 class="section-title">${this.escapeHtml(t.education)}</h2>
          <div class="timeline">
            ${items.map((item) => {
              const id = this.safeStr(item.id).trim();
              const institution = this.safeStr(item.institution).trim();
              const degree = this.safeStr(item.degree).trim();
              const field = this.safeStr(item.field).trim();
              const gpa = this.safeStr(item.gpa).trim();

              const dateRange = this.formatDateRange(
                item.startDate,
                item.endDate,
                item.isCompleted === false,
                'isCompleted'
              );

              const subtitleParts = [];
              if (institution) subtitleParts.push(institution);
              if (field) subtitleParts.push(field);

              if (!degree && !institution && !field && !gpa && !dateRange) return '';

              return `
                <article class="timeline-item entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title">${this.escapeHtml(degree)}</div>
                    ${dateRange ? `<div class="entry-date">${dateRange}</div>` : ''}
                  </div>
                  ${subtitleParts.length ? `<div class="entry-subtitle">${this.escapeHtml(subtitleParts.join(' • '))}</div>` : ''}
                  ${gpa ? `<div class="meta-line">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertificationsSection(t, d) {
      const items = this.safeArr(d.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          <h2 class="section-title">${this.escapeHtml(t.certifications)}</h2>
          <div class="entry-list compact-list">
            ${items.map((item) => {
              const id = this.safeStr(item.id).trim();
              const name = this.safeStr(item.name).trim();
              const issuer = this.safeStr(item.issuer).trim();
              const date = this.safeStr(item.date).trim();

              if (!name && !issuer && !date) return '';

              return `
                <article class="compact-entry entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title">${this.escapeHtml(name)}</div>
                    ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
                  </div>
                  ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
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
      const t = this.i18n[lang] || this.i18n.en;

      const header = this.renderHeaderSection(d);
      const contact = this.renderContactSection(t, d);
      const languages = this.renderLanguagesSection(t, lang, d.languages);
      const skills = this.renderSkillsSection(t, d);

      const profile = this.renderProfileSection(t, d);
      const experience = this.renderExperienceSection(t, d);
      const projects = this.renderProjectsSection(t, d);
      const achievements = this.renderAchievementsSection(t, d);
      const education = this.renderEducationSection(t, d);
      const certifications = this.renderCertificationsSection(t, d);

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2e2a2d;
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
            background: #f4f1ec;
            display: grid;
            grid-template-columns: 34% 66%;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.4;
          }

          .sidebar {
            background: linear-gradient(180deg, #363134 0%, #2f2a2d 100%);
            color: #f5f1eb;
            padding: 32px 24px 36px;
            min-height: 297mm;
          }

          .main {
            background: #f4f1ec;
            padding: 28px 30px 34px;
          }

          .section {
            margin: 0 0 26px;
          }

          .sidebar-section {
            border-top: 1px solid rgba(255,255,255,0.16);
            padding-top: 16px;
          }

          .sidebar-section:first-child {
            border-top: none;
            padding-top: 0;
          }

          .header-block {
            position: relative;
            display: flex;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 28px;
          }

          .header-accent {
            width: 10px;
            height: 72px;
            background: linear-gradient(180deg, #8d7b6a 0%, #c7b49e 100%);
            border-radius: 6px;
            flex: 0 0 10px;
            margin-top: 4px;
          }

          .header-copy {
            flex: 1;
          }

          .name {
            margin: 0;
            font-size: 38px;
            line-height: 0.98;
            letter-spacing: 0.4px;
            text-transform: uppercase;
            color: #2e2a2d;
          }

          .name-light {
            display: block;
            font-weight: 300;
          }

          .name-bold {
            display: block;
            font-weight: 800;
          }

          .profession {
            margin-top: 8px;
            font-size: 18px;
            color: #5f595d;
            font-weight: 500;
          }

          .section-title,
          .sidebar-title {
            margin: 0 0 12px;
            font-size: 14px;
            font-weight: 800;
            letter-spacing: 1.2px;
            text-transform: uppercase;
          }

          .section-title {
            color: #312d30;
            position: relative;
            padding-bottom: 8px;
            border-bottom: 1px solid #cfc5bb;
          }

          .sidebar-title {
            color: #ffffff;
          }

          .summary,
          .entry-text,
          .contact-value,
          .lang-level,
          .meta-line,
          .project-url {
            font-size: 12.5px;
            color: inherit;
          }

          .summary {
            margin: 0;
            color: #4b4549;
          }

          .contact-list {
            display: grid;
            gap: 12px;
          }

          .contact-item {
            display: grid;
            gap: 2px;
          }

          .contact-label {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: rgba(245,241,235,0.65);
            font-weight: 700;
          }

          .contact-value {
            color: #f5f1eb;
            word-break: break-word;
          }

          .stack-list {
            display: grid;
            gap: 12px;
          }

          .lang-item {
            display: grid;
            gap: 2px;
          }

          .lang-name {
            font-size: 13px;
            font-weight: 700;
            color: #ffffff;
          }

          .lang-level {
            color: rgba(245,241,235,0.75);
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            padding: 6px 10px;
            border-radius: 999px;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.14);
            color: #f5f1eb;
            font-size: 11px;
            line-height: 1.2;
          }

          .timeline {
            position: relative;
            display: grid;
            gap: 18px;
            padding-left: 18px;
          }

          .timeline::before {
            content: '';
            position: absolute;
            left: 0;
            top: 3px;
            bottom: 3px;
            width: 1px;
            background: #b7aba0;
          }

          .timeline-item {
            position: relative;
          }

          .timeline-item::before {
            content: '';
            position: absolute;
            left: -22px;
            top: 5px;
            width: 9px;
            height: 9px;
            background: #3a3438;
            transform: rotate(45deg);
          }

          .entry-list {
            display: grid;
            gap: 16px;
          }

          .compact-list {
            gap: 14px;
          }

          .entry-head {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 12px;
          }

          .entry-title {
            font-size: 15px;
            font-weight: 800;
            color: #2f2a2d;
          }

          .entry-date {
            font-size: 11px;
            font-weight: 700;
            color: #7a6e63;
            white-space: nowrap;
          }

          .entry-subtitle {
            margin-top: 3px;
            font-size: 12.5px;
            color: #5c555a;
            font-weight: 600;
          }

          .sep {
            margin: 0 6px;
          }

          .bullet-list {
            margin: 8px 0 0;
            padding-left: 18px;
            color: #4f484d;
            font-size: 12.5px;
          }

          .bullet-list li {
            margin: 0 0 4px;
          }

          .entry-text {
            margin: 7px 0 0;
            color: #4f484d;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
          }

          .mini-tag {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 999px;
            background: #e5ddd3;
            color: #4a4348;
            font-size: 10.5px;
            font-weight: 700;
            white-space: nowrap;
          }

          .project-url {
            margin-top: 8px;
            color: #6c6258;
            word-break: break-word;
          }

          .compact-entry,
          .project-card,
          .entry {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          @media print {
            :host {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          <div class="sidebar">
            ${contact}
            ${languages}
            ${skills}
          </div>
          <div class="main">
            ${header}
            ${profile}
            ${experience}
            ${projects}
            ${achievements}
            ${education}
            ${certifications}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-prism-v1')) {
    customElements.define('gqr-resume-prism-v1', GQRResumePrismV1);
  }
})();