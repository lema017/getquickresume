import { useTranslation } from 'react-i18next';
import { Heart, Users, Target, Zap } from 'lucide-react';

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('about.mission')}
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('about.ourMission')}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('about.missionDescription')}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('about.values.accessibility.title')}
            </h3>
            <p className="text-gray-600">
              {t('about.values.accessibility.description')}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('about.values.precision.title')}
            </h3>
            <p className="text-gray-600">
              {t('about.values.precision.description')}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('about.values.efficiency.title')}
            </h3>
            <p className="text-gray-600">
              {t('about.values.efficiency.description')}
            </p>
          </div>
        </div>

        {/* Story */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t('about.story.title')}
          </h2>
          <div className="prose max-w-none">
            {(t('about.story.paragraphs', { returnObjects: true }) as unknown as string[]).map((paragraph, index) => (
              <p key={index} className="text-gray-600 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-primary rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-8">
            {t('about.impact.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-primary-100">{t('about.impact.stats.cvsCreated')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-primary-100">{t('about.impact.stats.satisfactionRate')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-100">{t('about.impact.stats.countriesServed')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
