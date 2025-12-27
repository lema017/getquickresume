import React from 'react';
import { IconWrapper } from '../IconWrapper';

interface StatsCardProps {
  icon: string;
  value: number | string;
  label: string;
  description?: string;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  ctaButton?: {
    text: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  expirationDate?: string;
  className?: string;
}

export function StatsCard({ 
  icon, 
  value, 
  label, 
  description, 
  subtitle,
  trend, 
  ctaButton,
  expirationDate,
  className = '' 
}: StatsCardProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <IconWrapper name={icon} className="w-6 h-6 text-white" />
        </div>
        
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend.isPositive 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            <span>{trend.isPositive ? '↗' : '↘'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="text-3xl font-bold text-gray-900">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {subtitle && (
          <div className="text-sm text-gray-600 font-medium">
            {subtitle}
          </div>
        )}
        <div className="text-sm font-medium text-gray-600">
          {label}
        </div>
        {description && (
          <div className="text-xs text-gray-500">
            {description}
          </div>
        )}
        {expirationDate && (
          <div className="text-xs text-gray-500 mt-2">
            {expirationDate}
          </div>
        )}
        {ctaButton && (
          <button
            onClick={ctaButton.onClick}
            className={`mt-4 w-full px-4 py-2 rounded-lg font-medium transition-colors ${
              ctaButton.variant === 'secondary'
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
            }`}
          >
            {ctaButton.text}
          </button>
        )}
      </div>
    </div>
  );
}
