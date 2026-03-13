(function() {
  'use strict';

  class GQRResumeCliffV1 extends HTMLElement {
    static get observedAttributes() {
      return ['language'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._data = {};
    }

    set data(value) {
      this._data = value && typeof value === 'object' ? value : {};
      this.render();
    }

    get data() {
      return this._data;
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'language' && oldValue !== newValue) {
        this.render();
      }
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

    getLanguage() {
      const attrLang = this.getAttribute('language');
      const dataLang = this._data && this._data.language;
      const lang = (attrLang || dataLang || 'en').toLowerCase();
      return lang === 'es' ? 'es' : 'en';
    }

    getI18n() {
      return {
        en: {
          profile: 'Profile',
          experience: 'Work Experience',
          education: 'Education',
          projects: 'Projects',
          certifications: 'Certifications',
          languages: 'Languages',
          achievements: 'Achievements',
          skills: 'Skills',
          present: 'Present',
          levelMap: {
            basic: 'Basic',
            intermediate: 'Intermediate',
            advanced: 'Advanced',
            native: 'Native'
          }
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
          present: 'Presente',
          levelMap: {
            basic: 'Básico',
            intermediate: 'Intermedio',
            advanced: 'Avanzado',
            native: 'Nativo'
          }
        }
      };
    }

    formatShortDate(value, lang) {
      if (!value) return '';
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return this.escapeHtml(this.safeStr(value));

      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      return months[d.getMonth()] + ' ' + d.getFullYear();
    }

    formatDateRange(startDate, endDate, lang, opts) {
      const options = opts || {};
      const start = this.formatShortDate(startDate, lang);
      let end = '';

      if (options.type === 'education') {
        if (options.isCompleted === false) {
          end = this.getI18n()[lang].present;
        } else {
          end = this.formatShortDate(endDate, lang);
        }
      } else {
        if (options.isCurrent) {
          end = this.getI18n()[lang].present;
        } else {
          end = this.formatShortDate(endDate, lang);
        }
      }

      if (start && end) return start + ' — ' + end;
      return start || end || '';
    }

    renderHeader(data) {
      const firstName = this.safeStr(data.firstName);
      const lastName = this.safeStr(data.lastName);
      const profession = this.safeStr(data.profession);
      const email = this.safeStr(data.email);
      const phone = this.safeStr(data.phone);
      const country = this.safeStr(data.country);
      const linkedin = this.safeStr(data.linkedin);

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      const contactItems = [
        email ? `<span class="contact-pill">✉ ${this.escapeHtml(email)}</span>` : '',
        phone ? `<span class="contact-pill">☎ ${this.escapeHtml(phone)}</span>` : '',
        country ? `<span class="contact-pill">⚲ ${this.escapeHtml(country)}</span>` : '',
        linkedin ? `<span class="contact-pill">🔗 ${this.escapeHtml(linkedin)}</span>` : ''
      ].filter(Boolean).join('');

      if (!fullName && !profession && !contactItems) return '';

      return `
        <section class="header-block" data-section="header">
          <div class="header-top">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
          ${contactItems ? `
            <div class="contact-row" data-section="contact">
              ${contactItems}
            </div>
          ` : ''}
        </section>
      `;
    }

    renderProfile(summary, t) {
      const text = this.safeStr(summary).trim();
      if (!text) return '';
      return `
        <section class="section" data-section="profile">
          <div class="section-title">${this.escapeHtml(t.profile)}</div>
          <div class="profile-text">${this.escapeHtml(text)}</div>
        </section>
      `;
    }

    renderSkills(skillsRaw, toolsRaw, t) {
      const merged = [...this.safeArr(skillsRaw), ...this.safeArr(toolsRaw)]
        .map((v) => this.safeStr(v).trim())
        .filter(Boolean);

      const unique = [];
      const seen = new Set();

      for (let i = 0; i < merged.length; i++) {
        const key = merged[i].toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(merged[i]);
        }
      }

      if (!unique.length) return '';

      return `
        <section class="section" data-section="skills">
          <div class="section-title">${this.escapeHtml(t.skills)}</div>
          <div class="chip-list">
            ${unique.map((item, index) => `
              <span class="chip" data-entry-id="skill-${index}">${this.escapeHtml(item)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderExperience(experience, t, lang) {
      const items = this.safeArr(experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          <div class="section-title">${this.escapeHtml(t.experience)}</div>
          <div class="stack">
            ${items.map((item, index) => {
              const title = this.safeStr(item.title);
              const company = this.safeStr(item.company);
              const location = this.safeStr(item.location);
              const range = this.formatDateRange(item.startDate, item.endDate, lang, {
                isCurrent: !!item.isCurrent
              });

              const bullets = [
                ...this.safeArr(item.achievements),
                ...this.safeArr(item.responsibilities)
              ].map((b) => this.safeStr(b).trim()).filter(Boolean);

              if (!title && !company && !location && !range && !bullets.length) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id || ('exp-' + index)))}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${this.escapeHtml([company, location].filter(Boolean).join(' · '))}
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
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjects(projects, t) {
      const items = this.safeArr(projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          <div class="section-title">${this.escapeHtml(t.projects)}</div>
          <div class="stack">
            ${items.map((item, index) => {
              const name = this.safeStr(item.name);
              const description = this.safeStr(item.description);
              const technologies = this.safeArr(item.technologies).map((x) => this.safeStr(x).trim()).filter(Boolean);
              const url = this.safeStr(item.url);

              if (!name && !description && !technologies.length && !url) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id || ('project-' + index)))}">
                  ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `
                    <div class="meta-line">
                      <span class="meta-label">Tech:</span>
                      <span>${this.escapeHtml(technologies.join(', '))}</span>
                    </div>
                  ` : ''}
                  ${url ? `
                    <div class="meta-line">
                      <span class="meta-label">URL:</span>
                      <span>${this.escapeHtml(url)}</span>
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements(achievements, t) {
      const items = this.safeArr(achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          <div class="section-title">${this.escapeHtml(t.achievements)}</div>
          <div class="stack">
            ${items.map((item, index) => {
              const title = this.safeStr(item.title);
              const description = this.safeStr(item.description);
              const year = this.safeStr(item.year);

              if (!title && !description && !year) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id || ('achievement-' + index)))}">
                  <div class="entry-head">
                    <div class="entry-main">
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

    renderEducation(education, t, lang) {
      const items = this.safeArr(education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          <div class="section-title">${this.escapeHtml(t.education)}</div>
          <div class="stack">
            ${items.map((item, index) => {
              const degree = this.safeStr(item.degree);
              const field = this.safeStr(item.field);
              const institution = this.safeStr(item.institution);
              const gpa = this.safeStr(item.gpa);
              const range = this.formatDateRange(item.startDate, item.endDate, lang, {
                type: 'education',
                isCompleted: item.isCompleted
              });

              if (!degree && !field && !institution && !gpa && !range) return '';

              const titleLine = [degree, field].filter(Boolean).join(' — ');

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id || ('education-' + index)))}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${titleLine ? `<div class="entry-title">${this.escapeHtml(titleLine)}</div>` : ''}
                      ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${gpa ? `<div class="entry-text">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(certifications, t, lang) {
      const items = this.safeArr(certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          <div class="section-title">${this.escapeHtml(t.certifications)}</div>
          <div class="stack">
            ${items.map((item, index) => {
              const name = this.safeStr(item.name);
              const issuer = this.safeStr(item.issuer);
              const date = item.date ? this.formatShortDate(item.date, lang) : '';

              if (!name && !issuer && !date) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id || ('cert-' + index)))}">
                  <div class="entry-head">
                    <div class="entry-main">
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

    renderLanguages(languages, t) {
      const items = this.safeArr(languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          <div class="section-title">${this.escapeHtml(t.languages)}</div>
          <div class="stack compact">
            ${items.map((item, index) => {
              const name = this.safeStr(item.name);
              const levelKey = this.safeStr(item.level).toLowerCase();
              const level = t.levelMap[levelKey] || this.safeStr(item.level);

              if (!name && !level) return '';

              return `
                <article class="language-row" data-entry-id="${this.escapeHtml(this.safeStr(item.id || ('lang-' + index)))}">
                  <span class="language-name">${this.escapeHtml(name)}</span>
                  <span class="language-sep">—</span>
                  <span class="language-level">${this.escapeHtml(level)}</span>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    render() {
      const data = this._data || {};
      const lang = this.getLanguage();
      const t = this.getI18n()[lang];

      const html = `
        <style>
          :host {
            display: block;
            color: #111827;
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
            background: #fcfbf7;
            color: #111827;
            font-family: Arial, Helvetica, sans-serif;
            padding: 34px 36px 38px;
            position: relative;
          }

          .page::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 14px;
            background:
              linear-gradient(90deg, #0b1020 0%, #0b1020 72%, #d8c9a7 72%, #d8c9a7 100%);
          }

          .header-block {
            background: #0b1020;
            color: #f8f5ee;
            padding: 24px 24px 18px;
            margin-top: 10px;
            border-left: 8px solid #d8c9a7;
          }

          .header-top {
            display: block;
          }

          .name {
            margin: 0;
            font-size: 31px;
            line-height: 1.05;
            font-weight: 800;
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 8px;
            font-size: 13.5px;
            line-height: 1.4;
            color: #d8c9a7;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 16px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(216, 201, 167, 0.45);
            color: #f8f5ee;
            border-radius: 999px;
            padding: 6px 10px;
            font-size: 11.5px;
            line-height: 1.2;
          }

          .section {
            margin-top: 24px;
          }

          .section-title {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            font-weight: 800;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #0b1020;
            margin-bottom: 12px;
          }

          .section-title::before {
            content: "";
            width: 16px;
            height: 16px;
            background: #0b1020;
            border: 3px solid #d8c9a7;
            flex: 0 0 16px;
          }

          .section-title::after {
            content: "";
            height: 1px;
            background: linear-gradient(90deg, #0b1020 0%, #d8c9a7 100%);
            flex: 1;
          }

          .profile-text,
          .entry-text,
          .entry-subtitle,
          .bullet-list,
          .meta-line,
          .language-row {
            font-size: 12.5px;
            line-height: 1.6;
            color: #1f2937;
          }

          .profile-text {
            margin-top: 2px;
          }

          .chip-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .chip {
            display: inline-block;
            padding: 7px 11px;
            border-radius: 999px;
            background: #f2ede2;
            border: 1px solid #d8c9a7;
            color: #0b1020;
            font-size: 11.5px;
            font-weight: 700;
            line-height: 1.2;
          }

          .stack {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .stack.compact {
            gap: 8px;
          }

          .entry {
            border-left: 3px solid #d8c9a7;
            padding-left: 14px;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            font-size: 14px;
            line-height: 1.35;
            font-weight: 800;
            color: #0b1020;
          }

          .entry-subtitle {
            margin-top: 2px;
            color: #4b5563;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 11.5px;
            line-height: 1.3;
            color: #6b7280;
            font-weight: 700;
            white-space: nowrap;
            background: #f4f1e8;
            border: 1px solid #e0d4bc;
            padding: 4px 8px;
          }

          .entry-text {
            margin-top: 6px;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 3px 0;
          }

          .meta-line {
            margin-top: 5px;
          }

          .meta-label {
            font-weight: 700;
            color: #0b1020;
          }

          .language-row {
            display: flex;
            align-items: baseline;
            gap: 6px;
            border-left: 3px solid #d8c9a7;
            padding-left: 12px;
          }

          .language-name {
            font-weight: 800;
            color: #0b1020;
          }

          .language-sep {
            color: #6b7280;
          }

          .language-level {
            color: #374151;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${this.renderHeader(data)}
          ${this.renderProfile(data.summary, t)}
          ${this.renderSkills(data.skillsRaw, data.toolsRaw, t)}
          ${this.renderExperience(data.experience, t, lang)}
          ${this.renderProjects(data.projects, t)}
          ${this.renderAchievements(data.achievements, t)}
          ${this.renderEducation(data.education, t, lang)}
          ${this.renderCertifications(data.certifications, t, lang)}
          ${this.renderLanguages(data.languages, t)}
        </div>
      `;

      this.shadowRoot.innerHTML = html;
    }
  }

  if (!customElements.get('gqr-resume-cliff-v1')) {
    customElements.define('gqr-resume-cliff-v1', GQRResumeCliffV1);
  }
})();