import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

// Validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  title?: string;
  description?: string;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  title = 'Get in Touch',
  description = 'Send us a message and we\'ll get back to you as soon as possible.',
  className,
}) => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      setSubmitStatus('loading');
      
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default submission (you can integrate with your preferred service)
        await simulateSubmission(data);
      }
      
      setSubmitStatus('success');
      setSubmitMessage('Thank you! Your message has been sent successfully.');
      reset();
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
      console.error('Contact form submission error:', error);
    }
  };

  // Simulate form submission (replace with actual implementation)
  const simulateSubmission = async (_data: ContactFormData): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Simulated submission error'));
        }
      }, 2000);
    });
  };

  const renderStatusMessage = () => {
    if (submitStatus === 'idle') return null;

    const statusConfig = {
      success: {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        className: 'text-green-600 bg-green-50 border-green-200',
      },
      error: {
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        className: 'text-red-600 bg-red-50 border-red-200',
      },
    };

    const config = statusConfig[submitStatus as keyof typeof statusConfig];
    if (!config) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-2 p-3 rounded-lg border ${config.className}`}
      >
        {config.icon}
        <span className="text-sm font-medium">{submitMessage}</span>
      </motion.div>
    );
  };

  return (
    <Card className={className}>
      <CardHeader title={title} subtitle={description} />
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {renderStatusMessage()}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Name"
              placeholder="Your full name"
              error={errors.name?.message}
              {...register('name')}
            />
            
            <Input
              label="Email"
              type="email"
              placeholder="your.email@example.com"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>
          
          <Input
            label="Subject"
            placeholder="What is this about?"
            error={errors.subject?.message}
            {...register('subject')}
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Message
            </label>
            <textarea
              placeholder="Tell us more about your inquiry..."
              rows={5}
              className="flex w-full rounded-lg border border-border bg-background px-3 py-2 text-sm transition-all duration-200 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
              {...register('message')}
            />
            {errors.message && (
              <div className="flex items-center gap-1 text-sm">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="text-destructive">{errors.message.message}</span>
              </div>
            )}
          </div>
          
          <Button
            type="submit"
            loading={isSubmitting || submitStatus === 'loading'}
            leftIcon={<Send className="h-4 w-4" />}
            fullWidth
            disabled={submitStatus === 'success'}
          >
            {submitStatus === 'success' ? 'Message Sent!' : 'Send Message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
