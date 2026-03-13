(function() {
  'use strict';

  /**
   * name: gqr-resume-deck-v2
   * description: "Two-column resume with a dark charcoal sidebar, warm light main panel, bold geometric headings, and clean editorial separators inspired by a modern minimalist CV."
   */

  class GQRResumeDeckV2 extends HTMLElement {
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
          experience: 'Experiencia Laboral',
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

    formatSingleDate(dateStr, lang) {
      const raw = this.safeStr(dateStr).trim();
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

      const y = raw.match(/^(\d{4})$/);
      if (y) return y[1];

      const d = new Date(raw);
      if (!isNaN(d.getTime())) {
        return months[d.getMonth()] + ' ' + d.getFullYear();
      }

      return raw;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const start = this.formatSingleDate(startDate, lang);
      const end = isCurrentLike ? t.present : this.formatSingleDate(endDate, lang);
      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `<div class="section-title">${this.escapeHtml(title)}</div>`;
    }

    renderContact(lang) {
      const t = this.i18n[lang];
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

      const items = [];

      if (phone) {
        items.push(`
          <div class="contact-item">
            <span class="contact-icon">☎</span>
            <span class="contact-text">${this.escapeHtml(phone)}</span>
          </div>
        `);
      }
      if (email) {
        items.push(`
          <div class="contact-item">
            <span class="contact-icon">✉</span>
            <span class="contact-text">${this.escapeHtml(email)}</span>
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
            <span class="contact-icon">↗</span>
            <span class="contact-text">${this.escapeHtml(linkedin)}</span>
          </div>
        `);
      }

      if (!items.length) return '';

      return `
        <section class="section sidebar-section" data-section="contact">
          ${this.renderSectionTitle(t.contact)}
          <div class="contact-list">${items.join('')}</div>
        </section>
      `;
    }

    renderLanguages(lang) {
      const t = this.i18n[lang];
      const levelMap = this.levelMap[lang] || this.levelMap.en;
      const list = this.safeArr(this.data?.languages);

      if (!list.length) return '';

      const items = list.map((item) => {
        const name = this.safeStr(item?.name).trim();
        const levelKey = this.safeStr(item?.level).trim().toLowerCase();
        const level = levelMap[levelKey] || this.safeStr(item?.level);
        const id = this.safeStr(item?.id).trim();
        if (!name && !level) return '';
        return `
          <div class="lang-item" data-entry-id="${this.escapeHtml(id)}">
            <div class="lang-name">${this.escapeHtml(name)}</div>
            <div class="lang-level">${this.escapeHtml(level)}</div>
          </div>
        `;
      }).filter(Boolean).join('');

      if (!items) return '';

      return `
        <section class="section sidebar-section" data-section="languages">
          ${this.renderSectionTitle(t.languages)}
          <div class="lang-list">${items}</div>
        </section>
      `;
    }

    renderSkills(lang) {
      const t = this.i18n[lang];
      const skills = this.safeArr(this.data?.skillsRaw).map((s) => this.safeStr(s).trim()).filter(Boolean);
      const tools = this.safeArr(this.data?.toolsRaw).map((s) => this.safeStr(s).trim()).filter(Boolean);
      const merged = [];
      const seen = new Set();

      skills.concat(tools).forEach((item) => {
        const key = item.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          merged.push(item);
        }
      });

      if (!merged.length) return '';

      const items = merged.map((skill, index) => `
        <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
      `).join('');

      return `
        <section class="section sidebar-section" data-section="skills">
          ${this.renderSectionTitle(t.skills)}
          <div class="skills-wrap">${items}</div>
        </section>
      `;
    }

    renderHeader() {
      const firstName = this.safeStr(this.data?.firstName).trim();
      const lastName = this.safeStr(this.data?.lastName).trim();
      const profession = this.safeStr(this.data?.profession).trim();
      const fullName = (firstName + ' ' + lastName).trim();

      if (!fullName && !profession) return '';

      return `
        <section class="hero" data-section="header">
          <div class="hero-name">${this.escapeHtml(fullName)}</div>
          ${profession ? `<div class="hero-role">${this.escapeHtml(profession)}</div>` : ''}
        </section>
      `;
    }

    renderProfile(lang) {
      const t = this.i18n[lang];
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';

      return `
        <section class="section main-section" data-section="profile">
          ${this.renderSectionTitle(t.profile)}
          <div class="summary">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperience(lang) {
      const t = this.i18n[lang];
      const list = this.safeArr(this.data?.experience);
      if (!list.length) return '';

      const items = list.map((item) => {
        const id = this.safeStr(item?.id).trim();
        const title = this.safeStr(item?.title).trim();
        const company = this.safeStr(item?.company).trim();
        const location = this.safeStr(item?.location).trim();
        const range = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isCurrent);

        const bullets = this.safeArr(item?.achievements)
          .concat(this.safeArr(item?.responsibilities))
          .map((b) => this.safeStr(b).trim())
          .filter(Boolean);

        const metaParts = [company, location].filter(Boolean);

        return `
          <article class="entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-primary">
                ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                ${metaParts.length ? `<div class="entry-subtitle">${this.escapeHtml(metaParts.join(' · '))}</div>` : ''}
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
      }).filter(Boolean).join('');

      if (!items) return '';

      return `
        <section class="section main-section" data-section="experience">
          ${this.renderSectionTitle(t.experience)}
          <div class="entries">${items}</div>
        </section>
      `;
    }

    renderProjects(lang) {
      const t = this.i18n[lang];
      const list = this.safeArr(this.data?.projects);
      if (!list.length) return '';

      const items = list.map((item) => {
        const id = this.safeStr(item?.id).trim();
        const name = this.safeStr(item?.name).trim();
        const description = this.safeStr(item?.description).trim();
        const url = this.safeStr(item?.url).trim();
        const techs = this.safeArr(item?.technologies).map((x) => this.safeStr(x).trim()).filter(Boolean);
        const range = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isOngoing);

        if (!name && !description && !techs.length && !url) return '';

        return `
          <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-primary">
                ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                ${url ? `<div class="entry-subtitle">${this.escapeHtml(url)}</div>` : ''}
              </div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
            ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
            ${techs.length ? `<div class="tag-line">${techs.map((x) => `<span class="mini-tag">${this.escapeHtml(x)}</span>`).join('')}</div>` : ''}
          </article>
        `;
      }).filter(Boolean).join('');

      if (!items) return '';

      return `
        <section class="section main-section" data-section="projects">
          ${this.renderSectionTitle(t.projects)}
          <div class="entries">${items}</div>
        </section>
      `;
    }

    renderAchievements(lang) {
      const t = this.i18n[lang];
      const list = this.safeArr(this.data?.achievements);
      if (!list.length) return '';

      const items = list.map((item) => {
        const id = this.safeStr(item?.id).trim();
        const title = this.safeStr(item?.title).trim();
        const description = this.safeStr(item?.description).trim();
        const year = this.safeStr(item?.year).trim();

        if (!title && !description && !year) return '';

        return `
          <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-primary">
                ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
              </div>
              ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
            </div>
            ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
          </article>
        `;
      }).filter(Boolean).join('');

      if (!items) return '';

      return `
        <section class="section main-section" data-section="achievements">
          ${this.renderSectionTitle(t.achievements)}
          <div class="entries">${items}</div>
        </section>
      `;
    }

    renderEducation(lang) {
      const t = this.i18n[lang];
      const list = this.safeArr(this.data?.education);
      if (!list.length) return '';

      const items = list.map((item) => {
        const id = this.safeStr(item?.id).trim();
        const institution = this.safeStr(item?.institution).trim();
        const degree = this.safeStr(item?.degree).trim();
        const field = this.safeStr(item?.field).trim();
        const gpa = this.safeStr(item?.gpa).trim();
        const degreeLine = [degree, field].filter(Boolean).join(', ');
        const range = this.formatDateRange(item?.startDate, item?.endDate, item?.isCompleted === false);

        if (!institution && !degreeLine && !gpa && !range) return '';

        return `
          <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-primary">
                ${institution ? `<div class="entry-title">${this.escapeHtml(institution)}</div>` : ''}
                ${degreeLine ? `<div class="entry-subtitle">${this.escapeHtml(degreeLine)}</div>` : ''}
                ${gpa ? `<div class="entry-text">${this.escapeHtml('GPA: ' + gpa)}</div>` : ''}
              </div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
          </article>
        `;
      }).filter(Boolean).join('');

      if (!items) return '';

      return `
        <section class="section main-section" data-section="education">
          ${this.renderSectionTitle(t.education)}
          <div class="entries">${items}</div>
        </section>
      `;
    }

    renderCertifications(lang) {
      const t = this.i18n[lang];
      const list = this.safeArr(this.data?.certifications);
      if (!list.length) return '';

      const items = list.map((item) => {
        const id = this.safeStr(item?.id).trim();
        const name = this.safeStr(item?.name).trim();
        const issuer = this.safeStr(item?.issuer).trim();
        const date = this.formatSingleDate(item?.date, lang);

        if (!name && !issuer && !date) return '';

        return `
          <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-primary">
                ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
              </div>
              ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
            </div>
          </article>
        `;
      }).filter(Boolean).join('');

      if (!items) return '';

      return `
        <section class="section main-section" data-section="certifications">
          ${this.renderSectionTitle(t.certifications)}
          <div class="entries">${items}</div>
        </section>
      `;
    }

    render() {
      if (!this.shadowRoot) return;

      const lang = this.getLanguage() === 'es' ? 'es' : 'en';

      const header = this.renderHeader();
      const contact = this.renderContact(lang);
      const languages = this.renderLanguages(lang);
      const skills = this.renderSkills(lang);

      const profile = this.renderProfile(lang);
      const experience = this.renderExperience(lang);
      const projects = this.renderProjects(lang);
      const achievements = this.renderAchievements(lang);
      const education = this.renderEducation(lang);
      const certifications = this.renderCertifications(lang);

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #1f2328;
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
            background: #f4f0e8;
            display: grid;
            grid-template-columns: 33% 67%;
            grid-template-rows: auto 1fr;
            font-family: Arial, Helvetica, sans-serif;
          }

          .hero {
            grid-column: 1 / -1;
            background: #ebe6dc;
            padding: 20mm 16mm 12mm 16mm;
            border-bottom: 1px solid #c5bcad;
          }

          .hero-name {
            font-size: 21pt;
            line-height: 1.02;
            font-weight: 800;
            letter-spacing: 0.3px;
            text-transform: uppercase;
            color: #232427;
            max-width: 80%;
          }

          .hero-role {
            margin-top: 6px;
            font-size: 9.2pt;
            font-weight: 700;
            letter-spacing: 1.6px;
            text-transform: uppercase;
            color: #5a5146;
          }

          .sidebar {
            background: #2e3136;
            color: #f2efe9;
            padding: 12mm 10mm 14mm 12mm;
            min-width: 0;
          }

          .main {
            background: #f8f5ef;
            color: #24272c;
            padding: 12mm 14mm 14mm 14mm;
            min-width: 0;
          }

          .section {
            margin: 0 0 10mm 0;
          }

          .sidebar-section:last-child,
          .main-section:last-child {
            margin-bottom: 0;
          }

          .section-title {
            position: relative;
            font-size: 10pt;
            line-height: 1.2;
            font-weight: 800;
            letter-spacing: 0.9px;
            text-transform: uppercase;
            margin: 0 0 5mm 0;
            padding-bottom: 2.5mm;
          }

          .sidebar .section-title {
            color: #ffffff;
            border-bottom: 1px solid rgba(255,255,255,0.22);
          }

          .main .section-title {
            color: #24272c;
            border-bottom: 2px solid #7a6d59;
          }

          .contact-list,
          .lang-list {
            display: grid;
            gap: 3.2mm;
          }

          .contact-item {
            display: grid;
            grid-template-columns: 14px 1fr;
            gap: 8px;
            align-items: start;
            font-size: 8.7pt;
            line-height: 1.45;
            color: #f2efe9;
          }

          .contact-icon {
            display: inline-block;
            text-align: center;
            opacity: 0.92;
            font-size: 8.5pt;
            transform: translateY(1px);
          }

          .contact-text {
            word-break: break-word;
          }

          .lang-item {
            padding: 0 0 3mm 0;
            border-bottom: 1px solid rgba(255,255,255,0.12);
          }

          .lang-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .lang-name {
            font-size: 9pt;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 1mm;
          }

          .lang-level {
            font-size: 8.2pt;
            color: #d9d2c7;
            letter-spacing: 0.2px;
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
            border: 1px solid rgba(255,255,255,0.18);
            background: rgba(255,255,255,0.08);
            color: #f4f1eb;
            border-radius: 999px;
            font-size: 7.9pt;
            line-height: 1.2;
          }

          .summary {
            font-size: 9.2pt;
            line-height: 1.62;
            color: #33373d;
          }

          .entries {
            display: grid;
            gap: 6mm;
          }

          .entry {
            position: relative;
          }

          .entry.compact {
            margin-bottom: 0;
          }

          .entry-head {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 4mm;
            align-items: start;
            margin-bottom: 1.8mm;
          }

          .entry-primary {
            min-width: 0;
          }

          .entry-title {
            font-size: 9.5pt;
            line-height: 1.35;
            font-weight: 800;
            color: #202328;
          }

          .entry-subtitle {
            font-size: 8.5pt;
            line-height: 1.45;
            font-weight: 600;
            color: #655a4d;
            margin-top: 0.8mm;
          }

          .entry-date {
            font-size: 8pt;
            line-height: 1.3;
            font-weight: 700;
            color: #6f6558;
            white-space: nowrap;
            text-align: right;
            padding-top: 0.5mm;
          }

          .entry-text {
            font-size: 8.7pt;
            line-height: 1.55;
            color: #3d4249;
            margin-top: 1.2mm;
          }

          .bullet-list {
            margin: 2mm 0 0 0;
            padding-left: 4.5mm;
          }

          .bullet-list li {
            margin: 0 0 1.3mm 0;
            font-size: 8.7pt;
            line-height: 1.5;
            color: #32363c;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .tag-line {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2mm;
          }

          .mini-tag {
            display: inline-block;
            white-space: nowrap;
            padding: 3px 7px;
            background: #e9e1d3;
            color: #584f43;
            border-radius: 999px;
            font-size: 7.6pt;
            line-height: 1.2;
            border: 1px solid #d4c8b6;
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

  if (!customElements.get('gqr-resume-deck-v2')) {
    customElements.define('gqr-resume-deck-v2', GQRResumeDeckV2);
  }
})();