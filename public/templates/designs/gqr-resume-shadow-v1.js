(function() {
  'use strict';

  /**
   * name: gqr-resume-shadow-v1
   * description: "Two-column resume with a dark slate sidebar, soft gray main panel, rounded geometric header accents, and clean modern typography inspired by the reference design."
   */

  class GQRResumeShadowV1 extends HTMLElement {
    static get observedAttributes() {
      return ['language'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._data = {};
    }

    get data() {
      return this._data;
    }

    set data(value) {
      this._data = value && typeof value === 'object' ? value : {};
      this.render();
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
      return this.getAttribute('language') || this.data?.language || 'en';
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

    getI18n() {
      return {
        en: {
          profile: 'Profile',
          experience: 'Experience',
          education: 'Education',
          projects: 'Projects',
          certifications: 'Certifications',
          languages: 'Languages',
          achievements: 'Achievements',
          skills: 'Skills',
          contact: 'Contact',
          present: 'Present'
        },
        es: {
          profile: 'Sobre mí',
          experience: 'Experiencia',
          education: 'Educación',
          projects: 'Proyectos',
          certifications: 'Certificaciones',
          languages: 'Idiomas',
          achievements: 'Logros',
          skills: 'Habilidades',
          contact: 'Contacto',
          present: 'Presente'
        }
      };
    }

    getLevelMap() {
      return {
        en: {
          basic: 'Basic',
          intermediate: 'Intermediate',
          advanced: 'Advanced',
          native: 'Native'
        },
        es: {
          basic: 'Básico',
          intermediate: 'Intermedio',
          advanced: 'Avanzado',
          native: 'Nativo'
        }
      };
    }

    formatDate(dateStr, lang) {
      const value = this.safeStr(dateStr).trim();
      if (!value) return '';
      const locale = lang === 'es' ? 'es-ES' : 'en-US';

      let date;
      if (/^\d{4}-\d{2}$/.test(value)) {
        date = new Date(value + '-01T00:00:00');
      } else if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        date = new Date(value + 'T00:00:00');
      } else if (/^\d{4}$/.test(value)) {
        return value;
      } else {
        const parsed = new Date(value);
        if (isNaN(parsed.getTime())) return value;
        date = parsed;
      }

      if (isNaN(date.getTime())) return value;

      const formatted = new Intl.DateTimeFormat(locale, {
        month: 'short',
        year: 'numeric'
      }).format(date);

      if (lang === 'es') {
        return formatted.replace('.', '').replace(/^\w/, function(m) { return m.toUpperCase(); });
      }
      return formatted;
    }

    formatDateRange(item, type, lang, t) {
      const start = this.formatDate(this.safeStr(item.startDate), lang);
      let end = '';

      if (type === 'experience') {
        end = item && item.isCurrent ? t.present : this.formatDate(this.safeStr(item.endDate), lang);
      } else if (type === 'education') {
        end = item && item.isCompleted === false ? t.present : this.formatDate(this.safeStr(item.endDate), lang);
      } else if (type === 'project') {
        end = item && item.isOngoing ? t.present : this.formatDate(this.safeStr(item.endDate), lang);
      }

      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderContact(data, t) {
      const email = this.safeStr(data.email).trim();
      const phone = this.safeStr(data.phone).trim();
      const country = this.safeStr(data.country).trim();
      const linkedin = this.safeStr(data.linkedin).trim();

      if (!email && !phone && !country && !linkedin) return '';

      const linkedInDisplay = linkedin
        ? this.escapeHtml(linkedin.replace(/^https?:\/\//i, '').replace(/^www\./i, ''))
        : '';

      const linkedinHref = linkedin
        ? (/^https?:\/\//i.test(linkedin) ? linkedin : 'https://' + linkedin.replace(/^@/, 'linkedin.com/in/'))
        : '';

      return `
        <section class="section side-section contact-section" data-section="contact">
          <h3 class="section-title">${this.escapeHtml(t.contact)}</h3>
          <div class="contact-list">
            ${email ? `<div class="contact-item"><span class="bullet">◆</span><span>${this.escapeHtml(email)}</span></div>` : ''}
            ${phone ? `<div class="contact-item"><span class="bullet">◆</span><span>${this.escapeHtml(phone)}</span></div>` : ''}
            ${country ? `<div class="contact-item"><span class="bullet">◆</span><span>${this.escapeHtml(country)}</span></div>` : ''}
            ${linkedin ? `<div class="contact-item"><span class="bullet">◆</span><span>${linkedinHref ? `<a href="${this.escapeHtml(linkedinHref)}" target="_blank" rel="noopener noreferrer">${linkedInDisplay}</a>` : linkedInDisplay}</span></div>` : ''}
          </div>
        </section>
      `;
    }

    renderLanguages(data, t, lang) {
      const levelMap = this.getLevelMap()[lang] || this.getLevelMap().en;
      const items = this.safeArr(data.languages).filter(function(item) {
        return item && (item.name || item.level);
      });
      if (!items.length) return '';

      return `
        <section class="section side-section" data-section="languages">
          <h3 class="section-title">${this.escapeHtml(t.languages)}</h3>
          <div class="lang-list">
            ${items.map((item) => {
              const name = this.escapeHtml(this.safeStr(item.name));
              const rawLevel = this.safeStr(item.level).toLowerCase();
              const level = this.escapeHtml(levelMap[rawLevel] || this.safeStr(item.level));
              return `
                <div class="lang-item" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="lang-name">${name}</div>
                  ${level ? `<div class="lang-level">${level}</div>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderSkills(data, t) {
      const merged = []
        .concat(this.safeArr(data.skillsRaw))
        .concat(this.safeArr(data.toolsRaw))
        .map((s) => this.safeStr(s).trim())
        .filter(Boolean);

      const deduped = Array.from(new Set(merged));
      if (!deduped.length) return '';

      return `
        <section class="section side-section" data-section="skills">
          <h3 class="section-title">${this.escapeHtml(t.skills)}</h3>
          <div class="skills-wrap">
            ${deduped.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderHeader(data) {
      const firstName = this.safeStr(data.firstName).trim();
      const lastName = this.safeStr(data.lastName).trim();
      const profession = this.safeStr(data.profession).trim();
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      if (!fullName && !profession) return '';

      return `
        <section class="header-card" data-section="header">
          <div class="header-accent"></div>
          <div class="header-content">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
          <div class="header-dots" aria-hidden="true">
            <span></span><span></span><span></span>
            <span></span><span></span><span></span>
          </div>
        </section>
      `;
    }

    renderProfile(data, t) {
      const summary = this.safeStr(data.summary).trim();
      if (!summary) return '';

      return `
        <section class="section main-section" data-section="profile">
          <h2 class="section-title main-title">${this.escapeHtml(t.profile)}</h2>
          <p class="summary">${this.escapeHtml(summary)}</p>
        </section>
      `;
    }

    renderExperience(data, t, lang) {
      const items = this.safeArr(data.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="experience">
          <h2 class="section-title main-title">${this.escapeHtml(t.experience)}</h2>
          <div class="entries">
            ${items.map((item) => {
              const title = this.safeStr(item.title).trim();
              const company = this.safeStr(item.company).trim();
              const location = this.safeStr(item.location).trim();
              const dateRange = this.formatDateRange(item, 'experience', lang, t);
              const bullets = []
                .concat(this.safeArr(item.achievements))
                .concat(this.safeArr(item.responsibilities))
                .map((x) => this.safeStr(x).trim())
                .filter(Boolean);

              if (!title && !company && !location && !dateRange && !bullets.length) return '';

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="entry-head">
                    <div>
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${company ? `<span>${this.escapeHtml(company)}</span>` : ''}
                          ${company && location ? `<span class="sep">•</span>` : ''}
                          ${location ? `<span>${this.escapeHtml(location)}</span>` : ''}
                        </div>
                      ` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
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

    renderProjects(data, t, lang) {
      const items = this.safeArr(data.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          <h2 class="section-title main-title">${this.escapeHtml(t.projects)}</h2>
          <div class="entries compact-grid">
            ${items.map((item) => {
              const name = this.safeStr(item.name).trim();
              const description = this.safeStr(item.description).trim();
              const technologies = this.safeArr(item.technologies).map((x) => this.safeStr(x).trim()).filter(Boolean);
              const url = this.safeStr(item.url).trim();
              const dateRange = this.formatDateRange(item, 'project', lang, t);

              if (!name && !description && !technologies.length && !url && !dateRange) return '';

              return `
                <article class="entry project-entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="entry-head">
                    ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : '<div></div>'}
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map((tech) => `<span class="tag">${this.escapeHtml(tech)}</span>`).join('')}
                    </div>
                  ` : ''}
                  ${url ? `
                    <div class="entry-link">
                      <a href="${this.escapeHtml(/^https?:\/\//i.test(url) ? url : 'https://' + url)}" target="_blank" rel="noopener noreferrer">${this.escapeHtml(url.replace(/^https?:\/\//i, ''))}</a>
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements(data, t) {
      const items = this.safeArr(data.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          <h2 class="section-title main-title">${this.escapeHtml(t.achievements)}</h2>
          <div class="entries">
            ${items.map((item) => {
              const title = this.safeStr(item.title).trim();
              const description = this.safeStr(item.description).trim();
              const year = this.safeStr(item.year).trim();

              if (!title && !description && !year) return '';

              return `
                <article class="entry simple-entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="entry-head">
                    ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : '<div></div>'}
                    ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducation(data, t, lang) {
      const items = this.safeArr(data.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="education">
          <h2 class="section-title main-title">${this.escapeHtml(t.education)}</h2>
          <div class="entries">
            ${items.map((item) => {
              const institution = this.safeStr(item.institution).trim();
              const degree = this.safeStr(item.degree).trim();
              const field = this.safeStr(item.field).trim();
              const gpa = this.safeStr(item.gpa).trim();
              const dateRange = this.formatDateRange(item, 'education', lang, t);

              if (!institution && !degree && !field && !gpa && !dateRange) return '';

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="entry-head">
                    <div>
                      ${degree || field ? `<h3 class="entry-title">${this.escapeHtml([degree, field].filter(Boolean).join(degree && field ? ' — ' : ''))}</h3>` : ''}
                      ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${gpa ? `<p class="entry-text">GPA: ${this.escapeHtml(gpa)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(data, t) {
      const items = this.safeArr(data.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          <h2 class="section-title main-title">${this.escapeHtml(t.certifications)}</h2>
          <div class="entries compact-grid">
            ${items.map((item) => {
              const name = this.safeStr(item.name).trim();
              const issuer = this.safeStr(item.issuer).trim();
              const date = this.safeStr(item.date).trim();

              if (!name && !issuer && !date) return '';

              return `
                <article class="entry cert-entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                  ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
                  ${date ? `<div class="entry-date small-date">${this.escapeHtml(date)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    render() {
      const data = this.data || {};
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.getI18n()[lang] || this.getI18n().en;

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #243142;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-family: "Trebuchet MS", "Segoe UI", Arial, sans-serif;
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
            background:
              linear-gradient(180deg, #eceeef 0 34mm, #f7f8fa 34mm 100%);
            position: relative;
            display: grid;
            grid-template-columns: 35% 65%;
            gap: 0;
            padding: 20mm 10mm 12mm 10mm;
          }

          .page::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 52mm;
            height: 44mm;
            background: #314259;
            border-bottom-right-radius: 18mm;
            z-index: 0;
          }

          .page::after {
            content: "";
            position: absolute;
            right: 12mm;
            top: 68mm;
            width: 24mm;
            height: 20mm;
            background-image:
              radial-gradient(circle at 2px 2px, transparent 0 1px, #9fb0c6 1px 2px, transparent 2px),
              radial-gradient(circle at 10px 10px, transparent 0 1px, #9fb0c6 1px 2px, transparent 2px);
            background-size: 12px 12px;
            opacity: 0.8;
            z-index: 0;
          }

          .sidebar,
          .main,
          .header-card {
            position: relative;
            z-index: 1;
          }

          .sidebar {
            padding-top: 50mm;
            padding-right: 7mm;
          }

          .main {
            padding-left: 7mm;
            padding-top: 26mm;
          }

          .header-card {
            position: absolute;
            top: 14mm;
            left: 28mm;
            right: 10mm;
            min-height: 42mm;
            background: #314259;
            color: #fff;
            border-radius: 0 8mm 8mm 8mm;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10mm 14mm 9mm 34mm;
            overflow: hidden;
          }

          .header-accent {
            position: absolute;
            left: 8mm;
            top: 50%;
            transform: translateY(-50%);
            width: 22mm;
            height: 22mm;
            border: 3px solid rgba(255,255,255,0.9);
            border-radius: 50%;
            background:
              radial-gradient(circle at 35% 35%, #7f90a8 0%, #45566f 45%, #233246 100%);
            box-shadow: 0 0 0 2px rgba(255,255,255,0.12) inset;
          }

          .header-content {
            flex: 1;
            min-width: 0;
          }

          .name {
            margin: 0;
            font-size: 13pt;
            line-height: 1.1;
            font-weight: 800;
            letter-spacing: 0.4px;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 3mm;
            font-size: 8.8pt;
            font-weight: 500;
            color: rgba(255,255,255,0.92);
          }

          .header-dots {
            display: grid;
            grid-template-columns: repeat(3, 5mm);
            gap: 3mm;
            margin-left: 8mm;
            opacity: 0.85;
          }

          .header-dots span {
            width: 5mm;
            height: 5mm;
            border: 1px solid rgba(255,255,255,0.35);
            border-radius: 1.2mm;
            display: block;
          }

          .section {
            margin-bottom: 7mm;
          }

          .section-title {
            margin: 0 0 3.2mm 0;
            font-size: 9.4pt;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.3px;
            color: #314259;
          }

          .main-title {
            font-size: 10pt;
            position: relative;
            padding-bottom: 1.8mm;
          }

          .main-title::after {
            content: "";
            display: block;
            width: 100%;
            height: 0.8mm;
            background: linear-gradient(90deg, #314259 0 32mm, #cfd6df 32mm 100%);
            margin-top: 1.4mm;
            border-radius: 999px;
          }

          .side-section {
            background: rgba(255,255,255,0.55);
            border-radius: 5mm;
            padding: 4.2mm 4mm;
            box-shadow: 0 0 0 0.3mm rgba(49,66,89,0.05) inset;
          }

          .contact-list,
          .lang-list {
            display: flex;
            flex-direction: column;
            gap: 2.6mm;
          }

          .contact-item,
          .lang-item {
            font-size: 8pt;
            line-height: 1.45;
            color: #334154;
          }

          .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 2mm;
          }

          .contact-item a {
            color: inherit;
            text-decoration: none;
            word-break: break-word;
          }

          .bullet {
            color: #d36b7a;
            font-size: 7pt;
            line-height: 1.7;
            flex: 0 0 auto;
          }

          .lang-name {
            font-weight: 700;
            color: #2d3a4d;
          }

          .lang-level {
            color: #657387;
            font-size: 7.6pt;
            margin-top: 0.6mm;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 1.8mm;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            font-size: 7.5pt;
            line-height: 1.2;
            padding: 1.5mm 2.4mm;
            border-radius: 999px;
            background: #314259;
            color: #fff;
            border: 0.3mm solid rgba(255,255,255,0.2);
          }

          .summary,
          .entry-text,
          .entry-subtitle,
          .bullet-list li {
            font-size: 8pt;
            line-height: 1.5;
            color: #445264;
          }

          .summary {
            margin: 0;
          }

          .entries {
            display: flex;
            flex-direction: column;
            gap: 4mm;
          }

          .entry {
            position: relative;
          }

          .timeline-entry {
            padding-left: 4mm;
            border-left: 1mm solid #d9dee5;
          }

          .timeline-entry::before {
            content: "";
            position: absolute;
            left: -1.75mm;
            top: 1mm;
            width: 2.5mm;
            height: 2.5mm;
            border-radius: 50%;
            background: #314259;
            box-shadow: 0 0 0 1mm #eef1f4;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4mm;
            margin-bottom: 1.2mm;
          }

          .entry-title {
            margin: 0;
            font-size: 8.8pt;
            line-height: 1.25;
            font-weight: 800;
            color: #233246;
          }

          .entry-subtitle {
            margin: 0.6mm 0 0 0;
          }

          .sep {
            padding: 0 1.3mm;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 7.4pt;
            line-height: 1.2;
            color: #6a788c;
            font-weight: 700;
            text-align: right;
            white-space: nowrap;
          }

          .small-date {
            margin-top: 1.2mm;
          }

          .entry-text {
            margin: 0.8mm 0 0 0;
          }

          .bullet-list {
            margin: 1.2mm 0 0 0;
            padding-left: 4.5mm;
          }

          .bullet-list li {
            margin: 0.8mm 0;
          }

          .compact-grid {
            gap: 3.2mm;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 1.6mm;
            margin-top: 1.6mm;
          }

          .tag {
            font-size: 7.2pt;
            line-height: 1.2;
            padding: 1.1mm 2mm;
            border-radius: 999px;
            background: #e3e8ee;
            color: #314259;
            white-space: nowrap;
          }

          .entry-link {
            margin-top: 1.4mm;
            font-size: 7.5pt;
          }

          .entry-link a {
            color: #314259;
            text-decoration: none;
            border-bottom: 0.2mm solid rgba(49,66,89,0.25);
            word-break: break-word;
          }

          .cert-entry {
            background: rgba(255,255,255,0.55);
            border-radius: 4mm;
            padding: 3mm 3.2mm;
            border: 0.3mm solid rgba(49,66,89,0.08);
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

          <div class="sidebar">
            ${this.renderContact(data, t)}
            ${this.renderLanguages(data, t, lang)}
            ${this.renderSkills(data, t)}
          </div>

          <div class="main">
            ${this.renderProfile(data, t)}
            ${this.renderExperience(data, t, lang)}
            ${this.renderProjects(data, t, lang)}
            ${this.renderAchievements(data, t)}
            ${this.renderEducation(data, t, lang)}
            ${this.renderCertifications(data, t)}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-shadow-v1')) {
    customElements.define('gqr-resume-shadow-v1', GQRResumeShadowV1);
  }
})();