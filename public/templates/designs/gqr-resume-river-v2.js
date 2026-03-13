(function() {
  'use strict';

  class GQRResumeRiverV2 extends HTMLElement {
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
          contact: 'Contact',
          technologies: 'Technologies',
          gpa: 'GPA',
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
          contact: 'Contacto',
          technologies: 'Tecnologías',
          gpa: 'Promedio',
          levelMap: {
            basic: 'Básico',
            intermediate: 'Intermedio',
            advanced: 'Avanzado',
            native: 'Nativo'
          }
        }
      };
    }

    formatShortDate(dateValue, lang) {
      if (!dateValue) return '';
      const date = new Date(dateValue);
      if (Number.isNaN(date.getTime())) return this.escapeHtml(this.safeStr(dateValue));

      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      return months[date.getMonth()] + ' ' + date.getFullYear();
    }

    formatDateRange(startDate, endDate, isCurrentOrCompleted, lang, presentLabel) {
      const start = this.formatShortDate(startDate, lang);
      const end = isCurrentOrCompleted === false
        ? presentLabel
        : this.formatShortDate(endDate, lang);

      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `
        <div class="section-heading-wrap">
          <h2 class="section-title">${this.escapeHtml(title)}</h2>
          <div class="section-rule"></div>
        </div>
      `;
    }

    render() {
      const data = this.data || {};
      const lang = this.getLanguage();
      const i18n = this.getI18n()[lang];
      const presentLabel = i18n.present;

      const firstName = this.safeStr(data.firstName);
      const lastName = this.safeStr(data.lastName);
      const profession = this.safeStr(data.profession);
      const email = this.safeStr(data.email);
      const phone = this.safeStr(data.phone);
      const country = this.safeStr(data.country);
      const linkedin = this.safeStr(data.linkedin);
      const summary = this.safeStr(data.summary);

      const name = [firstName, lastName].filter(Boolean).join(' ').trim();

      const skillsRaw = this.safeArr(data.skillsRaw);
      const toolsRaw = this.safeArr(data.toolsRaw);
      const combinedSkills = Array.from(new Set(
        skillsRaw.concat(toolsRaw).map(v => this.safeStr(v).trim()).filter(Boolean)
      ));

      const experience = this.safeArr(data.experience);
      const projects = this.safeArr(data.projects);
      const achievements = this.safeArr(data.achievements);
      const education = this.safeArr(data.education);
      const certifications = this.safeArr(data.certifications);
      const languages = this.safeArr(data.languages);

      const contactItems = [
        email ? `<span class="contact-pill">✉ ${this.escapeHtml(email)}</span>` : '',
        phone ? `<span class="contact-pill">☎ ${this.escapeHtml(phone)}</span>` : '',
        country ? `<span class="contact-pill">⚲ ${this.escapeHtml(country)}</span>` : '',
        linkedin ? `<span class="contact-pill">🔗 ${this.escapeHtml(linkedin)}</span>` : ''
      ].filter(Boolean).join('');

      const headerSection = (name || profession || contactItems) ? `
        <section class="header-card" data-section="header">
          <div class="paper-note"></div>
          <div class="header-main">
            ${name ? `<h1 class="name">${this.escapeHtml(name)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
          ${contactItems ? `
            <div class="contact-block" data-section="contact">
              <div class="mini-label">${this.escapeHtml(i18n.contact)}</div>
              <div class="contact-list">
                ${contactItems}
              </div>
            </div>
          ` : ''}
        </section>
      ` : '';

      const profileSection = summary ? `
        <section class="section profile-section" data-section="profile">
          ${this.renderSectionTitle(i18n.profile)}
          <div class="section-body prose">
            <p>${this.escapeHtml(summary)}</p>
          </div>
        </section>
      ` : '';

      const skillsSection = combinedSkills.length ? `
        <section class="section" data-section="skills">
          ${this.renderSectionTitle(i18n.skills)}
          <div class="section-body skills-grid">
            ${combinedSkills.map((skill, index) => `
              <div class="skill-chip" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</div>
            `).join('')}
          </div>
        </section>
      ` : '';

      const experienceSection = experience.length ? `
        <section class="section" data-section="experience">
          ${this.renderSectionTitle(i18n.experience)}
          <div class="section-body timeline">
            ${experience.map((item, index) => {
              const entryId = this.safeStr(item && item.id) || ('exp-' + index);
              const bullets = []
                .concat(this.safeArr(item && item.achievements))
                .concat(this.safeArr(item && item.responsibilities))
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);

              const dateRange = this.formatDateRange(
                item && item.startDate,
                item && item.endDate,
                item && item.isCurrent,
                lang,
                presentLabel
              );

              const line2 = [this.safeStr(item && item.company), this.safeStr(item && item.location)]
                .filter(Boolean)
                .join(' · ');

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-top">
                    <div>
                      ${this.safeStr(item && item.title) ? `<h3 class="entry-title">${this.escapeHtml(item.title)}</h3>` : ''}
                      ${line2 ? `<div class="entry-subtitle">${this.escapeHtml(line2)}</div>` : ''}
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
      ` : '';

      const projectsSection = projects.length ? `
        <section class="section" data-section="projects">
          ${this.renderSectionTitle(i18n.projects)}
          <div class="section-body stacked-list">
            ${projects.map((item, index) => {
              const entryId = this.safeStr(item && item.id) || ('project-' + index);
              const techs = this.safeArr(item && item.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              return `
                <article class="entry card-entry" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-top">
                    <div>
                      ${this.safeStr(item && item.name) ? `<h3 class="entry-title">${this.escapeHtml(item.name)}</h3>` : ''}
                    </div>
                    ${this.safeStr(item && item.url) ? `<div class="entry-link">${this.escapeHtml(item.url)}</div>` : ''}
                  </div>
                  ${this.safeStr(item && item.description) ? `<p class="entry-text">${this.escapeHtml(item.description)}</p>` : ''}
                  ${techs.length ? `
                    <div class="meta-line">
                      <span class="meta-label">${this.escapeHtml(i18n.technologies)}:</span>
                      <span>${this.escapeHtml(techs.join(', '))}</span>
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const achievementsSection = achievements.length ? `
        <section class="section" data-section="achievements">
          ${this.renderSectionTitle(i18n.achievements)}
          <div class="section-body stacked-list">
            ${achievements.map((item, index) => {
              const entryId = this.safeStr(item && item.id) || ('achievement-' + index);
              return `
                <article class="entry card-entry compact" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-top">
                    <div>
                      ${this.safeStr(item && item.title) ? `<h3 class="entry-title">${this.escapeHtml(item.title)}</h3>` : ''}
                    </div>
                    ${this.safeStr(item && item.year) ? `<div class="entry-date">${this.escapeHtml(item.year)}</div>` : ''}
                  </div>
                  ${this.safeStr(item && item.description) ? `<p class="entry-text">${this.escapeHtml(item.description)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const educationSection = education.length ? `
        <section class="section" data-section="education">
          ${this.renderSectionTitle(i18n.education)}
          <div class="section-body timeline">
            ${education.map((item, index) => {
              const entryId = this.safeStr(item && item.id) || ('education-' + index);
              const dateRange = this.formatDateRange(
                item && item.startDate,
                item && item.endDate,
                item && item.isCompleted,
                lang,
                presentLabel
              );
              const degreeField = [this.safeStr(item && item.degree), this.safeStr(item && item.field)]
                .filter(Boolean)
                .join(' — ');
              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-top">
                    <div>
                      ${degreeField ? `<h3 class="entry-title">${this.escapeHtml(degreeField)}</h3>` : ''}
                      ${this.safeStr(item && item.institution) ? `<div class="entry-subtitle">${this.escapeHtml(item.institution)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${this.safeStr(item && item.gpa) ? `
                    <div class="meta-line">
                      <span class="meta-label">${this.escapeHtml(i18n.gpa)}:</span>
                      <span>${this.escapeHtml(item.gpa)}</span>
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const certificationsSection = certifications.length ? `
        <section class="section" data-section="certifications">
          ${this.renderSectionTitle(i18n.certifications)}
          <div class="section-body stacked-list">
            ${certifications.map((item, index) => {
              const entryId = this.safeStr(item && item.id) || ('cert-' + index);
              const certDate = this.formatShortDate(item && item.date, lang) || this.safeStr(item && item.date);
              return `
                <article class="entry card-entry compact" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-top">
                    <div>
                      ${this.safeStr(item && item.name) ? `<h3 class="entry-title">${this.escapeHtml(item.name)}</h3>` : ''}
                      ${this.safeStr(item && item.issuer) ? `<div class="entry-subtitle">${this.escapeHtml(item.issuer)}</div>` : ''}
                    </div>
                    ${certDate ? `<div class="entry-date">${this.escapeHtml(certDate)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const languagesSection = languages.length ? `
        <section class="section" data-section="languages">
          ${this.renderSectionTitle(i18n.languages)}
          <div class="section-body language-list">
            ${languages.map((item, index) => {
              const entryId = this.safeStr(item && item.id) || ('lang-' + index);
              const levelKey = this.safeStr(item && item.level).toLowerCase();
              const translatedLevel = i18n.levelMap[levelKey] || this.safeStr(item && item.level);
              const levelScoreMap = {
                basic: 1,
                intermediate: 2,
                advanced: 3,
                native: 4
              };
              const score = levelScoreMap[levelKey] || 0;
              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="language-info">
                    <span class="language-name">${this.escapeHtml(this.safeStr(item && item.name))}</span>
                    <span class="language-level">${this.escapeHtml(translatedLevel)}</span>
                  </div>
                  <div class="dots" aria-hidden="true">
                    ${[1, 2, 3, 4].map(n => `<span class="dot ${n <= score ? 'filled' : ''}"></span>`).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Inter:wght@400;500;600;700;800&display=swap');

          :host {
            display: block;
            color: #181818;
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
            padding: 18mm 16mm 16mm;
            background:
              linear-gradient(rgba(108, 133, 160, 0.10) 1px, transparent 1px),
              linear-gradient(90deg, rgba(108, 133, 160, 0.10) 1px, transparent 1px),
              #f8f9f7;
            background-size: 18px 18px, 18px 18px, auto;
            font-family: 'Inter', Arial, sans-serif;
            line-height: 1.45;
            position: relative;
          }

          .page::before {
            content: '';
            position: absolute;
            inset: 10mm 10mm auto auto;
            width: 44px;
            height: 44px;
            border-top: 6px solid #171717;
            border-right: 6px solid #171717;
            opacity: 0.9;
          }

          .page::after {
            content: '';
            position: absolute;
            right: 14mm;
            top: 24mm;
            width: 64px;
            height: 12px;
            border-top: 3px solid #171717;
            border-radius: 50%;
            transform: rotate(-12deg);
            opacity: 0.65;
          }

          .sheet {
            background: rgba(255, 255, 255, 0.72);
            border: 1px solid rgba(24, 24, 24, 0.08);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            backdrop-filter: blur(0.5px);
          }

          .header-card {
            position: relative;
            padding: 24px 26px 18px;
            background: linear-gradient(135deg, #121212 0%, #1c1c1c 100%);
            color: #f6f4ef;
            overflow: hidden;
          }

          .header-card::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 14px;
            background:
              radial-gradient(circle at 10px -2px, transparent 12px, #f8f9f7 13px) repeat-x;
            background-size: 22px 14px;
          }

          .paper-note {
            position: absolute;
            right: 22px;
            top: 18px;
            width: 92px;
            height: 36px;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.14);
            transform: rotate(-4deg);
          }

          .header-main {
            position: relative;
            z-index: 1;
          }

          .name {
            margin: 0;
            font-size: 36px;
            line-height: 0.98;
            font-weight: 800;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            max-width: 100%;
          }

          .profession {
            margin-top: 8px;
            font-size: 15px;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #b9d0d8;
          }

          .contact-block {
            position: relative;
            z-index: 1;
            margin-top: 18px;
          }

          .mini-label {
            font-family: 'Caveat', cursive;
            font-size: 21px;
            color: #f1f1f1;
            margin-bottom: 8px;
            letter-spacing: 0.03em;
          }

          .contact-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 10px;
            border-radius: 999px;
            background: rgba(255,255,255,0.09);
            border: 1px solid rgba(255,255,255,0.12);
            font-size: 12px;
            color: #f7f7f7;
            word-break: break-word;
          }

          .content {
            padding: 18px 26px 26px;
          }

          .section {
            margin-top: 18px;
          }

          .section:first-child {
            margin-top: 0;
          }

          .section-heading-wrap {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 10px;
          }

          .section-title {
            margin: 0;
            font-family: 'Caveat', cursive;
            font-size: 28px;
            line-height: 1;
            color: #181818;
            white-space: nowrap;
          }

          .section-rule {
            height: 2px;
            flex: 1;
            background: linear-gradient(90deg, #8aa0aa 0%, rgba(138,160,170,0.18) 100%);
          }

          .section-body {
            color: #202020;
          }

          .prose p,
          .entry-text {
            margin: 0;
            font-size: 13.5px;
            color: #2c2c2c;
          }

          .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-chip {
            display: inline-flex;
            align-items: center;
            padding: 7px 11px;
            border-radius: 999px;
            background: #ffffff;
            border: 1px solid #d3d9de;
            font-size: 12.5px;
            font-weight: 500;
            color: #1d1d1d;
          }

          .timeline,
          .stacked-list,
          .language-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .entry {
            background: rgba(255,255,255,0.85);
            border: 1px solid rgba(24,24,24,0.08);
            padding: 12px 14px;
          }

          .timeline-entry {
            border-left: 4px solid #97acb4;
            padding-left: 12px;
          }

          .card-entry.compact {
            padding-top: 11px;
            padding-bottom: 11px;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 6px;
          }

          .entry-title {
            margin: 0;
            font-size: 15px;
            line-height: 1.25;
            font-weight: 700;
            color: #161616;
          }

          .entry-subtitle {
            margin-top: 3px;
            font-size: 12.5px;
            color: #4e4e4e;
            font-weight: 500;
          }

          .entry-date,
          .entry-link {
            flex: 0 0 auto;
            font-size: 12px;
            color: #2f3f47;
            font-weight: 600;
            text-align: right;
            white-space: nowrap;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 4px 0;
            font-size: 13px;
            color: #262626;
          }

          .meta-line {
            margin-top: 8px;
            font-size: 12.5px;
            color: #373737;
          }

          .meta-label {
            font-weight: 700;
          }

          .language-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            background: rgba(255,255,255,0.85);
            border: 1px solid rgba(24,24,24,0.08);
            padding: 10px 12px;
          }

          .language-info {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .language-name {
            font-size: 14px;
            font-weight: 700;
            color: #181818;
          }

          .language-level {
            font-size: 12.5px;
            color: #555;
          }

          .dots {
            display: inline-flex;
            gap: 6px;
          }

          .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 1px solid #7f969f;
            background: transparent;
          }

          .dot.filled {
            background: #7f969f;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          <div class="sheet">
            ${headerSection}
            <div class="content">
              ${profileSection}
              ${skillsSection}
              ${experienceSection}
              ${projectsSection}
              ${achievementsSection}
              ${educationSection}
              ${certificationsSection}
              ${languagesSection}
            </div>
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-river-v2')) {
    customElements.define('gqr-resume-river-v2', GQRResumeRiverV2);
  }
})();