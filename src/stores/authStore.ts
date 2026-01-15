import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthState } from '@/types';
import { authService } from '@/services/authService';

interface AuthStore extends AuthState {
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  loginWithGoogle: (googleToken: string) => Promise<void>;
  validateSession: () => Promise<void>;
  refreshUserPremiumStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),

      setLoading: (isLoading) => set({ isLoading }),

      login: (user) => set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false 
      }),

      logout: () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-data');
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false 
        });
      },

      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ 
            user: { ...currentUser, ...updates } 
          });
        }
      },


      loginWithGoogle: async (googleToken) => {
        set({ isLoading: true });
        try {
          const response = await authService.loginWithGoogle(googleToken);
          
          console.log('[AuthStore] Google login response received:', {
            userId: response.user.id,
            email: response.user.email,
            avatarUrl: response.user.avatarUrl,
            hasAvatarUrl: !!response.user.avatarUrl,
            isPremium: response.user.isPremium
          });
          
          // Guardar token en localStorage
          localStorage.setItem('auth-token', response.token);
          
          // Guardar datos del usuario en localStorage para validación posterior
          // Ensure isPremium is included
          const userDataToStore = {
            ...response.user,
            isPremium: response.user.isPremium ?? false
          };
          localStorage.setItem('user-data', JSON.stringify(userDataToStore));
          
          console.log('[AuthStore] User data saved to localStorage, isPremium:', userDataToStore.isPremium);
          
          set({ 
            user: userDataToStore, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          console.log('[AuthStore] User state updated, isPremium:', userDataToStore.isPremium);

          // Redirección basada en si el usuario tiene CVs
          // Esta lógica se manejará en el componente que llama a loginWithGoogle
          // para evitar dependencias circulares
        } catch (error) {
          console.error('Error en loginWithGoogle:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      validateSession: async () => {
        const token = localStorage.getItem('auth-token');
        if (!token) return;

        try {
          const user = await authService.getUserFromToken(token);
          if (user) {
            console.log('[AuthStore] Session validated, user loaded:', {
              userId: user.id,
              email: user.email,
              avatarUrl: user.avatarUrl,
              hasAvatarUrl: !!user.avatarUrl,
              isPremium: user.isPremium
            });
            set({ user, isAuthenticated: true });
          } else {
            set({ user: null, isAuthenticated: false });
            localStorage.removeItem('auth-token');
            localStorage.removeItem('user-data');
          }
        } catch (error) {
          console.error('Error validando sesión:', error);
          set({ user: null, isAuthenticated: false });
          localStorage.removeItem('auth-token');
          localStorage.removeItem('user-data');
        }
      },

      refreshUserPremiumStatus: async () => {
        const token = localStorage.getItem('auth-token');
        if (!token) return;

        try {
          // Fetch fresh user data from backend (not from stale JWT)
          const user = await authService.getCurrentUser(token);
          if (user) {
            // Check if subscription has expired locally (defensive check)
            // The backend should have already updated isPremium, but this ensures UI sync
            if (user.subscriptionExpiration && user.isPremium) {
              const expDate = new Date(user.subscriptionExpiration);
              if (expDate <= new Date()) {
                console.log('[AuthStore] Subscription expired, syncing UI state');
                user.isPremium = false;
              }
            }
            
            console.log('[AuthStore] Premium status refreshed from backend:', {
              userId: user.id,
              isPremium: user.isPremium,
              subscriptionExpiration: user.subscriptionExpiration
            });
            set({ user, isAuthenticated: true });
          } else {
            // If getCurrentUser returns null, token might be invalid
            console.warn('[AuthStore] Failed to refresh premium status - user not found');
          }
        } catch (error) {
          console.error('Error refreshing premium status:', error);
        }
      },

    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
