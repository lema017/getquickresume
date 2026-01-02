import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Clock, 
  MapPin,
  Loader2,
  Eye,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { resumeSharingService, RecentViewer, AnalyticsSummary } from '@/services/resumeSharingService';

interface RecentViewersProps {
  shareToken: string;
  analytics: AnalyticsSummary | null;
}

function getDeviceIcon(device: string) {
  switch (device) {
    case 'mobile':
      return Smartphone;
    case 'tablet':
      return Tablet;
    case 'desktop':
    default:
      return Monitor;
  }
}

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
}

export function RecentViewers({ shareToken, analytics }: RecentViewersProps) {
  const { t } = useTranslation();
  const [viewers, setViewers] = useState<RecentViewer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchViewers = useCallback(async () => {
    if (!shareToken) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await resumeSharingService.getPublicRecentViewers(shareToken, 10);
      if (response.success && response.data) {
        setViewers(response.data);
      } else {
        setError(response.error || 'Failed to load viewers');
      }
    } catch (err) {
      console.error('[RecentViewers] Error fetching viewers:', err);
      if (err instanceof Error) {
        // Check if it's a rate limit error
        if (err.message.includes('Rate limit')) {
          setError(t('resumeShare.viewers.rateLimitError'));
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to load viewers');
      }
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, [shareToken, t]);

  useEffect(() => {
    fetchViewers();
  }, [fetchViewers]);

  const handleRefresh = () => {
    fetchViewers();
  };

  // No shareToken - show placeholder
  if (!shareToken) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t('resumeShare.viewers.noViewers.title')}
        </h3>
        <p className="text-gray-600 text-sm">
          {t('resumeShare.viewers.noViewers.description')}
        </p>
      </div>
    );
  }

  // No views yet
  if (!initialLoad && !loading && viewers.length === 0 && !error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t('resumeShare.viewers.noViewers.title')}
        </h3>
        <p className="text-gray-600 text-sm">
          {t('resumeShare.viewers.noViewers.description')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{t('resumeShare.viewers.title')}</h3>
              <p className="text-sm text-gray-500">{t('resumeShare.viewers.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            title={t('common.refresh')}
          >
            <RefreshCw className={`w-5 h-5 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border-b border-red-100">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Viewers List */}
      <div className="divide-y divide-gray-100">
        {initialLoad || loading ? (
          <div className="p-8 flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : (
          viewers.slice(0, 5).map((viewer) => {
            const DeviceIcon = getDeviceIcon(viewer.device);
            return (
              <div
                key={viewer.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-medium">
                    <User className="w-5 h-5" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {viewer.city !== 'Unknown' ? `${viewer.city}, ` : ''}{viewer.country}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <DeviceIcon className="w-3.5 h-3.5" />
                        {viewer.browser}
                      </span>
                      {viewer.os && viewer.os !== 'Unknown' && (
                        <span className="text-gray-400">
                          {viewer.os}
                        </span>
                      )}
                      {viewer.referrer && (
                        <span className="flex items-center gap-1 text-gray-400">
                          <Clock className="w-3.5 h-3.5" />
                          via {viewer.referrer}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Time */}
                  <div className="text-xs text-gray-400 whitespace-nowrap">
                    {getTimeAgo(viewer.viewedAt)}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* View All */}
      {viewers.length > 5 && (
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <button className="w-full text-center text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
            {t('resumeShare.viewers.viewAll', { count: viewers.length })}
          </button>
        </div>
      )}
    </div>
  );
}
