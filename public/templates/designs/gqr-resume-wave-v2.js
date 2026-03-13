(function() {
  'use strict';

  /**
   * name: gqr-resume-wave-v2
   * description: "Two-column resume with a dark slate sidebar, clean white main panel, lime accents, and angular wave-inspired header details."
   */

  class GQRResumeWaveV2 extends HTMLElement {
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
          experience: 'Work Experience',
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
          experience: 'Experiencia Laboral',
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

    formatDate(value, lang) {
      const raw = this.safeStr(value).trim();
      if (!raw) return '';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      if (/^\d{4}-\d{2}$/.test(raw)) {
        const parts = raw.split('-');
        const year = parts[0];
        const monthIndex = parseInt(parts[1], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return months[monthIndex] + ' ' + year;
        }
      }

      if (/^\d{4}$/.test(raw)) {
        return raw;
      }

      const dt = new Date(raw);
      if (!Number.isNaN(dt.getTime())) {
        return months[dt.getMonth()] + ' ' + dt.getFullYear();
      }

      return raw;
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

    renderSectionTitle(title) {
      return `<div class="section-title">${this.escapeHtml(title)}</div>`;
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

      const mergedSkills = [...this.safeArr(data.skillsRaw), ...this.safeArr(data.toolsRaw)]
        .map((s) => this.safeStr(s).trim())
        .filter(Boolean)
        .filter((s, i, arr) => arr.findIndex((x) => x.toLowerCase() === s.toLowerCase()) === i);

      const hasContact = !!(email || phone || country || linkedin);
      const hasLanguages = languages.length > 0;
      const hasSkills = mergedSkills.length > 0;
      const hasProfile = !!summary.trim();
      const hasExperience = experience.length > 0;
      const hasProjects = projects.length > 0;
      const hasAchievements = achievements.length > 0;
      const hasEducation = education.length > 0;
      const hasCertifications = certifications.length > 0;

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      const contactItems = [];
      if (email) {
        contactItems.push(`
          <div class="contact-item">
            <span class="icon">${this.iconMail()}</span>
            <span class="text">${this.escapeHtml(email)}</span>
          </div>
        `);
      }
      if (phone) {
        contactItems.push(`
          <div class="contact-item">
            <span class="icon">${this.iconPhone()}</span>
            <span class="text">${this.escapeHtml(phone)}</span>
          </div>
        `);
      }
      if (country) {
        contactItems.push(`
          <div class="contact-item">
            <span class="icon">${this.iconLocation()}</span>
            <span class="text">${this.escapeHtml(country)}</span>
          </div>
        `);
      }
      if (linkedin) {
        contactItems.push(`
          <div class="contact-item">
            <span class="icon">${this.iconLink()}</span>
            <span class="text linkedin">${this.escapeHtml(linkedin)}</span>
          </div>
        `);
      }

      const languagesHtml = languages.map((item) => {
        const id = this.safeStr(item && item.id);
        const name = this.safeStr(item && item.name);
        const levelKey = this.safeStr(item && item.level).toLowerCase();
        const level = levelMap[levelKey] || this.safeStr(item && item.level);
        return `
          <div class="lang-item" data-entry-id="${this.escapeHtml(id)}">
            <div class="lang-name">${this.escapeHtml(name)}</div>
            <div class="lang-level">${this.escapeHtml(level)}</div>
          </div>
        `;
      }).join('');

      const skillsHtml = mergedSkills.map((skill, index) => `
        <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
      `).join('');

      const experienceHtml = experience.map((item) => {
        const id = this.safeStr(item && item.id);
        const title = this.safeStr(item && item.title);
        const company = this.safeStr(item && item.company);
        const location = this.safeStr(item && item.location);
        const bullets = [...this.safeArr(item && item.achievements), ...this.safeArr(item && item.responsibilities)]
          .map((b) => this.safeStr(b).trim())
          .filter(Boolean);

        const dateRange = this.formatDateRange(
          this.safeStr(item && item.startDate),
          this.safeStr(item && item.endDate),
          !!(item && item.isCurrent)
        );

        return `
          <div class="timeline-item" data-entry-id="${this.escapeHtml(id)}">
            <div class="item-head">
              <div class="item-head-main">
                <div class="item-title">${this.escapeHtml(title)}</div>
                <div class="item-subtitle">
                  ${this.escapeHtml(company)}
                  ${location ? `<span class="sep">•</span>${this.escapeHtml(location)}` : ''}
                </div>
              </div>
              ${dateRange ? `<div class="item-date">${this.escapeHtml(dateRange)}</div>` : ''}
            </div>
            ${bullets.length ? `
              <ul class="bullet-list">
                ${bullets.map((b) => `<li>${this.escapeHtml(b)}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `;
      }).join('');

      const educationHtml = education.map((item) => {
        const id = this.safeStr(item && item.id);
        const institution = this.safeStr(item && item.institution);
        const degree = this.safeStr(item && item.degree);
        const field = this.safeStr(item && item.field);
        const gpa = this.safeStr(item && item.gpa);

        const degreeLine = [degree, field].filter(Boolean).join(degree && field ? ' — ' : '');
        const dateRange = this.formatDateRange(
          this.safeStr(item && item.startDate),
          this.safeStr(item && item.endDate),
          item && item.isCompleted === false
        );

        return `
          <div class="edu-item" data-entry-id="${this.escapeHtml(id)}">
            <div class="item-head">
              <div class="item-head-main">
                <div class="item-title">${this.escapeHtml(degreeLine || institution)}</div>
                ${institution ? `<div class="item-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                ${gpa ? `<div class="item-meta">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
              </div>
              ${dateRange ? `<div class="item-date">${this.escapeHtml(dateRange)}</div>` : ''}
            </div>
          </div>
        `;
      }).join('');

      const projectsHtml = projects.map((item) => {
        const id = this.safeStr(item && item.id);
        const name = this.safeStr(item && item.name);
        const description = this.safeStr(item && item.description);
        const url = this.safeStr(item && item.url);
        const technologies = this.safeArr(item && item.technologies).map((x) => this.safeStr(x).trim()).filter(Boolean);
        const dateRange = this.formatDateRange(
          this.safeStr(item && item.startDate),
          this.safeStr(item && item.endDate),
          !!(item && item.isOngoing)
        );

        return `
          <div class="project-item" data-entry-id="${this.escapeHtml(id)}">
            <div class="item-head">
              <div class="item-head-main">
                <div class="item-title">${this.escapeHtml(name)}</div>
                ${url ? `<div class="item-subtitle">${this.escapeHtml(url)}</div>` : ''}
              </div>
              ${dateRange ? `<div class="item-date">${this.escapeHtml(dateRange)}</div>` : ''}
            </div>
            ${description ? `<div class="item-text">${this.escapeHtml(description)}</div>` : ''}
            ${technologies.length ? `
              <div class="tag-row">
                ${technologies.map((tech) => `<span class="mini-tag">${this.escapeHtml(tech)}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        `;
      }).join('');

      const achievementsHtml = achievements.map((item) => {
        const id = this.safeStr(item && item.id);
        const title = this.safeStr(item && item.title);
        const description = this.safeStr(item && item.description);
        const year = this.safeStr(item && item.year);

        return `
          <div class="achievement-item" data-entry-id="${this.escapeHtml(id)}">
            <div class="item-head">
              <div class="item-head-main">
                <div class="item-title">${this.escapeHtml(title)}</div>
              </div>
              ${year ? `<div class="item-date">${this.escapeHtml(year)}</div>` : ''}
            </div>
            ${description ? `<div class="item-text">${this.escapeHtml(description)}</div>` : ''}
          </div>
        `;
      }).join('');

      const certificationsHtml = certifications.map((item) => {
        const id = this.safeStr(item && item.id);
        const name = this.safeStr(item && item.name);
        const issuer = this.safeStr(item && item.issuer);
        const date = this.safeStr(item && item.date);

        return `
          <div class="cert-item" data-entry-id="${this.escapeHtml(id)}">
            <div class="item-head">
              <div class="item-head-main">
                <div class="item-title">${this.escapeHtml(name)}</div>
                ${issuer ? `<div class="item-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
              </div>
              ${date ? `<div class="item-date">${this.escapeHtml(this.formatDate(date, lang))}</div>` : ''}
            </div>
          </div>
        `;
      }).join('');

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
            background: #f7f8f5;
            display: grid;
            grid-template-columns: 33% 67%;
            font-family: Arial, Helvetica, sans-serif;
            position: relative;
          }

          .sidebar {
            background: linear-gradient(180deg, #2f3a4f 0%, #313b51 55%, #2b3447 100%);
            color: #eef3ee;
            padding: 28mm 10mm 14mm 12mm;
            position: relative;
            overflow: hidden;
          }

          .sidebar::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 10mm;
            background: #7fae3f;
          }

          .main {
            background: #f7f8f5;
            padding: 12mm 12mm 14mm 14mm;
            position: relative;
          }

          .main::before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 34mm;
            background: #2f3a4f;
            clip-path: polygon(0 0, 100% 0, 100% 66%, 0 100%);
            z-index: 0;
          }

          .main > * {
            position: relative;
            z-index: 1;
          }

          [data-section] {
            margin-bottom: 10mm;
          }

          [data-section]:last-child {
            margin-bottom: 0;
          }

          .header-section {
            padding-top: 4mm;
            padding-bottom: 16mm;
            padding-left: 2mm;
            padding-right: 2mm;
            margin-left: -2mm;
            margin-right: -2mm;
            background: #2f3a4f;
            color: #ffffff;
            min-height: 34mm;
          }

          .name {
            margin: 0;
            font-size: 11mm;
            line-height: 1;
            letter-spacing: 0.4px;
            font-weight: 800;
            text-transform: uppercase;
          }

          .name .accent {
            color: #8fbe48;
          }

          .profession {
            margin-top: 2mm;
            font-size: 3.6mm;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            color: #eef3ee;
            font-weight: 700;
          }

          .section-title {
            font-size: 3.3mm;
            letter-spacing: 1.3px;
            text-transform: uppercase;
            color: #8fbe48;
            margin-bottom: 4mm;
            padding-bottom: 2mm;
            border-bottom: 0.4mm solid rgba(143, 190, 72, 0.45);
          }

          .sidebar .section-title {
            color: #dce9cf;
            border-bottom-color: rgba(143, 190, 72, 0.65);
          }

          .profile-text,
          .item-text,
          .bullet-list,
          .contact-item,
          .lang-level,
          .item-subtitle,
          .item-meta {
            font-size: 3.15mm;
            line-height: 1.55;
          }

          .profile-text {
            color: #465162;
          }

          .contact-list {
            display: flex;
            flex-direction: column;
            gap: 3mm;
          }

          .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 2.5mm;
            color: #eef3ee;
            word-break: break-word;
          }

          .contact-item .icon {
            width: 4mm;
            height: 4mm;
            color: #8fbe48;
            flex: 0 0 4mm;
            margin-top: 0.3mm;
          }

          .contact-item .icon svg {
            width: 100%;
            height: 100%;
            display: block;
            fill: currentColor;
          }

          .linkedin {
            overflow-wrap: anywhere;
          }

          .lang-item {
            margin-bottom: 4mm;
            padding-left: 3mm;
            border-left: 0.7mm solid #8fbe48;
          }

          .lang-item:last-child {
            margin-bottom: 0;
          }

          .lang-name {
            font-size: 3.3mm;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 0.5mm;
          }

          .lang-level {
            color: #d9dfd8;
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
            border-radius: 999px;
            background: rgba(143, 190, 72, 0.16);
            border: 0.35mm solid rgba(143, 190, 72, 0.45);
            color: #f2f7ef;
            font-size: 2.85mm;
            line-height: 1.2;
          }

          .timeline-item,
          .project-item,
          .achievement-item,
          .edu-item,
          .cert-item {
            position: relative;
            padding-left: 5mm;
            margin-bottom: 6mm;
          }

          .timeline-item:last-child,
          .project-item:last-child,
          .achievement-item:last-child,
          .edu-item:last-child,
          .cert-item:last-child {
            margin-bottom: 0;
          }

          .timeline-item::before,
          .project-item::before,
          .achievement-item::before,
          .edu-item::before,
          .cert-item::before {
            content: "";
            position: absolute;
            left: 0.8mm;
            top: 1.2mm;
            width: 1.8mm;
            height: 1.8mm;
            border-radius: 50%;
            background: #8fbe48;
          }

          .timeline-item::after,
          .project-item::after,
          .achievement-item::after,
          .edu-item::after,
          .cert-item::after {
            content: "";
            position: absolute;
            left: 1.55mm;
            top: 3.4mm;
            bottom: -4.5mm;
            width: 0.35mm;
            background: rgba(143, 190, 72, 0.5);
          }

          .timeline-item:last-child::after,
          .project-item:last-child::after,
          .achievement-item:last-child::after,
          .edu-item:last-child::after,
          .cert-item:last-child::after {
            display: none;
          }

          .item-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4mm;
          }

          .item-head-main {
            min-width: 0;
            flex: 1;
          }

          .item-title {
            font-size: 3.5mm;
            line-height: 1.35;
            font-weight: 800;
            color: #273142;
          }

          .item-subtitle {
            color: #657285;
          }

          .item-meta {
            color: #657285;
            margin-top: 0.6mm;
          }

          .item-date {
            flex: 0 0 auto;
            font-size: 2.9mm;
            font-weight: 700;
            color: #5d6775;
            white-space: nowrap;
            padding-top: 0.4mm;
          }

          .sep {
            display: inline-block;
            margin: 0 1.2mm;
            color: #8fbe48;
            font-weight: 700;
          }

          .bullet-list {
            margin: 2mm 0 0 0;
            padding-left: 4mm;
            color: #475569;
          }

          .bullet-list li {
            margin: 0 0 1.2mm 0;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .item-text {
            margin-top: 2mm;
            color: #475569;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2.2mm;
          }

          .mini-tag {
            display: inline-block;
            padding: 1.2mm 2mm;
            border-radius: 999px;
            background: #eef4e4;
            color: #516043;
            font-size: 2.7mm;
            line-height: 1.2;
            border: 0.3mm solid rgba(143, 190, 72, 0.35);
            white-space: nowrap;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          <div class="sidebar">
            ${hasContact ? `
              <section data-section="contact">
                ${this.renderSectionTitle(t.contact)}
                <div class="contact-list">
                  ${contactItems.join('')}
                </div>
              </section>
            ` : ''}

            ${hasLanguages ? `
              <section data-section="languages">
                ${this.renderSectionTitle(t.languages)}
                <div class="languages-list">
                  ${languagesHtml}
                </div>
              </section>
            ` : ''}

            ${hasSkills ? `
              <section data-section="skills">
                ${this.renderSectionTitle(t.skills)}
                <div class="skills-wrap">
                  ${skillsHtml}
                </div>
              </section>
            ` : ''}
          </div>

          <div class="main">
            <section data-section="header" class="header-section">
              <h1 class="name">
                <span class="accent">${this.escapeHtml(firstName)}</span>${fullName ? ` ${this.escapeHtml(lastName)}` : ''}
              </h1>
              ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
            </section>

            ${hasProfile ? `
              <section data-section="profile">
                ${this.renderSectionTitle(t.profile)}
                <div class="profile-text">${this.escapeHtml(summary)}</div>
              </section>
            ` : ''}

            ${hasExperience ? `
              <section data-section="experience">
                ${this.renderSectionTitle(t.experience)}
                ${experienceHtml}
              </section>
            ` : ''}

            ${hasProjects ? `
              <section data-section="projects">
                ${this.renderSectionTitle(t.projects)}
                ${projectsHtml}
              </section>
            ` : ''}

            ${hasAchievements ? `
              <section data-section="achievements">
                ${this.renderSectionTitle(t.achievements)}
                ${achievementsHtml}
              </section>
            ` : ''}

            ${hasEducation ? `
              <section data-section="education">
                ${this.renderSectionTitle(t.education)}
                ${educationHtml}
              </section>
            ` : ''}

            ${hasCertifications ? `
              <section data-section="certifications">
                ${this.renderSectionTitle(t.certifications)}
                ${certificationsHtml}
              </section>
            ` : ''}
          </div>
        </div>
      `;
    }

    iconMail() {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 3.2-8 5-8-5V6l8 5 8-5v1.2Z"/>
        </svg>
      `;
    }

    iconPhone() {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.19 2.2Z"/>
        </svg>
      `;
    }

    iconLocation() {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/>
        </svg>
      `;
    }

    iconLink() {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3.9 12a5 5 0 0 1 5-5h3v2h-3a3 3 0 1 0 0 6h3v2h-3a5 5 0 0 1-5-5Zm6.1 1h4v-2h-4v2Zm5.1-6h-3v2h3a3 3 0 1 1 0 6h-3v2h3a5 5 0 1 0 0-10Z"/>
        </svg>
      `;
    }
  }

  if (!customElements.get('gqr-resume-wave-v2')) {
    customElements.define('gqr-resume-wave-v2', GQRResumeWaveV2);
  }
})();