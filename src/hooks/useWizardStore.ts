import { useWizardContext } from '@/contexts/WizardContext';
import { useResumeStore } from '@/stores/resumeStore';
import { usePublicResumeStore } from '@/stores/publicResumeStore';

/**
 * Returns the appropriate resume store based on wizard mode.
 * In public mode, returns the localStorage-backed public store.
 * In authenticated mode, returns the API-backed main store.
 */
export function useWizardStore() {
  const { isPublicMode } = useWizardContext();
  const publicStore = usePublicResumeStore();
  const resumeStore = useResumeStore();
  return isPublicMode ? publicStore : resumeStore;
}
