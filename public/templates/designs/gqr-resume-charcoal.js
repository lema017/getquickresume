/**
 * name: gqr-resume-charcoal
 * description: "Dark charcoal single-column resume with gold/amber accents, circular section icons, and a modern A4 layout."
 */

(function() {
  'use strict';

  var GOLD = '#d4a84b';
  var BG = '#2b2b2b';
  var BG_LIGHT = '#333';
  var TEXT = '#ddd';
  var TEXT_DIM = '#aaa';
  var WHITE = '#fff';

  var i18n = {
    es: {
      profile: "Perfil", experience: "Experiencia Profesional",
      education: "Educación", projects: "Proyectos", certifications: "Certificaciones",
      languages: "Idiomas", achievements: "Logros", skills: "Habilidades",
      current: "Actual", present: "Presente",
      basic: "Básico", intermediate: "Intermedio", advanced: "Avanzado", native: "Nativo"
    },
    en: {
      profile: "Profile", experience: "Professional Experience",
      education: "Education", projects: "Projects", certifications: "Certifications",
      languages: "Languages", achievements: "Achievements", skills: "Skills",
      current: "Current", present: "Present",
      basic: "Basic", intermediate: "Intermediate", advanced: "Advanced", native: "Native"
    }
  };

  var levelMap = {
    es: { basic: "Básico", intermediate: "Intermedio", advanced: "Avanzado", native: "Nativo" },
    en: { basic: "Basic", intermediate: "Intermediate", advanced: "Advanced", native: "Native" }
  };

  function safeStr(val) { return (val != null && typeof val === 'string') ? val : ''; }
  function safeArr(val) { return Array.isArray(val) ? val : []; }

  function formatDate(dateStr, lang) {
    if (!dateStr) return '';
    try {
      var date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      var monthNames = {
        es: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      };
      var months = monthNames[lang] || monthNames.en;
      return months[date.getMonth()] + ' ' + date.getFullYear();
    } catch(e) { return dateStr; }
  }

  function formatDateRange(startDate, endDate, isCurrent, lang) {
    var start = formatDate(startDate, lang);
    if (!endDate && !isCurrent) return start;
    var end = isCurrent ? (i18n[lang] && i18n[lang].present || 'Present') : formatDate(endDate, lang);
    return start + ' – ' + end;
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function levelBar(level) {
    var map = { basic: 1, intermediate: 2, advanced: 3, native: 4 };
    var filled = map[level] || 1;
    var out = '';
    for (var i = 0; i < 4; i++) {
      out += '<span class="bar-seg' + (i < filled ? ' bar-filled' : '') + '"></span>';
    }
    return out;
  }

  class GQRResumeCharcoal extends HTMLElement {
    constructor() {
      super();
      this._data = null;
      this._shadowRootRef = null;
    }

    static get observedAttributes() { return ['language']; }

    connectedCallback() {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
      }
      this.render();
    }

    attributeChangedCallback() {
      if (this.shadowRoot) { this.render(); }
    }

    get data() { return this._data || {}; }

    set data(value) {
      if (value && typeof value === 'object') {
        this._data = value;
        if (this.shadowRoot) { this.render(); }
      }
    }

    getLanguage() {
      return this.getAttribute('language') || (this.data && this.data.language) || 'en';
    }

    render() {
      var lang = this.getLanguage();
      var t = i18n[lang] || i18n.en;
      var data = this.data || {};

      var firstName = safeStr(data.firstName);
      var lastName = safeStr(data.lastName);
      var profession = safeStr(data.profession);
      var country = safeStr(data.country);
      var email = safeStr(data.email);
      var phone = safeStr(data.phone);
      var linkedin = safeStr(data.linkedin);
      var summary = safeStr(data.summary);

      var skillsRaw = safeArr(data.skillsRaw);
      var toolsRaw = data.toolsRaw ? safeArr(data.toolsRaw) : [];
      var skills = skillsRaw.concat(toolsRaw.filter(function(t) { return skillsRaw.indexOf(t) === -1; }));
      var experience = safeArr(data.experience);
      var education = safeArr(data.education);
      var projects = safeArr(data.projects);
      var certifications = safeArr(data.certifications);
      var languages = safeArr(data.languages);
      var achievements = safeArr(data.achievements);

      var contactParts = [];
      if (email) contactParts.push('<span class="cp"><span class="cp-icon">✉</span> ' + escapeHtml(email) + '</span>');
      if (phone) contactParts.push('<span class="cp"><span class="cp-icon">☎</span> ' + escapeHtml(phone) + '</span>');
      if (country) contactParts.push('<span class="cp"><span class="cp-icon">⚲</span> ' + escapeHtml(country) + '</span>');
      if (linkedin) contactParts.push('<span class="cp"><span class="cp-icon">🔗</span> ' + escapeHtml(linkedin) + '</span>');

      var styles = '\
<style>\
  :host {\
    display: block;\
    font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;\
    font-size: 12.5px;\
    line-height: 1.5;\
    color: ' + TEXT + ';\
    background: ' + BG + ';\
    -webkit-font-smoothing: antialiased;\
  }\
  * { margin: 0; padding: 0; box-sizing: border-box; }\
\
  .page {\
    width: 210mm;\
    min-height: 297mm;\
    margin: 0 auto;\
    padding: 36px 44px 40px;\
    background: ' + BG + ';\
  }\
\
  /* ── Header ── */\
  .header {\
    text-align: center;\
    padding-bottom: 18px;\
    border-bottom: 2px solid ' + GOLD + ';\
    margin-bottom: 20px;\
  }\
  .header-name {\
    font-size: 30px;\
    font-weight: 700;\
    color: ' + WHITE + ';\
    letter-spacing: 1px;\
    line-height: 1.2;\
    margin-bottom: 2px;\
  }\
  .header-name .last {\
    text-transform: uppercase;\
    font-weight: 800;\
  }\
  .header-profession {\
    font-size: 16px;\
    font-weight: 400;\
    color: ' + GOLD + ';\
    letter-spacing: 2px;\
    text-transform: uppercase;\
    margin-bottom: 12px;\
  }\
  .header-contact {\
    display: flex;\
    flex-wrap: wrap;\
    justify-content: center;\
    gap: 4px 0;\
    font-size: 11.5px;\
    color: ' + TEXT_DIM + ';\
  }\
  .cp {\
    white-space: nowrap;\
  }\
  .cp + .cp::before {\
    content: "|";\
    margin: 0 10px;\
    color: #555;\
  }\
  .cp-icon {\
    color: ' + GOLD + ';\
    margin-right: 2px;\
  }\
\
  /* ── Section heading ── */\
  .section {\
    margin-bottom: 16px;\
  }\
  .section-title {\
    display: flex;\
    align-items: center;\
    gap: 10px;\
    font-size: 13px;\
    font-weight: 700;\
    text-transform: uppercase;\
    letter-spacing: 2px;\
    color: ' + GOLD + ';\
    padding-bottom: 6px;\
    border-bottom: 1.5px solid ' + GOLD + ';\
    margin-bottom: 10px;\
  }\
  .section-title::before {\
    content: "";\
    display: inline-block;\
    width: 20px;\
    height: 20px;\
    border-radius: 50%;\
    background: ' + GOLD + ';\
    flex-shrink: 0;\
  }\
\
  /* ── Profile ── */\
  .profile-text {\
    font-size: 12.5px;\
    line-height: 1.65;\
    color: ' + TEXT + ';\
    text-align: justify;\
  }\
\
  /* ── Skills grid ── */\
  .skills-grid {\
    display: flex;\
    flex-wrap: wrap;\
    gap: 6px;\
  }\
  .skill-chip {\
    display: inline-block;\
    background: ' + BG_LIGHT + ';\
    border: 1px solid #555;\
    border-radius: 4px;\
    padding: 3px 10px;\
    font-size: 11.5px;\
    color: ' + TEXT + ';\
  }\
\
  /* ── Experience ── */\
  .exp-entry { margin-bottom: 14px; }\
  .exp-entry:last-child { margin-bottom: 0; }\
  .exp-header {\
    display: flex;\
    justify-content: space-between;\
    align-items: baseline;\
    flex-wrap: wrap;\
    margin-bottom: 1px;\
  }\
  .exp-title {\
    font-size: 13px;\
    font-weight: 700;\
    color: ' + WHITE + ';\
  }\
  .exp-date {\
    font-size: 11.5px;\
    color: ' + GOLD + ';\
    white-space: nowrap;\
    text-align: right;\
  }\
  .exp-company {\
    font-size: 12px;\
    font-weight: 600;\
    color: ' + TEXT_DIM + ';\
    font-style: italic;\
    margin-bottom: 3px;\
  }\
  .exp-location {\
    font-size: 11px;\
    color: ' + TEXT_DIM + ';\
    margin-bottom: 3px;\
  }\
  .exp-bullets {\
    list-style: none;\
    padding-left: 16px;\
    margin-top: 3px;\
  }\
  .exp-bullets li {\
    position: relative;\
    font-size: 12px;\
    line-height: 1.55;\
    color: ' + TEXT + ';\
    margin-bottom: 2px;\
    padding-left: 2px;\
  }\
  .exp-bullets li::before {\
    content: "•";\
    position: absolute;\
    left: -12px;\
    color: ' + GOLD + ';\
  }\
\
  /* ── Education ── */\
  .edu-entry { margin-bottom: 12px; }\
  .edu-entry:last-child { margin-bottom: 0; }\
  .edu-header {\
    display: flex;\
    justify-content: space-between;\
    align-items: baseline;\
    flex-wrap: wrap;\
  }\
  .edu-degree {\
    font-size: 13px;\
    font-weight: 700;\
    color: ' + WHITE + ';\
  }\
  .edu-date {\
    font-size: 11.5px;\
    color: ' + GOLD + ';\
    white-space: nowrap;\
    text-align: right;\
  }\
  .edu-institution {\
    font-size: 12px;\
    font-style: italic;\
    color: ' + TEXT_DIM + ';\
  }\
  .edu-gpa {\
    font-size: 11px;\
    color: ' + TEXT_DIM + ';\
    margin-top: 1px;\
  }\
\
  /* ── Projects ── */\
  .proj-entry { margin-bottom: 12px; }\
  .proj-entry:last-child { margin-bottom: 0; }\
  .proj-name {\
    font-size: 13px;\
    font-weight: 700;\
    color: ' + WHITE + ';\
    display: inline;\
  }\
  .proj-tech {\
    font-size: 11px;\
    color: ' + TEXT_DIM + ';\
    font-style: italic;\
  }\
  .proj-desc {\
    font-size: 12px;\
    color: ' + TEXT + ';\
    line-height: 1.55;\
    margin-top: 2px;\
  }\
  .proj-link {\
    font-size: 11px;\
    color: ' + GOLD + ';\
    text-decoration: none;\
  }\
  .proj-link:hover { text-decoration: underline; }\
  .proj-date {\
    font-size: 11.5px;\
    color: ' + GOLD + ';\
    white-space: nowrap;\
  }\
\
  /* ── Certifications ── */\
  .cert-entry { margin-bottom: 8px; }\
  .cert-entry:last-child { margin-bottom: 0; }\
  .cert-name {\
    font-size: 12.5px;\
    font-weight: 700;\
    color: ' + WHITE + ';\
  }\
  .cert-issuer {\
    font-size: 12px;\
    color: ' + TEXT_DIM + ';\
  }\
  .cert-date {\
    font-size: 11px;\
    color: ' + TEXT_DIM + ';\
  }\
\
  /* ── Languages ── */\
  .lang-entry {\
    display: flex;\
    align-items: center;\
    margin-bottom: 6px;\
    font-size: 12.5px;\
  }\
  .lang-entry:last-child { margin-bottom: 0; }\
  .lang-name {\
    min-width: 110px;\
    font-weight: 600;\
    color: ' + WHITE + ';\
  }\
  .lang-bars {\
    display: flex;\
    gap: 3px;\
    margin-right: 8px;\
  }\
  .bar-seg {\
    width: 18px;\
    height: 6px;\
    border-radius: 2px;\
    background: #555;\
  }\
  .bar-filled {\
    background: ' + GOLD + ';\
  }\
  .lang-label {\
    font-size: 11px;\
    color: ' + TEXT_DIM + ';\
    font-style: italic;\
  }\
\
  /* ── Achievements ── */\
  .ach-entry { margin-bottom: 10px; }\
  .ach-entry:last-child { margin-bottom: 0; }\
  .ach-title {\
    font-size: 12.5px;\
    font-weight: 700;\
    color: ' + WHITE + ';\
    display: inline;\
  }\
  .ach-year {\
    font-size: 11px;\
    color: ' + GOLD + ';\
    margin-left: 6px;\
  }\
  .ach-desc {\
    font-size: 12px;\
    color: ' + TEXT + ';\
    line-height: 1.55;\
    margin-top: 1px;\
  }\
</style>';

      var html = styles + '<div class="page">';

      // ── 1. Header ──
      if (firstName || lastName || profession || contactParts.length) {
        html += '<div class="header" data-section="header">';
        if (firstName || lastName) {
          html += '<div class="header-name">';
          if (firstName) html += escapeHtml(firstName) + ' ';
          if (lastName) html += '<span class="last">' + escapeHtml(lastName) + '</span>';
          html += '</div>';
        }
        if (profession) html += '<div class="header-profession">' + escapeHtml(profession) + '</div>';
        if (contactParts.length) {
          html += '<div class="header-contact">' + contactParts.join('') + '</div>';
        }
        html += '</div>';
      }

      // ── 2. Profile ──
      if (summary) {
        html += '<div class="section" data-section="profile">' +
          '<div class="section-title">' + escapeHtml(t.profile) + '</div>' +
          '<div class="profile-text">' + escapeHtml(summary) + '</div>' +
          '</div>';
      }

      // ── 3. Skills ──
      if (skills.length > 0) {
        html += '<div class="section" data-section="skills">' +
          '<div class="section-title">' + escapeHtml(t.skills) + '</div>' +
          '<div class="skills-grid">';
        skills.forEach(function(s) {
          html += '<span class="skill-chip">' + escapeHtml(safeStr(s)) + '</span>';
        });
        html += '</div></div>';
      }

      // ── 4. Professional Experience ──
      if (experience.length > 0) {
        html += '<div class="section" data-section="experience">' +
          '<div class="section-title">' + escapeHtml(t.experience) + '</div>';

        experience.forEach(function(exp) {
          var position = safeStr(exp.title);
          var company = safeStr(exp.company);
          var startDate = safeStr(exp.startDate);
          var endDate = safeStr(exp.endDate);
          var isCurrent = !!exp.isCurrent;
          var dateRange = formatDateRange(startDate, endDate, isCurrent, lang);
          var achiev = safeArr(exp.achievements);
          var resp = safeArr(exp.responsibilities);
          var allBullets = achiev.concat(resp);

          html += '<div class="exp-entry" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          html += '<div class="exp-header">' +
            '<span class="exp-title">' + escapeHtml(position) + '</span>' +
            (dateRange ? '<span class="exp-date">' + escapeHtml(dateRange) + '</span>' : '') +
            '</div>';
          if (company) html += '<div class="exp-company">' + escapeHtml(company) + '</div>';

          if (allBullets.length > 0) {
            html += '<ul class="exp-bullets">';
            allBullets.forEach(function(item) {
              var txt = safeStr(item);
              if (txt) html += '<li>' + escapeHtml(txt) + '</li>';
            });
            html += '</ul>';
          }
          html += '</div>';
        });
        html += '</div>';
      }

      // ── 5. Projects ──
      if (projects.length > 0) {
        html += '<div class="section" data-section="projects">' +
          '<div class="section-title">' + escapeHtml(t.projects) + '</div>';

        projects.forEach(function(proj) {
          var name = safeStr(proj.name);
          var description = safeStr(proj.description);
          var technologies = safeArr(proj.technologies);
          var url = safeStr(proj.url);

          html += '<div class="proj-entry" data-entry-id="' + escapeHtml(safeStr(proj.id)) + '">';
          html += '<span class="proj-name">' + escapeHtml(name) + '</span>';
          if (technologies.length > 0) {
            html += ' <span class="proj-tech">(' + technologies.map(function(t) { return escapeHtml(safeStr(t)); }).join(', ') + ')</span>';
          }
          if (url) {
            html += ' <a class="proj-link" href="' + escapeHtml(url) + '" target="_blank" rel="noopener">🔗</a>';
          }
          if (description) html += '<div class="proj-desc">' + escapeHtml(description) + '</div>';
          html += '</div>';
        });
        html += '</div>';
      }

      // ── 6. Achievements ──
      if (achievements.length > 0) {
        html += '<div class="section" data-section="achievements">' +
          '<div class="section-title">' + escapeHtml(t.achievements) + '</div>';

        achievements.forEach(function(ach) {
          var title = safeStr(ach.title);
          var description = safeStr(ach.description);
          var year = ach.year;

          html += '<div class="ach-entry" data-entry-id="' + escapeHtml(safeStr(ach.id)) + '">';
          html += '<span class="ach-title">' + escapeHtml(title) + '</span>';
          if (year) html += '<span class="ach-year">(' + escapeHtml(String(year)) + ')</span>';
          if (description) html += '<div class="ach-desc">' + escapeHtml(description) + '</div>';
          html += '</div>';
        });
        html += '</div>';
      }

      // ── 7. Education ──
      if (education.length > 0) {
        html += '<div class="section" data-section="education">' +
          '<div class="section-title">' + escapeHtml(t.education) + '</div>';

        education.forEach(function(edu) {
          var degree = safeStr(edu.degree);
          var field = safeStr(edu.field);
          var institution = safeStr(edu.institution);
          var startDate = safeStr(edu.startDate);
          var endDate = safeStr(edu.endDate);
          var isCurrent = edu.isCompleted === false;
          var dateRange = formatDateRange(startDate, endDate, isCurrent, lang);
          var gpa = edu.gpa;
          var degreeField = degree + (field ? ' — ' + field : '');

          html += '<div class="edu-entry" data-entry-id="' + escapeHtml(safeStr(edu.id)) + '">';
          html += '<div class="edu-header">' +
            '<span class="edu-degree">' + escapeHtml(degreeField) + '</span>' +
            (dateRange ? '<span class="edu-date">' + escapeHtml(dateRange) + '</span>' : '') +
            '</div>';
          if (institution) html += '<div class="edu-institution">' + escapeHtml(institution) + '</div>';
          if (gpa) html += '<div class="edu-gpa">GPA: ' + escapeHtml(String(gpa)) + '</div>';
          html += '</div>';
        });
        html += '</div>';
      }

      // ── 8. Certifications ──
      if (certifications.length > 0) {
        html += '<div class="section" data-section="certifications">' +
          '<div class="section-title">' + escapeHtml(t.certifications) + '</div>';

        certifications.forEach(function(cert) {
          var name = safeStr(cert.name);
          var issuer = safeStr(cert.issuer);
          var date = safeStr(cert.date);

          html += '<div class="cert-entry" data-entry-id="' + escapeHtml(safeStr(cert.id)) + '">';
          html += '<span class="cert-name">' + escapeHtml(name) + '</span>';
          if (issuer) html += ' <span class="cert-issuer">— ' + escapeHtml(issuer) + '</span>';
          if (date) html += ' <span class="cert-date">(' + escapeHtml(formatDate(date, lang)) + ')</span>';
          html += '</div>';
        });
        html += '</div>';
      }

      // ── 9. Languages ──
      if (languages.length > 0) {
        html += '<div class="section" data-section="languages">' +
          '<div class="section-title">' + escapeHtml(t.languages) + '</div>';

        var lMap = levelMap[lang] || levelMap.en;

        languages.forEach(function(item) {
          var name = safeStr(item.name);
          var level = safeStr(item.level || 'basic');
          var label = lMap[level] || level;

          html += '<div class="lang-entry" data-entry-id="' + escapeHtml(safeStr(item.id)) + '">' +
            '<span class="lang-name">' + escapeHtml(name) + '</span>' +
            '<span class="lang-bars">' + levelBar(level) + '</span>' +
            '<span class="lang-label">' + escapeHtml(label) + '</span>' +
            '</div>';
        });
        html += '</div>';
      }

      html += '</div>';

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = html;
      }
    }
  }

  if (!customElements.get('gqr-resume-charcoal')) {
    customElements.define('gqr-resume-charcoal', GQRResumeCharcoal);
  }
})();
