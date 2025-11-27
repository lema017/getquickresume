import React from 'react';
import { IconWrapper } from './IconWrapper';

interface CreditsExplainerProps {
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export function CreditsExplainer({ features }: CreditsExplainerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div key={index} className="text-center p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
            <IconWrapper name={feature.icon} className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
          <p className="text-slate-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}