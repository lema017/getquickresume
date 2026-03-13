(function() {
  'use strict';

  /**
   * name: gqr-resume-reed-v2
   * description: "Two-column resume with a dark charcoal sidebar, warm gold accents, bold geometric headings, and a clean light main column inspired by editorial CV layouts."
   */

  class GQRResumeReedV2 extends HTMLElement {
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
      const v = this.safeStr(value).trim();
      if (!v) return '';
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };
      const match = v.match(/^(\d{4})(?:-(\d{2}))?/);
      if (!match) return this.escapeHtml(v);
      const year = match[1];
      const month = match[2] ? parseInt(match[2], 10) : null;
      if (!month || month < 1 || month > 12) return year;
      return `${months[lang] ? months[lang][month - 1] : months.en[month - 1]} ${year}`;
    }

    formatDateRange(startDate, endDate, currentLike, lang) {
      const dict = this.i18n[lang] || this.i18n.en;
      const start = this.formatDate(startDate, lang);
      const end = currentLike ? dict.present : this.formatDate(endDate, lang);
      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderContactSection(lang, labels) {
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

      const items = [];
      if (email) items.push(`<div class="contact-item"><span class="contact-bullet"></span><span>${this.escapeHtml(email)}</span></div>`);
      if (phone) items.push(`<div class="contact-item"><span class="contact-bullet"></span><span>${this.escapeHtml(phone)}</span></div>`);
      if (country) items.push(`<div class="contact-item"><span class="contact-bullet"></span><span>${this.escapeHtml(country)}</span></div>`);
      if (linkedin) items.push(`<div class="contact-item"><span class="contact-bullet"></span><span>${this.escapeHtml(linkedin)}</span></div>`);

      if (!items.length) return '';
      return `
        <section class="section section-sidebar contact" data-section="contact">
          <h3 class="section-title sidebar-title">${this.escapeHtml(labels.contact)}</h3>
          <div class="section-body">
            ${items.join('')}
          </div>
        </section>
      `;
    }

    renderLanguagesSection(lang, labels) {
      const languages = this.safeArr(this.data?.languages).filter(Boolean).filter(item => this.safeStr(item.name).trim());
      if (!languages.length) return '';

      return `
        <section class="section section-sidebar" data-section="languages">
          <h3 class="section-title sidebar-title">${this.escapeHtml(labels.languages)}</h3>
          <div class="section-body stack">
            ${languages.map((item) => {
              const id = this.safeStr(item.id).trim();
              const name = this.safeStr(item.name).trim();
              const levelKey = this.safeStr(item.level).trim().toLowerCase();
              const levelText = (this.levelMap[lang] || this.levelMap.en)[levelKey] || this.safeStr(item.level).trim();
              return `
                <div class="lang-item" data-entry-id="${this.escapeHtml(id)}">
                  <div class="lang-name">${this.escapeHtml(name)}</div>
                  <div class="lang-level">${this.escapeHtml(levelText)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderSkillsSection(labels) {
      const merged = [...this.safeArr(this.data?.skillsRaw), ...this.safeArr(this.data?.toolsRaw)]
        .map(v => this.safeStr(v).trim())
        .filter(Boolean);

      const deduped = [];
      const seen = new Set();
      merged.forEach(skill => {
        const key = skill.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          deduped.push(skill);
        }
      });

      if (!deduped.length) return '';

      return `
        <section class="section section-sidebar" data-section="skills">
          <h3 class="section-title sidebar-title">${this.escapeHtml(labels.skills)}</h3>
          <div class="section-body skill-wrap">
            ${deduped.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderHeaderSection() {
      const firstName = this.safeStr(this.data?.firstName).trim();
      const lastName = this.safeStr(this.data?.lastName).trim();
      const profession = this.safeStr(this.data?.profession).trim();
      const fullName = `${firstName} ${lastName}`.trim();

      if (!fullName && !profession) return '';

      return `
        <section class="hero" data-section="header">
          <div class="hero-mark"></div>
          <div class="hero-text">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession-chip">${this.escapeHtml(profession)}</div>` : ''}
          </div>
        </section>
      `;
    }

    renderProfileSection(labels) {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';

      return `
        <section class="section" data-section="profile">
          <h2 class="section-title main-title">${this.escapeHtml(labels.profile)}</h2>
          <div class="summary">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection(lang, labels) {
      const list = this.safeArr(this.data?.experience).filter(Boolean).filter(item =>
        this.safeStr(item.title).trim() || this.safeStr(item.company).trim()
      );
      if (!list.length) return '';

      return `
        <section class="section" data-section="experience">
          <h2 class="section-title main-title">${this.escapeHtml(labels.experience)}</h2>
          <div class="entries">
            ${list.map(item => {
              const id = this.safeStr(item.id).trim();
              const title = this.safeStr(item.title).trim();
              const company = this.safeStr(item.company).trim();
              const location = this.safeStr(item.location).trim();
              const range = this.formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang);
              const bullets = [...this.safeArr(item.achievements), ...this.safeArr(item.responsibilities)]
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-heading">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                      ${(company || location) ? `<div class="entry-subtitle">${this.escapeHtml([company, location].filter(Boolean).join(' • '))}</div>` : ''}
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
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjectsSection(lang, labels) {
      const list = this.safeArr(this.data?.projects).filter(Boolean).filter(item =>
        this.safeStr(item.name).trim() || this.safeStr(item.description).trim()
      );
      if (!list.length) return '';

      return `
        <section class="section" data-section="projects">
          <h2 class="section-title main-title">${this.escapeHtml(labels.projects)}</h2>
          <div class="entries compact-entries">
            ${list.map(item => {
              const id = this.safeStr(item.id).trim();
              const name = this.safeStr(item.name).trim();
              const description = this.safeStr(item.description).trim();
              const technologies = this.safeArr(item.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const url = this.safeStr(item.url).trim();
              const range = this.formatDateRange(item.startDate, item.endDate, !!item.isOngoing, lang);

              return `
                <article class="entry card-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-heading">
                      ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                      ${range ? `<div class="entry-subtitle">${this.escapeHtml(range)}</div>` : ''}
                    </div>
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `<div class="tag-row">${technologies.map(t => `<span class="tag">${this.escapeHtml(t)}</span>`).join('')}</div>` : ''}
                  ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievementsSection(labels) {
      const list = this.safeArr(this.data?.achievements).filter(Boolean).filter(item =>
        this.safeStr(item.title).trim() || this.safeStr(item.description).trim()
      );
      if (!list.length) return '';

      return `
        <section class="section" data-section="achievements">
          <h2 class="section-title main-title">${this.escapeHtml(labels.achievements)}</h2>
          <div class="entries compact-entries">
            ${list.map(item => {
              const id = this.safeStr(item.id).trim();
              const title = this.safeStr(item.title).trim();
              const description = this.safeStr(item.description).trim();
              const year = this.safeStr(item.year).trim();

              return `
                <article class="entry mini-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
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

    renderEducationSection(lang, labels) {
      const list = this.safeArr(this.data?.education).filter(Boolean).filter(item =>
        this.safeStr(item.institution).trim() || this.safeStr(item.degree).trim() || this.safeStr(item.field).trim()
      );
      if (!list.length) return '';

      return `
        <section class="section" data-section="education">
          <h2 class="section-title main-title">${this.escapeHtml(labels.education)}</h2>
          <div class="entries">
            ${list.map(item => {
              const id = this.safeStr(item.id).trim();
              const institution = this.safeStr(item.institution).trim();
              const degree = this.safeStr(item.degree).trim();
              const field = this.safeStr(item.field).trim();
              const gpa = this.safeStr(item.gpa).trim();
              const range = this.formatDateRange(item.startDate, item.endDate, item.isCompleted === false, lang);
              const degreeLine = [degree, field].filter(Boolean).join(' — ');

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-heading">
                      ${degreeLine ? `<div class="entry-title">${this.escapeHtml(degreeLine)}</div>` : ''}
                      ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${gpa ? `<div class="entry-text">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertificationsSection(labels) {
      const list = this.safeArr(this.data?.certifications).filter(Boolean).filter(item =>
        this.safeStr(item.name).trim() || this.safeStr(item.issuer).trim()
      );
      if (!list.length) return '';

      return `
        <section class="section" data-section="certifications">
          <h2 class="section-title main-title">${this.escapeHtml(labels.certifications)}</h2>
          <div class="entries compact-entries">
            ${list.map(item => {
              const id = this.safeStr(item.id).trim();
              const name = this.safeStr(item.name).trim();
              const issuer = this.safeStr(item.issuer).trim();
              const date = this.safeStr(item.date).trim();

              return `
                <article class="entry mini-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                    ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
                  </div>
                  ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    render() {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const labels = this.i18n[lang] || this.i18n.en;

      const sidebarContact = this.renderContactSection(lang, labels);
      const sidebarLanguages = this.renderLanguagesSection(lang, labels);
      const sidebarSkills = this.renderSkillsSection(labels);

      const mainHeader = this.renderHeaderSection();
      const mainProfile = this.renderProfileSection(labels);
      const mainExperience = this.renderExperienceSection(lang, labels);
      const mainProjects = this.renderProjectsSection(lang, labels);
      const mainAchievements = this.renderAchievementsSection(labels);
      const mainEducation = this.renderEducationSection(lang, labels);
      const mainCertifications = this.renderCertificationsSection(labels);

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #161616;
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
            background: #efefec;
            display: grid;
            grid-template-columns: 34% 66%;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.35;
          }

          .sidebar {
            background: linear-gradient(180deg, #111111 0%, #070707 100%);
            color: #f3efe7;
            padding: 28px 18px 28px 18px;
            position: relative;
          }

          .sidebar::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 10px;
            background: #d6aa1c;
          }

          .sidebar::after {
            content: '';
            position: absolute;
            right: 10px;
            bottom: 12px;
            width: 90px;
            height: 90px;
            border-radius: 50%;
            border: 1px solid rgba(214,170,28,0.22);
            box-shadow:
              0 0 0 10px rgba(214,170,28,0.06),
              0 0 0 20px rgba(214,170,28,0.04);
            opacity: 0.9;
          }

          .main {
            padding: 24px 26px 28px 26px;
            background: #efefec;
          }

          .hero {
            background: #e3e3e1;
            padding: 20px 22px 18px 22px;
            margin-bottom: 14px;
            position: relative;
            overflow: hidden;
          }

          .hero-mark {
            width: 70px;
            height: 6px;
            background: #d6aa1c;
            margin-bottom: 10px;
          }

          .name {
            margin: 0;
            font-size: 30px;
            line-height: 1.1;
            font-weight: 800;
            color: #111111;
            letter-spacing: -0.4px;
          }

          .profession-chip {
            display: inline-block;
            margin-top: 10px;
            background: #d6aa1c;
            color: #111111;
            font-weight: 700;
            font-size: 13px;
            padding: 5px 10px;
          }

          .section {
            margin-bottom: 18px;
          }

          .section-title {
            margin: 0 0 10px 0;
            font-weight: 800;
            letter-spacing: -0.2px;
          }

          .sidebar-title {
            color: #ffffff;
            font-size: 21px;
            line-height: 1.1;
            position: relative;
            padding-bottom: 7px;
          }

          .sidebar-title::after {
            content: '';
            display: block;
            width: 42px;
            height: 4px;
            background: #d6aa1c;
            margin-top: 6px;
          }

          .main-title {
            color: #151515;
            font-size: 25px;
            line-height: 1.1;
            position: relative;
            padding-bottom: 7px;
          }

          .main-title::after {
            content: '';
            display: block;
            width: 40px;
            height: 4px;
            background: #d6aa1c;
            margin-top: 6px;
          }

          .section-body,
          .summary,
          .entry-text,
          .entry-subtitle,
          .entry-date,
          .lang-level,
          .contact-item,
          .tag,
          .skill-badge,
          .entry-link {
            font-size: 12.5px;
          }

          .summary {
            color: #444444;
          }

          .contact-item {
            display: flex;
            gap: 9px;
            align-items: flex-start;
            margin-bottom: 8px;
            color: #efe8d6;
            word-break: break-word;
          }

          .contact-bullet {
            width: 8px;
            height: 8px;
            min-width: 8px;
            border-radius: 50%;
            background: #d6aa1c;
            margin-top: 4px;
          }

          .stack {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .lang-item {
            padding-bottom: 8px;
            border-bottom: 1px solid rgba(255,255,255,0.12);
          }

          .lang-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .lang-name {
            color: #ffffff;
            font-weight: 700;
            font-size: 13px;
          }

          .lang-level {
            color: #d0d0d0;
            margin-top: 2px;
          }

          .skill-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            background: rgba(214,170,28,0.14);
            color: #f6f0de;
            border: 1px solid rgba(214,170,28,0.35);
            padding: 5px 8px;
            border-radius: 999px;
          }

          .entries {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .compact-entries {
            gap: 10px;
          }

          .entry {
            break-inside: avoid;
          }

          .timeline-entry {
            position: relative;
            padding-left: 16px;
          }

          .timeline-entry::before {
            content: '';
            position: absolute;
            left: 0;
            top: 6px;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #d6aa1c;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            align-items: flex-start;
          }

          .entry-heading {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            color: #111111;
            font-size: 15px;
            font-weight: 800;
            line-height: 1.2;
          }

          .entry-subtitle {
            color: #5a5a5a;
            margin-top: 2px;
          }

          .entry-date {
            color: #646464;
            font-weight: 700;
            white-space: nowrap;
            text-align: right;
          }

          .bullet-list {
            margin: 7px 0 0 0;
            padding-left: 18px;
            color: #3d3d3d;
            font-size: 12.5px;
          }

          .bullet-list li {
            margin: 0 0 4px 0;
          }

          .card-entry,
          .mini-entry {
            background: rgba(255,255,255,0.5);
            border-left: 4px solid #d6aa1c;
            padding: 10px 12px;
          }

          .entry-text {
            color: #444444;
            margin-top: 5px;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
          }

          .tag {
            display: inline-block;
            padding: 4px 8px;
            background: #e3e3e1;
            color: #2e2e2e;
            border-radius: 999px;
            white-space: nowrap;
          }

          .entry-link {
            color: #6a5420;
            margin-top: 7px;
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
            ${sidebarContact}
            ${sidebarLanguages}
            ${sidebarSkills}
          </div>
          <div class="main">
            ${mainHeader}
            ${mainProfile}
            ${mainExperience}
            ${mainProjects}
            ${mainAchievements}
            ${mainEducation}
            ${mainCertifications}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-reed-v2')) {
    customElements.define('gqr-resume-reed-v2', GQRResumeReedV2);
  }
})();