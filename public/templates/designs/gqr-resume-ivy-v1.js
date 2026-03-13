(function() {
  'use strict';

  class GQRResumeIvyV1 extends HTMLElement {
    static get observedAttributes() {
      return ['language'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._data = {};
      this.i18n = {
        en: {
          profile: 'Profile',
          experience: 'Experience',
          education: 'Education',
          projects: 'Projects',
          certifications: 'Certifications',
          languages: 'Languages',
          achievements: 'Achievements',
          skills: 'Skills',
          contact: 'Contact',
          present: 'Present'
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
          contact: 'Contacto',
          present: 'Presente'
        }
      };
      this.levelMap = {
        en: {
          basic: 'Basic',
          intermediate: 'Intermediate',
          advanced: 'Advanced',
          native: 'Native'
        },
        es: {
          basic: 'Básico',
          intermediate: 'Intermedio',
          advanced: 'Avanzado',
          native: 'Nativo'
        }
      };
    }

    get data() {
      return this._data;
    }

    set data(value) {
      this._data = value && typeof value === 'object' ? value : {};
      this.render();
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      this.render();
    }

    getLanguage() {
      return this.getAttribute('language') || this.data?.language || 'en';
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

    formatShortDate(value, lang) {
      const raw = this.safeStr(value).trim();
      if (!raw) return '';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const ymMatch = raw.match(/^(\d{4})-(\d{2})$/);
      if (ymMatch) {
        const year = ymMatch[1];
        const monthIndex = parseInt(ymMatch[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return months[monthIndex] + ' ' + year;
        }
      }

      const ymdMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (ymdMatch) {
        const year = ymdMatch[1];
        const monthIndex = parseInt(ymdMatch[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return months[monthIndex] + ' ' + year;
        }
      }

      return raw;
    }

    formatDateRange(startDate, endDate, currentFlag, lang) {
      const dict = this.i18n[lang] || this.i18n.en;
      const start = this.formatShortDate(startDate, lang);
      const end = currentFlag ? dict.present : this.formatShortDate(endDate, lang);
      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    mergeSkills() {
      const seen = new Set();
      const merged = [];
      const source = this.safeArr(this.data?.skillsRaw).concat(this.safeArr(this.data?.toolsRaw));
      for (let i = 0; i < source.length; i++) {
        const item = this.safeStr(source[i]).trim();
        if (!item) continue;
        const key = item.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          merged.push(item);
        }
      }
      return merged;
    }

    renderContactSection(dict) {
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

      const items = [];
      if (email) {
        items.push('<li class="contact-item"><span class="contact-label">Email</span><span class="contact-value">' + this.escapeHtml(email) + '</span></li>');
      }
      if (phone) {
        items.push('<li class="contact-item"><span class="contact-label">Phone</span><span class="contact-value">' + this.escapeHtml(phone) + '</span></li>');
      }
      if (country) {
        items.push('<li class="contact-item"><span class="contact-label">Location</span><span class="contact-value">' + this.escapeHtml(country) + '</span></li>');
      }
      if (linkedin) {
        items.push('<li class="contact-item"><span class="contact-label">LinkedIn</span><span class="contact-value">' + this.escapeHtml(linkedin) + '</span></li>');
      }

      if (!items.length) return '';
      return '' +
        '<section class="section sidebar-section" data-section="contact">' +
          '<h2 class="section-title">' + this.escapeHtml(dict.contact) + '</h2>' +
          '<ul class="contact-list">' + items.join('') + '</ul>' +
        '</section>';
    }

    renderLanguagesSection(dict, lang) {
      const languages = this.safeArr(this.data?.languages).filter(Boolean).filter((item) => {
        return this.safeStr(item?.name).trim();
      });
      if (!languages.length) return '';

      const levelDict = this.levelMap[lang] || this.levelMap.en;

      const items = languages.map((item) => {
        const id = this.escapeHtml(this.safeStr(item?.id));
        const name = this.escapeHtml(this.safeStr(item?.name));
        const levelKey = this.safeStr(item?.level).toLowerCase();
        const level = this.escapeHtml(levelDict[levelKey] || this.safeStr(item?.level));
        return '' +
          '<div class="lang-item" data-entry-id="' + id + '">' +
            '<div class="lang-name">' + name + '</div>' +
            '<div class="lang-level">' + level + '</div>' +
          '</div>';
      }).join('');

      return '' +
        '<section class="section sidebar-section" data-section="languages">' +
          '<h2 class="section-title">' + this.escapeHtml(dict.languages) + '</h2>' +
          '<div class="languages-list">' + items + '</div>' +
        '</section>';
    }

    renderSkillsSection(dict) {
      const skills = this.mergeSkills();
      if (!skills.length) return '';

      const items = skills.map((skill, index) => {
        return '<span class="skill-badge" data-entry-id="skill-' + index + '">' + this.escapeHtml(skill) + '</span>';
      }).join('');

      return '' +
        '<section class="section sidebar-section" data-section="skills">' +
          '<h2 class="section-title">' + this.escapeHtml(dict.skills) + '</h2>' +
          '<div class="skills-wrap">' + items + '</div>' +
        '</section>';
    }

    renderHeaderSection() {
      const firstName = this.safeStr(this.data?.firstName).trim();
      const lastName = this.safeStr(this.data?.lastName).trim();
      const fullName = (firstName + ' ' + lastName).trim();
      const profession = this.safeStr(this.data?.profession).trim();

      if (!fullName && !profession) return '';

      return '' +
        '<section class="hero" data-section="header">' +
          '<div class="hero-inner">' +
            (fullName ? '<h1 class="name">' + this.escapeHtml(fullName) + '</h1>' : '') +
            (profession ? '<div class="profession">' + this.escapeHtml(profession) + '</div>' : '') +
          '</div>' +
        '</section>';
    }

    renderProfileSection(dict) {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';

      return '' +
        '<section class="section main-section" data-section="profile">' +
          '<h2 class="section-title main-title">' + this.escapeHtml(dict.profile) + '</h2>' +
          '<div class="profile-text">' + this.escapeHtml(summary) + '</div>' +
        '</section>';
    }

    renderExperienceSection(dict, lang) {
      const items = this.safeArr(this.data?.experience).filter(Boolean).filter((item) => {
        return this.safeStr(item?.title).trim() || this.safeStr(item?.company).trim();
      });
      if (!items.length) return '';

      const html = items.map((item) => {
        const id = this.escapeHtml(this.safeStr(item?.id));
        const title = this.escapeHtml(this.safeStr(item?.title));
        const company = this.escapeHtml(this.safeStr(item?.company));
        const location = this.escapeHtml(this.safeStr(item?.location));
        const dateRange = this.escapeHtml(this.formatDateRange(
          this.safeStr(item?.startDate),
          this.safeStr(item?.endDate),
          !!item?.isCurrent,
          lang
        ));

        const bullets = this.safeArr(item?.achievements).concat(this.safeArr(item?.responsibilities))
          .map((b) => this.safeStr(b).trim())
          .filter(Boolean);

        return '' +
          '<article class="entry timeline-entry" data-entry-id="' + id + '">' +
            '<div class="entry-head">' +
              '<div class="entry-head-main">' +
                (title ? '<h3 class="entry-title">' + title + '</h3>' : '') +
                ((company || location) ? '<div class="entry-subtitle">' + company + (company && location ? ' · ' : '') + location + '</div>' : '') +
              '</div>' +
              (dateRange ? '<div class="entry-date">' + dateRange + '</div>' : '') +
            '</div>' +
            (bullets.length ? '<ul class="bullet-list">' + bullets.map((b) => '<li>' + this.escapeHtml(b) + '</li>').join('') + '</ul>' : '') +
          '</article>';
      }).join('');

      return '' +
        '<section class="section main-section" data-section="experience">' +
          '<h2 class="section-title main-title">' + this.escapeHtml(dict.experience) + '</h2>' +
          '<div class="timeline">' + html + '</div>' +
        '</section>';
    }

    renderProjectsSection(dict, lang) {
      const items = this.safeArr(this.data?.projects).filter(Boolean).filter((item) => {
        return this.safeStr(item?.name).trim() || this.safeStr(item?.description).trim();
      });
      if (!items.length) return '';

      const html = items.map((item) => {
        const id = this.escapeHtml(this.safeStr(item?.id));
        const name = this.escapeHtml(this.safeStr(item?.name));
        const description = this.escapeHtml(this.safeStr(item?.description));
        const url = this.escapeHtml(this.safeStr(item?.url));
        const technologies = this.safeArr(item?.technologies).map((t) => this.safeStr(t).trim()).filter(Boolean);
        const dateRange = this.escapeHtml(this.formatDateRange(
          this.safeStr(item?.startDate),
          this.safeStr(item?.endDate),
          !!item?.isOngoing,
          lang
        ));

        return '' +
          '<article class="entry card-entry" data-entry-id="' + id + '">' +
            '<div class="entry-head">' +
              '<div class="entry-head-main">' +
                (name ? '<h3 class="entry-title">' + name + '</h3>' : '') +
              '</div>' +
              (dateRange ? '<div class="entry-date">' + dateRange + '</div>' : '') +
            '</div>' +
            (description ? '<div class="entry-text">' + description + '</div>' : '') +
            (technologies.length ? '<div class="tag-row">' + technologies.map((t) => '<span class="tag">' + this.escapeHtml(t) + '</span>').join('') + '</div>' : '') +
            (url ? '<div class="entry-link">' + url + '</div>' : '') +
          '</article>';
      }).join('');

      return '' +
        '<section class="section main-section" data-section="projects">' +
          '<h2 class="section-title main-title">' + this.escapeHtml(dict.projects) + '</h2>' +
          '<div class="stack-list">' + html + '</div>' +
        '</section>';
    }

    renderAchievementsSection(dict) {
      const items = this.safeArr(this.data?.achievements).filter(Boolean).filter((item) => {
        return this.safeStr(item?.title).trim() || this.safeStr(item?.description).trim();
      });
      if (!items.length) return '';

      const html = items.map((item) => {
        const id = this.escapeHtml(this.safeStr(item?.id));
        const title = this.escapeHtml(this.safeStr(item?.title));
        const description = this.escapeHtml(this.safeStr(item?.description));
        const year = this.escapeHtml(this.safeStr(item?.year));

        return '' +
          '<article class="entry compact-entry" data-entry-id="' + id + '">' +
            '<div class="entry-head">' +
              '<div class="entry-head-main">' +
                (title ? '<h3 class="entry-title">' + title + '</h3>' : '') +
              '</div>' +
              (year ? '<div class="entry-date">' + year + '</div>' : '') +
            '</div>' +
            (description ? '<div class="entry-text">' + description + '</div>' : '') +
          '</article>';
      }).join('');

      return '' +
        '<section class="section main-section" data-section="achievements">' +
          '<h2 class="section-title main-title">' + this.escapeHtml(dict.achievements) + '</h2>' +
          '<div class="stack-list">' + html + '</div>' +
        '</section>';
    }

    renderEducationSection(dict, lang) {
      const items = this.safeArr(this.data?.education).filter(Boolean).filter((item) => {
        return this.safeStr(item?.institution).trim() || this.safeStr(item?.degree).trim() || this.safeStr(item?.field).trim();
      });
      if (!items.length) return '';

      const html = items.map((item) => {
        const id = this.escapeHtml(this.safeStr(item?.id));
        const institution = this.escapeHtml(this.safeStr(item?.institution));
        const degree = this.escapeHtml(this.safeStr(item?.degree));
        const field = this.escapeHtml(this.safeStr(item?.field));
        const gpa = this.escapeHtml(this.safeStr(item?.gpa));
        const dateRange = this.escapeHtml(this.formatDateRange(
          this.safeStr(item?.startDate),
          this.safeStr(item?.endDate),
          item?.isCompleted === false,
          lang
        ));

        const degreeLine = [degree, field].filter(Boolean).join(field && degree ? ' — ' : '');

        return '' +
          '<article class="entry timeline-entry" data-entry-id="' + id + '">' +
            '<div class="entry-head">' +
              '<div class="entry-head-main">' +
                (institution ? '<h3 class="entry-title">' + institution + '</h3>' : '') +
                (degreeLine ? '<div class="entry-subtitle">' + degreeLine + '</div>' : '') +
              '</div>' +
              (dateRange ? '<div class="entry-date">' + dateRange + '</div>' : '') +
            '</div>' +
            (gpa ? '<div class="entry-text">GPA: ' + gpa + '</div>' : '') +
          '</article>';
      }).join('');

      return '' +
        '<section class="section main-section" data-section="education">' +
          '<h2 class="section-title main-title">' + this.escapeHtml(dict.education) + '</h2>' +
          '<div class="timeline">' + html + '</div>' +
        '</section>';
    }

    renderCertificationsSection(dict) {
      const items = this.safeArr(this.data?.certifications).filter(Boolean).filter((item) => {
        return this.safeStr(item?.name).trim() || this.safeStr(item?.issuer).trim();
      });
      if (!items.length) return '';

      const html = items.map((item) => {
        const id = this.escapeHtml(this.safeStr(item?.id));
        const name = this.escapeHtml(this.safeStr(item?.name));
        const issuer = this.escapeHtml(this.safeStr(item?.issuer));
        const date = this.escapeHtml(this.safeStr(item?.date));

        return '' +
          '<article class="entry compact-entry" data-entry-id="' + id + '">' +
            '<div class="entry-head">' +
              '<div class="entry-head-main">' +
                (name ? '<h3 class="entry-title">' + name + '</h3>' : '') +
                (issuer ? '<div class="entry-subtitle">' + issuer + '</div>' : '') +
              '</div>' +
              (date ? '<div class="entry-date">' + date + '</div>' : '') +
            '</div>' +
          '</article>';
      }).join('');

      return '' +
        '<section class="section main-section" data-section="certifications">' +
          '<h2 class="section-title main-title">' + this.escapeHtml(dict.certifications) + '</h2>' +
          '<div class="stack-list">' + html + '</div>' +
        '</section>';
    }

    render() {
      if (!this.shadowRoot) return;

      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const dict = this.i18n[lang] || this.i18n.en;

      const headerSection = this.renderHeaderSection();
      const contactSection = this.renderContactSection(dict);
      const languagesSection = this.renderLanguagesSection(dict, lang);
      const skillsSection = this.renderSkillsSection(dict);

      const profileSection = this.renderProfileSection(dict);
      const experienceSection = this.renderExperienceSection(dict, lang);
      const projectsSection = this.renderProjectsSection(dict, lang);
      const achievementsSection = this.renderAchievementsSection(dict);
      const educationSection = this.renderEducationSection(dict, lang);
      const certificationsSection = this.renderCertificationsSection(dict);

      this.shadowRoot.innerHTML = '' +
        '<style>' +
          ':host {' +
            'display: block;' +
            'color: #25262b;' +
            'font-family: Arial, Helvetica, sans-serif;' +
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
            'display: grid;' +
            'grid-template-columns: 34% 66%;' +
            'grid-template-areas:' +
              '"sidebar hero"' +
              '"sidebar main";' +
            'box-shadow: 0 0 0 1px rgba(0,0,0,0.04);' +
          '}' +
          '.hero {' +
            'grid-area: hero;' +
            'background: #232430;' +
            'color: #f7f7f9;' +
            'padding: 24px 28px 18px;' +
            'display: flex;' +
            'align-items: center;' +
            'min-height: 92px;' +
          '}' +
          '.hero-inner {' +
            'width: 100%;' +
            'border-left: 4px solid #b9a47a;' +
            'padding-left: 16px;' +
          '}' +
          '.name {' +
            'margin: 0;' +
            'font-size: 20pt;' +
            'line-height: 1.05;' +
            'font-weight: 800;' +
            'letter-spacing: 2px;' +
            'text-transform: uppercase;' +
          '}' +
          '.profession {' +
            'margin-top: 6px;' +
            'font-size: 10.5pt;' +
            'letter-spacing: 2.2px;' +
            'text-transform: uppercase;' +
            'color: #d8d9de;' +
          '}' +
          '.sidebar {' +
            'grid-area: sidebar;' +
            'background: #d9d9d6;' +
            'padding: 28px 18px 26px 20px;' +
          '}' +
          '.main {' +
            'grid-area: main;' +
            'background: #ffffff;' +
            'padding: 18px 28px 26px;' +
          '}' +
          '.section {' +
            'margin: 0 0 18px 0;' +
          '}' +
          '.sidebar-section {' +
            'margin-bottom: 22px;' +
          '}' +
          '.main-section {' +
            'margin-bottom: 18px;' +
          '}' +
          '.section-title {' +
            'margin: 0 0 10px 0;' +
            'font-size: 9pt;' +
            'font-weight: 800;' +
            'letter-spacing: 2.5px;' +
            'text-transform: uppercase;' +
            'display: flex;' +
            'align-items: center;' +
            'gap: 10px;' +
          '}' +
          '.sidebar .section-title {' +
            'color: #262730;' +
          '}' +
          '.main-title {' +
            'color: #2a2b33;' +
          '}' +
          '.section-title::after {' +
            'content: "";' +
            'height: 1px;' +
            'background: rgba(42,43,51,0.28);' +
            'flex: 1;' +
            'min-width: 28px;' +
          '}' +
          '.contact-list {' +
            'list-style: none;' +
            'padding: 0;' +
            'margin: 0;' +
          '}' +
          '.contact-item {' +
            'margin: 0 0 10px 0;' +
          '}' +
          '.contact-label {' +
            'display: block;' +
            'font-size: 7pt;' +
            'font-weight: 700;' +
            'letter-spacing: 1px;' +
            'text-transform: uppercase;' +
            'color: #585a63;' +
            'margin-bottom: 2px;' +
          '}' +
          '.contact-value {' +
            'display: block;' +
            'font-size: 9pt;' +
            'line-height: 1.35;' +
            'color: #23242a;' +
            'word-break: break-word;' +
          '}' +
          '.languages-list {' +
            'display: flex;' +
            'flex-direction: column;' +
            'gap: 10px;' +
          '}' +
          '.lang-item {' +
            'padding-left: 10px;' +
            'border-left: 2px solid #a59677;' +
          '}' +
          '.lang-name {' +
            'font-size: 9pt;' +
            'font-weight: 700;' +
            'color: #202127;' +
          '}' +
          '.lang-level {' +
            'font-size: 8pt;' +
            'color: #5e6069;' +
            'margin-top: 2px;' +
          '}' +
          '.skills-wrap {' +
            'display: flex;' +
            'flex-wrap: wrap;' +
            'gap: 6px;' +
          '}' +
          '.skill-badge {' +
            'display: inline-block;' +
            'white-space: nowrap;' +
            'font-size: 8pt;' +
            'line-height: 1.2;' +
            'padding: 5px 8px;' +
            'border: 1px solid #98999e;' +
            'border-radius: 999px;' +
            'background: rgba(255,255,255,0.45);' +
            'color: #23242a;' +
          '}' +
          '.profile-text {' +
            'font-size: 9.2pt;' +
            'line-height: 1.55;' +
            'color: #3a3c45;' +
          '}' +
          '.timeline {' +
            'position: relative;' +
          '}' +
          '.timeline-entry {' +
            'position: relative;' +
            'padding-left: 18px;' +
            'border-left: 1.5px solid #c6c8cf;' +
            'margin-left: 4px;' +
            'padding-bottom: 12px;' +
          '}' +
          '.timeline-entry:last-child {' +
            'padding-bottom: 0;' +
          '}' +
          '.timeline-entry::before {' +
            'content: "";' +
            'position: absolute;' +
            'left: -5px;' +
            'top: 4px;' +
            'width: 8px;' +
            'height: 8px;' +
            'border-radius: 50%;' +
            'background: #232430;' +
          '}' +
          '.stack-list {' +
            'display: flex;' +
            'flex-direction: column;' +
            'gap: 12px;' +
          '}' +
          '.card-entry, .compact-entry {' +
            'padding-left: 2px;' +
          '}' +
          '.entry {' +
            'break-inside: avoid;' +
            'page-break-inside: avoid;' +
          '}' +
          '.entry-head {' +
            'display: flex;' +
            'justify-content: space-between;' +
            'align-items: flex-start;' +
            'gap: 12px;' +
            'margin-bottom: 4px;' +
          '}' +
          '.entry-head-main {' +
            'flex: 1;' +
            'min-width: 0;' +
          '}' +
          '.entry-title {' +
            'margin: 0;' +
            'font-size: 10pt;' +
            'line-height: 1.3;' +
            'font-weight: 800;' +
            'color: #22232a;' +
          '}' +
          '.entry-subtitle {' +
            'margin-top: 2px;' +
            'font-size: 8.6pt;' +
            'line-height: 1.4;' +
            'color: #5d5f69;' +
          '}' +
          '.entry-date {' +
            'flex: 0 0 auto;' +
            'font-size: 8pt;' +
            'font-weight: 700;' +
            'line-height: 1.3;' +
            'color: #6a6c74;' +
            'text-align: right;' +
            'white-space: nowrap;' +
          '}' +
          '.entry-text {' +
            'font-size: 8.8pt;' +
            'line-height: 1.5;' +
            'color: #383a42;' +
          '}' +
          '.bullet-list {' +
            'margin: 6px 0 0 0;' +
            'padding-left: 16px;' +
          '}' +
          '.bullet-list li {' +
            'margin: 0 0 4px 0;' +
            'font-size: 8.8pt;' +
            'line-height: 1.45;' +
            'color: #373942;' +
          '}' +
          '.tag-row {' +
            'display: flex;' +
            'flex-wrap: wrap;' +
            'gap: 6px;' +
            'margin-top: 8px;' +
          '}' +
          '.tag {' +
            'font-size: 7.8pt;' +
            'line-height: 1.2;' +
            'padding: 4px 7px;' +
            'border-radius: 3px;' +
            'background: #eef0f3;' +
            'color: #30323a;' +
            'border: 1px solid #d8dbe1;' +
          '}' +
          '.entry-link {' +
            'margin-top: 7px;' +
            'font-size: 8.3pt;' +
            'color: #60636d;' +
            'word-break: break-word;' +
          '}' +
          '@media print {' +
            '.page {' +
              'width: 210mm;' +
              'min-height: 297mm;' +
              'box-shadow: none;' +
            '}' +
          '}' +
        '</style>' +
        '<div class="page">' +
          headerSection +
          '<div class="sidebar">' +
            contactSection +
            languagesSection +
            skillsSection +
          '</div>' +
          '<div class="main">' +
            profileSection +
            experienceSection +
            projectsSection +
            achievementsSection +
            educationSection +
            certificationsSection +
          '</div>' +
        '</div>';
    }
  }

  if (!customElements.get('gqr-resume-ivy-v1')) {
    customElements.define('gqr-resume-ivy-v1', GQRResumeIvyV1);
  }
})();