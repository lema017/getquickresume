import { ReactNode } from 'react';

interface StepHeadingProps {
  step: number;
  children: ReactNode;
}

export function StepHeading({ step, children }: StepHeadingProps) {
  return (
    <div className="flex items-start gap-4 mt-10 mb-4 not-prose">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
        <span className="text-white font-bold text-lg">{step}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 pt-1.5 leading-tight">{children}</h3>
    </div>
  );
}

