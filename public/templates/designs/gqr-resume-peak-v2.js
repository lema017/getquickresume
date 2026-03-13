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

  function uniqueId(prefix, index) {
    return prefix + '-' + index;
  }

  function formatShortDate(value, lang) {
    const raw = safeStr(value).trim();
    if (!raw) return '';
    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) return escapeHtml(raw);

    const months = lang === 'es'
      ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return months[date.getMonth()] + ' ' + date.getFullYear();
  }

  function formatDateRange(startDate, endDate, lang, currentFlag, educationCompletedFlag, isEducation) {
    const dict = I18N[lang] || I18N.en;
    const start = formatShortDate(startDate, lang);
    let end = '';

    if (isEducation) {
      if (educationCompletedFlag === false) {
        end = dict.present;
      } else {
        end = formatShortDate(endDate, lang);
      }
    } else {
      end = currentFlag ? dict.present : formatShortDate(endDate, lang);
    }

    if (start && end) return start + ' — ' + end;
    return start || end || '';
  }

  class GQRResumePeakV2 extends HTMLElement {
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

    renderHeader(data) {
      const firstName = safeStr(data.firstName).trim();
      const lastName = safeStr(data.lastName).trim();
      const profession = safeStr(data.profession).trim();
      const email = safeStr(data.email).trim();
      const phone = safeStr(data.phone).trim();
      const country = safeStr(data.country).trim();
      const linkedin = safeStr(data.linkedin).trim();

      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      const contacts = [
        email ? `✉ ${escapeHtml(email)}` : '',
        phone ? `☎ ${escapeHtml(phone)}` : '',
        country ? `⚲ ${escapeHtml(country)}` : '',
        linkedin ? `🔗 ${escapeHtml(linkedin)}` : ''
      ].filter(Boolean);

      if (!fullName && !profession && contacts.length === 0) return '';

      return `
        <section class="header" data-section="header">
          <div class="header-top">
            ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
            ${profession ? `<div class="profession">${escapeHtml(profession)}</div>` : ''}
          </div>
          ${contacts.length ? `
            <div class="contact-row" data-section="contact">
              ${contacts.map((item, index) => `
                <div class="contact-pill" data-entry-id="${uniqueId('contact', index)}">${item}</div>
              `).join('')}
            </div>
          ` : ''}
        </section>
      `;
    }

    renderProfile(data, t) {
      const summary = safeStr(data.summary).trim();
      if (!summary) return '';
      return `
        <section class="section" data-section="profile">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${escapeHtml(t.profile)}</h2>
          </div>
          <div class="section-body">
            <p class="summary">${escapeHtml(summary)}</p>
          </div>
        </section>
      `;
    }

    renderSkills(data, t) {
      const combined = [...safeArr(data.skillsRaw), ...safeArr(data.toolsRaw)]
        .map(function(item) { return safeStr(item).trim(); })
        .filter(Boolean);

      const deduped = combined.filter(function(item, index, arr) {
        return arr.findIndex(function(x) {
          return x.toLowerCase() === item.toLowerCase();
        }) === index;
      });

      if (!deduped.length) return '';

      return `
        <section class="section" data-section="skills">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${escapeHtml(t.skills)}</h2>
          </div>
          <div class="section-body">
            <div class="chips">
              ${deduped.map((skill, index) => `
                <span class="chip" data-entry-id="skill-${index}">${escapeHtml(skill)}</span>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    renderExperience(data, t, lang) {
      const items = safeArr(data.experience).filter(function(item) {
        return item && (safeStr(item.title).trim() || safeStr(item.company).trim());
      });

      if (!items.length) return '';

      return `
        <section class="section" data-section="experience">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${escapeHtml(t.experience)}</h2>
          </div>
          <div class="section-body stack">
            ${items.map((item, index) => {
              const id = safeStr(item.id).trim() || uniqueId('experience', index);
              const title = safeStr(item.title).trim();
              const company = safeStr(item.company).trim();
              const location = safeStr(item.location).trim();
              const range = formatDateRange(item.startDate, item.endDate, lang, !!item.isCurrent, true, false);
              const bullets = [...safeArr(item.achievements), ...safeArr(item.responsibilities)]
                .map(function(v) { return safeStr(v).trim(); })
                .filter(Boolean);

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${(title || company) ? `
                        <h3 class="entry-title">
                          ${title ? `<span>${escapeHtml(title)}</span>` : ''}
                          ${company ? `<span class="entry-sep">${title ? '•' : ''}</span><strong>${escapeHtml(company)}</strong>` : ''}
                        </h3>
                      ` : ''}
                      ${location ? `<div class="entry-meta">${escapeHtml(location)}</div>` : ''}
                    </div>
                    ${range ? `<div class="entry-date">${escapeHtml(range)}</div>` : ''}
                  </div>
                  ${bullets.length ? `
                    <ul class="bullet-list">
                      ${bullets.map(function(b) {
                        return `<li>${escapeHtml(b)}</li>`;
                      }).join('')}
                    </ul>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderProjects(data, t) {
      const items = safeArr(data.projects).filter(function(item) {
        return item && safeStr(item.name).trim();
      });

      if (!items.length) return '';

      return `
        <section class="section" data-section="projects">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${escapeHtml(t.projects)}</h2>
          </div>
          <div class="section-body stack">
            ${items.map((item, index) => {
              const id = safeStr(item.id).trim() || uniqueId('project', index);
              const name = safeStr(item.name).trim();
              const description = safeStr(item.description).trim();
              const technologies = safeArr(item.technologies).map(function(v) { return safeStr(v).trim(); }).filter(Boolean);
              const url = safeStr(item.url).trim();

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      <h3 class="entry-title"><strong>${escapeHtml(name)}</strong></h3>
                    </div>
                    ${url ? `<div class="entry-link">${escapeHtml(url)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                  ${technologies.length ? `
                    <div class="inline-tags">
                      ${technologies.map(function(tech, techIndex) {
                        return `<span class="mini-tag" data-entry-id="${escapeHtml(id)}-tech-${techIndex}">${escapeHtml(tech)}</span>`;
                      }).join('')}
                    </div>
                  ` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderAchievements(data, t) {
      const items = safeArr(data.achievements).filter(function(item) {
        return item && (safeStr(item.title).trim() || safeStr(item.description).trim());
      });

      if (!items.length) return '';

      return `
        <section class="section" data-section="achievements">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${escapeHtml(t.achievements)}</h2>
          </div>
          <div class="section-body stack">
            ${items.map((item, index) => {
              const id = safeStr(item.id).trim() || uniqueId('achievement', index);
              const title = safeStr(item.title).trim();
              const description = safeStr(item.description).trim();
              const year = safeStr(item.year).trim();

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      ${title ? `<h3 class="entry-title"><strong>${escapeHtml(title)}</strong></h3>` : ''}
                    </div>
                    ${year ? `<div class="entry-date">${escapeHtml(year)}</div>` : ''}
                  </div>
                  ${description ? `<p class="entry-text">${escapeHtml(description)}</p>` : ''}
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderEducation(data, t, lang) {
      const items = safeArr(data.education).filter(function(item) {
        return item && (safeStr(item.degree).trim() || safeStr(item.institution).trim());
      });

      if (!items.length) return '';

      return `
        <section class="section" data-section="education">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${escapeHtml(t.education)}</h2>
          </div>
          <div class="section-body stack">
            ${items.map((item, index) => {
              const id = safeStr(item.id).trim() || uniqueId('education', index);
              const degree = safeStr(item.degree).trim();
              const field = safeStr(item.field).trim();
              const institution = safeStr(item.institution).trim();
              const gpa = safeStr(item.gpa).trim();
              const range = formatDateRange(item.startDate, item.endDate, lang, false, item.isCompleted, true);

              return `
                <article class="entry" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      <h3 class="entry-title">
                        ${degree ? `<span>${escapeHtml(degree)}</span>` : ''}
                        ${field ? `<span class="entry-sep">${degree ? '—' : ''}</span><strong>${escapeHtml(field)}</strong>` : ''}
                      </h3>
                      ${institution ? `<div class="entry-meta">${escapeHtml(institution)}${gpa ? ` · GPA: ${escapeHtml(gpa)}` : ''}</div>` : (gpa ? `<div class="entry-meta">GPA: ${escapeHtml(gpa)}</div>` : '')}
                    </div>
                    ${range ? `<div class="entry-date">${escapeHtml(range)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderCertifications(data, t, lang) {
      const items = safeArr(data.certifications).filter(function(item) {
        return item && (safeStr(item.name).trim() || safeStr(item.issuer).trim());
      });

      if (!items.length) return '';

      return `
        <section class="section" data-section="certifications">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${escapeHtml(t.certifications)}</h2>
          </div>
          <div class="section-body stack">
            ${items.map((item, index) => {
              const id = safeStr(item.id).trim() || uniqueId('certification', index);
              const name = safeStr(item.name).trim();
              const issuer = safeStr(item.issuer).trim();
              const date = formatShortDate(item.date, lang);

              return `
                <article class="entry compact" data-entry-id="${escapeHtml(id)}">
                  <div class="entry-head">
                    <div class="entry-main">
                      <h3 class="entry-title">
                        ${name ? `<strong>${escapeHtml(name)}</strong>` : ''}
                        ${issuer ? `<span class="entry-sep">${name ? '•' : ''}</span><span>${escapeHtml(issuer)}</span>` : ''}
                      </h3>
                    </div>
                    ${date ? `<div class="entry-date">${escapeHtml(date)}</div>` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    renderLanguages(data, t, lang) {
      const items = safeArr(data.languages).filter(function(item) {
        return item && safeStr(item.name).trim();
      });

      if (!items.length) return '';

      return `
        <section class="section" data-section="languages">
          <div class="section-heading">
            <span class="section-kicker"></span>
            <h2>${escapeHtml(t.languages)}</h2>
          </div>
          <div class="section-body">
            <div class="language-list">
              ${items.map((item, index) => {
                const id = safeStr(item.id).trim() || uniqueId('language', index);
                const name = safeStr(item.name).trim();
                const levelKey = safeStr(item.level).trim().toLowerCase();
                const levelText = (I18N[lang] && I18N[lang].levelMap && I18N[lang].levelMap[levelKey]) || levelKey || '';

                return `
                  <div class="language-item" data-entry-id="${escapeHtml(id)}">
                    <span class="language-name">${escapeHtml(name)}</span>
                    <span class="language-level">${escapeHtml(levelText)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </section>
      `;
    }

    render() {
      const data = this._data || {};
      const lang = this.getLanguage();
      const t = I18N[lang] || I18N.en;

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            color: #2a2727;
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
            background: #fcfbf8;
            color: #2a2727;
            padding: 18mm 16mm 18mm 16mm;
            font-family: Georgia, "Times New Roman", serif;
            line-height: 1.42;
            position: relative;
          }

          .page::before {
            content: "";
            position: absolute;
            inset: 0;
            border-top: 9px solid #2f2b2c;
            pointer-events: none;
          }

          .header {
            padding: 14px 0 18px;
            border-bottom: 1px solid #d8cec3;
            margin-bottom: 20px;
          }

          .header-top {
            display: block;
          }

          .name {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 31px;
            line-height: 1.05;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: #2f2b2c;
            font-weight: 800;
          }

          .profession {
            margin-top: 7px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #8b705e;
            font-weight: 700;
          }

          .contact-row {
            margin-top: 14px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .contact-pill {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11.5px;
            line-height: 1.2;
            color: #3b3536;
            background: #efe6dc;
            border: 1px solid #ded0c3;
            border-radius: 999px;
            padding: 6px 10px;
          }

          .section {
            margin-top: 18px;
          }

          .section-heading {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
          }

          .section-kicker {
            width: 18px;
            height: 18px;
            border: 2px solid #b89574;
            display: inline-block;
            transform: rotate(45deg);
            background: transparent;
            flex: 0 0 auto;
            margin-left: 2px;
          }

          .section-heading h2 {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 13px;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: #2f2b2c;
            font-weight: 800;
          }

          .section-body {
            padding-left: 2px;
          }

          .summary,
          .entry-text {
            margin: 0;
            font-size: 13px;
            color: #423c3c;
          }

          .chips {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .chip {
            display: inline-block;
            padding: 6px 10px;
            border-radius: 4px;
            background: #2f2b2c;
            color: #fbf8f3;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11.5px;
            letter-spacing: 0.03em;
          }

          .stack {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .entry {
            padding-bottom: 12px;
            border-bottom: 1px solid #e6ddd3;
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
          }

          .entry-main {
            flex: 1 1 auto;
            min-width: 0;
          }

          .entry-title {
            margin: 0;
            font-size: 15px;
            line-height: 1.3;
            color: #2f2b2c;
            font-weight: 500;
          }

          .entry-title strong {
            font-weight: 700;
          }

          .entry-sep {
            display: inline-block;
            margin: 0 6px;
            color: #b89574;
            font-weight: 700;
          }

          .entry-meta {
            margin-top: 3px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11.5px;
            letter-spacing: 0.03em;
            color: #7a6960;
          }

          .entry-date,
          .entry-link {
            flex: 0 0 auto;
            text-align: right;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11.5px;
            line-height: 1.35;
            color: #7f6756;
            white-space: nowrap;
          }

          .entry-text {
            margin-top: 6px;
          }

          .bullet-list {
            margin: 8px 0 0 0;
            padding: 0 0 0 18px;
          }

          .bullet-list li {
            margin: 0 0 4px 0;
            font-size: 12.5px;
            color: #423c3c;
          }

          .inline-tags {
            margin-top: 8px;
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .mini-tag {
            display: inline-block;
            padding: 4px 8px;
            border: 1px solid #d9c9bb;
            background: #f6f0e9;
            color: #5a4a42;
            border-radius: 999px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10.5px;
            letter-spacing: 0.03em;
          }

          .language-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px 18px;
          }

          .language-item {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 12px;
            padding: 8px 10px;
            background: #f5eee7;
            border: 1px solid #e2d5c8;
          }

          .language-name {
            font-size: 13px;
            color: #2f2b2c;
          }

          .language-level {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11.5px;
            color: #7f6756;
            text-transform: uppercase;
            letter-spacing: 0.06em;
          }

          @media print {
            .page {
              width: 210mm;
              min-height: 297mm;
            }
          }
        </style>

        <div class="page">
          ${this.renderHeader(data)}
          ${this.renderProfile(data, t)}
          ${this.renderSkills(data, t)}
          ${this.renderExperience(data, t, lang)}
          ${this.renderProjects(data, t)}
          ${this.renderAchievements(data, t)}
          ${this.renderEducation(data, t, lang)}
          ${this.renderCertifications(data, t, lang)}
          ${this.renderLanguages(data, t, lang)}
        </div>
      `;
    }
  }

  if (!customElements.get('gqr-resume-peak-v2')) {
    customElements.define('gqr-resume-peak-v2', GQRResumePeakV2);
  }
})();