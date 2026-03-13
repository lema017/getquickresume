(function() {
  'use strict';

  class GQRResumeCoralV2 extends HTMLElement {
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
      if (!value) return '';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return this.escapeHtml(this.safeStr(value));

      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      return months[date.getMonth()] + ' ' + date.getFullYear();
    }

    formatDateRange(startDate, endDate, isCurrentOrIncomplete, lang) {
      const i18n = this.getI18n()[lang];
      const start = this.formatShortDate(startDate, lang);
      const end = isCurrentOrIncomplete ? i18n.present : this.formatShortDate(endDate, lang);

      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `
        <div class="section-heading">
          <span class="section-accent"></span>
          <h2>${this.escapeHtml(title)}</h2>
        </div>
      `;
    }

    renderHeader(d) {
      const firstName = this.safeStr(d.firstName);
      const lastName = this.safeStr(d.lastName);
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      const profession = this.safeStr(d.profession);

      const contactItems = [
        d.email ? { icon: '✉', text: d.email } : null,
        d.phone ? { icon: '☎', text: d.phone } : null,
        d.country ? { icon: '⚲', text: d.country } : null,
        d.linkedin ? { icon: '🔗', text: d.linkedin } : null
      ].filter(Boolean);

      if (!fullName && !profession && !contactItems.length) return '';

      return `
        <section class="hero" data-section="header">
          <div class="hero-top">
            <div class="hero-name-block">
              ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
              ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
            </div>
          </div>
          ${contactItems.length ? `
            <div class="contact-row" data-section="contact">
              ${contactItems.map((item, idx) => `
                <div class="contact-pill" data-entry-id="contact-${idx}">
                  <span class="contact-icon">${item.icon}</span>
                  <span>${this.escapeHtml(item.text)}</span>
                </div>
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
        <section class="section profile-section" data-section="profile">
          ${this.renderSectionTitle(t.profile)}
          <div class="card prose">
            ${this.escapeHtml(summary)}
          </div>
        </section>
      `;
    }

    renderSkills(d, t) {
      const skillsRaw = this.safeArr(d.skillsRaw);
      const toolsRaw = this.safeArr(d.toolsRaw);
      const merged = Array.from(new Set(
        skillsRaw.concat(toolsRaw)
          .map(v => this.safeStr(v).trim())
          .filter(Boolean)
      ));

      if (!merged.length) return '';

      return `
        <section class="section" data-section="skills">
          ${this.renderSectionTitle(t.skills)}
          <div class="skills-wrap">
            ${merged.map((skill, idx) => `
              <span class="skill-chip" data-entry-id="skill-${idx}">${this.escapeHtml(skill)}</span>
            `).join('')}
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
          <div class="timeline">
            ${items.map((item, idx) => {
              const bullets = this.safeArr(item.achievements).concat(this.safeArr(item.responsibilities))
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);

              const range = this.formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang);
              const title = this.safeStr(item.title);
              const company = this.safeStr(item.company);
              const location = this.safeStr(item.location);
              const entryId = this.safeStr(item.id) || ('experience-' + idx);

              return `
                <article class="entry card timeline-entry" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-meta">
                          ${company ? `<span class="meta-strong">${this.escapeHtml(company)}</span>` : ''}
                          ${company && location ? `<span class="meta-sep">•</span>` : ''}
                          ${location ? `<span>${this.escapeHtml(location)}</span>` : ''}
                        </div>
                      ` : ''}
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
      const items = this.safeArr(d.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          ${this.renderSectionTitle(t.projects)}
          <div class="stack">
            ${items.map((item, idx) => {
              const entryId = this.safeStr(item.id) || ('project-' + idx);
              const name = this.safeStr(item.name);
              const description = this.safeStr(item.description);
              const technologies = this.safeArr(item.technologies)
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);
              const url = this.safeStr(item.url).trim();

              return `
                <article class="entry card" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-top">
                    ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                    ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="mini-chips">
                      ${technologies.map((tech, techIdx) => `
                        <span class="mini-chip" data-entry-id="${this.escapeHtml(entryId)}-tech-${techIdx}">${this.escapeHtml(tech)}</span>
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
      const items = this.safeArr(d.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          ${this.renderSectionTitle(t.achievements)}
          <div class="stack">
            ${items.map((item, idx) => {
              const entryId = this.safeStr(item.id) || ('achievement-' + idx);
              const title = this.safeStr(item.title);
              const description = this.safeStr(item.description);
              const year = this.safeStr(item.year);

              return `
                <article class="entry card achievement-entry" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-top">
                    ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                    ${year ? `<div class="year-badge">${this.escapeHtml(year)}</div>` : ''}
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
          <div class="timeline">
            ${items.map((item, idx) => {
              const entryId = this.safeStr(item.id) || ('education-' + idx);
              const degree = this.safeStr(item.degree);
              const field = this.safeStr(item.field);
              const institution = this.safeStr(item.institution);
              const gpa = this.safeStr(item.gpa);
              const range = this.formatDateRange(item.startDate, item.endDate, item.isCompleted === false, lang);

              return `
                <article class="entry card timeline-entry" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${(degree || field) ? `
                        <h3 class="entry-title">
                          ${this.escapeHtml([degree, field].filter(Boolean).join(degree && field ? ' — ' : ''))}
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
          <div class="stack">
            ${items.map((item, idx) => {
              const entryId = this.safeStr(item.id) || ('certification-' + idx);
              const name = this.safeStr(item.name);
              const issuer = this.safeStr(item.issuer);
              const date = item.date ? this.formatShortDate(item.date, lang) : '';

              return `
                <article class="entry card compact-entry" data-entry-id="${this.escapeHtml(entryId)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                      ${issuer ? `<div class="entry-meta"><span>${this.escapeHtml(issuer)}</span></div>` : ''}
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

      const lang = this.getLanguage();
      const levelMap = this.getI18n()[lang].levelMap;

      return `
        <section class="section" data-section="languages">
          ${this.renderSectionTitle(t.languages)}
          <div class="languages-list">
            ${items.map((item, idx) => {
              const entryId = this.safeStr(item.id) || ('language-' + idx);
              const name = this.safeStr(item.name);
              const levelKey = this.safeStr(item.level).toLowerCase();
              const level = levelMap[levelKey] || this.safeStr(item.level);

              return `
                <div class="language-row card" data-entry-id="${this.escapeHtml(entryId)}">
                  <span class="language-name">${this.escapeHtml(name)}</span>
                  <span class="language-level">${this.escapeHtml(level)}</span>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    render() {
      if (!this.shadowRoot) return;

      const d = this._data || {};
      const lang = this.getLanguage();
      const t = this.getI18n()[lang];

      this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600;700&display=swap');

          :host {
            display: block;
            color: #231f20;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            --bg: #fffdfd;
            --paper: #ffffff;
            --text: #231f20;
            --muted: #645b63;
            --line: #ead9df;
            --coral: #ef8c7f;
            --coral-deep: #d96f63;
            --lilac: #d9c8e6;
            --mint: #dcefe5;
            --rose: #f8e7e1;
            --shadow: 0 10px 24px rgba(120, 88, 98, 0.08);
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
            padding: 36px 34px 38px;
            background:
              radial-gradient(circle at top right, rgba(239, 140, 127, 0.10), transparent 22%),
              radial-gradient(circle at top left, rgba(217, 200, 230, 0.18), transparent 24%),
              linear-gradient(180deg, #fffdfd 0%, #fffefe 100%);
            color: var(--text);
            font-family: 'Inter', Arial, sans-serif;
            position: relative;
          }

          .page::before {
            content: '';
            position: absolute;
            inset: 14px;
            border: 1.5px solid rgba(217, 200, 230, 0.42);
            border-radius: 22px;
            pointer-events: none;
          }

          .page::after {
            content: '';
            position: absolute;
            top: 20px;
            right: 26px;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background:
              radial-gradient(circle, rgba(239, 140, 127, 0.16) 0 34%, transparent 36%),
              radial-gradient(circle, rgba(217, 200, 230, 0.22) 0 54%, transparent 56%);
            filter: blur(0.2px);
            pointer-events: none;
          }

          .hero {
            position: relative;
            margin-bottom: 24px;
            padding: 22px 24px 18px;
            background: linear-gradient(135deg, var(--lilac) 0%, var(--mint) 100%);
            border-radius: 20px;
            box-shadow: var(--shadow);
            overflow: hidden;
          }

          .hero::before {
            content: '';
            position: absolute;
            top: -26px;
            right: -26px;
            width: 120px;
            height: 120px;
            background: rgba(255, 255, 255, 0.36);
            border-radius: 24px;
            transform: rotate(18deg);
          }

          .hero::after {
            content: '';
            position: absolute;
            left: 18px;
            bottom: 16px;
            width: 72px;
            height: 6px;
            border-radius: 999px;
            background: linear-gradient(90deg, var(--coral), transparent);
          }

          .hero-top {
            position: relative;
            z-index: 1;
          }

          .name {
            margin: 0;
            font-family: 'Space Grotesk', Arial, sans-serif;
            font-size: 34px;
            line-height: 1;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            color: #171314;
          }

          .profession {
            margin-top: 8px;
            display: inline-block;
            font-size: 13px;
            line-height: 1.2;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.4px;
            color: #3a3035;
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.62);
            border: 1px solid rgba(255, 255, 255, 0.75);
          }

          .contact-row {
            position: relative;
            z-index: 1;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 16px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            min-height: 34px;
            padding: 7px 12px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.78);
            border: 1px solid rgba(255, 255, 255, 0.9);
            color: #332c30;
            font-size: 12px;
            line-height: 1.3;
            word-break: break-word;
          }

          .contact-icon {
            color: var(--coral-deep);
            font-size: 12px;
            line-height: 1;
          }

          .section {
            margin-top: 18px;
          }

          .section-heading {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 0 0 12px;
          }

          .section-accent {
            width: 14px;
            height: 14px;
            border-radius: 4px;
            background: linear-gradient(135deg, var(--coral) 0%, var(--lilac) 100%);
            box-shadow: 0 0 0 4px rgba(239, 140, 127, 0.10);
            flex: 0 0 auto;
          }

          .section-heading h2 {
            margin: 0;
            font-family: 'Space Grotesk', Arial, sans-serif;
            font-size: 16px;
            line-height: 1.2;
            letter-spacing: 1.4px;
            text-transform: uppercase;
            color: #231f20;
          }

          .card {
            background: var(--paper);
            border: 1px solid rgba(234, 217, 223, 0.95);
            border-radius: 16px;
            box-shadow: 0 6px 16px rgba(80, 58, 66, 0.05);
          }

          .prose {
            padding: 16px 18px;
            font-size: 13.5px;
            line-height: 1.7;
            color: #372f34;
            white-space: pre-wrap;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .skill-chip {
            display: inline-flex;
            align-items: center;
            padding: 8px 12px;
            border-radius: 999px;
            background: linear-gradient(135deg, rgba(239, 140, 127, 0.16), rgba(217, 200, 230, 0.20));
            border: 1px solid rgba(239, 140, 127, 0.20);
            color: #2f262a;
            font-size: 12.5px;
            font-weight: 600;
            line-height: 1.25;
          }

          .timeline,
          .stack,
          .languages-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .entry {
            padding: 14px 16px;
            position: relative;
          }

          .timeline-entry {
            border-left: 5px solid transparent;
            background:
              linear-gradient(#fff, #fff) padding-box,
              linear-gradient(180deg, var(--coral), var(--lilac)) border-box;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
          }

          .entry-main {
            min-width: 0;
            flex: 1 1 auto;
          }

          .entry-title {
            margin: 0;
            font-family: 'Space Grotesk', Arial, sans-serif;
            font-size: 15px;
            line-height: 1.25;
            color: #1f1a1c;
          }

          .entry-meta {
            margin-top: 4px;
            font-size: 12.5px;
            line-height: 1.45;
            color: var(--muted);
          }

          .meta-strong {
            font-weight: 700;
            color: #342d31;
          }

          .meta-sep {
            margin: 0 6px;
          }

          .entry-date,
          .year-badge,
          .entry-link {
            flex: 0 0 auto;
            font-size: 11.5px;
            line-height: 1.2;
            color: #43393e;
            background: var(--rose);
            border: 1px solid rgba(239, 140, 127, 0.24);
            padding: 7px 10px;
            border-radius: 999px;
            white-space: nowrap;
          }

          .entry-link {
            max-width: 230px;
            white-space: normal;
            word-break: break-word;
            text-align: right;
          }

          .entry-text {
            margin: 10px 0 0;
            font-size: 13px;
            line-height: 1.65;
            color: #393134;
          }

          .bullet-list {
            margin: 10px 0 0 0;
            padding: 0;
            list-style: none;
          }

          .bullet-list li {
            position: relative;
            padding-left: 16px;
            margin: 0 0 6px;
            font-size: 13px;
            line-height: 1.6;
            color: #352d31;
          }

          .bullet-list li::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0.72em;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--coral) 0%, var(--lilac) 100%);
            transform: translateY(-50%);
          }

          .mini-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 12px;
          }

          .mini-chip {
            display: inline-flex;
            align-items: center;
            padding: 6px 10px;
            border-radius: 999px;
            background: rgba(220, 239, 229, 0.72);
            border: 1px solid rgba(160, 203, 183, 0.42);
            font-size: 11.5px;
            line-height: 1.2;
            color: #244138;
            font-weight: 600;
          }

          .language-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 12px 14px;
          }

          .language-name {
            font-size: 13.5px;
            font-weight: 700;
            color: #272224;
          }

          .language-level {
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.3px;
            color: #5f5259;
            background: linear-gradient(135deg, rgba(217, 200, 230, 0.28), rgba(239, 140, 127, 0.14));
            padding: 6px 10px;
            border-radius: 999px;
            border: 1px solid rgba(217, 200, 230, 0.45);
          }

          .compact-entry .entry-top,
          .achievement-entry .entry-top {
            align-items: center;
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
          ${this.renderProfile(d, t)}
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

  if (!customElements.get('gqr-resume-coral-v2')) {
    customElements.define('gqr-resume-coral-v2', GQRResumeCoralV2);
  }
})();