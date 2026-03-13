(function() {
  'use strict';

  /**
   * name: gqr-resume-reed-v1
   * description: "Two-column resume with a dark charcoal sidebar, warm gold accents, clean sans-serif typography, and a modern editorial layout inspired by premium sidebar/main CV designs."
   */

  class GQRResumeReedV1 extends HTMLElement {
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

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      this.render();
    }

    set data(value) {
      this._data = value || {};
      this.render();
    }

    get data() {
      return this._data || {};
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
      const locale = lang === 'es' ? 'es-ES' : 'en-US';

      if (/^\d{4}-\d{2}$/.test(raw)) {
        const [y, m] = raw.split('-').map(Number);
        const d = new Date(y, m - 1, 1);
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString(locale, { month: 'short', year: 'numeric' });
        }
      }

      if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
        const d = new Date(raw + 'T00:00:00');
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString(locale, { month: 'short', year: 'numeric' });
        }
      }

      if (/^\d{4}$/.test(raw)) return raw;
      return raw;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang] || this.i18n.en;
      const start = this.formatShortDate(this.safeStr(startDate), lang);
      const end = isCurrentLike
        ? t.present
        : this.formatShortDate(this.safeStr(endDate), lang);

      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `
        <div class="section-title-wrap">
          <h3 class="section-title">${this.escapeHtml(title)}</h3>
          <span class="section-accent"></span>
        </div>
      `;
    }

    renderContactSection(d, t) {
      const email = this.safeStr(d.email).trim();
      const phone = this.safeStr(d.phone).trim();
      const country = this.safeStr(d.country).trim();
      const linkedin = this.safeStr(d.linkedin).trim();

      if (!email && !phone && !country && !linkedin) return '';

      const rows = [];
      if (email) rows.push(`<div class="contact-item"><span class="ci">✉</span><span>${this.escapeHtml(email)}</span></div>`);
      if (phone) rows.push(`<div class="contact-item"><span class="ci">☎</span><span>${this.escapeHtml(phone)}</span></div>`);
      if (country) rows.push(`<div class="contact-item"><span class="ci">⌂</span><span>${this.escapeHtml(country)}</span></div>`);
      if (linkedin) rows.push(`<div class="contact-item"><span class="ci">in</span><span>${this.escapeHtml(linkedin)}</span></div>`);

      return `
        <section class="section sidebar-section" data-section="contact">
          ${this.renderSectionTitle(t.contact)}
          <div class="contact-list">
            ${rows.join('')}
          </div>
        </section>
      `;
    }

    renderLanguagesSection(d, t, lang) {
      const items = this.safeArr(d.languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section sidebar-section" data-section="languages">
          ${this.renderSectionTitle(t.languages)}
          <div class="lang-list">
            ${items.map((item, idx) => {
              const id = this.safeStr(item && item.id).trim() || `lang-${idx}`;
              const name = this.safeStr(item && item.name).trim();
              const levelRaw = this.safeStr(item && item.level).trim().toLowerCase();
              const level = (this.levelMap[lang] && this.levelMap[lang][levelRaw]) || levelRaw || '';
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

    renderSkillsSection(d, t) {
      const skills = this.safeArr(d.skillsRaw).map(s => this.safeStr(s).trim()).filter(Boolean);
      const tools = this.safeArr(d.toolsRaw).map(s => this.safeStr(s).trim()).filter(Boolean);
      const merged = [...skills, ...tools];
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
          ${this.renderSectionTitle(t.skills)}
          <div class="skills-wrap">
            ${deduped.map((skill, idx) => `
              <span class="skill-badge" data-entry-id="skill-${idx}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderHeaderSection(d) {
      const firstName = this.safeStr(d.firstName).trim();
      const lastName = this.safeStr(d.lastName).trim();
      const profession = this.safeStr(d.profession).trim();
      const fullName = `${firstName} ${lastName}`.trim();

      if (!fullName && !profession) return '';

      return `
        <section class="hero" data-section="header">
          <div class="hero-inner">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession-pill">${this.escapeHtml(profession)}</div>` : ''}
          </div>
        </section>
      `;
    }

    renderProfileSection(d, t) {
      const summary = this.safeStr(d.summary).trim();
      if (!summary) return '';

      return `
        <section class="section main-section" data-section="profile">
          ${this.renderSectionTitle(t.profile)}
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection(d, t) {
      const items = this.safeArr(d.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="experience">
          ${this.renderSectionTitle(t.experience)}
          <div class="timeline">
            ${items.map((item, idx) => {
              const id = this.safeStr(item.id).trim() || `exp-${idx}`;
              const title = this.safeStr(item.title).trim();
              const company = this.safeStr(item.company).trim();
              const location = this.safeStr(item.location).trim();
              const dateRange = this.formatDateRange(
                item.startDate,
                item.endDate,
                !!item.isCurrent
              );

              const bullets = [
                ...this.safeArr(item.achievements),
                ...this.safeArr(item.responsibilities)
              ].map(v => this.safeStr(v).trim()).filter(Boolean);

              return `
                <article class="entry exp-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-title-group">
                      ${title ? `<h4 class="entry-title">${this.escapeHtml(title)}</h4>` : ''}
                      ${(company || location) ? `<div class="entry-subtitle">${this.escapeHtml([company, location].filter(Boolean).join(' • '))}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
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

    renderProjectsSection(d, t) {
      const items = this.safeArr(d.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          ${this.renderSectionTitle(t.projects)}
          <div class="stack-list">
            ${items.map((item, idx) => {
              const id = this.safeStr(item.id).trim() || `proj-${idx}`;
              const name = this.safeStr(item.name).trim();
              const description = this.safeStr(item.description).trim();
              const url = this.safeStr(item.url).trim();
              const techs = this.safeArr(item.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const dateRange = this.formatDateRange(item.startDate, item.endDate, !!item.isOngoing);

              if (!name && !description && !techs.length && !url) return '';

              return `
                <article class="entry project-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-title-group">
                      ${name ? `<h4 class="entry-title">${this.escapeHtml(name)}</h4>` : ''}
                      ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${techs.length ? `<div class="tag-row">${techs.map(tag => `<span class="mini-tag">${this.escapeHtml(tag)}</span>`).join('')}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievementsSection(d, t) {
      const items = this.safeArr(d.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          ${this.renderSectionTitle(t.achievements)}
          <div class="stack-list">
            ${items.map((item, idx) => {
              const id = this.safeStr(item.id).trim() || `ach-${idx}`;
              const title = this.safeStr(item.title).trim();
              const description = this.safeStr(item.description).trim();
              const year = this.safeStr(item.year).trim();

              if (!title && !description && !year) return '';

              return `
                <article class="entry achievement-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
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
      `;
    }

    renderEducationSection(d, t) {
      const items = this.safeArr(d.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="education">
          ${this.renderSectionTitle(t.education)}
          <div class="timeline">
            ${items.map((item, idx) => {
              const id = this.safeStr(item.id).trim() || `edu-${idx}`;
              const institution = this.safeStr(item.institution).trim();
              const degree = this.safeStr(item.degree).trim();
              const field = this.safeStr(item.field).trim();
              const gpa = this.safeStr(item.gpa).trim();
              const line2 = [degree, field].filter(Boolean).join(' — ');
              const dateRange = this.formatDateRange(
                item.startDate,
                item.endDate,
                item.isCompleted === false
              );

              return `
                <article class="entry edu-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-title-group">
                      ${institution ? `<h4 class="entry-title">${this.escapeHtml(institution)}</h4>` : ''}
                      ${line2 ? `<div class="entry-subtitle">${this.escapeHtml(line2)}</div>` : ''}
                      ${gpa ? `<div class="entry-meta">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertificationsSection(d, t) {
      const items = this.safeArr(d.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          ${this.renderSectionTitle(t.certifications)}
          <div class="stack-list">
            ${items.map((item, idx) => {
              const id = this.safeStr(item.id).trim() || `cert-${idx}`;
              const name = this.safeStr(item.name).trim();
              const issuer = this.safeStr(item.issuer).trim();
              const date = this.safeStr(item.date).trim();

              if (!name && !issuer && !date) return '';

              return `
                <article class="entry cert-entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-title-group">
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
      `;
    }

    render() {
      if (!this.shadowRoot) return;

      const d = this.data || {};
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang] || this.i18n.en;

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #1d1d1d;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-family: Arial, Helvetica, sans-serif;
          }

          * {
            box-sizing: border-box;
          }

          .page {
            width: 210mm;
            min-height: 297mm;
            height: auto;
            overflow: visible;
            background: #f3f1ed;
            display: grid;
            grid-template-columns: 35% 65%;
            grid-template-areas:
              "sidebar main";
            margin: 0 auto;
          }

          .sidebar {
            grid-area: sidebar;
            background: linear-gradient(180deg, #151515 0%, #0f0f0f 100%);
            color: #f7f4ed;
            padding: 18mm 10mm 16mm 12mm;
            position: relative;
          }

          .sidebar::after {
            content: "";
            position: absolute;
            right: 0;
            top: 14mm;
            width: 6px;
            height: 34mm;
            background: #d6a91d;
          }

          .main {
            grid-area: main;
            padding: 12mm 14mm 16mm 14mm;
            background: #f3f1ed;
          }

          .hero {
            background: #e7e3de;
            padding: 10mm 10mm 8mm 10mm;
            margin: -2mm 0 8mm 0;
            border-left: 8px solid #d6a91d;
          }

          .name {
            margin: 0 0 4mm 0;
            font-size: 13.5mm;
            line-height: 1;
            font-weight: 800;
            letter-spacing: -0.3px;
            color: #111;
          }

          .profession-pill {
            display: inline-block;
            background: #d6a91d;
            color: #111;
            padding: 2.2mm 4mm;
            font-size: 4.1mm;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.4px;
          }

          .section {
            margin: 0 0 8mm 0;
          }

          .section-title-wrap {
            margin-bottom: 4mm;
          }

          .section-title {
            margin: 0;
            font-size: 5.1mm;
            line-height: 1.15;
            font-weight: 800;
            color: inherit;
          }

          .section-accent {
            display: block;
            width: 14mm;
            height: 1.2mm;
            background: #d6a91d;
            margin-top: 1.6mm;
          }

          .sidebar .section-title {
            color: #fff3ce;
          }

          .profile-text,
          .entry-text,
          .contact-item,
          .entry-subtitle,
          .entry-meta,
          .lang-level {
            font-size: 3.7mm;
            line-height: 1.5;
          }

          .profile-text {
            color: #303030;
          }

          .contact-list {
            display: grid;
            gap: 3mm;
          }

          .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 2.5mm;
            color: #f3efe4;
            word-break: break-word;
          }

          .ci {
            min-width: 5mm;
            color: #d6a91d;
            font-weight: 800;
            text-align: center;
          }

          .lang-list {
            display: grid;
            gap: 3.6mm;
          }

          .lang-item {
            padding-bottom: 2.4mm;
            border-bottom: 1px solid rgba(255,255,255,0.12);
          }

          .lang-name {
            font-size: 4mm;
            font-weight: 700;
            color: #fff;
            margin-bottom: 0.8mm;
          }

          .lang-level {
            color: #d8d2c4;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            background: rgba(214, 169, 29, 0.14);
            color: #fff3ce;
            border: 1px solid rgba(214, 169, 29, 0.55);
            border-radius: 999px;
            padding: 1.4mm 3mm;
            font-size: 3.3mm;
            line-height: 1.2;
          }

          .timeline,
          .stack-list {
            display: grid;
            gap: 5mm;
          }

          .entry {
            position: relative;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            gap: 4mm;
            align-items: flex-start;
          }

          .entry-title-group {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-size: 4.3mm;
            line-height: 1.25;
            font-weight: 800;
            color: #171717;
          }

          .entry-subtitle {
            color: #4f4f4f;
            margin-top: 0.8mm;
          }

          .entry-meta {
            color: #666;
            margin-top: 0.8mm;
          }

          .entry-date {
            color: #876a10;
            font-size: 3.3mm;
            line-height: 1.3;
            font-weight: 700;
            text-align: right;
            white-space: nowrap;
            padding-top: 0.5mm;
          }

          .bullet-list {
            margin: 2mm 0 0 0;
            padding-left: 5mm;
          }

          .bullet-list li {
            margin: 0 0 1.2mm 0;
            font-size: 3.6mm;
            line-height: 1.45;
            color: #2b2b2b;
          }

          .entry-link {
            margin-top: 0.8mm;
            color: #6a6a6a;
            font-size: 3.3mm;
            word-break: break-word;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2mm;
          }

          .mini-tag {
            display: inline-block;
            background: #ece7d9;
            color: #554314;
            border-radius: 999px;
            padding: 1mm 2.5mm;
            font-size: 3mm;
            line-height: 1.2;
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
            ${this.renderContactSection(d, t)}
            ${this.renderLanguagesSection(d, t, lang)}
            ${this.renderSkillsSection(d, t)}
          </div>

          <div class="main">
            ${this.renderHeaderSection(d)}
            ${this.renderProfileSection(d, t)}
            ${this.renderExperienceSection(d, t)}
            ${this.renderProjectsSection(d, t)}
            ${this.renderAchievementsSection(d, t)}
            ${this.renderEducationSection(d, t)}
            ${this.renderCertificationsSection(d, t)}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-reed-v1')) {
    customElements.define('gqr-resume-reed-v1', GQRResumeReedV1);
  }
})();