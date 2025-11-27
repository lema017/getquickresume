import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ResumeScoreCard } from '@/components/resume/ResumeScoreCard';
import { FloatingTips } from '@/components/FloatingTips';
import { TipsButton } from '@/components/TipsButton';
import { useTips } from '@/hooks/useTips';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/stores/authStore';

export function Step9Score() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { 
    markStepCompleted, 
    setCurrentStep, 
    generatedResume, 
    currentResumeId,
    currentScore,
    isScoring,
    scoreError,
    isPollingScore,
    fetchResumeScore,
    scoreResume,
    pollForScore
  } = useResumeStore();
  const { user } = useAuthStore();
  const { areTipsClosed, closeTips, showTips } = useTips();
  const [hasStartedPolling, setHasStartedPolling] = useState(false);

  // Reset polling flag when resumeId changes
  useEffect(() => {
    setHasStartedPolling(false);
  }, [currentResumeId]);

  // Fetch score when component mounts or resumeId changes
  useEffect(() => {
    if (currentResumeId && !hasStartedPolling) {
      // First, try to fetch existing score
      fetchResumeScore(currentResumeId).then(() => {
        // Check if score is still null after fetch
        const state = useResumeStore.getState();
        if (!state.currentScore) {
          // Score doesn't exist, start polling for it (auto-scoring in background)
          setHasStartedPolling(true);
          // Wait a bit for auto-scoring to potentially complete, then poll
          setTimeout(() => {
            pollForScore(currentResumeId, 10, 2000).catch(err => {
              console.error('Error polling for score:', err);
            });
          }, 2000); // Wait 2 seconds before starting to poll
        }
      });
    }
  }, [currentResumeId, fetchResumeScore, pollForScore, hasStartedPolling]);

  const handleScoreResume = async () => {
    if (currentResumeId && user?.isPremium) {
      try {
        await scoreResume(currentResumeId);
        toast.success('Resume scored successfully!');
      } catch (error) {
        console.error('Failed to score resume:', error);
        toast.error('Failed to score resume. Please try again.');
      }
    }
  };

  const handleEnhancementComplete = (sectionType: string, enhancedText: string) => {
    // Enhancement is handled in GeneratedResumeView, but we might want to trigger re-scoring
    // For now, just show a success message
    toast.success('Section enhanced successfully!');
  };

  const handleNext = () => {
    markStepCompleted(9);
    setCurrentStep(10);
    navigate('/wizard/manual/step-10');
  };

  const handleBack = () => {
    navigate('/wizard/manual/step-8');
  };

  if (!generatedResume) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <p className="text-yellow-800">
            Please generate your resume in Step 8 before viewing the score.
          </p>
          <button
            onClick={handleBack}
            className="mt-4 btn-outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back to Step 8
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Resume Score & Analysis
        </h2>
        <p className="text-gray-600">
          Review your resume score and get AI-powered recommendations to improve it
        </p>
      </div>

      {/* Tips Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Tips</h3>
          {areTipsClosed && (
            <TipsButton onClick={showTips} />
          )}
        </div>
        
        {!areTipsClosed && (
          <FloatingTips
            title="💡 Resume Scoring Tips"
            tips={[
              'A score of 8+ indicates a strong resume',
              'Focus on improving sections with low scores',
              'Use the enhancement feature to improve specific sections',
              'Quantifiable achievements boost your score significantly'
            ]}
            onClose={closeTips}
          />
        )}
      </div>

      {/* Resume Score Card */}
      <div className="mb-8">
        <ResumeScoreCard
          score={currentScore}
          isLoading={isPollingScore || isScoring}
          error={scoreError}
          resume={generatedResume}
          onEnhancementComplete={handleEnhancementComplete}
        />
      </div>

      {/* Score Resume Button (Premium Only) */}
      {user?.isPremium && currentResumeId && (
        <div className="mb-8 flex justify-end">
          <button
            onClick={handleScoreResume}
            disabled={isScoring}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isScoring ? 'Scoring...' : 'Re-score Resume'}
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button onClick={handleBack} className="btn-outline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.back')}
        </button>
        <button onClick={handleNext} className="btn-primary flex items-center">
          {t('common.next')}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}

