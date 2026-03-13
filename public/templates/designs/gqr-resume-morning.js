/**
 * name: gqr-resume-morning
 * description: "Estilo elegante y minimalista con nombre en serif, líneas sutiles, títulos de sección en mayúsculas y acento gris; tipografía limpia y layout de una columna con bullets compactos."
 */
(function () {
    'use strict';
  
    // ---------- Utilities (required) ----------
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
        .replace(/'/g, '&#39;');
    }
  
    function uniqNonEmpty(arr) {
      const out = [];
      const seen = new Set();
      safeArr(arr).forEach((x) => {
        const s = safeStr(x).trim();
        if (!s) return;
        const key = s.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        out.push(s);
      });
      return out;
    }
  
    function normalizeUrl(url) {
      const u = safeStr(url).trim();
      if (!u) return '';
      if (/^https?:\/\//i.test(u)) return u;
      // allow plain domain or linkedin handle
      return 'https://' + u.replace(/^\/+/, '');
    }
  
    function formatMonthYear(dateLike, lang) {
      // Accepts: "2024-01-15" | "2024-01" | "2024" | ISO strings.
      const raw = safeStr(dateLike).trim();
      if (!raw) return '';
  
      // Try to parse safely; if parsing fails, fall back to raw.
      let d = null;
  
      // Handle YYYY-MM or YYYY
      if (/^\d{4}-\d{2}$/.test(raw)) {
        d = new Date(raw + '-01T00:00:00');
      } else if (/^\d{4}$/.test(raw)) {
        // Year only
        return raw;
      } else {
        const candidate = new Date(raw);
        if (!isNaN(candidate.getTime())) d = candidate;
      }
  
      if (!d || isNaN(d.getTime())) return raw;
  
      const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      };
      const m = months[lang] || months.en;
      return m[d.getMonth()] + ' ' + d.getFullYear();
    }
  
    function formatDateRange(startDate, endDate, flags, lang, i18n) {
      const start = formatMonthYear(startDate, lang);
      const endRaw = formatMonthYear(endDate, lang);
  
      const isCurrent = !!(flags && flags.isCurrent);
      const isCompleted = flags && typeof flags.isCompleted === 'boolean' ? flags.isCompleted : true;
  
      const showPresent = isCurrent || isCompleted === false;
  
      const end = showPresent ? i18n[lang].present : endRaw;
  
      if (start && end) return start + ' — ' + end;
      if (start && !end) return start;
      if (!start && end) return end;
      return '';
    }
  
    // ---------- Component ----------
    class GQRResumeMorning extends HTMLElement {
      static get observedAttributes() {
        return ['language'];
      }
  
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._data = {};
      }
  
      set data(v) {
        this._data = v && typeof v === 'object' ? v : {};
        this.render();
      }
  
      get data() {
        return this._data || {};
      }
  
      attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && name === 'language') {
          this.render();
        }
      }
  
      connectedCallback() {
        this.render();
      }
  
      getLanguage() {
        const attr = safeStr(this.getAttribute('language')).trim().toLowerCase();
        const dLang = safeStr(this.data && this.data.language).trim().toLowerCase();
        const lang = (attr || dLang || 'en') === 'es' ? 'es' : 'en';
        return lang;
      }
  
      render() {
        const data = this.data || {};
        const lang = this.getLanguage();
  
        const i18n = {
          en: {
            profile: 'Profile',
            experience: 'Professional Experience',
            education: 'Education',
            projects: 'Projects',
            certifications: 'Certifications',
            languages: 'Languages',
            achievements: 'Achievements',
            skills: 'Skills',
            present: 'Present',
            levelMap: {
              basic: 'Basic',
              intermediate: 'Intermediate',
              advanced: 'Advanced',
              native: 'Native',
            },
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
            present: 'Presente',
            levelMap: {
              basic: 'Básico',
              intermediate: 'Intermedio',
              advanced: 'Avanzado',
              native: 'Nativo',
            },
          },
        };
  
        // Header fields
        const firstName = safeStr(data.firstName).trim();
        const lastName = safeStr(data.lastName).trim();
        const fullName = (firstName + ' ' + lastName).trim();
        const profession = safeStr(data.profession).trim();
  
        const email = safeStr(data.email).trim();
        const phone = safeStr(data.phone).trim();
        const country = safeStr(data.country).trim();
        const linkedin = safeStr(data.linkedin).trim();
  
        // Profile
        const summary = safeStr(data.summary).trim();
  
        // Skills: combine skillsRaw + toolsRaw, no duplicates
        const skills = uniqNonEmpty([].concat(safeArr(data.skillsRaw), safeArr(data.toolsRaw)));
  
        // Experience
        const experience = safeArr(data.experience).filter((e) => e && typeof e === 'object');
  
        // Projects
        const projects = safeArr(data.projects).filter((p) => p && typeof p === 'object');
  
        // Achievements
        const achievements = safeArr(data.achievements).filter((a) => a && typeof a === 'object');
  
        // Education
        const education = safeArr(data.education).filter((ed) => ed && typeof ed === 'object');
  
        // Certifications
        const certifications = safeArr(data.certifications).filter((c) => c && typeof c === 'object');
  
        // Languages
        const languages = safeArr(data.languages).filter((l) => l && typeof l === 'object');
  
        const hasAnyContact = !!(email || phone || country || linkedin);
  
        const css = `
          :host{
            display:block;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
  
          .page{
            width: 210mm;
            min-height: 297mm;
            height: auto;
            overflow: visible;
            background: #ffffff;
            padding: 40px 42px;
            box-sizing: border-box;
            color: #1a1a1a;
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            line-height: 1.35;
          }
  
          /* Optional: load Google font (safe fallback exists) */
          @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@500;600&display=swap");
  
          .name{
            font-family: "Playfair Display", Georgia, "Times New Roman", Times, serif;
            font-size: 34px;
            font-weight: 600;
            letter-spacing: .4px;
            text-transform: uppercase;
            margin: 0;
            text-align: center;
          }
  
          .profession{
            margin: 6px 0 0 0;
            font-size: 13px;
            color: #555;
            text-align: center;
            font-weight: 500;
          }
  
          .top-rule{
            height: 2px;
            background: #2b2b2b;
            margin: 14px 0 12px 0;
          }
  
          .contact{
            display: flex;
            justify-content: center;
            gap: 14px;
            flex-wrap: wrap;
            font-size: 11.5px;
            color: #444;
            margin-bottom: 12px;
          }
  
          .contact a{
            color: inherit;
            text-decoration: none;
            border-bottom: 1px solid rgba(0,0,0,.18);
          }
  
          .contact-item{
            display: inline-flex;
            align-items: center;
            gap: 8px;
            white-space: nowrap;
          }
  
          .icon{
            width: 18px;
            height: 18px;
            border: 1px solid rgba(0,0,0,.25);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            color: #222;
            flex: 0 0 auto;
          }
  
          .section{
            margin-top: 18px;
          }
  
          .section-title{
            font-size: 12px;
            letter-spacing: 2.2px;
            font-weight: 700;
            color: #2a2a2a;
            text-transform: uppercase;
            text-align: center;
            margin: 0;
          }
  
          .section-rule{
            height: 1px;
            background: rgba(0,0,0,.22);
            margin: 10px 0 12px 0;
          }
  
          .summary{
            font-size: 12px;
            color: #2b2b2b;
            margin: 0;
          }
  
          .skills-grid{
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
  
          .pill{
            font-size: 11px;
            border: 1px solid rgba(0,0,0,.20);
            border-radius: 999px;
            padding: 6px 10px;
            color: #222;
            background: #fff;
          }
  
          .entry{
            padding: 10px 0;
            border-top: 1px solid rgba(0,0,0,.12);
          }
          .entry:first-of-type{
            border-top: none;
            padding-top: 0;
          }
  
          .entry-head{
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 12px;
          }
  
          .entry-title{
            font-size: 12.5px;
            font-weight: 700;
            margin: 0;
            color: #1f1f1f;
          }
  
          .entry-meta{
            font-size: 11px;
            color: #4a4a4a;
            margin: 2px 0 0 0;
          }
  
          .date{
            font-size: 11px;
            color: #4a4a4a;
            white-space: nowrap;
            font-weight: 500;
          }
  
          .bullets{
            margin: 8px 0 0 0;
            padding-left: 18px;
          }
          .bullets li{
            font-size: 11.5px;
            color: #2b2b2b;
            margin: 4px 0;
          }
  
          .project-desc{
            margin: 6px 0 0 0;
            font-size: 11.5px;
            color: #2b2b2b;
          }
  
          .tags{
            margin-top: 6px;
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }
          .tag{
            font-size: 10.5px;
            padding: 4px 8px;
            border-radius: 999px;
            border: 1px solid rgba(0,0,0,.18);
            color: #333;
            background: #fff;
          }
  
          .small-line{
            margin-top: 4px;
            font-size: 11px;
            color: #4a4a4a;
          }
  
          .link{
            font-size: 11px;
            color: #2b2b2b;
            text-decoration: none;
            border-bottom: 1px solid rgba(0,0,0,.18);
          }
  
          @media print {
            .page { width: 210mm; min-height: 297mm; }
          }
        `;
  
        function sectionWrap(sectionKey, title, innerHtml) {
          return `
            <section class="section" data-section="${escapeHtml(sectionKey)}">
              <h3 class="section-title">${escapeHtml(title)}</h3>
              <div class="section-rule"></div>
              ${innerHtml}
            </section>
          `;
        }
  
        // --------- Build sections in strict order ---------
        // 1) Header (name, profession, contacto)
        const headerHtml = `
          <div data-section="header">
            <h1 class="name">${escapeHtml(fullName || 'YOUR NAME')}</h1>
            ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
            <div class="top-rule"></div>
          </div>
  
          ${hasAnyContact ? `
            <div class="contact" data-section="contact">
              ${email ? `
                <span class="contact-item">
                  <span class="icon">✉</span>
                  <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
                </span>` : ''}
              ${phone ? `
                <span class="contact-item">
                  <span class="icon">☎</span>
                  <span>${escapeHtml(phone)}</span>
                </span>` : ''}
              ${country ? `
                <span class="contact-item">
                  <span class="icon">⚲</span>
                  <span>${escapeHtml(country)}</span>
                </span>` : ''}
              ${linkedin ? `
                <span class="contact-item">
                  <span class="icon">🔗</span>
                  <a class="link" href="${escapeHtml(normalizeUrl(linkedin))}" target="_blank" rel="noopener noreferrer">${escapeHtml(linkedin)}</a>
                </span>` : ''}
            </div>
          ` : ''}
        `;
  
        // 2) Profile
        const profileHtml = summary
          ? sectionWrap('profile', i18n[lang].profile, `<p class="summary">${escapeHtml(summary)}</p>`)
          : '';
  
        // 3) Skills
        const skillsHtml = skills.length
          ? sectionWrap(
              'skills',
              i18n[lang].skills,
              `
                <div class="skills-grid">
                  ${skills
                    .map((s, idx) => `<span class="pill" data-entry-id="skill-${idx}">${escapeHtml(s)}</span>`)
                    .join('')}
                </div>
              `
            )
          : '';
  
        // 4) Work Experience
        const experienceHtml = experience.length
          ? sectionWrap(
              'experience',
              i18n[lang].experience,
              `
                ${experience
                  .map((e) => {
                    const id = safeStr(e.id).trim() || ('exp-' + Math.random().toString(16).slice(2));
                    const title = safeStr(e.title).trim();
                    const company = safeStr(e.company).trim();
                    const location = safeStr(e.location).trim();
  
                    const date = formatDateRange(e.startDate, e.endDate, { isCurrent: !!e.isCurrent }, lang, i18n);
                    const metaParts = [];
                    if (company) metaParts.push(company);
                    if (location) metaParts.push(location);
  
                    const bullets = uniqNonEmpty([].concat(safeArr(e.achievements), safeArr(e.responsibilities)));
  
                    return `
                      <div class="entry" data-entry-id="${escapeHtml(id)}">
                        <div class="entry-head">
                          <div>
                            ${title ? `<div class="entry-title">${escapeHtml(title)}</div>` : ''}
                            ${metaParts.length ? `<div class="entry-meta">${escapeHtml(metaParts.join(' • '))}</div>` : ''}
                          </div>
                          ${date ? `<div class="date">${escapeHtml(date)}</div>` : ''}
                        </div>
                        ${bullets.length ? `
                          <ul class="bullets">
                            ${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}
                          </ul>
                        ` : ''}
                      </div>
                    `;
                  })
                  .join('')}
              `
            )
          : '';
  
        // 5) Projects
        const projectsHtml = projects.length
          ? sectionWrap(
              'projects',
              i18n[lang].projects,
              `
                ${projects
                  .map((p) => {
                    const id = safeStr(p.id).trim() || ('proj-' + Math.random().toString(16).slice(2));
                    const name = safeStr(p.name).trim();
                    const desc = safeStr(p.description).trim();
                    const url = safeStr(p.url).trim();
                    const tech = uniqNonEmpty(p.technologies);
  
                    return `
                      <div class="entry" data-entry-id="${escapeHtml(id)}">
                        <div class="entry-head">
                          <div>
                            ${name ? `<div class="entry-title">${escapeHtml(name)}</div>` : ''}
                            ${url ? `<div class="small-line"><a class="link" href="${escapeHtml(normalizeUrl(url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a></div>` : ''}
                          </div>
                        </div>
                        ${desc ? `<p class="project-desc">${escapeHtml(desc)}</p>` : ''}
                        ${tech.length ? `
                          <div class="tags">
                            ${tech.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
                          </div>
                        ` : ''}
                      </div>
                    `;
                  })
                  .join('')}
              `
            )
          : '';
  
        // 6) Achievements
        const achievementsHtml = achievements.length
          ? sectionWrap(
              'achievements',
              i18n[lang].achievements,
              `
                ${achievements
                  .map((a) => {
                    const id = safeStr(a.id).trim() || ('ach-' + Math.random().toString(16).slice(2));
                    const title = safeStr(a.title).trim();
                    const desc = safeStr(a.description).trim();
                    const year = safeStr(a.year).trim();
  
                    return `
                      <div class="entry" data-entry-id="${escapeHtml(id)}">
                        <div class="entry-head">
                          <div>
                            ${title ? `<div class="entry-title">${escapeHtml(title)}</div>` : ''}
                          </div>
                          ${year ? `<div class="date">${escapeHtml(year)}</div>` : ''}
                        </div>
                        ${desc ? `<p class="project-desc">${escapeHtml(desc)}</p>` : ''}
                      </div>
                    `;
                  })
                  .join('')}
              `
            )
          : '';
  
        // 7) Education
        const educationHtml = education.length
          ? sectionWrap(
              'education',
              i18n[lang].education,
              `
                ${education
                  .map((ed) => {
                    const id = safeStr(ed.id).trim() || ('edu-' + Math.random().toString(16).slice(2));
                    const degree = safeStr(ed.degree).trim();
                    const field = safeStr(ed.field).trim();
                    const institution = safeStr(ed.institution).trim();
                    const gpa = safeStr(ed.gpa).trim();
  
                    const date = formatDateRange(
                      ed.startDate,
                      ed.endDate,
                      { isCompleted: typeof ed.isCompleted === 'boolean' ? ed.isCompleted : true },
                      lang,
                      i18n
                    );
  
                    const title = [degree, field].filter(Boolean).join(' — ');
                    const metaParts = [];
                    if (institution) metaParts.push(institution);
                    if (gpa) metaParts.push((lang === 'es' ? 'GPA' : 'GPA') + ': ' + gpa);
  
                    return `
                      <div class="entry" data-entry-id="${escapeHtml(id)}">
                        <div class="entry-head">
                          <div>
                            ${title ? `<div class="entry-title">${escapeHtml(title)}</div>` : ''}
                            ${metaParts.length ? `<div class="entry-meta">${escapeHtml(metaParts.join(' • '))}</div>` : ''}
                          </div>
                          ${date ? `<div class="date">${escapeHtml(date)}</div>` : ''}
                        </div>
                      </div>
                    `;
                  })
                  .join('')}
              `
            )
          : '';
  
        // 8) Certifications
        const certificationsHtml = certifications.length
          ? sectionWrap(
              'certifications',
              i18n[lang].certifications,
              `
                ${certifications
                  .map((c) => {
                    const id = safeStr(c.id).trim() || ('cert-' + Math.random().toString(16).slice(2));
                    const name = safeStr(c.name).trim();
                    const issuer = safeStr(c.issuer).trim();
                    const date = formatMonthYear(c.date, lang);
  
                    const metaParts = [];
                    if (issuer) metaParts.push(issuer);
                    if (date) metaParts.push(date);
  
                    return `
                      <div class="entry" data-entry-id="${escapeHtml(id)}">
                        <div class="entry-head">
                          <div>
                            ${name ? `<div class="entry-title">${escapeHtml(name)}</div>` : ''}
                            ${metaParts.length ? `<div class="entry-meta">${escapeHtml(metaParts.join(' • '))}</div>` : ''}
                          </div>
                        </div>
                      </div>
                    `;
                  })
                  .join('')}
              `
            )
          : '';
  
        // 9) Languages
        const languagesHtml = languages.length
          ? sectionWrap(
              'languages',
              i18n[lang].languages,
              `
                ${languages
                  .map((l) => {
                    const id = safeStr(l.id).trim() || ('lang-' + Math.random().toString(16).slice(2));
                    const name = safeStr(l.name).trim();
                    const level = safeStr(l.level).trim().toLowerCase();
                    const levelLabel = i18n[lang].levelMap[level] || safeStr(l.level);
  
                    return `
                      <div class="entry" data-entry-id="${escapeHtml(id)}">
                        <div class="entry-head">
                          <div>
                            ${name ? `<div class="entry-title">${escapeHtml(name)}</div>` : ''}
                            ${levelLabel ? `<div class="entry-meta">${escapeHtml(levelLabel)}</div>` : ''}
                          </div>
                        </div>
                      </div>
                    `;
                  })
                  .join('')}
              `
            )
          : '';
  
        // Assemble in strict order
        const html = `
          <style>${css}</style>
          <div class="page">
            ${headerHtml}
            ${profileHtml}
            ${skillsHtml}
            ${experienceHtml}
            ${projectsHtml}
            ${achievementsHtml}
            ${educationHtml}
            ${certificationsHtml}
            ${languagesHtml}
          </div>
        `;
  
        this.shadowRoot.innerHTML = html;
      }
    }
  
    if (!customElements.get('gqr-resume-morning')) {
      customElements.define('gqr-resume-morning', GQRResumeMorning);
    }
  })();