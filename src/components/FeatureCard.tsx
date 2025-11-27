import React from 'react';
import { Info } from 'lucide-react';
import { IconWrapper } from './IconWrapper';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  badge?: string;
  tokens?: number;
  onClick?: () => void;
}

export function FeatureCard({ icon, title, description, badge, tokens, onClick }: FeatureCardProps) {
  return (
    <div 
      className={`p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group ${
        onClick ? 'cursor-pointer hover:scale-[1.02]' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
          <IconWrapper name={icon} className="w-7 h-7 text-white" />
        </div>
        
        <div className="flex items-center gap-2">
          {tokens && (
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {tokens} tokens
            </div>
          )}
          {onClick && (
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <Info className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
            </div>
          )}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-3">
        {title}
        {badge && (
          <span className="ml-3 inline-flex items-center rounded-full bg-amber-100 px-3 py-0.5 text-xs font-medium text-amber-800">
            {badge}
          </span>
        )}
      </h3>
      
      <p className="text-slate-600 leading-relaxed mb-4">
        {description}
      </p>
      
      {onClick && (
        <div className="text-sm text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
          Haz clic para más detalles →
        </div>
      )}
    </div>
  );
}