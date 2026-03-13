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
    if (Number.isNaN(date.getTime())) return escapeHtml(value);
    let formatted = new Intl.DateTimeFormat(locale, {
      month: 'short',
      year: 'numeric'
    }).format(date);
    if (lang === 'es') {
      formatted = formatted.replace('.', '');
      formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }
    return formatted;
  }

  function formatDateRange(startDate, endDate, lang, isCurrentLike) {
    const dict = I18N[lang] || I18N.en;
    const start = formatShortDate(startDate, lang);
    const end = isCurrentLike ? dict.present : formatShortDate(endDate, lang);
    if (start && end) return start + ' — ' + end;
    return start || end || '';
  }

  class GQRResumeShoreV1 extends HTMLElement {
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
        email ? `<span class="contact-item">✉ ${escapeHtml(email)}</span>` : '',
        phone ? `<span class="contact-item">☎ ${escapeHtml(phone)}</span>` : '',
        country ? `<span class="contact-item">⚲ ${escapeHtml(country)}</span>` : '',
        linkedin ? `<span class="contact-item">🔗 ${escapeHtml(linkedin)}</span>` : ''
      ].filter(Boolean).join('');

      if (!fullName && !profession && !contacts) return '';

      return `
        <section class="section section-header" data-section="header">
          <div class="header-band">
            ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
          </div>
          ${contacts ? `<div class="contact-row" data-section="contact">${contacts}</div>` : ''}
        </section>
      `;
    }

    renderProfile(data, t) {
      const summary = safeStr(data.summary).trim();
      if (!summary) return '';
      return `
        <section class="section" data-section="profile">
          <h2 class="section-title">${escapeHtml(t.profile)}</h2>
          <div class="section-body prose">
            <p>${escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(data, t) {
      const skills = safeArr(data.skillsRaw);
      const tools = safeArr(data.toolsRaw);
      const merged = [];
      const seen = new Set();

      skills.concat(tools).forEach(function(item) {
        const val = safeStr(item).trim();
        const key = val.toLowerCase();
        if (val && !seen.has(key)) {
          seen.add(key);
          merged.push(val);
        }
      });

      if (!merged.length) return '';

      return `
        <section class="section" data-section="skills">
          <h2 class="section-title">${escapeHtml(t.skills)}</h2>
          <div class="section-body">
            <div class="skills-grid">
              ${merged.map(function(skill, index) {
                return `<div class="skill-chip" data-entry-id="skill-${index}">${escapeHtml(skill)}</div>`;
              }).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(data, t, lang) {
      const experience = safeArr(data.experience).filter(function(item) {
        return item && (safeStr(item.title) || safeStr(item.company) || safeArr(item.achievements).length || safeArr(item.responsibilities).length);
      });

      if (!experience.length) return '';

      return `
        <section class="section" data-section="experience">
          <h2 class="section-title">${escapeHtml(t.experience)}</h2>
          <div class="section-body stack">
            ${experience.map(function(item, index) {
              const id = safeStr(item.id) || ('exp-' + index);
              const title = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);
              const dateRange = formatDateRange(item.startDate, item.endDate, lang, !!item.isCurrent);
              const bullets = safeArr(item.achievements).concat(safeArr(item.responsibilities)).filter(function(b) {
                return safeStr(b).trim();
              });

              const metaParts = [company, location].filter(Boolean).map(escapeHtml).join(' · ');

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                      ${metaParts ? `<div class="entry-subtitle">${metaParts}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
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
        </section>
      `;
    }

    renderProjects(data, t) {
      const projects = safeArr(data.projects).filter(function(item) {
        return item && (safeStr(item.name) || safeStr(item.description) || safeArr(item.technologies).length || safeStr(item.url));
      });

      if (!projects.length) return '';

      return `
        <section class="section" data-section="projects">
          <h2 class="section-title">${escapeHtml(t.projects)}</h2>
          <div class="section-body stack">
            ${projects.map(function(item, index) {
              const id = safeStr(item.id) || ('project-' + index);
              const name = safeStr(item.name);
              const description = safeStr(item.description);
              const technologies = safeArr(item.technologies).filter(function(tech) {
                return safeStr(tech).trim();
              });
              const url = safeStr(item.url);

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
                      ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                      ${url ? `<div class="entry-subtitle">${escapeHtml(url)}</div>` : ''}
                    </div>
                  </div>
                  ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
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

    renderAchievements(data, t) {
      const achievements = safeArr(data.achievements).filter(function(item) {
        return item && (safeStr(item.title) || safeStr(item.description) || safeStr(item.year));
      });

      if (!achievements.length) return '';

      return `
        <section class="section" data-section="achievements">
          <h2 class="section-title">${escapeHtml(t.achievements)}</h2>
          <div class="section-body stack">
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
                  ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducation(data, t, lang) {
      const education = safeArr(data.education).filter(function(item) {
        return item && (safeStr(item.degree) || safeStr(item.field) || safeStr(item.institution));
      });

      if (!education.length) return '';

      return `
        <section class="section" data-section="education">
          <h2 class="section-title">${escapeHtml(t.education)}</h2>
          <div class="section-body stack">
            ${education.map(function(item, index) {
              const id = safeStr(item.id) || ('education-' + index);
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);
              const title = [degree, field].filter(Boolean).join(' — ');
              const dateRange = formatDateRange(item.startDate, item.endDate, lang, item.isCompleted === false);

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
                      ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
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

    renderCertifications(data, t, lang) {
      const certifications = safeArr(data.certifications).filter(function(item) {
        return item && (safeStr(item.name) || safeStr(item.issuer) || safeStr(item.date));
      });

      if (!certifications.length) return '';

      return `
        <section class="section" data-section="certifications">
          <h2 class="section-title">${escapeHtml(t.certifications)}</h2>
          <div class="section-body stack">
            ${certifications.map(function(item, index) {
              const id = safeStr(item.id) || ('cert-' + index);
              const name = safeStr(item.name);
              const issuer = safeStr(item.issuer);
              const date = item.date ? formatShortDate(item.date, lang) : '';

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-head-main">
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

    renderLanguages(data, t) {
      const dict = t.levelMap || {};
      const languages = safeArr(data.languages).filter(function(item) {
        return item && safeStr(item.name).trim();
      });

      if (!languages.length) return '';

      return `
        <section class="section" data-section="languages">
          <h2 class="section-title">${escapeHtml(t.languages)}</h2>
          <div class="section-body">
            <div class="lang-list">
              ${languages.map(function(item, index) {
                const id = safeStr(item.id) || ('lang-' + index);
                const name = safeStr(item.name);
                const levelKey = safeStr(item.level).toLowerCase();
                const levelLabel = dict[levelKey] || safeStr(item.level);

                return `
                  <div class="lang-item" data-entry-id="${escapeHtml(id)}">
                    <span class="lang-name">${escapeHtml(name)}</span>
                    <span class="lang-sep">—</span>
                    <span class="lang-level">${escapeHtml(levelLabel)}</span>
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
      const t = I18N[lang] || I18N.en;

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2f2e2c;
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
            padding: 16mm 16mm 18mm;
            background: #f6f1e9;
            color: #2f2e2c;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.45;
          }

          .section {
            margin: 0 0 18px 0;
          }

          .section:last-child {
            margin-bottom: 0;
          }

          .section-header {
            margin-bottom: 20px;
          }

          .header-band {
            background: #3b3b3f;
            color: #f7f2ea;
            padding: 18px 20px 16px;
            border-left: 8px solid #b08d57;
          }

          .name {
            margin: 0;
            font-size: 28px;
            line-height: 1.05;
            letter-spacing: 0.06em;
            font-weight: 800;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 8px;
            font-size: 12px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #e5d8c5;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 10px;
            padding: 12px 0 0;
          }

          .contact-item {
            display: inline-flex;
            align-items: center;
            padding: 5px 10px;
            border: 1px solid #d5c5ad;
            background: #fffdf9;
            border-radius: 999px;
            font-size: 11px;
            color: #413f3b;
          }

          .section-title {
            margin: 0 0 10px 0;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 13px;
            line-height: 1.1;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            color: #3a3937;
            font-weight: 800;
          }

          .section-title::before {
            content: "";
            width: 26px;
            height: 3px;
            background: #b08d57;
            display: inline-block;
            border-radius: 999px;
          }

          .section-body {
            background: rgba(255, 253, 249, 0.65);
            border: 1px solid #e1d6c6;
            padding: 12px 14px;
          }

          .prose p,
          .entry-text {
            margin: 0;
            font-size: 12px;
            color: #3f3d39;
          }

          .stack {
            display: grid;
            gap: 12px;
          }

          .entry {
            padding-bottom: 10px;
            border-bottom: 1px solid #e4d9cb;
          }

          .entry:last-child {
            border-bottom: 0;
            padding-bottom: 0;
          }

          .entry.compact {
            padding-bottom: 8px;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 6px;
          }

          .entry-head-main {
            min-width: 0;
            flex: 1 1 auto;
          }

          .entry-title {
            margin: 0;
            font-size: 14px;
            line-height: 1.25;
            color: #2f2e2c;
            font-weight: 700;
          }

          .entry-subtitle {
            margin-top: 3px;
            font-size: 11px;
            line-height: 1.35;
            color: #6a665f;
          }

          .entry-date {
            flex: 0 0 auto;
            white-space: nowrap;
            font-size: 11px;
            color: #7a6a53;
            font-weight: 700;
            padding-top: 2px;
          }

          .bullets {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullets li {
            margin: 0 0 4px 0;
            font-size: 12px;
            color: #3e3c38;
          }

          .bullets li:last-child {
            margin-bottom: 0;
          }

          .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-chip,
          .tag {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 5px 10px;
            border-radius: 999px;
            font-size: 11px;
            line-height: 1.2;
            border: 1px solid #cdb89a;
            background: #fffaf3;
            color: #3c3935;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            margin-top: 8px;
          }

          .lang-list {
            display: grid;
            gap: 8px;
          }

          .lang-item {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            gap: 6px;
            font-size: 12px;
            color: #3d3a36;
            padding: 4px 0;
            border-bottom: 1px dashed #e2d8ca;
          }

          .lang-item:last-child {
            border-bottom: 0;
            padding-bottom: 0;
          }

          .lang-name {
            font-weight: 700;
          }

          .lang-level {
            color: #6c655c;
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
          ${this.renderProfile(data, t)}
          ${this.renderSkills(data, t)}
          ${this.renderExperience(data, t, lang)}
          ${this.renderProjects(data, t)}
          ${this.renderAchievements(data, t)}
          ${this.renderEducation(data, t, lang)}
          ${this.renderCertifications(data, t, lang)}
          ${this.renderLanguages(data, t)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-shore-v1')) {
    customElements.define('gqr-resume-shore-v1', GQRResumeShoreV1);
  }
})();