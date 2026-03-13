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
    if (isNaN(date.getTime())) return escapeHtml(safeStr(value));
    return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  function formatDateRange(startDate, endDate, isOngoing, lang, presentLabel) {
    const start = formatShortDate(startDate, lang);
    const end = isOngoing ? presentLabel : formatShortDate(endDate, lang);
    if (start && end) return start + ' — ' + end;
    return start || end || '';
  }

  class GQRResumeBeamV1 extends HTMLElement {
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

    attributeChangedCallback() {
      this.render();
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
        d.email ? `✉ ${escapeHtml(d.email)}` : '',
        d.phone ? `☎ ${escapeHtml(d.phone)}` : '',
        d.country ? `⚲ ${escapeHtml(d.country)}` : '',
        d.linkedin ? `🔗 ${escapeHtml(d.linkedin)}` : ''
      ].filter(Boolean);

      if (!fullName && !profession && contacts.length === 0) return '';

      return `
        <section class="header" data-section="header">
          <div class="header-accent"></div>
          <div class="name-wrap">
            ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
          </div>
          ${contacts.length ? `
            <div class="contact-row" data-section="contact">
              ${contacts.map((item, idx) => `<span class="contact-pill" data-entry-id="contact-${idx}">${item}</span>`).join('')}
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

    renderSkills(skillsRaw, toolsRaw, t) {
      const merged = [...new Set(
        safeArr(skillsRaw)
          .concat(safeArr(toolsRaw))
          .map(item => safeStr(item).trim())
          .filter(Boolean)
      )];

      if (!merged.length) return '';

      return `
        <section class="section" data-section="skills">
          <h2 class="section-title">${escapeHtml(t.skills)}</h2>
          <div class="section-body">
            <div class="chips">
              ${merged.map((skill, idx) => `
                <span class="chip" data-entry-id="skill-${idx}">${escapeHtml(skill)}</span>
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
          <div class="section-body stack">
            ${items.map((item, idx) => {
              const id = safeStr(item.id) || `experience-${idx}`;
              const title = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);
              const range = formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang, t.present);
              const bullets = safeArr(item.achievements).concat(safeArr(item.responsibilities))
                .map(v => safeStr(v).trim())
                .filter(Boolean);

              if (!title && !company && !location && !range && !bullets.length) return '';

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${escapeHtml([company, location].filter(Boolean).join(' · '))}
                        </div>
                      ` : ''}
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

    renderProjects(projects, t) {
      const items = safeArr(projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          <h2 class="section-title">${escapeHtml(t.projects)}</h2>
          <div class="section-body stack">
            ${items.map((item, idx) => {
              const id = safeStr(item.id) || `project-${idx}`;
              const name = safeStr(item.name);
              const description = safeStr(item.description);
              const technologies = safeArr(item.technologies).map(v => safeStr(v).trim()).filter(Boolean);
              const url = safeStr(item.url);

              if (!name && !description && !technologies.length && !url) return '';

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                      ${url ? `<div class="entry-link">${escapeHtml(url)}</div>` : ''}
                    </div>
                  </div>
                  ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="chips chips-tight">
                      ${technologies.map((tech, techIdx) => `
                        <span class="chip subtle" data-entry-id="${escapeHtml(id)}-tech-${techIdx}">${escapeHtml(tech)}</span>
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
          <div class="section-body stack">
            ${items.map((item, idx) => {
              const id = safeStr(item.id) || `achievement-${idx}`;
              const title = safeStr(item.title);
              const description = safeStr(item.description);
              const year = safeStr(item.year);

              if (!title && !description && !year) return '';

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
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

    renderEducation(education, t, lang) {
      const items = safeArr(education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          <h2 class="section-title">${escapeHtml(t.education)}</h2>
          <div class="section-body stack">
            ${items.map((item, idx) => {
              const id = safeStr(item.id) || `education-${idx}`;
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);
              const range = formatDateRange(
                item.startDate,
                item.endDate,
                item.isCompleted === false,
                lang,
                t.present
              );

              const titleParts = [degree, field].filter(Boolean);

              if (!titleParts.length && !institution && !gpa && !range) return '';

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${titleParts.length ? `<h3 class="entry-title">${escapeHtml(titleParts.join(' — '))}</h3>` : ''}
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

    renderCertifications(certifications, t, lang) {
      const items = safeArr(certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          <h2 class="section-title">${escapeHtml(t.certifications)}</h2>
          <div class="section-body stack">
            ${items.map((item, idx) => {
              const id = safeStr(item.id) || `certification-${idx}`;
              const name = safeStr(item.name);
              const issuer = safeStr(item.issuer);
              const date = formatShortDate(item.date, lang);

              if (!name && !issuer && !date) return '';

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
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

    renderLanguages(languages, t) {
      const items = safeArr(languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          <h2 class="section-title">${escapeHtml(t.languages)}</h2>
          <div class="section-body">
            <div class="language-list">
              ${items.map((item, idx) => {
                const id = safeStr(item.id) || `language-${idx}`;
                const name = safeStr(item.name);
                const levelKey = safeStr(item.level).toLowerCase();
                const level = t.levelMap[levelKey] || levelKey;

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
      const d = this._data || {};
      const lang = this.getLanguage();
      const t = I18N[lang] || I18N.en;

      this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

          :host {
            display: block;
            color: #1a1a1a;
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
            font-family: 'Inter', Arial, Helvetica, sans-serif;
            color: #1b1b1b;
            position: relative;
          }

          .page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 10mm;
            background: #111111;
          }

          .header {
            background: linear-gradient(180deg, #171717 0%, #111111 100%);
            color: #ffffff;
            padding: 18px 22px 16px;
            border-radius: 10px;
            margin-top: 4mm;
            margin-bottom: 18px;
            position: relative;
            overflow: hidden;
          }

          .header-accent {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 6px;
            background: #e0b100;
          }

          .name-wrap {
            padding-top: 6px;
          }

          .name {
            margin: 0;
            font-size: 30px;
            line-height: 1.08;
            font-weight: 800;
            letter-spacing: -0.02em;
          }

          .profession {
            display: inline-block;
            margin-top: 8px;
            background: #e0b100;
            color: #111111;
            font-size: 12px;
            line-height: 1.2;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            padding: 6px 10px;
            border-radius: 3px;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 14px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            min-height: 28px;
            padding: 6px 10px;
            border: 1px solid rgba(255,255,255,0.16);
            border-radius: 999px;
            background: rgba(255,255,255,0.06);
            color: #f4f4f4;
            font-size: 11.5px;
            line-height: 1.25;
            word-break: break-word;
          }

          .section {
            margin-bottom: 18px;
          }

          .section-title {
            margin: 0 0 10px;
            font-size: 15px;
            line-height: 1.2;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #151515;
            position: relative;
            padding-bottom: 8px;
            border-bottom: 1px solid #d7d7d7;
          }

          .section-title::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -1px;
            width: 44px;
            height: 3px;
            background: #e0b100;
          }

          .section-body {
            font-size: 13px;
            line-height: 1.58;
            color: #303030;
          }

          .summary {
            margin: 0;
            text-align: left;
          }

          .chips {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .chips-tight {
            margin-top: 8px;
          }

          .chip {
            display: inline-flex;
            align-items: center;
            padding: 6px 10px;
            border-radius: 999px;
            background: #131313;
            color: #ffffff;
            font-size: 11.5px;
            line-height: 1.2;
            font-weight: 600;
          }

          .chip.subtle {
            background: #f3f3f3;
            color: #222222;
            border: 1px solid #e3e3e3;
            font-weight: 500;
          }

          .stack {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            padding: 0 0 12px;
            border-bottom: 1px solid #ededed;
          }

          .entry:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .entry.compact {
            padding-bottom: 10px;
          }

          .entry-head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-size: 15px;
            line-height: 1.28;
            font-weight: 700;
            color: #171717;
          }

          .entry-subtitle {
            margin-top: 3px;
            font-size: 12.5px;
            line-height: 1.4;
            color: #666666;
            font-weight: 500;
          }

          .entry-date {
            flex: 0 0 auto;
            white-space: nowrap;
            font-size: 11.5px;
            line-height: 1.2;
            font-weight: 700;
            color: #111111;
            background: #f5e9ad;
            border: 1px solid #ead778;
            padding: 5px 8px;
            border-radius: 999px;
          }

          .entry-text {
            margin: 7px 0 0;
            font-size: 12.8px;
            line-height: 1.55;
            color: #333333;
          }

          .entry-link {
            margin-top: 4px;
            font-size: 12px;
            line-height: 1.35;
            color: #8b6d00;
            word-break: break-all;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 0 0 4px;
          }

          .bullet-list li::marker {
            color: #d1a400;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .language-item {
            display: flex;
            align-items: baseline;
            flex-wrap: wrap;
            gap: 6px;
            padding: 8px 0;
            border-bottom: 1px solid #ededed;
          }

          .language-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .language-name {
            font-weight: 700;
            color: #171717;
          }

          .language-sep,
          .language-level {
            color: #666666;
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
          ${this.renderSkills(d.skillsRaw, d.toolsRaw, t)}
          ${this.renderExperience(d.experience, t, lang)}
          ${this.renderProjects(d.projects, t)}
          ${this.renderAchievements(d.achievements, t)}
          ${this.renderEducation(d.education, t, lang)}
          ${this.renderCertifications(d.certifications, t, lang)}
          ${this.renderLanguages(d.languages, t)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-beam-v1')) {
    customElements.define('gqr-resume-beam-v1', GQRResumeBeamV1);
  }
})();