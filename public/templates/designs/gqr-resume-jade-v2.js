(function() {
  'use strict';

  class GQRResumeJadeV2 extends HTMLElement {
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

    t(key) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      return (this.i18n[lang] && this.i18n[lang][key]) || this.i18n.en[key] || key;
    }

    mapLevel(level) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const normalized = this.safeStr(level).toLowerCase();
      return (this.levelMap[lang] && this.levelMap[lang][normalized]) || this.escapeHtml(level);
    }

    formatShortDate(value) {
      const raw = this.safeStr(value).trim();
      if (!raw) return '';
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };

      if (/^\d{4}$/.test(raw)) return raw;

      const match = raw.match(/^(\d{4})-(\d{2})$/);
      if (match) {
        const year = match[1];
        const monthIndex = parseInt(match[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return months[lang][monthIndex] + ' ' + year;
        }
      }

      const d = new Date(raw);
      if (!isNaN(d.getTime())) {
        return months[lang][d.getMonth()] + ' ' + d.getFullYear();
      }

      return raw;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const start = this.formatShortDate(startDate);
      const end = isCurrentLike ? this.t('present') : this.formatShortDate(endDate);
      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `<div class="section-title">${this.escapeHtml(title)}</div>`;
    }

    renderContactSection(d) {
      const items = [
        { label: 'Email', value: this.safeStr(d.email), type: 'text' },
        { label: this.getLanguage() === 'es' ? 'Teléfono' : 'Phone', value: this.safeStr(d.phone), type: 'text' },
        { label: this.getLanguage() === 'es' ? 'Ubicación' : 'Location', value: this.safeStr(d.country), type: 'text' },
        { label: 'LinkedIn', value: this.safeStr(d.linkedin), type: 'link' }
      ].filter(item => item.value);

      if (!items.length) return '';

      return `
        <section class="section section-sidebar" data-section="contact">
          ${this.renderSectionTitle(this.t('contact'))}
          <div class="contact-list">
            ${items.map(item => `
              <div class="contact-item">
                <div class="contact-label">${this.escapeHtml(item.label)}</div>
                <div class="contact-value">${item.type === 'link' ? this.renderLinkedIn(item.value) : this.escapeHtml(item.value)}</div>
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderLinkedIn(value) {
      const raw = this.safeStr(value).trim();
      if (!raw) return '';
      const href = /^https?:\/\//i.test(raw) ? raw : `https://linkedin.com/in/${raw.replace(/^@/, '')}`;
      return `<a href="${this.escapeHtml(href)}" target="_blank" rel="noreferrer noopener">${this.escapeHtml(raw)}</a>`;
    }

    renderLanguagesSection(languages) {
      if (!languages.length) return '';
      return `
        <section class="section section-sidebar" data-section="languages">
          ${this.renderSectionTitle(this.t('languages'))}
          <div class="stack-list">
            ${languages.map(item => `
              <div class="language-item" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                <div class="item-head compact">
                  <div class="item-title">${this.escapeHtml(this.safeStr(item.name))}</div>
                </div>
                <div class="item-sub subtle">${this.escapeHtml(this.mapLevel(item.level))}</div>
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderSkillsSection(skills) {
      if (!skills.length) return '';
      return `
        <section class="section section-sidebar" data-section="skills">
          ${this.renderSectionTitle(this.t('skills'))}
          <div class="skills-wrap">
            ${skills.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderHeaderSection(d) {
      const fullName = [this.safeStr(d.firstName), this.safeStr(d.lastName)].filter(Boolean).join(' ').trim();
      const profession = this.safeStr(d.profession);
      if (!fullName && !profession) return '';
      return `
        <section class="hero-card" data-section="header">
          <div class="name-block">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
          <div class="hero-accent" aria-hidden="true"></div>
        </section>
      `;
    }

    renderProfileSection(summary) {
      const text = this.safeStr(summary);
      if (!text) return '';
      return `
        <section class="section section-main" data-section="profile">
          ${this.renderSectionTitle(this.t('profile'))}
          <div class="profile-text">${this.escapeHtml(text)}</div>
        </section>
      `;
    }

    renderExperienceSection(experience) {
      if (!experience.length) return '';
      return `
        <section class="section section-main" data-section="experience">
          ${this.renderSectionTitle(this.t('experience'))}
          <div class="timeline">
            ${experience.map(item => {
              const bullets = [...this.safeArr(item.achievements), ...this.safeArr(item.responsibilities)].filter(Boolean);
              const title = this.safeStr(item.title);
              const company = this.safeStr(item.company);
              const location = this.safeStr(item.location);
              const dateRange = this.formatDateRange(item.startDate, item.endDate, !!item.isCurrent);
              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="entry-grid">
                    <div class="entry-top">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                      ${(company || location) ? `
                        <div class="entry-meta">
                          ${company ? `<span>${this.escapeHtml(company)}</span>` : ''}
                          ${company && location ? `<span class="dot">•</span>` : ''}
                          ${location ? `<span>${this.escapeHtml(location)}</span>` : ''}
                        </div>
                      ` : ''}
                    </div>
                    ${dateRange ? `<div class="date-pill">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${bullets.length ? `
                    <ul class="bullets">
                      ${bullets.map(b => `<li>${this.escapeHtml(this.safeStr(b))}</li>`).join('')}
                    </ul>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjectsSection(projects) {
      if (!projects.length) return '';
      return `
        <section class="section section-main" data-section="projects">
          ${this.renderSectionTitle(this.t('projects'))}
          <div class="cards">
            ${projects.map(item => {
              const dateRange = this.formatDateRange(item.startDate, item.endDate, !!item.isOngoing);
              const tech = this.safeArr(item.technologies).filter(Boolean);
              const url = this.safeStr(item.url);
              return `
                <article class="entry card-entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="entry-grid">
                    <div class="entry-top">
                      ${this.safeStr(item.name) ? `<div class="entry-title">${this.escapeHtml(this.safeStr(item.name))}</div>` : ''}
                    </div>
                    ${dateRange ? `<div class="date-pill">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${this.safeStr(item.description) ? `<div class="entry-text">${this.escapeHtml(this.safeStr(item.description))}</div>` : ''}
                  ${tech.length ? `<div class="tags">${tech.map(t => `<span class="tag">${this.escapeHtml(this.safeStr(t))}</span>`).join('')}</div>` : ''}
                  ${url ? `<div class="entry-link"><a href="${this.escapeHtml(url)}" target="_blank" rel="noreferrer noopener">${this.escapeHtml(url)}</a></div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievementsSection(achievements) {
      if (!achievements.length) return '';
      return `
        <section class="section section-main" data-section="achievements">
          ${this.renderSectionTitle(this.t('achievements'))}
          <div class="cards">
            ${achievements.map(item => `
              <article class="entry card-entry compact-card" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                <div class="entry-grid">
                  <div class="entry-top">
                    ${this.safeStr(item.title) ? `<div class="entry-title">${this.escapeHtml(this.safeStr(item.title))}</div>` : ''}
                  </div>
                  ${this.safeStr(item.year) ? `<div class="date-pill">${this.escapeHtml(this.safeStr(item.year))}</div>` : ''}
                </div>
                ${this.safeStr(item.description) ? `<div class="entry-text">${this.escapeHtml(this.safeStr(item.description))}</div>` : ''}
              </article>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderEducationSection(education) {
      if (!education.length) return '';
      return `
        <section class="section section-main" data-section="education">
          ${this.renderSectionTitle(this.t('education'))}
          <div class="timeline">
            ${education.map(item => {
              const degree = this.safeStr(item.degree);
              const field = this.safeStr(item.field);
              const institution = this.safeStr(item.institution);
              const gpa = this.safeStr(item.gpa);
              const dateRange = this.formatDateRange(item.startDate, item.endDate, item.isCompleted === false);
              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="entry-grid">
                    <div class="entry-top">
                      ${(degree || field) ? `<div class="entry-title">${this.escapeHtml([degree, field].filter(Boolean).join(', '))}</div>` : ''}
                      ${institution ? `<div class="entry-meta"><span>${this.escapeHtml(institution)}</span></div>` : ''}
                    </div>
                    ${dateRange ? `<div class="date-pill">${this.escapeHtml(dateRange)}</div>` : ''}
                  </div>
                  ${gpa ? `<div class="entry-text"><strong>GPA:</strong> ${this.escapeHtml(gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertificationsSection(certifications) {
      if (!certifications.length) return '';
      return `
        <section class="section section-main" data-section="certifications">
          ${this.renderSectionTitle(this.t('certifications'))}
          <div class="cards">
            ${certifications.map(item => `
              <article class="entry card-entry compact-card" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                <div class="entry-grid">
                  <div class="entry-top">
                    ${this.safeStr(item.name) ? `<div class="entry-title">${this.escapeHtml(this.safeStr(item.name))}</div>` : ''}
                    ${this.safeStr(item.issuer) ? `<div class="entry-meta"><span>${this.escapeHtml(this.safeStr(item.issuer))}</span></div>` : ''}
                  </div>
                  ${this.safeStr(item.date) ? `<div class="date-pill">${this.escapeHtml(this.safeStr(item.date))}</div>` : ''}
                </div>
              </article>
            `).join('')}
          </div>
        </section>
      `;
    }

    mergeSkills() {
      const merged = [...this.safeArr(this.data?.skillsRaw), ...this.safeArr(this.data?.toolsRaw)]
        .map(v => this.safeStr(v).trim())
        .filter(Boolean);
      return Array.from(new Set(merged));
    }

    render() {
      if (!this.shadowRoot) return;

      const d = this.data || {};
      const experience = this.safeArr(d.experience);
      const education = this.safeArr(d.education);
      const projects = this.safeArr(d.projects);
      const certifications = this.safeArr(d.certifications);
      const languages = this.safeArr(d.languages);
      const achievements = this.safeArr(d.achievements);
      const skills = this.mergeSkills();

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2f2b28;
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
            background: #f3eee6;
            display: grid;
            grid-template-columns: 34% 66%;
            font-family: Georgia, "Times New Roman", serif;
            color: #312d2a;
          }

          .sidebar {
            background: linear-gradient(180deg, #353536 0%, #2b2b2c 100%);
            color: #f5f1eb;
            padding: 22mm 8mm 18mm 10mm;
            min-height: 297mm;
          }

          .main {
            padding: 16mm 12mm 16mm 12mm;
            background:
              linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0.1)),
              #f3eee6;
          }

          .hero-card {
            background: #3e3c40;
            color: #fbf7f1;
            padding: 8mm 9mm 7mm;
            margin-bottom: 8mm;
            position: relative;
            overflow: hidden;
          }

          .hero-card::after {
            content: "";
            position: absolute;
            right: -12mm;
            top: -10mm;
            width: 34mm;
            height: 34mm;
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 50%;
          }

          .hero-accent {
            width: 28mm;
            height: 1.2mm;
            background: #c4ab83;
            margin-top: 4mm;
          }

          .name {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12.5mm;
            line-height: 0.95;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            font-weight: 800;
          }

          .profession {
            margin-top: 3mm;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 3.2mm;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            color: #ded4c6;
          }

          .section {
            margin-bottom: 7mm;
          }

          .section-title {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 3.4mm;
            font-weight: 800;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            margin: 0 0 3.5mm 0;
            padding-bottom: 1.8mm;
            border-bottom: 1px solid rgba(49,45,42,0.18);
            color: #3b3734;
          }

          .sidebar .section-title {
            color: #f4ede3;
            border-bottom: 1px solid rgba(255,255,255,0.22);
          }

          .contact-list,
          .stack-list {
            display: flex;
            flex-direction: column;
            gap: 3.2mm;
          }

          .contact-item {
            display: block;
          }

          .contact-label {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.6mm;
            text-transform: uppercase;
            letter-spacing: 0.7px;
            color: #cdbda7;
            margin-bottom: 1mm;
          }

          .contact-value,
          .contact-value a {
            color: #f6f2eb;
            text-decoration: none;
            font-size: 3mm;
            line-height: 1.45;
            word-break: break-word;
          }

          .language-item {
            padding-bottom: 2.2mm;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }

          .language-item:last-child {
            border-bottom: 0;
            padding-bottom: 0;
          }

          .item-head.compact {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 2mm;
          }

          .item-title {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 3.2mm;
            font-weight: 700;
            color: inherit;
          }

          .item-sub {
            font-size: 2.8mm;
            line-height: 1.35;
          }

          .subtle {
            color: #d8cec0;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            padding: 1.6mm 2.6mm;
            border: 1px solid rgba(255,255,255,0.22);
            color: #f5efe6;
            background: rgba(255,255,255,0.06);
            border-radius: 999px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.7mm;
            line-height: 1.2;
          }

          .profile-text {
            font-size: 3.1mm;
            line-height: 1.68;
            color: #4a433e;
          }

          .timeline,
          .cards {
            display: flex;
            flex-direction: column;
            gap: 4.2mm;
          }

          .entry {
            position: relative;
            padding-left: 4mm;
            border-left: 1px solid rgba(58,53,49,0.18);
          }

          .entry::before {
            content: "";
            position: absolute;
            left: -1.3mm;
            top: 1.8mm;
            width: 2.6mm;
            height: 2.6mm;
            background: #c4ab83;
            border-radius: 50%;
          }

          .card-entry {
            border-left: 0;
            padding-left: 0;
            background: rgba(255,255,255,0.45);
            border: 1px solid rgba(60,55,51,0.08);
            padding: 4mm;
          }

          .card-entry::before {
            display: none;
          }

          .compact-card {
            padding: 3.4mm 4mm;
          }

          .entry-grid {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 2.4mm;
            align-items: start;
          }

          .entry-title {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 3.2mm;
            line-height: 1.3;
            font-weight: 800;
            color: #2f2b28;
          }

          .entry-meta {
            margin-top: 0.8mm;
            font-size: 2.9mm;
            line-height: 1.4;
            color: #6a625a;
          }

          .dot {
            margin: 0 1.2mm;
          }

          .date-pill {
            white-space: nowrap;
            align-self: start;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.6mm;
            line-height: 1.2;
            color: #594f46;
            border: 1px solid rgba(89,79,70,0.18);
            padding: 1.2mm 2mm;
            background: rgba(196,171,131,0.13);
          }

          .entry-text {
            margin-top: 2mm;
            font-size: 2.95mm;
            line-height: 1.6;
            color: #4d4640;
          }

          .bullets {
            margin: 2mm 0 0 0;
            padding-left: 4.5mm;
          }

          .bullets li {
            margin: 0 0 1.2mm 0;
            font-size: 2.9mm;
            line-height: 1.55;
            color: #4f4842;
          }

          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2.2mm;
          }

          .tag {
            display: inline-block;
            white-space: nowrap;
            padding: 1.1mm 2mm;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.45mm;
            line-height: 1.2;
            background: #e8ddd0;
            color: #564c43;
            border-radius: 999px;
          }

          .entry-link {
            margin-top: 2mm;
            font-size: 2.7mm;
            word-break: break-all;
          }

          .entry-link a {
            color: #6d4e2f;
            text-decoration: none;
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
            ${this.renderContactSection(d)}
            ${this.renderLanguagesSection(languages)}
            ${this.renderSkillsSection(skills)}
          </div>

          <div class="main">
            ${this.renderHeaderSection(d)}
            ${this.renderProfileSection(d.summary)}
            ${this.renderExperienceSection(experience)}
            ${this.renderProjectsSection(projects)}
            ${this.renderAchievementsSection(achievements)}
            ${this.renderEducationSection(education)}
            ${this.renderCertificationsSection(certifications)}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-jade-v2')) {
    customElements.define('gqr-resume-jade-v2', GQRResumeJadeV2);
  }
})();