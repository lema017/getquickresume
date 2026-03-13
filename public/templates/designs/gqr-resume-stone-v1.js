(function() {
  'use strict';

  /**
   * name: gqr-resume-stone-v1
   * description: "Two-column resume with a warm stone-gray sidebar, bright main panel, bold oversized name header, and clean editorial typography inspired by a modern minimalist layout."
   */

  class GQRResumeStoneV1 extends HTMLElement {
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
          skills: 'Aptitudes',
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

    formatDate(dateStr, lang) {
      const value = this.safeStr(dateStr).trim();
      if (!value) return '';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      if (/^\d{4}$/.test(value)) return value;

      if (/^\d{4}-\d{2}$/.test(value)) {
        const [y, m] = value.split('-');
        const idx = Math.max(0, Math.min(11, Number(m) - 1));
        return months[idx] + ' ' + y;
      }

      const d = new Date(value);
      if (!Number.isNaN(d.getTime())) {
        return months[d.getMonth()] + ' ' + d.getFullYear();
      }

      return value;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const start = this.formatDate(startDate, lang);
      const end = isCurrentLike ? t.present : this.formatDate(endDate, lang);
      if (start && end) return start + ' - ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderContactSection(lang, t) {
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

      const items = [];
      if (email) items.push(`<div class="contact-item">${this.escapeHtml(email)}</div>`);
      if (phone) items.push(`<div class="contact-item">${this.escapeHtml(phone)}</div>`);
      if (country) items.push(`<div class="contact-item">${this.escapeHtml(country)}</div>`);
      if (linkedin) items.push(`<div class="contact-item">${this.escapeHtml(linkedin)}</div>`);

      if (!items.length) return '';

      return `
        <section class="section sidebar-section" data-section="contact">
          <h3 class="section-title sidebar-title">${this.escapeHtml(t.contact)}</h3>
          <div class="contact-list">
            ${items.join('')}
          </div>
        </section>
      `;
    }

    renderLanguagesSection(lang, t) {
      const items = this.safeArr(this.data?.languages);
      if (!items.length) return '';

      const levelMap = this.levelMap[lang] || this.levelMap.en;

      return `
        <section class="section sidebar-section" data-section="languages">
          <h3 class="section-title sidebar-title">${this.escapeHtml(t.languages)}</h3>
          <div class="language-list">
            ${items.map((item) => {
              const name = this.safeStr(item?.name).trim();
              const rawLevel = this.safeStr(item?.level).trim().toLowerCase();
              const level = levelMap[rawLevel] || this.safeStr(item?.level);
              if (!name && !level) return '';
              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                  <div class="language-name">${this.escapeHtml(name)}</div>
                  <div class="language-level">${this.escapeHtml(level)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderSkillsSection(lang, t) {
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

      return `
        <section class="section sidebar-section" data-section="skills">
          <h3 class="section-title sidebar-title">${this.escapeHtml(t.skills)}</h3>
          <div class="skills-wrap">
            ${merged.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderHeaderSection() {
      const firstName = this.safeStr(this.data?.firstName).trim();
      const lastName = this.safeStr(this.data?.lastName).trim();
      const profession = this.safeStr(this.data?.profession).trim();
      const fullName = [firstName, lastName].filter(Boolean).join(' ');

      if (!fullName && !profession) return '';

      const parts = fullName.split(/\s+/).filter(Boolean);
      const primaryName = parts[0] || '';
      const secondaryName = parts.slice(1).join(' ');

      return `
        <section class="hero" data-section="header">
          <div class="hero-inner">
            ${profession ? `<div class="eyebrow">${this.escapeHtml(profession)}</div>` : ''}
            ${fullName ? `
              <div class="name-block">
                <div class="name-primary">${this.escapeHtml(primaryName)}</div>
                ${secondaryName ? `<div class="name-secondary">${this.escapeHtml(secondaryName)}</div>` : ''}
              </div>
            ` : ''}
          </div>
        </section>
      `;
    }

    renderProfileSection(t) {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';

      return `
        <section class="section main-section" data-section="profile">
          <h3 class="section-title main-title">${this.escapeHtml(t.profile)}</h3>
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection(t) {
      const items = this.safeArr(this.data?.experience);
      if (!items.length) return '';

      const rendered = items.map((item) => {
        const id = this.safeStr(item?.id);
        const title = this.safeStr(item?.title).trim();
        const company = this.safeStr(item?.company).trim();
        const location = this.safeStr(item?.location).trim();
        const range = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isCurrent);
        const bullets = this.safeArr(item?.achievements)
          .concat(this.safeArr(item?.responsibilities))
          .map((b) => this.safeStr(b).trim())
          .filter(Boolean);

        if (!title && !company && !location && !range && !bullets.length) return '';

        return `
          <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-main">
                ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                ${(company || location) ? `
                  <div class="entry-subtitle">
                    ${this.escapeHtml(company)}${company && location ? ', ' : ''}${this.escapeHtml(location)}
                  </div>
                ` : ''}
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
      }).join('');

      if (!rendered.trim()) return '';

      return `
        <section class="section main-section" data-section="experience">
          <h3 class="section-title main-title">${this.escapeHtml(t.experience)}</h3>
          <div class="entries">
            ${rendered}
          </div>
        </section>
      `;
    }

    renderProjectsSection(t) {
      const items = this.safeArr(this.data?.projects);
      if (!items.length) return '';

      const rendered = items.map((item) => {
        const id = this.safeStr(item?.id);
        const name = this.safeStr(item?.name).trim();
        const description = this.safeStr(item?.description).trim();
        const technologies = this.safeArr(item?.technologies).map((x) => this.safeStr(x).trim()).filter(Boolean);
        const url = this.safeStr(item?.url).trim();
        const range = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isOngoing);

        if (!name && !description && !technologies.length && !url && !range) return '';

        return `
          <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-main">
                ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                ${url ? `<div class="entry-subtitle">${this.escapeHtml(url)}</div>` : ''}
              </div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
            ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
            ${technologies.length ? `
              <div class="tag-row">
                ${technologies.map((tech) => `<span class="tag">${this.escapeHtml(tech)}</span>`).join('')}
              </div>
            ` : ''}
          </article>
        `;
      }).join('');

      if (!rendered.trim()) return '';

      return `
        <section class="section main-section" data-section="projects">
          <h3 class="section-title main-title">${this.escapeHtml(t.projects)}</h3>
          <div class="entries">
            ${rendered}
          </div>
        </section>
      `;
    }

    renderAchievementsSection(t) {
      const items = this.safeArr(this.data?.achievements);
      if (!items.length) return '';

      const rendered = items.map((item) => {
        const id = this.safeStr(item?.id);
        const title = this.safeStr(item?.title).trim();
        const description = this.safeStr(item?.description).trim();
        const year = this.safeStr(item?.year).trim();

        if (!title && !description && !year) return '';

        return `
          <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-main">
                ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
              </div>
              ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
            </div>
            ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
          </article>
        `;
      }).join('');

      if (!rendered.trim()) return '';

      return `
        <section class="section main-section" data-section="achievements">
          <h3 class="section-title main-title">${this.escapeHtml(t.achievements)}</h3>
          <div class="entries">
            ${rendered}
          </div>
        </section>
      `;
    }

    renderEducationSection(t) {
      const items = this.safeArr(this.data?.education);
      if (!items.length) return '';

      const rendered = items.map((item) => {
        const id = this.safeStr(item?.id);
        const institution = this.safeStr(item?.institution).trim();
        const degree = this.safeStr(item?.degree).trim();
        const field = this.safeStr(item?.field).trim();
        const gpa = this.safeStr(item?.gpa).trim();
        const range = this.formatDateRange(item?.startDate, item?.endDate, item?.isCompleted === false);

        if (!institution && !degree && !field && !gpa && !range) return '';

        return `
          <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-main">
                ${(degree || field) ? `
                  <div class="entry-title">
                    ${this.escapeHtml(degree)}${degree && field ? ' · ' : ''}${this.escapeHtml(field)}
                  </div>
                ` : ''}
                ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
              </div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
            ${gpa ? `<div class="entry-text">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
          </article>
        `;
      }).join('');

      if (!rendered.trim()) return '';

      return `
        <section class="section main-section" data-section="education">
          <h3 class="section-title main-title">${this.escapeHtml(t.education)}</h3>
          <div class="entries">
            ${rendered}
          </div>
        </section>
      `;
    }

    renderCertificationsSection(t) {
      const items = this.safeArr(this.data?.certifications);
      if (!items.length) return '';

      const rendered = items.map((item) => {
        const id = this.safeStr(item?.id);
        const name = this.safeStr(item?.name).trim();
        const issuer = this.safeStr(item?.issuer).trim();
        const date = this.safeStr(item?.date).trim();

        if (!name && !issuer && !date) return '';

        return `
          <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-main">
                ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
              </div>
              ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
            </div>
          </article>
        `;
      }).join('');

      if (!rendered.trim()) return '';

      return `
        <section class="section main-section" data-section="certifications">
          <h3 class="section-title main-title">${this.escapeHtml(t.certifications)}</h3>
          <div class="entries">
            ${rendered}
          </div>
        </section>
      `;
    }

    render() {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #1f1b18;
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
            background: #f7f4ef;
            display: grid;
            grid-template-columns: 34% 66%;
            font-family: Arial, Helvetica, sans-serif;
            color: #1e1a17;
          }

          .sidebar {
            background: #d8d2cc;
            padding: 34px 22px 34px 22px;
            border-right: 1px solid rgba(0,0,0,0.08);
          }

          .main {
            background: #f7f4ef;
            padding: 22px 28px 34px 28px;
          }

          .hero {
            margin: 0 0 18px 0;
            padding: 0 0 14px 0;
            border-bottom: 1px solid rgba(0,0,0,0.12);
          }

          .hero-inner {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .eyebrow {
            font-size: 11px;
            line-height: 1.2;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #5d554f;
            font-weight: 700;
          }

          .name-block {
            line-height: 0.95;
          }

          .name-primary {
            font-size: 58px;
            font-weight: 900;
            letter-spacing: -0.04em;
            color: #090909;
          }

          .name-secondary {
            font-size: 28px;
            font-weight: 700;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #171717;
            margin-top: 4px;
          }

          .section {
            margin: 0 0 22px 0;
          }

          .section-title {
            margin: 0 0 10px 0;
            font-size: 12px;
            line-height: 1.2;
            font-weight: 800;
            letter-spacing: 0.06em;
            text-transform: uppercase;
          }

          .sidebar-title {
            color: #26211d;
            position: relative;
            padding-bottom: 8px;
          }

          .sidebar-title::after {
            content: '';
            display: block;
            width: 36px;
            height: 3px;
            background: #8b8178;
            margin-top: 7px;
            border-radius: 2px;
          }

          .main-title {
            color: #171310;
            font-size: 22px;
            letter-spacing: -0.02em;
            text-transform: none;
            margin-bottom: 12px;
          }

          .contact-list,
          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .contact-item {
            font-size: 12px;
            line-height: 1.45;
            color: #312b27;
            word-break: break-word;
          }

          .language-item {
            display: flex;
            flex-direction: column;
            gap: 2px;
            padding-bottom: 6px;
          }

          .language-name {
            font-size: 12px;
            font-weight: 700;
            color: #201b18;
          }

          .language-level {
            font-size: 11px;
            color: #615850;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            font-size: 11px;
            line-height: 1.2;
            padding: 6px 8px;
            background: #f3efea;
            color: #2d2723;
            border: 1px solid rgba(0,0,0,0.08);
            border-radius: 999px;
          }

          .profile-text {
            font-size: 12px;
            line-height: 1.6;
            color: #4b433d;
          }

          .entries {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            break-inside: avoid;
          }

          .timeline-entry {
            position: relative;
            padding-left: 16px;
          }

          .timeline-entry::before {
            content: '';
            position: absolute;
            left: 0;
            top: 6px;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #8b8178;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 14px;
            margin-bottom: 4px;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            font-size: 15px;
            line-height: 1.25;
            font-weight: 800;
            color: #161210;
          }

          .entry-subtitle {
            font-size: 12px;
            line-height: 1.35;
            color: #5a5049;
            margin-top: 2px;
          }

          .entry-date {
            font-size: 11px;
            line-height: 1.3;
            color: #625851;
            white-space: nowrap;
            font-weight: 700;
          }

          .bullet-list {
            margin: 6px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 0 0 4px 0;
            font-size: 12px;
            line-height: 1.5;
            color: #433b35;
          }

          .entry-text {
            font-size: 12px;
            line-height: 1.5;
            color: #433b35;
            margin-top: 4px;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
          }

          .tag {
            font-size: 10px;
            line-height: 1.2;
            padding: 4px 7px;
            border-radius: 999px;
            background: #e9e4de;
            color: #2f2925;
            border: 1px solid rgba(0,0,0,0.06);
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
          <div class="sidebar">
            ${this.renderContactSection(lang, t)}
            ${this.renderLanguagesSection(lang, t)}
            ${this.renderSkillsSection(lang, t)}
          </div>
          <div class="main">
            ${this.renderHeaderSection()}
            ${this.renderProfileSection(t)}
            ${this.renderExperienceSection(t)}
            ${this.renderProjectsSection(t)}
            ${this.renderAchievementsSection(t)}
            ${this.renderEducationSection(t)}
            ${this.renderCertificationsSection(t)}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-stone-v1')) {
    customElements.define('gqr-resume-stone-v1', GQRResumeStoneV1);
  }
})();