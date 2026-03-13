(function() {
  'use strict';

  class GQRResumeDuneV2 extends HTMLElement {
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

    formatShortDate(value, lang) {
      const raw = this.safeStr(value).trim();
      if (!raw) return '';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const ym = raw.match(/^(\d{4})-(\d{2})$/);
      if (ym) {
        const year = ym[1];
        const monthIndex = parseInt(ym[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return months[monthIndex] + ' ' + year;
        }
      }

      const ymd = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (ymd) {
        const year = ymd[1];
        const monthIndex = parseInt(ymd[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return months[monthIndex] + ' ' + year;
        }
      }

      const y = raw.match(/^(\d{4})$/);
      if (y) return y[1];

      return raw;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage();
      const dict = this.i18n[lang] || this.i18n.en;
      const start = this.formatShortDate(startDate, lang);
      const end = isCurrentLike ? dict.present : this.formatShortDate(endDate, lang);

      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderContactItem(label, value, href, icon) {
      const v = this.safeStr(value).trim();
      if (!v) return '';
      return `
        <div class="contact-item">
          <div class="contact-icon">${icon}</div>
          <div class="contact-body">
            <div class="contact-label">${this.escapeHtml(label)}</div>
            ${href
              ? `<a class="contact-value" href="${this.escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${this.escapeHtml(v)}</a>`
              : `<div class="contact-value">${this.escapeHtml(v)}</div>`
            }
          </div>
        </div>
      `;
    }

    renderSectionTitle(title, dark) {
      return `
        <div class="section-head ${dark ? 'dark' : ''}">
          <span class="section-title">${this.escapeHtml(title)}</span>
          <span class="section-line"></span>
        </div>
      `;
    }

    render() {
      const data = this.data || {};
      const lang = this.getLanguage();
      const dict = this.i18n[lang] || this.i18n.en;
      const levels = this.levelMap[lang] || this.levelMap.en;

      const firstName = this.safeStr(data.firstName).trim();
      const lastName = this.safeStr(data.lastName).trim();
      const profession = this.safeStr(data.profession).trim();
      const summary = this.safeStr(data.summary).trim();
      const email = this.safeStr(data.email).trim();
      const phone = this.safeStr(data.phone).trim();
      const country = this.safeStr(data.country).trim();
      const linkedin = this.safeStr(data.linkedin).trim();

      const experiences = this.safeArr(data.experience);
      const education = this.safeArr(data.education);
      const projects = this.safeArr(data.projects);
      const certifications = this.safeArr(data.certifications);
      const languages = this.safeArr(data.languages);
      const achievements = this.safeArr(data.achievements);

      const mergedSkills = Array.from(
        new Set(
          [...this.safeArr(data.skillsRaw), ...this.safeArr(data.toolsRaw)]
            .map((s) => this.safeStr(s).trim())
            .filter(Boolean)
        )
      );

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      const contactHtml = (email || phone || country || linkedin) ? `
        <section class="side-section" data-section="contact">
          ${this.renderSectionTitle(dict.contact, true)}
          <div class="contact-list">
            ${this.renderContactItem(
              'Email',
              email,
              email ? `mailto:${email}` : '',
              '&#9993;'
            )}
            ${this.renderContactItem(
              lang === 'es' ? 'Teléfono' : 'Phone',
              phone,
              phone ? `tel:${phone.replace(/\s+/g, '')}` : '',
              '&#9742;'
            )}
            ${this.renderContactItem(
              lang === 'es' ? 'Ubicación' : 'Location',
              country,
              '',
              '&#9673;'
            )}
            ${this.renderContactItem(
              'LinkedIn',
              linkedin,
              linkedin
                ? (/^https?:\/\//i.test(linkedin) ? linkedin : `https://${linkedin.replace(/^@/, '')}`)
                : '',
              '&#10138;'
            )}
          </div>
        </section>
      ` : '';

      const languagesHtml = languages.length ? `
        <section class="side-section" data-section="languages">
          ${this.renderSectionTitle(dict.languages, true)}
          <div class="language-list">
            ${languages.map((item) => {
              const id = this.safeStr(item && item.id).trim();
              const name = this.safeStr(item && item.name).trim();
              const levelKey = this.safeStr(item && item.level).trim().toLowerCase();
              const level = levels[levelKey] || this.safeStr(item && item.level).trim();
              if (!name && !level) return '';
              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                  <div class="language-row">
                    <span class="language-name">${this.escapeHtml(name)}</span>
                    <span class="language-level">${this.escapeHtml(level)}</span>
                  </div>
                  <div class="language-bar">
                    <span class="fill level-${this.escapeHtml(levelKey || 'basic')}"></span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const skillsHtml = mergedSkills.length ? `
        <section class="side-section" data-section="skills">
          ${this.renderSectionTitle(dict.skills, true)}
          <div class="skills-wrap">
            ${mergedSkills.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      ` : '';

      const headerHtml = (fullName || profession) ? `
        <section class="main-section header-section" data-section="header">
          <div class="header-block">
            <div class="name">${this.escapeHtml(fullName)}</div>
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
        </section>
      ` : '';

      const profileHtml = summary ? `
        <section class="main-section" data-section="profile">
          ${this.renderSectionTitle(dict.profile, false)}
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      ` : '';

      const experienceHtml = experiences.length ? `
        <section class="main-section" data-section="experience">
          ${this.renderSectionTitle(dict.experience, false)}
          <div class="timeline">
            ${experiences.map((item) => {
              const id = this.safeStr(item && item.id).trim();
              const title = this.safeStr(item && item.title).trim();
              const company = this.safeStr(item && item.company).trim();
              const location = this.safeStr(item && item.location).trim();
              const range = this.formatDateRange(
                this.safeStr(item && item.startDate),
                this.safeStr(item && item.endDate),
                !!(item && item.isCurrent)
              );
              const bullets = [...this.safeArr(item && item.achievements), ...this.safeArr(item && item.responsibilities)]
                .map((b) => this.safeStr(b).trim())
                .filter(Boolean);

              if (!title && !company && !location && !range && !bullets.length) return '';

              return `
                <article class="timeline-item" data-entry-id="${this.escapeHtml(id)}">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <div class="item-head">
                      <div>
                        ${title ? `<div class="item-title">${this.escapeHtml(title)}</div>` : ''}
                        ${(company || location) ? `
                          <div class="item-subtitle">
                            ${this.escapeHtml(company)}
                            ${company && location ? ' · ' : ''}
                            ${this.escapeHtml(location)}
                          </div>
                        ` : ''}
                      </div>
                      ${range ? `<div class="item-date">${this.escapeHtml(range)}</div>` : ''}
                    </div>
                    ${bullets.length ? `
                      <ul class="bullets">
                        ${bullets.map((b) => `<li>${this.escapeHtml(b)}</li>`).join('')}
                      </ul>
                    ` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const projectsHtml = projects.length ? `
        <section class="main-section" data-section="projects">
          ${this.renderSectionTitle(dict.projects, false)}
          <div class="stack-list">
            ${projects.map((item) => {
              const id = this.safeStr(item && item.id).trim();
              const name = this.safeStr(item && item.name).trim();
              const description = this.safeStr(item && item.description).trim();
              const technologies = this.safeArr(item && item.technologies)
                .map((t) => this.safeStr(t).trim())
                .filter(Boolean);
              const url = this.safeStr(item && item.url).trim();
              const range = this.formatDateRange(
                this.safeStr(item && item.startDate),
                this.safeStr(item && item.endDate),
                !!(item && item.isOngoing)
              );

              if (!name && !description && !technologies.length && !url && !range) return '';

              return `
                <article class="card-item" data-entry-id="${this.escapeHtml(id)}">
                  <div class="item-head">
                    <div>
                      ${name ? `<div class="item-title">${this.escapeHtml(name)}</div>` : ''}
                      ${description ? `<div class="item-subcopy">${this.escapeHtml(description)}</div>` : ''}
                    </div>
                    ${range ? `<div class="item-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map((tech) => `<span class="mini-tag">${this.escapeHtml(tech)}</span>`).join('')}
                    </div>
                  ` : ''}
                  ${url ? `
                    <div class="link-row">
                      <a href="${this.escapeHtml(/^https?:\/\//i.test(url) ? url : `https://${url}`)}" target="_blank" rel="noopener noreferrer">${this.escapeHtml(url)}</a>
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const achievementsHtml = achievements.length ? `
        <section class="main-section" data-section="achievements">
          ${this.renderSectionTitle(dict.achievements, false)}
          <div class="stack-list">
            ${achievements.map((item) => {
              const id = this.safeStr(item && item.id).trim();
              const title = this.safeStr(item && item.title).trim();
              const description = this.safeStr(item && item.description).trim();
              const year = this.safeStr(item && item.year).trim();
              if (!title && !description && !year) return '';
              return `
                <article class="card-item compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="item-head">
                    ${title ? `<div class="item-title">${this.escapeHtml(title)}</div>` : '<div></div>'}
                    ${year ? `<div class="item-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<div class="item-subcopy">${this.escapeHtml(description)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const educationHtml = education.length ? `
        <section class="main-section" data-section="education">
          ${this.renderSectionTitle(dict.education, false)}
          <div class="timeline">
            ${education.map((item) => {
              const id = this.safeStr(item && item.id).trim();
              const institution = this.safeStr(item && item.institution).trim();
              const degree = this.safeStr(item && item.degree).trim();
              const field = this.safeStr(item && item.field).trim();
              const gpa = this.safeStr(item && item.gpa).trim();
              const range = this.formatDateRange(
                this.safeStr(item && item.startDate),
                this.safeStr(item && item.endDate),
                item && item.isCompleted === false
              );

              if (!institution && !degree && !field && !gpa && !range) return '';

              return `
                <article class="timeline-item" data-entry-id="${this.escapeHtml(id)}">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <div class="item-head">
                      <div>
                        ${degree ? `<div class="item-title">${this.escapeHtml(degree)}</div>` : ''}
                        ${(institution || field) ? `
                          <div class="item-subtitle">
                            ${this.escapeHtml(institution)}
                            ${institution && field ? ' · ' : ''}
                            ${this.escapeHtml(field)}
                          </div>
                        ` : ''}
                      </div>
                      ${range ? `<div class="item-date">${this.escapeHtml(range)}</div>` : ''}
                    </div>
                    ${gpa ? `<div class="item-subcopy">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const certificationsHtml = certifications.length ? `
        <section class="main-section" data-section="certifications">
          ${this.renderSectionTitle(dict.certifications, false)}
          <div class="stack-list">
            ${certifications.map((item) => {
              const id = this.safeStr(item && item.id).trim();
              const name = this.safeStr(item && item.name).trim();
              const issuer = this.safeStr(item && item.issuer).trim();
              const date = this.safeStr(item && item.date).trim();
              if (!name && !issuer && !date) return '';
              return `
                <article class="card-item compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="item-head">
                    <div>
                      ${name ? `<div class="item-title">${this.escapeHtml(name)}</div>` : ''}
                      ${issuer ? `<div class="item-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
                    </div>
                    ${date ? `<div class="item-date">${this.escapeHtml(this.formatShortDate(date, lang))}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2f2730;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-family: Arial, Helvetica, sans-serif;
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
            grid-template-columns: 33% 67%;
            background: #f7f1ea;
            color: #2f2730;
          }

          .sidebar {
            background: linear-gradient(180deg, #5b4250 0%, #47323d 100%);
            color: #f8f1eb;
            padding: 20mm 8mm 16mm 10mm;
          }

          .main {
            background: #f7f1ea;
            padding: 16mm 12mm 16mm 12mm;
          }

          .side-section,
          .main-section {
            margin: 0 0 11mm 0;
          }

          .header-section {
            margin-bottom: 8mm;
          }

          .header-block {
            background: linear-gradient(90deg, #7b6670 0%, #66515b 70%, #5b4250 100%);
            color: #fff7f2;
            padding: 10mm 11mm 8mm 11mm;
            position: relative;
            overflow: hidden;
            border-radius: 0 0 0 12px;
          }

          .header-block::after {
            content: '';
            position: absolute;
            right: -18mm;
            top: 0;
            width: 40mm;
            height: 100%;
            background: rgba(255,255,255,0.08);
            transform: skewX(-22deg);
          }

          .name {
            font-size: 30px;
            line-height: 1;
            font-weight: 800;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 4px;
          }

          .profession {
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            opacity: 0.95;
          }

          .section-head {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 14px;
          }

          .section-head.dark .section-title {
            color: #fff4ee;
          }

          .section-head.dark .section-line {
            background: rgba(255,255,255,0.28);
          }

          .section-title {
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            white-space: nowrap;
            color: #4f3a45;
          }

          .section-line {
            height: 2px;
            flex: 1;
            background: #5b4250;
            opacity: 0.75;
          }

          .contact-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .contact-item {
            display: grid;
            grid-template-columns: 20px 1fr;
            gap: 8px;
            align-items: start;
          }

          .contact-icon {
            width: 20px;
            text-align: center;
            font-size: 13px;
            line-height: 1.4;
            opacity: 0.95;
          }

          .contact-label {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            opacity: 0.72;
            margin-bottom: 2px;
          }

          .contact-value,
          .contact-value:visited {
            font-size: 11.5px;
            line-height: 1.35;
            color: #fff4ee;
            text-decoration: none;
            word-break: break-word;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .language-item {
            display: block;
          }

          .language-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 8px;
            margin-bottom: 4px;
          }

          .language-name {
            font-size: 12px;
            font-weight: 700;
            color: #fff7f2;
          }

          .language-level {
            font-size: 10px;
            opacity: 0.8;
            text-align: right;
          }

          .language-bar {
            width: 100%;
            height: 5px;
            border-radius: 999px;
            background: rgba(255,255,255,0.16);
            overflow: hidden;
          }

          .language-bar .fill {
            display: block;
            height: 100%;
            border-radius: 999px;
            background: #e8c8ad;
          }

          .language-bar .level-basic { width: 28%; }
          .language-bar .level-intermediate { width: 56%; }
          .language-bar .level-advanced { width: 80%; }
          .language-bar .level-native { width: 100%; }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            padding: 5px 8px;
            border-radius: 999px;
            background: rgba(255,255,255,0.12);
            color: #fff8f4;
            border: 1px solid rgba(255,255,255,0.16);
            font-size: 10.5px;
            line-height: 1.2;
            font-weight: 700;
            letter-spacing: 0.2px;
          }

          .profile-text {
            font-size: 12.5px;
            line-height: 1.65;
            color: #433842;
          }

          .timeline {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding-left: 18px;
          }

          .timeline::before {
            content: '';
            position: absolute;
            left: 5px;
            top: 3px;
            bottom: 3px;
            width: 2px;
            background: #8d7380;
            opacity: 0.7;
          }

          .timeline-item {
            position: relative;
            min-width: 0;
          }

          .timeline-dot {
            position: absolute;
            left: -18px;
            top: 4px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #5b4250;
            border: 2px solid #f7f1ea;
            box-shadow: 0 0 0 1px rgba(91,66,80,0.35);
          }

          .timeline-content,
          .card-item {
            background: rgba(255,255,255,0.42);
            border: 1px solid rgba(91,66,80,0.12);
            border-radius: 10px;
            padding: 10px 11px;
          }

          .card-item.compact {
            padding: 9px 11px;
          }

          .stack-list {
            display: flex;
            flex-direction: column;
            gap: 9px;
          }

          .item-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
          }

          .item-title {
            font-size: 13.2px;
            line-height: 1.3;
            font-weight: 800;
            color: #322732;
          }

          .item-subtitle {
            margin-top: 2px;
            font-size: 11.2px;
            line-height: 1.4;
            color: #6d5964;
            font-weight: 700;
          }

          .item-date {
            flex: 0 0 auto;
            font-size: 10.5px;
            line-height: 1.3;
            color: #6d5964;
            font-weight: 700;
            text-align: right;
            white-space: nowrap;
          }

          .item-subcopy {
            margin-top: 6px;
            font-size: 11.4px;
            line-height: 1.55;
            color: #4a4048;
          }

          .bullets {
            margin: 7px 0 0 0;
            padding-left: 16px;
          }

          .bullets li {
            margin: 0 0 4px 0;
            font-size: 11.3px;
            line-height: 1.5;
            color: #453b44;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 7px;
          }

          .mini-tag {
            display: inline-block;
            padding: 3px 7px;
            border-radius: 999px;
            background: #ead9ca;
            color: #5a4350;
            font-size: 10px;
            font-weight: 700;
            white-space: nowrap;
          }

          .link-row {
            margin-top: 7px;
          }

          .link-row a,
          .link-row a:visited {
            color: #5b4250;
            text-decoration: none;
            font-size: 11px;
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
            ${contactHtml}
            ${languagesHtml}
            ${skillsHtml}
          </div>
          <div class="main">
            ${headerHtml}
            ${profileHtml}
            ${experienceHtml}
            ${projectsHtml}
            ${achievementsHtml}
            ${educationHtml}
            ${certificationsHtml}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-dune-v2')) {
    customElements.define('gqr-resume-dune-v2', GQRResumeDuneV2);
  }
})();