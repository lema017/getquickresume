import { GoogleOAuthProvider } from '@react-oauth/google';
import type { ReactNode } from 'react';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

/**
 * Lazy-loaded wrapper for GoogleOAuthProvider.
 * Only loaded on routes that need Google authentication (e.g. /login).
 * This avoids loading the Google Identity Services SDK (~90 KiB) on every page.
 */
export default function GoogleAuthWrapper({ children }: { children: ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
