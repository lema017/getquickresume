/**
 * name: gqr-resume-steady
 * description: "Two-column resume with teal colored header bar and right sidebar, white left main area for experience."
 */

(function() {
  'use strict';

  const i18n = {
    es: {
      summary: "Resumen", profile: "Sobre Mí", experience: "Experiencia Laboral",
      education: "Educación", projects: "Proyectos", certifications: "Certificaciones",
      languages: "Idiomas", achievements: "Logros", skills: "Habilidades",
      contact: "Contacto", current: "Actual", present: "Presente",
      basic: "Básico", intermediate: "Intermedio", advanced: "Avanzado", native: "Nativo"
    },
    en: {
      summary: "Summary", profile: "About Me", experience: "Work Experience",
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

  class GQRResumeSteady extends HTMLElement {
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
      const skills = [...skillsRaw, ...toolsRaw.filter(function(tl) { return !skillsRaw.includes(tl); })];
      const experience = safeArr(data.experience);
      const education = safeArr(data.education);
      const projects = safeArr(data.projects);
      const certifications = safeArr(data.certifications);
      const languages = safeArr(data.languages);
      const achievements = safeArr(data.achievements);

      const hasContact = email || phone || country || linkedin;
      const hasExperience = experience.length > 0;
      const hasProjects = projects.length > 0;
      const hasSkills = skills.length > 0;
      const hasAchievements = achievements.length > 0;
      const hasEducation = education.length > 0;
      const hasCertifications = certifications.length > 0;
      const hasLanguages = languages.length > 0;

      const styles = `
        <style>
          :host {
            display: block;
            font-family: 'Segoe UI', Roboto, sans-serif;
            line-height: 1.5;
            color: #222;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .page {
            width: 210mm;
            min-height: 297mm;
            display: flex;
            flex-direction: column;
            background: #fff;
          }

          .header {
            background: #1a5c5c;
            color: #fff;
            padding: 30px 36px;
          }

          .header-name {
            font-size: 30px;
            font-weight: 700;
            letter-spacing: 0.5px;
            line-height: 1.2;
          }

          .header-profession {
            font-size: 16px;
            font-weight: 300;
            margin-top: 6px;
            opacity: 0.85;
            letter-spacing: 0.3px;
          }

          .body {
            display: flex;
            flex: 1;
          }

          .main {
            width: 65%;
            padding: 28px 30px;
            background: #fff;
            color: #222;
          }

          .sidebar {
            width: 35%;
            background: #1a5c5c;
            color: #fff;
            padding: 28px 24px;
          }

          /* --- Main section headings --- */
          .main .section-title {
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #1a5c5c;
            border-bottom: 2px solid #1a5c5c;
            padding-bottom: 6px;
            margin-bottom: 16px;
            margin-top: 24px;
          }

          .main .section-title:first-child {
            margin-top: 0;
          }

          /* --- Sidebar section headings --- */
          .sidebar .section-title {
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            border-bottom: 1px solid rgba(255,255,255,0.3);
            padding-bottom: 5px;
            margin-bottom: 14px;
            margin-top: 22px;
            color: #fff;
          }

          .sidebar .section-title:first-child {
            margin-top: 0;
          }

          /* --- Contact --- */
          .contact-line {
            display: flex;
            align-items: flex-start;
            margin-bottom: 10px;
            font-size: 13px;
            line-height: 1.4;
            word-break: break-word;
          }

          .contact-icon {
            flex-shrink: 0;
            width: 18px;
            margin-right: 8px;
            text-align: center;
            font-size: 14px;
          }

          .contact-text a {
            color: #fff;
            text-decoration: none;
          }

          .contact-text a:hover {
            text-decoration: underline;
          }

          /* --- Sidebar skill list --- */
          .sidebar-skill-list {
            list-style: none;
          }

          .sidebar-skill-item {
            font-size: 13px;
            padding: 2px 0;
            padding-left: 14px;
            position: relative;
          }

          .sidebar-skill-item::before {
            content: '•';
            position: absolute;
            left: 0;
            color: rgba(255,255,255,0.6);
          }

          /* --- Languages (sidebar) --- */
          .lang-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
            font-size: 13px;
          }

          .lang-level {
            font-size: 12px;
            opacity: 0.75;
          }

          /* --- Experience --- */
          .exp-item {
            margin-bottom: 20px;
          }

          .exp-title {
            font-size: 14px;
            font-weight: 700;
            color: #222;
          }

          .exp-meta {
            font-size: 12px;
            color: #666;
            margin-top: 2px;
          }

          .exp-bullets {
            list-style: none;
            margin-top: 8px;
          }

          .exp-bullets li {
            font-size: 13px;
            line-height: 1.55;
            margin-bottom: 4px;
            padding-left: 16px;
            position: relative;
            color: #333;
          }

          .exp-bullets li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: #1a5c5c;
            font-weight: 700;
          }

          /* --- Projects --- */
          .proj-item {
            margin-bottom: 16px;
          }

          .proj-name {
            font-size: 14px;
            font-weight: 700;
            color: #222;
          }

          .proj-desc {
            font-size: 13px;
            color: #444;
            line-height: 1.55;
            margin-top: 3px;
          }

          .proj-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 6px;
          }

          .proj-tech-tag {
            background: #e0f0f0;
            color: #1a5c5c;
            padding: 2px 10px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 500;
          }

          /* --- Summary (main) --- */
          .main-summary {
            font-size: 13px;
            line-height: 1.65;
            color: #333;
          }

          /* --- Education (main) --- */
          .main-edu-item {
            margin-bottom: 14px;
          }

          .main-edu-degree {
            font-size: 14px;
            font-weight: 700;
            color: #222;
          }

          .main-edu-institution {
            font-size: 12px;
            color: #666;
            margin-top: 2px;
          }

          .main-edu-date {
            font-size: 11px;
            color: #888;
            margin-top: 2px;
          }

          /* --- Certifications (main) --- */
          .main-cert-item {
            margin-bottom: 12px;
          }

          .main-cert-name {
            font-size: 14px;
            font-weight: 700;
            color: #222;
          }

          .main-cert-issuer {
            font-size: 12px;
            color: #666;
            margin-top: 1px;
          }

          .main-cert-date {
            font-size: 11px;
            color: #888;
            margin-top: 1px;
          }

          /* --- Achievements --- */
          .ach-item {
            margin-bottom: 14px;
          }

          .ach-title {
            font-size: 14px;
            font-weight: 700;
            color: #222;
          }

          .ach-desc {
            font-size: 13px;
            color: #444;
            line-height: 1.55;
            margin-top: 2px;
          }

          .ach-year {
            font-size: 11px;
            color: #888;
            margin-top: 2px;
          }

          @media print {
            :host {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      `;

      /* --- Build contact section --- */
      let contactHtml = '';
      if (hasContact) {
        contactHtml = '<div data-section="contact"><div class="section-title">' + escapeHtml(t.contact) + '</div>';
        if (email) {
          contactHtml += '<div class="contact-line"><span class="contact-icon">✉</span><span class="contact-text"><a href="mailto:' + escapeHtml(email) + '">' + escapeHtml(email) + '</a></span></div>';
        }
        if (phone) {
          contactHtml += '<div class="contact-line"><span class="contact-icon">☎</span><span class="contact-text">' + escapeHtml(phone) + '</span></div>';
        }
        if (country) {
          contactHtml += '<div class="contact-line"><span class="contact-icon">⚲</span><span class="contact-text">' + escapeHtml(country) + '</span></div>';
        }
        if (linkedin) {
          var linkedinUrl = linkedin.startsWith('http') ? linkedin : 'https://linkedin.com/in/' + linkedin;
          contactHtml += '<div class="contact-line"><span class="contact-icon">🔗</span><span class="contact-text"><a href="' + escapeHtml(linkedinUrl) + '" target="_blank" rel="noopener">' + escapeHtml(linkedin) + '</a></span></div>';
        }
        contactHtml += '</div>';
      }

      /* --- Build languages section (sidebar) --- */
      let langsHtml = '';
      if (hasLanguages) {
        var langMap = levelMap[lang] || levelMap.en;
        langsHtml = '<div data-section="languages"><div class="section-title">' + escapeHtml(t.languages) + '</div>';
        languages.forEach(function(item) {
          var name = safeStr(item.name);
          var rawLevel = safeStr(item.level || 'basic');
          var levelLabel = langMap[rawLevel] || rawLevel;
          langsHtml += '<div class="lang-item" data-entry-id="' + escapeHtml(safeStr(item.id)) + '"><span>' + escapeHtml(name) + '</span><span class="lang-level">' + escapeHtml(levelLabel) + '</span></div>';
        });
        langsHtml += '</div>';
      }

      /* --- Build skills section (sidebar) --- */
      let sidebarSkillsHtml = '';
      if (hasSkills) {
        sidebarSkillsHtml = '<div data-section="skills"><div class="section-title">' + escapeHtml(t.skills) + '</div>'
          + '<ul class="sidebar-skill-list">';
        skills.forEach(function(skill) {
          sidebarSkillsHtml += '<li class="sidebar-skill-item">' + escapeHtml(safeStr(skill)) + '</li>';
        });
        sidebarSkillsHtml += '</ul></div>';
      }

      /* --- Build summary section (main) --- */
      let summaryHtml = '';
      if (summary) {
        summaryHtml = '<div data-section="profile"><div class="section-title">' + escapeHtml(t.profile) + '</div>'
          + '<div class="main-summary">' + escapeHtml(summary) + '</div></div>';
      }

      /* --- Build experience section (main) --- */
      let expHtml = '';
      if (hasExperience) {
        expHtml = '<div data-section="experience"><div class="section-title">' + escapeHtml(t.experience) + '</div>';
        experience.forEach(function(exp) {
          var position = safeStr(exp.title);
          var company = safeStr(exp.company);
          var dateRange = formatDateRange(safeStr(exp.startDate), safeStr(exp.endDate), exp.isCurrent || false, lang);
          var achList = safeArr(exp.achievements);
          var respList = safeArr(exp.responsibilities);
          var bullets = achList.concat(respList);

          var metaParts = [];
          if (company) metaParts.push(escapeHtml(company));
          if (dateRange) metaParts.push(escapeHtml(dateRange));

          expHtml += '<div class="exp-item" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">'
            + '<div class="exp-title">' + escapeHtml(position) + '</div>'
            + (metaParts.length ? '<div class="exp-meta">' + metaParts.join(' · ') + '</div>' : '');

          if (bullets.length > 0) {
            expHtml += '<ul class="exp-bullets">';
            bullets.forEach(function(b) {
              var txt = safeStr(b);
              if (txt) expHtml += '<li>' + escapeHtml(txt) + '</li>';
            });
            expHtml += '</ul>';
          }
          expHtml += '</div>';
        });
        expHtml += '</div>';
      }

      /* --- Build education section (main) --- */
      let educationHtml = '';
      if (hasEducation) {
        educationHtml = '<div data-section="education"><div class="section-title">' + escapeHtml(t.education) + '</div>';
        education.forEach(function(edu) {
          var degree = safeStr(edu.degree);
          var field = safeStr(edu.field);
          var institution = safeStr(edu.institution);
          var dateRange = formatDateRange(safeStr(edu.startDate), safeStr(edu.endDate), edu.isCurrent || false, lang);
          var label = degree + (field ? ' — ' + field : '');
          educationHtml += '<div class="main-edu-item" data-entry-id="' + escapeHtml(safeStr(edu.id)) + '">'
            + (label ? '<div class="main-edu-degree">' + escapeHtml(label) + '</div>' : '')
            + (institution ? '<div class="main-edu-institution">' + escapeHtml(institution) + '</div>' : '')
            + (dateRange ? '<div class="main-edu-date">' + escapeHtml(dateRange) + '</div>' : '')
            + '</div>';
        });
        educationHtml += '</div>';
      }

      /* --- Build projects section (main) --- */
      let projHtml = '';
      if (hasProjects) {
        projHtml = '<div data-section="projects"><div class="section-title">' + escapeHtml(t.projects) + '</div>';
        projects.forEach(function(proj) {
          var name = safeStr(proj.name);
          var description = safeStr(proj.description);
          var technologies = safeArr(proj.technologies);
          projHtml += '<div class="proj-item" data-entry-id="' + escapeHtml(safeStr(proj.id)) + '">'
            + '<div class="proj-name">' + escapeHtml(name) + '</div>'
            + (description ? '<div class="proj-desc">' + escapeHtml(description) + '</div>' : '');
          if (technologies.length > 0) {
            projHtml += '<div class="proj-tech">';
            technologies.forEach(function(tech) {
              projHtml += '<span class="proj-tech-tag">' + escapeHtml(safeStr(tech)) + '</span>';
            });
            projHtml += '</div>';
          }
          projHtml += '</div>';
        });
        projHtml += '</div>';
      }

      /* --- Build certifications section (main) --- */
      let certsHtml = '';
      if (hasCertifications) {
        certsHtml = '<div data-section="certifications"><div class="section-title">' + escapeHtml(t.certifications) + '</div>';
        certifications.forEach(function(cert) {
          var name = safeStr(cert.name);
          var issuer = safeStr(cert.issuer);
          var date = safeStr(cert.date);
          certsHtml += '<div class="main-cert-item" data-entry-id="' + escapeHtml(safeStr(cert.id)) + '">'
            + (name ? '<div class="main-cert-name">' + escapeHtml(name) + '</div>' : '')
            + (issuer ? '<div class="main-cert-issuer">' + escapeHtml(issuer) + '</div>' : '')
            + (date ? '<div class="main-cert-date">' + escapeHtml(formatDate(date, lang)) + '</div>' : '')
            + '</div>';
        });
        certsHtml += '</div>';
      }

      /* --- Build achievements section (main) --- */
      let achHtml = '';
      if (hasAchievements) {
        achHtml = '<div data-section="achievements"><div class="section-title">' + escapeHtml(t.achievements) + '</div>';
        achievements.forEach(function(ach) {
          var title = safeStr(ach.title);
          var description = safeStr(ach.description);
          var year = ach.year;
          achHtml += '<div class="ach-item" data-entry-id="' + escapeHtml(safeStr(ach.id)) + '">'
            + '<div class="ach-title">' + escapeHtml(title) + '</div>'
            + (description ? '<div class="ach-desc">' + escapeHtml(description) + '</div>' : '')
            + (year ? '<div class="ach-year">' + escapeHtml(String(year)) + '</div>' : '')
            + '</div>';
        });
        achHtml += '</div>';
      }

      /* --- Assemble full HTML --- */
      var html = styles
        + '<div class="page">'
        +   '<div class="header" data-section="header">'
        +     (fullName ? '<div class="header-name">' + escapeHtml(fullName) + '</div>' : '')
        +     (profession ? '<div class="header-profession">' + escapeHtml(profession) + '</div>' : '')
        +   '</div>'
        +   '<div class="body">'
        +     '<div class="main">'
        +       summaryHtml
        +       expHtml
        +       projHtml
        +       achHtml
        +       educationHtml
        +       certsHtml
        +     '</div>'
        +     '<div class="sidebar">'
        +       contactHtml
        +       langsHtml
        +       sidebarSkillsHtml
        +     '</div>'
        +   '</div>'
        + '</div>';

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = html;
      }
    }
  }

  if (!customElements.get('gqr-resume-steady')) {
    customElements.define('gqr-resume-steady', GQRResumeSteady);
  }
})();
