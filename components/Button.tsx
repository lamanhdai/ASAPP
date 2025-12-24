import { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'danger';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: Variant;
  type?: 'button' | 'submit' | 'reset';
  className?: string; // Add optional className
}

export function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  type = 'button',
  className = '', // Default to empty string
}: Props) {
  const base = 'px-4 py-2 rounded font-medium focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed';
  const styles: Record<Variant, string> = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  return (
    <button
      type={type}
      className={`${base} ${styles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
