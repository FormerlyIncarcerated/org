# Components

Comprehensive documentation for all UI components in the FUSED GAMING boilerplate.

## UI Components

### Button

A versatile button component with multiple variants, sizes, and states.

#### Props

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}
```

#### Usage

```tsx
import { Button } from '@/components/ui/Button';
import { Send, Download } from 'lucide-react';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// With icons
<Button leftIcon={<Send className="h-4 w-4" />}>
  Send Message
</Button>

// Loading state
<Button loading>Processing...</Button>

// Full width
<Button fullWidth>Full Width Button</Button>
```

#### Variants

- **primary**: Main call-to-action button with theme primary color
- **secondary**: Secondary actions with muted styling
- **outline**: Outlined button with transparent background
- **ghost**: Minimal button with hover effects
- **destructive**: For dangerous actions (delete, remove)

### Input

A flexible input component with validation support.

#### Props

```typescript
interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}
```

#### Usage

```tsx
import { Input } from '@/components/ui/Input';
import { Mail, Eye } from 'lucide-react';

// Basic input
<Input placeholder="Enter your name" />

// With label and validation
<Input
  label="Email"
  type="email"
  placeholder="your.email@example.com"
  error={errors.email?.message}
  {...register('email')}
/>

// With icons
<Input
  leftIcon={<Mail className="h-4 w-4" />}
  placeholder="Email address"
/>

// With helper text
<Input
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
/>
```

### Card

A container component for grouping related content.

#### Props

```typescript
interface CardProps {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}
```

#### Usage

```tsx
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';

<Card hover>
  <CardHeader 
    title="Card Title" 
    subtitle="Card description"
    action={<Button size="sm">Action</Button>}
  />
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button>Confirm</Button>
  </CardFooter>
</Card>
```

### Modal

A modal dialog component with backdrop and focus management.

#### Props

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
}
```

#### Usage

```tsx
import { Modal } from '@/components/ui/Modal';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
        size="md"
      >
        <p>Modal content goes here</p>
      </Modal>
    </>
  );
}
```

### Loading

A loading spinner component with customizable size and color.

#### Props

```typescript
interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent';
  className?: string;
}
```

#### Usage

```tsx
import { Loading } from '@/components/ui/Loading';

// Basic loading spinner
<Loading />

// Different sizes
<Loading size="sm" />
<Loading size="lg" />

// Different colors
<Loading color="primary" />
<Loading color="accent" />
```

### ThemeToggle

A component for switching between available themes.

#### Usage

```tsx
import { ThemeToggle } from '@/components/ui/ThemeToggle';

// Simple theme toggle
<ThemeToggle />

// Custom styling
<ThemeToggle className="custom-theme-toggle" />
```

## Navigation Components

### Header

The main navigation header component.

#### Props

```typescript
interface HeaderProps {
  showLogo?: boolean;
  showNavigation?: boolean;
  showThemeToggle?: boolean;
  className?: string;
}
```

#### Usage

```tsx
import { Header } from '@/components/navigation/Header';

<Header 
  showLogo={true}
  showNavigation={true}
  showThemeToggle={true}
/>
```

### Footer

The footer component with links and information.

#### Props

```typescript
interface FooterProps {
  showSocial?: boolean;
  showLinks?: boolean;
  className?: string;
}
```

### Breadcrumb

A breadcrumb navigation component.

#### Props

```typescript
interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}
```

#### Usage

```tsx
import { Breadcrumb } from '@/components/navigation/Breadcrumb';

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Current Page', current: true }
];

<Breadcrumb items={breadcrumbItems} />
```

## Layout Components

### Layout

The main layout wrapper component.

#### Props

```typescript
interface LayoutProps {
  showHeader?: boolean;
  showFooter?: boolean;
  showBreadcrumb?: boolean;
  children?: React.ReactNode;
  className?: string;
}
```

### PageLayout

A layout component for individual pages.

#### Props

```typescript
interface PageLayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}
```

#### Usage

```tsx
import { PageLayout } from '@/components/layout/Layout';

<PageLayout 
  title="Page Title"
  description="Page description"
>
  <div>Page content</div>
</PageLayout>
```

### SectionLayout

A layout component for page sections.

#### Usage

```tsx
import { SectionLayout } from '@/components/layout/Layout';

<SectionLayout 
  title="Section Title"
  description="Section description"
>
  <div>Section content</div>
</SectionLayout>
```

## Component Guidelines

### Styling

- Use Tailwind CSS classes for styling
- Support theme variables for consistent theming
- Include hover and focus states
- Ensure responsive design

### Accessibility

- Include proper ARIA attributes
- Support keyboard navigation
- Provide screen reader friendly content
- Maintain proper contrast ratios

### TypeScript

- Define comprehensive prop interfaces
- Use generic types where appropriate
- Export prop types for reuse
- Include JSDoc comments for complex props

### Testing

- Write unit tests for all components
- Test different prop combinations
- Include accessibility tests
- Test theme compatibility

### Performance

- Use React.memo for expensive components
- Implement proper key props for lists
- Avoid unnecessary re-renders
- Optimize bundle size with tree shaking
