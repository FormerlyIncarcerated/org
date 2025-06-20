import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const buttonVariants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50 shadow-primary-sm hover:shadow-primary hover:glow-red transition-all duration-300 hover:scale-105',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/50 shadow-secondary-sm hover:shadow-secondary transition-all duration-300 hover:scale-105',
  outline: 'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground focus:ring-primary/50 shadow-primary-sm hover:shadow-primary hover:glow-red transition-all duration-300 hover:scale-105',
  ghost: 'hover:bg-accent hover:text-accent-foreground focus:ring-ring/50 hover:shadow-accent-sm transition-all duration-300 hover:scale-105',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive/50 shadow-lg hover:shadow-xl hover:glow-red transition-all duration-300 hover:scale-105',
};

const buttonSizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
  xl: 'h-12 px-8 text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileHover={!isDisabled ? {
        scale: 1.05,
        boxShadow: variant === 'primary' ? '0 0 25px rgb(var(--shadow-primary) / 0.6)' :
                   variant === 'secondary' ? '0 0 25px rgb(var(--shadow-secondary) / 0.6)' :
                   variant === 'outline' ? '0 0 25px rgb(var(--shadow-primary) / 0.4)' :
                   '0 0 20px rgb(var(--shadow-accent) / 0.4)'
      } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      className={clsx(
        // Base styles
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
        'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
        'relative overflow-hidden',

        // Variant styles
        buttonVariants[variant],

        // Size styles
        buttonSizes[size],

        // Full width
        fullWidth && 'w-full',

        className
      )}
      disabled={isDisabled}
      {...(props as any)}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" data-testid="loader" />
      ) : (
        leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
      )}
      
      {children && <span>{children}</span>}
      
      {!loading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </motion.button>
  );
};

export default Button;
