import { ResumeData, SkillPageRange } from '@/types';

/**
 * Template-expected data format (matching template generator app)
 */
export interface TemplateDataFormat {
  name?: string;
  title?: string;
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
    location?: string;
  };
  profile?: string;
  profilePageNumber?: number;
  skills?: string[];
  skillsPageNumbers?: number[];
  experience?: Array<{
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    description?: string[];
    pageNumber?: number;
  }>;
  projects?: Array<{
    name: string;
    description: string;
    pageNumber?: number;
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    pageNumber?: number;
  }>;
  languages?: string[];
  languagesPageNumbers?: number[];
  achievements?: string[];
  achievementsPageNumbers?: number[];
  certifications?: string[];
  certificationsPageNumbers?: number[];
}

/**
 * Converts ResumeData (getquickresume format) to TemplateDataFormat (template generator format)
 * This is required because templates expect a different data structure
 */
export function convertResumeDataToTemplateFormat(resumeData: ResumeData): TemplateDataFormat {
  // 1. Name: Combine firstName + lastName
  const name = [resumeData.firstName, resumeData.lastName].filter(Boolean).join(' ') || undefined;

  // 2. Title: Map profession to title
  const title = resumeData.profession || undefined;

  // 3. Contact: Combine separate fields into contact object
  const contact = {
    phone: resumeData.phone || undefined,
    email: resumeData.email || undefined,
    website: resumeData.linkedin || undefined, // Use linkedin as website
    location: resumeData.country || undefined,
  };

  // 4. Profile: Map summary to profile
  const profile = resumeData.summary || undefined;
  const profilePageNumber = resumeData.summaryPageNumber ?? undefined;

  // 5. Skills: Map skillsRaw to skills
  const skills = resumeData.skillsRaw || [];
  
  // Convert skillsPagination to skillsPageNumbers array
  let skillsPageNumbers: number[] | undefined;
  if (resumeData.skillsPagination && skills.length > 0) {
    skillsPageNumbers = new Array(skills.length).fill(null);
    // Map each skill to its page number based on pagination ranges
    resumeData.skillsPagination.forEach((range: SkillPageRange) => {
      for (let i = range.startIndex; i < range.endIndex && i < skills.length; i++) {
        skillsPageNumbers![i] = range.pageNumber;
      }
    });
    // Fill any null values with page 1 as fallback
    skillsPageNumbers = skillsPageNumbers.map((pageNum) => pageNum ?? 1);
  }

  // 6. Experience: Transform WorkExperience[] to template format
  const experience = resumeData.experience.map((exp) => ({
    position: exp.title,
    company: exp.company,
    startDate: exp.startDate,
    endDate: exp.isCurrent ? 'Present' : (exp.endDate || ''),
    description: [...(exp.achievements || []), ...(exp.responsibilities || [])],
    pageNumber: exp.pageNumber ?? undefined,
  }));

  // 7. Projects: Transform Project[] to template format
  const projects = resumeData.projects.map((proj) => ({
    name: proj.name,
    description: proj.description,
    pageNumber: proj.pageNumber ?? undefined,
  }));

  // 8. Education: Transform Education[] to template format
  const education = resumeData.education.map((edu) => ({
    institution: edu.institution,
    degree: edu.degree,
    startDate: edu.startDate,
    endDate: edu.endDate || '',
    pageNumber: edu.pageNumber ?? undefined,
  }));

  // 9. Languages: Format Language[] to string[]
  const languages = resumeData.languages.map((lang) => {
    const level = lang.level || 'intermediate';
    return `${lang.name} (${level})`;
  });
  
  // Convert language pageNumbers to languagesPageNumbers array
  let languagesPageNumbers: number[] | undefined;
  if (resumeData.languagePageNumber !== null && languages.length > 0) {
    languagesPageNumbers = languages.map(() => resumeData.languagePageNumber!);
  }

  // 10. Achievements: Format Achievement[] to string[]
  const achievements = resumeData.achievements.map((ach) => {
    if (ach.description) {
      return `${ach.title}: ${ach.description}`;
    }
    return ach.title;
  });
  
  // Convert achievement pageNumbers to achievementsPageNumbers array
  let achievementsPageNumbers: number[] | undefined;
  if (achievements.length > 0) {
    achievementsPageNumbers = resumeData.achievements.map((ach) => ach.pageNumber ?? 1);
  }

  // 11. Certifications: Format Certification[] to string[]
  const certifications = resumeData.certifications.map((cert) => {
    return `${cert.name} - ${cert.issuer} (${cert.date})`;
  });
  
  // Convert certification pageNumbers to certificationsPageNumbers array
  let certificationsPageNumbers: number[] | undefined;
  if (certifications.length > 0) {
    certificationsPageNumbers = resumeData.certifications.map((cert) => cert.pageNumber ?? 1);
  }

  return {
    name,
    title,
    contact: Object.keys(contact).length > 0 ? contact : undefined,
    profile,
    profilePageNumber,
    skills: skills.length > 0 ? skills : undefined,
    skillsPageNumbers,
    experience: experience.length > 0 ? experience : undefined,
    projects: projects.length > 0 ? projects : undefined,
    education: education.length > 0 ? education : undefined,
    languages: languages.length > 0 ? languages : undefined,
    languagesPageNumbers,
    achievements: achievements.length > 0 ? achievements : undefined,
    achievementsPageNumbers,
    certifications: certifications.length > 0 ? certifications : undefined,
    certificationsPageNumbers,
  };
}

