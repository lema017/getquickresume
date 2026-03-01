import { X, Globe, Target, Sparkles, Share2, RefreshCw, Zap, Clock, Check, TrendingUp, BarChart3, QrCode, Eye, MapPin, FileText, Award, ArrowRight, Crown, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface PremiumActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: 'enhance' | 'rescore' | 'edit' | 'aiSuggestions' | 'regenerate' | 'createResume' | 'translate' | 'tailorForJob' | 'share' | 'resumeLimit' | 'coverLetter';
}

// Feature-specific configurations
const featureConfigs = {
  translate: {
    icon: Globe,
    colors: {
      bg: 'bg-green-50',
      bgGradient: 'from-green-500 to-emerald-600',
      accent: 'text-green-600',
      border: 'border-green-200',
      iconBg: 'bg-green-100',
      button: 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700',
    },
    languages: ['🇺🇸 English', '🇪🇸 Spanish', '🇫🇷 French', '🇩🇪 German', '🇵🇹 Portuguese', '🇮🇹 Italian', '🇨🇳 Chinese', '🇯🇵 Japanese', '🇰🇷 Korean', '🇸🇦 Arabic', '🇮🇳 Hindi', '50+ more'],
  },
  tailorForJob: {
    icon: Target,
    colors: {
      bg: 'bg-orange-50',
      bgGradient: 'from-orange-500 to-amber-600',
      accent: 'text-orange-600',
      border: 'border-orange-200',
      iconBg: 'bg-orange-100',
      button: 'from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700',
    },
  },
  enhance: {
    icon: Sparkles,
    colors: {
      bg: 'bg-purple-50',
      bgGradient: 'from-purple-500 to-violet-600',
      accent: 'text-purple-600',
      border: 'border-purple-200',
      iconBg: 'bg-purple-100',
      button: 'from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700',
    },
  },
  share: {
    icon: Share2,
    colors: {
      bg: 'bg-blue-50',
      bgGradient: 'from-blue-500 to-indigo-600',
      accent: 'text-blue-600',
      border: 'border-blue-200',
      iconBg: 'bg-blue-100',
      button: 'from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700',
    },
  },
  rescore: {
    icon: RefreshCw,
    colors: {
      bg: 'bg-indigo-50',
      bgGradient: 'from-indigo-500 to-blue-600',
      accent: 'text-indigo-600',
      border: 'border-indigo-200',
      iconBg: 'bg-indigo-100',
      button: 'from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700',
    },
  },
  resumeLimit: {
    icon: Crown,
    colors: {
      bg: 'bg-amber-50',
      bgGradient: 'from-amber-500 to-orange-600',
      accent: 'text-amber-600',
      border: 'border-amber-200',
      iconBg: 'bg-amber-100',
      button: 'from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700',
    },
  },
  coverLetter: {
    icon: FileText,
    colors: {
      bg: 'bg-violet-50',
      bgGradient: 'from-violet-500 to-purple-600',
      accent: 'text-violet-600',
      border: 'border-violet-200',
      iconBg: 'bg-violet-100',
      button: 'from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700',
    },
  },
  // Fallback for other features
  default: {
    icon: Sparkles,
    colors: {
      bg: 'bg-amber-50',
      bgGradient: 'from-amber-500 to-orange-600',
      accent: 'text-amber-600',
      border: 'border-amber-200',
      iconBg: 'bg-amber-100',
      button: 'from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700',
    },
  },
};

