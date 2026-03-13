(function() {
  'use strict';

  /**
   * name: gqr-resume-moss-v2
   * description: "Two-column resume with a warm taupe sidebar, soft ivory main panel, elegant serif headings, and refined editorial dividers inspired by a classic portfolio layout."
   */

  class GQRResumeMossV2 extends HTMLElement {
    static get observedAttributes() {
      return ['language'];
    }

    constructor() {
      super();
      this._data = {};
      this.attachShadow({ mode: 'open' });
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

    formatShortDate(value, lang) {
      const v = this.safeStr(value).trim();
      if (!v) return '';
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };

      if (/^\d{4}$/.test(v)) return v;

      const m = v.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
      if (m) {
        const year = m[1];
        const monthIndex = parseInt(m[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return months[lang === 'es' ? 'es' : 'en'][monthIndex] + ' ' + year;
        }
      }

      const d = new Date(v);
      if (!isNaN(d.getTime())) {
        return months[lang === 'es' ? 'es' : 'en'][d.getMonth()] + ' ' + d.getFullYear();
      }

      return v;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const label = this.i18n[lang].present;
      const start = this.formatShortDate(startDate, lang);
      const end = isCurrentLike ? label : this.formatShortDate(endDate, lang);

      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    sectionTitle(title) {
      return `<div class="section-title">${this.escapeHtml(title)}</div>`;
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
          profile: 'Perfil',
          experience: 'Experiencia',
          education: 'Formación',
          projects: 'Proyectos',
          certifications: 'Certificaciones',
          languages: 'Idiomas',
          achievements: 'Logros',
          skills: 'Habilidades',
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

    renderContactSection(labels) {
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

      const items = [];
      if (email) {
        items.push(`
          <div class="contact-item">
            <span class="icon">✉</span>
            <span class="contact-text">${this.escapeHtml(email)}</span>
          </div>
        `);
      }
      if (phone) {
        items.push(`
          <div class="contact-item">
            <span class="icon">☎</span>
            <span class="contact-text">${this.escapeHtml(phone)}</span>
          </div>
        `);
      }
      if (country) {
        items.push(`
          <div class="contact-item">
            <span class="icon">⌂</span>
            <span class="contact-text">${this.escapeHtml(country)}</span>
          </div>
        `);
      }
      if (linkedin) {
        items.push(`
          <div class="contact-item">
            <span class="icon">in</span>
            <span class="contact-text">${this.escapeHtml(linkedin)}</span>
          </div>
        `);
      }

      if (!items.length) return '';

      return `
        <section class="sidebar-section" data-section="contact">
          ${this.sectionTitle(labels.contact)}
          <div class="section-body contact-list">
            ${items.join('')}
          </div>
        </section>
      `;
    }

    renderLanguagesSection(labels, lang) {
      const languages = this.safeArr(this.data?.languages).filter(Boolean);
      if (!languages.length) return '';

      return `
        <section class="sidebar-section" data-section="languages">
          ${this.sectionTitle(labels.languages)}
          <div class="section-body stack">
            ${languages.map((item, idx) => {
              const id = this.safeStr(item?.id).trim() || `language-${idx}`;
              const name = this.safeStr(item?.name).trim();
              const levelKey = this.safeStr(item?.level).trim().toLowerCase();
              const level = this.levelMap[lang]?.[levelKey] || this.safeStr(item?.level).trim();
              if (!name && !level) return '';
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

    renderSkillsSection(labels) {
      const merged = [...this.safeArr(this.data?.skillsRaw), ...this.safeArr(this.data?.toolsRaw)]
        .map(v => this.safeStr(v).trim())
        .filter(Boolean);

      const deduped = Array.from(new Set(merged.map(v => v.toLowerCase())))
        .map(lower => merged.find(v => v.toLowerCase() === lower))
        .filter(Boolean);

      if (!deduped.length) return '';

      return `
        <section class="sidebar-section" data-section="skills">
          ${this.sectionTitle(labels.skills)}
          <div class="section-body skills-wrap">
            ${deduped.map((skill, idx) => `
              <span class="skill-badge" data-entry-id="skill-${idx}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderHeaderSection() {
      const firstName = this.safeStr(this.data?.firstName).trim();
      const lastName = this.safeStr(this.data?.lastName).trim();
      const profession = this.safeStr(this.data?.profession).trim();
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      if (!fullName && !profession) return '';

      return `
        <section class="main-section header-block" data-section="header">
          ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
          ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
        </section>
      `;
    }

    renderProfileSection(labels) {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';

      return `
        <section class="main-section" data-section="profile">
          ${this.sectionTitle(labels.profile)}
          <div class="section-body">
            <p class="summary">${this.escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderExperienceSection(labels) {
      const items = this.safeArr(this.data?.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="main-section" data-section="experience">
          ${this.sectionTitle(labels.experience)}
          <div class="section-body entries">
            ${items.map((item, idx) => {
              const id = this.safeStr(item?.id).trim() || `experience-${idx}`;
              const title = this.safeStr(item?.title).trim();
              const company = this.safeStr(item?.company).trim();
              const location = this.safeStr(item?.location).trim();
              const dateRange = this.formatDateRange(
                this.safeStr(item?.startDate),
                this.safeStr(item?.endDate),
                !!item?.isCurrent
              );
              const bullets = [
                ...this.safeArr(item?.achievements),
                ...this.safeArr(item?.responsibilities)
              ].map(v => this.safeStr(v).trim()).filter(Boolean);

              if (!title && !company && !location && !dateRange && !bullets.length) return '';

              const sublineParts = [company, location].filter(Boolean);
              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${sublineParts.length ? `<div class="entry-subtitle">${this.escapeHtml(sublineParts.join(' · '))}</div>` : ''}
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
      `;
    }

    renderProjectsSection(labels) {
      const items = this.safeArr(this.data?.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="main-section" data-section="projects">
          ${this.sectionTitle(labels.projects)}
          <div class="section-body entries compact-entries">
            ${items.map((item, idx) => {
              const id = this.safeStr(item?.id).trim() || `project-${idx}`;
              const name = this.safeStr(item?.name).trim();
              const description = this.safeStr(item?.description).trim();
              const techs = this.safeArr(item?.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const url = this.safeStr(item?.url).trim();
              const dateRange = this.formatDateRange(
                this.safeStr(item?.startDate),
                this.safeStr(item?.endDate),
                !!item?.isOngoing
              );

              if (!name && !description && !techs.length && !url && !dateRange) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                  ${techs.length ? `<div class="meta-line"><strong>Tech:</strong> ${this.escapeHtml(techs.join(', '))}</div>` : ''}
                  ${url ? `<div class="meta-line"><strong>URL:</strong> ${this.escapeHtml(url)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievementsSection(labels) {
      const items = this.safeArr(this.data?.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="main-section" data-section="achievements">
          ${this.sectionTitle(labels.achievements)}
          <div class="section-body entries compact-entries">
            ${items.map((item, idx) => {
              const id = this.safeStr(item?.id).trim() || `achievement-${idx}`;
              const title = this.safeStr(item?.title).trim();
              const description = this.safeStr(item?.description).trim();
              const year = this.safeStr(item?.year).trim();

              if (!title && !description && !year) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
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

    renderEducationSection(labels) {
      const items = this.safeArr(this.data?.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="main-section" data-section="education">
          ${this.sectionTitle(labels.education)}
          <div class="section-body entries">
            ${items.map((item, idx) => {
              const id = this.safeStr(item?.id).trim() || `education-${idx}`;
              const institution = this.safeStr(item?.institution).trim();
              const degree = this.safeStr(item?.degree).trim();
              const field = this.safeStr(item?.field).trim();
              const gpa = this.safeStr(item?.gpa).trim();
              const dateRange = this.formatDateRange(
                this.safeStr(item?.startDate),
                this.safeStr(item?.endDate),
                item?.isCompleted === false
              );

              if (!institution && !degree && !field && !gpa && !dateRange) return '';

              const title = [degree, field].filter(Boolean).join(' — ');

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${gpa ? `<div class="meta-line"><strong>GPA:</strong> ${this.escapeHtml(gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertificationsSection(labels) {
      const items = this.safeArr(this.data?.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="main-section" data-section="certifications">
          ${this.sectionTitle(labels.certifications)}
          <div class="section-body entries compact-entries">
            ${items.map((item, idx) => {
              const id = this.safeStr(item?.id).trim() || `certification-${idx}`;
              const name = this.safeStr(item?.name).trim();
              const issuer = this.safeStr(item?.issuer).trim();
              const date = this.safeStr(item?.date).trim();

              if (!name && !issuer && !date) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
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

    render() {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const labels = this.i18n[lang];

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2f2926;
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
            background: #f6f0e8;
            display: grid;
            grid-template-columns: 34% 66%;
            font-family: Georgia, "Times New Roman", serif;
            border: 1px solid #b8aa9c;
          }

          .sidebar {
            background: #4c433d;
            color: #f3ede5;
            padding: 18mm 8mm 16mm 10mm;
            display: flex;
            flex-direction: column;
            gap: 10mm;
            border-right: 1px solid rgba(243, 237, 229, 0.25);
          }

          .main {
            background: #f6f0e8;
            color: #2f2926;
            padding: 16mm 12mm 16mm 12mm;
            display: flex;
            flex-direction: column;
            gap: 7mm;
          }

          .main-section,
          .sidebar-section {
            display: block;
          }

          .header-block {
            padding: 0 0 5mm 0;
            border-bottom: 1.5px solid #aa9685;
            margin-bottom: 1mm;
          }

          .name {
            margin: 0;
            font-size: 30px;
            line-height: 1.05;
            letter-spacing: 0.6px;
            font-weight: 500;
            text-transform: uppercase;
            color: #3c332e;
          }

          .profession {
            margin-top: 3mm;
            font-family: "Trebuchet MS", Arial, sans-serif;
            font-size: 12px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #7b6859;
          }

          .section-title {
            position: relative;
            margin: 0 0 4mm 0;
            padding-bottom: 2.5mm;
            font-size: 13px;
            line-height: 1.1;
            letter-spacing: 1.8px;
            text-transform: uppercase;
            color: inherit;
          }

          .main .section-title {
            color: #4c433d;
            border-bottom: 1px solid #bcae9f;
          }

          .sidebar .section-title {
            color: #f3ede5;
            border-bottom: 1px solid rgba(243, 237, 229, 0.35);
          }

          .section-body {
            font-family: "Trebuchet MS", Arial, sans-serif;
            font-size: 11.2px;
            line-height: 1.55;
          }

          .summary,
          .entry-text {
            margin: 0;
            white-space: pre-wrap;
            word-break: break-word;
          }

          .stack {
            display: flex;
            flex-direction: column;
            gap: 3.5mm;
          }

          .contact-list {
            display: flex;
            flex-direction: column;
            gap: 3mm;
          }

          .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 8px;
          }

          .icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            min-width: 18px;
            height: 18px;
            border: 1px solid rgba(243, 237, 229, 0.45);
            border-radius: 999px;
            font-size: 9px;
            line-height: 1;
            color: #f3ede5;
            margin-top: 1px;
          }

          .contact-text {
            word-break: break-word;
          }

          .lang-item {
            padding: 0 0 3mm 0;
            border-bottom: 1px solid rgba(243, 237, 229, 0.14);
          }

          .lang-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .lang-name {
            font-weight: 700;
            font-size: 11.2px;
            color: #fff8f1;
          }

          .lang-level {
            font-size: 10.5px;
            color: #d8cdc1;
            margin-top: 1mm;
            text-transform: uppercase;
            letter-spacing: 0.7px;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            padding: 5px 9px;
            border-radius: 999px;
            background: rgba(243, 237, 229, 0.11);
            border: 1px solid rgba(243, 237, 229, 0.24);
            color: #f8f4ef;
            font-size: 10px;
            line-height: 1.2;
            letter-spacing: 0.2px;
          }

          .entries {
            display: flex;
            flex-direction: column;
            gap: 5mm;
          }

          .compact-entries {
            gap: 4mm;
          }

          .entry {
            position: relative;
          }

          .timeline-entry {
            padding-left: 12px;
          }

          .timeline-entry::before {
            content: '';
            position: absolute;
            left: 0;
            top: 4px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #7f6a5b;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 1.5mm;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-size: 13px;
            line-height: 1.25;
            font-weight: 500;
            color: #352d29;
          }

          .entry-subtitle {
            margin-top: 0.8mm;
            font-family: "Trebuchet MS", Arial, sans-serif;
            font-size: 10.8px;
            line-height: 1.4;
            color: #77685d;
          }

          .entry-date {
            font-family: "Trebuchet MS", Arial, sans-serif;
            font-size: 10.2px;
            line-height: 1.3;
            color: #7b6859;
            white-space: nowrap;
            text-align: right;
            letter-spacing: 0.3px;
          }

          .bullet-list {
            margin: 2mm 0 0 0;
            padding-left: 16px;
          }

          .bullet-list li {
            margin: 0 0 1.1mm 0;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .meta-line {
            margin-top: 1.5mm;
            color: #5c5149;
            word-break: break-word;
          }

          strong {
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
            ${this.renderContactSection(labels)}
            ${this.renderLanguagesSection(labels, lang)}
            ${this.renderSkillsSection(labels)}
          </div>

          <div class="main">
            ${this.renderHeaderSection()}
            ${this.renderProfileSection(labels)}
            ${this.renderExperienceSection(labels)}
            ${this.renderProjectsSection(labels)}
            ${this.renderAchievementsSection(labels)}
            ${this.renderEducationSection(labels)}
            ${this.renderCertificationsSection(labels)}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-moss-v2')) {
    customElements.define('gqr-resume-moss-v2', GQRResumeMossV2);
  }
})();