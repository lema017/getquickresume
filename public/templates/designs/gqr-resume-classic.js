/**
 * name: gqr-resume-classic
 * description: "Traditional single-column resume with serif headings, thin underlines, and a timeless black/gray palette on A4."
 */

(function() {
  'use strict';

  const i18n = {
    es: {
      summary: "Resumen", profile: "Perfil", experience: "Experiencia Profesional",
      education: "Educación", projects: "Proyectos", certifications: "Certificaciones",
      languages: "Idiomas", achievements: "Logros", skills: "Habilidades",
      current: "Actual", present: "Presente",
      basic: "Básico", intermediate: "Intermedio", advanced: "Avanzado", native: "Nativo"
    },
    en: {
      summary: "Summary", profile: "Profile", experience: "Professional Experience",
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

  function levelDots(level) {
    const map = { basic: 2, intermediate: 3, advanced: 4, native: 5 };
    const filled = map[level] || 2;
    return '●'.repeat(filled) + '○'.repeat(5 - filled);
  }

  class GQRResumeClassic extends HTMLElement {
    constructor() {
      super();
      this._data = null;
      this._shadowRootRef = null;
    }

    static get observedAttributes() { return ['language']; }

    connectedCallback() {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
      }
      this.render();
    }

    attributeChangedCallback() {
      if (this.shadowRoot) { this.render(); }
    }

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
      if (email) contactParts.push('✉ ' + escapeHtml(email));
      if (phone) contactParts.push('☎ ' + escapeHtml(phone));
      if (country) contactParts.push('⚲ ' + escapeHtml(country));
      if (linkedin) contactParts.push('🔗 ' + escapeHtml(linkedin));

      const styles = `<style>
  :host {
    display: block;
    font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 13px;
    line-height: 1.55;
    color: #222;
    background: #fff;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }

  .page {
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    padding: 42px 48px 48px;
    background: #fff;
  }

  /* ── Header ── */
  .header { margin-bottom: 20px; }
  .header-name {
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #111;
    line-height: 1.2;
    margin-bottom: 2px;
  }
  .header-profession {
    font-size: 15px;
    font-style: italic;
    color: #444;
    margin-bottom: 10px;
  }
  .header-contact {
    font-size: 12.5px;
    color: #555;
    line-height: 1.5;
    border-top: 1px solid #bbb;
    padding-top: 8px;
  }
  .header-contact span { white-space: nowrap; }
  .header-contact .sep { margin: 0 8px; color: #aaa; }

  /* ── Section headings ── */
  .section { margin-bottom: 18px; }
  .section-title {
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #111;
    padding-bottom: 4px;
    border-bottom: 1px solid #333;
    margin-bottom: 12px;
  }

  /* ── Profile / Summary ── */
  .profile-text {
    font-size: 13px;
    line-height: 1.65;
    color: #333;
    text-align: justify;
  }

  /* ── Experience ── */
  .exp-entry { margin-bottom: 16px; }
  .exp-entry:last-child { margin-bottom: 0; }
  .exp-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    margin-bottom: 2px;
  }
  .exp-title {
    font-size: 14px;
    font-weight: 700;
    color: #111;
  }
  .exp-date {
    font-size: 12.5px;
    color: #555;
    white-space: nowrap;
    text-align: right;
  }
  .exp-company {
    font-size: 13px;
    font-weight: 600;
    color: #333;
    margin-bottom: 4px;
  }
  .exp-bullets {
    list-style: none;
    padding-left: 16px;
    margin-top: 4px;
  }
  .exp-bullets li {
    position: relative;
    font-size: 13px;
    line-height: 1.55;
    color: #333;
    margin-bottom: 3px;
    padding-left: 2px;
  }
  .exp-bullets li::before {
    content: '•';
    position: absolute;
    left: -14px;
    color: #555;
  }

  /* ── Education ── */
  .edu-entry { margin-bottom: 12px; }
  .edu-entry:last-child { margin-bottom: 0; }
  .edu-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
  }
  .edu-degree {
    font-size: 14px;
    font-weight: 700;
    color: #111;
  }
  .edu-date {
    font-size: 12.5px;
    color: #555;
    white-space: nowrap;
    text-align: right;
  }
  .edu-institution {
    font-size: 13px;
    font-style: italic;
    color: #444;
  }
  .edu-gpa {
    font-size: 12px;
    color: #666;
    margin-top: 2px;
  }

  /* ── Skills ── */
  .skills-list {
    font-size: 13px;
    line-height: 1.7;
    color: #333;
  }
  .skills-list .skill-sep { margin: 0 6px; color: #aaa; }

  /* ── Projects ── */
  .proj-entry { margin-bottom: 12px; }
  .proj-entry:last-child { margin-bottom: 0; }
  .proj-name {
    font-size: 14px;
    font-weight: 700;
    color: #111;
    display: inline;
  }
  .proj-tech {
    font-size: 12px;
    color: #666;
    font-style: italic;
  }
  .proj-desc {
    font-size: 13px;
    color: #333;
    line-height: 1.55;
    margin-top: 2px;
  }
  .proj-link {
    font-size: 12px;
    color: #444;
    text-decoration: none;
  }
  .proj-link:hover { text-decoration: underline; }

  /* ── Certifications ── */
  .cert-entry { margin-bottom: 8px; }
  .cert-entry:last-child { margin-bottom: 0; }
  .cert-name {
    font-size: 13px;
    font-weight: 700;
    color: #111;
  }
  .cert-issuer {
    font-size: 13px;
    color: #555;
  }
  .cert-date {
    font-size: 12px;
    color: #777;
  }

  /* ── Languages ── */
  .lang-entry {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 13px;
  }
  .lang-entry:last-child { margin-bottom: 0; }
  .lang-name {
    min-width: 120px;
    font-weight: 600;
    color: #222;
  }
  .lang-dots {
    font-size: 14px;
    letter-spacing: 2px;
    color: #333;
    margin-right: 8px;
  }
  .lang-label {
    font-size: 12px;
    color: #777;
    font-style: italic;
  }

  /* ── Achievements ── */
  .ach-entry { margin-bottom: 10px; }
  .ach-entry:last-child { margin-bottom: 0; }
  .ach-title {
    font-size: 13px;
    font-weight: 700;
    color: #111;
    display: inline;
  }
  .ach-year {
    font-size: 12px;
    color: #777;
    margin-left: 6px;
  }
  .ach-desc {
    font-size: 13px;
    color: #444;
    line-height: 1.55;
    margin-top: 1px;
  }
</style>`;

      let html = styles + '<div class="page">';

      // ── 1. Header ──
      if (fullName || profession || contactParts.length) {
        html += '<div class="header" data-section="header">';
        if (fullName) html += '<div class="header-name">' + escapeHtml(fullName) + '</div>';
        if (profession) html += '<div class="header-profession">' + escapeHtml(profession) + '</div>';
        if (contactParts.length) {
          html += '<div class="header-contact">' +
            contactParts.map(function(p) { return '<span>' + p + '</span>'; }).join('<span class="sep">|</span>') +
            '</div>';
        }
        html += '</div>';
      }

      // ── 2. Profile / Summary ──
      if (summary) {
        html += '<div class="section" data-section="profile">' +
          '<div class="section-title">' + escapeHtml(t.profile) + '</div>' +
          '<div class="profile-text">' + escapeHtml(summary) + '</div>' +
          '</div>';
      }

      // ── 3. Skills ──
      if (skills.length > 0) {
        html += '<div class="section" data-section="skills">' +
          '<div class="section-title">' + escapeHtml(t.skills) + '</div>' +
          '<div class="skills-list">' +
          skills.map(function(s) { return escapeHtml(safeStr(s)); }).join('<span class="skill-sep">•</span>') +
          '</div></div>';
      }

      // ── 4. Professional Experience ──
      if (experience.length > 0) {
        html += '<div class="section" data-section="experience">' +
          '<div class="section-title">' + escapeHtml(t.experience) + '</div>';

        experience.forEach(function(exp) {
          const position = safeStr(exp.title);
          const company = safeStr(exp.company);
          const startDate = safeStr(exp.startDate);
          const endDate = safeStr(exp.endDate);
          const isCurrent = !!exp.isCurrent;
          const dateRange = formatDateRange(startDate, endDate, isCurrent, lang);
          const achiev = safeArr(exp.achievements);
          const resp = safeArr(exp.responsibilities);
          const allBullets = achiev.concat(resp);

          html += '<div class="exp-entry" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          html += '<div class="exp-header">' +
            '<span class="exp-title">' + escapeHtml(position) + '</span>' +
            (dateRange ? '<span class="exp-date">' + escapeHtml(dateRange) + '</span>' : '') +
            '</div>';
          if (company) html += '<div class="exp-company">' + escapeHtml(company) + '</div>';

          if (allBullets.length > 0) {
            html += '<ul class="exp-bullets">';
            allBullets.forEach(function(item) {
              const txt = safeStr(item);
              if (txt) html += '<li>' + escapeHtml(txt) + '</li>';
            });
            html += '</ul>';
          }
          html += '</div>';
        });
        html += '</div>';
      }

      // ── 5. Projects ──
      if (projects.length > 0) {
        html += '<div class="section" data-section="projects">' +
          '<div class="section-title">' + escapeHtml(t.projects) + '</div>';

        projects.forEach(function(proj) {
          const name = safeStr(proj.name);
          const description = safeStr(proj.description);
          const technologies = safeArr(proj.technologies);
          const url = safeStr(proj.url);

          html += '<div class="proj-entry" data-entry-id="' + escapeHtml(safeStr(proj.id)) + '">';
          html += '<span class="proj-name">' + escapeHtml(name) + '</span>';
          if (technologies.length > 0) {
            html += ' <span class="proj-tech">(' + technologies.map(function(t) { return escapeHtml(safeStr(t)); }).join(', ') + ')</span>';
          }
          if (url) {
            html += ' <a class="proj-link" href="' + escapeHtml(url) + '" target="_blank" rel="noopener">🔗</a>';
          }
          if (description) html += '<div class="proj-desc">' + escapeHtml(description) + '</div>';
          html += '</div>';
        });
        html += '</div>';
      }

      // ── 6. Achievements ──
      if (achievements.length > 0) {
        html += '<div class="section" data-section="achievements">' +
          '<div class="section-title">' + escapeHtml(t.achievements) + '</div>';

        achievements.forEach(function(ach) {
          const title = safeStr(ach.title);
          const description = safeStr(ach.description);
          const year = ach.year;

          html += '<div class="ach-entry" data-entry-id="' + escapeHtml(safeStr(ach.id)) + '">';
          html += '<span class="ach-title">' + escapeHtml(title) + '</span>';
          if (year) html += '<span class="ach-year">(' + escapeHtml(String(year)) + ')</span>';
          if (description) html += '<div class="ach-desc">' + escapeHtml(description) + '</div>';
          html += '</div>';
        });
        html += '</div>';
      }

      // ── 7. Education ──
      if (education.length > 0) {
        html += '<div class="section" data-section="education">' +
          '<div class="section-title">' + escapeHtml(t.education) + '</div>';

        education.forEach(function(edu) {
          const degree = safeStr(edu.degree);
          const field = safeStr(edu.field);
          const institution = safeStr(edu.institution);
          const startDate = safeStr(edu.startDate);
          const endDate = safeStr(edu.endDate);
          const isCurrent = edu.isCompleted === false;
          const dateRange = formatDateRange(startDate, endDate, isCurrent, lang);
          const gpa = edu.gpa;
          const degreeField = degree + (field ? ' — ' + field : '');

          html += '<div class="edu-entry" data-entry-id="' + escapeHtml(safeStr(edu.id)) + '">';
          html += '<div class="edu-header">' +
            '<span class="edu-degree">' + escapeHtml(degreeField) + '</span>' +
            (dateRange ? '<span class="edu-date">' + escapeHtml(dateRange) + '</span>' : '') +
            '</div>';
          if (institution) html += '<div class="edu-institution">' + escapeHtml(institution) + '</div>';
          if (gpa) html += '<div class="edu-gpa">GPA: ' + escapeHtml(String(gpa)) + '</div>';
          html += '</div>';
        });
        html += '</div>';
      }

      // ── 8. Certifications ──
      if (certifications.length > 0) {
        html += '<div class="section" data-section="certifications">' +
          '<div class="section-title">' + escapeHtml(t.certifications) + '</div>';

        certifications.forEach(function(cert) {
          const name = safeStr(cert.name);
          const issuer = safeStr(cert.issuer);
          const date = safeStr(cert.date);

          html += '<div class="cert-entry" data-entry-id="' + escapeHtml(safeStr(cert.id)) + '">';
          html += '<span class="cert-name">' + escapeHtml(name) + '</span>';
          if (issuer) html += ' <span class="cert-issuer">— ' + escapeHtml(issuer) + '</span>';
          if (date) html += ' <span class="cert-date">(' + escapeHtml(formatDate(date, lang)) + ')</span>';
          html += '</div>';
        });
        html += '</div>';
      }

      // ── 9. Languages ──
      if (languages.length > 0) {
        html += '<div class="section" data-section="languages">' +
          '<div class="section-title">' + escapeHtml(t.languages) + '</div>';

        const lMap = levelMap[lang] || levelMap.en;

        languages.forEach(function(item) {
          const name = safeStr(item.name);
          const level = safeStr(item.level || 'basic');
          const label = lMap[level] || level;

          html += '<div class="lang-entry" data-entry-id="' + escapeHtml(safeStr(item.id)) + '">' +
            '<span class="lang-name">' + escapeHtml(name) + '</span>' +
            '<span class="lang-dots">' + levelDots(level) + '</span>' +
            '<span class="lang-label">' + escapeHtml(label) + '</span>' +
            '</div>';
        });
        html += '</div>';
      }

      html += '</div>'; // close .page

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = html;
      }
    }
  }

  if (!customElements.get('gqr-resume-classic')) {
    customElements.define('gqr-resume-classic', GQRResumeClassic);
  }
})();
