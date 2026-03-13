(function() {
  'use strict';

  /**
   * name: gqr-resume-echo-v1
   * description: "Two-column resume with a warm taupe sidebar, clean ivory main panel, subtle accent rules, and elegant serif/sans typography inspired by a modern editorial layout."
   */

  class GQRResumeEchoV1 extends HTMLElement {
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
          profile: 'Acerca de mí',
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
      const raw = this.safeStr(dateStr).trim();
      if (!raw) return '';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const ym = raw.match(/^(\d{4})-(\d{2})$/);
      if (ym) {
        const y = ym[1];
        const m = parseInt(ym[2], 10) - 1;
        if (m >= 0 && m < 12) return months[m] + ' ' + y;
      }

      const ymd = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (ymd) {
        const y = ymd[1];
        const m = parseInt(ymd[2], 10) - 1;
        if (m >= 0 && m < 12) return months[m] + ' ' + y;
      }

      const y = raw.match(/^(\d{4})$/);
      if (y) return y[1];

      return raw;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const start = this.formatDate(startDate, lang);
      const end = isCurrentLike ? t.present : this.formatDate(endDate, lang);
      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `
        <div class="section-heading">
          <h3>${this.escapeHtml(title)}</h3>
          <span class="rule"></span>
        </div>
      `;
    }

    render() {
      const data = this.data || {};
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const levels = this.levelMap[lang];

      const firstName = this.safeStr(data.firstName);
      const lastName = this.safeStr(data.lastName);
      const fullName = (firstName + ' ' + lastName).trim();
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

      const skillSet = [];
      const seenSkills = new Set();
      this.safeArr(data.skillsRaw).concat(this.safeArr(data.toolsRaw)).forEach((item) => {
        const s = this.safeStr(item).trim();
        const key = s.toLowerCase();
        if (s && !seenSkills.has(key)) {
          seenSkills.add(key);
          skillSet.push(s);
        }
      });

      const contactItems = [];
      if (email) {
        contactItems.push(`
          <div class="contact-item">
            <span class="contact-icon">✉</span>
            <span class="contact-text">${this.escapeHtml(email)}</span>
          </div>
        `);
      }
      if (phone) {
        contactItems.push(`
          <div class="contact-item">
            <span class="contact-icon">☎</span>
            <span class="contact-text">${this.escapeHtml(phone)}</span>
          </div>
        `);
      }
      if (country) {
        contactItems.push(`
          <div class="contact-item">
            <span class="contact-icon">⌂</span>
            <span class="contact-text">${this.escapeHtml(country)}</span>
          </div>
        `);
      }
      if (linkedin) {
        contactItems.push(`
          <div class="contact-item">
            <span class="contact-icon">↗</span>
            <span class="contact-text">${this.escapeHtml(linkedin)}</span>
          </div>
        `);
      }

      const sidebarContact = contactItems.length ? `
        <section class="section sidebar-section" data-section="contact">
          ${this.renderSectionTitle(t.contact)}
          <div class="contact-list">
            ${contactItems.join('')}
          </div>
        </section>
      ` : '';

      const sidebarLanguages = languages.length ? `
        <section class="section sidebar-section" data-section="languages">
          ${this.renderSectionTitle(t.languages)}
          <div class="language-list">
            ${languages.map((item) => {
              const id = this.safeStr(item && item.id);
              const name = this.safeStr(item && item.name);
              const rawLevel = this.safeStr(item && item.level).toLowerCase();
              const level = levels[rawLevel] || this.safeStr(item && item.level);
              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                  <span class="language-name">${this.escapeHtml(name)}</span>
                  <span class="language-level">${this.escapeHtml(level)}</span>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const sidebarSkills = skillSet.length ? `
        <section class="section sidebar-section" data-section="skills">
          ${this.renderSectionTitle(t.skills)}
          <div class="skills-wrap">
            ${skillSet.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      ` : '';

      const mainHeader = `
        <section class="hero" data-section="header">
          <div class="name-block">
            <h1>${this.escapeHtml(fullName)}</h1>
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
          <div class="hero-accent" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
        </section>
      `;

      const mainProfile = summary ? `
        <section class="section main-section" data-section="profile">
          ${this.renderSectionTitle(t.profile)}
          <div class="profile-text">
            ${this.escapeHtml(summary)}
          </div>
        </section>
      ` : '';

      const mainExperience = experience.length ? `
        <section class="section main-section" data-section="experience">
          ${this.renderSectionTitle(t.experience)}
          <div class="timeline-list">
            ${experience.map((item) => {
              const id = this.safeStr(item && item.id);
              const title = this.safeStr(item && item.title);
              const company = this.safeStr(item && item.company);
              const location = this.safeStr(item && item.location);
              const range = this.formatDateRange(
                this.safeStr(item && item.startDate),
                this.safeStr(item && item.endDate),
                !!(item && item.isCurrent)
              );
              const bullets = this.safeArr(item && item.achievements).concat(this.safeArr(item && item.responsibilities))
                .map((b) => this.safeStr(b).trim())
                .filter(Boolean);

              return `
                <article class="entry entry-experience" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-group">
                      ${title ? `<h4 class="entry-title">${this.escapeHtml(title)}</h4>` : ''}
                      ${(company || location) ? `
                        <div class="entry-meta">
                          ${company ? `<span>${this.escapeHtml(company)}</span>` : ''}
                          ${(company && location) ? `<span class="dot">•</span>` : ''}
                          ${location ? `<span>${this.escapeHtml(location)}</span>` : ''}
                        </div>
                      ` : ''}
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

      const mainProjects = projects.length ? `
        <section class="section main-section" data-section="projects">
          ${this.renderSectionTitle(t.projects)}
          <div class="stack-list">
            ${projects.map((item) => {
              const id = this.safeStr(item && item.id);
              const name = this.safeStr(item && item.name);
              const description = this.safeStr(item && item.description);
              const technologies = this.safeArr(item && item.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const url = this.safeStr(item && item.url);
              const range = this.formatDateRange(
                this.safeStr(item && item.startDate),
                this.safeStr(item && item.endDate),
                !!(item && item.isOngoing)
              );
              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-group">
                      ${name ? `<h4 class="entry-title">${this.escapeHtml(name)}</h4>` : ''}
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

      const mainAchievements = achievements.length ? `
        <section class="section main-section" data-section="achievements">
          ${this.renderSectionTitle(t.achievements)}
          <div class="stack-list">
            ${achievements.map((item) => {
              const id = this.safeStr(item && item.id);
              const title = this.safeStr(item && item.title);
              const description = this.safeStr(item && item.description);
              const year = this.safeStr(item && item.year);
              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-group">
                      ${title ? `<h4 class="entry-title">${this.escapeHtml(title)}</h4>` : ''}
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

      const mainEducation = education.length ? `
        <section class="section main-section" data-section="education">
          ${this.renderSectionTitle(t.education)}
          <div class="timeline-list">
            ${education.map((item) => {
              const id = this.safeStr(item && item.id);
              const institution = this.safeStr(item && item.institution);
              const degree = this.safeStr(item && item.degree);
              const field = this.safeStr(item && item.field);
              const gpa = this.safeStr(item && item.gpa);
              const range = this.formatDateRange(
                this.safeStr(item && item.startDate),
                this.safeStr(item && item.endDate),
                item && item.isCompleted === false
              );
              const degreeLine = [degree, field].filter(Boolean).join(degree && field ? ' — ' : '');
              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-group">
                      ${degreeLine ? `<h4 class="entry-title">${this.escapeHtml(degreeLine)}</h4>` : ''}
                      ${institution ? `<div class="entry-meta"><span>${this.escapeHtml(institution)}</span></div>` : ''}
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

      const mainCertifications = certifications.length ? `
        <section class="section main-section" data-section="certifications">
          ${this.renderSectionTitle(t.certifications)}
          <div class="stack-list">
            ${certifications.map((item) => {
              const id = this.safeStr(item && item.id);
              const name = this.safeStr(item && item.name);
              const issuer = this.safeStr(item && item.issuer);
              const date = this.safeStr(item && item.date);
              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-group">
                      ${name ? `<h4 class="entry-title">${this.escapeHtml(name)}</h4>` : ''}
                      ${issuer ? `<div class="entry-meta"><span>${this.escapeHtml(issuer)}</span></div>` : ''}
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
            color: #2f2a27;
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
            background: #f7f4ef;
            display: grid;
            grid-template-columns: 34% 66%;
            font-family: Arial, Helvetica, sans-serif;
          }

          .sidebar {
            background: #ddd6ce;
            padding: 26mm 8mm 18mm 14mm;
            min-height: 297mm;
          }

          .main {
            background: #f7f4ef;
            padding: 18mm 14mm 18mm 12mm;
            min-height: 297mm;
          }

          .hero {
            background: #d4ccc2;
            margin: -18mm -14mm 10mm -12mm;
            padding: 14mm 14mm 10mm 12mm;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
            position: relative;
            overflow: hidden;
          }

          .hero::after {
            content: "";
            position: absolute;
            right: -18mm;
            top: -8mm;
            width: 95mm;
            height: 60mm;
            background:
              radial-gradient(circle at center, transparent 40%, rgba(255,255,255,0.22) 41%, transparent 42%) center/18mm 18mm repeat;
            opacity: 0.4;
            pointer-events: none;
          }

          .name-block {
            position: relative;
            z-index: 1;
          }

          h1 {
            margin: 0;
            font-family: Georgia, "Times New Roman", serif;
            font-size: 26px;
            line-height: 1.12;
            font-weight: 500;
            color: #2f2a27;
            letter-spacing: 0.2px;
          }

          .profession {
            margin-top: 8px;
            font-size: 11px;
            letter-spacing: 1.8px;
            text-transform: uppercase;
            color: #514840;
            font-weight: 700;
          }

          .hero-accent {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            gap: 6px;
            min-width: 34px;
            margin-top: 4px;
          }

          .hero-accent span {
            display: block;
            height: 2px;
            background: #b29067;
            border-radius: 999px;
          }

          .hero-accent span:nth-child(1) { width: 34px; }
          .hero-accent span:nth-child(2) { width: 22px; }
          .hero-accent span:nth-child(3) { width: 28px; }

          .section {
            margin: 0 0 10mm 0;
          }

          .section-heading {
            margin-bottom: 4mm;
          }

          .section-heading h3 {
            margin: 0;
            font-size: 12px;
            line-height: 1.2;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: #3b342f;
            font-weight: 800;
          }

          .section-heading .rule {
            display: inline-block;
            width: 26mm;
            height: 2px;
            background: #c79b6b;
            margin-top: 6px;
          }

          .sidebar-section .section-heading h3 {
            color: #37312c;
          }

          .contact-list,
          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .contact-item,
          .language-item {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 8px;
            align-items: start;
            font-size: 11px;
            line-height: 1.4;
            color: #413933;
          }

          .contact-icon {
            width: 14px;
            text-align: center;
            color: #8d6d4d;
            font-size: 11px;
            line-height: 1.4;
          }

          .contact-text {
            word-break: break-word;
          }

          .language-item {
            grid-template-columns: 1fr auto;
            gap: 10px;
          }

          .language-name {
            font-weight: 700;
          }

          .language-level {
            color: #6f645b;
            white-space: nowrap;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
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
            background: rgba(255,255,255,0.55);
            border: 1px solid rgba(141,109,77,0.22);
            color: #413933;
          }

          .profile-text,
          .entry-text,
          .bullet-list {
            font-size: 11px;
            line-height: 1.55;
            color: #3b342f;
          }

          .timeline-list,
          .stack-list {
            display: flex;
            flex-direction: column;
            gap: 6mm;
          }

          .entry {
            position: relative;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 2mm;
          }

          .entry-title-group {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-size: 13px;
            line-height: 1.25;
            color: #2e2926;
            font-weight: 700;
          }

          .entry-meta,
          .entry-link {
            margin-top: 2px;
            font-size: 10.5px;
            line-height: 1.4;
            color: #6b6159;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 10px;
            line-height: 1.3;
            color: #6f645b;
            text-transform: uppercase;
            letter-spacing: 0.7px;
            text-align: right;
            padding-top: 1px;
            white-space: nowrap;
          }

          .dot {
            margin: 0 5px;
          }

          .bullet-list {
            margin: 0;
            padding-left: 16px;
          }

          .bullet-list li {
            margin: 0 0 2px 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 3mm;
          }

          .tag {
            display: inline-block;
            font-size: 9.5px;
            line-height: 1.2;
            padding: 4px 7px;
            border-radius: 999px;
            background: #ebe3d8;
            color: #5a4d42;
          }

          .compact-entry .entry-head {
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

  if (!customElements.get('gqr-resume-echo-v1')) {
    customElements.define('gqr-resume-echo-v1', GQRResumeEchoV1);
  }
})();