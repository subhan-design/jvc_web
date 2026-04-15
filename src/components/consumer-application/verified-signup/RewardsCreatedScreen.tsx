// ...existing code...
// RewardsCreatedScreen.tsx
// Success screen after rewards account creation
// ...existing code...
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
      {/* ...existing code... */}
    </div>
  );
}
