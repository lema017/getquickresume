/**
 * name: gqr-resume-boldname
 * description: "Single-column resume with oversized bold uppercase name, light gray background, timeline layout with company/date on left and title/description on right, two-column skills grid, and contact info in top-right corner."
 */

(function() {
  'use strict';

  var pageBg = '#f5f5f5';
  var darkText = '#1a1a1a';
  var bodyText = '#333';
  var mutedText = '#666';
  var lightText = '#999';
  var ruleColor = '#ccc';

  var i18n = {
    es: {
      profile: 'Perfil', experience: 'Experiencia Laboral',
      education: 'Educación', projects: 'Proyectos', certifications: 'Certificaciones',
      languages: 'Idiomas', achievements: 'Logros', skills: 'Habilidades',
      present: 'Presente'
    },
    en: {
      profile: 'Profile', experience: 'Work Experience',
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
      return dt.getFullYear();
    } catch(e) { return d; }
  }

  function fmtRange(s, e, isCur, lang) {
    var start = fmtDate(s);
    if (!e && !isCur) return start;
    var end = isCur ? (i18n[lang]?.present || 'Present') : fmtDate(e);
    return start + ' - ' + end;
  }

  function escapeHtml(t) {
    var d = document.createElement('div');
    d.textContent = t;
    return d.innerHTML;
  }

  class GQRResumeBoldname extends HTMLElement {
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

      var css = '<style>' +
        ':host {' +
        '  display: block;' +
        '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;' +
        '  line-height: 1.5;' +
        '  color: ' + bodyText + ';' +
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
        '  padding: 36px 40px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 20px;' +
        '}' +

        /* Header: name left, contact right */
        '.header {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  align-items: flex-start;' +
        '  gap: 20px;' +
        '}' +
        '.hdr-left {}' +
        '.hdr-name {' +
        '  font-size: 38px;' +
        '  font-weight: 900;' +
        '  color: ' + darkText + ';' +
        '  line-height: 1.05;' +
        '  text-transform: uppercase;' +
        '  letter-spacing: 1px;' +
        '}' +
        '.hdr-profession {' +
        '  font-size: 13px;' +
        '  font-weight: 400;' +
        '  font-style: italic;' +
        '  color: ' + mutedText + ';' +
        '  margin-top: 4px;' +
        '}' +
        '.hdr-right {' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 4px;' +
        '  text-align: left;' +
        '  flex-shrink: 0;' +
        '  margin-top: 6px;' +
        '}' +
        '.hdr-ct {' +
        '  font-size: 10px;' +
        '  color: ' + mutedText + ';' +
        '  display: flex;' +
        '  align-items: center;' +
        '  gap: 6px;' +
        '  white-space: nowrap;' +
        '}' +
        '.hdr-ct-icon {' +
        '  font-size: 10px;' +
        '  width: 14px;' +
        '  text-align: center;' +
        '  flex-shrink: 0;' +
        '}' +

        /* Section title: uppercase bold with bottom rule */
        '.sec-title {' +
        '  font-size: 14px;' +
        '  font-weight: 800;' +
        '  color: ' + darkText + ';' +
        '  text-transform: uppercase;' +
        '  letter-spacing: 1px;' +
        '  padding-bottom: 4px;' +
        '  border-bottom: 2px solid ' + darkText + ';' +
        '  margin-bottom: 12px;' +
        '}' +

        /* Profile */
        '.profile-text {' +
        '  font-size: 11px;' +
        '  line-height: 1.65;' +
        '  color: ' + bodyText + ';' +
        '}' +

        /* Timeline entry (experience, education) */
        '.tl-entry {' +
        '  display: flex;' +
        '  gap: 18px;' +
        '  margin-bottom: 14px;' +
        '  text-align: left;' +
        '}' +
        '.tl-entry:last-child { margin-bottom: 0; }' +
        '.tl-left {' +
        '  width: 115px;' +
        '  flex-shrink: 0;' +
        '}' +
        '.tl-company {' +
        '  font-size: 11px;' +
        '  font-style: italic;' +
        '  color: ' + mutedText + ';' +
        '  line-height: 1.35;' +
        '}' +
        '.tl-date {' +
        '  font-size: 10px;' +
        '  color: ' + lightText + ';' +
        '  line-height: 1.35;' +
        '}' +
        '.tl-right { flex: 1; min-width: 0; }' +
        '.tl-title {' +
        '  font-size: 12.5px;' +
        '  font-weight: 700;' +
        '  font-style: italic;' +
        '  color: ' + darkText + ';' +
        '  margin-bottom: 2px;' +
        '}' +
        '.tl-desc {' +
        '  font-size: 10.5px;' +
        '  line-height: 1.6;' +
        '  color: ' + bodyText + ';' +
        '}' +
        '.tl-bullets { list-style: none; margin-top: 3px; }' +
        '.tl-bullet {' +
        '  font-size: 10.5px;' +
        '  line-height: 1.55;' +
        '  color: ' + bodyText + ';' +
        '  margin-bottom: 2px;' +
        '}' +

        /* Skills - two-column list */
        '.skills-grid {' +
        '  display: grid;' +
        '  grid-template-columns: 1fr 1fr;' +
        '  gap: 3px 28px;' +
        '}' +
        '.skill-item {' +
        '  font-size: 10.5px;' +
        '  color: ' + bodyText + ';' +
        '  line-height: 1.65;' +
        '}' +

        /* Projects */
        '.proj-entry { margin-bottom: 10px; text-align: left; }' +
        '.proj-entry:last-child { margin-bottom: 0; }' +
        '.proj-name {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  font-style: italic;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.proj-desc {' +
        '  font-size: 10.5px;' +
        '  color: ' + bodyText + ';' +
        '  line-height: 1.55;' +
        '  margin-top: 2px;' +
        '}' +
        '.proj-tech {' +
        '  font-size: 10px;' +
        '  color: ' + lightText + ';' +
        '  margin-top: 2px;' +
        '}' +

        /* Achievements */
        '.ach-entry { margin-bottom: 6px; text-align: left; }' +
        '.ach-entry:last-child { margin-bottom: 0; }' +
        '.ach-title {' +
        '  font-size: 11px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.ach-desc {' +
        '  font-size: 10.5px;' +
        '  color: ' + bodyText + ';' +
        '  line-height: 1.55;' +
        '}' +

        /* Certifications */
        '.cert-grid {' +
        '  display: grid;' +
        '  grid-template-columns: 1fr 1fr;' +
        '  gap: 8px 28px;' +
        '}' +
        '.cert-cell { text-align: left; }' +
        '.cert-name {' +
        '  font-size: 11px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.cert-detail {' +
        '  font-size: 10px;' +
        '  color: ' + mutedText + ';' +
        '}' +

        /* Languages */
        '.lang-grid {' +
        '  display: grid;' +
        '  grid-template-columns: 1fr 1fr;' +
        '  gap: 6px 28px;' +
        '}' +
        '.lang-cell { text-align: left; }' +
        '.lang-name {' +
        '  font-size: 11px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.lang-level {' +
        '  font-size: 10px;' +
        '  color: ' + mutedText + ';' +
        '}' +

        '@media print {' +
        '  .page { width: 210mm; min-height: 297mm; }' +
        '}' +
      '</style>';

      var html = css + '<div class="page">';

      /* Header */
      html += '<div class="header">';
      html += '<div class="hdr-left" data-section="header">';
      if (firstName) html += '<div class="hdr-name">' + escapeHtml(firstName) + '</div>';
      if (lastName) html += '<div class="hdr-name">' + escapeHtml(lastName) + '</div>';
      if (profession) html += '<div class="hdr-profession">' + escapeHtml(profession) + '</div>';
      html += '</div>';

      var hasContact = email || phone || country || linkedin;
      if (hasContact) {
        html += '<div class="hdr-right" data-section="contact">';
        if (phone) html += '<div class="hdr-ct"><span class="hdr-ct-icon">☎</span>' + escapeHtml(phone) + '</div>';
        if (email) html += '<div class="hdr-ct"><span class="hdr-ct-icon">✉</span>' + escapeHtml(email) + '</div>';
        if (country) html += '<div class="hdr-ct"><span class="hdr-ct-icon">⚲</span>' + escapeHtml(country) + '</div>';
        if (linkedin) html += '<div class="hdr-ct"><span class="hdr-ct-icon">🔗</span>' + escapeHtml(linkedin) + '</div>';
        html += '</div>';
      }
      html += '</div>';

      /* Profile */
      if (summary) {
        html += '<div data-section="profile">';
        html += '<div class="sec-title">' + escapeHtml(t.profile) + '</div>';
        html += '<div class="profile-text">' + escapeHtml(summary) + '</div>';
        html += '</div>';
      }

      /* Skills */
      if (skills.length > 0) {
        html += '<div data-section="skills">';
        html += '<div class="sec-title">' + escapeHtml(t.skills) + '</div>';
        html += '<div class="skills-grid">';
        for (var si = 0; si < skills.length; si++) {
          html += '<div class="skill-item" data-entry-id="skill-' + si + '">' + escapeHtml(safeStr(skills[si])) + '</div>';
        }
        html += '</div>';
        html += '</div>';
      }

      /* Experience */
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

          html += '<div class="tl-entry" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          html += '<div class="tl-left">';
          if (company) html += '<div class="tl-company">' + escapeHtml(company) + '</div>';
          if (expRange) html += '<div class="tl-date">' + escapeHtml(expRange) + '</div>';
          html += '</div>';
          html += '<div class="tl-right">';
          if (position) html += '<div class="tl-title">' + escapeHtml(position) + '</div>';

          if (expBullets.length > 0) {
            html += '<div class="tl-desc">';
            for (var bi = 0; bi < expBullets.length; bi++) {
              var txt = safeStr(expBullets[bi]);
              if (txt) {
                if (bi > 0) html += ' ';
                html += escapeHtml(txt);
              }
            }
            html += '</div>';
          }
          html += '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      /* Projects */
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

      /* Achievements */
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

      /* Education */
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

          html += '<div class="tl-entry" data-entry-id="' + escapeHtml(safeStr(edu.id)) + '">';
          html += '<div class="tl-left">';
          if (institution) html += '<div class="tl-company">' + escapeHtml(institution) + '</div>';
          if (eduRange) html += '<div class="tl-date">' + escapeHtml(eduRange) + '</div>';
          html += '</div>';
          html += '<div class="tl-right">';
          if (degreeLine) html += '<div class="tl-title">' + escapeHtml(degreeLine) + '</div>';
          if (gpa) html += '<div class="tl-desc">GPA: ' + escapeHtml(String(gpa)) + '</div>';
          html += '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      /* Certifications */
      if (certifications.length > 0) {
        html += '<div data-section="certifications">';
        html += '<div class="sec-title">' + escapeHtml(t.certifications) + '</div>';
        html += '<div class="cert-grid">';
        for (var ci = 0; ci < certifications.length; ci++) {
          var cert = certifications[ci];
          html += '<div class="cert-cell" data-entry-id="' + escapeHtml(safeStr(cert.id)) + '">';
          if (cert.name) html += '<div class="cert-name">' + escapeHtml(safeStr(cert.name)) + '</div>';
          if (cert.issuer) html += '<div class="cert-detail">' + escapeHtml(safeStr(cert.issuer)) + '</div>';
          html += '</div>';
        }
        html += '</div>';
        html += '</div>';
      }

      /* Languages */
      if (languages.length > 0) {
        html += '<div data-section="languages">';
        html += '<div class="sec-title">' + escapeHtml(t.languages) + '</div>';
        html += '<div class="lang-grid">';
        for (var li = 0; li < languages.length; li++) {
          var langItem = languages[li];
          var langLevel = safeStr(langItem.level || 'basic');
          var langLabel = lMap[langLevel] || langLevel;
          html += '<div class="lang-cell" data-entry-id="' + escapeHtml(safeStr(langItem.id)) + '">' +
            '<div class="lang-name">' + escapeHtml(safeStr(langItem.name)) + '</div>' +
            '<div class="lang-level">' + escapeHtml(langLabel) + '</div>' +
            '</div>';
        }
        html += '</div>';
        html += '</div>';
      }

      html += '</div>'; // page

      if (this.shadowRoot) { this.shadowRoot.innerHTML = html; }
    }
  }

  if (!customElements.get('gqr-resume-boldname')) {
    customElements.define('gqr-resume-boldname', GQRResumeBoldname);
  }
})();
