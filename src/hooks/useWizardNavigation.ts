import { useNavigate, useLocation, NavigateOptions } from 'react-router-dom';
import { useResumeStore } from '@/stores/resumeStore';

/**
 * Custom hook for wizard navigation that preserves the resumeId query parameter.
 * This ensures that when editing an existing resume, the resumeId is maintained
 * across all step navigations.
 */
export function useWizardNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentResumeId } = useResumeStore();

  /**
   * Gets the current resumeId from URL search params or from the store.
   * URL params take priority (for initial load from dashboard).
   */
  const getResumeId = (): string | null => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('resumeId') || currentResumeId;
  };

  /**
   * Navigates to a specific wizard step while preserving the resumeId.
   * @param stepNumber - The step number to navigate to
   * @param options - Optional navigation options (state, replace, etc.)
   */
  const navigateToStep = (stepNumber: number, options?: NavigateOptions) => {
    const resumeId = getResumeId();
    const path = `/wizard/manual/step-${stepNumber}`;
    navigate(resumeId ? `${path}?resumeId=${resumeId}` : path, options);
  };

  /**
   * Navigates to a wizard path (e.g., '/wizard/upload') while preserving the resumeId.
   * @param path - The wizard path to navigate to
   * @param options - Optional navigation options (state, replace, etc.)
   */
  const navigateToWizardPath = (path: string, options?: NavigateOptions) => {
    const resumeId = getResumeId();
    navigate(resumeId ? `${path}?resumeId=${resumeId}` : path, options);
  };

  return { navigateToStep, navigateToWizardPath, getResumeId };
}

