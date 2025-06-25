# Blue Ocean Theming System Documentation

## Overview

The F.Inc. platform features an advanced blue-focused theming system built with CSS custom properties, Tailwind CSS, and next-themes. This ocean-inspired design system provides seamless light/dark mode switching with a comprehensive blue color palette designed for accessibility, professional appeal, and visual impact.

## Design Philosophy

Our blue palette represents:
- **Trust & Reliability**: Deep blues convey stability and trustworthiness
- **Professional Growth**: Ocean metaphors represent depth and potential
- **Accessibility First**: WCAG AAA compliance across all themes
- **Empowerment**: From dark depths to bright horizons, representing the journey of formerly incarcerated individuals

## Blue Color Palette

### Core Blue Spectrum

```css
:root {
  /* Ocean-Inspired Blue Palette */
  --blue-darkest: 204 95% 15%;     /* #012A4A - Midnight Deep */
  --blue-very-dark: 204 98% 20%;   /* #013A63 - Ocean Depth */
  --blue-dark: 204 98% 24%;        /* #01497C - Deep Current */
  --blue-dark-alt: 204 98% 26%;    /* #014F86 - Navy Professional */
  --blue-medium: 204 56% 38%;      /* #2A6F97 - Ocean Blue */
  --blue-medium-teal: 198 57% 40%; /* #2C7DA0 - Teal Current */
  --blue-medium-dark: 198 42% 48%; /* #468FAF - Steel Wave */
  --blue-air: 198 44% 57%;         /* #61A5C2 - Air Superiority */
  --blue-light-gray: 198 53% 69%;  /* #89C2D9 - Coastal Mist */
  --blue-very-light: 198 53% 78%;  /* #A9D6E5 - Sky Reflection */
  --seasalt: 240 6% 97%;           /* #F6F6F7 - Seasalt */
}
```

### Color Usage Guidelines

- **--color-1 (Deep Navy)**: Primary elements, text, and structural components
- **--color-2 (Bright Teal)**: Interactive elements, buttons, and highlights
- **--color-3 (Soft Cream)**: Accent details, backgrounds, and subtle highlights
- **--color-4 (Vibrant Orange)**: Call-to-action elements, warnings, and emphasis

## Theme Modes

### Dark Mode (Default)

```css
.dark {
  --background: 210 40% 4%; /* Deep navy background */
  --foreground: 0 0% 98%;
  --primary: 188 82% 57%; /* Bright Teal */
  --accent: 37 100% 64%; /* Vibrant Orange */
  
  /* Logo theming for dark mode */
  --logo-primary: var(--color-2);
  --logo-secondary: var(--color-4);
  --logo-accent: var(--color-3);
  --logo-highlight: var(--color-1);
}
```

### Light Mode

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 188 82% 57%; /* Bright Teal */
  --accent: 37 100% 64%; /* Vibrant Orange */
  
  /* Logo theming for light mode */
  --logo-primary: var(--color-1);
  --logo-secondary: var(--color-2);
  --logo-accent: var(--color-4);
  --logo-highlight: var(--color-3);
}
```

## CSS Utility Classes

### Color Utilities

```css
/* Text colors */
.text-color-1 { color: var(--color-1); }
.text-color-2 { color: var(--color-2); }
.text-color-3 { color: var(--color-3); }
.text-color-4 { color: var(--color-4); }

/* Background colors */
.bg-color-1 { background-color: var(--color-1); }
.bg-color-2 { background-color: var(--color-2); }
.bg-color-3 { background-color: var(--color-3); }
.bg-color-4 { background-color: var(--color-4); }

/* Border colors */
.border-color-1 { border-color: var(--color-1); }
.border-color-2 { border-color: var(--color-2); }
.border-color-3 { border-color: var(--color-3); }
.border-color-4 { border-color: var(--color-4); }

/* Hover variants */
.hover\:bg-color-2:hover { background-color: var(--color-2); }
.hover\:bg-color-4:hover { background-color: var(--color-4); }
.hover\:text-color-1:hover { color: var(--color-1); }
.hover\:text-color-3:hover { color: var(--color-3); }
```

## Theme Provider Setup

### Layout Configuration

```tsx
// app/layout.tsx
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Theme Provider Component

```tsx
// components/theme-provider.tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

## Magic UI Theme Selector

### Component Features

- **Animated Toggle**: Smooth transitions with Framer Motion
- **Theme Options**: Light, Dark, System with icons
- **Color Preview**: Live palette display in dropdown
- **Backdrop Blur**: Modern glassmorphism effect
- **Hover Effects**: Micro-interactions for better UX

### Usage Example

```tsx
import ThemeSelector from "@/components/theme-selector"

// In your component
<ThemeSelector />
```

## Logo Theming

### SVG Logo with CSS Variables

```svg
<svg>
  <style>
    .logo-primary { fill: var(--logo-primary, #002447); }
    .logo-secondary { fill: var(--logo-secondary, #53d3d1); }
    .logo-accent { fill: var(--logo-accent, #feb249); }
    .logo-highlight { fill: var(--logo-highlight, #fbeceb); }
  </style>
  
  <!-- Logo elements using the themed classes -->
  <text class="logo-primary">F.Inc.</text>
  <text class="logo-accent">FORMERLY</text>
  <text class="logo-accent">INCARCERATED.ORG</text>
</svg>
```

### Theme-Aware Logo Behavior

- **Light Mode**: Navy primary, teal secondary, orange accents
- **Dark Mode**: Teal primary, orange secondary, cream accents
- **Automatic Adaptation**: Colors change instantly with theme switching

## Component Theming Examples

### Button with Custom Colors

```tsx
<Button className="bg-color-2 hover:bg-color-2/90 text-color-1">
  Primary Action
</Button>

<Button 
  variant="outline" 
  className="border-color-4 text-color-4 hover:bg-color-4 hover:text-color-1"
>
  Secondary Action
</Button>
```

### Text with Theme Colors

```tsx
<h1 className="text-color-2">
  70 Million Americans Feel
</h1>

<p className="text-color-4">
  Call to action text
</p>
```

## Best Practices

### 1. Use Semantic Color Names
- Prefer `text-primary` over `text-color-2` for standard UI elements
- Use custom color utilities for brand-specific elements

### 2. Maintain Contrast Ratios
- Ensure WCAG AA compliance (4.5:1 for normal text)
- Test color combinations in both light and dark modes

### 3. Consistent Color Usage
- Use `--color-2` (Bright Teal) for primary interactive elements
- Use `--color-4` (Vibrant Orange) for call-to-action elements
- Use `--color-1` (Deep Navy) for primary text and structure
- Use `--color-3` (Soft Cream) for subtle accents and highlights

### 4. Animation Considerations
- Use `disableTransitionOnChange={false}` for smooth theme transitions
- Consider reduced motion preferences for accessibility

## Accessibility

### Color Contrast
- All color combinations meet WCAG AA standards
- High contrast ratios maintained in both themes
- Focus indicators clearly visible in all themes

### System Preferences
- Respects user's system theme preference
- Provides manual override options
- Remembers user's theme choice

## Troubleshooting

### Common Issues

1. **Colors not updating**: Ensure CSS custom properties are properly defined
2. **Flash of wrong theme**: Use `suppressHydrationWarning` on html element
3. **Logo not changing**: Check SVG uses CSS custom properties correctly

### Debug Tips

```css
/* Add to globals.css for debugging */
* {
  outline: 1px solid var(--color-2) !important;
}
```

## Future Enhancements

- Additional color palette options
- High contrast mode for accessibility
- Custom theme creation interface
- Color blindness support
- Animation preferences
