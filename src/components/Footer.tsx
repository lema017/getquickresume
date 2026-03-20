import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Mail, Heart } from 'lucide-react';
import { POPULAR_PROFESSION_LINKS, POPULAR_SKILL_LINKS } from '@/data/seoHubLinks';

const SHOW_PILLAR_FOOTER_LINK = true;

export function Footer() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'es';
  const footerProfessions = POPULAR_PROFESSION_LINKS.slice(0, 6);
  const footerSkills = POPULAR_SKILL_LINKS.slice(0, 4);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-bold">GetQuickResume</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              {t('about.mission')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@getquickresume.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={t('footer.emailUs')}
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Resume guides — small evergreen set */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.resumeGuides')}</h3>
            <ul className="space-y-2">
              {footerProfessions.map((p) => (
                <li key={p.slug}>
                  <Link to={`/resume/${p.slug}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {lang === 'es'
                      ? `${p.titleEs}${t('landing.popularGuides.professionLinkSuffixEs')}`
                      : `${p.titleEn}${t('landing.popularGuides.professionLinkSuffix')}`}
                  </Link>
                </li>
              ))}
              {footerSkills.map((s) => (
                <li key={s.slug}>
                  <Link to={`/resume-skills/${s.slug}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {lang === 'es'
                      ? `${s.titleEs}${t('landing.popularGuides.skillLinkSuffixEs')}`
                      : `${s.titleEn}${t('landing.popularGuides.skillLinkSuffix')}`}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.tools')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ats-resume-checker" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.toolLinks.atsChecker')}
                </Link>
              </li>
              <li>
                <Link to="/resume-translator" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.toolLinks.translator')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/premium" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.premium')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              {SHOW_PILLAR_FOOTER_LINK && (
                <li>
                  <Link to="/resume-translator" className="text-gray-400 hover:text-white transition-colors">
                    Best Resume Translators
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/legal/privacy" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/legal/terms" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.terms')}
                </Link>
              </li>
              <li>
                <Link to="/legal/refund" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.refund')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {t('footer.copyright')}
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0 flex items-center">
              {t('footer.madeWith')} <Heart className="w-4 h-4 text-red-500 mx-1" /> {t('footer.inCostaRica')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
