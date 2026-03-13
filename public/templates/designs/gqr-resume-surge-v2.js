(function() {
  'use strict';

  const I18N = {
    es: {
      profile: 'Perfil',
      experience: 'Experiencia',
      education: 'Formación',
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

  function uniqueArray(arr) {
    const seen = new Set();
    return safeArr(arr).filter(function(item) {
      const key = safeStr(item).trim().toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function formatShortDate(value, lang) {
    const raw = safeStr(value).trim();
    if (!raw) return '';
    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) return escapeHtml(raw);

    return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  function formatDateRange(startDate, endDate, lang, currentFlag, useIncompleteEducationRule) {
    const dict = I18N[lang] || I18N.en;
    const start = formatShortDate(startDate, lang);
    let end = '';

    if (useIncompleteEducationRule) {
      end = currentFlag === false ? dict.present : formatShortDate(endDate, lang);
    } else {
      end = currentFlag ? dict.present : formatShortDate(endDate, lang);
    }

    if (start && end) return start + ' — ' + end;
    return start || end || '';
  }

  class GQRResumeSurgeV2 extends HTMLElement {
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

    getLanguage() {
      const attr = safeStr(this.getAttribute('language')).toLowerCase();
      const dataLang = safeStr(this._data && this._data.language).toLowerCase();
      const lang = attr || dataLang || 'en';
      return lang === 'es' ? 'es' : 'en';
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'language' && oldValue !== newValue) {
        this.render();
      }
    }

    renderSectionTitle(title) {
      return '<div class="section-title-wrap"><h2 class="section-title">' + escapeHtml(title) + '</h2></div>';
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

      const skillsCombined = uniqueArray(
        safeArr(data.skillsRaw).concat(safeArr(data.toolsRaw))
      );

      const experience = safeArr(data.experience);
      const projects = safeArr(data.projects);
      const achievements = safeArr(data.achievements);
      const education = safeArr(data.education);
      const certifications = safeArr(data.certifications);
      const languages = safeArr(data.languages);

      const contactItems = [
        email ? '<span class="contact-item">✉ ' + escapeHtml(email) + '</span>' : '',
        phone ? '<span class="contact-item">☎ ' + escapeHtml(phone) + '</span>' : '',
        country ? '<span class="contact-item">⚲ ' + escapeHtml(country) + '</span>' : '',
        linkedin ? '<span class="contact-item">🔗 ' + escapeHtml(linkedin) + '</span>' : ''
      ].filter(Boolean).join('');

      const headerSection = (firstName || lastName || profession || contactItems)
        ? (
          '<section class="header" data-section="header">' +
            '<div class="header-accent"></div>' +
            '<div class="header-inner">' +
              '<div class="name-block">' +
                ((firstName || lastName)
                  ? '<h1 class="name">' + escapeHtml((firstName + ' ' + lastName).trim()) + '</h1>'
                  : '') +
                (profession ? '<div class="profession">' + escapeHtml(profession) + '</div>' : '') +
              '</div>' +
              (contactItems
                ? '<div class="contact" data-section="contact">' + contactItems + '</div>'
                : '') +
            '</div>' +
          '</section>'
        )
        : '';

      const profileSection = summary
        ? (
          '<section class="section" data-section="profile">' +
            this.renderSectionTitle(t.profile) +
            '<div class="section-body">' +
              '<p class="summary">' + escapeHtml(summary) + '</p>' +
            '</div>' +
          '</section>'
        )
        : '';

      const skillsSection = skillsCombined.length
        ? (
          '<section class="section" data-section="skills">' +
            this.renderSectionTitle(t.skills) +
            '<div class="section-body">' +
              '<div class="chip-grid">' +
                skillsCombined.map(function(skill, index) {
                  return '<span class="chip" data-entry-id="skill-' + index + '">' + escapeHtml(skill) + '</span>';
                }).join('') +
              '</div>' +
            '</div>' +
          '</section>'
        )
        : '';

      const experienceSection = experience.length
        ? (
          '<section class="section" data-section="experience">' +
            this.renderSectionTitle(t.experience) +
            '<div class="section-body entries">' +
              experience.map(function(item, index) {
                const bullets = uniqueArray(
                  safeArr(item.achievements).concat(safeArr(item.responsibilities))
                );
                const range = formatDateRange(item.startDate, item.endDate, lang, !!item.isCurrent, false);
                const location = safeStr(item.location);
                const company = safeStr(item.company);
                const title = safeStr(item.title);
                const metaParts = [
                  company ? '<span>' + escapeHtml(company) + '</span>' : '',
                  location ? '<span>' + escapeHtml(location) + '</span>' : ''
                ].filter(Boolean).join('<span class="dot">•</span>');

                return (
                  '<article class="entry timeline-entry" data-entry-id="' + escapeHtml(item.id || ('experience-' + index)) + '">' +
                    '<div class="entry-top">' +
                      '<div class="entry-main">' +
                        (title ? '<h3 class="entry-title">' + escapeHtml(title) + '</h3>' : '') +
                        (metaParts ? '<div class="entry-subtitle">' + metaParts + '</div>' : '') +
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

      const projectsSection = projects.length
        ? (
          '<section class="section" data-section="projects">' +
            this.renderSectionTitle(t.projects) +
            '<div class="section-body entries">' +
              projects.map(function(item, index) {
                const technologies = uniqueArray(item.technologies);
                return (
                  '<article class="entry project-entry" data-entry-id="' + escapeHtml(item.id || ('project-' + index)) + '">' +
                    '<div class="entry-top">' +
                      '<div class="entry-main">' +
                        (item.name ? '<h3 class="entry-title">' + escapeHtml(item.name) + '</h3>' : '') +
                      '</div>' +
                      (item.url ? '<div class="entry-link">' + escapeHtml(item.url) + '</div>' : '') +
                    '</div>' +
                    (item.description ? '<p class="entry-text">' + escapeHtml(item.description) + '</p>' : '') +
                    (technologies.length
                      ? '<div class="tech-row">' +
                          technologies.map(function(tech) {
                            return '<span class="mini-chip">' + escapeHtml(tech) + '</span>';
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

      const achievementsSection = achievements.length
        ? (
          '<section class="section" data-section="achievements">' +
            this.renderSectionTitle(t.achievements) +
            '<div class="section-body entries">' +
              achievements.map(function(item, index) {
                return (
                  '<article class="entry compact-entry" data-entry-id="' + escapeHtml(item.id || ('achievement-' + index)) + '">' +
                    '<div class="entry-top">' +
                      '<div class="entry-main">' +
                        (item.title ? '<h3 class="entry-title">' + escapeHtml(item.title) + '</h3>' : '') +
                      '</div>' +
                      (item.year ? '<div class="entry-date">' + escapeHtml(item.year) + '</div>' : '') +
                    '</div>' +
                    (item.description ? '<p class="entry-text">' + escapeHtml(item.description) + '</p>' : '') +
                  '</article>'
                );
              }).join('') +
            '</div>' +
          '</section>'
        )
        : '';

      const educationSection = education.length
        ? (
          '<section class="section" data-section="education">' +
            this.renderSectionTitle(t.education) +
            '<div class="section-body entries">' +
              education.map(function(item, index) {
                const degree = safeStr(item.degree);
                const field = safeStr(item.field);
                const institution = safeStr(item.institution);
                const gpa = safeStr(item.gpa);
                const title = [degree, field].filter(Boolean).join(' — ');
                const range = formatDateRange(item.startDate, item.endDate, lang, item.isCompleted, true);

                return (
                  '<article class="entry timeline-entry" data-entry-id="' + escapeHtml(item.id || ('education-' + index)) + '">' +
                    '<div class="entry-top">' +
                      '<div class="entry-main">' +
                        (title ? '<h3 class="entry-title">' + escapeHtml(title) + '</h3>' : '') +
                        ((institution || gpa)
                          ? '<div class="entry-subtitle">' +
                              [
                                institution ? '<span>' + escapeHtml(institution) + '</span>' : '',
                                gpa ? '<span>GPA: ' + escapeHtml(gpa) + '</span>' : ''
                              ].filter(Boolean).join('<span class="dot">•</span>') +
                            '</div>'
                          : '') +
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

      const certificationsSection = certifications.length
        ? (
          '<section class="section" data-section="certifications">' +
            this.renderSectionTitle(t.certifications) +
            '<div class="section-body entries">' +
              certifications.map(function(item, index) {
                return (
                  '<article class="entry compact-entry" data-entry-id="' + escapeHtml(item.id || ('certification-' + index)) + '">' +
                    '<div class="entry-top">' +
                      '<div class="entry-main">' +
                        (item.name ? '<h3 class="entry-title">' + escapeHtml(item.name) + '</h3>' : '') +
                        (item.issuer ? '<div class="entry-subtitle"><span>' + escapeHtml(item.issuer) + '</span></div>' : '') +
                      '</div>' +
                      (item.date ? '<div class="entry-date">' + escapeHtml(formatShortDate(item.date, lang)) + '</div>' : '') +
                    '</div>' +
                  '</article>'
                );
              }).join('') +
            '</div>' +
          '</section>'
        )
        : '';

      const languagesSection = languages.length
        ? (
          '<section class="section" data-section="languages">' +
            this.renderSectionTitle(t.languages) +
            '<div class="section-body">' +
              '<div class="language-list">' +
                languages.map(function(item, index) {
                  const levelKey = safeStr(item.level).toLowerCase();
                  const translatedLevel = (t.levelMap && t.levelMap[levelKey]) ? t.levelMap[levelKey] : safeStr(item.level);
                  return (
                    '<div class="language-item" data-entry-id="' + escapeHtml(item.id || ('language-' + index)) + '">' +
                      '<span class="language-name">' + escapeHtml(item.name) + '</span>' +
                      '<span class="language-sep">—</span>' +
                      '<span class="language-level">' + escapeHtml(translatedLevel) + '</span>' +
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
        + '  :host {'
        + '    display: block;'
        + '    color: #352f30;'
        + '    -webkit-print-color-adjust: exact;'
        + '    print-color-adjust: exact;'
        + '  }'
        + '  * { box-sizing: border-box; }'
        + '  .page {'
        + '    width: 210mm;'
        + '    min-height: 297mm;'
        + '    height: auto;'
        + '    overflow: visible;'
        + '    margin: 0 auto;'
        + '    padding: 18mm 18mm 16mm;'
        + '    background: #fcfbf9;'
        + '    font-family: Georgia, "Times New Roman", serif;'
        + '    line-height: 1.45;'
        + '  }'
        + '  .header {'
        + '    margin-bottom: 10mm;'
        + '    border: 1px solid #dfc9cb;'
        + '    background: linear-gradient(180deg, #ead5d6 0%, #f4eceb 100%);'
        + '  }'
        + '  .header-accent {'
        + '    height: 8px;'
        + '    background: #bb8f87;'
        + '  }'
        + '  .header-inner {'
        + '    padding: 10mm 9mm 8mm;'
        + '  }'
        + '  .name {'
        + '    margin: 0;'
        + '    font-size: 31px;'
        + '    line-height: 1.05;'
        + '    font-weight: 700;'
        + '    letter-spacing: 0.5px;'
        + '    color: #2f2627;'
        + '    text-transform: uppercase;'
        + '  }'
        + '  .profession {'
        + '    margin-top: 4px;'
        + '    font-family: Arial, Helvetica, sans-serif;'
        + '    font-size: 12px;'
        + '    letter-spacing: 2.6px;'
        + '    text-transform: uppercase;'
        + '    color: #6f5a5a;'
        + '  }'
        + '  .contact {'
        + '    margin-top: 7mm;'
        + '    display: flex;'
        + '    flex-wrap: wrap;'
        + '    gap: 8px 10px;'
        + '  }'
        + '  .contact-item {'
        + '    display: inline-flex;'
        + '    align-items: center;'
        + '    padding: 5px 9px;'
        + '    border: 1px solid #d7b8bb;'
        + '    border-radius: 999px;'
        + '    background: rgba(255,255,255,0.7);'
        + '    font-family: Arial, Helvetica, sans-serif;'
        + '    font-size: 11px;'
        + '    color: #5d4d4e;'
        + '  }'
        + '  .section {'
        + '    margin-bottom: 8mm;'
        + '  }'
        + '  .section-title-wrap {'
        + '    display: flex;'
        + '    align-items: center;'
        + '    gap: 10px;'
        + '    margin-bottom: 4mm;'
        + '  }'
        + '  .section-title-wrap::before {'
        + '    content: "";'
        + '    width: 14px;'
        + '    height: 14px;'
        + '    border-radius: 50%;'
        + '    background: #cfa8ac;'
        + '    flex: 0 0 14px;'
        + '  }'
        + '  .section-title-wrap::after {'
        + '    content: "";'
        + '    flex: 1;'
        + '    height: 1px;'
        + '    background: #dcc8ca;'
        + '  }'
        + '  .section-title {'
        + '    margin: 0;'
        + '    font-family: Arial, Helvetica, sans-serif;'
        + '    font-size: 12px;'
        + '    font-weight: 700;'
        + '    letter-spacing: 2.2px;'
        + '    text-transform: uppercase;'
        + '    color: #5b4748;'
        + '    white-space: nowrap;'
        + '  }'
        + '  .section-body {'
        + '    padding-left: 24px;'
        + '  }'
        + '  .summary, .entry-text {'
        + '    margin: 0;'
        + '    font-size: 13px;'
        + '    color: #453d3e;'
        + '  }'
        + '  .entries {'
        + '    display: grid;'
        + '    gap: 5mm;'
        + '  }'
        + '  .entry {'
        + '    padding-bottom: 1mm;'
        + '  }'
        + '  .timeline-entry {'
        + '    position: relative;'
        + '    padding-left: 14px;'
        + '    border-left: 2px solid #ead7d8;'
        + '  }'
        + '  .timeline-entry::before {'
        + '    content: "";'
        + '    position: absolute;'
        + '    left: -6px;'
        + '    top: 2px;'
        + '    width: 10px;'
        + '    height: 10px;'
        + '    border-radius: 50%;'
        + '    background: #bb8f87;'
        + '  }'
        + '  .entry-top {'
        + '    display: flex;'
        + '    justify-content: space-between;'
        + '    align-items: flex-start;'
        + '    gap: 12px;'
        + '  }'
        + '  .entry-main {'
        + '    min-width: 0;'
        + '    flex: 1;'
        + '  }'
        + '  .entry-title {'
        + '    margin: 0;'
        + '    font-size: 15px;'
        + '    line-height: 1.25;'
        + '    color: #2f2627;'
        + '    font-weight: 700;'
        + '  }'
        + '  .entry-subtitle {'
        + '    margin-top: 3px;'
        + '    font-family: Arial, Helvetica, sans-serif;'
        + '    font-size: 11px;'
        + '    color: #796768;'
        + '    display: flex;'
        + '    flex-wrap: wrap;'
        + '    align-items: center;'
        + '    gap: 6px;'
        + '  }'
        + '  .dot { color: #b49597; }'
        + '  .entry-date, .entry-link {'
        + '    flex: 0 0 auto;'
        + '    font-family: Arial, Helvetica, sans-serif;'
        + '    font-size: 11px;'
        + '    letter-spacing: 0.3px;'
        + '    color: #6f5b5d;'
        + '    text-align: right;'
        + '    max-width: 36%;'
        + '    word-break: break-word;'
        + '  }'
        + '  .bullet-list {'
        + '    margin: 7px 0 0;'
        + '    padding-left: 18px;'
        + '  }'
        + '  .bullet-list li {'
        + '    margin: 0 0 4px;'
        + '    font-size: 13px;'
        + '    color: #453d3e;'
        + '  }'
        + '  .chip-grid {'
        + '    display: flex;'
        + '    flex-wrap: wrap;'
        + '    gap: 8px;'
        + '  }'
        + '  .chip {'
        + '    display: inline-block;'
        + '    padding: 6px 10px;'
        + '    border: 1px solid #d8babc;'
        + '    background: #f6efef;'
        + '    border-radius: 999px;'
        + '    font-family: Arial, Helvetica, sans-serif;'
        + '    font-size: 11px;'
        + '    color: #5d4d4e;'
        + '  }'
        + '  .tech-row {'
        + '    margin-top: 8px;'
        + '    display: flex;'
        + '    flex-wrap: wrap;'
        + '    gap: 6px;'
        + '  }'
        + '  .mini-chip {'
        + '    display: inline-block;'
        + '    padding: 4px 8px;'
        + '    border-radius: 4px;'
        + '    background: #efe3e4;'
        + '    color: #5d4d4e;'
        + '    font-family: Arial, Helvetica, sans-serif;'
        + '    font-size: 10px;'
        + '    text-transform: uppercase;'
        + '    letter-spacing: 0.6px;'
        + '  }'
        + '  .language-list {'
        + '    display: grid;'
        + '    gap: 6px;'
        + '  }'
        + '  .language-item {'
        + '    display: flex;'
        + '    flex-wrap: wrap;'
        + '    gap: 6px;'
        + '    align-items: baseline;'
        + '    font-size: 13px;'
        + '    color: #453d3e;'
        + '  }'
        + '  .language-name { font-weight: 700; color: #2f2627; }'
        + '  .language-sep { color: #b49597; }'
        + '  .language-level { color: #6d5b5d; }'
        + '  @media print {'
        + '    .page {'
        + '      width: 210mm;'
        + '      min-height: 297mm;'
        + '    }'
        + '  }'
        + '</style>'
        + '<div class="page">'
        +   headerSection
        +   profileSection
        +   skillsSection
        +   experienceSection
        +   projectsSection
        +   achievementsSection
        +   educationSection
        +   certificationsSection
        +   languagesSection
        + '</div>';
    }
  }

  if (!customElements.get('gqr-resume-surge-v2')) {
    customElements.define('gqr-resume-surge-v2', GQRResumeSurgeV2);
  }
})();