import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { HelpCircle, MessageSquare, AlertCircle, Lightbulb, Send, ArrowLeft, Clock, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { supportService, SupportTicket, SupportTicketType } from '@/services/supportService';
import { 
  getPageSEO, 
  BASE_URL, 
  generateFAQSchema 
} from '@/utils/seoConfig';

export function SupportPage() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'es' ? 'es' : 'en') as 'en' | 'es';
  const seo = getPageSEO('support', lang);
  const pageUrl = `${BASE_URL}/support`;
  
  // Common support FAQs
  const supportFAQs = lang === 'es' ? [
    {
      question: '¿Cómo puedo crear un ticket de soporte?',
      answer: 'Puedes crear un ticket de soporte completando el formulario en la página de soporte. Selecciona el tipo de consulta, proporciona un asunto y mensaje detallado, y nuestro equipo te responderá lo antes posible.',
    },
    {
      question: '¿Cuánto tiempo tarda en responder el soporte?',
      answer: 'Nuestro equipo de soporte generalmente responde dentro de 24-48 horas. Los usuarios Premium reciben prioridad en las respuestas.',
    },
    {
      question: '¿Puedo ver el estado de mis tickets?',
      answer: 'Sí, puedes ver todos tus tickets de soporte y su estado (abierto, en progreso, resuelto, cerrado) en la página de soporte.',
    },
    {
      question: '¿Qué tipos de consultas puedo enviar?',
      answer: 'Puedes enviar consultas de ayuda, quejas, comentarios o sugerencias de características. Selecciona el tipo apropiado al crear tu ticket.',
    },
  ] : [
    {
      question: 'How can I create a support ticket?',
      answer: 'You can create a support ticket by filling out the form on the support page. Select the type of inquiry, provide a subject and detailed message, and our team will respond as soon as possible.',
    },
    {
      question: 'How long does support take to respond?',
      answer: 'Our support team typically responds within 24-48 hours. Premium users receive priority in responses.',
    },
    {
      question: 'Can I view the status of my tickets?',
      answer: 'Yes, you can view all your support tickets and their status (open, in-progress, resolved, closed) on the support page.',
    },
    {
      question: 'What types of inquiries can I send?',
      answer: 'You can send help inquiries, complaints, comments, or feature suggestions. Select the appropriate type when creating your ticket.',
    },
  ];
  
  const faqSchema = generateFAQSchema(supportFAQs);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);
  const [formData, setFormData] = useState({
    type: 'help' as SupportTicketType,
    subject: '',
    message: '',
  });

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      setIsLoadingTickets(true);
      const response = await supportService.getUserTickets();
      if (response.success && response.data) {
        setTickets(response.data);
      }
    } catch (error) {
      console.error('Error loading tickets:', error);
      toast.error(t('support.messages.loadError'));
    } finally {
      setIsLoadingTickets(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject.trim() || !formData.message.trim()) {
      toast.error(t('support.messages.createError'));
      return;
    }

    try {
      setIsLoading(true);
      const response = await supportService.createTicket({
        type: formData.type,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      if (response.success && response.data) {
        toast.success(t('support.messages.createSuccess'));
        setFormData({ type: 'help', subject: '', message: '' });
        await loadTickets();
        setSelectedTicket(response.data);
      } else {
        toast.error(response.error || t('support.messages.createError'));
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.error(t('support.messages.createError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleViewTicket = async (ticketId: string) => {
    try {
      const response = await supportService.getTicket(ticketId);
      if (response.success && response.data) {
        setSelectedTicket(response.data);
      } else {
        toast.error(t('support.messages.loadTicketError'));
      }
    } catch (error) {
      console.error('Error loading ticket:', error);
      toast.error(t('support.messages.loadTicketError'));
    }
  };

  const getTypeIcon = (type: SupportTicketType) => {
    switch (type) {
      case 'help':
        return <HelpCircle className="w-5 h-5" />;
      case 'complaint':
        return <AlertCircle className="w-5 h-5" />;
      case 'comment':
        return <MessageSquare className="w-5 h-5" />;
      case 'feature':
        return <Lightbulb className="w-5 h-5" />;
      default:
        return <MessageSquare className="w-5 h-5" />;
    }
  };

  const getStatusIcon = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'closed':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedTicket) {
    return (
      <>
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <link rel="canonical" href={pageUrl} />
          <meta name="robots" content="index, follow" />
        </Helmet>
        <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedTicket(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('support.details.back')}
          </button>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{t('support.details.title')}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(selectedTicket.status)}`}>
                {getStatusIcon(selectedTicket.status)}
                {t(`support.status.${selectedTicket.status}`)}
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('support.details.ticketId')}</label>
                <p className="text-gray-900">{selectedTicket.ticketId}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('support.details.type')}</label>
                <div className="flex items-center gap-2 text-gray-900">
                  {getTypeIcon(selectedTicket.type)}
                  {t(`support.types.${selectedTicket.type}`)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('support.form.subject')}</label>
                <p className="text-gray-900">{selectedTicket.subject}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('support.form.message')}</label>
                <p className="text-gray-600 whitespace-pre-wrap">{selectedTicket.message}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('support.details.createdAt')}</label>
                  <p className="text-gray-600">{new Date(selectedTicket.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('support.details.updatedAt')}</label>
                  <p className="text-gray-600">{new Date(selectedTicket.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={pageUrl} />
        
        {/* hreflang for internationalization */}
        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link rel="alternate" hrefLang="es" href={`${pageUrl}?lang=es`} />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content={seo.ogType || 'website'} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="GetQuickResume" />
        <meta property="og:image" content={seo.ogImage || `${BASE_URL}/images/og-default.png`} />
        <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage || `${BASE_URL}/images/og-default.png`} />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={lang === 'es' 
          ? 'soporte, ayuda, ticket de soporte, asistencia, contacto, ayuda cv'
          : 'support, help, support ticket, assistance, contact, resume help'
        } />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('support.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('support.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Ticket Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t('support.form.title')}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('support.form.type')}
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="help">{t('support.types.help')}</option>
                  <option value="complaint">{t('support.types.complaint')}</option>
                  <option value="comment">{t('support.types.comment')}</option>
                  <option value="feature">{t('support.types.feature')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('support.form.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('support.form.placeholders.subject')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('support.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder={t('support.form.placeholders.message')}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {isLoading ? t('common.loading') : t('support.form.submit')}
              </button>
            </form>
          </div>

          {/* Tickets List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t('support.list.title')}
            </h2>
            
            {isLoadingTickets ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">{t('common.loading')}</p>
              </div>
            ) : tickets.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('support.list.empty')}
                </h3>
                <p className="text-gray-600">
                  {t('support.list.emptyDescription')}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.ticketId}
                    className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all cursor-pointer"
                    onClick={() => handleViewTicket(ticket.ticketId)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(ticket.type)}
                        <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(ticket.status)}`}>
                        {getStatusIcon(ticket.status)}
                        {t(`support.status.${ticket.status}`)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{ticket.message}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{t('support.types.' + ticket.type)}</span>
                      <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

