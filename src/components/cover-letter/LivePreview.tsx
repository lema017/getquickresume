import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Download,
  Copy,
  RefreshCw,
  Check,
  FileText,
  Sparkles,
  Loader2,
  Edit3,
  X,
  Save,
  Crown,
  Mail,
  Phone,
  Linkedin,
  Globe,
  Printer,
  Cloud,
} from 'lucide-react';
import { useCoverLetterStore } from '@/stores/coverLetterStore';
import { TemplateSelector } from '@/components/cover-letter/TemplateSelector';
import { coverLetterService } from '@/services/coverLetterService';
import { CoverLetterParagraph, CoverLetterTemplate } from '@/types/coverLetter';
import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';

export function LivePreview() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    currentCoverLetter,
    currentCoverLetterId,
    generatedContent,
    selectedTemplate,
    isGenerating,
    editingParagraphId,
    isSaved,
    setEditingParagraph,
    updateParagraph,
    setIsSaved,
  } = useCoverLetterStore();

  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [regeneratingParagraph, setRegeneratingParagraph] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [showPremiumPrompt, setShowPremiumPrompt] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const coverLetterRef = useRef<HTMLDivElement>(null);
  const isPremium = user?.isPremium;

  const handleCopyToClipboard = async () => {
    if (!generatedContent) return;

    const text = generatedContent.paragraphs.map((p) => p.content).join('\n\n');
    await navigator.clipboard.writeText(text);
    setCopiedToClipboard(true);
    toast.success(t('coverLetter.preview.copied'));
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };

  // Save cover letter to backend
  const handleSaveCoverLetter = async () => {
    if (!currentCoverLetterId || !generatedContent) {
      toast.error(t('coverLetter.preview.saveFailed') || 'Failed to save');
      return;
    }

    setIsSaving(true);
    try {
      await coverLetterService.saveCoverLetter(
        currentCoverLetterId,
        currentCoverLetter,
        generatedContent
      );
      setIsSaved(true);
      toast.success(t('coverLetter.preview.saved') || 'Cover letter saved!');
    } catch (error) {
      console.error('Error saving cover letter:', error);
      toast.error(t('coverLetter.preview.saveFailed') || 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  // Print cover letter using browser print
  const handlePrint = () => {
    window.print();
  };

  // Download cover letter as PDF
  const handleDownloadPDF = async () => {
    if (!coverLetterRef.current) {
      toast.error(t('coverLetter.preview.downloadFailed') || 'Failed to download');
      return;
    }

    setIsDownloading(true);
    toast.loading(t('coverLetter.preview.downloadingPdf') || 'Generating PDF...', { id: 'pdf-download' });

    try {
      const element = coverLetterRef.current;
      const filename = `cover-letter-${currentCoverLetter.companyName || 'draft'}-${new Date().toISOString().split('T')[0]}.pdf`;

      const opt = {
        margin: 10,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false,
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait'
        }
      };

      // Dynamic import to avoid loading ~178 KiB on initial page load
      const { default: html2pdf } = await import('html2pdf.js');
      await (html2pdf as any)().set(opt).from(element).save();
      toast.success(t('coverLetter.preview.downloadStarted') || 'Download started!', { id: 'pdf-download' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error(t('coverLetter.preview.downloadFailed') || 'Failed to download', { id: 'pdf-download' });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRegenerateParagraph = async (paragraph: CoverLetterParagraph) => {
    // Check if user is premium before calling API
    if (!isPremium) {
      setShowPremiumPrompt(true);
      return;
    }

    if (!currentCoverLetterId) {
      toast.error(t('coverLetter.errors.regenerateFailed'));
      return;
    }

    setRegeneratingParagraph(paragraph.id);
    try {
      const newContent = await coverLetterService.regenerateParagraph(
        currentCoverLetterId,
        paragraph.type,
        currentCoverLetter
      );
      updateParagraph(paragraph.id, newContent);
      toast.success(t('coverLetter.preview.paragraphRegenerated'));
    } catch (error: any) {
      // Handle PREMIUM_REQUIRED error
      if (error?.code === 'PREMIUM_REQUIRED') {
        setShowPremiumPrompt(true);
      } else {
        toast.error(t('coverLetter.errors.regenerateFailed'));
      }
    } finally {
      setRegeneratingParagraph(null);
    }
  };

  const handleStartEditing = (paragraph: CoverLetterParagraph) => {
    setEditingParagraph(paragraph.id);
    setEditingContent(paragraph.content);
  };

  const handleSaveEditing = (paragraphId: string) => {
    updateParagraph(paragraphId, editingContent);
    setEditingParagraph(null);
    setEditingContent('');
    toast.success(t('coverLetter.preview.paragraphSaved'));
  };

  const handleCancelEditing = () => {
    setEditingParagraph(null);
    setEditingContent('');
  };

  // Get current date formatted
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Render paragraph with editing capabilities
  const renderParagraph = (paragraph: CoverLetterParagraph, customClass: string = '') => {
    if (editingParagraphId === paragraph.id) {
      return (
        <div className="space-y-2">
          <textarea
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none min-h-[100px] text-base"
            autoFocus
          />
          <div className="flex justify-end gap-2 no-print">
            <button
              onClick={handleCancelEditing}
              className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              {t('common.cancel')}
            </button>
            <button
              onClick={() => handleSaveEditing(paragraph.id)}
              className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg flex items-center gap-1 hover:bg-purple-700"
            >
              <Save className="w-4 h-4" />
              {t('common.save')}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="group relative cover-letter-paragraph">
        <p className={customClass}>{paragraph.content}</p>
        {/* Hover Actions */}
        <div className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white shadow-lg rounded-lg p-1 border border-gray-200 no-print">
          <button
            onClick={() => handleStartEditing(paragraph)}
            className="p-1.5 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
            title={t('coverLetter.preview.edit')}
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleRegenerateParagraph(paragraph)}
            disabled={regeneratingParagraph === paragraph.id}
            className={`p-1.5 rounded transition-colors disabled:opacity-50 flex items-center gap-1 ${
              isPremium 
                ? 'text-gray-500 hover:text-purple-600 hover:bg-purple-50' 
                : 'text-amber-600 hover:text-amber-700 hover:bg-amber-50'
            }`}
            title={isPremium ? t('coverLetter.preview.regenerate') : t('coverLetter.preview.regeneratePremium') || 'Premium feature'}
          >
            {regeneratingParagraph === paragraph.id ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                {!isPremium && <Crown className="w-3 h-3" />}
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  // ============================================================================
  // CLASSIC TEMPLATE - Traditional business letter format
  // ============================================================================
  const renderClassicTemplate = () => {
    const greeting = generatedContent?.paragraphs.find(p => p.type === 'greeting');
    const bodyParagraphs = generatedContent?.paragraphs.filter(p => 
      p.type !== 'greeting' && p.type !== 'signature'
    ) || [];
    const signature = generatedContent?.paragraphs.find(p => p.type === 'signature');

    return (
      <div className="font-classic bg-white cover-letter-paper" style={{ padding: '50px 60px' }}>
        {/* Letterhead */}
        <div className="text-center border-b-2 border-[#1e3a5f] pb-4 mb-8">
          <h1 className="text-2xl font-bold text-[#1e3a5f] tracking-wide cover-letter-heading">
            {currentCoverLetter.fullName || 'Your Name'}
          </h1>
          <p className="text-sm text-gray-600 mt-2 cover-letter-subheading">
            {[currentCoverLetter.email, currentCoverLetter.phone, currentCoverLetter.linkedin]
              .filter(Boolean)
              .join('  •  ')}
          </p>
        </div>

        {/* Date - Right aligned */}
        <div className="text-right mb-8 text-gray-700">
          {formatDate()}
        </div>

        {/* Recipient Info */}
        {currentCoverLetter.hiringManagerName && (
          <div className="mb-6 text-gray-800">
            <p>{currentCoverLetter.hiringManagerName}</p>
            <p>{currentCoverLetter.companyName}</p>
          </div>
        )}

        {/* Greeting */}
        {greeting && renderParagraph(greeting, 'text-gray-800 text-base mb-6 font-medium cover-letter-body')}

        {/* Body Paragraphs with indentation */}
        <div className="space-y-4 mb-8">
          {bodyParagraphs.map((paragraph) => (
            <div key={paragraph.id}>
              {renderParagraph(paragraph, 'text-gray-800 text-base leading-relaxed cover-letter-body first-letter:ml-8')}
            </div>
          ))}
        </div>

        {/* Signature */}
        {signature && (
          <div className="mt-10">
            {renderParagraph(signature, 'text-gray-800 text-base whitespace-pre-line cover-letter-body')}
          </div>
        )}
      </div>
    );
  };

  // ============================================================================
  // MODERN TEMPLATE - Clean contemporary design
  // ============================================================================
  const renderModernTemplate = () => {
    const greeting = generatedContent?.paragraphs.find(p => p.type === 'greeting');
    const bodyParagraphs = generatedContent?.paragraphs.filter(p => 
      p.type !== 'greeting' && p.type !== 'signature'
    ) || [];
    const signature = generatedContent?.paragraphs.find(p => p.type === 'signature');

    return (
      <div className="font-modern bg-white cover-letter-paper" style={{ padding: '40px 50px' }}>
        {/* Header with left accent */}
        <div className="flex gap-6 mb-10">
          <div className="w-1.5 bg-[#6366f1] rounded-full self-stretch" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 cover-letter-heading">
              {currentCoverLetter.fullName || 'Your Name'}
            </h1>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600 cover-letter-subheading">
              {currentCoverLetter.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-[#6366f1]" />
                  {currentCoverLetter.email}
                </span>
              )}
              {currentCoverLetter.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[#6366f1]" />
                  {currentCoverLetter.phone}
                </span>
              )}
              {currentCoverLetter.linkedin && (
                <span className="flex items-center gap-1.5">
                  <Linkedin className="w-4 h-4 text-[#6366f1]" />
                  {currentCoverLetter.linkedin}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Date and recipient */}
        <div className="mb-8 text-gray-600 text-sm">
          <p className="mb-4">{formatDate()}</p>
          {currentCoverLetter.companyName && (
            <div>
              <p className="font-medium text-gray-800">{currentCoverLetter.companyName}</p>
              <p className="text-[#6366f1]">{currentCoverLetter.jobTitle}</p>
            </div>
          )}
        </div>

        {/* Greeting */}
        {greeting && renderParagraph(greeting, 'text-gray-800 text-base mb-6 font-semibold cover-letter-body')}

        {/* Body Paragraphs */}
        <div className="space-y-5 mb-10">
          {bodyParagraphs.map((paragraph) => (
            <div key={paragraph.id}>
              {renderParagraph(paragraph, 'text-gray-700 text-base leading-relaxed cover-letter-body')}
            </div>
          ))}
        </div>

        {/* Signature */}
        {signature && (
          <div className="mt-10 pt-6 border-t border-gray-100">
            {renderParagraph(signature, 'text-gray-800 text-base whitespace-pre-line cover-letter-body')}
          </div>
        )}
      </div>
    );
  };

  // ============================================================================
  // MINIMAL TEMPLATE - Maximum whitespace elegance
  // ============================================================================
  const renderMinimalTemplate = () => {
    const greeting = generatedContent?.paragraphs.find(p => p.type === 'greeting');
    const bodyParagraphs = generatedContent?.paragraphs.filter(p => 
      p.type !== 'greeting' && p.type !== 'signature'
    ) || [];
    const signature = generatedContent?.paragraphs.find(p => p.type === 'signature');

    return (
      <div className="font-minimal bg-[#fafafa] cover-letter-paper" style={{ padding: '70px 80px' }}>
        {/* Minimal Header - Just the name */}
        <div className="mb-16">
          <h1 className="text-3xl font-light text-gray-900 tracking-wide cover-letter-heading">
            {currentCoverLetter.fullName || 'Your Name'}
          </h1>
          <div className="w-12 h-0.5 bg-gray-300 mt-4" />
        </div>

        {/* Greeting */}
        {greeting && renderParagraph(greeting, 'text-gray-800 text-base mb-10 font-normal cover-letter-body')}

        {/* Body Paragraphs with generous spacing */}
        <div className="space-y-8 mb-16">
          {bodyParagraphs.map((paragraph) => (
            <div key={paragraph.id}>
              {renderParagraph(paragraph, 'text-gray-600 text-base leading-loose cover-letter-body')}
            </div>
          ))}
        </div>

        {/* Signature */}
        {signature && (
          <div className="mt-16">
            {renderParagraph(signature, 'text-gray-800 text-base whitespace-pre-line font-normal cover-letter-body')}
          </div>
        )}

        {/* Contact footer - minimal style */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400 tracking-wider uppercase">
            {[currentCoverLetter.email, currentCoverLetter.phone]
              .filter(Boolean)
              .join('  ·  ')}
          </p>
        </div>
      </div>
    );
  };

  // ============================================================================
  // CREATIVE TEMPLATE - Bold design for creative roles
  // ============================================================================
  const renderCreativeTemplate = () => {
    const greeting = generatedContent?.paragraphs.find(p => p.type === 'greeting');
    const bodyParagraphs = generatedContent?.paragraphs.filter(p => 
      p.type !== 'greeting' && p.type !== 'signature'
    ) || [];
    const signature = generatedContent?.paragraphs.find(p => p.type === 'signature');

    return (
      <div className="font-creative bg-white cover-letter-paper relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-100 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-50 to-transparent rounded-tr-full" />
        
        {/* Gradient Header Banner */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white p-8 relative print-gradient-fallback">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-50" />
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-tight cover-letter-heading">
              {currentCoverLetter.fullName || 'Your Name'}
            </h1>
            <p className="text-purple-100 mt-1 text-lg">
              {currentCoverLetter.jobTitle || 'Professional'}
            </p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-purple-100">
              {currentCoverLetter.email && (
                <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                  <Mail className="w-4 h-4" />
                  {currentCoverLetter.email}
                </span>
              )}
              {currentCoverLetter.phone && (
                <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                  <Phone className="w-4 h-4" />
                  {currentCoverLetter.phone}
                </span>
              )}
              {currentCoverLetter.linkedin && (
                <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                  <Globe className="w-4 h-4" />
                  Portfolio
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-10 relative z-10">
          {/* Company Badge */}
          {currentCoverLetter.companyName && (
            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Applying to {currentCoverLetter.companyName}
            </div>
          )}

          {/* Greeting */}
          {greeting && renderParagraph(greeting, 'text-gray-800 text-lg mb-6 font-semibold cover-letter-body')}

          {/* Body Paragraphs */}
          <div className="space-y-5 mb-10">
            {bodyParagraphs.map((paragraph, index) => (
              <div key={paragraph.id} className={index === 0 ? 'relative pl-4 border-l-4 border-purple-400' : ''}>
                {renderParagraph(paragraph, 'text-gray-700 text-base leading-relaxed cover-letter-body')}
              </div>
            ))}
          </div>

          {/* Signature with avatar placeholder */}
          {signature && (
            <div className="mt-10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {(currentCoverLetter.fullName || 'U')[0].toUpperCase()}
              </div>
              <div>
                {renderParagraph(signature, 'text-gray-800 text-base whitespace-pre-line cover-letter-body')}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Main template renderer
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'classic':
        return renderClassicTemplate();
      case 'modern':
        return renderModernTemplate();
      case 'minimal':
        return renderMinimalTemplate();
      case 'creative':
        return renderCreativeTemplate();
      default:
        return renderModernTemplate();
    }
  };

  return (
    <div className="sticky top-24 space-y-4">
      {/* Template Selector */}
      <TemplateSelector />

      {/* Preview Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        {/* Preview Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">{t('coverLetter.preview.title')}</span>
          </div>
          
          {generatedContent && (
            <div className="flex items-center gap-1">
              {/* Copy Button */}
              <button
                onClick={handleCopyToClipboard}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
                title={t('coverLetter.preview.copy')}
              >
                {copiedToClipboard ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>

              {/* Print Button */}
              <button
                onClick={handlePrint}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
                title={t('coverLetter.preview.print') || 'Print'}
              >
                <Printer className="w-5 h-5" />
              </button>

              {/* Download PDF Button */}
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                title={t('coverLetter.preview.download')}
              >
                {isDownloading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
              </button>

              {/* Separator */}
              <div className="w-px h-6 bg-gray-300 mx-1" />

              {/* Save Button */}
              <button
                onClick={handleSaveCoverLetter}
                disabled={isSaving || !currentCoverLetterId}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                title={t('coverLetter.preview.save') || 'Save'}
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isSaved ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Cloud className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">
                  {isSaving 
                    ? (t('common.saving') || 'Saving...') 
                    : isSaved 
                      ? (t('coverLetter.preview.saved') || 'Saved!') 
                      : (t('coverLetter.preview.save') || 'Save')}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Preview Content */}
        <div className="bg-gray-100 p-4 min-h-[600px] overflow-auto">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center h-full py-20 bg-white rounded-xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-4 animate-pulse">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t('coverLetter.preview.generating')}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center max-w-xs">
                {t('coverLetter.preview.generatingHint')}
              </p>
            </div>
          ) : generatedContent ? (
            <div ref={coverLetterRef} className="shadow-xl rounded-lg overflow-hidden" id="cover-letter-content">
              {renderTemplate()}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center bg-white rounded-xl">
              <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <FileText className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('coverLetter.preview.empty.title')}
              </h3>
              <p className="text-gray-500 max-w-sm">
                {t('coverLetter.preview.empty.description')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Premium Prompt Modal */}
      {showPremiumPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('coverLetter.premium.title') || 'Premium Feature'}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('coverLetter.premium.regenerateDescription') || 'Regenerating paragraphs with AI is a premium feature. Upgrade to access unlimited regenerations and more!'}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPremiumPrompt(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {t('common.cancel') || 'Cancel'}
                </button>
                <button
                  onClick={() => {
                    setShowPremiumPrompt(false);
                    navigate('/premium');
                  }}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all font-medium"
                >
                  {t('coverLetter.premium.upgrade') || 'Upgrade Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

