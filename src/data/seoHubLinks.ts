/**
 * Curated internal links for homepage / footer (SEO + UX).
 * URLs use English slugs; labels localized for ES where provided.
 */
export type HubProfessionLink = {
  slug: string;
  titleEn: string;
  titleEs: string;
};

export type HubSkillLink = {
  slug: string;
  titleEn: string;
  titleEs: string;
};

/** ~24 high-intent profession pages — keep list small and natural (no keyword stuffing). */
export const POPULAR_PROFESSION_LINKS: HubProfessionLink[] = [
  { slug: 'software-engineer', titleEn: 'Software Engineer', titleEs: 'Ingeniero de software' },
  { slug: 'registered-nurse', titleEn: 'Registered Nurse', titleEs: 'Enfermero/a registrado/a' },
  { slug: 'project-manager', titleEn: 'Project Manager', titleEs: 'Director/a de proyecto' },
  { slug: 'data-analyst', titleEn: 'Data Analyst', titleEs: 'Analista de datos' },
  { slug: 'marketing-manager', titleEn: 'Marketing Manager', titleEs: 'Gerente de marketing' },
  { slug: 'accountant', titleEn: 'Accountant', titleEs: 'Contador/a' },
  { slug: 'teacher', titleEn: 'Teacher', titleEs: 'Profesor/a' },
  { slug: 'sales-representative', titleEn: 'Sales Representative', titleEs: 'Representante de ventas' },
  { slug: 'customer-service-representative', titleEn: 'Customer Service', titleEs: 'Atención al cliente' },
  { slug: 'graphic-designer', titleEn: 'Graphic Designer', titleEs: 'Diseñador/a gráfico/a' },
  { slug: 'human-resources-manager', titleEn: 'HR Manager', titleEs: 'Gerente de RR. HH.' },
  { slug: 'financial-analyst', titleEn: 'Financial Analyst', titleEs: 'Analista financiero/a' },
  { slug: 'mechanical-engineer', titleEn: 'Mechanical Engineer', titleEs: 'Ingeniero/a mecánico/a' },
  { slug: 'electrician', titleEn: 'Electrician', titleEs: 'Electricista' },
  { slug: 'administrative-assistant', titleEn: 'Administrative Assistant', titleEs: 'Asistente administrativo/a' },
  { slug: 'business-analyst', titleEn: 'Business Analyst', titleEs: 'Analista de negocio' },
  { slug: 'product-manager', titleEn: 'Product Manager', titleEs: 'Product Manager' },
  { slug: 'operations-manager', titleEn: 'Operations Manager', titleEs: 'Gerente de operaciones' },
  { slug: 'web-developer', titleEn: 'Web Developer', titleEs: 'Desarrollador/a web' },
  { slug: 'nurse-practitioner', titleEn: 'Nurse Practitioner', titleEs: 'Enfermero/a practicante' },
  { slug: 'pharmacist', titleEn: 'Pharmacist', titleEs: 'Farmacéutico/a' },
  { slug: 'lawyer', titleEn: 'Lawyer', titleEs: 'Abogado/a' },
  { slug: 'chef', titleEn: 'Chef', titleEs: 'Chef' },
  { slug: 'civil-engineer', titleEn: 'Civil Engineer', titleEs: 'Ingeniero/a civil' },
];

export const POPULAR_SKILL_LINKS: HubSkillLink[] = [
  { slug: 'javascript', titleEn: 'JavaScript', titleEs: 'JavaScript' },
  { slug: 'python', titleEn: 'Python', titleEs: 'Python' },
  { slug: 'project-management', titleEn: 'Project management', titleEs: 'Gestión de proyectos' },
  { slug: 'communication', titleEn: 'Communication', titleEs: 'Comunicación' },
  { slug: 'leadership', titleEn: 'Leadership', titleEs: 'Liderazgo' },
  { slug: 'data-analysis', titleEn: 'Data analysis', titleEs: 'Análisis de datos' },
  { slug: 'microsoft-excel', titleEn: 'Microsoft Excel', titleEs: 'Microsoft Excel' },
  { slug: 'sales', titleEn: 'Sales', titleEs: 'Ventas' },
  { slug: 'customer-service', titleEn: 'Customer service', titleEs: 'Servicio al cliente' },
  { slug: 'sql', titleEn: 'SQL', titleEs: 'SQL' },
  { slug: 'react', titleEn: 'React', titleEs: 'React' },
  { slug: 'problem-solving', titleEn: 'Problem solving', titleEs: 'Resolución de problemas' },
];
