/**
 * Development-only component for quickly loading mock resume data
 * 
 * This component is ONLY visible in development mode (import.meta.env.DEV)
 * and will be completely tree-shaken out of production builds.
 */

import { useState } from 'react';
import { Beaker, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { 
  generateDevMockResume, 
  MOCK_RESUME_SIZE_INFO,
  type MockResumeSize 
} from '@/utils/devMockResumeData';
import type { ResumeData } from '@/types';

interface DevResumePreloaderProps {
  onLoadMockData: (data: Partial<ResumeData>) => void;
}

export function DevResumePreloader({ onLoadMockData }: DevResumePreloaderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState<MockResumeSize | null>(null);

  // Only render in development mode
  if (!import.meta.env.DEV) {
    return null;
  }

  const handleLoadMockData = (size: MockResumeSize) => {
    setIsLoading(size);
    
    // Small delay to show loading state and make it feel more intentional
    setTimeout(() => {
      const mockData = generateDevMockResume(size);
      onLoadMockData(mockData);
      setIsLoading(null);
      setIsExpanded(false);
    }, 300);
  };

  const sizes: MockResumeSize[] = ['small', 'medium', 'large', 'xlarge'];

  return (
    <div className="mb-6 border-2 border-dashed border-amber-400 bg-amber-50 rounded-lg overflow-hidden">
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-amber-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Beaker className="h-5 w-5 text-amber-600" />
          <span className="text-sm font-medium text-amber-800">
            🧪 DEV: Quick Fill Resume Data
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-amber-600" />
        ) : (
          <ChevronDown className="h-4 w-4 text-amber-600" />
        )}
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-amber-200">
          <p className="text-xs text-amber-700 mt-3 mb-3">
            Select a resume size to instantly fill all wizard steps with mock data:
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {sizes.map((size) => {
              const info = MOCK_RESUME_SIZE_INFO[size];
              const isLoadingThis = isLoading === size;
              
              return (
                <button
                  key={size}
                  onClick={() => handleLoadMockData(size)}
                  disabled={isLoading !== null}
                  className={`
                    relative flex flex-col items-center p-3 rounded-lg border-2 transition-all
                    ${isLoadingThis 
                      ? 'border-amber-500 bg-amber-100' 
                      : 'border-amber-300 bg-white hover:border-amber-500 hover:bg-amber-50'
                    }
                    ${isLoading !== null && !isLoadingThis ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {isLoadingThis && (
                    <div className="absolute inset-0 flex items-center justify-center bg-amber-100 bg-opacity-80 rounded-lg">
                      <Zap className="h-5 w-5 text-amber-600 animate-pulse" />
                    </div>
                  )}
                  <span className="text-sm font-semibold text-amber-900">
                    {info.label}
                  </span>
                  <span className="text-xs text-amber-600 mt-1 text-center">
                    {info.description}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-amber-600 mt-3 italic">
            ⚠️ This panel is only visible in development mode
          </p>
        </div>
      )}
    </div>
  );
}

