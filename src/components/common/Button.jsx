import React from 'react';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ariaLabel,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-150 focus:outline-none focus:ring-4 select-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm sm:text-base px-4 py-2.5 gap-2',
    lg: 'text-base sm:text-lg px-6 py-3.5 gap-2.5',
    xl: 'text-lg sm:text-xl px-8 py-4 gap-3'
  };

  const variantStyles = {
    primary:
      'bg-slate-900 text-white hover:bg-slate-800 active:bg-black focus:ring-slate-400 border border-transparent shadow-sm',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 focus:ring-rose-300 shadow-md border border-rose-700',
    sos:
      'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-400 shadow-lg border-2 border-red-500 font-extrabold tracking-wide uppercase',
    secondary:
      'bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300 focus:ring-slate-300 border border-slate-300',
    safety:
      'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 focus:ring-emerald-300 shadow-sm border border-emerald-700',
    outline:
      'bg-transparent border-2 border-slate-300 text-slate-700 hover:bg-slate-100 focus:ring-slate-400',
    ghost:
      'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-300'
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-busy={isLoading}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {children}
    </button>
  );
}
