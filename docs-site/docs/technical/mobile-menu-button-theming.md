# Mobile Menu Button Theming

## Overview

The mobile menu button has been redesigned to be fully themeable using CSS custom properties instead of hardcoded Tailwind classes. This allows for complete customization through CSS variables and theme inheritance.

## CSS Custom Properties

### Size and Layout Variables

```css
:root {
  /* Button dimensions */
  --mobile-button-size: 2.25rem;          /* 36px - overall button size */
  --mobile-button-padding: 0.5rem;        /* 8px - internal padding */
  --mobile-button-border-radius: var(--radius); /* border radius */
  --mobile-button-border-width: 1px;      /* border thickness */
  
  /* Icon size */
  --mobile-icon-size: 1.25rem;           /* 20px - hamburger icon size */
}
```

### Color Variables (Inherited from Theme)

The button automatically inherits colors from the current theme through these CSS custom properties:

```css
/* Background colors */
--button-bg: hsl(var(--background))                    /* Default background */
--button-hover-bg: hsl(var(--accent))                  /* Hover background */
--button-active-bg: hsl(var(--muted))                  /* Active/pressed background */

/* Text/icon colors */
--button-color: hsl(var(--foreground))                 /* Default text/icon color */
--button-hover-color: hsl(var(--accent-foreground))    /* Hover text/icon color */

/* Border colors */
border-color: hsl(var(--border))                       /* Default border */
--button-hover-border: hsl(var(--border))              /* Hover border */

/* Focus ring */
--button-focus-outline: 2px solid hsl(var(--ring))     /* Focus outline */
--button-focus-offset: 2px                             /* Focus outline offset */
```

### Transition and Animation Variables

```css
/* Transitions */
--button-transition: all 0.2s ease-in-out              /* Default transition */
--icon-transition: color 0.2s ease-in-out              /* Icon color transition */

/* Active state transform */
--button-active-transform: translateY(1px)              /* Press down effect */

/* Disabled state */
--button-disabled-opacity: 0.5                         /* Disabled opacity */
```

## Customization Examples

### Example 1: Larger Button with Custom Colors

```css
:root {
  /* Make button larger */
  --mobile-button-size: 3rem;
  --mobile-icon-size: 1.5rem;
  --mobile-button-padding: 0.75rem;
  
  /* Custom colors */
  --button-bg: hsl(220 13% 18%);
  --button-hover-bg: hsl(220 13% 25%);
  --button-color: hsl(210 40% 80%);
}
```

### Example 2: Rounded Button with Glow Effect

```css
:root {
  /* Fully rounded */
  --mobile-button-border-radius: 50%;
  
  /* Add glow effect */
  --button-transition: all 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.mobile-menu-button:hover {
  box-shadow: 0 0 20px hsl(var(--primary) / 0.3);
}
```

### Example 3: Theme-Specific Customization

```css
/* Light theme customization */
:root {
  --mobile-button-border-width: 2px;
  --button-bg: hsl(var(--card));
  --button-hover-bg: hsl(var(--primary) / 0.1);
}

/* Dark theme customization */
.dark {
  --mobile-button-border-width: 1px;
  --button-bg: hsl(var(--background));
  --button-hover-bg: hsl(var(--accent));
}
```

### Example 4: Container-Based Theming

You can also apply theming through container classes:

```css
/* Custom theme container */
.theme-custom .mobile-menu-button {
  --mobile-button-size: 2.5rem;
  --mobile-icon-size: 1.375rem;
  --button-bg: #1a365d;
  --button-hover-bg: #2d5a87;
  --button-color: #e2e8f0;
}
```

## Implementation Details

### HTML Structure

```html
<button
  className="mobile-menu-button"
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
  aria-expanded={isMenuOpen}
>
  {isMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
</button>
```

### CSS Classes

- `.mobile-menu-button` - Main button styling
- `.menu-icon` - Icon styling (hamburger/close icons)

### Responsive Behavior

The button is automatically hidden on desktop screens (768px and above) and shown on mobile screens using CSS media queries:

```css
.mobile-menu-button {
  display: none; /* Hidden by default */
}

@media (max-width: 767px) {
  .mobile-menu-button {
    display: inline-flex; /* Shown on mobile */
  }
}
```

## Accessibility Features

The button includes proper accessibility attributes:

- `aria-label` - Descriptive label for screen readers
- `aria-expanded` - Indicates menu state
- `focus-visible` styles - Keyboard navigation support
- Proper color contrast through theme variables

## Migration from Previous Implementation

### Before (Hardcoded Styling)
```jsx
<Button
  variant="ghost"
  size="sm"
  className="md:hidden"
  onClick={() => setIsMenuOpen(!isMenuOpen)}
>
  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
</Button>
```

### After (Themeable)
```jsx
<button
  className="mobile-menu-button"
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
  aria-expanded={isMenuOpen}
>
  {isMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
</button>
```

## Benefits

1. **Full Theme Integration** - Automatically inherits from current theme
2. **CSS Custom Properties** - Easy customization without JavaScript
3. **Container-Based Theming** - Can be styled through parent containers
4. **No Hardcoded Values** - All styling controlled through variables
5. **Better Accessibility** - Proper ARIA attributes and focus management
6. **Responsive by Default** - Built-in mobile/desktop visibility handling
