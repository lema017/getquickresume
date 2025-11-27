import React from 'react';
import { IconWrapper } from '../IconWrapper';

interface StatsCardProps {
  icon: string;
  value: number | string;
  label: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ 
  icon, 
  value, 
  label, 
  description, 
  trend, 
  className = '' 
}: StatsCardProps) {
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
      
      <div className="space-y-1">
        <div className="text-3xl font-bold text-gray-900">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        <div className="text-sm font-medium text-gray-600">
          {label}
        </div>
        {description && (
          <div className="text-xs text-gray-500">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
