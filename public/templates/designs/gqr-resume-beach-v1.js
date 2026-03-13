(function() {
  'use strict';

  /**
   * name: gqr-resume-beach-v1
   * description: "Two-column resume with a torn-paper inspired dark sidebar, clean light main panel, handwritten-style section accents, and bold modern typography."
   */

  class GQRResumeBeachV1 extends HTMLElement {
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

    formatDate(dateStr, lang) {
      const value = this.safeStr(dateStr).trim();
      if (!value) return '';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      if (/^\d{4}$/.test(value)) return value;

      const m = value.match(/^(\d{4})-(\d{2})$/);
      if (m) {
        const year = m[1];
        const monthIndex = Math.max(0, Math.min(11, parseInt(m[2], 10) - 1));
        return months[monthIndex] + ' ' + year;
      }

      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        return months[d.getMonth()] + ' ' + d.getFullYear();
      }

      return value;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const start = this.formatDate(startDate, lang);
      const end = isCurrentLike ? t.present : this.formatDate(endDate, lang);

      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderContact(lang, t) {
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

      if (!email && !phone && !country && !linkedin) return '';

      const contactItems = [
        email ? `<div class="contact-item"><span class="contact-dot"></span><span>${this.escapeHtml(email)}</span></div>` : '',
        phone ? `<div class="contact-item"><span class="contact-dot"></span><span>${this.escapeHtml(phone)}</span></div>` : '',
        country ? `<div class="contact-item"><span class="contact-dot"></span><span>${this.escapeHtml(country)}</span></div>` : '',
        linkedin ? `<div class="contact-item"><span class="contact-dot"></span><span>${this.escapeHtml(linkedin)}</span></div>` : ''
      ].join('');

      return `
        <section class="section side-section" data-section="contact">
          <h2 class="section-title side-title">${this.escapeHtml(t.contact)}</h2>
          <div class="contact-list">
            ${contactItems}
          </div>
        </section>
      `;
    }

    renderLanguages(lang, t) {
      const items = this.safeArr(this.data?.languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section side-section" data-section="languages">
          <h2 class="section-title side-title">${this.escapeHtml(t.languages)}</h2>
          <div class="stack-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item?.id).trim() || `lang-${index}`;
              const name = this.safeStr(item?.name).trim();
              const levelKey = this.safeStr(item?.level).trim().toLowerCase();
              const level = this.levelMap[lang]?.[levelKey] || this.safeStr(item?.level).trim();
              if (!name && !level) return '';
              return `
                <div class="lang-item" data-entry-id="${this.escapeHtml(id)}">
                  <div class="lang-name">${this.escapeHtml(name)}</div>
                  <div class="lang-level">${this.escapeHtml(level)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderSkills(lang, t) {
      const merged = [...this.safeArr(this.data?.skillsRaw), ...this.safeArr(this.data?.toolsRaw)]
        .map(v => this.safeStr(v).trim())
        .filter(Boolean);

      const deduped = [];
      const seen = new Set();
      merged.forEach(item => {
        const key = item.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          deduped.push(item);
        }
      });

      if (!deduped.length) return '';

      return `
        <section class="section side-section" data-section="skills">
          <h2 class="section-title side-title">${this.escapeHtml(t.skills)}</h2>
          <div class="skills-wrap">
            ${deduped.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderHeader() {
      const firstName = this.safeStr(this.data?.firstName).trim();
      const lastName = this.safeStr(this.data?.lastName).trim();
      const profession = this.safeStr(this.data?.profession).trim();
      const fullName = [firstName, lastName].filter(Boolean).join(' ');

      if (!fullName && !profession) return '';

      return `
        <section class="hero" data-section="header">
          ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
          ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
        </section>
      `;
    }

    renderProfile(lang, t) {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';
      return `
        <section class="section main-section" data-section="profile">
          <h2 class="section-title main-title">${this.escapeHtml(t.profile)}</h2>
          <div class="body-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperience(lang, t) {
      const items = this.safeArr(this.data?.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="experience">
          <h2 class="section-title main-title">${this.escapeHtml(t.experience)}</h2>
          <div class="timeline">
            ${items.map((item, index) => {
              const id = this.safeStr(item?.id).trim() || `exp-${index}`;
              const title = this.safeStr(item?.title).trim();
              const company = this.safeStr(item?.company).trim();
              const location = this.safeStr(item?.location).trim();
              const dateRange = this.formatDateRange(
                this.safeStr(item?.startDate),
                this.safeStr(item?.endDate),
                !!item?.isCurrent
              );
              const bullets = [
                ...this.safeArr(item?.achievements),
                ...this.safeArr(item?.responsibilities)
              ].map(v => this.safeStr(v).trim()).filter(Boolean);

              if (!title && !company && !location && !dateRange && !bullets.length) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
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
      `;
    }

    renderProjects(lang, t) {
      const items = this.safeArr(this.data?.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          <h2 class="section-title main-title">${this.escapeHtml(t.projects)}</h2>
          ${items.map((item, index) => {
            const id = this.safeStr(item?.id).trim() || `proj-${index}`;
            const name = this.safeStr(item?.name).trim();
            const description = this.safeStr(item?.description).trim();
            const technologies = this.safeArr(item?.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
            const url = this.safeStr(item?.url).trim();
            const dateRange = this.formatDateRange(
              this.safeStr(item?.startDate),
              this.safeStr(item?.endDate),
              !!item?.isOngoing
            );

            if (!name && !description && !technologies.length && !url && !dateRange) return '';

            return `
              <article class="entry project-entry" data-entry-id="${this.escapeHtml(id)}">
                <div class="entry-top">
                  <div>
                    ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                    ${url ? `<div class="entry-subtitle">${this.escapeHtml(url)}</div>` : ''}
                  </div>
                  ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                </div>
                ${description ? `<div class="body-text compact">${this.escapeHtml(description)}</div>` : ''}
                ${technologies.length ? `
                  <div class="tag-row">
                    ${technologies.map(tech => `<span class="tag">${this.escapeHtml(tech)}</span>`).join('')}
                  </div>
                ` : ''}
              </article>
            `;
          }).join('')}
        </section>
      `;
    }

    renderAchievements(lang, t) {
      const items = this.safeArr(this.data?.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          <h2 class="section-title main-title">${this.escapeHtml(t.achievements)}</h2>
          ${items.map((item, index) => {
            const id = this.safeStr(item?.id).trim() || `achievement-${index}`;
            const title = this.safeStr(item?.title).trim();
            const description = this.safeStr(item?.description).trim();
            const year = this.safeStr(item?.year).trim();

            if (!title && !description && !year) return '';

            return `
              <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                <div class="entry-top">
                  <div>
                    ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                  </div>
                  ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                </div>
                ${description ? `<div class="body-text compact">${this.escapeHtml(description)}</div>` : ''}
              </article>
            `;
          }).join('')}
        </section>
      `;
    }

    renderEducation(lang, t) {
      const items = this.safeArr(this.data?.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="education">
          <h2 class="section-title main-title">${this.escapeHtml(t.education)}</h2>
          ${items.map((item, index) => {
            const id = this.safeStr(item?.id).trim() || `edu-${index}`;
            const institution = this.safeStr(item?.institution).trim();
            const degree = this.safeStr(item?.degree).trim();
            const field = this.safeStr(item?.field).trim();
            const gpa = this.safeStr(item?.gpa).trim();
            const dateRange = this.formatDateRange(
              this.safeStr(item?.startDate),
              this.safeStr(item?.endDate),
              item?.isCompleted === false
            );

            if (!institution && !degree && !field && !gpa && !dateRange) return '';

            return `
              <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                <div class="entry-top">
                  <div>
                    ${(degree || field) ? `<div class="entry-title">${this.escapeHtml([degree, field].filter(Boolean).join(', '))}</div>` : ''}
                    ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                  </div>
                  ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                </div>
                ${gpa ? `<div class="meta-line">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
              </article>
            `;
          }).join('')}
        </section>
      `;
    }

    renderCertifications(lang, t) {
      const items = this.safeArr(this.data?.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          <h2 class="section-title main-title">${this.escapeHtml(t.certifications)}</h2>
          ${items.map((item, index) => {
            const id = this.safeStr(item?.id).trim() || `cert-${index}`;
            const name = this.safeStr(item?.name).trim();
            const issuer = this.safeStr(item?.issuer).trim();
            const date = this.safeStr(item?.date).trim();

            if (!name && !issuer && !date) return '';

            return `
              <article class="entry cert-entry" data-entry-id="${this.escapeHtml(id)}">
                <div class="entry-top">
                  <div>
                    ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                    ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
                  </div>
                  ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
                </div>
              </article>
            `;
          }).join('')}
        </section>
      `;
    }

    render() {
      if (!this.shadowRoot) return;

      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #111;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-family: Arial, Helvetica, sans-serif;
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
              linear-gradient(180deg, rgba(240,244,247,0.92), rgba(247,249,251,0.92)),
              repeating-linear-gradient(
                0deg,
                transparent 0,
                transparent 23px,
                rgba(146, 170, 190, 0.14) 23px,
                rgba(146, 170, 190, 0.14) 24px
              ),
              repeating-linear-gradient(
                90deg,
                transparent 0,
                transparent 23px,
                rgba(146, 170, 190, 0.14) 23px,
                rgba(146, 170, 190, 0.14) 24px
              );
            display: grid;
            grid-template-columns: 34% 66%;
            position: relative;
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          }

          .page::before {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            height: 12mm;
            background: linear-gradient(90deg, #eff4f7 0%, #f8fbfd 100%);
            z-index: 0;
          }

          .sidebar,
          .main {
            position: relative;
            z-index: 1;
          }

          .sidebar {
            background: #151515;
            color: #f6f6f2;
            padding: 44mm 9mm 12mm 11mm;
            position: relative;
            overflow: hidden;
          }

          .sidebar::before {
            content: "";
            position: absolute;
            top: 10mm;
            left: 8mm;
            right: 8mm;
            height: 2px;
            background: rgba(255,255,255,0.08);
          }

          .sidebar::after {
            content: "";
            position: absolute;
            top: 0;
            right: -1px;
            width: 9mm;
            height: 100%;
            background:
              radial-gradient(circle at left 6mm top 6mm, #151515 0 6mm, transparent 6.2mm) 0 0/100% 18mm repeat-y;
            opacity: 0.95;
            pointer-events: none;
          }

          .main {
            padding: 16mm 11mm 12mm 12mm;
          }

          .hero {
            margin-bottom: 10mm;
            position: relative;
            padding: 4mm 0 2mm 0;
          }

          .hero::after {
            content: "";
            position: absolute;
            right: 8mm;
            top: 2mm;
            width: 18mm;
            height: 18mm;
            border-top: 2px solid #1c1c1c;
            border-right: 2px solid #1c1c1c;
            opacity: 0.85;
          }

          .name {
            margin: 0;
            font-size: 16mm;
            line-height: 0.92;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            color: #171717;
            max-width: 95%;
          }

          .profession {
            margin-top: 3mm;
            font-size: 4.4mm;
            font-weight: 700;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            color: #444;
          }

          .section {
            margin-bottom: 8mm;
            break-inside: avoid;
          }

          .section-title {
            margin: 0 0 3.2mm 0;
          }

          .side-title {
            font-size: 5.8mm;
            line-height: 1;
            color: #fffdf5;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 800;
          }

          .main-title {
            font-size: 6.1mm;
            line-height: 1;
            color: #171717;
            text-transform: uppercase;
            font-weight: 900;
            letter-spacing: 0.3px;
            position: relative;
            display: inline-block;
            padding-right: 4mm;
          }

          .main-title::after {
            content: "";
            position: absolute;
            left: 100%;
            top: 50%;
            width: 18mm;
            height: 2px;
            background: #171717;
            transform: translateY(-50%);
            opacity: 0.7;
          }

          .side-section {
            position: relative;
          }

          .side-section + .side-section {
            padding-top: 2mm;
          }

          .body-text {
            font-size: 3.7mm;
            line-height: 1.58;
            color: #2b2b2b;
            white-space: pre-wrap;
            word-break: break-word;
          }

          .body-text.compact {
            margin-top: 1.5mm;
          }

          .contact-list {
            display: grid;
            gap: 3mm;
          }

          .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 2.2mm;
            font-size: 3.45mm;
            line-height: 1.45;
            color: #f1f1eb;
            word-break: break-word;
          }

          .contact-dot {
            width: 4.2mm;
            height: 4.2mm;
            border-radius: 50%;
            background: #f1f1eb;
            display: inline-block;
            margin-top: 0.45mm;
            flex: 0 0 4.2mm;
            position: relative;
          }

          .contact-dot::after {
            content: "";
            position: absolute;
            inset: 1.2mm;
            border-radius: 50%;
            background: #151515;
          }

          .stack-list {
            display: grid;
            gap: 3mm;
          }

          .lang-item {
            border-left: 2px solid rgba(255,255,255,0.24);
            padding-left: 2.5mm;
          }

          .lang-name {
            font-size: 3.7mm;
            font-weight: 700;
            color: #fff;
          }

          .lang-level {
            margin-top: 0.6mm;
            font-size: 3.15mm;
            color: rgba(255,255,255,0.78);
            text-transform: uppercase;
            letter-spacing: 0.6px;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            padding: 1.6mm 2.6mm;
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 999px;
            font-size: 3.05mm;
            line-height: 1.1;
            color: #fffef9;
            background: rgba(255,255,255,0.06);
          }

          .timeline,
          .entry {
            display: block;
          }

          .entry {
            margin-bottom: 5mm;
            position: relative;
            break-inside: avoid;
          }

          .entry:last-child {
            margin-bottom: 0;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4mm;
          }

          .entry-title {
            font-size: 4.1mm;
            font-weight: 800;
            line-height: 1.25;
            color: #161616;
          }

          .entry-subtitle {
            margin-top: 0.7mm;
            font-size: 3.4mm;
            line-height: 1.35;
            color: #575757;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 3.05mm;
            line-height: 1.2;
            color: #202020;
            background: #f0f0ea;
            border: 1px solid #d8d8d2;
            border-radius: 999px;
            padding: 1.2mm 2.2mm;
            white-space: nowrap;
          }

          .bullet-list {
            margin: 2mm 0 0 0;
            padding-left: 4.6mm;
          }

          .bullet-list li {
            margin: 0 0 1.3mm 0;
            font-size: 3.4mm;
            line-height: 1.45;
            color: #2d2d2d;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2mm;
          }

          .tag {
            display: inline-block;
            padding: 1.2mm 2.2mm;
            background: #171717;
            color: #fff;
            border-radius: 999px;
            font-size: 2.9mm;
            line-height: 1.1;
            white-space: nowrap;
          }

          .meta-line {
            margin-top: 1.6mm;
            font-size: 3.25mm;
            line-height: 1.35;
            color: #454545;
          }

          @media print {
            :host {
              margin: 0;
            }

            .page {
              width: 210mm;
              min-height: 297mm;
              box-shadow: none;
            }
          }
        </style>

        <div class="page">
          <div class="sidebar">
            ${this.renderContact(lang, t)}
            ${this.renderLanguages(lang, t)}
            ${this.renderSkills(lang, t)}
          </div>

          <div class="main">
            ${this.renderHeader()}
            ${this.renderProfile(lang, t)}
            ${this.renderExperience(lang, t)}
            ${this.renderProjects(lang, t)}
            ${this.renderAchievements(lang, t)}
            ${this.renderEducation(lang, t)}
            ${this.renderCertifications(lang, t)}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-beach-v1')) {
    customElements.define('gqr-resume-beach-v1', GQRResumeBeachV1);
  }
})();