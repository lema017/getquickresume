(function() {
  'use strict';

  class GQRResumeFlareV1 extends HTMLElement {
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
      };
    }

    formatShortDate(value, lang) {
      if (!value) return '';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return this.escapeHtml(value);

      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      return months[date.getMonth()] + ' ' + date.getFullYear();
    }

    formatDateRange(startDate, endDate, lang, options) {
      const opts = options || {};
      const start = this.formatShortDate(startDate, lang);
      let end = '';

      if (opts.type === 'education') {
        if (opts.isCompleted === false) {
          end = this.getI18n()[lang].present;
        } else {
          end = this.formatShortDate(endDate, lang);
        }
      } else {
        if (opts.isCurrent) {
          end = this.getI18n()[lang].present;
        } else {
          end = this.formatShortDate(endDate, lang);
        }
      }

      if (start && end) return start + ' — ' + end;
      return start || end || '';
    }

    renderSectionTitle(title) {
      return '<div class="section-title"><span>' + this.escapeHtml(title) + '</span></div>';
    }

    render() {
      const data = this._data || {};
      const lang = this.getLanguage();
      const i18n = this.getI18n()[lang];

      const firstName = this.safeStr(data.firstName);
      const lastName = this.safeStr(data.lastName);
      const profession = this.safeStr(data.profession);
      const email = this.safeStr(data.email);
      const phone = this.safeStr(data.phone);
      const country = this.safeStr(data.country);
      const linkedin = this.safeStr(data.linkedin);
      const summary = this.safeStr(data.summary);

      const skillsRaw = this.safeArr(data.skillsRaw);
      const toolsRaw = this.safeArr(data.toolsRaw);

      const experience = this.safeArr(data.experience);
      const projects = this.safeArr(data.projects);
      const achievements = this.safeArr(data.achievements);
      const education = this.safeArr(data.education);
      const certifications = this.safeArr(data.certifications);
      const languages = this.safeArr(data.languages);

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      const contacts = [
        email ? { label: '✉', value: email, href: 'mailto:' + email } : null,
        phone ? { label: '☎', value: phone, href: 'tel:' + phone } : null,
        country ? { label: '⚲', value: country } : null,
        linkedin ? {
          label: '🔗',
          value: linkedin,
          href: /^https?:\/\//i.test(linkedin) ? linkedin : 'https://' + linkedin
        } : null
      ].filter(Boolean);

      const mergedSkills = Array.from(
        new Set(
          skillsRaw
            .concat(toolsRaw)
            .map((s) => this.safeStr(s).trim())
            .filter(Boolean)
        )
      );

      const headerHtml = (fullName || profession || contacts.length)
        ? `
          <section class="header" data-section="header">
            <div class="header-band">
              ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
              ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
            </div>
            ${contacts.length ? `
              <div class="contact-row" data-section="contact">
                ${contacts.map((item, idx) => `
                  <div class="contact-pill" data-entry-id="contact-${idx}">
                    <span class="contact-icon">${this.escapeHtml(item.label)}</span>
                    ${item.href
                      ? `<a href="${this.escapeHtml(item.href)}" target="_blank" rel="noreferrer noopener">${this.escapeHtml(item.value)}</a>`
                      : `<span>${this.escapeHtml(item.value)}</span>`
                    }
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </section>
        `
        : '';

      const profileHtml = summary
        ? `
          <section class="section" data-section="profile">
            ${this.renderSectionTitle(i18n.profile)}
            <div class="profile-text">${this.escapeHtml(summary)}</div>
          </section>
        `
        : '';

      const skillsHtml = mergedSkills.length
        ? `
          <section class="section" data-section="skills">
            ${this.renderSectionTitle(i18n.skills)}
            <div class="skills-grid">
              ${mergedSkills.map((skill, idx) => `
                <div class="skill-chip" data-entry-id="skill-${idx}">${this.escapeHtml(skill)}</div>
              `).join('')}
            </div>
          </section>
        `
        : '';

      const experienceHtml = experience.length
        ? `
          <section class="section" data-section="experience">
            ${this.renderSectionTitle(i18n.experience)}
            <div class="stack">
              ${experience.map((item, idx) => {
                const bullets = this.safeArr(item.achievements).concat(this.safeArr(item.responsibilities))
                  .map((b) => this.safeStr(b).trim())
                  .filter(Boolean);

                const range = this.formatDateRange(item.startDate, item.endDate, lang, {
                  isCurrent: !!item.isCurrent
                });

                return `
                  <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || ('experience-' + idx))}">
                    <div class="entry-top">
                      <div>
                        ${item.title ? `<h3 class="entry-title">${this.escapeHtml(item.title)}</h3>` : ''}
                        <div class="entry-meta">
                          ${[item.company, item.location].map((v) => this.safeStr(v).trim()).filter(Boolean).map(this.escapeHtml.bind(this)).join(' · ')}
                        </div>
                      </div>
                      ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
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
        `
        : '';

      const projectsHtml = projects.length
        ? `
          <section class="section" data-section="projects">
            ${this.renderSectionTitle(i18n.projects)}
            <div class="stack">
              ${projects.map((item, idx) => `
                <article class="entry compact" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || ('project-' + idx))}">
                  <div class="entry-top">
                    <div>
                      ${item.name ? `<h3 class="entry-title">${this.escapeHtml(item.name)}</h3>` : ''}
                      ${item.description ? `<div class="entry-copy">${this.escapeHtml(item.description)}</div>` : ''}
                      ${this.safeArr(item.technologies).filter(Boolean).length ? `
                        <div class="tag-row">
                          ${this.safeArr(item.technologies).filter(Boolean).map((tech, techIdx) => `
                            <span class="mini-tag" data-entry-id="project-tech-${idx}-${techIdx}">${this.escapeHtml(tech)}</span>
                          `).join('')}
                        </div>
                      ` : ''}
                    </div>
                    ${item.url ? `
                      <div class="entry-link">
                        <a href="${this.escapeHtml(/^https?:\/\//i.test(this.safeStr(item.url)) ? item.url : 'https://' + item.url)}" target="_blank" rel="noreferrer noopener">
                          ${this.escapeHtml(item.url)}
                        </a>
                      </div>
                    ` : ''}
                  </div>
                </article>
              `).join('')}
            </div>
          </section>
        `
        : '';

      const achievementsHtml = achievements.length
        ? `
          <section class="section" data-section="achievements">
            ${this.renderSectionTitle(i18n.achievements)}
            <div class="stack">
              ${achievements.map((item, idx) => `
                <article class="entry compact" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || ('achievement-' + idx))}">
                  <div class="entry-top">
                    <div>
                      ${item.title ? `<h3 class="entry-title">${this.escapeHtml(item.title)}</h3>` : ''}
                      ${item.description ? `<div class="entry-copy">${this.escapeHtml(item.description)}</div>` : ''}
                    </div>
                    ${item.year ? `<div class="entry-date">${this.escapeHtml(item.year)}</div>` : ''}
                  </div>
                </article>
              `).join('')}
            </div>
          </section>
        `
        : '';

      const educationHtml = education.length
        ? `
          <section class="section" data-section="education">
            ${this.renderSectionTitle(i18n.education)}
            <div class="stack">
              ${education.map((item, idx) => {
                const range = this.formatDateRange(item.startDate, item.endDate, lang, {
                  type: 'education',
                  isCompleted: item.isCompleted
                });

                const titleParts = [this.safeStr(item.degree), this.safeStr(item.field)].filter(Boolean);
                const metaParts = [this.safeStr(item.institution)];
                if (this.safeStr(item.gpa)) metaParts.push('GPA: ' + this.safeStr(item.gpa));

                return `
                  <article class="entry compact" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || ('education-' + idx))}">
                    <div class="entry-top">
                      <div>
                        ${titleParts.length ? `<h3 class="entry-title">${this.escapeHtml(titleParts.join(' · '))}</h3>` : ''}
                        ${metaParts.filter(Boolean).length ? `<div class="entry-meta">${metaParts.map(this.escapeHtml.bind(this)).join(' · ')}</div>` : ''}
                      </div>
                      ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                    </div>
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      const certificationsHtml = certifications.length
        ? `
          <section class="section" data-section="certifications">
            ${this.renderSectionTitle(i18n.certifications)}
            <div class="stack">
              ${certifications.map((item, idx) => `
                <article class="entry compact" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || ('certification-' + idx))}">
                  <div class="entry-top">
                    <div>
                      ${item.name ? `<h3 class="entry-title">${this.escapeHtml(item.name)}</h3>` : ''}
                      ${item.issuer ? `<div class="entry-meta">${this.escapeHtml(item.issuer)}</div>` : ''}
                    </div>
                    ${item.date ? `<div class="entry-date">${this.escapeHtml(this.formatShortDate(item.date, lang))}</div>` : ''}
                  </div>
                </article>
              `).join('')}
            </div>
          </section>
        `
        : '';

      const languagesHtml = languages.length
        ? `
          <section class="section" data-section="languages">
            ${this.renderSectionTitle(i18n.languages)}
            <div class="language-list">
              ${languages.map((item, idx) => {
                const levelKey = this.safeStr(item.level).toLowerCase();
                const translatedLevel = i18n.levelMap[levelKey] || this.safeStr(item.level);
                return `
                  <div class="language-item" data-entry-id="${this.escapeHtml(this.safeStr(item.id) || ('language-' + idx))}">
                    <span class="language-name">${this.escapeHtml(item.name)}</span>
                    <span class="language-sep">—</span>
                    <span class="language-level">${this.escapeHtml(translatedLevel)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #243233;
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
            padding: 34px 34px 38px;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.45;
          }

          .header {
            margin-bottom: 22px;
          }

          .header-band {
            background: #aebfc0;
            color: #ffffff;
            padding: 28px 26px 22px;
            border-radius: 0;
          }

          .name {
            margin: 0;
            font-size: 34px;
            line-height: 1.02;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            font-weight: 800;
          }

          .profession {
            margin-top: 8px;
            font-size: 15px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 700;
            opacity: 0.95;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            padding-top: 14px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #eef2f1;
            border: 1px solid #d7dfde;
            color: #2d3e3e;
            padding: 7px 11px;
            font-size: 12px;
            min-height: 32px;
          }

          .contact-pill a,
          .entry-link a {
            color: inherit;
            text-decoration: none;
            word-break: break-word;
          }

          .contact-icon {
            color: #5f7d7e;
            font-weight: 700;
          }

          .section {
            margin-top: 18px;
          }

          .section-title {
            position: relative;
            margin-bottom: 12px;
            padding-bottom: 6px;
          }

          .section-title span {
            display: inline-block;
            font-size: 17px;
            line-height: 1.1;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            font-weight: 800;
            color: #294243;
            background:
              linear-gradient(transparent 62%, #dbe4e3 62%);
            padding-right: 8px;
          }

          .section-title::after {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background: #d5dfde;
            margin-top: 6px;
          }

          .profile-text {
            font-size: 13.5px;
            color: #374748;
            white-space: pre-wrap;
          }

          .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-chip,
          .mini-tag {
            display: inline-flex;
            align-items: center;
            padding: 6px 10px;
            border: 1px solid #cfd9d8;
            background: #f7f9f8;
            color: #2d3d3d;
            font-size: 12px;
          }

          .stack {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            border-left: 3px solid #aebfc0;
            padding-left: 14px;
          }

          .entry.compact {
            border-left-width: 2px;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 18px;
          }

          .entry-title {
            margin: 0;
            font-size: 15px;
            line-height: 1.25;
            color: #223132;
            font-weight: 800;
          }

          .entry-meta {
            margin-top: 3px;
            font-size: 12.5px;
            color: #617273;
          }

          .entry-date {
            flex: 0 0 auto;
            min-width: 112px;
            text-align: right;
            font-size: 12px;
            color: #5f7374;
            font-weight: 700;
            letter-spacing: 0.02em;
          }

          .entry-copy {
            margin-top: 5px;
            font-size: 13px;
            color: #3a4a4b;
          }

          .entry-link {
            max-width: 180px;
            text-align: right;
            font-size: 12px;
            color: #4f6f70;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
            color: #334344;
          }

          .bullet-list li {
            margin: 4px 0;
            font-size: 13px;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 7px;
          }

          .language-item {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            gap: 6px;
            font-size: 13px;
            color: #314142;
          }

          .language-name {
            font-weight: 700;
            color: #223132;
          }

          .language-sep {
            color: #799192;
          }

          .language-level {
            color: #5f7374;
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

  if (!customElements.get('gqr-resume-flare-v1')) {
    customElements.define('gqr-resume-flare-v1', GQRResumeFlareV1);
  }
})();