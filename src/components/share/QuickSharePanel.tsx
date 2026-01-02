import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Share2, 
  Copy, 
  Check, 
  QrCode, 
  Loader2,
  Link as LinkIcon,
  Twitter,
  Linkedin,
  Mail,
  Power,
  PowerOff
} from 'lucide-react';
import toast from 'react-hot-toast';
import { QRCodeSVG } from 'qrcode.react';
import { resumeSharingService } from '@/services/resumeSharingService';

interface QuickSharePanelProps {
  resumeId: string;
  shareToken?: string;
  isPubliclyShared: boolean;
  onSharingChanged: () => void;
}

export function QuickSharePanel({
  resumeId,
  shareToken: initialShareToken,
  isPubliclyShared: initialIsPubliclyShared,
  onSharingChanged,
}: QuickSharePanelProps) {
  const { t } = useTranslation();
  const [shareToken, setShareToken] = useState<string | undefined>(initialShareToken);
  const [isPubliclyShared, setIsPubliclyShared] = useState(initialIsPubliclyShared);
  const [isToggling, setIsToggling] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const shareUrl = shareToken ? `${window.location.origin}/share/${shareToken}` : '';

  const handleToggleSharing = async () => {
    try {
      setIsToggling(true);
      
      if (isPubliclyShared) {
        // Disable sharing
        await resumeSharingService.disableSharing(resumeId);
        setIsPubliclyShared(false);
        setShareToken(undefined);
        toast.success(t('resumeShare.disabled'));
      } else {
        // Enable sharing
        const response = await resumeSharingService.enableSharing(resumeId);
        if (response.success && response.data) {
          setShareToken(response.data.shareToken);
          setIsPubliclyShared(true);
          toast.success(t('resumeShare.enabled'));
        }
      }
      
      onSharingChanged();
    } catch (error) {
      console.error('Error toggling sharing:', error);
      toast.error(t('resumeShare.errors.toggleFailed'));
    } finally {
      setIsToggling(false);
    }
  };

  const handleCopyLink = async () => {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success(t('resumeShare.linkCopied'));
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
      toast.error(t('resumeShare.errors.copyFailed'));
    }
  };

  const handleNativeShare = async () => {
    if (!shareUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: t('resumeShare.shareTitle'),
          text: t('resumeShare.shareText'),
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  const handleSocialShare = (platform: 'twitter' | 'linkedin' | 'email') => {
    if (!shareUrl) return;

    const text = t('resumeShare.socialText');
    let url = '';

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(t('resumeShare.emailSubject'))}&body=${encodeURIComponent(`${text}\n\n${shareUrl}`)}`;
        break;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Share2 className="w-6 h-6" />
          <h2 className="text-xl font-bold">{t('resumeShare.controls.title')}</h2>
        </div>
        <p className="text-blue-100 text-sm">
          {t('resumeShare.controls.subtitle')}
        </p>
      </div>

      {/* Toggle Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isPubliclyShared ? (
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Power className="w-5 h-5 text-green-600" />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <PowerOff className="w-5 h-5 text-gray-400" />
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-900">
                {isPubliclyShared ? t('resumeShare.status.active') : t('resumeShare.status.inactive')}
              </p>
              <p className="text-sm text-gray-500">
                {isPubliclyShared ? t('resumeShare.status.activeDescription') : t('resumeShare.status.inactiveDescription')}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleToggleSharing}
            disabled={isToggling}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              isPubliclyShared ? 'bg-green-500' : 'bg-gray-300'
            } disabled:opacity-50`}
          >
            {isToggling ? (
              <Loader2 className="w-4 h-4 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
            ) : (
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                  isPubliclyShared ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Share Link Section */}
      {isPubliclyShared && shareToken && (
        <>
          <div className="p-6 border-b border-gray-100 space-y-4">
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <LinkIcon className="w-4 h-4" />
              <span className="font-medium text-sm">{t('resumeShare.shareLink')}</span>
            </div>
            
            {/* URL Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  copied 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {copied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Share Button */}
            <button
              onClick={handleNativeShare}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              {t('resumeShare.shareButton')}
            </button>
          </div>

          {/* Social Share */}
          <div className="p-6 border-b border-gray-100">
            <p className="text-sm text-gray-600 mb-4">{t('resumeShare.shareVia')}</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleSocialShare('linkedin')}
                className="flex-1 py-3 bg-[#0077B5] text-white rounded-xl hover:bg-[#006699] transition-colors flex items-center justify-center gap-2"
              >
                <Linkedin className="w-5 h-5" />
                <span className="hidden sm:inline">LinkedIn</span>
              </button>
              <button
                onClick={() => handleSocialShare('twitter')}
                className="flex-1 py-3 bg-[#1DA1F2] text-white rounded-xl hover:bg-[#1a8cd8] transition-colors flex items-center justify-center gap-2"
              >
                <Twitter className="w-5 h-5" />
                <span className="hidden sm:inline">Twitter</span>
              </button>
              <button
                onClick={() => handleSocialShare('email')}
                className="flex-1 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                <span className="hidden sm:inline">Email</span>
              </button>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="p-6">
            <button
              onClick={() => setShowQR(!showQR)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <QrCode className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">{t('resumeShare.qrCode.title')}</span>
              </div>
              <span className="text-sm text-blue-600">{showQR ? t('common.hide') : t('common.show')}</span>
            </button>

            {showQR && (
              <div className="mt-4 flex flex-col items-center p-6 bg-white rounded-xl border-2 border-dashed border-gray-200">
                <QRCodeSVG
                  value={shareUrl}
                  size={180}
                  level="H"
                  includeMargin={false}
                />
                <p className="text-xs text-gray-500 mt-4 text-center">
                  {t('resumeShare.qrCode.description')}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

