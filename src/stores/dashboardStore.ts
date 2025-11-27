import { create } from 'zustand';
import { Resume, JobInterest, DashboardStats, DashboardState } from '@/types';
import { resumeService } from '@/services/resumeService';
import { jobInterestService } from '@/services/jobInterestService';

interface DashboardStore extends DashboardState {
  // Actions
  loadResumes: () => Promise<void>;
  loadJobInterests: () => Promise<void>;
  loadDashboard: () => Promise<void>;
  createResume: (resumeData: any, title?: string) => Promise<Resume>;
  updateResume: (id: string, updates: Partial<Resume>) => Promise<Resume>;
  deleteResume: (id: string) => Promise<void>;
  createJobInterest: (jobData: any) => Promise<JobInterest>;
  updateJobInterest: (id: string, updates: Partial<JobInterest>) => Promise<JobInterest>;
  deleteJobInterest: (id: string) => Promise<void>;
  optimizeResumeForJob: (jobId: string, resumeId: string) => Promise<JobInterest>;
  refreshStats: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  clearDashboard: () => void;
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  // Initial state
  resumes: [],
  jobInterests: [],
  stats: {
    totalResumes: 0,
    totalJobInterests: 0,
    tokensAvailable: 0,
  },
  isLoading: false,

  // Actions
  loadResumes: async () => {
    try {
      set({ isLoading: true });
      const resumes = await resumeService.listResumes();
      set({ resumes });
    } catch (error) {
      console.error('Error loading resumes:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  loadJobInterests: async () => {
    try {
      set({ isLoading: true });
      const jobInterests = await jobInterestService.listJobInterests();
      set({ jobInterests });
    } catch (error) {
      console.error('Error loading job interests:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  loadDashboard: async () => {
    try {
      set({ isLoading: true });
      
      // Load resumes and job interests in parallel
      const [resumes, jobInterests] = await Promise.all([
        resumeService.listResumes(),
        jobInterestService.listJobInterests(),
      ]);

      set({
        resumes,
        jobInterests,
        stats: {
          totalResumes: resumes.length,
          totalJobInterests: jobInterests.length,
          tokensAvailable: 0, // Tokens removed - kept for backward compatibility
        },
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  createResume: async (resumeData, title) => {
    try {
      set({ isLoading: true });
      const newResume = await resumeService.createResume(resumeData, title);
      
      set((state) => ({
        resumes: [newResume, ...state.resumes],
        stats: {
          ...state.stats,
          totalResumes: state.stats.totalResumes + 1,
        },
      }));

      return newResume;
    } catch (error) {
      console.error('Error creating resume:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateResume: async (id, updates) => {
    try {
      set({ isLoading: true });
      const updatedResume = await resumeService.updateResume(id, updates);
      
      set((state) => ({
        resumes: state.resumes.map(resume =>
          resume.id === id ? updatedResume : resume
        ),
      }));

      return updatedResume;
    } catch (error) {
      console.error('Error updating resume:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteResume: async (id) => {
    try {
      set({ isLoading: true });
      await resumeService.deleteResume(id);
      
      set((state) => ({
        resumes: state.resumes.filter(resume => resume.id !== id),
        stats: {
          ...state.stats,
          totalResumes: Math.max(0, state.stats.totalResumes - 1),
        },
      }));
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  createJobInterest: async (jobData) => {
    try {
      set({ isLoading: true });
      const newJobInterest = await jobInterestService.createJobInterest(jobData);
      
      set((state) => ({
        jobInterests: [newJobInterest, ...state.jobInterests],
        stats: {
          ...state.stats,
          totalJobInterests: state.stats.totalJobInterests + 1,
        },
      }));

      return newJobInterest;
    } catch (error) {
      console.error('Error creating job interest:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateJobInterest: async (id, updates) => {
    try {
      set({ isLoading: true });
      const updatedJobInterest = await jobInterestService.updateJobInterest(id, updates);
      
      set((state) => ({
        jobInterests: state.jobInterests.map(job =>
          job.id === id ? updatedJobInterest : job
        ),
      }));

      return updatedJobInterest;
    } catch (error) {
      console.error('Error updating job interest:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteJobInterest: async (id) => {
    try {
      set({ isLoading: true });
      await jobInterestService.deleteJobInterest(id);
      
      set((state) => ({
        jobInterests: state.jobInterests.filter(job => job.id !== id),
        stats: {
          ...state.stats,
          totalJobInterests: Math.max(0, state.stats.totalJobInterests - 1),
        },
      }));
    } catch (error) {
      console.error('Error deleting job interest:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  optimizeResumeForJob: async (jobId, resumeId) => {
    try {
      set({ isLoading: true });
      const updatedJobInterest = await jobInterestService.optimizeResumeForJob(jobId, resumeId);
      
      set((state) => ({
        jobInterests: state.jobInterests.map(job =>
          job.id === jobId ? updatedJobInterest : job
        ),
      }));

      // Refresh stats
      await get().refreshStats();

      return updatedJobInterest;
    } catch (error) {
      console.error('Error optimizing resume for job:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  refreshStats: async () => {
    try {
      // Refresh resume and job interest counts
      const [resumes, jobInterests] = await Promise.all([
        resumeService.listResumes(),
        jobInterestService.listJobInterests(),
      ]);

      set((state) => ({
        stats: {
          totalResumes: resumes.length,
          totalJobInterests: jobInterests.length,
          tokensAvailable: 0, // Tokens removed - kept for backward compatibility
        },
      }));
    } catch (error) {
      console.error('Error refreshing stats:', error);
    }
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  clearDashboard: () => {
    set({
      resumes: [],
      jobInterests: [],
      stats: {
        totalResumes: 0,
        totalJobInterests: 0,
        tokensAvailable: 0,
      },
      isLoading: false,
    });
  },
}));
