import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  Github,
  Twitter,
  Linkedin,
  MessageCircle,
  ExternalLink,
  BookOpen,
  Code,
  Bug,
  Lightbulb,
  Heart,
  Clock,
  MapPin,
  Send
} from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageLayout, SectionLayout } from '@/components/layout/Layout';

const contactReasons = [
  {
    icon: <Bug className="h-6 w-6 text-red-400" />,
    title: 'Bug Reports',
    description: 'Found an issue? Help us improve the boilerplate.',
    action: 'Report on GitHub',
    href: 'https://github.com/4eckd/react-boilerplate/issues',
    color: 'red'
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-yellow-400" />,
    title: 'Feature Requests',
    description: 'Have an idea for a new feature or improvement?',
    action: 'Suggest Feature',
    href: 'https://github.com/4eckd/react-boilerplate/discussions',
    color: 'yellow'
  },
  {
    icon: <Code className="h-6 w-6 text-blue-400" />,
    title: 'Technical Support',
    description: 'Need help implementing or customizing the boilerplate?',
    action: 'Get Help',
    href: 'https://github.com/4eckd/react-boilerplate/discussions',
    color: 'blue'
  },
  {
    icon: <Heart className="h-6 w-6 text-pink-400" />,
    title: 'Collaboration',
    description: 'Interested in contributing or partnering with us?',
    action: 'Let\'s Connect',
    href: `mailto:${import.meta.env.VITE_COMPANY_EMAIL || 'hello@itsdifferentproductions.com'}`,
    color: 'pink'
  }
];

const socialLinks = [
  {
    icon: <Github className="h-5 w-5" />,
    title: 'GitHub',
    description: 'Source code, issues, and contributions',
    href: import.meta.env.VITE_SOCIAL_GITHUB || 'https://github.com/4eckd/react-boilerplate',
    username: '4eckd/react-boilerplate'
  },
  {
    icon: <Twitter className="h-5 w-5" />,
    title: 'Twitter',
    description: 'Updates, tips, and announcements',
    href: import.meta.env.VITE_SOCIAL_TWITTER || 'https://twitter.com/itsdifferentpro',
    username: '@itsdifferentpro'
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    title: 'LinkedIn',
    description: 'Professional updates and company news',
    href: import.meta.env.VITE_SOCIAL_LINKEDIN || 'https://linkedin.com/company/its-different-productions',
    username: 'Its Different Productions'
  },
  {
    icon: <MessageCircle className="h-5 w-5" />,
    title: 'Discord',
    description: 'Community chat and real-time support',
    href: import.meta.env.VITE_SOCIAL_DISCORD || '#',
    username: 'Join our server'
  }
];

const quickLinks = [
  {
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    title: 'Documentation',
    description: 'Complete guides and API reference',
    href: 'https://docs.react-boilerplate-taupe.vercel.app'
  },
  {
    icon: <Code className="h-5 w-5 text-primary" />,
    title: 'GitHub Repository',
    description: 'Source code and latest releases',
    href: 'https://github.com/4eckd/react-boilerplate'
  },
  {
    icon: <MessageSquare className="h-5 w-5 text-primary" />,
    title: 'Discussions',
    description: 'Community Q&A and feature requests',
    href: 'https://github.com/4eckd/react-boilerplate/discussions'
  }
];

export const Contact: React.FC = () => {
  const handleFormSubmit = async (data: any) => {
    // Implement your form submission logic here
    // This could integrate with services like Formspree, Netlify Forms, etc.
    console.log('Form submitted:', data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For demo purposes, we'll just log the data
    // In a real application, you would send this to your backend or form service
  };

  return (
    <PageLayout
      title="Get in Touch"
      description="Connect with Its Different Productions - We're here to help you build amazing experiences"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Let's Build Something Amazing Together</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you need support, want to contribute, or have ideas for collaboration,
              we're excited to hear from you. Choose the best way to connect below.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Reasons Grid */}
      <SectionLayout
        title="How Can We Help?"
        description="Choose the type of support or collaboration you're looking for"
        className="mb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactReasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card hover className="h-full group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg bg-${reason.color}-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                      {reason.icon}
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {reason.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {reason.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(reason.href, '_blank')}
                        rightIcon={<ExternalLink className="h-3 w-3" />}
                        className="w-full"
                      >
                        {reason.action}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionLayout>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <ContactForm
            onSubmit={handleFormSubmit}
            title="Send us a Direct Message"
            description="For detailed inquiries, custom solutions, or partnership opportunities, send us a message and we'll get back to you within 24 hours."
          />
        </motion.div>

        {/* Sidebar Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {/* Quick Links */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-foreground flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Quick Links</span>
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                      {link.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                  <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-foreground flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <span>Connect With Us</span>
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.title}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    {social.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                      {social.title}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {social.username}
                    </p>
                  </div>
                  <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Response Time</h4>
                    <p className="text-sm text-muted-foreground">Usually within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Email</h4>
                    <p className="text-sm text-muted-foreground">
                      {import.meta.env.VITE_COMPANY_EMAIL || 'hello@itsdifferentproductions.com'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Location</h4>
                    <p className="text-sm text-muted-foreground">Remote-first team</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <SectionLayout
        title="Frequently Asked Questions"
        description="Quick answers to help you get started faster"
        className="mt-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card hover className="h-full">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Code className="h-4 w-4 text-green-500" />
                  </div>
                  <h4 className="font-semibold text-foreground">
                    Getting Started
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Clone the repository, run <code className="bg-muted px-1 rounded">npm install</code>,
                  then <code className="bg-muted px-1 rounded">npm run dev</code> to start developing.
                  Check our documentation for detailed setup instructions.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card hover className="h-full">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="h-4 w-4 text-purple-500" />
                  </div>
                  <h4 className="font-semibold text-foreground">
                    Customization
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Easily customize themes, add new components, and modify the design system.
                  The boilerplate is built to be flexible and extensible for your needs.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card hover className="h-full">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Send className="h-4 w-4 text-blue-500" />
                  </div>
                  <h4 className="font-semibold text-foreground">
                    Production Ready
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Built with production-ready configurations for testing, building, and deploying.
                  Includes CI/CD examples and deployment guides for major platforms.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </SectionLayout>

      {/* Community CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-16"
      >
        <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Join Our Community
              </h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Connect with other developers using FUSED GAMING, share your projects,
              get help, and contribute to making this boilerplate even better.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => window.open('https://github.com/4eckd/react-boilerplate/discussions', '_blank')}
                leftIcon={<MessageSquare className="h-4 w-4" />}
              >
                Join Discussions
              </Button>
              <Button
                onClick={() => window.open('https://github.com/4eckd/react-boilerplate', '_blank')}
                leftIcon={<Github className="h-4 w-4" />}
              >
                Star on GitHub
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </PageLayout>
  );
};

export default Contact;
