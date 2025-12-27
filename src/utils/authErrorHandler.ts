import { useAuthStore } from '@/stores/authStore';

/**
 * Centralized handler for authentication errors (401/403)
 * Clears auth data, logs out user, and redirects to login page
 */
export function handleAuthError(): void {
  // Clear localStorage
  localStorage.removeItem('auth-token');
  localStorage.removeItem('user-data');
  
  // Update auth store to logout
  useAuthStore.getState().logout();
  
  // Redirect to login page
  window.location.href = '/login';
}
