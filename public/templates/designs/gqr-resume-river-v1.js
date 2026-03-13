(function() {
  'use strict';

  class GQRResumeRiverV1 extends HTMLElement {
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

    getLanguage() {
      const attrLang = this.getAttribute('language');
      const dataLang = this._data && this._data.language;
      const lang = attrLang || dataLang || 'en';
      return lang === 'es' ? 'es' : 'en';
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

    formatDate(dateInput, lang) {
      if (!dateInput) return '';
      const date = new Date(dateInput);
      if (Number.isNaN(date.getTime())) {
        return this.escapeHtml(this.safeStr(dateInput));
      }
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months[date.getMonth()] + ' ' + date.getFullYear();
    }

    formatDateRange(startDate, endDate, lang, opts) {
      const i18n = this.getI18n(lang);
      const start = this.formatDate(startDate, lang);
      let end = '';

      if (opts && opts.type === 'education') {
        if (opts.isCompleted === false) {
          end = i18n.present;
        } else {
          end = this.formatDate(endDate, lang);
        }
      } else {
        if (opts && opts.isCurrent) {
          end = i18n.present;
        } else {
          end = this.formatDate(endDate, lang);
        }
      }

      if (start && end) return start + ' — ' + end;
      return start || end || '';
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
      }[lang === 'es' ? 'es' : 'en'];
    }

    renderHeader(d) {
      const firstName = this.escapeHtml(this.safeStr(d.firstName));
      const lastName = this.escapeHtml(this.safeStr(d.lastName));
      const profession = this.escapeHtml(this.safeStr(d.profession));
      const email = this.escapeHtml(this.safeStr(d.email));
      const phone = this.escapeHtml(this.safeStr(d.phone));
      const country = this.escapeHtml(this.safeStr(d.country));
      const linkedin = this.escapeHtml(this.safeStr(d.linkedin));

      const fullName = [firstName, lastName].filter(Boolean).join(' ');
      const contactItems = [];

      if (email) contactItems.push('<span class="contact-pill">✉ ' + email + '</span>');
      if (phone) contactItems.push('<span class="contact-pill">☎ ' + phone + '</span>');
      if (country) contactItems.push('<span class="contact-pill">⚲ ' + country + '</span>');
      if (linkedin) contactItems.push('<span class="contact-pill">🔗 ' + linkedin + '</span>');

      if (!fullName && !profession && contactItems.length === 0) return '';

      return '' +
        '<header class="hero" data-section="header">' +
          '<div class="hero-grid">' +
            '<div class="hero-left">' +
              (fullName ? '<h1 class="name">' + fullName + '</h1>' : '') +
              (profession ? '<div class="profession">' + profession + '</div>' : '') +
            '</div>' +
          '</div>' +
          (contactItems.length ? '<div class="contact-row" data-section="contact">' + contactItems.join('') + '</div>' : '') +
        '</header>';
    }

    renderProfile(summary, t) {
      const text = this.escapeHtml(this.safeStr(summary));
      if (!text) return '';
      return '' +
        '<section class="section" data-section="profile">' +
          '<h2 class="section-title">' + this.escapeHtml(t.profile) + '</h2>' +
          '<div class="section-body">' +
            '<p class="profile-text">' + text + '</p>' +
          '</div>' +
        '</section>';
    }

    renderSkills(skillsRaw, toolsRaw, t) {
      const merged = Array.from(new Set(
        this.safeArr(skillsRaw)
          .concat(this.safeArr(toolsRaw))
          .map(function(item) { return String(item || '').trim(); })
          .filter(Boolean)
      ));

      if (!merged.length) return '';

      return '' +
        '<section class="section" data-section="skills">' +
          '<h2 class="section-title">' + this.escapeHtml(t.skills) + '</h2>' +
          '<div class="section-body">' +
            '<div class="tags">' +
              merged.map((skill, index) =>
                '<span class="tag" data-entry-id="skill-' + index + '">' + this.escapeHtml(skill) + '</span>'
              ).join('') +
            '</div>' +
          '</div>' +
        '</section>';
    }

    renderExperience(experience, t, lang) {
      const items = this.safeArr(experience).filter(Boolean);
      if (!items.length) return '';

      return '' +
        '<section class="section" data-section="experience">' +
          '<h2 class="section-title">' + this.escapeHtml(t.experience) + '</h2>' +
          '<div class="section-body timeline">' +
            items.map((item, index) => {
              const id = this.escapeHtml(this.safeStr(item.id || ('exp-' + index)));
              const title = this.escapeHtml(this.safeStr(item.title));
              const company = this.escapeHtml(this.safeStr(item.company));
              const location = this.escapeHtml(this.safeStr(item.location));
              const range = this.escapeHtml(this.formatDateRange(item.startDate, item.endDate, lang, {
                isCurrent: !!item.isCurrent
              }));
              const bullets = this.safeArr(item.achievements).concat(this.safeArr(item.responsibilities))
                .map(v => this.safeStr(v).trim())
                .filter(Boolean);

              return '' +
                '<article class="entry timeline-entry" data-entry-id="' + id + '">' +
                  '<div class="entry-head">' +
                    '<div>' +
                      ((title || company) ? '<h3 class="entry-title">' + [title, company].filter(Boolean).join(' · ') + '</h3>' : '') +
                      (location ? '<div class="entry-subtitle">' + location + '</div>' : '') +
                    '</div>' +
                    (range ? '<div class="entry-date">' + range + '</div>' : '') +
                  '</div>' +
                  (bullets.length ? (
                    '<ul class="bullet-list">' +
                      bullets.map(b => '<li>' + this.escapeHtml(b) + '</li>').join('') +
                    '</ul>'
                  ) : '') +
                '</article>';
            }).join('') +
          '</div>' +
        '</section>';
    }

    renderProjects(projects, t) {
      const items = this.safeArr(projects).filter(Boolean);
      if (!items.length) return '';

      return '' +
        '<section class="section" data-section="projects">' +
          '<h2 class="section-title">' + this.escapeHtml(t.projects) + '</h2>' +
          '<div class="section-body stack">' +
            items.map((item, index) => {
              const id = this.escapeHtml(this.safeStr(item.id || ('project-' + index)));
              const name = this.escapeHtml(this.safeStr(item.name));
              const description = this.escapeHtml(this.safeStr(item.description));
              const technologies = this.safeArr(item.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const url = this.escapeHtml(this.safeStr(item.url));

              return '' +
                '<article class="entry project-entry" data-entry-id="' + id + '">' +
                  (name ? '<h3 class="entry-title">' + name + '</h3>' : '') +
                  (description ? '<p class="entry-text">' + description + '</p>' : '') +
                  (technologies.length ? '<div class="mini-tags">' + technologies.map(tech => '<span class="mini-tag">' + this.escapeHtml(tech) + '</span>').join('') + '</div>' : '') +
                  (url ? '<div class="entry-link">' + url + '</div>' : '') +
                '</article>';
            }).join('') +
          '</div>' +
        '</section>';
    }

    renderAchievements(achievements, t) {
      const items = this.safeArr(achievements).filter(Boolean);
      if (!items.length) return '';

      return '' +
        '<section class="section" data-section="achievements">' +
          '<h2 class="section-title">' + this.escapeHtml(t.achievements) + '</h2>' +
          '<div class="section-body stack">' +
            items.map((item, index) => {
              const id = this.escapeHtml(this.safeStr(item.id || ('achievement-' + index)));
              const title = this.escapeHtml(this.safeStr(item.title));
              const description = this.escapeHtml(this.safeStr(item.description));
              const year = this.escapeHtml(this.safeStr(item.year));

              return '' +
                '<article class="entry achievement-entry" data-entry-id="' + id + '">' +
                  '<div class="entry-head">' +
                    (title ? '<h3 class="entry-title">' + title + '</h3>' : '<span></span>') +
                    (year ? '<div class="entry-date">' + year + '</div>' : '') +
                  '</div>' +
                  (description ? '<p class="entry-text">' + description + '</p>' : '') +
                '</article>';
            }).join('') +
          '</div>' +
        '</section>';
    }

    renderEducation(education, t, lang) {
      const items = this.safeArr(education).filter(Boolean);
      if (!items.length) return '';

      return '' +
        '<section class="section" data-section="education">' +
          '<h2 class="section-title">' + this.escapeHtml(t.education) + '</h2>' +
          '<div class="section-body stack">' +
            items.map((item, index) => {
              const id = this.escapeHtml(this.safeStr(item.id || ('education-' + index)));
              const degree = this.escapeHtml(this.safeStr(item.degree));
              const field = this.escapeHtml(this.safeStr(item.field));
              const institution = this.escapeHtml(this.safeStr(item.institution));
              const gpa = this.escapeHtml(this.safeStr(item.gpa));
              const range = this.escapeHtml(this.formatDateRange(item.startDate, item.endDate, lang, {
                type: 'education',
                isCompleted: item.isCompleted
              }));

              return '' +
                '<article class="entry education-entry" data-entry-id="' + id + '">' +
                  '<div class="entry-head">' +
                    '<div>' +
                      ((degree || field) ? '<h3 class="entry-title">' + [degree, field].filter(Boolean).join(' in ') + '</h3>' : '') +
                      (institution ? '<div class="entry-subtitle">' + institution + '</div>' : '') +
                    '</div>' +
                    (range ? '<div class="entry-date">' + range + '</div>' : '') +
                  '</div>' +
                  (gpa ? '<div class="meta-line">GPA: ' + gpa + '</div>' : '') +
                '</article>';
            }).join('') +
          '</div>' +
        '</section>';
    }

    renderCertifications(certifications, t, lang) {
      const items = this.safeArr(certifications).filter(Boolean);
      if (!items.length) return '';

      return '' +
        '<section class="section" data-section="certifications">' +
          '<h2 class="section-title">' + this.escapeHtml(t.certifications) + '</h2>' +
          '<div class="section-body stack">' +
            items.map((item, index) => {
              const id = this.escapeHtml(this.safeStr(item.id || ('cert-' + index)));
              const name = this.escapeHtml(this.safeStr(item.name));
              const issuer = this.escapeHtml(this.safeStr(item.issuer));
              const date = item.date ? this.escapeHtml(this.formatDate(item.date, lang)) : '';

              return '' +
                '<article class="entry certification-entry" data-entry-id="' + id + '">' +
                  '<div class="entry-head">' +
                    '<div>' +
                      (name ? '<h3 class="entry-title">' + name + '</h3>' : '') +
                      (issuer ? '<div class="entry-subtitle">' + issuer + '</div>' : '') +
                    '</div>' +
                    (date ? '<div class="entry-date">' + date + '</div>' : '') +
                  '</div>' +
                '</article>';
            }).join('') +
          '</div>' +
        '</section>';
    }

    renderLanguages(languages, t) {
      const items = this.safeArr(languages).filter(Boolean);
      if (!items.length) return '';

      return '' +
        '<section class="section" data-section="languages">' +
          '<h2 class="section-title">' + this.escapeHtml(t.languages) + '</h2>' +
          '<div class="section-body languages-list">' +
            items.map((item, index) => {
              const id = this.escapeHtml(this.safeStr(item.id || ('lang-' + index)));
              const name = this.escapeHtml(this.safeStr(item.name));
              const rawLevel = this.safeStr(item.level).toLowerCase();
              const level = this.escapeHtml(t.levelMap[rawLevel] || this.safeStr(item.level));

              return '' +
                '<div class="language-item" data-entry-id="' + id + '">' +
                  '<span class="language-name">' + name + '</span>' +
                  '<span class="language-sep">—</span>' +
                  '<span class="language-level">' + level + '</span>' +
                '</div>';
            }).join('') +
          '</div>' +
        '</section>';
    }

    render() {
      const d = this._data || {};
      const lang = this.getLanguage();
      const t = this.getI18n(lang);

      const html = '' +
        '<style>' +
          '@import url("https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@400;500;600;700;800&display=swap");' +

          ':host {' +
            'display: block;' +
            'color: #1c1c1c;' +
            'font-family: "Inter", Arial, sans-serif;' +
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
            'padding: 0;' +
            'background:' +
              'linear-gradient(180deg, #141414 0, #141414 56mm, #f5f6f2 56mm, #f5f6f2 100%);' +
            'color: #1d1d1d;' +
            'position: relative;' +
          '}' +

          '.page::before {' +
            'content: "";' +
            'position: absolute;' +
            'inset: 56mm 0 0 0;' +
            'background-image:' +
              'linear-gradient(rgba(112,129,151,0.12) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(112,129,151,0.12) 1px, transparent 1px);' +
            'background-size: 18px 18px;' +
            'pointer-events: none;' +
            'z-index: 0;' +
          '}' +

          '.content {' +
            'position: relative;' +
            'z-index: 1;' +
            'padding: 22mm 16mm 16mm;' +
          '}' +

          '.hero {' +
            'background: transparent;' +
            'color: #fff;' +
            'padding-bottom: 10mm;' +
            'position: relative;' +
          '}' +

          '.hero-grid {' +
            'display: block;' +
          '}' +

          '.name {' +
            'margin: 0;' +
            'font-size: 18mm;' +
            'line-height: 0.92;' +
            'font-weight: 800;' +
            'letter-spacing: 0.4mm;' +
            'text-transform: uppercase;' +
            'max-width: 160mm;' +
          '}' +

          '.profession {' +
            'margin-top: 4mm;' +
            'font-size: 4.6mm;' +
            'font-weight: 600;' +
            'letter-spacing: 0.6mm;' +
            'text-transform: uppercase;' +
            'color: #d7d7d7;' +
          '}' +

          '.contact-row {' +
            'display: flex;' +
            'flex-wrap: wrap;' +
            'gap: 2.5mm;' +
            'margin-top: 6mm;' +
          '}' +

          '.contact-pill {' +
            'display: inline-flex;' +
            'align-items: center;' +
            'padding: 2.2mm 3.2mm;' +
            'border: 1px solid rgba(255,255,255,0.2);' +
            'border-radius: 999px;' +
            'background: rgba(255,255,255,0.06);' +
            'font-size: 3.2mm;' +
            'line-height: 1.2;' +
            'color: #f3f3f3;' +
          '}' +

          '.section {' +
            'margin-top: 8mm;' +
            'position: relative;' +
          '}' +

          '.section:first-of-type {' +
            'margin-top: 0;' +
          '}' +

          '.section-title {' +
            'margin: 0 0 4mm;' +
            'display: inline-block;' +
            'position: relative;' +
            'font-size: 5.1mm;' +
            'font-weight: 800;' +
            'line-height: 1.1;' +
            'text-transform: uppercase;' +
            'letter-spacing: 0.5mm;' +
            'color: #161616;' +
            'padding-right: 10mm;' +
          '}' +

          '.section-title::after {' +
            'content: "";' +
            'position: absolute;' +
            'left: 100%;' +
            'top: 50%;' +
            'width: 34mm;' +
            'height: 0.8mm;' +
            'background: #161616;' +
            'transform: translateY(-50%);' +
          '}' +

          '.section-title::before {' +
            'content: "";' +
            'position: absolute;' +
            'left: -2mm;' +
            'bottom: -1.5mm;' +
            'width: calc(100% + 2mm);' +
            'height: 1.2mm;' +
            'background: rgba(0,0,0,0.08);' +
          '}' +

          '.section-body {' +
            'background: rgba(255,255,255,0.78);' +
            'border: 1px solid rgba(0,0,0,0.08);' +
            'padding: 4.5mm 4.5mm 4mm;' +
            'box-shadow: 0 1.5mm 0 rgba(0,0,0,0.03);' +
          '}' +

          '.profile-text, .entry-text, .entry-subtitle, .meta-line, .entry-link, .language-item, .bullet-list li {' +
            'font-size: 3.45mm;' +
            'line-height: 1.55;' +
          '}' +

          '.profile-text {' +
            'margin: 0;' +
            'white-space: pre-wrap;' +
          '}' +

          '.tags, .mini-tags {' +
            'display: flex;' +
            'flex-wrap: wrap;' +
            'gap: 2.4mm;' +
          '}' +

          '.tag {' +
            'display: inline-flex;' +
            'align-items: center;' +
            'padding: 2.2mm 3.4mm;' +
            'background: #171717;' +
            'color: #fff;' +
            'border-radius: 999px;' +
            'font-size: 3.2mm;' +
            'font-weight: 600;' +
            'letter-spacing: 0.1mm;' +
          '}' +

          '.mini-tag {' +
            'display: inline-flex;' +
            'padding: 1.6mm 2.6mm;' +
            'border: 1px solid rgba(0,0,0,0.15);' +
            'border-radius: 999px;' +
            'font-size: 2.95mm;' +
            'font-weight: 600;' +
            'background: #fff;' +
          '}' +

          '.stack {' +
            'display: grid;' +
            'gap: 3.6mm;' +
          '}' +

          '.timeline {' +
            'display: grid;' +
            'gap: 4mm;' +
          '}' +

          '.timeline-entry {' +
            'position: relative;' +
            'padding-left: 5mm;' +
          '}' +

          '.timeline-entry::before {' +
            'content: "";' +
            'position: absolute;' +
            'left: 0.8mm;' +
            'top: 1.5mm;' +
            'bottom: -4mm;' +
            'width: 0.5mm;' +
            'background: rgba(0,0,0,0.18);' +
          '}' +

          '.timeline-entry::after {' +
            'content: "";' +
            'position: absolute;' +
            'left: 0;' +
            'top: 1.2mm;' +
            'width: 2mm;' +
            'height: 2mm;' +
            'border-radius: 50%;' +
            'background: #1a1a1a;' +
          '}' +

          '.timeline-entry:last-child::before {' +
            'bottom: 0;' +
          '}' +

          '.entry {' +
            'break-inside: avoid;' +
          '}' +

          '.entry-head {' +
            'display: flex;' +
            'justify-content: space-between;' +
            'gap: 4mm;' +
            'align-items: flex-start;' +
          '}' +

          '.entry-title {' +
            'margin: 0;' +
            'font-size: 4mm;' +
            'line-height: 1.3;' +
            'font-weight: 800;' +
            'color: #111;' +
          '}' +

          '.entry-subtitle {' +
            'margin-top: 1mm;' +
            'color: #434343;' +
          '}' +

          '.entry-date {' +
            'white-space: nowrap;' +
            'font-size: 3.1mm;' +
            'font-weight: 700;' +
            'text-transform: uppercase;' +
            'letter-spacing: 0.25mm;' +
            'color: #2b2b2b;' +
            'padding-top: 0.4mm;' +
          '}' +

          '.entry-text {' +
            'margin: 2mm 0 0;' +
          '}' +

          '.entry-link {' +
            'margin-top: 2mm;' +
            'font-weight: 600;' +
            'word-break: break-word;' +
          '}' +

          '.meta-line {' +
            'margin-top: 1.6mm;' +
            'font-weight: 600;' +
            'color: #2f2f2f;' +
          '}' +

          '.bullet-list {' +
            'margin: 2.2mm 0 0;' +
            'padding-left: 4.8mm;' +
          '}' +

          '.bullet-list li {' +
            'margin: 0.9mm 0;' +
          '}' +

          '.languages-list {' +
            'display: grid;' +
            'gap: 2mm;' +
          '}' +

          '.language-item {' +
            'display: flex;' +
            'flex-wrap: wrap;' +
            'gap: 1.6mm;' +
            'align-items: baseline;' +
          '}' +

          '.language-name {' +
            'font-weight: 700;' +
          '}' +

          '.language-sep {' +
            'opacity: 0.7;' +
          '}' +

          '.language-level {' +
            'color: #404040;' +
          '}' +

          '.scribble {' +
            'font-family: "Caveat", cursive;' +
            'font-size: 7.5mm;' +
            'color: rgba(0,0,0,0.75);' +
            'position: absolute;' +
            'right: 12mm;' +
            'bottom: 10mm;' +
            'transform: rotate(-5deg);' +
            'pointer-events: none;' +
          '}' +

          '@media print {' +
            '.page {' +
              'width: 210mm;' +
              'min-height: 297mm;' +
            '}' +
          '}' +
        '</style>' +

        '<div class="page">' +
          '<div class="content">' +
            this.renderHeader(d) +
            this.renderProfile(d.summary, t) +
            this.renderSkills(d.skillsRaw, d.toolsRaw, t) +
            this.renderExperience(d.experience, t, lang) +
            this.renderProjects(d.projects, t) +
            this.renderAchievements(d.achievements, t) +
            this.renderEducation(d.education, t, lang) +
            this.renderCertifications(d.certifications, t, lang) +
            this.renderLanguages(d.languages, t) +
          '</div>' +
          '<div class="scribble" aria-hidden="true">notes</div>' +
        '</div>';

      this.shadowRoot.innerHTML = html;
    }
  }

  if (!customElements.get('gqr-resume-river-v1')) {
    customElements.define('gqr-resume-river-v1', GQRResumeRiverV1);
  }
})();