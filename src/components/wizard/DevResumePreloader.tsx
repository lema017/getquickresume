/**
 * Development-only component for quickly loading mock resume data
 * 
 * This component is ONLY visible in development mode (import.meta.env.DEV)
 * and will be completely tree-shaken out of production builds.
 */

import { useState } from 'react';
import { Beaker, ChevronDown, ChevronUp, Zap, FastForward } from 'lucide-react';
import { 
  generateDevMockResume, 
  MOCK_RESUME_SIZE_INFO,
  type MockResumeSize 
} from '@/utils/devMockResumeData';
import type { ResumeData } from '@/types';

interface DevResumePreloaderProps {
  onLoadMockData: (data: Partial<ResumeData>) => void;
  onNavigateToPreview?: () => void;
}

export function DevResumePreloader({ onLoadMockData, onNavigateToPreview }: DevResumePreloaderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState<MockResumeSize | null>(null);
  const [loadedSize, setLoadedSize] = useState<MockResumeSize | null>(null);

  // Only render in development mode
  if (!import.meta.env.DEV) {
    return null;
  }

  const handleLoadMockData = (size: MockResumeSize) => {
    setIsLoading(size);
    
    setTimeout(() => {
      const mockData = generateDevMockResume(size);
      onLoadMockData(mockData);
      setIsLoading(null);
      setLoadedSize(size);
    }, 300);
  };

  const handleSkipToStep7 = () => {
    if (!loadedSize) {
      const mockData = generateDevMockResume('small');
      onLoadMockData(mockData);
    }
    onNavigateToPreview?.();
  };

  const sizes: MockResumeSize[] = ['small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge'];

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
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {sizes.map((size) => {
              const info = MOCK_RESUME_SIZE_INFO[size];
              const isLoadingThis = isLoading === size;
              const isLoaded = loadedSize === size;
              
              return (
                <button
                  key={size}
                  onClick={() => handleLoadMockData(size)}
                  disabled={isLoading !== null}
                  className={`
                    relative flex flex-col items-center p-3 rounded-lg border-2 transition-all
                    ${isLoadingThis 
                      ? 'border-amber-500 bg-amber-100' 
                      : isLoaded
                        ? 'border-green-500 bg-green-50'
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

          {onNavigateToPreview && (
            <button
              onClick={handleSkipToStep7}
              disabled={isLoading !== null}
              className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-indigo-400 bg-indigo-50 text-indigo-800 font-medium text-sm hover:bg-indigo-100 hover:border-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FastForward className="h-4 w-4" />
              {loadedSize ? `Skip to Step 7 (${loadedSize} loaded)` : 'Fill (small) & Skip to Step 7'}
            </button>
          )}

          <p className="text-xs text-amber-600 mt-3 italic">
            ⚠️ This panel is only visible in development mode
          </p>
        </div>
      )}
    </div>
  );
}

