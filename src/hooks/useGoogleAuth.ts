import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';
import { trackUserRegistered } from '@/services/marketingAnalytics';
import toast from 'react-hot-toast';

export const useGoogleAuth = () => {
  const navigate = useNavigate();
  const { login, setLoading } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async (credentialResponse: any) => {
    if (!credentialResponse.credential) {
      toast.error('No se pudo obtener el token de Google');
      return;
    }

    setIsLoading(true);
    setLoading(true);

    try {
      // Llamada real a la API
      const response = await authService.loginWithGoogle(credentialResponse.credential);
      
      // Almacenar el JWT en localStorage
      localStorage.setItem('auth-token', response.token);
      
      // Guardar datos del usuario en localStorage para validación posterior
      localStorage.setItem('user-data', JSON.stringify(response.user));
      
      // Track new user registration if account was just created (within 30 seconds)
      if (response.user.createdAt) {
        const createdAt = new Date(response.user.createdAt).getTime();
        const now = Date.now();
        const isNewUser = (now - createdAt) < 30000; // 30 seconds
        if (isNewUser) {
          trackUserRegistered('google');
        }
      }
      
      login(response.user);
      toast.success('¡Bienvenido! Iniciando sesión...');
      
      // Siempre redirigir al dashboard
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Error en login con Google:', error);
      toast.error('Error al iniciar sesión con Google');
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  const handleError = () => {
    toast.error('Error al conectar con Google');
    setIsLoading(false);
    setLoading(false);
  };

  return {
    handleGoogleLogin,
    handleError,
    isLoading
  };
};
