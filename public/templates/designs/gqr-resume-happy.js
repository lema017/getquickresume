/**
 * name: gqr-resume-happy
 * description: "Vibrant single-column resume with colorful left border stripes, warm peach header, circular section icons, dot-rated languages, inline skill badges, and a cheerful modern palette."
 */

(function() {
  'use strict';

  var peach = '#f5d5b8';
  var teal = '#2a8c82';
  var orange = '#e8833a';
  var darkText = '#222';

  const i18n = {
    es: {
      profile: "Perfil", experience: "Experiencia Profesional",
      education: "Educación", projects: "Proyectos", certifications: "Certificaciones",
      languages: "Idiomas", achievements: "Logros", skills: "Habilidades",
      present: "Presente",
      basic: "Básico", intermediate: "Intermedio", advanced: "Avanzado", native: "Nativo"
    },
    en: {
      profile: "Profile", experience: "Professional Experience",
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

  function levelDots(level) {
    var map = { basic: 2, intermediate: 3, advanced: 4, native: 5 };
    var filled = map[level] || 2;
    var dots = '';
    for (var i = 0; i < 5; i++) {
      dots += '<span class="dot' + (i < filled ? ' dot-f' : '') + '"></span>';
    }
    return dots;
  }

  var sectionIcons = {
    experience: '💼',
    education: '🎓',
    skills: '⚙',
    languages: '🌐',
    achievements: '🏆',
    projects: '📂',
    certifications: '📜'
  };

  class GQRResumeHappy extends HTMLElement {
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
        '  color: ' + darkText + ';' +
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

        /* ── Colorful left border ── */
        '.color-bar {' +
        '  width: 10px;' +
        '  flex-shrink: 0;' +
        '  background: linear-gradient(to bottom, #e8833a 0%, #e8833a 25%, #2a8c82 25%, #2a8c82 50%, #f0c040 50%, #f0c040 75%, #d94f4f 75%, #d94f4f 100%);' +
        '}' +

        '.content {' +
        '  flex: 1;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '}' +

        /* ── Header ── */
        '.header {' +
        '  background: ' + peach + ';' +
        '  padding: 26px 32px 20px;' +
        '}' +
        '.header-name {' +
        '  font-size: 26px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '  line-height: 1.2;' +
        '}' +
        '.header-profession {' +
        '  font-size: 14px;' +
        '  font-weight: 600;' +
        '  color: #555;' +
        '  margin-top: 2px;' +
        '}' +
        '.header-contact {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 4px 14px;' +
        '  margin-top: 8px;' +
        '  font-size: 11px;' +
        '  color: #444;' +
        '}' +
        '.hc-item {' +
        '  display: flex;' +
        '  align-items: center;' +
        '  gap: 4px;' +
        '}' +
        '.hc-icon { font-size: 10px; color: ' + teal + '; }' +

        /* ── Summary under header ── */
        '.summary-block {' +
        '  background: ' + peach + ';' +
        '  padding: 0 32px 20px;' +
        '}' +
        '.summary-text {' +
        '  font-size: 11.5px;' +
        '  line-height: 1.6;' +
        '  color: #444;' +
        '}' +

        /* ── Body ── */
        '.body {' +
        '  padding: 20px 32px 32px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 18px;' +
        '  text-align: left;' +
        '}' +

        /* ── Section heading ── */
        '.sec-heading {' +
        '  display: flex;' +
        '  align-items: center;' +
        '  gap: 8px;' +
        '  margin-bottom: 10px;' +
        '}' +
        '.sec-icon {' +
        '  display: flex;' +
        '  align-items: center;' +
        '  justify-content: center;' +
        '  width: 24px;' +
        '  height: 24px;' +
        '  border-radius: 50%;' +
        '  background: ' + teal + ';' +
        '  font-size: 11px;' +
        '  color: #fff;' +
        '  flex-shrink: 0;' +
        '}' +
        '.sec-title {' +
        '  font-size: 13px;' +
        '  font-weight: 700;' +
        '  text-transform: uppercase;' +
        '  letter-spacing: 1.4px;' +
        '  color: ' + darkText + ';' +
        '}' +

        /* Skills – inline badges */
        '.skills-wrap {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 6px;' +
        '  align-items: center;' +
        '}' +
        '.skill-badge {' +
        '  display: inline-block;' +
        '  background: ' + darkText + ';' +
        '  color: #fff;' +
        '  font-size: 10.5px;' +
        '  font-weight: 500;' +
        '  padding: 3px 12px;' +
        '  border-radius: 14px;' +
        '  white-space: nowrap;' +
        '}' +
        '.skill-sep {' +
        '  color: #bbb;' +
        '  font-size: 8px;' +
        '}' +

        /* Experience */
        '.exp-entry { margin-bottom: 14px; text-align: left; }' +
        '.exp-entry:last-child { margin-bottom: 0; }' +
        '.exp-row {' +
        '  display: flex;' +
        '  gap: 16px;' +
        '}' +
        '.exp-left {' +
        '  flex: 0 0 110px;' +
        '  text-align: left;' +
        '}' +
        '.exp-date {' +
        '  font-size: 10.5px;' +
        '  color: #888;' +
        '  line-height: 1.4;' +
        '}' +
        '.exp-right { flex: 1; }' +
        '.exp-title-company {' +
        '  font-size: 12px;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.exp-company-bold { font-weight: 700; }' +
        '.exp-position { font-style: italic; color: #555; }' +
        '.exp-bullets { list-style: none; margin-top: 3px; }' +
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
        '  color: ' + orange + ';' +
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
        '  font-size: 11px;' +
        '  color: #444;' +
        '  line-height: 1.55;' +
        '  margin-top: 2px;' +
        '}' +
        '.proj-tech {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 4px;' +
        '  margin-top: 4px;' +
        '}' +
        '.tech-tag {' +
        '  background: #fef3e8;' +
        '  color: ' + orange + ';' +
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
        '  color: ' + darkText + ';' +
        '}' +
        '.ach-desc {' +
        '  font-size: 11px;' +
        '  color: #555;' +
        '  line-height: 1.55;' +
        '  margin-top: 1px;' +
        '}' +
        '.ach-year {' +
        '  font-size: 10px;' +
        '  color: #999;' +
        '}' +

        /* Education */
        '.edu-entry { margin-bottom: 10px; text-align: left; }' +
        '.edu-entry:last-child { margin-bottom: 0; }' +
        '.edu-row {' +
        '  display: flex;' +
        '  gap: 16px;' +
        '}' +
        '.edu-left {' +
        '  flex: 0 0 110px;' +
        '  text-align: left;' +
        '}' +
        '.edu-date {' +
        '  font-size: 10.5px;' +
        '  color: #888;' +
        '  line-height: 1.4;' +
        '}' +
        '.edu-right { flex: 1; }' +
        '.edu-degree {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.edu-institution {' +
        '  font-size: 11.5px;' +
        '  font-style: italic;' +
        '  color: #555;' +
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
        '  color: ' + darkText + ';' +
        '}' +
        '.cert-issuer {' +
        '  font-size: 11px;' +
        '  color: #555;' +
        '}' +
        '.cert-date {' +
        '  font-size: 10px;' +
        '  color: #999;' +
        '}' +

        /* Languages */
        '.lang-grid {' +
        '  display: grid;' +
        '  grid-template-columns: 1fr 1fr;' +
        '  gap: 8px 40px;' +
        '}' +
        '.lang-entry {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: center;' +
        '}' +
        '.lang-name {' +
        '  font-size: 12px;' +
        '  font-weight: 600;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.lang-dots { display: flex; gap: 4px; }' +
        '.dot {' +
        '  width: 8px; height: 8px; border-radius: 50%;' +
        '  background: #ddd;' +
        '}' +
        '.dot-f { background: ' + orange + '; }' +

        '@media print {' +
        '  .page { width: 210mm; min-height: 297mm; }' +
        '}' +
      '</style>';

      function secHeading(icon, label) {
        return '<div class="sec-heading">' +
          '<span class="sec-icon">' + icon + '</span>' +
          '<span class="sec-title">' + escapeHtml(label) + '</span>' +
          '</div>';
      }

      var html = styles + '<div class="page">';

      // Colorful left stripe bar
      html += '<div class="color-bar"></div>';

      html += '<div class="content">';

      // ── Header (Contact Info) ──
      html += '<div class="header" data-section="header">';
      if (fullName) html += '<div class="header-name">' + escapeHtml(fullName) + '</div>';
      if (profession) html += '<div class="header-profession">' + escapeHtml(profession) + '</div>';
      var cItems = [];
      if (country) cItems.push('<span class="hc-item"><span class="hc-icon">⚲</span>' + escapeHtml(country) + '</span>');
      if (phone) cItems.push('<span class="hc-item"><span class="hc-icon">☎</span>' + escapeHtml(phone) + '</span>');
      if (email) cItems.push('<span class="hc-item"><span class="hc-icon">✉</span>' + escapeHtml(email) + '</span>');
      if (linkedin) cItems.push('<span class="hc-item"><span class="hc-icon">🔗</span>' + escapeHtml(linkedin) + '</span>');
      if (cItems.length > 0) {
        html += '<div class="header-contact">' + cItems.join('') + '</div>';
      }
      html += '</div>';

      // Summary in peach band
      if (summary) {
        html += '<div class="summary-block" data-section="profile">';
        html += '<div class="summary-text">' + escapeHtml(summary) + '</div>';
        html += '</div>';
      }

      html += '<div class="body">';

      // 3. Skills
      if (skills.length > 0) {
        html += '<div data-section="skills">';
        html += secHeading(sectionIcons.skills, t.skills);
        html += '<div class="skills-wrap">';
        for (var si = 0; si < skills.length; si++) {
          if (si > 0) html += '<span class="skill-sep">•</span>';
          html += '<span class="skill-badge">' + escapeHtml(safeStr(skills[si])) + '</span>';
        }
        html += '</div>';
        html += '</div>';
      }

      // 4. Experience
      if (experience.length > 0) {
        html += '<div data-section="experience">';
        html += secHeading(sectionIcons.experience, t.experience);
        for (var ei = 0; ei < experience.length; ei++) {
          var exp = experience[ei];
          var position = safeStr(exp.title);
          var company = safeStr(exp.company);
          var expBullets = safeArr(exp.achievements).concat(safeArr(exp.responsibilities));
          var expRange = formatDateRange(safeStr(exp.startDate), safeStr(exp.endDate), exp.isCurrent || false, lang);

          html += '<div class="exp-entry" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          html += '<div class="exp-row">';
          html += '<div class="exp-left">';
          if (expRange) html += '<div class="exp-date">' + escapeHtml(expRange) + '</div>';
          html += '</div>';
          html += '<div class="exp-right">';
          html += '<div class="exp-title-company">';
          if (company) html += '<span class="exp-company-bold">' + escapeHtml(company) + '</span>';
          if (position) html += (company ? ', ' : '') + '<span class="exp-position">' + escapeHtml(position) + '</span>';
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
          html += '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      // 5. Projects
      if (projects.length > 0) {
        html += '<div data-section="projects">';
        html += secHeading(sectionIcons.projects, t.projects);
        for (var pi = 0; pi < projects.length; pi++) {
          var proj = projects[pi];
          html += '<div class="proj-entry" data-entry-id="' + escapeHtml(safeStr(proj.id)) + '">';
          html += '<div class="proj-name">' + escapeHtml(safeStr(proj.name)) + '</div>';
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

      // 6. Achievements
      if (achievements.length > 0) {
        html += '<div data-section="achievements">';
        html += secHeading(sectionIcons.achievements, t.achievements);
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

      // 7. Education
      if (education.length > 0) {
        html += '<div data-section="education">';
        html += secHeading(sectionIcons.education, t.education);
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
          html += '<div class="edu-left">';
          if (eduRange) html += '<div class="edu-date">' + escapeHtml(eduRange) + '</div>';
          html += '</div>';
          html += '<div class="edu-right">';
          if (degreeLine) html += '<div class="edu-degree">' + escapeHtml(degreeLine) + '</div>';
          if (institution) html += '<div class="edu-institution">' + escapeHtml(institution) + '</div>';
          if (gpa) html += '<div class="edu-gpa">GPA: ' + escapeHtml(String(gpa)) + '</div>';
          html += '</div>';
          html += '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      // 8. Certifications
      if (certifications.length > 0) {
        html += '<div data-section="certifications">';
        html += secHeading(sectionIcons.certifications, t.certifications);
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

      // 9. Languages
      if (languages.length > 0) {
        html += '<div data-section="languages">';
        html += secHeading(sectionIcons.languages, t.languages);
        html += '<div class="lang-grid">';
        var lMap = levelMap[lang] || levelMap.en;
        for (var li = 0; li < languages.length; li++) {
          var langItem = languages[li];
          var langLevel = safeStr(langItem.level || 'basic');
          html += '<div class="lang-entry" data-entry-id="' + escapeHtml(safeStr(langItem.id)) + '">' +
            '<span class="lang-name">' + escapeHtml(safeStr(langItem.name)) + '</span>' +
            '<span class="lang-dots">' + levelDots(langLevel) + '</span>' +
            '</div>';
        }
        html += '</div>';
        html += '</div>';
      }

      html += '</div>'; // .body
      html += '</div>'; // .content
      html += '</div>'; // .page

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = html;
      }
    }
  }

  if (!customElements.get('gqr-resume-happy')) {
    customElements.define('gqr-resume-happy', GQRResumeHappy);
  }
})();
