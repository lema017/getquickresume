(function() {
  'use strict';

  /**
   * name: gqr-resume-pearl-v2
   * description: "Two-column resume with a deep charcoal sidebar, warm ivory main panel, elegant serif headings, and refined gold-accent dividers inspired by a modern editorial layout."
   */

  class GQRResumePearlV2 extends HTMLElement {
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
          education: 'Formación',
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

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'language' && oldValue !== newValue) {
        this.render();
      }
    }

    getLanguage() {
      const lang = this.getAttribute('language') || this.data?.language || 'en';
      return lang === 'es' ? 'es' : 'en';
    }

    safeStr(v) {
      return typeof v === 'string' ? v : '';
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

    formatShortDate(value, language) {
      const str = this.safeStr(value).trim();
      if (!str) return '';
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };
      const m = str.match(/^(\d{4})(?:-(\d{2}))?/);
      if (!m) return this.escapeHtml(str);
      const year = m[1];
      const month = m[2] ? parseInt(m[2], 10) : null;
      if (!month || month < 1 || month > 12) return year;
      return months[language][month - 1] + ' ' + year;
    }

    formatDateRange(startDate, endDate, currentFlag, language) {
      const dict = this.i18n[language] || this.i18n.en;
      const start = this.formatShortDate(startDate, language);
      const end = currentFlag ? dict.present : this.formatShortDate(endDate, language);
      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderContactSection(t, d) {
      const email = this.safeStr(d.email);
      const phone = this.safeStr(d.phone);
      const country = this.safeStr(d.country);
      const linkedin = this.safeStr(d.linkedin);

      const items = [];
      if (email) items.push(`<div class="contact-item"><span class="contact-label">Email</span><span class="contact-value">${this.escapeHtml(email)}</span></div>`);
      if (phone) items.push(`<div class="contact-item"><span class="contact-label">Phone</span><span class="contact-value">${this.escapeHtml(phone)}</span></div>`);
      if (country) items.push(`<div class="contact-item"><span class="contact-label">Location</span><span class="contact-value">${this.escapeHtml(country)}</span></div>`);
      if (linkedin) items.push(`<div class="contact-item"><span class="contact-label">LinkedIn</span><span class="contact-value linkedin">${this.escapeHtml(linkedin)}</span></div>`);

      if (!items.length) return '';
      return `
        <section class="section sidebar-section" data-section="contact">
          <h2 class="section-title sidebar-title">${this.escapeHtml(t.contact)}</h2>
          <div class="section-rule"></div>
          <div class="contact-list">${items.join('')}</div>
        </section>
      `;
    }

    renderLanguagesSection(t, lang, d) {
      const items = this.safeArr(d.languages).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section sidebar-section" data-section="languages">
          <h2 class="section-title sidebar-title">${this.escapeHtml(t.languages)}</h2>
          <div class="section-rule"></div>
          <div class="language-list">
            ${items.map((item) => {
              const name = this.safeStr(item?.name);
              const levelKey = this.safeStr(item?.level).toLowerCase();
              const level = this.levelMap[lang]?.[levelKey] || this.safeStr(item?.level);
              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                  <div class="language-row">
                    <span class="language-name">${this.escapeHtml(name)}</span>
                    <span class="language-level">${this.escapeHtml(level)}</span>
                  </div>
                  <div class="language-track">
                    <span class="fill ${levelKey || 'basic'}"></span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderSkillsSection(t, d) {
      const merged = [...this.safeArr(d.skillsRaw), ...this.safeArr(d.toolsRaw)]
        .map((s) => this.safeStr(s).trim())
        .filter(Boolean);

      const deduped = Array.from(new Set(merged));
      if (!deduped.length) return '';

      return `
        <section class="section sidebar-section" data-section="skills">
          <h2 class="section-title sidebar-title">${this.escapeHtml(t.skills)}</h2>
          <div class="section-rule"></div>
          <div class="skills-wrap">
            ${deduped.map((skill, idx) => `
              <span class="skill-badge" data-entry-id="skill-${idx}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderHeaderSection(d) {
      const firstName = this.safeStr(d.firstName);
      const lastName = this.safeStr(d.lastName);
      const profession = this.safeStr(d.profession);
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      if (!fullName && !profession) return '';

      return `
        <section class="hero" data-section="header">
          <div class="hero-inner">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
        </section>
      `;
    }

    renderProfileSection(t, d) {
      const summary = this.safeStr(d.summary);
      if (!summary) return '';
      return `
        <section class="section main-section" data-section="profile">
          <h2 class="section-title main-title">${this.escapeHtml(t.profile)}</h2>
          <p class="summary">${this.escapeHtml(summary)}</p>
        </section>
      `;
    }

    renderExperienceSection(t, lang, d) {
      const items = this.safeArr(d.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="experience">
          <h2 class="section-title main-title">${this.escapeHtml(t.experience)}</h2>
          <div class="timeline-list">
            ${items.map((item) => {
              const title = this.safeStr(item?.title);
              const company = this.safeStr(item?.company);
              const location = this.safeStr(item?.location);
              const range = this.formatDateRange(
                this.safeStr(item?.startDate),
                this.safeStr(item?.endDate),
                !!item?.isCurrent,
                lang
              );
              const bullets = [...this.safeArr(item?.achievements), ...this.safeArr(item?.responsibilities)]
                .map((b) => this.safeStr(b).trim())
                .filter(Boolean);

              return `
                <article class="entry experience-entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${company ? `<span>${this.escapeHtml(company)}</span>` : ''}
                          ${company && location ? `<span class="sep">•</span>` : ''}
                          ${location ? `<span>${this.escapeHtml(location)}</span>` : ''}
                        </div>
                      ` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${bullets.length ? `
                    <ul class="bullet-list">
                      ${bullets.map((b) => `<li>${this.escapeHtml(b)}</li>`).join('')}
                    </ul>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjectsSection(t, lang, d) {
      const items = this.safeArr(d.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          <h2 class="section-title main-title">${this.escapeHtml(t.projects)}</h2>
          <div class="card-list">
            ${items.map((item) => {
              const name = this.safeStr(item?.name);
              const description = this.safeStr(item?.description);
              const url = this.safeStr(item?.url);
              const technologies = this.safeArr(item?.technologies).map((x) => this.safeStr(x).trim()).filter(Boolean);
              const range = this.formatDateRange(
                this.safeStr(item?.startDate),
                this.safeStr(item?.endDate),
                !!item?.isOngoing,
                lang
              );

              return `
                <article class="entry project-entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                      ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="tag-wrap">
                      ${technologies.map((tech) => `<span class="tag">${this.escapeHtml(tech)}</span>`).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievementsSection(t, d) {
      const items = this.safeArr(d.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          <h2 class="section-title main-title">${this.escapeHtml(t.achievements)}</h2>
          <div class="card-list">
            ${items.map((item) => {
              const title = this.safeStr(item?.title);
              const description = this.safeStr(item?.description);
              const year = this.safeStr(item?.year);

              return `
                <article class="entry achievement-entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                    </div>
                    ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducationSection(t, lang, d) {
      const items = this.safeArr(d.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="education">
          <h2 class="section-title main-title">${this.escapeHtml(t.education)}</h2>
          <div class="timeline-list">
            ${items.map((item) => {
              const institution = this.safeStr(item?.institution);
              const degree = this.safeStr(item?.degree);
              const field = this.safeStr(item?.field);
              const gpa = this.safeStr(item?.gpa);
              const range = this.formatDateRange(
                this.safeStr(item?.startDate),
                this.safeStr(item?.endDate),
                item?.isCompleted === false,
                lang
              );
              const degreeLine = [degree, field].filter(Boolean).join(' — ');

              return `
                <article class="entry education-entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${degreeLine ? `<h3 class="entry-title">${this.escapeHtml(degreeLine)}</h3>` : ''}
                      ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${gpa ? `<div class="meta-line">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertificationsSection(t, d) {
      const items = this.safeArr(d.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          <h2 class="section-title main-title">${this.escapeHtml(t.certifications)}</h2>
          <div class="card-list">
            ${items.map((item) => {
              const name = this.safeStr(item?.name);
              const issuer = this.safeStr(item?.issuer);
              const date = this.safeStr(item?.date);

              return `
                <article class="entry cert-entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                      ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
                    </div>
                    ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    render() {
      const d = this.data || {};
      const lang = this.getLanguage();
      const t = this.i18n[lang] || this.i18n.en;

      const header = this.renderHeaderSection(d);
      const contact = this.renderContactSection(t, d);
      const languages = this.renderLanguagesSection(t, lang, d);
      const skills = this.renderSkillsSection(t, d);

      const profile = this.renderProfileSection(t, d);
      const experience = this.renderExperienceSection(t, lang, d);
      const projects = this.renderProjectsSection(t, lang, d);
      const achievements = this.renderAchievementsSection(t, d);
      const education = this.renderEducationSection(t, lang, d);
      const certifications = this.renderCertificationsSection(t, d);

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #251f20;
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
            display: grid;
            grid-template-columns: 34% 66%;
            background: linear-gradient(90deg, #201a1d 0, #201a1d 34%, #f6f1ea 34%, #f6f1ea 100%);
            font-family: Georgia, "Times New Roman", serif;
          }

          .sidebar {
            padding: 24mm 10mm 18mm 16mm;
            color: #f4ede5;
            background: transparent;
          }

          .main {
            padding: 18mm 16mm 18mm 14mm;
            background: transparent;
            border-left: 1.2mm solid #d2b27b;
          }

          .hero {
            margin-bottom: 12mm;
            padding-bottom: 6mm;
            border-bottom: 0.7mm solid #d2b27b;
          }

          .hero-inner {
            padding-right: 2mm;
          }

          .name {
            margin: 0;
            font-size: 14mm;
            line-height: 1;
            font-weight: 400;
            letter-spacing: 0.6mm;
            text-transform: uppercase;
            color: #241d1f;
          }

          .profession {
            margin-top: 3mm;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 3.2mm;
            text-transform: uppercase;
            letter-spacing: 0.6mm;
            color: #8b6f4d;
          }

          .section {
            margin-bottom: 9mm;
          }

          .section-title {
            margin: 0 0 2.2mm 0;
            font-size: 6.2mm;
            line-height: 1.05;
            font-weight: 400;
            letter-spacing: 0.35mm;
            text-transform: uppercase;
          }

          .sidebar-title {
            color: #f6efe7;
          }

          .main-title {
            color: #241d1f;
            position: relative;
            padding-bottom: 1.5mm;
            margin-bottom: 4mm;
          }

          .main-title::after {
            content: '';
            display: block;
            width: 24mm;
            height: 0.6mm;
            margin-top: 1.8mm;
            background: #d2b27b;
          }

          .section-rule {
            width: 100%;
            height: 0.55mm;
            background: #d2b27b;
            margin-bottom: 4mm;
            opacity: 0.95;
          }

          .contact-list,
          .language-list {
            display: flex;
            flex-direction: column;
            gap: 3.2mm;
          }

          .contact-item {
            display: flex;
            flex-direction: column;
            gap: 0.7mm;
          }

          .contact-label {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.5mm;
            letter-spacing: 0.35mm;
            text-transform: uppercase;
            color: #d8bf93;
          }

          .contact-value {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 3.05mm;
            line-height: 1.45;
            color: #f2ebe2;
            word-break: break-word;
          }

          .linkedin {
            font-size: 2.95mm;
          }

          .language-item {
            display: flex;
            flex-direction: column;
            gap: 1.2mm;
          }

          .language-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 2mm;
          }

          .language-name {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 3.1mm;
            color: #f4ede5;
          }

          .language-level {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.6mm;
            color: #d8bf93;
            white-space: nowrap;
          }

          .language-track {
            width: 100%;
            height: 1.3mm;
            background: rgba(244, 237, 229, 0.18);
            border-radius: 999px;
            overflow: hidden;
          }

          .language-track .fill {
            display: block;
            height: 100%;
            background: #d2b27b;
            border-radius: 999px;
          }

          .language-track .fill.basic { width: 28%; }
          .language-track .fill.intermediate { width: 55%; }
          .language-track .fill.advanced { width: 80%; }
          .language-track .fill.native { width: 100%; }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            padding: 1.3mm 2.4mm;
            border: 0.35mm solid #b99866;
            border-radius: 999px;
            color: #f7efe6;
            background: rgba(210, 178, 123, 0.08);
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.75mm;
            line-height: 1.2;
          }

          .summary,
          .entry-text,
          .meta-line,
          .entry-subtitle,
          .entry-link,
          .bullet-list li {
            font-family: Arial, Helvetica, sans-serif;
          }

          .summary {
            margin: 0;
            font-size: 3.2mm;
            line-height: 1.65;
            color: #3a3132;
          }

          .timeline-list,
          .card-list {
            display: flex;
            flex-direction: column;
            gap: 5mm;
          }

          .entry {
            position: relative;
          }

          .experience-entry,
          .education-entry {
            padding-left: 5mm;
            border-left: 0.45mm solid #d9c4a3;
          }

          .experience-entry::before,
          .education-entry::before {
            content: '';
            position: absolute;
            left: -1.35mm;
            top: 1.4mm;
            width: 2.2mm;
            height: 2.2mm;
            border-radius: 50%;
            background: #b89056;
          }

          .project-entry,
          .achievement-entry,
          .cert-entry {
            padding: 3.2mm 3.4mm;
            border: 0.35mm solid #e2d4bf;
            background: rgba(255, 255, 255, 0.45);
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4mm;
            margin-bottom: 1.6mm;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-size: 4.1mm;
            line-height: 1.25;
            font-weight: 700;
            color: #241d1f;
          }

          .entry-subtitle {
            margin-top: 0.7mm;
            font-size: 3mm;
            line-height: 1.45;
            color: #6a5750;
          }

          .entry-link {
            margin-top: 0.7mm;
            font-size: 2.8mm;
            color: #8b6f4d;
            word-break: break-word;
          }

          .entry-date {
            min-width: 26mm;
            text-align: right;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.8mm;
            line-height: 1.3;
            color: #8b6f4d;
            white-space: nowrap;
          }

          .entry-text {
            margin: 0;
            font-size: 3mm;
            line-height: 1.6;
            color: #403738;
          }

          .meta-line {
            margin-top: 1.2mm;
            font-size: 2.9mm;
            color: #5b4d47;
          }

          .bullet-list {
            margin: 2mm 0 0 0;
            padding-left: 4.4mm;
          }

          .bullet-list li {
            margin: 0 0 1.4mm 0;
            font-size: 2.95mm;
            line-height: 1.55;
            color: #403738;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .tag-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2.2mm;
          }

          .tag {
            display: inline-block;
            padding: 1mm 2mm;
            border-radius: 999px;
            background: #ede2d3;
            color: #6c553e;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.55mm;
            line-height: 1.2;
            white-space: nowrap;
          }

          .sep {
            margin: 0 1.2mm;
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
            ${contact}
            ${languages}
            ${skills}
          </div>

          <div class="main">
            ${header}
            ${profile}
            ${experience}
            ${projects}
            ${achievements}
            ${education}
            ${certifications}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-pearl-v2')) {
    customElements.define('gqr-resume-pearl-v2', GQRResumePearlV2);
  }
})();