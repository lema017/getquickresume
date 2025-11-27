import React from 'react';

type SocialButtonProps = {
  label: string;
  icon: React.ElementType;
  onClick: () => void;
  colorClass?: string;
  disabled?: boolean;
  dataTestId?: string;
};

export function SocialButton({ label, icon: Icon, onClick, colorClass = 'bg-neutral-800 hover:bg-neutral-900', disabled = false, dataTestId }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
      className={`w-full ${colorClass} font-normal text-sm py-3 px-4 rounded-lg transition-colors duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="flex-1 text-center">{label}</span>
    </button>
  );
}

export default SocialButton;

