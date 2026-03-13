(function() {
  'use strict';

  /**
   * name: gqr-resume-deck-v1
   * description: "Two-column resume with a dark charcoal sidebar, bright main content area, bold geometric typography, and clean divider-led sections inspired by a modern editorial CV."
   */

  class GQRResumeDeckV1 extends HTMLElement {
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

    formatShortDate(value, lang) {
      const str = this.safeStr(value).trim();
      if (!str) return '';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      if (/^\d{4}$/.test(str)) return str;

      const ym = str.match(/^(\d{4})-(\d{2})$/);
      if (ym) {
        const year = ym[1];
        const monthIndex = parseInt(ym[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) return months[monthIndex] + ' ' + year;
      }

      const full = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (full) {
        const year = full[1];
        const monthIndex = parseInt(full[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) return months[monthIndex] + ' ' + year;
      }

      return str;
    }

    formatDateRange(startDate, endDate, currentFlag, lang) {
      const t = this.i18n[lang] || this.i18n.en;
      const start = this.formatShortDate(startDate, lang);
      const end = currentFlag ? t.present : this.formatShortDate(endDate, lang);
      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `<div class="section-title">${this.escapeHtml(title)}</div>`;
    }

    renderContact(lang) {
      const t = this.i18n[lang] || this.i18n.en;
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

      if (!email && !phone && !country && !linkedin) return '';

      return `
        <section class="section side-section" data-section="contact">
          ${this.renderSectionTitle(t.contact)}
          <div class="contact-list">
            ${email ? `<div class="contact-item"><span class="contact-icon">✉</span><span>${this.escapeHtml(email)}</span></div>` : ''}
            ${phone ? `<div class="contact-item"><span class="contact-icon">☎</span><span>${this.escapeHtml(phone)}</span></div>` : ''}
            ${country ? `<div class="contact-item"><span class="contact-icon">⌖</span><span>${this.escapeHtml(country)}</span></div>` : ''}
            ${linkedin ? `<div class="contact-item"><span class="contact-icon">in</span><span>${this.escapeHtml(linkedin)}</span></div>` : ''}
          </div>
        </section>
      `;
    }

    renderLanguages(lang) {
      const t = this.i18n[lang] || this.i18n.en;
      const items = this.safeArr(this.data?.languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section side-section" data-section="languages">
          ${this.renderSectionTitle(t.languages)}
          <div class="language-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item?.id).trim() || `lang-${index}`;
              const name = this.safeStr(item?.name).trim();
              const rawLevel = this.safeStr(item?.level).trim().toLowerCase();
              const level = this.levelMap[lang]?.[rawLevel] || this.levelMap.en?.[rawLevel] || rawLevel;
              if (!name && !level) return '';
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

    renderSkills(lang) {
      const t = this.i18n[lang] || this.i18n.en;
      const merged = [...this.safeArr(this.data?.skillsRaw), ...this.safeArr(this.data?.toolsRaw)]
        .map(v => this.safeStr(v).trim())
        .filter(Boolean);

      const seen = new Set();
      const skills = merged.filter(item => {
        const key = item.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      if (!skills.length) return '';

      return `
        <section class="section side-section" data-section="skills">
          ${this.renderSectionTitle(t.skills)}
          <div class="skills-wrap">
            ${skills.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderHeader() {
      const firstName = this.safeStr(this.data?.firstName).trim();
      const lastName = this.safeStr(this.data?.lastName).trim();
      const profession = this.safeStr(this.data?.profession).trim();
      const fullName = [firstName, lastName].filter(Boolean).join(' ');

      if (!fullName && !profession) return '';

      return `
        <section class="section header-section" data-section="header">
          ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
          ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
        </section>
      `;
    }

    renderProfile(lang) {
      const t = this.i18n[lang] || this.i18n.en;
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';

      return `
        <section class="section main-section" data-section="profile">
          ${this.renderSectionTitle(t.profile)}
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperience(lang) {
      const t = this.i18n[lang] || this.i18n.en;
      const items = this.safeArr(this.data?.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="experience">
          ${this.renderSectionTitle(t.experience)}
          <div class="entry-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item?.id).trim() || `exp-${index}`;
              const title = this.safeStr(item?.title).trim();
              const company = this.safeStr(item?.company).trim();
              const location = this.safeStr(item?.location).trim();
              const dateRange = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isCurrent, lang);
              const bullets = [...this.safeArr(item?.achievements), ...this.safeArr(item?.responsibilities)]
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);

              if (!title && !company && !location && !dateRange && !bullets.length) return '';

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-head">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                      ${(company || location) ? `<div class="entry-subtitle">${this.escapeHtml([company, location].filter(Boolean).join(' · '))}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${bullets.length ? `
                    <ul class="bullets">
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

    renderProjects(lang) {
      const t = this.i18n[lang] || this.i18n.en;
      const items = this.safeArr(this.data?.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          ${this.renderSectionTitle(t.projects)}
          <div class="entry-list compact-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item?.id).trim() || `proj-${index}`;
              const name = this.safeStr(item?.name).trim();
              const description = this.safeStr(item?.description).trim();
              const url = this.safeStr(item?.url).trim();
              const technologies = this.safeArr(item?.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const dateRange = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isOngoing, lang);

              if (!name && !description && !url && !technologies.length && !dateRange) return '';

              return `
                <article class="entry project-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-head">
                      ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                      ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `<div class="tag-row">${technologies.map(tech => `<span class="tag">${this.escapeHtml(tech)}</span>`).join('')}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements(lang) {
      const t = this.i18n[lang] || this.i18n.en;
      const items = this.safeArr(this.data?.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          ${this.renderSectionTitle(t.achievements)}
          <div class="entry-list compact-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item?.id).trim() || `ach-${index}`;
              const title = this.safeStr(item?.title).trim();
              const description = this.safeStr(item?.description).trim();
              const year = this.safeStr(item?.year).trim();

              if (!title && !description && !year) return '';

              return `
                <article class="entry achievement-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-head">
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
      `;
    }

    renderEducation(lang) {
      const t = this.i18n[lang] || this.i18n.en;
      const items = this.safeArr(this.data?.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="education">
          ${this.renderSectionTitle(t.education)}
          <div class="entry-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item?.id).trim() || `edu-${index}`;
              const institution = this.safeStr(item?.institution).trim();
              const degree = this.safeStr(item?.degree).trim();
              const field = this.safeStr(item?.field).trim();
              const gpa = this.safeStr(item?.gpa).trim();
              const dateRange = this.formatDateRange(item?.startDate, item?.endDate, item?.isCompleted === false, lang);

              if (!institution && !degree && !field && !gpa && !dateRange) return '';

              const degreeLine = [degree, field].filter(Boolean).join(', ');

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-head">
                      ${institution ? `<div class="entry-title">${this.escapeHtml(institution)}</div>` : ''}
                      ${degreeLine ? `<div class="entry-subtitle">${this.escapeHtml(degreeLine)}</div>` : ''}
                      ${gpa ? `<div class="entry-meta">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(lang) {
      const t = this.i18n[lang] || this.i18n.en;
      const items = this.safeArr(this.data?.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          ${this.renderSectionTitle(t.certifications)}
          <div class="entry-list compact-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item?.id).trim() || `cert-${index}`;
              const name = this.safeStr(item?.name).trim();
              const issuer = this.safeStr(item?.issuer).trim();
              const date = this.safeStr(item?.date).trim();

              if (!name && !issuer && !date) return '';

              return `
                <article class="entry certification-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-head">
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

      const lang = this.getLanguage() === 'es' ? 'es' : 'en';

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #1f1f1f;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-family: Arial, Helvetica, sans-serif;
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
            background: #f3f0ea;
            color: #202020;
          }

          .sidebar {
            background: #262626;
            color: #f4f1eb;
            padding: 18mm 9mm 14mm 12mm;
            display: flex;
            flex-direction: column;
            gap: 12mm;
          }

          .main {
            background: #f3f0ea;
            padding: 16mm 14mm 14mm 14mm;
          }

          .section {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .header-section {
            padding-bottom: 8mm;
            border-bottom: 1.2mm solid #6d6a66;
            margin-bottom: 8mm;
          }

          .name {
            margin: 0;
            font-size: 17pt;
            line-height: 1.02;
            font-weight: 800;
            letter-spacing: 0.4px;
            text-transform: uppercase;
            color: #202020;
          }

          .profession {
            margin-top: 4mm;
            font-size: 9.2pt;
            font-weight: 700;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            color: #44403b;
          }

          .main-section,
          .side-section {
            margin-bottom: 8mm;
          }

          .section-title {
            font-size: 10.5pt;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            margin: 0 0 4mm 0;
            position: relative;
          }

          .main .section-title {
            color: #202020;
            padding-bottom: 2mm;
            border-bottom: 0.7mm solid #7d7974;
          }

          .sidebar .section-title {
            color: #ffffff;
            padding-bottom: 2mm;
            border-bottom: 0.6mm solid rgba(255,255,255,0.35);
          }

          .profile-text,
          .entry-text,
          .entry-subtitle,
          .entry-meta,
          .entry-link,
          .contact-item,
          .language-level {
            font-size: 8.4pt;
            line-height: 1.5;
          }

          .entry-list {
            display: flex;
            flex-direction: column;
            gap: 5mm;
          }

          .compact-list {
            gap: 4mm;
          }

          .entry {
            position: relative;
          }

          .timeline-entry {
            padding-left: 4mm;
            border-left: 1mm solid #b0aaa3;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            gap: 4mm;
            align-items: flex-start;
          }

          .entry-head {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            font-size: 9pt;
            font-weight: 800;
            line-height: 1.35;
            color: #1f1f1f;
          }

          .entry-subtitle {
            color: #4d4a46;
            margin-top: 1mm;
          }

          .entry-meta {
            color: #5e5b56;
            margin-top: 1mm;
          }

          .entry-date {
            flex: 0 0 auto;
            white-space: nowrap;
            font-size: 7.9pt;
            font-weight: 700;
            color: #5a5753;
            text-transform: uppercase;
            letter-spacing: 0.3px;
            padding-top: 0.4mm;
          }

          .entry-text {
            margin-top: 1.8mm;
            color: #2d2b29;
          }

          .entry-link {
            color: #5d5a56;
            margin-top: 1mm;
            word-break: break-word;
          }

          .bullets {
            margin: 2mm 0 0 0;
            padding-left: 4.6mm;
          }

          .bullets li {
            margin: 0 0 1.2mm 0;
            font-size: 8.2pt;
            line-height: 1.45;
            color: #2d2b29;
          }

          .contact-list,
          .language-list {
            display: flex;
            flex-direction: column;
            gap: 3mm;
          }

          .contact-item {
            display: flex;
            gap: 2.5mm;
            align-items: flex-start;
            color: #f1eee8;
            word-break: break-word;
          }

          .contact-icon {
            width: 4.5mm;
            flex: 0 0 4.5mm;
            font-weight: 800;
            color: #d7cbb8;
            text-align: center;
            font-size: 8pt;
            line-height: 1.5;
          }

          .language-item {
            padding-bottom: 2.2mm;
            border-bottom: 0.35mm solid rgba(255,255,255,0.16);
          }

          .language-name {
            font-size: 8.6pt;
            font-weight: 700;
            color: #ffffff;
            line-height: 1.4;
          }

          .language-level {
            color: #d8d2c7;
            margin-top: 0.8mm;
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
            border: 1px solid rgba(255,255,255,0.25);
            color: #f6f2ec;
            background: rgba(255,255,255,0.06);
            border-radius: 999px;
            font-size: 7.8pt;
            line-height: 1.2;
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
            font-size: 7.4pt;
            line-height: 1.2;
            padding: 4px 7px;
            border-radius: 999px;
            background: #dfd8cf;
            color: #2d2b29;
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
            ${this.renderContact(lang)}
            ${this.renderLanguages(lang)}
            ${this.renderSkills(lang)}
          </div>
          <div class="main">
            ${this.renderHeader()}
            ${this.renderProfile(lang)}
            ${this.renderExperience(lang)}
            ${this.renderProjects(lang)}
            ${this.renderAchievements(lang)}
            ${this.renderEducation(lang)}
            ${this.renderCertifications(lang)}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-deck-v1')) {
    customElements.define('gqr-resume-deck-v1', GQRResumeDeckV1);
  }
})();