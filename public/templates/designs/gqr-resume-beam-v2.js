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

  function shortDate(value, lang) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      month: 'short',
      year: 'numeric'
    }).format(d);
  }

  function formatDateRange(startDate, endDate, lang, isCurrentLike) {
    const start = shortDate(startDate, lang);
    const end = isCurrentLike ? (I18N[lang].present) : shortDate(endDate, lang);
    if (start && end) return start + ' — ' + end;
    return start || end || '';
  }

  function uniqueStrings(arr) {
    const seen = new Set();
    const out = [];
    safeArr(arr).forEach(function(item) {
      const raw = safeStr(item).trim();
      if (!raw) return;
      const key = raw.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        out.push(raw);
      }
    });
    return out;
  }

  class GQRResumeBeamV2 extends HTMLElement {
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
      if (attrLang === 'es' || attrLang === 'en') return attrLang;
      if (dataLang === 'es' || dataLang === 'en') return dataLang;
      return 'en';
    }

    renderSectionTitle(title) {
      return '<div class="section-title"><span>' + escapeHtml(title) + '</span></div>';
    }

    render() {
      const data = this._data || {};
      const lang = this.getLanguage();
      const t = I18N[lang];

      const firstName = safeStr(data.firstName);
      const lastName = safeStr(data.lastName);
      const fullName = (firstName + ' ' + lastName).trim();
      const profession = safeStr(data.profession);
      const email = safeStr(data.email);
      const phone = safeStr(data.phone);
      const country = safeStr(data.country);
      const linkedin = safeStr(data.linkedin);
      const summary = safeStr(data.summary);

      const combinedSkills = uniqueStrings(
        safeArr(data.skillsRaw).concat(safeArr(data.toolsRaw))
      );

      const experience = safeArr(data.experience);
      const projects = safeArr(data.projects);
      const achievements = safeArr(data.achievements);
      const education = safeArr(data.education);
      const certifications = safeArr(data.certifications);
      const languages = safeArr(data.languages);

      const contactItems = [];
      if (email) contactItems.push('<span class="contact-pill">✉ ' + escapeHtml(email) + '</span>');
      if (phone) contactItems.push('<span class="contact-pill">☎ ' + escapeHtml(phone) + '</span>');
      if (country) contactItems.push('<span class="contact-pill">⚲ ' + escapeHtml(country) + '</span>');
      if (linkedin) contactItems.push('<span class="contact-pill">🔗 ' + escapeHtml(linkedin) + '</span>');

      const headerHtml = (fullName || profession || contactItems.length)
        ? (
          '<section class="header" data-section="header">' +
            '<div class="header-band"></div>' +
            '<div class="header-inner">' +
              (fullName ? '<h1 class="name">' + escapeHtml(fullName) + '</h1>' : '') +
              (profession ? '<div class="profession">' + escapeHtml(profession) + '</div>' : '') +
              (contactItems.length
                ? '<div class="contact-row" data-section="contact">' + contactItems.join('') + '</div>'
                : ''
              ) +
            '</div>' +
          '</section>'
        )
        : '';

      const profileHtml = summary
        ? (
          '<section class="section" data-section="profile">' +
            this.renderSectionTitle(t.profile) +
            '<div class="body-text">' + escapeHtml(summary) + '</div>' +
          '</section>'
        )
        : '';

      const skillsHtml = combinedSkills.length
        ? (
          '<section class="section" data-section="skills">' +
            this.renderSectionTitle(t.skills) +
            '<div class="skills-grid">' +
              combinedSkills.map(function(skill, index) {
                return '<div class="skill-chip" data-entry-id="skill-' + index + '">' + escapeHtml(skill) + '</div>';
              }).join('') +
            '</div>' +
          '</section>'
        )
        : '';

      const experienceHtml = experience.length
        ? (
          '<section class="section" data-section="experience">' +
            this.renderSectionTitle(t.experience) +
            '<div class="stack">' +
              experience.map(function(item, index) {
                const id = escapeHtml(safeStr(item.id) || ('experience-' + index));
                const bullets = safeArr(item.achievements).concat(safeArr(item.responsibilities))
                  .map(function(b) { return safeStr(b).trim(); })
                  .filter(Boolean);

                const title = safeStr(item.title);
                const company = safeStr(item.company);
                const location = safeStr(item.location);
                const metaParts = [];
                if (company) metaParts.push(company);
                if (location) metaParts.push(location);
                const dateRange = formatDateRange(item.startDate, item.endDate, lang, !!item.isCurrent);

                return (
                  '<article class="entry" data-entry-id="' + id + '">' +
                    '<div class="entry-top">' +
                      '<div class="entry-main">' +
                        (title ? '<h3 class="entry-title">' + escapeHtml(title) + '</h3>' : '') +
                        ((metaParts.length)
                          ? '<div class="entry-subtitle">' + escapeHtml(metaParts.join(' · ')) + '</div>'
                          : '') +
                      '</div>' +
                      (dateRange ? '<div class="entry-date">' + escapeHtml(dateRange) + '</div>' : '') +
                    '</div>' +
                    (bullets.length
                      ? '<ul class="bullet-list">' + bullets.map(function(b) {
                          return '<li>' + escapeHtml(b) + '</li>';
                        }).join('') + '</ul>'
                      : ''
                    ) +
                  '</article>'
                );
              }).join('') +
            '</div>' +
          '</section>'
        )
        : '';

      const projectsHtml = projects.length
        ? (
          '<section class="section" data-section="projects">' +
            this.renderSectionTitle(t.projects) +
            '<div class="stack">' +
              projects.map(function(item, index) {
                const id = escapeHtml(safeStr(item.id) || ('project-' + index));
                const name = safeStr(item.name);
                const description = safeStr(item.description);
                const technologies = uniqueStrings(safeArr(item.technologies));
                const url = safeStr(item.url);

                return (
                  '<article class="entry" data-entry-id="' + id + '">' +
                    '<div class="entry-top">' +
                      '<div class="entry-main">' +
                        (name ? '<h3 class="entry-title">' + escapeHtml(name) + '</h3>' : '') +
                      '</div>' +
                      (url ? '<div class="entry-link">' + escapeHtml(url) + '</div>' : '') +
                    '</div>' +
                    (description ? '<div class="body-text small-gap">' + escapeHtml(description) + '</div>' : '') +
                    (technologies.length
                      ? '<div class="tag-row">' + technologies.map(function(tech) {
                          return '<span class="mini-tag">' + escapeHtml(tech) + '</span>';
                        }).join('') + '</div>'
                      : ''
                    ) +
                  '</article>'
                );
              }).join('') +
            '</div>' +
          '</section>'
        )
        : '';

      const achievementsHtml = achievements.length
        ? (
          '<section class="section" data-section="achievements">' +
            this.renderSectionTitle(t.achievements) +
            '<div class="stack">' +
              achievements.map(function(item, index) {
                const id = escapeHtml(safeStr(item.id) || ('achievement-' + index));
                const title = safeStr(item.title);
                const description = safeStr(item.description);
                const year = safeStr(item.year);

                return (
                  '<article class="entry compact" data-entry-id="' + id + '">' +
                    '<div class="entry-top">' +
                      '<div class="entry-main">' +
                        (title ? '<h3 class="entry-title">' + escapeHtml(title) + '</h3>' : '') +
                      '</div>' +
                      (year ? '<div class="entry-date">' + escapeHtml(year) + '</div>' : '') +
                    '</div>' +
                    (description ? '<div class="body-text small-gap">' + escapeHtml(description) + '</div>' : '') +
                  '</article>'
                );
              }).join('') +
            '</div>' +
          '</section>'
        )
        : '';

      const educationHtml = education.length
        ? (
          '<section class="section" data-section="education">' +
            this.renderSectionTitle(t.education) +
            '<div class="stack">' +
              education.map(function(item, index) {
                const id = escapeHtml(safeStr(item.id) || ('education-' + index));
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

                const title = [degree, field].filter(Boolean).join(' — ');

                return (
                  '<article class="entry" data-entry-id="' + id + '">' +
                    '<div class="entry-top">' +
                      '<div class="entry-main">' +
                        (title ? '<h3 class="entry-title">' + escapeHtml(title) + '</h3>' : '') +
                        (institution ? '<div class="entry-subtitle">' + escapeHtml(institution) + '</div>' : '') +
                      '</div>' +
                      (dateRange ? '<div class="entry-date">' + escapeHtml(dateRange) + '</div>' : '') +
                    '</div>' +
                    (gpa ? '<div class="body-text small-gap">GPA: ' + escapeHtml(gpa) + '</div>' : '') +
                  '</article>'
                );
              }).join('') +
            '</div>' +
          '</section>'
        )
        : '';

      const certificationsHtml = certifications.length
        ? (
          '<section class="section" data-section="certifications">' +
            this.renderSectionTitle(t.certifications) +
            '<div class="stack">' +
              certifications.map(function(item, index) {
                const id = escapeHtml(safeStr(item.id) || ('certification-' + index));
                const name = safeStr(item.name);
                const issuer = safeStr(item.issuer);
                const date = shortDate(item.date, lang);

                return (
                  '<article class="entry compact" data-entry-id="' + id + '">' +
                    '<div class="entry-top">' +
                      '<div class="entry-main">' +
                        (name ? '<h3 class="entry-title">' + escapeHtml(name) + '</h3>' : '') +
                        (issuer ? '<div class="entry-subtitle">' + escapeHtml(issuer) + '</div>' : '') +
                      '</div>' +
                      (date ? '<div class="entry-date">' + escapeHtml(date) + '</div>' : '') +
                    '</div>' +
                  '</article>'
                );
              }).join('') +
            '</div>' +
          '</section>'
        )
        : '';

      const languagesHtml = languages.length
        ? (
          '<section class="section" data-section="languages">' +
            this.renderSectionTitle(t.languages) +
            '<div class="stack">' +
              languages.map(function(item, index) {
                const id = escapeHtml(safeStr(item.id) || ('language-' + index));
                const name = safeStr(item.name);
                const levelKey = safeStr(item.level).toLowerCase();
                const level = (t.levelMap && t.levelMap[levelKey]) ? t.levelMap[levelKey] : safeStr(item.level);

                return (
                  '<article class="language-row" data-entry-id="' + id + '">' +
                    '<span class="language-name">' + escapeHtml(name) + '</span>' +
                    '<span class="language-sep">—</span>' +
                    '<span class="language-level">' + escapeHtml(level) + '</span>' +
                  '</article>'
                );
              }).join('') +
            '</div>' +
          '</section>'
        )
        : '';

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #161616;
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
            padding: 24px 34px 34px;
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
            height: 8px;
            background: linear-gradient(90deg, #0f0f0f 0%, #d7b11e 38%, #f0d34d 100%);
          }

          .header {
            margin-bottom: 22px;
            border: 1px solid #e6e1d3;
            background: linear-gradient(180deg, #fbfaf6 0%, #f7f3e7 100%);
          }

          .header-band {
            height: 18px;
            background: #111111;
          }

          .header-inner {
            padding: 20px 22px 18px;
          }

          .name {
            margin: 0;
            font-size: 34px;
            line-height: 1.05;
            letter-spacing: 0.2px;
            color: #101010;
            font-weight: 800;
          }

          .profession {
            display: inline-block;
            margin-top: 10px;
            padding: 5px 10px;
            background: #e0b91e;
            color: #111111;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.3px;
            text-transform: uppercase;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 14px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 10px;
            border: 1px solid #d6cba1;
            background: #fffdf7;
            color: #272727;
            font-size: 12.5px;
            border-radius: 999px;
          }

          .section {
            margin-top: 18px;
          }

          .section-title {
            display: flex;
            align-items: center;
            margin: 0 0 10px;
          }

          .section-title span {
            display: inline-block;
            font-size: 17px;
            font-weight: 800;
            color: #161616;
            position: relative;
            padding-bottom: 8px;
          }

          .section-title span::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 42px;
            height: 4px;
            background: #e0b91e;
          }

          .body-text {
            font-size: 14px;
            color: #303030;
            white-space: pre-wrap;
          }

          .small-gap {
            margin-top: 6px;
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
            padding: 6px 10px;
            background: #111111;
            color: #f5f1df;
            border-radius: 3px;
            font-size: 12.5px;
            line-height: 1.2;
          }

          .mini-tag {
            background: #f3ecd2;
            color: #1a1a1a;
            border: 1px solid #dbc36a;
          }

          .stack {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            border-left: 3px solid #111111;
            padding-left: 14px;
          }

          .entry.compact {
            padding-bottom: 2px;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 14px;
          }

          .entry-main {
            flex: 1 1 auto;
            min-width: 0;
          }

          .entry-title {
            margin: 0;
            font-size: 15px;
            line-height: 1.25;
            color: #121212;
            font-weight: 800;
          }

          .entry-subtitle {
            margin-top: 3px;
            font-size: 13px;
            color: #565656;
            font-weight: 600;
          }

          .entry-date,
          .entry-link {
            flex: 0 0 auto;
            font-size: 12.5px;
            color: #6a5a14;
            font-weight: 700;
            text-align: right;
            white-space: nowrap;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
            color: #303030;
            font-size: 13.5px;
          }

          .bullet-list li {
            margin: 4px 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
          }

          .language-row {
            display: flex;
            align-items: baseline;
            gap: 8px;
            font-size: 14px;
            color: #252525;
            padding-left: 2px;
          }

          .language-name {
            font-weight: 700;
          }

          .language-sep {
            color: #9a9a9a;
          }

          .language-level {
            color: #5a5a5a;
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
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-beam-v2')) {
    customElements.define('gqr-resume-beam-v2', GQRResumeBeamV2);
  }
})();