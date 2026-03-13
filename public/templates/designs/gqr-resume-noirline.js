/**
 * name: gqr-resume-noirline
 * description: "Minimalista blanco y negro con acento de línea vertical tipo 'timeline', títulos compactos en mayúsculas, bloques limpios y micro-iconos en círculo para contacto; estética editorial elegante sin imágenes."
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
    class GQRResumeNoirline extends HTMLElement {
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
            experience: 'Experiencia laboral',
            education: 'Datos académicos',
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
  
        const firstName = safeStr(data.firstName).trim();
        const lastName = safeStr(data.lastName).trim();
        const fullName = (firstName + ' ' + lastName).trim();
        const profession = safeStr(data.profession).trim();
  
        const email = safeStr(data.email).trim();
        const phone = safeStr(data.phone).trim();
        const country = safeStr(data.country).trim();
        const linkedin = safeStr(data.linkedin).trim();
  
        const summary = safeStr(data.summary).trim();
  
        const skills = uniqNonEmpty([].concat(safeArr(data.skillsRaw), safeArr(data.toolsRaw)));
  
        const experience = safeArr(data.experience).filter((e) => e && typeof e === 'object');
        const projects = safeArr(data.projects).filter((p) => p && typeof p === 'object');
        const achievements = safeArr(data.achievements).filter((a) => a && typeof a === 'object');
        const education = safeArr(data.education).filter((ed) => ed && typeof ed === 'object');
        const certifications = safeArr(data.certifications).filter((c) => c && typeof c === 'object');
        const languages = safeArr(data.languages).filter((l) => l && typeof l === 'object');
  
        const hasAnyContact = !!(email || phone || country || linkedin);
  
        const css = `
          :host{
            display:block;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
  
          @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@500;600;700&display=swap");
  
          .page{
            width: 210mm;
            min-height: 297mm;
            height: auto;
            overflow: visible;
            background: #ffffff;
            padding: 38px 42px 42px 42px;
            box-sizing: border-box;
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            color: #111;
            line-height: 1.35;
          }
  
          /* Header */
          .header{
            display:flex;
            align-items:flex-start;
            justify-content: space-between;
            gap: 18px;
            padding-bottom: 14px;
            border-bottom: 1px solid rgba(0,0,0,.12);
          }
  
          .header-left{
            flex: 1 1 auto;
            min-width: 0;
          }
  
          .name{
            margin: 0;
            font-family: "Montserrat", "Inter", Arial, sans-serif;
            font-size: 26px;
            font-weight: 700;
            letter-spacing: .2px;
            color: #0f0f0f;
          }
  
          .profession{
            margin-top: 4px;
            font-size: 11.5px;
            letter-spacing: 2.4px;
            text-transform: uppercase;
            color: #3a3a3a;
            font-weight: 600;
          }
  
          .header-right{
            flex: 0 0 auto;
            display:flex;
            flex-direction: column;
            gap: 7px;
            align-items: flex-end;
            text-align: right;
            font-size: 11.5px;
            color: #1f1f1f;
            min-width: 210px;
          }
  
          .contact-item{
            display:inline-flex;
            align-items:center;
            gap: 8px;
            justify-content: flex-end;
            white-space: nowrap;
          }
  
          .icon{
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #111;
            color: #fff;
            display:inline-flex;
            align-items:center;
            justify-content:center;
            font-size: 11px;
            flex: 0 0 auto;
          }
  
          a{
            color: inherit;
            text-decoration: none;
            border-bottom: 1px solid rgba(0,0,0,.25);
          }
  
          /* Timeline layout */
          .timeline{
            position: relative;
            margin-top: 18px;
            padding-left: 22px;
          }
  
          .timeline:before{
            content:"";
            position:absolute;
            left: 7px;
            top: 0;
            bottom: 0;
            width: 1px;
            background: rgba(0,0,0,.18);
          }
  
          .section{
            position: relative;
            margin-top: 18px;
          }
  
          .section:first-child{
            margin-top: 0;
          }
  
          .section-pin{
            position:absolute;
            left: -22px;
            top: 2px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #fff;
            border: 2px solid #111;
            box-sizing: border-box;
          }
  
          .section-title{
            margin: 0;
            font-family: "Montserrat", "Inter", Arial, sans-serif;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 2.8px;
            text-transform: uppercase;
            color: #111;
          }
  
          .section-rule{
            height: 1px;
            background: rgba(0,0,0,.12);
            margin: 10px 0 12px 0;
          }
  
          .summary{
            margin: 0;
            font-size: 12px;
            color: #222;
          }
  
          /* Skills */
          .skills-grid{
            display:flex;
            flex-wrap: wrap;
            gap: 8px;
          }
  
          .pill{
            font-size: 11px;
            padding: 6px 10px;
            border-radius: 999px;
            border: 1px solid rgba(0,0,0,.16);
            background: #fff;
            color: #222;
          }
  
          /* Entries */
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
            font-weight: 700;
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
            font-weight: 600;
          }
  
          .bullets{
            margin: 8px 0 0 0;
            padding-left: 18px;
          }
  
          .bullets li{
            margin: 4px 0;
            font-size: 11.5px;
            color: #222;
          }
  
          .project-desc{
            margin: 6px 0 0 0;
            font-size: 11.5px;
            color: #222;
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
            color: #333;
          }
  
          @media print {
            .page { width: 210mm; min-height: 297mm; }
          }
        `;
  
        function sectionWrap(sectionKey, title, innerHtml) {
          return `
            <section class="section" data-section="${escapeHtml(sectionKey)}">
              <span class="section-pin" aria-hidden="true"></span>
              <h3 class="section-title">${escapeHtml(title)}</h3>
              <div class="section-rule"></div>
              ${innerHtml}
            </section>
          `;
        }
  
        // 1) Header (name, profession, contacto)
        const headerHtml = `
          <div class="header" data-section="header">
            <div class="header-left">
              <h1 class="name">${escapeHtml(fullName || 'YOUR NAME')}</h1>
              ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
            </div>
  
            ${hasAnyContact ? `
              <div class="header-right" data-section="contact">
                ${phone ? `<div class="contact-item"><span class="icon">☎</span><span>${escapeHtml(phone)}</span></div>` : ''}
                ${email ? `<div class="contact-item"><span class="icon">✉</span><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>` : ''}
                ${country ? `<div class="contact-item"><span class="icon">⚲</span><span>${escapeHtml(country)}</span></div>` : ''}
                ${linkedin ? `<div class="contact-item"><span class="icon">🔗</span><a href="${escapeHtml(normalizeUrl(linkedin))}" target="_blank" rel="noopener noreferrer">${escapeHtml(linkedin)}</a></div>` : ''}
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
                ${skills.map((s, idx) => `<span class="pill" data-entry-id="skill-${idx}">${escapeHtml(s)}</span>`).join('')}
              </div>`
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
                            ${url ? `<div class="entry-sub"><a href="${escapeHtml(normalizeUrl(url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a></div>` : ''}
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
                    const subParts = [];
                    if (institution) subParts.push(institution);
                    if (gpa) subParts.push('GPA: ' + gpa);
  
                    return `
                      <div class="entry" data-entry-id="${escapeHtml(id)}">
                        <div class="entry-head">
                          <div>
                            ${title ? `<div class="entry-title">${escapeHtml(title)}</div>` : ''}
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
                        <div class="entry-head">
                          <div>
                            ${name ? `<div class="entry-title">${escapeHtml(name)}</div>` : ''}
                            ${sub ? `<div class="entry-sub">${escapeHtml(sub)}</div>` : ''}
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
                            <div class="entry-title">${escapeHtml(name)}</div>
                            ${levelLabel ? `<div class="entry-sub">${escapeHtml(levelLabel)}</div>` : ''}
                          </div>
                        </div>
                      </div>
                    `;
                  })
                  .join('')}
              `
            )
          : '';
  
        // Strict order 1→9
        const html = `
          <style>${css}</style>
          <div class="page">
            ${headerHtml}
            <div class="timeline">
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
  
    if (!customElements.get('gqr-resume-noirline')) {
      customElements.define('gqr-resume-noirline', GQRResumeNoirline);
    }
  })();