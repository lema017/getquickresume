import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { resumeService } from '@/services/resumeService';
import { resumeScoringService } from '@/services/resumeScoringService';
import { downloadService } from '@/services/downloadService';
import { Resume, ResumeData, ResumeScore } from '@/types';
import { ResumeScoreCard } from '@/components/resume/ResumeScoreCard';
import { ResumeHeader } from '@/components/resume-view/ResumeHeader';
import { ContactSection } from '@/components/resume-view/ContactSection';
import { SummarySection } from '@/components/resume-view/SummarySection';
import { ProfileMetadataSection } from '@/components/resume-view/ProfileMetadataSection';
import { ExperienceSection } from '@/components/resume-view/ExperienceSection';
import { EducationSection } from '@/components/resume-view/EducationSection';
import { SkillsSection } from '@/components/resume-view/SkillsSection';
import { CertificationsSection } from '@/components/resume-view/CertificationsSection';
import { ProjectsSection } from '@/components/resume-view/ProjectsSection';
import { LanguagesSection } from '@/components/resume-view/LanguagesSection';
import { AchievementsSection } from '@/components/resume-view/AchievementsSection';
import { ResumeMetadata } from '@/components/resume-view/ResumeMetadata';
import { TemplateSelectionModal } from '@/components/resume-view/TemplateSelectionModal';
import { PremiumDownloadModal } from '@/components/PremiumDownloadModal';
import { PremiumActionModal } from '@/components/PremiumActionModal';
import { ResumeTranslationModal } from '@/components/ResumeTranslationModal';
import { ShareResumeModal } from '@/components/ShareResumeModal';
import { ResumeTemplate } from '@/services/templatesService';
import { useAuthStore } from '@/stores/authStore';
import { convertGeneratedResumeToResumeData } from '@/components/wizard/TemplatePreviewModal';
import { calculatePagination } from '@/services/paginationService';
import { calculateAndAssignPageNumbers } from '@/components/wizard/Step9Preview';
import { filterResumeDataForPage } from '@/utils/resumePageFilter';
import { generateResumePDFFromPages } from '@/utils/pdfGenerator';
import { WebComponentRenderer } from '@/components/wizard/WebComponentRenderer';
import { A4_DIMENSIONS } from '@/utils/a4Dimensions';
import { trackResumeDownloadCompleted } from '@/services/marketingAnalytics';

