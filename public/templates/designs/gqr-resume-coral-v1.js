(function() {
  'use strict';

  class GQRResumeCoralV1 extends HTMLElement {
    static get observedAttributes() {
      return ['language'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._data = {};
    }

    set data(value) {
      this._data = value && typeof value === 'object' ? value : {};
      this.render();
    }

    get data() {
      return this._data;
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'language' && oldValue !== newValue) {
        this.render();
      }
    }

    safeStr(v) {
      return v == null ? '' : String(v);
    }

    safeArr(v) {
      return Array.isArray(v) ? v : [];
    }

    escapeHtml(t) {
      return this.safeStr(t)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    getLanguage() {
      const attrLang = this.getAttribute('language');
      const dataLang = this._data && this._data.language;
      const lang = attrLang || dataLang || 'en';
      return lang === 'es' ? 'es' : 'en';
    }

    getI18n(lang) {
      return {
        en: {
          profile: 'Profile',
          experience: 'Work Experience',
          education: 'Education',
          projects: 'Projects',
          certifications: 'Certifications',
          languages: 'Languages',
          achievements: 'Achievements',
          skills: 'Skills',
          present: 'Present',
          levelMap: {
            basic: 'Basic',
            intermediate: 'Intermediate',
            advanced: 'Advanced',
            native: 'Native'
          }
        },
        es: {
          profile: 'Perfil',
          experience: 'Experiencia',
          education: 'Educación',
          projects: 'Proyectos',
          certifications: 'Certificaciones',
          languages: 'Idiomas',
          achievements: 'Logros',
          skills: 'Habilidades',
          present: 'Presente',
          levelMap: {
            basic: 'Básico',
            intermediate: 'Intermedio',
            advanced: 'Avanzado',
            native: 'Nativo'
          }
        }
      }[lang];
    }

    formatShortDate(dateValue, lang) {
      if (!dateValue) return '';
      const date = new Date(dateValue);
      if (Number.isNaN(date.getTime())) return this.escapeHtml(this.safeStr(dateValue));

      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };

      return months[lang][date.getMonth()] + ' ' + date.getFullYear();
    }

    formatDateRange(startDate, endDate, isCurrentLike, lang) {
      const i18n = this.getI18n(lang);
      const start = this.formatShortDate(startDate, lang);
      const end = isCurrentLike ? i18n.present : this.formatShortDate(endDate, lang);

      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderHeader(d) {
      const firstName = this.escapeHtml(this.safeStr(d.firstName));
      const lastName = this.escapeHtml(this.safeStr(d.lastName));
      const profession = this.escapeHtml(this.safeStr(d.profession));
      const email = this.safeStr(d.email);
      const phone = this.safeStr(d.phone);
      const country = this.safeStr(d.country);
      const linkedin = this.safeStr(d.linkedin);

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      const contacts = [];

      if (email) contacts.push('<span class="contact-pill">✉ ' + this.escapeHtml(email) + '</span>');
      if (phone) contacts.push('<span class="contact-pill">☎ ' + this.escapeHtml(phone) + '</span>');
      if (country) contacts.push('<span class="contact-pill">⚲ ' + this.escapeHtml(country) + '</span>');
      if (linkedin) contacts.push('<span class="contact-pill">🔗 ' + this.escapeHtml(linkedin) + '</span>');

      if (!fullName && !profession && contacts.length === 0) return '';

      return [
        '<section class="header-card" data-section="header">',
          '<div class="header-top">',
            fullName ? '<h1 class="name">' + fullName + '</h1>' : '',
            profession ? '<div class="profession">' + profession + '</div>' : '',
          '</div>',
          contacts.length
            ? '<div class="contact-row" data-section="contact">' + contacts.join('') + '</div>'
            : '',
        '</section>'
      ].join('');
    }

    renderProfile(d, i18n) {
      const summary = this.escapeHtml(this.safeStr(d.summary));
      if (!summary) return '';
      return [
        '<section class="section-card" data-section="profile">',
          '<h2 class="section-title">' + this.escapeHtml(i18n.profile) + '</h2>',
          '<div class="section-body">',
            '<p class="summary">' + summary + '</p>',
          '</div>',
        '</section>'
      ].join('');
    }

    renderSkills(d, i18n) {
      const skills = this.safeArr(d.skillsRaw);
      const tools = this.safeArr(d.toolsRaw);
      const merged = [];
      const seen = new Set();

      skills.concat(tools).forEach(function(item) {
        const value = String(item == null ? '' : item).trim();
        const key = value.toLowerCase();
        if (value && !seen.has(key)) {
          seen.add(key);
          merged.push(value);
        }
      });

      if (!merged.length) return '';

      return [
        '<section class="section-card" data-section="skills">',
          '<h2 class="section-title">' + this.escapeHtml(i18n.skills) + '</h2>',
          '<div class="section-body">',
            '<div class="skills-grid">',
              merged.map((skill, index) => (
                '<span class="skill-chip" data-entry-id="skill-' + index + '">' + this.escapeHtml(skill) + '</span>'
              )).join(''),
            '</div>',
          '</div>',
        '</section>'
      ].join('');
    }

    renderExperience(d, i18n, lang) {
      const items = this.safeArr(d.experience).filter(Boolean);
      if (!items.length) return '';

      const entries = items.map((item, idx) => {
        const id = this.escapeHtml(this.safeStr(item.id || ('experience-' + idx)));
        const title = this.escapeHtml(this.safeStr(item.title));
        const company = this.escapeHtml(this.safeStr(item.company));
        const location = this.escapeHtml(this.safeStr(item.location));
        const dateRange = this.escapeHtml(this.formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang));
        const bullets = this.safeArr(item.achievements).concat(this.safeArr(item.responsibilities))
          .map(v => this.safeStr(v).trim())
          .filter(Boolean);

        return [
          '<article class="entry" data-entry-id="' + id + '">',
            '<div class="entry-head">',
              '<div class="entry-head-main">',
                title ? '<h3 class="entry-title">' + title + '</h3>' : '',
                (company || location)
                  ? '<div class="entry-meta">' + [company, location].filter(Boolean).join(' · ') + '</div>'
                  : '',
              '</div>',
              dateRange ? '<div class="entry-date">' + dateRange + '</div>' : '',
            '</div>',
            bullets.length
              ? '<ul class="bullet-list">' + bullets.map(b => '<li>' + this.escapeHtml(b) + '</li>').join('') + '</ul>'
              : '',
          '</article>'
        ].join('');
      }).join('');

      return [
        '<section class="section-card" data-section="experience">',
          '<h2 class="section-title">' + this.escapeHtml(i18n.experience) + '</h2>',
          '<div class="section-body">',
            entries,
          '</div>',
        '</section>'
      ].join('');
    }

    renderProjects(d, i18n) {
      const items = this.safeArr(d.projects).filter(Boolean);
      if (!items.length) return '';

      const entries = items.map((item, idx) => {
        const id = this.escapeHtml(this.safeStr(item.id || ('project-' + idx)));
        const name = this.escapeHtml(this.safeStr(item.name));
        const description = this.escapeHtml(this.safeStr(item.description));
        const technologies = this.safeArr(item.technologies)
          .map(v => this.safeStr(v).trim())
          .filter(Boolean);
        const url = this.escapeHtml(this.safeStr(item.url));

        return [
          '<article class="entry" data-entry-id="' + id + '">',
            '<div class="entry-head">',
              '<div class="entry-head-main">',
                name ? '<h3 class="entry-title">' + name + '</h3>' : '',
                url ? '<div class="entry-link">' + url + '</div>' : '',
              '</div>',
            '</div>',
            description ? '<p class="entry-text">' + description + '</p>' : '',
            technologies.length
              ? '<div class="tag-row">' + technologies.map(t => '<span class="mini-tag">' + this.escapeHtml(t) + '</span>').join('') + '</div>'
              : '',
          '</article>'
        ].join('');
      }).join('');

      return [
        '<section class="section-card" data-section="projects">',
          '<h2 class="section-title">' + this.escapeHtml(i18n.projects) + '</h2>',
          '<div class="section-body">',
            entries,
          '</div>',
        '</section>'
      ].join('');
    }

    renderAchievements(d, i18n) {
      const items = this.safeArr(d.achievements).filter(Boolean);
      if (!items.length) return '';

      const entries = items.map((item, idx) => {
        const id = this.escapeHtml(this.safeStr(item.id || ('achievement-' + idx)));
        const title = this.escapeHtml(this.safeStr(item.title));
        const description = this.escapeHtml(this.safeStr(item.description));
        const year = this.escapeHtml(this.safeStr(item.year));

        return [
          '<article class="entry compact" data-entry-id="' + id + '">',
            '<div class="entry-head">',
              '<div class="entry-head-main">',
                title ? '<h3 class="entry-title">' + title + '</h3>' : '',
              '</div>',
              year ? '<div class="entry-date">' + year + '</div>' : '',
            '</div>',
            description ? '<p class="entry-text">' + description + '</p>' : '',
          '</article>'
        ].join('');
      }).join('');

      return [
        '<section class="section-card" data-section="achievements">',
          '<h2 class="section-title">' + this.escapeHtml(i18n.achievements) + '</h2>',
          '<div class="section-body">',
            entries,
          '</div>',
        '</section>'
      ].join('');
    }

    renderEducation(d, i18n, lang) {
      const items = this.safeArr(d.education).filter(Boolean);
      if (!items.length) return '';

      const entries = items.map((item, idx) => {
        const id = this.escapeHtml(this.safeStr(item.id || ('education-' + idx)));
        const degree = this.escapeHtml(this.safeStr(item.degree));
        const field = this.escapeHtml(this.safeStr(item.field));
        const institution = this.escapeHtml(this.safeStr(item.institution));
        const gpa = this.escapeHtml(this.safeStr(item.gpa));
        const dateRange = this.escapeHtml(this.formatDateRange(item.startDate, item.endDate, item.isCompleted === false, lang));

        const subtitle = [degree, field].filter(Boolean).join(' — ');

        return [
          '<article class="entry" data-entry-id="' + id + '">',
            '<div class="entry-head">',
              '<div class="entry-head-main">',
                subtitle ? '<h3 class="entry-title">' + subtitle + '</h3>' : '',
                institution ? '<div class="entry-meta">' + institution + '</div>' : '',
              '</div>',
              dateRange ? '<div class="entry-date">' + dateRange + '</div>' : '',
            '</div>',
            gpa ? '<p class="entry-text">GPA: ' + gpa + '</p>' : '',
          '</article>'
        ].join('');
      }).join('');

      return [
        '<section class="section-card" data-section="education">',
          '<h2 class="section-title">' + this.escapeHtml(i18n.education) + '</h2>',
          '<div class="section-body">',
            entries,
          '</div>',
        '</section>'
      ].join('');
    }

    renderCertifications(d, i18n, lang) {
      const items = this.safeArr(d.certifications).filter(Boolean);
      if (!items.length) return '';

      const entries = items.map((item, idx) => {
        const id = this.escapeHtml(this.safeStr(item.id || ('certification-' + idx)));
        const name = this.escapeHtml(this.safeStr(item.name));
        const issuer = this.escapeHtml(this.safeStr(item.issuer));
        const date = item.date ? this.escapeHtml(this.formatShortDate(item.date, lang)) : '';

        return [
          '<article class="entry compact" data-entry-id="' + id + '">',
            '<div class="entry-head">',
              '<div class="entry-head-main">',
                name ? '<h3 class="entry-title">' + name + '</h3>' : '',
                issuer ? '<div class="entry-meta">' + issuer + '</div>' : '',
              '</div>',
              date ? '<div class="entry-date">' + date + '</div>' : '',
            '</div>',
          '</article>'
        ].join('');
      }).join('');

      return [
        '<section class="section-card" data-section="certifications">',
          '<h2 class="section-title">' + this.escapeHtml(i18n.certifications) + '</h2>',
          '<div class="section-body">',
            entries,
          '</div>',
        '</section>'
      ].join('');
    }

    renderLanguages(d, i18n) {
      const items = this.safeArr(d.languages).filter(Boolean);
      if (!items.length) return '';

      const entries = items.map((item, idx) => {
        const id = this.escapeHtml(this.safeStr(item.id || ('language-' + idx)));
        const name = this.escapeHtml(this.safeStr(item.name));
        const levelKey = this.safeStr(item.level).toLowerCase();
        const translatedLevel = this.escapeHtml(i18n.levelMap[levelKey] || this.safeStr(item.level));

        return '<div class="language-item" data-entry-id="' + id + '"><span class="language-name">' + name + '</span><span class="language-level">' + translatedLevel + '</span></div>';
      }).join('');

      return [
        '<section class="section-card" data-section="languages">',
          '<h2 class="section-title">' + this.escapeHtml(i18n.languages) + '</h2>',
          '<div class="section-body">',
            '<div class="language-list">' + entries + '</div>',
          '</div>',
        '</section>'
      ].join('');
    }

    render() {
      const d = this._data || {};
      const lang = this.getLanguage();
      const i18n = this.getI18n(lang);

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2a2230;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          * {
            box-sizing: border-box;
          }

          .page {
            width: 210mm;
            min-height: 297mm;
            height: auto;
            overflow: visible;
            margin: 0 auto;
            padding: 16mm 14mm 16mm;
            background:
              linear-gradient(180deg, #1d1821 0 58mm, #fcfafc 58mm 100%);
            font-family: Arial, Helvetica, sans-serif;
            color: #2b2530;
            position: relative;
          }

          .page::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background-image:
              linear-gradient(rgba(120, 98, 134, 0.10) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120, 98, 134, 0.10) 1px, transparent 1px);
            background-size: 24px 24px;
            mask-image: linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.05) 40%, transparent 70%);
            -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.05) 40%, transparent 70%);
          }

          .content {
            position: relative;
            z-index: 1;
            display: block;
          }

          .header-card {
            background: transparent;
            color: #fff7fb;
            border-radius: 20px;
            padding: 8px 2px 18px;
            margin-bottom: 18px;
          }

          .header-top {
            text-align: left;
            margin-bottom: 12px;
          }

          .name {
            margin: 0;
            font-size: 21pt;
            line-height: 1.02;
            font-weight: 800;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            color: #f3dfef;
            text-shadow:
              -2px -2px 0 #1d1821,
               2px -2px 0 #1d1821,
              -2px  2px 0 #1d1821,
               2px  2px 0 #1d1821,
               4px  4px 0 #bfe9e5;
          }

          .profession {
            margin-top: 8px;
            display: inline-block;
            font-size: 10.5pt;
            font-weight: 700;
            color: #1d1821;
            background: linear-gradient(90deg, #f5c4d4, #d8c5ef, #c8efe7);
            padding: 7px 12px;
            border-radius: 999px;
            text-transform: uppercase;
            letter-spacing: 0.7px;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: linear-gradient(90deg, #e6c3ee, #d8efe6);
            color: #2d2531;
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 999px;
            padding: 7px 12px;
            font-size: 9pt;
            line-height: 1.2;
          }

          .section-card {
            background: linear-gradient(135deg, #f0c7ee 0%, #edf7ef 100%);
            border: 1px solid rgba(42, 34, 48, 0.08);
            border-radius: 16px;
            padding: 14px 14px 12px;
            margin-bottom: 12px;
            box-shadow: 0 6px 16px rgba(31, 24, 34, 0.05);
            position: relative;
            overflow: hidden;
          }

          .section-card:nth-of-type(even) {
            background: linear-gradient(135deg, #e5c7ef 0%, #eaf5e8 100%);
          }

          .section-card::after {
            content: "";
            position: absolute;
            right: 12px;
            top: 10px;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background:
              radial-gradient(circle at center, transparent 10px, rgba(0,0,0,0) 10px),
              radial-gradient(circle, rgba(42,34,48,0.11) 2px, transparent 3px);
            background-size: auto, 10px 10px;
            opacity: 0.16;
          }

          .section-title {
            margin: 0 0 10px;
            font-size: 12pt;
            font-weight: 800;
            letter-spacing: 0.6px;
            text-transform: uppercase;
            color: #2a2230;
            display: inline-flex;
            align-items: center;
            gap: 10px;
          }

          .section-title::before {
            content: "";
            width: 6px;
            height: 22px;
            border-radius: 3px;
            background: #2a2230;
            display: inline-block;
          }

          .section-body {
            font-size: 10pt;
            line-height: 1.55;
            color: #332c39;
          }

          .summary {
            margin: 0;
            white-space: pre-line;
          }

          .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .skill-chip {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 6px 11px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.6);
            border: 1px solid rgba(42, 34, 48, 0.1);
            font-size: 9.4pt;
            font-weight: 600;
          }

          .entry {
            padding: 2px 0 10px;
          }

          .entry + .entry {
            margin-top: 8px;
            border-top: 1px solid rgba(42, 34, 48, 0.10);
            padding-top: 10px;
          }

          .entry.compact {
            padding-bottom: 6px;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 4px;
          }

          .entry-head-main {
            flex: 1;
            min-width: 0;
          }

          .entry-title {
            margin: 0;
            font-size: 10.5pt;
            line-height: 1.35;
            font-weight: 800;
            color: #231d28;
          }

          .entry-meta,
          .entry-link {
            margin-top: 2px;
            font-size: 9.2pt;
            color: #5c5364;
            word-break: break-word;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 8.8pt;
            font-weight: 700;
            color: #2d2531;
            background: rgba(255,255,255,0.62);
            border: 1px solid rgba(42,34,48,0.08);
            border-radius: 999px;
            padding: 5px 9px;
            white-space: nowrap;
          }

          .entry-text {
            margin: 6px 0 0;
            font-size: 9.6pt;
            color: #362f3b;
          }

          .bullet-list {
            margin: 7px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 0 0 4px;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
          }

          .mini-tag {
            background: rgba(255,255,255,0.58);
            border: 1px solid rgba(42,34,48,0.08);
            border-radius: 999px;
            padding: 4px 8px;
            font-size: 8.8pt;
            color: #332c39;
          }

          .language-list {
            display: grid;
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .language-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            background: rgba(255,255,255,0.52);
            border-radius: 12px;
            padding: 8px 10px;
            border: 1px solid rgba(42,34,48,0.08);
          }

          .language-name {
            font-weight: 700;
          }

          .language-level {
            color: #5b5263;
            font-size: 9pt;
            font-weight: 700;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          <div class="content">
            ${this.renderHeader(d)}
            ${this.renderProfile(d, i18n)}
            ${this.renderSkills(d, i18n)}
            ${this.renderExperience(d, i18n, lang)}
            ${this.renderProjects(d, i18n)}
            ${this.renderAchievements(d, i18n)}
            ${this.renderEducation(d, i18n, lang)}
            ${this.renderCertifications(d, i18n, lang)}
            ${this.renderLanguages(d, i18n)}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-coral-v1')) {
    customElements.define('gqr-resume-coral-v1', GQRResumeCoralV1);
  }
})();