import { useTranslation } from 'react-i18next';
import { Globe, MapPin, Loader2 } from 'lucide-react';
import { AnalyticsSummary } from '@/services/resumeSharingService';

interface GeoMapProps {
  analytics: AnalyticsSummary | null;
  loading?: boolean;
}

// Country to rough coordinate mapping for visualization
const countryCoordinates: Record<string, { x: number; y: number }> = {
  'United States': { x: 25, y: 40 },
  'USA': { x: 25, y: 40 },
  'Canada': { x: 25, y: 30 },
  'Mexico': { x: 22, y: 48 },
  'Brazil': { x: 35, y: 65 },
  'Argentina': { x: 32, y: 75 },
  'United Kingdom': { x: 48, y: 32 },
  'UK': { x: 48, y: 32 },
  'Germany': { x: 52, y: 35 },
  'France': { x: 50, y: 38 },
  'Spain': { x: 47, y: 42 },
  'Italy': { x: 53, y: 42 },
  'Netherlands': { x: 51, y: 33 },
  'India': { x: 70, y: 48 },
  'China': { x: 78, y: 40 },
  'Japan': { x: 85, y: 38 },
  'Australia': { x: 82, y: 72 },
  'South Korea': { x: 82, y: 38 },
  'Singapore': { x: 78, y: 55 },
  'UAE': { x: 62, y: 48 },
  'Unknown': { x: 50, y: 50 },
};

function getCoordinates(country: string): { x: number; y: number } {
  return countryCoordinates[country] || { x: 50, y: 50 };
}

export function GeoMap({ analytics, loading }: GeoMapProps) {
  const { t } = useTranslation();

  const countries = analytics?.viewsByCountry 
    ? Object.entries(analytics.viewsByCountry).sort(([, a], [, b]) => b - a)
    : [];
  
  const totalViews = countries.reduce((sum, [, count]) => sum + count, 0) || 1;
  const maxCount = Math.max(...countries.map(([, count]) => count), 1);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Globe className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t('resumeShare.geoMap.noData.title')}
        </h3>
        <p className="text-gray-600 text-sm">
          {t('resumeShare.geoMap.noData.description')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <Globe className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{t('resumeShare.geoMap.title')}</h3>
            <p className="text-sm text-gray-500">{t('resumeShare.geoMap.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Visual Map */}
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 min-h-[250px]">
            {/* World map outline (simplified SVG) */}
            <svg
              viewBox="0 0 100 80"
              className="w-full h-full absolute inset-0 opacity-20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
            >
              {/* Simplified continent outlines */}
              <path d="M15,25 Q20,20 30,22 Q35,24 35,30 Q38,35 35,42 Q30,48 25,50 L18,45 Q12,38 15,25" className="text-gray-400" />
              <path d="M30,55 Q35,50 38,55 Q40,65 35,75 Q28,78 25,72 Q22,65 30,55" className="text-gray-400" />
              <path d="M45,28 Q55,26 60,30 Q65,35 58,42 Q52,45 45,40 Q42,35 45,28" className="text-gray-400" />
              <path d="M60,35 Q75,32 85,38 Q90,45 85,55 Q75,58 65,52 Q58,45 60,35" className="text-gray-400" />
              <path d="M75,62 Q85,58 90,65 Q88,75 80,78 Q72,76 75,62" className="text-gray-400" />
            </svg>

            {/* Location markers */}
            {countries.slice(0, 10).map(([country, count]) => {
              const coords = getCoordinates(country);
              const size = Math.max(12, Math.min(32, (count / maxCount) * 32));
              const percentage = ((count / totalViews) * 100).toFixed(0);
              
              return (
                <div
                  key={country}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                >
                  {/* Pulse animation */}
                  <div
                    className="absolute rounded-full bg-blue-400 opacity-30 animate-ping"
                    style={{ width: size, height: size }}
                  />
                  
                  {/* Marker */}
                  <div
                    className="relative rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                    style={{ width: size, height: size }}
                  >
                    <span className="text-white text-xs font-bold">
                      {count > 99 ? '99+' : count}
                    </span>
                  </div>

                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
                    <div className="font-semibold">{country}</div>
                    <div>{count} views ({percentage}%)</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Country List */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              {t('resumeShare.geoMap.topCountries')}
            </h4>
            <div className="space-y-3">
              {countries.slice(0, 8).map(([country, count], index) => {
                const percentage = (count / totalViews) * 100;
                
                return (
                  <div key={country} className="flex items-center gap-3">
                    <span className="w-6 text-sm text-gray-400 font-medium">
                      #{index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{country}</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {count} ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
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

