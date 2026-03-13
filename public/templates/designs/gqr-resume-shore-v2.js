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
      contact: 'Contacto',
      technologies: 'Tecnologías',
      gpa: 'Promedio',
      levelMap: {
        basic: 'Básico',
        intermediate: 'Intermedio',
        advanced: 'Avanzado',
        native: 'Nativo'
      }
    },
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
      contact: 'Contact',
      technologies: 'Technologies',
      gpa: 'GPA',
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

  function shortDate(value, lang) {
    if (!value) return '';
    const d = new Date(value);
    if (isNaN(d.getTime())) return escapeHtml(safeStr(value));
    return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      month: 'short',
      year: 'numeric'
    }).format(d);
  }

  function formatDateRange(startDate, endDate, lang, isCurrentLike) {
    const start = shortDate(startDate, lang);
    const end = isCurrentLike ? I18N[lang].present : shortDate(endDate, lang);
    if (start && end) return `${start} — ${end}`;
    return start || end || '';
  }

  class GQRResumeShoreV2 extends HTMLElement {
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

    renderHeader(t) {
      const d = this._data || {};
      const firstName = safeStr(d.firstName);
      const lastName = safeStr(d.lastName);
      const profession = safeStr(d.profession);
      const email = safeStr(d.email);
      const phone = safeStr(d.phone);
      const country = safeStr(d.country);
      const linkedin = safeStr(d.linkedin);

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      const contactItems = [
        email ? `✉ ${escapeHtml(email)}` : '',
        phone ? `☎ ${escapeHtml(phone)}` : '',
        country ? `⚲ ${escapeHtml(country)}` : '',
        linkedin ? `🔗 ${escapeHtml(linkedin)}` : ''
      ].filter(Boolean);

      const hasAny = fullName || profession || contactItems.length;

      if (!hasAny) return '';

      return `
        <section class="header" data-section="header">
          <div class="header-top">
            ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
          </div>
          ${
            contactItems.length
              ? `
                <div class="contact-wrap" data-section="contact" aria-label="${escapeHtml(t.contact)}">
                  ${contactItems.map((item, idx) => `<span class="contact-pill" data-entry-id="contact-${idx}">${item}</span>`).join('')}
                </div>
              `
              : ''
          }
        </section>
      `;
    }

    renderProfile(t) {
      const summary = safeStr(this._data.summary).trim();
      if (!summary) return '';
      return `
        <section class="section" data-section="profile">
          <h2 class="section-title">${escapeHtml(t.profile)}</h2>
          <div class="section-body prose">
            <p>${escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(t) {
      const skills = safeArr(this._data.skillsRaw).map(safeStr);
      const tools = safeArr(this._data.toolsRaw).map(safeStr);
      const combined = [...skills, ...tools]
        .map(v => v.trim())
        .filter(Boolean)
        .filter((v, i, arr) => arr.findIndex(x => x.toLowerCase() === v.toLowerCase()) === i);

      if (!combined.length) return '';

      return `
        <section class="section" data-section="skills">
          <h2 class="section-title">${escapeHtml(t.skills)}</h2>
          <div class="section-body">
            <div class="chip-list">
              ${combined
                .map((item, idx) => `<span class="chip" data-entry-id="skill-${idx}">${escapeHtml(item)}</span>`)
                .join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(t, lang) {
      const list = safeArr(this._data.experience).filter(Boolean);
      if (!list.length) return '';

      return `
        <section class="section" data-section="experience">
          <h2 class="section-title">${escapeHtml(t.experience)}</h2>
          <div class="section-body stack">
            ${list.map((item, idx) => {
              const id = safeStr(item.id) || `experience-${idx}`;
              const title = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);
              const range = formatDateRange(item.startDate, item.endDate, lang, !!item.isCurrent);
              const bullets = [...safeArr(item.achievements), ...safeArr(item.responsibilities)]
                .map(safeStr)
                .map(s => s.trim())
                .filter(Boolean);

              const metaParts = [company, location].filter(Boolean);

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                      ${metaParts.length ? `<div class="entry-subtitle">${escapeHtml(metaParts.join(' · '))}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${escapeHtml(range)}</div>` : ''}
                  </div>
                  ${
                    bullets.length
                      ? `<ul class="bullet-list">
                          ${bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
                        </ul>`
                      : ''
                  }
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjects(t) {
      const list = safeArr(this._data.projects).filter(Boolean);
      if (!list.length) return '';

      return `
        <section class="section" data-section="projects">
          <h2 class="section-title">${escapeHtml(t.projects)}</h2>
          <div class="section-body stack">
            ${list.map((item, idx) => {
              const id = safeStr(item.id) || `project-${idx}`;
              const name = safeStr(item.name);
              const description = safeStr(item.description);
              const technologies = safeArr(item.technologies).map(safeStr).map(s => s.trim()).filter(Boolean);
              const url = safeStr(item.url);

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
                      ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                      ${url ? `<div class="entry-link"><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a></div>` : ''}
                    </div>
                  </div>
                  ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                  ${
                    technologies.length
                      ? `
                        <div class="tech-row">
                          <span class="tech-label">${escapeHtml(t.technologies)}:</span>
                          <span class="tech-values">${technologies.map(escapeHtml).join(', ')}</span>
                        </div>
                      `
                      : ''
                  }
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements(t) {
      const list = safeArr(this._data.achievements).filter(Boolean);
      if (!list.length) return '';

      return `
        <section class="section" data-section="achievements">
          <h2 class="section-title">${escapeHtml(t.achievements)}</h2>
          <div class="section-body stack">
            ${list.map((item, idx) => {
              const id = safeStr(item.id) || `achievement-${idx}`;
              const title = safeStr(item.title);
              const description = safeStr(item.description);
              const year = safeStr(item.year);

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
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

    renderEducation(t, lang) {
      const list = safeArr(this._data.education).filter(Boolean);
      if (!list.length) return '';

      return `
        <section class="section" data-section="education">
          <h2 class="section-title">${escapeHtml(t.education)}</h2>
          <div class="section-body stack">
            ${list.map((item, idx) => {
              const id = safeStr(item.id) || `education-${idx}`;
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);
              const isCurrentLike = item.isCompleted === false;
              const range = formatDateRange(item.startDate, item.endDate, lang, isCurrentLike);

              const title = [degree, field].filter(Boolean).join(' — ');

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                      ${institution ? `<div class="entry-subtitle">${escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${escapeHtml(range)}</div>` : ''}
                  </div>
                  ${gpa ? `<p class="entry-text">${escapeHtml(t.gpa)}: ${escapeHtml(gpa)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(t, lang) {
      const list = safeArr(this._data.certifications).filter(Boolean);
      if (!list.length) return '';

      return `
        <section class="section" data-section="certifications">
          <h2 class="section-title">${escapeHtml(t.certifications)}</h2>
          <div class="section-body stack">
            ${list.map((item, idx) => {
              const id = safeStr(item.id) || `certification-${idx}`;
              const name = safeStr(item.name);
              const issuer = safeStr(item.issuer);
              const date = item.date ? shortDate(item.date, lang) : '';

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
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

    renderLanguages(t) {
      const list = safeArr(this._data.languages).filter(Boolean);
      if (!list.length) return '';

      return `
        <section class="section" data-section="languages">
          <h2 class="section-title">${escapeHtml(t.languages)}</h2>
          <div class="section-body">
            <div class="language-list">
              ${list.map((item, idx) => {
                const id = safeStr(item.id) || `language-${idx}`;
                const name = safeStr(item.name);
                const levelKey = safeStr(item.level).toLowerCase();
                const level = t.levelMap[levelKey] || safeStr(item.level);

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
      const lang = this.getLanguage();
      const t = I18N[lang];

      const html = `
        <style>
          :host {
            display: block;
            color: #2e2c2b;
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
            padding: 36px 34px 38px;
            background:
              linear-gradient(180deg, #f4efe7 0, #f4efe7 112px, #fffdf9 112px, #fffdf9 100%);
            font-family: Georgia, "Times New Roman", serif;
            color: #2f2c2a;
          }

          .header {
            margin-bottom: 22px;
            padding: 0 0 18px;
            border-bottom: 2px solid #c8b7a1;
          }

          .header-top {
            margin-bottom: 12px;
          }

          .name {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 34px;
            line-height: 1.02;
            letter-spacing: 1.2px;
            font-weight: 800;
            text-transform: uppercase;
            color: #3c3a39;
          }

          .profession {
            margin-top: 8px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
            letter-spacing: 2.3px;
            text-transform: uppercase;
            color: #8c735f;
            font-weight: 700;
          }

          .contact-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 10px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 6px 10px;
            border: 1px solid #d8cab8;
            border-radius: 999px;
            background: #fffaf3;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11.5px;
            line-height: 1.25;
            color: #4a4642;
          }

          .section {
            margin-top: 18px;
          }

          .section-title {
            position: relative;
            margin: 0 0 10px;
            padding-bottom: 7px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
            line-height: 1.2;
            font-weight: 800;
            letter-spacing: 1.8px;
            text-transform: uppercase;
            color: #3f3b38;
            border-bottom: 1px solid #d7ccbf;
          }

          .section-title::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -1px;
            width: 56px;
            height: 3px;
            background: #8f735d;
          }

          .section-body {
            font-size: 13px;
            line-height: 1.55;
          }

          .prose p,
          .entry-text {
            margin: 0;
          }

          .stack {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            padding: 0 0 10px;
            border-bottom: 1px solid #eee4d8;
          }

          .entry:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .entry.compact {
            padding-bottom: 8px;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 5px;
          }

          .entry-head-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
            line-height: 1.3;
            font-weight: 700;
            color: #2f2b28;
          }

          .entry-subtitle {
            margin-top: 2px;
            font-size: 12.5px;
            line-height: 1.4;
            color: #6a6158;
          }

          .entry-date {
            flex: 0 0 auto;
            white-space: nowrap;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11.5px;
            line-height: 1.3;
            color: #8a6f5a;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding-top: 1px;
          }

          .bullet-list {
            margin: 6px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 3px 0;
          }

          .chip-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .chip {
            display: inline-block;
            padding: 6px 10px;
            border: 1px solid #d6c7b7;
            background: #fbf6ef;
            border-radius: 4px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11.5px;
            line-height: 1.2;
            color: #47413d;
          }

          .tech-row {
            margin-top: 6px;
            font-size: 12px;
            color: #5d554d;
          }

          .tech-label {
            font-family: Arial, Helvetica, sans-serif;
            font-weight: 700;
            color: #4b433d;
          }

          .entry-link a {
            color: #7d624f;
            text-decoration: none;
            word-break: break-word;
          }

          .entry-link a:hover {
            text-decoration: underline;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .language-item {
            display: flex;
            align-items: baseline;
            gap: 6px;
            padding-bottom: 6px;
            border-bottom: 1px dotted #ddd0c1;
          }

          .language-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .language-name {
            font-family: Arial, Helvetica, sans-serif;
            font-weight: 700;
            color: #332f2c;
          }

          .language-sep,
          .language-level {
            color: #6b6259;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${this.renderHeader(t)}
          ${this.renderProfile(t)}
          ${this.renderSkills(t)}
          ${this.renderExperience(t, lang)}
          ${this.renderProjects(t)}
          ${this.renderAchievements(t)}
          ${this.renderEducation(t, lang)}
          ${this.renderCertifications(t, lang)}
          ${this.renderLanguages(t)}
        </div>
      `;

      this.shadowRoot.innerHTML = html;
    }
  }

  if (!customElements.get('gqr-resume-shore-v2')) {
    customElements.define('gqr-resume-shore-v2', GQRResumeShoreV2);
  }
})();