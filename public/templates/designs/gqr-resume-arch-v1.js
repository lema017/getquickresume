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
      experience: 'Experiencia Laboral',
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

  function shortMonth(date, lang) {
    const months = {
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    };
    return months[lang] && months[lang][date.getMonth()] ? months[lang][date.getMonth()] : months.en[date.getMonth()];
  }

  function parseDate(value) {
    if (!value) return null;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  function formatShortDate(value, lang) {
    const d = parseDate(value);
    if (!d) return '';
    return shortMonth(d, lang) + ' ' + d.getFullYear();
  }

  function formatDateRange(startDate, endDate, lang, isCurrent, isCompleted) {
    const dict = I18N[lang] || I18N.en;
    const start = formatShortDate(startDate, lang);
    let end = formatShortDate(endDate, lang);

    const currentFlag = isCurrent === true;
    const incompleteEducation = isCompleted === false;

    if (currentFlag || incompleteEducation) {
      end = dict.present;
    }

    if (start && end) return start + ' — ' + end;
    return start || end || '';
  }

  class GQRResumeArchV1 extends HTMLElement {
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
      return this._data || {};
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      this.render();
    }

    getLanguage() {
      const attrLang = safeStr(this.getAttribute('language')).toLowerCase();
      const dataLang = safeStr(this.data && this.data.language).toLowerCase();
      const lang = attrLang || dataLang || 'en';
      return lang === 'es' ? 'es' : 'en';
    }

    renderSectionTitle(title) {
      return '<div class="section-title-wrap"><h2 class="section-title">' + escapeHtml(title) + '</h2><span class="section-line"></span></div>';
    }

    renderHeader(data) {
      const firstName = safeStr(data.firstName);
      const lastName = safeStr(data.lastName);
      const profession = safeStr(data.profession);
      const email = safeStr(data.email);
      const phone = safeStr(data.phone);
      const country = safeStr(data.country);
      const linkedin = safeStr(data.linkedin);

      const fullName = [firstName, lastName].filter(Boolean).join(' ');
      const contacts = [
        email ? '<span class="contact-pill">✉ ' + escapeHtml(email) + '</span>' : '',
        phone ? '<span class="contact-pill">☎ ' + escapeHtml(phone) + '</span>' : '',
        country ? '<span class="contact-pill">⚲ ' + escapeHtml(country) + '</span>' : '',
        linkedin ? '<span class="contact-pill">🔗 ' + escapeHtml(linkedin) + '</span>' : ''
      ].filter(Boolean).join('');

      if (!fullName && !profession && !contacts) return '';

      return ''
        + '<section class="header-card" data-section="header">'
        +   '<div class="header-accent"></div>'
        +   '<div class="header-inner">'
        +     (fullName ? '<h1 class="name">' + escapeHtml(fullName) + '</h1>' : '')
        +     (profession ? '<div class="profession">' + escapeHtml(profession) + '</div>' : '')
        +     (contacts ? '<div class="contact-row" data-section="contact">' + contacts + '</div>' : '')
        +   '</div>'
        + '</section>';
    }

    renderProfile(data, dict) {
      const summary = safeStr(data.summary);
      if (!summary) return '';
      return ''
        + '<section class="section" data-section="profile">'
        +   this.renderSectionTitle(dict.profile)
        +   '<div class="profile-text">' + escapeHtml(summary) + '</div>'
        + '</section>';
    }

    renderSkills(data, dict) {
      const skills = safeArr(data.skillsRaw);
      const tools = safeArr(data.toolsRaw);
      const merged = [];
      const seen = new Set();

      skills.concat(tools).forEach(function(item) {
        const val = safeStr(item).trim();
        if (!val) return;
        const key = val.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          merged.push(val);
        }
      });

      if (!merged.length) return '';

      return ''
        + '<section class="section" data-section="skills">'
        +   this.renderSectionTitle(dict.skills)
        +   '<div class="skills-grid">'
        +     merged.map(function(skill, index) {
                return '<span class="skill-chip" data-entry-id="skill-' + index + '">' + escapeHtml(skill) + '</span>';
              }).join('')
        +   '</div>'
        + '</section>';
    }

    renderExperience(data, dict, lang) {
      const items = safeArr(data.experience);
      if (!items.length) return '';

      const html = items.map(function(item, index) {
        const id = safeStr(item && item.id) || ('experience-' + index);
        const title = safeStr(item && item.title);
        const company = safeStr(item && item.company);
        const location = safeStr(item && item.location);
        const range = formatDateRange(
          item && item.startDate,
          item && item.endDate,
          lang,
          item && item.isCurrent === true,
          undefined
        );

        const bullets = safeArr(item && item.achievements).concat(safeArr(item && item.responsibilities))
          .map(function(b) { return safeStr(b).trim(); })
          .filter(Boolean);

        const headlineLeft = [title, company].filter(Boolean).join(' · ');
        const meta = [location].filter(Boolean).join(' · ');

        return ''
          + '<article class="entry" data-entry-id="' + escapeHtml(id) + '">'
          +   '<div class="entry-top">'
          +     '<div class="entry-main">'
          +       (headlineLeft ? '<h3 class="entry-title">' + escapeHtml(headlineLeft) + '</h3>' : '')
          +       (meta ? '<div class="entry-meta">' + escapeHtml(meta) + '</div>' : '')
          +     '</div>'
          +     (range ? '<div class="entry-date">' + escapeHtml(range) + '</div>' : '')
          +   '</div>'
          +   (bullets.length
                ? '<ul class="bullet-list">' + bullets.map(function(b) { return '<li>' + escapeHtml(b) + '</li>'; }).join('') + '</ul>'
                : '')
          + '</article>';
      }).join('');

      return ''
        + '<section class="section" data-section="experience">'
        +   this.renderSectionTitle(dict.experience)
        +   html
        + '</section>';
    }

    renderProjects(data, dict) {
      const items = safeArr(data.projects);
      if (!items.length) return '';

      const html = items.map(function(item, index) {
        const id = safeStr(item && item.id) || ('project-' + index);
        const name = safeStr(item && item.name);
        const description = safeStr(item && item.description);
        const technologies = safeArr(item && item.technologies).map(function(t) { return safeStr(t).trim(); }).filter(Boolean);
        const url = safeStr(item && item.url);

        return ''
          + '<article class="entry compact" data-entry-id="' + escapeHtml(id) + '">'
          +   (name ? '<h3 class="entry-title">' + escapeHtml(name) + '</h3>' : '')
          +   (description ? '<div class="entry-text">' + escapeHtml(description) + '</div>' : '')
          +   ((technologies.length || url)
                ? '<div class="project-footer">'
                    + (technologies.length ? '<div class="tech-line"><strong>Tech:</strong> ' + escapeHtml(technologies.join(', ')) + '</div>' : '')
                    + (url ? '<div class="link-line">' + escapeHtml(url) + '</div>' : '')
                + '</div>'
                : '')
          + '</article>';
      }).join('');

      return ''
        + '<section class="section" data-section="projects">'
        +   this.renderSectionTitle(dict.projects)
        +   html
        + '</section>';
    }

    renderAchievements(data, dict) {
      const items = safeArr(data.achievements);
      if (!items.length) return '';

      const html = items.map(function(item, index) {
        const id = safeStr(item && item.id) || ('achievement-' + index);
        const title = safeStr(item && item.title);
        const description = safeStr(item && item.description);
        const year = safeStr(item && item.year);

        return ''
          + '<article class="entry compact" data-entry-id="' + escapeHtml(id) + '">'
          +   '<div class="entry-top">'
          +     (title ? '<h3 class="entry-title">' + escapeHtml(title) + '</h3>' : '<div></div>')
          +     (year ? '<div class="entry-date">' + escapeHtml(year) + '</div>' : '')
          +   '</div>'
          +   (description ? '<div class="entry-text">' + escapeHtml(description) + '</div>' : '')
          + '</article>';
      }).join('');

      return ''
        + '<section class="section" data-section="achievements">'
        +   this.renderSectionTitle(dict.achievements)
        +   html
        + '</section>';
    }

    renderEducation(data, dict, lang) {
      const items = safeArr(data.education);
      if (!items.length) return '';

      const html = items.map(function(item, index) {
        const id = safeStr(item && item.id) || ('education-' + index);
        const degree = safeStr(item && item.degree);
        const field = safeStr(item && item.field);
        const institution = safeStr(item && item.institution);
        const gpa = safeStr(item && item.gpa);
        const title = [degree, field].filter(Boolean).join(' · ');
        const range = formatDateRange(
          item && item.startDate,
          item && item.endDate,
          lang,
          false,
          item && item.isCompleted
        );

        return ''
          + '<article class="entry" data-entry-id="' + escapeHtml(id) + '">'
          +   '<div class="entry-top">'
          +     '<div class="entry-main">'
          +       (title ? '<h3 class="entry-title">' + escapeHtml(title) + '</h3>' : '')
          +       (institution ? '<div class="entry-meta">' + escapeHtml(institution) + (gpa ? ' · GPA: ' + escapeHtml(gpa) : '') + '</div>' : (gpa ? '<div class="entry-meta">GPA: ' + escapeHtml(gpa) + '</div>' : ''))
          +     '</div>'
          +     (range ? '<div class="entry-date">' + escapeHtml(range) + '</div>' : '')
          +   '</div>'
          + '</article>';
      }).join('');

      return ''
        + '<section class="section" data-section="education">'
        +   this.renderSectionTitle(dict.education)
        +   html
        + '</section>';
    }

    renderCertifications(data, dict, lang) {
      const items = safeArr(data.certifications);
      if (!items.length) return '';

      const html = items.map(function(item, index) {
        const id = safeStr(item && item.id) || ('certification-' + index);
        const name = safeStr(item && item.name);
        const issuer = safeStr(item && item.issuer);
        const date = formatShortDate(item && item.date, lang);

        return ''
          + '<article class="entry compact" data-entry-id="' + escapeHtml(id) + '">'
          +   '<div class="entry-top">'
          +     '<div class="entry-main">'
          +       (name ? '<h3 class="entry-title">' + escapeHtml(name) + '</h3>' : '')
          +       (issuer ? '<div class="entry-meta">' + escapeHtml(issuer) + '</div>' : '')
          +     '</div>'
          +     (date ? '<div class="entry-date">' + escapeHtml(date) + '</div>' : '')
          +   '</div>'
          + '</article>';
      }).join('');

      return ''
        + '<section class="section" data-section="certifications">'
        +   this.renderSectionTitle(dict.certifications)
        +   html
        + '</section>';
    }

    renderLanguages(data, dict) {
      const items = safeArr(data.languages);
      if (!items.length) return '';

      const html = items.map(function(item, index) {
        const id = safeStr(item && item.id) || ('language-' + index);
        const name = safeStr(item && item.name);
        const levelKey = safeStr(item && item.level).toLowerCase();
        const level = dict.levelMap[levelKey] || safeStr(item && item.level);

        return ''
          + '<div class="language-row" data-entry-id="' + escapeHtml(id) + '">'
          +   '<span class="language-name">' + escapeHtml(name) + '</span>'
          +   '<span class="language-sep">—</span>'
          +   '<span class="language-level">' + escapeHtml(level) + '</span>'
          + '</div>';
      }).join('');

      return ''
        + '<section class="section" data-section="languages">'
        +   this.renderSectionTitle(dict.languages)
        +   '<div class="languages-list">' + html + '</div>'
        + '</section>';
    }

    render() {
      const data = this.data || {};
      const lang = this.getLanguage();
      const dict = I18N[lang] || I18N.en;

      const html = ''
        + '<style>'
        +   '@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap");'
        +   ':host {'
        +     'display: block;'
        +     'color: #2f2a26;'
        +     'background: #efe9e1;'
        +     '-webkit-print-color-adjust: exact;'
        +     'print-color-adjust: exact;'
        +   '}'
        +   '* { box-sizing: border-box; }'
        +   '.page {'
        +     'width: 210mm;'
        +     'min-height: 297mm;'
        +     'height: auto;'
        +     'overflow: visible;'
        +     'margin: 0 auto;'
        +     'background: #fcfbf8;'
        +     'padding: 36px 38px 40px;'
        +     'font-family: "Inter", Arial, sans-serif;'
        +     'line-height: 1.45;'
        +   '}'
        +   '.header-card {'
        +     'position: relative;'
        +     'background: linear-gradient(180deg, #d8d0c5 0%, #d2c8bc 100%);'
        +     'border: 1px solid #c8bcad;'
        +     'padding: 24px 24px 22px;'
        +     'margin-bottom: 24px;'
        +     'overflow: hidden;'
        +   '}'
        +   '.header-accent {'
        +     'position: absolute;'
        +     'right: -18px;'
        +     'top: -18px;'
        +     'width: 160px;'
        +     'height: 160px;'
        +     'border-radius: 50%;'
        +     'background: radial-gradient(circle at center, rgba(255,255,255,0.35) 0, rgba(255,255,255,0.12) 34%, rgba(255,255,255,0) 66%);'
        +     'opacity: 0.9;'
        +   '}'
        +   '.header-inner { position: relative; z-index: 1; }'
        +   '.name {'
        +     'margin: 0;'
        +     'font-family: "Cormorant Garamond", Georgia, serif;'
        +     'font-size: 31px;'
        +     'line-height: 1.0;'
        +     'font-weight: 600;'
        +     'letter-spacing: 0.2px;'
        +     'color: #2e2925;'
        +   '}'
        +   '.profession {'
        +     'margin-top: 8px;'
        +     'font-size: 12px;'
        +     'letter-spacing: 1.8px;'
        +     'text-transform: uppercase;'
        +     'color: #5f5348;'
        +     'font-weight: 600;'
        +   '}'
        +   '.contact-row {'
        +     'display: flex;'
        +     'flex-wrap: wrap;'
        +     'gap: 8px;'
        +     'margin-top: 16px;'
        +   '}'
        +   '.contact-pill {'
        +     'display: inline-flex;'
        +     'align-items: center;'
        +     'padding: 6px 10px;'
        +     'border: 1px solid #b9ab9c;'
        +     'background: rgba(255,255,255,0.45);'
        +     'border-radius: 999px;'
        +     'font-size: 11.5px;'
        +     'color: #463d36;'
        +   '}'
        +   '.section { margin-top: 18px; }'
        +   '.section-title-wrap {'
        +     'display: flex;'
        +     'align-items: center;'
        +     'gap: 12px;'
        +     'margin-bottom: 12px;'
        +   '}'
        +   '.section-title {'
        +     'margin: 0;'
        +     'font-size: 13px;'
        +     'line-height: 1.2;'
        +     'letter-spacing: 1.8px;'
        +     'text-transform: uppercase;'
        +     'font-weight: 700;'
        +     'color: #3b332d;'
        +     'white-space: nowrap;'
        +   '}'
        +   '.section-line {'
        +     'height: 1px;'
        +     'flex: 1;'
        +     'background: linear-gradient(90deg, #cdbca9 0%, #e9e0d5 100%);'
        +   '}'
        +   '.profile-text, .entry-text, .entry-meta, .tech-line, .link-line, .language-level {'
        +     'font-size: 12.5px;'
        +     'color: #4a433d;'
        +   '}'
        +   '.skills-grid {'
        +     'display: flex;'
        +     'flex-wrap: wrap;'
        +     'gap: 8px;'
        +   '}'
        +   '.skill-chip {'
        +     'display: inline-flex;'
        +     'align-items: center;'
        +     'padding: 7px 10px;'
        +     'border-radius: 999px;'
        +     'background: #f1ebe3;'
        +     'border: 1px solid #d9cbbc;'
        +     'font-size: 12px;'
        +     'color: #403933;'
        +   '}'
        +   '.entry {'
        +     'padding: 0 0 14px;'
        +     'margin-bottom: 14px;'
        +     'border-bottom: 1px solid #ece3d8;'
        +   '}'
        +   '.entry.compact:last-child, .entry:last-child { margin-bottom: 0; }'
        +   '.entry-top {'
        +     'display: flex;'
        +     'justify-content: space-between;'
        +     'align-items: flex-start;'
        +     'gap: 16px;'
        +   '}'
        +   '.entry-main { flex: 1; min-width: 0; }'
        +   '.entry-title {'
        +     'margin: 0;'
        +     'font-size: 15px;'
        +     'line-height: 1.25;'
        +     'font-weight: 700;'
        +     'color: #2f2a26;'
        +   '}'
        +   '.entry-meta { margin-top: 4px; }'
        +   '.entry-date {'
        +     'font-size: 11.5px;'
        +     'white-space: nowrap;'
        +     'color: #7a6d61;'
        +     'font-weight: 600;'
        +     'padding-top: 2px;'
        +   '}'
        +   '.bullet-list {'
        +     'margin: 8px 0 0 0;'
        +     'padding-left: 18px;'
        +   '}'
        +   '.bullet-list li {'
        +     'margin: 4px 0;'
        +     'font-size: 12.5px;'
        +     'color: #433c36;'
        +   '}'
        +   '.project-footer { margin-top: 6px; }'
        +   '.tech-line strong { color: #3a332d; }'
        +   '.link-line { margin-top: 2px; word-break: break-word; }'
        +   '.languages-list {'
        +     'display: grid;'
        +     'grid-template-columns: 1fr;'
        +     'gap: 8px;'
        +   '}'
        +   '.language-row {'
        +     'display: flex;'
        +     'align-items: baseline;'
        +     'gap: 8px;'
        +     'padding-bottom: 6px;'
        +     'border-bottom: 1px solid #efe5da;'
        +   '}'
        +   '.language-name {'
        +     'font-size: 13px;'
        +     'font-weight: 600;'
        +     'color: #312b27;'
        +   '}'
        +   '.language-sep { color: #8e8073; }'
        +   '@media print {'
        +     '.page {'
        +       'width: 210mm;'
        +       'min-height: 297mm;'
        +     '}'
        +   '}'
        + '</style>'
        + '<div class="page">'
        +   this.renderHeader(data)
        +   this.renderProfile(data, dict)
        +   this.renderSkills(data, dict)
        +   this.renderExperience(data, dict, lang)
        +   this.renderProjects(data, dict)
        +   this.renderAchievements(data, dict)
        +   this.renderEducation(data, dict, lang)
        +   this.renderCertifications(data, dict, lang)
        +   this.renderLanguages(data, dict)
        + '</div>';

      this.shadowRoot.innerHTML = html;
    }
  }

  if (!customElements.get('gqr-resume-arch-v1')) {
    customElements.define('gqr-resume-arch-v1', GQRResumeArchV1);
  }
})();