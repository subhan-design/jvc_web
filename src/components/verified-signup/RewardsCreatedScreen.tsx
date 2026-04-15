// ─────────────────────────────────────────────────────────────────────────────
// RewardsCreatedScreen.tsx
// Success screen after rewards account creation
// ─────────────────────────────────────────────────────────────────────────────

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';

interface RewardsCreatedScreenProps {
  rewardsUserId: string;
  hasOffer: boolean;
  onContinue: () => void;
}

export default function RewardsCreatedScreen({
  rewardsUserId,
  hasOffer,
  onContinue,
}: RewardsCreatedScreenProps) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 sm:p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl relative">
              <CheckCircle className="w-12 h-12 text-blue-600" />
            </div>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome to JVC Rewards!</h1>
        <p className="text-blue-50 text-lg">Your account has been successfully created</p>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
            Account Created Successfully
          </h2>
          <p className="text-gray-600 text-center">
            {hasOffer
              ? 'Thank you for accepting our offer! Your JVC Rewards account is ready.'
              : 'Your JVC Rewards account has been created and is ready to use.'}
          </p>
        </div>

        {/* User ID Reference */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">Your Rewards ID</p>
          <p className="text-lg font-mono font-semibold text-gray-900">
            {rewardsUserId}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Keep this ID for your records. You'll need it for customer support.
          </p>
        </div>

        <Separator className="my-6" />

        {/* Next Steps */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            What's Next?
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                1
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Check your email
                </p>
                <p className="text-xs text-gray-600">
                  We've sent you a confirmation email with account details.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                2
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Download the mobile app
                </p>
                <p className="text-xs text-gray-600">
                  Access your rewards account anytime, anywhere.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                3
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Start earning rewards
                </p>
                <p className="text-xs text-gray-600">
                  Use your card and earn rewards on every purchase.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <Separator className="my-6" />

        {/* Account Benefits */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Your Benefits
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-sm text-gray-700">
                Fast and secure Verified signup
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-sm text-gray-700">
                Real-time rewards tracking
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-sm text-gray-700">
                Exclusive member offers and promotions
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-sm text-gray-700">
                24/7 customer support
              </span>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <Button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
          size="lg"
        >
          Go to Dashboard
        </Button>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help?{' '}
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
