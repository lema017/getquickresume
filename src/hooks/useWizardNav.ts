import { useWizardContext } from '@/contexts/WizardContext';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { usePublicWizardNavigation } from '@/hooks/usePublicWizardNavigation';

/**
 * Returns the appropriate navigation hook based on wizard mode.
 * In public mode, uses the context's navigateToStep which handles
 * step > TOTAL_STEPS by redirecting to the preview page.
 * In authenticated mode, navigates to /wizard/manual/step-X with resumeId.
 */
export function useWizardNav() {
  const { isPublicMode, navigateToStep: contextNavigateToStep } = useWizardContext();
  const publicNav = usePublicWizardNavigation();
  const wizardNav = useWizardNavigation();
  return isPublicMode ? { ...publicNav, navigateToStep: contextNavigateToStep } : wizardNav;
}
