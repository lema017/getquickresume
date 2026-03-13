(function() {
  'use strict';

  /**
   * name: gqr-resume-lake-v1
   * description: "Two-column resume with a dark navy sidebar, bright main panel, bold uppercase section headings, and geometric accent styling inspired by modern editorial layouts."
   */

  class GQRResumeLakeV1 extends HTMLElement {
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
          profile: 'Sobre mí',
          experience: 'Experiencia laboral',
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
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };
      const activeLang = lang === 'es' ? 'es' : 'en';

      if (/^\d{4}-\d{2}$/.test(raw)) {
        const parts = raw.split('-');
        const year = parts[0];
        const monthIndex = parseInt(parts[1], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return months[activeLang][monthIndex] + ' ' + year;
        }
      }

      if (/^\d{4}$/.test(raw)) {
        return raw;
      }

      const date = new Date(raw);
      if (!isNaN(date.getTime())) {
        return months[activeLang][date.getMonth()] + ' ' + date.getFullYear();
      }

      return raw;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const dict = this.i18n[lang];
      const start = this.formatShortDate(startDate, lang);
      const end = isCurrentLike ? dict.present : this.formatShortDate(endDate, lang);

      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `<h2 class="section-title">${this.escapeHtml(title)}</h2>`;
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

      const experiences = this.safeArr(data.experience);
      const education = this.safeArr(data.education);
      const projects = this.safeArr(data.projects);
      const certifications = this.safeArr(data.certifications);
      const languages = this.safeArr(data.languages);
      const achievements = this.safeArr(data.achievements);

      const mergedSkills = Array.from(new Set(
        this.safeArr(data.skillsRaw)
          .concat(this.safeArr(data.toolsRaw))
          .map((s) => this.safeStr(s).trim())
          .filter(Boolean)
      ));

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      const hasContact = [email, phone, country, linkedin].some(Boolean);
      const hasLanguages = languages.length > 0;
      const hasSkills = mergedSkills.length > 0;
      const hasProfile = !!summary;
      const hasExperience = experiences.length > 0;
      const hasProjects = projects.length > 0;
      const hasAchievements = achievements.length > 0;
      const hasEducation = education.length > 0;
      const hasCertifications = certifications.length > 0;

      const contactItems = [];
      if (email) {
        contactItems.push(`
          <div class="contact-item">
            <span class="contact-label">Email</span>
            <span class="contact-value">${this.escapeHtml(email)}</span>
          </div>
        `);
      }
      if (phone) {
        contactItems.push(`
          <div class="contact-item">
            <span class="contact-label">${lang === 'es' ? 'Teléfono' : 'Phone'}</span>
            <span class="contact-value">${this.escapeHtml(phone)}</span>
          </div>
        `);
      }
      if (country) {
        contactItems.push(`
          <div class="contact-item">
            <span class="contact-label">${lang === 'es' ? 'Ubicación' : 'Location'}</span>
            <span class="contact-value">${this.escapeHtml(country)}</span>
          </div>
        `);
      }
      if (linkedin) {
        contactItems.push(`
          <div class="contact-item">
            <span class="contact-label">LinkedIn</span>
            <span class="contact-value">${this.escapeHtml(linkedin)}</span>
          </div>
        `);
      }

      const languagesHtml = languages.map((item) => {
        const id = this.safeStr(item?.id);
        const name = this.safeStr(item?.name);
        const levelKey = this.safeStr(item?.level).toLowerCase();
        const level = levelMap[levelKey] || this.safeStr(item?.level);
        return `
          <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
            <span class="language-name">${this.escapeHtml(name)}</span>
            <span class="language-level">${this.escapeHtml(level)}</span>
          </div>
        `;
      }).join('');

      const skillsHtml = mergedSkills.map((skill, index) => `
        <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
      `).join('');

      const experienceHtml = experiences.map((item) => {
        const id = this.safeStr(item?.id);
        const title = this.safeStr(item?.title);
        const company = this.safeStr(item?.company);
        const location = this.safeStr(item?.location);
        const dateRange = this.formatDateRange(
          item?.startDate,
          item?.endDate,
          !!item?.isCurrent
        );
        const bullets = this.safeArr(item?.achievements)
          .concat(this.safeArr(item?.responsibilities))
          .map((b) => this.safeStr(b).trim())
          .filter(Boolean);

        return `
          <article class="entry entry-experience" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-top">
              <div class="entry-heading">
                ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                ${(company || location) ? `
                  <div class="entry-subtitle">
                    ${company ? `<span class="company">${this.escapeHtml(company)}</span>` : ''}
                    ${(company && location) ? `<span class="sep">·</span>` : ''}
                    ${location ? `<span class="location">${this.escapeHtml(location)}</span>` : ''}
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
      }).join('');

      const projectsHtml = projects.map((item) => {
        const id = this.safeStr(item?.id);
        const name = this.safeStr(item?.name);
        const description = this.safeStr(item?.description);
        const technologies = this.safeArr(item?.technologies).map((tech) => this.safeStr(tech).trim()).filter(Boolean);
        const url = this.safeStr(item?.url);
        const dateRange = this.formatDateRange(
          item?.startDate,
          item?.endDate,
          !!item?.isOngoing
        );

        return `
          <article class="entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-top">
              <div class="entry-heading">
                ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                ${url ? `<div class="project-link">${this.escapeHtml(url)}</div>` : ''}
              </div>
              ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
            </div>
            ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
            ${technologies.length ? `
              <div class="tech-row">
                ${technologies.map((tech) => `<span class="tech-tag">${this.escapeHtml(tech)}</span>`).join('')}
              </div>
            ` : ''}
          </article>
        `;
      }).join('');

      const achievementsHtml = achievements.map((item) => {
        const id = this.safeStr(item?.id);
        const title = this.safeStr(item?.title);
        const description = this.safeStr(item?.description);
        const year = this.safeStr(item?.year);

        return `
          <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-top">
              <div class="entry-heading">
                ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
              </div>
              ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
            </div>
            ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
          </article>
        `;
      }).join('');

      const educationHtml = education.map((item) => {
        const id = this.safeStr(item?.id);
        const institution = this.safeStr(item?.institution);
        const degree = this.safeStr(item?.degree);
        const field = this.safeStr(item?.field);
        const gpa = this.safeStr(item?.gpa);
        const dateRange = this.formatDateRange(
          item?.startDate,
          item?.endDate,
          item?.isCompleted === false
        );

        return `
          <article class="entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-top">
              <div class="entry-heading">
                ${degree ? `<h3 class="entry-title">${this.escapeHtml(degree)}</h3>` : ''}
                ${(institution || field) ? `
                  <div class="entry-subtitle">
                    ${institution ? `<span class="company">${this.escapeHtml(institution)}</span>` : ''}
                    ${(institution && field) ? `<span class="sep">·</span>` : ''}
                    ${field ? `<span class="location">${this.escapeHtml(field)}</span>` : ''}
                  </div>
                ` : ''}
              </div>
              ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
            </div>
            ${gpa ? `<p class="entry-text">GPA: ${this.escapeHtml(gpa)}</p>` : ''}
          </article>
        `;
      }).join('');

      const certificationsHtml = certifications.map((item) => {
        const id = this.safeStr(item?.id);
        const name = this.safeStr(item?.name);
        const issuer = this.safeStr(item?.issuer);
        const date = this.safeStr(item?.date);

        return `
          <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-top">
              <div class="entry-heading">
                ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                ${issuer ? `<div class="entry-subtitle"><span class="company">${this.escapeHtml(issuer)}</span></div>` : ''}
              </div>
              ${date ? `<div class="entry-date">${this.escapeHtml(this.formatShortDate(date, lang))}</div>` : ''}
            </div>
          </article>
        `;
      }).join('');

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #0f172a;
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
            grid-template-columns: 34% 66%;
            background:
              linear-gradient(180deg, #071126 0%, #0a1733 100%);
            font-family: Arial, Helvetica, sans-serif;
            position: relative;
          }

          .page::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 34%;
            height: 100%;
            background:
              radial-gradient(circle at 22px 22px, rgba(255,255,255,0.95) 0 10px, transparent 11px),
              linear-gradient(135deg, transparent 0 82%, rgba(255,255,255,0.95) 82% 100%),
              linear-gradient(0deg, transparent 0 88%, rgba(255,255,255,0.92) 88% 100%);
            background-size: 96px 96px, 88px 88px, 120px 120px;
            background-position: 0 0, 10px 0, -10px 40px;
            opacity: 0.08;
            pointer-events: none;
          }

          .sidebar {
            position: relative;
            z-index: 1;
            color: #eef4ff;
            padding: 22mm 9mm 16mm 12mm;
            background: transparent;
          }

          .main {
            position: relative;
            z-index: 1;
            background: #ffffff;
            padding: 14mm 12mm 16mm 12mm;
            min-width: 0;
          }

          .section {
            margin: 0 0 9mm 0;
          }

          .section-title {
            margin: 0 0 4mm 0;
            font-size: 12px;
            line-height: 1.2;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }

          .sidebar .section-title {
            color: #ffffff;
            border-bottom: 2px solid rgba(255,255,255,0.22);
            padding-bottom: 2.5mm;
          }

          .main .section-title {
            color: #08142d;
            border-bottom: 2px solid #dbe4f2;
            padding-bottom: 2.5mm;
          }

          .header-card {
            background:
              linear-gradient(135deg, #08142d 0%, #0d1d40 100%);
            color: #ffffff;
            margin: -14mm -12mm 8mm -12mm;
            padding: 14mm 12mm 10mm 12mm;
            position: relative;
            overflow: hidden;
          }

          .header-card::after {
            content: '';
            position: absolute;
            right: -18px;
            top: -18px;
            width: 120px;
            height: 120px;
            border: 14px solid rgba(255,255,255,0.10);
            border-radius: 50%;
          }

          .name {
            margin: 0;
            font-size: 25px;
            line-height: 1.05;
            font-weight: 900;
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 4px;
            font-size: 12px;
            line-height: 1.4;
            color: #d7e4ff;
            font-weight: 500;
          }

          .profile-text,
          .entry-text,
          .contact-value,
          .project-link {
            font-size: 10px;
            line-height: 1.55;
          }

          .profile-text {
            margin: 0;
            color: #24324a;
          }

          .contact-list {
            display: grid;
            gap: 3.5mm;
          }

          .contact-item {
            display: grid;
            gap: 1mm;
          }

          .contact-label {
            display: inline-block;
            font-size: 8px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.09em;
            color: #b8c8eb;
          }

          .contact-value {
            color: #f6f9ff;
            word-break: break-word;
          }

          .language-list {
            display: grid;
            gap: 3mm;
          }

          .language-item {
            display: flex;
            justify-content: space-between;
            gap: 8px;
            align-items: baseline;
            border-bottom: 1px solid rgba(255,255,255,0.10);
            padding-bottom: 2mm;
          }

          .language-name {
            font-size: 10px;
            font-weight: 700;
            color: #ffffff;
          }

          .language-level {
            font-size: 9px;
            color: #c8d6f2;
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
            font-size: 9px;
            line-height: 1.2;
            padding: 5px 8px;
            border-radius: 999px;
            color: #f7fbff;
            background: rgba(255,255,255,0.11);
            border: 1px solid rgba(255,255,255,0.18);
          }

          .entry {
            margin-bottom: 6mm;
            break-inside: avoid;
          }

          .compact-entry {
            margin-bottom: 4.5mm;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 2mm;
          }

          .entry-heading {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-size: 11.2px;
            line-height: 1.3;
            font-weight: 800;
            color: #09162f;
          }

          .entry-subtitle {
            margin-top: 1mm;
            font-size: 9.3px;
            line-height: 1.4;
            color: #52627d;
          }

          .company {
            font-weight: 700;
            color: #16233d;
          }

          .location {
            color: #66768f;
          }

          .sep {
            margin: 0 4px;
            color: #9aa7ba;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 8.7px;
            line-height: 1.3;
            font-weight: 800;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: #0d1d40;
            background: #eaf0fa;
            padding: 4px 6px;
            border-radius: 3px;
            white-space: nowrap;
          }

          .bullet-list {
            margin: 0;
            padding-left: 16px;
            color: #26354d;
          }

          .bullet-list li {
            margin: 0 0 1.6mm 0;
            font-size: 9.8px;
            line-height: 1.5;
          }

          .entry-text {
            margin: 0;
            color: #33425a;
          }

          .project-link {
            margin-top: 1mm;
            color: #435674;
            word-break: break-word;
          }

          .tech-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2.5mm;
          }

          .tech-tag {
            display: inline-block;
            font-size: 8.5px;
            line-height: 1.2;
            padding: 4px 7px;
            border-radius: 999px;
            background: #eef3f9;
            color: #21314b;
            white-space: nowrap;
          }

          .empty-note {
            display: none;
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
                ${this.renderSectionTitle(t.contact)}
                <div class="contact-list">
                  ${contactItems.join('')}
                </div>
              </section>
            ` : ''}

            ${hasLanguages ? `
              <section class="section" data-section="languages">
                ${this.renderSectionTitle(t.languages)}
                <div class="language-list">
                  ${languagesHtml}
                </div>
              </section>
            ` : ''}

            ${hasSkills ? `
              <section class="section" data-section="skills">
                ${this.renderSectionTitle(t.skills)}
                <div class="skills-wrap">
                  ${skillsHtml}
                </div>
              </section>
            ` : ''}
          </div>

          <div class="main">
            <section class="header-card section" data-section="header">
              ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
              ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
            </section>

            ${hasProfile ? `
              <section class="section" data-section="profile">
                ${this.renderSectionTitle(t.profile)}
                <p class="profile-text">${this.escapeHtml(summary)}</p>
              </section>
            ` : ''}

            ${hasExperience ? `
              <section class="section" data-section="experience">
                ${this.renderSectionTitle(t.experience)}
                ${experienceHtml}
              </section>
            ` : ''}

            ${hasProjects ? `
              <section class="section" data-section="projects">
                ${this.renderSectionTitle(t.projects)}
                ${projectsHtml}
              </section>
            ` : ''}

            ${hasAchievements ? `
              <section class="section" data-section="achievements">
                ${this.renderSectionTitle(t.achievements)}
                ${achievementsHtml}
              </section>
            ` : ''}

            ${hasEducation ? `
              <section class="section" data-section="education">
                ${this.renderSectionTitle(t.education)}
                ${educationHtml}
              </section>
            ` : ''}

            ${hasCertifications ? `
              <section class="section" data-section="certifications">
                ${this.renderSectionTitle(t.certifications)}
                ${certificationsHtml}
              </section>
            ` : ''}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-lake-v1')) {
    customElements.define('gqr-resume-lake-v1', GQRResumeLakeV1);
  }
})();