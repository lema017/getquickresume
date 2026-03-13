(function() {
  'use strict';

  class GQRResumeCedarV2 extends HTMLElement {
    static get observedAttributes() {
      return ['language'];
    }

    constructor() {
      super();
      this._data = {};
      this.attachShadow({ mode: 'open' });
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

    get i18n() {
      return {
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
    }

    get levelMap() {
      return {
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

    safeStr(v) {
      return typeof v === 'string' ? v : (v == null ? '' : String(v));
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

    formatDate(value, lang) {
      const raw = this.safeStr(value).trim();
      if (!raw) return '';
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };
      const match = raw.match(/^(\d{4})(?:-(\d{2}))?/);
      if (!match) return this.escapeHtml(raw);
      const year = match[1];
      const monthIndex = match[2] ? parseInt(match[2], 10) - 1 : -1;
      if (monthIndex >= 0 && monthIndex < 12) {
        return this.escapeHtml((months[lang] || months.en)[monthIndex] + ' ' + year);
      }
      return this.escapeHtml(year);
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const start = this.formatDate(startDate, lang);
      const end = isCurrentLike ? this.escapeHtml(t.present) : this.formatDate(endDate, lang);
      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderContactSection(lang, t) {
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

      const items = [];
      if (email) {
        items.push(
          '<div class="contact-item"><span class="contact-label">Email</span><span class="contact-value">' +
          this.escapeHtml(email) +
          '</span></div>'
        );
      }
      if (phone) {
        items.push(
          '<div class="contact-item"><span class="contact-label">Phone</span><span class="contact-value">' +
          this.escapeHtml(phone) +
          '</span></div>'
        );
      }
      if (country) {
        items.push(
          '<div class="contact-item"><span class="contact-label">' + (lang === 'es' ? 'Ubicación' : 'Location') + '</span><span class="contact-value">' +
          this.escapeHtml(country) +
          '</span></div>'
        );
      }
      if (linkedin) {
        items.push(
          '<div class="contact-item"><span class="contact-label">LinkedIn</span><span class="contact-value break-link">' +
          this.escapeHtml(linkedin) +
          '</span></div>'
        );
      }

      if (!items.length) return '';
      return (
        '<section class="section section-sidebar" data-section="contact">' +
          '<h3 class="section-title sidebar-title">' + this.escapeHtml(t.contact) + '</h3>' +
          '<div class="contact-list">' + items.join('') + '</div>' +
        '</section>'
      );
    }

    renderLanguagesSection(lang, t) {
      const items = this.safeArr(this.data?.languages);
      if (!items.length) return '';
      const map = this.levelMap[lang] || this.levelMap.en;

      return (
        '<section class="section section-sidebar" data-section="languages">' +
          '<h3 class="section-title sidebar-title">' + this.escapeHtml(t.languages) + '</h3>' +
          '<div class="language-list">' +
            items.map((item, index) => {
              const id = this.safeStr(item?.id).trim() || ('language-' + index);
              const name = this.safeStr(item?.name).trim();
              const rawLevel = this.safeStr(item?.level).trim().toLowerCase();
              const level = map[rawLevel] || this.safeStr(item?.level).trim();
              return (
                '<div class="language-item" data-entry-id="' + this.escapeHtml(id) + '">' +
                  '<span class="language-name">' + this.escapeHtml(name) + '</span>' +
                  (level ? '<span class="language-level">' + this.escapeHtml(level) + '</span>' : '') +
                '</div>'
              );
            }).join('') +
          '</div>' +
        '</section>'
      );
    }

    renderSkillsSection(lang, t) {
      const merged = [...this.safeArr(this.data?.skillsRaw), ...this.safeArr(this.data?.toolsRaw)]
        .map((s) => this.safeStr(s).trim())
        .filter(Boolean);

      const unique = [];
      const seen = new Set();
      merged.forEach((item) => {
        const key = item.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(item);
        }
      });

      if (!unique.length) return '';

      return (
        '<section class="section section-sidebar" data-section="skills">' +
          '<h3 class="section-title sidebar-title">' + this.escapeHtml(t.skills) + '</h3>' +
          '<div class="skills-wrap">' +
            unique.map((skill, index) => (
              '<span class="skill-badge" data-entry-id="skill-' + index + '">' + this.escapeHtml(skill) + '</span>'
            )).join('') +
          '</div>' +
        '</section>'
      );
    }

    renderHeaderSection() {
      const firstName = this.safeStr(this.data?.firstName).trim();
      const lastName = this.safeStr(this.data?.lastName).trim();
      const profession = this.safeStr(this.data?.profession).trim();
      const fullName = (firstName + ' ' + lastName).trim();
      if (!fullName && !profession) return '';

      return (
        '<section class="section header-section" data-section="header">' +
          (fullName ? '<h1 class="name">' + this.escapeHtml(fullName) + '</h1>' : '') +
          (profession ? '<div class="profession">' + this.escapeHtml(profession) + '</div>' : '') +
        '</section>'
      );
    }

    renderProfileSection(t) {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';
      return (
        '<section class="section" data-section="profile">' +
          '<h3 class="section-title main-title">' + this.escapeHtml(t.profile) + '</h3>' +
          '<div class="profile-text">' + this.escapeHtml(summary) + '</div>' +
        '</section>'
      );
    }

    renderExperienceSection(lang, t) {
      const items = this.safeArr(this.data?.experience);
      if (!items.length) return '';

      return (
        '<section class="section" data-section="experience">' +
          '<h3 class="section-title main-title">' + this.escapeHtml(t.experience) + '</h3>' +
          items.map((item, index) => {
            const id = this.safeStr(item?.id).trim() || ('experience-' + index);
            const title = this.safeStr(item?.title).trim();
            const company = this.safeStr(item?.company).trim();
            const location = this.safeStr(item?.location).trim();
            const range = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isCurrent);
            const bullets = [...this.safeArr(item?.achievements), ...this.safeArr(item?.responsibilities)]
              .map((b) => this.safeStr(b).trim())
              .filter(Boolean);

            return (
              '<article class="entry" data-entry-id="' + this.escapeHtml(id) + '">' +
                '<div class="entry-head">' +
                  '<div class="entry-head-left">' +
                    (title ? '<div class="entry-title">' + this.escapeHtml(title) + '</div>' : '') +
                    ((company || location) ? '<div class="entry-subtitle">' +
                      this.escapeHtml(company) +
                      (company && location ? ' · ' : '') +
                      this.escapeHtml(location) +
                    '</div>' : '') +
                  '</div>' +
                  (range ? '<div class="entry-date">' + range + '</div>' : '') +
                '</div>' +
                (bullets.length ? '<ul class="bullet-list">' + bullets.map((b) => '<li>' + this.escapeHtml(b) + '</li>').join('') + '</ul>' : '') +
              '</article>'
            );
          }).join('') +
        '</section>'
      );
    }

    renderProjectsSection(lang, t) {
      const items = this.safeArr(this.data?.projects);
      if (!items.length) return '';

      return (
        '<section class="section" data-section="projects">' +
          '<h3 class="section-title main-title">' + this.escapeHtml(t.projects) + '</h3>' +
          items.map((item, index) => {
            const id = this.safeStr(item?.id).trim() || ('project-' + index);
            const name = this.safeStr(item?.name).trim();
            const description = this.safeStr(item?.description).trim();
            const url = this.safeStr(item?.url).trim();
            const technologies = this.safeArr(item?.technologies).map((x) => this.safeStr(x).trim()).filter(Boolean);
            const range = this.formatDateRange(item?.startDate, item?.endDate, !!item?.isOngoing);

            return (
              '<article class="entry" data-entry-id="' + this.escapeHtml(id) + '">' +
                '<div class="entry-head">' +
                  '<div class="entry-head-left">' +
                    (name ? '<div class="entry-title">' + this.escapeHtml(name) + '</div>' : '') +
                    (url ? '<div class="entry-subtitle break-link">' + this.escapeHtml(url) + '</div>' : '') +
                  '</div>' +
                  (range ? '<div class="entry-date">' + range + '</div>' : '') +
                '</div>' +
                (description ? '<div class="entry-text">' + this.escapeHtml(description) + '</div>' : '') +
                (technologies.length ? '<div class="tag-row">' + technologies.map((tech) => '<span class="tag">' + this.escapeHtml(tech) + '</span>').join('') + '</div>' : '') +
              '</article>'
            );
          }).join('') +
        '</section>'
      );
    }

    renderAchievementsSection(t) {
      const items = this.safeArr(this.data?.achievements);
      if (!items.length) return '';

      return (
        '<section class="section" data-section="achievements">' +
          '<h3 class="section-title main-title">' + this.escapeHtml(t.achievements) + '</h3>' +
          items.map((item, index) => {
            const id = this.safeStr(item?.id).trim() || ('achievement-' + index);
            const title = this.safeStr(item?.title).trim();
            const description = this.safeStr(item?.description).trim();
            const year = this.safeStr(item?.year).trim();

            return (
              '<article class="entry compact-entry" data-entry-id="' + this.escapeHtml(id) + '">' +
                '<div class="entry-head">' +
                  '<div class="entry-head-left">' +
                    (title ? '<div class="entry-title">' + this.escapeHtml(title) + '</div>' : '') +
                  '</div>' +
                  (year ? '<div class="entry-date">' + this.escapeHtml(year) + '</div>' : '') +
                '</div>' +
                (description ? '<div class="entry-text">' + this.escapeHtml(description) + '</div>' : '') +
              '</article>'
            );
          }).join('') +
        '</section>'
      );
    }

    renderEducationSection(lang, t) {
      const items = this.safeArr(this.data?.education);
      if (!items.length) return '';

      return (
        '<section class="section" data-section="education">' +
          '<h3 class="section-title main-title">' + this.escapeHtml(t.education) + '</h3>' +
          items.map((item, index) => {
            const id = this.safeStr(item?.id).trim() || ('education-' + index);
            const institution = this.safeStr(item?.institution).trim();
            const degree = this.safeStr(item?.degree).trim();
            const field = this.safeStr(item?.field).trim();
            const gpa = this.safeStr(item?.gpa).trim();
            const range = this.formatDateRange(item?.startDate, item?.endDate, item?.isCompleted === false);

            return (
              '<article class="entry compact-entry" data-entry-id="' + this.escapeHtml(id) + '">' +
                '<div class="entry-head">' +
                  '<div class="entry-head-left">' +
                    ((degree || field) ? '<div class="entry-title">' +
                      this.escapeHtml(degree) +
                      (degree && field ? ', ' : '') +
                      this.escapeHtml(field) +
                    '</div>' : '') +
                    (institution ? '<div class="entry-subtitle">' + this.escapeHtml(institution) + '</div>' : '') +
                  '</div>' +
                  (range ? '<div class="entry-date">' + range + '</div>' : '') +
                '</div>' +
                (gpa ? '<div class="entry-text">GPA: ' + this.escapeHtml(gpa) + '</div>' : '') +
              '</article>'
            );
          }).join('') +
        '</section>'
      );
    }

    renderCertificationsSection(t) {
      const items = this.safeArr(this.data?.certifications);
      if (!items.length) return '';

      return (
        '<section class="section" data-section="certifications">' +
          '<h3 class="section-title main-title">' + this.escapeHtml(t.certifications) + '</h3>' +
          items.map((item, index) => {
            const id = this.safeStr(item?.id).trim() || ('certification-' + index);
            const name = this.safeStr(item?.name).trim();
            const issuer = this.safeStr(item?.issuer).trim();
            const date = this.safeStr(item?.date).trim();

            return (
              '<article class="entry compact-entry" data-entry-id="' + this.escapeHtml(id) + '">' +
                '<div class="entry-head">' +
                  '<div class="entry-head-left">' +
                    (name ? '<div class="entry-title">' + this.escapeHtml(name) + '</div>' : '') +
                    (issuer ? '<div class="entry-subtitle">' + this.escapeHtml(issuer) + '</div>' : '') +
                  '</div>' +
                  (date ? '<div class="entry-date">' + this.escapeHtml(date) + '</div>' : '') +
                '</div>' +
              '</article>'
            );
          }).join('') +
        '</section>'
      );
    }

    render() {
      if (!this.shadowRoot) return;

      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];

      const sidebarContact = this.renderContactSection(lang, t);
      const sidebarLanguages = this.renderLanguagesSection(lang, t);
      const sidebarSkills = this.renderSkillsSection(lang, t);

      const mainHeader = this.renderHeaderSection();
      const mainProfile = this.renderProfileSection(t);
      const mainExperience = this.renderExperienceSection(lang, t);
      const mainProjects = this.renderProjectsSection(lang, t);
      const mainAchievements = this.renderAchievementsSection(t);
      const mainEducation = this.renderEducationSection(lang, t);
      const mainCerts = this.renderCertificationsSection(t);

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2f2a27;
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
            background: #ffffff;
            display: grid;
            grid-template-columns: 34% 66%;
            font-family: Georgia, "Times New Roman", serif;
            color: #2f2a27;
          }

          .sidebar {
            background: #d9d1cc;
            padding: 30mm 9mm 18mm 12mm;
            min-width: 0;
          }

          .main {
            background: #ffffff;
            padding: 20mm 14mm 18mm 14mm;
            min-width: 0;
          }

          .section {
            margin: 0 0 7mm 0;
          }

          .header-section {
            margin-bottom: 10mm;
            padding-bottom: 6mm;
            border-bottom: 1px solid #cfc4bc;
          }

          .name {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12.5mm;
            line-height: 1;
            letter-spacing: 1.1px;
            font-weight: 700;
            text-transform: uppercase;
            color: #2e2926;
          }

          .profession {
            margin-top: 3mm;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 3.4mm;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            color: #7a6e67;
          }

          .section-title {
            margin: 0 0 3mm 0;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 4.1mm;
            line-height: 1.2;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            font-weight: 700;
          }

          .sidebar-title {
            color: #2e2926;
            padding-bottom: 2mm;
            border-bottom: 1px solid rgba(46, 41, 38, 0.28);
          }

          .main-title {
            color: #2e2926;
            padding-bottom: 2mm;
            border-bottom: 1px solid #d7cdc7;
          }

          .profile-text,
          .entry-text,
          .contact-value,
          .entry-subtitle,
          .language-level {
            font-size: 3.15mm;
            line-height: 1.55;
            color: #544c47;
          }

          .contact-list {
            display: grid;
            gap: 3mm;
          }

          .contact-item {
            display: grid;
            gap: 0.6mm;
          }

          .contact-label {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.55mm;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            font-weight: 700;
            color: #463f3b;
          }

          .language-list {
            display: grid;
            gap: 2.5mm;
          }

          .language-item {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 2mm;
            padding-bottom: 1.5mm;
            border-bottom: 1px dotted rgba(46, 41, 38, 0.2);
          }

          .language-name {
            font-size: 3.2mm;
            font-weight: 700;
            color: #2f2a27;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            padding: 1.6mm 2.4mm;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.58);
            border: 1px solid rgba(70, 63, 59, 0.18);
            color: #3c3531;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.75mm;
            line-height: 1.2;
          }

          .entry {
            margin-bottom: 5mm;
            break-inside: avoid;
          }

          .compact-entry {
            margin-bottom: 4mm;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4mm;
            margin-bottom: 1.3mm;
          }

          .entry-head-left {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            font-size: 3.55mm;
            line-height: 1.35;
            font-weight: 700;
            color: #2f2a27;
          }

          .entry-subtitle {
            margin-top: 0.4mm;
          }

          .entry-date {
            flex: 0 0 auto;
            min-width: 24mm;
            text-align: right;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.75mm;
            line-height: 1.3;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            color: #7a6e67;
          }

          .bullet-list {
            margin: 1.5mm 0 0 0;
            padding-left: 4.6mm;
            color: #4e4743;
          }

          .bullet-list li {
            margin: 0 0 1.2mm 0;
            font-size: 3.05mm;
            line-height: 1.5;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2mm;
          }

          .tag {
            display: inline-block;
            padding: 1.2mm 2mm;
            border: 1px solid #d8ccc4;
            background: #f7f3f0;
            border-radius: 999px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.5mm;
            color: #665c56;
            white-space: nowrap;
          }

          .break-link {
            overflow-wrap: anywhere;
            word-break: break-word;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          <div class="sidebar">
            ${sidebarContact}
            ${sidebarLanguages}
            ${sidebarSkills}
          </div>
          <div class="main">
            ${mainHeader}
            ${mainProfile}
            ${mainExperience}
            ${mainProjects}
            ${mainAchievements}
            ${mainEducation}
            ${mainCerts}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-cedar-v2')) {
    customElements.define('gqr-resume-cedar-v2', GQRResumeCedarV2);
  }
})();