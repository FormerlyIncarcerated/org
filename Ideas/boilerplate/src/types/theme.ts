export type ThemeVariant = 'dark' | 'violet' | 'emerald' | 'amber' | 'aurora';

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

export interface ThemeConfig {
  name: string;
  variant: ThemeVariant;
  colors: ThemeColors;
  isDark: boolean;
}

export interface ThemeContextType {
  theme: ThemeVariant;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeVariant) => void;
  toggleTheme: () => void;
  availableThemes: ThemeVariant[];
}

export const THEME_STORAGE_KEY = 'fused-gaming-theme';
export const DEFAULT_THEME: ThemeVariant = 'dark';
