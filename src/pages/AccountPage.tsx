import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { useDashboardStore } from '@/stores/dashboardStore';
import { 
  Crown, 
  FileText, 
  Download, 
  LogOut, 
  Globe, 
  Briefcase,
  Mail,
  ExternalLink,
  LayoutDashboard,
  HelpCircle,
  Calendar,
  User,
  ChevronRight,
  Sparkles,
  Target,
  FileEdit
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Avatar } from '@/components/Avatar';
import { formatName } from '@/utils/textFormatting';
import { jobTailoringService } from '@/services/jobTailoringService';
import { TailoringLimits } from '@/types/jobTailoring';

// Progress bar component
function ProgressBar({ used, total, unlimited = false }: { used: number; total: number; unlimited?: boolean }) {
  const percentage = unlimited ? 0 : Math.min((used / total) * 100, 100);
  
  return (
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-500 ${
          unlimited 
            ? 'bg-gradient-to-r from-amber-400 to-yellow-300 w-full' 
            : percentage >= 100 
              ? 'bg-red-500' 
              : percentage >= 80 
                ? 'bg-amber-500' 
                : 'bg-gradient-to-r from-primary to-primary-light'
        }`}
        style={{ width: unlimited ? '100%' : `${percentage}%` }}
      />
    </div>
  );
}

// Usage stat card component
function UsageCard({ 
  icon: Icon, 
  title, 
  description, 
  used, 
  limit, 
  unlimited = false,
  isPremium = false,
  t 
}: { 
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  used: number;
  limit: number;
  unlimited?: boolean;
  isPremium?: boolean;
  t: (key: string) => string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-gray-900">{used}</span>
          <span className="text-gray-500 text-sm">
            {unlimited ? (
              <span className="ml-1">/ ∞</span>
            ) : (
              <span className="ml-1">/ {limit}</span>
            )}
          </span>
        </div>
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-3">{description}</p>
      <ProgressBar used={used} total={limit} unlimited={unlimited} />
      <p className="text-xs text-gray-400 mt-2">
        {unlimited 
          ? t('account.usage.unlimited') 
          : isPremium 
            ? t('account.usage.premiumLimit')
            : t('account.usage.freeLimit')}
      </p>
    </div>
  );
}

// Quick action button component
function QuickAction({ 
  icon: Icon, 
  title, 
  description, 
  to, 
  external = false,
  onClick,
  badge,
  disabled = false
}: { 
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  to?: string;
  external?: boolean;
  onClick?: () => void;
  badge?: string;
  disabled?: boolean;
}) {
  const content = (
    <>
      <div className="flex items-center gap-3 flex-1">
        <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-primary/10 transition-colors">
          <Icon className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{title}</span>
            {badge && (
              <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-amber-100 text-amber-700">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="group flex items-center w-full p-3 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {content}
      </button>
    );
  }

  // Handle disabled state for non-button actions
  if (disabled) {
    return (
      <div className="group flex items-center w-full p-3 rounded-lg opacity-50 cursor-not-allowed">
        {content}
      </div>
    );
  }

  if (external && to) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      to={to || '#'}
      className="group flex items-center w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
    >
      {content}
    </Link>
  );
}

export function AccountPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { resumes, loadResumes } = useDashboardStore();
  const [tailoringLimits, setTailoringLimits] = useState<TailoringLimits | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      if (user) {
        try {
          setIsLoading(true);
          await loadResumes();
          const limits = await jobTailoringService.getTailoringLimits();
          setTailoringLimits(limits);
        } catch (error) {
          console.error('Error loading account data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadData();
  }, [user?.id, loadResumes]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const handleSignOut = () => {
    if (window.confirm(t('account.dangerZone.signOutConfirm'))) {
      logout();
      navigate('/');
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return t('account.profile.notSpecified');
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString(i18n.language === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-gray-500">{t('account.loading')}</div>
      </div>
    );
  }

  // Calculate usage stats
  // Note: isTailored may exist on resumes returned from API with tailoring metadata
  const totalResumes = resumes.filter(r => !(r as any).isTailored).length;
  const tailoredResumes = resumes.filter(r => (r as any).isTailored).length;
  const hasResumes = totalResumes > 0;
  const coverLettersUsed = user.isPremium 
    ? (user.premiumCoverLetterCount || 0) 
    : (user.freeCoverLetterUsed ? 1 : 0);
  const totalDownloads = user.totalDownloads || 0;

  // Subscription info
  const getPlanName = () => {
    if (!user.isPremium) return t('account.subscription.free');
    return user.planType === 'yearly' 
      ? t('account.subscription.premiumYearly') 
      : t('account.subscription.premiumMonthly');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8 relative overflow-hidden">
          {/* Premium gradient accent */}
          {user.isPremium && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
          )}
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar with gradient border for premium */}
            <div className={`relative ${user.isPremium ? 'p-1 bg-gradient-to-br from-amber-400 to-yellow-300 rounded-full' : ''}`}>
              <Avatar
                src={user.avatarUrl}
                alt={user.fullName || 'User avatar'}
                size="xl"
                className={user.isPremium ? 'border-4 border-white' : ''}
              />
              {user.isPremium && (
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full p-1.5 shadow-lg">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            
            {/* User info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {user.firstName && user.lastName 
                  ? formatName(`${user.firstName} ${user.lastName}`)
                  : formatName(user.fullName || 'User')
                }
              </h1>
              <p className="text-gray-600 mb-3">{user.email}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                {/* Plan badge */}
                {user.isPremium ? (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200">
                    <Crown className="w-4 h-4 mr-1.5" />
                    {getPlanName()}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
                    {t('account.profile.free')}
                  </span>
                )}
                
                {/* Member since */}
                <span className="inline-flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  {t('account.profile.memberSince')} {formatDate(user.createdAt)}
                </span>
              </div>
            </div>
            
            {/* Premium CTA for free users */}
            {!user.isPremium && (
              <Link
                to="/premium"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary/25 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                {t('account.subscription.upgradeToPremium')}
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Usage Statistics */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                {t('account.usage.title')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UsageCard
                  icon={FileText}
                  title={t('account.usage.resumes')}
                  description={t('account.usage.resumesDescription')}
                  used={totalResumes}
                  limit={user.isPremium ? 999 : 1}
                  unlimited={user.isPremium}
                  isPremium={user.isPremium}
                  t={t}
                />
                <UsageCard
                  icon={Mail}
                  title={t('account.usage.coverLetters')}
                  description={t('account.usage.coverLettersDescription')}
                  used={coverLettersUsed}
                  limit={user.isPremium ? 40 : 1}
                  unlimited={false}
                  isPremium={user.isPremium}
                  t={t}
                />
                <UsageCard
                  icon={Briefcase}
                  title={t('account.usage.jobTailoring')}
                  description={t('account.usage.jobTailoringDescription')}
                  used={tailoringLimits?.used || tailoredResumes}
                  limit={tailoringLimits?.limit || (user.isPremium ? 40 : 1)}
                  unlimited={false}
                  isPremium={user.isPremium}
                  t={t}
                />
                <UsageCard
                  icon={Download}
                  title={t('account.usage.downloads')}
                  description={t('account.usage.downloadsDescription')}
                  used={totalDownloads}
                  limit={user.isPremium ? 999 : 1}
                  unlimited={user.isPremium}
                  isPremium={user.isPremium}
                  t={t}
                />
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {t('account.details.title')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-gray-500">{t('account.details.email')}</label>
                  <p className="text-gray-900 font-medium">{user.email}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-500">{t('account.details.provider')}</label>
                  <p className="text-gray-900 font-medium capitalize">{user.provider}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-500">{t('account.details.memberSince')}</label>
                  <p className="text-gray-900 font-medium">{formatDate(user.createdAt)}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-500">{t('account.details.accountId')}</label>
                  <p className="text-gray-600 font-mono text-sm">{user.id.slice(0, 8)}...{user.id.slice(-4)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('account.actions.title')}
              </h3>
              <div className="space-y-1">
                <QuickAction
                  icon={FileEdit}
                  title={t('account.actions.createResume')}
                  description={t('account.actions.createResumeDescription')}
                  to="/wizard/step-1"
                />
                <QuickAction
                  icon={Mail}
                  title={t('account.actions.createCoverLetter')}
                  description={t('account.actions.createCoverLetterDescription')}
                  to="/cover-letter"
                  badge={!user.isPremium ? 'Premium' : undefined}
                  disabled={!hasResumes}
                />
                <QuickAction
                  icon={Briefcase}
                  title={t('account.actions.tailorForJob')}
                  description={t('account.actions.tailorForJobDescription')}
                  to="/job-tailoring"
                  disabled={!hasResumes}
                />
                <QuickAction
                  icon={LayoutDashboard}
                  title={t('account.actions.viewDashboard')}
                  description={t('account.actions.viewDashboardDescription')}
                  to="/dashboard"
                />
                <hr className="my-2 border-gray-100" />
                <QuickAction
                  icon={Globe}
                  title={t('account.actions.changeLanguage')}
                  description={i18n.language === 'es' ? 'English' : 'Español'}
                  onClick={toggleLanguage}
                />
                <QuickAction
                  icon={HelpCircle}
                  title={t('account.actions.contactSupport')}
                  description={t('account.actions.contactSupportDescription')}
                  to="/contact"
                />
              </div>
            </div>

            {/* Subscription Details (Premium Only) */}
            {user.isPremium && (
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200 p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-500" />
                  {t('account.subscription.title')}
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">{t('account.subscription.currentPlan')}</label>
                    <p className="text-gray-900 font-semibold">{getPlanName()}</p>
                  </div>
                  {user.subscriptionStartDate && (
                    <div>
                      <label className="text-sm text-gray-600">{t('account.subscription.startedOn')}</label>
                      <p className="text-gray-900 font-medium">{formatDate(user.subscriptionStartDate)}</p>
                    </div>
                  )}
                  {user.subscriptionExpiration && (
                    <div>
                      <label className="text-sm text-gray-600">{t('account.subscription.renewsOn')}</label>
                      <p className="text-gray-900 font-medium">{formatDate(user.subscriptionExpiration)}</p>
                    </div>
                  )}
                  <a
                    href="https://customer-portal.paddle.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white border border-amber-300 rounded-lg text-amber-700 font-medium hover:bg-amber-50 transition-colors mt-2"
                  >
                    {t('account.subscription.manageSubscription')}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="text-xs text-gray-500 text-center">
                    {t('account.subscription.cancelInfo')}
                  </p>
                </div>
              </div>
            )}

            {/* Upgrade CTA for Free Users */}
            {!user.isPremium && (
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-5">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('account.subscription.upgradeToPremium')}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t('account.subscription.upgradeDescription')}
                  </p>
                  <Link
                    to="/premium"
                    className="block w-full px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                  >
                    {t('account.subscription.upgradeToPremium')}
                  </Link>
                </div>
              </div>
            )}

            {/* Sign Out */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('account.dangerZone.title')}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {t('account.dangerZone.signOutDescription')}
              </p>
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {t('account.dangerZone.signOut')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
