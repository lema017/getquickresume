import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { User, Crown, Download, Settings, LogOut, Globe, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Avatar } from '@/components/Avatar';

export function AccountPage() {
  const { t } = useTranslation();
  const { user, logout, refreshTokens } = useAuthStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tokensLoading, setTokensLoading] = useState(true);

  // Fetch tokens on component mount
  useEffect(() => {
    const loadTokens = async () => {
      if (user) {
        await refreshTokens();
        setTokensLoading(false);
      }
    };
    loadTokens();
  }, [user?.id, refreshTokens]);

  const handleRefreshTokens = async () => {
    setIsRefreshing(true);
    try {
      await refreshTokens();
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <Avatar
              src={user.avatarUrl}
              alt={user.fullName || 'User avatar'}
              size="xl"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {user.firstName && user.lastName 
                  ? `${user.firstName} ${user.lastName}` 
                  : user.fullName || 'Usuario'
                }
              </h1>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center mt-2">
                {user.isPremium ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Free
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Información del Perfil
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <p className="text-gray-900">
                    {user.firstName && user.lastName 
                      ? `${user.firstName} ${user.lastName}` 
                      : user.fullName || 'No especificado'
                    }
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ubicación
                  </label>
                  <p className="text-gray-900">
                    {user.city && user.country 
                      ? `${user.city}, ${user.country}` 
                      : user.location || 'No especificada'
                    }
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Función objetivo
                  </label>
                  <p className="text-gray-900">{user.profession || user.targetFunction || 'No especificada'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proveedor de autenticación
                  </label>
                  <p className="text-gray-900 capitalize">{user.provider}</p>
                </div>
              </div>
            </div>

            {/* Recent Downloads */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Descargas Recientes
              </h2>
              <div className="text-center py-8">
                <Download className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No hay descargas recientes</p>
                <Link
                  to="/wizard/step-1"
                  className="btn-primary mt-4 inline-block"
                >
                  Crear mi primer CV
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tokens */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('account.tokens')}
                </h3>
                <button
                  onClick={handleRefreshTokens}
                  disabled={isRefreshing}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                  title="Actualizar tokens"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {tokensLoading || isRefreshing ? '...' : user?.tokens?.toLocaleString() || '0'}
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Tokens disponibles
                </p>
                <Link
                  to="/premium"
                  className="btn-primary w-full"
                >
                  Comprar más tokens
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Acciones Rápidas
              </h3>
              <div className="space-y-3">
                <Link
                  to="/wizard/step-1"
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5 mr-3" />
                  Crear nuevo CV
                </Link>
                <Link
                  to="/premium"
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Crown className="w-5 h-5 mr-3" />
                  Actualizar a Premium
                </Link>
                <button className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 mr-3" />
                  Configuración
                </button>
                <button className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Globe className="w-5 h-5 mr-3" />
                  Idioma
                </button>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Cuenta
              </h3>
              <button
                onClick={logout}
                className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                {t('account.logout')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
