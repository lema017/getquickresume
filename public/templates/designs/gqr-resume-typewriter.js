/**
 * name: gqr-resume-typewriter
 * description: "Two-column resume with dark sidebar, monospace typewriter font, name and contact in sidebar, and clean white main area with bold serif section headings and dot-separated skills."
 */

(function() {
  'use strict';

  var sidebarBg = '#2b2b2b';
  var darkText = '#222';
  var mutedText = '#444';
  var lightMuted = '#888';

  var i18n = {
    es: {
      profile: 'Perfil', experience: 'Experiencia Profesional',
      education: 'Educación', projects: 'Proyectos', certifications: 'Certificaciones',
      languages: 'Idiomas', achievements: 'Logros', skills: 'Habilidades',
      present: 'Presente'
    },
    en: {
      profile: 'Profile', experience: 'Professional Experience',
      education: 'Education', projects: 'Projects', certifications: 'Certifications',
      languages: 'Languages', achievements: 'Achievements', skills: 'Skills',
      present: 'Present'
    }
  };

  var levelMap = {
    es: { basic: 'Básico', intermediate: 'Intermedio', advanced: 'Avanzado', native: 'Nativo' },
    en: { basic: 'Basic', intermediate: 'Intermediate', advanced: 'Advanced', native: 'Native' }
  };

  function safeStr(v) { return (v != null && typeof v === 'string') ? v : ''; }
  function safeArr(v) { return Array.isArray(v) ? v : []; }

  function fmtDate(d) {
    if (!d) return '';
    try {
      var dt = new Date(d);
      if (isNaN(dt.getTime())) return d;
      return (dt.getMonth() + 1 < 10 ? '0' : '') + (dt.getMonth() + 1) + '/' + dt.getFullYear();
    } catch(e) { return d; }
  }

  function fmtRange(s, e, isCur, lang) {
    var start = fmtDate(s);
    if (!e && !isCur) return start;
    var end = isCur ? (i18n[lang]?.present || 'Present') : fmtDate(e);
    return start + ' – ' + end;
  }

  function escapeHtml(t) {
    var d = document.createElement('div');
    d.textContent = t;
    return d.innerHTML;
  }

  class GQRResumeTypewriter extends HTMLElement {
    constructor() { super(); this._data = null; }
    static get observedAttributes() { return ['language']; }
    connectedCallback() {
      if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
      this.render();
    }
    attributeChangedCallback() { if (this.shadowRoot) this.render(); }
    get data() { return this._data || {}; }
    set data(v) {
      if (v && typeof v === 'object') { this._data = v; if (this.shadowRoot) this.render(); }
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
      var summary = safeStr(data.summary);
      var email = safeStr(data.email);
      var phone = safeStr(data.phone);
      var country = safeStr(data.country);
      var linkedin = safeStr(data.linkedin);

      var skillsRaw = safeArr(data.skillsRaw);
      var toolsRaw = data.toolsRaw ? safeArr(data.toolsRaw) : [];
      var skills = skillsRaw.concat(toolsRaw.filter(function(x) { return skillsRaw.indexOf(x) === -1; }));
      var experience = safeArr(data.experience);
      var education = safeArr(data.education);
      var projects = safeArr(data.projects);
      var certifications = safeArr(data.certifications);
      var languages = safeArr(data.languages);
      var achievements = safeArr(data.achievements);

      var hasContact = email || phone || country || linkedin;

      var css = '<style>' +
        '@import url("https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap");' +

        ':host {' +
        '  display: block;' +
        '  font-family: "Courier Prime", "Courier New", Courier, monospace;' +
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

        /* ── Sidebar ── */
        '.sidebar {' +
        '  width: 34%;' +
        '  background: ' + sidebarBg + ';' +
        '  padding: 34px 20px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 20px;' +
        '  color: #fff;' +
        '}' +

        '.sb-name {' +
        '  font-size: 22px;' +
        '  font-weight: 700;' +
        '  color: #fff;' +
        '  line-height: 1.2;' +
        '}' +
        '.sb-profession {' +
        '  font-size: 11px;' +
        '  color: rgba(255,255,255,0.65);' +
        '  margin-top: 2px;' +
        '}' +

        '.contact-item {' +
        '  font-size: 10.5px;' +
        '  color: rgba(255,255,255,0.8);' +
        '  margin-bottom: 5px;' +
        '  line-height: 1.4;' +
        '  word-break: break-all;' +
        '  display: flex;' +
        '  align-items: flex-start;' +
        '  gap: 6px;' +
        '}' +
        '.ct-icon {' +
        '  font-size: 11px;' +
        '  flex-shrink: 0;' +
        '  margin-top: 1px;' +
        '}' +

        /* ── Main ── */
        '.main {' +
        '  width: 66%;' +
        '  background: #fff;' +
        '  padding: 34px 28px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 20px;' +
        '}' +

        /* Section heading */
        '.sec-title {' +
        '  font-size: 15px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '  margin-bottom: 8px;' +
        '  border-bottom: 1px solid #ccc;' +
        '  padding-bottom: 3px;' +
        '}' +

        /* Profile */
        '.profile-text {' +
        '  font-size: 11px;' +
        '  line-height: 1.6;' +
        '  color: ' + mutedText + ';' +
        '  text-align: justify;' +
        '}' +

        /* Experience */
        '.exp-entry { margin-bottom: 14px; text-align: left; }' +
        '.exp-entry:last-child { margin-bottom: 0; }' +
        '.exp-company {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.exp-role {' +
        '  font-size: 11px;' +
        '  color: ' + mutedText + ';' +
        '}' +
        '.exp-meta {' +
        '  font-size: 10px;' +
        '  color: ' + lightMuted + ';' +
        '}' +
        '.exp-bullets { list-style: none; margin-top: 4px; }' +
        '.exp-bullet {' +
        '  font-size: 10.5px;' +
        '  line-height: 1.55;' +
        '  color: ' + mutedText + ';' +
        '  padding-left: 13px;' +
        '  position: relative;' +
        '  margin-bottom: 2px;' +
        '}' +
        '.exp-bullet::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: ' + lightMuted + ';' +
        '}' +

        /* Education */
        '.edu-entry { margin-bottom: 8px; text-align: left; }' +
        '.edu-entry:last-child { margin-bottom: 0; }' +
        '.edu-degree {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.edu-inst {' +
        '  font-size: 11px;' +
        '  color: ' + mutedText + ';' +
        '}' +
        '.edu-date {' +
        '  font-size: 10px;' +
        '  color: ' + lightMuted + ';' +
        '}' +
        '.edu-gpa {' +
        '  font-size: 10px;' +
        '  color: ' + lightMuted + ';' +
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
        '  font-size: 10.5px;' +
        '  color: ' + mutedText + ';' +
        '  line-height: 1.55;' +
        '  margin-top: 2px;' +
        '}' +
        '.proj-tech {' +
        '  font-size: 10px;' +
        '  color: ' + lightMuted + ';' +
        '  margin-top: 2px;' +
        '}' +

        /* Achievements */
        '.ach-entry { margin-bottom: 6px; text-align: left; }' +
        '.ach-entry:last-child { margin-bottom: 0; }' +
        '.ach-title {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.ach-desc {' +
        '  font-size: 10.5px;' +
        '  color: ' + mutedText + ';' +
        '  line-height: 1.55;' +
        '  margin-top: 1px;' +
        '}' +

        /* Certifications */
        '.cert-entry { margin-bottom: 6px; text-align: left; }' +
        '.cert-entry:last-child { margin-bottom: 0; }' +
        '.cert-name {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.cert-detail {' +
        '  font-size: 11px;' +
        '  color: ' + mutedText + ';' +
        '}' +

        /* Sidebar section title */
        '.sb-sec-title {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: rgba(255,255,255,0.5);' +
        '  text-transform: uppercase;' +
        '  letter-spacing: 1px;' +
        '  margin-bottom: 6px;' +
        '}' +

        /* Languages - bulleted list (sidebar) */
        '.lang-list { list-style: none; }' +
        '.lang-item {' +
        '  font-size: 11px;' +
        '  color: rgba(255,255,255,0.8);' +
        '  padding-left: 13px;' +
        '  position: relative;' +
        '  margin-bottom: 2px;' +
        '}' +
        '.lang-item::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: rgba(255,255,255,0.4);' +
        '}' +

        /* Skills - inline dot-separated (sidebar) */
        '.skills-inline {' +
        '  font-size: 11px;' +
        '  color: rgba(255,255,255,0.8);' +
        '  line-height: 1.7;' +
        '  text-align: left;' +
        '}' +
        '.skill-sep {' +
        '  margin: 0 5px;' +
        '  color: rgba(255,255,255,0.4);' +
        '}' +

        '@media print {' +
        '  .page { width: 210mm; min-height: 297mm; }' +
        '}' +
      '</style>';

      var html = css + '<div class="page">';

      /* ═══ SIDEBAR ═══ */
      html += '<div class="sidebar">';

      // Header
      html += '<div data-section="header">';
      if (fullName) html += '<div class="sb-name">' + escapeHtml(fullName) + '</div>';
      if (profession) html += '<div class="sb-profession">' + escapeHtml(profession) + '</div>';
      html += '</div>';

      // 1. Contact
      if (hasContact) {
        html += '<div data-section="contact">';
        if (country) html += '<div class="contact-item"><span class="ct-icon">⚲</span><span>' + escapeHtml(country) + '</span></div>';
        if (phone) html += '<div class="contact-item"><span class="ct-icon">☎</span><span>' + escapeHtml(phone) + '</span></div>';
        if (email) html += '<div class="contact-item"><span class="ct-icon">✉</span><span>' + escapeHtml(email) + '</span></div>';
        if (linkedin) html += '<div class="contact-item"><span class="ct-icon">🔗</span><span>' + escapeHtml(linkedin) + '</span></div>';
        html += '</div>';
      }

      // 2. Languages
      if (languages.length > 0) {
        html += '<div data-section="languages">';
        html += '<div class="sb-sec-title">' + escapeHtml(t.languages) + '</div>';
        html += '<ul class="lang-list">';
        for (var li = 0; li < languages.length; li++) {
          html += '<li class="lang-item" data-entry-id="' + escapeHtml(safeStr(languages[li].id)) + '">' + escapeHtml(safeStr(languages[li].name)) + '</li>';
        }
        html += '</ul>';
        html += '</div>';
      }

      // 3. Skills
      if (skills.length > 0) {
        html += '<div data-section="skills">';
        html += '<div class="sb-sec-title">' + escapeHtml(t.skills) + '</div>';
        html += '<div class="skills-inline">';
        var skillParts = [];
        for (var si = 0; si < skills.length; si++) {
          skillParts.push('<span data-entry-id="skill-' + si + '">' + escapeHtml(safeStr(skills[si])) + '</span>');
        }
        html += skillParts.join('<span class="skill-sep">•</span>');
        html += '</div>';
        html += '</div>';
      }

      html += '</div>'; // sidebar

      /* ═══ MAIN ═══ */
      html += '<div class="main">';

      // Profile
      if (summary) {
        html += '<div data-section="profile">';
        html += '<div class="sec-title">' + escapeHtml(t.profile) + '</div>';
        html += '<div class="profile-text">' + escapeHtml(summary) + '</div>';
        html += '</div>';
      }

      // Experience
      if (experience.length > 0) {
        html += '<div data-section="experience">';
        html += '<div class="sec-title">' + escapeHtml(t.experience) + '</div>';
        for (var ei = 0; ei < experience.length; ei++) {
          var exp = experience[ei];
          var position = safeStr(exp.title);
          var company = safeStr(exp.company);
          var location = safeStr(exp.location);
          var expBullets = safeArr(exp.achievements).concat(safeArr(exp.responsibilities));
          var expRange = fmtRange(safeStr(exp.startDate), safeStr(exp.endDate), exp.isCurrent || false, lang);
          var metaParts = [];
          if (expRange) metaParts.push(expRange);
          if (location) metaParts.push(location);

          html += '<div class="exp-entry" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          if (company) html += '<div class="exp-company">' + escapeHtml(company) + '</div>';
          if (position) html += '<div class="exp-role">' + escapeHtml(position) + '</div>';
          if (metaParts.length) html += '<div class="exp-meta">' + escapeHtml(metaParts.join(' | ')) + '</div>';

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
        html += '<div class="sec-title">' + escapeHtml(t.projects) + '</div>';
        for (var pi = 0; pi < projects.length; pi++) {
          var proj = projects[pi];
          html += '<div class="proj-entry" data-entry-id="' + escapeHtml(safeStr(proj.id)) + '">';
          html += '<div class="proj-name">' + escapeHtml(safeStr(proj.name)) + '</div>';
          if (proj.description) html += '<div class="proj-desc">' + escapeHtml(safeStr(proj.description)) + '</div>';
          if (safeArr(proj.technologies).length > 0) {
            html += '<div class="proj-tech">' + safeArr(proj.technologies).map(function(x) { return escapeHtml(safeStr(x)); }).join(', ') + '</div>';
          }
          html += '</div>';
        }
        html += '</div>';
      }

      // Achievements
      if (achievements.length > 0) {
        html += '<div data-section="achievements">';
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

      // Education
      if (education.length > 0) {
        html += '<div data-section="education">';
        html += '<div class="sec-title">' + escapeHtml(t.education) + '</div>';
        for (var edi = 0; edi < education.length; edi++) {
          var edu = education[edi];
          var degree = safeStr(edu.degree);
          var field = safeStr(edu.field);
          var institution = safeStr(edu.institution);
          var gpa = edu.gpa;
          var eduRange = fmtRange(safeStr(edu.startDate), safeStr(edu.endDate), edu.isCompleted === false, lang);
          var degreeLine = degree + (field ? ' in ' + field : '');

          html += '<div class="edu-entry" data-entry-id="' + escapeHtml(safeStr(edu.id)) + '">';
          if (degreeLine) html += '<div class="edu-degree">' + escapeHtml(degreeLine) + '</div>';
          if (institution) html += '<div class="edu-inst">' + escapeHtml(institution) + '</div>';
          if (eduRange) html += '<div class="edu-date">' + escapeHtml(eduRange) + '</div>';
          if (gpa) html += '<div class="edu-gpa">GPA: ' + escapeHtml(String(gpa)) + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      // Certifications
      if (certifications.length > 0) {
        html += '<div data-section="certifications">';
        html += '<div class="sec-title">' + escapeHtml(t.certifications) + '</div>';
        for (var ci = 0; ci < certifications.length; ci++) {
          var cert = certifications[ci];
          html += '<div class="cert-entry" data-entry-id="' + escapeHtml(safeStr(cert.id)) + '">';
          if (cert.name) html += '<span class="cert-name">' + escapeHtml(safeStr(cert.name)) + '</span>';
          if (cert.issuer) html += ' <span class="cert-detail">– ' + escapeHtml(safeStr(cert.issuer)) + '</span>';
          html += '</div>';
        }
        html += '</div>';
      }

      html += '</div>'; // main
      html += '</div>'; // page

      if (this.shadowRoot) { this.shadowRoot.innerHTML = html; }
    }
  }

  if (!customElements.get('gqr-resume-typewriter')) {
    customElements.define('gqr-resume-typewriter', GQRResumeTypewriter);
  }
})();
