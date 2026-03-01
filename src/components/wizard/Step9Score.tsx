import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { ArrowRight, ArrowLeft, X, Sparkles, Crown, CheckCircle, SkipForward } from 'lucide-react';
import { ResumeScoreCard } from '@/components/resume/ResumeScoreCard';
import { RateLimitWarning } from '@/components/RateLimitWarning';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/stores/authStore';
import { resumeService } from '@/services/resumeService';
import { trackAtsScoreViewed } from '@/services/marketingAnalytics';

export function Step9Score() {
  const { t } = useTranslation();
  const { navigateToStep } = useWizardNavigation();
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
    updateResumeSection,
    setGeneratedResume,
    syncGeneratedResumeToResumeData,
    resumeData,
    rateLimitInfo,
    clearRateLimitInfo
  } = useResumeStore();
  const { user } = useAuthStore();
  const canUseAIFeatures = user?.isPremium || !user?.freeResumeUsed;
  const [hasFetchedScore, setHasFetchedScore] = useState(false);
  const [showRateLimitModal, setShowRateLimitModal] = useState(false);
  const hasTrackedScoreRef = useRef(false);

  // Track when score is viewed (only once per session)
  useEffect(() => {
    if (currentScore && !hasTrackedScoreRef.current) {
      trackAtsScoreViewed(currentScore.totalScore);
      hasTrackedScoreRef.current = true;
    }
  }, [currentScore]);

  // Show rate limit modal when rateLimitInfo is set
  useEffect(() => {
    if (rateLimitInfo) {
      setShowRateLimitModal(true);
    }
  }, [rateLimitInfo]);

  // Handle retry from rate limit modal
  const handleRateLimitRetry = async () => {
    setShowRateLimitModal(false);
    clearRateLimitInfo();
    
    if (currentResumeId) {
      await handleScoreResume();
    }
  };

  // Close rate limit modal
  const handleCloseRateLimitModal = () => {
    setShowRateLimitModal(false);
    clearRateLimitInfo();
  };

  // Reset fetch flag when resumeId changes
  useEffect(() => {
    setHasFetchedScore(false);
  }, [currentResumeId]);

  // Note: We no longer sync resumeData to generatedResume here.
  // Once AI generation happens in Step 8, the generatedResume is the source of truth.
  // All edits from Step 8 onwards happen directly on generatedResume via GeneratedResumeView.

  // Fetch existing score when component mounts (but don't auto-score)
  // Scoring now requires explicit user action via "Score Resume" button
  useEffect(() => {
    if (currentResumeId && !hasFetchedScore) {
      setHasFetchedScore(true);
      fetchResumeScore(currentResumeId).catch(err => {
        console.error('Error fetching score:', err);
      });
    }
  }, [currentResumeId, fetchResumeScore, hasFetchedScore]);

  // Handle score resume button click
  // Works for both free users (first score only) and premium users (re-scoring)
  const handleScoreResume = async () => {
    if (!currentResumeId) return;
    
    try {
      await scoreResume(currentResumeId);
      toast.success(t('wizard.score.scoreSuccess', 'Resume scored successfully!'));
    } catch (error: any) {
      console.error('Failed to score resume:', error);
      // Don't show toast for rate limit errors - modal will be shown instead
      if (error?.name !== 'RateLimitError') {
        toast.error(t('wizard.score.scoreError', 'Failed to score resume. Please try again.'));
      }
    }
  };

  const handleEnhancementComplete = async (sectionType: string, enhancedText: string) => {
    try {
      // Update the resume section in the store (updates generatedResume)
      const updatedResume = updateResumeSection(sectionType, enhancedText);
      if (updatedResume) {
        setGeneratedResume(updatedResume);
        
        // Sync enhanced content back to resumeData to keep both stores in sync
        // This prevents data loss when user returns to edit later
        syncGeneratedResumeToResumeData();
        
        // Save the enhanced resume to the database
        if (currentResumeId) {
          // Get the updated resumeData after sync
          const currentResumeData = useResumeStore.getState().resumeData;
          
          // Save BOTH generatedResume AND resumeData to API
          // This ensures enhancements persist when user returns to edit
          await resumeService.updateResume(currentResumeId, {
            generatedResume: updatedResume,
            resumeData: currentResumeData
          });
          toast.success('Section enhanced! Re-scoring to update checklist...');
          
          // Auto-rescore after enhancement to update the checklist
          // This uses deterministic scoring, so it's fast and consistent
          if (user?.isPremium) {
            try {
              await scoreResume(currentResumeId);
              toast.success('Checklist updated with your improvements!');
            } catch (scoreError) {
              console.error('Auto-rescore failed:', scoreError);
              // Don't show error - enhancement was still successful
            }
          }
        } else {
          toast.success('Section enhanced successfully!');
        }
      } else {
        toast.error('Failed to update resume section');
      }
    } catch (error) {
      console.error('Error saving enhanced resume:', error);
      toast.error('Failed to save enhanced resume. Please try again.');
    }
  };

  const handleNext = () => {
    markStepCompleted(9);
    setCurrentStep(10);
    navigateToStep(10); // Step 10 is now Final Preview + Download
  };

  const handleBack = () => {
    navigateToStep(8);
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

  // No-AI path: show premium CTA + skip button instead of scoring UI
  if (!canUseAIFeatures) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('wizard.noAi.scoringTitle')}
          </h2>
          <p className="text-gray-600">
            {t('wizard.noAi.scoringDescription')}
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-8 mb-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <Crown className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {t('wizard.noAi.scoringTitle')}
            </h3>
            <p className="text-gray-600 max-w-md mb-6">
              {t('wizard.noAi.scoringDescription')}
            </p>

            <div className="space-y-3 mb-8 text-left w-full max-w-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-gray-700">{t('wizard.noAi.scoringFeature1')}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-gray-700">{t('wizard.noAi.scoringFeature2')}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-gray-700">{t('wizard.noAi.scoringFeature3')}</span>
              </div>
            </div>

            <a
              href="/premium"
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-yellow-700 transition-all shadow-md hover:shadow-lg"
            >
              {t('wizard.noAi.upgradeButton')}
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button onClick={handleBack} className="btn-outline flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back')}
          </button>
          <button
            onClick={handleNext}
            className="btn-primary flex items-center"
          >
            {t('wizard.noAi.skipScoring')}
            <SkipForward className="w-4 h-4 ml-2" />
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
          Resume Score & Optimization
        </h2>
        <p className="text-gray-600">
          Complete your checklist items to optimize your resume for ATS and recruiters
        </p>
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

      {/* Scoring Actions - Strategy:
          - No score: Show "Score Resume" button (free + premium)
          - Has score + Free user: Show existing score message + upgrade CTA
          - Has score + Premium: Show "Re-score Resume" button
      */}
      {currentResumeId && (
        <div className="mb-8">
          {!currentScore && !isScoring && !isPollingScore ? (
            // No score yet - show Score Resume button for all users
            <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('wizard.score.readyToScore', 'Ready to Score Your Resume')}
                </h3>
                <p className="text-sm text-gray-600 max-w-md">
                  {t('wizard.score.scoreDescription', 'Get an AI-powered analysis of your resume with actionable improvements.')}
                </p>
              </div>
              <button
                onClick={handleScoreResume}
                disabled={isScoring}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5" />
                {isScoring ? t('wizard.score.scoring', 'Scoring...') : t('wizard.score.scoreButton', 'Score Resume')}
              </button>
              {!user?.isPremium && (
                <p className="text-xs text-gray-500 text-center">
                  {t('wizard.score.freeUserNote', 'Free users get one score per resume')}
                </p>
              )}
            </div>
          ) : currentScore && !user?.isPremium ? (
            // Free user with existing score - show upgrade CTA
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-3">
                <Crown className="w-6 h-6 text-amber-600" />
                <div>
                  <p className="font-medium text-amber-900">
                    {t('wizard.score.alreadyScored', 'Resume Already Scored')}
                  </p>
                  <p className="text-sm text-amber-700">
                    {t('wizard.score.upgradeToRescore', 'Upgrade to Premium for unlimited re-scoring after edits')}
                  </p>
                </div>
              </div>
              <a
                href="/pricing"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all text-center leading-snug"
              >
                <Crown className="w-4 h-4 flex-shrink-0" />
                <span>{t('wizard.score.upgradeCta', 'Upgrade to Premium')}</span>
              </a>
            </div>
          ) : user?.isPremium && currentScore ? (
            // Premium user with existing score - show re-score button
            <div className="flex justify-end">
              <button
                onClick={handleScoreResume}
                disabled={isScoring}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4" />
                {isScoring ? t('wizard.score.scoring', 'Scoring...') : t('wizard.score.rescoreButton', 'Re-score Resume')}
              </button>
            </div>
          ) : null}
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

      {/* Rate Limit Modal */}
      {showRateLimitModal && rateLimitInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {t('wizard.rateLimit.rescoreTitle', 'Scoring Limit Reached')}
              </h3>
              <button
                onClick={handleCloseRateLimitModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <RateLimitWarning
                onRetry={handleRateLimitRetry}
                onClose={handleCloseRateLimitModal}
                showRetry={true}
                countdownSeconds={Math.max(1, Math.ceil((rateLimitInfo.resetTime - Date.now()) / 1000))}
                isPremium={user?.isPremium}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

