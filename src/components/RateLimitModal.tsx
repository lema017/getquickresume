import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Crown, Clock, AlertTriangle, CheckCircle, X, Sparkles } from 'lucide-react';

interface RateLimitModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Custom error message to display (optional, uses default if not provided) */
  message?: string;
  /** Callback when user clicks retry button */
  onRetry?: () => void;
  /** Callback when user closes the modal */
  onClose: () => void;
  /** Whether to show the retry button */
  showRetry?: boolean;
  /** Countdown duration in seconds (default: 60) */
  countdownSeconds?: number;
  /** Whether the user is a premium subscriber */
  isPremium?: boolean;
}

export function RateLimitModal({ 
  isOpen,
  message, 
  onRetry,
  onClose,
  showRetry = true,
  countdownSeconds = 60,
  isPremium = false
}: RateLimitModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [secondsRemaining, setSecondsRemaining] = useState(countdownSeconds);
  const [canRetry, setCanRetry] = useState(false);

  // Reset countdown when modal opens
  useEffect(() => {
    if (isOpen) {
      setSecondsRemaining(countdownSeconds);
      setCanRetry(false);
    }
  }, [isOpen, countdownSeconds]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen) return;
    
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
  }, [isOpen, secondsRemaining]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Calculate progress percentage (0-100, where 100 = full circle remaining)
  const progressPercentage = (secondsRemaining / countdownSeconds) * 100;
  
  // Format time as M:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleUpgrade = () => {
    onClose();
    navigate('/premium');
  };

  const handleRetry = () => {
    if (canRetry && onRetry) {
      onClose();
      onRetry();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Different styling for premium vs free users
  const bgColor = isPremium ? 'bg-blue-50' : 'bg-amber-50';
  const iconColor = isPremium ? 'text-blue-600' : 'text-amber-600';
  const titleColor = isPremium ? 'text-blue-800' : 'text-amber-800';
  const textColor = isPremium ? 'text-blue-700' : 'text-amber-700';
  const secondaryTextColor = isPremium ? 'text-blue-600' : 'text-amber-600';
  const circleColor = isPremium ? 'text-blue-200' : 'text-amber-200';
  const progressColor = isPremium ? 'text-blue-500' : 'text-amber-500';

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className={`${bgColor} rounded-2xl shadow-2xl max-w-lg w-full transform transition-all`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${isPremium ? 'bg-blue-100' : 'bg-amber-100'} rounded-full flex items-center justify-center`}>
              {isPremium ? (
                <Sparkles className={`w-6 h-6 ${iconColor}`} />
              ) : (
                <AlertTriangle className={`w-6 h-6 ${iconColor}`} />
              )}
            </div>
            <h3 className={`text-xl font-semibold ${titleColor}`}>
              {t('wizard.rateLimit.title')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`${secondaryTextColor} hover:${titleColor} transition-colors p-1 hover:bg-white/50 rounded-full`}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Error message */}
          <p className={`text-sm ${textColor} mb-2`}>
            {t('wizard.rateLimit.defaultMessage')}
          </p>
          
          {/* User type explanation */}
          <p className={`text-sm ${secondaryTextColor} mb-4`}>
            {isPremium 
              ? t('wizard.rateLimit.premiumUserMessage')
              : t('wizard.rateLimit.freeUserMessage')
            }
          </p>

          {/* Progress saved reassurance */}
          <div className={`${isPremium ? 'bg-blue-100' : 'bg-amber-100'} rounded-lg px-4 py-3 mb-6`}>
            <p className={`text-sm ${isPremium ? 'text-blue-700' : 'text-amber-700'} text-center`}>
              {t('wizard.rateLimit.progressSaved', {
                defaultValue: 'Your progress has been automatically saved. You can safely wait or return later.'
              })}
            </p>
          </div>
          
          {/* Countdown Timer */}
          <div className="flex items-center gap-6 mb-6 justify-center">
            {/* Circular Progress */}
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className={circleColor}
                />
                {/* Progress circle */}
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  className={canRetry ? "text-green-500" : progressColor}
                  strokeDasharray={`${2 * Math.PI * 44}`}
                  strokeDashoffset={`${2 * Math.PI * 44 * (1 - progressPercentage / 100)}`}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              {/* Timer text in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                {canRetry ? (
                  <CheckCircle className="w-10 h-10 text-green-500" />
                ) : (
                  <span className={`text-xl font-bold ${textColor}`}>
                    {formatTime(secondsRemaining)}
                  </span>
                )}
              </div>
            </div>
            
            {/* Status text */}
            <div className="flex-1">
              {canRetry ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-base font-medium text-green-700">
                    {t('wizard.rateLimit.canRetryNow')}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Clock className={`w-5 h-5 ${secondaryTextColor}`} />
                  <span className={`text-base ${secondaryTextColor}`}>
                    {t('wizard.rateLimit.waitCountdown', { time: formatTime(secondsRemaining) })}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Premium CTA - only show for free users */}
            {!isPremium && (
              <button
                onClick={handleUpgrade}
                className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
              >
                <Crown className="w-4 h-4 mr-2" />
                {t('wizard.rateLimit.upgradeCta')}
              </button>
            )}
            
            {/* Retry button */}
            {showRetry && onRetry && (
              <button
                onClick={handleRetry}
                disabled={!canRetry}
                className={`inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  canRetry
                    ? 'bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {t('wizard.rateLimit.retryButton')}
              </button>
            )}
          </div>
          
          {/* Benefit explanation */}
          <p className={`text-xs ${isPremium ? 'text-blue-500' : 'text-amber-500'} mt-4 text-center`}>
            {isPremium 
              ? t('wizard.rateLimit.premiumUserBenefit')
              : t('wizard.rateLimit.premiumBenefit')
            }
          </p>
        </div>
      </div>
    </div>
  );
}
