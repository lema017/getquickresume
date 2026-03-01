/**
 * name: gqr-resume-fineline
 * description: "Dense single-column resume with bold inline name+profession header, thin divider lines, left-aligned dates with right-aligned company/title, and maximum content density."
 */

(function() {
  'use strict';

  const i18n = {
    es: {
      profile: "RESUMEN", experience: "EXPERIENCIA PROFESIONAL",
      education: "EDUCACIÓN", projects: "PROYECTOS", certifications: "CERTIFICACIONES",
      languages: "IDIOMAS", achievements: "LOGROS", skills: "HABILIDADES",
      present: "Presente",
      basic: "Básico", intermediate: "Intermedio", advanced: "Avanzado", native: "Nativo"
    },
    en: {
      profile: "SUMMARY", experience: "PROFESSIONAL EXPERIENCE",
      education: "EDUCATION", projects: "PROJECTS", certifications: "CERTIFICATIONS",
      languages: "LANGUAGES", achievements: "ACHIEVEMENTS", skills: "SKILLS",
      present: "Present",
      basic: "Basic", intermediate: "Intermediate", advanced: "Advanced", native: "Native"
    }
  };

  const levelMap = {
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
      return (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1) + '/' + date.getFullYear();
    } catch(e) { return dateStr; }
  }

  function formatDateRange(startDate, endDate, isCurrent, lang) {
    var start = formatDate(startDate, lang);
    if (!endDate && !isCurrent) return start;
    var end = isCurrent ? (i18n[lang]?.present || 'Present') : formatDate(endDate, lang);
    return start + ' – ' + end;
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  class GQRResumeFineline extends HTMLElement {
    constructor() {
      super();
      this._data = null;
    }

    static get observedAttributes() { return ['language']; }

    connectedCallback() {
      if (!this.shadowRoot) { this.attachShadow({ mode: 'open' }); }
      this.render();
    }

    attributeChangedCallback() { if (this.shadowRoot) { this.render(); } }

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
      var fullName = (firstName + ' ' + lastName).trim();
      var profession = safeStr(data.profession);
      var country = safeStr(data.country);
      var summary = safeStr(data.summary);
      var email = safeStr(data.email);
      var phone = safeStr(data.phone);
      var linkedin = safeStr(data.linkedin);

      var skillsRaw = safeArr(data.skillsRaw);
      var toolsRaw = data.toolsRaw ? safeArr(data.toolsRaw) : [];
      var skills = skillsRaw.concat(toolsRaw.filter(function(t) { return skillsRaw.indexOf(t) === -1; }));
      var experience = safeArr(data.experience);
      var education = safeArr(data.education);
      var projects = safeArr(data.projects);
      var certifications = safeArr(data.certifications);
      var languages = safeArr(data.languages);
      var achievements = safeArr(data.achievements);

      var styles = '<style>' +
        ':host {' +
        '  display: block;' +
        '  font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;' +
        '  line-height: 1.42;' +
        '  color: #1a1a1a;' +
        '  -webkit-print-color-adjust: exact;' +
        '  print-color-adjust: exact;' +
        '}' +
        '* { margin: 0; padding: 0; box-sizing: border-box; }' +

        '.page {' +
        '  width: 210mm;' +
        '  min-height: 297mm;' +
        '  height: auto;' +
        '  overflow: visible;' +
        '  margin: 0 auto;' +
        '  background: #fff;' +
        '  padding: 30px 34px 34px;' +
        '}' +

        /* ── Header ── */
        '.header { margin-bottom: 4px; }' +
        '.header-name-line {' +
        '  display: flex;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '  gap: 10px;' +
        '}' +
        '.h-name {' +
        '  font-size: 24px;' +
        '  font-weight: 800;' +
        '  color: #111;' +
        '  line-height: 1.15;' +
        '}' +
        '.h-profession {' +
        '  font-size: 15px;' +
        '  font-weight: 700;' +
        '  color: #111;' +
        '}' +
        '.header-contact {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 4px 12px;' +
        '  margin-top: 5px;' +
        '  font-size: 10.5px;' +
        '  color: #444;' +
        '}' +
        '.hc-item { white-space: nowrap; }' +
        '.hc-icon { font-size: 9px; color: #888; margin-right: 3px; }' +

        /* ── Summary ── */
        '.summary-text {' +
        '  font-size: 11px;' +
        '  line-height: 1.55;' +
        '  color: #333;' +
        '  margin-bottom: 2px;' +
        '}' +

        /* ── Divider ── */
        '.divider {' +
        '  border: none;' +
        '  border-top: 1.5px solid #111;' +
        '  margin: 10px 0 2px;' +
        '}' +
        '.divider-thin {' +
        '  border: none;' +
        '  border-top: 0.5px solid #ccc;' +
        '  margin: 6px 0 4px;' +
        '}' +

        /* ── Section title ── */
        '.sec-title {' +
        '  font-size: 10.5px;' +
        '  font-weight: 800;' +
        '  font-style: italic;' +
        '  letter-spacing: 0.8px;' +
        '  color: #111;' +
        '  margin-bottom: 8px;' +
        '}' +

        /* ── Sections container ── */
        '.sections {' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  text-align: left;' +
        '}' +

        /* Experience */
        '.exp-entry { margin-bottom: 10px; text-align: left; }' +
        '.exp-entry:last-child { margin-bottom: 0; }' +
        '.exp-row {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '  gap: 4px 12px;' +
        '}' +
        '.exp-left {' +
        '  flex-shrink: 0;' +
        '}' +
        '.exp-date {' +
        '  font-size: 10.5px;' +
        '  color: #555;' +
        '  white-space: nowrap;' +
        '}' +
        '.exp-location {' +
        '  font-size: 10px;' +
        '  color: #888;' +
        '}' +
        '.exp-right { text-align: right; }' +
        '.exp-company {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: #111;' +
        '}' +
        '.exp-title {' +
        '  font-size: 11px;' +
        '  font-style: italic;' +
        '  color: #444;' +
        '}' +
        '.exp-bullets { list-style: none; margin-top: 3px; }' +
        '.exp-bullet {' +
        '  font-size: 10.5px;' +
        '  line-height: 1.5;' +
        '  color: #333;' +
        '  padding-left: 12px;' +
        '  position: relative;' +
        '  margin-bottom: 1px;' +
        '}' +
        '.exp-bullet::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: #555;' +
        '}' +

        /* Skills */
        '.skills-text {' +
        '  font-size: 10.5px;' +
        '  line-height: 1.55;' +
        '  color: #333;' +
        '}' +

        /* Projects */
        '.proj-entry { margin-bottom: 8px; text-align: left; }' +
        '.proj-entry:last-child { margin-bottom: 0; }' +
        '.proj-name {' +
        '  font-size: 11px;' +
        '  font-weight: 700;' +
        '  color: #111;' +
        '}' +
        '.proj-desc {' +
        '  font-size: 10.5px;' +
        '  color: #333;' +
        '  line-height: 1.5;' +
        '  margin-top: 1px;' +
        '}' +
        '.proj-tech {' +
        '  font-size: 10px;' +
        '  color: #777;' +
        '  margin-top: 2px;' +
        '}' +

        /* Achievements */
        '.ach-entry { margin-bottom: 6px; text-align: left; }' +
        '.ach-entry:last-child { margin-bottom: 0; }' +
        '.ach-line {' +
        '  font-size: 10.5px;' +
        '  line-height: 1.5;' +
        '  color: #333;' +
        '  padding-left: 12px;' +
        '  position: relative;' +
        '}' +
        '.ach-line::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: #555;' +
        '}' +
        '.ach-bold { font-weight: 700; }' +

        /* Education */
        '.edu-entry { margin-bottom: 8px; text-align: left; }' +
        '.edu-entry:last-child { margin-bottom: 0; }' +
        '.edu-row {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '  gap: 4px 12px;' +
        '}' +
        '.edu-degree {' +
        '  font-size: 11px;' +
        '  font-weight: 700;' +
        '  color: #111;' +
        '}' +
        '.edu-date {' +
        '  font-size: 10.5px;' +
        '  color: #555;' +
        '  white-space: nowrap;' +
        '}' +
        '.edu-institution {' +
        '  font-size: 10.5px;' +
        '  color: #444;' +
        '  font-style: italic;' +
        '}' +
        '.edu-gpa {' +
        '  font-size: 10px;' +
        '  color: #777;' +
        '}' +

        /* Certifications */
        '.cert-entry { margin-bottom: 4px; text-align: left; }' +
        '.cert-entry:last-child { margin-bottom: 0; }' +
        '.cert-name {' +
        '  font-size: 10.5px;' +
        '  font-weight: 700;' +
        '  color: #111;' +
        '}' +
        '.cert-detail {' +
        '  font-size: 10px;' +
        '  color: #555;' +
        '}' +

        /* Languages */
        '.lang-list {' +
        '  font-size: 10.5px;' +
        '  color: #333;' +
        '  line-height: 1.55;' +
        '}' +

        '@media print {' +
        '  .page { width: 210mm; min-height: 297mm; }' +
        '}' +
      '</style>';

      var html = styles + '<div class="page">';

      // ── Header ──
      html += '<div class="header" data-section="header">';
      html += '<div class="header-name-line">';
      if (fullName) html += '<span class="h-name">' + escapeHtml(fullName) + '</span>';
      if (profession) html += '<span class="h-profession">' + escapeHtml(profession) + '</span>';
      html += '</div>';
      var cItems = [];
      if (email) cItems.push('<span class="hc-item"><span class="hc-icon">✉</span>' + escapeHtml(email) + '</span>');
      if (phone) cItems.push('<span class="hc-item"><span class="hc-icon">☎</span>' + escapeHtml(phone) + '</span>');
      if (country) cItems.push('<span class="hc-item"><span class="hc-icon">⚲</span>' + escapeHtml(country) + '</span>');
      if (linkedin) cItems.push('<span class="hc-item"><span class="hc-icon">🔗</span>' + escapeHtml(linkedin) + '</span>');
      if (cItems.length > 0) {
        html += '<div class="header-contact">' + cItems.join('') + '</div>';
      }
      html += '</div>';

      // Summary (below header, above first divider)
      if (summary) {
        html += '<div data-section="profile">';
        html += '<div class="summary-text">' + escapeHtml(summary) + '</div>';
        html += '</div>';
      }

      html += '<div class="sections">';

      // ── Skills ──
      if (skills.length > 0) {
        html += '<hr class="divider">';
        html += '<div data-section="skills">';
        html += '<div class="sec-title">' + escapeHtml(t.skills) + '</div>';
        html += '<div class="skills-text">' + skills.map(function(s) { return escapeHtml(safeStr(s)); }).join(', ') + '</div>';
        html += '</div>';
      }

      // ── Experience ──
      if (experience.length > 0) {
        html += '<hr class="divider">';
        html += '<div data-section="experience">';
        html += '<div class="sec-title">' + escapeHtml(t.experience) + '</div>';
        for (var ei = 0; ei < experience.length; ei++) {
          var exp = experience[ei];
          var position = safeStr(exp.title);
          var company = safeStr(exp.company);
          var expBullets = safeArr(exp.achievements).concat(safeArr(exp.responsibilities));
          var expRange = formatDateRange(safeStr(exp.startDate), safeStr(exp.endDate), exp.isCurrent || false, lang);

          if (ei > 0) html += '<hr class="divider-thin">';

          html += '<div class="exp-entry" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          html += '<div class="exp-row">';
          html += '<div class="exp-left">';
          if (expRange) html += '<div class="exp-date">' + escapeHtml(expRange) + '</div>';
          html += '</div>';
          html += '<div class="exp-right">';
          if (company) html += '<div class="exp-company">' + escapeHtml(company) + '</div>';
          if (position) html += '<div class="exp-title">' + escapeHtml(position) + '</div>';
          html += '</div>';
          html += '</div>';

          if (expBullets.length > 0) {
            html += '<ul class="exp-bullets">';
            for (var bi = 0; bi < expBullets.length; bi++) {
              var txt = safeStr(expBullets[bi]);
              if (txt) html += '<li class="exp-bullet">' + escapeHtml(txt) + '</li>';
            }
            html += '</ul>';
          }
          html += '</div>';
        }
        html += '</div>';
      }

      // ── Projects ──
      if (projects.length > 0) {
        html += '<hr class="divider">';
        html += '<div data-section="projects">';
        html += '<div class="sec-title">' + escapeHtml(t.projects) + '</div>';
        for (var pi = 0; pi < projects.length; pi++) {
          var proj = projects[pi];
          html += '<div class="proj-entry" data-entry-id="' + escapeHtml(safeStr(proj.id)) + '">';
          html += '<span class="proj-name">' + escapeHtml(safeStr(proj.name)) + '</span>';
          if (proj.description) html += '<div class="proj-desc">' + escapeHtml(safeStr(proj.description)) + '</div>';
          if (safeArr(proj.technologies).length > 0) {
            html += '<div class="proj-tech">' + safeArr(proj.technologies).map(function(t) { return escapeHtml(safeStr(t)); }).join(', ') + '</div>';
          }
          html += '</div>';
        }
        html += '</div>';
      }

      // ── Achievements ──
      if (achievements.length > 0) {
        html += '<hr class="divider">';
        html += '<div data-section="achievements">';
        html += '<div class="sec-title">' + escapeHtml(t.achievements) + '</div>';
        for (var ai = 0; ai < achievements.length; ai++) {
          var ach = achievements[ai];
          html += '<div class="ach-entry" data-entry-id="' + escapeHtml(safeStr(ach.id)) + '">';
          var achLine = '';
          if (ach.title) achLine += '<span class="ach-bold">' + escapeHtml(safeStr(ach.title)) + '</span>';
          if (ach.description) achLine += (ach.title ? ': ' : '') + escapeHtml(safeStr(ach.description));
          html += '<div class="ach-line">' + achLine + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      // ── Education ──
      if (education.length > 0) {
        html += '<hr class="divider">';
        html += '<div data-section="education">';
        html += '<div class="sec-title">' + escapeHtml(t.education) + '</div>';
        for (var edi = 0; edi < education.length; edi++) {
          var edu = education[edi];
          var degree = safeStr(edu.degree);
          var field = safeStr(edu.field);
          var institution = safeStr(edu.institution);
          var gpa = edu.gpa;
          var eduRange = formatDateRange(safeStr(edu.startDate), safeStr(edu.endDate), edu.isCompleted === false, lang);
          var degreeLine = degree + (field ? ' in ' + field : '');

          html += '<div class="edu-entry" data-entry-id="' + escapeHtml(safeStr(edu.id)) + '">';
          html += '<div class="edu-row">';
          if (degreeLine) html += '<span class="edu-degree">' + escapeHtml(degreeLine) + '</span>';
          if (eduRange) html += '<span class="edu-date">' + escapeHtml(eduRange) + '</span>';
          html += '</div>';
          if (institution) html += '<div class="edu-institution">' + escapeHtml(institution) + '</div>';
          if (gpa) html += '<div class="edu-gpa">GPA: ' + escapeHtml(String(gpa)) + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      // ── Certifications ──
      if (certifications.length > 0) {
        html += '<hr class="divider">';
        html += '<div data-section="certifications">';
        html += '<div class="sec-title">' + escapeHtml(t.certifications) + '</div>';
        for (var cci = 0; cci < certifications.length; cci++) {
          var cert = certifications[cci];
          html += '<div class="cert-entry" data-entry-id="' + escapeHtml(safeStr(cert.id)) + '">';
          if (cert.name) html += '<span class="cert-name">' + escapeHtml(safeStr(cert.name)) + '</span>';
          if (cert.issuer) html += ' <span class="cert-detail">– ' + escapeHtml(safeStr(cert.issuer)) + '</span>';
          if (cert.date) html += ' <span class="cert-detail">(' + escapeHtml(formatDate(cert.date, lang)) + ')</span>';
          html += '</div>';
        }
        html += '</div>';
      }

      // ── Languages ──
      if (languages.length > 0) {
        html += '<hr class="divider">';
        html += '<div data-section="languages">';
        html += '<div class="sec-title">' + escapeHtml(t.languages) + '</div>';
        var lMap = levelMap[lang] || levelMap.en;
        var langParts = [];
        for (var li = 0; li < languages.length; li++) {
          var langItem = languages[li];
          var langLevel = safeStr(langItem.level || 'basic');
          var langLabel = lMap[langLevel] || langLevel;
          langParts.push('<span data-entry-id="' + escapeHtml(safeStr(langItem.id)) + '"><strong>' + escapeHtml(safeStr(langItem.name)) + '</strong> (' + escapeHtml(langLabel) + ')</span>');
        }
        html += '<div class="lang-list">' + langParts.join(' &nbsp;·&nbsp; ') + '</div>';
        html += '</div>';
      }

      html += '</div>'; // .sections
      html += '</div>'; // .page

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = html;
      }
    }
  }

  if (!customElements.get('gqr-resume-fineline')) {
    customElements.define('gqr-resume-fineline', GQRResumeFineline);
  }
})();
