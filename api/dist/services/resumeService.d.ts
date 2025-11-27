import { Resume, ResumeData, GeneratedResume, ResumeScore } from '../types';
export declare const createResume: (userId: string, resumeData: ResumeData, title?: string) => Promise<Resume>;
export declare const getResumesByUserId: (userId: string) => Promise<Resume[]>;
export declare const getResumeById: (userId: string, resumeId: string) => Promise<Resume | null>;
export declare const updateResume: (userId: string, resumeId: string, updates: Partial<Resume>) => Promise<Resume>;
export declare const deleteResume: (userId: string, resumeId: string) => Promise<void>;
export declare const updateResumeWithGenerated: (userId: string, resumeId: string, generatedResume: GeneratedResume) => Promise<Resume>;
export declare const updateResumeWithScore: (userId: string, resumeId: string, score: ResumeScore) => Promise<Resume>;
export declare const getResumeScore: (userId: string, resumeId: string) => Promise<ResumeScore | null>;
//# sourceMappingURL=resumeService.d.ts.map