(function() {
  'use strict';

  /**
   * name: gqr-resume-opal-v2
   * description: "Two-column vintage editorial resume with sepia parchment tones, ornamental borders, dark bronze sidebar, and classic serif display typography."
   */

  class GQRResumeOpalV2 extends HTMLElement {
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

    formatDate(dateStr, lang) {
      const value = this.safeStr(dateStr).trim();
      if (!value) return '';
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };
      const parts = value.split('-');
      const year = parts[0];
      const monthIndex = parts[1] ? parseInt(parts[1], 10) - 1 : -1;
      if (year && monthIndex >= 0 && monthIndex < 12) {
        return `${months[lang] || months.en[monthIndex]} ${year}`;
      }
      return year || value;
    }

    formatRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const start = this.formatDate(startDate, lang);
      const end = isCurrentLike ? t.present : this.formatDate(endDate, lang);
      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `
        <div class="section-head">
          <span class="section-line"></span>
          <h3>${this.escapeHtml(title)}</h3>
          <span class="section-line"></span>
        </div>
      `;
    }

    render() {
      const d = this.data || {};
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const levelMap = this.levelMap[lang];

      const firstName = this.safeStr(d.firstName);
      const lastName = this.safeStr(d.lastName);
      const profession = this.safeStr(d.profession);
      const summary = this.safeStr(d.summary);
      const email = this.safeStr(d.email);
      const phone = this.safeStr(d.phone);
      const country = this.safeStr(d.country);
      const linkedin = this.safeStr(d.linkedin);

      const experience = this.safeArr(d.experience);
      const education = this.safeArr(d.education);
      const projects = this.safeArr(d.projects);
      const certifications = this.safeArr(d.certifications);
      const languages = this.safeArr(d.languages);
      const achievements = this.safeArr(d.achievements);

      const mergedSkills = Array.from(
        new Set(
          [...this.safeArr(d.skillsRaw), ...this.safeArr(d.toolsRaw)]
            .map((s) => this.safeStr(s).trim())
            .filter(Boolean)
        )
      );

      const contactItems = [
        email ? `<div class="contact-item"><span class="bullet">✦</span><span>${this.escapeHtml(email)}</span></div>` : '',
        phone ? `<div class="contact-item"><span class="bullet">✦</span><span>${this.escapeHtml(phone)}</span></div>` : '',
        country ? `<div class="contact-item"><span class="bullet">✦</span><span>${this.escapeHtml(country)}</span></div>` : '',
        linkedin ? `<div class="contact-item"><span class="bullet">✦</span><span>${this.escapeHtml(linkedin)}</span></div>` : ''
      ].filter(Boolean).join('');

      const contactSection = contactItems ? `
        <section class="section sidebar-section" data-section="contact">
          ${this.renderSectionTitle(t.contact)}
          <div class="section-body">
            ${contactItems}
          </div>
        </section>
      ` : '';

      const languagesSection = languages.length ? `
        <section class="section sidebar-section" data-section="languages">
          ${this.renderSectionTitle(t.languages)}
          <div class="section-body">
            ${languages.map((item, idx) => {
              const id = this.safeStr(item && item.id) || `lang-${idx}`;
              const name = this.safeStr(item && item.name);
              const levelKey = this.safeStr(item && item.level).toLowerCase();
              const level = levelMap[levelKey] || this.safeStr(item && item.level);
              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                  <div class="language-name">${this.escapeHtml(name)}</div>
                  <div class="language-level">${this.escapeHtml(level)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const skillsSection = mergedSkills.length ? `
        <section class="section sidebar-section" data-section="skills">
          ${this.renderSectionTitle(t.skills)}
          <div class="section-body">
            <div class="skills-wrap">
              ${mergedSkills.map((skill, idx) => `
                <span class="skill-badge" data-entry-id="skill-${idx}">${this.escapeHtml(skill)}</span>
              `).join('')}
            </div>
          </div>
        </section>
      ` : '';

      const headerSection = `
        <section class="hero section" data-section="header">
          <div class="hero-ornament top-left"></div>
          <div class="hero-ornament top-right"></div>
          <div class="name-ribbon">
            <div class="name">${this.escapeHtml(`${firstName} ${lastName}`.trim())}</div>
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
        </section>
      `;

      const profileSection = summary ? `
        <section class="section main-section" data-section="profile">
          ${this.renderSectionTitle(t.profile)}
          <div class="section-body">
            <p class="summary">${this.escapeHtml(summary)}</p>
          </div>
        </section>
      ` : '';

      const experienceSection = experience.length ? `
        <section class="section main-section" data-section="experience">
          ${this.renderSectionTitle(t.experience)}
          <div class="section-body timeline">
            ${experience.map((item, idx) => {
              const id = this.safeStr(item && item.id) || `exp-${idx}`;
              const title = this.safeStr(item && item.title);
              const company = this.safeStr(item && item.company);
              const location = this.safeStr(item && item.location);
              const range = this.formatRange(
                this.safeStr(item && item.startDate),
                this.safeStr(item && item.endDate),
                !!(item && item.isCurrent)
              );
              const bullets = [...this.safeArr(item && item.achievements), ...this.safeArr(item && item.responsibilities)]
                .map((b) => this.safeStr(b).trim())
                .filter(Boolean);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-title-wrap">
                      <div class="entry-title">${this.escapeHtml(title)}</div>
                      <div class="entry-subtitle">
                        ${this.escapeHtml(company)}${location ? ` · ${this.escapeHtml(location)}` : ''}
                      </div>
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${bullets.length ? `
                    <ul class="entry-list">
                      ${bullets.map((b) => `<li>${this.escapeHtml(b)}</li>`).join('')}
                    </ul>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const projectsSection = projects.length ? `
        <section class="section main-section" data-section="projects">
          ${this.renderSectionTitle(t.projects)}
          <div class="section-body">
            ${projects.map((item, idx) => {
              const id = this.safeStr(item && item.id) || `proj-${idx}`;
              const name = this.safeStr(item && item.name);
              const description = this.safeStr(item && item.description);
              const technologies = this.safeArr(item && item.technologies).map((x) => this.safeStr(x).trim()).filter(Boolean);
              const url = this.safeStr(item && item.url);
              const range = this.formatRange(
                this.safeStr(item && item.startDate),
                this.safeStr(item && item.endDate),
                !!(item && item.isOngoing)
              );

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-title-wrap">
                      <div class="entry-title">${this.escapeHtml(name)}</div>
                      ${url ? `<div class="entry-subtitle">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="tag-row">
                      ${technologies.map((tech) => `<span class="mini-tag">${this.escapeHtml(tech)}</span>`).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const achievementsSection = achievements.length ? `
        <section class="section main-section" data-section="achievements">
          ${this.renderSectionTitle(t.achievements)}
          <div class="section-body">
            ${achievements.map((item, idx) => {
              const id = this.safeStr(item && item.id) || `ach-${idx}`;
              const title = this.safeStr(item && item.title);
              const description = this.safeStr(item && item.description);
              const year = this.safeStr(item && item.year);

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-title-wrap">
                      <div class="entry-title">${this.escapeHtml(title)}</div>
                    </div>
                    ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${this.escapeHtml(description)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const educationSection = education.length ? `
        <section class="section main-section" data-section="education">
          ${this.renderSectionTitle(t.education)}
          <div class="section-body">
            ${education.map((item, idx) => {
              const id = this.safeStr(item && item.id) || `edu-${idx}`;
              const institution = this.safeStr(item && item.institution);
              const degree = this.safeStr(item && item.degree);
              const field = this.safeStr(item && item.field);
              const gpa = this.safeStr(item && item.gpa);
              const range = this.formatRange(
                this.safeStr(item && item.startDate),
                this.safeStr(item && item.endDate),
                item && item.isCompleted === false
              );

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-title-wrap">
                      <div class="entry-title">${this.escapeHtml(degree)}${field ? `, ${this.escapeHtml(field)}` : ''}</div>
                      <div class="entry-subtitle">${this.escapeHtml(institution)}</div>
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${gpa ? `<p class="entry-text">GPA: ${this.escapeHtml(gpa)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';

      const certificationsSection = certifications.length ? `
        <section class="section main-section" data-section="certifications">
          ${this.renderSectionTitle(t.certifications)}
          <div class="section-body">
            ${certifications.map((item, idx) => {
              const id = this.safeStr(item && item.id) || `cert-${idx}`;
              const name = this.safeStr(item && item.name);
              const issuer = this.safeStr(item && item.issuer);
              const date = this.safeStr(item && item.date);

              return `
                <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-top">
                    <div class="entry-title-wrap">
                      <div class="entry-title">${this.escapeHtml(name)}</div>
                      ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
                    </div>
                    ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
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
            color: #2b1f17;
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
            background:
              radial-gradient(circle at 10% 10%, rgba(255,255,255,0.18), transparent 22%),
              radial-gradient(circle at 90% 15%, rgba(255,255,255,0.12), transparent 18%),
              linear-gradient(180deg, #efe2c6 0%, #ead9bb 100%);
            display: grid;
            grid-template-columns: 33% 67%;
            position: relative;
            font-family: Georgia, "Times New Roman", serif;
            box-shadow: 0 0 0 1px rgba(76, 46, 27, 0.18);
          }

          .page::before,
          .page::after {
            content: "";
            position: absolute;
            pointer-events: none;
          }

          .page::before {
            inset: 10mm;
            border: 1.2px solid rgba(73, 43, 27, 0.45);
          }

          .page::after {
            inset: 6mm;
            border: 3px double rgba(73, 43, 27, 0.3);
          }

          .sidebar {
            grid-column: 1;
            background:
              linear-gradient(180deg, rgba(75, 48, 31, 0.94), rgba(57, 35, 23, 0.96)),
              #4c301f;
            color: #f4e8d1;
            padding: 22mm 8mm 14mm 14mm;
            position: relative;
            z-index: 1;
            min-width: 0;
          }

          .sidebar::before,
          .sidebar::after {
            content: "✦";
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            color: rgba(244, 232, 209, 0.45);
            font-size: 14px;
            letter-spacing: 4px;
          }

          .sidebar::before { top: 8mm; }
          .sidebar::after { bottom: 8mm; }

          .main {
            grid-column: 2;
            padding: 14mm 14mm 14mm 12mm;
            position: relative;
            z-index: 1;
            min-width: 0;
          }

          .hero {
            margin-bottom: 8mm;
            padding: 5mm 4mm 4mm;
            position: relative;
            text-align: center;
          }

          .name-ribbon {
            border-top: 2px solid #4b2d1c;
            border-bottom: 2px solid #4b2d1c;
            padding: 4mm 3mm 3mm;
            background:
              linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.08));
          }

          .name {
            font-size: 30px;
            line-height: 1.05;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            color: #2e1b11;
            font-weight: 700;
          }

          .profession {
            margin-top: 2mm;
            font-size: 12px;
            letter-spacing: 2.2px;
            text-transform: uppercase;
            color: #6c4b36;
          }

          .hero-ornament {
            position: absolute;
            width: 26px;
            height: 26px;
            border-color: #4b2d1c;
            opacity: 0.75;
          }

          .hero-ornament.top-left {
            top: 0;
            left: 0;
            border-top: 2px solid;
            border-left: 2px solid;
          }

          .hero-ornament.top-right {
            top: 0;
            right: 0;
            border-top: 2px solid;
            border-right: 2px solid;
          }

          .section {
            margin-bottom: 7mm;
          }

          .section:last-child {
            margin-bottom: 0;
          }

          .section-head {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 3mm;
          }

          .section-head h3 {
            margin: 0;
            font-size: 16px;
            line-height: 1.1;
            text-transform: uppercase;
            letter-spacing: 1px;
            white-space: nowrap;
          }

          .sidebar .section-head h3 {
            color: #f4e8d1;
          }

          .main .section-head h3 {
            color: #3c2417;
          }

          .section-line {
            flex: 1;
            height: 1px;
            background: currentColor;
            opacity: 0.45;
          }

          .section-body {
            font-size: 11.5px;
            line-height: 1.5;
          }

          .summary {
            margin: 0;
            text-align: justify;
          }

          .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 7px;
            margin-bottom: 2.2mm;
            word-break: break-word;
          }

          .contact-item:last-child {
            margin-bottom: 0;
          }

          .bullet {
            color: #d8b26c;
            flex: 0 0 auto;
            line-height: 1.2;
          }

          .language-item {
            padding: 2.4mm 0;
            border-bottom: 1px solid rgba(244, 232, 209, 0.18);
          }

          .language-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .language-name {
            font-size: 12px;
            font-weight: 700;
            color: #fff6e7;
          }

          .language-level {
            font-size: 10.5px;
            color: #e3d2b2;
            letter-spacing: 0.3px;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            border: 1px solid rgba(244, 232, 209, 0.45);
            color: #fff3dd;
            background: rgba(255, 255, 255, 0.06);
            padding: 4px 8px;
            font-size: 10px;
            line-height: 1.2;
            border-radius: 999px;
            letter-spacing: 0.3px;
          }

          .entry {
            position: relative;
            padding: 0 0 0 0;
            margin-bottom: 4.2mm;
          }

          .entry:last-child {
            margin-bottom: 0;
          }

          .timeline .entry {
            padding-left: 4mm;
          }

          .timeline .entry::before {
            content: "";
            position: absolute;
            left: 0;
            top: 1.6mm;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #6b4934;
            box-shadow: 0 0 0 2px rgba(107, 73, 52, 0.15);
          }

          .timeline .entry::after {
            content: "";
            position: absolute;
            left: 3.5px;
            top: 4mm;
            bottom: -5mm;
            width: 1px;
            background: rgba(75, 45, 28, 0.22);
          }

          .timeline .entry:last-child::after {
            display: none;
          }

          .entry-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 8px;
          }

          .entry-title-wrap {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            font-size: 13px;
            line-height: 1.3;
            font-weight: 700;
            color: #2f1c12;
          }

          .entry-subtitle {
            font-size: 11px;
            color: #6a4d3a;
            margin-top: 1px;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 10.5px;
            color: #6a4d3a;
            white-space: nowrap;
            border: 1px solid rgba(75, 45, 28, 0.22);
            padding: 2px 6px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.22);
          }

          .entry-list {
            margin: 2mm 0 0 0;
            padding-left: 4.5mm;
          }

          .entry-list li {
            margin: 0 0 1.2mm 0;
          }

          .entry-list li:last-child {
            margin-bottom: 0;
          }

          .entry-text {
            margin: 2mm 0 0 0;
          }

          .compact {
            padding: 2.2mm 0 0;
            border-top: 1px solid rgba(75, 45, 28, 0.16);
          }

          .compact:first-child {
            border-top: none;
            padding-top: 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 2mm;
          }

          .mini-tag {
            display: inline-block;
            font-size: 9.8px;
            line-height: 1.2;
            padding: 3px 7px;
            border-radius: 999px;
            border: 1px solid rgba(75, 45, 28, 0.24);
            background: rgba(255,255,255,0.28);
            color: #4e3324;
            white-space: nowrap;
          }

          @media print {
            :host {
              margin: 0;
            }

            .page {
              width: 210mm;
              min-height: 297mm;
              box-shadow: none;
            }
          }
        </style>

        <div class="page">
          <div class="sidebar">
            ${contactSection}
            ${languagesSection}
            ${skillsSection}
          </div>

          <div class="main">
            ${headerSection}
            ${profileSection}
            ${experienceSection}
            ${projectsSection}
            ${achievementsSection}
            ${educationSection}
            ${certificationsSection}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-opal-v2')) {
    customElements.define('gqr-resume-opal-v2', GQRResumeOpalV2);
  }
})();