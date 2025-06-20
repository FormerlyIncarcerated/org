import React, { createContext, useContext, useEffect, useState } from 'react';
import type { 
  ThemeVariant, 
  ThemeContextType, 
  ThemeConfig 
} from '@/types/theme';
import { 
  THEME_STORAGE_KEY, 
  DEFAULT_THEME 
} from '@/types/theme';
import { getThemeConfig, applyTheme } from '@/utils/themeConfig';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeVariant;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = DEFAULT_THEME 
}) => {
  const [theme, setThemeState] = useState<ThemeVariant>(() => {
    // Check localStorage for saved theme
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeVariant;
      if (savedTheme && ['dark', 'violet', 'emerald', 'amber', 'aurora'].includes(savedTheme)) {
        return savedTheme;
      }
    }
    return defaultTheme;
  });

  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => 
    getThemeConfig(theme)
  );

  const availableThemes: ThemeVariant[] = ['dark', 'violet', 'emerald', 'amber', 'aurora'];

  const setTheme = (newTheme: ThemeVariant) => {
    setThemeState(newTheme);
    setThemeConfig(getThemeConfig(newTheme));
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    }
    
    // Apply theme to DOM
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const currentIndex = availableThemes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    const nextTheme = availableThemes[nextIndex];
    if (nextTheme) {
      setTheme(nextTheme);
    }
  };

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    themeConfig,
    setTheme,
    toggleTheme,
    availableThemes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
