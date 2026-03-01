import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, User, LogOut, Globe, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Avatar } from './Avatar';
import { formatName } from '@/utils/textFormatting';

export function Header() {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold text-gray-900">GetQuickResume</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Navigation for authenticated users */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/dashboard') ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  Dashboard
                </Link>
                
                <Link
                  to="/wizard"
                  className={`text-sm font-medium transition-colors ${
                    location.pathname.startsWith('/wizard') ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {t('nav.create')}
                </Link>
                
                <Link
                  to="/blog"
                  className={`text-sm font-medium transition-colors ${
                    location.pathname.startsWith('/blog') ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {t('nav.blog')}
                </Link>
                
                <Link
                  to="/premium"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/premium') ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {t('nav.premium')}
                </Link>
                
                <Link
                  to="/support"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/support') ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {t('nav.support')}
                </Link>
              </>
            ) : (
              /* Navigation for non-authenticated users */
              <>
                <Link
                  to="/"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/') ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {t('nav.home')}
                </Link>
                
                <Link
                  to="/blog"
                  className={`text-sm font-medium transition-colors ${
                    location.pathname.startsWith('/blog') ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {t('nav.blog')}
                </Link>
                
                <Link
                  to="/premium"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/premium') ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {t('nav.premium')}
                </Link>
                
                <Link
                  to="/contact"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/contact') ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {t('nav.contact')}
                </Link>
                
                <Link
                  to="/about"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/about') ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {t('nav.about')}
                </Link>
              </>
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                i18n.language === 'es' 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100' 
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
              title={i18n.language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {i18n.language === 'es' ? '🇪🇸 ES' : '🇺🇸 EN'}
              </span>
            </button>

            {/* User Menu / Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  <Avatar
                    src={user?.avatarUrl}
                    alt={user?.fullName || 'User avatar'}
                    size="md"
                  />
                  <span className="hidden sm:block">{user?.fullName ? formatName(user.fullName) : ''}</span>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <Link
                      to="/account"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      {t('nav.account')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      {t('account.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full font-semibold text-sm hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
              >
                {t('landing.hero.ctaPrimary')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
              aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {/* Mobile navigation for authenticated users */}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.dashboard')}
                  </Link>
                  
                  <Link
                    to="/wizard/step-1"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.create')}
                  </Link>
                  
                  <Link
                    to="/blog"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.blog')}
                  </Link>
                  
                  <Link
                    to="/premium"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.premium')}
                  </Link>
                  
                  <Link
                    to="/support"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.support')}
                  </Link>
                </>
              ) : (
                /* Mobile navigation for non-authenticated users */
                <>
                  <Link
                    to="/"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.home')}
                  </Link>
                  
                  <Link
                    to="/blog"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.blog')}
                  </Link>
                  
                  <Link
                    to="/premium"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.premium')}
                  </Link>
                  
                  <Link
                    to="/contact"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.contact')}
                  </Link>
                  
                  <Link
                    to="/about"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.about')}
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
