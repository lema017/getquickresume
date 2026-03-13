(function() {
  'use strict';

  /**
   * name: gqr-resume-copper-v1
   * description: "Two-column resume with a soft blush sidebar, warm ivory main panel, elegant script-accented name styling, and refined serif/sans typography."
   */

  class GQRResumeCopperV1 extends HTMLElement {
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

    escapeHtml(text) {
      return this.safeStr(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    formatSingleDate(value, lang) {
      const raw = this.safeStr(value).trim();
      if (!raw) return '';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      if (/^\d{4}$/.test(raw)) return raw;

      if (/^\d{4}-\d{2}$/.test(raw)) {
        const [y, m] = raw.split('-');
        const idx = parseInt(m, 10) - 1;
        if (idx >= 0 && idx < 12) return months[idx] + ' ' + y;
      }

      const d = new Date(raw);
      if (!isNaN(d.getTime())) {
        return months[d.getMonth()] + ' ' + d.getFullYear();
      }

      return raw;
    }

    formatDateRange(startDate, endDate, currentFlag, currentLabel) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const start = this.formatSingleDate(startDate, lang);
      const end = currentFlag ? currentLabel : this.formatSingleDate(endDate, lang);
      if (start && end) return start + ' — ' + end;
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
      const lm = this.levelMap[lang];

      const firstName = this.safeStr(data.firstName).trim();
      const lastName = this.safeStr(data.lastName).trim();
      const profession = this.safeStr(data.profession).trim();
      const summary = this.safeStr(data.summary).trim();
      const email = this.safeStr(data.email).trim();
      const phone = this.safeStr(data.phone).trim();
      const country = this.safeStr(data.country).trim();
      const linkedin = this.safeStr(data.linkedin).trim();

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
      const hasProfile = !!summary;
      const hasExperience = experience.length > 0;
      const hasProjects = projects.length > 0;
      const hasAchievements = achievements.length > 0;
      const hasEducation = education.length > 0;
      const hasCertifications = certifications.length > 0;

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      const namePrimary = firstName || fullName;
      const nameSecondary = lastName && firstName ? lastName : '';

      const contactItems = [
        email ? `<div class="contact-item"><span class="icon">✉</span><span class="contact-text">${this.escapeHtml(email)}</span></div>` : '',
        phone ? `<div class="contact-item"><span class="icon">☎</span><span class="contact-text">${this.escapeHtml(phone)}</span></div>` : '',
        country ? `<div class="contact-item"><span class="icon">⌂</span><span class="contact-text">${this.escapeHtml(country)}</span></div>` : '',
        linkedin ? `<div class="contact-item"><span class="icon">↗</span><span class="contact-text">${this.escapeHtml(linkedin)}</span></div>` : ''
      ].join('');

      const languagesHtml = languages.map((item) => {
        const id = this.safeStr(item && item.id).trim();
        const name = this.safeStr(item && item.name).trim();
        const rawLevel = this.safeStr(item && item.level).trim().toLowerCase();
        const level = lm[rawLevel] || rawLevel || '';
        if (!name && !level) return '';
        return `
          <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
            <span class="language-name">${this.escapeHtml(name)}</span>
            ${level ? `<span class="language-level">${this.escapeHtml(level)}</span>` : ''}
          </div>
        `;
      }).join('');

      const skillsHtml = mergedSkills.map((skill, index) => `
        <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
      `).join('');

      const experienceHtml = experience.map((item) => {
        const id = this.safeStr(item && item.id).trim();
        const title = this.safeStr(item && item.title).trim();
        const company = this.safeStr(item && item.company).trim();
        const location = this.safeStr(item && item.location).trim();
        const range = this.formatDateRange(
          item && item.startDate,
          item && item.endDate,
          !!(item && item.isCurrent),
          t.present
        );
        const bullets = [...this.safeArr(item && item.achievements), ...this.safeArr(item && item.responsibilities)]
          .map(v => this.safeStr(v).trim())
          .filter(Boolean);

        return `
          <div class="entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title-block">
                ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                ${(company || location) ? `<div class="entry-subtitle">${this.escapeHtml(company)}${company && location ? ' · ' : ''}${this.escapeHtml(location)}</div>` : ''}
              </div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
            ${bullets.length ? `<ul class="bullet-list">${bullets.map(b => `<li>${this.escapeHtml(b)}</li>`).join('')}</ul>` : ''}
          </div>
        `;
      }).join('');

      const projectsHtml = projects.map((item) => {
        const id = this.safeStr(item && item.id).trim();
        const name = this.safeStr(item && item.name).trim();
        const description = this.safeStr(item && item.description).trim();
        const url = this.safeStr(item && item.url).trim();
        const techs = this.safeArr(item && item.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
        const range = this.formatDateRange(
          item && item.startDate,
          item && item.endDate,
          !!(item && item.isOngoing),
          t.present
        );

        return `
          <div class="entry compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title-block">
                ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                ${url ? `<div class="entry-subtitle">${this.escapeHtml(url)}</div>` : ''}
              </div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
            ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
            ${techs.length ? `<div class="tag-row">${techs.map(tag => `<span class="mini-tag">${this.escapeHtml(tag)}</span>`).join('')}</div>` : ''}
          </div>
        `;
      }).join('');

      const achievementsHtml = achievements.map((item) => {
        const id = this.safeStr(item && item.id).trim();
        const title = this.safeStr(item && item.title).trim();
        const description = this.safeStr(item && item.description).trim();
        const year = this.safeStr(item && item.year).trim();

        return `
          <div class="entry compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title-block">
                ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
              </div>
              ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
            </div>
            ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
          </div>
        `;
      }).join('');

      const educationHtml = education.map((item) => {
        const id = this.safeStr(item && item.id).trim();
        const institution = this.safeStr(item && item.institution).trim();
        const degree = this.safeStr(item && item.degree).trim();
        const field = this.safeStr(item && item.field).trim();
        const gpa = this.safeStr(item && item.gpa).trim();
        const range = this.formatDateRange(
          item && item.startDate,
          item && item.endDate,
          item && item.isCompleted === false,
          t.present
        );
        const degreeLine = [degree, field].filter(Boolean).join(degree && field ? ' — ' : '');

        return `
          <div class="entry compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title-block">
                ${degreeLine ? `<div class="entry-title">${this.escapeHtml(degreeLine)}</div>` : ''}
                ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
              </div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
            ${gpa ? `<div class="entry-text">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
          </div>
        `;
      }).join('');

      const certificationsHtml = certifications.map((item) => {
        const id = this.safeStr(item && item.id).trim();
        const name = this.safeStr(item && item.name).trim();
        const issuer = this.safeStr(item && item.issuer).trim();
        const date = this.safeStr(item && item.date).trim();

        return `
          <div class="entry compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title-block">
                ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
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
            color: #433c39;
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
            display: grid;
            grid-template-columns: 35% 65%;
            background: #f7f3ef;
            font-family: Georgia, "Times New Roman", serif;
            color: #433c39;
          }

          .sidebar {
            background: linear-gradient(180deg, #e8d4d3 0%, #dfc6c4 100%);
            padding: 24mm 10mm 16mm 14mm;
            border-right: 1px solid rgba(130, 93, 84, 0.14);
            min-width: 0;
          }

          .main {
            background: #f7f3ef;
            padding: 18mm 14mm 16mm 14mm;
            min-width: 0;
          }

          [data-section] {
            margin: 0 0 8mm 0;
          }

          [data-section]:last-child {
            margin-bottom: 0;
          }

          .section-title {
            display: inline-block;
            width: 100%;
            padding: 4px 10px 5px;
            margin: 0 0 10px;
            background: #e7d0cf;
            color: #4f4642;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10px;
            letter-spacing: 1.4px;
            font-weight: 700;
            text-transform: uppercase;
          }

          .header-card {
            padding: 4mm 2mm 8mm;
            border-bottom: 1px solid rgba(130, 93, 84, 0.18);
          }

          .name-script {
            font-family: "Brush Script MT", "Lucida Handwriting", cursive;
            font-size: 28px;
            line-height: 0.95;
            color: #2f2a29;
            margin: 0;
            font-weight: 400;
            letter-spacing: 0.4px;
          }

          .name-last {
            display: block;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 18px;
            line-height: 1.1;
            font-weight: 800;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-top: 2px;
            color: #3b3533;
          }

          .profession {
            margin-top: 8px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 2.2px;
            color: #7a6660;
            font-weight: 700;
          }

          .profile-text,
          .entry-text,
          .contact-text,
          .language-level,
          .entry-subtitle,
          .entry-date,
          .bullet-list li {
            font-family: Arial, Helvetica, sans-serif;
          }

          .profile-text {
            font-size: 12px;
            line-height: 1.65;
            color: #5c524e;
          }

          .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            margin: 0 0 8px 0;
            color: #574d49;
          }

          .icon {
            width: 14px;
            flex: 0 0 14px;
            font-size: 11px;
            line-height: 1.4;
            color: #8d6f67;
            text-align: center;
          }

          .contact-text {
            font-size: 11px;
            line-height: 1.45;
            word-break: break-word;
          }

          .language-item {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 8px;
            padding: 0 0 7px 0;
            margin: 0 0 7px 0;
            border-bottom: 1px solid rgba(130, 93, 84, 0.12);
          }

          .language-item:last-child {
            margin-bottom: 0;
            border-bottom: none;
            padding-bottom: 0;
          }

          .language-name {
            font-family: Georgia, "Times New Roman", serif;
            font-size: 12px;
            font-weight: 700;
            color: #453d3a;
          }

          .language-level {
            font-size: 10px;
            color: #846b64;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            text-align: right;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            padding: 5px 8px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.55);
            border: 1px solid rgba(130, 93, 84, 0.18);
            color: #514744;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10px;
            line-height: 1.2;
          }

          .entry {
            position: relative;
            padding: 0 0 5mm 0;
            margin: 0 0 5mm 0;
            border-bottom: 1px solid rgba(130, 93, 84, 0.12);
          }

          .entry:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }

          .entry.compact {
            padding-bottom: 4mm;
            margin-bottom: 4mm;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 5px;
          }

          .entry-title-block {
            min-width: 0;
            flex: 1 1 auto;
          }

          .entry-title {
            font-size: 14px;
            line-height: 1.25;
            font-weight: 700;
            color: #3f3734;
          }

          .entry-subtitle {
            font-size: 11px;
            line-height: 1.4;
            color: #866f67;
            margin-top: 2px;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 10px;
            line-height: 1.3;
            color: #7a6660;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            white-space: nowrap;
            padding-top: 2px;
          }

          .bullet-list {
            margin: 6px 0 0 0;
            padding: 0 0 0 16px;
          }

          .bullet-list li {
            margin: 0 0 4px 0;
            font-size: 11px;
            line-height: 1.55;
            color: #5d534f;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .entry-text {
            font-size: 11px;
            line-height: 1.55;
            color: #5d534f;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 8px;
          }

          .mini-tag {
            display: inline-block;
            padding: 3px 7px;
            border: 1px solid rgba(130, 93, 84, 0.16);
            background: #efe6e2;
            border-radius: 999px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 9px;
            line-height: 1.2;
            color: #685853;
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
                <div class="section-body">
                  ${contactItems}
                </div>
              </section>
            ` : ''}

            ${hasLanguages ? `
              <section data-section="languages">
                ${this.renderSectionTitle(t.languages)}
                <div class="section-body">
                  ${languagesHtml}
                </div>
              </section>
            ` : ''}

            ${hasSkills ? `
              <section data-section="skills">
                ${this.renderSectionTitle(t.skills)}
                <div class="section-body skills-wrap">
                  ${skillsHtml}
                </div>
              </section>
            ` : ''}
          </div>

          <div class="main">
            <section data-section="header" class="header-card">
              <div class="name-script">${this.escapeHtml(namePrimary)}</div>
              ${nameSecondary ? `<span class="name-last">${this.escapeHtml(nameSecondary)}</span>` : (fullName && !namePrimary ? `<span class="name-last">${this.escapeHtml(fullName)}</span>` : '')}
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
  }

  if (!customElements.get('gqr-resume-copper-v1')) {
    customElements.define('gqr-resume-copper-v1', GQRResumeCopperV1);
  }
})();