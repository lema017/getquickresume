(function() {
    'use strict';
  
    /**
     * name: gqr-resume-beige-column
     * description: "Two-column resume with a soft beige sidebar, clean white main panel, elegant uppercase headings, and modern minimalist typography."
     */
  
    class GQRResumeBeigeColumn extends HTMLElement {
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
            experience: 'Work Experience',
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
            experience: 'Experiencia Laboral',
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
  
      connectedCallback() {
        this.render();
      }
  
      attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'language' && oldValue !== newValue) {
          this.render();
        }
      }
  
      get data() {
        return this._data;
      }
  
      set data(value) {
        this._data = value && typeof value === 'object' ? value : {};
        this.render();
      }
  
      getLanguage() {
        const attrLang = this.getAttribute('language');
        const dataLang = this.safeStr(this.data && this.data.language).toLowerCase();
        const lang = (attrLang || dataLang || 'en').toLowerCase();
        return lang === 'es' ? 'es' : 'en';
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
  
      getMonthShort(monthIndex, lang) {
        const months = {
          en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        };
        return months[lang] && months[lang][monthIndex] ? months[lang][monthIndex] : '';
      }
  
      formatShortDate(dateValue, lang) {
        const raw = this.safeStr(dateValue).trim();
        if (!raw) return '';
        const match = raw.match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/);
        if (!match) return this.escapeHtml(raw);
  
        const year = match[1];
        const month = match[2];
  
        if (month) {
          const monthIndex = parseInt(month, 10) - 1;
          if (monthIndex >= 0 && monthIndex <= 11) {
            return this.escapeHtml(this.getMonthShort(monthIndex, lang) + ' ' + year);
          }
        }
        return this.escapeHtml(year);
      }
  
      formatDateRange(startDate, endDate, isCurrent, lang) {
        const start = this.formatShortDate(startDate, lang);
        const end = isCurrent
          ? this.escapeHtml((this.i18n[lang] || this.i18n.en).present)
          : this.formatShortDate(endDate, lang);
  
        if (start && end) return start + ' - ' + end;
        if (start) return start;
        if (end) return end;
        return '';
      }
  
      mergeSkills() {
        const merged = [];
        const seen = new Set();
        const source = this.safeArr(this.data.skillsRaw).concat(this.safeArr(this.data.toolsRaw));
  
        source.forEach((item) => {
          const value = this.safeStr(item).trim();
          const key = value.toLowerCase();
          if (value && !seen.has(key)) {
            seen.add(key);
            merged.push(value);
          }
        });
  
        return merged;
      }
  
      renderContactSection(t) {
        const email = this.safeStr(this.data.email).trim();
        const phone = this.safeStr(this.data.phone).trim();
        const country = this.safeStr(this.data.country).trim();
        const linkedin = this.safeStr(this.data.linkedin).trim();
  
        if (!email && !phone && !country && !linkedin) return '';
  
        const items = [];
        if (phone) items.push({ icon: '☎', text: phone });
        if (email) items.push({ icon: '✉', text: email });
        if (country) items.push({ icon: '⌂', text: country });
        if (linkedin) items.push({ icon: 'in', text: linkedin.replace(/^https?:\/\//i, '').replace(/^www\./i, '') });
  
        return [
          '<section class="side-section" data-section="contact">',
          '<div class="side-title-row">',
          '<span class="side-icon">●</span>',
          '<h3 class="side-title">' + this.escapeHtml(t.contact) + '</h3>',
          '</div>',
          '<div class="side-content contact-list">',
          items.map((item) => {
            return (
              '<div class="contact-item">' +
                '<span class="contact-label">' + this.escapeHtml(item.icon) + '</span>' +
                '<span class="contact-value">' + this.escapeHtml(item.text) + '</span>' +
              '</div>'
            );
          }).join(''),
          '</div>',
          '</section>'
        ].join('');
      }
  
      renderLanguagesSection(lang, t) {
        const languages = this.safeArr(this.data.languages).filter((item) => {
          return this.safeStr(item && item.name).trim();
        });
  
        if (!languages.length) return '';
  
        const map = this.levelMap[lang] || this.levelMap.en;
  
        return [
          '<section class="side-section" data-section="languages">',
          '<div class="side-title-row">',
          '<span class="side-icon">◐</span>',
          '<h3 class="side-title">' + this.escapeHtml(t.languages) + '</h3>',
          '</div>',
          '<div class="side-content language-list">',
          languages.map((item) => {
            const id = this.escapeHtml(this.safeStr(item.id));
            const name = this.escapeHtml(this.safeStr(item.name));
            const levelKey = this.safeStr(item.level).toLowerCase();
            const level = this.escapeHtml(map[levelKey] || this.safeStr(item.level));
            return [
              '<div class="language-item" data-entry-id="' + id + '">',
              '<div class="language-name">' + name + '</div>',
              level ? '<div class="language-level">' + level + '</div>' : '',
              '</div>'
            ].join('');
          }).join(''),
          '</div>',
          '</section>'
        ].join('');
      }
  
      renderSkillsSection(t) {
        const skills = this.mergeSkills();
        if (!skills.length) return '';
  
        return [
          '<section class="side-section" data-section="skills">',
          '<div class="side-title-row">',
          '<span class="side-icon">◆</span>',
          '<h3 class="side-title">' + this.escapeHtml(t.skills) + '</h3>',
          '</div>',
          '<div class="side-content skills-wrap">',
          skills.map((skill, index) => {
            return '<span class="skill-chip" data-entry-id="skill-' + index + '">' + this.escapeHtml(skill) + '</span>';
          }).join(''),
          '</div>',
          '</section>'
        ].join('');
      }
  
      renderHeaderSection() {
        const firstName = this.safeStr(this.data.firstName).trim();
        const lastName = this.safeStr(this.data.lastName).trim();
        const profession = this.safeStr(this.data.profession).trim();
        const fullName = (firstName + ' ' + lastName).trim();
  
        if (!fullName && !profession) return '';
  
        return [
          '<section class="header-section" data-section="header">',
          fullName ? '<h1 class="name">' + this.escapeHtml(fullName) + '</h1>' : '',
          profession ? '<div class="profession">' + this.escapeHtml(profession) + '</div>' : '',
          '</section>'
        ].join('');
      }
  
      renderProfileSection(t) {
        const summary = this.safeStr(this.data.summary).trim();
        if (!summary) return '';
  
        return [
          '<section class="main-section" data-section="profile">',
          '<h2 class="main-title">' + this.escapeHtml(t.profile) + '</h2>',
          '<div class="main-rule"></div>',
          '<div class="summary-text">' + this.escapeHtml(summary) + '</div>',
          '</section>'
        ].join('');
      }
  
      renderExperienceSection(lang, t) {
        const items = this.safeArr(this.data.experience).filter((item) => {
          return this.safeStr(item && (item.title || item.company)).trim();
        });
  
        if (!items.length) return '';
  
        return [
          '<section class="main-section" data-section="experience">',
          '<h2 class="main-title">' + this.escapeHtml(t.experience) + '</h2>',
          '<div class="main-rule"></div>',
          items.map((item) => {
            const id = this.escapeHtml(this.safeStr(item.id));
            const title = this.escapeHtml(this.safeStr(item.title));
            const company = this.escapeHtml(this.safeStr(item.company));
            const location = this.escapeHtml(this.safeStr(item.location));
            const dateRange = this.formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang);
            const bullets = this.safeArr(item.achievements)
              .concat(this.safeArr(item.responsibilities))
              .map((bullet) => this.safeStr(bullet).trim())
              .filter(Boolean);
  
            return [
              '<article class="entry" data-entry-id="' + id + '">',
              '<div class="entry-title">' + title + '</div>',
              (company || location || dateRange) ? (
                '<div class="entry-meta">' +
                (company ? '<span class="meta-strong">' + company + '</span>' : '') +
                (company && location ? '<span class="meta-sep"> · </span>' : '') +
                (location ? '<span>' + location + '</span>' : '') +
                ((company || location) && dateRange ? '<span class="meta-sep">, </span>' : '') +
                (dateRange ? '<span>' + dateRange + '</span>' : '') +
                '</div>'
              ) : '',
              bullets.length ? (
                '<ul class="bullet-list">' +
                bullets.map((bullet) => '<li>' + this.escapeHtml(bullet) + '</li>').join('') +
                '</ul>'
              ) : '',
              '</article>'
            ].join('');
          }).join(''),
          '</section>'
        ].join('');
      }
  
      renderProjectsSection(lang, t) {
        const items = this.safeArr(this.data.projects).filter((item) => {
          return this.safeStr(item && (item.name || item.description)).trim();
        });
  
        if (!items.length) return '';
  
        return [
          '<section class="main-section" data-section="projects">',
          '<h2 class="main-title">' + this.escapeHtml(t.projects) + '</h2>',
          '<div class="main-rule"></div>',
          items.map((item) => {
            const id = this.escapeHtml(this.safeStr(item.id));
            const name = this.escapeHtml(this.safeStr(item.name));
            const description = this.escapeHtml(this.safeStr(item.description));
            const technologies = this.safeArr(item.technologies).map((tech) => this.safeStr(tech).trim()).filter(Boolean);
            const url = this.escapeHtml(this.safeStr(item.url));
            const dateRange = this.formatDateRange(item.startDate, item.endDate, !!item.isOngoing, lang);
  
            return [
              '<article class="entry" data-entry-id="' + id + '">',
              name ? '<div class="entry-title">' + name + '</div>' : '',
              (dateRange || url) ? (
                '<div class="entry-meta">' +
                (dateRange ? '<span>' + dateRange + '</span>' : '') +
                (dateRange && url ? '<span class="meta-sep"> · </span>' : '') +
                (url ? '<span>' + url + '</span>' : '') +
                '</div>'
              ) : '',
              description ? '<div class="entry-text">' + description + '</div>' : '',
              technologies.length ? (
                '<div class="tag-list">' +
                technologies.map((tech) => '<span class="tag">' + this.escapeHtml(tech) + '</span>').join('') +
                '</div>'
              ) : '',
              '</article>'
            ].join('');
          }).join(''),
          '</section>'
        ].join('');
      }
  
      renderAchievementsSection(t) {
        const items = this.safeArr(this.data.achievements).filter((item) => {
          return this.safeStr(item && (item.title || item.description || item.year)).trim();
        });
  
        if (!items.length) return '';
  
        return [
          '<section class="main-section" data-section="achievements">',
          '<h2 class="main-title">' + this.escapeHtml(t.achievements) + '</h2>',
          '<div class="main-rule"></div>',
          items.map((item) => {
            const id = this.escapeHtml(this.safeStr(item.id));
            const title = this.escapeHtml(this.safeStr(item.title));
            const description = this.escapeHtml(this.safeStr(item.description));
            const year = this.escapeHtml(this.safeStr(item.year));
  
            return [
              '<article class="entry" data-entry-id="' + id + '">',
              '<div class="entry-head-inline">',
              title ? '<div class="entry-title">' + title + '</div>' : '',
              year ? '<div class="entry-year">' + year + '</div>' : '',
              '</div>',
              description ? '<div class="entry-text">' + description + '</div>' : '',
              '</article>'
            ].join('');
          }).join(''),
          '</section>'
        ].join('');
      }
  
      renderEducationSection(lang, t) {
        const items = this.safeArr(this.data.education).filter((item) => {
          return this.safeStr(item && (item.institution || item.degree || item.field)).trim();
        });
  
        if (!items.length) return '';
  
        return [
          '<section class="main-section" data-section="education">',
          '<h2 class="main-title">' + this.escapeHtml(t.education) + '</h2>',
          '<div class="main-rule"></div>',
          items.map((item) => {
            const id = this.escapeHtml(this.safeStr(item.id));
            const institution = this.escapeHtml(this.safeStr(item.institution));
            const degree = this.escapeHtml(this.safeStr(item.degree));
            const field = this.escapeHtml(this.safeStr(item.field));
            const gpa = this.escapeHtml(this.safeStr(item.gpa));
            const dateRange = this.formatDateRange(item.startDate, item.endDate, item.isCompleted === false, lang);
  
            return [
              '<article class="entry" data-entry-id="' + id + '">',
              institution ? '<div class="entry-title">' + institution + '</div>' : '',
              (degree || field || dateRange || gpa) ? (
                '<div class="entry-meta">' +
                (degree ? '<span class="meta-strong">' + degree + '</span>' : '') +
                (degree && field ? '<span class="meta-sep"> · </span>' : '') +
                (field ? '<span>' + field + '</span>' : '') +
                ((degree || field) && dateRange ? '<span class="meta-sep">, </span>' : '') +
                (dateRange ? '<span>' + dateRange + '</span>' : '') +
                (gpa ? '<span class="meta-sep"> · </span><span>GPA: ' + gpa + '</span>' : '') +
                '</div>'
              ) : '',
              '</article>'
            ].join('');
          }).join(''),
          '</section>'
        ].join('');
      }
  
      renderCertificationsSection(t) {
        const items = this.safeArr(this.data.certifications).filter((item) => {
          return this.safeStr(item && (item.name || item.issuer || item.date)).trim();
        });
  
        if (!items.length) return '';
  
        return [
          '<section class="main-section" data-section="certifications">',
          '<h2 class="main-title">' + this.escapeHtml(t.certifications) + '</h2>',
          '<div class="main-rule"></div>',
          items.map((item) => {
            const id = this.escapeHtml(this.safeStr(item.id));
            const name = this.escapeHtml(this.safeStr(item.name));
            const issuer = this.escapeHtml(this.safeStr(item.issuer));
            const date = this.escapeHtml(this.safeStr(item.date));
  
            return [
              '<article class="entry" data-entry-id="' + id + '">',
              name ? '<div class="entry-title">' + name + '</div>' : '',
              (issuer || date) ? (
                '<div class="entry-meta">' +
                (issuer ? '<span class="meta-strong">' + issuer + '</span>' : '') +
                (issuer && date ? '<span class="meta-sep"> · </span>' : '') +
                (date ? '<span>' + date + '</span>' : '') +
                '</div>'
              ) : '',
              '</article>'
            ].join('');
          }).join(''),
          '</section>'
        ].join('');
      }
  
      render() {
        if (!this.shadowRoot) return;
  
        const lang = this.getLanguage();
        const t = this.i18n[lang] || this.i18n.en;
  
        const contactHtml = this.renderContactSection(t);
        const languagesHtml = this.renderLanguagesSection(lang, t);
        const skillsHtml = this.renderSkillsSection(t);
  
        const headerHtml = this.renderHeaderSection();
        const profileHtml = this.renderProfileSection(t);
        const experienceHtml = this.renderExperienceSection(lang, t);
        const projectsHtml = this.renderProjectsSection(lang, t);
        const achievementsHtml = this.renderAchievementsSection(t);
        const educationHtml = this.renderEducationSection(lang, t);
        const certificationsHtml = this.renderCertificationsSection(t);
  
        this.shadowRoot.innerHTML = [
          '<style>',
          ':host {',
          '  display: block;',
          '  color: #2f2b28;',
          '  -webkit-print-color-adjust: exact;',
          '  print-color-adjust: exact;',
          '}',
          '* {',
          '  box-sizing: border-box;',
          '}',
          '.page {',
          '  width: 210mm;',
          '  min-height: 297mm;',
          '  height: auto;',
          '  overflow: visible;',
          '  display: grid;',
          '  grid-template-columns: 35% 65%;',
          '  background: #ffffff;',
          '  font-family: Arial, Helvetica, sans-serif;',
          '}',
          '.sidebar {',
          '  background: #ddd8d3;',
          '  padding: 16mm 8mm 14mm 12mm;',
          '  min-width: 0;',
          '}',
          '.main {',
          '  background: #f7f7f7;',
          '  padding: 18mm 14mm 14mm 12mm;',
          '  min-width: 0;',
          '}',
          '.header-section {',
          '  margin-bottom: 9mm;',
          '}',
          '.name {',
          '  margin: 0;',
          '  font-size: 9.5mm;',
          '  font-weight: 300;',
          '  letter-spacing: 0.04em;',
          '  text-transform: uppercase;',
          '  line-height: 1.15;',
          '  color: #2e2b28;',
          '}',
          '.profession {',
          '  margin-top: 3mm;',
          '  font-size: 3.2mm;',
          '  letter-spacing: 0.18em;',
          '  text-transform: uppercase;',
          '  font-style: italic;',
          '  color: #4e4a46;',
          '}',
          '.side-section {',
          '  margin-bottom: 9mm;',
          '}',
          '.side-section:last-child {',
          '  margin-bottom: 0;',
          '}',
          '.side-title-row {',
          '  display: flex;',
          '  align-items: center;',
          '  gap: 3mm;',
          '  margin-bottom: 4mm;',
          '}',
          '.side-icon {',
          '  width: 6mm;',
          '  height: 6mm;',
          '  min-width: 6mm;',
          '  border-radius: 50%;',
          '  display: inline-flex;',
          '  align-items: center;',
          '  justify-content: center;',
          '  background: #595553;',
          '  color: #ffffff;',
          '  font-size: 2.4mm;',
          '  font-weight: 700;',
          '}',
          '.side-title {',
          '  margin: 0;',
          '  font-size: 3.5mm;',
          '  text-transform: uppercase;',
          '  letter-spacing: 0.12em;',
          '  font-weight: 700;',
          '  color: #4f4b48;',
          '}',
          '.side-content {',
          '  font-size: 2.9mm;',
          '  line-height: 1.6;',
          '  color: #322f2c;',
          '}',
          '.contact-list {',
          '  display: grid;',
          '  gap: 2mm;',
          '}',
          '.contact-item {',
          '  display: grid;',
          '  grid-template-columns: 5mm 1fr;',
          '  gap: 1.5mm;',
          '  align-items: start;',
          '}',
          '.contact-label {',
          '  color: #5b5652;',
          '  font-size: 2.7mm;',
          '  line-height: 1.3;',
          '}',
          '.contact-value {',
          '  word-break: break-word;',
          '}',
          '.language-list {',
          '  display: grid;',
          '  gap: 3.2mm;',
          '}',
          '.language-item {',
          '  display: block;',
          '}',
          '.language-name {',
          '  font-weight: 700;',
          '  font-size: 3mm;',
          '}',
          '.language-level {',
          '  font-size: 2.8mm;',
          '  color: #5d5753;',
          '}',
          '.skills-wrap {',
          '  display: flex;',
          '  flex-wrap: wrap;',
          '  gap: 6px;',
          '}',
          '.skill-chip {',
          '  display: inline-block;',
          '  white-space: nowrap;',
          '  padding: 4px 8px;',
          '  border-radius: 999px;',
          '  border: 1px solid #b9b1ab;',
          '  background: #f3f0ed;',
          '  color: #403c39;',
          '  font-size: 2.65mm;',
          '  line-height: 1.2;',
          '}',
          '.main-section {',
          '  margin-bottom: 7mm;',
          '}',
          '.main-section:last-child {',
          '  margin-bottom: 0;',
          '}',
          '.main-title {',
          '  margin: 0;',
          '  font-size: 3.8mm;',
          '  font-weight: 700;',
          '  letter-spacing: 0.08em;',
          '  text-transform: uppercase;',
          '  color: #4b4744;',
          '}',
          '.main-rule {',
          '  width: 100%;',
          '  height: 0;',
          '  border-top: 1px solid #615b57;',
          '  margin: 3mm 0 4mm;',
          '}',
          '.summary-text {',
          '  font-size: 3mm;',
          '  line-height: 1.65;',
          '  color: #312d2b;',
          '  white-space: pre-wrap;',
          '  word-break: break-word;',
          '}',
          '.entry {',
          '  margin-bottom: 5mm;',
          '}',
          '.entry:last-child {',
          '  margin-bottom: 0;',
          '}',
          '.entry-head-inline {',
          '  display: flex;',
          '  justify-content: space-between;',
          '  gap: 4mm;',
          '  align-items: baseline;',
          '}',
          '.entry-title {',
          '  margin: 0;',
          '  font-size: 3.25mm;',
          '  font-weight: 700;',
          '  color: #282522;',
          '  line-height: 1.35;',
          '}',
          '.entry-meta {',
          '  margin-top: 1mm;',
          '  font-size: 2.8mm;',
          '  color: #4e4945;',
          '  line-height: 1.45;',
          '  word-break: break-word;',
          '}',
          '.meta-strong {',
          '  font-weight: 700;',
          '}',
          '.meta-sep {',
          '  color: #6b6561;',
          '}',
          '.entry-year {',
          '  font-size: 2.8mm;',
          '  color: #4e4945;',
          '  white-space: nowrap;',
          '}',
          '.entry-text {',
          '  margin-top: 1.5mm;',
          '  font-size: 2.95mm;',
          '  line-height: 1.55;',
          '  color: #322e2b;',
          '  white-space: pre-wrap;',
          '  word-break: break-word;',
          '}',
          '.bullet-list {',
          '  margin: 1.8mm 0 0 0;',
          '  padding-left: 4mm;',
          '  font-size: 2.9mm;',
          '  line-height: 1.5;',
          '  color: #2f2b29;',
          '}',
          '.bullet-list li {',
          '  margin: 0 0 1mm 0;',
          '}',
          '.bullet-list li:last-child {',
          '  margin-bottom: 0;',
          '}',
          '.tag-list {',
          '  display: flex;',
          '  flex-wrap: wrap;',
          '  gap: 5px;',
          '  margin-top: 2mm;',
          '}',
          '.tag {',
          '  display: inline-block;',
          '  padding: 3px 7px;',
          '  border-radius: 999px;',
          '  background: #ece7e2;',
          '  border: 1px solid #c8bfb8;',
          '  font-size: 2.55mm;',
          '  color: #413d3a;',
          '  line-height: 1.2;',
          '}',
          '@media print {',
          '  .page {',
          '    width: 210mm;',
          '    min-height: 297mm;',
          '  }',
          '}',
          '</style>',
          '<div class="page">',
            '<div class="sidebar">',
              contactHtml,
              languagesHtml,
              skillsHtml,
            '</div>',
            '<div class="main">',
              headerHtml,
              profileHtml,
              experienceHtml,
              projectsHtml,
              achievementsHtml,
              educationHtml,
              certificationsHtml,
            '</div>',
          '</div>'
        ].join('');
      }
    }
  
    if (!customElements.get('gqr-resume-beige-column')) {
      customElements.define('gqr-resume-beige-column', GQRResumeBeigeColumn);
    }
  })();