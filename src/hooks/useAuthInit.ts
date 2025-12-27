import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

/**
 * Hook to validate session on app mount
 * Ensures that if a token exists, it's still valid
 */
export function useAuthInit() {
  const { validateSession } = useAuthStore();

  useEffect(() => {
    validateSession();
  }, [validateSession]);
}
