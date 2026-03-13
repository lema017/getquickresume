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

  function formatShortDate(value, language) {
    if (!value) return '';
    const lang = language === 'es' ? 'es-ES' : 'en-US';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return escapeHtml(value);
    return new Intl.DateTimeFormat(lang, {
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  function formatDateRange(startDate, endDate, language, isCurrentLike) {
    const i18n = I18N[language] || I18N.en;
    const start = formatShortDate(startDate, language);
    const end = isCurrentLike ? i18n.present : formatShortDate(endDate, language);
    if (start && end) return `${start} — ${end}`;
    return start || end || '';
  }

  class GQRResumeZenithV2 extends HTMLElement {
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

    renderHeader(d) {
      const firstName = safeStr(d.firstName);
      const lastName = safeStr(d.lastName);
      const profession = safeStr(d.profession);
      const email = safeStr(d.email);
      const phone = safeStr(d.phone);
      const country = safeStr(d.country);
      const linkedin = safeStr(d.linkedin);

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      const contacts = [
        email ? `✉ ${escapeHtml(email)}` : '',
        phone ? `☎ ${escapeHtml(phone)}` : '',
        country ? `⚲ ${escapeHtml(country)}` : '',
        linkedin ? `🔗 ${escapeHtml(linkedin)}` : ''
      ].filter(Boolean);

      if (!fullName && !profession && contacts.length === 0) return '';

      return `
        <section class="header-card" data-section="header">
          <div class="header-top">
            <div class="name-wrap">
              ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
              ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
            </div>
          </div>
          ${contacts.length ? `
            <div class="contact-row" data-section="contact">
              ${contacts.map((item, index) => `
                <div class="contact-pill" data-entry-id="contact-${index}">${item}</div>
              `).join('')}
            </div>
          ` : ''}
        </section>
      `;
    }

    renderSectionTitle(title) {
      return `
        <div class="section-head">
          <h2>${escapeHtml(title)}</h2>
        </div>
      `;
    }

    renderProfile(d, t) {
      const summary = safeStr(d.summary).trim();
      if (!summary) return '';
      return `
        <section class="section" data-section="profile">
          ${this.renderSectionTitle(t.profile)}
          <div class="profile-text">${escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderSkills(d, t) {
      const merged = [...safeArr(d.skillsRaw), ...safeArr(d.toolsRaw)]
        .map(s => safeStr(s).trim())
        .filter(Boolean);

      const unique = [...new Set(merged.map(v => v.toLowerCase()))]
        .map(lower => merged.find(v => v.toLowerCase() === lower));

      if (!unique.length) return '';

      return `
        <section class="section" data-section="skills">
          ${this.renderSectionTitle(t.skills)}
          <div class="skills-grid">
            ${unique.map((skill, index) => `
              <div class="skill-chip" data-entry-id="skill-${index}">
                <span>${escapeHtml(skill)}</span>
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderExperience(d, t, language) {
      const items = safeArr(d.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          ${this.renderSectionTitle(t.experience)}
          <div class="entries">
            ${items.map((item, index) => {
              const bullets = [...safeArr(item.achievements), ...safeArr(item.responsibilities)]
                .map(v => safeStr(v).trim())
                .filter(Boolean);

              const role = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);
              const range = formatDateRange(item.startDate, item.endDate, language, !!item.isCurrent);
              const metaLine = [company, location].filter(Boolean).join(' • ');

              return `
                <article class="entry" data-entry-id="${escapeHtml(item.id || `experience-${index}`)}">
                  <div class="entry-header">
                    <div class="entry-main">
                      ${role ? `<h3 class="entry-title">${escapeHtml(role)}</h3>` : ''}
                      ${metaLine ? `<div class="entry-meta">${escapeHtml(metaLine)}</div>` : ''}
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

    renderProjects(d, t) {
      const items = safeArr(d.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          ${this.renderSectionTitle(t.projects)}
          <div class="entries">
            ${items.map((item, index) => {
              const name = safeStr(item.name);
              const description = safeStr(item.description);
              const technologies = safeArr(item.technologies).map(v => safeStr(v).trim()).filter(Boolean);
              const url = safeStr(item.url);

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(item.id || `project-${index}`)}">
                  <div class="entry-header">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                      ${url ? `<div class="entry-link">${escapeHtml(url)}</div>` : ''}
                    </div>
                  </div>
                  ${description ? `<div class="entry-text">${escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map((tech, techIndex) => `
                        <span class="mini-tag" data-entry-id="${escapeHtml(item.id || `project-${index}`)}-tech-${techIndex}">${escapeHtml(tech)}</span>
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
      const items = safeArr(d.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          ${this.renderSectionTitle(t.achievements)}
          <div class="entries">
            ${items.map((item, index) => {
              const title = safeStr(item.title);
              const description = safeStr(item.description);
              const year = safeStr(item.year);

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(item.id || `achievement-${index}`)}">
                  <div class="entry-header">
                    <div class="entry-main">
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

    renderEducation(d, t, language) {
      const items = safeArr(d.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          ${this.renderSectionTitle(t.education)}
          <div class="entries">
            ${items.map((item, index) => {
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);
              const title = [degree, field].filter(Boolean).join(' — ');
              const range = formatDateRange(item.startDate, item.endDate, language, item.isCompleted === false);
              const details = [
                institution,
                gpa ? `GPA: ${gpa}` : ''
              ].filter(Boolean).join(' • ');

              return `
                <article class="entry" data-entry-id="${escapeHtml(item.id || `education-${index}`)}">
                  <div class="entry-header">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                      ${details ? `<div class="entry-meta">${escapeHtml(details)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${escapeHtml(range)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(d, t, language) {
      const items = safeArr(d.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          ${this.renderSectionTitle(t.certifications)}
          <div class="entries">
            ${items.map((item, index) => {
              const name = safeStr(item.name);
              const issuer = safeStr(item.issuer);
              const date = item.date ? formatShortDate(item.date, language) : '';

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(item.id || `certification-${index}`)}">
                  <div class="entry-header">
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

    renderLanguages(d, t) {
      const items = safeArr(d.languages).filter(Boolean);
      if (!items.length) return '';

      const language = this.getLanguage();

      return `
        <section class="section" data-section="languages">
          ${this.renderSectionTitle(t.languages)}
          <div class="language-list">
            ${items.map((item, index) => {
              const name = safeStr(item.name);
              const levelKey = safeStr(item.level).toLowerCase();
              const translatedLevel = t.levelMap[levelKey] || levelKey;
              const levelScoreMap = { basic: 1, intermediate: 2, advanced: 3, native: 4 };
              const score = levelScoreMap[levelKey] || 0;

              return `
                <div class="language-item" data-entry-id="${escapeHtml(item.id || `language-${index}`)}">
                  <div class="language-info">
                    <span class="language-name">${escapeHtml(name)}</span>
                    <span class="language-level">${escapeHtml(translatedLevel)}</span>
                  </div>
                  <div class="dots" aria-label="${escapeHtml(name)} ${escapeHtml(translatedLevel)} ${escapeHtml(language)}">
                    ${[1, 2, 3, 4].map(n => `<span class="dot ${n <= score ? 'filled' : ''}"></span>`).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    render() {
      const d = this._data || {};
      const language = this.getLanguage();
      const t = I18N[language] || I18N.en;

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #24313d;
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
            padding: 18mm 16mm 18mm 16mm;
            background: #ffffff;
            color: #24313d;
            font-family: "Helvetica Neue", Arial, sans-serif;
            line-height: 1.45;
            position: relative;
          }

          .page::before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 48mm;
            height: 20mm;
            background: #34414f;
            border-bottom-left-radius: 20mm;
          }

          .page::after {
            content: "";
            position: absolute;
            top: 13mm;
            left: 16mm;
            width: 42mm;
            height: 2px;
            background: #8a96a3;
            opacity: 0.55;
          }

          .header-card {
            padding: 8mm 0 7mm 0;
            margin-bottom: 7mm;
            border-bottom: 1.5px solid #b5bec7;
            position: relative;
            z-index: 1;
          }

          .header-top {
            display: block;
          }

          .name {
            margin: 0;
            font-size: 15pt;
            line-height: 1.05;
            letter-spacing: 0.6px;
            text-transform: uppercase;
            font-weight: 800;
            color: #34414f;
          }

          .profession {
            margin-top: 3mm;
            font-size: 9.5pt;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #66717e;
            font-weight: 500;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 5mm;
          }

          .contact-pill {
            font-size: 8.7pt;
            color: #34414f;
            background: #eef1f4;
            border: 1px solid #d7dee5;
            padding: 6px 10px;
            border-radius: 999px;
            line-height: 1.2;
          }

          .section {
            margin-top: 6mm;
          }

          .section-head {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 4mm;
          }

          .section-head::before {
            content: "";
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #34414f;
            flex: 0 0 12px;
          }

          .section-head::after {
            content: "";
            flex: 1;
            height: 1px;
            background: linear-gradient(to right, #9ea8b3, rgba(158, 168, 179, 0.15));
          }

          .section-head h2 {
            margin: 0;
            font-size: 10pt;
            font-weight: 800;
            letter-spacing: 1.6px;
            text-transform: uppercase;
            color: #34414f;
            white-space: nowrap;
          }

          .profile-text,
          .entry-text {
            font-size: 9.3pt;
            color: #334150;
          }

          .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 7px 8px;
          }

          .skill-chip {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 6px 11px;
            border-radius: 4px;
            background: #34414f;
            color: #ffffff;
            font-size: 8.6pt;
            letter-spacing: 0.2px;
            position: relative;
          }

          .skill-chip::before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #b8c0c9;
            margin-right: 8px;
            flex: 0 0 6px;
          }

          .entries {
            display: flex;
            flex-direction: column;
            gap: 4.5mm;
          }

          .entry {
            padding-bottom: 3.5mm;
            border-bottom: 1px solid #e3e8ed;
          }

          .entry.compact {
            padding-bottom: 3mm;
          }

          .entry:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .entry-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10mm;
            margin-bottom: 1.8mm;
          }

          .entry-main {
            flex: 1;
            min-width: 0;
          }

          .entry-title {
            margin: 0;
            font-size: 10pt;
            font-weight: 700;
            color: #2b3744;
            line-height: 1.3;
          }

          .entry-meta,
          .entry-link {
            margin-top: 1.2mm;
            font-size: 8.8pt;
            color: #6a7581;
          }

          .entry-date {
            flex: 0 0 auto;
            white-space: nowrap;
            font-size: 8.5pt;
            font-weight: 700;
            letter-spacing: 0.4px;
            text-transform: uppercase;
            color: #34414f;
            background: #eef1f4;
            border: 1px solid #d8dfe6;
            border-radius: 999px;
            padding: 5px 9px;
          }

          .bullet-list {
            margin: 2mm 0 0 0;
            padding: 0 0 0 18px;
          }

          .bullet-list li {
            margin: 1.2mm 0;
            font-size: 9pt;
            color: #334150;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 2.5mm;
          }

          .mini-tag {
            display: inline-flex;
            align-items: center;
            padding: 4px 8px;
            border: 1px solid #c7d0d8;
            background: #f8fafb;
            color: #445160;
            font-size: 8.2pt;
            border-radius: 999px;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 3mm;
          }

          .language-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10mm;
            padding-bottom: 2.5mm;
            border-bottom: 1px solid #e3e8ed;
          }

          .language-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .language-info {
            display: flex;
            flex-direction: column;
            gap: 1mm;
          }

          .language-name {
            font-size: 9.4pt;
            font-weight: 700;
            color: #2b3744;
          }

          .language-level {
            font-size: 8.6pt;
            color: #687481;
          }

          .dots {
            display: inline-flex;
            gap: 5px;
            flex: 0 0 auto;
          }

          .dot {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            border: 1.5px solid #34414f;
            background: transparent;
          }

          .dot.filled {
            background: #34414f;
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
          ${this.renderExperience(d, t, language)}
          ${this.renderProjects(d, t)}
          ${this.renderAchievements(d, t)}
          ${this.renderEducation(d, t, language)}
          ${this.renderCertifications(d, t, language)}
          ${this.renderLanguages(d, t)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-zenith-v2')) {
    customElements.define('gqr-resume-zenith-v2', GQRResumeZenithV2);
  }
})();