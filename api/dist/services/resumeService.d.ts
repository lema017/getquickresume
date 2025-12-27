import { Resume, ResumeData, GeneratedResume, ResumeScore } from '../types';
export declare const createResume: (userId: string, resumeData: ResumeData, title?: string) => Promise<Resume>;
export declare const getResumesByUserId: (userId: string) => Promise<Resume[]>;
export declare const getResumeById: (userId: string, resumeId: string) => Promise<Resume | null>;
/**
 * Verifies that a resume exists and belongs to the specified user.
 * Used for ownership validation before tracking AI costs to a resume.
 * @param userId - The user ID from the JWT token
 * @param resumeId - The resume ID to verify
 * @returns true if the resume exists and belongs to the user, false otherwise
 */
export declare const verifyResumeOwnership: (userId: string, resumeId: string) => Promise<boolean>;
export declare const updateResume: (userId: string, resumeId: string, updates: Partial<Resume>) => Promise<Resume>;
export declare const deleteResume: (userId: string, resumeId: string) => Promise<void>;
export declare const updateResumeWithGenerated: (userId: string, resumeId: string, generatedResume: GeneratedResume) => Promise<Resume>;
export declare const updateResumeWithScore: (userId: string, resumeId: string, score: ResumeScore) => Promise<Resume>;
export declare const getResumeScore: (userId: string, resumeId: string) => Promise<ResumeScore | null>;
export declare const getResumeByShareToken: (shareToken: string) => Promise<Resume | null>;
//# sourceMappingURL=resumeService.d.ts.map