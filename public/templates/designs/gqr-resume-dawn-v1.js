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
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return escapeHtml(value);

    const months = lang === 'es'
      ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return months[date.getMonth()] + ' ' + date.getFullYear();
  }

  function formatDateRange(startDate, endDate, isCurrent, lang, presentLabel) {
    const start = formatShortDate(startDate, lang);
    const end = isCurrent ? presentLabel : formatShortDate(endDate, lang);
    if (start && end) return start + ' — ' + end;
    if (start) return start;
    if (end) return end;
    return '';
  }

  function formatEducationDateRange(startDate, endDate, isCompleted, lang, presentLabel) {
    const start = formatShortDate(startDate, lang);
    const end = isCompleted === false ? presentLabel : formatShortDate(endDate, lang);
    if (start && end) return start + ' — ' + end;
    if (start) return start;
    if (end) return end;
    return '';
  }

  class GQRResumeDawnV1 extends HTMLElement {
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

    attributeChangedCallback() {
      this.render();
    }

    getLanguage() {
      const attrLang = safeStr(this.getAttribute('language')).toLowerCase();
      const dataLang = safeStr(this._data && this._data.language).toLowerCase();
      const lang = attrLang || dataLang || 'en';
      return lang === 'es' ? 'es' : 'en';
    }

    renderSectionTitle(title) {
      return `
        <div class="section-heading-wrap">
          <h2 class="section-heading">${escapeHtml(title)}</h2>
          <div class="section-rule"></div>
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

      const rawSkills = safeArr(data.skillsRaw);
      const rawTools = safeArr(data.toolsRaw);
      const mergedSkills = Array.from(
        new Set(
          rawSkills
            .concat(rawTools)
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

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      const contactItems = [
        email ? `<span class="contact-item"><span class="contact-icon">✉</span><span>${escapeHtml(email)}</span></span>` : '',
        phone ? `<span class="contact-item"><span class="contact-icon">☎</span><span>${escapeHtml(phone)}</span></span>` : '',
        country ? `<span class="contact-item"><span class="contact-icon">⚲</span><span>${escapeHtml(country)}</span></span>` : '',
        linkedin ? `<span class="contact-item"><span class="contact-icon">🔗</span><span>${escapeHtml(linkedin)}</span></span>` : ''
      ].filter(Boolean).join('');

      const headerHtml = (fullName || profession || contactItems) ? `
        <section class="header" data-section="header">
          <div class="header-top">
            ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
          </div>
          ${contactItems ? `<div class="contact-row" data-section="contact">${contactItems}</div>` : ''}
        </section>
      ` : '';

      const profileHtml = summary ? `
        <section class="section" data-section="profile">
          ${this.renderSectionTitle(t.profile)}
          <div class="profile-text">${escapeHtml(summary)}</div>
        </section>
      ` : '';

      const skillsHtml = mergedSkills.length ? `
        <section class="section" data-section="skills">
          ${this.renderSectionTitle(t.skills)}
          <div class="skills-grid">
            ${mergedSkills.map(function(skill, index) {
              return `<div class="skill-pill" data-entry-id="skill-${index}">${escapeHtml(skill)}</div>`;
            }).join('')}
          </div>
        </section>
      ` : '';

      const experienceHtml = experience.length ? `
        <section class="section" data-section="experience">
          ${this.renderSectionTitle(t.experience)}
          <div class="entries">
            ${experience.map(function(item, index) {
              const id = safeStr(item.id) || ('experience-' + index);
              const bullets = safeArr(item.achievements).concat(safeArr(item.responsibilities))
                .map(function(b) { return safeStr(b).trim(); })
                .filter(Boolean);
              const dateRange = formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang, t.present);
              const title = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
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
      ` : '';

      const projectsHtml = projects.length ? `
        <section class="section" data-section="projects">
          ${this.renderSectionTitle(t.projects)}
          <div class="entries">
            ${projects.map(function(item, index) {
              const id = safeStr(item.id) || ('project-' + index);
              const name = safeStr(item.name);
              const description = safeStr(item.description);
              const techs = safeArr(item.technologies).map(function(tech) {
                return safeStr(tech).trim();
              }).filter(Boolean);
              const url = safeStr(item.url);

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
                      ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                    </div>
                    ${url ? `<div class="entry-link">${escapeHtml(url)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${escapeHtml(description)}</div>` : ''}
                  ${techs.length ? `
                    <div class="tag-row">
                      ${techs.map(function(tech) {
                        return `<span class="tag">${escapeHtml(tech)}</span>`;
                      }).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const achievementsHtml = achievements.length ? `
        <section class="section" data-section="achievements">
          ${this.renderSectionTitle(t.achievements)}
          <div class="entries">
            ${achievements.map(function(item, index) {
              const id = safeStr(item.id) || ('achievement-' + index);
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
                  ${description ? `<div class="entry-text">${escapeHtml(description)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const educationHtml = education.length ? `
        <section class="section" data-section="education">
          ${this.renderSectionTitle(t.education)}
          <div class="entries">
            ${education.map(function(item, index) {
              const id = safeStr(item.id) || ('education-' + index);
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);
              const dateRange = formatEducationDateRange(item.startDate, item.endDate, item.isCompleted, lang, t.present);

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
                      ${(degree || field) ? `
                        <h3 class="entry-title">
                          ${escapeHtml([degree, field].filter(Boolean).join(degree && field ? ' — ' : ''))}
                        </h3>
                      ` : ''}
                      ${institution ? `<div class="entry-meta"><span>${escapeHtml(institution)}</span></div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${gpa ? `<div class="entry-text">GPA: ${escapeHtml(gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const certificationsHtml = certifications.length ? `
        <section class="section" data-section="certifications">
          ${this.renderSectionTitle(t.certifications)}
          <div class="entries">
            ${certifications.map(function(item, index) {
              const id = safeStr(item.id) || ('certification-' + index);
              const name = safeStr(item.name);
              const issuer = safeStr(item.issuer);
              const date = formatShortDate(item.date, lang);

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
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
      ` : '';

      const languagesHtml = languages.length ? `
        <section class="section" data-section="languages">
          ${this.renderSectionTitle(t.languages)}
          <div class="language-list">
            ${languages.map(function(item, index) {
              const id = safeStr(item.id) || ('language-' + index);
              const name = safeStr(item.name);
              const levelKey = safeStr(item.level).toLowerCase();
              const levelLabel = (t.levelMap && t.levelMap[levelKey]) ? t.levelMap[levelKey] : levelKey;
              const levelScoreMap = { basic: 1, intermediate: 2, advanced: 3, native: 4 };
              const score = levelScoreMap[levelKey] || 0;

              return `
                <div class="language-item" data-entry-id="${escapeHtml(id)}">
                  <div class="language-top">
                    <span class="language-name">${escapeHtml(name)}</span>
                    <span class="language-level">${escapeHtml(levelLabel)}</span>
                  </div>
                  <div class="dots" aria-hidden="true">
                    ${[1, 2, 3, 4].map(function(n) {
                      return `<span class="dot ${n <= score ? 'filled' : ''}"></span>`;
                    }).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #1f1f1f;
            font-family: Arial, Helvetica, sans-serif;
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
            padding: 0;
          }

          .sheet {
            min-height: 297mm;
            background:
              linear-gradient(180deg, #1c1c1c 0, #1c1c1c 56mm, #ffffff 56mm, #ffffff 100%);
          }

          .header {
            padding: 34px 38px 22px;
            background: linear-gradient(135deg, #151515 0%, #232323 100%);
            color: #ffffff;
            border-bottom: 10px solid #5a5559;
            position: relative;
          }

          .header::after {
            content: '';
            position: absolute;
            right: 24px;
            top: 18px;
            width: 56px;
            height: 56px;
            border-top: 2px solid rgba(255,255,255,0.2);
            border-right: 2px solid rgba(255,255,255,0.2);
          }

          .header-top {
            display: block;
          }

          .name {
            margin: 0;
            font-size: 34px;
            line-height: 1.05;
            font-weight: 700;
            letter-spacing: 0.4px;
            text-transform: none;
          }

          .profession {
            margin-top: 10px;
            color: #d6d0d4;
            font-size: 12px;
            line-height: 1.4;
            letter-spacing: 3px;
            text-transform: uppercase;
          }

          .contact-row {
            margin-top: 18px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px 12px;
          }

          .contact-item {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 6px 10px;
            border: 1px solid rgba(255,255,255,0.18);
            background: rgba(255,255,255,0.06);
            color: #f4f4f4;
            font-size: 11px;
            line-height: 1.3;
            border-radius: 999px;
          }

          .contact-icon {
            font-size: 11px;
            opacity: 0.9;
          }

          .section {
            padding: 20px 38px 0;
          }

          .section:first-of-type {
            padding-top: 26px;
          }

          .section-heading-wrap {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
          }

          .section-heading {
            margin: 0;
            flex: 0 0 auto;
            font-size: 13px;
            line-height: 1.2;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #222222;
          }

          .section-rule {
            height: 1px;
            flex: 1 1 auto;
            background: linear-gradient(90deg, #6a6569 0%, #d3d0d2 100%);
          }

          .profile-text,
          .entry-text {
            font-size: 12.5px;
            line-height: 1.65;
            color: #343434;
          }

          .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-pill,
          .tag {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 6px 11px;
            border-radius: 999px;
            border: 1px solid #cfc9cd;
            background: #f5f3f4;
            color: #2f2f2f;
            font-size: 11.5px;
            line-height: 1.2;
          }

          .entries {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .entry {
            padding-bottom: 14px;
            border-bottom: 1px solid #e7e3e5;
          }

          .entry:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .entry.compact {
            padding-bottom: 12px;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 6px;
          }

          .entry-head-main {
            min-width: 0;
            flex: 1 1 auto;
          }

          .entry-title {
            margin: 0;
            font-size: 15px;
            line-height: 1.35;
            font-weight: 700;
            color: #191919;
          }

          .entry-meta {
            margin-top: 3px;
            font-size: 11.5px;
            line-height: 1.5;
            color: #666066;
          }

          .sep {
            margin: 0 6px;
          }

          .entry-date,
          .entry-link {
            flex: 0 0 auto;
            font-size: 11.5px;
            line-height: 1.4;
            color: #575257;
            text-align: right;
            white-space: nowrap;
          }

          .entry-link {
            max-width: 42%;
            overflow-wrap: anywhere;
            white-space: normal;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 0 0 5px 0;
            font-size: 12.3px;
            line-height: 1.6;
            color: #333333;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            margin-top: 10px;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .language-item {
            padding-bottom: 10px;
            border-bottom: 1px solid #e7e3e5;
          }

          .language-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .language-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 14px;
          }

          .language-name {
            font-size: 13px;
            font-weight: 700;
            color: #1e1e1e;
          }

          .language-level {
            font-size: 11.5px;
            color: #5f5a5e;
          }

          .dots {
            display: flex;
            gap: 6px;
            margin-top: 7px;
          }

          .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 1px solid #6d686c;
            background: transparent;
          }

          .dot.filled {
            background: #5c565a;
          }

          .footer-space {
            height: 26px;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          <div class="sheet">
            ${headerHtml}
            ${profileHtml}
            ${skillsHtml}
            ${experienceHtml}
            ${projectsHtml}
            ${achievementsHtml}
            ${educationHtml}
            ${certificationsHtml}
            ${languagesHtml}
            <div class="footer-space"></div>
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-dawn-v1')) {
    customElements.define('gqr-resume-dawn-v1', GQRResumeDawnV1);
  }
})();