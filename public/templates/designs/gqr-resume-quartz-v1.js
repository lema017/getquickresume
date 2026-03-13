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

  function uniqueArray(arr) {
    const seen = new Set();
    return safeArr(arr).filter((item) => {
      const key = safeStr(item).trim().toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function formatShortDate(dateValue, lang) {
    const value = safeStr(dateValue).trim();
    if (!value) return '';

    const locale = lang === 'es' ? 'es-ES' : 'en-US';
    const date = new Date(value);

    if (!isNaN(date.getTime())) {
      return new Intl.DateTimeFormat(locale, {
        month: 'short',
        year: 'numeric'
      }).format(date);
    }

    const parts = value.match(/^(\d{4})(?:-(\d{1,2}))?/);
    if (parts) {
      const year = Number(parts[1]);
      const month = parts[2] ? Number(parts[2]) - 1 : 0;
      const fallbackDate = new Date(year, month, 1);
      if (!isNaN(fallbackDate.getTime())) {
        return new Intl.DateTimeFormat(locale, {
          month: 'short',
          year: 'numeric'
        }).format(fallbackDate);
      }
    }

    return escapeHtml(value);
  }

  function formatDateRange(startDate, endDate, lang, opts) {
    const options = opts || {};
    const start = formatShortDate(startDate, lang);
    let end = formatShortDate(endDate, lang);

    if (options.type === 'experience' && options.isCurrent) {
      end = I18N[lang].present;
    }

    if (options.type === 'education' && options.isCompleted === false) {
      end = I18N[lang].present;
    }

    if (start && end) return `${start} — ${end}`;
    if (start) return start;
    if (end) return end;
    return '';
  }

  class GQRResumeQuartzV1 extends HTMLElement {
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
      const attrLang = safeStr(this.getAttribute('language')).toLowerCase();
      const dataLang = safeStr(this._data && this._data.language).toLowerCase();
      const lang = attrLang || dataLang || 'en';
      return lang === 'es' ? 'es' : 'en';
    }

    renderHeader(data) {
      const firstName = safeStr(data.firstName);
      const lastName = safeStr(data.lastName);
      const profession = safeStr(data.profession);
      const fullName = `${firstName} ${lastName}`.trim();

      const contactItems = [
        data.email ? `✉ ${escapeHtml(data.email)}` : '',
        data.phone ? `☎ ${escapeHtml(data.phone)}` : '',
        data.country ? `⚲ ${escapeHtml(data.country)}` : '',
        data.linkedin ? `🔗 ${escapeHtml(data.linkedin)}` : ''
      ].filter(Boolean);

      if (!fullName && !profession && !contactItems.length) return '';

      return `
        <section class="header-block">
          <div class="top-band" data-section="header">
            ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
          </div>
          ${contactItems.length ? `
            <div class="contact-row" data-section="contact">
              ${contactItems.map((item, index) => `
                <div class="contact-chip" data-entry-id="contact-${index}">${item}</div>
              `).join('')}
            </div>
          ` : ''}
        </section>
      `;
    }

    renderProfile(summary, t) {
      const text = safeStr(summary).trim();
      if (!text) return '';
      return `
        <section class="section" data-section="profile">
          <h2 class="section-title">${escapeHtml(t.profile)}</h2>
          <div class="section-body">
            <p class="profile-text">${escapeHtml(text)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(skillsRaw, toolsRaw, t) {
      const combined = uniqueArray([].concat(safeArr(skillsRaw), safeArr(toolsRaw)));
      if (!combined.length) return '';

      return `
        <section class="section" data-section="skills">
          <h2 class="section-title">${escapeHtml(t.skills)}</h2>
          <div class="section-body">
            <div class="skills-grid">
              ${combined.map((skill, index) => `
                <div class="skill-pill" data-entry-id="skill-${index}">${escapeHtml(skill)}</div>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(experience, t, lang) {
      const items = safeArr(experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          <h2 class="section-title">${escapeHtml(t.experience)}</h2>
          <div class="section-body entries">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `experience-${index}`;
              const title = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);
              const bullets = uniqueArray([].concat(safeArr(item.achievements), safeArr(item.responsibilities)));
              const dateRange = formatDateRange(item.startDate, item.endDate, lang, {
                type: 'experience',
                isCurrent: !!item.isCurrent
              });

              if (!title && !company && !location && !bullets.length && !dateRange) return '';

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${(title || company) ? `
                        <div class="entry-title-line">
                          ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                          ${company ? `<div class="entry-subtitle">${escapeHtml(company)}</div>` : ''}
                        </div>
                      ` : ''}
                      ${location ? `<div class="entry-meta">${escapeHtml(location)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${bullets.length ? `
                    <ul class="bullet-list">
                      ${bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}
                    </ul>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjects(projects, t) {
      const items = safeArr(projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          <h2 class="section-title">${escapeHtml(t.projects)}</h2>
          <div class="section-body entries">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `project-${index}`;
              const name = safeStr(item.name);
              const description = safeStr(item.description);
              const technologies = uniqueArray(safeArr(item.technologies));
              const url = safeStr(item.url);

              if (!name && !description && !technologies.length && !url) return '';

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head compact">
                    ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                    ${url ? `<div class="entry-link">${escapeHtml(url)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map((tech, techIndex) => `
                        <span class="mini-tag" data-entry-id="${escapeHtml(id)}-tech-${techIndex}">${escapeHtml(tech)}</span>
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

    renderAchievements(achievements, t) {
      const items = safeArr(achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          <h2 class="section-title">${escapeHtml(t.achievements)}</h2>
          <div class="section-body entries">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `achievement-${index}`;
              const title = safeStr(item.title);
              const description = safeStr(item.description);
              const year = safeStr(item.year);

              if (!title && !description && !year) return '';

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head compact">
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

    renderEducation(education, t, lang) {
      const items = safeArr(education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          <h2 class="section-title">${escapeHtml(t.education)}</h2>
          <div class="section-body entries">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `education-${index}`;
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);
              const dateRange = formatDateRange(item.startDate, item.endDate, lang, {
                type: 'education',
                isCompleted: item.isCompleted
              });

              if (!degree && !field && !institution && !gpa && !dateRange) return '';

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${(degree || field) ? `
                        <div class="entry-title-line">
                          ${degree ? `<h3 class="entry-title">${escapeHtml(degree)}</h3>` : ''}
                          ${field ? `<div class="entry-subtitle">${escapeHtml(field)}</div>` : ''}
                        </div>
                      ` : ''}
                      ${institution ? `<div class="entry-meta">${escapeHtml(institution)}</div>` : ''}
                      ${gpa ? `<div class="entry-meta">GPA: ${escapeHtml(gpa)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(certifications, t, lang) {
      const items = safeArr(certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          <h2 class="section-title">${escapeHtml(t.certifications)}</h2>
          <div class="section-body entries">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `certification-${index}`;
              const name = safeStr(item.name);
              const issuer = safeStr(item.issuer);
              const date = formatShortDate(item.date, lang);

              if (!name && !issuer && !date) return '';

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head compact">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                      ${issuer ? `<div class="entry-meta">${escapeHtml(issuer)}</div>` : ''}
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

    renderLanguages(languages, t) {
      const items = safeArr(languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          <h2 class="section-title">${escapeHtml(t.languages)}</h2>
          <div class="section-body">
            <div class="language-list">
              ${items.map((item, index) => {
                const id = safeStr(item.id) || `language-${index}`;
                const name = safeStr(item.name);
                const levelKey = safeStr(item.level).toLowerCase();
                const level = t.levelMap[levelKey] || safeStr(item.level);

                if (!name && !level) return '';

                return `
                  <div class="language-item" data-entry-id="${escapeHtml(id)}">
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
      const data = this._data || {};
      const lang = this.getLanguage();
      const t = I18N[lang];

      const html = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

          :host {
            display: block;
            color: #2f3133;
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
            background: #ffffff;
            padding: 18mm 16mm 16mm 16mm;
            font-family: 'Inter', Arial, Helvetica, sans-serif;
            color: #2f3133;
            line-height: 1.45;
          }

          .header-block {
            margin-bottom: 22px;
          }

          .top-band {
            background: linear-gradient(135deg, #d9dddd 0%, #cfd4d4 100%);
            border-left: 6px solid #5d6468;
            padding: 18px 20px 16px;
          }

          .name {
            margin: 0;
            font-size: 32px;
            line-height: 1.05;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #2e3134;
            font-weight: 800;
          }

          .profession {
            margin-top: 6px;
            font-size: 13px;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #5f666a;
            font-weight: 600;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            padding-top: 12px;
          }

          .contact-chip {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 6px 10px;
            border: 1px solid #d7dcde;
            background: #f5f7f7;
            color: #495055;
            font-size: 12px;
            border-radius: 999px;
          }

          .section {
            margin-top: 18px;
          }

          .section-title {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 0 0 10px 0;
            font-size: 14px;
            line-height: 1.2;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            color: #3f464a;
            font-weight: 800;
          }

          .section-title::after {
            content: '';
            flex: 1;
            height: 1px;
            background: #bfc6c8;
          }

          .section-body {
            padding-left: 2px;
          }

          .profile-text,
          .entry-text {
            margin: 0;
            font-size: 12.8px;
            color: #444b50;
          }

          .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-pill,
          .mini-tag {
            display: inline-flex;
            align-items: center;
            padding: 6px 10px;
            border-radius: 999px;
            border: 1px solid #cfd6d8;
            background: #fbfbfb;
            color: #434a4f;
            font-size: 12px;
            font-weight: 500;
          }

          .entries {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            padding-bottom: 12px;
            border-bottom: 1px solid #e2e6e7;
          }

          .entry:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
          }

          .entry-head.compact {
            margin-bottom: 4px;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title-line {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            gap: 8px;
          }

          .entry-title {
            margin: 0;
            font-size: 14px;
            line-height: 1.25;
            color: #2d3134;
            font-weight: 700;
          }

          .entry-subtitle {
            font-size: 12.8px;
            color: #5f676c;
            font-weight: 600;
          }

          .entry-meta {
            margin-top: 2px;
            font-size: 12.2px;
            color: #6a7277;
          }

          .entry-date,
          .entry-link {
            flex: 0 0 auto;
            white-space: nowrap;
            font-size: 11.8px;
            color: #666e73;
            font-weight: 600;
            text-align: right;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 4px 0;
            font-size: 12.6px;
            color: #454c50;
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
            font-size: 12.8px;
            color: #444b50;
          }

          .language-name {
            font-weight: 700;
            color: #303437;
          }

          .language-sep {
            margin: 0 6px;
            color: #8a9195;
          }

          .language-level {
            color: #60686d;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${this.renderHeader(data)}
          ${this.renderProfile(data.summary, t)}
          ${this.renderSkills(data.skillsRaw, data.toolsRaw, t)}
          ${this.renderExperience(data.experience, t, lang)}
          ${this.renderProjects(data.projects, t)}
          ${this.renderAchievements(data.achievements, t)}
          ${this.renderEducation(data.education, t, lang)}
          ${this.renderCertifications(data.certifications, t, lang)}
          ${this.renderLanguages(data.languages, t)}
        </div>
      `;

      this.shadowRoot.innerHTML = html;
    }
  }

  if (!customElements.get('gqr-resume-quartz-v1')) {
    customElements.define('gqr-resume-quartz-v1', GQRResumeQuartzV1);
  }
})();