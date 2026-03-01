/**
 * name: gqr-resume-cobalt
 * description: "Elegant single-column resume with dark navy header, serif italic section headings with short underlines, right-aligned dates, and clean white body."
 */

(function() {
  'use strict';

  const i18n = {
    es: {
      profile: "Perfil", experience: "Experiencia",
      education: "Educación", projects: "Proyectos", certifications: "Certificaciones",
      languages: "Idiomas", achievements: "Logros", skills: "Habilidades",
      contact: "Contacto", present: "Presente",
      basic: "Básico", intermediate: "Intermedio", advanced: "Avanzado", native: "Nativo"
    },
    en: {
      profile: "Profile", experience: "Experience",
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
      var monthNames = {
        es: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      };
      var months = monthNames[lang] || monthNames.en;
      return (date.getMonth() + 1) + '/' + date.getFullYear();
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

  class GQRResumeCobalt extends HTMLElement {
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

      var navy = '#1a3a5c';

      var styles = '<style>' +
        '@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:wght@300;400;600;700&display=swap");' +

        ':host {' +
        '  display: block;' +
        '  font-family: "Source Sans Pro", "Segoe UI", Roboto, sans-serif;' +
        '  line-height: 1.5;' +
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
        '  background: ' + navy + ';' +
        '  padding: 30px 40px 24px;' +
        '}' +
        '.header-name-line {' +
        '  display: flex;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '  gap: 12px;' +
        '}' +
        '.header-name {' +
        '  font-family: "Playfair Display", Georgia, serif;' +
        '  font-size: 28px;' +
        '  font-weight: 700;' +
        '  font-style: italic;' +
        '  color: #fff;' +
        '  letter-spacing: 0.3px;' +
        '}' +
        '.header-profession {' +
        '  font-family: "Playfair Display", Georgia, serif;' +
        '  font-size: 18px;' +
        '  font-weight: 400;' +
        '  font-style: italic;' +
        '  color: rgba(255,255,255,0.8);' +
        '}' +
        '.header-contact {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 6px 22px;' +
        '  margin-top: 12px;' +
        '  font-size: 11.5px;' +
        '  color: rgba(255,255,255,0.85);' +
        '}' +
        '.header-contact-item {' +
        '  display: flex;' +
        '  align-items: center;' +
        '  gap: 6px;' +
        '}' +
        '.header-icon {' +
        '  font-size: 11px;' +
        '  opacity: 0.7;' +
        '}' +

        /* ── Body ── */
        '.body {' +
        '  padding: 28px 40px 40px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 22px;' +
        '  text-align: left;' +
        '}' +

        /* ── Section title ── */
        '.section-heading {' +
        '  margin-bottom: 12px;' +
        '}' +
        '.section-title {' +
        '  font-family: "Playfair Display", Georgia, serif;' +
        '  font-size: 16px;' +
        '  font-weight: 400;' +
        '  font-style: italic;' +
        '  color: ' + navy + ';' +
        '  margin-bottom: 4px;' +
        '}' +
        '.section-underline {' +
        '  width: 36px;' +
        '  height: 3px;' +
        '  background: ' + navy + ';' +
        '  border-radius: 2px;' +
        '}' +

        /* Profile */
        '.profile-text {' +
        '  font-size: 12px;' +
        '  line-height: 1.7;' +
        '  color: #444;' +
        '}' +

        /* Skills */
        '.skills-wrap {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 6px;' +
        '}' +
        '.skill-badge {' +
        '  display: inline-block;' +
        '  background: #eef2f7;' +
        '  color: ' + navy + ';' +
        '  font-size: 11px;' +
        '  font-weight: 600;' +
        '  padding: 3px 12px;' +
        '  border-radius: 14px;' +
        '  white-space: nowrap;' +
        '}' +

        /* Experience */
        '.exp-entry { margin-bottom: 16px; text-align: left; }' +
        '.exp-entry:last-child { margin-bottom: 0; }' +
        '.exp-top {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '}' +
        '.exp-title {' +
        '  font-size: 13px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.exp-date {' +
        '  font-size: 11.5px;' +
        '  color: #777;' +
        '  white-space: nowrap;' +
        '}' +
        '.exp-company-line {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '}' +
        '.exp-company {' +
        '  font-size: 12px;' +
        '  font-style: italic;' +
        '  color: #555;' +
        '}' +
        '.exp-location {' +
        '  font-size: 11px;' +
        '  color: #999;' +
        '  white-space: nowrap;' +
        '}' +
        '.exp-bullets { list-style: none; margin-top: 5px; }' +
        '.exp-bullet {' +
        '  font-size: 12px;' +
        '  line-height: 1.6;' +
        '  color: #444;' +
        '  padding-left: 14px;' +
        '  position: relative;' +
        '  margin-bottom: 2px;' +
        '}' +
        '.exp-bullet::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: ' + navy + ';' +
        '}' +

        /* Projects */
        '.proj-entry { margin-bottom: 14px; text-align: left; }' +
        '.proj-entry:last-child { margin-bottom: 0; }' +
        '.proj-top {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '}' +
        '.proj-name {' +
        '  font-size: 13px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.proj-desc {' +
        '  font-size: 12px;' +
        '  color: #444;' +
        '  line-height: 1.6;' +
        '  margin-top: 2px;' +
        '}' +
        '.proj-tech {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 4px;' +
        '  margin-top: 5px;' +
        '}' +
        '.tech-tag {' +
        '  background: #eef2f7;' +
        '  color: ' + navy + ';' +
        '  font-size: 10px;' +
        '  padding: 1px 8px;' +
        '  border-radius: 3px;' +
        '}' +
        '.proj-bullets { list-style: none; margin-top: 4px; }' +
        '.proj-bullet {' +
        '  font-size: 12px;' +
        '  line-height: 1.6;' +
        '  color: #444;' +
        '  padding-left: 14px;' +
        '  position: relative;' +
        '  margin-bottom: 2px;' +
        '}' +
        '.proj-bullet::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: ' + navy + ';' +
        '}' +

        /* Achievements */
        '.ach-entry { margin-bottom: 10px; text-align: left; }' +
        '.ach-entry:last-child { margin-bottom: 0; }' +
        '.ach-title {' +
        '  font-size: 12.5px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.ach-year {' +
        '  font-size: 11px;' +
        '  color: #888;' +
        '  margin-left: 5px;' +
        '}' +
        '.ach-desc {' +
        '  font-size: 12px;' +
        '  color: #555;' +
        '  line-height: 1.6;' +
        '  margin-top: 1px;' +
        '}' +

        /* Education */
        '.edu-entry { margin-bottom: 14px; text-align: left; }' +
        '.edu-entry:last-child { margin-bottom: 0; }' +
        '.edu-top {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '}' +
        '.edu-degree {' +
        '  font-size: 13px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.edu-date {' +
        '  font-size: 11.5px;' +
        '  color: #777;' +
        '  white-space: nowrap;' +
        '}' +
        '.edu-inst-line {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '}' +
        '.edu-institution {' +
        '  font-size: 12px;' +
        '  font-style: italic;' +
        '  color: #555;' +
        '}' +
        '.edu-location {' +
        '  font-size: 11px;' +
        '  color: #999;' +
        '  white-space: nowrap;' +
        '}' +
        '.edu-gpa {' +
        '  font-size: 11px;' +
        '  color: #888;' +
        '  margin-top: 2px;' +
        '}' +
        '.edu-bullets { list-style: none; margin-top: 4px; }' +
        '.edu-bullet {' +
        '  font-size: 12px;' +
        '  line-height: 1.6;' +
        '  color: #444;' +
        '  padding-left: 14px;' +
        '  position: relative;' +
        '  margin-bottom: 2px;' +
        '}' +
        '.edu-bullet::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: ' + navy + ';' +
        '}' +

        /* Certifications */
        '.cert-entry { margin-bottom: 8px; text-align: left; }' +
        '.cert-entry:last-child { margin-bottom: 0; }' +
        '.cert-name {' +
        '  font-size: 12.5px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.cert-issuer {' +
        '  font-size: 12px;' +
        '  color: #555;' +
        '  font-style: italic;' +
        '}' +
        '.cert-date {' +
        '  font-size: 11px;' +
        '  color: #888;' +
        '}' +

        /* Languages */
        '.lang-grid {' +
        '  display: grid;' +
        '  grid-template-columns: 1fr 1fr;' +
        '  gap: 8px 40px;' +
        '  text-align: left;' +
        '}' +
        '.lang-entry {' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '}' +
        '.lang-name {' +
        '  font-size: 12.5px;' +
        '  font-weight: 700;' +
        '  color: #222;' +
        '}' +
        '.lang-level {' +
        '  font-size: 11.5px;' +
        '  color: #777;' +
        '  font-style: italic;' +
        '}' +

        '@media print {' +
        '  .page { width: 210mm; min-height: 297mm; }' +
        '}' +
      '</style>';

      function sectionHeading(label) {
        return '<div class="section-heading">' +
          '<div class="section-title">' + escapeHtml(label) + '</div>' +
          '<div class="section-underline"></div>' +
          '</div>';
      }

      var html = styles + '<div class="page">';

      // ── Header ──
      html += '<div class="header" data-section="header">';
      html += '<div class="header-name-line">';
      if (fullName) html += '<span class="header-name">' + escapeHtml(fullName) + '</span>';
      if (profession) html += '<span class="header-profession">' + escapeHtml(profession) + '</span>';
      html += '</div>';
      var contactItems = [];
      if (email) contactItems.push('<span class="header-contact-item"><span class="header-icon">✉</span>' + escapeHtml(email) + '</span>');
      if (phone) contactItems.push('<span class="header-contact-item"><span class="header-icon">☎</span>' + escapeHtml(phone) + '</span>');
      if (country) contactItems.push('<span class="header-contact-item"><span class="header-icon">⚲</span>' + escapeHtml(country) + '</span>');
      if (linkedin) contactItems.push('<span class="header-contact-item"><span class="header-icon">🔗</span>' + escapeHtml(linkedin) + '</span>');
      if (contactItems.length > 0) {
        html += '<div class="header-contact">' + contactItems.join('') + '</div>';
      }
      html += '</div>';

      html += '<div class="body">';

      // ── Profile ──
      if (summary) {
        html += '<div data-section="profile">';
        html += sectionHeading(t.profile);
        html += '<div class="profile-text">' + escapeHtml(summary) + '</div>';
        html += '</div>';
      }

      // ── Skills ──
      if (skills.length > 0) {
        html += '<div data-section="skills">';
        html += sectionHeading(t.skills);
        html += '<div class="skills-wrap">';
        for (var si = 0; si < skills.length; si++) {
          html += '<span class="skill-badge">' + escapeHtml(safeStr(skills[si])) + '</span>';
        }
        html += '</div>';
        html += '</div>';
      }

      // ── Experience ──
      if (experience.length > 0) {
        html += '<div data-section="experience">';
        html += sectionHeading(t.experience);
        for (var ei = 0; ei < experience.length; ei++) {
          var exp = experience[ei];
          var position = safeStr(exp.title);
          var company = safeStr(exp.company);
          var expBullets = safeArr(exp.achievements).concat(safeArr(exp.responsibilities));
          var expRange = formatDateRange(safeStr(exp.startDate), safeStr(exp.endDate), exp.isCurrent || false, lang);

          html += '<div class="exp-entry" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          html += '<div class="exp-top">';
          if (position) html += '<span class="exp-title">' + escapeHtml(position) + '</span>';
          if (expRange) html += '<span class="exp-date">' + escapeHtml(expRange) + '</span>';
          html += '</div>';
          if (company) {
            html += '<div class="exp-company-line">';
            html += '<span class="exp-company">' + escapeHtml(company) + '</span>';
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

      // ── Projects ──
      if (projects.length > 0) {
        html += '<div data-section="projects">';
        html += sectionHeading(t.projects);
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
        html += sectionHeading(t.achievements);
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
        html += sectionHeading(t.education);
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
          if (eduRange) html += '<span class="edu-date">' + escapeHtml(eduRange) + '</span>';
          html += '</div>';
          if (institution) {
            html += '<div class="edu-inst-line">';
            html += '<span class="edu-institution">' + escapeHtml(institution) + '</span>';
            html += '</div>';
          }
          if (gpa) html += '<div class="edu-gpa">GPA: ' + escapeHtml(String(gpa)) + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      // ── Certifications ──
      if (certifications.length > 0) {
        html += '<div data-section="certifications">';
        html += sectionHeading(t.certifications);
        for (var ci = 0; ci < certifications.length; ci++) {
          var cert = certifications[ci];
          html += '<div class="cert-entry" data-entry-id="' + escapeHtml(safeStr(cert.id)) + '">';
          if (cert.name) html += '<div class="cert-name">' + escapeHtml(safeStr(cert.name)) + '</div>';
          if (cert.issuer) html += '<div class="cert-issuer">' + escapeHtml(safeStr(cert.issuer)) + '</div>';
          if (cert.date) html += '<div class="cert-date">' + escapeHtml(formatDate(cert.date, lang)) + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      // ── Languages ──
      if (languages.length > 0) {
        html += '<div data-section="languages">';
        html += sectionHeading(t.languages);
        html += '<div class="lang-grid">';
        var lMap = levelMap[lang] || levelMap.en;
        for (var li = 0; li < languages.length; li++) {
          var langItem = languages[li];
          var langLevel = safeStr(langItem.level || 'basic');
          var langLabel = lMap[langLevel] || langLevel;
          html += '<div class="lang-entry" data-entry-id="' + escapeHtml(safeStr(langItem.id)) + '">' +
            '<span class="lang-name">' + escapeHtml(safeStr(langItem.name)) + '</span>' +
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

  if (!customElements.get('gqr-resume-cobalt')) {
    customElements.define('gqr-resume-cobalt', GQRResumeCobalt);
  }
})();
