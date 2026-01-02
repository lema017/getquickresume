import { Trophy, Star, Sparkles, CheckCircle2 } from 'lucide-react';

interface OptimizedBadgeProps {
  isOptimized: boolean;
  completionPercentage: number;
  totalScore: number;
}

export function OptimizedBadge({ isOptimized, completionPercentage, totalScore }: OptimizedBadgeProps) {
  if (!isOptimized) {
    return null;
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-xl p-6 text-white shadow-lg">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute right-1/4 top-1/2 w-16 h-16 bg-white/5 rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center gap-4">
        {/* Trophy icon with glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-400/30 blur-xl rounded-full" />
          <div className="relative bg-gradient-to-br from-yellow-300 to-amber-400 p-3 rounded-full shadow-lg">
            <Trophy className="w-8 h-8 text-amber-800" />
          </div>
        </div>

        {/* Text content */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">Resume Optimized!</h3>
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
          </div>
          <p className="text-green-100 text-sm mt-1">
            Your resume meets all required criteria and is ready to impress recruiters.
          </p>
        </div>

        {/* Score display */}
        <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
          <div className="text-3xl font-bold">{totalScore.toFixed(1)}</div>
          <div className="text-xs text-green-100 uppercase tracking-wide">Score</div>
        </div>
      </div>

      {/* Stats row */}
      <div className="relative z-10 flex items-center gap-6 mt-4 pt-4 border-t border-white/20">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-200" />
          <span className="text-sm">{completionPercentage}% Complete</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-300" />
          <span className="text-sm">All required criteria met</span>
        </div>
      </div>
    </div>
  );
}

interface ProgressToOptimizedProps {
  completionPercentage: number;
  requiredRemaining: number;
  totalScore: number;
}

export function ProgressToOptimized({ completionPercentage, requiredRemaining, totalScore }: ProgressToOptimizedProps) {
  const isClose = completionPercentage >= 75;
  const isMidway = completionPercentage >= 50;

  return (
    <div className={`rounded-xl p-5 ${
      isClose 
        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200' 
        : isMidway
          ? 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200'
          : 'bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${
            isClose ? 'bg-blue-100' : isMidway ? 'bg-amber-100' : 'bg-gray-100'
          }`}>
            <Trophy className={`w-5 h-5 ${
              isClose ? 'text-blue-600' : isMidway ? 'text-amber-600' : 'text-gray-500'
            }`} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Progress to Optimized</h4>
            <p className="text-sm text-gray-600">
              {requiredRemaining === 0 
                ? `Improve your score to 8.0+ to unlock "Optimized" status`
                : `Complete ${requiredRemaining} required ${requiredRemaining === 1 ? 'item' : 'items'} to continue`
              }
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{totalScore.toFixed(1)}</div>
          <div className="text-xs text-gray-500">/ 10</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${
            isClose 
              ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
              : isMidway
                ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                : 'bg-gradient-to-r from-gray-400 to-slate-500'
          }`}
          style={{ width: `${completionPercentage}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>{completionPercentage}% complete</span>
        <span>{100 - completionPercentage}% to go</span>
      </div>
    </div>
  );
}

