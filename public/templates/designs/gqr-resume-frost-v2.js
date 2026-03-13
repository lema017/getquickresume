(function() {
  'use strict';

  const I18N = {
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
      experience: 'Experiencia Laboral',
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

  function safeStr(v) {
    return v == null ? '' : String(v);
  }

  function safeArr(v) {
    return Array.isArray(v) ? v : [];
  }

  function escapeHtml(t) {
    return safeStr(t)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatShortDate(value, lang) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return escapeHtml(value);
    return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      month: 'short',
      year: 'numeric'
    }).format(d);
  }

  function formatDateRange(startDate, endDate, isCurrentLike, lang, presentLabel) {
    const start = formatShortDate(startDate, lang);
    const end = isCurrentLike ? presentLabel : formatShortDate(endDate, lang);
    if (start && end) return start + ' — ' + end;
    return start || end || '';
  }

  class GQRResumeFrostV2 extends HTMLElement {
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

    t() {
      return I18N[this.getLanguage()] || I18N.en;
    }

    renderHeader(d) {
      const firstName = safeStr(d.firstName);
      const lastName = safeStr(d.lastName);
      const fullName = [firstName, lastName].filter(Boolean).join(' ');
      const profession = safeStr(d.profession);

      const contacts = [
        d.email ? `✉ ${escapeHtml(d.email)}` : '',
        d.phone ? `☎ ${escapeHtml(d.phone)}` : '',
        d.country ? `⚲ ${escapeHtml(d.country)}` : '',
        d.linkedin ? `🔗 ${escapeHtml(d.linkedin)}` : ''
      ].filter(Boolean);

      if (!fullName && !profession && !contacts.length) return '';

      return `
        <section class="header-block" data-section="header">
          <div class="top-rule"></div>
          ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
          ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
        </section>
        ${contacts.length ? `
          <section class="contact-block" data-section="contact">
            <div class="contact-list">
              ${contacts.map((item, index) => `<div class="contact-item" data-entry-id="contact-${index}">${item}</div>`).join('')}
            </div>
          </section>
        ` : ''}
      `;
    }

    renderProfile(d, tt) {
      const summary = safeStr(d.summary);
      if (!summary) return '';
      return `
        <section class="section" data-section="profile">
          <h2 class="section-title">${escapeHtml(tt.profile)}</h2>
          <div class="section-body prose">
            <p>${escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(d, tt) {
      const combined = Array.from(new Set(
        safeArr(d.skillsRaw)
          .concat(safeArr(d.toolsRaw))
          .map(safeStr)
          .map(function(s) { return s.trim(); })
          .filter(Boolean)
      ));

      if (!combined.length) return '';

      return `
        <section class="section" data-section="skills">
          <h2 class="section-title">${escapeHtml(tt.skills)}</h2>
          <div class="section-body">
            <div class="skills-grid">
              ${combined.map((skill, index) => `
                <div class="skill-chip" data-entry-id="skill-${index}">${escapeHtml(skill)}</div>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(d, tt, lang) {
      const items = safeArr(d.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          <h2 class="section-title">${escapeHtml(tt.experience)}</h2>
          <div class="section-body">
            ${items.map((item, index) => {
              const title = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);
              const range = formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang, tt.present);
              const bullets = safeArr(item.achievements).concat(safeArr(item.responsibilities)).map(safeStr).map(function(s) { return s.trim(); }).filter(Boolean);
              const line2 = [company, location].filter(Boolean).join(' · ');

              return `
                <article class="entry" data-entry-id="${escapeHtml(item.id || ('experience-' + index))}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                      ${line2 ? `<div class="entry-subtitle">${escapeHtml(line2)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${escapeHtml(range)}</div>` : ''}
                  </div>
                  ${bullets.length ? `
                    <ul class="bullet-list">
                      ${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}
                    </ul>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjects(d, tt) {
      const items = safeArr(d.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          <h2 class="section-title">${escapeHtml(tt.projects)}</h2>
          <div class="section-body">
            ${items.map((item, index) => {
              const name = safeStr(item.name);
              const description = safeStr(item.description);
              const technologies = safeArr(item.technologies).map(safeStr).map(function(s) { return s.trim(); }).filter(Boolean);
              const url = safeStr(item.url);

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(item.id || ('project-' + index))}">
                  <div class="entry-head single-line">
                    ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                    ${url ? `<div class="entry-link">${escapeHtml(url)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="meta-row">
                      ${technologies.map((tech, techIndex) => `<span class="meta-chip" data-entry-id="${escapeHtml((item.id || ('project-' + index)) + '-tech-' + techIndex)}">${escapeHtml(tech)}</span>`).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements(d, tt) {
      const items = safeArr(d.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          <h2 class="section-title">${escapeHtml(tt.achievements)}</h2>
          <div class="section-body">
            ${items.map((item, index) => {
              const title = safeStr(item.title);
              const description = safeStr(item.description);
              const year = safeStr(item.year);

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(item.id || ('achievement-' + index))}">
                  <div class="entry-head single-line">
                    ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                    ${year ? `<div class="entry-date">${escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducation(d, tt, lang) {
      const items = safeArr(d.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          <h2 class="section-title">${escapeHtml(tt.education)}</h2>
          <div class="section-body">
            ${items.map((item, index) => {
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);
              const title = [degree, field].filter(Boolean).join(', ');
              const range = formatDateRange(item.startDate, item.endDate, item.isCompleted === false, lang, tt.present);

              return `
                <article class="entry" data-entry-id="${escapeHtml(item.id || ('education-' + index))}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                      ${institution ? `<div class="entry-subtitle">${escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${escapeHtml(range)}</div>` : ''}
                  </div>
                  ${gpa ? `<p class="entry-text">GPA: ${escapeHtml(gpa)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(d, tt, lang) {
      const items = safeArr(d.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          <h2 class="section-title">${escapeHtml(tt.certifications)}</h2>
          <div class="section-body">
            ${items.map((item, index) => {
              const name = safeStr(item.name);
              const issuer = safeStr(item.issuer);
              const date = item.date ? formatShortDate(item.date, lang) : '';

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(item.id || ('certification-' + index))}">
                  <div class="entry-head single-line">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                      ${issuer ? `<div class="entry-subtitle">${escapeHtml(issuer)}</div>` : ''}
                    </div>
                    ${date ? `<div class="entry-date">${escapeHtml(date)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderLanguages(d, tt) {
      const items = safeArr(d.languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          <h2 class="section-title">${escapeHtml(tt.languages)}</h2>
          <div class="section-body">
            <div class="language-list">
              ${items.map((item, index) => {
                const name = safeStr(item.name);
                const levelKey = safeStr(item.level).toLowerCase();
                const level = (tt.levelMap && tt.levelMap[levelKey]) ? tt.levelMap[levelKey] : safeStr(item.level);

                return `
                  <div class="language-item" data-entry-id="${escapeHtml(item.id || ('language-' + index))}">
                    <span class="language-name">${escapeHtml(name)}</span>
                    <span class="language-sep">—</span>
                    <span class="language-level">${escapeHtml(level)}</span>
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
      const tt = this.t();

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2d2b28;
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
            background: #fbfaf8;
            padding: 16mm 16mm 18mm;
            font-family: Georgia, "Times New Roman", serif;
            color: #2f2d2a;
          }

          .top-rule {
            width: 100%;
            height: 8px;
            background: linear-gradient(90deg, #c7c1b7 0%, #e7e2da 45%, #f3f1ed 100%);
            margin-bottom: 16px;
            border-radius: 1px;
          }

          .header-block {
            padding-bottom: 8px;
          }

          .name {
            margin: 0;
            font-size: 33px;
            line-height: 1.05;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: #262421;
          }

          .profession {
            margin-top: 8px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12.5px;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #6f6a63;
          }

          .contact-block {
            padding: 10px 0 14px;
            border-bottom: 1px solid #ddd8d0;
            margin-bottom: 14px;
          }

          .contact-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 14px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11.5px;
            color: #5c5852;
          }

          .contact-item {
            white-space: nowrap;
          }

          .section {
            margin-top: 18px;
          }

          .section-title {
            margin: 0 0 10px;
            padding-bottom: 6px;
            border-bottom: 1px solid #d9d4cc;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            color: #5e5952;
          }

          .section-body {
            display: block;
          }

          .prose p,
          .entry-text {
            margin: 0;
            font-size: 14px;
            line-height: 1.55;
            color: #35322f;
          }

          .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 8px;
          }

          .skill-chip,
          .meta-chip {
            display: inline-block;
            padding: 5px 10px;
            border: 1px solid #d6d0c7;
            background: #f1eee9;
            border-radius: 999px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            line-height: 1.2;
            color: #4e4943;
          }

          .entry {
            padding: 10px 0 12px;
            border-bottom: 1px solid #ebe6df;
          }

          .entry:last-child {
            border-bottom: none;
          }

          .entry.compact {
            padding-top: 8px;
            padding-bottom: 10px;
          }

          .entry-head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 16px;
          }

          .entry-head.single-line .entry-main {
            min-width: 0;
          }

          .entry-main {
            flex: 1 1 auto;
            min-width: 0;
          }

          .entry-title {
            margin: 0;
            font-size: 17px;
            line-height: 1.25;
            font-weight: 700;
            color: #2a2825;
          }

          .entry-subtitle {
            margin-top: 3px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #726d66;
          }

          .entry-date,
          .entry-link {
            flex: 0 0 auto;
            white-space: nowrap;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11.5px;
            line-height: 1.4;
            color: #6d685f;
            text-align: right;
          }

          .entry-text {
            margin-top: 8px;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 0 0 5px;
            font-size: 13.5px;
            line-height: 1.5;
            color: #363330;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .meta-row {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            margin-top: 8px;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .language-item {
            font-size: 14px;
            line-height: 1.5;
            color: #332f2c;
          }

          .language-name {
            font-weight: 700;
          }

          .language-sep {
            margin: 0 6px;
            color: #8a847c;
          }

          .language-level {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
            color: #6f695f;
            text-transform: uppercase;
            letter-spacing: 0.08em;
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
          ${this.renderProfile(d, tt)}
          ${this.renderSkills(d, tt)}
          ${this.renderExperience(d, tt, lang)}
          ${this.renderProjects(d, tt)}
          ${this.renderAchievements(d, tt)}
          ${this.renderEducation(d, tt, lang)}
          ${this.renderCertifications(d, tt, lang)}
          ${this.renderLanguages(d, tt)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-frost-v2')) {
    customElements.define('gqr-resume-frost-v2', GQRResumeFrostV2);
  }
})();