(function() {
  'use strict';

  class GQRResumeSandV2 extends HTMLElement {
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

    getLanguage() {
      const attrLang = this.getAttribute('language');
      const dataLang = this._data && this._data.language;
      const lang = attrLang || dataLang || 'en';
      return lang === 'es' ? 'es' : 'en';
    }

    getI18n() {
      return {
        en: {
          profile: 'Profile',
          experience: 'Work Experience',
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
    }

    formatShortDate(value, lang) {
      const raw = this.safeStr(value).trim();
      if (!raw) return '';
      const date = new Date(raw);
      if (Number.isNaN(date.getTime())) {
        return this.escapeHtml(raw);
      }
      return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
        month: 'short',
        year: 'numeric'
      }).format(date);
    }

    formatDateRange(startDate, endDate, lang, isCurrent) {
      const t = this.getI18n()[lang];
      const start = this.formatShortDate(startDate, lang);
      const end = isCurrent ? t.present : this.formatShortDate(endDate, lang);
      if (start && end) return start + ' — ' + end;
      return start || end || '';
    }

    formatEducationDateRange(startDate, endDate, lang, isCompleted) {
      const t = this.getI18n()[lang];
      const start = this.formatShortDate(startDate, lang);
      const end = isCompleted === false ? t.present : this.formatShortDate(endDate, lang);
      if (start && end) return start + ' — ' + end;
      return start || end || '';
    }

    renderHeader(d) {
      const firstName = this.safeStr(d.firstName).trim();
      const lastName = this.safeStr(d.lastName).trim();
      const profession = this.safeStr(d.profession).trim();
      const email = this.safeStr(d.email).trim();
      const phone = this.safeStr(d.phone).trim();
      const country = this.safeStr(d.country).trim();
      const linkedin = this.safeStr(d.linkedin).trim();

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      const contactItems = [
        email ? '✉ ' + this.escapeHtml(email) : '',
        phone ? '☎ ' + this.escapeHtml(phone) : '',
        country ? '⌂ ' + this.escapeHtml(country) : '',
        linkedin ? '🔗 ' + this.escapeHtml(linkedin) : ''
      ].filter(Boolean);

      if (!fullName && !profession && contactItems.length === 0) return '';

      return `
        <header class="hero">
          <div class="hero-frame">
            <div class="nameplate" data-section="header">
              ${fullName ? `<h1 class="full-name">${this.escapeHtml(fullName)}</h1>` : ''}
              ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
            </div>
            ${contactItems.length ? `
              <div class="contact-row" data-section="contact">
                ${contactItems.map(function(item) {
                  return `<span class="contact-chip">${item}</span>`;
                }).join('')}
              </div>
            ` : ''}
          </div>
        </header>
      `;
    }

    renderSectionTitle(title) {
      return `
        <div class="section-heading-wrap" aria-hidden="true">
          <span class="ornament left"></span>
          <h2 class="section-heading">${this.escapeHtml(title)}</h2>
          <span class="ornament right"></span>
        </div>
      `;
    }

    renderProfile(summary, t) {
      const text = this.safeStr(summary).trim();
      if (!text) return '';
      return `
        <section class="section" data-section="profile">
          ${this.renderSectionTitle(t.profile)}
          <div class="section-card prose">
            <p>${this.escapeHtml(text)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(d, t) {
      const merged = Array.from(new Set(
        this.safeArr(d.skillsRaw)
          .concat(this.safeArr(d.toolsRaw))
          .map((item) => this.safeStr(item).trim())
          .filter(Boolean)
      ));

      if (!merged.length) return '';

      return `
        <section class="section" data-section="skills">
          ${this.renderSectionTitle(t.skills)}
          <div class="section-card">
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
      const items = this.safeArr(d.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          ${this.renderSectionTitle(t.experience)}
          <div class="timeline-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id).trim() || ('experience-' + index);
              const title = this.safeStr(item.title).trim();
              const company = this.safeStr(item.company).trim();
              const location = this.safeStr(item.location).trim();
              const range = this.formatDateRange(item.startDate, item.endDate, lang, !!item.isCurrent);
              const bullets = this.safeArr(item.achievements)
                .concat(this.safeArr(item.responsibilities))
                .map((b) => this.safeStr(b).trim())
                .filter(Boolean);

              if (!title && !company && !location && !range && !bullets.length) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-meta">
                          ${company ? `<span class="meta-strong">${this.escapeHtml(company)}</span>` : ''}
                          ${(company && location) ? `<span class="meta-sep">•</span>` : ''}
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
      `;
    }

    renderProjects(d, t) {
      const items = this.safeArr(d.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          ${this.renderSectionTitle(t.projects)}
          <div class="stack-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id).trim() || ('project-' + index);
              const name = this.safeStr(item.name).trim();
              const description = this.safeStr(item.description).trim();
              const technologies = this.safeArr(item.technologies)
                .map((x) => this.safeStr(x).trim())
                .filter(Boolean);
              const url = this.safeStr(item.url).trim();

              if (!name && !description && !technologies.length && !url) return '';

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                    </div>
                    ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="mini-tags">
                      ${technologies.map((tech) => `<span class="mini-tag">${this.escapeHtml(tech)}</span>`).join('')}
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
      const items = this.safeArr(d.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          ${this.renderSectionTitle(t.achievements)}
          <div class="stack-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id).trim() || ('achievement-' + index);
              const title = this.safeStr(item.title).trim();
              const description = this.safeStr(item.description).trim();
              const year = this.safeStr(item.year).trim();

              if (!title && !description && !year) return '';

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                    </div>
                    ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducation(d, t, lang) {
      const items = this.safeArr(d.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          ${this.renderSectionTitle(t.education)}
          <div class="timeline-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id).trim() || ('education-' + index);
              const degree = this.safeStr(item.degree).trim();
              const field = this.safeStr(item.field).trim();
              const institution = this.safeStr(item.institution).trim();
              const gpa = this.safeStr(item.gpa).trim();
              const range = this.formatEducationDateRange(item.startDate, item.endDate, lang, item.isCompleted);

              if (!degree && !field && !institution && !gpa && !range) return '';

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${(degree || field) ? `
                        <h3 class="entry-title">
                          ${this.escapeHtml([degree, field].filter(Boolean).join(degree && field ? ' in ' : ''))}
                        </h3>
                      ` : ''}
                      ${institution ? `<div class="entry-meta"><span class="meta-strong">${this.escapeHtml(institution)}</span></div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${gpa ? `<p class="entry-text">GPA: ${this.escapeHtml(gpa)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(d, t, lang) {
      const items = this.safeArr(d.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          ${this.renderSectionTitle(t.certifications)}
          <div class="stack-list">
            ${items.map((item, index) => {
              const id = this.safeStr(item.id).trim() || ('certification-' + index);
              const name = this.safeStr(item.name).trim();
              const issuer = this.safeStr(item.issuer).trim();
              const date = this.formatShortDate(item.date, lang);

              if (!name && !issuer && !date) return '';

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                      ${issuer ? `<div class="entry-meta"><span class="meta-strong">${this.escapeHtml(issuer)}</span></div>` : ''}
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

    renderLanguages(d, t) {
      const items = this.safeArr(d.languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          ${this.renderSectionTitle(t.languages)}
          <div class="section-card">
            <div class="language-list">
              ${items.map((item, index) => {
                const id = this.safeStr(item.id).trim() || ('language-' + index);
                const name = this.safeStr(item.name).trim();
                const levelKey = this.safeStr(item.level).trim().toLowerCase();
                const level = t.levelMap[levelKey] || this.safeStr(item.level).trim();
                if (!name && !level) return '';
                return `
                  <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                    <span class="language-name">${this.escapeHtml(name)}</span>
                    <span class="language-sep">—</span>
                    <span class="language-level">${this.escapeHtml(level)}</span>
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
      const t = this.getI18n()[lang];

      this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

          :host {
            display: block;
            color: #2d2218;
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
            padding: 16mm 14mm 16mm 14mm;
            background:
              radial-gradient(circle at top left, rgba(133, 95, 46, 0.05), transparent 18%),
              radial-gradient(circle at bottom right, rgba(133, 95, 46, 0.04), transparent 20%),
              linear-gradient(180deg, #f5eddc 0%, #f8f1e3 100%);
            color: #2d2218;
            font-family: "Cormorant Garamond", Georgia, serif;
            border: 1.2px solid #7a5a35;
            position: relative;
          }

          .page::before,
          .page::after {
            content: "";
            position: absolute;
            inset: 8px;
            border: 1px solid rgba(122, 90, 53, 0.45);
            pointer-events: none;
          }

          .page::after {
            inset: 18px;
            border-style: dashed;
            border-color: rgba(122, 90, 53, 0.22);
          }

          .hero {
            margin-bottom: 14px;
          }

          .hero-frame {
            text-align: center;
            padding: 14px 12px 10px;
            border-top: 3px double #6f512f;
            border-bottom: 3px double #6f512f;
            background:
              linear-gradient(180deg, rgba(111, 81, 47, 0.04), rgba(111, 81, 47, 0.02));
          }

          .nameplate {
            margin-bottom: 8px;
          }

          .full-name {
            margin: 0;
            font-family: "Cinzel", "Times New Roman", serif;
            font-size: 30px;
            line-height: 1.08;
            letter-spacing: 1.6px;
            text-transform: uppercase;
            color: #382716;
          }

          .profession {
            margin-top: 6px;
            font-family: "Inter", Arial, sans-serif;
            font-size: 12px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #765835;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
          }

          .contact-chip {
            display: inline-flex;
            align-items: center;
            padding: 4px 10px;
            border: 1px solid rgba(122, 90, 53, 0.55);
            border-radius: 999px;
            background: rgba(122, 90, 53, 0.05);
            font-family: "Inter", Arial, sans-serif;
            font-size: 10.5px;
            line-height: 1.3;
            color: #4b3928;
          }

          .section {
            margin-top: 14px;
          }

          .section-heading-wrap {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 0 0 8px 0;
          }

          .section-heading {
            margin: 0;
            white-space: nowrap;
            font-family: "Cinzel", "Times New Roman", serif;
            font-size: 18px;
            line-height: 1.1;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            color: #3a2918;
          }

          .ornament {
            flex: 1;
            height: 1px;
            background: linear-gradient(90deg, transparent, #7b5d39, transparent);
            position: relative;
          }

          .ornament::before {
            content: "✦";
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 10px;
            color: #7b5d39;
            background: #f7efdf;
            padding: 0 4px;
          }

          .ornament.left::before {
            right: 14px;
          }

          .ornament.right::before {
            left: 14px;
          }

          .section-card,
          .entry {
            background: rgba(255, 252, 245, 0.45);
            border: 1px solid rgba(122, 90, 53, 0.34);
            padding: 10px 12px;
          }

          .prose p,
          .entry-text {
            margin: 0;
            font-size: 15px;
            line-height: 1.45;
            color: #2d2218;
          }

          .tag-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .tag,
          .mini-tag {
            display: inline-block;
            border: 1px solid #8b6a44;
            background: linear-gradient(180deg, rgba(139, 106, 68, 0.08), rgba(139, 106, 68, 0.03));
            color: #3b2c1d;
            border-radius: 999px;
          }

          .tag {
            padding: 5px 10px;
            font-family: "Inter", Arial, sans-serif;
            font-size: 11px;
            line-height: 1.25;
          }

          .mini-tag {
            padding: 3px 8px;
            font-family: "Inter", Arial, sans-serif;
            font-size: 10px;
            line-height: 1.2;
          }

          .timeline-list,
          .stack-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .entry {
            position: relative;
          }

          .entry::before {
            content: "";
            position: absolute;
            left: 7px;
            top: 7px;
            bottom: 7px;
            width: 2px;
            background: linear-gradient(180deg, #7b5d39, rgba(123, 93, 57, 0.1));
          }

          .entry.compact::before {
            opacity: 0.7;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
            margin-left: 10px;
          }

          .entry-main {
            flex: 1;
            min-width: 0;
          }

          .entry-title {
            margin: 0;
            font-family: "Cormorant Garamond", Georgia, serif;
            font-size: 21px;
            line-height: 1.05;
            font-weight: 700;
            color: #2f2115;
          }

          .entry-meta {
            margin-top: 3px;
            font-family: "Inter", Arial, sans-serif;
            font-size: 11px;
            line-height: 1.35;
            color: #6a5135;
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            align-items: center;
          }

          .meta-strong {
            font-weight: 600;
            color: #4b3723;
          }

          .meta-sep {
            opacity: 0.7;
          }

          .entry-date,
          .entry-link {
            flex: 0 0 auto;
            font-family: "Inter", Arial, sans-serif;
            font-size: 10.5px;
            line-height: 1.25;
            color: #6b5235;
            text-align: right;
            max-width: 38%;
            word-break: break-word;
          }

          .bullet-list {
            margin: 7px 0 0 24px;
            padding: 0 0 0 10px;
          }

          .bullet-list li {
            margin: 0 0 4px 0;
            font-size: 14.5px;
            line-height: 1.4;
            color: #2f2419;
          }

          .entry-text,
          .mini-tags {
            margin-left: 10px;
            margin-top: 7px;
          }

          .mini-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .language-item {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            gap: 6px;
            font-size: 15px;
            line-height: 1.4;
            color: #2d2218;
          }

          .language-name {
            font-weight: 700;
          }

          .language-sep {
            color: #7a5b37;
          }

          .language-level {
            font-family: "Inter", Arial, sans-serif;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            color: #6a5135;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${this.renderHeader(d)}
          ${this.renderProfile(d.summary, t)}
          ${this.renderSkills(d, t)}
          ${this.renderExperience(d, t, lang)}
          ${this.renderProjects(d, t)}
          ${this.renderAchievements(d, t)}
          ${this.renderEducation(d, t, lang)}
          ${this.renderCertifications(d, t, lang)}
          ${this.renderLanguages(d, t)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-sand-v2')) {
    customElements.define('gqr-resume-sand-v2', GQRResumeSandV2);
  }
})();