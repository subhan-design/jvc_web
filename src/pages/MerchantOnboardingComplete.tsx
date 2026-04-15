import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MerchantOnboardingComplete: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Application Successfully Submitted!
          </h1>
          <p className="text-gray-600">
            Thank you for completing your merchant onboarding application.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800 text-left">
              <p className="font-medium mb-1">What happens next?</p>
              <ul className="text-blue-700 space-y-1">
                <li>• We'll review your application within 2-3 business days</li>
                <li>• You'll receive an email confirmation shortly</li>
                <li>• Our team may contact you for additional information</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Home className="w-4 h-4 mr-2" />
            Return to Home
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/merchants')}
            className="w-full"
          >
            Learn More About Our Services
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Need help? Contact our support team at{' '}
          <a href="mailto:support@jvc.com" className="text-blue-600 hover:underline">
            support@jvc.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default MerchantOnboardingComplete;