export function PremiumActionModal({
  isOpen,
  onClose,
  feature,
}: PremiumActionModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleUpgrade = () => {
    onClose();
    navigate('/premium');
  };

  // Get feature config or fallback to default
  const config = featureConfigs[feature as keyof typeof featureConfigs] || featureConfigs.default;
  const Icon = config.icon;
  const { colors } = config;

  // Render feature-specific content
  const renderFeatureContent = () => {
    switch (feature) {
      case 'translate':
        return <TranslateModalContent colors={colors} languages={featureConfigs.translate.languages} t={t} />;
      case 'tailorForJob':
        return <TailorModalContent colors={colors} t={t} />;
      case 'enhance':
        return <EnhanceModalContent colors={colors} t={t} />;
      case 'share':
        return <ShareModalContent colors={colors} t={t} />;
      case 'rescore':
        return <RescoreModalContent colors={colors} t={t} />;
      case 'resumeLimit':
        return <ResumeLimitModalContent colors={colors} t={t} />;
      case 'coverLetter':
        return <CoverLetterModalContent colors={colors} t={t} />;
      default:
        return <DefaultModalContent feature={feature} colors={colors} t={t} />;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={`bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border-t-4 ${colors.border.replace('border-', 'border-t-').replace('-200', '-500')}`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 z-10"
          aria-label={t('common.close')}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Feature Content */}
        {renderFeatureContent()}

        {/* CTA Section */}
        <div className="px-6 pb-6 pt-2">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
            >
              {t('premiumModal.maybeLater')}
            </button>
            <button
              onClick={handleUpgrade}
              className={`flex-1 px-4 py-3 bg-gradient-to-r ${colors.button} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2`}
            >
              {t(`premiumModal.${feature}.cta`)}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Translate Modal Content
function TranslateModalContent({ colors, languages, t }: { colors: typeof featureConfigs.default.colors; languages: string[]; t: any }) {
  return (
    <div className="p-6">
      {/* Hero */}
      <div className={`${colors.bg} rounded-2xl p-6 mb-6`}>
        <div className="text-center mb-4">
          <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.iconBg} rounded-2xl mb-4`}>
            <Globe className={`w-8 h-8 ${colors.accent}`} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('premiumModal.translate.headline')}
          </h2>
          <p className="text-gray-600">
            {t('premiumModal.translate.subheadline')}
          </p>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {languages.slice(0, 12).map((lang, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur rounded-lg px-2 py-1.5 text-xs font-medium text-gray-700 text-center shadow-sm"
            >
              {lang}
            </div>
          ))}
        </div>
      </div>

      {/* Value Props */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <Zap className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.translate.speed')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.translate.speedDesc')}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <Award className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.translate.quality')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.translate.qualityDesc')}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <FileText className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.translate.format')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.translate.formatDesc')}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <Check className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.translate.unlimited')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.translate.unlimitedDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tailor for Job Modal Content
function TailorModalContent({ colors, t }: { colors: typeof featureConfigs.default.colors; t: any }) {
  return (
    <div className="p-6">
      {/* Hero */}
      <div className={`${colors.bg} rounded-2xl p-6 mb-6`}>
        <div className="text-center mb-4">
          <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.iconBg} rounded-2xl mb-4`}>
            <Target className={`w-8 h-8 ${colors.accent}`} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('premiumModal.tailorForJob.headline')}
          </h2>
          <p className="text-gray-600">
            {t('premiumModal.tailorForJob.subheadline')}
          </p>
        </div>

        {/* Match Score Visualization */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-400">65%</div>
            <div className="text-xs text-gray-500">{t('premiumModal.tailorForJob.before')}</div>
          </div>
          <div className="flex items-center">
            <ArrowRight className={`w-8 h-8 ${colors.accent}`} />
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold ${colors.accent}`}>95%</div>
            <div className="text-xs text-gray-500">{t('premiumModal.tailorForJob.after')}</div>
          </div>
        </div>
      </div>

      {/* Value Props */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <Zap className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.tailorForJob.instant')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.tailorForJob.instantDesc')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <TrendingUp className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.tailorForJob.ats')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.tailorForJob.atsDesc')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <Check className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.tailorForJob.interviews')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.tailorForJob.interviewsDesc')}</p>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className={`${colors.bg} rounded-xl p-3 text-center`}>
        <p className={`text-sm font-semibold ${colors.accent}`}>
          {t('premiumModal.tailorForJob.socialProof')}
        </p>
      </div>
    </div>
  );
}

// AI Enhance Modal Content
function EnhanceModalContent({ colors, t }: { colors: typeof featureConfigs.default.colors; t: any }) {
  return (
    <div className="p-6">
      {/* Hero */}
      <div className={`${colors.bg} rounded-2xl p-6 mb-6`}>
        <div className="text-center mb-4">
          <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.iconBg} rounded-2xl mb-4`}>
            <Sparkles className={`w-8 h-8 ${colors.accent}`} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('premiumModal.enhance.headline')}
          </h2>
          <p className="text-gray-600">
            {t('premiumModal.enhance.subheadline')}
          </p>
        </div>

        {/* Before/After Preview */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white/60 rounded-lg p-3">
            <div className="text-xs font-medium text-gray-400 mb-2">{t('premiumModal.enhance.before')}</div>
            <p className="text-xs text-gray-500 line-through">{t('premiumModal.enhance.beforeText')}</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border border-green-200">
            <div className="text-xs font-medium text-green-600 mb-2">{t('premiumModal.enhance.after')}</div>
            <p className="text-xs text-gray-700">{t('premiumModal.enhance.afterText')}</p>
          </div>
        </div>
      </div>

      {/* Value Props */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <TrendingUp className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.enhance.ats')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.enhance.atsDesc')}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <Sparkles className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.enhance.rewrite')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.enhance.rewriteDesc')}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <FileText className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.enhance.sections')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.enhance.sectionsDesc')}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <Zap className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.enhance.keywords')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.enhance.keywordsDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Share Modal Content
