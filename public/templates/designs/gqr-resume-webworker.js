/**
 * name: gqr-resume-webworker
 * description: "Two-column resume with dark photo-style sidebar, cursive name, contact info below, and clean white main area with uppercase section headings, short underlines, language/skill badges."
 */

(function() {
  'use strict';

  var sidebarBg = '#3a3a3a';

  const i18n = {
    es: {
      profile: "Perfil", experience: "Experiencia Profesional",
      education: "Educación", projects: "Proyectos", certifications: "Certificaciones",
      languages: "Idiomas", achievements: "Logros", skills: "Habilidades",
      contact: "Contacto", present: "Presente",
      basic: "Básico", intermediate: "Intermedio", advanced: "Avanzado", native: "Nativo"
    },
    en: {
      profile: "Profile", experience: "Professional Experience",
      education: "Education", projects: "Projects", certifications: "Certifications",
      languages: "Languages", achievements: "Achievements", skills: "Skills",
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

  class GQRResumeWebworker extends HTMLElement {
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

      var hasContact = email || phone || country || linkedin;

      var styles = '<style>' +
        '@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap");' +

        ':host {' +
        '  display: block;' +
        '  font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;' +
        '  line-height: 1.5;' +
        '  color: #333;' +
        '  -webkit-print-color-adjust: exact;' +
        '  print-color-adjust: exact;' +
        '}' +
        '* { margin: 0; padding: 0; box-sizing: border-box; }' +

        '.page {' +
        '  display: flex;' +
        '  width: 210mm;' +
        '  min-height: 297mm;' +
        '  height: auto;' +
        '  overflow: visible;' +
        '  background: #fff;' +
        '}' +

        /* ── Sidebar ── */
        '.sidebar {' +
        '  width: 35%;' +
        '  background: ' + sidebarBg + ';' +
        '  padding: 36px 22px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 22px;' +
        '  color: #fff;' +
        '}' +

        /* Sidebar name */
        '.sb-name {' +
        '  font-family: "Dancing Script", cursive;' +
        '  font-size: 30px;' +
        '  font-weight: 700;' +
        '  color: #fff;' +
        '  line-height: 1.15;' +
        '}' +

        /* Contact */
        '.sb-section-title {' +
        '  font-size: 10px;' +
        '  font-weight: 700;' +
        '  text-transform: uppercase;' +
        '  letter-spacing: 1.4px;' +
        '  color: rgba(255,255,255,0.5);' +
        '  margin-bottom: 8px;' +
        '}' +
        '.contact-line {' +
        '  font-size: 11px;' +
        '  color: rgba(255,255,255,0.85);' +
        '  margin-bottom: 5px;' +
        '  line-height: 1.4;' +
        '  word-break: break-all;' +
        '}' +

        /* Languages sidebar */
        '.lang-badge-wrap {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 6px;' +
        '}' +
        '.lang-badge {' +
        '  display: inline-block;' +
        '  background: rgba(255,255,255,0.15);' +
        '  color: #fff;' +
        '  font-size: 10.5px;' +
        '  font-weight: 500;' +
        '  padding: 3px 12px;' +
        '  border-radius: 4px;' +
        '  border: 1px solid rgba(255,255,255,0.3);' +
        '  white-space: nowrap;' +
        '}' +

        /* Skills sidebar */
        '.skill-badge-wrap {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 6px;' +
        '}' +
        '.skill-badge {' +
        '  display: inline-block;' +
        '  background: #222;' +
        '  color: #fff;' +
        '  font-size: 10.5px;' +
        '  font-weight: 500;' +
        '  padding: 4px 12px;' +
        '  border-radius: 4px;' +
        '  white-space: nowrap;' +
        '}' +

        /* ── Main ── */
        '.main {' +
        '  width: 65%;' +
        '  background: #fff;' +
        '  padding: 36px 30px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 20px;' +
        '}' +

        /* Main section heading */
        '.mn-heading { margin-bottom: 10px; }' +
        '.mn-title {' +
        '  font-size: 14px;' +
        '  font-weight: 700;' +
        '  text-transform: uppercase;' +
        '  letter-spacing: 1.6px;' +
        '  color: #1a1a1a;' +
        '  margin-bottom: 4px;' +
        '}' +
        '.mn-underline {' +
        '  width: 36px;' +
        '  height: 3px;' +
        '  background: #1a1a1a;' +
        '  border-radius: 2px;' +
        '}' +

        /* Profile */
        '.profile-text {' +
        '  font-size: 11.5px;' +
        '  line-height: 1.65;' +
        '  color: #444;' +
        '  text-align: justify;' +
        '}' +

        /* Experience */
        '.exp-entry { margin-bottom: 14px; text-align: left; }' +
        '.exp-entry:last-child { margin-bottom: 0; }' +
        '.exp-company {' +
        '  font-size: 12.5px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.exp-title {' +
        '  font-size: 11.5px;' +
        '  font-style: italic;' +
        '  color: #555;' +
        '}' +
        '.exp-date {' +
        '  font-size: 10.5px;' +
        '  color: #888;' +
        '}' +
        '.exp-bullets { list-style: none; margin-top: 4px; }' +
        '.exp-bullet {' +
        '  font-size: 11px;' +
        '  line-height: 1.55;' +
        '  color: #444;' +
        '  padding-left: 13px;' +
        '  position: relative;' +
        '  margin-bottom: 1px;' +
        '}' +
        '.exp-bullet::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: #999;' +
        '}' +

        /* Projects */
        '.proj-entry { margin-bottom: 10px; text-align: left; }' +
        '.proj-entry:last-child { margin-bottom: 0; }' +
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
        '  font-size: 10px;' +
        '  color: #777;' +
        '  margin-top: 2px;' +
        '}' +

        /* Achievements */
        '.ach-entry { margin-bottom: 8px; text-align: left; }' +
        '.ach-entry:last-child { margin-bottom: 0; }' +
        '.ach-title {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.ach-desc {' +
        '  font-size: 11px;' +
        '  color: #555;' +
        '  line-height: 1.55;' +
        '  margin-top: 1px;' +
        '}' +
        '.ach-year {' +
        '  font-size: 10px;' +
        '  color: #888;' +
        '}' +

        /* Education */
        '.edu-entry { margin-bottom: 10px; text-align: left; }' +
        '.edu-entry:last-child { margin-bottom: 0; }' +
        '.edu-degree {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.edu-institution {' +
        '  font-size: 11.5px;' +
        '  color: #555;' +
        '}' +
        '.edu-date {' +
        '  font-size: 10.5px;' +
        '  color: #888;' +
        '}' +
        '.edu-gpa {' +
        '  font-size: 10px;' +
        '  color: #888;' +
        '}' +

        /* Certifications */
        '.cert-entry { margin-bottom: 6px; text-align: left; }' +
        '.cert-entry:last-child { margin-bottom: 0; }' +
        '.cert-name {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.cert-detail {' +
        '  font-size: 11px;' +
        '  color: #555;' +
        '}' +

        '@media print {' +
        '  .page { width: 210mm; min-height: 297mm; }' +
        '}' +
      '</style>';

      function mnHeading(label) {
        return '<div class="mn-heading">' +
          '<div class="mn-title">' + escapeHtml(label) + '</div>' +
          '<div class="mn-underline"></div>' +
          '</div>';
      }

      var html = styles + '<div class="page">';

      /* ═══ SIDEBAR ═══ */
      html += '<div class="sidebar">';

      // Name (cursive)
      html += '<div data-section="header">';
      if (firstName) html += '<div class="sb-name">' + escapeHtml(firstName) + '</div>';
      if (lastName) html += '<div class="sb-name">' + escapeHtml(lastName) + '</div>';
      html += '</div>';

      // 1. Contact
      if (hasContact) {
        html += '<div data-section="contact">';
        if (country) html += '<div class="contact-line">' + escapeHtml(country) + '</div>';
        if (phone) html += '<div class="contact-line">' + escapeHtml(phone) + '</div>';
        if (email) html += '<div class="contact-line">' + escapeHtml(email) + '</div>';
        if (linkedin) html += '<div class="contact-line">' + escapeHtml(linkedin) + '</div>';
        html += '</div>';
      }

      // 2. Languages
      if (languages.length > 0) {
        html += '<div data-section="languages">';
        html += '<div class="sb-section-title">' + escapeHtml(t.languages) + '</div>';
        html += '<div class="lang-badge-wrap">';
        for (var li = 0; li < languages.length; li++) {
          var langItem = languages[li];
          html += '<span class="lang-badge" data-entry-id="' + escapeHtml(safeStr(langItem.id)) + '">' + escapeHtml(safeStr(langItem.name)) + '</span>';
        }
        html += '</div>';
        html += '</div>';
      }

      // 3. Skills
      if (skills.length > 0) {
        html += '<div data-section="skills">';
        html += '<div class="sb-section-title">' + escapeHtml(t.skills) + '</div>';
        html += '<div class="skill-badge-wrap">';
        for (var si = 0; si < skills.length; si++) {
          html += '<span class="skill-badge">' + escapeHtml(safeStr(skills[si])) + '</span>';
        }
        html += '</div>';
        html += '</div>';
      }

      html += '</div>'; // sidebar

      /* ═══ MAIN ═══ */
      html += '<div class="main">';

      // Profile (summary at top of main)
      if (summary) {
        html += '<div data-section="profile">';
        html += '<div class="profile-text">' + escapeHtml(summary) + '</div>';
        html += '</div>';
      }

      // Experience
      if (experience.length > 0) {
        html += '<div data-section="experience">';
        html += mnHeading(t.experience);
        for (var ei = 0; ei < experience.length; ei++) {
          var exp = experience[ei];
          var position = safeStr(exp.title);
          var company = safeStr(exp.company);
          var expBullets = safeArr(exp.achievements).concat(safeArr(exp.responsibilities));
          var expRange = formatDateRange(safeStr(exp.startDate), safeStr(exp.endDate), exp.isCurrent || false, lang);

          html += '<div class="exp-entry" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          if (company) html += '<div class="exp-company">' + escapeHtml(company) + '</div>';
          if (position) html += '<div class="exp-title">' + escapeHtml(position) + '</div>';
          if (expRange) html += '<div class="exp-date">' + escapeHtml(expRange) + '</div>';

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

      // Projects
      if (projects.length > 0) {
        html += '<div data-section="projects">';
        html += mnHeading(t.projects);
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

      // Achievements
      if (achievements.length > 0) {
        html += '<div data-section="achievements">';
        html += mnHeading(t.achievements);
        for (var ai = 0; ai < achievements.length; ai++) {
          var ach = achievements[ai];
          html += '<div class="ach-entry" data-entry-id="' + escapeHtml(safeStr(ach.id)) + '">';
          if (ach.title) html += '<div class="ach-title">' + escapeHtml(safeStr(ach.title)) + '</div>';
          if (ach.description) html += '<div class="ach-desc">' + escapeHtml(safeStr(ach.description)) + '</div>';
          if (ach.year) html += '<div class="ach-year">' + escapeHtml(String(ach.year)) + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      // Education
      if (education.length > 0) {
        html += '<div data-section="education">';
        html += mnHeading(t.education);
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

      // Certifications
      if (certifications.length > 0) {
        html += '<div data-section="certifications">';
        html += mnHeading(t.certifications);
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
      html += '</div>'; // page

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = html;
      }
    }
  }

  if (!customElements.get('gqr-resume-webworker')) {
    customElements.define('gqr-resume-webworker', GQRResumeWebworker);
  }
})();
