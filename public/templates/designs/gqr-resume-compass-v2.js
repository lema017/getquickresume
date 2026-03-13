(function() {
  'use strict';

  /**
   * name: gqr-resume-compass-v2
   * description: "Two-column resume with a deep slate sidebar, warm off-white main panel, bold geometric headings, and clean modern typography inspired by an architectural editorial layout."
   */

  class GQRResumeCompassV2 extends HTMLElement {
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
      const raw = this.safeStr(value).trim();
      if (!raw) return '';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const ym = raw.match(/^(\d{4})-(\d{2})$/);
      if (ym) {
        const year = ym[1];
        const monthIndex = Math.max(1, Math.min(12, parseInt(ym[2], 10))) - 1;
        return months[monthIndex] + ' ' + year;
      }

      const ymd = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (ymd) {
        const year = ymd[1];
        const monthIndex = Math.max(1, Math.min(12, parseInt(ymd[2], 10))) - 1;
        return months[monthIndex] + ' ' + year;
      }

      const y = raw.match(/^(\d{4})$/);
      if (y) return y[1];

      return raw;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const start = this.formatShortDate(startDate, lang);
      const end = isCurrentLike ? t.present : this.formatShortDate(endDate, lang);
      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderContactSection(t) {
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

      if (!email && !phone && !country && !linkedin) return '';

      const contactItems = [];
      if (email) {
        contactItems.push(`
          <div class="contact-item">
            <span class="contact-label">Email</span>
            <span class="contact-value">${this.escapeHtml(email)}</span>
          </div>
        `);
      }
      if (phone) {
        contactItems.push(`
          <div class="contact-item">
            <span class="contact-label">Phone</span>
            <span class="contact-value">${this.escapeHtml(phone)}</span>
          </div>
        `);
      }
      if (country) {
        contactItems.push(`
          <div class="contact-item">
            <span class="contact-label">${this.getLanguage() === 'es' ? 'Ubicación' : 'Location'}</span>
            <span class="contact-value">${this.escapeHtml(country)}</span>
          </div>
        `);
      }
      if (linkedin) {
        contactItems.push(`
          <div class="contact-item">
            <span class="contact-label">LinkedIn</span>
            <span class="contact-value break">${this.escapeHtml(linkedin)}</span>
          </div>
        `);
      }

      return `
        <section class="section sidebar-section" data-section="contact">
          <h3 class="section-title sidebar-title">${this.escapeHtml(t.contact)}</h3>
          <div class="contact-list">${contactItems.join('')}</div>
        </section>
      `;
    }

    renderLanguagesSection(t, lang) {
      const items = this.safeArr(this.data?.languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section sidebar-section" data-section="languages">
          <h3 class="section-title sidebar-title">${this.escapeHtml(t.languages)}</h3>
          <div class="language-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const name = this.safeStr(item?.name).trim();
              const levelKey = this.safeStr(item?.level).trim().toLowerCase();
              const levelText = this.levelMap[lang]?.[levelKey] || this.safeStr(item?.level);
              if (!name) return '';
              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                  <span class="language-name">${this.escapeHtml(name)}</span>
                  <span class="language-level">${this.escapeHtml(levelText)}</span>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderSkillsSection(t) {
      const merged = [...this.safeArr(this.data?.skillsRaw), ...this.safeArr(this.data?.toolsRaw)]
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
          <h3 class="section-title sidebar-title">${this.escapeHtml(t.skills)}</h3>
          <div class="skills-wrap">
            ${deduped.map((skill, index) => `
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
        <section class="hero" data-section="header">
          <div class="hero-accent hero-accent-top"></div>
          <div class="hero-inner">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
            <div class="hero-rule"></div>
          </div>
        </section>
      `;
    }

    renderProfileSection(t) {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';

      return `
        <section class="section main-section" data-section="profile">
          <h2 class="section-title main-title">${this.escapeHtml(t.profile)}</h2>
          <div class="body-text profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection(t) {
      const items = this.safeArr(this.data?.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="experience">
          <h2 class="section-title main-title">${this.escapeHtml(t.experience)}</h2>
          <div class="timeline-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const title = this.safeStr(item?.title).trim();
              const company = this.safeStr(item?.company).trim();
              const location = this.safeStr(item?.location).trim();
              const dateRange = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isCurrent);
              const bullets = [...this.safeArr(item?.achievements), ...this.safeArr(item?.responsibilities)]
                .map((b) => this.safeStr(b).trim())
                .filter(Boolean);

              if (!title && !company && !location && !dateRange && !bullets.length) return '';

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-head">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                      ${(company || location) ? `
                        <div class="entry-meta">
                          ${company ? `<span>${this.escapeHtml(company)}</span>` : ''}
                          ${company && location ? `<span class="dot">•</span>` : ''}
                          ${location ? `<span>${this.escapeHtml(location)}</span>` : ''}
                        </div>
                      ` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
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

    renderProjectsSection(t) {
      const items = this.safeArr(this.data?.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          <h2 class="section-title main-title">${this.escapeHtml(t.projects)}</h2>
          <div class="stack-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const name = this.safeStr(item?.name).trim();
              const description = this.safeStr(item?.description).trim();
              const url = this.safeStr(item?.url).trim();
              const tech = this.safeArr(item?.technologies).map((x) => this.safeStr(x).trim()).filter(Boolean);
              const dateRange = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isOngoing);

              if (!name && !description && !url && !tech.length && !dateRange) return '';

              return `
                <article class="entry card-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-head">
                      ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                      ${url ? `<div class="entry-link break">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${description ? `<div class="body-text">${this.escapeHtml(description)}</div>` : ''}
                  ${tech.length ? `
                    <div class="tag-row">
                      ${tech.map((tag) => `<span class="tag">${this.escapeHtml(tag)}</span>`).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievementsSection(t) {
      const items = this.safeArr(this.data?.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          <h2 class="section-title main-title">${this.escapeHtml(t.achievements)}</h2>
          <div class="stack-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const title = this.safeStr(item?.title).trim();
              const description = this.safeStr(item?.description).trim();
              const year = this.safeStr(item?.year).trim();

              if (!title && !description && !year) return '';

              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-head">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                    </div>
                    ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<div class="body-text">${this.escapeHtml(description)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducationSection(t) {
      const items = this.safeArr(this.data?.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="education">
          <h2 class="section-title main-title">${this.escapeHtml(t.education)}</h2>
          <div class="timeline-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const institution = this.safeStr(item?.institution).trim();
              const degree = this.safeStr(item?.degree).trim();
              const field = this.safeStr(item?.field).trim();
              const gpa = this.safeStr(item?.gpa).trim();
              const dateRange = this.formatDateRange(item?.startDate, item?.endDate, item?.isCompleted === false);

              if (!institution && !degree && !field && !gpa && !dateRange) return '';

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-head">
                      ${degree ? `<div class="entry-title">${this.escapeHtml(degree)}</div>` : ''}
                      ${(institution || field || gpa) ? `
                        <div class="entry-meta">
                          ${institution ? `<span>${this.escapeHtml(institution)}</span>` : ''}
                          ${institution && field ? `<span class="dot">•</span>` : ''}
                          ${field ? `<span>${this.escapeHtml(field)}</span>` : ''}
                          ${(institution || field) && gpa ? `<span class="dot">•</span>` : ''}
                          ${gpa ? `<span>GPA: ${this.escapeHtml(gpa)}</span>` : ''}
                        </div>
                      ` : ''}
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

    renderCertificationsSection(t) {
      const items = this.safeArr(this.data?.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          <h2 class="section-title main-title">${this.escapeHtml(t.certifications)}</h2>
          <div class="stack-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const name = this.safeStr(item?.name).trim();
              const issuer = this.safeStr(item?.issuer).trim();
              const date = this.safeStr(item?.date).trim();

              if (!name && !issuer && !date) return '';

              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-head">
                      ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                      ${issuer ? `<div class="entry-meta"><span>${this.escapeHtml(issuer)}</span></div>` : ''}
                    </div>
                    ${date ? `<div class="entry-date">${this.escapeHtml(this.formatShortDate(date, this.getLanguage() === 'es' ? 'es' : 'en'))}</div>` : ''}
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
      const t = this.i18n[lang];

      const headerSection = this.renderHeaderSection();
      const contactSection = this.renderContactSection(t);
      const languagesSection = this.renderLanguagesSection(t, lang);
      const skillsSection = this.renderSkillsSection(t);

      const profileSection = this.renderProfileSection(t);
      const experienceSection = this.renderExperienceSection(t);
      const projectsSection = this.renderProjectsSection(t);
      const achievementsSection = this.renderAchievementsSection(t);
      const educationSection = this.renderEducationSection(t);
      const certificationsSection = this.renderCertificationsSection(t);

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #29323b;
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
            background: #f7f5f1;
            color: #2e3942;
            display: grid;
            grid-template-columns: 34% 66%;
            position: relative;
            font-family: Arial, Helvetica, sans-serif;
          }

          .page::before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 44mm;
            height: 28mm;
            background: #33414f;
            border-bottom-left-radius: 28mm;
          }

          .sidebar {
            background: #33414f;
            color: #f4f0ea;
            padding: 24mm 8mm 14mm 12mm;
            min-height: 297mm;
          }

          .main {
            padding: 18mm 14mm 14mm 12mm;
            background: #f7f5f1;
          }

          .hero {
            margin-bottom: 10mm;
            position: relative;
          }

          .hero-inner {
            padding-top: 4mm;
          }

          .hero-accent-top {
            width: 100%;
            height: 1px;
            background: transparent;
          }

          .name {
            margin: 0;
            font-size: 17pt;
            line-height: 1.05;
            letter-spacing: 0.3px;
            text-transform: uppercase;
            color: #33414f;
            font-weight: 800;
          }

          .profession {
            margin-top: 3mm;
            font-size: 9.5pt;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: #5f6d79;
          }

          .hero-rule {
            margin-top: 8mm;
            width: 100%;
            border-top: 1.5px dashed #8d98a1;
          }

          .section {
            margin-bottom: 9mm;
          }

          .section-title {
            margin: 0 0 4mm 0;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.3px;
          }

          .main-title {
            font-size: 10.5pt;
            color: #33414f;
            position: relative;
            padding-bottom: 2mm;
          }

          .main-title::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 24mm;
            height: 1.2px;
            background: #7f8c95;
          }

          .sidebar-title {
            font-size: 10pt;
            color: #ffffff;
            border-bottom: 1px solid rgba(255,255,255,0.28);
            padding-bottom: 2.5mm;
          }

          .body-text {
            font-size: 9pt;
            line-height: 1.55;
            color: #45515a;
            white-space: pre-wrap;
            word-break: break-word;
          }

          .profile-text {
            color: #3f4a53;
          }

          .contact-list,
          .language-list {
            display: flex;
            flex-direction: column;
            gap: 3.2mm;
          }

          .contact-item,
          .language-item {
            display: flex;
            flex-direction: column;
            gap: 0.8mm;
          }

          .contact-label {
            font-size: 7.4pt;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            color: rgba(244, 240, 234, 0.72);
          }

          .contact-value,
          .language-name {
            font-size: 8.7pt;
            line-height: 1.35;
            color: #f8f5ef;
            word-break: break-word;
          }

          .language-level {
            font-size: 7.8pt;
            line-height: 1.3;
            color: #d2dae0;
            text-transform: uppercase;
            letter-spacing: 1px;
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
            border: 1px solid rgba(255,255,255,0.28);
            color: #f8f5ef;
            background: rgba(255,255,255,0.06);
            border-radius: 999px;
            font-size: 8pt;
            line-height: 1.2;
          }

          .timeline-list,
          .stack-list {
            display: flex;
            flex-direction: column;
            gap: 5mm;
          }

          .entry {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .timeline-entry {
            position: relative;
            padding-left: 4mm;
            border-left: 2px solid #d3d7db;
          }

          .timeline-entry::before {
            content: "";
            position: absolute;
            left: -5px;
            top: 1.2mm;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #33414f;
            border: 2px solid #f7f5f1;
            box-shadow: 0 0 0 1px #33414f;
          }

          .card-entry,
          .compact-entry {
            padding: 3mm 3.5mm;
            background: rgba(51, 65, 79, 0.04);
            border-left: 3px solid #33414f;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4mm;
            margin-bottom: 1.5mm;
          }

          .entry-head {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            font-size: 9.4pt;
            line-height: 1.35;
            font-weight: 700;
            color: #2c3740;
            word-break: break-word;
          }

          .entry-meta {
            margin-top: 1mm;
            font-size: 8.2pt;
            line-height: 1.35;
            color: #66737d;
            word-break: break-word;
          }

          .entry-link {
            margin-top: 1mm;
            font-size: 7.8pt;
            line-height: 1.3;
            color: #5f6d79;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 7.8pt;
            line-height: 1.2;
            color: #5f6d79;
            text-transform: uppercase;
            letter-spacing: 0.7px;
            white-space: nowrap;
            padding-top: 0.5mm;
          }

          .bullet-list {
            margin: 2mm 0 0 0;
            padding-left: 4.5mm;
            color: #45515a;
          }

          .bullet-list li {
            margin: 0 0 1.4mm 0;
            font-size: 8.7pt;
            line-height: 1.45;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2.5mm;
          }

          .tag {
            display: inline-block;
            white-space: nowrap;
            padding: 4px 8px;
            border-radius: 999px;
            background: #dde3e7;
            color: #33414f;
            font-size: 7.8pt;
            line-height: 1.2;
          }

          .dot {
            margin: 0 4px;
          }

          .break {
            word-break: break-word;
            overflow-wrap: anywhere;
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
            ${contactSection}
            ${languagesSection}
            ${skillsSection}
          </div>

          <div class="main">
            ${headerSection}
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

  if (!customElements.get('gqr-resume-compass-v2')) {
    customElements.define('gqr-resume-compass-v2', GQRResumeCompassV2);
  }
})();