(function() {
  'use strict';

  class GQRResumeShadowV2 extends HTMLElement {
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
          profile: 'Sobre mí',
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
      const lang = this.getAttribute('language') || this.data?.language || 'en';
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

    formatDate(value, lang) {
      const raw = this.safeStr(value).trim();
      if (!raw) return '';
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };
      if (/^\d{4}$/.test(raw)) return raw;
      const m = raw.match(/^(\d{4})-(\d{2})/);
      if (m) {
        const year = m[1];
        const monthIndex = parseInt(m[2], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          return months[lang][monthIndex] + ' ' + year;
        }
      }
      return raw;
    }

    formatRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage();
      const t = this.i18n[lang] || this.i18n.en;
      const start = this.formatDate(startDate, lang);
      const end = isCurrentLike ? t.present : this.formatDate(endDate, lang);
      if (start && end) return start + ' — ' + end;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `<div class="section-title">${this.escapeHtml(title)}</div>`;
    }

    renderContactSection(t) {
      const email = this.safeStr(this.data?.email).trim();
      const phone = this.safeStr(this.data?.phone).trim();
      const country = this.safeStr(this.data?.country).trim();
      const linkedin = this.safeStr(this.data?.linkedin).trim();

      const items = [];
      if (email) {
        items.push(`
          <div class="contact-item">
            <span class="icon">✉</span>
            <span class="contact-text">${this.escapeHtml(email)}</span>
          </div>
        `);
      }
      if (phone) {
        items.push(`
          <div class="contact-item">
            <span class="icon">☎</span>
            <span class="contact-text">${this.escapeHtml(phone)}</span>
          </div>
        `);
      }
      if (country) {
        items.push(`
          <div class="contact-item">
            <span class="icon">⌂</span>
            <span class="contact-text">${this.escapeHtml(country)}</span>
          </div>
        `);
      }
      if (linkedin) {
        items.push(`
          <div class="contact-item">
            <span class="icon">↗</span>
            <span class="contact-text">${this.escapeHtml(linkedin)}</span>
          </div>
        `);
      }

      if (!items.length) return '';
      return `
        <section class="sidebar-section card-light" data-section="contact">
          ${this.renderSectionTitle(t.contact)}
          <div class="contact-list">${items.join('')}</div>
        </section>
      `;
    }

    renderLanguagesSection(t, lang) {
      const languages = this.safeArr(this.data?.languages).filter(item => item && (this.safeStr(item.name).trim() || this.safeStr(item.level).trim()));
      if (!languages.length) return '';

      return `
        <section class="sidebar-section card-light" data-section="languages">
          ${this.renderSectionTitle(t.languages)}
          <div class="simple-list">
            ${languages.map(item => {
              const name = this.safeStr(item.name).trim();
              const levelKey = this.safeStr(item.level).trim().toLowerCase();
              const level = this.levelMap[lang]?.[levelKey] || this.safeStr(item.level).trim();
              return `
                <div class="list-row" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <span class="bullet"></span>
                  <div class="list-row-content">
                    <div class="list-primary">${this.escapeHtml(name)}</div>
                    ${level ? `<div class="list-secondary">${this.escapeHtml(level)}</div>` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderSkillsSection(t) {
      const merged = [...this.safeArr(this.data?.skillsRaw), ...this.safeArr(this.data?.toolsRaw)]
        .map(v => this.safeStr(v).trim())
        .filter(Boolean);

      const deduped = [];
      const seen = new Set();
      merged.forEach(skill => {
        const key = skill.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          deduped.push(skill);
        }
      });

      if (!deduped.length) return '';

      return `
        <section class="sidebar-section card-light" data-section="skills">
          ${this.renderSectionTitle(t.skills)}
          <div class="skills-wrap">
            ${deduped.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderHeaderSection() {
      const firstName = this.safeStr(this.data?.firstName).trim();
      const lastName = this.safeStr(this.data?.lastName).trim();
      const profession = this.safeStr(this.data?.profession).trim();
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      if (!fullName && !profession) return '';

      return `
        <section class="hero" data-section="header">
          <div class="hero-shape hero-shape-a"></div>
          <div class="hero-shape hero-shape-b"></div>
          <div class="hero-inner">
            <div class="name-block">
              ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
              ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
            </div>
          </div>
        </section>
      `;
    }

    renderProfileSection(t) {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';
      return `
        <section class="main-section" data-section="profile">
          ${this.renderSectionTitle(t.profile)}
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperienceSection(t) {
      const experience = this.safeArr(this.data?.experience).filter(Boolean);
      if (!experience.length) return '';

      return `
        <section class="main-section" data-section="experience">
          ${this.renderSectionTitle(t.experience)}
          <div class="timeline">
            ${experience.map(item => {
              const title = this.safeStr(item.title).trim();
              const company = this.safeStr(item.company).trim();
              const location = this.safeStr(item.location).trim();
              const range = this.formatRange(item.startDate, item.endDate, !!item.isCurrent);
              const bullets = [
                ...this.safeArr(item.achievements),
                ...this.safeArr(item.responsibilities)
              ].map(v => this.safeStr(v).trim()).filter(Boolean);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="entry-marker"></div>
                  <div class="entry-body">
                    <div class="entry-head">
                      <div>
                        ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                        ${(company || location) ? `<div class="entry-subtitle">${this.escapeHtml([company, location].filter(Boolean).join(' · '))}</div>` : ''}
                      </div>
                      ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                    </div>
                    ${bullets.length ? `
                      <ul class="entry-list">
                        ${bullets.map(b => `<li>${this.escapeHtml(b)}</li>`).join('')}
                      </ul>
                    ` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjectsSection(t) {
      const projects = this.safeArr(this.data?.projects).filter(Boolean);
      if (!projects.length) return '';

      return `
        <section class="main-section" data-section="projects">
          ${this.renderSectionTitle(t.projects)}
          <div class="stack-list">
            ${projects.map(item => {
              const name = this.safeStr(item.name).trim();
              const description = this.safeStr(item.description).trim();
              const url = this.safeStr(item.url).trim();
              const technologies = this.safeArr(item.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const range = this.formatRange(item.startDate, item.endDate, !!item.isOngoing);

              return `
                <article class="card-entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="card-entry-head">
                    <div class="card-entry-title-wrap">
                      ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                      ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  ${technologies.length ? `
                    <div class="mini-tags">
                      ${technologies.map(tech => `<span class="mini-tag">${this.escapeHtml(tech)}</span>`).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievementsSection(t) {
      const achievements = this.safeArr(this.data?.achievements).filter(Boolean);
      if (!achievements.length) return '';

      return `
        <section class="main-section" data-section="achievements">
          ${this.renderSectionTitle(t.achievements)}
          <div class="stack-list">
            ${achievements.map(item => {
              const title = this.safeStr(item.title).trim();
              const description = this.safeStr(item.description).trim();
              const year = this.safeStr(item.year).trim();

              return `
                <article class="card-entry compact" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="card-entry-head">
                    ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : '<div></div>'}
                    ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducationSection(t) {
      const education = this.safeArr(this.data?.education).filter(Boolean);
      if (!education.length) return '';

      return `
        <section class="main-section" data-section="education">
          ${this.renderSectionTitle(t.education)}
          <div class="timeline">
            ${education.map(item => {
              const degree = this.safeStr(item.degree).trim();
              const field = this.safeStr(item.field).trim();
              const institution = this.safeStr(item.institution).trim();
              const gpa = this.safeStr(item.gpa).trim();
              const degreeLine = [degree, field].filter(Boolean).join(' — ');
              const range = this.formatRange(item.startDate, item.endDate, item.isCompleted === false);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="entry-marker"></div>
                  <div class="entry-body">
                    <div class="entry-head">
                      <div>
                        ${degreeLine ? `<div class="entry-title">${this.escapeHtml(degreeLine)}</div>` : ''}
                        ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                      </div>
                      ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                    </div>
                    ${gpa ? `<div class="entry-text">${this.escapeHtml('GPA: ' + gpa)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertificationsSection(t) {
      const certifications = this.safeArr(this.data?.certifications).filter(Boolean);
      if (!certifications.length) return '';

      return `
        <section class="main-section" data-section="certifications">
          ${this.renderSectionTitle(t.certifications)}
          <div class="stack-list">
            ${certifications.map(item => {
              const name = this.safeStr(item.name).trim();
              const issuer = this.safeStr(item.issuer).trim();
              const date = this.safeStr(item.date).trim();

              return `
                <article class="card-entry compact" data-entry-id="${this.escapeHtml(this.safeStr(item.id))}">
                  <div class="card-entry-head">
                    ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : '<div></div>'}
                    ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
                  </div>
                  ${issuer ? `<div class="entry-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    render() {
      if (!this.shadowRoot) return;

      const lang = this.getLanguage();
      const t = this.i18n[lang] || this.i18n.en;

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #213042;
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
              radial-gradient(circle at 95% 18%, rgba(163, 177, 196, 0.22) 0, rgba(163, 177, 196, 0.22) 2px, transparent 2px) 0 0 / 22px 22px,
              radial-gradient(circle at 8% 84%, rgba(163, 177, 196, 0.18) 0, rgba(163, 177, 196, 0.18) 2px, transparent 2px) 0 0 / 24px 24px,
              linear-gradient(180deg, #edf1f6 0%, #eef2f7 100%);
            font-family: Inter, "Segoe UI", Roboto, Arial, sans-serif;
            position: relative;
            padding: 14mm 10mm 12mm;
          }

          .page::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 42mm;
            height: 42mm;
            background: #304158;
            clip-path: polygon(0 0, 100% 0, 0 100%);
            border-top-left-radius: 4mm;
            opacity: 0.98;
          }

          .page::after {
            content: "";
            position: absolute;
            right: 10mm;
            bottom: 16mm;
            width: 66mm;
            height: 34mm;
            background: #304158;
            border-top-left-radius: 10mm;
            border-bottom-right-radius: 10mm;
            opacity: 0.98;
            z-index: 0;
          }

          .hero {
            position: relative;
            z-index: 2;
            margin-top: 10mm;
            margin-bottom: 8mm;
            background: #304158;
            color: #ffffff;
            min-height: 34mm;
            border-radius: 0 6mm 6mm 6mm;
            padding: 8mm 10mm;
            overflow: hidden;
          }

          .hero-inner {
            position: relative;
            z-index: 2;
          }

          .hero-shape {
            position: absolute;
            border: 1px solid rgba(255,255,255,0.28);
            border-radius: 2mm;
          }

          .hero-shape-a {
            width: 5mm;
            height: 5mm;
            right: 24mm;
            bottom: 6mm;
          }

          .hero-shape-b {
            width: 7mm;
            height: 7mm;
            right: 14mm;
            bottom: 11mm;
          }

          .name {
            margin: 0;
            font-size: 10.5mm;
            line-height: 1;
            font-weight: 800;
            letter-spacing: 0.2px;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 3mm;
            font-size: 4.8mm;
            line-height: 1.2;
            color: rgba(255,255,255,0.92);
            font-weight: 500;
          }

          .columns {
            position: relative;
            z-index: 2;
            display: grid;
            grid-template-columns: 34% 66%;
            gap: 8mm;
            align-items: start;
          }

          .sidebar {
            display: flex;
            flex-direction: column;
            gap: 6mm;
          }

          .main {
            display: flex;
            flex-direction: column;
            gap: 6mm;
          }

          .sidebar-section,
          .main-section {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .card-light {
            background: #cfd7e3;
            border-radius: 0 6mm 6mm 6mm;
            padding: 5mm 4.5mm;
            position: relative;
          }

          .card-light::after {
            content: "";
            position: absolute;
            right: 4mm;
            bottom: 4mm;
            width: 12mm;
            height: 12mm;
            background:
              radial-gradient(circle at 2mm 2mm, rgba(48, 65, 88, 0.18) 0, rgba(48, 65, 88, 0.18) 1.2mm, transparent 1.2mm) 0 0 / 6mm 6mm;
            opacity: 0.6;
          }

          .main-section {
            background: rgba(255,255,255,0.92);
            border-radius: 0 6mm 6mm 6mm;
            padding: 5mm 5.5mm;
            box-shadow: 0 1px 0 rgba(48, 65, 88, 0.04);
          }

          .section-title {
            color: #243347;
            font-size: 4.8mm;
            font-weight: 800;
            letter-spacing: 0.2px;
            text-transform: uppercase;
            margin-bottom: 3mm;
          }

          .profile-text,
          .entry-text,
          .contact-text,
          .list-secondary {
            font-size: 3.35mm;
            line-height: 1.45;
            color: #405266;
          }

          .contact-list {
            display: flex;
            flex-direction: column;
            gap: 2.2mm;
          }

          .contact-item {
            display: grid;
            grid-template-columns: 4mm 1fr;
            gap: 2mm;
            align-items: start;
          }

          .icon {
            color: #7e2030;
            font-size: 3.2mm;
            line-height: 1.2;
            font-weight: 700;
          }

          .simple-list {
            display: flex;
            flex-direction: column;
            gap: 3mm;
          }

          .list-row {
            display: grid;
            grid-template-columns: 3mm 1fr;
            gap: 2mm;
            align-items: start;
          }

          .bullet {
            width: 0;
            height: 0;
            margin-top: 1.5mm;
            border-left: 2mm solid #7e2030;
            border-top: 1.2mm solid transparent;
            border-bottom: 1.2mm solid transparent;
          }

          .list-primary,
          .entry-title {
            font-size: 3.7mm;
            line-height: 1.3;
            font-weight: 750;
            color: #243347;
          }

          .entry-subtitle {
            font-size: 3.3mm;
            line-height: 1.35;
            color: #617387;
            margin-top: 0.6mm;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge,
          .mini-tag {
            display: inline-block;
            white-space: nowrap;
            font-size: 3.05mm;
            line-height: 1.2;
            padding: 1.6mm 2.6mm;
            border-radius: 999px;
            background: rgba(255,255,255,0.72);
            color: #243347;
            border: 1px solid rgba(48, 65, 88, 0.12);
          }

          .timeline {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 4.2mm;
          }

          .timeline::before {
            content: "";
            position: absolute;
            left: 2.2mm;
            top: 1mm;
            bottom: 1mm;
            width: 0.6mm;
            background: linear-gradient(180deg, #304158, #c7d0dc);
            border-radius: 99px;
          }

          .entry {
            position: relative;
            display: grid;
            grid-template-columns: 5mm 1fr;
            gap: 2.5mm;
          }

          .entry-marker {
            width: 4.2mm;
            height: 4.2mm;
            border-radius: 50%;
            background: #7e2030;
            border: 1.3mm solid #f7f9fb;
            box-shadow: 0 0 0 1px rgba(126, 32, 48, 0.15);
            margin-top: 0.4mm;
            position: relative;
            z-index: 1;
          }

          .entry-body {
            min-width: 0;
          }

          .entry-head,
          .card-entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4mm;
          }

          .entry-date {
            flex: 0 0 auto;
            color: #7e2030;
            font-size: 3.05mm;
            font-weight: 700;
            white-space: nowrap;
            margin-top: 0.2mm;
          }

          .entry-list {
            margin: 2mm 0 0 0;
            padding-left: 4.4mm;
          }

          .entry-list li {
            margin: 0 0 1.2mm 0;
            color: #405266;
            font-size: 3.25mm;
            line-height: 1.45;
          }

          .stack-list {
            display: flex;
            flex-direction: column;
            gap: 3.2mm;
          }

          .card-entry {
            background: #f7f9fc;
            border: 1px solid rgba(48, 65, 88, 0.08);
            border-radius: 4mm;
            padding: 3.6mm 4mm;
          }

          .card-entry.compact {
            padding-top: 3.2mm;
            padding-bottom: 3.2mm;
          }

          .card-entry-title-wrap {
            min-width: 0;
          }

          .entry-link {
            margin-top: 0.8mm;
            font-size: 3mm;
            color: #617387;
            word-break: break-word;
          }

          .mini-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2.2mm;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${this.renderHeaderSection()}
          <div class="columns">
            <div class="sidebar">
              ${this.renderContactSection(t)}
              ${this.renderLanguagesSection(t, lang)}
              ${this.renderSkillsSection(t)}
            </div>
            <div class="main">
              ${this.renderProfileSection(t)}
              ${this.renderExperienceSection(t)}
              ${this.renderProjectsSection(t)}
              ${this.renderAchievementsSection(t)}
              ${this.renderEducationSection(t)}
              ${this.renderCertificationsSection(t)}
            </div>
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-shadow-v2')) {
    customElements.define('gqr-resume-shadow-v2', GQRResumeShadowV2);
  }
})();