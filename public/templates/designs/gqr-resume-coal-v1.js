(function() {
  'use strict';

  /**
   * name: gqr-resume-coal-v1
   * description: "Two-column resume with a soft stone-gray sidebar, clean editorial main column, uppercase section headings, and minimalist typography inspired by a modern academic CV."
   */

  class GQRResumeCoalV1 extends HTMLElement {
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
      return typeof v === 'string' ? v : '';
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

    formatShortDate(dateStr, lang) {
      const value = this.safeStr(dateStr).trim();
      if (!value) return '';
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };
      const match = value.match(/^(\d{4})(?:-(\d{2}))?/);
      if (!match) return this.escapeHtml(value);
      const year = match[1];
      const monthIndex = match[2] ? Number(match[2]) - 1 : null;
      if (monthIndex === null || monthIndex < 0 || monthIndex > 11) return year;
      return `${months[lang === 'es' ? 'es' : 'en'][monthIndex]} ${year}`;
    }

    formatDateRange(startDate, endDate, currentFlag, currentFlagType) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const start = this.formatShortDate(startDate, lang);
      const end = currentFlagType === 'education'
        ? (currentFlag === false ? t.present : this.formatShortDate(endDate, lang))
        : (currentFlag ? t.present : this.formatShortDate(endDate, lang));

      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `<h3 class="section-title">${this.escapeHtml(title)}</h3>`;
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

      const mergedSkills = Array.from(
        new Set(
          [...this.safeArr(data.skillsRaw), ...this.safeArr(data.toolsRaw)]
            .map((s) => this.safeStr(s).trim())
            .filter(Boolean)
        )
      );

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      const contactItems = [
        email ? `<div class="contact-item"><span class="contact-label">Email</span><span class="contact-value">${this.escapeHtml(email)}</span></div>` : '',
        phone ? `<div class="contact-item"><span class="contact-label">${lang === 'es' ? 'Teléfono' : 'Phone'}</span><span class="contact-value">${this.escapeHtml(phone)}</span></div>` : '',
        country ? `<div class="contact-item"><span class="contact-label">${lang === 'es' ? 'Ubicación' : 'Location'}</span><span class="contact-value">${this.escapeHtml(country)}</span></div>` : '',
        linkedin ? `<div class="contact-item"><span class="contact-label">LinkedIn</span><span class="contact-value">${this.escapeHtml(linkedin)}</span></div>` : ''
      ].filter(Boolean).join('');

      const contactSection = contactItems ? `
        <section class="section sidebar-section" data-section="contact">
          ${this.renderSectionTitle(t.contact)}
          <div class="contact-list">${contactItems}</div>
        </section>
      ` : '';

      const languagesSection = languages.length ? `
        <section class="section sidebar-section" data-section="languages">
          ${this.renderSectionTitle(t.languages)}
          <div class="language-list">
            ${languages.map((item) => {
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
            }).join('')}
          </div>
        </section>
      ` : '';

      const skillsSection = mergedSkills.length ? `
        <section class="section sidebar-section" data-section="skills">
          ${this.renderSectionTitle(t.skills)}
          <div class="skills-wrap">
            ${mergedSkills.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      ` : '';

      const headerSection = (fullName || profession) ? `
        <section class="header-block" data-section="header">
          ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
          ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
        </section>
      ` : '';

      const profileSection = summary ? `
        <section class="section main-section" data-section="profile">
          ${this.renderSectionTitle(t.profile)}
          <div class="profile-box">
            <p class="summary">${this.escapeHtml(summary)}</p>
          </div>
        </section>
      ` : '';

      const experienceSection = experience.length ? `
        <section class="section main-section" data-section="experience">
          ${this.renderSectionTitle(t.experience)}
          <div class="entry-list">
            ${experience.map((item) => {
              const id = this.safeStr(item?.id);
              const title = this.safeStr(item?.title);
              const company = this.safeStr(item?.company);
              const location = this.safeStr(item?.location);
              const range = this.formatDateRange(
                this.safeStr(item?.startDate),
                this.safeStr(item?.endDate),
                !!item?.isCurrent,
                'experience'
              );
              const bullets = [...this.safeArr(item?.achievements), ...this.safeArr(item?.responsibilities)]
                .map((b) => this.safeStr(b).trim())
                .filter(Boolean);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
                      ${title ? `<h4 class="entry-title">${this.escapeHtml(title)}</h4>` : ''}
                      ${(company || location) ? `<div class="entry-subtitle">${this.escapeHtml([company, location].filter(Boolean).join(' · '))}</div>` : ''}
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

      const projectsSection = projects.length ? `
        <section class="section main-section" data-section="projects">
          ${this.renderSectionTitle(t.projects)}
          <div class="entry-list">
            ${projects.map((item) => {
              const id = this.safeStr(item?.id);
              const name = this.safeStr(item?.name);
              const description = this.safeStr(item?.description);
              const tech = this.safeArr(item?.technologies).map((x) => this.safeStr(x).trim()).filter(Boolean);
              const url = this.safeStr(item?.url);
              const range = this.formatDateRange(
                this.safeStr(item?.startDate),
                this.safeStr(item?.endDate),
                !!item?.isOngoing,
                'experience'
              );
              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
                      ${name ? `<h4 class="entry-title">${this.escapeHtml(name)}</h4>` : ''}
                      ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                  ${tech.length ? `<div class="tag-line">${tech.map((x) => `<span class="mini-tag">${this.escapeHtml(x)}</span>`).join('')}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const achievementsSection = achievements.length ? `
        <section class="section main-section" data-section="achievements">
          ${this.renderSectionTitle(t.achievements)}
          <div class="entry-list compact-list">
            ${achievements.map((item) => {
              const id = this.safeStr(item?.id);
              const title = this.safeStr(item?.title);
              const description = this.safeStr(item?.description);
              const year = this.safeStr(item?.year);
              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    ${title ? `<h4 class="entry-title">${this.escapeHtml(title)}</h4>` : ''}
                    ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const educationSection = education.length ? `
        <section class="section main-section" data-section="education">
          ${this.renderSectionTitle(t.education)}
          <div class="entry-list">
            ${education.map((item) => {
              const id = this.safeStr(item?.id);
              const institution = this.safeStr(item?.institution);
              const degree = this.safeStr(item?.degree);
              const field = this.safeStr(item?.field);
              const gpa = this.safeStr(item?.gpa);
              const range = this.formatDateRange(
                this.safeStr(item?.startDate),
                this.safeStr(item?.endDate),
                item?.isCompleted,
                'education'
              );
              const titleLine = [degree, field].filter(Boolean).join(', ');
              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
                      ${titleLine ? `<h4 class="entry-title">${this.escapeHtml(titleLine)}</h4>` : ''}
                      ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${gpa ? `<p class="entry-text">GPA: ${this.escapeHtml(gpa)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const certificationsSection = certifications.length ? `
        <section class="section main-section" data-section="certifications">
          ${this.renderSectionTitle(t.certifications)}
          <div class="entry-list compact-list">
            ${certifications.map((item) => {
              const id = this.safeStr(item?.id);
              const name = this.safeStr(item?.name);
              const issuer = this.safeStr(item?.issuer);
              const date = this.safeStr(item?.date);
              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
                      ${name ? `<h4 class="entry-title">${this.escapeHtml(name)}</h4>` : ''}
                      ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
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
            color: #222;
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
            background: #fcfcfa;
            display: grid;
            grid-template-columns: 33% 67%;
            font-family: Arial, Helvetica, sans-serif;
          }

          .sidebar {
            background: #e7e4dd;
            padding: 34px 22px 34px 26px;
            position: relative;
          }

          .sidebar::before {
            content: "";
            position: absolute;
            left: 10px;
            top: 0;
            bottom: 0;
            width: 8px;
            background: rgba(255,255,255,0.35);
          }

          .main {
            padding: 26px 30px 34px 30px;
            background: #fcfcfa;
          }

          .header-block {
            grid-column: 1 / -1;
            padding: 24px 30px 12px 30px;
            background: #fcfcfa;
          }

          .name {
            margin: 0;
            font-size: 24px;
            line-height: 1.05;
            font-weight: 800;
            color: #1f1f1b;
            letter-spacing: -0.02em;
            max-width: 80%;
          }

          .profession {
            margin-top: 10px;
            font-size: 11px;
            letter-spacing: 0.24em;
            text-transform: uppercase;
            color: #5b5a55;
          }

          .section {
            margin-bottom: 24px;
          }

          .section-title {
            margin: 0 0 12px 0;
            font-size: 11px;
            line-height: 1.2;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            font-weight: 500;
            color: #5d5b56;
          }

          .profile-box {
            background: #ebe8e2;
            padding: 14px 16px;
          }

          .summary,
          .entry-text,
          .contact-value,
          .entry-subtitle,
          .language-level {
            margin: 0;
            font-size: 12px;
            line-height: 1.5;
            color: #403f3a;
          }

          .contact-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .contact-item {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .contact-label {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            color: #6d6a64;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .language-item {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .language-name {
            font-size: 12px;
            font-weight: 700;
            color: #262522;
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
            border: 1px solid #c9c4b9;
            background: rgba(255,255,255,0.45);
            font-size: 10px;
            color: #34332f;
            border-radius: 999px;
            line-height: 1.2;
          }

          .entry-list {
            display: flex;
            flex-direction: column;
            gap: 18px;
          }

          .entry {
            break-inside: avoid;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 14px;
            margin-bottom: 6px;
          }

          .entry-title {
            margin: 0;
            font-size: 13px;
            line-height: 1.35;
            font-weight: 700;
            color: #1f1f1b;
          }

          .entry-subtitle {
            margin-top: 2px;
          }

          .entry-date {
            flex-shrink: 0;
            font-size: 11px;
            line-height: 1.3;
            color: #66645f;
            text-align: right;
            white-space: nowrap;
          }

          .bullet-list {
            margin: 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 0 0 5px 0;
            font-size: 12px;
            line-height: 1.45;
            color: #403f3a;
          }

          .tag-line {
            margin-top: 8px;
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .mini-tag {
            font-size: 10px;
            line-height: 1.2;
            padding: 4px 7px;
            border-radius: 999px;
            background: #efede8;
            color: #4a4843;
            border: 1px solid #ddd8cd;
            white-space: nowrap;
          }

          .entry-link {
            margin-top: 2px;
            font-size: 11px;
            color: #66645f;
            word-break: break-word;
          }

          .compact-list {
            gap: 14px;
          }

          .compact-entry .entry-head {
            margin-bottom: 4px;
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

  if (!customElements.get('gqr-resume-coal-v1')) {
    customElements.define('gqr-resume-coal-v1', GQRResumeCoalV1);
  }
})();