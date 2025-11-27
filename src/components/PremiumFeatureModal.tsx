import React from 'react';
import { X, CheckCircle, ArrowRight, Zap, Info } from 'lucide-react';
import { IconWrapper } from './IconWrapper';

interface PremiumFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    icon: string;
    title: string;
    description: string;
    detailedDescription: string;
    tokens: number;
    benefits: string[];
    howItWorks: string;
    useCases: string[];
    example: {
      before: string;
      after: string;
    };
    popular?: boolean;
  };
}

export function PremiumFeatureModal({ isOpen, onClose, feature }: PremiumFeatureModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleUseFeature = () => {
    // TODO: Implementar lógica para usar la funcionalidad
    console.log('Usar funcionalidad:', feature.title);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="relative p-8 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <IconWrapper name={feature.icon} className="w-8 h-8 text-white" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-slate-900">{feature.title}</h2>
                {feature.popular && (
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                    Popular
                  </span>
                )}
              </div>
              
              <p className="text-slate-600 text-lg mb-4">{feature.description}</p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span className="text-2xl font-bold text-blue-600">{feature.tokens}</span>
                  <span className="text-blue-600 font-medium">tokens</span>
                </div>
                <div className="text-sm text-gray-500">
                  ≈ ${(feature.tokens * 0.1).toFixed(2)} USD
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Detailed Description */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Descripción Detallada</h3>
            <p className="text-slate-600 leading-relaxed">{feature.detailedDescription}</p>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">¿Qué obtienes?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {feature.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">¿Cómo funciona?</h3>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-blue-800">{feature.howItWorks}</p>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Casos de Uso</h3>
            <div className="space-y-2">
              {feature.useCases.map((useCase, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-slate-700">{useCase}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Example Before/After */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Ejemplo Práctico</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Antes</h4>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-800 text-sm">{feature.example.before}</p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Después</h4>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-800 text-sm">{feature.example.after}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Información de Precios</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">{feature.tokens}</div>
                <div className="text-sm text-gray-600">Tokens requeridos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">${(feature.tokens * 0.1).toFixed(2)}</div>
                <div className="text-sm text-gray-600">Valor aproximado</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-600">
                  {Math.floor(150 / feature.tokens)}
                </div>
                <div className="text-sm text-gray-600">usos con paquete Essential</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={handleUseFeature}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Usar Esta Funcionalidad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
