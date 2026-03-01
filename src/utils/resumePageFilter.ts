import type { ResumeData } from '@/types';

/**
 * Filters a paginated ResumeData object to only include content for a specific page.
 * Header fields (name, contact, etc.) appear only on page 1.
 * Array items are filtered by their `pageNumber` property.
 */
export function filterResumeDataForPage(data: ResumeData, pageNumber: number): ResumeData {
  const isPage1 = pageNumber === 1;
  const summaryPage = data.summaryPageNumber ?? 1;

  return {
    ...data,
    firstName: isPage1 ? data.firstName : '',
    lastName: isPage1 ? data.lastName : '',
    profession: isPage1 ? data.profession : '',
    country: isPage1 ? data.country : '',
    phone: isPage1 ? data.phone : '',
    email: isPage1 ? data.email : '',
    linkedin: isPage1 ? data.linkedin : '',
    summary: summaryPage === pageNumber ? data.summary : '',
    jobDescription: isPage1 ? data.jobDescription : '',
    experience: data.experience.filter(exp => (exp.pageNumber ?? 1) === pageNumber),
    education: data.education.filter(edu => (edu.pageNumber ?? 1) === pageNumber),
    projects: data.projects.filter(proj => (proj.pageNumber ?? 1) === pageNumber),
    certifications: data.certifications.filter(cert => (cert.pageNumber ?? 1) === pageNumber),
    achievements: data.achievements.filter(ach => (ach.pageNumber ?? 1) === pageNumber),
    languages: data.languages.filter(lang => (lang.pageNumber ?? 1) === pageNumber),
    skillsRaw: data.skillsPagination
      ? data.skillsRaw.filter((_, idx) => {
          const range = data.skillsPagination!.find(r => idx >= r.startIndex && idx < r.endIndex);
          return range ? range.pageNumber === pageNumber : isPage1;
        })
      : (isPage1 ? data.skillsRaw : []),
  };
}
