(function() {
  'use strict';

  /**
   * name: gqr-resume-mint-v2
   * description: "Two-column resume with a dark charcoal sidebar, warm amber section accents, and a clean light main panel with modern sans-serif typography."
   */

  class GQRResumeMintV2 extends HTMLElement {
    static get observedAttributes() {
      return ['language'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._data = {};
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

    get i18n() {
      return {
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
          profile: 'Sobre mí',
          experience: 'Experiencia',
          education: 'Educación',
          projects: 'Proyectos',
          certifications: 'Certificaciones',
          languages: 'Idiomas',
          achievements: 'Logros',
          skills: 'Fortalezas',
          contact: 'Contacto',
          present: 'Presente'
        }
      };
    }

    get levelMap() {
      return {
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
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };
      const match = value.match(/^(\d{4})(?:-(\d{2}))?/);
      if (!match) return this.escapeHtml(value);
      const year = match[1];
      const monthIndex = match[2] ? parseInt(match[2], 10) - 1 : null;
      if (monthIndex != null && monthIndex >= 0 && monthIndex < 12) {
        return `${months[lang] ? months[lang][monthIndex] : months.en[monthIndex]} ${year}`;
      }
      return year;
    }

    formatDateRange(startDate, endDate, isCurrentLike, lang) {
      const dict = this.i18n[lang] || this.i18n.en;
      const start = this.formatDate(startDate, lang);
      const end = isCurrentLike ? dict.present : this.formatDate(endDate, lang);
      if (start && end) return `${start} - ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderContactSection(t, data) {
      const email = this.safeStr(data.email).trim();
      const phone = this.safeStr(data.phone).trim();
      const country = this.safeStr(data.country).trim();
      const linkedin = this.safeStr(data.linkedin).trim();

      const items = [];
      if (email) items.push(`<li><span class="dot"></span><span>${this.escapeHtml(email)}</span></li>`);
      if (phone) items.push(`<li><span class="dot"></span><span>${this.escapeHtml(phone)}</span></li>`);
      if (country) items.push(`<li><span class="dot"></span><span>${this.escapeHtml(country)}</span></li>`);
      if (linkedin) items.push(`<li><span class="dot"></span><span>${this.escapeHtml(linkedin)}</span></li>`);

      if (!items.length) return '';
      return `
        <section class="section side-section" data-section="contact">
          <div class="section-title side-title">${this.escapeHtml(t.contact)}</div>
          <ul class="contact-list">
            ${items.join('')}
          </ul>
        </section>
      `;
    }

    renderLanguagesSection(t, lang, data) {
      const languages = this.safeArr(data.languages).filter(Boolean);
      if (!languages.length) return '';

      return `
        <section class="section side-section" data-section="languages">
          <div class="section-title side-title">${this.escapeHtml(t.languages)}</div>
          <div class="language-list">
            ${languages.map((item) => {
              const id = this.safeStr(item.id).trim();
              const name = this.safeStr(item.name).trim();
              const levelKey = this.safeStr(item.level).trim().toLowerCase();
              const level = (this.levelMap[lang] || this.levelMap.en)[levelKey] || this.safeStr(item.level);
              if (!name) return '';
              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                  <div class="language-name">${this.escapeHtml(name)}</div>
                  <div class="language-level">${this.escapeHtml(level)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderSkillsSection(t, data) {
      const merged = [...this.safeArr(data.skillsRaw), ...this.safeArr(data.toolsRaw)]
        .map((s) => this.safeStr(s).trim())
        .filter(Boolean);

      const seen = new Set();
      const skills = merged.filter((s) => {
        const key = s.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      if (!skills.length) return '';

      return `
        <section class="section side-section" data-section="skills">
          <div class="section-title side-title">${this.escapeHtml(t.skills)}</div>
          <div class="skills-wrap">
            ${skills.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderHeaderSection(data) {
      const firstName = this.safeStr(data.firstName).trim();
      const lastName = this.safeStr(data.lastName).trim();
      const profession = this.safeStr(data.profession).trim();
      const fullName = [firstName, lastName].filter(Boolean).join(' ');

      if (!fullName && !profession) return '';

      return `
        <section class="hero" data-section="header">
          ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
          ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
        </section>
      `;
    }

    renderProfileSection(t, data) {
      const summary = this.safeStr(data.summary).trim();
      if (!summary) return '';
      return `
        <section class="section main-section" data-section="profile">
          <div class="section-title main-title">${this.escapeHtml(t.profile)}</div>
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection(t, lang, data) {
      const experience = this.safeArr(data.experience).filter(Boolean);
      if (!experience.length) return '';

      return `
        <section class="section main-section" data-section="experience">
          <div class="section-title main-title">${this.escapeHtml(t.experience)}</div>
          <div class="timeline">
            ${experience.map((item) => {
              const id = this.safeStr(item.id).trim();
              const title = this.safeStr(item.title).trim();
              const company = this.safeStr(item.company).trim();
              const location = this.safeStr(item.location).trim();
              const dateRange = this.formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang);
              const bullets = [
                ...this.safeArr(item.achievements),
                ...this.safeArr(item.responsibilities)
              ]
                .map((b) => this.safeStr(b).trim())
                .filter(Boolean);

              if (!title && !company && !dateRange && !bullets.length) return '';

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `<div class="entry-subtitle">${this.escapeHtml([company, location].filter(Boolean).join(' • '))}</div>` : ''}
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
      `;
    }

    renderProjectsSection(t, lang, data) {
      const projects = this.safeArr(data.projects).filter(Boolean);
      if (!projects.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          <div class="section-title main-title">${this.escapeHtml(t.projects)}</div>
          <div class="stack-list">
            ${projects.map((item) => {
              const id = this.safeStr(item.id).trim();
              const name = this.safeStr(item.name).trim();
              const description = this.safeStr(item.description).trim();
              const technologies = this.safeArr(item.technologies).map((x) => this.safeStr(x).trim()).filter(Boolean);
              const url = this.safeStr(item.url).trim();
              const dateRange = this.formatDateRange(item.startDate, item.endDate, !!item.isOngoing, lang);

              if (!name && !description && !technologies.length && !url && !dateRange) return '';

              return `
                <article class="entry card-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
                      ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                      ${dateRange ? `<div class="entry-subtitle">${this.escapeHtml(dateRange)}</div>` : ''}
                    </div>
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map((tech) => `<span class="tag">${this.escapeHtml(tech)}</span>`).join('')}
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

    renderAchievementsSection(t, data) {
      const achievements = this.safeArr(data.achievements).filter(Boolean);
      if (!achievements.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          <div class="section-title main-title">${this.escapeHtml(t.achievements)}</div>
          <div class="stack-list">
            ${achievements.map((item) => {
              const id = this.safeStr(item.id).trim();
              const title = this.safeStr(item.title).trim();
              const description = this.safeStr(item.description).trim();
              const year = this.safeStr(item.year).trim();

              if (!title && !description && !year) return '';

              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                    </div>
                    ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducationSection(t, lang, data) {
      const education = this.safeArr(data.education).filter(Boolean);
      if (!education.length) return '';

      return `
        <section class="section main-section" data-section="education">
          <div class="section-title main-title">${this.escapeHtml(t.education)}</div>
          <div class="timeline">
            ${education.map((item) => {
              const id = this.safeStr(item.id).trim();
              const institution = this.safeStr(item.institution).trim();
              const degree = this.safeStr(item.degree).trim();
              const field = this.safeStr(item.field).trim();
              const gpa = this.safeStr(item.gpa).trim();
              const dateRange = this.formatDateRange(item.startDate, item.endDate, item.isCompleted === false, lang);

              const heading = [degree, field].filter(Boolean).join(' — ');
              if (!institution && !heading && !gpa && !dateRange) return '';

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
                      ${heading ? `<h3 class="entry-title">${this.escapeHtml(heading)}</h3>` : ''}
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
      `;
    }

    renderCertificationsSection(t, data) {
      const certifications = this.safeArr(data.certifications).filter(Boolean);
      if (!certifications.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          <div class="section-title main-title">${this.escapeHtml(t.certifications)}</div>
          <div class="stack-list">
            ${certifications.map((item) => {
              const id = this.safeStr(item.id).trim();
              const name = this.safeStr(item.name).trim();
              const issuer = this.safeStr(item.issuer).trim();
              const date = this.safeStr(item.date).trim();

              if (!name && !issuer && !date) return '';

              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
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

    render() {
      const data = this.data || {};
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang] || this.i18n.en;

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #1c1c1c;
            background: transparent;
            font-family: Inter, "Segoe UI", Roboto, Arial, sans-serif;
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
            display: grid;
            grid-template-columns: 34% 66%;
            background: linear-gradient(90deg, #1d1f22 0 34%, #f5f2eb 34% 100%);
          }

          .sidebar {
            background: #1d1f22;
            color: #f5f1e8;
            padding: 18mm 9mm 16mm 11mm;
          }

          .main {
            background: #f5f2eb;
            color: #1d1f22;
            padding: 14mm 12mm 16mm 12mm;
          }

          .hero {
            margin-bottom: 10mm;
            padding-bottom: 7mm;
            border-bottom: 1.5px solid rgba(199, 146, 41, 0.35);
          }

          .name {
            margin: 0;
            color: #b8871f;
            font-size: 15pt;
            line-height: 1.05;
            font-weight: 800;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 3mm;
            color: #4a4338;
            font-size: 10.5pt;
            font-weight: 600;
            letter-spacing: 0.3px;
          }

          .section {
            margin: 0 0 8mm 0;
          }

          .section-title {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 0 0 4mm 0;
            font-size: 10.5pt;
            font-weight: 800;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .side-title {
            color: #e0a31b;
          }

          .main-title {
            color: #d49512;
            position: relative;
          }

          .main-title::before,
          .side-title::before {
            content: "";
            width: 10px;
            height: 10px;
            border-radius: 50%;
            flex: 0 0 10px;
            background: #e0a31b;
            box-shadow: 0 0 0 2px rgba(224, 163, 27, 0.18);
          }

          .profile-text,
          .entry-text,
          .contact-list li,
          .bullet-list li,
          .language-level,
          .project-link {
            font-size: 8.8pt;
            line-height: 1.5;
          }

          .profile-text,
          .entry-text {
            color: #3f3a32;
          }

          .contact-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .contact-list li {
            display: grid;
            grid-template-columns: 8px 1fr;
            gap: 8px;
            align-items: start;
            margin-bottom: 2.5mm;
            color: #efe8db;
            word-break: break-word;
          }

          .dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #e0a31b;
            margin-top: 5px;
          }

          .language-list {
            display: grid;
            gap: 3.5mm;
          }

          .language-item {
            padding-left: 8px;
            border-left: 1.5px solid rgba(224, 163, 27, 0.6);
          }

          .language-name {
            color: #fff7ea;
            font-size: 9pt;
            font-weight: 700;
            margin-bottom: 1px;
          }

          .language-level {
            color: #cfc6b7;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            padding: 4px 8px;
            border-radius: 999px;
            background: rgba(224, 163, 27, 0.12);
            border: 1px solid rgba(224, 163, 27, 0.45);
            color: #f4e8d2;
            font-size: 8pt;
            line-height: 1.2;
            font-weight: 600;
          }

          .timeline,
          .stack-list {
            display: grid;
            gap: 5mm;
          }

          .entry {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .timeline-entry {
            position: relative;
            padding-left: 12px;
            border-left: 1.5px solid rgba(212, 149, 18, 0.45);
          }

          .timeline-entry::before {
            content: "";
            position: absolute;
            left: -4.5px;
            top: 2px;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #d49512;
          }

          .card-entry,
          .compact-entry {
            padding: 0;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 1.6mm;
          }

          .entry-title {
            margin: 0;
            font-size: 10pt;
            line-height: 1.3;
            font-weight: 800;
            color: #201c17;
          }

          .entry-subtitle {
            margin-top: 1px;
            font-size: 8.4pt;
            line-height: 1.35;
            color: #716858;
            font-style: italic;
          }

          .entry-date {
            flex: 0 0 auto;
            text-align: right;
            font-size: 8pt;
            line-height: 1.3;
            color: #8d7d66;
            font-weight: 700;
            white-space: nowrap;
          }

          .bullet-list {
            margin: 2mm 0 0 0;
            padding-left: 16px;
            color: #3f3a32;
          }

          .bullet-list li {
            margin-bottom: 1.2mm;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2mm;
          }

          .tag {
            display: inline-block;
            white-space: nowrap;
            padding: 3px 7px;
            border-radius: 999px;
            background: rgba(212, 149, 18, 0.1);
            border: 1px solid rgba(212, 149, 18, 0.28);
            color: #6a541d;
            font-size: 7.7pt;
            font-weight: 700;
          }

          .project-link {
            margin-top: 2mm;
            color: #8b6a13;
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
          <div class="sidebar">
            ${this.renderContactSection(t, data)}
            ${this.renderLanguagesSection(t, lang, data)}
            ${this.renderSkillsSection(t, data)}
          </div>

          <div class="main">
            ${this.renderHeaderSection(data)}
            ${this.renderProfileSection(t, data)}
            ${this.renderExperienceSection(t, lang, data)}
            ${this.renderProjectsSection(t, lang, data)}
            ${this.renderAchievementsSection(t, data)}
            ${this.renderEducationSection(t, lang, data)}
            ${this.renderCertificationsSection(t, data)}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-mint-v2')) {
    customElements.define('gqr-resume-mint-v2', GQRResumeMintV2);
  }
})();