export function ResumeViewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [resume, setResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Score state
  const [currentScore, setCurrentScore] = useState<ResumeScore | null>(null);
  const [isLoadingScore, setIsLoadingScore] = useState(false);
  const [scoreError, setScoreError] = useState<string | null>(null);

  // Template selection state
  const [isSelectingTemplate, setIsSelectingTemplate] = useState(false);
  const [selectedTemplateForDownload, setSelectedTemplateForDownload] = useState<ResumeTemplate | null>(null);

  // PDF generation state
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [generatingProgress, setGeneratingProgress] = useState<string>('');
  const [calculatingPagination, setCalculatingPagination] = useState(false);
  const [templateData, setTemplateData] = useState<ResumeData | null>(null);
  const [paginatedPages, setPaginatedPages] = useState<ResumeData[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [modifiedJsCode, setModifiedJsCode] = useState<string>('');

  // Premium modal state
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showPremiumActionModal, setShowPremiumActionModal] = useState(false);
  const [premiumFeature, setPremiumFeature] = useState<'enhance' | 'rescore' | 'edit'>('edit');
  const [showTranslationModal, setShowTranslationModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const { user } = useAuthStore();

  // Refs
  const templateContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadResume = async () => {
      if (!id) {
        setError(t('resumeView.errors.missingId'));
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const loadedResume = await resumeService.getResume(id);
        setResume(loadedResume);
      } catch (err) {
        console.error('Error loading resume:', err);
        if (err instanceof Error) {
          if (err.message.includes('404') || err.message.includes('not found')) {
            setError(t('resumeView.errors.notFound'));
          } else if (err.message.includes('401') || err.message.includes('Unauthorized')) {
            setError(t('resumeView.errors.unauthorized'));
            setTimeout(() => navigate('/login'), 2000);
          } else {
            setError(t('resumeView.errors.generic'));
          }
        } else {
          setError(t('resumeView.errors.generic'));
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadResume();
  }, [id, navigate, t]);

  // Fetch score when resume is loaded (for premium users)
  useEffect(() => {
    const fetchScore = async () => {
      if (!resume || !id || !user?.isPremium) {
        return;
      }

      try {
        setIsLoadingScore(true);
        setScoreError(null);
        const score = await resumeScoringService.getResumeScore(id);
        setCurrentScore(score);
      } catch (err) {
        console.error('Error fetching score:', err);
        if (err instanceof Error) {
          setScoreError(err.message);
        }
      } finally {
        setIsLoadingScore(false);
      }
    };

    fetchScore();
  }, [resume, id, user?.isPremium]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleEdit = () => {
    if (!resume) return;

    // Clear localStorage before editing resume
    localStorage.removeItem('resume_wizard_v1');
    localStorage.removeItem('generated-resume');
    navigate(`/wizard/manual/step-1?resumeId=${resume.id}`);
  };

  // Handle enhancement completion from ResumeScoreCard
  const handleEnhancementComplete = async (sectionType: string, enhancedText: string) => {
    if (!resume || !id || !resume.generatedResume) return;

    try {
      // Update the generatedResume with enhanced text
      const updatedGeneratedResume = { ...resume.generatedResume };
      
      // Map section type to generatedResume field
      if (sectionType === 'achievement' || sectionType === 'achievements') {
        // Parse enhanced text into achievements array
        const achievements = enhancedText.split('\n').filter(a => a.trim().length > 0);
        updatedGeneratedResume.achievements = achievements;
      } else if (sectionType === 'summary') {
        updatedGeneratedResume.professionalSummary = enhancedText;
      }
      // Add more section mappings as needed

      // Save to database
      const updatedResume = await resumeService.updateResume(id, {
        generatedResume: updatedGeneratedResume
      });
      
      // Update local state
      setResume(updatedResume);
      toast.success('Section enhanced! Re-scoring...');

      // Re-score the resume
      if (user?.isPremium) {
        try {
          setIsLoadingScore(true);
          const newScore = await resumeScoringService.scoreResume(id);
          setCurrentScore(newScore);
          toast.success('Checklist updated with your improvements!');
        } catch (scoreErr) {
          console.error('Error re-scoring:', scoreErr);
          // Enhancement was successful, just couldn't re-score
        } finally {
          setIsLoadingScore(false);
        }
      }
    } catch (err) {
      console.error('Error saving enhancement:', err);
      toast.error('Failed to save enhancement. Please try again.');
    }
  };

  const handleDownload = () => {
    if (!resume) return;
    setIsSelectingTemplate(true);
  };

  const handleCancelTemplateSelection = () => {
    setIsSelectingTemplate(false);
  };

  const handleTemplateSelect = (template: ResumeTemplate) => {
    setSelectedTemplateForDownload(template);
    setIsSelectingTemplate(false);
    handleGeneratePDF(template);
  };


  const handleGeneratePDF = async (template: ResumeTemplate) => {
    if (!resume) {
      toast.error(t('resumeView.download.errors.noResume'));
      return;
    }

    // Check download limits before generating PDF
    try {
      const downloadResult = await downloadService.trackDownload(resume.id);
      
      if (!downloadResult.allowed) {
        // Show premium modal and return early
        setShowPremiumModal(true);
        return;
      }
    } catch (error) {
      console.error('Error checking download limits:', error);
      if (error instanceof Error) {
        if (error.message.includes('Unauthorized')) {
          toast.error('Please log in again');
          navigate('/login');
          return;
        }
        if (error.message.includes('not found')) {
          toast.error('Resume not found');
          return;
        }
      }
      toast.error('Error checking download limits. Please try again.');
      return;
    }

    setIsGeneratingPDF(true);
    setGeneratingProgress(t('resumeView.download.calculatingLayout'));

    try {
      // Step 1: Prepare resume data
      let resumeData: ResumeData;
      if (resume.generatedResume) {
        // Convert from GeneratedResume if available
        resumeData = convertGeneratedResumeToResumeData(resume.generatedResume);
        // Preserve fields from resumeData if they exist
        if (resume.resumeData.profession) resumeData.profession = resume.resumeData.profession;
        if (resume.resumeData.targetLevel) resumeData.targetLevel = resume.resumeData.targetLevel;
        if (resume.resumeData.linkedin) resumeData.linkedin = resume.resumeData.linkedin;
        if (resume.resumeData.jobDescription) resumeData.jobDescription = resume.resumeData.jobDescription;
        if (resume.resumeData.totalCharacters) resumeData.totalCharacters = resume.resumeData.totalCharacters;
      } else {
        // Use existing resumeData
        resumeData = resume.resumeData;
      }

      // Step 2: Calculate pagination
      setCalculatingPagination(true);
      setGeneratingProgress(t('resumeView.download.calculatingLayout'));
      const pagination = await calculatePagination(resumeData, template);
      const paginatedResumeData = calculateAndAssignPageNumbers(resumeData, pagination);

      // Step 3: Set paginated data directly (templates expect ResumeData)
      setGeneratingProgress(t('resumeView.download.rendering'));
      setTemplateData(paginatedResumeData);
      setTotalPages(pagination.totalPages);

      const pages: ResumeData[] = [];
      for (let pageNum = 1; pageNum <= pagination.totalPages; pageNum++) {
        pages.push(filterResumeDataForPage(paginatedResumeData, pageNum));
      }
      setPaginatedPages(pages);

      // Step 5: Set template code (templates now include multi-page CSS built-in)
      setModifiedJsCode(template.jsCode);

      // Step 6: Render template pages (wait a bit for DOM to update)
      setGeneratingProgress(t('resumeView.download.rendering'));
      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 7: Generate PDF
      setGeneratingProgress(t('resumeView.download.creatingPDF'));
      if (!templateContainerRef.current) {
        throw new Error('Template container not found');
      }

      const userName = `${resumeData.firstName}_${resumeData.lastName}`.replace(/\s+/g, '_') || 'Resume';
      const templateName = template.name.replace(/\s+/g, '_');
      const fileName = `CV_${userName}_${templateName}.pdf`;

      await generateResumePDFFromPages(templateContainerRef.current, fileName);

      // Track successful download completion
      trackResumeDownloadCompleted(resume.id, template.id);

      toast.success(t('resumeView.download.success'));
    } catch (err) {
      console.error('Error generating PDF:', err);
      if (err instanceof Error) {
        if (err.message.includes('No page containers found')) {
          toast.error(t('resumeView.download.errors.noPages'));
        } else if (err.message.includes('pagination')) {
          toast.error(t('resumeView.download.errors.paginationFailed'));
        } else if (err.message.includes('Template container')) {
          toast.error(t('resumeView.download.errors.containerNotFound'));
        } else {
          toast.error(t('resumeView.download.errors.generationFailed'));
        }
      } else {
        toast.error(t('resumeView.download.errors.generationFailed'));
      }
    } finally {
      setIsGeneratingPDF(false);
      setCalculatingPagination(false);
      setGeneratingProgress('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">{t('resumeView.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {t('resumeView.errors.title')}
          </h2>
          <p className="text-gray-600 mb-6">{error || t('resumeView.errors.notFound')}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('resumeView.actions.backToDashboard')}
            </button>
            {error?.includes('401') && (
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {t('resumeView.actions.login')}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // For tailored resumes, use generatedResume content; otherwise use original resumeData
  // generatedResume contains the tailored/optimized content with added keywords
  const resumeData: ResumeData = resume.generatedResume 
    ? {
        ...convertGeneratedResumeToResumeData(resume.generatedResume),
        // Preserve metadata fields from original resumeData
        profession: resume.resumeData.profession,
        targetLevel: resume.resumeData.targetLevel,
        linkedin: resume.resumeData.linkedin,
        jobDescription: resume.resumeData.jobDescription,
        totalCharacters: resume.resumeData.totalCharacters,
        language: resume.resumeData.language,
      }
    : resume.resumeData;

  return (
    <>
      <Helmet>
        <title>{resume.title || 'Resume'} - GetQuickResume</title>
        <meta name="description" content="View and edit your resume" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          aria-label={t('resumeView.actions.backToDashboard')}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>{t('resumeView.actions.back')}</span>
        </button>

        {/* Header */}
        <ResumeHeader
          resume={resume}
          onEdit={handleEdit}
          onDownload={handleDownload}
          onTranslate={resume.generatedResume ? () => setShowTranslationModal(true) : undefined}
          onShare={resume.generatedResume ? () => setShowShareModal(true) : undefined}
          isGeneratingPDF={isGeneratingPDF}
        />

        {/* Resume Score Card (Premium users only) */}
        {user?.isPremium && (currentScore || isLoadingScore) && (
          <div className="mt-8">
            <ResumeScoreCard
              score={currentScore}
              isLoading={isLoadingScore}
              error={scoreError}
              resume={resume.generatedResume}
              onEnhancementComplete={handleEnhancementComplete}
            />
          </div>
        )}

        {/* Resume Content */}
        <div className="mt-8 space-y-6">
          <ContactSection resumeData={resumeData} />
          <SummarySection summary={resumeData.summary} />
          <ProfileMetadataSection resumeData={resumeData} />
          <ExperienceSection experiences={resumeData.experience} />
          <EducationSection education={resumeData.education} />
          <SkillsSection skills={resumeData.skillsRaw} />
          <CertificationsSection certifications={resumeData.certifications} />
          <ProjectsSection projects={resumeData.projects} />
          <LanguagesSection languages={resumeData.languages} />
          <AchievementsSection achievements={resumeData.achievements} />
        </div>

        {/* Metadata Footer */}
        <ResumeMetadata resume={resume} />

        {/* Share Modal */}
        {resume && resume.generatedResume && (
          <ShareResumeModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            resumeId={resume.id}
            shareToken={resume.shareToken}
            isPubliclyShared={resume.isPubliclyShared}
            onSharingChanged={async () => {
              // Reload resume to get updated sharing status
              try {
                const updatedResume = await resumeService.getResume(resume.id);
                setResume(updatedResume);
              } catch (error) {
                console.error('Error reloading resume:', error);
              }
            }}
          />
        )}

        {/* Translation Modal */}
        {resume && resume.generatedResume && (
          <ResumeTranslationModal
            isOpen={showTranslationModal}
            onClose={() => setShowTranslationModal(false)}
            resumeId={resume.id}
            currentLanguage={resume.resumeData.language || 'es'}
            resumeTitle={resume.title}
          />
        )}

        {/* Progress Indicator */}
        {isGeneratingPDF && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center mb-4">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('resumeView.download.generating')}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">{generatingProgress}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: calculatingPagination
                      ? '33%'
                      : generatingProgress.includes(t('resumeView.download.rendering'))
                      ? '66%'
                      : '100%',
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Hidden Template Container for PDF Generation */}
        <div
          ref={templateContainerRef}
          className="fixed -left-[9999px] -top-[9999px] pointer-events-none"
          style={{ width: `${A4_DIMENSIONS.widthPX}px` }}
        >
          {selectedTemplateForDownload &&
            modifiedJsCode &&
            paginatedPages.length > 0 &&
            paginatedPages.map((pageData, index) => (
              <div
                key={index}
                className="a4-page-container"
                style={{
                  width: `${A4_DIMENSIONS.widthPX}px`,
                  minHeight: `${A4_DIMENSIONS.heightPX}px`,
                  height: 'auto',
                  background: 'white',
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                  margin: '0',
                  paddingBottom: `${A4_DIMENSIONS.marginBottom}px`,
                  paddingRight: `${A4_DIMENSIONS.marginRight}px`,
                  pageBreakAfter: 'always',
                  overflow: 'visible',
                  position: 'relative',
                }}
              >
                <WebComponentRenderer
                  tagName={selectedTemplateForDownload.tagName}
                  jsCode={modifiedJsCode}
                  data={pageData as any}
                  language="en"
                  className="template-preview-multi-page"
                  style={{ 
                    width: `${A4_DIMENSIONS.contentWidth}px`, 
                    minHeight: `${A4_DIMENSIONS.contentHeight}px`,
                    height: 'auto',
                    display: 'block',
                    overflow: 'visible',
                    position: 'relative',
                  }}
                />
              </div>
            ))}
        </div>

        {/* Template Selection Modal */}
        <TemplateSelectionModal
          isOpen={isSelectingTemplate}
          onClose={handleCancelTemplateSelection}
          onSelectTemplate={handleTemplateSelect}
          selectedTemplateId={selectedTemplateForDownload?.id}
        />
      <PremiumDownloadModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
      <PremiumActionModal
        isOpen={showPremiumActionModal}
        onClose={() => setShowPremiumActionModal(false)}
        feature={premiumFeature}
      />
      {resume && resume.generatedResume && (
        <ResumeTranslationModal
          isOpen={showTranslationModal}
          onClose={() => setShowTranslationModal(false)}
          resumeId={resume.id}
          currentLanguage={resume.resumeData.language || 'es'}
          resumeTitle={resume.title}
        />
      )}
      </div>
      </div>
    </>
  );
}

