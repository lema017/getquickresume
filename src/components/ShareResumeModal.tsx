import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Copy, Check, QrCode, Share2, BarChart3, Loader2, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { QRCodeSVG } from 'qrcode.react';
import { resumeSharingService, AnalyticsSummary } from '@/services/resumeSharingService';
import { useAuthStore } from '@/stores/authStore';
import { ResumeAnalytics } from './ResumeAnalytics';

interface ShareResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeId: string;
  shareToken?: string;
  isPubliclyShared?: boolean;
  onSharingChanged?: () => void;
}

export function ShareResumeModal({
  isOpen,
  onClose,
  resumeId,
  shareToken: initialShareToken,
  isPubliclyShared: initialIsPubliclyShared,
  onSharingChanged,
}: ShareResumeModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [shareToken, setShareToken] = useState<string | undefined>(initialShareToken);
  const [isPubliclyShared, setIsPubliclyShared] = useState(initialIsPubliclyShared || false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnabling, setIsEnabling] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  const shareUrl = shareToken ? `${window.location.origin}/share/${shareToken}` : '';

  useEffect(() => {
    if (isOpen && isPubliclyShared && shareToken) {
      loadAnalytics();
    }
  }, [isOpen, isPubliclyShared, shareToken]);

  const loadAnalytics = async () => {
    if (!shareToken) return;
    
    try {
      setLoadingAnalytics(true);
      const response = await resumeSharingService.getAnalytics(resumeId);
      if (response.success && response.data) {
        setAnalytics(response.data);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const handleEnableSharing = async () => {
    if (!user?.isPremium) {
      toast.error(t('resumeSharing.premiumRequired'));
      return;
    }

    try {
      setIsEnabling(true);
      const response = await resumeSharingService.enableSharing(resumeId);
      
      if (response.success && response.data) {
        setShareToken(response.data.shareToken);
        setIsPubliclyShared(true);
        toast.success(t('resumeSharing.enabled'));
        onSharingChanged?.();
      } else {
        throw new Error(response.error || 'Failed to enable sharing');
      }
    } catch (error) {
      console.error('Error enabling sharing:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(t('resumeSharing.errors.enableFailed'));
      }
    } finally {
      setIsEnabling(false);
    }
  };

  const handleDisableSharing = async () => {
    try {
      setIsLoading(true);
      await resumeSharingService.disableSharing(resumeId);
      setIsPubliclyShared(false);
      setShareToken(undefined);
      toast.success(t('resumeSharing.disabled'));
      onSharingChanged?.();
    } catch (error) {
      console.error('Error disabling sharing:', error);
      toast.error(t('resumeSharing.errors.disableFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = async () => {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success(t('resumeSharing.linkCopied'));
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
      toast.error(t('resumeSharing.errors.copyFailed'));
    }
  };

  const handleShare = async () => {
    if (!shareUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: t('resumeSharing.shareTitle'),
          text: t('resumeSharing.shareText'),
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled or error occurred
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copy
      handleCopyLink();
    }
  };

  if (!isOpen) return null;

  const isPremium = user?.isPremium || false;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Share2 className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {t('resumeSharing.title')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Premium Check */}
          {!isPremium && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Crown className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t('resumeSharing.premiumFeature.title')}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t('resumeSharing.premiumFeature.description')}
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/premium');
                    }}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <Crown className="w-4 h-4" />
                    {t('resumeSharing.premiumFeature.upgradeButton')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sharing Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {t('resumeSharing.publicSharing')}
              </h3>
              <p className="text-sm text-gray-600">
                {isPubliclyShared
                  ? t('resumeSharing.sharingEnabled')
                  : t('resumeSharing.sharingDisabled')}
              </p>
            </div>
            <button
              onClick={isPubliclyShared ? handleDisableSharing : handleEnableSharing}
              disabled={!isPremium || isLoading || isEnabling}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isPubliclyShared
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading || isEnabling ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isPubliclyShared ? (
                t('resumeSharing.disable')
              ) : (
                t('resumeSharing.enable')
              )}
            </button>
          </div>

          {/* Share URL and QR Code */}
          {isPubliclyShared && shareToken && (
            <>
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {t('resumeSharing.shareLink')}
                </h3>
                
                {/* URL Input */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        {t('resumeSharing.copied')}
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        {t('resumeSharing.copy')}
                      </>
                    )}
                  </button>
                </div>

                {/* Share Buttons */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={handleShare}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    {t('resumeSharing.share')}
                  </button>
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
                  <QrCode className="w-6 h-6 text-gray-600 mb-2" />
                  <p className="text-sm text-gray-600 mb-4">
                    {t('resumeSharing.scanQRCode')}
                  </p>
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                    <QRCodeSVG
                      value={shareUrl}
                      size={192}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-4 text-center max-w-xs">
                    {t('resumeSharing.qrCodeDescription')}
                  </p>
                </div>
              </div>

              {/* Analytics Section */}
              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-gray-600" />
                    <span className="font-semibold text-gray-900">
                      {t('resumeSharing.analytics.title')}
                    </span>
                  </div>
                  {loadingAnalytics && (
                    <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                  )}
                </button>

                {showAnalytics && analytics && (
                  <div className="mt-4">
                    <ResumeAnalytics analytics={analytics} />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

