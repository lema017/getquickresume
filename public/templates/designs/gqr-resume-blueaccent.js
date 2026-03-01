/**
 * name: gqr-resume-blueaccent
 * description: "Single-column resume with dark purple/navy accent, centered name, icon contact row, section headings with purple icon and short underline, skill badges with rounded borders, and clean professional layout."
 */

(function() {
  'use strict';

  var accent = '#3d2c6e';
  var accentLight = '#ece8f4';
  var darkText = '#2a2a2a';
  var mutedText = '#555';
  var lightMuted = '#999';
  var borderColor = '#e0e0e0';
  var pageBg = '#fafafa';

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
      languages: 'Languages', achievements: 'Awards', skills: 'Skills',
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

  var sectionIcons = {
    profile: '📋',
    experience: '💼',
    education: '🎓',
    projects: '📂',
    achievements: '⭐',
    certifications: '📜',
    languages: '🌐',
    skills: '⚙'
  };

  class GQRResumeBlueaccent extends HTMLElement {
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

      var contactParts = [];
      if (country) contactParts.push('<span class="ct-item"><span class="ct-icon">⚲</span> ' + escapeHtml(country) + '</span>');
      if (email) contactParts.push('<span class="ct-item"><span class="ct-icon">✉</span> ' + escapeHtml(email) + '</span>');
      if (phone) contactParts.push('<span class="ct-item"><span class="ct-icon">☎</span> ' + escapeHtml(phone) + '</span>');
      if (linkedin) contactParts.push('<span class="ct-item"><span class="ct-icon">🔗</span> ' + escapeHtml(linkedin) + '</span>');

      var css = '<style>' +
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
        '  width: 210mm;' +
        '  min-height: 297mm;' +
        '  height: auto;' +
        '  overflow: visible;' +
        '  background: ' + pageBg + ';' +
        '  padding: 32px 36px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 18px;' +
        '}' +

        /* Header */
        '.header { text-align: center; padding-bottom: 6px; }' +
        '.header-name {' +
        '  font-size: 26px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '  letter-spacing: 0.5px;' +
        '}' +

        /* Contact row */
        '.contact-row {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  justify-content: center;' +
        '  gap: 14px;' +
        '  margin-top: 6px;' +
        '}' +
        '.ct-item {' +
        '  font-size: 10.5px;' +
        '  color: ' + mutedText + ';' +
        '  white-space: nowrap;' +
        '}' +
        '.ct-icon {' +
        '  color: ' + accent + ';' +
        '  font-size: 10px;' +
        '}' +

        /* Section heading: icon + title + short underline */
        '.sec-heading {' +
        '  display: flex;' +
        '  align-items: center;' +
        '  gap: 8px;' +
        '  margin-bottom: 10px;' +
        '  padding-bottom: 4px;' +
        '}' +
        '.sec-icon {' +
        '  font-size: 14px;' +
        '  color: ' + accent + ';' +
        '  flex-shrink: 0;' +
        '}' +
        '.sec-title-wrap { display: flex; flex-direction: column; }' +
        '.sec-title {' +
        '  font-size: 14px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '  letter-spacing: 0.3px;' +
        '}' +
        '.sec-underline {' +
        '  width: 32px;' +
        '  height: 3px;' +
        '  background: ' + accent + ';' +
        '  border-radius: 2px;' +
        '  margin-top: 3px;' +
        '}' +

        /* Separator line between sections */
        '.sec-sep {' +
        '  width: 100%;' +
        '  height: 1px;' +
        '  background: ' + borderColor + ';' +
        '  margin: 2px 0;' +
        '}' +

        /* Profile */
        '.profile-text {' +
        '  font-size: 11px;' +
        '  line-height: 1.65;' +
        '  color: ' + mutedText + ';' +
        '  text-align: justify;' +
        '}' +

        /* Experience */
        '.exp-entry { margin-bottom: 14px; text-align: left; }' +
        '.exp-entry:last-child { margin-bottom: 0; }' +
        '.exp-top {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '  gap: 4px;' +
        '}' +
        '.exp-left { flex: 1; min-width: 0; }' +
        '.exp-right { text-align: right; flex-shrink: 0; }' +
        '.exp-company {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.exp-role {' +
        '  font-size: 11px;' +
        '  font-style: italic;' +
        '  color: ' + mutedText + ';' +
        '}' +
        '.exp-date {' +
        '  font-size: 10.5px;' +
        '  color: ' + accent + ';' +
        '  font-weight: 600;' +
        '}' +
        '.exp-location {' +
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
        '  content: "–";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: ' + accent + ';' +
        '  font-weight: 700;' +
        '}' +

        /* Education */
        '.edu-entry { margin-bottom: 8px; text-align: left; }' +
        '.edu-entry:last-child { margin-bottom: 0; }' +
        '.edu-top {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: baseline;' +
        '  flex-wrap: wrap;' +
        '  gap: 4px;' +
        '}' +
        '.edu-left { flex: 1; min-width: 0; }' +
        '.edu-right { text-align: right; flex-shrink: 0; }' +
        '.edu-degree {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  font-style: italic;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.edu-inst {' +
        '  font-size: 11px;' +
        '  font-style: italic;' +
        '  color: ' + mutedText + ';' +
        '}' +
        '.edu-date {' +
        '  font-size: 10.5px;' +
        '  color: ' + accent + ';' +
        '  font-weight: 600;' +
        '}' +
        '.edu-location {' +
        '  font-size: 10px;' +
        '  color: ' + lightMuted + ';' +
        '}' +
        '.edu-gpa {' +
        '  font-size: 10px;' +
        '  color: ' + lightMuted + ';' +
        '}' +

        /* Skills - rounded border badges */
        '.skills-wrap {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  gap: 8px;' +
        '}' +
        '.skill-badge {' +
        '  display: inline-block;' +
        '  font-size: 10.5px;' +
        '  color: ' + darkText + ';' +
        '  padding: 5px 16px;' +
        '  border: 1.5px solid ' + borderColor + ';' +
        '  border-radius: 20px;' +
        '  white-space: nowrap;' +
        '  background: #fff;' +
        '}' +

        /* Languages - inline dot-separated */
        '.lang-inline {' +
        '  font-size: 11px;' +
        '  color: ' + mutedText + ';' +
        '  text-align: left;' +
        '}' +
        '.lang-sep {' +
        '  margin: 0 6px;' +
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

        /* Achievements / Awards */
        '.ach-entry { margin-bottom: 6px; text-align: left; }' +
        '.ach-entry:last-child { margin-bottom: 0; }' +
        '.ach-title {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.ach-issuer {' +
        '  font-size: 11px;' +
        '  font-style: italic;' +
        '  color: ' + mutedText + ';' +
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
        '  font-style: italic;' +
        '  color: ' + mutedText + ';' +
        '}' +

        /* Footer */
        '.footer {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: center;' +
        '  margin-top: auto;' +
        '  padding-top: 12px;' +
        '  border-top: 1px solid ' + borderColor + ';' +
        '  font-size: 9px;' +
        '  color: ' + lightMuted + ';' +
        '}' +

        '@media print {' +
        '  .page { width: 210mm; min-height: 297mm; }' +
        '}' +
      '</style>';

      function secHeading(icon, label) {
        return '<div class="sec-heading">' +
          '<span class="sec-icon">' + icon + '</span>' +
          '<div class="sec-title-wrap">' +
          '<span class="sec-title">' + escapeHtml(label) + '</span>' +
          '<div class="sec-underline"></div>' +
          '</div>' +
          '</div>';
      }

      var html = css + '<div class="page">';

      /* Header */
      html += '<div class="header" data-section="header">';
      if (fullName) html += '<div class="header-name">' + escapeHtml(fullName) + '</div>';
      html += '</div>';

      /* Contact */
      if (contactParts.length > 0) {
        html += '<div data-section="contact">';
        html += '<div class="contact-row">' + contactParts.join('') + '</div>';
        html += '</div>';
      }

      /* Profile */
      if (summary) {
        html += '<div class="sec-sep"></div>';
        html += '<div data-section="profile">';
        html += secHeading(sectionIcons.profile, t.profile);
        html += '<div class="profile-text">' + escapeHtml(summary) + '</div>';
        html += '</div>';
      }

      /* Skills */
      if (skills.length > 0) {
        html += '<div class="sec-sep"></div>';
        html += '<div data-section="skills">';
        html += secHeading(sectionIcons.skills, t.skills);
        html += '<div class="skills-wrap">';
        for (var si = 0; si < skills.length; si++) {
          html += '<span class="skill-badge">' + escapeHtml(safeStr(skills[si])) + '</span>';
        }
        html += '</div>';
        html += '</div>';
      }

      /* Experience */
      if (experience.length > 0) {
        html += '<div class="sec-sep"></div>';
        html += '<div data-section="experience">';
        html += secHeading(sectionIcons.experience, t.experience);
        for (var ei = 0; ei < experience.length; ei++) {
          var exp = experience[ei];
          var position = safeStr(exp.title);
          var company = safeStr(exp.company);
          var location = safeStr(exp.location);
          var expBullets = safeArr(exp.achievements).concat(safeArr(exp.responsibilities));
          var expRange = fmtRange(safeStr(exp.startDate), safeStr(exp.endDate), exp.isCurrent || false, lang);

          html += '<div class="exp-entry" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          html += '<div class="exp-top">';
          html += '<div class="exp-left">';
          if (company) html += '<div class="exp-company">' + escapeHtml(company) + '</div>';
          if (position) html += '<div class="exp-role">' + escapeHtml(position) + '</div>';
          html += '</div>';
          html += '<div class="exp-right">';
          if (expRange) html += '<div class="exp-date">' + escapeHtml(expRange) + '</div>';
          if (location) html += '<div class="exp-location">' + escapeHtml(location) + '</div>';
          html += '</div>';
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

      /* Projects */
      if (projects.length > 0) {
        html += '<div class="sec-sep"></div>';
        html += '<div data-section="projects">';
        html += secHeading(sectionIcons.projects, t.projects);
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

      /* Achievements */
      if (achievements.length > 0) {
        html += '<div class="sec-sep"></div>';
        html += '<div data-section="achievements">';
        html += secHeading(sectionIcons.achievements, t.achievements);
        for (var ai = 0; ai < achievements.length; ai++) {
          var ach = achievements[ai];
          html += '<div class="ach-entry" data-entry-id="' + escapeHtml(safeStr(ach.id)) + '">';
          var achLine = '';
          if (ach.title) achLine += '<span class="ach-title">' + escapeHtml(safeStr(ach.title)) + '</span>';
          if (ach.description) achLine += ' <span class="ach-issuer">' + escapeHtml(safeStr(ach.description)) + '</span>';
          html += achLine;
          html += '</div>';
        }
        html += '</div>';
      }

      /* Education */
      if (education.length > 0) {
        html += '<div class="sec-sep"></div>';
        html += '<div data-section="education">';
        html += secHeading(sectionIcons.education, t.education);
        for (var edi = 0; edi < education.length; edi++) {
          var edu = education[edi];
          var degree = safeStr(edu.degree);
          var field = safeStr(edu.field);
          var institution = safeStr(edu.institution);
          var gpa = edu.gpa;
          var eduRange = fmtRange(safeStr(edu.startDate), safeStr(edu.endDate), edu.isCompleted === false, lang);
          var degreeLine = degree + (field ? ' in ' + field : '');

          html += '<div class="edu-entry" data-entry-id="' + escapeHtml(safeStr(edu.id)) + '">';
          html += '<div class="edu-top">';
          html += '<div class="edu-left">';
          if (degreeLine) html += '<div class="edu-degree">' + escapeHtml(degreeLine) + '</div>';
          if (institution) html += '<div class="edu-inst">' + escapeHtml(institution) + '</div>';
          html += '</div>';
          html += '<div class="edu-right">';
          if (eduRange) html += '<div class="edu-date">' + escapeHtml(eduRange) + '</div>';
          html += '</div>';
          html += '</div>';
          if (gpa) html += '<div class="edu-gpa">GPA: ' + escapeHtml(String(gpa)) + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      /* Certifications */
      if (certifications.length > 0) {
        html += '<div class="sec-sep"></div>';
        html += '<div data-section="certifications">';
        html += secHeading(sectionIcons.certifications, t.certifications);
        for (var ci = 0; ci < certifications.length; ci++) {
          var cert = certifications[ci];
          html += '<div class="cert-entry" data-entry-id="' + escapeHtml(safeStr(cert.id)) + '">';
          if (cert.name) html += '<span class="cert-name">' + escapeHtml(safeStr(cert.name)) + '</span>';
          if (cert.issuer) html += ' <span class="cert-detail">' + escapeHtml(safeStr(cert.issuer)) + '</span>';
          html += '</div>';
        }
        html += '</div>';
      }

      /* Languages */
      if (languages.length > 0) {
        html += '<div class="sec-sep"></div>';
        html += '<div data-section="languages">';
        html += secHeading(sectionIcons.languages, t.languages);
        html += '<div class="lang-inline">';
        var langParts = [];
        for (var li = 0; li < languages.length; li++) {
          langParts.push('<span data-entry-id="' + escapeHtml(safeStr(languages[li].id)) + '">' + escapeHtml(safeStr(languages[li].name)) + '</span>');
        }
        html += langParts.join('<span class="lang-sep">•</span>');
        html += '</div>';
        html += '</div>';
      }

      /* Footer */
      html += '<div class="footer">';
      if (email) html += '<span>' + escapeHtml(email) + '</span>';
      html += '</div>';

      html += '</div>'; // page

      if (this.shadowRoot) { this.shadowRoot.innerHTML = html; }
    }
  }

  if (!customElements.get('gqr-resume-blueaccent')) {
    customElements.define('gqr-resume-blueaccent', GQRResumeBlueaccent);
  }
})();
