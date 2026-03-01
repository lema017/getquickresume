/**
 * name: gqr-resume-finance
 * description: "Clean, dense single-column resume with minimal gray accents and thin rules, optimized for finance/professional roles."
 */

(function() {
  'use strict';

  const i18n = {
    es: {
      summary: "Resumen",
      profile: "Perfil",
      experience: "Experiencia Laboral",
      education: "Educación",
      projects: "Proyectos",
      certifications: "Certificaciones",
      languages: "Idiomas",
      achievements: "Logros",
      skills: "Competencias Técnicas",
      current: "Actual",
      present: "Presente",
      basic: "Básico",
      intermediate: "Intermedio",
      advanced: "Avanzado",
      native: "Nativo"
    },
    en: {
      summary: "Summary",
      profile: "Profile",
      experience: "Work Experience",
      education: "Education",
      projects: "Projects",
      certifications: "Certifications",
      languages: "Languages",
      achievements: "Achievements",
      skills: "Technical Expertise",
      current: "Current",
      present: "Present",
      basic: "Basic",
      intermediate: "Intermediate",
      advanced: "Advanced",
      native: "Native"
    }
  };

  const levelMap = {
    es: {
      basic: "Básico",
      intermediate: "Intermedio",
      advanced: "Avanzado",
      native: "Nativo"
    },
    en: {
      basic: "Basic",
      intermediate: "Intermediate",
      advanced: "Advanced",
      native: "Native"
    }
  };

  function safeStr(val) {
    return (val != null && typeof val === 'string') ? val : '';
  }

  function safeArr(val) {
    return Array.isArray(val) ? val : [];
  }

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
    } catch {
      return dateStr;
    }
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

  class GQRResumeFinance extends HTMLElement {
    constructor() {
      super();
      this._data = null;
      this._shadowRootRef = null;
    }

    static get observedAttributes() {
      return ['language'];
    }

    connectedCallback() {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
      }
      this.render();
    }

    attributeChangedCallback() {
      if (this.shadowRoot) {
        this.render();
      }
    }

    get data() {
      return this._data || {};
    }

    set data(value) {
      if (value && typeof value === 'object') {
        this._data = value;
        if (this.shadowRoot) {
          this.render();
        }
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
      if (email) contactParts.push('<span class="contact-piece">✉ <a href="mailto:' + escapeHtml(email) + '" class="contact-link">' + escapeHtml(email) + '</a></span>');
      if (phone) contactParts.push('<span class="contact-piece">☎ ' + escapeHtml(phone) + '</span>');
      if (country) contactParts.push('<span class="contact-piece">⚲ ' + escapeHtml(country) + '</span>');
      if (linkedin) contactParts.push('<span class="contact-piece">🔗 <a href="' + escapeHtml(linkedin.startsWith('http') ? linkedin : 'https://linkedin.com/in/' + linkedin) + '" class="contact-link" target="_blank" rel="noopener">' + escapeHtml(linkedin) + '</a></span>');

      const styles = '\
        <style>\
          :host {\
            display: block;\
            font-family: "Segoe UI", Roboto, sans-serif;\
            line-height: 1.45;\
            color: #333;\
            background: #fff;\
          }\
          * {\
            margin: 0;\
            padding: 0;\
            box-sizing: border-box;\
          }\
          .page {\
            width: 210mm;\
            min-height: 297mm;\
            padding: 18mm 20mm 16mm 20mm;\
            background: #fff;\
          }\
          \
          /* ── Header ── */\
          .header {\
            text-align: center;\
            margin-bottom: 10px;\
          }\
          .header-name {\
            font-size: 27px;\
            font-weight: 700;\
            color: #222;\
            letter-spacing: 0.5px;\
            margin-bottom: 2px;\
          }\
          .header-profession {\
            font-size: 14px;\
            color: #555;\
            margin-bottom: 6px;\
          }\
          .contact-line {\
            font-size: 12px;\
            color: #555;\
            display: flex;\
            flex-wrap: wrap;\
            justify-content: center;\
            gap: 4px 0;\
          }\
          .contact-piece {\
            white-space: nowrap;\
          }\
          .contact-piece + .contact-piece::before {\
            content: " | ";\
            margin: 0 6px;\
            color: #999;\
          }\
          .contact-link {\
            color: #555;\
            text-decoration: none;\
          }\
          .contact-link:hover {\
            text-decoration: underline;\
          }\
          \
          /* ── Sections ── */\
          .section {\
            margin-top: 12px;\
          }\
          .section-heading {\
            font-size: 11.5px;\
            font-weight: 700;\
            text-transform: uppercase;\
            letter-spacing: 1.2px;\
            color: #333;\
            border-bottom: 1px solid #888;\
            padding-bottom: 3px;\
            margin-bottom: 7px;\
          }\
          \
          /* ── Summary ── */\
          .summary-text {\
            font-size: 12.5px;\
            color: #444;\
            line-height: 1.55;\
          }\
          \
          /* ── Education ── */\
          .edu-entry {\
            display: flex;\
            justify-content: space-between;\
            align-items: baseline;\
            margin-bottom: 4px;\
          }\
          .edu-left {\
            flex: 1;\
            min-width: 0;\
          }\
          .edu-institution {\
            font-size: 12.5px;\
            font-weight: 700;\
            color: #333;\
          }\
          .edu-degree {\
            font-size: 12px;\
            color: #555;\
          }\
          .edu-gpa {\
            font-size: 11px;\
            color: #777;\
          }\
          .date-right {\
            font-size: 11.5px;\
            color: #777;\
            white-space: nowrap;\
            margin-left: 12px;\
            flex-shrink: 0;\
          }\
          \
          /* ── Experience ── */\
          .exp-entry {\
            margin-bottom: 8px;\
          }\
          .exp-header {\
            display: flex;\
            justify-content: space-between;\
            align-items: baseline;\
          }\
          .exp-title-line {\
            font-size: 12.5px;\
            font-weight: 700;\
            color: #333;\
            flex: 1;\
            min-width: 0;\
          }\
          .exp-title-line .company {\
            font-weight: 400;\
            color: #555;\
          }\
          .exp-bullets {\
            list-style: none;\
            margin-top: 2px;\
            padding-left: 14px;\
          }\
          .exp-bullets li {\
            font-size: 12px;\
            color: #444;\
            line-height: 1.5;\
            margin-bottom: 1px;\
            position: relative;\
            padding-left: 0;\
          }\
          .exp-bullets li::before {\
            content: "•";\
            position: absolute;\
            left: -12px;\
            color: #888;\
          }\
          \
          /* ── Skills ── */\
          .skills-text {\
            font-size: 12px;\
            color: #444;\
            line-height: 1.55;\
          }\
          \
          /* ── Projects ── */\
          .proj-entry {\
            margin-bottom: 6px;\
          }\
          .proj-name {\
            font-size: 12.5px;\
            font-weight: 700;\
            color: #333;\
          }\
          .proj-link {\
            color: #555;\
            text-decoration: none;\
            font-size: 11px;\
            margin-left: 4px;\
          }\
          .proj-link:hover {\
            text-decoration: underline;\
          }\
          .proj-desc {\
            font-size: 12px;\
            color: #444;\
            line-height: 1.5;\
          }\
          .proj-tech {\
            font-size: 11px;\
            color: #777;\
            font-style: italic;\
          }\
          \
          /* ── Certifications ── */\
          .cert-entry {\
            margin-bottom: 4px;\
          }\
          .cert-name {\
            font-size: 12.5px;\
            font-weight: 700;\
            color: #333;\
            display: inline;\
          }\
          .cert-issuer {\
            font-size: 12px;\
            color: #555;\
            display: inline;\
          }\
          .cert-date {\
            font-size: 11px;\
            color: #777;\
          }\
          \
          /* ── Languages ── */\
          .lang-entry {\
            font-size: 12px;\
            color: #444;\
            margin-bottom: 2px;\
          }\
          .lang-name {\
            font-weight: 600;\
          }\
          .lang-sep {\
            color: #999;\
            margin: 0 4px;\
          }\
          \
          /* ── Achievements ── */\
          .ach-entry {\
            margin-bottom: 5px;\
          }\
          .ach-title {\
            font-size: 12.5px;\
            font-weight: 700;\
            color: #333;\
            display: inline;\
          }\
          .ach-year {\
            font-size: 11px;\
            color: #777;\
            margin-left: 6px;\
          }\
          .ach-desc {\
            font-size: 12px;\
            color: #444;\
            line-height: 1.5;\
          }\
        </style>';

      var html = styles + '<div class="page">';

      /* ── Header ── */
      if (fullName || profession || contactParts.length > 0) {
        html += '<div class="header" data-section="header">';
        if (fullName) html += '<div class="header-name">' + escapeHtml(fullName) + '</div>';
        if (profession) html += '<div class="header-profession">' + escapeHtml(profession) + '</div>';
        if (contactParts.length > 0) html += '<div class="contact-line">' + contactParts.join('') + '</div>';
        html += '</div>';
      }

      /* ── Summary ── */
      if (summary) {
        html += '<div class="section" data-section="profile">';
        html += '<div class="section-heading">' + escapeHtml(t.summary) + '</div>';
        html += '<div class="summary-text">' + escapeHtml(summary) + '</div>';
        html += '</div>';
      }

      /* ── Skills / Technical Expertise ── */
      if (skills.length > 0) {
        html += '<div class="section" data-section="skills">';
        html += '<div class="section-heading">' + escapeHtml(t.skills) + '</div>';
        html += '<div class="skills-text">' + skills.map(function(s) { return escapeHtml(safeStr(s)); }).join(', ') + '</div>';
        html += '</div>';
      }

      /* ── Work Experience ── */
      if (experience.length > 0) {
        html += '<div class="section" data-section="experience">';
        html += '<div class="section-heading">' + escapeHtml(t.experience) + '</div>';
        experience.forEach(function(exp) {
          var position = safeStr(exp.title);
          var company = safeStr(exp.company);
          var dateRange = formatDateRange(safeStr(exp.startDate), safeStr(exp.endDate), !!exp.isCurrent, lang);
          var achList = safeArr(exp.achievements);
          var respList = safeArr(exp.responsibilities);
          var bullets = achList.concat(respList);

          html += '<div class="exp-entry" data-entry-id="' + escapeHtml(safeStr(exp.id)) + '">';
          html += '<div class="exp-header">';
          html += '<div class="exp-title-line">' + escapeHtml(position);
          if (company) html += ' <span class="company">— ' + escapeHtml(company) + '</span>';
          html += '</div>';
          if (dateRange) html += '<span class="date-right">' + escapeHtml(dateRange) + '</span>';
          html += '</div>';

          if (bullets.length > 0) {
            html += '<ul class="exp-bullets">';
            bullets.forEach(function(b) {
              var text = safeStr(b);
              if (text) html += '<li>' + escapeHtml(text) + '</li>';
            });
            html += '</ul>';
          }
          html += '</div>';
        });
        html += '</div>';
      }

      /* ── Projects ── */
      if (projects.length > 0) {
        html += '<div class="section" data-section="projects">';
        html += '<div class="section-heading">' + escapeHtml(t.projects) + '</div>';
        projects.forEach(function(proj) {
          var name = safeStr(proj.name);
          var description = safeStr(proj.description);
          var technologies = safeArr(proj.technologies);
          var url = safeStr(proj.url);

          html += '<div class="proj-entry" data-entry-id="' + escapeHtml(safeStr(proj.id)) + '">';
          html += '<div>';
          html += '<span class="proj-name">' + escapeHtml(name) + '</span>';
          if (url) html += '<a href="' + escapeHtml(url) + '" class="proj-link" target="_blank" rel="noopener">🔗</a>';
          html += '</div>';
          if (description) html += '<div class="proj-desc">' + escapeHtml(description) + '</div>';
          if (technologies.length > 0) html += '<div class="proj-tech">' + technologies.map(function(t) { return escapeHtml(safeStr(t)); }).join(', ') + '</div>';
          html += '</div>';
        });
        html += '</div>';
      }

      /* ── Achievements ── */
      if (achievements.length > 0) {
        html += '<div class="section" data-section="achievements">';
        html += '<div class="section-heading">' + escapeHtml(t.achievements) + '</div>';
        achievements.forEach(function(ach) {
          var title = safeStr(ach.title);
          var description = safeStr(ach.description);
          var year = ach.year;

          html += '<div class="ach-entry" data-entry-id="' + escapeHtml(safeStr(ach.id)) + '">';
          html += '<span class="ach-title">' + escapeHtml(title) + '</span>';
          if (year) html += '<span class="ach-year">(' + escapeHtml(String(year)) + ')</span>';
          if (description) html += '<div class="ach-desc">' + escapeHtml(description) + '</div>';
          html += '</div>';
        });
        html += '</div>';
      }

      /* ── Education ── */
      if (education.length > 0) {
        html += '<div class="section" data-section="education">';
        html += '<div class="section-heading">' + escapeHtml(t.education) + '</div>';
        education.forEach(function(edu) {
          var institution = safeStr(edu.institution);
          var degree = safeStr(edu.degree);
          var field = safeStr(edu.field);
          var gpa = edu.gpa;
          var dateRange = formatDateRange(safeStr(edu.startDate), safeStr(edu.endDate), edu.isCompleted === false, lang);
          var degreeLine = degree;
          if (field) degreeLine += (degree ? ', ' : '') + field;

          html += '<div class="edu-entry" data-entry-id="' + escapeHtml(safeStr(edu.id)) + '">';
          html += '<div class="edu-left">';
          if (institution) html += '<span class="edu-institution">' + escapeHtml(institution) + '</span>';
          if (degreeLine) html += '<div class="edu-degree">' + escapeHtml(degreeLine) + '</div>';
          if (gpa) html += '<div class="edu-gpa">GPA: ' + escapeHtml(String(gpa)) + '</div>';
          html += '</div>';
          if (dateRange) html += '<span class="date-right">' + escapeHtml(dateRange) + '</span>';
          html += '</div>';
        });
        html += '</div>';
      }

      /* ── Certifications ── */
      if (certifications.length > 0) {
        html += '<div class="section" data-section="certifications">';
        html += '<div class="section-heading">' + escapeHtml(t.certifications) + '</div>';
        certifications.forEach(function(cert) {
          var name = safeStr(cert.name);
          var issuer = safeStr(cert.issuer);
          var date = safeStr(cert.date);

          html += '<div class="cert-entry" data-entry-id="' + escapeHtml(safeStr(cert.id)) + '">';
          html += '<span class="cert-name">' + escapeHtml(name) + '</span>';
          if (issuer) html += ' <span class="cert-issuer">— ' + escapeHtml(issuer) + '</span>';
          if (date) html += '<div class="cert-date">' + escapeHtml(formatDate(date, lang)) + '</div>';
          html += '</div>';
        });
        html += '</div>';
      }

      /* ── Languages ── */
      if (languages.length > 0) {
        html += '<div class="section" data-section="languages">';
        html += '<div class="section-heading">' + escapeHtml(t.languages) + '</div>';
        languages.forEach(function(langItem) {
          var name = safeStr(langItem.name);
          var rawLevel = safeStr(langItem.level || 'basic');
          var langMap = levelMap[lang] || levelMap.en;
          var levelLabel = langMap[rawLevel] || rawLevel;

          html += '<div class="lang-entry" data-entry-id="' + escapeHtml(safeStr(langItem.id)) + '">';
          html += '<span class="lang-name">' + escapeHtml(name) + '</span>';
          html += '<span class="lang-sep">—</span>';
          html += '<span>' + escapeHtml(levelLabel) + '</span>';
          html += '</div>';
        });
        html += '</div>';
      }

      html += '</div>';

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = html;
      }
    }
  }

  if (!customElements.get('gqr-resume-finance')) {
    customElements.define('gqr-resume-finance', GQRResumeFinance);
  }
})();
