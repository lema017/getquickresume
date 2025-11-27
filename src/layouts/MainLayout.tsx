import { ReactNode, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAuthStore } from '@/stores/authStore';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isAuthenticated, refreshUserPremiumStatus } = useAuthStore();

  // Refresh premium status on mount if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      refreshUserPremiumStatus();
    }
  }, [isAuthenticated, refreshUserPremiumStatus]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
