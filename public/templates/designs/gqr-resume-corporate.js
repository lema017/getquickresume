/**
 * name: gqr-resume-corporate
 * description: "Corporate single-column resume with centered header, uppercase section headings flanked by horizontal rules, and a refined black/dark-gray palette."
 */

(function() {
  'use strict';

  const i18n = {
    es: {
      summary: "Resumen", profile: "Perfil", experience: "Experiencia Laboral",
      education: "Educación", projects: "Proyectos", certifications: "Certificaciones",
      languages: "Idiomas", achievements: "Logros", skills: "Habilidades",
      current: "Actual", present: "Presente",
      basic: "Básico", intermediate: "Intermedio", advanced: "Avanzado", native: "Nativo"
    },
    en: {
      summary: "Summary", profile: "Profile", experience: "Work Experience",
      education: "Education", projects: "Projects", certifications: "Certifications",
      languages: "Languages", achievements: "Achievements", skills: "Skills",
      current: "Current", present: "Present",
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

  class GQRResumeCorporate extends HTMLElement {
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

      const contactParts = [];
      if (email) contactParts.push('<span class="contact-piece">✉ ' + escapeHtml(email) + '</span>');
      if (phone) contactParts.push('<span class="contact-piece">☎ ' + escapeHtml(phone) + '</span>');
      if (country) contactParts.push('<span class="contact-piece">⚲ ' + escapeHtml(country) + '</span>');
      if (linkedin) contactParts.push('<span class="contact-piece">🔗 ' + escapeHtml(linkedin) + '</span>');

      const styles = `
        <style>
          :host {
            display: block;
            font-family: 'Segoe UI', Roboto, sans-serif;
            line-height: 1.55;
            color: #222;
            -webkit-font-smoothing: antialiased;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .page {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            background: #fff;
            padding: 42px 52px 48px;
          }

          /* ── Header ─────────────────────────────── */

          .header {
            text-align: center;
            padding-bottom: 22px;
            border-bottom: 2px solid #222;
            margin-bottom: 26px;
          }

          .header-name {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #111;
            margin-bottom: 4px;
          }

          .header-profession {
            font-size: 15px;
            font-weight: 400;
            text-transform: uppercase;
            letter-spacing: 1.6px;
            color: #444;
            margin-bottom: 10px;
          }

          .header-contact {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 6px 0;
            font-size: 12.5px;
            color: #333;
          }

          .contact-piece {
            white-space: nowrap;
          }

          .contact-piece + .contact-piece::before {
            content: '|';
            margin: 0 10px;
            color: #999;
          }

          /* ── Section heading (─── TITLE ───) ──── */

          .section-heading {
            display: flex;
            align-items: center;
            margin: 24px 0 14px;
          }

          .section-heading::before,
          .section-heading::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid #333;
          }

          .section-heading-text {
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2.5px;
            color: #222;
            padding: 0 14px;
            white-space: nowrap;
          }

          /* ── Summary ────────────────────────────── */

          .summary-text {
            font-size: 13.5px;
            line-height: 1.7;
            color: #333;
            text-align: justify;
          }

          /* ── Education ──────────────────────────── */

          .edu-item {
            margin-bottom: 14px;
          }

          .edu-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          }

          .edu-institution {
            font-size: 14px;
            font-weight: 700;
            color: #111;
          }

          .edu-date {
            font-size: 12.5px;
            color: #555;
            white-space: nowrap;
            margin-left: 16px;
            flex-shrink: 0;
          }

          .edu-degree {
            font-size: 13px;
            color: #333;
            margin-top: 1px;
          }

          .edu-gpa {
            font-size: 12px;
            color: #666;
            margin-top: 2px;
          }

          /* ── Experience ─────────────────────────── */

          .exp-item {
            margin-bottom: 18px;
          }

          .exp-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          }

          .exp-title {
            font-size: 14px;
            font-weight: 700;
            color: #111;
          }

          .exp-company {
            font-weight: 400;
            color: #444;
          }

          .exp-date {
            font-size: 12.5px;
            color: #555;
            white-space: nowrap;
            margin-left: 16px;
            flex-shrink: 0;
          }

          .exp-bullets {
            list-style: none;
            margin-top: 6px;
          }

          .exp-bullet {
            font-size: 13px;
            line-height: 1.6;
            padding-left: 16px;
            position: relative;
            margin-bottom: 3px;
            color: #333;
          }

          .exp-bullet::before {
            content: '–';
            position: absolute;
            left: 0;
            color: #555;
          }

          /* ── Projects ──────────────────────────── */

          .proj-item {
            margin-bottom: 14px;
          }

          .proj-name {
            font-size: 14px;
            font-weight: 700;
            color: #111;
          }

          .proj-link {
            font-size: 12px;
            color: #555;
            text-decoration: none;
            margin-left: 6px;
          }

          .proj-link:hover {
            text-decoration: underline;
          }

          .proj-description {
            font-size: 13px;
            color: #333;
            line-height: 1.6;
            margin-top: 2px;
          }

          .proj-tech {
            font-size: 12.5px;
            color: #555;
            font-style: italic;
            margin-top: 2px;
          }

          /* ── Skills ────────────────────────────── */

          .skills-list {
            font-size: 13px;
            color: #333;
            line-height: 1.7;
          }

          /* ── Certifications ────────────────────── */

          .cert-item {
            margin-bottom: 10px;
          }

          .cert-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          }

          .cert-name {
            font-size: 13.5px;
            font-weight: 700;
            color: #111;
          }

          .cert-date {
            font-size: 12.5px;
            color: #555;
            white-space: nowrap;
            margin-left: 16px;
            flex-shrink: 0;
          }

          .cert-issuer {
            font-size: 12.5px;
            color: #555;
          }

          /* ── Languages ─────────────────────────── */

          .lang-item {
            font-size: 13px;
            color: #333;
            margin-bottom: 4px;
          }

          .lang-name {
            font-weight: 600;
          }

          .lang-sep {
            color: #999;
            margin: 0 6px;
          }

          /* ── Achievements ──────────────────────── */

          .ach-item {
            margin-bottom: 12px;
          }

          .ach-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          }

          .ach-title {
            font-size: 13.5px;
            font-weight: 700;
            color: #111;
          }

          .ach-year {
            font-size: 12.5px;
            color: #555;
            white-space: nowrap;
            margin-left: 16px;
            flex-shrink: 0;
          }

          .ach-description {
            font-size: 13px;
            color: #333;
            line-height: 1.6;
            margin-top: 2px;
          }

          /* ── Print ─────────────────────────────── */

          @media print {
            .page {
              padding: 36px 44px 40px;
            }
          }
        </style>
      `;

      let html = styles + '<div class="page">';

      /* ── Header ─────────────────────────────── */
      if (fullName || profession || contactParts.length > 0) {
        html += '<div class="header" data-section="header">';
        if (fullName) html += '<div class="header-name">' + escapeHtml(fullName) + '</div>';
        if (profession) html += '<div class="header-profession">' + escapeHtml(profession) + '</div>';
        if (contactParts.length > 0) html += '<div class="header-contact">' + contactParts.join('') + '</div>';
        html += '</div>';
      }

      /* ── Summary ────────────────────────────── */
      if (summary) {
        html += '<div data-section="profile">';
        html += '<div class="section-heading"><span class="section-heading-text">' + escapeHtml(t.summary) + '</span></div>';
        html += '<div class="summary-text">' + escapeHtml(summary) + '</div>';
        html += '</div>';
      }

      /* ── Skills ────────────────────────────── */
      if (skills.length > 0) {
        html += '<div data-section="skills">';
        html += '<div class="section-heading"><span class="section-heading-text">' + escapeHtml(t.skills) + '</span></div>';
        html += '<div class="skills-list">' + skills.map(function(s) { return escapeHtml(safeStr(s)); }).join(', ') + '</div>';
        html += '</div>';
      }

      /* ── Experience ─────────────────────────── */
      if (experience.length > 0) {
        html += '<div data-section="experience">';
        html += '<div class="section-heading"><span class="section-heading-text">' + escapeHtml(t.experience) + '</span></div>';
        experience.forEach(function(exp) {
          var position = safeStr(exp.title);
          var company = safeStr(exp.company);
          var dateRange = formatDateRange(safeStr(exp.startDate), safeStr(exp.endDate), !!exp.isCurrent, lang);
          var achievements = safeArr(exp.achievements);
          var responsibilities = safeArr(exp.responsibilities);
          var bullets = achievements.concat(responsibilities);

          html += '<div class="exp-item" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          html += '<div class="exp-row">';
          html += '<span class="exp-title">' + escapeHtml(position) + (company ? ' <span class="exp-company">— ' + escapeHtml(company) + '</span>' : '') + '</span>';
          if (dateRange) html += '<span class="exp-date">' + escapeHtml(dateRange) + '</span>';
          html += '</div>';
          if (bullets.length > 0) {
            html += '<ul class="exp-bullets">';
            bullets.forEach(function(b) {
              var text = safeStr(b);
              if (text) html += '<li class="exp-bullet">' + escapeHtml(text) + '</li>';
            });
            html += '</ul>';
          }
          html += '</div>';
        });
        html += '</div>';
      }

      /* ── Projects ──────────────────────────── */
      if (projects.length > 0) {
        html += '<div data-section="projects">';
        html += '<div class="section-heading"><span class="section-heading-text">' + escapeHtml(t.projects) + '</span></div>';
        projects.forEach(function(proj) {
          var name = safeStr(proj.name);
          var description = safeStr(proj.description);
          var technologies = safeArr(proj.technologies);
          var url = safeStr(proj.url);

          html += '<div class="proj-item" data-entry-id="' + escapeHtml(safeStr(proj.id)) + '">';
          html += '<span class="proj-name">' + escapeHtml(name) + '</span>';
          if (url) html += '<a href="' + escapeHtml(url) + '" class="proj-link" target="_blank" rel="noopener">🔗</a>';
          if (description) html += '<div class="proj-description">' + escapeHtml(description) + '</div>';
          if (technologies.length > 0) html += '<div class="proj-tech">(' + technologies.map(function(t) { return escapeHtml(safeStr(t)); }).join(', ') + ')</div>';
          html += '</div>';
        });
        html += '</div>';
      }

      /* ── Achievements ──────────────────────── */
      if (achievements.length > 0) {
        html += '<div data-section="achievements">';
        html += '<div class="section-heading"><span class="section-heading-text">' + escapeHtml(t.achievements) + '</span></div>';
        achievements.forEach(function(ach) {
          var title = safeStr(ach.title);
          var description = safeStr(ach.description);
          var year = ach.year;

          html += '<div class="ach-item" data-entry-id="' + escapeHtml(safeStr(ach.id)) + '">';
          html += '<div class="ach-row">';
          html += '<span class="ach-title">' + escapeHtml(title) + '</span>';
          if (year) html += '<span class="ach-year">' + escapeHtml(String(year)) + '</span>';
          html += '</div>';
          if (description) html += '<div class="ach-description">' + escapeHtml(description) + '</div>';
          html += '</div>';
        });
        html += '</div>';
      }

      /* ── Education ──────────────────────────── */
      if (education.length > 0) {
        html += '<div data-section="education">';
        html += '<div class="section-heading"><span class="section-heading-text">' + escapeHtml(t.education) + '</span></div>';
        education.forEach(function(edu) {
          var institution = safeStr(edu.institution);
          var degree = safeStr(edu.degree);
          var field = safeStr(edu.field);
          var gpa = edu.gpa;
          var dateRange = formatDateRange(safeStr(edu.startDate), safeStr(edu.endDate), edu.isCompleted === false, lang);
          var degreeLine = degree + (field ? ' — ' + field : '');

          html += '<div class="edu-item" data-entry-id="' + escapeHtml(safeStr(edu.id)) + '">';
          html += '<div class="edu-row">';
          html += '<span class="edu-institution">' + escapeHtml(institution) + '</span>';
          if (dateRange) html += '<span class="edu-date">' + escapeHtml(dateRange) + '</span>';
          html += '</div>';
          if (degreeLine) html += '<div class="edu-degree">' + escapeHtml(degreeLine) + '</div>';
          if (gpa) html += '<div class="edu-gpa">GPA: ' + escapeHtml(String(gpa)) + '</div>';
          html += '</div>';
        });
        html += '</div>';
      }

      /* ── Certifications ────────────────────── */
      if (certifications.length > 0) {
        html += '<div data-section="certifications">';
        html += '<div class="section-heading"><span class="section-heading-text">' + escapeHtml(t.certifications) + '</span></div>';
        certifications.forEach(function(cert) {
          var name = safeStr(cert.name);
          var issuer = safeStr(cert.issuer);
          var date = safeStr(cert.date);

          html += '<div class="cert-item" data-entry-id="' + escapeHtml(safeStr(cert.id)) + '">';
          html += '<div class="cert-row">';
          html += '<span class="cert-name">' + escapeHtml(name) + '</span>';
          if (date) html += '<span class="cert-date">' + escapeHtml(formatDate(date, lang)) + '</span>';
          html += '</div>';
          if (issuer) html += '<div class="cert-issuer">' + escapeHtml(issuer) + '</div>';
          html += '</div>';
        });
        html += '</div>';
      }

      /* ── Languages ─────────────────────────── */
      if (languages.length > 0) {
        html += '<div data-section="languages">';
        html += '<div class="section-heading"><span class="section-heading-text">' + escapeHtml(t.languages) + '</span></div>';
        languages.forEach(function(langItem) {
          var name = safeStr(langItem.name);
          var rawLevel = safeStr(langItem.level || 'basic');
          var langMap = levelMap[lang] || levelMap.en;
          var levelLabel = langMap[rawLevel] || rawLevel;

          html += '<div class="lang-item" data-entry-id="' + escapeHtml(safeStr(langItem.id)) + '"><span class="lang-name">' + escapeHtml(name) + '</span><span class="lang-sep">—</span>' + escapeHtml(levelLabel) + '</div>';
        });
        html += '</div>';
      }

      html += '</div>';

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = html;
      }
    }
  }

  if (!customElements.get('gqr-resume-corporate')) {
    customElements.define('gqr-resume-corporate', GQRResumeCorporate);
  }
})();
