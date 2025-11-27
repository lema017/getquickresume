import { ResumeData } from '@/types';
import { useTranslation } from 'react-i18next';
import { User, Mail, Phone, MapPin, Linkedin } from 'lucide-react';

interface ContactSectionProps {
  resumeData: ResumeData;
}

export function ContactSection({ resumeData }: ContactSectionProps) {
  const { t } = useTranslation();
  const { firstName, lastName, email, phone, country, linkedin } = resumeData;

  if (!firstName && !lastName && !email && !phone && !country && !linkedin) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <User className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">
          {t('resumeView.sections.contact')}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(firstName || lastName) && (
          <div className="flex items-center text-gray-700">
            <User className="w-4 h-4 mr-2 text-gray-400" />
            <span className="font-medium">{firstName} {lastName}</span>
          </div>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Mail className="w-4 h-4 mr-2" />
            <span>{email}</span>
          </a>
        )}
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            <span>{phone}</span>
          </a>
        )}
        {country && (
          <div className="flex items-center text-gray-700">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span>{country}</span>
          </div>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Linkedin className="w-4 h-4 mr-2" />
            <span>LinkedIn</span>
          </a>
        )}
      </div>
    </div>
  );
}

