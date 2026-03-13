(function() {
  'use strict';

  class GQRResumeOakV5 extends HTMLElement {
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

    getLanguage() {
      const attrLang = this.getAttribute('language');
      const dataLang = this._data && this._data.language;
      const lang = attrLang || dataLang || 'en';
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
      if (!value) return '';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return this.escapeHtml(this.safeStr(value));

      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };

      return `${months[lang][date.getMonth()]} ${date.getFullYear()}`;
    }

    formatDateRange(startDate, endDate, lang, options) {
      const i18n = this.getI18n(lang);
      const opts = options || {};
      const start = this.formatShortDate(startDate, lang);
      let end = '';

      if (opts.usePresent) {
        const isCurrent = !!opts.isCurrent;
        const isCompleted = opts.isCompleted;
        if (isCurrent || isCompleted === false) {
          end = i18n.present;
        } else {
          end = this.formatShortDate(endDate, lang);
        }
      } else {
        end = this.formatShortDate(endDate, lang);
      }

      if (start && end) return `${start} — ${end}`;
      return start || end || '';
    }

    getI18n(lang) {
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
          experience: 'Experiencia',
          education: 'Estudios',
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
      }[lang];
    }

    renderHeader(d) {
      const firstName = this.safeStr(d.firstName);
      const lastName = this.safeStr(d.lastName);
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      const profession = this.safeStr(d.profession);

      const contacts = [
        d.email ? `✉ ${this.escapeHtml(d.email)}` : '',
        d.phone ? `☎ ${this.escapeHtml(d.phone)}` : '',
        d.country ? `⚲ ${this.escapeHtml(d.country)}` : '',
        d.linkedin ? `🔗 ${this.escapeHtml(d.linkedin)}` : ''
      ].filter(Boolean);

      const hasHeader = fullName || profession || contacts.length;
      if (!hasHeader) return '';

      return `
        <section class="header" data-section="header">
          <div class="header-inner">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
            ${contacts.length ? `
              <div class="contact-list" data-section="contact">
                ${contacts.map((item, idx) => `<div class="contact-pill" data-entry-id="contact-${idx}">${item}</div>`).join('')}
              </div>
            ` : ''}
          </div>
        </section>
      `;
    }

    renderProfile(summary, i18n) {
      const text = this.safeStr(summary).trim();
      if (!text) return '';

      return `
        <section class="section" data-section="profile">
          <div class="section-title">${this.escapeHtml(i18n.profile)}</div>
          <div class="profile-text">${this.escapeHtml(text)}</div>
        </section>
      `;
    }

    renderSkills(skillsRaw, toolsRaw, i18n) {
      const merged = [...this.safeArr(skillsRaw), ...this.safeArr(toolsRaw)]
        .map(v => this.safeStr(v).trim())
        .filter(Boolean);

      const seen = new Set();
      const unique = merged.filter(item => {
        const key = item.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      if (!unique.length) return '';

      return `
        <section class="section" data-section="skills">
          <div class="section-title">${this.escapeHtml(i18n.skills)}</div>
          <div class="skills-grid">
            ${unique.map((skill, idx) => `
              <div class="skill-chip" data-entry-id="skill-${idx}">${this.escapeHtml(skill)}</div>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderExperience(experience, i18n, lang) {
      const items = this.safeArr(experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          <div class="section-title">${this.escapeHtml(i18n.experience)}</div>
          <div class="timeline-list">
            ${items.map((item, idx) => {
              const id = this.safeStr(item.id) || `experience-${idx}`;
              const title = this.safeStr(item.title);
              const company = this.safeStr(item.company);
              const location = this.safeStr(item.location);
              const meta = [company, location].filter(Boolean).join(' · ');
              const range = this.formatDateRange(item.startDate, item.endDate, lang, {
                usePresent: true,
                isCurrent: item.isCurrent
              });

              const bullets = [...this.safeArr(item.achievements), ...this.safeArr(item.responsibilities)]
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                      ${meta ? `<div class="entry-subtitle">${this.escapeHtml(meta)}</div>` : ''}
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
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjects(projects, i18n) {
      const items = this.safeArr(projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          <div class="section-title">${this.escapeHtml(i18n.projects)}</div>
          <div class="stack-list">
            ${items.map((item, idx) => {
              const id = this.safeStr(item.id) || `project-${idx}`;
              const name = this.safeStr(item.name);
              const description = this.safeStr(item.description);
              const technologies = this.safeArr(item.technologies)
                .map(t => this.safeStr(t).trim())
                .filter(Boolean);
              const url = this.safeStr(item.url);

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `<div class="entry-tags">${technologies.map(t => `<span class="mini-tag">${this.escapeHtml(t)}</span>`).join('')}</div>` : ''}
                  ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements(achievements, i18n) {
      const items = this.safeArr(achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          <div class="section-title">${this.escapeHtml(i18n.achievements)}</div>
          <div class="stack-list">
            ${items.map((item, idx) => {
              const id = this.safeStr(item.id) || `achievement-${idx}`;
              const title = this.safeStr(item.title);
              const description = this.safeStr(item.description);
              const year = this.safeStr(item.year);

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : '<div></div>'}
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

    renderEducation(education, i18n, lang) {
      const items = this.safeArr(education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          <div class="section-title">${this.escapeHtml(i18n.education)}</div>
          <div class="timeline-list">
            ${items.map((item, idx) => {
              const id = this.safeStr(item.id) || `education-${idx}`;
              const degree = this.safeStr(item.degree);
              const field = this.safeStr(item.field);
              const institution = this.safeStr(item.institution);
              const gpa = this.safeStr(item.gpa);
              const title = [degree, field].filter(Boolean).join(' — ');
              const range = this.formatDateRange(item.startDate, item.endDate, lang, {
                usePresent: true,
                isCompleted: item.isCompleted
              });

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
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

    renderCertifications(certifications, i18n, lang) {
      const items = this.safeArr(certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          <div class="section-title">${this.escapeHtml(i18n.certifications)}</div>
          <div class="stack-list">
            ${items.map((item, idx) => {
              const id = this.safeStr(item.id) || `certification-${idx}`;
              const name = this.safeStr(item.name);
              const issuer = this.safeStr(item.issuer);
              const date = this.formatShortDate(item.date, lang);

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
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

    renderLanguages(languages, i18n) {
      const items = this.safeArr(languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          <div class="section-title">${this.escapeHtml(i18n.languages)}</div>
          <div class="language-list">
            ${items.map((item, idx) => {
              const id = this.safeStr(item.id) || `language-${idx}`;
              const name = this.safeStr(item.name);
              const levelKey = this.safeStr(item.level).toLowerCase();
              const level = i18n.levelMap[levelKey] || this.safeStr(item.level);
              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                  <span class="language-name">${this.escapeHtml(name)}</span>
                  <span class="language-sep">—</span>
                  <span class="language-level">${this.escapeHtml(level)}</span>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    render() {
      const d = this._data || {};
      const lang = this.getLanguage();
      const i18n = this.getI18n(lang);

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #213031;
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
            background: #ffffff;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            color: #263536;
            line-height: 1.45;
          }

          .header {
            background: linear-gradient(180deg, #a9bebe 0%, #9db5b5 100%);
            color: #ffffff;
            padding: 34px 40px 26px;
            border-bottom: 6px solid #7f9e9d;
          }

          .header-inner {
            display: block;
          }

          .name {
            margin: 0;
            font-size: 34px;
            line-height: 1;
            font-weight: 800;
            letter-spacing: 0.8px;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 10px;
            font-size: 15px;
            font-style: italic;
            font-weight: 700;
            letter-spacing: 0.4px;
            text-transform: uppercase;
            opacity: 0.98;
          }

          .contact-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 18px;
          }

          .contact-pill {
            background: rgba(255, 255, 255, 0.18);
            border: 1px solid rgba(255, 255, 255, 0.32);
            color: #ffffff;
            padding: 6px 10px;
            border-radius: 999px;
            font-size: 11px;
            letter-spacing: 0.2px;
          }

          .content {
            padding: 26px 40px 34px;
          }

          .section {
            margin-top: 18px;
          }

          .section:first-child {
            margin-top: 0;
          }

          .section-title {
            position: relative;
            margin: 0 0 12px 0;
            padding-bottom: 6px;
            font-size: 18px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #2f4748;
          }

          .section-title::after {
            content: "";
            display: block;
            width: 64px;
            height: 4px;
            background: #9db5b5;
            margin-top: 6px;
          }

          .profile-text,
          .entry-text {
            font-size: 13px;
            color: #354445;
          }

          .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-chip,
          .mini-tag {
            display: inline-block;
            background: #eef4f4;
            border: 1px solid #c9d8d7;
            color: #2c4041;
            padding: 6px 10px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.2px;
            text-transform: uppercase;
          }

          .timeline-list,
          .stack-list {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            position: relative;
            padding-left: 16px;
            border-left: 2px solid #d7e2e1;
          }

          .entry::before {
            content: "";
            position: absolute;
            left: -5px;
            top: 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #8ea9a8;
          }

          .entry.compact {
            padding-left: 14px;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
          }

          .entry-title {
            font-size: 15px;
            font-weight: 800;
            color: #223334;
          }

          .entry-subtitle {
            margin-top: 2px;
            font-size: 12px;
            color: #6c7f80;
            font-weight: 700;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 11px;
            color: #6a7c7d;
            font-weight: 700;
            text-transform: uppercase;
            white-space: nowrap;
            letter-spacing: 0.3px;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 4px 0;
            font-size: 12.5px;
            color: #354445;
          }

          .entry-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
          }

          .entry-link {
            margin-top: 8px;
            font-size: 11px;
            color: #587677;
            word-break: break-word;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .language-item {
            display: flex;
            align-items: baseline;
            gap: 8px;
            font-size: 13px;
          }

          .language-name {
            font-weight: 800;
            color: #263536;
          }

          .language-sep,
          .language-level {
            color: #5c7172;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${this.renderHeader(d)}
          <div class="content">
            ${this.renderProfile(d.summary, i18n)}
            ${this.renderSkills(d.skillsRaw, d.toolsRaw, i18n)}
            ${this.renderExperience(d.experience, i18n, lang)}
            ${this.renderProjects(d.projects, i18n)}
            ${this.renderAchievements(d.achievements, i18n)}
            ${this.renderEducation(d.education, i18n, lang)}
            ${this.renderCertifications(d.certifications, i18n, lang)}
            ${this.renderLanguages(d.languages, i18n)}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-oak-v5')) {
    customElements.define('gqr-resume-oak-v5', GQRResumeOakV5);
  }
})();