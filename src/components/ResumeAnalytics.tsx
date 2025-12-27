import { useTranslation } from 'react-i18next';
import { BarChart3, Eye, Users, Monitor, Smartphone, Tablet, Globe } from 'lucide-react';
import { AnalyticsSummary } from '@/services/resumeSharingService';

interface ResumeAnalyticsProps {
  analytics: AnalyticsSummary;
}

export function ResumeAnalytics({ analytics }: ResumeAnalyticsProps) {
  const { t } = useTranslation();

  const topBrowser = Object.entries(analytics.viewsByBrowser)
    .sort(([, a], [, b]) => b - a)[0];

  const topCountry = Object.entries(analytics.viewsByCountry)
    .sort(([, a], [, b]) => b - a)[0];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">
              {t('resumeSharing.analytics.totalViews')}
            </h4>
          </div>
          <p className="text-2xl font-bold text-blue-600">{analytics.totalViews}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-gray-900">
              {t('resumeSharing.analytics.uniqueViews')}
            </h4>
          </div>
          <p className="text-2xl font-bold text-green-600">{analytics.uniqueViews}</p>
        </div>
      </div>

      {/* Device Breakdown */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Monitor className="w-5 h-5 text-gray-600" />
          {t('resumeSharing.analytics.devices')}
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <Smartphone className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{analytics.viewsByDevice.mobile}</p>
            <p className="text-sm text-gray-600">{t('resumeSharing.analytics.mobile')}</p>
          </div>
          <div className="text-center">
            <Monitor className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{analytics.viewsByDevice.desktop}</p>
            <p className="text-sm text-gray-600">{t('resumeSharing.analytics.desktop')}</p>
          </div>
          <div className="text-center">
            <Tablet className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{analytics.viewsByDevice.tablet}</p>
            <p className="text-sm text-gray-600">{t('resumeSharing.analytics.tablet')}</p>
          </div>
        </div>
      </div>

      {/* Browser Breakdown */}
      {Object.keys(analytics.viewsByBrowser).length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-4">
            {t('resumeSharing.analytics.browsers')}
          </h4>
          <div className="space-y-2">
            {Object.entries(analytics.viewsByBrowser)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([browser, count]) => (
                <div key={browser} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{browser}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(count / analytics.totalViews) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Geographic Breakdown */}
      {Object.keys(analytics.viewsByCountry).length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-600" />
            {t('resumeSharing.analytics.locations')}
          </h4>
          <div className="space-y-2">
            {Object.entries(analytics.viewsByCountry)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([country, count]) => (
                <div key={country} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{country}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${(count / analytics.totalViews) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Views Over Time */}
      {analytics.viewsOverTime.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-4">
            {t('resumeSharing.analytics.viewsOverTime')}
          </h4>
          <div className="space-y-2">
            {analytics.viewsOverTime.slice(-7).map(({ date, count }) => (
              <div key={date} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  {new Date(date).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${(count / Math.max(...analytics.viewsOverTime.map(v => v.count))) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-8 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

