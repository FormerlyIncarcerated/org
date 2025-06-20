import type { ThemeVariant, ThemeConfig } from '@/types/theme';

export const themeConfigs: Record<ThemeVariant, ThemeConfig> = {
  dark: {
    name: 'Dark Red',
    variant: 'dark',
    isDark: true,
    colors: {
      background: 'rgb(8, 4, 4)',
      foreground: 'rgb(255, 250, 250)',
      card: 'rgb(20, 12, 12)',
      cardForeground: 'rgb(255, 250, 250)',
      popover: 'rgb(20, 12, 12)',
      popoverForeground: 'rgb(255, 250, 250)',
      primary: 'rgb(220, 38, 38)',
      primaryForeground: 'rgb(255, 255, 255)',
      secondary: 'rgb(60, 25, 25)',
      secondaryForeground: 'rgb(255, 250, 250)',
      muted: 'rgb(40, 20, 20)',
      mutedForeground: 'rgb(185, 160, 160)',
      accent: 'rgb(185, 28, 28)',
      accentForeground: 'rgb(255, 255, 255)',
      destructive: 'rgb(239, 68, 68)',
      destructiveForeground: 'rgb(255, 255, 255)',
      border: 'rgb(60, 25, 25)',
      input: 'rgb(30, 15, 15)',
      ring: 'rgb(220, 38, 38)',
    },
  },
  violet: {
    name: 'Violet',
    variant: 'violet',
    isDark: true,
    colors: {
      background: 'rgb(15, 15, 23)',
      foreground: 'rgb(255, 255, 255)',
      card: 'rgb(24, 24, 37)',
      cardForeground: 'rgb(255, 255, 255)',
      popover: 'rgb(24, 24, 37)',
      popoverForeground: 'rgb(255, 255, 255)',
      primary: 'rgb(139, 92, 246)',
      primaryForeground: 'rgb(255, 255, 255)',
      secondary: 'rgb(45, 45, 68)',
      secondaryForeground: 'rgb(255, 255, 255)',
      muted: 'rgb(45, 45, 68)',
      mutedForeground: 'rgb(163, 163, 163)',
      accent: 'rgb(45, 45, 68)',
      accentForeground: 'rgb(255, 255, 255)',
      destructive: 'rgb(239, 68, 68)',
      destructiveForeground: 'rgb(255, 255, 255)',
      border: 'rgb(45, 45, 68)',
      input: 'rgb(45, 45, 68)',
      ring: 'rgb(139, 92, 246)',
    },
  },
  emerald: {
    name: 'Emerald',
    variant: 'emerald',
    isDark: true,
    colors: {
      background: 'rgb(15, 23, 15)',
      foreground: 'rgb(255, 255, 255)',
      card: 'rgb(24, 37, 24)',
      cardForeground: 'rgb(255, 255, 255)',
      popover: 'rgb(24, 37, 24)',
      popoverForeground: 'rgb(255, 255, 255)',
      primary: 'rgb(16, 185, 129)',
      primaryForeground: 'rgb(255, 255, 255)',
      secondary: 'rgb(45, 68, 45)',
      secondaryForeground: 'rgb(255, 255, 255)',
      muted: 'rgb(45, 68, 45)',
      mutedForeground: 'rgb(163, 163, 163)',
      accent: 'rgb(45, 68, 45)',
      accentForeground: 'rgb(255, 255, 255)',
      destructive: 'rgb(239, 68, 68)',
      destructiveForeground: 'rgb(255, 255, 255)',
      border: 'rgb(45, 68, 45)',
      input: 'rgb(45, 68, 45)',
      ring: 'rgb(16, 185, 129)',
    },
  },
  amber: {
    name: 'Amber',
    variant: 'amber',
    isDark: true,
    colors: {
      background: 'rgb(23, 18, 15)',
      foreground: 'rgb(255, 255, 255)',
      card: 'rgb(37, 29, 24)',
      cardForeground: 'rgb(255, 255, 255)',
      popover: 'rgb(37, 29, 24)',
      popoverForeground: 'rgb(255, 255, 255)',
      primary: 'rgb(245, 158, 11)',
      primaryForeground: 'rgb(255, 255, 255)',
      secondary: 'rgb(68, 54, 45)',
      secondaryForeground: 'rgb(255, 255, 255)',
      muted: 'rgb(68, 54, 45)',
      mutedForeground: 'rgb(163, 163, 163)',
      accent: 'rgb(68, 54, 45)',
      accentForeground: 'rgb(255, 255, 255)',
      destructive: 'rgb(239, 68, 68)',
      destructiveForeground: 'rgb(255, 255, 255)',
      border: 'rgb(68, 54, 45)',
      input: 'rgb(68, 54, 45)',
      ring: 'rgb(245, 158, 11)',
    },
  },
  aurora: {
    name: 'Aurora',
    variant: 'aurora',
    isDark: true,
    colors: {
      background: 'rgb(18, 15, 23)',
      foreground: 'rgb(255, 255, 255)',
      card: 'rgb(29, 24, 37)',
      cardForeground: 'rgb(255, 255, 255)',
      popover: 'rgb(29, 24, 37)',
      popoverForeground: 'rgb(255, 255, 255)',
      primary: 'rgb(168, 85, 247)',
      primaryForeground: 'rgb(255, 255, 255)',
      secondary: 'rgb(54, 45, 68)',
      secondaryForeground: 'rgb(255, 255, 255)',
      muted: 'rgb(54, 45, 68)',
      mutedForeground: 'rgb(163, 163, 163)',
      accent: 'rgb(54, 45, 68)',
      accentForeground: 'rgb(255, 255, 255)',
      destructive: 'rgb(239, 68, 68)',
      destructiveForeground: 'rgb(255, 255, 255)',
      border: 'rgb(54, 45, 68)',
      input: 'rgb(54, 45, 68)',
      ring: 'rgb(168, 85, 247)',
    },
  },
};

export const getThemeConfig = (theme: ThemeVariant): ThemeConfig => {
  return themeConfigs[theme];
};

export const applyTheme = (theme: ThemeVariant): void => {
  const root = document.documentElement;
  
  // Remove all theme classes
  Object.keys(themeConfigs).forEach(themeKey => {
    root.classList.remove(`theme-${themeKey}`);
  });
  
  // Add the new theme class
  root.classList.add(`theme-${theme}`);
};
