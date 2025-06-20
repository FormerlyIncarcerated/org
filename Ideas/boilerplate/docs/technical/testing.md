# Testing

Comprehensive testing guide for the FUSED GAMING React TypeScript Boilerplate.

## Testing Stack

### Core Testing Tools

- **Vitest** - Fast unit test framework powered by Vite
- **React Testing Library** - Testing utilities for React components
- **jsdom** - DOM implementation for Node.js testing
- **@testing-library/jest-dom** - Custom Jest matchers for DOM elements
- **@testing-library/user-event** - User interaction simulation

### Test Configuration

The testing setup is configured in:
- `vitest.config.ts` - Vitest configuration
- `src/test/setup.ts` - Test environment setup
- `src/test/utils.tsx` - Custom testing utilities

## Running Tests

### Available Commands

```bash
# Run tests in watch mode
npm run test

# Run tests with UI interface
npm run test:ui

# Run tests with coverage report
npm run test:coverage

# Run tests once (CI mode)
npm run test:run
```

### Test Output

```bash
✓ src/components/ui/__tests__/Button.test.tsx (8)
  ✓ Button (8)
    ✓ renders with default props
    ✓ renders different variants
    ✓ renders different sizes
    ✓ shows loading state
    ✓ handles click events
    ✓ is disabled when disabled prop is true
    ✓ renders with icons
    ✓ renders full width when specified

Test Files  1 passed (1)
Tests  8 passed (8)
```

## Writing Tests

### Basic Component Test

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });
});
```

### Testing User Interactions

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/test/utils';
import userEvent from '@testing-library/user-event';

describe('Button interactions', () => {
  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    button.focus();
    await user.keyboard('{Enter}');
    
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Testing with Themes

```typescript
import { render } from '@/test/utils';
import { ThemeProvider } from '@/context/ThemeContext';

describe('Component with themes', () => {
  it('works with all themes', () => {
    const themes = ['dark', 'violet', 'emerald', 'amber', 'aurora'];
    
    themes.forEach(theme => {
      render(
        <ThemeProvider defaultTheme={theme}>
          <MyComponent />
        </ThemeProvider>
      );
      
      // Test theme-specific behavior
      expect(screen.getByTestId('component')).toBeInTheDocument();
    });
  });
});
```

### Testing Forms

```typescript
import { render, screen, waitFor } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '../ContactForm';

describe('ContactForm', () => {
  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    
    render(<ContactForm onSubmit={onSubmit} />);
    
    // Fill out form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Hello world');
    
    // Submit form
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello world'
      });
    });
  });

  it('shows validation errors', async () => {
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={vi.fn()} />);
    
    // Submit empty form
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Check for validation errors
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });
});
```

### Testing Hooks

```typescript
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial value', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial-value')
    );
    
    expect(result.current[0]).toBe('initial-value');
  });

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );
    
    act(() => {
      result.current[1]('updated');
    });
    
    expect(localStorage.getItem('test-key')).toBe('"updated"');
    expect(result.current[0]).toBe('updated');
  });
});
```

## Testing Patterns

### Custom Render Function

The boilerplate includes a custom render function in `src/test/utils.tsx`:

```typescript
import { render as rtlRender } from '@testing-library/react';
import { ThemeProvider } from '@/context/ThemeContext';

function render(ui: React.ReactElement, options = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ThemeProvider>
        {children}
      </ThemeProvider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
export { render };
```

### Mock Functions

```typescript
import { vi } from 'vitest';

// Mock external dependencies
vi.mock('framer-motion', () => ({
  motion: {
    button: 'button',
    div: 'div',
  },
}));

// Mock API calls
const mockFetch = vi.fn();
global.fetch = mockFetch;
```

### Test Data Factories

```typescript
// src/test/factories.ts
export const createUser = (overrides = {}) => ({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  ...overrides,
});

export const createPost = (overrides = {}) => ({
  id: '1',
  title: 'Test Post',
  content: 'Test content',
  author: createUser(),
  ...overrides,
});
```

## Accessibility Testing

### Screen Reader Testing

```typescript
import { render, screen } from '@/test/utils';

describe('Accessibility', () => {
  it('has proper ARIA labels', () => {
    render(<Button aria-label="Close dialog">×</Button>);
    
    expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Modal isOpen={true} onClose={vi.fn()}>Content</Modal>);
    
    // Test focus management
    expect(document.activeElement).toBe(screen.getByRole('dialog'));
    
    // Test escape key
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });
});
```

### Color Contrast Testing

```typescript
import { render } from '@/test/utils';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility compliance', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<MyComponent />);
    const results = await axe(container);
    
    expect(results).toHaveNoViolations();
  });
});
```

## Performance Testing

### Component Performance

```typescript
import { render } from '@/test/utils';
import { performance } from 'perf_hooks';

describe('Performance', () => {
  it('renders quickly', () => {
    const start = performance.now();
    
    render(<ExpensiveComponent data={largeDataSet} />);
    
    const end = performance.now();
    const renderTime = end - start;
    
    expect(renderTime).toBeLessThan(100); // 100ms threshold
  });
});
```

## Coverage Configuration

### Coverage Thresholds

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
});
```

### Coverage Reports

```bash
# Generate coverage report
npm run test:coverage

# View HTML coverage report
open coverage/index.html
```

## Best Practices

### Test Organization

- Group related tests with `describe` blocks
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)
- Keep tests focused and isolated

### Test Maintenance

- Update tests when components change
- Remove obsolete tests
- Refactor test utilities for reusability
- Keep test data realistic but minimal

### CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:coverage
      - run: npm run type-check
```
