'use client';

import { useEffect } from 'react';
import { ExternalLink, BookOpen, ArrowRight } from 'lucide-react';

/**
 * Documentation redirect page with user-friendly interface
 * Provides immediate redirect with fallback manual link
 */
export default function DocsRedirectPage() {
  useEffect(() => {
    // Redirect after a short delay to allow users to see the page
    const timer = setTimeout(() => {
      window.location.href = 'https://docs.formerlyincarcerated.org';
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleManualRedirect = () => {
    window.location.href = 'https://docs.formerlyincarcerated.org';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Redirecting to Documentation
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            You're being redirected to our comprehensive documentation site.
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span>Redirecting in 2 seconds...</span>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        </div>

        <button
          onClick={handleManualRedirect}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>Go to Documentation</span>
          <ArrowRight className="w-4 h-4" />
          <ExternalLink className="w-4 h-4" />
        </button>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Our documentation is hosted at{' '}
            <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">
              docs.formerlyincarcerated.org
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
