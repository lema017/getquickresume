(function() {
  'use strict';

  /**
   * name: gqr-resume-wave-v1
   * description: "Two-column resume with a dark slate sidebar, light main panel, lime accents, angled header band, and clean modern typography."
   */

  const i18n = {
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

  class GQRResumeWaveV1 extends HTMLElement {
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

      const match = value.match(/^(\d{4})(?:-(\d{2}))?/);
      if (!match) return this.escapeHtml(value);

      const year = match[1];
      const month = match[2] ? parseInt(match[2], 10) : null;
      if (month && month >= 1 && month <= 12) {
        return months[month - 1] + ' ' + year;
      }
      return year;
    }

    formatRange(startDate, endDate, currentFlag, lang) {
      const dict = i18n[lang] || i18n.en;
      const start = this.formatDate(startDate, lang);
      const end = currentFlag ? dict.present : this.formatDate(endDate, lang);

      if (start && end) return start + ' - ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `<div class="section-title">${this.escapeHtml(title)}</div>`;
    }

    renderContactSection(lang) {
      const dict = i18n[lang] || i18n.en;
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

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
            <span class="contact-icon">☏</span>
            <span class="contact-text">${this.escapeHtml(phone)}</span>
          </div>
        `);
      }
      if (country) {
        items.push(`
          <div class="contact-item">
            <span class="contact-icon">⌖</span>
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

      if (!items.length) return '';

      return `
        <section class="section sidebar-section" data-section="contact">
          ${this.renderSectionTitle(dict.contact)}
          <div class="contact-list">${items.join('')}</div>
        </section>
      `;
    }

    renderLanguagesSection(lang) {
      const dict = i18n[lang] || i18n.en;
      const levels = levelMap[lang] || levelMap.en;
      const languages = this.safeArr(this.data?.languages).filter(item => {
        return this.safeStr(item?.name).trim();
      });

      if (!languages.length) return '';

      return `
        <section class="section sidebar-section" data-section="languages">
          ${this.renderSectionTitle(dict.languages)}
          <div class="language-list">
            ${languages.map((item, index) => {
              const id = this.safeStr(item?.id).trim() || `language-${index}`;
              const name = this.safeStr(item?.name).trim();
              const rawLevel = this.safeStr(item?.level).trim().toLowerCase();
              const mappedLevel = levels[rawLevel] || this.safeStr(item?.level).trim();
              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                  <div class="language-name">${this.escapeHtml(name)}</div>
                  ${mappedLevel ? `<div class="language-level">${this.escapeHtml(mappedLevel)}</div>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderSkillsSection(lang) {
      const dict = i18n[lang] || i18n.en;
      const skills = this.safeArr(this.data?.skillsRaw);
      const tools = this.safeArr(this.data?.toolsRaw);
      const merged = [...skills, ...tools]
        .map(v => this.safeStr(v).trim())
        .filter(Boolean);

      const deduped = [];
      const seen = new Set();
      merged.forEach(item => {
        const key = item.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          deduped.push(item);
        }
      });

      if (!deduped.length) return '';

      return `
        <section class="section sidebar-section" data-section="skills">
          ${this.renderSectionTitle(dict.skills)}
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

      const nameParts = [];
      if (firstName) nameParts.push(`<span class="name-first">${this.escapeHtml(firstName)}</span>`);
      if (lastName) nameParts.push(`<span class="name-last">${this.escapeHtml(lastName)}</span>`);

      return `
        <section class="hero" data-section="header">
          <div class="hero-accent-top"></div>
          <div class="hero-inner">
            <div class="hero-name">${nameParts.join(' ') || this.escapeHtml(fullName)}</div>
            ${profession ? `<div class="hero-role">${this.escapeHtml(profession)}</div>` : ''}
          </div>
          <div class="hero-slope"></div>
        </section>
      `;
    }

    renderProfileSection(lang) {
      const dict = i18n[lang] || i18n.en;
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';

      return `
        <section class="section main-section" data-section="profile">
          ${this.renderSectionTitle(dict.profile)}
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection(lang) {
      const dict = i18n[lang] || i18n.en;
      const items = this.safeArr(this.data?.experience).filter(item => {
        return this.safeStr(item?.title).trim() || this.safeStr(item?.company).trim();
      });

      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="experience">
          ${this.renderSectionTitle(dict.experience)}
          <div class="timeline">
            ${items.map((item, index) => {
              const id = this.safeStr(item?.id).trim() || `experience-${index}`;
              const title = this.safeStr(item?.title).trim();
              const company = this.safeStr(item?.company).trim();
              const location = this.safeStr(item?.location).trim();
              const range = this.formatRange(item?.startDate, item?.endDate, !!item?.isCurrent, lang);
              const bullets = [...this.safeArr(item?.achievements), ...this.safeArr(item?.responsibilities)]
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);

              return `
                <article class="timeline-item" data-entry-id="${this.escapeHtml(id)}">
                  <div class="timeline-dot"></div>
                  <div class="timeline-body">
                    <div class="entry-head">
                      <div>
                        ${company ? `<div class="entry-org">${this.escapeHtml(company)}</div>` : ''}
                        ${title ? `<div class="entry-role">${this.escapeHtml(title)}</div>` : ''}
                        ${location ? `<div class="entry-meta">${this.escapeHtml(location)}</div>` : ''}
                      </div>
                      ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                    </div>
                    ${bullets.length ? `
                      <ul class="bullet-list">
                        ${bullets.map(b => `<li>${this.escapeHtml(b)}</li>`).join('')}
                      </ul>
                    ` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjectsSection(lang) {
      const dict = i18n[lang] || i18n.en;
      const items = this.safeArr(this.data?.projects).filter(item => {
        return this.safeStr(item?.name).trim() || this.safeStr(item?.description).trim();
      });

      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          ${this.renderSectionTitle(dict.projects)}
          <div class="stack-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item?.id).trim() || `project-${index}`;
              const name = this.safeStr(item?.name).trim();
              const description = this.safeStr(item?.description).trim();
              const url = this.safeStr(item?.url).trim();
              const tech = this.safeArr(item?.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const range = this.formatRange(item?.startDate, item?.endDate, !!item?.isOngoing, lang);

              return `
                <article class="card-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
                      ${name ? `<div class="entry-org">${this.escapeHtml(name)}</div>` : ''}
                      ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${tech.length ? `
                    <div class="tag-row">
                      ${tech.map(t => `<span class="mini-tag">${this.escapeHtml(t)}</span>`).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievementsSection(lang) {
      const dict = i18n[lang] || i18n.en;
      const items = this.safeArr(this.data?.achievements).filter(item => {
        return this.safeStr(item?.title).trim() || this.safeStr(item?.description).trim();
      });

      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          ${this.renderSectionTitle(dict.achievements)}
          <div class="stack-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item?.id).trim() || `achievement-${index}`;
              const title = this.safeStr(item?.title).trim();
              const description = this.safeStr(item?.description).trim();
              const year = this.safeStr(item?.year).trim();

              return `
                <article class="card-entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
                      ${title ? `<div class="entry-org">${this.escapeHtml(title)}</div>` : ''}
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

    renderEducationSection(lang) {
      const dict = i18n[lang] || i18n.en;
      const items = this.safeArr(this.data?.education).filter(item => {
        return this.safeStr(item?.institution).trim() || this.safeStr(item?.degree).trim() || this.safeStr(item?.field).trim();
      });

      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="education">
          ${this.renderSectionTitle(dict.education)}
          <div class="stack-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item?.id).trim() || `education-${index}`;
              const institution = this.safeStr(item?.institution).trim();
              const degree = this.safeStr(item?.degree).trim();
              const field = this.safeStr(item?.field).trim();
              const gpa = this.safeStr(item?.gpa).trim();
              const subtitle = [degree, field].filter(Boolean).join(' — ');
              const range = this.formatRange(item?.startDate, item?.endDate, item?.isCompleted === false, lang);

              return `
                <article class="card-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
                      ${subtitle ? `<div class="entry-org">${this.escapeHtml(subtitle)}</div>` : ''}
                      ${institution ? `<div class="entry-role">${this.escapeHtml(institution)}</div>` : ''}
                      ${gpa ? `<div class="entry-meta">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertificationsSection(lang) {
      const dict = i18n[lang] || i18n.en;
      const items = this.safeArr(this.data?.certifications).filter(item => {
        return this.safeStr(item?.name).trim() || this.safeStr(item?.issuer).trim();
      });

      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          ${this.renderSectionTitle(dict.certifications)}
          <div class="stack-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item?.id).trim() || `certification-${index}`;
              const name = this.safeStr(item?.name).trim();
              const issuer = this.safeStr(item?.issuer).trim();
              const date = this.safeStr(item?.date).trim();

              return `
                <article class="card-entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-head">
                    <div>
                      ${name ? `<div class="entry-org">${this.escapeHtml(name)}</div>` : ''}
                      ${issuer ? `<div class="entry-role">${this.escapeHtml(issuer)}</div>` : ''}
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
      if (!this.shadowRoot) return;

      const lang = this.getLanguage() === 'es' ? 'es' : 'en';

      const styles = `
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
            background: #f5f5f2;
            font-family: Arial, Helvetica, sans-serif;
            position: relative;
          }

          .hero {
            position: relative;
            background: #343d4f;
            color: #ffffff;
            padding: 18mm 14mm 16mm 14mm;
            overflow: hidden;
          }

          .hero-accent-top {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 8mm;
            background: #86b93b;
          }

          .hero-slope {
            position: absolute;
            left: 0;
            right: 0;
            bottom: -1px;
            height: 28mm;
            background: #f5f5f2;
            clip-path: polygon(0 70%, 100% 20%, 100% 100%, 0 100%);
          }

          .hero-inner {
            position: relative;
            z-index: 1;
            margin-left: 58mm;
            min-height: 24mm;
          }

          .hero-name {
            font-size: 10mm;
            line-height: 1;
            font-weight: 300;
            letter-spacing: 0.2px;
            text-transform: uppercase;
          }

          .name-first {
            color: #86b93b;
            font-weight: 800;
          }

          .name-last {
            color: #ffffff;
            font-weight: 300;
          }

          .hero-role {
            margin-top: 2mm;
            font-size: 3.5mm;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            color: #d8dfeb;
            position: relative;
            display: inline-block;
            padding-bottom: 2mm;
          }

          .hero-role::after {
            content: '';
            display: block;
            width: 28mm;
            height: 0.5mm;
            background: #86b93b;
            margin-top: 1.5mm;
          }

          .columns {
            display: grid;
            grid-template-columns: 36% 64%;
            align-items: stretch;
            margin-top: -6mm;
            position: relative;
            z-index: 2;
          }

          .sidebar {
            background: #343d4f;
            color: #ffffff;
            padding: 16mm 8mm 12mm 8mm;
            position: relative;
            overflow: hidden;
          }

          .sidebar::before {
            content: '';
            position: absolute;
            top: -10mm;
            right: -8mm;
            width: 20mm;
            height: 36mm;
            background: #86b93b;
            transform: rotate(14deg);
            opacity: 0.95;
          }

          .main {
            background: transparent;
            padding: 10mm 11mm 12mm 10mm;
          }

          .section {
            margin: 0 0 8mm 0;
            position: relative;
          }

          .section-title {
            font-size: 3.2mm;
            letter-spacing: 1.1px;
            text-transform: uppercase;
            margin-bottom: 4mm;
          }

          .sidebar .section-title {
            color: #d7dfeb;
            border-bottom: 0.4mm solid rgba(134, 185, 59, 0.65);
            padding-bottom: 2.2mm;
          }

          .main .section-title {
            color: #86b93b;
            border-bottom: 0.4mm solid rgba(134, 185, 59, 0.45);
            padding-bottom: 1.8mm;
          }

          .contact-list,
          .language-list,
          .stack-list,
          .timeline {
            display: block;
          }

          .contact-item {
            display: flex;
            gap: 3mm;
            align-items: flex-start;
            margin-bottom: 3mm;
            font-size: 3mm;
            line-height: 1.45;
          }

          .contact-icon {
            width: 4mm;
            min-width: 4mm;
            color: #86b93b;
            font-weight: bold;
            text-align: center;
          }

          .contact-text {
            color: #f0f4fa;
            word-break: break-word;
          }

          .language-item {
            margin-bottom: 3.5mm;
            padding-left: 0;
          }

          .language-name {
            font-size: 3.1mm;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 0.7mm;
          }

          .language-level {
            font-size: 2.8mm;
            color: #cfd7e4;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            font-size: 2.7mm;
            line-height: 1.2;
            padding: 1.5mm 2.5mm;
            border: 0.35mm solid rgba(255, 255, 255, 0.18);
            background: rgba(255, 255, 255, 0.08);
            color: #f7f9fc;
            border-radius: 999px;
          }

          .profile-text,
          .entry-text,
          .bullet-list li,
          .entry-meta,
          .entry-link {
            font-size: 3mm;
            line-height: 1.55;
            color: #4b5563;
          }

          .profile-text {
            color: #475569;
          }

          .timeline {
            position: relative;
            padding-left: 4mm;
          }

          .timeline::before {
            content: '';
            position: absolute;
            left: 1.4mm;
            top: 1mm;
            bottom: 1mm;
            width: 0.45mm;
            background: rgba(134, 185, 59, 0.55);
          }

          .timeline-item {
            position: relative;
            margin-bottom: 6mm;
          }

          .timeline-dot {
            position: absolute;
            left: -0.2mm;
            top: 1.2mm;
            width: 3mm;
            height: 3mm;
            border-radius: 50%;
            background: #86b93b;
            border: 0.5mm solid #f5f5f2;
          }

          .timeline-body {
            padding-left: 6mm;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4mm;
            margin-bottom: 1.5mm;
          }

          .entry-org {
            font-size: 3.2mm;
            font-weight: 700;
            color: #374151;
          }

          .entry-role {
            font-size: 3mm;
            color: #6b7280;
            margin-top: 0.6mm;
          }

          .entry-meta {
            margin-top: 0.6mm;
          }

          .entry-date {
            font-size: 2.8mm;
            color: #6b7280;
            white-space: nowrap;
            text-align: right;
            min-width: 24mm;
          }

          .bullet-list {
            margin: 1.5mm 0 0 0;
            padding-left: 4mm;
          }

          .bullet-list li {
            margin: 0 0 1.2mm 0;
          }

          .card-entry {
            margin-bottom: 5mm;
          }

          .card-entry.compact {
            margin-bottom: 4mm;
          }

          .entry-link {
            color: #86b93b;
            word-break: break-word;
            margin-top: 0.6mm;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2mm;
          }

          .mini-tag {
            display: inline-block;
            font-size: 2.5mm;
            padding: 1mm 2mm;
            border-radius: 999px;
            background: #e9efdf;
            color: #53613b;
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
      `;

      const html = `
        <div class="page">
          ${this.renderHeaderSection()}
          <div class="columns">
            <div class="sidebar">
              ${this.renderContactSection(lang)}
              ${this.renderLanguagesSection(lang)}
              ${this.renderSkillsSection(lang)}
            </div>
            <div class="main">
              ${this.renderProfileSection(lang)}
              ${this.renderExperienceSection(lang)}
              ${this.renderProjectsSection(lang)}
              ${this.renderAchievementsSection(lang)}
              ${this.renderEducationSection(lang)}
              ${this.renderCertificationsSection(lang)}
            </div>
          </div>
        </div>
      `;

      this.shadowRoot.innerHTML = styles + html;
    }
  }

  if (!customElements.get('gqr-resume-wave-v1')) {
    customElements.define('gqr-resume-wave-v1', GQRResumeWaveV1);
  }
})();