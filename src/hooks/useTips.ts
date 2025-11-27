import { useState, useEffect } from 'react';

const TIPS_CLOSED_KEY = 'wizard-tips-closed';

export function useTips() {
  const [areTipsClosed, setAreTipsClosed] = useState(false);

  useEffect(() => {
    // Verificar si el usuario cerró los tips anteriormente
    const closed = localStorage.getItem(TIPS_CLOSED_KEY) === 'true';
    setAreTipsClosed(closed);
  }, []);

  const closeTips = () => {
    setAreTipsClosed(true);
    localStorage.setItem(TIPS_CLOSED_KEY, 'true');
  };

  const showTips = () => {
    setAreTipsClosed(false);
    localStorage.removeItem(TIPS_CLOSED_KEY);
  };

  return {
    areTipsClosed,
    closeTips,
    showTips,
  };
}
