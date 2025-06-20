import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Rocket, Heart, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { TechStackLogos } from '@/components/ui/TechStackLogos';
import { PageLayout, SectionLayout } from '@/components/layout/Layout';

const features = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Lightning Fast',
    description: 'Built with Vite and optimized for performance with modern React patterns.',
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: 'Type Safe',
    description: 'Full TypeScript support with strict type checking and excellent DX.',
  },
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: 'Production Ready',
    description: 'Complete with testing, linting, and deployment configurations.',
  },
];

export const Home: React.FC = () => {
  const handleCopyAddress = () => {
    const address = import.meta.env.VITE_DONATION_SOLANA_ADDRESS;
    if (address) {
      navigator.clipboard.writeText(address);
      // You could add a toast notification here
    }
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <SectionLayout className="text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            FUSED GAMING
            <span className="block text-primary">Boilerplate</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern React TypeScript boilerplate with Vite, Tailwind CSS, 
            and comprehensive tooling for rapid development.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              rightIcon={<ArrowRight className="h-5 w-5" />}
              className="shadow-glow hover:shadow-glow-lg"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:shadow-primary"
            >
              View Documentation
            </Button>
          </div>
        </motion.div>
      </SectionLayout>

      {/* Features Section */}
      <SectionLayout
        title="Why Choose This Boilerplate?"
        description="Everything you need to build modern web applications"
        className="py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="h-full" variant="elevated">
                <CardHeader>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-primary-sm">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionLayout>

      {/* Tech Stack Section */}
      <SectionLayout
        title="Modern Tech Stack"
        description="Built with the latest and greatest tools for modern web development"
        className="py-16"
      >
        <TechStackLogos />
      </SectionLayout>

      {/* Support Section */}
      {import.meta.env.VITE_DONATION_SOLANA_ADDRESS && (
        <SectionLayout className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="max-w-2xl mx-auto text-center p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-primary">
                    <Heart className="h-6 w-6" />
                    <h3 className="text-2xl font-bold">Support Development</h3>
                  </div>
                  <p className="text-muted-foreground">
                    {import.meta.env.VITE_DONATION_MESSAGE || 'Help us continue building amazing tools for the community'}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-background/50 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-2">Solana Wallet Address:</p>
                    <div className="flex items-center justify-center space-x-2">
                      <code className="text-sm font-mono bg-muted px-3 py-1 rounded text-foreground">
                        {import.meta.env.VITE_DONATION_SOLANA_ADDRESS}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyAddress}
                        className="h-8 w-8 p-0"
                        aria-label="Copy address"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyAddress}
                      leftIcon={<Copy className="h-4 w-4" />}
                    >
                      Copy Address
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      rightIcon={<ExternalLink className="h-4 w-4" />}
                      onClick={() => window.open(`https://solscan.io/account/${import.meta.env.VITE_DONATION_SOLANA_ADDRESS}`, '_blank')}
                    >
                      View on Solscan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </SectionLayout>
      )}

      {/* CTA Section */}
      <SectionLayout className="text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-foreground">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start your next project with this comprehensive boilerplate and 
            focus on what matters most - building great features.
          </p>
          <Button
            size="lg"
            rightIcon={<ArrowRight className="h-5 w-5" />}
            className="shadow-glow hover:shadow-glow-lg"
          >
            Start Building
          </Button>
        </motion.div>
      </SectionLayout>
    </PageLayout>
  );
};

export default Home;
