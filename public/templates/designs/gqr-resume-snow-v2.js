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
    if (Number.isNaN(date.getTime())) {
      return escapeHtml(value);
    }
    return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  function formatDateRange(startDate, endDate, lang, isCurrent, isCompleted, context) {
    const dict = I18N[lang] || I18N.en;
    const start = formatShortDate(startDate, lang);
    let end = '';

    if (context === 'education') {
      if (isCompleted === false) {
        end = dict.present;
      } else {
        end = formatShortDate(endDate, lang);
      }
    } else {
      if (isCurrent) {
        end = dict.present;
      } else {
        end = formatShortDate(endDate, lang);
      }
    }

    if (start && end) return `${start} — ${end}`;
    return start || end || '';
  }

  class GQRResumeSnowV2 extends HTMLElement {
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

      const fullName = [firstName, lastName].filter(Boolean).join(' ');
      const contactItems = [
        email ? `<span class="contact-pill">✉ ${escapeHtml(email)}</span>` : '',
        phone ? `<span class="contact-pill">☎ ${escapeHtml(phone)}</span>` : '',
        country ? `<span class="contact-pill">⚲ ${escapeHtml(country)}</span>` : '',
        linkedin ? `<span class="contact-pill">🔗 ${escapeHtml(linkedin)}</span>` : ''
      ].filter(Boolean).join('');

      if (!fullName && !profession && !contactItems) return '';

      return `
        <header class="header-card" data-section="header">
          <div class="header-top">
            <div class="name-wrap">
              ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
              ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
            </div>
          </div>
          ${contactItems ? `<div class="contact-row" data-section="contact">${contactItems}</div>` : ''}
        </header>
      `;
    }

    renderSectionTitle(title) {
      return `
        <div class="section-heading-wrap">
          <h2 class="section-heading">${escapeHtml(title)}</h2>
        </div>
      `;
    }

    renderProfile(data, t) {
      const summary = safeStr(data.summary);
      if (!summary) return '';
      return `
        <section class="section" data-section="profile">
          ${this.renderSectionTitle(t.profile)}
          <div class="section-body">
            <p class="profile-text">${escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(data, t) {
      const skills = safeArr(data.skillsRaw);
      const tools = safeArr(data.toolsRaw);
      const merged = Array.from(new Set(
        skills.concat(tools)
          .map(item => safeStr(item).trim())
          .filter(Boolean)
      ));

      if (!merged.length) return '';

      return `
        <section class="section" data-section="skills">
          ${this.renderSectionTitle(t.skills)}
          <div class="section-body">
            <div class="skill-grid">
              ${merged.map((item, index) => `
                <div class="skill-chip" data-entry-id="skill-${index}">
                  ${escapeHtml(item)}
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(data, t, lang) {
      const items = safeArr(data.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          ${this.renderSectionTitle(t.experience)}
          <div class="section-body timeline-list">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `experience-${index}`;
              const title = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);
              const dateRange = formatDateRange(item.startDate, item.endDate, lang, !!item.isCurrent, true, 'experience');
              const bullets = safeArr(item.achievements)
                .concat(safeArr(item.responsibilities))
                .map(v => safeStr(v).trim())
                .filter(Boolean);

              if (!title && !company && !location && !dateRange && !bullets.length) return '';

              return `
                <article class="timeline-item" data-entry-id="${escapeHtml(id)}">
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <div class="entry-head">
                      <div class="entry-main">
                        ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                        ${(company || location) ? `
                          <div class="entry-subtitle">
                            ${escapeHtml([company, location].filter(Boolean).join(' · '))}
                          </div>
                        ` : ''}
                      </div>
                      ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                    </div>
                    ${bullets.length ? `
                      <ul class="bullet-list">
                        ${bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
                      </ul>
                    ` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjects(data, t) {
      const items = safeArr(data.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          ${this.renderSectionTitle(t.projects)}
          <div class="section-body card-list">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `project-${index}`;
              const name = safeStr(item.name);
              const description = safeStr(item.description);
              const technologies = safeArr(item.technologies).map(v => safeStr(v).trim()).filter(Boolean);
              const url = safeStr(item.url);

              if (!name && !description && !technologies.length && !url) return '';

              return `
                <article class="content-card" data-entry-id="${escapeHtml(id)}">
                  <div class="card-head">
                    ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                    ${url ? `<div class="project-url">${escapeHtml(url)}</div>` : ''}
                  </div>
                  ${description ? `<p class="card-text">${escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="tech-row">
                      ${technologies.map(tech => `<span class="tech-chip">${escapeHtml(tech)}</span>`).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements(data, t) {
      const items = safeArr(data.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          ${this.renderSectionTitle(t.achievements)}
          <div class="section-body card-list">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `achievement-${index}`;
              const title = safeStr(item.title);
              const description = safeStr(item.description);
              const year = safeStr(item.year);

              if (!title && !description && !year) return '';

              return `
                <article class="content-card achievement-card" data-entry-id="${escapeHtml(id)}">
                  <div class="card-head">
                    ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                    ${year ? `<div class="entry-date">${escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<p class="card-text">${escapeHtml(description)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducation(data, t, lang) {
      const items = safeArr(data.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          ${this.renderSectionTitle(t.education)}
          <div class="section-body timeline-list">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `education-${index}`;
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);
              const dateRange = formatDateRange(item.startDate, item.endDate, lang, false, item.isCompleted, 'education');

              const titleLine = [degree, field].filter(Boolean).join(' — ');
              if (!titleLine && !institution && !gpa && !dateRange) return '';

              return `
                <article class="timeline-item" data-entry-id="${escapeHtml(id)}">
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <div class="entry-head">
                      <div class="entry-main">
                        ${titleLine ? `<h3 class="entry-title">${escapeHtml(titleLine)}</h3>` : ''}
                        ${institution ? `<div class="entry-subtitle">${escapeHtml(institution)}</div>` : ''}
                      </div>
                      ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                    </div>
                    ${gpa ? `<div class="meta-line">GPA: ${escapeHtml(gpa)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(data, t, lang) {
      const items = safeArr(data.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          ${this.renderSectionTitle(t.certifications)}
          <div class="section-body card-list">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `certification-${index}`;
              const name = safeStr(item.name);
              const issuer = safeStr(item.issuer);
              const date = formatShortDate(item.date, lang);

              if (!name && !issuer && !date) return '';

              return `
                <article class="content-card" data-entry-id="${escapeHtml(id)}">
                  <div class="card-head">
                    ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                    ${date ? `<div class="entry-date">${escapeHtml(date)}</div>` : ''}
                  </div>
                  ${issuer ? `<div class="entry-subtitle">${escapeHtml(issuer)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderLanguages(data, t, lang) {
      const items = safeArr(data.languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          ${this.renderSectionTitle(t.languages)}
          <div class="section-body language-list">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `language-${index}`;
              const name = safeStr(item.name);
              const level = safeStr(item.level).toLowerCase();
              const levelLabel = (t.levelMap && t.levelMap[level]) || level;

              if (!name && !levelLabel) return '';

              return `
                <div class="language-item" data-entry-id="${escapeHtml(id)}">
                  <span class="language-name">${escapeHtml(name)}</span>
                  <span class="language-sep">—</span>
                  <span class="language-level">${escapeHtml(levelLabel)}</span>
                </div>
              `;
            }).join('')}
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
            color: #1f2836;
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
            color: #243042;
            font-family: Arial, Helvetica, sans-serif;
            position: relative;
          }

          .page::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 14mm;
            background: linear-gradient(90deg, #8bc53f 0%, #9ed24e 40%, #7cb53a 100%);
          }

          .page::after {
            content: "";
            position: absolute;
            top: 14mm;
            right: 0;
            width: 0;
            height: 0;
            border-left: 32mm solid transparent;
            border-top: 8mm solid #2d374a;
            opacity: 0.98;
          }

          .header-card {
            background: #2f3a4f;
            color: #ffffff;
            padding: 18px 22px 16px;
            margin-top: 8mm;
            border-left: 6px solid #8bc53f;
            border-radius: 2px;
            box-shadow: 0 4px 16px rgba(31, 40, 54, 0.08);
          }

          .header-top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
          }

          .name-wrap {
            width: 100%;
          }

          .name {
            margin: 0;
            font-size: 31px;
            line-height: 1.05;
            font-weight: 700;
            letter-spacing: 0.8px;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 6px;
            font-size: 13px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #d7e1ef;
            position: relative;
            display: inline-block;
            padding-bottom: 7px;
          }

          .profession::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 88px;
            height: 2px;
            background: #8bc53f;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 10px;
            margin-top: 14px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 6px 10px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            background: rgba(255, 255, 255, 0.06);
            border-radius: 999px;
            font-size: 12px;
            line-height: 1.2;
            color: #f6f9fc;
          }

          .section {
            margin-top: 20px;
          }

          .section-heading-wrap {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 10px;
          }

          .section-heading-wrap::before {
            content: "";
            width: 10px;
            height: 10px;
            background: #8bc53f;
            transform: rotate(45deg);
            flex: 0 0 10px;
            margin-left: 1px;
          }

          .section-heading-wrap::after {
            content: "";
            height: 1px;
            background: #b8c7a0;
            flex: 1;
          }

          .section-heading {
            margin: 0;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 1.8px;
            text-transform: uppercase;
            color: #7fa93c;
            white-space: nowrap;
          }

          .section-body {
            padding-left: 22px;
          }

          .profile-text,
          .card-text,
          .bullet-list li,
          .meta-line,
          .entry-subtitle,
          .language-item {
            font-size: 12.5px;
            line-height: 1.6;
            color: #394556;
          }

          .profile-text,
          .card-text {
            margin: 0;
          }

          .skill-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-chip,
          .tech-chip {
            display: inline-flex;
            align-items: center;
            padding: 6px 10px;
            border-radius: 999px;
            font-size: 12px;
            line-height: 1.2;
          }

          .skill-chip {
            background: #f4f8ee;
            color: #2f3a4f;
            border: 1px solid #d8e5bf;
          }

          .timeline-list {
            position: relative;
          }

          .timeline-list::before {
            content: "";
            position: absolute;
            left: 6px;
            top: 0;
            bottom: 0;
            width: 1px;
            background: #c8d6af;
          }

          .timeline-item {
            position: relative;
            padding-left: 24px;
            margin-bottom: 16px;
          }

          .timeline-item:last-child {
            margin-bottom: 0;
          }

          .timeline-marker {
            position: absolute;
            left: 0;
            top: 7px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #8bc53f;
            border: 2px solid #ffffff;
            box-shadow: 0 0 0 1px #8bc53f;
          }

          .timeline-content,
          .content-card {
            background: #ffffff;
          }

          .entry-head,
          .card-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-size: 14px;
            line-height: 1.35;
            color: #263246;
            font-weight: 700;
          }

          .entry-subtitle {
            margin-top: 2px;
            color: #556174;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 11.5px;
            color: #6d7b8f;
            white-space: nowrap;
            text-transform: uppercase;
            letter-spacing: 0.6px;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 3px 0;
          }

          .card-list {
            display: grid;
            gap: 12px;
          }

          .content-card {
            padding: 12px 14px;
            border: 1px solid #e1e8d2;
            border-left: 4px solid #8bc53f;
            background: linear-gradient(180deg, #ffffff 0%, #fbfcf8 100%);
          }

          .achievement-card {
            border-left-color: #6fa336;
          }

          .card-text {
            margin-top: 6px;
          }

          .tech-row {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            margin-top: 9px;
          }

          .tech-chip {
            background: #2f3a4f;
            color: #ffffff;
            border: 1px solid #2f3a4f;
          }

          .project-url {
            font-size: 11.5px;
            color: #6d7b8f;
            text-align: right;
            word-break: break-word;
          }

          .meta-line {
            margin-top: 6px;
          }

          .language-list {
            display: grid;
            gap: 8px;
          }

          .language-item {
            display: flex;
            align-items: baseline;
            flex-wrap: wrap;
            gap: 6px;
            padding: 8px 0;
            border-bottom: 1px solid #edf2e3;
          }

          .language-item:last-child {
            border-bottom: none;
          }

          .language-name {
            font-weight: 700;
            color: #263246;
          }

          .language-sep {
            color: #8bc53f;
            font-weight: 700;
          }

          .language-level {
            color: #556174;
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
          ${this.renderProfile(data, t)}
          ${this.renderSkills(data, t)}
          ${this.renderExperience(data, t, lang)}
          ${this.renderProjects(data, t)}
          ${this.renderAchievements(data, t)}
          ${this.renderEducation(data, t, lang)}
          ${this.renderCertifications(data, t, lang)}
          ${this.renderLanguages(data, t, lang)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-snow-v2')) {
    customElements.define('gqr-resume-snow-v2', GQRResumeSnowV2);
  }
})();