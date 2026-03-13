(function() {
  'use strict';

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
      levelMap: {
        basic: 'Basic',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        native: 'Native'
      }
    },
    es: {
      profile: 'Perfil',
      experience: 'Experiencia',
      education: 'Formación',
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
        native: 'Nativo'
      }
    }
  };

  function safeStr(v) {
    return v == null ? '' : String(v);
  }

  function safeArr(v) {
    return Array.isArray(v) ? v : [];
  }

  function escapeHtml(t) {
    return safeStr(t)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatShortDate(value, lang) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return escapeHtml(value);

    const months = lang === 'es'
      ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return months[date.getMonth()] + ' ' + date.getFullYear();
  }

  function formatDateRange(startDate, endDate, isCurrentLike, lang, presentLabel) {
    const start = formatShortDate(startDate, lang);
    const end = isCurrentLike ? presentLabel : formatShortDate(endDate, lang);

    if (start && end) return start + ' — ' + end;
    if (start) return start;
    if (end) return end;
    return '';
  }

  class GQRResumeCoveV1 extends HTMLElement {
    static get observedAttributes() {
      return ['language'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._data = {};
    }

    set data(value) {
      this._data = value && typeof value === 'object' ? value : {};
      this.render();
    }

    get data() {
      return this._data;
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
      const attrLang = safeStr(this.getAttribute('language')).toLowerCase();
      const dataLang = safeStr(this._data && this._data.language).toLowerCase();
      const lang = attrLang || dataLang || 'en';
      return lang === 'es' ? 'es' : 'en';
    }

    renderSectionTitle(title) {
      return `
        <div class="section-heading-wrap">
          <h2 class="section-heading">${escapeHtml(title)}</h2>
          <div class="section-rule"></div>
        </div>
      `;
    }

    render() {
      const data = this._data || {};
      const lang = this.getLanguage();
      const t = I18N[lang];
      const presentLabel = t.present;

      const firstName = safeStr(data.firstName);
      const lastName = safeStr(data.lastName);
      const profession = safeStr(data.profession);
      const email = safeStr(data.email);
      const phone = safeStr(data.phone);
      const country = safeStr(data.country);
      const linkedin = safeStr(data.linkedin);
      const summary = safeStr(data.summary);

      const skillsRaw = safeArr(data.skillsRaw);
      const toolsRaw = safeArr(data.toolsRaw);
      const combinedSkills = Array.from(
        new Set(
          skillsRaw
            .concat(toolsRaw)
            .map(function(item) { return safeStr(item).trim(); })
            .filter(Boolean)
        )
      );

      const experience = safeArr(data.experience);
      const projects = safeArr(data.projects);
      const achievements = safeArr(data.achievements);
      const education = safeArr(data.education);
      const certifications = safeArr(data.certifications);
      const languages = safeArr(data.languages);

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

      const contactItems = [
        email ? `<span class="contact-pill">✉ ${escapeHtml(email)}</span>` : '',
        phone ? `<span class="contact-pill">☎ ${escapeHtml(phone)}</span>` : '',
        country ? `<span class="contact-pill">⚲ ${escapeHtml(country)}</span>` : '',
        linkedin ? `<span class="contact-pill">🔗 ${escapeHtml(linkedin)}</span>` : ''
      ].filter(Boolean).join('');

      const headerBlock = (fullName || profession || contactItems)
        ? `
          <section class="header-card" data-section="header">
            <div class="header-top">
              ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
              ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
            </div>
            ${contactItems ? `<div class="contact-row" data-section="contact">${contactItems}</div>` : ''}
          </section>
        `
        : '';

      const profileBlock = summary
        ? `
          <section class="section" data-section="profile">
            ${this.renderSectionTitle(t.profile)}
            <div class="section-body">
              <p class="profile-text">${escapeHtml(summary)}</p>
            </div>
          </section>
        `
        : '';

      const skillsBlock = combinedSkills.length
        ? `
          <section class="section" data-section="skills">
            ${this.renderSectionTitle(t.skills)}
            <div class="section-body">
              <div class="chips">
                ${combinedSkills.map(function(skill, index) {
                  return `<span class="chip" data-entry-id="skill-${index}">${escapeHtml(skill)}</span>`;
                }).join('')}
              </div>
            </div>
          </section>
        `
        : '';

      const experienceBlock = experience.length
        ? `
          <section class="section" data-section="experience">
            ${this.renderSectionTitle(t.experience)}
            <div class="section-body entries">
              ${experience.map(function(item, index) {
                const entryId = safeStr(item.id) || ('experience-' + index);
                const bullets = safeArr(item.achievements).concat(safeArr(item.responsibilities))
                  .map(function(b) { return safeStr(b).trim(); })
                  .filter(Boolean);

                const title = safeStr(item.title);
                const company = safeStr(item.company);
                const location = safeStr(item.location);
                const metaLine = [company, location].filter(Boolean).join(' · ');
                const range = formatDateRange(item.startDate, item.endDate, !!item.isCurrent, lang, presentLabel);

                return `
                  <article class="entry" data-entry-id="${escapeHtml(entryId)}">
                    <div class="entry-head">
                      <div class="entry-main">
                        ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                        ${metaLine ? `<div class="entry-subtitle">${escapeHtml(metaLine)}</div>` : ''}
                      </div>
                      ${range ? `<div class="entry-date">${escapeHtml(range)}</div>` : ''}
                    </div>
                    ${bullets.length ? `
                      <ul class="bullet-list">
                        ${bullets.map(function(bullet) {
                          return `<li>${escapeHtml(bullet)}</li>`;
                        }).join('')}
                      </ul>
                    ` : ''}
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      const projectsBlock = projects.length
        ? `
          <section class="section" data-section="projects">
            ${this.renderSectionTitle(t.projects)}
            <div class="section-body entries">
              ${projects.map(function(item, index) {
                const entryId = safeStr(item.id) || ('project-' + index);
                const name = safeStr(item.name);
                const description = safeStr(item.description);
                const technologies = safeArr(item.technologies).map(function(x) { return safeStr(x).trim(); }).filter(Boolean);
                const url = safeStr(item.url);

                return `
                  <article class="entry" data-entry-id="${escapeHtml(entryId)}">
                    <div class="entry-head">
                      <div class="entry-main">
                        ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                        ${url ? `<div class="entry-link">${escapeHtml(url)}</div>` : ''}
                      </div>
                    </div>
                    ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                    ${technologies.length ? `
                      <div class="inline-tags">
                        ${technologies.map(function(tech) {
                          return `<span class="mini-tag">${escapeHtml(tech)}</span>`;
                        }).join('')}
                      </div>
                    ` : ''}
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      const achievementsBlock = achievements.length
        ? `
          <section class="section" data-section="achievements">
            ${this.renderSectionTitle(t.achievements)}
            <div class="section-body entries">
              ${achievements.map(function(item, index) {
                const entryId = safeStr(item.id) || ('achievement-' + index);
                const title = safeStr(item.title);
                const description = safeStr(item.description);
                const year = safeStr(item.year);

                return `
                  <article class="entry compact" data-entry-id="${escapeHtml(entryId)}">
                    <div class="entry-head">
                      <div class="entry-main">
                        ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                      </div>
                      ${year ? `<div class="entry-date">${escapeHtml(year)}</div>` : ''}
                    </div>
                    ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      const educationBlock = education.length
        ? `
          <section class="section" data-section="education">
            ${this.renderSectionTitle(t.education)}
            <div class="section-body entries">
              ${education.map(function(item, index) {
                const entryId = safeStr(item.id) || ('education-' + index);
                const degree = safeStr(item.degree);
                const field = safeStr(item.field);
                const institution = safeStr(item.institution);
                const gpa = safeStr(item.gpa);

                const title = [degree, field].filter(Boolean).join(' · ');
                const range = formatDateRange(item.startDate, item.endDate, item.isCompleted === false, lang, presentLabel);

                return `
                  <article class="entry" data-entry-id="${escapeHtml(entryId)}">
                    <div class="entry-head">
                      <div class="entry-main">
                        ${title ? `<h3 class="entry-title">${escapeHtml(title)}</h3>` : ''}
                        ${institution ? `<div class="entry-subtitle">${escapeHtml(institution)}</div>` : ''}
                      </div>
                      ${range ? `<div class="entry-date">${escapeHtml(range)}</div>` : ''}
                    </div>
                    ${gpa ? `<p class="entry-text">GPA: ${escapeHtml(gpa)}</p>` : ''}
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      const certificationsBlock = certifications.length
        ? `
          <section class="section" data-section="certifications">
            ${this.renderSectionTitle(t.certifications)}
            <div class="section-body entries">
              ${certifications.map(function(item, index) {
                const entryId = safeStr(item.id) || ('certification-' + index);
                const name = safeStr(item.name);
                const issuer = safeStr(item.issuer);
                const date = formatShortDate(item.date, lang);

                return `
                  <article class="entry compact" data-entry-id="${escapeHtml(entryId)}">
                    <div class="entry-head">
                      <div class="entry-main">
                        ${name ? `<h3 class="entry-title">${escapeHtml(name)}</h3>` : ''}
                        ${issuer ? `<div class="entry-subtitle">${escapeHtml(issuer)}</div>` : ''}
                      </div>
                      ${date ? `<div class="entry-date">${escapeHtml(date)}</div>` : ''}
                    </div>
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        `
        : '';

      const languagesBlock = languages.length
        ? `
          <section class="section" data-section="languages">
            ${this.renderSectionTitle(t.languages)}
            <div class="section-body">
              <div class="language-list">
                ${languages.map(function(item, index) {
                  const entryId = safeStr(item.id) || ('language-' + index);
                  const name = safeStr(item.name);
                  const levelKey = safeStr(item.level).toLowerCase();
                  const level = t.levelMap[levelKey] || safeStr(item.level);

                  return `
                    <div class="language-item" data-entry-id="${escapeHtml(entryId)}">
                      <span class="language-name">${escapeHtml(name)}</span>
                      <span class="language-sep">—</span>
                      <span class="language-level">${escapeHtml(level)}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </section>
        `
        : '';

      this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

          :host {
            display: block;
            color: #2f2b28;
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
            padding: 34px 36px 38px;
            background: #fcfbf8;
            font-family: "Inter", Arial, sans-serif;
            color: #3d3835;
          }

          .header-card {
            background: #4a433f;
            color: #f7f3ed;
            padding: 26px 28px 22px;
            border-radius: 0;
            border-top: 5px solid #b8926a;
            box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
            margin-bottom: 26px;
          }

          .header-top {
            text-align: left;
          }

          .name {
            margin: 0;
            font-family: "Cormorant Garamond", Georgia, serif;
            font-size: 34px;
            line-height: 1;
            letter-spacing: 0.4px;
            font-weight: 600;
            text-transform: uppercase;
          }

          .profession {
            margin-top: 6px;
            font-size: 14px;
            letter-spacing: 1.8px;
            text-transform: uppercase;
            color: #e5d4c2;
            font-weight: 500;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 10px;
            margin-top: 16px;
          }

          .contact-pill {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 6px 10px;
            border: 1px solid rgba(247,243,237,0.28);
            background: rgba(255,255,255,0.06);
            color: #f7f3ed;
            font-size: 12px;
            line-height: 1.2;
            border-radius: 999px;
          }

          .section {
            margin-top: 0;
            margin-bottom: 20px;
            padding-bottom: 2px;
          }

          .section-heading-wrap {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
          }

          .section-heading {
            margin: 0;
            font-family: "Cormorant Garamond", Georgia, serif;
            font-size: 28px;
            line-height: 1;
            color: #5a4e46;
            font-weight: 600;
            white-space: nowrap;
            text-transform: uppercase;
          }

          .section-rule {
            flex: 1;
            height: 1px;
            background:
              linear-gradient(
                to right,
                #b8926a 0%,
                rgba(184, 146, 106, 0.65) 45%,
                rgba(184, 146, 106, 0.15) 100%
              );
          }

          .section-body {
            border-top: 1px solid #d9d0c7;
            padding-top: 12px;
          }

          .profile-text,
          .entry-text {
            margin: 0;
            font-size: 13px;
            line-height: 1.65;
            color: #433d39;
          }

          .chips {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .chip,
          .mini-tag {
            display: inline-flex;
            align-items: center;
            padding: 6px 10px;
            font-size: 12px;
            line-height: 1.2;
            border-radius: 999px;
            background: #f2ece5;
            border: 1px solid #dac9b9;
            color: #4c433d;
          }

          .entries {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            padding-bottom: 12px;
            border-bottom: 1px solid #e6ddd4;
          }

          .entry:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .entry.compact {
            padding-bottom: 10px;
          }

          .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 6px;
          }

          .entry-main {
            min-width: 0;
            flex: 1;
          }

          .entry-title {
            margin: 0;
            font-size: 15px;
            line-height: 1.35;
            font-weight: 700;
            color: #312c29;
          }

          .entry-subtitle,
          .entry-link {
            margin-top: 2px;
            font-size: 12.5px;
            line-height: 1.45;
            color: #6a5d53;
            word-break: break-word;
          }

          .entry-date {
            flex: 0 0 auto;
            font-size: 11.5px;
            line-height: 1.3;
            color: #8d745c;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            text-align: right;
            padding-top: 1px;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin: 0 0 5px 0;
            font-size: 12.8px;
            line-height: 1.55;
            color: #433d39;
          }

          .bullet-list li:last-child {
            margin-bottom: 0;
          }

          .inline-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            margin-top: 10px;
          }

          .language-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .language-item {
            display: flex;
            align-items: baseline;
            gap: 6px;
            padding-bottom: 6px;
            border-bottom: 1px dashed #ddd1c6;
          }

          .language-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .language-name {
            font-size: 13px;
            font-weight: 600;
            color: #342f2c;
          }

          .language-sep,
          .language-level {
            font-size: 13px;
            color: #685b51;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${headerBlock}
          ${profileBlock}
          ${skillsBlock}
          ${experienceBlock}
          ${projectsBlock}
          ${achievementsBlock}
          ${educationBlock}
          ${certificationsBlock}
          ${languagesBlock}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-cove-v1')) {
    customElements.define('gqr-resume-cove-v1', GQRResumeCoveV1);
  }
})();