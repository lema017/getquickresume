/**
 * name: gqr-resume-mercury
 * description: "Modern two-column resume with dark left sidebar (#1a1a2e) and clean white main area. Sans-serif typography, dot-rated languages, icon-based contact section."
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

  class GQRResumeMercury extends HTMLElement {
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

      /* ── CSS ─────────────────────────────────────────── */

      const styles = `<style>
  :host {
    display: block;
    font-family: 'Segoe UI', Roboto, sans-serif;
    line-height: 1.5;
    color: #222;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .page {
    display: flex;
    width: 210mm;
    min-height: 297mm;
    background: #fff;
  }

  /* ── Sidebar ──────────────────────────────────────── */

  .sidebar {
    width: 35%;
    background: #1a1a2e;
    color: #fff;
    padding: 36px 24px;
    display: flex;
    flex-direction: column;
    gap: 26px;
  }

  .sidebar-section-title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.6px;
    margin-bottom: 10px;
    padding-bottom: 6px;
    border-bottom: 1px solid rgba(255,255,255,0.3);
  }

  /* Contact */
  .contact-line {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 12px;
    margin-bottom: 7px;
    line-height: 1.4;
    word-break: break-all;
  }

  .contact-icon {
    flex-shrink: 0;
    width: 14px;
    text-align: center;
    margin-top: 1px;
  }

  .contact-link {
    color: #fff;
    text-decoration: none;
  }

  .contact-link:hover { text-decoration: underline; }

  /* Skills */
  .skill-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    list-style: none;
  }

  .skill-item {
    font-size: 11px;
    line-height: 1;
    padding: 4px 10px;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 12px;
  }

  /* Languages */
  .lang-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    margin-bottom: 5px;
  }

  .lang-dots {
    font-size: 11px;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.85);
  }

  /* Achievements (main) */
  .ach-entry { margin-bottom: 12px; }
  .ach-entry:last-child { margin-bottom: 0; }

  .ach-title {
    font-size: 13px;
    font-weight: 700;
    color: #222;
  }

  .ach-desc {
    font-size: 12px;
    color: #444;
    line-height: 1.55;
    margin-top: 2px;
  }

  .ach-year {
    font-size: 11px;
    color: #777;
    margin-top: 1px;
  }

  /* ── Main area ────────────────────────────────────── */

  .main {
    width: 65%;
    background: #fff;
    color: #222;
    padding: 36px 30px;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .main-header {
    margin-bottom: 4px;
  }

  .main-name {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a2e;
    line-height: 1.2;
  }

  .main-profession {
    font-size: 14px;
    color: #555;
    margin-top: 4px;
  }

  .main-section-title {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding-bottom: 6px;
    border-bottom: 2px solid #1a1a2e;
    margin-bottom: 12px;
    color: #1a1a2e;
  }

  /* Summary */
  .summary-text {
    font-size: 12.5px;
    line-height: 1.65;
    color: #333;
  }

  /* Experience */
  .exp-entry { margin-bottom: 16px; }
  .exp-entry:last-child { margin-bottom: 0; }

  .exp-title {
    font-size: 13px;
    font-weight: 700;
    color: #222;
  }

  .exp-meta {
    font-size: 12px;
    color: #555;
    margin-top: 2px;
  }

  .exp-bullets {
    list-style: none;
    margin-top: 6px;
  }

  .exp-bullet {
    font-size: 12px;
    line-height: 1.55;
    padding-left: 14px;
    position: relative;
    margin-bottom: 3px;
  }

  .exp-bullet::before {
    content: '–';
    position: absolute;
    left: 0;
    color: #1a1a2e;
  }

  /* Education */
  .edu-entry { margin-bottom: 14px; }
  .edu-entry:last-child { margin-bottom: 0; }

  .edu-degree {
    font-size: 13px;
    font-weight: 700;
    color: #222;
  }

  .edu-institution {
    font-size: 12px;
    color: #555;
    margin-top: 2px;
  }

  .edu-date {
    font-size: 11.5px;
    color: #777;
    margin-top: 1px;
  }

  .edu-gpa {
    font-size: 11px;
    color: #777;
    margin-top: 2px;
  }

  /* Projects */
  .proj-entry { margin-bottom: 14px; }
  .proj-entry:last-child { margin-bottom: 0; }

  .proj-name {
    font-size: 13px;
    font-weight: 700;
    color: #222;
  }

  .proj-link {
    font-size: 11px;
    color: #1a1a2e;
    text-decoration: none;
    margin-left: 6px;
  }

  .proj-link:hover { text-decoration: underline; }

  .proj-desc {
    font-size: 12px;
    line-height: 1.55;
    color: #444;
    margin-top: 3px;
  }

  .proj-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 6px;
  }

  .tech-tag {
    background: #eef;
    color: #1a1a2e;
    font-size: 10.5px;
    padding: 2px 8px;
    border-radius: 3px;
  }

  /* Certifications */
  .cert-entry { margin-bottom: 10px; }
  .cert-entry:last-child { margin-bottom: 0; }

  .cert-name {
    font-size: 12.5px;
    font-weight: 700;
    color: #222;
  }

  .cert-issuer {
    font-size: 11.5px;
    color: #555;
  }

  .cert-date {
    font-size: 11px;
    color: #777;
  }

  @media print {
    .page { width: 210mm; min-height: 297mm; }
  }
</style>`;

      /* ── Sidebar HTML (Contact, Languages, Skills only) ── */

      let sidebarHtml = '';

      if (hasContact) {
        sidebarHtml += '<div class="sidebar-section" data-section="contact">';
        sidebarHtml += '<div class="sidebar-section-title">' + escapeHtml(t.contact) + '</div>';
        if (email) {
          sidebarHtml += '<div class="contact-line"><span class="contact-icon">✉</span>'
            + '<a href="mailto:' + escapeHtml(email) + '" class="contact-link">' + escapeHtml(email) + '</a></div>';
        }
        if (phone) {
          sidebarHtml += '<div class="contact-line"><span class="contact-icon">☎</span>'
            + '<span>' + escapeHtml(phone) + '</span></div>';
        }
        if (country) {
          sidebarHtml += '<div class="contact-line"><span class="contact-icon">⚲</span>'
            + '<span>' + escapeHtml(country) + '</span></div>';
        }
        if (linkedin) {
          var linkedinUrl = linkedin.startsWith('http') ? linkedin : 'https://linkedin.com/in/' + linkedin;
          sidebarHtml += '<div class="contact-line"><span class="contact-icon">🔗</span>'
            + '<a href="' + escapeHtml(linkedinUrl) + '" class="contact-link" target="_blank" rel="noopener">' + escapeHtml(linkedin) + '</a></div>';
        }
        sidebarHtml += '</div>';
      }

      if (languages.length > 0) {
        sidebarHtml += '<div class="sidebar-section" data-section="languages">';
        sidebarHtml += '<div class="sidebar-section-title">' + escapeHtml(t.languages) + '</div>';
        for (var li = 0; li < languages.length; li++) {
          var langItem = languages[li];
          var langLevel = safeStr(langItem.level || 'basic');
          var langLabelMap = levelMap[lang] || levelMap.en;
          var levelLabel = langLabelMap[langLevel] || langLevel;
          sidebarHtml += '<div class="lang-row" data-entry-id="' + escapeHtml(safeStr(langItem.id)) + '">'
            + '<span>' + escapeHtml(safeStr(langItem.name)) + '</span>'
            + '<span class="lang-dots" title="' + escapeHtml(levelLabel) + '">' + levelDots(langLevel) + '</span>'
            + '</div>';
        }
        sidebarHtml += '</div>';
      }

      if (skills.length > 0) {
        sidebarHtml += '<div class="sidebar-section" data-section="skills">';
        sidebarHtml += '<div class="sidebar-section-title">' + escapeHtml(t.skills) + '</div>';
        sidebarHtml += '<div class="skill-list">';
        for (var si = 0; si < skills.length; si++) {
          sidebarHtml += '<span class="skill-item">' + escapeHtml(safeStr(skills[si])) + '</span>';
        }
        sidebarHtml += '</div></div>';
      }

      /* ── Main HTML ───────────────────────────────────── */

      var mainHtml = '';

      if (fullName || profession) {
        mainHtml += '<div class="main-header" data-section="header">';
        if (fullName) mainHtml += '<div class="main-name">' + escapeHtml(fullName) + '</div>';
        if (profession) mainHtml += '<div class="main-profession">' + escapeHtml(profession) + '</div>';
        mainHtml += '</div>';
      }

      if (summary) {
        mainHtml += '<div class="main-section" data-section="profile">';
        mainHtml += '<div class="main-section-title">' + escapeHtml(t.profile) + '</div>';
        mainHtml += '<div class="summary-text">' + escapeHtml(summary) + '</div>';
        mainHtml += '</div>';
      }

      if (experience.length > 0) {
        mainHtml += '<div class="main-section" data-section="experience">';
        mainHtml += '<div class="main-section-title">' + escapeHtml(t.experience) + '</div>';
        for (var ei = 0; ei < experience.length; ei++) {
          var exp = experience[ei];
          var position = safeStr(exp.title);
          var company = safeStr(exp.company);
          var expDesc = safeArr(exp.achievements).concat(safeArr(exp.responsibilities));
          var expRange = formatDateRange(safeStr(exp.startDate), safeStr(exp.endDate), exp.isCurrent || false, lang);

          mainHtml += '<div class="exp-entry" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          if (position) mainHtml += '<div class="exp-title">' + escapeHtml(position) + '</div>';
          var metaParts = [];
          if (company) metaParts.push(escapeHtml(company));
          if (expRange) metaParts.push(escapeHtml(expRange));
          if (metaParts.length > 0) mainHtml += '<div class="exp-meta">' + metaParts.join(' · ') + '</div>';

          if (expDesc.length > 0) {
            mainHtml += '<ul class="exp-bullets">';
            for (var di = 0; di < expDesc.length; di++) {
              mainHtml += '<li class="exp-bullet">' + escapeHtml(safeStr(expDesc[di])) + '</li>';
            }
            mainHtml += '</ul>';
          }
          mainHtml += '</div>';
        }
        mainHtml += '</div>';
      }

      if (projects.length > 0) {
        mainHtml += '<div class="main-section" data-section="projects">';
        mainHtml += '<div class="main-section-title">' + escapeHtml(t.projects) + '</div>';
        for (var pi = 0; pi < projects.length; pi++) {
          var proj = projects[pi];
          var projName = safeStr(proj.name);
          var projDesc = safeStr(proj.description);
          var projTech = safeArr(proj.technologies);
          var projUrl = safeStr(proj.url);

          mainHtml += '<div class="proj-entry" data-entry-id="' + escapeHtml(safeStr(proj.id)) + '">';
          mainHtml += '<div class="proj-name">' + escapeHtml(projName);
          if (projUrl) mainHtml += ' <a href="' + escapeHtml(projUrl) + '" class="proj-link" target="_blank" rel="noopener">🔗</a>';
          mainHtml += '</div>';
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

      if (achievements.length > 0) {
        mainHtml += '<div class="main-section" data-section="achievements">';
        mainHtml += '<div class="main-section-title">' + escapeHtml(t.achievements) + '</div>';
        for (var ai = 0; ai < achievements.length; ai++) {
          var ach = achievements[ai];
          mainHtml += '<div class="ach-entry" data-entry-id="' + escapeHtml(safeStr(ach.id)) + '">';
          mainHtml += '<div class="ach-title">' + escapeHtml(safeStr(ach.title)) + '</div>';
          if (ach.description) mainHtml += '<div class="ach-desc">' + escapeHtml(safeStr(ach.description)) + '</div>';
          if (ach.year) mainHtml += '<div class="ach-year">' + escapeHtml(String(ach.year)) + '</div>';
          mainHtml += '</div>';
        }
        mainHtml += '</div>';
      }

      if (education.length > 0) {
        mainHtml += '<div class="main-section" data-section="education">';
        mainHtml += '<div class="main-section-title">' + escapeHtml(t.education) + '</div>';
        for (var edi = 0; edi < education.length; edi++) {
          var edu = education[edi];
          var degree = safeStr(edu.degree);
          var field = safeStr(edu.field);
          var institution = safeStr(edu.institution);
          var gpa = edu.gpa;
          var eduRange = formatDateRange(safeStr(edu.startDate), safeStr(edu.endDate), edu.isCompleted === false, lang);

          mainHtml += '<div class="edu-entry" data-entry-id="' + escapeHtml(safeStr(edu.id)) + '">';
          var degreeLine = degree;
          if (field) degreeLine += (degree ? ' — ' : '') + field;
          if (degreeLine) mainHtml += '<div class="edu-degree">' + escapeHtml(degreeLine) + '</div>';
          if (institution) mainHtml += '<div class="edu-institution">' + escapeHtml(institution) + '</div>';
          if (eduRange) mainHtml += '<div class="edu-date">' + escapeHtml(eduRange) + '</div>';
          if (gpa) mainHtml += '<div class="edu-gpa">GPA: ' + escapeHtml(String(gpa)) + '</div>';
          mainHtml += '</div>';
        }
        mainHtml += '</div>';
      }

      if (certifications.length > 0) {
        mainHtml += '<div class="main-section" data-section="certifications">';
        mainHtml += '<div class="main-section-title">' + escapeHtml(t.certifications) + '</div>';
        for (var ci = 0; ci < certifications.length; ci++) {
          var cert = certifications[ci];
          var certName = safeStr(cert.name);
          var certIssuer = safeStr(cert.issuer);
          var certDate = safeStr(cert.date);

          mainHtml += '<div class="cert-entry" data-entry-id="' + escapeHtml(safeStr(cert.id)) + '">';
          if (certName) mainHtml += '<div class="cert-name">' + escapeHtml(certName) + '</div>';
          if (certIssuer) mainHtml += '<div class="cert-issuer">' + escapeHtml(certIssuer) + '</div>';
          if (certDate) mainHtml += '<div class="cert-date">' + escapeHtml(formatDate(certDate, lang)) + '</div>';
          mainHtml += '</div>';
        }
        mainHtml += '</div>';
      }

      /* ── Assemble ────────────────────────────────────── */

      var html = styles
        + '<div class="page">'
        + '<div class="sidebar">' + sidebarHtml + '</div>'
        + '<div class="main">' + mainHtml + '</div>'
        + '</div>';

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = html;
      }
    }
  }

  if (!customElements.get('gqr-resume-mercury')) {
    customElements.define('gqr-resume-mercury', GQRResumeMercury);
  }
})();
