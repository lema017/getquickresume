(function() {
  'use strict';

  /**
   * name: gqr-resume-rose-v1
   * description: "Two-column resume with a pastel lavender-and-mint sidebar/main layout, bold rounded typography, soft cards, and subtle grid-inspired decorative accents."
   */

  class GQRResumeRoseV1 extends HTMLElement {
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

    formatDate(dateStr, lang) {
      const value = this.safeStr(dateStr).trim();
      if (!value) return '';
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };
      const match = value.match(/^(\d{4})(?:-(\d{2}))?/);
      if (!match) return this.escapeHtml(value);
      const year = match[1];
      const monthIndex = match[2] ? parseInt(match[2], 10) - 1 : -1;
      if (monthIndex >= 0 && monthIndex < 12) {
        return `${months[lang] ? months[lang][monthIndex] : months.en[monthIndex]} ${year}`;
      }
      return year;
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
      return `
        <div class="section-head">
          <span class="section-bar"></span>
          <h3>${this.escapeHtml(title)}</h3>
        </div>
      `;
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

      const skillsCombined = Array.from(
        new Set(
          [...this.safeArr(data.skillsRaw), ...this.safeArr(data.toolsRaw)]
            .map((s) => this.safeStr(s).trim())
            .filter(Boolean)
        )
      );

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      const hasContact = [email, phone, country, linkedin].some(Boolean);
      const hasLanguages = languages.length > 0;
      const hasSkills = skillsCombined.length > 0;
      const hasHeader = !!(fullName || profession);
      const hasProfile = !!summary;
      const hasExperience = experience.length > 0;
      const hasProjects = projects.length > 0;
      const hasAchievements = achievements.length > 0;
      const hasEducation = education.length > 0;
      const hasCertifications = certifications.length > 0;

      const contactItems = [];
      if (phone) contactItems.push(`<li><span class="contact-label">Tel</span><span class="contact-value">${this.escapeHtml(phone)}</span></li>`);
      if (email) contactItems.push(`<li><span class="contact-label">Email</span><span class="contact-value">${this.escapeHtml(email)}</span></li>`);
      if (country) contactItems.push(`<li><span class="contact-label">Loc</span><span class="contact-value">${this.escapeHtml(country)}</span></li>`);
      if (linkedin) contactItems.push(`<li><span class="contact-label">in</span><span class="contact-value">${this.escapeHtml(linkedin)}</span></li>`);

      const languagesHtml = languages.map((item) => {
        const id = this.safeStr(item && item.id);
        const name = this.safeStr(item && item.name);
        const levelRaw = this.safeStr(item && item.level).toLowerCase();
        const level = levelMap[levelRaw] || this.safeStr(item && item.level);
        return `
          <div class="lang-item" data-entry-id="${this.escapeHtml(id)}">
            <div class="lang-name">${this.escapeHtml(name)}</div>
            <div class="lang-level">${this.escapeHtml(level)}</div>
          </div>
        `;
      }).join('');

      const skillsHtml = skillsCombined.map((skill, index) => `
        <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
      `).join('');

      const experienceHtml = experience.map((item) => {
        const id = this.safeStr(item && item.id);
        const title = this.safeStr(item && item.title);
        const company = this.safeStr(item && item.company);
        const location = this.safeStr(item && item.location);
        const range = this.formatDateRange(item && item.startDate, item && item.endDate, !!(item && item.isCurrent));
        const bullets = [...this.safeArr(item && item.achievements), ...this.safeArr(item && item.responsibilities)]
          .map((b) => this.safeStr(b).trim())
          .filter(Boolean);

        return `
          <article class="entry card" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-top">
              <div>
                <h4 class="entry-title">${this.escapeHtml(title || company)}</h4>
                ${(company || location) ? `<div class="entry-sub">${this.escapeHtml([company, location].filter(Boolean).join(' • '))}</div>` : ''}
              </div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
            ${bullets.length ? `
              <ul class="bullets">
                ${bullets.map((b) => `<li>${this.escapeHtml(b)}</li>`).join('')}
              </ul>
            ` : ''}
          </article>
        `;
      }).join('');

      const projectsHtml = projects.map((item) => {
        const id = this.safeStr(item && item.id);
        const name = this.safeStr(item && item.name);
        const description = this.safeStr(item && item.description);
        const technologies = this.safeArr(item && item.technologies).map((x) => this.safeStr(x).trim()).filter(Boolean);
        const url = this.safeStr(item && item.url);
        const range = this.formatDateRange(item && item.startDate, item && item.endDate, !!(item && item.isOngoing));

        return `
          <article class="entry card" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-top">
              <div>
                <h4 class="entry-title">${this.escapeHtml(name)}</h4>
                ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
              </div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
            ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
            ${technologies.length ? `
              <div class="tag-row">
                ${technologies.map((tech) => `<span class="mini-tag">${this.escapeHtml(tech)}</span>`).join('')}
              </div>
            ` : ''}
          </article>
        `;
      }).join('');

      const achievementsHtml = achievements.map((item) => {
        const id = this.safeStr(item && item.id);
        const title = this.safeStr(item && item.title);
        const description = this.safeStr(item && item.description);
        const year = this.safeStr(item && item.year);

        return `
          <article class="entry card compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-top">
              <h4 class="entry-title">${this.escapeHtml(title)}</h4>
              ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
            </div>
            ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
          </article>
        `;
      }).join('');

      const educationHtml = education.map((item) => {
        const id = this.safeStr(item && item.id);
        const institution = this.safeStr(item && item.institution);
        const degree = this.safeStr(item && item.degree);
        const field = this.safeStr(item && item.field);
        const gpa = this.safeStr(item && item.gpa);
        const range = this.formatDateRange(item && item.startDate, item && item.endDate, item && item.isCompleted === false);
        const program = [degree, field].filter(Boolean).join(' in ');

        return `
          <article class="entry card" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-top">
              <div>
                <h4 class="entry-title">${this.escapeHtml(program || institution)}</h4>
                ${institution ? `<div class="entry-sub">${this.escapeHtml(institution)}</div>` : ''}
              </div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
            ${gpa ? `<p class="entry-text">GPA: ${this.escapeHtml(gpa)}</p>` : ''}
          </article>
        `;
      }).join('');

      const certificationsHtml = certifications.map((item) => {
        const id = this.safeStr(item && item.id);
        const name = this.safeStr(item && item.name);
        const issuer = this.safeStr(item && item.issuer);
        const date = this.safeStr(item && item.date);

        return `
          <article class="entry card compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-top">
              <div>
                <h4 class="entry-title">${this.escapeHtml(name)}</h4>
                ${issuer ? `<div class="entry-sub">${this.escapeHtml(issuer)}</div>` : ''}
              </div>
              ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
            </div>
          </article>
        `;
      }).join('');

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #241f24;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          * { box-sizing: border-box; }

          .page {
            width: 210mm;
            min-height: 297mm;
            height: auto;
            overflow: visible;
            margin: 0 auto;
            background:
              linear-gradient(#2c272d 0 0) top/100% 100% no-repeat;
            color: #241f24;
            font-family: "Trebuchet MS", "Arial Rounded MT Bold", Arial, sans-serif;
            display: grid;
            grid-template-columns: 34% 66%;
            position: relative;
          }

          .page::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background-image:
              linear-gradient(rgba(215, 202, 220, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(215, 202, 220, 0.12) 1px, transparent 1px);
            background-size: 18mm 18mm;
          }

          .sidebar,
          .main {
            position: relative;
            z-index: 1;
            padding: 16mm 10mm 14mm;
          }

          .sidebar {
            background: transparent;
            color: #f7eef7;
          }

          .main {
            background: transparent;
            color: #221d22;
          }

          .block {
            margin-bottom: 10px;
          }

          .chip-row {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-bottom: 10mm;
          }

          .top-chip {
            display: inline-flex;
            align-items: center;
            min-height: 24px;
            padding: 6px 10px;
            border-radius: 999px;
            background: #e8d8ef;
            color: #352d36;
            font-size: 11px;
            line-height: 1.2;
            border: 1px solid rgba(255,255,255,0.35);
          }

          .hero {
            margin-bottom: 10mm;
            position: relative;
          }

          .hero-name {
            font-size: 27px;
            line-height: 0.92;
            margin: 0;
            font-weight: 900;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            color: #f2e7f3;
            text-shadow:
              -2px 0 #1f1b1f,
              0 2px #1f1b1f,
              2px 0 #1f1b1f,
              0 -2px #1f1b1f,
              -2px -2px #cceee6;
          }

          .hero-role {
            margin-top: 8px;
            display: inline-block;
            padding: 8px 12px;
            transform: rotate(-6deg);
            background: #ead7ef;
            color: #3c313c;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-radius: 4px;
            box-shadow: 0 2px 0 #1f1b1f;
          }

          .sidebar [data-section],
          .main [data-section] {
            margin-bottom: 12px;
          }

          .section-card {
            background: linear-gradient(135deg, #dcb7ee 0%, #dff2e4 100%);
            border-radius: 12px;
            padding: 12px 12px 12px 14px;
            color: #261f27;
            box-shadow: 0 2px 0 rgba(0,0,0,0.18);
          }

          .main .section-card {
            background: linear-gradient(135deg, #d8b2ea 0%, #dff0e0 100%);
          }

          .section-head {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            margin-bottom: 10px;
          }

          .section-bar {
            width: 5px;
            min-width: 5px;
            height: 26px;
            border-radius: 3px;
            background: #3a2f39;
            margin-top: 1px;
          }

          .section-head h3 {
            margin: 0;
            font-size: 14px;
            line-height: 0.95;
            font-weight: 900;
            text-transform: uppercase;
            word-break: break-word;
          }

          .contact-list {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 8px;
          }

          .contact-list li {
            display: grid;
            grid-template-columns: 34px 1fr;
            gap: 8px;
            align-items: start;
            font-size: 12px;
          }

          .contact-label {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 20px;
            padding: 2px 6px;
            border-radius: 999px;
            background: rgba(36, 31, 36, 0.09);
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
          }

          .contact-value {
            word-break: break-word;
          }

          .lang-item {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 10px;
            padding: 7px 0;
            border-bottom: 1px dashed rgba(39, 31, 39, 0.18);
            font-size: 12px;
          }

          .lang-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .lang-name {
            font-weight: 800;
          }

          .lang-level {
            font-size: 11px;
            opacity: 0.86;
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
            padding: 5px 9px;
            border-radius: 999px;
            background: rgba(255,255,255,0.62);
            border: 1px solid rgba(48, 39, 48, 0.12);
            font-size: 11px;
            font-weight: 700;
          }

          .summary {
            margin: 0;
            font-size: 12px;
            line-height: 1.55;
          }

          .entry {
            margin-bottom: 10px;
          }

          .entry:last-child {
            margin-bottom: 0;
          }

          .card {
            background: rgba(255,255,255,0.82);
            border-radius: 10px;
            padding: 10px 10px 9px;
            border: 1px solid rgba(53, 43, 53, 0.08);
          }

          .compact {
            padding-top: 9px;
            padding-bottom: 8px;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 6px;
          }

          .entry-title {
            margin: 0;
            font-size: 13px;
            font-weight: 900;
            line-height: 1.2;
          }

          .entry-sub {
            margin-top: 2px;
            font-size: 11px;
            line-height: 1.35;
            color: #544754;
            font-weight: 700;
          }

          .entry-date {
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            color: #4b414b;
            white-space: nowrap;
            padding-top: 2px;
          }

          .entry-text {
            margin: 0;
            font-size: 11.5px;
            line-height: 1.45;
          }

          .entry-link {
            margin-top: 2px;
            font-size: 10.5px;
            line-height: 1.35;
            color: #5f4f5c;
            word-break: break-word;
          }

          .bullets {
            margin: 6px 0 0 0;
            padding-left: 16px;
          }

          .bullets li {
            margin: 0 0 4px 0;
            font-size: 11.5px;
            line-height: 1.45;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 7px;
          }

          .mini-tag {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 999px;
            font-size: 10px;
            font-weight: 800;
            background: #efe4f3;
            color: #433643;
            white-space: nowrap;
          }

          .decor-star {
            position: absolute;
            right: 10mm;
            top: 40mm;
            width: 34px;
            height: 34px;
            opacity: 0.9;
          }

          .decor-star::before,
          .decor-star::after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            width: 34px;
            height: 6px;
            background: #1f1b1f;
            border-radius: 3px;
            transform: translate(-50%, -50%) rotate(0deg);
          }

          .decor-star::after {
            transform: translate(-50%, -50%) rotate(90deg);
          }

          .decor-star span::before,
          .decor-star span::after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            width: 34px;
            height: 6px;
            background: #1f1b1f;
            border-radius: 3px;
          }

          .decor-star span::before {
            transform: translate(-50%, -50%) rotate(45deg);
          }

          .decor-star span::after {
            transform: translate(-50%, -50%) rotate(-45deg);
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
            ${hasHeader ? `
              <div class="block">
                <div class="chip-row">
                  ${phone ? `<span class="top-chip">${this.escapeHtml(phone)}</span>` : ''}
                  ${email ? `<span class="top-chip">${this.escapeHtml(email)}</span>` : ''}
                  ${country ? `<span class="top-chip">${this.escapeHtml(country)}</span>` : ''}
                </div>
                <div class="hero">
                  <h1 class="hero-name">${this.escapeHtml(fullName)}</h1>
                  ${profession ? `<div class="hero-role">${this.escapeHtml(profession)}</div>` : ''}
                </div>
              </div>
            ` : ''}

            ${hasContact ? `
              <section class="section-card" data-section="contact">
                ${this.renderSectionTitle(t.contact)}
                <ul class="contact-list">
                  ${contactItems.join('')}
                </ul>
              </section>
            ` : ''}

            ${hasLanguages ? `
              <section class="section-card" data-section="languages">
                ${this.renderSectionTitle(t.languages)}
                ${languagesHtml}
              </section>
            ` : ''}

            ${hasSkills ? `
              <section class="section-card" data-section="skills">
                ${this.renderSectionTitle(t.skills)}
                <div class="skills-wrap">
                  ${skillsHtml}
                </div>
              </section>
            ` : ''}
          </div>

          <div class="main">
            <div class="decor-star"><span></span></div>

            ${hasHeader ? `
              <section class="section-card" data-section="header" style="display:none;">
                <div>${this.escapeHtml(fullName)}</div>
                <div>${this.escapeHtml(profession)}</div>
              </section>
            ` : ''}

            ${hasProfile ? `
              <section class="section-card" data-section="profile">
                ${this.renderSectionTitle(t.profile)}
                <p class="summary">${this.escapeHtml(summary)}</p>
              </section>
            ` : ''}

            ${hasExperience ? `
              <section class="section-card" data-section="experience">
                ${this.renderSectionTitle(t.experience)}
                ${experienceHtml}
              </section>
            ` : ''}

            ${hasProjects ? `
              <section class="section-card" data-section="projects">
                ${this.renderSectionTitle(t.projects)}
                ${projectsHtml}
              </section>
            ` : ''}

            ${hasAchievements ? `
              <section class="section-card" data-section="achievements">
                ${this.renderSectionTitle(t.achievements)}
                ${achievementsHtml}
              </section>
            ` : ''}

            ${hasEducation ? `
              <section class="section-card" data-section="education">
                ${this.renderSectionTitle(t.education)}
                ${educationHtml}
              </section>
            ` : ''}

            ${hasCertifications ? `
              <section class="section-card" data-section="certifications">
                ${this.renderSectionTitle(t.certifications)}
                ${certificationsHtml}
              </section>
            ` : ''}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-rose-v1')) {
    customElements.define('gqr-resume-rose-v1', GQRResumeRoseV1);
  }
})();