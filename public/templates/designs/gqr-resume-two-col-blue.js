/**
 * name: gqr-resume-two-col-blue
 * generatedAt: 2025-01-11T00:00:00.000Z
 * description: "Resume component styled with two-column layout: dark blue sidebar (left) and white main content (right), matching the reference design."
 */

(function() {
  'use strict';

  const i18n = {
    es: {
      summary: "Resumen",
      experience: "Experiencia",
      education: "Educación",
      projects: "Proyectos",
      certifications: "Certificaciones",
      languages: "Idiomas",
      achievements: "Logros",
      skills: "Habilidades",
      contact: "Contacto",
      objective: "Objetivo",
      workExperience: "Experiencia Laboral",
      profile: "Perfil",
      current: "Actual",
      present: "Presente",
      basic: "Básico",
      intermediate: "Intermedio",
      advanced: "Avanzado",
      native: "Nativo"
    },
    en: {
      summary: "Summary",
      experience: "Work Experience",
      education: "Education",
      projects: "Projects",
      certifications: "Certifications",
      languages: "Languages",
      achievements: "Achievements",
      skills: "Skills",
      contact: "Contact",
      objective: "Objective",
      workExperience: "Work Experience",
      profile: "Profile",
      current: "Current",
      present: "Present",
      basic: "Basic",
      intermediate: "Intermediate",
      advanced: "Advanced",
      native: "Native"
    }
  };

  const levelMap = {
    es: {
      basic: "Básico",
      intermediate: "Intermedio",
      advanced: "Avanzado",
      native: "Nativo"
    },
    en: {
      basic: "Basic",
      intermediate: "Intermediate",
      advanced: "Advanced",
      native: "Native"
    }
  };

  const targetLevelMap = {
    es: {
      entry: "Nivel Inicial",
      junior: "Junior",
      mid: "Mid-Level",
      senior: "Senior",
      lead: "Lead",
      executive: "Ejecutivo"
    },
    en: {
      entry: "Entry Level",
      junior: "Junior",
      mid: "Mid-Level",
      senior: "Senior",
      lead: "Lead",
      executive: "Executive"
    }
  };

  function safeStr(val) {
    return (val != null && typeof val === 'string') ? val : '';
  }

  function safeArr(val) {
    return Array.isArray(val) ? val : [];
  }

  function formatDate(dateStr, lang) {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      
      const monthNames = {
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      };
      const months = monthNames[lang] || monthNames.en;
      return `${months[date.getMonth()]} ${date.getFullYear()}`;
    } catch {
      return dateStr;
    }
  }

  function formatDateRange(startDate, endDate, isCurrent, lang) {
    const start = formatDate(startDate, lang);
    if (!endDate && !isCurrent) return start;
    const end = isCurrent ? (i18n[lang]?.current || 'Current') : formatDate(endDate, lang);
    return `${start} – ${end}`;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  class GQRResumeTwoColBlue extends HTMLElement {
    constructor() {
      super();
      this._data = null;
      this.shadowRoot = null;
    }

    static get observedAttributes() {
      return ['language', 'accent', 'theme'];
    }

    connectedCallback() {
      if (!this.shadowRoot) {
        this.shadowRoot = this.attachShadow({ mode: 'open' });
      }
      this.render();
    }

    attributeChangedCallback() {
      if (this.shadowRoot) {
        this.render();
      }
    }

    get data() {
      return this._data || {};
    }

    set data(value) {
      if (value && typeof value === 'object') {
        this._data = value;
        if (this.shadowRoot) {
          this.render();
        }
      }
    }

    getLanguage() {
      return this.getAttribute('language') || 
             (this.data && this.data.language) || 
             'es';
    }

    getAccent() {
      return this.getAttribute('accent') || '#66B2FF';
    }

    getTheme() {
      return this.getAttribute('theme') || 'light';
    }

    render() {
      const lang = this.getLanguage();
      const accent = this.getAccent();
      const t = i18n[lang] || i18n.es;
      const data = this.data || {};
      
      const firstName = safeStr(data.firstName);
      const lastName = safeStr(data.lastName);
      const fullName = `${firstName} ${lastName}`.trim();
      const profession = safeStr(data.profession);
      const targetLevel = safeStr(data.targetLevel);
      const country = safeStr(data.country);
      const summary = safeStr(data.summary);
      const jobDescription = safeStr(data.jobDescription);
      
      const email = safeStr(data.email);
      const phone = safeStr(data.phone);
      const linkedin = safeStr(data.linkedin);
      
      // Combinar skills y tools (migración: si toolsRaw existe, combinar)
      const skillsRaw = safeArr(data.skillsRaw);
      const toolsRaw = data.toolsRaw ? safeArr(data.toolsRaw) : [];
      const skills = [...skillsRaw, ...toolsRaw.filter(t => !skillsRaw.includes(t))];
      const experience = safeArr(data.experience);
      const education = safeArr(data.education);
      const projects = safeArr(data.projects);
      const certifications = safeArr(data.certifications);
      const languages = safeArr(data.languages);
      const achievements = safeArr(data.achievements);

      const styles = `
        <style>
          :host {
            display: block;
            font-family: ui-sans-serif, system-ui, sans-serif;
            line-height: 1.6;
            color: #333333;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .resume-container {
            display: flex;
            min-height: 100vh;
            background: #FFFFFF;
          }

          .sidebar {
            width: 32%;
            background: #1A365D;
            color: #FFFFFF;
            padding: 40px 30px;
            display: flex;
            flex-direction: column;
          }

          .main-content {
            width: 68%;
            background: #FFFFFF;
            color: #333333;
            padding: 40px 50px;
          }

          .profile-picture {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            margin: 0 auto 30px;
            border: 3px solid ${accent};
            display: none;
          }

          .profile-picture[src] {
            display: block;
          }

          .section-title {
            font-size: 18px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #CCCCCC;
            letter-spacing: 0.5px;
          }

          .sidebar .section-title {
            color: #FFFFFF;
            border-bottom-color: rgba(255, 255, 255, 0.3);
          }

          .main-content .section-title {
            color: #333333;
            border-bottom-color: #CCCCCC;
          }

          .contact-item {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            font-size: 14px;
          }

          .contact-icon {
            width: 18px;
            height: 18px;
            margin-right: 10px;
            flex-shrink: 0;
          }

          .contact-link {
            color: #FFFFFF;
            text-decoration: none;
          }

          .contact-link:hover {
            text-decoration: underline;
          }

          .header {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #CCCCCC;
          }

          .name {
            font-size: 36px;
            font-weight: bold;
            color: #333333;
            text-transform: uppercase;
            margin-bottom: 8px;
            line-height: 1.2;
          }

          .profession {
            font-size: 20px;
            font-weight: normal;
            color: #333333;
            text-transform: uppercase;
            margin-bottom: 5px;
            position: relative;
            display: inline-block;
          }

          .profession-underline {
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 60px;
            height: 3px;
            background: ${accent};
          }

          .header-meta {
            font-size: 14px;
            color: #666666;
            margin-top: 8px;
          }

          .summary {
            font-size: 14px;
            line-height: 1.8;
            color: #333333;
            margin-bottom: 30px;
          }

          .list {
            list-style: none;
          }

          .list-item {
            font-size: 14px;
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;
          }

          .sidebar .list-item::before {
            content: '•';
            position: absolute;
            left: 0;
            color: #FFFFFF;
            font-weight: bold;
          }

          .main-content .list-item::before {
            content: '•';
            position: absolute;
            left: 0;
            color: ${accent};
            font-weight: bold;
          }

          .experience-item,
          .education-item {
            margin-bottom: 25px;
            position: relative;
            padding-left: 20px;
          }

          .experience-item::before,
          .education-item::before {
            content: '';
            position: absolute;
            left: 6px;
            top: 0;
            bottom: -25px;
            width: 2px;
            background: ${accent};
            opacity: 0.3;
          }

          .experience-item:last-child::before,
          .education-item:last-child::before {
            display: none;
          }

          .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
          }

          .item-title {
            font-size: 16px;
            font-weight: 600;
            color: #333333;
            flex: 1;
          }

          .item-date {
            font-size: 12px;
            color: #666666;
            white-space: nowrap;
            margin-left: 15px;
          }

          .item-company,
          .item-institution {
            font-size: 14px;
            color: #666666;
            margin-bottom: 5px;
          }

          .item-field {
            font-size: 13px;
            color: #666666;
            font-style: italic;
            margin-bottom: 8px;
          }

          .item-gpa {
            font-size: 12px;
            color: #666666;
            margin-top: 4px;
          }

          .item-bullets {
            list-style: none;
            margin-top: 10px;
          }

          .item-bullet {
            font-size: 13px;
            line-height: 1.6;
            margin-bottom: 6px;
            padding-left: 18px;
            position: relative;
          }

          .item-bullet::before {
            content: '•';
            position: absolute;
            left: 0;
            color: ${accent};
            font-weight: bold;
          }

          .project-item {
            margin-bottom: 20px;
          }

          .project-name {
            font-size: 15px;
            font-weight: 600;
            color: #333333;
            margin-bottom: 5px;
          }

          .project-description {
            font-size: 13px;
            color: #333333;
            line-height: 1.6;
            margin-bottom: 8px;
          }

          .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
          }

          .tech-chip {
            background: #F0F0F0;
            color: #333333;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 500;
          }

          .project-link {
            color: ${accent};
            text-decoration: none;
            font-size: 12px;
            margin-left: 8px;
          }

          .project-link:hover {
            text-decoration: underline;
          }

          .certification-item {
            margin-bottom: 12px;
            font-size: 14px;
          }

          .certification-name {
            font-weight: 600;
            color: #333333;
          }

          .certification-issuer {
            color: #666666;
            font-size: 13px;
          }

          .certification-date {
            color: #666666;
            font-size: 12px;
          }

          .achievement-item {
            margin-bottom: 15px;
          }

          .achievement-title {
            font-size: 15px;
            font-weight: 600;
            color: #333333;
            margin-bottom: 4px;
          }

          .achievement-description {
            font-size: 13px;
            color: #666666;
            line-height: 1.6;
          }

          .achievement-year {
            font-size: 12px;
            color: #999999;
            margin-top: 2px;
          }

          .objective {
            font-size: 14px;
            line-height: 1.8;
            color: #333333;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #CCCCCC;
          }

          .language-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
            font-size: 14px;
          }

          .language-name {
            flex: 1;
          }

          .language-level {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.8);
          }

          @media (max-width: 768px) {
            .resume-container {
              flex-direction: column;
            }

            .sidebar {
              width: 100%;
              padding: 30px 25px;
            }

            .main-content {
              width: 100%;
              padding: 30px 25px;
            }

            .name {
              font-size: 28px;
            }

            .profession {
              font-size: 18px;
            }

            .section-title {
              font-size: 16px;
            }
          }
        </style>
      `;

      let html = styles + `
        <div class="resume-container">
          <div class="sidebar">
            <img class="profile-picture" src="${escapeHtml(safeStr(data.profilePicture || ''))}" alt="Profile">
            
            ${email || phone || linkedin ? `
            <div class="section-title">${t.contact}</div>
            ${email ? `
            <div class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <a href="mailto:${escapeHtml(email)}" class="contact-link">${escapeHtml(email)}</a>
            </div>
            ` : ''}
            ${phone ? `
            <div class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>${escapeHtml(phone)}</span>
            </div>
            ` : ''}
            ${linkedin ? `
            <div class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <a href="${escapeHtml(linkedin.startsWith('http') ? linkedin : 'https://linkedin.com/in/' + linkedin)}" class="contact-link" target="_blank" rel="noopener">${escapeHtml(linkedin)}</a>
            </div>
            ` : ''}
            ` : ''}
            
            ${skills.length > 0 ? `
            <div class="section-title">${t.skills}</div>
            <ul class="list">
              ${skills.map(skill => `<li class="list-item">${escapeHtml(safeStr(skill))}</li>`).join('')}
            </ul>
            ` : ''}
            
            ${languages.length > 0 ? `
            <div class="section-title">${t.languages}</div>
            ${languages.map(langItem => {
              const langLevel = safeStr(langItem.level || 'basic');
              const langMap = levelMap[lang] || levelMap.es;
              const levelLabel = langMap[langLevel] || langLevel;
              return `
              <div class="language-item">
                <span class="language-name">${escapeHtml(safeStr(langItem.name))}</span>
                <span class="language-level">${escapeHtml(levelLabel)}</span>
              </div>
              `;
            }).join('')}
            ` : ''}
          </div>
          
          <div class="main-content">
            <div class="header">
              ${fullName ? `<h1 class="name">${escapeHtml(fullName)}</h1>` : ''}
              ${profession ? `
              <div class="profession">
                ${escapeHtml(profession)}
                <span class="profession-underline"></span>
              </div>
              ` : ''}
              ${(targetLevel || country) ? `
              <div class="header-meta">
                ${targetLevel ? escapeHtml((targetLevelMap[lang] && targetLevelMap[lang][targetLevel]) || targetLevel) : ''}
                ${targetLevel && country ? ' • ' : ''}
                ${country ? escapeHtml(country) : ''}
              </div>
              ` : ''}
            </div>
            
            ${summary ? `
            <div class="section-title">${t.profile}</div>
            <div class="summary">${escapeHtml(summary)}</div>
            ` : ''}
            
            ${experience.length > 0 ? `
            <div class="section-title">${t.workExperience}</div>
            ${experience.map(exp => {
              const title = safeStr(exp.title);
              const company = safeStr(exp.company);
              const achievements = safeArr(exp.achievements);
              const responsibilities = safeArr(exp.responsibilities);
              const dateRange = formatDateRange(
                safeStr(exp.startDate),
                safeStr(exp.endDate),
                exp.isCurrent === true,
                lang
              );
              
              return `
              <div class="experience-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${escapeHtml(title)}${company ? ` @ ${escapeHtml(company)}` : ''}</div>
                    ${company ? `<div class="item-company">${escapeHtml(company)}</div>` : ''}
                  </div>
                  <div class="item-date">${escapeHtml(dateRange)}</div>
                </div>
                ${achievements.length > 0 || responsibilities.length > 0 ? `
                <ul class="item-bullets">
                  ${achievements.map(ach => `<li class="item-bullet">${escapeHtml(safeStr(ach))}</li>`).join('')}
                  ${responsibilities.map(resp => `<li class="item-bullet">${escapeHtml(safeStr(resp))}</li>`).join('')}
                </ul>
                ` : ''}
              </div>
              `;
            }).join('')}
            ` : ''}
            
            ${education.length > 0 ? `
            <div class="section-title">${t.education}</div>
            ${education.map(edu => {
              const degree = safeStr(edu.degree);
              const institution = safeStr(edu.institution);
              const field = safeStr(edu.field);
              const gpa = edu.gpa;
              const dateRange = formatDateRange(
                safeStr(edu.startDate),
                safeStr(edu.endDate),
                edu.isCompleted === false,
                lang
              );
              
              return `
              <div class="education-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${escapeHtml(degree)}${institution ? ` — ${escapeHtml(institution)}` : ''}</div>
                    ${field ? `<div class="item-field">${escapeHtml(field)}</div>` : ''}
                    ${gpa ? `<div class="item-gpa">GPA: ${escapeHtml(String(gpa))}</div>` : ''}
                  </div>
                  <div class="item-date">${escapeHtml(dateRange)}</div>
                </div>
              </div>
              `;
            }).join('')}
            ` : ''}
            
            ${projects.length > 0 ? `
            <div class="section-title">${t.projects}</div>
            ${projects.map(proj => {
              const name = safeStr(proj.name);
              const description = safeStr(proj.description);
              const technologies = safeArr(proj.technologies);
              const url = safeStr(proj.url);
              
              return `
              <div class="project-item">
                <div class="project-name">
                  ${escapeHtml(name)}
                  ${url ? `<a href="${escapeHtml(url)}" class="project-link" target="_blank" rel="noopener">🔗</a>` : ''}
                </div>
                ${description ? `<div class="project-description">${escapeHtml(description)}</div>` : ''}
                ${technologies.length > 0 ? `
                <div class="project-tech">
                  ${technologies.map(tech => `<span class="tech-chip">${escapeHtml(safeStr(tech))}</span>`).join('')}
                </div>
                ` : ''}
              </div>
              `;
            }).join('')}
            ` : ''}
            
            ${certifications.length > 0 ? `
            <div class="section-title">${t.certifications}</div>
            ${certifications.map(cert => {
              const name = safeStr(cert.name);
              const issuer = safeStr(cert.issuer);
              const date = safeStr(cert.date);
              const credentialId = safeStr(cert.credentialId);
              const url = safeStr(cert.url);
              
              return `
              <div class="certification-item">
                <div class="certification-name">${escapeHtml(name)}</div>
                ${issuer ? `<div class="certification-issuer">${escapeHtml(issuer)}</div>` : ''}
                ${credentialId ? `<div class="certification-issuer">ID: ${escapeHtml(credentialId)}</div>` : ''}
                ${date ? `<div class="certification-date">${escapeHtml(formatDate(date, lang))}</div>` : ''}
                ${url ? `<a href="${escapeHtml(url)}" class="project-link" target="_blank" rel="noopener">Ver certificado</a>` : ''}
              </div>
              `;
            }).join('')}
            ` : ''}
            
            ${achievements.length > 0 ? `
            <div class="section-title">${t.achievements}</div>
            ${achievements.map(ach => {
              const title = safeStr(ach.title);
              const description = safeStr(ach.description);
              const year = ach.year;
              
              return `
              <div class="achievement-item">
                <div class="achievement-title">${escapeHtml(title)}</div>
                ${description ? `<div class="achievement-description">${escapeHtml(description)}</div>` : ''}
                ${year ? `<div class="achievement-year">${escapeHtml(String(year))}</div>` : ''}
              </div>
              `;
            }).join('')}
            ` : ''}
            
            ${jobDescription ? `
            <div class="section-title">${t.objective}</div>
            <div class="objective">${escapeHtml(jobDescription)}</div>
            ` : ''}
          </div>
        </div>
      `;

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = html;
      }
    }
  }

  if (!customElements.get('gqr-resume-two-col-blue')) {
    customElements.define('gqr-resume-two-col-blue', GQRResumeTwoColBlue);
  }
})();
