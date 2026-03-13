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
    if (!isNaN(d.getTime())) return d;

    if (/^\d{4}-\d{2}$/.test(String(value))) {
      const dd = new Date(String(value) + '-01');
      return isNaN(dd.getTime()) ? null : dd;
    }

    if (/^\d{4}$/.test(String(value))) {
      const dy = new Date(String(value) + '-01-01');
      return isNaN(dy.getTime()) ? null : dy;
    }

    return null;
  }

  function formatShortDate(value, lang) {
    const d = toDate(value);
    if (!d) return escapeHtml(value || '');
    return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      month: 'short',
      year: 'numeric'
    }).format(d);
  }

  function formatDateRange(startDate, endDate, isCurrentLike, lang) {
    const i18n = I18N[lang] || I18N.en;
    const start = startDate ? formatShortDate(startDate, lang) : '';
    const end = isCurrentLike ? i18n.present : (endDate ? formatShortDate(endDate, lang) : '');
    if (start && end) return start + ' — ' + end;
    return start || end || '';
  }

  class GQRResumeGustV1 extends HTMLElement {
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
      const data = this._data || {};
      const lang = this.getLanguage();
      const t = I18N[lang] || I18N.en;

      const firstName = safeStr(data.firstName);
      const lastName = safeStr(data.lastName);
      const fullName = (firstName + ' ' + lastName).trim();
      const profession = safeStr(data.profession);
      const email = safeStr(data.email);
      const phone = safeStr(data.phone);
      const country = safeStr(data.country);
      const linkedin = safeStr(data.linkedin);
      const summary = safeStr(data.summary);

      const skillsCombined = Array.from(
        new Set(
          safeArr(data.skillsRaw)
            .concat(safeArr(data.toolsRaw))
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

      const contactItems = [];
      if (email) {
        contactItems.push('<span class="contact-pill">✉ ' + escapeHtml(email) + '</span>');
      }
      if (phone) {
        contactItems.push('<span class="contact-pill">☎ ' + escapeHtml(phone) + '</span>');
      }
      if (country) {
        contactItems.push('<span class="contact-pill">⚲ ' + escapeHtml(country) + '</span>');
      }
      if (linkedin) {
        contactItems.push('<span class="contact-pill">🔗 ' + escapeHtml(linkedin) + '</span>');
      }

      const headerHtml = (fullName || profession || contactItems.length)
        ? (
          '<section class="header" data-section="header">' +
            '<div class="header-top">' +
              (fullName ? '<h1 class="name">' + escapeHtml(fullName) + '</h1>' : '') +
              (profession ? '<div class="profession">' + escapeHtml(profession) + '</div>' : '') +
            '</div>' +
            (contactItems.length
              ? '<div class="contact" data-section="contact">' + contactItems.join('') + '</div>'
              : '') +
          '</section>'
        )
        : '';

      const profileHtml = summary
        ? (
          '<section class="section" data-section="profile">' +
            '<h2 class="section-title">' + escapeHtml(t.profile) + '</h2>' +
            '<div class="section-body">' +
              '<p class="summary">' + escapeHtml(summary) + '</p>' +
            '</div>' +
          '</section>'
        )
        : '';

      const skillsHtml = skillsCombined.length
        ? (
          '<section class="section" data-section="skills">' +
            '<h2 class="section-title">' + escapeHtml(t.skills) + '</h2>' +
            '<div class="section-body">' +
              '<div class="chips">' +
                skillsCombined.map(function(skill, idx) {
                  return '<span class="chip" data-entry-id="skill-' + idx + '">' + escapeHtml(skill) + '</span>';
                }).join('') +
              '</div>' +
            '</div>' +
          '</section>'
        )
        : '';

      const experienceHtml = experience.length
        ? (
          '<section class="section" data-section="experience">' +
            '<h2 class="section-title">' + escapeHtml(t.experience) + '</h2>' +
            '<div class="section-body">' +
              experience.map(function(item, index) {
                const id = safeStr(item.id) || ('experience-' + index);
                const title = safeStr(item.title);
                const company = safeStr(item.company);
                const location = safeStr(item.location);
                const bullets = safeArr(item.achievements).concat(safeArr(item.responsibilities))
                  .map(function(x) { return safeStr(x).trim(); })
                  .filter(Boolean);
                const metaParts = [company, location].filter(Boolean);
                const dateRange = formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang);

                return (
                  '<article class="entry" data-entry-id="' + escapeHtml(id) + '">' +
                    '<div class="entry-head">' +
                      '<div class="entry-main">' +
                        (title ? '<h3 class="entry-title">' + escapeHtml(title) + '</h3>' : '') +
                        (metaParts.length ? '<div class="entry-subtitle">' + escapeHtml(metaParts.join(' · ')) + '</div>' : '') +
                      '</div>' +
                      (dateRange ? '<div class="entry-date">' + escapeHtml(dateRange) + '</div>' : '') +
                    '</div>' +
                    (bullets.length
                      ? '<ul class="bullets">' + bullets.map(function(b) {
                          return '<li>' + escapeHtml(b) + '</li>';
                        }).join('') + '</ul>'
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
            '<h2 class="section-title">' + escapeHtml(t.projects) + '</h2>' +
            '<div class="section-body">' +
              projects.map(function(item, index) {
                const id = safeStr(item.id) || ('project-' + index);
                const name = safeStr(item.name);
                const description = safeStr(item.description);
                const technologies = safeArr(item.technologies)
                  .map(function(x) { return safeStr(x).trim(); })
                  .filter(Boolean);
                const url = safeStr(item.url);

                return (
                  '<article class="entry compact" data-entry-id="' + escapeHtml(id) + '">' +
                    '<div class="entry-head">' +
                      '<div class="entry-main">' +
                        (name ? '<h3 class="entry-title">' + escapeHtml(name) + '</h3>' : '') +
                        (url ? '<div class="entry-link">' + escapeHtml(url) + '</div>' : '') +
                      '</div>' +
                    '</div>' +
                    (description ? '<p class="entry-text">' + escapeHtml(description) + '</p>' : '') +
                    (technologies.length
                      ? '<div class="chips small">' + technologies.map(function(tech, techIdx) {
                          return '<span class="chip" data-entry-id="' + escapeHtml(id) + '-tech-' + techIdx + '">' + escapeHtml(tech) + '</span>';
                        }).join('') + '</div>'
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
            '<h2 class="section-title">' + escapeHtml(t.achievements) + '</h2>' +
            '<div class="section-body">' +
              achievements.map(function(item, index) {
                const id = safeStr(item.id) || ('achievement-' + index);
                const title = safeStr(item.title);
                const description = safeStr(item.description);
                const year = safeStr(item.year);

                return (
                  '<article class="entry compact" data-entry-id="' + escapeHtml(id) + '">' +
                    '<div class="entry-head">' +
                      '<div class="entry-main">' +
                        (title ? '<h3 class="entry-title">' + escapeHtml(title) + '</h3>' : '') +
                      '</div>' +
                      (year ? '<div class="entry-date">' + escapeHtml(year) + '</div>' : '') +
                    '</div>' +
                    (description ? '<p class="entry-text">' + escapeHtml(description) + '</p>' : '') +
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
            '<h2 class="section-title">' + escapeHtml(t.education) + '</h2>' +
            '<div class="section-body">' +
              education.map(function(item, index) {
                const id = safeStr(item.id) || ('education-' + index);
                const degree = safeStr(item.degree);
                const field = safeStr(item.field);
                const institution = safeStr(item.institution);
                const gpa = safeStr(item.gpa);
                const title = [degree, field].filter(Boolean).join(' — ');
                const dateRange = formatDateRange(item.startDate, item.endDate, item.isCompleted === false, lang);

                return (
                  '<article class="entry compact" data-entry-id="' + escapeHtml(id) + '">' +
                    '<div class="entry-head">' +
                      '<div class="entry-main">' +
                        (title ? '<h3 class="entry-title">' + escapeHtml(title) + '</h3>' : '') +
                        (institution ? '<div class="entry-subtitle">' + escapeHtml(institution) + (gpa ? ' · GPA: ' + escapeHtml(gpa) : '') + '</div>' : (gpa ? '<div class="entry-subtitle">GPA: ' + escapeHtml(gpa) + '</div>' : '')) +
                      '</div>' +
                      (dateRange ? '<div class="entry-date">' + escapeHtml(dateRange) + '</div>' : '') +
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
            '<h2 class="section-title">' + escapeHtml(t.certifications) + '</h2>' +
            '<div class="section-body">' +
              certifications.map(function(item, index) {
                const id = safeStr(item.id) || ('certification-' + index);
                const name = safeStr(item.name);
                const issuer = safeStr(item.issuer);
                const date = safeStr(item.date) ? formatShortDate(item.date, lang) : '';

                return (
                  '<article class="entry compact" data-entry-id="' + escapeHtml(id) + '">' +
                    '<div class="entry-head">' +
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
            '<h2 class="section-title">' + escapeHtml(t.languages) + '</h2>' +
            '<div class="section-body">' +
              '<div class="language-list">' +
                languages.map(function(item, index) {
                  const id = safeStr(item.id) || ('language-' + index);
                  const name = safeStr(item.name);
                  const levelKey = safeStr(item.level).toLowerCase();
                  const levelLabel = t.levelMap[levelKey] || levelKey;
                  return (
                    '<div class="language-item" data-entry-id="' + escapeHtml(id) + '">' +
                      '<span class="language-name">' + escapeHtml(name) + '</span>' +
                      '<span class="language-sep">—</span>' +
                      '<span class="language-level">' + escapeHtml(levelLabel) + '</span>' +
                    '</div>'
                  );
                }).join('') +
              '</div>' +
            '</div>' +
          '</section>'
        )
        : '';

      this.shadowRoot.innerHTML = ''
        + '<style>'
        + '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");'
        + ':host {'
        + '  display: block;'
        + '  color: #2d2f33;'
        + '  -webkit-print-color-adjust: exact;'
        + '  print-color-adjust: exact;'
        + '}'
        + '* { box-sizing: border-box; }'
        + '.page {'
        + '  width: 210mm;'
        + '  min-height: 297mm;'
        + '  height: auto;'
        + '  overflow: visible;'
        + '  background: #ffffff;'
        + '  color: #2d2f33;'
        + '  font-family: "Inter", Arial, Helvetica, sans-serif;'
        + '  padding: 0;'
        + '  margin: 0 auto;'
        + '}'
        + '.header {'
        + '  background: linear-gradient(135deg, #2f3a4f 0%, #3a455b 100%);'
        + '  color: #ffffff;'
        + '  padding: 30px 38px 24px;'
        + '  border-bottom: 6px solid #b3b8bf;'
        + '}'
        + '.header-top {'
        + '  display: flex;'
        + '  flex-direction: column;'
        + '  gap: 6px;'
        + '}'
        + '.name {'
        + '  margin: 0;'
        + '  font-size: 31px;'
        + '  line-height: 1.08;'
        + '  font-weight: 800;'
        + '  letter-spacing: 0.03em;'
        + '  text-transform: uppercase;'
        + '}'
        + '.profession {'
        + '  font-size: 14px;'
        + '  font-weight: 600;'
        + '  letter-spacing: 0.12em;'
        + '  text-transform: uppercase;'
        + '  color: rgba(255,255,255,0.88);'
        + '}'
        + '.contact {'
        + '  display: flex;'
        + '  flex-wrap: wrap;'
        + '  gap: 8px;'
        + '  margin-top: 18px;'
        + '}'
        + '.contact-pill {'
        + '  display: inline-flex;'
        + '  align-items: center;'
        + '  padding: 6px 10px;'
        + '  border: 1px solid rgba(255,255,255,0.26);'
        + '  border-radius: 999px;'
        + '  font-size: 11.5px;'
        + '  line-height: 1.2;'
        + '  color: #ffffff;'
        + '  background: rgba(255,255,255,0.07);'
        + '}'
        + '.content {'
        + '  padding: 26px 38px 34px;'
        + '}'
        + '.section {'
        + '  margin: 0 0 22px;'
        + '}'
        + '.section:last-child {'
        + '  margin-bottom: 0;'
        + '}'
        + '.section-title {'
        + '  margin: 0 0 12px;'
        + '  font-size: 15px;'
        + '  font-weight: 800;'
        + '  letter-spacing: 0.12em;'
        + '  text-transform: uppercase;'
        + '  color: #394459;'
        + '  padding-bottom: 7px;'
        + '  border-bottom: 1.5px solid #b8bcc4;'
        + '}'
        + '.section-body {'
        + '  display: block;'
        + '}'
        + '.summary {'
        + '  margin: 0;'
        + '  font-size: 13px;'
        + '  line-height: 1.65;'
        + '  color: #3c4046;'
        + '}'
        + '.chips {'
        + '  display: flex;'
        + '  flex-wrap: wrap;'
        + '  gap: 8px;'
        + '}'
        + '.chips.small {'
        + '  margin-top: 8px;'
        + '}'
        + '.chip {'
        + '  display: inline-flex;'
        + '  align-items: center;'
        + '  padding: 6px 10px;'
        + '  border-radius: 999px;'
        + '  border: 1px solid #c7ccd4;'
        + '  background: #f3f5f7;'
        + '  color: #334055;'
        + '  font-size: 11.5px;'
        + '  line-height: 1.2;'
        + '  font-weight: 500;'
        + '}'
        + '.entry {'
        + '  padding: 0 0 14px;'
        + '  margin: 0 0 14px;'
        + '  border-bottom: 1px solid #e2e5e9;'
        + '}'
        + '.entry:last-child {'
        + '  margin-bottom: 0;'
        + '  padding-bottom: 0;'
        + '  border-bottom: none;'
        + '}'
        + '.entry.compact {'
        + '  padding-bottom: 12px;'
        + '  margin-bottom: 12px;'
        + '}'
        + '.entry-head {'
        + '  display: flex;'
        + '  justify-content: space-between;'
        + '  align-items: flex-start;'
        + '  gap: 12px;'
        + '}'
        + '.entry-main {'
        + '  min-width: 0;'
        + '  flex: 1;'
        + '}'
        + '.entry-title {'
        + '  margin: 0;'
        + '  font-size: 14px;'
        + '  line-height: 1.35;'
        + '  font-weight: 700;'
        + '  color: #24282f;'
        + '}'
        + '.entry-subtitle, .entry-link {'
        + '  margin-top: 3px;'
        + '  font-size: 12px;'
        + '  line-height: 1.45;'
        + '  color: #596170;'
        + '}'
        + '.entry-date {'
        + '  flex: 0 0 auto;'
        + '  font-size: 11.5px;'
        + '  line-height: 1.3;'
        + '  font-weight: 600;'
        + '  color: #445066;'
        + '  white-space: nowrap;'
        + '  padding-top: 1px;'
        + '}'
        + '.entry-text {'
        + '  margin: 7px 0 0;'
        + '  font-size: 12.5px;'
        + '  line-height: 1.6;'
        + '  color: #3c4046;'
        + '}'
        + '.bullets {'
        + '  margin: 8px 0 0 0;'
        + '  padding: 0 0 0 18px;'
        + '}'
        + '.bullets li {'
        + '  margin: 0 0 4px;'
        + '  font-size: 12.5px;'
        + '  line-height: 1.55;'
        + '  color: #3a3f46;'
        + '}'
        + '.bullets li:last-child {'
        + '  margin-bottom: 0;'
        + '}'
        + '.language-list {'
        + '  display: flex;'
        + '  flex-direction: column;'
        + '  gap: 8px;'
        + '}'
        + '.language-item {'
        + '  display: flex;'
        + '  align-items: baseline;'
        + '  gap: 8px;'
        + '  font-size: 12.5px;'
        + '  line-height: 1.5;'
        + '}'
        + '.language-name {'
        + '  font-weight: 700;'
        + '  color: #263246;'
        + '}'
        + '.language-sep, .language-level {'
        + '  color: #596170;'
        + '}'
        + '@media print {'
        + '  .page {'
        + '    width: 210mm;'
        + '    min-height: 297mm;'
        + '  }'
        + '}'
        + '</style>'
        + '<div class="page">'
        +   headerHtml
        +   '<div class="content">'
        +     profileHtml
        +     skillsHtml
        +     experienceHtml
        +     projectsHtml
        +     achievementsHtml
        +     educationHtml
        +     certificationsHtml
        +     languagesHtml
        +   '</div>'
        + '</div>';
    }
  }

  if (!customElements.get('gqr-resume-gust-v1')) {
    customElements.define('gqr-resume-gust-v1', GQRResumeGustV1);
  }
})();