import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Crown, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface RateLimitWarningProps {
  /** Custom error message to display (optional, uses default if not provided) */
  message?: string;
  /** Callback when user clicks retry button */
  onRetry?: () => void;
  /** Whether to show the retry button */
  showRetry?: boolean;
  /** Countdown duration in seconds (default: 60) */
  countdownSeconds?: number;
}

export function RateLimitWarning({ 
  message, 
  onRetry,
  showRetry = true,
  countdownSeconds = 60
}: RateLimitWarningProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [secondsRemaining, setSecondsRemaining] = useState(countdownSeconds);
  const [canRetry, setCanRetry] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (secondsRemaining <= 0) {
      setCanRetry(true);
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          setCanRetry(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  // Calculate progress percentage (0-100, where 100 = full circle remaining)
  const progressPercentage = (secondsRemaining / countdownSeconds) * 100;
  
  // Format time as M:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleUpgrade = () => {
    navigate('/premium');
  };

  const handleRetry = () => {
    if (canRetry && onRetry) {
      onRetry();
    }
  };

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
      {/* Header with icon */}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
        </div>
        <div className="flex-1">
          {/* Title */}
          <h4 className="text-sm font-semibold text-amber-800 mb-1">
            {t('wizard.rateLimit.title')}
          </h4>
          
          {/* Error message */}
          <p className="text-sm text-amber-700 mb-2">
            {message || t('wizard.rateLimit.defaultMessage')}
          </p>
          
          {/* Free user explanation */}
          <p className="text-sm text-amber-600 mb-3">
            {t('wizard.rateLimit.freeUserMessage')}
          </p>
          
          {/* Countdown Timer */}
          <div className="flex items-center gap-4 mb-4">
            {/* Circular Progress */}
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-amber-200"
                />
                {/* Progress circle */}
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  className={canRetry ? "text-green-500" : "text-amber-500"}
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - progressPercentage / 100)}`}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              {/* Timer text in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                {canRetry ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <span className="text-sm font-bold text-amber-700">
                    {formatTime(secondsRemaining)}
                  </span>
                )}
              </div>
            </div>
            
            {/* Status text */}
            <div className="flex-1">
              {canRetry ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-700">
                    {t('wizard.rateLimit.canRetryNow')}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-amber-600">
                    {t('wizard.rateLimit.waitCountdown', { time: formatTime(secondsRemaining) })}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Premium CTA */}
            <button
              onClick={handleUpgrade}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm hover:shadow-md"
            >
              <Crown className="w-4 h-4 mr-1.5" />
              {t('wizard.rateLimit.upgradeCta')}
            </button>
            
            {/* Retry button */}
            {showRetry && onRetry && (
              <button
                onClick={handleRetry}
                disabled={!canRetry}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  canRetry
                    ? 'bg-green-500 text-white hover:bg-green-600 shadow-sm hover:shadow-md'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {t('wizard.rateLimit.retryButton')}
              </button>
            )}
          </div>
          
          {/* Premium benefit */}
          <p className="text-xs text-amber-500 mt-3">
            {t('wizard.rateLimit.premiumBenefit')}
          </p>
        </div>
      </div>
    </div>
  );
}
