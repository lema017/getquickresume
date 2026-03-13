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
    const d = new Date(value);
    if (isNaN(d.getTime())) return escapeHtml(value);
    let text = new Intl.DateTimeFormat(locale, {
      month: 'short',
      year: 'numeric'
    }).format(d);
    if (lang === 'es') {
      text = text.replace('.', '');
      text = text.charAt(0).toUpperCase() + text.slice(1);
    }
    return text;
  }

  function formatDateRange(startDate, endDate, lang, isCurrentLike) {
    const dict = I18N[lang] || I18N.en;
    const start = formatShortDate(startDate, lang);
    const end = isCurrentLike ? dict.present : formatShortDate(endDate, lang);
    if (start && end) return `${start} — ${end}`;
    return start || end || '';
  }

  class GQRResumePulseV2 extends HTMLElement {
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
      const lang = safeStr(this.getAttribute('language') || (this._data && this._data.language) || 'en').toLowerCase();
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
      const contactParts = [
        email ? `✉ ${escapeHtml(email)}` : '',
        phone ? `☎ ${escapeHtml(phone)}` : '',
        country ? `⚲ ${escapeHtml(country)}` : '',
        linkedin ? `🔗 ${escapeHtml(linkedin)}` : ''
      ].filter(Boolean);

      if (!fullName && !profession && !contactParts.length) return '';

      return `
        <section class="header" data-section="header">
          <div class="header-band">
            <div class="name-wrap">
              ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
              ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
            </div>
            ${contactParts.length ? `
              <div class="contact-row" data-section="contact">
                ${contactParts.map((item, idx) => `<span class="contact-pill" data-entry-id="contact-${idx}">${item}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        </section>
      `;
    }

    renderProfile(d, t) {
      const summary = safeStr(d.summary).trim();
      if (!summary) return '';
      return `
        <section class="section" data-section="profile">
          <div class="section-title">${escapeHtml(t.profile)}</div>
          <div class="section-body">
            <p class="profile-text">${escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(d, t) {
      const merged = [...safeArr(d.skillsRaw), ...safeArr(d.toolsRaw)]
        .map(s => safeStr(s).trim())
        .filter(Boolean);

      const deduped = [];
      const seen = new Set();
      merged.forEach(item => {
        const key = item.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          deduped.push(item);
        }
      });

      if (!deduped.length) return '';

      return `
        <section class="section" data-section="skills">
          <div class="section-title">${escapeHtml(t.skills)}</div>
          <div class="section-body">
            <div class="chip-grid">
              ${deduped.map((skill, idx) => `
                <span class="chip" data-entry-id="skill-${idx}">${escapeHtml(skill)}</span>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(d, t, lang) {
      const items = safeArr(d.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          <div class="section-title">${escapeHtml(t.experience)}</div>
          <div class="section-body timeline">
            ${items.map((item, idx) => {
              const id = safeStr(item.id) || `experience-${idx}`;
              const title = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);
              const bullets = [...safeArr(item.achievements), ...safeArr(item.responsibilities)]
                .map(b => safeStr(b).trim())
                .filter(Boolean);
              const range = formatDateRange(item.startDate, item.endDate, lang, !!item.isCurrent);

              if (!title && !company && !location && !bullets.length && !range) return '';

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-heading">
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${company ? `<span>${escapeHtml(company)}</span>` : ''}
                          ${company && location ? `<span class="sep">•</span>` : ''}
                          ${location ? `<span>${escapeHtml(location)}</span>` : ''}
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

    renderProjects(d, t) {
      const items = safeArr(d.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          <div class="section-title">${escapeHtml(t.projects)}</div>
          <div class="section-body">
            ${items.map((item, idx) => {
              const id = safeStr(item.id) || `project-${idx}`;
              const name = safeStr(item.name);
              const description = safeStr(item.description);
              const technologies = safeArr(item.technologies).map(x => safeStr(x).trim()).filter(Boolean);
              const url = safeStr(item.url);

              if (!name && !description && !technologies.length && !url) return '';

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-heading">
                      ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                      ${url ? `<div class="entry-link">${escapeHtml(url)}</div>` : ''}
                    </div>
                  </div>
                  ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="meta-line">
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

    renderAchievements(d, t) {
      const items = safeArr(d.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          <div class="section-title">${escapeHtml(t.achievements)}</div>
          <div class="section-body">
            ${items.map((item, idx) => {
              const id = safeStr(item.id) || `achievement-${idx}`;
              const title = safeStr(item.title);
              const description = safeStr(item.description);
              const year = safeStr(item.year);

              if (!title && !description && !year) return '';

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-heading">
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

    renderEducation(d, t, lang) {
      const items = safeArr(d.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          <div class="section-title">${escapeHtml(t.education)}</div>
          <div class="section-body timeline">
            ${items.map((item, idx) => {
              const id = safeStr(item.id) || `education-${idx}`;
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);
              const range = formatDateRange(item.startDate, item.endDate, lang, item.isCompleted === false);

              if (!degree && !field && !institution && !gpa && !range) return '';

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-heading">
                      ${(degree || field) ? `
                        <h3 class="entry-title">
                          ${escapeHtml([degree, field].filter(Boolean).join(degree && field ? ' — ' : ''))}
                        </h3>
                      ` : ''}
                      ${institution ? `<div class="entry-subtitle"><span>${escapeHtml(institution)}</span></div>` : ''}
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

    renderCertifications(d, t, lang) {
      const items = safeArr(d.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          <div class="section-title">${escapeHtml(t.certifications)}</div>
          <div class="section-body">
            ${items.map((item, idx) => {
              const id = safeStr(item.id) || `certification-${idx}`;
              const name = safeStr(item.name);
              const issuer = safeStr(item.issuer);
              const date = item.date ? formatShortDate(item.date, lang) : '';

              if (!name && !issuer && !date) return '';

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-heading">
                      ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                      ${issuer ? `<div class="entry-subtitle"><span>${escapeHtml(issuer)}</span></div>` : ''}
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

      const lang = this.getLanguage();
      const levelMap = (I18N[lang] || I18N.en).levelMap;

      return `
        <section class="section" data-section="languages">
          <div class="section-title">${escapeHtml(t.languages)}</div>
          <div class="section-body">
            <div class="language-list">
              ${items.map((item, idx) => {
                const id = safeStr(item.id) || `language-${idx}`;
                const name = safeStr(item.name);
                const levelKey = safeStr(item.level).toLowerCase();
                const levelText = levelMap[levelKey] || safeStr(item.level);

                if (!name && !levelText) return '';

                return `
                  <div class="language-item" data-entry-id="${escapeHtml(id)}">
                    <span class="language-name">${escapeHtml(name)}</span>
                    <span class="language-level">${escapeHtml(levelText)}</span>
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
          :host {
            display: block;
            color: #2d2629;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-family: "Segoe UI", Tahoma, Arial, sans-serif;
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
            background: #fcfbfa;
            padding: 16mm 15mm 16mm 15mm;
          }

          .header {
            margin-bottom: 8mm;
          }

          .header-band {
            background: linear-gradient(135deg, #4a353f 0%, #5b434e 55%, #7b7478 100%);
            color: #ffffff;
            padding: 10mm 9mm 7mm;
            border-radius: 4mm;
            position: relative;
            overflow: hidden;
          }

          .header-band::after {
            content: "";
            position: absolute;
            right: -18mm;
            top: -10mm;
            width: 50mm;
            height: 50mm;
            border-radius: 50%;
            background: rgba(255,255,255,0.08);
          }

          .name-wrap {
            position: relative;
            z-index: 1;
          }

          .name {
            margin: 0;
            font-size: 30px;
            line-height: 1.05;
            letter-spacing: 0.06em;
            font-weight: 800;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 3mm;
            font-size: 13px;
            line-height: 1.3;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #efe7ea;
            font-weight: 600;
          }

          .contact-row {
            position: relative;
            z-index: 1;
            display: flex;
            flex-wrap: wrap;
            gap: 2.2mm;
            margin-top: 5mm;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            min-height: 9mm;
            padding: 1.6mm 3mm;
            border: 1px solid rgba(255,255,255,0.28);
            background: rgba(255,255,255,0.08);
            border-radius: 999px;
            font-size: 11px;
            line-height: 1.2;
            color: #fff;
          }

          .section {
            margin-top: 7mm;
          }

          .section-title {
            display: flex;
            align-items: center;
            gap: 3mm;
            margin: 0 0 4mm 0;
            font-size: 16px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #4a353f;
          }

          .section-title::before {
            content: "";
            width: 10mm;
            height: 3px;
            background: #4a353f;
            border-radius: 999px;
            flex: 0 0 auto;
          }

          .section-title::after {
            content: "";
            height: 1px;
            background: #b9afb4;
            flex: 1 1 auto;
          }

          .section-body {
            padding-left: 0;
          }

          .profile-text,
          .entry-text {
            margin: 0;
            font-size: 12.2px;
            line-height: 1.6;
            color: #42383c;
          }

          .chip-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 2.2mm;
          }

          .chip,
          .mini-chip {
            display: inline-flex;
            align-items: center;
            padding: 1.6mm 3mm;
            border-radius: 999px;
            border: 1px solid #cfc3c8;
            background: #f3eef0;
            color: #4a353f;
            font-size: 11px;
            line-height: 1.2;
          }

          .mini-chip {
            padding: 1.3mm 2.6mm;
            font-size: 10.5px;
            background: #f8f4f6;
          }

          .timeline,
          .section-body {
            display: block;
          }

          .entry {
            position: relative;
            padding: 0 0 0 6mm;
            margin: 0 0 5mm 0;
            border-left: 2px solid #d7ced2;
          }

          .entry:last-child {
            margin-bottom: 0;
          }

          .entry::before {
            content: "";
            position: absolute;
            left: -5px;
            top: 2px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #4a353f;
            box-shadow: 0 0 0 2px #fcfbfa;
          }

          .entry.compact {
            padding-bottom: 1mm;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 6mm;
            margin-bottom: 1.5mm;
          }

          .entry-heading {
            flex: 1 1 auto;
            min-width: 0;
          }

          .entry-title {
            margin: 0;
            font-size: 13.5px;
            line-height: 1.35;
            color: #2f262a;
            font-weight: 700;
          }

          .entry-subtitle {
            margin-top: 1mm;
            font-size: 11.5px;
            line-height: 1.45;
            color: #6a5d63;
          }

          .entry-link {
            margin-top: 1mm;
            font-size: 11px;
            line-height: 1.4;
            color: #6a5d63;
            word-break: break-word;
          }

          .sep {
            padding: 0 1.5mm;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 11px;
            line-height: 1.35;
            color: #5d4a53;
            background: #efe8eb;
            border: 1px solid #d8cdd2;
            border-radius: 999px;
            padding: 1.2mm 2.6mm;
            white-space: nowrap;
          }

          .bullet-list {
            margin: 2mm 0 0 0;
            padding-left: 4.5mm;
          }

          .bullet-list li {
            margin: 0 0 1.4mm 0;
            font-size: 12px;
            line-height: 1.55;
            color: #3f3539;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .meta-line {
            display: flex;
            flex-wrap: wrap;
            gap: 2mm;
            margin-top: 2.2mm;
          }

          .language-list {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2.5mm;
          }

          .language-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 4mm;
            padding: 2.2mm 0;
            border-bottom: 1px solid #e2d9dd;
          }

          .language-item:last-child {
            border-bottom: none;
          }

          .language-name {
            font-size: 12px;
            color: #2f262a;
            font-weight: 600;
          }

          .language-level {
            font-size: 11px;
            color: #5d4a53;
            text-transform: uppercase;
            letter-spacing: 0.06em;
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
          ${this.renderExperience(d, t, lang)}
          ${this.renderProjects(d, t)}
          ${this.renderAchievements(d, t)}
          ${this.renderEducation(d, t, lang)}
          ${this.renderCertifications(d, t, lang)}
          ${this.renderLanguages(d, t)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-pulse-v2')) {
    customElements.define('gqr-resume-pulse-v2', GQRResumePulseV2);
  }
})();