const runtimeConfig = (window as any).__RUNTIME_CONFIG__ || { environment: 'production' };
const isDev = runtimeConfig.environment === 'development';
// ─────────────────────────────────────────────────────────────────────────────
// DisclosuresAndReferralScreen.tsx
// Disclosure acceptance and referral code input for Verified signup
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { completeVerifiedSignup, type VerifiedSignupCompleteResponse } from '@/lib/api';

// Form validation schema
const disclosuresSchema = z.object({
  electronicRecords: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the electronic records consent',
  }),
  applicationsDisclosures: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the account opening disclosures',
  }),
  creditCardAgreement: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the consumer credit card agreement',
  }),
  financialPrivacy: z.boolean().refine((val) => val === true, {
    message: 'You must receive the financial privacy notice',
  }),
  autoDialedCalls: z.boolean().refine((val) => val === true, {
    message: 'You must consent to receive autodialed calls',
  }),
  referralCode: z.string().optional(),
});

type DisclosuresFormData = z.infer<typeof disclosuresSchema>;

interface DisclosuresAndReferralScreenProps {
  identityUuid: string;
  onComplete: (accepted: boolean, referralCode?: string) => void;
  onSignupComplete: (
    userId: string,
    prescreenStatus: 'PREAPPROVED' | 'NOT_PREAPPROVED',
    offer?: {
      creditLimit: number;
      apr: number;
      annualFee: number;
      rewardRate: number;
      introApr: number;
      introAprPeriodMonths: number;
      offerCode: string;
      offerExpiry: string;
      programName: string;
    }
  ) => void;
  onBack: () => void;
}

export default function DisclosuresAndReferralScreen({
  identityUuid,
  onComplete,
  onSignupComplete,
  onBack,
}: DisclosuresAndReferralScreenProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DisclosuresFormData>({
    resolver: zodResolver(disclosuresSchema),
    defaultValues: {
      electronicRecords: false,
      applicationsDisclosures: false,
      creditCardAgreement: false,
      financialPrivacy: false,
      autoDialedCalls: false,
      referralCode: '',
    },
  });

  const onSubmit = async (data: DisclosuresFormData) => {
    try {
      setIsSubmitting(true);
      if (isDev) console.log('[Disclosures] Submitting with data:', data);

      // Call backend to complete Verified signup
      const response = await completeVerifiedSignup({
        identityUuid,
        referralCode: data.referralCode || undefined,
      });

      if (isDev) console.log('[Disclosures] Signup completed:', response);

      if (response.success && response.data) {
        // Show alert box as user requested
        window.alert('Process complete');

        // Notify parent of completion
        onComplete(true, data.referralCode);

        // Notify parent of signup result
        onSignupComplete(
          response.data.rewardsUserId,
          response.data.prescreenStatus,
          response.data.offer
        );

        toast.success('Account created successfully!');
      } else {
        throw new Error(response.message || 'Signup completion failed');
      }
    } catch (error: any) {
      if (isDev) console.error('[Disclosures] Submission error:', error);
      toast.error(error.message || 'Failed to complete signup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl mb-4 shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Review & Accept Disclosures
        </h2>
        <p className="text-gray-600 text-base">
          Please review and accept the following disclosures to complete your JVC
          Rewards account setup.
        </p>
      </div>

      <Separator className="mb-6" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Disclosure Checkboxes */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="electronicRecords"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I consent to receive electronic records *
                    </FormLabel>
                    <p className="text-sm text-gray-500">
                      I agree to receive all agreements, disclosures, and notices
                      electronically.{' '}
                      <a
                        href="/docs/consent-electronic-records/preview"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View full disclosure
                      </a>
                    </p>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applicationsDisclosures"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to the account opening disclosures *
                    </FormLabel>
                    <p className="text-sm text-gray-500">
                      I have read and agree to the account opening disclosures.{' '}
                      <a
                        href="/docs/application-disclosures/AZ/preview"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View disclosures
                      </a>
                    </p>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="creditCardAgreement"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to the consumer credit card agreement *
                    </FormLabel>
                    <p className="text-sm text-gray-500">
                      I have reviewed and agree to the credit card terms.{' '}
                      <a
                        href="/docs/credit-card-agreement/preview"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View agreement
                      </a>
                    </p>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="financialPrivacy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I acknowledge the financial privacy notice *
                    </FormLabel>
                    <p className="text-sm text-gray-500">
                      I have received and reviewed the privacy notice.{' '}
                      <a
                        href="/docs/financial-privacy-notice/preview"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View notice
                      </a>
                    </p>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="autoDialedCalls"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I consent to receive autodialed calls or texts *
                    </FormLabel>
                    <p className="text-sm text-gray-500">
                      I consent to receive calls or texts from JVC using automated
                      systems for account-related communications.
                    </p>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Separator />

          {/* Referral Code (Optional) */}
          <FormField
            control={form.control}
            name="referralCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referral Code (Optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter referral code if you have one"
                    className="uppercase"
                    maxLength={20}
                  />
                </FormControl>
                <p className="text-sm text-gray-500">
                  Have a referral code? Enter it here to get special rewards.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isSubmitting}
              className="flex-1 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Accept & Continue'
              )}
            </Button>
          </div>

          {/* Required Fields Notice */}
          <p className="text-xs text-gray-500 text-center">
            * All fields are required to complete signup
          </p>
        </form>
      </Form>
    </div>
  );
}
