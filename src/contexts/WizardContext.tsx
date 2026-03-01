import { createContext, useContext } from 'react';

export interface WizardContextValue {
  isPublicMode: boolean;
  navigateToStep: (step: number) => void;
  onAIFeatureClick: (featureName?: string) => void;
}

const WizardContext = createContext<WizardContextValue>({
  isPublicMode: false,
  navigateToStep: () => {},
  onAIFeatureClick: () => {},
});

export const WizardContextProvider = WizardContext.Provider;

export function useWizardContext() {
  return useContext(WizardContext);
}
