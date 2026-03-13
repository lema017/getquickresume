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
      skills: 'Aptitudes',
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

  function formatDateRange(startDate, endDate, lang, currentish) {
    const i18n = I18N[lang] || I18N.en;
    const start = formatShortDate(startDate, lang);
    const end = currentish ? i18n.present : formatShortDate(endDate, lang);
    if (start && end) return start + ' — ' + end;
    return start || end || '';
  }

  class GQRResumeGlowV1 extends HTMLElement {
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
        email ? `<span class="contact-item">✉ ${escapeHtml(email)}</span>` : '',
        phone ? `<span class="contact-item">☎ ${escapeHtml(phone)}</span>` : '',
        country ? `<span class="contact-item">⚲ ${escapeHtml(country)}</span>` : '',
        linkedin ? `<span class="contact-item">🔗 ${escapeHtml(linkedin)}</span>` : ''
      ].filter(Boolean).join('');

      if (!fullName && !profession && !contacts) return '';

      return `
        <section class="header-block" data-section="header">
          <div class="name-wrap">
            ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
          </div>
        </section>
        ${contacts ? `
          <section class="contact-block" data-section="contact">
            <div class="contact-row">
              ${contacts}
            </div>
          </section>
        ` : ''}
      `;
    }

    renderProfile(d, lang) {
      const summary = safeStr(d.summary).trim();
      if (!summary) return '';
      return `
        <section class="section" data-section="profile">
          <h2 class="section-title">${escapeHtml(I18N[lang].profile)}</h2>
          <div class="section-body prose">
            <p>${escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(d, lang) {
      const combined = Array.from(new Set(
        [...safeArr(d.skillsRaw), ...safeArr(d.toolsRaw)]
          .map(s => safeStr(s).trim())
          .filter(Boolean)
      ));

      if (!combined.length) return '';

      return `
        <section class="section" data-section="skills">
          <h2 class="section-title">${escapeHtml(I18N[lang].skills)}</h2>
          <div class="section-body chips">
            ${combined.map((skill, index) => `
              <span class="chip" data-entry-id="skill-${index}">${escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderExperience(d, lang) {
      const items = safeArr(d.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          <h2 class="section-title">${escapeHtml(I18N[lang].experience)}</h2>
          <div class="section-body timeline">
            ${items.map((item, index) => {
              const id = safeStr(item.id || `experience-${index}`);
              const title = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);
              const bullets = [...safeArr(item.achievements), ...safeArr(item.responsibilities)]
                .map(b => safeStr(b).trim())
                .filter(Boolean);

              const metaLeft = [title, company].filter(Boolean).join(' · ');
              const metaRight = [location].filter(Boolean).join(' · ');
              const dateRange = formatDateRange(item.startDate, item.endDate, lang, !!item.isCurrent);

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${metaLeft ? `<h3 class="entry-title">${escapeHtml(metaLeft)}</h3>` : ''}
                      ${metaRight ? `<div class="entry-subtitle">${escapeHtml(metaRight)}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${bullets.length ? `
                    <ul class="bullets">
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

    renderProjects(d, lang) {
      const items = safeArr(d.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          <h2 class="section-title">${escapeHtml(I18N[lang].projects)}</h2>
          <div class="section-body stacked">
            ${items.map((item, index) => {
              const id = safeStr(item.id || `project-${index}`);
              const name = safeStr(item.name);
              const description = safeStr(item.description);
              const technologies = safeArr(item.technologies).map(t => safeStr(t).trim()).filter(Boolean);
              const url = safeStr(item.url);

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                    </div>
                    ${url ? `<div class="entry-link">${escapeHtml(url)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="mini-chips">
                      ${technologies.map(tech => `<span class="mini-chip">${escapeHtml(tech)}</span>`).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements(d, lang) {
      const items = safeArr(d.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          <h2 class="section-title">${escapeHtml(I18N[lang].achievements)}</h2>
          <div class="section-body stacked">
            ${items.map((item, index) => {
              const id = safeStr(item.id || `achievement-${index}`);
              const title = safeStr(item.title);
              const description = safeStr(item.description);
              const year = safeStr(item.year);

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

    renderEducation(d, lang) {
      const items = safeArr(d.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          <h2 class="section-title">${escapeHtml(I18N[lang].education)}</h2>
          <div class="section-body timeline">
            ${items.map((item, index) => {
              const id = safeStr(item.id || `education-${index}`);
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);
              const dateRange = formatDateRange(
                item.startDate,
                item.endDate,
                lang,
                item.isCompleted === false
              );

              const title = [degree, field].filter(Boolean).join(' · ');

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                      ${institution ? `<div class="entry-subtitle">${escapeHtml(institution)}${gpa ? ` · GPA: ${escapeHtml(gpa)}` : ''}</div>` : `${gpa ? `<div class="entry-subtitle">GPA: ${escapeHtml(gpa)}</div>` : ''}`}
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

    renderCertifications(d, lang) {
      const items = safeArr(d.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          <h2 class="section-title">${escapeHtml(I18N[lang].certifications)}</h2>
          <div class="section-body stacked">
            ${items.map((item, index) => {
              const id = safeStr(item.id || `certification-${index}`);
              const name = safeStr(item.name);
              const issuer = safeStr(item.issuer);
              const date = formatShortDate(item.date, lang) || safeStr(item.date);

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

    renderLanguages(d, lang) {
      const items = safeArr(d.languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          <h2 class="section-title">${escapeHtml(I18N[lang].languages)}</h2>
          <div class="section-body language-list">
            ${items.map((item, index) => {
              const id = safeStr(item.id || `language-${index}`);
              const name = safeStr(item.name);
              const rawLevel = safeStr(item.level).toLowerCase();
              const level = I18N[lang].levelMap[rawLevel] || safeStr(item.level);

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
      const d = this._data || {};
      const lang = this.getLanguage();

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #1e1b18;
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
            background: #fcfbf9;
            color: #1f1d1a;
            padding: 18mm 16mm 16mm;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.45;
            position: relative;
          }

          .page::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 12mm;
            background: linear-gradient(90deg, #111111 0%, #2d2a28 55%, #8b7d75 100%);
          }

          .header-block {
            padding-top: 8mm;
            margin-bottom: 6mm;
          }

          .name-wrap {
            border-bottom: 1px solid #d8d0ca;
            padding-bottom: 5mm;
          }

          .name {
            margin: 0;
            font-size: 21pt;
            line-height: 1.05;
            font-weight: 800;
            letter-spacing: 0.02em;
            color: #0f0f0f;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 2mm;
            font-size: 10.5pt;
            font-weight: 600;
            color: #6d625b;
            letter-spacing: 0.14em;
            text-transform: uppercase;
          }

          .contact-block {
            margin-bottom: 7mm;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 2.5mm 4mm;
          }

          .contact-item {
            display: inline-flex;
            align-items: center;
            padding: 1.5mm 3mm;
            background: #f1ece7;
            border: 1px solid #ded4cd;
            border-radius: 999px;
            font-size: 9pt;
            color: #3e3834;
          }

          .section {
            margin-bottom: 7mm;
          }

          .section-title {
            margin: 0 0 3.5mm;
            font-size: 11pt;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #171513;
            display: flex;
            align-items: center;
            gap: 3mm;
          }

          .section-title::before {
            content: "";
            width: 12mm;
            height: 2px;
            background: #8b7d75;
            flex: 0 0 auto;
          }

          .section-body {
            font-size: 10pt;
          }

          .prose p {
            margin: 0;
            color: #2d2926;
          }

          .chips {
            display: flex;
            flex-wrap: wrap;
            gap: 2.4mm;
          }

          .chip {
            display: inline-flex;
            align-items: center;
            padding: 2mm 3.2mm;
            border: 1px solid #cfc4bc;
            background: #f7f3ef;
            color: #2f2a27;
            border-radius: 999px;
            font-size: 9pt;
            font-weight: 600;
          }

          .timeline,
          .stacked {
            display: flex;
            flex-direction: column;
            gap: 4.5mm;
          }

          .entry {
            padding-bottom: 3.5mm;
            border-bottom: 1px solid #ece5df;
          }

          .entry:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .entry.compact {
            padding-bottom: 3mm;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 6mm;
          }

          .entry-main {
            min-width: 0;
            flex: 1 1 auto;
          }

          .entry-title {
            margin: 0;
            font-size: 10.5pt;
            line-height: 1.3;
            font-weight: 700;
            color: #121110;
          }

          .entry-subtitle {
            margin-top: 1mm;
            color: #655b54;
            font-size: 9.2pt;
          }

          .entry-date,
          .entry-link {
            flex: 0 0 auto;
            white-space: nowrap;
            font-size: 8.8pt;
            font-weight: 700;
            color: #7a6b63;
          }

          .entry-text {
            margin: 2mm 0 0;
            color: #2f2b28;
          }

          .bullets {
            margin: 2.2mm 0 0 0;
            padding-left: 5mm;
            color: #2f2b28;
          }

          .bullets li {
            margin: 1mm 0 0;
          }

          .mini-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 2mm;
            margin-top: 2.2mm;
          }

          .mini-chip {
            padding: 1.3mm 2.5mm;
            background: #ede6e0;
            color: #4a413c;
            border-radius: 999px;
            font-size: 8.5pt;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 2mm;
          }

          .language-item {
            display: flex;
            align-items: baseline;
            gap: 2mm;
            font-size: 10pt;
          }

          .language-name {
            font-weight: 700;
            color: #171513;
          }

          .language-sep,
          .language-level {
            color: #6a5f58;
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
          ${this.renderProfile(d, lang)}
          ${this.renderSkills(d, lang)}
          ${this.renderExperience(d, lang)}
          ${this.renderProjects(d, lang)}
          ${this.renderAchievements(d, lang)}
          ${this.renderEducation(d, lang)}
          ${this.renderCertifications(d, lang)}
          ${this.renderLanguages(d, lang)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-glow-v1')) {
    customElements.define('gqr-resume-glow-v1', GQRResumeGlowV1);
  }
})();