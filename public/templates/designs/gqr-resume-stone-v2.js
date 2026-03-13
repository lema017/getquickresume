(function() {
  'use strict';

  /**
   * name: gqr-resume-stone-v2
   * description: "Two-column resume with a warm stone-toned sidebar, minimalist editorial typography, subtle dividers, and a clean modern main column inspired by the reference layout."
   */

  class GQRResumeStoneV2 extends HTMLElement {
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
      return typeof v === 'string' ? v : '';
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

    getText(key) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      return (this.i18n[lang] && this.i18n[lang][key]) || this.i18n.en[key] || key;
    }

    getLevel(level) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const normalized = this.safeStr(level).toLowerCase();
      return (this.levelMap[lang] && this.levelMap[lang][normalized]) || this.escapeHtml(level);
    }

    formatDate(dateStr) {
      const raw = this.safeStr(dateStr);
      if (!raw) return '';
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      if (/^\d{4}$/.test(raw)) return raw;

      if (/^\d{4}-\d{2}$/.test(raw)) {
        const parts = raw.split('-');
        const year = parts[0];
        const monthIndex = parseInt(parts[1], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return months[monthIndex] + ' ' + year;
        }
      }

      const d = new Date(raw);
      if (!isNaN(d.getTime())) {
        return months[d.getMonth()] + ' ' + d.getFullYear();
      }

      return raw;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const start = this.formatDate(startDate);
      const end = isCurrentLike ? this.getText('present') : this.formatDate(endDate);
      if (start && end) return `${start} - ${end}`;
      return start || end || '';
    }

    renderContact() {
      const email = this.safeStr(this.data?.email);
      const phone = this.safeStr(this.data?.phone);
      const country = this.safeStr(this.data?.country);
      const linkedin = this.safeStr(this.data?.linkedin);

      if (!email && !phone && !country && !linkedin) return '';

      const linkedinLabel = linkedin
        ? this.escapeHtml(linkedin.replace(/^https?:\/\//i, '').replace(/^www\./i, ''))
        : '';

      return `
        <section class="section sidebar-section" data-section="contact">
          <h3 class="section-title">${this.escapeHtml(this.getText('contact'))}</h3>
          <div class="contact-list">
            ${email ? `<div class="contact-item"><span class="bullet"></span><span>${this.escapeHtml(email)}</span></div>` : ''}
            ${phone ? `<div class="contact-item"><span class="bullet"></span><span>${this.escapeHtml(phone)}</span></div>` : ''}
            ${country ? `<div class="contact-item"><span class="bullet"></span><span>${this.escapeHtml(country)}</span></div>` : ''}
            ${linkedin ? `<div class="contact-item"><span class="bullet"></span><span>${linkedinLabel}</span></div>` : ''}
          </div>
        </section>
      `;
    }

    renderLanguages() {
      const items = this.safeArr(this.data?.languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section sidebar-section" data-section="languages">
          <h3 class="section-title">${this.escapeHtml(this.getText('languages'))}</h3>
          <div class="lang-list">
            ${items.map((item) => `
              <div class="lang-item" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                <div class="lang-name">${this.escapeHtml(this.safeStr(item.name))}</div>
                <div class="lang-level">${this.escapeHtml(this.getLevel(item.level))}</div>
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderSkills() {
      const skills = this.safeArr(this.data?.skillsRaw);
      const tools = this.safeArr(this.data?.toolsRaw);
      const merged = [...skills, ...tools]
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
          <h3 class="section-title">${this.escapeHtml(this.getText('skills'))}</h3>
          <div class="skills-wrap">
            ${deduped.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderHeader() {
      const firstName = this.safeStr(this.data?.firstName);
      const lastName = this.safeStr(this.data?.lastName);
      const profession = this.safeStr(this.data?.profession);
      const fullName = `${firstName} ${lastName}`.trim();

      if (!fullName && !profession) return '';

      const nameParts = fullName.split(' ').filter(Boolean);
      let first = '';
      let rest = '';
      if (nameParts.length <= 1) {
        first = fullName;
      } else {
        first = nameParts[0];
        rest = nameParts.slice(1).join(' ');
      }

      return `
        <section class="section header-section" data-section="header">
          ${profession ? `<div class="eyebrow">${this.escapeHtml(profession)}</div>` : ''}
          ${fullName ? `
            <h1 class="name">
              <span class="name-first">${this.escapeHtml(first)}</span>
              ${rest ? `<span class="name-rest">${this.escapeHtml(rest)}</span>` : ''}
            </h1>
          ` : ''}
        </section>
      `;
    }

    renderProfile() {
      const summary = this.safeStr(this.data?.summary);
      if (!summary) return '';

      return `
        <section class="section main-section" data-section="profile">
          <h3 class="section-title main-title">${this.escapeHtml(this.getText('profile'))}</h3>
          <div class="summary">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperience() {
      const items = this.safeArr(this.data?.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="experience">
          <h3 class="section-title main-title">${this.escapeHtml(this.getText('experience'))}</h3>
          <div class="entry-list">
            ${items.map((item) => {
              const title = this.safeStr(item.title);
              const company = this.safeStr(item.company);
              const location = this.safeStr(item.location);
              const bullets = [...this.safeArr(item.achievements), ...this.safeArr(item.responsibilities)]
                .map((b) => this.safeStr(b).trim())
                .filter(Boolean);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="entry-head">
                    <div class="entry-head-main">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${company ? `<span>${this.escapeHtml(company)}</span>` : ''}
                          ${company && location ? `<span class="sep">•</span>` : ''}
                          ${location ? `<span>${this.escapeHtml(location)}</span>` : ''}
                        </div>
                      ` : ''}
                    </div>
                    <div class="entry-date">${this.escapeHtml(this.formatDateRange(item.startDate, item.endDate, !!item.isCurrent))}</div>
                  </div>
                  ${bullets.length ? `
                    <ul class="bullet-list">
                      ${bullets.map((b) => `<li>${this.escapeHtml(b)}</li>`).join('')}
                    </ul>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjects() {
      const items = this.safeArr(this.data?.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          <h3 class="section-title main-title">${this.escapeHtml(this.getText('projects'))}</h3>
          <div class="entry-list">
            ${items.map((item) => {
              const name = this.safeStr(item.name);
              const description = this.safeStr(item.description);
              const tech = this.safeArr(item.technologies).map((t) => this.safeStr(t).trim()).filter(Boolean);
              const url = this.safeStr(item.url);
              const range = this.formatDateRange(item.startDate, item.endDate, !!item.isOngoing);

              return `
                <article class="entry project-entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="entry-head">
                    <div class="entry-head-main">
                      ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                      ${url ? `<div class="entry-subtitle">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${tech.length ? `<div class="tag-row">${tech.map((t) => `<span class="mini-tag">${this.escapeHtml(t)}</span>`).join('')}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements() {
      const items = this.safeArr(this.data?.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          <h3 class="section-title main-title">${this.escapeHtml(this.getText('achievements'))}</h3>
          <div class="entry-list">
            ${items.map((item) => `
              <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                <div class="entry-head">
                  <div class="entry-head-main">
                    ${this.safeStr(item.title) ? `<div class="entry-title">${this.escapeHtml(this.safeStr(item.title))}</div>` : ''}
                  </div>
                  ${this.safeStr(item.year) ? `<div class="entry-date">${this.escapeHtml(this.safeStr(item.year))}</div>` : ''}
                </div>
                ${this.safeStr(item.description) ? `<div class="entry-text">${this.escapeHtml(this.safeStr(item.description))}</div>` : ''}
              </article>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderEducation() {
      const items = this.safeArr(this.data?.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="education">
          <h3 class="section-title main-title">${this.escapeHtml(this.getText('education'))}</h3>
          <div class="entry-list">
            ${items.map((item) => {
              const degree = this.safeStr(item.degree);
              const field = this.safeStr(item.field);
              const institution = this.safeStr(item.institution);
              const gpa = this.safeStr(item.gpa);
              const degreeLine = [degree, field].filter(Boolean).join(degree && field ? ' — ' : '');

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="entry-head">
                    <div class="entry-head-main">
                      ${degreeLine ? `<div class="entry-title">${this.escapeHtml(degreeLine)}</div>` : ''}
                      ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                    </div>
                    <div class="entry-date">${this.escapeHtml(this.formatDateRange(item.startDate, item.endDate, item.isCompleted === false))}</div>
                  </div>
                  ${gpa ? `<div class="entry-text">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications() {
      const items = this.safeArr(this.data?.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          <h3 class="section-title main-title">${this.escapeHtml(this.getText('certifications'))}</h3>
          <div class="entry-list">
            ${items.map((item) => `
              <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                <div class="entry-head">
                  <div class="entry-head-main">
                    ${this.safeStr(item.name) ? `<div class="entry-title">${this.escapeHtml(this.safeStr(item.name))}</div>` : ''}
                    ${this.safeStr(item.issuer) ? `<div class="entry-subtitle">${this.escapeHtml(this.safeStr(item.issuer))}</div>` : ''}
                  </div>
                  ${this.safeStr(item.date) ? `<div class="entry-date">${this.escapeHtml(this.safeStr(item.date))}</div>` : ''}
                </div>
              </article>
            `).join('')}
          </div>
        </section>
      `;
    }

    render() {
      const styles = `
        <style>
          :host {
            display: block;
            color: #2f2a27;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-family: Georgia, "Times New Roman", serif;
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
            background: #f6f2ed;
            display: grid;
            grid-template-columns: 34% 66%;
          }

          .sidebar {
            background: #d9d0c7;
            padding: 22mm 10mm 18mm 12mm;
            color: #2e2926;
            border-right: 1px solid rgba(68, 58, 52, 0.12);
          }

          .main {
            background: #f8f5f1;
            padding: 18mm 14mm 18mm 14mm;
          }

          .section {
            margin: 0 0 8mm 0;
          }

          .sidebar-section:last-child,
          .main-section:last-child {
            margin-bottom: 0;
          }

          .header-section {
            margin-bottom: 9mm;
            padding-bottom: 6mm;
            border-bottom: 1px solid rgba(68, 58, 52, 0.18);
          }

          .eyebrow {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #6e625b;
            margin-bottom: 4mm;
            font-weight: 700;
          }

          .name {
            margin: 0;
            line-height: 0.95;
            display: flex;
            flex-direction: column;
            gap: 1mm;
          }

          .name-first {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 23mm;
            font-weight: 900;
            letter-spacing: -0.06em;
            color: #151313;
          }

          .name-rest {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 9.5mm;
            font-weight: 500;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #1f1c1a;
            margin-left: 1mm;
          }

          .section-title {
            margin: 0 0 4mm 0;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10.5pt;
            line-height: 1.2;
            font-weight: 800;
            letter-spacing: 0.02em;
            color: #211d1b;
          }

          .main-title {
            position: relative;
            padding-bottom: 2.5mm;
            border-bottom: 1px solid rgba(68, 58, 52, 0.16);
          }

          .contact-list,
          .lang-list {
            display: flex;
            flex-direction: column;
            gap: 3mm;
          }

          .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 2.5mm;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 8.8pt;
            line-height: 1.4;
            color: #3b3531;
            word-break: break-word;
          }

          .bullet {
            width: 5px;
            height: 5px;
            min-width: 5px;
            margin-top: 4px;
            border-radius: 50%;
            background: #7d6d63;
          }

          .lang-item {
            padding-bottom: 2.5mm;
            border-bottom: 1px solid rgba(68, 58, 52, 0.12);
          }

          .lang-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .lang-name {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 9pt;
            font-weight: 700;
            color: #25211f;
          }

          .lang-level {
            margin-top: 1mm;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 8.4pt;
            color: #6a5f58;
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
            background: #eee7e0;
            border: 1px solid rgba(77, 65, 58, 0.12);
            font-family: Arial, Helvetica, sans-serif;
            font-size: 8.1pt;
            line-height: 1.2;
            color: #342e2a;
          }

          .summary,
          .entry-text,
          .bullet-list {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 8.9pt;
            line-height: 1.55;
            color: #403934;
          }

          .entry-list {
            display: flex;
            flex-direction: column;
            gap: 5mm;
          }

          .entry {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 5mm;
            margin-bottom: 1.8mm;
          }

          .entry-head-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 9.4pt;
            font-weight: 800;
            line-height: 1.35;
            color: #1f1b19;
          }

          .entry-subtitle {
            margin-top: 0.7mm;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 8.5pt;
            line-height: 1.4;
            color: #6a5f58;
            word-break: break-word;
          }

          .entry-date {
            flex-shrink: 0;
            text-align: right;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 8.2pt;
            font-weight: 700;
            line-height: 1.3;
            color: #4b423d;
            white-space: nowrap;
          }

          .sep {
            margin: 0 1.5mm;
          }

          .bullet-list {
            margin: 0;
            padding-left: 4.5mm;
          }

          .bullet-list li {
            margin: 0 0 1mm 0;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2mm;
          }

          .mini-tag {
            display: inline-block;
            padding: 3px 7px;
            border-radius: 999px;
            background: #efe9e2;
            color: #4a413c;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 7.8pt;
            line-height: 1.2;
            border: 1px solid rgba(77, 65, 58, 0.1);
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>
      `;

      this.shadowRoot.innerHTML = `
        ${styles}
        <div class="page">
          <div class="sidebar">
            ${this.renderContact()}
            ${this.renderLanguages()}
            ${this.renderSkills()}
          </div>
          <div class="main">
            ${this.renderHeader()}
            ${this.renderProfile()}
            ${this.renderExperience()}
            ${this.renderProjects()}
            ${this.renderAchievements()}
            ${this.renderEducation()}
            ${this.renderCertifications()}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-stone-v2')) {
    customElements.define('gqr-resume-stone-v2', GQRResumeStoneV2);
  }
})();