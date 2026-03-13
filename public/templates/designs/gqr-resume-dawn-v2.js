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

  function toDate(value) {
    if (!value) return null;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  function formatShortDate(value, lang) {
    const date = toDate(value);
    if (!date) return '';
    return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  function formatDateRange(startDate, endDate, lang, isCurrent, isCompleted, mode) {
    const start = formatShortDate(startDate, lang);
    let end = '';

    if (mode === 'education') {
      if (isCompleted === false) {
        end = I18N[lang].present;
      } else {
        end = formatShortDate(endDate, lang);
      }
    } else {
      if (isCurrent) {
        end = I18N[lang].present;
      } else {
        end = formatShortDate(endDate, lang);
      }
    }

    if (start && end) return start + ' — ' + end;
    return start || end || '';
  }

  class GQRResumeDawnV2 extends HTMLElement {
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

    renderHeader(header) {
      const fullName = [safeStr(header.firstName), safeStr(header.lastName)].filter(Boolean).join(' ').trim();
      const profession = safeStr(header.profession);

      const contactItems = [
        header.email ? `<span class="contact-pill">${escapeHtml(header.email)}</span>` : '',
        header.phone ? `<span class="contact-pill">${escapeHtml(header.phone)}</span>` : '',
        header.country ? `<span class="contact-pill">${escapeHtml(header.country)}</span>` : '',
        header.linkedin ? `<span class="contact-pill">${escapeHtml(header.linkedin)}</span>` : ''
      ].filter(Boolean).join('');

      if (!fullName && !profession && !contactItems) return '';

      return `
        <section class="header-wrap">
          <div class="hero" data-section="header">
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

    renderProfile(summary, t) {
      if (!safeStr(summary).trim()) return '';
      return `
        <section class="section" data-section="profile">
          <h2 class="section-title">${escapeHtml(t.profile)}</h2>
          <div class="section-body">
            <p class="profile-text">${escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(skillsRaw, toolsRaw, t) {
      const merged = Array.from(new Set(
        [...safeArr(skillsRaw), ...safeArr(toolsRaw)]
          .map(function(item) { return safeStr(item).trim(); })
          .filter(Boolean)
      ));

      if (!merged.length) return '';

      return `
        <section class="section" data-section="skills">
          <h2 class="section-title">${escapeHtml(t.skills)}</h2>
          <div class="section-body">
            <div class="skills-grid">
              ${merged.map(function(skill, index) {
                return `<span class="skill-chip" data-entry-id="skill-${index}">${escapeHtml(skill)}</span>`;
              }).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(experience, lang, t) {
      const items = safeArr(experience).filter(function(item) {
        return item && (safeStr(item.title) || safeStr(item.company));
      });

      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          <h2 class="section-title">${escapeHtml(t.experience)}</h2>
          <div class="section-body timeline">
            ${items.map(function(item, idx) {
              const bullets = [...safeArr(item.achievements), ...safeArr(item.responsibilities)]
                .map(function(b) { return safeStr(b).trim(); })
                .filter(Boolean);

              const title = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);
              const dateRange = formatDateRange(item.startDate, item.endDate, lang, !!item.isCurrent, true, 'experience');
              const entryId = safeStr(item.id) || ('experience-' + idx);

              return `
                <article class="entry" data-entry-id="${escapeHtml(entryId)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${company ? `<span>${escapeHtml(company)}</span>` : ''}
                          ${(company && location) ? `<span class="divider">•</span>` : ''}
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
      `;
    }

    renderProjects(projects, t) {
      const items = safeArr(projects).filter(function(item) {
        return item && safeStr(item.name);
      });

      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          <h2 class="section-title">${escapeHtml(t.projects)}</h2>
          <div class="section-body">
            ${items.map(function(item, idx) {
              const entryId = safeStr(item.id) || ('project-' + idx);
              const tech = safeArr(item.technologies).map(function(x) { return safeStr(x).trim(); }).filter(Boolean);
              return `
                <article class="entry compact" data-entry-id="${escapeHtml(entryId)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      <h3 class="entry-title">${escapeHtml(item.name)}</h3>
                    </div>
                    ${item.url ? `<div class="entry-link">${escapeHtml(item.url)}</div>` : ''}
                  </div>
                  ${item.description ? `<p class="entry-text">${escapeHtml(item.description)}</p>` : ''}
                  ${tech.length ? `
                    <div class="tag-row">
                      ${tech.map(function(tag) {
                        return `<span class="mini-tag">${escapeHtml(tag)}</span>`;
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

    renderAchievements(achievements, t) {
      const items = safeArr(achievements).filter(function(item) {
        return item && (safeStr(item.title) || safeStr(item.description));
      });

      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          <h2 class="section-title">${escapeHtml(t.achievements)}</h2>
          <div class="section-body">
            ${items.map(function(item, idx) {
              const entryId = safeStr(item.id) || ('achievement-' + idx);
              return `
                <article class="entry compact" data-entry-id="${escapeHtml(entryId)}">
                  <div class="entry-top">
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

    renderEducation(education, lang, t) {
      const items = safeArr(education).filter(function(item) {
        return item && (safeStr(item.degree) || safeStr(item.institution));
      });

      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          <h2 class="section-title">${escapeHtml(t.education)}</h2>
          <div class="section-body timeline">
            ${items.map(function(item, idx) {
              const entryId = safeStr(item.id) || ('education-' + idx);
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);
              const dateRange = formatDateRange(item.startDate, item.endDate, lang, false, item.isCompleted, 'education');

              return `
                <article class="entry" data-entry-id="${escapeHtml(entryId)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      ${(degree || field) ? `
                        <h3 class="entry-title">
                          ${escapeHtml([degree, field].filter(Boolean).join(degree && field ? ' — ' : ''))}
                        </h3>
                      ` : ''}
                      ${institution ? `<div class="entry-subtitle">${escapeHtml(institution)}</div>` : ''}
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

    renderCertifications(certifications, lang, t) {
      const items = safeArr(certifications).filter(function(item) {
        return item && safeStr(item.name);
      });

      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          <h2 class="section-title">${escapeHtml(t.certifications)}</h2>
          <div class="section-body">
            ${items.map(function(item, idx) {
              const entryId = safeStr(item.id) || ('certification-' + idx);
              const certDate = formatShortDate(item.date, lang);
              return `
                <article class="entry compact" data-entry-id="${escapeHtml(entryId)}">
                  <div class="entry-top">
                    <div class="entry-main">
                      <h3 class="entry-title">${escapeHtml(item.name)}</h3>
                      ${item.issuer ? `<div class="entry-subtitle">${escapeHtml(item.issuer)}</div>` : ''}
                    </div>
                    ${certDate ? `<div class="entry-date">${escapeHtml(certDate)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderLanguages(languages, t) {
      const items = safeArr(languages).filter(function(item) {
        return item && safeStr(item.name);
      });

      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          <h2 class="section-title">${escapeHtml(t.languages)}</h2>
          <div class="section-body">
            <div class="language-list">
              ${items.map(function(item, idx) {
                const entryId = safeStr(item.id) || ('language-' + idx);
                const rawLevel = safeStr(item.level).toLowerCase();
                const levelLabel = t.levelMap[rawLevel] || rawLevel;
                return `
                  <div class="language-item" data-entry-id="${escapeHtml(entryId)}">
                    <span class="language-name">${escapeHtml(item.name)}</span>
                    <span class="language-sep">—</span>
                    <span class="language-level">${escapeHtml(levelLabel)}</span>
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
      const t = I18N[lang];

      const header = {
        firstName: safeStr(data.firstName),
        lastName: safeStr(data.lastName),
        profession: safeStr(data.profession),
        email: safeStr(data.email),
        phone: safeStr(data.phone),
        country: safeStr(data.country),
        linkedin: safeStr(data.linkedin)
      };

      const html = `
        <style>
          :host {
            display: block;
            color: #1f1f1f;
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
            color: #232323;
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
            height: 14mm;
            background:
              linear-gradient(90deg, #1a1a1a 0%, #2b2b2b 55%, #5b5554 100%);
          }

          .header-wrap {
            margin-top: 4mm;
            margin-bottom: 8mm;
            border: 1px solid #d8d2cf;
          }

          .hero {
            background: #1f1f1f;
            color: #ffffff;
            padding: 14mm 10mm 8mm;
            position: relative;
          }

          .hero::after {
            content: "";
            position: absolute;
            left: 10mm;
            bottom: 0;
            width: 42mm;
            height: 1.5mm;
            background: #8b817c;
          }

          .name {
            margin: 0;
            font-size: 30px;
            line-height: 1.08;
            letter-spacing: 0.03em;
            font-weight: 700;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 8px;
            font-size: 12px;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: #d2cac7;
          }

          .contact-row {
            background: #f3f0ee;
            padding: 10px 10mm 11px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            border-top: 1px solid #d8d2cf;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            padding: 6px 10px;
            background: #ffffff;
            border: 1px solid #d2cac7;
            border-radius: 999px;
            font-size: 11px;
            color: #45403e;
            max-width: 100%;
            word-break: break-word;
          }

          .section {
            margin-top: 8mm;
          }

          .section-title {
            margin: 0 0 10px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #2a2a2a;
          }

          .section-title::before {
            content: "";
            width: 12px;
            height: 12px;
            background: #1f1f1f;
            display: inline-block;
          }

          .section-title::after {
            content: "";
            flex: 1;
            height: 1px;
            background: linear-gradient(90deg, #8b817c, #d8d2cf);
          }

          .section-body {
            padding-left: 24px;
          }

          .profile-text,
          .entry-text {
            margin: 0;
            font-size: 13px;
            color: #474240;
          }

          .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-chip {
            display: inline-block;
            padding: 7px 11px;
            border: 1px solid #cfc7c3;
            background: #f6f3f1;
            border-radius: 3px;
            font-size: 11px;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: #383433;
          }

          .timeline .entry,
          .section-body > .entry {
            position: relative;
            padding: 0 0 12px 0;
            margin-bottom: 12px;
            border-bottom: 1px solid #ece7e4;
          }

          .timeline .entry:last-child,
          .section-body > .entry:last-child {
            margin-bottom: 0;
            border-bottom: none;
            padding-bottom: 0;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 14px;
            margin-bottom: 6px;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-size: 15px;
            line-height: 1.25;
            font-weight: 700;
            color: #1f1f1f;
          }

          .entry-subtitle {
            margin-top: 3px;
            font-size: 12px;
            color: #6a625f;
          }

          .divider {
            margin: 0 6px;
          }

          .entry-date,
          .entry-link {
            flex-shrink: 0;
            font-size: 11px;
            color: #6b625e;
            background: #f3f0ee;
            border: 1px solid #ddd6d2;
            padding: 5px 8px;
            border-radius: 2px;
            white-space: nowrap;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 0 0 5px 0;
            font-size: 13px;
            color: #474240;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .compact .entry-top {
            margin-bottom: 4px;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
          }

          .mini-tag {
            display: inline-block;
            font-size: 10px;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            padding: 5px 8px;
            background: #1f1f1f;
            color: #ffffff;
            border-radius: 2px;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .language-item {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            color: #403b39;
            padding-bottom: 8px;
            border-bottom: 1px solid #ece7e4;
          }

          .language-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .language-name {
            font-weight: 700;
            color: #222222;
          }

          .language-level {
            color: #6a625f;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${this.renderHeader(header)}
          ${this.renderProfile(data.summary, t)}
          ${this.renderSkills(data.skillsRaw, data.toolsRaw, t)}
          ${this.renderExperience(data.experience, lang, t)}
          ${this.renderProjects(data.projects, t)}
          ${this.renderAchievements(data.achievements, t)}
          ${this.renderEducation(data.education, lang, t)}
          ${this.renderCertifications(data.certifications, lang, t)}
          ${this.renderLanguages(data.languages, t)}
        </div>
      `;

      this.shadowRoot.innerHTML = html;
    }
  }

  if (!customElements.get('gqr-resume-dawn-v2')) {
    customElements.define('gqr-resume-dawn-v2', GQRResumeDawnV2);
  }
})();