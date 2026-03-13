/**
 * name: gqr-resume-onyx
 * description: "Estilo sobrio en blanco y negro con barra superior oscura, nombre destacado, contacto en chips y secciones con títulos en mayúsculas y líneas sutiles; tipografía moderna y jerarquía clara tipo ‘corporate’."
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
  
      // Accept: YYYY-MM, YYYY-MM-DD, YYYY/MM, YYYY/MM/DD, or Date-ish strings
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
        // Fallback
        const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthsEs = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const m = dt.getMonth();
        const y = dt.getFullYear();
        return (lang === 'es' ? monthsEs[m] : monthsEn[m]) + ' ' + y;
      }
    }
  
    // Required: date range formatter using Present/Presente for:
    // - experience: isCurrent === true
    // - education: isCompleted === false
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
        profile: 'Sobre mí',
        experience: 'Experiencia',
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
  
    class GQRResumeOnyx extends HTMLElement {
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
  
      attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'language' && oldValue !== newValue) {
          this.render();
        }
      }
  
      connectedCallback() {
        if (!this._renderedOnce) {
          this.render();
        }
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
  
        // Contact chips (render only if value exists)
        const chips = [];
        if (email) chips.push({ icon: '✉', label: email, href: 'mailto:' + email });
        if (phone) chips.push({ icon: '☎', label: phone, href: '' });
        if (country) chips.push({ icon: '⚲', label: country, href: '' });
        if (linkedinRaw) chips.push({ icon: '🔗', label: linkedinRaw, href: linkedin });
  
        const chipsHtml = chips
          .map((c, idx) => {
            const content = `<span class="chip-ic" aria-hidden="true">${escapeHtml(c.icon)}</span><span class="chip-txt">${escapeHtml(
              c.label
            )}</span>`;
            if (c.href) {
              return `<a class="chip" data-entry-id="contact-${idx}" href="${escapeHtml(c.href)}" target="_blank" rel="noopener noreferrer">${content}</a>`;
            }
            return `<span class="chip" data-entry-id="contact-${idx}">${content}</span>`;
          })
          .join('');
  
        const headerHtml = `
          <section class="header" data-section="header">
            <div class="header-inner">
              <div class="name">${escapeHtml(fullName || ' ')}</div>
              ${
                profession
                  ? `<div class="profession">${escapeHtml(profession)}</div>`
                  : `<div class="profession profession--empty"></div>`
              }
            </div>
          </section>
          ${
            chipsHtml
              ? `<section class="contact" data-section="contact">
                   <div class="contact-title">${escapeHtml(this.t('contact'))}</div>
                   <div class="chips">${chipsHtml}</div>
                 </section>`
              : ''
          }
        `;
  
        return headerHtml;
      }
  
      renderProfile() {
        const summary = safeStr((this._data || {}).summary).trim();
        if (!summary) return '';
        return `
          <section class="section" data-section="profile">
            <h2 class="section-title">${escapeHtml(this.t('profile'))}</h2>
            <div class="section-body">
              <p class="text">${escapeHtml(summary)}</p>
            </div>
          </section>
        `;
      }
  
      renderSkills() {
        const d = this._data || {};
        const skills = uniqStrings([...(safeArr(d.skillsRaw)), ...(safeArr(d.toolsRaw))]);
        if (!skills.length) return '';
  
        const items = skills
          .map((s, i) => `<span class="badge" data-entry-id="skill-${i}">${escapeHtml(s)}</span>`)
          .join('');
  
        return `
          <section class="section" data-section="skills">
            <h2 class="section-title">${escapeHtml(this.t('skills'))}</h2>
            <div class="section-body">
              <div class="badges">${items}</div>
            </div>
          </section>
        `;
      }
  
      renderExperience() {
        const lang = this.getLanguage();
        const exp = safeArr((this._data || {}).experience);
        const normalized = exp.filter((e) => e && typeof e === 'object');
  
        if (!normalized.length) return '';
  
        const items = normalized
          .map((e) => {
            const id = safeStr(e.id) || 'exp-' + Math.random().toString(36).slice(2);
            const title = safeStr(e.title).trim();
            const company = safeStr(e.company).trim();
            const location = safeStr(e.location).trim();
            const startDate = safeStr(e.startDate).trim();
            const endDate = safeStr(e.endDate).trim();
            const isCurrent = !!e.isCurrent;
  
            const dateRange = formatDateRange(startDate, endDate, { lang, isCurrent });
            const metaParts = [];
            if (company) metaParts.push(company);
            if (location) metaParts.push(location);
  
            const bullets = [
              ...uniqStrings(safeArr(e.achievements)),
              ...uniqStrings(safeArr(e.responsibilities)),
            ].filter(Boolean);
  
            const bulletsHtml = bullets.length
              ? `<ul class="bullets">
                  ${bullets
                    .map((b, i) => `<li data-entry-id="${escapeHtml(id)}-b${i}">${escapeHtml(b)}</li>`)
                    .join('')}
                 </ul>`
              : '';
  
            return `
              <article class="entry" data-entry-id="${escapeHtml(id)}">
                <div class="entry-head">
                  <div class="entry-title">${escapeHtml(title || company || ' ')}</div>
                  ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                </div>
                ${metaParts.length ? `<div class="entry-sub">${escapeHtml(metaParts.join(' • '))}</div>` : ''}
                ${bulletsHtml}
              </article>
            `;
          })
          .join('');
  
        return `
          <section class="section" data-section="experience">
            <h2 class="section-title">${escapeHtml(this.t('experience'))}</h2>
            <div class="section-body entries">
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
            const desc = safeStr(p.description).trim();
            const tech = uniqStrings(safeArr(p.technologies));
            const urlRaw = safeStr(p.url).trim();
            const url = normalizeUrl(urlRaw);
  
            const techHtml = tech.length
              ? `<div class="meta-row">
                   ${tech.map((t, i) => `<span class="pill" data-entry-id="${escapeHtml(id)}-t${i}">${escapeHtml(t)}</span>`).join('')}
                 </div>`
              : '';
  
            const urlHtml = urlRaw
              ? `<div class="meta-row">
                   <a class="link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(urlRaw)}</a>
                 </div>`
              : '';
  
            return `
              <article class="entry" data-entry-id="${escapeHtml(id)}">
                <div class="entry-head">
                  <div class="entry-title">${escapeHtml(name || ' ')}</div>
                </div>
                ${desc ? `<div class="text">${escapeHtml(desc)}</div>` : ''}
                ${techHtml}
                ${urlHtml}
              </article>
            `;
          })
          .join('');
  
        return `
          <section class="section" data-section="projects">
            <h2 class="section-title">${escapeHtml(this.t('projects'))}</h2>
            <div class="section-body entries">
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
            const desc = safeStr(a.description).trim();
            const year = safeStr(a.year).trim();
  
            return `
              <article class="entry" data-entry-id="${escapeHtml(id)}">
                <div class="entry-head">
                  <div class="entry-title">${escapeHtml(title || ' ')}</div>
                  ${year ? `<div class="entry-date">${escapeHtml(year)}</div>` : ''}
                </div>
                ${desc ? `<div class="text">${escapeHtml(desc)}</div>` : ''}
              </article>
            `;
          })
          .join('');
  
        return `
          <section class="section" data-section="achievements">
            <h2 class="section-title">${escapeHtml(this.t('achievements'))}</h2>
            <div class="section-body entries">
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
            const isCurrent = isCompleted === false; // required: Present if isCompleted === false
  
            const dateRange = formatDateRange(startDate, endDate, { lang, isCurrent });
  
            const titleParts = [];
            if (degree) titleParts.push(degree);
            if (field) titleParts.push(field);
  
            const subParts = [];
            if (institution) subParts.push(institution);
            if (gpa) subParts.push('GPA: ' + gpa);
  
            return `
              <article class="entry" data-entry-id="${escapeHtml(id)}">
                <div class="entry-head">
                  <div class="entry-title">${escapeHtml(titleParts.join(' — ') || institution || ' ')}</div>
                  ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                </div>
                ${subParts.length ? `<div class="entry-sub">${escapeHtml(subParts.join(' • '))}</div>` : ''}
              </article>
            `;
          })
          .join('');
  
        return `
          <section class="section" data-section="education">
            <h2 class="section-title">${escapeHtml(this.t('education'))}</h2>
            <div class="section-body entries">
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
                <div class="entry-head">
                  <div class="entry-title">${escapeHtml(name || ' ')}</div>
                  ${dateLabel ? `<div class="entry-date">${escapeHtml(dateLabel)}</div>` : ''}
                </div>
                ${issuer ? `<div class="entry-sub">${escapeHtml(issuer)}</div>` : ''}
              </article>
            `;
          })
          .join('');
  
        return `
          <section class="section" data-section="certifications">
            <h2 class="section-title">${escapeHtml(this.t('certifications'))}</h2>
            <div class="section-body entries">
              ${items}
            </div>
          </section>
        `;
      }
  
      renderLanguages() {
        const langs = safeArr((this._data || {}).languages).filter((l) => l && typeof l === 'object');
        if (!langs.length) return '';
  
        const items = langs
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
            <h2 class="section-title">${escapeHtml(this.t('languages'))}</h2>
            <div class="section-body">
              <div class="lang-list">
                ${items}
              </div>
            </div>
          </section>
        `;
      }
  
      render() {
        this._renderedOnce = true;
  
        const lang = this.getLanguage();
        const dict = I18N[lang] || I18N.en;
  
        // Strict order (single-column):
        // 1 Header (name, profession, contact)
        // 2 Profile
        // 3 Skills
        // 4 Work Experience
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
  
        const html = `
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  
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
              background: #ffffff;
              color: #111111;
              box-sizing: border-box;
              padding: 40px 42px;
              font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji",
                "Segoe UI Emoji";
            }
  
            /* Top "onyx" bar inspired by the reference's dark block */
            .header {
              background: #0f141a;
              color: #ffffff;
              border-radius: 14px;
              padding: 22px 22px 18px;
              margin-bottom: 14px;
            }
  
            .header-inner {
              display: flex;
              flex-direction: column;
              gap: 6px;
            }
  
            .name {
              font-size: 30px;
              line-height: 1.05;
              letter-spacing: 0.4px;
              font-weight: 800;
              text-transform: uppercase;
            }
  
            .profession {
              font-size: 13px;
              letter-spacing: 0.6px;
              text-transform: uppercase;
              opacity: 0.9;
              font-weight: 600;
            }
  
            .profession--empty {
              min-height: 16px;
            }
  
            .contact {
              margin: 0 0 18px 0;
              padding: 12px 14px;
              border: 1px solid #e7e7e7;
              border-radius: 12px;
            }
  
            .contact-title {
              font-size: 11px;
              letter-spacing: 0.7px;
              text-transform: uppercase;
              color: #0f141a;
              font-weight: 700;
              margin-bottom: 10px;
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
              border: 1px solid #dcdcdc;
              background: #ffffff;
              color: #111111;
              padding: 7px 10px;
              border-radius: 999px;
              font-size: 12px;
              text-decoration: none;
              line-height: 1.2;
            }
  
            .chip:hover {
              border-color: #bdbdbd;
            }
  
            .chip-ic {
              width: 18px;
              height: 18px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 6px;
              background: #0f141a;
              color: #ffffff;
              font-size: 12px;
              flex: 0 0 18px;
            }
  
            .chip-txt {
              white-space: nowrap;
            }
  
            .section {
              margin-top: 14px;
            }
  
            /* Section title with uppercase + underline line (like the reference separators) */
            .section-title {
              margin: 0 0 10px 0;
              font-size: 12px;
              letter-spacing: 0.8px;
              text-transform: uppercase;
              font-weight: 800;
              color: #0f141a;
              position: relative;
              padding-bottom: 8px;
            }
  
            .section-title::after {
              content: "";
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              height: 1px;
              background: #d9d9d9;
            }
  
            .section-body {
              font-size: 12.5px;
            }
  
            .text {
              margin: 0;
              color: #141414;
              line-height: 1.55;
              white-space: pre-wrap;
            }
  
            .badges {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
            }
  
            .badge {
              display: inline-flex;
              align-items: center;
              border: 1px solid #dcdcdc;
              padding: 7px 10px;
              border-radius: 999px;
              font-size: 12px;
              background: #fafafa;
            }
  
            .entries {
              display: flex;
              flex-direction: column;
              gap: 12px;
            }
  
            .entry {
              padding: 10px 12px;
              border: 1px solid #ededed;
              border-radius: 12px;
              background: #ffffff;
            }
  
            .entry-head {
              display: flex;
              gap: 12px;
              justify-content: space-between;
              align-items: baseline;
            }
  
            .entry-title {
              font-weight: 800;
              color: #0f141a;
              font-size: 13px;
              line-height: 1.25;
            }
  
            .entry-date {
              font-size: 11.5px;
              color: #3d3d3d;
              white-space: nowrap;
              font-weight: 600;
            }
  
            .entry-sub {
              margin-top: 4px;
              font-size: 12px;
              color: #2c2c2c;
              font-weight: 600;
            }
  
            .bullets {
              margin: 8px 0 0 18px;
              padding: 0;
            }
  
            .bullets li {
              margin: 4px 0;
              color: #141414;
              line-height: 1.5;
            }
  
            .meta-row {
              margin-top: 8px;
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
              background: #0f141a;
              color: #ffffff;
              font-size: 11px;
              font-weight: 600;
            }
  
            .link {
              color: #0f141a;
              font-weight: 700;
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
              color: #0f141a;
            }
  
            .lang-level {
              font-weight: 700;
              color: #2f2f2f;
              white-space: nowrap;
            }
  
            @media print {
              .page {
                width: 210mm;
                min-height: 297mm;
              }
            }
          </style>
  
          <div class="page" aria-label="Resume (${escapeHtml(lang)})">
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
  
        this.shadowRoot.innerHTML = html;
      }
    }
  
    if (!customElements.get('gqr-resume-onyx')) {
      customElements.define('gqr-resume-onyx', GQRResumeOnyx);
    }
  })();