function ShareModalContent({ colors, t }: { colors: typeof featureConfigs.default.colors; t: any }) {
  return (
    <div className="p-6">
      {/* Hero */}
      <div className={`${colors.bg} rounded-2xl p-6 mb-6`}>
        <div className="text-center mb-4">
          <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.iconBg} rounded-2xl mb-4`}>
            <Share2 className={`w-8 h-8 ${colors.accent}`} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('premiumModal.share.headline')}
          </h2>
          <p className="text-gray-600">
            {t('premiumModal.share.subheadline')}
          </p>
        </div>

        {/* Analytics Preview */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">{t('premiumModal.share.viewsToday')}</span>
            <span className={`text-lg font-bold ${colors.accent}`}>24</span>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              <span>NYC, London, Berlin</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Eye className="w-3 h-3" />
              <span>Mobile & Desktop</span>
            </div>
          </div>
        </div>
      </div>

      {/* Value Props */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <BarChart3 className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.share.realtime')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.share.realtimeDesc')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <QrCode className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.share.qrcode')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.share.qrcodeDesc')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <MapPin className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.share.location')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.share.locationDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Rescore Modal Content
function RescoreModalContent({ colors, t }: { colors: typeof featureConfigs.default.colors; t: any }) {
  return (
    <div className="p-6">
      {/* Hero */}
      <div className={`${colors.bg} rounded-2xl p-6 mb-6`}>
        <div className="text-center mb-4">
          <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.iconBg} rounded-2xl mb-4`}>
            <RefreshCw className={`w-8 h-8 ${colors.accent}`} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('premiumModal.rescore.headline')}
          </h2>
          <p className="text-gray-600">
            {t('premiumModal.rescore.subheadline')}
          </p>
        </div>

        {/* Score Gauge Visualization */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="text-center">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="36" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle cx="40" cy="40" r="36" fill="none" stroke="#9ca3af" strokeWidth="8" strokeDasharray="226" strokeDashoffset="80" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-400">6.5</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">{t('premiumModal.rescore.current')}</div>
          </div>
          <ArrowRight className={`w-6 h-6 ${colors.accent}`} />
          <div className="text-center">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="36" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle cx="40" cy="40" r="36" fill="none" stroke="#6366f1" strokeWidth="8" strokeDasharray="226" strokeDashoffset="20" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-xl font-bold ${colors.accent}`}>9.2</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">{t('premiumModal.rescore.potential')}</div>
          </div>
        </div>
      </div>

      {/* Value Props */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <BarChart3 className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.rescore.detailed')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.rescore.detailedDesc')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <FileText className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.rescore.breakdown')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.rescore.breakdownDesc')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <RefreshCw className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.rescore.unlimited')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.rescore.unlimitedDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Resume Limit Modal Content
function ResumeLimitModalContent({ colors, t }: { colors: typeof featureConfigs.default.colors; t: any }) {
  return (
    <div className="p-6">
      <div className={`${colors.bg} rounded-2xl p-6 mb-6 text-center`}>
        <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.iconBg} rounded-2xl mb-4`}>
          <Crown className={`w-8 h-8 ${colors.accent}`} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('premiumModal.resumeLimit.headline')}
        </h2>
        <p className="text-gray-600">
          {t('premiumModal.resumeLimit.subheadline')}
        </p>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <FileText className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.resumeLimit.unlimitedResumes')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.resumeLimit.unlimitedResumesDesc')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <Sparkles className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.resumeLimit.aiFeatures')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.resumeLimit.aiFeaturesDesc')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <Lock className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.resumeLimit.cloudSave')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.resumeLimit.cloudSaveDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Cover Letter Modal Content
function CoverLetterModalContent({ colors, t }: { colors: typeof featureConfigs.default.colors; t: any }) {
  return (
    <div className="p-6">
      <div className={`${colors.bg} rounded-2xl p-6 mb-6 text-center`}>
        <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.iconBg} rounded-2xl mb-4`}>
          <FileText className={`w-8 h-8 ${colors.accent}`} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('premiumModal.coverLetter.headline')}
        </h2>
        <p className="text-gray-600">
          {t('premiumModal.coverLetter.subheadline')}
        </p>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <Sparkles className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.coverLetter.aiPowered')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.coverLetter.aiPoweredDesc')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <Target className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.coverLetter.tailored')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.coverLetter.tailoredDesc')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <div className={`${colors.iconBg} p-2 rounded-lg`}>
            <Zap className={`w-4 h-4 ${colors.accent}`} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{t('premiumModal.coverLetter.monthly')}</p>
            <p className="text-xs text-gray-500">{t('premiumModal.coverLetter.monthlyDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Default Modal Content (for other features)
function DefaultModalContent({ feature, colors, t }: { feature: string; colors: typeof featureConfigs.default.colors; t: any }) {
  return (
    <div className="p-6">
      {/* Hero */}
      <div className={`${colors.bg} rounded-2xl p-6 mb-6 text-center`}>
        <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.iconBg} rounded-2xl mb-4`}>
          <Sparkles className={`w-8 h-8 ${colors.accent}`} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t(`dashboard.premiumAction.${feature}.title`)}
        </h2>
        <p className="text-gray-600">
          {t(`dashboard.premiumAction.${feature}.description`)}
        </p>
      </div>

      {/* Generic benefits */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <Check className={`w-5 h-5 ${colors.accent}`} />
          <span className="text-sm text-gray-700">{t('premiumModal.default.benefit1')}</span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <Check className={`w-5 h-5 ${colors.accent}`} />
          <span className="text-sm text-gray-700">{t('premiumModal.default.benefit2')}</span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <Check className={`w-5 h-5 ${colors.accent}`} />
          <span className="text-sm text-gray-700">{t('premiumModal.default.benefit3')}</span>
        </div>
      </div>
    </div>
  );
}
