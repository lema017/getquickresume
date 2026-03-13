(function() {
  'use strict';

  class GQRResumeFlareV2 extends HTMLElement {
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
      return this._data || {};
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

    render() {
      const data = this.data || {};
      const lang = this.getLanguage();
      const t = I18N[lang];

      const firstName = safeStr(data.firstName);
      const lastName = safeStr(data.lastName);
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      const profession = safeStr(data.profession);
      const email = safeStr(data.email);
      const phone = safeStr(data.phone);
      const country = safeStr(data.country);
      const linkedin = safeStr(data.linkedin);
      const summary = safeStr(data.summary);

      const skillsCombined = Array.from(new Set(
        safeArr(data.skillsRaw).concat(safeArr(data.toolsRaw)).map(function(item) {
          return safeStr(item).trim();
        }).filter(Boolean)
      ));

      const experience = safeArr(data.experience);
      const projects = safeArr(data.projects);
      const achievements = safeArr(data.achievements);
      const education = safeArr(data.education);
      const certifications = safeArr(data.certifications);
      const languages = safeArr(data.languages);

      const hasHeader = !!(fullName || profession || email || phone || country || linkedin);
      const hasProfile = !!summary;
      const hasSkills = skillsCombined.length > 0;
      const hasExperience = experience.length > 0;
      const hasProjects = projects.length > 0;
      const hasAchievements = achievements.length > 0;
      const hasEducation = education.length > 0;
      const hasCertifications = certifications.length > 0;
      const hasLanguages = languages.length > 0;

      const contactItems = [
        email ? '<span class="contact-pill">✉ ' + escapeHtml(email) + '</span>' : '',
        phone ? '<span class="contact-pill">☎ ' + escapeHtml(phone) + '</span>' : '',
        country ? '<span class="contact-pill">⚲ ' + escapeHtml(country) + '</span>' : '',
        linkedin ? '<span class="contact-pill">🔗 ' + escapeHtml(linkedin) + '</span>' : ''
      ].filter(Boolean).join('');

      const headerHtml = hasHeader ? `
        <section class="header" data-section="header">
          <div class="header-inner">
            ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
            ${contactItems ? `<div class="contact-row" data-section="contact">${contactItems}</div>` : ''}
          </div>
        </section>
      ` : '';

      const profileHtml = hasProfile ? `
        <section class="section" data-section="profile">
          <div class="section-title">${escapeHtml(t.profile)}</div>
          <div class="profile-text">${escapeHtml(summary)}</div>
        </section>
      ` : '';

      const skillsHtml = hasSkills ? `
        <section class="section" data-section="skills">
          <div class="section-title">${escapeHtml(t.skills)}</div>
          <div class="chips">
            ${skillsCombined.map(function(skill, index) {
              return `<span class="chip" data-entry-id="skill-${index}">${escapeHtml(skill)}</span>`;
            }).join('')}
          </div>
        </section>
      ` : '';

      const experienceHtml = hasExperience ? `
        <section class="section" data-section="experience">
          <div class="section-title">${escapeHtml(t.experience)}</div>
          <div class="entries">
            ${experience.map(function(item, index) {
              const id = safeStr(item.id) || ('experience-' + index);
              const title = safeStr(item.title);
              const company = safeStr(item.company);
              const location = safeStr(item.location);
              const bullets = safeArr(item.achievements).concat(safeArr(item.responsibilities))
                .map(function(b) { return safeStr(b).trim(); })
                .filter(Boolean);
              const dateRange = formatDateRange(item.startDate, item.endDate, item.isCurrent, lang, false);
              const titleLine = [title, company].filter(Boolean).join(' · ');
              const metaLine = [location].filter(Boolean).join(' · ');

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
                      ${titleLine ? `<h3 class="entry-title">${escapeHtml(titleLine)}</h3>` : ''}
                      ${metaLine ? `<div class="entry-meta">${escapeHtml(metaLine)}</div>` : ''}
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

      const projectsHtml = hasProjects ? `
        <section class="section" data-section="projects">
          <div class="section-title">${escapeHtml(t.projects)}</div>
          <div class="entries">
            ${projects.map(function(item, index) {
              const id = safeStr(item.id) || ('project-' + index);
              const name = safeStr(item.name);
              const description = safeStr(item.description);
              const technologies = safeArr(item.technologies).map(function(tech) {
                return safeStr(tech).trim();
              }).filter(Boolean);
              const url = safeStr(item.url);

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head single">
                    ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                    ${url ? `<div class="entry-link">${escapeHtml(url)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `
                    <div class="tech-line">
                      ${technologies.map(function(tech) {
                        return `<span class="mini-chip">${escapeHtml(tech)}</span>`;
                      }).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const achievementsHtml = hasAchievements ? `
        <section class="section" data-section="achievements">
          <div class="section-title">${escapeHtml(t.achievements)}</div>
          <div class="entries">
            ${achievements.map(function(item, index) {
              const id = safeStr(item.id) || ('achievement-' + index);
              const title = safeStr(item.title);
              const description = safeStr(item.description);
              const year = safeStr(item.year);

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
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

      const educationHtml = hasEducation ? `
        <section class="section" data-section="education">
          <div class="section-title">${escapeHtml(t.education)}</div>
          <div class="entries">
            ${education.map(function(item, index) {
              const id = safeStr(item.id) || ('education-' + index);
              const degree = safeStr(item.degree);
              const field = safeStr(item.field);
              const institution = safeStr(item.institution);
              const gpa = safeStr(item.gpa);
              const titleLine = [degree, field].filter(Boolean).join(' · ');
              const dateRange = formatDateRange(item.startDate, item.endDate, false, lang, item.isCompleted === false);
              const metaBits = [institution];
              if (gpa) metaBits.push('GPA: ' + gpa);

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
                      ${titleLine ? `<h3 class="entry-title">${escapeHtml(titleLine)}</h3>` : ''}
                      ${metaBits.length ? `<div class="entry-meta">${escapeHtml(metaBits.join(' · '))}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const certificationsHtml = hasCertifications ? `
        <section class="section" data-section="certifications">
          <div class="section-title">${escapeHtml(t.certifications)}</div>
          <div class="entries">
            ${certifications.map(function(item, index) {
              const id = safeStr(item.id) || ('certification-' + index);
              const name = safeStr(item.name);
              const issuer = safeStr(item.issuer);
              const date = formatSingleDate(item.date, lang);

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
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
      ` : '';

      const languagesHtml = hasLanguages ? `
        <section class="section" data-section="languages">
          <div class="section-title">${escapeHtml(t.languages)}</div>
          <div class="language-list">
            ${languages.map(function(item, index) {
              const id = safeStr(item.id) || ('language-' + index);
              const name = safeStr(item.name);
              const levelKey = safeStr(item.level).toLowerCase();
              const level = t.levelMap[levelKey] || levelKey || '';

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
      ` : '';

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #253238;
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
            padding: 0;
            background: #f8f8f5;
            color: #253238;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.45;
          }

          .header {
            background: #aebfbe;
            color: #ffffff;
            padding: 38px 42px 28px;
          }

          .header-inner {
            max-width: 100%;
          }

          .name {
            margin: 0;
            font-size: 34px;
            line-height: 1.02;
            font-weight: 800;
            letter-spacing: 0.8px;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 10px;
            font-size: 14px;
            font-style: italic;
            font-weight: 700;
            letter-spacing: 0.6px;
            text-transform: uppercase;
            opacity: 0.95;
          }

          .contact-row {
            margin-top: 18px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            padding: 6px 10px;
            border: 1px solid rgba(255,255,255,0.45);
            background: rgba(255,255,255,0.14);
            color: #ffffff;
            border-radius: 999px;
            font-size: 12px;
            line-height: 1.2;
            word-break: break-word;
          }

          .section {
            padding: 22px 42px 0;
          }

          .section-title {
            display: inline-block;
            margin: 0 0 14px;
            padding: 0 10px 3px 0;
            color: #2f4b4d;
            font-size: 18px;
            font-weight: 800;
            letter-spacing: 0.7px;
            text-transform: uppercase;
            border-bottom: 3px solid #aebfbe;
          }

          .profile-text,
          .entry-text,
          .entry-meta,
          .entry-date,
          .language-item {
            font-size: 13px;
          }

          .profile-text,
          .entry-text {
            color: #39484d;
          }

          .chips,
          .tech-line,
          .language-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .chip {
            display: inline-block;
            padding: 7px 11px;
            background: #ffffff;
            border: 1px solid #d4dcdb;
            border-radius: 999px;
            color: #314447;
            font-size: 12px;
            font-weight: 700;
          }

          .mini-chip {
            display: inline-block;
            padding: 5px 9px;
            background: #ecf1f0;
            border: 1px solid #d7e0df;
            border-radius: 999px;
            color: #466063;
            font-size: 11px;
            font-weight: 700;
          }

          .entries {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .entry {
            background: #ffffff;
            border: 1px solid #e1e6e5;
            border-left: 4px solid #aebfbe;
            padding: 14px 16px 14px 14px;
          }

          .entry.compact {
            padding-top: 12px;
            padding-bottom: 12px;
          }

          .entry-head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 14px;
          }

          .entry-head.single {
            align-items: baseline;
          }

          .entry-title-wrap {
            flex: 1 1 auto;
            min-width: 0;
          }

          .entry-title {
            margin: 0;
            color: #233538;
            font-size: 15px;
            line-height: 1.25;
            font-weight: 800;
          }

          .entry-meta {
            margin-top: 4px;
            color: #607174;
          }

          .entry-date,
          .entry-link {
            flex: 0 0 auto;
            color: #607174;
            white-space: nowrap;
            text-align: right;
          }

          .entry-link {
            font-size: 12px;
            word-break: break-all;
          }

          .entry-text {
            margin-top: 8px;
          }

          .bullet-list {
            margin: 10px 0 0 0;
            padding-left: 18px;
            color: #39484d;
          }

          .bullet-list li {
            margin: 4px 0;
            font-size: 13px;
          }

          .language-item {
            padding: 8px 12px;
            background: #ffffff;
            border: 1px solid #e1e6e5;
            border-radius: 999px;
            color: #314447;
          }

          .language-name {
            font-weight: 700;
          }

          .language-sep {
            margin: 0 6px;
            color: #8a9899;
          }

          .language-level {
            color: #5b6e71;
          }

          .spacer-bottom {
            height: 34px;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${headerHtml}
          ${profileHtml}
          ${skillsHtml}
          ${experienceHtml}
          ${projectsHtml}
          ${achievementsHtml}
          ${educationHtml}
          ${certificationsHtml}
          ${languagesHtml}
          <div class="spacer-bottom"></div>
        </div>
      `;
    }
  }

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
      education: 'Estudios',
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

  function escapeHtml(text) {
    return safeStr(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatSingleDate(value, lang) {
    if (!value) return '';
    const date = new Date(value);
    if (isNaN(date.getTime())) return safeStr(value);
    return formatMonthYear(date, lang);
  }

  function formatDateRange(startDate, endDate, isCurrent, lang, isEducationIncomplete) {
    const start = parseDate(startDate);
    const end = parseDate(endDate);
    const startText = start ? formatMonthYear(start, lang) : safeStr(startDate);
    var endText = '';

    if (isCurrent === true || isEducationIncomplete === true) {
      endText = I18N[lang].present;
    } else if (end) {
      endText = formatMonthYear(end, lang);
    } else if (endDate) {
      endText = safeStr(endDate);
    }

    if (startText && endText) return startText + ' — ' + endText;
    return startText || endText || '';
  }

  function parseDate(value) {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }

  function formatMonthYear(date, lang) {
    const months = {
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    };
    return months[lang][date.getMonth()] + ' ' + date.getFullYear();
  }

  if (!customElements.get('gqr-resume-flare-v2')) {
    customElements.define('gqr-resume-flare-v2', GQRResumeFlareV2);
  }
})();