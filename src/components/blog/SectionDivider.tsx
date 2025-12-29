import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionDividerProps {
  children: ReactNode;
  icon?: LucideIcon;
}

export function SectionDivider({ children, icon: Icon }: SectionDividerProps) {
  return (
    <div className="not-prose mt-16 mb-8">
      <div className="flex items-center gap-3 mb-3">
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Icon className="w-4 h-4 text-blue-600" />
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{children}</h2>
      </div>
      <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
    </div>
  );
}

