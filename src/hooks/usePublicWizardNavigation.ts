import { useNavigate, NavigateOptions } from 'react-router-dom';

export function usePublicWizardNavigation() {
  const navigate = useNavigate();

  const navigateToStep = (stepNumber: number, options?: NavigateOptions) => {
    navigate(`/create/step-${stepNumber}`, options);
  };

  const navigateToWizardPath = (path: string, options?: NavigateOptions) => {
    navigate(path, options);
  };

  const getResumeId = (): null => null;

  return { navigateToStep, navigateToWizardPath, getResumeId };
}
