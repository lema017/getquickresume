import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ArticleCTAProps {
  variant?: 'inline' | 'banner';
  title?: string;
  description?: string;
}

export function ArticleCTA({ 
  variant = 'inline',
  title = "Ready to Create Your Professional Resume?",
  description = "Skip the guesswork. GetQuickResume's AI helps you create a professional, ATS-optimized resume in minutes."
}: ArticleCTAProps) {
  if (variant === 'banner') {
    return (
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 my-12">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,white)]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-sm font-medium text-white">AI-Powered Resume Builder</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {title}
          </h3>
          
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Free - No Credit Card
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  // Inline variant
  return (
    <div className="my-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Pro Tip</span>
          </div>
          <p className="text-gray-700">
            {description}
          </p>
        </div>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          Try GetQuickResume
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

