import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, PenTool, ChevronRight, User, Briefcase, Sparkles } from 'lucide-react';
import { useCoverLetterStore } from '@/stores/coverLetterStore';
import { resumeService } from '@/services/resumeService';
import { Resume } from '@/types';

interface SourceSelectorProps {
  onSourceSelected: () => void;
}

export function SourceSelector({ onSourceSelected }: SourceSelectorProps) {
  const { t } = useTranslation();
  const { loadFromResume, updateCoverLetterData } = useCoverLetterStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await resumeService.listResumes();
        setResumes(data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const handleSelectResume = (resume: Resume) => {
    setSelectedResumeId(resume.id);
    
    // Extract data from resume
    const resumeData = resume.resumeData;
    const fullName = `${resumeData.firstName || ''} ${resumeData.lastName || ''}`.trim();
    
    // Build experience summary from work history
    const experienceSummary = resumeData.experience
      ?.slice(0, 3) // Take top 3 most recent experiences
      .map(exp => {
        const details = exp.achievements?.length 
          ? exp.achievements.slice(0, 2).join('; ') 
          : exp.responsibilities?.slice(0, 2).join('; ');
        return `${exp.title} at ${exp.company}${details ? `: ${details.slice(0, 150)}` : ''}`;
      })
      .join('. ') || undefined;
    
    // Extract key achievements
    const achievements = resumeData.achievements
      ?.slice(0, 5) // Take top 5 achievements
      .map(a => a.description)
      .filter(Boolean) || undefined;
    
    loadFromResume(
      {
        fullName,
        email: resumeData.email || '',
        phone: resumeData.phone || '',
        linkedin: resumeData.linkedin || '',
        resumeContext: {
          profession: resumeData.profession || undefined,
          skills: resumeData.skillsRaw?.slice(0, 10) || undefined, // Top 10 skills
          experienceSummary,
          summary: resumeData.summary || undefined,
          achievements,
        },
      },
      resume.id
    );
    
    onSourceSelected();
  };

  const handleStartFromScratch = () => {
    updateCoverLetterData({
      sourceResumeId: undefined,
      resumeContext: undefined,
    });
    onSourceSelected();
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('coverLetter.sourceSelector.title')}
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          {t('coverLetter.sourceSelector.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* From Resume Option */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-purple-300 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {t('coverLetter.sourceSelector.fromResume.title')}
              </h3>
              <p className="text-sm text-gray-500">
                {t('coverLetter.sourceSelector.fromResume.description')}
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="py-8 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto" />
              <p className="text-sm text-gray-500 mt-2">{t('common.loading')}</p>
            </div>
          ) : resumes.length === 0 ? (
            <div className="py-8 text-center bg-gray-50 rounded-xl">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">
                {t('coverLetter.sourceSelector.fromResume.noResumes')}
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {resumes.map((resume) => (
                <button
                  key={resume.id}
                  onClick={() => handleSelectResume(resume)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${
                    selectedResumeId === resume.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {resume.resumeData.firstName?.[0] || 'R'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {resume.resumeData.firstName} {resume.resumeData.lastName}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {resume.resumeData.profession || t('coverLetter.sourceSelector.fromResume.noProfession')}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* From Scratch Option */}
        <button
          onClick={handleStartFromScratch}
          className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-indigo-300 hover:shadow-lg transition-all text-left group"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PenTool className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {t('coverLetter.sourceSelector.fromScratch.title')}
              </h3>
              <p className="text-sm text-gray-500">
                {t('coverLetter.sourceSelector.fromScratch.description')}
              </p>
            </div>
          </div>

          <div className="py-8 text-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
            <User className="w-16 h-16 text-indigo-300 mx-auto mb-3" />
            <p className="text-indigo-600 font-medium">
              {t('coverLetter.sourceSelector.fromScratch.cta')}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {t('coverLetter.sourceSelector.fromScratch.hint')}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-indigo-600 font-medium">
            <span>{t('coverLetter.sourceSelector.fromScratch.button')}</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
}

