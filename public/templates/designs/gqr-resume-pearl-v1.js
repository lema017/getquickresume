(function() {
  'use strict';

  /**
   * name: gqr-resume-pearl-v1
   * description: "Two-column resume with a dark pearl sidebar, elegant serif headings, warm neutral accents, and a clean editorial main column."
   */

  class GQRResumePearlV1 extends HTMLElement {
    static get observedAttributes() {
      return ['language'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._data = {};
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
      return this.getAttribute('language') || this.data?.language || 'en';
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

    getI18n() {
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
    }

    getLevelMap() {
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

    formatShortDate(dateStr, lang) {
      const value = this.safeStr(dateStr).trim();
      if (!value) return '';
      const normalized = /^\d{4}-\d{2}$/.test(value) ? value + '-01' : value;
      const date = new Date(normalized);
      if (Number.isNaN(date.getTime())) {
        return this.escapeHtml(value);
      }
      try {
        return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
          month: 'short',
          year: 'numeric'
        }).format(date);
      } catch (e) {
        return this.escapeHtml(value);
      }
    }

    formatRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const i18n = this.getI18n()[lang];
      const start = this.formatShortDate(startDate, lang);
      const end = isCurrentLike
        ? i18n.present
        : this.formatShortDate(endDate, lang);

      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderContactSection(i18n) {
      const email = this.safeStr(this.data?.email);
      const phone = this.safeStr(this.data?.phone);
      const country = this.safeStr(this.data?.country);
      const linkedin = this.safeStr(this.data?.linkedin);

      const items = [];
      if (email) {
        items.push(`<div class="contact-item"><span class="contact-text">${this.escapeHtml(email)}</span></div>`);
      }
      if (phone) {
        items.push(`<div class="contact-item"><span class="contact-text">${this.escapeHtml(phone)}</span></div>`);
      }
      if (country) {
        items.push(`<div class="contact-item"><span class="contact-text">${this.escapeHtml(country)}</span></div>`);
      }
      if (linkedin) {
        items.push(`<div class="contact-item"><span class="contact-text">${this.escapeHtml(linkedin)}</span></div>`);
      }

      if (!items.length) return '';
      return `
        <section class="section sidebar-section" data-section="contact">
          <h2 class="section-title sidebar-title">${this.escapeHtml(i18n.contact)}</h2>
          <div class="contact-list">
            ${items.join('')}
          </div>
        </section>
      `;
    }

    renderLanguagesSection(i18n, levelMap) {
      const languages = this.safeArr(this.data?.languages).filter(Boolean);
      if (!languages.length) return '';

      return `
        <section class="section sidebar-section" data-section="languages">
          <h2 class="section-title sidebar-title">${this.escapeHtml(i18n.languages)}</h2>
          <div class="language-list">
            ${languages.map((item) => {
              const id = this.safeStr(item?.id);
              const name = this.safeStr(item?.name);
              const levelKey = this.safeStr(item?.level).toLowerCase();
              const level = levelMap[levelKey] || levelKey;
              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                  <div class="language-name">${this.escapeHtml(name)}</div>
                  <div class="language-level">${this.escapeHtml(level)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderSkillsSection(i18n) {
      const merged = [...this.safeArr(this.data?.skillsRaw), ...this.safeArr(this.data?.toolsRaw)]
        .map((s) => this.safeStr(s).trim())
        .filter(Boolean);

      const seen = new Set();
      const deduped = merged.filter((item) => {
        const key = item.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      if (!deduped.length) return '';

      return `
        <section class="section sidebar-section" data-section="skills">
          <h2 class="section-title sidebar-title">${this.escapeHtml(i18n.skills)}</h2>
          <div class="skills-wrap">
            ${deduped.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderHeaderSection() {
      const firstName = this.safeStr(this.data?.firstName);
      const lastName = this.safeStr(this.data?.lastName);
      const profession = this.safeStr(this.data?.profession);
      const fullName = `${firstName} ${lastName}`.trim();

      if (!fullName && !profession) return '';

      return `
        <section class="section header-section" data-section="header">
          ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
          ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          <div class="header-rule"></div>
        </section>
      `;
    }

    renderProfileSection(i18n) {
      const summary = this.safeStr(this.data?.summary);
      if (!summary) return '';

      return `
        <section class="section main-section" data-section="profile">
          <h2 class="section-title main-title">${this.escapeHtml(i18n.profile)}</h2>
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection(i18n) {
      const items = this.safeArr(this.data?.experience).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="experience">
          <h2 class="section-title main-title">${this.escapeHtml(i18n.experience)}</h2>
          <div class="timeline-list">
            ${items.map((item) => {
              const bullets = [
                ...this.safeArr(item?.achievements),
                ...this.safeArr(item?.responsibilities)
              ].map((b) => this.safeStr(b).trim()).filter(Boolean);

              const title = this.safeStr(item?.title);
              const company = this.safeStr(item?.company);
              const location = this.safeStr(item?.location);
              const range = this.formatRange(
                item?.startDate,
                item?.endDate,
                !!item?.isCurrent
              );

              return `
                <article class="entry timeline-entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                  <div class="entry-head">
                    <div>
                      ${title ? `<h3 class="entry-title">${this.escapeHtml(title)}</h3>` : ''}
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${this.escapeHtml(company)}
                          ${company && location ? ' · ' : ''}
                          ${this.escapeHtml(location)}
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

    renderProjectsSection(i18n) {
      const items = this.safeArr(this.data?.projects).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          <h2 class="section-title main-title">${this.escapeHtml(i18n.projects)}</h2>
          <div class="entry-list">
            ${items.map((item) => {
              const name = this.safeStr(item?.name);
              const description = this.safeStr(item?.description);
              const technologies = this.safeArr(item?.technologies).map((t) => this.safeStr(t).trim()).filter(Boolean);
              const url = this.safeStr(item?.url);
              const range = this.formatRange(
                item?.startDate,
                item?.endDate,
                !!item?.isOngoing
              );

              return `
                <article class="entry project-entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                  <div class="entry-head">
                    <div>
                      ${name ? `<h3 class="entry-title">${this.escapeHtml(name)}</h3>` : ''}
                      ${url ? `<div class="entry-subtitle">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
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

    renderAchievementsSection(i18n) {
      const items = this.safeArr(this.data?.achievements).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          <h2 class="section-title main-title">${this.escapeHtml(i18n.achievements)}</h2>
          <div class="entry-list">
            ${items.map((item) => `
              <article class="entry compact-entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                <div class="entry-head">
                  <div>
                    ${this.safeStr(item?.title) ? `<h3 class="entry-title">${this.escapeHtml(this.safeStr(item?.title))}</h3>` : ''}
                  </div>
                  ${this.safeStr(item?.year) ? `<div class="entry-date">${this.escapeHtml(this.safeStr(item?.year))}</div>` : ''}
                </div>
                ${this.safeStr(item?.description) ? `<div class="entry-text">${this.escapeHtml(this.safeStr(item?.description))}</div>` : ''}
              </article>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderEducationSection(i18n) {
      const items = this.safeArr(this.data?.education).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="education">
          <h2 class="section-title main-title">${this.escapeHtml(i18n.education)}</h2>
          <div class="entry-list">
            ${items.map((item) => {
              const degree = this.safeStr(item?.degree);
              const field = this.safeStr(item?.field);
              const institution = this.safeStr(item?.institution);
              const gpa = this.safeStr(item?.gpa);
              const range = this.formatRange(
                item?.startDate,
                item?.endDate,
                item?.isCompleted === false
              );

              const degreeLine = [degree, field].filter(Boolean).join(degree && field ? ' — ' : '');

              return `
                <article class="entry compact-entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                  <div class="entry-head">
                    <div>
                      ${degreeLine ? `<h3 class="entry-title">${this.escapeHtml(degreeLine)}</h3>` : ''}
                      ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${gpa ? `<div class="entry-text">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertificationsSection(i18n) {
      const items = this.safeArr(this.data?.certifications).filter(Boolean);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          <h2 class="section-title main-title">${this.escapeHtml(i18n.certifications)}</h2>
          <div class="entry-list">
            ${items.map((item) => `
              <article class="entry compact-entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                <div class="entry-head">
                  <div>
                    ${this.safeStr(item?.name) ? `<h3 class="entry-title">${this.escapeHtml(this.safeStr(item?.name))}</h3>` : ''}
                    ${this.safeStr(item?.issuer) ? `<div class="entry-subtitle">${this.escapeHtml(this.safeStr(item?.issuer))}</div>` : ''}
                  </div>
                  ${this.safeStr(item?.date) ? `<div class="entry-date">${this.escapeHtml(this.safeStr(item?.date))}</div>` : ''}
                </div>
              </article>
            `).join('')}
          </div>
        </section>
      `;
    }

    render() {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const i18n = this.getI18n()[lang];
      const levelMap = this.getLevelMap()[lang];

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #f5efe7;
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
            background: #f7f2eb;
            display: grid;
            grid-template-columns: 35% 65%;
            font-family: Georgia, "Times New Roman", serif;
          }

          .sidebar {
            background:
              linear-gradient(180deg, #231c22 0%, #1c171d 100%);
            color: #f7efe8;
            padding: 24mm 9mm 18mm 14mm;
            min-height: 297mm;
          }

          .main {
            background: #f7f2eb;
            color: #2a2227;
            padding: 22mm 15mm 18mm 12mm;
            border-left: 1.2mm solid #d9cdc0;
            min-height: 297mm;
          }

          .section {
            margin: 0 0 9mm 0;
          }

          .section-title {
            margin: 0 0 4mm 0;
            font-weight: 400;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            line-height: 1.05;
          }

          .sidebar-title {
            color: #f3e8de;
            font-size: 8.5mm;
          }

          .main-title {
            color: #2d2328;
            font-size: 8.5mm;
            position: relative;
          }

          .header-section {
            margin-bottom: 9mm;
          }

          .name {
            margin: 0;
            font-size: 12mm;
            line-height: 0.95;
            font-weight: 400;
            letter-spacing: 0.03em;
            text-transform: uppercase;
            color: #2a2227;
          }

          .profession {
            margin-top: 2.5mm;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 3.4mm;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #7d6d60;
          }

          .header-rule {
            width: 100%;
            height: 0.7mm;
            background: #b8a391;
            margin-top: 5mm;
          }

          .profile-text,
          .entry-text,
          .contact-text,
          .entry-subtitle,
          .language-level {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 3.2mm;
            line-height: 1.45;
          }

          .profile-text,
          .entry-text,
          .entry-subtitle {
            color: #4b3f45;
          }

          .contact-list {
            display: flex;
            flex-direction: column;
            gap: 2.2mm;
          }

          .contact-item {
            word-break: break-word;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 3mm;
          }

          .language-item {
            padding-left: 0;
          }

          .language-name {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 3.35mm;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 0.5mm;
          }

          .language-level {
            color: #d8c9bb;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.9mm;
            line-height: 1.2;
            color: #f7efe8;
            border: 1px solid #8f7b6d;
            background: rgba(255, 255, 255, 0.04);
            padding: 1.4mm 2.4mm;
            border-radius: 999px;
          }

          .timeline-list,
          .entry-list {
            display: flex;
            flex-direction: column;
            gap: 5mm;
          }

          .entry {
            break-inside: avoid;
          }

          .timeline-entry {
            position: relative;
            padding-left: 4.5mm;
          }

          .timeline-entry::before {
            content: "";
            position: absolute;
            left: 0;
            top: 1.8mm;
            width: 2mm;
            height: 2mm;
            border-radius: 50%;
            background: #8d6f5e;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4mm;
            margin-bottom: 1.4mm;
          }

          .entry-title {
            margin: 0;
            font-size: 4.15mm;
            line-height: 1.2;
            font-weight: 700;
            color: #241d22;
          }

          .entry-date {
            flex: 0 0 auto;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.9mm;
            line-height: 1.3;
            color: #8a776a;
            text-align: right;
            white-space: nowrap;
          }

          .bullet-list {
            margin: 1.2mm 0 0 0;
            padding-left: 4.2mm;
            color: #4b3f45;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 3.05mm;
            line-height: 1.45;
          }

          .bullet-list li {
            margin: 0 0 1mm 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2mm;
          }

          .tag {
            display: inline-block;
            white-space: nowrap;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.7mm;
            color: #5a4a42;
            background: #eadfd3;
            border: 1px solid #d7c5b7;
            padding: 1.1mm 2.1mm;
            border-radius: 999px;
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
            ${this.renderContactSection(i18n)}
            ${this.renderLanguagesSection(i18n, levelMap)}
            ${this.renderSkillsSection(i18n)}
          </div>

          <div class="main">
            ${this.renderHeaderSection()}
            ${this.renderProfileSection(i18n)}
            ${this.renderExperienceSection(i18n)}
            ${this.renderProjectsSection(i18n)}
            ${this.renderAchievementsSection(i18n)}
            ${this.renderEducationSection(i18n)}
            ${this.renderCertificationsSection(i18n)}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-pearl-v1')) {
    customElements.define('gqr-resume-pearl-v1', GQRResumePearlV1);
  }
})();