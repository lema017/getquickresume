(function() {
  'use strict';

  class GQRResumeMossV1 extends HTMLElement {
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
      const raw = this.safeStr(value).trim();
      if (!raw) return '';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      if (/^\d{4}-\d{2}$/.test(raw)) {
        const [y, m] = raw.split('-');
        const monthIndex = parseInt(m, 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) return months[monthIndex] + ' ' + y;
      }

      if (/^\d{4}$/.test(raw)) return raw;

      const d = new Date(raw);
      if (!isNaN(d.getTime())) {
        return months[d.getMonth()] + ' ' + d.getFullYear();
      }

      return raw;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const start = this.formatShortDate(this.safeStr(startDate), lang);
      const end = isCurrentLike ? t.present : this.formatShortDate(this.safeStr(endDate), lang);

      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `<div class="section-title">${this.escapeHtml(title)}</div>`;
    }

    renderContactSection(t) {
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
            <span class="contact-icon">⌖</span>
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
        <section class="sidebar-section" data-section="contact">
          ${this.renderSectionTitle(t.contact)}
          <div class="contact-list">${items.join('')}</div>
        </section>
      `;
    }

    renderLanguagesSection(t, lang) {
      const items = this.safeArr(this.data?.languages);
      if (!items.length) return '';

      const html = items.map((item, index) => {
        const id = this.safeStr(item?.id).trim() || `lang-${index}`;
        const name = this.safeStr(item?.name).trim();
        const levelKey = this.safeStr(item?.level).trim().toLowerCase();
        const level = this.levelMap[lang]?.[levelKey] || this.safeStr(item?.level);
        if (!name && !level) return '';
        return `
          <div class="lang-item" data-entry-id="${this.escapeHtml(id)}">
            <div class="lang-name">${this.escapeHtml(name)}</div>
            <div class="lang-level">${this.escapeHtml(level)}</div>
          </div>
        `;
      }).join('');

      if (!html.trim()) return '';
      return `
        <section class="sidebar-section" data-section="languages">
          ${this.renderSectionTitle(t.languages)}
          <div class="lang-list">${html}</div>
        </section>
      `;
    }

    renderSkillsSection(t) {
      const skills = this.safeArr(this.data?.skillsRaw).map(s => this.safeStr(s).trim()).filter(Boolean);
      const tools = this.safeArr(this.data?.toolsRaw).map(s => this.safeStr(s).trim()).filter(Boolean);
      const merged = [...skills, ...tools];
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
        <section class="sidebar-section" data-section="skills">
          ${this.renderSectionTitle(t.skills)}
          <div class="skills-wrap">
            ${deduped.map((skill, i) => `
              <span class="skill-badge" data-entry-id="skill-${i}">${this.escapeHtml(skill)}</span>
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
        <section class="main-header" data-section="header">
          <div class="name-block">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
        </section>
      `;
    }

    renderProfileSection(t) {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';
      return `
        <section class="main-section" data-section="profile">
          ${this.renderSectionTitle(t.profile)}
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection(t) {
      const items = this.safeArr(this.data?.experience);
      if (!items.length) return '';

      const html = items.map((item, index) => {
        const id = this.safeStr(item?.id).trim() || `exp-${index}`;
        const title = this.safeStr(item?.title).trim();
        const company = this.safeStr(item?.company).trim();
        const location = this.safeStr(item?.location).trim();
        const dateRange = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isCurrent);
        const bullets = [
          ...this.safeArr(item?.achievements),
          ...this.safeArr(item?.responsibilities)
        ].map(v => this.safeStr(v).trim()).filter(Boolean);

        if (!title && !company && !location && !dateRange && !bullets.length) return '';

        return `
          <article class="entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title-group">
                ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                ${(company || location) ? `<div class="entry-subtitle">${this.escapeHtml([company, location].filter(Boolean).join(' · '))}</div>` : ''}
              </div>
              ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
            </div>
            ${bullets.length ? `<ul class="bullet-list">${bullets.map(b => `<li>${this.escapeHtml(b)}</li>`).join('')}</ul>` : ''}
          </article>
        `;
      }).join('');

      if (!html.trim()) return '';
      return `
        <section class="main-section" data-section="experience">
          ${this.renderSectionTitle(t.experience)}
          ${html}
        </section>
      `;
    }

    renderProjectsSection(t) {
      const items = this.safeArr(this.data?.projects);
      if (!items.length) return '';

      const html = items.map((item, index) => {
        const id = this.safeStr(item?.id).trim() || `project-${index}`;
        const name = this.safeStr(item?.name).trim();
        const description = this.safeStr(item?.description).trim();
        const technologies = this.safeArr(item?.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
        const url = this.safeStr(item?.url).trim();
        const dateRange = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isOngoing);

        if (!name && !description && !technologies.length && !url && !dateRange) return '';

        return `
          <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title-group">
                ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                ${url ? `<div class="entry-subtitle">${this.escapeHtml(url)}</div>` : ''}
              </div>
              ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
            </div>
            ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
            ${technologies.length ? `<div class="tag-row">${technologies.map(tech => `<span class="mini-tag">${this.escapeHtml(tech)}</span>`).join('')}</div>` : ''}
          </article>
        `;
      }).join('');

      if (!html.trim()) return '';
      return `
        <section class="main-section" data-section="projects">
          ${this.renderSectionTitle(t.projects)}
          ${html}
        </section>
      `;
    }

    renderAchievementsSection(t) {
      const items = this.safeArr(this.data?.achievements);
      if (!items.length) return '';

      const html = items.map((item, index) => {
        const id = this.safeStr(item?.id).trim() || `achievement-${index}`;
        const title = this.safeStr(item?.title).trim();
        const description = this.safeStr(item?.description).trim();
        const year = this.safeStr(item?.year).trim();

        if (!title && !description && !year) return '';

        return `
          <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title-group">
                ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
              </div>
              ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
            </div>
            ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
          </article>
        `;
      }).join('');

      if (!html.trim()) return '';
      return `
        <section class="main-section" data-section="achievements">
          ${this.renderSectionTitle(t.achievements)}
          ${html}
        </section>
      `;
    }

    renderEducationSection(t) {
      const items = this.safeArr(this.data?.education);
      if (!items.length) return '';

      const html = items.map((item, index) => {
        const id = this.safeStr(item?.id).trim() || `edu-${index}`;
        const institution = this.safeStr(item?.institution).trim();
        const degree = this.safeStr(item?.degree).trim();
        const field = this.safeStr(item?.field).trim();
        const gpa = this.safeStr(item?.gpa).trim();
        const subtitle = [degree, field].filter(Boolean).join(' · ');
        const dateRange = this.formatDateRange(item?.startDate, item?.endDate, item?.isCompleted === false);

        if (!institution && !subtitle && !gpa && !dateRange) return '';

        return `
          <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title-group">
                ${institution ? `<div class="entry-title">${this.escapeHtml(institution)}</div>` : ''}
                ${subtitle ? `<div class="entry-subtitle">${this.escapeHtml(subtitle)}</div>` : ''}
              </div>
              ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
            </div>
            ${gpa ? `<div class="entry-text">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
          </article>
        `;
      }).join('');

      if (!html.trim()) return '';
      return `
        <section class="main-section" data-section="education">
          ${this.renderSectionTitle(t.education)}
          ${html}
        </section>
      `;
    }

    renderCertificationsSection(t) {
      const items = this.safeArr(this.data?.certifications);
      if (!items.length) return '';

      const html = items.map((item, index) => {
        const id = this.safeStr(item?.id).trim() || `cert-${index}`;
        const name = this.safeStr(item?.name).trim();
        const issuer = this.safeStr(item?.issuer).trim();
        const date = this.safeStr(item?.date).trim();

        if (!name && !issuer && !date) return '';

        return `
          <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title-group">
                ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
              </div>
              ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
            </div>
          </article>
        `;
      }).join('');

      if (!html.trim()) return '';
      return `
        <section class="main-section" data-section="certifications">
          ${this.renderSectionTitle(t.certifications)}
          ${html}
        </section>
      `;
    }

    render() {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];

      const styles = `
        <style>
          :host {
            display: block;
            color: #2f2927;
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
            background: #f5f0e8;
            display: grid;
            grid-template-columns: 34% 66%;
            font-family: Georgia, "Times New Roman", serif;
            border: 1px solid #b9aca0;
          }

          .sidebar {
            background: #4b433f;
            color: #f6efe7;
            padding: 18mm 8mm 16mm 10mm;
            display: flex;
            flex-direction: column;
            gap: 10mm;
            min-width: 0;
          }

          .main {
            background: #f7f3ec;
            color: #332d2a;
            padding: 12mm 12mm 14mm 12mm;
            min-width: 0;
          }

          .main-header {
            margin: 0 0 8mm 0;
            padding: 0 0 7mm 0;
            border-bottom: 1px solid #b8aaa0;
          }

          .name {
            margin: 0;
            font-size: 32px;
            line-height: 1.05;
            letter-spacing: 0.5px;
            font-weight: 500;
            color: #3b3431;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 4px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #7a6d64;
          }

          .section-title {
            font-size: 14px;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            margin: 0 0 4mm 0;
            padding-bottom: 2mm;
            border-bottom: 1px solid currentColor;
          }

          .sidebar .section-title {
            color: #fff8f0;
            border-bottom-color: rgba(255, 248, 240, 0.35);
          }

          .main .section-title {
            color: #5b4d46;
            border-bottom-color: #cbbeb4;
          }

          .sidebar-section,
          .main-section {
            margin: 0 0 6mm 0;
          }

          .contact-list {
            display: grid;
            gap: 3mm;
          }

          .contact-item {
            display: grid;
            grid-template-columns: 18px 1fr;
            gap: 8px;
            align-items: start;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11.5px;
            line-height: 1.45;
          }

          .contact-icon {
            display: inline-flex;
            width: 18px;
            height: 18px;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255,255,255,0.45);
            border-radius: 50%;
            font-size: 10px;
            line-height: 1;
          }

          .contact-text {
            word-break: break-word;
          }

          .lang-list {
            display: grid;
            gap: 4mm;
          }

          .lang-item {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11.5px;
            line-height: 1.4;
            padding-bottom: 2mm;
            border-bottom: 1px solid rgba(255,255,255,0.12);
          }

          .lang-name {
            font-weight: 600;
          }

          .lang-level {
            color: #ddd1c7;
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
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10.5px;
            line-height: 1.2;
            padding: 6px 8px;
            border-radius: 999px;
            background: rgba(255, 248, 240, 0.12);
            color: #fff8f0;
            border: 1px solid rgba(255, 248, 240, 0.2);
          }

          .profile-text,
          .entry-text,
          .bullet-list {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11.5px;
            line-height: 1.55;
            color: #433b37;
          }

          .entry {
            margin: 0 0 5mm 0;
            padding-bottom: 4mm;
            border-bottom: 1px solid #ded3c9;
          }

          .entry:last-child {
            margin-bottom: 0;
            border-bottom: none;
            padding-bottom: 0;
          }

          .entry.compact {
            margin-bottom: 4mm;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 2mm;
          }

          .entry-title-group {
            min-width: 0;
            flex: 1 1 auto;
          }

          .entry-title {
            font-size: 14px;
            line-height: 1.25;
            color: #3e3734;
            font-weight: 600;
          }

          .entry-subtitle {
            margin-top: 1px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            line-height: 1.4;
            color: #6d6058;
          }

          .entry-date {
            flex: 0 0 auto;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10.5px;
            line-height: 1.3;
            color: #7a6d64;
            text-align: right;
            white-space: nowrap;
          }

          .bullet-list {
            margin: 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 0 0 1.5mm 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2mm;
          }

          .mini-tag {
            display: inline-block;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10px;
            line-height: 1.2;
            padding: 4px 7px;
            border-radius: 999px;
            background: #e8ddd3;
            color: #5c4f47;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>
      `;

      const sidebarHtml = [
        this.renderContactSection(t),
        this.renderLanguagesSection(t, lang),
        this.renderSkillsSection(t)
      ].join('');

      const mainHtml = [
        this.renderHeaderSection(),
        this.renderProfileSection(t),
        this.renderExperienceSection(t),
        this.renderProjectsSection(t),
        this.renderAchievementsSection(t),
        this.renderEducationSection(t),
        this.renderCertificationsSection(t)
      ].join('');

      this.shadowRoot.innerHTML = `
        ${styles}
        <div class="page">
          <div class="sidebar">
            ${sidebarHtml}
          </div>
          <div class="main">
            ${mainHtml}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-moss-v1')) {
    customElements.define('gqr-resume-moss-v1', GQRResumeMossV1);
  }
})();