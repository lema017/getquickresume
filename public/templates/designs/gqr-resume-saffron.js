/**
 * name: gqr-resume-saffron
 * description: "Two-column resume with warm gray sidebar, saffron/golden accent markers on section headings, categorized skills, and clean sans-serif typography."
 */

(function() {
  'use strict';

  const i18n = {
    es: {
      summary: "Resumen", profile: "Perfil", experience: "Experiencia Laboral",
      education: "Educación", projects: "Proyectos", certifications: "Certificaciones",
      languages: "Idiomas", achievements: "Logros", skills: "Habilidades",
      contact: "Contacto", current: "Actual", present: "Presente",
      basic: "Básico", intermediate: "Intermedio", advanced: "Avanzado", native: "Nativo"
    },
    en: {
      summary: "Summary", profile: "Profile", experience: "Work Experience",
      education: "Education", projects: "Projects", certifications: "Certifications",
      languages: "Languages", achievements: "Achievements", skills: "Skills",
      contact: "Contact", current: "Current", present: "Present",
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
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      const monthNames = {
        es: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      };
      const months = monthNames[lang] || monthNames.en;
      return months[date.getMonth()] + ' ' + date.getFullYear();
    } catch { return dateStr; }
  }

  function formatDateRange(startDate, endDate, isCurrent, lang) {
    const start = formatDate(startDate, lang);
    if (!endDate && !isCurrent) return start;
    const end = isCurrent ? (i18n[lang]?.present || 'Present') : formatDate(endDate, lang);
    return start + ' – ' + end;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function levelDots(level) {
    const map = { basic: 2, intermediate: 3, advanced: 4, native: 5 };
    const filled = map[level] || 2;
    return '●'.repeat(filled) + '○'.repeat(5 - filled);
  }

  class GQRResumeSaffron extends HTMLElement {
    constructor() {
      super();
      this._data = null;
      this._shadowRootRef = null;
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
      const lang = this.getLanguage();
      const t = i18n[lang] || i18n.en;
      const data = this.data || {};

      const firstName = safeStr(data.firstName);
      const lastName = safeStr(data.lastName);
      const fullName = (firstName + ' ' + lastName).trim();
      const profession = safeStr(data.profession);
      const country = safeStr(data.country);
      const summary = safeStr(data.summary);
      const email = safeStr(data.email);
      const phone = safeStr(data.phone);
      const linkedin = safeStr(data.linkedin);

      const skillsRaw = safeArr(data.skillsRaw);
      const toolsRaw = data.toolsRaw ? safeArr(data.toolsRaw) : [];
      const skills = [...skillsRaw, ...toolsRaw.filter(function(t) { return !skillsRaw.includes(t); })];
      const experience = safeArr(data.experience);
      const education = safeArr(data.education);
      const projects = safeArr(data.projects);
      const certifications = safeArr(data.certifications);
      const languages = safeArr(data.languages);
      const achievements = safeArr(data.achievements);

      const hasContact = email || phone || country || linkedin;

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
        '  background: #f3ede6;' +
        '  padding: 36px 22px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 22px;' +
        '}' +

        '.sidebar-section-title {' +
        '  display: flex;' +
        '  align-items: center;' +
        '  gap: 8px;' +
        '  margin-bottom: 10px;' +
        '}' +
        '.sidebar-section-title::before {' +
        '  content: "";' +
        '  display: inline-block;' +
        '  width: 10px;' +
        '  height: 10px;' +
        '  background: #d4930d;' +
        '  border-radius: 2px;' +
        '  flex-shrink: 0;' +
        '}' +
        '.sidebar-section-title-text {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  text-transform: uppercase;' +
        '  letter-spacing: 1.4px;' +
        '  color: #222;' +
        '}' +

        /* Contact */
        '.contact-line {' +
        '  display: flex;' +
        '  align-items: flex-start;' +
        '  gap: 8px;' +
        '  font-size: 11.5px;' +
        '  color: #444;' +
        '  margin-bottom: 6px;' +
        '  line-height: 1.4;' +
        '  word-break: break-all;' +
        '}' +
        '.contact-icon {' +
        '  flex-shrink: 0;' +
        '  width: 14px;' +
        '  text-align: center;' +
        '  color: #d4930d;' +
        '  margin-top: 1px;' +
        '}' +

        /* Languages */
        '.lang-entry {' +
        '  margin-bottom: 6px;' +
        '}' +
        '.lang-name {' +
        '  font-size: 12px;' +
        '  font-weight: 600;' +
        '  color: #222;' +
        '}' +
        '.lang-level {' +
        '  font-size: 11px;' +
        '  color: #666;' +
        '  font-style: italic;' +
        '}' +
        '.lang-dots {' +
        '  font-size: 11px;' +
        '  letter-spacing: 2px;' +
        '  color: #d4930d;' +
        '  margin-left: 4px;' +
        '}' +

        /* Skills */
        '.skill-item {' +
        '  font-size: 11.5px;' +
        '  color: #444;' +
        '  padding-left: 14px;' +
        '  position: relative;' +
        '  line-height: 1.55;' +
        '  margin-bottom: 1px;' +
        '}' +
        '.skill-item::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: #d4930d;' +
        '}' +

        /* ── Main area ── */
        '.main {' +
        '  width: 65%;' +
        '  background: #fff;' +
        '  padding: 36px 30px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 20px;' +
        '}' +

        '.main-header { margin-bottom: 2px; }' +
        '.main-name-line {' +
        '  display: flex;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '  gap: 10px;' +
        '}' +
        '.main-first-name {' +
        '  font-size: 26px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '  line-height: 1.2;' +
        '}' +
        '.main-last-name {' +
        '  font-size: 26px;' +
        '  font-weight: 400;' +
        '  color: #1a1a1a;' +
        '  line-height: 1.2;' +
        '}' +
        '.main-profession {' +
        '  font-size: 13px;' +
        '  font-weight: 600;' +
        '  color: #d4930d;' +
        '  margin-top: 2px;' +
        '  letter-spacing: 0.3px;' +
        '}' +
        '.main-contact-row {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 5px 14px;' +
        '  font-size: 10.5px;' +
        '  color: #666;' +
        '  margin-top: 10px;' +
        '  padding-top: 8px;' +
        '  border-top: 2px solid #d4930d;' +
        '}' +
        '.main-contact-item { white-space: nowrap; }' +
        '.main-contact-icon { color: #d4930d; margin-right: 3px; font-size: 10px; }' +

        '.main-section-title {' +
        '  display: flex;' +
        '  align-items: center;' +
        '  gap: 8px;' +
        '  margin-bottom: 10px;' +
        '}' +
        '.main-section-title::before {' +
        '  content: "";' +
        '  display: inline-block;' +
        '  width: 10px;' +
        '  height: 10px;' +
        '  background: #d4930d;' +
        '  border-radius: 2px;' +
        '  flex-shrink: 0;' +
        '}' +
        '.main-section-title-text {' +
        '  font-size: 13px;' +
        '  font-weight: 700;' +
        '  text-transform: uppercase;' +
        '  letter-spacing: 1.2px;' +
        '  color: #222;' +
        '}' +

        /* Summary */
        '.summary-text {' +
        '  font-size: 12px;' +
        '  line-height: 1.65;' +
        '  color: #444;' +
        '}' +

        /* Experience */
        '.exp-entry { margin-bottom: 14px; }' +
        '.exp-entry:last-child { margin-bottom: 0; }' +
        '.exp-top-line {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '}' +
        '.exp-title {' +
        '  font-size: 12.5px;' +
        '  font-weight: 700;' +
        '  color: #222;' +
        '}' +
        '.exp-date {' +
        '  font-size: 11px;' +
        '  color: #888;' +
        '  white-space: nowrap;' +
        '}' +
        '.exp-company {' +
        '  font-size: 11.5px;' +
        '  color: #555;' +
        '  font-style: italic;' +
        '  margin-bottom: 4px;' +
        '}' +
        '.exp-bullets { list-style: none; margin-top: 4px; }' +
        '.exp-bullet {' +
        '  font-size: 11.5px;' +
        '  line-height: 1.55;' +
        '  color: #444;' +
        '  padding-left: 14px;' +
        '  position: relative;' +
        '  margin-bottom: 2px;' +
        '}' +
        '.exp-bullet::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: #d4930d;' +
        '}' +

        /* Projects */
        '.proj-entry { margin-bottom: 12px; }' +
        '.proj-entry:last-child { margin-bottom: 0; }' +
        '.proj-name {' +
        '  font-size: 12.5px;' +
        '  font-weight: 700;' +
        '  color: #222;' +
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
        '  margin-top: 5px;' +
        '}' +
        '.tech-tag {' +
        '  background: #fdf3e1;' +
        '  color: #8a6500;' +
        '  font-size: 10px;' +
        '  padding: 1px 7px;' +
        '  border-radius: 3px;' +
        '}' +
        '.proj-link {' +
        '  font-size: 10.5px;' +
        '  color: #d4930d;' +
        '  text-decoration: none;' +
        '  margin-left: 4px;' +
        '}' +
        '.proj-link:hover { text-decoration: underline; }' +
        '.proj-bullets { list-style: none; margin-top: 4px; }' +
        '.proj-bullets li {' +
        '  font-size: 11.5px;' +
        '  line-height: 1.55;' +
        '  color: #444;' +
        '  padding-left: 14px;' +
        '  position: relative;' +
        '  margin-bottom: 2px;' +
        '}' +
        '.proj-bullets li::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: #d4930d;' +
        '}' +

        /* Achievements */
        '.ach-entry { margin-bottom: 10px; }' +
        '.ach-entry:last-child { margin-bottom: 0; }' +
        '.ach-title {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: #222;' +
        '  display: inline;' +
        '}' +
        '.ach-year {' +
        '  font-size: 10.5px;' +
        '  color: #888;' +
        '  margin-left: 5px;' +
        '}' +
        '.ach-desc {' +
        '  font-size: 11.5px;' +
        '  color: #555;' +
        '  line-height: 1.55;' +
        '  margin-top: 1px;' +
        '}' +

        /* Education */
        '.edu-entry { margin-bottom: 12px; }' +
        '.edu-entry:last-child { margin-bottom: 0; }' +
        '.edu-degree {' +
        '  font-size: 12.5px;' +
        '  font-weight: 700;' +
        '  color: #222;' +
        '}' +
        '.edu-institution {' +
        '  font-size: 11.5px;' +
        '  color: #555;' +
        '  font-style: italic;' +
        '}' +
        '.edu-date {' +
        '  font-size: 11px;' +
        '  color: #888;' +
        '  margin-top: 1px;' +
        '}' +
        '.edu-gpa {' +
        '  font-size: 10.5px;' +
        '  color: #888;' +
        '  margin-top: 2px;' +
        '}' +

        /* Certifications */
        '.cert-entry { margin-bottom: 8px; }' +
        '.cert-entry:last-child { margin-bottom: 0; }' +
        '.cert-name {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: #222;' +
        '}' +
        '.cert-issuer {' +
        '  font-size: 11.5px;' +
        '  color: #555;' +
        '}' +
        '.cert-date {' +
        '  font-size: 10.5px;' +
        '  color: #888;' +
        '}' +

        '@media print {' +
        '  .page { width: 210mm; min-height: 297mm; }' +
        '}' +
      '</style>';

      /* ── Sidebar HTML ── */

      var sidebarHtml = '';

      // Sidebar section title helper
      function sidebarTitle(text) {
        return '<div class="sidebar-section-title"><span class="sidebar-section-title-text">' + escapeHtml(text) + '</span></div>';
      }

      // 1. Contact
      if (hasContact) {
        sidebarHtml += '<div class="sidebar-section" data-section="contact">';
        sidebarHtml += sidebarTitle(t.contact);
        if (email) {
          sidebarHtml += '<div class="contact-line"><span class="contact-icon">✉</span><span>' + escapeHtml(email) + '</span></div>';
        }
        if (phone) {
          sidebarHtml += '<div class="contact-line"><span class="contact-icon">☎</span><span>' + escapeHtml(phone) + '</span></div>';
        }
        if (country) {
          sidebarHtml += '<div class="contact-line"><span class="contact-icon">⚲</span><span>' + escapeHtml(country) + '</span></div>';
        }
        if (linkedin) {
          var linkedinUrl = linkedin.startsWith('http') ? linkedin : 'https://linkedin.com/in/' + linkedin;
          sidebarHtml += '<div class="contact-line"><span class="contact-icon">🔗</span><a href="' + escapeHtml(linkedinUrl) + '" style="color:#444;text-decoration:none;" target="_blank" rel="noopener">' + escapeHtml(linkedin) + '</a></div>';
        }
        sidebarHtml += '</div>';
      }

      // 2. Languages
      if (languages.length > 0) {
        sidebarHtml += '<div class="sidebar-section" data-section="languages">';
        sidebarHtml += sidebarTitle(t.languages);
        var lMap = levelMap[lang] || levelMap.en;
        for (var li = 0; li < languages.length; li++) {
          var langItem = languages[li];
          var langLevel = safeStr(langItem.level || 'basic');
          var langLabel = lMap[langLevel] || langLevel;
          sidebarHtml += '<div class="lang-entry" data-entry-id="' + escapeHtml(safeStr(langItem.id)) + '">' +
            '<span class="lang-name">' + escapeHtml(safeStr(langItem.name)) + '</span>' +
            '<span class="lang-dots">' + levelDots(langLevel) + '</span>' +
            '<br><span class="lang-level">' + escapeHtml(langLabel) + '</span>' +
            '</div>';
        }
        sidebarHtml += '</div>';
      }

      // 3. Skills
      if (skills.length > 0) {
        sidebarHtml += '<div class="sidebar-section" data-section="skills">';
        sidebarHtml += sidebarTitle(t.skills);
        for (var si = 0; si < skills.length; si++) {
          sidebarHtml += '<div class="skill-item">' + escapeHtml(safeStr(skills[si])) + '</div>';
        }
        sidebarHtml += '</div>';
      }

      /* ── Main HTML ── */

      var mainHtml = '';

      function mainTitle(text) {
        return '<div class="main-section-title"><span class="main-section-title-text">' + escapeHtml(text) + '</span></div>';
      }

      // Header
      if (fullName || profession) {
        mainHtml += '<div class="main-header" data-section="header">';
        if (fullName) {
          mainHtml += '<div class="main-name-line">';
          if (firstName) mainHtml += '<span class="main-first-name">' + escapeHtml(firstName) + '</span>';
          if (lastName) mainHtml += '<span class="main-last-name">' + escapeHtml(lastName) + '</span>';
          mainHtml += '</div>';
        }
        if (profession) mainHtml += '<div class="main-profession">' + escapeHtml(profession) + '</div>';

        var contactItems = [];
        if (email) contactItems.push('<span class="main-contact-item"><span class="main-contact-icon">✉</span>' + escapeHtml(email) + '</span>');
        if (phone) contactItems.push('<span class="main-contact-item"><span class="main-contact-icon">☎</span>' + escapeHtml(phone) + '</span>');
        if (country) contactItems.push('<span class="main-contact-item"><span class="main-contact-icon">⚲</span>' + escapeHtml(country) + '</span>');
        if (linkedin) contactItems.push('<span class="main-contact-item"><span class="main-contact-icon">🔗</span>' + escapeHtml(linkedin) + '</span>');
        if (contactItems.length > 0) {
          mainHtml += '<div class="main-contact-row">' + contactItems.join('') + '</div>';
        }
        mainHtml += '</div>';
      }

      // Profile
      if (summary) {
        mainHtml += '<div class="main-section" data-section="profile">';
        mainHtml += mainTitle(t.profile);
        mainHtml += '<div class="summary-text">' + escapeHtml(summary) + '</div>';
        mainHtml += '</div>';
      }

      // Experience
      if (experience.length > 0) {
        mainHtml += '<div class="main-section" data-section="experience">';
        mainHtml += mainTitle(t.experience);
        for (var ei = 0; ei < experience.length; ei++) {
          var exp = experience[ei];
          var position = safeStr(exp.title);
          var company = safeStr(exp.company);
          var expBullets = safeArr(exp.achievements).concat(safeArr(exp.responsibilities));
          var expRange = formatDateRange(safeStr(exp.startDate), safeStr(exp.endDate), exp.isCurrent || false, lang);

          mainHtml += '<div class="exp-entry" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          mainHtml += '<div class="exp-top-line">';
          if (position) mainHtml += '<span class="exp-title">' + escapeHtml(position) + '</span>';
          if (expRange) mainHtml += '<span class="exp-date">' + escapeHtml(expRange) + '</span>';
          mainHtml += '</div>';
          if (company) mainHtml += '<div class="exp-company">' + escapeHtml(company) + '</div>';

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
        mainHtml += '<div class="main-section" data-section="projects">';
        mainHtml += mainTitle(t.projects);
        for (var pi = 0; pi < projects.length; pi++) {
          var proj = projects[pi];
          var projName = safeStr(proj.name);
          var projDesc = safeStr(proj.description);
          var projTech = safeArr(proj.technologies);
          var projUrl = safeStr(proj.url);

          mainHtml += '<div class="proj-entry" data-entry-id="' + escapeHtml(safeStr(proj.id)) + '">';
          mainHtml += '<span class="proj-name">' + escapeHtml(projName) + '</span>';
          if (projUrl) mainHtml += '<a class="proj-link" href="' + escapeHtml(projUrl) + '" target="_blank" rel="noopener">🔗</a>';
          if (projDesc) mainHtml += '<div class="proj-desc">' + escapeHtml(projDesc) + '</div>';
          if (projTech.length > 0) {
            mainHtml += '<div class="proj-tech">';
            for (var ti = 0; ti < projTech.length; ti++) {
              mainHtml += '<span class="tech-tag">' + escapeHtml(safeStr(projTech[ti])) + '</span>';
            }
            mainHtml += '</div>';
          }
          mainHtml += '</div>';
        }
        mainHtml += '</div>';
      }

      // Achievements
      if (achievements.length > 0) {
        mainHtml += '<div class="main-section" data-section="achievements">';
        mainHtml += mainTitle(t.achievements);
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
        mainHtml += '<div class="main-section" data-section="education">';
        mainHtml += mainTitle(t.education);
        for (var edi = 0; edi < education.length; edi++) {
          var edu = education[edi];
          var degree = safeStr(edu.degree);
          var field = safeStr(edu.field);
          var institution = safeStr(edu.institution);
          var gpa = edu.gpa;
          var eduRange = formatDateRange(safeStr(edu.startDate), safeStr(edu.endDate), edu.isCompleted === false, lang);
          var degreeLine = degree + (field ? ' — ' + field : '');

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
        mainHtml += '<div class="main-section" data-section="certifications">';
        mainHtml += mainTitle(t.certifications);
        for (var ci = 0; ci < certifications.length; ci++) {
          var cert = certifications[ci];
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

  if (!customElements.get('gqr-resume-saffron')) {
    customElements.define('gqr-resume-saffron', GQRResumeSaffron);
  }
})();
