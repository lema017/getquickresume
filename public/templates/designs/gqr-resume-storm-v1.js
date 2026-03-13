(function() {
  'use strict';

  /**
   * name: gqr-resume-storm-v1
   * description: "Two-column resume with a dark charcoal sidebar, warm off-white main panel, gold-gray accents, and clean modern typography inspired by a refined editorial layout."
   */

  class GQRResumeStormV1 extends HTMLElement {
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

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const dict = this.i18n[lang];
      const start = this.formatShortDate(startDate, lang);
      const end = isCurrentLike ? this.escapeHtml(dict.present) : this.formatShortDate(endDate, lang);
      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `<div class="section-title">${this.escapeHtml(title)}</div>`;
    }

    renderContactSection(lang, labels) {
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

      if (!email && !phone && !country && !linkedin) return '';

      const items = [];
      if (email) {
        items.push(`
          <div class="contact-item">
            <span class="contact-icon">✉</span>
            <span class="contact-text">${this.escapeHtml(email)}</span>
          </div>
        `);
      }
      if (phone) {
        items.push(`
          <div class="contact-item">
            <span class="contact-icon">☎</span>
            <span class="contact-text">${this.escapeHtml(phone)}</span>
          </div>
        `);
      }
      if (country) {
        items.push(`
          <div class="contact-item">
            <span class="contact-icon">⌂</span>
            <span class="contact-text">${this.escapeHtml(country)}</span>
          </div>
        `);
      }
      if (linkedin) {
        items.push(`
          <div class="contact-item">
            <span class="contact-icon">in</span>
            <span class="contact-text">${this.escapeHtml(linkedin)}</span>
          </div>
        `);
      }

      return `
        <section class="section sidebar-section contact-section" data-section="contact">
          ${this.renderSectionTitle(labels.contact)}
          <div class="contact-list">
            ${items.join('')}
          </div>
        </section>
      `;
    }

    renderLanguagesSection(lang, labels) {
      const list = this.safeArr(this.data?.languages).filter(item => item && (this.safeStr(item.name).trim() || this.safeStr(item.level).trim()));
      if (!list.length) return '';

      return `
        <section class="section sidebar-section" data-section="languages">
          ${this.renderSectionTitle(labels.languages)}
          <div class="simple-list">
            ${list.map(item => {
              const id = this.safeStr(item.id).trim();
              const name = this.safeStr(item.name).trim();
              const levelRaw = this.safeStr(item.level).trim().toLowerCase();
              const level = this.levelMap[lang]?.[levelRaw] || this.levelMap.en[levelRaw] || this.safeStr(item.level);
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

    renderSkillsSection(labels) {
      const combined = [...this.safeArr(this.data?.skillsRaw), ...this.safeArr(this.data?.toolsRaw)]
        .map(v => this.safeStr(v).trim())
        .filter(Boolean);

      const deduped = Array.from(new Set(combined));
      if (!deduped.length) return '';

      return `
        <section class="section sidebar-section" data-section="skills">
          ${this.renderSectionTitle(labels.skills)}
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
        <section class="hero-card" data-section="header">
          <div class="hero-name">${this.escapeHtml(fullName)}</div>
          ${profession ? `<div class="hero-role">${this.escapeHtml(profession)}</div>` : ''}
          <div class="hero-accent"></div>
        </section>
      `;
    }

    renderProfileSection(labels) {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';
      return `
        <section class="section main-section" data-section="profile">
          ${this.renderSectionTitle(labels.profile)}
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection(labels) {
      const list = this.safeArr(this.data?.experience).filter(item => item && (this.safeStr(item.title).trim() || this.safeStr(item.company).trim()));
      if (!list.length) return '';

      return `
        <section class="section main-section" data-section="experience">
          ${this.renderSectionTitle(labels.experience)}
          <div class="timeline">
            ${list.map(item => {
              const id = this.safeStr(item.id).trim();
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
                    <div class="entry-title-block">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                      ${(company || location) ? `<div class="entry-subtitle">${this.escapeHtml([company, location].filter(Boolean).join(' · '))}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${range}</div>` : ''}
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
      const list = this.safeArr(this.data?.projects).filter(item => item && (this.safeStr(item.name).trim() || this.safeStr(item.description).trim()));
      if (!list.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          ${this.renderSectionTitle(labels.projects)}
          <div class="stack-list">
            ${list.map(item => {
              const id = this.safeStr(item.id).trim();
              const name = this.safeStr(item.name).trim();
              const description = this.safeStr(item.description).trim();
              const url = this.safeStr(item.url).trim();
              const technologies = this.safeArr(item.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const range = this.formatDateRange(item.startDate, item.endDate, !!item.isOngoing);

              return `
                <article class="entry card-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-block">
                      ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                      ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${range}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map(t => `<span class="tag">${this.escapeHtml(t)}</span>`).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievementsSection(labels) {
      const list = this.safeArr(this.data?.achievements).filter(item => item && (this.safeStr(item.title).trim() || this.safeStr(item.description).trim()));
      if (!list.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          ${this.renderSectionTitle(labels.achievements)}
          <div class="stack-list">
            ${list.map(item => {
              const id = this.safeStr(item.id).trim();
              const title = this.safeStr(item.title).trim();
              const description = this.safeStr(item.description).trim();
              const year = this.safeStr(item.year).trim();
              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : '<div></div>'}
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
      const list = this.safeArr(this.data?.education).filter(item => item && (this.safeStr(item.institution).trim() || this.safeStr(item.degree).trim() || this.safeStr(item.field).trim()));
      if (!list.length) return '';

      return `
        <section class="section main-section" data-section="education">
          ${this.renderSectionTitle(labels.education)}
          <div class="timeline">
            ${list.map(item => {
              const id = this.safeStr(item.id).trim();
              const institution = this.safeStr(item.institution).trim();
              const degree = this.safeStr(item.degree).trim();
              const field = this.safeStr(item.field).trim();
              const gpa = this.safeStr(item.gpa).trim();
              const range = this.formatDateRange(item.startDate, item.endDate, item.isCompleted === false);

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-block">
                      ${degree || field ? `<div class="entry-title">${this.escapeHtml([degree, field].filter(Boolean).join(degree && field ? ' · ' : ''))}</div>` : ''}
                      ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${range}</div>` : ''}
                  </div>
                  ${gpa ? `<div class="entry-text"><strong>GPA:</strong> ${this.escapeHtml(gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertificationsSection(labels) {
      const list = this.safeArr(this.data?.certifications).filter(item => item && (this.safeStr(item.name).trim() || this.safeStr(item.issuer).trim()));
      if (!list.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          ${this.renderSectionTitle(labels.certifications)}
          <div class="stack-list">
            ${list.map(item => {
              const id = this.safeStr(item.id).trim();
              const name = this.safeStr(item.name).trim();
              const issuer = this.safeStr(item.issuer).trim();
              const date = this.safeStr(item.date).trim();
              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : '<div></div>'}
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
      const labels = this.i18n[lang];

      const header = this.renderHeaderSection();
      const profile = this.renderProfileSection(labels);
      const experience = this.renderExperienceSection(labels);
      const projects = this.renderProjectsSection(labels);
      const achievements = this.renderAchievementsSection(labels);
      const education = this.renderEducationSection(labels);
      const certifications = this.renderCertificationsSection(labels);

      const contact = this.renderContactSection(lang, labels);
      const languages = this.renderLanguagesSection(lang, labels);
      const skills = this.renderSkillsSection(labels);

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #1c1b19;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-family: Georgia, "Times New Roman", serif;
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
            display: grid;
            grid-template-columns: 34% 66%;
            background:
              linear-gradient(90deg, #1e1d1c 0%, #1e1d1c 34%, #f4f1ea 34%, #f4f1ea 100%);
            color: #1f1e1b;
          }

          .sidebar {
            padding: 18mm 9mm 14mm 12mm;
            background: #1e1d1c;
            color: #f7f3eb;
            min-height: 297mm;
          }

          .main {
            padding: 14mm 12mm 14mm 12mm;
            background: #f4f1ea;
            color: #1f1e1b;
          }

          .hero-card {
            background: #181716;
            color: #fffdfa;
            padding: 14mm 12mm 10mm;
            margin: 0 0 7mm 0;
            position: relative;
            overflow: hidden;
            border-left: 3mm solid #9a8a63;
          }

          .hero-card::after {
            content: "";
            position: absolute;
            top: 5mm;
            right: 5mm;
            width: 16mm;
            height: 16mm;
            border-top: 1px solid rgba(255,255,255,0.35);
            border-right: 1px solid rgba(255,255,255,0.35);
          }

          .hero-name {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11mm;
            line-height: 1.02;
            font-weight: 800;
            letter-spacing: 0.2px;
            text-transform: none;
            max-width: 85%;
          }

          .hero-role {
            margin-top: 4mm;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 3.2mm;
            letter-spacing: 1.3mm;
            text-transform: uppercase;
            color: #d7ccb1;
          }

          .hero-accent {
            margin-top: 6mm;
            width: 24mm;
            height: 1.2mm;
            background: #9a8a63;
          }

          .section {
            margin: 0 0 7mm 0;
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .section-title {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 3.5mm;
            font-weight: 700;
            letter-spacing: 0.7mm;
            text-transform: uppercase;
            margin: 0 0 4mm 0;
            padding-bottom: 2mm;
            border-bottom: 1px solid rgba(154,138,99,0.45);
          }

          .sidebar .section-title {
            color: #efe8d8;
            border-bottom-color: rgba(215,204,177,0.28);
          }

          .main .section-title {
            color: #2b2824;
          }

          .profile-text,
          .entry-text,
          .contact-text,
          .language-level,
          .entry-subtitle,
          .entry-link,
          .bullet-list li {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 3.05mm;
            line-height: 1.55;
          }

          .profile-text {
            color: #38342e;
          }

          .contact-list {
            display: flex;
            flex-direction: column;
            gap: 2.8mm;
          }

          .contact-item {
            display: flex;
            gap: 2.5mm;
            align-items: flex-start;
          }

          .contact-icon {
            width: 5mm;
            min-width: 5mm;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #d7ccb1;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.8mm;
            font-weight: 700;
            line-height: 1;
            margin-top: 0.4mm;
          }

          .contact-text {
            color: #f4efe3;
            word-break: break-word;
          }

          .simple-list,
          .stack-list,
          .timeline {
            display: flex;
            flex-direction: column;
            gap: 4mm;
          }

          .language-item {
            padding: 0 0 2.6mm 0;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }

          .language-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .language-name {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 3.15mm;
            font-weight: 700;
            color: #fff7e8;
            margin-bottom: 0.8mm;
          }

          .language-level {
            color: #d2c7ad;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 1.6mm;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            padding: 1.4mm 2.4mm;
            border: 1px solid rgba(215,204,177,0.35);
            color: #f7f1e3;
            background: rgba(255,255,255,0.04);
            border-radius: 999px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.75mm;
            line-height: 1.2;
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

          .timeline-entry {
            padding-left: 5mm;
          }

          .timeline-entry::before {
            content: "";
            position: absolute;
            left: 0;
            top: 1.5mm;
            width: 2mm;
            height: 2mm;
            border-radius: 50%;
            background: #9a8a63;
          }

          .timeline-entry::after {
            content: "";
            position: absolute;
            left: 0.9mm;
            top: 4mm;
            bottom: -3mm;
            width: 0.4mm;
            background: rgba(154,138,99,0.25);
          }

          .timeline-entry:last-child::after {
            display: none;
          }

          .card-entry,
          .compact-entry {
            padding: 3.2mm 3.5mm;
            background: rgba(255,255,255,0.45);
            border-left: 1.2mm solid #9a8a63;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4mm;
            margin-bottom: 1.2mm;
          }

          .entry-title-block {
            flex: 1 1 auto;
            min-width: 0;
          }

          .entry-title {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 3.35mm;
            line-height: 1.35;
            font-weight: 800;
            color: #1d1b18;
          }

          .entry-subtitle {
            color: #5a5348;
          }

          .entry-link {
            color: #6d6148;
            word-break: break-word;
          }

          .entry-date {
            flex: 0 0 auto;
            text-align: right;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.75mm;
            line-height: 1.2;
            font-weight: 700;
            color: #7f7257;
            text-transform: uppercase;
            letter-spacing: 0.2mm;
            padding-top: 0.3mm;
          }

          .bullet-list {
            margin: 2mm 0 0 0;
            padding-left: 4.2mm;
          }

          .bullet-list li {
            color: #38342e;
            margin: 0 0 1.2mm 0;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 1.6mm;
            margin-top: 2mm;
          }

          .tag {
            display: inline-block;
            padding: 1mm 2mm;
            background: #e8e1d2;
            color: #4a4338;
            border-radius: 999px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.55mm;
            line-height: 1.2;
            white-space: nowrap;
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
            ${contact}
            ${languages}
            ${skills}
          </div>

          <div class="main">
            ${header}
            ${profile}
            ${experience}
            ${projects}
            ${achievements}
            ${education}
            ${certifications}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-storm-v1')) {
    customElements.define('gqr-resume-storm-v1', GQRResumeStormV1);
  }
})();