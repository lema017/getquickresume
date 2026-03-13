(function() {
  'use strict';

  /**
   * name: gqr-resume-storm-v2
   * description: "Two-column resume with a dark graphite sidebar, warm ivory main panel, gold accent lines, and clean modern typography inspired by an elegant editorial layout."
   */

  class GQRResumeStormV2 extends HTMLElement {
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

    formatSingleDate(value, lang) {
      const v = this.safeStr(value).trim();
      if (!v) return '';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const ym = /^(\d{4})-(\d{2})$/;
      const ymd = /^(\d{4})-(\d{2})-(\d{2})$/;
      const y = /^(\d{4})$/;

      let match = v.match(ym) || v.match(ymd);
      if (match) {
        const year = match[1];
        const monthIndex = parseInt(match[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return months[monthIndex] + ' ' + year;
        }
      }
      match = v.match(y);
      if (match) return match[1];
      return v;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const start = this.formatSingleDate(startDate, lang);
      const end = isCurrentLike ? t.present : this.formatSingleDate(endDate, lang);

      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderContactSection(lang, t) {
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

      const items = [];
      if (email) items.push(`<div class="contact-item"><span class="contact-label">Email</span><span class="contact-value">${this.escapeHtml(email)}</span></div>`);
      if (phone) items.push(`<div class="contact-item"><span class="contact-label">${lang === 'es' ? 'Teléfono' : 'Phone'}</span><span class="contact-value">${this.escapeHtml(phone)}</span></div>`);
      if (country) items.push(`<div class="contact-item"><span class="contact-label">${lang === 'es' ? 'Ubicación' : 'Location'}</span><span class="contact-value">${this.escapeHtml(country)}</span></div>`);
      if (linkedin) items.push(`<div class="contact-item"><span class="contact-label">LinkedIn</span><span class="contact-value">${this.escapeHtml(linkedin)}</span></div>`);

      if (!items.length) return '';
      return `
        <section class="section side-section" data-section="contact">
          <h3 class="section-title sidebar-title">${this.escapeHtml(t.contact)}</h3>
          <div class="contact-list">${items.join('')}</div>
        </section>
      `;
    }

    renderLanguagesSection(lang, t) {
      const items = this.safeArr(this.data?.languages)
        .filter(item => item && (this.safeStr(item.name).trim() || this.safeStr(item.level).trim()))
        .map((item, idx) => {
          const id = this.safeStr(item.id).trim() || `lang-${idx}`;
          const name = this.safeStr(item.name).trim();
          const levelKey = this.safeStr(item.level).trim().toLowerCase();
          const level = this.levelMap[lang]?.[levelKey] || this.safeStr(item.level).trim();
          return `
            <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
              <div class="language-name">${this.escapeHtml(name)}</div>
              <div class="language-level">${this.escapeHtml(level)}</div>
            </div>
          `;
        });

      if (!items.length) return '';
      return `
        <section class="section side-section" data-section="languages">
          <h3 class="section-title sidebar-title">${this.escapeHtml(t.languages)}</h3>
          <div class="language-list">${items.join('')}</div>
        </section>
      `;
    }

    renderSkillsSection(lang, t) {
      const merged = [...this.safeArr(this.data?.skillsRaw), ...this.safeArr(this.data?.toolsRaw)]
        .map(v => this.safeStr(v).trim())
        .filter(Boolean);

      const deduped = [];
      const seen = new Set();
      for (const skill of merged) {
        const key = skill.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          deduped.push(skill);
        }
      }

      if (!deduped.length) return '';
      return `
        <section class="section side-section" data-section="skills">
          <h3 class="section-title sidebar-title">${this.escapeHtml(t.skills)}</h3>
          <div class="skills-wrap">
            ${deduped.map((skill, idx) => `
              <span class="skill-badge" data-entry-id="skill-${idx}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderProfileSection(t) {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';
      return `
        <section class="section main-section" data-section="profile">
          <h3 class="section-title main-title">${this.escapeHtml(t.profile)}</h3>
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection(t) {
      const items = this.safeArr(this.data?.experience)
        .filter(item => item && (this.safeStr(item.title).trim() || this.safeStr(item.company).trim()))
        .map((item, idx) => {
          const id = this.safeStr(item.id).trim() || `exp-${idx}`;
          const title = this.safeStr(item.title).trim();
          const company = this.safeStr(item.company).trim();
          const location = this.safeStr(item.location).trim();
          const range = this.formatDateRange(item.startDate, item.endDate, !!item.isCurrent);
          const bullets = [...this.safeArr(item.achievements), ...this.safeArr(item.responsibilities)]
            .map(v => this.safeStr(v).trim())
            .filter(Boolean);

          return `
            <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
              <div class="entry-head">
                <div class="entry-primary">
                  ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                  ${(company || location) ? `<div class="entry-subtitle">${this.escapeHtml(company)}${company && location ? ' · ' : ''}${this.escapeHtml(location)}</div>` : ''}
                </div>
                ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
              </div>
              ${bullets.length ? `
                <ul class="bullet-list">
                  ${bullets.map(b => `<li>${this.escapeHtml(b)}</li>`).join('')}
                </ul>
              ` : ''}
            </article>
          `;
        });

      if (!items.length) return '';
      return `
        <section class="section main-section" data-section="experience">
          <h3 class="section-title main-title">${this.escapeHtml(t.experience)}</h3>
          <div class="entry-list">${items.join('')}</div>
        </section>
      `;
    }

    renderProjectsSection(t) {
      const items = this.safeArr(this.data?.projects)
        .filter(item => item && (this.safeStr(item.name).trim() || this.safeStr(item.description).trim()))
        .map((item, idx) => {
          const id = this.safeStr(item.id).trim() || `proj-${idx}`;
          const name = this.safeStr(item.name).trim();
          const description = this.safeStr(item.description).trim();
          const technologies = this.safeArr(item.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
          const url = this.safeStr(item.url).trim();
          const range = this.formatDateRange(item.startDate, item.endDate, !!item.isOngoing);

          return `
            <article class="entry card-entry" data-entry-id="${this.escapeHtml(id)}">
              <div class="entry-head">
                <div class="entry-primary">
                  ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                  ${url ? `<div class="entry-subtitle">${this.escapeHtml(url)}</div>` : ''}
                </div>
                ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
              </div>
              ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
              ${technologies.length ? `
                <div class="tag-row">
                  ${technologies.map(tag => `<span class="mini-tag">${this.escapeHtml(tag)}</span>`).join('')}
                </div>
              ` : ''}
            </article>
          `;
        });

      if (!items.length) return '';
      return `
        <section class="section main-section" data-section="projects">
          <h3 class="section-title main-title">${this.escapeHtml(t.projects)}</h3>
          <div class="entry-list">${items.join('')}</div>
        </section>
      `;
    }

    renderAchievementsSection(t) {
      const items = this.safeArr(this.data?.achievements)
        .filter(item => item && (this.safeStr(item.title).trim() || this.safeStr(item.description).trim()))
        .map((item, idx) => {
          const id = this.safeStr(item.id).trim() || `achievement-${idx}`;
          const title = this.safeStr(item.title).trim();
          const description = this.safeStr(item.description).trim();
          const year = this.safeStr(item.year).trim();

          return `
            <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
              <div class="entry-head">
                <div class="entry-title">${this.escapeHtml(title)}</div>
                ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
              </div>
              ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
            </article>
          `;
        });

      if (!items.length) return '';
      return `
        <section class="section main-section" data-section="achievements">
          <h3 class="section-title main-title">${this.escapeHtml(t.achievements)}</h3>
          <div class="entry-list">${items.join('')}</div>
        </section>
      `;
    }

    renderEducationSection(t) {
      const items = this.safeArr(this.data?.education)
        .filter(item => item && (this.safeStr(item.institution).trim() || this.safeStr(item.degree).trim() || this.safeStr(item.field).trim()))
        .map((item, idx) => {
          const id = this.safeStr(item.id).trim() || `edu-${idx}`;
          const institution = this.safeStr(item.institution).trim();
          const degree = this.safeStr(item.degree).trim();
          const field = this.safeStr(item.field).trim();
          const gpa = this.safeStr(item.gpa).trim();
          const range = this.formatDateRange(item.startDate, item.endDate, item.isCompleted === false);

          const degreeLine = [degree, field].filter(Boolean).join(degree && field ? ' — ' : '');

          return `
            <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
              <div class="entry-head">
                <div class="entry-primary">
                  ${institution ? `<div class="entry-title">${this.escapeHtml(institution)}</div>` : ''}
                  ${degreeLine ? `<div class="entry-subtitle">${this.escapeHtml(degreeLine)}</div>` : ''}
                  ${gpa ? `<div class="entry-meta">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                </div>
                ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
              </div>
            </article>
          `;
        });

      if (!items.length) return '';
      return `
        <section class="section main-section" data-section="education">
          <h3 class="section-title main-title">${this.escapeHtml(t.education)}</h3>
          <div class="entry-list">${items.join('')}</div>
        </section>
      `;
    }

    renderCertificationsSection(t) {
      const items = this.safeArr(this.data?.certifications)
        .filter(item => item && (this.safeStr(item.name).trim() || this.safeStr(item.issuer).trim()))
        .map((item, idx) => {
          const id = this.safeStr(item.id).trim() || `cert-${idx}`;
          const name = this.safeStr(item.name).trim();
          const issuer = this.safeStr(item.issuer).trim();
          const date = this.formatSingleDate(item.date, this.getLanguage() === 'es' ? 'es' : 'en');

          return `
            <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
              <div class="entry-head">
                <div class="entry-primary">
                  ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                  ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
                </div>
                ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
              </div>
            </article>
          `;
        });

      if (!items.length) return '';
      return `
        <section class="section main-section" data-section="certifications">
          <h3 class="section-title main-title">${this.escapeHtml(t.certifications)}</h3>
          <div class="entry-list">${items.join('')}</div>
        </section>
      `;
    }

    render() {
      if (!this.shadowRoot) return;

      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];

      const firstName = this.safeStr(this.data?.firstName).trim();
      const lastName = this.safeStr(this.data?.lastName).trim();
      const profession = this.safeStr(this.data?.profession).trim();
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      const contactSection = this.renderContactSection(lang, t);
      const languagesSection = this.renderLanguagesSection(lang, t);
      const skillsSection = this.renderSkillsSection(lang, t);

      const profileSection = this.renderProfileSection(t);
      const experienceSection = this.renderExperienceSection(t);
      const projectsSection = this.renderProjectsSection(t);
      const achievementsSection = this.renderAchievementsSection(t);
      const educationSection = this.renderEducationSection(t);
      const certificationsSection = this.renderCertificationsSection(t);

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #1f1a17;
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
              linear-gradient(90deg, #1d1a19 0 33%, #f6f0e7 33% 100%);
            color: #1f1a17;
            display: grid;
            grid-template-columns: 33% 67%;
            font-family: Georgia, "Times New Roman", serif;
            position: relative;
          }

          .page::before,
          .page::after {
            content: "";
            position: absolute;
            width: 44px;
            height: 44px;
            border: 2px solid rgba(181, 145, 84, 0.55);
            pointer-events: none;
          }

          .page::before {
            top: 12px;
            right: 12px;
            border-left: none;
            border-bottom: none;
          }

          .page::after {
            left: 12px;
            bottom: 12px;
            border-right: none;
            border-top: none;
          }

          .sidebar {
            padding: 26mm 8mm 16mm 12mm;
            color: #f3ece3;
            min-width: 0;
          }

          .main {
            padding: 20mm 14mm 16mm 14mm;
            min-width: 0;
          }

          .section {
            margin: 0 0 9mm 0;
          }

          .section-title {
            margin: 0 0 5mm 0;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            font-size: 10px;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: 700;
          }

          .sidebar-title {
            color: #d7b37a;
            border-bottom: 1px solid rgba(215, 179, 122, 0.35);
            padding-bottom: 2mm;
          }

          .main-title {
            color: #8f6a38;
            border-bottom: 1px solid rgba(143, 106, 56, 0.28);
            padding-bottom: 2mm;
          }

          .main [data-section="header"] {
            margin-bottom: 9mm;
            padding-bottom: 6mm;
            border-bottom: 2px solid rgba(143, 106, 56, 0.22);
          }

          .name {
            font-size: 26px;
            line-height: 1.05;
            font-weight: 700;
            color: #211b18;
            letter-spacing: 0.01em;
            margin: 0 0 3mm 0;
          }

          .profession {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: #8f6a38;
            margin: 0;
          }

          .profile-text,
          .entry-text,
          .bullet-list li,
          .contact-value,
          .language-level,
          .entry-meta {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            line-height: 1.55;
          }

          .contact-list {
            display: flex;
            flex-direction: column;
            gap: 3.2mm;
          }

          .contact-item {
            display: flex;
            flex-direction: column;
            gap: 1mm;
          }

          .contact-label {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            color: #c7a36d;
          }

          .contact-value {
            color: #f3ece3;
            word-break: break-word;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 3.5mm;
          }

          .language-item {
            padding-left: 3mm;
            border-left: 2px solid rgba(215, 179, 122, 0.45);
          }

          .language-name {
            font-size: 12px;
            line-height: 1.35;
            color: #fff7ee;
            margin-bottom: 0.5mm;
          }

          .language-level {
            color: #d9c3a2;
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
            border: 1px solid rgba(215, 179, 122, 0.45);
            background: rgba(215, 179, 122, 0.08);
            color: #f6efe6;
            border-radius: 999px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10px;
            line-height: 1.2;
          }

          .entry-list {
            display: flex;
            flex-direction: column;
            gap: 5mm;
          }

          .entry {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .timeline-entry,
          .card-entry,
          .compact-entry {
            position: relative;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4mm;
            margin-bottom: 1.5mm;
          }

          .entry-primary {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            font-size: 14px;
            line-height: 1.3;
            font-weight: 700;
            color: #211b18;
          }

          .entry-subtitle {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            line-height: 1.45;
            color: #6b5a4b;
            margin-top: 0.7mm;
          }

          .entry-date {
            flex: 0 0 auto;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10px;
            line-height: 1.35;
            color: #8f6a38;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            text-align: right;
            white-space: nowrap;
            padding-top: 0.6mm;
          }

          .entry-text {
            color: #342d29;
          }

          .entry-meta {
            color: #6b5a4b;
            margin-top: 1mm;
          }

          .bullet-list {
            margin: 2mm 0 0 0;
            padding: 0 0 0 4.5mm;
          }

          .bullet-list li {
            color: #342d29;
            margin: 0 0 1.2mm 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2.2mm;
          }

          .mini-tag {
            display: inline-block;
            white-space: nowrap;
            padding: 4px 8px;
            background: #eadbc7;
            color: #5a4633;
            border-radius: 999px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10px;
            line-height: 1.2;
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
            ${contactSection}
            ${languagesSection}
            ${skillsSection}
          </div>

          <div class="main">
            <section class="section" data-section="header">
              ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
              ${profession ? `<p class="profession">${this.escapeHtml(profession)}</p>` : ''}
            </section>

            ${profileSection}
            ${experienceSection}
            ${projectsSection}
            ${achievementsSection}
            ${educationSection}
            ${certificationsSection}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-storm-v2')) {
    customElements.define('gqr-resume-storm-v2', GQRResumeStormV2);
  }
})();