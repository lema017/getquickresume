(function() {
  'use strict';

  class GQRResumeOakV4 extends HTMLElement {
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
      return this._data || {};
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'language' && oldValue !== newValue) {
        this.render();
      }
    }

    getLanguage() {
      const attrLang = this.getAttribute('language');
      const dataLang = this._data && typeof this._data.language === 'string' ? this._data.language : '';
      const lang = (attrLang || dataLang || 'en').toLowerCase();
      return lang === 'es' ? 'es' : 'en';
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
      const date = new Date(raw);
      if (Number.isNaN(date.getTime())) return this.escapeHtml(raw);

      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };

      return `${months[lang][date.getMonth()]} ${date.getFullYear()}`;
    }

    formatDateRange(startDate, endDate, lang, options) {
      const i18n = this.getI18n(lang);
      const start = this.formatShortDate(startDate, lang);
      const end = options && options.usePresent
        ? i18n.present
        : this.formatShortDate(endDate, lang);

      if (start && end) return `${start} — ${end}`;
      return start || end || '';
    }

    getI18n(lang) {
      const dict = {
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
          experience: 'Experiencia',
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
      return dict[lang] || dict.en;
    }

    renderHeader(data) {
      const firstName = this.safeStr(data.firstName).trim();
      const lastName = this.safeStr(data.lastName).trim();
      const profession = this.safeStr(data.profession).trim();
      const name = [firstName, lastName].filter(Boolean).join(' ').trim();

      const contactItems = [
        data.email ? `✉ ${this.escapeHtml(data.email)}` : '',
        data.phone ? `☎ ${this.escapeHtml(data.phone)}` : '',
        data.country ? `⚲ ${this.escapeHtml(data.country)}` : '',
        data.linkedin ? `🔗 ${this.escapeHtml(data.linkedin)}` : ''
      ].filter(Boolean);

      if (!name && !profession && !contactItems.length) return '';

      return `
        <section class="header" data-section="header">
          <div class="header-top">
            ${name ? `<h1 class="name">${this.escapeHtml(name)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
          ${contactItems.length ? `
            <div class="contact-row" data-section="contact">
              ${contactItems.map((item, idx) => `
                <span class="contact-pill" data-entry-id="contact-${idx}">${item}</span>
              `).join('')}
            </div>
          ` : ''}
        </section>
      `;
    }

    renderProfile(summary, i18n) {
      const text = this.safeStr(summary).trim();
      if (!text) return '';
      return `
        <section class="section" data-section="profile">
          <h2 class="section-title">${this.escapeHtml(i18n.profile)}</h2>
          <div class="section-body">
            <p class="profile-text">${this.escapeHtml(text)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(skillsRaw, toolsRaw, i18n) {
      const merged = [...this.safeArr(skillsRaw), ...this.safeArr(toolsRaw)]
        .map(v => this.safeStr(v).trim())
        .filter(Boolean);

      const deduped = [];
      const seen = new Set();
      for (let i = 0; i < merged.length; i++) {
        const key = merged[i].toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          deduped.push(merged[i]);
        }
      }

      if (!deduped.length) return '';

      return `
        <section class="section" data-section="skills">
          <h2 class="section-title">${this.escapeHtml(i18n.skills)}</h2>
          <div class="section-body">
            <div class="chips">
              ${deduped.map((skill, idx) => `
                <span class="chip" data-entry-id="skill-${idx}">${this.escapeHtml(skill)}</span>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(experience, i18n, lang) {
      const items = this.safeArr(experience).filter(Boolean);
      if (!items.length) return '';

      const html = items.map((item, idx) => {
        const id = this.safeStr(item.id).trim() || `experience-${idx}`;
        const title = this.safeStr(item.title).trim();
        const company = this.safeStr(item.company).trim();
        const location = this.safeStr(item.location).trim();
        const range = this.formatDateRange(item.startDate, item.endDate, lang, {
          usePresent: !!item.isCurrent
        });

        const bullets = [...this.safeArr(item.achievements), ...this.safeArr(item.responsibilities)]
          .map(v => this.safeStr(v).trim())
          .filter(Boolean);

        const metaLine = [company, location].filter(Boolean).join(' · ');

        return `
          <article class="entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div>
                ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                ${metaLine ? `<div class="entry-subtitle">${this.escapeHtml(metaLine)}</div>` : ''}
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
      }).join('');

      return `
        <section class="section" data-section="experience">
          <h2 class="section-title">${this.escapeHtml(i18n.experience)}</h2>
          <div class="section-body">
            ${html}
          </div>
        </section>
      `;
    }

    renderProjects(projects, i18n) {
      const items = this.safeArr(projects).filter(Boolean);
      if (!items.length) return '';

      const html = items.map((item, idx) => {
        const id = this.safeStr(item.id).trim() || `project-${idx}`;
        const name = this.safeStr(item.name).trim();
        const description = this.safeStr(item.description).trim();
        const technologies = this.safeArr(item.technologies)
          .map(v => this.safeStr(v).trim())
          .filter(Boolean);
        const url = this.safeStr(item.url).trim();

        return `
          <article class="entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div>
                ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
              </div>
            </div>
            ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
            ${technologies.length ? `
              <div class="inline-tags">
                ${technologies.map(tech => `<span class="mini-tag">${this.escapeHtml(tech)}</span>`).join('')}
              </div>
            ` : ''}
          </article>
        `;
      }).join('');

      return `
        <section class="section" data-section="projects">
          <h2 class="section-title">${this.escapeHtml(i18n.projects)}</h2>
          <div class="section-body">
            ${html}
          </div>
        </section>
      `;
    }

    renderAchievements(achievements, i18n) {
      const items = this.safeArr(achievements).filter(Boolean);
      if (!items.length) return '';

      const html = items.map((item, idx) => {
        const id = this.safeStr(item.id).trim() || `achievement-${idx}`;
        const title = this.safeStr(item.title).trim();
        const description = this.safeStr(item.description).trim();
        const year = this.safeStr(item.year).trim();

        return `
          <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div>
                ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
              </div>
              ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
            </div>
            ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
          </article>
        `;
      }).join('');

      return `
        <section class="section" data-section="achievements">
          <h2 class="section-title">${this.escapeHtml(i18n.achievements)}</h2>
          <div class="section-body">
            ${html}
          </div>
        </section>
      `;
    }

    renderEducation(education, i18n, lang) {
      const items = this.safeArr(education).filter(Boolean);
      if (!items.length) return '';

      const html = items.map((item, idx) => {
        const id = this.safeStr(item.id).trim() || `education-${idx}`;
        const degree = this.safeStr(item.degree).trim();
        const field = this.safeStr(item.field).trim();
        const institution = this.safeStr(item.institution).trim();
        const gpa = this.safeStr(item.gpa).trim();
        const range = this.formatDateRange(item.startDate, item.endDate, lang, {
          usePresent: item.isCompleted === false
        });

        const title = [degree, field].filter(Boolean).join(' · ');

        return `
          <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div>
                ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
              </div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
            ${gpa ? `<p class="entry-text">GPA: ${this.escapeHtml(gpa)}</p>` : ''}
          </article>
        `;
      }).join('');

      return `
        <section class="section" data-section="education">
          <h2 class="section-title">${this.escapeHtml(i18n.education)}</h2>
          <div class="section-body">
            ${html}
          </div>
        </section>
      `;
    }

    renderCertifications(certifications, i18n, lang) {
      const items = this.safeArr(certifications).filter(Boolean);
      if (!items.length) return '';

      const html = items.map((item, idx) => {
        const id = this.safeStr(item.id).trim() || `certification-${idx}`;
        const name = this.safeStr(item.name).trim();
        const issuer = this.safeStr(item.issuer).trim();
        const date = this.formatShortDate(item.date, lang);

        return `
          <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div>
                ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
              </div>
              ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
            </div>
          </article>
        `;
      }).join('');

      return `
        <section class="section" data-section="certifications">
          <h2 class="section-title">${this.escapeHtml(i18n.certifications)}</h2>
          <div class="section-body">
            ${html}
          </div>
        </section>
      `;
    }

    renderLanguages(languages, i18n) {
      const items = this.safeArr(languages).filter(Boolean);
      if (!items.length) return '';

      const html = items.map((item, idx) => {
        const id = this.safeStr(item.id).trim() || `language-${idx}`;
        const name = this.safeStr(item.name).trim();
        const levelKey = this.safeStr(item.level).trim().toLowerCase();
        const level = i18n.levelMap[levelKey] || this.safeStr(item.level).trim();

        return `
          <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
            <span class="language-name">${this.escapeHtml(name)}</span>
            <span class="language-sep">—</span>
            <span class="language-level">${this.escapeHtml(level)}</span>
          </div>
        `;
      }).join('');

      return `
        <section class="section" data-section="languages">
          <h2 class="section-title">${this.escapeHtml(i18n.languages)}</h2>
          <div class="section-body">
            <div class="language-list">
              ${html}
            </div>
          </div>
        </section>
      `;
    }

    render() {
      const data = this.data || {};
      const lang = this.getLanguage();
      const i18n = this.getI18n(lang);

      const headerHtml = this.renderHeader(data);
      const profileHtml = this.renderProfile(data.summary, i18n);
      const skillsHtml = this.renderSkills(data.skillsRaw, data.toolsRaw, i18n);
      const experienceHtml = this.renderExperience(data.experience, i18n, lang);
      const projectsHtml = this.renderProjects(data.projects, i18n);
      const achievementsHtml = this.renderAchievements(data.achievements, i18n);
      const educationHtml = this.renderEducation(data.education, i18n, lang);
      const certificationsHtml = this.renderCertifications(data.certifications, i18n, lang);
      const languagesHtml = this.renderLanguages(data.languages, i18n);

      this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');

          :host {
            display: block;
            color: #1f2a2a;
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
            background: #fcfcfa;
            padding: 34px 36px 38px;
            font-family: 'Inter', Arial, sans-serif;
            color: #243131;
          }

          .header {
            background: linear-gradient(180deg, #9fb8b4 0%, #a8c0bc 100%);
            color: #ffffff;
            padding: 26px 28px 20px;
            border-radius: 0;
            margin-bottom: 24px;
            border-bottom: 5px solid #6f8f8b;
          }

          .header-top {
            display: block;
          }

          .name {
            margin: 0;
            font-family: 'Oswald', Arial, sans-serif;
            font-size: 36px;
            line-height: 1;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            font-weight: 600;
          }

          .profession {
            margin-top: 8px;
            font-family: 'Oswald', Arial, sans-serif;
            font-size: 16px;
            line-height: 1.2;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            opacity: 0.96;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 10px;
            margin-top: 16px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            padding: 7px 10px;
            background: rgba(255,255,255,0.18);
            border: 1px solid rgba(255,255,255,0.24);
            border-radius: 999px;
            font-size: 12px;
            line-height: 1.2;
            color: #ffffff;
          }

          .section {
            margin-bottom: 22px;
          }

          .section-title {
            margin: 0 0 12px;
            font-family: 'Oswald', Arial, sans-serif;
            font-size: 20px;
            line-height: 1;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            color: #304240;
            display: inline-block;
            padding-bottom: 5px;
            border-bottom: 4px solid #afc4c0;
          }

          .section-body {
            display: block;
          }

          .profile-text,
          .entry-text {
            margin: 0;
            font-size: 13px;
            line-height: 1.62;
            color: #2f3b3b;
          }

          .chips {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .chip {
            display: inline-block;
            padding: 8px 12px;
            border: 1px solid #cfdad8;
            background: #f3f7f6;
            color: #304240;
            border-radius: 999px;
            font-size: 12px;
            line-height: 1.2;
            font-weight: 500;
          }

          .entry {
            padding: 0 0 14px;
            margin-bottom: 14px;
            border-bottom: 1px solid #dde6e4;
          }

          .entry.compact {
            padding-bottom: 12px;
            margin-bottom: 12px;
          }

          .entry:last-child {
            margin-bottom: 0;
            border-bottom: none;
            padding-bottom: 0;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 6px;
          }

          .entry-title {
            margin: 0;
            font-size: 15px;
            line-height: 1.35;
            font-weight: 700;
            color: #1f2a2a;
          }

          .entry-subtitle {
            margin-top: 3px;
            font-size: 12px;
            line-height: 1.4;
            color: #6a7b7a;
            font-weight: 500;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 11px;
            line-height: 1.2;
            color: #4f6663;
            background: #edf3f2;
            border: 1px solid #d5e0de;
            padding: 5px 8px;
            border-radius: 999px;
            white-space: nowrap;
            margin-top: 1px;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 0 0 5px;
            font-size: 13px;
            line-height: 1.55;
            color: #2f3b3b;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .entry-link {
            margin-top: 4px;
            font-size: 12px;
            line-height: 1.4;
            color: #5c7d79;
            word-break: break-word;
          }

          .inline-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
          }

          .mini-tag {
            font-size: 11px;
            line-height: 1.2;
            padding: 5px 8px;
            border-radius: 999px;
            background: #eef4f3;
            color: #39504d;
            border: 1px solid #d7e2e0;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .language-item {
            font-size: 13px;
            line-height: 1.5;
            color: #2f3b3b;
          }

          .language-name {
            font-weight: 700;
            color: #233130;
          }

          .language-sep {
            margin: 0 6px;
            color: #7a8b89;
          }

          .language-level {
            color: #5a6f6c;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${headerHtml}
          ${profileHtml}
          ${skillsHtml}
          ${experienceHtml}
          ${projectsHtml}
          ${achievementsHtml}
          ${educationHtml}
          ${certificationsHtml}
          ${languagesHtml}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-oak-v4')) {
    customElements.define('gqr-resume-oak-v4', GQRResumeOakV4);
  }
})();