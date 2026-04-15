// ─────────────────────────────────────────────────────────────────────────────
// OfferScreen.tsx
// Display preapproval offer for verified users
// ─────────────────────────────────────────────────────────────────────────────

import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';

interface OfferScreenProps {
  offer: {
    creditLimit: number;
    apr: number;
    annualFee: number;
    rewardRate: number;
    introApr: number;
    introAprPeriodMonths: number;
    offerCode: string;
    offerExpiry: string;
    programName: string;
  };
  onAccept: () => void;
  onDecline: () => void;
}

export default function OfferScreen({
  offer,
  onAccept,
  onDecline,
}: OfferScreenProps) {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format expiration date
  const formatExpirationDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 sm:p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl relative">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Congratulations!</h1>
        <p className="text-green-50 text-lg">You've been pre-approved for a JVC Rewards Card</p>
      </div>

      {/* Offer Details */}
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Your Exclusive Offer
          </h2>

          {/* Credit Limit - Featured */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6 text-center border-2 border-blue-200">
            <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">
              Credit Limit
            </p>
            <p className="text-4xl font-bold text-blue-600">
              {formatCurrency(offer.creditLimit)}
            </p>
          </div>

          {/* Other Offer Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Intro APR</p>
                <p className="text-xs text-gray-500 mt-1">For {offer.introAprPeriodMonths} months</p>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{offer.introApr}%</p>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Regular APR</p>
                <p className="text-xs text-gray-500 mt-1">After intro period</p>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{offer.apr}%</p>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Rewards Rate</p>
                <p className="text-xs text-gray-500 mt-1">Cashback on all purchases</p>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{offer.rewardRate}%</p>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Annual Fee</p>
                <p className="text-xs text-gray-500 mt-1">Charged once per year</p>
              </div>
              <p className="text-2xl font-semibold text-gray-900">
                {offer.annualFee === 0 ? '$0' : formatCurrency(offer.annualFee)}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Benefits Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Card Benefits
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-sm text-gray-700">
                Instant approval with Verified 1-Click Signup
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-sm text-gray-700">
                Earn rewards on every purchase
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-sm text-gray-700">
                Mobile app for easy account management
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-sm text-gray-700">
                Secure transactions with fraud protection
              </span>
            </li>
          </ul>
        </div>

        <Separator className="my-6" />

        {/* Expiration Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> This pre-approval offer expires on{' '}
            <strong>{formatExpirationDate(offer.offerExpiry)}</strong>.
            Accept now to secure your credit limit.
          </p>
          <p className="text-xs text-amber-700 mt-2">
            Offer Code: <strong>{offer.offerCode}</strong>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onAccept}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            size="lg"
          >
            Accept Offer
          </Button>
          <Button
            onClick={onDecline}
            variant="outline"
            className="flex-1 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            size="lg"
          >
            Decline
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-xs text-gray-500 text-center">
          <p>
            By accepting this offer, you agree to the terms and conditions outlined in
            the Credit Card Agreement. Subject to credit approval and verification.
          </p>
        </div>
      </div>
    </div>
  );
}
