(function() {
  'use strict';

  /**
   * name: gqr-resume-copper-v2
   * description: "Two-column resume with a warm blush sidebar, clean ivory main panel, elegant serif/sans typography, and refined section dividers inspired by a soft editorial layout."
   */

  class GQRResumeCopperV2 extends HTMLElement {
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
          profile: 'Sobre mí',
          experience: 'Experiencia',
          education: 'Formación',
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
      this._data = value || {};
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

    formatDate(value, lang) {
      const v = this.safeStr(value);
      if (!v) return '';
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };
      if (/^\d{4}$/.test(v)) return v;
      if (/^\d{4}-\d{2}$/.test(v)) {
        const parts = v.split('-');
        const year = parts[0];
        const month = parseInt(parts[1], 10);
        if (month >= 1 && month <= 12) return months[lang] ? months[lang][month - 1] + ' ' + year : months.en[month - 1] + ' ' + year;
      }
      const d = new Date(v);
      if (!isNaN(d.getTime())) {
        const month = (months[lang] || months.en)[d.getMonth()];
        return month + ' ' + d.getFullYear();
      }
      return v;
    }

    formatDateRange(startDate, endDate, currentFlag, lang) {
      const dict = this.i18n[lang] || this.i18n.en;
      const start = this.formatDate(startDate, lang);
      const end = currentFlag ? dict.present : this.formatDate(endDate, lang);
      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `
        <div class="section-title-wrap">
          <h3 class="section-title">${this.escapeHtml(title)}</h3>
        </div>
      `;
    }

    render() {
      const data = this.data || {};
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const dict = this.i18n[lang] || this.i18n.en;
      const lvl = this.levelMap[lang] || this.levelMap.en;

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

      const hasContact = !!(email || phone || country || linkedin);
      const hasLanguages = languages.length > 0;
      const hasSkills = mergedSkills.length > 0;
      const hasHeader = !!(firstName || lastName || profession);
      const hasProfile = !!summary;
      const hasExperience = experience.length > 0;
      const hasProjects = projects.length > 0;
      const hasAchievements = achievements.length > 0;
      const hasEducation = education.length > 0;
      const hasCertifications = certifications.length > 0;

      const contactItems = [
        email ? `<div class="contact-item"><span class="contact-icon">✉</span><span class="contact-text">${this.escapeHtml(email)}</span></div>` : '',
        phone ? `<div class="contact-item"><span class="contact-icon">☎</span><span class="contact-text">${this.escapeHtml(phone)}</span></div>` : '',
        country ? `<div class="contact-item"><span class="contact-icon">⌂</span><span class="contact-text">${this.escapeHtml(country)}</span></div>` : '',
        linkedin ? `<div class="contact-item"><span class="contact-icon">↗</span><span class="contact-text">${this.escapeHtml(linkedin)}</span></div>` : ''
      ].join('');

      const languagesHtml = languages.map((item, index) => {
        const id = this.safeStr(item && item.id) || ('lang-' + index);
        const name = this.safeStr(item && item.name);
        const levelRaw = this.safeStr(item && item.level).toLowerCase();
        const level = lvl[levelRaw] || this.safeStr(item && item.level);
        return `
          <div class="lang-item" data-entry-id="${this.escapeHtml(id)}">
            <span class="lang-name">${this.escapeHtml(name)}</span>
            ${level ? `<span class="lang-level">${this.escapeHtml(level)}</span>` : ''}
          </div>
        `;
      }).join('');

      const skillsHtml = mergedSkills.map((skill, index) => `
        <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
      `).join('');

      const expHtml = experience.map((item, index) => {
        const id = this.safeStr(item && item.id) || ('exp-' + index);
        const title = this.safeStr(item && item.title);
        const company = this.safeStr(item && item.company);
        const location = this.safeStr(item && item.location);
        const range = this.formatDateRange(item && item.startDate, item && item.endDate, !!(item && item.isCurrent), lang);
        const bullets = [...this.safeArr(item && item.achievements), ...this.safeArr(item && item.responsibilities)]
          .map(v => this.safeStr(v).trim())
          .filter(Boolean);

        return `
          <div class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title-block">
                ${title ? `<h4 class="entry-title">${this.escapeHtml(title)}</h4>` : ''}
                ${(company || location) ? `<div class="entry-subtitle">${this.escapeHtml(company)}${company && location ? ' · ' : ''}${this.escapeHtml(location)}</div>` : ''}
              </div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
            ${bullets.length ? `
              <ul class="bullet-list">
                ${bullets.map(b => `<li>${this.escapeHtml(b)}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `;
      }).join('');

      const projectsHtml = projects.map((item, index) => {
        const id = this.safeStr(item && item.id) || ('proj-' + index);
        const name = this.safeStr(item && item.name);
        const description = this.safeStr(item && item.description);
        const technologies = this.safeArr(item && item.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
        const url = this.safeStr(item && item.url);
        const range = this.formatDateRange(item && item.startDate, item && item.endDate, !!(item && item.isOngoing), lang);

        return `
          <div class="entry project-entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title-block">
                ${name ? `<h4 class="entry-title">${this.escapeHtml(name)}</h4>` : ''}
                ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
              </div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
            ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
            ${technologies.length ? `<div class="tag-row">${technologies.map(t => `<span class="tag">${this.escapeHtml(t)}</span>`).join('')}</div>` : ''}
          </div>
        `;
      }).join('');

      const achievementsHtml = achievements.map((item, index) => {
        const id = this.safeStr(item && item.id) || ('ach-' + index);
        const title = this.safeStr(item && item.title);
        const description = this.safeStr(item && item.description);
        const year = this.safeStr(item && item.year);

        return `
          <div class="entry simple-entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title-block">
                ${title ? `<h4 class="entry-title">${this.escapeHtml(title)}</h4>` : ''}
              </div>
              ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
            </div>
            ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
          </div>
        `;
      }).join('');

      const educationHtml = education.map((item, index) => {
        const id = this.safeStr(item && item.id) || ('edu-' + index);
        const institution = this.safeStr(item && item.institution);
        const degree = this.safeStr(item && item.degree);
        const field = this.safeStr(item && item.field);
        const gpa = this.safeStr(item && item.gpa);
        const isCurrent = item && item.isCompleted === false;
        const range = this.formatDateRange(item && item.startDate, item && item.endDate, isCurrent, lang);

        return `
          <div class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title-block">
                ${(degree || field) ? `<h4 class="entry-title">${this.escapeHtml(degree)}${degree && field ? ', ' : ''}${this.escapeHtml(field)}</h4>` : ''}
                ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                ${gpa ? `<div class="entry-meta">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
              </div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
          </div>
        `;
      }).join('');

      const certHtml = certifications.map((item, index) => {
        const id = this.safeStr(item && item.id) || ('cert-' + index);
        const name = this.safeStr(item && item.name);
        const issuer = this.safeStr(item && item.issuer);
        const date = this.safeStr(item && item.date);

        return `
          <div class="entry simple-entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title-block">
                ${name ? `<h4 class="entry-title">${this.escapeHtml(name)}</h4>` : ''}
                ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
              </div>
              ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
            </div>
          </div>
        `;
      }).join('');

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #423a36;
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
            background: #f7f3ef;
            display: grid;
            grid-template-columns: 34% 66%;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.4;
          }

          .sidebar {
            background: #d8c2bf;
            color: #4b3f3c;
            padding: 28mm 10mm 18mm 13mm;
            position: relative;
          }

          .sidebar::after {
            content: "";
            position: absolute;
            top: 16mm;
            bottom: 16mm;
            right: 0;
            width: 1px;
            background: rgba(90, 72, 68, 0.18);
          }

          .main {
            background: #f7f3ef;
            padding: 22mm 14mm 18mm 14mm;
          }

          .section {
            margin: 0 0 16px 0;
          }

          .section-title-wrap {
            margin: 0 0 10px 0;
          }

          .section-title {
            margin: 0;
            display: inline-block;
            font-size: 11px;
            line-height: 1.1;
            letter-spacing: 1.4px;
            text-transform: uppercase;
            font-weight: 700;
            color: #4b403d;
            background: #e8d8d5;
            padding: 4px 10px 3px;
          }

          .main .section-title {
            background: #e7d7d4;
          }

          .header-block {
            margin: 0 0 18px 0;
            padding: 4px 0 8px;
            border-bottom: 1px solid #c9b5b0;
          }

          .name {
            margin: 0;
            font-family: "Times New Roman", Georgia, serif;
            font-size: 19px;
            line-height: 1.02;
            font-style: italic;
            font-weight: 500;
            color: #2f2a28;
            letter-spacing: 0.3px;
          }

          .surname {
            display: block;
            font-family: Arial, Helvetica, sans-serif;
            font-style: normal;
            font-weight: 800;
            font-size: 8.5mm;
            line-height: 0.95;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            color: #3a3431;
            margin-top: 2mm;
          }

          .profession {
            margin: 6px 0 0 0;
            font-size: 11px;
            letter-spacing: 2.3px;
            text-transform: uppercase;
            color: #6b5c58;
            font-weight: 700;
          }

          .profile-text,
          .entry-text,
          .contact-text,
          .entry-subtitle,
          .entry-meta,
          .lang-level {
            font-size: 11px;
            color: #4e4642;
          }

          .profile-text {
            margin: 0;
            text-align: left;
          }

          .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            margin: 0 0 7px 0;
            min-width: 0;
          }

          .contact-icon {
            width: 14px;
            flex: 0 0 14px;
            font-size: 10px;
            line-height: 1.4;
            color: #8a6860;
            text-align: center;
            margin-top: 1px;
          }

          .contact-text {
            word-break: break-word;
          }

          .lang-item {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 8px;
            padding: 0 0 6px 0;
            margin: 0 0 6px 0;
            border-bottom: 1px solid rgba(90, 72, 68, 0.12);
          }

          .lang-item:last-child {
            border-bottom: 0;
            margin-bottom: 0;
            padding-bottom: 0;
          }

          .lang-name {
            font-size: 11px;
            font-weight: 700;
            color: #3f3734;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            font-size: 10px;
            line-height: 1.2;
            padding: 5px 8px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.45);
            border: 1px solid rgba(90, 72, 68, 0.14);
            color: #4c433f;
          }

          .entry {
            position: relative;
            margin: 0 0 14px 0;
          }

          .timeline-entry {
            padding-left: 14px;
          }

          .timeline-entry::before {
            content: "";
            position: absolute;
            left: 0;
            top: 5px;
            bottom: -8px;
            width: 1px;
            background: #cfbbb6;
          }

          .timeline-entry::after {
            content: "";
            position: absolute;
            left: -3px;
            top: 5px;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #a37c73;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
          }

          .entry-title-block {
            min-width: 0;
            flex: 1 1 auto;
          }

          .entry-title {
            margin: 0 0 2px 0;
            font-size: 12px;
            line-height: 1.25;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            font-weight: 800;
            color: #322d2b;
          }

          .entry-subtitle {
            margin: 0 0 2px 0;
            font-weight: 600;
          }

          .entry-meta {
            margin: 2px 0 0 0;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 10px;
            line-height: 1.2;
            color: #7c6b67;
            text-align: right;
            white-space: nowrap;
            margin-top: 1px;
          }

          .bullet-list {
            margin: 7px 0 0 0;
            padding: 0 0 0 16px;
          }

          .bullet-list li {
            margin: 0 0 4px 0;
            font-size: 11px;
            color: #4a433f;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
          }

          .tag {
            display: inline-block;
            white-space: nowrap;
            font-size: 10px;
            padding: 4px 7px;
            border: 1px solid #d5c2bd;
            background: #efe5e2;
            color: #564b47;
            border-radius: 2px;
          }

          .entry-link {
            font-size: 10px;
            color: #7d645d;
            word-break: break-word;
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
              <section class="section" data-section="contact">
                ${this.renderSectionTitle(dict.contact)}
                <div class="section-body">
                  ${contactItems}
                </div>
              </section>
            ` : ''}

            ${hasLanguages ? `
              <section class="section" data-section="languages">
                ${this.renderSectionTitle(dict.languages)}
                <div class="section-body">
                  ${languagesHtml}
                </div>
              </section>
            ` : ''}

            ${hasSkills ? `
              <section class="section" data-section="skills">
                ${this.renderSectionTitle(dict.skills)}
                <div class="section-body skills-wrap">
                  ${skillsHtml}
                </div>
              </section>
            ` : ''}
          </div>

          <div class="main">
            ${hasHeader ? `
              <section class="section header-block" data-section="header">
                <h1 class="name">
                  ${this.escapeHtml(firstName)}
                  ${lastName ? `<span class="surname">${this.escapeHtml(lastName)}</span>` : ''}
                </h1>
                ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
              </section>
            ` : ''}

            ${hasProfile ? `
              <section class="section" data-section="profile">
                ${this.renderSectionTitle(dict.profile)}
                <div class="section-body">
                  <p class="profile-text">${this.escapeHtml(summary)}</p>
                </div>
              </section>
            ` : ''}

            ${hasExperience ? `
              <section class="section" data-section="experience">
                ${this.renderSectionTitle(dict.experience)}
                <div class="section-body">
                  ${expHtml}
                </div>
              </section>
            ` : ''}

            ${hasProjects ? `
              <section class="section" data-section="projects">
                ${this.renderSectionTitle(dict.projects)}
                <div class="section-body">
                  ${projectsHtml}
                </div>
              </section>
            ` : ''}

            ${hasAchievements ? `
              <section class="section" data-section="achievements">
                ${this.renderSectionTitle(dict.achievements)}
                <div class="section-body">
                  ${achievementsHtml}
                </div>
              </section>
            ` : ''}

            ${hasEducation ? `
              <section class="section" data-section="education">
                ${this.renderSectionTitle(dict.education)}
                <div class="section-body">
                  ${educationHtml}
                </div>
              </section>
            ` : ''}

            ${hasCertifications ? `
              <section class="section" data-section="certifications">
                ${this.renderSectionTitle(dict.certifications)}
                <div class="section-body">
                  ${certHtml}
                </div>
              </section>
            ` : ''}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-copper-v2')) {
    customElements.define('gqr-resume-copper-v2', GQRResumeCopperV2);
  }
})();