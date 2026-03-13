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

  function formatDateRange(startDate, endDate, isCurrent, lang, isEducation) {
    const i18n = I18N[lang] || I18N.en;
    const start = formatShortDate(startDate, lang);
    let end = '';

    if (isEducation) {
      end = isCurrent === false ? i18n.present : formatShortDate(endDate, lang);
    } else {
      end = isCurrent ? i18n.present : formatShortDate(endDate, lang);
    }

    if (start && end) return start + ' — ' + end;
    return start || end || '';
  }

  class GQRResumeFlameV2 extends HTMLElement {
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
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      const contactItems = [
        data.email ? `<span class="contact-pill">${escapeHtml('✉ ' + data.email)}</span>` : '',
        data.phone ? `<span class="contact-pill">${escapeHtml('☎ ' + data.phone)}</span>` : '',
        data.country ? `<span class="contact-pill">${escapeHtml('⚲ ' + data.country)}</span>` : '',
        data.linkedin ? `<span class="contact-pill">${escapeHtml('🔗 ' + data.linkedin)}</span>` : ''
      ].filter(Boolean).join('');

      if (!fullName && !profession && !contactItems) return '';

      return `
        <section class="header-card" data-section="header">
          <div class="header-top">
            ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
          </div>
          ${contactItems ? `
            <div class="contact-row" data-section="contact">
              ${contactItems}
            </div>
          ` : ''}
        </section>
      `;
    }

    renderProfile(data, i18n) {
      const summary = safeStr(data.summary).trim();
      if (!summary) return '';
      return `
        <section class="section" data-section="profile">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${escapeHtml(i18n.profile)}</h2>
          </div>
          <div class="section-body">
            <p class="summary">${escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(data, i18n) {
      const combined = [...safeArr(data.skillsRaw), ...safeArr(data.toolsRaw)]
        .map(function(item) { return safeStr(item).trim(); })
        .filter(Boolean);

      const seen = new Set();
      const unique = combined.filter(function(item) {
        const key = item.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      if (!unique.length) return '';

      return `
        <section class="section" data-section="skills">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${escapeHtml(i18n.skills)}</h2>
          </div>
          <div class="section-body">
            <div class="skill-grid">
              ${unique.map(function(skill, index) {
                return `<div class="skill-chip" data-entry-id="skill-${index}">${escapeHtml(skill)}</div>`;
              }).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(data, i18n, lang) {
      const items = safeArr(data.experience).filter(function(item) {
        return item && (item.title || item.company || item.startDate || item.endDate);
      });

      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${escapeHtml(i18n.experience)}</h2>
          </div>
          <div class="section-body">
            ${items.map(function(item, index) {
              const bullets = [...safeArr(item.achievements), ...safeArr(item.responsibilities)]
                .map(function(v) { return safeStr(v).trim(); })
                .filter(Boolean);

              const title = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);
              const dateRange = formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang, false);

              return `
                <article class="entry timeline-entry" data-entry-id="${escapeHtml(item.id || ('experience-' + index))}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-meta">
                          ${company ? `<span>${escapeHtml(company)}</span>` : ''}
                          ${(company && location) ? `<span class="meta-sep">•</span>` : ''}
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
      `;
    }

    renderProjects(data, i18n) {
      const items = safeArr(data.projects).filter(function(item) {
        return item && (item.name || item.description || safeArr(item.technologies).length || item.url);
      });

      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${escapeHtml(i18n.projects)}</h2>
          </div>
          <div class="section-body">
            ${items.map(function(item, index) {
              const technologies = safeArr(item.technologies).map(function(v) {
                return safeStr(v).trim();
              }).filter(Boolean);

              return `
                <article class="entry project-entry" data-entry-id="${escapeHtml(item.id || ('project-' + index))}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${item.name ? `<h3 class="entry-title">${escapeHtml(item.name)}</h3>` : ''}
                      ${item.url ? `<div class="entry-link">${escapeHtml(item.url)}</div>` : ''}
                    </div>
                  </div>
                  ${item.description ? `<p class="entry-text">${escapeHtml(item.description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map(function(tech) {
                        return `<span class="tag">${escapeHtml(tech)}</span>`;
                      }).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements(data, i18n) {
      const items = safeArr(data.achievements).filter(function(item) {
        return item && (item.title || item.description || item.year);
      });

      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${escapeHtml(i18n.achievements)}</h2>
          </div>
          <div class="section-body">
            ${items.map(function(item, index) {
              return `
                <article class="entry achievement-entry" data-entry-id="${escapeHtml(item.id || ('achievement-' + index))}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${item.title ? `<h3 class="entry-title">${escapeHtml(item.title)}</h3>` : ''}
                    </div>
                    ${item.year ? `<div class="entry-date">${escapeHtml(item.year)}</div>` : ''}
                  </div>
                  ${item.description ? `<p class="entry-text">${escapeHtml(item.description)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducation(data, i18n, lang) {
      const items = safeArr(data.education).filter(function(item) {
        return item && (item.degree || item.field || item.institution || item.startDate || item.endDate);
      });

      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${escapeHtml(i18n.education)}</h2>
          </div>
          <div class="section-body">
            ${items.map(function(item, index) {
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);
              const dateRange = formatDateRange(item.startDate, item.endDate, item.isCompleted, lang, true);

              return `
                <article class="entry timeline-entry" data-entry-id="${escapeHtml(item.id || ('education-' + index))}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${(degree || field) ? `
                        <h3 class="entry-title">
                          ${escapeHtml([degree, field].filter(Boolean).join(degree && field ? ' — ' : ''))}
                        </h3>
                      ` : ''}
                      ${institution ? `<div class="entry-meta"><span>${escapeHtml(institution)}</span></div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${gpa ? `<p class="entry-text">GPA: ${escapeHtml(gpa)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(data, i18n, lang) {
      const items = safeArr(data.certifications).filter(function(item) {
        return item && (item.name || item.issuer || item.date);
      });

      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${escapeHtml(i18n.certifications)}</h2>
          </div>
          <div class="section-body">
            ${items.map(function(item, index) {
              const date = item.date ? formatShortDate(item.date, lang) : '';
              return `
                <article class="entry cert-entry" data-entry-id="${escapeHtml(item.id || ('certification-' + index))}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${item.name ? `<h3 class="entry-title">${escapeHtml(item.name)}</h3>` : ''}
                      ${item.issuer ? `<div class="entry-meta"><span>${escapeHtml(item.issuer)}</span></div>` : ''}
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

    renderLanguages(data, i18n) {
      const items = safeArr(data.languages).filter(function(item) {
        return item && item.name;
      });

      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${escapeHtml(i18n.languages)}</h2>
          </div>
          <div class="section-body">
            <div class="language-list">
              ${items.map(function(item, index) {
                const levelKey = safeStr(item.level).toLowerCase();
                const levelText = (i18n.levelMap && i18n.levelMap[levelKey]) || safeStr(item.level);
                return `
                  <div class="language-item" data-entry-id="${escapeHtml(item.id || ('language-' + index))}">
                    <span class="language-name">${escapeHtml(item.name)}</span>
                    <span class="language-sep">—</span>
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
      const data = this._data || {};
      const lang = this.getLanguage();
      const i18n = I18N[lang] || I18N.en;

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #243142;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-family: "Arial", "Helvetica Neue", Helvetica, sans-serif;
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
              radial-gradient(circle at top right, rgba(195, 204, 218, 0.18) 0, rgba(195, 204, 218, 0.18) 100px, transparent 100px),
              linear-gradient(180deg, #f6f8fb 0%, #ffffff 120px);
            color: #243142;
          }

          .header-card {
            position: relative;
            background: linear-gradient(135deg, #33445b 0%, #2e3c50 100%);
            color: #ffffff;
            padding: 22px 24px 18px;
            border-radius: 18px;
            margin-bottom: 18px;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(36, 49, 66, 0.12);
          }

          .header-card::before {
            content: "";
            position: absolute;
            top: -30px;
            right: -20px;
            width: 120px;
            height: 120px;
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 22px;
            transform: rotate(18deg);
          }

          .header-card::after {
            content: "";
            position: absolute;
            right: 22px;
            bottom: 16px;
            width: 64px;
            height: 64px;
            background:
              radial-gradient(circle, rgba(255,255,255,0.18) 2px, transparent 3px);
            background-size: 16px 16px;
            opacity: 0.8;
          }

          .header-top {
            position: relative;
            z-index: 1;
          }

          .name {
            margin: 0;
            font-size: 31px;
            line-height: 1.05;
            font-weight: 800;
            letter-spacing: 0.4px;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 8px;
            font-size: 15px;
            line-height: 1.4;
            color: #dfe6ef;
            font-weight: 500;
          }

          .contact-row {
            position: relative;
            z-index: 1;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 14px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            padding: 7px 10px;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 999px;
            font-size: 12px;
            line-height: 1.2;
            color: #ffffff;
          }

          .section {
            margin-top: 16px;
            background: #ffffff;
            border: 1px solid #dde4ee;
            border-radius: 16px;
            padding: 16px 18px 14px;
            box-shadow: 0 3px 10px rgba(36, 49, 66, 0.04);
          }

          .section-heading {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;
          }

          .section-kicker {
            display: inline-block;
            width: 26px;
            height: 26px;
            border-radius: 8px;
            background: linear-gradient(135deg, #bfc9d8 0%, #8ea0ba 100%);
            position: relative;
            flex: 0 0 auto;
          }

          .section-kicker::after {
            content: "";
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 3px;
            background: rgba(255,255,255,0.8);
            top: 8px;
            left: 8px;
          }

          .section-heading h2 {
            margin: 0;
            font-size: 16px;
            line-height: 1.2;
            font-weight: 800;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            color: #2f3f56;
          }

          .section-body {
            position: relative;
          }

          .summary,
          .entry-text {
            margin: 0;
            font-size: 13px;
            line-height: 1.6;
            color: #46566d;
          }

          .skill-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-chip,
          .tag {
            display: inline-flex;
            align-items: center;
            min-height: 30px;
            padding: 7px 11px;
            border-radius: 999px;
            font-size: 12px;
            line-height: 1.2;
            font-weight: 600;
          }

          .skill-chip {
            background: #eef2f7;
            color: #33445b;
            border: 1px solid #d5deea;
          }

          .entry {
            position: relative;
          }

          .entry + .entry {
            margin-top: 14px;
            padding-top: 14px;
            border-top: 1px solid #e5ebf3;
          }

          .timeline-entry {
            padding-left: 18px;
          }

          .timeline-entry::before {
            content: "";
            position: absolute;
            left: 0;
            top: 7px;
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: #8ea0ba;
            box-shadow: 0 0 0 4px rgba(191, 201, 216, 0.28);
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
          }

          .entry-main {
            min-width: 0;
            flex: 1 1 auto;
          }

          .entry-title {
            margin: 0;
            font-size: 15px;
            line-height: 1.35;
            font-weight: 700;
            color: #243142;
          }

          .entry-meta {
            margin-top: 4px;
            font-size: 12.5px;
            line-height: 1.5;
            color: #66758a;
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            align-items: center;
          }

          .meta-sep {
            color: #9aa8b9;
          }

          .entry-date {
            flex: 0 0 auto;
            white-space: nowrap;
            font-size: 12px;
            line-height: 1.2;
            font-weight: 700;
            color: #5d6f86;
            background: #eef2f7;
            border: 1px solid #dbe3ed;
            border-radius: 999px;
            padding: 6px 10px;
          }

          .bullet-list {
            margin: 10px 0 0 0;
            padding: 0 0 0 18px;
            color: #46566d;
          }

          .bullet-list li {
            margin: 0 0 6px 0;
            font-size: 13px;
            line-height: 1.55;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .project-entry .entry-link {
            margin-top: 4px;
            font-size: 12px;
            line-height: 1.4;
            color: #66758a;
            word-break: break-word;
          }

          .project-entry .entry-text,
          .achievement-entry .entry-text {
            margin-top: 8px;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
          }

          .tag {
            background: #33445b;
            color: #ffffff;
            border: 1px solid #33445b;
            font-weight: 600;
          }

          .language-list {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .language-item {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            align-items: baseline;
            padding: 10px 12px;
            background: #f5f8fc;
            border: 1px solid #dfe6ef;
            border-radius: 12px;
          }

          .language-name {
            font-size: 13px;
            font-weight: 700;
            color: #243142;
          }

          .language-sep,
          .language-level {
            font-size: 13px;
            color: #5b6d84;
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
          ${this.renderProfile(data, i18n)}
          ${this.renderSkills(data, i18n)}
          ${this.renderExperience(data, i18n, lang)}
          ${this.renderProjects(data, i18n)}
          ${this.renderAchievements(data, i18n)}
          ${this.renderEducation(data, i18n, lang)}
          ${this.renderCertifications(data, i18n, lang)}
          ${this.renderLanguages(data, i18n)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-flame-v2')) {
    customElements.define('gqr-resume-flame-v2', GQRResumeFlameV2);
  }
})();