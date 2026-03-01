/**
 * name: gqr-resume-navybar
 * description: "Single-column resume with dark navy header banner, centered name, pill-shaped contact badges, full-width navy section bars with white text, two-column skills grid, and clean corporate layout."
 */

(function() {
  'use strict';

  var navy = '#1e3a5f';
  var navyLight = '#2c4f7c';
  var darkText = '#222';
  var bodyText = '#333';
  var mutedText = '#666';
  var lightText = '#999';

  var i18n = {
    es: {
      profile: 'Perfil Profesional', experience: 'Experiencia Laboral',
      education: 'Educación y Formación', projects: 'Proyectos', certifications: 'Certificaciones',
      languages: 'Idiomas', achievements: 'Logros', skills: 'Habilidades Clave',
      present: 'Actualidad'
    },
    en: {
      profile: 'Professional Profile', experience: 'Work Experience',
      education: 'Education', projects: 'Projects', certifications: 'Certifications',
      languages: 'Languages', achievements: 'Achievements', skills: 'Key Skills',
      present: 'Present'
    }
  };

  var levelMap = {
    es: { basic: 'Básico', intermediate: 'Intermedio', advanced: 'Avanzado', native: 'Nativo' },
    en: { basic: 'Basic', intermediate: 'Intermediate', advanced: 'Advanced', native: 'Native' }
  };

  function safeStr(v) { return (v != null && typeof v === 'string') ? v : ''; }
  function safeArr(v) { return Array.isArray(v) ? v : []; }

  function fmtDate(d, lang) {
    if (!d) return '';
    try {
      var dt = new Date(d);
      if (isNaN(dt.getTime())) return d;
      var mEs = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
      var mEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var m = lang === 'es' ? mEs : mEn;
      return m[dt.getMonth()] + ' ' + dt.getFullYear();
    } catch(e) { return d; }
  }

  function fmtRange(s, e, isCur, lang) {
    var start = fmtDate(s, lang);
    if (!e && !isCur) return start;
    var end = isCur ? (i18n[lang]?.present || 'Present') : fmtDate(e, lang);
    return start + ' - ' + end;
  }

  function escapeHtml(t) {
    var d = document.createElement('div');
    d.textContent = t;
    return d.innerHTML;
  }

  class GQRResumeNavybar extends HTMLElement {
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
        '  background: #fff;' +
        '}' +

        /* Navy header banner */
        '.header-banner {' +
        '  background: ' + navy + ';' +
        '  padding: 28px 36px 22px;' +
        '  text-align: center;' +
        '}' +
        '.header-name {' +
        '  font-size: 28px;' +
        '  font-weight: 700;' +
        '  color: #fff;' +
        '  letter-spacing: 0.5px;' +
        '}' +
        '.header-profession {' +
        '  font-size: 14px;' +
        '  font-weight: 400;' +
        '  color: rgba(255,255,255,0.8);' +
        '  margin-top: 2px;' +
        '}' +

        /* Contact pills */
        '.contact-row {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  justify-content: center;' +
        '  gap: 10px;' +
        '  padding: 14px 36px;' +
        '}' +
        '.ct-pill {' +
        '  display: inline-flex;' +
        '  align-items: center;' +
        '  gap: 5px;' +
        '  background: ' + navyLight + ';' +
        '  color: #fff;' +
        '  font-size: 10px;' +
        '  padding: 5px 14px;' +
        '  border-radius: 20px;' +
        '  white-space: nowrap;' +
        '}' +
        '.ct-icon { font-size: 11px; }' +

        /* Body content */
        '.body {' +
        '  padding: 16px 36px 32px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 16px;' +
        '}' +

        /* Section bar: full-width navy */
        '.sec-bar {' +
        '  background: ' + navy + ';' +
        '  text-align: center;' +
        '  padding: 6px 16px;' +
        '  margin-bottom: 10px;' +
        '}' +
        '.sec-bar-title {' +
        '  font-size: 13px;' +
        '  font-weight: 700;' +
        '  color: #fff;' +
        '  letter-spacing: 0.5px;' +
        '}' +

        /* Profile */
        '.profile-text {' +
        '  font-size: 11px;' +
        '  line-height: 1.65;' +
        '  color: ' + bodyText + ';' +
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
        '.exp-title-line {' +
        '  font-size: 12px;' +
        '}' +
        '.exp-role {' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.exp-company {' +
        '  color: ' + mutedText + ';' +
        '}' +
        '.exp-date {' +
        '  font-size: 10.5px;' +
        '  color: ' + mutedText + ';' +
        '}' +
        '.exp-bullets { list-style: none; margin-top: 4px; }' +
        '.exp-bullet {' +
        '  font-size: 10.5px;' +
        '  line-height: 1.55;' +
        '  color: ' + bodyText + ';' +
        '  padding-left: 13px;' +
        '  position: relative;' +
        '  margin-bottom: 2px;' +
        '}' +
        '.exp-bullet::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: ' + navy + ';' +
        '}' +

        /* Education - two-column grid */
        '.edu-grid {' +
        '  display: grid;' +
        '  grid-template-columns: 1fr 1fr;' +
        '  gap: 14px 24px;' +
        '}' +
        '.edu-cell { text-align: left; }' +
        '.edu-degree {' +
        '  font-size: 12px;' +
        '  font-weight: 700;' +
        '  color: ' + darkText + ';' +
        '}' +
        '.edu-inst {' +
        '  font-size: 10.5px;' +
        '  font-style: italic;' +
        '  color: ' + mutedText + ';' +
        '}' +
        '.edu-date {' +
        '  font-size: 10px;' +
        '  color: ' + lightText + ';' +
        '}' +
        '.edu-gpa {' +
        '  font-size: 10px;' +
        '  color: ' + lightText + ';' +
        '}' +

        /* Skills - two-column bulleted grid */
        '.skills-grid {' +
        '  display: grid;' +
        '  grid-template-columns: 1fr 1fr;' +
        '  gap: 4px 24px;' +
        '}' +
        '.skill-item {' +
        '  font-size: 10.5px;' +
        '  color: ' + bodyText + ';' +
        '  padding-left: 13px;' +
        '  position: relative;' +
        '  line-height: 1.6;' +
        '}' +
        '.skill-item::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: ' + navy + ';' +
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
        '  font-size: 12px;' +
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
        '  gap: 10px 24px;' +
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
        '  gap: 8px 24px;' +
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

      function secBar(label) {
        return '<div class="sec-bar"><span class="sec-bar-title">' + escapeHtml(label) + '</span></div>';
      }

      var html = css + '<div class="page">';

      /* Header banner */
      html += '<div class="header-banner" data-section="header">';
      if (fullName) html += '<div class="header-name">' + escapeHtml(fullName) + '</div>';
      if (profession) html += '<div class="header-profession">' + escapeHtml(profession) + '</div>';
      html += '</div>';

      /* Contact pills */
      var hasContact = email || phone || country || linkedin;
      if (hasContact) {
        html += '<div data-section="contact">';
        html += '<div class="contact-row">';
        if (phone) html += '<span class="ct-pill"><span class="ct-icon">☎</span> ' + escapeHtml(phone) + '</span>';
        if (email) html += '<span class="ct-pill"><span class="ct-icon">✉</span> ' + escapeHtml(email) + '</span>';
        if (country) html += '<span class="ct-pill"><span class="ct-icon">⚲</span> ' + escapeHtml(country) + '</span>';
        if (linkedin) html += '<span class="ct-pill"><span class="ct-icon">🔗</span> ' + escapeHtml(linkedin) + '</span>';
        html += '</div>';
        html += '</div>';
      }

      /* Body */
      html += '<div class="body">';

      /* Profile */
      if (summary) {
        html += '<div data-section="profile">';
        html += '<div class="profile-text">' + escapeHtml(summary) + '</div>';
        html += '</div>';
      }

      /* Skills */
      if (skills.length > 0) {
        html += '<div data-section="skills">';
        html += secBar(t.skills);
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
        html += secBar(t.experience);
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
          html += '<div class="exp-title-line">';
          if (position) html += '<span class="exp-role">' + escapeHtml(position) + '</span>';
          if (company) html += '<span class="exp-company">, ' + escapeHtml(company) + '</span>';
          html += '</div>';
          html += '</div>';
          html += '<div class="exp-right">';
          if (expRange) html += '<div class="exp-date">' + escapeHtml(expRange) + '</div>';
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
        html += '<div data-section="projects">';
        html += secBar(t.projects);
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
        html += secBar(t.achievements);
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
        html += secBar(t.education);
        html += '<div class="edu-grid">';
        for (var edi = 0; edi < education.length; edi++) {
          var edu = education[edi];
          var degree = safeStr(edu.degree);
          var field = safeStr(edu.field);
          var institution = safeStr(edu.institution);
          var gpa = edu.gpa;
          var eduRange = fmtRange(safeStr(edu.startDate), safeStr(edu.endDate), edu.isCompleted === false, lang);
          var degreeLine = degree + (field ? ' ' + field : '');

          html += '<div class="edu-cell" data-entry-id="' + escapeHtml(safeStr(edu.id)) + '">';
          if (degreeLine) html += '<div class="edu-degree">' + escapeHtml(degreeLine) + '</div>';
          if (institution) html += '<div class="edu-inst">' + escapeHtml(institution) + '</div>';
          if (eduRange) html += '<div class="edu-date">' + escapeHtml(eduRange) + '</div>';
          if (gpa) html += '<div class="edu-gpa">GPA: ' + escapeHtml(String(gpa)) + '</div>';
          html += '</div>';
        }
        html += '</div>';
        html += '</div>';
      }

      /* Certifications */
      if (certifications.length > 0) {
        html += '<div data-section="certifications">';
        html += secBar(t.certifications);
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
        html += secBar(t.languages);
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

      html += '</div>'; // body
      html += '</div>'; // page

      if (this.shadowRoot) { this.shadowRoot.innerHTML = html; }
    }
  }

  if (!customElements.get('gqr-resume-navybar')) {
    customElements.define('gqr-resume-navybar', GQRResumeNavybar);
  }
})();
