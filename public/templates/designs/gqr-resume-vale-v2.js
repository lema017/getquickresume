(function() {
  'use strict';

  const I18N = {
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
    },
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

    return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  function formatDateRange(startDate, endDate, isOngoing, lang, presentLabel) {
    const start = formatShortDate(startDate, lang);
    const end = isOngoing ? presentLabel : formatShortDate(endDate, lang);

    if (start && end) return start + ' — ' + end;
    if (start) return start;
    if (end) return end;
    return '';
  }

  class GQRResumeValeV2 extends HTMLElement {
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
      const attrLang = safeStr(this.getAttribute('language')).toLowerCase();
      const dataLang = safeStr(this._data && this._data.language).toLowerCase();
      const lang = attrLang || dataLang || 'en';
      return lang === 'es' ? 'es' : 'en';
    }

    renderHeader(data) {
      const firstName = safeStr(data.firstName);
      const lastName = safeStr(data.lastName);
      const profession = safeStr(data.profession);
      const email = safeStr(data.email);
      const phone = safeStr(data.phone);
      const country = safeStr(data.country);
      const linkedin = safeStr(data.linkedin);

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      const contactItems = [
        email ? '✉ ' + escapeHtml(email) : '',
        phone ? '☎ ' + escapeHtml(phone) : '',
        country ? '⚲ ' + escapeHtml(country) : '',
        linkedin ? '🔗 ' + escapeHtml(linkedin) : ''
      ].filter(Boolean);

      if (!fullName && !profession && contactItems.length === 0) return '';

      return `
        <section class="header" data-section="header">
          <div class="name-block">
            ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
          </div>
          ${contactItems.length ? `
            <div class="contact" data-section="contact">
              ${contactItems.map(function(item, index) {
                return `<div class="contact-item" data-entry-id="contact-${index}">${item}</div>`;
              }).join('')}
            </div>
          ` : ''}
        </section>
      `;
    }

    renderProfile(summary, t) {
      if (!safeStr(summary).trim()) return '';
      return `
        <section class="section" data-section="profile">
          <h2 class="section-title">${escapeHtml(t.profile)}</h2>
          <div class="section-body">
            <p class="summary">${escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(data, t) {
      const skills = safeArr(data.skillsRaw);
      const tools = safeArr(data.toolsRaw);
      const combined = Array.from(new Set(
        skills.concat(tools)
          .map(function(item) { return safeStr(item).trim(); })
          .filter(Boolean)
      ));

      if (!combined.length) return '';

      return `
        <section class="section" data-section="skills">
          <h2 class="section-title">${escapeHtml(t.skills)}</h2>
          <div class="section-body">
            <div class="pill-grid">
              ${combined.map(function(skill, index) {
                return `<span class="pill" data-entry-id="skill-${index}">${escapeHtml(skill)}</span>`;
              }).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(items, t, lang) {
      const list = safeArr(items).filter(Boolean);
      if (!list.length) return '';

      const presentLabel = t.present;

      return `
        <section class="section" data-section="experience">
          <h2 class="section-title">${escapeHtml(t.experience)}</h2>
          <div class="section-body">
            ${list.map(function(item, index) {
              const id = safeStr(item.id) || ('experience-' + index);
              const title = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);
              const dateRange = formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang, presentLabel);
              const bullets = safeArr(item.achievements).concat(safeArr(item.responsibilities))
                .map(function(b) { return safeStr(b).trim(); })
                .filter(Boolean);

              if (!title && !company && !location && !dateRange && !bullets.length) return '';

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-meta">
                          ${company ? `<span>${escapeHtml(company)}</span>` : ''}
                          ${(company && location) ? `<span class="sep">•</span>` : ''}
                          ${location ? `<span>${escapeHtml(location)}</span>` : ''}
                        </div>
                      ` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${bullets.length ? `
                    <ul class="bullet-list">
                      ${bullets.map(function(bullet) {
                        return `<li>${escapeHtml(bullet)}</li>`;
                      }).join('')}
                    </ul>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjects(items, t) {
      const list = safeArr(items).filter(Boolean);
      if (!list.length) return '';

      return `
        <section class="section" data-section="projects">
          <h2 class="section-title">${escapeHtml(t.projects)}</h2>
          <div class="section-body">
            ${list.map(function(item, index) {
              const id = safeStr(item.id) || ('project-' + index);
              const name = safeStr(item.name);
              const description = safeStr(item.description);
              const technologies = safeArr(item.technologies).map(function(x) { return safeStr(x).trim(); }).filter(Boolean);
              const url = safeStr(item.url);

              if (!name && !description && !technologies.length && !url) return '';

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head stacked">
                    ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                    ${url ? `<div class="entry-link">${escapeHtml(url)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="tag-line">
                      ${technologies.map(function(tech) {
                        return `<span class="mini-tag">${escapeHtml(tech)}</span>`;
                      }).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements(items, t) {
      const list = safeArr(items).filter(Boolean);
      if (!list.length) return '';

      return `
        <section class="section" data-section="achievements">
          <h2 class="section-title">${escapeHtml(t.achievements)}</h2>
          <div class="section-body">
            ${list.map(function(item, index) {
              const id = safeStr(item.id) || ('achievement-' + index);
              const title = safeStr(item.title);
              const description = safeStr(item.description);
              const year = safeStr(item.year);

              if (!title && !description && !year) return '';

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
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

    renderEducation(items, t, lang) {
      const list = safeArr(items).filter(Boolean);
      if (!list.length) return '';

      const presentLabel = t.present;

      return `
        <section class="section" data-section="education">
          <h2 class="section-title">${escapeHtml(t.education)}</h2>
          <div class="section-body">
            ${list.map(function(item, index) {
              const id = safeStr(item.id) || ('education-' + index);
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);
              const isOngoing = item.isCompleted === false;
              const dateRange = formatDateRange(item.startDate, item.endDate, isOngoing, lang, presentLabel);

              if (!degree && !field && !institution && !gpa && !dateRange) return '';

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
                      ${(degree || field) ? `
                        <h3 class="entry-title">
                          ${escapeHtml([degree, field].filter(Boolean).join(degree && field ? ' — ' : ''))}
                        </h3>
                      ` : ''}
                      ${institution ? `<div class="entry-meta"><span>${escapeHtml(institution)}</span></div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${gpa ? `<p class="entry-text">GPA: ${escapeHtml(gpa)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(items, t, lang) {
      const list = safeArr(items).filter(Boolean);
      if (!list.length) return '';

      return `
        <section class="section" data-section="certifications">
          <h2 class="section-title">${escapeHtml(t.certifications)}</h2>
          <div class="section-body">
            ${list.map(function(item, index) {
              const id = safeStr(item.id) || ('certification-' + index);
              const name = safeStr(item.name);
              const issuer = safeStr(item.issuer);
              const date = item.date ? formatShortDate(item.date, lang) : '';

              if (!name && !issuer && !date) return '';

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
                      ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                      ${issuer ? `<div class="entry-meta"><span>${escapeHtml(issuer)}</span></div>` : ''}
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

    renderLanguages(items, t) {
      const list = safeArr(items).filter(Boolean);
      if (!list.length) return '';

      return `
        <section class="section" data-section="languages">
          <h2 class="section-title">${escapeHtml(t.languages)}</h2>
          <div class="section-body">
            <div class="language-list">
              ${list.map(function(item, index) {
                const id = safeStr(item.id) || ('language-' + index);
                const name = safeStr(item.name);
                const levelKey = safeStr(item.level).toLowerCase();
                const level = t.levelMap[levelKey] || safeStr(item.level);

                if (!name && !level) return '';

                return `
                  <div class="language-item" data-entry-id="${escapeHtml(id)}">
                    <span class="language-name">${escapeHtml(name)}</span>
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
      const t = I18N[lang] || I18N.en;

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #262626;
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
            padding: 16mm 14mm 16mm 14mm;
            font-family: Arial, Helvetica, sans-serif;
            color: #262626;
            line-height: 1.42;
          }

          .header {
            border-top: 4px solid #4b4b4b;
            border-bottom: 1px solid #bdb7b0;
            padding: 14px 0 16px;
            margin-bottom: 18px;
          }

          .name-block {
            margin-bottom: 10px;
          }

          .name {
            margin: 0;
            font-size: 34px;
            line-height: 1.02;
            font-weight: 800;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            color: #2b2b2b;
          }

          .profession {
            margin-top: 8px;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.4px;
            color: #7a736c;
          }

          .contact {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 16px;
          }

          .contact-item {
            font-size: 11.5px;
            color: #4d4d4d;
            white-space: nowrap;
          }

          .section {
            margin-bottom: 16px;
          }

          .section-title {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 0 0 9px;
            font-size: 15px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.7px;
            color: #2f2f2f;
          }

          .section-title::after {
            content: "";
            flex: 1;
            height: 1px;
            background: #c8c1b8;
            transform: translateY(1px);
          }

          .section-body {
            padding-left: 0;
          }

          .summary,
          .entry-text {
            margin: 0;
            font-size: 12px;
            color: #353535;
          }

          .pill-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
          }

          .pill {
            display: inline-flex;
            align-items: center;
            min-height: 24px;
            padding: 4px 10px;
            border: 1px solid #bdb7b0;
            border-radius: 999px;
            background: #f6f4f1;
            color: #353535;
            font-size: 11.5px;
            font-weight: 600;
          }

          .entry {
            padding: 0 0 12px;
            margin-bottom: 12px;
            border-bottom: 1px solid #ece7e1;
          }

          .entry:last-child {
            margin-bottom: 0;
            border-bottom: none;
            padding-bottom: 0;
          }

          .entry.compact {
            padding-bottom: 10px;
            margin-bottom: 10px;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 4px;
          }

          .entry-head.stacked {
            margin-bottom: 6px;
          }

          .entry-title-wrap {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-size: 13px;
            line-height: 1.25;
            font-weight: 800;
            color: #2d2d2d;
          }

          .entry-meta {
            margin-top: 3px;
            font-size: 11.5px;
            color: #6a6a6a;
          }

          .sep {
            margin: 0 6px;
          }

          .entry-date {
            flex: 0 0 auto;
            white-space: nowrap;
            font-size: 11px;
            font-weight: 700;
            color: #7a736c;
            text-transform: uppercase;
            letter-spacing: 0.4px;
          }

          .entry-link {
            font-size: 11px;
            color: #6a6a6a;
            word-break: break-word;
          }

          .bullet-list {
            margin: 7px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 0 0 4px;
            font-size: 11.8px;
            color: #343434;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .tag-line {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 7px;
          }

          .mini-tag {
            display: inline-block;
            padding: 3px 8px;
            background: #f2efeb;
            border: 1px solid #d8d1c8;
            border-radius: 3px;
            font-size: 10.8px;
            color: #4b4b4b;
          }

          .language-list {
            display: grid;
            grid-template-columns: 1fr;
            gap: 7px;
          }

          .language-item {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 12px;
            padding-bottom: 6px;
            border-bottom: 1px dashed #e2dbd3;
          }

          .language-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .language-name {
            font-size: 12px;
            font-weight: 700;
            color: #2f2f2f;
          }

          .language-level {
            font-size: 11.5px;
            color: #6c655e;
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
          ${this.renderSkills(data, t)}
          ${this.renderExperience(data.experience, t, lang)}
          ${this.renderProjects(data.projects, t)}
          ${this.renderAchievements(data.achievements, t)}
          ${this.renderEducation(data.education, t, lang)}
          ${this.renderCertifications(data.certifications, t, lang)}
          ${this.renderLanguages(data.languages, t)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-vale-v2')) {
    customElements.define('gqr-resume-vale-v2', GQRResumeValeV2);
  }
})();