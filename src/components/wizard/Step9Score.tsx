import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';
import { ResumeScoreCard } from '@/components/resume/ResumeScoreCard';
import { RateLimitWarning } from '@/components/RateLimitWarning';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/stores/authStore';
import { resumeService } from '@/services/resumeService';

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
    pollForScore,
    updateResumeSection,
    setGeneratedResume,
    syncResumeDataToGeneratedResume,
    syncGeneratedResumeToResumeData,
    resumeData,
    rateLimitInfo,
    clearRateLimitInfo
  } = useResumeStore();
  const { user } = useAuthStore();
  const [hasStartedPolling, setHasStartedPolling] = useState(false);
  const hasSyncedResumeData = useRef(false);
  const [showRateLimitModal, setShowRateLimitModal] = useState(false);

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

  // Reset polling flag when resumeId changes
  useEffect(() => {
    setHasStartedPolling(false);
    hasSyncedResumeData.current = false;
  }, [currentResumeId]);

  // Reset sync flag on unmount so sync runs again when user returns to Step 9
  // This is important for the "Fix" flow: user goes to Step 1, edits data, returns to Step 9
  useEffect(() => {
    return () => {
      hasSyncedResumeData.current = false;
    };
  }, []);

  // Sync ALL resume data from resumeData to generatedResume on mount
  // This handles the case where user edited ANY section via wizard steps (profile, education, experience, etc.)
  // and returned to Step 9 to see their updated score.
  // 
  // NOTE: This sync is only needed for wizard step edits (Steps 1-8).
  // Edits made via DataEditModal in Step 9 use updateSectionAndSync() which updates both stores directly.
  // The sync runs once per mount. If the user makes changes in DataEditModal, those changes
  // are saved directly to both stores, so they won't be overwritten by this sync.
  useEffect(() => {
    const syncAndRescore = async () => {
      if (!currentResumeId || !generatedResume || hasSyncedResumeData.current) return;
      
      hasSyncedResumeData.current = true;
      
      // Try to sync ALL sections from resumeData to generatedResume
      // syncResumeDataToGeneratedResume() only updates fields where resumeData differs from generatedResume
      // If user made edits in DataEditModal, both stores are already in sync, so nothing will change
      const updatedResume = syncResumeDataToGeneratedResume();
      
      if (updatedResume) {
        // Resume data was synced - save to API and re-score
        try {
          await resumeService.updateResume(currentResumeId, {
            generatedResume: updatedResume
          });
          
          // Trigger re-score to update checklist with synced data
          if (user?.isPremium) {
            await scoreResume(currentResumeId);
          }
        } catch (error) {
          console.error('Error syncing resume data:', error);
        }
      }
    };
    
    syncAndRescore();
  }, [currentResumeId, generatedResume, syncResumeDataToGeneratedResume, scoreResume, user?.isPremium]);

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
      } catch (error: any) {
        console.error('Failed to score resume:', error);
        // Don't show toast for rate limit errors - modal will be shown instead
        if (error?.name !== 'RateLimitError') {
          toast.error('Failed to score resume. Please try again.');
        }
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
    navigateToStep(10);
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

