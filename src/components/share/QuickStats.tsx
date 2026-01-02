import { useTranslation } from 'react-i18next';
import { Eye, Users, TrendingUp, Clock, Loader2 } from 'lucide-react';
import { AnalyticsSummary } from '@/services/resumeSharingService';

interface QuickStatsProps {
  analytics: AnalyticsSummary | null;
  loading?: boolean;
}

export function QuickStats({ analytics, loading }: QuickStatsProps) {
  const { t } = useTranslation();

  // Calculate this week's views
  const getThisWeekViews = () => {
    if (!analytics?.viewsOverTime) return 0;
    
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return analytics.viewsOverTime
      .filter(v => new Date(v.date) >= weekAgo)
      .reduce((sum, v) => sum + v.count, 0);
  };

  const stats = [
    {
      label: t('resumeShare.stats.totalViews'),
      value: analytics?.totalViews || 0,
      icon: Eye,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      valueColor: 'text-blue-700',
    },
    {
      label: t('resumeShare.stats.uniqueVisitors'),
      value: analytics?.uniqueViews || 0,
      icon: Users,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      valueColor: 'text-green-700',
    },
    {
      label: t('resumeShare.stats.thisWeek'),
      value: getThisWeekViews(),
      icon: TrendingUp,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      valueColor: 'text-purple-700',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-center h-20">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
          <p className={`text-3xl font-bold ${stat.valueColor} mb-1`}>
            {stat.value.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

