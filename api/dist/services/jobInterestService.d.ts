import { JobInterest, JobInterestData } from '../types';
export declare const createJobInterest: (userId: string, jobData: JobInterestData) => Promise<JobInterest>;
export declare const getJobInterestsByUserId: (userId: string) => Promise<JobInterest[]>;
export declare const getJobInterestById: (userId: string, jobId: string) => Promise<JobInterest | null>;
export declare const updateJobInterest: (userId: string, jobId: string, updates: Partial<JobInterest>) => Promise<JobInterest>;
export declare const deleteJobInterest: (userId: string, jobId: string) => Promise<void>;
export declare const markJobAsApplied: (userId: string, jobId: string, optimizedResumeId?: string) => Promise<JobInterest>;
//# sourceMappingURL=jobInterestService.d.ts.map