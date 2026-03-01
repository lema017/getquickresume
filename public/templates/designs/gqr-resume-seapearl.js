/**
 * name: gqr-resume-seapearl
 * description: "Two-column resume with warm cream sidebar, circular section icons, justified profile text, and clean white main area with uppercase section headings and icon badges."
 */

(function() {
  'use strict';

  var creamBg = '#f3ede6';
  var darkText = '#2d2d2d';
  var mutedText = '#5a5a5a';
  var iconBg = '#e8e0d6';

  var i18n = {
    es: {
      profile: 'Perfil', experience: 'Experiencia Profesional',
      education: 'Educación', projects: 'Proyectos', certifications: 'Certificaciones',
      languages: 'Idiomas', achievements: 'Logros', skills: 'Habilidades',
      contact: 'Contacto', present: 'Presente',
      basic: 'Básico', intermediate: 'Intermedio', advanced: 'Avanzado', native: 'Nativo'
    },
    en: {
      profile: 'Profile', experience: 'Work Experience',
      education: 'Education', projects: 'Projects', certifications: 'Certifications',
      languages: 'Languages', achievements: 'Achievements', skills: 'Skills',
      contact: 'Contact', present: 'Present',
      basic: 'Basic', intermediate: 'Intermediate', advanced: 'Advanced', native: 'Native'
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
      var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      return months[dt.getMonth()] + ' ' + dt.getFullYear();
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

  var sectionIcons = {
    profile: '👤',
    experience: '💼',
    education: '🎓',
    projects: '📂',
    achievements: '⭐',
    certifications: '📜',
    languages: '🌐',
    skills: '⚙'
  };

  class GQRResumeSeapearl extends HTMLElement {
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
      var lMap = levelMap[lang] || levelMap.en;
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
        '@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+Pro:wght@300;400;600;700&display=swap");' +

        ':host {' +
        '  display: block;' +
        '  font-family: "Source Sans Pro", "Segoe UI", Arial, sans-serif;' +
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
        '  width: 36%;' +
        '  background: ' + creamBg + ';' +
        '  padding: 36px 24px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 22px;' +
        '}' +

        '.sb-name {' +
        '  font-family: "Playfair Display", Georgia, serif;' +
        '  font-size: 30px;' +
        '  font-weight: 700;' +
        '  line-height: 1.15;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.sb-profession {' +
        '  font-size: 13px;' +
        '  font-weight: 400;' +
        '  color: ' + mutedText + ';' +
        '  margin-top: 4px;' +
        '}' +

        /* Sidebar section heading with icon */
        '.sb-heading {' +
        '  display: flex;' +
        '  align-items: center;' +
        '  gap: 8px;' +
        '  margin-bottom: 10px;' +
        '}' +
        '.sb-icon {' +
        '  width: 26px;' +
        '  height: 26px;' +
        '  border-radius: 50%;' +
        '  background: ' + iconBg + ';' +
        '  display: flex;' +
        '  align-items: center;' +
        '  justify-content: center;' +
        '  font-size: 12px;' +
        '  flex-shrink: 0;' +
        '}' +
        '.sb-title {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  text-transform: uppercase;' +
        '  letter-spacing: 1.2px;' +
        '  color: ' + darkText + ';' +
        '}' +

        /* Contact */
        '.contact-line {' +
        '  font-size: 11px;' +
        '  color: ' + mutedText + ';' +
        '  margin-bottom: 4px;' +
        '  line-height: 1.45;' +
        '  word-break: break-all;' +
        '}' +

        /* Profile in sidebar */
        '.profile-text {' +
        '  font-size: 11px;' +
        '  line-height: 1.6;' +
        '  color: ' + mutedText + ';' +
        '  text-align: justify;' +
        '}' +

        /* Language badges */
        '.lang-list {' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 4px;' +
        '}' +
        '.lang-item {' +
        '  font-size: 11px;' +
        '  color: ' + mutedText + ';' +
        '}' +

        /* Skill badges */
        '.skill-badge-wrap {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 6px;' +
        '}' +
        '.skill-badge {' +
        '  display: inline-block;' +
        '  background: ' + darkText + ';' +
        '  color: #fff;' +
        '  font-size: 10px;' +
        '  font-weight: 600;' +
        '  padding: 4px 12px;' +
        '  border-radius: 3px;' +
        '  white-space: nowrap;' +
        '}' +

        /* ── Main ── */
        '.main {' +
        '  width: 64%;' +
        '  background: #fff;' +
        '  padding: 36px 28px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 22px;' +
        '}' +

        /* Main section heading with icon */
        '.mn-heading {' +
        '  display: flex;' +
        '  align-items: center;' +
        '  gap: 8px;' +
        '  margin-bottom: 10px;' +
        '}' +
        '.mn-icon {' +
        '  width: 26px;' +
        '  height: 26px;' +
        '  border-radius: 50%;' +
        '  background: ' + iconBg + ';' +
        '  display: flex;' +
        '  align-items: center;' +
        '  justify-content: center;' +
        '  font-size: 12px;' +
        '  flex-shrink: 0;' +
        '}' +
        '.mn-title {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  text-transform: uppercase;' +
        '  letter-spacing: 1.2px;' +
        '  color: ' + darkText + ';' +
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
        '  font-size: 11.5px;' +
        '  font-style: italic;' +
        '  color: ' + mutedText + ';' +
        '}' +
        '.exp-meta {' +
        '  font-size: 10.5px;' +
        '  color: #999;' +
        '}' +
        '.exp-bullets { list-style: none; margin-top: 4px; }' +
        '.exp-bullet {' +
        '  font-size: 10.5px;' +
        '  line-height: 1.55;' +
        '  color: ' + mutedText + ';' +
        '  padding-left: 12px;' +
        '  position: relative;' +
        '  margin-bottom: 2px;' +
        '}' +
        '.exp-bullet::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: #aaa;' +
        '}' +

        /* Education */
        '.edu-entry { margin-bottom: 10px; text-align: left; }' +
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
        '  font-size: 10.5px;' +
        '  color: #999;' +
        '}' +
        '.edu-gpa {' +
        '  font-size: 10px;' +
        '  color: #999;' +
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
        '  color: #999;' +
        '  margin-top: 2px;' +
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
        '  font-size: 10.5px;' +
        '  color: ' + mutedText + ';' +
        '  line-height: 1.55;' +
        '  margin-top: 1px;' +
        '}' +
        '.ach-year {' +
        '  font-size: 10px;' +
        '  color: #999;' +
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

        '@media print {' +
        '  .page { width: 210mm; min-height: 297mm; }' +
        '}' +
      '</style>';

      function sbHeading(icon, label) {
        return '<div class="sb-heading">' +
          '<span class="sb-icon">' + icon + '</span>' +
          '<span class="sb-title">' + escapeHtml(label) + '</span>' +
          '</div>';
      }

      function mnHeading(icon, label) {
        return '<div class="mn-heading">' +
          '<span class="mn-icon">' + icon + '</span>' +
          '<span class="mn-title">' + escapeHtml(label) + '</span>' +
          '</div>';
      }

      var html = css + '<div class="page">';

      /* ═══ SIDEBAR ═══ */
      html += '<div class="sidebar">';

      // Name & profession
      html += '<div data-section="header">';
      if (fullName) html += '<div class="sb-name">' + escapeHtml(fullName) + '</div>';
      if (profession) html += '<div class="sb-profession">' + escapeHtml(profession) + '</div>';
      html += '</div>';

      // 1. Contact
      if (hasContact) {
        html += '<div data-section="contact">';
        if (country) html += '<div class="contact-line">' + escapeHtml(country) + '</div>';
        if (email) html += '<div class="contact-line">' + escapeHtml(email) + '</div>';
        if (phone) html += '<div class="contact-line">' + escapeHtml(phone) + '</div>';
        if (linkedin) html += '<div class="contact-line">' + escapeHtml(linkedin) + '</div>';
        html += '</div>';
      }

      // 2. Languages
      if (languages.length > 0) {
        html += '<div data-section="languages">';
        html += sbHeading(sectionIcons.languages, t.languages);
        html += '<div class="lang-list">';
        for (var li = 0; li < languages.length; li++) {
          var langItem = languages[li];
          html += '<span class="lang-item" data-entry-id="' + escapeHtml(safeStr(langItem.id)) + '">' + escapeHtml(safeStr(langItem.name)) + '</span>';
        }
        html += '</div>';
        html += '</div>';
      }

      // 3. Skills
      if (skills.length > 0) {
        html += '<div data-section="skills">';
        html += sbHeading(sectionIcons.skills, t.skills);
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

      // Profile
      if (summary) {
        html += '<div data-section="profile">';
        html += mnHeading(sectionIcons.profile, t.profile);
        html += '<div class="profile-text">' + escapeHtml(summary) + '</div>';
        html += '</div>';
      }

      // Experience
      if (experience.length > 0) {
        html += '<div data-section="experience">';
        html += mnHeading(sectionIcons.experience, t.experience);
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
        html += mnHeading(sectionIcons.projects, t.projects);
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

      // Education
      if (education.length > 0) {
        html += '<div data-section="education">';
        html += mnHeading(sectionIcons.education, t.education);
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
        html += mnHeading(sectionIcons.certifications, t.certifications);
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

  if (!customElements.get('gqr-resume-seapearl')) {
    customElements.define('gqr-resume-seapearl', GQRResumeSeapearl);
  }
})();
