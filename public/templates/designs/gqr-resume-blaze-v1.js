(function () {
  'use strict';

  class GQRResumeBlazeV1 extends HTMLElement {
    static get observedAttributes() {
      return ['language'];
    }

    constructor() {
      super();
      this._data = {};
      this.attachShadow({ mode: 'open' });
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
      if (Number.isNaN(date.getTime())) return this.escapeHtml(value);

      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };

      return `${months[lang][date.getMonth()]} ${date.getFullYear()}`;
    }

    formatDateRange(startDate, endDate, lang, isCurrent, isCompleted, type) {
      const i18n = this.getI18n(lang);
      const start = this.formatShortDate(startDate, lang);
      let end = '';

      if (type === 'education') {
        end = isCompleted === false ? i18n.present : this.formatShortDate(endDate, lang);
      } else {
        end = isCurrent ? i18n.present : this.formatShortDate(endDate, lang);
      }

      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
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
      }[lang];
    }

    renderSectionTitle(title) {
      return `
        <div class="section-heading-wrap">
          <h2 class="section-heading">${this.escapeHtml(title)}</h2>
        </div>
      `;
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
        email ? `✉ ${this.escapeHtml(email)}` : '',
        phone ? `☎ ${this.escapeHtml(phone)}` : '',
        country ? `⚲ ${this.escapeHtml(country)}` : '',
        linkedin ? `🔗 ${this.escapeHtml(linkedin)}` : ''
      ].filter(Boolean);

      return `
        <section class="header-card" data-section="header">
          <div class="header-top">
            <div class="name-block">
              <h1 class="name">${this.escapeHtml(fullName)}</h1>
              ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
            </div>
          </div>
          ${contactItems.length ? `
            <div class="contact-row" data-section="contact">
              ${contactItems.map((item, index) => `
                <span class="contact-pill" data-entry-id="contact-${index}">${item}</span>
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
          ${this.renderSectionTitle(i18n.profile)}
          <div class="profile-text">${this.escapeHtml(text)}</div>
        </section>
      `;
    }

    renderSkills(skillsRaw, toolsRaw, i18n) {
      const merged = [...this.safeArr(skillsRaw), ...this.safeArr(toolsRaw)]
        .map((item) => this.safeStr(item).trim())
        .filter(Boolean);

      const seen = new Set();
      const unique = merged.filter((item) => {
        const key = item.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      if (!unique.length) return '';

      return `
        <section class="section" data-section="skills">
          ${this.renderSectionTitle(i18n.skills)}
          <div class="skills-grid">
            ${unique.map((skill, index) => `
              <div class="skill-chip" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</div>
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
          ${this.renderSectionTitle(i18n.experience)}
          <div class="timeline-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id) || `experience-${index}`;
              const title = this.safeStr(item.title);
              const company = this.safeStr(item.company);
              const location = this.safeStr(item.location);
              const dateRange = this.formatDateRange(
                item.startDate,
                item.endDate,
                lang,
                !!item.isCurrent,
                true,
                'experience'
              );

              const bullets = [...this.safeArr(item.achievements), ...this.safeArr(item.responsibilities)]
                .map((b) => this.safeStr(b).trim())
                .filter(Boolean);

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${company ? `<span>${this.escapeHtml(company)}</span>` : ''}
                          ${(company && location) ? `<span class="sep">•</span>` : ''}
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

    renderProjects(projects, i18n) {
      const items = this.safeArr(projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          ${this.renderSectionTitle(i18n.projects)}
          <div class="stack-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id) || `project-${index}`;
              const name = this.safeStr(item.name);
              const description = this.safeStr(item.description);
              const technologies = this.safeArr(item.technologies)
                .map((t) => this.safeStr(t).trim())
                .filter(Boolean);
              const url = this.safeStr(item.url);

              return `
                <article class="entry card-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                    </div>
                    ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map((tech, techIndex) => `
                        <span class="tag" data-entry-id="${this.escapeHtml(id)}-tech-${techIndex}">${this.escapeHtml(tech)}</span>
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

    renderAchievements(achievements, i18n) {
      const items = this.safeArr(achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          ${this.renderSectionTitle(i18n.achievements)}
          <div class="stack-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id) || `achievement-${index}`;
              const title = this.safeStr(item.title);
              const description = this.safeStr(item.description);
              const year = this.safeStr(item.year);

              return `
                <article class="entry card-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
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

    renderEducation(education, i18n, lang) {
      const items = this.safeArr(education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          ${this.renderSectionTitle(i18n.education)}
          <div class="timeline-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id) || `education-${index}`;
              const degree = this.safeStr(item.degree);
              const field = this.safeStr(item.field);
              const institution = this.safeStr(item.institution);
              const gpa = this.safeStr(item.gpa);
              const dateRange = this.formatDateRange(
                item.startDate,
                item.endDate,
                lang,
                false,
                item.isCompleted,
                'education'
              );

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${(degree || field) ? `
                        <h3 class="entry-title">
                          ${this.escapeHtml([degree, field].filter(Boolean).join(degree && field ? ' — ' : ''))}
                        </h3>
                      ` : ''}
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

    renderCertifications(certifications, i18n, lang) {
      const items = this.safeArr(certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          ${this.renderSectionTitle(i18n.certifications)}
          <div class="stack-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id) || `certification-${index}`;
              const name = this.safeStr(item.name);
              const issuer = this.safeStr(item.issuer);
              const date = this.formatShortDate(item.date, lang);

              return `
                <article class="entry card-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
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
          ${this.renderSectionTitle(i18n.languages)}
          <div class="language-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id) || `language-${index}`;
              const name = this.safeStr(item.name);
              const levelKey = this.safeStr(item.level).toLowerCase();
              const level = i18n.levelMap[levelKey] || this.safeStr(item.level);

              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                  <span class="language-name">${this.escapeHtml(name)}</span>
                  <span class="language-divider">—</span>
                  <span class="language-level">${this.escapeHtml(level)}</span>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    render() {
      if (!this.shadowRoot) return;

      const data = this._data || {};
      const lang = this.getLanguage();
      const i18n = this.getI18n(lang);

      const html = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Serif+4:wght@400;600&display=swap');

          :host {
            display: block;
            color: #262626;
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
            padding: 36px 38px 40px;
            font-family: 'Montserrat', Arial, sans-serif;
            color: #2c2c2c;
            line-height: 1.45;
          }

          .header-card {
            background: linear-gradient(135deg, #2c2b34 0%, #22212a 100%);
            color: #ffffff;
            border-radius: 10px;
            padding: 26px 28px 22px;
            margin-bottom: 24px;
            box-shadow: 0 10px 24px rgba(34, 33, 42, 0.14);
          }

          .header-top {
            display: block;
          }

          .name {
            margin: 0;
            font-size: 30px;
            line-height: 1.1;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 8px;
            font-size: 13px;
            font-weight: 500;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #d8d4cf;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 18px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            padding: 7px 11px;
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 999px;
            background: rgba(255,255,255,0.06);
            font-size: 11px;
            line-height: 1.2;
            color: #f5f2ee;
            word-break: break-word;
          }

          .section {
            margin-top: 20px;
          }

          .section-heading-wrap {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 12px;
          }

          .section-heading-wrap::after {
            content: "";
            height: 1px;
            flex: 1;
            background: linear-gradient(to right, #8f8577 0%, #d7d1ca 100%);
          }

          .section-heading {
            margin: 0;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #2a2930;
            white-space: nowrap;
          }

          .profile-text,
          .entry-text,
          .bullet-list,
          .language-item {
            font-size: 12.5px;
            color: #444;
          }

          .profile-text {
            font-family: 'Source Serif 4', Georgia, serif;
            font-size: 14px;
            line-height: 1.65;
            color: #3f3c38;
          }

          .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 9px;
          }

          .skill-chip,
          .tag {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 6px 11px;
            border-radius: 999px;
            border: 1px solid #d6d0c9;
            background: #fbfaf8;
            font-size: 11px;
            font-weight: 600;
            color: #3a3835;
          }

          .timeline-list,
          .stack-list {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            position: relative;
          }

          .timeline-entry {
            padding-left: 16px;
            border-left: 2px solid #d7d1ca;
          }

          .timeline-entry::before {
            content: "";
            position: absolute;
            left: -6px;
            top: 6px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #8f8577;
            box-shadow: 0 0 0 3px #f2efeb;
          }

          .card-entry {
            padding: 14px 15px;
            border: 1px solid #e3ddd6;
            border-radius: 10px;
            background: #fffdfa;
          }

          .entry-head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 5px;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-size: 14px;
            font-weight: 700;
            color: #26242a;
          }

          .entry-subtitle {
            margin-top: 3px;
            font-size: 12px;
            color: #6a655f;
          }

          .sep {
            margin: 0 6px;
          }

          .entry-date,
          .entry-link {
            flex-shrink: 0;
            font-size: 11px;
            font-weight: 600;
            color: #7a7064;
            text-align: right;
            white-space: nowrap;
          }

          .entry-link {
            max-width: 42%;
            overflow-wrap: anywhere;
            white-space: normal;
          }

          .entry-text {
            margin-top: 4px;
            line-height: 1.6;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 4px 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
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
            padding: 0;
          }

          .language-name {
            font-weight: 700;
            color: #2f2d33;
          }

          .language-divider {
            color: #8b8276;
          }

          .language-level {
            color: #5e5852;
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
          ${this.renderProfile(data.summary, i18n)}
          ${this.renderSkills(data.skillsRaw, data.toolsRaw, i18n)}
          ${this.renderExperience(data.experience, i18n, lang)}
          ${this.renderProjects(data.projects, i18n)}
          ${this.renderAchievements(data.achievements, i18n)}
          ${this.renderEducation(data.education, i18n, lang)}
          ${this.renderCertifications(data.certifications, i18n, lang)}
          ${this.renderLanguages(data.languages, i18n)}
        </div>
      `;

      this.shadowRoot.innerHTML = html;
    }
  }

  if (!customElements.get('gqr-resume-blaze-v1')) {
    customElements.define('gqr-resume-blaze-v1', GQRResumeBlazeV1);
  }
})();