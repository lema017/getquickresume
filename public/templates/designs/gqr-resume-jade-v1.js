(function() {
  'use strict';

  class GQRResumeJadeV1 extends HTMLElement {
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

    formatDate(dateStr, lang) {
      const value = this.safeStr(dateStr).trim();
      if (!value) return '';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      if (/^\d{4}$/.test(value)) return value;

      const match = value.match(/^(\d{4})-(\d{2})$/);
      if (match) {
        const year = match[1];
        const monthIndex = parseInt(match[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return months[monthIndex] + ' ' + year;
        }
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

    renderSectionTitle(title) {
      return `<div class="section-title">${this.escapeHtml(title)}</div>`;
    }

    render() {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const levels = this.levelMap[lang];

      const firstName = this.safeStr(this.data?.firstName);
      const lastName = this.safeStr(this.data?.lastName);
      const profession = this.safeStr(this.data?.profession);
      const summary = this.safeStr(this.data?.summary);
      const email = this.safeStr(this.data?.email);
      const phone = this.safeStr(this.data?.phone);
      const country = this.safeStr(this.data?.country);
      const linkedin = this.safeStr(this.data?.linkedin);

      const experience = this.safeArr(this.data?.experience);
      const education = this.safeArr(this.data?.education);
      const projects = this.safeArr(this.data?.projects);
      const certifications = this.safeArr(this.data?.certifications);
      const languages = this.safeArr(this.data?.languages);
      const achievements = this.safeArr(this.data?.achievements);
      const skillsRaw = this.safeArr(this.data?.skillsRaw);
      const toolsRaw = this.safeArr(this.data?.toolsRaw);

      const mergedSkills = Array.from(
        new Set(
          [...skillsRaw, ...toolsRaw]
            .map((s) => this.safeStr(s).trim())
            .filter(Boolean)
        )
      );

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      const hasContact = !!(email || phone || country || linkedin);
      const hasLanguages = languages.length > 0;
      const hasSkills = mergedSkills.length > 0;
      const hasProfile = !!summary;
      const hasExperience = experience.length > 0;
      const hasProjects = projects.length > 0;
      const hasAchievements = achievements.length > 0;
      const hasEducation = education.length > 0;
      const hasCertifications = certifications.length > 0;

      const contactSection = hasContact ? `
        <section class="side-section" data-section="contact">
          ${this.renderSectionTitle(t.contact)}
          <div class="contact-list">
            ${email ? `
              <div class="contact-item">
                <span class="contact-icon">✉</span>
                <span class="contact-text">${this.escapeHtml(email)}</span>
              </div>` : ''}
            ${phone ? `
              <div class="contact-item">
                <span class="contact-icon">☎</span>
                <span class="contact-text">${this.escapeHtml(phone)}</span>
              </div>` : ''}
            ${country ? `
              <div class="contact-item">
                <span class="contact-icon">⌂</span>
                <span class="contact-text">${this.escapeHtml(country)}</span>
              </div>` : ''}
            ${linkedin ? `
              <div class="contact-item">
                <span class="contact-icon">in</span>
                <span class="contact-text">${this.escapeHtml(linkedin)}</span>
              </div>` : ''}
          </div>
        </section>
      ` : '';

      const languagesSection = hasLanguages ? `
        <section class="side-section" data-section="languages">
          ${this.renderSectionTitle(t.languages)}
          <div class="language-list">
            ${languages.map((item) => {
              const id = this.safeStr(item?.id);
              const name = this.safeStr(item?.name);
              const levelKey = this.safeStr(item?.level).toLowerCase();
              const levelText = levels[levelKey] || this.safeStr(item?.level);
              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                  <span class="language-name">${this.escapeHtml(name)}</span>
                  <span class="language-level">${this.escapeHtml(levelText)}</span>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const skillsSection = hasSkills ? `
        <section class="side-section" data-section="skills">
          ${this.renderSectionTitle(t.skills)}
          <div class="skills-wrap">
            ${mergedSkills.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      ` : '';

      const headerSection = `
        <section class="main-header" data-section="header">
          <div class="name-block">
            <h1 class="name">${this.escapeHtml(fullName || ' ')}</h1>
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
        </section>
      `;

      const profileSection = hasProfile ? `
        <section class="main-section" data-section="profile">
          ${this.renderSectionTitle(t.profile)}
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      ` : '';

      const experienceSection = hasExperience ? `
        <section class="main-section" data-section="experience">
          ${this.renderSectionTitle(t.experience)}
          <div class="timeline-list">
            ${experience.map((item) => {
              const id = this.safeStr(item?.id);
              const title = this.safeStr(item?.title);
              const company = this.safeStr(item?.company);
              const location = this.safeStr(item?.location);
              const bullets = [
                ...this.safeArr(item?.achievements),
                ...this.safeArr(item?.responsibilities)
              ].map((b) => this.safeStr(b).trim()).filter(Boolean);
              const range = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isCurrent);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${company ? `<span>${this.escapeHtml(company)}</span>` : ''}
                          ${company && location ? `<span class="sep">•</span>` : ''}
                          ${location ? `<span>${this.escapeHtml(location)}</span>` : ''}
                        </div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
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
      ` : '';

      const projectsSection = hasProjects ? `
        <section class="main-section" data-section="projects">
          ${this.renderSectionTitle(t.projects)}
          <div class="timeline-list">
            ${projects.map((item) => {
              const id = this.safeStr(item?.id);
              const name = this.safeStr(item?.name);
              const description = this.safeStr(item?.description);
              const technologies = this.safeArr(item?.technologies).map((x) => this.safeStr(x).trim()).filter(Boolean);
              const url = this.safeStr(item?.url);
              const range = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isOngoing);

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
                      ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                      ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map((tech) => `<span class="tag">${this.escapeHtml(tech)}</span>`).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const achievementsSection = hasAchievements ? `
        <section class="main-section" data-section="achievements">
          ${this.renderSectionTitle(t.achievements)}
          <div class="timeline-list">
            ${achievements.map((item) => {
              const id = this.safeStr(item?.id);
              const title = this.safeStr(item?.title);
              const description = this.safeStr(item?.description);
              const year = this.safeStr(item?.year);

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                    </div>
                    ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const educationSection = hasEducation ? `
        <section class="main-section" data-section="education">
          ${this.renderSectionTitle(t.education)}
          <div class="timeline-list">
            ${education.map((item) => {
              const id = this.safeStr(item?.id);
              const institution = this.safeStr(item?.institution);
              const degree = this.safeStr(item?.degree);
              const field = this.safeStr(item?.field);
              const gpa = this.safeStr(item?.gpa);
              const range = this.formatDateRange(item?.startDate, item?.endDate, item?.isCompleted === false);

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
                      ${degree ? `<h3 class="entry-title">${this.escapeHtml(degree)}</h3>` : ''}
                      ${(institution || field) ? `
                        <div class="entry-subtitle">
                          ${institution ? `<span>${this.escapeHtml(institution)}</span>` : ''}
                          ${institution && field ? `<span class="sep">•</span>` : ''}
                          ${field ? `<span>${this.escapeHtml(field)}</span>` : ''}
                        </div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${gpa ? `<div class="entry-text">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const certificationsSection = hasCertifications ? `
        <section class="main-section" data-section="certifications">
          ${this.renderSectionTitle(t.certifications)}
          <div class="timeline-list">
            ${certifications.map((item) => {
              const id = this.safeStr(item?.id);
              const name = this.safeStr(item?.name);
              const issuer = this.safeStr(item?.issuer);
              const date = this.safeStr(item?.date);

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
                      ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                      ${issuer ? `<div class="entry-subtitle"><span>${this.escapeHtml(issuer)}</span></div>` : ''}
                    </div>
                    ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2e2d2b;
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
            background: #ece5da;
            display: grid;
            grid-template-columns: 33% 67%;
            font-family: Arial, Helvetica, sans-serif;
          }

          .sidebar {
            background: #3b3b40;
            color: #f3ede4;
            padding: 22mm 9mm 18mm 9mm;
          }

          .main {
            background: #ece5da;
            color: #2f2d2a;
            padding: 14mm 16mm 16mm 14mm;
          }

          .main-header {
            background: #3f3f45;
            color: #f5efe6;
            padding: 10mm 10mm 8mm;
            margin-bottom: 8mm;
          }

          .name {
            margin: 0;
            font-size: 14pt;
            line-height: 1.0;
            font-weight: 800;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 4mm;
            font-size: 8pt;
            text-transform: uppercase;
            letter-spacing: 1.6px;
            color: #e3d8c8;
          }

          .side-section,
          .main-section {
            margin: 0 0 8mm 0;
          }

          .section-title {
            position: relative;
            margin: 0 0 4mm 0;
            padding-bottom: 2.2mm;
            font-size: 9pt;
            font-weight: 800;
            letter-spacing: 0.6px;
            text-transform: uppercase;
          }

          .sidebar .section-title {
            color: #f7f1e8;
            border-bottom: 2px solid #d6c8b3;
          }

          .main .section-title {
            color: #3a3937;
            border-bottom: 2px solid #7b756e;
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
            font-size: 8pt;
            line-height: 1.45;
            word-break: break-word;
          }

          .contact-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 4mm;
            min-width: 4mm;
            font-size: 8pt;
            font-weight: 700;
            color: #d9ccb9;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 3mm;
          }

          .language-item {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 3mm;
            font-size: 8pt;
            line-height: 1.4;
            padding-bottom: 1.5mm;
            border-bottom: 1px solid rgba(243, 237, 228, 0.18);
          }

          .language-name {
            font-weight: 700;
          }

          .language-level {
            color: #d8cebf;
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
            font-size: 7.5pt;
            line-height: 1.2;
            padding: 5px 8px;
            border: 1px solid rgba(243, 237, 228, 0.4);
            color: #f7f1e8;
            background: rgba(255, 255, 255, 0.06);
            border-radius: 999px;
          }

          .profile-text,
          .entry-text {
            font-size: 8.4pt;
            line-height: 1.58;
            color: #3f3d39;
            white-space: pre-wrap;
            word-break: break-word;
          }

          .timeline-list {
            display: flex;
            flex-direction: column;
            gap: 5.5mm;
          }

          .entry {
            position: relative;
            padding-bottom: 1mm;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4mm;
            margin-bottom: 1.8mm;
          }

          .entry-title-wrap {
            flex: 1 1 auto;
            min-width: 0;
          }

          .entry-title {
            margin: 0;
            font-size: 9pt;
            line-height: 1.3;
            font-weight: 800;
            color: #2f2d2a;
          }

          .entry-subtitle {
            margin-top: 1mm;
            font-size: 7.8pt;
            line-height: 1.4;
            color: #59554f;
          }

          .entry-subtitle .sep {
            margin: 0 1.5mm;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 7.4pt;
            line-height: 1.3;
            color: #5f5a53;
            text-align: right;
            white-space: nowrap;
            text-transform: uppercase;
            letter-spacing: 0.3px;
          }

          .entry-link {
            margin-top: 1mm;
            font-size: 7.4pt;
            color: #6d665d;
            word-break: break-all;
          }

          .bullet-list {
            margin: 2mm 0 0 0;
            padding-left: 4.5mm;
          }

          .bullet-list li {
            margin: 0 0 1.2mm 0;
            font-size: 8pt;
            line-height: 1.5;
            color: #3c3a36;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2mm;
          }

          .tag {
            display: inline-block;
            font-size: 7.2pt;
            line-height: 1.2;
            padding: 4px 7px;
            border-radius: 999px;
            background: #d9d0c1;
            color: #332f2c;
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
            ${contactSection}
            ${languagesSection}
            ${skillsSection}
          </div>
          <div class="main">
            ${headerSection}
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

  if (!customElements.get('gqr-resume-jade-v1')) {
    customElements.define('gqr-resume-jade-v1', GQRResumeJadeV1);
  }
})();