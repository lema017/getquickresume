/**
 * name: gqr-resume-designer
 * description: "Two-column resume with deep plum sidebar, dot-rated languages, skill progress bars, and clean modern typography."
 */

(function() {
  'use strict';

  var plum = '#4d2044';

  const i18n = {
    es: {
      profile: "Perfil", experience: "Experiencia Laboral",
      education: "Educación", projects: "Proyectos", certifications: "Certificaciones",
      languages: "Idiomas", achievements: "Logros", skills: "Habilidades",
      contact: "Contacto", present: "Presente",
      basic: "Básico", intermediate: "Intermedio", advanced: "Avanzado", native: "Nativo"
    },
    en: {
      profile: "Profile", experience: "Work Experience",
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
      return months[date.getMonth()] + ' ' + date.getFullYear();
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

  function skillBar(pct) {
    return '<div class="skill-bar-track"><div class="skill-bar-fill" style="width:' + pct + '%"></div></div>';
  }

  function levelDots(level) {
    var map = { basic: 2, intermediate: 3, advanced: 4, native: 5 };
    var filled = map[level] || 2;
    var dots = '';
    for (var i = 0; i < 5; i++) {
      dots += '<span class="dot' + (i < filled ? ' dot-filled' : '') + '"></span>';
    }
    return dots;
  }

  class GQRResumeDesigner extends HTMLElement {
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
        '  background: ' + plum + ';' +
        '  padding: 34px 22px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 24px;' +
        '  color: #fff;' +
        '}' +

        '.sidebar-section-title {' +
        '  font-size: 11px;' +
        '  font-weight: 700;' +
        '  text-transform: uppercase;' +
        '  letter-spacing: 1.8px;' +
        '  color: rgba(255,255,255,0.7);' +
        '  margin-bottom: 10px;' +
        '  padding-bottom: 5px;' +
        '  border-bottom: 1px solid rgba(255,255,255,0.2);' +
        '}' +

        /* Contact */
        '.contact-line {' +
        '  display: flex;' +
        '  align-items: flex-start;' +
        '  gap: 10px;' +
        '  font-size: 11px;' +
        '  color: rgba(255,255,255,0.9);' +
        '  margin-bottom: 7px;' +
        '  line-height: 1.4;' +
        '  word-break: break-all;' +
        '}' +
        '.contact-icon {' +
        '  flex-shrink: 0;' +
        '  width: 16px;' +
        '  height: 16px;' +
        '  display: flex;' +
        '  align-items: center;' +
        '  justify-content: center;' +
        '  font-size: 10px;' +
        '  background: rgba(255,255,255,0.15);' +
        '  border-radius: 50%;' +
        '  margin-top: 1px;' +
        '}' +

        /* Languages */
        '.lang-entry {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: center;' +
        '  margin-bottom: 8px;' +
        '}' +
        '.lang-name {' +
        '  font-size: 11.5px;' +
        '  font-weight: 500;' +
        '  color: #fff;' +
        '}' +
        '.lang-dots {' +
        '  display: flex;' +
        '  gap: 4px;' +
        '}' +
        '.dot {' +
        '  width: 8px;' +
        '  height: 8px;' +
        '  border-radius: 50%;' +
        '  background: rgba(255,255,255,0.2);' +
        '}' +
        '.dot-filled {' +
        '  background: #fff;' +
        '}' +

        /* Skills */
        '.skills-wrap {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 6px;' +
        '}' +
        '.skill-badge {' +
        '  display: inline-block;' +
        '  background: rgba(255,255,255,0.15);' +
        '  color: #fff;' +
        '  font-size: 10.5px;' +
        '  font-weight: 500;' +
        '  padding: 3px 11px;' +
        '  border-radius: 14px;' +
        '  border: 1px solid rgba(255,255,255,0.3);' +
        '  white-space: nowrap;' +
        '}' +

        /* ── Main ── */
        '.main {' +
        '  width: 65%;' +
        '  background: #fff;' +
        '  padding: 34px 30px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 20px;' +
        '}' +

        '.main-header { margin-bottom: 2px; }' +
        '.main-name {' +
        '  font-size: 26px;' +
        '  font-weight: 700;' +
        '  color: ' + plum + ';' +
        '  line-height: 1.2;' +
        '}' +
        '.main-profession {' +
        '  font-size: 13px;' +
        '  font-weight: 400;' +
        '  color: #777;' +
        '  margin-top: 2px;' +
        '}' +

        '.main-section-title {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  text-transform: uppercase;' +
        '  letter-spacing: 1.4px;' +
        '  color: ' + plum + ';' +
        '  margin-bottom: 10px;' +
        '  padding-bottom: 4px;' +
        '  border-bottom: 2px solid ' + plum + ';' +
        '}' +

        /* Profile */
        '.profile-text {' +
        '  font-size: 11.5px;' +
        '  line-height: 1.65;' +
        '  color: #444;' +
        '}' +

        /* Experience */
        '.exp-entry { margin-bottom: 14px; text-align: left; }' +
        '.exp-entry:last-child { margin-bottom: 0; }' +
        '.exp-title {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.exp-company {' +
        '  font-size: 11px;' +
        '  color: ' + plum + ';' +
        '  font-weight: 600;' +
        '}' +
        '.exp-date {' +
        '  font-size: 10.5px;' +
        '  color: #999;' +
        '  margin-top: 1px;' +
        '}' +
        '.exp-bullets { list-style: none; margin-top: 4px; }' +
        '.exp-bullet {' +
        '  font-size: 11.5px;' +
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
        '  color: ' + plum + ';' +
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
        '  background: #f3eef2;' +
        '  color: ' + plum + ';' +
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
        '  color: #999;' +
        '  margin-left: 4px;' +
        '}' +
        '.ach-desc {' +
        '  font-size: 11.5px;' +
        '  color: #555;' +
        '  line-height: 1.55;' +
        '  margin-top: 1px;' +
        '}' +

        /* Education */
        '.edu-entry { margin-bottom: 12px; text-align: left; }' +
        '.edu-entry:last-child { margin-bottom: 0; }' +
        '.edu-degree {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.edu-institution {' +
        '  font-size: 11.5px;' +
        '  color: ' + plum + ';' +
        '  font-weight: 600;' +
        '}' +
        '.edu-date {' +
        '  font-size: 10.5px;' +
        '  color: #999;' +
        '  margin-top: 1px;' +
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
        '  color: #999;' +
        '}' +

        '@media print {' +
        '  .page { width: 210mm; min-height: 297mm; }' +
        '}' +
      '</style>';

      /* ── Sidebar ── */
      var sidebarHtml = '';

      // 1. Contact
      if (hasContact) {
        sidebarHtml += '<div class="sidebar-section" data-section="contact">';
        sidebarHtml += '<div class="sidebar-section-title">' + escapeHtml(t.contact) + '</div>';
        if (email) sidebarHtml += '<div class="contact-line"><span class="contact-icon">✉</span><span>' + escapeHtml(email) + '</span></div>';
        if (phone) sidebarHtml += '<div class="contact-line"><span class="contact-icon">☎</span><span>' + escapeHtml(phone) + '</span></div>';
        if (country) sidebarHtml += '<div class="contact-line"><span class="contact-icon">⚲</span><span>' + escapeHtml(country) + '</span></div>';
        if (linkedin) {
          sidebarHtml += '<div class="contact-line"><span class="contact-icon">🔗</span><span>' + escapeHtml(linkedin) + '</span></div>';
        }
        sidebarHtml += '</div>';
      }

      // 2. Languages
      if (languages.length > 0) {
        sidebarHtml += '<div class="sidebar-section" data-section="languages">';
        sidebarHtml += '<div class="sidebar-section-title">' + escapeHtml(t.languages) + '</div>';
        for (var li = 0; li < languages.length; li++) {
          var langItem = languages[li];
          var langLevel = safeStr(langItem.level || 'basic');
          sidebarHtml += '<div class="lang-entry" data-entry-id="' + escapeHtml(safeStr(langItem.id)) + '">' +
            '<span class="lang-name">' + escapeHtml(safeStr(langItem.name)) + '</span>' +
            '<span class="lang-dots">' + levelDots(langLevel) + '</span>' +
            '</div>';
        }
        sidebarHtml += '</div>';
      }

      // 3. Skills
      if (skills.length > 0) {
        sidebarHtml += '<div class="sidebar-section" data-section="skills">';
        sidebarHtml += '<div class="sidebar-section-title">' + escapeHtml(t.skills) + '</div>';
        sidebarHtml += '<div class="skills-wrap">';
        for (var si = 0; si < skills.length; si++) {
          sidebarHtml += '<span class="skill-badge">' + escapeHtml(safeStr(skills[si])) + '</span>';
        }
        sidebarHtml += '</div>';
        sidebarHtml += '</div>';
      }

      /* ── Main ── */
      var mainHtml = '';

      // Header
      mainHtml += '<div class="main-header" data-section="header">';
      if (fullName) mainHtml += '<div class="main-name">' + escapeHtml(fullName) + '</div>';
      if (profession) mainHtml += '<div class="main-profession">' + escapeHtml(profession) + '</div>';
      mainHtml += '</div>';

      // Profile
      if (summary) {
        mainHtml += '<div data-section="profile">';
        mainHtml += '<div class="main-section-title">' + escapeHtml(t.profile) + '</div>';
        mainHtml += '<div class="profile-text">' + escapeHtml(summary) + '</div>';
        mainHtml += '</div>';
      }

      // Experience
      if (experience.length > 0) {
        mainHtml += '<div data-section="experience">';
        mainHtml += '<div class="main-section-title">' + escapeHtml(t.experience) + '</div>';
        for (var ei = 0; ei < experience.length; ei++) {
          var exp = experience[ei];
          var position = safeStr(exp.title);
          var company = safeStr(exp.company);
          var expBullets = safeArr(exp.achievements).concat(safeArr(exp.responsibilities));
          var expRange = formatDateRange(safeStr(exp.startDate), safeStr(exp.endDate), exp.isCurrent || false, lang);

          mainHtml += '<div class="exp-entry" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          if (position) mainHtml += '<div class="exp-title">' + escapeHtml(position) + '</div>';
          if (company) mainHtml += '<div class="exp-company">' + escapeHtml(company) + '</div>';
          if (expRange) mainHtml += '<div class="exp-date">' + escapeHtml(expRange) + '</div>';

          if (expBullets.length > 0) {
            mainHtml += '<ul class="exp-bullets">';
            for (var bi = 0; bi < expBullets.length; bi++) {
              var txt = safeStr(expBullets[bi]);
              if (txt) mainHtml += '<li class="exp-bullet">' + escapeHtml(txt) + '</li>';
            }
            mainHtml += '</ul>';
          }
          mainHtml += '</div>';
        }
        mainHtml += '</div>';
      }

      // Projects
      if (projects.length > 0) {
        mainHtml += '<div data-section="projects">';
        mainHtml += '<div class="main-section-title">' + escapeHtml(t.projects) + '</div>';
        for (var pi = 0; pi < projects.length; pi++) {
          var proj = projects[pi];
          mainHtml += '<div class="proj-entry" data-entry-id="' + escapeHtml(safeStr(proj.id)) + '">';
          mainHtml += '<div class="proj-name">' + escapeHtml(safeStr(proj.name)) + '</div>';
          if (proj.description) mainHtml += '<div class="proj-desc">' + escapeHtml(safeStr(proj.description)) + '</div>';
          if (safeArr(proj.technologies).length > 0) {
            mainHtml += '<div class="proj-tech">';
            var techs = safeArr(proj.technologies);
            for (var ti = 0; ti < techs.length; ti++) {
              mainHtml += '<span class="tech-tag">' + escapeHtml(safeStr(techs[ti])) + '</span>';
            }
            mainHtml += '</div>';
          }
          mainHtml += '</div>';
        }
        mainHtml += '</div>';
      }

      // Achievements
      if (achievements.length > 0) {
        mainHtml += '<div data-section="achievements">';
        mainHtml += '<div class="main-section-title">' + escapeHtml(t.achievements) + '</div>';
        for (var ai = 0; ai < achievements.length; ai++) {
          var ach = achievements[ai];
          mainHtml += '<div class="ach-entry" data-entry-id="' + escapeHtml(safeStr(ach.id)) + '">';
          mainHtml += '<span class="ach-title">' + escapeHtml(safeStr(ach.title)) + '</span>';
          if (ach.year) mainHtml += '<span class="ach-year">(' + escapeHtml(String(ach.year)) + ')</span>';
          if (ach.description) mainHtml += '<div class="ach-desc">' + escapeHtml(safeStr(ach.description)) + '</div>';
          mainHtml += '</div>';
        }
        mainHtml += '</div>';
      }

      // Education
      if (education.length > 0) {
        mainHtml += '<div data-section="education">';
        mainHtml += '<div class="main-section-title">' + escapeHtml(t.education) + '</div>';
        for (var edi = 0; edi < education.length; edi++) {
          var edu = education[edi];
          var degree = safeStr(edu.degree);
          var field = safeStr(edu.field);
          var institution = safeStr(edu.institution);
          var gpa = edu.gpa;
          var eduRange = formatDateRange(safeStr(edu.startDate), safeStr(edu.endDate), edu.isCompleted === false, lang);
          var degreeLine = degree + (field ? ' in ' + field : '');

          mainHtml += '<div class="edu-entry" data-entry-id="' + escapeHtml(safeStr(edu.id)) + '">';
          if (degreeLine) mainHtml += '<div class="edu-degree">' + escapeHtml(degreeLine) + '</div>';
          if (institution) mainHtml += '<div class="edu-institution">' + escapeHtml(institution) + '</div>';
          if (eduRange) mainHtml += '<div class="edu-date">' + escapeHtml(eduRange) + '</div>';
          if (gpa) mainHtml += '<div class="edu-gpa">GPA: ' + escapeHtml(String(gpa)) + '</div>';
          mainHtml += '</div>';
        }
        mainHtml += '</div>';
      }

      // Certifications
      if (certifications.length > 0) {
        mainHtml += '<div data-section="certifications">';
        mainHtml += '<div class="main-section-title">' + escapeHtml(t.certifications) + '</div>';
        for (var cci = 0; cci < certifications.length; cci++) {
          var cert = certifications[cci];
          mainHtml += '<div class="cert-entry" data-entry-id="' + escapeHtml(safeStr(cert.id)) + '">';
          if (cert.name) mainHtml += '<div class="cert-name">' + escapeHtml(safeStr(cert.name)) + '</div>';
          if (cert.issuer) mainHtml += '<div class="cert-issuer">' + escapeHtml(safeStr(cert.issuer)) + '</div>';
          if (cert.date) mainHtml += '<div class="cert-date">' + escapeHtml(formatDate(cert.date, lang)) + '</div>';
          mainHtml += '</div>';
        }
        mainHtml += '</div>';
      }

      /* ── Assemble ── */
      var html = styles +
        '<div class="page">' +
        '<div class="sidebar">' + sidebarHtml + '</div>' +
        '<div class="main">' + mainHtml + '</div>' +
        '</div>';

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = html;
      }
    }
  }

  if (!customElements.get('gqr-resume-designer')) {
    customElements.define('gqr-resume-designer', GQRResumeDesigner);
  }
})();
