/**
 * name: gqr-resume-monochrome
 * description: "Single-column minimal monochrome resume with date-left timeline layout for experience/education, two-column skills grid with descriptions, thin section dividers, and clean sans-serif typography."
 */

(function() {
  'use strict';

  var darkText = '#1a1a1a';
  var bodyText = '#333';
  var mutedText = '#666';
  var lightText = '#999';
  var ruleColor = '#d0d0d0';

  var i18n = {
    es: {
      profile: 'Perfil', experience: 'Experiencia Laboral',
      education: 'Educación', projects: 'Proyectos', certifications: 'Certificados',
      languages: 'Idiomas', achievements: 'Logros', skills: 'Habilidades',
      present: 'Presente'
    },
    en: {
      profile: 'Profile', experience: 'Work Experience',
      education: 'Education', projects: 'Projects', certifications: 'Certificates',
      languages: 'Languages', achievements: 'Achievements', skills: 'Skills',
      present: 'Present'
    }
  };

  var levelMap = {
    es: { basic: 'Básico', intermediate: 'Intermedio', advanced: 'Avanzado', native: 'Nativo' },
    en: { basic: 'Basic', intermediate: 'Intermediate', advanced: 'Advanced', native: 'Native' }
  };

  function safeStr(v) { return (v != null && typeof v === 'string') ? v : ''; }
  function safeArr(v) { return Array.isArray(v) ? v : []; }

  function fmtDateShort(d) {
    if (!d) return '';
    try {
      var dt = new Date(d);
      if (isNaN(dt.getTime())) return d;
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return dt.getFullYear() + ' ' + months[dt.getMonth()];
    } catch(e) { return d; }
  }

  function fmtRange(s, e, isCur, lang) {
    var start = fmtDateShort(s);
    if (!e && !isCur) return start;
    var end = isCur ? (i18n[lang]?.present || 'Present') : fmtDateShort(e);
    return start + ' – ' + end;
  }

  function escapeHtml(t) {
    var d = document.createElement('div');
    d.textContent = t;
    return d.innerHTML;
  }

  class GQRResumeMonochrome extends HTMLElement {
    constructor() { super(); this._data = null; }
    static get observedAttributes() { return ['language']; }
    connectedCallback() {
      if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
      this.render();
    }
    attributeChangedCallback() { if (this.shadowRoot) this.render(); }
    get data() { return this._data || {}; }
    set data(v) {
      if (v && typeof v === 'object') { this._data = v; if (this.shadowRoot) this.render(); }
    }
    getLanguage() {
      return this.getAttribute('language') || (this.data && this.data.language) || 'en';
    }

    render() {
      var lang = this.getLanguage();
      var t = i18n[lang] || i18n.en;
      var lMap = levelMap[lang] || levelMap.en;
      var data = this.data || {};

      var firstName = safeStr(data.firstName);
      var lastName = safeStr(data.lastName);
      var fullName = (firstName + ' ' + lastName).trim();
      var summary = safeStr(data.summary);
      var email = safeStr(data.email);
      var phone = safeStr(data.phone);
      var country = safeStr(data.country);
      var linkedin = safeStr(data.linkedin);

      var skillsRaw = safeArr(data.skillsRaw);
      var toolsRaw = data.toolsRaw ? safeArr(data.toolsRaw) : [];
      var skills = skillsRaw.concat(toolsRaw.filter(function(x) { return skillsRaw.indexOf(x) === -1; }));
      var experience = safeArr(data.experience);
      var education = safeArr(data.education);
      var projects = safeArr(data.projects);
      var certifications = safeArr(data.certifications);
      var languages = safeArr(data.languages);
      var achievements = safeArr(data.achievements);

      var contactParts = [];
      if (country) contactParts.push('<span class="ct-item">⚲ ' + escapeHtml(country) + '</span>');
      if (phone) contactParts.push('<span class="ct-item">☎ ' + escapeHtml(phone) + '</span>');
      if (email) contactParts.push('<span class="ct-item">✉ ' + escapeHtml(email) + '</span>');
      if (linkedin) contactParts.push('<span class="ct-item">🔗 ' + escapeHtml(linkedin) + '</span>');

      var css = '<style>' +
        ':host {' +
        '  display: block;' +
        '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;' +
        '  line-height: 1.5;' +
        '  color: ' + bodyText + ';' +
        '  -webkit-print-color-adjust: exact;' +
        '  print-color-adjust: exact;' +
        '}' +
        '* { margin: 0; padding: 0; box-sizing: border-box; }' +

        '.page {' +
        '  width: 210mm;' +
        '  min-height: 297mm;' +
        '  height: auto;' +
        '  overflow: visible;' +
        '  background: #fff;' +
        '  padding: 32px 36px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 14px;' +
        '}' +

        /* Header */
        '.header-name {' +
        '  font-size: 26px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '  letter-spacing: 0.3px;' +
        '}' +
        '.contact-row {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 16px;' +
        '  margin-top: 4px;' +
        '}' +
        '.ct-item {' +
        '  font-size: 10.5px;' +
        '  color: ' + mutedText + ';' +
        '  white-space: nowrap;' +
        '}' +

        /* Divider */
        '.divider {' +
        '  width: 100%;' +
        '  height: 1px;' +
        '  background: ' + ruleColor + ';' +
        '}' +

        /* Section title */
        '.sec-title {' +
        '  font-size: 13px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '  margin-bottom: 10px;' +
        '  padding-bottom: 3px;' +
        '  border-bottom: 1px solid ' + ruleColor + ';' +
        '}' +

        /* Profile */
        '.profile-text {' +
        '  font-size: 11px;' +
        '  line-height: 1.65;' +
        '  color: ' + bodyText + ';' +
        '}' +

        /* Timeline row (experience, education) */
        '.tl-entry {' +
        '  display: flex;' +
        '  gap: 20px;' +
        '  margin-bottom: 14px;' +
        '  text-align: left;' +
        '}' +
        '.tl-entry:last-child { margin-bottom: 0; }' +
        '.tl-left {' +
        '  width: 120px;' +
        '  flex-shrink: 0;' +
        '}' +
        '.tl-date {' +
        '  font-size: 10.5px;' +
        '  font-weight: 600;' +
        '  color: ' + darkText + ';' +
        '  line-height: 1.4;' +
        '}' +
        '.tl-location {' +
        '  font-size: 10px;' +
        '  color: ' + lightText + ';' +
        '  line-height: 1.4;' +
        '}' +
        '.tl-right { flex: 1; min-width: 0; }' +
        '.tl-title {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.tl-subtitle {' +
        '  font-size: 11px;' +
        '  font-style: italic;' +
        '  color: ' + mutedText + ';' +
        '}' +
        '.tl-bullets { list-style: none; margin-top: 4px; }' +
        '.tl-bullet {' +
        '  font-size: 10.5px;' +
        '  line-height: 1.55;' +
        '  color: ' + bodyText + ';' +
        '  padding-left: 13px;' +
        '  position: relative;' +
        '  margin-bottom: 2px;' +
        '}' +
        '.tl-bullet::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: ' + lightText + ';' +
        '}' +

        /* Skills grid - 2 columns with name + description */
        '.skills-grid {' +
        '  display: grid;' +
        '  grid-template-columns: 1fr 1fr;' +
        '  gap: 12px 28px;' +
        '}' +
        '.skill-cell { text-align: left; }' +
        '.skill-name {' +
        '  font-size: 11px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.skill-desc {' +
        '  font-size: 10px;' +
        '  font-style: italic;' +
        '  color: ' + mutedText + ';' +
        '  line-height: 1.45;' +
        '}' +

        /* Certifications grid */
        '.cert-grid {' +
        '  display: grid;' +
        '  grid-template-columns: 1fr 1fr;' +
        '  gap: 10px 28px;' +
        '}' +
        '.cert-cell { text-align: left; }' +
        '.cert-name {' +
        '  font-size: 11px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.cert-detail {' +
        '  font-size: 10px;' +
        '  color: ' + mutedText + ';' +
        '}' +

        /* Languages */
        '.lang-grid {' +
        '  display: grid;' +
        '  grid-template-columns: 1fr 1fr;' +
        '  gap: 8px 28px;' +
        '}' +
        '.lang-cell { text-align: left; }' +
        '.lang-name {' +
        '  font-size: 11px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.lang-level {' +
        '  font-size: 10px;' +
        '  color: ' + mutedText + ';' +
        '}' +

        /* Projects */
        '.proj-entry { margin-bottom: 10px; text-align: left; }' +
        '.proj-entry:last-child { margin-bottom: 0; }' +
        '.proj-name {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.proj-desc {' +
        '  font-size: 10.5px;' +
        '  color: ' + bodyText + ';' +
        '  line-height: 1.55;' +
        '  margin-top: 2px;' +
        '}' +
        '.proj-tech {' +
        '  font-size: 10px;' +
        '  color: ' + lightText + ';' +
        '  margin-top: 2px;' +
        '}' +

        /* Achievements */
        '.ach-entry { margin-bottom: 6px; text-align: left; }' +
        '.ach-entry:last-child { margin-bottom: 0; }' +
        '.ach-title {' +
        '  font-size: 11px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.ach-desc {' +
        '  font-size: 10.5px;' +
        '  color: ' + bodyText + ';' +
        '  line-height: 1.55;' +
        '}' +

        '@media print {' +
        '  .page { width: 210mm; min-height: 297mm; }' +
        '}' +
      '</style>';

      var html = css + '<div class="page">';

      /* Header */
      html += '<div data-section="header">';
      if (fullName) html += '<div class="header-name">' + escapeHtml(fullName) + '</div>';
      html += '</div>';

      /* Contact */
      if (contactParts.length > 0) {
        html += '<div data-section="contact">';
        html += '<div class="contact-row">' + contactParts.join('') + '</div>';
        html += '</div>';
      }

      html += '<div class="divider"></div>';

      /* Profile */
      if (summary) {
        html += '<div data-section="profile">';
        html += '<div class="sec-title">' + escapeHtml(t.profile) + '</div>';
        html += '<div class="profile-text">' + escapeHtml(summary) + '</div>';
        html += '</div>';
      }

      /* Skills */
      if (skills.length > 0) {
        html += '<div data-section="skills">';
        html += '<div class="sec-title">' + escapeHtml(t.skills) + '</div>';
        html += '<div class="skills-grid">';
        for (var si = 0; si < skills.length; si++) {
          html += '<div class="skill-cell" data-entry-id="skill-' + si + '">' +
            '<div class="skill-name">' + escapeHtml(safeStr(skills[si])) + '</div>' +
            '</div>';
        }
        html += '</div>';
        html += '</div>';
      }

      /* Experience */
      if (experience.length > 0) {
        html += '<div data-section="experience">';
        html += '<div class="sec-title">' + escapeHtml(t.experience) + '</div>';
        for (var ei = 0; ei < experience.length; ei++) {
          var exp = experience[ei];
          var position = safeStr(exp.title);
          var company = safeStr(exp.company);
          var location = safeStr(exp.location);
          var expBullets = safeArr(exp.achievements).concat(safeArr(exp.responsibilities));
          var expRange = fmtRange(safeStr(exp.startDate), safeStr(exp.endDate), exp.isCurrent || false, lang);

          html += '<div class="tl-entry" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          html += '<div class="tl-left">';
          if (expRange) html += '<div class="tl-date">' + escapeHtml(expRange) + '</div>';
          if (location) html += '<div class="tl-location">' + escapeHtml(location) + '</div>';
          html += '</div>';
          html += '<div class="tl-right">';
          if (position) html += '<div class="tl-title">' + escapeHtml(position) + '</div>';
          if (company) html += '<div class="tl-subtitle">' + escapeHtml(company) + '</div>';
          if (expBullets.length > 0) {
            html += '<ul class="tl-bullets">';
            for (var bi = 0; bi < expBullets.length; bi++) {
              var txt = safeStr(expBullets[bi]);
              if (txt) html += '<li class="tl-bullet">' + escapeHtml(txt) + '</li>';
            }
            html += '</ul>';
          }
          html += '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      /* Projects */
      if (projects.length > 0) {
        html += '<div data-section="projects">';
        html += '<div class="sec-title">' + escapeHtml(t.projects) + '</div>';
        for (var pi = 0; pi < projects.length; pi++) {
          var proj = projects[pi];
          html += '<div class="proj-entry" data-entry-id="' + escapeHtml(safeStr(proj.id)) + '">';
          html += '<div class="proj-name">' + escapeHtml(safeStr(proj.name)) + '</div>';
          if (proj.description) html += '<div class="proj-desc">' + escapeHtml(safeStr(proj.description)) + '</div>';
          if (safeArr(proj.technologies).length > 0) {
            html += '<div class="proj-tech">' + safeArr(proj.technologies).map(function(x) { return escapeHtml(safeStr(x)); }).join(', ') + '</div>';
          }
          html += '</div>';
        }
        html += '</div>';
      }

      /* Achievements */
      if (achievements.length > 0) {
        html += '<div data-section="achievements">';
        html += '<div class="sec-title">' + escapeHtml(t.achievements) + '</div>';
        for (var ai = 0; ai < achievements.length; ai++) {
          var ach = achievements[ai];
          html += '<div class="ach-entry" data-entry-id="' + escapeHtml(safeStr(ach.id)) + '">';
          if (ach.title) html += '<div class="ach-title">' + escapeHtml(safeStr(ach.title)) + '</div>';
          if (ach.description) html += '<div class="ach-desc">' + escapeHtml(safeStr(ach.description)) + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      /* Education */
      if (education.length > 0) {
        html += '<div data-section="education">';
        html += '<div class="sec-title">' + escapeHtml(t.education) + '</div>';
        for (var edi = 0; edi < education.length; edi++) {
          var edu = education[edi];
          var degree = safeStr(edu.degree);
          var field = safeStr(edu.field);
          var institution = safeStr(edu.institution);
          var gpa = edu.gpa;
          var eduRange = fmtRange(safeStr(edu.startDate), safeStr(edu.endDate), edu.isCompleted === false, lang);
          var degreeLine = degree + (field ? ' ' + field : '');

          html += '<div class="tl-entry" data-entry-id="' + escapeHtml(safeStr(edu.id)) + '">';
          html += '<div class="tl-left">';
          if (eduRange) html += '<div class="tl-date">' + escapeHtml(eduRange) + '</div>';
          html += '</div>';
          html += '<div class="tl-right">';
          if (degreeLine) html += '<div class="tl-title">' + escapeHtml(degreeLine) + '</div>';
          if (institution) html += '<div class="tl-subtitle">' + escapeHtml(institution) + '</div>';
          if (gpa) {
            html += '<ul class="tl-bullets"><li class="tl-bullet">GPA: ' + escapeHtml(String(gpa)) + '</li></ul>';
          }
          html += '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      /* Certifications */
      if (certifications.length > 0) {
        html += '<div data-section="certifications">';
        html += '<div class="sec-title">' + escapeHtml(t.certifications) + '</div>';
        html += '<div class="cert-grid">';
        for (var ci = 0; ci < certifications.length; ci++) {
          var cert = certifications[ci];
          html += '<div class="cert-cell" data-entry-id="' + escapeHtml(safeStr(cert.id)) + '">';
          if (cert.name) html += '<div class="cert-name">' + escapeHtml(safeStr(cert.name)) + '</div>';
          if (cert.issuer) html += '<div class="cert-detail">' + escapeHtml(safeStr(cert.issuer)) + '</div>';
          html += '</div>';
        }
        html += '</div>';
        html += '</div>';
      }

      /* Languages */
      if (languages.length > 0) {
        html += '<div data-section="languages">';
        html += '<div class="sec-title">' + escapeHtml(t.languages) + '</div>';
        html += '<div class="lang-grid">';
        for (var li = 0; li < languages.length; li++) {
          var langItem = languages[li];
          var langLevel = safeStr(langItem.level || 'basic');
          var langLabel = lMap[langLevel] || langLevel;
          html += '<div class="lang-cell" data-entry-id="' + escapeHtml(safeStr(langItem.id)) + '">' +
            '<div class="lang-name">' + escapeHtml(safeStr(langItem.name)) + '</div>' +
            '<div class="lang-level">' + escapeHtml(langLabel) + '</div>' +
            '</div>';
        }
        html += '</div>';
        html += '</div>';
      }

      html += '</div>'; // page

      if (this.shadowRoot) { this.shadowRoot.innerHTML = html; }
    }
  }

  if (!customElements.get('gqr-resume-monochrome')) {
    customElements.define('gqr-resume-monochrome', GQRResumeMonochrome);
  }
})();
