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
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return escapeHtml(value);

    try {
      return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
        month: 'short',
        year: 'numeric'
      }).format(date);
    } catch (e) {
      return escapeHtml(value);
    }
  }

  function formatDateRange(startDate, endDate, isCurrent, lang, i18n, isEducation) {
    const start = formatShortDate(startDate, lang);
    let end = '';

    if (isEducation) {
      end = isCurrent === false ? i18n.present : formatShortDate(endDate, lang);
    } else {
      end = isCurrent ? i18n.present : formatShortDate(endDate, lang);
    }

    if (start && end) return start + ' — ' + end;
    return start || end || '';
  }

  class GQRResumeValeV1 extends HTMLElement {
    static get observedAttributes() {
      return ['language'];
    }

    constructor() {
      super();
      this._data = {};
      this.attachShadow({ mode: 'open' });
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

    renderHeader(d) {
      const firstName = safeStr(d.firstName);
      const lastName = safeStr(d.lastName);
      const profession = safeStr(d.profession);
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      const contacts = [
        d.phone ? `☎ ${escapeHtml(d.phone)}` : '',
        d.email ? `✉ ${escapeHtml(d.email)}` : '',
        d.country ? `⌂ ${escapeHtml(d.country)}` : '',
        d.linkedin ? `🔗 ${escapeHtml(d.linkedin)}` : ''
      ].filter(Boolean);

      if (!fullName && !profession && contacts.length === 0) return '';

      return `
        <section class="section header-block" data-section="header">
          <div class="header-top">
            ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
          </div>
          ${contacts.length ? `
            <div class="contact-row" data-section="contact">
              ${contacts.map((item, index) => `
                <div class="contact-item" data-entry-id="contact-${index}">${item}</div>
              `).join('')}
            </div>
          ` : ''}
        </section>
      `;
    }

    renderProfile(d, i18n) {
      const summary = safeStr(d.summary).trim();
      if (!summary) return '';
      return `
        <section class="section" data-section="profile">
          <h2 class="section-title">${escapeHtml(i18n.profile)}</h2>
          <div class="section-body">
            <p class="profile-text">${escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(d, i18n) {
      const merged = Array.from(new Set(
        safeArr(d.skillsRaw)
          .concat(safeArr(d.toolsRaw))
          .map(safeStr)
          .map(s => s.trim())
          .filter(Boolean)
      ));

      if (!merged.length) return '';

      return `
        <section class="section" data-section="skills">
          <h2 class="section-title">${escapeHtml(i18n.skills)}</h2>
          <div class="section-body">
            <div class="skills-list">
              ${merged.map((skill, index) => `
                <span class="skill-pill" data-entry-id="skill-${index}">${escapeHtml(skill)}</span>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(d, i18n, lang) {
      const items = safeArr(d.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          <h2 class="section-title">${escapeHtml(i18n.experience)}</h2>
          <div class="section-body">
            ${items.map((item, index) => {
              const bullets = safeArr(item.achievements).concat(safeArr(item.responsibilities))
                .map(safeStr)
                .map(v => v.trim())
                .filter(Boolean);

              const title = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);
              const metaParts = [company, location].filter(Boolean);
              const range = formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang, i18n, false);
              const entryId = safeStr(item.id) || `experience-${index}`;

              return `
                <article class="entry" data-entry-id="${escapeHtml(entryId)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                      ${metaParts.length ? `<div class="entry-subtitle">${escapeHtml(metaParts.join(' · '))}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${escapeHtml(range)}</div>` : ''}
                  </div>
                  ${bullets.length ? `
                    <ul class="bullet-list">
                      ${bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
                    </ul>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjects(d, i18n) {
      const items = safeArr(d.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          <h2 class="section-title">${escapeHtml(i18n.projects)}</h2>
          <div class="section-body">
            ${items.map((item, index) => {
              const entryId = safeStr(item.id) || `project-${index}`;
              const name = safeStr(item.name);
              const description = safeStr(item.description);
              const technologies = safeArr(item.technologies).map(safeStr).map(s => s.trim()).filter(Boolean);
              const url = safeStr(item.url);

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(entryId)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                      ${url ? `<div class="entry-link">${escapeHtml(url)}</div>` : ''}
                    </div>
                  </div>
                  ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map((tech, techIndex) => `
                        <span class="tag" data-entry-id="${escapeHtml(entryId)}-tech-${techIndex}">${escapeHtml(tech)}</span>
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

    renderAchievements(d, i18n) {
      const items = safeArr(d.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          <h2 class="section-title">${escapeHtml(i18n.achievements)}</h2>
          <div class="section-body">
            ${items.map((item, index) => {
              const entryId = safeStr(item.id) || `achievement-${index}`;
              const title = safeStr(item.title);
              const description = safeStr(item.description);
              const year = safeStr(item.year);

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(entryId)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                    </div>
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

    renderEducation(d, i18n, lang) {
      const items = safeArr(d.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          <h2 class="section-title">${escapeHtml(i18n.education)}</h2>
          <div class="section-body">
            ${items.map((item, index) => {
              const entryId = safeStr(item.id) || `education-${index}`;
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);
              const title = [degree, field].filter(Boolean).join(' · ');
              const range = formatDateRange(item.startDate, item.endDate, item.isCompleted === false ? false : true, lang, i18n, true);

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(entryId)}">
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

    renderCertifications(d, i18n, lang) {
      const items = safeArr(d.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          <h2 class="section-title">${escapeHtml(i18n.certifications)}</h2>
          <div class="section-body">
            ${items.map((item, index) => {
              const entryId = safeStr(item.id) || `certification-${index}`;
              const name = safeStr(item.name);
              const issuer = safeStr(item.issuer);
              const date = formatShortDate(item.date, lang);

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(entryId)}">
                  <div class="entry-head">
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

    renderLanguages(d, i18n) {
      const items = safeArr(d.languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          <h2 class="section-title">${escapeHtml(i18n.languages)}</h2>
          <div class="section-body">
            <div class="language-list">
              ${items.map((item, index) => {
                const entryId = safeStr(item.id) || `language-${index}`;
                const name = safeStr(item.name);
                const levelKey = safeStr(item.level).toLowerCase();
                const level = i18n.levelMap[levelKey] || safeStr(item.level);

                return `
                  <div class="language-item" data-entry-id="${escapeHtml(entryId)}">
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
      if (!this.shadowRoot) return;

      const d = this._data || {};
      const lang = this.getLanguage();
      const i18n = I18N[lang] || I18N.en;

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #222326;
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
            padding: 18mm 16mm 16mm;
            background: #ffffff;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.45;
            color: #222326;
          }

          .section {
            margin: 0 0 18px;
          }

          .header-block {
            margin-bottom: 20px;
            padding-bottom: 14px;
            border-bottom: 2px solid #5a5d63;
          }

          .header-top {
            display: block;
          }

          .name {
            margin: 0;
            font-size: 22pt;
            line-height: 1.05;
            letter-spacing: 0.4px;
            font-weight: 800;
            text-transform: uppercase;
            color: #26282d;
          }

          .profession {
            margin-top: 8px;
            font-size: 10.5pt;
            font-weight: 700;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            color: #4f5258;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 16px;
            margin-top: 14px;
          }

          .contact-item {
            font-size: 9.5pt;
            color: #33353a;
            white-space: normal;
          }

          .section-title {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 0 0 10px;
            font-size: 11.5pt;
            line-height: 1.1;
            font-weight: 800;
            letter-spacing: 0.6px;
            text-transform: uppercase;
            color: #2c2e33;
          }

          .section-title::after {
            content: "";
            flex: 1;
            height: 1px;
            background: #7a7d84;
          }

          .section-body {
            font-size: 10pt;
            color: #2c2e33;
          }

          .profile-text,
          .entry-text {
            margin: 0;
            color: #31343a;
          }

          .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-pill,
          .tag {
            display: inline-block;
            padding: 5px 10px;
            border: 1px solid #aeb2b9;
            border-radius: 999px;
            font-size: 9.2pt;
            color: #30333a;
            background: #f6f7f8;
          }

          .entry {
            margin-bottom: 14px;
          }

          .entry:last-child {
            margin-bottom: 0;
          }

          .entry.compact {
            margin-bottom: 12px;
          }

          .entry-head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 14px;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-size: 10.5pt;
            line-height: 1.3;
            font-weight: 700;
            color: #23252a;
          }

          .entry-subtitle,
          .entry-link {
            margin-top: 2px;
            font-size: 9.4pt;
            color: #5a5d63;
          }

          .entry-link {
            word-break: break-word;
          }

          .entry-date {
            flex: 0 0 auto;
            text-align: right;
            font-size: 9.1pt;
            font-weight: 700;
            color: #4f5258;
            white-space: nowrap;
          }

          .bullet-list {
            margin: 7px 0 0 0;
            padding: 0 0 0 18px;
            color: #31343a;
          }

          .bullet-list li {
            margin: 0 0 4px;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            margin-top: 8px;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .language-item {
            font-size: 10pt;
            color: #2e3137;
          }

          .language-name {
            font-weight: 700;
          }

          .language-sep {
            margin: 0 6px;
            color: #686b72;
          }

          .language-level {
            color: #4e5258;
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
          ${this.renderProfile(d, i18n)}
          ${this.renderSkills(d, i18n)}
          ${this.renderExperience(d, i18n, lang)}
          ${this.renderProjects(d, i18n)}
          ${this.renderAchievements(d, i18n)}
          ${this.renderEducation(d, i18n, lang)}
          ${this.renderCertifications(d, i18n, lang)}
          ${this.renderLanguages(d, i18n)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-vale-v1')) {
    customElements.define('gqr-resume-vale-v1', GQRResumeValeV1);
  }
})();