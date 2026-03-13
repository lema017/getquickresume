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
      experience: 'Experiencia Profesional',
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

  function formatShortDate(value, lang) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return escapeHtml(value);
    return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      month: 'short',
      year: 'numeric'
    }).format(d);
  }

  function formatDateRange(startDate, endDate, isCurrentLike, lang, presentLabel) {
    const start = formatShortDate(startDate, lang);
    const end = isCurrentLike ? formatShortDate(endDate, lang) : presentLabel;
    if (start && end) return start + ' — ' + end;
    return start || end || '';
  }

  class GQRResumeBloomV2 extends HTMLElement {
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
      return attrLang === 'es' || attrLang === 'en'
        ? attrLang
        : (dataLang === 'es' || dataLang === 'en' ? dataLang : 'en');
    }

    renderSectionTitle(title) {
      return `
        <div class="section-head">
          <h2>${escapeHtml(title)}</h2>
          <span class="section-line"></span>
        </div>
      `;
    }

    render() {
      const data = this._data || {};
      const lang = this.getLanguage();
      const t = I18N[lang] || I18N.en;

      const firstName = safeStr(data.firstName);
      const lastName = safeStr(data.lastName);
      const profession = safeStr(data.profession);
      const email = safeStr(data.email);
      const phone = safeStr(data.phone);
      const country = safeStr(data.country);
      const linkedin = safeStr(data.linkedin);
      const summary = safeStr(data.summary);

      const experience = safeArr(data.experience);
      const projects = safeArr(data.projects);
      const achievements = safeArr(data.achievements);
      const education = safeArr(data.education);
      const certifications = safeArr(data.certifications);
      const languages = safeArr(data.languages);

      const combinedSkills = Array.from(
        new Set(
          safeArr(data.skillsRaw)
            .concat(safeArr(data.toolsRaw))
            .map(function(item) { return safeStr(item).trim(); })
            .filter(Boolean)
        )
      );

      const contactItems = [
        email ? `<span class="contact-pill">✉ ${escapeHtml(email)}</span>` : '',
        phone ? `<span class="contact-pill">☎ ${escapeHtml(phone)}</span>` : '',
        country ? `<span class="contact-pill">⚲ ${escapeHtml(country)}</span>` : '',
        linkedin ? `<span class="contact-pill">🔗 ${escapeHtml(linkedin)}</span>` : ''
      ].filter(Boolean);

      const headerSection = (firstName || lastName || profession || contactItems.length)
        ? `
          <section class="header-card" data-section="header">
            <div class="header-inner">
              <div class="name-block">
                ${(firstName || lastName) ? `<h1 class="name">${escapeHtml((firstName + ' ' + lastName).trim())}</h1>` : ''}
                ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
              </div>
              ${contactItems.length ? `<div class="contact-row" data-section="contact">${contactItems.join('')}</div>` : ''}
            </div>
          </section>
        `
        : '';

      const profileSection = summary
        ? `
          <section class="section" data-section="profile">
            ${this.renderSectionTitle(t.profile)}
            <div class="section-body prose">
              <p>${escapeHtml(summary)}</p>
            </div>
          </section>
        `
        : '';

      const skillsSection = combinedSkills.length
        ? `
          <section class="section" data-section="skills">
            ${this.renderSectionTitle(t.skills)}
            <div class="section-body">
              <div class="skills-grid">
                ${combinedSkills.map(function(skill, index) {
                  return `<span class="skill-chip" data-entry-id="skill-${index}">${escapeHtml(skill)}</span>`;
                }).join('')}
              </div>
            </div>
          </section>
        `
        : '';

      const experienceSection = experience.length
        ? `
          <section class="section" data-section="experience">
            ${this.renderSectionTitle(t.experience)}
            <div class="section-body timeline">
              ${experience.map((item, index) => {
                const id = safeStr(item.id) || ('experience-' + index);
                const title = safeStr(item.title);
                const company = safeStr(item.company);
                const location = safeStr(item.location);
                const bullets = safeArr(item.achievements).concat(safeArr(item.responsibilities)).filter(Boolean);
                const dateRange = formatDateRange(
                  item.startDate,
                  item.endDate,
                  !!item.isCurrent,
                  lang,
                  t.present
                );

                return `
                  <article class="entry" data-entry-id="${escapeHtml(id)}">
                    <div class="entry-top">
                      <div class="entry-heading">
                        ${title ? `<h3>${escapeHtml(title)}</h3>` : ''}
                        ${(company || location) ? `
                          <div class="entry-subtitle">
                            ${company ? `<span>${escapeHtml(company)}</span>` : ''}
                            ${(company && location) ? `<span class="dot">•</span>` : ''}
                            ${location ? `<span>${escapeHtml(location)}</span>` : ''}
                          </div>
                        ` : ''}
                      </div>
                      ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                    </div>
                    ${bullets.length ? `
                      <ul class="bullet-list">
                        ${bullets.map(function(b) {
                          return `<li>${escapeHtml(b)}</li>`;
                        }).join('')}
                      </ul>
                    ` : ''}
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      const projectsSection = projects.length
        ? `
          <section class="section" data-section="projects">
            ${this.renderSectionTitle(t.projects)}
            <div class="section-body">
              ${projects.map((item, index) => {
                const id = safeStr(item.id) || ('project-' + index);
                const name = safeStr(item.name);
                const description = safeStr(item.description);
                const technologies = safeArr(item.technologies).filter(Boolean);
                const url = safeStr(item.url);

                return `
                  <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                    <div class="entry-top">
                      <div class="entry-heading">
                        ${name ? `<h3>${escapeHtml(name)}</h3>` : ''}
                        ${url ? `<div class="entry-link">${escapeHtml(url)}</div>` : ''}
                      </div>
                    </div>
                    ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                    ${technologies.length ? `
                      <div class="tag-row">
                        ${technologies.map(function(tech, techIndex) {
                          return `<span class="mini-tag" data-entry-id="${escapeHtml(id)}-tech-${techIndex}">${escapeHtml(tech)}</span>`;
                        }).join('')}
                      </div>
                    ` : ''}
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      const achievementsSection = achievements.length
        ? `
          <section class="section" data-section="achievements">
            ${this.renderSectionTitle(t.achievements)}
            <div class="section-body">
              ${achievements.map((item, index) => {
                const id = safeStr(item.id) || ('achievement-' + index);
                const title = safeStr(item.title);
                const description = safeStr(item.description);
                const year = safeStr(item.year);

                return `
                  <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                    <div class="entry-top">
                      <div class="entry-heading">
                        ${title ? `<h3>${escapeHtml(title)}</h3>` : ''}
                      </div>
                      ${year ? `<div class="entry-date">${escapeHtml(year)}</div>` : ''}
                    </div>
                    ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      const educationSection = education.length
        ? `
          <section class="section" data-section="education">
            ${this.renderSectionTitle(t.education)}
            <div class="section-body timeline">
              ${education.map((item, index) => {
                const id = safeStr(item.id) || ('education-' + index);
                const degree = safeStr(item.degree);
                const field = safeStr(item.field);
                const institution = safeStr(item.institution);
                const gpa = safeStr(item.gpa);
                const dateRange = formatDateRange(
                  item.startDate,
                  item.endDate,
                  !!item.isCompleted,
                  lang,
                  t.present
                );

                return `
                  <article class="entry" data-entry-id="${escapeHtml(id)}">
                    <div class="entry-top">
                      <div class="entry-heading">
                        ${(degree || field) ? `<h3>${escapeHtml([degree, field].filter(Boolean).join(' — '))}</h3>` : ''}
                        ${(institution || gpa) ? `
                          <div class="entry-subtitle">
                            ${institution ? `<span>${escapeHtml(institution)}</span>` : ''}
                            ${(institution && gpa) ? `<span class="dot">•</span>` : ''}
                            ${gpa ? `<span>GPA: ${escapeHtml(gpa)}</span>` : ''}
                          </div>
                        ` : ''}
                      </div>
                      ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                    </div>
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      const certificationsSection = certifications.length
        ? `
          <section class="section" data-section="certifications">
            ${this.renderSectionTitle(t.certifications)}
            <div class="section-body">
              ${certifications.map((item, index) => {
                const id = safeStr(item.id) || ('certification-' + index);
                const name = safeStr(item.name);
                const issuer = safeStr(item.issuer);
                const date = formatShortDate(item.date, lang);

                return `
                  <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                    <div class="entry-top">
                      <div class="entry-heading">
                        ${name ? `<h3>${escapeHtml(name)}</h3>` : ''}
                        ${issuer ? `<div class="entry-subtitle"><span>${escapeHtml(issuer)}</span></div>` : ''}
                      </div>
                      ${date ? `<div class="entry-date">${escapeHtml(date)}</div>` : ''}
                    </div>
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      const languagesSection = languages.length
        ? `
          <section class="section" data-section="languages">
            ${this.renderSectionTitle(t.languages)}
            <div class="section-body">
              <div class="language-list">
                ${languages.map((item, index) => {
                  const id = safeStr(item.id) || ('language-' + index);
                  const name = safeStr(item.name);
                  const levelKey = safeStr(item.level).toLowerCase();
                  const level = (t.levelMap && t.levelMap[levelKey]) ? t.levelMap[levelKey] : safeStr(item.level);

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
        `
        : '';

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #231f20;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-family: Arial, Helvetica, sans-serif;
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
            color: #231f20;
            padding: 36px 38px 40px;
            margin: 0 auto;
            position: relative;
          }

          .page::before {
            content: "";
            position: absolute;
            top: 0;
            left: 24px;
            right: 24px;
            height: 10px;
            background:
              linear-gradient(90deg, #c6b7a0 0%, #f1ece3 35%, #8f7a67 100%);
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
          }

          .header-card {
            background: linear-gradient(135deg, #241f22 0%, #2d2529 100%);
            color: #f6f1ea;
            padding: 30px 28px 22px;
            border-radius: 16px;
            margin-top: 10px;
            margin-bottom: 26px;
            box-shadow: 0 10px 24px rgba(36, 31, 34, 0.10);
            border: 1px solid rgba(198, 183, 160, 0.24);
          }

          .header-inner {
            display: block;
          }

          .name-block {
            margin-bottom: 16px;
          }

          .name {
            margin: 0;
            font-family: Georgia, "Times New Roman", serif;
            font-size: 32px;
            line-height: 1.1;
            letter-spacing: 0.8px;
            font-weight: 400;
            text-transform: uppercase;
            color: #f7f0e7;
          }

          .profession {
            margin-top: 8px;
            font-size: 13px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #d7c7b1;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            padding: 7px 10px;
            border: 1px solid rgba(215, 199, 177, 0.28);
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.04);
            color: #f1e8dc;
            font-size: 12px;
            line-height: 1.2;
          }

          .section {
            margin-bottom: 24px;
          }

          .section-head {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
          }

          .section-head h2 {
            margin: 0;
            font-family: Georgia, "Times New Roman", serif;
            font-size: 22px;
            line-height: 1.1;
            font-weight: 400;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            color: #2a2327;
            white-space: nowrap;
          }

          .section-line {
            display: block;
            height: 1px;
            flex: 1;
            background: linear-gradient(90deg, #9b866f 0%, #d9cdbd 65%, transparent 100%);
          }

          .section-body {
            padding-left: 2px;
          }

          .prose p,
          .entry-text {
            margin: 0;
            font-size: 13.5px;
            line-height: 1.65;
            color: #3b3438;
          }

          .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-chip,
          .mini-tag {
            display: inline-flex;
            align-items: center;
            border: 1px solid #cdbda9;
            color: #332c30;
            background: #f7f2eb;
            border-radius: 999px;
            padding: 6px 11px;
            font-size: 12px;
            line-height: 1.2;
          }

          .timeline .entry,
          .section-body > .entry {
            position: relative;
            padding: 0 0 16px 0;
            margin-bottom: 16px;
            border-bottom: 1px solid #e7ddd1;
          }

          .timeline .entry:last-child,
          .section-body > .entry:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 14px;
            margin-bottom: 8px;
          }

          .entry-heading {
            flex: 1;
            min-width: 0;
          }

          .entry h3 {
            margin: 0;
            font-size: 15px;
            line-height: 1.35;
            color: #221d20;
            font-weight: 700;
          }

          .entry-subtitle {
            margin-top: 4px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 6px;
            color: #75675a;
            font-size: 12.5px;
            line-height: 1.4;
          }

          .entry-date,
          .entry-link {
            color: #8b7763;
            font-size: 12.5px;
            line-height: 1.4;
            white-space: nowrap;
            text-align: right;
          }

          .dot {
            color: #b19c87;
          }

          .bullet-list {
            margin: 0;
            padding-left: 18px;
            color: #3a3337;
          }

          .bullet-list li {
            margin: 0 0 5px 0;
            font-size: 13px;
            line-height: 1.55;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .compact .entry-top {
            margin-bottom: 6px;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            margin-top: 10px;
          }

          .language-list {
            display: grid;
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .language-item {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            gap: 6px;
            padding: 8px 0;
            border-bottom: 1px solid #ebe2d6;
            font-size: 13px;
            line-height: 1.5;
          }

          .language-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .language-name {
            font-weight: 700;
            color: #241f22;
          }

          .language-sep,
          .language-level {
            color: #6f6256;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${headerSection}
          ${profileSection}
          ${skillsSection}
          ${experienceSection}
          ${projectsSection}
          ${achievementsSection}
          ${educationSection}
          ${certificationsSection}
          ${languagesSection}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-bloom-v2')) {
    customElements.define('gqr-resume-bloom-v2', GQRResumeBloomV2);
  }
})();