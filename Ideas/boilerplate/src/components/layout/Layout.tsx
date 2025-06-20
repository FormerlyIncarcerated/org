import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { clsx } from 'clsx';

export interface LayoutProps {
  children?: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showBreadcrumb?: boolean;
  headerProps?: any;
  footerProps?: any;
  breadcrumbProps?: any;
  className?: string;
  containerClassName?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  showBreadcrumb = false,
  headerProps = {},
  footerProps = {},
  breadcrumbProps = {},
  className,
  containerClassName,
}) => {
  return (
    <div className={clsx('min-h-screen flex flex-col bg-background', className)}>
      {/* Header */}
      {showHeader && <Header {...headerProps} />}

      {/* Main Content */}
      <main className="flex-1">
        <div className={clsx('container mx-auto px-4', containerClassName)}>
          {/* Breadcrumb */}
          {showBreadcrumb && (
            <div className="py-4">
              <Breadcrumb {...breadcrumbProps} />
            </div>
          )}

          {/* Page Content */}
          {children || <Outlet />}
        </div>
      </main>

      {/* Footer */}
      {showFooter && <Footer {...footerProps} />}
    </div>
  );
};

export const PageLayout: React.FC<{
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, description, children, className }) => {
  return (
    <div className={clsx('py-8 space-y-8', className)}>
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-lg text-muted-foreground max-w-3xl">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export const SectionLayout: React.FC<{
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, description, children, className }) => {
  return (
    <section className={clsx('space-y-6', className)}>
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
};

export default Layout;
