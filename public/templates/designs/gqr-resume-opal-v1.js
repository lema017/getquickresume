(function() {
  'use strict';

  /**
   * name: gqr-resume-opal-v1
   * description: "Two-column vintage-inspired resume with parchment tones, ornate serif headings, dark sepia sidebar, and decorative old-document styling."
   */

  class GQRResumeOpalV1 extends HTMLElement {
    static get observedAttributes() {
      return ['language'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._data = {};
      this.i18n = {
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
          profile: 'Perfil',
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
      this.levelMap = {
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

    attributeChangedCallback() {
      this.render();
    }

    getLanguage() {
      return this.getAttribute('language') || this.data?.language || 'en';
    }

    safeStr(v) {
      return typeof v === 'string' ? v : (v == null ? '' : String(v));
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
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const ym = raw.match(/^(\d{4})-(\d{2})$/);
      if (ym) {
        const year = ym[1];
        const monthIndex = parseInt(ym[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) return months[monthIndex] + ' ' + year;
      }

      const ymd = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (ymd) {
        const year = ymd[1];
        const monthIndex = parseInt(ymd[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) return months[monthIndex] + ' ' + year;
      }

      const y = raw.match(/^(\d{4})$/);
      if (y) return y[1];

      return raw;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const start = this.formatShortDate(startDate, lang);
      const end = isCurrentLike ? t.present : this.formatShortDate(endDate, lang);

      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `<div class="section-title"><span>${this.escapeHtml(title)}</span></div>`;
    }

    render() {
      const data = this.data || {};
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const levelMap = this.levelMap[lang];

      const firstName = this.safeStr(data.firstName);
      const lastName = this.safeStr(data.lastName);
      const profession = this.safeStr(data.profession);
      const summary = this.safeStr(data.summary);
      const email = this.safeStr(data.email);
      const phone = this.safeStr(data.phone);
      const country = this.safeStr(data.country);
      const linkedin = this.safeStr(data.linkedin);

      const experience = this.safeArr(data.experience);
      const education = this.safeArr(data.education);
      const projects = this.safeArr(data.projects);
      const certifications = this.safeArr(data.certifications);
      const languages = this.safeArr(data.languages);
      const achievements = this.safeArr(data.achievements);

      const mergedSkills = Array.from(
        new Set(
          [...this.safeArr(data.skillsRaw), ...this.safeArr(data.toolsRaw)]
            .map(v => this.safeStr(v).trim())
            .filter(Boolean)
        )
      );

      const contactItems = [
        email ? `<div class="contact-item"><span class="label">✉</span><span>${this.escapeHtml(email)}</span></div>` : '',
        phone ? `<div class="contact-item"><span class="label">☎</span><span>${this.escapeHtml(phone)}</span></div>` : '',
        country ? `<div class="contact-item"><span class="label">⌂</span><span>${this.escapeHtml(country)}</span></div>` : '',
        linkedin ? `<div class="contact-item"><span class="label">↗</span><span>${this.escapeHtml(linkedin)}</span></div>` : ''
      ].filter(Boolean).join('');

      const languagesHtml = languages.length ? `
        <section class="section sidebar-section" data-section="languages">
          ${this.renderSectionTitle(t.languages)}
          <div class="section-body">
            ${languages.map((item, index) => {
              const id = this.safeStr(item && item.id) || `lang-${index}`;
              const name = this.safeStr(item && item.name);
              const levelKey = this.safeStr(item && item.level).toLowerCase();
              const level = levelMap[levelKey] || this.safeStr(item && item.level);
              return `
                <div class="lang-item" data-entry-id="${this.escapeHtml(id)}">
                  <div class="lang-name">${this.escapeHtml(name)}</div>
                  <div class="lang-level">${this.escapeHtml(level)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const skillsHtml = mergedSkills.length ? `
        <section class="section sidebar-section" data-section="skills">
          ${this.renderSectionTitle(t.skills)}
          <div class="section-body">
            <div class="skills-wrap">
              ${mergedSkills.map((skill, index) => `
                <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
              `).join('')}
            </div>
          </div>
        </section>
      ` : '';

      const contactHtml = contactItems ? `
        <section class="section sidebar-section" data-section="contact">
          ${this.renderSectionTitle(t.contact)}
          <div class="section-body contact-list">${contactItems}</div>
        </section>
      ` : '';

      const headerHtml = `
        <section class="hero" data-section="header">
          <div class="hero-banner">
            <div class="name-wrap">
              <div class="full-name">${this.escapeHtml((firstName + ' ' + lastName).trim())}</div>
              ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
            </div>
          </div>
        </section>
      `;

      const profileHtml = summary ? `
        <section class="section main-section" data-section="profile">
          ${this.renderSectionTitle(t.profile)}
          <div class="section-body">
            <p class="summary">${this.escapeHtml(summary)}</p>
          </div>
        </section>
      ` : '';

      const experienceHtml = experience.length ? `
        <section class="section main-section" data-section="experience">
          ${this.renderSectionTitle(t.experience)}
          <div class="section-body timeline">
            ${experience.map((item, index) => {
              const id = this.safeStr(item && item.id) || `exp-${index}`;
              const title = this.safeStr(item && item.title);
              const company = this.safeStr(item && item.company);
              const location = this.safeStr(item && item.location);
              const dateRange = this.formatDateRange(
                this.safeStr(item && item.startDate),
                this.safeStr(item && item.endDate),
                !!(item && item.isCurrent)
              );
              const bullets = [...this.safeArr(item && item.achievements), ...this.safeArr(item && item.responsibilities)]
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                      ${(company || location) ? `<div class="entry-subtitle">${this.escapeHtml([company, location].filter(Boolean).join(' • '))}</div>` : ''}
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

      const projectsHtml = projects.length ? `
        <section class="section main-section" data-section="projects">
          ${this.renderSectionTitle(t.projects)}
          <div class="section-body">
            ${projects.map((item, index) => {
              const id = this.safeStr(item && item.id) || `proj-${index}`;
              const name = this.safeStr(item && item.name);
              const description = this.safeStr(item && item.description);
              const technologies = this.safeArr(item && item.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const url = this.safeStr(item && item.url);
              const dateRange = this.formatDateRange(
                this.safeStr(item && item.startDate),
                this.safeStr(item && item.endDate),
                !!(item && item.isOngoing)
              );

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
                      ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                      ${url ? `<div class="entry-subtitle">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `<div class="tag-row">${technologies.map(tag => `<span class="tag">${this.escapeHtml(tag)}</span>`).join('')}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const achievementsHtml = achievements.length ? `
        <section class="section main-section" data-section="achievements">
          ${this.renderSectionTitle(t.achievements)}
          <div class="section-body">
            ${achievements.map((item, index) => {
              const id = this.safeStr(item && item.id) || `ach-${index}`;
              const title = this.safeStr(item && item.title);
              const description = this.safeStr(item && item.description);
              const year = this.safeStr(item && item.year);

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}</div>
                    ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const educationHtml = education.length ? `
        <section class="section main-section" data-section="education">
          ${this.renderSectionTitle(t.education)}
          <div class="section-body">
            ${education.map((item, index) => {
              const id = this.safeStr(item && item.id) || `edu-${index}`;
              const institution = this.safeStr(item && item.institution);
              const degree = this.safeStr(item && item.degree);
              const field = this.safeStr(item && item.field);
              const gpa = this.safeStr(item && item.gpa);
              const dateRange = this.formatDateRange(
                this.safeStr(item && item.startDate),
                this.safeStr(item && item.endDate),
                item && item.isCompleted === false
              );
              const degreeField = [degree, field].filter(Boolean).join(field && degree ? ' — ' : '');

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
                      ${degreeField ? `<div class="entry-title">${this.escapeHtml(degreeField)}</div>` : ''}
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
      ` : '';

      const certificationsHtml = certifications.length ? `
        <section class="section main-section" data-section="certifications">
          ${this.renderSectionTitle(t.certifications)}
          <div class="section-body">
            ${certifications.map((item, index) => {
              const id = this.safeStr(item && item.id) || `cert-${index}`;
              const name = this.safeStr(item && item.name);
              const issuer = this.safeStr(item && item.issuer);
              const date = this.safeStr(item && item.date);

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
                      ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                      ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
                    </div>
                    ${date ? `<div class="entry-date">${this.escapeHtml(this.formatShortDate(date, lang))}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2f2419;
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
            background:
              radial-gradient(circle at top left, rgba(120, 86, 44, 0.05), transparent 26%),
              radial-gradient(circle at bottom right, rgba(120, 86, 44, 0.04), transparent 24%),
              linear-gradient(180deg, #f3ead5 0%, #efe3cb 100%);
            border: 1.5mm solid #5b432b;
            box-shadow: 0 0 0 1px rgba(91, 67, 43, 0.18) inset;
            position: relative;
            display: grid;
            grid-template-columns: 34% 66%;
            grid-template-areas:
              "header header"
              "sidebar main";
            font-family: Georgia, "Times New Roman", serif;
          }

          .page::before,
          .page::after {
            content: "";
            position: absolute;
            pointer-events: none;
            border: 1px solid rgba(91, 67, 43, 0.35);
          }

          .page::before {
            inset: 7mm;
          }

          .page::after {
            inset: 11mm;
          }

          .hero {
            grid-area: header;
            padding: 12mm 12mm 7mm 12mm;
            position: relative;
          }

          .hero-banner {
            background: linear-gradient(180deg, #4a3422 0%, #2f2014 100%);
            color: #f5e9d0;
            padding: 10mm 12mm 8mm;
            border: 1px solid #24170e;
            box-shadow:
              0 0 0 1px rgba(255,255,255,0.08) inset,
              0 2mm 4mm rgba(0,0,0,0.08);
            position: relative;
            text-align: center;
          }

          .hero-banner::before,
          .hero-banner::after {
            content: "✦";
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            color: #d5b789;
            font-size: 14px;
            letter-spacing: 2px;
          }

          .hero-banner::before { left: 6mm; }
          .hero-banner::after { right: 6mm; }

          .name-wrap {
            border-top: 1px solid rgba(213, 183, 137, 0.45);
            border-bottom: 1px solid rgba(213, 183, 137, 0.45);
            padding: 4mm 0;
          }

          .full-name {
            font-size: 10mm;
            line-height: 1;
            letter-spacing: 1px;
            text-transform: uppercase;
            font-weight: 700;
          }

          .profession {
            margin-top: 2.5mm;
            font-size: 4.2mm;
            letter-spacing: 1.4px;
            text-transform: uppercase;
            color: #ead9b8;
          }

          .sidebar {
            grid-area: sidebar;
            padding: 6mm 7mm 12mm 10mm;
            background:
              linear-gradient(180deg, rgba(89, 64, 41, 0.98) 0%, rgba(74, 52, 34, 0.98) 100%);
            color: #f2e5cf;
            border-right: 1px solid rgba(61, 43, 28, 0.45);
            position: relative;
          }

          .sidebar::after {
            content: "";
            position: absolute;
            top: 10mm;
            bottom: 10mm;
            right: 3mm;
            width: 1px;
            background: linear-gradient(180deg, transparent, rgba(215, 187, 143, 0.55), transparent);
          }

          .main {
            grid-area: main;
            padding: 6mm 10mm 12mm 8mm;
            color: #2e2218;
          }

          .section {
            margin-bottom: 7mm;
            position: relative;
          }

          .section-title {
            display: flex;
            align-items: center;
            gap: 3mm;
            margin: 0 0 3.5mm 0;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 4.1mm;
            font-weight: 700;
          }

          .section-title::before,
          .section-title::after {
            content: "";
            height: 1px;
            flex: 1;
            background: currentColor;
            opacity: 0.45;
          }

          .section-title span {
            white-space: nowrap;
          }

          .sidebar .section-title {
            color: #f3dfbd;
          }

          .main .section-title {
            color: #3f2c1c;
          }

          .section-body {
            font-size: 3.25mm;
            line-height: 1.5;
          }

          .contact-list {
            display: grid;
            gap: 2.5mm;
          }

          .contact-item {
            display: grid;
            grid-template-columns: 6mm 1fr;
            gap: 1.5mm;
            align-items: start;
            word-break: break-word;
          }

          .contact-item .label {
            color: #d8bd91;
            font-weight: 700;
            text-align: center;
          }

          .lang-item {
            padding: 2.5mm 0;
            border-bottom: 1px dashed rgba(242, 229, 207, 0.22);
          }

          .lang-item:last-child {
            border-bottom: none;
          }

          .lang-name {
            font-weight: 700;
            color: #fff2db;
          }

          .lang-level {
            font-size: 3mm;
            color: #dcc7a2;
            margin-top: 0.5mm;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            border: 1px solid rgba(230, 205, 168, 0.45);
            padding: 1.4mm 2.6mm;
            border-radius: 999px;
            background: rgba(255, 245, 226, 0.08);
            color: #f8ead2;
            font-size: 2.9mm;
            line-height: 1.2;
          }

          .summary {
            margin: 0;
            text-align: justify;
          }

          .entry {
            margin-bottom: 5mm;
            padding-left: 4mm;
            position: relative;
          }

          .timeline .entry::before {
            content: "";
            position: absolute;
            left: 0;
            top: 1.7mm;
            bottom: -3mm;
            width: 1px;
            background: rgba(91, 67, 43, 0.28);
          }

          .timeline .entry::after {
            content: "";
            position: absolute;
            left: -1.1mm;
            top: 1.5mm;
            width: 3mm;
            height: 3mm;
            border-radius: 50%;
            background: #5b432b;
            box-shadow: 0 0 0 1px #d9c09a inset;
          }

          .entry.compact {
            padding-left: 0;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4mm;
            margin-bottom: 1.5mm;
          }

          .entry-title {
            font-weight: 700;
            color: #2f2217;
            font-size: 3.5mm;
          }

          .entry-subtitle {
            color: #6a533d;
            font-style: italic;
            margin-top: 0.4mm;
          }

          .entry-date {
            white-space: nowrap;
            color: #6c553d;
            font-size: 3mm;
            text-align: right;
          }

          .entry-text {
            margin: 0;
          }

          .bullet-list {
            margin: 0;
            padding-left: 4.5mm;
          }

          .bullet-list li {
            margin: 1mm 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2mm;
          }

          .tag {
            display: inline-block;
            font-size: 2.8mm;
            padding: 1mm 2mm;
            border: 1px solid rgba(91, 67, 43, 0.28);
            background: rgba(91, 67, 43, 0.05);
            border-radius: 999px;
            color: #533c27;
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
          <div class="sidebar">
            ${contactHtml}
            ${languagesHtml}
            ${skillsHtml}
          </div>
          <div class="main">
            ${profileHtml}
            ${experienceHtml}
            ${projectsHtml}
            ${achievementsHtml}
            ${educationHtml}
            ${certificationsHtml}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-opal-v1')) {
    customElements.define('gqr-resume-opal-v1', GQRResumeOpalV1);
  }
})();