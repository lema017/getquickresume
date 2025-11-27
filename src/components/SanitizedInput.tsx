import { useState, useEffect } from 'react';

interface SanitizedInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  type?: 'text' | 'email' | 'url';
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function SanitizedInput({ 
  value, 
  onChange, 
  placeholder, 
  className = '', 
  error = false,
  type = 'text',
  onKeyPress
}: SanitizedInputProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const sanitizeValue = (inputValue: string): string => {
    // Caracteres básicos permitidos: letras, números, espacios, puntos, comas, guiones, paréntesis, arroba, símbolos básicos
    const allowedRegex = /[a-zA-Z0-9\s.,\-+()/@<>=:áéíóúÁÉÍÓÚñÑüÜ]/g;
    return inputValue.match(allowedRegex)?.join('') || '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const sanitizedValue = sanitizeValue(inputValue);
    
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
    
    // Permitir caracteres básicos
    const allowedChars = /[a-zA-Z0-9\s.,\-+()/@<>=:áéíóúÁÉÍÓÚñÑüÜ]/;
    if (!allowedChars.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <input
      type={type}
      value={displayValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
        error ? 'border-red-500 focus:ring-red-500' : 'border-blue-300 focus:ring-blue-500'
      } ${className}`}
    />
  );
}
