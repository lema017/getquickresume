(function() {
  'use strict';

  class GQRResumeZenithV1 extends HTMLElement {
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

    getI18n() {
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
      };
    }

    formatDateShort(dateInput, lang) {
      const value = this.safeStr(dateInput).trim();
      if (!value) return '';

      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };

      let date = null;

      if (/^\d{4}-\d{2}-\d{2}$/.test(value) || /^\d{4}-\d{2}$/.test(value)) {
        date = new Date(value.length === 7 ? value + '-01' : value);
      } else if (/^\d{4}$/.test(value)) {
        return value;
      } else {
        const parsed = new Date(value);
        if (!isNaN(parsed.getTime())) date = parsed;
      }

      if (!date || isNaN(date.getTime())) {
        return this.escapeHtml(value);
      }

      return months[lang][date.getMonth()] + ' ' + date.getFullYear();
    }

    formatDateRange(startDate, endDate, currentFlag, lang, presentLabel) {
      const start = this.formatDateShort(startDate, lang);
      const end = currentFlag ? presentLabel : this.formatDateShort(endDate, lang);

      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    buildHeader(data) {
      const firstName = this.safeStr(data.firstName);
      const lastName = this.safeStr(data.lastName);
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      const profession = this.safeStr(data.profession);
      const email = this.safeStr(data.email);
      const phone = this.safeStr(data.phone);
      const country = this.safeStr(data.country);
      const linkedin = this.safeStr(data.linkedin);

      const contactItems = [];
      if (email) contactItems.push('<span class="contact-pill">✉ ' + this.escapeHtml(email) + '</span>');
      if (phone) contactItems.push('<span class="contact-pill">☎ ' + this.escapeHtml(phone) + '</span>');
      if (country) contactItems.push('<span class="contact-pill">⚲ ' + this.escapeHtml(country) + '</span>');
      if (linkedin) contactItems.push('<span class="contact-pill">🔗 ' + this.escapeHtml(linkedin) + '</span>');

      if (!fullName && !profession && !contactItems.length) return '';

      return '' +
        '<section class="section header-wrap" data-section="header">' +
          '<div class="header-band">' +
            '<div class="name-block">' +
              (fullName ? '<h1 class="name">' + this.escapeHtml(fullName) + '</h1>' : '') +
              (profession ? '<div class="profession">' + this.escapeHtml(profession) + '</div>' : '') +
            '</div>' +
          '</div>' +
          (contactItems.length ? '<div class="contact-row" data-section="contact">' + contactItems.join('') + '</div>' : '') +
        '</section>';
    }

    buildProfile(summary, t) {
      const text = this.safeStr(summary).trim();
      if (!text) return '';
      return '' +
        '<section class="section" data-section="profile">' +
          '<h2 class="section-title">' + this.escapeHtml(t.profile) + '</h2>' +
          '<div class="section-body">' +
            '<p class="summary">' + this.escapeHtml(text) + '</p>' +
          '</div>' +
        '</section>';
    }

    buildSkills(data, t) {
      const skills = this.safeArr(data.skillsRaw).map(v => this.safeStr(v).trim()).filter(Boolean);
      const tools = this.safeArr(data.toolsRaw).map(v => this.safeStr(v).trim()).filter(Boolean);
      const merged = [];
      const seen = new Set();

      skills.concat(tools).forEach(item => {
        const key = item.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          merged.push(item);
        }
      });

      if (!merged.length) return '';

      return '' +
        '<section class="section" data-section="skills">' +
          '<h2 class="section-title">' + this.escapeHtml(t.skills) + '</h2>' +
          '<div class="section-body">' +
            '<div class="chips">' +
              merged.map(function(item, index) {
                return '<span class="chip" data-entry-id="skill-' + index + '">' + this.escapeHtml(item) + '</span>';
              }, this).join('') +
            '</div>' +
          '</div>' +
        '</section>';
    }

    buildExperience(items, t, lang) {
      const list = this.safeArr(items).filter(item => item && typeof item === 'object');
      if (!list.length) return '';

      const presentLabel = t.present;

      return '' +
        '<section class="section" data-section="experience">' +
          '<h2 class="section-title">' + this.escapeHtml(t.experience) + '</h2>' +
          '<div class="section-body stack">' +
            list.map(item => {
              const id = this.safeStr(item.id) || ('experience-' + Math.random().toString(36).slice(2));
              const title = this.safeStr(item.title);
              const company = this.safeStr(item.company);
              const location = this.safeStr(item.location);
              const dateRange = this.formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang, presentLabel);
              const bullets = this.safeArr(item.achievements).concat(this.safeArr(item.responsibilities))
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);

              if (!title && !company && !location && !dateRange && !bullets.length) return '';

              const metaParts = [];
              if (company) metaParts.push(this.escapeHtml(company));
              if (location) metaParts.push(this.escapeHtml(location));

              return '' +
                '<article class="entry" data-entry-id="' + this.escapeHtml(id) + '">' +
                  '<div class="entry-head">' +
                    '<div>' +
                      (title ? '<h3 class="entry-title">' + this.escapeHtml(title) + '</h3>' : '') +
                      (metaParts.length ? '<div class="entry-subtitle">' + metaParts.join(' · ') + '</div>' : '') +
                    '</div>' +
                    (dateRange ? '<div class="entry-date">' + this.escapeHtml(dateRange) + '</div>' : '') +
                  '</div>' +
                  (bullets.length ? '<ul class="bullets">' + bullets.map(b => '<li>' + this.escapeHtml(b) + '</li>').join('') + '</ul>' : '') +
                '</article>';
            }).join('') +
          '</div>' +
        '</section>';
    }

    buildProjects(items, t) {
      const list = this.safeArr(items).filter(item => item && typeof item === 'object');
      if (!list.length) return '';

      return '' +
        '<section class="section" data-section="projects">' +
          '<h2 class="section-title">' + this.escapeHtml(t.projects) + '</h2>' +
          '<div class="section-body stack">' +
            list.map(item => {
              const id = this.safeStr(item.id) || ('project-' + Math.random().toString(36).slice(2));
              const name = this.safeStr(item.name);
              const description = this.safeStr(item.description);
              const technologies = this.safeArr(item.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const url = this.safeStr(item.url);

              if (!name && !description && !technologies.length && !url) return '';

              return '' +
                '<article class="entry" data-entry-id="' + this.escapeHtml(id) + '">' +
                  '<div class="entry-head">' +
                    '<div>' +
                      (name ? '<h3 class="entry-title">' + this.escapeHtml(name) + '</h3>' : '') +
                    '</div>' +
                  '</div>' +
                  (description ? '<p class="entry-text">' + this.escapeHtml(description) + '</p>' : '') +
                  (technologies.length ? '<div class="inline-meta"><strong>Tech:</strong> ' + this.escapeHtml(technologies.join(', ')) + '</div>' : '') +
                  (url ? '<div class="inline-meta"><strong>URL:</strong> ' + this.escapeHtml(url) + '</div>' : '') +
                '</article>';
            }).join('') +
          '</div>' +
        '</section>';
    }

    buildAchievements(items, t) {
      const list = this.safeArr(items).filter(item => item && typeof item === 'object');
      if (!list.length) return '';

      return '' +
        '<section class="section" data-section="achievements">' +
          '<h2 class="section-title">' + this.escapeHtml(t.achievements) + '</h2>' +
          '<div class="section-body stack">' +
            list.map(item => {
              const id = this.safeStr(item.id) || ('achievement-' + Math.random().toString(36).slice(2));
              const title = this.safeStr(item.title);
              const description = this.safeStr(item.description);
              const year = this.safeStr(item.year);

              if (!title && !description && !year) return '';

              return '' +
                '<article class="entry compact" data-entry-id="' + this.escapeHtml(id) + '">' +
                  '<div class="entry-head">' +
                    '<div>' +
                      (title ? '<h3 class="entry-title">' + this.escapeHtml(title) + '</h3>' : '') +
                    '</div>' +
                    (year ? '<div class="entry-date">' + this.escapeHtml(year) + '</div>' : '') +
                  '</div>' +
                  (description ? '<p class="entry-text">' + this.escapeHtml(description) + '</p>' : '') +
                '</article>';
            }).join('') +
          '</div>' +
        '</section>';
    }

    buildEducation(items, t, lang) {
      const list = this.safeArr(items).filter(item => item && typeof item === 'object');
      if (!list.length) return '';

      const presentLabel = t.present;

      return '' +
        '<section class="section" data-section="education">' +
          '<h2 class="section-title">' + this.escapeHtml(t.education) + '</h2>' +
          '<div class="section-body stack">' +
            list.map(item => {
              const id = this.safeStr(item.id) || ('education-' + Math.random().toString(36).slice(2));
              const degree = this.safeStr(item.degree);
              const field = this.safeStr(item.field);
              const institution = this.safeStr(item.institution);
              const gpa = this.safeStr(item.gpa);
              const dateRange = this.formatDateRange(
                item.startDate,
                item.endDate,
                item.isCompleted === false,
                lang,
                presentLabel
              );

              if (!degree && !field && !institution && !gpa && !dateRange) return '';

              const title = [degree, field].filter(Boolean).join(' — ');

              return '' +
                '<article class="entry compact" data-entry-id="' + this.escapeHtml(id) + '">' +
                  '<div class="entry-head">' +
                    '<div>' +
                      (title ? '<h3 class="entry-title">' + this.escapeHtml(title) + '</h3>' : '') +
                      (institution ? '<div class="entry-subtitle">' + this.escapeHtml(institution) + '</div>' : '') +
                    '</div>' +
                    (dateRange ? '<div class="entry-date">' + this.escapeHtml(dateRange) + '</div>' : '') +
                  '</div>' +
                  (gpa ? '<div class="inline-meta"><strong>GPA:</strong> ' + this.escapeHtml(gpa) + '</div>' : '') +
                '</article>';
            }).join('') +
          '</div>' +
        '</section>';
    }

    buildCertifications(items, t, lang) {
      const list = this.safeArr(items).filter(item => item && typeof item === 'object');
      if (!list.length) return '';

      return '' +
        '<section class="section" data-section="certifications">' +
          '<h2 class="section-title">' + this.escapeHtml(t.certifications) + '</h2>' +
          '<div class="section-body stack">' +
            list.map(item => {
              const id = this.safeStr(item.id) || ('certification-' + Math.random().toString(36).slice(2));
              const name = this.safeStr(item.name);
              const issuer = this.safeStr(item.issuer);
              const date = this.formatDateShort(item.date, lang);

              if (!name && !issuer && !date) return '';

              return '' +
                '<article class="entry compact" data-entry-id="' + this.escapeHtml(id) + '">' +
                  '<div class="entry-head">' +
                    '<div>' +
                      (name ? '<h3 class="entry-title">' + this.escapeHtml(name) + '</h3>' : '') +
                      (issuer ? '<div class="entry-subtitle">' + this.escapeHtml(issuer) + '</div>' : '') +
                    '</div>' +
                    (date ? '<div class="entry-date">' + this.escapeHtml(date) + '</div>' : '') +
                  '</div>' +
                '</article>';
            }).join('') +
          '</div>' +
        '</section>';
    }

    buildLanguages(items, t) {
      const list = this.safeArr(items).filter(item => item && typeof item === 'object');
      if (!list.length) return '';

      return '' +
        '<section class="section" data-section="languages">' +
          '<h2 class="section-title">' + this.escapeHtml(t.languages) + '</h2>' +
          '<div class="section-body">' +
            '<div class="language-list">' +
              list.map(item => {
                const id = this.safeStr(item.id) || ('language-' + Math.random().toString(36).slice(2));
                const name = this.safeStr(item.name);
                const levelKey = this.safeStr(item.level).toLowerCase();
                const level = t.levelMap[levelKey] || this.safeStr(item.level);

                if (!name && !level) return '';

                return '' +
                  '<div class="language-item" data-entry-id="' + this.escapeHtml(id) + '">' +
                    '<span class="language-name">' + this.escapeHtml(name) + '</span>' +
                    '<span class="language-sep">—</span>' +
                    '<span class="language-level">' + this.escapeHtml(level) + '</span>' +
                  '</div>';
              }).join('') +
            '</div>' +
          '</div>' +
        '</section>';
    }

    render() {
      const data = this._data || {};
      const lang = this.getLanguage();
      const i18n = this.getI18n();
      const t = i18n[lang];

      const html = '' +
        '<style>' +
          '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");' +
          ':host {' +
            'display: block;' +
            'color: #2d3742;' +
            'font-family: "Inter", Arial, Helvetica, sans-serif;' +
            '-webkit-print-color-adjust: exact;' +
            'print-color-adjust: exact;' +
          '}' +
          '* { box-sizing: border-box; }' +
          '.page {' +
            'width: 210mm;' +
            'min-height: 297mm;' +
            'height: auto;' +
            'overflow: visible;' +
            'margin: 0 auto;' +
            'background: #ffffff;' +
            'padding: 18mm 16mm 18mm 16mm;' +
            'position: relative;' +
          '}' +
          '.page::before {' +
            'content: "";' +
            'position: absolute;' +
            'top: 0;' +
            'right: 0;' +
            'width: 52mm;' +
            'height: 20mm;' +
            'background: #36414f;' +
            'border-bottom-left-radius: 22mm;' +
          '}' +
          '.page::after {' +
            'content: "";' +
            'position: absolute;' +
            'top: 28mm;' +
            'left: 16mm;' +
            'right: 16mm;' +
            'height: 1px;' +
            'background: #97a1ab;' +
          '}' +
          '.section {' +
            'margin-top: 9mm;' +
            'position: relative;' +
          '}' +
          '.header-wrap {' +
            'margin-top: 0;' +
            'padding-top: 6mm;' +
          '}' +
          '.header-band {' +
            'background: linear-gradient(180deg, #36414f 0%, #3d4856 100%);' +
            'color: #ffffff;' +
            'padding: 10mm 9mm 7mm 9mm;' +
            'border-radius: 2mm;' +
            'box-shadow: 0 1mm 2mm rgba(54, 65, 79, 0.08);' +
          '}' +
          '.name {' +
            'margin: 0;' +
            'font-size: 28px;' +
            'line-height: 1.1;' +
            'letter-spacing: 0.04em;' +
            'font-weight: 800;' +
            'text-transform: uppercase;' +
          '}' +
          '.profession {' +
            'margin-top: 4px;' +
            'font-size: 12px;' +
            'letter-spacing: 0.28em;' +
            'text-transform: uppercase;' +
            'opacity: 0.92;' +
            'font-weight: 500;' +
          '}' +
          '.contact-row {' +
            'display: flex;' +
            'flex-wrap: wrap;' +
            'gap: 8px;' +
            'margin-top: 10px;' +
          '}' +
          '.contact-pill {' +
            'display: inline-flex;' +
            'align-items: center;' +
            'padding: 6px 10px;' +
            'border: 1px solid #cfd6dc;' +
            'border-radius: 999px;' +
            'font-size: 11px;' +
            'color: #3f4b58;' +
            'background: #f8fafb;' +
          '}' +
          '.section-title {' +
            'margin: 0 0 4mm 0;' +
            'font-size: 15px;' +
            'font-weight: 800;' +
            'letter-spacing: 0.08em;' +
            'text-transform: uppercase;' +
            'color: #36414f;' +
            'display: flex;' +
            'align-items: center;' +
            'gap: 10px;' +
          '}' +
          '.section-title::after {' +
            'content: "";' +
            'height: 1px;' +
            'background: #b8c0c8;' +
            'flex: 1;' +
          '}' +
          '.section-body {' +
            'font-size: 12.2px;' +
            'line-height: 1.55;' +
            'color: #44515e;' +
          '}' +
          '.summary {' +
            'margin: 0;' +
          '}' +
          '.chips {' +
            'display: flex;' +
            'flex-wrap: wrap;' +
            'gap: 7px;' +
          '}' +
          '.chip {' +
            'display: inline-block;' +
            'padding: 6px 10px;' +
            'border-radius: 999px;' +
            'background: #e9edf1;' +
            'border: 1px solid #c8d0d8;' +
            'color: #33404c;' +
            'font-size: 11.5px;' +
            'font-weight: 600;' +
          '}' +
          '.stack {' +
            'display: flex;' +
            'flex-direction: column;' +
            'gap: 5mm;' +
          '}' +
          '.entry {' +
            'padding-bottom: 4mm;' +
            'border-bottom: 1px solid #e3e8ec;' +
          '}' +
          '.entry:last-child {' +
            'border-bottom: none;' +
            'padding-bottom: 0;' +
          '}' +
          '.entry.compact {' +
            'padding-bottom: 3.5mm;' +
          '}' +
          '.entry-head {' +
            'display: flex;' +
            'justify-content: space-between;' +
            'align-items: flex-start;' +
            'gap: 10px;' +
            'margin-bottom: 4px;' +
          '}' +
          '.entry-title {' +
            'margin: 0;' +
            'font-size: 13.2px;' +
            'line-height: 1.35;' +
            'font-weight: 700;' +
            'color: #2f3a46;' +
          '}' +
          '.entry-subtitle {' +
            'margin-top: 2px;' +
            'font-size: 11.5px;' +
            'color: #667381;' +
            'font-weight: 500;' +
          '}' +
          '.entry-date {' +
            'flex: 0 0 auto;' +
            'font-size: 11px;' +
            'color: #4e5b68;' +
            'font-weight: 700;' +
            'letter-spacing: 0.03em;' +
            'white-space: nowrap;' +
            'padding-top: 1px;' +
          '}' +
          '.entry-text {' +
            'margin: 4px 0 0 0;' +
          '}' +
          '.bullets {' +
            'margin: 6px 0 0 0;' +
            'padding-left: 18px;' +
          '}' +
          '.bullets li {' +
            'margin: 0 0 4px 0;' +
          '}' +
          '.inline-meta {' +
            'margin-top: 4px;' +
            'font-size: 11.4px;' +
            'color: #51606d;' +
          '}' +
          '.language-list {' +
            'display: flex;' +
            'flex-direction: column;' +
            'gap: 7px;' +
          '}' +
          '.language-item {' +
            'display: flex;' +
            'align-items: center;' +
            'gap: 6px;' +
            'padding: 6px 0;' +
            'border-bottom: 1px dashed #d7dee5;' +
          '}' +
          '.language-item:last-child {' +
            'border-bottom: none;' +
          '}' +
          '.language-name {' +
            'font-weight: 700;' +
            'color: #34404d;' +
          '}' +
          '.language-sep {' +
            'color: #7a8793;' +
          '}' +
          '.language-level {' +
            'color: #55626f;' +
          '}' +
          '@media print {' +
            '.page {' +
              'width: 210mm;' +
              'min-height: 297mm;' +
            '}' +
          '}' +
        '</style>' +
        '<div class="page">' +
          this.buildHeader(data) +
          this.buildProfile(data.summary, t) +
          this.buildSkills(data, t) +
          this.buildExperience(data.experience, t, lang) +
          this.buildProjects(data.projects, t) +
          this.buildAchievements(data.achievements, t) +
          this.buildEducation(data.education, t, lang) +
          this.buildCertifications(data.certifications, t, lang) +
          this.buildLanguages(data.languages, t) +
        '</div>';

      this.shadowRoot.innerHTML = html;
    }
  }

  if (!customElements.get('gqr-resume-zenith-v1')) {
    customElements.define('gqr-resume-zenith-v1', GQRResumeZenithV1);
  }
})();