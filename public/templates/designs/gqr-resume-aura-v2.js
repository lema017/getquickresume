(function() {
  'use strict';

  class GQRResumeAuraV2 extends HTMLElement {
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

    formatShortDate(value, lang) {
      const v = this.safeStr(value).trim();
      if (!v) return '';
      const locale = lang === 'es' ? 'es-ES' : 'en-US';

      if (/^\d{4}$/.test(v)) return v;

      if (/^\d{4}-\d{2}$/.test(v)) {
        const [year, month] = v.split('-');
        const d = new Date(Number(year), Number(month) - 1, 1);
        if (Number.isNaN(d.getTime())) return this.escapeHtml(v);
        return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(d);
      }

      const d = new Date(v);
      if (!Number.isNaN(d.getTime())) {
        return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(d);
      }

      return this.escapeHtml(v);
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const labels = this.i18n[lang];
      const start = this.formatShortDate(startDate, lang);
      const end = isCurrentLike ? labels.present : this.formatShortDate(endDate, lang);

      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `<div class="section-heading"><span>${this.escapeHtml(title)}</span></div>`;
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
            <span class="contact-icon">✉</span>
            <span class="contact-text">${this.escapeHtml(email)}</span>
          </div>
        `);
      }
      if (phone) {
        items.push(`
          <div class="contact-item">
            <span class="contact-icon">☎</span>
            <span class="contact-text">${this.escapeHtml(phone)}</span>
          </div>
        `);
      }
      if (country) {
        items.push(`
          <div class="contact-item">
            <span class="contact-icon">⌂</span>
            <span class="contact-text">${this.escapeHtml(country)}</span>
          </div>
        `);
      }
      if (linkedin) {
        items.push(`
          <div class="contact-item">
            <span class="contact-icon">in</span>
            <span class="contact-text">${this.escapeHtml(linkedin)}</span>
          </div>
        `);
      }

      if (!items.length) return '';
      return `
        <section class="section sidebar-section" data-section="contact">
          ${this.renderSectionTitle(labels.contact)}
          <div class="contact-list">${items.join('')}</div>
        </section>
      `;
    }

    renderLanguagesSection(labels) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const rows = this.safeArr(this.data?.languages)
        .map((item, idx) => {
          const id = this.safeStr(item?.id).trim() || `language-${idx}`;
          const name = this.safeStr(item?.name).trim();
          const levelKey = this.safeStr(item?.level).trim().toLowerCase();
          const level = this.levelMap[lang][levelKey] || this.safeStr(item?.level).trim();
          if (!name && !level) return '';
          return `
            <div class="lang-item" data-entry-id="${this.escapeHtml(id)}">
              <div class="lang-name">${this.escapeHtml(name)}</div>
              <div class="lang-level">${this.escapeHtml(level)}</div>
            </div>
          `;
        })
        .filter(Boolean);

      if (!rows.length) return '';
      return `
        <section class="section sidebar-section" data-section="languages">
          ${this.renderSectionTitle(labels.languages)}
          <div class="lang-list">${rows.join('')}</div>
        </section>
      `;
    }

    renderSkillsSection(labels) {
      const skills = this.safeArr(this.data?.skillsRaw);
      const tools = this.safeArr(this.data?.toolsRaw);
      const merged = [...skills, ...tools]
        .map(v => this.safeStr(v).trim())
        .filter(Boolean);

      const deduped = [];
      const seen = new Set();
      merged.forEach(item => {
        const key = item.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          deduped.push(item);
        }
      });

      if (!deduped.length) return '';

      return `
        <section class="section sidebar-section" data-section="skills">
          ${this.renderSectionTitle(labels.skills)}
          <div class="skills-wrap">
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
      const fullName = `${firstName} ${lastName}`.trim();

      if (!fullName && !profession) return '';

      return `
        <section class="hero" data-section="header">
          <div class="hero-accent"></div>
          <div class="hero-inner">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
        </section>
      `;
    }

    renderProfileSection(labels) {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';
      return `
        <section class="section main-section" data-section="profile">
          ${this.renderSectionTitle(labels.profile)}
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection(labels) {
      const items = this.safeArr(this.data?.experience)
        .map((item, idx) => {
          const id = this.safeStr(item?.id).trim() || `experience-${idx}`;
          const title = this.safeStr(item?.title).trim();
          const company = this.safeStr(item?.company).trim();
          const location = this.safeStr(item?.location).trim();
          const dateRange = this.formatDateRange(
            this.safeStr(item?.startDate),
            this.safeStr(item?.endDate),
            !!item?.isCurrent
          );
          const bullets = [...this.safeArr(item?.achievements), ...this.safeArr(item?.responsibilities)]
            .map(v => this.safeStr(v).trim())
            .filter(Boolean);

          if (!title && !company && !location && !dateRange && !bullets.length) return '';

          return `
            <article class="entry" data-entry-id="${this.escapeHtml(id)}">
              <div class="entry-head">
                <div>
                  ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                  ${(company || location) ? `<div class="entry-subtitle">${this.escapeHtml([company, location].filter(Boolean).join(' • '))}</div>` : ''}
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
        })
        .filter(Boolean);

      if (!items.length) return '';
      return `
        <section class="section main-section" data-section="experience">
          ${this.renderSectionTitle(labels.experience)}
          ${items.join('')}
        </section>
      `;
    }

    renderProjectsSection(labels) {
      const items = this.safeArr(this.data?.projects)
        .map((item, idx) => {
          const id = this.safeStr(item?.id).trim() || `project-${idx}`;
          const name = this.safeStr(item?.name).trim();
          const description = this.safeStr(item?.description).trim();
          const technologies = this.safeArr(item?.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
          const url = this.safeStr(item?.url).trim();
          const dateRange = this.formatDateRange(
            this.safeStr(item?.startDate),
            this.safeStr(item?.endDate),
            !!item?.isOngoing
          );

          if (!name && !description && !technologies.length && !url && !dateRange) return '';

          return `
            <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
              <div class="entry-head">
                <div>
                  ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                  ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                </div>
                ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
              </div>
              ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
              ${technologies.length ? `
                <div class="tag-row">
                  ${technologies.map(t => `<span class="tag">${this.escapeHtml(t)}</span>`).join('')}
                </div>
              ` : ''}
            </article>
          `;
        })
        .filter(Boolean);

      if (!items.length) return '';
      return `
        <section class="section main-section" data-section="projects">
          ${this.renderSectionTitle(labels.projects)}
          ${items.join('')}
        </section>
      `;
    }

    renderAchievementsSection(labels) {
      const items = this.safeArr(this.data?.achievements)
        .map((item, idx) => {
          const id = this.safeStr(item?.id).trim() || `achievement-${idx}`;
          const title = this.safeStr(item?.title).trim();
          const description = this.safeStr(item?.description).trim();
          const year = this.safeStr(item?.year).trim();

          if (!title && !description && !year) return '';

          return `
            <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
              <div class="entry-head">
                <div>
                  ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                </div>
                ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
              </div>
              ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
            </article>
          `;
        })
        .filter(Boolean);

      if (!items.length) return '';
      return `
        <section class="section main-section" data-section="achievements">
          ${this.renderSectionTitle(labels.achievements)}
          ${items.join('')}
        </section>
      `;
    }

    renderEducationSection(labels) {
      const items = this.safeArr(this.data?.education)
        .map((item, idx) => {
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
          const subtitleParts = [degree, field].filter(Boolean);

          if (!institution && !subtitleParts.length && !dateRange && !gpa) return '';

          return `
            <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
              <div class="entry-head">
                <div>
                  ${institution ? `<div class="entry-title">${this.escapeHtml(institution)}</div>` : ''}
                  ${subtitleParts.length ? `<div class="entry-subtitle">${this.escapeHtml(subtitleParts.join(' • '))}</div>` : ''}
                </div>
                ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
              </div>
              ${gpa ? `<div class="entry-text">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
            </article>
          `;
        })
        .filter(Boolean);

      if (!items.length) return '';
      return `
        <section class="section main-section" data-section="education">
          ${this.renderSectionTitle(labels.education)}
          ${items.join('')}
        </section>
      `;
    }

    renderCertificationsSection(labels) {
      const items = this.safeArr(this.data?.certifications)
        .map((item, idx) => {
          const id = this.safeStr(item?.id).trim() || `certification-${idx}`;
          const name = this.safeStr(item?.name).trim();
          const issuer = this.safeStr(item?.issuer).trim();
          const date = this.safeStr(item?.date).trim();

          if (!name && !issuer && !date) return '';

          return `
            <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
              <div class="entry-head">
                <div>
                  ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                  ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
                </div>
                ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
              </div>
            </article>
          `;
        })
        .filter(Boolean);

      if (!items.length) return '';
      return `
        <section class="section main-section" data-section="certifications">
          ${this.renderSectionTitle(labels.certifications)}
          ${items.join('')}
        </section>
      `;
    }

    render() {
      if (!this.shadowRoot) return;

      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const labels = this.i18n[lang];

      const header = this.renderHeaderSection();
      const contact = this.renderContactSection(labels);
      const languages = this.renderLanguagesSection(labels);
      const skills = this.renderSkillsSection(labels);

      const profile = this.renderProfileSection(labels);
      const experience = this.renderExperienceSection(labels);
      const projects = this.renderProjectsSection(labels);
      const achievements = this.renderAchievementsSection(labels);
      const education = this.renderEducationSection(labels);
      const certifications = this.renderCertificationsSection(labels);

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #1b1b1b;
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
            background:
              linear-gradient(90deg, #151515 0, #151515 34%, #f5f1e8 34%, #f5f1e8 100%);
            color: #1b1b1b;
            display: grid;
            grid-template-columns: 34% 66%;
            font-family: Arial, Helvetica, sans-serif;
          }

          .sidebar {
            padding: 26mm 8mm 18mm 12mm;
            color: #f4f0e7;
            min-width: 0;
          }

          .main {
            padding: 18mm 14mm 18mm 14mm;
            min-width: 0;
          }

          .hero {
            grid-column: 1 / -1;
            display: grid;
            grid-template-columns: 34% 66%;
            min-height: 54mm;
            background:
              linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.02)),
              linear-gradient(90deg, #202020 0, #202020 34%, #f5f1e8 34%, #f5f1e8 100%);
            position: relative;
          }

          .hero-accent {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 34%;
            background:
              radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 36%),
              linear-gradient(135deg, #262626, #111111);
          }

          .hero-inner {
            grid-column: 2;
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 16mm 14mm 10mm 14mm;
          }

          .name {
            margin: 0;
            font-size: 21pt;
            line-height: 0.96;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #111111;
          }

          .profession {
            margin-top: 4mm;
            display: inline-block;
            font-size: 9pt;
            letter-spacing: 1.4px;
            text-transform: uppercase;
            font-weight: 700;
            color: #c88812;
            border-top: 2px solid #c88812;
            padding-top: 2mm;
            width: fit-content;
          }

          .section {
            margin: 0 0 7mm 0;
          }

          .section-heading {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 0 0 3.5mm 0;
          }

          .section-heading span {
            font-size: 12pt;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            line-height: 1;
          }

          .sidebar .section-heading span {
            color: #d8951d;
          }

          .main .section-heading span {
            color: #c88812;
          }

          .section-heading::after {
            content: "";
            flex: 1;
            height: 1px;
            background: currentColor;
            opacity: 0.35;
          }

          .sidebar-section {
            color: #f4f0e7;
          }

          .main-section {
            color: #1f1f1f;
          }

          .contact-list {
            display: grid;
            gap: 2.2mm;
          }

          .contact-item {
            display: grid;
            grid-template-columns: 14px 1fr;
            gap: 8px;
            align-items: start;
            font-size: 8.5pt;
            line-height: 1.45;
            color: #efe8da;
          }

          .contact-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 14px;
            min-height: 14px;
            font-size: 8pt;
            color: #d8951d;
            font-weight: 700;
          }

          .contact-text {
            word-break: break-word;
          }

          .lang-list {
            display: grid;
            gap: 3mm;
          }

          .lang-item {
            display: flex;
            justify-content: space-between;
            gap: 8px;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            padding-bottom: 2mm;
          }

          .lang-name {
            font-size: 8.8pt;
            font-weight: 700;
            color: #ffffff;
          }

          .lang-level {
            font-size: 8.2pt;
            color: #d8cfbf;
            text-align: right;
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
            border: 1px solid rgba(216,149,29,0.35);
            background: rgba(216,149,29,0.12);
            color: #f6efe1;
            font-size: 7.8pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            border-radius: 999px;
          }

          .profile-text,
          .entry-text {
            font-size: 9pt;
            line-height: 1.6;
            color: #333333;
          }

          .entry {
            position: relative;
            margin-bottom: 5.5mm;
            padding-bottom: 1mm;
          }

          .entry:last-child {
            margin-bottom: 0;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 1.8mm;
          }

          .entry-title {
            font-size: 10pt;
            line-height: 1.35;
            font-weight: 800;
            color: #151515;
          }

          .entry-subtitle {
            margin-top: 0.6mm;
            font-size: 8.6pt;
            line-height: 1.4;
            color: #5e5a54;
            font-weight: 600;
          }

          .entry-date {
            font-size: 8pt;
            line-height: 1.35;
            color: #8a6a2f;
            font-weight: 700;
            text-align: right;
            white-space: nowrap;
            padding-top: 0.4mm;
          }

          .bullet-list {
            margin: 0;
            padding-left: 4.5mm;
            color: #333333;
          }

          .bullet-list li {
            margin: 0 0 1.2mm 0;
            font-size: 8.8pt;
            line-height: 1.5;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .compact .entry-text {
            margin-top: 1mm;
          }

          .entry-link {
            margin-top: 0.6mm;
            font-size: 8pt;
            color: #8a6a2f;
            word-break: break-word;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2mm;
          }

          .tag {
            display: inline-block;
            background: #ebe3d3;
            border: 1px solid #dcc9a3;
            color: #5a4928;
            font-size: 7.6pt;
            line-height: 1;
            padding: 4px 7px;
            border-radius: 999px;
            white-space: nowrap;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${header}
          <div class="sidebar">
            ${contact}
            ${languages}
            ${skills}
          </div>
          <div class="main">
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

  if (!customElements.get('gqr-resume-aura-v2')) {
    customElements.define('gqr-resume-aura-v2', GQRResumeAuraV2);
  }
})();