/**
 * Filter template data to only include items for a specific page
 * This is used to render individual pages in the paginated preview
 */
export function filterDataForPage(
  paginatedData: TemplateDataFormat,
  pageNumber: number
): TemplateDataFormat {
  const filtered: TemplateDataFormat = {
    ...paginatedData,
    // Header always on page 1
    name: pageNumber === 1 ? paginatedData.name : undefined,
    title: pageNumber === 1 ? paginatedData.title : undefined,
    contact: pageNumber === 1 ? paginatedData.contact : undefined,
    // Profile always on page 1
    profile: pageNumber === 1 ? paginatedData.profile : undefined,
    profilePageNumber: pageNumber === 1 ? 1 : undefined,
  };

  // Filter skills by pageNumber
  if (paginatedData.skills && paginatedData.skillsPageNumbers) {
    filtered.skills = paginatedData.skills.filter((_, index) => 
      paginatedData.skillsPageNumbers![index] === pageNumber
    );
    filtered.skillsPageNumbers = filtered.skills.map(() => pageNumber);
  } else {
    filtered.skills = undefined;
    filtered.skillsPageNumbers = undefined;
  }

  // Filter experience by pageNumber
  if (paginatedData.experience) {
    filtered.experience = paginatedData.experience.filter(exp => exp.pageNumber === pageNumber);
    if (filtered.experience.length === 0) {
      filtered.experience = undefined;
    }
  }

  // Filter projects by pageNumber
  if (paginatedData.projects) {
    filtered.projects = paginatedData.projects.filter(proj => proj.pageNumber === pageNumber);
    if (filtered.projects.length === 0) {
      filtered.projects = undefined;
    }
  }

  // Filter education by pageNumber
  if (paginatedData.education) {
    filtered.education = paginatedData.education.filter(edu => edu.pageNumber === pageNumber);
    if (filtered.education.length === 0) {
      filtered.education = undefined;
    }
  }

  // Filter languages by pageNumber
  if (paginatedData.languages && paginatedData.languagesPageNumbers) {
    filtered.languages = paginatedData.languages.filter((_, index) => 
      paginatedData.languagesPageNumbers![index] === pageNumber
    );
    filtered.languagesPageNumbers = filtered.languages.map(() => pageNumber);
    if (filtered.languages.length === 0) {
      filtered.languages = undefined;
      filtered.languagesPageNumbers = undefined;
    }
  } else {
    filtered.languages = undefined;
    filtered.languagesPageNumbers = undefined;
  }

  // Filter achievements by pageNumber
  if (paginatedData.achievements && paginatedData.achievementsPageNumbers) {
    filtered.achievements = paginatedData.achievements.filter((_, index) => 
      paginatedData.achievementsPageNumbers![index] === pageNumber
    );
    filtered.achievementsPageNumbers = filtered.achievements.map(() => pageNumber);
    if (filtered.achievements.length === 0) {
      filtered.achievements = undefined;
      filtered.achievementsPageNumbers = undefined;
    }
  } else {
    filtered.achievements = undefined;
    filtered.achievementsPageNumbers = undefined;
  }

  // Filter certifications by pageNumber
  if (paginatedData.certifications && paginatedData.certificationsPageNumbers) {
    filtered.certifications = paginatedData.certifications.filter((_, index) => 
      paginatedData.certificationsPageNumbers![index] === pageNumber
    );
    filtered.certificationsPageNumbers = filtered.certifications.map(() => pageNumber);
    if (filtered.certifications.length === 0) {
      filtered.certifications = undefined;
      filtered.certificationsPageNumbers = undefined;
    }
  } else {
    filtered.certifications = undefined;
    filtered.certificationsPageNumbers = undefined;
  }

  return filtered;
}

