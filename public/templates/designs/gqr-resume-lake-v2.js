(function() {
  'use strict';

  /**
   * name: gqr-resume-lake-v2
   * description: "Two-column resume with a deep navy sidebar, warm white main panel, bold uppercase section titles, and a modern editorial style inspired by a structured sidebar/main layout."
   */

  class GQRResumeLakeV2 extends HTMLElement {
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
          profile: 'Sobre mí',
          experience: 'Experiencia laboral',
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

    t(key) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      return (this.i18n[lang] && this.i18n[lang][key]) || this.i18n.en[key] || key;
    }

    levelLabel(level) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const normalized = this.safeStr(level).toLowerCase().trim();
      return (this.levelMap[lang] && this.levelMap[lang][normalized]) || this.escapeHtml(level);
    }

    formatDate(dateStr) {
      const raw = this.safeStr(dateStr).trim();
      if (!raw) return '';
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';

      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };

      const ym = raw.match(/^(\d{4})-(\d{2})$/);
      if (ym) {
        const year = ym[1];
        const monthIndex = parseInt(ym[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex <= 11) {
          return months[lang][monthIndex] + ' ' + year;
        }
      }

      const y = raw.match(/^(\d{4})$/);
      if (y) return y[1];

      const d = new Date(raw);
      if (!isNaN(d.getTime())) {
        return months[lang][d.getMonth()] + ' ' + d.getFullYear();
      }

      return raw;
    }

    formatRange(startDate, endDate, isCurrentLike) {
      const start = this.formatDate(startDate);
      const end = isCurrentLike ? this.t('present') : this.formatDate(endDate);
      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderContactSection() {
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

      const items = [];
      if (email) items.push(`<div class="contact-item"><span class="contact-value">${this.escapeHtml(email)}</span></div>`);
      if (phone) items.push(`<div class="contact-item"><span class="contact-value">${this.escapeHtml(phone)}</span></div>`);
      if (country) items.push(`<div class="contact-item"><span class="contact-value">${this.escapeHtml(country)}</span></div>`);
      if (linkedin) items.push(`<div class="contact-item"><span class="contact-value">${this.escapeHtml(linkedin)}</span></div>`);

      if (!items.length) return '';

      return `
        <section class="section section-sidebar" data-section="contact">
          <h2 class="section-title sidebar-title">${this.escapeHtml(this.t('contact'))}</h2>
          <div class="contact-list">
            ${items.join('')}
          </div>
        </section>
      `;
    }

    renderLanguagesSection() {
      const langs = this.safeArr(this.data?.languages);
      if (!langs.length) return '';

      const items = langs.map((item) => {
        const id = this.safeStr(item?.id).trim();
        const name = this.safeStr(item?.name).trim();
        const level = this.safeStr(item?.level).trim();
        if (!name) return '';
        return `
          <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
            <div class="language-name">${this.escapeHtml(name)}</div>
            <div class="language-level">${this.escapeHtml(this.levelLabel(level))}</div>
          </div>
        `;
      }).filter(Boolean);

      if (!items.length) return '';

      return `
        <section class="section section-sidebar" data-section="languages">
          <h2 class="section-title sidebar-title">${this.escapeHtml(this.t('languages'))}</h2>
          <div class="language-list">
            ${items.join('')}
          </div>
        </section>
      `;
    }

    renderSkillsSection() {
      const skills = this.safeArr(this.data?.skillsRaw);
      const tools = this.safeArr(this.data?.toolsRaw);
      const merged = [];
      const seen = new Set();

      skills.concat(tools).forEach((item) => {
        const val = this.safeStr(item).trim();
        const key = val.toLowerCase();
        if (val && !seen.has(key)) {
          seen.add(key);
          merged.push(val);
        }
      });

      if (!merged.length) return '';

      return `
        <section class="section section-sidebar" data-section="skills">
          <h2 class="section-title sidebar-title">${this.escapeHtml(this.t('skills'))}</h2>
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
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      if (!fullName && !profession) return '';

      return `
        <section class="hero-header section" data-section="header">
          ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
          ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
        </section>
      `;
    }

    renderProfileSection() {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';
      return `
        <section class="section" data-section="profile">
          <h2 class="section-title main-title">${this.escapeHtml(this.t('profile'))}</h2>
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection() {
      const items = this.safeArr(this.data?.experience);
      if (!items.length) return '';

      const html = items.map((item) => {
        const id = this.safeStr(item?.id).trim();
        const title = this.safeStr(item?.title).trim();
        const company = this.safeStr(item?.company).trim();
        const location = this.safeStr(item?.location).trim();
        const range = this.formatRange(
          this.safeStr(item?.startDate),
          this.safeStr(item?.endDate),
          !!item?.isCurrent
        );
        const bullets = this.safeArr(item?.achievements).concat(this.safeArr(item?.responsibilities))
          .map(v => this.safeStr(v).trim())
          .filter(Boolean);

        if (!title && !company && !range && !bullets.length) return '';

        return `
          <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-top">
              <div class="entry-head">
                ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                ${company || location ? `<div class="entry-subtitle">${this.escapeHtml([company, location].filter(Boolean).join(' · '))}</div>` : ''}
              </div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
            ${bullets.length ? `
              <ul class="bullet-list">
                ${bullets.map(b => `<li>${this.escapeHtml(b)}</li>`).join('')}
              </ul>
            ` : ''}
          </article>
        `;
      }).filter(Boolean);

      if (!html.length) return '';

      return `
        <section class="section" data-section="experience">
          <h2 class="section-title main-title">${this.escapeHtml(this.t('experience'))}</h2>
          <div class="timeline">
            ${html.join('')}
          </div>
        </section>
      `;
    }

    renderProjectsSection() {
      const items = this.safeArr(this.data?.projects);
      if (!items.length) return '';

      const html = items.map((item) => {
        const id = this.safeStr(item?.id).trim();
        const name = this.safeStr(item?.name).trim();
        const description = this.safeStr(item?.description).trim();
        const url = this.safeStr(item?.url).trim();
        const techs = this.safeArr(item?.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
        const range = this.formatRange(
          this.safeStr(item?.startDate),
          this.safeStr(item?.endDate),
          !!item?.isOngoing
        );

        if (!name && !description && !techs.length && !url && !range) return '';

        return `
          <article class="entry card-entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-top">
              <div class="entry-head">
                ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
              </div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
            ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
            ${techs.length ? `
              <div class="tag-row">
                ${techs.map(t => `<span class="tag">${this.escapeHtml(t)}</span>`).join('')}
              </div>
            ` : ''}
          </article>
        `;
      }).filter(Boolean);

      if (!html.length) return '';

      return `
        <section class="section" data-section="projects">
          <h2 class="section-title main-title">${this.escapeHtml(this.t('projects'))}</h2>
          <div class="card-list">
            ${html.join('')}
          </div>
        </section>
      `;
    }

    renderAchievementsSection() {
      const items = this.safeArr(this.data?.achievements);
      if (!items.length) return '';

      const html = items.map((item) => {
        const id = this.safeStr(item?.id).trim();
        const title = this.safeStr(item?.title).trim();
        const description = this.safeStr(item?.description).trim();
        const year = this.safeStr(item?.year).trim();

        if (!title && !description && !year) return '';

        return `
          <article class="entry simple-entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-top">
              <div class="entry-head">
                ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
              </div>
              ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
            </div>
            ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
          </article>
        `;
      }).filter(Boolean);

      if (!html.length) return '';

      return `
        <section class="section" data-section="achievements">
          <h2 class="section-title main-title">${this.escapeHtml(this.t('achievements'))}</h2>
          <div class="stack-list">
            ${html.join('')}
          </div>
        </section>
      `;
    }

    renderEducationSection() {
      const items = this.safeArr(this.data?.education);
      if (!items.length) return '';

      const html = items.map((item) => {
        const id = this.safeStr(item?.id).trim();
        const institution = this.safeStr(item?.institution).trim();
        const degree = this.safeStr(item?.degree).trim();
        const field = this.safeStr(item?.field).trim();
        const gpa = this.safeStr(item?.gpa).trim();
        const range = this.formatRange(
          this.safeStr(item?.startDate),
          this.safeStr(item?.endDate),
          item?.isCompleted === false
        );

        if (!institution && !degree && !field && !gpa && !range) return '';

        const subtitleParts = [];
        if (degree) subtitleParts.push(degree);
        if (field) subtitleParts.push(field);

        return `
          <article class="entry timeline-entry compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-top">
              <div class="entry-head">
                ${institution ? `<div class="entry-title">${this.escapeHtml(institution)}</div>` : ''}
                ${subtitleParts.length ? `<div class="entry-subtitle">${this.escapeHtml(subtitleParts.join(' · '))}</div>` : ''}
                ${gpa ? `<div class="entry-meta">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
              </div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
          </article>
        `;
      }).filter(Boolean);

      if (!html.length) return '';

      return `
        <section class="section" data-section="education">
          <h2 class="section-title main-title">${this.escapeHtml(this.t('education'))}</h2>
          <div class="timeline">
            ${html.join('')}
          </div>
        </section>
      `;
    }

    renderCertificationsSection() {
      const items = this.safeArr(this.data?.certifications);
      if (!items.length) return '';

      const html = items.map((item) => {
        const id = this.safeStr(item?.id).trim();
        const name = this.safeStr(item?.name).trim();
        const issuer = this.safeStr(item?.issuer).trim();
        const date = this.formatDate(this.safeStr(item?.date));

        if (!name && !issuer && !date) return '';

        return `
          <article class="entry simple-entry cert-entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-top">
              <div class="entry-head">
                ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
              </div>
              ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
            </div>
          </article>
        `;
      }).filter(Boolean);

      if (!html.length) return '';

      return `
        <section class="section" data-section="certifications">
          <h2 class="section-title main-title">${this.escapeHtml(this.t('certifications'))}</h2>
          <div class="stack-list">
            ${html.join('')}
          </div>
        </section>
      `;
    }

    render() {
      const styles = `
        <style>
          :host {
            display: block;
            color: #10131d;
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
            background: #f7f4ed;
            display: grid;
            grid-template-columns: 34% 66%;
            font-family: Inter, Arial, Helvetica, sans-serif;
            position: relative;
          }

          .page::before {
            content: "";
            position: absolute;
            inset: 0 auto 0 0;
            width: 34%;
            background:
              radial-gradient(circle at 18px 18px, rgba(255,255,255,0.06) 0 8px, transparent 8px 100%),
              linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.00)),
              #0b1024;
            pointer-events: none;
          }

          .sidebar,
          .main {
            position: relative;
            z-index: 1;
          }

          .sidebar {
            color: #eef2ff;
            padding: 24mm 8mm 16mm 14mm;
          }

          .main {
            padding: 16mm 14mm 16mm 12mm;
            background:
              linear-gradient(to bottom, rgba(8,15,40,0.03), rgba(8,15,40,0) 28mm),
              #f7f4ed;
          }

          .section {
            margin: 0 0 9mm 0;
            break-inside: avoid;
          }

          .section-title {
            margin: 0 0 4mm 0;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 800;
            line-height: 1.1;
          }

          .sidebar-title {
            font-size: 13px;
            color: #ffffff;
            position: relative;
            padding-bottom: 6px;
          }

          .sidebar-title::after {
            content: "";
            display: block;
            width: 28px;
            height: 2px;
            background: #d6b36a;
            margin-top: 6px;
          }

          .main-title {
            font-size: 14px;
            color: #0b1024;
            position: relative;
            padding-bottom: 7px;
            border-bottom: 1px solid rgba(11,16,36,0.14);
          }

          .hero-header {
            margin-bottom: 9mm;
            padding: 2mm 0 5mm 0;
            border-bottom: 3px solid #0b1024;
          }

          .name {
            margin: 0;
            font-size: 34px;
            line-height: 1;
            font-weight: 900;
            letter-spacing: 0.03em;
            text-transform: uppercase;
            color: #0b1024;
          }

          .profession {
            margin-top: 4px;
            font-size: 15px;
            font-weight: 600;
            color: #454d66;
          }

          .profile-text,
          .entry-text,
          .bullet-list,
          .contact-value,
          .language-level,
          .entry-subtitle,
          .entry-meta,
          .entry-link {
            font-size: 11.5px;
            line-height: 1.5;
          }

          .contact-list {
            display: grid;
            gap: 8px;
          }

          .contact-item {
            padding: 0;
            color: #dbe3ff;
            word-break: break-word;
          }

          .language-list {
            display: grid;
            gap: 10px;
          }

          .language-item {
            padding-bottom: 8px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }

          .language-name {
            font-size: 12px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 2px;
          }

          .language-level {
            color: #b9c4ea;
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
            border: 1px solid rgba(214,179,106,0.45);
            border-radius: 999px;
            background: rgba(255,255,255,0.06);
            color: #f3f6ff;
            font-size: 10px;
            line-height: 1.2;
            font-weight: 600;
          }

          .timeline,
          .stack-list,
          .card-list {
            display: grid;
            gap: 5mm;
          }

          .entry {
            break-inside: avoid;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 2mm;
          }

          .entry-head {
            flex: 1;
            min-width: 0;
          }

          .entry-title {
            font-size: 13px;
            line-height: 1.3;
            font-weight: 800;
            color: #0b1024;
          }

          .entry-subtitle {
            color: #3c455c;
            font-weight: 600;
            margin-top: 2px;
          }

          .entry-meta,
          .entry-link {
            color: #5a647c;
            margin-top: 2px;
            word-break: break-word;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 10.5px;
            line-height: 1.3;
            font-weight: 800;
            color: #0b1024;
            background: #ece7da;
            padding: 3px 7px;
            border-radius: 3px;
            white-space: nowrap;
          }

          .timeline-entry {
            position: relative;
            padding-left: 14px;
            border-left: 2px solid #d6b36a;
          }

          .timeline-entry::before {
            content: "";
            position: absolute;
            left: -5px;
            top: 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #0b1024;
            border: 2px solid #d6b36a;
          }

          .bullet-list {
            margin: 0;
            padding-left: 16px;
            color: #263047;
          }

          .bullet-list li {
            margin: 0 0 4px 0;
          }

          .card-entry,
          .simple-entry {
            background: rgba(255,255,255,0.5);
            border: 1px solid rgba(11,16,36,0.08);
            padding: 10px 11px;
            border-radius: 8px;
          }

          .tag-row {
            margin-top: 8px;
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .tag {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 999px;
            background: #0b1024;
            color: #ffffff;
            font-size: 9.5px;
            line-height: 1.2;
            font-weight: 700;
            white-space: nowrap;
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
        this.renderContactSection(),
        this.renderLanguagesSection(),
        this.renderSkillsSection()
      ].filter(Boolean).join('');

      const mainHtml = [
        this.renderHeaderSection(),
        this.renderProfileSection(),
        this.renderExperienceSection(),
        this.renderProjectsSection(),
        this.renderAchievementsSection(),
        this.renderEducationSection(),
        this.renderCertificationsSection()
      ].filter(Boolean).join('');

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

  if (!customElements.get('gqr-resume-lake-v2')) {
    customElements.define('gqr-resume-lake-v2', GQRResumeLakeV2);
  }
})();