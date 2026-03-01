/**
 * name: gqr-resume-darkbg
 * description: "Dark background single-column resume with navy/charcoal body, teal accent section headings, two-column skills grid, and light text throughout."
 */

(function() {
  'use strict';

  var bg = '#1a1f2e';
  var teal = '#3ec9b0';
  var lightText = 'rgba(255,255,255,0.9)';
  var dimText = 'rgba(255,255,255,0.6)';

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
      languages: "Languages", achievements: "Prizes", skills: "Skills",
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

  class GQRResumeDarkbg extends HTMLElement {
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
        '  color: ' + lightText + ';' +
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
        '  background: ' + bg + ';' +
        '  padding: 32px 36px 36px;' +
        '}' +

        /* ── Header ── */
        '.header { margin-bottom: 6px; }' +
        '.header-name-line {' +
        '  display: flex;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '  gap: 12px;' +
        '}' +
        '.h-name {' +
        '  font-size: 26px;' +
        '  font-weight: 700;' +
        '  color: #fff;' +
        '  line-height: 1.2;' +
        '}' +
        '.h-profession {' +
        '  font-family: Georgia, "Times New Roman", serif;' +
        '  font-size: 16px;' +
        '  font-style: italic;' +
        '  font-weight: 400;' +
        '  color: ' + dimText + ';' +
        '}' +
        '.header-contact {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 4px 16px;' +
        '  margin-top: 8px;' +
        '  font-size: 10.5px;' +
        '  color: ' + dimText + ';' +
        '}' +
        '.hc-item { white-space: nowrap; }' +
        '.hc-icon { color: ' + teal + '; margin-right: 4px; font-size: 9px; }' +

        /* ── Section title ── */
        '.sec-title {' +
        '  font-family: Georgia, "Times New Roman", serif;' +
        '  font-size: 16px;' +
        '  font-style: italic;' +
        '  font-weight: 400;' +
        '  color: ' + teal + ';' +
        '  margin-bottom: 10px;' +
        '}' +

        /* ── Sections ── */
        '.sections {' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 20px;' +
        '  text-align: left;' +
        '}' +

        /* Profile */
        '.profile-text {' +
        '  font-size: 11.5px;' +
        '  line-height: 1.6;' +
        '  color: ' + dimText + ';' +
        '}' +

        /* Skills – two-column grid */
        '.skills-grid {' +
        '  display: grid;' +
        '  grid-template-columns: 1fr 1fr;' +
        '  gap: 10px 28px;' +
        '}' +
        '.skill-card {}' +
        '.skill-name {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: #fff;' +
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
        '.exp-company {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: #fff;' +
        '}' +
        '.exp-position {' +
        '  font-size: 11.5px;' +
        '  font-style: italic;' +
        '  color: ' + dimText + ';' +
        '}' +
        '.exp-meta {' +
        '  font-size: 10.5px;' +
        '  color: ' + dimText + ';' +
        '  white-space: nowrap;' +
        '  text-align: right;' +
        '}' +
        '.exp-bullets { list-style: none; margin-top: 4px; }' +
        '.exp-bullet {' +
        '  font-size: 11px;' +
        '  line-height: 1.55;' +
        '  color: ' + lightText + ';' +
        '  padding-left: 13px;' +
        '  position: relative;' +
        '  margin-bottom: 1px;' +
        '}' +
        '.exp-bullet::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: ' + teal + ';' +
        '}' +

        /* Projects */
        '.proj-entry { margin-bottom: 10px; text-align: left; }' +
        '.proj-entry:last-child { margin-bottom: 0; }' +
        '.proj-name {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: #fff;' +
        '}' +
        '.proj-desc {' +
        '  font-size: 11px;' +
        '  color: ' + lightText + ';' +
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
        '  background: rgba(62,201,176,0.15);' +
        '  color: ' + teal + ';' +
        '  font-size: 10px;' +
        '  padding: 1px 8px;' +
        '  border-radius: 3px;' +
        '}' +

        /* Achievements / Prizes */
        '.ach-entry { margin-bottom: 10px; text-align: left; }' +
        '.ach-entry:last-child { margin-bottom: 0; }' +
        '.ach-top {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '}' +
        '.ach-title {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: ' + teal + ';' +
        '}' +
        '.ach-year {' +
        '  font-size: 10.5px;' +
        '  color: ' + dimText + ';' +
        '}' +
        '.ach-desc {' +
        '  font-size: 11px;' +
        '  color: ' + lightText + ';' +
        '  line-height: 1.55;' +
        '  margin-top: 1px;' +
        '}' +

        /* Education */
        '.edu-entry { margin-bottom: 10px; text-align: left; }' +
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
        '  color: #fff;' +
        '}' +
        '.edu-meta {' +
        '  font-size: 10.5px;' +
        '  color: ' + dimText + ';' +
        '  white-space: nowrap;' +
        '  text-align: right;' +
        '}' +
        '.edu-institution {' +
        '  font-size: 11.5px;' +
        '  font-style: italic;' +
        '  color: ' + dimText + ';' +
        '}' +
        '.edu-gpa {' +
        '  font-size: 10px;' +
        '  color: ' + dimText + ';' +
        '}' +

        /* Certifications */
        '.cert-entry { margin-bottom: 6px; text-align: left; }' +
        '.cert-entry:last-child { margin-bottom: 0; }' +
        '.cert-name {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: #fff;' +
        '}' +
        '.cert-detail {' +
        '  font-size: 11px;' +
        '  color: ' + dimText + ';' +
        '}' +

        /* Languages */
        '.lang-list {' +
        '  font-size: 11.5px;' +
        '  color: ' + lightText + ';' +
        '  line-height: 1.6;' +
        '}' +
        '.lang-name { font-weight: 700; color: #fff; }' +
        '.lang-level { color: ' + dimText + '; font-style: italic; }' +

        '@media print {' +
        '  .page { width: 210mm; min-height: 297mm; }' +
        '}' +
      '</style>';

      var html = styles + '<div class="page">';

      // ── Header (Contact Info) ──
      html += '<div class="header" data-section="header">';
      html += '<div class="header-name-line">';
      if (fullName) html += '<span class="h-name">' + escapeHtml(fullName) + '</span>';
      if (profession) html += '<span class="h-profession">' + escapeHtml(profession) + '</span>';
      html += '</div>';
      var cItems = [];
      if (country) cItems.push('<span class="hc-item"><span class="hc-icon">⚲</span>' + escapeHtml(country) + '</span>');
      if (email) cItems.push('<span class="hc-item"><span class="hc-icon">✉</span>' + escapeHtml(email) + '</span>');
      if (phone) cItems.push('<span class="hc-item"><span class="hc-icon">☎</span>' + escapeHtml(phone) + '</span>');
      if (linkedin) cItems.push('<span class="hc-item"><span class="hc-icon">🔗</span>' + escapeHtml(linkedin) + '</span>');
      if (cItems.length > 0) {
        html += '<div class="header-contact">' + cItems.join('') + '</div>';
      }
      html += '</div>';

      html += '<div class="sections">';

      // 2. Profile
      if (summary) {
        html += '<div data-section="profile">';
        html += '<div class="profile-text">' + escapeHtml(summary) + '</div>';
        html += '</div>';
      }

      // 3. Skills
      if (skills.length > 0) {
        html += '<div data-section="skills">';
        html += '<div class="sec-title">' + escapeHtml(t.skills) + '</div>';
        html += '<div class="skills-grid">';
        for (var si = 0; si < skills.length; si++) {
          html += '<div class="skill-card" data-entry-id="skill-' + si + '"><span class="skill-name">' + escapeHtml(safeStr(skills[si])) + '</span></div>';
        }
        html += '</div>';
        html += '</div>';
      }

      // 4. Experience
      if (experience.length > 0) {
        html += '<div data-section="experience">';
        html += '<div class="sec-title">' + escapeHtml(t.experience) + '</div>';
        for (var ei = 0; ei < experience.length; ei++) {
          var exp = experience[ei];
          var position = safeStr(exp.title);
          var company = safeStr(exp.company);
          var expBullets = safeArr(exp.achievements).concat(safeArr(exp.responsibilities));
          var expRange = formatDateRange(safeStr(exp.startDate), safeStr(exp.endDate), exp.isCurrent || false, lang);

          html += '<div class="exp-entry" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          html += '<div class="exp-top">';
          html += '<span>';
          if (company) html += '<span class="exp-company">' + escapeHtml(company) + '</span>';
          if (position) html += (company ? ', ' : '') + '<span class="exp-position">' + escapeHtml(position) + '</span>';
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

      // 5. Projects
      if (projects.length > 0) {
        html += '<div data-section="projects">';
        html += '<div class="sec-title">' + escapeHtml(t.projects) + '</div>';
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

      // 6. Achievements / Prizes
      if (achievements.length > 0) {
        html += '<div data-section="achievements">';
        html += '<div class="sec-title">' + escapeHtml(t.achievements) + '</div>';
        for (var ai = 0; ai < achievements.length; ai++) {
          var ach = achievements[ai];
          html += '<div class="ach-entry" data-entry-id="' + escapeHtml(safeStr(ach.id)) + '">';
          html += '<div class="ach-top">';
          if (ach.title) html += '<span class="ach-title">' + escapeHtml(safeStr(ach.title)) + '</span>';
          if (ach.year) html += '<span class="ach-year">' + escapeHtml(String(ach.year)) + '</span>';
          html += '</div>';
          if (ach.description) html += '<div class="ach-desc">' + escapeHtml(safeStr(ach.description)) + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      // 7. Education
      if (education.length > 0) {
        html += '<div data-section="education">';
        html += '<div class="sec-title">' + escapeHtml(t.education) + '</div>';
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
          html += '<span>';
          if (institution) html += '<span class="edu-degree">' + escapeHtml(institution) + '</span>';
          if (degreeLine) html += (institution ? ', ' : '') + '<span class="edu-institution">' + escapeHtml(degreeLine) + '</span>';
          html += '</span>';
          if (eduRange) html += '<span class="edu-meta">' + escapeHtml(eduRange) + '</span>';
          html += '</div>';
          if (gpa) html += '<div class="edu-gpa">GPA: ' + escapeHtml(String(gpa)) + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      // 8. Certifications
      if (certifications.length > 0) {
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

      // 9. Languages
      if (languages.length > 0) {
        html += '<div data-section="languages">';
        html += '<div class="sec-title">' + escapeHtml(t.languages) + '</div>';
        var lMap = levelMap[lang] || levelMap.en;
        var langParts = [];
        for (var li = 0; li < languages.length; li++) {
          var langItem = languages[li];
          var langLevel = safeStr(langItem.level || 'basic');
          var langLabel = lMap[langLevel] || langLevel;
          langParts.push('<span data-entry-id="' + escapeHtml(safeStr(langItem.id)) + '"><span class="lang-name">' + escapeHtml(safeStr(langItem.name)) + '</span> <span class="lang-level">(' + escapeHtml(langLabel) + ')</span></span>');
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

  if (!customElements.get('gqr-resume-darkbg')) {
    customElements.define('gqr-resume-darkbg', GQRResumeDarkbg);
  }
})();
