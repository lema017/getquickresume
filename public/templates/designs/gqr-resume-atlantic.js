/**
 * name: gqr-resume-atlantic
 * description: "Two-column resume with dark navy sidebar, coral/salmon accent icons and skill badges, dot-rated languages, and dashed-border section heading icons."
 */

(function() {
  'use strict';

  var navy = '#1c2b3a';
  var coral = '#e8726a';
  var coralLight = '#fdf0ef';

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
      languages: "Languages", achievements: "Awards", skills: "Skills",
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
    profile: '👤',
    experience: '💼',
    education: '🎓',
    skills: '⚙',
    contact: '✉',
    languages: '🌐',
    achievements: '🏆',
    projects: '📂',
    certifications: '📜'
  };

  class GQRResumeAtlantic extends HTMLElement {
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
        '  width: 36%;' +
        '  background: ' + navy + ';' +
        '  padding: 32px 22px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 22px;' +
        '  color: #fff;' +
        '}' +

        /* Sidebar section title */
        '.sb-sec-heading {' +
        '  display: flex;' +
        '  align-items: center;' +
        '  gap: 8px;' +
        '  margin-bottom: 10px;' +
        '}' +
        '.sb-icon {' +
        '  display: flex;' +
        '  align-items: center;' +
        '  justify-content: center;' +
        '  width: 22px;' +
        '  height: 22px;' +
        '  border-radius: 50%;' +
        '  border: 1.5px dashed ' + coral + ';' +
        '  font-size: 10px;' +
        '  color: ' + coral + ';' +
        '  flex-shrink: 0;' +
        '}' +
        '.sb-title {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  text-transform: uppercase;' +
        '  letter-spacing: 1.2px;' +
        '  color: #fff;' +
        '}' +

        /* Sidebar name header */
        '.sb-header { margin-bottom: 4px; }' +
        '.sb-name {' +
        '  font-size: 22px;' +
        '  font-weight: 700;' +
        '  color: #fff;' +
        '  line-height: 1.2;' +
        '}' +
        '.sb-profession {' +
        '  font-size: 12px;' +
        '  color: ' + coral + ';' +
        '  font-weight: 600;' +
        '  margin-top: 2px;' +
        '}' +

        /* Contact */
        '.contact-line {' +
        '  display: flex;' +
        '  align-items: flex-start;' +
        '  gap: 8px;' +
        '  font-size: 10.5px;' +
        '  color: rgba(255,255,255,0.85);' +
        '  margin-bottom: 6px;' +
        '  line-height: 1.4;' +
        '  word-break: break-all;' +
        '}' +
        '.c-icon {' +
        '  flex-shrink: 0;' +
        '  font-size: 10px;' +
        '  color: ' + coral + ';' +
        '  margin-top: 1px;' +
        '}' +

        /* Languages */
        '.lang-entry {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: center;' +
        '  margin-bottom: 7px;' +
        '}' +
        '.lang-name {' +
        '  font-size: 11.5px;' +
        '  font-weight: 500;' +
        '  color: #fff;' +
        '}' +
        '.lang-dots { display: flex; gap: 4px; }' +
        '.dot {' +
        '  width: 8px; height: 8px; border-radius: 50%;' +
        '  background: rgba(255,255,255,0.2);' +
        '}' +
        '.dot-f { background: ' + coral + '; }' +

        /* Skills (sidebar badges) */
        '.skills-wrap {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 6px;' +
        '}' +
        '.skill-badge {' +
        '  display: inline-block;' +
        '  background: ' + coral + ';' +
        '  color: #fff;' +
        '  font-size: 10px;' +
        '  font-weight: 600;' +
        '  padding: 4px 12px;' +
        '  border-radius: 14px;' +
        '  white-space: nowrap;' +
        '}' +

        /* ── Main ── */
        '.main {' +
        '  width: 64%;' +
        '  background: #fff;' +
        '  padding: 32px 28px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 18px;' +
        '}' +

        /* Main section heading */
        '.mn-sec-heading {' +
        '  display: flex;' +
        '  align-items: center;' +
        '  gap: 8px;' +
        '  margin-bottom: 10px;' +
        '}' +
        '.mn-icon {' +
        '  display: flex;' +
        '  align-items: center;' +
        '  justify-content: center;' +
        '  width: 24px;' +
        '  height: 24px;' +
        '  border-radius: 50%;' +
        '  border: 1.5px dashed ' + coral + ';' +
        '  font-size: 11px;' +
        '  color: ' + coral + ';' +
        '  flex-shrink: 0;' +
        '}' +
        '.mn-title {' +
        '  font-size: 13px;' +
        '  font-weight: 700;' +
        '  text-transform: uppercase;' +
        '  letter-spacing: 1.2px;' +
        '  color: ' + navy + ';' +
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
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  font-style: italic;' +
        '  color: #1a1a1a;' +
        '}' +
        '.exp-title {' +
        '  font-size: 11.5px;' +
        '  color: #555;' +
        '}' +
        '.exp-date {' +
        '  font-size: 10.5px;' +
        '  color: #999;' +
        '  margin-top: 1px;' +
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
        '  color: ' + coral + ';' +
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
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 4px;' +
        '  margin-top: 4px;' +
        '}' +
        '.tech-tag {' +
        '  background: ' + coralLight + ';' +
        '  color: ' + coral + ';' +
        '  font-size: 10px;' +
        '  padding: 1px 8px;' +
        '  border-radius: 3px;' +
        '}' +

        /* Achievements */
        '.ach-entry { margin-bottom: 10px; text-align: left; }' +
        '.ach-entry:last-child { margin-bottom: 0; }' +
        '.ach-title {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  font-style: italic;' +
        '  color: #1a1a1a;' +
        '}' +
        '.ach-desc {' +
        '  font-size: 11px;' +
        '  color: #555;' +
        '  line-height: 1.5;' +
        '  margin-top: 1px;' +
        '}' +
        '.ach-year {' +
        '  font-size: 10px;' +
        '  color: #999;' +
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
        '  font-style: italic;' +
        '  color: #555;' +
        '}' +
        '.edu-date {' +
        '  font-size: 10.5px;' +
        '  color: #999;' +
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
        '.cert-issuer {' +
        '  font-size: 11px;' +
        '  color: #555;' +
        '}' +
        '.cert-date {' +
        '  font-size: 10px;' +
        '  color: #999;' +
        '}' +

        '@media print {' +
        '  .page { width: 210mm; min-height: 297mm; }' +
        '}' +
      '</style>';

      function sbHeading(icon, label) {
        return '<div class="sb-sec-heading">' +
          '<span class="sb-icon">' + icon + '</span>' +
          '<span class="sb-title">' + escapeHtml(label) + '</span>' +
          '</div>';
      }

      function mnHeading(icon, label) {
        return '<div class="mn-sec-heading">' +
          '<span class="mn-icon">' + icon + '</span>' +
          '<span class="mn-title">' + escapeHtml(label) + '</span>' +
          '</div>';
      }

      var html = styles + '<div class="page">';

      /* ═══ SIDEBAR ═══ */
      html += '<div class="sidebar">';

      // Name + Profession (in sidebar header)
      html += '<div class="sb-header" data-section="header">';
      if (fullName) html += '<div class="sb-name">' + escapeHtml(fullName) + '</div>';
      if (profession) html += '<div class="sb-profession">' + escapeHtml(profession) + '</div>';
      html += '</div>';

      // 1. Contact
      if (hasContact) {
        html += '<div data-section="contact">';
        if (email) html += '<div class="contact-line"><span class="c-icon">✉</span><span>' + escapeHtml(email) + '</span></div>';
        if (phone) html += '<div class="contact-line"><span class="c-icon">☎</span><span>' + escapeHtml(phone) + '</span></div>';
        if (country) html += '<div class="contact-line"><span class="c-icon">⚲</span><span>' + escapeHtml(country) + '</span></div>';
        if (linkedin) html += '<div class="contact-line"><span class="c-icon">🔗</span><span>' + escapeHtml(linkedin) + '</span></div>';
        html += '</div>';
      }

      // 2. Languages
      if (languages.length > 0) {
        html += '<div data-section="languages">';
        html += sbHeading(sectionIcons.languages, t.languages);
        for (var li = 0; li < languages.length; li++) {
          var langItem = languages[li];
          var langLevel = safeStr(langItem.level || 'basic');
          html += '<div class="lang-entry" data-entry-id="' + escapeHtml(safeStr(langItem.id)) + '">' +
            '<span class="lang-name">' + escapeHtml(safeStr(langItem.name)) + '</span>' +
            '<span class="lang-dots">' + levelDots(langLevel) + '</span>' +
            '</div>';
        }
        html += '</div>';
      }

      // 3. Skills
      if (skills.length > 0) {
        html += '<div data-section="skills">';
        html += sbHeading(sectionIcons.skills, t.skills);
        html += '<div class="skills-wrap">';
        for (var si = 0; si < skills.length; si++) {
          html += '<span class="skill-badge">' + escapeHtml(safeStr(skills[si])) + '</span>';
        }
        html += '</div>';
        html += '</div>';
      }

      html += '</div>'; // sidebar

      /* ═══ MAIN ═══ */
      html += '<div class="main">';

      // 1. Profile
      if (summary) {
        html += '<div data-section="profile">';
        html += mnHeading(sectionIcons.profile, t.profile);
        html += '<div class="profile-text">' + escapeHtml(summary) + '</div>';
        html += '</div>';
      }

      // 2. Work Experience
      if (experience.length > 0) {
        html += '<div data-section="experience">';
        html += mnHeading(sectionIcons.experience, t.experience);
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

      // 3. Projects
      if (projects.length > 0) {
        html += '<div data-section="projects">';
        html += mnHeading(sectionIcons.projects, t.projects);
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

      // 4. Achievements
      if (achievements.length > 0) {
        html += '<div data-section="achievements">';
        html += mnHeading(sectionIcons.achievements, t.achievements);
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

      // 5. Education
      if (education.length > 0) {
        html += '<div data-section="education">';
        html += mnHeading(sectionIcons.education, t.education);
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
        html += '<div data-section="certifications">';
        html += mnHeading(sectionIcons.certifications, t.certifications);
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

      html += '</div>'; // main
      html += '</div>'; // page

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = html;
      }
    }
  }

  if (!customElements.get('gqr-resume-atlantic')) {
    customElements.define('gqr-resume-atlantic', GQRResumeAtlantic);
  }
})();
