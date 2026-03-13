(function() {
  'use strict';

  class GQRResumeBlazeV2 extends HTMLElement {
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
      const lang = attrLang || dataLang || 'en';
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

    formatDateRange(startDate, endDate, options, lang, t) {
      const start = this.formatShortDate(startDate, lang);
      let end = '';

      if (options && options.type === 'education') {
        end = options.isCompleted === false ? t.present : this.formatShortDate(endDate, lang);
      } else {
        end = options && options.isCurrent ? t.present : this.formatShortDate(endDate, lang);
      }

      if (start && end) return `${start} — ${end}`;
      return start || end || '';
    }

    renderHeader(data) {
      const firstName = this.safeStr(data.firstName);
      const lastName = this.safeStr(data.lastName);
      const fullName = `${firstName} ${lastName}`.trim();
      const profession = this.safeStr(data.profession);
      const contactItems = [
        { label: '✉', value: this.safeStr(data.email) },
        { label: '☎', value: this.safeStr(data.phone) },
        { label: '⚲', value: this.safeStr(data.country) },
        { label: '🔗', value: this.safeStr(data.linkedin) }
      ].filter(item => item.value);

      if (!fullName && !profession && !contactItems.length) return '';

      return `
        <section class="header-block" data-section="header">
          <div class="header-inner">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
            ${contactItems.length ? `
              <div class="contact-row" data-section="contact">
                ${contactItems.map((item, index) => `
                  <div class="contact-item" data-entry-id="contact-${index}">
                    <span class="contact-icon">${this.escapeHtml(item.label)}</span>
                    <span class="contact-text">${this.escapeHtml(item.value)}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </section>
      `;
    }

    renderProfile(summary, t) {
      if (!this.safeStr(summary).trim()) return '';
      return `
        <section class="section" data-section="profile">
          <div class="section-title">${this.escapeHtml(t.profile)}</div>
          <div class="section-body">
            <p class="profile-text">${this.escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(skillsRaw, toolsRaw, t) {
      const merged = Array.from(new Set(
        [...this.safeArr(skillsRaw), ...this.safeArr(toolsRaw)]
          .map(v => this.safeStr(v).trim())
          .filter(Boolean)
      ));

      if (!merged.length) return '';

      return `
        <section class="section" data-section="skills">
          <div class="section-title">${this.escapeHtml(t.skills)}</div>
          <div class="section-body">
            <div class="skill-grid">
              ${merged.map((skill, index) => `
                <div class="skill-pill" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</div>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(experience, lang, t) {
      const items = this.safeArr(experience).filter(item => item && (item.title || item.company || item.location));
      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          <div class="section-title">${this.escapeHtml(t.experience)}</div>
          <div class="section-body">
            ${items.map((item, index) => {
              const bullets = [
                ...this.safeArr(item.achievements),
                ...this.safeArr(item.responsibilities)
              ].map(v => this.safeStr(v).trim()).filter(Boolean);

              const range = this.formatDateRange(
                item.startDate,
                item.endDate,
                { isCurrent: !!item.isCurrent, type: 'experience' },
                lang,
                t
              );

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || `experience-${index}`)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${item.title ? `<h3 class="entry-title">${this.escapeHtml(item.title)}</h3>` : ''}
                      <div class="entry-subline">
                        ${item.company ? `<span class="entry-company">${this.escapeHtml(item.company)}</span>` : ''}
                        ${item.location ? `<span class="entry-location">${this.escapeHtml(item.location)}</span>` : ''}
                      </div>
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

    renderProjects(projects, t) {
      const items = this.safeArr(projects).filter(item => item && (item.name || item.description));
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          <div class="section-title">${this.escapeHtml(t.projects)}</div>
          <div class="section-body">
            ${items.map((item, index) => {
              const technologies = this.safeArr(item.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || `project-${index}`)}">
                  <div class="entry-head stacked">
                    <div class="entry-main">
                      ${item.name ? `<h3 class="entry-title">${this.escapeHtml(item.name)}</h3>` : ''}
                      ${item.url ? `<div class="entry-link">${this.escapeHtml(item.url)}</div>` : ''}
                    </div>
                  </div>
                  ${item.description ? `<p class="entry-text">${this.escapeHtml(item.description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map((tech, techIndex) => `
                        <span class="tag" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || `project-${index}`)}-tech-${techIndex}">${this.escapeHtml(tech)}</span>
                      `).join('')}
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
      const items = this.safeArr(achievements).filter(item => item && (item.title || item.description || item.year));
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          <div class="section-title">${this.escapeHtml(t.achievements)}</div>
          <div class="section-body">
            ${items.map((item, index) => `
              <article class="entry compact" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || `achievement-${index}`)}">
                <div class="entry-head">
                  <div class="entry-main">
                    ${item.title ? `<h3 class="entry-title">${this.escapeHtml(item.title)}</h3>` : ''}
                  </div>
                  ${item.year ? `<div class="entry-date">${this.escapeHtml(this.safeStr(item.year))}</div>` : ''}
                </div>
                ${item.description ? `<p class="entry-text">${this.escapeHtml(item.description)}</p>` : ''}
              </article>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderEducation(education, lang, t) {
      const items = this.safeArr(education).filter(item => item && (item.degree || item.field || item.institution));
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          <div class="section-title">${this.escapeHtml(t.education)}</div>
          <div class="section-body">
            ${items.map((item, index) => {
              const range = this.formatDateRange(
                item.startDate,
                item.endDate,
                { isCompleted: item.isCompleted, type: 'education' },
                lang,
                t
              );

              const degreeField = [this.safeStr(item.degree), this.safeStr(item.field)].filter(Boolean).join(' — ');

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || `education-${index}`)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${degreeField ? `<h3 class="entry-title">${this.escapeHtml(degreeField)}</h3>` : ''}
                      ${item.institution ? `<div class="entry-subline"><span class="entry-company">${this.escapeHtml(item.institution)}</span></div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${item.gpa ? `<p class="entry-text">GPA: ${this.escapeHtml(this.safeStr(item.gpa))}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(certifications, lang, t) {
      const items = this.safeArr(certifications).filter(item => item && (item.name || item.issuer || item.date));
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          <div class="section-title">${this.escapeHtml(t.certifications)}</div>
          <div class="section-body">
            ${items.map((item, index) => `
              <article class="entry compact" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || `certification-${index}`)}">
                <div class="entry-head">
                  <div class="entry-main">
                    ${item.name ? `<h3 class="entry-title">${this.escapeHtml(item.name)}</h3>` : ''}
                    ${item.issuer ? `<div class="entry-subline"><span class="entry-company">${this.escapeHtml(item.issuer)}</span></div>` : ''}
                  </div>
                  ${item.date ? `<div class="entry-date">${this.escapeHtml(this.formatShortDate(item.date, lang))}</div>` : ''}
                </div>
              </article>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderLanguages(languages, t) {
      const items = this.safeArr(languages).filter(item => item && item.name);
      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          <div class="section-title">${this.escapeHtml(t.languages)}</div>
          <div class="section-body">
            <div class="language-list">
              ${items.map((item, index) => {
                const levelKey = this.safeStr(item.level).toLowerCase();
                const levelLabel = t.levelMap[levelKey] || this.safeStr(item.level);
                return `
                  <div class="language-item" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || `language-${index}`)}">
                    <span class="language-name">${this.escapeHtml(item.name)}</span>
                    <span class="language-sep">—</span>
                    <span class="language-level">${this.escapeHtml(levelLabel)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </section>
      `;
    }

    render() {
      const data = this._data || {};
      const lang = this.getLanguage();
      const i18n = this.getI18n();
      const t = i18n[lang];

      this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

          :host {
            display: block;
            color: #22252d;
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
            padding: 34px 36px 38px;
            background: #ffffff;
            font-family: 'Inter', Arial, sans-serif;
            color: #23262f;
            line-height: 1.45;
          }

          .header-block {
            background: linear-gradient(135deg, #232534 0%, #2f3245 100%);
            color: #ffffff;
            border-radius: 14px;
            padding: 26px 28px 22px;
            margin-bottom: 22px;
            position: relative;
            overflow: hidden;
          }

          .header-block::after {
            content: '';
            position: absolute;
            right: -28px;
            top: -28px;
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.06);
          }

          .header-inner {
            position: relative;
            z-index: 1;
          }

          .name {
            margin: 0;
            font-size: 30px;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            line-height: 1.1;
          }

          .profession {
            margin-top: 6px;
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #d8dbe6;
          }

          .contact-row {
            margin-top: 18px;
            display: flex;
            flex-wrap: wrap;
            gap: 10px 18px;
          }

          .contact-item {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 10px;
            border: 1px solid rgba(255, 255, 255, 0.14);
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.06);
            font-size: 11px;
            color: #f4f5f8;
          }

          .contact-icon {
            font-size: 11px;
            color: #f2c8a7;
          }

          .section {
            margin-top: 18px;
          }

          .section-title {
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 0 0 12px;
            color: #1f2330;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 0.2em;
            text-transform: uppercase;
          }

          .section-title::after {
            content: '';
            flex: 1;
            height: 1px;
            background: linear-gradient(90deg, #b9becb 0%, #e7e9ef 100%);
          }

          .section-body {
            padding-left: 2px;
          }

          .profile-text,
          .entry-text {
            margin: 0;
            font-size: 12px;
            color: #4b5160;
          }

          .skill-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-pill,
          .tag {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 6px 12px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.02em;
          }

          .skill-pill {
            background: #f3f4f8;
            color: #2a2f3d;
            border: 1px solid #d9dde6;
          }

          .tag {
            background: #fbf1ea;
            color: #9c5f39;
            border: 1px solid #efd8c8;
          }

          .entry {
            padding: 0 0 14px;
            margin-bottom: 14px;
            border-bottom: 1px solid #eceef3;
          }

          .entry:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }

          .entry.compact {
            padding-bottom: 12px;
            margin-bottom: 12px;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 14px;
            margin-bottom: 6px;
          }

          .entry-head.stacked {
            margin-bottom: 8px;
          }

          .entry-main {
            flex: 1;
            min-width: 0;
          }

          .entry-title {
            margin: 0;
            font-size: 14px;
            font-weight: 700;
            color: #202431;
            line-height: 1.25;
          }

          .entry-subline {
            margin-top: 3px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px 14px;
            font-size: 11px;
            color: #697082;
          }

          .entry-company {
            font-weight: 600;
            color: #3d4352;
          }

          .entry-location::before {
            content: '•';
            margin-right: 6px;
            color: #b07d5b;
          }

          .entry-date {
            white-space: nowrap;
            font-size: 11px;
            font-weight: 700;
            color: #8a5a3b;
            background: #fbf1ea;
            border: 1px solid #efd8c8;
            border-radius: 999px;
            padding: 4px 10px;
          }

          .entry-link {
            margin-top: 4px;
            font-size: 11px;
            color: #7a8193;
            word-break: break-word;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
            color: #4d5362;
          }

          .bullet-list li {
            margin: 0 0 5px;
            font-size: 12px;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .tag-row {
            margin-top: 8px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .language-item {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            color: #3f4554;
            padding-bottom: 8px;
            border-bottom: 1px solid #eceef3;
          }

          .language-item:last-child {
            padding-bottom: 0;
            border-bottom: none;
          }

          .language-name {
            font-weight: 700;
            color: #222733;
          }

          .language-level {
            color: #8a5a3b;
            font-weight: 600;
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
          ${this.renderExperience(data.experience, lang, t)}
          ${this.renderProjects(data.projects, t)}
          ${this.renderAchievements(data.achievements, t)}
          ${this.renderEducation(data.education, lang, t)}
          ${this.renderCertifications(data.certifications, lang, t)}
          ${this.renderLanguages(data.languages, t)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-blaze-v2')) {
    customElements.define('gqr-resume-blaze-v2', GQRResumeBlazeV2);
  }
})();