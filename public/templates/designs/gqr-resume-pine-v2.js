(function() {
  'use strict';

  const I18N = {
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
    },
    en: {
      profile: 'Profile',
      experience: 'Experience',
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

  function uniqueId(prefix, index) {
    return prefix + '-' + index;
  }

  function toDate(value) {
    if (!value) return null;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  function formatShortDate(value, lang) {
    const d = toDate(value);
    if (!d) return '';
    return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      month: 'short',
      year: 'numeric'
    }).format(d);
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

  class GQRResumePineV2 extends HTMLElement {
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

    renderHeader(d) {
      const firstName = safeStr(d.firstName);
      const lastName = safeStr(d.lastName);
      const fullName = (firstName + ' ' + lastName).trim();
      const profession = safeStr(d.profession);

      const contacts = [
        d.email ? '✉ ' + safeStr(d.email) : '',
        d.phone ? '☎ ' + safeStr(d.phone) : '',
        d.country ? '⚲ ' + safeStr(d.country) : '',
        d.linkedin ? '🔗 ' + safeStr(d.linkedin) : ''
      ].filter(Boolean);

      if (!fullName && !profession && !contacts.length) return '';

      return `
        <section class="header" data-section="header">
          <div class="header-top">
            ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
          </div>
          ${contacts.length ? `
            <div class="contact-row" data-section="contact">
              ${contacts.map(function(item, idx) {
                return `<div class="contact-pill" data-entry-id="${escapeHtml(uniqueId('contact', idx))}">${escapeHtml(item)}</div>`;
              }).join('')}
            </div>
          ` : ''}
        </section>
      `;
    }

    renderProfile(summary, t) {
      const text = safeStr(summary).trim();
      if (!text) return '';
      return `
        <section class="section" data-section="profile">
          <div class="section-title">${escapeHtml(t.profile)}</div>
          <div class="section-body prose">
            <p>${escapeHtml(text)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(skillsRaw, toolsRaw, t) {
      const merged = Array.from(new Set(
        safeArr(skillsRaw)
          .concat(safeArr(toolsRaw))
          .map(function(item) { return safeStr(item).trim(); })
          .filter(Boolean)
      ));

      if (!merged.length) return '';

      return `
        <section class="section" data-section="skills">
          <div class="section-title">${escapeHtml(t.skills)}</div>
          <div class="section-body">
            <div class="chip-list">
              ${merged.map(function(skill, idx) {
                return `<span class="chip" data-entry-id="${escapeHtml('skill-' + idx)}">${escapeHtml(skill)}</span>`;
              }).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(items, t, lang) {
      const list = safeArr(items).filter(function(item) {
        return item && (item.title || item.company || item.startDate || item.endDate || safeArr(item.achievements).length || safeArr(item.responsibilities).length);
      });

      if (!list.length) return '';

      return `
        <section class="section" data-section="experience">
          <div class="section-title">${escapeHtml(t.experience)}</div>
          <div class="section-body timeline">
            ${list.map(function(item, idx) {
              const bullets = safeArr(item.achievements).concat(safeArr(item.responsibilities))
                .map(function(b) { return safeStr(b).trim(); })
                .filter(Boolean);

              const range = formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang, t.present);
              const role = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);
              const entryId = safeStr(item.id) || uniqueId('experience', idx);

              return `
                <article class="entry" data-entry-id="${escapeHtml(entryId)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${role ? `<h3 class="entry-title">${escapeHtml(role)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${company ? `<span>${escapeHtml(company)}</span>` : ''}
                          ${(company && location) ? `<span class="sep">•</span>` : ''}
                          ${location ? `<span>${escapeHtml(location)}</span>` : ''}
                        </div>
                      ` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${escapeHtml(range)}</div>` : ''}
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

    renderProjects(items, t) {
      const list = safeArr(items).filter(function(item) {
        return item && (item.name || item.description || safeArr(item.technologies).length || item.url);
      });

      if (!list.length) return '';

      return `
        <section class="section" data-section="projects">
          <div class="section-title">${escapeHtml(t.projects)}</div>
          <div class="section-body stack">
            ${list.map(function(item, idx) {
              const entryId = safeStr(item.id) || uniqueId('project', idx);
              const technologies = safeArr(item.technologies)
                .map(function(x) { return safeStr(x).trim(); })
                .filter(Boolean);

              return `
                <article class="entry project-entry" data-entry-id="${escapeHtml(entryId)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${item.name ? `<h3 class="entry-title">${escapeHtml(item.name)}</h3>` : ''}
                    </div>
                    ${item.url ? `<div class="entry-link">${escapeHtml(item.url)}</div>` : ''}
                  </div>
                  ${item.description ? `<p class="entry-text">${escapeHtml(item.description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="tech-list">
                      ${technologies.map(function(tech, techIdx) {
                        return `<span class="tech-chip" data-entry-id="${escapeHtml(entryId + '-tech-' + techIdx)}">${escapeHtml(tech)}</span>`;
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

    renderAchievements(items, t) {
      const list = safeArr(items).filter(function(item) {
        return item && (item.title || item.description || item.year);
      });

      if (!list.length) return '';

      return `
        <section class="section" data-section="achievements">
          <div class="section-title">${escapeHtml(t.achievements)}</div>
          <div class="section-body stack">
            ${list.map(function(item, idx) {
              const entryId = safeStr(item.id) || uniqueId('achievement', idx);
              return `
                <article class="entry compact-entry" data-entry-id="${escapeHtml(entryId)}">
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

    renderEducation(items, t, lang) {
      const list = safeArr(items).filter(function(item) {
        return item && (item.degree || item.field || item.institution || item.startDate || item.endDate || item.gpa);
      });

      if (!list.length) return '';

      return `
        <section class="section" data-section="education">
          <div class="section-title">${escapeHtml(t.education)}</div>
          <div class="section-body timeline">
            ${list.map(function(item, idx) {
              const entryId = safeStr(item.id) || uniqueId('education', idx);
              const range = formatEducationDateRange(item.startDate, item.endDate, item.isCompleted, lang, t.present);
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);

              return `
                <article class="entry" data-entry-id="${escapeHtml(entryId)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${(degree || field) ? `
                        <h3 class="entry-title">
                          ${escapeHtml([degree, field].filter(Boolean).join(' — '))}
                        </h3>
                      ` : ''}
                      ${institution ? `<div class="entry-subtitle">${escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${escapeHtml(range)}</div>` : ''}
                  </div>
                  ${gpa ? `<p class="entry-text"><strong>GPA:</strong> ${escapeHtml(gpa)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(items, t, lang) {
      const list = safeArr(items).filter(function(item) {
        return item && (item.name || item.issuer || item.date);
      });

      if (!list.length) return '';

      return `
        <section class="section" data-section="certifications">
          <div class="section-title">${escapeHtml(t.certifications)}</div>
          <div class="section-body stack">
            ${list.map(function(item, idx) {
              const entryId = safeStr(item.id) || uniqueId('certification', idx);
              const date = formatShortDate(item.date, lang);
              return `
                <article class="entry compact-entry" data-entry-id="${escapeHtml(entryId)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${item.name ? `<h3 class="entry-title">${escapeHtml(item.name)}</h3>` : ''}
                      ${item.issuer ? `<div class="entry-subtitle">${escapeHtml(item.issuer)}</div>` : ''}
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

    renderLanguages(items, t) {
      const list = safeArr(items).filter(function(item) {
        return item && item.name;
      });

      if (!list.length) return '';

      return `
        <section class="section" data-section="languages">
          <div class="section-title">${escapeHtml(t.languages)}</div>
          <div class="section-body">
            <div class="language-list">
              ${list.map(function(item, idx) {
                const entryId = safeStr(item.id) || uniqueId('language', idx);
                const levelKey = safeStr(item.level).toLowerCase();
                const translatedLevel = t.levelMap[levelKey] || levelKey || '';
                return `
                  <div class="language-item" data-entry-id="${escapeHtml(entryId)}">
                    <span class="language-name">${escapeHtml(safeStr(item.name))}</span>
                    ${translatedLevel ? `<span class="language-level">${escapeHtml(translatedLevel)}</span>` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </section>
      `;
    }

    render() {
      const lang = this.getLanguage();
      const t = I18N[lang] || I18N.en;
      const d = this._data || {};

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #1b1b1b;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-family: "Inter", "Segoe UI", Roboto, Arial, sans-serif;
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
            color: #1b1b1b;
            padding: 34px 36px 38px;
            position: relative;
          }

          .page::before {
            content: "";
            position: absolute;
            inset: 0 0 auto 0;
            height: 8px;
            background: linear-gradient(90deg, #d7a21d 0%, #e2b63e 45%, #8a6a12 100%);
          }

          .header {
            background: linear-gradient(135deg, #15171a 0%, #1f2328 100%);
            color: #ffffff;
            border-radius: 12px;
            padding: 26px 26px 18px;
            margin-bottom: 24px;
            border-left: 6px solid #d7a21d;
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
          }

          .header-top {
            display: block;
            margin-bottom: 14px;
          }

          .name {
            margin: 0;
            font-size: 31px;
            line-height: 1.05;
            font-weight: 800;
            letter-spacing: 0.06em;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 8px;
            font-size: 14px;
            line-height: 1.4;
            color: #f0d993;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .contact-pill {
            background: rgba(255, 255, 255, 0.08);
            color: #f7f7f7;
            border: 1px solid rgba(215, 162, 29, 0.35);
            border-radius: 999px;
            padding: 7px 11px;
            font-size: 12px;
            line-height: 1.2;
          }

          .section {
            margin-top: 20px;
          }

          .section-title {
            position: relative;
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 0 0 12px 0;
            color: #d39b14;
            font-size: 14px;
            line-height: 1.2;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .section-title::before {
            content: "";
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #d39b14;
            flex: 0 0 10px;
          }

          .section-title::after {
            content: "";
            height: 1px;
            background: linear-gradient(90deg, rgba(211, 155, 20, 0.95), rgba(211, 155, 20, 0.12));
            flex: 1 1 auto;
          }

          .section-body {
            padding-left: 2px;
          }

          .prose p,
          .entry-text {
            margin: 0;
            font-size: 13px;
            line-height: 1.65;
            color: #333333;
          }

          .chip-list,
          .tech-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .chip {
            background: #fff8e6;
            color: #5b4710;
            border: 1px solid #ebd08a;
            border-radius: 999px;
            padding: 7px 11px;
            font-size: 12px;
            line-height: 1.2;
            font-weight: 600;
          }

          .tech-chip {
            background: #f5f5f5;
            color: #333333;
            border: 1px solid #dfdfdf;
            border-radius: 999px;
            padding: 6px 10px;
            font-size: 11px;
            line-height: 1.2;
          }

          .timeline,
          .stack {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            position: relative;
            padding: 0 0 0 16px;
            border-left: 2px solid #ecd69a;
          }

          .entry::before {
            content: "";
            position: absolute;
            left: -6px;
            top: 4px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #d39b14;
            box-shadow: 0 0 0 3px #fff5d8;
          }

          .compact-entry {
            padding-bottom: 2px;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 4px;
          }

          .entry-main {
            min-width: 0;
            flex: 1 1 auto;
          }

          .entry-title {
            margin: 0;
            font-size: 15px;
            line-height: 1.35;
            font-weight: 800;
            color: #1c1c1c;
          }

          .entry-subtitle {
            margin-top: 2px;
            font-size: 12px;
            line-height: 1.45;
            color: #666666;
          }

          .sep {
            margin: 0 6px;
          }

          .entry-date,
          .entry-link {
            flex: 0 0 auto;
            white-space: nowrap;
            font-size: 11px;
            line-height: 1.3;
            color: #8d6b12;
            background: #fff8e7;
            border: 1px solid #ecd69a;
            border-radius: 999px;
            padding: 5px 9px;
            font-weight: 700;
          }

          .entry-link {
            max-width: 220px;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding: 0 0 0 16px;
          }

          .bullet-list li {
            margin: 0 0 4px 0;
            font-size: 13px;
            line-height: 1.55;
            color: #333333;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .language-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            padding: 10px 12px;
            background: #fafafa;
            border: 1px solid #ececec;
            border-radius: 10px;
          }

          .language-name {
            font-size: 13px;
            font-weight: 700;
            color: #1f1f1f;
          }

          .language-level {
            font-size: 12px;
            color: #8d6b12;
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
          ${this.renderHeader(d)}
          ${this.renderProfile(d.summary, t)}
          ${this.renderSkills(d.skillsRaw, d.toolsRaw, t)}
          ${this.renderExperience(d.experience, t, lang)}
          ${this.renderProjects(d.projects, t)}
          ${this.renderAchievements(d.achievements, t)}
          ${this.renderEducation(d.education, t, lang)}
          ${this.renderCertifications(d.certifications, t, lang)}
          ${this.renderLanguages(d.languages, t)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-pine-v2')) {
    customElements.define('gqr-resume-pine-v2', GQRResumePineV2);
  }
})();