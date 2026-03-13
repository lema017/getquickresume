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
    const locale = lang === 'es' ? 'es-ES' : 'en-US';
    const date = new Date(value);
    if (isNaN(date.getTime())) return escapeHtml(value);
    return new Intl.DateTimeFormat(locale, {
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  function formatDateRange(startDate, endDate, lang, isCurrentLike) {
    const dict = I18N[lang] || I18N.en;
    const start = formatShortDate(startDate, lang);
    const end = isCurrentLike ? dict.present : formatShortDate(endDate, lang);
    if (start && end) return start + ' — ' + end;
    return start || end || '';
  }

  class GQRResumePulseV1 extends HTMLElement {
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
      const contacts = [
        email ? `<span class="contact-pill">✉ ${escapeHtml(email)}</span>` : '',
        phone ? `<span class="contact-pill">☎ ${escapeHtml(phone)}</span>` : '',
        country ? `<span class="contact-pill">⚲ ${escapeHtml(country)}</span>` : '',
        linkedin ? `<span class="contact-pill">🔗 ${escapeHtml(linkedin)}</span>` : ''
      ].filter(Boolean).join('');

      if (!fullName && !profession && !contacts) return '';

      return `
        <section class="header" data-section="header">
          <div class="header-inner">
            ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
            ${contacts ? `<div class="contact-row" data-section="contact">${contacts}</div>` : ''}
          </div>
        </section>
      `;
    }

    renderProfile(data, lang) {
      const summary = safeStr(data.summary);
      if (!summary) return '';
      return `
        <section class="section" data-section="profile">
          <div class="section-title">${escapeHtml(I18N[lang].profile)}</div>
          <div class="profile-text">${escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderSkills(data, lang) {
      const skills = safeArr(data.skillsRaw);
      const tools = safeArr(data.toolsRaw);
      const merged = [...skills, ...tools]
        .map(safeStr)
        .map(s => s.trim())
        .filter(Boolean)
        .filter((item, index, arr) => arr.findIndex(v => v.toLowerCase() === item.toLowerCase()) === index);

      if (!merged.length) return '';

      return `
        <section class="section" data-section="skills">
          <div class="section-title">${escapeHtml(I18N[lang].skills)}</div>
          <div class="chip-grid">
            ${merged.map((item, index) => `
              <span class="chip" data-entry-id="skill-${index}">${escapeHtml(item)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderExperience(data, lang) {
      const items = safeArr(data.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          <div class="section-title">${escapeHtml(I18N[lang].experience)}</div>
          <div class="timeline">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `experience-${index}`;
              const title = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);
              const period = formatDateRange(item.startDate, item.endDate, lang, !!item.isCurrent);
              const bullets = [...safeArr(item.achievements), ...safeArr(item.responsibilities)]
                .map(safeStr)
                .map(v => v.trim())
                .filter(Boolean);

              if (!title && !company && !location && !period && !bullets.length) return '';

              return `
                <article class="entry timeline-entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-top">
                    <div>
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${escapeHtml([company, location].filter(Boolean).join(' · '))}
                        </div>
                      ` : ''}
                    </div>
                    ${period ? `<div class="entry-date">${escapeHtml(period)}</div>` : ''}
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

    renderProjects(data, lang) {
      const items = safeArr(data.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          <div class="section-title">${escapeHtml(I18N[lang].projects)}</div>
          <div class="stack">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `project-${index}`;
              const name = safeStr(item.name);
              const description = safeStr(item.description);
              const technologies = safeArr(item.technologies).map(safeStr).map(v => v.trim()).filter(Boolean);
              const url = safeStr(item.url);

              if (!name && !description && !technologies.length && !url) return '';

              return `
                <article class="entry soft-card" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-top">
                    <div>
                      ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                    </div>
                    ${url ? `<div class="entry-link">${escapeHtml(url)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `
                    <div class="chip-grid small">
                      ${technologies.map((tech, techIndex) => `
                        <span class="chip subtle" data-entry-id="${escapeHtml(id)}-tech-${techIndex}">${escapeHtml(tech)}</span>
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

    renderAchievements(data, lang) {
      const items = safeArr(data.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          <div class="section-title">${escapeHtml(I18N[lang].achievements)}</div>
          <div class="stack">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `achievement-${index}`;
              const title = safeStr(item.title);
              const description = safeStr(item.description);
              const year = safeStr(item.year);

              if (!title && !description && !year) return '';

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-top">
                    <div>
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                    </div>
                    ${year ? `<div class="entry-date">${escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${escapeHtml(description)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducation(data, lang) {
      const items = safeArr(data.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          <div class="section-title">${escapeHtml(I18N[lang].education)}</div>
          <div class="timeline">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `education-${index}`;
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);
              const period = formatDateRange(
                item.startDate,
                item.endDate,
                lang,
                item.isCompleted === false
              );

              const title = [degree, field].filter(Boolean).join(' — ');

              if (!title && !institution && !gpa && !period) return '';

              return `
                <article class="entry timeline-entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-top">
                    <div>
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                      ${institution ? `<div class="entry-subtitle">${escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${period ? `<div class="entry-date">${escapeHtml(period)}</div>` : ''}
                  </div>
                  ${gpa ? `<div class="entry-text">GPA: ${escapeHtml(gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(data, lang) {
      const items = safeArr(data.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          <div class="section-title">${escapeHtml(I18N[lang].certifications)}</div>
          <div class="stack">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `certification-${index}`;
              const name = safeStr(item.name);
              const issuer = safeStr(item.issuer);
              const date = formatShortDate(item.date, lang);

              if (!name && !issuer && !date) return '';

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-top">
                    <div>
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

    renderLanguages(data, lang) {
      const items = safeArr(data.languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          <div class="section-title">${escapeHtml(I18N[lang].languages)}</div>
          <div class="language-list">
            ${items.map((item, index) => {
              const id = safeStr(item.id) || `language-${index}`;
              const name = safeStr(item.name);
              const levelKey = safeStr(item.level).toLowerCase();
              const level = (I18N[lang].levelMap && I18N[lang].levelMap[levelKey]) || safeStr(item.level);

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
        </section>
      `;
    }

    render() {
      const data = this._data || {};
      const lang = this.getLanguage();

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2f2a2d;
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
            padding: 0;
            background: #ffffff;
            font-family: Arial, Helvetica, sans-serif;
          }

          .header {
            background:
              linear-gradient(135deg, #4a3540 0%, #5a404b 58%, #6a4b56 100%);
            color: #ffffff;
            padding: 34px 38px 26px;
            border-bottom: 6px solid #d7cbc4;
          }

          .header-inner {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .name {
            margin: 0;
            font-size: 28px;
            line-height: 1.1;
            letter-spacing: 0.08em;
            font-weight: 800;
            text-transform: uppercase;
          }

          .profession {
            font-size: 14px;
            line-height: 1.4;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #f2e9e4;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 10px;
            margin-top: 8px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 6px 10px;
            border: 1px solid rgba(255,255,255,0.24);
            border-radius: 999px;
            background: rgba(255,255,255,0.1);
            color: #fffaf7;
            font-size: 12px;
            line-height: 1.2;
          }

          .section {
            padding: 20px 38px 0;
          }

          .section-title {
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 0 0 14px;
            color: #4a3540;
            font-size: 16px;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .section-title::before {
            content: "";
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #5a404b;
            flex: 0 0 12px;
          }

          .section-title::after {
            content: "";
            height: 2px;
            flex: 1;
            background: linear-gradient(90deg, #5a404b 0%, #b9a7a0 100%);
          }

          .profile-text,
          .entry-text {
            font-size: 13px;
            line-height: 1.65;
            color: #3f393c;
          }

          .chip-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .chip {
            display: inline-flex;
            align-items: center;
            min-height: 30px;
            padding: 6px 12px;
            border-radius: 999px;
            border: 1px solid #bfaea7;
            background: #f7f2ef;
            color: #4a3540;
            font-size: 12px;
            font-weight: 700;
            line-height: 1.2;
          }

          .chip.subtle {
            background: #fcf9f7;
            border-color: #d9cbc5;
            color: #5a404b;
            font-weight: 600;
          }

          .chip-grid.small .chip {
            min-height: 26px;
            padding: 5px 10px;
            font-size: 11px;
          }

          .timeline,
          .stack {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            position: relative;
          }

          .timeline-entry {
            padding-left: 18px;
            border-left: 2px solid #d5c5be;
          }

          .timeline-entry::before {
            content: "";
            position: absolute;
            left: -6px;
            top: 5px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #5a404b;
          }

          .soft-card {
            padding: 14px 14px 12px;
            border: 1px solid #e5dbd6;
            border-radius: 12px;
            background: #fffdfc;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 14px;
            margin-bottom: 6px;
          }

          .entry-title {
            margin: 0;
            font-size: 15px;
            line-height: 1.35;
            color: #2f2a2d;
            font-weight: 800;
          }

          .entry-subtitle {
            font-size: 12px;
            line-height: 1.5;
            color: #6d6267;
            margin-top: 2px;
          }

          .entry-date,
          .entry-link {
            flex: 0 0 auto;
            font-size: 11px;
            line-height: 1.4;
            color: #5a404b;
            font-weight: 700;
            text-align: right;
            white-space: nowrap;
          }

          .entry-link {
            max-width: 220px;
            white-space: normal;
            word-break: break-word;
          }

          .bullet-list {
            margin: 8px 0 0;
            padding: 0 0 0 18px;
            color: #3f393c;
          }

          .bullet-list li {
            margin: 0 0 5px;
            font-size: 13px;
            line-height: 1.55;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding-bottom: 8px;
          }

          .language-item {
            display: flex;
            align-items: baseline;
            gap: 8px;
            font-size: 13px;
            line-height: 1.5;
            color: #3a3437;
          }

          .language-name {
            font-weight: 800;
            color: #2f2a2d;
          }

          .language-sep {
            color: #a18d85;
          }

          .language-level {
            color: #5a404b;
            font-weight: 700;
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
          ${this.renderProfile(data, lang)}
          ${this.renderSkills(data, lang)}
          ${this.renderExperience(data, lang)}
          ${this.renderProjects(data, lang)}
          ${this.renderAchievements(data, lang)}
          ${this.renderEducation(data, lang)}
          ${this.renderCertifications(data, lang)}
          ${this.renderLanguages(data, lang)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-pulse-v1')) {
    customElements.define('gqr-resume-pulse-v1', GQRResumePulseV1);
  }
})();