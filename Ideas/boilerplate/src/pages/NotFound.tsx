import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-8 max-w-md w-full"
      >
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="space-y-4"
        >
          <div className="text-8xl font-bold text-primary">404</div>
          <div className="text-2xl font-semibold text-foreground">
            Page Not Found
          </div>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <Card className="p-8 bg-muted/50">
            <CardContent className="flex items-center justify-center">
              <Search className="h-16 w-16 text-muted-foreground" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button
                leftIcon={<Home className="h-4 w-4" />}
                variant="primary"
                fullWidth
              >
                Go Home
              </Button>
            </Link>
            <Button
              onClick={() => window.history.back()}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
              variant="outline"
              fullWidth
            >
              Go Back
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">
              You might be looking for:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                to="/about"
                className="text-sm text-primary hover:underline"
              >
                About
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                to="/contact"
                className="text-sm text-primary hover:underline"
              >
                Contact
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                to="/docs"
                className="text-sm text-primary hover:underline"
              >
                Documentation
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
