(function() {
  'use strict';

  /**
   * name: gqr-resume-chart-v1
   * description: "Two-column resume with a dark slate rounded header, cool gray sidebar, white main panel, and clean modern typography inspired by editorial corporate layouts."
   */

  class GQRResumeChartV1 extends HTMLElement {
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

    formatShortDate(value, lang) {
      const raw = this.safeStr(value).trim();
      if (!raw) return '';
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };
      const locale = lang === 'es' ? 'es' : 'en';
      if (/^\d{4}$/.test(raw)) return raw;
      const m = raw.match(/^(\d{4})-(\d{2})$/);
      if (m) {
        const year = m[1];
        const monthIndex = Math.max(0, Math.min(11, parseInt(m[2], 10) - 1));
        return `${months[locale][monthIndex]} ${year}`;
      }
      const d = new Date(raw);
      if (!isNaN(d.getTime())) {
        return `${months[locale][d.getMonth()]} ${d.getFullYear()}`;
      }
      return raw;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const start = this.formatShortDate(startDate, lang);
      const end = isCurrentLike ? t.present : this.formatShortDate(endDate, lang);
      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderContactSection(t) {
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

      const rows = [];

      if (email) {
        rows.push(`
          <div class="contact-item">
            <span class="contact-icon">✉</span>
            <span class="contact-text">${this.escapeHtml(email)}</span>
          </div>
        `);
      }

      if (phone) {
        rows.push(`
          <div class="contact-item">
            <span class="contact-icon">☎</span>
            <span class="contact-text">${this.escapeHtml(phone)}</span>
          </div>
        `);
      }

      if (country) {
        rows.push(`
          <div class="contact-item">
            <span class="contact-icon">⌂</span>
            <span class="contact-text">${this.escapeHtml(country)}</span>
          </div>
        `);
      }

      if (linkedin) {
        rows.push(`
          <div class="contact-item">
            <span class="contact-icon">in</span>
            <span class="contact-text">${this.escapeHtml(linkedin)}</span>
          </div>
        `);
      }

      if (!rows.length) return '';

      return `
        <section class="section sidebar-section" data-section="contact">
          <h3 class="sidebar-title">${this.escapeHtml(t.contact)}</h3>
          <div class="contact-list">${rows.join('')}</div>
        </section>
      `;
    }

    renderLanguagesSection(t, lang) {
      const items = this.safeArr(this.data?.languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section sidebar-section" data-section="languages">
          <h3 class="sidebar-title">${this.escapeHtml(t.languages)}</h3>
          <div class="lang-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const name = this.safeStr(item?.name).trim();
              const levelKey = this.safeStr(item?.level).trim().toLowerCase();
              const level = this.levelMap[lang]?.[levelKey] || levelKey || '';
              if (!name && !level) return '';
              return `
                <div class="lang-item" data-entry-id="${this.escapeHtml(id)}">
                  <div class="lang-name">${this.escapeHtml(name)}</div>
                  <div class="lang-level">${this.escapeHtml(level)}</div>
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

      const deduped = [];
      const seen = new Set();
      merged.forEach((item) => {
        const key = item.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          deduped.push(item);
        }
      });

      if (!deduped.length) return '';

      return `
        <section class="section sidebar-section" data-section="skills">
          <h3 class="sidebar-title">${this.escapeHtml(t.skills)}</h3>
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
          <div class="header-inner">
            <div class="header-name">${this.escapeHtml(fullName)}</div>
            ${profession ? `<div class="header-role">${this.escapeHtml(profession)}</div>` : ''}
          </div>
        </section>
      `;
    }

    renderProfileSection(t) {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';

      return `
        <section class="section main-section" data-section="profile">
          <h2 class="main-title">${this.escapeHtml(t.profile)}</h2>
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection(t) {
      const items = this.safeArr(this.data?.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="experience">
          <h2 class="main-title">${this.escapeHtml(t.experience)}</h2>
          <div class="entry-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const title = this.safeStr(item?.title).trim();
              const company = this.safeStr(item?.company).trim();
              const location = this.safeStr(item?.location).trim();
              const range = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isCurrent);
              const bullets = [...this.safeArr(item?.achievements), ...this.safeArr(item?.responsibilities)]
                .map((b) => this.safeStr(b).trim())
                .filter(Boolean);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                      ${(company || location) ? `<div class="entry-subtitle">${this.escapeHtml([company, location].filter(Boolean).join(' • '))}</div>` : ''}
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
      `;
    }

    renderProjectsSection(t) {
      const items = this.safeArr(this.data?.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          <h2 class="main-title">${this.escapeHtml(t.projects)}</h2>
          <div class="entry-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const name = this.safeStr(item?.name).trim();
              const description = this.safeStr(item?.description).trim();
              const tech = this.safeArr(item?.technologies).map((x) => this.safeStr(x).trim()).filter(Boolean);
              const url = this.safeStr(item?.url).trim();
              const range = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isOngoing);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
                      ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                      ${url ? `<div class="entry-subtitle">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${tech.length ? `<div class="tag-row">${tech.map((tag) => `<span class="tag">${this.escapeHtml(tag)}</span>`).join('')}</div>` : ''}
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
          <h2 class="main-title">${this.escapeHtml(t.achievements)}</h2>
          <div class="entry-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const title = this.safeStr(item?.title).trim();
              const description = this.safeStr(item?.description).trim();
              const year = this.safeStr(item?.year).trim();

              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
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
          <h2 class="main-title">${this.escapeHtml(t.education)}</h2>
          <div class="entry-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const institution = this.safeStr(item?.institution).trim();
              const degree = this.safeStr(item?.degree).trim();
              const field = this.safeStr(item?.field).trim();
              const gpa = this.safeStr(item?.gpa).trim();
              const degreeLine = [degree, field].filter(Boolean).join(' — ');
              const range = this.formatDateRange(item?.startDate, item?.endDate, item?.isCompleted === false);

              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
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

    renderCertificationsSection(t) {
      const items = this.safeArr(this.data?.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          <h2 class="main-title">${this.escapeHtml(t.certifications)}</h2>
          <div class="entry-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id).trim();
              const name = this.safeStr(item?.name).trim();
              const issuer = this.safeStr(item?.issuer).trim();
              const date = this.safeStr(item?.date).trim();

              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
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
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];

      const headerSection = this.renderHeaderSection();
      const contactSection = this.renderContactSection(t);
      const languagesSection = this.renderLanguagesSection(t, lang);
      const skillsSection = this.renderSkillsSection(t);
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
            color: #1f2937;
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
            background: #f3f4f6;
            padding: 16mm 14mm 14mm;
            font-family: Arial, Helvetica, sans-serif;
            position: relative;
          }

          .header-card {
            width: 100%;
            background: #2f3b50;
            color: #ffffff;
            border-radius: 14px;
            padding: 10mm 12mm;
            margin-bottom: 10mm;
          }

          .header-inner {
            min-height: 22mm;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .header-name {
            font-size: 11mm;
            line-height: 1;
            font-weight: 800;
            letter-spacing: 0.4px;
            text-transform: uppercase;
          }

          .header-role {
            margin-top: 3mm;
            font-size: 4.2mm;
            font-weight: 600;
            color: #d7deea;
            letter-spacing: 0.8px;
            text-transform: uppercase;
          }

          .columns {
            display: grid;
            grid-template-columns: 34% 1fr;
            gap: 10mm;
            align-items: start;
          }

          .sidebar {
            background: #b7bcc4;
            color: #1f232b;
            border-radius: 0 0 14px 14px;
            padding: 9mm 7mm 10mm;
            min-height: 240mm;
          }

          .main {
            background: #ffffff;
            padding: 2mm 0 0;
          }

          .section {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .sidebar-section + .sidebar-section {
            margin-top: 8mm;
          }

          .main-section + .main-section {
            margin-top: 7mm;
          }

          .sidebar-title,
          .main-title {
            margin: 0 0 4mm;
            font-size: 4.6mm;
            line-height: 1.1;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            position: relative;
          }

          .sidebar-title::after,
          .main-title::after {
            content: '';
            display: block;
            width: 100%;
            max-width: 52mm;
            border-bottom: 1px solid rgba(47, 59, 80, 0.45);
            margin-top: 2mm;
          }

          .contact-list {
            display: flex;
            flex-direction: column;
            gap: 2.6mm;
          }

          .contact-item {
            display: grid;
            grid-template-columns: 5mm 1fr;
            gap: 2mm;
            align-items: start;
            font-size: 3.35mm;
            line-height: 1.45;
          }

          .contact-icon {
            font-weight: 700;
            color: #2f3b50;
          }

          .contact-text {
            overflow-wrap: anywhere;
          }

          .lang-list {
            display: flex;
            flex-direction: column;
            gap: 3.4mm;
          }

          .lang-item {
            font-size: 3.4mm;
            line-height: 1.35;
          }

          .lang-name {
            font-weight: 700;
          }

          .lang-level {
            color: #374151;
            margin-top: 0.6mm;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            background: rgba(47, 59, 80, 0.12);
            color: #1f2937;
            border: 1px solid rgba(47, 59, 80, 0.16);
            border-radius: 999px;
            padding: 1.6mm 2.8mm;
            font-size: 3mm;
            line-height: 1.2;
            font-weight: 600;
          }

          .profile-text,
          .entry-text {
            font-size: 3.45mm;
            line-height: 1.6;
            color: #374151;
            white-space: pre-wrap;
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

          .compact-entry {
            gap: 2mm;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4mm;
            margin-bottom: 1.6mm;
          }

          .entry-head-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            font-size: 3.8mm;
            line-height: 1.35;
            font-weight: 800;
            color: #111827;
          }

          .entry-subtitle {
            margin-top: 0.6mm;
            font-size: 3.3mm;
            line-height: 1.4;
            color: #4b5563;
            font-weight: 600;
          }

          .entry-date {
            flex-shrink: 0;
            color: #2f3b50;
            font-size: 3.1mm;
            line-height: 1.3;
            font-weight: 700;
            text-align: right;
            white-space: nowrap;
          }

          .bullet-list {
            margin: 2mm 0 0 0;
            padding-left: 4.5mm;
            color: #374151;
          }

          .bullet-list li {
            margin: 0 0 1.3mm;
            font-size: 3.35mm;
            line-height: 1.55;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2mm;
          }

          .tag {
            display: inline-block;
            padding: 1.3mm 2.5mm;
            border-radius: 999px;
            background: #eef1f5;
            color: #2f3b50;
            font-size: 2.95mm;
            font-weight: 700;
            line-height: 1.2;
            white-space: nowrap;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
              height: auto;
            }
          }
        </style>

        <div class="page">
          ${headerSection}
          <div class="columns">
            <div class="sidebar">
              ${contactSection}
              ${languagesSection}
              ${skillsSection}
            </div>
            <div class="main">
              ${profileSection}
              ${experienceSection}
              ${projectsSection}
              ${achievementsSection}
              ${educationSection}
              ${certificationsSection}
            </div>
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-chart-v1')) {
    customElements.define('gqr-resume-chart-v1', GQRResumeChartV1);
  }
})();