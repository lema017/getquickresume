(function() {
    'use strict';
  
    /**
     * name: gqr-resume-minimal-axis
     * description: "Two-column resume with a light gray sidebar/main style, monochrome palette, clean typography, and a refined minimalist editorial layout."
     */
  
    class GQRResumeMinimalAxis extends HTMLElement {
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
            profile: 'Sobre mí',
            experience: 'Experiencia laboral',
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
        const dataLang = this.safeStr(this._data && this._data.language).toLowerCase();
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
  
      getShortMonthName(index, lang) {
        const months = {
          en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        };
        return (months[lang] && months[lang][index]) || '';
      }
  
      formatShortDate(dateStr, lang) {
        const raw = this.safeStr(dateStr).trim();
        if (!raw) return '';
        const match = raw.match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/);
        if (!match) return this.escapeHtml(raw);
  
        const year = match[1];
        const month = match[2];
  
        if (month) {
          const monthIndex = parseInt(month, 10) - 1;
          if (monthIndex >= 0 && monthIndex < 12) {
            return this.escapeHtml(this.getShortMonthName(monthIndex, lang) + ' ' + year);
          }
        }
  
        return this.escapeHtml(year);
      }
  
      formatDateRange(startDate, endDate, isCurrent, lang) {
        const t = this.i18n[lang] || this.i18n.en;
        const start = this.formatShortDate(startDate, lang);
        const end = isCurrent ? this.escapeHtml(t.present) : this.formatShortDate(endDate, lang);
  
        if (start && end) return start + ' - ' + end;
        if (start) return start;
        if (end) return end;
        return '';
      }
  
      mergeSkills() {
        const rawSkills = this.safeArr(this._data.skillsRaw);
        const rawTools = this.safeArr(this._data.toolsRaw);
        const seen = new Set();
        const merged = [];
  
        rawSkills.concat(rawTools).forEach((item) => {
          const value = this.safeStr(item).trim();
          const key = value.toLowerCase();
          if (value && !seen.has(key)) {
            seen.add(key);
            merged.push(value);
          }
        });
  
        return merged;
      }
  
      renderContactSection(lang, t) {
        const email = this.safeStr(this._data.email).trim();
        const phone = this.safeStr(this._data.phone).trim();
        const country = this.safeStr(this._data.country).trim();
        const linkedin = this.safeStr(this._data.linkedin).trim();
  
        if (!email && !phone && !country && !linkedin) return '';
  
        const linkedinLabel = linkedin
          ? this.escapeHtml(linkedin.replace(/^https?:\/\//i, '').replace(/^www\./i, ''))
          : '';
  
        return [
          '<section class="section section-contact" data-section="contact">',
          '<h3 class="section-title">' + this.escapeHtml(t.contact) + '</h3>',
          '<div class="contact-list">',
          email ? '<div class="contact-item"><span class="contact-icon">✉</span><span class="contact-text">' + this.escapeHtml(email) + '</span></div>' : '',
          phone ? '<div class="contact-item"><span class="contact-icon">☎</span><span class="contact-text">' + this.escapeHtml(phone) + '</span></div>' : '',
          country ? '<div class="contact-item"><span class="contact-icon">⌂</span><span class="contact-text">' + this.escapeHtml(country) + '</span></div>' : '',
          linkedin ? '<div class="contact-item"><span class="contact-icon">in</span><span class="contact-text">' + linkedinLabel + '</span></div>' : '',
          '</div>',
          '</section>'
        ].join('');
      }
  
      renderLanguagesSection(lang, t) {
        const items = this.safeArr(this._data.languages).filter((item) => {
          return this.safeStr(item && item.name).trim();
        });
  
        if (!items.length) return '';
  
        const levelMap = this.levelMap[lang] || this.levelMap.en;
  
        return [
          '<section class="section section-languages" data-section="languages">',
          '<h3 class="section-title">' + this.escapeHtml(t.languages) + '</h3>',
          '<div class="languages-list">',
          items.map((item) => {
            const name = this.escapeHtml(this.safeStr(item.name));
            const levelKey = this.safeStr(item.level).toLowerCase();
            const level = this.escapeHtml(levelMap[levelKey] || this.safeStr(item.level));
            const entryId = this.escapeHtml(this.safeStr(item.id));
            return [
              '<div class="language-item" data-entry-id="' + entryId + '">',
              '<div class="language-name">' + name + '</div>',
              level ? '<div class="language-level">' + level + '</div>' : '',
              '</div>'
            ].join('');
          }).join(''),
          '</div>',
          '</section>'
        ].join('');
      }
  
      renderSkillsSection(lang, t) {
        const skills = this.mergeSkills();
        if (!skills.length) return '';
  
        return [
          '<section class="section section-skills" data-section="skills">',
          '<h3 class="section-title">' + this.escapeHtml(t.skills) + '</h3>',
          '<div class="skills-badge-wrap">',
          skills.map((skill, index) => {
            return '<span class="skill-badge" data-entry-id="skill-' + index + '">' + this.escapeHtml(skill) + '</span>';
          }).join(''),
          '</div>',
          '</section>'
        ].join('');
      }
  
      renderHeaderSection() {
        const firstName = this.safeStr(this._data.firstName).trim();
        const lastName = this.safeStr(this._data.lastName).trim();
        const profession = this.safeStr(this._data.profession).trim();
        const fullName = (firstName + ' ' + lastName).trim();
  
        if (!fullName && !profession) return '';
  
        return [
          '<section class="hero" data-section="header">',
          fullName ? '<h1 class="name">' + this.escapeHtml(fullName) + '</h1>' : '',
          profession ? '<div class="profession">' + this.escapeHtml(profession) + '</div>' : '',
          '</section>'
        ].join('');
      }
  
      renderProfileSection(lang, t) {
        const summary = this.safeStr(this._data.summary).trim();
        if (!summary) return '';
  
        return [
          '<section class="section" data-section="profile">',
          '<h2 class="main-section-title">' + this.escapeHtml(t.profile) + '</h2>',
          '<div class="divider"></div>',
          '<div class="profile-text">' + this.escapeHtml(summary) + '</div>',
          '</section>'
        ].join('');
      }
  
      renderExperienceSection(lang, t) {
        const items = this.safeArr(this._data.experience).filter((item) => {
          return this.safeStr(item && (item.title || item.company)).trim();
        });
  
        if (!items.length) return '';
  
        return [
          '<section class="section" data-section="experience">',
          '<h2 class="main-section-title">' + this.escapeHtml(t.experience) + '</h2>',
          '<div class="divider"></div>',
          '<div class="timeline-list">',
          items.map((item) => {
            const id = this.escapeHtml(this.safeStr(item.id));
            const title = this.escapeHtml(this.safeStr(item.title));
            const company = this.escapeHtml(this.safeStr(item.company));
            const location = this.escapeHtml(this.safeStr(item.location));
            const range = this.formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang);
            const bullets = this.safeArr(item.achievements).concat(this.safeArr(item.responsibilities))
              .map((bullet) => this.safeStr(bullet).trim())
              .filter(Boolean);
  
            return [
              '<article class="entry entry-experience" data-entry-id="' + id + '">',
              '<div class="entry-head">',
              '<div class="entry-title-wrap">',
              title ? '<h3 class="entry-title">' + title + '</h3>' : '',
              (company || location) ? (
                '<div class="entry-subtitle">' +
                company +
                (company && location ? ' · ' : '') +
                location +
                '</div>'
              ) : '',
              '</div>',
              range ? '<div class="entry-date">' + range + '</div>' : '',
              '</div>',
              bullets.length ? (
                '<ul class="bullet-list">' +
                bullets.map((bullet) => '<li>' + this.escapeHtml(bullet) + '</li>').join('') +
                '</ul>'
              ) : '',
              '</article>'
            ].join('');
          }).join(''),
          '</div>',
          '</section>'
        ].join('');
      }
  
      renderProjectsSection(lang, t) {
        const items = this.safeArr(this._data.projects).filter((item) => {
          return this.safeStr(item && (item.name || item.description)).trim();
        });
  
        if (!items.length) return '';
  
        return [
          '<section class="section" data-section="projects">',
          '<h2 class="main-section-title">' + this.escapeHtml(t.projects) + '</h2>',
          '<div class="divider"></div>',
          '<div class="timeline-list">',
          items.map((item) => {
            const id = this.escapeHtml(this.safeStr(item.id));
            const name = this.escapeHtml(this.safeStr(item.name));
            const description = this.escapeHtml(this.safeStr(item.description));
            const tech = this.safeArr(item.technologies)
              .map((x) => this.safeStr(x).trim())
              .filter(Boolean);
            const url = this.safeStr(item.url).trim();
            const range = this.formatDateRange(item.startDate, item.endDate, !!item.isOngoing, lang);
  
            return [
              '<article class="entry entry-project" data-entry-id="' + id + '">',
              '<div class="entry-head">',
              '<div class="entry-title-wrap">',
              name ? '<h3 class="entry-title">' + name + '</h3>' : '',
              url ? '<div class="entry-subtitle">' + this.escapeHtml(url) + '</div>' : '',
              '</div>',
              range ? '<div class="entry-date">' + range + '</div>' : '',
              '</div>',
              description ? '<div class="entry-text">' + description + '</div>' : '',
              tech.length ? '<div class="tag-row">' + tech.map((x) => '<span class="tag">' + this.escapeHtml(x) + '</span>').join('') + '</div>' : '',
              '</article>'
            ].join('');
          }).join(''),
          '</div>',
          '</section>'
        ].join('');
      }
  
      renderAchievementsSection(lang, t) {
        const items = this.safeArr(this._data.achievements).filter((item) => {
          return this.safeStr(item && (item.title || item.description)).trim();
        });
  
        if (!items.length) return '';
  
        return [
          '<section class="section" data-section="achievements">',
          '<h2 class="main-section-title">' + this.escapeHtml(t.achievements) + '</h2>',
          '<div class="divider"></div>',
          '<div class="timeline-list">',
          items.map((item) => {
            const id = this.escapeHtml(this.safeStr(item.id));
            const title = this.escapeHtml(this.safeStr(item.title));
            const description = this.escapeHtml(this.safeStr(item.description));
            const year = this.escapeHtml(this.safeStr(item.year));
  
            return [
              '<article class="entry entry-achievement" data-entry-id="' + id + '">',
              '<div class="entry-head">',
              '<div class="entry-title-wrap">',
              title ? '<h3 class="entry-title">' + title + '</h3>' : '',
              '</div>',
              year ? '<div class="entry-date">' + year + '</div>' : '',
              '</div>',
              description ? '<div class="entry-text">' + description + '</div>' : '',
              '</article>'
            ].join('');
          }).join(''),
          '</div>',
          '</section>'
        ].join('');
      }
  
      renderEducationSection(lang, t) {
        const items = this.safeArr(this._data.education).filter((item) => {
          return this.safeStr(item && (item.institution || item.degree || item.field)).trim();
        });
  
        if (!items.length) return '';
  
        return [
          '<section class="section" data-section="education">',
          '<h2 class="main-section-title">' + this.escapeHtml(t.education) + '</h2>',
          '<div class="divider"></div>',
          '<div class="timeline-list">',
          items.map((item) => {
            const id = this.escapeHtml(this.safeStr(item.id));
            const institution = this.escapeHtml(this.safeStr(item.institution));
            const degree = this.escapeHtml(this.safeStr(item.degree));
            const field = this.escapeHtml(this.safeStr(item.field));
            const gpa = this.escapeHtml(this.safeStr(item.gpa));
            const range = this.formatDateRange(item.startDate, item.endDate, item.isCompleted === false, lang);
  
            let subtitle = '';
            if (degree && field) subtitle = degree + ' · ' + field;
            else subtitle = degree || field;
  
            return [
              '<article class="entry entry-education" data-entry-id="' + id + '">',
              '<div class="entry-head">',
              '<div class="entry-title-wrap">',
              institution ? '<h3 class="entry-title">' + institution + '</h3>' : '',
              subtitle ? '<div class="entry-subtitle">' + subtitle + '</div>' : '',
              gpa ? '<div class="entry-meta">GPA: ' + gpa + '</div>' : '',
              '</div>',
              range ? '<div class="entry-date">' + range + '</div>' : '',
              '</div>',
              '</article>'
            ].join('');
          }).join(''),
          '</div>',
          '</section>'
        ].join('');
      }
  
      renderCertificationsSection(lang, t) {
        const items = this.safeArr(this._data.certifications).filter((item) => {
          return this.safeStr(item && (item.name || item.issuer || item.date)).trim();
        });
  
        if (!items.length) return '';
  
        return [
          '<section class="section" data-section="certifications">',
          '<h2 class="main-section-title">' + this.escapeHtml(t.certifications) + '</h2>',
          '<div class="divider"></div>',
          '<div class="timeline-list">',
          items.map((item) => {
            const id = this.escapeHtml(this.safeStr(item.id));
            const name = this.escapeHtml(this.safeStr(item.name));
            const issuer = this.escapeHtml(this.safeStr(item.issuer));
            const date = this.escapeHtml(this.safeStr(item.date));
  
            return [
              '<article class="entry entry-certification" data-entry-id="' + id + '">',
              '<div class="entry-head">',
              '<div class="entry-title-wrap">',
              name ? '<h3 class="entry-title">' + name + '</h3>' : '',
              issuer ? '<div class="entry-subtitle">' + issuer + '</div>' : '',
              '</div>',
              date ? '<div class="entry-date">' + date + '</div>' : '',
              '</div>',
              '</article>'
            ].join('');
          }).join(''),
          '</div>',
          '</section>'
        ].join('');
      }
  
      render() {
        if (!this.shadowRoot) return;
  
        const lang = this.getLanguage();
        const t = this.i18n[lang] || this.i18n.en;
  
        const headerHtml = this.renderHeaderSection();
        const contactHtml = this.renderContactSection(lang, t);
        const languagesHtml = this.renderLanguagesSection(lang, t);
        const skillsHtml = this.renderSkillsSection(lang, t);
        const profileHtml = this.renderProfileSection(lang, t);
        const experienceHtml = this.renderExperienceSection(lang, t);
        const projectsHtml = this.renderProjectsSection(lang, t);
        const achievementsHtml = this.renderAchievementsSection(lang, t);
        const educationHtml = this.renderEducationSection(lang, t);
        const certificationsHtml = this.renderCertificationsSection(lang, t);
  
        this.shadowRoot.innerHTML = [
          '<style>',
          ':host {',
          '  display: block;',
          '  color: #111111;',
          '  -webkit-print-color-adjust: exact;',
          '  print-color-adjust: exact;',
          '}',
          '* { box-sizing: border-box; }',
          '.page {',
          '  width: 210mm;',
          '  min-height: 297mm;',
          '  height: auto;',
          '  overflow: visible;',
          '  display: grid;',
          '  grid-template-columns: 34% 66%;',
          '  background: #ffffff;',
          '  color: #111111;',
          '  font-family: Arial, Helvetica, sans-serif;',
          '  line-height: 1.35;',
          '}',
          '.sidebar {',
          '  background: #ececec;',
          '  padding: 22mm 8mm 18mm 14mm;',
          '  min-width: 0;',
          '}',
          '.main {',
          '  background: #ffffff;',
          '  padding: 18mm 14mm 18mm 10mm;',
          '  min-width: 0;',
          '}',
          '.hero {',
          '  padding: 0 0 8mm 0;',
          '  margin: 0 0 6mm 0;',
          '  border-bottom: 1px solid #d3d3d3;',
          '}',
          '.name {',
          '  margin: 0;',
          '  font-size: 11mm;',
          '  line-height: 1.05;',
          '  font-weight: 700;',
          '  letter-spacing: 0.01em;',
          '}',
          '.profession {',
          '  margin-top: 3mm;',
          '  font-size: 3.3mm;',
          '  text-transform: uppercase;',
          '  letter-spacing: 0.22em;',
          '  color: #555555;',
          '}',
          '.section {',
          '  margin: 0 0 7mm 0;',
          '}',
          '.section:last-child {',
          '  margin-bottom: 0;',
          '}',
          '.section-title {',
          '  margin: 0 0 4mm 0;',
          '  font-size: 3.4mm;',
          '  font-weight: 700;',
          '  text-transform: uppercase;',
          '  letter-spacing: 0.06em;',
          '}',
          '.main-section-title {',
          '  margin: 0;',
          '  font-size: 4.1mm;',
          '  font-weight: 700;',
          '  text-transform: uppercase;',
          '  letter-spacing: 0.04em;',
          '}',
          '.divider {',
          '  width: 100%;',
          '  height: 1px;',
          '  background: #cfcfcf;',
          '  margin: 2mm 0 4mm 0;',
          '}',
          '.profile-text, .entry-text {',
          '  font-size: 3.05mm;',
          '  color: #222222;',
          '  white-space: pre-wrap;',
          '  word-break: break-word;',
          '}',
          '.contact-list {',
          '  display: grid;',
          '  gap: 2.6mm;',
          '}',
          '.contact-item {',
          '  display: grid;',
          '  grid-template-columns: 6mm 1fr;',
          '  align-items: start;',
          '  column-gap: 2mm;',
          '  font-size: 2.95mm;',
          '}',
          '.contact-icon {',
          '  display: inline-flex;',
          '  align-items: center;',
          '  justify-content: center;',
          '  width: 5.2mm;',
          '  height: 5.2mm;',
          '  border-radius: 50%;',
          '  background: #111111;',
          '  color: #ffffff;',
          '  font-size: 2.4mm;',
          '  font-weight: 700;',
          '  line-height: 1;',
          '}',
          '.contact-text {',
          '  word-break: break-word;',
          '}',
          '.languages-list, .timeline-list {',
          '  display: grid;',
          '  gap: 3.2mm;',
          '}',
          '.skills-badge-wrap {',
          '  display: flex;',
          '  flex-wrap: wrap;',
          '  gap: 2mm;',
          '}',
          '.language-item {',
          '  font-size: 2.95mm;',
          '}',
          '.language-name {',
          '  font-weight: 700;',
          '  margin-bottom: 0.8mm;',
          '}',
          '.language-level {',
          '  color: #555555;',
          '}',
          '.skill-badge {',
          '  display: inline-block;',
          '  padding: 2.1mm 2.4mm;',
          '  border: 1px solid #cfcfcf;',
          '  background: #f6f6f6;',
          '  border-radius: 999px;',
          '  font-size: 2.85mm;',
          '  line-height: 1.25;',
          '  white-space: nowrap;',
          '  word-break: break-word;',
          '}',
          '.entry {',
          '  position: relative;',
          '  padding-left: 4.5mm;',
          '  border-left: 1px solid #bcbcbc;',
          '}',
          '.entry::before {',
          '  content: "";',
          '  position: absolute;',
          '  left: -1.8mm;',
          '  top: 1.2mm;',
          '  width: 3mm;',
          '  height: 3mm;',
          '  border-radius: 50%;',
          '  background: #ffffff;',
          '  border: 1.5px solid #8a8a8a;',
          '}',
          '.entry-head {',
          '  display: grid;',
          '  grid-template-columns: 1fr auto;',
          '  gap: 2mm 4mm;',
          '  align-items: start;',
          '}',
          '.entry-title-wrap {',
          '  min-width: 0;',
          '}',
          '.entry-title {',
          '  margin: 0;',
          '  font-size: 3.35mm;',
          '  font-weight: 700;',
          '  line-height: 1.25;',
          '}',
          '.entry-subtitle {',
          '  margin-top: 0.8mm;',
          '  font-size: 2.95mm;',
          '  color: #444444;',
          '  line-height: 1.3;',
          '  word-break: break-word;',
          '}',
          '.entry-meta {',
          '  margin-top: 0.8mm;',
          '  font-size: 2.8mm;',
          '  color: #555555;',
          '}',
          '.entry-date {',
          '  white-space: nowrap;',
          '  font-size: 2.8mm;',
          '  color: #555555;',
          '  padding-top: 0.3mm;',
          '}',
          '.bullet-list {',
          '  margin: 2mm 0 0 0;',
          '  padding-left: 4.5mm;',
          '  font-size: 2.95mm;',
          '}',
          '.bullet-list li {',
          '  margin: 0 0 1.1mm 0;',
          '}',
          '.bullet-list li:last-child {',
          '  margin-bottom: 0;',
          '}',
          '.tag-row {',
          '  display: flex;',
          '  flex-wrap: wrap;',
          '  gap: 1.5mm;',
          '  margin-top: 2mm;',
          '}',
          '.tag {',
          '  display: inline-block;',
          '  padding: 1.1mm 2mm;',
          '  border: 1px solid #d4d4d4;',
          '  border-radius: 999px;',
          '  font-size: 2.6mm;',
          '  color: #333333;',
          '  background: #fafafa;',
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
  
    if (!customElements.get('gqr-resume-minimal-axis')) {
      customElements.define('gqr-resume-minimal-axis', GQRResumeMinimalAxis);
    }
  })();