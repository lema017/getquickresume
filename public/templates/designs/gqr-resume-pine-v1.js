(function() {
  'use strict';

  const I18N = {
    en: {
      profile: 'Profile',
      experience: 'Experience',
      education: 'Education',
      projects: 'Projects',
      certifications: 'Certifications',
      languages: 'Languages',
      achievements: 'Achievements',
      skills: 'Skills',
      present: 'Present',
      levelMap: {
        basic: 'Basic',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        native: 'Native'
      }
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
      present: 'Presente',
      levelMap: {
        basic: 'Básico',
        intermediate: 'Intermedio',
        advanced: 'Avanzado',
        native: 'Nativo'
      }
    }
  };

  class GQRResumePineV1 extends HTMLElement {
    static get observedAttributes() {
      return ['language'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._data = {};
    }

    set data(value) {
      this._data = value && typeof value === 'object' ? value : {};
      this.render();
    }

    get data() {
      return this._data;
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
      const dataLang = this._data && this._data.language;
      const lang = attrLang || dataLang || 'en';
      return lang === 'es' ? 'es' : 'en';
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

    formatDateShort(dateValue, lang) {
      const value = this.safeStr(dateValue).trim();
      if (!value) return '';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      let year = '';
      let monthIndex = null;

      if (/^\d{4}-\d{2}/.test(value)) {
        const parts = value.split('-');
        year = parts[0];
        monthIndex = Math.max(0, Math.min(11, parseInt(parts[1], 10) - 1));
      } else if (/^\d{4}$/.test(value)) {
        return value;
      } else {
        const d = new Date(value);
        if (!isNaN(d.getTime())) {
          year = String(d.getFullYear());
          monthIndex = d.getMonth();
        } else {
          return this.escapeHtml(value);
        }
      }

      if (monthIndex == null || !year) return this.escapeHtml(value);
      return months[monthIndex] + ' ' + year;
    }

    formatRange(startDate, endDate, lang, isCurrentLike) {
      const t = I18N[lang] || I18N.en;
      const start = this.formatDateShort(startDate, lang);
      const end = isCurrentLike ? t.present : this.formatDateShort(endDate, lang);
      if (start && end) return start + ' — ' + end;
      return start || end || '';
    }

    uniqueList(items) {
      const map = new Set();
      const out = [];
      this.safeArr(items).forEach((item) => {
        const normalized = this.safeStr(item).trim();
        const key = normalized.toLowerCase();
        if (normalized && !map.has(key)) {
          map.add(key);
          out.push(normalized);
        }
      });
      return out;
    }

    renderHeader(d) {
      const firstName = this.safeStr(d.firstName);
      const lastName = this.safeStr(d.lastName);
      const profession = this.safeStr(d.profession);
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      const contactParts = [
        d.email ? `✉ ${this.escapeHtml(d.email)}` : '',
        d.phone ? `☎ ${this.escapeHtml(d.phone)}` : '',
        d.country ? `⚲ ${this.escapeHtml(d.country)}` : '',
        d.linkedin ? `🔗 ${this.escapeHtml(d.linkedin)}` : ''
      ].filter(Boolean);

      if (!fullName && !profession && !contactParts.length) return '';

      return `
        <section class="header" data-section="header">
          <div class="header-top">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
          ${contactParts.length ? `
            <div class="contact-list" data-section="contact">
              ${contactParts.map((item, index) => `
                <span class="contact-pill" data-entry-id="contact-${index}">${item}</span>
              `).join('')}
            </div>
          ` : ''}
        </section>
      `;
    }

    renderProfile(d, t) {
      const summary = this.safeStr(d.summary).trim();
      if (!summary) return '';
      return `
        <section class="section" data-section="profile">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${this.escapeHtml(t.profile)}</h2>
          </div>
          <div class="section-body prose">
            <p>${this.escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(d, t) {
      const merged = this.uniqueList([
        ...this.safeArr(d.skillsRaw),
        ...this.safeArr(d.toolsRaw)
      ]);

      if (!merged.length) return '';

      return `
        <section class="section" data-section="skills">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${this.escapeHtml(t.skills)}</h2>
          </div>
          <div class="section-body">
            <div class="tag-grid">
              ${merged.map((skill, index) => `
                <span class="tag" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(d, t, lang) {
      const items = this.safeArr(d.experience).filter(item => item && (
        this.safeStr(item.title) ||
        this.safeStr(item.company) ||
        this.safeArr(item.achievements).length ||
        this.safeArr(item.responsibilities).length
      ));

      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${this.escapeHtml(t.experience)}</h2>
          </div>
          <div class="section-body timeline">
            ${items.map((item, idx) => {
              const bullets = this.uniqueList([
                ...this.safeArr(item.achievements),
                ...this.safeArr(item.responsibilities)
              ]);
              const range = this.formatRange(item.startDate, item.endDate, lang, !!item.isCurrent);
              const title = this.safeStr(item.title);
              const company = this.safeStr(item.company);
              const location = this.safeStr(item.location);
              const meta = [company, location].filter(Boolean).join(' · ');
              const entryId = this.safeStr(item.id) || `experience-${idx}`;

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${meta ? `<div class="entry-subtitle">${this.escapeHtml(meta)}</div>` : ''}
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

    renderProjects(d, t) {
      const items = this.safeArr(d.projects).filter(item => item && (
        this.safeStr(item.name) ||
        this.safeStr(item.description) ||
        this.safeArr(item.technologies).length
      ));

      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${this.escapeHtml(t.projects)}</h2>
          </div>
          <div class="section-body stacked">
            ${items.map((item, idx) => {
              const entryId = this.safeStr(item.id) || `project-${idx}`;
              const technologies = this.uniqueList(item.technologies);
              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${item.name ? `<h3 class="entry-title">${this.escapeHtml(item.name)}</h3>` : ''}
                      ${item.url ? `<div class="entry-link">${this.escapeHtml(item.url)}</div>` : ''}
                    </div>
                  </div>
                  ${item.description ? `<p class="entry-text">${this.escapeHtml(item.description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="tag-grid small">
                      ${technologies.map((tech, techIdx) => `
                        <span class="tag" data-entry-id="${this.escapeHtml(entryId)}-tech-${techIdx}">${this.escapeHtml(tech)}</span>
                      `).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements(d, t) {
      const items = this.safeArr(d.achievements).filter(item => item && (
        this.safeStr(item.title) || this.safeStr(item.description) || this.safeStr(item.year)
      ));

      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${this.escapeHtml(t.achievements)}</h2>
          </div>
          <div class="section-body stacked">
            ${items.map((item, idx) => {
              const entryId = this.safeStr(item.id) || `achievement-${idx}`;
              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${item.title ? `<h3 class="entry-title">${this.escapeHtml(item.title)}</h3>` : ''}
                    </div>
                    ${item.year ? `<div class="entry-date">${this.escapeHtml(item.year)}</div>` : ''}
                  </div>
                  ${item.description ? `<p class="entry-text">${this.escapeHtml(item.description)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducation(d, t, lang) {
      const items = this.safeArr(d.education).filter(item => item && (
        this.safeStr(item.degree) ||
        this.safeStr(item.field) ||
        this.safeStr(item.institution)
      ));

      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${this.escapeHtml(t.education)}</h2>
          </div>
          <div class="section-body timeline">
            ${items.map((item, idx) => {
              const entryId = this.safeStr(item.id) || `education-${idx}`;
              const degree = this.safeStr(item.degree);
              const field = this.safeStr(item.field);
              const institution = this.safeStr(item.institution);
              const title = [degree, field].filter(Boolean).join(' · ');
              const range = this.formatRange(item.startDate, item.endDate, lang, item.isCompleted === false);
              return `
                <article class="entry" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${item.gpa ? `<div class="entry-note">GPA: ${this.escapeHtml(item.gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(d, t, lang) {
      const items = this.safeArr(d.certifications).filter(item => item && (
        this.safeStr(item.name) || this.safeStr(item.issuer) || this.safeStr(item.date)
      ));

      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${this.escapeHtml(t.certifications)}</h2>
          </div>
          <div class="section-body stacked">
            ${items.map((item, idx) => {
              const entryId = this.safeStr(item.id) || `certification-${idx}`;
              const date = item.date ? this.formatDateShort(item.date, lang) : '';
              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${item.name ? `<h3 class="entry-title">${this.escapeHtml(item.name)}</h3>` : ''}
                      ${item.issuer ? `<div class="entry-subtitle">${this.escapeHtml(item.issuer)}</div>` : ''}
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

    renderLanguages(d, t, lang) {
      const items = this.safeArr(d.languages).filter(item => item && (
        this.safeStr(item.name) || this.safeStr(item.level)
      ));

      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${this.escapeHtml(t.languages)}</h2>
          </div>
          <div class="section-body">
            <div class="language-list">
              ${items.map((item, idx) => {
                const entryId = this.safeStr(item.id) || `language-${idx}`;
                const levelKey = this.safeStr(item.level).toLowerCase();
                const levelLabel = (t.levelMap && t.levelMap[levelKey]) || this.safeStr(item.level);
                return `
                  <div class="language-item" data-entry-id="${this.escapeHtml(entryId)}">
                    <span class="language-name">${this.escapeHtml(item.name)}</span>
                    <span class="language-sep">—</span>
                    <span class="language-level">${this.escapeHtml(levelLabel)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </section>
      `;
    }

    render() {
      const d = this._data || {};
      const lang = this.getLanguage();
      const t = I18N[lang] || I18N.en;

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #1f2328;
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
            margin: 0 auto;
            background: #ffffff;
            padding: 0;
          }

          .sheet {
            min-height: 297mm;
            background:
              linear-gradient(180deg, #1e2328 0, #1e2328 54mm, #ffffff 54mm, #ffffff 100%);
          }

          .header {
            padding: 28px 36px 24px;
            color: #ffffff;
          }

          .header-top {
            border-bottom: 2px solid rgba(224, 168, 0, 0.95);
            padding-bottom: 14px;
            margin-bottom: 14px;
          }

          .name {
            margin: 0;
            font-size: 34px;
            line-height: 1.05;
            font-weight: 800;
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 8px;
            color: #d7dde3;
            font-size: 14px;
            line-height: 1.4;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .contact-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 10px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 6px 10px;
            border: 1px solid rgba(224, 168, 0, 0.45);
            background: rgba(255, 255, 255, 0.06);
            border-radius: 999px;
            color: #f6f7f8;
            font-size: 11.5px;
            line-height: 1.2;
          }

          .content {
            padding: 24px 36px 34px;
          }

          .section {
            margin: 0 0 22px 0;
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .section-heading {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;
          }

          .section-kicker {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #d9a300;
            box-shadow: 0 0 0 4px rgba(217, 163, 0, 0.14);
            flex: 0 0 14px;
          }

          .section-heading h2 {
            margin: 0;
            font-size: 18px;
            line-height: 1.2;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #d39c00;
            position: relative;
          }

          .section-heading h2::after {
            content: "";
            display: inline-block;
            vertical-align: middle;
            width: 64px;
            height: 2px;
            margin-left: 10px;
            background: linear-gradient(90deg, #d9a300, rgba(217, 163, 0, 0.15));
            transform: translateY(-2px);
          }

          .section-body {
            padding-left: 24px;
          }

          .prose p,
          .entry-text,
          .entry-note,
          .entry-subtitle,
          .entry-link,
          .bullet-list li,
          .language-item {
            font-size: 13px;
            line-height: 1.55;
            color: #32363c;
          }

          .prose p {
            margin: 0;
          }

          .tag-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .tag {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 6px 11px;
            border-radius: 999px;
            background: #fff8e1;
            border: 1px solid #efcf77;
            color: #3b3320;
            font-size: 12px;
            font-weight: 600;
            line-height: 1.2;
          }

          .tag-grid.small .tag {
            font-size: 11.5px;
            min-height: 26px;
            padding: 5px 10px;
          }

          .timeline,
          .stacked {
            display: grid;
            gap: 14px;
          }

          .entry {
            position: relative;
            padding: 0 0 0 16px;
            border-left: 2px solid #ecd28a;
          }

          .entry::before {
            content: "";
            position: absolute;
            left: -6px;
            top: 4px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #d9a300;
          }

          .entry.compact {
            padding-bottom: 2px;
          }

          .entry-head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 14px;
            margin-bottom: 4px;
          }

          .entry-main {
            min-width: 0;
            flex: 1 1 auto;
          }

          .entry-title {
            margin: 0;
            font-size: 14px;
            line-height: 1.35;
            font-weight: 800;
            color: #1f2328;
          }

          .entry-subtitle {
            margin-top: 2px;
            color: #555d66;
          }

          .entry-link {
            margin-top: 3px;
            color: #7a5b00;
            word-break: break-word;
          }

          .entry-date {
            flex: 0 0 auto;
            white-space: nowrap;
            font-size: 11.5px;
            line-height: 1.3;
            font-weight: 700;
            color: #7a5b00;
            background: #fff6d6;
            border: 1px solid #eed48a;
            border-radius: 999px;
            padding: 5px 9px;
          }

          .entry-text,
          .entry-note {
            margin: 5px 0 0 0;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 0 0 4px 0;
          }

          .language-list {
            display: grid;
            gap: 8px;
          }

          .language-item {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            align-items: baseline;
            padding: 8px 0;
            border-bottom: 1px solid #eee6cf;
          }

          .language-item:last-child {
            border-bottom: none;
          }

          .language-name {
            font-weight: 700;
            color: #1f2328;
          }

          .language-sep {
            color: #9a7b1f;
          }

          .language-level {
            color: #5a6169;
          }

          @page {
            size: A4;
            margin: 0;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          <div class="sheet">
            ${this.renderHeader(d)}
            <main class="content">
              ${this.renderProfile(d, t)}
              ${this.renderSkills(d, t)}
              ${this.renderExperience(d, t, lang)}
              ${this.renderProjects(d, t)}
              ${this.renderAchievements(d, t)}
              ${this.renderEducation(d, t, lang)}
              ${this.renderCertifications(d, t, lang)}
              ${this.renderLanguages(d, t, lang)}
            </main>
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-pine-v1')) {
    customElements.define('gqr-resume-pine-v1', GQRResumePineV1);
  }
})();