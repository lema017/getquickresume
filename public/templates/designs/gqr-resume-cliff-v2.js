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

  function formatDateRange(startDate, endDate, lang, isCurrent, isCompleted, type) {
    const start = formatShortDate(startDate, lang);
    let end = '';

    if (type === 'education') {
      if (isCompleted === false) {
        end = I18N[lang].present;
      } else {
        end = formatShortDate(endDate, lang);
      }
    } else {
      end = isCurrent ? I18N[lang].present : formatShortDate(endDate, lang);
    }

    if (start && end) return start + ' — ' + end;
    return start || end || '';
  }

  class GQRResumeCliffV2 extends HTMLElement {
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
      const attrLang = this.getAttribute('language');
      const dataLang = this._data && this._data.language;
      const lang = attrLang || dataLang || 'en';
      return lang === 'es' ? 'es' : 'en';
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
      const contactItems = [
        email ? '<span class="contact-pill">✉ ' + escapeHtml(email) + '</span>' : '',
        phone ? '<span class="contact-pill">☎ ' + escapeHtml(phone) + '</span>' : '',
        country ? '<span class="contact-pill">⚲ ' + escapeHtml(country) + '</span>' : '',
        linkedin ? '<span class="contact-pill">🔗 ' + escapeHtml(linkedin) + '</span>' : ''
      ].filter(Boolean).join('');

      if (!fullName && !profession && !contactItems) return '';

      return (
        '<section class="header-card" data-section="header">' +
          '<div class="header-top">' +
            (fullName ? '<h1 class="name">' + escapeHtml(fullName) + '</h1>' : '') +
            (profession ? '<div class="profession">' + escapeHtml(profession) + '</div>' : '') +
          '</div>' +
          (contactItems
            ? '<div class="contact-row" data-section="contact">' + contactItems + '</div>'
            : '') +
        '</section>'
      );
    }

    renderProfile(data, t) {
      const summary = safeStr(data.summary).trim();
      if (!summary) return '';
      return (
        '<section class="section" data-section="profile">' +
          '<h2 class="section-title"><span>' + escapeHtml(t.profile) + '</span></h2>' +
          '<div class="profile-text">' + escapeHtml(summary) + '</div>' +
        '</section>'
      );
    }

    renderSkills(data, t) {
      const combined = [];
      const seen = new Set();

      safeArr(data.skillsRaw).concat(safeArr(data.toolsRaw)).forEach(function(item) {
        const value = safeStr(item).trim();
        const key = value.toLowerCase();
        if (value && !seen.has(key)) {
          seen.add(key);
          combined.push(value);
        }
      });

      if (!combined.length) return '';

      return (
        '<section class="section" data-section="skills">' +
          '<h2 class="section-title"><span>' + escapeHtml(t.skills) + '</span></h2>' +
          '<div class="skills-grid">' +
            combined.map(function(skill, index) {
              return '<div class="skill-chip" data-entry-id="skill-' + index + '">' + escapeHtml(skill) + '</div>';
            }).join('') +
          '</div>' +
        '</section>'
      );
    }

    renderExperience(data, t, lang) {
      const items = safeArr(data.experience);
      if (!items.length) return '';

      const html = items.map(function(item, index) {
        const id = safeStr(item.id) || ('experience-' + index);
        const title = safeStr(item.title);
        const company = safeStr(item.company);
        const location = safeStr(item.location);
        const range = formatDateRange(item.startDate, item.endDate, lang, !!item.isCurrent, true, 'experience');
        const bullets = safeArr(item.achievements).concat(safeArr(item.responsibilities))
          .map(function(b) { return safeStr(b).trim(); })
          .filter(Boolean);

        return (
          '<article class="entry" data-entry-id="' + escapeHtml(id) + '">' +
            '<div class="entry-head">' +
              '<div class="entry-main">' +
                (title ? '<h3 class="entry-title">' + escapeHtml(title) + '</h3>' : '') +
                ((company || location)
                  ? '<div class="entry-meta">' +
                      [company, location].filter(Boolean).map(escapeHtml).join(' · ') +
                    '</div>'
                  : '') +
              '</div>' +
              (range ? '<div class="entry-date">' + escapeHtml(range) + '</div>' : '') +
            '</div>' +
            (bullets.length
              ? '<ul class="bullet-list">' +
                  bullets.map(function(b) {
                    return '<li>' + escapeHtml(b) + '</li>';
                  }).join('') +
                '</ul>'
              : '') +
          '</article>'
        );
      }).join('');

      return (
        '<section class="section" data-section="experience">' +
          '<h2 class="section-title"><span>' + escapeHtml(t.experience) + '</span></h2>' +
          html +
        '</section>'
      );
    }

    renderProjects(data, t) {
      const items = safeArr(data.projects);
      if (!items.length) return '';

      const html = items.map(function(item, index) {
        const id = safeStr(item.id) || ('project-' + index);
        const name = safeStr(item.name);
        const description = safeStr(item.description);
        const technologies = safeArr(item.technologies).map(function(tech) {
          return safeStr(tech).trim();
        }).filter(Boolean);
        const url = safeStr(item.url);

        return (
          '<article class="entry project-entry" data-entry-id="' + escapeHtml(id) + '">' +
            '<div class="entry-head">' +
              '<div class="entry-main">' +
                (name ? '<h3 class="entry-title">' + escapeHtml(name) + '</h3>' : '') +
              '</div>' +
              (url ? '<div class="entry-link">' + escapeHtml(url) + '</div>' : '') +
            '</div>' +
            (description ? '<div class="entry-text">' + escapeHtml(description) + '</div>' : '') +
            (technologies.length
              ? '<div class="tag-row">' +
                  technologies.map(function(tech) {
                    return '<span class="mini-tag">' + escapeHtml(tech) + '</span>';
                  }).join('') +
                '</div>'
              : '') +
          '</article>'
        );
      }).join('');

      return (
        '<section class="section" data-section="projects">' +
          '<h2 class="section-title"><span>' + escapeHtml(t.projects) + '</span></h2>' +
          html +
        '</section>'
      );
    }

    renderAchievements(data, t) {
      const items = safeArr(data.achievements);
      if (!items.length) return '';

      const html = items.map(function(item, index) {
        const id = safeStr(item.id) || ('achievement-' + index);
        const title = safeStr(item.title);
        const description = safeStr(item.description);
        const year = safeStr(item.year);

        return (
          '<article class="entry compact-entry" data-entry-id="' + escapeHtml(id) + '">' +
            '<div class="entry-head">' +
              '<div class="entry-main">' +
                (title ? '<h3 class="entry-title">' + escapeHtml(title) + '</h3>' : '') +
              '</div>' +
              (year ? '<div class="entry-date">' + escapeHtml(year) + '</div>' : '') +
            '</div>' +
            (description ? '<div class="entry-text">' + escapeHtml(description) + '</div>' : '') +
          '</article>'
        );
      }).join('');

      return (
        '<section class="section" data-section="achievements">' +
          '<h2 class="section-title"><span>' + escapeHtml(t.achievements) + '</span></h2>' +
          html +
        '</section>'
      );
    }

    renderEducation(data, t, lang) {
      const items = safeArr(data.education);
      if (!items.length) return '';

      const html = items.map(function(item, index) {
        const id = safeStr(item.id) || ('education-' + index);
        const degree = safeStr(item.degree);
        const field = safeStr(item.field);
        const institution = safeStr(item.institution);
        const gpa = safeStr(item.gpa);
        const range = formatDateRange(item.startDate, item.endDate, lang, false, item.isCompleted, 'education');

        return (
          '<article class="entry" data-entry-id="' + escapeHtml(id) + '">' +
            '<div class="entry-head">' +
              '<div class="entry-main">' +
                ((degree || field)
                  ? '<h3 class="entry-title">' + escapeHtml([degree, field].filter(Boolean).join(' — ')) + '</h3>'
                  : '') +
                (institution ? '<div class="entry-meta">' + escapeHtml(institution) + '</div>' : '') +
              '</div>' +
              (range ? '<div class="entry-date">' + escapeHtml(range) + '</div>' : '') +
            '</div>' +
            (gpa ? '<div class="entry-text">GPA: ' + escapeHtml(gpa) + '</div>' : '') +
          '</article>'
        );
      }).join('');

      return (
        '<section class="section" data-section="education">' +
          '<h2 class="section-title"><span>' + escapeHtml(t.education) + '</span></h2>' +
          html +
        '</section>'
      );
    }

    renderCertifications(data, t, lang) {
      const items = safeArr(data.certifications);
      if (!items.length) return '';

      const html = items.map(function(item, index) {
        const id = safeStr(item.id) || ('certification-' + index);
        const name = safeStr(item.name);
        const issuer = safeStr(item.issuer);
        const date = formatShortDate(item.date, lang);

        return (
          '<article class="entry compact-entry" data-entry-id="' + escapeHtml(id) + '">' +
            '<div class="entry-head">' +
              '<div class="entry-main">' +
                (name ? '<h3 class="entry-title">' + escapeHtml(name) + '</h3>' : '') +
                (issuer ? '<div class="entry-meta">' + escapeHtml(issuer) + '</div>' : '') +
              '</div>' +
              (date ? '<div class="entry-date">' + escapeHtml(date) + '</div>' : '') +
            '</div>' +
          '</article>'
        );
      }).join('');

      return (
        '<section class="section" data-section="certifications">' +
          '<h2 class="section-title"><span>' + escapeHtml(t.certifications) + '</span></h2>' +
          html +
        '</section>'
      );
    }

    renderLanguages(data, t) {
      const items = safeArr(data.languages);
      if (!items.length) return '';

      const html = items.map(function(item, index) {
        const id = safeStr(item.id) || ('language-' + index);
        const name = safeStr(item.name);
        const levelKey = safeStr(item.level).toLowerCase();
        const translatedLevel = t.levelMap[levelKey] || levelKey;

        return (
          '<article class="language-item" data-entry-id="' + escapeHtml(id) + '">' +
            '<div class="language-name">' + escapeHtml(name) + '</div>' +
            '<div class="language-level">' + escapeHtml(translatedLevel) + '</div>' +
          '</article>'
        );
      }).join('');

      return (
        '<section class="section" data-section="languages">' +
          '<h2 class="section-title"><span>' + escapeHtml(t.languages) + '</span></h2>' +
          '<div class="language-list">' + html + '</div>' +
        '</section>'
      );
    }

    render() {
      const data = this._data || {};
      const lang = this.getLanguage();
      const t = I18N[lang] || I18N.en;

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #111827;
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
            padding: 16mm 14mm 16mm 14mm;
            background:
              linear-gradient(180deg, #f6f1e7 0 18mm, #ffffff 18mm 100%);
            font-family: Arial, Helvetica, sans-serif;
            color: #0f172a;
          }

          .header-card {
            background: linear-gradient(135deg, #0a1024 0%, #111a3b 60%, #16224c 100%);
            color: #f8f5ef;
            border-radius: 18px;
            padding: 18px 20px 16px;
            margin-bottom: 14px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 28px rgba(10, 16, 36, 0.16);
          }

          .header-card::before,
          .header-card::after {
            content: "";
            position: absolute;
            border-radius: 999px;
            background: rgba(246, 241, 231, 0.08);
          }

          .header-card::before {
            width: 180px;
            height: 180px;
            top: -90px;
            right: -30px;
          }

          .header-card::after {
            width: 90px;
            height: 90px;
            bottom: -35px;
            left: -20px;
          }

          .header-top,
          .contact-row {
            position: relative;
            z-index: 1;
          }

          .name {
            margin: 0;
            font-size: 30px;
            line-height: 1.06;
            font-weight: 800;
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 7px;
            font-size: 13px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #e9dfcb;
            font-weight: 700;
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
            min-height: 28px;
            padding: 5px 10px;
            border: 1px solid rgba(248, 245, 239, 0.18);
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.07);
            font-size: 11.5px;
            line-height: 1.2;
            color: #f8f5ef;
          }

          .section {
            margin-top: 14px;
            padding: 0;
          }

          .section-title {
            margin: 0 0 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 13px;
            line-height: 1.2;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            color: #0f172a;
          }

          .section-title::before {
            content: "";
            width: 12px;
            height: 12px;
            background: #0f1c44;
            border-radius: 2px;
            flex: 0 0 12px;
          }

          .section-title::after {
            content: "";
            height: 1px;
            background: linear-gradient(90deg, #c7b89a 0%, rgba(199, 184, 154, 0.2) 100%);
            flex: 1;
          }

          .profile-text,
          .entry-text,
          .entry-meta,
          .entry-date,
          .language-level {
            font-size: 12.2px;
            line-height: 1.55;
          }

          .profile-text {
            color: #243041;
          }

          .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-chip {
            padding: 6px 10px;
            border-radius: 999px;
            border: 1px solid #d8cbb1;
            background: #fbf8f2;
            color: #16213f;
            font-size: 11.5px;
            line-height: 1.2;
            font-weight: 700;
          }

          .entry {
            padding: 10px 0 11px;
            border-bottom: 1px solid #ece7dc;
          }

          .entry:last-child {
            border-bottom: none;
          }

          .compact-entry {
            padding-top: 8px;
            padding-bottom: 9px;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-size: 14px;
            line-height: 1.35;
            font-weight: 800;
            color: #0b1738;
          }

          .entry-meta {
            margin-top: 2px;
            color: #4b5563;
          }

          .entry-date {
            flex: 0 0 auto;
            white-space: nowrap;
            color: #7a6344;
            font-weight: 700;
            font-size: 11.5px;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }

          .entry-text {
            margin-top: 6px;
            color: #243041;
          }

          .bullet-list {
            margin: 7px 0 0 0;
            padding: 0;
            list-style: none;
          }

          .bullet-list li {
            position: relative;
            margin: 0 0 5px 0;
            padding-left: 14px;
            font-size: 12.2px;
            line-height: 1.55;
            color: #243041;
          }

          .bullet-list li::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0.62em;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #b78a4a;
            transform: translateY(-50%);
          }

          .project-entry .entry-link {
            font-size: 11px;
            line-height: 1.3;
            color: #7a6344;
            word-break: break-all;
            text-align: right;
            max-width: 42%;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
          }

          .mini-tag {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 999px;
            background: #eef2f8;
            color: #1b2a4f;
            font-size: 11px;
            line-height: 1.2;
            font-weight: 700;
          }

          .language-list {
            display: grid;
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .language-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            padding: 8px 10px;
            border: 1px solid #ece7dc;
            border-radius: 10px;
            background: #fffdfa;
          }

          .language-name {
            font-size: 12.5px;
            font-weight: 700;
            color: #0b1738;
          }

          .language-level {
            color: #7a6344;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: 11px;
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

  if (!customElements.get('gqr-resume-cliff-v2')) {
    customElements.define('gqr-resume-cliff-v2', GQRResumeCliffV2);
  }
})();