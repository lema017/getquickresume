(function() {
  'use strict';

  class GQRResumeDuneV1 extends HTMLElement {
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

    t(key) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      return (this.i18n[lang] && this.i18n[lang][key]) || this.i18n.en[key] || key;
    }

    mapLevel(level) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const key = this.safeStr(level).toLowerCase();
      return this.levelMap[lang][key] || this.escapeHtml(level);
    }

    formatShortDate(value) {
      const raw = this.safeStr(value).trim();
      if (!raw) return '';
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      if (/^\d{4}$/.test(raw)) return raw;

      const ym = raw.match(/^(\d{4})-(\d{2})$/);
      if (ym) {
        const year = ym[1];
        const monthIndex = parseInt(ym[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return months[monthIndex] + ' ' + year;
        }
        return year;
      }

      const ymd = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (ymd) {
        const year = ymd[1];
        const monthIndex = parseInt(ymd[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return months[monthIndex] + ' ' + year;
        }
        return year;
      }

      return raw;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const start = this.formatShortDate(startDate);
      let end = '';
      if (isCurrentLike) {
        end = this.t('present');
      } else {
        end = this.formatShortDate(endDate);
      }
      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `
        <div class="section-heading">
          <span>${this.escapeHtml(title)}</span>
        </div>
      `;
    }

    renderContactSection() {
      const email = this.safeStr(this.data.email).trim();
      const phone = this.safeStr(this.data.phone).trim();
      const country = this.safeStr(this.data.country).trim();
      const linkedin = this.safeStr(this.data.linkedin).trim();

      const items = [];
      if (phone) {
        items.push(`
          <div class="contact-item">
            <div class="contact-label">Phone</div>
            <div class="contact-value">${this.escapeHtml(phone)}</div>
          </div>
        `);
      }
      if (email) {
        items.push(`
          <div class="contact-item">
            <div class="contact-label">Email</div>
            <div class="contact-value break">${this.escapeHtml(email)}</div>
          </div>
        `);
      }
      if (country) {
        items.push(`
          <div class="contact-item">
            <div class="contact-label">${this.getLanguage() === 'es' ? 'Ubicación' : 'Location'}</div>
            <div class="contact-value">${this.escapeHtml(country)}</div>
          </div>
        `);
      }
      if (linkedin) {
        items.push(`
          <div class="contact-item">
            <div class="contact-label">LinkedIn</div>
            <div class="contact-value break">${this.escapeHtml(linkedin)}</div>
          </div>
        `);
      }

      if (!items.length) return '';

      return `
        <section class="section sidebar-section" data-section="contact">
          ${this.renderSectionTitle(this.t('contact'))}
          <div class="contact-list">${items.join('')}</div>
        </section>
      `;
    }

    renderLanguagesSection() {
      const items = this.safeArr(this.data.languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section sidebar-section" data-section="languages">
          ${this.renderSectionTitle(this.t('languages'))}
          <div class="lang-list">
            ${items.map(item => `
              <div class="lang-item" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                <div class="lang-row">
                  <span class="lang-name">${this.escapeHtml(this.safeStr(item.name))}</span>
                  <span class="lang-level">${this.escapeHtml(this.mapLevel(item.level))}</span>
                </div>
                <div class="lang-bar"><span class="lang-fill level-${this.escapeHtml(this.safeStr(item.level).toLowerCase())}"></span></div>
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderSkillsSection() {
      const merged = [...this.safeArr(this.data.skillsRaw), ...this.safeArr(this.data.toolsRaw)]
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
        <section class="section sidebar-section" data-section="skills">
          ${this.renderSectionTitle(this.t('skills'))}
          <div class="skills-wrap">
            ${deduped.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderHeaderSection() {
      const firstName = this.safeStr(this.data.firstName).trim();
      const lastName = this.safeStr(this.data.lastName).trim();
      const profession = this.safeStr(this.data.profession).trim();
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      if (!fullName && !profession) return '';

      const parts = fullName.split(' ');
      const first = parts.shift() || '';
      const rest = parts.join(' ');

      return `
        <section class="header-block section" data-section="header">
          <div class="name-wrap">
            <h1 class="name">
              <span class="name-first">${this.escapeHtml(first)}</span>${rest ? ` <span class="name-last">${this.escapeHtml(rest)}</span>` : ''}
            </h1>
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
        </section>
      `;
    }

    renderProfileSection() {
      const summary = this.safeStr(this.data.summary).trim();
      if (!summary) return '';

      return `
        <section class="section main-section" data-section="profile">
          ${this.renderSectionTitle(this.t('profile'))}
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection() {
      const items = this.safeArr(this.data.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="experience">
          ${this.renderSectionTitle(this.t('experience'))}
          <div class="timeline">
            ${items.map(item => {
              const bullets = [...this.safeArr(item.achievements), ...this.safeArr(item.responsibilities)]
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);
              const title = this.safeStr(item.title).trim();
              const company = this.safeStr(item.company).trim();
              const location = this.safeStr(item.location).trim();
              const range = this.formatDateRange(item.startDate, item.endDate, !!item.isCurrent);

              return `
                <article class="timeline-item" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <div class="item-topline">
                      <div>
                        ${title ? `<h3 class="item-title">${this.escapeHtml(title)}</h3>` : ''}
                        ${(company || location) ? `<div class="item-subtitle">${this.escapeHtml(company)}${company && location ? ' · ' : ''}${this.escapeHtml(location)}</div>` : ''}
                      </div>
                      ${range ? `<div class="item-date">${this.escapeHtml(range)}</div>` : ''}
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

    renderProjectsSection() {
      const items = this.safeArr(this.data.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          ${this.renderSectionTitle(this.t('projects'))}
          <div class="stack-list">
            ${items.map(item => {
              const name = this.safeStr(item.name).trim();
              const description = this.safeStr(item.description).trim();
              const techs = this.safeArr(item.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const url = this.safeStr(item.url).trim();
              const range = this.formatDateRange(item.startDate, item.endDate, !!item.isOngoing);

              return `
                <article class="card-item" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="item-topline">
                    <div>
                      ${name ? `<h3 class="item-title">${this.escapeHtml(name)}</h3>` : ''}
                      ${url ? `<div class="item-subtitle break">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${range ? `<div class="item-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${description ? `<div class="item-text">${this.escapeHtml(description)}</div>` : ''}
                  ${techs.length ? `<div class="tag-row">${techs.map(t => `<span class="tag">${this.escapeHtml(t)}</span>`).join('')}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievementsSection() {
      const items = this.safeArr(this.data.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          ${this.renderSectionTitle(this.t('achievements'))}
          <div class="stack-list">
            ${items.map(item => `
              <article class="card-item compact" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                <div class="item-topline">
                  <div>
                    <h3 class="item-title">${this.escapeHtml(this.safeStr(item.title))}</h3>
                  </div>
                  ${this.safeStr(item.year).trim() ? `<div class="item-date">${this.escapeHtml(this.safeStr(item.year))}</div>` : ''}
                </div>
                ${this.safeStr(item.description).trim() ? `<div class="item-text">${this.escapeHtml(this.safeStr(item.description))}</div>` : ''}
              </article>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderEducationSection() {
      const items = this.safeArr(this.data.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="education">
          ${this.renderSectionTitle(this.t('education'))}
          <div class="timeline">
            ${items.map(item => {
              const institution = this.safeStr(item.institution).trim();
              const degree = this.safeStr(item.degree).trim();
              const field = this.safeStr(item.field).trim();
              const gpa = this.safeStr(item.gpa).trim();
              const range = this.formatDateRange(item.startDate, item.endDate, item.isCompleted === false);

              return `
                <article class="timeline-item" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <div class="item-topline">
                      <div>
                        ${institution ? `<h3 class="item-title">${this.escapeHtml(institution)}</h3>` : ''}
                        ${(degree || field) ? `<div class="item-subtitle">${this.escapeHtml(degree)}${degree && field ? ', ' : ''}${this.escapeHtml(field)}</div>` : ''}
                        ${gpa ? `<div class="item-meta">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                      </div>
                      ${range ? `<div class="item-date">${this.escapeHtml(range)}</div>` : ''}
                    </div>
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertificationsSection() {
      const items = this.safeArr(this.data.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          ${this.renderSectionTitle(this.t('certifications'))}
          <div class="stack-list">
            ${items.map(item => `
              <article class="card-item compact" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                <div class="item-topline">
                  <div>
                    <h3 class="item-title">${this.escapeHtml(this.safeStr(item.name))}</h3>
                    ${this.safeStr(item.issuer).trim() ? `<div class="item-subtitle">${this.escapeHtml(this.safeStr(item.issuer))}</div>` : ''}
                  </div>
                  ${this.safeStr(item.date).trim() ? `<div class="item-date">${this.escapeHtml(this.safeStr(item.date))}</div>` : ''}
                </div>
              </article>
            `).join('')}
          </div>
        </section>
      `;
    }

    render() {
      if (!this.shadowRoot) return;

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2f2927;
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
            display: grid;
            grid-template-columns: 34% 66%;
            background: #f2ece4;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.35;
          }

          .sidebar {
            background: linear-gradient(180deg, #433039 0%, #362731 100%);
            color: #f7efe9;
            padding: 24mm 8mm 18mm 11mm;
            min-width: 0;
          }

          .main {
            background: #f4efe9;
            color: #342c29;
            padding: 14mm 12mm 16mm 12mm;
            min-width: 0;
          }

          .section {
            display: block;
          }

          .sidebar-section {
            margin-bottom: 10mm;
          }

          .main-section {
            margin-bottom: 8mm;
          }

          .header-block {
            background: #7c7673;
            color: #fff8f2;
            margin: -14mm -12mm 8mm -12mm;
            padding: 12mm 12mm 10mm 12mm;
            clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);
          }

          .name {
            margin: 0;
            font-size: 17pt;
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 800;
          }

          .name-first {
            color: #d2cbc5;
          }

          .name-last {
            color: #ffffff;
          }

          .profession {
            margin-top: 4mm;
            font-size: 9pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.8px;
          }

          .section-heading {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 4mm;
          }

          .section-heading span {
            font-size: 8.8pt;
            text-transform: uppercase;
            letter-spacing: 0.9px;
            font-weight: 800;
          }

          .sidebar .section-heading span {
            color: #fff8f2;
          }

          .main .section-heading span {
            color: #4a403c;
            font-size: 10pt;
          }

          .section-heading::before {
            content: '';
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #8d6f79;
            flex: 0 0 10px;
          }

          .sidebar .section-heading::after,
          .main .section-heading::after {
            content: '';
            height: 2px;
            flex: 1;
            background: currentColor;
            opacity: 0.35;
          }

          .sidebar .section-heading {
            color: #fff8f2;
          }

          .main .section-heading {
            color: #4a403c;
          }

          .contact-list {
            display: grid;
            gap: 4mm;
          }

          .contact-label {
            font-size: 7.3pt;
            font-weight: 700;
            opacity: 0.85;
            margin-bottom: 1mm;
          }

          .contact-value {
            font-size: 8pt;
          }

          .break {
            overflow-wrap: anywhere;
            word-break: break-word;
          }

          .lang-list {
            display: grid;
            gap: 4mm;
          }

          .lang-row {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 6px;
            margin-bottom: 1.5mm;
          }

          .lang-name {
            font-size: 8.4pt;
            font-weight: 700;
          }

          .lang-level {
            font-size: 7.4pt;
            opacity: 0.85;
            text-align: right;
          }

          .lang-bar {
            width: 100%;
            height: 4px;
            background: rgba(255,255,255,0.18);
            border-radius: 999px;
            overflow: hidden;
          }

          .lang-fill {
            display: block;
            height: 100%;
            background: #d7b5a0;
            border-radius: 999px;
          }

          .level-basic { width: 35%; }
          .level-intermediate { width: 60%; }
          .level-advanced { width: 82%; }
          .level-native { width: 100%; }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            padding: 5px 8px;
            border-radius: 999px;
            background: rgba(255,255,255,0.12);
            border: 1px solid rgba(255,255,255,0.14);
            color: #fff7f0;
            font-size: 7.6pt;
            font-weight: 700;
          }

          .profile-text,
          .item-text,
          .item-meta,
          .item-subtitle,
          .bullet-list li {
            font-size: 8.2pt;
          }

          .profile-text {
            color: #4b423f;
          }

          .timeline {
            position: relative;
            display: grid;
            gap: 5mm;
          }

          .timeline-item {
            display: grid;
            grid-template-columns: 14px 1fr;
            gap: 4mm;
            position: relative;
          }

          .timeline-item:not(:last-child)::after {
            content: '';
            position: absolute;
            left: 6px;
            top: 12px;
            bottom: -5mm;
            width: 2px;
            background: #6b5560;
            opacity: 0.5;
          }

          .timeline-marker {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #4f3943;
            margin-top: 3px;
            position: relative;
            z-index: 1;
          }

          .timeline-content,
          .card-item {
            min-width: 0;
          }

          .item-topline {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 8px;
          }

          .item-title {
            margin: 0;
            font-size: 8.8pt;
            line-height: 1.2;
            font-weight: 800;
            color: #3b302d;
          }

          .item-subtitle {
            margin-top: 1mm;
            color: #655955;
            font-weight: 600;
          }

          .item-meta {
            margin-top: 1mm;
            color: #756965;
          }

          .item-date {
            font-size: 7.5pt;
            font-weight: 700;
            color: #6e625d;
            white-space: nowrap;
            padding-top: 0.5mm;
          }

          .bullet-list {
            margin: 2.2mm 0 0 0;
            padding-left: 4.2mm;
          }

          .bullet-list li {
            margin: 0 0 1.1mm 0;
            color: #4e4541;
          }

          .stack-list {
            display: grid;
            gap: 4.5mm;
          }

          .card-item {
            padding-bottom: 1mm;
          }

          .card-item.compact {
            padding-bottom: 0;
          }

          .item-text {
            margin-top: 1.8mm;
            color: #4f4542;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2.2mm;
          }

          .tag {
            display: inline-block;
            white-space: nowrap;
            padding: 4px 7px;
            border-radius: 999px;
            background: #e6ddd5;
            color: #4b403b;
            font-size: 7.2pt;
            font-weight: 700;
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
            ${this.renderContactSection()}
            ${this.renderLanguagesSection()}
            ${this.renderSkillsSection()}
          </div>
          <div class="main">
            ${this.renderHeaderSection()}
            ${this.renderProfileSection()}
            ${this.renderExperienceSection()}
            ${this.renderProjectsSection()}
            ${this.renderAchievementsSection()}
            ${this.renderEducationSection()}
            ${this.renderCertificationsSection()}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-dune-v1')) {
    customElements.define('gqr-resume-dune-v1', GQRResumeDuneV1);
  }
})();