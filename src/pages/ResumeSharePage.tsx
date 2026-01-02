import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  Share2, 
  Eye, 
  Users, 
  TrendingUp, 
  Crown,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { resumeService } from '@/services/resumeService';
import { resumeSharingService, AnalyticsSummary } from '@/services/resumeSharingService';
import { useAuthStore } from '@/stores/authStore';
import { Resume } from '@/types';

// Share components
import { QuickSharePanel } from '@/components/share/QuickSharePanel';
import { RecentViewers } from '@/components/share/RecentViewers';
import { EngagementChart } from '@/components/share/EngagementChart';
import { GeoMap } from '@/components/share/GeoMap';
import { QuickStats } from '@/components/share/QuickStats';

export function ResumeSharePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuthStore();
  
  const [resume, setResume] = useState<Resume | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPremium = user?.isPremium || false;

  useEffect(() => {
    if (id) {
      loadResumeAndAnalytics();
    }
  }, [id]);

  const loadResumeAndAnalytics = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Load resume first
      const resumeData = await resumeService.getResume(id);
      setResume(resumeData);
      
      // Load analytics if sharing is enabled
      if (resumeData.isPubliclyShared && resumeData.shareToken) {
        setAnalyticsLoading(true);
        try {
          const analyticsResponse = await resumeSharingService.getAnalytics(id);
          if (analyticsResponse.success && analyticsResponse.data) {
            setAnalytics(analyticsResponse.data);
          }
        } catch (analyticsError) {
          console.error('Error loading analytics:', analyticsError);
        } finally {
          setAnalyticsLoading(false);
        }
      }
    } catch (err) {
      console.error('Error loading resume:', err);
      setError(t('resumeShare.errors.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSharingChanged = async () => {
    // Reload resume to get updated sharing status
    if (id) {
      try {
        const updatedResume = await resumeService.getResume(id);
        setResume(updatedResume);
        
        // Load analytics if sharing was just enabled
        if (updatedResume.isPubliclyShared && updatedResume.shareToken) {
          const analyticsResponse = await resumeSharingService.getAnalytics(id);
          if (analyticsResponse.success && analyticsResponse.data) {
            setAnalytics(analyticsResponse.data);
          }
        } else {
          setAnalytics(null);
        }
      } catch (error) {
        console.error('Error reloading resume:', error);
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !resume) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {t('resumeShare.errors.notFound')}
          </h2>
          <p className="text-gray-600 mb-6">
            {error || t('resumeShare.errors.loadFailed')}
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            {t('common.backToDashboard')}
          </button>
        </div>
      </div>
    );
  }

  // Premium required state
  if (!isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link 
            to={`/resume/${id}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('resumeShare.backToResume')}
          </Link>

          {/* Premium upgrade card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-xl border border-amber-200 p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('resumeShare.premium.title')}
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('resumeShare.premium.description')}
            </p>
            
            {/* Feature highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/70 rounded-2xl p-6">
                <Share2 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">{t('resumeShare.premium.feature1.title')}</h3>
                <p className="text-sm text-gray-600">{t('resumeShare.premium.feature1.description')}</p>
              </div>
              <div className="bg-white/70 rounded-2xl p-6">
                <Eye className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">{t('resumeShare.premium.feature2.title')}</h3>
                <p className="text-sm text-gray-600">{t('resumeShare.premium.feature2.description')}</p>
              </div>
              <div className="bg-white/70 rounded-2xl p-6">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">{t('resumeShare.premium.feature3.title')}</h3>
                <p className="text-sm text-gray-600">{t('resumeShare.premium.feature3.description')}</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/premium')}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto"
            >
              <Crown className="w-5 h-5" />
              {t('resumeShare.premium.upgradeButton')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to={`/resume/${id}`}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Share2 className="w-6 h-6 text-blue-600" />
                  {t('resumeShare.pageTitle')}
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">{resume.title}</p>
              </div>
            </div>
            
            {resume.isPubliclyShared && (
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">{t('resumeShare.sharingActive')}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Share Controls */}
          <div className="lg:col-span-1 space-y-6">
            <QuickSharePanel
              resumeId={resume.id}
              shareToken={resume.shareToken}
              isPubliclyShared={resume.isPubliclyShared || false}
              onSharingChanged={handleSharingChanged}
            />
          </div>

          {/* Right Column - Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {resume.isPubliclyShared ? (
              <>
                {/* Quick Stats */}
                <QuickStats 
                  analytics={analytics} 
                  loading={analyticsLoading} 
                />

                {/* Recent Viewers */}
                <RecentViewers 
                  shareToken={resume.shareToken || ''}
                  analytics={analytics}
                />

                {/* Charts */}
                <EngagementChart 
                  analytics={analytics}
                  loading={analyticsLoading}
                />

                {/* Geographic Map */}
                <GeoMap 
                  analytics={analytics}
                  loading={analyticsLoading}
                />
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('resumeShare.enableToSeeAnalytics.title')}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {t('resumeShare.enableToSeeAnalytics.description')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

