(function() {
  'use strict';

  /**
   * name: gqr-resume-rose-v2
   * description: "Two-column resume with a dark editorial grid background, pastel mint-lilac cards, bold condensed headings, and playful decorative accents inspired by a modern poster layout."
   */

  class GQRResumeRoseV2 extends HTMLElement {
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

    formatDate(dateStr, lang) {
      const value = this.safeStr(dateStr).trim();
      if (!value) return '';
      const months = lang === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      if (/^\d{4}$/.test(value)) return value;

      const m = value.match(/^(\d{4})-(\d{2})$/);
      if (m) {
        const year = m[1];
        const monthIndex = Math.max(0, Math.min(11, parseInt(m[2], 10) - 1));
        return months[monthIndex] + ' ' + year;
      }

      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        return months[d.getMonth()] + ' ' + d.getFullYear();
      }

      return value;
    }

    formatDateRange(startDate, endDate, currentFlag) {
      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const dict = this.i18n[lang];
      const start = this.formatDate(startDate, lang);
      const end = currentFlag ? dict.present : this.formatDate(endDate, lang);

      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    get i18n() {
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
    }

    get levelMap() {
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

    renderContactSection(dict) {
      const email = this.safeStr(this.data.email).trim();
      const phone = this.safeStr(this.data.phone).trim();
      const country = this.safeStr(this.data.country).trim();
      const linkedin = this.safeStr(this.data.linkedin).trim();

      const items = [
        email ? `<div class="contact-item"><span class="contact-label">✦</span><span>${this.escapeHtml(email)}</span></div>` : '',
        phone ? `<div class="contact-item"><span class="contact-label">✦</span><span>${this.escapeHtml(phone)}</span></div>` : '',
        country ? `<div class="contact-item"><span class="contact-label">✦</span><span>${this.escapeHtml(country)}</span></div>` : '',
        linkedin ? `<div class="contact-item"><span class="contact-label">✦</span><span>${this.escapeHtml(linkedin)}</span></div>` : ''
      ].filter(Boolean).join('');

      if (!items) return '';
      return `
        <section class="card sidebar-card" data-section="contact">
          <h3 class="section-title">${this.escapeHtml(dict.contact)}</h3>
          <div class="section-body">
            ${items}
          </div>
        </section>
      `;
    }

    renderLanguagesSection(dict, lang) {
      const languages = this.safeArr(this.data.languages);
      if (!languages.length) return '';

      const items = languages.map((item, index) => {
        const id = this.safeStr(item && item.id).trim() || `lang-${index}`;
        const name = this.safeStr(item && item.name).trim();
        const levelKey = this.safeStr(item && item.level).trim().toLowerCase();
        const level = this.levelMap[lang][levelKey] || this.safeStr(item && item.level).trim();
        if (!name && !level) return '';
        return `
          <div class="lang-item" data-entry-id="${this.escapeHtml(id)}">
            <div class="lang-name">${this.escapeHtml(name)}</div>
            <div class="lang-level">${this.escapeHtml(level)}</div>
          </div>
        `;
      }).filter(Boolean).join('');

      if (!items) return '';
      return `
        <section class="card sidebar-card" data-section="languages">
          <h3 class="section-title">${this.escapeHtml(dict.languages)}</h3>
          <div class="section-body">
            ${items}
          </div>
        </section>
      `;
    }

    renderSkillsSection(dict) {
      const merged = [...this.safeArr(this.data.skillsRaw), ...this.safeArr(this.data.toolsRaw)]
        .map(v => this.safeStr(v).trim())
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

      const items = deduped.map((skill, index) => (
        `<span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>`
      )).join('');

      return `
        <section class="card sidebar-card" data-section="skills">
          <h3 class="section-title">${this.escapeHtml(dict.skills)}</h3>
          <div class="section-body">
            <div class="skills-wrap">
              ${items}
            </div>
          </div>
        </section>
      `;
    }

    renderHeaderSection() {
      const firstName = this.safeStr(this.data.firstName).trim();
      const lastName = this.safeStr(this.data.lastName).trim();
      const profession = this.safeStr(this.data.profession).trim();
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      if (!fullName && !profession) return '';

      return `
        <section class="hero card hero-card" data-section="header">
          <div class="hero-pills">
            ${this.safeStr(this.data.phone).trim() ? `<span class="pill">${this.escapeHtml(this.data.phone)}</span>` : ''}
            ${this.safeStr(this.data.email).trim() ? `<span class="pill">${this.escapeHtml(this.data.email)}</span>` : ''}
            ${this.safeStr(this.data.country).trim() ? `<span class="pill">${this.escapeHtml(this.data.country)}</span>` : ''}
          </div>
          <div class="hero-inner">
            <div class="hero-mark">✷</div>
            <div class="hero-text">
              ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
              ${profession ? `<div class="profession-ribbon">${this.escapeHtml(profession)}</div>` : ''}
            </div>
          </div>
        </section>
      `;
    }

    renderProfileSection(dict) {
      const summary = this.safeStr(this.data.summary).trim();
      if (!summary) return '';
      return `
        <section class="card main-card" data-section="profile">
          <h3 class="section-title">${this.escapeHtml(dict.profile)}</h3>
          <div class="section-body">
            <p class="summary">${this.escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderExperienceSection(dict) {
      const items = this.safeArr(this.data.experience);
      if (!items.length) return '';

      const html = items.map((item, index) => {
        const id = this.safeStr(item && item.id).trim() || `exp-${index}`;
        const title = this.safeStr(item && item.title).trim();
        const company = this.safeStr(item && item.company).trim();
        const location = this.safeStr(item && item.location).trim();
        const dateRange = this.formatDateRange(
          this.safeStr(item && item.startDate),
          this.safeStr(item && item.endDate),
          !!(item && item.isCurrent)
        );

        const bullets = [
          ...this.safeArr(item && item.achievements),
          ...this.safeArr(item && item.responsibilities)
        ].map(v => this.safeStr(v).trim()).filter(Boolean);

        return `
          <article class="timeline-item" data-entry-id="${this.escapeHtml(id)}">
            <div class="timeline-top">
              <div>
                ${title ? `<div class="item-title">${this.escapeHtml(title)}</div>` : ''}
                ${(company || location) ? `<div class="item-subtitle">${this.escapeHtml([company, location].filter(Boolean).join(' • '))}</div>` : ''}
              </div>
              ${dateRange ? `<div class="date-chip">${this.escapeHtml(dateRange)}</div>` : ''}
            </div>
            ${bullets.length ? `
              <ul class="bullet-list">
                ${bullets.map(b => `<li>${this.escapeHtml(b)}</li>`).join('')}
              </ul>
            ` : ''}
          </article>
        `;
      }).filter(Boolean).join('');

      if (!html) return '';
      return `
        <section class="card main-card" data-section="experience">
          <h3 class="section-title">${this.escapeHtml(dict.experience)}</h3>
          <div class="section-body timeline">
            ${html}
          </div>
        </section>
      `;
    }

    renderProjectsSection(dict) {
      const items = this.safeArr(this.data.projects);
      if (!items.length) return '';

      const html = items.map((item, index) => {
        const id = this.safeStr(item && item.id).trim() || `proj-${index}`;
        const name = this.safeStr(item && item.name).trim();
        const description = this.safeStr(item && item.description).trim();
        const url = this.safeStr(item && item.url).trim();
        const technologies = this.safeArr(item && item.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
        const dateRange = this.formatDateRange(
          this.safeStr(item && item.startDate),
          this.safeStr(item && item.endDate),
          !!(item && item.isOngoing)
        );

        if (!name && !description && !technologies.length && !url) return '';

        return `
          <article class="entry-card" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              ${name ? `<div class="item-title">${this.escapeHtml(name)}</div>` : ''}
              ${dateRange ? `<div class="date-chip">${this.escapeHtml(dateRange)}</div>` : ''}
            </div>
            ${description ? `<div class="item-text">${this.escapeHtml(description)}</div>` : ''}
            ${technologies.length ? `
              <div class="tag-row">
                ${technologies.map(t => `<span class="tag">${this.escapeHtml(t)}</span>`).join('')}
              </div>
            ` : ''}
            ${url ? `<div class="item-link">${this.escapeHtml(url)}</div>` : ''}
          </article>
        `;
      }).filter(Boolean).join('');

      if (!html) return '';
      return `
        <section class="card main-card" data-section="projects">
          <h3 class="section-title">${this.escapeHtml(dict.projects)}</h3>
          <div class="section-body stack">
            ${html}
          </div>
        </section>
      `;
    }

    renderAchievementsSection(dict) {
      const items = this.safeArr(this.data.achievements);
      if (!items.length) return '';

      const html = items.map((item, index) => {
        const id = this.safeStr(item && item.id).trim() || `ach-${index}`;
        const title = this.safeStr(item && item.title).trim();
        const description = this.safeStr(item && item.description).trim();
        const year = this.safeStr(item && item.year).trim();

        if (!title && !description && !year) return '';

        return `
          <article class="entry-card compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              ${title ? `<div class="item-title">${this.escapeHtml(title)}</div>` : ''}
              ${year ? `<div class="date-chip">${this.escapeHtml(year)}</div>` : ''}
            </div>
            ${description ? `<div class="item-text">${this.escapeHtml(description)}</div>` : ''}
          </article>
        `;
      }).filter(Boolean).join('');

      if (!html) return '';
      return `
        <section class="card main-card" data-section="achievements">
          <h3 class="section-title">${this.escapeHtml(dict.achievements)}</h3>
          <div class="section-body stack">
            ${html}
          </div>
        </section>
      `;
    }

    renderEducationSection(dict) {
      const items = this.safeArr(this.data.education);
      if (!items.length) return '';

      const html = items.map((item, index) => {
        const id = this.safeStr(item && item.id).trim() || `edu-${index}`;
        const institution = this.safeStr(item && item.institution).trim();
        const degree = this.safeStr(item && item.degree).trim();
        const field = this.safeStr(item && item.field).trim();
        const gpa = this.safeStr(item && item.gpa).trim();
        const title = [degree, field].filter(Boolean).join(' — ');
        const dateRange = this.formatDateRange(
          this.safeStr(item && item.startDate),
          this.safeStr(item && item.endDate),
          item && item.isCompleted === false
        );

        return `
          <article class="timeline-item" data-entry-id="${this.escapeHtml(id)}">
            <div class="timeline-top">
              <div>
                ${title ? `<div class="item-title">${this.escapeHtml(title)}</div>` : ''}
                ${institution ? `<div class="item-subtitle">${this.escapeHtml(institution)}</div>` : ''}
              </div>
              ${dateRange ? `<div class="date-chip">${this.escapeHtml(dateRange)}</div>` : ''}
            </div>
            ${gpa ? `<div class="item-text">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
          </article>
        `;
      }).filter(Boolean).join('');

      if (!html) return '';
      return `
        <section class="card main-card" data-section="education">
          <h3 class="section-title">${this.escapeHtml(dict.education)}</h3>
          <div class="section-body timeline">
            ${html}
          </div>
        </section>
      `;
    }

    renderCertificationsSection(dict) {
      const items = this.safeArr(this.data.certifications);
      if (!items.length) return '';

      const html = items.map((item, index) => {
        const id = this.safeStr(item && item.id).trim() || `cert-${index}`;
        const name = this.safeStr(item && item.name).trim();
        const issuer = this.safeStr(item && item.issuer).trim();
        const date = this.safeStr(item && item.date).trim();

        if (!name && !issuer && !date) return '';

        return `
          <article class="entry-card compact" data-entry-id="${this.escapeHtml(id)}">
            <div class="entry-head">
              ${name ? `<div class="item-title">${this.escapeHtml(name)}</div>` : ''}
              ${date ? `<div class="date-chip">${this.escapeHtml(date)}</div>` : ''}
            </div>
            ${issuer ? `<div class="item-subtitle">${this.escapeHtml(issuer)}</div>` : ''}
          </article>
        `;
      }).filter(Boolean).join('');

      if (!html) return '';
      return `
        <section class="card main-card" data-section="certifications">
          <h3 class="section-title">${this.escapeHtml(dict.certifications)}</h3>
          <div class="section-body stack">
            ${html}
          </div>
        </section>
      `;
    }

    render() {
      if (!this.shadowRoot) return;

      const lang = this.getLanguage() === 'es' ? 'es' : 'en';
      const dict = this.i18n[lang];

      const headerSection = this.renderHeaderSection();
      const contactSection = this.renderContactSection(dict);
      const languagesSection = this.renderLanguagesSection(dict, lang);
      const skillsSection = this.renderSkillsSection(dict);

      const profileSection = this.renderProfileSection(dict);
      const experienceSection = this.renderExperienceSection(dict);
      const projectsSection = this.renderProjectsSection(dict);
      const achievementsSection = this.renderAchievementsSection(dict);
      const educationSection = this.renderEducationSection(dict);
      const certificationsSection = this.renderCertificationsSection(dict);

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #1d1820;
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
            margin: 0 auto;
            padding: 10mm;
            background:
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px),
              #1b171c;
            background-size: 18mm 18mm, 18mm 18mm, auto;
            position: relative;
            display: grid;
            grid-template-columns: 33% 1fr;
            gap: 8mm;
          }

          .page::before,
          .page::after {
            content: "";
            position: absolute;
            pointer-events: none;
            border-radius: 999px;
            opacity: 0.9;
          }

          .page::before {
            width: 26mm;
            height: 4mm;
            background: linear-gradient(90deg, #e8c3f2, #d9f3df);
            top: 9mm;
            right: 18mm;
            transform: rotate(-9deg);
          }

          .page::after {
            width: 10mm;
            height: 10mm;
            border: 2px solid #d9f3df;
            left: 15mm;
            top: 30mm;
            transform: rotate(12deg);
            clip-path: polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%);
            background: rgba(232, 195, 242, 0.1);
          }

          .hero {
            grid-column: 1 / -1;
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

          .card {
            border-radius: 5mm;
            padding: 5mm;
            position: relative;
            overflow: hidden;
          }

          .hero-card,
          .sidebar-card,
          .main-card {
            background: linear-gradient(135deg, #e7c3f0 0%, #d8cfee 38%, #d9f3df 100%);
            box-shadow: 0 2mm 5mm rgba(0, 0, 0, 0.12);
          }

          .hero-card {
            padding: 5mm 6mm 6mm;
          }

          .hero-pills {
            display: flex;
            flex-wrap: wrap;
            gap: 3mm;
            margin-bottom: 4mm;
          }

          .pill {
            display: inline-flex;
            align-items: center;
            padding: 1.5mm 3.5mm;
            border-radius: 999px;
            background: rgba(255,255,255,0.62);
            color: #312937;
            font-size: 10px;
            line-height: 1.1;
            border: 1px solid rgba(49, 41, 55, 0.08);
            white-space: nowrap;
          }

          .hero-inner {
            display: flex;
            align-items: flex-start;
            gap: 4mm;
          }

          .hero-mark {
            font-size: 42px;
            line-height: 1;
            color: #c9f2f8;
            text-shadow:
              -1px 0 #1f1a20,
              0 1px #1f1a20,
              1px 0 #1f1a20,
              0 -1px #1f1a20;
            transform: translateY(2mm) rotate(-10deg);
            flex: 0 0 auto;
          }

          .hero-text {
            min-width: 0;
          }

          .name {
            margin: 0;
            font-size: 31px;
            line-height: 0.95;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            font-weight: 900;
            color: #f5e9f8;
            text-shadow:
              -1.2px -1.2px 0 #221c24,
              1.2px -1.2px 0 #221c24,
              -1.2px 1.2px 0 #221c24,
              1.2px 1.2px 0 #221c24;
            word-break: break-word;
          }

          .profession-ribbon {
            display: inline-block;
            margin-top: 4mm;
            padding: 2.2mm 4mm;
            background: #e8ddd6;
            color: #292229;
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            transform: rotate(-7deg);
            box-shadow: 1.5mm 1.5mm 0 rgba(0,0,0,0.08);
          }

          .section-title {
            margin: 0 0 3.5mm;
            padding-left: 3mm;
            font-size: 16px;
            line-height: 1;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #251f28;
            border-left: 1.5mm solid #3a2f3f;
            word-break: break-word;
          }

          .section-body {
            font-size: 12px;
            line-height: 1.45;
            color: #2f2933;
          }

          .summary {
            margin: 0;
            white-space: pre-wrap;
          }

          .contact-item {
            display: flex;
            gap: 2mm;
            align-items: flex-start;
            margin-bottom: 2.2mm;
            word-break: break-word;
          }

          .contact-item:last-child {
            margin-bottom: 0;
          }

          .contact-label {
            flex: 0 0 auto;
            color: #3b3140;
            font-size: 11px;
            margin-top: 0.3mm;
          }

          .lang-item {
            margin-bottom: 3mm;
            padding-bottom: 2.5mm;
            border-bottom: 1px dashed rgba(58, 47, 63, 0.18);
          }

          .lang-item:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: 0;
          }

          .lang-name {
            font-weight: 800;
            font-size: 12px;
          }

          .lang-level {
            font-size: 11px;
            opacity: 0.82;
            margin-top: 0.8mm;
          }

          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .skill-badge {
            display: inline-block;
            white-space: nowrap;
            font-size: 10.5px;
            font-weight: 700;
            line-height: 1.2;
            padding: 1.5mm 3mm;
            border-radius: 999px;
            background: rgba(255,255,255,0.66);
            color: #2f2933;
            border: 1px solid rgba(58, 47, 63, 0.1);
          }

          .timeline-item,
          .entry-card {
            position: relative;
            margin-bottom: 4mm;
          }

          .timeline-item:last-child,
          .entry-card:last-child {
            margin-bottom: 0;
          }

          .timeline {
            position: relative;
          }

          .timeline::before {
            content: "";
            position: absolute;
            left: 1.8mm;
            top: 1mm;
            bottom: 1mm;
            width: 1px;
            background: rgba(58, 47, 63, 0.18);
          }

          .timeline-item {
            padding-left: 6mm;
          }

          .timeline-item::before {
            content: "";
            position: absolute;
            left: 0;
            top: 1.6mm;
            width: 4mm;
            height: 4mm;
            border-radius: 50%;
            background: #2a222b;
            box-shadow: 0 0 0 1.3mm rgba(232, 195, 242, 0.58);
          }

          .timeline-top,
          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 3mm;
          }

          .item-title {
            font-size: 13px;
            font-weight: 900;
            line-height: 1.2;
            color: #231d26;
          }

          .item-subtitle {
            margin-top: 0.8mm;
            font-size: 11px;
            font-weight: 700;
            color: #4a3f4f;
          }

          .item-text,
          .item-link {
            margin-top: 2mm;
            font-size: 11.5px;
            line-height: 1.45;
            color: #322b36;
            word-break: break-word;
          }

          .date-chip {
            flex: 0 0 auto;
            padding: 1.2mm 2.2mm;
            border-radius: 999px;
            background: rgba(255,255,255,0.62);
            font-size: 10px;
            font-weight: 800;
            color: #312937;
            white-space: nowrap;
          }

          .bullet-list {
            margin: 2.2mm 0 0;
            padding-left: 4.5mm;
          }

          .bullet-list li {
            margin-bottom: 1.6mm;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2.2mm;
          }

          .tag {
            display: inline-block;
            white-space: nowrap;
            font-size: 10px;
            font-weight: 700;
            padding: 1.2mm 2.3mm;
            border-radius: 999px;
            background: rgba(42, 34, 43, 0.08);
            color: #2f2933;
          }

          .stack {
            display: flex;
            flex-direction: column;
            gap: 3.5mm;
          }

          .compact {
            padding-bottom: 0.5mm;
          }

          @media print {
            :host {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${headerSection}
          <div class="sidebar">
            ${contactSection}
            ${languagesSection}
            ${skillsSection}
          </div>
          <div class="main">
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

  if (!customElements.get('gqr-resume-rose-v2')) {
    customElements.define('gqr-resume-rose-v2', GQRResumeRoseV2);
  }
})();