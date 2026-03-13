(function() {
  'use strict';

  class GQRResumeSandV1 extends HTMLElement {
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

      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      return months[date.getMonth()] + ' ' + date.getFullYear();
    }

    formatDateRange(startDate, endDate, currentFlag, lang) {
      const i18n = this.getI18n()[lang];
      const start = this.formatShortDate(startDate, lang);
      const end = currentFlag ? i18n.present : this.formatShortDate(endDate, lang);
      if (start && end) return start + ' — ' + end;
      return start || end || '';
    }

    renderSectionTitle(title) {
      return `
        <div class="section-heading-wrap">
          <h2 class="section-heading">${this.escapeHtml(title)}</h2>
        </div>
      `;
    }

    render() {
      const data = this._data || {};
      const lang = this.getLanguage();
      const t = this.getI18n()[lang];

      const firstName = this.safeStr(data.firstName);
      const lastName = this.safeStr(data.lastName);
      const profession = this.safeStr(data.profession);
      const email = this.safeStr(data.email);
      const phone = this.safeStr(data.phone);
      const country = this.safeStr(data.country);
      const linkedin = this.safeStr(data.linkedin);
      const summary = this.safeStr(data.summary);

      const rawSkills = [...this.safeArr(data.skillsRaw), ...this.safeArr(data.toolsRaw)]
        .map((item) => this.safeStr(item).trim())
        .filter(Boolean);

      const uniqueSkills = [];
      const seenSkills = new Set();
      rawSkills.forEach((skill) => {
        const key = skill.toLowerCase();
        if (!seenSkills.has(key)) {
          seenSkills.add(key);
          uniqueSkills.push(skill);
        }
      });

      const experience = this.safeArr(data.experience);
      const projects = this.safeArr(data.projects);
      const achievements = this.safeArr(data.achievements);
      const education = this.safeArr(data.education);
      const certifications = this.safeArr(data.certifications);
      const languages = this.safeArr(data.languages);

      const contactItems = [
        email ? `✉ ${this.escapeHtml(email)}` : '',
        phone ? `☎ ${this.escapeHtml(phone)}` : '',
        country ? `⚲ ${this.escapeHtml(country)}` : '',
        linkedin ? `🔗 ${this.escapeHtml(linkedin)}` : ''
      ].filter(Boolean);

      const headerHtml = (firstName || lastName || profession || contactItems.length)
        ? `
          <section class="header" data-section="header">
            <div class="header-ornament top"></div>
            <div class="name-block">
              <div class="name">${this.escapeHtml((firstName + ' ' + lastName).trim())}</div>
              ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
            </div>
            ${contactItems.length ? `
              <div class="contact" data-section="contact">
                ${contactItems.map((item, index) => `
                  <div class="contact-item" data-entry-id="contact-${index}">${item}</div>
                `).join('')}
              </div>
            ` : ''}
            <div class="header-ornament bottom"></div>
          </section>
        `
        : '';

      const profileHtml = summary
        ? `
          <section class="section" data-section="profile">
            ${this.renderSectionTitle(t.profile)}
            <div class="section-body">
              <p class="summary">${this.escapeHtml(summary)}</p>
            </div>
          </section>
        `
        : '';

      const skillsHtml = uniqueSkills.length
        ? `
          <section class="section" data-section="skills">
            ${this.renderSectionTitle(t.skills)}
            <div class="section-body">
              <div class="skills-list">
                ${uniqueSkills.map((skill, index) => `
                  <span class="skill-pill" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
                `).join('')}
              </div>
            </div>
          </section>
        `
        : '';

      const experienceHtml = experience.length
        ? `
          <section class="section" data-section="experience">
            ${this.renderSectionTitle(t.experience)}
            <div class="section-body timeline-list">
              ${experience.map((item, index) => {
                const bullets = [...this.safeArr(item.achievements), ...this.safeArr(item.responsibilities)]
                  .map((b) => this.safeStr(b).trim())
                  .filter(Boolean);

                const range = this.formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang);
                const title = this.safeStr(item.title);
                const company = this.safeStr(item.company);
                const location = this.safeStr(item.location);
                const entryId = this.safeStr(item.id) || `experience-${index}`;

                return `
                  <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(entryId)}">
                    <div class="entry-head">
                      <div class="entry-title-row">
                        ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                        ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                      </div>
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${this.escapeHtml(company)}${company && location ? ' · ' : ''}${this.escapeHtml(location)}
                        </div>
                      ` : ''}
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
            ${this.renderSectionTitle(t.projects)}
            <div class="section-body">
              ${projects.map((item, index) => {
                const entryId = this.safeStr(item.id) || `project-${index}`;
                const name = this.safeStr(item.name);
                const description = this.safeStr(item.description);
                const technologies = this.safeArr(item.technologies)
                  .map((tech) => this.safeStr(tech).trim())
                  .filter(Boolean);
                const url = this.safeStr(item.url);

                return `
                  <article class="entry" data-entry-id="${this.escapeHtml(entryId)}">
                    <div class="entry-head">
                      ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                      ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                    ${technologies.length ? `
                      <div class="tag-row">
                        ${technologies.map((tech, techIndex) => `
                          <span class="mini-tag" data-entry-id="${this.escapeHtml(entryId)}-tech-${techIndex}">${this.escapeHtml(tech)}</span>
                        `).join('')}
                      </div>
                    ` : ''}
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      const achievementsHtml = achievements.length
        ? `
          <section class="section" data-section="achievements">
            ${this.renderSectionTitle(t.achievements)}
            <div class="section-body">
              ${achievements.map((item, index) => {
                const entryId = this.safeStr(item.id) || `achievement-${index}`;
                const title = this.safeStr(item.title);
                const description = this.safeStr(item.description);
                const year = this.safeStr(item.year);

                return `
                  <article class="entry" data-entry-id="${this.escapeHtml(entryId)}">
                    <div class="entry-head">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                    </div>
                    ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      const educationHtml = education.length
        ? `
          <section class="section" data-section="education">
            ${this.renderSectionTitle(t.education)}
            <div class="section-body timeline-list">
              ${education.map((item, index) => {
                const entryId = this.safeStr(item.id) || `education-${index}`;
                const degree = this.safeStr(item.degree);
                const field = this.safeStr(item.field);
                const institution = this.safeStr(item.institution);
                const gpa = this.safeStr(item.gpa);
                const range = this.formatDateRange(item.startDate, item.endDate, item.isCompleted === false, lang);

                return `
                  <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(entryId)}">
                    <div class="entry-head">
                      <div class="entry-title-row">
                        <h3 class="entry-title">${this.escapeHtml([degree, field].filter(Boolean).join(' — '))}</h3>
                        ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                      </div>
                      ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${gpa ? `<p class="entry-text">GPA: ${this.escapeHtml(gpa)}</p>` : ''}
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
            ${this.renderSectionTitle(t.certifications)}
            <div class="section-body">
              ${certifications.map((item, index) => {
                const entryId = this.safeStr(item.id) || `certification-${index}`;
                const name = this.safeStr(item.name);
                const issuer = this.safeStr(item.issuer);
                const date = this.formatShortDate(item.date, lang);

                return `
                  <article class="entry" data-entry-id="${this.escapeHtml(entryId)}">
                    <div class="entry-head">
                      ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                      ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
                    </div>
                    ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      const languagesHtml = languages.length
        ? `
          <section class="section" data-section="languages">
            ${this.renderSectionTitle(t.languages)}
            <div class="section-body">
              <div class="language-list">
                ${languages.map((item, index) => {
                  const entryId = this.safeStr(item.id) || `language-${index}`;
                  const name = this.safeStr(item.name);
                  const levelKey = this.safeStr(item.level).toLowerCase();
                  const levelLabel = t.levelMap[levelKey] || this.safeStr(item.level);

                  return `
                    <div class="language-item" data-entry-id="${this.escapeHtml(entryId)}">
                      <span class="language-name">${this.escapeHtml(name)}</span>
                      <span class="language-sep">—</span>
                      <span class="language-level">${this.escapeHtml(levelLabel)}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </section>
        `
        : '';

      this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:wght@400;500;600;700&display=swap');

          :host {
            display: block;
            color: #2f2418;
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
            padding: 16mm 15mm 16mm 15mm;
            background:
              radial-gradient(circle at top left, rgba(120, 89, 52, 0.05), transparent 28%),
              radial-gradient(circle at bottom right, rgba(120, 89, 52, 0.04), transparent 26%),
              linear-gradient(180deg, #f6f0e2 0%, #f3ecd9 100%);
            color: #2f2418;
            font-family: "Cormorant Garamond", Georgia, serif;
            border: 1.5px solid #8b6b43;
            box-shadow: inset 0 0 0 4px #e3d3b0, inset 0 0 0 6px #8b6b43;
            position: relative;
          }

          .page::before,
          .page::after {
            content: "";
            position: absolute;
            width: 28px;
            height: 28px;
            border: 2px solid #6f5131;
            opacity: 0.85;
          }

          .page::before {
            top: 10px;
            left: 10px;
            border-right: none;
            border-bottom: none;
          }

          .page::after {
            top: 10px;
            right: 10px;
            border-left: none;
            border-bottom: none;
          }

          .footer-corner-left,
          .footer-corner-right {
            content: "";
            position: absolute;
            width: 28px;
            height: 28px;
            border: 2px solid #6f5131;
            opacity: 0.85;
            bottom: 10px;
          }

          .footer-corner-left {
            left: 10px;
            border-right: none;
            border-top: none;
          }

          .footer-corner-right {
            right: 10px;
            border-left: none;
            border-top: none;
          }

          .header {
            text-align: center;
            margin-bottom: 10mm;
          }

          .header-ornament {
            height: 10px;
            position: relative;
            margin: 2mm auto;
            max-width: 150mm;
          }

          .header-ornament::before,
          .header-ornament::after {
            content: "";
            position: absolute;
            top: 50%;
            width: 44%;
            border-top: 1.5px solid #7b5d39;
          }

          .header-ornament::before {
            left: 0;
          }

          .header-ornament::after {
            right: 0;
          }

          .header-ornament.top span,
          .header-ornament.bottom span {
            display: none;
          }

          .header-ornament::marker {
            display: none;
          }

          .header-ornament.top::before,
          .header-ornament.top::after,
          .header-ornament.bottom::before,
          .header-ornament.bottom::after {
            transform: translateY(-50%);
          }

          .header-ornament.top {
            margin-bottom: 4mm;
          }

          .header-ornament.bottom {
            margin-top: 4mm;
          }

          .header-ornament.top::after,
          .header-ornament.top::before,
          .header-ornament.bottom::after,
          .header-ornament.bottom::before {
            border-color: #7b5d39;
          }

          .header-ornament.top:after,
          .header-ornament.top:before,
          .header-ornament.bottom:after,
          .header-ornament.bottom:before {
            content: "";
          }

          .header-ornament.top + .name-block::before,
          .header-ornament.bottom::before {
            /* no-op for structure compatibility */
          }

          .name-block {
            position: relative;
            padding: 2mm 0;
          }

          .name-block::before,
          .name-block::after {
            content: "✦";
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            color: #7b5d39;
            font-size: 11px;
          }

          .name-block::before {
            left: 25%;
          }

          .name-block::after {
            right: 25%;
          }

          .name {
            font-family: "Cinzel", "Times New Roman", serif;
            font-size: 32px;
            line-height: 1.1;
            font-weight: 700;
            letter-spacing: 1.4px;
            text-transform: uppercase;
            color: #2d2116;
          }

          .profession {
            margin-top: 2mm;
            font-family: "Cinzel", "Times New Roman", serif;
            font-size: 13px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #6b4f31;
          }

          .contact {
            margin-top: 4mm;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 6px 12px;
            font-size: 14px;
            color: #4d3923;
          }

          .contact-item {
            padding: 3px 8px;
            border: 1px solid #b69466;
            background: rgba(176, 143, 95, 0.08);
            border-radius: 999px;
            white-space: nowrap;
          }

          .section {
            margin-bottom: 7mm;
          }

          .section:last-child {
            margin-bottom: 0;
          }

          .section-heading-wrap {
            position: relative;
            text-align: center;
            margin-bottom: 3.5mm;
          }

          .section-heading-wrap::before,
          .section-heading-wrap::after {
            content: "";
            position: absolute;
            top: 50%;
            width: calc(50% - 54px);
            border-top: 1px solid #8a6a43;
            transform: translateY(-50%);
          }

          .section-heading-wrap::before {
            left: 0;
          }

          .section-heading-wrap::after {
            right: 0;
          }

          .section-heading {
            margin: 0;
            display: inline-block;
            padding: 0 10px;
            font-family: "Cinzel", "Times New Roman", serif;
            font-size: 18px;
            line-height: 1.2;
            text-transform: uppercase;
            letter-spacing: 1.4px;
            color: #3a2b1b;
            background: linear-gradient(180deg, #f6f0e2 0%, #f3ecd9 100%);
            position: relative;
          }

          .section-body {
            font-size: 16px;
            line-height: 1.35;
          }

          .summary,
          .entry-text {
            margin: 0;
            text-align: justify;
          }

          .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 7px 8px;
          }

          .skill-pill,
          .mini-tag {
            display: inline-block;
            padding: 4px 10px;
            border: 1px solid #9a7a50;
            background: rgba(154, 122, 80, 0.08);
            border-radius: 999px;
            color: #3d2e1f;
            font-size: 14px;
            line-height: 1.2;
          }

          .timeline-list {
            position: relative;
          }

          .timeline-list::before {
            content: "";
            position: absolute;
            left: 5px;
            top: 2px;
            bottom: 2px;
            width: 1px;
            background: #b08c5d;
            opacity: 0.7;
          }

          .entry {
            margin-bottom: 4.5mm;
          }

          .entry:last-child {
            margin-bottom: 0;
          }

          .timeline-entry {
            position: relative;
            padding-left: 18px;
          }

          .timeline-entry::before {
            content: "";
            position: absolute;
            left: 0;
            top: 8px;
            width: 10px;
            height: 10px;
            border: 1px solid #7b5d39;
            background: #f3e7cc;
            border-radius: 50%;
          }

          .entry-head {
            margin-bottom: 1.5mm;
          }

          .entry-title-row {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 10px;
          }

          .entry-title {
            margin: 0;
            font-size: 20px;
            line-height: 1.15;
            font-weight: 700;
            color: #2e2217;
          }

          .entry-date,
          .entry-link {
            font-size: 14px;
            color: #6a5032;
            white-space: nowrap;
            text-align: right;
          }

          .entry-subtitle {
            font-size: 16px;
            color: #5a442b;
            font-style: italic;
          }

          .bullet-list {
            margin: 0;
            padding-left: 20px;
          }

          .bullet-list li {
            margin: 0 0 1.5mm 0;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .tag-row {
            margin-top: 2mm;
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 2mm;
          }

          .language-item {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            gap: 6px;
            padding-bottom: 2mm;
            border-bottom: 1px dotted rgba(122, 93, 57, 0.4);
          }

          .language-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .language-name {
            font-weight: 700;
          }

          .language-level,
          .language-sep {
            color: #6a5032;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          <div class="footer-corner-left"></div>
          <div class="footer-corner-right"></div>
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

  if (!customElements.get('gqr-resume-sand-v1')) {
    customElements.define('gqr-resume-sand-v1', GQRResumeSandV1);
  }
})();