(function() {
  'use strict';

  class GQRResumeAuraV1 extends HTMLElement {
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
      const locale = lang === 'es' ? 'es-ES' : 'en-US';
      const parts = value.split('-');
      const year = parseInt(parts[0], 10);
      const month = parts[1] ? parseInt(parts[1], 10) - 1 : 0;
      if (!year || Number.isNaN(year)) return this.escapeHtml(value);
      const date = new Date(year, Number.isNaN(month) ? 0 : month, 1);
      return new Intl.DateTimeFormat(locale, {
        month: 'short',
        year: 'numeric'
      }).format(date);
    }

    formatDateRange(startDate, endDate, currentFlag, lang) {
      const t = this.i18n[lang] || this.i18n.en;
      const start = this.formatDate(startDate, lang);
      const end = currentFlag ? t.present : this.formatDate(endDate, lang);
      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderSectionTitle(title) {
      return `<div class="section-title"><span>${this.escapeHtml(title)}</span></div>`;
    }

    render() {
      const data = this.data || {};
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang] || this.i18n.en;
      const lm = this.levelMap[lang] || this.levelMap.en;

      const firstName = this.safeStr(data.firstName);
      const lastName = this.safeStr(data.lastName);
      const fullName = `${firstName} ${lastName}`.trim();
      const profession = this.safeStr(data.profession);
      const summary = this.safeStr(data.summary);
      const email = this.safeStr(data.email);
      const phone = this.safeStr(data.phone);
      const country = this.safeStr(data.country);
      const linkedin = this.safeStr(data.linkedin);

      const experience = this.safeArr(data.experience);
      const education = this.safeArr(data.education);
      const projects = this.safeArr(data.projects);
      const certifications = this.safeArr(data.certifications);
      const languages = this.safeArr(data.languages);
      const achievements = this.safeArr(data.achievements);

      const combinedSkills = Array.from(
        new Set(
          [...this.safeArr(data.skillsRaw), ...this.safeArr(data.toolsRaw)]
            .map(v => this.safeStr(v).trim())
            .filter(Boolean)
        )
      );

      const hasContact = [email, phone, country, linkedin].some(Boolean);
      const hasLanguages = languages.length > 0;
      const hasSkills = combinedSkills.length > 0;
      const hasProfile = !!summary;
      const hasExperience = experience.length > 0;
      const hasProjects = projects.length > 0;
      const hasAchievements = achievements.length > 0;
      const hasEducation = education.length > 0;
      const hasCertifications = certifications.length > 0;

      const contactItems = [];
      if (phone) {
        contactItems.push(`
          <div class="contact-item">
            <span class="contact-icon">☎</span>
            <span class="contact-text">${this.escapeHtml(phone)}</span>
          </div>
        `);
      }
      if (email) {
        contactItems.push(`
          <div class="contact-item">
            <span class="contact-icon">✉</span>
            <span class="contact-text">${this.escapeHtml(email)}</span>
          </div>
        `);
      }
      if (country) {
        contactItems.push(`
          <div class="contact-item">
            <span class="contact-icon">⌂</span>
            <span class="contact-text">${this.escapeHtml(country)}</span>
          </div>
        `);
      }
      if (linkedin) {
        contactItems.push(`
          <div class="contact-item">
            <span class="contact-icon">↗</span>
            <span class="contact-text">${this.escapeHtml(linkedin)}</span>
          </div>
        `);
      }

      const languagesHtml = languages.map(item => {
        const id = this.safeStr(item?.id);
        const name = this.safeStr(item?.name);
        const rawLevel = this.safeStr(item?.level).toLowerCase();
        const level = lm[rawLevel] || this.safeStr(item?.level);
        return `
          <div class="lang-item" data-entry-id="${this.escapeHtml(id)}">
            <div class="lang-name">${this.escapeHtml(name)}</div>
            <div class="lang-level">${this.escapeHtml(level)}</div>
          </div>
        `;
      }).join('');

      const skillsHtml = combinedSkills.map((skill, index) => `
        <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
      `).join('');

      const experienceHtml = experience.map(item => {
        const id = this.safeStr(item?.id);
        const title = this.safeStr(item?.title);
        const company = this.safeStr(item?.company);
        const location = this.safeStr(item?.location);
        const bullets = [...this.safeArr(item?.achievements), ...this.safeArr(item?.responsibilities)]
          .map(v => this.safeStr(v).trim())
          .filter(Boolean);

        const range = this.formatDateRange(
          this.safeStr(item?.startDate),
          this.safeStr(item?.endDate),
          !!item?.isCurrent,
          lang
        );

        return `
          <div class="entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title">${this.escapeHtml(title || company)}</div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
            ${(company || location) ? `
              <div class="entry-sub">
                ${company ? `<span>${this.escapeHtml(company)}</span>` : ''}
                ${(company && location) ? `<span class="dot">•</span>` : ''}
                ${location ? `<span>${this.escapeHtml(location)}</span>` : ''}
              </div>
            ` : ''}
            ${bullets.length ? `
              <ul class="bullet-list">
                ${bullets.map(b => `<li>${this.escapeHtml(b)}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `;
      }).join('');

      const projectsHtml = projects.map(item => {
        const id = this.safeStr(item?.id);
        const name = this.safeStr(item?.name);
        const description = this.safeStr(item?.description);
        const technologies = this.safeArr(item?.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
        const url = this.safeStr(item?.url);
        const range = this.formatDateRange(
          this.safeStr(item?.startDate),
          this.safeStr(item?.endDate),
          !!item?.isOngoing,
          lang
        );

        return `
          <div class="entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title">${this.escapeHtml(name)}</div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
            ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
            ${technologies.length ? `<div class="entry-tags">${technologies.map(tag => `<span>${this.escapeHtml(tag)}</span>`).join('')}</div>` : ''}
            ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
          </div>
        `;
      }).join('');

      const achievementsHtml = achievements.map(item => {
        const id = this.safeStr(item?.id);
        const title = this.safeStr(item?.title);
        const description = this.safeStr(item?.description);
        const year = this.safeStr(item?.year);

        return `
          <div class="entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title">${this.escapeHtml(title)}</div>
              ${year ? `<div class="entry-date">${this.escapeHtml(year)}</div>` : ''}
            </div>
            ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
          </div>
        `;
      }).join('');

      const educationHtml = education.map(item => {
        const id = this.safeStr(item?.id);
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

        const degreeLine = [degree, field].filter(Boolean).join(degree && field ? ' — ' : '');

        return `
          <div class="entry" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title">${this.escapeHtml(institution)}</div>
              ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
            </div>
            ${degreeLine ? `<div class="entry-sub">${this.escapeHtml(degreeLine)}</div>` : ''}
            ${gpa ? `<div class="entry-text">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
          </div>
        `;
      }).join('');

      const certificationsHtml = certifications.map(item => {
        const id = this.safeStr(item?.id);
        const name = this.safeStr(item?.name);
        const issuer = this.safeStr(item?.issuer);
        const date = this.safeStr(item?.date);

        return `
          <div class="entry compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              <div class="entry-title">${this.escapeHtml(name)}</div>
              ${date ? `<div class="entry-date">${this.escapeHtml(date)}</div>` : ''}
            </div>
            ${issuer ? `<div class="entry-sub">${this.escapeHtml(issuer)}</div>` : ''}
          </div>
        `;
      }).join('');

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #111111;
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
            grid-template-columns: 34% 66%;
            background:
              linear-gradient(180deg, #0e1013 0%, #111418 100%);
            color: #111111;
            border: 1px solid #d8d8d8;
          }

          .sidebar {
            background:
              linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0)),
              linear-gradient(180deg, #0e1013 0%, #161a20 100%);
            color: #f4f4f4;
            padding: 18mm 8mm 14mm 12mm;
            min-height: 297mm;
          }

          .main {
            background:
              linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.88)),
              linear-gradient(180deg, #f4f1eb 0%, #ffffff 100%);
            padding: 16mm 14mm 14mm 14mm;
            min-height: 297mm;
            position: relative;
          }

          .main::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 6px;
            background: linear-gradient(180deg, #d09a1c 0%, #f0be44 100%);
          }

          [data-section] {
            display: block;
          }

          .header-block {
            margin-bottom: 11mm;
            padding-bottom: 7mm;
            border-bottom: 1px solid rgba(0,0,0,0.12);
          }

          .name {
            margin: 0;
            font-size: 19mm;
            line-height: 0.9;
            font-weight: 900;
            letter-spacing: -0.8px;
            text-transform: uppercase;
            color: #111111;
          }

          .name .line {
            display: block;
          }

          .profession {
            margin-top: 4mm;
            font-size: 3.7mm;
            font-weight: 800;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            color: #c98f12;
          }

          .section {
            margin-bottom: 8mm;
          }

          .section-title {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 4mm;
          }

          .section-title span {
            font-size: 5.4mm;
            line-height: 1;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.3px;
          }

          .sidebar .section-title span {
            color: #f0b22e;
          }

          .main .section-title span {
            color: #c98f12;
          }

          .section-title::after {
            content: '';
            flex: 1;
            height: 1px;
            background: currentColor;
            opacity: 0.35;
          }

          .profile-text,
          .entry-text,
          .bullet-list,
          .contact-text,
          .lang-level,
          .entry-sub {
            font-size: 3.15mm;
            line-height: 1.55;
          }

          .profile-text {
            color: #333333;
          }

          .contact-list {
            display: grid;
            gap: 2.6mm;
          }

          .contact-item {
            display: grid;
            grid-template-columns: 4mm 1fr;
            gap: 2.4mm;
            align-items: start;
          }

          .contact-icon {
            color: #f0b22e;
            font-size: 3.3mm;
            line-height: 1.2;
            transform: translateY(0.2mm);
          }

          .contact-text {
            color: #f3f3f3;
            word-break: break-word;
          }

          .lang-item {
            padding: 0 0 3mm 0;
            margin-bottom: 3mm;
            border-bottom: 1px solid rgba(255,255,255,0.12);
          }

          .lang-item:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: 0;
          }

          .lang-name {
            font-size: 3.35mm;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 1mm;
          }

          .lang-level {
            color: #d4d4d4;
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
            border-radius: 999px;
            background: rgba(240, 178, 46, 0.14);
            border: 1px solid rgba(240, 178, 46, 0.34);
            color: #fff3cf;
            font-size: 2.95mm;
            line-height: 1.2;
            font-weight: 700;
          }

          .entry {
            margin-bottom: 5.5mm;
          }

          .entry:last-child {
            margin-bottom: 0;
          }

          .entry.compact {
            margin-bottom: 4mm;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 4mm;
            margin-bottom: 1.2mm;
          }

          .entry-title {
            font-size: 3.65mm;
            line-height: 1.25;
            font-weight: 800;
            color: #111111;
          }

          .entry-date {
            flex-shrink: 0;
            font-size: 2.95mm;
            line-height: 1.3;
            font-weight: 700;
            color: #8b6a1d;
            text-align: right;
          }

          .entry-sub {
            color: #525252;
            margin-bottom: 1.6mm;
          }

          .dot {
            margin: 0 1.2mm;
          }

          .bullet-list {
            margin: 0;
            padding-left: 4.3mm;
            color: #2f2f2f;
          }

          .bullet-list li {
            margin: 0 0 1mm 0;
          }

          .entry-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2mm;
          }

          .entry-tags span {
            display: inline-block;
            padding: 1.2mm 2.1mm;
            border-radius: 999px;
            background: #f7ead0;
            color: #7a5710;
            font-size: 2.7mm;
            font-weight: 700;
          }

          .entry-link {
            margin-top: 1.5mm;
            font-size: 2.9mm;
            color: #6c6c6c;
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
            ${hasContact ? `
              <section class="section" data-section="contact">
                ${this.renderSectionTitle(t.contact)}
                <div class="contact-list">
                  ${contactItems.join('')}
                </div>
              </section>
            ` : ''}

            ${hasLanguages ? `
              <section class="section" data-section="languages">
                ${this.renderSectionTitle(t.languages)}
                <div class="lang-list">
                  ${languagesHtml}
                </div>
              </section>
            ` : ''}

            ${hasSkills ? `
              <section class="section" data-section="skills">
                ${this.renderSectionTitle(t.skills)}
                <div class="skills-wrap">
                  ${skillsHtml}
                </div>
              </section>
            ` : ''}
          </div>

          <div class="main">
            <section class="header-block section" data-section="header">
              <h1 class="name">
                <span class="line">${this.escapeHtml(firstName || fullName || ' ')}</span>
                <span class="line">${this.escapeHtml(lastName || (firstName ? '' : fullName) || ' ')}</span>
              </h1>
              ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
            </section>

            ${hasProfile ? `
              <section class="section" data-section="profile">
                ${this.renderSectionTitle(t.profile)}
                <div class="profile-text">${this.escapeHtml(summary)}</div>
              </section>
            ` : ''}

            ${hasExperience ? `
              <section class="section" data-section="experience">
                ${this.renderSectionTitle(t.experience)}
                ${experienceHtml}
              </section>
            ` : ''}

            ${hasProjects ? `
              <section class="section" data-section="projects">
                ${this.renderSectionTitle(t.projects)}
                ${projectsHtml}
              </section>
            ` : ''}

            ${hasAchievements ? `
              <section class="section" data-section="achievements">
                ${this.renderSectionTitle(t.achievements)}
                ${achievementsHtml}
              </section>
            ` : ''}

            ${hasEducation ? `
              <section class="section" data-section="education">
                ${this.renderSectionTitle(t.education)}
                ${educationHtml}
              </section>
            ` : ''}

            ${hasCertifications ? `
              <section class="section" data-section="certifications">
                ${this.renderSectionTitle(t.certifications)}
                ${certificationsHtml}
              </section>
            ` : ''}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-aura-v1')) {
    customElements.define('gqr-resume-aura-v1', GQRResumeAuraV1);
  }
})();