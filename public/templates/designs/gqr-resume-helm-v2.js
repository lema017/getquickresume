(function() {
  'use strict';

  /**
   * name: gqr-resume-helm-v2
   * description: "Two-column resume with a dark charcoal sidebar, soft sage header panel, clean sans-serif typography, and structured editorial sections inspired by a modern European CV layout."
   */

  class GQRResumeHelmV2 extends HTMLElement {
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
          education: 'Estudios',
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

    formatShortDate(value, lang) {
      const v = this.safeStr(value).trim();
      if (!v) return '';
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };
      const locale = lang === 'es' ? 'es' : 'en';
      if (/^\d{4}$/.test(v)) return v;
      if (/^\d{4}-\d{2}$/.test(v)) {
        const [year, month] = v.split('-');
        const idx = parseInt(month, 10) - 1;
        if (idx >= 0 && idx < 12) return `${months[locale][idx]} ${year}`;
        return year;
      }
      const date = new Date(v);
      if (!isNaN(date.getTime())) {
        return `${months[locale][date.getMonth()]} ${date.getFullYear()}`;
      }
      return v;
    }

    formatDateRange(startDate, endDate, isCurrentLike) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const t = this.i18n[lang];
      const start = this.formatShortDate(this.safeStr(startDate), lang);
      const end = isCurrentLike
        ? t.present
        : this.formatShortDate(this.safeStr(endDate), lang);
      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderContact(lang, labels) {
      const email = this.safeStr(this.data?.email);
      const phone = this.safeStr(this.data?.phone);
      const country = this.safeStr(this.data?.country);
      const linkedin = this.safeStr(this.data?.linkedin);

      if (!email && !phone && !country && !linkedin) return '';

      const linkedinHref = linkedin
        ? (linkedin.startsWith('http://') || linkedin.startsWith('https://')
            ? linkedin
            : `https://linkedin.com/in/${linkedin.replace(/^@/, '').replace(/^linkedin\.com\/in\//, '')}`)
        : '';

      return `
        <section class="section sidebar-section" data-section="contact">
          <h3 class="section-title light">${this.escapeHtml(labels.contact)}</h3>
          <div class="contact-list">
            ${email ? `
              <div class="contact-item">
                <span class="icon">${this.renderIcon('mail')}</span>
                <span class="contact-text">${this.escapeHtml(email)}</span>
              </div>` : ''}
            ${phone ? `
              <div class="contact-item">
                <span class="icon">${this.renderIcon('phone')}</span>
                <span class="contact-text">${this.escapeHtml(phone)}</span>
              </div>` : ''}
            ${country ? `
              <div class="contact-item">
                <span class="icon">${this.renderIcon('location')}</span>
                <span class="contact-text">${this.escapeHtml(country)}</span>
              </div>` : ''}
            ${linkedin ? `
              <div class="contact-item">
                <span class="icon">${this.renderIcon('link')}</span>
                <span class="contact-text">
                  <a href="${this.escapeHtml(linkedinHref)}" target="_blank" rel="noopener noreferrer">${this.escapeHtml(linkedin)}</a>
                </span>
              </div>` : ''}
          </div>
        </section>
      `;
    }

    renderLanguages(lang, labels) {
      const items = this.safeArr(this.data?.languages);
      if (!items.length) return '';
      const levelMap = this.levelMap[lang] || this.levelMap.en;

      return `
        <section class="section sidebar-section" data-section="languages">
          <h3 class="section-title light">${this.escapeHtml(labels.languages)}</h3>
          <div class="lang-list">
            ${items.map((item) => {
              const id = this.safeStr(item?.id);
              const name = this.safeStr(item?.name);
              const levelKey = this.safeStr(item?.level).toLowerCase();
              const level = levelMap[levelKey] || this.safeStr(item?.level);
              return `
                <div class="lang-item" data-entry-id="${this.escapeHtml(id)}">
                  <div class="lang-name">${this.escapeHtml(name)}</div>
                  <div class="lang-level">${this.escapeHtml(level)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderSkills(lang, labels) {
      const merged = [...this.safeArr(this.data?.skillsRaw), ...this.safeArr(this.data?.toolsRaw)]
        .map((s) => this.safeStr(s).trim())
        .filter(Boolean);

      const deduped = [];
      const seen = new Set();
      merged.forEach((item) => {
        const key = item.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          deduped.push(item);
        }
      });

      if (!deduped.length) return '';

      return `
        <section class="section sidebar-section" data-section="skills">
          <h3 class="section-title light">${this.escapeHtml(labels.skills)}</h3>
          <div class="skills-wrap">
            ${deduped.map((skill, index) => `
              <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderHeader() {
      const firstName = this.safeStr(this.data?.firstName);
      const lastName = this.safeStr(this.data?.lastName);
      const profession = this.safeStr(this.data?.profession);
      const fullName = `${firstName} ${lastName}`.trim();

      if (!fullName && !profession) return '';

      return `
        <section class="header-panel section" data-section="header">
          <div class="name-block">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
        </section>
      `;
    }

    renderProfile(lang, labels) {
      const summary = this.safeStr(this.data?.summary);
      if (!summary) return '';
      return `
        <section class="section main-section" data-section="profile">
          <h3 class="section-title dark">${this.escapeHtml(labels.profile)}</h3>
          <div class="profile-text">${this.escapeHtml(summary)}</div>
        </section>
      `;
    }

    renderExperience(lang, labels) {
      const items = this.safeArr(this.data?.experience);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="experience">
          <h3 class="section-title dark">${this.escapeHtml(labels.experience)}</h3>
          <div class="timeline">
            ${items.map((item) => {
              const id = this.safeStr(item?.id);
              const title = this.safeStr(item?.title);
              const company = this.safeStr(item?.company);
              const location = this.safeStr(item?.location);
              const range = this.formatDateRange(
                this.safeStr(item?.startDate),
                this.safeStr(item?.endDate),
                !!item?.isCurrent
              );
              const bullets = [
                ...this.safeArr(item?.achievements),
                ...this.safeArr(item?.responsibilities)
              ].map((b) => this.safeStr(b).trim()).filter(Boolean);

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-grid">
                    <div class="entry-dates">${this.escapeHtml(range)}</div>
                    <div class="entry-content">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                      ${(company || location) ? `
                        <div class="entry-meta">
                          ${company ? `<span>${this.escapeHtml(company)}</span>` : ''}
                          ${company && location ? `<span class="sep">•</span>` : ''}
                          ${location ? `<span>${this.escapeHtml(location)}</span>` : ''}
                        </div>` : ''}
                      ${bullets.length ? `
                        <ul class="bullet-list">
                          ${bullets.map((b) => `<li>${this.escapeHtml(b)}</li>`).join('')}
                        </ul>` : ''}
                    </div>
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjects(lang, labels) {
      const items = this.safeArr(this.data?.projects);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          <h3 class="section-title dark">${this.escapeHtml(labels.projects)}</h3>
          ${items.map((item) => {
            const id = this.safeStr(item?.id);
            const name = this.safeStr(item?.name);
            const description = this.safeStr(item?.description);
            const technologies = this.safeArr(item?.technologies).map((t) => this.safeStr(t).trim()).filter(Boolean);
            const url = this.safeStr(item?.url);
            const range = this.formatDateRange(
              this.safeStr(item?.startDate),
              this.safeStr(item?.endDate),
              !!item?.isOngoing
            );
            return `
              <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                <div class="row-head">
                  <div>
                    ${name ? `<div class="entry-title">${this.escapeHtml(name)}</div>` : ''}
                    ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
                  </div>
                  ${range ? `<div class="mini-date">${this.escapeHtml(range)}</div>` : ''}
                </div>
                ${technologies.length ? `
                  <div class="tag-row">
                    ${technologies.map((tech) => `<span class="tag">${this.escapeHtml(tech)}</span>`).join('')}
                  </div>` : ''}
                ${url ? `<div class="link-line"><a href="${this.escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${this.escapeHtml(url)}</a></div>` : ''}
              </article>
            `;
          }).join('')}
        </section>
      `;
    }

    renderAchievements(lang, labels) {
      const items = this.safeArr(this.data?.achievements);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          <h3 class="section-title dark">${this.escapeHtml(labels.achievements)}</h3>
          ${items.map((item) => {
            const id = this.safeStr(item?.id);
            const title = this.safeStr(item?.title);
            const description = this.safeStr(item?.description);
            const year = this.safeStr(item?.year);
            return `
              <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                <div class="row-head">
                  <div class="entry-title">${this.escapeHtml(title)}</div>
                  ${year ? `<div class="mini-date">${this.escapeHtml(year)}</div>` : ''}
                </div>
                ${description ? `<div class="entry-text">${this.escapeHtml(description)}</div>` : ''}
              </article>
            `;
          }).join('')}
        </section>
      `;
    }

    renderEducation(lang, labels) {
      const items = this.safeArr(this.data?.education);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="education">
          <h3 class="section-title dark">${this.escapeHtml(labels.education)}</h3>
          <div class="timeline">
            ${items.map((item) => {
              const id = this.safeStr(item?.id);
              const institution = this.safeStr(item?.institution);
              const degree = this.safeStr(item?.degree);
              const field = this.safeStr(item?.field);
              const gpa = this.safeStr(item?.gpa);
              const range = this.formatDateRange(
                this.safeStr(item?.startDate),
                this.safeStr(item?.endDate),
                item?.isCompleted === false
              );
              return `
                <article class="entry" data-entry-id="${this.escapeHtml(id)}">
                  <div class="entry-grid">
                    <div class="entry-dates">${this.escapeHtml(range)}</div>
                    <div class="entry-content">
                      ${degree ? `<div class="entry-title">${this.escapeHtml(degree)}</div>` : ''}
                      ${(field || institution) ? `
                        <div class="entry-meta">
                          ${field ? `<span>${this.escapeHtml(field)}</span>` : ''}
                          ${field && institution ? `<span class="sep">•</span>` : ''}
                          ${institution ? `<span>${this.escapeHtml(institution)}</span>` : ''}
                        </div>` : ''}
                      ${gpa ? `<div class="entry-text">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                    </div>
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(lang, labels) {
      const items = this.safeArr(this.data?.certifications);
      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          <h3 class="section-title dark">${this.escapeHtml(labels.certifications)}</h3>
          ${items.map((item) => {
            const id = this.safeStr(item?.id);
            const name = this.safeStr(item?.name);
            const issuer = this.safeStr(item?.issuer);
            const date = this.safeStr(item?.date);
            return `
              <article class="entry compact" data-entry-id="${this.escapeHtml(id)}">
                <div class="row-head">
                  <div class="entry-title">${this.escapeHtml(name)}</div>
                  ${date ? `<div class="mini-date">${this.escapeHtml(this.formatShortDate(date, lang))}</div>` : ''}
                </div>
                ${issuer ? `<div class="entry-text">${this.escapeHtml(issuer)}</div>` : ''}
              </article>
            `;
          }).join('')}
        </section>
      `;
    }

    renderIcon(type) {
      const icons = {
        mail: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2 8 5 8-5"/></svg>`,
        phone: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.4 15.4 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.08.36 2.24.54 3.4.54a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.16.18 2.32.54 3.4a1 1 0 0 1-.24 1l-2.2 2.4Z"/></svg>`,
        location: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Zm0-8.5A2.5 2.5 0 1 0 12 7a2.5 2.5 0 0 0 0 5.5Z"/></svg>`,
        link: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.6 13.4a1 1 0 0 1 0-1.4l3.4-3.4a3 3 0 1 1 4.2 4.2l-2 2m-2.2 2.2-3.4 3.4a3 3 0 0 1-4.2-4.2l2-2m2.2-4.2 3.8 3.8"/></svg>`
      };
      return icons[type] || '';
    }

    render() {
      if (!this.shadowRoot) return;

      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const labels = this.i18n[lang] || this.i18n.en;

      const styles = `
        <style>
          :host {
            display: block;
            color: #243236;
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
            background: #f4f5f2;
            display: grid;
            grid-template-columns: 34% 66%;
            font-family: Arial, Helvetica, sans-serif;
          }

          .sidebar {
            background: #1a1c1f;
            color: #f1f3f1;
            padding: 26mm 9mm 18mm 11mm;
          }

          .main {
            background: #fbfbf9;
            color: #223237;
            padding: 0 12mm 16mm 12mm;
          }

          .header-panel {
            background: #b8c9c6;
            margin: 0 -12mm 8mm -12mm;
            padding: 18mm 12mm 12mm;
            min-height: 58mm;
            display: flex;
            align-items: flex-end;
          }

          .name {
            margin: 0;
            font-size: 16.5mm;
            line-height: 0.92;
            letter-spacing: 0.4px;
            text-transform: uppercase;
            font-weight: 800;
            color: #ffffff;
          }

          .profession {
            margin-top: 4mm;
            font-size: 4.2mm;
            line-height: 1.2;
            text-transform: uppercase;
            font-style: italic;
            font-weight: 700;
            color: rgba(255,255,255,0.95);
            letter-spacing: 0.4px;
          }

          .section {
            display: block;
          }

          .sidebar-section {
            margin-bottom: 11mm;
          }

          .main-section {
            margin-bottom: 8mm;
          }

          .section-title {
            position: relative;
            margin: 0 0 5mm 0;
            font-size: 4.9mm;
            line-height: 1;
            text-transform: uppercase;
            font-weight: 800;
            letter-spacing: 0.3px;
            display: inline-block;
          }

          .section-title::after {
            content: "";
            position: absolute;
            left: -1.5mm;
            right: -1.5mm;
            bottom: -0.6mm;
            height: 2.1mm;
            z-index: 0;
          }

          .section-title.light {
            color: #ffffff;
          }

          .section-title.light::after {
            background: rgba(184, 201, 198, 0.25);
          }

          .section-title.dark {
            color: #2b3b3d;
          }

          .section-title.dark::after {
            background: rgba(184, 201, 198, 0.75);
          }

          .section-title > *,
          .section-title {
            position: relative;
            z-index: 1;
          }

          .contact-list,
          .lang-list {
            display: flex;
            flex-direction: column;
            gap: 3.2mm;
          }

          .contact-item {
            display: grid;
            grid-template-columns: 5mm 1fr;
            gap: 2.5mm;
            align-items: start;
            font-size: 3.25mm;
            line-height: 1.45;
          }

          .contact-text,
          .lang-name,
          .lang-level,
          .profile-text,
          .entry-meta,
          .entry-text,
          .bullet-list,
          .tag,
          .link-line a {
            overflow-wrap: anywhere;
            word-break: break-word;
          }

          .contact-item a {
            color: #f1f3f1;
            text-decoration: none;
            border-bottom: 1px solid rgba(255,255,255,0.25);
          }

          .icon {
            width: 4mm;
            height: 4mm;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-top: 0.2mm;
          }

          .icon svg {
            width: 100%;
            height: 100%;
            fill: none;
            stroke: currentColor;
            stroke-width: 1.8;
            stroke-linecap: round;
            stroke-linejoin: round;
          }

          .lang-item {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 3mm;
            align-items: baseline;
            padding-bottom: 1.6mm;
            border-bottom: 0.3mm solid rgba(255,255,255,0.12);
          }

          .lang-name {
            font-size: 3.5mm;
            font-weight: 700;
          }

          .lang-level {
            font-size: 3.1mm;
            color: rgba(241,243,241,0.78);
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
            background: rgba(184, 201, 198, 0.16);
            color: #eef2ef;
            border: 0.3mm solid rgba(184, 201, 198, 0.28);
            font-size: 3.1mm;
            line-height: 1.2;
          }

          .profile-text {
            font-size: 3.45mm;
            line-height: 1.65;
            color: #49585a;
          }

          .timeline,
          .entry {
            display: block;
          }

          .entry {
            margin-bottom: 5.5mm;
          }

          .entry:last-child {
            margin-bottom: 0;
          }

          .entry-grid {
            display: grid;
            grid-template-columns: 27mm 1fr;
            gap: 4mm;
          }

          .entry-dates {
            font-size: 3mm;
            line-height: 1.35;
            color: #7b8c8c;
            text-transform: uppercase;
            letter-spacing: 0.2px;
            padding-top: 0.5mm;
          }

          .entry-title {
            font-size: 4mm;
            line-height: 1.25;
            font-weight: 800;
            color: #25363a;
            margin-bottom: 1mm;
          }

          .entry-meta {
            font-size: 3.25mm;
            line-height: 1.45;
            color: #648080;
            margin-bottom: 1.7mm;
          }

          .sep {
            margin: 0 1.2mm;
          }

          .bullet-list {
            margin: 0;
            padding-left: 4.2mm;
            color: #465558;
            font-size: 3.2mm;
            line-height: 1.55;
          }

          .bullet-list li {
            margin-bottom: 1mm;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .compact {
            padding-bottom: 3.5mm;
            border-bottom: 0.3mm solid #d9dfdc;
          }

          .compact:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .row-head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 4mm;
          }

          .mini-date {
            flex: 0 0 auto;
            font-size: 2.9mm;
            line-height: 1.35;
            color: #7b8c8c;
            text-transform: uppercase;
            text-align: right;
            padding-top: 0.4mm;
          }

          .entry-text {
            font-size: 3.2mm;
            line-height: 1.55;
            color: #4b5a5d;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2mm;
          }

          .tag {
            display: inline-block;
            padding: 1.2mm 2.1mm;
            border-radius: 999px;
            background: #eef3f1;
            color: #456161;
            font-size: 2.9mm;
            line-height: 1.15;
            border: 0.3mm solid #d6e0dd;
          }

          .link-line {
            margin-top: 1.6mm;
            font-size: 3mm;
          }

          .link-line a {
            color: #587575;
            text-decoration: none;
            border-bottom: 1px solid rgba(88,117,117,0.35);
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>
      `;

      const sidebarHtml = [
        this.renderContact(lang, labels),
        this.renderLanguages(lang, labels),
        this.renderSkills(lang, labels)
      ].join('');

      const mainHtml = [
        this.renderHeader(),
        this.renderProfile(lang, labels),
        this.renderExperience(lang, labels),
        this.renderProjects(lang, labels),
        this.renderAchievements(lang, labels),
        this.renderEducation(lang, labels),
        this.renderCertifications(lang, labels)
      ].join('');

      this.shadowRoot.innerHTML = `
        ${styles}
        <div class="page">
          <div class="sidebar">
            ${sidebarHtml}
          </div>
          <div class="main">
            ${mainHtml}
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-helm-v2')) {
    customElements.define('gqr-resume-helm-v2', GQRResumeHelmV2);
  }
})();