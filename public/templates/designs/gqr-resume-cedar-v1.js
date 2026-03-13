(function() {
  'use strict';

  /**
   * name: gqr-resume-cedar-v1
   * description: "Two-column resume with a warm light-gray sidebar, clean white main panel, bold uppercase headings, and refined serif-sans typography inspired by an editorial sidebar/main layout."
   */

  class GQRResumeCedarV1 extends HTMLElement {
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
      const attrLang = this.getAttribute('language');
      return attrLang || this.data?.language || 'en';
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
      const raw = this.safeStr(value).trim();
      if (!raw) return '';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const ymMatch = raw.match(/^(\d{4})-(\d{2})$/);
      if (ymMatch) {
        const year = ymMatch[1];
        const monthIndex = parseInt(ymMatch[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return `${months[monthIndex]} ${year}`;
        }
      }

      const ymdMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (ymdMatch) {
        const year = ymdMatch[1];
        const monthIndex = parseInt(ymdMatch[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return `${months[monthIndex]} ${year}`;
        }
      }

      return raw;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const dict = this.i18n[lang] || this.i18n.en;
      const start = this.formatDate(startDate, lang);
      const end = isCurrentLike ? dict.present : this.formatDate(endDate, lang);

      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    getLabels() {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      return this.i18n[lang] || this.i18n.en;
    }

    getLevelLabel(level) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const map = this.levelMap[lang] || this.levelMap.en;
      const key = this.safeStr(level).toLowerCase();
      return map[key] || this.safeStr(level);
    }

    mergeSkills() {
      const combined = [...this.safeArr(this.data?.skillsRaw), ...this.safeArr(this.data?.toolsRaw)]
        .map(v => this.safeStr(v).trim())
        .filter(Boolean);

      const seen = new Set();
      const result = [];
      combined.forEach(item => {
        const key = item.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          result.push(item);
        }
      });
      return result;
    }

    renderContactSection(labels) {
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

      const items = [];
      if (phone) items.push(`<li class="contact-item"><span class="contact-label">Phone</span><span class="contact-value">${this.escapeHtml(phone)}</span></li>`);
      if (email) items.push(`<li class="contact-item"><span class="contact-label">Email</span><span class="contact-value">${this.escapeHtml(email)}</span></li>`);
      if (country) items.push(`<li class="contact-item"><span class="contact-label">Address</span><span class="contact-value">${this.escapeHtml(country)}</span></li>`);
      if (linkedin) items.push(`<li class="contact-item"><span class="contact-label">LinkedIn</span><span class="contact-value">${this.escapeHtml(linkedin)}</span></li>`);

      if (!items.length) return '';

      return `
        <section class="section sidebar-section contact-section" data-section="contact">
          <h3 class="sidebar-title">${this.escapeHtml(labels.contact)}</h3>
          <ul class="contact-list">${items.join('')}</ul>
        </section>
      `;
    }

    renderLanguagesSection(labels) {
      const languages = this.safeArr(this.data?.languages).filter(item => {
        return this.safeStr(item?.name).trim();
      });

      if (!languages.length) return '';

      return `
        <section class="section sidebar-section" data-section="languages">
          <h3 class="sidebar-title">${this.escapeHtml(labels.languages)}</h3>
          <div class="list-compact">
            ${languages.map((item, index) => `
              <div class="lang-item" data-entry-id="${this.escapeHtml(this.safeStr(item?.id) || `lang-${index}`)}">
                <div class="lang-name">${this.escapeHtml(this.safeStr(item?.name))}</div>
                <div class="lang-level">${this.escapeHtml(this.getLevelLabel(item?.level))}</div>
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderSkillsSection(labels) {
      const skills = this.mergeSkills();
      if (!skills.length) return '';

      return `
        <section class="section sidebar-section" data-section="skills">
          <h3 class="sidebar-title">${this.escapeHtml(labels.skills)}</h3>
          <div class="skills-wrap">
            ${skills.map((skill, index) => `
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
        <section class="section header-section" data-section="header">
          <div class="name-block">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
        </section>
      `;
    }

    renderProfileSection(labels) {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';

      return `
        <section class="section main-section" data-section="profile">
          <h2 class="main-title">${this.escapeHtml(labels.profile)}</h2>
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection(labels) {
      const experience = this.safeArr(this.data?.experience).filter(item => {
        return this.safeStr(item?.title).trim() || this.safeStr(item?.company).trim();
      });
      if (!experience.length) return '';

      return `
        <section class="section main-section" data-section="experience">
          <h2 class="main-title">${this.escapeHtml(labels.experience)}</h2>
          <div class="entries">
            ${experience.map((item, index) => {
              const title = this.safeStr(item?.title).trim();
              const company = this.safeStr(item?.company).trim();
              const location = this.safeStr(item?.location).trim();
              const range = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isCurrent);
              const bullets = [
                ...this.safeArr(item?.achievements),
                ...this.safeArr(item?.responsibilities)
              ].map(v => this.safeStr(v).trim()).filter(Boolean);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id) || `exp-${index}`)}">
                  <div class="entry-head">
                    <div class="entry-heading-group">
                      ${(title || company) ? `<div class="entry-title">${this.escapeHtml(title || company)}</div>` : ''}
                      ${(company || location) ? `<div class="entry-subtitle">${this.escapeHtml([company, location].filter(Boolean).join(', '))}</div>` : ''}
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

    renderProjectsSection(labels) {
      const projects = this.safeArr(this.data?.projects).filter(item => {
        return this.safeStr(item?.name).trim() || this.safeStr(item?.description).trim();
      });
      if (!projects.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          <h2 class="main-title">${this.escapeHtml(labels.projects)}</h2>
          <div class="entries">
            ${projects.map((item, index) => {
              const name = this.safeStr(item?.name).trim();
              const description = this.safeStr(item?.description).trim();
              const technologies = this.safeArr(item?.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const url = this.safeStr(item?.url).trim();
              const range = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isOngoing);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id) || `proj-${index}`)}">
                  <div class="entry-head">
                    <div class="entry-heading-group">
                      ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                      ${url ? `<div class="entry-subtitle">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `<div class="tech-line">${technologies.map(t => `<span class="tech-badge">${this.escapeHtml(t)}</span>`).join('')}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievementsSection(labels) {
      const achievements = this.safeArr(this.data?.achievements).filter(item => {
        return this.safeStr(item?.title).trim() || this.safeStr(item?.description).trim();
      });
      if (!achievements.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          <h2 class="main-title">${this.escapeHtml(labels.achievements)}</h2>
          <div class="entries">
            ${achievements.map((item, index) => {
              const title = this.safeStr(item?.title).trim();
              const description = this.safeStr(item?.description).trim();
              const year = this.safeStr(item?.year).trim();

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id) || `ach-${index}`)}">
                  <div class="entry-head">
                    <div class="entry-heading-group">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                    </div>
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

    renderEducationSection(labels) {
      const education = this.safeArr(this.data?.education).filter(item => {
        return this.safeStr(item?.institution).trim() || this.safeStr(item?.degree).trim() || this.safeStr(item?.field).trim();
      });
      if (!education.length) return '';

      return `
        <section class="section main-section" data-section="education">
          <h2 class="main-title">${this.escapeHtml(labels.education)}</h2>
          <div class="entries">
            ${education.map((item, index) => {
              const institution = this.safeStr(item?.institution).trim();
              const degree = this.safeStr(item?.degree).trim();
              const field = this.safeStr(item?.field).trim();
              const gpa = this.safeStr(item?.gpa).trim();
              const titleLine = [degree, field].filter(Boolean).join(', ');
              const range = this.formatDateRange(item?.startDate, item?.endDate, item?.isCompleted === false);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id) || `edu-${index}`)}">
                  <div class="entry-head">
                    <div class="entry-heading-group">
                      ${titleLine ? `<div class="entry-title">${this.escapeHtml(titleLine)}</div>` : ''}
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
      const certifications = this.safeArr(this.data?.certifications).filter(item => {
        return this.safeStr(item?.name).trim() || this.safeStr(item?.issuer).trim();
      });
      if (!certifications.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          <h2 class="main-title">${this.escapeHtml(labels.certifications)}</h2>
          <div class="entries">
            ${certifications.map((item, index) => {
              const name = this.safeStr(item?.name).trim();
              const issuer = this.safeStr(item?.issuer).trim();
              const date = this.safeStr(item?.date).trim();

              return `
                <article class="entry cert-entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id) || `cert-${index}`)}">
                  <div class="entry-head">
                    <div class="entry-heading-group">
                      ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                      ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
                    </div>
                    ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    render() {
      const labels = this.getLabels();

      const headerHtml = this.renderHeaderSection();
      const profileHtml = this.renderProfileSection(labels);
      const experienceHtml = this.renderExperienceSection(labels);
      const projectsHtml = this.renderProjectsSection(labels);
      const achievementsHtml = this.renderAchievementsSection(labels);
      const educationHtml = this.renderEducationSection(labels);
      const certificationsHtml = this.renderCertificationsSection(labels);

      const contactHtml = this.renderContactSection(labels);
      const languagesHtml = this.renderLanguagesSection(labels);
      const skillsHtml = this.renderSkillsSection(labels);

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2f2f2f;
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
            background: #ffffff;
            display: grid;
            grid-template-columns: 34% 66%;
            font-family: Arial, Helvetica, sans-serif;
          }

          .sidebar {
            background: #e7e5e3;
            padding: 26mm 9mm 18mm 11mm;
            border-right: 1px solid #cfc9c3;
          }

          .main {
            background: #ffffff;
            padding: 18mm 14mm 18mm 14mm;
          }

          .section {
            display: block;
          }

          .sidebar-section {
            margin-bottom: 18px;
          }

          .main-section {
            margin-bottom: 18px;
          }

          .header-section {
            margin-bottom: 18px;
            padding-bottom: 10px;
            border-bottom: 1px solid #b8b0a8;
          }

          .name {
            margin: 0;
            font-size: 16pt;
            line-height: 1.1;
            letter-spacing: 1.8px;
            font-weight: 800;
            text-transform: uppercase;
            color: #2f2f2f;
          }

          .profession {
            margin-top: 5px;
            font-size: 9pt;
            letter-spacing: 1.1px;
            color: #756b63;
          }

          .sidebar-title,
          .main-title {
            margin: 0 0 8px 0;
            font-size: 8.8pt;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            font-weight: 800;
            color: #3a342f;
          }

          .sidebar-title {
            padding-bottom: 6px;
            border-bottom: 1px solid #b9b1aa;
          }

          .main-title {
            padding-bottom: 5px;
            border-bottom: 1px solid #bfb8b1;
          }

          .contact-list {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .contact-item {
            margin: 0 0 10px 0;
          }

          .contact-label {
            display: block;
            font-size: 7pt;
            font-weight: 800;
            text-transform: uppercase;
            color: #5d554f;
            margin-bottom: 2px;
            letter-spacing: 0.4px;
          }

          .contact-value {
            display: block;
            font-size: 8pt;
            line-height: 1.45;
            color: #2f2f2f;
            word-break: break-word;
          }

          .list-compact {
            display: flex;
            flex-direction: column;
            gap: 9px;
          }

          .lang-item {
            display: block;
          }

          .lang-name {
            font-size: 8.5pt;
            font-weight: 700;
            color: #2f2f2f;
            line-height: 1.3;
          }

          .lang-level {
            font-size: 8pt;
            color: #6f655e;
            margin-top: 1px;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            font-size: 7.6pt;
            line-height: 1.2;
            color: #3c3530;
            background: #f7f5f3;
            border: 1px solid #bfb6ae;
            border-radius: 999px;
            padding: 4px 8px;
          }

          .profile-text,
          .entry-text {
            font-size: 8.4pt;
            line-height: 1.58;
            color: #4a4541;
          }

          .entries {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .entry {
            display: block;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 4px;
          }

          .entry-heading-group {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            font-size: 8.7pt;
            font-weight: 800;
            color: #2f2f2f;
            line-height: 1.35;
          }

          .entry-subtitle {
            font-size: 8.1pt;
            color: #6d645d;
            line-height: 1.35;
            margin-top: 1px;
          }

          .entry-date {
            font-size: 7.8pt;
            color: #3f3a36;
            font-weight: 700;
            white-space: nowrap;
            letter-spacing: 0.2px;
          }

          .bullet-list {
            margin: 6px 0 0 0;
            padding-left: 16px;
          }

          .bullet-list li {
            margin: 0 0 4px 0;
            font-size: 8.2pt;
            line-height: 1.5;
            color: #4a4541;
          }

          .tech-line {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 7px;
          }

          .tech-badge {
            display: inline-block;
            font-size: 7.3pt;
            line-height: 1.2;
            color: #5a524c;
            background: #f2efec;
            border: 1px solid #d4ccc5;
            border-radius: 999px;
            padding: 3px 7px;
          }

          .cert-entry .entry-head {
            margin-bottom: 0;
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
            ${contactHtml}
            ${languagesHtml}
            ${skillsHtml}
          </div>
          <div class="main">
            ${headerHtml}
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

  if (!customElements.get('gqr-resume-cedar-v1')) {
    customElements.define('gqr-resume-cedar-v1', GQRResumeCedarV1);
  }
})();