/**
 * name: gqr-resume-atelier
 * description: "Estilo editorial con bandas gris claro, encabezado elegante con nombre grande y barra de contacto; secciones en filas tipo ‘label rail’ (etiqueta a la izquierda y contenido a la derecha) con líneas finas y espaciado limpio."
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
  
    // Required: Present/Presente rules:
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
        levelMap: { basic: 'Basic', intermediate: 'Intermediate', advanced: 'Advanced', native: 'Native' },
      },
      es: {
        profile: 'Acerca de mí',
        experience: 'Experiencia',
        education: 'Formación',
        projects: 'Proyectos',
        certifications: 'Certificaciones',
        languages: 'Idiomas',
        achievements: 'Logros',
        skills: 'Habilidades',
        present: 'Presente',
        contact: 'Contacto',
        levelMap: { basic: 'Básico', intermediate: 'Intermedio', advanced: 'Avanzado', native: 'Nativo' },
      },
    };
  
    class GQRResumeAtelier extends HTMLElement {
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
  
        const contactParts = [];
        if (phone) contactParts.push({ icon: '☎', label: phone, href: '' });
        if (email) contactParts.push({ icon: '✉', label: email, href: 'mailto:' + email });
        if (linkedinRaw) contactParts.push({ icon: '🔗', label: linkedinRaw, href: linkedin });
        if (country) contactParts.push({ icon: '⚲', label: country, href: '' });
  
        const contactHtml = contactParts.length
          ? `<div class="contactBar" data-section="contact">
               ${contactParts
                 .map((c, idx) => {
                   const inner = `<span class="cIc" aria-hidden="true">${escapeHtml(
                     c.icon
                   )}</span><span class="cTx">${escapeHtml(c.label)}</span>`;
                   if (c.href) {
                     return `<a class="cItem" data-entry-id="contact-${idx}" href="${escapeHtml(
                       c.href
                     )}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
                   }
                   return `<span class="cItem" data-entry-id="contact-${idx}">${inner}</span>`;
                 })
                 .join('')}
             </div>`
          : '';
  
        return `
          <section class="hero" data-section="header">
            <div class="heroInner">
              <div class="heroName">${escapeHtml(fullName || ' ')}</div>
              ${
                profession
                  ? `<div class="heroProf">${escapeHtml(profession)}</div>`
                  : `<div class="heroProf heroProf--empty"></div>`
              }
            </div>
          </section>
          ${contactHtml}
        `;
      }
  
      // FIX: ensure each section label lives INSIDE its own row and never overlaps:
      // - each rowSection is a grid row
      // - rail aligns to the top (not centered)
      // - no absolute positioning anywhere
      renderRowSection(sectionLabel, sectionId, contentHtml) {
        return `
          <section class="rowSection" data-section="${escapeHtml(sectionId)}">
            <div class="rail">
              <span class="railTxt">${escapeHtml(sectionLabel)}</span>
            </div>
            <div class="body">
              ${contentHtml}
            </div>
          </section>
        `;
      }
  
      renderProfile() {
        const summary = safeStr((this._data || {}).summary).trim();
        if (!summary) return '';
        return this.renderRowSection(this.t('profile'), 'profile', `<p class="para">${escapeHtml(summary)}</p>`);
      }
  
      renderSkills() {
        const d = this._data || {};
        const skills = uniqStrings([...(safeArr(d.skillsRaw)), ...(safeArr(d.toolsRaw))]);
        if (!skills.length) return '';
  
        const items = skills
          .map((s, i) => `<span class="tag" data-entry-id="skill-${i}">${escapeHtml(s)}</span>`)
          .join('');
  
        return this.renderRowSection(this.t('skills'), 'skills', `<div class="tags">${items}</div>`);
      }
  
      renderExperience() {
        const lang = this.getLanguage();
        const exp = safeArr((this._data || {}).experience).filter((e) => e && typeof e === 'object');
        if (!exp.length) return '';
  
        const entries = exp
          .map((e) => {
            const id = safeStr(e.id) || 'exp-' + Math.random().toString(36).slice(2);
            const title = safeStr(e.title).trim();
            const company = safeStr(e.company).trim();
            const location = safeStr(e.location).trim();
            const startDate = safeStr(e.startDate).trim();
            const endDate = safeStr(e.endDate).trim();
            const isCurrent = !!e.isCurrent;
  
            const dateRange = formatDateRange(startDate, endDate, { lang, isCurrent });
            const headLeft = title || company || ' ';
            const meta = [company && company !== title ? company : '', location].filter(Boolean).join(' • ');
  
            const bullets = [...uniqStrings(safeArr(e.achievements)), ...uniqStrings(safeArr(e.responsibilities))].filter(Boolean);
  
            return `
              <article class="entry" data-entry-id="${escapeHtml(id)}">
                <div class="entryHead">
                  <div class="entryTitle">${escapeHtml(headLeft)}</div>
                  ${dateRange ? `<div class="entryDate">${escapeHtml(dateRange)}</div>` : ''}
                </div>
                ${meta ? `<div class="entryMeta">${escapeHtml(meta)}</div>` : ''}
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
  
        return this.renderRowSection(this.t('experience'), 'experience', `<div class="stack">${entries}</div>`);
      }
  
      renderProjects() {
        const projects = safeArr((this._data || {}).projects).filter((p) => p && typeof p === 'object');
        if (!projects.length) return '';
  
        const entries = projects
          .map((p) => {
            const id = safeStr(p.id) || 'proj-' + Math.random().toString(36).slice(2);
            const name = safeStr(p.name).trim();
            const description = safeStr(p.description).trim();
            const technologies = uniqStrings(safeArr(p.technologies));
            const urlRaw = safeStr(p.url).trim();
            const url = normalizeUrl(urlRaw);
  
            return `
              <article class="entry" data-entry-id="${escapeHtml(id)}">
                <div class="entryHead">
                  <div class="entryTitle">${escapeHtml(name || ' ')}</div>
                </div>
                ${description ? `<p class="para para--tight">${escapeHtml(description)}</p>` : ''}
                ${
                  technologies.length
                    ? `<div class="chips">
                         ${technologies
                           .map((t, i) => `<span class="chip" data-entry-id="${escapeHtml(id)}-t${i}">${escapeHtml(t)}</span>`)
                           .join('')}
                       </div>`
                    : ''
                }
                ${
                  urlRaw
                    ? `<div class="chips">
                         <a class="link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(urlRaw)}</a>
                       </div>`
                    : ''
                }
              </article>
            `;
          })
          .join('');
  
        return this.renderRowSection(this.t('projects'), 'projects', `<div class="stack">${entries}</div>`);
      }
  
      renderAchievements() {
        const ach = safeArr((this._data || {}).achievements).filter((a) => a && typeof a === 'object');
        if (!ach.length) return '';
  
        const entries = ach
          .map((a) => {
            const id = safeStr(a.id) || 'ach-' + Math.random().toString(36).slice(2);
            const title = safeStr(a.title).trim();
            const description = safeStr(a.description).trim();
            const year = safeStr(a.year).trim();
  
            return `
              <article class="entry" data-entry-id="${escapeHtml(id)}">
                <div class="entryHead">
                  <div class="entryTitle">${escapeHtml(title || ' ')}</div>
                  ${year ? `<div class="entryDate">${escapeHtml(year)}</div>` : ''}
                </div>
                ${description ? `<p class="para para--tight">${escapeHtml(description)}</p>` : ''}
              </article>
            `;
          })
          .join('');
  
        return this.renderRowSection(this.t('achievements'), 'achievements', `<div class="stack">${entries}</div>`);
      }
  
      renderEducation() {
        const lang = this.getLanguage();
        const edu = safeArr((this._data || {}).education).filter((e) => e && typeof e === 'object');
        if (!edu.length) return '';
  
        const entries = edu
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
            const meta = [institution, gpa ? 'GPA: ' + gpa : ''].filter(Boolean).join(' • ');
  
            return `
              <article class="entry" data-entry-id="${escapeHtml(id)}">
                <div class="entryHead">
                  <div class="entryTitle">${escapeHtml(title)}</div>
                  ${dateRange ? `<div class="entryDate">${escapeHtml(dateRange)}</div>` : ''}
                </div>
                ${meta ? `<div class="entryMeta">${escapeHtml(meta)}</div>` : ''}
              </article>
            `;
          })
          .join('');
  
        return this.renderRowSection(this.t('education'), 'education', `<div class="stack">${entries}</div>`);
      }
  
      renderCertifications() {
        const lang = this.getLanguage();
        const certs = safeArr((this._data || {}).certifications).filter((c) => c && typeof c === 'object');
        if (!certs.length) return '';
  
        const entries = certs
          .map((c) => {
            const id = safeStr(c.id) || 'cert-' + Math.random().toString(36).slice(2);
            const name = safeStr(c.name).trim();
            const issuer = safeStr(c.issuer).trim();
            const date = safeStr(c.date).trim();
            const dateLabel = date ? formatMonthYear(date, lang) || date : '';
  
            return `
              <article class="entry" data-entry-id="${escapeHtml(id)}">
                <div class="entryHead">
                  <div class="entryTitle">${escapeHtml(name || ' ')}</div>
                  ${dateLabel ? `<div class="entryDate">${escapeHtml(dateLabel)}</div>` : ''}
                </div>
                ${issuer ? `<div class="entryMeta">${escapeHtml(issuer)}</div>` : ''}
              </article>
            `;
          })
          .join('');
  
        return this.renderRowSection(this.t('certifications'), 'certifications', `<div class="stack">${entries}</div>`);
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
              <div class="langRow" data-entry-id="${escapeHtml(id)}">
                <div class="langName">${escapeHtml(name || ' ')}</div>
                ${label ? `<div class="langLevel">${escapeHtml(label)}</div>` : ''}
              </div>
            `;
          })
          .join('');
  
        return this.renderRowSection(this.t('languages'), 'languages', `<div class="langList">${rows}</div>`);
      }
  
      render() {
        this._renderedOnce = true;
  
        // Strict order (single-column):
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
  
            *, *::before, *::after { box-sizing: border-box; }
  
            .page {
              width: 210mm;
              min-height: 297mm;
              height: auto;
              overflow: visible;
              background: #ffffff;
              color: #141414;
              padding: 36px 40px;
              font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
            }
  
            .hero {
              background: #efefef;
              border: 1px solid #e3e3e3;
              border-radius: 12px;
              padding: 18px;
              margin-bottom: 10px;
            }
  
            .heroInner { display: flex; flex-direction: column; gap: 6px; }
            .heroName { font-size: 30px; line-height: 1.05; font-weight: 800; color: #1a1a1a; }
            .heroProf { font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #4c4c4c; }
            .heroProf--empty { min-height: 14px; }
  
            .contactBar {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
              align-items: center;
              padding: 10px 12px;
              margin: 8px 0 12px 0;
              border-top: 2px solid #1b1b1b;
              border-bottom: 1px solid #dcdcdc;
            }
  
            .cItem {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              font-size: 12px;
              color: #1a1a1a;
              text-decoration: none;
              font-weight: 600;
            }
            .cItem:hover { text-decoration: underline; text-underline-offset: 2px; }
  
            .cIc {
              width: 18px;
              height: 18px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 6px;
              background: #1b1b1b;
              color: #ffffff;
              font-size: 12px;
              flex: 0 0 18px;
            }
            .cTx { white-space: nowrap; }
  
            /* -------------------------
               FIX for overlapping rails:
               - grid rows that stretch
               - rail aligned to TOP
               - rail text wraps safely
               - no positioning tricks
            -------------------------- */
            .rowSection {
              display: grid;
              grid-template-columns: 92px 1fr;
              align-items: stretch;
              border-top: 1px solid #d8d8d8;
            }
  
            .rail {
              background: #efefef;
              border-right: 1px solid #e1e1e1;
              padding: 14px 12px;
              display: flex;
              align-items: flex-start; /* key */
              justify-content: flex-start;
            }
  
            .railTxt {
              font-size: 10.5px;
              letter-spacing: 1px;
              text-transform: uppercase;
              font-weight: 800;
              color: #1f1f1f;
              line-height: 1.2;         /* key */
              white-space: normal;      /* key */
              word-break: break-word;   /* key */
            }
  
            .body { padding: 14px 16px; min-width: 0; }
  
            .para {
              margin: 0;
              font-size: 12.5px;
              line-height: 1.55;
              color: #1f1f1f;
              white-space: pre-wrap;
            }
            .para--tight { margin-top: 8px; }
  
            .tags { display: flex; flex-wrap: wrap; gap: 8px; }
            .tag {
              display: inline-flex;
              align-items: center;
              padding: 6px 10px;
              border-radius: 999px;
              border: 1px solid #d7d7d7;
              background: #fafafa;
              font-size: 12px;
              font-weight: 700;
              color: #1a1a1a;
            }
  
            .stack { display: flex; flex-direction: column; gap: 12px; }
  
            .entry { border-top: 1px solid #ededed; padding-top: 10px; }
            .entry:first-child { border-top: 0; padding-top: 0; }
  
            .entryHead { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
            .entryTitle { font-size: 13px; font-weight: 900; color: #1a1a1a; line-height: 1.25; word-break: break-word; }
            .entryDate { font-size: 11.5px; font-weight: 800; color: #3e3e3e; white-space: nowrap; }
  
            .entryMeta { margin-top: 4px; font-size: 12px; color: #3a3a3a; font-weight: 600; }
  
            .bullets { margin: 8px 0 0 18px; padding: 0; }
            .bullets li { margin: 4px 0; font-size: 12.5px; line-height: 1.5; color: #1f1f1f; }
  
            .chips { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
            .chip {
              display: inline-flex;
              align-items: center;
              padding: 5px 9px;
              border-radius: 999px;
              background: #1b1b1b;
              color: #ffffff;
              font-size: 11px;
              font-weight: 800;
            }
  
            .link {
              color: #1b1b1b;
              font-weight: 900;
              text-decoration: underline;
              text-underline-offset: 2px;
              font-size: 12px;
            }
  
            .langList { display: flex; flex-direction: column; gap: 10px; }
            .langRow {
              display: flex;
              justify-content: space-between;
              gap: 12px;
              padding: 8px 10px;
              border: 1px solid #ededed;
              border-radius: 10px;
              background: #ffffff;
            }
            .langName { font-weight: 900; color: #1a1a1a; }
            .langLevel { font-weight: 900; color: #333333; white-space: nowrap; }
  
            @media print {
              .page { width: 210mm; min-height: 297mm; }
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
  
    if (!customElements.get('gqr-resume-atelier')) {
      customElements.define('gqr-resume-atelier', GQRResumeAtelier);
    }
  })();