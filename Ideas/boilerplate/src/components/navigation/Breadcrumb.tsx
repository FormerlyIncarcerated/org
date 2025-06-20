import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { clsx } from 'clsx';

export interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
  separator?: React.ReactNode;
  className?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

const defaultSeparator = <ChevronRight className="h-4 w-4 text-muted-foreground" />;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showHome = true,
  separator = defaultSeparator,
  className,
}) => {
  const location = useLocation();
  
  // Auto-generate breadcrumbs from current path if items not provided
  const breadcrumbItems = items || generateBreadcrumbsFromPath(location.pathname);

  // Add home item if requested and not already present
  const finalItems = showHome && breadcrumbItems[0]?.href !== '/' 
    ? [{ label: 'Home', href: '/', icon: <Home className="h-4 w-4" /> }, ...breadcrumbItems]
    : breadcrumbItems;

  if (finalItems.length <= 1) {
    return null; // Don't show breadcrumbs for single items
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={clsx('flex items-center space-x-1 text-sm', className)}
    >
      <ol className="flex items-center space-x-1">
        {finalItems.map((item, index) => {
          const isLast = index === finalItems.length - 1;
          
          return (
            <li key={`${item.href}-${index}`} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 flex-shrink-0">
                  {separator}
                </span>
              )}
              
              {isLast ? (
                <span 
                  className="flex items-center space-x-1 text-foreground font-medium"
                  aria-current="page"
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              ) : (
                <Link
                  to={item.href || '#'}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// Helper function to generate breadcrumbs from URL path
function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const pathSegments = pathname.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) {
    return [{ label: 'Home', href: '/' }];
  }

  const breadcrumbs: BreadcrumbItem[] = [];
  let currentPath = '';

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    // Convert segment to readable label
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentPath, // Don't make last item clickable
    });
  });

  return breadcrumbs;
}

export default Breadcrumb;
