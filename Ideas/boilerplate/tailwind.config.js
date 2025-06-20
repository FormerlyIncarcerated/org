/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // FUSED GAMING Brand Colors
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        // Theme-specific colors (CSS variables)
        background: 'rgb(var(--color-background))',
        foreground: 'rgb(var(--color-foreground))',
        card: 'rgb(var(--color-card))',
        'card-foreground': 'rgb(var(--color-card-foreground))',
        popover: 'rgb(var(--color-popover))',
        'popover-foreground': 'rgb(var(--color-popover-foreground))',
        muted: 'rgb(var(--color-muted))',
        'muted-foreground': 'rgb(var(--color-muted-foreground))',
        accent: 'rgb(var(--color-accent))',
        'accent-foreground': 'rgb(var(--color-accent-foreground))',
        destructive: 'rgb(var(--color-destructive))',
        'destructive-foreground': 'rgb(var(--color-destructive-foreground))',
        border: 'rgb(var(--color-border))',
        input: 'rgb(var(--color-input))',
        ring: 'rgb(var(--color-ring))',

        // Shadow colors for enhanced depth
        'shadow-primary': 'rgb(var(--shadow-primary))',
        'shadow-secondary': 'rgb(var(--shadow-secondary))',
        'shadow-accent': 'rgb(var(--shadow-accent))',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        // Enhanced colored shadows
        'glow-sm': '0 0 10px rgb(var(--shadow-primary) / 0.3)',
        'glow': '0 0 20px rgb(var(--shadow-primary) / 0.4)',
        'glow-lg': '0 0 30px rgb(var(--shadow-primary) / 0.5)',
        'glow-xl': '0 0 40px rgb(var(--shadow-primary) / 0.6)',

        'primary-sm': '0 4px 14px 0 rgb(var(--shadow-primary) / 0.2)',
        'primary': '0 8px 25px 0 rgb(var(--shadow-primary) / 0.3)',
        'primary-lg': '0 12px 35px 0 rgb(var(--shadow-primary) / 0.4)',

        'secondary-sm': '0 4px 14px 0 rgb(var(--shadow-secondary) / 0.2)',
        'secondary': '0 8px 25px 0 rgb(var(--shadow-secondary) / 0.3)',
        'secondary-lg': '0 12px 35px 0 rgb(var(--shadow-secondary) / 0.4)',

        'accent-sm': '0 4px 14px 0 rgb(var(--shadow-accent) / 0.2)',
        'accent': '0 8px 25px 0 rgb(var(--shadow-accent) / 0.3)',
        'accent-lg': '0 12px 35px 0 rgb(var(--shadow-accent) / 0.4)',

        'elevated': '0 20px 40px -12px rgb(0 0 0 / 0.4), 0 0 0 1px rgb(var(--color-border))',
        'floating': '0 32px 64px -12px rgb(0 0 0 / 0.5), 0 0 0 1px rgb(var(--color-border))',
        'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
        'neon-lg': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
      },
    },
  },
  plugins: [],
}
