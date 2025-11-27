import { Achievement } from '@/types';
import { useTranslation } from 'react-i18next';
import { Trophy } from 'lucide-react';

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  const { t } = useTranslation();

  if (!achievements || achievements.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Trophy className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">
          {t('resumeView.sections.achievements')}
        </h2>
      </div>
      
      <div className="space-y-2">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="flex items-start">
            <Trophy className="w-4 h-4 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{achievement.title}</h3>
              {achievement.description && (
                <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
              )}
              {achievement.date && (
                <p className="text-sm text-gray-500 mt-1">{achievement.date}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

