import { useState, useEffect, useCallback } from 'react';

interface MonthYearPickerProps {
  value: string; // Formato: "YYYY-MM"
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  disabled?: boolean;
}

const MONTHS = [
  { value: '01', label: 'Enero' },
  { value: '02', label: 'Febrero' },
  { value: '03', label: 'Marzo' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Mayo' },
  { value: '06', label: 'Junio' },
  { value: '07', label: 'Julio' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Septiembre' },
  { value: '10', label: 'Octubre' },
  { value: '11', label: 'Noviembre' },
  { value: '12', label: 'Diciembre' },
];

export function MonthYearPicker({ 
  value, 
  onChange, 
  placeholder = "Selecciona mes y año",
  className = '',
  error = false,
  disabled = false
}: MonthYearPickerProps) {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Generar lista de años (últimos 50 años)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  // Parsear valor inicial
  useEffect(() => {
    if (value && value.includes('-')) {
      const [year, month] = value.split('-');
      setSelectedYear(year);
      setSelectedMonth(month);
    } else {
      setSelectedYear('');
      setSelectedMonth('');
    }
  }, [value]);

  const handleMonthChange = useCallback((month: string) => {
    setSelectedMonth(month);
    if (month && selectedYear) {
      onChange(`${selectedYear}-${month}`);
    } else if (!month && !selectedYear) {
      onChange('');
    }
  }, [selectedYear, onChange]);

  const handleYearChange = useCallback((year: string) => {
    setSelectedYear(year);
    if (year && selectedMonth) {
      onChange(`${year}-${selectedMonth}`);
    } else if (!year && !selectedMonth) {
      onChange('');
    }
  }, [selectedMonth, onChange]);

  return (
    <div className={`flex gap-2 ${className}`}>
      {/* Selector de Mes */}
      <select
        value={selectedMonth}
        onChange={(e) => handleMonthChange(e.target.value)}
        disabled={disabled}
        className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
      >
        <option value="">Mes</option>
        {MONTHS.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>

      {/* Selector de Año */}
      <select
        value={selectedYear}
        onChange={(e) => handleYearChange(e.target.value)}
        disabled={disabled}
        className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
      >
        <option value="">Año</option>
        {years.map((year) => (
          <option key={year} value={year.toString()}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
