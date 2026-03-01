/**
 * name: gqr-resume-precision
 * description: "Compact single-column resume with dark navy header, full-width section title bars, categorized skills, and dense professional layout."
 */

(function() {
  'use strict';

  const i18n = {
    es: {
      profile: "Resumen Profesional", experience: "Experiencia Laboral",
      education: "Educación", projects: "Proyectos", certifications: "Certificaciones",
      languages: "Idiomas", achievements: "Logros", skills: "Habilidades",
      present: "Presente",
      basic: "Básico", intermediate: "Intermedio", advanced: "Avanzado", native: "Nativo"
    },
    en: {
      profile: "Professional Summary", experience: "Work Experience",
      education: "Education", projects: "Projects", certifications: "Certifications",
      languages: "Languages", achievements: "Achievements", skills: "Skills",
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
      var monthNames = {
        es: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      };
      var months = monthNames[lang] || monthNames.en;
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

  var accent = '#1a3650';

  class GQRResumePrecision extends HTMLElement {
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
        '  line-height: 1.45;' +
        '  color: #333;' +
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
        '}' +

        /* ── Header ── */
        '.header {' +
        '  background: ' + accent + ';' +
        '  padding: 24px 32px 18px;' +
        '  text-align: center;' +
        '}' +
        '.header-name {' +
        '  font-size: 26px;' +
        '  font-weight: 700;' +
        '  color: #fff;' +
        '  letter-spacing: 0.5px;' +
        '  line-height: 1.2;' +
        '}' +
        '.header-profession {' +
        '  font-size: 13px;' +
        '  font-weight: 400;' +
        '  color: rgba(255,255,255,0.8);' +
        '  margin-top: 3px;' +
        '  font-style: italic;' +
        '}' +
        '.header-contact {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  justify-content: center;' +
        '  gap: 4px 6px;' +
        '  margin-top: 10px;' +
        '  font-size: 10.5px;' +
        '  color: rgba(255,255,255,0.85);' +
        '}' +
        '.header-contact-item {' +
        '  white-space: nowrap;' +
        '}' +
        '.header-sep {' +
        '  color: rgba(255,255,255,0.4);' +
        '}' +

        /* ── Section bar ── */
        '.section-bar {' +
        '  background: ' + accent + ';' +
        '  padding: 5px 14px;' +
        '  margin-bottom: 10px;' +
        '}' +
        '.section-bar-text {' +
        '  font-size: 11.5px;' +
        '  font-weight: 700;' +
        '  text-transform: uppercase;' +
        '  letter-spacing: 1.4px;' +
        '  color: #fff;' +
        '}' +

        /* ── Body ── */
        '.body {' +
        '  padding: 16px 32px 28px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 14px;' +
        '  text-align: left;' +
        '}' +

        /* Profile */
        '.profile-text {' +
        '  font-size: 11px;' +
        '  line-height: 1.6;' +
        '  color: #444;' +
        '}' +

        /* Skills */
        '.skills-list {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 5px;' +
        '}' +
        '.skill-badge {' +
        '  display: inline-block;' +
        '  background: #edf1f5;' +
        '  color: ' + accent + ';' +
        '  font-size: 10px;' +
        '  font-weight: 600;' +
        '  padding: 2px 10px;' +
        '  border-radius: 12px;' +
        '  white-space: nowrap;' +
        '}' +

        /* Experience */
        '.exp-entry { margin-bottom: 12px; text-align: left; }' +
        '.exp-entry:last-child { margin-bottom: 0; }' +
        '.exp-top {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '}' +
        '.exp-title-company {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.exp-company-text {' +
        '  font-weight: 400;' +
        '  font-style: italic;' +
        '  color: #555;' +
        '}' +
        '.exp-meta {' +
        '  font-size: 10.5px;' +
        '  color: #777;' +
        '  white-space: nowrap;' +
        '  text-align: right;' +
        '}' +
        '.exp-bullets { list-style: none; margin-top: 4px; }' +
        '.exp-bullet {' +
        '  font-size: 11px;' +
        '  line-height: 1.55;' +
        '  color: #444;' +
        '  padding-left: 12px;' +
        '  position: relative;' +
        '  margin-bottom: 1px;' +
        '}' +
        '.exp-bullet::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: ' + accent + ';' +
        '}' +

        /* Projects */
        '.proj-entry { margin-bottom: 10px; text-align: left; }' +
        '.proj-entry:last-child { margin-bottom: 0; }' +
        '.proj-top {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '}' +
        '.proj-name {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.proj-desc {' +
        '  font-size: 11px;' +
        '  color: #444;' +
        '  line-height: 1.55;' +
        '  margin-top: 2px;' +
        '}' +
        '.proj-tech {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 3px;' +
        '  margin-top: 4px;' +
        '}' +
        '.tech-tag {' +
        '  background: #edf1f5;' +
        '  color: ' + accent + ';' +
        '  font-size: 9px;' +
        '  padding: 1px 7px;' +
        '  border-radius: 3px;' +
        '}' +
        '.proj-bullets { list-style: none; margin-top: 3px; }' +
        '.proj-bullet {' +
        '  font-size: 11px;' +
        '  line-height: 1.55;' +
        '  color: #444;' +
        '  padding-left: 12px;' +
        '  position: relative;' +
        '  margin-bottom: 1px;' +
        '}' +
        '.proj-bullet::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: ' + accent + ';' +
        '}' +

        /* Achievements */
        '.ach-entry { margin-bottom: 8px; text-align: left; }' +
        '.ach-entry:last-child { margin-bottom: 0; }' +
        '.ach-title {' +
        '  font-size: 11.5px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.ach-year {' +
        '  font-size: 10px;' +
        '  color: #888;' +
        '  margin-left: 4px;' +
        '}' +
        '.ach-desc {' +
        '  font-size: 11px;' +
        '  color: #555;' +
        '  line-height: 1.55;' +
        '  margin-top: 1px;' +
        '}' +

        /* Education */
        '.edu-entry { margin-bottom: 12px; text-align: left; }' +
        '.edu-entry:last-child { margin-bottom: 0; }' +
        '.edu-top {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '}' +
        '.edu-degree {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.edu-meta {' +
        '  font-size: 10.5px;' +
        '  color: #777;' +
        '  white-space: nowrap;' +
        '  text-align: right;' +
        '}' +
        '.edu-institution {' +
        '  font-size: 11.5px;' +
        '  font-style: italic;' +
        '  color: #555;' +
        '  margin-top: 1px;' +
        '}' +
        '.edu-gpa {' +
        '  font-size: 10px;' +
        '  color: #888;' +
        '  margin-top: 1px;' +
        '}' +

        /* Certifications */
        '.cert-grid {' +
        '  display: grid;' +
        '  grid-template-columns: 1fr 1fr;' +
        '  gap: 6px 24px;' +
        '}' +
        '.cert-entry { text-align: left; }' +
        '.cert-bullet {' +
        '  font-size: 11px;' +
        '  color: #333;' +
        '  padding-left: 12px;' +
        '  position: relative;' +
        '  line-height: 1.5;' +
        '}' +
        '.cert-bullet::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: ' + accent + ';' +
        '}' +
        '.cert-issuer {' +
        '  font-size: 10px;' +
        '  color: #888;' +
        '  padding-left: 12px;' +
        '}' +

        /* Languages */
        '.lang-grid {' +
        '  display: grid;' +
        '  grid-template-columns: 1fr 1fr 1fr;' +
        '  gap: 6px 24px;' +
        '  text-align: left;' +
        '}' +
        '.lang-entry {}' +
        '.lang-name {' +
        '  font-size: 11.5px;' +
        '  font-weight: 700;' +
        '  color: #222;' +
        '}' +
        '.lang-level {' +
        '  font-size: 10.5px;' +
        '  color: #777;' +
        '  font-style: italic;' +
        '}' +

        '@media print {' +
        '  .page { width: 210mm; min-height: 297mm; }' +
        '}' +
      '</style>';

      function sectionBar(label) {
        return '<div class="section-bar"><span class="section-bar-text">' + escapeHtml(label) + '</span></div>';
      }

      var html = styles + '<div class="page">';

      // ── Header ──
      html += '<div class="header" data-section="header">';
      if (fullName) html += '<div class="header-name">' + escapeHtml(fullName) + '</div>';
      if (profession) html += '<div class="header-profession">' + escapeHtml(profession) + '</div>';
      var cItems = [];
      if (email) cItems.push(escapeHtml(email));
      if (phone) cItems.push(escapeHtml(phone));
      if (country) cItems.push(escapeHtml(country));
      if (linkedin) cItems.push(escapeHtml(linkedin));
      if (cItems.length > 0) {
        html += '<div class="header-contact">';
        for (var ci2 = 0; ci2 < cItems.length; ci2++) {
          if (ci2 > 0) html += '<span class="header-sep">|</span>';
          html += '<span class="header-contact-item">' + cItems[ci2] + '</span>';
        }
        html += '</div>';
      }
      html += '</div>';

      html += '<div class="body">';

      // ── Profile ──
      if (summary) {
        html += '<div data-section="profile">';
        html += sectionBar(t.profile);
        html += '<div class="profile-text">' + escapeHtml(summary) + '</div>';
        html += '</div>';
      }

      // ── Skills ──
      if (skills.length > 0) {
        html += '<div data-section="skills">';
        html += sectionBar(t.skills);
        html += '<div class="skills-list">';
        for (var si = 0; si < skills.length; si++) {
          html += '<span class="skill-badge">' + escapeHtml(safeStr(skills[si])) + '</span>';
        }
        html += '</div>';
        html += '</div>';
      }

      // ── Experience ──
      if (experience.length > 0) {
        html += '<div data-section="experience">';
        html += sectionBar(t.experience);
        for (var ei = 0; ei < experience.length; ei++) {
          var exp = experience[ei];
          var position = safeStr(exp.title);
          var company = safeStr(exp.company);
          var expBullets = safeArr(exp.achievements).concat(safeArr(exp.responsibilities));
          var expRange = formatDateRange(safeStr(exp.startDate), safeStr(exp.endDate), exp.isCurrent || false, lang);

          html += '<div class="exp-entry" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          html += '<div class="exp-top">';
          html += '<span class="exp-title-company">' + escapeHtml(position);
          if (company) html += '<span class="exp-company-text">, ' + escapeHtml(company) + '</span>';
          html += '</span>';
          if (expRange) html += '<span class="exp-meta">' + escapeHtml(expRange) + '</span>';
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
        html += '<div data-section="projects">';
        html += sectionBar(t.projects);
        for (var pi = 0; pi < projects.length; pi++) {
          var proj = projects[pi];
          html += '<div class="proj-entry" data-entry-id="' + escapeHtml(safeStr(proj.id)) + '">';
          html += '<div class="proj-top">';
          html += '<span class="proj-name">' + escapeHtml(safeStr(proj.name)) + '</span>';
          html += '</div>';
          if (proj.description) html += '<div class="proj-desc">' + escapeHtml(safeStr(proj.description)) + '</div>';
          if (safeArr(proj.technologies).length > 0) {
            html += '<div class="proj-tech">';
            var techs = safeArr(proj.technologies);
            for (var ti = 0; ti < techs.length; ti++) {
              html += '<span class="tech-tag">' + escapeHtml(safeStr(techs[ti])) + '</span>';
            }
            html += '</div>';
          }
          html += '</div>';
        }
        html += '</div>';
      }

      // ── Achievements ──
      if (achievements.length > 0) {
        html += '<div data-section="achievements">';
        html += sectionBar(t.achievements);
        for (var ai = 0; ai < achievements.length; ai++) {
          var ach = achievements[ai];
          html += '<div class="ach-entry" data-entry-id="' + escapeHtml(safeStr(ach.id)) + '">';
          html += '<span class="ach-title">' + escapeHtml(safeStr(ach.title)) + '</span>';
          if (ach.year) html += '<span class="ach-year">(' + escapeHtml(String(ach.year)) + ')</span>';
          if (ach.description) html += '<div class="ach-desc">' + escapeHtml(safeStr(ach.description)) + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      // ── Education ──
      if (education.length > 0) {
        html += '<div data-section="education">';
        html += sectionBar(t.education);
        for (var edi = 0; edi < education.length; edi++) {
          var edu = education[edi];
          var degree = safeStr(edu.degree);
          var field = safeStr(edu.field);
          var institution = safeStr(edu.institution);
          var gpa = edu.gpa;
          var eduRange = formatDateRange(safeStr(edu.startDate), safeStr(edu.endDate), edu.isCompleted === false, lang);
          var degreeLine = degree + (field ? ', ' + field : '');

          html += '<div class="edu-entry" data-entry-id="' + escapeHtml(safeStr(edu.id)) + '">';
          html += '<div class="edu-top">';
          if (degreeLine) html += '<span class="edu-degree">' + escapeHtml(degreeLine) + '</span>';
          if (eduRange) html += '<span class="edu-meta">' + escapeHtml(eduRange) + '</span>';
          html += '</div>';
          if (institution) html += '<div class="edu-institution">' + escapeHtml(institution) + '</div>';
          if (gpa) html += '<div class="edu-gpa">GPA: ' + escapeHtml(String(gpa)) + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      // ── Certifications ──
      if (certifications.length > 0) {
        html += '<div data-section="certifications">';
        html += sectionBar(t.certifications);
        html += '<div class="cert-grid">';
        for (var cci = 0; cci < certifications.length; cci++) {
          var cert = certifications[cci];
          html += '<div class="cert-entry" data-entry-id="' + escapeHtml(safeStr(cert.id)) + '">';
          if (cert.name) html += '<div class="cert-bullet">' + escapeHtml(safeStr(cert.name)) + '</div>';
          if (cert.issuer) html += '<div class="cert-issuer">' + escapeHtml(safeStr(cert.issuer)) + '</div>';
          html += '</div>';
        }
        html += '</div>';
        html += '</div>';
      }

      // ── Languages ──
      if (languages.length > 0) {
        html += '<div data-section="languages">';
        html += sectionBar(t.languages);
        html += '<div class="lang-grid">';
        var lMap = levelMap[lang] || levelMap.en;
        for (var li = 0; li < languages.length; li++) {
          var langItem = languages[li];
          var langLevel = safeStr(langItem.level || 'basic');
          var langLabel = lMap[langLevel] || langLevel;
          html += '<div class="lang-entry" data-entry-id="' + escapeHtml(safeStr(langItem.id)) + '">' +
            '<span class="lang-name">' + escapeHtml(safeStr(langItem.name)) + '</span> ' +
            '<span class="lang-level">' + escapeHtml(langLabel) + '</span>' +
            '</div>';
        }
        html += '</div>';
        html += '</div>';
      }

      html += '</div>'; // .body
      html += '</div>'; // .page

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = html;
      }
    }
  }

  if (!customElements.get('gqr-resume-precision')) {
    customElements.define('gqr-resume-precision', GQRResumePrecision);
  }
})();
