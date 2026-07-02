import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed';

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs rounded-full',
  md: 'px-5 py-3 text-sm rounded-full',
  lg: 'px-6 py-4 text-base rounded-full',
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-brand-primary text-white hover:bg-brand-hover border border-transparent shadow-sm',
  secondary: 'border border-gray-300 text-gray-700 hover:bg-slate-50 bg-white shadow-sm',
  danger: 'border border-red-300 text-red-600 hover:bg-red-50 bg-white shadow-sm',
  ghost: 'text-gray-600 hover:bg-gray-100 bg-transparent',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon, iconPosition = 'left', fullWidth = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className || ''}`}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
