import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Button } from './Button';
import { clsx } from 'clsx';
import type { ThemeVariant } from '@/types/theme';

export interface ThemeToggleProps {
  variant?: 'button' | 'dropdown' | 'compact';
  showLabel?: boolean;
  className?: string;
}

const themeColors: Record<ThemeVariant, string> = {
  dark: 'bg-red-700',
  violet: 'bg-violet-600',
  emerald: 'bg-emerald-600',
  amber: 'bg-amber-600',
  aurora: 'bg-purple-600',
};

const themeLabels: Record<ThemeVariant, string> = {
  dark: 'Dark Red',
  violet: 'Violet',
  emerald: 'Emerald',
  amber: 'Amber',
  aurora: 'Aurora',
};

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'dropdown',
  showLabel = true,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, availableThemes, themeConfig } = useTheme();
  
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const handleThemeChange = (newTheme: ThemeVariant) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (variant === 'button') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const currentIndex = availableThemes.indexOf(theme);
          const nextIndex = (currentIndex + 1) % availableThemes.length;
          const nextTheme = availableThemes[nextIndex];
          if (nextTheme) {
            setTheme(nextTheme);
          }
        }}
        leftIcon={<Palette className="h-4 w-4" />}
        className={className}
      >
        {showLabel && themeConfig.name}
      </Button>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={clsx('flex items-center gap-1', className)}>
        {availableThemes.map((themeOption) => (
          <button
            key={themeOption}
            onClick={() => setTheme(themeOption)}
            className={clsx(
              'w-6 h-6 rounded-full border-2 transition-all duration-200',
              themeColors[themeOption],
              theme === themeOption
                ? 'border-foreground scale-110'
                : 'border-border hover:border-foreground/50'
            )}
            title={themeLabels[themeOption]}
          >
            {theme === themeOption && (
              <Check className="h-3 w-3 text-white mx-auto" />
            )}
          </button>
        ))}
      </div>
    );
  }

  // Default dropdown variant
  return (
    <div className={clsx('relative', className)} ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleDropdown}
        leftIcon={<Palette className="h-4 w-4" />}
      >
        {showLabel && themeConfig.name}
      </Button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-lg bg-card border border-border shadow-lg z-50"
          >
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground px-3 py-1 mb-1">
                Choose Theme
              </div>
              {availableThemes.map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => handleThemeChange(themeOption)}
                  className={clsx(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                    theme === themeOption
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground text-card-foreground'
                  )}
                >
                  <div
                    className={clsx(
                      'w-4 h-4 rounded-full border-2',
                      themeColors[themeOption],
                      theme === themeOption ? 'border-primary-foreground' : 'border-border'
                    )}
                  />
                  <span className="flex-1 text-left">
                    {themeLabels[themeOption]}
                  </span>
                  {theme === themeOption && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;
