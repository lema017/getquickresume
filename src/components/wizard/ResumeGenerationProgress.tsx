import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface ResumeGenerationProgressProps {
  isGenerating: boolean;
  estimatedTime?: number; // in seconds
  onTimeout?: () => void;
}

interface ProgressPhase {
  id: number;
  message: string;
  progress: number;
  duration: number; // in seconds
}

export function ResumeGenerationProgress({ 
  isGenerating, 
  estimatedTime = 90,
  onTimeout 
}: ResumeGenerationProgressProps) {
  const { t } = useTranslation();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);

  const phases: ProgressPhase[] = [
    {
      id: 0,
      message: t('wizard.steps.preview.generation.phases.analyzing'),
      progress: 20,
      duration: 15
    },
    {
      id: 1,
      message: t('wizard.steps.preview.generation.phases.optimizing'),
      progress: 40,
      duration: 15
    },
    {
      id: 2,
      message: t('wizard.steps.preview.generation.phases.summary'),
      progress: 60,
      duration: 15
    },
    {
      id: 3,
      message: t('wizard.steps.preview.generation.phases.organizing'),
      progress: 80,
      duration: 15
    },
    {
      id: 4,
      message: t('wizard.steps.preview.generation.phases.ats'),
      progress: 95,
      duration: 10
    },
    {
      id: 5,
      message: t('wizard.steps.preview.generation.phases.finalizing'),
      progress: 100,
      duration: 5
    }
  ];

  useEffect(() => {
    if (!isGenerating) {
      setCurrentPhase(0);
      setProgress(0);
      setElapsedTime(0);
      setShowTimeoutWarning(false);
      return;
    }

    const startTime = Date.now();
    let phaseIndex = 0;
    let currentProgress = 0;

    const updateProgress = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      setElapsedTime(elapsed);

      // Check for timeout warning (2 minutes)
      if (elapsed >= 120 && !showTimeoutWarning) {
        setShowTimeoutWarning(true);
      }

      // Update phase based on elapsed time
      let totalDuration = 0;
      for (let i = 0; i < phases.length; i++) {
        totalDuration += phases[i].duration;
        if (elapsed <= totalDuration) {
          if (i !== phaseIndex) {
            phaseIndex = i;
            setCurrentPhase(i);
          }
          break;
        }
      }

      // Calculate progress within current phase
      const phaseStartTime = phases.slice(0, phaseIndex).reduce((acc, phase) => acc + phase.duration, 0);
      const phaseElapsed = elapsed - phaseStartTime;
      const phaseProgress = Math.min(phaseElapsed / phases[phaseIndex].duration, 1);
      
      currentProgress = phases[phaseIndex].progress * phaseProgress;
      setProgress(Math.min(currentProgress, 100));
    };

    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, [isGenerating, showTimeoutWarning]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const remainingTime = Math.max(0, estimatedTime - elapsedTime);

  if (!isGenerating) return null;

  return (
    <div className="text-center py-8">
      {/* Main Progress Display */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-blue-600 animate-pulse mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">
            {t('wizard.steps.preview.generation.title')}
          </h2>
        </div>
        
        <p className="text-lg text-gray-700 mb-6">
          {phases[currentPhase]?.message || t('wizard.steps.preview.generation.phases.analyzing')}
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto mb-4">
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>{Math.round(progress)}%</span>
            <span>{formatTime(elapsedTime)} / {formatTime(estimatedTime)}</span>
          </div>
        </div>

        {/* Time Information */}
        <div className="flex items-center justify-center text-gray-600 mb-4">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {remainingTime > 0 
              ? t('wizard.steps.preview.generation.remaining', { time: formatTime(remainingTime) })
              : t('wizard.steps.preview.generation.finalizing')
            }
          </span>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-lg mx-auto">
          <p className="text-sm text-blue-800">
            {t('wizard.steps.preview.generation.tip')}
          </p>
        </div>
      </div>

      {/* Timeout Warning */}
      {showTimeoutWarning && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-lg mx-auto mb-4">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            <h3 className="font-semibold text-yellow-800">
              {t('wizard.steps.preview.generation.timeout.title')}
            </h3>
          </div>
          <p className="text-sm text-yellow-700 mb-3">
            {t('wizard.steps.preview.generation.timeout.message')}
          </p>
          {onTimeout && (
            <button
              onClick={onTimeout}
              className="text-sm text-yellow-600 hover:text-yellow-800 underline"
            >
              {t('wizard.steps.preview.generation.timeout.retry')}
            </button>
          )}
        </div>
      )}

      {/* Phase Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {phases.map((phase, index) => (
          <div
            key={phase.id}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              index <= currentPhase 
                ? 'bg-blue-500' 
                : index === currentPhase + 1 
                  ? 'bg-blue-200' 
                  : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
