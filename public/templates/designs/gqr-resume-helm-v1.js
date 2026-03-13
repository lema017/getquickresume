(function() {
  'use strict';

  /**
   * name: gqr-resume-helm-v1
   * description: "Two-column resume with a dark charcoal sidebar, soft sage full-width header, bold condensed headings, and a clean editorial main column."
   */

  class GQRResumeHelmV1 extends HTMLElement {
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
          education: 'Estudios',
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
      return typeof v === 'string' ? v : '';
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
      if (/^\d{4}$/.test(v)) return v;
      if (/^\d{4}-\d{2}$/.test(v)) {
        const parts = v.split('-');
        const year = parts[0];
        const monthIndex = parseInt(parts[1], 10) - 1;
        const label = (months[lang] || months.en)[monthIndex];
        return label ? (label + ' ' + year) : year;
      }
      const d = new Date(v);
      if (!isNaN(d.getTime())) {
        const label = (months[lang] || months.en)[d.getMonth()];
        return label + ' ' + d.getFullYear();
      }
      return v;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const start = this.formatDate(startDate, lang);
      const end = isCurrentLike
        ? this.i18n[lang].present
        : this.formatDate(endDate, lang);
      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    getSectionTitle(key) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      return this.i18n[lang][key] || this.i18n.en[key] || key;
    }

    getLevelLabel(level) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const normalized = this.safeStr(level).toLowerCase();
      return this.levelMap[lang][normalized] || this.escapeHtml(level);
    }

    renderContactSection(d) {
      const items = [];
      const email = this.safeStr(d.email);
      const phone = this.safeStr(d.phone);
      const country = this.safeStr(d.country);
      const linkedin = this.safeStr(d.linkedin);

      if (email) items.push(`<div class="contact-item"><span class="dot"></span><span>${this.escapeHtml(email)}</span></div>`);
      if (phone) items.push(`<div class="contact-item"><span class="dot"></span><span>${this.escapeHtml(phone)}</span></div>`);
      if (country) items.push(`<div class="contact-item"><span class="dot"></span><span>${this.escapeHtml(country)}</span></div>`);
      if (linkedin) items.push(`<div class="contact-item"><span class="dot"></span><span>${this.escapeHtml(linkedin)}</span></div>`);

      if (!items.length) return '';
      return `
        <section class="section sidebar-section" data-section="contact">
          <h3 class="section-title sidebar-title">${this.escapeHtml(this.getSectionTitle('contact'))}</h3>
          <div class="contact-list">${items.join('')}</div>
        </section>
      `;
    }

    renderLanguagesSection(d) {
      const langs = this.safeArr(d.languages).filter(Boolean);
      if (!langs.length) return '';
      return `
        <section class="section sidebar-section" data-section="languages">
          <h3 class="section-title sidebar-title">${this.escapeHtml(this.getSectionTitle('languages'))}</h3>
          <div class="language-list">
            ${langs.map((item) => `
              <div class="language-item" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                <div class="language-name">${this.escapeHtml(this.safeStr(item.name))}</div>
                <div class="language-level">${this.escapeHtml(this.getLevelLabel(this.safeStr(item.level)))}</div>
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderSkillsSection(d) {
      const skills = this.safeArr(d.skillsRaw);
      const tools = this.safeArr(d.toolsRaw);
      const merged = [...skills, ...tools]
        .map((s) => this.safeStr(s).trim())
        .filter(Boolean);

      const deduped = [];
      const seen = new Set();
      merged.forEach((item) => {
        const key = item.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          deduped.push(item);
        }
      });

      if (!deduped.length) return '';
      return `
        <section class="section sidebar-section" data-section="skills">
          <h3 class="section-title sidebar-title">${this.escapeHtml(this.getSectionTitle('skills'))}</h3>
          <div class="skills-wrap">
            ${deduped.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderHeaderSection(d) {
      const firstName = this.safeStr(d.firstName);
      const lastName = this.safeStr(d.lastName);
      const profession = this.safeStr(d.profession);
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      if (!fullName && !profession) return '';
      return `
        <section class="top-header" data-section="header">
          <div class="name-block">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
        </section>
      `;
    }

    renderProfileSection(d) {
      const summary = this.safeStr(d.summary);
      if (!summary) return '';
      return `
        <section class="section main-section" data-section="profile">
          <h3 class="section-title main-title">${this.escapeHtml(this.getSectionTitle('profile'))}</h3>
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection(d) {
      const items = this.safeArr(d.experience).filter(Boolean);
      if (!items.length) return '';
      return `
        <section class="section main-section" data-section="experience">
          <h3 class="section-title main-title">${this.escapeHtml(this.getSectionTitle('experience'))}</h3>
          <div class="entry-list">
            ${items.map((item) => {
              const title = this.safeStr(item.title);
              const company = this.safeStr(item.company);
              const location = this.safeStr(item.location);
              const dateRange = this.formatDateRange(item.startDate, item.endDate, !!item.isCurrent);
              const bullets = [...this.safeArr(item.achievements), ...this.safeArr(item.responsibilities)]
                .map((b) => this.safeStr(b).trim())
                .filter(Boolean);

              const metaParts = [company, location].filter(Boolean);

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="entry-top">
                    <div class="entry-heading">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                      ${metaParts.length ? `<div class="entry-subtitle">${this.escapeHtml(metaParts.join(' · '))}</div>` : ''}
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

    renderProjectsSection(d) {
      const items = this.safeArr(d.projects).filter(Boolean);
      if (!items.length) return '';
      return `
        <section class="section main-section" data-section="projects">
          <h3 class="section-title main-title">${this.escapeHtml(this.getSectionTitle('projects'))}</h3>
          <div class="entry-list">
            ${items.map((item) => {
              const name = this.safeStr(item.name);
              const description = this.safeStr(item.description);
              const technologies = this.safeArr(item.technologies).map((t) => this.safeStr(t).trim()).filter(Boolean);
              const url = this.safeStr(item.url);
              const dateRange = this.formatDateRange(item.startDate, item.endDate, !!item.isOngoing);

              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="entry-top">
                    <div class="entry-heading">
                      ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                      ${url ? `<div class="entry-subtitle">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `<div class="tag-row">${technologies.map((t) => `<span class="tag">${this.escapeHtml(t)}</span>`).join('')}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievementsSection(d) {
      const items = this.safeArr(d.achievements).filter(Boolean);
      if (!items.length) return '';
      return `
        <section class="section main-section" data-section="achievements">
          <h3 class="section-title main-title">${this.escapeHtml(this.getSectionTitle('achievements'))}</h3>
          <div class="entry-list">
            ${items.map((item) => `
              <article class="entry compact-entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                <div class="entry-top">
                  <div class="entry-heading">
                    ${this.safeStr(item.title) ? `<div class="entry-title">${this.escapeHtml(this.safeStr(item.title))}</div>` : ''}
                  </div>
                  ${this.safeStr(item.year) ? `<div class="entry-date">${this.escapeHtml(this.safeStr(item.year))}</div>` : ''}
                </div>
                ${this.safeStr(item.description) ? `<div class="entry-text">${this.escapeHtml(this.safeStr(item.description))}</div>` : ''}
              </article>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderEducationSection(d) {
      const items = this.safeArr(d.education).filter(Boolean);
      if (!items.length) return '';
      return `
        <section class="section main-section" data-section="education">
          <h3 class="section-title main-title">${this.escapeHtml(this.getSectionTitle('education'))}</h3>
          <div class="entry-list">
            ${items.map((item) => {
              const degree = this.safeStr(item.degree);
              const field = this.safeStr(item.field);
              const institution = this.safeStr(item.institution);
              const gpa = this.safeStr(item.gpa);
              const title = [degree, field].filter(Boolean).join(degree && field ? ' — ' : '');
              const dateRange = this.formatDateRange(item.startDate, item.endDate, item.isCompleted === false);

              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="entry-top">
                    <div class="entry-heading">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
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

    renderCertificationsSection(d) {
      const items = this.safeArr(d.certifications).filter(Boolean);
      if (!items.length) return '';
      return `
        <section class="section main-section" data-section="certifications">
          <h3 class="section-title main-title">${this.escapeHtml(this.getSectionTitle('certifications'))}</h3>
          <div class="entry-list">
            ${items.map((item) => {
              const name = this.safeStr(item.name);
              const issuer = this.safeStr(item.issuer);
              const date = this.safeStr(item.date);
              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="entry-top">
                    <div class="entry-heading">
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

      const headerSection = this.renderHeaderSection(d);
      const contactSection = this.renderContactSection(d);
      const languagesSection = this.renderLanguagesSection(d);
      const skillsSection = this.renderSkillsSection(d);
      const profileSection = this.renderProfileSection(d);
      const experienceSection = this.renderExperienceSection(d);
      const projectsSection = this.renderProjectsSection(d);
      const achievementsSection = this.renderAchievementsSection(d);
      const educationSection = this.renderEducationSection(d);
      const certificationsSection = this.renderCertificationsSection(d);

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #243233;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-family: "Arial Narrow", Arial, Helvetica, sans-serif;
          }

          * {
            box-sizing: border-box;
          }

          .page {
            width: 210mm;
            min-height: 297mm;
            height: auto;
            overflow: visible;
            background: #f7f7f4;
            display: grid;
            grid-template-columns: 34% 66%;
            grid-template-rows: auto 1fr;
            margin: 0 auto;
          }

          .top-header {
            grid-column: 1 / -1;
            background: #bccdca;
            color: #ffffff;
            padding: 22mm 16mm 12mm 16mm;
            min-height: 58mm;
            display: flex;
            align-items: flex-end;
          }

          .name-block {
            margin-left: calc(34% - 16mm + 8mm);
          }

          .name {
            margin: 0;
            font-size: 22pt;
            line-height: 0.95;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            font-weight: 800;
          }

          .profession {
            margin-top: 6px;
            font-size: 10.5pt;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            font-style: italic;
            font-weight: 700;
            opacity: 0.95;
          }

          .sidebar {
            background: #17191b;
            color: #f4f4f1;
            padding: 14mm 8mm 16mm 12mm;
            display: flex;
            flex-direction: column;
            gap: 12mm;
          }

          .main {
            background: #f7f7f4;
            color: #243233;
            padding: 12mm 14mm 16mm 14mm;
            display: flex;
            flex-direction: column;
            gap: 10mm;
          }

          .section {
            display: block;
          }

          .section-title {
            margin: 0 0 5mm 0;
            font-size: 11pt;
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            font-weight: 800;
            display: inline-block;
            padding: 0 6px 1px 0;
          }

          .sidebar-title {
            color: #ffffff;
            border-bottom: 3px solid #bccdca;
          }

          .main-title {
            color: #314849;
            border-bottom: 3px solid #bccdca;
          }

          .contact-list {
            display: flex;
            flex-direction: column;
            gap: 3.5mm;
          }

          .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            font-size: 8.8pt;
            line-height: 1.35;
            word-break: break-word;
          }

          .dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #bccdca;
            margin-top: 4px;
            flex: 0 0 7px;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 4mm;
          }

          .language-item {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 8px;
            align-items: baseline;
            font-size: 9pt;
            line-height: 1.3;
          }

          .language-name {
            font-weight: 700;
            color: #ffffff;
          }

          .language-level {
            color: #d9dfdc;
            font-size: 8.4pt;
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
            border-radius: 999px;
            background: #2a2e31;
            color: #f3f4f2;
            border: 1px solid #4c5a5a;
            font-size: 8.3pt;
            line-height: 1.1;
          }

          .profile-text,
          .entry-text,
          .bullet-list,
          .entry-subtitle,
          .entry-date {
            font-size: 9.1pt;
            line-height: 1.45;
          }

          .profile-text,
          .entry-text {
            color: #354748;
          }

          .entry-list {
            display: flex;
            flex-direction: column;
            gap: 6mm;
          }

          .entry {
            display: block;
          }

          .entry-top {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 10px;
            align-items: start;
          }

          .entry-heading {
            min-width: 0;
          }

          .entry-title {
            color: #223233;
            font-size: 10.2pt;
            line-height: 1.25;
            font-weight: 800;
          }

          .entry-subtitle {
            color: #698180;
            margin-top: 1px;
          }

          .entry-date {
            color: #7a8f8d;
            white-space: nowrap;
            text-align: right;
            font-size: 8.6pt;
            padding-top: 1px;
          }

          .bullet-list {
            margin: 2.5mm 0 0 0;
            padding-left: 16px;
            color: #354748;
          }

          .bullet-list li {
            margin: 0 0 1.5mm 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2.5mm;
          }

          .tag {
            display: inline-block;
            padding: 3px 7px;
            border-radius: 999px;
            background: #dfe7e5;
            color: #365150;
            font-size: 8pt;
            line-height: 1.2;
          }

          .timeline-entry {
            position: relative;
            padding-left: 10px;
            border-left: 2px solid #d6dfdd;
          }

          .timeline-entry::before {
            content: '';
            position: absolute;
            left: -5px;
            top: 2px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #9db4b0;
          }

          .compact-entry + .compact-entry {
            padding-top: 1mm;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${headerSection}
          <div class="sidebar">
            ${contactSection}
            ${languagesSection}
            ${skillsSection}
          </div>
          <div class="main">
            ${profileSection}
            ${experienceSection}
            ${projectsSection}
            ${achievementsSection}
            ${educationSection}
            ${certificationsSection}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-helm-v1')) {
    customElements.define('gqr-resume-helm-v1', GQRResumeHelmV1);
  }
})();