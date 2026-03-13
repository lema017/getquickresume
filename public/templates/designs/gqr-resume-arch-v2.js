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
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return escapeHtml(value);
    return new Intl.DateTimeFormat(locale, {
      month: 'short',
      year: 'numeric'
    }).format(d);
  }

  function formatDateRange(startDate, endDate, lang, isCurrent, isCompleted, context) {
    const dict = I18N[lang] || I18N.en;
    const start = formatShortDate(startDate, lang);
    let end = '';

    if (context === 'education') {
      if (isCompleted === false) {
        end = dict.present;
      } else {
        end = formatShortDate(endDate, lang);
      }
    } else {
      if (isCurrent) {
        end = dict.present;
      } else {
        end = formatShortDate(endDate, lang);
      }
    }

    if (start && end) return start + ' — ' + end;
    return start || end || '';
  }

  class GQRResumeArchV2 extends HTMLElement {
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

    renderSectionTitle(title) {
      return '<div class="section-title">' + escapeHtml(title) + '</div>';
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

      const skillsRaw = safeArr(data.skillsRaw);
      const toolsRaw = safeArr(data.toolsRaw);
      const combinedSkills = Array.from(
        new Set(
          skillsRaw.concat(toolsRaw).map(function(item) {
            return safeStr(item).trim();
          }).filter(Boolean)
        )
      );

      const experience = safeArr(data.experience);
      const projects = safeArr(data.projects);
      const achievements = safeArr(data.achievements);
      const education = safeArr(data.education);
      const certifications = safeArr(data.certifications);
      const languages = safeArr(data.languages);

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      const contactItems = [];
      if (email) {
        contactItems.push(
          '<span class="contact-pill">✉ ' + escapeHtml(email) + '</span>'
        );
      }
      if (phone) {
        contactItems.push(
          '<span class="contact-pill">☎ ' + escapeHtml(phone) + '</span>'
        );
      }
      if (country) {
        contactItems.push(
          '<span class="contact-pill">⚲ ' + escapeHtml(country) + '</span>'
        );
      }
      if (linkedin) {
        contactItems.push(
          '<span class="contact-pill">🔗 ' + escapeHtml(linkedin) + '</span>'
        );
      }

      const headerHtml = (fullName || profession || contactItems.length)
        ? (
          '<section class="header-card" data-section="header">' +
            '<div class="header-top">' +
              (fullName ? '<h1 class="name">' + escapeHtml(fullName) + '</h1>' : '') +
              (profession ? '<div class="profession">' + escapeHtml(profession) + '</div>' : '') +
            '</div>' +
            (contactItems.length
              ? '<div class="contact-row" data-section="contact">' + contactItems.join('') + '</div>'
              : '') +
          '</section>'
        )
        : '';

      const profileHtml = summary
        ? (
          '<section class="section" data-section="profile">' +
            this.renderSectionTitle(t.profile) +
            '<div class="profile-text">' + escapeHtml(summary) + '</div>' +
          '</section>'
        )
        : '';

      const skillsHtml = combinedSkills.length
        ? (
          '<section class="section" data-section="skills">' +
            this.renderSectionTitle(t.skills) +
            '<div class="skills-grid">' +
              combinedSkills.map(function(skill, index) {
                return '<span class="skill-chip" data-entry-id="skill-' + index + '">' + escapeHtml(skill) + '</span>';
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
                        (title ? '<div class="entry-title">' + escapeHtml(title) + '</div>' : '') +
                        ((company || location)
                          ? '<div class="entry-subtitle">' +
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
                const id = safeStr(item.id) || ('project-' + index);
                const name = safeStr(item.name);
                const description = safeStr(item.description);
                const technologies = safeArr(item.technologies).map(function(x) { return safeStr(x).trim(); }).filter(Boolean);
                const url = safeStr(item.url);

                return (
                  '<article class="entry" data-entry-id="' + escapeHtml(id) + '">' +
                    '<div class="entry-head">' +
                      '<div class="entry-main">' +
                        (name ? '<div class="entry-title">' + escapeHtml(name) + '</div>' : '') +
                        (url ? '<div class="entry-link">' + escapeHtml(url) + '</div>' : '') +
                      '</div>' +
                    '</div>' +
                    (description ? '<div class="entry-text">' + escapeHtml(description) + '</div>' : '') +
                    (technologies.length
                      ? '<div class="tag-row">' +
                          technologies.map(function(tech) {
                            return '<span class="tag">' + escapeHtml(tech) + '</span>';
                          }).join('') +
                        '</div>'
                      : '') +
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
                const id = safeStr(item.id) || ('achievement-' + index);
                const title = safeStr(item.title);
                const description = safeStr(item.description);
                const year = safeStr(item.year);

                return (
                  '<article class="entry compact" data-entry-id="' + escapeHtml(id) + '">' +
                    '<div class="entry-head">' +
                      '<div class="entry-main">' +
                        (title ? '<div class="entry-title">' + escapeHtml(title) + '</div>' : '') +
                      '</div>' +
                      (year ? '<div class="entry-date">' + escapeHtml(year) + '</div>' : '') +
                    '</div>' +
                    (description ? '<div class="entry-text">' + escapeHtml(description) + '</div>' : '') +
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
                          ? '<div class="entry-title">' + [degree, field].filter(Boolean).map(escapeHtml).join(' — ') + '</div>'
                          : '') +
                        (institution
                          ? '<div class="entry-subtitle">' +
                              escapeHtml(institution) +
                              (gpa ? ' · GPA: ' + escapeHtml(gpa) : '') +
                            '</div>'
                          : (gpa ? '<div class="entry-subtitle">GPA: ' + escapeHtml(gpa) + '</div>' : '')) +
                      '</div>' +
                      (range ? '<div class="entry-date">' + escapeHtml(range) + '</div>' : '') +
                    '</div>' +
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
                const id = safeStr(item.id) || ('certification-' + index);
                const name = safeStr(item.name);
                const issuer = safeStr(item.issuer);
                const date = formatShortDate(item.date, lang);

                return (
                  '<article class="entry compact" data-entry-id="' + escapeHtml(id) + '">' +
                    '<div class="entry-head">' +
                      '<div class="entry-main">' +
                        (name ? '<div class="entry-title">' + escapeHtml(name) + '</div>' : '') +
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
            '<div class="language-list">' +
              languages.map(function(item, index) {
                const id = safeStr(item.id) || ('language-' + index);
                const name = safeStr(item.name);
                const rawLevel = safeStr(item.level).toLowerCase();
                const translatedLevel = (t.levelMap && t.levelMap[rawLevel]) ? t.levelMap[rawLevel] : rawLevel;

                return (
                  '<div class="language-item" data-entry-id="' + escapeHtml(id) + '">' +
                    '<span class="language-name">' + escapeHtml(name) + '</span>' +
                    '<span class="language-sep">—</span>' +
                    '<span class="language-level">' + escapeHtml(translatedLevel) + '</span>' +
                  '</div>'
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
            color: #2f2a27;
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
            background: #fcfbf8;
            padding: 18mm 16mm 18mm 16mm;
            font-family: Arial, Helvetica, sans-serif;
            color: #322d2a;
            position: relative;
          }

          .page::before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 82mm;
            height: 34mm;
            background:
              radial-gradient(circle at 85% 25%, rgba(199, 186, 172, 0.28) 0, rgba(199, 186, 172, 0.28) 1mm, transparent 1.1mm),
              repeating-radial-gradient(circle at 100% 0,
                rgba(201, 191, 179, 0.28) 0 1.2mm,
                transparent 1.2mm 5mm);
            opacity: 0.8;
            pointer-events: none;
          }

          .header-card {
            background: linear-gradient(180deg, #d4cdc4 0%, #cec6bc 100%);
            border-radius: 2px;
            padding: 18px 22px 16px;
            margin-bottom: 18px;
            border: 1px solid rgba(90, 74, 62, 0.08);
          }

          .header-top {
            margin-bottom: 10px;
          }

          .name {
            margin: 0;
            font-family: Georgia, "Times New Roman", serif;
            font-size: 33px;
            line-height: 1.05;
            font-weight: 500;
            letter-spacing: 0.2px;
            color: #2d2926;
          }

          .profession {
            margin-top: 8px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1.8px;
            color: #5b5047;
            font-weight: 700;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 10px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 5px 10px;
            background: rgba(255, 255, 255, 0.56);
            border: 1px solid rgba(91, 80, 71, 0.14);
            border-radius: 999px;
            font-size: 11.5px;
            color: #403731;
          }

          .section {
            margin-top: 16px;
          }

          .section-title {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 0 0 10px;
            font-size: 13px;
            line-height: 1.2;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.4px;
            color: #37302c;
          }

          .section-title::before {
            content: "";
            width: 18px;
            height: 2px;
            background: #b59f86;
            flex: 0 0 auto;
          }

          .section-title::after {
            content: "";
            height: 1px;
            background: #ddd4ca;
            flex: 1 1 auto;
          }

          .profile-text,
          .entry-text {
            font-size: 12.5px;
            line-height: 1.6;
            color: #453d38;
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
            padding: 6px 10px;
            border-radius: 999px;
            font-size: 11.5px;
            line-height: 1.2;
            background: #efe7de;
            color: #4a4039;
            border: 1px solid #e1d5c8;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            margin-top: 10px;
          }

          .stack {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            padding-bottom: 12px;
            border-bottom: 1px solid #ebe3da;
          }

          .entry:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .entry.compact {
            padding-bottom: 10px;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 14px;
          }

          .entry-main {
            min-width: 0;
            flex: 1 1 auto;
          }

          .entry-title {
            font-size: 14px;
            line-height: 1.35;
            font-weight: 700;
            color: #2f2a27;
          }

          .entry-subtitle,
          .entry-link,
          .entry-date {
            font-size: 11.5px;
            line-height: 1.45;
            color: #6d6258;
          }

          .entry-subtitle {
            margin-top: 2px;
          }

          .entry-link {
            margin-top: 2px;
            word-break: break-word;
          }

          .entry-date {
            flex: 0 0 auto;
            white-space: nowrap;
            text-align: right;
            padding-top: 1px;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 0 0 4px;
            font-size: 12.5px;
            line-height: 1.55;
            color: #453d38;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .language-item {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            font-size: 12.5px;
            line-height: 1.5;
            color: #453d38;
            padding-bottom: 8px;
            border-bottom: 1px solid #ebe3da;
          }

          .language-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .language-name {
            font-weight: 700;
            color: #312b28;
          }

          .language-sep,
          .language-level {
            color: #6d6258;
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

  if (!customElements.get('gqr-resume-arch-v2')) {
    customElements.define('gqr-resume-arch-v2', GQRResumeArchV2);
  }
})();