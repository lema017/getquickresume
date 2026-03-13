(function() {
  'use strict';

  /**
   * name: gqr-resume-mint-v1
   * description: "Two-column resume with a dark charcoal sidebar, warm gold accents, clean sans-serif typography, and structured timeline-style sections inspired by a modern editorial layout."
   */

  class GQRResumeMintV1 extends HTMLElement {
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
          skills: 'Fortalezas',
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

    formatDate(value, lang) {
      const v = this.safeStr(value);
      if (!v) return '';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const match = v.match(/^(\d{4})(?:-(\d{2}))?/);
      if (!match) return this.escapeHtml(v);
      const year = match[1];
      const monthIndex = match[2] ? Math.max(1, Math.min(12, parseInt(match[2], 10))) - 1 : -1;
      return monthIndex >= 0 ? `${months[monthIndex]} ${year}` : `${year}`;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const start = this.formatDate(startDate, lang);
      const end = isCurrentLike ? t.present : this.formatDate(endDate, lang);

      if (start && end) return `${start} – ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    getMergedSkills() {
      const seen = new Set();
      const merged = [];
      [...this.safeArr(this.data?.skillsRaw), ...this.safeArr(this.data?.toolsRaw)].forEach((item) => {
        const val = this.safeStr(item).trim();
        const key = val.toLowerCase();
        if (val && !seen.has(key)) {
          seen.add(key);
          merged.push(val);
        }
      });
      return merged;
    }

    renderSectionTitle(title, iconType) {
      const icons = {
        contact: `
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a5 5 0 0 0-5 5c0 3.9 5 9 5 9s5-5.1 5-9a5 5 0 0 0-5-5Zm0 7.2A2.2 2.2 0 1 1 12 4.8a2.2 2.2 0 0 1 0 4.4ZM6 18.5c-2 0-4 1-4 2.5V22h20v-1c0-1.5-2-2.5-4-2.5H6Z"/></svg>
        `,
        languages: `
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.9 2 6 19h2.5l1.4-3.5h6.3l1.4 3.5H20L13.1 2h-.2Zm.1 4.8 2.4 6.1h-4.8L13 6.8ZM4 6v2h4.2c-.3 2-1.2 3.8-2.6 5.1-.8-.8-1.5-1.8-2-2.9H1.8c.6 1.5 1.5 2.9 2.7 4.1l-2 2L4 18l2.1-2.1c1.5 1.1 3.2 1.8 5.1 2v-1.8c-1.4-.2-2.8-.7-3.9-1.5 1.7-1.7 2.9-4 3.2-6.6H14V6H4Z"/></svg>
        `,
        skills: `
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21.7 13.4-1.1-1.3.2-1.7-1.6-.6-.8-1.5-1.7.2L15.4 7l-1.5.8-1.5-.8-1.3 1.2-1.7-.2-.8 1.5-1.6.6.2 1.7-1.1 1.3 1.1 1.3-.2 1.7 1.6.6.8 1.5 1.7-.2 1.3 1.2 1.5-.8 1.5.8 1.3-1.2 1.7.2.8-1.5 1.6-.6-.2-1.7 1.1-1.3ZM10.2 15.8 7.4 13l1.4-1.4 1.4 1.4 4.9-4.9 1.4 1.4-6.3 6.3Z"/></svg>
        `,
        profile: `
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z"/></svg>
        `,
        experience: `
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3V1h6v2h5v18H4V3h5Zm0 2H6v14h12V5h-3v2H9V5Zm2 0h2V3h-2v2Z"/></svg>
        `,
        projects: `
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v2h3.6L7 15.6 8.4 17 19 6.4V10h2V3h-7ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"/></svg>
        `,
        achievements: `
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 3H7v4a5 5 0 0 0 4 4.9V14H8v2h3v2H8v2h8v-2h-3v-2h3v-2h-3v-2.1A5 5 0 0 0 17 7V3Zm-8 4V5h6v2a3 3 0 1 1-6 0Z"/></svg>
        `,
        education: `
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3Zm-7.2 9.7V17L12 21l7.2-4v-4.3L12 17l-7.2-4.3Z"/></svg>
        `,
        certifications: `
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm0 2.1 6 2.2V11c0 4-2.5 7.9-6 9-3.5-1.1-6-5-6-9V6.3l6-2.2Zm-1 4.9v4l3 1.8 1-1.7-2-1.1V9h-2Z"/></svg>
        `
      };

      return `
        <div class="section-title">
          <span class="section-icon">${icons[iconType] || ''}</span>
          <span>${this.escapeHtml(title)}</span>
        </div>
      `;
    }

    render() {
      const data = this.data || {};
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const levelMap = this.levelMap[lang];

      const firstName = this.safeStr(data.firstName);
      const lastName = this.safeStr(data.lastName);
      const profession = this.safeStr(data.profession);
      const summary = this.safeStr(data.summary);
      const email = this.safeStr(data.email);
      const phone = this.safeStr(data.phone);
      const country = this.safeStr(data.country);
      const linkedin = this.safeStr(data.linkedin);

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      const experience = this.safeArr(data.experience);
      const education = this.safeArr(data.education);
      const projects = this.safeArr(data.projects);
      const certifications = this.safeArr(data.certifications);
      const languages = this.safeArr(data.languages);
      const achievements = this.safeArr(data.achievements);
      const skills = this.getMergedSkills();

      const hasContact = !!(email || phone || country || linkedin);
      const hasLanguages = languages.length > 0;
      const hasSkills = skills.length > 0;

      const hasHeader = !!(fullName || profession);
      const hasProfile = !!summary;
      const hasExperience = experience.length > 0;
      const hasProjects = projects.length > 0;
      const hasAchievements = achievements.length > 0;
      const hasEducation = education.length > 0;
      const hasCertifications = certifications.length > 0;

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #1f1f1f;
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
            grid-template-columns: 35% 65%;
            background: #f6f4ef;
            font-family: Arial, Helvetica, sans-serif;
            color: #2a2a2a;
          }

          .sidebar {
            background: linear-gradient(180deg, #17191b 0%, #222426 100%);
            color: #f7f4ee;
            padding: 26mm 9mm 18mm 11mm;
            min-height: 297mm;
          }

          .main {
            background: #f6f4ef;
            padding: 16mm 13mm 16mm 12mm;
          }

          .name-block {
            padding: 0 0 8mm 0;
            border-bottom: 2px solid #d2a63c;
            margin-bottom: 8mm;
          }

          .name {
            margin: 0;
            color: #17191b;
            font-size: 26px;
            line-height: 1.02;
            font-weight: 800;
            letter-spacing: 1.4px;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 4mm;
            color: #8c6b1f;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1.4px;
            text-transform: uppercase;
          }

          .section {
            margin: 0 0 7mm 0;
          }

          .section-title {
            display: flex;
            align-items: center;
            gap: 7px;
            margin: 0 0 4mm 0;
            color: #d2a63c;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 1.1px;
            text-transform: uppercase;
          }

          .section-icon {
            width: 18px;
            height: 18px;
            border: 1.5px solid #d2a63c;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 18px;
          }

          .section-icon svg {
            width: 11px;
            height: 11px;
            fill: #d2a63c;
          }

          .sidebar .section {
            position: relative;
          }

          .sidebar .section:not(:last-child)::after {
            content: '';
            position: absolute;
            left: 8px;
            bottom: -3.5mm;
            width: 1px;
            height: 3mm;
            background: rgba(210, 166, 60, 0.45);
          }

          .contact-list,
          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .contact-item,
          .language-item {
            font-size: 11px;
            line-height: 1.4;
            color: #f4efe3;
          }

          .contact-item {
            display: flex;
            gap: 8px;
            align-items: flex-start;
          }

          .bullet-dot {
            width: 6px;
            height: 6px;
            background: #d2a63c;
            border-radius: 50%;
            flex: 0 0 6px;
            margin-top: 5px;
          }

          .contact-text,
          .language-text {
            word-break: break-word;
          }

          .language-item {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            padding-bottom: 6px;
          }

          .language-level {
            color: #d8bf7a;
            white-space: nowrap;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            font-size: 10px;
            line-height: 1.2;
            padding: 5px 8px;
            border-radius: 999px;
            background: rgba(210, 166, 60, 0.14);
            border: 1px solid rgba(210, 166, 60, 0.45);
            color: #f5f0e5;
          }

          .profile-text {
            font-size: 12px;
            line-height: 1.65;
            color: #47433a;
            margin: 0;
          }

          .timeline-list {
            display: flex;
            flex-direction: column;
            gap: 5mm;
          }

          .timeline-item {
            position: relative;
            padding-left: 14px;
          }

          .timeline-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 4px;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #d2a63c;
          }

          .timeline-item::after {
            content: '';
            position: absolute;
            left: 3px;
            top: 14px;
            bottom: -5mm;
            width: 1px;
            background: rgba(210, 166, 60, 0.35);
          }

          .timeline-list .timeline-item:last-child::after {
            display: none;
          }

          .item-title {
            margin: 0;
            font-size: 13px;
            line-height: 1.3;
            font-weight: 800;
            color: #202020;
          }

          .item-subtitle {
            margin: 1mm 0 0 0;
            font-size: 11px;
            line-height: 1.45;
            color: #6a6152;
            font-style: italic;
          }

          .item-date {
            margin: 1.4mm 0 0 0;
            font-size: 10px;
            line-height: 1.3;
            color: #8c6b1f;
            font-weight: 700;
            letter-spacing: 0.2px;
          }

          .item-text {
            margin: 2mm 0 0 0;
            font-size: 11px;
            line-height: 1.55;
            color: #403b33;
          }

          .bullet-list {
            margin: 2mm 0 0 0;
            padding: 0 0 0 16px;
          }

          .bullet-list li {
            margin: 0 0 1.4mm 0;
            font-size: 11px;
            line-height: 1.5;
            color: #403b33;
          }

          .tech-line {
            margin-top: 2mm;
            font-size: 10.5px;
            line-height: 1.5;
            color: #5b5448;
          }

          .muted-label {
            color: #8c6b1f;
            font-weight: 700;
          }

          a {
            color: inherit;
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
            ${hasContact ? `
              <section class="section" data-section="contact">
                ${this.renderSectionTitle(t.contact, 'contact')}
                <div class="contact-list">
                  ${email ? `
                    <div class="contact-item">
                      <span class="bullet-dot"></span>
                      <div class="contact-text">${this.escapeHtml(email)}</div>
                    </div>
                  ` : ''}
                  ${phone ? `
                    <div class="contact-item">
                      <span class="bullet-dot"></span>
                      <div class="contact-text">${this.escapeHtml(phone)}</div>
                    </div>
                  ` : ''}
                  ${country ? `
                    <div class="contact-item">
                      <span class="bullet-dot"></span>
                      <div class="contact-text">${this.escapeHtml(country)}</div>
                    </div>
                  ` : ''}
                  ${linkedin ? `
                    <div class="contact-item">
                      <span class="bullet-dot"></span>
                      <div class="contact-text">${this.escapeHtml(linkedin)}</div>
                    </div>
                  ` : ''}
                </div>
              </section>
            ` : ''}

            ${hasLanguages ? `
              <section class="section" data-section="languages">
                ${this.renderSectionTitle(t.languages, 'languages')}
                <div class="language-list">
                  ${languages.map((item, index) => {
                    const id = this.safeStr(item && item.id) || `language-${index}`;
                    const name = this.safeStr(item && item.name);
                    const levelKey = this.safeStr(item && item.level).toLowerCase();
                    const level = levelMap[levelKey] || this.escapeHtml(this.safeStr(item && item.level));
                    return `
                      <div class="language-item" data-entry-id="${this.escapeHtml(id)}">
                        <span class="language-text">${this.escapeHtml(name)}</span>
                        <span class="language-level">${this.escapeHtml(level)}</span>
                      </div>
                    `;
                  }).join('')}
                </div>
              </section>
            ` : ''}

            ${hasSkills ? `
              <section class="section" data-section="skills">
                ${this.renderSectionTitle(t.skills, 'skills')}
                <div class="skills-wrap">
                  ${skills.map((skill, index) => `
                    <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
                  `).join('')}
                </div>
              </section>
            ` : ''}
          </div>

          <div class="main">
            ${hasHeader ? `
              <section class="section name-block" data-section="header">
                ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
                ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
              </section>
            ` : ''}

            ${hasProfile ? `
              <section class="section" data-section="profile">
                ${this.renderSectionTitle(t.profile, 'profile')}
                <p class="profile-text">${this.escapeHtml(summary)}</p>
              </section>
            ` : ''}

            ${hasExperience ? `
              <section class="section" data-section="experience">
                ${this.renderSectionTitle(t.experience, 'experience')}
                <div class="timeline-list">
                  ${experience.map((item, index) => {
                    const id = this.safeStr(item && item.id) || `experience-${index}`;
                    const title = this.safeStr(item && item.title);
                    const company = this.safeStr(item && item.company);
                    const location = this.safeStr(item && item.location);
                    const subtitleParts = [company, location].filter(Boolean);
                    const achievementsArr = this.safeArr(item && item.achievements);
                    const responsibilitiesArr = this.safeArr(item && item.responsibilities);
                    const bullets = [...achievementsArr, ...responsibilitiesArr]
                      .map(v => this.safeStr(v))
                      .filter(Boolean);

                    return `
                      <div class="timeline-item" data-entry-id="${this.escapeHtml(id)}">
                        ${title ? `<h3 class="item-title">${this.escapeHtml(title)}</h3>` : ''}
                        ${subtitleParts.length ? `<div class="item-subtitle">${this.escapeHtml(subtitleParts.join(' · '))}</div>` : ''}
                        <div class="item-date">${this.escapeHtml(this.formatDateRange(
                          this.safeStr(item && item.startDate),
                          this.safeStr(item && item.endDate),
                          !!(item && item.isCurrent)
                        ))}</div>
                        ${bullets.length ? `
                          <ul class="bullet-list">
                            ${bullets.map(b => `<li>${this.escapeHtml(b)}</li>`).join('')}
                          </ul>
                        ` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              </section>
            ` : ''}

            ${hasProjects ? `
              <section class="section" data-section="projects">
                ${this.renderSectionTitle(t.projects, 'projects')}
                <div class="timeline-list">
                  ${projects.map((item, index) => {
                    const id = this.safeStr(item && item.id) || `project-${index}`;
                    const name = this.safeStr(item && item.name);
                    const description = this.safeStr(item && item.description);
                    const url = this.safeStr(item && item.url);
                    const technologies = this.safeArr(item && item.technologies)
                      .map(v => this.safeStr(v))
                      .filter(Boolean);
                    const dateRange = this.formatDateRange(
                      this.safeStr(item && item.startDate),
                      this.safeStr(item && item.endDate),
                      !!(item && item.isOngoing)
                    );

                    return `
                      <div class="timeline-item" data-entry-id="${this.escapeHtml(id)}">
                        ${name ? `<h3 class="item-title">${this.escapeHtml(name)}</h3>` : ''}
                        ${dateRange ? `<div class="item-date">${this.escapeHtml(dateRange)}</div>` : ''}
                        ${description ? `<div class="item-text">${this.escapeHtml(description)}</div>` : ''}
                        ${technologies.length ? `
                          <div class="tech-line"><span class="muted-label">Tech:</span> ${this.escapeHtml(technologies.join(', '))}</div>
                        ` : ''}
                        ${url ? `
                          <div class="tech-line"><span class="muted-label">URL:</span> ${this.escapeHtml(url)}</div>
                        ` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              </section>
            ` : ''}

            ${hasAchievements ? `
              <section class="section" data-section="achievements">
                ${this.renderSectionTitle(t.achievements, 'achievements')}
                <div class="timeline-list">
                  ${achievements.map((item, index) => {
                    const id = this.safeStr(item && item.id) || `achievement-${index}`;
                    const title = this.safeStr(item && item.title);
                    const description = this.safeStr(item && item.description);
                    const year = this.safeStr(item && item.year);

                    return `
                      <div class="timeline-item" data-entry-id="${this.escapeHtml(id)}">
                        ${title ? `<h3 class="item-title">${this.escapeHtml(title)}</h3>` : ''}
                        ${year ? `<div class="item-date">${this.escapeHtml(year)}</div>` : ''}
                        ${description ? `<div class="item-text">${this.escapeHtml(description)}</div>` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              </section>
            ` : ''}

            ${hasEducation ? `
              <section class="section" data-section="education">
                ${this.renderSectionTitle(t.education, 'education')}
                <div class="timeline-list">
                  ${education.map((item, index) => {
                    const id = this.safeStr(item && item.id) || `education-${index}`;
                    const degree = this.safeStr(item && item.degree);
                    const field = this.safeStr(item && item.field);
                    const institution = this.safeStr(item && item.institution);
                    const gpa = this.safeStr(item && item.gpa);
                    const title = [degree, field].filter(Boolean).join(' in ');
                    return `
                      <div class="timeline-item" data-entry-id="${this.escapeHtml(id)}">
                        ${title ? `<h3 class="item-title">${this.escapeHtml(title)}</h3>` : ''}
                        ${institution ? `<div class="item-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                        <div class="item-date">${this.escapeHtml(this.formatDateRange(
                          this.safeStr(item && item.startDate),
                          this.safeStr(item && item.endDate),
                          item && item.isCompleted === false
                        ))}</div>
                        ${gpa ? `<div class="item-text"><span class="muted-label">GPA:</span> ${this.escapeHtml(gpa)}</div>` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              </section>
            ` : ''}

            ${hasCertifications ? `
              <section class="section" data-section="certifications">
                ${this.renderSectionTitle(t.certifications, 'certifications')}
                <div class="timeline-list">
                  ${certifications.map((item, index) => {
                    const id = this.safeStr(item && item.id) || `certification-${index}`;
                    const name = this.safeStr(item && item.name);
                    const issuer = this.safeStr(item && item.issuer);
                    const date = this.safeStr(item && item.date);

                    return `
                      <div class="timeline-item" data-entry-id="${this.escapeHtml(id)}">
                        ${name ? `<h3 class="item-title">${this.escapeHtml(name)}</h3>` : ''}
                        ${issuer ? `<div class="item-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
                        ${date ? `<div class="item-date">${this.escapeHtml(date)}</div>` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              </section>
            ` : ''}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-mint-v1')) {
    customElements.define('gqr-resume-mint-v1', GQRResumeMintV1);
  }
})();