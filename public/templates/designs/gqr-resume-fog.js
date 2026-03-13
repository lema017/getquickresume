/**
 * name: gqr-resume-fog
 * description: "Estilo limpio gris claro con encabezado suave, nombre grande y secciones con títulos en mayúsculas y subrayado corto; tarjetas minimalistas, bullets discretos y tipografía moderna."
 */
(function () {
    'use strict';
  
    // -----------------------------
    // Utilities (required)
    // -----------------------------
    function safeStr(v) {
      if (v === null || v === undefined) return '';
      if (typeof v === 'string') return v;
      if (typeof v === 'number' || typeof v === 'boolean') return String(v);
      return '';
    }
  
    function safeArr(v) {
      return Array.isArray(v) ? v : [];
    }
  
    function escapeHtml(t) {
      const s = safeStr(t);
      return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  
    function uniqStrings(arr) {
      const out = [];
      const seen = new Set();
      for (const raw of safeArr(arr)) {
        const v = safeStr(raw).trim();
        if (!v) continue;
        const key = v.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(v);
      }
      return out;
    }
  
    function normalizeUrl(u) {
      const s = safeStr(u).trim();
      if (!s) return '';
      if (/^https?:\/\//i.test(s)) return s;
      return 'https://' + s;
    }
  
    function parseDateMaybe(d) {
      const s = safeStr(d).trim();
      if (!s) return null;
  
      let iso = s;
      if (/^\d{4}[-/]\d{2}$/.test(s)) {
        iso = s.replace(/\//g, '-') + '-01';
      } else if (/^\d{4}[-/]\d{2}[-/]\d{2}$/.test(s)) {
        iso = s.replace(/\//g, '-');
      }
  
      const dt = new Date(iso);
      if (Number.isNaN(dt.getTime())) return null;
      return dt;
    }
  
    function formatMonthYear(d, lang) {
      const dt = parseDateMaybe(d);
      if (!dt) return '';
      const locale = lang === 'es' ? 'es' : 'en';
      try {
        return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(dt);
      } catch (_) {
        const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthsEs = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const m = dt.getMonth();
        const y = dt.getFullYear();
        return (lang === 'es' ? monthsEs[m] : monthsEn[m]) + ' ' + y;
      }
    }
  
    // Required: date range formatter with Present/Presente rules:
    // - experience: isCurrent === true -> Present/Presente
    // - education: isCompleted === false -> Present/Presente
    function formatDateRange(startDate, endDate, opts) {
      const lang = opts && opts.lang === 'es' ? 'es' : 'en';
      const isCurrent = !!(opts && opts.isCurrent);
      const presentText = lang === 'es' ? 'Presente' : 'Present';
  
      const s = formatMonthYear(startDate, lang);
      const e = isCurrent ? presentText : formatMonthYear(endDate, lang);
  
      if (s && e) return s + ' — ' + e;
      if (s && !e && isCurrent) return s + ' — ' + presentText;
      if (s) return s;
      if (e) return e;
      return '';
    }
  
    // -----------------------------
    // i18n (required)
    // -----------------------------
    const I18N = {
      en: {
        profile: 'Profile',
        experience: 'Work Experience',
        education: 'Education',
        projects: 'Projects',
        certifications: 'Certifications',
        languages: 'Languages',
        achievements: 'Achievements',
        skills: 'Skills',
        present: 'Present',
        contact: 'Contact',
        levelMap: {
          basic: 'Basic',
          intermediate: 'Intermediate',
          advanced: 'Advanced',
          native: 'Native',
        },
      },
      es: {
        profile: 'Acerca de mí',
        experience: 'Experiencia laboral',
        education: 'Educación',
        projects: 'Proyectos',
        certifications: 'Certificaciones',
        languages: 'Idiomas',
        achievements: 'Logros',
        skills: 'Habilidades',
        present: 'Presente',
        contact: 'Contacto',
        levelMap: {
          basic: 'Básico',
          intermediate: 'Intermedio',
          advanced: 'Avanzado',
          native: 'Nativo',
        },
      },
    };
  
    class GQRResumeFog extends HTMLElement {
      static get observedAttributes() {
        return ['language'];
      }
  
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._data = {};
        this._renderedOnce = false;
      }
  
      set data(v) {
        this._data = v && typeof v === 'object' ? v : {};
        this.render();
      }
  
      get data() {
        return this._data;
      }
  
      connectedCallback() {
        if (!this._renderedOnce) this.render();
      }
  
      attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'language' && oldValue !== newValue) this.render();
      }
  
      getLanguage() {
        const attr = safeStr(this.getAttribute('language')).toLowerCase();
        if (attr === 'es' || attr === 'en') return attr;
  
        const dlang = safeStr(this._data && this._data.language).toLowerCase();
        if (dlang === 'es' || dlang === 'en') return dlang;
  
        return 'en';
      }
  
      t(key) {
        const lang = this.getLanguage();
        const dict = I18N[lang] || I18N.en;
        return dict[key] || (I18N.en && I18N.en[key]) || key;
      }
  
      levelLabel(level) {
        const lang = this.getLanguage();
        const dict = I18N[lang] || I18N.en;
        const lm = dict.levelMap || I18N.en.levelMap;
        const k = safeStr(level).toLowerCase();
        return lm[k] || safeStr(level);
      }
  
      hasHeader() {
        const h = this._data || {};
        return !!(
          safeStr(h.firstName).trim() ||
          safeStr(h.lastName).trim() ||
          safeStr(h.profession).trim() ||
          safeStr(h.email).trim() ||
          safeStr(h.phone).trim() ||
          safeStr(h.country).trim() ||
          safeStr(h.linkedin).trim()
        );
      }
  
      renderHeader() {
        const d = this._data || {};
        const firstName = safeStr(d.firstName).trim();
        const lastName = safeStr(d.lastName).trim();
        const profession = safeStr(d.profession).trim();
        const email = safeStr(d.email).trim();
        const phone = safeStr(d.phone).trim();
        const country = safeStr(d.country).trim();
        const linkedinRaw = safeStr(d.linkedin).trim();
        const linkedin = normalizeUrl(linkedinRaw);
  
        const fullName = (firstName + ' ' + lastName).trim();
  
        const chips = [];
        if (phone) chips.push({ icon: '☎', label: phone, href: '' });
        if (email) chips.push({ icon: '✉', label: email, href: 'mailto:' + email });
        if (linkedinRaw) chips.push({ icon: '🔗', label: linkedinRaw, href: linkedin });
        if (country) chips.push({ icon: '⚲', label: country, href: '' });
  
        const chipsHtml = chips
          .map((c, idx) => {
            const inner = `<span class="chip-ic" aria-hidden="true">${escapeHtml(c.icon)}</span><span class="chip-txt">${escapeHtml(
              c.label
            )}</span>`;
            if (c.href) {
              return `<a class="chip" data-entry-id="contact-${idx}" href="${escapeHtml(
                c.href
              )}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
            }
            return `<span class="chip" data-entry-id="contact-${idx}">${inner}</span>`;
          })
          .join('');
  
        return `
          <section class="hero" data-section="header">
            <div class="hero-row">
              <div class="hero-left">
                <div class="hero-name">${escapeHtml(fullName || ' ')}</div>
                ${
                  profession
                    ? `<div class="hero-prof">${escapeHtml(profession)}</div>`
                    : `<div class="hero-prof hero-prof--empty"></div>`
                }
              </div>
            </div>
            ${
              chipsHtml
                ? `<div class="hero-contact" data-section="contact">
                     <div class="chips">${chipsHtml}</div>
                   </div>`
                : ''
            }
          </section>
        `;
      }
  
      renderProfile() {
        const summary = safeStr((this._data || {}).summary).trim();
        if (!summary) return '';
        return `
          <section class="section" data-section="profile">
            ${this.renderTitle(this.t('profile'))}
            <div class="card card--text">
              <p class="text">${escapeHtml(summary)}</p>
            </div>
          </section>
        `;
      }
  
      renderSkills() {
        const d = this._data || {};
        const skills = uniqStrings([...(safeArr(d.skillsRaw)), ...(safeArr(d.toolsRaw))]);
        if (!skills.length) return '';

        const badges = skills
          .map((s, i) => `<span class="skill-badge" data-entry-id="skill-${i}">${escapeHtml(s)}</span>`)
          .join('');

        return `
          <section class="section" data-section="skills">
            ${this.renderTitle(this.t('skills'))}
            <div class="card">
              <div class="skills-wrap">
                ${badges}
              </div>
            </div>
          </section>
        `;
      }
  
      renderExperience() {
        const lang = this.getLanguage();
        const exp = safeArr((this._data || {}).experience).filter((e) => e && typeof e === 'object');
        if (!exp.length) return '';
  
        const items = exp
          .map((e) => {
            const id = safeStr(e.id) || 'exp-' + Math.random().toString(36).slice(2);
            const title = safeStr(e.title).trim();
            const company = safeStr(e.company).trim();
            const location = safeStr(e.location).trim();
            const startDate = safeStr(e.startDate).trim();
            const endDate = safeStr(e.endDate).trim();
            const isCurrent = !!e.isCurrent;
  
            const dateRange = formatDateRange(startDate, endDate, { lang, isCurrent });
            const headline = title || company || ' ';
  
            const meta = [company && company !== title ? company : '', location].filter(Boolean).join(' • ');
  
            const bullets = [
              ...uniqStrings(safeArr(e.achievements)),
              ...uniqStrings(safeArr(e.responsibilities)),
            ].filter(Boolean);
  
            return `
              <article class="entry" data-entry-id="${escapeHtml(id)}">
                <div class="entry-top">
                  <div class="entry-title">${escapeHtml(headline)}</div>
                  ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                </div>
                ${meta ? `<div class="entry-meta">${escapeHtml(meta)}</div>` : ''}
                ${
                  bullets.length
                    ? `<ul class="bullets">
                        ${bullets
                          .map((b, i) => `<li data-entry-id="${escapeHtml(id)}-b${i}">${escapeHtml(b)}</li>`)
                          .join('')}
                      </ul>`
                    : ''
                }
              </article>
            `;
          })
          .join('');
  
        return `
          <section class="section" data-section="experience">
            ${this.renderTitle(this.t('experience'))}
            <div class="stack">
              ${items}
            </div>
          </section>
        `;
      }
  
      renderProjects() {
        const projects = safeArr((this._data || {}).projects).filter((p) => p && typeof p === 'object');
        if (!projects.length) return '';
  
        const items = projects
          .map((p) => {
            const id = safeStr(p.id) || 'proj-' + Math.random().toString(36).slice(2);
            const name = safeStr(p.name).trim();
            const description = safeStr(p.description).trim();
            const technologies = uniqStrings(safeArr(p.technologies));
            const urlRaw = safeStr(p.url).trim();
            const url = normalizeUrl(urlRaw);
  
            return `
              <article class="entry" data-entry-id="${escapeHtml(id)}">
                <div class="entry-top">
                  <div class="entry-title">${escapeHtml(name || ' ')}</div>
                </div>
                ${description ? `<div class="text text--tight">${escapeHtml(description)}</div>` : ''}
                ${
                  technologies.length
                    ? `<div class="pills">
                        ${technologies
                          .map((t, i) => `<span class="pill" data-entry-id="${escapeHtml(id)}-t${i}">${escapeHtml(t)}</span>`)
                          .join('')}
                      </div>`
                    : ''
                }
                ${
                  urlRaw
                    ? `<div class="pills">
                        <a class="link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(urlRaw)}</a>
                      </div>`
                    : ''
                }
              </article>
            `;
          })
          .join('');
  
        return `
          <section class="section" data-section="projects">
            ${this.renderTitle(this.t('projects'))}
            <div class="stack">
              ${items}
            </div>
          </section>
        `;
      }
  
      renderAchievements() {
        const ach = safeArr((this._data || {}).achievements).filter((a) => a && typeof a === 'object');
        if (!ach.length) return '';
  
        const items = ach
          .map((a) => {
            const id = safeStr(a.id) || 'ach-' + Math.random().toString(36).slice(2);
            const title = safeStr(a.title).trim();
            const description = safeStr(a.description).trim();
            const year = safeStr(a.year).trim();
  
            return `
              <article class="entry" data-entry-id="${escapeHtml(id)}">
                <div class="entry-top">
                  <div class="entry-title">${escapeHtml(title || ' ')}</div>
                  ${year ? `<div class="entry-date">${escapeHtml(year)}</div>` : ''}
                </div>
                ${description ? `<div class="text text--tight">${escapeHtml(description)}</div>` : ''}
              </article>
            `;
          })
          .join('');
  
        return `
          <section class="section" data-section="achievements">
            ${this.renderTitle(this.t('achievements'))}
            <div class="stack">
              ${items}
            </div>
          </section>
        `;
      }
  
      renderEducation() {
        const lang = this.getLanguage();
        const edu = safeArr((this._data || {}).education).filter((e) => e && typeof e === 'object');
        if (!edu.length) return '';
  
        const items = edu
          .map((e) => {
            const id = safeStr(e.id) || 'edu-' + Math.random().toString(36).slice(2);
            const degree = safeStr(e.degree).trim();
            const field = safeStr(e.field).trim();
            const institution = safeStr(e.institution).trim();
            const gpa = safeStr(e.gpa).trim();
            const startDate = safeStr(e.startDate).trim();
            const endDate = safeStr(e.endDate).trim();
            const isCompleted = e.isCompleted;
            const isCurrent = isCompleted === false;
  
            const dateRange = formatDateRange(startDate, endDate, { lang, isCurrent });
            const title = [degree, field].filter(Boolean).join(' — ') || institution || ' ';
            const sub = [institution, gpa ? 'GPA: ' + gpa : ''].filter(Boolean).join(' • ');
  
            return `
              <article class="entry" data-entry-id="${escapeHtml(id)}">
                <div class="entry-top">
                  <div class="entry-title">${escapeHtml(title)}</div>
                  ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                </div>
                ${sub ? `<div class="entry-meta">${escapeHtml(sub)}</div>` : ''}
              </article>
            `;
          })
          .join('');
  
        return `
          <section class="section" data-section="education">
            ${this.renderTitle(this.t('education'))}
            <div class="stack">
              ${items}
            </div>
          </section>
        `;
      }
  
      renderCertifications() {
        const lang = this.getLanguage();
        const certs = safeArr((this._data || {}).certifications).filter((c) => c && typeof c === 'object');
        if (!certs.length) return '';
  
        const items = certs
          .map((c) => {
            const id = safeStr(c.id) || 'cert-' + Math.random().toString(36).slice(2);
            const name = safeStr(c.name).trim();
            const issuer = safeStr(c.issuer).trim();
            const date = safeStr(c.date).trim();
            const dateLabel = date ? formatMonthYear(date, lang) || date : '';
  
            return `
              <article class="entry" data-entry-id="${escapeHtml(id)}">
                <div class="entry-top">
                  <div class="entry-title">${escapeHtml(name || ' ')}</div>
                  ${dateLabel ? `<div class="entry-date">${escapeHtml(dateLabel)}</div>` : ''}
                </div>
                ${issuer ? `<div class="entry-meta">${escapeHtml(issuer)}</div>` : ''}
              </article>
            `;
          })
          .join('');
  
        return `
          <section class="section" data-section="certifications">
            ${this.renderTitle(this.t('certifications'))}
            <div class="stack">
              ${items}
            </div>
          </section>
        `;
      }
  
      renderLanguages() {
        const langs = safeArr((this._data || {}).languages).filter((l) => l && typeof l === 'object');
        if (!langs.length) return '';
  
        const rows = langs
          .map((l) => {
            const id = safeStr(l.id) || 'lang-' + Math.random().toString(36).slice(2);
            const name = safeStr(l.name).trim();
            const level = safeStr(l.level).trim();
            const label = level ? this.levelLabel(level) : '';
            return `
              <div class="lang-row" data-entry-id="${escapeHtml(id)}">
                <div class="lang-name">${escapeHtml(name || ' ')}</div>
                ${label ? `<div class="lang-level">${escapeHtml(label)}</div>` : ''}
              </div>
            `;
          })
          .join('');
  
        return `
          <section class="section" data-section="languages">
            ${this.renderTitle(this.t('languages'))}
            <div class="card">
              <div class="lang-list">
                ${rows}
              </div>
            </div>
          </section>
        `;
      }
  
      // title style inspired by the minimal underlined headers
      renderTitle(label) {
        return `
          <div class="title">
            <div class="title-text">${escapeHtml(label)}</div>
            <div class="title-line" aria-hidden="true"></div>
          </div>
        `;
      }
  
      render() {
        this._renderedOnce = true;
  
        // Strict order (single-column):
        // 1 Header
        // 2 Profile
        // 3 Skills
        // 4 Experience
        // 5 Projects
        // 6 Achievements
        // 7 Education
        // 8 Certifications
        // 9 Languages
        const header = this.hasHeader() ? this.renderHeader() : '';
        const profile = this.renderProfile();
        const skills = this.renderSkills();
        const experience = this.renderExperience();
        const projects = this.renderProjects();
        const achievements = this.renderAchievements();
        const education = this.renderEducation();
        const certifications = this.renderCertifications();
        const languages = this.renderLanguages();
  
        this.shadowRoot.innerHTML = `
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  
            :host {
              display: block;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
  
            .page {
              width: 210mm;
              min-height: 297mm;
              height: auto;
              overflow: visible;
              box-sizing: border-box;
              background: #ffffff;
              color: #1a1a1a;
              padding: 40px 42px;
              font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji",
                "Segoe UI Emoji";
            }
  
            /* Soft gray header band (no photo) */
            .hero {
              background: #d8d6d6;
              border-radius: 14px;
              padding: 20px 22px 14px;
              margin-bottom: 14px;
              border: 1px solid #d1d1d1;
            }
  
            .hero-row {
              display: flex;
              gap: 14px;
              align-items: flex-end;
              justify-content: space-between;
            }
  
            .hero-left {
              display: flex;
              flex-direction: column;
              gap: 6px;
              min-width: 0;
            }
  
            .hero-name {
              font-size: 30px;
              line-height: 1.05;
              font-weight: 800;
              color: #3a3a3a;
              letter-spacing: 0.2px;
            }
  
            .hero-prof {
              font-size: 11px;
              font-weight: 800;
              letter-spacing: 1px;
              text-transform: uppercase;
              color: #555555;
            }
  
            .hero-prof--empty { min-height: 14px; }
  
            .hero-contact {
              margin-top: 12px;
            }
  
            .chips {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
            }
  
            .chip {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              padding: 7px 10px;
              border-radius: 999px;
              border: 1px solid rgba(0,0,0,0.14);
              background: rgba(255,255,255,0.55);
              color: #222222;
              font-size: 12px;
              text-decoration: none;
              line-height: 1.2;
            }
  
            .chip:hover {
              border-color: rgba(0,0,0,0.22);
              background: rgba(255,255,255,0.75);
            }
  
            .chip-ic {
              width: 18px;
              height: 18px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 6px;
              background: rgba(0,0,0,0.10);
              color: #1f1f1f;
              font-size: 12px;
              flex: 0 0 18px;
            }
  
            .chip-txt { white-space: nowrap; }
  
            .section { margin-top: 14px; }
  
            /* Minimal title + underline */
            .title {
              display: flex;
              flex-direction: column;
              gap: 8px;
              margin: 0 0 10px 0;
            }
  
            .title-text {
              font-size: 11px;
              letter-spacing: 1px;
              text-transform: uppercase;
              font-weight: 800;
              color: #2a2a2a;
            }
  
            .title-line {
              height: 2px;
              width: 34px;
              background: #2a2a2a;
              border-radius: 2px;
            }
  
            .card {
              background: #ffffff;
              border: 1px solid #ededed;
              border-radius: 12px;
              padding: 12px 12px;
            }
  
            .card--text { padding: 12px 14px; }
  
            .text {
              margin: 0;
              color: #222222;
              line-height: 1.55;
              white-space: pre-wrap;
              font-size: 12.5px;
            }
  
            .text--tight { margin-top: 6px; }

            .skills-wrap {
              display: flex;
              flex-wrap: wrap;
              gap: 6px 10px;
            }

            .skill-badge {
              display: inline-block;
              padding: 4px 10px;
              border-radius: 14px;
              background: #f0f0f0;
              border: 1px solid #dedede;
              font-size: 11px;
              font-weight: 600;
              color: #222222;
              white-space: nowrap;
            }

            .stack {
              display: flex;
              flex-direction: column;
              gap: 12px;
            }
  
            .entry {
              background: #ffffff;
              border: 1px solid #ededed;
              border-radius: 12px;
              padding: 12px 12px;
            }
  
            .entry-top {
              display: flex;
              justify-content: space-between;
              align-items: baseline;
              gap: 12px;
            }
  
            .entry-title {
              font-weight: 800;
              color: #1f1f1f;
              font-size: 13px;
              line-height: 1.25;
              word-break: break-word;
            }
  
            .entry-date {
              font-size: 11.5px;
              color: #444444;
              white-space: nowrap;
              font-weight: 700;
            }
  
            .entry-meta {
              margin-top: 4px;
              font-size: 12px;
              color: #3a3a3a;
              font-weight: 600;
            }
  
            .bullets {
              margin: 10px 0 0 18px;
              padding: 0;
            }
  
            .bullets li {
              margin: 4px 0;
              color: #222222;
              line-height: 1.5;
              font-size: 12.5px;
            }
  
            .pills {
              margin-top: 10px;
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
              align-items: center;
            }
  
            .pill {
              display: inline-flex;
              align-items: center;
              padding: 5px 9px;
              border-radius: 999px;
              background: #f0f0f0;
              color: #1f1f1f;
              border: 1px solid #dedede;
              font-size: 11px;
              font-weight: 700;
            }
  
            .link {
              color: #1f1f1f;
              font-weight: 800;
              text-decoration: underline;
              text-underline-offset: 2px;
              font-size: 12px;
            }
  
            .lang-list {
              display: flex;
              flex-direction: column;
              gap: 10px;
            }
  
            .lang-row {
              display: flex;
              justify-content: space-between;
              gap: 12px;
              padding: 10px 12px;
              border: 1px solid #ededed;
              border-radius: 12px;
              background: #ffffff;
            }
  
            .lang-name {
              font-weight: 800;
              color: #1f1f1f;
            }
  
            .lang-level {
              font-weight: 800;
              color: #333333;
              white-space: nowrap;
            }
  
            @media print {
              .page {
                width: 210mm;
                min-height: 297mm;
              }
            }
          </style>
  
          <div class="page" aria-label="Resume (${escapeHtml(this.getLanguage())})">
            ${header}
            ${profile}
            ${skills}
            ${experience}
            ${projects}
            ${achievements}
            ${education}
            ${certifications}
            ${languages}
          </div>
        `;
      }
    }
  
    if (!customElements.get('gqr-resume-fog')) {
      customElements.define('gqr-resume-fog', GQRResumeFog);
    }
  })();