/**
 * name: gqr-resume-silver
 * description: "Clean minimalist single-column resume with light gray section bars, centered headings, two-column contact layout, and a warm neutral palette."
 */

(function() {
  'use strict';

  const i18n = {
    es: {
      profile: "Perfil", experience: "Experiencia Laboral",
      education: "Educación", projects: "Proyectos", certifications: "Certificaciones",
      languages: "Idiomas", achievements: "Logros", skills: "Habilidades",
      present: "Presente",
      basic: "Básico", intermediate: "Intermedio", advanced: "Avanzado", native: "Nativo"
    },
    en: {
      profile: "Profile", experience: "Work Experience",
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
      return date.getFullYear() + ' ' + months[date.getMonth()];
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

  class GQRResumeSilver extends HTMLElement {
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
        '  padding: 36px 40px 40px;' +
        '}' +

        /* ── Header ── */
        '.header {' +
        '  text-align: center;' +
        '  margin-bottom: 6px;' +
        '}' +
        '.header-name {' +
        '  font-size: 28px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '  line-height: 1.2;' +
        '}' +
        '.header-profession {' +
        '  font-size: 14px;' +
        '  font-weight: 400;' +
        '  color: #555;' +
        '  margin-top: 2px;' +
        '}' +
        '.header-contact {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  justify-content: center;' +
        '  gap: 6px 18px;' +
        '  margin-top: 10px;' +
        '  font-size: 11px;' +
        '  color: #555;' +
        '}' +
        '.header-contact-item {' +
        '  display: flex;' +
        '  align-items: center;' +
        '  gap: 5px;' +
        '}' +
        '.header-icon { font-size: 10px; color: #888; }' +

        /* ── Section bar ── */
        '.section-bar {' +
        '  background: #ededed;' +
        '  padding: 5px 0;' +
        '  text-align: center;' +
        '  margin-bottom: 12px;' +
        '}' +
        '.section-bar-text {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  letter-spacing: 0.8px;' +
        '  color: #333;' +
        '}' +

        /* ── Sections container ── */
        '.sections {' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 18px;' +
        '  text-align: left;' +
        '}' +

        /* Profile */
        '.profile-text {' +
        '  font-size: 11.5px;' +
        '  line-height: 1.65;' +
        '  color: #444;' +
        '  text-align: center;' +
        '}' +

        /* Skills – two-column bullet grid */
        '.skills-grid {' +
        '  display: grid;' +
        '  grid-template-columns: 1fr 1fr;' +
        '  gap: 5px 28px;' +
        '}' +
        '.skill-item {' +
        '  font-size: 11.5px;' +
        '  color: #444;' +
        '  padding-left: 13px;' +
        '  position: relative;' +
        '  line-height: 1.55;' +
        '}' +
        '.skill-item::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: #999;' +
        '}' +

        /* Experience */
        '.exp-entry { margin-bottom: 14px; text-align: left; }' +
        '.exp-entry:last-child { margin-bottom: 0; }' +
        '.exp-top {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '}' +
        '.exp-title-company {' +
        '  font-size: 12px;' +
        '  color: #1a1a1a;' +
        '}' +
        '.exp-title-bold {' +
        '  font-weight: 700;' +
        '}' +
        '.exp-company-text {' +
        '  font-weight: 400;' +
        '  color: #555;' +
        '}' +
        '.exp-meta {' +
        '  text-align: right;' +
        '  flex-shrink: 0;' +
        '}' +
        '.exp-date {' +
        '  font-size: 11px;' +
        '  color: #777;' +
        '  white-space: nowrap;' +
        '}' +
        '.exp-bullets { list-style: none; margin-top: 4px; }' +
        '.exp-bullet {' +
        '  font-size: 11.5px;' +
        '  line-height: 1.6;' +
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
        '.proj-entry { margin-bottom: 12px; text-align: left; }' +
        '.proj-entry:last-child { margin-bottom: 0; }' +
        '.proj-name {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.proj-desc {' +
        '  font-size: 11.5px;' +
        '  color: #444;' +
        '  line-height: 1.6;' +
        '  margin-top: 2px;' +
        '}' +
        '.proj-tech {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 4px;' +
        '  margin-top: 4px;' +
        '}' +
        '.tech-tag {' +
        '  background: #ededed;' +
        '  color: #555;' +
        '  font-size: 10px;' +
        '  padding: 1px 8px;' +
        '  border-radius: 3px;' +
        '}' +

        /* Achievements */
        '.ach-entry { margin-bottom: 8px; text-align: left; }' +
        '.ach-entry:last-child { margin-bottom: 0; }' +
        '.ach-title {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.ach-year {' +
        '  font-size: 10.5px;' +
        '  color: #888;' +
        '  margin-left: 4px;' +
        '}' +
        '.ach-desc {' +
        '  font-size: 11.5px;' +
        '  color: #555;' +
        '  line-height: 1.6;' +
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
        '.edu-institution {' +
        '  font-weight: 400;' +
        '  color: #555;' +
        '}' +
        '.edu-date {' +
        '  font-size: 11px;' +
        '  color: #777;' +
        '  white-space: nowrap;' +
        '}' +
        '.edu-gpa {' +
        '  font-size: 10.5px;' +
        '  color: #888;' +
        '  margin-top: 1px;' +
        '}' +

        /* Certifications */
        '.cert-entry { margin-bottom: 6px; text-align: left; }' +
        '.cert-entry:last-child { margin-bottom: 0; }' +
        '.cert-name {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.cert-issuer {' +
        '  font-size: 11px;' +
        '  color: #555;' +
        '}' +
        '.cert-date {' +
        '  font-size: 10.5px;' +
        '  color: #888;' +
        '}' +

        /* Languages – multi-column row */
        '.lang-row-wrap {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 6px 32px;' +
        '  text-align: left;' +
        '}' +
        '.lang-item {' +
        '  font-size: 11.5px;' +
        '  color: #444;' +
        '  padding-left: 13px;' +
        '  position: relative;' +
        '}' +
        '.lang-item::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: #999;' +
        '}' +

        /* Footer */
        '.footer {' +
        '  margin-top: auto;' +
        '  padding-top: 16px;' +
        '  border-top: 1px solid #ddd;' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  font-size: 10px;' +
        '  color: #aaa;' +
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
      if (country) cItems.push('<span class="header-contact-item"><span class="header-icon">⚲</span>' + escapeHtml(country) + '</span>');
      if (email) cItems.push('<span class="header-contact-item"><span class="header-icon">✉</span>' + escapeHtml(email) + '</span>');
      if (phone) cItems.push('<span class="header-contact-item"><span class="header-icon">☎</span>' + escapeHtml(phone) + '</span>');
      if (linkedin) cItems.push('<span class="header-contact-item"><span class="header-icon">🔗</span>' + escapeHtml(linkedin) + '</span>');
      if (cItems.length > 0) {
        html += '<div class="header-contact">' + cItems.join('') + '</div>';
      }
      html += '</div>';

      html += '<div class="sections">';

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
        html += '<div class="skills-grid">';
        for (var si = 0; si < skills.length; si++) {
          html += '<div class="skill-item" data-entry-id="skill-' + si + '">' + escapeHtml(safeStr(skills[si])) + '</div>';
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
          html += '<span class="exp-title-company"><span class="exp-title-bold">' + escapeHtml(position) + '</span>';
          if (company) html += '<span class="exp-company-text">, ' + escapeHtml(company) + '</span>';
          html += '</span>';
          if (expRange) {
            html += '<span class="exp-meta"><span class="exp-date">' + escapeHtml(expRange) + '</span></span>';
          }
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
          html += '<span class="proj-name">' + escapeHtml(safeStr(proj.name)) + '</span>';
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
          var degreeLine = degree + (field ? ' in ' + field : '');

          html += '<div class="edu-entry" data-entry-id="' + escapeHtml(safeStr(edu.id)) + '">';
          html += '<div class="edu-top">';
          html += '<span class="edu-degree">' + escapeHtml(degreeLine);
          if (institution) html += '<span class="edu-institution">, ' + escapeHtml(institution) + '</span>';
          html += '</span>';
          if (eduRange) html += '<span class="edu-date">' + escapeHtml(eduRange) + '</span>';
          html += '</div>';
          if (gpa) html += '<div class="edu-gpa">GPA: ' + escapeHtml(String(gpa)) + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      // ── Certifications ──
      if (certifications.length > 0) {
        html += '<div data-section="certifications">';
        html += sectionBar(t.certifications);
        for (var cci = 0; cci < certifications.length; cci++) {
          var cert = certifications[cci];
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
        html += sectionBar(t.languages);
        html += '<div class="lang-row-wrap">';
        var lMap = levelMap[lang] || levelMap.en;
        for (var li = 0; li < languages.length; li++) {
          var langItem = languages[li];
          var langLevel = safeStr(langItem.level || 'basic');
          var langLabel = lMap[langLevel] || langLevel;
          html += '<span class="lang-item" data-entry-id="' + escapeHtml(safeStr(langItem.id)) + '">' +
            escapeHtml(safeStr(langItem.name)) +
            '</span>';
        }
        html += '</div>';
        html += '</div>';
      }

      html += '</div>'; // .sections

      // ── Footer ──
      if (email) {
        html += '<div class="footer">';
        html += '<span>' + escapeHtml(email) + '</span>';
        html += '</div>';
      }

      html += '</div>'; // .page

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = html;
      }
    }
  }

  if (!customElements.get('gqr-resume-silver')) {
    customElements.define('gqr-resume-silver', GQRResumeSilver);
  }
})();
