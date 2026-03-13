(function() {
  'use strict';

  /**
   * name: gqr-resume-ivy-v2
   * description: "Two-column resume with a warm light-gray sidebar, deep charcoal main area accents, compact uppercase section headers, and clean modern typography inspired by a refined editorial layout."
   */

  class GQRResumeIvyV2 extends HTMLElement {
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

    formatDate(value, lang) {
      const raw = this.safeStr(value).trim();
      if (!raw) return '';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const ymMatch = raw.match(/^(\d{4})-(\d{2})$/);
      if (ymMatch) {
        const year = ymMatch[1];
        const monthIndex = parseInt(ymMatch[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return months[monthIndex] + ' ' + year;
        }
      }

      const ymdMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (ymdMatch) {
        const year = ymdMatch[1];
        const monthIndex = parseInt(ymdMatch[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return months[monthIndex] + ' ' + year;
        }
      }

      return raw;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const start = this.formatDate(startDate, lang);
      const end = isCurrentLike ? t.present : this.formatDate(endDate, lang);

      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    getText(key) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      return (this.i18n[lang] && this.i18n[lang][key]) || this.i18n.en[key] || key;
    }

    getLevel(level) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const normalized = this.safeStr(level).toLowerCase();
      return (this.levelMap[lang] && this.levelMap[lang][normalized]) || this.escapeHtml(level);
    }

    renderContactSection() {
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

      if (!email && !phone && !country && !linkedin) return '';

      const items = [];
      if (email) {
        items.push(`
          <div class="contact-item">
            <span class="contact-dot"></span>
            <span class="contact-text">${this.escapeHtml(email)}</span>
          </div>
        `);
      }
      if (phone) {
        items.push(`
          <div class="contact-item">
            <span class="contact-dot"></span>
            <span class="contact-text">${this.escapeHtml(phone)}</span>
          </div>
        `);
      }
      if (country) {
        items.push(`
          <div class="contact-item">
            <span class="contact-dot"></span>
            <span class="contact-text">${this.escapeHtml(country)}</span>
          </div>
        `);
      }
      if (linkedin) {
        items.push(`
          <div class="contact-item">
            <span class="contact-dot"></span>
            <span class="contact-text">${this.escapeHtml(linkedin)}</span>
          </div>
        `);
      }

      return `
        <section class="section sidebar-section" data-section="contact">
          <h3 class="section-title sidebar-title">${this.escapeHtml(this.getText('contact'))}</h3>
          <div class="contact-list">${items.join('')}</div>
        </section>
      `;
    }

    renderLanguagesSection() {
      const languages = this.safeArr(this.data?.languages).filter(item => {
        return this.safeStr(item?.name).trim();
      });

      if (!languages.length) return '';

      return `
        <section class="section sidebar-section" data-section="languages">
          <h3 class="section-title sidebar-title">${this.escapeHtml(this.getText('languages'))}</h3>
          <div class="languages-list">
            ${languages.map(lang => `
              <div class="language-item" data-entry-id="${this.escapeHtml(this.safeStr(lang?.id))}">
                <div class="language-name">${this.escapeHtml(this.safeStr(lang?.name))}</div>
                <div class="language-level">${this.escapeHtml(this.getLevel(lang?.level))}</div>
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderSkillsSection() {
      const merged = [...this.safeArr(this.data?.skillsRaw), ...this.safeArr(this.data?.toolsRaw)]
        .map(v => this.safeStr(v).trim())
        .filter(Boolean);

      const deduped = [];
      const seen = new Set();
      for (const item of merged) {
        const key = item.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          deduped.push(item);
        }
      }

      if (!deduped.length) return '';

      return `
        <section class="section sidebar-section" data-section="skills">
          <h3 class="section-title sidebar-title">${this.escapeHtml(this.getText('skills'))}</h3>
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
      const fullName = [firstName, lastName].filter(Boolean).join(' ');

      if (!fullName && !profession) return '';

      return `
        <section class="hero" data-section="header">
          <div class="hero-inner">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
        </section>
      `;
    }

    renderProfileSection() {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';

      return `
        <section class="section main-section" data-section="profile">
          <h3 class="section-title main-title">${this.escapeHtml(this.getText('profile'))}</h3>
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection() {
      const items = this.safeArr(this.data?.experience).filter(item => {
        return this.safeStr(item?.title).trim() || this.safeStr(item?.company).trim();
      });

      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="experience">
          <h3 class="section-title main-title">${this.escapeHtml(this.getText('experience'))}</h3>
          <div class="timeline-list">
            ${items.map(item => {
              const title = this.safeStr(item?.title).trim();
              const company = this.safeStr(item?.company).trim();
              const location = this.safeStr(item?.location).trim();
              const range = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isCurrent);
              const bullets = [...this.safeArr(item?.achievements), ...this.safeArr(item?.responsibilities)]
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);

              const metaParts = [company, location].filter(Boolean);

              return `
                <article class="timeline-item" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <div class="item-head">
                      <div class="item-head-main">
                        ${title ? `<div class="item-title">${this.escapeHtml(title)}</div>` : ''}
                        ${metaParts.length ? `<div class="item-subtitle">${this.escapeHtml(metaParts.join(' • '))}</div>` : ''}
                      </div>
                      ${range ? `<div class="item-date">${this.escapeHtml(range)}</div>` : ''}
                    </div>
                    ${bullets.length ? `
                      <ul class="bullet-list">
                        ${bullets.map(b => `<li>${this.escapeHtml(b)}</li>`).join('')}
                      </ul>
                    ` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjectsSection() {
      const items = this.safeArr(this.data?.projects).filter(item => {
        return this.safeStr(item?.name).trim() || this.safeStr(item?.description).trim();
      });

      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          <h3 class="section-title main-title">${this.escapeHtml(this.getText('projects'))}</h3>
          <div class="stack-list">
            ${items.map(item => {
              const name = this.safeStr(item?.name).trim();
              const description = this.safeStr(item?.description).trim();
              const url = this.safeStr(item?.url).trim();
              const technologies = this.safeArr(item?.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const range = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isOngoing);

              return `
                <article class="stack-item" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                  <div class="item-head">
                    <div class="item-head-main">
                      ${name ? `<div class="item-title">${this.escapeHtml(name)}</div>` : ''}
                      ${url ? `<div class="item-subtitle">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${range ? `<div class="item-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${description ? `<div class="item-text">${this.escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map(tech => `<span class="tag">${this.escapeHtml(tech)}</span>`).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievementsSection() {
      const items = this.safeArr(this.data?.achievements).filter(item => {
        return this.safeStr(item?.title).trim() || this.safeStr(item?.description).trim();
      });

      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          <h3 class="section-title main-title">${this.escapeHtml(this.getText('achievements'))}</h3>
          <div class="stack-list">
            ${items.map(item => `
              <article class="stack-item" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                <div class="item-head">
                  <div class="item-head-main">
                    ${this.safeStr(item?.title).trim() ? `<div class="item-title">${this.escapeHtml(this.safeStr(item?.title))}</div>` : ''}
                  </div>
                  ${this.safeStr(item?.year).trim() ? `<div class="item-date">${this.escapeHtml(this.safeStr(item?.year))}</div>` : ''}
                </div>
                ${this.safeStr(item?.description).trim() ? `<div class="item-text">${this.escapeHtml(this.safeStr(item?.description))}</div>` : ''}
              </article>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderEducationSection() {
      const items = this.safeArr(this.data?.education).filter(item => {
        return this.safeStr(item?.institution).trim() || this.safeStr(item?.degree).trim() || this.safeStr(item?.field).trim();
      });

      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="education">
          <h3 class="section-title main-title">${this.escapeHtml(this.getText('education'))}</h3>
          <div class="timeline-list compact-timeline">
            ${items.map(item => {
              const institution = this.safeStr(item?.institution).trim();
              const degree = this.safeStr(item?.degree).trim();
              const field = this.safeStr(item?.field).trim();
              const gpa = this.safeStr(item?.gpa).trim();
              const title = [degree, field].filter(Boolean).join(' — ');
              const range = this.formatDateRange(item?.startDate, item?.endDate, item?.isCompleted === false);

              return `
                <article class="timeline-item" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <div class="item-head">
                      <div class="item-head-main">
                        ${title ? `<div class="item-title">${this.escapeHtml(title)}</div>` : ''}
                        ${institution ? `<div class="item-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                      </div>
                      ${range ? `<div class="item-date">${this.escapeHtml(range)}</div>` : ''}
                    </div>
                    ${gpa ? `<div class="item-text">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertificationsSection() {
      const items = this.safeArr(this.data?.certifications).filter(item => {
        return this.safeStr(item?.name).trim() || this.safeStr(item?.issuer).trim();
      });

      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          <h3 class="section-title main-title">${this.escapeHtml(this.getText('certifications'))}</h3>
          <div class="stack-list">
            ${items.map(item => `
              <article class="stack-item" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                <div class="item-head">
                  <div class="item-head-main">
                    ${this.safeStr(item?.name).trim() ? `<div class="item-title">${this.escapeHtml(this.safeStr(item?.name))}</div>` : ''}
                    ${this.safeStr(item?.issuer).trim() ? `<div class="item-subtitle">${this.escapeHtml(this.safeStr(item?.issuer))}</div>` : ''}
                  </div>
                  ${this.safeStr(item?.date).trim() ? `<div class="item-date">${this.escapeHtml(this.safeStr(item?.date))}</div>` : ''}
                </div>
              </article>
            `).join('')}
          </div>
        </section>
      `;
    }

    render() {
      if (!this.shadowRoot) return;

      const headerSection = this.renderHeaderSection();
      const contactSection = this.renderContactSection();
      const languagesSection = this.renderLanguagesSection();
      const skillsSection = this.renderSkillsSection();
      const profileSection = this.renderProfileSection();
      const experienceSection = this.renderExperienceSection();
      const projectsSection = this.renderProjectsSection();
      const achievementsSection = this.renderAchievementsSection();
      const educationSection = this.renderEducationSection();
      const certificationsSection = this.renderCertificationsSection();

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #23252c;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-family: Inter, "Segoe UI", Roboto, Arial, sans-serif;
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
            background: #ffffff;
            display: grid;
            grid-template-columns: 33% 67%;
            grid-template-rows: auto 1fr;
            box-shadow: 0 0 0 1px rgba(0,0,0,0.04);
          }

          .hero {
            grid-column: 1 / -1;
            background:
              linear-gradient(90deg, #d9d7d2 0 33%, #262733 33% 100%);
            color: #ffffff;
            min-height: 96px;
            display: flex;
            align-items: center;
          }

          .hero-inner {
            width: 100%;
            padding: 26px 28px 22px 28px;
            padding-left: calc(33% + 24px);
          }

          .name {
            margin: 0;
            font-size: 31px;
            line-height: 1.05;
            letter-spacing: 2px;
            font-weight: 800;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 6px;
            font-size: 14px;
            line-height: 1.3;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #e6e6ee;
            font-weight: 500;
          }

          .sidebar {
            background: #d9d7d2;
            color: #2b2c31;
            padding: 26px 20px 30px 20px;
          }

          .main {
            background: #ffffff;
            color: #2a2b31;
            padding: 26px 26px 30px 26px;
          }

          .section {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .sidebar-section + .sidebar-section {
            margin-top: 26px;
          }

          .main-section + .main-section {
            margin-top: 22px;
          }

          .section-title {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 0 0 12px 0;
            font-size: 12px;
            line-height: 1;
            letter-spacing: 3px;
            text-transform: uppercase;
            font-weight: 800;
          }

          .sidebar-title {
            color: #2d2e34;
          }

          .main-title {
            color: #2d2e34;
          }

          .section-title::after {
            content: "";
            height: 1px;
            flex: 1;
            background: rgba(45,46,52,0.3);
          }

          .contact-list,
          .languages-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            font-size: 11.5px;
            line-height: 1.45;
          }

          .contact-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #262733;
            margin-top: 5px;
            flex: 0 0 7px;
          }

          .contact-text {
            word-break: break-word;
          }

          .language-item {
            padding-bottom: 8px;
            border-bottom: 1px solid rgba(38,39,51,0.12);
          }

          .language-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .language-name {
            font-size: 12px;
            font-weight: 700;
            line-height: 1.3;
            color: #23252c;
          }

          .language-level {
            margin-top: 2px;
            font-size: 11px;
            line-height: 1.3;
            color: #52545f;
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
            padding: 5px 8px;
            border-radius: 999px;
            background: #262733;
            color: #ffffff;
            font-size: 10.5px;
            line-height: 1.2;
            letter-spacing: 0.3px;
          }

          .profile-text,
          .item-text {
            font-size: 12px;
            line-height: 1.65;
            color: #484b56;
            white-space: pre-wrap;
            word-break: break-word;
          }

          .timeline-list {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 18px;
          }

          .timeline-item {
            position: relative;
            display: grid;
            grid-template-columns: 18px 1fr;
            gap: 12px;
          }

          .timeline-marker {
            position: relative;
            width: 18px;
          }

          .timeline-marker::before {
            content: "";
            position: absolute;
            left: 7px;
            top: 4px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #262733;
          }

          .timeline-marker::after {
            content: "";
            position: absolute;
            left: 9.5px;
            top: 16px;
            bottom: -18px;
            width: 1px;
            background: rgba(38,39,51,0.2);
          }

          .timeline-item:last-child .timeline-marker::after {
            display: none;
          }

          .timeline-content,
          .stack-item {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .item-head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 14px;
            margin-bottom: 5px;
          }

          .item-head-main {
            min-width: 0;
            flex: 1;
          }

          .item-title {
            font-size: 13px;
            line-height: 1.35;
            font-weight: 800;
            color: #252730;
          }

          .item-subtitle {
            margin-top: 2px;
            font-size: 11.5px;
            line-height: 1.45;
            color: #666a75;
          }

          .item-date {
            flex: 0 0 auto;
            font-size: 10.5px;
            line-height: 1.2;
            color: #6b6f7c;
            text-transform: uppercase;
            letter-spacing: 1px;
            white-space: nowrap;
            padding-top: 2px;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 16px;
          }

          .bullet-list li {
            margin: 0 0 4px 0;
            font-size: 11.5px;
            line-height: 1.55;
            color: #464954;
          }

          .stack-list {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .stack-item {
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(38,39,51,0.1);
          }

          .stack-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
          }

          .tag {
            display: inline-block;
            border: 1px solid rgba(38,39,51,0.18);
            color: #31333d;
            background: #f6f7f9;
            border-radius: 999px;
            padding: 4px 8px;
            font-size: 10.5px;
            line-height: 1.2;
            white-space: nowrap;
          }

          @media print {
            :host {
              margin: 0;
            }

            .page {
              width: 210mm;
              min-height: 297mm;
              box-shadow: none;
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

  if (!customElements.get('gqr-resume-ivy-v2')) {
    customElements.define('gqr-resume-ivy-v2', GQRResumeIvyV2);
  }
})();