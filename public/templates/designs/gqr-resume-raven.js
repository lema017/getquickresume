/**
 * name: gqr-resume-raven
 * description: "Estilo blanco/negro con cabecera fuerte, acentos en líneas horizontales, bloques compactos y títulos en mayúsculas; look ejecutivo sobrio con separadores marcados y tipografía moderna."
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
        const k = s.toLowerCase();
        if (seen.has(k)) return;
        seen.add(k);
        out.push(s);
      });
      return out;
    }
  
    function normalizeUrl(url) {
      const u = safeStr(url).trim();
      if (!u) return '';
      if (/^https?:\/\//i.test(u)) return u;
      return 'https://' + u.replace(/^\/+/, '');
    }
  
    function formatMonthYear(dateLike, lang) {
      const raw = safeStr(dateLike).trim();
      if (!raw) return '';
  
      let d = null;
      if (/^\d{4}-\d{2}$/.test(raw)) {
        d = new Date(raw + '-01T00:00:00');
      } else if (/^\d{4}$/.test(raw)) {
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
    class GQRResumeRaven extends HTMLElement {
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
  
      connectedCallback() {
        this.render();
      }
  
      attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'language' && oldValue !== newValue) this.render();
      }
  
      getLanguage() {
        const attr = safeStr(this.getAttribute('language')).trim().toLowerCase();
        const dLang = safeStr(this.data && this.data.language).trim().toLowerCase();
        return (attr || dLang || 'en') === 'es' ? 'es' : 'en';
      }
  
      render() {
        const data = this.data || {};
        const lang = this.getLanguage();
  
        const i18n = {
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
            levelMap: {
              basic: 'Básico',
              intermediate: 'Intermedio',
              advanced: 'Avanzado',
              native: 'Nativo',
            },
          },
        };
  
        // Header
        const firstName = safeStr(data.firstName).trim();
        const lastName = safeStr(data.lastName).trim();
        const fullName = (firstName + ' ' + lastName).trim();
        const profession = safeStr(data.profession).trim();
  
        const email = safeStr(data.email).trim();
        const phone = safeStr(data.phone).trim();
        const country = safeStr(data.country).trim();
        const linkedin = safeStr(data.linkedin).trim();
        const hasAnyContact = !!(email || phone || country || linkedin);
  
        // Profile
        const summary = safeStr(data.summary).trim();
  
        // Skills
        const skills = uniqNonEmpty([].concat(safeArr(data.skillsRaw), safeArr(data.toolsRaw)));
  
        // Lists
        const experience = safeArr(data.experience).filter((e) => e && typeof e === 'object');
        const projects = safeArr(data.projects).filter((p) => p && typeof p === 'object');
        const achievements = safeArr(data.achievements).filter((a) => a && typeof a === 'object');
        const education = safeArr(data.education).filter((ed) => ed && typeof ed === 'object');
        const certifications = safeArr(data.certifications).filter((c) => c && typeof c === 'object');
        const languages = safeArr(data.languages).filter((l) => l && typeof l === 'object');
  
        const css = `
          :host{
            display:block;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
  
          @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");
  
          .page{
            width: 210mm;
            min-height: 297mm;
            height: auto;
            overflow: visible;
            background: #ffffff;
            box-sizing: border-box;
            padding: 34px 42px 44px 42px;
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            color: #111;
            line-height: 1.35;
          }
  
          /* Header */
          .header{
            padding-bottom: 14px;
            border-bottom: 2px solid #111;
          }
  
          .name{
            margin: 0;
            font-size: 28px;
            font-weight: 900;
            letter-spacing: .4px;
            text-transform: uppercase;
            line-height: 1.05;
          }
  
          .profession{
            margin-top: 7px;
            font-size: 11.5px;
            font-weight: 800;
            letter-spacing: 2.6px;
            text-transform: uppercase;
            color: rgba(0,0,0,.75);
          }
  
          .contact{
            margin-top: 12px;
            display:flex;
            flex-wrap: wrap;
            gap: 8px 10px;
          }
  
          .chip{
            display:inline-flex;
            align-items:center;
            gap: 8px;
            padding: 7px 10px;
            border-radius: 999px;
            background: #0f0f0f;
            color: #fff;
            font-size: 11.5px;
            white-space: nowrap;
          }
  
          .icon{
            width: 18px;
            height: 18px;
            border-radius: 6px;
            background: rgba(255,255,255,.18);
            border: 1px solid rgba(255,255,255,.20);
            display:inline-flex;
            align-items:center;
            justify-content:center;
            font-size: 11px;
            flex: 0 0 auto;
          }
  
          a{
            color: inherit;
            text-decoration: none;
            border-bottom: 1px solid rgba(255,255,255,.35);
          }
  
          /* Sections */
          .content{
            margin-top: 16px;
          }
  
          .section{
            margin-top: 18px;
          }
  
          .section:first-child{
            margin-top: 0;
          }
  
          .section-title{
            margin: 0;
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 2.6px;
            text-transform: uppercase;
            color: #111;
          }
  
          .rule{
            height: 1px;
            background: rgba(0,0,0,.18);
            margin: 10px 0 12px 0;
          }
  
          .summary{
            margin: 0;
            font-size: 12px;
            color: #1a1a1a;
          }
  
          /* Experience/Education entries */
          .entry{
            padding: 10px 0;
            border-top: 1px solid rgba(0,0,0,.10);
          }
          .entry:first-of-type{
            border-top: none;
            padding-top: 0;
          }
  
          .entry-head{
            display:flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 12px;
          }
  
          .entry-title{
            margin: 0;
            font-size: 12.5px;
            font-weight: 800;
            color: #111;
          }
  
          .entry-sub{
            margin-top: 3px;
            font-size: 11px;
            color: #444;
          }
  
          .date{
            font-size: 11px;
            color: #444;
            white-space: nowrap;
            font-weight: 800;
          }
  
          .bullets{
            margin: 8px 0 0 0;
            padding-left: 18px;
          }
  
          .bullets li{
            margin: 4px 0;
            font-size: 11.5px;
            color: #1a1a1a;
          }
  
          /* Skills */
          .skills-grid{
            display:grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px 14px;
          }
  
          .skill{
            font-size: 11.5px;
            color: #111;
            padding: 7px 10px;
            border: 1px solid rgba(0,0,0,.12);
            border-radius: 10px;
            background: #fff;
          }
  
          /* Projects tags */
          .project-desc{
            margin: 6px 0 0 0;
            font-size: 11.5px;
            color: #1a1a1a;
          }
  
          .tags{
            margin-top: 6px;
            display:flex;
            flex-wrap: wrap;
            gap: 6px;
          }
  
          .tag{
            font-size: 10.5px;
            padding: 4px 8px;
            border-radius: 999px;
            border: 1px solid rgba(0,0,0,.14);
            background: #fff;
            color: #222;
          }
  
          @media print {
            .page { width: 210mm; min-height: 297mm; }
          }
        `;
  
        function sectionWrap(sectionKey, title, innerHtml) {
          return `
            <section class="section" data-section="${escapeHtml(sectionKey)}">
              <h3 class="section-title">${escapeHtml(title)}</h3>
              <div class="rule"></div>
              ${innerHtml}
            </section>
          `;
        }
  
        // 1) Header
        const headerHtml = `
          <div class="header" data-section="header">
            <h1 class="name">${escapeHtml(fullName || 'YOUR NAME')}</h1>
            ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
  
            ${hasAnyContact ? `
              <div class="contact" data-section="contact">
                ${phone ? `<span class="chip"><span class="icon">☎</span><span>${escapeHtml(phone)}</span></span>` : ''}
                ${email ? `<span class="chip"><span class="icon">✉</span><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></span>` : ''}
                ${country ? `<span class="chip"><span class="icon">⚲</span><span>${escapeHtml(country)}</span></span>` : ''}
                ${linkedin ? `<span class="chip"><span class="icon">🔗</span><a href="${escapeHtml(normalizeUrl(linkedin))}" target="_blank" rel="noopener noreferrer">${escapeHtml(linkedin)}</a></span>` : ''}
              </div>
            ` : ''}
          </div>
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
              `<div class="skills-grid">
                ${skills.map((s, idx) => `<div class="skill" data-entry-id="skill-${idx}">${escapeHtml(s)}</div>`).join('')}
              </div>`
            )
          : '';
  
        // 4) Experience
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
  
                    const sub = [company, location].filter(Boolean).join(' • ');
                    const bullets = uniqNonEmpty([].concat(safeArr(e.achievements), safeArr(e.responsibilities)));
  
                    return `
                      <div class="entry" data-entry-id="${escapeHtml(id)}">
                        <div class="entry-head">
                          <div>
                            ${title ? `<div class="entry-title">${escapeHtml(title)}</div>` : ''}
                            ${sub ? `<div class="entry-sub">${escapeHtml(sub)}</div>` : ''}
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
                            ${url ? `<div class="entry-sub"><a style="border-bottom:1px solid rgba(0,0,0,.35)" href="${escapeHtml(normalizeUrl(url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a></div>` : ''}
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
                          <div class="entry-title">${escapeHtml(title)}</div>
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
                    const subParts = [];
                    if (institution) subParts.push(institution);
                    if (gpa) subParts.push('GPA: ' + gpa);
  
                    return `
                      <div class="entry" data-entry-id="${escapeHtml(id)}">
                        <div class="entry-head">
                          <div>
                            <div class="entry-title">${escapeHtml(title || institution)}</div>
                            ${subParts.length ? `<div class="entry-sub">${escapeHtml(subParts.join(' • '))}</div>` : ''}
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
                    const sub = [issuer, date].filter(Boolean).join(' • ');
  
                    return `
                      <div class="entry" data-entry-id="${escapeHtml(id)}">
                        <div class="entry-title">${escapeHtml(name)}</div>
                        ${sub ? `<div class="entry-sub">${escapeHtml(sub)}</div>` : ''}
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
                          <div class="entry-title">${escapeHtml(name)}</div>
                          <div class="date">${escapeHtml(levelLabel)}</div>
                        </div>
                      </div>
                    `;
                  })
                  .join('')}
              `
            )
          : '';
  
        const html = `
          <style>${css}</style>
          <div class="page">
            ${headerHtml}
            <div class="content">
              ${profileHtml}
              ${skillsHtml}
              ${experienceHtml}
              ${projectsHtml}
              ${achievementsHtml}
              ${educationHtml}
              ${certificationsHtml}
              ${languagesHtml}
            </div>
          </div>
        `;
  
        this.shadowRoot.innerHTML = html;
      }
    }
  
    if (!customElements.get('gqr-resume-raven')) {
      customElements.define('gqr-resume-raven', GQRResumeRaven);
    }
  })();