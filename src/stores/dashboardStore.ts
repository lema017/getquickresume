import { create } from 'zustand';
import { Resume, DashboardStats, DashboardState } from '@/types';
import { resumeService } from '@/services/resumeService';

interface DashboardStore extends DashboardState {
  // Actions
  loadResumes: () => Promise<void>;
  loadDashboard: () => Promise<void>;
  createResume: (resumeData: any, title?: string) => Promise<Resume>;
  updateResume: (id: string, updates: Partial<Resume>) => Promise<Resume>;
  deleteResume: (id: string) => Promise<void>;
  refreshStats: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  clearDashboard: () => void;
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  // Initial state
  resumes: [],
  stats: {
    totalResumes: 0,
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

  loadDashboard: async () => {
    try {
      set({ isLoading: true });
      
      // Load resumes
      const resumes = await resumeService.listResumes();

      set({
        resumes,
        stats: {
          totalResumes: resumes.length,
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

  refreshStats: async () => {
    try {
      // Refresh resume count
      const resumes = await resumeService.listResumes();

      set((state) => ({
        stats: {
          totalResumes: resumes.length,
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
      stats: {
        totalResumes: 0,
        tokensAvailable: 0,
      },
      isLoading: false,
    });
  },
}));
