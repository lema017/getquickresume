import { Certification } from '@/types';
import { useTranslation } from 'react-i18next';
import { Award } from 'lucide-react';

interface CertificationsSectionProps {
  certifications: Certification[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  const { t } = useTranslation();

  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Award className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">
          {t('resumeView.sections.certifications')}
        </h2>
      </div>
      
      <div className="space-y-3">
        {certifications.map((cert) => (
          <div key={cert.id} className="flex items-start">
            <Award className="w-4 h-4 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{cert.name}</h3>
              {cert.issuer && (
                <p className="text-sm text-gray-600">{cert.issuer}</p>
              )}
              {cert.date && (
                <p className="text-sm text-gray-500">{cert.date}</p>
              )}
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {t('resumeView.actions.viewCertificate')}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

