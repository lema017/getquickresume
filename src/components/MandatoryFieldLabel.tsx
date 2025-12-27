interface MandatoryFieldLabelProps {
  label: string;
  required?: boolean;
  className?: string;
}

export function MandatoryFieldLabel({ label, required = false, className = '' }: MandatoryFieldLabelProps) {
  return (
    <label className={`block text-sm font-medium text-gray-700 mb-2 ${className}`}>
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

