# Theme System

The FUSED GAMING boilerplate includes a comprehensive theme system with 5 beautiful themes that can be switched dynamically.

## Available Themes

### 1. Dark (Default)
- **Primary**: Red accent colors
- **Background**: Dark grays and blacks
- **Use Case**: Classic gaming aesthetic

### 2. Violet
- **Primary**: Purple and violet tones
- **Background**: Dark with purple accents
- **Use Case**: Modern, sophisticated look

### 3. Emerald
- **Primary**: Green and emerald colors
- **Background**: Dark with green accents
- **Use Case**: Nature-inspired, calming

### 4. Amber
- **Primary**: Orange and amber tones
- **Background**: Dark with warm accents
- **Use Case**: Energetic, warm feeling

### 5. Aurora
- **Primary**: Purple gradient effects
- **Background**: Dark with gradient accents
- **Use Case**: Futuristic, dynamic appearance

## Implementation

### CSS Custom Properties

Each theme is defined using CSS custom properties in `src/styles/themes.css`:

```css
[data-theme="dark"] {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 0 72.2% 50.6%;
  --primary-foreground: 0 85.7% 97.3%;
  /* ... more properties */
}
```

### Theme Context

The theme system is managed through React Context:

```typescript
import { useTheme } from '@/context/ThemeContext';

function MyComponent() {
  const { theme, setTheme, availableThemes } = useTheme();
  
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      {availableThemes.map(theme => (
        <option key={theme} value={theme}>{theme}</option>
      ))}
    </select>
  );
}
```

### Theme Configuration

Themes are configured in `src/utils/themeConfig.ts`:

```typescript
export const themes = {
  dark: {
    name: 'Dark',
    value: 'dark',
    colors: {
      primary: 'hsl(0, 72.2%, 50.6%)',
      background: 'hsl(0, 0%, 3.9%)',
      // ... more colors
    }
  },
  // ... other themes
};
```

## Using Themes

### In Components

Use Tailwind CSS classes that reference theme variables:

```tsx
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground hover:bg-primary/90">
    Themed Button
  </button>
</div>
```

### Custom Theme Colors

Access theme colors in your CSS:

```css
.custom-element {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: 1px solid hsl(var(--border));
}
```

### Dynamic Theme Switching

The theme can be changed programmatically:

```typescript
const { setTheme } = useTheme();

// Switch to violet theme
setTheme('violet');

// Get current theme
const { theme } = useTheme();
console.log(theme); // 'violet'
```

## Color Palette

### Core Colors

Each theme includes these core color variables:

- `--background` - Main background color
- `--foreground` - Main text color
- `--primary` - Primary brand color
- `--primary-foreground` - Text on primary color
- `--secondary` - Secondary color
- `--secondary-foreground` - Text on secondary color
- `--accent` - Accent color for highlights
- `--accent-foreground` - Text on accent color
- `--muted` - Muted background color
- `--muted-foreground` - Muted text color
- `--border` - Border color
- `--input` - Input background color
- `--ring` - Focus ring color

### Semantic Colors

- `--destructive` - Error/danger color
- `--destructive-foreground` - Text on destructive color
- `--warning` - Warning color
- `--success` - Success color
- `--info` - Information color

### Shadow Colors

Special shadow colors for glowing effects:

- `--shadow-primary` - Primary glow color
- `--shadow-secondary` - Secondary glow color
- `--shadow-accent` - Accent glow color

## Creating Custom Themes

### 1. Define CSS Variables

Add your theme to `src/styles/themes.css`:

```css
[data-theme="custom"] {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 142.1 76.2% 36.3%;
  --primary-foreground: 355.7 100% 97.3%;
  /* ... define all required variables */
}
```

### 2. Update Theme Configuration

Add your theme to `src/utils/themeConfig.ts`:

```typescript
export const themes = {
  // ... existing themes
  custom: {
    name: 'Custom',
    value: 'custom',
    colors: {
      primary: 'hsl(142.1, 76.2%, 36.3%)',
      background: 'hsl(240, 10%, 3.9%)',
      // ... more colors
    }
  }
};
```

### 3. Update Type Definitions

Add your theme to `src/types/theme.ts`:

```typescript
export type ThemeName = 'dark' | 'violet' | 'emerald' | 'amber' | 'aurora' | 'custom';
```

## Best Practices

### Consistent Color Usage

- Always use theme variables instead of hardcoded colors
- Test all themes to ensure proper contrast
- Use semantic color names for better maintainability

### Accessibility

- Ensure sufficient contrast ratios (WCAG AA compliance)
- Test with screen readers
- Provide theme selection for user preferences

### Performance

- CSS custom properties are efficient for theme switching
- Avoid JavaScript-based theme switching for better performance
- Use CSS transitions for smooth theme changes

### Testing Themes

Test your components across all themes:

```typescript
// In your tests
import { render } from '@/test/utils';
import { ThemeProvider } from '@/context/ThemeContext';

test('component works with all themes', () => {
  const themes = ['dark', 'violet', 'emerald', 'amber', 'aurora'];
  
  themes.forEach(theme => {
    render(
      <ThemeProvider defaultTheme={theme}>
        <MyComponent />
      </ThemeProvider>
    );
    // ... test assertions
  });
});
```

## Advanced Features

### Theme Persistence

Themes are automatically saved to localStorage:

```typescript
// Theme preference is automatically persisted
const { theme } = useTheme(); // Restored from localStorage
```

### System Theme Detection

The theme system can detect system preferences:

```typescript
// Automatically use system dark/light preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
```

### Theme Transitions

Smooth transitions between themes:

```css
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```
