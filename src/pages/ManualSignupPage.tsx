const runtimeConfig = (window as any).__RUNTIME_CONFIG__ || { environment: 'production' };
const isDev = runtimeConfig.environment === 'development';
// ─────────────────────────────────────────────────────────────────────────────
// ManualSignupPage.tsx
// Fallback manual signup page for users who can't use Verified 1-Click
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Minimal validation schema - phone and email only
const manualSignupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\d{10,}$/, 'Phone number must contain only digits'),
});

type ManualSignupFormData = z.infer<typeof manualSignupSchema>;

export default function ManualSignupPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ManualSignupFormData>({
    resolver: zodResolver(manualSignupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
  });

  const onSubmit = async (data: ManualSignupFormData) => {
    try {
      setIsSubmitting(true);
      if (isDev) console.log('[Manual Signup] Submitting:', data);

      // TODO: Implement manual signup API call
      // For now, show success message
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      toast.success('Manual signup request submitted!');

      // Redirect to success or next step
      navigate('/consumer-application');
    } catch (error: any) {
      if (isDev) console.error('[Manual Signup] Error:', error);
      toast.error(error.message || 'Failed to submit signup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-[480px] mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manual Signup
          </h1>
          <p className="text-gray-600">
            Complete your JVC Rewards signup manually
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> The quick signup option wasn't available. Please
            complete this form, and we'll get back to you shortly.
          </p>
        </div>

        {/* Manual Signup Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your first name"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your last name"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="your.email@example.com"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="1234567890"
                        maxLength={15}
                        disabled={isSubmitting}
                        onChange={(e) => {
                          // Remove non-digits
                          const value = e.target.value.replace(/\D/g, '');
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Signup Request'
                )}
              </Button>

              {/* Required Fields Notice */}
              <p className="text-xs text-gray-500 text-center">
                * All fields are required
              </p>
            </form>
          </Form>

          {/* Alternate Option */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-3">
              Want to try Verified 1-Click Signup again?
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/rewards/signup/verified')}
              disabled={isSubmitting}
            >
              Back to Quick Signup
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Questions?{' '}
            <a
              href="/contact"
              className="text-blue-600 hover:underline font-medium"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
