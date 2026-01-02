import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ResumeScoreCard } from '@/components/resume/ResumeScoreCard';
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
    setGeneratedResume
  } = useResumeStore();
  const { user } = useAuthStore();
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

  const handleEnhancementComplete = async (sectionType: string, enhancedText: string) => {
    try {
      // Update the resume section in the store
      const updatedResume = updateResumeSection(sectionType, enhancedText);
      if (updatedResume) {
        setGeneratedResume(updatedResume);
        
        // Save the enhanced resume to the database
        if (currentResumeId) {
          await resumeService.updateResume(currentResumeId, {
            generatedResume: updatedResume
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
    </div>
  );
}

