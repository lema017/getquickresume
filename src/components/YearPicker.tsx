import { useTranslation } from 'react-i18next';

interface YearPickerProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function YearPicker({
  value,
  onChange,
  error = false,
  disabled = false,
  placeholder,
  className = '',
}: YearPickerProps) {
  const { t } = useTranslation();
  
  // Generate years from current year back 70 years (to cover education history)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 70 }, (_, i) => currentYear - i);

  const defaultPlaceholder = placeholder || t('common.selectYear', 'Select year');

  // Handle both YYYY and YYYY-MM formats by extracting just the year
  const yearValue = value && value.includes('-') ? value.split('-')[0] : value;

  return (
    <select
      value={yearValue || ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
        error
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:ring-blue-500'
      } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} ${className}`}
    >
      <option value="">{defaultPlaceholder}</option>
      {years.map((year) => (
        <option key={year} value={year.toString()}>
          {year}
        </option>
      ))}
    </select>
  );
}

