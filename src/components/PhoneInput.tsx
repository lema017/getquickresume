import { useState, useEffect } from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

export function PhoneInput({ value, onChange, placeholder, className = '', error = false }: PhoneInputProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Solo permitir números, espacios, guiones, paréntesis y el símbolo +
    const sanitizedValue = inputValue.replace(/[^0-9\s\-\(\)\+]/g, '');
    
    setDisplayValue(sanitizedValue);
    onChange(sanitizedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permitir teclas de control (backspace, delete, arrow keys, etc.)
    const allowedKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End', 'Tab', 'Enter', 'Escape'
    ];
    
    if (allowedKeys.includes(e.key)) {
      return;
    }
    
    // Permitir números y caracteres básicos del teléfono
    const allowedChars = /[0-9\s\-\(\)\+]/;
    if (!allowedChars.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <input
      type="tel"
      value={displayValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
        error ? 'border-red-500 focus:ring-red-500' : 'border-blue-300 focus:ring-blue-500'
      } ${className}`}
    />
  );
}
