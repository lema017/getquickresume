(function() {
  'use strict';

  /**
   * name: gqr-resume-beach-v2
   * description: "Two-column resume with a dark torn-paper sidebar, light textured main panel, bold hand-drawn inspired headings, and clean modern typography."
   */

  class GQRResumeBeachV2 extends HTMLElement {
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

    formatShortDate(value, lang) {
      const v = this.safeStr(value).trim();
      if (!v) return '';
      const l = lang === 'es' ? 'es' : 'en';

      if (/^\d{4}$/.test(v)) return v;

      if (/^\d{4}-\d{2}$/.test(v)) {
        const [y, m] = v.split('-');
        const date = new Date(Number(y), Number(m) - 1, 1);
        if (!isNaN(date.getTime())) {
          return new Intl.DateTimeFormat(l === 'es' ? 'es-ES' : 'en-US', {
            month: 'short',
            year: 'numeric'
          }).format(date).replace('.', '');
        }
      }

      const d = new Date(v);
      if (!isNaN(d.getTime())) {
        return new Intl.DateTimeFormat(l === 'es' ? 'es-ES' : 'en-US', {
          month: 'short',
          year: 'numeric'
        }).format(d).replace('.', '');
      }

      return v;
    }

    formatDateRange(startDate, endDate, currentFlag, lang) {
      const l = lang === 'es' ? 'es' : 'en';
      const start = this.formatShortDate(startDate, l);
      const end = currentFlag
        ? this.i18n[l].present
        : this.formatShortDate(endDate, l);

      if (start && end) return `${start} — ${end}`;
      if (start) return start;
      if (end) return end;
      return '';
    }

    renderContact(lang) {
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
            <span class="icon">☏</span>
            <span class="contact-text">${this.escapeHtml(phone)}</span>
          </div>
        `);
      }
      if (country) {
        items.push(`
          <div class="contact-item">
            <span class="icon">⌖</span>
            <span class="contact-text">${this.escapeHtml(country)}</span>
          </div>
        `);
      }
      if (linkedin) {
        items.push(`
          <div class="contact-item">
            <span class="icon">in</span>
            <span class="contact-text">${this.escapeHtml(linkedin)}</span>
          </div>
        `);
      }

      if (!items.length) return '';
      return `
        <section class="section sidebar-section contact-section" data-section="contact">
          <h3 class="section-title light">${this.escapeHtml(this.i18n[lang].contact)}</h3>
          <div class="section-body">
            ${items.join('')}
          </div>
        </section>
      `;
    }

    renderLanguages(lang) {
      const items = this.safeArr(this.data?.languages)
        .filter(item => this.safeStr(item?.name).trim());

      if (!items.length) return '';

      return `
        <section class="section sidebar-section" data-section="languages">
          <h3 class="section-title light">${this.escapeHtml(this.i18n[lang].languages)}</h3>
          <div class="section-body language-list">
            ${items.map(item => {
              const levelKey = this.safeStr(item?.level).toLowerCase();
              const levelLabel = this.levelMap[lang]?.[levelKey] || this.safeStr(item?.level);
              return `
                <div class="language-item" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                  <div class="language-name">${this.escapeHtml(this.safeStr(item?.name))}</div>
                  <div class="language-level">${this.escapeHtml(levelLabel)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderSkills(lang) {
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
        <section class="section sidebar-section" data-section="skills">
          <h3 class="section-title light">${this.escapeHtml(this.i18n[lang].skills)}</h3>
          <div class="section-body">
            <div class="skills-wrap">
              ${deduped.map((skill, index) => `
                <span class="skill-badge" data-entry-id="skill-${index}">${this.escapeHtml(skill)}</span>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderHeader() {
      const firstName = this.safeStr(this.data?.firstName).trim();
      const lastName = this.safeStr(this.data?.lastName).trim();
      const profession = this.safeStr(this.data?.profession).trim();
      const fullName = [firstName, lastName].filter(Boolean).join(' ');

      if (!fullName && !profession) return '';

      return `
        <section class="hero" data-section="header">
          <div class="hero-ornament hero-ornament-a"></div>
          <div class="hero-ornament hero-ornament-b"></div>
          <div class="name-block">
            ${fullName ? `<h1 class="name">${this.escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${this.escapeHtml(profession)}</div>` : ''}
          </div>
          <div class="paper-card">
            <div class="paper-inner">
              <div class="paper-line paper-line-1"></div>
              <div class="paper-line paper-line-2"></div>
              <div class="paper-line paper-line-3"></div>
            </div>
          </div>
        </section>
      `;
    }

    renderProfile(lang) {
      const summary = this.safeStr(this.data?.summary).trim();
      if (!summary) return '';

      return `
        <section class="section main-section" data-section="profile">
          <h3 class="section-title dark">${this.escapeHtml(this.i18n[lang].profile)}</h3>
          <div class="section-body">
            <p class="summary">${this.escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderExperience(lang) {
      const items = this.safeArr(this.data?.experience)
        .filter(item => this.safeStr(item?.title).trim() || this.safeStr(item?.company).trim());

      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="experience">
          <h3 class="section-title dark">${this.escapeHtml(this.i18n[lang].experience)}</h3>
          <div class="section-body timeline">
            ${items.map(item => {
              const bullets = [
                ...this.safeArr(item?.achievements),
                ...this.safeArr(item?.responsibilities)
              ].map(v => this.safeStr(v).trim()).filter(Boolean);

              const title = this.safeStr(item?.title).trim();
              const company = this.safeStr(item?.company).trim();
              const location = this.safeStr(item?.location).trim();
              const range = this.formatDateRange(
                this.safeStr(item?.startDate),
                this.safeStr(item?.endDate),
                !!item?.isCurrent,
                lang
              );

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
                      ${title ? `<div class="entry-title">${this.escapeHtml(title)}</div>` : ''}
                      ${(company || location) ? `
                        <div class="entry-subtitle">
                          ${this.escapeHtml(company)}${company && location ? ' · ' : ''}${this.escapeHtml(location)}
                        </div>` : ''
                      }
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${bullets.length ? `
                    <ul class="bullet-list">
                      ${bullets.map(b => `<li>${this.escapeHtml(b)}</li>`).join('')}
                    </ul>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjects(lang) {
      const items = this.safeArr(this.data?.projects)
        .filter(item => this.safeStr(item?.name).trim() || this.safeStr(item?.description).trim());

      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="projects">
          <h3 class="section-title dark">${this.escapeHtml(this.i18n[lang].projects)}</h3>
          <div class="section-body card-list">
            ${items.map(item => {
              const range = this.formatDateRange(
                this.safeStr(item?.startDate),
                this.safeStr(item?.endDate),
                !!item?.isOngoing,
                lang
              );
              const techs = this.safeArr(item?.technologies).map(v => this.safeStr(v).trim()).filter(Boolean);
              const url = this.safeStr(item?.url).trim();

              return `
                <article class="entry project-card" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
                      ${this.safeStr(item?.name).trim() ? `<div class="entry-title">${this.escapeHtml(this.safeStr(item?.name))}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${this.safeStr(item?.description).trim() ? `<p class="entry-text">${this.escapeHtml(this.safeStr(item?.description))}</p>` : ''}
                  ${techs.length ? `<div class="tag-row">${techs.map(t => `<span class="tag">${this.escapeHtml(t)}</span>`).join('')}</div>` : ''}
                  ${url ? `<div class="entry-link">${this.escapeHtml(url)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements(lang) {
      const items = this.safeArr(this.data?.achievements)
        .filter(item => this.safeStr(item?.title).trim() || this.safeStr(item?.description).trim());

      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="achievements">
          <h3 class="section-title dark">${this.escapeHtml(this.i18n[lang].achievements)}</h3>
          <div class="section-body card-list">
            ${items.map(item => `
              <article class="entry achievement-card" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                <div class="entry-head">
                  <div class="entry-title-wrap">
                    ${this.safeStr(item?.title).trim() ? `<div class="entry-title">${this.escapeHtml(this.safeStr(item?.title))}</div>` : ''}
                  </div>
                  ${this.safeStr(item?.year).trim() ? `<div class="entry-date">${this.escapeHtml(this.safeStr(item?.year))}</div>` : ''}
                </div>
                ${this.safeStr(item?.description).trim() ? `<p class="entry-text">${this.escapeHtml(this.safeStr(item?.description))}</p>` : ''}
              </article>
            `).join('')}
          </div>
        </section>
      `;
    }

    renderEducation(lang) {
      const items = this.safeArr(this.data?.education)
        .filter(item => this.safeStr(item?.institution).trim() || this.safeStr(item?.degree).trim() || this.safeStr(item?.field).trim());

      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="education">
          <h3 class="section-title dark">${this.escapeHtml(this.i18n[lang].education)}</h3>
          <div class="section-body timeline">
            ${items.map(item => {
              const degree = this.safeStr(item?.degree).trim();
              const field = this.safeStr(item?.field).trim();
              const institution = this.safeStr(item?.institution).trim();
              const gpa = this.safeStr(item?.gpa).trim();
              const range = this.formatDateRange(
                this.safeStr(item?.startDate),
                this.safeStr(item?.endDate),
                item?.isCompleted === false,
                lang
              );

              return `
                <article class="entry" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                  <div class="entry-head">
                    <div class="entry-title-wrap">
                      ${(degree || field) ? `<div class="entry-title">${this.escapeHtml([degree, field].filter(Boolean).join(' · '))}</div>` : ''}
                      ${institution ? `<div class="entry-subtitle">${this.escapeHtml(institution)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${this.escapeHtml(range)}</div>` : ''}
                  </div>
                  ${gpa ? `<div class="meta-inline">GPA: ${this.escapeHtml(gpa)}</div>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(lang) {
      const items = this.safeArr(this.data?.certifications)
        .filter(item => this.safeStr(item?.name).trim() || this.safeStr(item?.issuer).trim());

      if (!items.length) return '';

      return `
        <section class="section main-section" data-section="certifications">
          <h3 class="section-title dark">${this.escapeHtml(this.i18n[lang].certifications)}</h3>
          <div class="section-body card-list">
            ${items.map(item => `
              <article class="entry cert-card" data-entry-id="${this.escapeHtml(this.safeStr(item?.id))}">
                <div class="entry-head">
                  <div class="entry-title-wrap">
                    ${this.safeStr(item?.name).trim() ? `<div class="entry-title">${this.escapeHtml(this.safeStr(item?.name))}</div>` : ''}
                    ${this.safeStr(item?.issuer).trim() ? `<div class="entry-subtitle">${this.escapeHtml(this.safeStr(item?.issuer))}</div>` : ''}
                  </div>
                  ${this.safeStr(item?.date).trim() ? `<div class="entry-date">${this.escapeHtml(this.safeStr(item?.date))}</div>` : ''}
                </div>
              </article>
            `).join('')}
          </div>
        </section>
      `;
    }

    render() {
      if (!this.shadowRoot) return;

      const lang = this.getLanguage() === 'es' ? 'es' : 'en';

      const styles = `
        <style>
          :host {
            display: block;
            color: #111;
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
            display: grid;
            grid-template-columns: 33% 67%;
            background:
              linear-gradient(180deg, rgba(244,246,248,0.98), rgba(250,250,249,0.98)),
              repeating-linear-gradient(
                0deg,
                rgba(50,70,90,0.04) 0,
                rgba(50,70,90,0.04) 1px,
                transparent 1px,
                transparent 28px
              ),
              repeating-linear-gradient(
                90deg,
                rgba(50,70,90,0.04) 0,
                rgba(50,70,90,0.04) 1px,
                transparent 1px,
                transparent 28px
              );
            font-family: Arial, Helvetica, sans-serif;
            position: relative;
          }

          .page::before {
            content: "";
            position: absolute;
            inset: 0;
            background:
              radial-gradient(circle at top right, rgba(0,0,0,0.04), transparent 24%),
              radial-gradient(circle at bottom left, rgba(0,0,0,0.03), transparent 20%);
            pointer-events: none;
          }

          .sidebar {
            position: relative;
            background: #171717;
            color: #f3f3ef;
            padding: 22mm 8mm 12mm 12mm;
            overflow: visible;
          }

          .sidebar::before {
            content: "";
            position: absolute;
            top: 0;
            right: -18px;
            width: 34px;
            height: 100%;
            background:
              radial-gradient(circle at 6px 16px, #171717 0 9px, transparent 10px),
              radial-gradient(circle at 20px 56px, #171717 0 8px, transparent 9px),
              radial-gradient(circle at 10px 102px, #171717 0 7px, transparent 8px),
              radial-gradient(circle at 22px 152px, #171717 0 8px, transparent 9px),
              radial-gradient(circle at 8px 208px, #171717 0 7px, transparent 8px),
              radial-gradient(circle at 24px 272px, #171717 0 9px, transparent 10px),
              radial-gradient(circle at 10px 338px, #171717 0 7px, transparent 8px),
              radial-gradient(circle at 20px 412px, #171717 0 8px, transparent 9px),
              linear-gradient(90deg, #171717 0 14px, transparent 14px);
            opacity: 1;
            pointer-events: none;
          }

          .sidebar::after {
            content: "";
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 22px;
            background:
              radial-gradient(circle at 8px 0, transparent 10px, #171717 11px) 0 0/32px 22px repeat-x;
          }

          .main {
            position: relative;
            padding: 12mm 12mm 14mm 18mm;
            color: #151515;
          }

          .hero {
            position: relative;
            min-height: 56mm;
            margin-bottom: 10mm;
            padding-right: 44mm;
          }

          .hero-ornament {
            position: absolute;
            border: 1.2mm solid #1f1f1f;
            border-left: none;
            border-bottom: none;
            width: 12mm;
            height: 12mm;
          }

          .hero-ornament-a {
            top: -2mm;
            right: 0;
          }

          .hero-ornament-b {
            top: 10mm;
            right: 12mm;
            transform: rotate(180deg);
          }

          .name {
            margin: 0;
            font-size: 18mm;
            line-height: 0.9;
            letter-spacing: 0.5mm;
            text-transform: uppercase;
            font-weight: 900;
            color: #161616;
            max-width: 110mm;
          }

          .profession {
            margin-top: 4mm;
            font-size: 4.2mm;
            text-transform: uppercase;
            letter-spacing: 0.8mm;
            color: #444;
            font-weight: 700;
          }

          .paper-card {
            position: absolute;
            top: 8mm;
            right: 2mm;
            width: 36mm;
            height: 42mm;
            background: #fffdf8;
            border: 1.5mm solid #e7e1d4;
            box-shadow: 0 2mm 5mm rgba(0,0,0,0.16);
            transform: rotate(4deg);
          }

          .paper-card::before {
            content: "";
            position: absolute;
            inset: 2mm;
            border: 0.6mm solid #d9d3c7;
            background:
              linear-gradient(180deg, rgba(0,0,0,0.03), transparent),
              #f6f1e8;
          }

          .paper-inner {
            position: absolute;
            inset: 5mm;
          }

          .paper-line {
            height: 1.6mm;
            background: #1d1d1d;
            margin-bottom: 4mm;
            border-radius: 999px;
            opacity: 0.8;
          }

          .paper-line-1 { width: 70%; margin-top: 5mm; }
          .paper-line-2 { width: 86%; }
          .paper-line-3 { width: 58%; }

          .section {
            position: relative;
            margin-bottom: 8mm;
          }

          .section-title {
            margin: 0 0 4mm 0;
            font-size: 6.2mm;
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 0.4mm;
            font-weight: 900;
          }

          .section-title.light {
            color: #fff7dc;
          }

          .section-title.dark {
            color: #121212;
          }

          .section-title.dark::after {
            content: "";
            display: block;
            width: 18mm;
            height: 1.2mm;
            background: #111;
            margin-top: 2.2mm;
          }

          .section-body {
            font-size: 3.45mm;
            line-height: 1.55;
          }

          .summary,
          .entry-text {
            margin: 0;
            color: #222;
          }

          .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 3mm;
            margin-bottom: 3.2mm;
          }

          .icon {
            flex: 0 0 auto;
            width: 5.2mm;
            height: 5.2mm;
            border: 0.5mm solid rgba(255,255,255,0.45);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5mm;
            color: #fff7dc;
            font-weight: 700;
            margin-top: 0.2mm;
          }

          .contact-text {
            word-break: break-word;
            color: #efefea;
          }

          .language-list {
            display: grid;
            gap: 3.5mm;
          }

          .language-item {
            padding-bottom: 2.5mm;
            border-bottom: 0.35mm dashed rgba(255,255,255,0.18);
          }

          .language-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .language-name {
            font-weight: 700;
            color: #fff;
          }

          .language-level {
            font-size: 3.05mm;
            color: #d8d1bf;
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
            padding: 1.6mm 2.8mm;
            border: 0.4mm solid rgba(255,247,220,0.45);
            border-radius: 999px;
            font-size: 2.9mm;
            line-height: 1.2;
            color: #fff8e5;
            background: rgba(255,255,255,0.05);
          }

          .timeline,
          .card-list {
            display: grid;
            gap: 5mm;
          }

          .entry {
            position: relative;
          }

          .entry::before {
            content: "";
            position: absolute;
            left: -4mm;
            top: 1.4mm;
            width: 2mm;
            height: 2mm;
            background: #161616;
            border-radius: 50%;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4mm;
            margin-bottom: 1.6mm;
          }

          .entry-title-wrap {
            min-width: 0;
            flex: 1 1 auto;
          }

          .entry-title {
            font-size: 3.9mm;
            line-height: 1.25;
            font-weight: 800;
            color: #141414;
          }

          .entry-subtitle {
            margin-top: 0.6mm;
            font-size: 3.15mm;
            color: #4a4a4a;
            font-style: italic;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 2.95mm;
            color: #2f2f2f;
            padding: 1mm 2mm;
            border: 0.35mm solid #222;
            border-radius: 999px;
            white-space: nowrap;
            background: rgba(255,255,255,0.6);
          }

          .bullet-list {
            margin: 1.4mm 0 0 0;
            padding-left: 4.5mm;
          }

          .bullet-list li {
            margin-bottom: 1.2mm;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 2mm;
          }

          .tag {
            display: inline-block;
            padding: 1mm 2mm;
            border-radius: 999px;
            background: #1a1a1a;
            color: #f7f2e8;
            font-size: 2.75mm;
            line-height: 1.2;
            white-space: nowrap;
          }

          .entry-link,
          .meta-inline {
            margin-top: 1.6mm;
            font-size: 3mm;
            color: #333;
          }

          .project-card,
          .achievement-card,
          .cert-card {
            padding: 3mm 3.2mm 0 0;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>
      `;

      const html = `
        <div class="page">
          <div class="sidebar">
            ${this.renderContact(lang)}
            ${this.renderLanguages(lang)}
            ${this.renderSkills(lang)}
          </div>
          <div class="main">
            ${this.renderHeader()}
            ${this.renderProfile(lang)}
            ${this.renderExperience(lang)}
            ${this.renderProjects(lang)}
            ${this.renderAchievements(lang)}
            ${this.renderEducation(lang)}
            ${this.renderCertifications(lang)}
          </div>
        </div>
      `;

      this.shadowRoot.innerHTML = `${styles}${html}`;
    }
  }

  if (!customElements.get('gqr-resume-beach-v2')) {
    customElements.define('gqr-resume-beach-v2', GQRResumeBeachV2);
  }
})();