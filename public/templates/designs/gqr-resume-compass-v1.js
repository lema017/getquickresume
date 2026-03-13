(function() {
  'use strict';

  /**
   * name: gqr-resume-compass-v1
   * description: "Two-column resume with a dark slate sidebar, clean light main panel, bold geometric header, and modern architectural typography inspired by editorial portfolio layouts."
   */

  class GQRResumeCompassV1 extends HTMLElement {
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

    formatShortDate(value, lang) {
      const raw = this.safeStr(value).trim();
      if (!raw) return '';
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };
      const match = raw.match(/^(\d{4})(?:-(\d{2}))?/);
      if (!match) return this.escapeHtml(raw);
      const year = match[1];
      const monthIndex = match[2] ? parseInt(match[2], 10) - 1 : -1;
      if (monthIndex >= 0 && monthIndex < 12) {
        return this.escapeHtml((months[lang] || months.en)[monthIndex] + ' ' + year);
      }
      return this.escapeHtml(year);
    }

    formatDateRange(startDate, endDate, currentFlag, currentFlagForEducation) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const start = this.formatShortDate(startDate, lang);
      let end = '';

      if (currentFlag === true || currentFlagForEducation === false) {
        end = this.escapeHtml(t.present);
      } else {
        end = this.formatShortDate(endDate, lang);
      }

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

      const items = [];

      if (email) {
        const emailEsc = this.escapeHtml(email);
        items.push(`
          <div class="contact-item">
            <div class="contact-label">Email</div>
            <div class="contact-value"><a href="mailto:${emailEsc}">${emailEsc}</a></div>
          </div>
        `);
      }
      if (phone) {
        const phoneEsc = this.escapeHtml(phone);
        items.push(`
          <div class="contact-item">
            <div class="contact-label">Phone</div>
            <div class="contact-value"><a href="tel:${phoneEsc}">${phoneEsc}</a></div>
          </div>
        `);
      }
      if (country) {
        items.push(`
          <div class="contact-item">
            <div class="contact-label">Location</div>
            <div class="contact-value">${this.escapeHtml(country)}</div>
          </div>
        `);
      }
      if (linkedin) {
        const href = /^https?:\/\//i.test(linkedin) ? linkedin : ('https://' + linkedin.replace(/^@/, ''));
        items.push(`
          <div class="contact-item">
            <div class="contact-label">LinkedIn</div>
            <div class="contact-value"><a href="${this.escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${this.escapeHtml(linkedin)}</a></div>
          </div>
        `);
      }

      if (!items.length) return '';

      return `
        <section class="section sidebar-section" data-section="contact">
          <h3 class="section-title sidebar-title">${this.escapeHtml(t.contact)}</h3>
          <div class="contact-list">${items.join('')}</div>
        </section>
      `;
    }

    renderLanguagesSection(t, lang) {
      const list = this.safeArr(this.data?.languages).filter(Boolean);
      if (!list.length) return '';

      return `
        <section class="section sidebar-section" data-section="languages">
          <h3 class="section-title sidebar-title">${this.escapeHtml(t.languages)}</h3>
          <div class="language-list">
            ${list.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const name = this.safeStr(item?.name).trim();
              const levelKey = this.safeStr(item?.level).trim().toLowerCase();
              const level = this.levelMap[lang]?.[levelKey] || this.levelMap.en[levelKey] || levelKey;
              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                  <span class="language-name">${this.escapeHtml(name)}</span>
                  <span class="language-level">${this.escapeHtml(level)}</span>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderSkillsSection(t) {
      const skills = this.safeArr(this.data?.skillsRaw);
      const tools = this.safeArr(this.data?.toolsRaw);
      const merged = [...skills, ...tools]
        .map((s) => this.safeStr(s).trim())
        .filter(Boolean);

      const deduped = [...new Set(merged)];
      if (!deduped.length) return '';

      return `
        <section class="section sidebar-section" data-section="skills">
          <h3 class="section-title sidebar-title">${this.escapeHtml(t.skills)}</h3>
          <div class="skills-wrap">
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
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      if (!fullName && !profession) return '';

      return `
        <section class="header-card" data-section="header">
          <div class="header-accent"></div>
          <div class="header-copy">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
          <div class="header-ornament" aria-hidden="true"></div>
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
      const items = this.safeArr(this.data?.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="experience">
          <h3 class="section-title main-title">${this.escapeHtml(t.experience)}</h3>
          <div class="entries">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const title = this.safeStr(item?.title).trim();
              const company = this.safeStr(item?.company).trim();
              const location = this.safeStr(item?.location).trim();
              const dateRange = this.formatDateRange(
                item?.startDate,
                item?.endDate,
                item?.isCurrent === true,
                true
              );
              const bullets = [...this.safeArr(item?.achievements), ...this.safeArr(item?.responsibilities)]
                .map((b) => this.safeStr(b).trim())
                .filter(Boolean);

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-heading">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                      ${(company || location) ? `<div class="entry-subtitle">${this.escapeHtml([company, location].filter(Boolean).join(' | '))}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${dateRange}</div>` : ''}
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

    renderProjectsSection(t) {
      const items = this.safeArr(this.data?.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          <h3 class="section-title main-title">${this.escapeHtml(t.projects)}</h3>
          <div class="entries compact-grid">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const name = this.safeStr(item?.name).trim();
              const description = this.safeStr(item?.description).trim();
              const technologies = this.safeArr(item?.technologies).map((x) => this.safeStr(x).trim()).filter(Boolean);
              const url = this.safeStr(item?.url).trim();
              const dateRange = this.formatDateRange(
                item?.startDate,
                item?.endDate,
                item?.isOngoing === true,
                true
              );

              return `
                <article class="entry card-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-heading">
                      ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${dateRange}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map((tech) => `<span class="tag">${this.escapeHtml(tech)}</span>`).join('')}
                    </div>
                  ` : ''}
                  ${url ? `<div class="entry-link"><a href="${this.escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${this.escapeHtml(url)}</a></div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievementsSection(t) {
      const items = this.safeArr(this.data?.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          <h3 class="section-title main-title">${this.escapeHtml(t.achievements)}</h3>
          <div class="entries">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const title = this.safeStr(item?.title).trim();
              const description = this.safeStr(item?.description).trim();
              const year = this.safeStr(item?.year).trim();
              return `
                <article class="entry card-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-heading">
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

    renderEducationSection(t) {
      const items = this.safeArr(this.data?.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="education">
          <h3 class="section-title main-title">${this.escapeHtml(t.education)}</h3>
          <div class="entries">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const institution = this.safeStr(item?.institution).trim();
              const degree = this.safeStr(item?.degree).trim();
              const field = this.safeStr(item?.field).trim();
              const gpa = this.safeStr(item?.gpa).trim();
              const dateRange = this.formatDateRange(
                item?.startDate,
                item?.endDate,
                false,
                item?.isCompleted
              );

              const titleLine = [degree, field].filter(Boolean).join(' — ');

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-heading">
                      ${titleLine ? `<div class="entry-title">${this.escapeHtml(titleLine)}</div>` : ''}
                      ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${dateRange}</div>` : ''}
                  </div>
                  ${gpa ? `<div class="entry-text">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertificationsSection(t) {
      const items = this.safeArr(this.data?.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          <h3 class="section-title main-title">${this.escapeHtml(t.certifications)}</h3>
          <div class="entries compact-grid">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const name = this.safeStr(item?.name).trim();
              const issuer = this.safeStr(item?.issuer).trim();
              const date = this.safeStr(item?.date).trim();

              return `
                <article class="entry card-entry" data-entry-id="${this.escapeHtml(id)}">
                  ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                  ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
                  ${date ? `<div class="entry-date solo-date">${this.escapeHtml(date)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    render() {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2f3a46;
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
            background: #f6f7f8;
            color: #33404c;
            display: grid;
            grid-template-columns: 34% 66%;
            font-family: Arial, Helvetica, sans-serif;
            position: relative;
          }

          .page::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 44mm;
            height: 32mm;
            background: #34414f;
            border-bottom-left-radius: 32mm;
          }

          .sidebar {
            background: #34414f;
            color: #eef2f5;
            padding: 34mm 9mm 14mm 11mm;
            min-height: 297mm;
          }

          .main {
            padding: 18mm 12mm 14mm 12mm;
            background: #f6f7f8;
          }

          .header-card {
            position: relative;
            padding: 10mm 6mm 7mm 0;
            margin-bottom: 6mm;
            border-bottom: 1px solid #9aa8b3;
          }

          .header-accent {
            width: 38px;
            height: 4px;
            background: #6d8799;
            margin-bottom: 6mm;
          }

          .name {
            margin: 0;
            font-size: 14.5pt;
            line-height: 1.05;
            letter-spacing: 0.03em;
            font-weight: 800;
            text-transform: uppercase;
            color: #34414f;
          }

          .profession {
            margin-top: 3mm;
            font-size: 9pt;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: #5c6975;
          }

          .header-ornament {
            position: absolute;
            right: 4mm;
            top: 5mm;
            width: 20mm;
            height: 20mm;
            border: 2px solid #c4ccd2;
            border-radius: 50%;
            opacity: 0.65;
          }

          .section {
            margin: 0 0 6mm 0;
          }

          .section-title {
            margin: 0 0 3.2mm 0;
            font-size: 8.5pt;
            line-height: 1.1;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .sidebar-title {
            color: #ffffff;
            position: relative;
            padding-bottom: 2.2mm;
            border-bottom: 1px solid rgba(255,255,255,0.24);
          }

          .main-title {
            color: #34414f;
            font-size: 10pt;
            margin-bottom: 4mm;
            padding-bottom: 2mm;
            border-bottom: 1px solid #bcc6ce;
          }

          .contact-list,
          .language-list {
            display: grid;
            gap: 3mm;
          }

          .contact-item {
            display: grid;
            gap: 0.8mm;
          }

          .contact-label {
            font-size: 6.5pt;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: #b9c6cf;
          }

          .contact-value,
          .contact-value a {
            color: #ffffff;
            text-decoration: none;
            font-size: 8pt;
            line-height: 1.45;
            word-break: break-word;
          }

          .language-item {
            display: flex;
            justify-content: space-between;
            gap: 3mm;
            padding-bottom: 1.4mm;
            border-bottom: 1px dashed rgba(255,255,255,0.14);
          }

          .language-name {
            font-size: 8pt;
            font-weight: 700;
            color: #ffffff;
          }

          .language-level {
            font-size: 7.5pt;
            color: #cdd7de;
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
            border: 1px solid rgba(255,255,255,0.22);
            border-radius: 999px;
            font-size: 7.2pt;
            line-height: 1.1;
            color: #ffffff;
            background: rgba(255,255,255,0.06);
          }

          .profile-text,
          .entry-text,
          .entry-link,
          .bullet-list {
            font-size: 8pt;
            line-height: 1.55;
            color: #42515d;
          }

          .entries {
            display: grid;
            gap: 4mm;
          }

          .compact-grid {
            gap: 3.2mm;
          }

          .entry {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .timeline-entry {
            position: relative;
            padding-left: 5mm;
          }

          .timeline-entry::before {
            content: '';
            position: absolute;
            left: 0;
            top: 1.5mm;
            width: 2.2mm;
            height: 2.2mm;
            background: #6d8799;
            border-radius: 50%;
          }

          .timeline-entry::after {
            content: '';
            position: absolute;
            left: 0.95mm;
            top: 4.4mm;
            bottom: -3mm;
            width: 0.6px;
            background: #ccd4da;
          }

          .entries > .timeline-entry:last-child::after {
            display: none;
          }

          .card-entry {
            background: #ffffff;
            border: 1px solid #d8dee3;
            border-radius: 2mm;
            padding: 3.2mm;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            gap: 4mm;
            align-items: flex-start;
            margin-bottom: 1.8mm;
          }

          .entry-heading {
            min-width: 0;
            flex: 1 1 auto;
          }

          .entry-title {
            font-size: 8.6pt;
            line-height: 1.3;
            font-weight: 800;
            color: #2f3a46;
          }

          .entry-subtitle {
            margin-top: 0.7mm;
            font-size: 7.8pt;
            line-height: 1.35;
            color: #5f6d79;
          }

          .entry-date {
            flex: 0 0 auto;
            text-align: right;
            font-size: 7pt;
            line-height: 1.3;
            color: #6c7b86;
            white-space: nowrap;
          }

          .solo-date {
            margin-top: 1.5mm;
            text-align: left;
          }

          .bullet-list {
            margin: 1.2mm 0 0 0;
            padding-left: 4.2mm;
          }

          .bullet-list li {
            margin: 0 0 1.2mm 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2mm;
          }

          .tag {
            font-size: 6.8pt;
            line-height: 1.1;
            padding: 4px 7px;
            border-radius: 999px;
            background: #e7edf1;
            color: #40515d;
            white-space: nowrap;
          }

          .entry-link a {
            color: #4d687a;
            text-decoration: none;
            word-break: break-all;
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
            ${this.renderContactSection(t)}
            ${this.renderLanguagesSection(t, lang)}
            ${this.renderSkillsSection(t)}
          </div>

          <div class="main">
            ${this.renderHeaderSection()}
            ${this.renderProfileSection(t)}
            ${this.renderExperienceSection(t)}
            ${this.renderProjectsSection(t)}
            ${this.renderAchievementsSection(t)}
            ${this.renderEducationSection(t)}
            ${this.renderCertificationsSection(t)}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-compass-v1')) {
    customElements.define('gqr-resume-compass-v1', GQRResumeCompassV1);
  }
})();