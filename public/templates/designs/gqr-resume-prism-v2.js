(function() {
  'use strict';

  /**
   * name: gqr-resume-prism-v2
   * description: "Two-column resume with a dark charcoal sidebar, warm ivory main panel, refined geometric dividers, and elegant high-contrast typography."
   */

  const i18n = {
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

  const levelMap = {
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

  class GQRResumePrismV2 extends HTMLElement {
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

      if (/^\d{4}-\d{2}$/.test(value)) {
        const [year, month] = value.split('-');
        const idx = parseInt(month, 10) - 1;
        if (idx >= 0 && idx < 12) return months[idx] + ' ' + year;
      }

      if (/^\d{4}$/.test(value)) return value;

      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        return months[d.getMonth()] + ' ' + d.getFullYear();
      }

      return value;
    }

    formatRange(startDate, endDate, currentFlag, lang) {
      const t = i18n[lang] || i18n.en;
      const start = this.formatDate(startDate, lang);
      const end = currentFlag ? t.present : this.formatDate(endDate, lang);
      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderContactSection(t) {
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

      if (!email && !phone && !country && !linkedin) return '';

      const items = [];
      if (email) {
        items.push('<div class="contact-item"><span class="contact-text">' + this.escapeHtml(email) + '</span></div>');
      }
      if (phone) {
        items.push('<div class="contact-item"><span class="contact-text">' + this.escapeHtml(phone) + '</span></div>');
      }
      if (country) {
        items.push('<div class="contact-item"><span class="contact-text">' + this.escapeHtml(country) + '</span></div>');
      }
      if (linkedin) {
        items.push('<div class="contact-item"><span class="contact-text">' + this.escapeHtml(linkedin) + '</span></div>');
      }

      return `
        <section class="section side-section" data-section="contact">
          <div class="section-title sidebar-title">${this.escapeHtml(t.contact)}</div>
          <div class="contact-list">${items.join('')}</div>
        </section>
      `;
    }

    renderLanguagesSection(t, lang) {
      const items = this.safeArr(this.data?.languages);
      if (!items.length) return '';

      return `
        <section class="section side-section" data-section="languages">
          <div class="section-title sidebar-title">${this.escapeHtml(t.languages)}</div>
          <div class="language-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const name = this.safeStr(item?.name).trim();
              const levelRaw = this.safeStr(item?.level).trim().toLowerCase();
              const level = levelMap[lang]?.[levelRaw] || levelMap.en[levelRaw] || this.safeStr(item?.level);
              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                  <div class="language-name">${this.escapeHtml(name)}</div>
                  <div class="language-level">${this.escapeHtml(level)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderSkillsSection(t) {
      const skills = this.safeArr(this.data?.skillsRaw).map((s) => this.safeStr(s).trim()).filter(Boolean);
      const tools = this.safeArr(this.data?.toolsRaw).map((s) => this.safeStr(s).trim()).filter(Boolean);
      const merged = Array.from(new Set(skills.concat(tools)));
      if (!merged.length) return '';

      return `
        <section class="section side-section" data-section="skills">
          <div class="section-title sidebar-title">${this.escapeHtml(t.skills)}</div>
          <div class="skills-wrap">
            ${merged.map((skill, idx) => `
              <span class="skill-badge" data-entry-id="skill-${idx}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderHeaderSection() {
      const firstName = this.safeStr(this.data?.firstName).trim();
      const lastName = this.safeStr(this.data?.lastName).trim();
      const profession = this.safeStr(this.data?.profession).trim();
      const fullName = (firstName + ' ' + lastName).trim();

      if (!fullName && !profession) return '';

      const parts = [];
      if (firstName) parts.push('<span class="name-light">' + this.escapeHtml(firstName) + '</span>');
      if (lastName) parts.push('<span class="name-strong">' + this.escapeHtml(lastName) + '</span>');

      return `
        <section class="hero section" data-section="header">
          <div class="hero-mark"></div>
          <div class="hero-text">
            <h1 class="hero-name">${parts.join(' ') || this.escapeHtml(fullName)}</h1>
            ${profession ? `<div class="hero-role">${this.escapeHtml(profession)}</div>` : ''}
          </div>
        </section>
      `;
    }

    renderProfileSection(t) {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';

      return `
        <section class="section main-section" data-section="profile">
          <div class="section-heading">
            <span class="heading-dot"></span>
            <h2>${this.escapeHtml(t.profile)}</h2>
          </div>
          <div class="rule"></div>
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection(t, lang) {
      const items = this.safeArr(this.data?.experience);
      if (!items.length) return '';

      return `
        <section class="section main-section timeline-section" data-section="experience">
          <div class="section-heading">
            <span class="heading-dot"></span>
            <h2>${this.escapeHtml(t.experience)}</h2>
          </div>
          <div class="rule"></div>
          <div class="timeline-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const title = this.safeStr(item?.title).trim();
              const company = this.safeStr(item?.company).trim();
              const location = this.safeStr(item?.location).trim();
              const range = this.formatRange(
                this.safeStr(item?.startDate),
                this.safeStr(item?.endDate),
                !!item?.isCurrent,
                lang
              );
              const bullets = this.safeArr(item?.achievements)
                .concat(this.safeArr(item?.responsibilities))
                .map((b) => this.safeStr(b).trim())
                .filter(Boolean);

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-meta">
                      ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${company ? `<span class="company">${this.escapeHtml(company)}</span>` : ''}
                          ${(company && location) ? '<span class="sep">•</span>' : ''}
                          ${location ? `<span class="location">${this.escapeHtml(location)}</span>` : ''}
                        </div>
                      ` : ''}
                    </div>
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

    renderProjectsSection(t, lang) {
      const items = this.safeArr(this.data?.projects);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          <div class="section-heading">
            <span class="heading-dot"></span>
            <h2>${this.escapeHtml(t.projects)}</h2>
          </div>
          <div class="rule"></div>
          <div class="stack-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const name = this.safeStr(item?.name).trim();
              const description = this.safeStr(item?.description).trim();
              const url = this.safeStr(item?.url).trim();
              const technologies = this.safeArr(item?.technologies).map((x) => this.safeStr(x).trim()).filter(Boolean);
              const range = this.formatRange(
                this.safeStr(item?.startDate),
                this.safeStr(item?.endDate),
                !!item?.isOngoing,
                lang
              );

              return `
                <article class="entry project-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="project-top">
                    ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map((tech) => `<span class="tag">${this.escapeHtml(tech)}</span>`).join('')}
                    </div>
                  ` : ''}
                  ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievementsSection(t) {
      const items = this.safeArr(this.data?.achievements);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          <div class="section-heading">
            <span class="heading-dot"></span>
            <h2>${this.escapeHtml(t.achievements)}</h2>
          </div>
          <div class="rule"></div>
          <div class="stack-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const title = this.safeStr(item?.title).trim();
              const description = this.safeStr(item?.description).trim();
              const year = this.safeStr(item?.year).trim();

              return `
                <article class="entry achievement-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="project-top">
                    ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                    ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducationSection(t, lang) {
      const items = this.safeArr(this.data?.education);
      if (!items.length) return '';

      return `
        <section class="section main-section timeline-section" data-section="education">
          <div class="section-heading">
            <span class="heading-dot"></span>
            <h2>${this.escapeHtml(t.education)}</h2>
          </div>
          <div class="rule"></div>
          <div class="timeline-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const institution = this.safeStr(item?.institution).trim();
              const degree = this.safeStr(item?.degree).trim();
              const field = this.safeStr(item?.field).trim();
              const gpa = this.safeStr(item?.gpa).trim();
              const range = this.formatRange(
                this.safeStr(item?.startDate),
                this.safeStr(item?.endDate),
                item?.isCompleted === false,
                lang
              );

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
                  ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  ${degree ? `<h3 class="entry-title">${this.escapeHtml(degree)}</h3>` : ''}
                  ${(institution || field) ? `
                    <div class="entry-subtitle">
                      ${institution ? `<span class="company">${this.escapeHtml(institution)}</span>` : ''}
                      ${(institution && field) ? '<span class="sep">•</span>' : ''}
                      ${field ? `<span class="location">${this.escapeHtml(field)}</span>` : ''}
                    </div>
                  ` : ''}
                  ${gpa ? `<div class="entry-text">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertificationsSection(t) {
      const items = this.safeArr(this.data?.certifications);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          <div class="section-heading">
            <span class="heading-dot"></span>
            <h2>${this.escapeHtml(t.certifications)}</h2>
          </div>
          <div class="rule"></div>
          <div class="stack-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const name = this.safeStr(item?.name).trim();
              const issuer = this.safeStr(item?.issuer).trim();
              const date = this.safeStr(item?.date).trim();

              return `
                <article class="entry cert-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="project-top">
                    ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                    ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
                  </div>
                  ${issuer ? `<div class="entry-text">${this.escapeHtml(issuer)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    render() {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = i18n[lang] || i18n.en;

      const sidebarSections = [
        this.renderContactSection(t),
        this.renderLanguagesSection(t, lang),
        this.renderSkillsSection(t)
      ].join('');

      const mainSections = [
        this.renderHeaderSection(),
        this.renderProfileSection(t),
        this.renderExperienceSection(t, lang),
        this.renderProjectsSection(t, lang),
        this.renderAchievementsSection(t),
        this.renderEducationSection(t, lang),
        this.renderCertificationsSection(t)
      ].join('');

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2b2524;
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
            display: grid;
            grid-template-columns: 34% 66%;
            background: #f5f1eb;
            color: #2b2524;
            font-family: Arial, Helvetica, sans-serif;
          }

          .sidebar {
            background: linear-gradient(180deg, #2f2a2c 0%, #3a3437 100%);
            color: #f7f1eb;
            padding: 22mm 9mm 16mm 12mm;
            min-height: 297mm;
            position: relative;
          }

          .sidebar::after {
            content: '';
            position: absolute;
            top: 14mm;
            right: 0;
            width: 1px;
            height: calc(100% - 28mm);
            background: rgba(255,255,255,0.12);
          }

          .main {
            background: #f5f1eb;
            padding: 18mm 14mm 16mm 14mm;
            min-height: 297mm;
            position: relative;
          }

          .section {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .side-section {
            margin: 0 0 11mm 0;
          }

          .main-section {
            margin: 0 0 9mm 0;
          }

          .hero {
            margin: 0 0 10mm 0;
            display: flex;
            align-items: flex-start;
            gap: 10px;
          }

          .hero-mark {
            width: 10px;
            min-width: 10px;
            height: 54px;
            background:
              linear-gradient(180deg, #2f2a2c 0 18%, transparent 18% 26%, #8c7b6f 26% 74%, transparent 74% 82%, #2f2a2c 82% 100%);
            border-radius: 2px;
            margin-top: 2px;
          }

          .hero-name {
            margin: 0;
            line-height: 0.95;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            font-size: 18pt;
          }

          .name-light {
            font-weight: 300;
            display: inline-block;
            color: #3f3937;
          }

          .name-strong {
            font-weight: 800;
            display: inline-block;
            color: #231f20;
          }

          .hero-role {
            margin-top: 4px;
            font-size: 10.5pt;
            color: #554c47;
            letter-spacing: 0.2px;
          }

          .section-heading {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 3mm;
          }

          .heading-dot {
            width: 8px;
            height: 8px;
            background: #2f2a2c;
            transform: rotate(45deg);
            border-radius: 1px;
            flex: 0 0 auto;
          }

          .section-heading h2,
          .section-title {
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.9px;
            font-size: 10pt;
            font-weight: 800;
          }

          .sidebar-title {
            color: #ffffff;
            margin-bottom: 4mm;
          }

          .rule {
            height: 1px;
            background: #cfc4b9;
            margin: 0 0 4mm 16px;
          }

          .profile-text,
          .entry-text,
          .contact-text,
          .language-level,
          .entry-link {
            font-size: 8.7pt;
            line-height: 1.55;
          }

          .contact-list {
            display: grid;
            gap: 3mm;
          }

          .contact-item {
            position: relative;
            padding-left: 12px;
          }

          .contact-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0.56em;
            width: 5px;
            height: 5px;
            background: #cbb6a0;
            border-radius: 50%;
            transform: translateY(-50%);
          }

          .language-list {
            display: grid;
            gap: 4mm;
          }

          .language-item {
            padding-bottom: 2mm;
            border-bottom: 1px solid rgba(255,255,255,0.12);
          }

          .language-name {
            font-size: 9pt;
            font-weight: 700;
            color: #fffaf5;
            margin-bottom: 1mm;
          }

          .language-level {
            color: #d7cbc1;
            font-size: 8.3pt;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            padding: 4px 8px;
            border: 1px solid rgba(255,255,255,0.18);
            background: rgba(255,255,255,0.06);
            color: #f8f3ee;
            border-radius: 999px;
            font-size: 8pt;
            line-height: 1.2;
          }

          .timeline-list,
          .stack-list {
            display: grid;
            gap: 5mm;
          }

          .timeline-entry,
          .project-entry,
          .achievement-entry,
          .cert-entry {
            position: relative;
            padding-left: 16px;
          }

          .timeline-entry::before,
          .project-entry::before,
          .achievement-entry::before,
          .cert-entry::before {
            content: '';
            position: absolute;
            left: 0;
            top: 6px;
            width: 7px;
            height: 7px;
            background: #8c7b6f;
            transform: rotate(45deg);
            border-radius: 1px;
          }

          .entry-date {
            color: #7c6a5d;
            font-size: 8pt;
            font-weight: 700;
            letter-spacing: 0.2px;
            margin-bottom: 1.2mm;
          }

          .entry-title {
            margin: 0 0 1mm 0;
            font-size: 10pt;
            line-height: 1.25;
            font-weight: 800;
            color: #211d1e;
          }

          .entry-subtitle {
            font-size: 8.7pt;
            color: #4f4541;
            margin-bottom: 1.6mm;
            line-height: 1.35;
          }

          .company {
            font-weight: 700;
          }

          .sep {
            display: inline-block;
            margin: 0 5px;
            color: #8c7b6f;
          }

          .bullet-list {
            margin: 1.5mm 0 0 0;
            padding-left: 16px;
          }

          .bullet-list li {
            margin: 0 0 1.2mm 0;
            font-size: 8.6pt;
            line-height: 1.45;
          }

          .project-top {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 8px;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2mm;
          }

          .tag {
            display: inline-block;
            padding: 3px 7px;
            border-radius: 999px;
            background: #e7ddd3;
            color: #4d433f;
            font-size: 7.8pt;
            white-space: nowrap;
          }

          .entry-link {
            margin-top: 1.5mm;
            color: #6e5b4e;
            word-break: break-word;
          }

          @media print {
            :host {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          <div class="sidebar">
            ${sidebarSections}
          </div>
          <div class="main">
            ${mainSections}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-prism-v2')) {
    customElements.define('gqr-resume-prism-v2', GQRResumePrismV2);
  }
})();