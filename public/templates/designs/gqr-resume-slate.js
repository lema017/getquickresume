/**
 * name: gqr-resume-slate
 * description: "Dense two-column resume with a light gray header band, compact typography, bulleted sections, and maximum information density for technical roles."
 */

(function() {
  'use strict';

  const i18n = {
    es: {
      profile: "Perfil", experience: "Experiencia Profesional",
      education: "Educación", projects: "Proyectos Clave", certifications: "Certificaciones",
      languages: "Idiomas", achievements: "Logros", skills: "Habilidades Técnicas",
      contact: "Contacto", present: "Presente",
      basic: "Básico", intermediate: "Intermedio", advanced: "Avanzado", native: "Nativo"
    },
    en: {
      profile: "Profile", experience: "Professional Experience",
      education: "Education", projects: "Key Technical Projects", certifications: "Certifications",
      languages: "Languages", achievements: "Achievements", skills: "Technical Skills",
      contact: "Contact", present: "Present",
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

  class GQRResumeSlate extends HTMLElement {
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
        '  line-height: 1.4;' +
        '  color: #222;' +
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
        '  background: #f0f0f0;' +
        '  padding: 22px 28px 16px;' +
        '  border-bottom: 3px solid #333;' +
        '}' +
        '.header-name {' +
        '  font-size: 24px;' +
        '  font-weight: 700;' +
        '  color: #111;' +
        '  line-height: 1.15;' +
        '}' +
        '.header-profession {' +
        '  font-size: 13px;' +
        '  font-weight: 400;' +
        '  color: #555;' +
        '  margin-top: 1px;' +
        '}' +
        '.hc-item {' +
        '  display: block;' +
        '  font-size: 10px;' +
        '  color: #444;' +
        '  margin-bottom: 3px;' +
        '  word-break: break-all;' +
        '}' +
        '.hc-icon { color: #888; margin-right: 3px; font-size: 9px; }' +

        /* ── Two-col body ── */
        '.body {' +
        '  display: flex;' +
        '  gap: 0;' +
        '}' +
        '.main {' +
        '  width: 58%;' +
        '  padding: 16px 20px 24px 28px;' +
        '  border-right: 1px solid #ddd;' +
        '}' +
        '.sidebar {' +
        '  width: 42%;' +
        '  padding: 16px 28px 24px 20px;' +
        '}' +

        /* ── Section title ── */
        '.sec-title {' +
        '  font-size: 10.5px;' +
        '  font-weight: 700;' +
        '  text-transform: uppercase;' +
        '  letter-spacing: 1.2px;' +
        '  color: #111;' +
        '  margin-bottom: 7px;' +
        '  padding-bottom: 3px;' +
        '  border-bottom: 1.5px solid #333;' +
        '}' +
        '.sec-gap { margin-top: 14px; }' +

        /* Profile */
        '.profile-text {' +
        '  font-size: 10.5px;' +
        '  line-height: 1.55;' +
        '  color: #333;' +
        '}' +

        /* Experience */
        '.exp-entry { margin-bottom: 10px; text-align: left; }' +
        '.exp-entry:last-child { margin-bottom: 0; }' +
        '.exp-head {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '}' +
        '.exp-title {' +
        '  font-size: 11px;' +
        '  font-weight: 700;' +
        '  color: #111;' +
        '}' +
        '.exp-date {' +
        '  font-size: 10px;' +
        '  color: #777;' +
        '  white-space: nowrap;' +
        '}' +
        '.exp-company {' +
        '  font-size: 10.5px;' +
        '  color: #555;' +
        '  font-style: italic;' +
        '}' +
        '.exp-bullets { list-style: none; margin-top: 3px; }' +
        '.exp-bullet {' +
        '  font-size: 10.5px;' +
        '  line-height: 1.5;' +
        '  color: #333;' +
        '  padding-left: 11px;' +
        '  position: relative;' +
        '  margin-bottom: 1px;' +
        '}' +
        '.exp-bullet::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: #555;' +
        '}' +

        /* Skills (right col) */
        '.skill-item {' +
        '  font-size: 10.5px;' +
        '  color: #333;' +
        '  padding-left: 11px;' +
        '  position: relative;' +
        '  line-height: 1.5;' +
        '  margin-bottom: 1px;' +
        '}' +
        '.skill-item::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: #555;' +
        '}' +

        /* Education */
        '.edu-entry { margin-bottom: 8px; text-align: left; }' +
        '.edu-entry:last-child { margin-bottom: 0; }' +
        '.edu-degree {' +
        '  font-size: 11px;' +
        '  font-weight: 700;' +
        '  color: #111;' +
        '}' +
        '.edu-institution {' +
        '  font-size: 10.5px;' +
        '  color: #555;' +
        '  font-style: italic;' +
        '}' +
        '.edu-date {' +
        '  font-size: 10px;' +
        '  color: #777;' +
        '}' +
        '.edu-gpa {' +
        '  font-size: 10px;' +
        '  color: #777;' +
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
        '.ach-title {' +
        '  font-size: 10.5px;' +
        '  font-weight: 700;' +
        '  color: #111;' +
        '}' +
        '.ach-desc {' +
        '  font-size: 10.5px;' +
        '  color: #444;' +
        '  line-height: 1.5;' +
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
        '.lang-entry {' +
        '  font-size: 10.5px;' +
        '  color: #333;' +
        '  margin-bottom: 3px;' +
        '}' +
        '.lang-name { font-weight: 700; }' +
        '.lang-level { color: #777; font-style: italic; }' +

        '@media print {' +
        '  .page { width: 210mm; min-height: 297mm; }' +
        '}' +
      '</style>';

      var html = styles + '<div class="page">';

      // ── Header (full-width bar) ──
      html += '<div class="header" data-section="header">';
      if (fullName) html += '<div class="header-name">' + escapeHtml(fullName) + '</div>';
      if (profession) html += '<div class="header-profession">' + escapeHtml(profession) + '</div>';
      html += '</div>';

      // ── Two-column body ──
      html += '<div class="body">';

      /* ═══ LEFT COLUMN (wide/main) ═══ */
      html += '<div class="main">';

      // 1. Profile
      if (summary) {
        html += '<div data-section="profile">';
        html += '<div class="sec-title">' + escapeHtml(t.profile) + '</div>';
        html += '<div class="profile-text">' + escapeHtml(summary) + '</div>';
        html += '</div>';
      }

      // 2. Experience
      if (experience.length > 0) {
        html += '<div class="sec-gap" data-section="experience">';
        html += '<div class="sec-title">' + escapeHtml(t.experience) + '</div>';
        for (var ei = 0; ei < experience.length; ei++) {
          var exp = experience[ei];
          var position = safeStr(exp.title);
          var company = safeStr(exp.company);
          var expBullets = safeArr(exp.achievements).concat(safeArr(exp.responsibilities));
          var expRange = formatDateRange(safeStr(exp.startDate), safeStr(exp.endDate), exp.isCurrent || false, lang);

          html += '<div class="exp-entry" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          html += '<div class="exp-head">';
          if (position) html += '<span class="exp-title">' + escapeHtml(position) + '</span>';
          html += '</div>';
          if (company || expRange) {
            html += '<div class="exp-head">';
            if (company) html += '<span class="exp-company">' + escapeHtml(company) + '</span>';
            if (expRange) html += '<span class="exp-date">' + escapeHtml(expRange) + '</span>';
            html += '</div>';
          }

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

      // 3. Projects
      if (projects.length > 0) {
        html += '<div class="sec-gap" data-section="projects">';
        html += '<div class="sec-title">' + escapeHtml(t.projects) + '</div>';
        for (var pi = 0; pi < projects.length; pi++) {
          var proj = projects[pi];
          html += '<div class="proj-entry" data-entry-id="' + escapeHtml(safeStr(proj.id)) + '">';
          html += '<div class="proj-name">' + escapeHtml(safeStr(proj.name)) + '</div>';
          if (proj.description) html += '<div class="proj-desc">' + escapeHtml(safeStr(proj.description)) + '</div>';
          if (safeArr(proj.technologies).length > 0) {
            html += '<div class="proj-tech">' + safeArr(proj.technologies).map(function(t) { return escapeHtml(safeStr(t)); }).join(', ') + '</div>';
          }
          html += '</div>';
        }
        html += '</div>';
      }

      // 4. Achievements
      if (achievements.length > 0) {
        html += '<div class="sec-gap" data-section="achievements">';
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

      // 5. Education
      if (education.length > 0) {
        html += '<div class="sec-gap" data-section="education">';
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
          if (degreeLine) html += '<div class="edu-degree">' + escapeHtml(degreeLine) + '</div>';
          if (institution) html += '<div class="edu-institution">' + escapeHtml(institution) + '</div>';
          if (eduRange) html += '<div class="edu-date">' + escapeHtml(eduRange) + '</div>';
          if (gpa) html += '<div class="edu-gpa">GPA: ' + escapeHtml(String(gpa)) + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      // 6. Certifications
      if (certifications.length > 0) {
        html += '<div class="sec-gap" data-section="certifications">';
        html += '<div class="sec-title">' + escapeHtml(t.certifications) + '</div>';
        for (var cci = 0; cci < certifications.length; cci++) {
          var cert = certifications[cci];
          html += '<div class="cert-entry" data-entry-id="' + escapeHtml(safeStr(cert.id)) + '">';
          if (cert.name) html += '<span class="cert-name">' + escapeHtml(safeStr(cert.name)) + '</span>';
          if (cert.issuer) html += ' <span class="cert-detail">– ' + escapeHtml(safeStr(cert.issuer)) + '</span>';
          html += '</div>';
        }
        html += '</div>';
      }

      html += '</div>'; // main

      /* ═══ RIGHT COLUMN (narrow/sidebar) ═══ */
      html += '<div class="sidebar">';

      // 1. Contact
      var cItems = [];
      if (email) cItems.push('<span class="hc-item"><span class="hc-icon">✉</span>' + escapeHtml(email) + '</span>');
      if (phone) cItems.push('<span class="hc-item"><span class="hc-icon">☎</span>' + escapeHtml(phone) + '</span>');
      if (country) cItems.push('<span class="hc-item"><span class="hc-icon">⚲</span>' + escapeHtml(country) + '</span>');
      if (linkedin) cItems.push('<span class="hc-item"><span class="hc-icon">🔗</span>' + escapeHtml(linkedin) + '</span>');
      if (cItems.length > 0) {
        html += '<div data-section="contact">';
        html += '<div class="sec-title">' + escapeHtml(t.contact) + '</div>';
        for (var ci2 = 0; ci2 < cItems.length; ci2++) {
          html += cItems[ci2];
        }
        html += '</div>';
      }

      // 2. Languages
      if (languages.length > 0) {
        html += '<div class="sec-gap" data-section="languages">';
        html += '<div class="sec-title">' + escapeHtml(t.languages) + '</div>';
        var lMap = levelMap[lang] || levelMap.en;
        for (var li = 0; li < languages.length; li++) {
          var langItem = languages[li];
          var langLevel = safeStr(langItem.level || 'basic');
          var langLabel = lMap[langLevel] || langLevel;
          html += '<div class="lang-entry" data-entry-id="' + escapeHtml(safeStr(langItem.id)) + '">' +
            '<span class="lang-name">' + escapeHtml(safeStr(langItem.name)) + '</span> ' +
            '<span class="lang-level">(' + escapeHtml(langLabel) + ')</span>' +
            '</div>';
        }
        html += '</div>';
      }

      // 3. Skills
      if (skills.length > 0) {
        html += '<div class="sec-gap" data-section="skills">';
        html += '<div class="sec-title">' + escapeHtml(t.skills) + '</div>';
        for (var si = 0; si < skills.length; si++) {
          html += '<div class="skill-item" data-entry-id="skill-' + si + '">' + escapeHtml(safeStr(skills[si])) + '</div>';
        }
        html += '</div>';
      }

      html += '</div>'; // sidebar
      html += '</div>'; // body
      html += '</div>'; // page

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = html;
      }
    }
  }

  if (!customElements.get('gqr-resume-slate')) {
    customElements.define('gqr-resume-slate', GQRResumeSlate);
  }
})();
