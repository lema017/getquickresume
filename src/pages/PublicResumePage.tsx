import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader2, AlertCircle } from 'lucide-react';
import { Resume } from '@/types';
import { publicResumeService } from '@/services/publicResumeService';
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

export function PublicResumePage() {
  const { shareToken } = useParams<{ shareToken: string }>();
  const { t } = useTranslation();
  const [resume, setResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Guard to prevent double view recording (React StrictMode runs useEffect twice)
  const hasRecordedView = useRef(false);

  useEffect(() => {
    const loadResume = async () => {
      if (!shareToken) {
        setError(t('publicResume.errors.missingToken'));
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await publicResumeService.getPublicResume(shareToken);
        
        if (!response.success || !response.data) {
          throw new Error(response.error || 'Failed to load resume');
        }

        setResume(response.data);
        
        // Record view asynchronously (only once, guard against StrictMode double-execution)
        if (!hasRecordedView.current) {
          hasRecordedView.current = true;
          publicResumeService.recordView(shareToken);
        }
      } catch (err) {
        console.error('Error loading public resume:', err);
        if (err instanceof Error) {
          if (err.message.includes('404') || err.message.includes('not found')) {
            setError(t('publicResume.errors.notFound'));
          } else {
            setError(t('publicResume.errors.generic'));
          }
        } else {
          setError(t('publicResume.errors.generic'));
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadResume();
  }, [shareToken, t]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">{t('publicResume.loading')}</p>
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
            {t('publicResume.errors.title')}
          </h2>
          <p className="text-gray-600">{error || t('publicResume.errors.notFound')}</p>
        </div>
      </div>
    );
  }

  const { resumeData } = resume;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Resume Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {resumeData.firstName} {resumeData.lastName}
            </h1>
            {resumeData.profession && (
              <p className="text-lg text-gray-600">{resumeData.profession}</p>
            )}
          </div>

          <div className="space-y-6">
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
        </div>

        {/* Powered by Footer */}
        <div className="text-center py-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">
            {t('publicResume.poweredBy')}
          </p>
          <a
            href="/"
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
          >
            GetQuickResume
          </a>
        </div>
      </div>
    </div>
  );
}

