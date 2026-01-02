import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  BarChart3, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Loader2,
  TrendingUp
} from 'lucide-react';
import { AnalyticsSummary } from '@/services/resumeSharingService';

interface EngagementChartProps {
  analytics: AnalyticsSummary | null;
  loading?: boolean;
}

type TimeRange = '7d' | '30d' | '90d';

export function EngagementChart({ analytics, loading }: EngagementChartProps) {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  // Get views data based on time range
  const getViewsData = () => {
    if (!analytics?.viewsOverTime) return [];
    
    const now = new Date();
    let daysBack = 7;
    
    switch (timeRange) {
      case '30d':
        daysBack = 30;
        break;
      case '90d':
        daysBack = 90;
        break;
      default:
        daysBack = 7;
    }

    const cutoffDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
    
    return analytics.viewsOverTime
      .filter(v => new Date(v.date) >= cutoffDate)
      .slice(-daysBack);
  };

  const viewsData = getViewsData();
  const maxViews = Math.max(...viewsData.map(v => v.count), 1);

  // Device distribution
  const deviceData = analytics?.viewsByDevice || { desktop: 0, mobile: 0, tablet: 0, unknown: 0 };
  const totalDeviceViews = Object.values(deviceData).reduce((a, b) => a + b, 0) || 1;

  const devices = [
    { key: 'desktop', icon: Monitor, label: t('resumeShare.charts.desktop'), count: deviceData.desktop },
    { key: 'mobile', icon: Smartphone, label: t('resumeShare.charts.mobile'), count: deviceData.mobile },
    { key: 'tablet', icon: Tablet, label: t('resumeShare.charts.tablet'), count: deviceData.tablet },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{t('resumeShare.charts.title')}</h3>
              <p className="text-sm text-gray-500">{t('resumeShare.charts.subtitle')}</p>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {(['7d', '30d', '90d'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  timeRange === range
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {range === '7d' ? '7 days' : range === '30d' ? '30 days' : '90 days'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Views Over Time Chart */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {t('resumeShare.charts.viewsOverTime')}
            </h4>
            
            {viewsData.length > 0 ? (
              <div className="h-48 flex items-end gap-1">
                {viewsData.map((data, index) => {
                  const height = (data.count / maxViews) * 100;
                  const date = new Date(data.date);
                  const isToday = date.toDateString() === new Date().toDateString();
                  
                  return (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center group"
                    >
                      {/* Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                        {data.count} views
                        <br />
                        {date.toLocaleDateString()}
                      </div>
                      
                      {/* Bar */}
                      <div
                        className={`w-full rounded-t-md transition-all ${
                          isToday ? 'bg-blue-500' : 'bg-blue-200 group-hover:bg-blue-400'
                        }`}
                        style={{ height: `${Math.max(height, 4)}%` }}
                      />
                      
                      {/* Date label (show for some bars) */}
                      {(index === 0 || index === viewsData.length - 1 || index % Math.floor(viewsData.length / 4) === 0) && (
                        <span className="text-xs text-gray-400 mt-2 truncate w-full text-center">
                          {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-gray-400">
                {t('resumeShare.charts.noData')}
              </div>
            )}
          </div>

          {/* Device Distribution */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              {t('resumeShare.charts.deviceBreakdown')}
            </h4>
            
            <div className="space-y-4">
              {devices.map(({ key, icon: Icon, label, count }) => {
                const percentage = (count / totalDeviceViews) * 100;
                
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{label}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {count} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          key === 'desktop' ? 'bg-blue-500' :
                          key === 'mobile' ? 'bg-green-500' : 'bg-purple-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

