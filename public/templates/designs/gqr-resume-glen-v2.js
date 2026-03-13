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

  function uniqStrings(arr) {
    const seen = new Set();
    return safeArr(arr).filter(function(item) {
      const key = safeStr(item).trim().toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map(function(item) {
      return safeStr(item).trim();
    });
  }

  function parseDate(value) {
    if (!value) return null;
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d;

    const s = safeStr(value).trim();
    if (/^\d{4}-\d{2}$/.test(s)) {
      const parts = s.split('-');
      const year = Number(parts[0]);
      const month = Number(parts[1]) - 1;
      return new Date(year, month, 1);
    }
    if (/^\d{4}$/.test(s)) {
      return new Date(Number(s), 0, 1);
    }
    return null;
  }

  function formatShortDate(value, lang) {
    const d = parseDate(value);
    if (!d) return escapeHtml(safeStr(value));
    return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      month: 'short',
      year: 'numeric'
    }).format(d);
  }

  function formatDateRange(startDate, endDate, lang, isCurrentLike) {
    const dict = I18N[lang] || I18N.en;
    const start = startDate ? formatShortDate(startDate, lang) : '';
    const end = isCurrentLike ? dict.present : (endDate ? formatShortDate(endDate, lang) : '');
    if (start && end) return start + ' — ' + end;
    if (start) return start;
    if (end) return end;
    return '';
  }

  class GQRResumeGlenV2 extends HTMLElement {
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

    attributeChangedCallback() {
      this.render();
    }

    getLanguage() {
      const attrLang = safeStr(this.getAttribute('language')).toLowerCase();
      const dataLang = safeStr(this._data && this._data.language).toLowerCase();
      const lang = attrLang || dataLang || 'en';
      return lang === 'es' ? 'es' : 'en';
    }

    renderHeader(header) {
      const firstName = safeStr(header.firstName).trim();
      const lastName = safeStr(header.lastName).trim();
      const fullName = [firstName, lastName].filter(Boolean).join(' ');
      const profession = safeStr(header.profession).trim();

      const contacts = [
        header.email ? { icon: '✉', text: header.email, href: 'mailto:' + safeStr(header.email) } : null,
        header.phone ? { icon: '☎', text: header.phone, href: 'tel:' + safeStr(header.phone) } : null,
        header.country ? { icon: '⚲', text: header.country, href: '' } : null,
        header.linkedin ? { icon: '🔗', text: header.linkedin, href: safeStr(header.linkedin) } : null
      ].filter(Boolean);

      const contactHtml = contacts.length ? (
        '<div class="contact-row" data-section="contact">' +
          contacts.map(function(item, index) {
            const content = '<span class="contact-icon">' + escapeHtml(item.icon) + '</span><span>' + escapeHtml(item.text) + '</span>';
            if (item.href) {
              const safeHref = escapeHtml(item.href);
              return '<a class="contact-pill" href="' + safeHref + '" target="_blank" rel="noopener noreferrer" data-entry-id="contact-' + index + '">' + content + '</a>';
            }
            return '<div class="contact-pill" data-entry-id="contact-' + index + '">' + content + '</div>';
          }).join('') +
        '</div>'
      ) : '';

      if (!fullName && !profession && !contacts.length) return '';

      return (
        '<header class="hero" data-section="header">' +
          '<div class="hero-accent"></div>' +
          '<div class="hero-inner">' +
            (fullName ? '<h1 class="name">' + escapeHtml(fullName) + '</h1>' : '') +
            (profession ? '<div class="profession">' + escapeHtml(profession) + '</div>' : '') +
            contactHtml +
          '</div>' +
        '</header>'
      );
    }

    renderProfile(summary, lang) {
      const text = safeStr(summary).trim();
      if (!text) return '';
      return (
        '<section class="section" data-section="profile">' +
          '<div class="section-heading"><span>' + escapeHtml(I18N[lang].profile) + '</span></div>' +
          '<div class="section-body">' +
            '<p class="summary">' + escapeHtml(text) + '</p>' +
          '</div>' +
        '</section>'
      );
    }

    renderSkills(data, lang) {
      const skills = uniqStrings([].concat(safeArr(data.skillsRaw), safeArr(data.toolsRaw)));
      if (!skills.length) return '';
      return (
        '<section class="section" data-section="skills">' +
          '<div class="section-heading"><span>' + escapeHtml(I18N[lang].skills) + '</span></div>' +
          '<div class="section-body">' +
            '<div class="chips">' +
              skills.map(function(skill, index) {
                return '<span class="chip" data-entry-id="skill-' + index + '">' + escapeHtml(skill) + '</span>';
              }).join('') +
            '</div>' +
          '</div>' +
        '</section>'
      );
    }

    renderExperience(experience, lang) {
      const items = safeArr(experience).filter(function(item) {
        return item && (item.title || item.company || item.startDate || item.endDate || item.location || safeArr(item.achievements).length || safeArr(item.responsibilities).length);
      });
      if (!items.length) return '';

      return (
        '<section class="section" data-section="experience">' +
          '<div class="section-heading"><span>' + escapeHtml(I18N[lang].experience) + '</span></div>' +
          '<div class="section-body stack">' +
            items.map(function(item, index) {
              const id = safeStr(item.id) || ('experience-' + index);
              const title = safeStr(item.title).trim();
              const company = safeStr(item.company).trim();
              const location = safeStr(item.location).trim();
              const dateRange = formatDateRange(item.startDate, item.endDate, lang, !!item.isCurrent);
              const bullets = [].concat(safeArr(item.achievements), safeArr(item.responsibilities)).filter(function(v) {
                return safeStr(v).trim();
              });

              return (
                '<article class="entry" data-entry-id="' + escapeHtml(id) + '">' +
                  '<div class="entry-top">' +
                    '<div>' +
                      ((title || company) ? '<h3 class="entry-title">' + escapeHtml(title) + (company ? '<span class="muted"> · ' + escapeHtml(company) + '</span>' : '') + '</h3>' : '') +
                      (location ? '<div class="entry-meta">' + escapeHtml(location) + '</div>' : '') +
                    '</div>' +
                    (dateRange ? '<div class="entry-date">' + escapeHtml(dateRange) + '</div>' : '') +
                  '</div>' +
                  (bullets.length ? (
                    '<ul class="bullets">' +
                      bullets.map(function(b) {
                        return '<li>' + escapeHtml(b) + '</li>';
                      }).join('') +
                    '</ul>'
                  ) : '') +
                '</article>'
              );
            }).join('') +
          '</div>' +
        '</section>'
      );
    }

    renderProjects(projects, lang) {
      const items = safeArr(projects).filter(function(item) {
        return item && (item.name || item.description || safeArr(item.technologies).length || item.url);
      });
      if (!items.length) return '';

      return (
        '<section class="section" data-section="projects">' +
          '<div class="section-heading"><span>' + escapeHtml(I18N[lang].projects) + '</span></div>' +
          '<div class="section-body stack">' +
            items.map(function(item, index) {
              const id = safeStr(item.id) || ('project-' + index);
              const name = safeStr(item.name).trim();
              const description = safeStr(item.description).trim();
              const technologies = uniqStrings(item.technologies);
              const url = safeStr(item.url).trim();

              return (
                '<article class="entry" data-entry-id="' + escapeHtml(id) + '">' +
                  '<div class="entry-top">' +
                    '<div>' +
                      (name ? '<h3 class="entry-title">' + escapeHtml(name) + '</h3>' : '') +
                    '</div>' +
                    (url ? '<a class="entry-link" href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(url) + '</a>' : '') +
                  '</div>' +
                  (description ? '<p class="entry-text">' + escapeHtml(description) + '</p>' : '') +
                  (technologies.length ? (
                    '<div class="chips chips-subtle">' +
                      technologies.map(function(tech, techIndex) {
                        return '<span class="chip chip-subtle" data-entry-id="' + escapeHtml(id) + '-tech-' + techIndex + '">' + escapeHtml(tech) + '</span>';
                      }).join('')
                    + '</div>'
                  ) : '') +
                '</article>'
              );
            }).join('') +
          '</div>' +
        '</section>'
      );
    }

    renderAchievements(achievements, lang) {
      const items = safeArr(achievements).filter(function(item) {
        return item && (item.title || item.description || item.year);
      });
      if (!items.length) return '';

      return (
        '<section class="section" data-section="achievements">' +
          '<div class="section-heading"><span>' + escapeHtml(I18N[lang].achievements) + '</span></div>' +
          '<div class="section-body stack">' +
            items.map(function(item, index) {
              const id = safeStr(item.id) || ('achievement-' + index);
              const title = safeStr(item.title).trim();
              const description = safeStr(item.description).trim();
              const year = safeStr(item.year).trim();

              return (
                '<article class="entry compact" data-entry-id="' + escapeHtml(id) + '">' +
                  '<div class="entry-top">' +
                    '<div>' + (title ? '<h3 class="entry-title">' + escapeHtml(title) + '</h3>' : '') + '</div>' +
                    (year ? '<div class="entry-date">' + escapeHtml(year) + '</div>' : '') +
                  '</div>' +
                  (description ? '<p class="entry-text">' + escapeHtml(description) + '</p>' : '') +
                '</article>'
              );
            }).join('') +
          '</div>' +
        '</section>'
      );
    }

    renderEducation(education, lang) {
      const items = safeArr(education).filter(function(item) {
        return item && (item.degree || item.field || item.institution || item.startDate || item.endDate || item.gpa);
      });
      if (!items.length) return '';

      return (
        '<section class="section" data-section="education">' +
          '<div class="section-heading"><span>' + escapeHtml(I18N[lang].education) + '</span></div>' +
          '<div class="section-body stack">' +
            items.map(function(item, index) {
              const id = safeStr(item.id) || ('education-' + index);
              const degree = safeStr(item.degree).trim();
              const field = safeStr(item.field).trim();
              const institution = safeStr(item.institution).trim();
              const gpa = safeStr(item.gpa).trim();
              const isCurrentLike = item.isCompleted === false;
              const dateRange = formatDateRange(item.startDate, item.endDate, lang, isCurrentLike);

              return (
                '<article class="entry" data-entry-id="' + escapeHtml(id) + '">' +
                  '<div class="entry-top">' +
                    '<div>' +
                      ((degree || field) ? '<h3 class="entry-title">' + escapeHtml(degree) + (field ? '<span class="muted"> · ' + escapeHtml(field) + '</span>' : '') + '</h3>' : '') +
                      (institution ? '<div class="entry-meta">' + escapeHtml(institution) + (gpa ? ' · GPA: ' + escapeHtml(gpa) : '') + '</div>' : (gpa ? '<div class="entry-meta">GPA: ' + escapeHtml(gpa) + '</div>' : '')) +
                    '</div>' +
                    (dateRange ? '<div class="entry-date">' + escapeHtml(dateRange) + '</div>' : '') +
                  '</div>' +
                '</article>'
              );
            }).join('') +
          '</div>' +
        '</section>'
      );
    }

    renderCertifications(certifications, lang) {
      const items = safeArr(certifications).filter(function(item) {
        return item && (item.name || item.issuer || item.date);
      });
      if (!items.length) return '';

      return (
        '<section class="section" data-section="certifications">' +
          '<div class="section-heading"><span>' + escapeHtml(I18N[lang].certifications) + '</span></div>' +
          '<div class="section-body stack">' +
            items.map(function(item, index) {
              const id = safeStr(item.id) || ('certification-' + index);
              const name = safeStr(item.name).trim();
              const issuer = safeStr(item.issuer).trim();
              const date = item.date ? formatShortDate(item.date, lang) : '';

              return (
                '<article class="entry compact" data-entry-id="' + escapeHtml(id) + '">' +
                  '<div class="entry-top">' +
                    '<div>' +
                      (name ? '<h3 class="entry-title">' + escapeHtml(name) + '</h3>' : '') +
                      (issuer ? '<div class="entry-meta">' + escapeHtml(issuer) + '</div>' : '') +
                    '</div>' +
                    (date ? '<div class="entry-date">' + escapeHtml(date) + '</div>' : '') +
                  '</div>' +
                '</article>'
              );
            }).join('') +
          '</div>' +
        '</section>'
      );
    }

    renderLanguages(languages, lang) {
      const items = safeArr(languages).filter(function(item) {
        return item && item.name;
      });
      if (!items.length) return '';

      const levelMap = I18N[lang].levelMap || I18N.en.levelMap;
      const levelDots = {
        basic: 1,
        intermediate: 2,
        advanced: 3,
        native: 4
      };

      return (
        '<section class="section" data-section="languages">' +
          '<div class="section-heading"><span>' + escapeHtml(I18N[lang].languages) + '</span></div>' +
          '<div class="section-body stack compact-stack">' +
            items.map(function(item, index) {
              const id = safeStr(item.id) || ('language-' + index);
              const name = safeStr(item.name).trim();
              const levelKey = safeStr(item.level).toLowerCase();
              const translatedLevel = levelMap[levelKey] || safeStr(item.level);
              const activeDots = levelDots[levelKey] || 0;
              let dotsHtml = '';
              for (let i = 0; i < 4; i++) {
                dotsHtml += '<span class="dot' + (i < activeDots ? ' active' : '') + '"></span>';
              }

              return (
                '<article class="lang-row" data-entry-id="' + escapeHtml(id) + '">' +
                  '<div class="lang-main">' +
                    '<span class="lang-name">' + escapeHtml(name) + '</span>' +
                    '<span class="lang-level">' + escapeHtml(translatedLevel) + '</span>' +
                  '</div>' +
                  '<div class="dots" aria-hidden="true">' + dotsHtml + '</div>' +
                '</article>'
              );
            }).join('') +
          '</div>' +
        '</section>'
      );
    }

    render() {
      const lang = this.getLanguage();
      const data = this._data || {};
      const header = data || {};

      const html = ''
        + '<style>'
        + '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Oswald:wght@500;600;700&display=swap");'
        + ':host {'
        + '  display: block;'
        + '  color: #f5f1e8;'
        + '  -webkit-print-color-adjust: exact;'
        + '  print-color-adjust: exact;'
        + '}'
        + '* { box-sizing: border-box; }'
        + '.page {'
        + '  width: 210mm;'
        + '  min-height: 297mm;'
        + '  height: auto;'
        + '  overflow: visible;'
        + '  margin: 0 auto;'
        + '  padding: 18mm 16mm 18mm;'
        + '  background: linear-gradient(180deg, #111315 0%, #17191c 14%, #131517 100%);'
        + '  color: #f2eee6;'
        + '  font-family: Inter, Arial, sans-serif;'
        + '  line-height: 1.45;'
        + '}'
        + '.hero {'
        + '  position: relative;'
        + '  margin-bottom: 18px;'
        + '  border: 1px solid rgba(255,255,255,0.08);'
        + '  background: linear-gradient(135deg, rgba(255,179,71,0.12), rgba(255,255,255,0.02) 40%, rgba(0,0,0,0.12));'
        + '  overflow: hidden;'
        + '}'
        + '.hero-accent {'
        + '  height: 8px;'
        + '  background: linear-gradient(90deg, #d79a2b 0%, #f0b64c 35%, #7f5a15 100%);'
        + '}'
        + '.hero-inner {'
        + '  padding: 16px 18px 14px;'
        + '}'
        + '.name {'
        + '  margin: 0;'
        + '  font-family: Oswald, Impact, sans-serif;'
        + '  font-size: 34px;'
        + '  line-height: 1;'
        + '  letter-spacing: 0.6px;'
        + '  text-transform: uppercase;'
        + '  color: #ffffff;'
        + '}'
        + '.profession {'
        + '  margin-top: 6px;'
        + '  color: #f0b64c;'
        + '  font-size: 12px;'
        + '  font-weight: 700;'
        + '  letter-spacing: 1.8px;'
        + '  text-transform: uppercase;'
        + '}'
        + '.contact-row {'
        + '  display: flex;'
        + '  flex-wrap: wrap;'
        + '  gap: 8px;'
        + '  margin-top: 14px;'
        + '}'
        + '.contact-pill {'
        + '  display: inline-flex;'
        + '  align-items: center;'
        + '  gap: 6px;'
        + '  padding: 6px 10px;'
        + '  font-size: 11px;'
        + '  color: #e9e3d6;'
        + '  text-decoration: none;'
        + '  border: 1px solid rgba(240,182,76,0.28);'
        + '  background: rgba(255,255,255,0.03);'
        + '}'
        + '.contact-icon {'
        + '  color: #f0b64c;'
        + '  font-size: 11px;'
        + '}'
        + '.section {'
        + '  margin-top: 14px;'
        + '}'
        + '.section-heading {'
        + '  display: flex;'
        + '  align-items: center;'
        + '  gap: 12px;'
        + '  margin-bottom: 10px;'
        + '}'
        + '.section-heading span {'
        + '  font-family: Oswald, Impact, sans-serif;'
        + '  font-size: 22px;'
        + '  line-height: 1;'
        + '  letter-spacing: 0.5px;'
        + '  text-transform: uppercase;'
        + '  color: #f0b64c;'
        + '  white-space: nowrap;'
        + '}'
        + '.section-heading::after {'
        + '  content: "";'
        + '  height: 1px;'
        + '  flex: 1;'
        + '  background: linear-gradient(90deg, rgba(240,182,76,0.55), rgba(255,255,255,0.08));'
        + '}'
        + '.section-body {'
        + '  padding: 0 1px;'
        + '}'
        + '.summary, .entry-text {'
        + '  margin: 0;'
        + '  font-size: 12.5px;'
        + '  color: #ece7dc;'
        + '}'
        + '.chips {'
        + '  display: flex;'
        + '  flex-wrap: wrap;'
        + '  gap: 8px;'
        + '}'
        + '.chip {'
        + '  display: inline-flex;'
        + '  align-items: center;'
        + '  min-height: 28px;'
        + '  padding: 6px 10px;'
        + '  border: 1px solid rgba(240,182,76,0.35);'
        + '  background: rgba(255,255,255,0.035);'
        + '  color: #f8f4ec;'
        + '  font-size: 11.5px;'
        + '  font-weight: 500;'
        + '}'
        + '.chips-subtle {'
        + '  margin-top: 10px;'
        + '}'
        + '.chip-subtle {'
        + '  border-color: rgba(255,255,255,0.12);'
        + '  background: rgba(255,255,255,0.02);'
        + '  color: #ddd6c9;'
        + '}'
        + '.stack {'
        + '  display: flex;'
        + '  flex-direction: column;'
        + '  gap: 14px;'
        + '}'
        + '.compact-stack {'
        + '  gap: 10px;'
        + '}'
        + '.entry {'
        + '  padding: 12px 12px 11px;'
        + '  border: 1px solid rgba(255,255,255,0.08);'
        + '  background: rgba(255,255,255,0.025);'
        + '}'
        + '.entry.compact {'
        + '  padding-top: 10px;'
        + '  padding-bottom: 10px;'
        + '}'
        + '.entry-top {'
        + '  display: flex;'
        + '  justify-content: space-between;'
        + '  align-items: flex-start;'
        + '  gap: 14px;'
        + '}'
        + '.entry-title {'
        + '  margin: 0;'
        + '  font-size: 14px;'
        + '  line-height: 1.3;'
        + '  font-weight: 700;'
        + '  color: #ffffff;'
        + '}'
        + '.muted {'
        + '  color: #d5ccbe;'
        + '  font-weight: 500;'
        + '}'
        + '.entry-meta {'
        + '  margin-top: 4px;'
        + '  font-size: 11.5px;'
        + '  color: #cfc6b8;'
        + '}'
        + '.entry-date {'
        + '  flex: 0 0 auto;'
        + '  font-size: 11px;'
        + '  font-weight: 700;'
        + '  color: #f0b64c;'
        + '  text-transform: uppercase;'
        + '  letter-spacing: 0.5px;'
        + '  white-space: nowrap;'
        + '  padding-top: 2px;'
        + '}'
        + '.entry-link {'
        + '  color: #f0b64c;'
        + '  font-size: 11px;'
        + '  text-decoration: none;'
        + '  word-break: break-all;'
        + '}'
        + '.bullets {'
        + '  margin: 10px 0 0 0;'
        + '  padding: 0;'
        + '  list-style: none;'
        + '}'
        + '.bullets li {'
        + '  position: relative;'
        + '  margin: 0 0 6px 0;'
        + '  padding-left: 14px;'
        + '  font-size: 12px;'
        + '  color: #ece7dc;'
        + '}'
        + '.bullets li:last-child {'
        + '  margin-bottom: 0;'
        + '}'
        + '.bullets li::before {'
        + '  content: "";'
        + '  position: absolute;'
        + '  left: 0;'
        + '  top: 0.62em;'
        + '  width: 6px;'
        + '  height: 6px;'
        + '  background: #f0b64c;'
        + '  transform: rotate(45deg);'
        + '}'
        + '.lang-row {'
        + '  display: flex;'
        + '  justify-content: space-between;'
        + '  align-items: center;'
        + '  gap: 12px;'
        + '  padding: 10px 12px;'
        + '  border: 1px solid rgba(255,255,255,0.08);'
        + '  background: rgba(255,255,255,0.022);'
        + '}'
        + '.lang-main {'
        + '  display: flex;'
        + '  flex-wrap: wrap;'
        + '  gap: 8px;'
        + '  align-items: baseline;'
        + '}'
        + '.lang-name {'
        + '  font-size: 13px;'
        + '  font-weight: 700;'
        + '  color: #ffffff;'
        + '}'
        + '.lang-level {'
        + '  font-size: 11.5px;'
        + '  color: #d9cfbf;'
        + '}'
        + '.dots {'
        + '  display: inline-flex;'
        + '  gap: 6px;'
        + '}'
        + '.dot {'
        + '  width: 9px;'
        + '  height: 9px;'
        + '  border: 1px solid rgba(240,182,76,0.55);'
        + '  background: transparent;'
        + '  border-radius: 50%;'
        + '}'
        + '.dot.active {'
        + '  background: #f0b64c;'
        + '}'
        + '@media print {'
        + '  .page {'
        + '    width: 210mm;'
        + '    min-height: 297mm;'
        + '  }'
        + '}'
        + '</style>'
        + '<div class="page">'
        +   this.renderHeader(header)
        +   this.renderProfile(data.summary, lang)
        +   this.renderSkills(data, lang)
        +   this.renderExperience(data.experience, lang)
        +   this.renderProjects(data.projects, lang)
        +   this.renderAchievements(data.achievements, lang)
        +   this.renderEducation(data.education, lang)
        +   this.renderCertifications(data.certifications, lang)
        +   this.renderLanguages(data.languages, lang)
        + '</div>';

      this.shadowRoot.innerHTML = html;
    }
  }

  if (!customElements.get('gqr-resume-glen-v2')) {
    customElements.define('gqr-resume-glen-v2', GQRResumeGlenV2);
  }
})();