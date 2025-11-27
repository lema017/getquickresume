import { AlertCircle } from 'lucide-react';

interface ValidationErrorProps {
  message: string;
  className?: string;
}

export function ValidationError({ message, className = '' }: ValidationErrorProps) {
  if (!message) return null;

  return (
    <div className={`flex items-center space-x-2 text-red-600 text-sm mt-1 ${className}`}>
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}
