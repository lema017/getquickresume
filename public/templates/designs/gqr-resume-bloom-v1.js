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
      education: 'Formación',
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

  function shortDate(value, lang) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return escapeHtml(value);
    return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  function formatDateRange(startDate, endDate, currentFlag, lang, presentLabel) {
    const start = shortDate(startDate, lang);
    const end = currentFlag === false ? presentLabel : shortDate(endDate, lang);
    if (start && end) return start + ' — ' + end;
    return start || end || '';
  }

  class GQRResumeBloomV1 extends HTMLElement {
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
      const attrLang = safeStr(this.getAttribute('language')).toLowerCase();
      const dataLang = safeStr(this._data && this._data.language).toLowerCase();
      const lang = attrLang || dataLang || 'en';
      return lang === 'es' ? 'es' : 'en';
    }

    render() {
      const data = this._data || {};
      const lang = this.getLanguage();
      const t = I18N[lang];
      const presentLabel = t.present;

      const firstName = safeStr(data.firstName);
      const lastName = safeStr(data.lastName);
      const profession = safeStr(data.profession);
      const email = safeStr(data.email);
      const phone = safeStr(data.phone);
      const country = safeStr(data.country);
      const linkedin = safeStr(data.linkedin);
      const summary = safeStr(data.summary);

      const skillsCombined = Array.from(
        new Set(
          safeArr(data.skillsRaw)
            .concat(safeArr(data.toolsRaw))
            .map(function(item) { return safeStr(item).trim(); })
            .filter(Boolean)
        )
      );

      const experience = safeArr(data.experience);
      const projects = safeArr(data.projects);
      const achievements = safeArr(data.achievements);
      const education = safeArr(data.education);
      const certifications = safeArr(data.certifications);
      const languages = safeArr(data.languages);

      const contactItems = [
        email ? '✉ ' + escapeHtml(email) : '',
        phone ? '☎ ' + escapeHtml(phone) : '',
        country ? '⚲ ' + escapeHtml(country) : '',
        linkedin ? '🔗 ' + escapeHtml(linkedin) : ''
      ].filter(Boolean);

      const headerBlock = (firstName || lastName || profession || contactItems.length) ? `
        <section class="header" data-section="header">
          <div class="header-inner">
            <div class="name-wrap">
              <h1 class="name">${escapeHtml((firstName + ' ' + lastName).trim())}</h1>
              ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
            </div>
            ${contactItems.length ? `
              <div class="contact" data-section="contact">
                ${contactItems.map(function(item, idx) {
                  return `<span class="contact-item" data-entry-id="contact-${idx}">${item}</span>`;
                }).join('')}
              </div>
            ` : ''}
          </div>
        </section>
      ` : '';

      const profileBlock = summary ? `
        <section class="section" data-section="profile">
          <div class="section-head">
            <h2>${escapeHtml(t.profile)}</h2>
          </div>
          <div class="section-body">
            <p class="summary">${escapeHtml(summary)}</p>
          </div>
        </section>
      ` : '';

      const skillsBlock = skillsCombined.length ? `
        <section class="section" data-section="skills">
          <div class="section-head">
            <h2>${escapeHtml(t.skills)}</h2>
          </div>
          <div class="section-body">
            <div class="pill-grid">
              ${skillsCombined.map(function(skill, index) {
                return `<span class="pill" data-entry-id="skill-${index}">${escapeHtml(skill)}</span>`;
              }).join('')}
            </div>
          </div>
        </section>
      ` : '';

      const experienceBlock = experience.length ? `
        <section class="section" data-section="experience">
          <div class="section-head">
            <h2>${escapeHtml(t.experience)}</h2>
          </div>
          <div class="section-body">
            <div class="timeline-list">
              ${experience.map(function(item, index) {
                const bullets = safeArr(item.achievements).concat(safeArr(item.responsibilities))
                  .map(function(b) { return safeStr(b).trim(); })
                  .filter(Boolean);
                const range = formatDateRange(item.startDate, item.endDate, item.isCurrent, lang, presentLabel);
                return `
                  <article class="entry" data-entry-id="${escapeHtml(safeStr(item.id) || ('experience-' + index))}">
                    <div class="entry-top">
                      <div>
                        <div class="entry-title">${escapeHtml(item.title)}</div>
                        <div class="entry-subtitle">
                          ${escapeHtml(item.company)}
                          ${item.location ? `<span class="sep">•</span>${escapeHtml(item.location)}` : ''}
                        </div>
                      </div>
                      ${range ? `<div class="entry-date">${escapeHtml(range)}</div>` : ''}
                    </div>
                    ${bullets.length ? `
                      <ul class="bullets">
                        ${bullets.map(function(bullet) {
                          return `<li>${escapeHtml(bullet)}</li>`;
                        }).join('')}
                      </ul>
                    ` : ''}
                  </article>
                `;
              }).join('')}
            </div>
          </div>
        </section>
      ` : '';

      const projectsBlock = projects.length ? `
        <section class="section" data-section="projects">
          <div class="section-head">
            <h2>${escapeHtml(t.projects)}</h2>
          </div>
          <div class="section-body">
            <div class="stack-list">
              ${projects.map(function(item, index) {
                return `
                  <article class="entry cardish" data-entry-id="${escapeHtml(safeStr(item.id) || ('project-' + index))}">
                    <div class="entry-top">
                      <div class="entry-title">${escapeHtml(item.name)}</div>
                      ${item.url ? `<div class="entry-link">${escapeHtml(item.url)}</div>` : ''}
                    </div>
                    ${item.description ? `<p class="entry-text">${escapeHtml(item.description)}</p>` : ''}
                    ${safeArr(item.technologies).length ? `
                      <div class="tech-row">
                        ${safeArr(item.technologies).map(function(tech, techIndex) {
                          return `<span class="mini-pill" data-entry-id="${escapeHtml(safeStr(item.id) || ('project-' + index))}-tech-${techIndex}">${escapeHtml(tech)}</span>`;
                        }).join('')}
                      </div>
                    ` : ''}
                  </article>
                `;
              }).join('')}
            </div>
          </div>
        </section>
      ` : '';

      const achievementsBlock = achievements.length ? `
        <section class="section" data-section="achievements">
          <div class="section-head">
            <h2>${escapeHtml(t.achievements)}</h2>
          </div>
          <div class="section-body">
            <div class="stack-list">
              ${achievements.map(function(item, index) {
                return `
                  <article class="entry" data-entry-id="${escapeHtml(safeStr(item.id) || ('achievement-' + index))}">
                    <div class="entry-top">
                      <div class="entry-title">${escapeHtml(item.title)}</div>
                      ${item.year ? `<div class="entry-date">${escapeHtml(item.year)}</div>` : ''}
                    </div>
                    ${item.description ? `<p class="entry-text">${escapeHtml(item.description)}</p>` : ''}
                  </article>
                `;
              }).join('')}
            </div>
          </div>
        </section>
      ` : '';

      const educationBlock = education.length ? `
        <section class="section" data-section="education">
          <div class="section-head">
            <h2>${escapeHtml(t.education)}</h2>
          </div>
          <div class="section-body">
            <div class="timeline-list">
              ${education.map(function(item, index) {
                const title = [safeStr(item.degree), safeStr(item.field)].filter(Boolean).join(' — ');
                const range = formatDateRange(item.startDate, item.endDate, item.isCompleted, lang, presentLabel);
                return `
                  <article class="entry" data-entry-id="${escapeHtml(safeStr(item.id) || ('education-' + index))}">
                    <div class="entry-top">
                      <div>
                        <div class="entry-title">${escapeHtml(title)}</div>
                        <div class="entry-subtitle">
                          ${escapeHtml(item.institution)}
                          ${item.gpa ? `<span class="sep">•</span>GPA: ${escapeHtml(item.gpa)}` : ''}
                        </div>
                      </div>
                      ${range ? `<div class="entry-date">${escapeHtml(range)}</div>` : ''}
                    </div>
                  </article>
                `;
              }).join('')}
            </div>
          </div>
        </section>
      ` : '';

      const certificationsBlock = certifications.length ? `
        <section class="section" data-section="certifications">
          <div class="section-head">
            <h2>${escapeHtml(t.certifications)}</h2>
          </div>
          <div class="section-body">
            <div class="stack-list">
              ${certifications.map(function(item, index) {
                return `
                  <article class="entry" data-entry-id="${escapeHtml(safeStr(item.id) || ('certification-' + index))}">
                    <div class="entry-top">
                      <div>
                        <div class="entry-title">${escapeHtml(item.name)}</div>
                        <div class="entry-subtitle">${escapeHtml(item.issuer)}</div>
                      </div>
                      ${item.date ? `<div class="entry-date">${escapeHtml(shortDate(item.date, lang))}</div>` : ''}
                    </div>
                  </article>
                `;
              }).join('')}
            </div>
          </div>
        </section>
      ` : '';

      const languagesBlock = languages.length ? `
        <section class="section" data-section="languages">
          <div class="section-head">
            <h2>${escapeHtml(t.languages)}</h2>
          </div>
          <div class="section-body">
            <div class="language-list">
              ${languages.map(function(item, index) {
                const levelKey = safeStr(item.level).toLowerCase();
                const levelLabel = t.levelMap[levelKey] || safeStr(item.level);
                return `
                  <div class="language-item" data-entry-id="${escapeHtml(safeStr(item.id) || ('language-' + index))}">
                    <span class="language-name">${escapeHtml(item.name)}</span>
                    <span class="language-level">${escapeHtml(levelLabel)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </section>
      ` : '';

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #f4efe9;
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
            background:
              radial-gradient(circle at top right, rgba(198, 162, 104, 0.10), transparent 26%),
              linear-gradient(180deg, #211a21 0%, #171217 100%);
            color: #f5f1eb;
            font-family: Georgia, "Times New Roman", serif;
            line-height: 1.42;
          }

          .header {
            margin-bottom: 18px;
            padding: 0 0 14px 0;
            border-bottom: 1px solid rgba(215, 198, 171, 0.35);
          }

          .header-inner {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .name {
            margin: 0;
            font-size: 31px;
            line-height: 1.05;
            letter-spacing: 1.2px;
            font-weight: 400;
            text-transform: uppercase;
            color: #fff8f0;
          }

          .profession {
            margin-top: 6px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            letter-spacing: 2.4px;
            text-transform: uppercase;
            color: #d8bf97;
          }

          .contact {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 10px;
          }

          .contact-item {
            display: inline-flex;
            align-items: center;
            padding: 5px 10px;
            border: 1px solid rgba(216, 191, 151, 0.26);
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.03);
            color: #efe4d5;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            letter-spacing: 0.2px;
          }

          .section {
            margin-top: 18px;
          }

          .section-head {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
          }

          .section-head h2 {
            margin: 0;
            font-size: 22px;
            font-weight: 400;
            line-height: 1.1;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: #fff5ea;
            white-space: nowrap;
          }

          .section-head::after {
            content: "";
            display: block;
            height: 1px;
            flex: 1;
            background: linear-gradient(90deg, rgba(216, 191, 151, 0.85), rgba(216, 191, 151, 0.12));
          }

          .section-body {
            padding-left: 2px;
          }

          .summary,
          .entry-text {
            margin: 0;
            color: #f0e7db;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12.5px;
            line-height: 1.55;
          }

          .pill-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .pill,
          .mini-pill {
            display: inline-flex;
            align-items: center;
            padding: 6px 11px;
            border-radius: 999px;
            border: 1px solid rgba(216, 191, 151, 0.28);
            background: rgba(255, 255, 255, 0.04);
            color: #f7ecde;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11.5px;
          }

          .mini-pill {
            padding: 5px 9px;
            font-size: 10.5px;
            background: rgba(216, 191, 151, 0.08);
          }

          .timeline-list,
          .stack-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .entry {
            position: relative;
            padding: 11px 12px 10px 14px;
            border-left: 2px solid #c6a268;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 0 8px 8px 0;
          }

          .cardish {
            border-left-color: #d8bf97;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 6px;
          }

          .entry-title {
            color: #fff7ee;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 0.2px;
          }

          .entry-subtitle,
          .entry-date,
          .entry-link {
            color: #d9c9b1;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11.5px;
          }

          .entry-date {
            white-space: nowrap;
            text-align: right;
          }

          .entry-link {
            max-width: 45%;
            word-break: break-word;
            text-align: right;
          }

          .sep {
            display: inline-block;
            margin: 0 6px;
            color: #b8955c;
          }

          .bullets {
            margin: 7px 0 0 0;
            padding-left: 18px;
            color: #efe6da;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
          }

          .bullets li {
            margin: 3px 0;
          }

          .tech-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 9px;
          }

          .language-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px 16px;
          }

          .language-item {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            padding: 8px 10px;
            border-bottom: 1px solid rgba(216, 191, 151, 0.18);
            font-family: Arial, Helvetica, sans-serif;
          }

          .language-name {
            color: #fbf3e7;
            font-size: 12.5px;
          }

          .language-level {
            color: #d8bf97;
            font-size: 11.5px;
            text-transform: uppercase;
            letter-spacing: 0.6px;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${headerBlock}
          ${profileBlock}
          ${skillsBlock}
          ${experienceBlock}
          ${projectsBlock}
          ${achievementsBlock}
          ${educationBlock}
          ${certificationsBlock}
          ${languagesBlock}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-bloom-v1')) {
    customElements.define('gqr-resume-bloom-v1', GQRResumeBloomV1);
  }
})();