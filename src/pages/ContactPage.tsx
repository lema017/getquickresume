import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Mail, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    toast.success(t('contact.toast.success'));
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t('contact.form.title')}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder={t('contact.form.placeholders.name')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder={t('contact.form.placeholders.email')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="input-field resize-none"
                  placeholder={t('contact.form.placeholders.message')}
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                {t('contact.form.send')}
              </button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {t('contact.info.title')}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{t('contact.info.emailLabel')}</p>
                    <p className="text-gray-600">contacto@getquickresume.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{t('contact.info.supportLabel')}</p>
                    <p className="text-gray-600">soporte@getquickresume.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {t('contact.social.title')}
              </h2>
              
              <div className="space-y-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Facebook className="w-6 h-6 text-blue-600 mr-3" />
                  <span>Facebook</span>
                </a>
                
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Instagram className="w-6 h-6 text-pink-600 mr-3" />
                  <span>Instagram</span>
                </a>
                
                <a
                  href="mailto:contacto@getquickresume.com"
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Mail className="w-6 h-6 text-gray-600 mr-3" />
                  <span>Gmail</span>
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {t('contact.faq.title')}
              </h2>
              
              <div className="space-y-4">
                {(t('contact.faq.items', { returnObjects: true }) as unknown as { question: string; answer: string }[]).map((item, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {item.question}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
