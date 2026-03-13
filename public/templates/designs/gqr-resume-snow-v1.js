(function() {
  'use strict';

  class GQRResumeSnowV1 extends HTMLElement {
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
      const lang = this.getAttribute('language') || (this._data && this._data.language) || 'en';
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
      const d = new Date(raw);
      if (!Number.isNaN(d.getTime())) {
        return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
          month: 'short',
          year: 'numeric'
        }).format(d);
      }

      const match = raw.match(/^(\d{4})-(\d{2})$/);
      if (match) {
        const d2 = new Date(Number(match[1]), Number(match[2]) - 1, 1);
        if (!Number.isNaN(d2.getTime())) {
          return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
            month: 'short',
            year: 'numeric'
          }).format(d2);
        }
      }

      const yearOnly = raw.match(/^\d{4}$/);
      if (yearOnly) return raw;

      return raw;
    }

    formatDateRange(startDate, endDate, isCurrent, lang, presentLabel) {
      const start = this.formatShortDate(startDate, lang);
      const end = isCurrent ? presentLabel : this.formatShortDate(endDate, lang);
      if (start && end) return `${start} — ${end}`;
      return start || end || '';
    }

    formatEducationRange(startDate, endDate, isCompleted, lang, presentLabel) {
      const start = this.formatShortDate(startDate, lang);
      const end = isCompleted === false ? presentLabel : this.formatShortDate(endDate, lang);
      if (start && end) return `${start} — ${end}`;
      return start || end || '';
    }

    renderSectionTitle(title) {
      return `
        <div class="section-heading-wrap">
          <h2 class="section-heading">${this.escapeHtml(title)}</h2>
          <div class="section-rule"></div>
        </div>
      `;
    }

    render() {
      const lang = this.getLanguage();
      const i18n = {
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

      const t = i18n[lang];
      const data = this._data || {};

      const firstName = this.safeStr(data.firstName);
      const lastName = this.safeStr(data.lastName);
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      const profession = this.safeStr(data.profession);
      const email = this.safeStr(data.email);
      const phone = this.safeStr(data.phone);
      const country = this.safeStr(data.country);
      const linkedin = this.safeStr(data.linkedin);
      const summary = this.safeStr(data.summary);

      const skillsRaw = this.safeArr(data.skillsRaw);
      const toolsRaw = this.safeArr(data.toolsRaw);
      const mergedSkills = Array.from(new Set(
        skillsRaw.concat(toolsRaw).map(v => this.safeStr(v).trim()).filter(Boolean)
      ));

      const experience = this.safeArr(data.experience);
      const projects = this.safeArr(data.projects);
      const achievements = this.safeArr(data.achievements);
      const education = this.safeArr(data.education);
      const certifications = this.safeArr(data.certifications);
      const languages = this.safeArr(data.languages);

      const contactItems = [];
      if (email) contactItems.push(`<span class="contact-pill">✉ ${this.escapeHtml(email)}</span>`);
      if (phone) contactItems.push(`<span class="contact-pill">☎ ${this.escapeHtml(phone)}</span>`);
      if (country) contactItems.push(`<span class="contact-pill">⚲ ${this.escapeHtml(country)}</span>`);
      if (linkedin) contactItems.push(`<span class="contact-pill">🔗 ${this.escapeHtml(linkedin)}</span>`);

      const profileSection = summary ? `
        <section class="section" data-section="profile">
          ${this.renderSectionTitle(t.profile)}
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      ` : '';

      const skillsSection = mergedSkills.length ? `
        <section class="section" data-section="skills">
          ${this.renderSectionTitle(t.skills)}
          <div class="skills-grid">
            ${mergedSkills.map((skill, index) => `
              <div class="skill-chip" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</div>
            `).join('')}
          </div>
        </section>
      ` : '';

      const experienceSection = experience.length ? `
        <section class="section" data-section="experience">
          ${this.renderSectionTitle(t.experience)}
          <div class="stack-list">
            ${experience.map((item, index) => {
              const id = this.safeStr(item && item.id) || `experience-${index}`;
              const title = this.safeStr(item && item.title);
              const company = this.safeStr(item && item.company);
              const location = this.safeStr(item && item.location);
              const bullets = this.safeArr(item && item.achievements)
                .concat(this.safeArr(item && item.responsibilities))
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);
              const dateRange = this.formatDateRange(
                item && item.startDate,
                item && item.endDate,
                !!(item && item.isCurrent),
                lang,
                t.present
              );

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${this.escapeHtml([company, location].filter(Boolean).join(' • '))}
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
      ` : '';

      const projectsSection = projects.length ? `
        <section class="section" data-section="projects">
          ${this.renderSectionTitle(t.projects)}
          <div class="stack-list">
            ${projects.map((item, index) => {
              const id = this.safeStr(item && item.id) || `project-${index}`;
              const name = this.safeStr(item && item.name);
              const description = this.safeStr(item && item.description);
              const technologies = this.safeArr(item && item.technologies)
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);
              const url = this.safeStr(item && item.url);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                      ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
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
      ` : '';

      const achievementsSection = achievements.length ? `
        <section class="section" data-section="achievements">
          ${this.renderSectionTitle(t.achievements)}
          <div class="stack-list">
            ${achievements.map((item, index) => {
              const id = this.safeStr(item && item.id) || `achievement-${index}`;
              const title = this.safeStr(item && item.title);
              const description = this.safeStr(item && item.description);
              const year = this.safeStr(item && item.year);

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                    </div>
                    ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const educationSection = education.length ? `
        <section class="section" data-section="education">
          ${this.renderSectionTitle(t.education)}
          <div class="stack-list">
            ${education.map((item, index) => {
              const id = this.safeStr(item && item.id) || `education-${index}`;
              const degree = this.safeStr(item && item.degree);
              const field = this.safeStr(item && item.field);
              const institution = this.safeStr(item && item.institution);
              const gpa = this.safeStr(item && item.gpa);
              const dateRange = this.formatEducationRange(
                item && item.startDate,
                item && item.endDate,
                item && item.isCompleted,
                lang,
                t.present
              );

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${(degree || field) ? `
                        <h3 class="entry-title">${this.escapeHtml([degree, field].filter(Boolean).join(' — '))}</h3>
                      ` : ''}
                      ${institution || gpa ? `
                        <div class="entry-subtitle">
                          ${this.escapeHtml(institution)}${institution && gpa ? ' • ' : ''}${gpa ? this.escapeHtml(`GPA: ${gpa}`) : ''}
                        </div>
                      ` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const certificationsSection = certifications.length ? `
        <section class="section" data-section="certifications">
          ${this.renderSectionTitle(t.certifications)}
          <div class="stack-list">
            ${certifications.map((item, index) => {
              const id = this.safeStr(item && item.id) || `certification-${index}`;
              const name = this.safeStr(item && item.name);
              const issuer = this.safeStr(item && item.issuer);
              const date = this.formatShortDate(item && item.date, lang);

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
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
      ` : '';

      const languagesSection = languages.length ? `
        <section class="section" data-section="languages">
          ${this.renderSectionTitle(t.languages)}
          <div class="language-list">
            ${languages.map((item, index) => {
              const id = this.safeStr(item && item.id) || `language-${index}`;
              const name = this.safeStr(item && item.name);
              const levelKey = this.safeStr(item && item.level).toLowerCase();
              const levelText = t.levelMap[levelKey] || this.safeStr(item && item.level);

              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                  <span class="language-name">${this.escapeHtml(name)}</span>
                  <span class="language-sep">—</span>
                  <span class="language-level">${this.escapeHtml(levelText)}</span>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #1f2937;
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
            color: #243041;
            font-family: Arial, Helvetica, sans-serif;
            padding: 0;
            position: relative;
          }

          .header {
            background: linear-gradient(135deg, #2d3548 0%, #313a4e 100%);
            color: #ffffff;
            padding: 36px 40px 28px;
            position: relative;
            overflow: hidden;
          }

          .header::after {
            content: '';
            position: absolute;
            right: -40px;
            bottom: -26px;
            width: 240px;
            height: 90px;
            background: #94c548;
            transform: rotate(-8deg);
            opacity: 0.95;
          }

          .header-inner {
            position: relative;
            z-index: 1;
          }

          .name {
            margin: 0;
            font-size: 32px;
            line-height: 1.05;
            letter-spacing: 0.8px;
            font-weight: 800;
            text-transform: uppercase;
          }

          .name .accent {
            color: #9ccc4c;
          }

          .profession {
            margin-top: 6px;
            font-size: 14px;
            letter-spacing: 1.8px;
            text-transform: uppercase;
            color: #d7deea;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 10px;
            margin-top: 18px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            padding: 6px 10px;
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 999px;
            background: rgba(255,255,255,0.08);
            color: #f6f8fb;
            font-size: 12px;
            line-height: 1.2;
          }

          .body {
            padding: 28px 40px 36px;
          }

          .section {
            margin: 0 0 22px 0;
          }

          .section:last-child {
            margin-bottom: 0;
          }

          .section-heading-wrap {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
          }

          .section-heading {
            margin: 0;
            flex: 0 0 auto;
            color: #7eae39;
            font-size: 13px;
            line-height: 1.2;
            letter-spacing: 1.8px;
            font-weight: 700;
            text-transform: uppercase;
          }

          .section-rule {
            height: 1px;
            flex: 1 1 auto;
            background: linear-gradient(to right, #a7ca68 0%, #d9e7bf 100%);
          }

          .profile-text,
          .entry-text {
            margin: 0;
            font-size: 12.5px;
            line-height: 1.6;
            color: #334155;
          }

          .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-chip,
          .tag {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 6px 12px;
            border-radius: 999px;
            font-size: 12px;
            line-height: 1.2;
          }

          .skill-chip {
            background: #f5f8ef;
            border: 1px solid #cfe0ad;
            color: #31401f;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
          }

          .tag {
            background: #eef2f7;
            border: 1px solid #d7e0ea;
            color: #324255;
          }

          .stack-list {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            position: relative;
            padding-left: 16px;
            border-left: 2px solid #cfe0ad;
          }

          .entry::before {
            content: '';
            position: absolute;
            left: -5px;
            top: 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #8fbe43;
          }

          .entry.compact {
            padding-bottom: 2px;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 4px;
          }

          .entry-main {
            min-width: 0;
            flex: 1 1 auto;
          }

          .entry-title {
            margin: 0;
            font-size: 14px;
            line-height: 1.35;
            font-weight: 700;
            color: #1f2a37;
          }

          .entry-subtitle,
          .entry-link,
          .entry-date {
            font-size: 12px;
            line-height: 1.45;
          }

          .entry-subtitle {
            color: #5d6a79;
            margin-top: 2px;
          }

          .entry-link {
            color: #5a7798;
            margin-top: 2px;
            word-break: break-word;
          }

          .entry-date {
            color: #6b7280;
            white-space: nowrap;
            flex: 0 0 auto;
            padding-top: 1px;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
            color: #334155;
          }

          .bullet-list li {
            margin: 0 0 4px 0;
            font-size: 12.5px;
            line-height: 1.55;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .language-item {
            display: flex;
            align-items: baseline;
            gap: 6px;
            font-size: 12.5px;
            line-height: 1.5;
          }

          .language-name {
            font-weight: 700;
            color: #243041;
          }

          .language-sep,
          .language-level {
            color: #5b6775;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          <header class="header" data-section="header">
            <div class="header-inner">
              ${fullName ? `
                <h1 class="name">
                  <span class="accent">${this.escapeHtml(firstName)}</span>${firstName && lastName ? ' ' : ''}${this.escapeHtml(lastName)}
                </h1>
              ` : ''}
              ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
              ${contactItems.length ? `
                <div class="contact-row" data-section="contact">
                  ${contactItems.join('')}
                </div>
              ` : ''}
            </div>
          </header>

          <main class="body">
            ${profileSection}
            ${skillsSection}
            ${experienceSection}
            ${projectsSection}
            ${achievementsSection}
            ${educationSection}
            ${certificationsSection}
            ${languagesSection}
          </main>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-snow-v1')) {
    customElements.define('gqr-resume-snow-v1', GQRResumeSnowV1);
  }
})();