/**
 * name: gqr-resume-pristine
 * description: "Clean single-column resume with centered section headings flanked by decorative lines, dates in a left margin, multi-column skills grid, and dot-rated languages."
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

  class GQRResumePristine extends HTMLElement {
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
      const email = safeStr(data.email);
      const phone = safeStr(data.phone);
      const linkedin = safeStr(data.linkedin);
      const summary = safeStr(data.summary);

      const skillsRaw = safeArr(data.skillsRaw);
      const toolsRaw = data.toolsRaw ? safeArr(data.toolsRaw) : [];
      const skills = [...skillsRaw, ...toolsRaw.filter(function(t) { return !skillsRaw.includes(t); })];
      const experience = safeArr(data.experience);
      const education = safeArr(data.education);
      const projects = safeArr(data.projects);
      const certifications = safeArr(data.certifications);
      const languages = safeArr(data.languages);
      const achievements = safeArr(data.achievements);

      var contactParts = [];
      if (email) contactParts.push('<span class="contact-item"><span class="contact-icon">✉</span> ' + escapeHtml(email) + '</span>');
      if (phone) contactParts.push('<span class="contact-item"><span class="contact-icon">☎</span> ' + escapeHtml(phone) + '</span>');
      if (country) contactParts.push('<span class="contact-item"><span class="contact-icon">⚲</span> ' + escapeHtml(country) + '</span>');
      if (linkedin) contactParts.push('<span class="contact-item"><span class="contact-icon">🔗</span> ' + escapeHtml(linkedin) + '</span>');

      /* ── CSS ─────────────────────────────────────────── */

      var styles = '<style>' +
        ':host {' +
        '  display: block;' +
        '  font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;' +
        '  font-size: 12.5px;' +
        '  line-height: 1.55;' +
        '  color: #333;' +
        '  background: #fff;' +
        '}' +
        '* { margin: 0; padding: 0; box-sizing: border-box; }' +

        '.page {' +
        '  width: 210mm;' +
        '  min-height: 297mm;' +
        '  height: auto;' +
        '  overflow: visible;' +
        '  margin: 0 auto;' +
        '  padding: 40px 44px 44px;' +
        '  background: #fff;' +
        '}' +

        /* ── Header ── */
        '.header { text-align: center; margin-bottom: 24px; }' +
        '.header-name {' +
        '  font-size: 28px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '  letter-spacing: 0.5px;' +
        '  line-height: 1.2;' +
        '  margin-bottom: 4px;' +
        '}' +
        '.header-profession {' +
        '  font-size: 14px;' +
        '  font-weight: 400;' +
        '  color: #666;' +
        '  font-style: italic;' +
        '  margin-bottom: 12px;' +
        '}' +
        '.header-contact {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  justify-content: center;' +
        '  gap: 6px 18px;' +
        '  font-size: 11px;' +
        '  color: #555;' +
        '}' +
        '.contact-item { white-space: nowrap; }' +
        '.contact-icon { font-size: 11px; margin-right: 3px; }' +

        /* ── Section headings — centered with flanking lines ── */
        '.section { margin-bottom: 18px; }' +
        '.section-title {' +
        '  display: flex;' +
        '  align-items: center;' +
        '  gap: 14px;' +
        '  margin-bottom: 12px;' +
        '}' +
        '.section-title::before, .section-title::after {' +
        '  content: "";' +
        '  flex: 1;' +
        '  height: 1px;' +
        '  background: #bbb;' +
        '}' +
        '.section-title-text {' +
        '  font-size: 13px;' +
        '  font-weight: 700;' +
        '  text-transform: uppercase;' +
        '  letter-spacing: 1.5px;' +
        '  color: #222;' +
        '  white-space: nowrap;' +
        '}' +

        /* ── Profile ── */
        '.profile-text {' +
        '  font-size: 12.5px;' +
        '  line-height: 1.65;' +
        '  color: #444;' +
        '  text-align: center;' +
        '}' +

        /* ── Date-left entries (experience, education) ── */
        '.date-entry {' +
        '  display: flex;' +
        '  gap: 20px;' +
        '  margin-bottom: 14px;' +
        '}' +
        '.date-entry:last-child { margin-bottom: 0; }' +
        '.date-col {' +
        '  flex: 0 0 120px;' +
        '  text-align: right;' +
        '  padding-top: 1px;' +
        '}' +
        '.date-range {' +
        '  font-size: 11px;' +
        '  color: #777;' +
        '  line-height: 1.4;' +
        '}' +
        '.date-location {' +
        '  font-size: 10.5px;' +
        '  color: #999;' +
        '  margin-top: 2px;' +
        '}' +
        '.detail-col { flex: 1; }' +
        '.entry-title {' +
        '  font-size: 13px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.entry-company {' +
        '  font-size: 12px;' +
        '  color: #555;' +
        '  font-style: italic;' +
        '  margin-bottom: 4px;' +
        '}' +
        '.entry-bullets {' +
        '  list-style: none;' +
        '  margin-top: 4px;' +
        '}' +
        '.entry-bullets li {' +
        '  font-size: 12px;' +
        '  line-height: 1.55;' +
        '  color: #444;' +
        '  padding-left: 14px;' +
        '  position: relative;' +
        '  margin-bottom: 2px;' +
        '}' +
        '.entry-bullets li::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: #888;' +
        '}' +

        /* ── Education ── */
        '.edu-degree {' +
        '  font-size: 13px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.edu-institution {' +
        '  font-size: 12px;' +
        '  color: #555;' +
        '  font-style: italic;' +
        '}' +
        '.edu-gpa {' +
        '  font-size: 11px;' +
        '  color: #777;' +
        '  margin-top: 2px;' +
        '}' +

        /* ── Skills — 3-column grid ── */
        '.skills-grid {' +
        '  display: grid;' +
        '  grid-template-columns: repeat(3, 1fr);' +
        '  gap: 4px 24px;' +
        '}' +
        '.skill-item {' +
        '  font-size: 12px;' +
        '  color: #444;' +
        '  padding-left: 14px;' +
        '  position: relative;' +
        '  line-height: 1.6;' +
        '}' +
        '.skill-item::before {' +
        '  content: "•";' +
        '  position: absolute;' +
        '  left: 0;' +
        '  color: #888;' +
        '}' +

        /* ── Projects ── */
        '.proj-entry { margin-bottom: 12px; }' +
        '.proj-entry:last-child { margin-bottom: 0; }' +
        '.proj-name {' +
        '  font-size: 13px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.proj-tech {' +
        '  font-size: 11px;' +
        '  color: #777;' +
        '  font-style: italic;' +
        '}' +
        '.proj-desc {' +
        '  font-size: 12px;' +
        '  color: #444;' +
        '  line-height: 1.55;' +
        '  margin-top: 2px;' +
        '}' +
        '.proj-link {' +
        '  font-size: 11px;' +
        '  color: #555;' +
        '  text-decoration: none;' +
        '}' +
        '.proj-link:hover { text-decoration: underline; }' +

        /* ── Achievements ── */
        '.ach-entry { margin-bottom: 10px; }' +
        '.ach-entry:last-child { margin-bottom: 0; }' +
        '.ach-title {' +
        '  font-size: 13px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '  display: inline;' +
        '}' +
        '.ach-year {' +
        '  font-size: 11px;' +
        '  color: #777;' +
        '  margin-left: 6px;' +
        '}' +
        '.ach-desc {' +
        '  font-size: 12px;' +
        '  color: #555;' +
        '  line-height: 1.55;' +
        '  margin-top: 1px;' +
        '}' +

        /* ── Certifications ── */
        '.cert-entry { margin-bottom: 8px; }' +
        '.cert-entry:last-child { margin-bottom: 0; }' +
        '.cert-name {' +
        '  font-size: 12.5px;' +
        '  font-weight: 700;' +
        '  color: #1a1a1a;' +
        '}' +
        '.cert-issuer {' +
        '  font-size: 12px;' +
        '  color: #555;' +
        '}' +
        '.cert-date {' +
        '  font-size: 11px;' +
        '  color: #777;' +
        '}' +

        /* ── Languages — dot rating ── */
        '.lang-row {' +
        '  display: inline-flex;' +
        '  align-items: center;' +
        '  margin-right: 32px;' +
        '  margin-bottom: 6px;' +
        '}' +
        '.lang-name {' +
        '  font-size: 12.5px;' +
        '  font-weight: 600;' +
        '  color: #333;' +
        '  min-width: 80px;' +
        '}' +
        '.lang-dots {' +
        '  font-size: 13px;' +
        '  letter-spacing: 3px;' +
        '  color: #444;' +
        '}' +
        '.lang-label {' +
        '  font-size: 10.5px;' +
        '  color: #888;' +
        '  font-style: italic;' +
        '  margin-left: 6px;' +
        '}' +
        '.langs-container {' +
        '  display: flex;' +
        '  flex-wrap: wrap;' +
        '  justify-content: center;' +
        '  gap: 4px 0;' +
        '}' +

        '@media print {' +
        '  .page { width: 210mm; min-height: 297mm; }' +
        '}' +
      '</style>';

      /* ── Build HTML ────────────────────────────────── */

      var html = styles + '<div class="page">';

      // ── 1. Header ──
      if (fullName || profession || contactParts.length) {
        html += '<div class="header" data-section="header">';
        if (fullName) html += '<div class="header-name">' + escapeHtml(fullName) + '</div>';
        if (profession) html += '<div class="header-profession">' + escapeHtml(profession) + '</div>';
        if (contactParts.length) {
          html += '<div class="header-contact">' + contactParts.join('') + '</div>';
        }
        html += '</div>';
      }

      // Helper for centered section titles with flanking lines
      function sectionTitle(text) {
        return '<div class="section-title"><span class="section-title-text">' + escapeHtml(text) + '</span></div>';
      }

      // ── 2. Profile ──
      if (summary) {
        html += '<div class="section" data-section="profile">' +
          sectionTitle(t.profile) +
          '<div class="profile-text">' + escapeHtml(summary) + '</div>' +
          '</div>';
      }

      // ── 3. Skills (3-column grid) ──
      if (skills.length > 0) {
        html += '<div class="section" data-section="skills">' +
          sectionTitle(t.skills) +
          '<div class="skills-grid">';
        for (var si = 0; si < skills.length; si++) {
          html += '<div class="skill-item">' + escapeHtml(safeStr(skills[si])) + '</div>';
        }
        html += '</div></div>';
      }

      // ── 4. Work Experience (date on left) ──
      if (experience.length > 0) {
        html += '<div class="section" data-section="experience">' +
          sectionTitle(t.experience);

        for (var ei = 0; ei < experience.length; ei++) {
          var exp = experience[ei];
          var position = safeStr(exp.title);
          var company = safeStr(exp.company);
          var expBullets = safeArr(exp.achievements).concat(safeArr(exp.responsibilities));
          var expRange = formatDateRange(safeStr(exp.startDate), safeStr(exp.endDate), exp.isCurrent || false, lang);

          html += '<div class="date-entry" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          html += '<div class="date-col">';
          if (expRange) html += '<div class="date-range">' + escapeHtml(expRange) + '</div>';
          html += '</div>';
          html += '<div class="detail-col">';
          if (company) html += '<div class="entry-company">' + escapeHtml(company) + '</div>';
          if (position) html += '<div class="entry-title">' + escapeHtml(position) + '</div>';

          if (expBullets.length > 0) {
            html += '<ul class="entry-bullets">';
            for (var bi = 0; bi < expBullets.length; bi++) {
              var txt = safeStr(expBullets[bi]);
              if (txt) html += '<li>' + escapeHtml(txt) + '</li>';
            }
            html += '</ul>';
          }
          html += '</div></div>';
        }
        html += '</div>';
      }

      // ── 5. Projects ──
      if (projects.length > 0) {
        html += '<div class="section" data-section="projects">' +
          sectionTitle(t.projects);

        for (var pi = 0; pi < projects.length; pi++) {
          var proj = projects[pi];
          var projName = safeStr(proj.name);
          var projDesc = safeStr(proj.description);
          var projTech = safeArr(proj.technologies);
          var projUrl = safeStr(proj.url);

          html += '<div class="proj-entry" data-entry-id="' + escapeHtml(safeStr(proj.id)) + '">';
          html += '<span class="proj-name">' + escapeHtml(projName) + '</span>';
          if (projTech.length > 0) {
            html += ' <span class="proj-tech">(' + projTech.map(function(t) { return escapeHtml(safeStr(t)); }).join(', ') + ')</span>';
          }
          if (projUrl) html += ' <a class="proj-link" href="' + escapeHtml(projUrl) + '" target="_blank" rel="noopener">🔗</a>';
          if (projDesc) html += '<div class="proj-desc">' + escapeHtml(projDesc) + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      // ── 6. Achievements ──
      if (achievements.length > 0) {
        html += '<div class="section" data-section="achievements">' +
          sectionTitle(t.achievements);

        for (var ai = 0; ai < achievements.length; ai++) {
          var ach = achievements[ai];
          html += '<div class="ach-entry" data-entry-id="' + escapeHtml(safeStr(ach.id)) + '">';
          html += '<span class="ach-title">' + escapeHtml(safeStr(ach.title)) + '</span>';
          if (ach.year) html += '<span class="ach-year">(' + escapeHtml(String(ach.year)) + ')</span>';
          if (ach.description) html += '<div class="ach-desc">' + escapeHtml(safeStr(ach.description)) + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      // ── 7. Education (date on left) ──
      if (education.length > 0) {
        html += '<div class="section" data-section="education">' +
          sectionTitle(t.education);

        for (var edi = 0; edi < education.length; edi++) {
          var edu = education[edi];
          var degree = safeStr(edu.degree);
          var field = safeStr(edu.field);
          var institution = safeStr(edu.institution);
          var gpa = edu.gpa;
          var eduRange = formatDateRange(safeStr(edu.startDate), safeStr(edu.endDate), edu.isCompleted === false, lang);
          var degreeLine = degree + (field ? ' — ' + field : '');

          html += '<div class="date-entry" data-entry-id="' + escapeHtml(safeStr(edu.id)) + '">';
          html += '<div class="date-col">';
          if (eduRange) html += '<div class="date-range">' + escapeHtml(eduRange) + '</div>';
          html += '</div>';
          html += '<div class="detail-col">';
          if (degreeLine) html += '<div class="edu-degree">' + escapeHtml(degreeLine) + '</div>';
          if (institution) html += '<div class="edu-institution">' + escapeHtml(institution) + '</div>';
          if (gpa) html += '<div class="edu-gpa">GPA: ' + escapeHtml(String(gpa)) + '</div>';
          html += '</div></div>';
        }
        html += '</div>';
      }

      // ── 8. Certifications ──
      if (certifications.length > 0) {
        html += '<div class="section" data-section="certifications">' +
          sectionTitle(t.certifications);

        for (var ci = 0; ci < certifications.length; ci++) {
          var cert = certifications[ci];
          html += '<div class="cert-entry" data-entry-id="' + escapeHtml(safeStr(cert.id)) + '">';
          html += '<span class="cert-name">' + escapeHtml(safeStr(cert.name)) + '</span>';
          if (cert.issuer) html += ' <span class="cert-issuer">— ' + escapeHtml(safeStr(cert.issuer)) + '</span>';
          if (cert.date) html += ' <span class="cert-date">(' + escapeHtml(formatDate(cert.date, lang)) + ')</span>';
          html += '</div>';
        }
        html += '</div>';
      }

      // ── 9. Languages (dot rating, inline) ──
      if (languages.length > 0) {
        html += '<div class="section" data-section="languages">' +
          sectionTitle(t.languages) +
          '<div class="langs-container">';

        var lMap = levelMap[lang] || levelMap.en;

        for (var li = 0; li < languages.length; li++) {
          var langItem = languages[li];
          var langName = safeStr(langItem.name);
          var langLevel = safeStr(langItem.level || 'basic');
          var langLabel = lMap[langLevel] || langLevel;

          html += '<div class="lang-row" data-entry-id="' + escapeHtml(safeStr(langItem.id)) + '">' +
            '<span class="lang-name">' + escapeHtml(langName) + '</span>' +
            '<span class="lang-dots">' + levelDots(langLevel) + '</span>' +
            '</div>';
        }
        html += '</div></div>';
      }

      html += '</div>'; // close .page

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = html;
      }
    }
  }

  if (!customElements.get('gqr-resume-pristine')) {
    customElements.define('gqr-resume-pristine', GQRResumePristine);
  }
})();
