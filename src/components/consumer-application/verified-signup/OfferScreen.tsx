// ...existing code...
// OfferScreen.tsx
// Display preapproval offer for verified users
// ...existing code...
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

import { useState } from 'react';

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

  const [isSaving, setIsSaving] = useState(false);

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
        {/* ...existing code... */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            disabled={isSaving}
            onClick={async () => {
              setIsSaving(true);
              await onAccept();
              setIsSaving(false);
            }}
            variant="success"
          >
            Accept
          </Button>
          <Button
            disabled={isSaving}
            onClick={async () => {
              setIsSaving(true);
              await onDecline();
              setIsSaving(false);
            }}
            variant="outline"
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
