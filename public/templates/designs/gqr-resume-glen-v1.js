(function() {
  'use strict';

  class GQRResumeGlenV1 extends HTMLElement {
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

    formatDateShort(dateValue, lang) {
      if (!dateValue) return '';
      const date = new Date(dateValue);
      if (Number.isNaN(date.getTime())) return this.escapeHtml(dateValue);

      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };

      return `${months[lang][date.getMonth()]} ${date.getFullYear()}`;
    }

    formatDateRange(startDate, endDate, currentFlag, lang) {
      const i18n = this.getI18n(lang);
      const start = this.formatDateShort(startDate, lang);
      const end = currentFlag ? i18n.present : this.formatDateShort(endDate, lang);

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

    uniqueSkills(skillsRaw, toolsRaw) {
      const merged = [...this.safeArr(skillsRaw), ...this.safeArr(toolsRaw)]
        .map((item) => this.safeStr(item).trim())
        .filter(Boolean);

      const seen = new Set();
      return merged.filter((item) => {
        const key = item.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    renderHeader(data) {
      const firstName = this.escapeHtml(data.firstName);
      const lastName = this.escapeHtml(data.lastName);
      const profession = this.escapeHtml(data.profession);
      const email = this.safeStr(data.email).trim();
      const phone = this.safeStr(data.phone).trim();
      const country = this.safeStr(data.country).trim();
      const linkedin = this.safeStr(data.linkedin).trim();

      const fullName = [firstName, lastName].filter(Boolean).join(' ');
      const contacts = [
        email ? `<span class="contact-item">✉ ${this.escapeHtml(email)}</span>` : '',
        phone ? `<span class="contact-item">☎ ${this.escapeHtml(phone)}</span>` : '',
        country ? `<span class="contact-item">⚲ ${this.escapeHtml(country)}</span>` : '',
        linkedin ? `<span class="contact-item">🔗 ${this.escapeHtml(linkedin)}</span>` : ''
      ].filter(Boolean).join('');

      if (!fullName && !profession && !contacts) return '';

      return `
        <section class="hero" data-section="header">
          <div class="hero-top">
            ${profession ? `<div class="eyebrow">${profession}</div>` : ''}
            ${fullName ? `<h1 class="name">${fullName}</h1>` : ''}
          </div>
          ${contacts ? `<div class="contact-row" data-section="contact">${contacts}</div>` : ''}
        </section>
      `;
    }

    renderProfile(data, i18n) {
      const summary = this.safeStr(data.summary).trim();
      if (!summary) return '';
      return `
        <section class="section" data-section="profile">
          <div class="section-heading">
            <h2>${this.escapeHtml(i18n.profile)}</h2>
          </div>
          <div class="section-body">
            <p class="profile-text">${this.escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(data, i18n) {
      const skills = this.uniqueSkills(data.skillsRaw, data.toolsRaw);
      if (!skills.length) return '';

      return `
        <section class="section" data-section="skills">
          <div class="section-heading">
            <h2>${this.escapeHtml(i18n.skills)}</h2>
          </div>
          <div class="section-body">
            <div class="pill-grid">
              ${skills.map((skill, index) => `
                <span class="pill" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(data, i18n, lang) {
      const experience = this.safeArr(data.experience).filter(Boolean);
      if (!experience.length) return '';

      return `
        <section class="section" data-section="experience">
          <div class="section-heading">
            <h2>${this.escapeHtml(i18n.experience)}</h2>
          </div>
          <div class="section-body stack">
            ${experience.map((item, index) => {
              const bullets = [
                ...this.safeArr(item.achievements),
                ...this.safeArr(item.responsibilities)
              ].map((b) => this.safeStr(b).trim()).filter(Boolean);

              const range = this.formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang);
              const title = this.escapeHtml(item.title);
              const company = this.escapeHtml(item.company);
              const location = this.escapeHtml(item.location);
              const metaParts = [company, location].filter(Boolean).join(' · ');
              const entryId = this.escapeHtml(item.id || `experience-${index}`);

              return `
                <article class="entry" data-entry-id="${entryId}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3>${title}</h3>` : ''}
                      ${metaParts ? `<div class="entry-sub">${metaParts}</div>` : ''}
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
      `;
    }

    renderProjects(data, i18n) {
      const projects = this.safeArr(data.projects).filter(Boolean);
      if (!projects.length) return '';

      return `
        <section class="section" data-section="projects">
          <div class="section-heading">
            <h2>${this.escapeHtml(i18n.projects)}</h2>
          </div>
          <div class="section-body stack">
            ${projects.map((item, index) => {
              const entryId = this.escapeHtml(item.id || `project-${index}`);
              const name = this.escapeHtml(item.name);
              const description = this.escapeHtml(item.description);
              const technologies = this.safeArr(item.technologies)
                .map((tech) => this.safeStr(tech).trim())
                .filter(Boolean);
              const url = this.safeStr(item.url).trim();

              return `
                <article class="entry compact" data-entry-id="${entryId}">
                  <div class="entry-head single-line">
                    ${name ? `<h3>${name}</h3>` : ''}
                    ${url ? `<div class="project-link">${this.escapeHtml(url)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${description}</p>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map((tech) => `<span class="tag">${this.escapeHtml(tech)}</span>`).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements(data, i18n) {
      const achievements = this.safeArr(data.achievements).filter(Boolean);
      if (!achievements.length) return '';

      return `
        <section class="section" data-section="achievements">
          <div class="section-heading">
            <h2>${this.escapeHtml(i18n.achievements)}</h2>
          </div>
          <div class="section-body stack">
            ${achievements.map((item, index) => {
              const entryId = this.escapeHtml(item.id || `achievement-${index}`);
              const title = this.escapeHtml(item.title);
              const description = this.escapeHtml(item.description);
              const year = this.safeStr(item.year).trim();

              return `
                <article class="entry compact" data-entry-id="${entryId}">
                  <div class="entry-head single-line">
                    ${title ? `<h3>${title}</h3>` : ''}
                    ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${description}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducation(data, i18n, lang) {
      const education = this.safeArr(data.education).filter(Boolean);
      if (!education.length) return '';

      return `
        <section class="section" data-section="education">
          <div class="section-heading">
            <h2>${this.escapeHtml(i18n.education)}</h2>
          </div>
          <div class="section-body stack">
            ${education.map((item, index) => {
              const entryId = this.escapeHtml(item.id || `education-${index}`);
              const degree = this.escapeHtml(item.degree);
              const field = this.escapeHtml(item.field);
              const institution = this.escapeHtml(item.institution);
              const gpa = this.safeStr(item.gpa).trim();
              const range = this.formatDateRange(item.startDate, item.endDate, item.isCompleted === false, lang);

              const titleParts = [degree, field].filter(Boolean).join(degree && field ? ' — ' : '');

              return `
                <article class="entry" data-entry-id="${entryId}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${titleParts ? `<h3>${titleParts}</h3>` : ''}
                      ${institution ? `<div class="entry-sub">${institution}${gpa ? ` · GPA: ${this.escapeHtml(gpa)}` : ''}</div>` : (gpa ? `<div class="entry-sub">GPA: ${this.escapeHtml(gpa)}</div>` : '')}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(data, i18n, lang) {
      const certifications = this.safeArr(data.certifications).filter(Boolean);
      if (!certifications.length) return '';

      return `
        <section class="section" data-section="certifications">
          <div class="section-heading">
            <h2>${this.escapeHtml(i18n.certifications)}</h2>
          </div>
          <div class="section-body stack">
            ${certifications.map((item, index) => {
              const entryId = this.escapeHtml(item.id || `certification-${index}`);
              const name = this.escapeHtml(item.name);
              const issuer = this.escapeHtml(item.issuer);
              const date = item.date ? this.formatDateShort(item.date, lang) : '';

              return `
                <article class="entry compact" data-entry-id="${entryId}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${name ? `<h3>${name}</h3>` : ''}
                      ${issuer ? `<div class="entry-sub">${issuer}</div>` : ''}
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

    renderLanguages(data, i18n) {
      const languages = this.safeArr(data.languages).filter(Boolean);
      if (!languages.length) return '';

      return `
        <section class="section" data-section="languages">
          <div class="section-heading">
            <h2>${this.escapeHtml(i18n.languages)}</h2>
          </div>
          <div class="section-body">
            <div class="language-list">
              ${languages.map((item, index) => {
                const entryId = this.escapeHtml(item.id || `language-${index}`);
                const name = this.escapeHtml(item.name);
                const levelKey = this.safeStr(item.level).trim().toLowerCase();
                const levelLabel = this.escapeHtml(i18n.levelMap[levelKey] || levelKey);

                return `
                  <div class="language-item" data-entry-id="${entryId}">
                    <span class="language-name">${name}</span>
                    <span class="language-sep">—</span>
                    <span class="language-level">${levelLabel}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </section>
      `;
    }

    render() {
      if (!this.shadowRoot) return;

      const data = this._data || {};
      const lang = this.getLanguage();
      const i18n = this.getI18n(lang);

      this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

          :host {
            display: block;
            color: #f4f1ea;
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
            padding: 22mm 18mm 18mm;
            background:
              linear-gradient(180deg, #121816 0%, #0f1312 100%);
            color: #f4f1ea;
            font-family: "Inter", Arial, sans-serif;
            line-height: 1.45;
          }

          .hero {
            position: relative;
            padding: 0 0 18px;
            margin-bottom: 22px;
            border-bottom: 1px solid rgba(214, 158, 46, 0.35);
          }

          .hero::before {
            content: "";
            display: block;
            width: 100%;
            height: 8px;
            margin-bottom: 18px;
            background: linear-gradient(90deg, #d69e2e 0%, #8aa17d 50%, rgba(138, 161, 125, 0.15) 100%);
            border-radius: 999px;
          }

          .eyebrow {
            font-family: "Oswald", Arial, sans-serif;
            text-transform: uppercase;
            letter-spacing: 1.8px;
            color: #d69e2e;
            font-size: 13px;
            margin-bottom: 8px;
          }

          .name {
            margin: 0;
            font-family: "Oswald", Arial, sans-serif;
            font-size: 40px;
            line-height: 0.98;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            color: #ffffff;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 10px;
            margin-top: 14px;
          }

          .contact-item {
            display: inline-flex;
            align-items: center;
            padding: 6px 10px;
            border: 1px solid rgba(255,255,255,0.09);
            background: rgba(255,255,255,0.03);
            color: #d7ddd8;
            border-radius: 999px;
            font-size: 12px;
          }

          .section {
            margin-bottom: 20px;
          }

          .section-heading {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 10px;
          }

          .section-heading h2 {
            margin: 0;
            font-family: "Oswald", Arial, sans-serif;
            font-size: 21px;
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            color: #f0ad2c;
            white-space: nowrap;
          }

          .section-heading::after {
            content: "";
            flex: 1;
            height: 1px;
            background: linear-gradient(90deg, rgba(214,158,46,0.55), rgba(255,255,255,0.08));
          }

          .profile-text,
          .entry-text {
            margin: 0;
            color: #d6d9d5;
            font-size: 13px;
          }

          .stack {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            padding: 12px 14px;
            background: rgba(255,255,255,0.025);
            border: 1px solid rgba(255,255,255,0.06);
            border-left: 3px solid #8aa17d;
            border-radius: 8px;
          }

          .entry.compact {
            padding-top: 10px;
            padding-bottom: 10px;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
          }

          .entry-head.single-line {
            align-items: baseline;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry h3 {
            margin: 0;
            font-size: 15px;
            line-height: 1.25;
            color: #ffffff;
            font-weight: 700;
          }

          .entry-sub {
            margin-top: 4px;
            font-size: 12px;
            color: #b9c1bb;
          }

          .entry-date,
          .project-link {
            flex: 0 0 auto;
            font-size: 11px;
            color: #d69e2e;
            text-align: right;
            white-space: nowrap;
          }

          .bullet-list {
            margin: 10px 0 0;
            padding: 0 0 0 18px;
            color: #d6d9d5;
            font-size: 13px;
          }

          .bullet-list li {
            margin: 4px 0;
          }

          .pill-grid,
          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .pill,
          .tag {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 6px 11px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 600;
          }

          .pill {
            background: rgba(214, 158, 46, 0.12);
            color: #f4e1b3;
            border: 1px solid rgba(214, 158, 46, 0.35);
          }

          .tag {
            background: rgba(138, 161, 125, 0.12);
            color: #d7e3d1;
            border: 1px solid rgba(138, 161, 125, 0.35);
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .language-item {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 10px 12px;
            background: rgba(255,255,255,0.025);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 8px;
            font-size: 13px;
          }

          .language-name {
            color: #ffffff;
            font-weight: 600;
          }

          .language-sep,
          .language-level {
            color: #c8cec9;
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
          ${this.renderProfile(data, i18n)}
          ${this.renderSkills(data, i18n)}
          ${this.renderExperience(data, i18n, lang)}
          ${this.renderProjects(data, i18n)}
          ${this.renderAchievements(data, i18n)}
          ${this.renderEducation(data, i18n, lang)}
          ${this.renderCertifications(data, i18n, lang)}
          ${this.renderLanguages(data, i18n)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-glen-v1')) {
    customElements.define('gqr-resume-glen-v1', GQRResumeGlenV1);
  }
})();