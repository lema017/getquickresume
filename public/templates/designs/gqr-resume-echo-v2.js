(function() {
  'use strict';

  /**
   * name: gqr-resume-echo-v2
   * description: "Two-column resume with a warm taupe sidebar, soft ivory main panel, elegant serif header, and clean editorial section dividers inspired by a modern minimalist profile layout."
   */

  class GQRResumeEchoV2 extends HTMLElement {
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
          profile: 'Acerca de mí',
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

    formatDate(value, lang) {
      const v = this.safeStr(value).trim();
      if (!v) return '';
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };
      const match = v.match(/^(\d{4})(?:-(\d{2}))?/);
      if (!match) return this.escapeHtml(v);
      const year = match[1];
      const monthIndex = match[2] ? parseInt(match[2], 10) - 1 : -1;
      if (monthIndex >= 0 && monthIndex < 12) {
        return `${months[lang] ? months[lang][monthIndex] : months.en[monthIndex]} ${year}`;
      }
      return year;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const start = this.formatDate(startDate, lang);
      const end = isCurrentLike ? t.present : this.formatDate(endDate, lang);
      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderContactSection(labels) {
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

      if (!email && !phone && !country && !linkedin) return '';

      const items = [];
      if (email) {
        items.push(`
          <div class="contact-item">
            <span class="icon" aria-hidden="true">✉</span>
            <span class="contact-text">${this.escapeHtml(email)}</span>
          </div>
        `);
      }
      if (phone) {
        items.push(`
          <div class="contact-item">
            <span class="icon" aria-hidden="true">☎</span>
            <span class="contact-text">${this.escapeHtml(phone)}</span>
          </div>
        `);
      }
      if (country) {
        items.push(`
          <div class="contact-item">
            <span class="icon" aria-hidden="true">⌂</span>
            <span class="contact-text">${this.escapeHtml(country)}</span>
          </div>
        `);
      }
      if (linkedin) {
        items.push(`
          <div class="contact-item">
            <span class="icon" aria-hidden="true">in</span>
            <span class="contact-text">${this.escapeHtml(linkedin)}</span>
          </div>
        `);
      }

      return `
        <section class="section section-sidebar" data-section="contact">
          <h3 class="section-title sidebar-title">${this.escapeHtml(labels.contact)}</h3>
          <div class="section-rule"></div>
          <div class="contact-list">
            ${items.join('')}
          </div>
        </section>
      `;
    }

    renderLanguagesSection(labels, lang) {
      const languages = this.safeArr(this.data?.languages).filter(item => {
        return this.safeStr(item?.name).trim();
      });
      if (!languages.length) return '';

      return `
        <section class="section section-sidebar" data-section="languages">
          <h3 class="section-title sidebar-title">${this.escapeHtml(labels.languages)}</h3>
          <div class="section-rule"></div>
          <div class="lang-list">
            ${languages.map((item, idx) => {
              const name = this.safeStr(item?.name).trim();
              const rawLevel = this.safeStr(item?.level).trim().toLowerCase();
              const level = this.levelMap[lang]?.[rawLevel] || this.escapeHtml(item?.level || '');
              return `
                <div class="lang-item" data-entry-id="${this.escapeHtml(this.safeStr(item?.id) || `lang-${idx}`)}">
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
      const combined = [...this.safeArr(this.data?.skillsRaw), ...this.safeArr(this.data?.toolsRaw)]
        .map(v => this.safeStr(v).trim())
        .filter(Boolean);

      const seen = new Set();
      const skills = combined.filter(skill => {
        const key = skill.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      if (!skills.length) return '';

      return `
        <section class="section section-sidebar" data-section="skills">
          <h3 class="section-title sidebar-title">${this.escapeHtml(labels.skills)}</h3>
          <div class="section-rule"></div>
          <div class="skills-wrap">
            ${skills.map((skill, idx) => `
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
      const fullName = [firstName, lastName].filter(Boolean).join(' ');

      if (!fullName && !profession) return '';

      return `
        <section class="hero" data-section="header">
          <div class="hero-inner">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
          <div class="hero-accent hero-accent-1"></div>
          <div class="hero-accent hero-accent-2"></div>
        </section>
      `;
    }

    renderProfileSection(labels) {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';

      return `
        <section class="section" data-section="profile">
          <h3 class="section-title">${this.escapeHtml(labels.profile)}</h3>
          <div class="section-rule"></div>
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection(labels) {
      const items = this.safeArr(this.data?.experience).filter(item => {
        return this.safeStr(item?.title).trim() || this.safeStr(item?.company).trim();
      });
      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          <h3 class="section-title">${this.escapeHtml(labels.experience)}</h3>
          <div class="section-rule"></div>
          <div class="entries">
            ${items.map((item, idx) => {
              const title = this.safeStr(item?.title).trim();
              const company = this.safeStr(item?.company).trim();
              const location = this.safeStr(item?.location).trim();
              const dateRange = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isCurrent);
              const bullets = [...this.safeArr(item?.achievements), ...this.safeArr(item?.responsibilities)]
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id) || `exp-${idx}`)}">
                  <div class="entry-head">
                    <div class="entry-head-left">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${company ? `<span>${this.escapeHtml(company)}</span>` : ''}
                          ${company && location ? `<span class="sep">•</span>` : ''}
                          ${location ? `<span>${this.escapeHtml(location)}</span>` : ''}
                        </div>
                      ` : ''}
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
      const items = this.safeArr(this.data?.projects).filter(item => {
        return this.safeStr(item?.name).trim() || this.safeStr(item?.description).trim();
      });
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          <h3 class="section-title">${this.escapeHtml(labels.projects)}</h3>
          <div class="section-rule"></div>
          <div class="entries">
            ${items.map((item, idx) => {
              const name = this.safeStr(item?.name).trim();
              const description = this.safeStr(item?.description).trim();
              const tech = this.safeArr(item?.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const url = this.safeStr(item?.url).trim();
              const dateRange = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isOngoing);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id) || `proj-${idx}`)}">
                  <div class="entry-head">
                    <div class="entry-head-left">
                      ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                      ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${tech.length ? `<div class="tech-line">${tech.map(t => `<span class="tech-chip">${this.escapeHtml(t)}</span>`).join('')}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievementsSection(labels) {
      const items = this.safeArr(this.data?.achievements).filter(item => {
        return this.safeStr(item?.title).trim() || this.safeStr(item?.description).trim();
      });
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          <h3 class="section-title">${this.escapeHtml(labels.achievements)}</h3>
          <div class="section-rule"></div>
          <div class="entries">
            ${items.map((item, idx) => {
              const title = this.safeStr(item?.title).trim();
              const description = this.safeStr(item?.description).trim();
              const year = this.safeStr(item?.year).trim();

              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id) || `ach-${idx}`)}">
                  <div class="entry-head">
                    <div class="entry-head-left">
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

    renderEducationSection(labels) {
      const items = this.safeArr(this.data?.education).filter(item => {
        return this.safeStr(item?.institution).trim() || this.safeStr(item?.degree).trim() || this.safeStr(item?.field).trim();
      });
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          <h3 class="section-title">${this.escapeHtml(labels.education)}</h3>
          <div class="section-rule"></div>
          <div class="entries">
            ${items.map((item, idx) => {
              const institution = this.safeStr(item?.institution).trim();
              const degree = this.safeStr(item?.degree).trim();
              const field = this.safeStr(item?.field).trim();
              const gpa = this.safeStr(item?.gpa).trim();
              const dateRange = this.formatDateRange(item?.startDate, item?.endDate, item?.isCompleted === false);
              const degreeLine = [degree, field].filter(Boolean).join(degree && field ? ' — ' : '');

              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id) || `edu-${idx}`)}">
                  <div class="entry-head">
                    <div class="entry-head-left">
                      ${degreeLine ? `<div class="entry-title">${this.escapeHtml(degreeLine)}</div>` : ''}
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

    renderCertificationsSection(labels) {
      const items = this.safeArr(this.data?.certifications).filter(item => {
        return this.safeStr(item?.name).trim() || this.safeStr(item?.issuer).trim();
      });
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          <h3 class="section-title">${this.escapeHtml(labels.certifications)}</h3>
          <div class="section-rule"></div>
          <div class="entries">
            ${items.map((item, idx) => {
              const name = this.safeStr(item?.name).trim();
              const issuer = this.safeStr(item?.issuer).trim();
              const date = this.safeStr(item?.date).trim();

              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id) || `cert-${idx}`)}">
                  <div class="entry-head">
                    <div class="entry-head-left">
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
      const labels = this.i18n[lang];

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2e2a27;
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
            background: #f7f3ee;
            display: grid;
            grid-template-columns: 34% 66%;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.45;
          }

          .sidebar {
            background: #ddd4ca;
            padding: 30px 24px 34px;
            color: #342e2a;
          }

          .main {
            background: #fbf9f6;
            padding: 0 28px 34px;
            color: #2d2926;
          }

          .hero {
            position: relative;
            background: linear-gradient(180deg, #cfc5bb 0%, #d8cfc6 100%);
            margin: 0 -28px 22px;
            padding: 34px 30px 28px;
            overflow: hidden;
            min-height: 126px;
            border-bottom: 1px solid rgba(80, 66, 57, 0.12);
          }

          .hero-inner {
            position: relative;
            z-index: 2;
            max-width: 78%;
          }

          .hero-accent {
            position: absolute;
            border: 1px solid rgba(255,255,255,0.55);
            border-radius: 999px;
            z-index: 1;
            pointer-events: none;
          }

          .hero-accent-1 {
            width: 180px;
            height: 180px;
            right: -34px;
            top: -24px;
          }

          .hero-accent-2 {
            width: 128px;
            height: 128px;
            right: 8px;
            top: 12px;
          }

          .name {
            margin: 0;
            font-family: Georgia, 'Times New Roman', serif;
            font-weight: 500;
            font-size: 34px;
            line-height: 1.05;
            letter-spacing: 0.2px;
            color: #2f2a27;
          }

          .profession {
            margin-top: 10px;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 1.8px;
            color: #564c44;
            font-weight: 700;
          }

          .section {
            margin: 0 0 18px;
          }

          .section-sidebar {
            margin-bottom: 22px;
          }

          .section-title {
            margin: 0;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1.6px;
            font-weight: 700;
            color: #342d29;
          }

          .sidebar-title {
            color: #3e3631;
          }

          .section-rule {
            width: 34px;
            height: 3px;
            background: #c39a6b;
            margin: 8px 0 12px;
            border-radius: 2px;
          }

          .profile-text,
          .entry-text,
          .contact-text,
          .lang-level,
          .entry-subtitle,
          .entry-link {
            font-size: 12px;
            color: #5a514b;
          }

          .contact-list {
            display: grid;
            gap: 8px;
          }

          .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            min-width: 0;
          }

          .icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 14px;
            min-width: 14px;
            font-size: 11px;
            color: #6f6258;
            margin-top: 1px;
            font-weight: 700;
          }

          .lang-list {
            display: grid;
            gap: 10px;
          }

          .lang-item {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 8px;
            align-items: baseline;
          }

          .lang-name {
            font-size: 12px;
            font-weight: 700;
            color: #2f2a27;
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
            background: #efe7de;
            border: 1px solid #ccb9a7;
            color: #4a4039;
            font-size: 11px;
            line-height: 1.2;
          }

          .entries {
            display: grid;
            gap: 14px;
          }

          .entry {
            position: relative;
            padding-left: 14px;
          }

          .entry::before {
            content: '';
            position: absolute;
            left: 0;
            top: 6px;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #b88958;
          }

          .compact-entry {
            padding-left: 12px;
          }

          .entry-head {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 10px;
            align-items: start;
          }

          .entry-head-left {
            min-width: 0;
          }

          .entry-title {
            font-size: 14px;
            font-weight: 700;
            color: #2d2926;
            line-height: 1.3;
          }

          .entry-subtitle {
            margin-top: 2px;
          }

          .sep {
            margin: 0 5px;
          }

          .entry-date {
            font-size: 11px;
            color: #7a6f66;
            text-transform: uppercase;
            letter-spacing: 0.7px;
            white-space: nowrap;
            padding-top: 1px;
          }

          .entry-text {
            margin-top: 6px;
          }

          .entry-link {
            margin-top: 3px;
            word-break: break-word;
          }

          .bullet-list {
            margin: 7px 0 0 0;
            padding-left: 17px;
            color: #4f4741;
          }

          .bullet-list li {
            margin: 3px 0;
            font-size: 12px;
          }

          .tech-line {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
          }

          .tech-chip {
            display: inline-block;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            padding: 4px 7px;
            border-radius: 3px;
            background: #eee5db;
            color: #5d524a;
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

  if (!customElements.get('gqr-resume-echo-v2')) {
    customElements.define('gqr-resume-echo-v2', GQRResumeEchoV2);
  }
})();